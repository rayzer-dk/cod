import test from 'node:test';
import assert from 'node:assert/strict';
import {createState} from '../dist/engine.mjs';
import {createTasks,makeSession,restoreSession,checkTask} from '../dist/learning.mjs';
import {exerciseView} from '../dist/exercise.mjs';

const item={id:'dialogue-case',kind:'conversation',wordClass:'phrase',da:'Jeg når det ikke i dag, men jeg kan gøre det færdigt i morgen.',ru:'Я не успею сегодня, но могу закончить завтра.',note:'Nå det — успеть.',daAnswers:['Jeg når det ikke i dag, men jeg kan gøre det færdigt i morgen.','Jeg kan ikke nå det i dag, men jeg bliver færdig i morgen.'],dialogue:{situation:'Коллега спрашивает о сроке.',partnerDa:'Kan du blive færdig i dag?',partnerRu:'Ты можешь закончить сегодня?',goal:'Объясни, что сегодня не успеешь, но закончишь завтра.'}};
const pool=[item,...['Jeg ringer tilbage senere.','Det passer mig desværre ikke.','Kan vi flytte mødet?'].map((da,i)=>({...item,id:'other-'+i,da,daAnswers:[da]}))];
test('dialogue response tasks ask for Danish replies in every mode and preserve the communicative cue',()=>{
 for(const mode of ['easy','mixed','expert','auto']){
  const task=createTasks([item],pool,mode)[0];
  assert.equal(task.prompt,item.dialogue.goal);
  assert.equal(task.promptLang,'ru');assert.equal(task.answerLang,'da');
  assert.ok(checkTask(task,item.daAnswers[1]));
  if(mode==='expert')assert.equal(task.options.length,0);
  else assert.ok(task.options.includes(item.da));
 }
});
test('reply context and partner audio are visible without exposing the model before a typed answer',()=>{
 const session=makeSession([item],pool,{mode:'expert'}),html=exerciseView(session,{[item.id]:item},createState());
 assert.ok(html.includes(item.dialogue.situation));assert.ok(html.includes(item.dialogue.partnerDa));
 assert.ok(html.includes('data-text="'+item.dialogue.partnerDa+'"'));
 assert.ok(!html.includes(item.da));
 const answered=exerciseView({...session,submitted:true,feedback:true},{[item.id]:item},createState());
 assert.ok(answered.includes(item.da));assert.ok(answered.includes(item.ru));
});
test('reply sessions retain the cue and expected language after reopening',()=>{
 const original=makeSession([item],pool,{mode:'expert'}),restored=restoreSession(JSON.parse(JSON.stringify(original)),{[item.id]:item},[]);
 assert.ok(restored);assert.equal(restored.tasks[0].prompt,item.dialogue.goal);assert.equal(restored.tasks[0].answerLang,'da');
});
