import fs from 'node:fs';
import path from 'node:path';
import {createHash} from 'node:crypto';

// mode 'worker': the platform Worker marks genuine pages with x-danskdag-version.
// mode 'static': any plain static host; the entry page is accepted when it is a successful, non-redirected HTML page of this app.
const ENTRY_WORKER=`  if(pathname==='/index.html'){
   try{
    const response=await fetchWithTimeout(url.href,{cache:'no-cache',credentials:'same-origin'});
    if(response.ok&&!response.redirected&&/^\\d+\\.\\d+\\.\\d+$/.test(response.headers.get('x-danskdag-version')||''))return response;
   }catch{}
  }`;
// A static host answers /index.html with a redirect to / (Cloudflare Pages), and /open does not exist there: the entry page is always requested as /.
// A captive portal or error page that is still "200 text/html" lacks the version tag in its head and is not accepted.
const ENTRY_STATIC=`  if(pathname==='/index.html'){
   try{
    const target=new URL(url.pathname==='/open'||url.pathname==='/index.html'?'/':url.pathname,url.origin);target.search=url.search;
    const response=await fetchWithTimeout(target.href,{cache:'no-cache',credentials:'same-origin'});
    if(await isAppPage(response))return response;
   }catch{}
  }`;
const HELPERS_STATIC=`
async function isAppPage(response){
 if(!response.ok||response.redirected||!/^text\\/html\\b/i.test(response.headers.get('content-type')||''))return false;
 const reader=response.clone().body?.getReader();if(!reader)return false;
 const decoder=new TextDecoder();let head='';
 try{while(head.length<4096){const part=await reader.read();if(part.done)break;head+=decoder.decode(part.value,{stream:true});}}finally{reader.cancel().catch(()=>{});}
 return head.includes('<meta name="danskdag-version"');
}`;
export function makeServiceWorker(manifest,{networkTimeoutMs=3000,mode='worker'}={}){
 if(!['worker','static'].includes(mode))throw Error('Unknown service worker mode: '+mode);
 const isStatic=mode==='static';
 const source=`const MANIFEST=${JSON.stringify(manifest)};\nconst CACHE='__DANSKDAG_CACHE_KEY__',NETWORK_TIMEOUT=${Number(networkTimeoutMs)};
async function loadAsset(path,cache){
 const response=await fetch(new URL(${isStatic?"path==='/index.html'?'/':path":'path'},self.location.origin).href,{cache:'reload',credentials:'same-origin'});
 if(!response.ok||response.redirected)throw Error('Static asset unavailable: '+path);
 const digest=await crypto.subtle.digest('SHA-256',await response.clone().arrayBuffer());
 const hash=Array.from(new Uint8Array(digest),b=>b.toString(16).padStart(2,'0')).join('');
 if(hash!==MANIFEST[path])throw Error('Static asset hash mismatch: '+path);
 await cache.put(path,response.clone());return response;
}
// A slow or hanging connection must not keep the learner waiting: after NETWORK_TIMEOUT the verified cached copy is used.
async function fetchWithTimeout(href,options){
 if(typeof AbortController!=='function'||typeof setTimeout!=='function')return fetch(href,options);
 const controller=new AbortController(),timer=setTimeout(()=>controller.abort(),NETWORK_TIMEOUT);
 try{return await fetch(href,{...options,signal:controller.signal});}finally{clearTimeout(timer);}
}${isStatic?HELPERS_STATIC:''}
self.addEventListener('install',event=>event.waitUntil((async()=>{
 try{const cache=await caches.open(CACHE);await Promise.all(Object.keys(MANIFEST).map(path=>loadAsset(path,cache)));await self.skipWaiting();}
 catch(error){await caches.delete(CACHE);throw error;}
})()));
self.addEventListener('activate',event=>event.waitUntil((async()=>{
 for(const key of await caches.keys())if(key.startsWith('danskdag-static-')&&key!==CACHE)await caches.delete(key);
 await self.clients.claim();
})()));
self.addEventListener('fetch',event=>{
 if(event.request.method!=='GET')return;
 const url=new URL(event.request.url),pathname=['/','/open'].includes(url.pathname)?'/index.html':url.pathname;
 if(url.origin!==self.location.origin||!Object.hasOwn(MANIFEST,pathname))return;
 event.respondWith((async()=>{
${isStatic?ENTRY_STATIC:ENTRY_WORKER}
  const cache=await caches.open(CACHE);return await cache.match(pathname)||loadAsset(pathname,cache);
 })());
});\n`;
 const key='danskdag-static-'+createHash('sha256').update(source).digest('hex').slice(0,20);
 return source.replace('__DANSKDAG_CACHE_KEY__',key);
}

export function writeServiceWorker(projectDirectory){
 const root=path.join(path.resolve(projectDirectory),'dist'),manifest={};
 for(const name of ['index.html','manifest.webmanifest','icon.svg','icon-192.png','icon-512.png','flag-dk.svg']){
  const filename=path.join(root,name);if(fs.existsSync(filename))manifest['/'+name]=createHash('sha256').update(fs.readFileSync(filename)).digest('hex');
 }
 fs.writeFileSync(path.join(root,'service-worker.js'),makeServiceWorker(manifest));return Object.keys(manifest).length;
}
