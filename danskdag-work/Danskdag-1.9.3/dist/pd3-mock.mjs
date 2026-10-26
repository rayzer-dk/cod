// Mock exam ("Пробный экзамен") of the PD3 section: pure logic without DOM or storage. A run goes through a schedule of stages
// (reading Del 1, Del 2, writing, a break, the oral stages); each stage ends with fixed answers, with absolute deadlines for the clock.
// The page controller (pd3-mock-page.mjs) keeps the clock and the screen, pd3-mock-view.mjs draws it, pd3-run.mjs stores the unfinished run.
// What it measures: reading is checked by the program; writing and speaking are the learner's self-assessment, shown with mechanical
// checks of the text. Nothing here predicts a result of the real exam.
import {analyzeWriting,writingSpec} from './pd3-writing-check.mjs';
import {daysSince,weakSpots} from './pd3-progress.mjs';

export const MOCK_MODES=['full','short'];
export const MOCK_TIMERS=['format','none'];
export const MOCK_STALE_DAYS=14;
/** How long an unfinished run is kept on the device (from its last save): a full exam needs a break, so it lives longer. */
export const MOCK_AGE={full:48*3600*1000,short:24*3600*1000};
export const MOCK_TEXT_MAX=6000;
export const MODE_NAMES={full:'Полный',short:'Короткий'};
/** XP share of the exam's worth (PD3_XP.mock): the short mode is half of the full one. Paid once per exam id. */
export const MOCK_XP_PERCENT={full:100,short:50};
/** Warnings of the clock, in seconds before the end of a stage: 10, 5, 1 minute and 30 seconds. Only the marks inside the stage are used. */
export const TIMER_MARKS=[600,300,60,30];
const MINUTE=60000;
const CHECK_MIN={email:3,task:5};      // fewer different linking words than this is pointed out (the model answers have 5 and 8 or more)
const REPEAT_SHARE=30;                  // a share of repeated words (percent) from which repetition is pointed out (model answers: up to 28)
const SET_KEYS=['find','text','email','task','mono','intv','inter','disc'];
const SET_LISTS={find:'readingExamFind',text:'readingExamText',email:'writingEmail',task:'writingTask',mono:'oralMonologue',intv:'oralInterview',inter:'oralInteraction',disc:'oralDiscussion'};
const ID=/^[a-z0-9-]{1,60}$/;

const list=(data,name)=>Array.isArray(data?.[name])?data[name]:[];
const isRecord=value=>!!value&&typeof value==='object'&&!Array.isArray(value)&&[Object.prototype,null].includes(Object.getPrototypeOf(value));
const finite=value=>typeof value==='number'&&Number.isFinite(value);
const integer=(value,max)=>Number.isInteger(value)&&value>=0&&value<=max;
const percent=(part,total)=>total?Math.round(part/total*100):0;
const mean=values=>values.reduce((sum,value)=>sum+value,0)/values.length;

/* ---------- stages ---------- */
/** Names of the stages (the screen heading, the page title, the announcements). */
export const STAGE_TITLES={find:'Чтение, Del 1',text:'Чтение, Del 2',email:'Письмо: ответ на письмо',task:'Письмо: задание A или B',break:'Перерыв',mono:'Устная часть: монолог',intv:'Устная часть: интервью',inter:'Устная часть: взаимодействие',disc:'Устная часть: дискуссия'};
const PLAN={
  full:[['find','written',25],['text','written',65,['t1','t2','t3']],['email','written',25],['task','written',35],['break','break',0],['mono','oral',3],['intv','oral',4],['inter','oral',4],['disc','oral',4]],
  short:[['find','written',15],['text','written',20,['t1','t3']],['email','written',30],['break','break',0],['mono','oral',3],['intv','oral',4]]
};
/** The stages of a mode in order: [{id,kind,block:'written'|'oral'|'break',minutes,tasks?}]. The break has no time. */
export function buildSchedule(mode){
  return (PLAN[mode]||[]).map(([id,block,minutes,tasks])=>({id,kind:id,block,minutes,...(tasks?{tasks:[...tasks]}:{})}));
}
export const examStages=schedule=>schedule.filter(stage=>stage.kind!=='break');
/** {n,total}: number of the stage at `index` among the real stages (a break counts as the stage before it), and how many there are. */
export function stageNumber(schedule,index){
  const total=examStages(schedule).length;
  const n=schedule.slice(0,index+1).filter(stage=>stage.kind!=='break').length;
  return {n:Math.min(n,total),total};
}
/** Minutes by block and in total: {written,oral,total}. */
export function plannedMinutes(mode){
  const schedule=buildSchedule(mode),sum=block=>schedule.filter(stage=>stage.block===block).reduce((total,stage)=>total+stage.minutes,0);
  return {written:sum('written'),oral:sum('oral'),total:sum('written')+sum('oral')};
}
const blockMinutes=(schedule,block)=>schedule.filter(stage=>stage.block===block).reduce((total,stage)=>total+stage.minutes,0);

/* ---------- sets ---------- */
/** Whether the content has everything a mock exam needs. */
export function canMock(data){
  return SET_KEYS.every(key=>list(data,SET_LISTS[key]).length>0)&&list(data,'writingCriteria').length>0&&list(data,'oralCriteria').length>0;
}
/** Ready-made sets: set n takes the n-th item of every list (shorter lists start again). {id:'set-1',n:1,find,text,email,task,mono,intv,inter,disc}. */
export function mockSets(data){
  if(!canMock(data))return [];
  const count=Math.min(12,Math.max(...['readingExamFind','readingExamText','writingEmail','writingTask'].map(name=>list(data,name).length)));
  return Array.from({length:count},(_,i)=>{
    const set={id:`set-${i+1}`,n:i+1};
    for(const key of SET_KEYS){const items=list(data,SET_LISTS[key]);set[key]=items[i%items.length].id;}
    return set;
  });
}
const oralKey=(prefix,id)=>`${prefix}-${id}`.slice(0,60);
/** How much the learner has already done with the parts of a set (attempts of its exams, finished writing and oral items, earlier mock exams). */
export function setUsage(set,pd3){
  if(!pd3)return 0;
  let used=(pd3.exam?.find?.[set.find]?.attempts||0)+(pd3.exam?.text?.[set.text]?.attempts||0);
  for(const id of [set.email,set.task])if(pd3.writing?.[id]?.done)used++;
  for(const [prefix,id] of [['mono',set.mono],['intv',set.intv],['inter',set.inter],['disc',set.disc]])if(pd3.oral?.[oralKey(prefix,id)]?.done)used++;
  for(const mock of Object.values(pd3.mocks||{}))if(mock.set===set.id)used+=2;
  return used;
}
/** The set offered first: the one the learner has used least (the first of equals). */
export function defaultSetId(sets,pd3){
  let best=null;
  for(const set of sets){const used=setUsage(set,pd3);if(!best||used<best.used)best={set,used};}
  return best?best.set.id:'';
}

/* ---------- the run ---------- */
export function newMockId(now,random=Math.random){
  return `m-${Math.floor(now).toString(36)}-${Math.floor(random()*1296).toString(36).padStart(2,'0')}`;
}
/** A fresh run in its first stage. `set` is one of mockSets(). */
export function newMock({mode,timerMode,set,now,id=newMockId(now)}){
  const mock={
    id,mode,timerMode,set:Object.fromEntries([['id',set.id],...SET_KEYS.map(key=>[key,set[key]])]),startedAt:now,
    index:0,stageStart:null,deadline:null,blockDeadline:null,pausedAt:null,pausedLeft:null,pausedMs:0,
    results:{},self:{writing:{},oral:{}},finishedAt:null,xp:0
  };
  enterStage(mock,now);
  return mock;
}
export const stageOf=mock=>buildSchedule(mock.mode)[mock.index]||null;
export const isFinished=mock=>mock.index>=buildSchedule(mock.mode).length;
/** Starts the clock of the stage at mock.index (the first stage of a block also starts the clock of the whole block), or ends the exam. */
export function enterStage(mock,now){
  const schedule=buildSchedule(mock.mode),stage=schedule[mock.index];
  mock.pausedAt=null;mock.pausedLeft=null;mock.pausedMs=0;
  if(!stage){mock.stageStart=null;mock.deadline=null;mock.blockDeadline=null;mock.finishedAt=mock.finishedAt??now;return mock;}
  if(stage.kind==='break'){mock.stageStart=null;mock.deadline=null;mock.blockDeadline=null;return mock;}
  const timed=mock.timerMode==='format',previous=schedule[mock.index-1];
  mock.stageStart=now;
  mock.deadline=timed?now+stage.minutes*MINUTE:null;
  if(!previous||previous.block!==stage.block)mock.blockDeadline=timed?now+blockMinutes(schedule,stage.block)*MINUTE:null;
  return mock;
}
export const isPaused=mock=>mock.pausedAt!=null;
/** Pauses the clock: the time left is kept, the stage is hidden by the screen. Not possible between stages or when the time is over. */
export function pauseMock(mock,now){
  if(isPaused(mock)||mock.stageStart==null||isExpired(mock,now))return false;
  mock.pausedAt=now;
  mock.pausedLeft=mock.deadline==null?null:Math.max(1,Math.ceil((mock.deadline-now)/1000));
  return true;
}
/** Continues after a pause: the stage ends `pausedLeft` seconds from now and the pause is counted out of the block clock. */
export function resumeMock(mock,now){
  if(!isPaused(mock))return false;
  const gap=Math.max(0,now-mock.pausedAt);
  if(mock.deadline!=null)mock.deadline=now+(mock.pausedLeft??0)*1000;
  if(mock.blockDeadline!=null)mock.blockDeadline+=gap;
  mock.pausedMs+=gap;mock.pausedAt=null;mock.pausedLeft=null;
  return true;
}
export const isExpired=(mock,now)=>!isPaused(mock)&&mock.deadline!=null&&now>=mock.deadline;
/** Seconds left in the stage (null without a clock). While paused it is the value kept at the pause. */
export function secondsLeft(mock,now){
  if(mock.deadline==null)return null;
  return isPaused(mock)?mock.pausedLeft:Math.max(0,Math.ceil((mock.deadline-now)/1000));
}
/** Seconds left of the whole block (the written or the oral part). */
export function blockSecondsLeft(mock,now){
  if(mock.blockDeadline==null)return null;
  const at=isPaused(mock)?mock.pausedAt:now;
  return Math.max(0,Math.ceil((mock.blockDeadline-at)/1000));
}
/** The announcement marks of a stage that lasts `seconds` (all of them shorter than the stage). */
export const marksFor=seconds=>TIMER_MARKS.filter(mark=>mark<seconds);

/* ---------- drafts and results of a stage ---------- */
const flags=(value,max)=>Array.isArray(value)?value.slice(0,max).map(Boolean):[];
const pick=(answers,pattern)=>Object.fromEntries(Object.entries(answers||{}).filter(([key,value])=>pattern.test(key)&&value!==undefined&&value!==''&&value!==null));
/** What a finished stage keeps, from the draft (the fields of the page's run object). */
export function cleanDraft(kind,draft,stage=null){
  const text=String(draft.text??'').slice(0,MOCK_TEXT_MAX);
  switch(kind){
    case 'find':return {a:pick(draft.answers,/^find:/)};
    case 'text':{
      const tasks=stage?.tasks||['t1','t2','t3'];
      return {a:pick(draft.answers,new RegExp(`^(${tasks.join('|')}):`))};
    }
    case 'email':return {text,req:flags(draft.req,12),check:flags(draft.check,20)};
    case 'task':return {text,req:flags(draft.req,12),check:flags(draft.check,20),opt:draft.option==='B'?'B':'A'};
    case 'mono':return {kw:(Array.isArray(draft.kw)?draft.kw:[]).map(word=>String(word??'').slice(0,40)).slice(0,12)};
    case 'intv':return {step:Math.max(0,Math.min(99,Number(draft.step)||0))};
    case 'inter':return {step:Math.max(0,Math.min(99,Number(draft.step)||0)),started:!!draft.started};
    default:return {};
  }
}
/** Ends the current stage with the draft: the result is fixed, the next stage starts (or the exam ends). `auto` = the time ran out. Returns the stage. */
export function finishStage(mock,draft,now,{auto=false}={}){
  const stage=stageOf(mock);
  if(!stage||stage.kind==='break')return null;
  const paused=mock.pausedMs+(isPaused(mock)?Math.max(0,now-mock.pausedAt):0);
  let sec=Math.max(0,Math.round((now-(mock.stageStart??now)-paused)/1000));
  if(mock.deadline!=null)sec=Math.min(sec,stage.minutes*60);
  mock.results[stage.id]={...cleanDraft(stage.kind,draft,stage),auto:!!auto,sec:Math.min(sec,86400)};
  mock.index++;
  enterStage(mock,now);
  return stage;
}
/** Leaves the break (the oral part starts). */
export function leaveBreak(mock,now){
  if(stageOf(mock)?.kind!=='break')return false;
  mock.index++;enterStage(mock,now);
  return true;
}

/** Whether the learner really worked on a finished stage (an empty stage, or one closed by the clock with nothing in it, does not count for XP). */
export function engaged(stage,result,data,set){
  if(!result)return false;
  if(stage.kind==='find'||stage.kind==='text')return Object.keys(result.a||{}).length>0;
  if(stage.kind==='email'||stage.kind==='task'){
    const item=list(data,SET_LISTS[stage.kind]).find(x=>x.id===set[stage.kind]);
    const words=analyzeWriting(result.text||'').words;
    return words>0&&words>=Math.ceil((item?.minWords||0)/2);
  }
  // A spoken stage has nothing to check: it counts when the learner closed it himself after spending at least half a minute on it.
  return result.auto===false&&result.sec>=30;
}

/* ---------- checking the reading ---------- */
/** Del 1: [{n,q,given,correct,ok,evidence,why}] with section ids, and the totals. */
export function scoreFind(item,answers={}){
  const rows=item.questions.map((q,i)=>{
    const given=answers[`find:${q.id}`]||'';
    return {type:'find',n:i+1,q:q.q,given,correct:q.section,ok:given===q.section,evidence:q.evidence,why:q.why||''};
  });
  const correct=rows.filter(row=>row.ok).length;
  return {correct,total:rows.length,percent:percent(correct,rows.length),rows};
}
const gapContext=(segments,at)=>{
  const before=typeof segments[at-1]==='string'?segments[at-1].slice(-70):'',after=typeof segments[at+1]==='string'?segments[at+1].slice(0,40):'';
  return `${before.replace(/\s+/g,' ').trimStart()} … ${after.replace(/\s+/g,' ').trimEnd()}`.trim();
};
/** Del 2 over the tasks in `tasks` (t1 questions, t2 paragraphs, t3 gaps): the totals, parts {t1:{correct,total}} and the rows. */
export function scoreText(item,answers={},tasks=['t1','t2','t3']){
  const parts={},rows=[];
  if(tasks.includes('t1')){
    let correct=0;
    item.text1.questions.forEach((q,i)=>{
      const given=answers[`t1:${i}`],ok=given===q.answer;
      if(ok)correct++;
      rows.push({type:'text1',n:i+1,q:q.q,given:Number.isInteger(given)?q.options[given]:'',correct:q.options[q.answer],ok,why:q.why||''});
    });
    parts.t1={correct,total:item.text1.questions.length};
  }
  if(tasks.includes('t2')){
    const gaps=item.text2.parts.filter(part=>part.gap).map(part=>part.gap);
    let correct=0;
    for(const gap of gaps){
      const given=answers[`t2:${gap}`]||'',right=item.text2.solution[gap],ok=given===right;
      if(ok)correct++;
      rows.push({type:'text2',n:gap,q:'',given,correct:right,ok,why:item.text2.why?.[gap]||'',correctText:item.text2.removed.find(r=>r.id===right)?.t||''});
    }
    parts.t2={correct,total:gaps.length};
  }
  if(tasks.includes('t3')){
    let correct=0,total=0;
    item.text3.segments.forEach((segment,at)=>{
      if(typeof segment==='string')return;
      total++;
      const given=answers[`t3:${segment.gap}`],ok=given===segment.answer;
      if(ok)correct++;
      rows.push({type:'text3',n:segment.gap,q:gapContext(item.text3.segments,at),given:Number.isInteger(given)?segment.options[given]:'',correct:segment.options[segment.answer],ok,why:''});
    });
    parts.t3={correct,total};
  }
  const correct=Object.values(parts).reduce((sum,part)=>sum+part.correct,0),total=Object.values(parts).reduce((sum,part)=>sum+part.total,0);
  return {correct,total,percent:percent(correct,total),parts,rows};
}

/* ---------- the report ---------- */
const criteriaIds=criteria=>criteria.map(c=>c.id);
/** Self-assessment share (percent of the maximum) once every axis has a mark; null before. */
export function selfPercent(self,criteria){
  const ids=criteriaIds(criteria);
  if(!ids.length||!ids.every(id=>Number.isInteger(self?.[id])&&self[id]>=1&&self[id]<=5))return null;
  return Math.round(mean(ids.map(id=>self[id]))/5*100);
}
export const selfRated=(self,criteria)=>criteriaIds(criteria).filter(id=>Number.isInteger(self?.[id])).length;

function writingText(stage,mock,data){
  const result=mock.results[stage.id];
  const item=list(data,SET_LISTS[stage.kind]).find(x=>x.id===mock.set[stage.kind]);
  if(!result||!item)return null;
  const spec=writingSpec(stage.kind,item,result.opt);
  const a=analyzeWriting(result.text,data.connectors||[],{minWords:item.minWords,maxWords:item.maxWords});
  const flagsList=[];
  if(a.words===0)flagsList.push('empty');
  else{
    if(a.level==='low')flagsList.push('short');
    if(a.level==='high')flagsList.push('long');
    if(a.connectors.length<CHECK_MIN[stage.kind])flagsList.push('connectors');
    if(a.repeatShare>=REPEAT_SHARE)flagsList.push('repeats');
  }
  return {
    kind:stage.kind,id:item.id,title:item.title,option:stage.kind==='task'?spec.key:'',text:result.text,model:spec.model,
    words:a.words,level:a.level,min:item.minWords,max:item.maxWords,sentences:a.sentences,connectors:a.connectors,repeatShare:a.repeatShare,topRepeats:a.topRepeats,
    reqs:spec.requirements.map((t,i)=>({t,ok:!!result.req?.[i]})),checks:(item.checklist||[]).map((t,i)=>({t,ok:!!result.check?.[i]})),flags:flagsList
  };
}

/**
 * Everything the report shows, from a finished run: percents by skill, the rows of the reading review, the writing texts with their
 * mechanical checks, the weak spots and the recommendations. Reading is checked by the program; writing and oral are self-assessments
 * (a percent appears once all axes are marked) and are never added to the reading figures.
 */
export function buildReport({mock,data,pd3=null}){
  const schedule=buildSchedule(mock.mode),stages=examStages(schedule);
  const find=list(data,'readingExamFind').find(x=>x.id===mock.set.find),text=list(data,'readingExamText').find(x=>x.id===mock.set.text);
  const report={mode:mock.mode,set:mock.set.id,skills:{},reading:{rows:[],byType:{}},writing:{texts:[]},oral:{axes:[],lowest:[]},weak:'',recs:[]};
  const findStage=stages.find(stage=>stage.id==='find'),textStage=stages.find(stage=>stage.id==='text');
  if(findStage&&find){
    const score=scoreFind(find,mock.results.find?.a);
    report.skills.find={percent:score.percent,correct:score.correct,total:score.total};
    report.reading.rows.push(...score.rows);report.reading.byType.find={wrong:score.total-score.correct,total:score.total};
  }
  if(textStage&&text){
    const score=scoreText(text,mock.results.text?.a,textStage.tasks);
    report.skills.text={percent:score.percent,correct:score.correct,total:score.total,parts:score.parts};
    report.reading.rows.push(...score.rows);
    for(const [key,type] of [['t1','text1'],['t2','text2'],['t3','text3']])if(score.parts[key])report.reading.byType[type]={wrong:score.parts[key].total-score.parts[key].correct,total:score.parts[key].total};
  }
  const writingStages=stages.filter(stage=>stage.kind==='email'||stage.kind==='task');
  if(writingStages.length){
    report.writing.texts=writingStages.map(stage=>writingText(stage,mock,data)).filter(Boolean);
    const criteria=list(data,'writingCriteria'),value=selfPercent(mock.self.writing,criteria);
    report.skills.writing={percent:value,rated:selfRated(mock.self.writing,criteria),of:criteria.length,self:true};
  }
  const oralStages=stages.filter(stage=>stage.block==='oral');
  if(oralStages.length){
    const criteria=list(data,'oralCriteria'),value=selfPercent(mock.self.oral,criteria);
    report.skills.oral={percent:value,rated:selfRated(mock.self.oral,criteria),of:criteria.length,self:true};
    report.oral.axes=criteria.map(c=>({id:c.id,title:c.title,score:Number.isInteger(mock.self.oral[c.id])?mock.self.oral[c.id]:null}));
    if(value!==null){
      const low=Math.min(...report.oral.axes.map(axis=>axis.score));
      report.oral.lowest=low<5?report.oral.axes.filter(axis=>axis.score===low).slice(0,3):[];
    }
  }
  const measured=Object.entries(report.skills).filter(([,skill])=>skill.percent!==null);
  report.weak=measured.length>=2?measured.reduce((low,entry)=>entry[1].percent<low[1].percent?entry:low)[0]:'';
  report.engaged=stages.filter(stage=>engaged(stage,mock.results[stage.id],data,mock.set)).length;
  report.stages=stages.length;
  report.finished=stages.filter(stage=>mock.results[stage.id]).length;
  report.minutes=Math.max(1,Math.round(Object.values(mock.results).reduce((sum,result)=>sum+(result.sec||0),0)/60));
  report.recs=recommendations({report,pd3,data});
  return report;
}

/**
 * Up to four next steps with a link into the existing sections, the most needed first: reading texts by level, writing, speaking phrases,
 * dictations about the learner's frequent mistake (only with statistics), and repeating the set. Pure rules over the report; no forecast.
 */
export function recommendations({report,pd3,data}){
  const out=[];
  const readingSkills=['find','text'].map(key=>report.skills[key]).filter(Boolean);
  const readingLow=readingSkills.length?Math.min(...readingSkills.map(skill=>skill.percent)):null;
  if(readingLow!==null&&readingLow<80){
    const level=readingLow<50?'B1':'B2';
    const texts=list(data,'readingPractice').filter(item=>item.level===level);
    const target=texts.find(item=>!pd3?.reading?.[item.id]?.attempts)||texts[0]||null;
    out.push({kind:'reading',weight:100-readingLow,level,id:target?.id||'',title:target?.title||''});
  }
  const writing=report.skills.writing;
  const writingIssues=report.writing.texts.some(text=>text.flags.length||text.reqs.some(r=>!r.ok));
  if(writing&&((writing.percent!==null&&writing.percent<80)||writingIssues))out.push({kind:'writing',weight:writing.percent!==null?100-writing.percent:40});
  const oral=report.skills.oral;
  if(oral&&oral.percent!==null&&oral.percent<80)out.push({kind:'oral',weight:100-oral.percent,axes:report.oral.lowest.map(axis=>axis.id)});
  const spot=weakSpots(pd3,data).find(entry=>entry.practice);
  if(spot)out.push({kind:'dictation',weight:30,id:spot.practice,error:spot.kind});
  out.sort((a,b)=>b.weight-a.weight);
  const result=out.slice(0,3);
  result.push({kind:'repeat',weight:0});
  return result.slice(0,4);
}

/* ---------- the compact record in state.pd3.mocks ---------- */
const skillPercent=(report,key)=>report.skills[key]?(report.skills[key].percent??null):null;
/** The record kept in the learner's progress (see validatePd3 in engine.mjs). */
export function mockRecord(mock,report,now){
  return {
    at:mock.finishedAt??now,updatedAt:now,mode:mock.mode,set:mock.set.id,
    find:skillPercent(report,'find'),text:skillPercent(report,'text'),writing:skillPercent(report,'writing'),oral:skillPercent(report,'oral'),
    weak:report.weak,minutes:report.minutes,stages:report.engaged,of:report.stages
  };
}
/** XP event of a finished exam, or null when it does not count: fewer than half of the stages worked on (an abandoned run). */
export function awardEvent(mock,report){
  if(report.engaged*2<report.stages)return null;
  return {kind:'mock',id:mock.id,percent:MOCK_XP_PERCENT[mock.mode]??50,minutes:Math.min(240,report.minutes)};
}

/* ---------- history and the plan ---------- */
/** Recent exams, newest first: [{id,...record}]. */
export function mockHistory(pd3,limit=5){
  return Object.entries(pd3?.mocks||{}).map(([id,record])=>({id,...record})).sort((a,b)=>b.at-a.at||(a.id<b.id?-1:1)).slice(0,limit);
}
/** Whether the plan should suggest a mock exam: none yet, or the last one is MOCK_STALE_DAYS days old or older. {due,reason:'never'|'stale'|'recent',days}. */
export function mockAdvice(pd3,data,now=new Date()){
  if(!canMock(data))return {due:false,reason:'none',days:null};
  const last=mockHistory(pd3,1)[0];
  if(!last)return {due:true,reason:'never',days:null};
  const days=daysSince(last.at,now);
  return {due:days>=MOCK_STALE_DAYS,reason:days>=MOCK_STALE_DAYS?'stale':'recent',days};
}

/* ---------- storing an unfinished run (pd3-run.mjs) ---------- */
/** The persisted core of a run object: the exam state and the draft of the current stage. */
export function snapshotMock(run){
  const mock=run?.mock;
  if(!mock)return null;
  const stage=stageOf(mock);
  const draft=stage&&stage.kind!=='break'?cleanDraftFull(stage,run):null;
  return {mock:structuredClone(mock),draft};
}
// The draft of a stage in the run object keeps what cleanDraft keeps, plus the position inside the stage; task/option for the tabs.
function cleanDraftFull(stage,run){
  const kind=stage.kind,base=cleanDraft(kind,run,stage);
  if(kind==='find'||kind==='text')return {a:base.a,...(kind==='text'?{task:run.task}:{})};
  return base;
}
/** Puts a validated record into a fresh run object. */
export function applyMock(run,record){
  run.mock=structuredClone(record.mock);
  const stage=stageOf(run.mock),draft=record.draft||{};
  resetDraft(run,stage?.kind,run.mock);
  if(!stage)return run;
  if(draft.a)run.answers={...draft.a};
  if(stage.kind==='text')run.task=stage.tasks.includes(draft.task)?draft.task:stage.tasks[0];
  if(draft.text!==undefined)run.text=draft.text;
  if(draft.opt)run.option=draft.opt;
  if(draft.req)run.req=[...draft.req];
  if(draft.check)run.check=[...draft.check];
  if(draft.kw)run.kw=[...draft.kw];
  if(draft.step!==undefined)run.step=draft.step;
  if(draft.started!==undefined)run.started=draft.started;
  return run;
}
/** Clears the draft fields of the run object for the stage `kind` (the first mark of the stage's own fields). */
export function resetDraft(run,kind,mock){
  run.answers={};run.task='t1';run.text='';run.option='A';run.req=[];run.check=[];run.kw=[];run.step=0;run.started=false;
  run.tab=null;run.id=null;run.key='';run.remaining=null;run.timerOn=false;run.monoPending=false;run.rec={phase:'idle',url:'',message:''};
  run.confirm=null;
  if(!kind||!mock)return run;
  const stage=stageOf(mock);
  if(kind==='text')run.task=stage.tasks[0];
  const oral={mono:'monologue',intv:'interview',inter:'interaction',disc:'discussion'}[kind];
  if(oral){run.tab=oral;run.id=mock.set[kind];}
  return run;
}
/** The keyword sheet of the monologue stage starts with the keywords of the topic. */
export function monologueKeywords(data,mock){
  const item=list(data,'oralMonologue').find(x=>x.id===mock.set.mono);
  return (item?.keywords||[]).slice(0,12);
}

/**
 * Checks a stored mock-exam run against the content and the clock; returns a clean record {v,savedAt,view,kind,id,t0,mock,draft} or null.
 * Anything unexpected (unknown set, shape, a deadline from the future, a result for a stage not reached) means "nothing to restore".
 */
export function validateMockRun(raw,{data,now}){
  try{
    const m=raw.mock;
    if(!isRecord(m)||!MOCK_MODES.includes(m.mode)||!MOCK_TIMERS.includes(m.timerMode)||typeof m.id!=='string'||!ID.test(m.id)||raw.id!==m.id)return null;
    if(!finite(raw.savedAt)||raw.savedAt>now+60000||now-raw.savedAt>MOCK_AGE[m.mode])return null;
    if(!isRecord(m.set)||typeof m.set.id!=='string'||!ID.test(m.set.id))return null;
    const set={id:m.set.id};
    for(const key of SET_KEYS){
      if(typeof m.set[key]!=='string'||!list(data,SET_LISTS[key]).some(item=>item.id===m.set[key]))return null;
      set[key]=m.set[key];
    }
    const schedule=buildSchedule(m.mode),timed=m.timerMode==='format';
    if(!finite(m.startedAt)||m.startedAt>now+60000||now-m.startedAt>30*86400000||!integer(m.index,schedule.length))return null;
    const results={};
    const before=schedule.slice(0,m.index).filter(stage=>stage.kind!=='break');
    if(!isRecord(m.results)||Object.keys(m.results).length!==before.length)return null;
    for(const stage of before){
      const result=cleanResult(stage,m.results[stage.id],data,set);
      if(!result)return null;
      results[stage.id]=result;
    }
    const clean={
      id:m.id,mode:m.mode,timerMode:m.timerMode,set,startedAt:m.startedAt,index:m.index,stageStart:null,deadline:null,blockDeadline:null,
      pausedAt:null,pausedLeft:null,pausedMs:0,results,self:{writing:{},oral:{}},finishedAt:null,xp:0
    };
    for(const [skill,criteria] of [['writing','writingCriteria'],['oral','oralCriteria']]){
      if(!isRecord(m.self)||!isRecord(m.self[skill]))return null;
      for(const [id,score] of Object.entries(m.self[skill])){
        if(!list(data,criteria).some(c=>c.id===id)||!integer(score,5)||score<1)return null;
        clean.self[skill][id]=score;
      }
    }
    const stage=schedule[m.index];
    if(!stage){
      if(!finite(m.finishedAt)||m.finishedAt>now+60000||m.finishedAt<m.startedAt||!integer(m.xp,100)||m.pausedAt!=null)return null;
      clean.finishedAt=m.finishedAt;clean.xp=m.xp;
      return {v:2,savedAt:raw.savedAt,view:'mock',kind:null,id:m.id,t0:m.startedAt,mock:clean,draft:null};
    }
    if(m.finishedAt!=null||m.xp!==0)return null;
    if(stage.kind==='break'){
      if(m.stageStart!=null||m.deadline!=null||m.blockDeadline!=null||m.pausedAt!=null||(raw.draft!=null&&Object.keys(raw.draft).length))return null;
      return {v:2,savedAt:raw.savedAt,view:'mock',kind:null,id:m.id,t0:m.startedAt,mock:clean,draft:null};
    }
    if(!finite(m.stageStart)||m.stageStart>now+60000||m.stageStart<m.startedAt-60000||!integer(m.pausedMs,86400000))return null;
    clean.stageStart=m.stageStart;clean.pausedMs=m.pausedMs;
    if(timed){
      const slack=5000+m.pausedMs;
      if(!finite(m.deadline)||m.deadline>now+stage.minutes*MINUTE+slack||m.deadline<m.stageStart)return null;
      if(!finite(m.blockDeadline)||m.blockDeadline>now+blockMinutes(schedule,stage.block)*MINUTE+slack+86400000)return null;
      clean.deadline=m.deadline;clean.blockDeadline=m.blockDeadline;
    }else if(m.deadline!=null||m.blockDeadline!=null)return null;
    if(m.pausedAt!=null){
      if(!finite(m.pausedAt)||m.pausedAt>now+60000||m.pausedAt<m.stageStart)return null;
      if(timed&&!integer(m.pausedLeft,stage.minutes*60))return null;
      if(!timed&&m.pausedLeft!=null)return null;
      clean.pausedAt=m.pausedAt;clean.pausedLeft=m.pausedLeft??null;
    }else if(m.pausedLeft!=null)return null;
    const draft=cleanStoredDraft(stage,raw.draft,data,set);
    if(draft===null)return null;
    return {v:2,savedAt:raw.savedAt,view:'mock',kind:null,id:m.id,t0:m.startedAt,mock:clean,draft};
  }catch{return null;}
}

function cleanAnswers(map,kind,item,tasks){
  if(!isRecord(map)||Object.keys(map).length>200)return null;
  const out={};
  for(const [key,value] of Object.entries(map)){
    if(kind==='find'){
      const id=key.startsWith('find:')?key.slice(5):'';
      if(!item.questions.some(q=>q.id===id)||typeof value!=='string'||!item.sections.some(s=>s.id===value))return null;
    }else{
      const match=/^(t1|t2|t3):(\d{1,3})$/.exec(key);
      if(!match||!tasks.includes(match[1]))return null;
      if(match[1]==='t1'){if(!integer(value,50)||Number(match[2])>=item.text1.questions.length)return null;}
      else if(match[1]==='t2'){if(typeof value!=='string'||!item.text2.removed.some(r=>r.id===value)||!(match[2] in item.text2.solution))return null;}
      else if(!integer(value,50)||!item.text3.segments.some(s=>typeof s!=='string'&&s.gap===Number(match[2])))return null;
    }
    out[key]=value;
  }
  return out;
}
const textOk=value=>typeof value==='string'&&value.length<=MOCK_TEXT_MAX;
const flagsOk=(value,max)=>Array.isArray(value)&&value.length<=max&&value.every(x=>typeof x==='boolean');
const kwOk=value=>Array.isArray(value)&&value.length<=12&&value.every(x=>typeof x==='string'&&x.length<=40);
function itemFor(kind,data,set){return list(data,SET_LISTS[kind]).find(x=>x.id===set[kind]);}
function writingLimits(kind,item,opt){
  const spec=writingSpec(kind,item,opt);
  return {reqs:spec.requirements.length,checks:(item.checklist||[]).length};
}
/** A stored result of a finished stage (the compact form of cleanDraft + {auto,sec}), or null. */
function cleanResult(stage,raw,data,set){
  if(!isRecord(raw)||typeof raw.auto!=='boolean'||!integer(raw.sec,86400))return null;
  const item=itemFor(stage.kind,data,set);
  if(!item)return null;
  const head={auto:raw.auto,sec:raw.sec};
  switch(stage.kind){
    case 'find':case 'text':{const a=cleanAnswers(raw.a,stage.kind,item,stage.tasks||[]);return a?{a,...head}:null;}
    case 'email':case 'task':{
      const opt=stage.kind==='task'?raw.opt:undefined;
      if(stage.kind==='task'&&opt!=='A'&&opt!=='B')return null;
      const limits=writingLimits(stage.kind,item,opt);
      if(!textOk(raw.text)||!flagsOk(raw.req,limits.reqs)||!flagsOk(raw.check,limits.checks))return null;
      return {text:raw.text,req:raw.req,check:raw.check,...(opt?{opt}:{}),...head};
    }
    case 'mono':return kwOk(raw.kw)?{kw:raw.kw,...head}:null;
    case 'intv':return integer(raw.step,item.questions.length-1)?{step:raw.step,...head}:null;
    case 'inter':return integer(raw.step,item.partner.length-1)&&typeof raw.started==='boolean'?{step:raw.step,started:raw.started,...head}:null;
    case 'disc':return head;
    default:return null;
  }
}
/** The stored draft of the current stage, in the form cleanDraftFull makes; null when invalid. */
function cleanStoredDraft(stage,raw,data,set){
  const item=itemFor(stage.kind,data,set);
  if(!item)return null;
  const draft=raw==null?{}:raw;
  if(!isRecord(draft))return null;
  switch(stage.kind){
    case 'find':case 'text':{
      const a=cleanAnswers(draft.a??{},stage.kind,item,stage.tasks||[]);
      if(!a)return null;
      if(stage.kind==='text'&&draft.task!==undefined&&!stage.tasks.includes(draft.task))return null;
      return {a,...(stage.kind==='text'?{task:draft.task??stage.tasks[0]}:{})};
    }
    case 'email':case 'task':{
      const opt=stage.kind==='task'?(draft.opt??'A'):undefined;
      if(stage.kind==='task'&&opt!=='A'&&opt!=='B')return null;
      const limits=writingLimits(stage.kind,item,opt);
      const text=draft.text??'',req=draft.req??[],check=draft.check??[];
      if(!textOk(text)||!flagsOk(req,limits.reqs)||!flagsOk(check,limits.checks))return null;
      return {text,req,check,...(opt?{opt}:{})};
    }
    case 'mono':return draft.kw===undefined?{}:kwOk(draft.kw)?{kw:draft.kw}:null;
    case 'intv':return draft.step===undefined||integer(draft.step,item.questions.length-1)?{step:draft.step??0}:null;
    case 'inter':
      if(draft.step!==undefined&&!integer(draft.step,item.partner.length-1))return null;
      if(draft.started!==undefined&&typeof draft.started!=='boolean')return null;
      return {step:draft.step??0,started:draft.started??false};
    default:return {};
  }
}
