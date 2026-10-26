import {validatePd3,sealPd3,emptyPd3,PD3_VERSION,PD3_LIMITS,PD3_STAT_KINDS,PD3_KEYS,capPd3Mocks} from './engine.mjs';
import {mergeSpell} from './pd3-spell.mjs';
// Data of the PD3 section. Since 1.9.3 it lives in the learner's progress as the optional field `state.pd3` (see engine.mjs);
// PD3_KEY is the storage key of versions 1.9.2 and earlier, still read once to migrate old results (pd3-migrate.mjs).
// The data schema (validatePd3, defaults, size limits) lives in engine.mjs, which the Worker bundles; this module re-exports it under the names the app and the tests use.
export const PD3_KEY='danskdag.pd3.v1';

export {validatePd3,sealPd3,emptyPd3,PD3_VERSION,PD3_KEYS};
export const LIMITS=PD3_LIMITS;
export const STAT_KINDS=PD3_STAT_KINDS;
export function defaults(){return emptyPd3();}
const SCORE_MAPS=['reading','listening','dictation'];
const pct=value=>Math.min(100,Math.max(0,Math.round(Number(value))||0));

function newer(a,b){return (b.updatedAt??b.at??0)>(a.updatedAt??a.at??0)?b:a;}
/** Mock exam records of two copies by id: the one saved later (updatedAt) wins; at most PD3_LIMITS.mocks newest are kept. */
export function mergeMocks(mine,theirs){
  const result={...(mine||{})};
  for(const [id,entry] of Object.entries(theirs||{}))result[id]=result[id]?newer(result[id],entry):entry;
  return capPd3Mocks(result);
}
/** Merges imported data into current data: higher best scores, newer drafts and self-assessments win. Settings stay as they are. */
export function mergePd3(current,incoming){
  const result=structuredClone(current);
  const mergeScores=(target,source)=>{
    for(const [id,entry] of Object.entries(source)){
      const mine=target[id];
      if(!mine){target[id]=entry;continue;}
      const pick=newer(mine,entry);
      target[id]={...pick,best:Math.max(mine.best,entry.best),attempts:Math.max(mine.attempts,entry.attempts)};
    }
  };
  for(const name of SCORE_MAPS)mergeScores(result[name],incoming[name]);
  mergeScores(result.exam.find,incoming.exam.find);mergeScores(result.exam.text,incoming.exam.text);
  for(const name of ['writing','oral'])for(const [id,entry] of Object.entries(incoming[name])){
    const mine=result[name][id];
    result[name][id]=mine?newer(mine,entry):entry;
  }
  // The exam date of the current data stays; an empty one takes the imported date. Error statistics are totals, so the larger one wins
  // (importing a copy of the same data twice must not count twice). XP records stay: importing gives no XP.
  if(!result.plan.examDate)result.plan.examDate=incoming.plan.examDate;
  result.stats.dictation.runs=Math.max(result.stats.dictation.runs,incoming.stats.dictation.runs);
  for(const [kind,count] of Object.entries(incoming.stats.dictation.errors))result.stats.dictation.errors[kind]=Math.max(result.stats.dictation.errors[kind]||0,count);
  const spell=mergeSpell(result.spell,incoming.spell);
  if(spell.length)result.spell=spell;
  const mocks=mergeMocks(result.mocks,incoming.mocks);
  if(Object.keys(mocks).length)result.mocks=mocks;
  result.updatedAt=Math.max(current.updatedAt,incoming.updatedAt);
  return result;
}

/** The PD3 section over the learner's progress. `read()` returns the stored `state.pd3` (or undefined while PD3 is unused),
 * `write(next)` puts a new object there, saves the progress and returns whether saving worked.
 * The field appears in the progress only after the first change, so learners who never open PD3 keep their data unchanged. */
export function createPd3StateStore({read,write,clock=()=>Date.now()}){
  const status={error:null,broken:false};
  const empty=defaults();
  const current=()=>read()||empty;
  function save(next,unknown){
    const clean=sealPd3(validatePd3(next),unknown);
    const ok=write(clean);
    status.error=ok?null:'quota';
    return ok;
  }
  return {
    status,
    load(){return current();},
    /** The stored data, or the defaults while PD3 is unused. Treat it as read-only: change it through update(). */
    get:current,
    /** Applies `change` to a copy of the stored data and saves it. Returns true when saved. */
    update(change){
      const base=structuredClone(current());
      change(base);
      base.updatedAt=clock();
      return save(base,base._unknown);
    },
    exportJson(){return JSON.stringify({app:'danskdag-pd3',...structuredClone(current()),_unknown:undefined},null,2);},
    importJson(raw){
      if(typeof raw!=='string'||raw.length>LIMITS.importBytes)return {ok:false,error:'size'};
      let incoming;
      try{incoming=validatePd3(JSON.parse(raw));}catch{return {ok:false,error:'format'};}
      const merged=mergePd3(structuredClone(current()),incoming);
      merged.updatedAt=Math.max(merged.updatedAt,clock());
      return save(merged,current()._unknown)?{ok:true}:{ok:false,error:status.error||'quota'};
    }
  };
}

/** A store over any Storage-like object. All writes are guarded: a full or blocked storage keeps the in-memory data and reports the error. */
/** A store over a Storage-like object under its own key (versions 1.9.2 and earlier). Given {read,write,clock} instead of a storage,
 * it is the store over the learner's progress (createPd3StateStore), which is what the app uses. */
export function createPd3Store(storage=globalThis.localStorage,key=PD3_KEY,clock=()=>Date.now()){
  if(storage&&typeof storage.read==='function'&&typeof storage.write==='function')return createPd3StateStore({clock,...storage});
  let data=defaults();
  const status={error:null,broken:false};
  function read(){
    status.broken=false;
    let raw=null;
    try{raw=storage.getItem(key);}catch{status.error='unavailable';return defaults();}
    if(raw===null)return defaults();
    try{return validatePd3(JSON.parse(raw));}
    catch{
      // Unreadable data is kept under another key before anything new is written.
      status.broken=true;
      try{storage.setItem(key+'.broken',raw);}catch{ /* The copy is best effort. */ }
      return defaults();
    }
  }
  function write(next){
    const clean=validatePd3(next);
    const serialized=JSON.stringify(clean);
    if(serialized.length>LIMITS.bytes){status.error='size';return false;}
    try{storage.setItem(key,serialized);}
    catch{status.error='quota';data=clean;return false;}
    status.error=null;data=clean;return true;
  }
  return {
    status,
    load(){data=read();return data;},
    get:()=>data,
    /** Re-reads the stored data (another tab may have saved), applies `change` and saves. Returns true when saved. */
    update(change){
      const fresh=read();
      const base=status.broken||status.error==='unavailable'?data:fresh;
      change(base);
      base.updatedAt=clock();
      return write(base);
    },
    exportJson(){return JSON.stringify({app:'danskdag-pd3',...data},null,2);},
    importJson(raw){
      if(typeof raw!=='string'||raw.length>LIMITS.importBytes)return {ok:false,error:'size'};
      let incoming;
      try{incoming=validatePd3(JSON.parse(raw));}catch{return {ok:false,error:'format'};}
      const merged=mergePd3(read(),incoming);
      return write(merged)?{ok:true}:{ok:false,error:status.error||'quota'};
    }
  };
}

/** Records a finished attempt in a score map (reading, listening, dictation, exam.find, exam.text). */
export function recordScore(map,id,percent,parts,at=Date.now()){
  const entry=map[id]||{best:0,last:0,attempts:0,at:0};
  entry.last=pct(percent);entry.best=Math.max(entry.best,entry.last);entry.attempts=Math.min(100000,entry.attempts+1);entry.at=at;
  if(parts)entry.parts=parts.map(pct);
  map[id]=entry;
  return entry;
}
