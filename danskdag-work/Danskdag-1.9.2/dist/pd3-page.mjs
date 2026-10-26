// Controller of the PD3 section: navigation between its pages, reader/timer/recorder lifecycles, saving to the PD3 store.
import {captureFocus,restoreFocus,focusPageStart} from './accessibility.mjs';
import {createReader,READER_RATES} from './pd3-audio.mjs';
import {speak,stopSpeech} from './speech.mjs';
import {createRecorder} from './recorder.mjs';
import {scoreDictation} from './pd3-diff.mjs';
import {recordScore,LIMITS} from './pd3-store.mjs';
import {vocabExample} from './pd3-vocab.mjs';
import {countWords} from './pd3-writing-check.mjs';
import {applyReaderState,statusText} from './pd3-reader-view.mjs';
import {hubView,readingListView,readingItemView,dictationListView,dictationItemView,listeningListView,listeningItemView} from './pd3-views.mjs';
import {examListView,examIntroView,examFindView,examTextView,writingListView,writingItemView,wordMeter,oralView,recorderHtml} from './pd3-practice-views.mjs';

const EMPTY_DATA={readingPractice:[],readingExamFind:[],readingExamText:[],dictations:[],listening:[],oralMonologue:[],oralInterview:[],oralInteraction:[],oralDiscussion:[],oralPhrases:[],oralCriteria:[],writingEmail:[],writingTask:[],writingCriteria:[],connectors:[]};
const TITLES={hub:'PD3',reading:'PD3 — чтение вслух',dictation:'PD3 — диктанты',listening:'PD3 — аудирование',exam:'PD3 — чтение (экзамен)',writing:'PD3 — письмо',oral:'PD3 — устная часть'};
const REC_LIMITS={monologue:150,interview:60,interaction:60,discussion:90};
const ORAL_PREFIX={monologue:'mono',interview:'intv',interaction:'inter',discussion:'disc'};
const interactive='button,a[href],input,textarea,select,summary,audio,[role=button]';

export function createPd3Page({data,store,deps}){
  const D={...EMPTY_DATA,...data};
  const now=deps.now||(()=>Date.now());
  const doc=()=>deps.document||globalThis.document;
  let ui={view:'hub',id:null,kind:null};
  let run=null,reader=null,rec=null,timer=null,saveTimer=null,lastField=null,lastStatus='',errorShown=false;
  const d=()=>store.get();
  const container=()=>deps.container();

  /* ---------- helpers ---------- */
  /** Counts a finished activity in the learner's progress (XP, streak, day). Only checked, non-empty results count; see awardPd3 in engine.mjs. */
  function complete(kind,id,percent){
    const minutes=Math.max(1,Math.min(60,Math.round((now()-(run?.t0??now()))/60000)));
    const result=deps.award?.({kind,id,percent:Math.round(percent),minutes})||{xp:0,counted:false};
    if(run)run.xp=result.xp;
    return result;
  }
  const xpText=result=>result.xp>0?` +${result.xp} XP`:'';
  function persist(change){
    const ok=store.update(change);
    if(!ok&&!errorShown){errorShown=true;deps.toast(store.status.error==='size'?'Данные PD3 слишком велики для сохранения. Скачай копию PD3 в разделе PD3 и удали лишнее.':'Не удалось сохранить результаты PD3 в браузере. Скачай копию PD3 в разделе PD3.');}
    if(ok)errorShown=false;
    return ok;
  }
  const item=()=>{
    const pick=(list)=>list.find(x=>x.id===ui.id);
    switch(ui.view){
      case 'reading':return pick(D.readingPractice);
      case 'dictation':return pick(D.dictations);
      case 'listening':return pick(D.listening);
      case 'exam':return ui.kind==='text'?pick(D.readingExamText):pick(D.readingExamFind);
      case 'writing':return ui.kind==='task'?pick(D.writingTask):pick(D.writingEmail);
      default:return null;
    }
  };
  function stopTimer(){if(timer){clearInterval(timer.id);timer=null;}}
  function destroyReader(){reader?.destroy();reader=null;}
  function clearRecorder(){rec?.clear();rec=null;if(run?.rec)run.rec={phase:'idle',url:'',message:''};}
  function teardown(){
    flushDraft();stopTimer();destroyReader();clearRecorder();stopSpeech();
  }

  /* ---------- rendering ---------- */
  function html(){
    const view=ui.view,it=item(),settings=d();
    const error=store.status.broken?'Сохранённые данные PD3 не удалось прочитать. Их копия сохранена в браузере, раздел начат заново.':store.status.error==='unavailable'?'Браузер не даёт сохранять результаты PD3. Скачай копию PD3 вручную.':'';
    const ctx={data:D,d:settings,run,error,now:new Date(now()),known:deps.vocab?.has};
    if(view==='hub')return hubView(ctx);
    if(view==='reading')return it?readingItemView({item:it,d:settings,run,known:deps.vocab?.has}):readingListView(ctx);
    if(view==='dictation')return it?dictationItemView({item:it,d:settings,run}):dictationListView(ctx);
    if(view==='listening')return it?listeningItemView({item:it,d:settings,run}):listeningListView(ctx);
    if(view==='exam'){
      if(!it)return examListView(ctx);
      if(run.phase==='intro')return examIntroView({kind:ui.kind,item:it,d:settings});
      return ui.kind==='find'?examFindView({item:it,run}):examTextView({item:it,run});
    }
    if(view==='writing')return it?writingItemView({kind:ui.kind,item:it,d:settings,run,data:D}):writingListView(ctx);
    if(view==='oral')return oralView({data:D,d:settings,run});
    return hubView(ctx);
  }
  const wrap=()=>`<div class="pd3" data-pd3-view="${ui.view}">${html()}</div>`;

  function afterRender(){
    const el=container();
    if(!el)return;
    deps.enhance?.(el);
    if(reader)paintReader(reader.snapshot());
    if(timer)paintTimer();
  }
  function render({keepScroll=true}={}){
    const el=container();
    if(!el)return;
    const focus=captureFocus(el),y=globalThis.scrollY;
    el.innerHTML=wrap();
    afterRender();
    if(focus)restoreFocus(el,focus);
    if(keepScroll)globalThis.scrollTo?.({top:y,behavior:'instant'});
  }
  function title(){deps.setTitle?.(TITLES[ui.view]||TITLES.hub);}

  /** The markup for the app's page renderer. */
  function view(){return `<div id="pd3-root">${wrap()}</div>`;}

  /* ---------- navigation ---------- */
  function open(viewName,id=null,kind=null,{focus=true}={}){
    teardown();
    ui={view:viewName,id,kind};
    run=makeRun();
    render({keepScroll:false});
    globalThis.scrollTo?.({top:0,behavior:'instant'});
    title();
    if(focus)focusPageStart(container(),'h1');
  }
  function makeRun(){
    const created=buildRun();
    if(created)created.t0=now();
    return created;
  }
  function buildRun(){
    const it=item();
    switch(ui.view){
      case 'reading':return it?{answers:{},checked:false,score:0,snap:null}:null;
      case 'dictation':return it?{inputs:{},plays:{},result:null,snap:null}:null;
      case 'listening':return it?{phase:'listen',plays:0,answers:{},score:0,snap:null}:null;
      case 'exam':return it?{phase:'intro',kind:ui.kind,answers:{},task:'t1',timerOn:true,remaining:null,timeUp:false}:null;
      case 'writing':{
        if(!it)return null;
        const stored=d().writing[it.id]||{};
        return {phase:'write',option:ui.kind==='task'?(stored.option||'A'):'A',text:stored.draft||'',remaining:null,timerOn:false};
      }
      case 'oral':return {tab:'monologue',id:null,key:'',step:0,started:false,kw:[],rec:{phase:'idle',url:'',message:''},remaining:null,timerOn:false};
      default:return null;
    }
  }

  /* ---------- reader ---------- */
  function readerSettings(){return ui.view==='dictation'?d().settings.dictation:d().settings.reader;}
  function paintReader(snap){
    const el=container();
    if(!el)return;
    const it=item();
    applyReaderState(el,snap,{follow:d().settings.reader.follow,sentences:it?.sentences});
  }
  function ensureReader(sentences,{gap=0}={}){
    destroyReader();
    const settings=readerSettings();
    reader=createReader({
      sentences:sentences.map(s=>s.da??s),voiceUri:deps.voiceUri(),rate:settings.rate,calibration:d().settings.reader.calibration,gap,
      audio:deps.offline?null:(item()?.audio||null),
      onChange:snap=>{
        if(run)run.snap=snap;
        paintReader(snap);
        const status=snap.status;
        if(ui.view==='listening'&&run&&run.phase!=='result'&&status!==lastStatus)render();
        if(status==='finished'&&Math.abs(snap.calibration-d().settings.reader.calibration)>0.03)persist(s=>{s.settings.reader.calibration=snap.calibration;});
        lastStatus=status;
      }
    });
    lastStatus='idle';
    return reader;
  }
  function startReading(from,options){
    if(!reader)return;
    if(rec&&['recording','requesting','stopping'].includes(run?.rec?.phase)){deps.toast('Сначала останови запись.');return;}
    reader.setVoice(deps.voiceUri());
    void reader.play(from,options);
  }
  function playPressed(){
    if(!reader)return;
    const s=reader.snapshot();
    if(['playing','loading'].includes(s.status))reader.pause();
    else startReading(s.status==='finished'?0:undefined);
  }

  /* ---------- timers ---------- */
  function startTimer(seconds,onEnd,announceAt=[]){
    stopTimer();
    timer={endsAt:now()+seconds*1000,onEnd,announceAt,said:new Set(),id:setInterval(tick,1000)};
    run.timerOn=true;run.remaining=seconds;
    paintTimer();
  }
  function paintTimer(){
    const el=container()?.querySelector('#pd3-timer');
    if(el&&run?.remaining!=null)el.textContent=clockText(run.remaining);
  }
  const clockText=seconds=>`${Math.floor(seconds/60)}:${String(seconds%60).padStart(2,'0')}`;
  function tick(){
    if(!timer)return;
    const remaining=Math.max(0,Math.ceil((timer.endsAt-now())/1000));
    run.remaining=remaining;paintTimer();
    for(const mark of timer.announceAt)if(remaining<=mark&&!timer.said.has(mark)&&remaining>0){timer.said.add(mark);deps.announce?.(mark>=120?`Осталось ${Math.round(mark/60)} мин`:'Осталась 1 минута');}
    if(remaining<=0){const end=timer.onEnd;stopTimer();run.timerOn=false;end?.();}
  }

  /* ---------- reading practice ---------- */
  function openReading(id){
    open('reading',id);
    const it=item();
    if(it)ensureReader(it.sentences);
  }
  function checkReading(){
    const it=item();
    if(it.questions.some((_,i)=>run.answers[`q:${i}`]===undefined)){deps.toast('Ответь на все вопросы, потом нажми «Проверить ответы».');return;}
    run.score=it.questions.filter((q,i)=>run.answers[`q:${i}`]===q.answer).length;run.checked=true;
    const percent=Math.round(run.score/it.questions.length*100);
    persist(s=>{recordScore(s.reading,it.id,percent,null,now());});
    const award=complete('reading',it.id,percent);
    render();deps.announce?.(`Результат: ${run.score} из ${it.questions.length}.${xpText(award)}`);
    container().querySelector('.pd3-result')?.scrollIntoView({block:'center'});
  }

  /* ---------- dictation ---------- */
  function openDictation(id){
    open('dictation',id);
    const it=item();
    if(it)buildDictationReader(it);
  }
  function buildDictationReader(it){
    const gap=it.mode==='text'?(i=>1200+countWords(it.sentences[i].da)*400):0;
    ensureReader(it.sentences,{gap});
  }
  function dictationListen(pos){
    const limit=d().settings.dictation.limit,key=pos==='all'?'all':Number(pos);
    if(limit&&(run.plays[key]||0)>=limit)return;
    run.plays[key]=(run.plays[key]||0)+1;
    startReading(key==='all'?0:key,{onlyOne:key!=='all'});
    render();
  }
  function checkDictation(){
    const it=item(),settings=d().settings.dictation;
    flushInputs();
    const result=scoreDictation(it.sentences,run.inputs,it.mode,{strict:settings.strict});
    run.result=result;
    // An empty check shows its result but is not saved: it would count as a finished dictation and as a mistake statistic.
    const typed=Object.values(run.inputs).some(value=>String(value).trim());
    let award={xp:0};
    if(typed){
      persist(s=>{
        recordScore(s.dictation,it.id,result.percent,null,now());
        const stats=s.stats.dictation;
        stats.runs=Math.min(1000000,stats.runs+1);
        for(const entry of result.errors)stats.errors[entry.kind]=Math.min(1000000,(stats.errors[entry.kind]||0)+entry.count);
      });
      award=complete('dictation',it.id,result.percent);
    }
    ensureReader(it.sentences);
    render({keepScroll:false});
    globalThis.scrollTo?.({top:0,behavior:'instant'});
    deps.announce?.(`Диктант проверен: ${result.percent}%.${xpText(award)}`);
    focusPageStart(container(),'h1');
  }
  function flushInputs(){
    for(const field of container()?.querySelectorAll('[data-pd3-field]')||[])run.inputs[field.dataset.pd3Field]=field.value;
  }

  /* ---------- listening ---------- */
  function openListening(id){
    open('listening',id);
    const it=item();
    if(it)ensureReader(it.sentences);
  }
  function listenPressed(){
    const it=item(),max=it.plays||2,s=reader.snapshot();
    if(['playing','loading'].includes(s.status)){reader.pause();return;}
    if(s.status==='paused'){startReading();return;}
    if(run.plays>=max)return;
    run.plays++;
    startReading(0);
    render();
  }
  function checkListening(){
    const it=item();
    if(it.questions.some((_,i)=>run.answers[`q:${i}`]===undefined)){deps.toast('Ответь на все вопросы, потом нажми «Проверить».');return;}
    run.score=it.questions.filter((q,i)=>run.answers[`q:${i}`]===q.answer).length;run.phase='result';
    const percent=Math.round(run.score/it.questions.length*100);
    persist(s=>{recordScore(s.listening,it.id,percent,null,now());});
    const award=complete('listening',it.id,percent);
    ensureReader(it.sentences);
    render({keepScroll:false});
    deps.announce?.(`Результат: ${run.score} из ${it.questions.length}.${xpText(award)}`);
    focusPageStart(container(),'h1');
  }

  /* ---------- reading exam ---------- */
  function startExam(){
    const it=item(),minutes=it.minutes||(ui.kind==='find'?25:65);
    run.phase='run';run.timerOn=d().settings.exam.timer;run.timeUp=false;
    if(run.timerOn)startTimer(minutes*60,()=>{run.timeUp=true;finishExam();deps.announce?.('Время вышло. Ответы проверены.');},[600,300,60]);
    else run.remaining=null;
    render({keepScroll:false});
    globalThis.scrollTo?.({top:0,behavior:'instant'});
    focusPageStart(container(),'h1');
  }
  function finishExam(){
    const it=item();
    stopTimer();run.timerOn=false;run.phase='result';
    if(ui.kind==='find'){
      const score=it.questions.filter(q=>run.answers[`find:${q.id}`]===q.section).length;
      const percent=Math.round(score/it.questions.length*100);
      persist(s=>{recordScore(s.exam.find,it.id,percent,null,now());});
      complete('exam-find',it.id,percent);
    }else{
      const gaps2=it.text2.parts.filter(p=>p.gap).map(p=>p.gap),gaps3=it.text3.segments.filter(x=>typeof x!=='string');
      const s1=it.text1.questions.filter((q,i)=>run.answers[`t1:${i}`]===q.answer).length;
      const s2=gaps2.filter(n=>run.answers[`t2:${n}`]===it.text2.solution[n]).length;
      const s3=gaps3.filter(g=>run.answers[`t3:${g.gap}`]===g.answer).length;
      const total=it.text1.questions.length+gaps2.length+gaps3.length;
      const percent=Math.round((s1+s2+s3)/total*100);
      persist(s=>{recordScore(s.exam.text,it.id,percent,[s1/it.text1.questions.length*100,s2/gaps2.length*100,s3/gaps3.length*100],now());});
      complete('exam-text',it.id,percent);
    }
    render({keepScroll:false});
    globalThis.scrollTo?.({top:0,behavior:'instant'});
    focusPageStart(container(),'h1');
  }

  /* ---------- writing ---------- */
  function saveDraft(){
    clearTimeout(saveTimer);saveTimer=null;
    const it=item();
    if(ui.view!=='writing'||!it||!run)return;
    const ok=persist(s=>{
      const w=s.writing[it.id]||(s.writing[it.id]={draft:'',option:'A',updatedAt:0,done:false,req:[],check:[],self:{}});
      w.draft=run.text.slice(0,LIMITS.draft);w.option=run.option;w.updatedAt=now();
    });
    const label=container()?.querySelector('#pd3-saved');
    if(label)label.textContent=ok?`Черновик сохранён в ${new Date(now()).toLocaleTimeString([], {hour:'2-digit',minute:'2-digit'})}.`:'Не удалось сохранить черновик. Скопируй текст или скачай копию PD3.';
  }
  function flushDraft(){if(saveTimer)saveDraft();}
  function updateWritingMeter(){
    const it=item(),el=container();
    if(!it||!el)return;
    const meter=wordMeter(countWords(run.text),it.minWords,it.maxWords);
    const count=el.querySelector('#pd3-count'),bar=el.querySelector('#pd3-count-bar');
    if(count){count.className=`pd3-count pd3-count-${meter.level}`;count.innerHTML=meter.html;}
    if(bar)bar.style.width=`${meter.percent}%`;
  }
  function writingTimerPressed(){
    if(run.timerOn){stopTimer();run.timerOn=false;render();return;}
    startTimer(d().settings.writing.minutes*60,()=>{deps.announce?.('Время вышло. Заверши ответ.');render();},[600,300,60]);
    render();
  }

  /* ---------- oral ---------- */
  function oralKey(){return run.id?`${ORAL_PREFIX[run.tab]}-${run.id}`.slice(0,60):'';}
  function recorder(){
    const max=REC_LIMITS[run.tab]||20;
    if(rec&&rec.maxSeconds!==max){rec.clear();rec=null;}
    if(!rec)rec=(deps.makeRecorder||createRecorder)({maxSeconds:max,changed:snap=>recorderChanged(snap,max)});
    return rec;
  }
  function recorderChanged(snap,max){
    if(!run)return;
    run.rec=snap;
    const box=container()?.querySelector('.pd3-recorder');
    if(!box)return;
    const hadFocus=box.contains(doc().activeElement);
    box.outerHTML=recorderHtml(snap,{maxSeconds:max});
    if(hadFocus)container().querySelector('.pd3-recorder button:not([disabled])')?.focus({preventScroll:true});
  }
  function resetOralItem(){
    clearRecorder();stopSpeech();stopTimer();
    run.step=0;run.started=false;run.timerOn=false;run.remaining=run.tab==='monologue'?120:null;
  }
  function pickOral(id){
    run.id=id;run.key=oralKey();resetOralItem();
    if(run.tab==='monologue'){
      const m=D.oralMonologue.find(x=>x.id===id),stored=d().oral[run.key]?.keywords;
      run.kw=(stored?.length?stored:m?.keywords||[]).slice(0,LIMITS.keywords);
    }
    render();
  }
  function saveKeywords(){
    if(!run.key)return;
    persist(s=>{const o=s.oral[run.key]||(s.oral[run.key]={keywords:[],self:{},done:false,updatedAt:0});o.keywords=run.kw.map(w=>w.trim()).filter(Boolean);o.updatedAt=now();});
  }
  function sayText(text,el){
    if(['requesting','recording','stopping'].includes(run?.rec?.phase)){deps.toast('Сначала останови запись.');return false;}
    return deps.say?deps.say(text,undefined,el):speak(text,0.9,deps.toast,deps.voiceUri());
  }

  /* ---------- events ---------- */
  function click(el){
    const action=el.dataset.action,value=el.dataset.value,id=el.dataset.id,pos=el.dataset.pos;
    switch(action){
      case 'pd3-open':case 'pd3-advice':open(value);return true;
      case 'pd3-pick':
        if(ui.view==='reading')openReading(id);
        else if(ui.view==='dictation')openDictation(id);
        else if(ui.view==='listening')openListening(id);
        else if(ui.view==='exam')open('exam',id,value);
        else if(ui.view==='writing')open('writing',id,value);
        if(ui.view==='exam')run.phase='intro';
        return true;
      case 'pd3-export':{
        const name=`Danskdag_PD3_${new Date(now()).toISOString().slice(0,10)}.json`;
        (deps.download||downloadFile)(name,store.exportJson());deps.toast('Копия PD3 подготовлена для скачивания.');return true;}
      case 'pd3-import':container().querySelector('#pd3-file')?.click();return true;
      case 'pd3-plan-clear':persist(s=>{s.plan.examDate='';});render();container()?.querySelector('#pd3-exam-date')?.focus({preventScroll:true});return true;
      case 'pd3-weak-practice':if(D.dictations.some(x=>x.id===id))openDictation(id);return true;
      case 'pd3-vocab-add':addVocab(pos===undefined?[]:[Number(pos)]);return true;
      case 'pd3-vocab-all':addVocab('all');return true;
      case 'pd3-play':playPressed();return true;
      case 'pd3-prev':void reader?.prev();return true;
      case 'pd3-next':void reader?.next();return true;
      case 'pd3-stop':reader?.stop();return true;
      case 'pd3-seek':startOrMark(Number(pos));return true;
      case 'pd3-rate':{
        const rate=Number(value);if(!READER_RATES.includes(rate))return true;
        persist(s=>{s.settings.reader.rate=rate;});reader?.setRate(rate);render();return true;}
      case 'pd3-dict-rate':{
        const rate=Number(value);if(!READER_RATES.includes(rate))return true;
        persist(s=>{s.settings.dictation.rate=rate;});reader?.setRate(rate);render();return true;}
      case 'pd3-dict-limit':persist(s=>{s.settings.dictation.limit=Number(value);});render();return true;
      case 'pd3-check':if(ui.view==='reading')checkReading();else if(ui.view==='listening')checkListening();return true;
      case 'pd3-dict-listen':dictationListen(pos);return true;
      case 'pd3-dict-check':checkDictation();return true;
      case 'pd3-dict-again':{const it=item();run=makeRun();buildDictationReader(it);render({keepScroll:false});focusPageStart(container(),'h1');return true;}
      case 'pd3-listen':listenPressed();return true;
      case 'pd3-exam-start':startExam();return true;
      case 'pd3-exam-finish':finishExam();return true;
      case 'pd3-task':run.task=value;render({keepScroll:false});return true;
      case 'pd3-jump':{const target=container().querySelector(`#pd3-sec-${CSS.escape(id)}`);const heading=target?.querySelector('h3');target?.scrollIntoView({block:'start'});heading?.focus({preventScroll:true});return true;}
      case 'pd3-letter':insertLetter(el.dataset.letter);return true;
      case 'pd3-wopt':saveDraft();run.option=value;persist(s=>{const w=s.writing[item().id];if(w)w.option=value;});render();return true;
      case 'pd3-wtimer':writingTimerPressed();return true;
      case 'pd3-write-done':{
        saveDraft();const it=item();
        persist(s=>{const w=s.writing[it.id]||(s.writing[it.id]={draft:run.text,option:run.option,updatedAt:now(),done:false,req:[],check:[],self:{}});w.done=true;w.updatedAt=now();});
        // A text shorter than half of the minimum length does not count as a finished piece of writing.
        if(countWords(run.text)>=Math.ceil((it.minWords||0)/2)&&countWords(run.text)>0){const award=complete('writing',it.id,100);if(award.xp>0)deps.announce?.(`Письмо завершено.${xpText(award)}`);}
        else deps.toast('Текст короче половины нужного объёма: в прогресс он не засчитан. Дополни его и нажми «Готово» снова.');
        stopTimer();run.timerOn=false;run.phase='done';render({keepScroll:false});globalThis.scrollTo?.({top:0,behavior:'instant'});focusPageStart(container(),'h1');return true;}
      case 'pd3-write-edit':run.phase='write';render({keepScroll:false});focusPageStart(container(),'h1');return true;
      case 'pd3-oral-tab':run.tab=value;run.id=null;run.key='';resetOralItem();render({keepScroll:false});return true;
      case 'pd3-oral-pick':pickOral(id);return true;
      case 'pd3-kw-remove':run.kw.splice(Number(pos),1);saveKeywords();render();return true;
      case 'pd3-kw-add':if(run.kw.length<LIMITS.keywords){run.kw.push('');render();container().querySelector(`#pd3-kw-${run.kw.length-1}`)?.focus();}return true;
      case 'pd3-kw-reset':{const m=D.oralMonologue.find(x=>x.id===run.id);run.kw=(m?.keywords||[]).slice(0,LIMITS.keywords);saveKeywords();render();return true;}
      case 'pd3-mono-start':{
        stopSpeech();resetOralItem();
        startTimer(120,()=>{rec?.stop();deps.announce?.('Две минуты прошли.');render();},[60]);
        void recorder().start();render();return true;}
      case 'pd3-mono-stop':stopTimer();run.timerOn=false;rec?.stop();render();return true;
      case 'pd3-rec-start':stopSpeech();void recorder().start();return true;
      case 'pd3-rec-stop':rec?.stop();return true;
      case 'pd3-rec-clear':rec?.clear();return true;
      case 'pd3-say':sayText(el.dataset.text,el);return true;
      case 'pd3-iq':clearRecorder();run.step=Math.max(0,run.step+Number(value));render();return true;
      case 'pd3-int-start':{
        const it=D.oralInteraction.find(x=>x.id===run.id);run.started=true;run.step=0;render();
        sayText(it.partner[0].da,null);return true;}
      case 'pd3-int-next':{
        const it=D.oralInteraction.find(x=>x.id===run.id);clearRecorder();run.step=Math.min(it.partner.length-1,run.step+1);render();
        sayText(it.partner[run.step].da,null);return true;}
      case 'pd3-int-restart':resetOralItem();render();return true;
      default:return false;
    }
  }
  /** Adds words of the open reading text to the learner's own words (with a sentence from the text as the example). */
  function addVocab(which){
    const it=item();
    if(ui.view!=='reading'||!it?.vocab||!deps.vocab)return;
    const indexes=which==='all'?it.vocab.map((_,i)=>i):which.filter(i=>Number.isInteger(i)&&it.vocab[i]);
    const words=indexes.map(i=>({da:it.vocab[i].da,ru:it.vocab[i].ru,note:vocabExample(it.vocab[i].da,it.sentences)}));
    const result=deps.vocab.add(words);
    render();
    container()?.querySelector('.pd3-vocab summary')?.focus({preventScroll:true});
    if(result.added)deps.announce?.(`Добавлено в мои слова: ${result.added}.${result.skipped?` Уже были в словаре: ${result.skipped}.`:''}`);
    else deps.announce?.(result.failed?'Не удалось добавить слова.':'Эти слова уже есть в словаре.');
  }
  function startOrMark(pos){
    if(!reader)return;
    if(ui.view==='dictation'&&!run.result)return;
    void reader.seek(pos).then(()=>{ if(reader&&reader.snapshot().mode==='manual')deps.announce?.(statusText(reader.snapshot())); });
  }
  function insertLetter(letter){
    const el=container();
    const field=(lastField&&el.querySelector(`#${CSS.escape(lastField)}`))||el.querySelector('#pd3-write,#pd3-dict-text,[data-pd3-field]');
    if(!field)return;
    const start=field.selectionStart??field.value.length,end=field.selectionEnd??start;
    field.value=field.value.slice(0,start)+letter+field.value.slice(end);
    field.focus();field.setSelectionRange(start+1,start+1);
    field.dispatchEvent(new Event('input',{bubbles:true}));
  }
  function input(target){
    if(target.id==='pd3-write'&&run){
      run.text=target.value;updateWritingMeter();
      clearTimeout(saveTimer);saveTimer=setTimeout(saveDraft,700);
      const label=container()?.querySelector('#pd3-saved');if(label)label.textContent='Сохраняется…';
      return true;
    }
    if(target.dataset?.pd3Field!==undefined&&run){run.inputs[target.dataset.pd3Field]=target.value;return true;}
    if(target.dataset?.pd3Kw!==undefined&&run){run.kw[Number(target.dataset.pd3Kw)]=target.value;saveKeywords();return true;}
    return false;
  }
  function change(target){
    if(target.id==='pd3-file'){importFile(target);return true;}
    if(target.id==='pd3-exam-date'){persist(s=>{s.plan.examDate=target.value;});render();return true;}
    const setting=target.dataset?.pd3Setting;
    if(setting){
      const checked=target.checked;
      if(setting==='follow')persist(s=>{s.settings.reader.follow=checked;});
      else if(setting==='translation')persist(s=>{s.settings.reader.translation=checked;});
      else if(setting==='strict'){persist(s=>{s.settings.dictation.strict=checked;});if(run?.result){const it=item();run.result=scoreDictation(it.sentences,run.inputs,it.mode,{strict:checked});}}
      else if(setting==='timerExam')persist(s=>{s.settings.exam.timer=checked;});
      else if(setting==='writeTimer'){persist(s=>{s.settings.writing.timer=checked;});if(!checked){stopTimer();run.timerOn=false;}}
      else if(setting==='writeMinutes'){persist(s=>{s.settings.writing.minutes=Number(target.value);});stopTimer();run.timerOn=false;run.remaining=null;}
      if(setting!=='timerExam')render();
      return true;
    }
    if(target.dataset?.pd3Set){
      const key=target.dataset.pd3Set,raw=target.value;
      if(raw==='')delete run.answers[key];
      else run.answers[key]=key.startsWith('find:')||key.startsWith('t2:')?raw:Number(raw);
      if(ui.view==='exam')render();
      return true;
    }
    if(target.dataset?.pd3Check){
      const [list,index]=target.dataset.pd3Check.split(':'),i=Number(index),it=item();
      persist(s=>{const w=s.writing[it.id]||(s.writing[it.id]={draft:run.text,option:run.option,updatedAt:now(),done:false,req:[],check:[],self:{}});w[list][i]=target.checked;w.updatedAt=now();});
      return true;
    }
    if(target.dataset?.pd3Self){
      const criterion=target.dataset.pd3Self,score=Number(target.value);
      if(ui.view==='writing'){const it=item();persist(s=>{const w=s.writing[it.id]||(s.writing[it.id]={draft:run.text,option:run.option,updatedAt:now(),done:false,req:[],check:[],self:{}});w.self[criterion]=score;w.updatedAt=now();});}
      else if(ui.view==='oral'&&run.key){
        persist(s=>{const o=s.oral[run.key]||(s.oral[run.key]={keywords:[],self:{},done:false,updatedAt:0});o.self[criterion]=score;o.done=true;o.updatedAt=now();});
        // The oral part has no automatic check: it counts once at least three criteria have been rated.
        if(Object.keys(d().oral[run.key]?.self||{}).length>=3){const award=complete('oral',run.key,100);if(award.xp>0)deps.announce?.(`Устная часть отмечена.${xpText(award)}`);}
      }
      return true;
    }
    return false;
  }
  async function importFile(target){
    const file=target.files?.[0];
    if(!file)return;
    try{
      if(file.size>LIMITS.importBytes)throw new Error('size');
      const result=store.importJson(await file.text());
      if(result.ok){deps.toast('Копия PD3 загружена и объединена с текущими данными.');render();}
      else deps.toast(result.error==='format'?'Этот файл не похож на копию PD3. Данные не изменены.':result.error==='size'?'Файл слишком большой. Данные не изменены.':'Не удалось сохранить загруженные данные в браузере.');
    }catch{deps.toast('Не удалось прочитать файл. Данные не изменены.');}
    finally{target.value='';}
  }
  function downloadFile(name,text){
    const url=URL.createObjectURL(new Blob([text],{type:'application/json'})),a=doc().createElement('a');
    a.href=url;a.download=name;doc().body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),30000);
  }
  function keydown(event){
    if(!reader||event.defaultPrevented||event.ctrlKey||event.metaKey||event.altKey)return false;
    const readerView=ui.view==='reading'&&run||ui.view==='dictation'&&run?.result||ui.view==='listening'&&run?.phase==='result';
    if(!readerView)return false;
    const target=event.target;
    if(target.closest?.('input,textarea,select,[contenteditable="true"]'))return false;
    if(event.key===' '&&!target.closest?.(interactive)){event.preventDefault();playPressed();return true;}
    if(event.key==='ArrowRight'){event.preventDefault();void reader.next();return true;}
    if(event.key==='ArrowLeft'){event.preventDefault();void reader.prev();return true;}
    return false;
  }
  function focusin(event){const t=event.target;if(t?.matches?.('#pd3-write,#pd3-dict-text,[data-pd3-field]'))lastField=t.id||null;}

  /** The tab is hidden or the page is closing: save the draft and drop everything that should not outlive the view. */
  function suspend(){flushDraft();clearRecorder();reader?.stop();}
  /** The learner left the section (or chose it again): back to the hub with nothing left running. */
  function leave(){teardown();ui={view:'hub',id:null,kind:null};run=null;}

  return {view,mount:afterRender,click,input,change,keydown,focusin,suspend,leave,title,open,state:()=>({...ui}),reader:()=>reader};
}
