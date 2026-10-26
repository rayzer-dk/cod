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
