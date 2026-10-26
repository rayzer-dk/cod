import test from 'node:test';
import assert from 'node:assert/strict';
import {spoken} from '../dist/ui.mjs';
import {renderWordLab} from '../dist/wordlab-view.mjs';
import {createState} from '../dist/engine.mjs';
test('a Danish phrase is one named button containing both text and speaker',()=>{
 const html=spoken('holde af');
 assert.match(html,/^<button[^>]*data-action="speak-text"[^>]*data-text="holde af"/);
 assert.match(html,/<span lang="da" data-audio-ready>holde af<\/span>/);assert.equal((html.match(/<button/g)||[]).length,1);
 assert.match(spoken('<x>'),/data-text="&lt;x&gt;"/);
});
test('meaning and class footer rows are single full-width semantic buttons',()=>{
 for(const labTab of ['meanings','classes']){
  const html=renderWordLab({state:createState(),labTab,labQuery:'',labCategory:'all'},'');
  assert.match(html,/<button class="family-card-bottom"[^>]*data-action="lab-open-/);
  assert.doesNotMatch(html,/<div class="family-card-bottom">/);
  assert.match(html,/data-card-action="lab-open-/);
 }
});
