import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {renderReference} from '../dist/reference-view.mjs';
import {renderAntonyms, runView, pairCard} from '../dist/antonym-view.mjs';
import {antonymPairs, antonymThemes} from '../dist/antonym-data.mjs';
import {referenceTabs} from '../dist/reference-tools.mjs';
import * as P from '../dist/antonym-practice.mjs';
import {createState} from '../dist/engine.mjs';

const context = (extra = {}) => ({state: createState(), referenceTab: 'antonyms', referenceCategory: 'all', referenceQuery: '', referencePage: 1,
  referenceData: {antonyms: antonymPairs, antonymThemes, verbs: [], adjectives: [], common: [], categories: [], families: [], informal: []}, referenceLessons: {forms: [], quantity: [], particles: []}, ...extra});
const seeded = seed => () => (seed = (seed * 1664525 + 1013904223) % 4294967296) / 4294967296;

test('the tab exists next to the comparison tab and renders ten pairs per page with audio for every word', () => {
  const ids = referenceTabs.map(t => t[0]);
  assert.equal(ids.indexOf('antonyms'), ids.indexOf('adjectives') + 1);
  const html = renderReference(context(), () => '');
  assert.equal((html.match(/class="antonym-card"/g) || []).length, 10);
  assert.match(html, /aria-pressed="true">Противоположности/);
  const first = antonymPairs[0];
  for (const text of [first.a.da, first.b.da, first.exampleA.da, first.exampleB.da]) assert.match(html, new RegExp(`data-action="speak-text"[^>]*data-text="${text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}"`));
  assert.match(html, /data-action="ant-add"[^>]*data-pair="ant-stor-lille"/);
  assert.match(html, /data-action="ant-start" data-value="choose"/);
  assert.match(html, /data-action="ant-start" data-value="write"/);
  assert.match(html, /data-action="ant-start" data-value="match"/);
  assert.match(html, /id="reference-search"/);
});

test('search and theme filter reach the list; unrelated text finds nothing', () => {
  const found = renderReference(context({referenceQuery: 'hojtryksrenser-like hoj'.slice(-3)}), () => '');
  assert.match(found, /data-pair="ant-hoej-lav"/);
  const none = renderReference(context({referenceQuery: 'qqqq'}), () => '');
  assert.match(none, /Ничего не найдено/);
  const verbs = renderReference(context({referenceCategory: 'verbs'}), () => '');
  assert.match(verbs, /Глаголы-антонимы/);
  assert.doesNotMatch(verbs, /data-pair="ant-stor-lille"/);
  assert.match(verbs, /data-theme="verbs"/);
});

test('stød mark and approximate pronunciation appear only for flagged words', () => {
  const html = renderAntonyms({items: antonymPairs}, {referenceCategory: 'all'});
  const marks = (html.match(/class="antonym-stod"/g) || []).length;
  assert.equal(marks, antonymPairs.flatMap(p => [p.a, p.b]).filter(w => w.stod).length);
  assert.equal((html.match(/class="antonym-say"/g) || []).length, antonymPairs.flatMap(p => [p.a, p.b]).filter(w => w.say).length);
  assert.match(html, /≈ хойь/);
  assert.match(html, /stød и мягкое d на письме не передаются|Stød и мягкое d на письме не передаются/i);
  const card = pairCard(antonymPairs.find(p => p.id === 'ant-lille-stor') || antonymPairs[0]);
  assert.doesNotMatch(card, /undefined|NaN/);
});

test('words already in the dictionary are shown as added', () => {
  const pair = antonymPairs.find(p => p.id === 'ant-koebe-saelge');
  const html = pairCard(pair, da => da === 'at købe');
  assert.match(html, /class="remember-button antonym-add active"[^>]*data-side="a"[^>]*aria-pressed="true" disabled/);
  assert.match(html, /data-side="b"[^>]*aria-pressed="false" >/);
});

test('trainer screens: field attributes, æøå keys, option audio, no leaking answer before answering', () => {
  const write = runView(P.startRun({mode: 'write', rng: seeded(1)}));
  const input = /<input id="ant-answer"[^>]*>/.exec(write)[0];
  for (const [name, value] of [['lang', 'da'], ['autocapitalize', 'none'], ['autocorrect', 'off'], ['spellcheck', 'false'], ['autocomplete', 'off'], ['enterkeyhint', 'done']]) assert.match(input, new RegExp(`\\s${name}="${value}"`), name);
  assert.deepEqual([...write.matchAll(/data-action="ant-letter" data-letter="(.)"/g)].map(m => m[1]), ['æ', 'ø', 'å']);
  const choose = P.startRun({mode: 'choose', rng: seeded(2)}), html = runView(choose);
  assert.equal((html.match(/data-action="ant-choose"/g) || []).length, 4);
  assert.equal((html.match(/class="icon-button inline-audio"/g) || []).length, 4, 'every option can be heard');
  assert.doesNotMatch(html, /answer-option [^"]*correct/);
  assert.doesNotMatch(html, /class="answer-feedback/);
  const right = P.sideWord(P.getPair(choose.questions[0].pairId), P.otherSide(choose.questions[0].promptSide));
  const answered = runView(P.choose(choose, right.lemma));
  assert.match(answered, /answer-option [^"]*correct/);
  assert.match(answered, /data-action="ant-next"/);
  const match = runView(P.startRun({mode: 'match', rng: seeded(3)}));
  assert.equal((match.match(/data-action="ant-tap"/g) || []).length, 10);
  assert.match(match, /role="status">Найдено 0 из 5/);
});

test('result screen lists results by theme', () => {
  let run = P.startRun({mode: 'choose', theme: 'time', count: 3, rng: seeded(6)});
  while (!run.done) { const q = run.questions[run.index]; run = P.next(P.choose(run, P.sideWord(P.getPair(q.pairId), P.otherSide(q.promptSide)).lemma)); }
  const html = runView(run);
  assert.match(html, /\+30/); assert.match(html, /Время и частота/); assert.match(html, /3 \/ 3/);
});

test('the app wires the trainer in a way that keeps the shared handlers intact', () => {
  const app = fs.readFileSync(new URL('../dist/app.mjs', import.meta.url), 'utf8');
  assert.match(app, /action\?\.startsWith\('ant-'\)&&antonym\.click\(el\)/);
  assert.match(app, /antonym\.running&&antonym\.keydown\(event\)/);
  assert.match(app, /finishSession\(state,\{id:event\.id,lessonId:null/);
  assert.match(app, /vocab:pd3Vocab/);
});
