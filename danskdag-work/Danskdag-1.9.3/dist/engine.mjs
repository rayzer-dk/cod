export const DAY = 86400000;
const FORBIDDEN_KEYS = new Set(['__proto__','constructor','prototype']);
const numberWithin = (value,max=1000000000) => typeof value==='number' && Number.isFinite(value) && value>=0 && value<=max;
const integerWithin = (value,max) => numberWithin(value,max) && Number.isInteger(value);
const safeId = value => typeof value==='string' && /^[a-zA-Z0-9_-]{1,120}$/.test(value) && !FORBIDDEN_KEYS.has(value);
const record = value => {
  if (!value || typeof value!=='object' || Array.isArray(value)) return false;
  const prototype=Object.getPrototypeOf(value), keys=Object.keys(value);
  return (prototype===Object.prototype || prototype===null) && keys.length<=10000 && keys.every(key=>!FORBIDDEN_KEYS.has(key));
};
let sessionCounter=0;
export function createSessionId(source=globalThis.crypto) {
  return source?.randomUUID?.() || `s-${Date.now().toString(36)}-${(++sessionCounter).toString(36)}-${Math.random().toString(36).slice(2,12)}`;
}
// Intl formatters are expensive to construct, so one instance serves every call.
let copenhagenFormat=null;
try{copenhagenFormat=new Intl.DateTimeFormat('en-CA',{timeZone:'Europe/Copenhagen',year:'numeric',month:'2-digit',day:'2-digit'});}catch{ /* Time zone data may be absent. */ }
const lastSundayUtc=(year,month)=>{const last=new Date(Date.UTC(year,month+1,0,1));return Date.UTC(year,month,last.getUTCDate()-last.getUTCDay(),1);};
// UTC+1, or UTC+2 from 01:00 UTC on the last Sunday of March until the last Sunday of October.
function copenhagenFallbackKey(date){
  const time=date.getTime(),year=date.getUTCFullYear();
  const offset=time>=lastSundayUtc(year,2)&&time<lastSundayUtc(year,9)?2:1;
  return new Date(time+offset*3600000).toISOString().slice(0,10);
}
export function dayKey(date = new Date()) {
  if(copenhagenFormat){
    const parts=copenhagenFormat.formatToParts(date);
    return ['year','month','day'].map(k => parts.find(p => p.type === k).value).join('-');
  }
  if(!Number.isFinite(date?.getTime?.()))throw new RangeError('Invalid time value');
  return copenhagenFallbackKey(date);
}
// Invisible formatting characters that are never part of a typed word: soft hyphen, zero-width characters, LRM/RLM, the bidi
// embedding/override/isolate controls (U+202A-202E, U+2066-2069), the word joiner, Arabic letter mark and the BOM.
// Pasted or keyboard-inserted text carries them; they must neither reject a right answer nor split a word.
export const INVISIBLE_CHARACTERS=/[\u00ad\u061c\u200b-\u200f\u202a-\u202e\u2060\u2066-\u2069\ufeff]/g;
export const stripInvisible=value=>String(value??'').replace(INVISIBLE_CHARACTERS,'');
// Locale-independent folding. Danish letters stay distinct: "aa" is never treated as "å".
export function normalize(value) {
  return stripInvisible(String(value).normalize('NFC').toLowerCase().normalize('NFC')).replace(/[\u00a0\u2007\u202f]/g,' ').replace(/ё/g,'е').replace(/[’‘ʼ`]/g,"'").replace(/[‐‑–—]/g,'-').replace(/[.,!?;:"“”«»„…]/g,'').replace(/\s+/g,' ').trim();
}
export const isCorrect = (value, answers) => answers.some(answer => normalize(value) === normalize(answer));
export function createState() {
  return {version:1,xp:0,streak:0,lastDay:null,completed:{},reviews:{},activity:{},sessions:[],bookmarks:[],difficult:[],customWords:[],settings:{level:'A1',goal:30,theme:'light',rate:0.85,mode:'easy',fontSize:18,newPerDay:6,voiceUri:'',language:'uk'}};
}
const dayDistance = (a,b) => (Date.parse(a) - Date.parse(b))/DAY;
export function activeStreak(state, now = new Date()) {
  return state.lastDay && dayDistance(dayKey(now),state.lastDay) <= 1 ? state.streak : 0;
}
function advanceStreak(result, state, today) {
  if (state.lastDay !== today) result.streak = state.lastDay && dayDistance(today,state.lastDay) === 1 ? state.streak + 1 : 1;
  result.lastDay = today;
}
export function finishSession(state, event, now = new Date()) {
  if (!record(event) || !safeId(event.id) || !integerWithin(event.total,100) || event.total<1 ||
      !integerWithin(event.correct,event.total) || !numberWithin(event.minutes,1440) ||
      (event.lessonId!==undefined && event.lessonId!==null && !safeId(event.lessonId)) ||
      !(now instanceof Date) || !Number.isFinite(now.getTime())) {
    throw new Error('Некорректные данные учебной сессии.');
  }
  if (state.sessions.includes(event.id)) return state;
  const result = structuredClone(state), today = dayKey(now), xp = event.correct*10;
  result.xp += xp;
  advanceStreak(result,state,today);
  result.sessions = [...result.sessions,event.id].slice(-10000);
  result.activity[today] = {xp:(result.activity[today]?.xp || 0)+xp,lessons:(result.activity[today]?.lessons || 0)+1,minutes:(result.activity[today]?.minutes || 0)+event.minutes};
  if (event.lessonId) {
    const old=result.completed[event.lessonId];
    result.completed[event.lessonId]={best:Math.max(old?.best || 0,Math.round(event.correct/event.total*100)),attempts:(old?.attempts || 0)+1};
  }
  return result;
}
// XP for finished PD3 activities. Each activity is worth at most this much in total (a share of it per percent of the best result),
// nothing below PD3_MIN_PERCENT, and no more than PD3_DAY_XP a day from PD3 altogether.
export const PD3_XP = {reading:10,listening:10,dictation:12,'exam-find':20,'exam-text':25,writing:15,oral:8,mock:30};
export const PD3_MIN_PERCENT = 30, PD3_DAY_XP = 60;
/** Counts a finished PD3 activity: {kind,id,percent,minutes}. The result must already be stored in state.pd3 by the caller.
 * XP is paid for the first completion and for an improved best result only (state.pd3.xp remembers the percent already paid),
 * so repeating or reopening an activity gives nothing. Any counted completion also keeps the streak and the day's activity.
 * Returns {state,xp,counted,first}; an unfinished, empty or invalid attempt returns the same state with counted=false. */
export function awardPd3(state, event, now = new Date()) {
  const none = {state,xp:0,counted:false,first:false};
  if (!record(event) || !Object.hasOwn(PD3_XP,event.kind) || !/^[a-z0-9-]{1,60}$/.test(event.id) || !integerWithin(event.percent,100) ||
      !(now instanceof Date) || !Number.isFinite(now.getTime()) || event.percent < PD3_MIN_PERCENT) return none;
  const result = structuredClone(state), today = dayKey(now), key = `${event.kind}:${event.id}`;
  const pd3 = result.pd3 || (result.pd3 = emptyPd3()), ledger = pd3.xp;
  if (ledger.day !== today) {ledger.day = today;ledger.today = 0;}
  const worth = percent => Math.round(PD3_XP[event.kind]*percent/100), before = ledger.items[key] || 0, room = Math.max(0,PD3_DAY_XP-ledger.today);
  let reached = Math.max(before,event.percent);
  while (reached > before && worth(reached)-worth(before) > room) reached--;
  const xp = worth(reached)-worth(before), minutes = numberWithin(event.minutes,1440) ? event.minutes : 1;
  // The record moves only with paid XP, so a gain too small to pay (or a day limit) is not lost: it is paid with the next improvement.
  if (xp > 0) ledger.items[key] = reached;
  ledger.today += xp;
  result.xp += xp;
  advanceStreak(result,state,today);
  const day = result.activity[today];
  // A repeat that pays nothing keeps the streak but does not add another "lesson" to the day.
  if (xp > 0 || !day?.lessons) result.activity[today] = {xp:(day?.xp || 0)+xp,lessons:(day?.lessons || 0)+1,minutes:(day?.minutes || 0)+minutes};
  pd3.updatedAt = Math.max(pd3.updatedAt,now.getTime());
  return {state:result,xp,counted:true,first:before === 0};
}
export function getLearnerLevel(xp) {
  const value=typeof xp==='number' && Number.isFinite(xp) ? Math.max(0,xp) : 0;
  const milestones=[0,100,300,600,1000,1600,2500,4000];
  const names=['Первые шаги','Исследователь','Ученик','Практик','Знаток','Искатель знаний','Наставник','Мастер практики'];
  let index=0;
  while (index<milestones.length-1 && value>=milestones[index+1]) index++;
  let start=milestones[index], next=milestones[index+1]-start;
  if (index===milestones.length-1) {
    next=2000;
    while (value>=start+next) {
      start+=next;
      next=Math.round(next*1.5);
      index++;
    }
  }
  const into=value-start;
  return {level:index+1,name:names[index] || `Мастер практики ${index-6}`,into,next,progress:into/next};
}
export function getAchievements(state) {
  const completed=Object.entries(state.completed || {}).filter(([,lesson])=>lesson.attempts>0);
  const saved=new Set([...(state.bookmarks || []),...(state.difficult || [])]).size;
  let longest=state.streak || 0, streak=0, previous=null;
  for (const day of Object.keys(state.activity || {}).filter(day=>state.activity[day].lessons>0).sort()) {
    streak=previous && dayDistance(day,previous)===1 ? streak+1 : 1;
    longest=Math.max(longest,streak);
    previous=day;
  }
  const awards=[
    ['first-lesson','Первый урок','Завершить первый урок.','🌱',completed.length,1],
    ['five-lessons','Пять уроков','Завершить пять разных уроков.','📚',completed.length,5],
    ['perfect-lesson','Без ошибок','Завершить урок с результатом 100%.','🎯',completed.some(([,lesson])=>lesson.best===100)?1:0,1],
    ['streak-3','Три дня подряд','Заниматься три календарных дня подряд.','🔥',longest,3],
    ['learned-10','Первые десять','Потренировать десять разных слов или фраз.','🧠',Object.keys(state.reviews || {}).length,10],
    ['xp-100','Сто очков','Заработать 100 XP за правильные ответы.','⭐',state.xp || 0,100],
    ['saved-5','Личный словарь','Сохранить пять разных слов в избранном или сложных.','🔖',saved,5],
    ['grammar-3','Грамматика в деле','Завершить три разных урока грамматики.','🧩',completed.filter(([id])=>id.startsWith('g-')).length,3]
  ];
  return awards.map(([id,title,description,icon,progress,target])=>({id,title,description,icon,earned:progress>=target,progress:Math.min(progress,target),target}));
}
// ---- PD3 data inside the progress (state.pd3) --------------------------------------------------------------
// The schema lives here so that the Worker, which bundles only this file, validates the same data as the app. pd3-store.mjs re-exports it.
export const PD3_VERSION=1;
export const PD3_LIMITS={draft:12000,items:300,bytes:900000,importBytes:1500000,keywords:12,keyword:40,state:262144,xpItems:600,mocks:20};
/** Error kinds counted in the dictation statistics (the same list as ERROR_KINDS in pd3-diff.mjs). */
export const PD3_STAT_KINDS=['aeoa','double','silent','ending','case','other','punctuation','missing','extra','order'];
/** Fields of `state.pd3` that validatePd3 knows; anything else a newer version wrote is carried in `_unknown` by engine.mjs. */
export const PD3_KEYS=new Set(['version','updatedAt','settings','reading','listening','dictation','exam','writing','oral','plan','stats','xp','mocks','spell','_unknown']);
const PD3_ID=/^[a-z0-9-]{1,60}$/;
const PD3_SCORE_MAPS=['reading','listening','dictation'];
const PD3_RATES=[0.6,0.75,0.9,1];

const pd3Object=value=>value!==null&&typeof value==='object'&&!Array.isArray(value);
const pd3Int=(value,min,max,fallback=0)=>Number.isFinite(Number(value))?Math.min(max,Math.max(min,Math.round(Number(value)))):fallback;
const pd3Stamp=value=>pd3Int(value,0,8.64e15,0);
const pd3Pct=value=>pd3Int(value,0,100,0);
const pd3Text=(value,max)=>typeof value==='string'?value.slice(0,max):'';

export function emptyPd3(){
  return {
    version:PD3_VERSION,updatedAt:0,
    settings:{
      reader:{rate:0.9,follow:true,translation:false,calibration:1},
      dictation:{rate:0.9,limit:0,strict:false},
      exam:{timer:true},
      writing:{timer:false,minutes:45}
    },
    reading:{},listening:{},dictation:{},
    exam:{find:{},text:{}},
    writing:{},oral:{},
    plan:{examDate:''},
    stats:{dictation:{runs:0,errors:{}}},
    xp:{items:{},day:'',today:0}
  };
}
const PD3_XP_KEY=/^[a-z]+(?:-[a-z]+)?:[a-z0-9-]{1,60}$/;
const PD3_DAY_KEY=/^\d{4}-\d{2}-\d{2}$/;
const pd3ValidDay=value=>typeof value==='string'&&PD3_DAY_KEY.test(value)&&Number.isFinite(Date.parse(value))&&new Date(value).toISOString().startsWith(value);
function pd3CleanStats(value){
  const dictation=pd3Object(value)&&pd3Object(value.dictation)?value.dictation:{},errors={};
  if(pd3Object(dictation.errors))for(const kind of PD3_STAT_KINDS){
    const count=pd3Int(dictation.errors[kind],0,1000000,0);
    if(count)errors[kind]=count;
  }
  return {dictation:{runs:pd3Int(dictation.runs,0,1000000,0),errors}};
}
function pd3CleanXp(value){
  const source=pd3Object(value)?value:{},items={};
  if(pd3Object(source.items))for(const [key,percent] of Object.entries(source.items).slice(0,PD3_LIMITS.xpItems)){
    if(PD3_XP_KEY.test(key)&&Number.isFinite(Number(percent)))items[key]=pd3Pct(percent);
  }
  const day=pd3ValidDay(source.day)?source.day:'';
  return {items,day,today:day?pd3Int(source.today,0,100000,0):0};
}

/** Limits of the dictation sentences kept in spaced repetition (state.pd3.spell). */
export const PD3_SPELL={max:200,words:5,wordLength:40};
/** Dictation sentences with mistakes that were put into spaced repetition: [{id,dictId,idx,words,count,lastAt}], newest first,
 * at most PD3_SPELL.max. `id` is always `spell-<dictId>-<idx>` (the key of the card in state.reviews); `words` are the words written wrongly.
 * Records with the same id are combined: larger count, newest time, union of the words (newest record first). */
export function pd3CleanSpell(value){
  if(!Array.isArray(value))return [];
  const byId=new Map();
  for(const raw of value.slice(0,PD3_SPELL.max*4)){
    if(!pd3Object(raw)||typeof raw.dictId!=='string'||!PD3_ID.test(raw.dictId)||!Number.isInteger(raw.idx)||raw.idx<0||raw.idx>999)continue;
    const id=`spell-${raw.dictId}-${raw.idx}`;
    if(id.length>120)continue;
    const words=[];
    if(Array.isArray(raw.words))for(const word of raw.words){
      const text=typeof word==='string'?word.trim().slice(0,PD3_SPELL.wordLength):'';
      if(text&&!words.includes(text))words.push(text);
    }
    const entry={id,dictId:raw.dictId,idx:raw.idx,words:words.slice(0,PD3_SPELL.words),count:pd3Int(raw.count,1,1000000,1),lastAt:pd3Stamp(raw.lastAt)};
    const old=byId.get(id);
    if(!old){byId.set(id,entry);continue;}
    const [first,second]=entry.lastAt>=old.lastAt?[entry,old]:[old,entry];
    byId.set(id,{...first,words:[...new Set([...first.words,...second.words])].slice(0,PD3_SPELL.words),count:Math.max(first.count,second.count),lastAt:first.lastAt});
  }
  return [...byId.values()].sort((a,b)=>b.lastAt-a.lastAt||(a.id<b.id?-1:a.id>b.id?1:0)).slice(0,PD3_SPELL.max);
}

/** Mock exams (state.pd3.mocks, at most PD3_LIMITS.mocks, newest kept): {at,updatedAt,mode,set,find,text,writing,oral,weak,minutes,stages,of}.
 * find/text are percents checked by the program, writing/oral percents of the learner's self-assessment; null = not measured. */
const PD3_MOCK_WEAK=['','find','text','writing','oral'];
const pd3OptPct=value=>value===null||value===undefined||value===''||!Number.isFinite(Number(value))?null:pd3Pct(value);
function pd3CleanMock(value){
  if(!pd3Object(value)||!['full','short'].includes(value.mode)||typeof value.set!=='string'||!PD3_ID.test(value.set))return null;
  const at=pd3Stamp(value.at);
  return {
    at,updatedAt:pd3Stamp(value.updatedAt)||at,mode:value.mode,set:value.set,
    find:pd3OptPct(value.find),text:pd3OptPct(value.text),writing:pd3OptPct(value.writing),oral:pd3OptPct(value.oral),
    weak:PD3_MOCK_WEAK.includes(value.weak)?value.weak:'',minutes:pd3Int(value.minutes,0,1440),stages:pd3Int(value.stages,0,12),of:pd3Int(value.of,0,12)
  };
}
/** The newest PD3_LIMITS.mocks records of an id-keyed map (used when cleaning and after merging two copies). */
export function capPd3Mocks(map){
  const result={};
  for(const [id,entry] of Object.entries(map||{}).sort((a,b)=>b[1].at-a[1].at||(a[0]<b[0]?-1:1)).slice(0,PD3_LIMITS.mocks))result[id]=entry;
  return result;
}
function pd3CleanMocks(source){
  const result={};
  if(!pd3Object(source))return result;
  for(const [id,value] of Object.entries(source).slice(0,PD3_LIMITS.mocks*4)){
    if(!PD3_ID.test(id))continue;
    const entry=pd3CleanMock(value);
    if(entry)result[id]=entry;
  }
  return capPd3Mocks(result);
}

function pd3CleanScore(value){
  if(!pd3Object(value))return null;
  const entry={best:pd3Pct(value.best),last:pd3Pct(value.last),attempts:pd3Int(value.attempts,0,100000),at:pd3Stamp(value.at)};
  if(Array.isArray(value.parts))entry.parts=value.parts.slice(0,6).map(pd3Pct);
  return entry;
}
function pd3CleanMap(source,cleaner){
  const result={};
  if(!pd3Object(source))return result;
  for(const [id,value] of Object.entries(source).slice(0,PD3_LIMITS.items)){
    if(!PD3_ID.test(id))continue;
    const entry=cleaner(value);
    if(entry)result[id]=entry;
  }
  return result;
}
const pd3Flags=(value,max)=>Array.isArray(value)?value.slice(0,max).map(Boolean):[];
function pd3CleanSelf(value){
  const result={};
  if(pd3Object(value))for(const [id,score] of Object.entries(value).slice(0,12)){
    if(PD3_ID.test(id)&&Number.isFinite(Number(score)))result[id]=pd3Int(score,1,5,3);
  }
  return result;
}
function pd3CleanWriting(value){
  if(!pd3Object(value))return null;
  return {
    draft:pd3Text(value.draft,PD3_LIMITS.draft),option:value.option==='B'?'B':'A',updatedAt:pd3Stamp(value.updatedAt),
    done:!!value.done,req:pd3Flags(value.req,12),check:pd3Flags(value.check,20),self:pd3CleanSelf(value.self)
  };
}
function pd3CleanOral(value){
  if(!pd3Object(value))return null;
  const keywords=Array.isArray(value.keywords)?value.keywords.map(word=>pd3Text(word,PD3_LIMITS.keyword).trim()).filter(Boolean).slice(0,PD3_LIMITS.keywords):[];
  return {keywords,self:pd3CleanSelf(value.self),done:!!value.done,updatedAt:pd3Stamp(value.updatedAt)};
}

/** Returns a clean copy of stored or imported data; throws when it is not PD3 data of a known version. */
export function validatePd3(raw){
  if(!pd3Object(raw))throw new Error('Not PD3 data');
  if(raw.version!==PD3_VERSION)throw new Error('Unknown PD3 data version');
  const base=emptyPd3(),s=pd3Object(raw.settings)?raw.settings:{};
  const reader=pd3Object(s.reader)?s.reader:{},dictation=pd3Object(s.dictation)?s.dictation:{},exam=pd3Object(s.exam)?s.exam:{},writing=pd3Object(s.writing)?s.writing:{};
  const data={
    version:PD3_VERSION,updatedAt:pd3Stamp(raw.updatedAt),
    settings:{
      reader:{rate:PD3_RATES.includes(reader.rate)?reader.rate:base.settings.reader.rate,follow:reader.follow!==false,translation:!!reader.translation,calibration:Math.min(3,Math.max(0.35,Number(reader.calibration)||1))},
      dictation:{rate:PD3_RATES.includes(dictation.rate)?dictation.rate:base.settings.dictation.rate,limit:[0,2,3].includes(dictation.limit)?dictation.limit:0,strict:!!dictation.strict},
      exam:{timer:exam.timer!==false},
      writing:{timer:!!writing.timer,minutes:[30,45,60,90,120].includes(writing.minutes)?writing.minutes:45}
    },
    exam:{find:pd3CleanMap(raw.exam?.find,pd3CleanScore),text:pd3CleanMap(raw.exam?.text,pd3CleanScore)},
    writing:pd3CleanMap(raw.writing,pd3CleanWriting),oral:pd3CleanMap(raw.oral,pd3CleanOral),
    plan:{examDate:pd3ValidDay(raw.plan?.examDate)?raw.plan.examDate:''},
    stats:pd3CleanStats(raw.stats),xp:pd3CleanXp(raw.xp)
  };
  for(const name of PD3_SCORE_MAPS)data[name]=pd3CleanMap(raw[name],pd3CleanScore);
  // Optional: absent until the first mock exam is finished, so progress that never used it stays as it was.
  const mocks=pd3CleanMocks(raw.mocks);
  if(Object.keys(mocks).length)data.mocks=mocks;
  // Optional: absent until a dictation with mistakes is checked, so progress that never used it stays as it was.
  const spell=pd3CleanSpell(raw.spell);
  if(spell.length)data.spell=spell;
  return data;
}

/** Attaches fields carried from a newer version and keeps the whole object under PD3_LIMITS.state: long drafts are shortened
 * (oldest first), then the oldest records are dropped. Returns the same object. Data below the limit is not touched. */
export function sealPd3(data,unknown=null,max=PD3_LIMITS.state){
  if(unknown&&pd3Object(unknown)&&Object.keys(unknown).length)data._unknown=unknown;else delete data._unknown;
  const size=()=>JSON.stringify(data).length;
  if(size()<=max)return data;
  const drafts=Object.values(data.writing).filter(entry=>entry.draft).sort((a,b)=>a.updatedAt-b.updatedAt);
  for(const cap of [6000,3000,1000,0])for(const entry of drafts){
    if(entry.draft.length<=cap)continue;
    entry.draft=entry.draft.slice(0,cap);
    if(size()<=max)return data;
  }
  // Dictation sentences in repetition (newest first): the oldest go before any result does.
  if(Array.isArray(data.spell)){
    while(data.spell.length&&size()>max)data.spell.pop();
    if(!data.spell.length)delete data.spell;
    if(size()<=max)return data;
  }
  const records=[];
  for(const name of PD3_SCORE_MAPS)for(const [id,entry] of Object.entries(data[name]))records.push([entry.at,data[name],id]);
  for(const name of ['find','text'])for(const [id,entry] of Object.entries(data.exam[name]))records.push([entry.at,data.exam[name],id]);
  for(const name of ['writing','oral'])for(const [id,entry] of Object.entries(data[name]))records.push([entry.updatedAt,data[name],id]);
  records.sort((a,b)=>a[0]-b[0]);
  for(const [,map,id] of records){
    delete map[id];
    if(size()<=max)return data;
  }
  delete data._unknown;
  return data;
}
const STATE_KEYS=new Set(['version','xp','streak','lastDay','completed','reviews','activity','sessions','bookmarks','difficult','customWords','settings','pd3','_unknown']);
const SETTING_KEYS=new Set(['level','goal','theme','rate','mode','fontSize','newPerDay','voiceUri','language','name','_unknown']);
// Fields written by a newer app version are carried along (bounded, JSON-only) so that saving never erases them.
function unknownFields(source,known,carried){
  const extra={};
  if(record(carried))Object.assign(extra,carried);
  for(const [key,value] of Object.entries(source))if(!known.has(key) && !FORBIDDEN_KEYS.has(key))extra[key]=value;
  if(!Object.keys(extra).length || Object.keys(extra).length>50)return null;
  try{
    const text=JSON.stringify(extra);
    return text.length<=65536 ? JSON.parse(text) : null;
  }catch{return null;}
}
export function validateState(raw) {
  const fail = () => {throw new Error('Файл прогресса повреждён или имеет неподдерживаемый формат.');};
  const num=numberWithin, integer=integerWithin, id=safeId;
  const array=(value,max)=>Array.isArray(value) && Object.getPrototypeOf(value)===Array.prototype && value.length<=max;
  const date=x=>typeof x==='string' && /^\d{4}-\d{2}-\d{2}$/.test(x) && Number.isFinite(Date.parse(x)) && new Date(x).toISOString().startsWith(x);
  if (!record(raw) || raw.version!==1 || !integer(raw.xp,1000000000) || !integer(raw.streak,100000) || !(raw.lastDay===null || date(raw.lastDay))) fail();
  const clean=createState(); clean.xp=raw.xp;clean.streak=raw.streak;clean.lastDay=raw.lastDay;
  for (const key of ['completed','reviews','activity']) if (!record(raw[key])) fail();
  for (const [key,value] of Object.entries(raw.completed)) {
    if (!id(key) || !record(value) || !integer(value.best,100) || !integer(value.attempts,1000000)) fail();
    clean.completed[key]={best:value.best,attempts:value.attempts};
  }
  for (const [key,value] of Object.entries(raw.reviews)) {
    if (!id(key) || !record(value) || !integer(value.box,5) || !num(value.due,8640000000000000) || !integer(value.seen,1000000)) fail();
    clean.reviews[key]={box:value.box,due:value.due,seen:value.seen};
    if(Object.hasOwn(value,'memory')){
      const m=value.memory;
      if(!record(m)||!num(m.stability,36500)||m.stability<0.001||!num(m.difficulty,10)||m.difficulty<1||!num(m.lastReview,8640000000000000))fail();
      clean.reviews[key].memory={stability:m.stability,difficulty:m.difficulty,lastReview:m.lastReview};
    }
    if(Object.hasOwn(value,'contextIndex')){
      if(!integer(value.contextIndex,1000000))fail();clean.reviews[key].contextIndex=value.contextIndex;
    }
    if(Object.hasOwn(value,'contextSuccesses')){
      if(!record(value.contextSuccesses)||Object.keys(value.contextSuccesses).length>8)fail();
      clean.reviews[key].contextSuccesses={};
      for(const [context,at] of Object.entries(value.contextSuccesses)){
        if(!id(context)||!num(at,8640000000000000))fail();clean.reviews[key].contextSuccesses[context]=at;
      }
    }
    for (const field of ['introducedAt','lastAt','lastRecallAt']) if (Object.hasOwn(value,field)) {
      if (!num(value[field],8640000000000000)) fail();
      clean.reviews[key][field]=value[field];
    }
    for (const field of ['recognition','recall','spaced','lapses']) if (Object.hasOwn(value,field)) {
      if (!integer(value[field],1000000)) fail();
      clean.reviews[key][field]=value[field];
    }
    if (Object.hasOwn(value,'lastGrade')) {
      if (!['recognition','recall','assisted','miss'].includes(value.lastGrade)) fail();
      clean.reviews[key].lastGrade=value.lastGrade;
    }
  }
  for (const [key,value] of Object.entries(raw.activity)) {
    if (!date(key) || !record(value) || !integer(value.xp,1000000000) || !integer(value.lessons,1000000) || !num(value.minutes,10000000)) fail();
    clean.activity[key]={xp:value.xp,lessons:value.lessons,minutes:value.minutes};
  }
  for (const key of ['sessions','bookmarks','difficult']) {
    const values=key==='difficult' && !Object.hasOwn(raw,key) ? [] : raw[key];
    if (!array(values,10000)) fail();
    for (const value of values) if (!id(value)) fail();
    clean[key]=[...new Set(values)];
  }
  const words=Object.hasOwn(raw,'customWords') ? raw.customWords : [];
  if (!array(words,1000)) fail();
  const customIds=new Set();
  for (const word of words) {
    if (!record(word) || !id(word.id) || !/^u-.+/.test(word.id) || customIds.has(word.id)) fail();
    for (const [field,max] of [['da',220],['ru',300],['note',500],['association',500]]) {
      if (typeof word[field]!=='string' || word[field].length>max || ((field==='da' || field==='ru') && !word[field].trim())) fail();
    }
    customIds.add(word.id);
    clean.customWords.push({id:word.id,da:word.da,ru:word.ru,note:word.note,association:word.association});
  }
  const s=raw.settings, defaults=createState().settings;
  if (!record(s)) fail();
  // Unknown or newer setting values never reject the whole progress file: they fall back to the default.
  const choose=(value,allowed,fallback)=>allowed.includes(value) ? value : fallback;
  const voiceUri=typeof s.voiceUri==='string' && s.voiceUri.length<=500 ? s.voiceUri : '';
  clean.settings={
    level:choose(s.level,['A1','A2','B1','B2','C1'],defaults.level),goal:choose(s.goal,[30,60,100],defaults.goal),
    theme:choose(s.theme,['light','dark'],defaults.theme),rate:choose(s.rate,[0.7,0.85,1],defaults.rate),
    mode:choose(s.mode,['easy','mixed','expert'],defaults.mode),fontSize:choose(s.fontSize,[16,18,20],defaults.fontSize),
    newPerDay:choose(s.newPerDay,[3,6,10],defaults.newPerDay),voiceUri,language:choose(s.language,['uk','ru'],defaults.language)
  };
  if(typeof s.name==='string' && s.name.length<=40 && !/[\u0000-\u001f\u007f]/.test(s.name) && s.name.trim())clean.settings.name=s.name.trim();
  const settingsExtra=unknownFields(s,SETTING_KEYS,s._unknown);
  if(settingsExtra)clean.settings._unknown=settingsExtra;
  // PD3 results are optional. Data that is not PD3 data of a known version is left out; it never makes the whole progress unreadable.
  if(Object.hasOwn(raw,'pd3')){
    try{clean.pd3=sealPd3(validatePd3(raw.pd3),unknownFields(raw.pd3,PD3_KEYS,raw.pd3._unknown));}catch{ /* Not usable PD3 data. */ }
  }
  const extra=unknownFields(raw,STATE_KEYS,raw._unknown);
  if(extra)clean._unknown=extra;
  return clean;
}
