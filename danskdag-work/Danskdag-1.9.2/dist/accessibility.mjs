// Focus keeping and announcements for a page that is redrawn with innerHTML.
const DATA_KEYS=['action','cardAction','id','value','pos','source','page','setting','letter','text','referenceCategory'];
// Groups whose members are interchangeable: when the exact control disappears, a neighbour inside the group takes the focus.
const GROUPS=['.answer-zone','.token-bank','.answer-options','.mode-switch','.filter-tabs','.reference-pager','.dialog-actions'];
export const FOCUSABLE='button,input,textarea,select,a[href],audio[controls],summary,[tabindex]:not([tabindex="-1"])';

const kebab=name=>name.replace(/[A-Z]/g,letter=>'-'+letter.toLowerCase());
const escapeCss=value=>globalThis.CSS?.escape ? CSS.escape(value) : String(value).replace(/[^\w-]/g,char=>'\\'+char);
const escapeAttr=value=>String(value).replace(/\\/g,'\\\\').replace(/"/g,'\\"').replace(/\n/g,'\\a ');

/** A stable description of a control that survives a redraw: its id, or its data-* identity. */
export function describeFocus(el) {
  if(!el || !el.tagName || typeof el.getAttribute!=='function')return null;
  const tag=el.tagName.toLowerCase();
  if(tag==='body' || tag==='html')return null;
  if(el.id)return {tag,id:el.id};
  const data={};
  for(const key of DATA_KEYS)if(el.dataset && el.dataset[key]!==undefined)data[key]=String(el.dataset[key]);
  return Object.keys(data).length ? {tag,data} : null;
}
export function selectorFor(key) {
  if(!key)return '';
  if(key.id)return '#'+escapeCss(key.id);
  return key.tag+Object.entries(key.data).map(([name,value])=>`[data-${kebab(name)}="${escapeAttr(value)}"]`).join('');
}
const usable=el=>!!el && !el.disabled && !(el.closest && el.closest('[hidden],[inert]'));

/** Chooses what should receive focus after a redraw. `matches` are all elements with the saved identity. */
export function pickFocusTarget({matches=[],nth=0,neighbours=[],neighbourIndex=0}) {
  const direct=matches.filter(usable);
  if(direct.length)return matches[nth] && usable(matches[nth]) ? matches[nth] : direct[0];
  const near=neighbours.filter(usable);
  return near.length ? near[Math.min(neighbourIndex,near.length-1)] : null;
}

/** Remembers the focused control inside `root`, if any. */
export function captureFocus(root,active=globalThis.document?.activeElement) {
  if(!root || !active || !root.contains(active))return null;
  const key=describeFocus(active);
  if(!key)return null;
  const selector=selectorFor(key),same=[...root.querySelectorAll(selector)];
  const saved={selector,nth:Math.max(0,same.indexOf(active))};
  const kind=el=>el.dataset?.action;
  for(const group of GROUPS) {
    const container=active.closest(group);
    if(container){
      // Neighbours of the same kind (other tokens, other options) are the natural place to continue.
      saved.group=group;saved.groupNth=[...root.querySelectorAll(group)].indexOf(container);
      if(kind(active))saved.action=kind(active);
      const peers=[...container.querySelectorAll(FOCUSABLE)].filter(el=>!el.disabled && (!saved.action || kind(el)===saved.action));
      saved.neighbourIndex=Math.max(0,peers.indexOf(active));
      break;
    }
  }
  if(typeof active.selectionStart==='number'){saved.selection=[active.selectionStart,active.selectionEnd ?? active.selectionStart];}
  return saved;
}

/** Puts focus back after a redraw. Returns the element that took it, or null. */
export function restoreFocus(root,saved) {
  if(!root || !saved)return null;
  let neighbours=[];
  if(saved.group){
    const container=[...root.querySelectorAll(saved.group)][Math.max(0,saved.groupNth)];
    neighbours=container ? [...container.querySelectorAll(FOCUSABLE)].filter(el=>!saved.action || el.dataset?.action===saved.action) : [];
  }
  const target=pickFocusTarget({matches:[...root.querySelectorAll(saved.selector)],nth:saved.nth,neighbours,neighbourIndex:Math.max(0,saved.neighbourIndex ?? 0)});
  if(!target)return null;
  target.focus({preventScroll:true});
  if(saved.selection && typeof target.setSelectionRange==='function')try{target.setSelectionRange(...saved.selection);}catch { /* Not a text field. */ }
  return target;
}

/** Moves keyboard and screen reader position to the start of new content (a page change). */
export function focusPageStart(content,headingSelector='h1') {
  if(!content)return null;
  const target=content.querySelector(headingSelector) || content;
  if(!target.hasAttribute('tabindex'))target.setAttribute('tabindex','-1');
  target.focus({preventScroll:true});
  return target;
}

export function pageTitle(sectionName,appName='Danskdag') {
  return sectionName ? `${appName} — ${sectionName}` : appName;
}

/** A permanent polite live region: its content is replaced, so each message is read out even though the page is redrawn. */
export function createAnnouncer(doc=globalThis.document) {
  let region=null,timer=null;
  const ensure=()=>{
    if(region?.isConnected)return region;
    region=doc.createElement('div');
    region.id='live-announcer';region.className='sr-only';region.setAttribute('role','status');region.setAttribute('aria-live','polite');region.setAttribute('aria-atomic','true');
    doc.body.append(region);return region;
  };
  return {
    say(text) {
      const element=ensure();
      element.textContent='';
      clearTimeout(timer);
      // A short pause makes screen readers treat the new text as a change even if it equals the previous message.
      timer=setTimeout(()=>{element.textContent=String(text||'').replace(/\s+/g,' ').trim();},60);
    },
    clear() {clearTimeout(timer);if(region)region.textContent='';}
  };
}

export function debounce(fn,wait,schedule=setTimeout,cancel=clearTimeout) {
  let timer=null;
  const run=(...args)=>{cancel(timer);timer=schedule(()=>{timer=null;fn(...args);},wait);};
  run.cancel=()=>{cancel(timer);timer=null;};
  run.pending=()=>timer!==null;
  run.flush=(...args)=>{if(timer!==null){cancel(timer);timer=null;fn(...args);}};
  return run;
}
