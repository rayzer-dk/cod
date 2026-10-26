import test from 'node:test';
import assert from 'node:assert/strict';
import {pd3Data as data} from '../dist/pd3-data.mjs';
import {createState,validateState,validatePd3,sealPd3,emptyPd3,awardPd3,PD3_XP,PD3_DAY_XP,PD3_LIMITS,PD3_KEYS} from '../dist/engine.mjs';
import {createPd3Store,mergePd3,defaults} from '../dist/pd3-store.mjs';
import {mergePd3Tabs,adoptRemoteState} from '../dist/pd3-merge.mjs';
import {snapshotRun,validateRun,applyRun,RUN_VERSION,RUN_LEGACY_VERSION} from '../dist/pd3-run.mjs';
import {hubView} from '../dist/pd3-views.mjs';
import {planView,pd3ProgressSection} from '../dist/pd3-system-view.mjs';
import {
  buildSchedule,stageNumber,plannedMinutes,canMock,mockSets,setUsage,defaultSetId,newMock,stageOf,isFinished,pauseMock,resumeMock,isExpired,
  secondsLeft,blockSecondsLeft,marksFor,finishStage,leaveBreak,scoreFind,scoreText,buildReport,mockRecord,awardEvent,mockHistory,mockAdvice,
  selfPercent,snapshotMock,validateMockRun,MOCK_AGE,MOCK_STALE_DAYS,recommendations,engaged
} from '../dist/pd3-mock.mjs';

const T0=Date.parse('2026-10-26T10:00:00Z'),MIN=60000,HOUR=3600000;
const sets=mockSets(data);

/** Plays a whole exam with the given draft per stage kind; returns the finished mock. */
function play(mode,{timerMode='format',set=sets[0],answers=perfect,now=T0,self=true,spend=stage=>stage.minutes*MIN/2||MIN}={}){
  const mock=newMock({mode,timerMode,set,now,id:'m-test-'+mode});
  let t=now;
  while(!isFinished(mock)){
    const stage=stageOf(mock);t+=spend(stage);
    if(stage.kind==='break'){leaveBreak(mock,t);continue;}
    finishStage(mock,answers(stage,mock),t);
  }
  if(self){for(const c of data.writingCriteria)mock.self.writing[c.id]=4;for(const c of data.oralCriteria)mock.self.oral[c.id]=3;}
  return mock;
}
function perfect(stage,mock){
  const item=(list,key)=>data[list].find(x=>x.id===mock.set[key]);
  if(stage.kind==='find')return {answers:Object.fromEntries(item('readingExamFind','find').questions.map(q=>[`find:${q.id}`,q.section]))};
  if(stage.kind==='text'){
    const t=item('readingExamText','text'),a={};
    t.text1.questions.forEach((q,i)=>{a[`t1:${i}`]=q.answer;});
    for(const p of t.text2.parts)if(p.gap)a[`t2:${p.gap}`]=t.text2.solution[p.gap];
    for(const s of t.text3.segments)if(typeof s!=='string')a[`t3:${s.gap}`]=s.answer;
    return {answers:a,task:'t1'};
  }
  if(stage.kind==='email'){const e=item('writingEmail','email');return {text:e.modelAnswer,req:e.requirements.map(()=>true),check:e.checklist.map(()=>true)};}
  if(stage.kind==='task'){const k=item('writingTask','task');return {text:k.modelAnswers.A,option:'A',req:k.options[0].requirements.map(()=>true),check:k.checklist.map(()=>true)};}
  return {kw:['a'],step:1,started:true};
}

test('mock: schedules follow the formats (150 min written + about 15 min oral; the short one is about 35 min of reading)',()=>{
  const full=buildSchedule('full');
  assert.deepEqual(full.map(s=>s.id),['find','text','email','task','break','mono','intv','inter','disc']);
  assert.deepEqual(plannedMinutes('full'),{written:150,oral:15,total:165});
  assert.equal(full.find(s=>s.id==='find').minutes,25);assert.equal(full.find(s=>s.id==='text').minutes,65);
  assert.equal(full.find(s=>s.id==='break').minutes,0);
  const short=buildSchedule('short');
  assert.deepEqual(short.map(s=>s.id),['find','text','email','break','mono','intv']);
  assert.deepEqual(short.find(s=>s.id==='text').tasks,['t1','t3']);
  assert.equal(short.filter(s=>['find','text'].includes(s.id)).reduce((n,s)=>n+s.minutes,0),35);
  assert.equal(short.find(s=>s.id==='email').minutes,30);
  assert.deepEqual(stageNumber(full,0),{n:1,total:8});assert.deepEqual(stageNumber(full,5),{n:5,total:8});assert.deepEqual(stageNumber(short,4),{n:4,total:5});
  assert.deepEqual(buildSchedule('nope'),[]);
});

test('mock: sets rotate through the content and the least used set is offered first',()=>{
  assert.ok(canMock(data));assert.equal(canMock({...data,oralCriteria:[]}),false);assert.deepEqual(mockSets({}),[]);
  assert.equal(sets.length,6);assert.equal(new Set(sets.map(s=>s.id)).size,6);
  assert.equal(sets[0].find,data.readingExamFind[0].id);assert.equal(sets[1].find,data.readingExamFind[1].id);assert.equal(sets[2].find,data.readingExamFind[0].id);
  assert.equal(defaultSetId(sets,undefined),'set-1');assert.equal(defaultSetId([],null),'');
  const pd3=emptyPd3();
  pd3.exam.find[sets[0].find]={best:80,last:80,attempts:2,at:1};
  assert.equal(setUsage(sets[1],pd3),0);assert.ok(setUsage(sets[0],pd3)>=2);
  assert.equal(defaultSetId(sets,pd3),'set-2','a set whose exam was done is not offered first');
  pd3.mocks={x:{at:1,updatedAt:1,mode:'full',set:'set-2',find:null,text:null,writing:null,oral:null,weak:'',minutes:1,stages:1,of:8}};
  pd3.writing[sets[3].email]={draft:'',option:'A',updatedAt:1,done:true,req:[],check:[],self:{}};
  assert.notEqual(defaultSetId(sets,pd3),'set-2');
  for(const s of sets)for(const k of ['find','text','email','task','mono','intv','inter','disc'])assert.ok(s[k]);
});

test('mock: absolute deadlines, block clock, pause and resume',()=>{
  const mock=newMock({mode:'full',timerMode:'format',set:sets[0],now:T0,id:'m-a'});
  assert.equal(mock.deadline,T0+25*MIN);assert.equal(mock.blockDeadline,T0+150*MIN);
  assert.equal(secondsLeft(mock,T0+MIN),24*60);assert.equal(blockSecondsLeft(mock,T0),150*60);
  assert.equal(isExpired(mock,T0+25*MIN-1),false);assert.equal(isExpired(mock,T0+25*MIN),true);
  assert.equal(pauseMock(mock,T0+5*MIN),true);assert.equal(pauseMock(mock,T0+6*MIN),false);
  assert.equal(secondsLeft(mock,T0+99*MIN),20*60,'the kept time does not move while paused');assert.equal(isExpired(mock,T0+99*MIN),false);
  assert.equal(blockSecondsLeft(mock,T0+99*MIN),145*60);
  assert.equal(resumeMock(mock,T0+10*MIN),true);assert.equal(resumeMock(mock,T0+11*MIN),false);
  assert.equal(mock.deadline,T0+30*MIN);assert.equal(mock.blockDeadline,T0+155*MIN);assert.equal(mock.pausedMs,5*MIN);
  // finish early: the next stage starts its own clock, the block clock is kept
  finishStage(mock,{answers:{}},T0+12*MIN);
  assert.equal(stageOf(mock).id,'text');assert.equal(mock.deadline,T0+12*MIN+65*MIN);assert.equal(mock.blockDeadline,T0+155*MIN);
  assert.equal(mock.results.find.sec,7*60,'time spent without the pause');
  assert.equal(pauseMock(mock,T0+13*MIN),true);
  // the time over cannot be paused
  const late=newMock({mode:'short',timerMode:'format',set:sets[0],now:T0,id:'m-b'});
  assert.equal(pauseMock(late,T0+16*MIN),false);
  // without a timer there are no deadlines and no clock to pause
  const free=newMock({mode:'short',timerMode:'none',set:sets[0],now:T0,id:'m-c'});
  assert.equal(free.deadline,null);assert.equal(secondsLeft(free,T0+99*MIN),null);assert.equal(isExpired(free,T0+999*MIN),false);
  assert.equal(pauseMock(free,T0+MIN),true);assert.equal(resumeMock(free,T0+2*MIN),true);
  assert.deepEqual(marksFor(25*60),[600,300,60,30]);assert.deepEqual(marksFor(3*60),[60,30]);assert.deepEqual(marksFor(30),[]);
});

test('mock: a stage ended by the clock keeps what was entered; the oral block starts its own clock after the break',()=>{
  const mock=newMock({mode:'short',timerMode:'format',set:sets[0],now:T0,id:'m-d'});
  finishStage(mock,{answers:{'find:q1':'s1','t1:0':1,'bad':'x'}},T0+30*MIN,{auto:true});
  assert.deepEqual(mock.results.find.a,{'find:q1':'s1'});assert.equal(mock.results.find.auto,true);assert.equal(mock.results.find.sec,15*60,'spent time is capped by the stage');
  finishStage(mock,{answers:{}},T0+31*MIN);finishStage(mock,{text:'x'.repeat(7000),req:[true,0],check:[]},T0+32*MIN);
  assert.equal(mock.results.email.text.length,6000);assert.deepEqual(mock.results.email.req,[true,false]);
  assert.equal(stageOf(mock).kind,'break');assert.equal(mock.deadline,null);assert.equal(mock.blockDeadline,null);
  assert.equal(pauseMock(mock,T0+33*MIN),false);assert.equal(finishStage(mock,{},T0+33*MIN),null);
  assert.equal(leaveBreak(mock,T0+500*MIN),true);assert.equal(leaveBreak(mock,T0+500*MIN),false);
  assert.equal(stageOf(mock).id,'mono');assert.equal(mock.deadline,T0+503*MIN);assert.equal(mock.blockDeadline,T0+507*MIN,'the oral part has 7 minutes in the short mode');
  finishStage(mock,{kw:['a','b'],step:3},T0+501*MIN);finishStage(mock,{step:2},T0+502*MIN);
  assert.equal(isFinished(mock),true);assert.equal(mock.finishedAt,T0+502*MIN);assert.equal(stageOf(mock),null);
});

test('mock: reading is scored per task type with the user answer, the right one and the explanation',()=>{
  const find=data.readingExamFind[0],text=data.readingExamText[0];
  const none=scoreFind(find,{});assert.equal(none.correct,0);assert.equal(none.total,15);assert.ok(none.rows.every(r=>!r.ok&&r.why&&r.evidence));
  const a=Object.fromEntries(find.questions.map(q=>[`find:${q.id}`,q.section]));
  assert.equal(scoreFind(find,a).percent,100);
  a[`find:${find.questions[0].id}`]='s9';const one=scoreFind(find,a);assert.equal(one.correct,14);assert.equal(one.rows[0].given,'s9');
  const all=perfect({kind:'text'},{set:sets[0]}).answers;
  const full=scoreText(text,all);assert.equal(full.percent,100);assert.deepEqual(Object.keys(full.parts),['t1','t2','t3']);
  const short=scoreText(text,all,['t1','t3']);assert.deepEqual(Object.keys(short.parts),['t1','t3']);assert.equal(short.total,full.total-5);
  const wrong=scoreText(text,{'t1:0':(text.text1.questions[0].answer+1)%3},['t1']);
  assert.equal(wrong.rows[0].ok,false);assert.equal(wrong.rows[0].correct,text.text1.questions[0].options[text.text1.questions[0].answer]);assert.ok(wrong.rows[0].given);
  const t3=scoreText(text,{},['t3']);assert.ok(t3.rows.every(r=>r.q.includes('…')&&!r.ok));
});

test('mock: the report shows reading by program, writing and oral as self-assessment with separate mechanical checks, no forecast',()=>{
  const mock=play('full');
  const report=buildReport({mock,data,pd3:emptyPd3()});
  assert.equal(report.skills.find.percent,100);assert.equal(report.skills.text.percent,100);
  assert.equal(report.skills.writing.percent,80);assert.equal(report.skills.oral.percent,60);
  assert.equal(report.skills.writing.self,true);assert.equal(report.skills.find.self,undefined);
  assert.equal(report.weak,'oral','the lowest percent is the weak skill');
  assert.equal(report.writing.texts.length,2);
  for(const text of report.writing.texts){assert.equal(text.level,'ok');assert.deepEqual(text.flags,[]);assert.ok(text.reqs.every(r=>r.ok));assert.ok(text.connectors.length>=3);}
  assert.equal(report.writing.texts[1].option,'A');
  assert.deepEqual(report.oral.lowest.map(a=>a.id),data.oralCriteria.map(c=>c.id).slice(0,3),'all axes are equal: the first three are named');
  assert.ok(report.recs.length<=4);assert.equal(report.recs.at(-1).kind,'repeat');
  assert.ok(!('verdict' in report)&&!('forecast' in report)&&!('passed' in report));
  assert.equal(report.stages,8);assert.equal(report.engaged,8);assert.ok(report.minutes>=1);
  // unrated self-assessment: no percent, no weak skill among self skills
  const bare=play('short',{self:false});bare.self.writing={content:5};
  const r2=buildReport({mock:bare,data,pd3:null});
  assert.equal(r2.skills.writing.percent,null);assert.equal(r2.skills.writing.rated,1);assert.equal(r2.skills.oral.percent,null);
  assert.ok(['find','text'].includes(r2.weak),'only measured skills can be weak');
  assert.equal(selfPercent({content:5,vocabulary:5,grammar:5,coherence:5},data.writingCriteria),100);assert.equal(selfPercent({content:5},data.writingCriteria),null);
  assert.equal(selfPercent({content:6,vocabulary:5,grammar:5,coherence:5},data.writingCriteria),null,'a mark outside 1-5 is not a mark');
});

test('mock: weak spots and recommendations come from what went wrong',()=>{
  const mock=play('full',{answers:(stage,m)=>{
    if(stage.kind==='find')return {answers:{}};
    if(stage.kind==='email')return {text:'Hej. Jeg kan ikke.',req:[true,false],check:[]};
    if(stage.kind==='task')return {text:data.writingTask[0].modelAnswers.A+' '+data.writingTask[0].modelAnswers.A,option:'A',req:[],check:[]};
    return perfect(stage,m);
  }});
  mock.self.oral={content:5,vocabulary:2,grammar:2,fluency:4,pronunciation:5,interaction:5};mock.self.writing={content:2,vocabulary:2,grammar:2,coherence:2};
  const pd3=emptyPd3();pd3.stats.dictation={runs:3,errors:{double:5,silent:2}};
  const report=buildReport({mock,data,pd3});
  assert.equal(report.reading.byType.find.wrong,15);assert.equal(report.reading.byType.text1.wrong,0);
  const email=report.writing.texts[0],task=report.writing.texts[1];
  assert.ok(email.flags.includes('short')&&email.flags.includes('connectors'));assert.deepEqual(email.reqs.map(r=>r.ok).slice(0,2),[true,false]);
  assert.ok(task.flags.includes('long')||task.flags.includes('repeats'));
  assert.deepEqual(report.oral.lowest.map(a=>a.id),['vocabulary','grammar']);
  assert.equal(report.weak,'find');
  const kinds=report.recs.map(r=>r.kind);
  assert.ok(kinds.length<=4);assert.ok(kinds.includes('reading')&&kinds.includes('writing')&&kinds.includes('repeat'));
  assert.equal(report.recs[0].kind,'reading','the largest gap first');
  const reading=report.recs.find(r=>r.kind==='reading');assert.equal(reading.level,'B1');assert.ok(data.readingPractice.some(x=>x.id===reading.id&&x.level==='B1'));
  const dict=recommendations({report,pd3,data}).find(r=>r.kind==='dictation');
  if(dict)assert.ok(data.dictations.some(x=>x.id===dict.id));
  assert.equal(recommendations({report,pd3:null,data}).some(r=>r.kind==='dictation'),false,'no statistics: no dictation advice');
  // reading seen as done does not repeat the same text
  pd3.reading[reading.id]={best:50,last:50,attempts:1,at:1};
  const again=recommendations({report,pd3,data}).find(r=>r.kind==='reading');assert.notEqual(again.id,reading.id);
});

test('mock: the compact record, XP rule and history',()=>{
  const mock=play('full');const report=buildReport({mock,data,pd3:null});
  const record=mockRecord(mock,report,T0+HOUR);
  assert.deepEqual(Object.keys(record).sort(),['at','find','minutes','mode','of','oral','set','stages','text','updatedAt','weak','writing']);
  assert.equal(record.find,100);assert.equal(record.set,'set-1');assert.equal(record.of,8);
  assert.deepEqual(awardEvent(mock,report),{kind:'mock',id:'m-test-full',percent:100,minutes:report.minutes});
  assert.equal(awardEvent(play('short'),buildReport({mock:play('short'),data,pd3:null})).percent,50);
  // an abandoned exam (empty stages) does not pay
  const empty=play('full',{answers:()=>({answers:{},text:''}),spend:()=>5000});
  const er=buildReport({mock:empty,data,pd3:null});
  assert.equal(er.engaged,0,'stages left empty or closed in seconds do not count');assert.equal(awardEvent(empty,er),null);
  const half=play('full',{answers:(stage,m)=>stage.kind==='find'||stage.kind==='text'||stage.kind==='email'?perfect(stage,m):{answers:{}}});
  assert.equal(awardEvent(half,buildReport({mock:half,data,pd3:null})).kind,'mock','half of the stages is enough');
  const auto=newMock({mode:'short',timerMode:'format',set:sets[0],now:T0,id:'m-e'});
  while(!isFinished(auto)){if(stageOf(auto).kind==='break')leaveBreak(auto,T0);else finishStage(auto,{answers:{}},T0,{auto:true});}
  assert.equal(awardEvent(auto,buildReport({mock:auto,data,pd3:null})),null);
  assert.equal(engaged({kind:'mono'},{auto:true,sec:200},data,sets[0]),false);assert.equal(engaged({kind:'mono'},{auto:false,sec:29},data,sets[0]),false);assert.equal(engaged({kind:'mono'},{auto:false,sec:30},data,sets[0]),true);
  const pd3=emptyPd3();pd3.mocks={};
  for(let i=0;i<7;i++)pd3.mocks['m'+i]={...record,at:T0+i*HOUR};
  assert.deepEqual(mockHistory(pd3,5).map(r=>r.id),['m6','m5','m4','m3','m2']);assert.deepEqual(mockHistory(null),[]);
});

test('mock: the plan suggests a mock exam when there was none or the last is 14 days old',()=>{
  const now=new Date('2026-10-26T12:00:00Z');
  assert.deepEqual(mockAdvice(emptyPd3(),data,now),{due:true,reason:'never',days:null});
  assert.equal(mockAdvice(emptyPd3(),{},now).due,false,'no content, no advice');
  const pd3=emptyPd3();
  const at=days=>({at:now.getTime()-days*86400000,updatedAt:1,mode:'full',set:'set-1',find:1,text:1,writing:null,oral:null,weak:'',minutes:1,stages:8,of:8});
  pd3.mocks={a:at(13)};assert.deepEqual(mockAdvice(pd3,data,now).due,false);
  pd3.mocks={a:at(MOCK_STALE_DAYS)};const stale=mockAdvice(pd3,data,now);assert.equal(stale.due,true);assert.equal(stale.reason,'stale');
  assert.match(planView({d:emptyPd3(),data,now}),/Пробный экзамен:<\/b> ещё ни одного не было/);
  assert.match(planView({d:pd3,data,now}),/последний был 14 дней назад/);
  pd3.mocks={a:at(1)};assert.doesNotMatch(planView({d:pd3,data,now}),/pd3-advice-mock/);
  assert.equal(MOCK_STALE_DAYS,14);
});

test('mock: hub card, history and progress section',()=>{
  const d=emptyPd3();
  const html=hubView({data,d,error:''});
  assert.match(html,/data-action="pd3-mock-open" data-value="mock"/);assert.match(html,/Пробный экзамен/);assert.doesNotMatch(html,/pd3-mock-history"/);
  assert.equal(hubView({data:{...data,oralCriteria:[]},d,error:''}).match(/pd3-mock-open"[^>]*disabled/)!==null,true,'without content the card is disabled');
  const mock=play('full'),record=mockRecord(mock,buildReport({mock,data,pd3:null}),T0);
  d.mocks={};for(let i=0;i<7;i++)d.mocks['m'+i]={...record,at:T0+i*HOUR,writing:null};
  const hub=hubView({data,d,error:''});
  assert.equal((hub.match(/<li><span class="pd3-mock-head"><b>\d\d\.\d\d\.\d{4}<\/b>/g)||[]).length,5,'the last five');
  assert.match(hub,/Del 1: 100% · Del 2: 100% · письмо \(самооценка\): — · устная часть \(самооценка\): 60%/);
  assert.equal((hub.match(/data-action="pd3-open"/g)||[]).length,6,'still six section buttons');
  const progress=pd3ProgressSection(d,data);assert.match(progress,/Пробные экзамены/);assert.match(progress,/data-action="open-pd3" data-value="mock"/);
  assert.doesNotMatch(pd3ProgressSection(emptyPd3(),data)||'x',/Пробные экзамены/);
});

/* ---------- the stored schema ---------- */
test('mocks in state.pd3: optional, validated, at most 20 newest',()=>{
  assert.ok(!('mocks' in emptyPd3()));assert.ok(PD3_KEYS.has('mocks'));assert.equal(PD3_LIMITS.mocks,20);
  assert.ok(!('mocks' in validatePd3(emptyPd3())));
  const good={at:5,updatedAt:6,mode:'short',set:'set-2',find:80,text:null,writing:50.4,oral:null,weak:'writing',minutes:33,stages:5,of:5};
  const raw={...emptyPd3(),mocks:{ok:good,'BAD ID':good,nomode:{...good,mode:'x'},noset:{...good,set:'A B'},str:'x',n:null}};
  const clean=validatePd3(raw);
  assert.deepEqual(Object.keys(clean.mocks),['ok']);assert.deepEqual(clean.mocks.ok,{...good,writing:50});
  const fixed=validatePd3({...emptyPd3(),mocks:{a:{...good,find:'abc',weak:'zzz',minutes:-4,stages:99,of:'x',at:'q',updatedAt:0}}}).mocks.a;
  assert.equal(fixed.find,null);assert.equal(fixed.weak,'');assert.equal(fixed.minutes,0);assert.equal(fixed.stages,12);assert.equal(fixed.of,0);assert.equal(fixed.at,0);assert.equal(fixed.updatedAt,0);
  const many={};for(let i=0;i<30;i++)many['m'+String(i).padStart(2,'0')]={...good,at:1000+i};
  const capped=validatePd3({...emptyPd3(),mocks:many}).mocks;
  assert.equal(Object.keys(capped).length,20);assert.ok(capped.m29&&capped.m10&&!capped.m09,'the newest are kept');
  assert.equal(JSON.stringify(validatePd3(JSON.parse(JSON.stringify(clean)))),JSON.stringify(clean),'cleaning twice changes nothing');
  assert.ok(JSON.stringify(sealPd3(structuredClone(validatePd3({...emptyPd3(),mocks:many})))).length<8000,'twenty records are small');
  assert.throws(()=>validatePd3({...emptyPd3(),version:2}));
  const state=validateState({...createState(),pd3:clean});assert.deepEqual(state.pd3.mocks,clean.mocks);
});

test('XP for a mock exam: once per exam, a share of 30, the day limit stays, nothing below the threshold',()=>{
  assert.equal(PD3_XP.mock,30);
  const day=new Date('2026-10-26T10:00:00Z');
  const a=awardPd3(createState(),{kind:'mock',id:'m-1',percent:100,minutes:140},day);
  assert.equal(a.xp,30);assert.equal(a.state.pd3.xp.items['mock:m-1'],100);
  const again=awardPd3(a.state,{kind:'mock',id:'m-1',percent:100,minutes:140},day);assert.equal(again.xp,0,'idempotent');
  const short=awardPd3(createState(),{kind:'mock',id:'m-2',percent:50,minutes:40},day);assert.equal(short.xp,15);
  const second=awardPd3(a.state,{kind:'mock',id:'m-3',percent:100,minutes:1},day);assert.equal(second.xp,30);
  const third=awardPd3(second.state,{kind:'mock',id:'m-4',percent:100,minutes:1},day);assert.equal(third.xp,0,'60 XP a day at most');assert.equal(PD3_DAY_XP,60);
  assert.equal(awardPd3(createState(),{kind:'mock',id:'m-5',percent:20,minutes:1},day).counted,false);
  validateState(third.state);
});

test('mocks merge by id (the later record wins), in every path that combines progress',()=>{
  const rec=(over={})=>({at:100,updatedAt:100,mode:'full',set:'set-1',find:50,text:50,writing:null,oral:null,weak:'',minutes:100,stages:8,of:8,...over});
  const mk=mocks=>{const p=validatePd3({...emptyPd3(),updatedAt:1,mocks});return p;};
  // import
  const mine=mk({a:rec({updatedAt:100}),only:rec({at:50,updatedAt:50})}),theirs=mk({a:rec({updatedAt:200,writing:70}),new:rec({at:300,updatedAt:300})});
  const merged=mergePd3(structuredClone(mine),theirs);
  assert.equal(merged.mocks.a.writing,70);assert.deepEqual(Object.keys(merged.mocks).sort(),['a','new','only']);
  assert.equal(mergePd3(structuredClone(theirs),mine).mocks.a.writing,70,'the later record wins in either direction');
  assert.ok(!('mocks' in mergePd3(emptyPd3(),emptyPd3())));
  assert.deepEqual(mergePd3(structuredClone(mine),emptyPd3()).mocks,mine.mocks);
  const many=mk(Object.fromEntries(Array.from({length:20},(_,i)=>['x'+i,rec({at:1000+i})])));
  assert.equal(Object.keys(mergePd3(structuredClone(many),mk({y:rec({at:5000})})).mocks).length,20);
  // two tabs
  const base=mk({a:rec()}),ours=mk({a:rec({updatedAt:300,oral:60}),o:rec({at:400,updatedAt:400})}),other=mk({a:rec({updatedAt:200,writing:20}),t:rec({at:500,updatedAt:500})});
  ours.updatedAt=2;other.updatedAt=3;
  const tabs=mergePd3Tabs(base,ours,other,true);
  assert.deepEqual(Object.keys(tabs.mocks).sort(),['a','o','t']);assert.equal(tabs.mocks.a.oral,60,'the later record');
  assert.ok(!('mocks' in mergePd3Tabs(emptyPd3(),emptyPd3(),emptyPd3(),true)));
  assert.deepEqual(mergePd3Tabs(emptyPd3(),mine,emptyPd3(),false).mocks,mine.mocks);
  // cloud replaces the device: local-only exams stay
  const remote=createState();remote.pd3=mk({a:rec()});const local=createState();local.pd3=mk({a:rec({updatedAt:900,writing:99}),l:rec({at:600,updatedAt:600})});
  const adopted=adoptRemoteState(remote,local);assert.deepEqual(Object.keys(adopted.pd3.mocks).sort(),['a','l']);assert.equal(adopted.pd3.mocks.a.writing,99);
  const noRemote=adoptRemoteState(createState(),local);assert.deepEqual(Object.keys(noRemote.pd3.mocks).sort(),['a','l']);
});

test('mocks travel with the PD3 copy: export, import, and a store over the progress',()=>{
  let stored;
  const store=createPd3Store({read:()=>stored,write:next=>{stored=next;return true;}});
  const rec={at:100,updatedAt:100,mode:'short',set:'set-3',find:10,text:20,writing:30,oral:40,weak:'find',minutes:30,stages:5,of:5};
  assert.equal(store.update(s=>{s.mocks={m1:rec};}),true);
  const json=store.exportJson();assert.equal(JSON.parse(json).mocks.m1.set,'set-3');
  let other;const second=createPd3Store({read:()=>other,write:next=>{other=next;return true;}});
  assert.deepEqual(second.importJson(json),{ok:true});assert.deepEqual(other.mocks,stored.mocks);
  assert.deepEqual(second.importJson(json),{ok:true});assert.equal(Object.keys(other.mocks).length,1,'importing twice does not duplicate');
  const state=validateState({...createState(),pd3:stored});assert.equal(JSON.parse(JSON.stringify(state)).pd3.mocks.m1.oral,40,'part of the progress file');
  assert.ok(!('mocks' in defaults()));
});

/* ---------- the unfinished run ---------- */
const uiOf=mock=>({view:'mock',id:mock.id,kind:null});
function runOf(mock,extra={}){return {t0:mock.startedAt,mock,answers:{},task:'t1',text:'',option:'A',req:[],check:[],kw:[],step:0,started:false,...extra};}

test('mock run: snapshot, validation and restore round trip for every stage; older records are still read',()=>{
  const now=T0+10*MIN;
  const mock=newMock({mode:'full',timerMode:'format',set:sets[1],now:T0,id:'m-r1'});
  const find=data.readingExamFind.find(x=>x.id===sets[1].find);
  const run=runOf(mock,{answers:{[`find:${find.questions[0].id}`]:find.sections[2].id}});
  const record=snapshotRun(uiOf(mock),run,now);
  assert.equal(record.v,RUN_VERSION);assert.equal(RUN_VERSION,2);assert.equal(RUN_LEGACY_VERSION,1);
  assert.equal(record.view,'mock');assert.equal(record.id,'m-r1');assert.equal(record.t0,T0);
  const back=validateRun(JSON.parse(JSON.stringify(record)),{data,now});
  assert.ok(back);assert.deepEqual(back.mock.set,mock.set);assert.equal(back.mock.deadline,mock.deadline);
  const fresh=applyRun({},back);assert.deepEqual(fresh.answers,run.answers);assert.equal(fresh.mock.index,0);assert.equal(fresh.task,'t1');
  // walk through every stage of both modes, with a draft in each
  for(const mode of ['full','short']){
    const m=newMock({mode,timerMode:'format',set:sets[2],now:T0,id:'m-w'+mode});let t=T0;
    while(!isFinished(m)){
      const stage=stageOf(m);t+=MIN;
      const r=runOf(m,{answers:stage.kind==='find'?perfect(stage,m).answers:{},text:'hej',req:[true],check:[true,false],option:'B',kw:['a'],step:1,started:true,task:stage.tasks?.[1]||'t1'});
      const rec=snapshotRun(uiOf(m),r,t);assert.ok(rec,mode+stage.kind);
      const ok=validateRun(JSON.parse(JSON.stringify(rec)),{data,now:t});assert.ok(ok,mode+stage.kind+' validates');
      if(stage.kind==='break')leaveBreak(m,t);else finishStage(m,r,t);
    }
    const done=snapshotRun(uiOf(m),runOf(m),t);assert.ok(validateRun(JSON.parse(JSON.stringify(done)),{data,now:t}),mode+' report phase is stored');
  }
  // a legacy v1 record of another view is still read; a v1 mock or a v2 dictation is not
  const legacy={v:1,savedAt:now,view:'reading',kind:null,id:data.readingPractice[0].id,t0:now,answers:{'q:0':1}};
  assert.ok(validateRun(legacy,{data,now}));
  assert.equal(validateRun({...record,v:1},{data,now}),null);assert.equal(validateRun({...legacy,v:2},{data,now}),null);
  assert.equal(snapshotRun({view:'reading',id:data.readingPractice[0].id},{answers:{'q:0':1}},now).v,1,'other views keep writing the old version');
  assert.equal(snapshotRun({view:'mock',id:null},runOf(mock),now),null);assert.equal(snapshotRun(uiOf(mock),{mock:null},now),null);
});

test('mock run: the validator checks the content, the clock and the shape',()=>{
  const now=T0+10*MIN;
  const mock=newMock({mode:'short',timerMode:'format',set:sets[0],now:T0,id:'m-r2'});
  const good=snapshotRun(uiOf(mock),runOf(mock),now);
  const bad=(fn,message)=>{const copy=JSON.parse(JSON.stringify(good));fn(copy);assert.equal(validateRun(copy,{data,now}),null,message);};
  assert.ok(validateRun(JSON.parse(JSON.stringify(good)),{data,now}));
  bad(r=>{r.mock.set.find='nope';},'unknown exam');bad(r=>{r.mock.set.email='nope';},'unknown email');bad(r=>{r.mock.mode='half';},'mode');bad(r=>{r.mock.timerMode='x';},'timer mode');
  bad(r=>{r.id='other';},'id differs');bad(r=>{r.mock.id='BAD ID';r.id='BAD ID';},'id shape');
  bad(r=>{r.mock.index=99;},'index');bad(r=>{r.mock.index=-1;},'negative index');bad(r=>{r.mock.index=2;},'results missing for passed stages');
  bad(r=>{r.mock.deadline=now+3*HOUR;},'deadline from the far future');bad(r=>{r.mock.deadline=null;},'timer mode needs a deadline');bad(r=>{r.mock.stageStart=now+HOUR;},'stage starts in the future');
  bad(r=>{r.mock.blockDeadline=null;},'block deadline');
  bad(r=>{r.mock.startedAt='x';},'start time');bad(r=>{r.savedAt=now+HOUR;},'saved in the future');
  bad(r=>{r.mock.results={find:{a:{},auto:false,sec:1}};},'a result for a stage not reached');
  bad(r=>{r.draft={a:{'find:zzz':'s1'}};},'unknown question');bad(r=>{r.draft={a:{[Object.keys(r.draft.a)[0]||`find:${data.readingExamFind[0].questions[0].id}`]:'zz'}};},'unknown section');
  bad(r=>{r.draft={a:{'t1:0':1}};},'a text answer in the find stage');bad(r=>{r.mock.pausedAt=now;},'paused without time left');
  bad(r=>{r.mock.self={writing:{content:9},oral:{}};},'self mark');bad(r=>{r.mock.self={writing:{zzz:3},oral:{}};},'self axis');bad(r=>{r.mock.xp=5;},'xp before the end');
  bad(r=>{r.mock.__proto__={a:1};r.mock.results=JSON.parse('{"__proto__":1}');},'poisoned');
  // TTL: 24 h for the short mode, 48 h for the full one, counted from the last save
  assert.equal(validateRun(JSON.parse(JSON.stringify(good)),{data,now:good.savedAt+MOCK_AGE.short+1}),null);
  const full=newMock({mode:'full',timerMode:'none',set:sets[0],now:T0,id:'m-r3'});
  const fullRec=JSON.parse(JSON.stringify(snapshotRun(uiOf(full),runOf(full),T0)));
  assert.ok(validateRun(fullRec,{data,now:T0+47*HOUR}),'a full exam waits through a long break');assert.equal(validateRun(fullRec,{data,now:T0+49*HOUR}),null);
  assert.equal(MOCK_AGE.full,48*HOUR);assert.equal(MOCK_AGE.short,24*HOUR);
  // a finished stage with its own results and a break record
  const m=newMock({mode:'short',timerMode:'format',set:sets[0],now:T0,id:'m-r4'});
  finishStage(m,{answers:perfect({kind:'find'},m)},T0+MIN);finishStage(m,perfect({kind:'text'},m),T0+2*MIN);
  finishStage(m,{text:'hej',req:[true,false,true],check:[true]},T0+3*MIN);
  assert.equal(stageOf(m).kind,'break');
  const br=JSON.parse(JSON.stringify(snapshotRun(uiOf(m),runOf(m),T0+4*MIN)));assert.ok(validateRun(br,{data,now:T0+4*MIN}));
  const tweak=(fn)=>{const c=JSON.parse(JSON.stringify(br));fn(c);return validateRun(c,{data,now:T0+4*MIN});};
  assert.equal(tweak(r=>{r.mock.results.email.req=[1];}),null);assert.equal(tweak(r=>{r.mock.results.email.req=Array(30).fill(true);}),null);
  assert.equal(tweak(r=>{r.mock.results.find.a={'find:x':'s1'};}),null);assert.equal(tweak(r=>{r.mock.deadline=T0+MIN;}),null,'a break has no clock');
  assert.equal(tweak(r=>{r.mock.results.email.text='x'.repeat(6001);}),null);assert.equal(tweak(r=>{r.mock.results.text.a={'t2:1':'A'};}),null,'t2 is not in the short mode');
  // a paused stage keeps the time left
  const p=newMock({mode:'short',timerMode:'format',set:sets[0],now:T0,id:'m-r5'});pauseMock(p,T0+5*MIN);
  const pr=JSON.parse(JSON.stringify(snapshotRun(uiOf(p),runOf(p),T0+5*MIN)));
  const pv=validateRun(pr,{data,now:T0+9*HOUR});assert.ok(pv);assert.equal(pv.mock.pausedLeft,10*60);assert.equal(pv.mock.pausedAt,T0+5*MIN);
  assert.equal(snapshotMock({}),null);
});
