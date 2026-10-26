// PD3 parts that show the learner's progress: exam plan, frequent dictation mistakes (hub), the PD3 section of the "Прогресс" page
// and the short line on the home page. Every function returns an HTML string; the numbers come from pd3-progress.mjs.
import {h,icon,plural} from './ui.mjs';
import {dayKey} from './engine.mjs';
import {skillRows,recommendSkill,daysUntil,activityRows,weakSpots,STALE_DAYS} from './pd3-progress.mjs';

const days=n=>`${n} ${plural(n,['день','дня','дней'])}`;
/** 24.10.2026 from a time stamp, by the Copenhagen calendar. */
export function dateText(at){
  const [year,month,day]=dayKey(new Date(at)).split('-');
  return `${day}.${month}.${year}`;
}
const ago=n=>n===0?'сегодня':n===1?'вчера':`${days(n)} назад`;
const OPEN_VIEW={reading:'reading',writing:'writing',listening:'listening',oral:'oral'};

function skillLine(skill){
  if(!skill.available)return 'Материалы появятся позже.';
  const parts=[];
  if(skill.last!==null)parts.push(`последний результат: ${skill.last}%`,`лучший: ${skill.best}%`);
  else if(skill.self!==null)parts.push(`самооценка: ${skill.self}%`);
  else parts.push('результатов пока нет');
  parts.push(skill.daysAgo===null?'занятий пока не было':`последнее занятие: ${ago(skill.daysAgo)}`);
  return parts.join(' · ');
}
function reasonText(reason,skill){
  if(reason==='new')return 'Этим навыком ещё не занимались.';
  if(reason==='stale')return `К нему не возвращались ${days(skill.daysAgo)}.`;
  return 'Здесь результат ниже, чем по другим навыкам.';
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
${advice?`<div class="pd3-advice"><p><b>Что делать дальше:</b> ${h(advice.skill.title)}. ${reasonText(advice.reason,advice.skill)}</p><button type="button" class="btn primary" data-action="pd3-advice" data-value="${OPEN_VIEW[advice.skill.id]}">Открыть раздел ${icon('arrow')}</button></div>`:''}
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
  }).join('')}</div>`;
}

/** The short line for the home page status row; '' until something in PD3 has been completed. */
export function pd3HomeLine(totals){
  if(!totals||!totals.done)return '';
  return `<button class="text-button" data-page="pd3" aria-label="PD3, подготовка к экзамену: пройдено ${totals.done} из ${totals.total}">PD3: ${totals.done} / ${totals.total}</button>`;
}
