import test from 'node:test';
import assert from 'node:assert/strict';
import {antonymPairs, antonymThemes, antonymConfusable, antonymAlso, sound} from '../dist/antonym-data.mjs';
import {referencePage, referenceSelection, searchKey} from '../dist/reference-tools.mjs';
import {normalize} from '../dist/engine.mjs';

const words = antonymPairs.flatMap(p => [p.a, p.b]);
const cyrillic = /[А-Яа-яЁё]/;

test('antonym data: about 160 pairs in eight themes, unique ids, no duplicated pair or word', () => {
  assert.ok(antonymPairs.length >= 150 && antonymPairs.length <= 175);
  assert.equal(antonymThemes.length, 8);
  assert.equal(new Set(antonymPairs.map(p => p.id)).size, antonymPairs.length);
  for (const theme of antonymThemes) assert.ok(antonymPairs.filter(p => p.theme === theme.id).length >= 10, theme.id);
  const forms = words.map(w => normalize(w.da));
  assert.equal(new Set(forms).size, forms.length, 'each Danish word stands in one pair only');
  const pairs = antonymPairs.map(p => [normalize(p.a.da), normalize(p.b.da)].sort().join('|'));
  assert.equal(new Set(pairs).size, pairs.length);
  for (const p of antonymPairs) assert.notEqual(normalize(p.a.da), normalize(p.b.da));
});

test('antonym data: Danish fields hold no Cyrillic, Russian fields do', () => {
  for (const p of antonymPairs) {
    for (const text of [p.a.da, p.b.da, p.a.lemma, p.b.lemma, p.exampleA.da, p.exampleB.da]) assert.doesNotMatch(text, cyrillic, p.id);
    for (const text of [p.a.ru, p.b.ru, p.exampleA.ru, p.exampleB.ru]) assert.match(text, cyrillic, p.id);
    for (const text of [p.a.da, p.b.da, p.exampleA.da, p.exampleB.da]) assert.ok(text.trim() && !/\s{2,}/.test(text), p.id);
  }
});

test('antonym data: nouns carry en/et, verbs carry "at", other words carry neither', () => {
  for (const p of antonymPairs) for (const w of [p.a, p.b]) {
    if (p.pos === 'noun') { assert.match(w.da, /^(en|et) \S/, w.da); assert.ok(['en', 'et'].includes(w.article)); assert.equal(w.da, `${w.article} ${w.lemma}`); }
    else if (p.pos === 'verb') { assert.match(w.da, /^at \S/, w.da); assert.equal(w.inf, 'at'); assert.equal(w.da, `at ${w.lemma}`); }
    else { assert.doesNotMatch(w.da, /^(en|et|at) /, w.da); assert.equal(w.lemma, w.da); assert.equal(w.article, undefined); }
  }
  assert.equal(antonymPairs.find(p => p.id === 'ant-fordel-ulempe').a.article, 'en');
  assert.equal(antonymPairs.find(p => p.id === 'ant-flertal-mindretal').a.article, 'et');
  assert.deepEqual([...new Set(antonymPairs.map(p => p.pos))].sort(), ['adj', 'adv', 'noun', 'verb']);
});

test('antonym data: each example sentence contains its word (in some form) and the pair is not its own example', () => {
  const stem = w => normalize(w.lemma).replace(/^(en|et|at) /, '').split(' ')[0].slice(0, Math.max(2, Math.min(4, w.lemma.length - 1)));
  const missing = [];
  for (const p of antonymPairs) for (const [w, ex] of [[p.a, p.exampleA], [p.b, p.exampleB]]) if (!normalize(ex.da).includes(stem(w))) missing.push(`${p.id}: ${w.lemma} / ${ex.da}`);
  assert.deepEqual(missing, []);
});

test('antonym data: pronunciation help exists only for listed words and stays modest', () => {
  const lemmas = new Set(words.map(w => w.lemma));
  for (const key of Object.keys(sound)) assert.ok(lemmas.has(key), key);
  const withSay = words.filter(w => w.say);
  assert.ok(withSay.length >= 3 && withSay.length <= 12);
  for (const w of withSay) { assert.match(w.say, /^[а-яё]+$/, w.lemma); assert.equal(w.stod, true); }
  // stød is stated only where it is certain; clear examples: høj, mand have it; man, hun are not in the data and never marked.
  const byLemma = Object.fromEntries(words.map(w => [w.lemma, w]));
  assert.equal(byLemma.høj.stod, true); assert.equal(byLemma.mand.stod, true);
  for (const lemma of ['lille', 'gammel', 'sort', 'rolig', 'købe', 'tage', 'give']) assert.ok(!byLemma[lemma]?.stod, lemma);
  assert.equal(byLemma.høj.say, 'хойь');
});

test('antonym data: confusable and accepted-answer tables only name words of the data', () => {
  const lemmas = new Set(words.map(w => normalize(w.lemma)));
  for (const group of antonymConfusable) { assert.ok(group.length >= 2); for (const w of group) assert.ok(lemmas.has(normalize(w)), w); }
  for (const key of Object.keys(antonymAlso)) assert.ok(lemmas.has(key), key);
});

test('antonym search: Danish letters fold (hojtryksrenser-style), Russian and word forms are found', () => {
  const find = query => referencePage(antonymPairs, query, 1, 200).items.map(p => p.id);
  assert.ok(find('hoj').includes('ant-hoej-lav'), 'hoj finds høj');
  assert.ok(find('HØJ').includes('ant-hoej-lav'));
  assert.ok(find('taet paa').includes('ant-taet-paa-langt-vaek'), 'aa and ae fold');
  assert.ok(find('tæt på').includes('ant-taet-paa-langt-vaek'));
  assert.ok(find('forar').includes('ant-foraar-efteraar'), 'å and aa fold both ways');
  assert.ok(find('зелёный слон').length === 0, 'Russian only matches real text');
  assert.ok(find('дружба').includes('ant-venskab-fjendskab'));
  assert.ok(find('et fjendskab').includes('ant-venskab-fjendskab'));
  assert.equal(searchKey('Høj'), searchKey('hoj'));
  // internal fields are not searchable: nobody finds all pairs by typing "adj" or a theme id
  assert.ok(find('qualities').length === 0 && find('noun').length < antonymPairs.length);
});

test('antonym tab: the reference selection filters by theme and exposes the themes', () => {
  const context = {referenceTab: 'antonyms', referenceCategory: 'verbs', referenceQuery: '', referencePage: 1, referenceData: {antonyms: antonymPairs, antonymThemes}};
  const selection = referenceSelection(context);
  assert.equal(selection.tab, 'antonyms');
  assert.deepEqual(selection.filters.map(f => f[0]), antonymThemes.map(t => t.id));
  assert.ok(selection.rows.length > 10 && selection.rows.every(p => p.theme === 'verbs'));
  assert.equal(referenceSelection({...context, referenceCategory: 'all'}).rows.length, antonymPairs.length);
  assert.equal(referenceSelection({...context, referenceCategory: 'nonsense'}).selected, 'all');
});
