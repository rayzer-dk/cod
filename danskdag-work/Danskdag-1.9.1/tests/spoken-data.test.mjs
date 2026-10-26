import test from 'node:test';
import assert from 'node:assert/strict';
import {informalExpressions} from '../dist/patterns-data.mjs';
import {normalize} from '../dist/engine.mjs';
import {createTasks,checkTask} from '../dist/learning.mjs';

// A missing catalogue, incomplete translation, duplicate identity or reduced spelling
// in the answer/TTS field would make this reference unsafe to consume.
let catalogue;
try { catalogue = await import('../dist/spoken-data.mjs'); }
catch (error) { if (error.code !== 'ERR_MODULE_NOT_FOUND') throw error; }

test('spoken catalogue supplies complete, distinct standard-form conversation entries',()=>{
  assert.ok(catalogue,'spoken-data.mjs must supply the new conversation catalogue');
  const {spokenCategories,spokenEntries}=catalogue;
  assert.ok(spokenEntries.length>=80 && spokenEntries.length<=100);
  assert.ok(spokenCategories.length>=6);
  assert.equal(new Set(spokenCategories.map(c=>c.id)).size,spokenCategories.length);
  assert.equal(new Set(spokenEntries.map(e=>e.id)).size,spokenEntries.length);
  assert.equal(new Set(spokenEntries.map(e=>normalize(e.da))).size,spokenEntries.length);
  for(const category of spokenCategories){
    assert.ok(category.title?.trim());
    assert.ok(spokenEntries.some(e=>e.category===category.id),category.id);
  }
  for(const entry of spokenEntries){
    assert.match(entry.id,/^spoken-[a-z0-9-]+$/);
    assert.ok(spokenCategories.some(c=>c.id===entry.category),entry.id);
    for(const key of ['da','ru','exampleDa','exampleRu','note'])assert.ok(entry[key]?.trim(),`${entry.id}: ${key}`);
    assert.equal(entry.wordClass,'phrase');
    assert.equal(entry.source,'spoken');
    assert.equal(entry.kind,'word');
    assert.equal(entry.verified,true);
    assert.ok(['A1','A2','B1','B2'].includes(entry.level),entry.id);
    assert.ok(['neutral','informal'].includes(entry.register),entry.id);
    assert.doesNotMatch(entry.da,/\b(?:hva|ku|ska|ikk|ha|gi)['’]|så['’]n/iu,entry.id);
    if(entry.heard){
      assert.notEqual(entry.heard,entry.da,entry.id);
      assert.match(entry.note,/написание|запис|редукц|сокращ/iu,entry.id);
    }
  }
});

test('standard conversation entries can become ordinary bilingual practice tasks',()=>{
  assert.ok(catalogue,'spoken-data.mjs must exist');
  const items=catalogue.spokenEntries;
  const tasks=createTasks(items,items,'expert',{});
  assert.equal(tasks.length,items.length);
  for(const task of tasks){
    const entry=items.find(e=>e.id===task.itemId);
    assert.ok(checkTask(task,task.answers[0]),entry.id);
  }
});

test('extra informal comprehension stays separate, contextual and nonduplicative',()=>{
  assert.ok(catalogue,'spoken-data.mjs must exist');
  const {extraInformal,spokenEntries}=catalogue;
  assert.ok(extraInformal.length>=15 && extraInformal.length<=20);
  const oldForms=new Set(informalExpressions.map(e=>normalize(e.da)));
  assert.equal(new Set(extraInformal.map(e=>e.id)).size,extraInformal.length);
  assert.equal(new Set(extraInformal.map(e=>normalize(e.da))).size,extraInformal.length);
  for(const entry of extraInformal){
    for(const key of ['id','da','ru','register','note','exampleDa','exampleRu','neutral'])assert.ok(entry[key]?.trim(),`${entry.id}: ${key}`);
    assert.ok(['mild','moderate','strong'].includes(entry.strength));
    assert.ok(!oldForms.has(normalize(entry.da)),entry.da);
    assert.ok(!spokenEntries.some(e=>e.id===entry.id || normalize(e.da)===normalize(entry.da)),entry.id);
  }
});
