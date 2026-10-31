import test from 'node:test';
import assert from 'node:assert/strict';
import {existsSync} from 'node:fs';
import {createState} from '../dist/engine.mjs';
import {lessons,importedItems,getCatalog,trainingPool} from '../dist/course.mjs';
import {vocabulary} from '../dist/vocabulary.mjs';
import {createTasks,checkTask,isFunctionWord} from '../dist/learning.mjs';
import {illustrationFor,renderIllustration} from '../dist/illustrations.mjs';

test('every verified imported word has an authored context and memory association while source IDs survive',()=>{
 assert.equal(importedItems.length,vocabulary.length);
 for(const raw of vocabulary){
  const item=importedItems.find(p=>p.id===raw.id);assert.ok(item);
  assert.equal(item.original,raw.original);
  if(raw.verified){assert.ok(item.exampleDa?.trim(),raw.da);assert.ok(item.exampleRu?.trim(),raw.da);assert.ok(item.association?.trim(),raw.da);}
 }
 const items=importedItems.filter(p=>p.verified),reviews=Object.fromEntries(items.map(p=>[p.id,{box:1,due:0,seen:2,recognition:2}]));
 // A function word (da, jo, fra...) fits several gaps, so its recall is a translation, not a one-sentence cloze.
 const byId=Object.fromEntries(items.map(p=>[p.id,p]));
 for(const task of createTasks(items,trainingPool(createState()),'auto',reviews)){
  if(isFunctionWord(byId[task.itemId]))assert.equal(task.kind,'type',task.itemId);else assert.ok(task.completeDa,task.itemId);
 }
});
test('new advanced and spoken lessons expand practice without replacing old identities',()=>{
 assert.ok(lessons.filter(l=>l.id.startsWith('g-')&&l.level==='B2').length>=14);
 assert.ok(lessons.filter(l=>l.id.startsWith('g-')&&l.level==='C1').length>=14);
 assert.ok(lessons.filter(l=>l.kind==='conversation').length>=16);
 assert.ok(lessons.some(l=>l.kind==='visual'));
 for(const lesson of lessons){assert.equal(new Set(lesson.items.map(p=>p.id)).size,lesson.items.length);}
 const state=createState(),catalog=getCatalog(state),pool=trainingPool(state);
 for(const lesson of lessons)for(const mode of ['easy','mixed','expert'])for(const task of createTasks(lesson.items.map(p=>catalog[p.id]),pool,mode))assert.ok(checkTask(task,task.answers[0]),task.itemId);
});
test('illustrated vocabulary uses real local assets and does not guess pictures for ambiguous senses',()=>{
 const picture=illustrationFor({da:'en metalfjeder',ru:'металлическая пружина',kind:'word',verified:true});
 assert.equal(picture.src,'/illustrations/spring.svg');assert.ok(existsSync(new URL('../dist'+picture.src,import.meta.url)));
 assert.equal(illustrationFor({da:'fyr',ru:'парень',kind:'meaning',verified:true}),null);
 assert.equal(illustrationFor({da:'en bog',ru:'книга',kind:'word',verified:false}),null);
 for(const item of Object.values(getCatalog(createState())).filter(p=>p.visual))assert.ok(illustrationFor(item),item.da);
 assert.ok(renderIllustration({da:'en bog',ru:'<книга>',kind:'word'}).includes('&lt;книга&gt;'));
});

test('advanced gaps accept taught grammatical alternatives but reject a wrong connector',()=>{
 const pool=trainingPool(createState());
 for(const [id,variants,wrong] of [['g-b2-extra-relative-1',['der','som'],'hvis'],['g-c1-extra-precision-1',['hvorvidt','om'],'fordi']]){
  const item=pool.find(p=>p.id===id),task=createTasks([item],pool,'expert')[0];
  assert.equal(task.kind,'gap');
  for(const answer of variants)assert.ok(checkTask(task,answer),`${id}: ${answer}`);
  assert.equal(checkTask(task,wrong),false);
 }
});
