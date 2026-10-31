// PD3 grammar practice (B2, exam format): pure logic, no DOM and no storage. Checking of the five task types, scoring, statistics by
// category, recommendations, merging of the stored results and the validator of the unfinished set (pd3-run.mjs).
// The data contract is docs/pd3-grammar-schema.md; markup is in pd3-grammar-view.mjs, the controller in pd3-grammar-page.mjs.
import {normalize} from './engine.mjs';

export const GRAMMAR_MINUTES=15;
/** Seconds left at which the timer warns (5 minutes, 1 minute, 30 seconds). */
export const GRAMMAR_MARKS=[300,60,30];
/** XP needs at least this many answered tasks (the share of correct answers is checked by awardPd3). */
export const GRAMMAR_MIN_ANSWERED=5;
/** Answers a category needs before "frequent mistakes" (hub) / "weak category" (list) may name it. */
export const GRAMMAR_MIN_ANSWERS=10;
export const GRAMMAR_MIN_WEAK=5;
export const GRAMMAR_MAX_TEXT=300;
export const GRAMMAR_MAX_FIX=60;
export const TASK_TYPES=['gap','cloze','fix','transform','order'];
const COUNT_CAP=1000000;

const isRecord=value=>!!value&&typeof value==='object'&&!Array.isArray(value)&&[Object.prototype,null].includes(Object.getPrototypeOf(value));
const finite=value=>typeof value==='number'&&Number.isFinite(value);
const list=value=>Array.isArray(value)?value:[];
export const grammarSets=data=>list(data?.grammarSets);
export const grammarCategories=data=>list(data?.grammarCategories);
/** Both texts are equal after the shared normalisation of engine.mjs: case, punctuation, extra spaces and invisible characters do not matter. */
export const sameText=(a,b)=>{const x=normalize(a??'');return x!==''&&x===normalize(b??'');};

/* ---------- the items ---------- */
export const clozeGaps=item=>list(item.segments).filter(part=>part&&typeof part==='object');
export const fixTokens=item=>String(item.sentence||'').split(' ');
const orderLength=item=>list(item.tokens).length;
/** The sentence built from the tiles taken so far (`picked` = token indexes in the order of the answer zone). */
export const orderText=(item,picked)=>list(picked).map(i=>item.tokens[i]).join(' ');
export const categoryOf=(categories,id)=>list(categories).find(c=>c.id===id)||null;

/** A stored or typed answer cleaned against the item, or undefined when it cannot be an answer to it. */
export function cleanAnswer(item,value){
  switch(item?.type){
    case 'gap':return Number.isInteger(value)&&value>=0&&value<list(item.options).length?value:undefined;
    case 'cloze':{
      if(!isRecord(value))return undefined;
      const gaps=clozeGaps(item),out={};
      for(const [key,chosen] of Object.entries(value)){
        const gap=gaps.find(g=>String(g.gap)===key);
        if(!gap||!Number.isInteger(chosen)||chosen<0||chosen>=list(gap.options).length)return undefined;
        out[key]=chosen;
      }
      return out;
    }
    case 'fix':{
      if(!isRecord(value))return undefined;
      const out={};
      if(value.i!==undefined){if(!Number.isInteger(value.i)||value.i<0||value.i>=fixTokens(item).length)return undefined;out.i=value.i;}
      if(value.t!==undefined){if(typeof value.t!=='string'||value.t.length>GRAMMAR_MAX_FIX)return undefined;out.t=value.t;}
      return out;
    }
    case 'transform':return typeof value==='string'&&value.length<=GRAMMAR_MAX_TEXT?value:undefined;
    case 'order':{
      if(!Array.isArray(value)||value.length>orderLength(item))return undefined;
      const seen=new Set();
      for(const i of value){if(!Number.isInteger(i)||i<0||i>=orderLength(item)||seen.has(i))return undefined;seen.add(i);}
      return [...value];
    }
    default:return undefined;
  }
}
/** Anything at all has been answered (used when time runs out: a half-finished answer is still checked). */
export function hasAnswer(item,answer){
  const a=cleanAnswer(item,answer);
  switch(item?.type){
    case 'gap':return a!==undefined;
    case 'cloze':return !!a&&Object.keys(a).length>0;
    case 'fix':return !!a&&a.i!==undefined;
    case 'transform':return a!==undefined&&normalize(a)!=='';
    case 'order':return !!a&&a.length>0;
    default:return false;
  }
}
/** The answer may be sent with "Проверить": every gap chosen, a word marked and its correction typed, all tiles placed. */
export function isComplete(item,answer){
  const a=cleanAnswer(item,answer);
  switch(item?.type){
    case 'gap':return a!==undefined;
    case 'cloze':return !!a&&clozeGaps(item).every(g=>a[String(g.gap)]!==undefined);
    case 'fix':return !!a&&a.i!==undefined&&normalize(a.t??'')!=='';
    case 'transform':return a!==undefined&&normalize(a)!=='';
    case 'order':return !!a&&a.length===orderLength(item);
    default:return false;
  }
}

/** Checks one answer. `ok` = fully right; the details name the parts (gaps of a cloze, the marked word and the correction of a fix). */
export function checkItem(item,answer){
  const a=cleanAnswer(item,answer);
  switch(item?.type){
    case 'gap':return {ok:a===item.answer};
    case 'cloze':{
      const gaps=clozeGaps(item).map(g=>({gap:g.gap,chosen:a?a[String(g.gap)]:undefined,right:g.answer}));
      for(const g of gaps)g.ok=g.chosen===g.right;
      return {ok:gaps.length>0&&gaps.every(g=>g.ok),gaps};
    }
    case 'fix':{
      const pickedOk=!!a&&a.i===item.errorIndex,textOk=!!a&&list(item.fixes).some(fix=>sameText(a.t,fix));
      return {ok:pickedOk&&textOk,pickedOk,textOk};
    }
    case 'transform':return {ok:a!==undefined&&list(item.answers).some(x=>sameText(a,x))};
    case 'order':return {ok:!!a&&a.length===orderLength(item)&&list(item.answers).some(x=>sameText(orderText(item,a),x))};
    default:return {ok:false};
  }
}

/** What the learner wrote, as short text for the review. */
export function answerText(item,answer){
  const a=cleanAnswer(item,answer);
  if(a===undefined)return '';
  switch(item.type){
    case 'gap':return String(item.stem).replace('___',item.options[a]);
    case 'cloze':return clozeGaps(item).map(g=>`${g.gap}) ${a[String(g.gap)]===undefined?'—':g.options[a[String(g.gap)]]}`).join('; ');
    case 'fix':{
      if(a.i===undefined)return '';
      const tokens=fixTokens(item);
      return `${tokens[a.i]} → ${a.t||'—'}`;
    }
    case 'transform':return a;
    case 'order':return orderText(item,a);
    default:return '';
  }
}
/** The right answer: `main` plus other accepted variants. */
export function correctAnswer(item){
  switch(item?.type){
    case 'gap':return {main:String(item.stem).replace('___',item.options[item.answer]),others:[]};
    case 'cloze':return {main:clozeGaps(item).map(g=>`${g.gap}) ${g.options[g.answer]}`).join('; '),others:[]};
    case 'fix':{
      const tokens=fixTokens(item),fixed=tokens.slice();
      fixed[item.errorIndex]=list(item.fixes)[0]??'';
      return {main:fixed.join(' '),others:[],wrong:tokens[item.errorIndex]};
    }
    case 'transform':case 'order':{
      const answers=list(item.answers);
      return {main:answers[0]??'',others:answers.slice(1)};
    }
    default:return {main:'',others:[]};
  }
}

/* ---------- order tiles (the same idea as "собери фразу": tiles move between the bank and the answer zone) ---------- */
export function tileAdd(picked,pos,length){
  const base=list(picked);
  return Number.isInteger(pos)&&pos>=0&&pos<length&&!base.includes(pos)?[...base,pos]:base;
}
export function tileRemove(picked,place){
  const base=list(picked);
  return Number.isInteger(place)&&place>=0&&place<base.length?base.filter((_,i)=>i!==place):base;
}

/* ---------- scoring ---------- */
/**
 * The result of a set. `run` has done/skipped/self (id -> true) and answers (id -> answer). Statuses: ok, wrong, self (the learner marked
 * their own wording as right: no point, no statistics), skipped, missed (not reached). With `final` an answer typed but not yet sent is checked too
 * (time ran out). `percent` is the share of right answers among all tasks of the set.
 */
export function scoreSet(set,run,{final=false}={}){
  const items=[],cats={};
  let correct=0,answered=0;
  for(const item of list(set?.items)){
    const answer=run.answers?.[item.id];
    let status='missed';
    if(run.skipped?.[item.id])status='skipped';
    else if(run.done?.[item.id]||(final&&hasAnswer(item,answer))){
      const ok=checkItem(item,answer).ok;
      status=ok?'ok':run.self?.[item.id]&&run.done?.[item.id]?'self':'wrong';
    }
    if(status==='ok'||status==='wrong'||status==='self')answered++;
    if(status==='ok')correct++;
    if(status==='ok'||status==='wrong'){
      const cat=cats[item.cat]||(cats[item.cat]={ok:0,all:0});
      cat.all++;if(status==='ok')cat.ok++;
    }
    items.push({item,status,answer});
  }
  const total=items.length;
  return {items,correct,answered,total,percent:total?Math.round(correct/total*100):0,cats};
}
/** Whether this result may pay XP (the share of right answers is limited by awardPd3). */
export const countsForXp=result=>result.answered>=GRAMMAR_MIN_ANSWERED;

/** Writes a finished set into `grammar` (state.pd3.grammar): the set's best result and attempts, and the category counters. */
export function recordGrammar(grammar,setId,result,at){
  const entry=grammar.sets[setId]||{best:0,last:0,attempts:0,at:0};
  entry.last=result.percent;entry.best=Math.max(entry.best,entry.last);entry.attempts=Math.min(100000,entry.attempts+1);entry.at=at;
  grammar.sets[setId]=entry;
  for(const [id,counts] of Object.entries(result.cats)){
    const cat=grammar.cats[id]||(grammar.cats[id]={ok:0,all:0});
    cat.all=Math.min(COUNT_CAP,cat.all+counts.all);cat.ok=Math.min(cat.all,Math.min(COUNT_CAP,cat.ok+counts.ok));
  }
  grammar.updatedAt=at;
  return grammar;
}
export const emptyGrammar=()=>({sets:{},cats:{},updatedAt:0});

/* ---------- categories, weak spots, recommendations ---------- */
/** One row per category of the content: {id,title,tip,ok,all,rate} (rate = share of right answers, null while nothing was answered). */
export function categoryRows(grammar,categories){
  return list(categories).map(c=>{
    const counts=grammar?.cats?.[c.id]||{ok:0,all:0};
    return {id:c.id,title:c.title,tip:c.tip||'',ok:counts.ok,all:counts.all,rate:counts.all?counts.ok/counts.all:null};
  });
}
/** The category with the lowest share of right answers among those with at least `min` answers (and at least one mistake). */
export function weakCategory(grammar,categories,{min=GRAMMAR_MIN_WEAK}={}){
  const rows=categoryRows(grammar,categories).filter(row=>row.all>=min&&row.ok<row.all);
  return rows.reduce((found,row)=>!found||row.rate<found.rate||(row.rate===found.rate&&row.all>found.all)?row:found,null);
}
/** Hub: the categories with the largest share of mistakes (at least `min` answers each), at most `limit`. */
export function frequentMistakes(grammar,categories,{min=GRAMMAR_MIN_ANSWERS,limit=3}={}){
  return categoryRows(grammar,categories).map((row,order)=>({...row,order,errors:row.all-row.ok,share:row.all?Math.round((row.all-row.ok)/row.all*100):0}))
    .filter(row=>row.all>=min&&row.errors>0)
    .sort((a,b)=>b.errors/b.all-a.errors/a.all||b.all-a.all||a.order-b.order).slice(0,limit);
}
/** How many tasks of a category each set has. */
export const categoryCount=(set,catId)=>list(set?.items).filter(item=>item.cat===catId).length;
/** The set with the most tasks of the category (fewest attempts, then list order, on a tie); null when no set has any. */
export function practiceSetFor(catId,sets,grammar){
  let best=null;
  for(const set of list(sets)){
    const count=categoryCount(set,catId);
    if(!count)continue;
    const attempts=grammar?.sets?.[set.id]?.attempts||0;
    if(!best||count>best.count||(count===best.count&&attempts<best.attempts))best={set,count,attempts};
  }
  return best?.set||null;
}
/** Up to `limit` categories with the lowest share of right answers in this result (only those with a mistake). */
export function recommendations(result,categories,{limit=3}={}){
  return categoryRows({cats:result.cats},categories).map((row,order)=>({...row,order}))
    .filter(row=>row.all>0&&row.ok<row.all)
    .sort((a,b)=>a.rate-b.rate||(b.all-b.ok)-(a.all-a.ok)||a.order-b.order).slice(0,limit);
}
/** Where to read about a category: ids of lessons and reference tabs of the app. Only those that exist (`exists`) are offered. */
export const GRAMMAR_LINKS={
  v2:[['lesson','g-main-order'],['lesson','g-questions']],
  bisaet:[['lesson','g-subordinate-order']],
  passive:[['lesson','g-passive']],
  tenses:[['lesson','g-datid'],['lesson','g-perfect'],['lesson','form-lesson-pluperfect'],['reference','tenses']],
  relative:[['lesson','g-relative']],
  connect:[['lesson','g-connectors'],['lesson','g-time-purpose']],
  prep:[],
  agree:[['lesson','g-nouns'],['lesson','g-adjectives']],
  reflex:[['lesson','g-reflexive'],['lesson','g-basic-pronouns']],
  modal:[['lesson','g-modals'],['lesson','g-perfect-modals']],
  compare:[['lesson','pat-more-less']],
  cond:[['lesson','g-conditionals']]
};
export const REFERENCE_ACTIONS={tenses:'open-tenses'};
/** `exists` = {lesson:id=>title|null, reference:name=>boolean} from the app; without it there are no links. At most `limit` per category. */
export function linksFor(catId,exists,limit=2){
  const out=[];
  if(!exists)return out;
  for(const [kind,id] of GRAMMAR_LINKS[catId]||[]){
    if(out.length>=limit)break;
    if(kind==='lesson'){const title=exists.lesson?.(id);if(title)out.push({kind,id,title});}
    else if(exists.reference?.(id)&&REFERENCE_ACTIONS[id])out.push({kind,id,action:REFERENCE_ACTIONS[id]});
  }
  return out;
}

/** Skill row of the exam plan and progress: the last result of the grammar sets and the weakest category. */
export function grammarLast(grammar,sets){
  let found=null;
  for(const set of list(sets)){
    const entry=grammar?.sets?.[set.id];
    if(entry?.attempts>0&&(!found||entry.at>=found.at))found=entry;
  }
  return found?{percent:found.last,at:found.at}:null;
}

/* ---------- merging stored results ---------- */
const newerEntry=(a,b)=>(b.at??0)>(a.at??0)?b:a;
/** Import of a copy (pd3-store.mjs): higher best result and attempts per set; per category the entry with more answers (a copy of the same data
 * counted twice stays the same). */
export function mergeGrammar(mine,theirs){
  if(!theirs)return mine;
  if(!mine)return structuredClone(theirs);
  const result=structuredClone(mine);
  for(const [id,entry] of Object.entries(theirs.sets||{})){
    const have=result.sets[id];
    result.sets[id]=have?{...newerEntry(have,entry),best:Math.max(have.best,entry.best),attempts:Math.max(have.attempts,entry.attempts)}:{...entry};
  }
  for(const [id,entry] of Object.entries(theirs.cats||{})){
    const have=result.cats[id];
    if(!have||entry.all>have.all||(entry.all===have.all&&entry.ok>have.ok))result.cats[id]={...entry};
  }
  result.updatedAt=Math.max(mine.updatedAt||0,theirs.updatedAt||0);
  return result;
}

/* ---------- the unfinished set (pd3-run.mjs) ---------- */
const ids=map=>Object.keys(map||{}).filter(key=>map[key]);
/** The fields of the run record of a set under way, or null when there is nothing to remember. */
export function snapshotGrammar(run){
  if(!run||run.phase!=='run')return null;
  const answers=Object.fromEntries(Object.entries(run.answers||{}).filter(([,value])=>value!==undefined&&value!==''&&!(Array.isArray(value)&&!value.length)));
  return {
    index:run.index|0,answers,done:ids(run.done),skipped:ids(run.skipped),self:ids(run.self),
    timerOn:!!run.timerOn,deadline:run.timerOn&&finite(run.deadline)?run.deadline:null
  };
}
/** Checks the fields of a stored record against the set and the clock. Returns clean fields or null. */
export function validateGrammarFields(raw,set,now){
  const items=list(set?.items),byId=new Map(items.map(item=>[item.id,item]));
  if(!items.length||!Number.isInteger(raw.index)||raw.index<0||raw.index>=items.length)return null;
  if(typeof raw.timerOn!=='boolean')return null;
  const minutes=set.minutes||GRAMMAR_MINUTES;
  if(raw.timerOn&&(!finite(raw.deadline)||raw.deadline>now+minutes*60000+5000))return null;
  if(!isRecord(raw.answers)||Object.keys(raw.answers).length>items.length)return null;
  const answers={};
  for(const [id,value] of Object.entries(raw.answers)){
    const item=byId.get(id),clean=item&&cleanAnswer(item,value);
    if(!item||clean===undefined)return null;
    answers[id]=clean;
  }
  const flags=name=>{
    if(!Array.isArray(raw[name])||raw[name].length>items.length)return null;
    const map={};
    for(const id of raw[name]){if(!byId.has(id))return null;map[id]=true;}
    return map;
  };
  const done=flags('done'),skipped=flags('skipped'),self=flags('self');
  if(!done||!skipped||!self)return null;
  for(const id of Object.keys(skipped))if(!done[id])return null;
  for(const id of Object.keys(self))if(!done[id]||skipped[id])return null;
  for(const id of Object.keys(done))if(!skipped[id]&&!hasAnswer(byId.get(id),answers[id]))return null;
  // Only a wrong answer can be marked as "my wording is right too".
  for(const id of Object.keys(self))if(checkItem(byId.get(id),answers[id]).ok)return null;
  return {index:raw.index,answers,done,skipped,self,timerOn:raw.timerOn,deadline:raw.timerOn?raw.deadline:null};
}
/** Copies a validated record into a fresh run object. */
export function applyGrammar(run,record){
  run.phase='run';run.index=record.index;run.answers={...record.answers};
  run.done={...record.done};run.skipped={...record.skipped};run.self={...record.self};
  run.timerOn=record.timerOn;run.deadline=record.deadline;run.timeUp=false;run.confirm=null;
  return run;
}
/** Whole seconds left on the absolute deadline (null without a timer). */
export const secondsLeft=(run,now)=>run.timerOn&&finite(run.deadline)?Math.max(0,Math.ceil((run.deadline-now)/1000)):null;
