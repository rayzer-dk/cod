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
test('a typed Danish noun or verb states the expected form up front',()=>{
 const word={id:'noun-hint',da:'et køleskab',ru:'холодильник'};
 const typed={itemId:word.id,kind:'type',prompt:'холодильник',promptLang:'ru',answerLang:'da',options:[],answers:['et køleskab'],bank:[],reverse:true};
 const view=hint=>exerciseView({...session,mode:'expert',tasks:[{...typed,...(hint?{hint}:{})}]},{[word.id]:word},createState());
 assert.match(view('article'),/form-request[^>]*>[\s\S]*en\/et/);
 assert.match(view('infinitive'),/form-request[^>]*>[\s\S]*at/);
 assert.doesNotMatch(view(),/en\/et/);
});
test('self-check is offered after a wrong built sentence but not after giving up or for choices',()=>{
 const build={...task,kind:'build',bank:['Jeg','arbejder'],answers:['Jeg arbejder.'],options:[]};
 const wrong={...session,tasks:[build],words:[0,1],answer:'arbejder Jeg',submitted:true,feedback:false};
 assert.match(exerciseView(wrong,{[item.id]:item},createState()),/data-action="self-check"/);
 assert.doesNotMatch(exerciseView({...wrong,answer:''},{[item.id]:item},createState()),/data-action="self-check"/);
 assert.doesNotMatch(exerciseView({...wrong,tasks:[task]},{[item.id]:item},createState()),/data-action="self-check"/);
});
test('typed Danish answers are not auto-capitalised or autocorrected by mobile keyboards',()=>{
 const typed={itemId:item.id,kind:'type',prompt:'Я работаю.',promptLang:'ru',answerLang:'da',options:[],answers:['Jeg arbejder.'],bank:[]};
 const html=exerciseView({...session,mode:'expert',tasks:[typed]},{[item.id]:item},createState());
 const input=html.match(/<input id="answer-input"[^>]*>/)[0];
 for(const attribute of ['autocapitalize="none"','autocorrect="off"','spellcheck="false"','autocomplete="off"'])assert.ok(input.includes(attribute),attribute);
});
