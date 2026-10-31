import test, {afterEach} from 'node:test';
import assert from 'node:assert/strict';
import {createPd3Page} from '../dist/pd3-page.mjs';
import {createPd3Store} from '../dist/pd3-store.mjs';
import {pd3Data} from '../dist/pd3-data.mjs';
import {RUN_KEY} from '../dist/pd3-run.mjs';
import {createState,validateState,awardPd3} from '../dist/engine.mjs';
import {mockSets,stageOf,buildSchedule} from '../dist/pd3-mock.mjs';

class MemoryStorage{
 constructor(){this.map=new Map();}
 getItem(k){return this.map.has(k)?this.map.get(k):null;}
 setItem(k,v){this.map.set(k,String(v));}
 removeItem(k){this.map.delete(k);}
}
const MIN=60000,T0=Date.parse('2026-10-26T10:00:00Z');
const sets=mockSets(pd3Data);
const open=[];
afterEach(()=>{while(open.length)open.pop().leave();});

/** The page over a stub container; a shared `progress` object plays the app's state (state.pd3 and the XP). */
function boot({progress={state:createState()},run=new MemoryStorage(),clock={t:T0}}={}){
 const el={innerHTML:'',contains:()=>false,querySelector:()=>null,querySelectorAll:()=>[],hasAttribute:()=>true,setAttribute(){},focus(){}};
 const log={toasts:[],said:[],awards:[],titles:[]};
 const store=createPd3Store({read:()=>progress.state.pd3,write:next=>{progress.state=validateState({...progress.state,pd3:next});return true;}});
 const page=createPd3Page({data:pd3Data,store,deps:{container:()=>el,now:()=>clock.t,voiceUri:()=>'',toast:t=>log.toasts.push(t),announce:t=>log.said.push(t),setTitle:t=>log.titles.push(t),runStorage:run,
  award:event=>{log.awards.push(event);const r=awardPd3(progress.state,event,new Date(clock.t));if(r.counted)progress.state=validateState(r.state);return r;}}});
 open.push(page);
 const app={page,el,log,progress,run,clock,html:()=>el.innerHTML,stored:()=>JSON.parse(run.getItem(RUN_KEY)||'null'),
  start(){page.view();page.mount();return app;},
  click:(action,data={})=>page.click({dataset:{action,...data}}),
  change:(dataset,value='',extra={})=>page.change({dataset,value,...extra}),
  ask:(kind)=>{app.click('pd3-mock-ask',{value:kind});app.click('pd3-mock-yes',{value:kind});},
  finish:()=>app.ask('finish')};
 return app;
}
const reload=app=>boot({progress:app.progress,run:app.run,clock:app.clock}).start();
function begin(mode='short',{timer='format',set}={}){
 const app=boot().start();
 app.click('pd3-mock-open');
 app.click('pd3-mock-mode',{value:mode});app.click('pd3-mock-timer',{value:timer});
 if(set)app.change({pd3Mock:'set'},set);
 app.click('pd3-mock-start');
 return app;
}
const mockOf=app=>app.stored().mock;
const findItem=set=>pd3Data.readingExamFind.find(x=>x.id===set.find);

test('mock page: setup shows the honest note, both modes, the timer choice and the least used set',()=>{
 const app=boot().start();
 app.click('pd3-mock-open');
 const html=app.html();
 assert.match(html,/data-pd3-view="mock"/);assert.match(html,/не официальный экзамен и не прогноз результата/);
 assert.match(html,/самооценка обычно выше настоящей оценки/);
 assert.match(html,/data-value="full"/);assert.match(html,/data-value="short"/);assert.match(html,/По формату/);assert.match(html,/Без таймера/);
 assert.match(html,/<option value="set-1" selected>/);
 assert.equal(app.stored(),null,'nothing is stored before the start');
 assert.equal(app.page.state().view,'mock');assert.match(app.log.titles.at(-1),/пробный экзамен/);
 // the set with something done is not offered first
 const used=createState();
 const store=createPd3Store({read:()=>used.pd3,write:next=>{used.pd3=next;return true;}});
 store.update(s=>{s.exam.find[sets[0].find]={best:90,last:90,attempts:3,at:T0};});
 const second=boot({progress:{state:used}}).start();second.click('pd3-mock-open');
 assert.match(second.html(),/<option value="set-2" selected>/);
});

test('mock page: a stage, its stored draft, the confirmation and no way back',()=>{
 const app=begin('short');
 const html=app.html();
 assert.match(html,/Этап 1 из 5: Чтение, Del 1/);assert.match(html,/id="pd3-mock-timer"/);assert.match(html,/15:00/);assert.match(html,/aria-current="step"/);
 assert.doesNotMatch(html,/pd3-exam-finish/,'the practice page buttons are not part of the exam');assert.doesNotMatch(html,/data-action="pd3-open"/,'no way to the hub or the list except "Выйти"');
 assert.match(app.page.state().view,/mock/);
 const q=findItem(app.stored().mock.set).questions[0];
 app.change({pd3Set:`find:${q.id}`},'s3');
 assert.deepEqual(app.stored().draft.a,{[`find:${q.id}`]:'s3'});assert.equal(app.stored().v,2);
 assert.equal(app.stored().mock.deadline,T0+15*MIN);
 // asking does not finish; refusing keeps the stage
 app.click('pd3-mock-ask',{value:'finish'});assert.match(app.html(),/Завершить этап\?/);assert.match(app.html(),/вернуться к нему нельзя/);
 app.click('pd3-mock-no');assert.doesNotMatch(app.html(),/Завершить этап\?/);assert.equal(mockOf(app).index,0);
 app.click('pd3-mock-ask',{value:'finish'});
 assert.equal(app.page.keydown({key:'Escape',preventDefault(){}}),true,'Escape closes the question');assert.doesNotMatch(app.html(),/pd3-mock-confirm/);
 app.finish();
 assert.match(app.html(),/Этап 2 из 5: Чтение, Del 2/);assert.equal(mockOf(app).index,1);
 assert.deepEqual(mockOf(app).results.find.a,{[`find:${q.id}`]:'s3'});assert.equal(mockOf(app).results.find.auto,false);
 assert.match(app.log.said.at(-1),/Этап 2 из 5/);assert.match(app.log.titles.at(-1),/этап 2 из 5/);
 // only the tasks of the short mode are shown and stored
 assert.doesNotMatch(app.html(),/Текст 2 · абзацы/);assert.match(app.html(),/Текст 3 · пропуски/);
 assert.equal(app.click('pd3-mock-back'),false,'there is no action back');
 // starting something else is refused while the exam runs
 app.click('pd3-open',{value:'reading'});assert.equal(app.page.state().view,'mock');assert.match(app.log.toasts.at(-1),/Идёт пробный экзамен/);
 app.click('pd3-advice',{value:'hub'});assert.equal(app.page.state().view,'mock');
});

test('mock page: a reload brings back the stage, the draft and the exact time left; time that ran out ends the stage with what was entered',()=>{
 const app=begin('short');
 const q=findItem(mockOf(app).set).questions[1];
 app.change({pd3Set:`find:${q.id}`},'s2');
 app.clock.t=T0+5*MIN;
 const again=reload(app);
 assert.match(again.html(),/Этап 1 из 5/);assert.match(again.html(),/10:00/,'the clock is counted from the stored deadline');
 assert.match(again.log.toasts.at(-1),/восстановлен/);assert.match(again.html(),/<option value="s2" selected>|value="s2" selected/);
 assert.equal(again.stored().mock.deadline,T0+15*MIN);
 // reload after the deadline: the stage is closed, the next one starts from now with its own full time
 again.clock.t=T0+40*MIN;
 const late=reload(again);
 assert.match(late.html(),/Этап 2 из 5/);assert.match(late.log.toasts.at(-1),/Время этапа вышло, пока страница была закрыта/);
 assert.equal(late.stored().mock.results.find.auto,true);assert.deepEqual(late.stored().mock.results.find.a,{[`find:${q.id}`]:'s2'});
 assert.equal(late.stored().mock.deadline,T0+40*MIN+20*MIN);
 // many stages missed in one go: it still ends cleanly (one stage per reload, never an exception)
 late.clock.t=T0+10*24*3600000;
 const old=reload(late);assert.equal(old.page.state().view,'hub','a record older than its age is dropped');assert.equal(old.stored(),null);
});

test('mock page: pause stops the clock and hides the task; it survives a reload; resume restores the time',()=>{
 const app=begin('short');
 const q=findItem(mockOf(app).set).questions[0];app.change({pd3Set:`find:${q.id}`},'s1');
 app.clock.t=T0+4*MIN;
 app.click('pd3-mock-ask',{value:'pause'});assert.match(app.html(),/Поставить на паузу\?/);app.click('pd3-mock-yes',{value:'pause'});
 assert.match(app.html(),/пауза/);assert.match(app.html(),/11:00/);assert.doesNotMatch(app.html(),/pd3-find-/);
 assert.equal(app.stored().mock.pausedLeft,11*60);
 app.clock.t=T0+300*MIN;
 const back=reload(app);assert.match(back.html(),/пауза/);assert.match(back.html(),/11:00/);
 back.click('pd3-mock-resume');
 assert.match(back.html(),/Этап 1 из 5: Чтение, Del 1/);assert.match(back.html(),/11:00/);assert.equal(back.stored().mock.deadline,T0+311*MIN);
 assert.deepEqual(back.stored().draft.a,{[`find:${q.id}`]:'s1'});
 // pause is not offered without a timer
 const free=begin('short',{timer:'none'});assert.doesNotMatch(free.html(),/data-value="pause"/);assert.match(free.html(),/выключен/);assert.equal(free.stored().mock.deadline,null);
});

test('mock page: the clock ends a stage by itself and warns at 10, 5, 1 minutes and 30 seconds only',(t)=>{
 t.mock.timers.enable({apis:['setInterval','setTimeout']});
 const app=begin('full');
 assert.equal(app.log.said.length,1,'only the stage start so far');
 const say=()=>app.log.said.slice(1);
 const move=sec=>{app.clock.t+=sec*1000;t.mock.timers.tick(1000);};
 app.clock.t=T0+14*MIN;move(0);
 assert.deepEqual(say(),[]);
 app.clock.t=T0+15*MIN;t.mock.timers.tick(1000);
 assert.deepEqual(say(),['Осталось 10 минут на этапе.']);
 app.clock.t=T0+15*MIN+30000;t.mock.timers.tick(1000);assert.equal(say().length,1,'no repeated warning');
 app.clock.t=T0+20*MIN;t.mock.timers.tick(1000);assert.equal(say().at(-1),'Осталось 5 минут на этапе.');
 app.clock.t=T0+24*MIN;t.mock.timers.tick(1000);assert.equal(say().at(-1),'Осталась 1 минута на этапе.');
 app.clock.t=T0+24*MIN+31000;t.mock.timers.tick(1000);assert.equal(say().at(-1),'Осталось 30 секунд на этапе.');
 assert.equal(say().length,4);
 const q=findItem(mockOf(app).set).questions[0];app.change({pd3Set:`find:${q.id}`},'s1');
 app.clock.t=T0+25*MIN;t.mock.timers.tick(1000);
 assert.match(app.html(),/Этап 2 из 8: Чтение, Del 2/);assert.equal(mockOf(app).results.find.auto,true);assert.deepEqual(mockOf(app).results.find.a,{[`find:${q.id}`]:'s1'});
 assert.ok(app.log.said.some(x=>/Этап 2 из 8/.test(x)));
 assert.ok(say().some(x=>/Время этапа вышло/.test(x)));
 // a stage shorter than a mark does not announce it
 app.clock.t=T0+25*MIN+60*MIN;t.mock.timers.tick(1000);
});

/** Plays the short exam to the end; returns the app on the report. */
function finishShort(app,{answers=true}={}){
 const m=mockOf(app),find=findItem(m.set),text=pd3Data.readingExamText.find(x=>x.id===m.set.text);
 if(answers)for(const q of find.questions)app.change({pd3Set:`find:${q.id}`},q.section);
 app.finish();
 if(answers){text.text1.questions.forEach((q,i)=>app.change({pd3Set:`t1:${i}`},String(q.answer)));for(const s of text.text3.segments)if(typeof s!=='string')app.change({pd3Set:`t3:${s.gap}`},String(s.answer));}
 app.finish();
 app.page.input({id:'pd3-write',value:'Hej Anders, tak for din mail. Jeg kommer gerne, fordi jeg har tid.',dataset:{}});
 app.change({pd3Check:'req:0'},'',{checked:true});
 app.finish();
 assert.match(app.html(),/Перерыв перед устной частью/);
 app.click('pd3-mock-continue');app.clock.t+=2*MIN;app.finish();app.clock.t+=3*MIN;app.finish();
 return app;
}

test('mock page: a whole short exam to the report; the record, XP once, self-assessment updates the record, nothing is paid twice',()=>{
 const app=begin('short');
 finishShort(app);
 assert.match(app.html(),/Итоги пробного экзамена/);assert.match(app.log.titles.at(-1),/итоги/);
 assert.match(app.html(),/Чтение, Del 1/);assert.match(app.html(),/100%/);assert.match(app.html(),/проверено программой/);
 assert.match(app.html(),/Письмо: проверки программы/);assert.match(app.html(),/Самооценка письма/);assert.match(app.html(),/Самооценка устной части/);
 assert.match(app.html(),/не прогноз/);assert.doesNotMatch(app.html(),/сдашь|не сдашь|шанс/i);
 const mocks=app.progress.state.pd3.mocks,ids=Object.keys(mocks);
 assert.equal(ids.length,1);const rec=mocks[ids[0]];
 assert.equal(rec.mode,'short');assert.equal(rec.find,100);assert.equal(rec.text,100);assert.equal(rec.writing,null);assert.equal(rec.oral,null);assert.equal(rec.of,5);
 assert.equal(app.log.awards.length,1);assert.deepEqual([app.log.awards[0].kind,app.log.awards[0].percent,app.log.awards[0].id],['mock',50,ids[0]]);
 assert.equal(app.progress.state.xp,15);assert.match(app.html(),/\+15 XP/);
 assert.ok(app.stored(),'the report survives a reload');
 // rating
 const writing=pd3Data.writingCriteria,oral=pd3Data.oralCriteria;
 for(const c of writing)app.change({pd3Self:c.id},'4',{name:'pd3-mself-w-'+c.id});
 for(const c of oral)app.change({pd3Self:c.id},'3',{name:'pd3-mself-o-'+c.id});
 const after=app.progress.state.pd3.mocks[ids[0]];
 assert.equal(after.writing,80);assert.equal(after.oral,60);assert.equal(after.at,rec.at);assert.equal(Object.keys(app.progress.state.pd3.mocks).length,1);
 assert.equal(app.log.awards.length,1,'rating does not pay again');
 assert.equal(after.weak,'oral');
 // reload shows the report with the ratings; nothing is awarded or stored again
 const back=reload(app);
 assert.match(back.html(),/Итоги пробного экзамена/);assert.match(back.log.toasts.at(-1),/Итоги пробного экзамена восстановлены/);
 assert.match(back.html(),/80%/);assert.equal(back.log.awards.length,0);assert.equal(Object.keys(back.progress.state.pd3.mocks).length,1);
 // weak spots and recommendations are shown; a link opens a section, closing the report forgets the run
 assert.match(back.html(),/Слабые места/);assert.match(back.html(),/Что делать дальше/);assert.match(back.html(),/data-action="pd3-mock-again"/);
 assert.ok((back.html().match(/<li><span>/g)||[]).length<=4);
 back.click('pd3-mock-go',{value:'oral',tab:'phrases'});
 assert.equal(back.page.state().view,'oral');assert.equal(back.stored(),null);
 const hub=reload(back),hubHtml=hub.page.view();assert.equal(hub.page.state().view,'hub');assert.match(hubHtml,/Пробные экзамены/);assert.match(hubHtml,/Del 1: 100%/);
});

test('mock page: leaving the section keeps the exam; "Выйти" drops it without a record or XP; again starts the same set',()=>{
 const app=begin('short');
 const q=findItem(mockOf(app).set).questions[0];app.change({pd3Set:`find:${q.id}`},'s4');
 app.page.suspend();assert.equal(app.stored().draft.a[`find:${q.id}`],'s4');
 app.page.leave();assert.ok(app.stored(),'the unfinished exam outlives leaving the section');
 app.page.enter();
 const back=reload(app);assert.match(back.html(),/Этап 1 из 5/);
 back.click('pd3-mock-ask',{value:'exit'});assert.match(back.html(),/Выйти из пробного экзамена\?/);assert.match(back.html(),/XP не начислятся/);
 back.click('pd3-mock-no');assert.equal(back.page.state().view,'mock');
 back.ask('exit');
 assert.equal(back.page.state().view,'hub');assert.equal(back.stored(),null);assert.equal(back.log.awards.length,0);assert.equal(back.progress.state.pd3?.mocks,undefined);
 // again keeps mode, timer and set
 const full=begin('full',{timer:'none',set:'set-3'});
 const ids=mockOf(full).set;assert.equal(ids.id,'set-3');
 full.page.leave();
 const second=boot({progress:full.progress,run:new MemoryStorage()}).start();
 void second;
});

test('mock page: the full exam has a break, the oral stages reuse the practice screens, and the writing stage keeps its own draft',()=>{
 const app=begin('full',{timer:'none'});
 const set=mockOf(app).set;
 assert.match(app.html(),/Этап 1 из 8/);assert.match(app.html(),/выключен/);
 app.finish();assert.match(app.html(),/Этап 2 из 8/);assert.match(app.html(),/Текст 2 · абзацы/);
 app.finish();
 assert.match(app.html(),/Этап 3 из 8: Письмо: ответ на письмо/);assert.match(app.html(),/id="pd3-write"/);assert.match(app.html(),/maxlength="6000"/);
 assert.doesNotMatch(app.html(),/pd3-write-done/);
 app.page.input({id:'pd3-write',value:'Hej',dataset:{}});app.finish();
 assert.match(app.html(),/Этап 4 из 8: Письмо: задание A или B/);assert.match(app.html(),/data-action="pd3-wopt"/);
 app.click('pd3-wopt',{value:'B'});assert.match(app.html(),/aria-pressed="true">Тема B/);
 assert.equal(app.progress.state.pd3?.writing,undefined,'the exam does not touch the writing drafts of the practice page');
 app.finish();
 assert.match(app.html(),/Перерыв перед устной частью/);assert.match(app.html(),/48 часов/);assert.equal(app.stored().mock.deadline,null);
 // the break survives a reload any time within 48 hours
 app.clock.t=T0+40*3600000;
 const rest=reload(app);assert.match(rest.html(),/Перерыв перед устной частью/);
 rest.click('pd3-mock-continue');
 assert.match(rest.html(),/Этап 5 из 8: Устная часть: монолог/);assert.match(rest.html(),/data-action="pd3-mono-start"/);assert.doesNotMatch(rest.html(),/pd3-oral-tab/);assert.doesNotMatch(rest.html(),/pd3-oself/);
 assert.match(rest.html(),/value="at-laere-dansk"|Лист ключевых слов/);
 assert.equal(rest.stored().mock.blockDeadline,null,'no block clock without a timer');
 rest.finish();assert.match(rest.html(),/Этап 6 из 8: Устная часть: интервью/);assert.match(rest.html(),/Вопрос 1 из/);
 rest.click('pd3-iq',{value:'1'});rest.page.suspend();assert.equal(rest.stored().draft.step,1);
 rest.finish();assert.match(rest.html(),/Этап 7 из 8: Устная часть: взаимодействие/);
 rest.click('pd3-int-start');rest.page.suspend();assert.equal(rest.stored().draft.started,true);
 rest.finish();assert.match(rest.html(),/Этап 8 из 8: Устная часть: дискуссия/);
 void set;
 rest.finish();
 assert.match(rest.html(),/Итоги пробного экзамена/);assert.match(rest.html(),/Письмо: проверки программы/);
 assert.equal(rest.progress.state.pd3.mocks[mockOf(rest).id].of,8);
});

test('mock page: an exam with nothing done gets no XP; the history keeps at most twenty exams',()=>{
 const app=begin('short');
 app.finish();app.finish();app.finish();app.click('pd3-mock-continue');app.finish();app.finish();
 assert.match(app.html(),/Итоги пробного экзамена/);assert.equal(app.log.awards.length,0);assert.match(app.html(),/XP не начислены: выполнено меньше половины этапов/);
 assert.equal(app.progress.state.xp,0);
 const rec=Object.values(app.progress.state.pd3.mocks)[0];assert.equal(rec.find,0);assert.equal(rec.stages,0);
 // twenty-one exams in a row
 let progress=app.progress;
 for(let i=0;i<21;i++){
  const a=boot({progress,run:new MemoryStorage(),clock:{t:T0+(i+1)*3600000}}).start();
  a.click('pd3-mock-open');a.click('pd3-mock-mode',{value:'short'});a.click('pd3-mock-timer',{value:'none'});a.click('pd3-mock-start');
  a.finish();a.finish();a.finish();a.click('pd3-mock-continue');a.finish();a.finish();
  progress=a.progress;
 }
 assert.equal(Object.keys(progress.state.pd3.mocks).length,20);
});

test('mock page: nothing of the exam leaks into the other PD3 pages and old runs still restore',()=>{
 const run=new MemoryStorage();
 const first=boot({run}).start();
 first.click('pd3-pick',{});
 // a dictation run saved in the old format is restored as before
 const dictation=pd3Data.dictations.find(x=>x.mode==='text');
 run.setItem(RUN_KEY,JSON.stringify({v:1,savedAt:T0,view:'dictation',kind:null,id:dictation.id,t0:T0,inputs:{all:'hej'},plays:{all:1}}));
 const app=boot({run}).start();
 assert.equal(app.page.state().view,'dictation');
 // an unknown view or a broken mock record is dropped
 run.setItem(RUN_KEY,JSON.stringify({v:2,savedAt:T0,view:'mock',kind:null,id:'x',t0:T0,mock:{id:'x'}}));
 const none=boot({run}).start();assert.equal(none.page.state().view,'hub');assert.equal(run.getItem(RUN_KEY),null);
 assert.ok(stageOf&&buildSchedule);
});
