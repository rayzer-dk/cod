import {normalize} from './engine.mjs';
// Search-only folding of the Danish letters, applied to the query AND to the searched text: å and aa become a, ø and oe become o,
// æ becomes ae. So "hojtryksrenser" finds "højtryksrenser" and "aeble" finds "æble". It is never used to check an answer:
// there normalize() keeps å, ø, æ distinct and "aa" is not "å".
const SEARCH_FOLDS=[[/aa/g,'a'],[/å/g,'a'],[/oe/g,'o'],[/ø/g,'o'],[/æ/g,'ae']];
export const searchKey=value=>SEARCH_FOLDS.reduce((text,[from,to])=>text.replace(from,to),normalize(value));
const hiddenKeys=new Set(['id','lessonId','category','group','wordClass','kind','source','verified']);
function visibleText(value){if(typeof value==='string')return [value];if(Array.isArray(value))return value.flatMap(visibleText);if(value&&typeof value==='object')return Object.entries(value).filter(([key])=>!hiddenKeys.has(key)).flatMap(([,v])=>visibleText(v));return [];}
function filteredReferenceRows(rows,query){
 const key=searchKey(query);
 if(!key)return rows;
 return rows.filter(row=>{
  const forms=row.participle&&row.auxiliary?row.auxiliary.split('/').flatMap(aux=>[`${aux} ${row.participle}`,`${aux==='er'?'var':'havde'} ${row.participle}`]):[];
  return searchKey([...visibleText(row),...forms].join(' ')).includes(key);
 });
}
export function referencePage(rows,query='',requestedPage=1,pageSize=20){
 const filtered=filteredReferenceRows(rows,query),size=Math.max(1,Math.min(40,Math.trunc(pageSize)||20)),pages=Math.max(1,Math.ceil(filtered.length/size)),page=Math.max(1,Math.min(pages,Math.trunc(requestedPage)||1));
 return {items:filtered.slice((page-1)*size,page*size),total:filtered.length,pages,page,pageSize:size};
}

export const referenceTabs=[['daily','По ситуациям'],['spoken','Разговорные фразы'],['verbs','Глаголы'],['common','Классы слов'],['tenses','Времена'],['adjectives','Сравнение'],['particles','Частицы и приставки'],['informal','Сленг и ругательства']];
export const tenseNames={present:['Nutid','Настоящее'],past:['Datid','Прошедшее'],perfect:['Førnutid','Перфект'],pluperfect:['Førdatid','Предпрошедшее'],future:['Fremtid','Будущее']};
const verbGroups=[['auxiliary','Вспомогательные'],['modal','Модальные'],['irregular','Неправильные'],['regular-te','Регулярные · -te'],['regular-ede','Регулярные · -ede']];
export function referenceSelection(c){
 const source=c.referenceData,tab=referenceTabs.some(([id])=>id===c.referenceTab)?c.referenceTab:'daily';
 const tenseLessons=(c.referenceLessons?.forms||[]).filter(l=>tenseNames[l.id.replace('form-lesson-','')]).map(l=>({id:l.id,level:l.level,title:l.title,rule:l.rule,tense:tenseNames[l.id.replace('form-lesson-','')].join(' '),items:l.items.slice(0,2).map(({da,ru})=>({da,ru}))}));
 const categories=({common:source.categories,daily:source.dailyCategories,spoken:source.spokenCategories})[tab]||[];
 const filters=tab==='verbs'?verbGroups:tab==='tenses'?Object.entries(tenseNames).map(([id,[da,ru]])=>[id,`${da} · ${ru}`]):categories.map(cat=>[cat.id,cat.title]);
 const selected=filters.some(([id])=>id===c.referenceCategory)?c.referenceCategory:'all';
 let rows=({verbs:source.verbs,adjectives:source.adjectives,particles:source.families,informal:source.informal,common:source.common,daily:source.daily,spoken:source.spoken,tenses:tenseLessons})[tab]||[];
 if(selected!=='all')rows=rows.filter(row=>tab==='verbs'?row.group===selected:tab==='tenses'?row.id==='form-lesson-'+selected:row.category===selected);
 const matching=filteredReferenceRows(rows,c.referenceQuery);
 return {tab,filters,selected,categories,rows:matching,data:referencePage(matching,'',c.referencePage,10)};
}
