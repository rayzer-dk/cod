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
import {createHash} from 'node:crypto';
import fs from 'node:fs';
import vm from 'node:vm';
const headersOf=response=>Object.fromEntries(response.headers);
const hostedAssets=()=>{
 const {html,scriptHash}=createOfflineDocument(path.resolve('.'),{hosted:true});
 return {html,scriptHash,assets:{'/index.html':{type:'text/html; charset=utf-8',body:html,etag:'"h"',version:'1.9.6'},'/icon.svg':{type:'image/svg+xml',body:'<svg xmlns="http://www.w3.org/2000/svg"/>',etag:'"s"'},'/icon-192.png':{type:'image/png',body:'AAAA',binary:true,etag:'"p"'}}};
};
test('every response carries the protective headers, including errors and 304',async()=>{
 const {assets}=hostedAssets();
 const responses=[
  serveAsset(new Request('https://danskdag.example/'),assets),
  serveAsset(new Request('https://danskdag.example/icon-192.png'),assets),
  serveAsset(new Request('https://danskdag.example/missing'),assets),
  serveAsset(new Request('https://danskdag.example/api/release'),assets),
  serveAsset(new Request('https://danskdag.example/',{method:'POST'}),assets),
  serveAsset(new Request('https://danskdag.example/%E0%A4%A'),assets),
  serveAsset(new Request('https://danskdag.example/',{headers:{'if-none-match':'"h"'}}),assets)
 ];
 assert.deepEqual(responses.map(response=>response.status),[200,200,404,200,405,400,304]);
 for(const response of responses){
  const headers=headersOf(response);
  assert.equal(headers['x-content-type-options'],'nosniff');
  assert.equal(headers['referrer-policy'],'no-referrer');
  assert.equal(headers['x-frame-options'],'DENY');
  assert.equal(headers['permissions-policy'],'microphone=(self), camera=(), geolocation=()');
 }
});
test('the hosted page gets a script-hash Content-Security-Policy that matches its only inline script',()=>{
 const {html,scriptHash,assets}=hostedAssets();
 const scripts=[...html.matchAll(/<script>([\s\S]*?)<\/script>/g)];
 assert.equal(scripts.length,1);assert.doesNotMatch(html,/<script[^>]+src=/i);assert.doesNotMatch(html,/<script>[\s\S]*<script>/);
 const hash='sha256-'+createHash('sha256').update(scripts[0][1]).digest('base64');
 assert.equal(scriptHash,hash);
 assert.ok(html.includes(`<meta name="danskdag-script-sha256" content="${hash}">`));
 assert.doesNotMatch(html,/http-equiv="Content-Security-Policy"/);
 for(const method of ['GET','HEAD']){
  const csp=headersOf(serveAsset(new Request('https://danskdag.example/open',{method}),assets))['content-security-policy'];
  const directives=Object.fromEntries(csp.split('; ').map(part=>[part.split(' ')[0],part.split(' ').slice(1)]));
  assert.deepEqual(directives['default-src'],["'self'"]);
  assert.deepEqual(directives['script-src'],["'self'",`'${hash}'`]);
  assert.ok(directives['style-src'].includes("'unsafe-inline'"),'inline style attributes need it');
  assert.ok(!directives['script-src'].includes("'unsafe-inline'")&&!directives['script-src'].includes("'unsafe-eval'"));
  assert.deepEqual(directives['frame-ancestors'],["'none'"]);assert.deepEqual(directives['base-uri'],["'none'"]);
  assert.deepEqual(directives['form-action'],["'self'"]);assert.deepEqual(directives['connect-src'],["'self'"]);
  assert.deepEqual(directives['img-src'],["'self'",'data:','blob:']);assert.deepEqual(directives['media-src'],["'self'",'blob:']);
  assert.deepEqual(directives['object-src'],["'none'"]);
 }
 assert.equal(headersOf(serveAsset(new Request('https://danskdag.example/icon-192.png'),assets))['content-security-policy'],undefined);
 assert.match(headersOf(serveAsset(new Request('https://danskdag.example/icon.svg'),assets))['content-security-policy'],/default-src 'none'.*sandbox/);
});
test('the app needs nothing the policy forbids: no inline handlers, remote resources, eval or dynamic code',()=>{
 const {html}=hostedAssets();
 const markup=html.replace(/<script>[\s\S]*?<\/script>/,'').replace(/<style>[\s\S]*?<\/style>/,'');
 assert.doesNotMatch(markup,/\son[a-z]+\s*=/i);
 assert.doesNotMatch(markup,/(?:src|href)="https?:/i);
 const script=/<script>([\s\S]*?)<\/script>/.exec(html)[1];
 assert.doesNotMatch(script,/\beval\s*\(|new Function\s*\(|setTimeout\s*\(\s*['"`]/);
 assert.doesNotMatch(script,/fetch\(\s*['"`]https?:/);
});
test('a page without a build hash gets the other headers but no half-working script policy',()=>{
 const response=serveAsset(new Request('https://danskdag.example/'),{'/index.html':{type:'text/html',body:'<p>plain</p>',etag:'"x"'}});
 assert.equal(headersOf(response)['content-security-policy'],undefined);
 assert.equal(headersOf(response)['x-frame-options'],'DENY');
 const explicit=serveAsset(new Request('https://danskdag.example/'),{'/index.html':{type:'text/html',body:'<p>plain</p>',etag:'"x"',scriptHash:'sha256-'+'A'.repeat(43)+'='}});
 assert.match(headersOf(explicit)['content-security-policy'],/script-src 'self' 'sha256-A{43}='/);
});
test('the worker bundle still compiles as one scope with the site helpers',()=>{
 const moduleSource=file=>fs.readFileSync(file,'utf8').replace(/^import .*;\r?\n/gm,'').replace(/^export (?=(?:async )?(?:function|const|let|class))/gm,'');
 const source=moduleSource('dist/engine.mjs')+'\n'+moduleSource('worker/progress.mjs')+'\n'+moduleSource('worker/site.mjs')+'\nconst APP_ASSETS={};\nconst worker={async fetch(request,env){return serveAsset(request,APP_ASSETS);}};\n';
 assert.doesNotThrow(()=>new vm.Script(source,{filename:'worker.js'}));
});
