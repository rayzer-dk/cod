import test from 'node:test';
import assert from 'node:assert/strict';
import {exerciseView} from '../dist/exercise.mjs';
import {createState} from '../dist/engine.mjs';
const item={id:'audio-case',lessonId:'g-a1-v2',da:'Jeg arbejder.',ru:'Я работаю.',note:'Пояснение',formLabel:'Nutid · настоящее',formHelp:[{label:'Navnemåde',text:'arbejde'},{label:'Nutid',text:'arbejder'}]};
const task={itemId:item.id,kind:'gap',prompt:'Jeg ___.',promptLang:'da',answerLang:'da',options:['arbejder','arbejdede'],answers:['arbejder'],bank:[]};
const session={title:'Формы',mode:'easy',tasks:[task],index:0,initialCount:1,words:[],answer:'',submitted:false,correct:0,outcomes:[]};
test('Danish choice audio uses a separate button and cannot select the answer',()=>{
 const html=exerciseView(session,{[item.id]:item},createState());
 assert.match(html,/data-action="speak-text"[^>]*data-text="arbejder"/);
 assert.match(html,/data-action="speak-text"[^>]*data-text="arbejdede"/);
 assert.doesNotMatch(html,/<button[^>]*data-action="choose"[^>]*>(?:(?!<\/button>)[\s\S])*<button/);
});
test('requested form is named and optional form help stays hidden during expert recall',()=>{
 const catalog={[item.id]:item};
 assert.match(exerciseView(session,catalog,createState()),/Nutid · настоящее/);
 assert.match(exerciseView(session,catalog,createState()),/data-help="forms"/);
 const html=exerciseView({...session,mode:'expert',tasks:[{...task,options:[]}]},catalog,createState());
 assert.doesNotMatch(html,/data-help="forms"/);
});
test('sentence tiles have separate audio controls without nesting buttons',()=>{
 const html=exerciseView({...session,tasks:[{...task,kind:'build',bank:['Jeg','arbejder.']}],words:[]},{[item.id]:item},createState());
 assert.match(html,/data-action="speak-text"[^>]*data-text="Jeg"/);
 assert.match(html,/data-action="speak-text"[^>]*data-text="arbejder\."/);
 assert.doesNotMatch(html,/<button[^>]*data-action="add-token"[^>]*>(?:(?!<\/button>)[\s\S])*<button/);
});
