import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import vm from 'node:vm';
const builder=await import('../tools/build-offline.mjs').catch(()=>({}));

test('offline bundler preserves aliases and reexports without a runtime module loader',()=>{
 assert.equal(typeof builder.bundleModules,'function','Missing standalone HTML builder');
 const root=fs.mkdtempSync(path.join(os.tmpdir(),'danskdag-bundle-'));
 try{
  fs.writeFileSync(path.join(root,'base.mjs'),'export const value=7;\nexport function twice(v){return v*2;}\n');
  fs.writeFileSync(path.join(root,'bridge.mjs'),"import {value,twice as multiply} from './base.mjs';\nexport {value,multiply};\n");
  fs.writeFileSync(path.join(root,'app.mjs'),"import {value,multiply as double} from './bridge.mjs';\nglobalThis.answer=double(value);\n");
  const result=builder.bundleModules(root),context={};vm.runInNewContext(result.code,context);
  assert.equal(context.answer,14);assert.equal(result.modules.length,3);
  assert.doesNotMatch(result.code,/^(?:import|export)\s/m);
  fs.writeFileSync(path.join(root,'base.mjs'),"import {value} from './bridge.mjs';\nexport {value};\n");
  assert.throws(()=>builder.bundleModules(root),/cycle/i);
 }finally{fs.rmSync(root,{recursive:true,force:true});}
});
test('offline bundle rejects external imports and unavailable named exports',()=>{
 const root=fs.mkdtempSync(path.join(os.tmpdir(),'danskdag-import-'));
 try{
  fs.writeFileSync(path.join(root,'app.mjs'),"import {x} from 'https://example.com/app.js';\n");
  assert.throws(()=>builder.bundleModules(root),/local|external/i);
  fs.writeFileSync(path.join(root,'app.mjs'),"import {missing} from './base.mjs';\n");fs.writeFileSync(path.join(root,'base.mjs'),'export const value=7;\n');
  assert.throws(()=>builder.bundleModules(root),/missing/i);
 }finally{fs.rmSync(root,{recursive:true,force:true});}
});
test('standalone document contains the complete app and all local pictures with no runtime asset dependencies',()=>{
 const result=builder.createOfflineDocument(path.resolve('.'));
 assert.ok(result.modules.length>=35);assert.ok(result.images.length>=40);
 assert.match(result.html,/data-offline="true"/);
 assert.match(result.html,/connect-src 'none'/);
 assert.match(result.html,/media-src blob:/);
 assert.match(result.html,/Permission is hereby granted, free of charge/);
 assert.match(result.html,/data:image\/svg\+xml;base64,/);
 assert.match(result.html,/data:image\/png;base64,/);
 assert.doesNotMatch(result.html,/<script[^>]+src=|<link[^>]+rel="stylesheet"/i);
 assert.equal((result.html.match(/<script(?:\s|>)/g)||[]).length,1);
 assert.equal((result.html.match(/<\/script>/g)||[]).length,1);
 for(const file of ['common-words.mjs','forms-data.mjs','patterns-data.mjs','document-vocabulary.mjs','extended-curriculum.mjs'])assert.ok(result.modules.includes(file),file);
 for(const file of ['spoken-practice.mjs','basics-data.mjs','path-view.mjs'])assert.ok(result.modules.includes(file),file);
});
test('offline bundler handles indented declarations and rejects dynamic runtime imports',()=>{
 const root=fs.mkdtempSync(path.join(os.tmpdir(),'danskdag-module-syntax-'));
 try{
  fs.writeFileSync(path.join(root,'base.mjs'),'  export const value=7;\n');
  fs.writeFileSync(path.join(root,'app.mjs'),"  import {value} from './base.mjs';\n globalThis.answer=value;\n");
  const result=builder.bundleModules(root),context={};vm.runInNewContext(result.code,context);assert.equal(context.answer,7);
  for(const source of ["const value=import('./base.mjs');", "const value=import /* delayed */ ('./base.mjs');", "const value=import.meta.url;"]){
   fs.writeFileSync(path.join(root,'app.mjs'),source);assert.throws(()=>builder.bundleModules(root),/unsupported|import/i);
  }
 }finally{fs.rmSync(root,{recursive:true,force:true});}
});
test('HTML escapes embedded script terminators without changing lesson text',()=>{
 const root=fs.mkdtempSync(path.join(os.tmpdir(),'danskdag-html-escape-'));
 try{
  fs.mkdirSync(path.join(root,'dist'));fs.writeFileSync(path.join(root,'package.json'),'{"version":"1.5.2"}');
  for(const name of ['styles.css','wordlab.css','memory.css','path.css','basics.css','pd3.css'])fs.writeFileSync(path.join(root,'dist',name),'');
  fs.writeFileSync(path.join(root,'dist','icon.svg'),'<svg xmlns="http://www.w3.org/2000/svg"/>');
  const text='</script><script>globalThis.attacked=true</script>';
  fs.writeFileSync(path.join(root,'dist','app.mjs'),'globalThis.lessonText='+JSON.stringify(text)+';');
  const {html}=builder.createOfflineDocument(root);assert.equal((html.match(/<\/script>/g)||[]).length,1);
  const script=/<script>([\s\S]*)<\/script>/.exec(html)[1],context={};vm.runInNewContext(script,context);
  assert.equal(context.lessonText,text);assert.equal(context.attacked,undefined);
 }finally{fs.rmSync(root,{recursive:true,force:true});}
});
