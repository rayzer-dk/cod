import test from 'node:test';
import assert from 'node:assert/strict';
import {adjectiveForms, comparisonLessons} from '../dist/forms-data.mjs';
import {lessons, lessonById, getCatalog} from '../dist/course.mjs';
import {renderReference} from '../dist/reference-view.mjs';
import {createState, normalize} from '../dist/engine.mjs';
import {createTasks, checkTask} from '../dist/learning.mjs';

const by = Object.fromEntries(adjectiveForms.map(a => [a.positive, a]));

test('comparison table: more than a hundred unique rows, all with forms, translation, note and class', () => {
  assert.ok(adjectiveForms.length >= 100);
  assert.equal(new Set(adjectiveForms.map(a => a.positive)).size, adjectiveForms.length);
  assert.equal(new Set(adjectiveForms.map(a => a.id)).size, adjectiveForms.length);
  for (const a of adjectiveForms) {
    assert.match(a.wordClass, /^(adjective|adverb|quantity)$/);
    for (const key of ['positive', 'comparative', 'superlative', 'ru', 'note']) assert.ok(a[key].trim(), `${a.id} ${key}`);
    assert.doesNotMatch(`${a.positive}${a.comparative}${a.superlative}`, /[А-Яа-я]/);
    assert.notEqual(a.comparative, a.positive);
  }
});

test('comparison table: the frequent irregular and special forms are right', () => {
  const forms = Object.fromEntries(Object.entries(by).map(([k, a]) => [k, [a.comparative, a.superlative]]));
  const expected = {god: ['bedre', 'bedst'], dårlig: ['værre', 'værst'], stor: ['større', 'størst'], lille: ['mindre', 'mindst'], gammel: ['ældre', 'ældst'],
    høj: ['højere', 'højest'], lav: ['lavere', 'lavest'], tidlig: ['tidligere', 'tidligst'], ung: ['yngre', 'yngst'], lang: ['længere', 'længst'],
    mange: ['flere', 'flest'], meget: ['mere', 'mest'], lidt: ['mindre', 'mindst'], gerne: ['hellere', 'helst'], nær: ['nærmere', 'nærmest'], fjern: ['fjernere', 'fjernest'],
    tung: ['tungere', 'tungest'], tyk: ['tykkere', 'tykkest'], tynd: ['tyndere', 'tyndest'], nem: ['nemmere', 'nemmest'], svær: ['sværere', 'sværest'], tæt: ['tættere', 'tættest'],
    sjælden: ['sjældnere', 'sjældnest'], sikker: ['sikrere', 'sikrest'], smuk: ['smukkere', 'smukkest'], pæn: ['pænere', 'pænest'], kold: ['koldere', 'koldest'], varm: ['varmere', 'varmest'],
    kort: ['kortere', 'kortest'], dyr: ['dyrere', 'dyrest'], billig: ['billigere', 'billigst'], smal: ['smallere', 'smallest'], tør: ['tørrere', 'tørrest'], ny: ['nyere', 'nyest'],
    ofte: ['oftere', 'oftest'], længe: ['længere', 'længst'], spændende: ['mere spændende', 'mest spændende'], praktisk: ['mere praktisk', 'mest praktisk'], populær: ['mere populær', 'mest populær'],
    dansk: ['mere dansk', 'mest dansk'], kendt: ['mere kendt', 'mest kendt'], tilfreds: ['mere tilfreds', 'mest tilfreds']};
  for (const [word, pair] of Object.entries(expected)) assert.deepEqual(forms[word], pair, word);
  for (const w of ['gerne', 'ofte', 'sjældent', 'snart', 'længe', 'langt']) assert.equal(by[w].wordClass, 'adverb', w);
  assert.ok(Object.values(by).filter(a => a.comparative.startsWith('mere ')).length >= 10, 'mere / mest formations are present');
});

test('comparison reference: every form of every row has its own audio button and the class badge is correct', () => {
  const ctx = (page, extra = {}) => ({state: createState(), referenceTab: 'adjectives', referenceCategory: 'all', referenceQuery: '', referencePage: page,
    referenceData: {adjectives: adjectiveForms, verbs: [], common: [], categories: [], families: [], informal: []}, referenceLessons: {forms: [], quantity: comparisonLessons, particles: []}, ...extra});
  const html = renderReference(ctx(1, {referenceQuery: 'gerne'}), () => '');
  for (const form of ['gerne', 'hellere', 'helst']) assert.match(html, new RegExp(`data-action="speak-text"[^>]*data-text="${form}"`));
  assert.match(html, /Наречие · adverbium/);
  const quantity = renderReference(ctx(1, {referenceQuery: 'mange'}), () => '');
  assert.match(quantity, /Количество/);
  const adjective = renderReference(ctx(1, {referenceQuery: 'smuk'}), () => '');
  assert.match(adjective, /Прилагательное · adjektiv/);
  assert.doesNotMatch(adjective, /stod|antonym-say/);
});

test('comparison practice: "choose the form" lessons are part of the course and solvable in every mode', () => {
  assert.equal(comparisonLessons.length, 2);
  for (const l of comparisonLessons) {
    assert.ok(lessons.includes(l)); assert.equal(lessonById[l.id], l);
    assert.ok(l.items.length >= 8);
    for (const it of l.items) {
      assert.equal(it.gap.options.length, 4); assert.equal(new Set(it.gap.options.map(normalize)).size, 4);
      assert.equal(it.gap.options.filter(o => normalize(it.gap.text.replace('___', o)) === normalize(it.da)).length, 1, it.id);
      assert.ok(it.formHelp.length >= 3);
    }
  }
  const catalog = getCatalog(createState());
  for (const mode of ['easy', 'mixed', 'expert']) for (const l of comparisonLessons) {
    const tasks = createTasks(l.items.map(it => catalog[it.id]), Object.values(catalog), mode);
    assert.equal(tasks.length, l.items.length);
    for (const t of tasks) if (t.kind === 'gap') assert.ok(t.options.length ? t.options.length >= 2 : true);
  }
});
