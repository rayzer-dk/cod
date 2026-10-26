import test from 'node:test';
import assert from 'node:assert/strict';
import path from 'node:path';
import {serveAsset} from '../worker/site.mjs';
import {createOfflineDocument} from '../tools/build-offline.mjs';
test('hosted entry embeds a coherent app release while keeping online features enabled',()=>{
 const html=createOfflineDocument(path.resolve('.'),{hosted:true}).html;
 assert.match(html,/data-offline="false"/);assert.doesNotMatch(html,/<script[^>]+src=|<link[^>]+rel="stylesheet"/i);
 assert.doesNotMatch(html,/connect-src 'none'/);assert.match(html,/rel="manifest"/);
 assert.match(createOfflineDocument(path.resolve('.')).html,/connect-src 'none'/);
});
test('fresh-entry URL uses the same app and version without another progress origin',async()=>{
 const assets={'/index.html':{type:'text/html',body:'current app',etag:'"v"',version:'1.7.3'}};
 for(const url of ['/','/open','/index.html']){
  const response=serveAsset(new Request('https://danskdag.example'+url),assets);
  assert.equal(response.status,200);assert.equal(await response.text(),'current app');assert.equal(response.headers.get('x-danskdag-version'),'1.7.3');
 }
});
