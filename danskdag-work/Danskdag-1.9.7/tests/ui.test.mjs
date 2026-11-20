import test from 'node:test';
import assert from 'node:assert/strict';
import {highlightText} from '../dist/ui.mjs';

test('a one-letter preposition highlights a whole token rather than a letter in Vi',()=>{
 assert.equal(highlightText('Vi bor i Danmark.','i'),'Vi bor <mark>i</mark> Danmark.');
 assert.equal(highlightText('Hun rejser med toget.','med'),'Hun rejser <mark>med</mark> toget.');
});
test('Danish targets are matched case-insensitively and surrounding text is escaped',()=>{
 assert.equal(highlightText('Én nøgle < to.','én'),'<mark>Én</mark> nøgle &lt; to.');
 assert.equal(highlightText('Et hus er stort.','huset'),'Et hus er stort.');
});
