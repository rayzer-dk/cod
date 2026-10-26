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
// Locale-independent folding. Danish letters stay distinct: "aa" is never treated as "å".
export function normalize(value) {
  return String(value).normalize('NFC').toLowerCase().normalize('NFC').replace(/[\u00ad\u200b-\u200d\u2060\ufeff]/g,'').replace(/[\u00a0\u2007\u202f]/g,' ').replace(/ё/g,'е').replace(/[’‘ʼ`]/g,"'").replace(/[‐‑–—]/g,'-').replace(/[.,!?;:"“”«»„…]/g,'').replace(/\s+/g,' ').trim();
}
export const isCorrect = (value, answers) => answers.some(answer => normalize(value) === normalize(answer));
export function createState() {
  return {version:1,xp:0,streak:0,lastDay:null,completed:{},reviews:{},activity:{},sessions:[],bookmarks:[],difficult:[],customWords:[],settings:{level:'A1',goal:30,theme:'light',rate:0.85,mode:'easy',fontSize:18,newPerDay:6,voiceUri:'',language:'uk'}};
}
const dayDistance = (a,b) => (Date.parse(a) - Date.parse(b))/DAY;
export function activeStreak(state, now = new Date()) {
  return state.lastDay && dayDistance(dayKey(now),state.lastDay) <= 1 ? state.streak : 0;
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
  if (state.lastDay !== today) result.streak = state.lastDay && dayDistance(today,state.lastDay) === 1 ? state.streak + 1 : 1;
  result.lastDay = today;
  result.sessions = [...result.sessions,event.id].slice(-10000);
  result.activity[today] = {xp:(result.activity[today]?.xp || 0)+xp,lessons:(result.activity[today]?.lessons || 0)+1,minutes:(result.activity[today]?.minutes || 0)+event.minutes};
  if (event.lessonId) {
    const old=result.completed[event.lessonId];
    result.completed[event.lessonId]={best:Math.max(old?.best || 0,Math.round(event.correct/event.total*100)),attempts:(old?.attempts || 0)+1};
  }
  return result;
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
const STATE_KEYS=new Set(['version','xp','streak','lastDay','completed','reviews','activity','sessions','bookmarks','difficult','customWords','settings','_unknown']);
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
  const extra=unknownFields(raw,STATE_KEYS,raw._unknown);
  if(extra)clean._unknown=extra;
  return clean;
}
