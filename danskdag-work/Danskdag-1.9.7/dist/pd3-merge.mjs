// Merging PD3 results: three-way for two tabs of one browser (base/ours/theirs, as in progress-merge.mjs) and a union
// for a cloud copy that replaces the device's progress. Inputs are validated `state.pd3` objects (or undefined while PD3 is unused).
import {emptyPd3,mergePd3,sealPd3,LIMITS,mergeMocks} from './pd3-store.mjs';
import {mergeSpell} from './pd3-spell.mjs';

const same=(a,b)=>JSON.stringify(a)===JSON.stringify(b);
// The side that changed a value wins; when both changed it, `ourWin` decides (the newer record).
const pick3=(base,ours,theirs,ourWin)=>same(ours,base)?theirs:same(theirs,base)?ours:ourWin?ours:theirs;
// Counters that only grow add up both tabs' new work. Without a common ancestor the larger value is the safe choice.
const total=(known,b,o,t)=>known?Math.min(1000000,b+Math.max(0,o-b)+Math.max(0,t-b)):Math.max(o,t);

/** Merges one id-keyed map. Records added or changed in either tab are kept; a record deleted in one tab stays deleted unless the other tab changed it. */
function mergeKeyed(base,ours,theirs,combine){
  const result={};
  for(const id of new Set([...Object.keys(theirs),...Object.keys(ours)])){
    const o=ours[id],t=theirs[id],b=base?.[id];
    if(o&&t)result[id]=combine(b,o,t);
    else if(o){if(!b||!same(o,b))result[id]=structuredClone(o);}
    else if(!b||!same(t,b))result[id]=structuredClone(t);
  }
  return result;
}

function mergeScore(known){
  return (b,o,t)=>{
    const winner=o.at>=t.at?o:t,entry=structuredClone(winner);
    entry.best=Math.max(o.best,t.best);
    // The same finished attempt seen from both tabs is one attempt.
    entry.attempts=o.at===t.at?Math.max(o.attempts,t.attempts):total(known,b?.attempts??0,o.attempts,t.attempts);
    return entry;
  };
}

function mergeMarks(base,ours,theirs,ourWin){
  const result={};
  for(const key of new Set([...Object.keys(theirs),...Object.keys(ours)])){
    const o=ours[key],t=theirs[key];
    result[key]=o===undefined?t:t===undefined?o:pick3(base?.[key],o,t,ourWin);
  }
  return result;
}

function mergeWriting(b,o,t){
  const ourWin=o.updatedAt>=t.updatedAt,winner=ourWin?o:t,entry=structuredClone(winner);
  const text=item=>({draft:item.draft,option:item.option});
  const draft=b&&same(text(o),text(b))?text(t):b&&same(text(t),text(b))?text(o):text(winner);
  entry.draft=draft.draft;entry.option=draft.option;
  entry.updatedAt=Math.max(o.updatedAt,t.updatedAt);
  entry.done=o.done||t.done;
  entry.req=pick3(b?.req,o.req,t.req,ourWin);
  entry.check=pick3(b?.check,o.check,t.check,ourWin);
  entry.self=mergeMarks(b?.self,o.self,t.self,ourWin);
  return entry;
}

function mergeOral(b,o,t){
  const ourWin=o.updatedAt>=t.updatedAt,entry=structuredClone(ourWin?o:t);
  entry.keywords=pick3(b?.keywords,o.keywords,t.keywords,ourWin);
  entry.self=mergeMarks(b?.self,o.self,t.self,ourWin);
  entry.done=o.done||t.done;
  entry.updatedAt=Math.max(o.updatedAt,t.updatedAt);
  return entry;
}

function mergeSettings(base,ours,theirs){
  const result=structuredClone(theirs);
  for(const group of Object.keys(ours))for(const key of Object.keys(ours[group])){
    // "Changed in this tab" wins; with no common ancestor a value different from the default counts as changed.
    if(!same(ours[group][key],base[group]?.[key]))result[group][key]=ours[group][key];
  }
  return result;
}

function mergeGrammarTabs(base,ours,theirs,known){
  if(!ours&&!theirs)return undefined;
  const e={sets:{},cats:{},updatedAt:0},b=base||e,o=ours||e,t=theirs||e;
  const cats={};
  for(const id of new Set([...Object.keys(o.cats),...Object.keys(t.cats)])){
    const c=(x)=>x.cats?.[id]||{ok:0,all:0};
    // The same counters seen from both tabs are one and the same answers.
    if(same(c(o),c(t))){cats[id]={...c(o)};continue;}
    const all=total(known,c(b).all,c(o).all,c(t).all);
    cats[id]={ok:Math.min(all,total(known,c(b).ok,c(o).ok,c(t).ok)),all};
  }
  return {sets:mergeKeyed(b.sets,o.sets,t.sets,mergeScore(known)),cats,updatedAt:Math.max(o.updatedAt,t.updatedAt)};
}

/** Three-way merge of `state.pd3`. `hasBase` tells whether the whole progress had a common ancestor at all. */
export function mergePd3Tabs(base,ours,theirs,hasBase=true){
  if(!ours&&!theirs)return undefined;
  if(!ours)return structuredClone(theirs);
  if(!theirs)return structuredClone(ours);
  const b=base||emptyPd3(),known=hasBase,ourWin=ours.updatedAt>=theirs.updatedAt;
  const merged=structuredClone(theirs);
  merged.settings=mergeSettings(b.settings,ours.settings,theirs.settings);
  for(const name of ['reading','listening','dictation'])merged[name]=mergeKeyed(b[name],ours[name],theirs[name],mergeScore(known));
  merged.exam={find:mergeKeyed(b.exam.find,ours.exam.find,theirs.exam.find,mergeScore(known)),text:mergeKeyed(b.exam.text,ours.exam.text,theirs.exam.text,mergeScore(known))};
  merged.writing=mergeKeyed(b.writing,ours.writing,theirs.writing,mergeWriting);
  merged.oral=mergeKeyed(b.oral,ours.oral,theirs.oral,mergeOral);
  merged.plan={examDate:pick3(b.plan.examDate,ours.plan.examDate,theirs.plan.examDate,ourWin)};
  const stats=merged.stats.dictation;
  stats.runs=total(known,b.stats.dictation.runs,ours.stats.dictation.runs,theirs.stats.dictation.runs);
  stats.errors={};
  for(const kind of new Set([...Object.keys(ours.stats.dictation.errors),...Object.keys(theirs.stats.dictation.errors)])){
    const count=total(known,b.stats.dictation.errors[kind]||0,ours.stats.dictation.errors[kind]||0,theirs.stats.dictation.errors[kind]||0);
    if(count)stats.errors[kind]=count;
  }
  // XP already paid: the larger percent per activity. The day's PD3 XP adds up within one day; a later day replaces an earlier one.
  const xp=merged.xp,o=ours.xp,t=theirs.xp;
  xp.items={};
  for(const key of new Set([...Object.keys(o.items),...Object.keys(t.items)]))xp.items[key]=Math.max(o.items[key]||0,t.items[key]||0);
  if(o.day===t.day){
    xp.day=o.day;
    xp.today=Math.min(100000,total(known,b.xp.day===o.day?b.xp.today:0,o.today,t.today));
  }else if(o.day>t.day){xp.day=o.day;xp.today=o.today;}
  // Dictation sentences in repetition: the union (larger count, newest time); the cards' reviews are merged with the rest of the progress.
  const spell=mergeSpell(ours.spell,theirs.spell);
  if(spell.length)merged.spell=spell;else delete merged.spell;
  // Mock exams: a record added or changed in either tab is kept; the same exam seen in both tabs takes the one saved later.
  const mocks=mergeMocks(null,mergeKeyed(b.mocks||{},ours.mocks||{},theirs.mocks||{},(bb,o,t)=>mergeMocks({x:o},{x:t}).x));
  if(Object.keys(mocks).length)merged.mocks=mocks;else delete merged.mocks;
  // Grammar: sets like the other score maps; the category counters only grow, so each tab's new answers add up (as for the dictation statistics).
  const grammar=mergeGrammarTabs(b.grammar,ours.grammar,theirs.grammar,known);
  if(grammar)merged.grammar=grammar;else delete merged.grammar;
  merged.updatedAt=Math.max(ours.updatedAt,theirs.updatedAt);
  if(ours._unknown||theirs._unknown)merged._unknown={...ours._unknown,...theirs._unknown};
  return sealPd3(merged,merged._unknown,LIMITS.state);
}

/** Cloud progress replaces the device's progress: keep what only this device has (best scores, newer drafts, error statistics, an exam date).
 * Settings and the record of XP already paid come from the cloud version, whose XP total they belong to. */
export function adoptRemoteState(remote,local){
  if(!local?.pd3)return remote;
  const next=structuredClone(remote);
  if(remote.pd3)next.pd3=sealPd3(mergePd3(structuredClone(remote.pd3),local.pd3),remote.pd3._unknown);
  else{
    next.pd3=structuredClone(local.pd3);
    // The cloud XP total does not include what this device paid for, so those activities may pay again.
    next.pd3.xp=emptyPd3().xp;
  }
  return next;
}
