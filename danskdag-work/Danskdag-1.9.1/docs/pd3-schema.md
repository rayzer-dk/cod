# PD3 module: data schema (contract between content and platform)

Level target: Prøve i Dansk 3, CEFR B2 (public descriptions by Danish language centres: written part = reading comprehension 25 min + 65 min, written composition 2 sub-tests ≈ 2.5 h; oral part with listening comprehension included in oral communication, ≈ 15 min; providers describe the oral sub-tests slightly differently). The module is a practice approximation of this format, not the official exam. All data modules are plain ES modules without imports, exporting `const` data only.

Danish text is never translated by the localisation build (no Cyrillic). Every string that contains Cyrillic (Russian) in these modules needs a Ukrainian entry in `locales/uk/part-9-<module>.json` (key = first 16 hex chars of sha256 of the Russian string).

Common conventions
- `id`: `^[a-z0-9-]{1,60}$`, unique inside its collection.
- `level`: `'B1'` or `'B2'`.
- `topic`: Russian short label, e.g. `'Работа и права'`.
- Sentences are objects `{da, ru}`; `da` is exactly what is read aloud and shown; `ru` is the Russian translation (shown only on request, never in exam mode).
- Multiple choice: `{q, options:[...], answer:<index>, why}`; `q` and `options` Danish, `why` Russian (one or two sentences naming the evidence in the text).
- Texts must be original, written for learners, neutral and plausible. Names, firms and municipalities are fictional. Do not state invented statistics, laws or rules as real facts.

## pd3-reading-data.mjs

```js
export const readingPractice = [{            // long texts: read aloud with highlighting + comprehension
  id, level, topic, title /* Danish */,
  paragraphs: [[firstSentenceIndex, endIndexExclusive], ...],   // cover all sentences, in order
  sentences: [{da, ru}, ...],                                   // 350-700 words in total
  vocab: [{da, ru}, ...],                                       // 8-14 useful words/phrases from the text
  questions: [mcq, ...]                                         // 5-6 items, 3 options each
}];

export const readingExamFind = [{            // Del 1: find where the answer is (25 min)
  id, title /* Danish */, minutes: 25,
  sections: [{id:'s1', title /* Danish */, paragraphs:['Danish paragraph', ...]}, ...],   // 10 sections, ~1400-1800 words in total
  questions: [{id, q /* Danish */, section:'s3' /* correct section id */, evidence /* exact substring of one paragraph of that section */, why /* Russian */}]  // 15 items
}];

export const readingExamText = [{            // Del 2: three tasks (65 min)
  id, minutes: 65,
  text1: {title, paragraphs:['...'], questions:[mcq, ...]},     // 500-600 words, 8 questions, 3 options
  text2: {title,                                                // 450-550 words, 5 paragraphs removed
    parts:[{t:'Danish paragraph'} | {gap:1} ...],               // gap numbers 1..5 in order of appearance
    removed:[{id:'A', t:'Danish paragraph'}, ...7 items...],    // 5 belong in the gaps, 2 are distractors
    solution:{1:'C', 2:'A', 3:'F', 4:'B', 5:'E'}, why:{1:'Russian', ...}},
  text3: {title,                                                // 330-400 words, 8 gaps, 4 options each
    segments:['Danish text', {gap:1, options:['..','..','..','..'], answer:2}, 'Danish text', ...]}
}];
```
Rules: every `evidence` is an exact substring of a paragraph; the answer is found in exactly one section; distractor paragraphs in text2 must be plausible but demonstrably wrong (name the reason in the `why` for the neighbouring gap or in a `distractorWhy` string, Russian); text3 gap options are same-word-class lookalikes where only one fits grammar and meaning.

## pd3-dictation-data.mjs

```js
export const dictations = [{
  id, level, topic, title, mode:'sentences' | 'text',
  sentences: [{da, ru}, ...],   // 'sentences': 6-8 sentences of 6-14 words; 'text': 80-120 words in 8-12 sentences
  tip                            // Russian: one or two spelling/grammar points to listen for (e.g. stumt d, -ede/-et, æ/ø/å)
}];
```
Include `da` with ordinary punctuation. Cover typical spelling traps for B1-B2 learners: silent d/g, double consonants, -ede/-et, -er/-re, compounds written together, sj/skj, hv-, og/at pronunciation differences, en/et, de/dem.

## pd3-listening-data.mjs

```js
export const listening = [{
  id, level, topic, title, situation /* Russian: what you will hear, 1 sentence */,
  plays: 2,
  sentences: [{da, ru}, ...],      // 100-220 words, read aloud as a sequence (voicemail, radio item, announcement, conversation turns written as narration or dialogue lines)
  questions: [mcq, ...]            // 5-6 items; options short; questions test gist and detail
}];
```

## pd3-oral-data.mjs

```js
export const oralMonologue = [{id, topic, title, prompts:['Danish bullet', ...] /* 4-5 points to cover */, keywords:['Danish', ...] /* 8-12 for the keyword sheet */, hint /* Russian */}];
export const oralInterview = [{id, theme, questions:['Danish question', ...] /* 6-8, rising difficulty, B2 */, followUps:['Danish', ...] /* 3 */}];
export const oralInteraction = [{id, title, situation /* Russian */, yourRole /* Russian */, tasks:['Danish', ...] /* what you must achieve */, partner:[{da, ru}, ...] /* partner lines to be played/shown in order, 5-8, with places where the learner must react */}];
export const oralDiscussion = [{id, statement /* Danish, 1-2 sentences */, pro:['Danish argument', ...], contra:['Danish argument', ...], phrases:[{da, ru}, ...] /* 8-10 discussion phrases */}];
export const oralPhrases = [{group /* Russian */, items:[{da, ru}, ...]}];   // connectors, agreeing/disagreeing, asking to repeat, buying time, 60+ phrases
export const oralCriteria = [{id, title /* Russian */, descriptors:['Russian', ...]}];   // self-assessment axes: content/task, vocabulary, grammar, fluency, pronunciation, interaction
```

## pd3-writing-data.mjs

```js
export const writingEmail = [{id, level, topic, title,
  prompt /* Danish: the e-mail the learner received */, requirements:['Danish bullet', ...] /* 3-4 things the reply must contain */,
  minWords: 100, maxWords: 160, modelAnswer /* Danish, fits the word range */, checklist:['Russian', ...], phrases:[{da, ru}, ...] /* 8-10 */}];
export const writingTask = [{id, level, topic, title,
  options:[{key:'A', prompt /* Danish */, requirements:['Danish', ...]}, {key:'B', prompt, requirements}],   // learner chooses A or B
  minWords: 200, maxWords: 300, modelAnswers:{A:'Danish', B:'Danish'}, checklist:['Russian', ...], phrases:[{da, ru}, ...]}];
export const writingCriteria = [{id, title /* Russian */, descriptors:['Russian', ...]}];   // content/task, vocabulary, grammar and spelling, coherence and structure
export const connectors = ['fordi','selvom', ...];   // Danish linking words used for a mechanical check, 40+ entries, lowercase
```
Model answers must satisfy every requirement of their prompt and the word limits.
