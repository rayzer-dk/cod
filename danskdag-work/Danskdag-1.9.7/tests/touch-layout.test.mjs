import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
const css=name=>fs.readFileSync(new URL(`../dist/${name}`,import.meta.url),'utf8');
const coarse=text=>[...text.matchAll(/@media\(pointer:coarse\)\{/g)].map(m=>{let depth=1,i=m.index+m[0].length;const start=i;while(depth&&i<text.length){if(text[i]==='{')depth++;else if(text[i]==='}')depth--;i++;}return text.slice(start,i-1);}).join('\n');

test('L4/L5: tap targets under a coarse pointer are at least 44px: give-up, word titles, the dictionary link, the PD3 reader buttons',()=>{
 assert.match(coarse(css('memory.css')),/\.give-up\{[^}]*min-height:44px/);
 const main=coarse(css('styles.css'));
 assert.match(main,/\.word-title\{[^}]*min-height:44px/);
 assert.match(main,/\.field-note>a\{[^}]*min-height:44px/);
 assert.match(css('pd3.css'),/\.pd3-player-main \.btn\{min-width:44px;min-height:44px\}/);
});

test('L8: fields are at least 16px under a coarse pointer so iOS does not zoom on focus',()=>{
 const main=coarse(css('styles.css'));
 const rule=/(input:not[^{]*select,textarea)\{font-size:max\(16px,1rem\)!important\}/.exec(main);
 assert.ok(rule,'a coarse-pointer rule sets the field font size');
 for(const type of ['checkbox','radio','file'])assert.ok(rule[1].includes(`[type=${type}]`));
});

test('L6: the section row and the bottom navigation let labels wrap instead of overflowing',()=>{
 const styles=css('styles.css');
 const row=/\.mobile-sections>button\{[^}]*\}/.exec(styles)[0];
 assert.match(row,/flex:1 1 0/);assert.match(row,/min-width:0/);assert.match(row,/white-space:normal/);assert.match(row,/overflow-wrap:anywhere/);
 assert.doesNotMatch(row,/white-space:nowrap/);
 assert.match(styles,/@media\(max-width:400px\)\{\.mobile-sections\{[^}]*\}\.mobile-sections>button\{[^}]*font-size:max\(11px/);
 assert.match(styles,/\.nav-item>span\{white-space:normal;overflow-wrap:anywhere/);
 assert.doesNotMatch(styles,/\.nav-item>span\{white-space:nowrap/);
});
