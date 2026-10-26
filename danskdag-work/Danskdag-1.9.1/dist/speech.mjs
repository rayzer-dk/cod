export function getDanishVoices(synthesis=globalThis.speechSynthesis) {
  return synthesis?.getVoices?.().filter(v=>/^da(?:[-_]|$)/i.test(v.lang)) || [];
}

function selectedVoice(preferred,synthesis){const voices=getDanishVoices(synthesis);return voices.find(v=>v.voiceURI===preferred)||voices[0];}
let current=null,owner=null;

export const pickDanishVoice=(preferred='',synthesis=globalThis.speechSynthesis)=>{try{return selectedVoice(preferred,synthesis)||null;}catch{return null;}};
export function speechSupported(){return typeof globalThis.speechSynthesis?.getVoices==='function'&&typeof globalThis.speechSynthesis.speak==='function'&&typeof globalThis.SpeechSynthesisUtterance==='function';}

export function isSpeechActive(){return current!==null||owner!==null;}

/** A long-running player (the PD3 reader) claims the one audio output: any other speech or player is stopped, and a later speak() or claim stops this one. */
export function claimSpeech(onPreempt=()=>{}){
  const token={onPreempt};
  const previous=owner;owner=null;
  if(current)finish(current,'idle',true);
  previous?.onPreempt();
  owner=token;
  return ()=>{if(owner===token)owner=null;};
}

function clearVoiceListener(request){
  if(request.voiceListener){
    request.synthesis.removeEventListener?.('voiceschanged',request.voiceListener);
    request.voiceListener=null;
  }
}
function finish(request,phase='idle',cancel=false){
  if(current!==request)return;
  clearTimeout(request.timer);clearVoiceListener(request);current=null;
  if(cancel)request.synthesis.cancel?.();
  request.onState(phase);
}
export function stopSpeech(){
  const player=owner;owner=null;
  if(current)finish(current,'idle',true);
  else globalThis.speechSynthesis?.cancel?.();
  player?.onPreempt();
}

/** Resolves with a Danish voice as soon as the device reports one, or with null after `timeout` ms (voices often load late). */
export function waitForDanishVoice(preferred='',{timeout=2000,synthesis=globalThis.speechSynthesis}={}){
  return new Promise(resolve=>{
    const found=()=>pickDanishVoice(preferred,synthesis);
    const first=found();
    if(first||typeof synthesis?.getVoices!=='function'){resolve(first);return;}
    let done=false,timer=null,poll=null;
    const finishWait=voice=>{
      if(done)return;done=true;clearTimeout(timer);clearInterval(poll);
      synthesis.removeEventListener?.('voiceschanged',check);resolve(voice);
    };
    const check=()=>{const voice=found();if(voice)finishWait(voice);};
    synthesis.addEventListener?.('voiceschanged',check);
    poll=setInterval(check,250);poll.unref?.();
    timer=setTimeout(()=>finishWait(found()),timeout);timer.unref?.();
  });
}

export function voiceStatus(preferred='') {
  const voice = selectedVoice(preferred);
  return voice ? `Датский голос: ${voice.name}` : 'Датский голос не найден на устройстве';
}

export function speak(text, rate = 0.85, onError = () => {}, preferred='', onState=()=>{}) {
  stopSpeech();
  const synthesis=globalThis.speechSynthesis;
  const playbackError='Не удалось воспроизвести звук. Попробуй ещё раз или открой текст.';
  if(typeof synthesis?.getVoices!=='function'||typeof synthesis.speak!=='function'||typeof globalThis.SpeechSynthesisUtterance!=='function'){
    onState('error');onError(playbackError);return false;
  }
  const request={onState,synthesis,timer:null,voiceListener:null};current=request;onState('loading');
  if(current!==request)return true;
  const fail=message=>{
    if(current!==request)return;
    finish(request,'error',true);onError(message);
  };
  const timeout=(delay,callback)=>{
    if(current!==request)return;
    clearTimeout(request.timer);
    request.timer=setTimeout(()=>{if(current===request)callback();},delay);request.timer?.unref?.();
  };
  const play=voice=>{
    if(current!==request||request.utterance)return false;
    clearTimeout(request.timer);clearVoiceListener(request);
    try{
      const utterance = new globalThis.SpeechSynthesisUtterance(text);
      utterance.lang = 'da-DK';utterance.voice = voice;utterance.rate = rate;
      utterance.onstart=()=>{if(current!==request)return;onState('speaking');timeout(180000,()=>fail('Озвучка остановлена. Попробуй ещё раз.'));};
      utterance.onend=()=>finish(request);
      utterance.onerror = event => {
        if(current!==request)return;
        const canceled=['interrupted','canceled'].includes(event.error);
        finish(request,canceled?'idle':'error');
        if(!canceled)onError(playbackError);
      };
      request.utterance=utterance;
      timeout(10000,()=>fail('Озвучка не началась. Проверь датский голос в настройках.'));
      synthesis.speak(utterance);
      return true;
    }catch{
      fail(playbackError);return false;
    }
  };
  const tryVoice=()=>{
    if(current!==request||request.utterance)return false;
    try{
      const voice=selectedVoice(preferred,synthesis);
      return voice?play(voice):false;
    }catch{
      fail(playbackError);return false;
    }
  };
  try{
    const voice=selectedVoice(preferred,synthesis);
    if(voice)return play(voice);
    request.voiceListener=()=>tryVoice();
    synthesis.addEventListener?.('voiceschanged',request.voiceListener);
    timeout(2000,()=>{
      if(!tryVoice()&&current===request)fail('Датский голос не найден. В настройках есть пояснение; задание можно выполнить с текстом.');
    });
    // Recheck after subscribing so voice discovery between the first read and listener is not missed.
    return tryVoice()||current===request;
  }catch{
    fail(playbackError);return false;
  }
}
