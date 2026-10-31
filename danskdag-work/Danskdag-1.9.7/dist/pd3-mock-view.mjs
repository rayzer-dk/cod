// Views of the mock exam: setup, stages (with the reading, writing and oral screens of the practice pages), pause, break and the report.
// Every function returns an HTML string. The numbers come from pd3-mock.mjs; the clock texts are updated by the controller (pd3-mock-page.mjs).
import {h,icon,plural} from './ui.mjs';
import {pageHead,toggleButtons,selfAssessment,clock,backButton} from './pd3-ui.mjs';
import {examFindView,examTextView,oralView,writingOptionPicker,writingPromptHtml,writingChecklistHtml,writingBoxHtml,wordMeter,ORAL_NOTE} from './pd3-practice-views.mjs';
import {errorLabel} from './pd3-views.mjs';
import {writingSpec,countWords} from './pd3-writing-check.mjs';
import {dateText} from './pd3-system-view.mjs';
import {
  STAGE_TITLES,MODE_NAMES,MOCK_AGE,MOCK_TEXT_MAX,buildSchedule,stageNumber,stageOf,examStages,plannedMinutes,setUsage,
  secondsLeft,blockSecondsLeft,isPaused,isFinished
} from './pd3-mock.mjs';

export const MOCK_NOTE='Это тренировка по мотивам формата Prøve i Dansk 3, а не официальный экзамен и не прогноз результата. Чтение проверяет программа, а письмо и устную часть оцениваешь ты сам: самооценка обычно выше настоящей оценки.';
export const modeName=mode=>MODE_NAMES[mode]||mode;
const minutesText=n=>`${n} ${plural(n,['минута','минуты','минут'])}`;
const hoursText=ms=>{const n=Math.round(ms/3600000);return `${n} ${plural(n,['час','часа','часов'])}`;};
const list=(data,name)=>Array.isArray(data?.[name])?data[name]:[];
const danish=text=>`<span lang="da" data-audio-ready>${h(text)}</span>`;

/* ---------- setup ---------- */
const MODE_TEXT={
  full:'Del 1 и Del 2 чтения, ответ на письмо и задание A или B, затем устная часть: монолог, интервью, взаимодействие и дискуссия.',
  short:'Del 1, из Del 2 только тексты 1 и 3, ответ на письмо, затем устная часть: монолог и интервью. Около полутора часов вместо трёх.'
};
function planList(mode){
  return `<ol class="pd3-mock-plan">${buildSchedule(mode).map(stage=>stage.kind==='break'
    ?`<li class="is-break">${STAGE_TITLES.break}: без таймера, можно отдохнуть</li>`
    :`<li>${STAGE_TITLES[stage.kind]}${stage.tasks&&stage.tasks.length<3?' (только тексты 1 и 3)':''} <b>${minutesText(stage.minutes)}</b></li>`).join('')}</ol>`;
}
function setParts(set,data,mode){
  const find=list(data,'readingExamFind').find(x=>x.id===set.find),text=list(data,'readingExamText').find(x=>x.id===set.text);
  const email=list(data,'writingEmail').find(x=>x.id===set.email),task=list(data,'writingTask').find(x=>x.id===set.task);
  const mono=list(data,'oralMonologue').find(x=>x.id===set.mono),intv=list(data,'oralInterview').find(x=>x.id===set.intv);
  const inter=list(data,'oralInteraction').find(x=>x.id===set.inter),disc=list(data,'oralDiscussion').find(x=>x.id===set.disc);
  const rows=[['Del 1',find?.title],['Del 2',text?.text1.title],['Письмо',email?.title]];
  if(mode==='full')rows.push(['Задание A/B',task?.title]);
  rows.push(['Монолог',mono?.title],['Интервью',intv?.title]);
  if(mode==='full')rows.push(['Взаимодействие',inter?.title],['Дискуссия',disc?.statement]);
  return rows.filter(([,title])=>title);
}
export function mockSetupView({data,d,setup,sets}){
  const minutes=plannedMinutes(setup.mode),set=sets.find(s=>s.id===setup.setId)||sets[0];
  const options=sets.map(s=>`<option value="${h(s.id)}" ${s.id===set.id?'selected':''}>Набор ${s.n}${setUsage(s,d)?' · уже есть пройденное':' · ещё не проходили'}</option>`).join('');
  return `${backButton()}${pageHead('Пробный экзамен','Полный прогон по мотивам формата Prøve i Dansk 3: этапы идут один за другим, в конце — отчёт по навыкам.')}
<div class="notice pd3-disclaimer">${icon('info')}<span>${MOCK_NOTE}</span></div>
<section class="panel pd3-mock-setup" aria-labelledby="pd3-mock-mode-title"><h2 id="pd3-mock-mode-title">Режим</h2>
${toggleButtons('Режим экзамена','pd3-mock-mode',[['full',MODE_NAMES.full],['short',MODE_NAMES.short]],setup.mode)}
<p>${MODE_TEXT[setup.mode]}</p>${planList(setup.mode)}
<p class="field-note">Письменная часть: ${minutesText(minutes.written)}${setup.mode==='full'?', устная часть около 15 минут':`, устная часть около ${minutes.oral} минут`}. Таймер считает по формату, но это приблизительные рамки.</p></section>
<section class="panel" aria-labelledby="pd3-mock-timer-title"><h2 id="pd3-mock-timer-title">Таймер</h2>
${toggleButtons('Таймер экзамена','pd3-mock-timer',[['format','По формату'],['none','Без таймера']],setup.timerMode)}
<p class="field-note">${setup.timerMode==='format'?'У каждого этапа свой срок. Когда время выходит, этап завершается сам, а всё введённое сохраняется.':'Время не ограничено: удобно, чтобы просто познакомиться с форматом. Этапы всё равно идут по порядку.'}</p></section>
<section class="panel" aria-labelledby="pd3-mock-set-title"><h2 id="pd3-mock-set-title">Набор заданий</h2>
<label for="pd3-mock-set">Набор</label><select id="pd3-mock-set" data-pd3-mock="set">${options}</select>
<p class="field-note">Сначала предложен набор, которым ты занимался меньше всего.</p>
<ul class="pd3-mock-parts">${setParts(set,data,setup.mode).map(([label,title])=>`<li><b>${label}:</b> ${danish(title)}</li>`).join('')}</ul></section>
<section class="panel pd3-mock-start"><p>После начала вернуться к завершённому этапу нельзя. Если закрыть вкладку, экзамен останется на этом устройстве до ${hoursText(MOCK_AGE[setup.mode])}, а часы продолжат идти. Запись голоса не сохраняется.</p>
<div class="button-row"><button type="button" class="btn primary" data-action="pd3-mock-start">Начать экзамен ${icon('arrow')}</button></div></section>`;
}

/* ---------- the clock and the frame of a stage ---------- */
const STAGE_HINT={
  find:'Для каждого вопроса выбери раздел, где есть ответ.',
  text:'Вопросы к тексту, вставка абзацев и пропуски в тексте.',
  email:'Ответь на письмо: затронь все пункты задания.',
  task:'Выбери тему A или B и напиши сочинение.',
  mono:'Расскажи по плану около двух минут.',
  intv:'Ответь на вопросы интервьюера.',
  inter:'Реши ситуацию в диалоге с партнёром.',
  disc:'Выскажи мнение об утверждении и приведи аргументы.'
};
const STEP_LABELS={find:'Del 1',text:'Del 2',email:'Письмо',task:'Задание A/B',mono:'Монолог',intv:'Интервью',inter:'Взаимодействие',disc:'Дискуссия'};
function steps(mock){
  const schedule=buildSchedule(mock.mode),stages=examStages(schedule),current=stageOf(mock);
  return `<ol class="pd3-mock-steps" aria-label="Этапы экзамена">${stages.map(stage=>{
    const index=schedule.indexOf(stage),done=index<mock.index&&mock.results[stage.id]!==undefined,now=current?.id===stage.id;
    return `<li class="${done?'is-done':now?'is-now':''}" ${now?'aria-current="step"':''}><span>${STEP_LABELS[stage.kind]}</span><span class="sr-only">${done?' (завершён)':now?' (сейчас)':' (впереди)'}</span></li>`;
  }).join('')}</ol>`;
}
function clockPanel(mock,stage,now){
  const timed=mock.timerMode==='format';
  const times=timed
    ?`<div><span class="pd3-label">Осталось на этап</span><b id="pd3-mock-timer" role="timer" aria-live="off">${clock(secondsLeft(mock,now)??0)}</b></div><div><span class="pd3-label">${stage.block==='oral'?'Устная часть, осталось':'Письменная часть, осталось'}</span><b id="pd3-mock-block" aria-live="off">${clock(blockSecondsLeft(mock,now)??0)}</b></div>`
    :`<div><span class="pd3-label">Таймер</span><b>выключен</b></div>`;
  return `<div class="panel pd3-mock-bar"><div class="pd3-mock-times">${times}</div><div class="button-row"><button type="button" class="btn primary" data-action="pd3-mock-ask" data-value="finish">Завершить этап</button>${timed?`<button type="button" class="btn secondary" data-action="pd3-mock-ask" data-value="pause">Пауза</button>`:''}<button type="button" class="btn secondary" data-action="pd3-mock-ask" data-value="exit">Выйти</button></div></div>`;
}
const CONFIRM={
  finish:['Завершить этап?','Ответы этапа будут зафиксированы, вернуться к нему нельзя. Вопросы без ответа засчитываются как неверные.','Да, завершить этап','Вернуться к заданию'],
  pause:['Поставить на паузу?','Таймер остановится, задание скроется до продолжения. На настоящем экзамене паузы нет.','Поставить на паузу','Отмена'],
  exit:['Выйти из пробного экзамена?','Экзамен будет прекращён: результат не сохранится и XP не начислятся. Чтобы продолжить позже, просто закрой вкладку: экзамен останется на этом устройстве, но часы будут идти.','Выйти без сохранения','Остаться']
};
function confirmPanel(kind){
  const [title,text,yes,no]=CONFIRM[kind];
  return `<section class="panel pd3-mock-confirm" role="alertdialog" aria-labelledby="pd3-mock-ctitle" aria-describedby="pd3-mock-ctext"><h2 id="pd3-mock-ctitle">${title}</h2><p id="pd3-mock-ctext">${text}</p><div class="button-row"><button type="button" class="btn primary" data-action="pd3-mock-yes" data-value="${kind}">${yes}</button><button type="button" class="btn secondary" data-action="pd3-mock-no" data-autofocus>${no}</button></div></section>`;
}

/* ---------- the stage bodies ---------- */
function writingBody(stage,item,run){
  const kind=stage.kind,spec=writingSpec(kind,item,run.option),text=run.text;
  const meter=wordMeter(countWords(text),item.minWords,item.maxWords);
  const stored={req:run.req,check:run.check};
  return `${writingOptionPicker(kind,item,spec)}<div class="pd3-write-grid">${writingPromptHtml(kind,spec,stored)}<div class="pd3-editor">${writingBoxHtml({text,meter,note:'Черновик сохраняется на этом устройстве: если страница перезагрузится, текст вернётся.',maxlength:MOCK_TEXT_MAX})}${writingChecklistHtml(item,stored)}</div></div>`;
}
function stageBody({data,d,run,stage,mock}){
  const set=mock.set;
  switch(stage.kind){
    case 'find':return examFindView({item:list(data,'readingExamFind').find(x=>x.id===set.find),run:{phase:'run',answers:run.answers,timerOn:false},embedded:true});
    case 'text':return examTextView({item:list(data,'readingExamText').find(x=>x.id===set.text),run:{phase:'run',answers:run.answers,task:run.task,timerOn:false},embedded:true,tasks:stage.tasks});
    case 'email':return writingBody(stage,list(data,'writingEmail').find(x=>x.id===set.email),run);
    case 'task':return writingBody(stage,list(data,'writingTask').find(x=>x.id===set.task),run);
    default:return `<div class="notice pd3-disclaimer">${icon('info')}<span>${ORAL_NOTE}</span></div>${oralView({data,d,run,embedded:true})}`;
  }
}

export function mockStageView({data,d,run,now}){
  const mock=run.mock,schedule=buildSchedule(mock.mode),stage=stageOf(mock),{n,total}=stageNumber(schedule,mock.index);
  if(isPaused(mock)){
    return `${pageHead(`Этап ${n} из ${total}: пауза`,'Таймер остановлен, задание скрыто.')}${steps(mock)}
<section class="panel pd3-mock-pause" role="status"><span class="pd3-label">На этап осталось</span><b class="pd3-score">${clock(mock.pausedLeft??0)}</b><p>Нажми «Продолжить», когда будешь готов: время пойдёт дальше с этого места.</p>
<div class="button-row"><button type="button" class="btn primary" data-action="pd3-mock-resume">Продолжить</button><button type="button" class="btn secondary" data-action="pd3-mock-ask" data-value="exit">Выйти</button></div></section>${run.confirm==='exit'?confirmPanel('exit'):''}`;
  }
  return `${pageHead(`Этап ${n} из ${total}: ${STAGE_TITLES[stage.kind]}`,STAGE_HINT[stage.kind])}${steps(mock)}${clockPanel(mock,stage,now)}${run.confirm?confirmPanel(run.confirm):''}
<div class="pd3-mock-body" data-mock-stage="${stage.kind}">${stageBody({data,d,run,stage,mock})}</div>
<div class="button-row pd3-mock-foot"><button type="button" class="btn primary" data-action="pd3-mock-ask" data-value="finish">Завершить этап</button></div>`;
}

export function mockBreakView({mock,run=null}){
  const schedule=buildSchedule(mock.mode),oral=schedule.filter(stage=>stage.block==='oral'),minutes=plannedMinutes(mock.mode).oral;
  return `${pageHead('Перерыв перед устной частью','Письменная часть закончена.')}${steps(mock)}
<section class="panel pd3-mock-break"><p>Таймер сейчас не идёт: отдохни, выпей воды. Устная часть займёт около ${minutesText(minutes)}, этапов: ${oral.length}. Ты будешь говорить вслух, запись можно включать, но она нигде не сохраняется.</p>
<p class="field-note">Если закрыть вкладку, экзамен дождётся тебя на этом устройстве до ${hoursText(MOCK_AGE[mock.mode])} от последнего действия.</p>
<div class="button-row"><button type="button" class="btn primary" data-action="pd3-mock-continue">Начать устную часть ${icon('arrow')}</button><button type="button" class="btn secondary" data-action="pd3-mock-ask" data-value="exit">Выйти</button></div></section>${run?.confirm==='exit'?confirmPanel('exit'):''}`;
}

/* ---------- the report ---------- */
const SKILL_NAMES={find:'Чтение, Del 1',text:'Чтение, Del 2',writing:'Письмо',oral:'Устная часть'};
export const skillName=key=>SKILL_NAMES[key]||key;
const TYPE_NAMES={find:'Del 1: найти раздел',text1:'Del 2, текст 1: вопросы',text2:'Del 2, текст 2: абзацы',text3:'Del 2, текст 3: пропуски'};
const FLAG_TEXT={
  empty:()=>'текст пустой',
  short:text=>`мало слов: ${text.words} из ${text.min}`,
  long:text=>`много слов: ${text.words}, нужно не больше ${text.max}`,
  connectors:text=>`мало связок: ${text.connectors.length}`,
  repeats:text=>`много повторов: ${text.repeatShare}% слов`
};

function skillCard(key,skill,weak){
  const self=!!skill.self,pill=weak===key?'<span class="pill pd3-mock-weak">слабее всего</span>':'';
  const value=skill.percent===null?'—':`${skill.percent}%`;
  const note=self
    ?(skill.percent===null?`самооценка: отмечено ${skill.rated} из ${skill.of} критериев, оцени себя ниже`:'самооценка, не проверка программой')
    :`${skill.correct} из ${skill.total} · проверено программой`;
  return `<li class="panel pd3-mock-skill"><div><b>${skillName(key)}</b> ${pill}</div><span class="pd3-mock-pct">${value}</span><div class="meter" aria-hidden="true"><span style="width:${skill.percent??0}%"></span></div><small>${note}</small></li>`;
}

function writingChecks(text){
  const level=text.level==='ok'?'в пределах нормы':text.level==='low'?'мало':'много';
  const flags=text.flags.map(flag=>FLAG_TEXT[flag](text));
  const missingReqs=text.reqs.filter(r=>!r.ok),missingChecks=text.checks.filter(c=>!c.ok);
  return `<section class="pd3-mock-text"><h3>${danish(text.title)}${text.option?` · тема ${text.option}`:''}</h3>
<dl><dt>Слов</dt><dd>${text.words} (нужно ${text.min}–${text.max}) · ${level}</dd>
<dt>Связки</dt><dd>найдено разных: ${text.connectors.length}${text.connectors.length?` — <span lang="da" data-audio-ready>${text.connectors.map(h).join(', ')}</span>`:''}</dd>
<dt>Повторы</dt><dd>повторяющихся слов (от 4 букв): ${text.repeatShare}%${text.topRepeats.length?` — <span lang="da" data-audio-ready>${text.topRepeats.map(r=>`${h(r.word)} ×${r.count}`).join(', ')}</span>`:''}</dd></dl>
${flags.length?`<p><b>Что заметила программа:</b> ${flags.join('; ')}.</p>`:''}
${missingReqs.length?`<p><b>Не отмечено как выполненное в задании (${missingReqs.length} из ${text.reqs.length}):</b></p><ul>${missingReqs.map(r=>`<li>${danish(r.t)}</li>`).join('')}</ul>`:''}
${missingChecks.length?`<p><b>Не отмечено в списке проверки (${missingChecks.length} из ${text.checks.length}):</b></p><ul>${missingChecks.map(c=>`<li>${h(c.t)}</li>`).join('')}</ul>`:''}
<details><summary>Твой текст и образец</summary><div class="pd3-compare"><div><h4>Твой текст</h4><div class="pd3-pre" lang="da" data-audio-ready>${text.text?h(text.text).replace(/\n/g,'<br>'):'<i>(пусто)</i>'}</div></div><div><h4>Образец</h4><div class="pd3-pre" lang="da" data-audio-ready>${h(text.model||'').replace(/\n/g,'<br>')}</div></div></div></details></section>`;
}

function weakSpotsView(report){
  const items=[];
  const types=Object.entries(report.reading.byType).filter(([,v])=>v.wrong>0).sort((a,b)=>b[1].wrong/b[1].total-a[1].wrong/a[1].total);
  if(types.length)items.push(`<li><b>Чтение.</b> Больше всего ошибок: ${types.map(([type,v])=>`${TYPE_NAMES[type]} — неверно ${v.wrong} из ${v.total}`).join('; ')}.</li>`);
  else if(Object.keys(report.reading.byType).length)items.push('<li><b>Чтение.</b> Ошибок нет.</li>');
  for(const text of report.writing.texts){
    const missing=text.reqs.filter(r=>!r.ok).length+text.checks.filter(c=>!c.ok).length;
    if(text.flags.length||missing)items.push(`<li><b>Письмо, ${danish(text.title)}.</b> ${text.flags.length?`${text.flags.map(flag=>FLAG_TEXT[flag](text)).join('; ')}. `:''}${missing?`Не отмечено пунктов задания и списка проверки: ${missing}.`:''}</li>`);
  }
  if(report.skills.oral){
    if(report.oral.lowest.length)items.push(`<li><b>Устная часть.</b> Самая низкая самооценка (${report.oral.lowest[0].score} из 5): ${report.oral.lowest.map(axis=>h(axis.title)).join(', ')}.</li>`);
    else if(report.skills.oral.percent===null)items.push('<li><b>Устная часть.</b> Оцени себя по всем критериям, и здесь появятся самые слабые.</li>');
  }
  return `<section class="panel pd3-mock-weakspots" aria-labelledby="pd3-mock-weak-title"><h2 id="pd3-mock-weak-title">Слабые места</h2>${items.length?`<ul>${items.join('')}</ul>`:'<p>Слабых мест не видно по отмеченному. Это не значит, что экзамен будет лёгким: самооценка бывает завышена.</p>'}</section>`;
}

function recommendationsView(report,data){
  const go=(view,id='',tab='')=>`data-action="pd3-mock-go" data-value="${h(view)}"${id?` data-id="${h(id)}"`:''}${tab?` data-tab="${h(tab)}"`:''}`;
  const rows=report.recs.map(rec=>{
    switch(rec.kind){
      case 'reading':return [`Чтение: потренируйся на текстах уровня ${rec.level}${rec.title?` — например, ${danish(rec.title)}`:''}. Тексты озвучиваются по предложениям, потом идут вопросы.`,go('reading',rec.id),rec.id?'Открыть текст':'К чтению вслух'];
      case 'writing':return ['Письмо: перечитай образцы и полезные фразы, затем напиши ответ ещё раз и сверь с чек-листом.',go('writing'),'К письму'];
      case 'oral':{
        const axes=(rec.axes||[]).map(id=>list(data,'oralCriteria').find(c=>c.id===id)?.title).filter(Boolean);
        return [`Устная часть: повтори фразы для беседы и дискуссии${axes.length?` (слабее всего: ${axes.map(h).join(', ')})`:''}.`,go('oral','','phrases'),'К фразам'];
      }
      case 'dictation':return [`Диктанты: чаще всего встречается ошибка «${h(errorLabel(rec.error))}». Есть диктант именно про неё.`,`data-action="pd3-weak-practice" data-id="${h(rec.id)}"`,'Потренировать'];
      default:return ['Пройди этот набор ещё раз через неделю или возьми другой набор: так видно, что изменилось.','data-action="pd3-mock-again"','Пройти ещё раз'];
    }
  });
  return `<section class="panel pd3-mock-recs" aria-labelledby="pd3-mock-recs-title"><h2 id="pd3-mock-recs-title">Что делать дальше</h2><ol>${rows.map(([text,attrs,label])=>`<li><span>${text}</span><button type="button" class="btn secondary" ${attrs}>${label}</button></li>`).join('')}</ol></section>`;
}

function reviewView(report,data,mock){
  const wrong=report.reading.rows.filter(row=>!row.ok);
  if(!Object.keys(report.reading.byType).length)return '';
  const find=list(data,'readingExamFind').find(x=>x.id===mock.set.find);
  const sectionLabel=id=>{const at=find?.sections.findIndex(s=>s.id===id)??-1;return at<0?'':`${at+1}. ${find.sections[at].title}`;};
  const rows=wrong.map(row=>{
    if(row.type==='find')return `<li><b>Del 1, вопрос ${row.n}.</b> ${danish(row.q)}<br>Твой ответ: ${row.given?danish(sectionLabel(row.given)):'нет ответа'}. Верно: ${danish(sectionLabel(row.correct))}.<blockquote lang="da" data-audio-ready>${h(row.evidence)}</blockquote><p class="pd3-why"><b>Почему:</b> ${h(row.why)}</p></li>`;
    if(row.type==='text1')return `<li><b>Del 2, текст 1, вопрос ${row.n}.</b> ${danish(row.q)}<br>Твой ответ: ${row.given?danish(row.given):'нет ответа'}. Верно: ${danish(row.correct)}.${row.why?`<p class="pd3-why"><b>Почему:</b> ${h(row.why)}</p>`:''}</li>`;
    if(row.type==='text2')return `<li><b>Del 2, текст 2, пропуск ${row.n}.</b> Твой ответ: ${row.given?`абзац ${h(row.given)}`:'нет ответа'}. Верно: абзац ${h(row.correct)}.${row.correctText?`<blockquote lang="da" data-audio-ready>${h(row.correctText)}</blockquote>`:''}${row.why?`<p class="pd3-why"><b>Почему:</b> ${h(row.why)}</p>`:''}</li>`;
    return `<li><b>Del 2, текст 3, пропуск ${row.n}.</b> <span lang="da" data-audio-ready>${h(row.q)}</span><br>Твой ответ: ${row.given?danish(row.given):'нет ответа'}. Верно: ${danish(row.correct)}.</li>`;
  });
  return `<section class="panel pd3-mock-review" aria-labelledby="pd3-mock-review-title"><h2 id="pd3-mock-review-title">Разбор ошибок чтения</h2>${rows.length?`<p class="field-note">Ошибок: ${rows.length}. Для каждой: твой ответ, верный ответ и пояснение.</p><ol class="pd3-mock-wrong">${rows.join('')}</ol>`:'<p>Ошибок в чтении нет.</p>'}</section>`;
}

export function mockReportView({data,mock,report,now}){
  const critW=list(data,'writingCriteria'),critO=list(data,'oralCriteria');
  const set=mock.set;
  const skills=Object.entries(report.skills).map(([key,skill])=>skillCard(key,skill,report.weak)).join('');
  const xp=mock.xp>0?`<p role="status"><b>+${mock.xp} XP</b> за завершение пробного экзамена.</p>`:report.engaged*2<report.stages?'<p class="field-note">XP не начислены: выполнено меньше половины этапов.</p>':'';
  return `${pageHead('Итоги пробного экзамена',`${modeName(mock.mode)} · набор ${set.id.replace(/^set-/,'')} · ${dateText(mock.finishedAt??now)} · на экзамен ушло около ${minutesText(report.minutes)}`)}
<div class="notice pd3-disclaimer">${icon('info')}<span>Это проценты по навыкам для тренировки, а не оценка по официальной шкале и не прогноз. Чтение проверила программа. Письмо и устная часть — твоя самооценка, она обычно выше настоящей оценки, поэтому не сравнивай эти проценты с чтением напрямую.</span></div>
<section aria-labelledby="pd3-mock-skills-title"><h2 id="pd3-mock-skills-title" class="pd3-h2">Результаты по навыкам</h2><ul class="pd3-mock-skills">${skills}</ul>${xp}</section>
${report.writing.texts.length?`<section class="panel pd3-mock-writing" aria-labelledby="pd3-mock-writing-title"><h2 id="pd3-mock-writing-title">Письмо: проверки программы</h2><p class="field-note">Это механические подсказки, отдельно от самооценки: программа считает слова, связки и повторы, но не проверяет грамматику и смысл.</p>${report.writing.texts.map(writingChecks).join('')}</section>
<section class="panel pd3-mock-self" aria-labelledby="pd3-mock-sw-title"><h2 id="pd3-mock-sw-title">Самооценка письма</h2><p class="field-note">Сравни свои тексты с образцами выше и оцени оба по каждому критерию.</p>${selfAssessment('pd3-mself-w',critW,mock.self.writing)}</section>`:''}
${report.skills.oral?`<section class="panel pd3-mock-self" aria-labelledby="pd3-mock-so-title"><h2 id="pd3-mock-so-title">Самооценка устной части</h2><p class="field-note">Записи не сохраняются, поэтому оцени себя по памяти: как прошли монолог, интервью${mock.mode==='full'?', взаимодействие и дискуссия':''}.</p>${selfAssessment('pd3-mself-o',critO,mock.self.oral)}</section>`:''}
${weakSpotsView(report)}${recommendationsView(report,data)}${reviewView(report,data,mock)}
<div class="button-row pd3-mock-foot"><button type="button" class="btn primary" data-action="pd3-mock-again">Пройти этот набор ещё раз</button><button type="button" class="btn secondary" data-action="pd3-mock-close">Закрыть отчёт</button></div>`;
}

/** The screen of the controller's current phase. */
export function mockView({data,d,run,now,sets,report}){
  if(run.phase==='setup')return mockSetupView({data,d,setup:run.setup,sets});
  const mock=run.mock;
  if(isFinished(mock))return mockReportView({data,mock,report,now});
  if(stageOf(mock).kind==='break')return mockBreakView({mock,run});
  return mockStageView({data,d,run,now});
}
