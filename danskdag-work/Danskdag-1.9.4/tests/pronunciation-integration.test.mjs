import test from 'node:test';
import assert from 'node:assert/strict';
import {exerciseView} from '../dist/exercise.mjs';
import {createState} from '../dist/engine.mjs';
import {makeSession,answerSession} from '../dist/learning.mjs';
test('pronunciation comparison is offered only after an answer, using the current complete context',()=>{
 const item={id:'test',kind:'word',da:'en bil',ru:'машина',contextVariants:[{id:'ctx-car',text:'Min ___ er rød.',answers:['bil'],completeDa:'Min bil er rød.',ru:'Моя машина красная.'}]};
 const state=createState(),catalog={test:item};state.reviews.test={box:1,due:0,seen:1,recall:1,lastGrade:'recall'};
 const session=makeSession([item],[item],{mode:'auto',reviews:state.reviews});
 assert.doesNotMatch(exerciseView(session,catalog,state),/data-action="pronounce-answer"/);
 const html=exerciseView(answerSession(session,'bil'),catalog,state);
 assert.match(html,/data-action="pronounce-answer"[^>]*data-text="Min bil er rød\."/);
});
