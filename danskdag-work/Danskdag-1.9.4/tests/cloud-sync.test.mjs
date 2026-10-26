import test from 'node:test';
import assert from 'node:assert/strict';
import {createState} from '../dist/engine.mjs';
import {createHash} from 'node:crypto';
const META='danskdag.cloud.v1',RECOVERY='danskdag.cloud.recovery.v1';
class Storage {
  map=new Map([['danskdag.progress.v1','original progress'],['danskdag.session.v1','unfinished session']]);
  getItem(key){return this.map.get(key)??null;}
  setItem(key,value){this.map.set(key,String(value));}
  removeItem(key){this.map.delete(key);}
}
function server(initial=null) {
  let snapshot={revision:initial?1:0,state:initial,updatedAt:initial?'2026-10-23T09:00:00.000Z':null};
  const calls=[];
  let offline=false,hold=null,corrupt=false;
  return {
    calls, get snapshot(){return structuredClone(snapshot);},
    set offline(value){offline=value;},set corrupt(value){corrupt=value;},
    remote(state){snapshot={revision:snapshot.revision+1,state:structuredClone(state),updatedAt:'2026-10-23T10:00:00.000Z'};},
    holdPut(){let release;const wait=new Promise(r=>release=r);hold={wait,release};return release;},
    async fetch(url,options={}) {
      calls.push({method:options.method||'GET',body:options.body&&JSON.parse(options.body)});
      if(offline) throw new TypeError('offline');
      if(corrupt)return new Response(JSON.stringify({revision:9,state:{xp:-1},updatedAt:'today'}),{status:200});
      if(options.method!=='PUT') return Response.json(snapshot);
      if(hold){const h=hold;hold=null;await h.wait;}
      const body=JSON.parse(options.body);
      if(body.revision!==snapshot.revision)return Response.json(snapshot,{status:409});
      snapshot={revision:snapshot.revision+1,state:body.state,updatedAt:'2026-10-23T11:00:00.000Z'};
      return Response.json(snapshot);
    }
  };
}
async function harness(t,{local=createState(),remote=null,storage=new Storage(),backend=server(remote),canApply=()=>true,requestTimeoutMs=15000}={}) {
  const {createCloudSync}=await import('../dist/cloud-sync.mjs');
  const events=new EventTarget(),statuses=[],conflicts=[],applied=[];
  let state=structuredClone(local);
  const sync=createCloudSync({getState:()=>state,onRemote:next=>{state=next;applied.push(structuredClone(next));},onStatus:value=>statuses.push(value),onConflict:value=>conflicts.push(value),canApply,fetch:backend.fetch.bind(backend),storage,events,debounceMs:10000,pollMs:0,requestTimeoutMs});
  t.after(()=>sync.stop());
  return {sync,backend,storage,events,statuses,conflicts,applied,get state(){return state;},change(next){state=structuredClone(next);sync.changed();}};
}
const xp=value=>({...createState(),xp:value});
test('adding the default language does not turn a clean legacy cloud base into a conflict',async t=>{
 const legacy=xp(10);delete legacy.settings.language;
 const canonical=JSON.stringify(legacy,(_,v)=>v&&typeof v==='object'&&!Array.isArray(v)?Object.fromEntries(Object.keys(v).sort().map(k=>[k,v[k]])):v);
 const storage=new Storage();storage.setItem(META,JSON.stringify({version:1,revision:1,baseHash:createHash('sha256').update(canonical).digest('hex'),updatedAt:'2026-10-23T09:00:00.000Z',pending:false}));
 const h=await harness(t,{local:xp(10),remote:xp(20),storage});await h.sync.start();
 assert.equal(h.state.xp,20);assert.equal(h.state.settings.language,'uk');assert.equal(h.conflicts.length,0);assert.equal(h.sync.status().phase,'saved');
});
test('an explicit Russian choice survives comparison with an unchanged legacy cloud base',async t=>{
 const legacy=xp(10);delete legacy.settings.language;
 const canonical=JSON.stringify(legacy,(_,v)=>v&&typeof v==='object'&&!Array.isArray(v)?Object.fromEntries(Object.keys(v).sort().map(k=>[k,v[k]])):v);
 const storage=new Storage();storage.setItem(META,JSON.stringify({version:1,revision:1,baseHash:createHash('sha256').update(canonical).digest('hex'),updatedAt:'2026-10-23T09:00:00.000Z',pending:true}));
 const local=xp(10);local.settings.language='ru';const h=await harness(t,{local,remote:legacy,storage});await h.sync.start();
 assert.equal(h.state.settings.language,'ru');assert.equal(h.backend.snapshot.state.settings.language,'ru');assert.equal(h.conflicts.length,0);assert.equal(h.sync.status().phase,'saved');
});

test('explicit sync check fetches a new remote revision even after a clean initial save',async t=>{
 const h=await harness(t,{local:xp(10)});await h.sync.start();
 h.backend.remote(xp(30));
 assert.equal(typeof h.sync.refresh,'function');
 await h.sync.refresh();
 assert.equal(h.state.xp,30);assert.equal(h.sync.status().phase,'saved');
});

test('fresh device pulls cloud progress without losing unknown legacy IDs',async t=>{
  const remote=xp(120);remote.bookmarks=['retired-word'];remote.completed['retired-lesson']={best:80,attempts:2};
  const h=await harness(t,{remote});await h.sync.start();
  assert.deepEqual(h.state,remote);assert.equal(h.sync.status().phase,'saved');assert.equal(h.backend.calls.length,1);
  assert.equal(h.storage.getItem('danskdag.session.v1'),'unfinished session');
});

test('different nonempty first connection preserves both versions and pauses writes until explicit choice',async t=>{
  const h=await harness(t,{local:xp(80),remote:xp(120)});await h.sync.start();
  assert.equal(h.sync.status().phase,'conflict');assert.equal(h.state.xp,80);assert.equal(h.conflicts.length,1);
  assert.equal(h.conflicts[0].local.xp,80);assert.equal(h.conflicts[0].remote.xp,120);
  h.change(xp(90));await h.sync.flush();assert.equal(h.backend.calls.filter(c=>c.method==='PUT').length,0);
  await h.sync.resolve('local');assert.equal(h.backend.snapshot.state.xp,90);assert.equal(h.backend.snapshot.revision,2);
  const recovery=JSON.parse(h.storage.getItem(RECOVERY));assert.equal(recovery.local.xp,90);assert.equal(recovery.remote.xp,120);
  assert.equal(h.storage.getItem('danskdag.progress.v1'),'original progress');
});

test('offline outbox survives restart and retries on online without a manual resave',async t=>{
  const storage=new Storage(),backend=server();let h=await harness(t,{storage,backend,local:xp(40)});
  await h.sync.start();assert.equal(backend.snapshot.state.xp,40);
  backend.offline=true;h.change(xp(60));await h.sync.flush();
  assert.equal(h.sync.status().phase,'offline');assert.equal(JSON.parse(storage.getItem(META)).pending,true);
  h.sync.stop();h=await harness(t,{storage,backend,local:xp(60)});await h.sync.start();assert.equal(h.state.xp,60);
  backend.offline=false;h.events.dispatchEvent(new Event('online'));await h.sync.flush();
  assert.equal(backend.snapshot.state.xp,60);assert.equal(h.sync.status().phase,'saved');
});

test('changes made during a save are subsequently saved instead of acknowledged prematurely',async t=>{
  const h=await harness(t,{local:xp(10)});await h.sync.start();
  const release=h.backend.holdPut();h.change(xp(20));const saving=h.sync.flush();
  while(h.backend.calls.filter(c=>c.method==='PUT').length<2)await new Promise(r=>setImmediate(r));
  h.change(xp(30));release();await saving;
  assert.equal(h.backend.snapshot.state.xp,30);assert.equal(h.sync.status().phase,'saved');
});

test('remote concurrent change produces 409 conflict, and a second racing resolution cannot overwrite it',async t=>{
  const h=await harness(t,{local:xp(10)});await h.sync.start();
  h.backend.remote(xp(20));h.change(xp(30));await h.sync.flush();
  assert.equal(h.sync.status().phase,'conflict');assert.equal(h.state.xp,30);assert.equal(h.backend.snapshot.state.xp,20);
  h.backend.remote(xp(40));await h.sync.resolve('local');
  assert.equal(h.sync.status().phase,'conflict');assert.equal(h.backend.snapshot.state.xp,40);
  await h.sync.resolve('remote');assert.equal(h.state.xp,40);assert.equal(h.sync.status().phase,'saved');
});

test('remote changes defer while a learning session is active and apply when it is safe',async t=>{
  let safe=false;const h=await harness(t,{remote:xp(100),canApply:()=>safe});
  await h.sync.start();assert.equal(h.state.xp,0);assert.equal(h.sync.status().phase,'deferred');assert.equal(h.applied.length,0);
  safe=true;await h.sync.flush();assert.equal(h.state.xp,100);assert.equal(h.sync.status().phase,'saved');
});

test('corrupt remote responses retain local progress and never write a replacement',async t=>{
  const backend=server(xp(100));backend.corrupt=true;
  const h=await harness(t,{local:xp(50),backend});await h.sync.start();
  assert.equal(h.state.xp,50);assert.equal(h.sync.status().phase,'error');
  assert.equal(backend.calls.filter(c=>c.method==='PUT').length,0);
  assert.equal(h.storage.getItem('danskdag.progress.v1'),'original progress');
});

test('a restart pulls a remote-only change automatically but prompts for independent local changes',async t=>{
  const storage=new Storage(),backend=server();let h=await harness(t,{local:xp(10),storage,backend});await h.sync.start();h.sync.stop();
  backend.remote(xp(20));h=await harness(t,{local:xp(10),storage,backend});await h.sync.start();assert.equal(h.state.xp,20);h.sync.stop();
  backend.remote(xp(30));h=await harness(t,{local:xp(25),storage,backend});await h.sync.start();
  assert.equal(h.sync.status().phase,'conflict');assert.equal(h.state.xp,25);assert.equal(h.conflicts[0].remote.xp,30);
});

test('unresolved conflict survives restart, including an offline restart',async t=>{
  const storage=new Storage(),backend=server(xp(20));let h=await harness(t,{local:xp(10),storage,backend});await h.sync.start();h.sync.stop();
  backend.offline=true;h=await harness(t,{local:xp(10),storage,backend});await h.sync.start();
  assert.equal(h.sync.status().phase,'conflict');assert.equal(h.conflicts[0].remote.xp,20);
  assert.equal(h.storage.getItem('danskdag.session.v1'),'unfinished session');
});

test('a local edit during asynchronous pull comparison cannot be overwritten',async t=>{
  const h=await harness(t,{local:xp(10)});await h.sync.start();h.backend.remote(xp(20));
  const original=crypto.subtle.digest.bind(crypto.subtle);let release,reached;
  const wait=new Promise(r=>release=r),waiting=new Promise(r=>reached=r);let held=false;
  t.mock.method(crypto.subtle,'digest',async(...args)=>{if(!held){held=true;reached();await wait;}return original(...args);});
  h.events.dispatchEvent(new Event('focus'));await waiting;h.change(xp(30));release();await h.sync.flush();
  assert.equal(h.state.xp,30);assert.equal(h.sync.status().phase,'conflict');assert.equal(h.backend.snapshot.state.xp,20);
});

test('an edit during remote-apply acknowledgement stays pending and is uploaded',async t=>{
  const h=await harness(t,{local:xp(10)});await h.sync.start();h.backend.remote(xp(20));
  const original=crypto.subtle.digest.bind(crypto.subtle);let release,reached,count=0;
  const wait=new Promise(r=>release=r),waiting=new Promise(r=>reached=r);
  t.mock.method(crypto.subtle,'digest',async(...args)=>{if(++count===3){reached();await wait;}return original(...args);});
  h.events.dispatchEvent(new Event('focus'));await waiting;assert.equal(h.state.xp,20);
  h.change(xp(30));release();await h.sync.flush();
  assert.equal(h.state.xp,30);assert.equal(h.backend.snapshot.state.xp,30);assert.equal(h.sync.status().phase,'saved');
});

test('a new local edit while a remote pull is deferred creates a conflict instead of replacing it',async t=>{
  let safe=false;const h=await harness(t,{remote:xp(100),canApply:()=>safe});await h.sync.start();
  h.change(xp(20));safe=true;await h.sync.flush();
  assert.equal(h.state.xp,20);assert.equal(h.sync.status().phase,'conflict');assert.equal(h.conflicts[0].remote.xp,100);
});

test('a full browser storage prevents replacement of nonempty local progress without a recovery copy',async t=>{
  const h=await harness(t,{local:xp(10)});await h.sync.start();h.backend.remote(xp(20));
  h.storage.setItem=()=>{throw new Error('quota');};h.events.dispatchEvent(new Event('focus'));await h.sync.flush();
  assert.equal(h.state.xp,10);assert.equal(h.sync.status().phase,'error');assert.equal(h.sync.status().storageWarning,true);
});

test('session-only persistence and repeated unchanged notifications do not write cloud revisions',async t=>{
  const h=await harness(t,{local:xp(10)});await h.sync.start();const before=h.backend.snapshot.revision;
  h.sync.changed();await h.sync.flush();h.sync.changed();await h.sync.flush();
  assert.equal(h.backend.snapshot.revision,before);assert.equal(h.sync.status().phase,'saved');
});

test('an explicit remote resolution handles unavailable recovery storage without rejecting or erasing progress',async t=>{
  const h=await harness(t,{local:xp(10),remote:xp(20)});await h.sync.start();
  h.storage.setItem=()=>{throw new Error('quota');};
  await assert.doesNotReject(h.sync.resolve('remote'));
  assert.equal(h.state.xp,10);assert.equal(h.sync.status().phase,'error');
  assert.equal(h.sync.status().hasConflict,true);
});

test('a stalled network request times out and leaves local progress available for retry',{timeout:300},async t=>{
  const backend={fetch:(_url,options)=>new Promise((_resolve,reject)=>options.signal?.addEventListener('abort',()=>reject(new TypeError('offline'))))};
  const h=await harness(t,{local:xp(10),backend,requestTimeoutMs:10});await h.sync.start();
  assert.equal(h.sync.status().phase,'offline');assert.equal(h.state.xp,10);
});

test('a local conflict resolution cannot overwrite cloud progress when its recovery copy cannot be saved',async t=>{
  const h=await harness(t,{local:xp(10),remote:xp(20)});await h.sync.start();
  h.storage.setItem=()=>{throw new Error('quota');};await h.sync.resolve('local');
  assert.equal(h.backend.snapshot.state.xp,20);assert.equal(h.state.xp,10);assert.equal(h.sync.status().phase,'error');
  assert.equal(h.sync.status().hasConflict,true);
});
