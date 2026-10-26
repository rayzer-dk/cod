import test from 'node:test';
import assert from 'node:assert/strict';
import {existsSync} from 'node:fs';

const file = new URL('../dist/daily-lexicon-data.mjs', import.meta.url);

test('daily lexicon provides bilingual usable lemmas in daily situations', async () => {
  assert.ok(existsSync(file), 'daily lexicon module must exist');
  const {dailyCategories, dailyLexicon} = await import(file.href);
  assert.ok(dailyCategories.length >= 15 && dailyCategories.length <= 20);
  assert.ok(dailyLexicon.length >= 450 && dailyLexicon.length <= 600);
  const categories = new Set(dailyCategories.map(category => category.id));
  assert.equal(categories.size, dailyCategories.length);
  const ids = new Set();
  const lemmas = new Set();
  for (const entry of dailyLexicon) {
    assert.match(entry.id, /^everyday-[a-z0-9-]+$/);
    assert.ok(!ids.has(entry.id), `duplicate id ${entry.id}`);
    ids.add(entry.id);
    const lemma = entry.da.normalize('NFC').toLocaleLowerCase('da').trim().replace(/\s+/g, ' ');
    assert.ok(!lemmas.has(lemma), `duplicate Danish lemma ${entry.da}`);
    lemmas.add(lemma);
    for (const field of ['da', 'ru', 'wordClass', 'exampleDa', 'exampleRu']) {
      assert.equal(typeof entry[field], 'string', `${entry.id}: ${field}`);
      assert.ok(entry[field].trim().length > 0, `${entry.id}: empty ${field}`);
    }
    assert.ok(categories.has(entry.category), `${entry.id}: unknown category`);
    assert.ok(['A1', 'A2', 'B1'].includes(entry.level));
    assert.equal(entry.source, 'daily');
    assert.equal(entry.verified, true);
    assert.equal(entry.kind, 'word');
    if (entry.wordClass === 'noun') assert.match(entry.da, /^(en|et) /, entry.id);
    if (entry.wordClass === 'verb') assert.match(entry.da, /^at /, entry.id);
    assert.ok(!Object.hasOwn(entry, 'forms'), 'inflections must not be guessed');
  }
  for (const category of categories) {
    assert.ok(dailyLexicon.filter(entry => entry.category === category).length >= 15, category);
  }
  for (const lemma of ['et køleskab', 'et håndklæde', 'en gaffel', 'et apotek', 'en regning', 'en adgangskode']) {
    assert.ok(lemmas.has(lemma), `reviewed article fixture ${lemma}`);
  }
});
