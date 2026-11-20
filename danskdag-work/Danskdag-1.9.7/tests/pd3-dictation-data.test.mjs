import test from 'node:test';
import assert from 'node:assert/strict';
import {dictations} from '../dist/pd3-dictation-data.mjs';

const cyrillic=/[А-Яа-яЁёІіЇїЄєҐґ]/;
const idPattern=/^[a-z0-9-]{1,60}$/;
const speakable=/^[\p{L} .,!?;:'’"-]+$/u;
const words=text=>text.split(/\s+/).filter(token=>/\p{L}/u.test(token)).length;
const isText=value=>typeof value==='string'&&value.trim().length>0;

test('dictation collection has ten sentence sets and four texts with unique ids',()=>{
  assert.equal(dictations.length,14);
  assert.equal(dictations.filter(d=>d.mode==='sentences').length,10);
  assert.equal(dictations.filter(d=>d.mode==='text').length,4);
  const ids=dictations.map(d=>d.id);
  assert.equal(new Set(ids).size,ids.length);
  for(const id of ids)assert.match(id,idPattern);
});

test('every dictation follows the contract',()=>{
  for(const d of dictations){
    assert.ok(['B1','B2'].includes(d.level),d.id);
    assert.ok(isText(d.topic)&&cyrillic.test(d.topic),d.id+' topic');
    assert.ok(isText(d.title)&&!cyrillic.test(d.title),d.id+' title');
    assert.ok(isText(d.tip)&&cyrillic.test(d.tip),d.id+' tip');
    assert.ok(['sentences','text'].includes(d.mode),d.id);
    for(const sentence of d.sentences){
      assert.ok(isText(sentence.da)&&!cyrillic.test(sentence.da),d.id+' da');
      assert.ok(isText(sentence.ru)&&cyrillic.test(sentence.ru),d.id+' ru');
    }
  }
});

test('sentence sets have 6-8 sentences of 6-14 words; texts have 80-120 words in 8-12 sentences',()=>{
  for(const d of dictations){
    if(d.mode==='sentences'){
      assert.ok(d.sentences.length>=6&&d.sentences.length<=8,d.id+' count '+d.sentences.length);
      for(const s of d.sentences){
        const n=words(s.da);
        assert.ok(n>=6&&n<=14,`${d.id}: "${s.da}" has ${n} words`);
      }
    }else{
      assert.ok(d.sentences.length>=8&&d.sentences.length<=12,d.id+' sentences '+d.sentences.length);
      const total=d.sentences.reduce((sum,s)=>sum+words(s.da),0);
      assert.ok(total>=80&&total<=120,d.id+' words '+total);
    }
  }
});

test('each sentence is a single complete sentence with end punctuation',()=>{
  for(const d of dictations)for(const s of d.sentences){
    assert.match(s.da,/[.!?]$/,s.da);
    assert.equal((s.da.match(/[.!?]/g)||[]).length,1,s.da);
    assert.match(s.da,/^\p{Lu}/u,s.da);
  }
});

test('no sentence is repeated between or inside dictations',()=>{
  const all=dictations.flatMap(d=>d.sentences.map(s=>s.da.toLocaleLowerCase('da')));
  assert.equal(new Set(all).size,all.length);
});

test('dictation text contains only letters and ordinary punctuation so speech synthesis reads it well',()=>{
  for(const d of dictations)for(const s of d.sentences)assert.match(s.da,speakable,s.da);
});
