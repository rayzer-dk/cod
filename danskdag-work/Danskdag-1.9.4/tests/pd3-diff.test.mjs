import test from 'node:test';
import assert from 'node:assert/strict';
import {compareDictation,tokenize,levenshtein,classifyMisspelling,annotate,cleanText} from '../dist/pd3-diff.mjs';

const statuses=tokens=>tokens.map(t=>t.status);
const kinds=result=>Object.fromEntries(result.errors.map(e=>[e.kind,e.count]));

test('an exact match is 100 percent with no errors, ignoring case and punctuation by default',()=>{
 const reference='Jeg bor i København, og jeg elsker byen.';
 for(const input of [reference,'jeg bor i københavn og jeg elsker byen','JEG BOR I KØBENHAVN, OG JEG ELSKER BYEN!!!'])
  {const r=compareDictation(reference,input);assert.equal(r.percent,100,input);assert.equal(r.exact,true);assert.deepEqual(r.errors,[]);assert.equal(r.counts.total,8);}
});

test('empty input scores zero and marks every reference word as missing',()=>{
 for(const input of ['','   ',' ,.! '])
  {const r=compareDictation('Det regner i dag.',input);assert.equal(r.percent,0);assert.deepEqual(statuses(r.ref),['missing','missing','missing','missing']);assert.equal(r.user.length,0);assert.equal(kinds(r).missing,4);assert.equal(r.exact,false);}
 assert.equal(compareDictation('','').percent,100);
 assert.equal(compareDictation('','noget').percent,0);
});

test('extra words are marked in the typed text and cost points',()=>{
 const r=compareDictation('Jeg bor i København','Jeg bor nu i København');
 assert.deepEqual(statuses(r.user),['correct','correct','extra','correct','correct']);
 assert.deepEqual(statuses(r.ref),['correct','correct','correct','correct']);
 assert.equal(r.counts.extra,1);assert.equal(r.percent,88);assert.deepEqual(kinds(r),{extra:1});
 const many=compareDictation('Hej','Hej hej hej hej hej');assert.equal(many.percent,0);
});

test('a missing word in the middle does not shift the following words',()=>{
 const r=compareDictation('Vi ses i morgen klokken otte','Vi ses morgen klokken otte');
 assert.deepEqual(statuses(r.ref),['correct','correct','missing','correct','correct','correct']);
 assert.equal(r.percent,83);
});

test('near misses are misspelled words, with the reason classified',()=>{
 const cases=[
  ['Jeg går på arbejde','Jeg gar på arbejde','aeoa'],
  ['Hun har en stor hund','Hun har en stor hunnd','double'],
  ['Han kommer også i morgen','Han komer også i morgen','double'],
  ['Han arbejdede hele dagen','Han arbejdet hele dagen','ending'],
  ['Det er en god idé','Det er en go idé','silent'],
  ['Vi spiser brød','Vi spiser brod','aeoa'],
  ['Hun er sød','Hun er soed','aeoa']
 ];
 for(const [reference,input,kind] of cases){
  const r=compareDictation(reference,input);
  assert.equal(r.counts.misspelled,1,input);assert.ok(r.errors.find(e=>e.kind===kind),input+' → '+JSON.stringify(r.errors));
  assert.ok(r.percent>=80&&r.percent<100,input+' '+r.percent);
 }
 const kept=compareDictation('Jeg læser en bog','Jeg læsr en bog');assert.equal(kept.ref[1].user,'læsr');
});

test('words that differ by more than two letters are missing plus extra, not a misspelling',()=>{
 const r=compareDictation('Jeg ser en bil','Jeg ser en hest');
 assert.equal(r.counts.misspelled,0);assert.equal(r.ref[3].status,'missing');assert.equal(r.user[3].status,'extra');
 const short=compareDictation('Jeg har en af','Jeg har en ud');assert.equal(short.counts.misspelled,0);
});

test('a word typed in the wrong place is reported as order, not as two errors',()=>{
 const r=compareDictation('Jeg kan ikke komme','Jeg ikke kan komme');
 assert.equal(r.counts.order,1);assert.equal(r.user.filter(t=>t.status==='order').length,1);assert.equal(r.counts.missing,0);
 assert.ok(r.errors.find(e=>e.kind==='order'));
 assert.ok(r.percent<100&&r.percent>=50);
});

test('Danish letters are compared exactly, and æøå in the reference are not folded in the strict result',()=>{
 const r=compareDictation('Jeg elsker smørrebrød','Jeg elsker smorrebrod');
 assert.equal(r.counts.misspelled,1);assert.equal(r.ref[2].kind,'aeoa');
 assert.equal(compareDictation('Åse bor på Ærø','åse bor på ærø').percent,100);
 assert.equal(classifyMisspelling('lære','laere'),'aeoa');
 assert.equal(classifyMisspelling('hvad','va'),'silent');
});

test('punctuation and case matter only in strict mode',()=>{
 const reference='Hej, Anna! Hvordan har du det?';
 assert.equal(compareDictation(reference,'hej anna hvordan har du det').percent,100);
 const strict=compareDictation(reference,'hej anna hvordan har du det',{strict:true});
 assert.ok(strict.percent<100);
 assert.ok(strict.errors.find(e=>e.kind==='punctuation'));
 assert.ok(strict.errors.find(e=>e.kind==='case'));
 assert.equal(compareDictation(reference,reference,{strict:true}).percent,100);
 assert.equal(compareDictation(reference,reference,{strict:true}).counts.total,tokenize(reference,{strict:true}).length);
 assert.equal(tokenize(reference).length,6);assert.equal(tokenize(reference,{strict:true}).length,9);
});

test('hyphenated words, apostrophes and numbers stay single tokens',()=>{
 assert.deepEqual(tokenize('Vi spiste by-en’s mad kl. 18').map(t=>t.text),['Vi','spiste','by-en’s','mad','kl','18']);
 assert.equal(compareDictation("Det er Anna's bog","det er anna’s bog").percent,100);
});

test('annotate keeps separators and gives each token a status for display',()=>{
 const reference='Jeg bor, ja.',r=compareDictation(reference,'Jeg boor');
 const pieces=annotate(reference,r.ref);
 assert.equal(pieces.map(p=>p.text).join(''),reference);
 assert.deepEqual(pieces.filter(p=>p.status).map(p=>p.status),['correct','misspelled','missing']);
 const typed=annotate('Jeg boor',r.user);assert.equal(typed.map(p=>p.text).join(''),'Jeg boor');assert.equal(typed.at(-1).hint,'bor');
});

test('levenshtein distances',()=>{
 assert.equal(levenshtein('','abc'),3);assert.equal(levenshtein('hund','hunde'),1);assert.equal(levenshtein('ø','o'),1);assert.equal(levenshtein('same','same'),0);
});

test('long texts are compared quickly and absurdly long ones are refused',()=>{
 const text=Array.from({length:400},(_,i)=>'ord'+i).join(' ');
 const started=performance.now();const r=compareDictation(text,text.replace('ord200','ord20'));
 assert.ok(performance.now()-started<1500);assert.equal(r.counts.misspelled,1);
 // Never throws: an absurd input gives a `tooLong` result that the page turns into a message.
 const huge=Array.from({length:3000},(_,i)=>'ord'+i).join(' ');
 let tooLong;assert.doesNotThrow(()=>{tooLong=compareDictation(huge,huge);});
 assert.equal(tooLong.tooLong,true);assert.equal(tooLong.percent,0);assert.equal(tooLong.exact,false);
});

import {scoreDictation} from '../dist/pd3-diff.mjs';
test('a whole dictation is scored by sentence or as one text',()=>{
 const sentences=[{da:'Jeg bor i by.'},{da:'Det regner i dag.'}];
 const same=scoreDictation(sentences,{0:'jeg bor i by',1:'det regner i dag'},'sentences');
 assert.equal(same.percent,100);assert.equal(same.units.length,2);assert.equal(same.counts.total,8);
 const mixed=scoreDictation(sentences,{0:'jeg bor i by',1:'det regnr'},'sentences');
 assert.equal(mixed.counts.missing,2);assert.equal(mixed.counts.misspelled,1);assert.ok(mixed.percent>50&&mixed.percent<90);
 assert.equal(scoreDictation(sentences,{},'sentences').percent,0);
 const text=scoreDictation(sentences,{all:'Jeg bor i by. Det regner i dag.'},'text');
 assert.equal(text.percent,100);assert.equal(text.whole.ref.length,8);
 assert.equal(scoreDictation(sentences,{all:''},'text').percent,0);
});

test('M1: a 750-word input is compared without throwing, also against a short reference', ()=>{
 const reference='Jeg bor i en lille by. Det regner i dag. Vi spiser middag sammen.';
 const long=Array.from({length:750},(_,i)=>'ord'+i).join(' ');
 let r;assert.doesNotThrow(()=>{r=compareDictation(reference,long);});
 assert.ok(!r.tooLong);assert.equal(r.counts.extra,750);assert.equal(r.percent,0);
 const text=Array.from({length:750},(_,i)=>'ord'+i).join(' ')+'.';
 const same=compareDictation(text,text);assert.equal(same.percent,100);assert.equal(same.exact,true);
 const strict=compareDictation(text.replace(/ /g,', '),text.replace(/ /g,', '),{strict:true});
 assert.ok(!strict.tooLong);assert.equal(strict.percent,100);
 const sentences=[{da:text}];
 const scored=scoreDictation(sentences,{all:sentences.map(s=>s.da).join(' ')},'text');
 assert.ok(!scored.tooLong);assert.equal(scored.percent,100);
 const huge=Array.from({length:3000},(_,i)=>'ord'+i).join(' ');
 assert.equal(scoreDictation([{da:huge}],{all:huge},'text').tooLong,true);
 assert.equal(scoreDictation([{da:huge}],{0:huge},'sentences').tooLong,true);
});

test('L2: invisible characters never split a word or change the text', ()=>{
 const invisible=['\u200b','\u200c','\u200d','\u200e','\u200f','\u202a','\u202b','\u202c','\u202d','\u202e','\u2060','\u2066','\u2067','\u2068','\u2069','\u00ad','\ufeff','\u061c'];
 for(const c of invisible){
  const word=`hu${c}nd`;
  assert.deepEqual(tokenize(`en ${word} løber`).map(t=>t.norm),['en','hund','løber'],'U+'+c.codePointAt(0).toString(16));
  const r=compareDictation('En hund løber.',`${c}En ${word} løber${c}.`);
  assert.equal(r.percent,100,'U+'+c.codePointAt(0).toString(16));assert.equal(r.exact,true);
 }
 assert.equal(cleanText('a\u200eb\u202ac'),'abc');
 // Annotated pieces cover exactly the cleaned text, so offsets stay consistent.
 const r=compareDictation('Jeg bor','Je\u200eg bo\u202er');
 assert.equal(annotate('Je\u200eg bo\u202er',r.user).map(p=>p.text).join(''),'Jeg bor');
});

test('L3: a dictation with any error is never shown as 100 percent', ()=>{
 const words=Array.from({length:112},(_,i)=>'ord'+String.fromCharCode(97+i%26)+String.fromCharCode(97+Math.floor(i/26)));
 const reference=words.join(' ');
 const typed=words.slice();typed[50]='ordxx';
 const one=compareDictation(reference,typed.join(' '));
 assert.equal(one.counts.total,112);assert.ok(one.percent<=99,String(one.percent));
 const twoWords=compareDictation(reference,words.slice(0,111).join(' '));
 assert.equal(twoWords.percent,99);
 const extra=compareDictation(reference,reference+' ekstra');
 assert.ok(extra.percent<=99);
 assert.equal(compareDictation(reference,reference).percent,100);
 // Across sentences, too.
 const sentences=[{da:reference},{da:'Det er godt.'}];
 const sc=scoreDictation(sentences,{0:reference,1:'Det er godtt'},'sentences');
 assert.ok(sc.percent<100);
 assert.equal(scoreDictation(sentences,{0:reference,1:'Det er godt'},'sentences').percent,100);
});
