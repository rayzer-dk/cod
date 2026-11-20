import {h,icon,pronounce,spoken} from './ui.mjs';

export function referenceEntry(da,ru,body,{badge='',tone='',audio=da}={}){
 return `<article class="reference-entry ${h(tone)}"><details class="reference-disclosure"><summary><span class="entry-heading"><b lang="da" data-audio-ready>${h(da)}</b>${badge?`<small>${h(badge)}</small>`:''}</span><span class="entry-translation">${h(ru)}</span>${icon('chevron')}</summary><div class="entry-body">${body}</div></details><div class="entry-audio">${pronounce(audio)}</div></article>`;
}
export function referenceExample(da,ru){return `<div class="word-example"><p>${spoken(da)}</p><small>${h(ru)}</small></div>`;}
