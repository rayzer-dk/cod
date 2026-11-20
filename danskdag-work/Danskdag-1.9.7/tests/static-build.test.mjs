import test from 'node:test';
import assert from 'node:assert/strict';
import vm from 'node:vm';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import {createHash,webcrypto} from 'node:crypto';
import {inflateRawSync} from 'node:zlib';
import {buildStaticSite,staticManifest,createZip,crc32,STATIC_FILES,PRECACHED} from '../tools/build-static.mjs';
import {makeServiceWorker} from '../tools/build-pwa.mjs';
import {createOfflineDocument} from '../tools/build-offline.mjs';
import {isStaticEdition,offlineCacheMessage} from '../dist/runtime.mjs';
import {requestWorkerUpdate,cachedPageIsCurrent} from '../dist/app-updates.mjs';
import {cloudSettings,cloudMessage} from '../dist/continuity-view.mjs';
import {renderView} from '../dist/views.mjs';
import {createState} from '../dist/engine.mjs';

const root=path.resolve('.'),version=JSON.parse(fs.readFileSync('package.json','utf8')).version;
const sha=data=>createHash('sha256').update(data).digest('hex');
const pages=new Set(['learn','grammar','dictionary','review','progress','forms','conversation','wordlab','basics','pronunciation','pd3','settings']);
const temp=fs.mkdtempSync(path.join(os.tmpdir(),'danskdag-static-'));
test.after(()=>fs.rmSync(temp,{recursive:true,force:true}));
const built=buildStaticSite(root,{outDir:path.join(temp,'site'),zipPath:path.join(temp,`Danskdag-static-${version}.zip`)});
const read=name=>fs.readFileSync(path.join(built.directory,name));

test('the static folder holds exactly the planned files and the archive is named after the package version',()=>{
 assert.deepEqual(fs.readdirSync(built.directory).sort(),[...STATIC_FILES].sort());
 for(const name of ['index.html','service-worker.js','manifest.webmanifest','icon.svg','icon-192.png','icon-512.png','flag-dk.svg','_headers','.nojekyll','DEPLOY.md'])assert.ok(fs.existsSync(path.join(built.directory,name)),name);
 assert.equal(read('.nojekyll').length,0);assert.equal(path.basename(built.archive),`Danskdag-static-${version}.zip`);
 assert.equal(JSON.parse(fs.readFileSync('package.json','utf8'))['scripts']['build:static'],'node tools/build-static.mjs');
});

test('the archive is a valid ZIP with the same files, names and bytes as the folder',()=>{
 const zip=fs.readFileSync(built.archive),end=zip.lastIndexOf(Buffer.from([0x50,0x4b,0x05,0x06]));
 assert.ok(end>=0);const count=zip.readUInt16LE(end+10);let at=zip.readUInt32LE(end+16);const seen=[];
 for(let i=0;i<count;i++){
  assert.equal(zip.readUInt32LE(at),0x02014b50);
  const method=zip.readUInt16LE(at+10),crc=zip.readUInt32LE(at+16),size=zip.readUInt32LE(at+20),length=zip.readUInt32LE(at+24),nameLength=zip.readUInt16LE(at+28),extra=zip.readUInt16LE(at+30),comment=zip.readUInt16LE(at+32),local=zip.readUInt32LE(at+42);
  const name=zip.subarray(at+46,at+46+nameLength).toString('utf8'),headerEnd=local+30+zip.readUInt16LE(local+26)+zip.readUInt16LE(local+28);
  const packed=zip.subarray(headerEnd,headerEnd+size),data=method===8?inflateRawSync(packed):packed;
  assert.equal(data.length,length,name);assert.equal(crc32(data),crc,name);assert.ok(data.equals(read(name)),name);seen.push(name);
  at+=46+nameLength+extra+comment;
 }
 assert.deepEqual(seen.sort(),[...STATIC_FILES].sort());
 assert.ok(createZip([{name:'a.txt',data:Buffer.from('a')}]).length>22);
});

test('manifest starts at / and its launcher shortcuts use /#page, the pages of the application',()=>{
 const manifest=JSON.parse(read('manifest.webmanifest').toString('utf8'));
 assert.equal(manifest.start_url,'/');assert.equal(manifest.scope,'/');assert.equal(manifest.display,'standalone');assert.equal(manifest.id,'/');
 for(const size of ['192x192','512x512'])assert.ok(manifest.icons.some(icon=>icon.sizes===size&&icon.type==='image/png'),size);
 assert.ok(manifest.shortcuts.length>=3&&manifest.shortcuts.length<=4,'Android shows at most four');
 for(const shortcut of manifest.shortcuts){
  assert.ok(shortcut.name&&shortcut.short_name.length<=12,shortcut.name);
  const match=/^\/#([a-z0-9-]+)$/.exec(shortcut.url);assert.ok(match,shortcut.url);assert.ok(pages.has(match[1]),'unknown page '+match[1]);
 }
 assert.deepEqual(manifest.shortcuts.map(shortcut=>shortcut.url),['/#learn','/#review','/#pd3','/#dictionary']);
 assert.equal(new Set(manifest.shortcuts.map(s=>s.url)).size,manifest.shortcuts.length);
 assert.doesNotMatch(read('manifest.webmanifest').toString('utf8'),/\/open/);
 const source=JSON.parse(fs.readFileSync('dist/manifest.webmanifest','utf8'));
 assert.deepEqual(manifest.icons,source.icons);assert.equal(source.start_url,'/open','the Worker manifest is untouched');
 assert.throws(()=>staticManifest(JSON.stringify({start_url:'/elsewhere',shortcuts:[]})),/Unexpected/);
});

test('index.html is the self-contained app with cloud and account features switched off',()=>{
 const html=read('index.html').toString('utf8');
 assert.match(html,/<html lang="uk" data-offline="false" data-cloud="off">/);
 assert.match(html,/rel="manifest" href="\/manifest.webmanifest"/);
 assert.doesNotMatch(html,/<script[^>]+src=|<link[^>]+rel="stylesheet"/i);
 assert.equal((html.match(/<script(?:\s|>)/g)||[]).length,1);
 assert.doesNotMatch(html,/chatgpt\.site|agile-bard/,'no address of the platform deployment');
 assert.doesNotMatch(html,/danskdag-script-sha256/);
 assert.match(html,/<meta name="danskdag-version" content="[\d.]+">/);
});

test('the Content-Security-Policy tag allows exactly the one inline script and nothing remote',()=>{
 const html=read('index.html').toString('utf8'),scripts=[...html.matchAll(/<script>([\s\S]*?)<\/script>/g)];
 assert.equal(scripts.length,1);
 const hash='sha256-'+createHash('sha256').update(scripts[0][1]).digest('base64');
 assert.equal(built.scriptHash,hash);
 const csp=/<meta http-equiv="Content-Security-Policy" content="([^"]+)">/.exec(html)?.[1];assert.ok(csp);
 assert.ok(html.indexOf('http-equiv="Content-Security-Policy"')<html.indexOf('<script>'),'the policy precedes the script');
 const directives=Object.fromEntries(csp.split('; ').map(part=>[part.split(' ')[0],part.split(' ').slice(1)]));
 assert.deepEqual(directives['default-src'],["'self'"]);
 assert.deepEqual(directives['script-src'],["'self'",`'${hash}'`]);
 assert.deepEqual(directives['style-src'],["'self'","'unsafe-inline'"]);
 assert.deepEqual(directives['img-src'],["'self'",'data:','blob:']);
 assert.deepEqual(directives['media-src'],["'self'",'blob:']);
 assert.deepEqual(directives['connect-src'],["'self'"]);
 assert.deepEqual(directives['base-uri'],["'none'"]);assert.deepEqual(directives['form-action'],["'self'"]);assert.deepEqual(directives['object-src'],["'none'"]);
 assert.equal(directives['frame-ancestors'],undefined,'frame-ancestors is ignored in a meta tag; _headers sends X-Frame-Options');
 assert.doesNotMatch(csp,/unsafe-eval|https?:/);
});

test('with data-cloud off the page neither creates cloud sync nor asks /api/release, and the reload button stays off /open',()=>{
 assert.equal(isStaticEdition('https:','false','off'),true);
 assert.equal(isStaticEdition('https:','false',undefined),false,'the Worker page has no data-cloud');
 assert.equal(isStaticEdition('file:','false','off'),false,'a local HTML file stays the offline edition');
 assert.equal(isStaticEdition('https:','true','off'),false);
 const app=fs.readFileSync('dist/app.mjs','utf8');
 const creations=[...app.matchAll(/createCloudSync\(\{/g)];assert.equal(creations.length,1);
 assert.match(app,/if\(!offlineEdition&&!staticEdition\)cloud=createCloudSync\(/);
 const find=/async function findUpdate\(manual=false\)\{[\s\S]*?\n\}/.exec(app)[0];
 assert.ok(find.indexOf('if(staticEdition){')>0&&find.indexOf('if(staticEdition){')<find.indexOf('checkRelease(APP_VERSION)'),'the static branch returns before the release request');
 assert.match(find,/if\(staticEdition\)\{[^\n]*return;\}/);
 assert.match(app,/if\(!staticEdition\)void findUpdate\(\)/);
 assert.match(app,/if\(staticEdition\)location\.reload\(\);else\{const url=new URL\('\/open'/);
 assert.match(app,/prepareOfflineCache\(\(\)=>\{lastUpdateCheck=0;if\(staticEdition\)void offerWorkerUpdate\(\);else void findUpdate\(\);\}\)/);
});

test('asking for a worker update and comparing pages never use the network or the release endpoint',async()=>{
 const calls=[],stub={getRegistration:async scope=>{calls.push(['scope',scope]);return {update:async()=>{calls.push(['update']);},installing:null,waiting:null};}};
 const originalFetch=globalThis.fetch;globalThis.fetch=async url=>{throw Error('unexpected request '+url);};
 try{
  assert.equal(await requestWorkerUpdate(stub),'current');assert.deepEqual(calls,[['scope','/'],['update']]);
  assert.equal(await requestWorkerUpdate({getRegistration:async()=>({update:async()=>{},waiting:{}})}),'updating');
  assert.equal(await requestWorkerUpdate({getRegistration:async()=>null}),false);
  assert.equal(await requestWorkerUpdate({getRegistration:async()=>{throw Error('x');}}),false);
  assert.equal(await requestWorkerUpdate(undefined),false);
 }finally{globalThis.fetch=originalFetch;}
 const token='sha256-'+'A'.repeat(43)+'=',doc=content=>({querySelectorAll:()=>[{content}]});
 const cache=(text,old='previous release')=>({keys:async()=>['other-cache','danskdag-static-old','danskdag-static-new'],open:async name=>({match:async key=>{assert.equal(key,'/index.html');if(name==='danskdag-static-old')return new Response(old);return text===null?undefined:new Response(text);}})});
 assert.equal(await cachedPageIsCurrent(doc(`default-src 'self'; script-src 'self' '${token}'`),cache(`<meta content="script-src '${token}'"><body>`)),true,'already running the cached release');
 assert.equal(await cachedPageIsCurrent(doc(`script-src '${token}'`),cache(`script-src 'sha256-${'B'.repeat(43)}='`)),false,'a newer release is waiting');
 assert.equal(await cachedPageIsCurrent(doc(`script-src '${token}'`),cache(`script-src 'sha256-${'B'.repeat(43)}='`,`script-src '${token}'`)),false,'the previous cache, still present during activation, is ignored');
 assert.equal(await cachedPageIsCurrent(doc(`script-src '${token}'`),cache(null)),false);
 assert.equal(await cachedPageIsCurrent(doc('default-src none'),cache('x')),false);
});

test('settings show the local progress text and no account, sync, Sites or site link',()=>{
 assert.equal(cloudMessage({phase:'static'}),'Прогресс сохраняется в этом браузере. Для переноса выгрузи JSON в настройках.');
 const plan=cloudSettings({phase:'static'},null);
 assert.match(plan,/Прогресс сохраняется в этом браузере\. Для переноса выгрузи JSON в настройках\./);
 assert.doesNotMatch(plan,/cloud-retry|cloud-recovery|аккаунт|HTML-/);
 const state=createState(),html=renderView('settings',{state,staticEdition:true,offlineReady:true,cloudPlan:plan});
 assert.match(html,/Облачной синхронизации в этой версии нет/);assert.match(html,/JSON/);
 assert.doesNotMatch(html,/Sites|Синхронизация работает|Открыть сайт|Один HTML-файл|аккаунт|временно недоступна|noopener noreferrer/);
 assert.match(html,/data-offline-status/);assert.match(html,/Уроки и картинки сохранены для открытия без сети\./);
 assert.doesNotMatch(html,/Синхронизация и обновления требуют подключения/);
 assert.match(offlineCacheMessage(false,true),/HTTPS/);
 assert.match(fs.readFileSync('dist/views.mjs','utf8'),/\$\{c\.offlineEdition\|\|c\.staticEdition\?'Прогресс сохраняется в этом браузере\. Для переноса выгрузи JSON в настройках\.'/,'the home strip shows the local text');
 const worker=renderView('settings',{state,cloudPlan:cloudSettings({phase:'connecting'},null)});
 assert.match(worker,/Синхронизация работает в опубликованном приложении/);assert.match(worker,/Sites/);
});

function workerHarness(mode,{bodies,fetchImpl,timeout}={}){
 const handlers={},stores=new Map(),requests=[];
 const caches={keys:async()=>[...stores.keys()],delete:async key=>stores.delete(key),open:async key=>{if(!stores.has(key))stores.set(key,new Map());const map=stores.get(key);return {match:async p=>map.get(p)?.clone(),put:async(p,res)=>map.set(p,res.clone())};}};
 const self={location:{origin:'https://danskdag.example'},addEventListener:(key,fn)=>handlers[key]=fn,skipWaiting:async()=>{},clients:{claim:async()=>{}}};
 const source=makeServiceWorker(Object.fromEntries(Object.entries(bodies).map(([p,body])=>[p,sha(body)])),{mode,networkTimeoutMs:timeout||3000});
 const fetch=async(url,options={})=>{requests.push({path:new URL(url).pathname+new URL(url).search,options});return fetchImpl(new URL(url),options);};
 vm.runInNewContext(source,{self,caches,URL,Response,crypto:webcrypto,fetch,setTimeout,clearTimeout,AbortController,TextDecoder,DOMException});
 const run=async(event,data)=>{let pending;handlers[event]({waitUntil:p=>pending=p,...data});return pending;};
 const navigate=async(pathname,method='GET')=>{let pending;handlers.fetch({request:{url:self.location.origin+pathname,method},respondWith:p=>pending=p});return pending&&await pending;};
 return {source,handlers,stores,requests,run,navigate,self};
}
const app='<!doctype html><html><head><meta charset="UTF-8"><meta name="danskdag-version" content="9.9.9"></head><body>app</body></html>';
const html={headers:{'content-type':'text/html; charset=utf-8'}};

test('static worker precaches the same six files with SHA-256 checks and requests the entry page as /',async()=>{
 const bodies=Object.fromEntries(PRECACHED.map(name=>['/'+name,name==='index.html'?app:'content of '+name]));
 const harness=workerHarness('static',{bodies,fetchImpl:async url=>new Response(url.pathname==='/'?app:bodies[url.pathname],html)});
 assert.deepEqual(Object.keys(bodies).length,6);
 await harness.run('install');
 assert.deepEqual(harness.requests.map(r=>r.path).sort(),['/','/flag-dk.svg','/icon-192.png','/icon-512.png','/icon.svg','/manifest.webmanifest']);
 for(const request of harness.requests)assert.equal(request.options.cache,'reload');
 const cache=[...harness.stores.values()][0];assert.deepEqual([...cache.keys()].sort(),Object.keys(bodies).sort());
 assert.match([...harness.stores.keys()][0],/^danskdag-static-[0-9a-f]{20}$/);
 const tampered=workerHarness('static',{bodies,fetchImpl:async url=>new Response('modified by the host',html)});
 await assert.rejects(tampered.run('install'),/mismatch/i);assert.equal(tampered.stores.size,0,'a failed install leaves no cache');
});

test('static worker serves the network page without x-danskdag-version and falls back to the verified cache otherwise',async()=>{
 const fresh=app.replace('app','newer release'),bodies={'/index.html':app};
 let mode='fresh';
 const harness=workerHarness('static',{bodies,fetchImpl:async url=>{
  if(url.pathname==='/'&&mode==='fresh')return new Response(fresh,html);
  if(mode==='install')return new Response(app,html);
  if(mode==='offline')throw new TypeError('offline');
  if(mode==='404')return new Response(app,{status:404,...html});
  if(mode==='json')return new Response('{}',{headers:{'content-type':'application/json'}});
  if(mode==='portal')return new Response('<html><body>Sign in to the hotspot</body></html>',html);
  if(mode==='redirected'){const response=new Response(app,html);Object.defineProperty(response,'redirected',{value:true});return response;}
  return new Response(app,html);
 }});
 mode='install';await harness.run('install');await harness.run('activate');
 for(const pathname of ['/','/index.html','/open','/?v=1.9.6']){
  mode='fresh';harness.requests.length=0;
  assert.equal(await (await harness.navigate(pathname)).text(),fresh,pathname+' takes the network page');
  assert.equal(harness.requests.length,1);assert.equal(harness.requests[0].options.cache,'no-cache');assert.ok(harness.requests[0].options.signal);
  assert.equal(harness.requests[0].path,pathname==='/?v=1.9.6'?pathname:'/','the host is asked for / (it has no /open and may redirect /index.html)');
  for(mode of ['offline','404','json','portal','redirected'])assert.equal(await (await harness.navigate(pathname)).text(),app,`${pathname} falls back (${mode})`);
 }
 const cached=[...harness.stores.values()][0].get('/index.html');assert.equal(await cached.text(),app,'a network page never replaces the precached copy');
});

test('static worker leaves api calls, other methods and other origins alone and times out a hanging host',async()=>{
 const bodies={'/index.html':app,'/icon.svg':'icon'};
 const harness=workerHarness('static',{bodies,timeout:40,fetchImpl:(url,options)=>url.pathname==='/'&&harness.hang?new Promise((_,reject)=>options.signal.addEventListener('abort',()=>reject(new DOMException('aborted','AbortError')))):Promise.resolve(new Response(url.pathname==='/'?app:bodies[url.pathname],html))});
 await harness.run('install');
 for(const [url,method]of[['/api/progress','GET'],['/api/release','GET'],['/api/progress','POST'],['/private','GET'],['https://elsewhere.example/icon.svg','GET'],['/','POST']]){
  let intercepted=false;harness.handlers.fetch({request:{url:new URL(url,harness.self.location.origin).href,method},respondWith:()=>intercepted=true});assert.equal(intercepted,false,method+' '+url);
 }
 assert.equal(await (await harness.navigate('/icon.svg')).text(),'icon');
 harness.hang=true;const started=Date.now();
 assert.equal(await (await harness.navigate('/')).text(),app);const waited=Date.now()-started;assert.ok(waited>=30&&waited<1500,`waited ${waited} ms`);
 assert.match(makeServiceWorker({'/index.html':sha(app)},{mode:'static'}),/NETWORK_TIMEOUT=3000/);
});

test('worker mode is unchanged: it still requires x-danskdag-version, and unknown modes are refused',()=>{
 const manifest={'/index.html':sha(app)},source=makeServiceWorker(manifest);
 assert.equal(source,makeServiceWorker(manifest,{mode:'worker'}));
 assert.match(source,/x-danskdag-version/);assert.doesNotMatch(source,/isAppPage/);
 const staticSource=makeServiceWorker(manifest,{mode:'static'});
 assert.doesNotMatch(staticSource,/x-danskdag-version/);assert.notEqual(staticSource.match(/danskdag-static-[0-9a-f]{20}/)[0],source.match(/danskdag-static-[0-9a-f]{20}/)[0]);
 assert.throws(()=>makeServiceWorker(manifest,{mode:'edge'}),/Unknown/);
 assert.equal(read('service-worker.js').toString('utf8').match(/const MANIFEST=(.*);/)[1],JSON.stringify(Object.fromEntries(PRECACHED.map(name=>['/'+name,sha(read(name))]))));
 assert.equal(read('service-worker.js').toString('utf8'),makeServiceWorker(JSON.parse(/const MANIFEST=(.*);/.exec(read('service-worker.js').toString('utf8'))[1]),{mode:'static'}));
});

test('_headers follows the Netlify and Cloudflare Pages format',()=>{
 const text=read('_headers').toString('utf8'),blocks={};let current=null;
 for(const line of text.split('\n')){
  if(!line.trim()||line.startsWith('#'))continue;
  if(!/^\s/.test(line)){assert.match(line,/^\/\S*$/,line);current=blocks[line]={};}
  else{assert.ok(current,'header before any path');const match=/^ {2}([A-Za-z-]+): (.+)$/.exec(line);assert.ok(match,line);current[match[1]]=match[2];}
 }
 assert.deepEqual(blocks['/*'],{'X-Content-Type-Options':'nosniff','Referrer-Policy':'no-referrer','Permissions-Policy':'microphone=(self), camera=(), geolocation=()','X-Frame-Options':'DENY'});
 for(const route of ['/','/index.html','/service-worker.js','/manifest.webmanifest'])assert.equal(blocks[route]['Cache-Control'],'no-cache',route);
 assert.equal(blocks['/manifest.webmanifest']['Content-Type'],'application/manifest+json');
 assert.deepEqual(Object.keys(blocks).sort(),['/','/*','/index.html','/manifest.webmanifest','/service-worker.js']);
});

test('DEPLOY.md is a current Russian guide without obsolete paths',()=>{
 const text=read('DEPLOY.md').toString('utf8');
 assert.ok(text.includes(`Danskdag ${version}`)&&text.includes(`Danskdag-static-${version}.zip`));assert.doesNotMatch(text,/\{\{/);
 for(const word of ['HTTPS','Netlify','Cloudflare Pages','GitHub Pages','nginx','try_files','application/manifest+json','.nojekyll','_headers','Android','iPhone','Обновить','JSON','подкаталог'])assert.ok(text.includes(word),word);
 assert.match(text,/[а-яё]{5,}/i);
 assert.doesNotMatch(text,/\/open|\/api\/|chatgpt|Sites|dist\/|Danskdag\.html|app\.netlify\.app\/drop\//);
 assert.match(text,/Облачной синхронизации и входа в аккаунт в этой сборке нет/);
});

test('the existing builds keep their own flags and the Worker page still carries its script-hash tag',()=>{
 const hosted=createOfflineDocument(root,{hosted:true}).html,offline=createOfflineDocument(root).html;
 assert.doesNotMatch(hosted,/data-cloud="off"/);assert.doesNotMatch(offline,/data-cloud="off"/);
 assert.match(hosted,/<meta name="danskdag-script-sha256" content="sha256-/);assert.doesNotMatch(hosted,/http-equiv="Content-Security-Policy"/);
 assert.match(hosted,/chatgpt\.site/,'the Worker build keeps its platform address');
 assert.match(offline,/connect-src 'none'/);
});
