// One-time move of PD3 results from their own storage key (versions 1.9.2 and earlier) into the learner's progress as `state.pd3`.
// Nothing is deleted before the progress that contains the results has been saved, and the old content is kept under another key.
import {PD3_KEY,validatePd3,mergePd3,sealPd3} from './pd3-store.mjs';

export const MIGRATED_KEY=`${PD3_KEY}.migrated`;
const same=(a,b)=>JSON.stringify(a)===JSON.stringify(b);

/** `save(nextState)` stores the progress and returns whether it worked. Returns {status,state}:
 * none (nothing to move), migrated, unreadable (old data left untouched), failed (progress could not be saved; old data left untouched). */
export function migrateLegacyPd3(storage,state,save){
  let raw=null;
  try{raw=storage.getItem(PD3_KEY);}catch{return {status:'none',state};}
  if(raw===null||raw===undefined)return {status:'none',state};
  let legacy;
  try{legacy=validatePd3(JSON.parse(raw));}catch{return {status:'unreadable',state};}
  // Best scores and newer drafts of both sides are kept; the settings already in the progress stay.
  const merged=sealPd3(state.pd3?mergePd3(structuredClone(state.pd3),legacy):legacy,state.pd3?._unknown);
  let next=state;
  if(!same(merged,state.pd3)){
    next={...state,pd3:merged};
    let saved=false;
    try{saved=save(next)!==false;}catch{saved=false;}
    if(!saved)return {status:'failed',state};
  }
  try{
    storage.setItem(MIGRATED_KEY,raw);
    if(storage.getItem(MIGRATED_KEY)===raw)storage.removeItem(PD3_KEY);
  }catch{ /* The old key stays; the next start finds nothing new to merge and only retries this step. */ }
  return {status:'migrated',state:next};
}
