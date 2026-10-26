import test from 'node:test';
import assert from 'node:assert/strict';
import {lessonGroups,recommendLesson} from '../dist/lesson-navigation.mjs';
const lessons=[{id:'a',kind:'grammar',level:'A1'},{id:'b',kind:'grammar',level:'A1'},{id:'c',kind:'grammar',level:'A2'},{id:'d',kind:'conversation',level:'A2'}];
test('completed lessons fold separately even below mastery while new topics come first',()=>{
 const state={completed:{a:{best:40,attempts:1}},settings:{level:'A1'}};
 const group=lessonGroups(lessons.slice(0,2),state);
 assert.deepEqual(group.remaining.map(l=>l.id),['b']);assert.deepEqual(group.completed.map(l=>l.id),['a']);assert.equal(group.mastered,0);
 assert.equal(recommendLesson(lessons,state,{kind:'grammar',level:'A1'}).id,'b');
});
test('next route advances to the next level after mastery and never repeats a fully mastered route',()=>{
 const state={completed:{a:{best:100},b:{best:80}},settings:{level:'A1'}};
 assert.equal(recommendLesson(lessons,state,{kind:'grammar',level:'A1'}).id,'c');
 state.completed.c={best:90};assert.equal(recommendLesson(lessons,state,{kind:'grammar',level:'A1'}),null);
 assert.equal(recommendLesson(lessons,state,{kind:'conversation',level:'A2'}).id,'d');
});
test('unfinished mastery is offered for improvement after every topic has been attempted',()=>{
 const state={completed:{a:{best:60},b:{best:90}},settings:{level:'A1'}};
 assert.equal(recommendLesson(lessons,state,{kind:'grammar',level:'A1'}).id,'a');
 assert.deepEqual(lessonGroups([],state),{remaining:[],completed:[],mastered:0});
});
test('module order cannot skip the nearest level or prefer an attempted topic over a fresh one',()=>{
 const mixed=[{id:'a',kind:'grammar',level:'A1'},{id:'b',kind:'grammar',level:'A2'},{id:'z',kind:'grammar',level:'B1'},{id:'new-a2',kind:'grammar',level:'A2'}];
 const state={completed:{a:{best:100},b:{best:100}},settings:{level:'A1'}};
 assert.equal(recommendLesson(mixed,state).id,'new-a2');
 state.completed.b.best=40;assert.equal(recommendLesson(mixed,state).id,'new-a2');
});
test('all-mastered home offers completed topics instead of another new lesson',async()=>{
 const {renderView}=await import('../dist/views.mjs');const {createState}=await import('../dist/engine.mjs');const state=createState();
 const {lessons}=await import('../dist/course.mjs');for(const lesson of lessons)state.completed[lesson.id]={best:100,attempts:1};
 const html=renderView('learn',{state,next:null,session:null,due:[],todayXP:0,fileCount:0,memoryPlan:{items:[],newCount:0,newToday:0,newLimit:6}});
 assert.match(html,/Этот уровень закреплён/);assert.match(html,/class="path-row mastered"/);assert.doesNotMatch(html,/class="btn primary"[^>]*data-action="route-lesson"/);
});
