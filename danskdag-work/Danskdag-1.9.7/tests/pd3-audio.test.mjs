import test from 'node:test';
import assert from 'node:assert/strict';
import {createReader,tokenizeWords,wordAtChar,estimateSchedule,wordAtTime,nextCalibration} from '../dist/pd3-audio.mjs';
import {speak,stopSpeech,isSpeechActive} from '../dist/speech.mjs';

const danish={default:false,lang:'da-DK',localService:true,name:'Dansk A',voiceURI:'da-a'};
const russian={default:true,lang:'ru-RU',localService:true,name:'Russian',voiceURI:'ru'};

class Engine extends EventTarget{
 constructor(voices=[danish]){super();this.voices=voices;this.spoken=[];this.cancelled=0;}
 getVoices(){return this.voices;}
 speak(utterance){this.spoken.push(utterance);}
 cancel(){this.cancelled++;}
 setVoices(voices){this.voices=voices;this.dispatchEvent(new Event('voiceschanged'));}
 get last(){return this.spoken.at(-1);}
}
class Utterance{constructor(text){this.text=text;}}

function clock(){
 let time=0,next=1;const timers=new Map();
 return {
  now:()=>time,
  setTimer:(fn,ms)=>{const id=next++;timers.set(id,{at:time+ms,fn});return id;},
  clearTimer:id=>timers.delete(id),
  tick(ms){
   const end=time+ms;
   for(;;){
    const due=[...timers.entries()].filter(([,t])=>t.at<=end).sort((a,b)=>a[1].at-b[1].at)[0];
    if(!due)break;
    timers.delete(due[0]);time=Math.max(time,due[1].at);due[1].fn();
   }
   time=end;
  },
  pending:()=>timers.size
 };
}
const flush=()=>new Promise(resolve=>setImmediate(resolve));
function setup(t,{sentences=['Jeg bor i København.','Det er en stor by, og jeg kan lide den.','Vi ses i morgen!'],voices=[danish],...rest}={}){
 const engine=new Engine(voices),c=clock(),states=[];
 const reader=createReader({sentences,synthesis:engine,Utterance,now:c.now,setTimer:c.setTimer,clearTimer:c.clearTimer,restartDelay:0,onChange:s=>states.push(s),...rest});
 t.after(()=>{reader.destroy();stopSpeech();});
 return {engine,c,states,reader,sentences};
}

test('tokenizeWords and wordAtChar map characters to words',()=>{
 const words=tokenizeWords('Jeg bor i København, men ikke i by-en.');
 assert.deepEqual(words.map(w=>w.text),['Jeg','bor','i','København','men','ikke','i','by-en']);
 assert.equal(wordAtChar(words,0),0);assert.equal(wordAtChar(words,4),1);
 assert.equal(wordAtChar(words,words[3].start+3),3);
 assert.equal(wordAtChar(words,words[3].end),4,'a position in a gap belongs to the next word');
 assert.equal(wordAtChar(words,500),words.length-1);assert.equal(wordAtChar([],0),-1);
});

test('the estimate gives long words more time and scales with rate and calibration',()=>{
 const slow=estimateSchedule('Jeg bor i København',0.6),fast=estimateSchedule('Jeg bor i København',1.2);
 assert.ok(slow.total>fast.total*1.9);
 const normal=estimateSchedule('Jeg bor i København',1);
 assert.ok(normal.starts[3]-normal.starts[2]<normal.total-normal.starts[3],'København lasts longer than i');
 assert.ok(Math.abs(estimateSchedule('Jeg bor i København',1,2).total*2-normal.total)<1e-9);
 assert.equal(wordAtTime(normal,0),0);assert.equal(wordAtTime(normal,normal.total),3);
 const withComma=estimateSchedule('Ja, nu',1),without=estimateSchedule('Ja nu',1);
 assert.ok(withComma.total>without.total,'a comma adds a pause');
});

test('calibration follows the measured duration and ignores unusable samples',()=>{
 const text='Det er en stor by, og jeg kan lide den.',base=estimateSchedule(text,1).total;
 const slower=nextCalibration(1,text,1,base*2);
 assert.ok(slower<1&&slower>0.5);
 const faster=nextCalibration(1,text,1,base/2);
 assert.ok(faster>1);
 assert.equal(nextCalibration(1,'Ja',1,1),null,'too short to learn from');
 assert.equal(nextCalibration(1,text,1,0),null);
 assert.equal(nextCalibration(1,text,1,base*50),null,'implausible sample');
});

test('every sentence is its own utterance, spoken in order with the Danish voice and the chosen rate',async t=>{
 const {engine,reader,states,sentences}=setup(t,{rate:0.75,voiceUri:'da-a'});
 await reader.play(0);await flush();
 assert.equal(engine.spoken.length,1);
 assert.equal(engine.last.text,sentences[0]);assert.equal(engine.last.lang,'da-DK');assert.equal(engine.last.rate,0.75);assert.equal(engine.last.voice,danish);
 engine.last.onstart();assert.equal(reader.snapshot().status,'playing');
 engine.last.onend();assert.equal(engine.spoken.length,2);assert.equal(engine.last.text,sentences[1]);assert.equal(reader.snapshot().index,1);
 engine.last.onstart();engine.last.onend();
 assert.equal(engine.last.text,sentences[2]);engine.last.onstart();engine.last.onend();
 const end=reader.snapshot();assert.equal(end.status,'finished');assert.equal(end.word,-1);assert.equal(isSpeechActive(),false);
 assert.deepEqual([...new Set(states.map(s=>s.index))],[0,1,2]);
});

test('word highlighting follows boundary events and never starts the timing estimate',async t=>{
 const {engine,reader,c}=setup(t);
 await reader.play(0);await flush();
 const u=engine.last;u.onstart();
 u.onboundary({name:'word',charIndex:0,charLength:3});assert.equal(reader.snapshot().word,0);assert.equal(reader.snapshot().wordMode,'boundary');
 c.tick(100);u.onboundary({name:'word',charIndex:4,charLength:3});assert.equal(reader.snapshot().word,1);
 u.onboundary({name:'sentence',charIndex:0});assert.equal(reader.snapshot().word,1,'sentence boundaries are not words');
 c.tick(5000);assert.equal(reader.snapshot().wordMode,'boundary');
 u.onboundary({name:'word',charIndex:9,charLength:2});assert.equal(reader.snapshot().word,3);
 u.onend();assert.equal(reader.snapshot().word,-1);
});

test('without boundary events the words are timed by an estimate that starts after 700 ms',async t=>{
 const {engine,reader,c}=setup(t,{sentences:['Jeg bor i København og jeg elsker byen.']});
 await reader.play(0);await flush();
 const u=engine.last;u.onstart();
 c.tick(699);assert.equal(reader.snapshot().wordMode,'none');
 c.tick(2);assert.equal(reader.snapshot().wordMode,'estimate');
 const schedule=estimateSchedule(u.text,0.9),seen=[];
 let previous=reader.snapshot().word;
 for(let ms=0;ms<schedule.total*1000+200;ms+=50){c.tick(50);const word=reader.snapshot().word;if(word!==previous){seen.push(word);previous=word;}}
 assert.deepEqual(seen.at(-1),schedule.starts.length-1);
 assert.ok(seen.every((w,i)=>i===0||w>seen[i-1]),'words advance in order');
 // Each word is reached close to the time the model predicts.
 u.onend();assert.equal(reader.snapshot().word,-1);
});

test('a late boundary event takes over from the estimate and stops its timers',async t=>{
 const {engine,reader,c}=setup(t,{sentences:['Jeg bor i København og jeg elsker byen.']});
 await reader.play(0);await flush();
 const u=engine.last;u.onstart();c.tick(800);assert.equal(reader.snapshot().wordMode,'estimate');
 u.onboundary({name:'word',charIndex:0});assert.equal(reader.snapshot().wordMode,'boundary');assert.equal(reader.snapshot().word,0);
 c.tick(3000);assert.equal(reader.snapshot().word,0,'estimate timers no longer move the word');
});

test('the estimate is calibrated from the real duration of finished sentences',async t=>{
 const text='Det er en stor by, og jeg kan lide den.';
 const {engine,reader,c}=setup(t,{sentences:[text,text]});
 await reader.play(0);await flush();
 const predicted=estimateSchedule(text,0.9).total;
 engine.last.onstart();c.tick(predicted*2000);engine.last.onend();
 const calibration=reader.snapshot().calibration;
 assert.ok(calibration<1&&calibration>0.6,'a voice twice as slow lowers the speed model: '+calibration);
 engine.last.onstart();
 const second=estimateSchedule(text,0.9,calibration);
 assert.ok(second.total>predicted*1.3);
});

test('pause cancels the speech and resuming starts the current sentence again',async t=>{
 const {engine,reader}=setup(t);
 await reader.play(1);await flush();engine.last.onstart();
 const cancelled=engine.cancelled;
 reader.pause();
 assert.ok(engine.cancelled>cancelled);assert.equal(reader.snapshot().status,'paused');assert.equal(reader.snapshot().index,1);
 // The cancelled utterance may still report an end or error later: it must be ignored.
 const old=engine.last;old.onerror({error:'canceled'});old.onend();
 assert.equal(reader.snapshot().status,'paused');assert.equal(engine.spoken.length,1);
 await reader.play();await flush();
 assert.equal(engine.spoken.length,2);assert.equal(engine.last.text,old.text);assert.equal(reader.snapshot().index,1);
});

test('changing the speed while reading restarts the sentence at the new rate',async t=>{
 const {engine,reader}=setup(t);
 await reader.play(0);await flush();engine.last.onstart();
 reader.setRate(0.6);await flush();
 assert.equal(engine.spoken.length,2);assert.equal(engine.last.text,engine.spoken[0].text);assert.equal(engine.last.rate,0.6);assert.equal(reader.snapshot().rate,0.6);
 engine.spoken[0].onend();assert.equal(engine.spoken.length,2,'the replaced utterance cannot advance the reader');
 // While paused only the stored rate changes.
 reader.pause();reader.setRate(1);assert.equal(engine.spoken.length,2);
 await reader.play();await flush();assert.equal(engine.last.rate,1);
});

test('stop silences, resets to the start and releases the shared output',async t=>{
 const {engine,reader}=setup(t);
 await reader.play(2);await flush();engine.last.onstart();assert.equal(isSpeechActive(),true);
 reader.stop();
 const s=reader.snapshot();assert.equal(s.status,'idle');assert.equal(s.index,0);assert.equal(s.word,-1);assert.equal(isSpeechActive(),false);
 engine.spoken[0].onend();assert.equal(reader.snapshot().status,'idle');
});

test('next and previous restart reading when reading, and only move the marker otherwise',async t=>{
 const {engine,reader}=setup(t);
 await reader.next();assert.equal(reader.snapshot().index,1);assert.equal(engine.spoken.length,0);
 await reader.prev();await reader.prev();assert.equal(reader.snapshot().index,0);
 await reader.play(0);await flush();engine.last.onstart();
 await reader.next();await flush();assert.equal(engine.last.text,'Det er en stor by, og jeg kan lide den.');assert.equal(reader.snapshot().index,1);
 await reader.prev();await flush();assert.equal(engine.last.text,'Jeg bor i København.');
 await reader.seek(2);await flush();assert.equal(engine.last.text,'Vi ses i morgen!');
 reader.pause();await reader.seek(0,{play:false});assert.equal(reader.snapshot().index,0);assert.equal(reader.snapshot().status,'paused');
});

test('single-sentence mode stops after the sentence',async t=>{
 const {engine,reader}=setup(t);
 await reader.play(1,{onlyOne:true});await flush();engine.last.onstart();engine.last.onend();
 assert.equal(engine.spoken.length,1);assert.equal(reader.snapshot().status,'idle');assert.equal(reader.snapshot().index,1);
});

test('a pause between sentences is kept for dictation-style reading',async t=>{
 const {engine,reader,c}=setup(t,{gap:()=>1500});
 await reader.play(0);await flush();engine.last.onstart();engine.last.onend();
 assert.equal(engine.spoken.length,1);c.tick(1499);assert.equal(engine.spoken.length,1);c.tick(2);assert.equal(engine.spoken.length,2);
 reader.pause();c.tick(5000);assert.equal(engine.spoken.length,2);
});

test('without a Danish voice the reader switches to manual mode and explains it',async t=>{
 const {engine,reader,c}=setup(t,{voices:[russian],voiceTimeout:300});
 const done=reader.play(0);c.tick(0);
 await new Promise(r=>setTimeout(r,450));await done;
 const s=reader.snapshot();assert.equal(s.mode,'manual');assert.equal(s.status,'manual');assert.match(s.message,/Датский голос не найден/);
 assert.equal(engine.spoken.length,0);assert.equal(isSpeechActive(),false);
 await reader.seek(2);assert.equal(reader.snapshot().index,2);assert.equal(reader.snapshot().status,'manual');
 assert.equal(await reader.play(),false);
});

test('a Danish voice that arrives late starts the same request',async t=>{
 const {engine,reader}=setup(t,{voices:[]});
 const done=reader.play(0);
 assert.equal(reader.snapshot().status,'loading');
 engine.setVoices([russian,danish]);await done;await flush();
 assert.equal(engine.spoken.length,1);assert.equal(engine.last.voice,danish);
});

test('a missing speech API means manual mode from the start',t=>{
 const states=[];
 const reader=createReader({sentences:['Hej.'],synthesis:undefined,Utterance:undefined,onChange:s=>states.push(s)});
 t.after(()=>reader.destroy());
 assert.equal(reader.snapshot().mode,'manual');assert.equal(reader.snapshot().status,'manual');
});

test('engine errors stop the reader with a message, cancelled utterances do not',async t=>{
 const {engine,reader,c}=setup(t);
 await reader.play(0);await flush();engine.last.onstart();
 engine.last.onerror({error:'interrupted'});assert.equal(reader.snapshot().status,'playing');
 engine.last.onerror({error:'synthesis-failed'});
 assert.equal(reader.snapshot().status,'error');assert.match(reader.snapshot().message,/Озвучка остановилась/);assert.equal(isSpeechActive(),false);
 await reader.play();await flush();
 c.tick(10001);assert.equal(reader.snapshot().status,'error');assert.match(reader.snapshot().message,/Озвучка не началась/);
});

test('an engine that never reports the end does not hang the reader',async t=>{
 const {engine,reader,c}=setup(t,{sentences:['Hej med dig.','Farvel.']});
 await reader.play(0);await flush();engine.last.onstart();
 c.tick(60000);
 assert.equal(engine.spoken.length,2,'moved on after the watchdog');
});

test('an engine without start events still highlights from the first boundary',async t=>{
 const {engine,reader}=setup(t);
 await reader.play(0);await flush();
 engine.last.onboundary({name:'word',charIndex:4});
 assert.equal(reader.snapshot().status,'playing');assert.equal(reader.snapshot().word,1);
 engine.last.onend();assert.equal(engine.spoken.length,2);
});

test('only one sound at a time: speak() stops the reader and the reader stops speak()',async t=>{
 const engine=new Engine([danish]),c=clock(),states=[];
 globalThis.speechSynthesis=engine;globalThis.SpeechSynthesisUtterance=Utterance;
 t.after(()=>{stopSpeech();delete globalThis.speechSynthesis;delete globalThis.SpeechSynthesisUtterance;});
 const reader=createReader({sentences:['Hej.','Tak.'],synthesis:engine,Utterance,now:c.now,setTimer:c.setTimer,clearTimer:c.clearTimer,restartDelay:0,onChange:s=>states.push(s)});
 t.after(()=>reader.destroy());
 await reader.play(0);await flush();engine.last.onstart();assert.equal(reader.snapshot().status,'playing');
 speak('Farvel',1,()=>{},'',()=>{});
 assert.equal(reader.snapshot().status,'idle','speak() preempts the reader');
 engine.spoken[0].onend();assert.equal(engine.spoken.length,2,'a preempted utterance cannot continue');
 const spoken=engine.spoken.length;
 const stateOfSpeak=[];speak('Tak',1,()=>{},'',p=>stateOfSpeak.push(p));
 await reader.play(0);await flush();
 assert.ok(stateOfSpeak.includes('idle'),'the reader claim stops the single utterance');
 assert.ok(engine.spoken.length>spoken);
 stopSpeech();assert.equal(reader.snapshot().status,'idle');assert.equal(isSpeechActive(),false);
});

class FakeAudio extends EventTarget{
 constructor(src){super();this.src=src;this.currentTime=0;this.playbackRate=1;this.paused=true;this.calls=[];}
 async play(){this.paused=false;this.calls.push('play');}
 pause(){this.paused=true;this.calls.push('pause');}
 at(time){this.currentTime=time;this.dispatchEvent(new Event('timeupdate'));}
}
test('recorded audio is highlighted from timeupdate and seeks by sentence marks',async t=>{
 const audio={src:'/audio/text.mp3',marks:[{s:0,e:2},{s:2.5,e:6},{s:6.5,e:9}]},made=[];
 const {reader,states}=setup(t,{audio,createAudio:src=>{const el=new FakeAudio(src);made.push(el);return el;}});
 assert.equal(reader.snapshot().mode,'audio');
 await reader.play(1);
 const el=made[0];assert.equal(el.currentTime,2.5);assert.equal(el.playbackRate,0.9);assert.equal(reader.snapshot().status,'playing');
 el.at(3);assert.equal(reader.snapshot().index,1);
 el.at(6.2);assert.equal(reader.snapshot().index,1,'inside a gap the previous sentence stays marked');
 el.at(7);assert.equal(reader.snapshot().index,2);assert.equal(reader.snapshot().wordMode,'estimate');
 reader.pause();assert.ok(el.paused);assert.equal(reader.snapshot().status,'paused');
 await reader.play();assert.equal(el.currentTime,7,'audio resumes where it stopped');
 reader.setRate(0.6);assert.equal(el.playbackRate,0.6);
 el.dispatchEvent(new Event('ended'));assert.equal(reader.snapshot().status,'finished');
 assert.ok(states.length>3);
});

test('a recorded file that cannot be loaded falls back to the device voice',async t=>{
 const audio={src:'/audio/missing.mp3',marks:[{s:0,e:2},{s:2.5,e:6},{s:6.5,e:9}]},made=[];
 const {engine,reader}=setup(t,{audio,createAudio:src=>{const el=new FakeAudio(src);made.push(el);return el;}});
 await reader.play(1);
 made[0].dispatchEvent(new Event('error'));await flush();await flush();
 assert.equal(reader.snapshot().mode,'speech');assert.match(reader.snapshot().message,/Записанный звук недоступен/);
 assert.equal(engine.last.text,'Det er en stor by, og jeg kan lide den.');
});

test('marks that do not match the sentences are ignored',t=>{
 const {reader}=setup(t,{audio:{src:'/a.mp3',marks:[{s:0,e:1}]}});
 assert.equal(reader.snapshot().mode,'speech');
});
