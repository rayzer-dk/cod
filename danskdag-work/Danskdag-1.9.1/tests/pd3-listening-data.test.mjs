import test from 'node:test';
import assert from 'node:assert/strict';
import {listening} from '../dist/pd3-listening-data.mjs';

const cyrillic=/[А-Яа-яЁёІіЇїЄєҐґ]/;
const idPattern=/^[a-z0-9-]{1,60}$/;
const speakable=/^[\p{L} .,!?;:'’"-]+$/u;
const words=text=>text.split(/\s+/).filter(token=>/\p{L}/u.test(token)).length;
const isText=value=>typeof value==='string'&&value.trim().length>0;

test('listening collection has eight fragments with unique ids',()=>{
  assert.equal(listening.length,8);
  const ids=listening.map(item=>item.id);
  assert.equal(new Set(ids).size,ids.length);
  for(const id of ids)assert.match(id,idPattern);
  assert.equal(new Set(listening.map(item=>item.title)).size,8);
});

test('every fragment follows the contract and is 100-220 words long',()=>{
  for(const item of listening){
    assert.ok(['B1','B2'].includes(item.level),item.id);
    assert.ok(isText(item.topic)&&cyrillic.test(item.topic),item.id+' topic');
    assert.ok(isText(item.title)&&!cyrillic.test(item.title),item.id+' title');
    assert.ok(isText(item.situation)&&cyrillic.test(item.situation),item.id+' situation');
    assert.equal(item.plays,2,item.id);
    assert.ok(Array.isArray(item.sentences)&&item.sentences.length>=8,item.id);
    for(const s of item.sentences){
      assert.ok(isText(s.da)&&!cyrillic.test(s.da),item.id+' da');
      assert.ok(isText(s.ru)&&cyrillic.test(s.ru),item.id+' ru');
    }
    const total=item.sentences.reduce((sum,s)=>sum+words(s.da),0);
    assert.ok(total>=100&&total<=220,`${item.id}: ${total} words`);
  }
});

test('listening text contains only letters and ordinary punctuation so speech synthesis reads it well',()=>{
  for(const item of listening)for(const s of item.sentences)assert.match(s.da,speakable,s.da);
});

test('no sentence is repeated between fragments',()=>{
  const all=listening.flatMap(item=>item.sentences.map(s=>s.da.toLocaleLowerCase('da')));
  assert.equal(new Set(all).size,all.length);
});

test('multiple-choice questions have three distinct Danish options and a valid answer',()=>{
  for(const item of listening){
    assert.ok(item.questions.length>=5&&item.questions.length<=6,item.id+' questions');
    assert.equal(new Set(item.questions.map(q=>q.q)).size,item.questions.length,item.id);
    for(const q of item.questions){
      assert.ok(isText(q.q)&&!cyrillic.test(q.q),item.id+' q');
      assert.equal(q.options.length,3,q.q);
      assert.equal(new Set(q.options.map(o=>o.toLocaleLowerCase('da'))).size,3,q.q);
      for(const option of q.options)assert.ok(isText(option)&&!cyrillic.test(option)&&option.length<=60,q.q+' '+option);
      assert.ok(Number.isInteger(q.answer)&&q.answer>=0&&q.answer<3,q.q);
      assert.ok(isText(q.why)&&cyrillic.test(q.why),q.q+' why');
    }
  }
});

test('the correct answers are not always in the same position',()=>{
  const counts=[0,0,0];
  for(const item of listening)for(const q of item.questions)counts[q.answer]++;
  for(const count of counts)assert.ok(count>=6,'answer positions '+counts);
});
