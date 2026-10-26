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
