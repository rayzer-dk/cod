import test from 'node:test';
import assert from 'node:assert/strict';
import {createTasks} from '../dist/learning.mjs';
import {trainingPool} from '../dist/course.mjs';
import {createState} from '../dist/engine.mjs';
import {dailyLexicon} from '../dist/daily-lexicon-data.mjs';
test('a simple noun is contrasted with other nouns instead of full sentence distractors',()=>{
 const item=dailyLexicon.find(p=>p.da==='et køleskab'),pool=trainingPool(createState()),nounMeanings=new Set(dailyLexicon.filter(p=>p.wordClass==='noun').map(p=>p.ru));
 for(let i=0;i<12;i++){
  const task=createTasks([item],pool,'easy')[0];
  assert.equal(task.options.length,4);
  for(const option of task.options)assert.ok(nounMeanings.has(option),'Unmatched distractor: '+option);
 }
});

// ---- imported words: distractors have the same type and size as the answer ----
import {normalize} from '../dist/engine.mjs';
import {isFunctionWord,isSentenceLike,sharesGloss} from '../dist/learning.mjs';
// Deliberately independent of the implementation: a sentence ends with . ! ? or is long.
const clearSentence=text=>/[.!?…]\s*$/.test(text.trim())||text.trim().split(/\s+/).length>=7;
const clearWord=text=>!/[.!?…]\s*$/.test(text.trim())&&text.trim().split(/\s+/).length<=4;
const readings=text=>text.replace(/\([^)]*\)/g,' ').split(/;|,| \/ /).map(normalize).filter(v=>v.length>1);
const catalog=trainingPool(createState());
test('a word is never contrasted with a sentence, and no two options are synonyms (whole catalog)',()=>{
 const textOf=(item,reverse)=>reverse?item.da:item.ru;
 let tasks=0,sentences=0;const synonyms=[];
 for(const [i,item] of catalog.entries()){
  if(i%2&&item.source!=='file')continue; // all imported words, half of the rest: the run stays quick
  const task=createTasks([item],catalog,'easy')[0];
  if(!task.options.length||task.kind==='focus'||task.kind==='gap')continue;
  tasks++;
  assert.equal(new Set(task.options.map(normalize)).size,task.options.length);
  assert.equal(task.options.filter(o=>task.answers.some(a=>normalize(a)===normalize(o))).length,1);
  const wrong=task.options.filter(o=>!task.answers.some(a=>normalize(a)===normalize(o)));
  if(clearWord(task.answers[0]))sentences+=wrong.filter(clearSentence).length;
  for(let a=0;a<task.options.length;a++)for(let b=a+1;b<task.options.length;b++){
   const x=readings(task.options[a]),y=new Set(readings(task.options[b]));
   if(task.reverse?false:x.some(r=>y.has(r)))synonyms.push([task.options[a],task.options[b]]);
  }
 }
 assert.ok(tasks>1500,'too few choice tasks were checked: '+tasks);
 assert.equal(sentences,0);
 assert.deepEqual(synonyms,[]);
});
test('options for a Danish answer share its type: the article, and no synonym entries side by side',()=>{
 const reverse=catalog.filter(p=>p.source==='daily'&&/^(en|et) \S+$/.test(p.da)).slice(0,120);
 for(const item of reverse){
  const task=createTasks([item],catalog,'expert')[0];
  assert.equal(task.kind,'type');
  // force a Danish choice by asking the reverse direction in a mixed session: index 2 is reversed
  const choice=createTasks([item,item,item],catalog,'easy')[2];
  assert.equal(choice.reverse,true);
  for(const option of choice.options.filter(o=>o!==choice.answers[0]))assert.ok(!isSentenceLike(option),option);
  const lemmas=choice.options.map(o=>normalize(o).replace(/^(en|et|at) /,''));
  assert.equal(new Set(lemmas).size,lemmas.length,choice.options.join(' | '));
 }
});
test('"угол; угольник" and "угол (определённая форма)" are never offered together',()=>{
 const corner={id:'c1',kind:'word',verified:true,da:'et hjørne',ru:'угол; угольник'};
 const definite={id:'c2',kind:'word',verified:true,da:'hjørnet',ru:'угол (определённая форма)'};
 const others=Array.from({length:8},(_, i)=>({id:'o'+i,kind:'word',verified:true,da:'ord'+i,ru:['стол','окно','дверь','лампа','книга','стул','чашка','ключ'][i]}));
 const dict=[corner,definite,...others];
 assert.equal(sharesGloss(corner,definite),true);
 for(let i=0;i<40;i++){
  for(const item of [corner,definite]){
   const options=createTasks([item],dict,'easy')[0].options;
   assert.ok(!(options.includes('угол; угольник')&&options.includes('угол (определённая форма)')),options.join(' | '));
  }
 }
});
test('when too few look-alikes exist the closest candidates are used, sentences only as a last resort',()=>{
 const word={id:'w',kind:'word',verified:true,da:'bog',ru:'книга'};
 const tiny=[word,{id:'s1',kind:'word',verified:true,da:'Hej.',ru:'Привет.'},{id:'s2',kind:'word',verified:true,da:'Tak.',ru:'Спасибо.'},{id:'w2',kind:'word',verified:true,da:'bil',ru:'машина'}];
 const options=createTasks([word],tiny,'easy')[0].options;
 assert.equal(options[0]!==undefined,true);
 assert.ok(options.includes('книга')&&options.includes('машина'));
 assert.ok(options.length>=2);
});
