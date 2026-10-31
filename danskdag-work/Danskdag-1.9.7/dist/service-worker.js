const MANIFEST={"/index.html":"e252ce61491626b64620cbd231ad0f3997d583dd856efa629438589aadcc983d","/manifest.webmanifest":"e25c446c7f0d43d488675b7316728f6e9cc225a7d2d12dbfef7b53878a57b26c","/icon.svg":"a6e623571b7305903abbe9059384dcc233b6ebee7451d90eee27ed981bd44b91","/icon-192.png":"5c2587d996df4c5abb4bffead54c821743aed45fa8e5e13e8c9fe37e09983bf2","/icon-512.png":"dbb222bda4cd44b333509afec4848d33aec4432f4095683c8c8dcc0e831e575e","/flag-dk.svg":"a9db2939c6736db071b3cf6f01a435ccf310d020b6c8e7371bbbfc2e88a714ce"};
const CACHE='danskdag-static-4ed46211f46f26e5e327',NETWORK_TIMEOUT=3000;
async function loadAsset(path,cache){
 const response=await fetch(new URL(path,self.location.origin).href,{cache:'reload',credentials:'same-origin'});
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
}
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
  if(pathname==='/index.html'){
   try{
    const response=await fetchWithTimeout(url.href,{cache:'no-cache',credentials:'same-origin'});
    if(response.ok&&!response.redirected&&/^\d+\.\d+\.\d+$/.test(response.headers.get('x-danskdag-version')||''))return response;
   }catch{}
  }
  const cache=await caches.open(CACHE);return await cache.match(pathname)||loadAsset(pathname,cache);
 })());
});
