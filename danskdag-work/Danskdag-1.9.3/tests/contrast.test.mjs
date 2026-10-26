import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
const read=file=>fs.readFileSync(new URL('../dist/'+file,import.meta.url),'utf8');
const css=read('styles.css');
const tokens=text=>Object.fromEntries([...text.matchAll(/--([\w-]+):\s*(#[0-9a-fA-F]{6})\s*;/g)].map(match=>[match[1],match[2]]));
const light=tokens(/:root\{([\s\S]*?)\n\}/.exec(css)[1]);
const dark={...light,...tokens(/html\[data-theme=dark\]\{([\s\S]*?)\n\}/.exec(css)[1])};
const channel=value=>{const c=value/255;return c<=0.03928?c/12.92:((c+0.055)/1.055)**2.4;};
const luminance=hex=>{const [r,g,b]=[1,3,5].map(i=>parseInt(hex.slice(i,i+2),16));return .2126*channel(r)+.7152*channel(g)+.0722*channel(b);};
const ratio=(a,b)=>{const x=luminance(a),y=luminance(b);return (Math.max(x,y)+.05)/(Math.min(x,y)+.05);};
const surfaces=['canvas','panel','panel-soft','panel-raised','accent-soft','paper','mint-bg','peach-bg','blue-bg','purple-bg','yellow-bg','pink-bg','cyan-bg','orange-bg'];

test('the contrast calculation agrees with known WCAG reference values',()=>{
  assert.equal(ratio('#000000','#ffffff').toFixed(2),'21.00');
  assert.equal(ratio('#767676','#ffffff').toFixed(2),'4.54');
});
test('secondary text meets 4.5:1 on every surface it is drawn on, in both themes',()=>{
  for(const [name,theme] of [['light',light],['dark',dark]])
    for(const surface of surfaces) assert.ok(ratio(theme.muted,theme[surface])>=4.5,`${name} muted on ${surface}: ${ratio(theme.muted,theme[surface]).toFixed(2)}`);
});
test('text on the hero panel meets 4.5:1 in both themes',()=>{
  for(const [name,theme] of [['light',light],['dark',dark]]) {
    assert.ok(ratio(theme['hero-muted'],theme.hero)>=4.5,`${name} hero-muted ${ratio(theme['hero-muted'],theme.hero).toFixed(2)}`);
    assert.ok(ratio(theme['hero-ink'],theme.hero)>=4.5,`${name} hero-ink`);
  }
});
test('paper-note text keeps 4.5:1 on its own paper surface',()=>{
  for(const [name,theme] of [['light',light],['dark',dark]]) assert.ok(ratio(theme['paper-muted'],theme.paper)>=4.5,name);
});
test('borders of form fields and option buttons reach 3:1 against the surfaces they sit on',()=>{
  for(const [name,theme] of [['light',light],['dark',dark]])
    for(const surface of ['canvas','panel','panel-soft','panel-raised']) assert.ok(ratio(theme['field-line'],theme[surface])>=3,`${name} field-line on ${surface}: ${ratio(theme['field-line'],theme[surface]).toFixed(2)}`);
});
test('field, option and secondary-button rules use the stronger border token',()=>{
  const rule=selector=>{const matches=[...css.matchAll(new RegExp('(?:^|\\n)'+selector.replace(/[.*+?^${}()|[\]\\>]/g,'\\$&')+'\\{([^}]*)\\}','g'))];assert.ok(matches.length,selector);return matches.map(match=>match[1]).join(';');};
  for(const selector of ['input,textarea,select','.btn.secondary','.search-box','.answer-input','.answer-zone','.danish-keys>button','.token','.answer-option','.filter-tabs>button'])
    assert.match(rule(selector),/var\(--field-line\)/,selector);
  assert.match(read('basics.css'),/\.basics-number-input\{[^}]*var\(--field-line\)/);
});
test('touch devices get 44px targets for the controls that were 34 to 38px',()=>{
  const block=/@media\(pointer:coarse\)\{([\s\S]*?)\n\}/.exec(css)?.[1];
  assert.ok(block);
  for(const selector of ['.mode-switch>button','.remember-button','.coverage-note>summary','.dialogue-translation>summary','.icon-button','.mini-actions>.icon-button','.session-header>.icon-button','.dialog-heading>.icon-button','.btn','select'])
    assert.ok(block.includes(selector),selector);
  assert.equal((block.match(/min-height:44px/g)||[]).length>=4,true);
  assert.match(block,/min-width:44px;min-height:44px/);
});
