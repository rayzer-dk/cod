import {senseFamilies} from './meanings-data.mjs';
import {wordClasses} from './word-classes-data.mjs';
import {normalize} from './engine.mjs';

export {senseFamilies,wordClasses};
export const meaningCategories={homonym:'Одинаковая форма',construction:'Сочетания',polysemy:'Разные значения',confusion:'Похожие слова'};
export const classNames={noun:'substantiv',verb:'verbum',adjective:'adjektiv',adverb:'adverbium',pronoun:'pronomen',preposition:'præposition',conjunction:'konjunktion',article:'artikel',numeral:'talord',interjection:'interjektion'};
const russianNames={noun:'существительное',verb:'глагол',adjective:'прилагательное',adverb:'наречие',pronoun:'местоимение',preposition:'предлог',conjunction:'союз',article:'артикль',numeral:'числительное',interjection:'междометие'};
const classOptions={noun:['verb','adjective','pronoun'],verb:['noun','adverb','adjective'],adjective:['noun','adverb','verb'],adverb:['adjective','pronoun','preposition'],pronoun:['noun','conjunction','adverb'],preposition:['adverb','conjunction','article'],conjunction:['preposition','pronoun','adverb'],article:['numeral','pronoun','preposition'],numeral:['article','adjective','noun'],interjection:['adverb','conjunction','verb']};

export const meaningLessons=senseFamilies.map(f=>({
 id:f.id,kind:'meaning',level:f.level,title:f.title,subtitle:meaningCategories[f.category],color:'violet',icon:'search',rule:f.summary,
 items:f.senses.map(s=>({
  id:s.id,lessonId:f.id,da:s.da,ru:s.translation,note:`${s.form} — ${s.ru}. ${s.note}`,wordClass:s.wordClass,
  daAnswers:[s.da],ruAnswers:[s.translation],
  focus:{question:`Что здесь значит «${s.form}»?`,answers:[s.ru,...s.alternatives||[]],options:f.senses.map(v=>v.ru),answerLang:'ru'}
 }))
}));
export const classLessons=wordClasses.map(c=>({
 id:`wc-${c.id}`,kind:'wordclass',level:c.level,title:`${c.title} · ${c.ru}`,subtitle:c.cue,color:'cyan',icon:'layers',rule:`${c.summary} ${c.forms} В упражнении назови класс выделенного слова по-датски или по-русски.`,
 items:c.examples.map(e=>({
  id:e.id,lessonId:`wc-${c.id}`,da:e.da,ru:e.ru,note:e.note,wordClass:c.id,
  daAnswers:[e.da],ruAnswers:[e.ru],
  focus:{question:`К какому классу относится «${e.target}»?`,target:e.target,answers:[classNames[c.id],c.title,c.alias,russianNames[c.id],c.ru],options:[c.id,...classOptions[c.id]].map(id=>classNames[id]),answerLang:'da'}
 }))
}));

export function findFamilies(query='',category='all'){
 const needle=normalize(query);
 return senseFamilies.filter(f=>(category==='all'||f.category===category)&&(!needle||normalize([f.title,f.summary,...f.senses.flatMap(s=>[s.form,s.ru,s.note,s.da,s.translation])].join(' ')).includes(needle)));
}
