import test from 'node:test';
import assert from 'node:assert/strict';
const data=await import('../dist/common-words.mjs').catch(()=>({}));
import {createState} from '../dist/engine.mjs';
import {getCatalog,getWordEntries} from '../dist/course.mjs';
import {renderReference} from '../dist/reference-view.mjs';
import {formLessons,verbForms,adjectiveForms} from '../dist/forms-data.mjs';
import {referencePage} from '../dist/reference-tools.mjs';

test('common words have unique identities, contextual training and explicit noun forms',()=>{
 assert.ok(data.commonWords?.length>=90,'Missing practical word reference');
 assert.equal(new Set(data.commonWords.map(w=>w.id)).size,data.commonWords.length);
 assert.equal(new Set(data.commonWords.map(w=>w.category+'|'+w.da)).size,data.commonWords.length);
 const catalog=getCatalog(createState());
 for(const w of data.commonWords){
  assert.ok(w.da&&w.ru&&w.exampleDa&&w.exampleRu&&w.note);
  assert.ok(data.commonCategories.some(c=>c.id===w.category));
  assert.equal(catalog[w.id].da,w.exampleDa);
  assert.equal(catalog[w.id].ru,w.exampleRu);
  if(w.category==='nouns')assert.equal(w.forms.length,4);
 }
 const child=data.commonWords.find(w=>w.da==='et barn');
 assert.deepEqual(child.forms.map(f=>f.da),['et barn','barnet','børn','børnene']);
 assert.ok(getWordEntries(createState()).some(w=>w.ids.includes(child.id)));
});

const context=(extra={})=>({state:createState(),referenceTab:'common',referenceCategory:'nouns',referenceQuery:'',referencePage:99,referenceData:{verbs:verbForms,adjectives:adjectiveForms,common:data.commonWords,categories:data.commonCategories,families:[],informal:[]},referenceLessons:{forms:formLessons,quantity:[],particles:[]},...extra});
test('common-word category filters paginate correctly and keep example audio and training accessible',()=>{
 const c=context(),html=renderReference(c,()=>''),noun=data.commonWords.filter(w=>w.category==='nouns').at(-1);
 assert.match(html,new RegExp(noun.da));
 assert.doesNotMatch(html,/data-id="common-adverb-ikke"/);
 assert.match(html,new RegExp('data-action="train-word" data-id="'+noun.id+'"'));
 assert.match(html,/data-action="speak-text"/);
 const found=renderReference(context({referencePage:1,referenceQuery:'børnene'}),()=> '');
 assert.match(found,/et barn/);assert.doesNotMatch(found,/en cykel/);
 assert.equal(referencePage(data.commonWords.filter(w=>w.category==='nouns'),'børnene').total,1);
});
test('tense reference links all five existing lessons and reuses their examples',()=>{
 const html=renderReference(context({referenceTab:'tenses',referencePage:1}),()=> '');
 for(const key of ['present','past','perfect','pluperfect','future']){
  const lesson=formLessons.find(l=>l.id==='form-lesson-'+key);
  assert.match(html,new RegExp('data-action="lesson-intro" data-id="'+lesson.id+'"'));
  assert.ok(html.includes(lesson.items[0].da));
 }
 assert.match(html,/Времена/);assert.match(html,/Nutid/);assert.match(html,/Førnutid/);
 assert.doesNotMatch(html,/data-id="form-lesson-infinitive-imperative"/);
});
test('tense search ignores hidden wrong choices and finds the displayed tense name',()=>{
 const wrong=renderReference(context({referenceTab:'tenses',referencePage:1,referenceQuery:'har var'}),()=> '');
 assert.match(wrong,/Ничего не найдено/);
 assert.doesNotMatch(wrong,/data-id="form-lesson-perfect"/);
 const named=renderReference(context({referenceTab:'tenses',referencePage:1,referenceQuery:'перфект'}),()=> '');
 assert.match(named,/data-id="form-lesson-perfect"/);
});
