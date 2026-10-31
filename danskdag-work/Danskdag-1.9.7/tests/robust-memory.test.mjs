import test from 'node:test';
import assert from 'node:assert/strict';
import {DAY} from '../dist/engine.mjs';
import {recordAttempt,getReviewFor} from '../dist/memory.mjs';

const now=Date.parse('2026-10-23T10:00:00Z');
const attempt=(correct,extra={})=>({correct,kind:'recall',helped:false,retry:false,...extra});
const review=(extra={})=>({box:3,due:now+30*DAY,seen:5,introducedAt:now-40*DAY,lastAt:now-DAY,lastGrade:'recall',recognition:2,recall:3,spaced:2,lapses:0,lastRecallAt:now-DAY,...extra});

test('a hint on a card scheduled weeks ahead never pulls its due date closer',()=>{
  for(const days of [30,60,90]){
    const previous=review({due:now+days*DAY}),copy=structuredClone(previous);
    for(const kind of ['recall','recognition']){
      const result=recordAttempt(previous,attempt(true,{helped:true,kind}),now);
      assert.equal(result.due,now+days*DAY,`${days} days ${kind}`);
      assert.equal(result.lastGrade,'assisted');
      assert.equal(result.seen,previous.seen+1);
      assert.deepEqual(result.memory,previous.memory);
    }
    assert.deepEqual(previous,copy);
  }
});

test('a hint on a due or new card still schedules the short retry',()=>{
  assert.equal(recordAttempt(review({due:now}),attempt(true,{helped:true}),now).due,now+600000);
  assert.equal(recordAttempt(review({due:now-5*DAY}),attempt(true,{helped:true}),now).due,now+600000);
  assert.equal(recordAttempt(undefined,attempt(true,{helped:true}),now).due,now+600000);
});

test('a wrong answer still brings a card back within ten minutes',()=>{
  const result=recordAttempt(review({due:now+30*DAY}),attempt(false),now);
  assert.equal(result.due,now+600000);assert.equal(result.box,0);assert.equal(result.lapses,1);
});

test('a self-check after a recorded miss does not count the same attempt twice',()=>{
  const start=review({due:now-1}),miss=recordAttempt(start,attempt(false),now);
  const checked=recordAttempt(miss,attempt(true,{helped:true,selfChecked:true}),now+1000);
  assert.equal(miss.seen,start.seen+1);
  assert.equal(checked.seen,miss.seen);
  assert.equal(checked.lastGrade,'assisted');
  assert.equal(checked.lapses,miss.lapses);
  assert.equal(checked.box,0);
  assert.deepEqual(checked.memory,miss.memory);
  const first=recordAttempt(undefined,attempt(false),now);
  assert.equal(recordAttempt(first,attempt(true,{helped:true,selfChecked:true}),now).seen,1);
  assert.equal(recordAttempt(undefined,attempt(true,{helped:true,selfChecked:true}),now).seen,1);
  assert.equal(recordAttempt(miss,attempt(true,{helped:true}),now+1000).seen,miss.seen+1);
});
