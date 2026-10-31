import test from 'node:test';
import assert from 'node:assert/strict';
import {createState,normalize} from '../dist/engine.mjs';
import {lessons,getCatalog,getWordEntries,trainingPool,importSummary,documentImportSummary,needsReview} from '../dist/course.mjs';
import {createTasks,checkTask} from '../dist/learning.mjs';

test('expanded course has separate grammar and conversation across A1-C1',()=>{
 const core=lessons.filter(l=>['grammar','context','conversation'].includes(l.kind));
 assert.equal(core.length,108);
 assert.equal(new Set(lessons.map(l=>l.id)).size,lessons.length);
 for(const level of ['A1','A2','B1','B2','C1'])assert.equal(lessons.filter(l=>l.kind==='grammar'&&l.level===level).length,({A1:7,A2:9,B1:6,B2:14,C1:14})[level]);
 assert.equal(lessons.filter(l=>l.kind==='conversation').length,46);
 const items=core.flatMap(l=>l.items);
 assert.equal(items.length,634);
 assert.equal(new Set(items.map(p=>p.id)).size,634);
});
test('every generated course exercise is solvable in every difficulty mode',()=>{
 const s=createState(),pool=trainingPool(s);
 for(const l of lessons)for(const mode of ['easy','mixed','expert']){
  for(const t of createTasks(l.items,pool,mode)){
   assert.ok(checkTask(t,t.answers[0]),`${l.id}: ${t.prompt}`);
   if(t.options.length)assert.equal(t.options.filter(v=>checkTask(t,v)).length,1);
   if(t.kind==='build'){const p=l.items.find(p=>p.id===t.itemId);assert.deepEqual([...t.bank].sort(),p.da.replace(/[.,!?;:\"“”«»]/g,'').split(/\s+/).filter(Boolean).sort());}
  }
 }
});
test('source vocabulary is preserved but ambiguous records never enter training',()=>{
 const s=createState(),all=Object.values(getCatalog(s)),pool=trainingPool(s);
 assert.equal(importSummary.sourceRows,1117);
 assert.equal(all.filter(p=>p.source==='file').length,importSummary.imported+documentImportSummary.importedEntries);
 assert.ok(needsReview.length>0);
 assert.ok(all.some(p=>p.verified===false));
 assert.ok(pool.every(p=>p.verified===true));
 assert.ok(pool.filter(p=>p.source==='file').length>800);
 const words=getWordEntries(s);
 const translations=words.filter(p=>!p.focus);
 assert.equal(new Set(translations.map(p=>normalize(p.da))).size,translations.length);
 assert.ok(words.some(p=>p.association&&p.exampleDa));
});
test('personal words and legacy lesson IDs coexist in the catalog',()=>{
 const s=createState();s.customWords.push({id:'u-example',da:'en testmappe',ru:'тестовая папка',note:'личная запись',association:'папка для теста'});
 const c=getCatalog(s);
 assert.ok(c['hello-0']);assert.equal(c['u-example'].source,'personal');
 assert.ok(trainingPool(s).some(p=>p.id==='u-example'));
});

test('meanings in context keep noun and verb examples as separate review items',()=>{
 const c=getCatalog(createState());
 const fyr=lessons.find(l=>l.id==='meaning-fyr');
 assert.ok(fyr,'fyr family must be trainable');
 assert.equal(fyr.kind,'meaning');
 assert.ok(fyr.items.some(p=>p.focus.answers.includes('парень')));
 assert.ok(fyr.items.some(p=>p.focus.answers.includes('маяк')));
 for(const p of fyr.items){assert.ok(c[p.id]);assert.ok(p.da.includes('fyr'));}
 assert.equal(new Set(fyr.items.map(p=>p.id)).size,fyr.items.length);
});
test('word classes are practiced on a target in its own context',()=>{
 const classes=lessons.filter(l=>l.kind==='wordclass');
 assert.equal(classes.length,10);
 assert.ok(classes.every(l=>l.items.length>=3&&l.items.length<=6));
 for(const l of classes)for(const p of l.items){
  assert.ok(p.da.toLocaleLowerCase('da').includes(p.focus.target.toLocaleLowerCase('da')));
  const t=createTasks([p],[p],'easy')[0];
  assert.equal(t.kind,'focus');
  assert.ok(t.options.length>=3);
 }
});

test('recognizing a class keeps its own review identity beside the same translated sentence',()=>{
 const s=createState();
 const entries=getWordEntries(s).filter(p=>p.da==='Kaffen er varm.');
 assert.equal(entries.length,2);
 assert.ok(entries.some(p=>p.focus?.answers.includes('verbum')));
 assert.ok(entries.some(p=>!p.focus));
 assert.ok(!entries.some(p=>p.ids.includes('cafe-3')&&p.ids.includes('class-verb-be')));
});

test('expert context answers accept each explicitly taught synonym separately',()=>{
 const pool=trainingPool(createState());
 const cases=[['любит, привязан к','любит'],['болеет за, поддерживает','поддерживает'],['выносит, терпит','терпит'],['размеры, мерки','размеры'],['только, всего лишь','только'],['женат, замужем','замужем']];
 for(const [gloss,answer] of cases){
  const item=pool.find(p=>p.focus?.answers[0]===gloss);assert.ok(item,gloss);
  assert.ok(checkTask(createTasks([item],pool,'expert')[0],answer),`${gloss}: ${answer}`);
 }
});
test('pine material accepts сосна while distractors distinguish the tree sense',()=>{
 const pool=trainingPool(createState());
 const wood=pool.find(p=>p.focus?.answers[0]==='сосновая древесина');
 assert.ok(wood);
 assert.ok(checkTask(createTasks([wood],pool,'expert')[0],'сосна'));
 assert.ok(!createTasks([wood],pool,'easy')[0].options.includes('сосна'));
});
