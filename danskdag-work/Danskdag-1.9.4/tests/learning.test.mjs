import test from 'node:test';
import assert from 'node:assert/strict';
import * as L from '../dist/learning.mjs';

const pool=[
 {id:'a',da:'Jeg bor i Danmark.',ru:'Я живу в Дании.',note:'Bor — живу.',daAnswers:['Jeg bor i Danmark.'],ruAnswers:['Я живу в Дании.']},
 {id:'b',da:'Jeg lærer dansk.',ru:'Я учу датский.',note:'Lærer — учу.'},
 {id:'c',da:'Vi ses i morgen.',ru:'Увидимся завтра.',note:'Прощание.'},
 {id:'d',da:'Tak for hjælpen.',ru:'Спасибо за помощь.',note:'Благодарность.'},
 {id:'g',da:'Han siger, at han ikke kommer.',ru:'Он говорит, что не придёт.',note:'Ikke перед kommer.',gap:{text:'Han siger, at han ___ kommer.',answers:['ikke'],options:['ikke','aldrig ikke','nej','ingen']}}
];
test('easy mode offers choices; expert mode requires independent answers',()=>{
 const easy=L.createTasks(pool,pool,'easy');assert.ok(easy.every(t=>t.options.length>=2));
 const expert=L.createTasks(pool,pool,'expert');assert.ok(expert.every(t=>!t.options.length));
 assert.equal(expert.at(-1).kind,'gap');assert.equal(L.checkTask(expert.at(-1),'ikke'),true);
 assert.equal(L.checkTask(expert.at(-1),'nej'),false);
});
test('choices have unique options and exactly one matching correct answer',()=>{
 for(const task of L.createTasks(pool,pool,'easy')){
  assert.equal(new Set(task.options).size,task.options.length);
  assert.equal(task.options.filter(o=>L.checkTask(task,o)).length,1);
 }
});
test('mixed mode builds word order and keeps Danish letters significant',()=>{
 const tasks=L.createTasks(pool,pool,'mixed');
 assert.equal(tasks[1].kind,'build');assert.equal(L.checkTask(tasks[1],'Jeg lærer dansk'),true);
 assert.equal(L.checkTask(tasks[1],'Jeg laerer dansk'),false);
});
test('failures get one retry at the end without scoring them twice',()=>{
 let s=L.makeSession(pool.slice(0,3),pool,{mode:'easy',title:'Test',lessonId:'lesson'});
 s=L.answerSession(s,'неправильно');assert.equal(s.correct,0);
 assert.deepEqual(L.answerSession(s,'повторно'),s);
 s=L.advanceSession(s);
 for(let i=0;i<2;i++){s=L.answerSession(s,s.tasks[s.index].answers[0]);s=L.advanceSession(s);}
 assert.equal(s.tasks.length,4);assert.equal(s.index,3);assert.equal(s.correct,2);
 s=L.answerSession(s,s.tasks[3].answers[0]);s=L.advanceSession(s);
 assert.equal(s.correct,2);assert.equal(s.index,4);assert.equal(s.tasks.length,4);
});
test('session round trips, invalid session cannot wipe valid progress',()=>{
 const s=L.makeSession(pool.slice(0,2),pool,{mode:'mixed',title:'Test',lessonId:'lesson'});
 const items=Object.fromEntries(pool.map(p=>[p.id,p]));
 assert.deepEqual(L.restoreSession(JSON.parse(JSON.stringify(s)),items),s);
 assert.equal(L.restoreSession({...s,index:999},items),null);
 assert.equal(L.restoreSession({...s,tasks:[{itemId:'missing'}]},items),null);
});
test('moving word tokens preserves duplicates as distinct positions',()=>{
 assert.deepEqual(L.moveToken([1,2,3],0,2),[2,3,1]);
 assert.deepEqual(L.moveToken([1,2,3],1,0),[2,1,3]);
 assert.deepEqual(L.moveToken([1,2,3],99,0),[1,2,3]);
});
test('legacy typed answers resume as writing rather than distractor choices',()=>{
 const items=Object.fromEntries(pool.map(p=>[p.id,p]));
 const old={id:'old-session',lessonId:'old-lesson',title:'Old',tasks:[{phraseId:'a',kind:'type',reverse:true,options:['a','b','c','d'],bank:['Jeg','bor','i','Danmark']}],index:0,correct:0,missed:[],started:1000,submitted:false,answer:'Jeg bor',words:[],feedback:false,revealed:false,retryAdded:false};
 const restored=L.restoreSession(old,items);
 assert.equal(restored.tasks[0].kind,'type');
 assert.deepEqual(restored.tasks[0].options,[]);
 assert.equal(restored.answer,'Jeg bor');
});
test('word synonyms sharing the same Russian prompt are accepted and not distractors',()=>{
 const synonyms=[{id:'w1',kind:'word',verified:true,da:'med det samme',ru:'немедленно; сразу'},{id:'w2',kind:'word',verified:true,da:'straks',ru:'немедленно; сразу'},...pool];
 const expert=L.createTasks([synonyms[0]],synonyms,'expert')[0];
 assert.ok(L.checkTask(expert,'straks'));
 const easy=L.createTasks([pool[0],pool[1],synonyms[0]],synonyms,'easy')[2];
 assert.equal(easy.options.filter(v=>L.checkTask(easy,v)).length,1);
});

test('context recognition uses authored meanings instead of unrelated translations',()=>{
 const item={id:'sense-test',da:'Han er en flink fyr.',ru:'Он приятный парень.',focus:{question:'Что здесь значит fyr?',answers:['парень','молодой человек'],options:['парень','маяк','сосна','котёл'],answerLang:'ru'}};
 const task=L.createTasks([item],[item], 'easy')[0];
 assert.equal(task.kind,'focus');
 assert.equal(task.prompt,'Han er en flink fyr.');
 assert.equal(task.question,'Что здесь значит fyr?');
 assert.equal(task.answerLang,'ru');
 assert.deepEqual([...task.options].sort(),['котёл','маяк','парень','сосна']);
 assert.ok(L.checkTask(task,'молодой человек'));
 assert.ok(!L.checkTask(task,'маяк'));
});
test('expert word-class recognition accepts Russian or Danish labels without choices',()=>{
 const item={id:'class-test',da:'Vi ser huset.',ru:'Мы видим дом.',focus:{question:'К какому классу относится huset?',target:'huset',answers:['substantiv','существительное','substantiver'],options:['substantiv','verbum','adjektiv'],answerLang:'da'}};
 const task=L.createTasks([item],[item],'expert')[0];
 assert.equal(task.kind,'focus');
 assert.equal(task.target,'huset');
 assert.deepEqual(task.options,[]);
 assert.ok(L.checkTask(task,'Существительное'));
 assert.ok(!L.checkTask(task,'verbum'));
});
test('context question and selected answer resume without changing the expected sense',()=>{
 const item={id:'sense-resume',da:'Vi så et fyr ved kysten.',ru:'Мы увидели маяк у берега.',focus:{question:'Что здесь значит fyr?',answers:['маяк'],options:['маяк','парень','сосна'],answerLang:'ru'}};
 const session=L.makeSession([item],[item],{mode:'easy'});session.answer='парень';
 const restored=L.restoreSession(JSON.parse(JSON.stringify(session)),{[item.id]:item});
 assert.ok(restored);
 assert.equal(restored.tasks[0].question,'Что здесь значит fyr?');
 assert.equal(restored.answer,'парень');
 assert.equal(L.answerSession(restored,restored.answer).feedback,false);
 const bad=structuredClone(session);bad.tasks[0].question='x'.repeat(2000);
 assert.equal(L.restoreSession(bad,{[item.id]:item}),null);
});

test('adaptive practice moves from recognizing to assembling and then independent recall',()=>{
 const item={id:'safe-build',da:'Min bror har en grøn bil.',ru:'У моего брата зелёная машина.',daAnswers:['Min bror har en grøn bil.']};
 const known={box:0,due:0,seen:1,recognition:1,recall:0,lastGrade:'recognition'};
 assert.equal(L.createTasks([item],[item,...pool],'auto',{})[0].kind,'choice');
 const build=L.createTasks([item],[item,...pool],'auto',{'safe-build':known})[0];
 assert.equal(build.kind,'build');assert.equal(build.answerLang,'da');assert.equal(build.stage,'build');
 const recall=L.createTasks([item],[item,...pool],'auto',{'safe-build':{...known,recognition:2}})[0];
 assert.equal(recall.kind,'type');assert.deepEqual(recall.options,[]);
 assert.equal(recall.prompt,'У моего брата зелёная машина.');
});
test('adaptive word recall uses an authored context without exposing another occurrence',()=>{
 const word={id:'context-word',kind:'word',da:'tillid',ru:'доверие',exampleDa:'Jeg har tillid til mine kolleger.',exampleRu:'Я доверяю своим коллегам.'};
 const reviews={'context-word':{box:1,due:0,seen:2,recognition:2,lastGrade:'recognition'}};
 const task=L.createTasks([word],[word,...pool],'auto',reviews)[0];
 assert.equal(task.kind,'gap');assert.equal(task.prompt,'Jeg har ___ til mine kolleger.');
 assert.equal(task.completeDa,'Jeg har tillid til mine kolleger.');
 assert.equal(task.contextTranslation,'Я доверяю своим коллегам.');
 assert.ok(L.checkTask(task,'tillid'));assert.ok(!L.checkTask(task,'доверие'));
 const repeated={...word,exampleDa:'Tillid skaber tillid.'};
 assert.equal(L.createTasks([repeated],[repeated,...pool],'auto',reviews)[0].kind,'type');
 const fragment={...word,da:'i',exampleDa:'Vi bor her.'};
 assert.equal(L.createTasks([fragment],[fragment,...pool],'auto',reviews)[0].kind,'type');
});
test('session records help separately from unaided responses and resumes new-word study',()=>{
 let s=L.makeSession(pool.slice(0,2),pool,{mode:'expert',studyIds:['a','b']});
 assert.equal(s.studyDone,false);assert.deepEqual(s.studyIds,['a','b']);
 s.studyDone=true;s.helped=true;
 s=L.answerSession(s,'Jeg bor i Danmark.');
 assert.equal(s.correct,1);
 assert.deepEqual(s.outcomes,[{itemId:'a',correct:true,kind:'recall',helped:true,retry:false}]);
 s=L.advanceSession(s);assert.equal(s.helped,false);
 const restored=L.restoreSession(JSON.parse(JSON.stringify(s)),Object.fromEntries(pool.map(p=>[p.id,p])));
 assert.ok(restored);assert.equal(restored.outcomes.length,1);assert.equal(restored.studyDone,true);
 const invalid=structuredClone(s);invalid.outcomes[0].kind='invented';
 assert.equal(L.restoreSession(invalid,Object.fromEntries(pool.map(p=>[p.id,p]))),null);
});

test('typographic apostrophes and dashes do not reject an otherwise identical answer',()=>{
 assert.ok(L.checkTask({answers:["Det er sgu' fint."]},'Det er sgu’ fint!'));
 assert.ok(L.checkTask({answers:['датско-русский']},'датско–русский'));
 assert.ok(!L.checkTask({answers:['Jeg går hjem.']},'Jeg gar hjem.'));
 assert.ok(!L.checkTask({answers:['I dag arbejder jeg.']},'I dag jeg arbejder.'));
});
test('an authored inflected context gap preserves the complete example and expected surface form',()=>{
 const word={id:'inflected',kind:'word',da:'løbe',ru:'бежать',exampleDa:'Hun løber hver morgen.',exampleRu:'Она бегает каждое утро.',contextGap:{text:'Hun ___ hver morgen.',answers:['løber']}};
 const reviews={inflected:{box:1,due:0,seen:2,recognition:2,lastGrade:'recognition'}};
 const task=L.createTasks([word],[word,...pool],'auto',reviews)[0];
 assert.equal(task.kind,'gap');assert.equal(task.prompt,'Hun ___ hver morgen.');
 assert.ok(L.checkTask(task,'løber'));assert.ok(!L.checkTask(task,'løbe'));
 assert.equal(task.completeDa,word.exampleDa);
});
test('self-check removes an unrecognized formulation from immediate retry without granting verified success',()=>{
 assert.equal(typeof L.selfCheckSession,'function');
 let s=L.makeSession([pool[0]],pool,{mode:'expert'});
 s=L.answerSession(s,'I Danmark bor jeg.');
 assert.equal(s.feedback,false);assert.equal(s.correct,0);
 s=L.selfCheckSession(s);
 assert.equal(s.selfChecked,true);assert.equal(s.correct,0);assert.equal(s.helped,true);
 assert.deepEqual(s.missed,[]);
 assert.equal(s.outcomes.at(-1).helped,true);
 assert.equal(s.outcomes.at(-1).selfChecked,true);
 s=L.advanceSession(s);assert.equal(s.tasks.length,1);
 const restored=L.restoreSession(JSON.parse(JSON.stringify(s)),Object.fromEntries(pool.map(p=>[p.id,p])));
 assert.ok(restored);
 const choices=L.answerSession(L.makeSession([pool[0]],pool,{mode:'easy'}),'wrong');
 assert.deepEqual(L.selfCheckSession(choices),choices);
});

test('a session already credited to progress is not offered again after reload',()=>{
 const catalog=Object.fromEntries(pool.map(p=>[p.id,p]));
 const session=L.makeSession([pool[0]],pool,{mode:'expert',title:'Reload regression'});
 const finished=L.advanceSession(L.answerSession(session,'Jeg bor i Danmark.'));
 assert.equal(L.restoreSession(finished,catalog,[finished.id]),null);
 assert.ok(L.restoreSession(session,catalog,[finished.id+'-other']));
});

// ---- build: word order, alternatives and self-check ----
const orderItem={id:'order-1',da:'Jeg drikker kaffe om morgenen.',ru:'Я пью кофе по утрам.'};
const orderPool=[orderItem,...pool.slice(1,4)];
const buildAt1=(item)=>{ // mixed mode gives "build" for index 1
 const filler={id:'filler',da:'Jeg lærer dansk.',ru:'Я учу датский.'};
 return L.createTasks([filler,item],[filler,item,...pool],'mixed')[1];
};
test('a sentence with a movable time or place adverbial is not offered as build until the second order is listed',()=>{
 assert.equal(L.hasMovableAdverbial('Jeg drikker kaffe om morgenen.'),true);
 assert.equal(L.hasMovableAdverbial('Om morgenen drikker jeg kaffe.'),true);
 assert.equal(L.hasMovableAdverbial('Jeg bor i Danmark.'),true);
 assert.equal(L.hasMovableAdverbial('Min bror har en grøn bil.'),false);
 assert.equal(L.hasMovableAdverbial('Hvor bor du i Danmark?'),false);
 assert.equal(buildAt1(orderItem).kind,'choice');
 const covered={...orderItem,daAnswers:['Jeg drikker kaffe om morgenen.','Om morgenen drikker jeg kaffe.']};
 assert.equal(L.hasOrderVariant(covered),true);
 const task=buildAt1(covered);
 assert.equal(task.kind,'build');
 // the bank is made from the first sentence; every listed order is accepted, nothing else is
 assert.equal(L.checkTask(task,'Jeg drikker kaffe om morgenen'),true);
 assert.equal(L.checkTask(task,'Om morgenen drikker jeg kaffe'),true);
 assert.equal(L.checkTask(task,'om morgenen jeg drikker kaffe'),false);
 // a listed second answer that only changes words does not cover a different word order
 assert.equal(L.hasOrderVariant({...orderItem,daAnswers:[orderItem.da,'Jeg tager kaffe om morgenen.']}),false);
});
test('an unsafe build slot in adaptive practice is labelled and recorded as recognition',()=>{
 const reviews={'order-1':{box:0,due:0,seen:1,recognition:1,recall:0,lastGrade:'recognition'}};
 const task=L.createTasks([{...orderItem,da:'Jeg drikker kaffe om morgenen i dag igen.'}],orderPool,'auto',{...reviews})[0];
 assert.equal(task.kind,'choice');assert.equal(task.stage,'recognition');assert.ok(task.options.length>=2);
});
test('self-check is available for build, grants no verified success and needs an actual answer',()=>{
 const item={...orderItem,daAnswers:[orderItem.da]};
 let s=L.makeSession([item],[item,...pool],{mode:'mixed'});
 // force the build kind to exercise the session logic itself
 s.tasks[0]={...s.tasks[0],kind:'build',reverse:true,options:[],answers:[item.da],answerLang:'da',promptLang:'ru',prompt:item.ru,bank:['Jeg','drikker','kaffe','om','morgenen']};
 const wrong=L.answerSession(s,'Om morgenen drikker jeg kaffe');
 assert.equal(wrong.feedback,false);assert.equal(wrong.correct,0);assert.deepEqual(wrong.missed,['order-1']);
 const checked=L.selfCheckSession(wrong);
 assert.equal(checked.selfChecked,true);assert.equal(checked.correct,0);assert.equal(checked.helped,true);
 assert.deepEqual(checked.missed,[]);
 assert.deepEqual({correct:checked.outcomes.at(-1).correct,helped:checked.outcomes.at(-1).helped,selfChecked:checked.outcomes.at(-1).selfChecked,kind:checked.outcomes.at(-1).kind},{correct:true,helped:true,selfChecked:true,kind:'recognition'});
 const gaveUp=L.answerSession({...s,helped:true},'');
 assert.deepEqual(L.selfCheckSession(gaveUp),gaveUp);
});

// ---- typed ru->da answers: article, "at" ----
const entry=(id,da,ru,extra={})=>({id,kind:'word',verified:true,da,ru,...extra});
test('typed noun answers require the article whichever duplicate entry is asked, and a verb accepts "at" either way',()=>{
 const dict=[entry('rain-a','regn','дождь'),entry('rain-b','en regn','дождь'),entry('tend-a','tænde','включать'),entry('tend-b','at tænde','включать; зажигать'),entry('plain','sandsynlig','вероятный'),...pool];
 const task=id=>L.createTasks([dict.find(p=>p.id===id)],dict,'expert')[0];
 for(const id of ['rain-a','rain-b']){
  const t=task(id);
  assert.equal(t.kind,'type');assert.deepEqual(t.answers,['en regn']);assert.equal(t.hint,'article');
  assert.ok(L.checkTask(t,'en regn'));assert.ok(!L.checkTask(t,'regn'));
 }
 for(const id of ['tend-a','tend-b']){
  const t=task(id);
  assert.equal(t.hint,'infinitive');assert.ok(L.checkTask(t,'tænde'));assert.ok(L.checkTask(t,'at tænde'));
 }
 const plain=task('plain');assert.equal(plain.hint,undefined);assert.deepEqual(plain.answers,['sandsynlig']);
 // the hint is persisted with the session and validated on restore
 const session=L.makeSession([dict[1]],dict,{mode:'expert'});
 const catalog=Object.fromEntries(dict.map(p=>[p.id,p]));
 assert.equal(L.restoreSession(JSON.parse(JSON.stringify(session)),catalog).tasks[0].hint,'article');
 const bad=structuredClone(session);bad.tasks[0].hint='x';
 assert.equal(L.restoreSession(bad,catalog),null);
 // sentences are never given a form hint, even if they begin with "En"
 const sentence=entry('sentence','En kop kaffe, tak.','Чашку кофе, пожалуйста.');
 assert.equal(L.createTasks([sentence],[sentence,...pool],'expert')[0].hint,undefined);
});

// ---- cloze on function words ----
test('function words are recognised from word class or closed-class Danish form, never from the translated gloss',()=>{
 assert.equal(L.isFunctionWord({da:'fra',ru:'из; от; с'}),true);
 assert.equal(L.isFunctionWord({da:'jo',ru:'ведь; же'}),true);
 assert.equal(L.isFunctionWord({da:'foo',ru:'x',wordClass:'preposition'}),true);
 assert.equal(L.isFunctionWord({da:'konjunktion',ru:'союз'}),false);
 assert.equal(L.isFunctionWord({da:'konjunktion',ru:'сполучник'}),false);
 assert.equal(L.isFunctionWord({da:'tillid',ru:'доверие'}),false);
 assert.equal(L.isFunctionWord({da:'i dag',ru:'сегодня',wordClass:'phrase'}),false);
 assert.equal(L.isFunctionWord({da:'sol',ru:'солнце',wordClass:'noun'}),false);
});
test('adaptive recall of a function word is a translation, not a cloze built from one example sentence',()=>{
 const reviews=id=>({[id]:{box:1,due:0,seen:3,recognition:3,lastGrade:'recognition'}});
 const da={id:'fw-da',kind:'word',da:'da',ru:'ведь; же (усилительная частица)',exampleDa:'Det er da en god idé!',exampleRu:'Это же хорошая идея!'};
 const fra={id:'fw-fra',kind:'word',da:'fra',ru:'из; от; с',exampleDa:'Toget fra Aarhus kommer klokken ti.',exampleRu:'Поезд из Орхуса приходит в десять.'};
 for(const w of [da,fra]){
  const t=L.createTasks([w],[w,...pool],'auto',reviews(w.id))[0];
  assert.equal(t.kind,'type');assert.equal(t.prompt,w.ru);assert.deepEqual(t.options,[]);assert.ok(L.checkTask(t,w.da));
 }
 // a content word keeps its context, and an authored context stays typed (its translation fixes the meaning)
 const word={id:'cw',kind:'word',da:'tillid',ru:'доверие',exampleDa:'Jeg har tillid til mine kolleger.',exampleRu:'Я доверяю своим коллегам.'};
 assert.equal(L.createTasks([word],[word,...pool],'auto',reviews('cw'))[0].kind,'gap');
 const authored={...fra,id:'fw-authored',contextVariants:[{id:'ctx-fw-1',text:'Hun kommer ___ Aarhus.',answers:['fra'],completeDa:'Hun kommer fra Aarhus.',ru:'Она приезжает из Орхуса.'}]};
 assert.equal(L.createTasks([authored],[authored,...pool],'auto',reviews('fw-authored'))[0].kind,'gap');
});
