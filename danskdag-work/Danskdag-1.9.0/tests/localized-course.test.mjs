import test from 'node:test';
import assert from 'node:assert/strict';
import vm from 'node:vm';
import {bundleModules} from '../tools/build-offline.mjs';
import {localizeSource,loadTranslations,languageBootstrap} from '../tools/localize-source.mjs';
import {createTasks,checkTask} from '../dist/learning.mjs';
import {relocalizeSession} from '../dist/language.mjs';

test('all built-in tasks retain Danish and migrate between both teaching languages',()=>{
 const translate=loadTranslations('.');
 const {code}=bundleModules('dist','course.mjs',{
  transform:(source,name)=>localizeSource(source,translate)+(name==='course.mjs'?'\nglobalThis.catalog=getCatalog({customWords:[]});':''),
  preamble:languageBootstrap
 });
 const builds={};
 for(const language of ['ru','uk']){
  const scope={localStorage:{getItem:()=>JSON.stringify({settings:{language}})}};
  vm.runInNewContext(code,scope);
  builds[language]=scope;
 }
 assert.deepEqual(Object.keys(builds.ru.catalog),Object.keys(builds.uk.catalog));
 for(const [id,item]of Object.entries(builds.ru.catalog)){
  for(const field of ['id','lessonId','da','exampleDa','wordClass','level','kind','verified']){
   assert.equal(item[field],builds.uk.catalog[id][field],`${id}: invariant ${field}`);
  }
 }
 for(const [sourceLanguage,targetLanguage]of [['ru','uk'],['uk','ru']]){
  const source=builds[sourceLanguage].catalog,target=builds[targetLanguage].catalog;
  const translateText=text=>builds[targetLanguage].DANSKDAG_TRANSLATE(text,targetLanguage);
  for(const [id,item]of Object.entries(source))for(const mode of ['easy','expert','auto']){
   const reviews={[id]:{seen:3,recall:1,lastGrade:'recall'}};
   const tasks=createTasks([item],[item],mode,reviews);
   const original={language:sourceLanguage,title:'',index:0,tasks,answer:tasks[0].options[0]||'typed content'};
   const expected=createTasks([target[id]],[target[id]],mode,reviews)[0];
   const migrated=relocalizeSession(original,targetLanguage,translateText,target),actual=migrated.tasks[0];
   const context=`${sourceLanguage}→${targetLanguage} ${id} ${mode}`;
   for(const field of ['prompt','question','contextTranslation'])assert.equal(actual[field],expected[field],`${context}: ${field}`);
   assert.equal(JSON.stringify(actual.answers),JSON.stringify(expected.answers),`${context}: answers`);
   if(actual.options.length){
    assert.ok(actual.options.some(option=>actual.answers.includes(option)),`${context}: correct option available`);
    assert.equal(checkTask(actual,migrated.answer),checkTask(tasks[0],original.answer),`${context}: selected answer result`);
   }else assert.equal(migrated.answer,original.answer,`${context}: typed input retained`);
  }
 }
});
