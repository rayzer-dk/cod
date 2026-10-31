// Antonym section: the list in the reference tab "Противоположности" and the full-screen trainer (three modes).
// The trainer logic is in antonym-practice.mjs; this file draws it and handles its clicks. app.mjs only forwards events.
import {h, icon, button as btn, plural, spoken, pronounce, teachingText} from './ui.mjs';
import {insertAtSelection} from './accessibility.mjs';
import {antonymThemes, antonymPosNames} from './antonym-data.mjs';
import {MODES, startRun, getPair, sideWord, otherSide, choose, hintChoice, hintWrite, submitTyped, giveUp, selfCheck, next, tap, hintMatch, progress, summary, writeHint, minutes, loadStats, saveStats} from './antonym-practice.mjs';

// All Russian interface text lives here, so the templates below stay free of it.
const T = {
  addFailed: 'Не удалось добавить слово.', tooMany: 'В «Мои слова» уже слишком много слов.', added: 'Слово добавлено в «Мои слова».', already: 'Это слово уже есть в словаре.',
  needAnswer: 'Напиши ответ или нажми «Не знаю».', fewPairs: 'В этой теме пока мало пар для тренировки.', notPair: 'Эти слова не пара.', maxLen: 'Достигнута максимальная длина ответа.',
  inWords: 'в моих словах', toWords: 'в мои слова', allThemes: 'Все темы', say: 'Приблизительно; слушай озвучку. Stød и мягкое d на письме не передаются.',
  training: 'Тренировка', pickTheme: '. Выбери тему в списке ниже, чтобы тренировать только её.', xpNote: 'За верный ответ без подсказки — 10 XP, как в обычных занятиях. С подсказкой или самопроверкой XP нет.',
  byTheme: 'Результаты по темам', examples: 'Примеры',
  about: 'О произношении', aboutText: 'Нажми на слово, чтобы услышать его. Подсказки со знаком ≈ — приблизительные, в них нет всех звуков: слушай озвучку. Значок ˀ после слова — stød (короткое гортанное прерывание); его, как и мягкое d, на письме не видно. Подсказки даны только там, где они надёжны.',
  exit: 'Выйти из тренировки', progress: 'Ход тренировки', listen: 'Послушать слово', listenOption: 'Послушать вариант',
  selfDone: 'Самопроверка отмечена.', rightHelped: 'Верно, но с подсказкой.', right: 'Верно.', shown: 'Ответ показан.', remember: 'Запомним этот момент.',
  needArticle: 'Нужен артикль: в ответе существительное пишут с en или et.', yourAnswer: 'Твой ответ', selfNote: 'Этот ответ отмечен тобой после сравнения. Он не добавляет XP.',
  compare: 'Другое слово может подойти по смыслу. Сравни со словом выше.', selfButton: 'Мой вариант равнозначен · отметить самопроверкой',
  review: 'Разбор остаётся перед тобой до следующего задания.', next: 'Продолжить', check: 'Проверить',
  chooseTitle: 'Найди противоположность', writeTitle: 'Напиши противоположность', matchTitle: 'Соедини пары',
  options: 'Варианты ответа', hintDone: 'Два неверных варианта убраны · XP за это слово нет', hint5050: 'Подсказка · убрать два неверных варианта', giveUp: 'Не знаю · показать ответ', digits: 'Цифры 1–4 выбирают вариант.',
  article: 'С артиклем: en/et', verbAt: 'Глагол: at можно не писать', hintWord: 'Подсказка', letter: ['буква', 'буквы', 'букв'], hintShown: 'Подсказка показана · XP за это слово нет', hintFirst: 'Подсказка · первая буква и длина', enter: 'Enter — проверить ответ.', yourWrite: 'Твой ответ',
  round: 'Раунд', of: 'из', matchHelp: 'Нажми слово слева, затем его противоположность справа. Можно и в обратном порядке.', left: 'Слова слева', right2: 'Слова справа', found: 'Найдено', notPairStatus: ' · эти слова не пара',
  listenSel: 'Послушать выбранное слово', hintPair: 'Подсказка · показать пару (без XP за неё)', allFound: 'Все пары найдены.', errorsCount: 'Ошибки считаются: чистая пара — без ошибок и подсказок.', further: 'Дальше', resultWord: 'Результат',
  clean: 'Чистая работа.', counted: 'Практика засчитана.', noHints: 'без подсказок с первой попытки', helpedWords: ['слово с подсказкой', 'слова с подсказкой', 'слов с подсказкой'], runs: ['тренировка', 'тренировки', 'тренировок'],
  resultNote: 'Слова, в которых ошибся, найди в списке и добавь в «Мои слова», чтобы они вернулись в повторение.', again: 'Ещё раз', toList: 'К списку', roundWord: 'Раунд'
};
const MODE_INFO = {
  choose: ['Найди противоположность', 'Четыре варианта, слово можно прослушать'],
  write: ['Напиши противоположность', 'Ввод с клавиатуры: у существительного нужен артикль'],
  match: ['Соедини пары', 'Пять пар в каждом из двух раундов']
};
const themeTitle = id => antonymThemes.find(t => t.id === id)?.title || T.allThemes;
const stod = w => w.stod ? '<sup class="antonym-stod" title="stød" aria-label="stød">ˀ</sup>' : '';
const sayLine = w => w.say ? `<small class="antonym-say" title="${h(T.say)}">≈ ${h(w.say)}</small>` : '';

// ---- List in the reference tab ---------------------------------------------------------------------------------
function wordBlock(w) {
  return `<div class="antonym-word"><span class="antonym-main">${spoken(w.da)}${stod(w)}</span><small class="antonym-ru">${h(w.ru)}</small>${sayLine(w)}</div>`;
}
function addButton(pair, side, has) {
  const w = sideWord(pair, side), added = has(w.da);
  return `<button type="button" class="remember-button antonym-add ${added ? 'active' : ''}" data-action="ant-add" data-pair="${h(pair.id)}" data-side="${side}" aria-pressed="${added}" ${added ? 'disabled' : ''}>${icon(added ? 'check' : 'plus')}<span lang="da">${h(w.da)}</span> · ${added ? T.inWords : T.toWords}</button>`;
}
export function pairCard(pair, has = () => false) {
  return `<article class="antonym-card" data-pair="${h(pair.id)}"><small class="antonym-badge">${h(themeTitle(pair.theme))} · ${h(antonymPosNames[pair.pos] || '')}</small><div class="antonym-words">${wordBlock(pair.a)}<span class="antonym-sep" aria-hidden="true">↔</span>${wordBlock(pair.b)}</div><details class="antonym-details"><summary>${T.examples}${icon('chevron')}</summary><div class="entry-body"><div class="word-example"><p>${spoken(pair.exampleA.da)}</p><small>${h(pair.exampleA.ru)}</small></div><div class="word-example"><p>${spoken(pair.exampleB.da)}</p><small>${h(pair.exampleB.ru)}</small></div>${pair.note ? `<p class="field-note">${teachingText(pair.note)}</p>` : ''}<div class="common-card-actions antonym-actions">${addButton(pair, 'a', has)}${addButton(pair, 'b', has)}</div></div></details></article>`;
}
function trainerPanel(selected, stats) {
  const best = antonymThemes.filter(t => stats[t.id]);
  return `<section class="panel antonym-trainer" aria-label="${h(T.training)}"><div class="section-title"><div><h2>${T.training}</h2><p>${h(themeTitle(selected))}${T.pickTheme}</p></div></div><div class="antonym-modes">${MODES.map(mode => `<button type="button" class="antonym-mode" data-action="ant-start" data-value="${mode}" data-theme="${h(selected)}"><b>${MODE_INFO[mode][0]}</b><small>${MODE_INFO[mode][1]}</small></button>`).join('')}</div><p class="field-note">${T.xpNote}</p>${best.length ? `<details class="antonym-stats"><summary>${T.byTheme}${icon('chevron')}</summary><ul>${best.map(t => `<li><span>${h(t.title)}</span><b>${stats[t.id].best}%</b><small>${stats[t.id].runs} ${plural(stats[t.id].runs, T.runs)}</small></li>`).join('')}</ul></details>` : ''}</section>`;
}
/** The antonym tab. `c.antonym` (the page controller) is optional so the list also renders without the trainer. */
export function renderAntonyms(data, c) {
  const has = c.antonym?.has || (() => false);
  const stats = c.antonym?.stats ? c.antonym.stats() : {};
  const selected = antonymThemes.some(t => t.id === c.referenceCategory) ? c.referenceCategory : 'all';
  return `${trainerPanel(selected, stats)}<details class="coverage-note antonym-sound"><summary>${T.about}</summary><p>${T.aboutText}</p></details><div class="antonym-list">${data.items.map(pair => pairCard(pair, has)).join('')}</div>`;
}

// ---- Trainer screen ----------------------------------------------------------------------------------------------
const header = (run, title) => {
  const p = progress(run), shown = Math.min(p.done + 1, p.total);
  return `<header class="session-header"><button class="icon-button" data-action="ant-exit" title="${h(T.exit)}" aria-label="${h(T.exit)}">${icon('close')}</button><div class="session-meter"><div class="meter" role="progressbar" aria-label="${h(T.progress)}" aria-valuenow="${p.done}" aria-valuemax="${p.total}" aria-valuemin="0"><span style="width:${p.total ? p.done / p.total * 100 : 0}%"></span></div><span>${h(title)}</span></div><b>${shown}<small> / ${p.total}</small></b></header>`;
};
const meta = (run, pair) => `<div class="exercise-meta"><span class="pill purple">${h(run.theme === 'all' ? themeTitle(pair?.theme) : themeTitle(run.theme))}</span><span>${MODE_INFO[run.mode][0]}</span></div>`;
function promptBlock(w) {
  return `<div class="exercise-prompt antonym-prompt"><span class="pill purple">DA</span><p lang="da">${h(w.da)}${stod(w)}</p>${pronounce(w.da, T.listen, 'icon-button')}</div><p class="gap-meaning">${h(w.ru)}</p>${sayLine(w)}`;
}
function revealBlock(pair, promptSide, q) {
  const prompt = sideWord(pair, promptSide), answer = sideWord(pair, otherSide(promptSide));
  const sentence = ex => `<div class="word-example"><p>${spoken(ex.da)}</p><small>${h(ex.ru)}</small></div>`;
  const first = promptSide === 'a' ? [pair.exampleA, pair.exampleB] : [pair.exampleB, pair.exampleA];
  const tone = q.correct ? 'good' : 'bad';
  const title = q.selfChecked ? T.selfDone : q.correct ? (q.helped ? T.rightHelped : T.right) : q.revealed ? T.shown : T.remember;
  return `<section class="answer-feedback ${q.selfChecked ? 'self-checked' : tone}" role="status"><div class="feedback-heading">${icon(q.correct ? 'check' : 'info')}<h3>${title}</h3></div><p class="antonym-pairline">${spoken(prompt.da)} <span aria-hidden="true">↔</span> ${spoken(answer.da)}</p>${q.articleMissing ? `<p>${T.needArticle}</p>` : ''}${!q.correct && q.typed ? `<p>${T.yourAnswer}: <b lang="da">${h(q.typed)}</b></p>` : ''}${sentence(first[0])}${sentence(first[1])}${pair.note ? `<p class="field-note">${teachingText(pair.note)}</p>` : ''}${q.correct && q.selfChecked ? `<p>${T.selfNote}</p>` : ''}${!q.correct && q.typed && !q.revealed && !q.articleMissing ? `<div class="answer-comparison"><p>${T.compare}</p><button class="text-button" data-action="ant-selfcheck">${T.selfButton}</button></div>` : ''}</section>`;
}
const footer = (answered, extra = '') => `<footer class="exercise-footer"><small>${answered ? T.review : extra}</small>${btn(`${answered ? T.next : T.check} ${icon('arrow')}`, answered ? 'ant-next' : 'ant-check', 'primary')}</footer>`;

function chooseView(run) {
  const q = run.questions[run.index], pair = getPair(q.pairId), prompt = sideWord(pair, q.promptSide), right = sideWord(pair, otherSide(q.promptSide));
  const rightKey = q.options.find(o => o.da === right.da)?.key;
  const options = q.options.map((o, i) => {
    const out = q.eliminated.includes(o.key), classes = ['answer-option', q.chosen === o.key ? 'selected' : '', q.answered && o.key === rightKey ? 'correct' : '', q.answered && q.chosen === o.key && o.key !== rightKey ? 'incorrect' : ''].join(' ');
    return `<div class="answer-option-row"><button class="${classes}" data-action="ant-choose" data-value="${h(o.key)}" aria-pressed="${q.chosen === o.key}" ${q.answered || out ? 'disabled' : ''}><span class="option-number">${i + 1}</span><span lang="da">${h(o.da)}</span>${q.chosen === o.key ? icon('check') : ''}</button>${pronounce(o.da, T.listenOption)}</div>`;
  }).join('');
  return `<div class="exercise">${meta(run, pair)}<h1>${T.chooseTitle}</h1>${promptBlock(prompt)}<div class="answer-options" role="group" aria-label="${h(T.options)}">${options}</div>${q.answered ? revealBlock(pair, q.promptSide, q) : `<button class="give-up" data-action="ant-hint" ${q.helped ? 'disabled' : ''}>${q.helped ? T.hintDone : T.hint5050}</button><button class="give-up" data-action="ant-giveup">${T.giveUp}</button>`}<footer class="exercise-footer"><small>${q.answered ? T.review : T.digits}</small>${q.answered ? btn(`${T.next} ${icon('arrow')}`, 'ant-next') : ''}</footer></div>`;
}
function writeView(run) {
  const q = run.questions[run.index], pair = getPair(q.pairId), prompt = sideWord(pair, q.promptSide);
  const hint = writeHint(pair, q.promptSide);
  const form = pair.pos === 'noun' ? T.article : pair.pos === 'verb' ? T.verbAt : '';
  return `<div class="exercise">${meta(run, pair)}<h1>${T.writeTitle}</h1>${form ? `<p class="form-request">${icon('info')}${form}</p>` : ''}${promptBlock(prompt)}${q.helped && !q.answered ? `<p class="form-request">${icon('info')}${T.hintWord}: ${h(hint.first)}… · ${hint.length} ${plural(hint.length, T.letter)}</p>` : ''}<label for="ant-answer" class="answer-label">${T.yourWrite}</label><input id="ant-answer" class="answer-input" type="text" lang="da" autocomplete="off" autocapitalize="none" autocorrect="off" spellcheck="false" enterkeyhint="done" maxlength="80" placeholder="Skriv på dansk…" value="${h(q.typed)}" ${q.answered ? 'disabled' : ''}><div class="danish-keys">${['æ', 'ø', 'å'].map(letter => `<button type="button" data-action="ant-letter" data-letter="${letter}" ${q.answered ? 'disabled' : ''}>${letter}</button>`).join('')}</div>${q.answered ? revealBlock(pair, q.promptSide, q) : `<button class="give-up" data-action="ant-hint" ${q.helped ? 'disabled' : ''}>${q.helped ? T.hintShown : T.hintFirst}</button><button class="give-up" data-action="ant-giveup">${T.giveUp}</button>`}${footer(q.answered, T.enter)}</div>`;
}
function matchView(run) {
  const r = run.rounds[run.round], done = r.matched.length === r.pairIds.length;
  const item = (side, id) => {
    const pair = getPair(id), w = sideWord(pair, side), matched = r.matched.includes(id);
    const selected = r.selected?.side === side && r.selected.id === id, wrong = r.flash?.[side] === id, hinted = r.hint === id && !matched;
    return `<button class="match-item ${matched ? 'matched' : ''} ${selected ? 'selected' : ''} ${wrong ? 'wrong' : ''} ${hinted ? 'hinted' : ''}" data-action="ant-tap" data-side="${side}" data-id="${h(id)}" aria-pressed="${selected}" ${matched ? 'disabled' : ''} lang="da"><span>${h(w.da)}${stod(w)}</span>${matched ? icon('check') : ''}</button>`;
  };
  const selectedWord = r.selected ? sideWord(getPair(r.selected.id), r.selected.side) : null;
  return `<div class="exercise"><div class="exercise-meta"><span class="pill purple">${h(run.theme === 'all' ? T.allThemes : themeTitle(run.theme))}</span><span>${T.round} ${run.round + 1} ${T.of} ${run.rounds.length}</span></div><h1>${T.matchTitle}</h1><p class="field-note">${T.matchHelp}</p><div class="match-board"><div class="match-col" role="group" aria-label="${h(T.left)}">${r.left.map(id => item('a', id)).join('')}</div><div class="match-col" role="group" aria-label="${h(T.right2)}">${r.right.map(id => item('b', id)).join('')}</div></div><p class="match-status" role="status">${T.found} ${r.matched.length} ${T.of} ${r.pairIds.length}${r.flash ? T.notPairStatus : ''}</p><div class="match-tools">${btn(`${icon('sound')} ${T.listenSel}`, 'ant-listen', 'secondary', selectedWord ? '' : 'disabled')}${done ? '' : `<button class="give-up" data-action="ant-hint">${T.hintPair}</button>`}</div><footer class="exercise-footer"><small>${done ? T.allFound : T.errorsCount}</small>${done ? btn(`${run.round + 1 >= run.rounds.length ? T.resultWord : T.further} ${icon('arrow')}`, 'ant-next') : ''}</footer></div>`;
}
function resultScreen(run, sum) {
  return `<main class="session-shell"><section class="result antonym-result"><div class="result-art">${icon('trophy')}<span>${icon('spark')}</span></div><span class="eyebrow">GODT KLARET</span><h1>${sum.percent === 100 ? T.clean : T.counted}</h1><p>${MODE_INFO[run.mode][0]}</p><div class="result-stat-grid"><div class="mint"><b>+${sum.xp}</b><span>XP</span></div><div class="purple"><b>${sum.percent}%</b><span>${T.noHints}</span></div><div class="peach"><b>${sum.assisted}</b><span>${plural(sum.assisted, T.helpedWords)}</span></div></div><section class="antonym-theme-results"><h2>${T.byTheme}</h2><ul>${sum.byTheme.map(t => `<li><span>${h(t.title)}</span><b>${t.correct} / ${t.total}</b></li>`).join('')}</ul></section><p class="result-note">${T.resultNote}</p><div class="result-actions">${btn(T.again, 'ant-again', 'primary')}${btn(T.toList, 'ant-exit', 'secondary')}</div></section></main>`;
}
export function runView(run) {
  if (run.done) return resultScreen(run, summary(run));
  const body = run.mode === 'match' ? matchView(run) : run.mode === 'write' ? writeView(run) : chooseView(run);
  return `<main class="session-shell antonym-run">${header(run, MODE_INFO[run.mode][0])}${body}</main>`;
}

// ---- Controller ----------------------------------------------------------------------------------------------------
/** deps: root(), say(text,rate,control), toast(text), announce(text), enhance(scope), rerender(), award({id,correct,total,minutes}), vocab:{has(da),add(words)}, storage? */
export function createAntonymPage(deps) {
  let run = null, awarded = false;
  const storage = () => { try { return deps.storage ? deps.storage() : globalThis.localStorage; } catch { return null; } };
  const stats = () => { const s = storage(); return s ? loadStats(s) : {}; };
  const has = da => { try { return !!deps.vocab?.has(da); } catch { return false; } };
  function finishIfDone() {
    if (!run?.done || awarded) return;
    awarded = true;
    const sum = summary(run);
    if (sum.total < 1) return;
    try { deps.award?.({id: run.id, correct: sum.correct, total: sum.total, minutes: minutes(run)}); } catch { /* A failed award never blocks the result. */ }
    const s = storage(); if (s) saveStats(sum, s);
  }
  function draw({focus = true} = {}) {
    if (!run) return;
    finishIfDone();
    const root = deps.root();
    document.body.classList.add('session-mode');
    root.innerHTML = runView(run);
    deps.enhance?.(root);
    if (!focus) return;
    const q = run.mode !== 'match' ? run.questions[run.index] : null;
    if (run.done) root.querySelector('h1')?.setAttribute('tabindex', '-1'), root.querySelector('h1')?.focus({preventScroll: true});
    else if (q?.answered) root.querySelector('[data-action=ant-next]')?.focus({preventScroll: true});
    else if (run.mode === 'write') root.querySelector('#ant-answer')?.focus({preventScroll: true});
    window.scrollTo(0, 0);
  }
  function update(nextRun, announce = '') {
    run = nextRun; draw();
    if (announce) deps.announce?.(announce);
  }
  const feedbackText = () => document.querySelector('.answer-feedback')?.textContent || '';
  function addWord(el) {
    const pair = getPair(el.dataset.pair), word = pair && sideWord(pair, el.dataset.side === 'b' ? 'b' : 'a');
    if (!word || !deps.vocab) return true;
    const example = el.dataset.side === 'b' ? pair.exampleB : pair.exampleA;
    const result = deps.vocab.add([{da: word.da, ru: word.ru, note: `${example.da} — ${example.ru}`}]);
    if (result.failed) deps.toast(T.addFailed);
    else if (result.full) deps.toast(T.tooMany);
    else deps.toast(result.added ? T.added : T.already);
    if (result.added || has(word.da)) {
      for (const b of document.querySelectorAll(`[data-action="ant-add"][data-pair="${pair.id}"][data-side="${el.dataset.side}"]`)) {
        b.disabled = true; b.classList.add('active'); b.setAttribute('aria-pressed', 'true');
        b.innerHTML = `${icon('check')}<span lang="da">${h(word.da)}</span> · ${T.inWords}`;
      }
    }
    return true;
  }
  function check() {
    const q = run?.questions?.[run.index];
    if (!q || q.answered) return;
    const field = document.querySelector('#ant-answer');
    if (!field?.value.trim()) { deps.toast(T.needAnswer); field?.focus(); return; }
    update(submitTyped(run, field.value));
    deps.announce?.(feedbackText());
  }
  return {
    get running() { return !!run; },
    has, stats,
    start(mode, theme = 'all') { run = startRun({mode, theme}); awarded = false; if (run.done) { run = null; deps.toast(T.fewPairs); return; } draw(); },
    stop() { run = null; awarded = false; },
    draw,
    click(el) {
      const action = el.dataset.action;
      if (!action?.startsWith('ant-')) return false;
      if (action === 'ant-add') return addWord(el);
      if (action === 'ant-start') { this.start(MODES.includes(el.dataset.value) ? el.dataset.value : 'choose', el.dataset.theme || 'all'); return true; }
      if (!run) return true;
      if (action === 'ant-exit') { run = null; awarded = false; document.body.classList.remove('session-mode'); deps.rerender(); return true; }
      if (action === 'ant-again') { this.start(run.mode, run.theme); return true; }
      if (action === 'ant-choose') { update(choose(run, el.dataset.value)); deps.announce?.(feedbackText()); return true; }
      if (action === 'ant-check') { check(); return true; }
      if (action === 'ant-next') { update(next(run)); return true; }
      if (action === 'ant-hint') { update(run.mode === 'match' ? hintMatch(run) : run.mode === 'write' ? hintWrite(run) : hintChoice(run)); return true; }
      if (action === 'ant-giveup') { update(giveUp(run)); deps.announce?.(feedbackText()); return true; }
      if (action === 'ant-selfcheck') { update(selfCheck(run)); return true; }
      if (action === 'ant-tap') { update(tap(run, el.dataset.side === 'b' ? 'b' : 'a', el.dataset.id)); const r = run.rounds[run.round]; if (r?.flash) deps.announce?.(T.notPair); return true; }
      if (action === 'ant-listen') { const r = run.rounds[run.round]; if (r?.selected) deps.say?.(sideWord(getPair(r.selected.id), r.selected.side).da, undefined, el); return true; }
      if (action === 'ant-letter') {
        const input = document.querySelector('#ant-answer');
        if (!input || input.disabled) return true;
        const start = input.selectionStart ?? input.value.length, end = input.selectionEnd ?? start;
        const inserted = insertAtSelection(input.value, start, end, el.dataset.letter, input.maxLength > 0 ? input.maxLength : 80);
        input.focus();
        if (!inserted) { deps.toast(T.maxLen); return true; }
        input.value = inserted.value; input.setSelectionRange(inserted.caret, inserted.caret);
        return true;
      }
      return true;
    },
    keydown(event) {
      if (!run || run.done) return false;
      if (event.key === 'Enter' && !event.repeat && !event.isComposing && event.keyCode !== 229) {
        if (event.target.closest?.('button,summary,a,select')) return false;
        if (run.mode === 'write') { event.preventDefault(); const q = run.questions[run.index]; q.answered ? update(next(run)) : check(); return true; }
        if (run.mode === 'choose' && run.questions[run.index].answered) { event.preventDefault(); update(next(run)); return true; }
        return false;
      }
      if (run.mode === 'choose' && /^[1-4]$/.test(event.key) && !event.target.closest?.('input,textarea')) {
        const q = run.questions[run.index], option = q.options[Number(event.key) - 1];
        if (option && !q.answered) { update(choose(run, option.key)); deps.announce?.(feedbackText()); return true; }
      }
      return false;
    }
  };
}
