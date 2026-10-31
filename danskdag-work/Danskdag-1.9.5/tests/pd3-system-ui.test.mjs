import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {createState,validateState,awardPd3} from '../dist/engine.mjs';
import {defaults,recordScore} from '../dist/pd3-store.mjs';
import {pd3Data as data} from '../dist/pd3-data.mjs';
import {activityRows,skillRows,recommendSkill,daysUntil,daysSince,weakSpots,pd3Totals,KIND_PRACTICE,STALE_DAYS,ACTIVITIES} from '../dist/pd3-progress.mjs';
import {planView,weakView,pd3ProgressSection,pd3HomeLine,dateText} from '../dist/pd3-system-view.mjs';
import {hubView,readingItemView,dictationResultView,resultBlock,errorLabel} from '../dist/pd3-views.mjs';
import {vocabKey,vocabExample,newOwnWords} from '../dist/pd3-vocab.mjs';
import {renderView} from '../dist/views.mjs';
import {getCatalog,getWordEntries} from '../dist/course.mjs';
import {planMemorySession,memorySummary} from '../dist/memory.mjs';
import {scoreDictation} from '../dist/pd3-diff.mjs';

const NOW=new Date('2026-10-26T10:00:00Z'),DAY=86400000;
const ago=days=>NOW.getTime()-days*DAY;
const pd3Of=change=>{const d=defaults();change(d);return d;};
const first=list=>list[0].id;

/* ---------- progress numbers ---------- */

test('activity rows count finished items per activity against the real content',()=>{
 const reading=first(data.readingPractice),exam=first(data.readingExamText),oral='mono-'+first(data.oralMonologue);
 const d=pd3Of(x=>{
  recordScore(x.reading,reading,60,null,ago(2));recordScore(x.reading,reading,85,null,ago(1));recordScore(x.reading,'not-in-content',100,null,ago(1));
  recordScore(x.exam.text,exam,70,[1,2,3],ago(3));
  x.writing[first(data.writingEmail)]={draft:'x',option:'A',updatedAt:ago(4),done:true,req:[],check:[],self:{content:4,grammar:2}};
  x.writing[first(data.writingTask)]={draft:'y',option:'A',updatedAt:ago(5),done:false,req:[],check:[],self:{}};
  x.oral[oral]={keywords:[],self:{fluency:5},done:true,updatedAt:ago(6)};
 });
 const rows=Object.fromEntries(activityRows(d,data).map(r=>[r.id,r]));
 assert.deepEqual(ACTIVITIES.map(a=>a[0]),['reading','dictation','listening','exam','writing','oral']);
 assert.equal(rows.reading.done,1);assert.equal(rows.reading.total,data.readingPractice.length);assert.equal(rows.reading.best,85);assert.equal(rows.reading.last.percent,85);
 assert.equal(rows.exam.done,1);assert.equal(rows.exam.total,data.readingExamFind.length+data.readingExamText.length);assert.equal(rows.exam.best,70);
 assert.equal(rows.writing.done,1,'only finished pieces count as done');assert.equal(rows.writing.self,Math.round((4+2)/2/5*100));
 assert.equal(rows.oral.done,1);assert.equal(rows.oral.total,data.oralMonologue.length+data.oralInterview.length+data.oralInteraction.length+data.oralDiscussion.length);assert.equal(rows.oral.self,100);
 assert.equal(rows.dictation.done,0);assert.equal(rows.dictation.best,null);assert.equal(rows.dictation.lastAt,0);
 const totals=pd3Totals(d,data);assert.equal(totals.done,4);assert.equal(pd3Totals(undefined,data),null);
});

test('days: calendar days since a time stamp and until the exam, by the Copenhagen calendar',()=>{
 assert.equal(daysSince(0,NOW),null);assert.equal(daysSince(ago(0),NOW),0);assert.equal(daysSince(ago(3),NOW),3);
 assert.equal(daysUntil('2026-10-26',NOW),0);assert.equal(daysUntil('2026-11-30',NOW),35);assert.equal(daysUntil('2026-10-20',NOW),-6);
 assert.equal(daysUntil('',NOW),null);assert.equal(daysUntil('26.11.2026',NOW),null);
 assert.equal(dateText(Date.parse('2026-10-24T22:30:00Z')),'25.10.2026');
});

test('the suggestion follows one rule: not started, then left for 7+ days, then the lowest result',()=>{
 const none=skillRows(undefined,data,NOW);
 assert.equal(none.length,5,'four exam skills and grammar');assert.ok(none.every(s=>s.available));
 assert.deepEqual([recommendSkill(none).reason,recommendSkill(none).skill.id],['new','reading'],'with nothing done the first skill is suggested');
 const reading=first(data.readingPractice),listening=first(data.listening);
 const mk=({r,w,l,o})=>pd3Of(d=>{
  if(r)recordScore(d.reading,reading,r[0],null,ago(r[1]));
  if(l)recordScore(d.listening,listening,l[0],null,ago(l[1]));
  if(w)d.writing[first(data.writingEmail)]={draft:'x',option:'A',updatedAt:ago(w[1]),done:true,req:[],check:[],self:{content:w[0]}};
  if(o)d.oral['mono-'+first(data.oralMonologue)]={keywords:[],self:{fluency:o[0]},done:true,updatedAt:ago(o[1])};
 });
 const stale=recommendSkill(skillRows(mk({r:[90,1],w:[5,STALE_DAYS+2],l:[90,0],o:[5,2]}),data,NOW));
 assert.deepEqual([stale.reason,stale.skill.id],['stale','writing']);
 const oldest=recommendSkill(skillRows(mk({r:[90,10],w:[5,STALE_DAYS+2],l:[90,0],o:[5,2]}),data,NOW));
 assert.equal(oldest.skill.id,'reading','the longest-neglected skill wins');
 const weak=recommendSkill(skillRows(mk({r:[90,1],w:[5,2],l:[40,0],o:[5,2]}),data,NOW));
 assert.deepEqual([weak.reason,weak.skill.id],['weak','listening']);
 const rows=skillRows(mk({r:[50,3]}),data,NOW).find(s=>s.id==='reading');
 assert.deepEqual([rows.last,rows.best,rows.daysAgo],[50,50,3]);
 assert.equal(recommendSkill(skillRows(undefined,{},NOW)),null,'no content, no suggestion');
});

test('frequent mistakes: the top five by count, with a practice link only where a dictation with a tip exists',()=>{
 for(const [kind,id] of Object.entries(KIND_PRACTICE)){
  const dictation=data.dictations.find(x=>x.id===id);assert.ok(dictation&&dictation.tip,kind+' -> '+id);
 }
 const d=pd3Of(x=>{x.stats.dictation={runs:9,errors:{aeoa:3,double:7,silent:9,ending:1,case:2,other:4,missing:8}};});
 const spots=weakSpots(d,data);
 assert.deepEqual(spots.map(s=>s.kind),['silent','missing','double','other','aeoa']);
 assert.deepEqual(spots.map(s=>s.count),[9,8,7,4,3]);
 assert.equal(spots[0].practice,'stumt-d-og-g');assert.equal(spots[1].practice,null);assert.equal(spots[2].practice,'dobbelt-konsonant');
 assert.deepEqual(weakSpots(defaults(),data),[]);
 assert.equal(weakSpots(d,{dictations:[]})[0].practice,null);
 const html=weakView({d,data,label:errorLabel});
 assert.match(html,/Частые ошибки в диктантах/);assert.equal((html.match(/data-action="pd3-weak-practice"/g)||[]).length,2);
 assert.match(html,/data-id="stumt-d-og-g"/);assert.match(html,/Немые буквы/);assert.equal(weakView({d:defaults(),data,label:errorLabel}),'');
});

/* ---------- views ---------- */

test('exam plan: countdown, four skills, one suggestion with its rule, no promises',()=>{
 const empty=planView({d:defaults(),data,now:NOW});
 assert.match(empty,/id="pd3-exam-date"/);assert.match(empty,/Укажи дату экзамена/);assert.doesNotMatch(empty,/pd3-plan-clear/);
 assert.equal((empty.match(/<li><b>/g)||[]).length,5,'four exam skills and grammar');
 assert.match(empty,/Как выбирается подсказка/);assert.match(empty,/не прогноз результата на экзамене/);
 assert.doesNotMatch(empty,/гарант|обязательно сдаш|точно сдаш/i);
 const set=planView({d:pd3Of(x=>{x.plan.examDate='2026-11-30';}),data,now:NOW});
 assert.match(set,/value="2026-11-30"/);assert.match(set,/До экзамена: 35 дней\./);assert.match(set,/pd3-plan-clear/);assert.match(set,/aria-live="polite"/);
 assert.match(planView({d:pd3Of(x=>{x.plan.examDate='2026-10-26';}),data,now:NOW}),/Экзамен сегодня/);
 assert.match(planView({d:pd3Of(x=>{x.plan.examDate='2026-10-01';}),data,now:NOW}),/уже прошла/);
 assert.match(planView({d:pd3Of(x=>{x.plan.examDate='2026-10-27';}),data,now:NOW}),/До экзамена: 1 день\./);
 assert.match(planView({d:pd3Of(x=>{x.plan.examDate='2026-10-30';}),data,now:NOW}),/До экзамена: 4 дня\./);
 const advice=planView({d:defaults(),data,now:NOW});
 assert.match(advice,/Что делать дальше:/);assert.match(advice,/data-action="pd3-advice" data-value="reading"/);
});

test('hub shows the plan and the mistakes block next to the six sections (still six section buttons)',()=>{
 const d=pd3Of(x=>{x.stats.dictation={runs:1,errors:{double:2}};});
 const html=hubView({data,d,error:'',now:NOW});
 assert.equal((html.match(/data-action="pd3-open"/g)||[]).length,6);
 assert.match(html,/План подготовки/);assert.match(html,/Частые ошибки в диктантах/);assert.match(html,/pd3-export/);
 assert.match(html,/входят в общий прогресс/);
});

test('progress page section: every activity with done/total, best result, last activity and a link; hidden while PD3 is unused',()=>{
 assert.equal(pd3ProgressSection(undefined,data),'');
 const reading=first(data.readingPractice);
 const d=pd3Of(x=>recordScore(x.reading,reading,85,null,Date.parse('2026-10-24T12:00:00Z')));
 const html=pd3ProgressSection(d,data);
 assert.equal((html.match(/data-action="open-pd3"/g)||[]).length,7,'six activities and grammar');
 assert.match(html,new RegExp(`data-value="reading"`));assert.match(html,/Чтение вслух/);assert.match(html,new RegExp(`1 / ${data.readingPractice.length}`));
 assert.match(html,/лучший результат: 85%/);assert.match(html,/последняя активность: 24\.10\.2026/);assert.match(html,/результатов пока нет/);
 assert.equal((html.match(/<button/g)||[]).length,7,'rows are single buttons');
});

test('home status line: shown only once something is finished, one compact button with a full accessible name',()=>{
 assert.equal(pd3HomeLine(null),'');assert.equal(pd3HomeLine({done:0,total:80}),'');
 const html=pd3HomeLine({done:5,total:80});
 assert.match(html,/data-page="pd3"/);assert.match(html,/>PD3: 5 \/ 80</);assert.match(html,/aria-label="PD3, подготовка к экзамену: пройдено 5 из 80"/);
});

function progressContext(state){
 const entries=getWordEntries(state);
 return {state,pd3Data:data,pd3Totals:pd3Totals(state.pd3,data),memorySummary:memorySummary(entries,state),next:null,session:null,due:[],todayXP:0,fileCount:0,memoryPlan:{items:[],newCount:0,newToday:0,newLimit:6}};
}
test('the "Прогресс" and home pages show PD3 only for learners who used it',()=>{
 const plain=createState();
 assert.doesNotMatch(renderView('progress',progressContext(plain)),/pd3-progress/);
 assert.doesNotMatch(renderView('learn',progressContext(plain)),/data-page="pd3"[^>]*>PD3:/);
 const used=validateState({...plain,pd3:pd3Of(x=>recordScore(x.dictation,first(data.dictations),90,null,ago(1)))});
 const page=renderView('progress',progressContext(used));
 assert.match(page,/<h2>PD3<\/h2>/);assert.match(page,/class="pd3-progress"/);assert.match(page,/Диктанты/);
 const home=renderView('learn',progressContext(used));
 assert.match(home,new RegExp(`PD3: 1 / ${pd3Totals(used.pd3,data).total}`));
});

test('XP of a result is shown in its result block',()=>{
 assert.match(resultBlock(3,4,'Понимание текста',9),/75% · \+9 XP/);
 assert.doesNotMatch(resultBlock(3,4,'Понимание текста',0),/XP/);
 const item=data.dictations[0],exact=Object.fromEntries(item.sentences.map((s,i)=>[i,s.da]));
 const result=scoreDictation(item.sentences,exact,item.mode);
 assert.match(dictationResultView({item,d:defaults(),run:{inputs:exact,plays:{},result,xp:12}}),/\+12 XP/);
 assert.doesNotMatch(dictationResultView({item,d:defaults(),run:{inputs:exact,plays:{},result,xp:0}}),/XP/);
});

/* ---------- reader -> my words ---------- */

test('word keys ignore articles, "at" and case; examples come from the text',()=>{
 assert.equal(vocabKey('En  Postkasse'),'postkasse');assert.equal(vocabKey('at logge ind'),'logge ind');assert.equal(vocabKey('et møde'),'møde');assert.equal(vocabKey('jævnligt'),'jævnligt');
 const text=data.readingPractice[0];
 const example=vocabExample(text.vocab[0].da,text.sentences);
 assert.match(example,/postkassen/);assert.ok(example.includes(' — '),'the translation follows the Danish sentence');
 assert.equal(vocabExample('at logge ind',text.sentences).includes('logge ind'),true);
 assert.equal(vocabExample('zzzzz',text.sentences),'');
 let found=0;for(const t of data.readingPractice)for(const v of t.vocab)if(vocabExample(v.da,t.sentences))found++;
 assert.ok(found>=100,'almost every word has an example sentence: '+found);
});

test('adding words: duplicates (with or without an article) are skipped, nothing is added twice, the association stays empty',()=>{
 const words=[{da:'en postkasse',ru:'почтовый ящик',note:'Ex'},{da:'at logge ind',ru:'войти',note:''},{da:'postkasse',ru:'ящик',note:''},{da:'et nyt ord',ru:'новое слово',note:''},{da:'EN POSTKASSE',ru:'x',note:''}];
 const ids=['u-1','u-2','u-3'];let n=0;
 const result=newOwnWords(words,new Set([vocabKey('logge ind')]),0,()=>ids[n++]);
 assert.deepEqual(result.words.map(w=>w.da),['en postkasse','et nyt ord']);assert.equal(result.added,2);assert.equal(result.skipped,3);
 assert.deepEqual(result.words[0],{id:'u-1',da:'en postkasse',ru:'почтовый ящик',note:'Ex',association:''});
 const full=newOwnWords([{da:'a b',ru:'x',note:''}],new Set(),1000);assert.equal(full.full,true);assert.equal(full.added,0);
 const state=validateState({...createState(),customWords:result.words});
 assert.equal(state.customWords.length,2,'the words pass the progress validation');
 const long=newOwnWords([{da:'x'.repeat(400),ru:'y'.repeat(400),note:'z'.repeat(900)}],new Set(),0).words[0];
 assert.doesNotThrow(()=>validateState({...createState(),customWords:[long]}));
});

test('words added from a reading text become part of the memory practice and the dictionary',()=>{
 const text=data.readingPractice[0],base=createState();
 const baseKeys=new Set(Object.values(getCatalog(base)).map(p=>vocabKey(p.da)));
 const candidates=text.vocab.filter(v=>!baseKeys.has(vocabKey(v.da)));
 assert.ok(candidates.length>0,'some words of the text are not in the built-in dictionary yet');
 const word=candidates[0],added=newOwnWords([{da:word.da,ru:word.ru,note:vocabExample(word.da,text.sentences)}],baseKeys,0);
 const state=validateState({...base,customWords:added.words});
 const catalog=getCatalog(state),entry=Object.values(catalog).find(p=>p.id===added.words[0].id);
 assert.equal(entry.source,'personal');assert.equal(entry.verified,true);
 const entries=getWordEntries(state);
 assert.ok(entries.some(e=>e.ids.includes(entry.id)),'it is a dictionary entry');
 const plan=planMemorySession(entries,state);
 assert.ok(plan.items.some(item=>item.ids.includes(entry.id)),'a new personal word is among the first words of the practice plan');
 const again=newOwnWords([{da:word.da,ru:word.ru,note:''}],new Set(Object.values(catalog).map(p=>vocabKey(p.da))),state.customWords.length);
 assert.equal(again.added,0);assert.equal(again.skipped,1);
});

test('reading page: every word has an add button or an "already in the dictionary" mark; "add all" counts what is missing',()=>{
 const item=data.readingPractice[0],run={answers:{},checked:false,score:0};
 const withoutApp=readingItemView({item,d:defaults(),run});
 assert.doesNotMatch(withoutApp,/pd3-vocab-add/);
 const known=da=>da===item.vocab[0].da;
 const html=readingItemView({item,d:defaults(),run,known});
 assert.equal((html.match(/data-action="pd3-vocab-add"/g)||[]).length,item.vocab.length-1);
 assert.equal((html.match(/pd3-have/g)||[]).length,1);assert.match(html,/уже в словаре/);
 assert.match(html,new RegExp(`data-action="pd3-vocab-all">[^<]*<svg[^>]*>.*?</svg> Добавить все в мои слова \\(${item.vocab.length-1}\\)`,'s'));
 assert.match(html,/aria-label="Добавить в мои слова: at logge ind"/);
 const all=readingItemView({item,d:defaults(),run,known:()=>true});
 assert.doesNotMatch(all,/pd3-vocab-all/);assert.match(all,/уже есть в твоём словаре/);
});

/* ---------- static checks of the wiring ---------- */

const read=file=>fs.readFileSync(new URL('../'+file,import.meta.url),'utf8');

test('the app wires migration, XP, the PD3 store over the progress, cloud adoption and the progress links',()=>{
 const app=read('dist/app.mjs');
 assert.match(app,/migrateLegacyPd3\(localStorage,state,/);
 assert.match(app,/createPd3Store\(\{read:\(\)=>state\.pd3,write:/);
 assert.match(app,/award:awardPd3Activity,vocab:pd3Vocab/);
 assert.match(app,/onRemote:remote=>\{const next=validateState\(adoptRemoteState\(remote,state\)\)/);
 assert.match(app,/action==='open-pd3'/);
 assert.doesNotMatch(app,/localStorage\.(?:get|set)Item\(['"`]danskdag\.pd3/,'the app code no longer uses the separate PD3 key itself');
 const views=read('dist/views.mjs');
 assert.match(views,/pd3HomeLine\(c\.pd3Totals\)/);assert.match(views,/pd3ProgressSection\(s\.pd3,c\.pd3Data\)/);
});

test('the new PD3 pieces meet the touch and layout rules of the stylesheet',()=>{
 const css=read('dist/pd3.css');
 for(const selector of ['.pd3-plan','.pd3-weak','.pd3-progress-row','.pd3-vocab .pd3-add','.pd3-plan-field input[type=date]'])assert.ok(css.includes(selector),selector);
 assert.match(css,/\.pd3-vocab \.pd3-add\{[^}]*min-height:44px/);assert.match(css,/\.pd3-plan-field input\[type=date\]\{[^}]*min-height:44px/);
 assert.doesNotMatch(css.slice(css.indexOf('exam plan, frequent mistakes')),/#[0-9a-f]{3,8}\b/i,'colours come from the existing tokens');
});

test('every new Russian string has a Ukrainian translation in part-10-system.json',async()=>{
 const {loadTranslations}=await import('../tools/localize-source.mjs');
 loadTranslations(new URL('..',import.meta.url).pathname);
 const file=JSON.parse(read('locales/uk/part-10-system.json'));
 assert.ok(Object.keys(file).length>=40);
 for(const [id,uk] of Object.entries(file)){
  assert.match(id,/^[0-9a-f]{16}$/);assert.equal(typeof uk,'string');assert.ok(uk.trim().length>0);
  assert.doesNotMatch(uk,/[ЁёЫыЭэ]/,id+' is Ukrainian, not Russian');
 }
});
