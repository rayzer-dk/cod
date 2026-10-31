import test from 'node:test';
import assert from 'node:assert/strict';
import path from 'node:path';
import {assetTypes,isBinary} from '../tools/asset-types.mjs';
import {serveAsset} from '../worker/site.mjs';
import {createOfflineDocument} from '../tools/build-offline.mjs';
import fs from 'node:fs';
import os from 'node:os';

function tinyWav(){
 const samples=80,data=Buffer.alloc(samples*2),head=Buffer.alloc(44);
 head.write('RIFF',0);head.writeUInt32LE(36+data.length,4);head.write('WAVEfmt ',8);head.writeUInt32LE(16,16);head.writeUInt16LE(1,20);head.writeUInt16LE(1,22);
 head.writeUInt32LE(8000,24);head.writeUInt32LE(16000,28);head.writeUInt16LE(2,32);head.writeUInt16LE(16,34);head.write('data',36);head.writeUInt32LE(data.length,40);
 for(let i=0;i<samples;i++)data.writeInt16LE(Math.round(Math.sin(i/3)*8000),i*2);
 return Buffer.concat([head,data]);
}

test('audio files have media types and are stored as binary for the hosted worker',async()=>{
 assert.equal(assetTypes['.mp3'],'audio/mpeg');assert.equal(assetTypes['.ogg'],'audio/ogg');assert.equal(assetTypes['.wav'],'audio/wav');
 for(const ext of ['.mp3','.ogg','.wav','.png'])assert.equal(isBinary(ext),true,ext);
 for(const ext of ['.mjs','.svg','.css','.html'])assert.equal(isBinary(ext),false,ext);
 const wav=tinyWav(),extension='.wav';
 const assets={'/audio/t.wav':{type:assetTypes[extension],body:wav.toString(isBinary(extension)?'base64':'utf8'),binary:isBinary(extension),etag:'"w"'}};
 const response=serveAsset(new Request('https://danskdag.example/audio/t.wav'),assets);
 assert.equal(response.status,200);assert.equal(response.headers.get('content-type'),'audio/wav');assert.equal(response.headers.get('x-content-type-options'),'nosniff');
 assert.deepEqual(Buffer.from(await response.arrayBuffer()),wav,'bytes survive the base64 round trip');
});

test('the standalone HTML builds without audio and does not embed audio files',()=>{
 const root=fs.mkdtempSync(path.join(os.tmpdir(),'danskdag-audio-'));
 try{
  fs.mkdirSync(path.join(root,'dist/audio'),{recursive:true});fs.writeFileSync(path.join(root,'package.json'),'{"version":"1.0.0"}');
  for(const name of ['styles.css','wordlab.css','memory.css','path.css','basics.css','pd3.css'])fs.writeFileSync(path.join(root,'dist',name),'');
  fs.writeFileSync(path.join(root,'dist','icon.svg'),'<svg xmlns="http://www.w3.org/2000/svg"/>');
  fs.writeFileSync(path.join(root,'dist','app.mjs'),'globalThis.ok=1;');
  const without=createOfflineDocument(root);
  fs.writeFileSync(path.join(root,'dist/audio/t.wav'),tinyWav());
  const withAudio=createOfflineDocument(root);
  assert.equal(without.html,withAudio.html,'audio files are ignored by the offline build');
  assert.doesNotMatch(withAudio.html,/data:audio|\.wav/);
  assert.match(withAudio.html,/media-src blob:/);
 }finally{fs.rmSync(root,{recursive:true,force:true});}
});
