import test from 'node:test';
import assert from 'node:assert/strict';
import {documentVocabulary, documentNeedsReview, documentImportSummary, documentSourceAudit} from '../dist/document-vocabulary.mjs';
import {enrichedVocabulary} from '../dist/vocabulary-enrichment.mjs';
const normalize=s=>s.normalize('NFC').toLocaleLowerCase('da').replace(/^(at|en|et)\s+/,'').replace(/[.,!?]/g,'').replace(/\s+/g,' ').trim();

test('new document entries have reviewed contextual content and traceable source rows',()=>{
  assert.ok(documentVocabulary.length>=200);
  const ids=new Set(); const da=new Set();
  const existing=new Set(enrichedVocabulary.flatMap(x=>[x.da,...(x.daAnswers||[])]).map(normalize));
  for(const item of documentVocabulary){
    assert.match(item.id,/^doc-[a-f0-9]{12}$/); assert.ok(!ids.has(item.id)); ids.add(item.id);
    assert.ok(!da.has(normalize(item.da)),`duplicate new item: ${item.da}`); da.add(normalize(item.da));
    assert.ok(!existing.has(normalize(item.da)),`already imported: ${item.da}`);
    for(const field of ['da','ru','exampleDa','exampleRu','association','sourceDocument','original']) assert.ok(item[field]?.trim(),`${item.id} ${field}`);
    assert.equal(item.verified,true); assert.ok(Number.isInteger(item.sourceRow)&&item.sourceRow>1);
    assert.doesNotMatch(item.da,/[А-Яа-яЁё]/u);
    assert.ok(item.exampleDa.length>item.da.length||/[.!?]/.test(item.exampleDa));
  }
});

test('known source translation traps are corrected',()=>{
  const get=da=>documentVocabulary.find(x=>x.da===da);
  assert.match(get('gratis').ru,/бесплатно/); assert.doesNotMatch(get('gratis').ru,/свобод/);
  assert.match(get('tage afsted').ru,/отправляться|уезжать/); assert.doesNotMatch(get('tage afsted').ru,/снять/);
  assert.match(get('alkove').ru,/ниша|альков/); assert.doesNotMatch(get('alkove').ru,/беседка/);
  assert.match(get('rat').ru,/руль/);
  assert.match(get('tilbud').ru,/предложение|скид/); assert.doesNotMatch(get('tilbud').ru,/предложения \(грамматика/);
  assert.match(get('ledning').ru,/провод/); assert.match(get('tråd').ru,/нить|проволока/);
  assert.match(get('etage').exampleRu,/третьем этаже/); assert.match(get('etage').note,/stueetagen/);
  assert.doesNotMatch(get('Jeg reparerede den.').association,/завершённое/);
  for(const word of ['rense','sømme','lime','åbne','lukke','tallerken','glas','gulv','reparere','vandlås','radiator','sengetæppe','opdatere','ryge','tage af','fange']) assert.ok(get(word),word);
});

test('ambiguous and unsafe source rows cannot enter training',()=>{
  assert.ok(documentNeedsReview.length>0);
  assert.ok(documentNeedsReview.every(x=>x.verified===false&&x.reason&&Number.isInteger(x.sourceRow)));
  for(const bad of ['Di va so lit','Ombyggelig','ratning','forward','odliste','Гормон при родах Окситоцин']) assert.ok(!documentVocabulary.some(x=>x.da===bad));
  assert.ok(!documentVocabulary.some(x=>/amoxicillin|oxytocin|принимайте|мг\/|\d+\s*mg/i.test([x.da,x.ru,x.exampleDa,x.exampleRu].join(' '))));
});

test('summary reconciles every source row and generated entry',()=>{
  assert.equal(documentImportSummary.importedEntries,documentVocabulary.length);
  assert.equal(documentImportSummary.needsReviewRows,documentNeedsReview.length);
  assert.equal(documentImportSummary.documents.length,2);
  assert.equal(documentSourceAudit.length,documentImportSummary.sourceRows);
  assert.equal(new Set(documentSourceAudit.map(x=>`${x.sourceDocument}:${x.sourceRow}`)).size,documentSourceAudit.length);
  assert.ok(documentVocabulary.every(x=>documentSourceAudit.some(a=>a.sourceDocument===x.sourceDocument&&a.sourceRow===x.sourceRow&&a.status==='added')));
  for(const doc of documentImportSummary.documents){
    assert.equal(doc.dataRows,doc.addedRows+doc.duplicateRows+doc.needsReviewRows+doc.excludedRows);
    assert.equal(doc.importedEntries,documentVocabulary.filter(x=>x.sourceDocument===doc.sourceDocument).length);
  }
});
