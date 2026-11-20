import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {createHash} from 'node:crypto';
import {createState,validateState,finishSession,awardPd3,PD3_XP,PD3_DAY_XP,PD3_MIN_PERCENT,getAchievements} from '../dist/engine.mjs';
import {createPd3Store,createPd3StateStore,validatePd3,defaults,recordScore,LIMITS,PD3_KEY,STAT_KINDS} from '../dist/pd3-store.mjs';
import {mergeProgress} from '../dist/progress-merge.mjs';
import {mergePd3Tabs,adoptRemoteState} from '../dist/pd3-merge.mjs';
import {migrateLegacyPd3,MIGRATED_KEY} from '../dist/pd3-migrate.mjs';
import {pd3Data} from '../dist/pd3-data.mjs';
import {ERROR_KINDS} from '../dist/pd3-diff.mjs';

const sha=value=>createHash('sha256').update(value).digest('hex');
const day=new Date('2026-10-23T09:00:00Z');
const stateWith=change=>{const s=createState();change(s);return validateState(s);};
const pd3Of=change=>{const d=defaults();change(d);return d;};

class MemoryStorage{
 constructor(){this.map=new Map();this.failKeys=new Set();}
 getItem(k){return this.map.has(k)?this.map.get(k):null;}
 setItem(k,v){if(this.failKeys.has(k))throw new DOMException('full','QuotaExceededError');this.map.set(k,String(v));}
 removeItem(k){this.map.delete(k);}
}

/* ---------- 1. state.pd3 and the formats of existing users ---------- */

test('golden: a state without PD3 keeps its exact JSON and hash',()=>{
 const empty=JSON.stringify(createState());
 assert.equal(empty,'{"version":1,"xp":0,"streak":0,"lastDay":null,"completed":{},"reviews":{},"activity":{},"sessions":[],"bookmarks":[],"difficult":[],"customWords":[],"settings":{"level":"A1","goal":30,"theme":"light","rate":0.85,"mode":"easy","fontSize":18,"newPerDay":6,"voiceUri":"","language":"uk"}}');
 assert.equal(sha(empty),'4babdc36fff318ed9231b36fa42b918c0e88edfddff3310a82541f7db8c303bf');
 assert.equal(JSON.stringify(validateState(JSON.parse(empty))),empty,'validation does not add a pd3 field');
 let s=createState();
 s=finishSession(s,{id:'s1',lessonId:'g-a1-1',correct:4,total:5,minutes:3},new Date('2026-10-20T10:00:00Z'));
 s=finishSession(s,{id:'s2',lessonId:'g-a1-2',correct:5,total:5,minutes:2},new Date('2026-10-21T10:00:00Z'));
 s.reviews.x1={box:2,due:1700000000000,seen:3,lastAt:1699999999999};
 s.customWords.push({id:'u-1',da:'en hund',ru:'собака',note:'',association:''});
 s.settings.name='Ivan';
 const rich=JSON.stringify(validateState(JSON.parse(JSON.stringify(s))));
 assert.equal(sha(rich),'afc3cea696a83913b8ef0db8bce5d9ae54008b81c06c5a827e348d36059da6de');
 assert.ok(!('pd3' in JSON.parse(rich)));
});

test('state.pd3 is validated with the PD3 validator, drops unusable data and never rejects the progress',()=>{
 const raw=createState();
 raw.pd3=pd3Of(d=>{recordScore(d.dictation,'ede-og-et',80,null,5);d.plan.examDate='2026-12-01';});
 const ok=validateState(JSON.parse(JSON.stringify(raw)));
 assert.deepEqual(ok.pd3,validatePd3(raw.pd3));assert.equal(ok.pd3.dictation['ede-og-et'].best,80);
 for(const bad of [null,'x',[],{version:2},{version:1,reading:7}]){
  const copy=createState();copy.pd3=bad;
  const clean=validateState(copy);
  if(bad&&bad.version===1)assert.deepEqual(clean.pd3.reading,{}); else assert.ok(!('pd3' in clean),JSON.stringify(bad));
 }
 const crowded=createState();
 crowded.pd3={version:1,reading:{'Bad Id':{best:5},'ok-id':{best:250,attempts:2,at:1,last:3}},stats:{dictation:{runs:2,errors:{aeoa:3,nonsense:9}}},plan:{examDate:'2026-02-31'}};
 const clean=validateState(crowded).pd3;
 assert.deepEqual(Object.keys(clean.reading),['ok-id']);assert.equal(clean.reading['ok-id'].best,100);
 assert.deepEqual(clean.stats.dictation.errors,{aeoa:3});assert.equal(clean.plan.examDate,'','an impossible date is dropped');
});

test('unknown fields: newer PD3 fields are carried in pd3._unknown, other fields in the state _unknown',()=>{
 const raw=createState();
 raw.futureThing={a:1};
 raw.pd3={version:1,newFeature:{x:[1,2]},reading:{}};
 const clean=validateState(raw);
 assert.deepEqual(clean._unknown,{futureThing:{a:1}});
 assert.deepEqual(clean.pd3._unknown,{newFeature:{x:[1,2]}});
 assert.deepEqual(validateState(JSON.parse(JSON.stringify(clean))).pd3._unknown,{newFeature:{x:[1,2]}},'survives a save and load');
});

test('size: the PD3 field stays within about 256 KB; drafts are shortened first, then the oldest records go',()=>{
 const raw=createState();
 raw.pd3=defaults();
 for(let i=0;i<40;i++)raw.pd3.writing['w-'+i]={draft:'ø'.repeat(LIMITS.draft),option:'A',updatedAt:i+1,done:false,req:[],check:[],self:{}};
 const before=JSON.stringify(raw.pd3).length;assert.ok(before>LIMITS.state,'the input is over the limit');
 const clean=validateState(raw).pd3;
 assert.ok(JSON.stringify(clean).length<=LIMITS.state);
 assert.ok(clean.writing['w-39'].draft.length>0,'the newest draft keeps text');
 assert.ok(clean.writing['w-0'].draft.length<clean.writing['w-39'].draft.length,'older drafts are cut first');
 assert.equal(Object.keys(clean.writing).length,40,'records stay while shortening is enough');
 const many=createState();many.pd3=defaults();
 for(let i=0;i<300;i++)for(const map of ['reading','listening','dictation'])many.pd3[map]['m-'+i]={best:50,last:50,attempts:1,at:i+1,parts:[1,2,3,4,5,6]};
 for(let i=0;i<300;i++){many.pd3.writing['w-'+i]={draft:'x'.repeat(2000),option:'A',updatedAt:i+1,done:true,req:[],check:[],self:{}};}
 const trimmed=validateState(many).pd3;
 assert.ok(JSON.stringify(trimmed).length<=LIMITS.state);assert.ok(Object.keys(trimmed.reading).length<=LIMITS.items);
});

test('the server accepts a progress snapshot with PD3 data and keeps it',async()=>{
 const {handleProgress}=await import('../worker/progress.mjs');
 const rows=new Map();
 const db={prepare(sql){return {bind:(...p)=>({first:async()=>{
  if(/^INSERT/i.test(sql.trim())){const [user_id,state_json,updated_at]=p;if(rows.has(user_id))return null;const row={user_id,state_json,revision:1,updated_at};rows.set(user_id,row);return {...row};}
  if(/^UPDATE/i.test(sql.trim())){const [state_json,updated_at,user_id,revision]=p,old=rows.get(user_id);if(!old||old.revision!==revision)return null;const row={user_id,state_json,updated_at,revision:old.revision+1};rows.set(user_id,row);return {...row};}
  const row=rows.get(p[0]);return row?{...row}:null;}})};}};
 const headers={'content-type':'application/json','oai-authenticated-user-id':'user-1',origin:'https://app.test'};
 const state=stateWith(s=>{s.pd3=pd3Of(d=>{recordScore(d.reading,'read-a',90,null,10);d.writing.w1={draft:'Hej '.repeat(2000),option:'A',updatedAt:3,done:true,req:[],check:[],self:{content:4}};});});
 const put=await handleProgress(new Request('https://app.test/api/progress',{method:'PUT',headers,body:JSON.stringify({revision:0,state})}),{DB:db});
 assert.equal(put.status,200);
 const saved=await put.json();assert.deepEqual(saved.state.pd3,state.pd3);
 const got=await (await handleProgress(new Request('https://app.test/api/progress',{headers}),{DB:db})).json();
 assert.deepEqual(got.state.pd3,state.pd3);
 const unknownVersion={...state,pd3:{version:9,x:1}};
 const second=await handleProgress(new Request('https://app.test/api/progress',{method:'PUT',headers,body:JSON.stringify({revision:1,state:unknownVersion})}),{DB:db});
 assert.equal(second.status,200,'a PD3 field the server cannot read does not make the whole progress invalid');
});

test('the Worker bundle (engine + progress + site, without imports) validates PD3 data by itself',async()=>{
 const strip=file=>fs.readFileSync(new URL('../'+file,import.meta.url),'utf8').replace(/^import .*;\r?\n/gm,'').replace(/^export (?=(?:async )?(?:function|const|let|class))/gm,'');
 const source=strip('dist/engine.mjs')+'\n'+strip('worker/progress.mjs')+'\n'+strip('worker/site.mjs')+'\nexport {validateState};\n';
 const bundle=await import('data:text/javascript;base64,'+Buffer.from(source).toString('base64'));
 const input=createState();input.pd3=pd3Of(d=>recordScore(d.listening,'l-1',70,null,4));
 assert.equal(bundle.validateState(JSON.parse(JSON.stringify(input))).pd3.listening['l-1'].best,70);
 assert.doesNotMatch(fs.readFileSync(new URL('../dist/engine.mjs',import.meta.url),'utf8'),/^import /m,'engine.mjs stays free of imports: the Worker concatenates it with its own modules');
});

test('the statistics kinds match the dictation comparison and the PD3 store keeps its old interface',()=>{
 assert.deepEqual(STAT_KINDS,ERROR_KINDS);
 const storage=new MemoryStorage(),store=createPd3Store(storage);
 assert.deepEqual(store.load(),defaults());assert.equal(PD3_KEY,'danskdag.pd3.v1');
});

/* ---------- the store over the progress ---------- */

function stateStore(initial=createState()){
 let state=initial,saves=0;
 const store=createPd3StateStore({read:()=>state.pd3,write:next=>{state=validateState({...state,pd3:next});saves++;return true;},clock:()=>7000});
 return {store,get state(){return state;},get saves(){return saves;}};
}

test('the PD3 field appears only after the first change and the old backup file works both ways',()=>{
 const h=stateStore();
 assert.equal('pd3' in h.state,false);h.store.load();assert.equal('pd3' in h.state,false,'reading does not create it');
 assert.deepEqual(h.store.get(),defaults());
 assert.ok(h.store.update(d=>{recordScore(d.dictation,'d-1',60,null,5);d.settings.reader.rate=0.75;}));
 assert.equal(h.state.pd3.dictation['d-1'].best,60);assert.equal(h.state.pd3.updatedAt,7000);
 const json=h.store.exportJson();
 const file=JSON.parse(json);assert.equal(file.app,'danskdag-pd3');assert.equal(file.version,1);
 const legacyFile=JSON.stringify({app:'danskdag-pd3',version:1,updatedAt:1,settings:{reader:{rate:0.6}},reading:{'r-1':{best:90,last:90,attempts:1,at:2}},dictation:{'d-1':{best:80,last:80,attempts:1,at:9}}});
 const other=stateStore();
 assert.deepEqual(other.store.importJson(legacyFile),{ok:true});
 assert.equal(other.state.pd3.reading['r-1'].best,90);
 assert.deepEqual(h.store.importJson(legacyFile),{ok:true});
 assert.equal(h.state.pd3.dictation['d-1'].best,80,'the better result is kept');assert.equal(h.state.pd3.reading['r-1'].best,90);
 assert.equal(h.state.pd3.settings.reader.rate,0.75,'current settings stay');
 assert.deepEqual(h.store.importJson('{broken'),{ok:false,error:'format'});
 assert.deepEqual(h.store.importJson('x'.repeat(LIMITS.importBytes+1)),{ok:false,error:'size'});
 const roundTrip=stateStore();assert.deepEqual(roundTrip.store.importJson(json),{ok:true});assert.equal(roundTrip.state.pd3.dictation['d-1'].best,60);
 assert.equal(createPd3Store({read:()=>undefined,write:()=>true}).get().version,1,'createPd3Store also accepts {read,write}');
});

test('a failed save is reported and keeps the previous progress',()=>{
 let state=createState();
 const store=createPd3StateStore({read:()=>state.pd3,write:()=>false});
 assert.equal(store.update(d=>{d.settings.exam.timer=false;}),false);assert.equal(store.status.error,'quota');assert.equal(state.pd3,undefined);
});

/* ---------- 2. migration ---------- */

test('migration moves the old key into the progress and keeps its content under the .migrated key',()=>{
 const legacy=pd3Of(d=>{recordScore(d.reading,'read-a',70,null,100);d.writing.w={draft:'Kære',option:'B',updatedAt:50,done:false,req:[],check:[],self:{content:3}};d.settings.dictation.limit=2;});
 const storage=new MemoryStorage(),raw=JSON.stringify(legacy);storage.setItem(PD3_KEY,raw);
 let saved=null;const order=[];
 const state=createState();
 const result=migrateLegacyPd3(storage,state,next=>{order.push('save');assert.equal(storage.getItem(PD3_KEY),raw,'the old key is still there while the progress is saved');saved=next;return true;});
 assert.equal(result.status,'migrated');assert.deepEqual(order,['save']);
 assert.equal(saved.pd3.reading['read-a'].best,70);assert.equal(saved.pd3.writing.w.draft,'Kære');assert.equal(saved.pd3.settings.dictation.limit,2);
 assert.equal(storage.getItem(PD3_KEY),null);assert.equal(storage.getItem(MIGRATED_KEY),raw);
 assert.equal(migrateLegacyPd3(storage,result.state,()=>assert.fail('nothing left to migrate')).status,'none');
});

test('migration merges with PD3 data already in the progress: best scores and newer drafts win; saving failure leaves everything in place',()=>{
 const legacy=pd3Of(d=>{recordScore(d.reading,'r',90,null,10);recordScore(d.dictation,'d',40,null,10);d.writing.w={draft:'old',option:'A',updatedAt:5,done:false,req:[],check:[],self:{}};});
 const current=stateWith(s=>{s.pd3=pd3Of(d=>{recordScore(d.reading,'r',50,null,20);d.writing.w={draft:'new',option:'A',updatedAt:9,done:false,req:[],check:[],self:{}};d.settings.exam.timer=false;});});
 const storage=new MemoryStorage();storage.setItem(PD3_KEY,JSON.stringify(legacy));
 const failed=migrateLegacyPd3(storage,current,()=>false);
 assert.equal(failed.status,'failed');assert.ok(storage.getItem(PD3_KEY),'old data stays when the progress could not be saved');assert.equal(storage.getItem(MIGRATED_KEY),null);
 let saved=null;
 assert.equal(migrateLegacyPd3(storage,current,next=>{saved=next;return true;}).status,'migrated');
 assert.equal(saved.pd3.reading.r.best,90);assert.equal(saved.pd3.reading.r.last,50,'the newer attempt is the last one');
 assert.equal(saved.pd3.dictation.d.best,40);assert.equal(saved.pd3.writing.w.draft,'new');assert.equal(saved.pd3.settings.exam.timer,false);
});

test('migration leaves damaged or unwritable data alone',()=>{
 const storage=new MemoryStorage();storage.setItem(PD3_KEY,'{broken');
 assert.equal(migrateLegacyPd3(storage,createState(),()=>assert.fail('no save')).status,'unreadable');
 assert.equal(storage.getItem(PD3_KEY),'{broken');
 const legacy=JSON.stringify(pd3Of(d=>recordScore(d.reading,'r',70,null,1)));
 const full=new MemoryStorage();full.setItem(PD3_KEY,legacy);full.failKeys.add(MIGRATED_KEY);
 const result=migrateLegacyPd3(full,createState(),()=>true);
 assert.equal(result.status,'migrated');assert.equal(full.getItem(PD3_KEY),legacy,'the original key is removed only after the copy was stored');
 const again=migrateLegacyPd3(full,result.state,()=>assert.fail('the progress already has the data'));
 assert.equal(again.status,'migrated');
 full.failKeys.clear();assert.equal(migrateLegacyPd3(full,again.state,()=>assert.fail('unchanged')).status,'migrated');assert.equal(full.getItem(PD3_KEY),null);
 const blocked={getItem(){throw new Error('denied');}};assert.equal(migrateLegacyPd3(blocked,createState(),()=>true).status,'none');
});

/* ---------- 3. merging two tabs and the cloud ---------- */

function twoTabs(baseChange,oursChange,theirsChange){
 const base=stateWith(s=>baseChange?.(s)),ours=structuredClone(base),theirs=structuredClone(base);
 oursChange(ours);theirsChange(theirs);
 return validateState(mergeProgress(base,validateState(ours),validateState(theirs)));
}
const writing=(draft,updatedAt,extra={})=>({draft,option:'A',updatedAt,done:false,req:[],check:[],self:{},...extra});

test('tabs: best scores are the maximum, different activities are all kept, attempts add up',()=>{
 const merged=twoTabs(s=>{s.pd3=pd3Of(d=>recordScore(d.reading,'r1',50,null,10));},
  ours=>{recordScore(ours.pd3.reading,'r1',70,null,20);recordScore(ours.pd3.dictation,'d1',90,null,21);},
  theirs=>{recordScore(theirs.pd3.reading,'r1',60,null,30);recordScore(theirs.pd3.listening,'l1',80,null,31);});
 assert.equal(merged.pd3.reading.r1.best,70);assert.equal(merged.pd3.reading.r1.last,60,'the newer attempt decides last');assert.equal(merged.pd3.reading.r1.attempts,3);
 assert.equal(merged.pd3.dictation.d1.best,90);assert.equal(merged.pd3.listening.l1.best,80);
});

test('tabs: the same attempt seen by both tabs is counted once; PD3 created in one tab only is kept',()=>{
 const merged=twoTabs(null,ours=>{ours.pd3=pd3Of(d=>recordScore(d.reading,'r1',70,null,20));},theirs=>{theirs.pd3=pd3Of(d=>recordScore(d.reading,'r1',70,null,20));});
 assert.equal(merged.pd3.reading.r1.attempts,1);
 const onlyOurs=twoTabs(null,ours=>{ours.pd3=pd3Of(d=>{d.plan.examDate='2026-12-01';});},()=>{});
 assert.equal(onlyOurs.pd3.plan.examDate,'2026-12-01');
 const none=twoTabs(null,()=>{},()=>{});assert.ok(!('pd3' in none));
});

test('tabs: the newest draft wins, self-assessments are merged per criterion and the newest one wins a clash',()=>{
 const base=s=>{s.pd3=pd3Of(d=>{d.writing.w=writing('v0',1,{self:{content:2,grammar:2}});});};
 const merged=twoTabs(base,
  ours=>{ours.pd3.writing.w={...ours.pd3.writing.w,draft:'ours edit',updatedAt:10,self:{content:4,grammar:2}};},
  theirs=>{theirs.pd3.writing.w={...theirs.pd3.writing.w,draft:'theirs edit',updatedAt:20,self:{content:5,grammar:2,vocabulary:3}};});
 assert.equal(merged.pd3.writing.w.draft,'theirs edit');assert.equal(merged.pd3.writing.w.updatedAt,20);
 assert.deepEqual(merged.pd3.writing.w.self,{content:5,grammar:2,vocabulary:3});
 const oursNewer=twoTabs(base,ours=>{ours.pd3.writing.w={...ours.pd3.writing.w,draft:'ours edit',updatedAt:30};},theirs=>{theirs.pd3.writing.w={...theirs.pd3.writing.w,draft:'theirs edit',updatedAt:20};});
 assert.equal(oursNewer.pd3.writing.w.draft,'ours edit');
 const oneSide=twoTabs(base,ours=>{ours.pd3.writing.w.self={content:2,grammar:5};ours.pd3.writing.w.updatedAt=15;},theirs=>{theirs.pd3.writing.w.draft='typed elsewhere';theirs.pd3.writing.w.updatedAt=12;});
 assert.equal(oneSide.pd3.writing.w.draft,'typed elsewhere','the tab that did not touch the draft does not overwrite it');
 assert.equal(oneSide.pd3.writing.w.self.grammar,5,'and its self-assessment is not lost');
 const oral=twoTabs(null,ours=>{ours.pd3=pd3Of(d=>{d.oral['mono-a']={keywords:['a'],self:{fluency:3},done:true,updatedAt:5};});},theirs=>{theirs.pd3=pd3Of(d=>{d.oral['mono-a']={keywords:['b'],self:{fluency:4},done:true,updatedAt:9};});});
 assert.deepEqual(oral.pd3.oral['mono-a'].keywords,['b']);assert.equal(oral.pd3.oral['mono-a'].self.fluency,4);
});

test('tabs: reader settings follow "changed in this tab"; each tab keeps its own change',()=>{
 const merged=twoTabs(s=>{s.pd3=pd3Of(d=>{d.settings.reader.rate=0.9;});},
  ours=>{ours.pd3.settings.reader.rate=0.6;},theirs=>{theirs.pd3.settings.dictation.strict=true;theirs.pd3.settings.reader.follow=false;});
 assert.equal(merged.pd3.settings.reader.rate,0.6);assert.equal(merged.pd3.settings.dictation.strict,true);assert.equal(merged.pd3.settings.reader.follow,false);
 const clash=twoTabs(s=>{s.pd3=pd3Of(d=>{d.settings.reader.rate=0.9;});},ours=>{ours.pd3.settings.reader.rate=0.75;},theirs=>{theirs.pd3.settings.reader.rate=1;});
 assert.equal(clash.pd3.settings.reader.rate,0.75,'the tab that is saving wins a clash, as for the other settings');
});

test('tabs: deletions are not lost and an edit beats a deletion; statistics and the exam date merge',()=>{
 const base=s=>{s.pd3=pd3Of(d=>{d.writing.keep=writing('keep',1);d.writing.gone=writing('gone',1);d.oral['mono-x']={keywords:[],self:{},done:false,updatedAt:1};d.stats.dictation={runs:2,errors:{aeoa:4}};});};
 const merged=twoTabs(base,
  ours=>{delete ours.pd3.writing.gone;ours.pd3.stats.dictation={runs:3,errors:{aeoa:6,double:1}};ours.pd3.plan.examDate='2026-12-01';},
  theirs=>{theirs.pd3.oral['mono-x'].keywords=['edited'];theirs.pd3.stats.dictation={runs:4,errors:{aeoa:5,silent:2}};});
 assert.ok(!('gone' in merged.pd3.writing),'deleted in one tab, untouched in the other');assert.ok('keep' in merged.pd3.writing);
 assert.deepEqual(merged.pd3.oral['mono-x'].keywords,['edited']);
 assert.equal(merged.pd3.stats.dictation.runs,5);assert.deepEqual(merged.pd3.stats.dictation.errors,{aeoa:7,double:1,silent:2});
 assert.equal(merged.pd3.plan.examDate,'2026-12-01');
 const edited=twoTabs(base,ours=>{delete ours.pd3.writing.gone;},theirs=>{theirs.pd3.writing.gone.draft='still writing';theirs.pd3.writing.gone.updatedAt=4;});
 assert.equal(edited.pd3.writing.gone.draft,'still writing','a record edited elsewhere is kept');
});

test('tabs: XP paid in two tabs adds up once per activity (best percent) and per day',()=>{
 const start=stateWith(s=>{s.pd3=pd3Of(d=>recordScore(d.reading,'r1',50,null,1));});
 const a=awardPd3(start,{kind:'reading',id:'r1',percent:80,minutes:1},day).state;
 const b=awardPd3(start,{kind:'dictation',id:'d1',percent:100,minutes:1},day).state;
 const merged=validateState(mergeProgress(start,validateState(a),validateState(b)));
 assert.equal(merged.xp,a.xp+b.xp);assert.equal(merged.pd3.xp.items['reading:r1'],80);assert.equal(merged.pd3.xp.items['dictation:d1'],100);
 assert.equal(merged.pd3.xp.today,a.pd3.xp.today+b.pd3.xp.today);
});

test('merging is stable: merging identical copies changes nothing',()=>{
 const s=stateWith(x=>{x.pd3=pd3Of(d=>{recordScore(d.reading,'r',70,null,3);d.writing.w=writing('t',2,{self:{content:3}});d.oral['mono-a']={keywords:['k'],self:{fluency:2},done:true,updatedAt:4};d.stats.dictation={runs:1,errors:{double:2}};});});
 const merged=validateState(mergeProgress(s,s,s));
 assert.deepEqual(merged.pd3,s.pd3);
 assert.deepEqual(mergePd3Tabs(undefined,undefined,undefined),undefined);
});

/* cloud */
const META='danskdag.cloud.v1';
class CloudStorage{map=new Map();getItem(k){return this.map.get(k)??null;}setItem(k,v){this.map.set(k,String(v));}removeItem(k){this.map.delete(k);}}
function cloudServer(initial=null){
 let snapshot={revision:initial?1:0,state:initial,updatedAt:initial?'2026-10-23T09:00:00.000Z':null};
 return {get snapshot(){return structuredClone(snapshot);},
  async fetch(url,options={}){
   if(options.method!=='PUT')return Response.json(snapshot);
   const body=JSON.parse(options.body);
   if(body.revision!==snapshot.revision)return Response.json(snapshot,{status:409});
   snapshot={revision:snapshot.revision+1,state:body.state,updatedAt:'2026-10-23T11:00:00.000Z'};return Response.json(snapshot);}};
}

test('cloud: PD3 data syncs like the rest of the progress (hash base, upload, pull)',async t=>{
 const {createCloudSync}=await import('../dist/cloud-sync.mjs');
 const server=cloudServer();
 let state=stateWith(s=>{s.pd3=pd3Of(d=>recordScore(d.reading,'r1',60,null,5));s.xp=12;});
 const sync=createCloudSync({getState:()=>state,onRemote:next=>{state=next;},storage:new CloudStorage(),events:new EventTarget(),fetch:server.fetch,debounceMs:0,pollMs:0});
 t.after(()=>sync.stop());
 await sync.start();
 assert.equal(sync.status().phase,'saved');assert.deepEqual(server.snapshot.state.pd3,state.pd3);
 const next=structuredClone(state);recordScore(next.pd3.reading,'r1',90,null,9);state=validateState(next);sync.changed();await sync.flush();
 assert.equal(server.snapshot.state.pd3.reading.r1.best,90,'a change that only touches PD3 is detected and uploaded');
 assert.equal(sync.status().phase,'saved');
});

test('cloud: choosing the cloud version after a conflict keeps the PD3 results only this device has',async t=>{
 const {createCloudSync}=await import('../dist/cloud-sync.mjs');
 const remoteState=stateWith(s=>{s.xp=50;s.pd3=pd3Of(d=>{recordScore(d.reading,'r1',95,null,50);d.settings.reader.rate=0.6;d.xp.items['reading:r1']=95;});});
 const server=cloudServer(remoteState);
 let state=stateWith(s=>{s.xp=20;s.pd3=pd3Of(d=>{recordScore(d.reading,'r1',70,null,10);recordScore(d.dictation,'d9',85,null,11);d.writing.w=writing('only here',12);d.stats.dictation={runs:1,errors:{double:2}};});});
 const conflicts=[];
 const sync=createCloudSync({getState:()=>state,onRemote:remote=>{state=validateState(adoptRemoteState(remote,state));},onConflict:c=>conflicts.push(c),storage:new CloudStorage(),events:new EventTarget(),fetch:server.fetch,debounceMs:0,pollMs:0});
 t.after(()=>sync.stop());
 await sync.start();
 assert.equal(conflicts.length,1,'two different first versions are a conflict, as before');
 await sync.resolve('remote');
 assert.equal(state.xp,50,'XP comes from the chosen version');
 assert.equal(state.pd3.reading.r1.best,95);assert.equal(state.pd3.dictation.d9.best,85,'a result only the device had is kept');
 assert.equal(state.pd3.writing.w.draft,'only here');assert.equal(state.pd3.settings.reader.rate,0.6,'settings come from the chosen version');
 assert.equal(state.pd3.xp.items['reading:r1'],95);
 await sync.flush();
 assert.deepEqual(server.snapshot.state.pd3.dictation.d9,state.pd3.dictation.d9,'the combined progress is uploaded');
});

test('adoptRemoteState: no PD3 in the cloud copy gives the local results back but lets the XP be earned again',()=>{
 const local=stateWith(s=>{s.pd3=pd3Of(d=>{recordScore(d.reading,'r',80,null,1);d.xp={items:{'reading:r':80},day:'2026-10-23',today:8};});});
 const out=adoptRemoteState(createState(),local);
 assert.equal(out.pd3.reading.r.best,80);assert.deepEqual(out.pd3.xp,defaults().xp);
 const plain=createState();assert.equal(adoptRemoteState(plain,createState()),plain);
});

/* ---------- 5. XP, streak, day ---------- */

test('XP for PD3: first completion pays once, an improvement pays the difference, repeats pay nothing',()=>{
 let s=stateWith(()=>{});
 let r=awardPd3(s,{kind:'dictation',id:'ede-og-et',percent:50,minutes:2},day);
 assert.equal(r.counted,true);assert.equal(r.xp,Math.round(PD3_XP.dictation*0.5));assert.equal(r.state.xp,r.xp);assert.equal(r.first,true);
 const afterFirst=r.state;
 r=awardPd3(afterFirst,{kind:'dictation',id:'ede-og-et',percent:50,minutes:2},day);
 assert.equal(r.xp,0,'the same result again');assert.equal(r.state.xp,afterFirst.xp);
 r=awardPd3(afterFirst,{kind:'dictation',id:'ede-og-et',percent:30,minutes:2},day);assert.equal(r.xp,0,'a worse result');
 r=awardPd3(afterFirst,{kind:'dictation',id:'ede-og-et',percent:100,minutes:2},day);
 assert.equal(r.xp,PD3_XP.dictation-afterFirst.xp,'the total for one activity never exceeds its worth');
 assert.equal(r.state.pd3.xp.items['dictation:ede-og-et'],100);
 const again=awardPd3(r.state,{kind:'dictation',id:'ede-og-et',percent:100,minutes:2},day);assert.equal(again.xp,0);assert.equal(again.state.xp,r.state.xp);
 assert.equal(JSON.stringify(s),JSON.stringify(createState()),'the input state is not changed');
});

test('XP for PD3: nothing for an empty, failed or invalid attempt; no streak and no activity either',()=>{
 const s=createState();
 for(const percent of [0,PD3_MIN_PERCENT-1]){
  const r=awardPd3(s,{kind:'reading',id:'r',percent,minutes:1},day);
  assert.equal(r.counted,false);assert.equal(r.xp,0);assert.equal(r.state,s,'the very same state comes back');
 }
 for(const bad of [null,{},{kind:'nope',id:'r',percent:90},{kind:'reading',id:'Bad Id',percent:90},{kind:'reading',id:'r',percent:101},{kind:'reading',id:'r',percent:50.5},{kind:'reading',id:'r',percent:'90'}]){
  assert.equal(awardPd3(s,bad,day).counted,false,JSON.stringify(bad));
 }
 assert.equal(awardPd3(s,{kind:'reading',id:'r',percent:90},new Date(NaN)).counted,false);
 assert.equal(s.streak,0);assert.equal(s.lastDay,null);
});

test('XP for PD3 counts for the streak, the day goal and the "three days" achievement',()=>{
 let s=createState();
 s=awardPd3(s,{kind:'reading',id:'r1',percent:100,minutes:4},new Date('2026-10-21T10:00:00Z')).state;
 s=awardPd3(s,{kind:'listening',id:'l1',percent:100,minutes:3},new Date('2026-10-22T10:00:00Z')).state;
 const last=awardPd3(s,{kind:'exam-find',id:'e1',percent:100,minutes:5},new Date('2026-10-23T10:00:00Z'));
 s=last.state;
 assert.equal(s.streak,3);assert.equal(s.lastDay,'2026-10-23');
 assert.deepEqual(s.activity['2026-10-23'],{xp:PD3_XP['exam-find'],lessons:1,minutes:5});
 assert.equal(getAchievements(s).find(a=>a.id==='streak-3').earned,true);
 assert.equal(s.xp,PD3_XP.reading+PD3_XP.listening+PD3_XP['exam-find']);
 const sameDay=awardPd3(s,{kind:'reading',id:'r1',percent:100,minutes:2},new Date('2026-10-23T12:00:00Z'));
 assert.equal(sameDay.state.streak,3);assert.equal(sameDay.state.activity['2026-10-23'].lessons,1,'a repeat that pays nothing does not add another lesson');
 const skippedDay=awardPd3(s,{kind:'oral',id:'mono-a',percent:100,minutes:2},new Date('2026-10-26T10:00:00Z'));
 assert.equal(skippedDay.state.streak,1,'a gap restarts the streak, as for lessons');
 validateState(skippedDay.state);
});

test('XP for PD3: a day limit applies and the unpaid part is paid on a later day',()=>{
 let s=createState();
 const kinds=Object.keys(PD3_XP);
 let paid=0;
 for(let i=0;i<12;i++){const r=awardPd3(s,{kind:kinds[i%kinds.length],id:'item-'+i,percent:100,minutes:1},day);s=r.state;paid+=r.xp;}
 assert.equal(paid,PD3_DAY_XP);assert.equal(s.xp,PD3_DAY_XP);assert.equal(s.pd3.xp.today,PD3_DAY_XP);
 const capped=awardPd3(s,{kind:'exam-text',id:'x',percent:100,minutes:1},day);
 assert.equal(capped.xp,0);assert.equal(capped.counted,true,'it still counts as practice for the streak');assert.equal(capped.state.pd3.xp.items['exam-text:x']??0,0,'nothing is marked as paid');
 const nextDay=awardPd3(capped.state,{kind:'exam-text',id:'x',percent:100,minutes:1},new Date('2026-10-24T10:00:00Z'));
 assert.equal(nextDay.xp,PD3_XP['exam-text']);assert.equal(nextDay.state.pd3.xp.today,PD3_XP['exam-text']);
 const partial=awardPd3(createState(),{kind:'exam-text',id:'big',percent:100,minutes:1},day).state;
 const nearCap=structuredClone(partial);nearCap.pd3.xp.today=PD3_DAY_XP-10;
 const half=awardPd3(nearCap,{kind:'exam-text',id:'other',percent:100,minutes:1},day);
 assert.equal(half.xp,10);assert.ok(half.state.pd3.xp.items['exam-text:other']<100,'only the paid share is marked');
 const rest=awardPd3(half.state,{kind:'exam-text',id:'other',percent:100,minutes:1},new Date('2026-10-24T09:00:00Z'));
 assert.equal(half.xp+rest.xp,PD3_XP['exam-text']);
});

test('ordinary lessons are unaffected by the PD3 code',()=>{
 const s=finishSession(createState(),{id:'a',lessonId:'g-a1-1',correct:3,total:5,minutes:2},day);
 assert.equal(s.xp,30);assert.equal(s.streak,1);assert.ok(!('pd3' in s));
 const mixed=awardPd3(s,{kind:'reading',id:'r',percent:100,minutes:1},day).state;
 assert.equal(mixed.streak,1,'a lesson and PD3 on the same day are one day');assert.equal(mixed.activity['2026-10-23'].lessons,2);
});

/* ---------- recovery copies ---------- */

test('recovery copies keep and describe progress that contains PD3 data',async()=>{
 const {saveProgressCopy,listProgressCopies,describeProgress,loadProgress}=await import('../dist/recovery.mjs');
 const state=stateWith(s=>{s.xp=40;s.pd3=pd3Of(d=>{recordScore(d.reading,'r1',70,null,3);d.writing.w=writing('draft',4);});});
 const storage=new MemoryStorage(),raw=JSON.stringify(state);
 assert.equal(saveProgressCopy(storage,'danskdag.progress.v1',raw,'import'),true);
 const [copy]=listProgressCopies(storage,'danskdag.progress.v1',text=>describeProgress(text,validateState));
 assert.equal(copy.xp,40);assert.equal(copy.raw,raw);
 assert.deepEqual(validateState(JSON.parse(copy.raw)).pd3,state.pd3,'restoring the copy brings the PD3 results back');
 storage.setItem('danskdag.progress.v1',raw);
 assert.deepEqual(loadProgress(storage,'danskdag.progress.v1',validateState,createState).state.pd3,state.pd3);
});
