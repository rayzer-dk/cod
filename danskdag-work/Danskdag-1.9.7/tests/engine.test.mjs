import test from 'node:test';
import assert from 'node:assert/strict';
import * as E from '../dist/engine.mjs';

test('session identifiers work without the secure-context randomUUID API', () => {
  const a=E.createSessionId({}), b=E.createSessionId({});
  assert.match(a,/^[a-zA-Z0-9_-]{1,120}$/);
  assert.notEqual(a,b);
  assert.equal(E.createSessionId({randomUUID:()=> 'known-id'}),'known-id');
});
test('accept punctuation/case but preserve Danish letters and word order', () => {
  assert.equal(E.isCorrect(' JEG drikker kaffe! ', ['Jeg drikker kaffe.']), true);
  assert.equal(E.isCorrect('Jeg bor i Danmark', ['Jeg bor i Danmark.']), true);
  assert.equal(E.isCorrect('Jeg køber brød', ['Jeg køber brød.']), true);
  assert.equal(E.isCorrect('Jeg kober brod', ['Jeg køber brød.']), false);
  assert.equal(E.isCorrect('ikke jeg kommer', ['Jeg kommer ikke.']), false);
  assert.equal(E.isCorrect('Спасибо большое', ['Большое спасибо!', 'Спасибо большое!']), true);
});
test('lesson completion is idempotent and day streak uses Copenhagen', () => {
  const start = E.createState();
  const event = {id:'session-one', lessonId:'hello', correct:5, total:6, minutes:3};
  const once = E.finishSession(start, event, new Date('2026-10-22T22:30:00Z'));
  assert.equal(once.xp, 50);
  assert.equal(once.activity['2026-10-23'].xp, 50);
  assert.equal(once.streak, 1);
  const twice = E.finishSession(once, event);
  assert.deepEqual(twice, once);
  assert.equal(start.xp,0);
});
test('validated import rejects malformed, huge and poisoned records without mutation', () => {
  assert.throws(() => E.validateState({version:1, xp:-1}));
  const s = E.createState();
  const valid = E.validateState(JSON.parse(JSON.stringify(s)));
  assert.equal(valid.xp,0);
  assert.throws(() => E.validateState({...s, xp:'100'}));
  assert.throws(() => E.validateState({...s, completed:{hello: {best:200,attempts:1}}}));
  assert.throws(() => E.validateState({...s, reviews:JSON.parse('{"__proto__":{"due":0,"box":0}}')}));
});
test('streak expires after a missed calendar day and increments on following day', () => {
  let s=E.finishSession(E.createState(), {id:'1',lessonId:'hello',correct:6,total:6,minutes:1}, new Date('2026-10-21T09:00:00Z'));
  s=E.finishSession(s, {id:'2',lessonId:'hello',correct:6,total:6,minutes:1}, new Date('2026-10-22T09:00:00Z'));
  assert.equal(s.streak,2);
  assert.equal(E.activeStreak(s,new Date('2026-10-24T09:00:00Z')),0);
});


test('new state includes independent vocabulary and accessible learning settings', () => {
  const state=E.createState();
  assert.deepEqual(state.difficult, []);
  assert.deepEqual(state.customWords, []);
  assert.deepEqual(state.settings, {level:'A1',goal:30,theme:'light',rate:0.85,mode:'easy',fontSize:18,newPerDay:6,voiceUri:'',language:'uk'});
  state.difficult.push('hello');
  assert.deepEqual(E.createState().difficult, []);
});

test('version one progress imports without losing legacy or unknown content IDs', () => {
  const old={version:1,xp:240,streak:2,lastDay:'2026-10-21',
    completed:{'legacy-lesson':{best:83,attempts:2}},
    reviews:{'legacy-phrase':{box:2,due:1792684800000,seen:4}},
    activity:{'2026-10-21':{xp:240,lessons:3,minutes:8}},
    sessions:['old-session'],bookmarks:['legacy-word'],
    settings:{level:'B1',goal:60,theme:'dark',rate:0.7}};
  const copy=structuredClone(old), restored=E.validateState(old);
  assert.deepEqual(restored, {...old,difficult:[],customWords:[],settings:{...old.settings,mode:'easy',fontSize:18,newPerDay:6,voiceUri:'',language:'uk'}});
  assert.deepEqual(old,copy);
  restored.bookmarks.push('another');
  assert.deepEqual(old.bookmarks,['legacy-word']);
});

test('advanced levels, difficulty modes, font sizes and custom words survive import', () => {
  for (const [level,mode,fontSize] of [['B2','mixed',16],['C1','expert',20],['A2','easy',18]]) {
    const state=E.createState();
    state.settings={...state.settings,level,mode,fontSize};
    state.difficult=['word-unknown','word-unknown','another-word'];
    state.customWords=[{id:'u-my-word',da:'at tage højde for',ru:'учитывать',note:'Выражение',association:'взять высоту'}];
    const restored=E.validateState(state);
    assert.deepEqual(restored.settings,state.settings);
    assert.deepEqual(restored.difficult,['word-unknown','another-word']);
    assert.deepEqual(restored.customWords,state.customWords);
    assert.notEqual(restored.customWords[0],state.customWords[0]);
  }
});

test('unknown setting values fall back to defaults instead of rejecting the whole progress', () => {
  const state=E.createState();
  for (const [key,value] of [['level','C2'],['mode','hard'],['mode',null],['fontSize','20'],['fontSize',24],['fontSize',Infinity],['theme','sepia'],['goal',120],['rate',2],['newPerDay',99],['language','de'],['voiceUri',42]]) {
    const restored=E.validateState({...state,xp:77,settings:{...state.settings,[key]:value}});
    assert.equal(restored.xp,77,`${key}: ${value}`);
    assert.deepEqual(restored.settings,state.settings,`${key}: ${value}`);
  }
  assert.equal(E.validateState({...state,settings:{...state.settings,name:'x'.repeat(41)}}).settings.name,undefined);
  for (const key of ['difficult','customWords']) {
    for (const value of [null,{},'word',42]) assert.throws(()=>E.validateState({...state,[key]:value}));
  }
  assert.throws(()=>E.validateState({...state,settings:null}));
  assert.throws(()=>E.validateState({...state,version:2}));
  for (const field of ['mode','fontSize']) {
    const legacy=structuredClone(state);delete legacy.settings[field];
    assert.deepEqual(E.validateState(legacy).settings,state.settings);
  }
});

test('fields from a newer app version are carried along instead of being erased', () => {
  const state={...E.createState(),xp:5,futureFlag:{mode:'x',list:[1,2,3]}};
  state.settings={...state.settings,reducedMotion:true};
  const once=E.validateState(state);
  assert.deepEqual(once._unknown,{futureFlag:{mode:'x',list:[1,2,3]}});
  assert.deepEqual(once.settings._unknown,{reducedMotion:true});
  assert.deepEqual(E.validateState(JSON.parse(JSON.stringify(once))),once);
  assert.equal(E.validateState(E.createState())._unknown,undefined);
  assert.equal(Object.hasOwn(E.validateState(E.createState()).settings,'_unknown'),false);
  const oversized=E.validateState({...E.createState(),huge:'x'.repeat(70000)});
  assert.equal(oversized._unknown,undefined);
  assert.equal({}.futureFlag,undefined);
});

test('custom vocabulary accepts text limits and rejects oversized or malformed entries', () => {
  const state=E.createState();
  const word={id:'u-one',da:'æ'.repeat(220),ru:'я'.repeat(300),note:'n'.repeat(500),association:'a'.repeat(500)};
  assert.deepEqual(E.validateState({...state,customWords:[word]}).customWords,[word]);
  for (const [field,limit] of [['da',220],['ru',300],['note',500],['association',500]]) {
    assert.throws(()=>E.validateState({...state,customWords:[{...word,[field]:'x'.repeat(limit+1)}]}),field);
    assert.throws(()=>E.validateState({...state,customWords:[{...word,[field]:42}]}),field);
  }
  for (const field of ['da','ru']) assert.throws(()=>E.validateState({...state,customWords:[{...word,[field]:'  '}]}));
  for (const id of ['', 'hello','u-', '__proto__','u-bad id',`u-${'x'.repeat(119)}`]) {
    assert.throws(()=>E.validateState({...state,customWords:[{...word,id}]}),id);
  }
  assert.throws(()=>E.validateState({...state,customWords:[word,word]}));
  assert.throws(()=>E.validateState({...state,customWords:[{...word,note:undefined}]}));
  const thousand=Array.from({length:1000},(_,i)=>({...word,id:`u-${i}`}));
  assert.equal(E.validateState({...state,customWords:thousand}).customWords.length,1000);
  assert.throws(()=>E.validateState({...state,customWords:[...thousand,{...word,id:'u-last'}]}));
});

test('import rejects poisoned objects, unsafe IDs, sparse arrays and oversized values', () => {
  const state=E.createState();
  for (const key of ['sessions','bookmarks','difficult']) {
    assert.throws(()=>E.validateState({...state,[key]:['__proto__']}));
    assert.throws(()=>E.validateState({...state,[key]:['bad id']}));
    assert.throws(()=>E.validateState({...state,[key]:Array(1)}));
    assert.throws(()=>E.validateState({...state,[key]:Array(10001).fill('safe')}));
  }
  assert.throws(()=>E.validateState({...state,customWords:Array(1)}));
  assert.throws(()=>E.validateState({...state,xp:Infinity}));
  assert.throws(()=>E.validateState({...state,xp:1000000001}));
  assert.throws(()=>E.validateState({...state,completed:JSON.parse('{"constructor":{"best":1,"attempts":1}}')}));
  assert.throws(()=>E.validateState({...state,settings:JSON.parse('{"level":"A1","goal":30,"theme":"light","rate":0.85,"__proto__":{}}')}));
  assert.throws(()=>E.validateState(Object.assign(Object.create({polluted:true}),state)));
  assert.throws(()=>E.validateState({...state,customWords:[Object.assign(Object.create({polluted:true}),{id:'u-word',da:'ord',ru:'слово',note:'',association:''})]}));
  assert.equal({}.polluted,undefined);
});

test('review sessions award activity without completing a course lesson', () => {
  const state=E.createState();
  const event={id:'review-one',correct:4,total:5,minutes:2};
  const result=E.finishSession(state,event,new Date('2026-10-22T09:00:00Z'));
  assert.equal(result.xp,40);
  assert.deepEqual(result.completed,{});
  assert.deepEqual(result.activity['2026-10-22'],{xp:40,lessons:1,minutes:2});
  assert.equal(E.finishSession(result,event),result);
});

test('session events reject invalid bounds and unsafe identifiers before mutation', () => {
  const state=E.createState(), event={id:'valid-event',correct:4,total:5,minutes:2};
  for (const [key,value] of [
    ['total',0],['total',101],['total',NaN],['total',Infinity],['total',1.5],['total','5'],
    ['correct',-1],['correct',6],['correct',NaN],['correct',Infinity],['correct',0.5],['correct','4'],
    ['minutes',-1],['minutes',Infinity],['minutes',NaN],['minutes',1441],['minutes','2'],
    ['id',''],['id','__proto__'],['id','bad id'],['lessonId','__proto__'],['lessonId','']
  ]) assert.throws(()=>E.finishSession(state,{...event,[key]:value}),`${key}: ${value}`);
  for (const value of [null,undefined,[],{}]) assert.throws(()=>E.finishSession(state,value));
  assert.throws(()=>E.finishSession(state,event,new Date(NaN)));
  assert.equal(state.xp,0);
  assert.deepEqual(state.sessions,[]);
  assert.equal({}.best,undefined);
  const zero=E.finishSession(state,{...event,correct:0,total:1,minutes:0});
  assert.equal(zero.xp,0);
  const hundred=E.finishSession(state,{...event,correct:100,total:100});
  assert.equal(hundred.xp,1000);
});

test('learner levels use predictable milestones and scale beyond the initial eight', () => {
  assert.equal(typeof E.getLearnerLevel,'function');
  for (const [xp,level,into,next,progress] of [
    [0,1,0,100,0],[50,1,50,100,0.5],[100,2,0,200,0],[299,2,199,200,0.995],
    [300,3,0,300,0],[600,4,0,400,0],[1000,5,0,600,0],[1600,6,0,900,0],
    [2500,7,0,1500,0],[4000,8,0,2000,0],[5000,8,1000,2000,0.5],
    [6000,9,0,3000,0],[9000,10,0,4500,0],[13500,11,0,6750,0]
  ]) {
    const result=E.getLearnerLevel(xp);
    assert.deepEqual({level:result.level,into:result.into,next:result.next,progress:result.progress},{level,into,next,progress});
    assert.equal(typeof result.name,'string');assert.ok(result.name.trim());
  }
});

test('achievements begin locked and derive progress from actual completed work', () => {
  assert.equal(typeof E.getAchievements,'function');
  const locked=E.getAchievements(E.createState());
  assert.equal(locked.length,8);
  assert.equal(new Set(locked.map(a=>a.id)).size,8);
  for (const award of locked) {
    assert.equal(award.earned,false);assert.equal(award.progress,0);
    assert.ok(award.target>0);
    for (const key of ['title','description','icon']) assert.equal(typeof award[key],'string');
  }
  const state=E.createState();
  state.xp=80;state.streak=2;
  state.completed={'g-one':{best:80,attempts:1},'hello':{best:90,attempts:2}};
  state.reviews=Object.fromEntries(Array.from({length:7},(_,i)=>[`p-${i}`,{box:0,due:0,seen:1}]));
  state.bookmarks=['one','two','three'];state.difficult=['two','four'];
  const byId=Object.fromEntries(E.getAchievements(state).map(a=>[a.id,a]));
  assert.equal(byId['first-lesson'].earned,true);
  assert.equal(byId['five-lessons'].progress,2);
  assert.equal(byId['perfect-lesson'].earned,false);
  assert.equal(byId['streak-3'].progress,2);
  assert.equal(byId['learned-10'].progress,7);
  assert.equal(byId['xp-100'].progress,80);
  assert.equal(byId['saved-5'].progress,4);
  assert.equal(byId['grammar-3'].progress,1);
});

test('all achievement criteria unlock from evidence and keep a historical three-day streak', () => {
  const state=E.createState();
  state.xp=100;
  state.completed=Object.fromEntries(['hello','travel','g-one','g-two','g-three'].map(id=>[id,{best:100,attempts:1}]));
  state.reviews=Object.fromEntries(Array.from({length:10},(_,i)=>[`p-${i}`,{box:1,due:0,seen:1}]));
  state.bookmarks=['one','two','three'];state.difficult=['four','five'];
  state.activity={'2026-10-20':{xp:10,lessons:1,minutes:1},'2026-10-21':{xp:20,lessons:1,minutes:1},'2026-10-22':{xp:30,lessons:1,minutes:1}};
  assert.ok(E.getAchievements(state).every(a=>a.earned&&a.progress===a.target));
  state.streak=1;
  assert.equal(E.getAchievements(state).find(a=>a.id==='streak-3').earned,true);
  state.completed={fake:{best:100,attempts:0}};
  const awards=E.getAchievements(state);
  assert.equal(awards.find(a=>a.id==='first-lesson').earned,false);
  assert.equal(awards.find(a=>a.id==='perfect-lesson').earned,false);
});

test('answer comparison is locale independent and ignores invisible characters', () => {
  assert.equal(E.normalize('KAFFE'),'kaffe');
  assert.equal(E.normalize('I'),'i');
  const original=String.prototype.toLocaleLowerCase;
  String.prototype.toLocaleLowerCase=function(){return original.call(this,'tr');};
  try{assert.equal(E.normalize('KAFFE I Island'),'kaffe i island');}finally{String.prototype.toLocaleLowerCase=original;}
  assert.equal(E.isCorrect('jeg\u200b bor\u00ad i\ufeff Dan\u200cmark\u200d',['Jeg bor i Danmark']),true);
  assert.equal(E.isCorrect('jeg\u00a0bor\u202fher',['Jeg bor her']),true);
  assert.equal(E.normalize('Blå\u2060bær'),'blåbær');
  assert.equal(E.isCorrect('blaabaer',['blåbær']),false);
  assert.equal(E.isCorrect('Aa',['Å']),false);
  assert.equal(E.isCorrect('a\u030a',['å']),true);
  assert.equal(E.isCorrect('Jeg kober brod',['Jeg køber brød']),false);
});

test('day keys are shared-formatter Copenhagen dates and survive missing time zone data', async () => {
  assert.equal(E.dayKey(new Date('2026-10-22T22:30:00Z')),'2026-10-23');
  assert.equal(E.dayKey(new Date('2026-01-15T23:30:00Z')),'2026-01-16');
  assert.throws(()=>E.dayKey(new Date(NaN)),RangeError);
  const source=(await import('node:fs')).readFileSync(new URL('../dist/engine.mjs',import.meta.url),'utf8');
  const RealFormat=Intl.DateTimeFormat;
  Intl.DateTimeFormat=function(locale,options){if(options?.timeZone)throw new RangeError('Invalid time zone');return new RealFormat(locale,options);};
  try{
    const fallback=await import('data:text/javascript;base64,'+Buffer.from(source).toString('base64'));
    for (const [iso,key] of [['2026-10-22T22:30:00Z','2026-10-23'],['2026-01-15T23:30:00Z','2026-01-16'],['2026-03-29T00:59:59Z','2026-03-29'],['2026-03-29T01:00:00Z','2026-03-29'],
      ['2026-07-01T21:59:00Z','2026-07-01'],['2026-07-01T22:00:00Z','2026-07-02'],['2026-10-25T00:30:00Z','2026-10-25'],['2026-10-25T01:00:00Z','2026-10-25'],['2026-10-25T22:59:00Z','2026-10-25'],['2026-10-25T23:00:00Z','2026-10-26']]) {
      assert.equal(fallback.dayKey(new Date(iso)),new RealFormat('en-CA',{timeZone:'Europe/Copenhagen'}).format(new Date(iso)),iso);
      assert.equal(fallback.dayKey(new Date(iso)),key,iso);
    }
    assert.throws(()=>fallback.dayKey(new Date(NaN)),RangeError);
  }finally{Intl.DateTimeFormat=RealFormat;}
});

test('L2: bidi marks and other invisible characters do not reject a right answer', () => {
  for (const c of ['‎','‏','‪','‫','‬','‭','‮','⁦','⁧','⁨','⁩','​','­','﻿','؜']) {
    assert.equal(E.normalize(`${c}hu${c}nd${c}`),'hund','U+'+c.codePointAt(0).toString(16));
    assert.equal(E.isCorrect(`en${c} hund`,['en hund']),true);
  }
  assert.equal(E.stripInvisible('a‏b‮c'),'abc');
  // Real spaces and the Danish letters are untouched, and "aa" is still not "å".
  assert.equal(E.normalize('Blå bær'),'blå bær');
  assert.notEqual(E.normalize('aa'),E.normalize('å'));
  assert.equal(E.isCorrect('blaa',['blå']),false);
});

test('engine.mjs stays free of imports', async () => {
  const {readFile}=await import('node:fs/promises');
  const source=await readFile(new URL('../dist/engine.mjs',import.meta.url),'utf8');
  assert.equal(/^\s*import[\s{*'"]/m.test(source),false);
});
