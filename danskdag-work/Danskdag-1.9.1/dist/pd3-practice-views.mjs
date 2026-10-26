// Views of the reading exam, writing and oral practice. Every function returns an HTML string.
import {h,icon,spoken} from './ui.mjs';
import {backButton,pageHead,toggleButtons,checkbox,mcq,lettersBar,paragraphs,clock,selfAssessment} from './pd3-ui.mjs';
import {resultBlock,DISCLAIMER} from './pd3-views.mjs';
import {analyzeWriting} from './pd3-writing-check.mjs';

const backTo=(view,label)=>`<button type="button" class="text-button pd3-back" data-action="pd3-open" data-value="${view}">${icon('arrow')}<span>${label}</span></button>`;
const empty=text=>`<div class="info-panel">${text}</div>`;
const optionList=(items,selected,placeholder)=>`<option value="">${placeholder}</option>${items.map(([value,text,disabled])=>`<option value="${h(value)}" ${selected===value?'selected':''} ${disabled?'disabled':''}>${h(text)}</option>`).join('')}`;

/* ---------- Reading exam ---------- */
export function examListView({data,d}){
  const row=(kind,item,title,sub,entry)=>`<button type="button" class="panel pd3-item" data-action="pd3-pick" data-value="${kind}" data-id="${h(item.id)}"><span class="pill ${entry?.attempts?'mint':''}">${entry?.attempts?`Лучший результат: ${entry.best}%`:kind==='find'?'Del 1 · 25 мин':'Del 2 · 65 мин'}</span><b lang="da" data-audio-ready>${h(title)}</b><small>${sub}</small></button>`;
  const list=data.readingExamFind.map(item=>row('find',item,item.title,`${item.sections.length} разделов · ${item.questions.length} вопросов · ${item.minutes||25} минут`,d.exam.find[item.id])).concat(data.readingExamText.map(item=>row('text',item,item.text1.title,`Три задания: вопросы к тексту, вставка абзацев, пропуски · ${item.minutes||65} минут`,d.exam.text[item.id])));
  return `${backButton()}${pageHead('Чтение (экзамен)','Del 1: найти раздел, где есть ответ. Del 2: три задания к текстам. Время ограничено, но таймер можно отключить.')}${list.length?`<div class="pd3-list">${list.join('')}</div>`:empty('Материалы появятся позже.')}`;
}

export function examIntroView({kind,item,d}){
  const minutes=item.minutes||(kind==='find'?25:65);
  const text=kind==='find'?'В тексте несколько разделов. К каждому вопросу выбери раздел, в котором находится ответ. Каждый раздел может подойти к нескольким вопросам.':'Три задания: вопросы к первому тексту, вставка пропущенных абзацев во второй и выбор слов в третьем. Каждый абзац во втором задании подходит только один раз.';
  return `${backTo('exam','К списку заданий')}${pageHead(kind==='find'?item.title:item.text1.title,kind==='find'?'Del 1':'Del 2')}<section class="panel pd3-intro"><p>${text}</p><p>Время по формату: <b>${minutes} минут</b>. ${DISCLAIMER}</p>${checkbox('pd3-timer-on','С таймером (обратный отсчёт)',d.settings.exam.timer,'data-pd3-setting="timerExam"')}<p class="field-note">Без таймера можно решать в своём темпе. Когда время выходит, ответы проверяются автоматически.</p><div class="button-row"><button type="button" class="btn primary" data-action="pd3-exam-start">Начать</button></div></section>`;
}

const timerBar=(run,minutes)=>run.timerOn?`<div class="panel pd3-timer"><span class="pd3-label">Осталось времени</span><b id="pd3-timer" role="timer" aria-live="off">${clock(run.remaining??minutes*60)}</b></div>`:`<div class="panel pd3-timer"><span class="pd3-label">Без таймера</span></div>`;

function highlightEvidence(paragraph,evidence){
  const at=evidence?paragraph.indexOf(evidence):-1;
  if(at<0)return h(paragraph);
  return `${h(paragraph.slice(0,at))}<mark class="pd3-evid">${h(evidence)}</mark>${h(paragraph.slice(at+evidence.length))}`;
}

export function examFindView({item,run}){
  const checked=run.phase==='result',minutes=item.minutes||25;
  const evidenceBySection=new Map();
  if(checked)for(const q of item.questions){if(!evidenceBySection.has(q.section))evidenceBySection.set(q.section,[]);evidenceBySection.get(q.section).push(q);}
  const sections=item.sections.map((s,si)=>`<section class="panel pd3-section" id="pd3-sec-${h(s.id)}"><h3 tabindex="-1" lang="da" data-audio-ready>${si+1}. ${h(s.title)}</h3>${s.paragraphs.map(p=>{
    const hits=(evidenceBySection.get(s.id)||[]).filter(q=>p.includes(q.evidence));
    let html=h(p);
    if(hits.length){html=p;let out='',pos=0;for(const q of hits.sort((a,b)=>p.indexOf(a.evidence)-p.indexOf(b.evidence))){const at=p.indexOf(q.evidence);if(at<pos)continue;out+=h(p.slice(pos,at))+`<mark class="pd3-evid" title="Вопрос ${item.questions.indexOf(q)+1}">${h(q.evidence)}</mark>`;pos=at+q.evidence.length;}html=out+h(p.slice(pos));}
    return `<p lang="da" data-audio-ready>${html}</p>`;}).join('')}</section>`).join('');
  const options=item.sections.map((s,i)=>[s.id,`${i+1}. ${s.title}`]);
  const list=item.questions.map((q,i)=>{
    const given=run.answers[`find:${q.id}`]||'',ok=given===q.section,section=item.sections.find(s=>s.id===q.section);
    return `<li class="pd3-find-q ${checked?(ok?'is-right':'is-wrong'):''}"><label for="pd3-find-${h(q.id)}"><span class="pd3-qn">${i+1}.</span> <span lang="da" data-audio-ready>${h(q.q)}</span></label><select id="pd3-find-${h(q.id)}" data-pd3-set="find:${h(q.id)}" ${checked?'disabled':''}>${optionList(options,given,'— выбери раздел —')}</select>${checked?`<div class="pd3-feedback"><b>${ok?'Верно.':'Неверно.'}</b> Ответ в разделе ${item.sections.indexOf(section)+1}: <span lang="da" data-audio-ready>${h(section?.title||'')}</span>.<blockquote lang="da" data-audio-ready>${h(q.evidence)}</blockquote><p class="pd3-why"><b>Почему:</b> ${h(q.why)}</p></div>`:''}</li>`;}).join('');
  const score=checked?item.questions.filter(q=>run.answers[`find:${q.id}`]===q.section).length:0;
  const answered=item.questions.filter(q=>run.answers[`find:${q.id}`]).length;
  return `${backTo('exam','К списку заданий')}${pageHead(item.title,'Del 1')}${checked?resultBlock(score,item.questions.length,run.timeUp?'Время вышло. Результат Del 1':'Результат Del 1'):timerBar(run,minutes)}
<div class="pd3-exam-grid"><div class="pd3-sections"><nav class="panel pd3-toc" aria-label="Оглавление"><h2>Разделы</h2><ol>${item.sections.map((s,i)=>`<li><button type="button" class="text-button" data-action="pd3-jump" data-id="${h(s.id)}"><span lang="da" data-audio-ready>${i+1}. ${h(s.title)}</span></button></li>`).join('')}</ol></nav>${sections}</div>
<section class="pd3-qlist" aria-labelledby="pd3-find-title"><h2 id="pd3-find-title">Вопросы · ${checked?`${score} из ${item.questions.length}`:`отвечено ${answered} из ${item.questions.length}`}</h2><ol>${list}</ol>${checked?'':`<div class="button-row"><button type="button" class="btn primary" data-action="pd3-exam-finish">Завершить и проверить</button></div>`}</section></div>`;
}

export function examTextView({item,run}){
  const checked=run.phase==='result',minutes=item.minutes||65;
  const t1=item.text1,t2=item.text2,t3=item.text3;
  const gaps2=t2.parts.filter(p=>p.gap).map(p=>p.gap),gaps3=t3.segments.filter(s=>typeof s!=='string');
  const used2=new Set(Object.entries(run.answers).filter(([k,v])=>k.startsWith('t2:')&&v).map(([,v])=>v));
  const a=run.answers;
  const s1=checked?t1.questions.filter((q,i)=>a[`t1:${i}`]===q.answer).length:0;
  const s2=checked?gaps2.filter(n=>a[`t2:${n}`]===t2.solution[n]).length:0;
  const s3=checked?gaps3.filter(g=>a[`t3:${g.gap}`]===g.answer).length:0;
  const counts={t1:t1.questions.filter((q,i)=>a[`t1:${i}`]!==undefined).length,t2:gaps2.filter(n=>a[`t2:${n}`]).length,t3:gaps3.filter(g=>a[`t3:${g.gap}`]!==undefined).length};
  const tabs=[['t1',`Текст 1 · вопросы (${checked?`${s1}/${t1.questions.length}`:`${counts.t1}/${t1.questions.length}`})`],['t2',`Текст 2 · абзацы (${checked?`${s2}/${gaps2.length}`:`${counts.t2}/${gaps2.length}`})`],['t3',`Текст 3 · пропуски (${checked?`${s3}/${gaps3.length}`:`${counts.t3}/${gaps3.length}`})`]];
  let body;
  if(run.task==='t1'){
    const answers=run.answers;
    body=`<h2 lang="da" data-audio-ready>${h(t1.title)}</h2><div class="pd3-passage" lang="da" data-audio-ready>${t1.paragraphs.map(p=>`<p>${h(p)}</p>`).join('')}</div><section class="pd3-questions">${t1.questions.map((q,i)=>mcq(q,`t1:${i}`,answers,{checked})).join('')}</section>`;
  }else if(run.task==='t2'){
    const sel=n=>{
      const given=run.answers[`t2:${n}`]||'';
      const opts=t2.removed.map(r=>[r.id,`${r.id}${used2.has(r.id)&&given!==r.id?' (уже использован)':''}`,used2.has(r.id)&&given!==r.id]);
      const ok=given===t2.solution[n];
      return `<div class="pd3-gap ${checked?(ok?'is-right':'is-wrong'):''}"><label for="pd3-t2-${n}">Пропуск ${n}</label><select id="pd3-t2-${n}" data-pd3-set="t2:${n}" ${checked?'disabled':''}>${optionList(opts,given,'— выбери абзац —')}</select>${checked?`<div class="pd3-feedback"><b>${ok?'Верно.':`Нужен абзац ${t2.solution[n]}.`}</b><p class="pd3-why"><b>Почему:</b> ${h(t2.why?.[n]||'')}</p></div>`:''}</div>`;};
    body=`<h2 lang="da" data-audio-ready>${h(t2.title)}</h2><section class="panel pd3-removed"><h3>Абзацы для вставки</h3><ul>${t2.removed.map(r=>`<li><b>${h(r.id)}.</b> <span lang="da" data-audio-ready>${h(r.t)}</span></li>`).join('')}</ul>${checked&&t2.distractorWhy?`<p class="pd3-why"><b>Лишние абзацы:</b> ${h(typeof t2.distractorWhy==='string'?t2.distractorWhy:Object.entries(t2.distractorWhy).map(([k,v])=>`${k}: ${v}`).join(' '))}</p>`:''}</section><div class="pd3-passage">${t2.parts.map(p=>p.gap?sel(p.gap):`<p lang="da" data-audio-ready>${h(p.t)}</p>`).join('')}</div>`;
  }else{
    const parts=t3.segments.map(seg=>{
      if(typeof seg==='string')return h(seg).replace(/\n/g,'<br>');
      const given=run.answers[`t3:${seg.gap}`],ok=given===seg.answer;
      return `<span class="pd3-cloze-gap ${checked?(ok?'is-right':'is-wrong'):''}"><select id="pd3-t3-${seg.gap}" aria-label="Пропуск ${seg.gap}" data-pd3-set="t3:${seg.gap}" lang="da" ${checked?'disabled':''}><option value="">(${seg.gap})</option>${seg.options.map((o,i)=>`<option value="${i}" ${given===i?'selected':''}>${h(o)}</option>`).join('')}</select>${checked?`<span class="pd3-mark">${ok?'верно':`нужно: ${h(seg.options[seg.answer])}`}</span>`:''}</span>`;
    }).join('');
    body=`<h2 lang="da" data-audio-ready>${h(t3.title)}</h2><div class="panel pd3-cloze" lang="da" data-audio-ready>${parts}</div>`;
  }
  const total=checked?s1+s2+s3:0,max=t1.questions.length+gaps2.length+gaps3.length;
  const summary=checked?`${resultBlock(total,max,run.timeUp?'Время вышло. Результат Del 2':'Результат Del 2')}<ul class="pd3-parts"><li>Текст 1 (вопросы): ${s1} из ${t1.questions.length}</li><li>Текст 2 (абзацы): ${s2} из ${gaps2.length}</li><li>Текст 3 (пропуски): ${s3} из ${gaps3.length}</li></ul>`:timerBar(run,minutes);
  return `${backTo('exam','К списку заданий')}${pageHead('Чтение, Del 2','Три задания к текстам')}${summary}<div class="pd3-tabs" role="group" aria-label="Задания Del 2">${tabs.map(([id,label])=>`<button type="button" class="${run.task===id?'active':''}" data-action="pd3-task" data-value="${id}" aria-pressed="${run.task===id}">${label}</button>`).join('')}</div><section class="pd3-task">${body}</section>${checked?'':`<div class="button-row"><button type="button" class="btn primary" data-action="pd3-exam-finish">Завершить и проверить</button></div>`}`;
}

/* ---------- Writing ---------- */
export function writingListView({data,d}){
  const row=(kind,item,sub)=>{const w=d.writing[item.id];return `<button type="button" class="panel pd3-item" data-action="pd3-pick" data-value="${kind}" data-id="${h(item.id)}"><span class="pill ${w?.done?'mint':''}">${w?.done?'Готово':w?.draft?'Есть черновик':kind==='email'?'Письмо':'Сочинение'}</span><b lang="da" data-audio-ready>${h(item.title)}</b><small>${h(item.topic)} · ${item.level} · ${sub}</small></button>`;};
  const list=data.writingEmail.map(e=>row('email',e,`${e.minWords}–${e.maxWords} слов`)).concat(data.writingTask.map(t=>row('task',t,`${t.minWords}–${t.maxWords} слов`)));
  return `${backButton()}${pageHead('Письмо','Ответ на письмо (100–160 слов) и сочинение (200–300 слов). Черновик сохраняется сам.')}${list.length?`<div class="pd3-list">${list.join('')}</div>`:empty('Материалы появятся позже.')}`;
}

export const writingSpec=(kind,item,option)=>{
  const chosen=kind==='task'?item.options.find(o=>o.key===option)||item.options[0]:item;
  return {prompt:chosen.prompt,requirements:chosen.requirements,model:kind==='task'?item.modelAnswers[chosen.key]:item.modelAnswer,key:chosen.key};
};

export function wordMeter(words,min,max){
  const level=words<min?'low':words>max?'high':'ok';
  const text=level==='low'?`мало, не хватает ещё ${min-words}`:level==='high'?`много, лишних слов: ${words-max}`:'в пределах нормы';
  return {level,html:`Слов: <b>${words}</b> · нужно ${min}–${max} · ${text}`,percent:Math.min(100,Math.round(words/max*100))};
}

export function writingItemView({kind,item,d,run,data}){
  const stored=d.writing[item.id]||{},option=run.option,spec=writingSpec(kind,item,option);
  const text=run.text,meter=wordMeter(analyzeWriting(text).words,item.minWords,item.maxWords);
  const settings=d.settings.writing;
  const optionPicker=kind==='task'?`<div class="pd3-choice" role="group" aria-label="Выбор темы">${item.options.map(o=>`<button type="button" class="${o.key===spec.key?'active':''}" data-action="pd3-wopt" data-value="${o.key}" aria-pressed="${o.key===spec.key}">Тема ${o.key}</button>`).join('')}</div>`:'';
  const prompt=`<section class="panel pd3-prompt"><h2>${kind==='email'?'Письмо, на которое нужно ответить':'Задание'}</h2><div class="pd3-pre" lang="da" data-audio-ready>${paragraphs(spec.prompt)}</div><h3>Что должно быть в ответе</h3><ul class="pd3-reqs">${spec.requirements.map((r,i)=>`<li>${checkbox(`pd3-req-${i}`,`<span lang="da" data-audio-ready>${h(r)}</span>`,stored.req?.[i],`data-pd3-check="req:${i}"`)}</li>`).join('')}</ul></section>`;
  const common=`<section class="panel pd3-checklist"><h3>Проверь перед сдачей</h3><ul>${(item.checklist||[]).map((c,i)=>`<li>${checkbox(`pd3-chk-${i}`,h(c),stored.check?.[i],`data-pd3-check="check:${i}"`)}</li>`).join('')}</ul></section>`;
  if(run.phase==='done'){
    const a=analyzeWriting(text,data.connectors,{minWords:item.minWords,maxWords:item.maxWords});
    return `${backTo('writing','К списку заданий')}${pageHead(item.title,'Проверка')}
<section class="panel pd3-checks-result"><h2>Механические проверки</h2><p class="field-note">Это подсказки, а не оценка: программа считает слова и связки, но не проверяет грамматику и смысл.</p><dl>
<dt>Слов</dt><dd>${a.words} (нужно ${item.minWords}–${item.maxWords}) · ${a.level==='ok'?'в пределах нормы':a.level==='low'?'мало':'много'}</dd>
<dt>Предложений</dt><dd>${a.sentences}${a.sentences?` · в среднем ${String(a.averageSentence).replace('.',',')} слов в предложении`:''}</dd>
<dt>Связки</dt><dd>найдено разных: ${a.connectors.length}${a.connectors.length?` — <span lang="da" data-audio-ready>${a.connectors.map(h).join(', ')}</span>`:''}</dd>
<dt>Повторы</dt><dd>повторяющихся слов (от 4 букв): ${a.repeatShare}%${a.topRepeats.length?` — <span lang="da" data-audio-ready>${a.topRepeats.map(r=>`${h(r.word)} ×${r.count}`).join(', ')}</span>`:''}</dd></dl></section>
<div class="pd3-compare"><section class="panel"><h2>Твой ответ</h2><div class="pd3-pre" lang="da" data-audio-ready>${paragraphs(text)||'<i>(пусто)</i>'}</div></section><section class="panel"><h2>Образец</h2><div class="pd3-pre" lang="da" data-audio-ready>${paragraphs(spec.model||'')}</div></section></div>
${item.phrases?.length?`<section class="panel"><h2>Полезные фразы</h2><ul class="pd3-phrases">${item.phrases.map(p=>`<li>${spoken(p.da)} <span lang="ru">— ${h(p.ru)}</span></li>`).join('')}</ul></section>`:''}
<section class="panel"><h2>Самооценка</h2>${selfAssessment('pd3-wself',data.writingCriteria,stored.self)}</section>
<div class="button-row"><button type="button" class="btn secondary" data-action="pd3-write-edit">Продолжить редактирование</button></div>`;
  }
  return `${backTo('writing','К списку заданий')}${pageHead(item.title,`${h(item.topic)} · ${item.level}`)}${optionPicker}<div class="pd3-write-grid">${prompt}<div class="pd3-editor"><section class="panel pd3-writing"><label for="pd3-write" class="answer-label">Твой ответ</label>${lettersBar('Датские буквы')}<textarea id="pd3-write" lang="da" autocapitalize="sentences" autocorrect="off" autocomplete="off" spellcheck="false" rows="14" maxlength="12000">${h(text)}</textarea><p class="pd3-count pd3-count-${meter.level}" id="pd3-count" role="status">${meter.html}</p><div class="meter" aria-hidden="true"><span id="pd3-count-bar" style="width:${meter.percent}%"></span></div><p class="field-note" id="pd3-saved" role="status">${stored.updatedAt?'Черновик сохранён.':'Черновик сохраняется автоматически.'}</p></section>
<section class="panel pd3-timer-box"><h3>Таймер</h3>${checkbox('pd3-wtimer-on','Включить таймер (необязательно)',settings.timer,'data-pd3-setting="writeTimer"')}${settings.timer?`<label for="pd3-wtimer-min">Минут</label><select id="pd3-wtimer-min" data-pd3-setting="writeMinutes">${[30,45,60,90,120].map(m=>`<option value="${m}" ${settings.minutes===m?'selected':''}>${m}</option>`).join('')}</select><p class="pd3-timer"><b id="pd3-timer" role="timer" aria-live="off">${clock(run.remaining??settings.minutes*60)}</b></p><div class="button-row"><button type="button" class="btn secondary" data-action="pd3-wtimer">${run.timerOn?'Остановить таймер':'Запустить таймер'}</button></div>`:''}</section>${common}<div class="button-row"><button type="button" class="btn primary" data-action="pd3-write-done">Готово: показать проверку и образец</button></div></div></div>`;
}

/* ---------- Oral ---------- */
export const ORAL_NOTE='Программа не оценивает речь автоматически: оцени себя сам по критериям ниже. Запись остаётся только в памяти этой вкладки, не сохраняется и не отправляется и удаляется при закрытии, уходе со страницы или скрытии вкладки.';
const TABS=[['monologue','Монолог'],['interview','Интервью'],['interaction','Взаимодействие'],['discussion','Дискуссия'],['phrases','Фразы']];

export function recorderHtml(rec,{maxSeconds=20}={}){
  const busy=['requesting','recording','stopping'].includes(rec.phase);
  return `<div class="pd3-recorder"><div class="button-row">${rec.phase==='recording'?'<button type="button" class="btn primary" data-action="pd3-rec-stop">Остановить запись</button>':`<button type="button" class="btn secondary" data-action="pd3-rec-start" ${busy?'disabled':''}>${rec.url?'Записать ещё раз':'Записать себя'}</button>`}${rec.url?'<button type="button" class="btn secondary" data-action="pd3-rec-clear">Удалить запись</button>':''}</div><p class="field-note" role="status">${h(rec.message)||`Запись до ${maxSeconds} секунд. Она остаётся только в памяти этой вкладки.`}</p>${rec.url?`<audio controls src="${h(rec.url)}"></audio>`:''}</div>`;
}

export function oralView({data,d,run}){
  const tabs=`<div class="pd3-tabs" role="group" aria-label="Части устного экзамена">${TABS.map(([id,label])=>`<button type="button" class="${run.tab===id?'active':''}" data-action="pd3-oral-tab" data-value="${id}" aria-pressed="${run.tab===id}">${label}</button>`).join('')}</div>`;
  const head=`${backButton()}${pageHead('Устная часть','Тренировка по мотивам формата PD3: говори вслух, записывай себя и оценивай.')}<div class="notice pd3-disclaimer">${icon('info')}<span>${ORAL_NOTE}</span></div>${tabs}`;
  const pickList=(list,titleOf,subOf)=>`<div class="pd3-list">${list.map(item=>`<button type="button" class="panel pd3-item ${run.id===item.id?'active':''}" data-action="pd3-oral-pick" data-id="${h(item.id)}" aria-pressed="${run.id===item.id}"><b lang="da" data-audio-ready>${h(titleOf(item))}</b><small>${subOf(item)}</small></button>`).join('')}</div>`;
  const self=key=>`<section class="panel"><h2>Самооценка</h2>${selfAssessment('pd3-oself',data.oralCriteria,d.oral[key]?.self)}</section>`;
  const rec=(max)=>recorderHtml(run.rec,{maxSeconds:max});
  let body='';
  if(run.tab==='monologue'){
    const list=data.oralMonologue,item=list.find(m=>m.id===run.id);
    body=list.length?pickList(list,m=>m.title,m=>h(m.topic)):empty('Материалы появятся позже.');
    if(item){
      const words=d.oral[run.key]?.keywords?.length?d.oral[run.key].keywords:item.keywords.slice(0,12);
      body+=`<section class="panel pd3-mono"><h2 lang="da" data-audio-ready>${h(item.title)}</h2><p>Расскажи об этом около двух минут. Затронь пункты:</p><ul lang="da" data-audio-ready>${item.prompts.map(p=>`<li>${h(p)}</li>`).join('')}</ul>${item.hint?`<p class="note-box">${icon('info')}<span>${h(item.hint)}</span></p>`:''}
<h3>Лист ключевых слов (до 12)</h3><p class="field-note">Слова можно изменить: лист — твоя шпаргалка на время монолога.</p><ul class="pd3-keywords">${words.map((w,i)=>`<li><label class="sr-only" for="pd3-kw-${i}">Ключевое слово ${i+1}</label><input type="text" id="pd3-kw-${i}" data-pd3-kw="${i}" lang="da" autocapitalize="none" autocorrect="off" spellcheck="false" maxlength="40" value="${h(w)}"><button type="button" class="icon-button" data-action="pd3-kw-remove" data-pos="${i}" aria-label="Удалить слово ${i+1}: ${h(w)}">${icon('close')}</button></li>`).join('')}</ul><div class="button-row"><button type="button" class="btn secondary" data-action="pd3-kw-add" ${words.length>=12?'disabled':''}>Добавить слово</button><button type="button" class="btn secondary" data-action="pd3-kw-reset">Вернуть исходный лист</button></div>
<div class="panel pd3-timer"><span class="pd3-label">Монолог</span><b id="pd3-timer" role="timer" aria-live="off">${clock(run.remaining??120)}</b><button type="button" class="btn primary" data-action="${run.timerOn?'pd3-mono-stop':'pd3-mono-start'}">${run.timerOn?'Закончить монолог':'Начать: таймер 2 минуты и запись'}</button></div>${rec(150)}</section>${self(run.key)}`;
    }
  }else if(run.tab==='interview'){
    const list=data.oralInterview,item=list.find(m=>m.id===run.id);
    body=list.length?pickList(list,m=>m.theme,m=>`${m.questions.length} вопросов`):empty('Материалы появятся позже.');
    if(item){
      const i=Math.min(run.step,item.questions.length-1),last=i>=item.questions.length-1;
      body+=`<section class="panel pd3-interview"><h2 lang="da" data-audio-ready>${h(item.theme)}</h2><p class="field-note">Вопрос ${i+1} из ${item.questions.length}</p><p class="pd3-bigq" lang="da" data-audio-ready>${h(item.questions[i])}</p><div class="button-row"><button type="button" class="btn secondary" data-action="pd3-say" data-text="${h(item.questions[i])}">${icon('sound')} Прочитать вопрос вслух</button></div>${rec(60)}<div class="button-row"><button type="button" class="btn secondary" data-action="pd3-iq" data-value="-1" ${i===0?'disabled':''}>Предыдущий вопрос</button><button type="button" class="btn secondary" data-action="pd3-iq" data-value="1" ${last?'disabled':''}>Следующий вопрос</button></div>${last&&item.followUps?.length?`<h3>Уточняющие вопросы</h3><ul lang="da" data-audio-ready>${item.followUps.map(f=>`<li>${h(f)} ${spoken(f)}</li>`).join('')}</ul>`:''}</section>${self(run.key)}`;
    }
  }else if(run.tab==='interaction'){
    const list=data.oralInteraction,item=list.find(m=>m.id===run.id);
    body=list.length?pickList(list,m=>m.title,m=>h(m.situation)):empty('Материалы появятся позже.');
    if(item){
      const shown=item.partner.slice(0,run.step+1);
      const line=item.partner[run.step];
      body+=`<section class="panel pd3-interaction"><h2 lang="da" data-audio-ready>${h(item.title)}</h2><p>${h(item.situation)}</p><p><b>Твоя роль:</b> ${h(item.yourRole)}</p><h3>Что нужно сделать</h3><ul lang="da" data-audio-ready>${item.tasks.map(t=>`<li>${h(t)}</li>`).join('')}</ul>
${run.started?`<div class="pd3-dialogue" aria-live="polite">${shown.map((l,i)=>`<p class="pd3-partner ${i===run.step?'is-now':''}"><b>Партнёр:</b> <span lang="da" data-audio-ready>${h(l.da)}</span>${d.settings.reader.translation?` <small lang="ru">${h(l.ru)}</small>`:''}</p>`).join('')}</div>
<div class="button-row"><button type="button" class="btn secondary" data-action="pd3-say" data-text="${h(line.da)}">${icon('sound')} Повторить реплику</button></div><p class="note-box">${icon('info')}<span>Твоя очередь: ответь вслух и, если хочешь, запиши ответ.</span></p>${rec(60)}<div class="button-row">${run.step<item.partner.length-1?'<button type="button" class="btn primary" data-action="pd3-int-next">Дальше: следующая реплика партнёра</button>':'<p role="status"><b>Диалог закончен.</b></p>'}<button type="button" class="btn secondary" data-action="pd3-int-restart">Начать сначала</button></div>`:`<div class="button-row"><button type="button" class="btn primary" data-action="pd3-int-start">Начать диалог</button></div><p class="field-note">Партнёр говорит голосом устройства, после каждой реплики пауза для твоего ответа. Текст реплик виден на экране.</p>`}</section>${self(run.key)}`;
    }
  }else if(run.tab==='discussion'){
    const list=data.oralDiscussion,item=list.find(m=>m.id===run.id);
    body=list.length?pickList(list,m=>m.statement,m=>`${m.pro.length} за · ${m.contra.length} против`):empty('Материалы появятся позже.');
    if(item){
      body+=`<section class="panel pd3-discussion"><h2>Утверждение</h2><p class="pd3-bigq" lang="da" data-audio-ready>${h(item.statement)}</p><div class="button-row"><button type="button" class="btn secondary" data-action="pd3-say" data-text="${h(item.statement)}">${icon('sound')} Прочитать вслух</button></div><div class="pd3-compare"><div><h3>Аргументы «за»</h3><ul lang="da" data-audio-ready>${item.pro.map(a=>`<li>${h(a)}</li>`).join('')}</ul></div><div><h3>Аргументы «против»</h3><ul lang="da" data-audio-ready>${item.contra.map(a=>`<li>${h(a)}</li>`).join('')}</ul></div></div><h3>Фразы для дискуссии</h3><ul class="pd3-phrases">${item.phrases.map(p=>`<li>${spoken(p.da)} <span lang="ru">— ${h(p.ru)}</span></li>`).join('')}</ul>${rec(90)}</section>${self(run.key)}`;
    }
  }else{
    body=data.oralPhrases.length?data.oralPhrases.map(g=>`<details class="panel pd3-phrase-group"><summary>${h(g.group)} · ${g.items.length}</summary><ul class="pd3-phrases">${g.items.map(p=>`<li>${spoken(p.da)} <span lang="ru">— ${h(p.ru)}</span></li>`).join('')}</ul></details>`).join(''):empty('Материалы появятся позже.');
  }
  return head+body;
}
