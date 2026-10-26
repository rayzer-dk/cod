// HTML of the reader (sentences as buttons, words as spans) and the DOM updates that follow the reader state.
import {h} from './ui.mjs';
import {tokenizeWords,READER_RATES,reducedMotion} from './pd3-audio.mjs';
import {toggleButtons,checkbox} from './pd3-ui.mjs';

const svg=path=>`<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="${path}"/></svg>`;
export const symbols={play:svg('M7 4v16l13-8z'),pause:svg('M8 5v14 M16 5v14'),stop:svg('M6 6h12v12H6z'),prev:svg('m15 5-8 7 8 7'),next:svg('m9 5 7 7-7 7')};

/** The sentence text with every word wrapped, so the current word can be marked without changing the text. */
export function wordsHtml(text,statusFor=null){
  let html='',offset=0,k=0;
  for(const word of tokenizeWords(text)){
    html+=h(text.slice(offset,word.start));
    const status=statusFor?.(k);
    html+=`<span class="pd3-w${status?` pd3-d-${status.status}`:''}" data-w="${k}"${status?.title?` title="${h(status.title)}"`:''}>${h(word.text)}${status?.sr?`<span class="sr-only"> (${status.sr})</span>`:''}</span>`;
    offset=word.end;k++;
  }
  return html+h(text.slice(offset));
}

export function sentenceHtml(sentence,index,{translation=false,statusFor=null,action='pd3-seek'}={}){
  return `<span class="pd3-unit"><button type="button" class="pd3-sent" data-action="${action}" data-pos="${index}" lang="da" data-audio-ready>${wordsHtml(sentence.da,statusFor)}</button>${translation&&sentence.ru?` <small class="pd3-tr" lang="ru">${h(sentence.ru)}</small>`:''}</span>`;
}

/** Paragraphs from [start,end) ranges; sentences not covered by any range are appended so nothing is lost. */
export function textHtml(item,options={}){
  const used=new Set(),blocks=[];
  for(const [from,to] of item.paragraphs||[]){
    const parts=[];
    for(let i=from;i<to&&i<item.sentences.length;i++){used.add(i);parts.push(sentenceHtml(item.sentences[i],i,options));}
    if(parts.length)blocks.push(`<p>${parts.join(' ')}</p>`);
  }
  const rest=item.sentences.map((_,i)=>i).filter(i=>!used.has(i));
  if(rest.length)blocks.push(`<p>${rest.map(i=>sentenceHtml(item.sentences[i],i,options)).join(' ')}</p>`);
  return `<div class="pd3-text" data-reader-text>${blocks.join('')}</div>`;
}

export function playerHtml(settings,{showTranslation=true,idPrefix='pd3'}={}){
  return `<div class="pd3-player" role="group" aria-label="Управление чтением вслух">
<div class="pd3-player-main">
<button type="button" class="btn primary" id="${idPrefix}-play" data-action="pd3-play"><span class="pd3-play-icon">${symbols.play}</span><span class="pd3-play-label">Слушать</span></button>
<button type="button" class="btn secondary" data-action="pd3-prev" aria-label="Предыдущее предложение" title="Предыдущее предложение (←)">${symbols.prev}</button>
<button type="button" class="btn secondary" data-action="pd3-next" aria-label="Следующее предложение" title="Следующее предложение (→)">${symbols.next}</button>
<button type="button" class="btn secondary" data-action="pd3-stop" aria-label="Остановить чтение" title="Остановить чтение">${symbols.stop}<span class="pd3-stop-label">Стоп</span></button>
</div>
<div class="pd3-player-options">
<div><span class="pd3-label" id="${idPrefix}-rate-label">Скорость</span>${toggleButtons('Скорость чтения','pd3-rate',READER_RATES.map(r=>[r,`${String(r).replace('.',',')}×`]),settings.rate)}</div>
<div class="pd3-checks">${checkbox(`${idPrefix}-follow`,'Следовать за чтением',settings.follow,'data-pd3-setting="follow"')}${showTranslation?checkbox(`${idPrefix}-translation`,'Показать перевод по предложениям',settings.translation,'data-pd3-setting="translation"'):''}</div>
</div>
<p class="pd3-status" id="${idPrefix}-status" role="status" aria-live="polite"></p>
<p class="notice warning pd3-voice-note" id="${idPrefix}-message" hidden></p>
<p class="pd3-now" id="${idPrefix}-now" lang="da" data-audio-ready hidden></p>
<p class="field-note">Пробел — пауза и продолжение, стрелки влево и вправо — предыдущее и следующее предложение, касание предложения — читать с него.</p>
</div>`;
}

export function statusText(snap){
  const n=snap.total,i=snap.index+1;
  if(snap.status==='playing'||snap.status==='loading')return `Читаю: предложение ${i} из ${n}`;
  if(snap.status==='paused')return `Пауза: предложение ${i} из ${n}`;
  if(snap.status==='manual')return `Ручной режим: предложение ${i} из ${n}`;
  if(snap.status==='finished')return 'Чтение закончено.';
  if(snap.status==='error')return 'Чтение остановлено.';
  return 'Готов читать. Нажми «Слушать» или на любое предложение.';
}
export function playLabel(snap){
  if(snap.status==='playing'||snap.status==='loading')return 'Пауза';
  if(snap.status==='paused')return 'Продолжить';
  return 'Слушать';
}

/**
 * Applies the reader state to the page: current sentence (background, border, aria-current), current word,
 * play button, status line, message and automatic scrolling.
 */
export function applyReaderState(container,snap,{follow=true,idPrefix='pd3',sentences=null,scroll=true}={}){
  if(!container)return;
  const text=container.querySelector('[data-reader-text]');
  if(text){
    const active=snap.status==='idle'&&snap.index===0&&snap.word<0?null:snap.index;
    const current=text.querySelector('.pd3-sent[aria-current]');
    if(current&&Number(current.dataset.pos)!==active){current.removeAttribute('aria-current');current.classList.remove('is-current');}
    let sentence=null;
    if(active!==null){
      sentence=text.querySelector(`.pd3-sent[data-pos="${active}"]`);
      if(sentence&&!sentence.hasAttribute('aria-current')){
        sentence.setAttribute('aria-current','true');sentence.classList.add('is-current');
        if(follow&&scroll&&['playing','loading'].includes(snap.status))scrollToSentence(sentence);
      }
    }
    for(const old of text.querySelectorAll('.pd3-w.is-word'))old.classList.remove('is-word');
    if(sentence&&snap.word>=0)sentence.querySelector(`.pd3-w[data-w="${snap.word}"]`)?.classList.add('is-word');
  }
  const play=container.querySelector(`#${idPrefix}-play`);
  if(play){
    const label=playLabel(snap);
    play.querySelector('.pd3-play-label').textContent=label;
    play.querySelector('.pd3-play-icon').innerHTML=['playing','loading'].includes(snap.status)?symbols.pause:symbols.play;
    play.disabled=snap.status==='manual';
  }
  const status=container.querySelector(`#${idPrefix}-status`),line=statusText(snap);
  if(status&&status.textContent!==line)status.textContent=line;
  const message=container.querySelector(`#${idPrefix}-message`);
  if(message){message.hidden=!snap.message;if(message.textContent!==snap.message)message.textContent=snap.message;}
  const now=container.querySelector(`#${idPrefix}-now`);
  if(now){
    const show=snap.status==='manual'&&sentences;
    now.hidden=!show;
    if(show)now.textContent=sentences[snap.index]?.da??sentences[snap.index]??'';
  }
}

function scrollToSentence(element){
  const rect=element.getBoundingClientRect(),height=globalThis.innerHeight||800;
  if(rect.top>=110&&rect.bottom<=height-190)return;
  element.scrollIntoView({block:'center',behavior:reducedMotion()?'auto':'smooth'});
}
