import test from 'node:test';
import assert from 'node:assert/strict';
import {createState} from '../dist/engine.mjs';
import {renderView} from '../dist/views.mjs';
test('colored V2 tokens expose complete spaced sentences to speech extraction',()=>{
 const html=renderView('grammar',{state:createState(),next:null,session:null,due:[],todayXP:0,fileCount:1169,memoryPlan:{items:[],dueTotal:0,newCount:0,newToday:0,newLimit:6}});
 const lines=[...html.matchAll(/<div class="word-line" lang="da">(.*?)<\/div>/g)].map(m=>m[1].replace(/<[^>]+>/g,''));
 assert.deepEqual(lines,['Jeg arbejder i dag.','I dag arbejder jeg.']);
});
