import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
const manifest=JSON.parse(fs.readFileSync(new URL('../dist/manifest.webmanifest',import.meta.url),'utf8'));
const pages=new Set(['learn','grammar','dictionary','review','progress','forms','conversation','wordlab','basics','pronunciation','pd3','settings']);
test('manifest is installable: standalone display, scope, start URL and both icon sizes',()=>{
 assert.equal(manifest.display,'standalone');assert.equal(manifest.scope,'/');assert.equal(manifest.start_url,'/open');
 for(const size of ['192x192','512x512'])assert.ok(manifest.icons.some(icon=>icon.sizes===size&&icon.type==='image/png'),size);
 assert.ok(manifest.short_name.length<=12);
});
test('launcher shortcuts open real application pages inside the scope',()=>{
 assert.ok(manifest.shortcuts.length>=3&&manifest.shortcuts.length<=4,'Android shows at most four');
 for(const shortcut of manifest.shortcuts){
  assert.ok(shortcut.name&&shortcut.short_name.length<=12,shortcut.name);
  const match=/^\/open#([a-z0-9-]+)$/.exec(shortcut.url);assert.ok(match,shortcut.url);assert.ok(pages.has(match[1]),'unknown page '+match[1]);
 }
 assert.equal(new Set(manifest.shortcuts.map(s=>s.url)).size,manifest.shortcuts.length);
});
