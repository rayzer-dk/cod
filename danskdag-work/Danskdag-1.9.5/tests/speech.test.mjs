import test from 'node:test';
import assert from 'node:assert/strict';
import * as speech from '../dist/speech.mjs';

const danish={default:false,lang:'da-DK',localService:true,name:'Dansk A',voiceURI:'da-a'};
const russian={default:true,lang:'ru-RU',localService:true,name:'Russian',voiceURI:'ru'};
const preferred={default:false,lang:'da-DK',localService:true,name:'Dansk B',voiceURI:'da-b'};

class SpeechEngine extends EventTarget {
 constructor(voices=[danish]){super();this.voices=voices;this.utterances=[];this.voiceListeners=new Set();}
 getVoices(){return this.voices;}
 speak(utterance){this.utterances.push(utterance);}
 cancel(){}
 addEventListener(type,listener,options){super.addEventListener(type,listener,options);if(type==='voiceschanged')this.voiceListeners.add(listener);}
 removeEventListener(type,listener,options){super.removeEventListener(type,listener,options);if(type==='voiceschanged')this.voiceListeners.delete(listener);}
 changeVoices(voices){this.voices=voices;this.dispatchEvent(new Event('voiceschanged'));}
}
function installEngine(t,voices=[danish]){
 const prior=globalThis.speechSynthesis,Utterance=globalThis.SpeechSynthesisUtterance;
 const engine=new SpeechEngine(voices);
 globalThis.speechSynthesis=engine;
 globalThis.SpeechSynthesisUtterance=class{constructor(text){this.text=text;}};
 t.after(()=>{speech.stopSpeech();globalThis.speechSynthesis=prior;globalThis.SpeechSynthesisUtterance=Utterance;});
 return engine;
}
function trackedTimers(t){
 t.mock.timers.enable({apis:['setTimeout']});
 const pending=new Set(),schedule=globalThis.setTimeout,clear=globalThis.clearTimeout;
 t.mock.method(globalThis,'setTimeout',(callback,delay,...args)=>{
  const timer=schedule(()=>{pending.delete(timer);callback(...args);},delay);
  pending.add(timer);return timer;
 });
 t.mock.method(globalThis,'clearTimeout',timer=>{pending.delete(timer);return clear(timer);});
 return pending;
}

test('speech reports preparation, actual start and completion',t=>{
 const engine=installEngine(t),states=[];
 assert.ok(speech.speak('Hej',1,()=>{},'',phase=>states.push(phase)));
 const [utterance]=engine.utterances;
 assert.deepEqual(states,['loading']);utterance.onstart();assert.deepEqual(states,['loading','speaking']);utterance.onend();assert.deepEqual(states,['loading','speaking','idle']);
});

test('replacing speech clears the old indicator and ignores delayed old events',t=>{
 const engine=installEngine(t),first=[],second=[];
 speech.speak('Hej',1,()=>{},'',phase=>first.push(phase));speech.speak('Tak',1,()=>{},'',phase=>second.push(phase));
 assert.deepEqual(first,['loading','idle']);engine.utterances[0].onstart();engine.utterances[0].onend();assert.deepEqual(second,['loading']);
 engine.utterances[1].onstart();engine.utterances[1].onend();assert.deepEqual(second,['loading','speaking','idle']);
});

test('first tap waits for Danish voices and speaks that same request when they arrive',t=>{
 const timers=trackedTimers(t);
 const engine=installEngine(t,[]),states=[],errors=[];
 // The app's earlier listener must see the request as active before it considers a settings render.
 const activeAtVoiceChange=[];
 engine.addEventListener('voiceschanged',()=>activeAtVoiceChange.push(speech.isSpeechActive()));
 assert.equal(speech.speak('Godmorgen',.7,m=>errors.push(m),'da-b',phase=>states.push(phase)),true);
 assert.deepEqual(states,['loading']);assert.deepEqual(errors,[]);assert.equal(speech.isSpeechActive(),true);
 assert.equal(engine.utterances.length,0);
 t.mock.timers.tick(1500);engine.changeVoices([russian,danish,preferred]);
 assert.deepEqual(activeAtVoiceChange,[true]);assert.equal(engine.utterances.length,1);
 const [utterance]=engine.utterances;
 assert.equal(utterance.text,'Godmorgen');assert.equal(utterance.voice,preferred);assert.equal(utterance.lang,'da-DK');assert.equal(utterance.rate,.7);
 assert.equal(engine.voiceListeners.size,1); // Only the app listener remains.
 engine.changeVoices([danish,preferred]);assert.equal(engine.utterances.length,1);
 utterance.onstart();t.mock.timers.tick(1000);assert.deepEqual(errors,[]);utterance.onend();
 assert.deepEqual(states,['loading','speaking','idle']);assert.equal(speech.isSpeechActive(),false);
 assert.equal(timers.size,0);
 t.mock.timers.tick(180000);assert.deepEqual(errors,[]);
});

test('a genuinely missing Danish voice fails after a bounded wait without using another language',t=>{
 const timers=trackedTimers(t);
 const engine=installEngine(t,[russian]),states=[],errors=[];
 assert.equal(speech.speak('Hej',1,m=>errors.push(m),'ru',phase=>states.push(phase)),true);
 engine.changeVoices([russian]);t.mock.timers.tick(1999);
 assert.deepEqual(states,['loading']);assert.deepEqual(errors,[]);assert.equal(engine.utterances.length,0);
 t.mock.timers.tick(1);
 assert.deepEqual(states,['loading','error']);assert.equal(errors.length,1);assert.match(errors[0],/Датский голос не найден/);
 assert.equal(speech.isSpeechActive(),false);assert.equal(engine.voiceListeners.size,0);assert.equal(timers.size,0);
 engine.changeVoices([danish]);t.mock.timers.tick(180000);
 assert.equal(engine.utterances.length,0);assert.equal(errors.length,1);
});

test('the readiness deadline rechecks voices even when the browser sends no event',t=>{
 t.mock.timers.enable({apis:['setTimeout']});
 const engine=installEngine(t,[]),errors=[];
 assert.equal(speech.speak('Tak',1,m=>errors.push(m)),true);
 engine.voices=[danish];t.mock.timers.tick(2000);
 assert.equal(engine.utterances.length,1);assert.equal(engine.utterances[0].text,'Tak');assert.deepEqual(errors,[]);
 assert.equal(engine.voiceListeners.size,0);
});

test('canceling during voice discovery removes its listener and prevents late playback or errors',t=>{
 const timers=trackedTimers(t);
 const engine=installEngine(t,[]),states=[],errors=[];
 assert.equal(speech.speak('Hej',1,m=>errors.push(m),'',phase=>states.push(phase)),true);
 assert.equal(engine.voiceListeners.size,1);
 const staleListener=[...engine.voiceListeners][0];
 speech.stopSpeech();assert.deepEqual(states,['loading','idle']);assert.equal(speech.isSpeechActive(),false);assert.equal(engine.voiceListeners.size,0);assert.equal(timers.size,0);
 engine.changeVoices([danish]);staleListener();t.mock.timers.tick(180000);
 assert.equal(engine.utterances.length,0);assert.deepEqual(errors,[]);assert.deepEqual(states,['loading','idle']);
});

test('a newer tap replaces a waiting request and only the latest text can play',t=>{
 const timers=trackedTimers(t);
 const engine=installEngine(t,[]),first=[],second=[],errors=[];
 speech.speak('Old text',1,m=>errors.push(m),'',phase=>first.push(phase));
 const staleListener=[...engine.voiceListeners][0];
 t.mock.timers.tick(1000);speech.speak('New text',.8,m=>errors.push(m),'',phase=>second.push(phase));
 assert.deepEqual(first,['loading','idle']);assert.equal(engine.voiceListeners.size,1);assert.equal(timers.size,1);
 engine.changeVoices([russian,danish]);staleListener();
 assert.equal(engine.utterances.length,1);assert.equal(engine.utterances[0].text,'New text');
 engine.utterances[0].onstart();t.mock.timers.tick(3000);
 assert.deepEqual(second,['loading','speaking']);assert.deepEqual(errors,[]);assert.equal(engine.voiceListeners.size,0);
});

test('canceling from the start callback cannot schedule another speech timer',t=>{
 const timers=trackedTimers(t),engine=installEngine(t),states=[];
 speech.speak('Hej',1,()=>{},'',phase=>{states.push(phase);if(phase==='speaking')speech.stopSpeech();});
 engine.utterances[0].onstart();
 assert.deepEqual(states,['loading','speaking','idle']);assert.equal(speech.isSpeechActive(),false);assert.equal(timers.size,0);
});

test('unsupported speech APIs return false and cannot leave pending work',t=>{
 t.mock.timers.enable({apis:['setTimeout']});
 installEngine(t);const states=[],errors=[];
 globalThis.speechSynthesis=undefined;
 assert.equal(speech.speak('Hej',1,m=>errors.push(m),'',phase=>states.push(phase)),false);
 assert.deepEqual(states,['error']);assert.equal(speech.isSpeechActive(),false);
 globalThis.speechSynthesis=new SpeechEngine();globalThis.SpeechSynthesisUtterance=undefined;
 assert.equal(speech.speak('Hej',1,m=>errors.push(m),'',phase=>states.push(phase)),false);
 assert.equal(speech.isSpeechActive(),false);t.mock.timers.tick(180000);assert.equal(errors.length,2);
});

test('synthesis failure ends with an error indication',t=>{
 const engine=installEngine(t),states=[],errors=[];
 engine.speak=()=>{throw Error('not available');};
 assert.equal(speech.speak('Hej',1,m=>errors.push(m),'',phase=>states.push(phase)),false);
 assert.deepEqual(states,['loading','error']);assert.equal(errors.length,1);
});

test('explicit cancellation and a silent engine cannot leave a loading indicator behind',t=>{
 t.mock.timers.enable({apis:['setTimeout']});
 const engine=installEngine(t),states=[],errors=[];
 speech.speak('Hej',1,m=>errors.push(m),'',phase=>states.push(phase));speech.stopSpeech();engine.utterances[0].onstart();assert.deepEqual(states,['loading','idle']);
 speech.speak('Tak',1,m=>errors.push(m),'',phase=>states.push(phase));t.mock.timers.tick(10000);assert.equal(states.at(-1),'error');assert.equal(errors.length,1);
});

test('preferred installed Danish voice is selected, with safe Danish fallback',t=>{
 const engine=installEngine(t,[russian,danish,preferred]);
 assert.ok(speech.speak('Hej',1,()=>{},'da-b'));assert.equal(engine.utterances[0].voice,preferred);assert.match(speech.voiceStatus('da-b'),/Dansk B/);
 speech.speak('Hej',.7,()=>{},'ru');assert.equal(engine.utterances[1].voice,danish);
});
