import test from 'node:test';
import assert from 'node:assert/strict';
import {existsSync} from 'node:fs';
import {dailyLexicon} from '../dist/daily-lexicon-data.mjs';

const file = new URL('../dist/learning-contexts.mjs', import.meta.url);
const normalize = value => value.normalize('NFC').toLocaleLowerCase('da').trim().replace(/\s+/g, ' ');

test('core daily lemmas have two distinct, explicitly authored bilingual recall contexts', async () => {
  assert.ok(existsSync(file), 'authored contexts module must exist');
  const {learningContexts} = await import(file.href);
  const byId = new Map(dailyLexicon.map(entry => [entry.id, entry]));
  const ids = new Set();
  assert.ok(Object.keys(learningContexts).length >= 24);
  for (const [itemId, contexts] of Object.entries(learningContexts)) {
    const item = byId.get(itemId);
    assert.ok(item, `unknown daily lemma ${itemId}`);
    assert.ok(['A1', 'A2'].includes(item.level), itemId);
    assert.equal(contexts.length, 2, itemId);
    const sentences = new Set();
    for (const context of contexts) {
      assert.match(context.id, /^ctx-[a-z0-9-]{1,110}$/);
      assert.ok(!ids.has(context.id), `duplicate ${context.id}`);
      ids.add(context.id);
      assert.equal(context.text.split('___').length, 2, context.id);
      assert.ok(Array.isArray(context.answers) && context.answers.length > 0, context.id);
      assert.ok(context.completeDa.length <= 220 && context.completeDa.length >= 15, context.id);
      assert.match(context.ru, /[а-яё]/i);
      for (const answer of context.answers) {
        assert.ok(answer.trim().length > 0 && answer.length <= 60, context.id);
        assert.equal(normalize(context.text.replace('___', answer)), normalize(context.completeDa), context.id);
      }
      const sentence = normalize(context.completeDa);
      assert.notEqual(sentence, normalize(item.exampleDa), `${context.id} repeats the original example`);
      assert.ok(!sentences.has(sentence), `${itemId} repeats a context`);
      sentences.add(sentence);
    }
  }
});
