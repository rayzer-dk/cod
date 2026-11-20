// Views of the PD3 hub, read-aloud practice, dictations and listening. Every function returns an HTML string.
import {h,icon,spoken,plural} from './ui.mjs';
import {backButton,pageHead,toggleButtons,checkbox,mcq,lettersBar} from './pd3-ui.mjs';
import {playerHtml,textHtml,sentenceHtml} from './pd3-reader-view.mjs';
import {annotate} from './pd3-diff.mjs';
import {canMock} from './pd3-mock.mjs';
import {planView,weakView,mockHistoryView,spellView} from './pd3-system-view.mjs';
import {grammarCardInfo,grammarWeakView} from './pd3-grammar-view.mjs';

export const DISCLAIMER='Это тренировка по мотивам формата PD3 (уровень B2), не официальный экзамен. Провайдеры описывают устную часть по-разному, поэтому задания приблизительные.';
const wordCount=item=>item.sentences.reduce((sum,s)=>sum+s.da.split(/\s+/).filter(Boolean).length,0);
const backTo=(view,label)=>`<button type="button" class="text-button pd3-back" data-action="pd3-open" data-value="${view}">${icon('arrow')}<span>${label}</span></button>`;
const empty=(text)=>`<div class="info-panel">${text}</div>`;

export function hubView({data,d,error,now=new Date(),spell=null}){
  const done=(map,list)=>list.filter(item=>map[item.id]?.attempts).length;
  const oralCount=data.oralMonologue.length+data.oralInterview.length+data.oralInteraction.length+data.oralDiscussion.length;
  const gram=grammarCardInfo(data,d);
  const cards=[
    ['reading','sound','Чтение вслух','Длинные тексты озвучиваются по предложениям с подсветкой слов, затем вопросы и словарик.',data.readingPractice.length?`Пройдено ${done(d.reading,data.readingPractice)} из ${data.readingPractice.length}`:'',data.readingPractice.length],
    ['dictation','target','Диктанты','Слушай, пиши и сравнивай: программа покажет ошибки по словам и типичные причины.',data.dictations.length?`Пройдено ${done(d.dictation,data.dictations)} из ${data.dictations.length}`:'',data.dictations.length],
    ['listening','chat','Аудирование','Текст звучит без показа, потом вопросы, расшифровка и перевод.',data.listening.length?`Пройдено ${done(d.listening,data.listening)} из ${data.listening.length}`:'',data.listening.length],
    ['exam','book','Чтение (экзамен)','Del 1 и Del 2 с таймером: разделы, пропущенные абзацы и пропуски в тексте.',data.readingExamFind.length+data.readingExamText.length?`Попыток: ${Object.values(d.exam.find).concat(Object.values(d.exam.text)).reduce((n,e)=>n+e.attempts,0)}`:'',data.readingExamFind.length+data.readingExamText.length],
    ['writing','cards','Письмо','Письмо и сочинение: счётчик слов, проверки, образец и самооценка.',data.writingEmail.length+data.writingTask.length?`Черновиков: ${Object.values(d.writing).filter(w=>w.draft).length}`:'',data.writingEmail.length+data.writingTask.length],
    ['oral','chat','Устная часть','Монолог, интервью, взаимодействие и дискуссия с записью себя и самооценкой.',oralCount?`Отмечено самооценок: ${Object.keys(d.oral).length}`:'',oralCount],
    ...(gram.count?[['grammar','layers','Грамматика B2',gram.text,gram.progress,gram.count]]:[]),
    ['mock','trophy','Пробный экзамен','Полный прогон по формату с таймером: чтение, письмо и устная часть по этапам, затем отчёт по навыкам.',Object.keys(d.mocks||{}).length?`Пройдено пробных экзаменов: ${Object.keys(d.mocks).length}`:'Ещё не проходили',canMock(data)?1:0]
  ];
  return `${pageHead('PD3: подготовка к экзамену','Практика уровня B2: читать, слушать, писать и говорить.')}
<div class="notice pd3-disclaimer">${icon('info')}<span>${DISCLAIMER}</span></div>
${error?`<div class="notice warning" role="alert">${icon('info')}<span>${error}</span></div>`:''}
<div class="pd3-hub">${cards.map(([view,ic,title,text,progress,count])=>`<button type="button" class="panel pd3-card" data-action="${view==='mock'?'pd3-mock-open':view==='grammar'?'pd3-gram-open':'pd3-open'}" data-value="${view}" ${count?'':'disabled'}><span class="topic-icon">${icon(ic)}</span><span class="pd3-card-body"><b>${title}</b><span>${text}</span><small>${count?progress:'Материалы появятся позже'}</small></span>${icon('arrow')}</button>`).join('')}</div>
${planView({d,data,now})}${mockHistoryView({d})}${weakView({d,data,label:errorLabel})}${grammarWeakView({d,data})}${spellView({spell})}
<section class="panel pd3-backup"><h2>Копия результатов PD3</h2><p>Результаты, черновики писем и настройки PD3 входят в общий прогресс и в его резервные копии. Отдельный файл удобен, чтобы перенести только PD3 на другое устройство. При загрузке лучшие результаты и более новые черновики объединяются с текущими.</p><div class="button-row"><button type="button" class="btn secondary" data-action="pd3-export">${icon('download')} Скачать копию PD3</button><button type="button" class="btn secondary" data-action="pd3-import">${icon('upload')} Загрузить</button></div><input id="pd3-file" type="file" accept=".json,application/json" hidden><p class="field-note">Аудиозаписи твоего голоса нигде не сохраняются и в копию не попадают.</p></section>`;
}

/* ---------- Read aloud ---------- */
export function readingListView({data,d}){
  return `${backButton()}${pageHead('Чтение вслух','Выбери текст: он озвучивается по предложениям, текущее предложение и слово подсвечиваются.')}
${data.readingPractice.length?`<div class="pd3-list">${data.readingPractice.map(item=>`<button type="button" class="panel pd3-item" data-action="pd3-pick" data-id="${h(item.id)}"><span class="pill ${d.reading[item.id]?.attempts?'mint':''}">${d.reading[item.id]?.attempts?`Лучший результат: ${d.reading[item.id].best}%`:item.level}</span><b lang="da" data-audio-ready>${h(item.title)}</b><small>${h(item.topic)} · ${wordCount(item)} слов · ${item.questions.length} вопросов</small></button>`).join('')}</div>`:empty('Материалы появятся позже.')}`;
}

export function readingItemView({item,d,run,known=null}){
  const settings=d.settings.reader,checked=run.checked;
  const result=checked?resultBlock(run.score,item.questions.length,'Понимание текста',run.xp):'';
  return `${backTo('reading','К списку текстов')}${pageHead(item.title,`${h(item.topic)} · ${item.level}`)}
<div class="pd3-reader">${playerHtml(settings)}${textHtml(item,{translation:settings.translation})}</div>
${item.vocab?.length?vocabBlock(item.vocab,known):''}
<section class="pd3-questions" aria-labelledby="pd3-q-title"><h2 id="pd3-q-title">Вопросы к тексту</h2>${item.questions.map((q,i)=>mcq(q,`q:${i}`,run.answers,{checked})).join('')}
${checked?result:`<div class="button-row"><button type="button" class="btn primary" data-action="pd3-check">Проверить ответы</button></div>`}</section>`;
}

export function resultBlock(score,total,label,xp=0){
  const percent=total?Math.round(score/total*100):0;
  return `<div class="panel pd3-result" role="status"><b class="pd3-score">${score} / ${total}</b><span>${label} · ${percent}%${xp>0?` · +${xp} XP`:''}</span><div class="meter" aria-hidden="true"><span style="width:${percent}%"></span></div></div>`;
}

/** The vocabulary of a reading text. With `known` (a function da -> already in the dictionary) every word gets an "add to my words" button. */
function vocabBlock(vocab,known){
  const list=vocab.map((v,i)=>{
    const have=known?known(v.da):false;
    const action=!known?'':have?'<span class="pill mint pd3-have">уже в словаре</span>':`<button type="button" class="btn secondary pd3-add" data-action="pd3-vocab-add" data-pos="${i}" aria-label="Добавить в мои слова: ${h(v.da)}">${icon('plus')} В мои слова</button>`;
    return `<li>${spoken(v.da)} <span lang="ru">— ${h(v.ru)}</span>${action}</li>`;
  }).join('');
  const missing=known?vocab.filter(v=>!known(v.da)).length:0;
  const all=!known?'':missing?`<div class="button-row"><button type="button" class="btn secondary" data-action="pd3-vocab-all">${icon('plus')} Добавить все в мои слова (${missing})</button></div>`:'<p class="field-note">Все слова из этого списка уже есть в твоём словаре.</p>';
  return `<details class="panel pd3-vocab" open><summary>Словарик · ${vocab.length}</summary><ul>${list}</ul>${all}</details>`;
}

/* ---------- Dictation ---------- */
const LABELS={aeoa:'Буквы æ, ø, å',double:'Двойные согласные',silent:'Немые буквы (d, g, h)',ending:'Окончания (-ede и -et, -er и -re)',case:'Заглавные и строчные буквы',other:'Другие ошибки в написании',punctuation:'Знаки препинания',missing:'Пропущенные слова',extra:'Лишние слова',order:'Порядок слов'};
export const errorLabel=kind=>LABELS[kind]||kind;
const STATUS_TEXT={misspelled:'написано с ошибкой',missing:'пропущено',order:'не на своём месте'};

export function dictationListView({data,d}){
  return `${backButton()}${pageHead('Диктанты','Два режима: по предложениям (с повторами) и весь текст с паузами.')}
${data.dictations.length?`<div class="pd3-list">${data.dictations.map(item=>`<button type="button" class="panel pd3-item" data-action="pd3-pick" data-id="${h(item.id)}"><span class="pill ${d.dictation[item.id]?.attempts?'mint':''}">${d.dictation[item.id]?.attempts?`Лучший результат: ${d.dictation[item.id].best}%`:item.mode==='text'?'Текст целиком':'По предложениям'}</span><b lang="da" data-audio-ready>${h(item.title)}</b><small>${h(item.topic)} · ${item.level} · ${item.sentences.length} предложений</small></button>`).join('')}</div>`:empty('Материалы появятся позже.')}`;
}

function dictationSettings(s,mode){
  return `<section class="panel pd3-settings" aria-label="Настройки диктанта"><div><span class="pd3-label">Скорость</span>${toggleButtons('Скорость диктовки','pd3-dict-rate',[[0.6,'0,6×'],[0.75,'0,75×'],[0.9,'0,9×'],[1,'1×']],s.rate)}</div><div><span class="pd3-label">${mode==='text'?'Сколько раз можно слушать текст':'Сколько раз можно слушать каждое предложение'}</span>${toggleButtons('Лимит повторов','pd3-dict-limit',[[0,'Без лимита'],[3,'3 раза'],[2,'2 раза, как на экзамене']],s.limit)}</div><div>${checkbox('pd3-strict','Строгий режим: учитывать регистр и знаки препинания',s.strict,'data-pd3-setting="strict"')}</div></section>`;
}
/** Longest input a dictation field takes: 1.5 times the reference (so a few extra words still fit), never below `minimum`, never above 3000. */
export const fieldLimit=(reference,minimum)=>Math.min(3000,Math.max(minimum,Math.ceil(String(reference).length*1.5)));
const remaining=(limit,used)=>limit?Math.max(0,limit-used):null;

export function dictationItemView({item,d,run}){
  const s=d.settings.dictation;
  if(run.result)return dictationResultView({item,d,run});
  const letters=lettersBar('Датские буквы');
  let body;
  if(item.mode==='text'){
    const left=remaining(s.limit,run.plays.all||0);
    body=`<div class="button-row"><button type="button" class="btn primary" data-action="pd3-dict-listen" data-pos="all" ${left===0?'disabled':''}>${icon('sound')} ${left===0?'Прослушивания закончились':'Слушать текст'}</button><button type="button" class="btn secondary" data-action="pd3-stop">Стоп</button></div><p class="field-note" role="status">${left===null?'Можно слушать сколько угодно раз.':`Осталось прослушиваний: ${left}`} Между предложениями есть паузы для записи.</p><label for="pd3-dict-text" class="answer-label">Твой текст</label><textarea id="pd3-dict-text" data-pd3-field="all" lang="da" autocapitalize="none" autocorrect="off" autocomplete="off" spellcheck="false" rows="9" maxlength="${fieldLimit(item.sentences.map(sentence=>sentence.da).join(' '),400)}" enterkeyhint="enter">${h(run.inputs.all||'')}</textarea>`;
  }else{
    body=`<ol class="pd3-dict-list">${item.sentences.map((_,i)=>{
      const left=remaining(s.limit,run.plays[i]||0);
      return `<li><div class="pd3-dict-row"><label for="pd3-dict-in-${i}">Предложение ${i+1} из ${item.sentences.length}</label><button type="button" class="btn secondary" data-action="pd3-dict-listen" data-pos="${i}" ${left===0?'disabled':''}>${icon('sound')} ${left===0?'Повторы закончились':'Прослушать'}</button><small role="status">${left===null?'':`Осталось: ${left}`}</small></div><input type="text" id="pd3-dict-in-${i}" data-pd3-field="${i}" lang="da" autocapitalize="none" autocorrect="off" autocomplete="off" spellcheck="false" maxlength="${fieldLimit(item.sentences[i].da,150)}" enterkeyhint="${i<item.sentences.length-1?'next':'done'}" value="${h(run.inputs[i]||'')}"></li>`;}).join('')}</ol>`;
  }
  return `${backTo('dictation','К списку диктантов')}${pageHead(item.title,`${h(item.topic)} · ${item.level}`)}${dictationSettings(s,item.mode)}${letters}<section class="pd3-dictation" aria-label="Диктант">${body}</section><p class="pd3-status" id="pd3-status" role="status" aria-live="polite"></p><p class="notice warning pd3-voice-note" id="pd3-message" hidden></p><div class="button-row"><button type="button" class="btn primary" data-action="pd3-dict-check">Проверить</button></div>`;
}

/** Splits global diff tokens into the sentences they belong to (sentences are joined with one space). */
export function unitStatuses(sentences,result,mode){
  if(mode!=='text')return result.units.map(u=>u.ref.filter(t=>t.word));
  const bounds=[];let offset=0;
  for(const s of sentences){bounds.push([offset,offset+s.da.length]);offset+=s.da.length+1;}
  return bounds.map(([from,to])=>result.whole.ref.filter(t=>t.word&&t.start>=from&&t.start<to));
}

export function dictationResultView({item,d,run}){
  const r=run.result,settings=d.settings.reader;
  const perUnit=unitStatuses(item.sentences,r,item.mode);
  const text=item.sentences.map((sentence,i)=>{
    const tokens=perUnit[i];
    const statusFor=k=>{const t=tokens[k];return t?{status:t.status,title:t.user?`Ты написал: ${t.user}`:t.status==='missing'?'Этого слова нет в твоём тексте':'',sr:STATUS_TEXT[t.status]?STATUS_TEXT[t.status]:''}:null;};
    return sentenceHtml(sentence,i,{translation:true,statusFor});
  }).join(' ');
  const typed=item.mode==='text'?[annotate(run.inputs.all||'',r.whole.user)]:r.units.map((u,i)=>annotate(run.inputs[i]||'',u.user));
  const errors=r.errors.length?`<ul class="pd3-errors">${r.errors.map(e=>`<li><b>${errorLabel(e.kind)}</b> · ${e.count}${e.examples.length?`<small lang="da" data-audio-ready>${e.examples.map(x=>x.ref&&x.user?`${h(x.ref)} → ${h(x.user)}`:h(x.ref||x.user)).join('; ')}</small>`:''}</li>`).join('')}</ul>`:'<p>Ошибок нет: всё записано точно.</p>';
  const userHtml=typed.map(pieces=>`<p lang="da" data-audio-ready>${pieces.map(p=>p.status?`<span class="pd3-d-${p.status}">${h(p.text)}${STATUS_TEXT[p.status]||p.status==='extra'?`<span class="sr-only"> (${p.status==='extra'?'лишнее':STATUS_TEXT[p.status]})</span>`:''}</span>`:h(p.text)).join('')||'<i>(пусто)</i>'}</p>`).join('');
  return `${backTo('dictation','К списку диктантов')}${pageHead(item.title,'Результат')}
<div class="panel pd3-result" role="status"><b class="pd3-score">${r.percent}%</b><span>Правильных слов: ${r.counts.correct} из ${r.counts.total}${r.counts.extra?` · лишних: ${r.counts.extra}`:''}${run.xp>0?` · +${run.xp} XP`:''}</span><div class="meter" aria-hidden="true"><span style="width:${r.percent}%"></span></div></div>
${run.spellAdded>0?`<p class="notice pd3-spell-added" role="status">${icon('repeat')}<span>Добавлено в повторение: ${run.spellAdded} ${plural(run.spellAdded,['предложение с ошибкой','предложения с ошибками','предложений с ошибками'])}. Они вернутся карточками «Диктант-карточка» в разделе «Повторение».</span></p>`:''}
<section class="panel pd3-legend"><h2>Типичные ошибки</h2>${errors}${item.tip?`<p class="note-box">${icon('info')}<span><b>На что слушать:</b> ${h(item.tip)}</span></p>`:''}</section>
<h2 class="pd3-h2">Эталон</h2><p class="field-note">Подчёркнуто волной — слово написано с ошибкой, пунктиром — пропущено, рамка — стоит не на своём месте. Нажми на предложение, чтобы услышать его ещё раз.</p>
<div class="pd3-reader">${playerHtml(settings,{showTranslation:false})}<div class="pd3-text" data-reader-text><p>${text}</p></div></div>
<h2 class="pd3-h2">Твой ввод</h2><div class="panel pd3-typed">${userHtml}</div>
<div class="button-row"><button type="button" class="btn primary" data-action="pd3-dict-again">Написать ещё раз</button></div>`;
}

/* ---------- Listening ---------- */
export function listeningListView({data,d}){
  return `${backButton()}${pageHead('Аудирование','Текст звучит без показа. Сначала слушай, потом отвечай на вопросы.')}
${data.listening.length?`<div class="pd3-list">${data.listening.map(item=>`<button type="button" class="panel pd3-item" data-action="pd3-pick" data-id="${h(item.id)}"><span class="pill ${d.listening[item.id]?.attempts?'mint':''}">${d.listening[item.id]?.attempts?`Лучший результат: ${d.listening[item.id].best}%`:item.level}</span><b lang="da" data-audio-ready>${h(item.title)}</b><small>${h(item.topic)} · можно слушать ${item.plays||2} раза · ${item.questions.length} вопросов</small></button>`).join('')}</div>`:empty('Материалы появятся позже.')}`;
}

export function listeningItemView({item,d,run}){
  const plays=item.plays||2,left=Math.max(0,plays-run.plays);
  const playing=['playing','loading'].includes(run.snap?.status);
  const listen=run.phase==='result'?'':`<section class="panel pd3-listen"><p>${h(item.situation||'')}</p><div class="button-row"><button type="button" class="btn primary" id="pd3-listen-btn" data-action="pd3-listen" ${left===0&&!playing&&run.snap?.status!=='paused'?'disabled':''}>${icon('sound')} <span class="pd3-play-label">${playing?'Пауза':run.plays===0?'Слушать':left===0&&run.snap?.status!=='paused'?'Прослушивания закончились':'Слушать ещё раз'}</span></button><button type="button" class="btn secondary" data-action="pd3-stop">Стоп</button></div><p class="field-note" role="status">Прослушиваний использовано: ${run.plays} из ${plays}.</p><p class="pd3-status" id="pd3-status" role="status" aria-live="polite"></p><p class="notice warning pd3-voice-note" id="pd3-message" hidden></p></section>`;
  const questions=run.phase==='listen'&&run.plays===0?'<p class="field-note">Нажми «Слушать». Вопросы появятся после первого прослушивания, текст откроется после проверки.</p>':`<section class="pd3-questions"><h2>Вопросы</h2>${item.questions.map((q,i)=>mcq(q,`q:${i}`,run.answers,{checked:run.phase==='result'})).join('')}${run.phase==='result'?resultBlock(run.score,item.questions.length,'Понимание на слух',run.xp):`<div class="button-row"><button type="button" class="btn primary" data-action="pd3-check">Проверить и открыть расшифровку</button></div>`}</section>`;
  const transcript=run.phase==='result'?`<section class="pd3-transcript"><h2>Расшифровка</h2>${playerHtml(d.settings.reader)}<div class="pd3-reader">${textHtml({sentences:item.sentences,paragraphs:[[0,item.sentences.length]]},{translation:d.settings.reader.translation})}</div></section>`:'';
  return `${backTo('listening','К списку записей')}${pageHead(item.title,`${h(item.topic)} · ${item.level}`)}${listen}${questions}${transcript}`;
}
