import test from 'node:test';
import assert from 'node:assert/strict';
import {renderReference} from '../dist/reference-view.mjs';
import {createState} from '../dist/engine.mjs';
import {verbForms,adjectiveForms,formLessons} from '../dist/forms-data.mjs';
import {commonWords,commonCategories} from '../dist/common-words.mjs';

const context=tab=>({state:createState(),referenceTab:tab,referenceCategory:'all',referenceQuery:'',referencePage:1,referenceData:{verbs:verbForms,adjectives:adjectiveForms,common:commonWords,categories:commonCategories,families:[],informal:[]},referenceLessons:{forms:formLessons,quantity:[],particles:[]}});
test('reference words and comparisons start collapsed while keeping audio outside disclosure',()=>{
 for(const tab of ['common','adjectives']){
  const html=renderReference(context(tab),()=> '');
  assert.match(html,/<details class="reference-disclosure">/);
  assert.doesNotMatch(html,/<details[^>]*\sopen(?:\s|>)/);
  assert.match(html,/<\/details><div class="entry-audio">/);
  assert.match(html,/data-action="speak-text"/);
 }
});
test('verbs have compact mobile forms and retain the full desktop comparison table',()=>{
 const html=renderReference(context('verbs'),()=> '');
 assert.match(html,/class="verb-compact-list"/);
 assert.match(html,/aria-label="Таблица форм глаголов"/);
 assert.match(html,/Førdatid/);
 assert.match(html,/data-action="speak-text"[^>]*data-text="havde været"/);
});
