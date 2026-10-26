import test from 'node:test';
import assert from 'node:assert/strict';
import {patternLessons,particleFamilies,informalExpressions} from '../dist/patterns-data.mjs';
import {isCorrect,normalize} from '../dist/engine.mjs';
import {createTasks,checkTask} from '../dist/learning.mjs';

test('patterns add ten complete lessons with stable unique identities',()=>{
  assert.equal(patternLessons.length,10);
  assert.equal(patternLessons.filter(l=>l.kind==='grammar').length,2);
  assert.equal(patternLessons.filter(l=>l.kind==='pattern').length,8);
  const ids=[];
  for(const lesson of patternLessons){
    ids.push(lesson.id);
    assert.match(lesson.id,/^pat-[a-z-]+$/);
    assert.ok(['A1','A2','B1','B2'].includes(lesson.level));
    for(const key of ['title','subtitle','rule','icon','color'])assert.ok(lesson[key]?.trim(),`${lesson.id}: ${key}`);
    assert.equal(lesson.items.length,6);
    for(const item of lesson.items){
      ids.push(item.id);
      assert.equal(item.lessonId,lesson.id);
      assert.ok(item.id.startsWith(`${lesson.id}-`));
      for(const key of ['da','ru','note'])assert.ok(item[key]?.trim(),`${item.id}: ${key}`);
      assert.ok(isCorrect(item.da,item.daAnswers));
      assert.ok(isCorrect(item.ru,item.ruAnswers));
    }
  }
  assert.equal(ids.length,new Set(ids).size);
  assert.equal(new Set(patternLessons.flatMap(l=>l.items.map(i=>normalize(i.da)))).size,60);
});

test('contextual choices reconstruct the sentence and have one accepted option',()=>{
  for(const item of patternLessons.flatMap(l=>l.items)){
    assert.equal(item.type,'gap');
    assert.equal((item.gap.text.match(/___/g)||[]).length,1,item.id);
    assert.equal(item.gap.answers.length,1,item.id);
    assert.equal(item.gap.options.length,4,item.id);
    assert.equal(new Set(item.gap.options.map(normalize)).size,4,item.id);
    assert.equal(item.gap.options.filter(o=>isCorrect(o,item.gap.answers)).length,1,item.id);
    assert.ok(isCorrect(item.gap.text.replace('___',item.gap.answers[0]),item.daAnswers),item.id);
  }
});

test('pattern gaps remain answerable in every supported study mode',()=>{
  const items=patternLessons.flatMap(l=>l.items);
  for(const mode of ['easy','mixed','expert','auto']){
    const tasks=createTasks(items,items,mode,{});
    assert.equal(tasks.length,60);
    for(const task of tasks){
      const item=items.find(i=>i.id===task.itemId);
      assert.equal(task.kind,'gap');
      assert.equal(task.prompt,item.gap.text);
      assert.ok(checkTask(task,item.gap.answers[0]));
      if(mode!=='expert')assert.ok(task.options.includes(item.gap.answers[0]));
    }
  }
});

test('twenty reference families compare whole constructions with original bilingual examples',()=>{
  assert.equal(particleFamilies.length,20);
  assert.equal(new Set(particleFamilies.map(f=>f.id)).size,20);
  for(const family of particleFamilies){
    for(const key of ['id','base','ru'])assert.ok(family[key]?.trim());
    assert.ok(family.words.length>=3);
    assert.equal(new Set(family.words.map(w=>normalize(w.da))).size,family.words.length,family.id);
    for(const word of family.words){
      for(const key of ['da','ru','exampleDa','exampleRu','note'])assert.ok(word[key]?.trim(),`${family.id}: ${key}`);
    }
  }
  const forms=new Set(particleFamilies.flatMap(f=>f.words.map(w=>w.da)));
  for(const form of ['give','give op','give ud','afgive','finde ud af','holde af','holde på','holde op med','lægge på','tage af','ankomme','komme an på','forandre'])assert.ok(forms.has(form),form);
});

test('informal comprehension is separate, graded and includes neutral alternatives',()=>{
  assert.equal(informalExpressions.length,12);
  assert.equal(new Set(informalExpressions.map(e=>e.id)).size,12);
  assert.deepEqual(new Set(informalExpressions.map(e=>e.strength)),new Set(['mild','moderate','strong']));
  for(const entry of informalExpressions){
    for(const key of ['id','da','ru','register','note','neutral','exampleDa','exampleRu'])assert.ok(entry[key]?.trim(),`${entry.id}: ${key}`);
    assert.ok(!patternLessons.some(l=>l.items.some(i=>i.id===entry.id)));
  }
});
