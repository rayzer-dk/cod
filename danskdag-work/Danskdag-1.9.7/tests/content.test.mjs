import test from 'node:test';
import assert from 'node:assert/strict';
import {lessons,phrases,grammar} from '../dist/content.mjs';
import {isCorrect} from '../dist/engine.mjs';

test('all twelve lessons have unique identities and six complete exercises',()=>{
 assert.equal(lessons.length,12);assert.equal(phrases.length,72);
 assert.equal(new Set(phrases.map(p=>p.id)).size,72);
 assert.equal(new Set(lessons.map(l=>l.id)).size,12);
 for(const l of lessons){
  assert.equal(l.items.length,6);
  assert.ok(['A1','A2','B1'].includes(l.level));
  for(const p of l.items){
   assert.ok(p.da.length&&p.ru.length&&p.note.length);
   assert.equal(p.lessonId,l.id);
   assert.equal(isCorrect(p.da,p.daAnswers),true);
   assert.equal(isCorrect(p.ru,p.ruAnswers),true);
   assert.equal(isCorrect(p.da.replace(/[.!?]/g,''),p.daAnswers),true);
  }
 }
 for(const level of ['A1','A2','B1']){
  assert.equal(lessons.filter(l=>l.level===level).length,4);
  assert.equal(grammar.filter(g=>g.level===level).length,2);
 }
});
