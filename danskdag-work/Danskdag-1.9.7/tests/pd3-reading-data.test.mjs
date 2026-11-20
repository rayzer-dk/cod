import test from 'node:test';
import assert from 'node:assert/strict';

// The reading module is consumed by the PD3 platform: a missing mapping between
// paragraphs and sentences, an evidence phrase that is not literally in the text,
// or an ambiguous answer would break display, highlighting and feedback.
let practiceModule, examModule;
try { practiceModule = await import('../dist/pd3-reading-practice-data.mjs'); }
catch (error) { if (error.code !== 'ERR_MODULE_NOT_FOUND') throw error; }
try { examModule = await import('../dist/pd3-reading-exam-data.mjs'); }
catch (error) { if (error.code !== 'ERR_MODULE_NOT_FOUND') throw error; }

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
function noDuplicates(values, label) {
  const normalised = values.map(value => value.trim().toLocaleLowerCase('da'));
  assert.equal(new Set(normalised).size, normalised.length, label);
}

test('the reading data files supply all three collections', () => {
  assert.ok(practiceModule, 'pd3-reading-practice-data.mjs must exist');
  assert.ok(examModule, 'pd3-reading-exam-data.mjs must exist');
  assert.equal(practiceModule.readingPractice.length, 8);
  assert.equal(examModule.readingExamFind.length, 2);
  assert.equal(examModule.readingExamText.length, 2);
});

test('practice texts: structure, levels, paragraphs and word counts', () => {
  const {readingPractice} = practiceModule;
  assert.equal(new Set(readingPractice.map(t => t.id)).size, readingPractice.length);
  assert.equal(readingPractice.filter(t => t.level === 'B1').length, 4);
  assert.equal(readingPractice.filter(t => t.level === 'B2').length, 4);
  for (const text of readingPractice) {
    const label = text.id;
    assert.match(text.id, idPattern);
    assert.ok(['B1', 'B2'].includes(text.level), label);
    russian(text.topic, `${label} topic`);
    danish(text.title, `${label} title`);
    assert.ok(text.sentences.length > 0, label);
    for (const [index, sentence] of text.sentences.entries()) {
      danish(sentence.da, `${label} sentence ${index} da`);
      russian(sentence.ru, `${label} sentence ${index} ru`);
      assert.match(sentence.da, /[.!?]$/, `${label} sentence ${index}: ends with punctuation`);
    }
    noDuplicates(text.sentences.map(s => s.da), `${label}: repeated sentence`);
    // Paragraph ranges cover every sentence, in order, without holes or overlaps.
    let expectedStart = 0;
    for (const [start, end] of text.paragraphs) {
      assert.equal(start, expectedStart, `${label}: paragraph gap or overlap at ${start}`);
      assert.ok(end > start, `${label}: empty paragraph`);
      expectedStart = end;
    }
    assert.equal(expectedStart, text.sentences.length, `${label}: paragraphs must cover all sentences`);
    const count = words(text.sentences.map(s => s.da).join(' '));
    assert.ok(count >= 350 && count <= 700, `${label}: ${count} words`);
    assert.ok(text.vocab.length >= 8 && text.vocab.length <= 14, `${label}: vocab size ${text.vocab.length}`);
    for (const [index, entry] of text.vocab.entries()) {
      danish(entry.da, `${label} vocab ${index} da`);
      russian(entry.ru, `${label} vocab ${index} ru`);
    }
    noDuplicates(text.vocab.map(v => v.da), `${label}: repeated vocabulary`);
    assert.ok(text.questions.length >= 5 && text.questions.length <= 6, `${label}: question count`);
    text.questions.forEach((question, index) => checkMcq(question, 3, `${label} question ${index}`));
    noDuplicates(text.questions.map(q => q.q), `${label}: repeated question`);
  }
});

test('find exams: ten sections, fifteen questions, evidence is unique to the answer section', () => {
  const {readingExamFind} = examModule;
  assert.equal(new Set(readingExamFind.map(e => e.id)).size, readingExamFind.length);
  for (const exam of readingExamFind) {
    const label = exam.id;
    assert.match(exam.id, idPattern);
    danish(exam.title, `${label} title`);
    assert.equal(exam.minutes, 25);
    assert.equal(exam.sections.length, 10, label);
    const sectionIds = exam.sections.map(s => s.id);
    assert.deepEqual(sectionIds, Array.from({length: 10}, (_, i) => `s${i + 1}`));
    for (const section of exam.sections) {
      danish(section.title, `${label}/${section.id} title`);
      assert.ok(section.paragraphs.length >= 2, `${label}/${section.id}: paragraphs`);
      section.paragraphs.forEach((p, i) => danish(p, `${label}/${section.id} paragraph ${i}`));
    }
    const total = words(exam.sections.flatMap(s => s.paragraphs).join(' '));
    assert.ok(total >= 1400 && total <= 1800, `${label}: ${total} words`);
    noDuplicates(exam.sections.flatMap(s => s.paragraphs), `${label}: repeated paragraph`);
    assert.equal(exam.questions.length, 15, label);
    assert.equal(new Set(exam.questions.map(q => q.id)).size, 15);
    noDuplicates(exam.questions.map(q => q.q), `${label}: repeated question`);
    for (const question of exam.questions) {
      assert.match(question.id, idPattern);
      danish(question.q, `${question.id} q`);
      danish(question.evidence, `${question.id} evidence`);
      russian(question.why, `${question.id} why`);
      assert.ok(sectionIds.includes(question.section), `${question.id}: section`);
      const holders = exam.sections.filter(s => s.paragraphs.some(p => p.includes(question.evidence)));
      assert.deepEqual(holders.map(s => s.id), [question.section], `${question.id}: evidence must occur only in its own section`);
      const section = exam.sections.find(s => s.id === question.section);
      const paragraphHits = section.paragraphs.filter(p => p.includes(question.evidence));
      assert.equal(paragraphHits.length, 1, `${question.id}: evidence must be a substring of exactly one paragraph`);
    }
    // Each section is used at least once so that the task is not guessable by elimination.
    const used = new Set(exam.questions.map(q => q.section));
    assert.ok(used.size >= 8, `${label}: questions should spread over the sections`);
  }
});

test('text exams: text 1 multiple choice, text 2 paragraph insertion, text 3 cloze', () => {
  const {readingExamText} = examModule;
  assert.equal(new Set(readingExamText.map(e => e.id)).size, readingExamText.length);
  for (const exam of readingExamText) {
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
    noDuplicates(text1.questions.map(q => q.q), `${label} text1: repeated question`);

    danish(text2.title, `${label} text2 title`);
    const gaps = text2.parts.filter(p => 'gap' in p).map(p => p.gap);
    assert.deepEqual(gaps, [1, 2, 3, 4, 5], `${label} text2: gap numbers in order`);
    for (const part of text2.parts) {
      assert.ok(('t' in part) !== ('gap' in part), `${label} text2: part is either text or gap`);
      if ('t' in part) danish(part.t, `${label} text2 part`);
    }
    assert.equal(text2.removed.length, 7);
    assert.deepEqual(text2.removed.map(r => r.id), ['A', 'B', 'C', 'D', 'E', 'F', 'G']);
    text2.removed.forEach(r => danish(r.t, `${label} text2 removed ${r.id}`));
    noDuplicates(text2.removed.map(r => r.t), `${label} text2: repeated paragraph`);
    // The solution is a bijection from the five gaps onto five of the seven paragraphs.
    assert.deepEqual(Object.keys(text2.solution).sort(), ['1', '2', '3', '4', '5']);
    const letters = Object.values(text2.solution);
    assert.equal(new Set(letters).size, 5, `${label} text2: solution must not reuse a paragraph`);
    for (const letter of letters) assert.ok(text2.removed.some(r => r.id === letter), `${label} text2: unknown letter ${letter}`);
    const distractors = text2.removed.map(r => r.id).filter(id => !letters.includes(id));
    assert.equal(distractors.length, 2);
    assert.deepEqual(Object.keys(text2.why).sort(), ['1', '2', '3', '4', '5']);
    for (const key of Object.keys(text2.why)) russian(text2.why[key], `${label} text2 why ${key}`);
    russian(text2.distractorWhy, `${label} text2 distractorWhy`);
    for (const letter of distractors) assert.ok(text2.distractorWhy.includes(`${letter}`), `${label}: distractorWhy should name paragraph ${letter}`);
    const removedById = Object.fromEntries(text2.removed.map(r => [r.id, r.t]));
    const solved = text2.parts.map(p => ('t' in p ? p.t : removedById[text2.solution[p.gap]])).join(' ');
    const words2 = words(solved);
    assert.ok(words2 >= 450 && words2 <= 550, `${label} text2: ${words2} words`);

    danish(text3.title, `${label} text3 title`);
    const gaps3 = text3.segments.filter(s => typeof s !== 'string');
    assert.deepEqual(gaps3.map(g => g.gap), [1, 2, 3, 4, 5, 6, 7, 8]);
    for (const gap of gaps3) {
      assert.equal(gap.options.length, 4, `${label} text3 gap ${gap.gap}`);
      gap.options.forEach(o => danish(o, `${label} text3 gap ${gap.gap} option`));
      assert.equal(new Set(gap.options).size, 4);
      assert.ok(Number.isInteger(gap.answer) && gap.answer >= 0 && gap.answer < 4);
    }
    for (const segment of text3.segments) if (typeof segment === 'string') danish(segment, `${label} text3 segment`);
    assert.equal(typeof text3.segments[0], 'string');
    const filled = text3.segments.map(s => (typeof s === 'string' ? s : s.options[s.answer])).join('');
    const words3 = words(filled);
    assert.ok(words3 >= 330 && words3 <= 400, `${label} text3: ${words3} words`);
    assert.doesNotMatch(filled, /\s{2,}/, `${label} text3: double spaces around gaps`);
    assert.doesNotMatch(filled, /\s[.,;:!?]/, `${label} text3: space before punctuation`);
    // A gap at the start of a sentence needs a capitalised correct option.
    for (const [index, segment] of text3.segments.entries()) {
      if (typeof segment === 'string') continue;
      const before = text3.segments[index - 1];
      if (typeof before === 'string' && /(^|[.!?]\s+|\n)$/.test(before)) {
        assert.match(segment.options[segment.answer], /^[A-ZÆØÅ]/, `${label} text3 gap ${segment.gap}: sentence start`);
      }
    }
  }
});

test('all Danish text is free of obvious typing slips', () => {
  const danishSentences = [];
  for (const text of practiceModule.readingPractice) danishSentences.push(...text.sentences.map(s => s.da), ...text.vocab.map(v => v.da));
  for (const exam of examModule.readingExamFind) danishSentences.push(...exam.sections.flatMap(s => s.paragraphs));
  for (const exam of examModule.readingExamText) {
    danishSentences.push(...exam.text1.paragraphs, ...exam.text2.parts.filter(p => 't' in p).map(p => p.t), ...exam.text2.removed.map(r => r.t));
  }
  assert.ok(danishSentences.length > 200);
  for (const sentence of danishSentences) {
    assert.doesNotMatch(sentence, /\s{2,}/, sentence.slice(0, 60));
    assert.doesNotMatch(sentence, /\s[.,;:!?]/, sentence.slice(0, 60));
    assert.doesNotMatch(sentence, /\b(\w+)\s+\1\b/i, `repeated word: ${sentence.slice(0, 60)}`);
    assert.equal(sentence, sentence.trim());
  }
});
