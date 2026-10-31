import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {createTasks,checkTask} from '../dist/learning.mjs';
import {normalize,isCorrect} from '../dist/engine.mjs';
import {textNodes,loadTranslations,localizeSource,languageBootstrap} from '../tools/localize-source.mjs';

const numbersURL=new URL('../dist/numbers.mjs',import.meta.url);
const dataURL=new URL('../dist/basics-data.mjs',import.meta.url);
const viewURL=new URL('../dist/basics-view.mjs',import.meta.url);

test('cardinal conversion follows Danish units, irregular tens and grouped large numbers',async()=>{
 assert.ok(fs.existsSync(numbersURL),'numbers module must exist');
 const {numberToDanish}=await import(numbersURL);
 const examples=new Map([[0,'nul'],[1,'en'],[11,'elleve'],[16,'seksten'],[20,'tyve'],[21,'enogtyve'],[32,'toogtredive'],[45,'femogfyrre'],[50,'halvtreds'],[56,'seksoghalvtreds'],[60,'tres'],[70,'halvfjerds'],[78,'otteoghalvfjerds'],[80,'firs'],[90,'halvfems'],[99,'nioghalvfems'],[100,'et hundrede'],[101,'et hundrede og en'],[250,'to hundrede og halvtreds'],[1000,'et tusind'],[1001,'et tusind og en'],[1020,'et tusind og tyve'],[1100,'et tusind et hundrede'],[2025,'to tusind og femogtyve'],[2345,'to tusind tre hundrede og femogfyrre'],[9999,'ni tusind ni hundrede og nioghalvfems']]);
 for(const [number,expected] of examples)assert.equal(numberToDanish(number),expected,String(number));
 for(const value of [-1,10000,1.1,Infinity,NaN,'21',null,undefined,Number.MAX_SAFE_INTEGER])assert.throws(()=>numberToDanish(value),RangeError,String(value));
});

test('beginner lessons have stable identities and remain solvable in every study mode',async()=>{
 assert.ok(fs.existsSync(dataURL),'beginner content module must exist');
 const {basicsLessons,readingTexts}=await import(dataURL);
 assert.deepEqual(basicsLessons.map(l=>l.id),[1,2,3,4].map(n=>`basics-numbers-${n}`).concat([1,2,3].map(n=>`basics-reading-${n}`)));
 const items=basicsLessons.flatMap(l=>l.items),ids=new Set();
 for(const lesson of basicsLessons){
  assert.equal(lesson.kind,lesson.id.includes('reading')?'reading':'numbers');assert.equal(lesson.level,'A1');assert.equal(lesson.items.length,6);
  for(const key of ['title','subtitle','rule','icon','color'])assert.ok(lesson[key]?.trim(),`${lesson.id}: ${key}`);
  for(const item of lesson.items){
   assert.ok(!ids.has(item.id));ids.add(item.id);assert.equal(item.lessonId,lesson.id);
   for(const key of ['da','ru','note'])assert.ok(item[key]?.trim(),`${item.id}: ${key}`);
   assert.ok(isCorrect(item.da,item.daAnswers));assert.ok(isCorrect(item.ru,item.ruAnswers));
   const task=item.focus||item.gap;
   assert.equal(new Set(task.options.map(normalize)).size,4,item.id);
   assert.equal(task.options.filter(o=>isCorrect(o,task.answers)).length,1,item.id);
   if(item.gap)assert.ok(isCorrect(item.gap.text.replace('___',item.gap.answers[0]),item.daAnswers),item.id);
  }
 }
 for(const mode of ['easy','mixed','expert','auto']){
  const tasks=createTasks(items,items,mode,{});assert.equal(tasks.length,42);
  for(const task of tasks){assert.ok(checkTask(task,task.answers[0]),task.itemId);assert.equal(task.options.length,mode==='expert'?0:4,task.itemId);}
 }
 assert.equal(readingTexts.length,3);
 for(const text of readingTexts){
  const lesson=basicsLessons.find(l=>l.id===text.lessonId);assert.ok(lesson);
  assert.ok(text.sentences.length>=4);assert.equal(text.da,text.sentences.map(s=>s.da).join(' '));assert.equal(text.ru,text.sentences.map(s=>s.ru).join(' '));
  assert.equal(new Set(lesson.items.map(i=>i.focus.question)).size,6);
  for(const item of lesson.items){assert.equal(item.da,text.da);assert.equal(item.focus.answerLang,'ru');assert.match(item.focus.answers[0],/[А-Яа-яЁё]/);}
 }
});

test('numbers input is bounded, labelled and speaks the entire result without injecting input',async()=>{
 assert.ok(fs.existsSync(viewURL),'beginner view module must exist');
 const {renderNumberResult,renderBasics}=await import(viewURL);
 const valid=renderNumberResult('2025');assert.match(valid,/data-text="to tusind og femogtyve"/);assert.match(valid,/lang="da"/);
 for(const invalid of ['','-1','10000','1.5','1e2','21x','<img src=x onerror=alert(1)>']){
  const html=renderNumberResult(invalid);assert.doesNotMatch(html,/data-action="speak-text"/);assert.doesNotMatch(html,/<img|onerror/);assert.ok(html.trim());
 }
 const collected=[];const renderLessons=lessons=>{collected.push(lessons);return '<section>LESSONS</section>';};
 const c={basicsTab:'numbers',numberValue:'21',state:{}};
 const numbers=renderBasics(c,renderLessons);
 assert.match(numbers,/for="number-input"/);assert.match(numbers,/id="number-input"/);assert.match(numbers,/inputmode="numeric"/);assert.match(numbers,/id="number-result"[^>]*aria-live="polite"/);assert.match(numbers,/aria-describedby="number-help"/);assert.match(numbers,/0–9999/);assert.match(numbers,/data-action="basics-tab"/);
 assert.equal(collected[0].length,4);
 const reading=renderBasics({...c,basicsTab:'reading'},renderLessons);assert.equal(collected[1].length,3);assert.match(reading,/<details/);assert.match(reading,/<summary/);assert.match(reading,/data-action="speak-text"/);assert.doesNotMatch(reading,/id="number-input"/);
});

test('all beginner strings have authored Ukrainian translations and preserve Danish speech text',async()=>{
 assert.ok(fs.existsSync(dataURL)&&fs.existsSync(viewURL));
 const root=new URL('../',import.meta.url).pathname,translate=loadTranslations(root);
 for(const sourceURL of [dataURL,viewURL]){
  const source=fs.readFileSync(sourceURL,'utf8');assert.ok(textNodes(source).length>0);
  for(const {value} of textNodes(source))assert.ok(translate(value).trim());
  assert.doesNotThrow(()=>localizeSource(source,translate));
 }
 const {basicsLessons}=await import(dataURL);
 const translatedSource=languageBootstrap+'\n'+localizeSource(fs.readFileSync(dataURL,'utf8'),translate);
 const ukrainian=await import('data:text/javascript;base64,'+Buffer.from(translatedSource).toString('base64'));
 for(let i=0;i<basicsLessons.length;i++){
  const original=basicsLessons[i],translated=ukrainian.basicsLessons[i];
  for(let j=0;j<original.items.length;j++){
   assert.equal(translated.items[j].da,original.items[j].da);
   assert.doesNotMatch(translated.items[j].ru+' '+translated.items[j].note,/[ыэъЫЭЪ]/);
  }
  for(const mode of ['easy','mixed','expert','auto'])for(const task of createTasks(translated.items,translated.items,mode,{})){
   assert.ok(checkTask(task,task.answers[0]));
   if(task.options.length)assert.equal(task.options.filter(option=>checkTask(task,option)).length,1);
  }
 }
});
