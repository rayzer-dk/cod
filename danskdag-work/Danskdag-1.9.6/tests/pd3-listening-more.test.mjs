import test from 'node:test';
import assert from 'node:assert/strict';
import {listening} from '../dist/pd3-listening-data.mjs';
import {listeningMore} from '../dist/pd3-listening-more-data.mjs';
import {dictations} from '../dist/pd3-dictation-data.mjs';
import {dictationsMore} from '../dist/pd3-dictation-more-data.mjs';

const cyrillic=/[А-Яа-яЁёІіЇїЄєҐґ]/;
const idPattern=/^[a-z0-9-]{1,60}$/;
const speakable=/^[\p{L} .,!?;:'’"-]+$/u;
const words=text=>text.split(/\s+/).filter(token=>/\p{L}/u.test(token)).length;
const isText=value=>typeof value==='string'&&value.trim().length>0;

test('there are ten additional listening fragments with unique ids that do not clash with the existing ones',()=>{
  assert.equal(listeningMore.length,10);
  const ids=listeningMore.map(item=>item.id);
  assert.equal(new Set(ids).size,ids.length);
  for(const id of ids)assert.match(id,idPattern);
  const old=new Set(listening.map(item=>item.id));
  for(const id of ids)assert.ok(!old.has(id),id+' exists already');
  const titles=[...listening,...listeningMore].map(item=>item.title);
  assert.equal(new Set(titles).size,titles.length);
});

test('every additional fragment follows the contract and is 110-230 words long',()=>{
  for(const item of listeningMore){
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
    assert.ok(total>=110&&total<=230,`${item.id}: ${total} words`);
  }
});

test('listening text has only letters and ordinary punctuation, so numbers and times are written as words',()=>{
  for(const item of listeningMore)for(const s of item.sentences){
    assert.match(s.da,speakable,s.da);
    assert.doesNotMatch(s.da,/\d/,s.da);
  }
});

test('no sentence is repeated between any listening fragments or dictations, old or new',()=>{
  const all=[...listening,...listeningMore,...dictations,...dictationsMore].flatMap(item=>item.sentences.map(s=>s.da.toLocaleLowerCase('da')));
  assert.equal(new Set(all).size,all.length);
});

test('multiple-choice questions have three distinct Danish options and a valid answer',()=>{
  for(const item of listeningMore){
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

test('the correct answer does not sit in the same position too often',()=>{
  const counts=[0,0,0];
  for(const item of listeningMore)for(const q of item.questions)counts[q.answer]++;
  for(const count of counts)assert.ok(count>=6,'answer positions '+counts);
  for(const item of listeningMore){
    const own=[0,0,0];
    for(const q of item.questions)own[q.answer]++;
    assert.ok(Math.max(...own)<=3,item.id+' answer positions '+own);
  }
});

test('the fragments cover several genres: dialogues with speaker labels, voicemail, announcement, interview',()=>{
  const labelled=listeningMore.filter(item=>item.sentences.filter(s=>/^\p{Lu}\p{L}+: /u.test(s.da)).length>=6);
  assert.ok(labelled.length>=4,'dialogue-like fragments '+labelled.length);
  assert.equal(new Set(listeningMore.map(item=>item.topic)).size,10);
});
