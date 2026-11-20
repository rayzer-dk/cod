import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
const read=file=>fs.readFileSync(new URL('../dist/'+file,import.meta.url),'utf8');
const base=read('styles.css'),pd3=read('pd3.css');
const hexTokens=text=>Object.fromEntries([...text.matchAll(/--([\w-]+):\s*(#[0-9a-fA-F]{6})\s*;/g)].map(m=>[m[1],m[2]]));
const refTokens=text=>Object.fromEntries([...text.matchAll(/--([\w-]+):\s*var\(--([\w-]+)\)\s*;/g)].map(m=>[m[1],m[2]]));
const lightBase=hexTokens(/:root\{([\s\S]*?)\n\}/.exec(base)[1]);
const darkBase={...lightBase,...hexTokens(/html\[data-theme=dark\]\{([\s\S]*?)\n\}/.exec(base)[1])};
const lightRefs=refTokens(/:root\{([\s\S]*?)\n\}/.exec(pd3)[1]);
const darkRefs={...lightRefs,...refTokens(/html\[data-theme=dark\]\{([\s\S]*?)\n\}/.exec(pd3)[1])};
const themes={light:{...lightBase},dark:{...darkBase}};
for(const [name,refs] of [['light',lightRefs],['dark',darkRefs]])for(const [key,target] of Object.entries(refs))themes[name][key]=themes[name][target];
const channel=v=>{const c=v/255;return c<=0.03928?c/12.92:((c+0.055)/1.055)**2.4;};
const lum=hex=>{const [r,g,b]=[1,3,5].map(i=>parseInt(hex.slice(i,i+2),16));return .2126*channel(r)+.7152*channel(g)+.0722*channel(b);};
const ratio=(a,b)=>{const x=lum(a),y=lum(b);return (Math.max(x,y)+.05)/(Math.min(x,y)+.05);};

test('the reader highlight colours resolve to real tokens in both themes',()=>{
 for(const [name,t] of Object.entries(themes))for(const key of ['pd3-sent-bg','pd3-sent-ink','pd3-sent-line','pd3-word-bg','pd3-word-ink','pd3-misspelled-bg','pd3-missing-bg','pd3-extra-bg','pd3-order-bg','pd3-right-bg','pd3-wrong-bg'])
  assert.match(t[key]||'',/^#[0-9a-f]{6}$/i,`${name} ${key}`);
});

test('current sentence text keeps 4.5:1 and its underline 3:1, in both themes',()=>{
 for(const [name,t] of Object.entries(themes)){
  assert.ok(ratio(t['pd3-sent-ink'],t['pd3-sent-bg'])>=4.5,`${name} sentence ${ratio(t['pd3-sent-ink'],t['pd3-sent-bg']).toFixed(2)}`);
  assert.ok(ratio(t['pd3-sent-line'],t['pd3-sent-bg'])>=3,`${name} sentence line`);
  assert.ok(ratio(t['pd3-sent-line'],t.panel)>=3,`${name} sentence line on panel`);
 }
});

test('current word text keeps 4.5:1 and has its own background, bold and underline',()=>{
 for(const [name,t] of Object.entries(themes)){
  const r=ratio(t['pd3-word-ink'],t['pd3-word-bg']);assert.ok(r>=4.5,`${name} word ${r.toFixed(2)}`);
  assert.notEqual(t['pd3-word-bg'],t['pd3-sent-bg'],`${name} word background differs from the sentence background`);
 }
 assert.match(pd3,/\.pd3-w\.is-word\{[^}]*font-weight:700[^}]*text-decoration:underline/,'the current word is bold and underlined, not only coloured');
 assert.match(pd3,/\.pd3-sent\.is-current\{[^}]*box-shadow:inset 0 -3px/,'the current sentence has a line, not only a background');
});

test('dictation difference markers keep text contrast and use more than colour',()=>{
 for(const [name,t] of Object.entries(themes))for(const key of ['pd3-misspelled-bg','pd3-missing-bg','pd3-extra-bg','pd3-order-bg','pd3-right-bg','pd3-wrong-bg'])
  assert.ok(ratio(t.ink,t[key])>=4.5,`${name} ink on ${key}: ${ratio(t.ink,t[key]).toFixed(2)}`);
 for(const [name,t] of Object.entries(themes)){
  assert.ok(ratio(t.danger,t['pd3-misspelled-bg'])>=3,`${name} wavy line`);
  assert.ok(ratio(t['blue-ink'],t['pd3-order-bg'])>=3,`${name} order outline`);
 }
 for(const [kind,cue] of [['misspelled','wavy'],['missing','dashed'],['extra','line-through']])assert.match(pd3,new RegExp(`\\.pd3-d-${kind}\\{[^}]*${cue}`),kind);
 assert.match(pd3,/\.pd3-d-order\{[^}]*outline:2px solid/);
});

test('answer feedback states do not rely on colour alone',()=>{
 assert.match(pd3,/\.pd3-option\.is-right\{[^}]*box-shadow:inset 4px 0 0/);
 assert.match(pd3,/\.pd3-option\.is-wrong\{[^}]*box-shadow:inset 4px 0 0/);
 for(const [name,t] of Object.entries(themes)){assert.ok(ratio(t.ink,t['mint-bg'])>=4.5,name);assert.ok(ratio(t.muted,t.panel)>=4.5,name);}
});

test('PD3 stylesheet has touch targets, reduced motion and a hidden-attribute rule',()=>{
 assert.match(pd3,/@media\(pointer:coarse\)\{[\s\S]*min-height:44px/);
 assert.match(pd3,/@media\(prefers-reduced-motion:reduce\)/);
 assert.match(pd3,/\.pd3 \[hidden\]\{display:none!important\}/);
});
