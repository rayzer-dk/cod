import test from 'node:test';
import assert from 'node:assert/strict';

let content;
try { content=await import('../dist/pronunciation-data.mjs'); }
catch(error) { if(error.code!=='ERR_MODULE_NOT_FOUND')throw error; }

test('pronunciation practice supplies distinct guided sound and phrase comparisons',()=>{
  assert.ok(content,'pronunciation-data.mjs must supply the practice guides');
  const guides=content.pronunciationGuides;
  assert.ok(guides.length>=10&&guides.length<=12);
  assert.equal(new Set(guides.map(g=>g.id)).size,guides.length);
  assert.equal(new Set(guides.map(g=>g.phraseDa)).size,guides.length);
  for(const guide of guides){
    assert.match(guide.id,/^pron-[a-z0-9-]+$/);
    for(const key of ['title','focus','note','phraseDa','phraseRu'])assert.ok(typeof guide[key]==='string'&&guide[key].trim(),`${guide.id}: ${key}`);
    assert.ok(guide.words.length>=2&&guide.words.length<=4,guide.id);
    for(const word of guide.words){assert.ok(word.da.trim(),guide.id);assert.ok(word.ru.trim(),guide.id);}
    assert.ok(guide.chunks.length>=2&&guide.chunks.length<=4,guide.id);
    assert.ok(guide.chunks.every(chunk=>typeof chunk==='string'&&chunk.trim()),guide.id);
    assert.equal(guide.chunks.join(' '),guide.phraseDa,guide.id);
    assert.ok(guide.checkpoints.length>=2&&guide.checkpoints.length<=3,guide.id);
    for(const check of guide.checkpoints)assert.ok(typeof check==='string'&&check.trim().length>=15,guide.id);
    assert.equal(guide.score,undefined,guide.id);
    assert.equal(guide.ipa,undefined,guide.id);
  }
});

test('Danish pronunciation coverage includes contrasts, length, stød and connected speech',()=>{
  assert.ok(content,'pronunciation-data.mjs must exist');
  const ids=new Set(content.pronunciationGuides.map(g=>g.id));
  for(const id of ['pron-y-u','pron-oe-o','pron-ae-e','pron-length','pron-soft-d','pron-stoed','pron-word-stress','pron-rhythm','pron-schwa','pron-reductions'])assert.ok(ids.has(id),id);
});
