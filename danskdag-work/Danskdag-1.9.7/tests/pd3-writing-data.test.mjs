import test from 'node:test';
import assert from 'node:assert/strict';
import {writingEmail,writingTask,writingCriteria,connectors} from '../dist/pd3-writing-data.mjs';

const cyrillic=/[А-Яа-яЁёІіЇїЄєҐґ]/;
const idPattern=/^[a-z0-9-]{1,60}$/;
const words=text=>text.split(/\s+/).filter(token=>/[\p{L}\p{N}]/u.test(token)).length;
const isText=value=>typeof value==='string'&&value.trim().length>0;
const phraseOk=list=>Array.isArray(list)&&list.length>=8&&list.length<=10&&list.every(p=>isText(p.da)&&isText(p.ru)&&!cyrillic.test(p.da)&&cyrillic.test(p.ru));
const russianList=(list,min,max)=>Array.isArray(list)&&list.length>=min&&list.length<=max&&list.every(item=>isText(item)&&cyrillic.test(item));

test('writing collections have the expected number of tasks and unique ids',()=>{
  assert.equal(writingEmail.length,6);
  assert.equal(writingTask.length,6);
  assert.equal(writingCriteria.length,4);
  for(const list of [writingEmail,writingTask,writingCriteria]){
    const ids=list.map(item=>item.id);
    assert.equal(new Set(ids).size,ids.length);
    for(const id of ids)assert.match(id,idPattern);
  }
});

test('e-mail tasks follow the contract',()=>{
  for(const e of writingEmail){
    assert.ok(['B1','B2'].includes(e.level),e.id);
    assert.ok(isText(e.topic)&&cyrillic.test(e.topic),e.id);
    for(const key of ['title','prompt','modelAnswer'])assert.ok(isText(e[key])&&!cyrillic.test(e[key]),e.id+' '+key);
    const promptWords=words(e.prompt);
    assert.ok(promptWords>=80&&promptWords<=140,e.id+' prompt words '+promptWords);
    assert.ok(Array.isArray(e.requirements)&&e.requirements.length>=3&&e.requirements.length<=4,e.id);
    assert.ok(e.requirements.every(r=>isText(r)&&!cyrillic.test(r)),e.id);
    assert.equal(e.minWords,100);
    assert.equal(e.maxWords,160);
    const n=words(e.modelAnswer);
    assert.ok(n>=e.minWords&&n<=e.maxWords,e.id+' model answer words '+n);
    assert.ok(russianList(e.checklist,5,7),e.id+' checklist');
    assert.ok(phraseOk(e.phrases),e.id+' phrases');
  }
});

test('essay tasks offer two different options and complete model answers',()=>{
  for(const t of writingTask){
    assert.ok(['B1','B2'].includes(t.level),t.id);
    assert.ok(isText(t.topic)&&cyrillic.test(t.topic),t.id);
    assert.ok(isText(t.title)&&!cyrillic.test(t.title),t.id);
    assert.equal(t.minWords,200);
    assert.equal(t.maxWords,300);
    assert.deepEqual(t.options.map(o=>o.key),['A','B']);
    assert.notEqual(t.options[0].prompt,t.options[1].prompt);
    assert.deepEqual(Object.keys(t.modelAnswers).sort(),['A','B']);
    for(const option of t.options){
      assert.ok(isText(option.prompt)&&!cyrillic.test(option.prompt),t.id+option.key);
      assert.ok(option.requirements.length>=3&&option.requirements.length<=4,t.id+option.key);
      assert.ok(option.requirements.every(r=>isText(r)&&!cyrillic.test(r)),t.id+option.key);
      const answer=t.modelAnswers[option.key];
      assert.ok(isText(answer)&&!cyrillic.test(answer),t.id+option.key);
      const n=words(answer);
      assert.ok(n>=t.minWords&&n<=t.maxWords,t.id+option.key+' model answer words '+n);
    }
    assert.ok(russianList(t.checklist,5,7),t.id+' checklist');
    assert.ok(phraseOk(t.phrases),t.id+' phrases');
  }
});

test('where the last requirement must be at least half of the text, the model answer obeys it',()=>{
  const marker='Efter min mening';
  const heavy=[['task-hjemmearbejde','A'],['task-boern-skole','A']];
  for(const [id,key] of heavy){
    const task=writingTask.find(t=>t.id===id);
    const option=task.options.find(o=>o.key===key);
    assert.match(option.requirements.at(-1),/mindst halvdelen/);
    const answer=task.modelAnswers[key];
    const index=answer.indexOf(marker);
    assert.ok(index>0,id);
    const tail=answer.slice(index).replace(/\n\nMed venlig hilsen[\s\S]*$/,'');
    assert.ok(words(tail)*2>=words(answer),id+' last part '+words(tail)+' of '+words(answer));
  }
});

test('writing criteria cover four axes with Russian descriptors',()=>{
  assert.deepEqual(writingCriteria.map(c=>c.id),['content','vocabulary','grammar','coherence']);
  for(const c of writingCriteria){
    assert.ok(isText(c.title)&&cyrillic.test(c.title),c.id);
    assert.ok(russianList(c.descriptors,3,5),c.id);
  }
});

test('connectors are lowercase, unique Danish words and phrases',()=>{
  assert.ok(connectors.length>=40);
  assert.equal(new Set(connectors).size,connectors.length);
  for(const c of connectors){
    assert.ok(isText(c),c);
    assert.equal(c,c.toLowerCase());
    assert.equal(c,c.trim());
    assert.ok(!cyrillic.test(c),c);
  }
  for(const needed of ['og','men','fordi','selvom','derfor','desuden','imidlertid','hvis','mens','så','dog','alligevel','endvidere','med andre ord','til sidst','først og fremmest','på den ene side','på den anden side'])assert.ok(connectors.includes(needed),needed);
});
