import test from 'node:test';
import assert from 'node:assert/strict';
import {createState,validateState} from '../dist/engine.mjs';
import {lessonById,trainingPool,getCatalog} from '../dist/course.mjs';
import {makeSession,restoreSession} from '../dist/learning.mjs';
import {exerciseView,resultView} from '../dist/exercise.mjs';
const route=await import('../dist/learning-path.mjs').catch(()=>({}));
const labels=await import('../dist/word-class-labels.mjs').catch(()=>({}));
const lesson=(id,level='A1')=>({id,level,title:id,kind:'grammar',items:[]});
test('a beginner starts with greetings and advances in a stable visible order',()=>{
 assert.equal(typeof route.learningPath,'function');
 const lessons=[lesson('g-main-order'),lesson('hello'),lesson('basics-numbers-1'),lesson('g-nouns'),lesson('next-level','A2')],state=createState();
 const first=route.learningPath(lessons,state);assert.equal(first.next.id,'hello');assert.equal(first.total,4);assert.equal(first.completed,0);
 state.completed.hello={best:100,attempts:1};const second=route.learningPath(lessons,state);assert.equal(second.next.id,'basics-numbers-1');assert.equal(second.completed,1);assert.equal(second.mastered,1);assert.equal(second.position,2);
});
test('an attempted topic stays visible for consolidation and old unknown progress never counts as a lesson',()=>{
 const state=createState();state.completed={hello:{best:50,attempts:1},retired:{best:100,attempts:1}};
 const path=route.learningPath([lesson('hello'),lesson('g-nouns')],state);assert.equal(path.next.id,'hello');assert.equal(path.completed,1);assert.equal(path.mastered,0);assert.equal(path.total,2);
});
test('choosing a level scopes the ordered path without deleting another level',()=>{
 const state=createState();state.completed.hello={best:100,attempts:1};state.settings.level='B1';
 const path=route.learningPath([lesson('hello'),lesson('b1-topic','B1')],state);assert.equal(path.next.id,'b1-topic');assert.equal(path.total,1);assert.equal(state.completed.hello.best,100);
});
test('an optional profile name survives validation while old progress keeps its exact settings shape',()=>{
 const state=createState(),old=structuredClone(state);assert.equal(Object.hasOwn(validateState(old).settings,'name'),false);
 state.settings.name='  Володимир  ';assert.equal(validateState(state).settings.name,'Володимир');
 state.settings.name='';assert.equal(Object.hasOwn(validateState(state).settings,'name'),false);
 state.settings.name='a'.repeat(41);assert.throws(()=>validateState(state));state.settings.name='bad\nname';assert.throws(()=>validateState(state));
});
test('word classes show a learner-language name beside the Danish term',()=>{
 assert.equal(typeof labels.wordClassLabel,'function');
 for(const [id,da]of [['noun','substantiv'],['verb','verbum'],['adjective','adjektiv'],['adverb','adverbium'],['pronoun','pronomen'],['preposition','præposition']])assert.ok(labels.wordClassLabel(id).includes(da));
 assert.equal(labels.wordClassLabel(undefined),'');
});
test('class recognition does not disclose the class before answering in either mode',()=>{
 const state=createState(),lesson=lessonById['wc-noun'],pool=trainingPool(state),catalog=getCatalog(state);
 for(const mode of ['easy','expert']){
  const session=makeSession(lesson.items,pool,{mode,lessonId:lesson.id});
  assert.doesNotMatch(exerciseView(session,catalog,state),/class="word-class-name"/);
  session.submitted=true;assert.match(exerciseView(session,catalog,state),/class="word-class-name"/);
 }
});
test('guided progress survives reload and recommends the second route lesson',()=>{
 const state=createState(),lesson=lessonById.hello,catalog=getCatalog(state);
 const session=makeSession(lesson.items,trainingPool(state),{mode:'easy',lessonId:lesson.id});
 session.route=true;session.routeLevel='A1';
 const restored=restoreSession(JSON.parse(JSON.stringify(session)),catalog);
 assert.equal(restored.route,true);assert.equal(restored.routeLevel,'A1');
 state.completed.hello={best:100,attempts:1};
 assert.match(resultView(restored,state,[]),/data-action="next-route"[^>]*data-id="basics-numbers-1"/);
});
