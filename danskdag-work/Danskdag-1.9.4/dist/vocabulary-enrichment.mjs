import {vocabulary} from './vocabulary.mjs';
import {vocabularyExtra1} from './vocabulary-extra-1.mjs';
import {vocabularyExtra2} from './vocabulary-extra-2.mjs';
import {vocabularyExtra3} from './vocabulary-extra-3.mjs';
import {vocabularyExtra4} from './vocabulary-extra-4.mjs';
import {findWord} from './text.mjs';
const extras=new Map([...vocabularyExtra1,...vocabularyExtra2,...vocabularyExtra3,...vocabularyExtra4].map(p=>[p.id,p]));
const contextTargets={'v-6e83d674e9a4':'Det kommer an på','v-42a5b49023e6':'sammenligner','v-adc76d3926e8':'Jeg går i gang','v-132224781de1':'God arbejdslyst','v-114461e1c366':'Følgesedlen','v-8f5942f92017':'Gevindet','v-e306107509ae':'tidsfristen','v-fc4cf526e1b9':'Skydelæren','v-4fce969cf9ca':'momentnøglen','v-ad06ff5a27db':'Trillebøren','v-5f5564c4ee15':'Foderet','v-1d854aba900b':'Spanden'};
export const enrichedVocabulary=vocabulary.map(item=>{
 const extra=extras.get(item.id);
 const found=contextTargets[item.id]&&findWord(item.exampleDa,contextTargets[item.id]);
 if(found)return {...item,contextGap:{text:item.exampleDa.slice(0,found.index)+'___'+item.exampleDa.slice(found.index+found.value.length),answers:[found.value]}};
 if(!item.verified||!extra)return item;
 return {...item,...extra,sourceDa:item.da,sourceRu:item.ru,da:extra.practiceDa||item.da,ru:extra.practiceRu||item.ru,note:[...new Set([item.note,extra.note].filter(Boolean))].join(' ')};
});
