import test from 'node:test';
import assert from 'node:assert/strict';
import * as ui from '../dist/ui.mjs';
test('Danish inside Russian teaching notes gets individual audio without reading Russian in a Danish voice',()=>{
 assert.equal(typeof ui.teachingText,'function');
 const html=ui.teachingText('Førnutid: har været, не er været. <img src=x>');
 assert.ok(html.includes('data-text="har været"'));
 assert.ok(html.includes('data-text="er været"'));
 assert.ok(html.includes('не '));
 assert.ok(!/<span lang="da"[^>]*>[^<]*[А-Яа-яЁё]/u.test(html));
 assert.ok(!html.includes('<img'));
});
test('speech-imitating reductions in a note are not sent to standard Danish TTS',()=>{
 const html=ui.teachingText('Запись Hva’ помогает узнать hvad; Ska’ и ha’ передают редукцию.');
 assert.ok(!html.includes('data-text="Hva"'));
 assert.ok(!html.includes('data-text="Ska"'));
 assert.ok(html.includes('data-text="hvad"'));
});
