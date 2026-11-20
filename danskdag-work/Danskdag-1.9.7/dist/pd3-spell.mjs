// Words and sentences written wrongly in a PD3 dictation become cards of the ordinary spaced repetition (FSRS).
// The progress keeps only references, `state.pd3.spell = [{id,dictId,idx,words,count,lastAt}]` (the schema and limits live in engine.mjs);
// the texts and translations come from the static dictation data. The card id is `spell-<dictId>-<idx>`, the key of its review in `state.reviews`.
// Pure functions: no DOM, no storage.
import {PD3_SPELL,pd3CleanSpell} from './engine.mjs';
import {getReviewFor,recordAttempt} from './memory.mjs';
import {tokenize,cleanText} from './pd3-diff.mjs';

export {PD3_SPELL};
export const SPELL_KIND='dictation';
export const SPELL_TAG='Диктант-карточка';
/** Listenings of a sentence that are not a hint. Every listening beyond this counts as help (the answer is then "assisted"). */
export const SPELL_FREE_LISTENS=1;

export const spellId=(dictId,idx)=>`spell-${dictId}-${idx}`;
export const isSpellItem=item=>item?.kind===SPELL_KIND;
/** Union of two lists of records by id (larger count, newest time, union of the words), newest first, at most PD3_SPELL.max. */
export const mergeSpell=(a,b)=>pd3CleanSpell([...(Array.isArray(a)?a:[]),...(Array.isArray(b)?b:[])]);
/** Changes whenever a card appears, disappears or changes its words; the catalogue is rebuilt only then. */
export const spellSignature=records=>Array.isArray(records)&&records.length?records.map(r=>`${r.id}:${r.words.join(',')}`).join('|'):'';

/** The catalogue items of the records: {id,da,ru,kind:'dictation',source:'pd3',spellWords,...}. A record whose sentence is not in `dictations` is skipped. */
export function spellItems(records,dictations){
  if(!Array.isArray(records)||!records.length)return [];
  const byId=new Map(dictations.map(dictation=>[dictation.id,dictation]));
  const items=[];
  for(const record of records){
    const dictation=byId.get(record.dictId),sentence=dictation?.sentences?.[record.idx];
    if(!sentence?.da||!sentence.ru)continue;
    items.push({
      id:record.id,da:sentence.da,ru:sentence.ru,kind:SPELL_KIND,source:'pd3',verified:true,level:dictation.level||'B1',lessonId:null,
      tag:SPELL_TAG,note:'Предложение из диктанта PD3, в котором были ошибки.',daAnswers:[sentence.da],ruAnswers:[sentence.ru],spellWords:[...record.words]
    });
  }
  return items;
}

/** Mistakes of a checked dictation, per sentence: [{idx,words}] with the correct spelling of the words that were misspelled or missing.
 * `result` comes from scoreDictation, `inputs` is what was typed ({all} in 'text' mode, otherwise one entry per sentence).
 * A sentence the learner did not try (nothing typed for it, or none of its words found in the text) is not a mistake. */
export function spellFindings(item,result,inputs={}){
  if(!item?.sentences?.length||!result||result.tooLong)return [];
  let lists;
  if(item.mode==='text'){
    if(!result.whole)return [];
    const bounds=[];let offset=0;
    for(const sentence of item.sentences){const length=cleanText(sentence.da).length;bounds.push([offset,offset+length]);offset+=length+1;}
    lists=bounds.map(([from,to])=>result.whole.ref.filter(token=>token.start>=from&&token.start<to));
  }else{
    if(!result.units)return [];
    lists=result.units.map(unit=>unit.ref);
  }
  const found=[];
  lists.forEach((tokens,idx)=>{
    const words=tokens.filter(token=>token.word);
    if(!words.length)return;
    const tried=item.mode==='text'?words.some(token=>token.status!=='missing'):!!String(inputs[idx]??'').trim();
    if(!tried)return;
    const wrong=[];
    for(const token of words)if(token.status==='misspelled'||token.status==='missing'){
      const text=token.text.slice(0,PD3_SPELL.wordLength);
      if(!wrong.some(w=>w.toLowerCase()===text.toLowerCase()))wrong.push(text);
    }
    if(wrong.length)found.push({idx,words:wrong.slice(0,PD3_SPELL.words)});
  });
  return found;
}

/** Puts the sentences with mistakes of one dictation into repetition. Returns {state,recorded,added}: `recorded` sentences were
 * written (a repeated mistake raises its count), `added` of them are new. Every mistake is an "Again" for the card (10 minutes, FSRS memory
 * lowered), the same as a wrong answer in the repetition itself. Sentences answered without mistakes later are not touched. */
export function recordSpell(state,dictId,found,now=Date.now()){
  const none={state,recorded:0,added:0};
  if(!state||!Array.isArray(found)||!found.length||typeof dictId!=='string')return none;
  const pd3=state.pd3,known=new Map((pd3?.spell||[]).map(record=>[record.id,record]));
  const next=[...known.values()],touched=[];
  for(const entry of found){
    if(!Number.isInteger(entry?.idx))continue;
    const id=spellId(dictId,entry.idx),old=known.get(id);
    const record={id,dictId,idx:entry.idx,words:[...new Set([...(entry.words||[]),...(old?.words||[])])],count:Math.min(1000000,(old?.count||0)+1),lastAt:now};
    if(old)next.splice(next.findIndex(r=>r.id===id),1,record);else next.push(record);
    touched.push(record);
  }
  if(!touched.length)return none;
  const spell=pd3CleanSpell(next);
  const kept=new Set(spell.map(record=>record.id));
  const reviews={...state.reviews};
  let recorded=0;
  for(const record of touched){
    if(!kept.has(record.id))continue;
    reviews[record.id]=recordAttempt(getReviewFor({id:record.id},state.reviews),{correct:false,kind:'recall',helped:false,retry:false},now);
    recorded++;
  }
  const base=pd3||{version:1,updatedAt:0};
  return {state:{...state,reviews,pd3:{...base,spell,updatedAt:Math.max(base.updatedAt||0,now)}},recorded,added:touched.filter(r=>kept.has(r.id)&&!known.has(r.id)).length};
}

/** {count,due}: sentences in repetition and how many of them are due now (a card without a review yet counts as due). */
export function spellSummary(state,now=Date.now()){
  const records=state?.pd3?.spell;
  if(!Array.isArray(records)||!records.length)return {count:0,due:0};
  let due=0;
  for(const record of records){
    const review=getReviewFor({id:record.id},state.reviews||{});
    if(!review||!(review.due>now))due++;
  }
  return {count:records.length,due};
}

/** The sentence with one problem word replaced by "___" (for a device without a Danish voice), and that word. Null for a sentence without words. */
export function clozeFor(item){
  const da=cleanText(item.da),tokens=tokenize(da).filter(token=>token.word);
  if(!tokens.length)return null;
  const wanted=new Set((item.spellWords||[]).map(word=>word.toLowerCase()));
  const pick=tokens.find(token=>wanted.has(token.norm))||tokens.reduce((best,token)=>token.text.length>best.text.length?token:best,tokens[0]);
  return {text:da.slice(0,pick.start)+'___'+da.slice(pick.end),answer:da.slice(pick.start,pick.end)};
}
