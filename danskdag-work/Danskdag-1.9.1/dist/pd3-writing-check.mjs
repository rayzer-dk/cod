// Mechanical checks of a written text (word count, linking words, sentence length, repetition). Not an assessment of quality.
export const countWords=value=>String(value??'').split(/\s+/).filter(token=>/[\p{L}\p{N}]/u.test(token)).length;
const LETTERS='[\\p{L}\\p{N}]';
const escape=value=>value.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');

/** 'low' below the minimum, 'high' above the maximum, otherwise 'ok'. */
export function lengthLevel(words,min,max){return words<min?'low':words>max?'high':'ok';}

export function analyzeWriting(text,connectors=[],{minWords=0,maxWords=Infinity}={}){
  const value=String(text??''),lower=value.toLowerCase(),words=countWords(value);
  const found=[];
  let occurrences=0;
  for(const connector of connectors){
    const matches=lower.match(new RegExp(`(?<!${LETTERS})${escape(connector).replace(/\s+/g,'\\s+')}(?!${LETTERS})`,'gu'));
    if(matches){found.push(connector);occurrences+=matches.length;}
  }
  const sentences=value.split(/[.!?…]+(?:\s+|$)|\n{2,}/u).filter(part=>/[\p{L}\p{N}]/u.test(part));
  const tokens=(lower.match(/[\p{L}\p{N}]+(?:['’-][\p{L}\p{N}]+)*/gu)||[]).filter(word=>word.length>=4&&!connectors.includes(word));
  const counts=new Map();
  for(const word of tokens)counts.set(word,(counts.get(word)||0)+1);
  const repeated=tokens.length?1-counts.size/tokens.length:0;
  const top=[...counts.entries()].filter(([,n])=>n>1).sort((a,b)=>b[1]-a[1]||a[0].localeCompare(b[0],'da')).slice(0,5).map(([word,count])=>({word,count}));
  return {
    words,level:lengthLevel(words,minWords,maxWords),sentences:sentences.length,
    averageSentence:sentences.length?Math.round(words/sentences.length*10)/10:0,
    connectors:found,connectorOccurrences:occurrences,repeatShare:Math.round(repeated*100),topRepeats:top
  };
}
