import test, {afterEach} from 'node:test';
import assert from 'node:assert/strict';
import {createPd3Page} from '../dist/pd3-page.mjs';
import {createPd3Store} from '../dist/pd3-store.mjs';
import {pd3Data} from '../dist/pd3-data.mjs';
import {RUN_KEY,RUN_MAX_AGE,RUN_MAX_BYTES,createRunStore,snapshotRun,validateRun,applyRun,itemOf} from '../dist/pd3-run.mjs';

class MemoryStorage{
 constructor(){this.map=new Map();this.fail=false;}
 getItem(k){return this.map.has(k)?this.map.get(k):null;}
 setItem(k,v){if(this.fail)throw new DOMException('full','QuotaExceededError');this.map.set(k,String(v));}
 removeItem(k){this.map.delete(k);}
}
const HOUR=3600000,T0=Date.parse('2026-10-26T10:00:00Z');
const textDictation=pd3Data.dictations.find(x=>x.mode==='text'),sentenceDictation=pd3Data.dictations.find(x=>x.mode!=='text');
const listening=pd3Data.listening[0],examFind=pd3Data.readingExamFind[0],examText=pd3Data.readingExamText[0],reading=pd3Data.readingPractice[0];

/* ---------- harness: the page controller over a stub container, "reload" = a new controller over the same storages ---------- */
const open=[];
afterEach(()=>{while(open.length)open.pop().leave();});
function boot({storage=new MemoryStorage(),run=new MemoryStorage(),clock={t:T0},makeRecorder}={}){
 const el={innerHTML:'',contains:()=>false,querySelector:()=>null,querySelectorAll:()=>[],hasAttribute:()=>true,setAttribute(){},focus(){}};
 const log={toasts:[],said:[]};
 const store=createPd3Store(storage);store.load();
 const page=createPd3Page({data:pd3Data,store,deps:{container:()=>el,now:()=>clock.t,voiceUri:()=>'',toast:t=>log.toasts.push(t),announce:t=>log.said.push(t),runStorage:run,makeRecorder,award:()=>({xp:0,counted:false})}});
 open.push(page);
 const start=()=>{page.view();page.mount();};
 return {page,el,log,storage,run,clock,start,html:()=>el.innerHTML,stored:()=>JSON.parse(run.getItem(RUN_KEY)||'null')};
}
const click=(app,action,data={})=>app.page.click({dataset:{action,...data}});
// A reload kills the old page without any callback; the old controller is only cleaned up (timers) after the test.
const reload=app=>{const next=boot({storage:app.storage,run:app.run,clock:app.clock});next.start();return next;};

/* ---------- pure functions ---------- */
test('M3: the key is its own device-only key and a snapshot of an untouched or finished task is empty',()=>{
 assert.equal(RUN_KEY,'danskdag.pd3.run.v1');
 const ui={view:'dictation',id:textDictation.id,kind:null};
 assert.equal(snapshotRun(ui,{inputs:{},plays:{},result:null},T0),null);
 assert.equal(snapshotRun(ui,{inputs:{all:'hej'},plays:{},result:{percent:50}},T0),null);
 assert.equal(snapshotRun({view:'hub'},{},T0),null);
 assert.equal(snapshotRun({view:'writing',id:'x'},{text:'abc'},T0),null,'writing keeps its own draft');
 assert.deepEqual(snapshotRun(ui,{inputs:{all:'hej'},plays:{all:1,2:0},result:null,t0:T0-5},T0),{v:1,savedAt:T0,view:'dictation',kind:null,id:textDictation.id,t0:T0-5,inputs:{all:'hej'},plays:{all:1}});
 assert.equal(snapshotRun({view:'exam',id:examFind.id,kind:'find'},{phase:'intro'},T0),null);
 assert.equal(snapshotRun({view:'listening',id:listening.id},{phase:'result',plays:2,answers:{}},T0),null);
 assert.equal(snapshotRun({view:'listening',id:listening.id},{phase:'listen',plays:0,answers:{}},T0),null);
});

test('M3: validation accepts what the controller saves and rejects everything else',()=>{
 const ok=record=>validateRun(structuredClone(record),{data:pd3Data,now:T0+1000});
 const dict={v:1,savedAt:T0,view:'dictation',kind:null,id:textDictation.id,t0:T0,inputs:{all:'Biblioteket er åbent'},plays:{all:2}};
 assert.deepEqual(ok(dict).inputs,{all:'Biblioteket er åbent'});
 assert.equal(ok({...dict,v:2}),null);
 assert.equal(ok({...dict,id:'nope'}),null);
 assert.equal(ok({...dict,view:'writing'}),null);
 assert.equal(ok({...dict,inputs:{0:'x'}}),null,'a sentence field does not exist in a text dictation');
 assert.equal(ok({...dict,inputs:{all:5}}),null);
 assert.equal(ok({...dict,inputs:{all:'x'.repeat(3001)}}),null);
 assert.equal(ok({...dict,plays:{all:-1}}),null);
 assert.equal(ok({...dict,plays:{all:1.5}}),null);
 assert.equal(ok({...dict,plays:JSON.parse('{"all":1,"__proto__":2}')}),null,'a poisoned key is refused');
 assert.equal(ok({...dict,savedAt:T0-RUN_MAX_AGE-1}),null,'older than 24 hours');
 assert.ok(ok({...dict,savedAt:T0-RUN_MAX_AGE+5000}));
 assert.equal(ok({...dict,savedAt:T0+10*HOUR}),null,'from the future');
 for(const bad of [null,undefined,'x',5,[],{}])assert.equal(validateRun(bad,{data:pd3Data,now:T0}),null);
 const sentences={v:1,savedAt:T0,view:'dictation',kind:null,id:sentenceDictation.id,t0:T0,inputs:{0:'a',7:'b'},plays:{0:1,3:2}};
 assert.ok(ok(sentences));
 assert.equal(ok({...sentences,inputs:{99:'b'}}),null);
 const listen={v:1,savedAt:T0,view:'listening',kind:null,id:listening.id,t0:T0,plays:2,answers:{'q:0':1}};
 assert.equal(ok(listen).plays,2);assert.equal(ok({...listen,plays:50}).plays,listening.plays||2,'plays are capped at the item limit');
 assert.equal(ok({...listen,answers:{'q:99':1}}),null);assert.equal(ok({...listen,answers:{'q:0':'1'}}),null);
 const exam={v:1,savedAt:T0,view:'exam',kind:'find',id:examFind.id,t0:T0,answers:{[`find:${examFind.questions[0].id}`]:examFind.sections[0].id},task:'t1',timerOn:true,deadline:T0+20*60000};
 assert.ok(ok(exam));
 assert.equal(ok({...exam,deadline:T0+3*3600000}),null,'a deadline further away than the whole exam is refused');
 assert.equal(ok({...exam,answers:{'find:nope':'s1'}}),null);
 assert.equal(ok({...exam,timerOn:'yes'}),null);
 assert.equal(ok({...exam,kind:'text'}),null,'a Del 1 id is not a Del 2 task');
 assert.equal(ok({...exam,timerOn:false,deadline:null}).deadline,null);
 const text={v:1,savedAt:T0,view:'exam',kind:'text',id:examText.id,t0:T0,answers:{'t1:0':2,'t2:1':'A','t3:1':0},task:'t2',timerOn:false,deadline:null};
 assert.ok(ok(text));assert.equal(ok({...text,answers:{'t2:1':'ZZ'}}),null);assert.equal(ok({...text,task:'t9'}),null);
 const read={v:1,savedAt:T0,view:'reading',kind:null,id:reading.id,t0:T0,answers:{'q:0':1}};
 assert.deepEqual(ok(read).answers,{'q:0':1});
 assert.equal(itemOf(pd3Data,'exam','text',examText.id).id,examText.id);assert.equal(itemOf(pd3Data,'exam','x',examText.id),null);
});

test('M3: the run store survives a missing, blocked or full storage and caps the size',()=>{
 const storage=new MemoryStorage(),store=createRunStore(storage);
 assert.equal(store.read(),null);
 assert.equal(store.write({a:1}),true);assert.deepEqual(store.read(),{a:1});assert.deepEqual([...storage.map.keys()],[RUN_KEY]);
 store.clear();assert.equal(store.read(),null);
 storage.setItem(RUN_KEY,'{broken');assert.equal(store.read(),null);
 storage.fail=true;assert.equal(store.write({a:1}),false);
 storage.fail=false;assert.equal(store.write({text:'x'.repeat(RUN_MAX_BYTES)}),false);assert.equal(storage.getItem(RUN_KEY),null);
 const none=createRunStore(null);assert.equal(none.read(),null);assert.equal(none.write({a:1}),false);none.clear();
 const throwing=createRunStore({getItem(){throw new Error('blocked');},setItem(){throw new Error('blocked');},removeItem(){throw new Error('blocked');}});
 assert.equal(throwing.read(),null);assert.equal(throwing.write({a:1}),false);assert.doesNotThrow(()=>throwing.clear());
 const run={};applyRun(run,{view:'listening',t0:5,plays:1,answers:{'q:0':1}});assert.deepEqual(run,{t0:5,plays:1,answers:{'q:0':1}});
});

/* ---------- the controller ---------- */
test('M3: a text dictation keeps its text and used listens across a reload, and the listening limit cannot be bypassed',()=>{
 const app=boot();app.start();
 click(app,'pd3-open',{value:'dictation'});click(app,'pd3-dict-limit',{value:'2'});click(app,'pd3-pick',{id:textDictation.id});
 assert.equal(app.stored(),null,'nothing to remember yet');
 click(app,'pd3-dict-listen',{pos:'all'});click(app,'pd3-dict-listen',{pos:'all'});
 assert.equal(app.stored().plays.all,2,'a listen is saved at once');
 app.page.input({dataset:{pd3Field:'all'},value:'Biblioteket er åbent'});
 app.page.suspend();// the page is hidden or closing: the pending text is flushed
 assert.equal(app.stored().inputs.all,'Biblioteket er åbent');
 const after=reload(app);
 assert.deepEqual(after.page.state(),{view:'dictation',id:textDictation.id,kind:null});
 assert.match(after.html(),/Biblioteket er åbent<\/textarea>/);
 assert.match(after.html(),/Прослушивания закончились/);
 assert.match(after.html(),/disabled>[^<]*<svg|data-pos="all" disabled/);
 assert.deepEqual(after.log.toasts,['Задание восстановлено.']);
 click(after,'pd3-dict-listen',{pos:'all'});
 assert.equal(after.stored().plays.all,2,'the third listen is refused');
});

test('M3: sentence dictation restores per-sentence text and repeats',()=>{
 const app=boot();app.start();
 click(app,'pd3-open',{value:'dictation'});click(app,'pd3-dict-limit',{value:'2'});click(app,'pd3-pick',{id:sentenceDictation.id});
 click(app,'pd3-dict-listen',{pos:'1'});click(app,'pd3-dict-listen',{pos:'1'});click(app,'pd3-dict-listen',{pos:'0'});
 app.page.input({dataset:{pd3Field:'1'},value:'andet'});app.page.input({dataset:{pd3Field:'0'},value:'første'});
 app.page.suspend();
 const after=reload(app);
 assert.match(after.html(),/id="pd3-dict-in-0"[^>]*value="første"/);assert.match(after.html(),/id="pd3-dict-in-1"[^>]*value="andet"/);
 assert.match(after.html(),/Повторы закончились/);
 assert.match(after.html(),/Осталось: 1/);
});

test('M3: checking the dictation, leaving or opening another task forgets the run',()=>{
 const app=boot();app.start();
 click(app,'pd3-open',{value:'dictation'});click(app,'pd3-pick',{id:textDictation.id});
 app.page.input({dataset:{pd3Field:'all'},value:'noget'});app.page.suspend();
 assert.ok(app.stored());
 click(app,'pd3-dict-check');
 assert.equal(app.stored(),null,'a checked dictation is over');
 assert.equal(reload(app).page.state().view,'hub');
 const b=boot();b.start();
 click(b,'pd3-open',{value:'dictation'});click(b,'pd3-pick',{id:textDictation.id});
 b.page.input({dataset:{pd3Field:'all'},value:'noget'});b.page.suspend();assert.ok(b.stored());
 click(b,'pd3-open',{value:'dictation'});// "back to the list" is an explicit exit
 assert.equal(b.stored(),null);
 click(b,'pd3-pick',{id:textDictation.id});b.page.input({dataset:{pd3Field:'all'},value:'noget'});b.page.suspend();assert.ok(b.stored());
 b.page.leave();assert.equal(b.stored(),null,'leaving the section drops it');
});

test('M3: an empty dictation is not worth restoring; text typed and erased again is forgotten',()=>{
 const app=boot();app.start();
 click(app,'pd3-open',{value:'dictation'});click(app,'pd3-pick',{id:textDictation.id});
 app.page.input({dataset:{pd3Field:'all'},value:'a'});app.page.suspend();assert.ok(app.stored());
 app.page.input({dataset:{pd3Field:'all'},value:''});app.page.suspend();assert.equal(app.stored(),null);
});

test('M3: listening keeps used listens and answers; the limit holds after a reload',()=>{
 const app=boot();app.start();
 click(app,'pd3-open',{value:'listening'});click(app,'pd3-pick',{id:listening.id});
 click(app,'pd3-listen');
 assert.equal(app.stored().plays,1);
 app.page.change({dataset:{pd3Set:'q:0'},value:'2'});
 const after=reload(app);
 assert.deepEqual(after.page.state(),{view:'listening',id:listening.id,kind:null});
 assert.match(after.html(),/Прослушиваний использовано: 1 из 2/);
 assert.match(after.html(),/id="pd3-q-0-2"[^>]*checked/);
 after.page.leave();after.page.enter();
 const again=boot({storage:app.storage,run:app.run});again.start();
 assert.equal(again.page.state().view,'hub');
 // Playing twice more in the restored page: the second listen is the last.
 const third=boot({storage:app.storage,run:app.run});
 click(third,'pd3-open',{value:'listening'});click(third,'pd3-pick',{id:listening.id});
 assert.equal(third.stored(),null,'opening a task by hand starts it fresh');
});

test('M3: listening limit is kept at the maximum after a reload',()=>{
 const app=boot();app.start();
 click(app,'pd3-open',{value:'listening'});click(app,'pd3-pick',{id:listening.id});
 const max=listening.plays||2;
 for(let i=0;i<max;i++){app.page.reader().pause?.();click(app,'pd3-listen');app.page.reader().stop?.();}
 assert.equal(app.stored().plays,max);
 const after=reload(app);
 assert.match(after.html(),new RegExp(`Прослушиваний использовано: ${max} из ${max}`));
 assert.match(after.html(),/id="pd3-listen-btn"[^>]*disabled/);
});

test('M3: the reading exam resumes with its answers, task and the absolute deadline',()=>{
 const app=boot();app.start();
 click(app,'pd3-open',{value:'exam'});click(app,'pd3-pick',{value:'text',id:examText.id});
 assert.equal(app.stored(),null,'the intro screen is not a run');
 click(app,'pd3-exam-start');
 const deadline=app.clock.t+examText.minutes*60000;
 assert.equal(app.stored().deadline,deadline);
 click(app,'pd3-task',{value:'t2'});
 app.page.change({dataset:{pd3Set:'t2:1'},value:'A'});
 app.clock.t+=10*60000;// ten minutes pass; the page is reloaded
 const after=reload(app);
 assert.deepEqual(after.page.state(),{view:'exam',id:examText.id,kind:'text'});
 assert.match(after.html(),/id="pd3-timer"[^>]*>55:00</,'55 of 65 minutes left, from the deadline and not from a new start');
 assert.match(after.html(),/id="pd3-t2-1"[\s\S]*?<option value="A" selected/);
 assert.deepEqual(after.log.toasts,['Задание восстановлено.']);
 assert.equal(after.stored().deadline,deadline,'the same deadline is kept');
});

test('M3: an exam whose time ran out while the page was closed is shown as a result with the time-up note',()=>{
 const app=boot();app.start();
 click(app,'pd3-open',{value:'exam'});click(app,'pd3-pick',{value:'find',id:examFind.id});
 click(app,'pd3-exam-start');
 const q=examFind.questions[0];
 app.page.change({dataset:{pd3Set:`find:${q.id}`},value:q.section});
 app.clock.t+=examFind.minutes*60000+30000;
 const after=reload(app);
 assert.equal(after.page.state().view,'exam');
 assert.match(after.html(),/Время вышло\. Результат Del 1/);
 assert.match(after.html(),/1 \/ \d+/,'the answer given before is counted');
 assert.equal(after.stored(),null);
 assert.match(after.log.toasts[0],/Время экзамена вышло/);
 assert.equal(after.page.leave(),undefined);
});

test('M3: an exam without a timer resumes without one; a finished exam does not come back',()=>{
 const app=boot();app.start();
 click(app,'pd3-open',{value:'exam'});click(app,'pd3-pick',{value:'find',id:examFind.id});
 app.page.change({dataset:{pd3Setting:'timerExam'},checked:false});
 click(app,'pd3-exam-start');
 assert.equal(app.stored().timerOn,false);assert.equal(app.stored().deadline,null);
 app.clock.t+=5*HOUR;
 const after=reload(app);
 assert.equal(after.page.state().view,'exam');assert.match(after.html(),/Без таймера/);
 click(after,'pd3-exam-finish');
 assert.equal(after.stored(),null);
 assert.equal(reload(after).page.state().view,'hub');
});

test('M3: a record older than 24 hours, a damaged one or a full storage never break the page',()=>{
 const app=boot();app.start();
 click(app,'pd3-open',{value:'dictation'});click(app,'pd3-pick',{id:textDictation.id});
 app.page.input({dataset:{pd3Field:'all'},value:'noget'});app.page.suspend();
 app.clock.t+=RUN_MAX_AGE+HOUR;
 const old=reload(app);assert.equal(old.page.state().view,'hub');assert.equal(old.stored(),null,'a stale record is removed');
 const damaged=boot();damaged.run.setItem(RUN_KEY,'{"v":1,"view":"exam"');
 assert.doesNotThrow(()=>damaged.start());assert.equal(damaged.page.state().view,'hub');assert.equal(damaged.stored(),null);
 const full=boot();full.start();full.run.fail=true;
 click(full,'pd3-open',{value:'dictation'});click(full,'pd3-pick',{id:textDictation.id});
 assert.doesNotThrow(()=>{full.page.input({dataset:{pd3Field:'all'},value:'noget'});full.page.suspend();click(full,'pd3-dict-listen',{pos:'all'});});
 assert.equal(full.page.state().view,'dictation');
});

test('M3: the run key is separate from the shared PD3 data, the PD3 copy and the cloud state',()=>{
 const app=boot();app.start();
 click(app,'pd3-open',{value:'dictation'});click(app,'pd3-pick',{id:textDictation.id});
 app.page.input({dataset:{pd3Field:'all'},value:'noget'});app.page.suspend();
 assert.ok(app.run.getItem(RUN_KEY));
 assert.equal(app.storage.getItem(RUN_KEY),null);
 assert.doesNotMatch(app.page.view(),/danskdag\.pd3\.run/);
 assert.doesNotMatch(createPd3Store(app.storage).exportJson(),/noget/);
});

test('M3: the saved writing draft and keywords keep working beside the run',()=>{
 const app=boot();app.start();
 click(app,'pd3-open',{value:'writing'});
 click(app,'pd3-pick',{value:'email',id:pd3Data.writingEmail[0].id});
 app.page.input({id:'pd3-write',value:'Kære Hans'});app.page.suspend();
 assert.equal(app.stored(),null);
 assert.equal(app.page.state().view,'writing');
 const store=createPd3Store(app.storage);store.load();
 assert.equal(store.get().writing[pd3Data.writingEmail[0].id].draft,'Kære Hans');
});

test('Monologue timer starts only once the recording started, and says so when it never does',()=>{
 const makeRecorderFor=holder=>({changed,maxSeconds})=>{
  const api={maxSeconds,phase:'idle',clear(){changed({phase:'idle',url:'',message:''});},stop(){},
   async start(){holder.changed=changed;holder.start();},snapshot:()=>({phase:api.phase})};
  return api;};
 const holder={start(){}};
 const app=boot({makeRecorder:makeRecorderFor(holder)});app.start();
 click(app,'pd3-open',{value:'oral'});click(app,'pd3-oral-pick',{id:pd3Data.oralMonologue[0].id});
 click(app,'pd3-mono-start');
 assert.match(app.html(),/Начать: таймер 2 минуты и запись/,'waiting for the microphone: no timer yet');
 holder.changed({phase:'requesting',url:'',message:'Разреши доступ к микрофону в браузере.'});
 assert.match(app.html(),/Начать: таймер 2 минуты и запись/);
 holder.changed({phase:'recording',url:'',message:''});
 assert.match(app.html(),/Закончить монолог/);assert.deepEqual(app.log.toasts,[]);
 click(app,'pd3-mono-stop');
 // No microphone: the timer still runs, and the learner is told it runs without a recording.
 const b=boot({makeRecorder:makeRecorderFor(holder)});b.start();
 click(b,'pd3-open',{value:'oral'});click(b,'pd3-oral-pick',{id:pd3Data.oralMonologue[0].id});
 click(b,'pd3-mono-start');
 holder.changed({phase:'error',url:'',message:'Нет доступа к микрофону.'});
 assert.match(b.html(),/Закончить монолог/);
 assert.deepEqual(b.log.toasts,['Запись не началась: таймер идёт без записи.']);
 click(b,'pd3-mono-stop');
});

test('L10: Enter in a dictation sentence field moves to the next field, but not while an IME is composing',()=>{
 const app=boot();app.start();
 const mk=()=>({focused:0,matches:selector=>selector==='input[data-pd3-field]',focus(){this.focused++;}});
 const [a,b]=[mk(),mk()];
 app.el.querySelectorAll=selector=>selector==='input[data-pd3-field]'?[a,b]:[];
 const press=(target,extra={})=>{let prevented=false;const handled=app.page.keydown({key:'Enter',keyCode:13,target,defaultPrevented:false,preventDefault(){prevented=true;},...extra});return {handled,prevented};};
 assert.deepEqual(press(a),{handled:true,prevented:true});assert.equal(b.focused,1);
 assert.deepEqual(press(a,{isComposing:true}),{handled:false,prevented:false});
 assert.deepEqual(press(a,{keyCode:229}),{handled:false,prevented:false});
 assert.equal(b.focused,1,'composition Enter did not move the focus');
 assert.equal(press(b).handled,false,'the last field has no next one');
});
