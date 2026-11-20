// What the learner has done in PD3, computed from `state.pd3` and the PD3 content: per activity, per skill, the exam plan and weak spots.
// Pure functions (no DOM, no storage). Titles are in Russian like the rest of the interface and are translated at build time.
import {dayKey,DAY} from './engine.mjs';
import {weakCategory,grammarCategories} from './pd3-grammar.mjs';

const ORAL_PREFIX={monologue:'mono',interview:'intv',interaction:'inter',discussion:'disc'};
const list=(data,name)=>Array.isArray(data?.[name])?data[name]:[];
const max=values=>values.length?Math.max(...values):0;
const average=values=>values.length?values.reduce((sum,value)=>sum+value,0)/values.length:null;

/** Activity cards of the hub, in the order the hub shows them. */
export const ACTIVITIES=[
  ['reading','Чтение вслух'],['dictation','Диктанты'],['listening','Аудирование'],['exam','Чтение (экзамен)'],['writing','Письмо'],['oral','Устная часть']
];
/** Grammar practice is listed after these (activity row and fifth skill) only when the content has grammar sets. */
export const GRAMMAR_ACTIVITY=['grammar','Грамматика B2'];
export const GRAMMAR_SKILL=['grammar','Грамматика B2',['grammar']];
const hasGrammar=data=>list(data,'grammarSets').length>0;
/** Skills of the exam plan: which activities belong to which skill. */
export const SKILLS=[
  ['reading','Чтение',['reading','exam']],['writing','Письмо',['writing']],['listening','Аудирование и диктанты',['listening','dictation']],['oral','Устная часть',['oral']]
];

function scoreActivity(map,items){
  const entries=items.map(item=>map?.[item.id]).filter(entry=>entry?.attempts>0);
  return {total:items.length,done:entries.length,best:entries.length?max(entries.map(entry=>entry.best)):null,lastAt:max(entries.map(entry=>entry.at)),last:latest(entries)};
}
function latest(entries){
  let found=null;
  for(const entry of entries)if(!found||entry.at>=found.at)found=entry;
  return found?{percent:found.last,at:found.at}:null;
}
// Self-assessment is 1-5 per criterion; its average is shown as a share of the maximum.
const selfPercent=entries=>{
  const scores=entries.flatMap(entry=>Object.values(entry.self||{}));
  const mean=average(scores);
  return mean===null?null:Math.round(mean/5*100);
};

/** One row per hub activity: {id,title,done,total,best,lastAt,last,self}. `best` and `last` are percents of checked answers; `self` is the self-assessment share. */
export function activityRows(pd3,data){
  const rows={};
  for(const [id,name] of [['reading','readingPractice'],['dictation','dictations'],['listening','listening']])rows[id]=scoreActivity(pd3?.[id],list(data,name));
  rows.grammar=scoreActivity(pd3?.grammar?.sets,list(data,'grammarSets'));
  const find=list(data,'readingExamFind'),text=list(data,'readingExamText');
  const examEntries=[...find.map(item=>pd3?.exam?.find?.[item.id]),...text.map(item=>pd3?.exam?.text?.[item.id])].filter(entry=>entry?.attempts>0);
  rows.exam={total:find.length+text.length,done:examEntries.length,best:examEntries.length?max(examEntries.map(entry=>entry.best)):null,lastAt:max(examEntries.map(entry=>entry.at)),last:latest(examEntries)};
  const writing=[...list(data,'writingEmail'),...list(data,'writingTask')].map(item=>pd3?.writing?.[item.id]).filter(Boolean);
  const finished=writing.filter(entry=>entry.done);
  rows.writing={total:list(data,'writingEmail').length+list(data,'writingTask').length,done:finished.length,best:null,lastAt:max(writing.map(entry=>entry.updatedAt)),last:null,self:selfPercent(writing)};
  const oralKeys=[];
  for(const [name,prefix] of Object.entries(ORAL_PREFIX))for(const item of list(data,'oral'+name[0].toUpperCase()+name.slice(1)))oralKeys.push(`${prefix}-${item.id}`.slice(0,60));
  const oral=oralKeys.map(key=>pd3?.oral?.[key]).filter(Boolean);
  rows.oral={total:oralKeys.length,done:oral.filter(entry=>entry.done).length,best:null,lastAt:max(oral.map(entry=>entry.updatedAt)),last:null,self:selfPercent(oral)};
  return [...ACTIVITIES,...(hasGrammar(data)?[GRAMMAR_ACTIVITY]:[])].map(([id,title])=>({id,title,...rows[id]}));
}

/** Totals for the compact line on the home page; null while PD3 is unused. */
export function pd3Totals(pd3,data){
  if(!pd3)return null;
  const rows=activityRows(pd3,data),done=rows.reduce((sum,row)=>sum+row.done,0),total=rows.reduce((sum,row)=>sum+row.total,0);
  return {done,total,lastAt:max(rows.map(row=>row.lastAt))};
}

/** Whole days between the calendar day of `at` (a time stamp) and today, both by the Copenhagen calendar. */
export function daysSince(at,now=new Date()){
  if(!at)return null;
  return Math.max(0,Math.round((Date.parse(dayKey(now))-Date.parse(dayKey(new Date(at))))/DAY));
}
/** Days until the exam date (0 = today, negative = passed); null when no valid date is set. */
export function daysUntil(examDate,now=new Date()){
  if(!/^\d{4}-\d{2}-\d{2}$/.test(examDate||''))return null;
  const time=Date.parse(examDate);
  return Number.isFinite(time)?Math.round((time-Date.parse(dayKey(now)))/DAY):null;
}

/** The four exam skills with their latest and best result and how long ago they were practised. */
export function skillRows(pd3,data,now=new Date()){
  const rows=activityRows(pd3,data);
  return [...SKILLS,...(hasGrammar(data)?[GRAMMAR_SKILL]:[])].map(([id,title,parts])=>{
    const own=rows.filter(row=>parts.includes(row.id)&&row.total>0);
    const scored=own.filter(row=>row.last);
    const lastRow=scored.reduce((found,row)=>!found||row.last.at>=found.last.at?row:found,null);
    const best=scored.length?max(scored.map(row=>row.best)):null;
    const self=own.map(row=>row.self).filter(value=>value!==null&&value!==undefined);
    const lastAt=max(own.map(row=>row.lastAt));
    return {
      id,title,available:own.length>0,
      last:lastRow?lastRow.last.percent:null,best,self:self.length?Math.round(average(self)):null,
      lastAt,daysAgo:daysSince(lastAt,now),done:own.reduce((sum,row)=>sum+row.done,0),total:own.reduce((sum,row)=>sum+row.total,0),
      // Grammar: the category with the lowest share of right answers (at least 5 answers), where to practise next.
      ...(id==='grammar'?{weak:weakCategory(pd3?.grammar,grammarCategories(data))}:{})
    };
  });
}

export const STALE_DAYS=7;
/** The rule behind "what to do next": a skill not practised yet comes first; then the one left for the longest time if that is
 * STALE_DAYS or more; otherwise the skill with the lowest result (best score, or self-assessment where there is no score). Returns {skill,reason}. */
export function recommendSkill(skills){
  const open=skills.filter(skill=>skill.available);
  if(!open.length)return null;
  const fresh=open.find(skill=>!skill.lastAt);
  if(fresh)return {skill:fresh,reason:'new'};
  const oldest=open.reduce((found,skill)=>skill.daysAgo>found.daysAgo?skill:found,open[0]);
  if(oldest.daysAgo>=STALE_DAYS)return {skill:oldest,reason:'stale'};
  const level=skill=>skill.best??skill.self??0;
  return {skill:open.reduce((found,skill)=>level(skill)<level(found)?skill:found,open[0]),reason:'weak'};
}

/** For which kind of dictation mistake there is a dictation about exactly that (checked against the content, with a tip). */
export const KIND_PRACTICE={silent:'stumt-d-og-g',double:'dobbelt-konsonant',ending:'ede-og-et'};
/** Most frequent dictation mistake kinds from the saved statistics: [{kind,count,practice}] with `practice` = id of a dictation or null. */
export function weakSpots(pd3,data,limit=5){
  const errors=pd3?.stats?.dictation?.errors||{};
  const dictations=list(data,'dictations');
  return Object.entries(errors).filter(([,count])=>count>0).sort((a,b)=>b[1]-a[1]).slice(0,limit).map(([kind,count])=>{
    const target=dictations.find(item=>item.id===KIND_PRACTICE[kind]&&item.tip);
    return {kind,count,practice:target?target.id:null};
  });
}
