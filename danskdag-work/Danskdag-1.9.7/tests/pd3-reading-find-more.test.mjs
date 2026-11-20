import test from 'node:test';
import assert from 'node:assert/strict';

// Additional Del 1 sets (find-3 ... find-6). Same structural rules as the first two sets:
// an evidence phrase that is not literally in the text, or an answer that occurs in two
// sections, would break highlighting and feedback in the exam.
const {readingExamFindMore} = await import('../dist/pd3-reading-find-more-data.mjs');
const {readingExamFind} = await import('../dist/pd3-reading-exam-data.mjs');

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
const sentencesOf = text => text.split(/(?<=[.!?])\s+/).map(s => s.trim().toLocaleLowerCase('da')).filter(Boolean);

test('the additional find sets are find-3 to find-6 and do not clash with the existing ids', () => {
  assert.deepEqual(readingExamFindMore.map(e => e.id), ['find-3', 'find-4', 'find-5', 'find-6']);
  const ids = [...readingExamFind, ...readingExamFindMore].map(e => e.id);
  assert.equal(new Set(ids).size, ids.length);
  const questionIds = [...readingExamFind, ...readingExamFindMore].flatMap(e => e.questions.map(q => q.id));
  assert.equal(new Set(questionIds).size, questionIds.length);
});

test('additional find sets: ten sections, fifteen questions, evidence is unique to the answer section', () => {
  for (const exam of readingExamFindMore) {
    const label = exam.id;
    assert.match(exam.id, idPattern);
    danish(exam.title, `${label} title`);
    assert.equal(exam.minutes, 25);
    assert.equal(exam.sections.length, 10, label);
    const sectionIds = exam.sections.map(s => s.id);
    assert.deepEqual(sectionIds, Array.from({length: 10}, (_, i) => `s${i + 1}`));
    noDuplicates(exam.sections.map(s => s.title), `${label}: repeated section title`);
    for (const section of exam.sections) {
      danish(section.title, `${label}/${section.id} title`);
      assert.ok(section.paragraphs.length >= 2 && section.paragraphs.length <= 3, `${label}/${section.id}: paragraphs`);
      section.paragraphs.forEach((p, i) => danish(p, `${label}/${section.id} paragraph ${i}`));
      const count = words(section.paragraphs.join(' '));
      assert.ok(count >= 140 && count <= 195, `${label}/${section.id}: ${count} words`);
    }
    const total = words(exam.sections.flatMap(s => s.paragraphs).join(' '));
    assert.ok(total >= 1400 && total <= 1800, `${label}: ${total} words`);
    assert.equal(exam.questions.length, 15, label);
    assert.equal(new Set(exam.questions.map(q => q.id)).size, 15);
    noDuplicates(exam.questions.map(q => q.q), `${label}: repeated question`);
    noDuplicates(exam.questions.map(q => q.evidence), `${label}: repeated evidence`);
    for (const question of exam.questions) {
      assert.match(question.id, idPattern);
      assert.ok(question.id.startsWith(`${exam.id}-q`), `${question.id}: id prefix`);
      danish(question.q, `${question.id} q`);
      assert.match(question.q, /\?$/, `${question.id}: question mark`);
      danish(question.evidence, `${question.id} evidence`);
      russian(question.why, `${question.id} why`);
      assert.ok(sectionIds.includes(question.section), `${question.id}: section`);
      const holders = exam.sections.filter(s => s.paragraphs.some(p => p.includes(question.evidence)));
      assert.deepEqual(holders.map(s => s.id), [question.section], `${question.id}: evidence must occur only in its own section`);
      const section = exam.sections.find(s => s.id === question.section);
      assert.equal(section.paragraphs.filter(p => p.includes(question.evidence)).length, 1, `${question.id}: evidence must be a substring of exactly one paragraph`);
    }
    const used = new Set(exam.questions.map(q => q.section));
    assert.ok(used.size >= 8, `${label}: questions should spread over the sections`);
    assert.ok(Math.max(...[...used].map(id => exam.questions.filter(q => q.section === id).length)) <= 2, `${label}: at most two questions per section`);
  }
});

function noDuplicates(values, label) {
  const normalised = values.map(value => value.trim().toLocaleLowerCase('da'));
  assert.equal(new Set(normalised).size, normalised.length, label);
}

test('no sentence is repeated between the additional sets or with the existing sets', () => {
  const seen = new Map();
  for (const exam of [...readingExamFind, ...readingExamFindMore]) {
    for (const section of exam.sections) {
      for (const paragraph of section.paragraphs) {
        for (const sentence of sentencesOf(paragraph)) {
          const where = `${exam.id}/${section.id}`;
          assert.ok(!seen.has(sentence), `repeated sentence in ${where} and ${seen.get(sentence)}: ${sentence.slice(0, 70)}`);
          seen.set(sentence, where);
        }
      }
    }
  }
  const questions = [...readingExamFind, ...readingExamFindMore].flatMap(e => e.questions.map(q => q.q.toLocaleLowerCase('da')));
  assert.equal(new Set(questions).size, questions.length, 'a question text is repeated');
});

test('additional sets: Danish text is free of obvious typing slips', () => {
  const paragraphs = readingExamFindMore.flatMap(e => e.sections.flatMap(s => s.paragraphs));
  assert.ok(paragraphs.length >= 100);
  for (const sentence of paragraphs) {
    assert.doesNotMatch(sentence, /\s{2,}/, sentence.slice(0, 60));
    assert.doesNotMatch(sentence, /\s[.,;:!?]/, sentence.slice(0, 60));
    assert.doesNotMatch(sentence, /[.,;:!?][A-Za-zÆØÅæøå]/, `missing space after punctuation: ${sentence.slice(0, 60)}`);
    assert.doesNotMatch(sentence, /\b(\w+)\s+\1\b/i, `repeated word: ${sentence.slice(0, 60)}`);
    assert.match(sentence, /[.!?]$/, `paragraph must end with punctuation: ${sentence.slice(0, 60)}`);
    assert.equal(sentence, sentence.trim());
  }
});
