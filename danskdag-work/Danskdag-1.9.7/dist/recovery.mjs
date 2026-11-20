// Rotating recovery copies of progress. Everything here is defensive: browser storage can be full,
// disabled or contain data written by another version, and none of that may ever lose the learner's data.
export const MAX_COPIES=3;
export const COPIES_SUFFIX='.copies';

const readList=(storage,key)=>{
  try{
    const list=JSON.parse(storage?.getItem(key)||'[]');
    return Array.isArray(list) ? list.filter(item=>item && typeof item==='object') : [];
  }catch{return [];}
};

/** Puts `entry` first in the list stored under `key`, keeping at most `max` distinct entries.
 * Entries that `same` considers equal to the new one are replaced rather than duplicated.
 * When the storage is full the oldest copies are dropped; returns false only if even the new entry cannot be stored. */
export function pushCopy(storage,key,entry,{max=MAX_COPIES,same=(a,b)=>a.raw===b.raw}={}) {
  if(!storage)return false;
  const list=[entry,...readList(storage,key).filter(item=>!same(item,entry))].slice(0,max);
  while(list.length){
    try{storage.setItem(key,JSON.stringify(list));return true;}
    catch{list.pop();}
  }
  return false;
}

/** Saves the raw progress text as a recovery copy. `reason` explains where it came from. */
export function saveProgressCopy(storage,key,raw,reason,now=Date.now()) {
  if(typeof raw!=='string' || !raw)return false;
  return pushCopy(storage,key+COPIES_SUFFIX,{savedAt:new Date(now).toISOString(),reason,raw});
}

/** Recovery copies, newest first. A copy written by older versions (`<key>.recovery`) is listed last. */
export function listProgressCopies(storage,key,summarize=()=>({})) {
  const copies=readList(storage,key+COPIES_SUFFIX).filter(item=>typeof item.raw==='string');
  let legacy=null;
  try{legacy=storage?.getItem(key+'.recovery')||null;}catch{ /* Storage may be unavailable. */ }
  if(legacy && !copies.some(item=>item.raw===legacy))copies.push({savedAt:null,reason:'legacy',raw:legacy});
  return copies.map((item,index)=>({id:index,savedAt:item.savedAt||null,reason:item.reason||'',raw:item.raw,...summarize(item.raw)}));
}

/** Reads and validates saved progress without ever changing what is stored. */
export function loadProgress(storage,key,validate,create) {
  let raw=null;
  try{raw=storage.getItem(key);}catch{return {status:'unavailable',state:create(),raw:null};}
  if(raw===null || raw===undefined)return {status:'empty',state:create(),raw:null};
  try{return {status:'ok',state:validate(JSON.parse(raw)),raw};}
  catch(error){return {status:'unreadable',state:create(),raw,error};}
}

/** Short description of a raw progress copy for lists, or an empty object if it cannot be read. */
export function describeProgress(raw,validate) {
  try{
    const state=validate(JSON.parse(raw));
    return {xp:state.xp,lessons:Object.keys(state.completed).length};
  }catch{return {xp:null,lessons:null,unreadable:true};}
}

/** "24.10.2026 12:30" in the viewer's local time. */
export function formatCopyTime(iso) {
  const date=new Date(iso);
  if(!iso || !Number.isFinite(date.getTime()))return '';
  const two=value=>String(value).padStart(2,'0');
  return `${two(date.getDate())}.${two(date.getMonth()+1)}.${date.getFullYear()} ${two(date.getHours())}:${two(date.getMinutes())}`;
}
