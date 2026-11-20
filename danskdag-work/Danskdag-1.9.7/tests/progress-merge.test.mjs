import test from 'node:test';
import assert from 'node:assert/strict';
import {createState,validateState,finishSession} from '../dist/engine.mjs';
import {mergeProgress} from '../dist/progress-merge.mjs';

const day=new Date('2026-10-23T09:00:00Z');
const lesson=(state,id,lessonId,correct=4)=>finishSession(state,{id,lessonId,correct,total:5,minutes:2},day);
const review=(extra={})=>({box:1,due:1,seen:1,lastAt:100,...extra});

test('two tabs that each finish a different lesson keep both lessons and add their XP',()=>{
  const base=createState();
  const ours=lesson(base,'tab-a','hello'),theirs=lesson(base,'tab-b','travel',5);
  const merged=validateState(mergeProgress(base,ours,theirs));
  assert.equal(merged.xp,40+50);
  assert.deepEqual(Object.keys(merged.completed).sort(),['hello','travel']);
  assert.deepEqual(merged.sessions.sort(),['tab-a','tab-b']);
  assert.equal(merged.activity['2026-10-23'].lessons,2);
  assert.equal(merged.activity['2026-10-23'].minutes,4);
  assert.equal(merged.streak,1);
});

test('the same lesson session finished in both tabs is not counted twice',()=>{
  const base=createState();
  const ours=lesson(base,'shared','hello'),theirs=lesson(base,'shared','hello');
  const merged=validateState(mergeProgress(base,ours,theirs));
  assert.equal(merged.xp,40);
  assert.equal(merged.completed.hello.attempts,1);
  assert.deepEqual(merged.sessions,['shared']);
});

test('review cards keep the more recent attempt and unchanged cards take the other tab version',()=>{
  const base=createState();base.reviews={a:review(),b:review(),c:review({seen:3})};
  const ours=structuredClone(base),theirs=structuredClone(base);
  ours.reviews.a=review({seen:2,lastAt:200});theirs.reviews.a=review({seen:5,lastAt:300});
  ours.reviews.b=review({seen:4,lastAt:400});
  theirs.reviews.c=review({seen:9,lastAt:500});theirs.reviews.d=review({lastAt:50});
  const merged=validateState(mergeProgress(base,ours,theirs));
  assert.equal(merged.reviews.a.seen,5);
  assert.equal(merged.reviews.b.seen,4);
  assert.equal(merged.reviews.c.seen,9);
  assert.ok(merged.reviews.d);
});

test('bookmarks respect additions and removals made in either tab',()=>{
  const base=createState();base.bookmarks=['one','two','three'];base.difficult=['x'];
  const ours=structuredClone(base),theirs=structuredClone(base);
  ours.bookmarks=['one','three','mine'];theirs.bookmarks=['one','two','three','theirs'];theirs.difficult=['x','y'];
  const merged=validateState(mergeProgress(base,ours,theirs));
  assert.deepEqual(merged.bookmarks,['one','three','theirs','mine']);
  assert.deepEqual(merged.difficult,['x','y']);
});

test('custom words and settings: a change made in this tab wins, the other tab keeps its own changes',()=>{
  const word=(id,da)=>({id,da,ru:'слово',note:'',association:''});
  const base=createState();base.customWords=[word('u-1','en'),word('u-2','to'),word('u-3','tre')];
  const ours=structuredClone(base),theirs=structuredClone(base);
  ours.customWords=[word('u-1','EN edited'),word('u-3','tre'),word('u-4','fire')];
  theirs.customWords=[word('u-1','en'),word('u-2','TO edited'),word('u-5','fem')];
  ours.settings.theme='dark';theirs.settings.goal=60;
  const merged=validateState(mergeProgress(base,ours,theirs));
  assert.deepEqual(merged.customWords.map(w=>[w.id,w.da]).sort(),[['u-1','EN edited'],['u-2','TO edited'],['u-4','fire'],['u-5','fem']]);
  assert.equal(merged.settings.theme,'dark');assert.equal(merged.settings.goal,60);
});

test('merging identical or one-sided changes returns exactly the changed side',()=>{
  const base=lesson(createState(),'s0','hello');
  const theirs=lesson(base,'s1','travel');
  assert.deepEqual(validateState(mergeProgress(base,structuredClone(base),theirs)),theirs);
  assert.deepEqual(validateState(mergeProgress(base,theirs,structuredClone(base))),theirs);
  assert.deepEqual(validateState(mergeProgress(base,theirs,theirs)),theirs);
});

test('without a known base the merge is conservative: never lowers progress and never mutates inputs',()=>{
  const ours=lesson(createState(),'a','hello'),theirs=lesson(createState(),'b','travel',5);
  const copies=[structuredClone(ours),structuredClone(theirs)];
  const merged=validateState(mergeProgress(null,ours,theirs));
  assert.equal(merged.xp,50);
  assert.deepEqual(Object.keys(merged.completed).sort(),['hello','travel']);
  assert.deepEqual([ours,theirs],copies);
});
