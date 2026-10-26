import test from 'node:test';
import assert from 'node:assert/strict';
import * as reference from '../dist/reference-tools.mjs';
test('topic practice uses the entire filtered category and query independently of the visible page',()=>{
 assert.equal(typeof reference.referenceSelection,'function');
 const rows=Array.from({length:25},(_,i)=>({id:`daily-${i}`,da:'en billet '+i,ru:'билет',category:i===24?'home':'travel'}));
 const c={referenceTab:'daily',referenceCategory:'travel',referenceQuery:'билет',referencePage:3,referenceData:{daily:rows,dailyCategories:[{id:'home',title:'Дом'},{id:'travel',title:'Транспорт'}]}};
 const result=reference.referenceSelection(c);
 assert.equal(result.rows.length,24);
 assert.ok(result.rows.every(row=>row.category==='travel'));
 assert.equal(result.data.items.length,4);
 assert.equal(result.data.page,3);
 c.referenceQuery='not found';assert.equal(reference.referenceSelection(c).rows.length,0);
});
