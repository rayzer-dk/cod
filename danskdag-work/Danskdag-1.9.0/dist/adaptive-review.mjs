/*
dist/adaptive-review.mjs contains adaptations of the FSRS-6 equations,
default parameter values, and numeric rounding behavior from ts-fsrs by
Open Spaced Repetition.

Project: https://github.com/open-spaced-repetition/ts-fsrs
Revision: 18425566bb9ff788a73ecee0c3c6927948ff3f6a
Reference: packages/fsrs/src/models/fsrs-6/algorithm.ts
License: https://github.com/open-spaced-repetition/ts-fsrs/blob/18425566bb9ff788a73ecee0c3c6927948ff3f6a/LICENSE

MIT License

Copyright (c) 2026 Open Spaced Repetition

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/
const WEIGHTS = Object.freeze([
  0.212, 1.2931, 2.3065, 8.2956, 6.4133, 0.8334, 3.0194,
  0.001, 1.8722, 0.1666, 0.796, 1.4835, 0.0614, 0.2629,
  1.6483, 0.6014, 1.8729, 0.5425, 0.0912, 0.0658, 0.1542,
]);
const DAY = 86400000;
const MAX_TIMESTAMP = 8640000000000000;
const MIN_STABILITY = 0.001;
const MAX_STABILITY = 36500;
const clamp = (value, min, max) => Math.min(Math.max(value, min), max);
const round8 = value => Math.round(value * 1e8) / 1e8;
const validTime = value => Number.isFinite(value) && value >= 0 && value <= MAX_TIMESTAMP;
const initialDifficulty = grade => round8(WEIGHTS[4] - Math.exp((grade - 1) * WEIGHTS[5]) + 1);
const DECAY = -WEIGHTS[20];
const FACTOR = round8(Math.exp(Math.log(0.9) / DECAY) - 1);

/**
 * Update one memory state after a genuine retrieval rating.
 * Grades: 1 Again, 2 Hard, 3 Good, 4 Easy. null/undefined means a new item.
 * Previous state: {stability: days [.001,36500], difficulty: [1,10],
 * lastReview: numeric UTC milliseconds}. Invalid data throws RangeError.
 * This app treats less than 24 elapsed hours as a same-day review.
 * The caller owns evidence gating, retry timing, and persisted-state migration.
 */
export function nextMemory(previous, grade, now = Date.now()) {
  if (!Number.isInteger(grade) || grade < 1 || grade > 4) {
    throw new RangeError('grade must be an integer from 1 to 4');
  }
  if (!validTime(now)) throw new RangeError('now must be valid nonnegative timestamp milliseconds');

  let stability;
  let difficulty;
  if (previous === undefined || previous === null) {
    stability = WEIGHTS[grade - 1];
    difficulty = clamp(initialDifficulty(grade), 1, 10);
  } else {
    if (typeof previous !== 'object' || Array.isArray(previous) ||
        !Number.isFinite(previous.stability) || previous.stability < MIN_STABILITY || previous.stability > MAX_STABILITY ||
        !Number.isFinite(previous.difficulty) || previous.difficulty < 1 || previous.difficulty > 10 ||
        !validTime(previous.lastReview) || previous.lastReview > now) {
      throw new RangeError('previous must contain valid stability, difficulty, and lastReview');
    }
    const {stability: s, difficulty: d} = previous;
    const elapsedDays = Math.floor((now - previous.lastReview) / DAY);
    const w = WEIGHTS;

    // FSRS-5 linear damping and reversion toward the raw initial Easy value.
    const deltaDifficulty = round8((-w[6] * (grade - 3) * (10 - d)) / 9);
    difficulty = clamp(round8(w[7] * initialDifficulty(4) + (1 - w[7]) * (d + deltaDifficulty)), 1, 10);

    if (elapsedDays === 0) {
      // FSRS-6 short-term update; a remembered rating cannot lower stability.
      const increase = Math.pow(s, -w[19]) * Math.exp(w[17] * (grade - 3 + w[18]));
      stability = round8(clamp(s * (grade >= 2 ? Math.max(increase, 1) : increase), MIN_STABILITY, MAX_STABILITY));
    } else {
      const retrievability = round8(Math.pow(1 + FACTOR * elapsedDays / s, DECAY));
      if (grade === 1) {
        const afterLapse = round8(clamp(
          w[11] * Math.pow(d, -w[12]) * (Math.pow(s + 1, w[13]) - 1) *
          Math.exp((1 - retrievability) * w[14]),
          MIN_STABILITY, MAX_STABILITY,
        ));
        // The upper bound is the smaller of the lapse formula and this value.
        const shortTermCeiling = round8(s / Math.exp(w[17] * w[18]));
        stability = clamp(shortTermCeiling, MIN_STABILITY, afterLapse);
      } else {
        const hardPenalty = grade === 2 ? w[15] : 1;
        const easyBonus = grade === 4 ? w[16] : 1;
        stability = round8(clamp(
          s * (1 + Math.exp(w[8]) * (11 - d) * Math.pow(s, -w[9]) *
          (Math.exp((1 - retrievability) * w[10]) - 1) * hardPenalty * easyBonus),
          MIN_STABILITY, MAX_STABILITY,
        ));
      }
    }
  }

  // At target retention .9, the inverse FSRS curve gives interval = stability.
  // Rounding and the 1..90-day interval cap are this app's scheduling policy.
  return {stability, difficulty, lastReview: now, intervalDays: clamp(Math.round(stability), 1, 90)};
}
