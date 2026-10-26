// Controller of the mock exam inside the PD3 page: the clock (absolute deadlines, one interval), the stage flow, pause and exit with
// confirmation, the report, saving to state.pd3.mocks and XP. The page (pd3-page.mjs) owns the screen, the recorder and the run store and
// hands them over in `ctx`; the logic is in pd3-mock.mjs, the markup in pd3-mock-view.mjs, the unfinished run in pd3-run.mjs.
import {focusPageStart} from './accessibility.mjs';
import {countWords} from './pd3-writing-check.mjs';
import {wordMeter} from './pd3-practice-views.mjs';
import {mockView} from './pd3-mock-view.mjs';
import {
  STAGE_TITLES,mockSets,defaultSetId,newMock,stageOf,stageNumber,buildSchedule,isFinished,isPaused,isExpired,pauseMock,resumeMock,
  finishStage,leaveBreak,secondsLeft,blockSecondsLeft,marksFor,resetDraft,monologueKeywords,buildReport,mockRecord,awardEvent
} from './pd3-mock.mjs';

const MARK_TEXT={600:'Осталось 10 минут',300:'Осталось 5 минут',60:'Осталась 1 минута',30:'Осталось 30 секунд'};
const clockText=seconds=>{const s=Math.max(0,Math.ceil(seconds));return `${Math.floor(s/60)}:${String(s%60).padStart(2,'0')}`;};
const WRITING={email:'writingEmail',task:'writingTask'};

export function createMockController(ctx){
  const {D,deps}=ctx;
  const sets=mockSets(D);
  let clock=null,said=new Set();
  const run=()=>ctx.getRun();
  const active=()=>ctx.getUi().view==='mock'&&!!run()?.mock;

  /* ---------- the run object ---------- */
  /** A new run object in the setup phase; the offered set is the one the learner has used least. */
  function createRun(){
    const r=resetDraft({},null,null);
    r.phase='setup';r.mock=null;r.report=null;
    r.setup={mode:'full',timerMode:'format',setId:defaultSetId(sets,ctx.d())};
    return r;
  }
  /** True while an exam is under way (a stage or the break): the page does not drop it when the learner opens something else. */
  const protects=()=>active()&&!isFinished(run().mock);

  /* ---------- the clock ---------- */
  function stopClock(){if(clock){clearInterval(clock);clock=null;}}
  function startClock(){
    stopClock();
    const r=run(),mock=r?.mock,stage=mock&&stageOf(mock);
    if(!stage||stage.kind==='break'||mock.deadline==null||isPaused(mock))return;
    const left=secondsLeft(mock,ctx.now());
    said=new Set(marksFor(stage.minutes*60).filter(mark=>left<=mark));
    clock=setInterval(tick,1000);
    paint();
  }
  function paint(){
    const r=run(),mock=r?.mock,el=ctx.container();
    if(!mock||!el||isFinished(mock))return;
    const t=ctx.now(),stageEl=el.querySelector('#pd3-mock-timer'),blockEl=el.querySelector('#pd3-mock-block');
    if(stageEl&&mock.deadline!=null)stageEl.textContent=clockText(secondsLeft(mock,t));
    if(blockEl&&mock.blockDeadline!=null)blockEl.textContent=clockText(blockSecondsLeft(mock,t));
  }
  function tick(){
    const r=run(),mock=r?.mock;
    if(!active()||!mock||isFinished(mock)){stopClock();return;}
    const t=ctx.now(),stage=stageOf(mock);
    if(isExpired(mock,t)){
      finishCurrent({auto:true});
      deps.announce?.('Время этапа вышло. Всё введённое сохранено.');
      return;
    }
    paint();
    if(isPaused(mock)||!stage)return;
    const left=secondsLeft(mock,t);
    for(const mark of marksFor(stage.minutes*60))if(left<=mark&&left>0&&!said.has(mark)){said.add(mark);deps.announce?.(`${MARK_TEXT[mark]} на этапе.`);}
  }

  /* ---------- stages ---------- */
  const stageLine=mock=>{const {n,total}=stageNumber(buildSchedule(mock.mode),mock.index);return `Этап ${n} из ${total}: ${STAGE_TITLES[stageOf(mock).kind]}.`;};
  /** Sets the draft fields and the clock for the stage the exam is in. `fresh` = a new stage (not a restored one). */
  function enterStage({fresh=true,announce=true}={}){
    const r=run(),mock=r.mock,stage=stageOf(mock);
    ctx.resetMedia();stopClock();
    if(fresh){
      resetDraft(r,stage?.kind,mock);
      if(stage?.kind==='mono')r.kw=monologueKeywords(D,mock);
    }
    if(stage&&stage.kind!=='break')startClock();
    if(announce&&stage)deps.announce?.(stage.kind==='break'?'Перерыв. Письменная часть закончена.':stageLine(mock));
  }
  function show({focus=true}={}){
    ctx.saveRun();
    ctx.render({keepScroll:false});
    globalThis.scrollTo?.({top:0,behavior:'instant'});
    ctx.title();
    if(focus)focusPageStart(ctx.container(),'h1');
  }
  /** Fixes the answers of the current stage (`auto` = the time ran out) and moves on. */
  function finishCurrent({auto=false}={}){
    const r=run(),mock=r.mock,stage=stageOf(mock);
    if(!stage||stage.kind==='break')return;
    stopClock();ctx.resetMedia();
    finishStage(mock,r,ctx.now(),{auto});
    r.confirm=null;r.report=null;
    if(isFinished(mock)){completeExam();show();deps.announce?.('Экзамен завершён. Итоги готовы.');return;}
    enterStage();
    show();
  }
  /** Stores the compact record in the learner's progress and pays the XP once for this exam. */
  function completeExam(){
    const r=run(),mock=r.mock;
    r.report=buildReport({mock,data:D,pd3:ctx.d()});
    const record=mockRecord(mock,r.report,ctx.now());
    ctx.persist(s=>{s.mocks={...(s.mocks||{}),[mock.id]:record};});
    const event=awardEvent(mock,r.report);
    const award=event?deps.award?.(event):null;
    mock.xp=award?.counted?Math.min(100,Math.max(0,award.xp|0)):0;
    r.report=null;
  }
  function report(){
    const r=run();
    if(!r.report)r.report=buildReport({mock:r.mock,data:D,pd3:ctx.d()});
    return r.report;
  }
  function setSelf(skill,criterion,score){
    const r=run(),mock=r.mock;
    if(!mock||!isFinished(mock)||!mock.self[skill]||!(score>=1&&score<=5))return;
    mock.self[skill][criterion]=score;r.report=null;
    const record=mockRecord(mock,report(),ctx.now());
    ctx.persist(s=>{s.mocks={...(s.mocks||{}),[mock.id]:record};});
    ctx.saveRun();
  }

  /* ---------- the screen ---------- */
  function html(){
    const r=run();
    return mockView({data:D,d:ctx.d(),run:r,now:ctx.now(),sets,report:r.mock&&isFinished(r.mock)?report():null});
  }
  function after(){
    const r=run();
    if(!r?.mock)return;
    paint();
    ctx.scheduleRunSave();
  }
  function titleText(){
    const r=run(),mock=r?.mock;
    if(!mock)return 'PD3 — пробный экзамен';
    if(isFinished(mock))return 'PD3 — пробный экзамен: итоги';
    const stage=stageOf(mock);
    if(stage.kind==='break')return 'PD3 — пробный экзамен: перерыв';
    const {n,total}=stageNumber(buildSchedule(mock.mode),mock.index);
    return `PD3 — пробный экзамен: этап ${n} из ${total}`;
  }

  /* ---------- restoring after a reload ---------- */
  /** Called by the page after the run object was filled from a stored record. Returns the message to show. */
  function afterRestore(record){
    const r=run(),mock=r.mock;
    r.phase='run';r.t0=mock.startedAt;r.report=null;
    const stage=stageOf(mock);
    if(stage?.kind==='mono'&&!(record.draft&&'kw' in record.draft))r.kw=monologueKeywords(D,mock);
    if(isFinished(mock))return 'Итоги пробного экзамена восстановлены.';
    let message='Пробный экзамен восстановлен: продолжай с того же места.';
    if(isExpired(mock,ctx.now())){
      // The time of the stage ran out while the page was closed: it ends as when the clock ends, with what was entered.
      finishStage(mock,r,ctx.now(),{auto:true});
      message='Время этапа вышло, пока страница была закрыта. Всё введённое сохранено.';
      if(isFinished(mock))completeExam();
      else enterStage({announce:false});
    }else enterStage({fresh:false,announce:false});
    ctx.saveRun();
    return message;
  }

  /* ---------- events ---------- */
  function ask(kind){
    const r=run();
    if(!['finish','pause','exit'].includes(kind)||!r.mock||isFinished(r.mock))return;
    if(kind==='finish'&&(isPaused(r.mock)||stageOf(r.mock).kind==='break'))return;
    if(kind==='pause'&&(isPaused(r.mock)||r.mock.deadline==null))return;
    r.confirm=kind;
    ctx.render();
    ctx.container()?.querySelector('[data-autofocus]')?.focus({preventScroll:false});
  }
  function exitExam(){
    stopClock();ctx.resetMedia();
    ctx.openHub();
  }
  function again(){
    const old=run().mock;
    if(!old)return;
    const setup={mode:old.mode,timerMode:old.timerMode,setId:old.set.id};
    ctx.open('mock',null,null,{force:true});
    run().setup=setup;
    ctx.render({keepScroll:false});
  }
  function click(el){
    const action=el.dataset.action,value=el.dataset.value,r=run();
    switch(action){
      case 'pd3-mock-mode':if(r.phase==='setup'&&['full','short'].includes(value)){r.setup.mode=value;ctx.render();}return true;
      case 'pd3-mock-timer':if(r.phase==='setup'&&['format','none'].includes(value)){r.setup.timerMode=value;ctx.render();}return true;
      case 'pd3-mock-start':{
        if(r.phase!=='setup')return true;
        const set=sets.find(s=>s.id===r.setup.setId)||sets[0];
        if(!set)return true;
        r.mock=newMock({mode:r.setup.mode,timerMode:r.setup.timerMode,set,now:ctx.now()});
        r.phase='run';r.t0=r.mock.startedAt;
        ctx.setUi({view:'mock',id:r.mock.id,kind:null});
        enterStage();show();return true;}
      case 'pd3-mock-ask':ask(value);return true;
      case 'pd3-mock-no':{
        const was=r.confirm;r.confirm=null;ctx.render();
        ctx.container()?.querySelector(`[data-action="pd3-mock-ask"][data-value="${was}"]`)?.focus({preventScroll:true});return true;}
      case 'pd3-mock-yes':{
        const kind=r.confirm;
        if(kind!==value||!r.mock)return true;
        r.confirm=null;
        if(kind==='finish')finishCurrent({auto:false});
        else if(kind==='pause'){
          if(pauseMock(r.mock,ctx.now())){stopClock();ctx.resetMedia();show({focus:false});ctx.container()?.querySelector('[data-action="pd3-mock-resume"]')?.focus();}
        }else if(kind==='exit')exitExam();
        return true;}
      case 'pd3-mock-resume':
        if(r.mock&&resumeMock(r.mock,ctx.now())){startClock();ctx.saveRun();ctx.render({keepScroll:false});ctx.title();focusPageStart(ctx.container(),'h1');}
        return true;
      case 'pd3-mock-continue':
        if(r.mock&&leaveBreak(r.mock,ctx.now())){enterStage();show();}
        return true;
      case 'pd3-mock-close':exitExam();return true;
      case 'pd3-mock-again':again();return true;
      case 'pd3-mock-go':ctx.openTarget(value,el.dataset.id,el.dataset.tab);return true;
      case 'pd3-wopt':
        if(r.mock&&['A','B'].includes(value)){r.option=value;ctx.render();ctx.scheduleRunSave();}
        return true;
      default:return false;
    }
  }
  function updateMeter(){
    const r=run(),stage=r?.mock&&stageOf(r.mock),el=ctx.container();
    if(!stage||!WRITING[stage.kind]||!el)return;
    const item=D[WRITING[stage.kind]].find(x=>x.id===r.mock.set[stage.kind]);
    if(!item)return;
    const meter=wordMeter(countWords(r.text),item.minWords,item.maxWords);
    const count=el.querySelector('#pd3-count'),bar=el.querySelector('#pd3-count-bar');
    if(count){count.className=`pd3-count pd3-count-${meter.level}`;count.innerHTML=meter.html;}
    if(bar)bar.style.width=`${meter.percent}%`;
  }
  function input(target){
    const r=run();
    if(!r?.mock)return false;
    if(target.id==='pd3-write'){r.text=target.value.slice(0,6000);updateMeter();ctx.scheduleRunSave();return true;}
    if(target.dataset?.pd3Kw!==undefined){r.kw[Number(target.dataset.pd3Kw)]=target.value;ctx.scheduleRunSave();return true;}
    return false;
  }
  function change(target){
    const r=run(),data=target.dataset||{};
    if(data.pd3Mock==='set'){
      if(r.phase==='setup'&&sets.some(s=>s.id===target.value)){r.setup.setId=target.value;ctx.render();}
      return true;
    }
    if(!r?.mock)return false;
    if(data.pd3Set){
      const key=data.pd3Set,raw=target.value;
      if(raw==='')delete r.answers[key];
      else r.answers[key]=key.startsWith('find:')||key.startsWith('t2:')?raw:Number(raw);
      ctx.saveRun();ctx.render();
      return true;
    }
    if(data.pd3Check){
      const [name,index]=data.pd3Check.split(':'),i=Number(index);
      if((name==='req'||name==='check')&&Number.isInteger(i)&&i>=0&&i<20){
        const flags=r[name];while(flags.length<=i)flags.push(false);
        flags[i]=target.checked;ctx.scheduleRunSave();
      }
      return true;
    }
    if(data.pd3Self){
      const skill=String(target.name||'').startsWith('pd3-mself-w')?'writing':'oral';
      setSelf(skill,data.pd3Self,Number(target.value));ctx.render();
      return true;
    }
    return false;
  }
  function keydown(event){
    const r=run();
    if(r?.confirm&&event.key==='Escape'&&!event.defaultPrevented){
      event.preventDefault();click({dataset:{action:'pd3-mock-no'}});return true;
    }
    return false;
  }

  return {createRun,protects,html,after,titleText,afterRestore,click,input,change,keydown,stop:stopClock,resume:startClock};
}
