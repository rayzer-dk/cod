import test from 'node:test';
import assert from 'node:assert/strict';
import {countWords,analyzeWriting,lengthLevel} from '../dist/pd3-writing-check.mjs';

test('words are whitespace-separated tokens that contain a letter or digit',()=>{
 assert.equal(countWords(''),0);assert.equal(countWords('Hej, Anna!  –  \n kl. 18 — ok'),5);assert.equal(countWords(null),0);
 assert.equal(countWords('by-en æ ø å'),4);
});
test('length level follows min and max',()=>{
 assert.deepEqual([lengthLevel(99,100,160),lengthLevel(100,100,160),lengthLevel(160,100,160),lengthLevel(161,100,160)],['low','ok','ok','high']);
});
test('linking words are found as whole words and phrases',()=>{
 const connectors=['fordi','selvom','på den anden side','og','men'];
 const r=analyzeWriting('Jeg kommer, fordi jeg vil. Men på  den anden side er det dyrt, og det er sandt. Fordisomhelst og mænd.',connectors,{minWords:5,maxWords:50});
 assert.deepEqual(r.connectors,['fordi','på den anden side','og','men']);
 assert.equal(r.connectorOccurrences,5);assert.equal(r.level,'ok');
});
test('sentences, average length and repetition',()=>{
 const r=analyzeWriting('Arbejde er vigtigt. Arbejde giver penge! Jeg kan lide arbejde?\n\nHer slutter teksten',[],{});
 assert.equal(r.sentences,4);assert.equal(r.words,13);assert.equal(r.averageSentence,3.3);
 assert.equal(r.topRepeats[0].word,'arbejde');assert.equal(r.topRepeats[0].count,3);assert.ok(r.repeatShare>0&&r.repeatShare<100);
 const empty=analyzeWriting('',['og']);assert.equal(empty.words,0);assert.equal(empty.sentences,0);assert.equal(empty.repeatShare,0);assert.equal(empty.level,'ok');
});
