import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {searchKey,referencePage} from '../dist/reference-tools.mjs';
import {findFamilies} from '../dist/wordlab.mjs';
import {normalize,isCorrect} from '../dist/engine.mjs';
import {getCatalog,getWordEntries} from '../dist/course.mjs';
import {createState} from '../dist/engine.mjs';

const rows=[{da:'højtryksrenser',ru:'мойка высокого давления'},{da:'æble',ru:'яблоко'},{da:'en å',ru:'речка'},{da:'ægte',ru:'настоящий'},{da:'bil',ru:'машина'},{da:'poet',ru:'поэт'},{da:'bør',ru:'следует'}];
const found=query=>referencePage(rows,query,1,40).items.map(r=>r.da);

test('L11: Danish diacritics are folded for searching, in both the query and the text',()=>{
 assert.deepEqual(found('hojtryksrenser'),['højtryksrenser']);
 assert.deepEqual(found('hoejtryksrenser'),['højtryksrenser']);
 assert.deepEqual(found('højtryksrenser'),['højtryksrenser']);
 assert.deepEqual(found('aeble'),['æble']);
 assert.deepEqual(found('æble'),['æble']);
 assert.deepEqual(found('aegte'),['ægte']);
 assert.ok(found('aa').includes('en å'));assert.ok(found('a').includes('en å'));assert.ok(found('å').includes('en å'));
 assert.deepEqual(found('en aa'),['en å']);
 assert.deepEqual(found('bor'),['bør']);
 assert.deepEqual(found('poet'),['poet'],'oe folds on both sides, nothing else matches');
 assert.deepEqual(found('xyz'),[]);
 // An empty query does not filter (and does not match by accident).
 assert.equal(found('').length,rows.length);assert.equal(found('   ').length,rows.length);
 assert.equal(searchKey(''),'');
 assert.equal(searchKey('Højtryksrenser ÆBLE Å'),'hojtryksrenser aeble a');
 assert.equal(searchKey('a‎æ'),'aae');
});

test('L11: the word lab search finds Danish words typed without special letters',()=>{
 assert.ok(findFamilies('gar').some(f=>f.title==='går'));
 assert.ok(findFamilies('gaar').some(f=>f.title==='går'));
 assert.ok(findFamilies('går').some(f=>f.title==='går'));
 assert.equal(findFamilies('').length,findFamilies('   ').length);
});

test('L11: the dictionary search uses the same folding',()=>{
 const source=fs.readFileSync(new URL('../dist/app.mjs',import.meta.url),'utf8');
 assert.match(source,/searchKey\(`\$\{p\.da\} \$\{p\.ru\} \$\{p\.note\|\|''\}`\)\.includes\(searchKey\(query\)\)/);
 const entries=getWordEntries(createState());
 const target=entries.find(p=>p.da==='ødelagt');
 assert.ok(target);
 assert.ok(searchKey(`${target.da} ${target.ru}`).includes(searchKey('odelagt')));
});

test('L11: answers are still checked strictly: å is not aa, ø is not o, æ is not ae',()=>{
 assert.equal(isCorrect('blaa',['blå']),false);assert.equal(isCorrect('blå',['blaa']),false);
 assert.equal(isCorrect('hojtryksrenser',['højtryksrenser']),false);
 assert.equal(isCorrect('aeble',['æble']),false);
 assert.equal(isCorrect('højtryksrenser',['højtryksrenser']),true);
 assert.notEqual(normalize('aa'),normalize('å'));assert.notEqual(normalize('oe'),normalize('ø'));assert.notEqual(normalize('ae'),normalize('æ'));
});
