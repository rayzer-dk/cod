import test from 'node:test';
import assert from 'node:assert/strict';

// Missing implementation is an assertion failure during the initial TDD run.
const scheduler = await import('../dist/adaptive-review.mjs').catch(error => {
  if (error.code === 'ERR_MODULE_NOT_FOUND' && error.url?.endsWith('/dist/adaptive-review.mjs')) return {};
  throw error;
});
const review = (...args) => {
  assert.equal(typeof scheduler.nextMemory, 'function', 'nextMemory must be exported');
  return scheduler.nextMemory(...args);
};
const DAY = 86400000;
const NOW = Date.parse('2026-10-25T10:00:00Z');
const previous = (stability = 10, difficulty = 5) => ({stability, difficulty, lastReview: NOW});

// Literal fixtures come from executing the pinned upstream FSRS6Algorithm;
// see docs/adaptive-review-sources.md. They are not calculated by this module.
test('first ratings initialize the FSRS-6 state and the 90% retention interval', () => {
  for (const [grade, stability, difficulty, intervalDays] of [
    [1, 0.212, 6.4133, 1],
    [2, 1.2931, 5.11217071, 1],
    [3, 2.3065, 2.11810397, 2],
    [4, 8.2956, 1, 8],
  ]) {
    assert.deepEqual(review(undefined, grade, NOW), {stability, difficulty, lastReview: NOW, intervalDays});
    assert.deepEqual(review(null, grade, NOW), review(undefined, grade, NOW));
  }
});

test('same-day ratings use the FSRS-6 short-term branch for every grade', () => {
  for (const [grade, stability, difficulty, intervalDays] of [
    [1, 3.05124894, 8.34176237, 3],
    [2, 10, 6.66599536, 10],
    [3, 10, 4.99022837, 10],
    [4, 15.53430795, 3.31446137, 16],
  ]) {
    assert.deepEqual(review(previous(), grade, NOW), {stability, difficulty, lastReview: NOW, intervalDays});
    assert.equal(review(previous(), grade, NOW + DAY - 1).stability, stability);
  }
});

test('spaced ratings match the upstream recall and lapse vectors', () => {
  for (const [days, grade, stability, difficulty, intervalDays] of [
    [1, 1, 1.2086474, 8.34176237, 1],
    [1, 2, 11.8325715, 6.66599536, 12],
    [1, 3, 13.04717575, 4.99022837, 13],
    [1, 4, 15.70705546, 3.31446137, 16],
    [10, 1, 1.39198697, 8.34176237, 1],
    [10, 2, 23.24687511, 6.66599536, 23],
    [10, 3, 32.02672948, 4.99022837, 32],
    [10, 4, 51.25386165, 3.31446137, 51],
    [40, 1, 1.69048223, 8.34176237, 2],
    [40, 2, 40.27676469, 6.66599536, 40],
    [40, 3, 60.34380561, 4.99022837, 60],
    [40, 4, 104.28891352, 3.31446137, 90],
  ]) {
    const now = NOW + days * DAY;
    assert.deepEqual(review(previous(), grade, now), {stability, difficulty, lastReview: now, intervalDays});
  }
});

test('a lapse uses the smaller post-lapse estimate, including the short-term ceiling', () => {
  for (const [oldStability, stability] of [
    [0.001, 0.001], [0.01, 0.00812806], [0.212, 0.10243964],
    [100, 3.18572518], [36500, 19.92785138],
  ]) {
    const result = review(previous(oldStability), 1, NOW + DAY);
    assert.equal(result.stability, stability);
    assert.ok(result.stability <= oldStability);
    assert.ok(result.intervalDays < review(previous(oldStability), 3, NOW + DAY).intervalDays || result.intervalDays === 1);
  }
});

test('elapsed time changes successful recall credit rather than using a fixed ladder', () => {
  const day = review(previous(), 3, NOW + DAY);
  const tenDays = review(previous(), 3, NOW + 10 * DAY);
  const overdue = review(previous(), 3, NOW + 40 * DAY);
  assert.ok(day.stability < tenDays.stability && tenDays.stability < overdue.stability);
  assert.equal(review(previous(), 3, NOW + 2 * DAY - 1).stability, day.stability);
});

test('repeated spaced Good reviews grow memory while intervals respect the 90-day product cap', () => {
  let memory = review(undefined, 3, NOW);
  for (let count = 0; count < 100; count++) {
    const next = review(memory, 3, memory.lastReview + memory.intervalDays * DAY);
    assert.ok(next.stability >= memory.stability);
    assert.ok(next.intervalDays >= memory.intervalDays);
    assert.ok(next.intervalDays >= 1 && next.intervalDays <= 90);
    assert.ok(next.stability >= 0.001 && next.stability <= 36500);
    assert.ok(next.difficulty >= 1 && next.difficulty <= 10);
    assert.ok(Object.values(next).every(Number.isFinite));
    memory = next;
  }
  assert.equal(memory.intervalDays, 90);
  assert.ok(memory.stability > 90, 'the interval cap must not overwrite the memory estimate');
  assert.equal(review(previous(36500, 1), 4, NOW + 36500 * DAY).stability, 36500);
});

test('repeated failures shorten memory and stay finite at the stability floor', () => {
  let memory = review(undefined, 4, NOW);
  for (let count = 0; count < 100; count++) {
    const next = review(memory, 1, memory.lastReview + DAY);
    assert.ok(next.stability <= memory.stability);
    assert.ok(next.difficulty >= memory.difficulty || next.difficulty === 10);
    assert.ok(next.stability >= 0.001);
    assert.ok(Object.values(next).every(Number.isFinite));
    memory = next;
  }
  assert.equal(memory.stability, 0.001);
  assert.equal(memory.intervalDays, 1);
});

test('invalid grades and timestamps are rejected without coercion', () => {
  for (const grade of [0, 5, 1.5, NaN, Infinity, -Infinity, '3', null, undefined, true]) {
    assert.throws(() => review(undefined, grade, NOW), RangeError);
  }
  for (const now of [-1, NaN, Infinity, '1', null, true, {}, 8640000000000001]) {
    assert.throws(() => review(undefined, 3, now), RangeError);
  }
  assert.throws(() => review(previous(), 3, NOW - 1), RangeError);
  assert.equal(review(undefined, 3, 0).lastReview, 0);
  assert.equal(review(undefined, 3, 8640000000000000).lastReview, 8640000000000000);
});

test('corrupt persisted memory is rejected instead of producing NaN or a fresh success', () => {
  for (const bad of [
    {}, [], '', 0, false,
    {...previous(), stability: 0}, {...previous(), stability: 0.0009},
    {...previous(), stability: 36501}, {...previous(), stability: NaN},
    {...previous(), stability: Infinity}, {...previous(), stability: '10'},
    {...previous(), difficulty: 0}, {...previous(), difficulty: 11},
    {...previous(), difficulty: NaN}, {...previous(), difficulty: '5'},
    {...previous(), lastReview: -1}, {...previous(), lastReview: NaN},
    {...previous(), lastReview: Infinity}, {...previous(), lastReview: '1'},
    {...previous(), lastReview: 8640000000000001},
  ]) assert.throws(() => review(bad, 3, NOW), RangeError);
});

test('review returns a new state and defaults to the current numeric timestamp', () => {
  const state = Object.freeze(previous());
  const result = review(state, 3, NOW + DAY);
  assert.notEqual(result, state);
  assert.deepEqual(state, previous());
  const before = Date.now();
  const fresh = review(undefined, 3);
  const after = Date.now();
  assert.ok(fresh.lastReview >= before && fresh.lastReview <= after);
});
