import test from 'node:test';
import assert from 'node:assert/strict';
import {createState,validateState,DAY} from '../dist/engine.mjs';

const M=await import('../dist/memory.mjs').catch(error=>{
  if(error.code==='ERR_MODULE_NOT_FOUND' && error.url?.endsWith('/dist/memory.mjs')) return {};
  throw error;
});
const memory=name=>{
  assert.equal(typeof M[name],'function',`${name} must be exported`);
  return M[name];
};
const now=Date.parse('2026-10-23T10:00:00Z');
const attempt=(correct,kind='recall',extra={})=>({correct,kind,helped:false,retry:false,...extra});
const entry=(id,extra={})=>({id,ids:[id],da:`Jeg lærer ord ${id}.`,ru:`Слово ${id}`,verified:true,source:'course',sources:['course'],kind:'grammar',level:'A1',lessonId:`lesson-${id}`,...extra});
const review=(extra={})=>({box:1,due:now,seen:1,...extra});

test('canonical aliases select the latest dated attempt before the largest seen count',()=>{
  const get=memory('getReviewFor');
  const entries={a:review({seen:50}),b:review({lastAt:now,seen:2}),c:review({lastAt:now,seen:3})};
  const copy=structuredClone(entries);
  assert.equal(get({id:'a',ids:['a','b','c']},entries),entries.c);
  assert.equal(get({id:'a'},entries),entries.a);
  assert.equal(get({id:'absent'},entries),undefined);
  assert.equal(get({ids:['b','c']},{b:entries.c,c:entries.c}),entries.c);
  assert.deepEqual(entries,copy);
});

test('canonical alias ties have stable identity independently of alias order',()=>{
  const get=memory('getReviewFor');
  const reviews={b:review(),a:review()};
  assert.equal(get({ids:['b','a']},reviews),reviews.a);
  assert.equal(get({ids:['a','b']},reviews),reviews.a);
});

test('recognition introduces a card without claiming independent recall or advancing its box',()=>{
  const record=memory('recordAttempt');
  const first=record(undefined,attempt(true,'recognition'),now);
  assert.deepEqual(first,{box:0,due:now+600000,seen:1,introducedAt:now,lastAt:now,lastGrade:'recognition',recognition:1,recall:0,spaced:0,lapses:0,lastRecallAt:0});
  const second=record(first,attempt(true,'recognition'),now+30000);
  assert.equal(second.box,0);
  assert.equal(second.due,now+600000);
  assert.equal(second.recognition,2);
  assert.equal(second.recall,0);
  assert.equal(first.seen,1);
});

test('recognition after recall schedules one day only when due',()=>{
  const record=memory('recordAttempt');
  const old=review({box:3,recall:2,lastRecallAt:now-DAY,spaced:1});
  const result=record(old,attempt(true,'recognition'),now);
  assert.equal(result.box,3);
  assert.equal(result.due,now+DAY);
  assert.equal(result.recognition,1);
  assert.equal(result.recall,2);
  assert.equal(result.spaced,1);
  assert.equal(record({...old,due:now+5*DAY},attempt(true,'recognition'),now).due,now+5*DAY);
});

test('independent retrieval uses adaptive intervals without farming early practice',()=>{
  const record=memory('recordAttempt');
  let card=record(undefined,attempt(true),now);
  assert.equal(card.box,1);assert.equal(card.due,now+2*DAY);assert.equal(card.memory.stability,2.3065);
  assert.equal(card.recall,1);assert.equal(card.spaced,0);
  const early=record(card,attempt(true),now+60000);
  assert.equal(early.box,1);assert.equal(early.due,card.due);assert.deepEqual(early.memory,card.memory);assert.equal(early.lastRecallAt,now);
  for(let index=0;index<5;index++){
    const due=card.due,stability=card.memory.stability;
    card=record(card,attempt(true),due);
    assert.equal(card.box,Math.min(index+2,5));assert.ok(card.memory.stability>stability);
    assert.equal(card.due,due+Math.min(90,Math.max(1,Math.round(card.memory.stability)))*DAY);
    assert.equal(card.spaced,index+1);assert.equal(card.lastRecallAt,due);
  }
});

test('a ten-minute independent retry cannot count as a delayed daily check',()=>{
  const record=memory('recordAttempt');
  const previous=review({box:0,due:now,lastRecallAt:now-600000,recall:1,spaced:0});
  const result=record(previous,attempt(true),now);
  assert.equal(result.recall,2);
  assert.equal(result.spaced,0);
  assert.equal(result.lastRecallAt,now);
});

test('mistakes reset delayed-check evidence and request a ten-minute review',()=>{
  const record=memory('recordAttempt');
  const previous=review({box:4,spaced:2,recall:4,recognition:2,lapses:1,lastRecallAt:now-DAY});
  const copy=structuredClone(previous);
  const result=record(previous,attempt(false),now);
  assert.equal(result.box,0);
  assert.equal(result.due,now+600000);
  assert.equal(result.seen,2);
  assert.equal(result.lastGrade,'miss');
  assert.equal(result.spaced,0);
  assert.equal(result.lapses,2);
  assert.equal(result.recall,4);
  assert.equal(result.lastRecallAt,now-DAY);
  assert.deepEqual(previous,copy);
});

test('help and immediate retries never gain success evidence or postpone a pending short retry',()=>{
  const record=memory('recordAttempt');
  const previous=review({box:0,due:now+600000,recognition:1,recall:2,spaced:1,lapses:1});
  for(const extra of [{helped:true},{retry:true},{helped:true,retry:true}]) {
    const result=record(previous,attempt(true,'recall',extra),now+30000);
    assert.equal(result.lastGrade,'assisted');
    assert.equal(result.box,0);
    assert.equal(result.recognition,1);
    assert.equal(result.recall,2);
    assert.equal(result.spaced,1);
    assert.equal(result.lastRecallAt,0);
    assert.equal(result.due,extra.retry ? now+600000 : now+630000);
  }
  assert.equal(record(review({due:now-1}),attempt(true,'recognition',{helped:true}),now).due,now+600000);
});

test('legacy attempts retain their schedule and are not counted as introductions today',()=>{
  const record=memory('recordAttempt');
  const old=review({box:4,due:now+7*DAY,seen:20});
  const result=record(old,attempt(true),now);
  assert.equal(result.box,4);
  assert.equal(result.due,now+7*DAY);
  assert.equal(result.seen,21);
  assert.equal(result.introducedAt,0);
  assert.equal(result.recall,1);
  assert.equal(result.spaced,0);
});

test('practice stages move from recognition through sentence building to recall',()=>{
  const stage=memory('practiceStage'), sentence=entry('a');
  assert.equal(stage(undefined,sentence),'recognition');
  assert.equal(stage(review({lastGrade:'miss',recall:2}),sentence),'recognition');
  assert.equal(stage(review({lastGrade:'assisted',recognition:2}),sentence),'recognition');
  assert.equal(stage(review({lastGrade:'recognition',recognition:1}),sentence),'build');
  assert.equal(stage(review({lastGrade:'recognition',recognition:2}),sentence),'recall');
  assert.equal(stage(review({lastGrade:'recall',recall:1}),sentence),'recall');
  assert.equal(stage(review({seen:8,box:4}),sentence),'recall');
  assert.equal(stage(review({seen:0}),sentence),'recognition');
  for(const item of [entry('a',{da:'Tak!'}),entry('a',{focus:{answers:['ord']}}),entry('a',{gap:{answers:['ord']}})]) {
    assert.equal(stage(review({lastGrade:'recognition',recognition:1}),item),'recall');
  }
});

test('due batches take six reviewed entries before introducing anything',()=>{
  const plan=memory('planMemorySession'), state=createState();
  const entries=Array.from({length:8},(_,i)=>entry(`a${i}`));
  entries.push(entry('new'));
  for(let i=0;i<8;i++)state.reviews[`a${i}`]=review({due:now-(8-i)*DAY});
  const copy=structuredClone({entries,state});
  const result=plan(entries,state,now);
  assert.deepEqual(result.items.map(p=>p.id),['a0','a1','a2','a3','a4','a5']);
  assert.equal(result.dueTotal,8);
  assert.equal(result.dueCount,6);
  assert.equal(result.newCount,0);
  assert.deepEqual({entries,state},copy);
});

test('due sessions interleave lessons while keeping all due work before new cards',()=>{
  const plan=memory('planMemorySession'), state=createState();
  const entries=[entry('a',{lessonId:'same'}),entry('b',{lessonId:'same'}),entry('c',{lessonId:'other'}),entry('new')];
  state.reviews={a:review({due:now-3000}),b:review({due:now-2000}),c:review({due:now-1000})};
  const result=plan(entries,state,now);
  assert.deepEqual(result.items.map(p=>p.id),['a','c','b','new']);
  assert.equal(result.dueCount,3);
  assert.equal(result.newCount,1);
});

test('one canonical alias can be due only once and unknown or unverified reviews stay out',()=>{
  const plan=memory('planMemorySession'), state=createState();
  const shared=entry('a',{ids:['a','a-alias']});
  state.reviews={a:review({due:now-DAY,seen:5}), 'a-alias':review({due:now+DAY,lastAt:now,seen:6}),unknown:review(),bad:review()};
  const result=plan([shared,entry('bad',{verified:false})],state,now);
  assert.deepEqual(result.items,[]);
  assert.equal(result.dueTotal,0);
  assert.equal(result.nextDue,now+DAY);
});

test('new practice is bounded by two per batch and Copenhagen calendar introductions',()=>{
  const plan=memory('planMemorySession'), state=createState();
  state.settings.newPerDay=3;
  const midnight=Date.parse('2026-10-22T22:30:00Z');
  const entries=Array.from({length:7},(_,i)=>entry(`n${i}`));
  state.reviews.n0=review({due:midnight+DAY,introducedAt:Date.parse('2026-10-22T22:01:00Z')});
  state.reviews.n1=review({due:midnight+DAY,introducedAt:Date.parse('2026-10-22T21:59:00Z')});
  state.reviews.n2=review({due:midnight+DAY,introducedAt:Date.parse('2026-10-22T22:10:00Z')});
  state.reviews.unknown=review({introducedAt:midnight});
  let result=plan(entries,state,midnight);
  assert.equal(result.newToday,2);
  assert.equal(result.newLimit,3);
  assert.equal(result.newCount,1);
  state.reviews.n3=review({due:midnight+DAY,introducedAt:midnight});
  result=plan(entries,state,midnight);
  assert.equal(result.newToday,3);
  assert.equal(result.newCount,0);
  assert.deepEqual(result.items,[]);
  assert.equal(result.nextDue,midnight+DAY);
});

test('new daily counts use canonical aliases and the later Copenhagen midnight after DST ends',()=>{
  const plan=memory('planMemorySession'), state=createState();
  const winter=Date.parse('2026-10-26T23:30:00Z');
  const entries=[entry('a',{ids:['a','alias']}),entry('b'),entry('c'),entry('d')];
  state.reviews={a:review({introducedAt:Date.parse('2026-10-26T23:01:00Z'),due:winter+DAY,lastAt:winter}),alias:review({introducedAt:Date.parse('2026-10-26T23:01:00Z'),due:winter+DAY,lastAt:winter}),b:review({introducedAt:Date.parse('2026-10-26T22:59:00Z'),due:winter+DAY})};
  const result=plan(entries,state,winter);
  assert.equal(result.newToday,1);
  assert.equal(result.newCount,2);
});

test('new priorities honor manual marks and personal entries before grammar and imported words',()=>{
  const plan=memory('planMemorySession'), state=createState();
  const entries=[entry('other',{kind:'context'}),entry('file',{source:'file',sources:['file'],level:'B1',kind:'word'}),entry('grammar'),entry('personal',{source:'personal',sources:['personal'],level:'C1',kind:'word'}),entry('manual',{level:'C1',ids:['manual','saved-alias']})];
  state.bookmarks=['saved-alias'];
  assert.deepEqual(plan(entries,state,now).items.map(p=>p.id),['manual','personal']);
  state.reviews.manual=review({due:now+DAY});
  state.reviews.personal=review({due:now+DAY});
  assert.deepEqual(plan(entries,state,now).items.map(p=>p.id),['grammar','file']);
});

test('new batches mix grammar with file words and file words with another course kind',()=>{
  const plan=memory('planMemorySession'), state=createState();
  const file=id=>entry(id,{source:'file',sources:['file'],level:'B1',kind:'word'});
  const grammar=[entry('grammar1'),entry('grammar2')];
  assert.deepEqual(plan([...grammar,file('file1'),file('file2')],state,now).items.map(p=>p.id),['grammar1','file1']);
  assert.deepEqual(plan([file('file1'),file('file2'),entry('context',{kind:'context'})],state,now).items.map(p=>p.id),['file1','context']);
});

test('new variety can use the next priority tier but never skip a stronger tier by two',()=>{
  const plan=memory('planMemorySession'), state=createState();
  const entries=[entry('manual1',{lessonId:'same'}),entry('manual2',{lessonId:'same'}),entry('grammar'),entry('personal',{source:'personal',sources:['personal'],kind:'word'})];
  state.difficult=['manual1','manual2'];
  assert.deepEqual(plan(entries.slice(0,3),state,now).items.map(p=>p.id),['manual1','manual2']);
  assert.deepEqual(plan(entries,state,now).items.map(p=>p.id),['manual1','personal']);
});

test('current-level grammar is preferred and higher-level course work waits while file words remain eligible',()=>{
  const plan=memory('planMemorySession'), state=createState();
  state.settings.level='A2';
  const entries=[entry('lower',{level:'A1'}),entry('higher',{level:'B2'}),entry('current',{level:'A2'}),entry('file',{source:'file',sources:['file'],kind:'word',level:'B1'})];
  assert.deepEqual(plan(entries,state,now).items.map(p=>p.id),['current','file']);
  state.reviews.current=review({due:now+DAY});
  state.reviews.file=review({due:now+DAY});
  assert.deepEqual(plan(entries,state,now).items.map(p=>p.id),['lower']);
});

test('new practice avoids two senses of one homonym family and is stable without mutation',()=>{
  const plan=memory('planMemorySession'), state=createState();
  const entries=[entry('sense1',{kind:'meaning',lessonId:'sense-fyr'}),entry('sense2',{kind:'meaning',lessonId:'sense-fyr'}),entry('other',{kind:'meaning',lessonId:'sense-ret'})];
  const copy=structuredClone(entries);
  assert.deepEqual(plan(entries,state,now).items.map(p=>p.id),['sense1','other']);
  assert.deepEqual(plan(entries,state,now),plan(entries,state,now));
  assert.deepEqual(plan(entries.slice(0,2),state,now).items.map(p=>p.id),['sense1']);
  assert.deepEqual(entries,copy);
});

test('future reviews never fill a session and the nearest future deadline is returned',()=>{
  const plan=memory('planMemorySession'), state=createState();
  const entries=[entry('a'),entry('b'),entry('bad',{verified:false})];
  state.reviews={a:review({due:now+3*DAY}),b:review({due:now+600000}),bad:review({due:now+1}),unknown:review({due:now+2})};
  const result=plan(entries,state,now);
  assert.deepEqual(result.items,[]);
  assert.equal(result.nextDue,now+600000);
  assert.equal(result.newCount,0);
  assert.equal(plan([],state,now).nextDue,null);
});

test('memory summary reports only observed evidence and counts alias sets once',()=>{
  const summary=memory('memorySummary'), state=createState();
  const entries=[entry('a',{ids:['a','alias']}),entry('b'),entry('c'),entry('d'),entry('bad',{verified:false}),entry('unseen')];
  state.reviews={a:review({lastAt:now,recognition:2,recall:3,spaced:2,lastGrade:'recall',introducedAt:now}),alias:review({box:5,due:now,seen:50}),b:review({recognition:3,recall:3,spaced:2,lastGrade:'miss'}),c:review({box:5,seen:20}),d:review({due:now+DAY,recall:1,lastGrade:'recall'}),bad:review({recall:20,spaced:20,lastGrade:'recall'}),unknown:review({recall:20,spaced:20,lastGrade:'recall'})};
  const copy=structuredClone(state);
  const result=summary(entries,state,now);
  assert.equal(result.introduced,4);
  assert.equal(result.recognized,2);
  assert.equal(result.recalled,3);
  assert.equal(result.retained,1);
  assert.equal(result.due,3);
  assert.equal(result.newToday,1);
  assert.deepEqual(state,copy);
});

test('new daily introduction settings survive export and legacy imports gain the default',()=>{
  const state=createState();
  assert.equal(state.settings.newPerDay,6);
  const legacy=structuredClone(state);delete legacy.settings.newPerDay;
  assert.equal(validateState(legacy).settings.newPerDay,6);
  for(const limit of [3,6,10]) assert.equal(validateState({...state,settings:{...state.settings,newPerDay:limit}}).settings.newPerDay,limit);
  for(const limit of [0,2,7,'6',null,Infinity]) assert.equal(validateState({...state,settings:{...state.settings,newPerDay:limit}}).settings.newPerDay,6);
});

test('optional memory evidence round trips without fabricating counters for legacy records',()=>{
  const state=createState();
  const complete=review({introducedAt:now-DAY,lastAt:now,lastGrade:'recall',recognition:2,recall:3,spaced:2,lapses:1,lastRecallAt:now});
  state.reviews={complete,legacy:review({seen:50,box:5}),partial:review({recognition:1})};
  const original=structuredClone(state);
  const restored=validateState(JSON.parse(JSON.stringify(state)));
  assert.deepEqual(restored.reviews,state.reviews);
  assert.equal(Object.hasOwn(restored.reviews.legacy,'recall'),false);
  assert.equal(Object.hasOwn(restored.reviews.legacy,'introducedAt'),false);
  assert.deepEqual(state,original);
  assert.notEqual(restored.reviews.complete,state.reviews.complete);
});

test('malformed optional memory evidence is rejected with strict count and timestamp bounds',()=>{
  const state=createState();
  for(const field of ['recognition','recall','spaced','lapses']) {
    for(const value of [-1,1.5,'1',null,Infinity,1000001]) assert.throws(()=>validateState({...state,reviews:{a:review({[field]:value})}}),`${field}: ${value}`);
    assert.equal(validateState({...state,reviews:{a:review({[field]:1000000})}}).reviews.a[field],1000000);
  }
  for(const field of ['introducedAt','lastAt','lastRecallAt']) {
    for(const value of [-1,'1',null,Infinity,8640000000000001]) assert.throws(()=>validateState({...state,reviews:{a:review({[field]:value})}}),`${field}: ${value}`);
    assert.equal(validateState({...state,reviews:{a:review({[field]:8640000000000000})}}).reviews.a[field],8640000000000000);
  }
  for(const lastGrade of ['recognition','recall','assisted','miss']) assert.equal(validateState({...state,reviews:{a:review({lastGrade})}}).reviews.a.lastGrade,lastGrade);
  for(const lastGrade of ['',null,1,'success',{}]) assert.throws(()=>validateState({...state,reviews:{a:review({lastGrade})}}));
});
