import test from 'node:test';
import assert from 'node:assert/strict';
import {createPd3Store,validatePd3,defaults,mergePd3,recordScore,PD3_KEY,LIMITS} from '../dist/pd3-store.mjs';

class MemoryStorage{
 constructor(){this.map=new Map();this.fail=false;}
 getItem(k){return this.map.has(k)?this.map.get(k):null;}
 setItem(k,v){if(this.fail)throw new DOMException('full','QuotaExceededError');this.map.set(k,String(v));}
 removeItem(k){this.map.delete(k);}
}

test('a new store has the defaults and uses its own key',()=>{
 const storage=new MemoryStorage(),store=createPd3Store(storage);
 assert.deepEqual(store.load(),defaults());assert.equal(PD3_KEY,'danskdag.pd3.v1');
 assert.ok(store.update(d=>{d.settings.reader.rate=0.75;}));
 assert.deepEqual([...storage.map.keys()],[PD3_KEY]);
 assert.equal(createPd3Store(storage).load().settings.reader.rate,0.75);
});

test('results, drafts, self-assessment and keywords survive a reload',()=>{
 const storage=new MemoryStorage(),store=createPd3Store(storage,PD3_KEY,()=>5000);
 store.load();
 store.update(d=>{
  recordScore(d.reading,'text-1',60,null,10);recordScore(d.reading,'text-1',80,null,20);recordScore(d.reading,'text-1',40,null,30);
  recordScore(d.exam.text,'exam-1',70,[50,60,100],40);
  d.writing['mail-1']={draft:'Kære Anna,\n\nTak.',option:'B',updatedAt:1,done:true,req:[true,false],check:[],self:{content:4,vocabulary:9,'Bad Key':2}};
  d.oral['mono-1']={keywords:['arbejde','  ','familie'],self:{fluency:3},done:false,updatedAt:2};
 });
 const loaded=createPd3Store(storage).load();
 assert.deepEqual(loaded.reading['text-1'],{best:80,last:40,attempts:3,at:30});
 assert.deepEqual(loaded.exam.text['exam-1'].parts,[50,60,100]);
 assert.equal(loaded.writing['mail-1'].draft,'Kære Anna,\n\nTak.');assert.equal(loaded.writing['mail-1'].option,'B');
 assert.deepEqual(loaded.writing['mail-1'].self,{content:4,vocabulary:5},'scores are clamped to 1-5, bad ids dropped');
 assert.deepEqual(loaded.oral['mono-1'].keywords,['arbejde','familie']);assert.equal(loaded.updatedAt,5000);
});

test('the validator drops invalid entries and clamps values instead of trusting input',()=>{
 const clean=validatePd3({version:1,settings:{reader:{rate:5,calibration:99},dictation:{limit:7}},reading:{'ok-id':{best:250,attempts:-3},'Bad Id':{best:1},x:'no'},writing:{'a':{draft:'x'.repeat(LIMITS.draft+50)}},oral:{o:{keywords:Array.from({length:30},(_,i)=>'w'+i)}}});
 assert.equal(clean.settings.reader.rate,0.9);assert.equal(clean.settings.reader.calibration,3);assert.equal(clean.settings.dictation.limit,0);
 assert.deepEqual(Object.keys(clean.reading),['ok-id']);assert.equal(clean.reading['ok-id'].best,100);assert.equal(clean.reading['ok-id'].attempts,0);
 assert.equal(clean.writing.a.draft.length,LIMITS.draft);assert.equal(clean.oral.o.keywords.length,LIMITS.keywords);
 for(const bad of [null,[],'x',{version:2},{}])assert.throws(()=>validatePd3(bad));
});

test('unreadable stored data is kept as a copy and the store starts fresh',()=>{
 const storage=new MemoryStorage();storage.setItem(PD3_KEY,'{broken');
 const store=createPd3Store(storage);
 assert.deepEqual(store.load(),defaults());assert.equal(store.status.broken,true);
 assert.equal(storage.getItem(PD3_KEY+'.broken'),'{broken');
});

test('a full storage keeps the data in memory and reports the error without throwing',()=>{
 const storage=new MemoryStorage(),store=createPd3Store(storage);store.load();
 storage.fail=true;
 assert.equal(store.update(d=>{d.writing.a={draft:'hej',option:'A',updatedAt:1,done:false,req:[],check:[],self:{}};}),false);
 assert.equal(store.status.error,'quota');assert.equal(store.get().writing.a.draft,'hej');
 storage.fail=false;assert.equal(store.update(d=>{d.settings.exam.timer=false;}),true);assert.equal(store.status.error,null);
 const blocked={getItem(){throw new Error('denied');},setItem(){throw new Error('denied');}};
 const s2=createPd3Store(blocked);assert.deepEqual(s2.load(),defaults());assert.equal(s2.status.error,'unavailable');
 assert.equal(s2.update(d=>{d.settings.exam.timer=false;}),false);assert.equal(s2.get().settings.exam.timer,false,'works in memory');
});

test('data over the size limit is refused',()=>{
 const storage=new MemoryStorage(),store=createPd3Store(storage);store.load();
 const ok=store.update(d=>{for(let i=0;i<LIMITS.items;i++)d.writing['w'+i]={draft:'y'.repeat(LIMITS.draft),option:'A',updatedAt:1,done:false,req:[],check:[],self:{}};});
 assert.equal(ok,false);assert.equal(store.status.error,'size');assert.equal(storage.getItem(PD3_KEY),null);
});

test('update starts from what is stored, so a second tab is not overwritten',()=>{
 const storage=new MemoryStorage(),a=createPd3Store(storage),b=createPd3Store(storage);a.load();b.load();
 a.update(d=>{recordScore(d.reading,'one',50,null,1);});
 b.update(d=>{recordScore(d.reading,'two',60,null,2);});
 const final=createPd3Store(storage).load();assert.deepEqual(Object.keys(final.reading).sort(),['one','two']);
});

test('export and import merge: best scores and newer drafts win, settings stay',()=>{
 const a=new MemoryStorage(),b=new MemoryStorage(),one=createPd3Store(a),two=createPd3Store(b);one.load();two.load();
 one.update(d=>{recordScore(d.dictation,'d1',90,null,100);d.writing.m={draft:'old',option:'A',updatedAt:10,done:false,req:[],check:[],self:{}};d.settings.reader.rate=0.6;});
 two.update(d=>{recordScore(d.dictation,'d1',50,null,200);recordScore(d.listening,'l1',70,null,5);d.writing.m={draft:'new',option:'A',updatedAt:20,done:true,req:[],check:[],self:{}};d.settings.reader.rate=1;});
 const result=one.importJson(two.exportJson());
 assert.equal(result.ok,true);
 const merged=one.get();assert.equal(merged.dictation.d1.best,90);assert.equal(merged.dictation.d1.last,50);assert.equal(merged.listening.l1.best,70);
 assert.equal(merged.writing.m.draft,'new');assert.equal(merged.settings.reader.rate,0.6);
 assert.deepEqual(one.importJson('not json'),{ok:false,error:'format'});
 assert.deepEqual(one.importJson(JSON.stringify({version:3})),{ok:false,error:'format'});
 assert.deepEqual(one.importJson('x'.repeat(LIMITS.importBytes+1)),{ok:false,error:'size'});
 assert.equal(mergePd3(defaults(),defaults()).version,1);
});

test('the PD3 store does not read or write the main progress key',()=>{
 const storage=new MemoryStorage();storage.setItem('danskdag.progress.v1','{"main":true}');
 const store=createPd3Store(storage);store.load();store.update(d=>{d.settings.exam.timer=false;});
 assert.equal(storage.getItem('danskdag.progress.v1'),'{"main":true}');
});
