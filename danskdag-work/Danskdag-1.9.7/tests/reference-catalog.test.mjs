import test from 'node:test';
import assert from 'node:assert/strict';
import {createState} from '../dist/engine.mjs';
import {getCatalog,getWordEntries,lessons} from '../dist/course.mjs';
import {spokenEntries,extraInformal} from '../dist/spoken-data.mjs';
import {makeSession} from '../dist/learning.mjs';
import {dailyLexicon} from '../dist/daily-lexicon-data.mjs';
test('conversation reference is available to ordinary practice and coarse expressions stay manual',()=>{
 const state=createState(),catalog=getCatalog(state),words=getWordEntries(state);
 for(const entry of spokenEntries){assert.equal(catalog[entry.id]?.da,entry.da);assert.ok(words.some(w=>w.ids.includes(entry.id)));}
 for(const entry of extraInformal)assert.equal(catalog[entry.id],undefined);
});
test('every daily reference lemma and its context are preserved in the study catalogue',()=>{
 const catalog=getCatalog(createState());
 for(const entry of dailyLexicon){assert.equal(catalog[entry.id]?.da,entry.da);assert.equal(catalog[entry.id]?.exampleDa,entry.exampleDa);}
});
test('spoken situations have short lessons with stable progress identities',()=>{
 const grouped=lessons.filter(l=>l.id.startsWith('spoken-lesson-'));
 assert.equal(grouped.length,18);
 assert.equal(grouped.flatMap(l=>l.items).length,90);
 for(const lesson of grouped){assert.equal(lesson.kind,'conversation');assert.equal(lesson.items.length,5);assert.equal(makeSession(lesson.items,lesson.items,{lessonId:lesson.id}).initialCount,lesson.items.length);for(const item of lesson.items)assert.equal(item.lessonId,lesson.id);}
});
