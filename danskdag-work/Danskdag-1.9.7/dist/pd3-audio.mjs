// Sentence-by-sentence reader for the PD3 section: one utterance per sentence (Android Chrome cuts long utterances),
// current sentence and word tracking (speech `boundary` events, or a calibrated timing estimate when the voice sends none),
// pause as cancel + restart of the sentence, and optional recorded audio with per-sentence time marks.
import {claimSpeech,waitForDanishVoice} from './speech.mjs';

export const READER_RATES=[0.6,0.75,0.9,1];
// Characters spoken per second at rate 1.0 before calibration. The reader measures real sentences and corrects this.
export const BASE_CHARS_PER_SECOND=13.5;
const WORD_PATTERN=/[\p{L}\p{N}]+(?:['’-][\p{L}\p{N}]+)*/gu;
const clamp=(value,min,max)=>Math.min(max,Math.max(min,value));

/** Words of a sentence with their character ranges, so a `boundary` charIndex can be mapped back to a word. */
export function tokenizeWords(text){
  const words=[];
  for(const match of String(text??'').matchAll(WORD_PATTERN))words.push({text:match[0],start:match.index,end:match.index+match[0].length});
  return words;
}

/** The word that contains `charIndex`; a position in a gap belongs to the next word, a position past the end to the last. */
export function wordAtChar(words,charIndex){
  if(!words.length||!Number.isFinite(charIndex))return -1;
  for(let i=0;i<words.length;i++)if(charIndex<words[i].end)return i;
  return words.length-1;
}

// A comma or a full stop makes the voice pause: count it as extra characters of speaking time.
function pauseAfter(text,word){
  const rest=text.slice(word.end,word.end+3);
  if(/^\s*[.!?…]/.test(rest))return 6;
  if(/^\s*[,;:–—]/.test(rest))return 3;
  return 0;
}

/** Start time (seconds from the start of the sentence) of every word and the total duration, for a rate and calibration. */
export function estimateSchedule(text,rate=1,calibration=1,baseSpeed=BASE_CHARS_PER_SECOND){
  const words=tokenizeWords(text),speed=Math.max(1,baseSpeed*Math.max(0.1,rate)*Math.max(0.1,calibration));
  let weight=0;const starts=[];
  for(const word of words){
    starts.push(weight/speed);
    weight+=word.text.length+1+pauseAfter(text,word);
  }
  return {words,starts,total:weight/speed,weight};
}

/** Index of the word being spoken `elapsed` seconds after the sentence started. */
export function wordAtTime(schedule,elapsed){
  let found=-1;
  for(let i=0;i<schedule.starts.length;i++)if(schedule.starts[i]<=elapsed)found=i;else break;
  return found;
}

/** New calibration factor from one measured sentence; null when the sample is too short or implausible to learn from. */
export function nextCalibration(current,text,rate,measuredSeconds,baseSpeed=BASE_CHARS_PER_SECOND){
  const predicted=estimateSchedule(text,rate,1,baseSpeed);
  if(!(measuredSeconds>0)||predicted.weight<10)return null;
  const factor=predicted.total/measuredSeconds;
  if(factor<0.25||factor>4)return null;
  return clamp(current*0.5+factor*0.5,0.35,3);
}

export const reducedMotion=()=>{try{return !!globalThis.matchMedia?.('(prefers-reduced-motion: reduce)').matches;}catch{return false;}};

const MESSAGES={
  noVoice:'Датский голос не найден на устройстве. Включён ручной режим: нажимай на предложение, чтобы отметить его и прочитать самому, без озвучки.',
  unsupported:'Этот браузер не умеет озвучивать текст. Включён ручной режим: нажимай на предложение, чтобы отметить его и прочитать самому.',
  noStart:'Озвучка не началась. Проверь датский голос в настройках.',
  failed:'Озвучка остановилась с ошибкой. Нажми «Слушать», чтобы продолжить с этого предложения.',
  audioFallback:'Записанный звук недоступен, текст читает голос устройства.'
};

/**
 * Creates the reader. `sentences` is an array of Danish strings.
 * onChange receives {status,mode,index,word,wordMode,rate,calibration,message,total}.
 * status: idle | loading | playing | paused | finished | manual | error.
 */
export function createReader(options){
  const sentences=options.sentences.map(String);
  const synthesis=Object.hasOwn(options,'synthesis')?options.synthesis:globalThis.speechSynthesis;
  const Utterance=Object.hasOwn(options,'Utterance')?options.Utterance:globalThis.SpeechSynthesisUtterance;
  const setTimer=options.setTimer||((fn,ms)=>setTimeout(fn,ms)),clearTimer=options.clearTimer||(id=>clearTimeout(id));
  const now=options.now||(()=>globalThis.performance?.now?.()??Date.now());
  const onChange=options.onChange||(()=>{});
  const estimateDelay=options.estimateDelay??700,voiceTimeout=options.voiceTimeout??2000,startTimeout=options.startTimeout??10000,restartDelay=options.restartDelay??50;
  const gapFor=typeof options.gap==='function'?options.gap:(()=>Math.max(0,Number(options.gap)||0));
  const createAudio=options.createAudio||(src=>{const el=new globalThis.Audio(src);el.preload='auto';return el;});
  let audio=options.audio&&options.audio.src&&Array.isArray(options.audio.marks)&&options.audio.marks.length===sentences.length?options.audio:null;
  let voiceUri=options.voiceUri||'';
  let voice=null,voiceFor=null,release=null,gen=0,cur=null,gapTimer=null,restartTimer=null,single=false,audioEl=null,destroyed=false;
  const canSpeak=()=>typeof synthesis?.speak==='function'&&typeof Utterance==='function';
  const state={status:'idle',mode:audio?'audio':canSpeak()?'speech':'manual',index:0,word:-1,wordMode:'none',rate:options.rate??0.9,calibration:options.calibration??1,message:'',total:sentences.length};
  const snapshot=()=>({...state});
  const emit=()=>{if(!destroyed)onChange(snapshot());};
  const patch=values=>{Object.assign(state,values);emit();};
  if(state.mode==='manual')state.status='manual';

  function clearCurrentTimers(){
    if(cur){for(const id of cur.timers)clearTimer(id);cur.timers=[];clearTimer(cur.startTimer);clearTimer(cur.watchdog);clearTimer(cur.estimateTimer);}
    clearTimer(gapTimer);gapTimer=null;clearTimer(restartTimer);restartTimer=null;
  }
  function halt(){
    gen++;clearCurrentTimers();cur=null;
    if(audioEl){try{audioEl.pause();}catch{ /* The element may already be gone. */ }}
    try{synthesis?.cancel?.();}catch{ /* Nothing speaking. */ }
  }
  function drop(){const r=release;release=null;r?.();}
  function setWord(word,wordMode=state.wordMode){if(word===state.word&&wordMode===state.wordMode)return;patch({word,wordMode});}

  function goManual(message){
    halt();drop();
    patch({mode:'manual',status:'manual',word:-1,wordMode:'none',message});
  }

  function finishAll(){
    halt();drop();
    patch({status:'finished',word:-1,wordMode:'none',message:''});
  }

  function sentenceDone(c,forced=false){
    if(!cur||cur!==c)return;
    clearCurrentTimers();
    if(!forced&&c.startedAt!==null){
      const next=nextCalibration(state.calibration,sentences[c.i],state.rate,(now()-c.startedAt)/1000);
      if(next!==null)state.calibration=next;
    }
    const last=c.i>=sentences.length-1;
    if(single){
      halt();drop();
      patch({status:'idle',word:-1,wordMode:'none',message:''});return;
    }
    if(last){finishAll();return;}
    const token=c.token;
    patch({index:c.i+1,word:-1,wordMode:'none'});
    cur=null;
    const wait=gapFor(c.i);
    if(wait>0)gapTimer=setTimer(()=>{gapTimer=null;if(token===gen)speakSentence(c.i+1,token);},wait);
    else speakSentence(c.i+1,token);
  }

  function failSpeech(c,message){
    if(!cur||cur!==c)return;
    halt();drop();
    patch({status:'error',word:-1,wordMode:'none',message});
  }

  function startEstimate(c){
    if(!cur||cur!==c||c.boundary)return;
    const schedule=estimateSchedule(sentences[c.i],state.rate,state.calibration),elapsed=(now()-c.startedAt)/1000;
    patch({wordMode:'estimate',word:wordAtTime(schedule,elapsed)});
    schedule.starts.forEach((start,k)=>{
      const delay=(start-elapsed)*1000;
      if(delay<=0)return;
      c.timers.push(setTimer(()=>{if(cur===c&&!c.boundary)setWord(k,'estimate');},delay));
    });
  }

  function speakSentence(i,token){
    if(token!==gen||destroyed)return;
    const text=sentences[i];
    let utterance;
    try{
      utterance=new Utterance(text);
      utterance.lang='da-DK';if(voice)utterance.voice=voice;utterance.rate=state.rate;
    }catch{goManual(MESSAGES.unsupported);return;}
    const c={token,i,utterance,startedAt:null,boundary:false,words:tokenizeWords(text),timers:[],startTimer:null,watchdog:null,estimateTimer:null};
    cur=c;
    // Some engines skip `start`: the first boundary counts as the start too.
    const started=()=>{
      if(cur!==c||c.startedAt!==null)return;
      c.startedAt=now();clearTimer(c.startTimer);
      const expected=estimateSchedule(text,state.rate,state.calibration).total;
      c.watchdog=setTimer(()=>{if(cur===c){try{synthesis.cancel();}catch{ /* Already finished. */ }sentenceDone(c,true);}},expected*3000+8000);
      c.estimateTimer=setTimer(()=>startEstimate(c),estimateDelay);
      patch({status:'playing',message:'',word:-1,wordMode:'none'});
    };
    utterance.onstart=started;
    utterance.onboundary=event=>{
      if(cur!==c)return;
      if(event&&event.name&&event.name!=='word')return;
      started();
      const k=wordAtChar(c.words,Number(event?.charIndex));
      if(k<0)return;
      c.boundary=true;
      for(const id of c.timers)clearTimer(id);c.timers=[];clearTimer(c.estimateTimer);
      setWord(k,'boundary');
    };
    utterance.onend=()=>sentenceDone(c);
    utterance.onerror=event=>{
      if(cur!==c)return;
      if(['canceled','interrupted'].includes(event?.error))return;
      failSpeech(c,MESSAGES.failed);
    };
    c.startTimer=setTimer(()=>failSpeech(c,MESSAGES.noStart),startTimeout);
    if(state.index!==i||state.word!==-1)patch({index:i,word:-1,wordMode:'none'});
    try{synthesis.speak(utterance);}catch{failSpeech(c,MESSAGES.failed);}
  }

  async function startSpeech(from,message=''){
    const token=++gen;
    clearCurrentTimers();cur=null;
    if(!release)release=claimSpeech(()=>{
      // Another sound took over: stop quietly, the next play starts from the sentence that was current.
      release=null;halt();
      if(!destroyed&&state.status!=='idle'&&state.status!=='finished'&&state.mode!=='manual')patch({status:'idle',word:-1,wordMode:'none'});
    });
    patch({index:from,status:'loading',word:-1,wordMode:'none',message});
    try{synthesis?.cancel?.();}catch{ /* Nothing queued. */ }
    if(!voice||voiceFor!==voiceUri){
      const found=await waitForDanishVoice(voiceUri,{timeout:voiceTimeout,synthesis});
      if(token!==gen||destroyed)return;
      if(!found){goManual(MESSAGES.noVoice);return;}
      voice=found;voiceFor=voiceUri;
    }
    if(restartDelay>0)restartTimer=setTimer(()=>{restartTimer=null;speakSentence(from,token);},restartDelay);
    else speakSentence(from,token);
  }

  function ensureAudio(){
    if(audioEl)return audioEl;
    audioEl=createAudio(audio.src);
    audioEl.addEventListener('timeupdate',()=>{
      if(!audio||state.mode!=='audio'||state.status==='idle'||state.status==='finished')return;
      const t=audioEl.currentTime,marks=audio.marks;
      let i=state.index;
      while(i<marks.length-1&&t>=marks[i+1].s)i++;
      while(i>0&&t<marks[i].s)i--;
      if(single&&t>=marks[state.index].e){audioEl.pause();patch({status:'idle',word:-1,wordMode:'none'});return;}
      const mark=marks[i],span=Math.max(0.1,mark.e-mark.s),inside=t>=mark.s&&t<mark.e;
      const schedule=estimateSchedule(sentences[i],1,1),word=inside?wordAtTime(schedule,(t-mark.s)/span*schedule.total):-1;
      if(i!==state.index||word!==state.word||state.wordMode!=='estimate')patch({index:i,word,wordMode:'estimate'});
    });
    audioEl.addEventListener('ended',()=>{if(state.mode==='audio')finishAll();});
    audioEl.addEventListener('error',()=>{
      if(state.mode!=='audio')return;
      // The file is missing or blocked: continue with the device voice from the current sentence.
      audio=null;audioEl=null;patch({mode:canSpeak()?'speech':'manual',message:MESSAGES.audioFallback});
      if(canSpeak()&&(state.status==='playing'||state.status==='loading'))void startSpeech(state.index,MESSAGES.audioFallback);
      else if(!canSpeak())goManual(MESSAGES.audioFallback);
    });
    return audioEl;
  }

  async function playAudio(from,resume){
    ++gen;
    if(!release)release=claimSpeech(()=>{release=null;if(audioEl)audioEl.pause();if(!destroyed&&state.status!=='idle'&&state.status!=='finished')patch({status:'idle',word:-1,wordMode:'none'});});
    const el=ensureAudio();
    el.playbackRate=state.rate;
    if(!resume)el.currentTime=audio.marks[from].s;
    patch({index:from,status:'loading',word:-1,wordMode:'none',message:''});
    try{await el.play();if(state.mode==='audio'&&state.status==='loading')patch({status:'playing'});}
    catch{if(state.mode==='audio'){audio=null;audioEl=null;patch({mode:canSpeak()?'speech':'manual',message:MESSAGES.audioFallback});if(canSpeak())void startSpeech(from,MESSAGES.audioFallback);else goManual(MESSAGES.audioFallback);}}
  }

  const api={
    snapshot,
    /** Start (or resume after pause) reading at `from`; `onlyOne` stops after that sentence. */
    play(from,{onlyOne=false}={}){
      if(destroyed||!sentences.length)return Promise.resolve(false);
      if(state.mode==='manual'){return Promise.resolve(false);}
      const resume=from===undefined&&state.status==='paused'&&state.mode==='audio';
      const start=clamp(from??(state.status==='finished'?0:state.index),0,sentences.length-1);
      single=onlyOne;
      if(state.mode==='audio')return playAudio(start,resume).then(()=>true);
      return startSpeech(start).then(()=>true);
    },
    /** Pause: audio pauses where it is; speech is cancelled and resumes from the start of the current sentence. */
    pause(){
      if(!['playing','loading'].includes(state.status))return;
      halt();
      patch({status:'paused',word:-1,wordMode:'none'});
    },
    toggle(){
      if(['playing','loading'].includes(state.status))api.pause();
      else void api.play();
    },
    stop(){
      halt();drop();
      if(state.mode==='manual'){patch({index:0,word:-1,wordMode:'none'});return;}
      patch({status:'idle',index:0,word:-1,wordMode:'none',message:''});
    },
    /** Move to a sentence. Plays it (and continues) unless `play` is false or there is no voice. */
    seek(index,{play=true,onlyOne=false}={}){
      const i=clamp(Math.trunc(index),0,sentences.length-1);
      if(state.mode==='manual'){patch({index:i,word:-1,wordMode:'none'});return Promise.resolve(false);}
      if(!play){
        if(['playing','loading'].includes(state.status)){halt();patch({index:i,status:'paused',word:-1,wordMode:'none'});}
        else patch({index:i,word:-1,wordMode:'none'});
        return Promise.resolve(false);
      }
      return api.play(i,{onlyOne});
    },
    next(){return api.step(1);},
    prev(){return api.step(-1);},
    /** Previous or next sentence; keeps reading when it was reading, otherwise only moves the marker. */
    step(delta){
      const i=clamp(state.index+delta,0,sentences.length-1);
      if(i===state.index&&!['playing','loading'].includes(state.status))return Promise.resolve(false);
      if(['playing','loading'].includes(state.status)&&state.mode!=='manual')return api.play(i,{onlyOne:single});
      patch({index:i,word:-1,wordMode:'none'});return Promise.resolve(false);
    },
    /** Change the speed while reading: the current sentence restarts at the new speed. */
    setRate(rate){
      const next=clamp(Number(rate)||state.rate,0.3,2);
      if(next===state.rate)return;
      state.rate=next;
      if(audioEl)audioEl.playbackRate=next;
      if(['playing','loading'].includes(state.status)&&state.mode==='speech'){patch({});void startSpeech(state.index);return;}
      emit();
    },
    setVoice(uri){if(uri!==voiceUri){voiceUri=uri||'';voice=null;}},
    destroy(){
      if(destroyed)return;
      halt();drop();destroyed=true;
      if(audioEl){audioEl.pause?.();audioEl=null;}
    }
  };
  return api;
}
