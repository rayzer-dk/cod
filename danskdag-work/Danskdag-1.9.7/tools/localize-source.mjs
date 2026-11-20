import {parse} from './vendor/acorn.cjs';
import {createHash} from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';

export const textId=value=>createHash('sha256').update(value).digest('hex').slice(0,16);
export function textNodes(source){
 const nodes=[],ast=parse(source,{ecmaVersion:'latest',sourceType:'module',locations:true});
 function visit(node,parent){
  if(!node||typeof node!=='object')return;
  const value=node.type==='Literal'&&typeof node.value==='string'?node.value:node.type==='TemplateElement'?node.value.cooked:null;
  const original=parent?.type==='Property'&&(parent.key?.name||parent.key?.value)==='original';
  if(value&&/[А-Яа-яЁё]/.test(value)&&!original)nodes.push({node,parent,value});
  for(const [key,value]of Object.entries(node)){
   if(key==='loc')continue;
   if(Array.isArray(value))value.forEach(child=>visit(child,node));
   else if(value&&typeof value==='object')visit(value,node);
  }
 }
 visit(ast,null);return nodes;
}
export function localizeSource(source,translate){
 const replacements=textNodes(source).map(({node,parent,value})=>{
  const translated=translate(value),call=`__danskdagText(${JSON.stringify(value)},${JSON.stringify(translated)})`;
  if(typeof translated!=='string'||!translated.trim())throw Error('Missing Ukrainian text: '+textId(value));
  const replacement=node.type==='TemplateElement'?'${'+call+'}':parent?.type==='Property'&&parent.key===node&&!parent.computed?'['+call+']':call;
  return {start:node.start,end:node.end,replacement};
 });
 for(const {start,end,replacement}of replacements.sort((a,b)=>b.start-a.start))source=source.slice(0,start)+replacement+source.slice(end);
 return source;
}
export function loadTranslations(projectDirectory){
 const directory=path.join(projectDirectory,'locales','uk'),translations=new Map();
 for(const file of (fs.existsSync(directory)?fs.readdirSync(directory):[]).filter(f=>f.endsWith('.json')).sort()){
  for(const [id,text]of Object.entries(JSON.parse(fs.readFileSync(path.join(directory,file),'utf8')))){
   if(translations.has(id)&&translations.get(id)!==text)throw Error('Conflicting translation: '+id);
   translations.set(id,text);
  }
 }
 return value=>{const translated=translations.get(textId(value));if(translated===undefined)throw Error('Untranslated Ukrainian text: '+textId(value)+' '+value.slice(0,120));return translated;};
}
export const languageBootstrap=`
let __danskdagLanguage='uk';
try{if(JSON.parse(localStorage.getItem('danskdag.progress.v1'))?.settings?.language==='ru')__danskdagLanguage='ru';}catch{}
globalThis.DANSKDAG_LANGUAGE=__danskdagLanguage;
if(globalThis.document?.documentElement)document.documentElement.lang=__danskdagLanguage;
const __danskdagTranslations=new Map();
const __danskdagText=(ru,uk)=>{
 __danskdagTranslations.set(ru,uk);
 const cells=ru.split(/[|\\n]/),translatedCells=uk.split(/[|\\n]/);
 if(cells.length===translatedCells.length)for(let i=0;i<cells.length;i++)if(/[А-Яа-яЁё]/.test(cells[i]))__danskdagTranslations.set(cells[i].trim(),translatedCells[i].trim());
 const a=ru.split(/;| \\/ /),b=uk.split(/;| \\/ /);
 if(a.length===b.length)for(let i=0;i<a.length;i++)__danskdagTranslations.set(a[i].trim(),b[i].trim());
 return __danskdagLanguage==='uk'?uk:ru;
};
globalThis.DANSKDAG_TRANSLATE=(text,target)=>{
 if(target==='uk')return __danskdagTranslations.get(text)||text;
 for(const [ru,uk]of __danskdagTranslations)if(uk===text)return ru;
 return text;
};`;
