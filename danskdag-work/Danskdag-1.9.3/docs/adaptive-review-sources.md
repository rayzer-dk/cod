# Adaptive review: FSRS-6 equations and app policy

The dependency-free `dist/adaptive-review.mjs` updates stability and difficulty with **FSRS-6's published 21 default parameters**. These parameters are not fitted to this app or an individual learner. Matching reference calculations is implementation verification; it is not evidence of optimal intervals or improved learning outcomes for this app.

## Primary references inspected on 2026-10-25

- [Official algorithm wiki](https://github.com/open-spaced-repetition/awesome-fsrs/wiki/The-Algorithm), page visibly edited July 28, 2026. The [original fsrs4anki URL](https://github.com/open-spaced-repetition/fsrs4anki/wiki/The-Algorithm) now points here. FSRS-6 changes the short-term stability and forgetting curve; the initial difficulty, damped difficulty update, and recall/lapse formulas are inherited from earlier sections of the same wiki.
- [ts-fsrs FSRS-6 implementation](https://github.com/open-spaced-repetition/ts-fsrs/blob/18425566bb9ff788a73ecee0c3c6927948ff3f6a/packages/fsrs/src/models/fsrs-6/algorithm.ts), pinned revision `18425566bb9ff788a73ecee0c3c6927948ff3f6a`, commit timestamp `2026-10-25T05:56:13Z`; algorithm blob `75958b6327395b845253f012262f503c79e9774e`.
- [Default parameters and memory bounds](https://github.com/open-spaced-repetition/ts-fsrs/blob/18425566bb9ff788a73ecee0c3c6927948ff3f6a/packages/fsrs/src/models/fsrs-6/constants.ts), same revision, blob `d5e995e81f1eee7217b27820a2ad517995635436`.
- [Numeric helpers](https://github.com/open-spaced-repetition/ts-fsrs/blob/18425566bb9ff788a73ecee0c3c6927948ff3f6a/packages/fsrs/src/help.ts), same revision: clamping and rounding to eight decimal places.
- [Date adapter](https://github.com/open-spaced-repetition/ts-fsrs/blob/18425566bb9ff788a73ecee0c3c6927948ff3f6a/packages/srs-kit/src/chrono/presets/date/chrono.ts) and [default scheduler](https://github.com/open-spaced-repetition/ts-fsrs/blob/18425566bb9ff788a73ecee0c3c6927948ff3f6a/packages/fsrs/src/scheduler/default-scheduler.ts), same revision: upstream FSRS-6 scheduling currently uses UTC calendar-day differences. This app's complete elapsed-day policy differs, as explained below.
- [Upstream MIT license](https://github.com/open-spaced-repetition/ts-fsrs/blob/18425566bb9ff788a73ecee0c3c6927948ff3f6a/LICENSE). Attribution and full license text are retained in `THIRD_PARTY_FSRS_NOTICE.txt`.

## Model details

Grades are `1=Again`, `2=Hard`, `3=Good`, `4=Easy`. Stability `S` is measured in days; difficulty `D` is bounded to `[1,10]`. The default weights, indexed from zero, are:

```text
[0.212, 1.2931, 2.3065, 8.2956, 6.4133, 0.8334, 3.0194,
 0.001, 1.8722, 0.1666, 0.796, 1.4835, 0.0614, 0.2629,
 1.6483, 0.6014, 1.8729, 0.5425, 0.0912, 0.0658, 0.1542]
```

The implementation follows the pinned source's eight-decimal intermediate rounding. Initial stability is `w[G−1]`. Initial difficulty is `w4 − exp(w5·(G−1)) + 1`, bounded to `[1,10]`. Subsequent difficulty applies linear damping, then mean reversion toward the **raw, unclamped** initial Easy difficulty, and finally bounds the result. Using a previously clamped Easy difficulty as the mean-reversion target would give different results.

For zero elapsed whole days, stability is multiplied by `exp(w17·(G−3+w18))·S^(−w19)`. For grades 2–4 that multiplier is at least one. For positive elapsed days, retrievability follows `(1+factor·t/S)^(−w20)` with `factor=0.9^(−1/w20)−1`. Recall uses the existing difficulty and stability, plus grade-specific Hard/Easy factors. Difficulty is updated separately; the new difficulty must not replace the previous difficulty inside the stability equation.

For an elapsed-day Again rating, the post-lapse formula is **limited to the smaller of its result and `S/exp(w17·w18)`**, then bounded to the valid stability range. Omitting this minimum can increase stability after a failure for very small memories. For example, `S=.01,D=5,t=1,G=1` yields `.00812806`.

## App policy and input contract

`nextMemory(previous, grade, now=Date.now())` returns a new `{stability,difficulty,lastReview,intervalDays}` object without mutating the input.

- `null` or `undefined` means an item with no prior memory state. Any other previous value must contain numeric finite stability in `[.001,36500]`, difficulty in `[1,10]`, and a valid numeric `lastReview`.
- `now` and `lastReview` must be finite numeric timestamp milliseconds in `[0,8640000000000000]`. Future `lastReview` values and invalid grades are rejected with `RangeError`; corrupt persisted memory is not silently converted into a successful first review. The calling persistence layer owns migration.
- Elapsed model days are `floor((now−lastReview)/86400000)`. This app uses complete elapsed 24-hour days, including across midnight. The FSRS-6 memory model takes elapsed time as an input; the pinned upstream default scheduler instead supplies UTC calendar-day differences. The tests make this app policy explicit.
- Desired retention is fixed at `0.9`. Inverting the FSRS-6 forgetting curve at that retention gives `interval=S`. The app uses `clamp(round(S),1,90)` days, with no fuzz. The 90-day cap is a product limit on the interval, not on the stored stability estimate.
- Stability outputs are bounded to `[.001,36500]` days and difficulty to `[1,10]`, matching the pinned model bounds. Rounding to eight decimal places follows the reference implementation. These bounds keep valid inputs finite.
- This function supports all four grades. The caller decides which exercise evidence can earn a grade, prevents repeated early success from extending a due date, and supplies separate short retry scheduling after an error. Recognition or assisted answers should not be treated as independent Good recall merely because this helper can accept grade 3.

## Verification evidence

Tests were written before implementation and the initial run reported ten failures because `nextMemory` was missing. The reference fixture values were obtained by executing the pinned, fetched `FSRS6Algorithm` class itself using Node's TypeScript transpilation, with upstream-equivalent `clamp`, `roundTo`, and rating constants. No npm dependency or network call is needed by the shipped module or tests.

A separate direct comparison against that executed upstream class matched all 768 state vectors exactly: eight stability values from `.001` to `36500`, four difficulty values from `1` to `10`, six elapsed-day values including `0/1/40/36500`, and every grade. This comparison verifies stability/difficulty, independently of the app's interval cap and time policy.

The tests cover all initial grades, all same-day grades, all four grades at 1/10/40 elapsed days, the lapse minimum, repeated spaced successes, repeated failures, finite bounds, the interval cap, unchanged inputs, and invalid input rejection. Representative reference values for `S=10,D=5,t=10` are:

| Grade | New stability | New difficulty | App interval days |
| --- | ---: | ---: | ---: |
| Again | 1.39198697 | 8.34176237 | 1 |
| Hard | 23.24687511 | 6.66599536 | 23 |
| Good | 32.02672948 | 4.99022837 | 32 |
| Easy | 51.25386165 | 3.31446137 | 51 |

Run `node --test tests/adaptive-review.test.mjs` for the isolated model contract, and `npm test` for the app suite.
