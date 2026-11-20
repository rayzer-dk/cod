import test from 'node:test';
import assert from 'node:assert/strict';
import vm from 'node:vm';
import {createState,validateState} from '../dist/engine.mjs';
const compiler=await import('../tools/localize-source.mjs').catch(()=>({}));
const language=await import('../dist/language.mjs').catch(()=>({}));
test('new and legacy progress default to Ukrainian and preserve explicit Russian',()=>{
 const state=createState();assert.equal(state.settings.language,'uk');
 delete state.settings.language;state.xp=60;state.bookmarks=['old-id'];
 const clean=validateState(state);assert.equal(clean.settings.language,'uk');assert.equal(clean.xp,60);assert.deepEqual(clean.bookmarks,['old-id']);
 state.settings.language='ru';assert.equal(validateState(state).settings.language,'ru');
 state.settings.language='xx';assert.equal(validateState(state).settings.language,'uk');assert.equal(validateState(state).xp,60);
});
test('build translation preserves JavaScript, Danish, dynamic expressions and provenance',()=>{
 assert.equal(typeof compiler.localizeSource,'function');
 const source='const da="Jeg holder af dig."; const label="Слова"; const html=`<b>Привет ${2+2}</b>`; const raw={original:"Исходник"}; globalThis.result={da,label,html,raw};';
 const translations=new Map([['Слова','Слова'],['<b>Привет ','<b>Привіт ']]);
 const transformed=compiler.localizeSource(source,value=>{assert.ok(translations.has(value),value);return translations.get(value);});
 for(const locale of ['ru','uk']){
  const scope={__danskdagText:(ru,uk)=>locale==='uk'?uk:ru};vm.runInNewContext(transformed,scope);
  assert.equal(scope.result.da,'Jeg holder af dig.');assert.equal(scope.result.html,locale==='uk'?'<b>Привіт 4</b>':'<b>Привет 4</b>');assert.equal(scope.result.raw.original,'Исходник');
 }
});
test('changing language translates saved built-in tasks while preserving typed and personal content',()=>{
 assert.equal(typeof language.relocalizeSession,'function');
 const session={language:'ru',title:'Тема',answer:'мой ответ',index:1,correct:1,tasks:[{itemId:'builtin',prompt:'Дом',answers:['Дом'],options:['Дом','Сад']},{itemId:'u-mine',prompt:'Дом',answers:['мой текст'],options:[]}]};
 const translate=s=>({'Тема':'Тема','Дом':'Дім','Сад':'Сад'})[s]||s;
 const next=language.relocalizeSession(session,'uk',translate);
 assert.equal(next.tasks[0].prompt,'Дім');assert.equal(next.tasks[0].answers[0],'Дім');assert.equal(next.tasks[1].prompt,'Дом');assert.equal(next.answer,'мой ответ');assert.equal(next.index,1);assert.equal(next.correct,1);assert.equal(next.language,'uk');assert.equal(session.tasks[0].prompt,'Дом');
});
test('a paused selected option remains selected after changing language',()=>{
 const session={language:'ru',title:'Тема',index:0,answer:'Дом',tasks:[{itemId:'builtin',kind:'choice',prompt:'house',answers:['Дом'],options:['Дом','Сад']}]};
 const next=language.relocalizeSession(session,'uk',s=>s==='Дом'?'Дім':s);
 assert.equal(next.answer,'Дім');assert.ok(next.tasks[0].options.includes(next.answer));
});
