import test from 'node:test';
import assert from 'node:assert/strict';
import {createState,validateState} from '../dist/engine.mjs';
import {pushCopy,saveProgressCopy,listProgressCopies,loadProgress,describeProgress,formatCopyTime,MAX_COPIES} from '../dist/recovery.mjs';

class Storage {
  map=new Map();limit=Infinity;
  getItem(key){return this.map.get(key)??null;}
  setItem(key,value){if(String(value).length>this.limit)throw new DOMException('quota','QuotaExceededError');this.map.set(key,String(value));}
  removeItem(key){this.map.delete(key);}
}
const KEY='danskdag.progress.v1';
const progress=xp=>JSON.stringify({...createState(),xp});

test('recovery copies rotate: the three newest distinct copies are kept, newest first',()=>{
  const storage=new Storage();
  for(const [index,xp] of [10,20,30,40].entries())assert.equal(saveProgressCopy(storage,KEY,progress(xp),'import',Date.UTC(2026,9,24,12,index)),true);
  const copies=listProgressCopies(storage,KEY,raw=>describeProgress(raw,validateState));
  assert.equal(MAX_COPIES,3);
  assert.deepEqual(copies.map(copy=>copy.xp),[40,30,20]);
  assert.equal(copies[0].savedAt,'2026-10-24T12:03:00.000Z');
  assert.equal(copies[0].reason,'import');
});

test('saving the same text twice does not waste a slot',()=>{
  const storage=new Storage();
  saveProgressCopy(storage,KEY,progress(1),'a');saveProgressCopy(storage,KEY,progress(2),'b');saveProgressCopy(storage,KEY,progress(1),'c');
  assert.deepEqual(listProgressCopies(storage,KEY).map(copy=>JSON.parse(copy.raw).xp),[1,2]);
});

test('a full storage drops the oldest copies but still stores the new one; an impossible copy reports failure',()=>{
  const storage=new Storage();
  saveProgressCopy(storage,KEY,progress(1),'a');saveProgressCopy(storage,KEY,progress(2),'a');
  const size=progress(3).length;
  storage.limit=size*2+200;
  assert.equal(saveProgressCopy(storage,KEY,progress(3),'a'),true);
  assert.equal(JSON.parse(listProgressCopies(storage,KEY)[0].raw).xp,3);
  const before=storage.getItem(KEY+'.copies');
  storage.limit=10;
  assert.equal(saveProgressCopy(storage,KEY,progress(4),'a'),false);
  assert.equal(storage.getItem(KEY+'.copies'),before);
  assert.equal(saveProgressCopy(null,KEY,progress(4),'a'),false);
  assert.equal(saveProgressCopy(storage,KEY,'','a'),false);
});

test('a copy kept by older versions is still listed, after the rotated copies',()=>{
  const storage=new Storage();
  storage.setItem(KEY+'.recovery','{"legacy":true}');
  assert.deepEqual(listProgressCopies(storage,KEY).map(copy=>copy.reason),['legacy']);
  saveProgressCopy(storage,KEY,progress(5),'import');
  assert.deepEqual(listProgressCopies(storage,KEY).map(copy=>copy.reason),['import','legacy']);
  assert.equal(listProgressCopies(storage,KEY)[1].savedAt,null);
});

test('corrupt copy lists are ignored instead of throwing',()=>{
  const storage=new Storage();storage.setItem(KEY+'.copies','{not json');
  assert.deepEqual(listProgressCopies(storage,KEY),[]);
  assert.equal(saveProgressCopy(storage,KEY,progress(1),'x'),true);
  storage.setItem(KEY+'.copies','[1,null,{"raw":5},{"raw":"ok","savedAt":"2026-01-01T00:00:00.000Z"}]');
  assert.deepEqual(listProgressCopies(storage,KEY).map(copy=>copy.raw),['ok']);
});

test('loading progress never changes storage and classifies unreadable data',()=>{
  const storage=new Storage();
  assert.equal(loadProgress(storage,KEY,validateState,createState).status,'empty');
  storage.setItem(KEY,progress(12));
  const ok=loadProgress(storage,KEY,validateState,createState);
  assert.equal(ok.status,'ok');assert.equal(ok.state.xp,12);
  for(const bad of ['{broken','null',JSON.stringify({...createState(),version:2,xp:99}),JSON.stringify({...createState(),xp:-5})]){
    storage.setItem(KEY,bad);
    const result=loadProgress(storage,KEY,validateState,createState);
    assert.equal(result.status,'unreadable');assert.equal(result.raw,bad);assert.equal(result.state.xp,0);
    assert.equal(storage.getItem(KEY),bad);
  }
  assert.equal(loadProgress({getItem(){throw new Error('denied');}},KEY,validateState,createState).status,'unavailable');
});

test('copy summaries and timestamps are readable',()=>{
  assert.deepEqual(describeProgress(progress(7),validateState),{xp:7,lessons:0});
  assert.equal(describeProgress('{oops',validateState).unreadable,true);
  assert.match(formatCopyTime('2026-10-24T12:30:00.000Z'),/^\d{2}\.\d{2}\.2026 \d{2}:\d{2}$/);
  assert.equal(formatCopyTime(null),'');assert.equal(formatCopyTime('garbage'),'');
});

test('rotation helper keeps the newest entries for any key and equality rule',()=>{
  const storage=new Storage();
  for(const n of [1,2,3,4,5])pushCopy(storage,'k',{n,x:n%2},{max:2,same:(a,b)=>a.x===b.x});
  assert.deepEqual(JSON.parse(storage.getItem('k')).map(item=>item.n),[5,4]);
});
