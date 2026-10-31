// Pure logic of the antonym trainer: questions, answer checking, matching rounds and results. No DOM, no storage.
// Run shape: {id, mode:'choose'|'write'|'match', theme, started, index, questions[], rounds[], round, results[], done}
import {normalize} from './engine.mjs';
import {entryForms} from './learning.mjs';
import {antonymPairs, antonymThemes, antonymConfusable, antonymAlso} from './antonym-data.mjs';

export const MODES = ['choose', 'write', 'match'];
export const QUESTIONS = 10;
export const OPTIONS = 4;
export const ROUND_PAIRS = 5;
export const ROUNDS = 2;
const pairById = Object.fromEntries(antonymPairs.map(p => [p.id, p]));
export const getPair = id => pairById[id];
export const sideWord = (pair, side) => side === 'a' ? pair.a : pair.b;
export const otherSide = side => side === 'a' ? 'b' : 'a';
const key = word => normalize(word.lemma);

const groupsOf = new Map();
antonymConfusable.forEach((group, index) => group.forEach(lemma => {
  const k = normalize(lemma);
  groupsOf.set(k, [...(groupsOf.get(k) || []), index]);
}));
/** True when two words are near-synonyms or otherwise could both pass as the opposite of the same word. */
export function confusable(first, second) {
  const x = groupsOf.get(key(first)), y = groupsOf.get(key(second));
  return !!x && !!y && x.some(g => y.includes(g));
}

export function shuffled(list, rng = Math.random) {
  const copy = [...list];
  for (let i = copy.length - 1; i > 0; i--) { const j = Math.floor(rng() * (i + 1)); [copy[i], copy[j]] = [copy[j], copy[i]]; }
  return copy;
}
export const themePairs = (theme, pairs = antonymPairs) => theme && theme !== 'all' ? pairs.filter(p => p.theme === theme) : pairs;

/** Answers accepted for the opposite of `promptSide`: the partner word, with the article for a noun, with or without "at" for a verb, plus listed equivalents. */
export function acceptedAnswers(pair, promptSide) {
  const answer = sideWord(pair, otherSide(promptSide));
  const extra = (antonymAlso[normalize(answer.lemma)] || []).flatMap(x => pair.pos === 'verb' ? [`at ${x}`, x] : [x]);
  return entryForms([answer.da, ...extra]);
}
/** {correct, articleMissing}: a noun without its article is not accepted, but the learner is told why. */
export function checkTyped(pair, promptSide, text) {
  const typed = normalize(text);
  if (!typed) return {correct: false, articleMissing: false};
  const answers = acceptedAnswers(pair, promptSide);
  if (answers.some(a => normalize(a) === typed)) return {correct: true, articleMissing: false};
  const answer = sideWord(pair, otherSide(promptSide));
  return {correct: false, articleMissing: pair.pos === 'noun' && typed === normalize(answer.lemma)};
}
export const writeHint = (pair, promptSide) => { const lemma = sideWord(pair, otherSide(promptSide)).lemma; return {first: lemma[0], length: lemma.length}; };

function distractors(pair, promptSide, all, rng, count = OPTIONS - 1) {
  const prompt = sideWord(pair, promptSide), answer = sideWord(pair, otherSide(promptSide));
  const banned = new Set([key(prompt), key(answer), ...(antonymAlso[key(answer)] || []).map(normalize)]);
  const candidates = all.filter(p => p.id !== pair.id).flatMap(p => [p.a, p.b].map(word => ({word, pair: p})))
    .filter(({word}) => !banned.has(key(word)) && !confusable(word, prompt) && !confusable(word, answer));
  const tiers = [c => c.pair.pos === pair.pos && c.pair.theme === pair.theme, c => c.pair.pos === pair.pos, () => true];
  const chosen = [], seen = new Set();
  for (const tier of tiers) {
    for (const c of shuffled(candidates.filter(tier), rng)) {
      if (chosen.length >= count) break;
      if (!seen.has(key(c.word))) { seen.add(key(c.word)); chosen.push(c.word); }
    }
  }
  return chosen;
}
const view = word => ({key: key(word), da: word.da});

function sample(pool, count, rng) {
  return shuffled(pool, rng).slice(0, count);
}
function question(pair, promptSide, mode, all, rng) {
  const base = {pairId: pair.id, promptSide, answered: false, correct: false, credit: false, helped: false, selfChecked: false, revealed: false, typed: ''};
  if (mode === 'write') return base;
  const answer = sideWord(pair, otherSide(promptSide));
  return {...base, options: shuffled([answer, ...distractors(pair, promptSide, all, rng)], rng).map(view), eliminated: [], chosen: ''};
}
/** Greedy choice of `count` pairs whose words cannot be mixed up with each other. */
export function matchRound(pool, rng = Math.random, count = ROUND_PAIRS, exclude = new Set()) {
  const chosen = [];
  for (const pair of shuffled(pool.filter(p => !exclude.has(p.id)), rng)) {
    if (chosen.length >= count) break;
    const words = [pair.a, pair.b];
    if (chosen.every(other => [other.a, other.b].every(o => words.every(w => !confusable(o, w) && key(o) !== key(w))))) chosen.push(pair);
  }
  return chosen;
}
function round(pairs, rng) {
  return {pairIds: pairs.map(p => p.id), left: shuffled(pairs.map(p => p.id), rng), right: shuffled(pairs.map(p => p.id), rng), matched: [], selected: null, flash: null, mistakes: {}, hinted: {}};
}

/** A new run. `count` is the number of questions (choose/write); match plays ROUNDS rounds of ROUND_PAIRS pairs. */
export function startRun({mode, theme = 'all', pairs = antonymPairs, count = QUESTIONS, rng = Math.random, now = Date.now(), id = `ant-${now.toString(36)}-${Math.random().toString(36).slice(2, 8)}`}) {
  if (!MODES.includes(mode)) throw new Error('Unknown mode');
  const pool = themePairs(theme, pairs);
  const run = {id, mode, theme: theme || 'all', started: now, index: 0, questions: [], rounds: [], round: 0, results: [], done: false};
  if (mode === 'match') {
    const used = new Set();
    for (let r = 0; r < ROUNDS; r++) {
      const chosen = matchRound(pool, rng, ROUND_PAIRS, used);
      if (chosen.length < 2) break;
      chosen.forEach(p => used.add(p.id));
      run.rounds.push(round(chosen, rng));
    }
    if (!run.rounds.length) run.done = true;
  } else {
    run.questions = sample(pool, Math.min(count, pool.length), rng).map(pair => question(pair, rng() < 0.5 ? 'a' : 'b', mode, pairs, rng));
    if (!run.questions.length) run.done = true;
  }
  return run;
}

const clone = run => structuredClone(run);
function record(run, q, extra = {}) {
  const pair = getPair(q.pairId);
  run.results.push({pairId: q.pairId, theme: pair.theme, credit: q.credit, assisted: q.helped || q.revealed, selfChecked: q.selfChecked, ...extra});
}
/** Chooses an option. Right and unaided = credit (XP); right after a hint is correct but without credit. */
export function choose(run, optionKey) {
  const q = run.questions[run.index];
  if (!q || q.answered || q.eliminated.includes(optionKey) || !q.options.some(o => o.key === optionKey)) return run;
  const next = clone(run), nq = next.questions[next.index], pair = getPair(nq.pairId);
  nq.answered = true; nq.chosen = optionKey;
  nq.correct = optionKey === key(sideWord(pair, otherSide(nq.promptSide)));
  nq.credit = nq.correct && !nq.helped;
  record(next, nq);
  return next;
}
/** 50:50 — two wrong options are removed. Counts as help. */
export function hintChoice(run, rng = Math.random) {
  const q = run.questions[run.index];
  if (!q || q.answered || q.helped || q.mode === 'write' || !q.options) return run;
  const next = clone(run), nq = next.questions[next.index], pair = getPair(nq.pairId), right = key(sideWord(pair, otherSide(nq.promptSide)));
  nq.helped = true;
  nq.eliminated = shuffled(nq.options.filter(o => o.key !== right), rng).slice(0, 2).map(o => o.key);
  return next;
}
export function hintWrite(run) {
  const q = run.questions[run.index];
  if (!q || q.answered || q.helped) return run;
  const next = clone(run); next.questions[next.index].helped = true; return next;
}
export function submitTyped(run, text) {
  const q = run.questions[run.index];
  if (!q || q.answered || !String(text ?? '').trim()) return run;
  const next = clone(run), nq = next.questions[next.index], pair = getPair(nq.pairId), result = checkTyped(pair, nq.promptSide, text);
  nq.answered = true; nq.typed = String(text).slice(0, 80); nq.correct = result.correct; nq.articleMissing = result.articleMissing;
  nq.credit = result.correct && !nq.helped;
  record(next, nq);
  return next;
}
export function giveUp(run) {
  const q = run.questions[run.index];
  if (!q || q.answered) return run;
  const next = clone(run), nq = next.questions[next.index];
  nq.answered = true; nq.revealed = true; nq.correct = false; nq.credit = false;
  record(next, nq);
  return next;
}
/** The learner judges a wrong typed answer to be an equivalent word. Never pays XP. */
export function selfCheck(run) {
  const q = run.questions[run.index];
  if (!q || !q.answered || q.correct || q.selfChecked || q.revealed || !q.typed) return run;
  const next = clone(run), nq = next.questions[next.index];
  nq.selfChecked = true; nq.correct = true; nq.credit = false;
  const last = next.results.findLast(r => r.pairId === nq.pairId);
  if (last) { last.selfChecked = true; last.credit = false; last.assisted = true; }
  return next;
}
export function next(run) {
  if (run.mode === 'match') {
    const r = run.rounds[run.round];
    if (!r || r.matched.length < r.pairIds.length) return run;
    const n = clone(run);
    if (n.round + 1 >= n.rounds.length) n.done = true; else n.round++;
    return n;
  }
  const q = run.questions[run.index];
  if (!q?.answered) return run;
  const n = clone(run);
  if (n.index + 1 >= n.questions.length) n.done = true; else n.index++;
  return n;
}

/** Taps in a matching round: one word from each column, in either order. */
export function tap(run, side, pairId) {
  const r = run.rounds[run.round];
  if (!r || r.matched.includes(pairId) || !r.pairIds.includes(pairId)) return run;
  const n = clone(run), nr = n.rounds[n.round];
  nr.flash = null;
  if (!nr.selected || nr.selected.side === side) { nr.selected = nr.selected && nr.selected.side === side && nr.selected.id === pairId ? null : {side, id: pairId}; return n; }
  const first = nr.selected; nr.selected = null;
  if (first.id === pairId) {
    nr.matched.push(pairId);
    const pair = getPair(pairId), missed = nr.mistakes[pairId] || 0, hinted = !!nr.hinted[pairId];
    n.results.push({pairId, theme: pair.theme, credit: !missed && !hinted, assisted: hinted, selfChecked: false});
  } else {
    nr.mistakes[first.id] = (nr.mistakes[first.id] || 0) + 1; nr.mistakes[pairId] = (nr.mistakes[pairId] || 0) + 1;
    nr.flash = side === 'a' ? {a: pairId, b: first.id} : {a: first.id, b: pairId};
  }
  return n;
}
/** Reveals one open pair (marks both words) and counts it as help. */
export function hintMatch(run) {
  const r = run.rounds[run.round];
  if (!r) return run;
  const open = r.pairIds.filter(id => !r.matched.includes(id));
  if (open.length < 1) return run;
  const n = clone(run), nr = n.rounds[n.round], id = open.find(i => nr.hinted[i]) || open[0];
  nr.hinted[id] = true; nr.flash = null; nr.selected = null; nr.hint = id;
  return n;
}

export function progress(run) {
  if (run.mode === 'match') { const total = run.rounds.reduce((s, r) => s + r.pairIds.length, 0); return {done: run.results.length, total}; }
  return {done: run.questions.filter(q => q.answered).length, total: run.questions.length};
}
/** Result of a finished run: unaided right answers, per-theme counts and the XP rule (10 per unaided right answer, none for help). */
export function summary(run) {
  const total = run.mode === 'match' ? run.rounds.reduce((s, r) => s + r.pairIds.length, 0) : run.questions.length;
  const correct = run.results.filter(r => r.credit).length;
  const byTheme = antonymThemes.map(t => {
    const items = run.results.filter(r => r.theme === t.id);
    return {id: t.id, title: t.title, total: items.length, correct: items.filter(r => r.credit).length};
  }).filter(t => t.total);
  const xp = correct * 10;
  return {total, correct, assisted: run.results.filter(r => r.assisted).length, byTheme, xp, percent: total ? Math.round(correct / total * 100) : 0};
}
export function minutes(run, now = Date.now()) { return Math.max(1, Math.min(60, Math.round((now - run.started) / 60000))); }

// Best result per theme, kept on this device only (not in the synced progress).
export const STATS_KEY = 'danskdag.antonyms.v1';
export function loadStats(storage = globalThis.localStorage) {
  try {
    const data = JSON.parse(storage.getItem(STATS_KEY));
    const out = {};
    if (data?.v === 1 && data.themes && typeof data.themes === 'object') for (const t of antonymThemes) {
      const s = data.themes[t.id];
      if (s && Number.isInteger(s.best) && s.best >= 0 && s.best <= 100 && Number.isInteger(s.runs) && s.runs >= 0) out[t.id] = {best: s.best, runs: s.runs};
    }
    return out;
  } catch { return {}; }
}
export function saveStats(sum, storage = globalThis.localStorage) {
  try {
    const stats = loadStats(storage);
    for (const t of sum.byTheme) {
      const percent = Math.round(t.correct / t.total * 100), old = stats[t.id] || {best: 0, runs: 0};
      stats[t.id] = {best: Math.max(old.best, percent), runs: old.runs + 1};
    }
    storage.setItem(STATS_KEY, JSON.stringify({v: 1, themes: stats}));
    return stats;
  } catch { return null; }
}
