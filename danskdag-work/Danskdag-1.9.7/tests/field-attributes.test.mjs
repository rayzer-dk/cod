import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {dictationItemView,fieldLimit} from '../dist/pd3-views.mjs';
import {pd3Data} from '../dist/pd3-data.mjs';
import {defaults} from '../dist/pd3-store.mjs';
import {insertAtSelection,keepFieldFocus} from '../dist/accessibility.mjs';

const source=name=>fs.readFileSync(new URL(`../dist/${name}`,import.meta.url),'utf8');
const tag=(html,id)=>{const m=new RegExp(`<(?:input|textarea)\\b[^>]*\\bid="${id}"[^>]*>`).exec(html);assert.ok(m,`#${id} is in the markup`);return m[0];};
const has=(markup,name,value)=>assert.match(markup,new RegExp(`\\s${name}="${value}"`),`${name}="${value}" in ${markup.slice(0,90)}`);

test('M2: search fields do not capitalise, autocorrect or spell-check, and the keyboard offers "search"',()=>{
 for(const [file,id] of [['views.mjs','word-search'],['reference-view.mjs','reference-search'],['wordlab-view.mjs','lab-search']]){
  const markup=tag(source(file),id);
  has(markup,'autocapitalize','none');has(markup,'autocorrect','off');has(markup,'spellcheck','false');has(markup,'autocomplete','off');has(markup,'enterkeyhint','search');
  has(markup,'type','search');
 }
});

test('M2: the new-word dialog: Danish field and translation field',()=>{
 const app=source('app.mjs');
 const da=tag(app,'new-da'),ru=tag(app,'new-ru');
 has(da,'lang','da');has(da,'autocapitalize','none');has(da,'autocomplete','off');has(da,'enterkeyhint','next');has(da,'spellcheck','false');
 assert.match(ru,/lang="\$\{appLanguage\}"/,'the translation field is in the interface language');
 has(ru,'autocapitalize','none');has(ru,'spellcheck','false');has(ru,'autocomplete','off');has(ru,'enterkeyhint','next');
 assert.match(app,/import \{appLanguage,relocalizeSession\} from '\.\/language\.mjs'/);
});

test('M2/M1: PD3 dictation fields carry keyboard hints and a length tied to the reference',()=>{
 const run={inputs:{},plays:{},result:null};
 const text=pd3Data.dictations.find(x=>x.mode==='text'),sentences=pd3Data.dictations.find(x=>x.mode!=='text');
 const html=dictationItemView({item:text,d:defaults(),run});
 const area=tag(html,'pd3-dict-text');
 has(area,'enterkeyhint','enter');has(area,'autocapitalize','none');has(area,'spellcheck','false');
 const reference=text.sentences.map(s=>s.da).join(' ');
 has(area,'maxlength',String(fieldLimit(reference,400)));
 assert.ok(fieldLimit(reference,400)>=reference.length*1.5-1&&fieldLimit(reference,400)<3000);
 const list=dictationItemView({item:sentences,d:defaults(),run});
 sentences.sentences.forEach((s,i)=>{
  const input=tag(list,`pd3-dict-in-${i}`);
  has(input,'enterkeyhint',i<sentences.sentences.length-1?'next':'done');
  has(input,'maxlength',String(fieldLimit(s.da,150)));
  assert.ok(Number(/maxlength="(\d+)"/.exec(input)[1])>=s.da.length*1.5);
 });
 assert.equal(fieldLimit('x'.repeat(10),400),400);assert.equal(fieldLimit('x'.repeat(100000),400),3000);assert.equal(fieldLimit('x'.repeat(1000),400),1500);
 assert.equal(source('pd3-views.mjs').includes('maxlength="3000"'),false);
});

test('L9: a letter is inserted in place of the selection and never lost silently at the limit',()=>{
 assert.deepEqual(insertAtSelection('hej','hej'.length,3,'å',1500),{value:'hejå',caret:4});
 assert.deepEqual(insertAtSelection('hej',1,1,'ø'),{value:'høej',caret:2});
 assert.deepEqual(insertAtSelection('hej',0,3,'æ'),{value:'æ',caret:1});
 const full='a'.repeat(1500);
 assert.equal(insertAtSelection(full,1500,1500,'å',1500),null,'a full field refuses instead of dropping the letter');
 assert.equal(insertAtSelection(full,10,10,'å',1500),null,'and does not cut the end of the text');
 assert.deepEqual(insertAtSelection(full,10,11,'å',1500),{value:'a'.repeat(10)+'å'+'a'.repeat(1489),caret:11},'a selection replaced by a letter fits');
 assert.deepEqual(insertAtSelection('a'.repeat(1499),1499,1499,'å',1500).value.length,1500);
 assert.deepEqual(insertAtSelection('abc',NaN,undefined,'å'),{value:'abcå',caret:4});
 assert.deepEqual(insertAtSelection(null,0,0,'å'),{value:'å',caret:1});
});

test('L9: pressing a letter button does not move the focus out of the field',()=>{
 const handler=keepFieldFocus('.danish-keys button,.pd3-letter');
 let prevented=0;
 handler({target:{closest:s=>({})},preventDefault(){prevented++;}});
 handler({target:{closest:()=>null},preventDefault(){prevented++;}});
 handler({target:null,preventDefault(){prevented++;}});
 assert.equal(prevented,1);
 const app=source('app.mjs');
 assert.match(app,/for\(const type of \['pointerdown','mousedown'\]\)document\.addEventListener\(type,keepFieldFocus\('\.danish-keys button,\.pd3-letter'\)\)/);
 assert.match(app,/insertAtSelection\(input\.value,start,end,el\.dataset\.letter/);
 assert.doesNotMatch(app,/\.slice\(0,1500\);input\.value/);
 assert.match(source('pd3-page.mjs'),/insertAtSelection\(field\.value,start,end,letter/);
});

test('L10: Enter during IME composition does not submit the answer',()=>{
 const app=source('app.mjs');
 assert.match(app,/event\.key==='Enter'&&!event\.repeat&&!event\.isComposing&&event\.keyCode!==229/);
});
