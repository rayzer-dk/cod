import test from 'node:test';
import assert from 'node:assert/strict';
const module=await import('../dist/audio-feedback.mjs').catch(()=>({}));
function button(){
 const attrs=new Map([['title','Послушать: hej'],['aria-label','Послушать: hej']]),classes=new Set();
 return {dataset:{},classList:{add:c=>classes.add(c),remove:c=>classes.delete(c),contains:c=>classes.has(c)},getAttribute:k=>attrs.get(k)??null,setAttribute:(k,v)=>attrs.set(k,v),removeAttribute:k=>attrs.delete(k)};
}
test('feedback immediately acknowledges a tap and restores button accessibility after speech',()=>{
 assert.equal(typeof module.createAudioFeedback,'function');
 const btn=button(),states=[],feedback=module.createAudioFeedback((...args)=>states.push(args)),update=feedback.begin(btn,'hej');
 assert.ok(btn.classList.contains('audio-pressed'));update('loading');assert.equal(btn.dataset.audioState,'loading');assert.equal(btn.getAttribute('aria-busy'),'true');
 update('speaking');assert.equal(btn.dataset.audioState,'speaking');assert.match(btn.getAttribute('aria-label'),/Звучит/);
 update('idle');assert.equal(btn.dataset.audioState,undefined);assert.equal(btn.getAttribute('title'),'Послушать: hej');assert.equal(btn.getAttribute('aria-busy'),null);assert.equal(states.at(-1)[0],'idle');
});
test('delayed completion on the same button cannot erase a newer playback indicator',()=>{
 assert.equal(typeof module.createAudioFeedback,'function');
 const btn=button(),feedback=module.createAudioFeedback(),first=feedback.begin(btn,'hej');first('speaking');
 const second=feedback.begin(btn,'hej');second('loading');first('idle');assert.equal(btn.dataset.audioState,'loading');second('idle');assert.equal(btn.getAttribute('aria-label'),'Послушать: hej');assert.equal(btn.getAttribute('aria-busy'),null);
});
test('opening a dialog clears every pending tap and playback indication on background controls',()=>{
 const first=button(),second=button(),feedback=module.createAudioFeedback();
 const stale=feedback.begin(first,'hej');stale('speaking');feedback.begin(second,'tak')('error');
 assert.equal(typeof feedback.clear,'function');feedback.clear();stale('speaking');
 for(const btn of [first,second]){assert.equal(btn.classList.contains('audio-pressed'),false);assert.equal(btn.dataset.audioState,undefined);assert.equal(btn.getAttribute('aria-busy'),null);assert.equal(btn.getAttribute('title'),'Послушать: hej');}
});
test('tap feedback lasts 500 milliseconds even when speech ends immediately',()=>{
 const originalSet=globalThis.setTimeout,originalClear=globalThis.clearTimeout,timers=new Map();let now=0,id=0;
 globalThis.setTimeout=(fn,delay)=>{timers.set(++id,{fn,due:now+delay});return id;};globalThis.clearTimeout=key=>timers.delete(key);
 const tick=ms=>{now+=ms;for(const [key,timer]of [...timers])if(timer.due<=now){timers.delete(key);timer.fn();}};
 try{const control=button(),feedback=module.createAudioFeedback();feedback.begin(control,'hej')('idle');tick(499);assert.equal(control.classList.contains('audio-pressed'),true);tick(1);assert.equal(control.classList.contains('audio-pressed'),false);}
 finally{globalThis.setTimeout=originalSet;globalThis.clearTimeout=originalClear;}
});
