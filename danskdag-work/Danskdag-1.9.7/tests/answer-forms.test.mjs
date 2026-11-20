import test from 'node:test';
import assert from 'node:assert/strict';
import {createTasks,checkTask,isFunctionWord,hasMovableAdverbial,hasOrderVariant} from '../dist/learning.mjs';
import {trainingPool} from '../dist/course.mjs';
import {createState,normalize} from '../dist/engine.mjs';

const pool=trainingPool(createState());
const typedDanish=item=>createTasks([item],pool,'expert')[0];
const lemma=text=>normalize(text).replace(/^(en|et|at) /,'');

test('typed Danish answers are consistent across duplicate dictionary entries (whole catalog)',()=>{
 const byLemma=new Map();
 let articleHints=0,infinitiveHints=0;
 for(const [i,item] of pool.entries()){
  if(i%3&&!/^(en|et|at) \S+$/i.test(item.da)&&item.source!=='file')continue; // article/"at" entries and every imported word, a third of the rest
  const task=typedDanish(item);
  if(task.kind!=='type'||!task.reverse||task.hint===undefined&&!task.answers.some(a=>/^(en|et|at) \S/i.test(a)))continue;
  const articled=task.answers.filter(a=>/^(en|et) \S/i.test(a));
  // once the article is known for a lemma, no bare form of that lemma is accepted
  for(const a of articled)assert.ok(!task.answers.some(b=>normalize(b)===lemma(a)&&!task.answers.some(c=>/^at \S/i.test(c))),item.id+': '+task.answers.join(' | '));
  if(task.hint==='article'){articleHints++;assert.ok(task.answers.every(a=>/^(en|et) \S/i.test(a)),item.id);}
  if(task.hint==='infinitive'){infinitiveHints++;
   for(const a of task.answers.filter(a=>/^at \S/i.test(a)))assert.ok(checkTask(task,a.slice(3)),item.id+': bare verb must be accepted');}
  for(const a of task.answers)(byLemma.get(lemma(a))||byLemma.set(lemma(a),[]).get(lemma(a))).push({id:item.id,answers:task.answers});
 }
 assert.ok(articleHints>300&&infinitiveHints>80,`${articleHints} article hints, ${infinitiveHints} infinitive hints`);
 // the reported inconsistency: the same word, with and without a dictionary article/"at", behaves identically
 const tender=['everyday-at-taende'].map(id=>pool.find(p=>p.id===id))[0];
 assert.ok(checkTask(typedDanish(tender),'tænde')&&checkTask(typedDanish(tender),'at tænde'));
 const fridge=pool.find(p=>p.id==='everyday-et-koeleskab'),fridgeTask=typedDanish(fridge);
 assert.equal(fridgeTask.hint,'article');assert.ok(checkTask(fridgeTask,'et køleskab'));assert.ok(!checkTask(fridgeTask,'køleskab'));
 const rainA=typedDanish(pool.find(p=>p.id==='visual-rain')),rainB=typedDanish(pool.find(p=>p.id==='everyday-en-regn'));
 assert.deepEqual(rainA.answers,rainB.answers);
});

test('adaptive cloze never asks a function word from a single example sentence (whole catalog)',()=>{
 let gaps=0,withheld=0;
 for(const item of pool){
  const review={[item.id]:{box:1,due:0,seen:3,recognition:3,lastGrade:'recognition'}};
  const task=createTasks([item],pool,'auto',review)[0];
  if(isFunctionWord(item)&&item.exampleDa&&!item.contextVariants&&!item.contextGap){withheld++;assert.notEqual(task.kind,'gap',item.id+' '+item.da);}
  if(task.kind==='gap'&&task.stage==='recall'){gaps++;if(!item.contextVariants&&!item.contextGap)assert.equal(isFunctionWord(item),false,item.id+' '+item.da);}
 }
 assert.ok(withheld>=40,'function words with examples: '+withheld);
 assert.ok(gaps>1000,'content-word clozes remain: '+gaps);
 // the case from the report
 const da=pool.find(p=>p.da==='da'&&p.exampleDa),fra=pool.find(p=>p.da==='fra');
 for(const w of [da,fra]){
  const t=createTasks([w],pool,'auto',{[w.id]:{box:1,due:0,seen:3,recognition:3,lastGrade:'recognition'}})[0];
  assert.equal(t.kind,'type');assert.ok(checkTask(t,w.da));
 }
});

test('build is offered only for sentences whose word order is unambiguous or fully listed (whole catalog)',()=>{
 let build=0,withheld=0;
 for(const item of pool){
  if(item.focus||item.gap)continue;
  const review={[item.id]:{box:0,due:0,seen:1,recognition:1,recall:0,lastGrade:'recognition'}};
  const task=createTasks([item],pool,'auto',review)[0];
  if(task.kind==='build'){build++;assert.ok(!hasMovableAdverbial(item.da)||hasOrderVariant(item),item.da);}
  else if(hasMovableAdverbial(item.da)&&item.da.split(/\s+/).length>=4&&!hasOrderVariant(item)){withheld++;assert.notEqual(task.kind,'build');}
 }
 assert.ok(build>100,'build tasks remain: '+build);
 assert.ok(withheld>20,'unsafe sentences withheld: '+withheld);
});
