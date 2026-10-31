// Controller of the grammar practice inside the PD3 page: the list and the intro, one task at a time (check, review, next), the timer with
// an absolute deadline, the result with its saving and XP. The page (pd3-page.mjs) owns the screen and the run store and hands them over in
// `ctx`; the logic is in pd3-grammar.mjs, the markup in pd3-grammar-view.mjs, the unfinished set in pd3-run.mjs.
import {focusPageStart,insertAtSelection} from './accessibility.mjs';
import {
  GRAMMAR_MINUTES,GRAMMAR_MARKS,GRAMMAR_MAX_TEXT,GRAMMAR_MAX_FIX,grammarSets,cleanAnswer,isComplete,checkItem,correctAnswer,scoreSet,countsForXp,
  recordGrammar,emptyGrammar,practiceSetFor,tileAdd,tileRemove,secondsLeft
} from './pd3-grammar.mjs';
import {grammarListView,grammarIntroView,grammarItemView,grammarResultView} from './pd3-grammar-view.mjs';

const MARK_TEXT={300:'Осталось 5 минут',60:'Осталась 1 минута',30:'Осталось 30 секунд'};
const clockText=seconds=>`${Math.floor(seconds/60)}:${String(seconds%60).padStart(2,'0')}`;
const NEED={
  gap:'Выбери вариант ответа.',cloze:'Заполни все пропуски.',fix:'Нажми на неверное слово и впиши исправление.',
  transform:'Напиши предложение целиком.',order:'Расставь все слова.'
};
const flag=value=>!!value;

export function createGrammarController(ctx){
  const {D,deps}=ctx;
  let clock=null,said=new Set(),timerPref=true;
  const run=()=>ctx.getRun();
  const setOf=()=>grammarSets(D).find(set=>set.id===ctx.getUi().id)||null;
  const container=()=>ctx.container();

  /* ---------- the run object ---------- */
  const progress=()=>({index:0,answers:{},done:{},skipped:{},self:{},deadline:null,remaining:null,timeUp:false,confirm:null,result:null,xp:0});
  function createRun(){return {phase:'pick',filter:'all',tips:{},timerOn:timerPref,...progress()};}
  /** The set under way is not dropped when the learner opens something else by accident: leaving needs a confirmation (the "К списку" button). */
  const current=()=>{const r=run(),set=setOf();return r?.phase==='run'&&set?{r,set,item:set.items[r.index]}:null;};
  function statusOf(r,item){
    if(r.skipped[item.id])return 'skipped';
    if(!r.done[item.id])return null;
    if(r.self[item.id])return 'self';
    return checkItem(item,r.answers[item.id]).ok?'ok':'wrong';
  }

  /* ---------- the clock ---------- */
  function stopClock(){if(clock){clearInterval(clock);clock=null;}}
  function say(text){
    const live=container()?.querySelector?.('#pd3-gram-live');
    if(live)live.textContent=text;else deps.announce?.(text);
  }
  function startClock(){
    stopClock();
    const r=run();
    if(!r?.timerOn||r.phase!=='run')return;
    const left=secondsLeft(r,ctx.now());
    said=new Set(GRAMMAR_MARKS.filter(mark=>left<=mark));
    clock=setInterval(tick,1000);
    paint();
  }
  function paint(){
    const r=run(),el=container()?.querySelector?.('#pd3-gram-timer');
    if(!r||!el)return;
    const left=secondsLeft(r,ctx.now());
    if(left!==null){r.remaining=left;el.textContent=clockText(left);}
  }
  function tick(){
    const r=run();
    if(!r||r.phase!=='run'||!r.timerOn||ctx.getUi().view!=='grammar'){stopClock();return;}
    const left=secondsLeft(r,ctx.now());
    r.remaining=left;paint();
    if(left<=0){r.timeUp=true;finish();say('Время вышло. Набор закончен, ответы проверены.');return;}
    for(const mark of GRAMMAR_MARKS)if(left<=mark&&!said.has(mark)){said.add(mark);say(MARK_TEXT[mark]);}
  }

  /* ---------- screens ---------- */
  function html(){
    const r=run(),set=setOf();
    if(!set||r.phase==='pick')return grammarListView({data:D,d:ctx.d(),run:r});
    if(r.phase==='intro')return grammarIntroView({set,run:r});
    if(r.phase==='result')return grammarResultView({set,run:r,result:r.result,data:D,links:deps.grammarLinks||null});
    return grammarItemView({set,run:r,data:D,left:r.timerOn?secondsLeft(r,ctx.now()):null,status:statusOf(r,set.items[r.index])});
  }
  function after(){paint();}
  function titleText(){
    const r=run(),set=setOf();
    if(!r||!set||r.phase==='pick')return 'PD3 — грамматика B2';
    if(r.phase==='run')return `PD3 — грамматика B2: задание ${r.index+1} из ${set.items.length}`;
    return `PD3 — грамматика B2: ${r.phase==='result'?'результат':'набор'}`;
  }
  function focusId(id,{scroll=false}={}){
    const el=container()?.querySelector?.(`#${id}`);
    el?.focus?.({preventScroll:!scroll});
  }
  /** Redraws after a step to a new screen: top of the page, focus on the heading of the new content. */
  function show({focus='h1'}={}){
    ctx.saveRun();
    ctx.render({keepScroll:false});
    globalThis.scrollTo?.({top:0,behavior:'instant'});
    ctx.title();
    if(focus==='h1')focusPageStart(container(),'h1');else focusId(focus);
  }

  /* ---------- the flow ---------- */
  function openSet(set){
    const r=run();
    stopClock();
    Object.assign(r,progress(),{phase:'intro',timerOn:timerPref});
    ctx.setUi({view:'grammar',id:set.id,kind:null});
    show();
  }
  function start(){
    const r=run(),set=setOf();
    if(!set||r.phase!=='intro')return;
    const now=ctx.now();
    Object.assign(r,progress(),{phase:'run',timerOn:timerPref,t0:now});
    if(r.timerOn)r.deadline=now+(set.minutes||GRAMMAR_MINUTES)*60000;
    startClock();
    show({focus:'pd3-gram-task'});
  }
  function check(){
    const cur=current();
    if(!cur||cur.r.done[cur.item.id])return;
    const {r,item}=cur;
    if(!isComplete(item,r.answers[item.id])){deps.toast?.(NEED[item.type]);return;}
    r.done[item.id]=true;
    reviewed(item,'');
  }
  function skip(){
    const cur=current();
    if(!cur||cur.r.done[cur.item.id])return;
    cur.r.done[cur.item.id]=true;cur.r.skipped[cur.item.id]=true;
    reviewed(cur.item,'skipped');
  }
  /** The review of a task is on screen: focus moves to it and the verdict is announced. */
  function reviewed(item,forced){
    const r=run(),status=forced||statusOf(r,item);
    ctx.saveRun();
    ctx.render({keepScroll:false});
    focusId('pd3-gram-review',{scroll:true});
    const right=correctAnswer(item).main;
    say(status==='ok'?'Верно.':status==='skipped'?`Пропущено. Верный ответ: ${right}`:`Неверно. Верный ответ: ${right}`);
  }
  function selfCheck(){
    const cur=current();
    if(!cur)return;
    const {r,item}=cur;
    if(item.type!=='transform'||statusOf(r,item)!=='wrong')return;
    r.self[item.id]=true;
    ctx.saveRun();ctx.render({keepScroll:false});
    focusId('pd3-gram-review',{scroll:true});
    say('Самопроверка отмечена. Балл и XP за это задание не начисляются.');
  }
  function next(){
    const cur=current();
    if(!cur||!cur.r.done[cur.item.id]||cur.r.index>=cur.set.items.length-1)return;
    cur.r.index++;
    show({focus:'pd3-gram-task'});
  }
  /** Computes the result, stores it and pays XP once; does not draw. */
  function conclude(){
    const r=run(),set=setOf();
    stopClock();
    const result=scoreSet(set,r,{final:true});
    r.result=result;r.phase='result';r.confirm=null;r.remaining=null;
    ctx.saveRun();
    // A set in which nothing was answered is not saved: it would count as a finished attempt and move the best result.
    if(result.answered>0){
      ctx.persist(s=>{recordGrammar(s.grammar||(s.grammar=emptyGrammar()),set.id,result,ctx.now());});
      if(countsForXp(result))ctx.complete('grammar',set.id,result.percent);
    }
    return result;
  }
  function finish(){
    const r=run(),set=setOf();
    if(!set||r.phase!=='run')return;
    // The button appears after the last task is checked; only the timer may end a set earlier.
    if(!r.timeUp&&!r.done[set.items[r.index].id])return;
    const result=conclude();
    show();
    deps.announce?.(`Набор закончен: ${result.percent}%, верно ${result.correct} из ${result.total}.${r.xp>0?` +${r.xp} XP`:''}`);
  }
  function toList(){
    const r=run(),keep={filter:r.filter,tips:r.tips};
    ctx.open('grammar',null,null,{force:true});
    Object.assign(run(),keep);
    ctx.render({keepScroll:false});
  }
  /** "Потренироваться": the set with the most tasks of the category, with the list filtered by it. */
  function practice(catId){
    const r=run(),set=practiceSetFor(catId,grammarSets(D),ctx.d().grammar);
    if(!set){deps.toast?.('Наборов для этой темы пока нет.');return;}
    r.filter=catId;
    openSet(set);
  }
  function again(){
    const set=setOf();
    if(set)openSet(set);
  }

  /* ---------- restoring after a reload ---------- */
  /** Called by the page after the run object was filled from a stored record. Returns the message to show. */
  function afterRestore(){
    const r=run();
    r.filter='all';r.tips={};
    if(r.timerOn&&secondsLeft(r,ctx.now())===0){
      // The time ran out while the page was closed: the set ends as when the timer ends, with what was entered.
      r.timeUp=true;conclude();
      return 'Время набора вышло, пока страница была закрыта. Ответы проверены.';
    }
    startClock();
    ctx.saveRun();
    return 'Набор восстановлен: продолжай с того же места.';
  }

  /* ---------- events ---------- */
  function insertLetter(letter){
    const field=container()?.querySelector?.('#pd3-gram-input');
    if(!field||field.disabled)return;
    const start=field.selectionStart??field.value.length,end=field.selectionEnd??start;
    const inserted=insertAtSelection(field.value,start,end,letter,field.maxLength>0?field.maxLength:Infinity);
    field.focus();
    if(!inserted){deps.toast?.('Достигнута максимальная длина текста.');return;}
    field.value=inserted.value;field.setSelectionRange(inserted.caret,inserted.caret);
    field.dispatchEvent(new Event('input',{bubbles:true}));
  }
  const editable=()=>{const cur=current();return cur&&!cur.r.done[cur.item.id]?cur:null;};
  function setAnswer(cur,value){
    const clean=cleanAnswer(cur.item,value);
    if(clean===undefined)return false;
    if((Array.isArray(clean)&&!clean.length)||(typeof clean==='object'&&!Array.isArray(clean)&&!Object.keys(clean).length))delete cur.r.answers[cur.item.id];
    else cur.r.answers[cur.item.id]=clean;
    return true;
  }
  function click(el){
    const action=el.dataset.action,value=el.dataset.value,id=el.dataset.id,r=run();
    switch(action){
      case 'pd3-gram-filter':r.filter=value;ctx.render();return true;
      case 'pd3-gram-tip':r.tips={...r.tips,[value]:!r.tips[value]};ctx.render();container()?.querySelector?.(`[data-action="pd3-gram-tip"][data-value="${value}"]`)?.focus?.({preventScroll:true});return true;
      case 'pd3-gram-pick':{const set=grammarSets(D).find(s=>s.id===id);if(set)openSet(set);return true;}
      case 'pd3-gram-practice':practice(id);return true;
      case 'pd3-gram-start':start();return true;
      case 'pd3-gram-check':check();return true;
      case 'pd3-gram-skip':skip();return true;
      case 'pd3-gram-self':selfCheck();return true;
      case 'pd3-gram-next':next();return true;
      case 'pd3-gram-finish':finish();return true;
      case 'pd3-gram-again':again();return true;
      case 'pd3-gram-list':toList();return true;
      case 'pd3-gram-exit':
        if(r.phase!=='run'){toList();return true;}
        r.confirm='exit';ctx.render();container()?.querySelector?.('[data-autofocus]')?.focus?.({preventScroll:false});return true;
      case 'pd3-gram-exit-no':r.confirm=null;ctx.render();container()?.querySelector?.('[data-action="pd3-gram-exit"]')?.focus?.({preventScroll:true});return true;
      case 'pd3-gram-exit-yes':stopClock();ctx.open('grammar',null,null,{force:true});return true;
      case 'pd3-gram-word':{
        const cur=editable();
        if(!cur||cur.item.type!=='fix')return true;
        const pos=Number(el.dataset.pos),old=cur.r.answers[cur.item.id];
        if(!Number.isInteger(pos))return true;
        if(setAnswer(cur,{...(old||{}),i:pos})){ctx.saveRun();ctx.render();focusId('pd3-gram-input');}
        return true;
      }
      case 'pd3-gram-tile':case 'pd3-gram-untile':{
        const cur=editable();
        if(!cur||cur.item.type!=='order')return true;
        const pos=Number(el.dataset.pos),old=cur.r.answers[cur.item.id];
        const picked=action==='pd3-gram-tile'?tileAdd(old,pos,cur.item.tokens.length):tileRemove(old,pos);
        if(setAnswer(cur,picked)){ctx.saveRun();ctx.render();}
        return true;
      }
      case 'pd3-gram-reset':{
        const cur=editable();
        if(cur&&cur.item.type==='order'){delete cur.r.answers[cur.item.id];ctx.saveRun();ctx.render();}
        return true;
      }
      case 'pd3-letter':insertLetter(el.dataset.letter);return true;
      default:return false;
    }
  }
  function input(target){
    if(target.dataset?.pd3Gram!=='text')return false;
    const cur=editable();
    if(!cur)return true;
    const {item}=cur,text=String(target.value??'');
    if(item.type==='fix'){
      const old=cur.r.answers[item.id];
      if(old?.i!==undefined)cur.r.answers[item.id]={...old,t:text.slice(0,GRAMMAR_MAX_FIX)};
    }else if(item.type==='transform'){
      if(text)cur.r.answers[item.id]=text.slice(0,GRAMMAR_MAX_TEXT);else delete cur.r.answers[item.id];
    }
    ctx.scheduleRunSave();
    return true;
  }
  function change(target){
    const kind=target.dataset?.pd3Gram;
    if(!kind)return false;
    if(kind==='timer'){timerPref=flag(target.checked);const r=run();if(r?.phase==='intro')r.timerOn=timerPref;return true;}
    const cur=editable();
    if(!cur)return true;
    const {item}=cur,raw=target.value;
    if(kind==='opt'&&item.type==='gap')setAnswer(cur,Number(raw));
    else if(kind==='gap'&&item.type==='cloze'){
      const answer={...(cur.r.answers[item.id]||{})},key=String(target.dataset.gap);
      if(raw==='')delete answer[key];else answer[key]=Number(raw);
      setAnswer(cur,answer);
    }
    ctx.saveRun();
    return true;
  }
  function keydown(event){
    const r=run();
    if(r?.confirm&&event.key==='Escape'&&!event.defaultPrevented){event.preventDefault();click({dataset:{action:'pd3-gram-exit-no'}});return true;}
    // Enter in the answer field sends the answer (the keyboard's "done" key does the same); an IME candidate is not Enter.
    if(event.key==='Enter'&&!event.isComposing&&event.keyCode!==229&&!event.defaultPrevented&&!event.ctrlKey&&!event.metaKey&&!event.altKey&&!event.shiftKey&&event.target?.id==='pd3-gram-input'){
      event.preventDefault();check();return true;
    }
    return false;
  }

  return {createRun,html,after,titleText,afterRestore,click,input,change,keydown,practice,stop:stopClock};
}
