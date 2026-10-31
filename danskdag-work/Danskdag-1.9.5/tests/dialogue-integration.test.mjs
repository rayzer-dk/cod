import test from 'node:test';
import assert from 'node:assert/strict';
import {lessons,getCatalog,trainingPool} from '../dist/course.mjs';
import {createState} from '../dist/engine.mjs';
import {createTasks,checkTask,makeSession} from '../dist/learning.mjs';
import {resultView} from '../dist/exercise.mjs';

test('advanced dialogue lessons are fully reachable and every mode accepts each authored reply',()=>{
 const scenarios=lessons.filter(l=>l.roleplay),state=createState(),catalog=getCatalog(state),pool=trainingPool(state);
 assert.equal(scenarios.length,12);
 for(const lesson of scenarios){
  assert.equal(makeSession(lesson.items,pool,{lessonId:lesson.id}).initialCount,lesson.items.length);
  for(const mode of ['easy','mixed','expert'])for(const task of createTasks(lesson.items.map(p=>catalog[p.id]),pool,mode)){
   assert.equal(task.answerLang,'da');assert.equal(task.prompt,catalog[task.itemId].dialogue.goal);
   for(const reply of catalog[task.itemId].daAnswers)assert.ok(checkTask(task,reply));
   if(task.options.length)assert.equal(task.options.filter(v=>checkTask(task,v)).length,1);
  }
 }
});
test('a completed roleplay recommends another roleplay and keeps old completion identities',()=>{
 const scenarios=lessons.filter(l=>l.roleplay),first=scenarios.find(l=>l.level==='B2');
 assert.ok(first);
 const state=createState();state.completed[first.id]={best:100,attempts:1};state.completed['g-a1-v2']={best:100,attempts:2};
 const session=makeSession(first.items,trainingPool(state),{lessonId:first.id,mode:'expert'});session.correct=session.initialCount;
 const html=resultView(session,state,[]);
 assert.ok(/data-action="next-lesson"[^>]*data-id="dialogue-/.test(html));
 assert.equal(state.completed['g-a1-v2'].attempts,2);
});
