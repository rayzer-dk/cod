import {appLanguage} from './language.mjs';
import {findWord} from './text.mjs';
export const h = value => String(value ?? "").replace(/[&<>\"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const paths={
 link:'M10 13a5 5 0 0 0 7 0l4-4a5 5 0 0 0-7-7l-2 2 M14 11a5 5 0 0 0-7 0l-4 4a5 5 0 0 0 7 7l2-2',
 plus:'M12 4v16 M4 12h16',
 external:'M14 3h7v7 M21 3l-11 11 M10 3H3v18h18v-7',
 target:'M22 12a10 10 0 1 1-20 0 10 10 0 0 1 20 0 M17 12a5 5 0 1 1-10 0 5 5 0 0 1 10 0 M12 12h.01',
 grip:'M8 4h.01 M8 12h.01 M8 20h.01 M16 4h.01 M16 12h.01 M16 20h.01',
 brain:'M12 4q-6-5-8 1-5 1-2 7-3 6 3 6 1 6 7 2 6 4 7-2 6 0 3-6 3-6-2-7-2-6-8-1z M12 4v16 M5 7q3 0 3 3 M4 16q4-3 5 0 M19 7q-3 0-3 3 M20 16q-4-3-5 0',
 moon:'M21 13A9 9 0 1 1 11 3a7 7 0 0 0 10 10z',
 book:'M4 4h6a3 3 0 0 1 3 3v14a4 4 0 0 0-4-2H4z M20 4h-4a3 3 0 0 0-3 3 M13 21a4 4 0 0 1 4-2h3V4',
 repeat:'m17 2 4 4-4 4 M3 11V9a3 3 0 0 1 3-3h15 M7 22l-4-4 4-4 M21 13v2a3 3 0 0 1-3 3H3',
 cards:'M6 5h13a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2z M3 16V3h13 M10 10h7 M10 14h5',
 layers:'m12 3 10 5-10 5L2 8z M2 12l10 5 10-5 M2 16l10 5 10-5',
 chart:'M4 3v18h17 M8 16v-5 M13 16V6 M18 16v-8',
 gear:'M9 3h6l1 3 3 1 2 5-2 5-3 1-1 3H9l-1-3-3-1-2-5 2-5 3-1z M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0',
 flame:'M12 3s3 4 1 7c4-1 5-4 5-4s5 7 2 12-12 5-15 0S5 9 9 6c0 3 1 4 1 4s3-2 2-7z',
 bolt:'m13 2-9 12h7l-1 8 10-13h-7z',
 arrow:'M5 12h14 m-5-5 5 5-5 5',
 chevron:'m9 5 7 7-7 7',
 wave:'M7 12 4 7q-1-3 2-2l5 8 M11 13 7 4q0-3 2-1l5 9 M14 12l-2-9q1-3 2 0l3 9 M17 12V6q2-3 2 1v7q6-5 3 1l-3 7H9l-6-7q-1-4 2-2l3 3',
 coffee:'M4 8h13v9a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3z M17 9h2a3 3 0 0 1 0 6h-2 M7 3v2 M11 2v3 M15 3v2 M2 22h18',
 sun:'M16 12a4 4 0 1 1-8 0 4 4 0 0 1 8 0 M12 2v2 M12 20v2 M2 12h2 M20 12h2 M5 5l1 1 M18 18l1 1 M5 19l1-1 M18 6l1-1',
 map:'m3 5 6-2 6 2 6-2v16l-6 2-6-2-6 2z M9 3v16 M15 5v16',
 clock:'M22 12a10 10 0 1 1-20 0 10 10 0 0 1 20 0 M12 6v6l4 3',
 briefcase:'M3 7h18v14H3z M8 7V3h8v4 M3 12q9 5 18 0 M12 12v4',
 calendar:'M3 5h18v16H3z M7 2v6 M17 2v6 M3 10h18 M8 14h2 M14 14h2 M8 18h2',
 bag:'M5 7h14l2 15H3z M8 8V5a4 4 0 0 1 8 0v3',
 chat:'M21 11a9 9 0 0 1-9 9H5l-4 3 2-7A9 9 0 1 1 21 11 M7 9h10 M7 13h6',
 spark:'m12 2 3 7 7 3-7 3-3 7-3-7-7-3 7-3z',
 home:'m2 11 10-9 10 9 M5 9v13h14V9 M9 22v-8h6v8',
 check:'m5 12 4 4L20 5',
 sound:'M3 9h4l5-5v16l-5-5H3z M16 8q4 4 0 8 M19 4q8 8 0 16',
 bookmark:'M6 3h12v19l-6-4-6 4z',
 search:'M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0 m-2 6 6 6',
 close:'m6 6 12 12 M6 18 18 6',
 trophy:'M7 3h10v6a5 5 0 0 1-10 0z M7 5H3v3q0 5 5 5 M17 5h4v3q0 5-5 5 M12 14v7 M7 22h10',
 download:'M12 3v13 m-5-5 5 5 5-5 M3 16v6h18v-6',
 upload:'M12 17V4 m-5 5 5-5 5 5 M3 16v6h18v-6',
 leaf:'M20 3Q3 1 3 13q1 9 9 7 9-3 8-17z M5 19 16 8',
 info:'M22 12a10 10 0 1 1-20 0 10 10 0 0 1 20 0 M12 11v6 M12 7h.01',
 heart:'M12 21 3 12C-3 3 8-1 12 6c4-7 15-3 9 6z'
};
export const icon=(name,cls='')=>`<svg class="icon ${cls}" viewBox="0 0 24 24" aria-hidden="true"><path d="${paths[name]||paths.book}"/></svg>`;

export const plural=(n,forms)=>forms[n%100>=11&&n%100<=14?2:n%10===1?0:n%10>=2&&n%10<=4?1:2];
export const button=(text,action,kind="primary",attrs="")=>`<button class="btn ${kind}" data-action="${action}" ${attrs}>${text}</button>`;

export function highlightText(text,target){
 if(!target)return h(text);
 const match=findWord(text,target);
 return !match?h(text):`${h(text.slice(0,match.index))}<mark>${h(match.value)}</mark>${h(text.slice(match.index+match.value.length))}`;
}

export const pronounce=(text,label='Послушать',cls='inline-audio')=>`<button class="icon-button ${cls}" data-action="speak-text" data-text="${h(text)}" title="${h(label+': '+text)}" aria-label="${h(label+': '+text)}">${icon('sound')}</button>`;
function audioPhrase(text,content){return `<button type="button" class="spoken-unit audio-phrase" data-action="speak-text" data-text="${h(text)}" title="${h('Послушать: '+text)}" aria-label="${h('Послушать: '+text)}">${content}${icon('sound')}</button>`;}
export const spoken=text=>audioPhrase(text,`<span lang="da" data-audio-ready>${h(text)}</span>`);
export function teachingText(value){
 const text=String(value??''),pattern=/(?<![\p{L}\p{N}])[A-Za-zÆØÅæøå]+(?:[ ’'+/\-]+[A-Za-zÆØÅæøå]+)*(?![\p{L}\p{N}])/gu;
 let html='',offset=0;
 for(const match of text.matchAll(pattern)){
  html+=h(text.slice(offset,match.index));
  const phrase=match[0];
  const reduced=/['’]/.test(phrase)||/^['’]/.test(text.slice(match.index+phrase.length));
  html+=phrase.length>1&&!reduced&&!/^[A-Z\s/]+$/.test(phrase)?spoken(phrase):h(phrase);
  offset=match.index+phrase.length;
 }
 return html+h(text.slice(offset));
}
export function addDanishAudio(scope){
 if(appLanguage==='uk')for(const el of scope.querySelectorAll('[lang="ru"]'))el.lang='uk';
 for(const el of scope.querySelectorAll('[lang="da"]')){
  if(el.hasAttribute('data-audio-ready')||el.matches('input,textarea,select,button')||el.closest('button,summary,.exercise-prompt,.listening-prompt')||el.querySelector('[lang="da"],button,a,input,select,textarea')||el.nextElementSibling?.matches('[data-action="speak-text"],[data-action="speak"],[data-action="listen"]'))continue;
  const copy=el.cloneNode(true);for(const other of copy.querySelectorAll('[lang]:not([lang="da"])'))other.remove();const text=copy.textContent.trim();if(!text||text.includes('___'))continue;
  el.setAttribute('data-audio-ready','');const translations=[...el.querySelectorAll('[lang]:not([lang="da"])')].filter(child=>{const parent=child.parentElement.closest('[lang]:not([lang="da"])');return !parent||!el.contains(parent);}).map(child=>child.outerHTML).join('');
  el.innerHTML=audioPhrase(text,`<span class="audio-label">${copy.innerHTML}</span>`)+translations;
 }
}

export function themeToggle(theme){const dark=theme==='dark',label=dark?'Включить светлую тему':'Включить тёмную тему';return `<button class="icon-button theme-toggle" data-action="toggle-theme" aria-pressed="${dark}" aria-label="${label}" title="${label}">${icon(dark?'sun':'moon')}</button>`;}
