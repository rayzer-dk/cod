import test from 'node:test';
import assert from 'node:assert/strict';
import {referencePage} from '../dist/reference-tools.mjs';
test('search finds a conjugated Danish form and Russian gloss then paginates without duplicates',()=>{
 const rows=Array.from({length:45},(_,i)=>({id:String(i),infinitive:'arbejde'+i,past:'arbejdede'+i,ru:'работать'}));
 assert.equal(referencePage(rows,'arbejdede13',1).items[0].id,'13');
 const first=referencePage(rows,'работать',1),second=referencePage(rows,'работать',2),last=referencePage(rows,'работать',99);
 assert.equal(first.items.length,20);assert.equal(second.items.length,20);assert.equal(last.page,3);assert.equal(last.items.length,5);
 assert.equal(new Set([...first.items,...second.items,...last.items].map(r=>r.id)).size,45);
 assert.equal(referencePage(rows,'not present',1).total,0);
});
test('verb search includes the exact displayed perfect and pluperfect forms for both auxiliaries',()=>{
 const rows=[{id:'a',infinitive:'arbejde',participle:'arbejdet',auxiliary:'har'},{id:'b',infinitive:'komme',participle:'kommet',auxiliary:'er'},{id:'c',infinitive:'køre',participle:'kørt',auxiliary:'har/er'}];
 for(const [query,id]of[['har arbejdet','a'],['havde arbejdet','a'],['var kommet','b'],['er kørt','c'],['havde kørt','c']])assert.equal(referencePage(rows,query).items[0]?.id,id);
});
test('reference search matches visible text instead of opaque IDs and metadata',()=>{
 const rows=[{id:'secret-hidden-id',category:'internal-group',da:'en bog',ru:'книга',forms:[{label:'Множественное',da:'bøger'}]}];
 assert.equal(referencePage(rows,'hidden-id').total,0);
 assert.equal(referencePage(rows,'internal-group').total,0);
 assert.equal(referencePage(rows,'bøger').total,1);
});
