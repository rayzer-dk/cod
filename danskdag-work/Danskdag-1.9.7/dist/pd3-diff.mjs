// Word-level comparison of a dictation with its reference text (pure functions, no DOM).
// Words are aligned with a weighted edit distance, so one missing word does not turn everything after it into an error.
import {stripInvisible} from './engine.mjs';
const TOKEN=/([\p{L}\p{N}]+(?:['’-][\p{L}\p{N}]+)*)|([.,;:!?…«»"“”„()–—])/gu;
// The alignment table has (reference+input) cells; above this many the comparison is refused with `tooLong` instead of thrown.
const MAX_CELLS=2_500_000;
/** The text as it is compared: NFC, without invisible formatting characters (ZWSP, soft hyphen, LRM/RLM, bidi controls). Offsets refer to this string. */
export const cleanText=text=>stripInvisible(String(text??'').normalize('NFC'));

export const ERROR_KINDS=['aeoa','double','silent','ending','case','other','punctuation','missing','extra','order'];

/** Tokens with positions. Without `strict` only words (lowercase); with it also punctuation marks and exact letter case. */
export function tokenize(text,{strict=false}={}){
  const tokens=[];
  for(const match of cleanText(text).matchAll(TOKEN)){
    const word=match[1]!==undefined;
    if(!word&&!strict)continue;
    const raw=match[0],unified=raw.replace(/’/g,"'");
    tokens.push({text:raw,start:match.index,end:match.index+raw.length,word,norm:strict?unified:unified.toLowerCase()});
  }
  return tokens;
}

export function levenshtein(a,b){
  if(a===b)return 0;
  const previous=Array.from({length:b.length+1},(_,i)=>i);
  for(let i=1;i<=a.length;i++){
    let diagonal=previous[0];previous[0]=i;
    for(let j=1;j<=b.length;j++){
      const above=previous[j];
      previous[j]=Math.min(previous[j]+1,previous[j-1]+1,diagonal+(a[i-1]===b[j-1]?0:1));
      diagonal=above;
    }
  }
  return previous[b.length];
}

const SKELETON=value=>value.replace(/æ/g,'ae').replace(/ø/g,'o').replace(/å/g,'a').replace(/oe/g,'o').replace(/aa/g,'a');
const COLLAPSE=value=>value.replace(/(\p{L})\1+/gu,'$1');
const NO_SILENT=value=>value.replace(/[dgh]/g,'');
const ENDINGS=new Set(['','e','t','en','et','er','re','ne','te','de','ede','ene','ende']);
const specials=value=>(value.match(/[æøå]/g)||[]).length;

function commonPrefix(a,b){let i=0;while(i<a.length&&i<b.length&&a[i]===b[i])i++;return i;}

/** Why a near-miss is wrong: æøå, doubled consonant, silent letter, grammatical ending, letter case, or something else. */
export function classifyMisspelling(reference,written){
  const r=reference.toLowerCase(),u=written.toLowerCase();
  if(r===u)return 'case';
  if(specials(r)!==specials(u)&&levenshtein(r,u)<=3||SKELETON(r)===SKELETON(u))return 'aeoa';
  if(COLLAPSE(r)===COLLAPSE(u))return 'double';
  if(NO_SILENT(r)===NO_SILENT(u))return 'silent';
  const p=commonPrefix(r,u);
  if(p>=3&&ENDINGS.has(r.slice(p))&&ENDINGS.has(u.slice(p)))return 'ending';
  return 'other';
}

const limitFor=word=>word.length<=3?1:2;
// Lowercase form and skeleton are computed once per token: the alignment asks about every pair of tokens.
const lower=t=>t.lower??(t.lower=t.norm.toLowerCase());
const skeleton=t=>t.skeleton??(t.skeleton=SKELETON(lower(t)));
function nearMiss(r,u){
  if(!r.word||!u.word)return false;
  const a=lower(r),b=lower(u);
  if(skeleton(r)===skeleton(u))return true;
  return Math.abs(a.length-b.length)<=limitFor(a)&&levenshtein(a,b)<=limitFor(a);
}

function align(ref,user){
  const n=ref.length,m=user.length,width=m+1;
  const cost=new Float64Array((n+1)*width),back=new Uint8Array((n+1)*width);
  for(let i=1;i<=n;i++){cost[i*width]=i;back[i*width]=2;}
  for(let j=1;j<=m;j++){cost[j]=j;back[j]=3;}
  for(let i=1;i<=n;i++)for(let j=1;j<=m;j++){
    const r=ref[i-1],u=user[j-1];
    let best=Infinity,move=0;
    if(r.norm===u.norm){best=cost[(i-1)*width+j-1];move=1;}
    else if(nearMiss(r,u)){best=cost[(i-1)*width+j-1]+0.5+0.1*levenshtein(lower(r),lower(u));move=4;}
    const missing=cost[(i-1)*width+j]+1;
    if(missing<best){best=missing;move=2;}
    const extra=cost[i*width+j-1]+1;
    if(extra<best){best=extra;move=3;}
    cost[i*width+j]=best;back[i*width+j]=move;
  }
  const pairs=[];
  let i=n,j=m;
  while(i>0||j>0){
    const move=back[i*width+j];
    if(move===1||move===4){pairs.push([i-1,j-1,move]);i--;j--;}
    else if(move===2){pairs.push([i-1,-1,2]);i--;}
    else{pairs.push([-1,j-1,3]);j--;}
  }
  return pairs.reverse();
}

/** Percent of a dictation: rounded as usual, but capped at 99 while anything is wrong, so one mistake in a long text never shows as 100%. */
function percentOf(points,total,exact){
  if(exact)return 100;
  return Math.min(99,Math.round(100*Math.min(1,Math.max(0,points/total))));
}

/**
 * Compares the reference text with what was typed.
 * Result: {percent,counts,ref,user,errors}. ref/user are token lists with a `status`
 * (correct | misspelled | missing | extra | order) and positions in the original strings.
 */
export function compareDictation(reference,input,{strict=false}={}){
  const ref=tokenize(reference,{strict}),user=tokenize(input,{strict});
  if((ref.length+1)*(user.length+1)>MAX_CELLS){
    // Never throws on real input: the page shows "too long, shorten it" instead.
    return {tooLong:true,percent:0,points:0,counts:{correct:0,misspelled:0,missing:0,extra:0,order:0,total:ref.length},ref:[],user:[],errors:[],strict,exact:false};
  }
  for(const token of ref)token.status='missing';
  for(const token of user)token.status='extra';
  const errors=new Map();
  const note=(kind,reference,written)=>{
    if(!errors.has(kind))errors.set(kind,{kind,count:0,examples:[]});
    const entry=errors.get(kind);entry.count++;
    if(entry.examples.length<4)entry.examples.push({ref:reference,user:written});
  };
  for(const [i,j,move] of align(ref,user)){
    if(move===1){ref[i].status='correct';user[j].status='correct';ref[i].user=user[j].text;user[j].ref=ref[i].text;}
    else if(move===4){
      const kind=classifyMisspelling(ref[i].norm,user[j].norm);
      ref[i].status=user[j].status='misspelled';ref[i].kind=user[j].kind=kind;ref[i].user=user[j].text;user[j].ref=ref[i].text;
      note(kind,ref[i].text,user[j].text);
    }
  }
  // A word that is both missing in one place and extra in another was typed in the wrong position.
  const spare=new Map();
  user.forEach((token,j)=>{if(token.status==='extra'&&token.word){if(!spare.has(token.norm))spare.set(token.norm,[]);spare.get(token.norm).push(j);}});
  for(const token of ref){
    if(token.status!=='missing'||!token.word)continue;
    const candidates=spare.get(token.norm);
    if(candidates?.length){
      const other=user[candidates.shift()];
      token.status=other.status='order';token.user=other.text;other.ref=token.text;
      note('order',token.text,other.text);
    }
  }
  for(const token of ref)if(token.status==='missing')note(token.word?'missing':'punctuation',token.text,'');
  for(const token of user)if(token.status==='extra')note(token.word?'extra':'punctuation','',token.text);
  const counts={correct:0,misspelled:0,missing:0,extra:0,order:0,total:ref.length};
  for(const token of ref)counts[token.status]++;
  counts.extra=user.filter(token=>token.status==='extra').length;
  const points=counts.correct+0.5*counts.misspelled+0.5*counts.order-0.5*counts.extra;
  const exact=counts.correct===ref.length&&counts.extra===0&&ref.length>0;
  let percent;
  if(!ref.length)percent=user.length?0:100;
  else percent=percentOf(points,ref.length,exact);
  const list=[...errors.values()].sort((a,b)=>ERROR_KINDS.indexOf(a.kind)-ERROR_KINDS.indexOf(b.kind));
  return {percent,points,counts,ref,user,errors:list,strict,exact};
}

/** The text split into pieces for display: [{text,status?}] with the separators between tokens kept as plain pieces. */
export function annotate(text,tokens){
  const pieces=[],value=cleanText(text);
  let offset=0;
  for(const token of tokens){
    if(token.start>offset)pieces.push({text:value.slice(offset,token.start)});
    pieces.push({text:value.slice(token.start,token.end),status:token.status,kind:token.kind,hint:token.user??token.ref});
    offset=token.end;
  }
  if(offset<value.length)pieces.push({text:value.slice(offset)});
  return pieces;
}

/**
 * Scores a whole dictation. 'text' mode compares the text as one piece; 'sentences' mode compares each sentence with its own input
 * and adds the results up. Returns {percent,counts,errors,units|null,whole|null}.
 */
export function scoreDictation(sentences,inputs,mode,{strict=false}={}){
  const merge=lists=>{
    const merged=new Map();
    for(const list of lists)for(const e of list){
      if(!merged.has(e.kind))merged.set(e.kind,{kind:e.kind,count:0,examples:[]});
      const entry=merged.get(e.kind);entry.count+=e.count;
      for(const ex of e.examples)if(entry.examples.length<4)entry.examples.push(ex);
    }
    return [...merged.values()].sort((a,b)=>ERROR_KINDS.indexOf(a.kind)-ERROR_KINDS.indexOf(b.kind));
  };
  if(mode==='text'){
    const whole=compareDictation(sentences.map(s=>s.da).join(' '),inputs.all||'',{strict});
    if(whole.tooLong)return {tooLong:true,percent:0,counts:whole.counts,errors:[],units:null,whole:null};
    return {percent:whole.percent,counts:whole.counts,errors:whole.errors,units:null,whole};
  }
  const units=sentences.map((s,i)=>compareDictation(s.da,inputs[i]||'',{strict}));
  if(units.some(u=>u.tooLong))return {tooLong:true,percent:0,counts:{correct:0,misspelled:0,missing:0,extra:0,order:0,total:0},errors:[],units:null,whole:null};
  const counts={correct:0,misspelled:0,missing:0,extra:0,order:0,total:0};
  let points=0;
  for(const u of units){for(const key of Object.keys(counts))counts[key]+=u.counts[key];points+=u.points;}
  const percent=counts.total?percentOf(points,counts.total,units.every(u=>u.exact||!u.ref.length&&!u.user.length)):100;
  return {percent,counts,errors:merge(units.map(u=>u.errors)),units,whole:null};
}
