import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {Script} from 'node:vm';
import {localizeSource,loadTranslations,languageBootstrap} from './localize-source.mjs';

const importPattern=/^[ \t]*import[ \t]+\{([^}]+)\}[ \t]+from[ \t]+['"]([^'"]+)['"];?[ \t]*$/gm;
const identifiers=value=>value.split(',').map(part=>part.trim()).filter(Boolean).map(part=>{
 const match=/^([A-Za-z_$][\w$]*)(?:\s+as\s+([A-Za-z_$][\w$]*))?$/.exec(part);
 if(!match)throw Error('Unsupported named binding: '+part);
 return {name:match[1],alias:match[2]||match[1]};
});

export function bundleModules(rootDirectory,entry='app.mjs',{transform=source=>source,preamble=''}={}){
 const root=path.resolve(rootDirectory),modules=new Map(),visiting=new Set();
 function visit(name){
  if(visiting.has(name))throw Error('Module cycle: '+[...visiting,name].join(' -> '));
  if(modules.has(name))return modules.get(name);
  const filename=path.resolve(root,name);
  if(!filename.startsWith(root+path.sep))throw Error('Only local module imports are supported: '+name);
  visiting.add(name);
  let source=transform(fs.readFileSync(filename,'utf8'),name);
  const imports=[...source.matchAll(importPattern)].map(match=>({text:match[0],bindings:identifiers(match[1]),ref:match[2]}));
  const dependencies=imports.map(imp=>{
   if(!imp.ref.startsWith('./')&&!imp.ref.startsWith('../'))throw Error('External import is not supported: '+imp.ref);
   const dependency=visit(path.posix.normalize(path.posix.join(path.posix.dirname(name),imp.ref)));
   for(const binding of imp.bindings)if(!dependency.exports.some(e=>e.alias===binding.name))throw Error(`Missing export ${binding.name} in ${imp.ref}`);
   return dependency;
  });
  const exports=[];
  source=source.replace(/^[ \t]*export[ \t]+(?:const|(?:async[ \t]+)?function)[ \t]+([A-Za-z_$][\w$]*)/gm,(text,name)=>{exports.push({name,alias:name});return text.replace(/^[ \t]*export[ \t]+/,'');});
  source=source.replace(/^[ \t]*export[ \t]+\{([^}]+)\};?[ \t]*$/gm,(_,names)=>{exports.push(...identifiers(names));return '';});
  imports.forEach((imp,index)=>{source=source.replace(imp.text,`const {${imp.bindings.map(b=>b.name===b.alias?b.name:`${b.name}:${b.alias}`).join(',')}}=${dependencies[index].symbol};`);});
  if(/^[ \t]*(?:import|export)\b/m.test(source)||/\bimport(?:\s|\/\*[\s\S]*?\*\/|\/\/[^\n]*(?:\n|$))*(?:\(|\.)/.test(source))throw Error('Unsupported module syntax in '+name);
  const symbol='__danskdag_module_'+modules.size;
  const compiled={name,symbol,exports,code:`const ${symbol}=(()=>{\n${source}\nreturn {${exports.map(e=>e.alias===e.name?e.name:`${e.alias}:${e.name}`).join(',')}};\n})();`};
  visiting.delete(name);modules.set(name,compiled);return compiled;
 }
 visit(entry);
 const code=`(()=>{\n'use strict';\n${preamble}\n${[...modules.values()].map(m=>m.code).join('\n\n')}\n})();`;
 new Script(code,{filename:'Danskdag.html'});
 return {code,modules:[...modules.keys()]};
}

export function createOfflineDocument(projectDirectory,{hosted=false}={}){
 const root=path.resolve(projectDirectory),dist=path.join(root,'dist'),version=JSON.parse(fs.readFileSync(path.join(root,'package.json'),'utf8')).version;
 const assets={},images=[],types={'.svg':'image/svg+xml','.png':'image/png','.ico':'image/x-icon'};
 function collect(directory){for(const name of fs.readdirSync(directory).sort()){
  const filename=path.join(directory,name);if(fs.statSync(filename).isDirectory()){if(!['server','.openai'].includes(name))collect(filename);continue;}
  const type=types[path.extname(name)];if(!type)continue;
  const key='/'+path.relative(dist,filename).split(path.sep).join('/');assets[key]=`data:${type};base64,${fs.readFileSync(filename).toString('base64')}`;images.push(key);
 }}
 collect(dist);
 const translate=loadTranslations(root);
 const bundle=bundleModules(dist,'app.mjs',{transform:source=>localizeSource(source,translate),preamble:languageBootstrap}),css=['styles.css','wordlab.css','memory.css','path.css','basics.css'].map(file=>fs.readFileSync(path.join(dist,file),'utf8')).join('\n');
 const script=`globalThis.DANSKDAG_ASSETS=${JSON.stringify(assets)};\n${bundle.code}`.replace(/<\/script/gi,'<\\/script');
 const html=`<!doctype html>\n<html lang="uk" data-offline="true">\n<head>\n<meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">\n<meta http-equiv="Content-Security-Policy" content="default-src 'none'; script-src 'unsafe-inline'; style-src 'unsafe-inline'; img-src data:; media-src blob:; connect-src 'none'; base-uri 'none'; form-action 'none'">\n<meta name="theme-color" content="#192720"><meta name="application-name" content="Danskdag"><meta name="danskdag-version" content="${version}">\n<title>Danskdag ${version} — датский без интернета</title>\n<link rel="icon" href="${assets['/icon.svg']}" type="image/svg+xml">\n<style>${css}</style>\n</head><body><div id="app"></div><div id="speech-status" class="speech-status" role="status" aria-live="polite"></div><div id="toast" role="status" aria-live="polite"></div><noscript>Для работы уроков включи JavaScript в браузере.</noscript>\n<script>${script}</script>\n</body></html>\n`;
 const document=hosted?html.replace('data-offline="true"','data-offline="false"').replace(/<meta http-equiv="Content-Security-Policy"[^>]*>\n/,'').replace(`<title>Danskdag ${version} — датский без интернета</title>`,`<title>Danskdag — датский каждый день</title><link rel="manifest" href="/manifest.webmanifest"><link rel="apple-touch-icon" href="/icon-192.png">`):html;
 return {html:document,modules:bundle.modules,images};
}

if(process.argv[1]&&fileURLToPath(import.meta.url)===path.resolve(process.argv[1])){
 const result=createOfflineDocument('.');fs.writeFileSync('Danskdag.html',result.html);console.log(`Built Danskdag.html: ${result.modules.length} modules, ${result.images.length} embedded images, ${Buffer.byteLength(result.html)} bytes.`);
}
