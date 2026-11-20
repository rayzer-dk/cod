export async function checkRelease(current,fetchRelease=globalThis.fetch){
 const controller=new AbortController(),timer=setTimeout(()=>controller.abort(),4000);timer?.unref?.();
 try{
  const response=await fetchRelease('/api/release',{cache:'no-store',credentials:'same-origin',signal:controller.signal});
  if(!response.ok||!response.headers.get('content-type')?.includes('application/json'))return false;
  const {version}=await response.json();if(typeof version!=='string'||!/^\d{1,3}\.\d{1,3}\.\d{1,3}$/.test(version))return false;
  const a=version.split('.').map(Number),b=current.split('.').map(Number),difference=a.findIndex((v,i)=>v!==b[i]);
  return difference>=0&&a[difference]>b[difference]?version:null;
 }catch{return false;}finally{clearTimeout(timer);}
}
// Static hosting has no release endpoint: a new version arrives as a new Service Worker. Asking for the update never touches /api/*.
export async function requestWorkerUpdate(serviceWorker=globalThis.navigator?.serviceWorker){
 let timer;
 try{
  const registration=await serviceWorker?.getRegistration?.('/');if(!registration)return false;
  // A check that never answers must not block the later ones.
  await Promise.race([registration.update(),new Promise((_,reject)=>{timer=setTimeout(()=>reject(Error('timeout')),20000);timer?.unref?.();})]);
  return registration.installing||registration.waiting?'updating':'current';
 }catch{return false;}finally{clearTimeout(timer);}
}
// After a worker change the page offers "update" only if the cached entry page is not the page that is already running.
// The running page is identified by the script hash in its Content-Security-Policy tag, which the build derives from the whole script.
export async function cachedPageIsCurrent(doc=globalThis.document,cacheStorage=globalThis.caches){
 try{
  const token=/sha256-[A-Za-z0-9+/]{43}=/.exec([...doc?.querySelectorAll?.('meta[http-equiv]')||[]].map(meta=>meta.content).join(' '))?.[0];
  // The new worker takes control while the previous cache may still exist, so the newest cache (last by creation order) is read.
  const names=token?(await cacheStorage?.keys()||[]).filter(name=>name.startsWith('danskdag-static-')):[];
  const cached=names.length&&await(await cacheStorage.open(names[names.length-1])).match('/index.html');
  return !!cached&&(await cached.text()).includes(token);
 }catch{return false;}
}
