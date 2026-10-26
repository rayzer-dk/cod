import test from 'node:test';
import assert from 'node:assert/strict';
import {createState} from '../dist/engine.mjs';
import {createCloudSync,listCloudCopies} from '../dist/cloud-sync.mjs';
const META='danskdag.cloud.v1',RECOVERY='danskdag.cloud.recovery.v1';
class Storage {
  map=new Map();
  getItem(key){return this.map.get(key)??null;}
  setItem(key,value){this.map.set(key,String(value));}
  removeItem(key){this.map.delete(key);}
}
const xp=value=>({...createState(),xp:value});
function backend(initial=null){
  let snapshot={revision:initial?1:0,state:initial,updatedAt:initial?'2026-10-23T09:00:00.000Z':null},hook=null;
  return {
    get snapshot(){return structuredClone(snapshot);},
    remote(state){snapshot={revision:snapshot.revision+1,state:structuredClone(state),updatedAt:'2026-10-23T10:00:00.000Z'};},
    beforePut(fn){hook=fn;},
    async fetch(url,options={}){
      if(options.method!=='PUT')return Response.json(snapshot);
      if(hook){const run=hook;hook=null;run();}
      const body=JSON.parse(options.body);
      if(body.revision!==snapshot.revision)return Response.json(snapshot,{status:409});
      snapshot={revision:snapshot.revision+1,state:body.state,updatedAt:'2026-10-23T11:00:00.000Z'};
      return Response.json(snapshot);
    }
  };
}
async function open(t,{local,remote=null,storage=new Storage(),server=backend(remote)}){
  const events=new EventTarget();let state=structuredClone(local);
  const sync=createCloudSync({getState:()=>state,onRemote:next=>{state=next;},fetch:server.fetch.bind(server),storage,events,debounceMs:10000,pollMs:0});
  t.after(()=>sync.stop());
  return {sync,server,storage,events,get state(){return state;},change(next){state=structuredClone(next);sync.changed();}};
}

test('replacement copies rotate: three device versions are kept, the oldest falls away',async t=>{
  const storage=new Storage();
  for(const local of [10,20,30,40]){
    const h=await open(t,{local:xp(local),remote:xp(500+local),storage});
    await h.sync.start();
    assert.equal(h.sync.status().phase,'conflict');
    await h.sync.resolve('remote');
    assert.equal(h.state.xp,500+local);
    h.sync.stop();
    // Return to the same unresolved first-connection situation for the next round.
    storage.removeItem(META);
  }
  const copies=listCloudCopies(storage);
  assert.deepEqual(copies.map(copy=>copy.local.xp),[40,30,20]);
  assert.ok(copies.every(copy=>typeof copy.savedAt==='string'&&copy.reason.length>0));
  const latest=JSON.parse(storage.getItem(RECOVERY));
  assert.equal(latest.local.xp,40);assert.equal(latest.remote.xp,540);
});

test('the old single-slot record is still read, and rotates into the history on the next replacement',async t=>{
  const storage=new Storage();
  storage.setItem(RECOVERY,JSON.stringify({version:1,revision:3,updatedAt:'2026-10-23T10:00:00.000Z',local:xp(7),remote:xp(8),unresolved:false,reason:'remote-applied',savedAt:'2026-10-20T10:00:00.000Z'}));
  assert.deepEqual(listCloudCopies(storage).map(copy=>copy.local.xp),[7]);
  const h=await open(t,{local:xp(50),remote:xp(60),storage});
  await h.sync.start();await h.sync.resolve('local');
  assert.deepEqual(listCloudCopies(storage).map(copy=>copy.local.xp),[50,7]);
  assert.equal(listCloudCopies(storage)[1].savedAt,'2026-10-20T10:00:00.000Z');
});

test('copies equal to an existing one are not duplicated and damaged records are skipped',()=>{
  const storage=new Storage();
  storage.setItem(RECOVERY,JSON.stringify({local:xp(1),savedAt:'2026-10-24T10:00:00.000Z'}));
  storage.setItem('danskdag.cloud.recovery.history.v1',JSON.stringify([{local:xp(1)},{local:{xp:-5}},null,{local:xp(2),savedAt:'2026-10-23T10:00:00.000Z'}]));
  assert.deepEqual(listCloudCopies(storage).map(copy=>copy.local.xp),[1,2]);
  assert.deepEqual(listCloudCopies(new Storage()),[]);
  storage.setItem(RECOVERY,'{broken');storage.setItem('danskdag.cloud.recovery.history.v1','nope');
  assert.deepEqual(listCloudCopies(storage),[]);
});

test('a concurrent save of exactly the same progress is acknowledged instead of becoming a conflict',async t=>{
  const server=backend();
  const h=await open(t,{local:xp(10),server});
  await h.sync.start();
  assert.equal(server.snapshot.state.xp,10);
  h.change(xp(25));
  // Another tab uploads the very same progress just before our request arrives.
  server.beforePut(()=>server.remote(xp(25)));
  await h.sync.flush();
  assert.equal(h.sync.status().phase,'saved');
  assert.equal(h.sync.status().hasConflict,false);
  assert.equal(h.state.xp,25);
});

test('sync metadata saved by another tab with a newer revision is adopted',async t=>{
  const storage=new Storage(),server=backend(xp(10));
  const h=await open(t,{local:xp(10),server,storage});
  await h.sync.start();
  const before=JSON.parse(storage.getItem(META));
  const hash='a'.repeat(64);
  h.events.dispatchEvent(Object.assign(new Event('storage'),{key:META,newValue:JSON.stringify({...before,revision:before.revision+4,baseHash:hash,pending:false})}));
  assert.equal(h.sync.status().revision,before.revision);
  assert.equal(typeof h.sync.rebase,'function');
  h.events.dispatchEvent(Object.assign(new Event('storage'),{key:META,newValue:'{broken'}));
  h.events.dispatchEvent(Object.assign(new Event('storage'),{key:'other',newValue:'x'}));
  h.sync.rebase();
});
