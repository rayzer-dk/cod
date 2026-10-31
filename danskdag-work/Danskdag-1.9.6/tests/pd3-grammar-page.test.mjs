import test, {afterEach} from 'node:test';
import assert from 'node:assert/strict';
import {createPd3Page} from '../dist/pd3-page.mjs';
import {createPd3Store} from '../dist/pd3-store.mjs';
import {pd3Data} from '../dist/pd3-data.mjs';
import {RUN_KEY,RUN_MAX_AGE,validateRun,snapshotRun} from '../dist/pd3-run.mjs';
import {createState,validateState,awardPd3} from '../dist/engine.mjs';
import {hubView} from '../dist/pd3-views.mjs';
import {grammarSets,grammarCategories} from './fixtures/pd3-grammar-fixture.mjs';

class MemoryStorage{
 constructor(){this.map=new Map();}
 getItem(k){return this.map.has(k)?this.map.get(k):null;}
 setItem(k,v){this.map.set(k,String(v));}
 removeItem(k){this.map.delete(k);}
}
const MIN=60000,T0=Date.parse('2026-10-26T10:00:00Z');
const data={...pd3Data,grammarSets,grammarCategories};
const [set1,set2]=grammarSets;
const open=[];
afterEach(()=>{while(open.length)open.pop().leave();});

/** The page over a stub container; a shared `progress` object plays the app's state (state.pd3 and the XP). */
function boot({progress={state:createState()},run=new MemoryStorage(),clock={t:T0},content=data,links}={}){
 const el={innerHTML:'',contains:()=>false,querySelector:()=>null,querySelectorAll:()=>[],hasAttribute:()=>true,setAttribute(){},focus(){}};
 const log={toasts:[],said:[],awards:[],titles:[]};
 const store=createPd3Store({read:()=>progress.state.pd3,write:next=>{progress.state=validateState({...progress.state,pd3:next});return true;}});
 const page=createPd3Page({data:content,store,deps:{container:()=>el,now:()=>clock.t,voiceUri:()=>'',toast:t=>log.toasts.push(t),announce:t=>log.said.push(t),setTitle:t=>log.titles.push(t),runStorage:run,grammarLinks:links,
  award:event=>{log.awards.push(event);const r=awardPd3(progress.state,event,new Date(clock.t));if(r.counted)progress.state=validateState(r.state);return r;}}});
 open.push(page);
 const app={page,el,log,progress,run,clock,html:()=>el.innerHTML,stored:()=>JSON.parse(run.getItem(RUN_KEY)||'null'),pd3:()=>progress.state.pd3,
  start(){page.view();page.mount();return app;},
  click:(action,d={})=>page.click({dataset:{action,...d}}),
  change:(dataset,value='',extra={})=>page.change({dataset,value,...extra}),
  type:(value)=>page.input({dataset:{pd3Gram:'text'},value}),
  key:(event)=>page.keydown({preventDefault(){},...event})};
 return app;
}
const hubHtml=app=>app.page.view();
const reload=app=>boot({progress:app.progress,run:app.run,clock:app.clock,links:undefined}).start();
function begin({set='fx-gram-1',timer=true}={}){
 const app=boot().start();
 app.click('pd3-gram-open');
 app.click('pd3-gram-pick',{id:set});
 if(!timer)app.change({pd3Gram:'timer'},'',{checked:false});
 app.click('pd3-gram-start');
 return app;
}
const idx=(item,word)=>item.tokens.findIndex(t=>t.toLowerCase()===word.toLowerCase());
const answerItem=(app,item,right=true)=>{
 switch(item.type){
  case 'gap':app.change({pd3Gram:'opt'},String(right?item.answer:(item.answer+1)%item.options.length));break;
  case 'cloze':for(const g of item.segments.filter(s=>typeof s==='object'))app.change({pd3Gram:'gap',gap:String(g.gap)},String(right?g.answer:(g.answer+1)%g.options.length));break;
  case 'fix':{
   const wrongIndex=(item.errorIndex+1)%item.sentence.split(' ').length;
   app.click('pd3-gram-word',{pos:String(right?item.errorIndex:wrongIndex)});app.type(right?item.fixes[0]:'forkert');break;}
  case 'transform':app.type(right?item.answers[0]:'Det er forkert.');break;
  case 'order':{
   const words=(right?item.answers[0]:item.answers[0].split(' ').reverse().join(' ')).split(' ');
   const used=new Set();
   for(const word of words){const i=item.tokens.findIndex((t,k)=>!used.has(k)&&t.toLowerCase().replace(/[.!?]/g,'')===word.toLowerCase().replace(/[.!?]/g,''));used.add(i);app.click('pd3-gram-tile',{pos:String(i)});}
   break;}
 }
};
const stepSet=(app,set,rights)=>{
 set.items.forEach((item,i)=>{
  assert.match(app.html(),new RegExp(`Задание ${i+1} из ${set.items.length}`));
  answerItem(app,item,rights[i]);app.click('pd3-gram-check');
  assert.match(app.html(),/id="pd3-gram-review"/,`review of ${item.id}`);
  app.click(i===set.items.length-1?'pd3-gram-finish':'pd3-gram-next');
 });
};

test('hub: the grammar card has its own action and does not count as a section button; absent without content',()=>{
 const app=boot().start();
 const html=hubHtml(app);
 assert.match(html,/Грамматика B2/);assert.match(html,/data-action="pd3-gram-open"/);assert.match(html,/Пройдено наборов: 0 из 2/);
 assert.equal((html.match(/data-action="pd3-open"/g)||[]).length,6);
 const bare=hubView({data:{...pd3Data,grammarSets:[]},d:app.page.state()&&boot().pd3()||{reading:{},listening:{},dictation:{},exam:{find:{},text:{}},writing:{},oral:{},plan:{examDate:''},stats:{dictation:{runs:0,errors:{}}},xp:{items:{},day:'',today:0},settings:{}},error:''});
 assert.doesNotMatch(bare,/pd3-gram-open/);
});

test('list: sets with their details, the twelve themes with a rule on a button, the filter and the practice of a theme',()=>{
 const app=boot().start();
 app.click('pd3-gram-open');
 let html=app.html();
 assert.match(html,/data-pd3-view="grammar"/);assert.match(app.log.titles.at(-1),/PD3 — грамматика B2/);
 assert.match(html,/Fixture sæt 1/);assert.match(html,/10 заданий · 15 мин · попыток: 0/);assert.match(html,/5 заданий · 15 мин/);assert.match(html,/Ещё не проходили/);
 assert.equal((html.match(/data-action="pd3-gram-filter"/g)||[]).length,13,'all themes + twelve');
 assert.equal((html.match(/data-action="pd3-gram-tip"/g)||[]).length,12);
 assert.match(html,/id="pd3-gram-tip-v2"[^>]*hidden/);
 app.click('pd3-gram-tip',{value:'v2'});html=app.html();assert.match(html,/aria-expanded="true"/);assert.doesNotMatch(html,/id="pd3-gram-tip-v2"[^>]*hidden/);
 app.click('pd3-gram-tip',{value:'v2'});assert.match(app.html(),/id="pd3-gram-tip-v2"[^>]*hidden/);
 app.click('pd3-gram-filter',{value:'cond'});html=app.html();
 assert.match(html,/Наборы по теме: Условные конструкции/);assert.match(html,/по теме: 2/,'the set with more tasks of the theme comes first');
 assert.ok(html.indexOf('Fixture sæt 2')<html.indexOf('Fixture sæt 1')||!html.includes('Fixture sæt 1'));
 assert.doesNotMatch(html,/Fixture sæt 1/,'set 1 has no condition task');
 // practice of a theme: opens the intro of the set with the most tasks of it
 const hub=boot().start();hub.click('pd3-gram-practice',{id:'prep'});
 assert.equal(hub.page.state().view,'grammar');assert.equal(hub.page.state().id,'fx-gram-1');assert.match(hub.html(),/С таймером/);
 hub.click('pd3-gram-practice',{id:'compare'});assert.match(hub.log.toasts.at(-1),/Наборов для этой темы пока нет/);
});

test('a task shows no right answer before it is checked: not in the markup, labels or titles',()=>{
 const app=begin();
 for(const item of set1.items){
  const html=app.html();
  assert.doesNotMatch(html,/data-answer|data-correct|data-right|answers=|errorIndex|aria-describedby="pd3-gram-review/);
  assert.doesNotMatch(html,/id="pd3-gram-review"/);
  assert.doesNotMatch(html,new RegExp(item.why.slice(0,25).replace(/[.*+?^${}()|[\]\\]/g,'\\$&')),'the explanation waits for the check');
  if(item.type==='transform'||item.type==='order'){
   for(const a of item.answers)assert.ok(!html.includes(a.replace(/'/g,'&#39;')),`${item.id} does not print "${a}"`);
  }
  if(item.type==='fix')for(const f of item.fixes)assert.doesNotMatch(html,new RegExp(`>${f}<|value="${f}"`),'the correction is not printed');
  if(item.type==='fix')assert.ok(!/is-right|\(здесь ошибка\)/.test(html));
  if(item.type==='gap')assert.ok(!/is-right|верно/.test(html.replace(/Проверить/g,'')));
  answerItem(app,item,true);app.click('pd3-gram-check');app.click(item===set1.items.at(-1)?'pd3-gram-finish':'pd3-gram-next');
 }
});

test('input fields: Danish text, no auto-correction, the done key; the letter buttons insert æøå',()=>{
 const app=begin();
 const goTo=type=>{for(let i=0;i<set1.items.length;i++){const item=set1.items[app.stored()?.index??i];if(item.type===type)return item;app.click('pd3-gram-skip');app.click('pd3-gram-next');}return null;};
 const fix=goTo('fix');
 app.click('pd3-gram-word',{pos:'1'});
 const field=/<input[^>]*id="pd3-gram-input"[^>]*>/.exec(app.html())[0];
 for(const attr of ['lang="da"','autocapitalize="none"','autocorrect="off"','autocomplete="off"','spellcheck="false"','enterkeyhint="done"'])assert.ok(field.includes(attr),attr);
 assert.match(app.html(),/data-action="pd3-letter" data-letter="æ"/);assert.match(app.html(),/data-letter="ø"/);assert.match(app.html(),/data-letter="å"/);
 assert.ok(fix);
 app.click('pd3-gram-skip');app.click('pd3-gram-next');app.click('pd3-gram-skip');app.click('pd3-gram-next');
 const text=/<textarea[^>]*id="pd3-gram-input"[^>]*>/.exec(app.html())[0];
 for(const attr of ['lang="da"','autocapitalize="none"','autocorrect="off"','autocomplete="off"','spellcheck="false"','enterkeyhint="done"'])assert.ok(text.includes(attr),'textarea '+attr);
});

test('all five task types: right and wrong answers, the review, the result and what is stored',()=>{
 const app=begin();
 assert.match(app.html(),/Осталось времени/);assert.match(app.html(),/15:00/);assert.match(app.html(),/id="pd3-gram-timer"/);assert.match(app.html(),/role="timer"/);
 assert.equal(app.stored().view,'grammar');assert.equal(app.stored().id,'fx-gram-1');
 // right on the 1st, 3rd, 4th, 6th, 8th and 10th, wrong on the others
 const rights=[true,false,true,true,false,true,false,true,false,true];
 stepSet(app,set1,rights);
 const html=app.html();
 assert.equal(app.stored(),null,'a finished set leaves nothing to restore');
 assert.match(html,/60%/);assert.match(html,/Верно 6 из 10/);assert.match(html,/Разбор по темам/);assert.match(html,/Разбор заданий/);
 assert.match(html,/Что повторить/);
 // the mistakes: your answer, the right answer and why
 for(const [i,item] of set1.items.entries())if(!rights[i]){
  assert.ok(html.includes(item.why),`${item.id}: why`);
 }
 assert.match(html,/Твой ответ:/);assert.match(html,/Верный ответ:/);
 const g=app.pd3().grammar;
 assert.equal(g.sets['fx-gram-1'].best,60);assert.equal(g.sets['fx-gram-1'].attempts,1);
 assert.deepEqual(g.cats.v2,{ok:2,all:2});assert.deepEqual(g.cats.prep,{ok:0,all:2});assert.deepEqual(g.cats.connect,{ok:1,all:2});assert.deepEqual(g.cats.passive,{ok:1,all:1});
 assert.equal(app.log.awards.length,1);assert.deepEqual(app.log.awards[0],{kind:'grammar',id:'fx-gram-1',percent:60,minutes:1});
 assert.equal(app.progress.state.pd3.xp.items['grammar:fx-gram-1'],60);assert.match(html,/\+9 XP/);
 assert.match(app.log.said.at(-1),/Набор закончен: 60%/);
 // the list now shows the best result and the attempt
 app.click('pd3-gram-list');assert.match(app.html(),/Лучший результат: 60%/);assert.match(app.html(),/попыток: 1/);
 // the hub block of frequent mistakes needs ten answers per theme: none yet
 app.click('pd3-open',{value:'hub'});assert.doesNotMatch(app.html(),/Частые ошибки по грамматике/);
});

test('checking: an incomplete answer is refused with a hint, the review shows your answer and the right one, "next" comes after the check',()=>{
 const app=begin();
 app.click('pd3-gram-check');assert.match(app.log.toasts.at(-1),/Выбери вариант ответа/);assert.doesNotMatch(app.html(),/pd3-gram-review/);
 assert.equal(app.click('pd3-gram-next'),true);assert.match(app.html(),/Задание 1 из 10/,'no way forward before the check');
 answerItem(app,set1.items[0],false);app.click('pd3-gram-check');
 let html=app.html();
 assert.match(html,/Неверно\./);assert.match(html,/Твой ответ:/);assert.match(html,/Верный ответ:/);assert.match(html,/I morgen går jeg til lægen\./);assert.match(html,/Почему:/);assert.match(html,/Порядок слов: V2 и инверсия/);
 assert.match(html,/pd3-option is-right/);assert.match(html,/pd3-option  ?is-wrong|is-wrong/);assert.match(html,/disabled/);
 assert.match(app.log.said.at(-1),/Неверно\. Верный ответ: I morgen går jeg til lægen\./);
 app.click('pd3-gram-check');app.click('pd3-gram-skip');assert.match(html,/Задание 1 из 10/,'a checked task is locked');
 app.change({pd3Gram:'opt'},'1');assert.equal(app.stored().answers['fx1-01'],2,'a checked answer cannot be changed');
 app.click('pd3-gram-next');html=app.html();
 assert.match(html,/Задание 2 из 10/);assert.match(app.log.titles.at(-1),/задание 2 из 10/);assert.doesNotMatch(html,/pd3-gram-review/);
 // fix: both parts are needed
 app.click('pd3-gram-skip');app.click('pd3-gram-next');app.click('pd3-gram-skip');app.click('pd3-gram-next');
 app.click('pd3-gram-check');assert.match(app.log.toasts.at(-1),/Нажми на неверное слово/);
 app.click('pd3-gram-word',{pos:'7'});app.click('pd3-gram-check');assert.match(app.log.toasts.at(-1),/Нажми на неверное слово и впиши исправление/);
 app.type('Stort');app.click('pd3-gram-check');assert.match(app.html(),/Верно\./);assert.match(app.html(),/Hun har en rød bil og et stort hus\./);
});

test('fix: the right word with a wrong correction, and the wrong word, are both wrong; the review names the error',()=>{
 const app=begin();
 for(let i=0;i<3;i++){app.click('pd3-gram-skip');app.click('pd3-gram-next');}
 app.click('pd3-gram-word',{pos:'7'});app.type('store');app.click('pd3-gram-check');
 assert.match(app.html(),/Неверно\./);assert.match(app.html(),/stor → store/);assert.match(app.html(),/Неверное слово:/);assert.match(app.html(),/is-right/);
 app.click('pd3-gram-next');
 app.click('pd3-gram-word',{pos:'3'});app.type('i');app.click('pd3-gram-check');
 assert.match(app.html(),/Неверно\./);assert.match(app.html(),/Неверное слово:<\/b> <span lang="da">på<\/span>/);
});

test('transform: spelling variants pass; a different wording can be marked as right by the learner, without a point and without statistics',()=>{
 const app=begin();
 for(let i=0;i<5;i++){app.click('pd3-gram-skip');app.click('pd3-gram-next');}
 assert.match(app.html(),/Man bygger en ny skole i byen\./);assert.match(app.html(),/Перепиши в пассиве/);
 app.type('  En ny SKOLE  bygges i byen ');app.click('pd3-gram-check');
 assert.match(app.html(),/Верно\./);assert.doesNotMatch(app.html(),/Мой вариант тоже верный/);
 app.click('pd3-gram-next');
 app.type('Jeg tager en paraply med, siden det regner.');app.click('pd3-gram-check');
 assert.match(app.html(),/Неверно\./);assert.match(app.html(),/Мой вариант тоже верный/);assert.match(app.html(),/Другие верные варианты/);
 app.click('pd3-gram-self');
 assert.match(app.html(),/Самопроверка отмечена/);assert.doesNotMatch(app.html(),/Мой вариант тоже верный/);assert.match(app.html(),/не даёт балла и XP/);
 assert.match(app.log.said.at(-1),/Самопроверка отмечена/);
 assert.deepEqual(app.stored().self,['fx1-07']);
 // the rest: right answers on five more tasks
 app.click('pd3-gram-next');
 for(const item of set1.items.slice(7)){answerItem(app,item,true);app.click('pd3-gram-check');app.click(item===set1.items.at(-1)?'pd3-gram-finish':'pd3-gram-next');}
 const html=app.html();
 assert.match(html,/Верно 4 из 10/,'the self-checked task and the 5 skipped ones give no point');assert.match(html,/самопроверка/);
 const g=app.pd3().grammar;
 assert.equal(g.cats.connect.all,1,'only the cloze: the self-checked task is outside the statistics');assert.equal(g.cats.passive.all,1);
 assert.equal(g.sets['fx-gram-1'].best,40);
});

test('order: tiles go to the answer zone and back, every listed ordering is right, the sentence is checked as a whole',()=>{
 const app=begin();
 for(let i=0;i<7;i++){app.click('pd3-gram-skip');app.click('pd3-gram-next');}
 let html=app.html();
 assert.match(html,/class="answer-zone pd3-zone"/);assert.match(html,/class="token-bank pd3-bank"/);assert.match(html,/Нажимай на слова ниже/);
 app.click('pd3-gram-check');assert.match(app.log.toasts.at(-1),/Расставь все слова/);
 app.click('pd3-gram-tile',{pos:String(idx(set1.items[7],'vi'))});html=app.html();
 assert.match(html,/data-action="pd3-gram-untile" data-pos="0"/);assert.match(html,/pd3-tile used"[^>]*disabled|pd3-tile used/);assert.equal(app.stored().answers['fx1-08'].length,1);
 app.click('pd3-gram-untile',{pos:'0'});assert.equal(app.stored().answers['fx1-08'],undefined,'an empty zone is not stored');
 // the second listed ordering: "Vi har fri i dag."
 for(const word of ['vi','har','fri.','I','dag'])app.click('pd3-gram-tile',{pos:String(idx(set1.items[7],word))});
 app.click('pd3-gram-check');assert.match(app.html(),/Верно\./);assert.match(app.html(),/Другие верные варианты/);
 app.click('pd3-gram-next');
 for(const word of ['jeg','ved','at','han','kommer.','ikke'])app.click('pd3-gram-tile',{pos:String(idx(set1.items[8],word))});
 app.click('pd3-gram-check');assert.match(app.html(),/Неверно\./);assert.match(app.html(),/Твой ответ:<\/b> <span lang="da">jeg ved at han kommer\. ikke<\/span>/);assert.match(app.html(),/Jeg ved at han ikke kommer\./);
 // reset
 app.click('pd3-gram-next');
});

test('cloze: every gap is chosen; the review names the wrong gaps with the right word',()=>{
 const app=begin();
 for(let i=0;i<9;i++){app.click('pd3-gram-skip');app.click('pd3-gram-next');}
 assert.match(app.html(),/<select id="pd3-gram-gap-1"/);assert.equal((app.html().match(/<select /g)||[]).length,4);
 app.change({pd3Gram:'gap',gap:'1'},'0');app.click('pd3-gram-check');assert.match(app.log.toasts.at(-1),/Заполни все пропуски/);
 app.change({pd3Gram:'gap',gap:'2'},'1');app.change({pd3Gram:'gap',gap:'3'},'0');app.change({pd3Gram:'gap',gap:'4'},'0');
 assert.deepEqual(app.stored().answers['fx1-10'],{1:0,2:1,3:0,4:0});
 app.click('pd3-gram-check');
 assert.match(app.html(),/Пропуск 3: нужно «<span lang="da">men<\/span>», ты выбрал «<span lang="da">hvis<\/span>»/);assert.doesNotMatch(app.html(),/Пропуск 1: нужно/);
 assert.match(app.html(),/Завершить набор/);
 app.change({pd3Gram:'gap',gap:'3'},'1');assert.deepEqual(app.stored().answers['fx1-10'],{1:0,2:1,3:0,4:0},'a checked cloze is locked');
});

test('XP: 30 percent and five answered tasks are needed; the same set again pays only for a better result',()=>{
 const few=begin({set:'fx-gram-2'});
 stepSet(few,set2,[true,true,true,true,true]);
 assert.equal(few.log.awards.length,1,'the short set has five tasks, all answered');
 const poor=begin();
 for(const item of set1.items){answerItem(poor,item,item===set1.items[0]);poor.click('pd3-gram-check');poor.click(item===set1.items.at(-1)?'pd3-gram-finish':'pd3-gram-next');}
 assert.match(poor.html(),/10%/);assert.equal(poor.log.awards.length,1,'asked once; awardPd3 itself refuses below 30 percent');
 assert.equal(poor.progress.state.pd3.xp.items['grammar:fx-gram-1'],undefined);
 // fewer than five answered tasks: saved, but no XP request
 const skipper=begin();
 answerItem(skipper,set1.items[0],true);skipper.click('pd3-gram-check');skipper.click('pd3-gram-next');
 for(let i=0;i<8;i++){skipper.click('pd3-gram-skip');skipper.click('pd3-gram-next');}
 skipper.click('pd3-gram-skip');skipper.click('pd3-gram-finish');
 assert.equal(skipper.log.awards.length,0);assert.match(skipper.html(),/XP не начисляется: для него нужно выполнить хотя бы 5 заданий/);
 assert.equal(skipper.pd3().grammar.sets['fx-gram-1'].attempts,1);
 // nothing answered at all: not even an attempt
 const idle=begin();
 for(let i=0;i<9;i++){idle.click('pd3-gram-skip');idle.click('pd3-gram-next');}
 idle.click('pd3-gram-skip');idle.click('pd3-gram-finish');
 assert.equal(idle.pd3(),undefined,'nothing is stored for a set without a single answer');
 // repeating: the ledger pays nothing twice
 const app=begin();stepSet(app,set1,Array(10).fill(true));
 const first=app.progress.state.xp;assert.equal(first,15);
 app.click('pd3-gram-again');app.click('pd3-gram-start');stepSet(app,set1,Array(10).fill(true));
 assert.equal(app.progress.state.xp,15,'no second payment for the same set and result');assert.equal(app.pd3().grammar.sets['fx-gram-1'].attempts,2);
});

test('exit: the way back asks first, "stay" keeps everything, "leave" drops the set',()=>{
 const app=begin();
 answerItem(app,set1.items[0],true);app.click('pd3-gram-check');
 app.click('pd3-gram-exit');assert.match(app.html(),/Выйти из набора\?/);assert.match(app.html(),/data-autofocus/);
 assert.equal(app.key({key:'Escape'}),true);assert.doesNotMatch(app.html(),/Выйти из набора\?/);
 assert.ok(app.stored());
 app.click('pd3-gram-exit');app.click('pd3-gram-exit-yes');
 assert.equal(app.stored(),null);assert.match(app.html(),/Наборы/);assert.equal(app.pd3(),undefined);
});

test('Enter in the answer field sends the answer; modifiers and composition do not',()=>{
 const app=begin({set:'fx-gram-2'});
 app.click('pd3-gram-skip');app.click('pd3-gram-next');app.click('pd3-gram-skip');app.click('pd3-gram-next');
 app.click('pd3-gram-word',{pos:'2'});app.type('sin');
 assert.equal(app.key({key:'Enter',isComposing:true,target:{id:'pd3-gram-input'}}),false);
 assert.equal(app.key({key:'Enter',shiftKey:true,target:{id:'pd3-gram-input'}}),false);
 assert.equal(app.key({key:'Enter',target:{id:'other'}}),false);
 assert.equal(app.key({key:'Enter',target:{id:'pd3-gram-input'}}),true);
 assert.match(app.html(),/Верно\./);
});

/* ---------- reload and time ---------- */
test('reload: the same set, the answers, the position, the tiles and the exact time left; the record is validated against the content',()=>{
 const app=begin();
 answerItem(app,set1.items[0],true);app.click('pd3-gram-check');app.click('pd3-gram-next');
 answerItem(app,set1.items[1],false);app.click('pd3-gram-check');app.click('pd3-gram-next');
 app.click('pd3-gram-skip');app.click('pd3-gram-next');
 app.click('pd3-gram-word',{pos:'7'});app.type('stor');
 app.clock.t=T0+4*MIN+30000;
 const record=app.stored();
 assert.equal(record.v,1);assert.equal(record.view,'grammar');assert.equal(record.index,3);assert.equal(record.deadline,T0+15*MIN);assert.deepEqual(record.done,['fx1-01','fx1-02','fx1-03']);assert.deepEqual(record.skipped,['fx1-03']);
assert.deepEqual(record.answers['fx1-04'],{i:7},'the typed text follows with the debounced save');
 // the typed text is saved a moment later (debounced); a hidden tab flushes it
 app.page.suspend();assert.deepEqual(app.stored().answers['fx1-04'],{i:7,t:'stor'});
 const again=reload(app);
 assert.equal(again.page.state().view,'grammar');assert.equal(again.page.state().id,'fx-gram-1');
 const html=again.html();
 assert.match(html,/Задание 4 из 10/);assert.match(html,/10:30/,'the time left comes from the absolute deadline');
 assert.match(html,/value="stor"/);assert.match(again.log.toasts.at(-1),/Набор восстановлен/);assert.equal(again.stored().deadline,T0+15*MIN);
 // the earlier tasks are locked
 assert.deepEqual(again.stored().done,['fx1-01','fx1-02','fx1-03']);
 again.type('stort');again.click('pd3-gram-check');assert.match(again.html(),/Верно\./);
 // order tiles survive too
 again.click('pd3-gram-next');again.click('pd3-gram-skip');again.click('pd3-gram-next');again.click('pd3-gram-skip');again.click('pd3-gram-next');again.click('pd3-gram-skip');again.click('pd3-gram-next');
 again.click('pd3-gram-tile',{pos:String(idx(set1.items[7],'vi'))});again.click('pd3-gram-tile',{pos:String(idx(set1.items[7],'har'))});
 const third=reload(again);
 assert.equal(third.stored().index,7);assert.deepEqual(third.stored().answers['fx1-08'],[idx(set1.items[7],'vi'),idx(set1.items[7],'har')]);
 assert.match(third.html(),/data-action="pd3-gram-untile" data-pos="1"/);
});

test('reload: a finished or left set is not brought back; a record of another version, an old one or one with a foreign task is ignored',()=>{
 const app=begin();stepSet(app,set1,Array(10).fill(true));
 assert.equal(reload(app).page.state().view,'hub');
 const live=begin();
 const good=live.stored();
 const ok=record=>validateRun(structuredClone(record),{data,now:T0+1000});
 assert.ok(ok(good));
 assert.equal(ok({...good,v:2}),null);assert.equal(ok({...good,id:'nope'}),null);assert.equal(ok({...good,kind:'x',view:'writing'}),null);
 assert.equal(ok({...good,savedAt:T0-RUN_MAX_AGE-1}),null,'older than 24 hours');assert.ok(ok({...good,savedAt:T0-RUN_MAX_AGE+5000}));
 assert.equal(ok({...good,answers:{'fx2-01':1}}),null,'a task of another set');
 assert.equal(validateRun(structuredClone(good),{data:{...data,grammarSets:[]},now:T0+1000}),null,'the set is gone from the content');
 assert.equal(validateRun(structuredClone(good),{data:pd3Data,now:T0+1000})?.id,pd3Data.grammarSets?.some(s=>s.id==='fx-gram-1')?'fx-gram-1':undefined);
 // old records of other views are read exactly as before
 assert.equal(ok({v:1,savedAt:T0,view:'reading',kind:null,id:'nope',t0:T0,answers:{}}),null);
 assert.equal(snapshotRun({view:'grammar',id:null,kind:null},{phase:'pick'},T0),null);
 assert.equal(snapshotRun({view:'grammar',id:'fx-gram-1',kind:null},{phase:'intro'},T0),null);
});

test('reload without a timer keeps no deadline',()=>{
 const app=begin({timer:false});
 assert.match(app.html(),/Без таймера/);assert.doesNotMatch(app.html(),/id="pd3-gram-timer"/);assert.equal(app.stored().deadline,null);
 answerItem(app,set1.items[0],true);app.click('pd3-gram-check');
 const again=reload(app);assert.match(again.html(),/Без таймера/);assert.match(again.html(),/Верно\./);
});

test('reload after the deadline: the set ends with what was entered, once',()=>{
 const app=begin();
 answerItem(app,set1.items[0],true);app.click('pd3-gram-check');app.click('pd3-gram-next');
 answerItem(app,set1.items[1],true);   // typed but not sent
 app.clock.t=T0+20*MIN;
 const late=reload(app);
 assert.match(late.log.toasts.at(-1),/Время набора вышло, пока страница была закрыта/);
 assert.match(late.html(),/Время вышло: набор закончен автоматически/);assert.match(late.html(),/Верно 2 из 10/,'the answer typed before the end is checked');
 assert.equal(late.stored(),null);
 const g=late.pd3().grammar;assert.equal(g.sets['fx-gram-1'].attempts,1);
 const third=reload(late);assert.equal(third.page.state().view,'hub');assert.equal(third.pd3().grammar.sets['fx-gram-1'].attempts,1,'no second record');
});

test('the timer: warnings at 5 minutes, 1 minute and 30 seconds, then the set ends by itself',(t)=>{
 t.mock.timers.enable({apis:['setInterval','setTimeout']});
 const app=begin();
 const said=()=>app.log.said;
 const at=sec=>{app.clock.t=T0+sec*1000;t.mock.timers.tick(1000);};
 at(60);assert.deepEqual(said(),[]);
 at(10*60);assert.deepEqual(said(),['Осталось 5 минут']);
 at(10*60+20);assert.equal(said().length,1,'no repeat');
 at(14*60);assert.deepEqual(said().slice(1),['Осталась 1 минута']);
 at(14*60+30);assert.deepEqual(said().slice(2),['Осталось 30 секунд']);
 answerItem(app,set1.items[0],true);app.click('pd3-gram-check');
 at(15*60+1);
 assert.equal(app.stored(),null);assert.match(app.html(),/Время вышло/);assert.match(said().at(-1),/Время вышло/);
 assert.equal(app.pd3().grammar.sets['fx-gram-1'].attempts,1);
 t.mock.timers.tick(5000);assert.equal(app.pd3().grammar.sets['fx-gram-1'].attempts,1,'the clock is stopped');
});

test('the warnings already passed are not repeated after a reload',(t)=>{
 t.mock.timers.enable({apis:['setInterval','setTimeout']});
 const app=begin();app.clock.t=T0+14*60000+20000;
 const again=reload(app);t.mock.timers.tick(1000);
 assert.deepEqual(again.log.said,[],'the minute mark is behind: nothing is said again');
 again.clock.t=T0+14*60000+35000;t.mock.timers.tick(1000);
 assert.deepEqual(again.log.said,['Осталось 30 секунд']);
});

/* ---------- results: recommendations, links, system parts ---------- */
test('result: recommendations (at most three) with links only to lessons that exist; no links without the app',()=>{
 const links={lesson:id=>id==='g-main-order'?'Глагол на втором месте':null,reference:()=>false};
 const app=boot({links}).start();app.click('pd3-gram-open');app.click('pd3-gram-pick',{id:'fx-gram-1'});app.click('pd3-gram-start');
 stepSet(app,set1,Array(10).fill(false));
 const html=app.html();
 const recs=html.slice(html.indexOf('Что повторить'),html.indexOf('Разбор заданий'));
 assert.equal((recs.match(/<li>/g)||[]).length,3);assert.equal((recs.match(/data-action="pd3-gram-practice"/g)||[]).length,3);
 assert.match(html,/data-action="lesson-intro" data-id="g-main-order"/);assert.doesNotMatch(html,/g-questions/);
 const plain=begin();stepSet(plain,set1,Array(10).fill(false));assert.doesNotMatch(plain.html(),/lesson-intro/);
 // practising a recommended theme from the result
 plain.click('pd3-gram-practice',{id:'bisaet'});assert.match(plain.html(),/С таймером/);assert.equal(plain.page.state().id,'fx-gram-1');
 assert.equal(plain.stored(),null,'an intro is not an unfinished set');
});

test('the hub block "frequent mistakes": top three themes by the share of mistakes, ten answers each, with a link to practise',()=>{
 const app=boot().start();
 app.progress.state=validateState({...app.progress.state,pd3:{...app.pd3(),version:1,updatedAt:T0,
  grammar:{sets:{},cats:{v2:{ok:5,all:12},prep:{ok:2,all:10},agree:{ok:1,all:3},modal:{ok:9,all:10},tenses:{ok:3,all:10},cond:{ok:0,all:10}},updatedAt:T0}}});
 const html=hubHtml(app);
 assert.match(html,/Частые ошибки по грамматике/);
 const block=html.slice(html.indexOf('pd3-gram-weak-title'),html.indexOf('Копия результатов'));
 assert.deepEqual([...block.matchAll(/<li><span><b>([^<]+)<\/b>/g)].map(m=>m[1]),['Условные конструкции','Предлоги','Времена']);
 assert.match(block,/ошибок 10 из 10 \(100%\)/);assert.doesNotMatch(block,/Согласование/,'three answers are too few');
 app.click('pd3-gram-practice',{id:'cond'});assert.equal(app.page.state().id,'fx-gram-2');
});

test('plan and progress: grammar is a fifth skill with the last result and the weakest theme',()=>{
 const app=boot().start();
 let html=hubHtml(app);
 assert.match(html,/<b>Грамматика B2<\/b><span>результатов пока нет/);
 app.progress.state=validateState({...app.progress.state,pd3:{...app.pd3(),version:1,updatedAt:T0,
  grammar:{sets:{'fx-gram-1':{best:70,last:60,attempts:2,at:T0}},cats:{prep:{ok:1,all:6},v2:{ok:5,all:6}},updatedAt:T0}}});
 html=hubHtml(app);
 assert.match(html,/<b>Грамматика B2<\/b><span>последний результат: 60% · лучший: 70%/);assert.match(html,/слабая тема: Предлоги/);
});
