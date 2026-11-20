import test from 'node:test';
import assert from 'node:assert/strict';
import {antonymPairs, antonymThemes} from '../dist/antonym-data.mjs';
import * as P from '../dist/antonym-practice.mjs';
import {finishSession, createState, normalize, validateState} from '../dist/engine.mjs';

const seeded = seed => () => (seed = (seed * 1664525 + 1013904223) % 4294967296) / 4294967296;
const answerOf = (run, q = run.questions[run.index]) => P.sideWord(P.getPair(q.pairId), P.otherSide(q.promptSide));

test('choose: ten questions, four distinct options, one right answer, no near-synonym distractors', () => {
  for (let seed = 1; seed <= 40; seed++) {
    const run = P.startRun({mode: 'choose', rng: seeded(seed)});
    assert.equal(run.questions.length, 10);
    for (const q of run.questions) {
      const pair = P.getPair(q.pairId), prompt = P.sideWord(pair, q.promptSide), right = answerOf(run, q);
      assert.equal(q.options.length, 4);
      assert.equal(new Set(q.options.map(o => o.key)).size, 4);
      assert.equal(q.options.filter(o => o.key === normalize(right.lemma)).length, 1);
      assert.ok(!q.options.some(o => o.key === normalize(prompt.lemma)));
      for (const o of q.options) {
        if (o.key === normalize(right.lemma)) continue;
        const word = antonymPairs.flatMap(p => [p.a, p.b]).find(w => normalize(w.lemma) === o.key);
        assert.ok(!P.confusable(word, right) && !P.confusable(word, prompt), `${prompt.da} -> ${right.da} vs ${word.da}`);
      }
    }
  }
});

test('choose: distractors keep the part of speech and prefer the same theme', () => {
  let sameTheme = 0, total = 0;
  for (let seed = 1; seed <= 30; seed++) {
    const run = P.startRun({mode: 'choose', rng: seeded(seed)});
    for (const q of run.questions) {
      const pair = P.getPair(q.pairId);
      for (const o of q.options) {
        const owner = antonymPairs.find(p => [p.a, p.b].some(w => normalize(w.lemma) === o.key && w.da === o.da));
        assert.equal(owner.pos, pair.pos, `${pair.id} / ${o.da}`);
        total++; if (owner.theme === pair.theme) sameTheme++;
      }
    }
  }
  assert.ok(sameTheme / total > 0.5);
  const verbsOnly = P.startRun({mode: 'choose', theme: 'verbs', rng: seeded(5)});
  assert.ok(verbsOnly.questions.every(q => P.getPair(q.pairId).theme === 'verbs'));
});

test('choose: right answer earns credit, a wrong one or a hint does not; every question is answered once', () => {
  let run = P.startRun({mode: 'choose', rng: seeded(3)});
  const q0 = run.questions[0], right = answerOf(run, q0), wrong = q0.options.find(o => o.key !== normalize(right.lemma));
  const wrongRun = P.choose(run, wrong.key);
  assert.equal(wrongRun.questions[0].correct, false);
  assert.equal(wrongRun.results.length, 1); assert.equal(wrongRun.results[0].credit, false);
  assert.equal(P.choose(wrongRun, normalize(right.lemma)).results.length, 1, 'no second answer');
  assert.equal(P.choose(run, 'not-an-option'), run);
  run = P.next(P.choose(run, normalize(right.lemma)));
  assert.equal(run.results[0].credit, true); assert.equal(run.index, 1);
  // hint removes two wrong options and removes the credit
  const hinted = P.hintChoice(run, seeded(9)), q1 = hinted.questions[1];
  assert.equal(q1.eliminated.length, 2); assert.ok(!q1.eliminated.includes(normalize(answerOf(hinted, q1).lemma)));
  const done = P.choose(hinted, normalize(answerOf(hinted, q1).lemma));
  assert.equal(done.questions[1].correct, true); assert.equal(done.questions[1].credit, false);
  assert.equal(P.choose(hinted, q1.eliminated[0]), hinted, 'removed options cannot be chosen');
});

test('write: nouns need the article, verbs accept "at" or not, case and punctuation do not matter', () => {
  const get = id => P.getPair(id);
  const ok = (id, side, text) => P.checkTyped(get(id), side, text).correct;
  assert.equal(ok('ant-fordel-ulempe', 'a', 'en ulempe'), true);
  assert.equal(ok('ant-fordel-ulempe', 'a', '  EN   Ulempe. '), true);
  assert.equal(ok('ant-fordel-ulempe', 'a', 'ulempe'), false);
  assert.equal(P.checkTyped(get('ant-fordel-ulempe'), 'a', 'ulempe').articleMissing, true);
  assert.equal(ok('ant-fordel-ulempe', 'a', 'et ulempe'), false);
  assert.equal(ok('ant-koebe-saelge', 'a', 'sælge'), true);
  assert.equal(ok('ant-koebe-saelge', 'a', 'at sælge'), true);
  assert.equal(ok('ant-koebe-saelge', 'b', 'købe'), true);
  assert.equal(ok('ant-koebe-saelge', 'a', 'saelge'), false, 'ae is not æ');
  assert.equal(ok('ant-koebe-saelge', 'a', 'sæ​lge'), true, 'invisible characters are ignored');
  assert.equal(ok('ant-stor-lille', 'a', 'Lille!'), true);
  assert.equal(ok('ant-stor-lille', 'a', ''), false);
  assert.equal(ok('ant-nem-svaer', 'b', 'let'), true, 'listed equivalent');
  assert.equal(ok('ant-nem-svaer', 'a', 'svær'), true);
  assert.equal(ok('ant-begynde-slutte', 'a', 'holde op'), true);
  assert.equal(ok('ant-taet-paa-langt-vaek', 'a', 'langt væk'), true);
  assert.equal(ok('ant-glad-trist', 'a', 'ked af det'), true);
});

test('write: hint, give up, self-check and the XP rule', () => {
  let run = P.startRun({mode: 'write', count: 4, rng: seeded(2)});
  const q = () => run.questions[run.index];
  const typedRight = () => answerOf(run).da;
  run = P.submitTyped(run, typedRight());
  assert.equal(q().credit, true);
  run = P.next(run);
  run = P.hintWrite(run); run = P.submitTyped(run, typedRight());
  assert.equal(q().correct, true); assert.equal(q().credit, false);
  run = P.next(run);
  run = P.submitTyped(run, 'zzz');
  assert.equal(q().correct, false);
  run = P.selfCheck(run);
  assert.equal(q().correct, true); assert.equal(q().credit, false); assert.equal(q().selfChecked, true);
  assert.equal(P.selfCheck(run), run, 'only once');
  run = P.next(run);
  run = P.giveUp(run);
  assert.equal(q().revealed, true); assert.equal(P.selfCheck(run), run, 'a revealed answer cannot be self-checked');
  run = P.next(run);
  assert.equal(run.done, true);
  const sum = P.summary(run);
  assert.deepEqual([sum.total, sum.correct, sum.xp, sum.percent], [4, 1, 10, 25]);
  assert.equal(sum.assisted, 3);
  assert.equal(P.submitTyped(P.startRun({mode: 'write', rng: seeded(1)}), '   ').results.length, 0, 'empty answer is not an answer');
});

test('match: two rounds of five pairs without mixed-up words; taps in either order; errors and hints cost credit', () => {
  let run = P.startRun({mode: 'match', rng: seeded(11)});
  assert.equal(run.rounds.length, 2);
  const all = run.rounds.flatMap(r => r.pairIds);
  assert.equal(all.length, 10); assert.equal(new Set(all).size, 10);
  for (const r of run.rounds) {
    assert.equal(r.pairIds.length, 5);
    for (const a of r.pairIds) for (const b of r.pairIds) if (a !== b) {
      const pa = P.getPair(a), pb = P.getPair(b);
      for (const x of [pa.a, pa.b]) for (const y of [pb.a, pb.b]) assert.ok(!P.confusable(x, y), `${x.da}/${y.da}`);
    }
  }
  const [first, second, third] = run.rounds[0].pairIds;
  run = P.tap(run, 'a', first); assert.deepEqual(run.rounds[0].selected, {side: 'a', id: first});
  run = P.tap(run, 'b', second);
  assert.ok(run.rounds[0].flash); assert.equal(run.rounds[0].matched.length, 0);
  assert.equal(run.rounds[0].mistakes[first], 1);
  run = P.tap(run, 'b', first); run = P.tap(run, 'a', first);
  assert.deepEqual(run.rounds[0].matched, [first]);
  assert.equal(run.results.at(-1).credit, false, 'a pair with a mistake earns nothing');
  run = P.tap(run, 'b', third); run = P.tap(run, 'a', third);
  assert.equal(run.results.at(-1).credit, true, 'either order works');
  run = P.tap(run, 'a', first);
  assert.equal(run.rounds[0].selected, null, 'matched pairs cannot be selected again');
  run = P.hintMatch(run); assert.ok(run.rounds[0].hint); const hinted = run.rounds[0].hint;
  run = P.tap(run, 'a', hinted); run = P.tap(run, 'b', hinted);
  assert.equal(run.results.at(-1).credit, false);
  assert.equal(P.next(run), run, 'the round is not finished');
  for (const id of run.rounds[0].pairIds.filter(i => !run.rounds[0].matched.includes(i))) { run = P.tap(run, 'a', id); run = P.tap(run, 'b', id); }
  run = P.next(run); assert.equal(run.round, 1); assert.equal(run.done, false);
  for (const id of run.rounds[1].pairIds) { run = P.tap(run, 'b', id); run = P.tap(run, 'a', id); }
  run = P.next(run); assert.equal(run.done, true);
  const sum = P.summary(run);
  assert.equal(sum.total, 10); assert.equal(sum.correct, 8); assert.equal(sum.xp, 80);
  assert.ok(sum.byTheme.every(t => antonymThemes.some(x => x.id === t.id)));
  assert.equal(sum.byTheme.reduce((n, t) => n + t.total, 0), 10);
});

test('results by theme and XP through the existing session mechanism', () => {
  let run = P.startRun({mode: 'choose', theme: 'nouns', rng: seeded(4)});
  while (!run.done) { run = P.choose(run, normalize(answerOf(run).lemma)); run = P.next(run); }
  const sum = P.summary(run);
  assert.equal(sum.byTheme.length, 1); assert.equal(sum.byTheme[0].id, 'nouns');
  assert.equal(sum.xp, 100);
  const state = finishSession(createState(), {id: run.id, lessonId: null, correct: sum.correct, total: sum.total, minutes: P.minutes(run)}, new Date('2026-10-31T10:00:00Z'));
  assert.equal(state.xp, 100); assert.equal(state.streak, 1);
  assert.doesNotThrow(() => validateState(state));
  assert.equal(finishSession(state, {id: run.id, lessonId: null, correct: 10, total: 10, minutes: 1}, new Date('2026-10-31T10:00:00Z')), state, 'the same run pays once');
  assert.match(run.id, /^[a-zA-Z0-9_-]{1,120}$/);
});

test('stats per theme are kept on the device only and tolerate broken storage', () => {
  const store = {data: {}, getItem(k) { return this.data[k] ?? null; }, setItem(k, v) { this.data[k] = v; }};
  assert.deepEqual(P.loadStats(store), {});
  P.saveStats({byTheme: [{id: 'verbs', total: 4, correct: 3}]}, store);
  P.saveStats({byTheme: [{id: 'verbs', total: 4, correct: 2}]}, store);
  assert.deepEqual(P.loadStats(store).verbs, {best: 75, runs: 2});
  store.data[P.STATS_KEY] = '{broken';
  assert.deepEqual(P.loadStats(store), {});
  assert.deepEqual(P.loadStats({getItem() { throw new Error('blocked'); }}), {});
  assert.equal(P.saveStats({byTheme: []}, {getItem() { throw new Error('blocked'); }}), null);
  store.data[P.STATS_KEY] = JSON.stringify({v: 1, themes: {verbs: {best: 500, runs: 1}, nonsense: {best: 1, runs: 1}}});
  assert.deepEqual(P.loadStats(store), {});
});
