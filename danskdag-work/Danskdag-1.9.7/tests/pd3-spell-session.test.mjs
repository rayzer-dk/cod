import test from 'node:test';
import assert from 'node:assert/strict';
import {createState,validateState,finishSession} from '../dist/engine.mjs';
import {dictations} from '../dist/pd3-dictation-data.mjs';
import {getCatalog,getWordEntries,trainingPool} from '../dist/course.mjs';
import {recordSpell,spellId,SPELL_FREE_LISTENS} from '../dist/pd3-spell.mjs';
import {createTasks,makeSession,answerSession,advanceSession,selfCheckSession,checkTask,restoreSession,listenSession,clozeSession} from '../dist/learning.mjs';
import {recordAttempt,getReviewFor,practiceStage} from '../dist/memory.mjs';
import {exerciseView,hasAnswer,playsText} from '../dist/exercise.mjs';
import {relocalizeSession} from '../dist/language.mjs';
import {renderStudy} from '../dist/memory-view.mjs';

const SENT=dictations.find(d=>d.mode==='sentences');
const NOW=1790000000000,MIN=60000,DAY=86400000;
const ID0=spellId(SENT.id,0),ID1=spellId(SENT.id,1);
const SA=SENT.sentences[0].da;

function setup(){
  let state=createState();
  state=validateState(recordSpell(state,SENT.id,[{idx:0,words:['kaffen','kold']},{idx:1,words:['legede']}],NOW).state);
  const catalog=getCatalog(state);
  return {state,catalog,pool:trainingPool(state),items:[catalog[ID0],catalog[ID1]]};
}

/* ---------- tasks ---------- */

test('createTasks: a dictation card is a "listen and write" task with the whole sentence as the answer',()=>{
  const {items,pool}=setup();
  for(const mode of ['easy','mixed','expert','auto']){
    const [task]=createTasks([items[0]],pool,mode,{});
    assert.equal(task.kind,'dictate');assert.equal(task.dictMode,'listen');
    assert.deepEqual(task.answers,[SA]);assert.deepEqual(task.options,[]);assert.equal(task.prompt,'','the text is not shown');
    assert.equal(task.answerLang,'da');assert.equal(task.promptLang,'da');assert.equal(task.retry,false);
    assert.equal(task.stage,mode==='auto'?'recall':undefined);
  }
  assert.equal(createTasks([items[0]],pool,'auto',{},{voice:true})[0].dictMode,'listen');
});

test('createTasks: without a Danish voice the card is a cloze with the first problem word hidden',()=>{
  const {items,pool}=setup();
  const [task]=createTasks([items[0]],pool,'auto',{},{voice:false});
  assert.equal(task.kind,'dictate');assert.equal(task.dictMode,'cloze');
  assert.deepEqual(task.answers,['kaffen']);assert.equal(task.prompt,'Manden sagde, at ___ var kold i går.');
  assert.deepEqual(task.options,[]);
  assert.ok(!task.prompt.includes('kaffen'));
});

test('ordinary items are not affected by the new parameter',()=>{
  const catalog=getCatalog(createState());
  const word=Object.values(catalog).find(p=>p.kind==='word'&&p.verified);
  const pool=trainingPool(createState());
  for(const voice of [true,false,undefined]){
    const [task]=createTasks([word],pool,'easy',{},voice===undefined?{}:{voice});
    assert.notEqual(task.kind,'dictate');assert.equal(task.dictMode,undefined);
  }
});

test('checkTask: all words right is correct; case and punctuation do not matter; any wrong or missing word is not',()=>{
  const {items,pool}=setup();
  const [task]=createTasks([items[0]],pool,'auto',{});
  for(const ok of [SA,SA.toLowerCase(),SA.replace(/[.,]/g,''),'  '+SA.toUpperCase()+'  ',SA.replace(/ /g,'  ')])assert.equal(checkTask(task,ok),true,ok);
  for(const bad of ['',SA.replace('kaffen','kafen'),SA.replace('går','gaar'),SA.replace(' kold',''),SA+' ekstra','Manden sagde at kold var kaffen i går'])assert.equal(checkTask(task,bad),false,bad);
  assert.equal(checkTask(task,undefined),false);
  const [cloze]=createTasks([items[0]],pool,'auto',{},{voice:false});
  assert.equal(checkTask(cloze,'kaffen'),true);assert.equal(checkTask(cloze,'KAFFEN.'),true);assert.equal(checkTask(cloze,'kafen'),false);assert.equal(checkTask(cloze,SA),false,'the whole sentence is not the answer of a cloze');
});

/* ---------- sessions ---------- */

test('makeSession: a dictation card has no "meet the new card" screen and a play counter',()=>{
  const {items,pool,catalog}=setup();
  const word=Object.values(catalog).find(p=>p.kind==='word'&&p.verified);
  const session=makeSession([items[0],word],pool,{mode:'auto',studyIds:[items[0].id,word.id],voice:true});
  assert.deepEqual(session.studyIds,[word.id],'the sentence is never shown beforehand');
  assert.equal(session.plays,0);
  const only=makeSession([items[0]],pool,{mode:'auto',studyIds:[items[0].id]});
  assert.deepEqual(only.studyIds,[]);assert.equal(only.studyDone,true);
  assert.equal(practiceStage(undefined,items[0]),'recognition','the stage helper is not used for these cards');
});

test('answerSession: a dictation answer is an independent recall; a wrong one is missed and comes back once',()=>{
  const {items,pool}=setup();
  let session=makeSession(items,pool,{mode:'auto',voice:true});
  session=answerSession(session,SA);
  assert.equal(session.feedback,true);assert.deepEqual(session.outcomes[0],{itemId:ID0,correct:true,kind:'recall',helped:false,retry:false});
  assert.equal(session.correct,1);
  session=advanceSession(session);
  session=answerSession(session,'forkert');
  assert.equal(session.feedback,false);assert.deepEqual(session.missed,[ID1]);assert.equal(session.outcomes[1].kind,'recall');
  session=advanceSession(session);
  assert.equal(session.tasks.length,3);assert.equal(session.tasks[2].retry,true);assert.equal(session.tasks[2].kind,'dictate');assert.equal(session.tasks[2].dictMode,'listen');
  assert.equal(session.plays,0);
  assert.equal(selfCheckSession({...session,submitted:true,feedback:false,answer:'x',index:2},undefined).selfChecked,false,'no self check for a dictation');
});

test('listenings: the first is free, every further one is help; the counter is reset for the next card',()=>{
  const {items,pool}=setup();
  assert.equal(SPELL_FREE_LISTENS,1);
  let session=makeSession(items,pool,{mode:'auto',voice:true});
  session=listenSession(session);
  assert.equal(session.plays,1);assert.equal(session.helped,false);
  session=listenSession(session);
  assert.equal(session.plays,2);assert.equal(session.helped,true);
  session=answerSession(session,SA);
  assert.equal(session.outcomes[0].helped,true);
  assert.equal(listenSession(session),session,'after the answer nothing is counted');
  session=advanceSession(session);
  assert.equal(session.plays,0);assert.equal(session.helped,false);
  const cloze=makeSession(items,pool,{mode:'auto',voice:false});
  assert.equal(listenSession(cloze),cloze,'a cloze has nothing to listen to');
  const ordinary=makeSession([getCatalog(createState())['g-main-order-0']].filter(Boolean),pool,{mode:'easy'});
  if(ordinary.tasks.length)assert.equal(listenSession(ordinary),ordinary);
  assert.equal(playsText(0),'');assert.match(playsText(1),/Прослушано: 1$/);assert.match(playsText(2),/Прослушано: 2 · засчитано как подсказка/);
});

test('"no sound": the card becomes a cloze and counts as help; it is not possible once answered',()=>{
  const {items,pool,catalog}=setup();
  let session=makeSession(items,pool,{mode:'auto',voice:true});
  const cloze=clozeSession(session,catalog[ID0]);
  assert.equal(cloze.tasks[0].dictMode,'cloze');assert.deepEqual(cloze.tasks[0].answers,['kaffen']);assert.equal(cloze.helped,true);
  assert.equal(session.tasks[0].dictMode,'listen','the original is not changed');
  assert.equal(clozeSession(cloze,catalog[ID0]),cloze,'already a cloze');
  const answered=answerSession(session,SA);
  assert.equal(clozeSession(answered,catalog[ID0]),answered);
  const answeredCloze=answerSession(cloze,'kaffen');
  assert.equal(answeredCloze.feedback,true);assert.equal(answeredCloze.outcomes[0].helped,true);
  assert.equal(clozeSession(session,undefined),session);
});

test('restoreSession: an unfinished dictation session comes back as it was; broken ones are refused; old sessions are still valid',()=>{
  const {items,pool,catalog}=setup();
  let session=makeSession(items,pool,{mode:'auto',voice:true});
  session=listenSession(listenSession(session));session.answer='Manden sagde';
  const copy=()=>JSON.parse(JSON.stringify(session));
  assert.deepEqual(restoreSession(copy(),catalog,[]),session);
  const cloze=makeSession(items,pool,{mode:'auto',voice:false});
  assert.deepEqual(restoreSession(JSON.parse(JSON.stringify(cloze)),catalog,[]),cloze);
  const answered=answerSession(session,'x');
  assert.deepEqual(restoreSession(JSON.parse(JSON.stringify(answered)),catalog,[]),answered);
  // without the record (it was removed or the progress was replaced) the card does not exist, so the session is dropped
  assert.equal(restoreSession(copy(),getCatalog(createState()),[]),null);
  for(const [name,change] of [
    ['no mode',s=>{delete s.tasks[0].dictMode;}],['unknown mode',s=>{s.tasks[0].dictMode='write';}],
    ['mode on another kind',s=>{s.tasks[0].kind='type';}],['options on a dictation',s=>{s.tasks[0].options=['a','b'];}],
    ['two answers',s=>{s.tasks[0].answers=['a','b'];}],['russian answer language',s=>{s.tasks[0].answerLang='ru';}],
    ['cloze without a gap',s=>{s.tasks[0].dictMode='cloze';s.tasks[0].prompt='no gap';}],
    ['plays not a number',s=>{s.plays='2';}],['too many plays',s=>{s.plays=1000;}],['negative plays',s=>{s.plays=-1;}]
  ]){
    const broken=copy();change(broken);
    assert.equal(restoreSession(broken,catalog,[]),null,name);
  }
  const noPlays=copy();delete noPlays.plays;
  assert.equal(restoreSession(noPlays,catalog,[]).plays,0,'a session saved before the field existed');
  assert.equal(restoreSession(copy(),catalog,[session.id]),null,'an already counted session');
  // a session saved by 1.9.3 without any dictation card keeps working
  const word=Object.values(catalog).find(p=>p.kind==='word'&&p.verified);
  const old=makeSession([word],pool,{mode:'easy'});delete old.plays;
  assert.ok(restoreSession(JSON.parse(JSON.stringify(old)),catalog,[]));
});

test('changing the teaching language keeps a dictation task as it is (Danish only)',()=>{
  const {items,pool,catalog}=setup();
  const session=makeSession(items,pool,{mode:'auto',voice:true});
  session.language='ru';
  const next=relocalizeSession(session,'uk',value=>'UK:'+value,catalog);
  assert.equal(next.language,'uk');
  assert.deepEqual(next.tasks,session.tasks);
});

/* ---------- schedule ---------- */

test('FSRS: an independent right answer moves the card on; help or a mistake sends it back to 10 minutes',()=>{
  const {state,items,pool}=setup();
  const t=NOW+20*MIN;// the card is due
  const run=(answer,prepare=s=>s)=>{
    let session=prepare(makeSession([items[0]],pool,{mode:'auto',voice:true}));
    session=answerSession(session,answer);
    return recordAttempt(getReviewFor({id:ID0},state.reviews),session.outcomes.at(-1),t);
  };
  const right=run(SA);
  assert.equal(right.lastGrade,'recall');assert.equal(right.recall,1);assert.ok(right.due>t+DAY/2,'a day or more');
  assert.ok(right.memory.stability>state.reviews[ID0].memory.stability);
  const assisted=run(SA,s=>listenSession(listenSession(s)));
  assert.equal(assisted.lastGrade,'assisted');assert.equal(assisted.due,t+10*MIN);assert.equal(assisted.recall,0);
  assert.deepEqual(assisted.memory,state.reviews[ID0].memory,'help does not change the FSRS memory');
  const wrong=run(SA.replace('kaffen','kafen'));
  assert.equal(wrong.lastGrade,'miss');assert.equal(wrong.due,t+10*MIN);assert.equal(wrong.lapses,2);assert.equal(wrong.box,0);
  assert.ok(wrong.memory.stability<=state.reviews[ID0].memory.stability+1e-9||wrong.memory.stability<1);
  const giveUp=run('',s=>({...s,helped:true}));
  assert.equal(giveUp.lastGrade,'miss');assert.equal(giveUp.due,t+10*MIN);
  // the return of a missed card at the end of the session
  let session=makeSession([items[0]],pool,{mode:'auto',voice:true});
  session=advanceSession(answerSession(session,'x'));
  session=answerSession(session,SA);
  const retry=recordAttempt(wrong,session.outcomes.at(-1),t+MIN);
  assert.equal(retry.lastGrade,'assisted');assert.ok(retry.due<=t+MIN+10*MIN);
});

test('XP and the finished session use the ordinary path and count once',()=>{
  const {items,pool}=setup();
  let session=makeSession(items,pool,{mode:'auto',voice:true});
  session=advanceSession(answerSession(session,SA));session=advanceSession(answerSession(session,SENT.sentences[1].da));
  assert.equal(session.index,session.tasks.length);assert.equal(session.correct,2);
  const date=new Date('2026-10-26T10:00:00Z');
  const done=finishSession(createState(),{id:session.id,lessonId:null,correct:session.correct,total:session.initialCount,minutes:1},date);
  assert.equal(done.xp,20);
  assert.equal(finishSession(done,{id:session.id,lessonId:null,correct:2,total:2,minutes:1},date).xp,20,'the same session is not counted twice');
});

/* ---------- screens ---------- */

test('the listen screen does not show the sentence; the answer screen shows reference, marks and a translation button',()=>{
  const {items,pool,catalog}=setup();
  const state=createState();
  let session=makeSession([items[0]],pool,{mode:'auto',voice:true});
  const html=exerciseView(session,catalog,state);
  assert.doesNotMatch(html,/Manden sagde/);assert.doesNotMatch(html,/Мужчина сказал/,'no translation before the answer');
  assert.match(html,/Послушай и напиши/);assert.match(html,/data-action="listen"/);assert.match(html,/data-action="listen-slow"/);assert.match(html,/data-action="dictate-cloze"/);
  assert.match(html,/ДИКТАНТ-КАРТОЧКА/);
  assert.match(html,/id="answer-input"[^>]*lang="da"[^>]*autocomplete="off" autocapitalize="none" autocorrect="off" spellcheck="false" enterkeyhint="done"/);
  assert.equal((html.match(/data-action="letter"/g)||[]).length,3,'æ ø å');
  assert.equal(hasAnswer(session),false);
  assert.doesNotMatch(html,/data-action="self-check"/);
  const wrong=answerSession(session,'Manden sagde at kafen var kolt i gaar');
  const marked=exerciseView(wrong,catalog,state);
  assert.match(marked,/Запомним этот момент/);assert.match(marked,/Эталон/);assert.match(marked,/Твой ответ/);
  assert.match(marked,/class="pd3-d-misspelled">kaffen/);assert.match(marked,/<details class="hint dictation-translation"><summary>.*Показать перевод<\/summary><p>Мужчина сказал/);
  assert.match(marked,/Слушать ещё раз/);
  assert.doesNotMatch(marked,/data-action="self-check"/);
  const right=exerciseView(answerSession(session,SA),catalog,state);
  assert.match(right,/Верно\./);assert.doesNotMatch(right,/dictation-typed/);assert.doesNotMatch(right,/pd3-d-/);
  const helped=exerciseView(answerSession(listenSession(listenSession(session)),SA),catalog,state);
  assert.match(helped,/С подсказкой/);assert.match(helped,/Прослушано: 2 · засчитано как подсказка/);
});

test('the cloze screen shows the sentence with a gap and its translation, and no sound button before the answer',()=>{
  const {items,pool,catalog}=setup();
  const state=createState();
  const session=makeSession([items[0]],pool,{mode:'auto',voice:false});
  const html=exerciseView(session,catalog,state);
  assert.match(html,/Вставь пропущенное слово/);assert.match(html,/gap-slot/);assert.match(html,/Мужчина сказал/);
  assert.doesNotMatch(html,/data-action="listen"/);assert.doesNotMatch(html,/kaffen/);
  const wrong=exerciseView(answerSession(session,'kafen'),catalog,state);
  assert.match(wrong,/Пропущенное слово: <b lang="da">kaffen<\/b>/);assert.match(wrong,/Manden sagde, at kaffen var kold/);assert.match(wrong,/data-action="listen"/);
  assert.doesNotMatch(exerciseView(answerSession(session,'kaffen'),catalog,state),/Пропущенное слово/);
});

test('a dictation card is not offered as a new word to study, and the study screen would still render it',()=>{
  const {items,catalog}=setup();
  const session={title:'t',studyIds:[ID0]};
  assert.match(renderStudy(session,catalog),/Manden sagde/);
  assert.ok(getWordEntries(validateState(createState())).every(e=>e.kind!=='dictation'));
});
