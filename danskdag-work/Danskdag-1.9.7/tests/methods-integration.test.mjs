import test from 'node:test';
import assert from 'node:assert/strict';
import {createState,validateState,DAY} from '../dist/engine.mjs';
import {recordAttempt,memorySummary} from '../dist/memory.mjs';
import {createTasks,makeSession,answerSession,restoreSession} from '../dist/learning.mjs';
import {getCatalog,getWordEntries} from '../dist/course.mjs';
import {learningContexts} from '../dist/learning-contexts.mjs';
const now=Date.parse('2026-10-25T10:00:00Z');
const recall={correct:true,kind:'recall',helped:false,retry:false,contextId:'ctx-a'};
const variants=[{id:'ctx-a',text:'Jeg har en ___.',answers:['bil'],completeDa:'Jeg har en bil.',ru:'У меня есть машина.'},{id:'ctx-b',text:'Min ___ er rød.',answers:['bil'],completeDa:'Min bil er rød.',ru:'Моя машина красная.'}];
const item={id:'a',ids:['a'],kind:'word',da:'en bil',ru:'машина',verified:true,contextVariants:variants};
test('adaptive state and selected voice survive export and reject corrupt numeric fields',()=>{
 const state=createState();state.settings.voiceUri='Danish voice';state.reviews.a={box:1,due:now+DAY,seen:1,memory:{stability:2.3065,difficulty:5,lastReview:now},contextIndex:1,contextSuccesses:{'ctx-a':now}};
 assert.deepEqual(validateState(JSON.parse(JSON.stringify(state))).reviews.a,state.reviews.a);assert.equal(validateState(state).settings.voiceUri,'Danish voice');
 for(const stability of [NaN,-1,Infinity,0])assert.throws(()=>validateState({...state,reviews:{a:{...state.reviews.a,memory:{...state.reviews.a.memory,stability}}}}));
 const legacy=createState();delete legacy.settings.voiceUri;assert.equal(validateState(legacy).settings.voiceUri,'');
});
test('scheduled context retrieval rotates context and premature practice cannot increase evidence',()=>{
 const first=recordAttempt(undefined,recall,now);assert.equal(first.contextIndex,1);assert.equal(first.memory.lastReview,now);
 const early=recordAttempt(first,{...recall,contextId:'ctx-b'},now+DAY);assert.deepEqual(early.memory,first.memory);assert.deepEqual(early.contextSuccesses,first.contextSuccesses);assert.equal(early.contextIndex,1);
 const next=recordAttempt(first,{...recall,contextId:'ctx-b'},first.due);assert.equal(next.contextIndex,2);assert.deepEqual(Object.keys(next.contextSuccesses).sort(),['ctx-a','ctx-b']);
 const state=createState();state.reviews.a=next;assert.equal(memorySummary([item],state,first.due).transferred,1);
 for(const extra of [{helped:true},{retry:true},{kind:'recognition'}]){const result=recordAttempt(first,{...recall,contextId:'ctx-b',...extra},first.due);assert.deepEqual(result.contextSuccesses,first.contextSuccesses);}
});
test('new sentence contexts are used in recall and survive a paused session',()=>{
 const reviews={a:{box:1,due:now,seen:2,lastGrade:'recall',recall:1,contextIndex:1}};
 const task=createTasks([item],[item],'auto',reviews)[0];assert.equal(task.contextId,'ctx-b');assert.equal(task.prompt,'Min ___ er rød.');assert.equal(task.completeDa,'Min bil er rød.');assert.deepEqual(task.options,[]);
 const session=makeSession([item],[item],{mode:'auto',reviews});const answered=answerSession(session,'bil');assert.equal(answered.outcomes[0].contextId,'ctx-b');
 assert.equal(restoreSession(JSON.parse(JSON.stringify(answered)),{a:item}).tasks[0].contextId,'ctx-b');
});
test('all context sets reach both the catalogue and deduplicated memory plan',()=>{
 const state=createState(),catalog=getCatalog(state),entries=getWordEntries(state);
 for(const [id,contexts] of Object.entries(learningContexts)){
  assert.deepEqual(catalog[id].contextVariants,contexts);
  const entry=entries.find(p=>p.ids.includes(id));assert.deepEqual(entry.contextVariants,contexts);
  for(let contextIndex=0;contextIndex<2;contextIndex++){
   const task=createTasks([entry],entries,'auto',{[entry.id]:{box:1,due:now,seen:2,recall:1,lastGrade:'recall',contextIndex}})[0];
   assert.equal(task.contextId,contexts[contextIndex].id);assert.equal(task.completeDa,contexts[contextIndex].completeDa);
  }
 }
});
test('a lapse lowers existing stability and legacy migration waits for a scheduled attempt',()=>{
 const first=recordAttempt(undefined,recall,now),passed=recordAttempt(first,recall,first.due);
 const failed=recordAttempt(passed,{...recall,correct:false},passed.due);assert.ok(failed.memory.stability<passed.memory.stability);assert.equal(failed.due,passed.due+600000);
 const retry=recordAttempt(failed,{...recall,retry:true},passed.due+30000);assert.deepEqual(retry.memory,failed.memory);
 const legacy={box:4,due:now+7*DAY,seen:10};assert.equal(recordAttempt(legacy,recall,now).memory,undefined);
 const migrated=recordAttempt(legacy,recall,legacy.due);assert.ok(migrated.memory.stability>0);assert.equal(migrated.lastRecallAt,legacy.due);
});
