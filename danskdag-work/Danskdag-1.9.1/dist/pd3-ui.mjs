// Small HTML helpers shared by the PD3 views.
import {h,icon} from './ui.mjs';

export const clock=seconds=>{const s=Math.max(0,Math.ceil(seconds));return `${Math.floor(s/60)}:${String(s%60).padStart(2,'0')}`;};
/** Text with paragraph breaks (blank line) and line breaks (single newline) kept. */
export const paragraphs=(value,attrs='')=>String(value??'').split(/\n{2,}/).map(part=>`<p ${attrs}>${h(part).replace(/\n/g,'<br>')}</p>`).join('');
export const danish=(value,tag='span',cls='')=>`<${tag} class="${cls}" lang="da" data-audio-ready>${h(value)}</${tag}>`;
export const backButton=(label='К разделу PD3')=>`<button type="button" class="text-button pd3-back" data-action="pd3-open" data-value="hub">${icon('arrow')}<span>${label}</span></button>`;
export const pageHead=(title,text='')=>`<div class="page-heading"><div><h1>${h(title)}</h1>${text?`<p>${text}</p>`:''}</div></div>`;
export const progressLine=(entry,empty='Ещё не пройдено')=>entry?.attempts?`Лучший результат: ${entry.best}%`:empty;

export function toggleButtons(label,action,options,current){
  return `<div class="pd3-choice" role="group" aria-label="${h(label)}">${options.map(([value,text])=>`<button type="button" class="${String(current)===String(value)?'active':''}" data-action="${action}" data-value="${h(value)}" aria-pressed="${String(current)===String(value)}">${text}</button>`).join('')}</div>`;
}
export function checkbox(id,label,checked,attrs=''){
  return `<label class="pd3-check" for="${id}"><input type="checkbox" id="${id}" ${checked?'checked':''} ${attrs}><span>${label}</span></label>`;
}

/** One multiple-choice question. Radios keep the answer in `answers[key]`; after checking the right and chosen options are marked in words, not only colour. */
export function mcq(q,key,answers,{checked=false,lang='da'}={}){
  const chosen=answers[key],right=q.answer;
  return `<fieldset class="pd3-q ${checked?(chosen===right?'is-right':'is-wrong'):''}"><legend><span class="pd3-qn">${Number(key.split(':').at(-1))+1}.</span> <span lang="${lang}" data-audio-ready>${h(q.q)}</span></legend>${q.options.map((option,i)=>{
    const mark=checked?(i===right?` <b class="pd3-mark">${icon('check')} верно</b>`:i===chosen?' <b class="pd3-mark">не то</b>':''):'';
    return `<label class="pd3-option ${checked&&i===right?'is-right':''} ${checked&&i===chosen&&i!==right?'is-wrong':''}" for="pd3-${key.replace(':','-')}-${i}"><input type="radio" id="pd3-${key.replace(':','-')}-${i}" name="pd3-${key.replace(':','-')}" data-pd3-set="${key}" value="${i}" ${chosen===i?'checked':''} ${checked?'disabled':''}><span lang="da" data-audio-ready>${h(option)}</span>${mark}</label>`;
  }).join('')}${checked&&q.why?`<p class="pd3-why"><b>Почему:</b> ${h(q.why)}</p>`:''}</fieldset>`;
}

export const lettersBar=label=>`<div class="pd3-letters" role="group" aria-label="${h(label)}">${['æ','ø','å','Æ','Ø','Å'].map(letter=>`<button type="button" class="pd3-letter" data-action="pd3-letter" data-letter="${letter}" aria-label="${letter}" lang="da">${letter}</button>`).join('')}</div>`;

/** Self-assessment: one 1-5 radio row per criterion. */
export function selfAssessment(prefix,criteria,values){
  return `<div class="pd3-self">${criteria.map(c=>`<fieldset class="pd3-criterion"><legend>${h(c.title)}</legend><ul>${c.descriptors.map(d=>`<li>${h(d)}</li>`).join('')}</ul><div class="pd3-scale" role="radiogroup" aria-label="${h(c.title)}">${[1,2,3,4,5].map(n=>`<label class="pd3-scale-item" for="${prefix}-${c.id}-${n}"><input type="radio" id="${prefix}-${c.id}-${n}" name="${prefix}-${c.id}" data-pd3-self="${c.id}" value="${n}" ${values?.[c.id]===n?'checked':''}><span>${n}</span></label>`).join('')}</div></fieldset>`).join('')}<p class="field-note">Шкала: 1 — очень слабо, 5 — уверенно. Оценка только твоя, программа речь и текст не оценивает.</p></div>`;
}
