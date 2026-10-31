import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {createHash} from 'node:crypto';
import {createState,validateState,validatePd3,sealPd3,emptyPd3,pd3CleanSpell,PD3_SPELL,PD3_KEYS,PD3_LIMITS} from '../dist/engine.mjs';
import {mergePd3} from '../dist/pd3-store.mjs';
import {mergePd3Tabs,adoptRemoteState} from '../dist/pd3-merge.mjs';
import {mergeProgress} from '../dist/progress-merge.mjs';
import {scoreDictation} from '../dist/pd3-diff.mjs';
import {dictations} from '../dist/pd3-dictation-data.mjs';
import {spellId,spellFindings,recordSpell,spellSummary,spellItems,spellSignature,mergeSpell,clozeFor,SPELL_KIND} from '../dist/pd3-spell.mjs';
import {getCatalog,getWordEntries,trainingPool,lessons} from '../dist/course.mjs';
import {planMemorySession,memorySummary,getReviewFor} from '../dist/memory.mjs';
import {hubView} from '../dist/pd3-views.mjs';
import {spellView,spellProgressLine,pd3ProgressSection} from '../dist/pd3-system-view.mjs';
import {dictationResultView} from '../dist/pd3-views.mjs';
import {pd3Data as data} from '../dist/pd3-data.mjs';
import {defaults} from '../dist/pd3-store.mjs';

const sha=text=>createHash('sha256').update(text).digest('hex');
const SENT=dictations.find(d=>d.mode==='sentences'),TEXT=dictations.find(d=>d.mode==='text');
const NOW=1790000000000,MIN=60000,DAY=86400000;
const typo=text=>text.replace(/\b(\p{L}{5,})\b/u,m=>m.slice(0,-1));
const rec=(dictId,idx,extra={})=>({id:spellId(dictId,idx),dictId,idx,words:['ord'],count:1,lastAt:NOW,...extra});
const exact=item=>Object.fromEntries(item.sentences.map((s,i)=>[i,s.da]));

/* ---------- schema ---------- */

test('golden: PD3 data and progress that never used the feature keep their exact JSON and hash',()=>{
  // The hashes were taken from the version before dictation cards existed.
  assert.equal(sha(JSON.stringify(validatePd3(emptyPd3()))),'934f9a2c4a93cf824cefee14196b8bf577709fd2e4b5b3c7c21e456e9706ce9b');
  const d=emptyPd3();
  d.dictation['ede-og-et']={best:80,last:70,attempts:2,at:1700000000000};
  d.stats.dictation.runs=3;d.stats.dictation.errors={ending:2,missing:1};
  d.plan.examDate='2026-12-01';d.updatedAt=1700000001000+1-1000;
  assert.equal(sha(JSON.stringify(validatePd3(d))),'0a0b18cbe9123f6bfdd7e4941c60d66c9d9375ddfd0569c776d73902746046f7');
  const s=createState();s.pd3=d;
  assert.equal(sha(JSON.stringify(validateState(JSON.parse(JSON.stringify(s))))),'a464addbcae2d1cc5724a50a2b66625b4736708d95916450dcc0e8ddd6fa2f73');
  assert.ok(!('spell' in validatePd3(emptyPd3())),'the field appears only with a record');
  assert.equal(sha(JSON.stringify(createState())),'4babdc36fff318ed9231b36fa42b918c0e88edfddff3310a82541f7db8c303bf');
  assert.ok(PD3_KEYS.has('spell'),'a known field is not carried as unknown');
});

test('the spell list is cleaned: ids are rebuilt, bad records dropped, duplicates combined, words and size limited',()=>{
  const clean=pd3CleanSpell([
    {id:'forged',dictId:'ede-og-et',idx:2,words:['malet','malet',' lavet ','x'.repeat(100),5,'','a','b','c','d'],count:3.7,lastAt:50},
    {dictId:'ede-og-et',idx:2,words:['boede'],count:9,lastAt:80},
    {dictId:'Bad Id',idx:0},{dictId:'ede-og-et',idx:-1},{dictId:'ede-og-et',idx:1.5},{dictId:'ede-og-et',idx:'1'},null,'x',{dictId:'x'.repeat(130),idx:0}
  ]);
  assert.equal(clean.length,1);
  assert.equal(clean[0].id,'spell-ede-og-et-2');
  assert.equal(clean[0].count,9,'larger count');assert.equal(clean[0].lastAt,80,'newest time');
  assert.deepEqual(clean[0].words,['boede','malet','lavet','x'.repeat(40),'a'],'newest record first, at most 5, each at most 40 characters');
  assert.deepEqual(pd3CleanSpell('nope'),[]);assert.deepEqual(pd3CleanSpell(undefined),[]);
  const many=Array.from({length:PD3_SPELL.max+50},(_,i)=>({dictId:'d',idx:i%1000,words:['a'],count:1,lastAt:i}));
  const capped=pd3CleanSpell(many);
  assert.equal(capped.length,PD3_SPELL.max);assert.ok(capped.every((r,i)=>i===0||capped[i-1].lastAt>=r.lastAt),'newest first');
  assert.deepEqual(pd3CleanSpell(clean),clean,'cleaning is idempotent');
});

test('state.pd3.spell survives validation and the JSON round trip; progress without records gets no field',()=>{
  const state=createState();state.pd3={...emptyPd3(),spell:[rec('ede-og-et',1,{words:['malet','lavet']})]};
  const back=validateState(JSON.parse(JSON.stringify(state)));
  assert.deepEqual(back.pd3.spell,state.pd3.spell);
  assert.deepEqual(validateState(JSON.parse(JSON.stringify(back))),back);
  state.pd3.spell=[];
  assert.ok(!('spell' in validateState(JSON.parse(JSON.stringify(state))).pd3));
  const newer=createState();newer.pd3={...emptyPd3(),futureField:{a:1},spell:[rec('ede-og-et',1)]};
  const kept=validateState(JSON.parse(JSON.stringify(newer)));
  assert.deepEqual(kept.pd3._unknown,{futureField:{a:1}},'unknown fields are still carried, spell is not one of them');
  assert.equal(kept.pd3.spell.length,1);
});

test('under the size limit the oldest dictation records go before any result does',()=>{
  const d=emptyPd3();
  d.dictation['ede-og-et']={best:80,last:80,attempts:1,at:5};
  d.spell=Array.from({length:60},(_,i)=>rec('ede-og-et',i,{words:['abcdefghij','klmnopqrst','uvwxyzabcd'],lastAt:1000+i}));
  const checked=validatePd3(d),full=JSON.stringify(checked).length;
  const sealed=sealPd3(structuredClone(checked),null,full-400);
  assert.ok(JSON.stringify(sealed).length<=full-400);
  assert.ok(sealed.spell.length<60&&sealed.spell.length>50,'only a few were dropped');
  assert.equal(sealed.spell[0].lastAt,1059,'the newest stays');
  assert.equal(sealed.dictation['ede-og-et'].best,80,'results are untouched');
  assert.equal(JSON.stringify(sealPd3(structuredClone(checked))).length,full,'data below the limit is not touched');
  assert.ok(PD3_LIMITS.state>JSON.stringify({spell:Array.from({length:200},(_,i)=>rec('stumt-d-og-g',i,{words:['x'.repeat(40),'y'.repeat(40),'z'.repeat(40),'w'.repeat(40),'v'.repeat(40)]}))}).length,'200 full records fit in the limit');
});

/* ---------- mistakes of a checked dictation ---------- */

test('sentences mode: every attempted sentence with misspelled or missing words becomes a finding, others do not',()=>{
  const inputs={0:typo(SENT.sentences[0].da),1:SENT.sentences[1].da.toLowerCase().replace(/[.,]/g,''),2:'',3:'   '};
  const result=scoreDictation(SENT.sentences,inputs,SENT.mode);
  const found=spellFindings(SENT,result,inputs);
  assert.deepEqual(found.map(f=>f.idx),[0],'a correct sentence (case and punctuation ignored) and empty ones are not mistakes');
  assert.ok(found[0].words.length>=1&&found[0].words.length<=5);
  const refTokens=result.units[0].ref.filter(t=>t.status==='misspelled').map(t=>t.text);
  assert.deepEqual(found[0].words,refTokens,'the correct spelling of the misspelled words');
  // a missing word counts too
  const words=SENT.sentences[1].da.split(' ');
  const missing={1:[...words.slice(0,2),...words.slice(3)].join(' ')};
  const found2=spellFindings(SENT,scoreDictation(SENT.sentences,missing,SENT.mode),missing);
  assert.deepEqual(found2.map(f=>f.idx),[1]);assert.deepEqual(found2[0].words,[words[2].replace(/[.,]/g,'')]);
});

test('nothing typed, a perfect copy or a too long input give no findings',()=>{
  const empty={};
  assert.deepEqual(spellFindings(SENT,scoreDictation(SENT.sentences,empty,SENT.mode),empty),[]);
  assert.deepEqual(spellFindings(SENT,scoreDictation(SENT.sentences,exact(SENT),SENT.mode),exact(SENT)),[]);
  const all=exact(SENT);all.all='';
  assert.deepEqual(spellFindings(TEXT,scoreDictation(TEXT.sentences,{all:TEXT.sentences.map(s=>s.da).join(' ')},TEXT.mode),{all:'x'}),[]);
  assert.deepEqual(spellFindings(SENT,{tooLong:true},{0:'x'}),[]);assert.deepEqual(spellFindings(null,{},{}),[]);
  const huge={0:'ord '.repeat(300000)};
  assert.deepEqual(spellFindings(SENT,scoreDictation(SENT.sentences,huge,SENT.mode),huge),[],'too long: the page shows a message and records nothing');
});

test('text mode: findings are assigned to the sentence of the word; sentences never reached are not mistakes',()=>{
  const sentences=TEXT.sentences.map(s=>s.da);
  const written=[typo(sentences[1]),sentences[0]].reverse();// the sentence 0 right, sentence 1 with a mistake, nothing after
  const input=[sentences[0],typo(sentences[1])].join(' ');
  const result=scoreDictation(TEXT.sentences,{all:input},TEXT.mode);
  const found=spellFindings(TEXT,result,{all:input});
  assert.deepEqual(found.map(f=>f.idx),[1],'sentence 0 is right, 2.. were not written');
  assert.equal(written.length,2);
  const full=sentences.map((s,i)=>i===2?typo(s):s).join(' ');
  const found2=spellFindings(TEXT,scoreDictation(TEXT.sentences,{all:full},TEXT.mode),{all:full});
  assert.deepEqual(found2.map(f=>f.idx),[2]);
});

/* ---------- putting findings into the repetition ---------- */

test('a mistake creates the record and an "Again" review: due in 10 minutes, memory lowered, one lapse',()=>{
  const state=validateState(createState());
  const result=recordSpell(state,SENT.id,[{idx:0,words:['kaffen','kold']},{idx:3,words:['hånden']}],NOW);
  assert.equal(result.recorded,2);assert.equal(result.added,2);
  const next=validateState(result.state);
  assert.deepEqual(next.pd3.spell.map(r=>r.id).sort(),[spellId(SENT.id,0),spellId(SENT.id,3)]);
  for(const record of next.pd3.spell){
    const review=next.reviews[record.id];
    assert.equal(review.due,NOW+10*MIN);assert.equal(review.lastGrade,'miss');assert.equal(review.lapses,1);assert.equal(review.recall,0);
    assert.equal(review.memory.stability,0.212,'FSRS-6 "Again" of a new card');
    assert.equal(review.seen,1);
  }
  assert.equal(next.pd3.updatedAt,NOW);
  assert.deepEqual(state.reviews,{},'the original state is not changed');assert.ok(!('spell' in (state.pd3||{})));
  assert.deepEqual(recordSpell(state,SENT.id,[],NOW).state,state);assert.equal(recordSpell(state,SENT.id,[],NOW).recorded,0);
});

test('a repeated mistake raises the count, joins the words and puts the card back to 10 minutes',()=>{
  let state=validateState(recordSpell(createState(),SENT.id,[{idx:0,words:['kaffen','kold','går']}],NOW).state);
  // the card was learnt well meanwhile
  state.reviews[spellId(SENT.id,0)]={...state.reviews[spellId(SENT.id,0)],box:3,due:NOW+20*DAY,recall:3,spaced:2,lastGrade:'recall'};
  const again=recordSpell(state,SENT.id,[{idx:0,words:['sagde','kaffen','a','b']}],NOW+5*DAY);
  assert.equal(again.recorded,1);assert.equal(again.added,0,'not a new record');
  const next=validateState(again.state),record=next.pd3.spell[0];
  assert.equal(next.pd3.spell.length,1);assert.equal(record.count,2);assert.equal(record.lastAt,NOW+5*DAY);
  assert.deepEqual(record.words,['sagde','kaffen','a','b','kold'],'new words first, at most 5');
  const review=next.reviews[record.id];
  assert.equal(review.due,NOW+5*DAY+10*MIN);assert.equal(review.box,0);assert.equal(review.lapses,2,'a second lapse');assert.equal(review.lastGrade,'miss');
  assert.equal(review.spaced,0);
});

test('a later dictation without mistakes in that sentence changes nothing (the card stays, FSRS decides)',()=>{
  const state=validateState(recordSpell(createState(),SENT.id,[{idx:0,words:['kaffen']}],NOW).state);
  const inputs=exact(SENT);
  const found=spellFindings(SENT,scoreDictation(SENT.sentences,inputs,SENT.mode),inputs);
  assert.deepEqual(found,[]);
  const after=recordSpell(state,SENT.id,found,NOW+DAY);
  assert.equal(after.state,state);assert.equal(after.recorded,0);
});

test('at most 200 records: the oldest leave and get no review',()=>{
  let state=createState();
  for(let i=0;i<PD3_SPELL.max;i++)state=validateState(recordSpell(state,'ede-og-et',[{idx:i,words:['x']}],NOW+i).state);
  assert.equal(state.pd3.spell.length,PD3_SPELL.max);
  const more=recordSpell(state,'er-og-re',[{idx:0,words:['y']}],NOW+1000);
  const next=validateState(more.state);
  assert.equal(next.pd3.spell.length,PD3_SPELL.max);assert.equal(next.pd3.spell[0].id,spellId('er-og-re',0));
  assert.ok(!next.pd3.spell.some(r=>r.id===spellId('ede-og-et',0)),'the oldest went');
  assert.equal(more.added,1);
  assert.ok(next.reviews[spellId('er-og-re',0)]);
});

test('the summary counts records and those due now (a card without a review counts as due)',()=>{
  assert.deepEqual(spellSummary(createState(),NOW),{count:0,due:0});assert.deepEqual(spellSummary(undefined,NOW),{count:0,due:0});
  const state=validateState(recordSpell(createState(),SENT.id,[{idx:0,words:['a']},{idx:1,words:['b']}],NOW).state);
  assert.deepEqual(spellSummary(state,NOW+5*MIN),{count:2,due:0});
  assert.deepEqual(spellSummary(state,NOW+11*MIN),{count:2,due:2});
  state.reviews[spellId(SENT.id,0)].due=NOW+3*DAY;
  assert.deepEqual(spellSummary(state,NOW+11*MIN),{count:2,due:1});
  delete state.reviews[spellId(SENT.id,1)];
  assert.deepEqual(spellSummary(state,NOW),{count:2,due:1},'a card without a review is due');
  delete state.reviews[spellId(SENT.id,0)];
  assert.deepEqual(spellSummary(state,NOW),{count:2,due:2});
});

/* ---------- catalogue ---------- */

test('the catalogue gets dictation cards only for records, with their own kind, and is rebuilt exactly when they change',()=>{
  const plain=createState(),before=getCatalog(plain);
  assert.equal(getCatalog(structuredClone(plain)),before,'unchanged: the cached object');
  assert.ok(Object.values(before).every(p=>p.kind!==SPELL_KIND));
  const state=validateState(recordSpell(plain,SENT.id,[{idx:2,words:['fugle']}],NOW).state);
  const after=getCatalog(state),id=spellId(SENT.id,2);
  assert.notEqual(after,before);
  const item=after[id];
  assert.equal(item.kind,SPELL_KIND);assert.equal(item.da,SENT.sentences[2].da);assert.equal(item.ru,SENT.sentences[2].ru);
  assert.equal(item.source,'pd3');assert.equal(item.verified,true);assert.deepEqual(item.spellWords,['fugle']);assert.ok(item.tag&&item.level);
  assert.ok(!('focus' in item),'not the exercise "focus" of word-class tasks');
  assert.equal(getCatalog(structuredClone(state)),after,'same records: the cached object');
  assert.equal(Object.keys(after).length,Object.keys(before).length+1);
  assert.equal(getCatalog(plain)[id],undefined,'the other state is unaffected');
  const edited=structuredClone(state);edited.pd3.spell[0].words=['fugle','nogen'];
  assert.deepEqual(getCatalog(edited)[id].spellWords,['fugle','nogen']);
  const gone=structuredClone(state);delete gone.pd3.spell;
  assert.equal(getCatalog(gone)[id],undefined);
  // a record whose dictation is no longer in the content is skipped
  const stale=structuredClone(state);stale.pd3.spell.push(rec('no-such-dictation',0),rec(SENT.id,99));
  assert.equal(Object.values(getCatalog(stale)).filter(p=>p.kind===SPELL_KIND).length,1);
  assert.equal(spellSignature(undefined),'');assert.deepEqual(spellItems(undefined,dictations),[]);
});

test('dictation cards never enter lessons, the training pool or the word lists; they have their own entry',()=>{
  const state=validateState(recordSpell(createState(),SENT.id,[{idx:2,words:['fugle']}],NOW).state),id=spellId(SENT.id,2);
  assert.ok(!lessons.some(l=>l.items.some(p=>p.id===id)));
  assert.ok(!trainingPool(state).some(p=>p.kind===SPELL_KIND),'not a distractor or a "file" word');
  assert.equal(trainingPool(state).length,trainingPool(createState()).length);
  const entries=getWordEntries(state),mine=entries.filter(e=>e.kind===SPELL_KIND);
  assert.equal(mine.length,1);assert.deepEqual(mine[0].ids,[id]);assert.deepEqual(mine[0].sources,['pd3']);
  assert.equal(entries.length,getWordEntries(createState()).length+1);
  // the same Danish text as a learner's own word: still two separate cards, the review belongs to the dictation card alone
  const withWord=structuredClone(state);withWord.customWords=[{id:'u-same',da:SENT.sentences[2].da,ru:'то же самое',note:'',association:''}];
  const both=getWordEntries(withWord);
  assert.deepEqual(both.find(e=>e.kind===SPELL_KIND).ids,[id]);
  assert.ok(both.some(e=>e.ids.includes('u-same')&&!e.ids.includes(id)));
});

/* ---------- plan ---------- */

test('the plan: a dictation card is due after 10 minutes, like any wrong answer, and does not use up the day\'s new words',()=>{
  const state=validateState(recordSpell(createState(),SENT.id,[{idx:0,words:['a']},{idx:1,words:['b']},{idx:2,words:['c']}],NOW).state);
  const early=planMemorySession(getWordEntries(state),state,NOW+5*MIN);
  assert.equal(early.dueTotal,0);assert.ok(!early.items.some(p=>p.kind===SPELL_KIND));
  assert.equal(early.newToday,0,'dictation cards are not counted as new words of the day');
  assert.equal(early.nextDue,NOW+10*MIN);
  const later=planMemorySession(getWordEntries(state),state,NOW+11*MIN);
  assert.equal(later.dueTotal,3);assert.equal(later.dueCount,3);
  assert.ok(later.items.slice(0,3).every(p=>p.kind===SPELL_KIND));
  assert.equal(later.newToday,0);assert.ok(later.newCount>0,'ordinary new words still come');
  const summary=memorySummary(getWordEntries(state),state,NOW+11*MIN);
  assert.equal(summary.due,3);assert.equal(summary.newToday,0);
});

test('a dictation card with no review yet (progress came from elsewhere) goes first among the new ones',()=>{
  const state=createState();state.pd3={...emptyPd3(),spell:[rec(SENT.id,0)]};
  const plan=planMemorySession(getWordEntries(state),state,NOW);
  assert.equal(plan.items[0].kind,SPELL_KIND);assert.equal(plan.newToday,0);
});

/* ---------- merging ---------- */

test('merging: larger count, newest time, union of the words, newest first, at most 200',()=>{
  const a=[rec('ede-og-et',0,{words:['a','b'],count:2,lastAt:10}),rec('ede-og-et',1,{words:['x'],count:1,lastAt:5})];
  const b=[rec('ede-og-et',0,{words:['c','a'],count:5,lastAt:20}),rec('er-og-re',0,{words:['y'],count:1,lastAt:30})];
  const merged=mergeSpell(a,b);
  assert.deepEqual(merged.map(r=>r.id),[spellId('er-og-re',0),spellId('ede-og-et',0),spellId('ede-og-et',1)]);
  const first=merged.find(r=>r.id===spellId('ede-og-et',0));
  assert.equal(first.count,5);assert.equal(first.lastAt,20);assert.deepEqual(first.words,['c','a','b']);
  assert.deepEqual(mergeSpell(a,undefined),pd3CleanSpell(a));assert.deepEqual(mergeSpell(undefined,undefined),[]);
  assert.deepEqual(mergeSpell(a,b),mergeSpell(b,a),'the order of the sides does not matter');
});

test('merging PD3 data of two tabs, an imported PD3 copy and cloud adoption keep the records',()=>{
  const ours={...emptyPd3(),updatedAt:5,spell:[rec('ede-og-et',0,{count:2,lastAt:10})]};
  const theirs={...emptyPd3(),updatedAt:9,spell:[rec('ede-og-et',0,{count:3,lastAt:20}),rec('er-og-re',1,{lastAt:7})]};
  const tabs=mergePd3Tabs(emptyPd3(),ours,theirs);
  assert.deepEqual(tabs.spell.map(r=>[r.id,r.count]),[[spellId('ede-og-et',0),3],[spellId('er-og-re',1),1]]);
  const onlyOurs=mergePd3Tabs(emptyPd3(),ours,{...emptyPd3(),updatedAt:9});
  assert.equal(onlyOurs.spell.length,1);
  assert.ok(!('spell' in mergePd3Tabs(emptyPd3(),emptyPd3(),{...emptyPd3(),updatedAt:1})),'no records: no field');
  assert.deepEqual(mergePd3(ours,theirs).spell.map(r=>r.count),[3,1]);
  assert.ok(!('spell' in mergePd3(emptyPd3(),emptyPd3())));
  const local=createState();local.pd3=ours;const remote=createState();remote.xp=50;
  assert.equal(adoptRemoteState(remote,local).pd3.spell.length,1,'the cloud has no PD3: this device\'s records stay');
  remote.pd3=theirs;
  assert.equal(adoptRemoteState(remote,local).pd3.spell.length,2);
  const base=createState();
  const merged=validateState(mergeProgress(base,Object.assign(structuredClone(base),{pd3:ours}),Object.assign(structuredClone(base),{pd3:theirs})));
  assert.equal(merged.pd3.spell.length,2);
});

/* ---------- views ---------- */

test('the hub line, the progress line and the dictation result show the number',()=>{
  const d=defaults();
  const hub=hubView({data,d,error:'',spell:{count:4,due:2}});
  assert.match(hub,/На повторении из диктантов: 4/);assert.match(hub,/data-action="practice-spell"[^>]*>Повторить сейчас/);assert.match(hub,/пора повторить: 2/);
  assert.doesNotMatch(hubView({data,d,error:'',spell:{count:4,due:0}}),/practice-spell/,'no "repeat now" without due cards');
  assert.match(hubView({data,d,error:'',spell:{count:4,due:0}}),/На повторении из диктантов: 4/);
  assert.doesNotMatch(hubView({data,d,error:''}),/На повторении из диктантов/);
  assert.equal(spellView({spell:{count:0,due:0}}),'');assert.equal(spellView({spell:null}),'');
  assert.match(spellProgressLine({count:3,due:1}),/На повторении из диктантов: 3 · пора повторить: 1/);assert.equal(spellProgressLine({count:0,due:0}),'');assert.equal(spellProgressLine(null),'');
  assert.equal(pd3ProgressSection(undefined,data),'');
  const result=scoreDictation(SENT.sentences,{0:typo(SENT.sentences[0].da)},SENT.mode);
  const html=dictationResultView({item:SENT,d,run:{inputs:{0:'x'},plays:{},result,spellAdded:2,xp:0}});
  assert.match(html,/Добавлено в повторение: 2 предложения с ошибками/);
  assert.match(dictationResultView({item:SENT,d,run:{inputs:{0:'x'},plays:{},result,spellAdded:1,xp:0}}),/Добавлено в повторение: 1 предложение с ошибкой/);
  assert.doesNotMatch(dictationResultView({item:SENT,d,run:{inputs:{},plays:{},result,spellAdded:0,xp:0}}),/Добавлено в повторение/);
});

test('the page wires the dictation check to the repetition only for a non-empty check, and the app records both parts together',()=>{
  const page=fs.readFileSync(new URL('../dist/pd3-page.mjs',import.meta.url),'utf8');
  assert.match(page,/if\(typed&&deps\.spell\)\{\s*const found=spellFindings\(it,result,run\.inputs\);\s*if\(found\.length\)run\.spellAdded=deps\.spell\.record\(it\.id,found\)/);
  const app=fs.readFileSync(new URL('../dist/app.mjs',import.meta.url),'utf8');
  assert.match(app,/spell:pd3Spell\}\}\);/);assert.match(app,/recordSpell\(state,dictId,found,Date\.now\(\)\)/);
  assert.match(app,/if\(p\.kind==='dictation'\)return false;/,'not in "Мои слова"');
  assert.match(app,/action==='practice-spell'/);
});

test('cloze of a sentence: the first problem word is hidden, or the longest word when none is known',()=>{
  const item={da:'Manden sagde, at kaffen var kold i går.',spellWords:['kold','kaffen']};
  assert.deepEqual(clozeFor(item),{text:'Manden sagde, at ___ var kold i går.',answer:'kaffen'},'the first of the problem words in the sentence');
  assert.deepEqual(clozeFor({...item,spellWords:['Kold']}),{text:'Manden sagde, at kaffen var ___ i går.',answer:'kold'},'case does not matter');
  assert.equal(clozeFor({...item,spellWords:[]}).answer,'Manden','the longest word (the first of equals)');
  assert.equal(clozeFor({da:'...',spellWords:[]}),null);
  assert.equal(clozeFor({da:'Det er æble.',spellWords:['æble']}).answer,'æble');
  assert.ok(getReviewFor({id:'x'},{})===undefined);
});
