import {createSessionId, isCorrect, normalize} from './engine.mjs';
import {getReviewFor,practiceStage} from './memory.mjs';
import {findWord} from './text.mjs';

export function shuffle(values) {
  const copy = [...values];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

const tokensOf=text=>normalize(text).split(' ').filter(Boolean);
const wordCount=text=>String(text).trim().split(/\s+/).filter(Boolean).length;
const SENTENCE_END=/[.!?…]["»”]?\s*$/;
// A sentence ends with terminal punctuation; long unpunctuated strings count too, but multi-meaning glosses ("a; b", "a (note)") never do.
export const isSentenceLike=text=>SENTENCE_END.test(String(text).trim())||(wordCount(text)>=6&&!/[;(]/.test(text));

// ---- Word order in "build" tasks -------------------------------------------------------------
// A Danish main clause keeps the verb second, so a time or place adverbial can open the sentence
// (Jeg drikker kaffe om morgenen / Om morgenen drikker jeg kaffe). We never generate the variant
// (that could produce wrong Danish); we only recognise sentences that have such an alternative so
// that "build" can be withheld until the data lists the second order in daAnswers.
const WEEKDAYS='mandag|tirsdag|onsdag|torsdag|fredag|lørdag|søndag';
const TIME_ADVERBIAL=new RegExp(`(^| )(i (dag|morgen|går|aften|nat|år|weekenden|sommer|vinter|forgårs|overmorgen|øjeblikket|formiddags|eftermiddags|(${WEEKDAYS})s)|om (morgenen|aftenen|natten|eftermiddagen|formiddagen|dagen|sommeren|vinteren|foråret|efteråret|ugen|måneden|året|lidt)|hver \\S+|(næste|sidste) (uge|måned|år|weekend|gang|dag|${WEEKDAYS})|på (${WEEKDAYS})|klokken \\S+|kl \\S+|nu|snart|senere|bagefter|derefter|først|engang|tit|ofte|altid|aldrig|sjældent|normalt|som regel|allerede|forleden|nogle gange|en gang \\S+ \\S+|${WEEKDAYS})( |$)`);
const PLACE_ADVERBIAL=/(^| )(her|hjemme|derhjemme|ude|inde|ovenpå|nedenunder|udenfor|indenfor|derude|derinde|heromme|derovre|herovre|hjem|hjemmefra)( |$)| der$/;
const ADVERBIAL_PREPOSITIONS='i|på|ved|hos|om|efter|før|under|over|bag|foran|mellem|til|fra|med';
const LEADING_PHRASE=new RegExp(`^(${ADVERBIAL_PREPOSITIONS}) `);
const TRAILING_PHRASE=new RegExp(` (${ADVERBIAL_PREPOSITIONS}) (\\S+ )?\\S+$`);
export function hasMovableAdverbial(da){
 const raw=String(da||'');
 if(raw.includes('?'))return false;
 const tokens=tokensOf(raw);
 if(tokens.length<3)return false;
 if(/[.!…]["»”]?\s+\S/.test(raw))return true;
 const text=tokens.join(' ');
 if(TIME_ADVERBIAL.test(text)||PLACE_ADVERBIAL.test(text))return true;
 if(raw.includes(','))return false;
 if(tokens.length>=4&&LEADING_PHRASE.test(text))return true;
 const trailing=TRAILING_PHRASE.exec(text);
 return !!trailing&&text.slice(0,trailing.index).split(' ').length>=2;
}
const orderKey=text=>tokensOf(text).sort().join(' ');
export function hasOrderVariant(item){
 const base=tokensOf(item.da).join(' '),key=orderKey(item.da);
 return (item.daAnswers||[]).some(a=>tokensOf(a).join(' ')!==base&&orderKey(a)===key);
}
export const buildOrderIsSafe=item=>!hasMovableAdverbial(item.da)||hasOrderVariant(item);

// ---- Function words ---------------------------------------------------------------------------
// Prepositions, conjunctions, pronouns, particles and modals are closed classes: several of them
// usually fit one gap ("Det er ___ en god idé" accepts da and jo), so a typed cloze made from a
// single example sentence would reject correct answers. Part of speech is read from the data when
// it exists (wordClass); imported vocabulary has none, so the gloss ("частица", "предлог", ...) and
// the closed-class forms below are used instead.
const FUNCTION_CLASSES=new Set(['preposition','conjunction','pronoun','article','interjection']);
const FUNCTION_GLOSS=/частиц|предлог|союз|междомет|местоим|артикл|усилит|служебн|при сравнении/i;
const CLOSED_CLASS=new Set(('af ad bag blandt efter for foran fra før gennem hos i imod inden langs med mellem mod om omkring over på til trods uden under ved via ifølge angående '+
 'og eller men at fordi hvis når da mens selvom medmindre så end som både hverken enten '+
 'jeg du han hun den det vi de mig dig ham hende os jer dem min mit mine din dit dine sin sit sine vores jeres deres man sig selv ingen intet ingenting noget nogen nogle alle alt andre anden andet samme begge hver hvert sådan sådanne denne dette disse enhver '+
 'hvad hvem hvor hvordan hvornår hvorfor hvilken hvilket hvilke hvorhen hvorfra '+
 'jo altså jamen nok vel dog sgu bare lige endnu igen allerede stadig kun også ofte aldrig altid snart sent først sidst nu her der hen ud ind op ned måske gerne helst især mere mindre lidt mange flere færre meget ret helt ikke ja nej tak nær ellers derfor desuden imidlertid heller sammen tit sjældent '+
 'kan skal vil må burde kunne skulle ville måtte være er har have blive bliver var blev nødt').split(' '));
export function isFunctionWord(item){
 if(item.wordClass)return FUNCTION_CLASSES.has(item.wordClass);
 const tokens=tokensOf(item.da);
 if(tokens.length===1&&CLOSED_CLASS.has(tokens[0]))return true;
 return tokens.length<=2&&FUNCTION_GLOSS.test(`${item.ru||''} ${item.original||''}`);
}

// ---- Distractors ------------------------------------------------------------------------------
// Options must look like the answer: a word is never contrasted with a sentence, and candidates
// are ranked by length, word class and article. Two options (or an option and the answer) that
// share a meaning would both be right, so they are never offered together.
const featureCache=new WeakMap();
const articleOf=text=>/^(en|et|at) \S/i.test(text)?text.slice(0,2).toLowerCase():'';
function featuresOf(p){
 let f=featureCache.get(p);
 if(f)return f;
 const gloss=new Set([p.ru,...(p.ruAnswers||[])].flatMap(v=>String(v||'').replace(/\([^)]*\)/g,' ').split(/;|,| \/ /)).map(normalize).filter(v=>v.length>1));
 const side=text=>({text:String(text||''),key:normalize(text||''),sentence:isSentenceLike(text||''),words:wordCount(text||'')});
 f={gloss,lemma:tokensOf(p.da||'').join(' ').replace(/^(en|et|at) /,''),cls:p.wordClass||'',kind:p.kind||'',da:side(p.da),ru:side(p.ru)};
 featureCache.set(p,f);
 return f;
}
// Two entries share a meaning when their glosses have a common reading ("угол; угольник" and "угол (определённая форма)").
export function sharesGloss(a,b){
 const keys=featuresOf(b).gloss;
 for(const key of featuresOf(a).gloss)if(keys.has(key))return true;
 return false;
}
// The same Danish lemma ("tænde" / "at tænde") also counts: both would be right for one prompt.
export const sharesMeaning=(a,b)=>featuresOf(a).lemma===featuresOf(b).lemma||sharesGloss(a,b);
export const isSameEntry=(a,b)=>featuresOf(a).lemma===featuresOf(b).lemma&&sharesGloss(a,b);
function chooseDistractors(item,answers,pool,targetDa,count){
 const answer=String(answers[0]),seen=new Set(answers.map(normalize)),own=featuresOf(item);
 const target={sentence:isSentenceLike(answer),words:wordCount(answer),length:answer.length,form:targetDa?articleOf(answer):''};
 const ranked=[];
 for(const candidate of pool){
  const f=featuresOf(candidate),side=targetDa?f.da:f.ru,text=side.text;
  if(!text||candidate.id===item.id||seen.has(side.key)||sharesMeaning(item,candidate))continue;
  let cost=Math.random()*4+Math.min(Math.abs(text.length-answer.length),20)*.5+Math.abs(side.words-target.words)*8;
  if(side.sentence!==target.sentence)cost+=1000;
  if(own.cls&&f.cls)cost+=own.cls===f.cls?0:30;else if(own.cls||f.cls)cost+=20;
  if(targetDa&&articleOf(text)!==target.form)cost+=6;
  if(own.kind!==f.kind)cost+=4;
  if(item.dialogue&&candidate.dialogue&&candidate.level===item.level)cost-=60;
  ranked.push({text,candidate,cost});
 }
 ranked.sort((a,b)=>a.cost-b.cost);
 const picked=[];
 for(const entry of ranked){
  if(picked.some(p=>normalize(p.text)===normalize(entry.text)||sharesMeaning(p.candidate,entry.candidate)))continue;
  picked.push(entry);
  if(picked.length>=count)break;
 }
 return picked.map(p=>p.text);
}

function contextGap(item,review){
 const variants=item.contextVariants;
 if(variants?.length){const context=variants[(review?.contextIndex||0)%variants.length];return context;}
 if(item.kind!=='word'||!item.exampleDa||!item.exampleRu)return null;
 const explicit=item.contextGap;
 if(explicit?.text?.split('___').length===2&&explicit.answers?.length&&explicit.answers.every(a=>normalize(explicit.text.replace('___',a))===normalize(item.exampleDa))&&!explicit.answers.some(a=>findWord(explicit.text.replace('___',''),a)))return explicit;
 if(isFunctionWord(item))return null;
 const found=findWord(item.exampleDa,item.da);
 if(!found||findWord(item.exampleDa.slice(found.index+found.value.length),item.da))return null;
 return {text:item.exampleDa.slice(0,found.index)+'___'+item.exampleDa.slice(found.index+found.value.length),answers:[found.value]};
}

// Typed Danish answers for dictionary entries. A noun is learnt with its gender, so once any entry of
// the lexicon knows the article ("en regn") the bare noun ("regn") is not accepted as an independent
// recall of the same entry. The infinitive marker of a verb carries no information, so a verb known
// as "at tænde" is accepted with or without "at". The rule is the same whichever duplicate entry the
// learner happens to be asked about.
export function entryForms(answers) {
  const lemma = a => normalize(a).replace(/^(en|et) /, '');
  const articled = new Set(answers.filter(a => /^(en|et) \S/i.test(a)).map(lemma));
  const forms = answers.filter(a => /^(en|et) \S/i.test(a) || !articled.has(normalize(a)));
  for (const a of answers) {
    const bare = /^at \S/i.test(a) ? a.slice(3) : '';
    if (bare && !forms.some(f => normalize(f) === normalize(bare))) forms.push(bare);
  }
  return forms;
}
export function answerFormHint(answers) {
  if (answers.length && answers.every(a => /^(en|et) \S/i.test(a) && wordCount(a) <= 4)) return 'article';
  if (answers.some(a => /^at \S/i.test(a)) && !answers.some(a => /^(en|et) \S/i.test(a))) return 'infinitive';
  return '';
}

export function createTasks(items, pool, mode = 'easy', reviews = {}) {
  return items.map((item, index) => {
    const review=getReviewFor(item,reviews);
    let stage=mode==='auto'?practiceStage(review,item):null;
    const effectiveMode=stage?(stage==='recognition'?'easy':stage==='build'?'mixed':'expert'):mode;
    const context=stage==='recall'?contextGap(item,review):null;
    const gap = context || item.gap, focus = item.focus, dialogue = item.dialogue;
    const reverse = effectiveMode === 'expert' || index % 3 === 2;
    let kind = focus ? 'focus' : gap ? 'gap' : effectiveMode === 'easy' ? 'choice' : effectiveMode === 'expert' ? 'type' : ['choice', 'build', 'type', 'listen', 'build', 'type'][index % 6];
    if(dialogue)kind=effectiveMode==='expert'?'type':effectiveMode==='easy'?'choice':['choice','build','type'][index%3];
    if(stage==='build'&&!gap&&!focus)kind='build';
    if (kind === 'build' && (item.da.split(/\s+/).length < 3 || !buildOrderIsSafe(item))) {
      kind = 'choice';
      // A build slot that cannot be offered safely is recognition practice, so it must not be labelled as assembling.
      if (stage === 'build') stage = 'recognition';
    }
    const targetDa = !focus && (!!dialogue || kind === 'build' || reverse);
    let answers = focus ? [...focus.answers] : gap ? [...gap.answers] : [...(targetDa ? item.daAnswers || [item.da] : item.ruAnswers || [item.ru])];
    if (!gap && targetDa && kind !== 'build' && item.kind === 'word') {
      for (const synonym of pool) {
        if (synonym.verified !== false && synonym.kind === 'word' && (normalize(synonym.ru) === normalize(item.ru) || (synonym.id !== item.id && isSameEntry(synonym, item)))) {
          for (const answer of synonym.daAnswers || [synonym.da]) if (!answers.some(a=>normalize(a)===normalize(answer))) answers.push(answer);
        }
      }
    }
    // A typed Danish answer to a noun must carry its article and a verb may carry "at" (see entryForms).
    if (kind === 'type' && targetDa && !gap && !focus && !dialogue && item.kind === 'word' && !isSentenceLike(answers[0])) answers = entryForms(answers);
    const hint = kind === 'type' && targetDa && !gap && !focus && !dialogue && item.kind === 'word' && !isSentenceLike(answers[0]) ? answerFormHint(answers) : '';
    let options = [];
    if (effectiveMode !== 'expert' && ['choice', 'listen', 'gap', 'focus'].includes(kind)) {
      if (focus || gap) {
        const seen = new Set(answers.map(normalize));
        options = [answers[0]];
        for (const candidate of (focus ? focus.options : gap.options) || []) {
          if (!seen.has(normalize(candidate))) {
            options.push(candidate);
            seen.add(normalize(candidate));
          }
          if (options.length >= 4) break;
        }
      } else options = [answers[0], ...chooseDistractors(item, answers, pool, targetDa, 3)];
      options = shuffle(options);
    }
    return {
      itemId: item.id, kind, reverse: targetDa, answers, options,
      prompt: dialogue ? dialogue.goal : focus ? item.da : gap ? gap.text : targetDa ? item.ru : item.da,
      promptLang: gap || !targetDa ? 'da' : 'ru',
      answerLang: focus ? focus.answerLang : gap || targetDa ? 'da' : 'ru',
      ...(focus ? {question:focus.question,target:focus.target || ''} : {}),
      ...(stage?{stage}:{}),
      ...(hint?{hint}:{}),
      ...(context?{completeDa:context.completeDa||item.exampleDa,contextTranslation:context.ru||item.exampleRu,...(context.id?{contextId:context.id}:{})}:{}),
      bank: focus ? [] : shuffle(item.da.replace(/[.,!?;:"“”«»]/g, '').split(/\s+/).filter(Boolean)),
      retry: false
    };
  });
}

export const checkTask = (task, answer) => isCorrect(answer, task.answers);

export function makeSession(items, pool, options = {}) {
  const selected = items.slice(0, 6);
  if (!selected.length) throw new Error('Нет подходящих слов для тренировки.');
  return {
    schema: 2, id: createSessionId(), lessonId: options.lessonId || null,
    title: options.title || 'Повторение', mode: options.mode || 'easy',
    tasks: createTasks(selected, pool, options.mode, options.reviews), initialCount: selected.length,
    index: 0, correct: 0, missed: [], started: Date.now(),
    submitted: false, answer: '', words: [], revealed: false,
    feedback: false, retryAdded: false, beforeAwards: [], helped:false,outcomes:[],selfChecked:false,
    studyIds:(options.studyIds||[]).filter(id=>selected.some(p=>p.id===id)).slice(0,2),studyDone:!(options.studyIds||[]).some(id=>selected.some(p=>p.id===id))
  };
}

export function answerSession(session, answer) {
  if (session.submitted || session.index >= session.tasks.length) return session;
  const next = structuredClone(session), task = next.tasks[next.index];
  next.submitted = true;
  next.feedback = checkTask(task, answer);
  next.answer = answer;
  const kind=!task.options.length&&['type','gap','focus'].includes(task.kind)?'recall':'recognition';
  next.outcomes ||= [];
  next.outcomes.push({itemId:task.itemId,correct:next.feedback,kind,helped:!!next.helped||!!next.revealed,retry:!!task.retry,...(task.contextId?{contextId:task.contextId}:{})});
  if (next.index < next.initialCount) {
    if (next.feedback) next.correct++;
    else next.missed.push(task.itemId);
  }
  return next;
}

export function selfCheckSession(session){
 const task=session.tasks[session.index];
 if(!session.submitted||session.feedback||session.selfChecked||!task||task.options.length||!['type','gap','focus','build'].includes(task.kind)||!String(session.answer||'').trim())return session;
 const next=structuredClone(session);
 next.selfChecked=true;next.helped=true;next.feedback=true;
 next.missed=next.missed.filter(id=>id!==task.itemId);
 const outcome=next.outcomes.at(-1);
 if(outcome){outcome.correct=true;outcome.helped=true;outcome.selfChecked=true;}
 return next;
}

export function advanceSession(session) {
  if (!session.submitted || session.index >= session.tasks.length) return session;
  const next = structuredClone(session);
  next.index++;
  if (next.index === next.tasks.length && !next.retryAdded) {
    next.retryAdded = true;
    for (const id of new Set(next.missed)) {
      const task = next.tasks.find(t => t.itemId === id);
      next.tasks.push({...structuredClone(task), retry: true});
    }
  }
  next.submitted = false;
  next.answer = '';
  next.words = [];
  next.revealed = false;
  next.helped = false;
  next.selfChecked = false;
  return next;
}

export function moveToken(words, from, to) {
  const result = [...words];
  if (from < 0 || from >= result.length || to < 0 || to >= result.length) return result;
  const [value] = result.splice(from, 1);
  result.splice(to, 0, value);
  return result;
}

export function restoreSession(raw, items, creditedSessions = []) {
  if (!raw || typeof raw !== 'object' || !Array.isArray(raw.tasks) || creditedSessions.includes(raw.id)) return null;
  let s = structuredClone(raw);
  if (s.schema !== 2) {
    if (!s.tasks.every(t => items[t.phraseId] && Array.isArray(t.options))) return null;
    s.tasks = s.tasks.map(t => {
      const p = items[t.phraseId], targetDa = t.kind === 'build' || t.reverse;
      return {
        itemId: p.id, kind: t.kind, reverse: !!targetDa,
        answers: targetDa ? p.daAnswers || [p.da] : p.ruAnswers || [p.ru],
        options: ['choice','listen'].includes(t.kind) ? t.options.map(id => items[id]?.[targetDa ? 'da' : 'ru']).filter(Boolean) : [],
        prompt: targetDa ? p.ru : p.da, promptLang: targetDa ? 'ru' : 'da',
        answerLang: targetDa ? 'da' : 'ru', bank: t.bank || [], retry: false
      };
    });
    const t = s.tasks[s.index];
    if (s.selected && items[s.selected] && t) s.answer = items[s.selected][t.answerLang === 'da' ? 'da' : 'ru'];
    s.schema = 2;
    s.initialCount = s.originalLength || (s.retryAdded ? Math.min(6, s.tasks.length) : s.tasks.length);
    s.mode = 'mixed';
    s.beforeAwards = [];
  }
  const strings = (v, limit = 1600) => typeof v === 'string' && v.length <= limit;
  const stringList = (v, count = 50) => Array.isArray(v) && v.length <= count && v.every(x => strings(x));
  if (!strings(s.id, 120) || !/^[\w-]+$/.test(s.id) || !strings(s.title, 250)) return null;
  if (s.tasks.length < 1 || s.tasks.length > 12 || !Number.isInteger(s.initialCount) || s.initialCount < 1 || s.initialCount > 6) return null;
  if (!Number.isInteger(s.index) || s.index < 0 || s.index > s.tasks.length || !Number.isInteger(s.correct) || s.correct < 0 || s.correct > s.initialCount) return null;
  if (!['easy', 'mixed', 'expert', 'auto'].includes(s.mode) || !Number.isFinite(s.started) || !stringList(s.missed, 6) || !s.missed.every(id => items[id])) return null;
  if (typeof s.submitted !== 'boolean' || typeof s.feedback !== 'boolean' || !strings(s.answer, 1600)) return null;
  for (const t of s.tasks) {
    if (!items[t.itemId] || !['choice', 'build', 'type', 'listen', 'gap', 'focus'].includes(t.kind) || !strings(t.prompt)) return null;
    if (t.stage!==undefined&&!['recognition','build','recall'].includes(t.stage))return null;
    if(t.contextId!==undefined&&(!strings(t.contextId,120)||!/^ctx-[a-zA-Z0-9_-]+$/.test(t.contextId)))return null;
    if (t.completeDa!==undefined&&(!strings(t.completeDa)||!strings(t.contextTranslation)))return null;
    if (t.hint!==undefined&&!['article','infinitive'].includes(t.hint)) return null;
    if (t.kind === 'focus' && (!strings(t.question, 500) || !strings(t.target || '', 220))) return null;
    if (!stringList(t.answers, 30) || !t.answers.length || !stringList(t.options, 4) || !stringList(t.bank, 80)) return null;
    if (!['da', 'ru'].includes(t.promptLang) || !['da', 'ru'].includes(t.answerLang)) return null;
  }
  if (!Array.isArray(s.words) || s.words.length > 80 || !s.words.every(i => Number.isInteger(i) && i >= 0 && i < (s.tasks[s.index]?.bank.length || 0)) || new Set(s.words).size !== s.words.length) return null;
  if(s.helped===undefined)s.helped=false;
  if(s.selfChecked===undefined)s.selfChecked=false;
  if(s.outcomes===undefined)s.outcomes=[];
  if(s.studyIds===undefined)s.studyIds=[];
  if(s.studyDone===undefined)s.studyDone=true;
  if(typeof s.helped!=='boolean'||typeof s.selfChecked!=='boolean'||typeof s.studyDone!=='boolean'||!stringList(s.studyIds,2)||!s.studyIds.every(id=>s.tasks.some(t=>t.itemId===id)))return null;
  if(!s.studyIds.length)s.studyDone=true;
  if(!Array.isArray(s.outcomes)||s.outcomes.length>12||!s.outcomes.every(o=>o&&s.tasks.some(t=>t.itemId===o.itemId)&&typeof o.correct==='boolean'&&typeof o.helped==='boolean'&&typeof o.retry==='boolean'&&(o.selfChecked===undefined||typeof o.selfChecked==='boolean')&&['recall','recognition'].includes(o.kind)))return null;
  if(s.outcomes.some(o=>o.contextId!==undefined&&(!strings(o.contextId,120)||!/^ctx-[a-zA-Z0-9_-]+$/.test(o.contextId))))return null;
  if (!stringList(s.beforeAwards, 30)) s.beforeAwards = [];
  return s;
}
