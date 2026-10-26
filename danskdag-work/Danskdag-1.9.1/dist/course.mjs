import {basicsLessons} from './basics-data.mjs';
import {lessons as contextual, grammar as quickGrammar} from './content.mjs';
import {grammarLessons, conversationLessons, languageNotes, glossary} from './curriculum.mjs';
import {needsReview, importSummary} from './vocabulary.mjs';
import {enrichedVocabulary as vocabulary} from './vocabulary-enrichment.mjs';
import {visualLessons} from './visual-data.mjs';
import {advancedLessons,extraConversationLessons} from './extended-curriculum.mjs';
import {normalize} from './engine.mjs';
import {meaningLessons,classLessons} from './wordlab.mjs';
import {formLessons} from './forms-data.mjs';
import {commonItems} from './common-words.mjs';
import {spokenLessons} from './spoken-practice.mjs';
import {dialogueLessons} from './dialogue-data.mjs';
import {dailyLexicon} from './daily-lexicon-data.mjs';
import {learningContexts} from './learning-contexts.mjs';
const dailyItems=dailyLexicon.map(item=>({...item,...(learningContexts[item.id]?{contextVariants:learningContexts[item.id]}:{})}));
import {documentVocabulary,documentImportSummary,documentNeedsReview} from './document-vocabulary.mjs';
import {patternLessons} from './patterns-data.mjs';

export const levels = {
  A1: {name:'Основы', description:'Порядок слов, артикли и первые фразы'},
  A2: {name:'Повседневный датский', description:'Времена, вопросы и привычные ситуации'},
  B1: {name:'Самостоятельная речь', description:'Придаточные, причины и мнения'},
  B2: {name:'Точность и нюансы', description:'Пассив, условия и связная аргументация'},
  C1: {name:'Сложный датский', description:'Тонкие различия и профессиональное общение'}
};
export const lessons = [
  ...basicsLessons,
  ...grammarLessons,
  ...advancedLessons,
  ...formLessons,
  ...patternLessons,
  ...contextual.map(l=>({...l,kind:'context',color:'cyan'})),
  ...conversationLessons,
  ...extraConversationLessons,
  ...spokenLessons,
  ...dialogueLessons,
  ...meaningLessons,
  ...classLessons,
  ...visualLessons
];
export const lessonById = Object.fromEntries(lessons.map(l=>[l.id,l]));
export const courseItems = lessons.flatMap(l=>l.items.map(p=>({...p,level:l.level,kind:l.kind==='visual'?'word':l.kind,source:'course',verified:true})));
export const importedItems = vocabulary.map(p=>({...p,source:'file',kind:'word',level:'B1',lessonId:null,daAnswers:p.daAnswers||[p.da],ruAnswers:[...new Set([p.ru,...(p.ruAnswers||[]),...p.ru.split(/;| \/ /).map(s=>s.trim()).filter(s=>s.length>1)])]}));
export const documentItems=documentVocabulary.map(p=>({...p,source:'file',kind:'word',level:'B1',lessonId:null,tag:'Новый словарь',daAnswers:p.daAnswers||[p.da],ruAnswers:[...new Set([p.ru,...(p.ruAnswers||[]),...p.ru.split(/;| \/ /).map(s=>s.trim()).filter(s=>s.length>1)])]}));
export {documentImportSummary,documentNeedsReview};
export {quickGrammar, languageNotes, glossary, needsReview, importSummary};

// The static part of the catalogue never changes; only the learner's own words do, so results are
// cached against a signature of those words.
const personalSignature=words=>words.map(p=>[p.id,p.da,p.ru,p.note,p.association].join('\u0001')).join('\u0002');
const cacheFor=(state,build)=>{
  const signature=personalSignature(state.customWords);
  if(build.signature!==signature){build.signature=signature;build.value=build.compute(state.customWords);}
  return build.value;
};
const catalogCache={signature:null,value:null,compute:words=>{
  const personal = words.map(p=>({...p,kind:'word',source:'personal',verified:true,level:'B1',lessonId:null,daAnswers:p.daAnswers||[p.da],ruAnswers:[...new Set([p.ru,...(p.ruAnswers||[]),...p.ru.split(/;| \/ /).map(s=>s.trim()).filter(s=>s.length>1)])]}));
  return Object.fromEntries([...courseItems,...importedItems,...documentItems,...commonItems,...dailyItems,...personal].map(p=>[p.id,p]));
}};
export function getCatalog(state) {
  return cacheFor(state,catalogCache);
}

let staticEntries=null;
function mergeEntry(combined,item) {
  const textKey=normalize(item.da).replace(/\s+/g,' ');
  const key=item.focus?`${textKey}::${normalize(`${item.focus.question} ${item.focus.target||''} ${item.focus.answers[0]}`)}`:textKey;
  const old=combined.get(key);
  if (!old) combined.set(key,{...item,ids:[item.id],sources:[item.source]});
  else {
    const preferred = !old.verified && item.verified ? item : old;
    combined.set(key,{...old,...preferred,...(old.contextVariants||item.contextVariants?{contextVariants:old.contextVariants||item.contextVariants}:{}),ids:[...new Set([...old.ids,item.id])],sources:[...new Set([...old.sources,item.source])]});
  }
}
const entriesCache={signature:null,value:null,compute:words=>{
  if(!staticEntries){staticEntries=new Map();for(const item of [...importedItems,...documentItems,...courseItems,...commonItems,...dailyItems])mergeEntry(staticEntries,item);}
  const combined=new Map(staticEntries);
  for (const item of Object.values(catalogCache.value).filter(p=>p.source==='personal'))mergeEntry(combined,item);
  return [...combined.values()];
}};
export function getWordEntries(state) {
  getCatalog(state);
  return cacheFor(state,entriesCache);
}

export function isMarked(item, ids) {
  return (item.ids || [item.id]).some(id=>ids.includes(id));
}

const poolCache={catalog:null,value:null};
export function trainingPool(state) {
  const catalog=getCatalog(state);
  if(poolCache.catalog!==catalog){poolCache.catalog=catalog;poolCache.value=Object.values(catalog).filter(p=>p.verified!==false && p.da && p.ru);}
  return poolCache.value.slice();
}
