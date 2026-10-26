// Separate storage for the PD3 section. It never touches the learner's main progress (engine state, cloud sync, hashes).
export const PD3_KEY='danskdag.pd3.v1';
export const PD3_VERSION=1;
export const LIMITS={draft:12000,items:300,bytes:900000,importBytes:1500000,keywords:12,keyword:40};
const ID=/^[a-z0-9-]{1,60}$/;
const SCORE_MAPS=['reading','listening','dictation'];
const RATES=[0.6,0.75,0.9,1];

const isObject=value=>value!==null&&typeof value==='object'&&!Array.isArray(value);
const int=(value,min,max,fallback=0)=>Number.isFinite(Number(value))?Math.min(max,Math.max(min,Math.round(Number(value)))):fallback;
const stamp=value=>int(value,0,8.64e15,0);
const pct=value=>int(value,0,100,0);
const text=(value,max)=>typeof value==='string'?value.slice(0,max):'';

export function defaults(){
  return {
    version:PD3_VERSION,updatedAt:0,
    settings:{
      reader:{rate:0.9,follow:true,translation:false,calibration:1},
      dictation:{rate:0.9,limit:0,strict:false},
      exam:{timer:true},
      writing:{timer:false,minutes:45}
    },
    reading:{},listening:{},dictation:{},
    exam:{find:{},text:{}},
    writing:{},oral:{}
  };
}

function cleanScore(value){
  if(!isObject(value))return null;
  const entry={best:pct(value.best),last:pct(value.last),attempts:int(value.attempts,0,100000),at:stamp(value.at)};
  if(Array.isArray(value.parts))entry.parts=value.parts.slice(0,6).map(pct);
  return entry;
}
function cleanMap(source,cleaner){
  const result={};
  if(!isObject(source))return result;
  for(const [id,value] of Object.entries(source).slice(0,LIMITS.items)){
    if(!ID.test(id))continue;
    const entry=cleaner(value);
    if(entry)result[id]=entry;
  }
  return result;
}
const flags=(value,max)=>Array.isArray(value)?value.slice(0,max).map(Boolean):[];
function cleanSelf(value){
  const result={};
  if(isObject(value))for(const [id,score] of Object.entries(value).slice(0,12)){
    if(ID.test(id)&&Number.isFinite(Number(score)))result[id]=int(score,1,5,3);
  }
  return result;
}
function cleanWriting(value){
  if(!isObject(value))return null;
  return {
    draft:text(value.draft,LIMITS.draft),option:value.option==='B'?'B':'A',updatedAt:stamp(value.updatedAt),
    done:!!value.done,req:flags(value.req,12),check:flags(value.check,20),self:cleanSelf(value.self)
  };
}
function cleanOral(value){
  if(!isObject(value))return null;
  const keywords=Array.isArray(value.keywords)?value.keywords.map(word=>text(word,LIMITS.keyword).trim()).filter(Boolean).slice(0,LIMITS.keywords):[];
  return {keywords,self:cleanSelf(value.self),done:!!value.done,updatedAt:stamp(value.updatedAt)};
}

/** Returns a clean copy of stored or imported data; throws when it is not PD3 data of a known version. */
export function validatePd3(raw){
  if(!isObject(raw))throw new Error('Not PD3 data');
  if(raw.version!==PD3_VERSION)throw new Error('Unknown PD3 data version');
  const base=defaults(),s=isObject(raw.settings)?raw.settings:{};
  const reader=isObject(s.reader)?s.reader:{},dictation=isObject(s.dictation)?s.dictation:{},exam=isObject(s.exam)?s.exam:{},writing=isObject(s.writing)?s.writing:{};
  const data={
    version:PD3_VERSION,updatedAt:stamp(raw.updatedAt),
    settings:{
      reader:{rate:RATES.includes(reader.rate)?reader.rate:base.settings.reader.rate,follow:reader.follow!==false,translation:!!reader.translation,calibration:Math.min(3,Math.max(0.35,Number(reader.calibration)||1))},
      dictation:{rate:RATES.includes(dictation.rate)?dictation.rate:base.settings.dictation.rate,limit:[0,2,3].includes(dictation.limit)?dictation.limit:0,strict:!!dictation.strict},
      exam:{timer:exam.timer!==false},
      writing:{timer:!!writing.timer,minutes:[30,45,60,90,120].includes(writing.minutes)?writing.minutes:45}
    },
    exam:{find:cleanMap(raw.exam?.find,cleanScore),text:cleanMap(raw.exam?.text,cleanScore)},
    writing:cleanMap(raw.writing,cleanWriting),oral:cleanMap(raw.oral,cleanOral)
  };
  for(const name of SCORE_MAPS)data[name]=cleanMap(raw[name],cleanScore);
  return data;
}

function newer(a,b){return (b.updatedAt??b.at??0)>(a.updatedAt??a.at??0)?b:a;}
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
  result.updatedAt=Math.max(current.updatedAt,incoming.updatedAt);
  return result;
}

/** A store over any Storage-like object. All writes are guarded: a full or blocked storage keeps the in-memory data and reports the error. */
export function createPd3Store(storage=globalThis.localStorage,key=PD3_KEY,clock=()=>Date.now()){
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
