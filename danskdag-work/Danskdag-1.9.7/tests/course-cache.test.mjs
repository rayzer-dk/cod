import test from 'node:test';
import assert from 'node:assert/strict';
import {createState} from '../dist/engine.mjs';
import {getCatalog,getWordEntries,trainingPool} from '../dist/course.mjs';

const word=(id,da,extra={})=>({id,da,ru:'слово '+da,note:'',association:'',...extra});

test('the catalogue is built once for unchanged personal words and rebuilt when they change',()=>{
  const state=createState();
  const first=getCatalog(state);
  assert.equal(getCatalog(structuredClone(state)),first);
  assert.equal(getCatalog(createState()),first);
  const withWord={...state,customWords:[word('u-cache-1','en cache-test')]};
  const second=getCatalog(withWord);
  assert.notEqual(second,first);
  assert.equal(second['u-cache-1'].source,'personal');
  assert.equal(first['u-cache-1'],undefined);
  assert.equal(getCatalog(structuredClone(withWord)),second);
  const edited={...state,customWords:[word('u-cache-1','en cache-test',{ru:'другой перевод'})]};
  assert.equal(getCatalog(edited)['u-cache-1'].ru,'другой перевод');
  assert.equal(getCatalog(state)['u-cache-1'],undefined);
});

test('an in-place edit of the custom words list is noticed',()=>{
  const state=createState();
  const before=getWordEntries(state).length;
  state.customWords.push(word('u-cache-2','en anden cache-test'));
  const after=getWordEntries(state);
  assert.equal(after.length,before+1);
  assert.ok(after.some(entry=>entry.ids.includes('u-cache-2')));
  state.customWords.pop();
  assert.equal(getWordEntries(state).length,before);
});

test('word entries merge personal words exactly as before and are reused between calls',()=>{
  const state=createState();
  const entries=getWordEntries(state);
  assert.equal(getWordEntries(state),entries);
  const duplicate=entries.find(entry=>entry.ids.length>1);
  const known=entries.find(entry=>entry.source==='file'||entry.sources?.includes('file'));
  assert.ok(known);
  const withPersonal={...state,customWords:[word('u-cache-3',known.da)]};
  const merged=getWordEntries(withPersonal).find(entry=>entry.ids.includes('u-cache-3'));
  assert.ok(merged.sources.includes('personal'));
  assert.ok(merged.ids.length>=2,'a personal word with the same Danish text joins the existing card');
  assert.equal(getWordEntries(state).find(entry=>entry.ids.includes('u-cache-3')),undefined);
  assert.ok(duplicate===undefined||duplicate.ids.length>1);
});

test('the training pool follows the catalogue and callers cannot corrupt the cached copy',()=>{
  const state=createState();
  const pool=trainingPool(state);
  const length=pool.length;
  pool.length=0;pool.reverse();
  assert.equal(trainingPool(state).length,length);
  const next=trainingPool({...state,customWords:[word('u-cache-4','en pool-test')]});
  assert.equal(next.length,length+1);
  assert.equal(trainingPool(state).length,length);
});
