import fs from 'node:fs';
import path from 'node:path';
import {createHash} from 'node:crypto';
import {createOfflineDocument} from './build-offline.mjs';
import {writeServiceWorker} from './build-pwa.mjs';
const offline=createOfflineDocument('.');fs.writeFileSync('Danskdag.html',offline.html);
fs.writeFileSync('dist/index.html',createOfflineDocument('.',{hosted:true}).html);
const version=JSON.parse(fs.readFileSync('package.json','utf8')).version;
writeServiceWorker('.');
const root=path.resolve('dist'),assets={};
const mime={'.html':'text/html; charset=utf-8','.mjs':'text/javascript; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.svg':'image/svg+xml','.png':'image/png','.webmanifest':'application/manifest+json'};
function collect(dir){for(const name of fs.readdirSync(dir)){if(['server','.openai'].includes(name)||name.startsWith('qa-'))continue;const file=path.join(dir,name),info=fs.statSync(file);if(info.isDirectory()){collect(file);continue;}const type=mime[path.extname(file)];if(!type)continue;const bytes=fs.readFileSync(file),binary=path.extname(file)==='.png',key='/'+path.relative(root,file).split(path.sep).join('/');assets[key]={type,body:bytes.toString(binary?'base64':'utf8'),binary,etag:'"'+createHash('sha256').update(bytes).digest('hex')+'"',...(key==='/index.html'?{version}:{})};}}
collect(root);
function moduleSource(file){return fs.readFileSync(file,'utf8').replace(/^import .*;\r?\n/gm,'').replace(/^export (?=(?:async )?(?:function|const|let|class))/gm,'');}
const source=moduleSource('dist/engine.mjs')+'\n'+moduleSource('worker/progress.mjs')+'\n'+moduleSource('worker/site.mjs')+'\nconst APP_ASSETS='+JSON.stringify(assets)+';\nexport default {async fetch(request,env){const p=new URL(request.url).pathname;if(p==="/api/progress")return handleProgress(request,env);return serveAsset(request,APP_ASSETS);}};\n';
fs.mkdirSync('dist/server',{recursive:true});fs.mkdirSync('dist/.openai',{recursive:true});
fs.writeFileSync('dist/server/index.js',source);fs.copyFileSync('.openai/hosting.json','dist/.openai/hosting.json');
console.log(`Built Worker with ${Object.keys(assets).length} assets and authenticated progress API.`);
