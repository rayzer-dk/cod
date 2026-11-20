// The unfinished PD3 task ("active run") that survives a page reload: an exam in progress, a dictation text, used listens.
// It is temporary, device-only state, like an unfinished lesson: it lives under its own localStorage key, never in the shared
// progress, the PD3 copy or the cloud. Pure functions (no DOM); the page controller decides when to save, restore and clear.
import {snapshotMock,applyMock,validateMockRun} from './pd3-mock.mjs';
import {snapshotGrammar,validateGrammarFields,applyGrammar} from './pd3-grammar.mjs';
export const RUN_KEY='danskdag.pd3.run.v1';
// Version 2 is the schema with the mock exam (view 'mock'). The other views are still written as version 1, so the older schema stays readable
// (and an older app version reads them); a record of one version is never read as the other's view.
export const RUN_VERSION=2;
export const RUN_LEGACY_VERSION=1;
export const RUN_MAX_AGE=24*60*60*1000;
export const RUN_MAX_BYTES=32768;
export const MOCK_RUN_MAX_BYTES=65536;
// 'grammar' (a set of grammar tasks) is written as version 1 like the other practice views; older app versions simply do not know the view.
const RUN_VIEWS=new Set(['reading','dictation','listening','exam','mock','grammar']);
const MAX_TEXT=3000,MAX_KEYS=200,MAX_PLAYS=99;
const isRecord=value=>!!value&&typeof value==='object'&&!Array.isArray(value)&&[Object.prototype,null].includes(Object.getPrototypeOf(value));
const finite=value=>typeof value==='number'&&Number.isFinite(value);
const integer=(value,max)=>Number.isInteger(value)&&value>=0&&value<=max;

/** Which list of the content holds the item of a task. */
export function itemOf(data,view,kind,id){
  const list=view==='reading'?data.readingPractice:view==='dictation'?data.dictations:view==='listening'?data.listening
    :view==='exam'?(kind==='find'?data.readingExamFind:kind==='text'?data.readingExamText:null):view==='grammar'?data.grammarSets:null;
  return Array.isArray(list)?list.find(item=>item.id===id)||null:null;
}

/**
 * What to remember about the task on screen, or null when there is nothing worth remembering (nothing done yet, or the task is over).
 * `run` is the controller's run object; only the fields that cannot be derived again are copied.
 */
export function snapshotRun(ui,run,now){
  if(!run||!ui||!RUN_VIEWS.has(ui.view)||typeof ui.id!=='string'||!ui.id)return null;
  const record={v:ui.view==='mock'?RUN_VERSION:RUN_LEGACY_VERSION,savedAt:now,view:ui.view,kind:ui.view==='exam'?ui.kind:null,id:ui.id,t0:finite(run.t0)?run.t0:now};
  const answers=map=>Object.fromEntries(Object.entries(map||{}).filter(([,value])=>value!==undefined&&value!==''&&value!==null));
  switch(ui.view){
    case 'reading':{
      if(run.checked)return null;
      const a=answers(run.answers);
      return Object.keys(a).length?{...record,answers:a}:null;
    }
    case 'dictation':{
      if(run.result)return null;
      const inputs=Object.fromEntries(Object.entries(run.inputs||{}).filter(([,value])=>String(value).length));
      const plays=Object.fromEntries(Object.entries(run.plays||{}).filter(([,value])=>value>0));
      return Object.keys(inputs).length||Object.keys(plays).length?{...record,inputs,plays}:null;
    }
    case 'listening':{
      if(run.phase!=='listen')return null;
      const a=answers(run.answers);
      return run.plays>0||Object.keys(a).length?{...record,plays:run.plays|0,answers:a}:null;
    }
    case 'exam':{
      if(run.phase!=='run')return null;
      return {...record,answers:answers(run.answers),task:run.task,timerOn:!!run.timerOn,deadline:run.timerOn&&finite(run.deadline)?run.deadline:null};
    }
    case 'grammar':{
      const fields=snapshotGrammar(run);
      return fields?{...record,...fields}:null;
    }
    case 'mock':{
      const snap=snapshotMock(run);
      return snap?{...record,t0:run.mock.startedAt,mock:snap.mock,draft:snap.draft}:null;
    }
    default:return null;
  }
}

const inputKeyOk=(key,item)=>key==='all'?item.mode==='text':/^\d{1,3}$/.test(key)&&item.mode!=='text'&&Number(key)<item.sentences.length;

function validAnswers(map,item,view,kind){
  if(!isRecord(map)||Object.keys(map).length>MAX_KEYS)return null;
  const out={};
  for(const [key,value] of Object.entries(map)){
    if(view==='exam'&&kind==='find'){
      const id=key.startsWith('find:')?key.slice(5):'';
      if(!item.questions.some(q=>q.id===id)||typeof value!=='string'||!item.sections.some(s=>s.id===value))return null;
    }else if(view==='exam'){
      const match=/^(t1|t2|t3):(\d{1,3})$/.exec(key);
      if(!match)return null;
      if(match[1]==='t2'){if(typeof value!=='string'||!item.text2.removed.some(r=>r.id===value))return null;}
      else if(!integer(value,50))return null;
    }else{
      const match=/^q:(\d{1,3})$/.exec(key);
      if(!match||Number(match[1])>=item.questions.length||!integer(value,50))return null;
    }
    out[key]=value;
  }
  return out;
}

/**
 * Checks a stored record against the content and the clock. Returns a clean record or null; anything unexpected (other version, other
 * shape, unknown task, too old, too large) means "nothing to restore", never an exception.
 */
export function validateRun(raw,{data,now}){
  try{
    if(!isRecord(raw)||raw.v!==(raw.view==='mock'?RUN_VERSION:RUN_LEGACY_VERSION)||!RUN_VIEWS.has(raw.view)||typeof raw.id!=='string')return null;
    // A mock exam is kept longer (a full one needs a break) and checks its own clock and content.
    if(raw.view==='mock')return validateMockRun(raw,{data,now});
    if(!finite(raw.savedAt)||raw.savedAt>now+60000||now-raw.savedAt>RUN_MAX_AGE)return null;
    const kind=raw.view==='exam'?raw.kind:null;
    if(raw.view==='exam'&&kind!=='find'&&kind!=='text')return null;
    const item=itemOf(data,raw.view,kind,raw.id);
    if(!item)return null;
    const record={v:RUN_LEGACY_VERSION,savedAt:raw.savedAt,view:raw.view,kind,id:raw.id,t0:finite(raw.t0)&&raw.t0<=now&&raw.t0>=raw.savedAt-RUN_MAX_AGE?raw.t0:raw.savedAt};
    if(raw.view==='grammar'){
      const fields=validateGrammarFields(raw,item,now);
      return fields?{...record,...fields}:null;
    }
    if(raw.view==='dictation'){
      if(!isRecord(raw.inputs)||!isRecord(raw.plays)||Object.keys(raw.inputs).length>MAX_KEYS||Object.keys(raw.plays).length>MAX_KEYS)return null;
      record.inputs={};record.plays={};
      for(const [key,value] of Object.entries(raw.inputs)){
        if(!inputKeyOk(key,item)||typeof value!=='string'||value.length>MAX_TEXT)return null;
        record.inputs[key]=value;
      }
      for(const [key,value] of Object.entries(raw.plays)){
        if(!(key==='all'||/^\d{1,3}$/.test(key))||!integer(value,MAX_PLAYS))return null;
        record.plays[key]=value;
      }
      return record;
    }
    if(raw.view==='listening'){
      const answers=validAnswers(raw.answers,item,'listening',null);
      if(!answers||!integer(raw.plays,MAX_PLAYS))return null;
      record.plays=Math.min(raw.plays,item.plays||2);record.answers=answers;
      return record;
    }
    if(raw.view==='reading'){
      const answers=validAnswers(raw.answers,item,'reading',null);
      if(!answers)return null;
      record.answers=answers;
      return record;
    }
    // exam
    const answers=validAnswers(raw.answers,item,'exam',kind);
    if(!answers||!['t1','t2','t3'].includes(raw.task)||typeof raw.timerOn!=='boolean')return null;
    const minutes=item.minutes||(kind==='find'?25:65);
    if(raw.timerOn&&(!finite(raw.deadline)||raw.deadline>now+minutes*60000+5000))return null;
    record.answers=answers;record.task=kind==='find'?'t1':raw.task;record.timerOn=raw.timerOn;record.deadline=raw.timerOn?raw.deadline:null;
    return record;
  }catch{return null;}
}

/** Copies a validated record into a fresh run object of the controller. */
export function applyRun(run,record){
  if(!run||!record)return run;
  if(Number.isFinite(record.t0))run.t0=record.t0;
  switch(record.view){
    case 'reading':run.answers={...record.answers};break;
    case 'dictation':run.inputs={...record.inputs};run.plays={...record.plays};break;
    case 'listening':run.plays=record.plays;run.answers={...record.answers};break;
    case 'mock':applyMock(run,record);break;
    case 'grammar':applyGrammar(run,record);break;
    case 'exam':run.phase='run';run.answers={...record.answers};run.task=record.task;run.timerOn=record.timerOn;run.deadline=record.deadline;run.timeUp=false;break;
  }
  return run;
}

const defaultStorage=()=>{try{return globalThis.localStorage||null;}catch{return null;}};
/** The single localStorage key of the active run. Every call survives a missing, blocked or full storage. */
export function createRunStore(storage=defaultStorage(),key=RUN_KEY){
  const area=()=>{try{return storage||null;}catch{return null;}};
  return {
    read(){
      try{const text=area()?.getItem(key);return text?JSON.parse(text):null;}catch{return null;}
    },
    write(record){
      try{
        const text=JSON.stringify(record);
        if(text.length>(record?.view==='mock'?MOCK_RUN_MAX_BYTES:RUN_MAX_BYTES)){if(record?.view!=='mock')this.clear();return false;}
        area().setItem(key,text);return true;
      }catch{return false;}
    },
    clear(){try{area()?.removeItem(key);}catch{ /* Nothing to do: a stale record is discarded by age and validation. */ }}
  };
}
