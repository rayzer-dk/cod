import fs from 'node:fs';
import path from 'node:path';
import {createHash} from 'node:crypto';
import {fileURLToPath} from 'node:url';
import {deflateRawSync} from 'node:zlib';
import {createOfflineDocument} from './build-offline.mjs';
import {makeServiceWorker} from './build-pwa.mjs';

// Files the Service Worker precaches and checks by SHA-256 (the same six as the Worker build).
export const PRECACHED=['index.html','manifest.webmanifest','icon.svg','icon-192.png','icon-512.png','flag-dk.svg'];
// Everything the static folder contains. DEPLOY.md and _headers come from tools/static-site/.
export const STATIC_FILES=[...PRECACHED,'service-worker.js','_headers','.nojekyll','DEPLOY.md'];

// The Worker build opens the app through /open. A plain static host has no such page: the start URL and the launcher shortcuts use /.
export function staticManifest(sourceText){
 const manifest=JSON.parse(sourceText);
 const fix=url=>{
  if(url==='/open')return '/';
  const match=/^\/open(#[a-z0-9-]+)$/.exec(url);if(!match)throw Error('Unexpected manifest URL: '+url);
  return '/'+match[1];
 };
 manifest.start_url=fix(manifest.start_url);
 for(const shortcut of manifest.shortcuts||[])shortcut.url=fix(shortcut.url);
 return JSON.stringify(manifest);
}

const crcTable=(()=>{const table=new Uint32Array(256);for(let n=0;n<256;n++){let c=n;for(let k=0;k<8;k++)c=c&1?0xEDB88320^(c>>>1):c>>>1;table[n]=c>>>0;}return table;})();
export function crc32(buffer){let c=0xFFFFFFFF;for(const byte of buffer)c=crcTable[(c^byte)&0xFF]^(c>>>8);return (c^0xFFFFFFFF)>>>0;}

// A small deterministic ZIP writer (no dependencies): UTF-8 names, deflate, fixed timestamp, Unix mode 0644.
export function createZip(entries){
 const DOS_TIME=0,DOS_DATE=((2026-1980)<<9)|(1<<5)|1;
 const locals=[],central=[];let offset=0;
 for(const {name,data}of entries){
  const nameBytes=Buffer.from(name,'utf8'),packed=data.length?deflateRawSync(data,{level:9}):Buffer.alloc(0),method=data.length?8:0,crc=crc32(data);
  const local=Buffer.alloc(30);
  local.writeUInt32LE(0x04034b50,0);local.writeUInt16LE(20,4);local.writeUInt16LE(0x0800,6);local.writeUInt16LE(method,8);local.writeUInt16LE(DOS_TIME,10);local.writeUInt16LE(DOS_DATE,12);
  local.writeUInt32LE(crc,14);local.writeUInt32LE(packed.length,18);local.writeUInt32LE(data.length,22);local.writeUInt16LE(nameBytes.length,26);local.writeUInt16LE(0,28);
  const header=Buffer.alloc(46);
  header.writeUInt32LE(0x02014b50,0);header.writeUInt16LE((3<<8)|20,4);header.writeUInt16LE(20,6);header.writeUInt16LE(0x0800,8);header.writeUInt16LE(method,10);header.writeUInt16LE(DOS_TIME,12);header.writeUInt16LE(DOS_DATE,14);
  header.writeUInt32LE(crc,16);header.writeUInt32LE(packed.length,20);header.writeUInt32LE(data.length,24);header.writeUInt16LE(nameBytes.length,28);
  header.writeUInt32LE(((0o100644)<<16)>>>0,38);header.writeUInt32LE(offset,42);
  locals.push(local,nameBytes,packed);central.push(header,nameBytes);
  offset+=local.length+nameBytes.length+packed.length;
 }
 const directory=Buffer.concat(central),end=Buffer.alloc(22);
 end.writeUInt32LE(0x06054b50,0);end.writeUInt16LE(entries.length,8);end.writeUInt16LE(entries.length,10);end.writeUInt32LE(directory.length,12);end.writeUInt32LE(offset,16);
 return Buffer.concat([...locals,directory,end]);
}

export function buildStaticSite(projectDirectory='.',{outDir,zipPath}={}){
 const root=path.resolve(projectDirectory),dist=path.join(root,'dist'),template=path.join(root,'tools','static-site');
 const version=JSON.parse(fs.readFileSync(path.join(root,'package.json'),'utf8')).version;
 const target=path.resolve(outDir||path.join(root,'static-site')),archive=path.resolve(zipPath||path.join(root,`Danskdag-static-${version}.zip`));
 const document=createOfflineDocument(root,{staticSite:true});
 const files=new Map([
  ['index.html',Buffer.from(document.html,'utf8')],
  ['manifest.webmanifest',Buffer.from(staticManifest(fs.readFileSync(path.join(dist,'manifest.webmanifest'),'utf8')),'utf8')]
 ]);
 for(const name of ['icon.svg','icon-192.png','icon-512.png','flag-dk.svg'])files.set(name,fs.readFileSync(path.join(dist,name)));
 const hashes={};for(const name of PRECACHED)hashes['/'+name]=createHash('sha256').update(files.get(name)).digest('hex');
 files.set('service-worker.js',Buffer.from(makeServiceWorker(hashes,{mode:'static'}),'utf8'));
 files.set('_headers',fs.readFileSync(path.join(template,'_headers')));
 files.set('.nojekyll',Buffer.alloc(0));
 files.set('DEPLOY.md',Buffer.from(fs.readFileSync(path.join(template,'DEPLOY.md'),'utf8').replaceAll('{{VERSION}}',version),'utf8'));
 fs.rmSync(target,{recursive:true,force:true});fs.mkdirSync(target,{recursive:true});
 for(const name of STATIC_FILES)fs.writeFileSync(path.join(target,name),files.get(name));
 fs.writeFileSync(archive,createZip(STATIC_FILES.map(name=>({name,data:files.get(name)}))));
 return {version,directory:target,archive,files:STATIC_FILES.slice(),scriptHash:document.scriptHash,bytes:files.get('index.html').length};
}

if(process.argv[1]&&fileURLToPath(import.meta.url)===path.resolve(process.argv[1])){
 const result=buildStaticSite('.');
 console.log(`Built static-site/ (${result.files.length} files, index.html ${result.bytes} bytes) and ${path.basename(result.archive)} for Danskdag ${result.version}.`);
}
