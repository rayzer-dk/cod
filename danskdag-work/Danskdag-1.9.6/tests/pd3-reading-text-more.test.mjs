import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {localizeSource, loadTranslations} from '../tools/localize-source.mjs';

// Extra Del 2 sets (exam-3 ... exam-6). They follow the same contract as readingExamText
// in docs/pd3-schema.md: a malformed set would break the exam view, the checking of
// answers or the paragraph-insertion feedback.
const moreModule = await import('../dist/pd3-reading-text-more-data.mjs');
const examModule = await import('../dist/pd3-reading-exam-data.mjs');
const practiceModule = await import('../dist/pd3-reading-practice-data.mjs');
const {readingExamTextMore} = moreModule;
const {readingExamText, readingExamFind} = examModule;
const {readingPractice} = practiceModule;

const cyrillic = /[А-Яа-яЁёІіЇїЄєҐґ]/;
const words = text => text.split(/\s+/).filter(Boolean).length;
const idPattern = /^[a-z0-9-]{1,60}$/;
const danish = (value, label) => {
  assert.equal(typeof value, 'string', label);
  assert.ok(value.trim(), `${label}: empty`);
  assert.doesNotMatch(value, cyrillic, `${label}: Danish field contains Cyrillic`);
};
const russian = (value, label) => {
  assert.equal(typeof value, 'string', label);
  assert.match(value, cyrillic, `${label}: Russian field must contain Cyrillic`);
};
function checkMcq(item, optionCount, label) {
  danish(item.q, `${label} q`);
  assert.equal(item.options.length, optionCount, `${label}: option count`);
  item.options.forEach((option, index) => danish(option, `${label} option ${index}`));
  assert.equal(new Set(item.options).size, optionCount, `${label}: duplicate options`);
  assert.ok(Number.isInteger(item.answer) && item.answer >= 0 && item.answer < optionCount, `${label}: answer index`);
  russian(item.why, `${label} why`);
}
const sentencesOf = text => text.split(/(?<=[.!?»])\s+(?=[A-ZÆØÅ»])/).map(s => s.trim()).filter(Boolean);
const normalise = text => text.trim().toLocaleLowerCase('da');
const solvedText2 = text2 => {
  const byId = Object.fromEntries(text2.removed.map(r => [r.id, r.t]));
  return text2.parts.map(p => ('t' in p ? p.t : byId[text2.solution[p.gap]]));
};
const filledText3 = text3 => text3.segments.map(s => (typeof s === 'string' ? s : s.options[s.answer])).join('');
const allParagraphs = exam => [
  ...exam.text1.paragraphs,
  ...solvedText2(exam.text2),
  filledText3(exam.text3)
];

test('the extra sets are exam-3 ... exam-6 and do not reuse ids of the existing sets', () => {
  assert.deepEqual(readingExamTextMore.map(e => e.id), ['exam-3', 'exam-4', 'exam-5', 'exam-6']);
  const ids = [...readingExamText, ...readingExamTextMore].map(e => e.id);
  assert.equal(new Set(ids).size, ids.length);
  assert.equal(ids.length, 6);
  assert.equal(readingExamText.length, 2);
});

test('extra text exams: text 1 multiple choice, text 2 paragraph insertion, text 3 cloze', () => {
  for (const exam of readingExamTextMore) {
    const label = exam.id;
    assert.match(exam.id, idPattern);
    assert.equal(exam.minutes, 65);

    const {text1, text2, text3} = exam;
    danish(text1.title, `${label} text1 title`);
    text1.paragraphs.forEach((p, i) => danish(p, `${label} text1 paragraph ${i}`));
    const words1 = words(text1.paragraphs.join(' '));
    assert.ok(words1 >= 500 && words1 <= 600, `${label} text1: ${words1} words`);
    assert.equal(text1.questions.length, 8);
    text1.questions.forEach((q, i) => checkMcq(q, 3, `${label} text1 question ${i}`));
    const counts = [0, 0, 0];
    text1.questions.forEach(q => counts[q.answer]++);
    assert.ok(Math.max(...counts) <= 4, `${label} text1: answers by position ${counts}`);
    const lengthOf = q => q.options[q.answer].length;
    const longest = text1.questions.filter(q => q.options.every((o, i) => i === q.answer || o.length < lengthOf(q))).length;
    assert.ok(longest <= 5, `${label} text1: the correct option is the longest too often (${longest})`);
    const questionTexts = text1.questions.map(q => normalise(q.q));
    assert.equal(new Set(questionTexts).size, 8, `${label} text1: repeated question`);

    danish(text2.title, `${label} text2 title`);
    const gaps = text2.parts.filter(p => 'gap' in p).map(p => p.gap);
    assert.deepEqual(gaps, [1, 2, 3, 4, 5], `${label} text2: gap numbers in order`);
    assert.ok('t' in text2.parts[0], `${label} text2: the text starts with a paragraph`);
    for (let i = 1; i < text2.parts.length; i++) {
      assert.ok(!('gap' in text2.parts[i] && 'gap' in text2.parts[i - 1]), `${label} text2: two gaps in a row`);
    }
    for (const part of text2.parts) {
      assert.ok(('t' in part) !== ('gap' in part), `${label} text2: part is either text or gap`);
      if ('t' in part) danish(part.t, `${label} text2 part`);
    }
    assert.equal(text2.removed.length, 7);
    assert.deepEqual(text2.removed.map(r => r.id), ['A', 'B', 'C', 'D', 'E', 'F', 'G']);
    text2.removed.forEach(r => danish(r.t, `${label} text2 removed ${r.id}`));
    assert.equal(new Set(text2.removed.map(r => normalise(r.t))).size, 7, `${label} text2: repeated paragraph`);
    // The solution is a bijection from the five gaps onto five of the seven paragraphs.
    assert.deepEqual(Object.keys(text2.solution).sort(), ['1', '2', '3', '4', '5']);
    const letters = Object.values(text2.solution);
    assert.equal(new Set(letters).size, 5, `${label} text2: solution must not reuse a paragraph`);
    for (const letter of letters) assert.ok(text2.removed.some(r => r.id === letter), `${label} text2: unknown letter ${letter}`);
    assert.notDeepEqual(letters, [...letters].sort(), `${label} text2: solution should not be in alphabetical order`);
    const distractors = text2.removed.map(r => r.id).filter(id => !letters.includes(id));
    assert.equal(distractors.length, 2);
    assert.deepEqual(Object.keys(text2.why).sort(), ['1', '2', '3', '4', '5']);
    for (const key of Object.keys(text2.why)) russian(text2.why[key], `${label} text2 why ${key}`);
    russian(text2.distractorWhy, `${label} text2 distractorWhy`);
    for (const letter of distractors) assert.ok(text2.distractorWhy.includes(`${letter}`), `${label}: distractorWhy should name paragraph ${letter}`);
    const words2 = words(solvedText2(text2).join(' '));
    assert.ok(words2 >= 450 && words2 <= 550, `${label} text2: ${words2} words`);

    danish(text3.title, `${label} text3 title`);
    const gaps3 = text3.segments.filter(s => typeof s !== 'string');
    assert.deepEqual(gaps3.map(g => g.gap), [1, 2, 3, 4, 5, 6, 7, 8]);
    const counts3 = [0, 0, 0, 0];
    for (const gap of gaps3) {
      assert.equal(gap.options.length, 4, `${label} text3 gap ${gap.gap}`);
      gap.options.forEach(o => danish(o, `${label} text3 gap ${gap.gap} option`));
      assert.equal(new Set(gap.options).size, 4);
      assert.ok(Number.isInteger(gap.answer) && gap.answer >= 0 && gap.answer < 4);
      counts3[gap.answer]++;
    }
    assert.ok(Math.max(...counts3) <= 4, `${label} text3: answers by position ${counts3}`);
    for (const segment of text3.segments) if (typeof segment === 'string') danish(segment, `${label} text3 segment`);
    assert.equal(typeof text3.segments[0], 'string');
    for (let i = 1; i < text3.segments.length; i++) {
      assert.ok(!(typeof text3.segments[i] !== 'string' && typeof text3.segments[i - 1] !== 'string'), `${label} text3: two gaps in a row`);
    }
    const filled = filledText3(text3);
    const words3 = words(filled);
    assert.ok(words3 >= 330 && words3 <= 400, `${label} text3: ${words3} words`);
    assert.doesNotMatch(filled, /\s{2,}/, `${label} text3: double spaces around gaps`);
    assert.doesNotMatch(filled, /\s[.,;:!?]/, `${label} text3: space before punctuation`);
    // A gap at the start of a sentence needs capitalised options.
    for (const [index, segment] of text3.segments.entries()) {
      if (typeof segment === 'string') continue;
      const before = text3.segments[index - 1];
      if (typeof before === 'string' && /(^|[.!?]\s+|\n)$/.test(before)) {
        for (const option of segment.options) assert.match(option, /^[A-ZÆØÅ]/, `${label} text3 gap ${segment.gap}: sentence start`);
      }
    }
  }
});

test('the extra sets are free of obvious typing slips', () => {
  for (const exam of readingExamTextMore) {
    const pieces = [
      ...exam.text1.paragraphs,
      ...exam.text2.parts.filter(p => 't' in p).map(p => p.t),
      ...exam.text2.removed.map(r => r.t),
      ...exam.text3.segments.filter(s => typeof s === 'string').map(s => s.trim()),
      filledText3(exam.text3),
      exam.text1.title, exam.text2.title, exam.text3.title,
      ...exam.text1.questions.flatMap(q => [q.q, ...q.options])
    ];
    for (const piece of pieces) {
      assert.doesNotMatch(piece, /\s{2,}/, `${exam.id}: ${piece.slice(0, 60)}`);
      assert.doesNotMatch(piece, /\s[.,;:!?]/, `${exam.id}: ${piece.slice(0, 60)}`);
      assert.doesNotMatch(piece, /\b(\w+)\s+\1\b/i, `${exam.id}: repeated word: ${piece.slice(0, 60)}`);
      assert.doesNotMatch(piece, /["“”„]/, `${exam.id}: use »...« for quotations: ${piece.slice(0, 60)}`);
      assert.equal(piece, piece.trim());
    }
    for (const paragraph of [...exam.text1.paragraphs, ...exam.text2.parts.filter(p => 't' in p).map(p => p.t), ...exam.text2.removed.map(r => r.t)]) {
      assert.match(paragraph, /[.!?»«]$/, `${exam.id}: paragraph should end with punctuation: ${paragraph.slice(0, 60)}`);
    }
    assert.match(filledText3(exam.text3), /[.!?]$/);
    const quotesOpen = (filledText3(exam.text3).match(/»/g) || []).length;
    assert.equal(quotesOpen, (filledText3(exam.text3).match(/«/g) || []).length);
    for (const paragraph of allParagraphs(exam)) {
      assert.equal((paragraph.match(/»/g) || []).length, (paragraph.match(/«/g) || []).length, `${exam.id}: unbalanced quotation marks`);
    }
  }
});

test('no sentence is repeated between the extra sets or with the existing reading content', () => {
  const seen = new Map();
  const register = (sentence, origin) => {
    const key = normalise(sentence);
    if (words(key) < 4) return;
    if (seen.has(key)) assert.fail(`repeated sentence in ${origin} and ${seen.get(key)}: ${sentence.slice(0, 80)}`);
    seen.set(key, origin);
  };
  const existing = [];
  for (const exam of readingExamText) existing.push([exam.id, allParagraphs(exam)]);
  for (const exam of readingExamFind) existing.push([exam.id, exam.sections.flatMap(s => s.paragraphs)]);
  for (const text of readingPractice) existing.push([text.id, text.sentences.map(s => s.da)]);
  const existingKeys = new Set();
  for (const [origin, paragraphs] of existing) {
    for (const paragraph of paragraphs) for (const sentence of sentencesOf(paragraph)) existingKeys.add(normalise(sentence));
    assert.ok(origin);
  }
  for (const exam of readingExamTextMore) {
    for (const paragraph of allParagraphs(exam)) {
      for (const sentence of sentencesOf(paragraph)) {
        if (words(sentence) >= 4) assert.ok(!existingKeys.has(normalise(sentence)), `${exam.id}: sentence also in existing content: ${sentence.slice(0, 80)}`);
        register(sentence, exam.id);
      }
    }
    // The distractor paragraphs are sentences of the exam too.
    for (const removed of exam.text2.removed) for (const sentence of sentencesOf(removed.t)) {
      if (words(sentence) >= 4) assert.ok(!existingKeys.has(normalise(sentence)), `${exam.id}: distractor sentence also in existing content`);
    }
    // Titles must differ from every other title.
    const titles = [exam.text1.title, exam.text2.title, exam.text3.title];
    assert.equal(new Set(titles.map(normalise)).size, 3);
  }
  const titles = [...readingExamText, ...readingExamTextMore].flatMap(e => [e.text1.title, e.text2.title, e.text3.title]).map(normalise);
  assert.equal(new Set(titles).size, titles.length, 'titles of all Del 2 texts are unique');
});

test('the module has no imports and every Russian string has a Ukrainian translation', () => {
  const source = fs.readFileSync(new URL('../dist/pd3-reading-text-more-data.mjs', import.meta.url), 'utf8');
  assert.doesNotMatch(source, /^\s*import\s/m);
  assert.match(source, /export const readingExamTextMore\s*=/);
  const translate = loadTranslations(new URL('..', import.meta.url).pathname);
  const localized = localizeSource(source, translate);
  assert.ok(localized.length > source.length);
  const file = JSON.parse(fs.readFileSync(new URL('../locales/uk/part-15-text.json', import.meta.url), 'utf8'));
  for (const [key, value] of Object.entries(file)) {
    assert.match(key, /^[0-9a-f]{16}$/);
    assert.match(value, cyrillic, key);
    assert.doesNotMatch(value, /[ыэёъ]/i, `Russian letters in Ukrainian text: ${key}`);
    assert.doesNotMatch(value, /'/, `use the typographic apostrophe: ${key}`);
  }
});
