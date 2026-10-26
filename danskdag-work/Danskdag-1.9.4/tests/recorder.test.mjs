import test from 'node:test';
import assert from 'node:assert/strict';
import {createRecorder} from '../dist/recorder.mjs';

function fixture(getMedia,extra={}){
 const tracks=[{stopped:false,stop(){this.stopped=true;}}],stream={getTracks:()=>tracks},revoked=[];
 let latest,timer;const delays=[];
 class Recorder{
  state='inactive';mimeType='audio/webm';
  constructor(){latest=this;}
  start(){this.state='recording';}
  stop(){this.state='inactive';this.ondataavailable?.({data:new Blob(['voice'])});this.onstop?.();}
 }
 const recorder=createRecorder({getMedia:getMedia||(()=>Promise.resolve(stream)),Recorder,urls:{createObjectURL:()=> 'blob:recording',revokeObjectURL:u=>revoked.push(u)},setTimer:(f,ms)=>{timer=f;delays.push(ms);return 1;},clearTimer:()=>{timer=null;},...extra});
 return {delays,recorder,tracks,stream,revoked,finish:()=>timer?.(),fail:()=>latest.onerror?.()};
}
test('recording stops tracks, plays locally, and clear revokes its URL',async()=>{
 const f=fixture();await f.recorder.start();assert.equal(f.recorder.snapshot().phase,'recording');
 f.recorder.stop();assert.equal(f.recorder.snapshot().url,'blob:recording');assert.ok(f.tracks[0].stopped);
 f.recorder.clear();assert.deepEqual(f.revoked,['blob:recording']);assert.equal(f.recorder.snapshot().phase,'idle');
});
test('late microphone permission after closing cannot start a recording',async()=>{
 let resolve;const f=fixture(()=>new Promise(r=>resolve=r));const pending=f.recorder.start();f.recorder.clear();resolve(f.stream);await pending;
 assert.ok(f.tracks[0].stopped);assert.equal(f.recorder.snapshot().phase,'idle');
});
test('time limit and recorder errors release the microphone',async()=>{
 const f=fixture();await f.recorder.start();f.finish();assert.ok(f.tracks[0].stopped);assert.equal(f.recorder.snapshot().phase,'ready');
 const e=fixture();await e.recorder.start();e.fail();assert.ok(e.tracks[0].stopped);assert.equal(e.recorder.snapshot().phase,'error');assert.equal(e.recorder.snapshot().url,'');
});
test('permission denial is recoverable and unsupported capture is explained',async()=>{
 const f=fixture(()=>Promise.reject(Object.assign(new Error(),{name:'NotAllowedError'})));await f.recorder.start();assert.match(f.recorder.snapshot().message,/доступ/i);
 const r=createRecorder({getMedia:null,Recorder:null});await r.start();assert.equal(r.snapshot().phase,'error');assert.match(r.snapshot().message,/браузер/i);
});

test('the recording limit defaults to 20 seconds and can be raised for a monologue, in memory only',async()=>{
 const normal=fixture();await normal.recorder.start();assert.deepEqual(normal.delays,[20000]);assert.match(normal.recorder.snapshot().message,/до 20 секунд/);
 const long=fixture(undefined,{maxSeconds:150});await long.recorder.start();assert.deepEqual(long.delays,[150000]);assert.match(long.recorder.snapshot().message,/150/);
 long.finish();assert.equal(long.recorder.snapshot().phase,'ready');long.recorder.clear();assert.deepEqual(long.revoked,['blob:recording']);
 for(const bad of [0,-5,NaN,'x']){const f=fixture(undefined,{maxSeconds:bad});await f.recorder.start();assert.deepEqual(f.delays,[20000]);}
});
