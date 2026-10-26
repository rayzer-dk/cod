import test from 'node:test';
import assert from 'node:assert/strict';
import {verbForms, adjectiveForms, formLessons} from '../dist/forms-data.mjs';
import {isCorrect, normalize} from '../dist/engine.mjs';
import {createTasks} from '../dist/learning.mjs';

test('verb reference contains explicit, identified forms and contextual auxiliaries', () => {
  assert.ok(verbForms.length >= 100);
  assert.equal(new Set(verbForms.map(v => v.id)).size, verbForms.length);
  assert.equal(new Set(verbForms.map(v => v.infinitive)).size, verbForms.length);
  for (const v of verbForms) {
    for (const key of ['id', 'infinitive', 'present', 'past', 'participle', 'ru', 'group']) {
      assert.equal(typeof v[key], 'string', `${v.id}: ${key}`);
      assert.ok(v[key].trim(), `${v.id}: ${key} is missing`);
    }
    assert.equal(typeof v.imperative, 'string');
    assert.ok(['har', 'er', 'har/er'].includes(v.auxiliary), v.infinitive);
    if (v.auxiliary === 'har/er') assert.ok(v.note?.toLowerCase().includes('har') && v.note?.toLowerCase().includes('er'), v.infinitive);
    if (v.group === 'modal') assert.equal(v.imperative, '');
  }
});

test('irregular forms and movement auxiliaries retain the reviewed distinctions', () => {
  const byVerb = Object.fromEntries(verbForms.map(v => [v.infinitive, v]));
  for (const [infinitive, present, past, participle, imperative] of [
    ['være', 'er', 'var', 'været', 'vær'],
    ['have', 'har', 'havde', 'haft', 'hav'],
    ['blive', 'bliver', 'blev', 'blevet', 'bliv'],
    ['gøre', 'gør', 'gjorde', 'gjort', 'gør'],
    ['gå', 'går', 'gik', 'gået', 'gå'],
    ['komme', 'kommer', 'kom', 'kommet', 'kom'],
    ['tage', 'tager', 'tog', 'taget', 'tag'],
    ['give', 'giver', 'gav', 'givet', 'giv'],
    ['se', 'ser', 'så', 'set', 'se'],
    ['sige', 'siger', 'sagde', 'sagt', 'sig'],
    ['finde', 'finder', 'fandt', 'fundet', 'find'],
    ['holde', 'holder', 'holdt', 'holdt', 'hold'],
    ['lede', 'leder', 'ledte', 'ledt', 'led'],
    ['lide', 'lider', 'led', 'lidt', 'lid'],
    ['ligge', 'ligger', 'lå', 'ligget', 'lig'],
    ['lægge', 'lægger', 'lagde', 'lagt', 'læg'],
    ['køre', 'kører', 'kørte', 'kørt', 'kør'],
    ['reparere', 'reparerer', 'reparerede', 'repareret', 'reparer']
  ]) {
    assert.ok(byVerb[infinitive], infinitive);
    assert.deepEqual([byVerb[infinitive].present, byVerb[infinitive].past, byVerb[infinitive].participle, byVerb[infinitive].imperative], [present, past, participle, imperative], infinitive);
  }
  assert.equal(byVerb.være.auxiliary, 'har');
  assert.equal(byVerb.komme.auxiliary, 'er');
  assert.equal(byVerb.køre.auxiliary, 'har/er');
  assert.match(byVerb.lede.note, /ledede/);
  assert.match(byVerb.lide.note, /kan lide/);
});

test('all forty source adjective rows distinguish number, quantity and legitimate variants', () => {
  assert.equal(adjectiveForms.length, 40);
  assert.equal(new Set(adjectiveForms.map(a => a.id)).size, 40);
  for (const a of adjectiveForms) {
    for (const key of ['id', 'positive', 'comparative', 'superlative', 'ru', 'note', 'wordClass']) assert.ok(typeof a[key] === 'string' && a[key].trim(), `${a.id}: ${key}`);
  }
  const byWord = Object.fromEntries(adjectiveForms.map(a => [a.positive, a]));
  assert.match(byWord.lille.note, /små/);
  for (const q of ['få', 'mange', 'meget', 'lidt']) assert.equal(byWord[q].wordClass, 'quantity');
  assert.equal(byWord.mange.comparative, 'flere');
  assert.equal(byWord.meget.comparative, 'mere');
  assert.match(byWord.dårlig.note, /dårligere/);
  assert.match(byWord.gal.comparative, /galere/);
  assert.match(byWord.gul.comparative, /gulere/);
  assert.equal(byWord.ensom.superlative, 'ensomst');
});

test('møde and dreje retain object and arrival/direction auxiliary contexts in references and help', () => {
  const meet = verbForms.find(v => v.id === 'verb-form-moede');
  const turn = verbForms.find(v => v.id === 'verb-form-dreje');
  assert.equal(meet.auxiliary, 'har/er');
  assert.match(meet.note, /har mødt en ven/i);
  assert.match(meet.note, /er mødt på arbejde/i);
  assert.equal(turn.auxiliary, 'har/er');
  assert.match(turn.note, /har drejet håndtaget/i);
  assert.match(turn.note, /er drejet til venstre/i);
  const item = formLessons.flatMap(l => l.items).find(p => p.da.includes('skal møde på arbejde'));
  assert.ok(item, 'the arrival-at-work exercise remains available');
  const perfectHelp = item.formHelp.find(h => h.label.startsWith('Førnutid'));
  const pastPerfectHelp = item.formHelp.find(h => h.label.startsWith('Førdatid'));
  assert.equal(perfectHelp.text, 'har mødt / er mødt');
  assert.equal(pastPerfectHelp.text, 'havde mødt / var mødt');
  assert.ok(item.formHelp.some(h => /har mødt en ven/i.test(h.text) && /er mødt på arbejde/i.test(h.text)));
  assert.deepEqual(item.gap.answers, ['møde']);
  assert.equal(item.gap.options.filter(o => isCorrect(o, item.gap.answers)).length, 1);
  assert.ok(isCorrect(item.gap.text.replace('___', 'møde'), item.daAnswers));
});

test('six form lessons provide one accepted option per gap and reconstruct every Danish sentence', () => {
  assert.equal(formLessons.length, 6);
  const all = formLessons.flatMap(l => l.items);
  assert.equal(all.length, 36);
  assert.equal(new Set(all.map(p => p.id)).size, 36);
  for (const l of formLessons) {
    assert.match(l.id, /^form-lesson-/);
    assert.equal(l.kind, 'grammar');
    assert.ok(['A1', 'A2', 'B1'].includes(l.level));
    assert.equal(l.items.length, 6);
    assert.ok(l.rule && l.title && l.subtitle);
    for (const p of l.items) {
      assert.equal(p.lessonId, l.id);
      assert.equal(p.type, 'gap');
      assert.ok(p.da && p.ru && p.note && p.formLabel);
      assert.equal(p.gap.text.split('___').length, 2, p.id);
      assert.equal(p.gap.answers.length, 1, p.id);
      assert.equal(p.gap.options.length, 4, p.id);
      assert.equal(new Set(p.gap.options.map(normalize)).size, 4, p.id);
      assert.equal(p.gap.options.filter(o => isCorrect(o, p.gap.answers)).length, 1, p.id);
      for (const a of p.gap.answers) assert.ok(isCorrect(p.gap.text.replace('___', a), p.daAnswers), p.id);
      assert.ok(isCorrect(p.da, p.daAnswers) && isCorrect(p.ru, p.ruAnswers), p.id);
      assert.ok(p.formHelp.length >= 4 && p.formHelp.every(h => h.label && h.text), p.id);
    }
    for (const mode of ['easy', 'mixed', 'expert']) {
      const tasks = createTasks(l.items, all, mode);
      assert.ok(tasks.every(t => t.kind === 'gap'));
      assert.equal(tasks.length, 6);
      if (mode === 'expert') assert.ok(tasks.every(t => t.options.length === 0));
      else assert.ok(tasks.every(t => t.options.filter(o => isCorrect(o, t.answers)).length === 1));
    }
  }
});
