import test from 'node:test';
import assert from 'node:assert/strict';
import vm from 'node:vm';
import {createHash,webcrypto} from 'node:crypto';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
const builder=await import('../tools/build-pwa.mjs').catch(()=>({}));
const digest=text=>createHash('sha256').update(text).digest('hex');
test('a self-contained app caches its small install shell instead of refetching unused source modules',()=>{
 const root=fs.mkdtempSync(path.join(os.tmpdir(),'danskdag-shell-'));
 try{
  fs.mkdirSync(path.join(root,'dist'));for(const file of ['index.html','manifest.webmanifest','icon.svg','icon-192.png','icon-512.png','app.mjs','styles.css'])fs.writeFileSync(path.join(root,'dist',file),'asset');
  builder.writeServiceWorker(root);const source=fs.readFileSync(path.join(root,'dist/service-worker.js'),'utf8');
  const manifest=JSON.parse(/const MANIFEST=(.*);/.exec(source)[1]);assert.ok(manifest['/index.html']);assert.ok(manifest['/manifest.webmanifest']);assert.ok(manifest['/icon-192.png']);assert.equal(manifest['/app.mjs'],undefined);assert.equal(manifest['/styles.css'],undefined);
 }finally{fs.rmSync(root,{recursive:true,force:true});}
});
test('offline cache keeps only verified static assets and leaves progress requests untouched',async()=>{
 assert.equal(typeof builder.makeServiceWorker,'function','Missing offline cache builder');
 const bodies={'/index.html':'<html>Danskdag</html>','/app.mjs':'const lesson=128;'},handlers={},stores=new Map([['other-app-cache',new Map()],['danskdag-static-old',new Map()]]);
 let offline=false,networkCalls=0;
 const caches={keys:async()=>[...stores.keys()],delete:async key=>stores.delete(key),open:async key=>{if(!stores.has(key))stores.set(key,new Map());const map=stores.get(key);return {match:async p=>map.get(p)?.clone(),put:async(p,res)=>map.set(p,res.clone())};}};
 const self={location:{origin:'https://danskdag.example'},addEventListener:(key,fn)=>handlers[key]=fn,skipWaiting:async()=>{},clients:{claim:async()=>{}}};
 vm.runInNewContext(builder.makeServiceWorker(Object.fromEntries(Object.entries(bodies).map(([p,body])=>[p,digest(body)]))),{self,caches,URL,Response,crypto:webcrypto,fetch:async url=>{networkCalls++;if(offline)throw Error('offline');return new Response(bodies[new URL(url).pathname]);}});
 let pending;handlers.install({waitUntil:p=>pending=p});await pending;
 handlers.activate({waitUntil:p=>pending=p});await pending;
 assert.equal(stores.has('other-app-cache'),true);assert.equal(stores.has('danskdag-static-old'),false);
 for(const [url,method]of[['/api/progress','GET'],['/api/progress','POST'],['/private','GET'],['https://elsewhere.example/app.mjs','GET']]){
  let intercepted=false;handlers.fetch({request:{url:new URL(url,self.location.origin).href,method},respondWith:()=>intercepted=true});assert.equal(intercepted,false,url);
 }
 const before=networkCalls;offline=true;
 handlers.fetch({request:{url:self.location.origin+'/',method:'GET'},respondWith:p=>pending=p});
 assert.equal(await (await pending).text(),bodies['/index.html']);assert.equal(networkCalls,before+1);
});
test('navigation prefers a new coherent release and falls back for offline or sign-in pages',async()=>{
 const handlers={},cached='<html>old verified bundle</html>',fresh='<html>new complete bundle</html>';let state='fresh';
 const self={location:{origin:'https://danskdag.example'},addEventListener:(key,fn)=>handlers[key]=fn};
 const source=builder.makeServiceWorker({'/index.html':digest(cached)});
 vm.runInNewContext(source,{self,URL,Response,crypto:webcrypto,caches:{open:async()=>({match:async()=>new Response(cached)})},fetch:async()=>{
  if(state==='offline')throw Error('offline');
  return state==='login'?new Response('sign in'):new Response(fresh,{headers:{'x-danskdag-version':'1.7.3'}});
 }});
 for(const url of ['/','/open','/index.html']){
  let pending;state='fresh';handlers.fetch({request:{url:self.location.origin+url,method:'GET'},respondWith:p=>pending=p});assert.ok(pending,url);assert.equal(await (await pending).text(),fresh);
  for(state of ['offline','login']){handlers.fetch({request:{url:self.location.origin+url,method:'GET'},respondWith:p=>pending=p});assert.equal(await (await pending).text(),cached);}
 }
});
test('offline cache rejects changed or sign-in responses instead of storing them',async()=>{
 const handlers={},deleted=[];let stored=0;
 const self={location:{origin:'https://danskdag.example'},addEventListener:(key,fn)=>handlers[key]=fn,skipWaiting:async()=>{}};
 vm.runInNewContext(builder.makeServiceWorker({'/index.html':digest('actual app')}),{self,URL,Response,crypto:webcrypto,caches:{open:async()=>({put:async()=>stored++}),delete:async name=>deleted.push(name)},fetch:async()=>new Response('sign in instead')});
 let pending;handlers.install({waitUntil:p=>pending=p});await assert.rejects(pending,/mismatch/i);
 assert.equal(stored,0);assert.equal(deleted.length,1);
});
