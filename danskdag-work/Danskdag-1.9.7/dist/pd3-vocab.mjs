// Words of a PD3 reading text -> the learner's own words (state.customWords). Pure functions; the app owns the state.
import {normalize} from './engine.mjs';

/** Key for "is this word already in the dictionary": lower case, no leading article or "at"/"å". */
export const vocabKey=da=>normalize(da).replace(/^(?:at|å|en|et)\s+/,'').replace(/\s+/g,' ').trim();

const letters=text=>String(text).toLowerCase().normalize('NFC').match(/[\p{L}]+/gu)||[];
/** The first sentence of the text that contains the word or phrase (also in an inflected form), as "Danish — translation"; '' if none fits.
 * A word matches by its stem (the word without its last two letters, at least three letters); every word of a phrase must be found. */
export function vocabExample(da,sentences){
  const core=letters(String(da).replace(/\b(?:noget|nogen)\b/gi,'')).filter((word,index)=>!(index===0&&['at','en','et','å'].includes(word))&&word.length>=3);
  if(!core.length)return '';
  const stems=core.map(word=>word.length>=5?word.slice(0,word.length-2):word);
  for(const sentence of sentences||[]){
    const text=letters(sentence.da).join(' ');
    if(stems.every(stem=>text.includes(stem))){
      const example=sentence.ru?`${sentence.da} — ${sentence.ru}`:sentence.da;
      return example.slice(0,500);
    }
  }
  return '';
}

/** The new own words for `words` ({da,ru,note}), skipping those whose key is in `existing` (a Set of vocabKey values) or repeats inside the list.
 * Returns {words,added,skipped,full}; `words` are ready for state.customWords (association empty). */
export function newOwnWords(words,existing,currentCount=0,makeId=()=>`u-${Date.now().toString(36)}-${Math.random().toString(36).slice(2,9)}`,limit=1000){
  const keys=new Set(existing),created=[];
  let skipped=0,full=false;
  for(const word of words){
    const key=vocabKey(word.da);
    if(!key||keys.has(key)){skipped++;continue;}
    if(currentCount+created.length>=limit){full=true;break;}
    keys.add(key);
    created.push({id:makeId(),da:String(word.da).slice(0,220),ru:String(word.ru).slice(0,300),note:String(word.note||'').slice(0,500),association:''});
  }
  return {words:created,added:created.length,skipped,full};
}
