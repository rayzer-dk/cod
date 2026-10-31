import test from 'node:test';
import assert from 'node:assert/strict';
import {oralMonologue,oralInterview,oralInteraction,oralDiscussion,oralPhrases,oralCriteria} from '../dist/pd3-oral-data.mjs';

const cyrillic=/[А-Яа-яЁёІіЇїЄєҐґ]/;
const idPattern=/^[a-z0-9-]{1,60}$/;
const isText=value=>typeof value==='string'&&value.trim().length>0;
const danish=value=>isText(value)&&!cyrillic.test(value);
const russian=value=>isText(value)&&cyrillic.test(value);
const danishList=(list,min,max)=>Array.isArray(list)&&list.length>=min&&list.length<=max&&list.every(danish);
const pairOk=p=>danish(p.da)&&russian(p.ru);

test('oral collections have the expected sizes and unique ids',()=>{
  assert.equal(oralMonologue.length,10);
  assert.equal(oralInterview.length,8);
  assert.equal(oralInteraction.length,8);
  assert.equal(oralDiscussion.length,8);
  assert.equal(oralCriteria.length,6);
  for(const list of [oralMonologue,oralInterview,oralInteraction,oralDiscussion,oralCriteria]){
    const ids=list.map(item=>item.id);
    assert.equal(new Set(ids).size,ids.length);
    for(const id of ids)assert.match(id,idPattern);
  }
});

test('monologue cards follow the contract',()=>{
  for(const m of oralMonologue){
    assert.ok(russian(m.topic),m.id);
    assert.ok(danish(m.title),m.id);
    assert.ok(danishList(m.prompts,4,5),m.id+' prompts');
    assert.ok(danishList(m.keywords,8,12),m.id+' keywords');
    assert.equal(new Set(m.keywords).size,m.keywords.length,m.id);
    assert.ok(russian(m.hint),m.id+' hint');
  }
});

test('interview sets have 6-8 questions and three follow-ups',()=>{
  for(const i of oralInterview){
    assert.ok(russian(i.theme),i.id);
    assert.ok(danish(i.title),i.id);
    assert.ok(danishList(i.questions,6,8),i.id+' questions');
    assert.ok(i.questions.every(q=>q.endsWith('?')),i.id);
    assert.equal(new Set(i.questions).size,i.questions.length,i.id);
    assert.ok(danishList(i.followUps,3,3),i.id+' followUps');
  }
});

test('interaction scenarios follow the contract',()=>{
  for(const x of oralInteraction){
    assert.ok(danish(x.title),x.id);
    assert.ok(russian(x.situation),x.id);
    assert.ok(russian(x.yourRole),x.id);
    assert.ok(danishList(x.tasks,3,5),x.id+' tasks');
    assert.ok(Array.isArray(x.partner)&&x.partner.length>=5&&x.partner.length<=8,x.id+' partner');
    assert.ok(x.partner.every(pairOk),x.id);
    assert.ok(x.partner.every(p=>/^[\p{L} .,!?;:'’"-]+$/u.test(p.da)),x.id+' speakable partner text');
  }
});

test('discussion cards have arguments on both sides and 8-10 phrases',()=>{
  for(const d of oralDiscussion){
    assert.ok(danish(d.statement)&&d.statement.length<=160,d.id);
    assert.ok(danishList(d.pro,3,5),d.id+' pro');
    assert.ok(danishList(d.contra,3,5),d.id+' contra');
    assert.ok(Array.isArray(d.phrases)&&d.phrases.length>=8&&d.phrases.length<=10,d.id+' phrases');
    assert.ok(d.phrases.every(pairOk),d.id);
    assert.equal(new Set(d.phrases.map(p=>p.da)).size,d.phrases.length,d.id);
  }
});

test('phrase bank has Russian group names and more than 60 unique phrases',()=>{
  const all=[];
  for(const group of oralPhrases){
    assert.ok(russian(group.group));
    assert.ok(group.items.length>=5,group.group);
    assert.ok(group.items.every(pairOk),group.group);
    all.push(...group.items.map(p=>p.da));
  }
  assert.ok(all.length>60,'phrases '+all.length);
  assert.equal(new Set(all).size,all.length);
});

test('self-assessment covers the six axes',()=>{
  assert.deepEqual(oralCriteria.map(c=>c.id),['content','vocabulary','grammar','fluency','pronunciation','interaction']);
  for(const c of oralCriteria){
    assert.ok(russian(c.title),c.id);
    assert.ok(Array.isArray(c.descriptors)&&c.descriptors.length>=3&&c.descriptors.every(russian),c.id);
  }
});
