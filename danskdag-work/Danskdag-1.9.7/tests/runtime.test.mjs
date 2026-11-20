import test from 'node:test';
import assert from 'node:assert/strict';
const runtime=await import('../dist/runtime.mjs').catch(()=>({}));
test('HTML edition is independent of host protocol and resolves embedded images',()=>{
 assert.equal(typeof runtime.isOfflineEdition,'function','Missing offline runtime');
 assert.equal(runtime.isOfflineEdition('file:',''),true);
 assert.equal(runtime.isOfflineEdition('https:','true'),true);
 assert.equal(runtime.isOfflineEdition('https:',''),false);
 assert.equal(runtime.assetUrl('/icon.svg?v=1',{ '/icon.svg':'data:image/svg+xml,icon' }),'data:image/svg+xml,icon');
 assert.equal(runtime.assetUrl('/icon.svg?v=1',{}),'/icon.svg?v=1');
});
test('an existing offline controller update is reported without reloading or touching progress',async()=>{
 const descriptor=Object.getOwnPropertyDescriptor(globalThis,'navigator'),listeners=new Map();let notified=0;
 const serviceWorker={controller:null,addEventListener:(key,fn)=>listeners.set(key,fn),removeEventListener:(key)=>listeners.delete(key),register:async()=>({}),ready:Promise.resolve({active:{}})};
 Object.defineProperty(globalThis,'navigator',{configurable:true,value:{serviceWorker}});
 try{
  assert.equal(await runtime.prepareOfflineCache(()=>notified++),true);
  assert.equal(typeof listeners.get('controllerchange'),'function');
  serviceWorker.controller={id:'first'};listeners.get('controllerchange')();assert.equal(notified,0);
  serviceWorker.controller={id:'second'};listeners.get('controllerchange')();assert.equal(notified,1);listeners.get('controllerchange')();assert.equal(notified,1);
 }finally{if(descriptor)Object.defineProperty(globalThis,'navigator',descriptor);else delete globalThis.navigator;}
});
