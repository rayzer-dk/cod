// Markup of the PD3 grammar practice: the card and "frequent mistakes" of the hub, the list of sets with the category filter, the intro,
// one task at a time with the review, and the result. Every function returns an HTML string; the logic is in pd3-grammar.mjs.
// The right answer is never put into the markup before the task is checked (not in the DOM, nor in aria-labels or titles).
import {h,icon,plural} from './ui.mjs';
import {backButton,pageHead,lettersBar,clock,checkbox} from './pd3-ui.mjs';
import {
  GRAMMAR_MINUTES,GRAMMAR_MIN_ANSWERED,clozeGaps,fixTokens,answerText,correctAnswer,checkItem,categoryOf,categoryRows,weakCategory,
  frequentMistakes,categoryCount,grammarSets,grammarCategories,recommendations,linksFor,countsForXp
} from './pd3-grammar.mjs';

const hasCyrillic=text=>/[А-Яа-яЁё]/.test(text);
const langOf=text=>hasCyrillic(String(text))?'':' lang="da"';
const percent=(ok,all)=>all?Math.round(ok/all*100):0;
const tasks=n=>`${n} ${plural(n,['задание','задания','заданий'])}`;
const FIELD='lang="da" autocapitalize="none" autocorrect="off" autocomplete="off" spellcheck="false" enterkeyhint="done"';
export const TYPE_HELP={
  gap:'Выбери вариант, который подходит по грамматике и по смыслу.',
  cloze:'Выбери слово для каждого пропуска.',
  fix:'В предложении одна ошибка. Нажми на неверное слово и впиши, как должно быть.',
  transform:'Перепиши предложение по заданию целиком.',
  order:'Собери предложение из слов: нажимай на них по порядку.'
};

/* ---------- hub ---------- */
/** The text and progress line of the hub card. */
export function grammarCardInfo(data,d){
  const sets=grammarSets(data),done=sets.filter(set=>d.grammar?.sets?.[set.id]?.attempts).length;
  return {
    text:'Выбери форму, исправь ошибку, перепиши предложение и собери фразу: 10 заданий за 15 минут, разбор по темам.',
    progress:`Пройдено наборов: ${done} из ${sets.length}`,count:sets.length
  };
}
/** Hub block: the three categories with the largest share of mistakes (at least 10 answers each) with a link to practise; '' until then. */
export function grammarWeakView({d,data}){
  const rows=frequentMistakes(d.grammar,grammarCategories(data));
  if(!rows.length)return '';
  return `<section class="panel pd3-weak pd3-gram-weak" aria-labelledby="pd3-gram-weak-title"><h2 id="pd3-gram-weak-title">Частые ошибки по грамматике</h2>
<p class="field-note">Считается по проверенным заданиям: категории, где неверных ответов больше всего (от 10 ответов). Число показывает долю ошибок.</p>
<ol class="pd3-weak-list">${rows.map(row=>`<li><span><b>${h(row.title)}</b> · ошибок ${row.errors} из ${row.all} (${row.share}%)</span><button type="button" class="btn secondary" data-action="pd3-gram-practice" data-id="${h(row.id)}" aria-label="Потренировать: ${h(row.title)}">Потренировать</button></li>`).join('')}</ol></section>`;
}

/* ---------- list of sets ---------- */
function categoryBlock(rows,run,sets){
  const open=run.tips||{};
  return `<section class="panel pd3-gram-cats" aria-labelledby="pd3-gram-cats-title"><h2 id="pd3-gram-cats-title">Темы</h2>
<p class="field-note">Выбери тему, чтобы увидеть наборы, где её больше всего. Кнопка «Правило» показывает короткую подсказку.</p>
<ul class="pd3-gram-catlist"><li class="pd3-gram-cat"><button type="button" class="pd3-gram-filter ${run.filter==='all'?'active':''}" data-action="pd3-gram-filter" data-value="all" aria-pressed="${run.filter==='all'}"><span>Все темы</span></button></li>${rows.map(row=>{
    const count=sets.filter(set=>categoryCount(set,row.id)>0).length;
    return `<li class="pd3-gram-cat"><button type="button" class="pd3-gram-filter ${run.filter===row.id?'active':''}" data-action="pd3-gram-filter" data-value="${h(row.id)}" aria-pressed="${run.filter===row.id}"><span>${h(row.title)}</span><small>${row.all?`верно ${row.ok} из ${row.all} · наборов: ${count}`:`наборов: ${count}`}</small></button><button type="button" class="text-button pd3-gram-tipbtn" data-action="pd3-gram-tip" data-value="${h(row.id)}" aria-expanded="${!!open[row.id]}" aria-controls="pd3-gram-tip-${h(row.id)}">Правило</button><p id="pd3-gram-tip-${h(row.id)}" class="pd3-gram-tip note-box" ${open[row.id]?'':'hidden'}>${h(row.tip)}</p></li>`;
  }).join('')}</ul></section>`;
}

export function grammarListView({data,d,run}){
  const sets=grammarSets(data),cats=grammarCategories(data),rows=categoryRows(d.grammar,cats);
  const filter=run.filter!=='all'&&cats.some(c=>c.id===run.filter)?run.filter:'all';
  const weak=weakCategory(d.grammar,cats);
  const shown=(filter==='all'?sets:sets.filter(set=>categoryCount(set,filter)>0)).map((set,order)=>({set,order,count:filter==='all'?0:categoryCount(set,filter)}))
    .sort((a,b)=>b.count-a.count||a.order-b.order);
  const current=filter==='all'?null:categoryOf(cats,filter);
  const list=shown.map(({set,count})=>{
    const entry=d.grammar?.sets?.[set.id],attempts=entry?.attempts||0;
    return `<button type="button" class="panel pd3-item" data-action="pd3-gram-pick" data-id="${h(set.id)}"><span class="pill ${attempts?'mint':''}">${attempts?`Лучший результат: ${entry.best}%`:'Ещё не проходили'}</span><b${langOf(set.title)}>${h(set.title)}</b><small>${tasks(set.items.length)} · ${set.minutes||GRAMMAR_MINUTES} мин · попыток: ${attempts}${count?` · по теме: ${count}`:''}</small></button>`;
  }).join('');
  return `${backButton()}${pageHead('Грамматика B2 · формат экзамена','Наборы по 10 заданий в манере экзамена PD3: выбрать форму, исправить ошибку, переписать предложение, собрать фразу. На набор 15 минут, таймер можно отключить.')}
<div class="notice pd3-disclaimer">${icon('info')}<span>Это тренировка по мотивам формата PD3 (уровень B2), не официальный экзамен.</span></div>
${weak?`<section class="panel pd3-gram-weakcat" aria-labelledby="pd3-gram-weakcat-title"><h2 id="pd3-gram-weakcat-title">Слабая тема</h2><p><b>${h(weak.title)}</b> · верно ${weak.ok} из ${weak.all} (${percent(weak.ok,weak.all)}%)</p><div class="button-row"><button type="button" class="btn primary" data-action="pd3-gram-practice" data-id="${h(weak.id)}">Потренироваться</button></div></section>`:''}
${categoryBlock(rows,{...run,filter},sets)}
<h2 class="pd3-h2">${current?`Наборы по теме: ${h(current.title)}`:'Наборы'}</h2>
${list?`<div class="pd3-list">${list}</div>`:'<div class="info-panel">Наборы для этой темы появятся позже.</div>'}`;
}

/* ---------- intro ---------- */
export function grammarIntroView({set,run}){
  const minutes=set.minutes||GRAMMAR_MINUTES;
  return `<button type="button" class="text-button pd3-back" data-action="pd3-gram-list">${icon('arrow')}<span>К списку наборов</span></button>${pageHead(set.title,'Грамматика B2')}
<section class="panel pd3-intro"><p>${tasks(set.items.length)}: выбрать форму, вставить слова в текст, найти и исправить ошибку, переписать предложение, собрать фразу из слов. Каждый ответ проверяется сразу, затем идёт короткий разбор.</p>
<p>Время по формату: <b>${minutes} минут</b>. Это тренировка по мотивам формата PD3, не официальный экзамен.</p>
${checkbox('pd3-gram-timer-on','С таймером (обратный отсчёт)',run.timerOn,'data-pd3-gram="timer"')}
<p class="field-note">Когда время выходит, набор заканчивается: ответ, который ты уже ввёл, проверяется, остальные задания считаются невыполненными.</p>
<div class="button-row"><button type="button" class="btn primary" data-action="pd3-gram-start">Начать</button></div></section>`;
}

/* ---------- one task ---------- */
const slot=text=>h(text).replace('___','<span class="pd3-gram-slot" aria-hidden="true">___</span><span class="sr-only">пропуск</span>');
const mark=(ok,words=true)=>ok?`<b class="pd3-mark">${icon('check')}${words?' верно':''}</b>`:`<b class="pd3-mark">${words?'не то':'✗'}</b>`;

function gapBody(item,answer,checked){
  return `<fieldset class="pd3-q"><legend><span class="pd3-gram-stem" lang="da">${slot(item.stem)}</span></legend>${item.options.map((option,i)=>{
    const right=checked&&i===item.answer,wrong=checked&&i===answer&&i!==item.answer;
    return `<label class="pd3-option ${right?'is-right':''} ${wrong?'is-wrong':''}" for="pd3-gram-opt-${i}"><input type="radio" id="pd3-gram-opt-${i}" name="pd3-gram-opt" data-pd3-gram="opt" value="${i}" ${answer===i?'checked':''} ${checked?'disabled':''}><span lang="da" data-audio-ready>${h(option)}</span>${right?mark(true):wrong?mark(false):''}</label>`;
  }).join('')}</fieldset>`;
}
function clozeBody(item,answer,checked){
  const chosen=answer||{};
  const parts=item.segments.map(part=>{
    if(typeof part==='string')return `<span lang="da" data-audio-ready>${h(part)}</span>`;
    const key=String(part.gap),value=chosen[key],ok=checked&&value===part.answer;
    return `<span class="pd3-cloze-gap ${checked?(ok?'is-right':'is-wrong'):''}"><label class="sr-only" for="pd3-gram-gap-${key}">Пропуск ${key}</label><select id="pd3-gram-gap-${key}" data-pd3-gram="gap" data-gap="${key}" lang="da" ${checked?'disabled':''}><option value="">— ${key} —</option>${part.options.map((option,i)=>`<option value="${i}" ${value===i?'selected':''}>${h(option)}</option>`).join('')}</select>${checked?`${mark(ok,false)}<span class="sr-only">${ok?' (верно)':' (неверно)'}</span>`:''}</span>`;
  }).join('');
  return `<p class="pd3-cloze">${parts}</p>`;
}
function fixBody(item,answer,checked){
  const tokens=fixTokens(item),picked=answer?.i;
  const words=tokens.map((token,i)=>{
    const right=checked&&i===item.errorIndex,wrong=checked&&i===picked&&i!==item.errorIndex;
    return `<button type="button" class="pd3-word ${picked===i?'selected':''} ${right?'is-right':''} ${wrong?'is-wrong':''}" data-action="pd3-gram-word" data-pos="${i}" aria-pressed="${picked===i}" lang="da" ${checked?'disabled':''}>${h(token)}${right?'<span class="sr-only"> (здесь ошибка)</span>':''}</button>`;
  }).join(' ');
  const field=picked===undefined?'':`<label for="pd3-gram-input" class="answer-label">Как правильно вместо «<span lang="da" data-audio-ready>${h(tokens[picked])}</span>»?</label><input type="text" id="pd3-gram-input" data-pd3-gram="text" ${FIELD} maxlength="60" value="${h(answer?.t||'')}" ${checked?'disabled':''}>${checked?'':lettersBar('Датские буквы')}`;
  return `<div class="pd3-fix-words" role="group" aria-label="Предложение: выбери неверное слово">${words}</div>${field}`;
}
function transformBody(item,answer,checked){
  return `<p class="pd3-gram-source" lang="da">${h(item.prompt)}</p><p class="pd3-gram-instr"><b>Задание:</b> ${h(item.instruction)}</p><label for="pd3-gram-input" class="answer-label">Твоё предложение</label><textarea id="pd3-gram-input" data-pd3-gram="text" ${FIELD} rows="3" maxlength="300" ${checked?'disabled':''}>${h(answer||'')}</textarea>${checked?'':lettersBar('Датские буквы')}`;
}
function orderBody(item,answer,checked){
  const picked=answer||[];
  const zone=picked.length?picked.map((index,place)=>`<button type="button" class="pd3-tile" data-action="pd3-gram-untile" data-pos="${place}" lang="da" aria-label="Убрать слово ${h(item.tokens[index])}" ${checked?'disabled':''}>${h(item.tokens[index])}</button>`).join(''):'<span>Нажимай на слова ниже, чтобы собрать предложение</span>';
  const bank=item.tokens.map((token,i)=>`<button type="button" class="pd3-tile ${picked.includes(i)?'used':''}" data-action="pd3-gram-tile" data-pos="${i}" lang="da" ${checked||picked.includes(i)?'disabled':''}>${h(token)}</button>`).join('');
  return `<div class="answer-zone pd3-zone" role="group" aria-label="Собранное предложение">${zone}</div><div class="token-bank pd3-bank" role="group" aria-label="Слова для предложения">${bank}</div>${checked||!picked.length?'':'<div class="button-row"><button type="button" class="text-button" data-action="pd3-gram-reset">Начать сначала</button></div>'}`;
}
const BODY={gap:gapBody,cloze:clozeBody,fix:fixBody,transform:transformBody,order:orderBody};

const STATUS_TITLE={ok:'Верно.',wrong:'Неверно.',skipped:'Пропущено.',self:'Самопроверка отмечена.',missed:'Не выполнено.'};
/** The review of a checked task. */
function reviewBlock({item,answer,status,cats}){
  const right=correctAnswer(item),category=categoryOf(cats,item.cat);
  const detail=checkItem(item,answer);
  const lines=[];
  if(status==='wrong'||status==='self'){
    const mine=answerText(item,answer);
    if(mine)lines.push(`<p><b>Твой ответ:</b> <span lang="da">${h(mine)}</span></p>`);
  }
  if(item.type==='fix'&&status!=='ok')lines.push(`<p><b>Неверное слово:</b> <span lang="da">${h(right.wrong)}</span></p>`);
  if(item.type==='cloze'&&status!=='ok'&&detail.gaps){
    const bad=detail.gaps.filter(g=>!g.ok);
    if(bad.length)lines.push(`<ul class="pd3-gram-gaps">${bad.map(g=>{
      const gap=clozeGaps(item).find(x=>x.gap===g.gap);
      return `<li>Пропуск ${g.gap}: нужно «<span lang="da">${h(gap.options[g.right])}</span>»${g.chosen===undefined?'':`, ты выбрал «<span lang="da">${h(gap.options[g.chosen])}</span>»`}</li>`;
    }).join('')}</ul>`);
  }
  lines.push(`<p><b>${status==='ok'?'Ответ:':'Верный ответ:'}</b> <span lang="da">${h(right.main)}</span></p>`);
  if(right.others.length)lines.push(`<p><b>Другие верные варианты:</b></p><ul class="pd3-gram-variants">${right.others.map(x=>`<li lang="da">${h(x)}</li>`).join('')}</ul>`);
  return `<section class="pd3-gram-review ${status==='ok'?'is-right':status==='self'?'is-self':'is-wrong'}" id="pd3-gram-review" tabindex="-1" aria-labelledby="pd3-gram-review-title"><h3 id="pd3-gram-review-title">${STATUS_TITLE[status]}</h3>${category?`<p class="pill">${h(category.title)}</p>`:''}${lines.join('')}<p class="pd3-why"><b>Почему:</b> ${h(item.why)}</p>${status==='self'?`<p class="field-note">${icon('info')} Самопроверка не даёт балла и XP: в результате это задание помечено отдельно.</p>`:''}${status==='wrong'&&item.type==='transform'&&answerText(item,answer)?`<div class="pd3-gram-selfcheck"><p class="field-note">Другая формулировка тоже может быть верной. Сравни смысл, грамматику и форму с образцом.</p><button type="button" class="btn secondary" data-action="pd3-gram-self">Мой вариант тоже верный</button></div>`:''}</section>`;
}

/** `left` = seconds on the timer (null without it), `status` = the status of the task if it was checked (ok/wrong/skipped/self). */
export function grammarItemView({set,run,data,left,status=null}){
  const item=set.items[run.index],total=set.items.length,answer=run.answers[item.id],checked=!!status;
  const last=run.index===total-1;
  const bar=`<div class="panel pd3-timer pd3-gram-bar">${left===null?'<span class="pd3-label">Без таймера</span>':`<span class="pd3-label">Осталось времени</span><b id="pd3-gram-timer" role="timer" aria-live="off">${clock(left)}</b>`}<span class="pd3-gram-count">Задание ${run.index+1} из ${total}</span><div class="meter" role="progressbar" aria-label="Ход набора" aria-valuemin="0" aria-valuemax="${total}" aria-valuenow="${run.index+(checked?1:0)}"><span style="width:${(run.index+(checked?1:0))/total*100}%"></span></div></div><p id="pd3-gram-live" class="sr-only" role="status" aria-live="polite"></p>`;
  const confirm=run.confirm==='exit'?`<div class="panel pd3-mock-confirm" role="alertdialog" aria-labelledby="pd3-gram-exit-title"><h2 id="pd3-gram-exit-title">Выйти из набора?</h2><p>Ответы этого набора не сохранятся, результат не будет записан.</p><div class="button-row"><button type="button" class="btn primary" data-action="pd3-gram-exit-yes" data-autofocus>Выйти</button><button type="button" class="btn secondary" data-action="pd3-gram-exit-no">Остаться</button></div></div>`:'';
  const actions=checked
    ?`<div class="button-row"><button type="button" class="btn primary" data-action="${last?'pd3-gram-finish':'pd3-gram-next'}">${last?'Завершить набор':'Дальше'} ${icon('arrow')}</button></div>`
    :`<div class="button-row"><button type="button" class="btn primary" data-action="pd3-gram-check">Проверить</button><button type="button" class="btn secondary" data-action="pd3-gram-skip">Пропустить</button></div>`;
  return `<button type="button" class="text-button pd3-back" data-action="pd3-gram-exit">${icon('arrow')}<span>К списку наборов</span></button>${pageHead(set.title,'Грамматика B2')}${confirm}${bar}
<section class="panel pd3-gram-task" aria-labelledby="pd3-gram-task"><h2 id="pd3-gram-task" tabindex="-1">Задание ${run.index+1} из ${total}</h2><p class="pd3-gram-help">${TYPE_HELP[item.type]||''}</p>${BODY[item.type](item,answer,checked)}${checked?reviewBlock({item,answer,status,cats:grammarCategories(data)}):''}${actions}</section>`;
}

/* ---------- result ---------- */
const previews={
  gap:item=>item.stem,
  cloze:item=>item.segments.map(part=>typeof part==='string'?part:`(${part.gap})`).join(''),
  fix:item=>item.sentence,
  transform:item=>`${item.prompt} — ${item.instruction}`,
  order:item=>item.tokens.join(' · ')
};
const STATUS_WORD={wrong:'неверно',skipped:'пропущено',missed:'не выполнено',self:'самопроверка'};

export function grammarResultView({set,run,result,data,links=null}){
  const cats=grammarCategories(data),xp=run.xp||0;
  const rows=Object.entries(result.cats).map(([id,counts])=>({id,...counts,title:categoryOf(cats,id)?.title||id}));
  const mistakes=result.items.map((entry,index)=>({...entry,index})).filter(entry=>entry.status!=='ok');
  const recs=recommendations(result,cats);
  const xpNote=xp>0?` · +${xp} XP`:'';
  const noXp=!countsForXp(result)?`<p class="field-note">XP не начисляется: для него нужно выполнить хотя бы ${GRAMMAR_MIN_ANSWERED} заданий.</p>`:'';
  return `<button type="button" class="text-button pd3-back" data-action="pd3-gram-list">${icon('arrow')}<span>К списку наборов</span></button>${pageHead(set.title,'Результат')}
<div class="panel pd3-result" role="status" id="pd3-gram-result"><b class="pd3-score">${result.percent}%</b><span>Верно ${result.correct} из ${result.total}${xpNote}</span>${run.timeUp?'<span>Время вышло: набор закончен автоматически.</span>':''}<div class="meter" aria-hidden="true"><span style="width:${result.percent}%"></span></div></div>${noXp}
${rows.length?`<section class="panel pd3-gram-bycat" aria-labelledby="pd3-gram-bycat-title"><h2 id="pd3-gram-bycat-title">Разбор по темам</h2><ul class="pd3-gram-catres">${rows.map(row=>`<li><span><b>${h(row.title)}</b> · ${row.ok} из ${row.all}</span><span class="meter" aria-hidden="true"><span style="width:${percent(row.ok,row.all)}%"></span></span></li>`).join('')}</ul></section>`:''}
${recs.length?`<section class="panel pd3-gram-recs" aria-labelledby="pd3-gram-recs-title"><h2 id="pd3-gram-recs-title">Что повторить</h2><ol class="pd3-mock-recs-list">${recs.map(rec=>{
    const found=links?linksFor(rec.id,links):[];
    return `<li><span><b>${h(rec.title)}</b> · верно ${rec.ok} из ${rec.all}${rec.tip?`<small class="pd3-gram-rectip">${h(rec.tip)}</small>`:''}</span><span class="pd3-gram-reclinks"><button type="button" class="btn secondary" data-action="pd3-gram-practice" data-id="${h(rec.id)}">Потренировать</button>${found.map(link=>link.kind==='lesson'?`<button type="button" class="btn secondary" data-action="lesson-intro" data-id="${h(link.id)}">Урок: ${h(link.title)}</button>`:`<button type="button" class="btn secondary" data-action="${h(link.action)}">Справочник: времена</button>`).join('')}</span></li>`;
  }).join('')}</ol></section>`:''}
${mistakes.length?`<section class="panel pd3-gram-mistakes" aria-labelledby="pd3-gram-mistakes-title"><h2 id="pd3-gram-mistakes-title">Разбор заданий</h2><ol class="pd3-mock-wrong">${mistakes.map(({item,status,answer,index})=>{
    const right=correctAnswer(item),mine=status==='wrong'||status==='self'?answerText(item,answer):'';
    return `<li value="${index+1}"><span class="pill">${STATUS_WORD[status]}</span> <span class="pd3-gram-cat-name">${h(categoryOf(cats,item.cat)?.title||item.cat)}</span><p lang="da">${h(previews[item.type](item))}</p>${mine?`<p><b>Твой ответ:</b> <span lang="da">${h(mine)}</span></p>`:''}<p><b>Верный ответ:</b> <span lang="da">${h(right.main)}</span></p><p class="pd3-why"><b>Почему:</b> ${h(item.why)}</p></li>`;
  }).join('')}</ol></section>`:'<p class="notice" role="note">Ошибок нет: все задания выполнены верно.</p>'}
<div class="button-row"><button type="button" class="btn primary" data-action="pd3-gram-again">Пройти этот набор ещё раз</button><button type="button" class="btn secondary" data-action="pd3-gram-list">К списку наборов</button></div>`;
}
