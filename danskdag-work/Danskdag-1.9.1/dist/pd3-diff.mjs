// Word-level comparison of a dictation with its reference text (pure functions, no DOM).
// Words are aligned with a weighted edit distance, so one missing word does not turn everything after it into an error.
const TOKEN=/([\p{L}\p{N}]+(?:['’-][\p{L}\p{N}]+)*)|([.,;:!?…«»"“”„()–—])/gu;
const MAX_TOKENS=700;

export const ERROR_KINDS=['aeoa','double','silent','ending','case','other','punctuation','missing','extra','order'];

/** Tokens with positions. Without `strict` only words (lowercase); with it also punctuation marks and exact letter case. */
export function tokenize(text,{strict=false}={}){
  const tokens=[];
  for(const match of String(text??'').normalize('NFC').matchAll(TOKEN)){
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
function nearMiss(r,u){
  if(!r.word||!u.word)return false;
  const a=r.norm.toLowerCase(),b=u.norm.toLowerCase();
  return levenshtein(a,b)<=limitFor(a)||SKELETON(a)===SKELETON(b);
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
    else if(nearMiss(r,u)){best=cost[(i-1)*width+j-1]+0.5+0.1*levenshtein(r.norm.toLowerCase(),u.norm.toLowerCase());move=4;}
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

/**
 * Compares the reference text with what was typed.
 * Result: {percent,counts,ref,user,errors}. ref/user are token lists with a `status`
 * (correct | misspelled | missing | extra | order) and positions in the original strings.
 */
export function compareDictation(reference,input,{strict=false}={}){
  const ref=tokenize(reference,{strict}),user=tokenize(input,{strict});
  if(ref.length>MAX_TOKENS||user.length>MAX_TOKENS){
    throw new RangeError('Text is too long to compare');
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
  let percent;
  if(!ref.length)percent=user.length?0:100;
  else{
    const points=counts.correct+0.5*counts.misspelled+0.5*counts.order-0.5*counts.extra;
    percent=Math.round(100*Math.min(1,Math.max(0,points/ref.length)));
  }
  const list=[...errors.values()].sort((a,b)=>ERROR_KINDS.indexOf(a.kind)-ERROR_KINDS.indexOf(b.kind));
  return {percent,counts,ref,user,errors:list,strict,exact:counts.correct===ref.length&&counts.extra===0&&ref.length>0};
}

/** The text split into pieces for display: [{text,status?}] with the separators between tokens kept as plain pieces. */
export function annotate(text,tokens){
  const pieces=[],value=String(text??'').normalize('NFC');
  let offset=0;
  for(const token of tokens){
    if(token.start>offset)pieces.push({text:value.slice(offset,token.start)});
    pieces.push({text:value.slice(token.start,token.end),status:token.status,kind:token.kind,hint:token.user??token.ref});
    offset=token.end;
  }
  if(offset<value.length)pieces.push({text:value.slice(offset)});
  return pieces;
}
