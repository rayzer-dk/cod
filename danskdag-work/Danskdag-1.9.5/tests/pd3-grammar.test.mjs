import test from 'node:test';
import assert from 'node:assert/strict';
import {
  checkItem,orderText,cleanAnswer,hasAnswer,isComplete,answerText,correctAnswer,tileAdd,tileRemove,scoreSet,countsForXp,recordGrammar,emptyGrammar,categoryRows,weakCategory,
  frequentMistakes,practiceSetFor,recommendations,linksFor,mergeGrammar,snapshotGrammar,validateGrammarFields,applyGrammar,secondsLeft,sameText,GRAMMAR_LINKS
} from '../dist/pd3-grammar.mjs';
import {awardPd3,createState,validateState,validatePd3,sealPd3,emptyPd3,PD3_XP,PD3_KEYS,PD3_LIMITS} from '../dist/engine.mjs';
import {mergePd3,createPd3Store} from '../dist/pd3-store.mjs';
import {mergePd3Tabs,adoptRemoteState} from '../dist/pd3-merge.mjs';
import {grammarSets,grammarCategories} from './fixtures/pd3-grammar-fixture.mjs';

const [set1,set2]=grammarSets;
const item=id=>[...set1.items,...set2.items].find(x=>x.id===id);
const T0=Date.parse('2026-10-26T10:00:00Z');

test('gap: only the right option counts; foreign answers are not answers',()=>{
  const it=item('fx1-01');
  assert.equal(checkItem(it,1).ok,true);assert.equal(checkItem(it,0).ok,false);
  assert.equal(checkItem(it,undefined).ok,false);assert.equal(checkItem(it,'1').ok,false);assert.equal(checkItem(it,9).ok,false);
  assert.equal(isComplete(it,1),true);assert.equal(isComplete(it,undefined),false);
  assert.equal(answerText(it,0),'I morgen gik jeg til lægen.');assert.equal(correctAnswer(it).main,'I morgen går jeg til lægen.');
});

test('cloze: the task is right only when every gap is right; the details name the wrong gaps',()=>{
  const it=item('fx1-10'),right={1:0,2:1,3:1,4:0};
  assert.equal(checkItem(it,right).ok,true);
  const result=checkItem(it,{...right,3:0});
  assert.equal(result.ok,false);assert.deepEqual(result.gaps.filter(g=>!g.ok).map(g=>g.gap),[3]);
  assert.equal(isComplete(it,{1:0,2:1}),false);assert.equal(hasAnswer(it,{1:0}),true);assert.equal(hasAnswer(it,{}),false);
  assert.equal(checkItem(it,{1:0}).ok,false,'a half-filled cloze is wrong');
  assert.equal(cleanAnswer(it,{9:0}),undefined,'a gap that does not exist');assert.equal(cleanAnswer(it,{1:7}),undefined);
  assert.equal(cleanAnswer(it,JSON.parse('{"__proto__":1}')),undefined);
  assert.match(answerText(it,{1:0,3:1}),/1\) fordi; 2\) —; 3\) men; 4\) —/);
});

test('fix: the right word AND a right correction are needed; case is ignored',()=>{
  const it=item('fx1-04');
  assert.equal(checkItem(it,{i:7,t:'stort'}).ok,true);
  assert.equal(checkItem(it,{i:7,t:'  STORT '}).ok,true,'case and spaces');
  assert.equal(checkItem(it,{i:7,t:'stort.'}).ok,true,'punctuation is ignored like in the other written tasks');
  const wrongWord=checkItem(it,{i:6,t:'stort'});assert.equal(wrongWord.ok,false);assert.equal(wrongWord.pickedOk,false);assert.equal(wrongWord.textOk,true);
  const wrongFix=checkItem(it,{i:7,t:'store'});assert.equal(wrongFix.ok,false);assert.equal(wrongFix.pickedOk,true);assert.equal(wrongFix.textOk,false);
  assert.equal(checkItem(it,{i:7}).ok,false);assert.equal(checkItem(it,{t:'stort'}).ok,false);
  assert.equal(isComplete(it,{i:7}),false);assert.equal(isComplete(it,{i:7,t:' '}),false);assert.equal(isComplete(it,{i:7,t:'x'}),true);assert.equal(hasAnswer(it,{i:7}),true);
  assert.equal(cleanAnswer(it,{i:99}),undefined);assert.equal(cleanAnswer(it,{i:1,t:'x'.repeat(61)}),undefined);
  assert.equal(correctAnswer(it).main,'Hun har en rød bil og et stort hus.');assert.equal(correctAnswer(it).wrong,'stor');
  assert.equal(answerText(it,{i:7,t:'store'}),'stor → store');
});

test('transform: case, end punctuation, extra spaces and invisible characters do not matter; any listed variant is accepted',()=>{
  const it=item('fx1-06');
  for(const ok of ['En ny skole bygges i byen.','en ny skole bygges i byen','  En   ny skole bygges  i byen!  ','En ny skole bygges i byen.​','En ny skole bygges i by­en.','Der bygges en ny skole i byen.','EN NY SKOLE BYGGES I BYEN'])assert.equal(checkItem(it,ok).ok,true,JSON.stringify(ok));
  for(const bad of ['En ny skole bygger i byen.','En skole bygges i byen.','','   ','Man bygger en ny skole i byen.'])assert.equal(checkItem(it,bad).ok,false,JSON.stringify(bad));
  assert.equal(checkItem(it,5).ok,false);assert.equal(cleanAnswer(it,'x'.repeat(301)),undefined);
  assert.equal(checkItem(item('fx1-07'),'Fordi det regner, tager jeg en paraply med.').ok,true);
  assert.deepEqual(correctAnswer(it).others,['Der bygges en ny skole i byen.']);
  assert.equal(sameText('Åben','åben'),true);assert.equal(sameText('aa','å'),false,'Danish letters stay distinct');assert.equal(sameText('','') ,false);
});

test('order: every listed ordering is accepted, a partial or wrong one is not',()=>{
  const it=item('fx1-08'),tokens=it.tokens;
  const pick=text=>text.split(' ').map(word=>tokens.findIndex((t,i)=>t.toLowerCase().replace('.','')===word.toLowerCase().replace('.','')));
  assert.equal(checkItem(it,pick('I dag har vi fri.')).ok,true);
  assert.equal(checkItem(it,pick('Vi har fri i dag.')).ok,true,'the fronted-subject variant');
  assert.equal(checkItem(it,pick('I dag vi har fri.')).ok,false);
  assert.equal(checkItem(it,[0,1]).ok,false);assert.equal(isComplete(it,[0,1]),false);assert.equal(isComplete(it,pick('I dag har vi fri.')),true);
  assert.equal(cleanAnswer(it,[0,0]),undefined,'a tile twice');assert.equal(cleanAnswer(it,[0,9]),undefined);assert.equal(cleanAnswer(it,[0,1,2,3,4,0]),undefined);
  assert.equal(hasAnswer(it,[]),false);assert.equal(hasAnswer(it,[2]),true);
  assert.equal(answerText(it,[2,0,1]),'I dag har');
});

test('order: the answer is compared by normalised words — case, punctuation (also the comma at the end of a tile) and invisible characters do not matter, word order does',()=>{
  const it={id:'o-1',cat:'connect',type:'order',tokens:['jeg','har','derfor','ikke,','Derfor','tid.','haft'],
    answers:['Derfor har jeg ikke haft tid.','Jeg har derfor ikke haft tid.'],why:'x'};
  const pick=words=>words.map(w=>it.tokens.indexOf(w));
  // the fronted adverbial: the tile "Derfor" is capitalised, "ikke," carries the comma, "tid." the full stop
  assert.equal(checkItem(it,pick(['Derfor','har','jeg','ikke,','haft','tid.'])).ok,false,'one tile left over: not complete');
  const six={...it,tokens:['jeg','har','Derfor','ikke,','haft','tid.']};
  const pick6=words=>words.map(w=>six.tokens.indexOf(w));
  assert.equal(checkItem(six,pick6(['Derfor','har','jeg','ikke,','haft','tid.'])).ok,true,'first listed variant');
  assert.equal(checkItem(six,pick6(['jeg','har','Derfor','ikke,','haft','tid.'])).ok,true,'second variant: the capital tile in the middle');
  assert.equal(checkItem({...six,answers:['Derfor har jeg ikke haft tid']},pick6(['Derfor','har','jeg','ikke,','haft','tid.'])).ok,true,'an answer without the full stop');
  assert.equal(checkItem({...six,answers:['derfor, har jeg, ikke haft tid!']},pick6(['Derfor','har','jeg','ikke,','haft','tid.'])).ok,true,'commas at other places');
  assert.equal(checkItem(six,pick6(['har','Derfor','jeg','ikke,','haft','tid.'])).ok,false,'word order matters');
  assert.equal(checkItem(six,pick6(['Derfor','har','ikke,','jeg','haft','tid.'])).ok,false);
  assert.equal(isComplete(six,pick6(['Derfor','har','jeg','ikke,','haft','tid.'])),true);
  assert.equal(orderText(six,pick6(['Derfor','har','jeg'])),'Derfor har jeg');
  assert.equal(checkItem({...six,answers:['Derfor\u200b har jeg ikke haft tid.']},pick6(['Derfor','har','jeg','ikke,','haft','tid.'])).ok,true,'invisible characters in the data');
});

test('tiles move between the bank and the answer zone without duplicates',()=>{
  let picked=[];
  picked=tileAdd(picked,2,5);picked=tileAdd(picked,0,5);picked=tileAdd(picked,2,5);assert.deepEqual(picked,[2,0],'a tile already used is not added twice');
  assert.deepEqual(tileAdd(picked,9,5),[2,0]);assert.deepEqual(tileAdd(picked,-1,5),[2,0]);
  assert.deepEqual(tileRemove(picked,0),[0]);assert.deepEqual(tileRemove(picked,7),[2,0]);assert.deepEqual(tileAdd(undefined,1,3),[1]);
});

function runOf(overrides={}){return {answers:{},done:{},skipped:{},self:{},...overrides};}
test('scoring: statuses, percent of all tasks and the category counters',()=>{
  const answers={'fx1-01':1,'fx1-02':3,'fx1-03':1,'fx1-06':'En ny skole bygges i byen.','fx1-07':'Jeg tager paraply med fordi regner'};
  const done=Object.fromEntries([...Object.keys(answers),'fx1-04'].map(id=>[id,true]));
  const result=scoreSet(set1,runOf({answers,done,skipped:{'fx1-04':true},self:{'fx1-07':true}}));
  const status=Object.fromEntries(result.items.map(x=>[x.item.id,x.status]));
  assert.deepEqual(status,{'fx1-01':'ok','fx1-02':'wrong','fx1-03':'ok','fx1-04':'skipped','fx1-05':'missed','fx1-06':'ok','fx1-07':'self','fx1-08':'missed','fx1-09':'missed','fx1-10':'missed'});
  assert.equal(result.correct,3);assert.equal(result.answered,5,'ok + wrong + self');assert.equal(result.total,10);assert.equal(result.percent,30);
  assert.deepEqual(result.cats,{v2:{ok:1,all:1},prep:{ok:0,all:1},modal:{ok:1,all:1},passive:{ok:1,all:1}},'skipped, missed and self-checked tasks stay out of the statistics');
  assert.equal(countsForXp(result),true,'five answered tasks');
  const few=scoreSet(set1,runOf({answers:{'fx1-01':1},done:{'fx1-01':true}}));
  assert.equal(countsForXp(few),false,'fewer than five answered tasks');
});

test('scoring: at the end of the time an answer typed but not sent is checked, a task not reached is missed',()=>{
  const run=runOf({answers:{'fx1-01':1,'fx1-06':'En ny skole bygges i byen.','fx1-04':{i:7}},done:{'fx1-01':true}});
  const open=scoreSet(set1,run),final=scoreSet(set1,run,{final:true});
  assert.equal(open.items.find(x=>x.item.id==='fx1-06').status,'missed');
  assert.equal(final.items.find(x=>x.item.id==='fx1-06').status,'ok');
  assert.equal(final.items.find(x=>x.item.id==='fx1-04').status,'wrong','a marked word without a correction is wrong');
  assert.equal(final.correct,2);assert.equal(final.answered,3);
  const all=scoreSet(set1,runOf({answers:Object.fromEntries(set1.items.map(it=>[it.id,undefined]))}),{final:true});
  assert.equal(all.percent,0);assert.equal(all.answered,0);
});

test('recording: best result, attempts and cumulative category counters with a ceiling',()=>{
  const grammar=emptyGrammar();
  const good=scoreSet(set1,runOf({answers:{'fx1-01':1,'fx1-02':0},done:{'fx1-01':true,'fx1-02':true}}));
  recordGrammar(grammar,'fx-gram-1',good,T0);
  const worse=scoreSet(set1,runOf({answers:{'fx1-01':0},done:{'fx1-01':true}}));
  recordGrammar(grammar,'fx-gram-1',worse,T0+1000);
  assert.deepEqual(grammar.sets['fx-gram-1'],{best:20,last:0,attempts:2,at:T0+1000});
  assert.deepEqual(grammar.cats,{v2:{ok:1,all:2},prep:{ok:1,all:1}});assert.equal(grammar.updatedAt,T0+1000);
  grammar.cats.v2={ok:999999,all:999999};
  recordGrammar(grammar,'fx-gram-1',good,T0+2000);
  assert.deepEqual(grammar.cats.v2,{ok:1000000,all:1000000},'capped, ok never above all');
});

test('XP: grammar pays once per set, only from 30 percent, with the shared day limit; the same set again pays only for an improvement',()=>{
  assert.equal(PD3_XP.grammar,15);
  let state=createState();
  const event=percent=>({kind:'grammar',id:'gram-1',percent,minutes:12});
  const first=awardPd3(state,event(80),new Date(T0));
  assert.equal(first.xp,12);assert.equal(first.counted,true);state=first.state;
  assert.equal(state.pd3.xp.items['grammar:gram-1'],80);
  const again=awardPd3(state,event(80),new Date(T0));assert.equal(again.xp,0,'idempotent for the set');
  const lower=awardPd3(state,event(50),new Date(T0));assert.equal(lower.xp,0);
  const better=awardPd3(state,event(100),new Date(T0));assert.equal(better.xp,3);
  assert.equal(awardPd3(createState(),event(29),new Date(T0)).counted,false,'below 30 percent');
  assert.equal(awardPd3(createState(),{kind:'grammar',id:'Gram 1',percent:80,minutes:1},new Date(T0)).counted,false,'bad id');
  assert.doesNotThrow(()=>validateState(better.state));
});

test('categories: rows, the weak category, frequent mistakes and the set to practise',()=>{
  const grammar={sets:{'fx-gram-1':{best:50,last:50,attempts:3,at:T0},'fx-gram-2':{best:0,last:0,attempts:0,at:0}},cats:{v2:{ok:8,all:12},prep:{ok:2,all:10},tenses:{ok:1,all:3},agree:{ok:10,all:10},modal:{ok:4,all:10}}};
  const rows=categoryRows(grammar,grammarCategories);
  assert.equal(rows.length,12);assert.equal(rows[0].rate,8/12);assert.equal(rows.find(r=>r.id==='cond').rate,null);assert.ok(rows.every(r=>r.tip));
  assert.equal(weakCategory(grammar,grammarCategories).id,'prep');
  assert.equal(weakCategory(grammar,grammarCategories,{min:11}).id,'v2');
  assert.equal(weakCategory({cats:{tenses:{ok:3,all:3}}},grammarCategories,{min:1}),null,'no mistakes, no weak category');
  assert.equal(weakCategory(undefined,grammarCategories),null);
  assert.deepEqual(frequentMistakes(grammar,grammarCategories).map(r=>[r.id,r.errors,r.share]),[['prep',8,80],['modal',6,60],['v2',4,33]],'at least ten answers, top three by the share of mistakes');
  assert.equal(frequentMistakes({cats:{prep:{ok:0,all:9}}},grammarCategories).length,0);
  assert.equal(practiceSetFor('prep',grammarSets,grammar).id,'fx-gram-1','the set with the most tasks of the category');
  assert.equal(practiceSetFor('cond',grammarSets,grammar).id,'fx-gram-2');
  assert.equal(practiceSetFor('modal',grammarSets,grammar).id,'fx-gram-2','one modal task in each set: the set with fewer attempts');
  assert.equal(practiceSetFor('compare',grammarSets,grammar),null);
  const tie={sets:{'fx-gram-1':{attempts:0},'fx-gram-2':{attempts:2}}};
  assert.equal(practiceSetFor('modal',grammarSets,tie).id,'fx-gram-1');
  assert.equal(practiceSetFor('modal',grammarSets,undefined).id,'fx-gram-1','no results: list order');
});

test('recommendations: at most three categories with the lowest share, links only to what exists',()=>{
  const result={cats:{v2:{ok:1,all:4},prep:{ok:0,all:2},tenses:{ok:2,all:2},agree:{ok:1,all:2},modal:{ok:3,all:4}}};
  assert.deepEqual(recommendations(result,grammarCategories).map(r=>r.id),['prep','v2','agree']);
  assert.deepEqual(recommendations({cats:{}},grammarCategories),[]);
  const exists={lesson:id=>id==='g-main-order'?'Глагол на втором месте':null,reference:name=>name==='tenses'};
  assert.deepEqual(linksFor('v2',exists),[{kind:'lesson',id:'g-main-order',title:'Глагол на втором месте'}],'g-questions does not exist here');
  assert.deepEqual(linksFor('tenses',exists),[{kind:'reference',id:'tenses',action:'open-tenses'}]);
  assert.deepEqual(linksFor('prep',exists),[]);assert.deepEqual(linksFor('v2',null),[]);assert.deepEqual(linksFor('unknown',exists),[]);
  assert.equal(Object.keys(GRAMMAR_LINKS).length,12);
  const all={lesson:id=>id,reference:()=>true};assert.ok(linksFor('tenses',all).length<=2);
});

test('the links point at lessons that exist in the real course',async()=>{
  const {lessonById}=await import('../dist/course.mjs');
  for(const [cat,links] of Object.entries(GRAMMAR_LINKS))for(const [kind,id] of links)if(kind==='lesson')assert.ok(lessonById[id],`${cat}: lesson ${id}`);
});

/* ---------- storage: validator, size, export / import, merging ---------- */
const pd3With=grammar=>({...emptyPd3(),updatedAt:T0,grammar});
test('state.pd3.grammar is optional and cleaned by the validator',()=>{
  assert.equal('grammar' in validatePd3(emptyPd3()),false,'absent until used');
  assert.equal('grammar' in validatePd3({...emptyPd3(),grammar:{sets:{},cats:{},updatedAt:5}}),false,'an empty record is dropped');
  assert.equal('grammar' in validatePd3({...emptyPd3(),grammar:'x'}),false);
  const clean=validatePd3(pd3With({
    sets:{'gram-1':{best:140,last:'55',attempts:3.4,at:T0,parts:[1,2]},'Bad Id':{best:1},'gram-2':null},
    cats:{v2:{ok:9,all:4},prep:{ok:1,all:'3'},'Bad Id':{ok:1,all:1},agree:{ok:1,all:0},tenses:'x'},updatedAt:T0,extra:1
  }));
  assert.deepEqual(clean.grammar,{sets:{'gram-1':{best:100,last:55,attempts:3,at:T0}},cats:{v2:{ok:4,all:4},prep:{ok:1,all:3}},updatedAt:T0});
  assert.ok(PD3_KEYS.has('grammar'),'not carried as an unknown field any more');
  const many=Object.fromEntries(Array.from({length:60},(_,i)=>[`c${i}`,{ok:1,all:2}]));
  assert.equal(Object.keys(validatePd3(pd3With({sets:{},cats:many,updatedAt:1})).grammar.cats).length,40);
});

test('the overall size ceiling holds: grammar sets are pruned with the other results when the data is too large',()=>{
  const sets={};
  for(let i=0;i<PD3_LIMITS.items;i++)sets[`gram-${i}`]={best:10,last:10,attempts:1,at:i+1};
  const data=validatePd3(pd3With({sets,cats:{v2:{ok:1,all:2}},updatedAt:T0}));
  data.writing['w-1']={draft:'x'.repeat(10),option:'A',updatedAt:1,done:false,req:[],check:[],self:{}};
  const sealed=sealPd3(structuredClone(data),null,2000);
  assert.ok(JSON.stringify(sealed).length<=2000);assert.ok(Object.keys(sealed.grammar.sets).length<PD3_LIMITS.items);
  assert.ok(!sealed.grammar.sets['gram-0'],'the oldest result goes first');
  assert.deepEqual(sealed.grammar.cats,{v2:{ok:1,all:2}},'the category counters are tiny and stay');
});

test('progress round trip: validateState keeps the grammar field and an older copy without it stays unchanged',()=>{
  const state=createState();
  assert.equal('pd3' in validateState(state),false);
  const withPd3=validateState({...state,pd3:pd3With({sets:{'gram-1':{best:70,last:70,attempts:1,at:T0}},cats:{v2:{ok:2,all:3}},updatedAt:T0})});
  assert.deepEqual(withPd3.pd3.grammar.cats,{v2:{ok:2,all:3}});
  assert.deepEqual(JSON.parse(JSON.stringify(validateState(JSON.parse(JSON.stringify(withPd3))))),JSON.parse(JSON.stringify(withPd3)));
  const noGrammar=validateState({...state,pd3:{...emptyPd3(),updatedAt:T0}});assert.equal('grammar' in noGrammar.pd3,false);
});

test('export and import: a copy carries the results, importing it twice counts once, better results win',()=>{
  let stored;
  const make=initial=>{stored=initial;return createPd3Store({read:()=>stored,write:next=>{stored=next;return true;}});};
  const a=make(undefined);
  assert.equal(a.update(s=>{s.grammar={sets:{'gram-1':{best:80,last:80,attempts:2,at:T0}},cats:{v2:{ok:6,all:10},prep:{ok:1,all:4}},updatedAt:T0};}),true);
  const copy=a.exportJson();
  assert.match(copy,/"grammar"/);
  const b=make(undefined);
  assert.equal(b.importJson(copy).ok,true);
  assert.deepEqual(stored.grammar.cats,{v2:{ok:6,all:10},prep:{ok:1,all:4}});assert.equal(stored.grammar.sets['gram-1'].best,80);
  assert.equal(b.importJson(copy).ok,true);assert.deepEqual(stored.grammar.cats,{v2:{ok:6,all:10},prep:{ok:1,all:4}},'the same copy twice');assert.equal(stored.grammar.sets['gram-1'].attempts,2);
  // a device with other results: best is the maximum, the category with more answers is taken whole (ok never above all)
  stored.grammar.sets['gram-1']={best:90,last:60,attempts:5,at:T0+10};stored.grammar.cats.v2={ok:3,all:4};
  assert.equal(b.importJson(copy).ok,true);
  assert.equal(stored.grammar.sets['gram-1'].best,90);assert.equal(stored.grammar.sets['gram-1'].attempts,5);assert.deepEqual(stored.grammar.cats.v2,{ok:6,all:10});
  assert.ok(Object.values(stored.grammar.cats).every(c=>c.ok<=c.all));
  // direct merge helpers
  const merged=mergePd3(validatePd3(emptyPd3()),validatePd3(pd3With({sets:{'gram-2':{best:40,last:40,attempts:1,at:T0}},cats:{cond:{ok:1,all:2}},updatedAt:T0})));
  assert.equal(merged.grammar.sets['gram-2'].best,40);
  assert.equal(mergeGrammar(undefined,undefined),undefined);assert.deepEqual(mergeGrammar(undefined,{sets:{},cats:{},updatedAt:1}),{sets:{},cats:{},updatedAt:1});
  const mine={sets:{},cats:{v2:{ok:1,all:1}},updatedAt:1};assert.equal(mergeGrammar(mine,undefined),mine);
});

test('two tabs: sets merge like the other scores, each tab\'s new answers add up once',()=>{
  const base=validatePd3(pd3With({sets:{'gram-1':{best:50,last:50,attempts:1,at:T0}},cats:{v2:{ok:2,all:4}},updatedAt:T0}));
  const ours=structuredClone(base),theirs=structuredClone(base);
  ours.updatedAt=T0+5;ours.grammar.sets['gram-1']={best:70,last:70,attempts:2,at:T0+5};ours.grammar.cats.v2={ok:5,all:8};ours.grammar.cats.prep={ok:1,all:2};
  theirs.updatedAt=T0+9;theirs.grammar.sets['gram-1']={best:60,last:60,attempts:2,at:T0+9};theirs.grammar.sets['gram-2']={best:30,last:30,attempts:1,at:T0+9};theirs.grammar.cats.v2={ok:3,all:6};
  const merged=mergePd3Tabs(base,ours,theirs,true);
  assert.equal(merged.grammar.sets['gram-1'].best,70);assert.equal(merged.grammar.sets['gram-1'].attempts,3,'one attempt in each tab on top of the common one');
  assert.equal(merged.grammar.sets['gram-2'].best,30);
  assert.deepEqual(merged.grammar.cats.v2,{ok:2+3+1,all:4+4+2});assert.deepEqual(merged.grammar.cats.prep,{ok:1,all:2});
  assert.deepEqual(mergePd3Tabs(base,ours,ours,true).grammar.cats,ours.grammar.cats,'the same data from both sides is not doubled');
  const noBase=mergePd3Tabs(undefined,ours,theirs,false);assert.deepEqual(noBase.grammar.cats.v2,{ok:5,all:8},'without a common ancestor the larger value is taken');
  const onlyOurs=mergePd3Tabs(base,{...base,updatedAt:T0+1},{...theirs,grammar:undefined},true);
  assert.ok(onlyOurs.grammar,'a missing grammar side keeps the other one');
  delete base.grammar;const plain=mergePd3Tabs(base,structuredClone(base),structuredClone(base),true);assert.equal('grammar' in plain,false,'stays absent when neither tab used it');
  // cloud progress replaces the device: local grammar results are kept
  const remote={...createState(),pd3:validatePd3(pd3With({sets:{},cats:{prep:{ok:1,all:1}},updatedAt:T0}))};
  const local={...createState(),pd3:validatePd3(pd3With({sets:{'gram-3':{best:90,last:90,attempts:1,at:T0}},cats:{},updatedAt:T0}))};
  const adopted=adoptRemoteState(remote,local);
  assert.equal(adopted.pd3.grammar.sets['gram-3'].best,90);assert.deepEqual(adopted.pd3.grammar.cats,{prep:{ok:1,all:1}});
});

/* ---------- the unfinished set ---------- */
test('snapshot, validation and restore of an unfinished set',()=>{
  const run={phase:'run',index:3,answers:{'fx1-01':1,'fx1-04':{i:7,t:'sto'},'fx1-08':[2,0],'fx1-06':''},done:{'fx1-01':true,'fx1-02':true},skipped:{'fx1-02':true},self:{},timerOn:true,deadline:T0+900000};
  const snap=snapshotGrammar(run);
  assert.deepEqual(snap,{index:3,answers:{'fx1-01':1,'fx1-04':{i:7,t:'sto'},'fx1-08':[2,0]},done:['fx1-01','fx1-02'],skipped:['fx1-02'],self:[],timerOn:true,deadline:T0+900000});
  assert.equal(snapshotGrammar({...run,phase:'result'}),null);assert.equal(snapshotGrammar(null),null);
  assert.equal(snapshotGrammar({...run,timerOn:false}).deadline,null);
  const ok=raw=>validateGrammarFields(structuredClone(raw),set1,T0+1000);
  const clean=ok(snap);
  assert.deepEqual(clean.answers,snap.answers);assert.deepEqual(clean.done,{'fx1-01':true,'fx1-02':true});assert.equal(clean.index,3);
  assert.equal(ok({...snap,index:10}),null);assert.equal(ok({...snap,index:-1}),null);assert.equal(ok({...snap,index:1.5}),null);
  assert.equal(ok({...snap,answers:{nope:1}}),null,'a task that is not in the set');
  assert.equal(ok({...snap,answers:{'fx1-01':7}}),null,'an option that does not exist');
  assert.equal(ok({...snap,answers:{'fx1-04':{i:7,t:5}}}),null);
  assert.equal(ok({...snap,answers:{'fx1-08':[1,1]}}),null);
  assert.equal(ok({...snap,answers:JSON.parse('{"__proto__":1}')}),null);
  assert.equal(ok({...snap,done:['nope']}),null);assert.equal(ok({...snap,done:'x'}),null);
  assert.equal(ok({...snap,skipped:['fx1-05'],done:['fx1-01','fx1-02']}),null,'skipped but not done');
  assert.equal(ok({...snap,self:['fx1-01']}),null,'a right answer cannot be marked as self-checked');
  assert.equal(ok({...snap,self:['fx1-02']}),null,'a skipped task cannot be self-checked');
  assert.deepEqual(ok({...snap,answers:{...snap.answers,'fx1-06':'Man bygger en ny skole.'},done:[...snap.done,'fx1-06'],self:['fx1-06']}).self,{'fx1-06':true});
  assert.equal(ok({...snap,done:['fx1-01','fx1-02','fx1-03'],skipped:['fx1-02']}),null,'done without an answer and not skipped');
  assert.equal(ok({...snap,timerOn:'yes'}),null);
  assert.equal(ok({...snap,deadline:T0+3600000}),null,'a deadline further away than the set');assert.equal(ok({...snap,deadline:null}),null);
  assert.equal(ok({...snap,timerOn:false,deadline:null}).deadline,null);
  assert.ok(ok({...snap,deadline:T0-5000}),'an expired deadline is valid: the page closes the set');
  const fresh={};applyGrammar(fresh,clean);
  assert.equal(fresh.phase,'run');assert.deepEqual(fresh.answers,clean.answers);assert.equal(fresh.index,3);assert.equal(fresh.deadline,T0+900000);
  assert.equal(secondsLeft(fresh,T0+1000),899);assert.equal(secondsLeft(fresh,T0+10**7),0);assert.equal(secondsLeft({timerOn:false},T0),null);
});
