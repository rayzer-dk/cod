import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {pd3Data as data} from '../dist/pd3-data.mjs';
import {defaults} from '../dist/pd3-store.mjs';
import {hubView,readingItemView,dictationItemView,listeningItemView} from '../dist/pd3-views.mjs';
import {examFindView,examTextView,writingItemView,oralView} from '../dist/pd3-practice-views.mjs';
import {scoreDictation} from '../dist/pd3-diff.mjs';
import {analyzeWriting} from '../dist/pd3-writing-check.mjs';
const read=file=>fs.readFileSync(new URL('../'+file,import.meta.url),'utf8');
const d=defaults();

test('the real PD3 content fills every section of the hub',()=>{
 for(const key of ['readingPractice','readingExamFind','readingExamText','dictations','listening','oralMonologue','oralInterview','oralInteraction','oralDiscussion','oralPhrases','oralCriteria','writingEmail','writingTask','writingCriteria','connectors'])
  assert.ok(Array.isArray(data[key])&&data[key].length>0,key);
 const html=hubView({data,d,error:''});
 assert.doesNotMatch(html,/disabled/);assert.doesNotMatch(html,/Материалы появятся позже/);
});

test('every real item renders in its page without errors',()=>{
 for(const item of data.readingPractice){
  const html=readingItemView({item,d,run:{answers:{},checked:false,score:0}});
  assert.equal((html.match(/class="pd3-sent"/g)||[]).length,item.sentences.length,item.id);
 }
 for(const item of data.dictations){
  const html=dictationItemView({item,d,run:{inputs:{},plays:{},result:null}});assert.ok(html.length>200,item.id);
  const exact=Object.fromEntries(item.sentences.map((s,i)=>[i,s.da]));exact.all=item.sentences.map(s=>s.da).join(' ');
  const strictResult=scoreDictation(item.sentences,exact,item.mode,{strict:true});
  assert.equal(strictResult.percent,100,item.id+' strict exact copy');
  const resultHtml=dictationItemView({item,d,run:{inputs:exact,plays:{},result:strictResult}});
  assert.equal((resultHtml.match(/class="pd3-sent"/g)||[]).length,item.sentences.length,item.id);
 }
 for(const item of data.listening){
  const html=listeningItemView({item,d,run:{phase:'result',plays:1,answers:{},score:0,snap:null}});
  assert.equal((html.match(/class="pd3-sent"/g)||[]).length,item.sentences.length,item.id);
 }
 for(const item of data.readingExamFind){
  const html=examFindView({item,run:{phase:'result',answers:{},timerOn:false}});
  assert.equal((html.match(/<mark class="pd3-evid"/g)||[]).length,item.questions.length,item.id+' every evidence found in its section');
 }
 for(const item of data.readingExamText)for(const task of ['t1','t2','t3']){
  const html=examTextView({item,run:{phase:'run',task,answers:{},timerOn:true,remaining:item.minutes*60}});assert.ok(html.includes('<select')||task==='t1',item.id+task);
 }
 for(const item of data.writingEmail)for(const run of [{phase:'write',option:'A',text:''},{phase:'done',option:'A',text:item.modelAnswer}]){
  const html=writingItemView({kind:'email',item,d,run,data});assert.ok(html.includes('pd3-write')||html.includes('Образец'),item.id);
 }
 for(const item of data.writingTask)for(const key of ['A','B']){
  const html=writingItemView({kind:'task',item,d,run:{phase:'done',option:key,text:item.modelAnswers[key]},data});assert.ok(html.length>500,item.id+key);
 }
 for(const tab of ['monologue','interview','interaction','discussion','phrases']){
  const list=({monologue:data.oralMonologue,interview:data.oralInterview,interaction:data.oralInteraction,discussion:data.oralDiscussion,phrases:[{id:'x'}]})[tab];
  for(const item of list){
   const html=oralView({data,d,run:{tab,id:item.id,key:'k',step:0,started:true,kw:(item.keywords||[]).slice(0,12),rec:{phase:'idle',url:'',message:''},remaining:120,timerOn:false}});
   assert.ok(html.includes('не оценивает речь автоматически'),tab+item.id);
  }
 }
});

test('model answers pass the mechanical checks of the writing page',()=>{
 for(const e of data.writingEmail){const r=analyzeWriting(e.modelAnswer,data.connectors,e);assert.equal(r.level,'ok',e.id);assert.ok(r.connectors.length>=2,e.id+' connectors '+r.connectors.length);}
 for(const t of data.writingTask)for(const key of ['A','B']){const r=analyzeWriting(t.modelAnswers[key],data.connectors,t);assert.equal(r.level,'ok',t.id+key);assert.ok(r.connectors.length>=4,t.id+key);}
});

test('the PD3 page is wired into the app: menu, mobile row, labels, stylesheet and aggregator',()=>{
 const app=read('dist/app.mjs');
 assert.match(app,/\['pd3','target','PD3'\],\['progress'/);
 assert.equal((app.match(/aria-label="PD3, подготовка к экзамену"/g)||[]).length,2,'desktop menu and mobile row');
 assert.match(app,/\['forms','cards','Справочники'\][^\]]*\][^\]]*\][^\]]*\][^\]]*\['pd3','target','PD3'\]\]\.map/);
 for(const label of app.match(/aria-label="PD3[^"]*"/g))assert.ok(label.includes('PD3'),'the visible label PD3 is part of the accessible name');
 assert.match(app,/createPd3Store\(/);assert.match(app,/pd3\.leave\(\)/);assert.match(app,/pd3\.suspend\(\)/);
 assert.match(read('dist/views.mjs'),/pd3:c=>c\.pd3View\(\)/);
 assert.match(read('tools/build-offline.mjs'),/'basics\.css','pd3\.css'/);
 assert.ok(fs.existsSync(new URL('../dist/pd3.css',import.meta.url)));
 assert.doesNotMatch(read('dist/pd3-store.mjs'),/danskdag\.progress/,'the PD3 store never names the main progress key');
});
