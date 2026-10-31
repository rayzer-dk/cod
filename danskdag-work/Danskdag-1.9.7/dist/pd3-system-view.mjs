// PD3 parts that show the learner's progress: exam plan, frequent dictation mistakes (hub), the PD3 section of the "Прогресс" page
// and the short line on the home page. Every function returns an HTML string; the numbers come from pd3-progress.mjs.
import {h,icon,plural} from './ui.mjs';
import {dayKey} from './engine.mjs';
import {mockHistory,mockAdvice,canMock,MODE_NAMES,MOCK_STALE_DAYS} from './pd3-mock.mjs';
import {skillRows,recommendSkill,daysUntil,activityRows,weakSpots,STALE_DAYS} from './pd3-progress.mjs';

const days=n=>`${n} ${plural(n,['день','дня','дней'])}`;
/** 24.10.2026 from a time stamp, by the Copenhagen calendar. */
export function dateText(at){
  const [year,month,day]=dayKey(new Date(at)).split('-');
  return `${day}.${month}.${year}`;
}
const ago=n=>n===0?'сегодня':n===1?'вчера':`${days(n)} назад`;
const OPEN_VIEW={reading:'reading',writing:'writing',listening:'listening',oral:'oral',grammar:'grammar'};

function skillLine(skill){
  if(!skill.available)return 'Материалы появятся позже.';
  const parts=[];
  if(skill.last!==null)parts.push(`последний результат: ${skill.last}%`,`лучший: ${skill.best}%`);
  else if(skill.self!==null)parts.push(`самооценка: ${skill.self}%`);
  else parts.push('результатов пока нет');
  parts.push(skill.daysAgo===null?'занятий пока не было':`последнее занятие: ${ago(skill.daysAgo)}`);
  if(skill.weak)parts.push(`слабая тема: ${skill.weak.title}`);
  return parts.join(' · ');
}
function reasonText(reason,skill){
  if(reason==='new')return 'Этим навыком ещё не занимались.';
  if(reason==='stale')return `К нему не возвращались ${days(skill.daysAgo)}.`;
  return 'Здесь результат ниже, чем по другим навыкам.';
}

/** The button of the suggestion; for grammar with a weak category it starts practice of that category. */
function adviceButton(skill){
  if(skill.id==='grammar')return `<button type="button" class="btn primary" ${skill.weak?`data-action="pd3-gram-practice" data-id="${h(skill.weak.id)}"`:'data-action="pd3-gram-open" data-value="grammar"'}>${skill.weak?'Потренировать слабую тему':'Открыть раздел'} ${icon('arrow')}</button>`;
  return `<button type="button" class="btn primary" data-action="pd3-advice" data-value="${OPEN_VIEW[skill.id]}">Открыть раздел ${icon('arrow')}</button>`;
}

/** The exam plan: optional date with a countdown, the four skills and one suggestion with its rule. */
export function planView({d,data,now}){
  const date=d.plan?.examDate||'',left=daysUntil(date,now);
  const skills=skillRows(d,data,now),advice=recommendSkill(skills);
  const countdown=left===null?'Укажи дату экзамена, и здесь появится обратный отсчёт.':left<0?'Дата экзамена уже прошла. Выбери новую или очисти поле.':left===0?'Экзамен сегодня.':`До экзамена: ${days(left)}.`;
  return `<section class="panel pd3-plan" aria-labelledby="pd3-plan-title"><h2 id="pd3-plan-title">План подготовки</h2>
<div class="pd3-plan-date"><label for="pd3-exam-date">Дата экзамена (необязательно)</label><div class="pd3-plan-field"><input type="date" id="pd3-exam-date" value="${h(date)}" min="2020-01-01" max="2100-12-31">${date?`<button type="button" class="btn secondary" data-action="pd3-plan-clear">Очистить дату</button>`:''}</div></div>
<p class="pd3-countdown" role="status" aria-live="polite">${countdown}</p>
<ul class="pd3-skills">${skills.map(skill=>`<li><b>${h(skill.title)}</b><span>${skillLine(skill)}</span></li>`).join('')}</ul>
${advice?`<div class="pd3-advice"><p><b>Что делать дальше:</b> ${h(advice.skill.title)}. ${reasonText(advice.reason,advice.skill)}${advice.skill.weak?` Слабая тема: ${h(advice.skill.weak.title)}.`:''}</p>${adviceButton(advice.skill)}</div>`:''}
${mockAdviceView({d,data,now})}
<p class="field-note">Как выбирается подсказка: сначала навык, которым ещё не занимались, затем тот, к которому не возвращались ${days(STALE_DAYS)} и больше, иначе навык с самым низким результатом. Это ориентир для тренировки, а не прогноз результата на экзамене.</p></section>`;
}

/** Most frequent dictation mistakes with a link to a dictation about that kind of mistake where the content has one. */
export function weakView({d,data,label}){
  const spots=weakSpots(d,data),runs=d.stats?.dictation?.runs||0;
  if(!spots.length)return '';
  return `<section class="panel pd3-weak" aria-labelledby="pd3-weak-title"><h2 id="pd3-weak-title">Частые ошибки в диктантах</h2>
<p class="field-note">Считается по проверенным диктантам: ${runs}. Число показывает, сколько раз такая ошибка встретилась.</p>
<ol class="pd3-weak-list">${spots.map(spot=>`<li><span><b>${h(label(spot.kind))}</b> · ${spot.count}</span>${spot.practice?`<button type="button" class="btn secondary" data-action="pd3-weak-practice" data-id="${h(spot.practice)}" aria-label="Потренировать: ${h(label(spot.kind))}">Потренировать</button>`:''}</li>`).join('')}</ol></section>`;
}

/** Dictation sentences in the repetition: how many, and a link to practise those that are due. `spell` is {count,due} from spellSummary; '' while there are none. */
export function spellView({spell}){
  if(!spell?.count)return '';
  return `<section class="panel pd3-spell" aria-labelledby="pd3-spell-title"><h2 id="pd3-spell-title">Диктанты в повторении</h2>
<p class="pd3-spell-line"><b>На повторении из диктантов: ${spell.count}</b>${spell.due?` · пора повторить: ${spell.due}`:''}</p>
<p class="field-note">Предложения, в которых были ошибки, возвращаются как карточки «Диктант-карточка»: их озвучивают, а ты записываешь услышанное. Срок следующего раза выбирает то же расписание, что и для слов.</p>
${spell.due?`<button type="button" class="btn primary" data-action="practice-spell">Повторить сейчас ${icon('arrow')}</button>`:''}</section>`;
}

/** The suggestion to take a mock exam (none yet, or the last one is MOCK_STALE_DAYS days old or older); '' otherwise. */
function mockAdviceView({d,data,now}){
  const advice=mockAdvice(d,data,now);
  if(!advice.due)return '';
  const why=advice.reason==='never'?'ещё ни одного не было, а он показывает общую картину по всем навыкам сразу.':`последний был ${days(advice.days)} назад: пора пройти ещё один.`;
  return `<div class="pd3-advice pd3-advice-mock"><p><b>Пробный экзамен:</b> ${why} Он предлагается, если его не было или прошло ${days(MOCK_STALE_DAYS)} и больше.</p><button type="button" class="btn secondary" data-action="pd3-mock-open" data-value="mock">Пройти пробный экзамен ${icon('arrow')}</button></div>`;
}

const percentText=value=>value===null||value===undefined?'—':`${value}%`;
function mockLine(record){
  return `<li><span class="pd3-mock-head"><b>${dateText(record.at)}</b> · ${MODE_NAMES[record.mode]||h(record.mode)} · набор ${h(record.set.replace(/^set-/,''))}</span><span class="pd3-mock-nums">Del 1: ${percentText(record.find)} · Del 2: ${percentText(record.text)} · письмо (самооценка): ${percentText(record.writing)} · устная часть (самооценка): ${percentText(record.oral)}</span></li>`;
}
/** The last five mock exams in the hub (date, mode, percents by skill); '' while there are none. */
export function mockHistoryView({d}){
  const history=mockHistory(d,5);
  if(!history.length)return '';
  return `<section class="panel pd3-mock-history" aria-labelledby="pd3-mock-history-title"><h2 id="pd3-mock-history-title">Пробные экзамены</h2>
<ol class="pd3-mock-history-list">${history.map(mockLine).join('')}</ol>
<p class="field-note">Чтение проверила программа, письмо и устная часть — самооценка: она обычно выше настоящей оценки. Показаны последние пять.</p>
<div class="button-row"><button type="button" class="btn secondary" data-action="pd3-mock-open" data-value="mock">Новый пробный экзамен ${icon('arrow')}</button></div></section>`;
}
/** The mock exam block of the progress page; '' while there are none. */
export function mockProgressSection(pd3){
  const history=mockHistory(pd3,5),count=Object.keys(pd3?.mocks||{}).length;
  if(!history.length)return '';
  return `<div class="section-title space-top"><h2>Пробные экзамены</h2><span>${count}</span></div><button type="button" class="panel pd3-progress-row pd3-mock-row" data-action="open-pd3" data-value="mock"><ol class="pd3-mock-history-list">${history.map(mockLine).join('')}</ol>${icon('arrow')}</button>`;
}

/** The PD3 section of the progress page, or '' while PD3 has not been used. */
export function pd3ProgressSection(pd3,data){
  if(!pd3)return '';
  const rows=activityRows(pd3,data).filter(row=>row.total>0);
  if(!rows.length)return '';
  const done=rows.reduce((sum,row)=>sum+row.done,0),total=rows.reduce((sum,row)=>sum+row.total,0);
  return `<div class="section-title space-top"><h2>PD3</h2><span>${done} / ${total}</span></div><div class="pd3-progress">${rows.map(row=>{
    const result=row.best!==null?`лучший результат: ${row.best}%`:row.self!=null?`самооценка: ${row.self}%`:'результатов пока нет';
    const last=row.lastAt?`последняя активность: ${dateText(row.lastAt)}`:'пока без активности';
    return `<button type="button" class="panel pd3-progress-row" data-action="open-pd3" data-value="${row.id}"><span class="pd3-progress-name"><b>${h(row.title)}</b><small>${result} · ${last}</small></span><span class="meter" aria-hidden="true"><span style="width:${row.done/row.total*100}%"></span></span><small class="pd3-progress-count">${row.done} / ${row.total}</small>${icon('arrow')}</button>`;
  }).join('')}</div>${mockProgressSection(pd3)}`;
}

/** The line under the PD3 section of the progress page: dictation sentences in the repetition ({count,due} from spellSummary). */
export function spellProgressLine(spell){
  if(!spell?.count)return '';
  return `<p class="field-note pd3-spell-line">На повторении из диктантов: ${spell.count}${spell.due?` · пора повторить: ${spell.due}`:''}</p>`;
}

/** The short line for the home page status row; '' until something in PD3 has been completed. */
export function pd3HomeLine(totals){
  if(!totals||!totals.done)return '';
  return `<button class="text-button" data-page="pd3" aria-label="PD3, подготовка к экзамену: пройдено ${totals.done} из ${totals.total}">PD3: ${totals.done} / ${totals.total}</button>`;
}
