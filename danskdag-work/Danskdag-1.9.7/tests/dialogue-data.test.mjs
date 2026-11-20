import test from 'node:test';
import assert from 'node:assert/strict';

// Removing a lesson, its scenario, or an accepted full response breaks the
// six-item role-play contract that the course UI consumes.
let catalogue;
try { catalogue = await import('../dist/dialogue-data.mjs'); }
catch (error) { if (error.code !== 'ERR_MODULE_NOT_FOUND') throw error; }

test('dialogue catalogue supplies six six-turn lessons at each advanced level',()=>{
  assert.ok(catalogue,'dialogue-data.mjs must supply the authored role-play catalogue');
  const lessons=catalogue.dialogueLessons;
  assert.equal(lessons.length,12);
  for(const level of ['B2','C1'])assert.equal(lessons.filter(l=>l.level===level).length,6);
  assert.equal(new Set(lessons.map(l=>l.id)).size,12);
  for(const lesson of lessons){
    assert.match(lesson.id,/^dialogue-(b2|c1)-[a-z-]+$/);
    assert.equal(lesson.kind,'conversation');
    assert.equal(lesson.roleplay,true);
    assert.equal(lesson.icon,'chat');
    assert.equal(lesson.color,'blue');
    assert.equal(lesson.items.length,6,lesson.id);
    for(const key of ['title','subtitle','rule'])assert.ok(lesson[key]?.trim(),`${lesson.id}: ${key}`);
  }
});

test('every independent turn includes a concrete task and bilingual partner context',()=>{
  assert.ok(catalogue,'dialogue-data.mjs must exist');
  const items=catalogue.dialogueLessons.flatMap(l=>l.items);
  assert.equal(items.length,72);
  assert.equal(new Set(items.map(i=>i.id)).size,72);
  assert.equal(new Set(items.map(i=>i.da.toLocaleLowerCase('da'))).size,72);
  for(const lesson of catalogue.dialogueLessons)for(const [index,item] of lesson.items.entries()){
    assert.equal(item.id,`${lesson.id}-${index+1}`);
    assert.equal(item.lessonId,lesson.id);
    assert.equal(item.wordClass,'phrase');
    for(const key of ['da','ru','note'])assert.ok(item[key]?.trim(),`${item.id}: ${key}`);
    for(const key of ['situation','partnerDa','partnerRu','goal'])assert.ok(item.dialogue[key]?.trim(),`${item.id}: ${key}`);
    for(const key of ['situation','partnerRu','goal'])assert.match(item.dialogue[key],/[а-яё]/iu,`${item.id}: Russian ${key}`);
    assert.ok(item.dialogue.goal.length>=55,`${item.id}: specific communicative goal`);
    assert.ok(!item.dialogue.goal.includes(item.da),`${item.id}: goal must not reveal the model`);
    assert.notEqual(item.dialogue.partnerDa,item.da,`${item.id}: partner is a different turn`);
  }
});

test('accepted Danish responses are complete distinct standard-spelling utterances',()=>{
  assert.ok(catalogue,'dialogue-data.mjs must exist');
  for(const item of catalogue.dialogueLessons.flatMap(l=>l.items)){
    assert.ok(item.daAnswers.length>=2,`${item.id}: multiple complete Danish responses`);
    assert.equal(item.daAnswers[0],item.da);
    assert.ok(item.ruAnswers.includes(item.ru));
    assert.equal(new Set(item.daAnswers.map(s=>s.toLocaleLowerCase('da'))).size,item.daAnswers.length,item.id);
    for(const response of item.daAnswers){
      const words=response.trim().split(/\s+/u).length;
      assert.ok(words>=10 && words<=28,`${item.id}: ${words} words: ${response}`);
      assert.match(response,/[.!?]$/u,item.id);
      assert.doesNotMatch(response,/\b(?:hva|ku|ska|ikk|ha|gi)['’]|så['’]n/iu,item.id);
      assert.doesNotMatch(response,/[а-яё]/iu,item.id);
    }
  }
});

test('both levels cover the six everyday interaction settings',()=>{
  assert.ok(catalogue,'dialogue-data.mjs must exist');
  for(const level of ['b2','c1'])for(const topic of ['work','social','purchase','housing','phone','opinions']){
    assert.ok(catalogue.dialogueLessons.some(l=>l.id===`dialogue-${level}-${topic}`),`${level}: ${topic}`);
  }
});
