import {h,icon,spoken,button as btn,teachingText} from './ui.mjs';
import {numberToDanish} from './numbers.mjs';
import {basicsLessons,numberExamples,readingTexts} from './basics-data.mjs';

export function renderNumberResult(value){
 const text=String(value??'').trim();
 if(!text)return '<p class="basics-hint">Введи целое число от 0 до 9999.</p>';
 if(!/^\d{1,4}$/.test(text))return '<p class="basics-input-error">Нужны только цифры: целое число от 0 до 9999.</p>';
 const number=Number(text);
 return `<span class="number-result-value">${number}</span>${spoken(numberToDanish(number))}`;
}

function numbers(c){
 const value=String(c.numberValue??'21');
 const rows=[...Array.from({length:21},(_,n)=>n),21,30,40,50,60,70,80,90,100,1000];
 return `<section class="panel basics-number-reader" aria-labelledby="number-reader-title"><div class="section-title"><div><h2 id="number-reader-title">Как звучит число?</h2><p>Введи число и нажми на датскую запись.</p></div>${icon('sound')}</div><label for="number-input">Твоё число</label><input id="number-input" class="basics-number-input" type="text" inputmode="numeric" pattern="[0-9]*" maxlength="4" autocomplete="off" aria-describedby="number-help" value="${h(value)}"><p id="number-help" class="field-note">Целые числа 0–9999. Цены без дробей; годы и номера телефонов могут читаться иначе.</p><div id="number-result" class="number-result" aria-live="polite" aria-atomic="true">${renderNumberResult(value)}</div></section>
 <div class="basics-rule-grid"><article class="panel basics-rule"><h2>Сначала единицы</h2><p>${teachingText('21 — enogtyve: en + og + tyve. До ста пишем число слитно. После сотен и тысяч слова разделяются: to hundrede og femogtyve.')}</p></article><article class="panel basics-rule"><h2>Пять важных десятков</h2><p>${teachingText('50 — halvtreds · 60 — tres · 70 — halvfjerds · 80 — firs · 90 — halvfems. Слушай целое слово и повторяй вслух.')}</p></article></div>
 <section class="basics-reference" aria-labelledby="number-reference-title"><div class="section-title"><div><h2 id="number-reference-title">Числа под рукой</h2><p>Нажми на слово, чтобы послушать.</p></div></div><div class="basics-number-grid">${rows.map(n=>`<div class="basics-number-tile"><b>${n}</b>${spoken(numberToDanish(n))}</div>`).join('')}</div><p class="field-note">${teachingText('1 при счёте — en. С существительными: en taske, но et hus. Ударение и звучание лучше сверять по озвучке; написание не передаёт все звуки.')}</p></section>
 <section class="basics-examples" aria-labelledby="number-examples-title"><div class="section-title"><h2 id="number-examples-title">В жизни</h2></div><div class="basics-example-grid">${numberExamples.map(example=>`<article class="panel basics-example">${spoken(example.da)}<p>${h(example.ru)}</p></article>`).join('')}</div></section>`;
}

function reading(){
 return `<p class="info-panel">Прочитай короткий текст, послушай предложения и попробуй понять смысл. Перевод можно открыть после чтения. В уроке — шесть вопросов по тексту.</p><div class="basics-reading-list">${readingTexts.map(text=>`<article class="panel basics-reading-text" aria-labelledby="${text.id}-title"><div class="section-title"><div><span class="pill mint">A1</span><h2 id="${text.id}-title" lang="da">${h(text.title)}</h2><p>${h(text.subtitle)}</p></div></div><div class="basics-reading-sentences">${text.sentences.map(sentence=>`<p>${spoken(sentence.da)}</p>`).join('')}</div><div class="basics-reading-actions">${btn(`${icon('sound')} Послушать весь текст`,'speak-text','secondary',`data-text="${h(text.da)}"`)}${btn('Вопросы по тексту','lesson-intro','primary',`data-id="${text.lessonId}"`)}</div><details class="basics-translation"><summary>Открыть перевод</summary><p lang="ru">${h(text.ru)}</p></details></article>`).join('')}</div>`;
}

export function renderBasics(c,renderLessonCollection){
 const tab=c.basicsTab==='reading'?'reading':'numbers';
 const tabs=[['numbers','Числа и счёт','layers'],['reading','Короткое чтение','book']];
 const lessons=basicsLessons.filter(lesson=>lesson.id.startsWith(`basics-${tab}-`));
 return `<div class="basics-page"><div class="page-heading"><div><h1>Начни с простого</h1><p>Числа, озвучка и первые тексты на датском.</p></div></div><div class="filter-tabs basics-tabs" role="group" aria-label="Основы датского">${tabs.map(([id,label,symbol])=>`<button type="button" data-action="basics-tab" data-value="${id}" aria-pressed="${tab===id}" class="${tab===id?'active':''}">${icon(symbol)}${h(label)}</button>`).join('')}</div>${tab==='numbers'?numbers(c):reading()}<section class="course-section basics-lessons"><div class="section-title"><div><h2>${tab==='numbers'?'Потренируй числа':'Практика чтения'}</h2><p>Короткие уроки с результатом и повторением ошибок.</p></div></div>${renderLessonCollection(lessons,c.state)}</section></div>`;
}
