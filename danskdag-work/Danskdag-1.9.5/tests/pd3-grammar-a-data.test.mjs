import test from 'node:test';
import assert from 'node:assert/strict';
import {grammarSetsA} from '../dist/pd3-grammar-a-data.mjs';

const cyrillic=/[А-Яа-яЁёІіЇїЄєҐґ]/;
const categories=['v2','bisaet','passive','tenses','relative','connect','prep','agree','reflex','modal','compare','cond'];
const isText=value=>typeof value==='string'&&value.trim().length>0;
const norm=text=>text.toLowerCase().replace(/[.!?]+$/,'').trim();
const sortedTokens=text=>text.toLowerCase().split(' ').sort();
const allItems=()=>grammarSetsA.flatMap(set=>set.items);

test('grammar sets A have the contract structure',()=>{
  assert.equal(grammarSetsA.length,6);
  grammarSetsA.forEach((set,index)=>{
    assert.equal(set.id,'gram-'+(index+1));
    assert.ok(isText(set.title)&&!cyrillic.test(set.title),set.id+' title');
    assert.equal(set.level,'B2');
    assert.ok(Number.isInteger(set.minutes)&&set.minutes>0);
    assert.equal(set.items.length,10,set.id);
    const count=type=>set.items.filter(item=>item.type===type).length;
    assert.deepEqual([count('gap'),count('fix'),count('transform'),count('order'),count('cloze')],[3,2,2,2,1],set.id+' type mix');
    assert.ok(new Set(set.items.map(item=>item.cat)).size>=6,set.id+' categories');
    const positions=set.items.flatMap(item=>item.type==='gap'?[item.answer]:item.type==='cloze'?item.segments.filter(s=>typeof s==='object').map(s=>s.answer):[]);
    for(let p=0;p<4;p++)assert.ok(positions.filter(x=>x===p).length/positions.length<=0.4,set.id+' answer position '+p+' overused');
  });
});

test('ids are unique and categories are known and balanced',()=>{
  const items=allItems(),ids=items.map(item=>item.id);
  assert.equal(new Set(ids).size,ids.length);
  grammarSetsA.forEach((set,index)=>set.items.forEach(item=>assert.match(item.id,new RegExp('^g'+(index+1)+'-\\d\\d$'))));
  for(const item of items)assert.ok(categories.includes(item.cat),item.id+' cat');
  for(const cat of categories)assert.ok(items.filter(item=>item.cat===cat).length>=5,cat+' coverage');
});

test('every item has a Russian explanation and Danish-only content fields',()=>{
  for(const item of allItems()){
    assert.ok(isText(item.why)&&cyrillic.test(item.why),item.id+' why');
    const danish=[item.stem,item.sentence,item.prompt,...(item.options||[]),...(item.fixes||[]),...(item.answers||[]),...(item.tokens||[])].filter(v=>v!==undefined);
    for(const value of danish)assert.ok(isText(value)&&!cyrillic.test(value),item.id+' danish '+value);
    if(item.type==='transform')assert.ok(isText(item.instruction)&&cyrillic.test(item.instruction),item.id+' instruction');
  }
});

test('gap items have one blank, four distinct options and a valid answer',()=>{
  for(const item of allItems().filter(item=>item.type==='gap')){
    assert.equal(item.stem.split('___').length,2,item.id);
    assert.equal(item.options.length,4,item.id);
    assert.equal(new Set(item.options.map(o=>o.toLowerCase())).size,4,item.id);
    assert.ok(Number.isInteger(item.answer)&&item.answer>=0&&item.answer<4,item.id);
    assert.equal(new Set(item.options.map(o=>item.stem.replace('___',o))).size,4);
  }
});

test('fix items point at a real token and a fix changes the sentence',()=>{
  for(const item of allItems().filter(item=>item.type==='fix')){
    const tokens=item.sentence.split(' ');
    assert.ok(Number.isInteger(item.errorIndex)&&item.errorIndex>=0&&item.errorIndex<tokens.length,item.id);
    assert.ok(Array.isArray(item.fixes)&&item.fixes.length>0,item.id);
    for(const fix of item.fixes){
      assert.ok(isText(fix)&&!/\s/.test(fix),item.id+' fix is one token');
      assert.notEqual(fix.toLowerCase(),tokens[item.errorIndex].toLowerCase(),item.id+' fix equals error');
    }
    const fixed=[...tokens];fixed[item.errorIndex]=item.fixes[0];
    assert.notEqual(fixed.join(' '),item.sentence,item.id);
  }
});

test('transform items list 2-4 distinct accepted rewrites',()=>{
  for(const item of allItems().filter(item=>item.type==='transform')){
    assert.ok(item.answers.length>=2&&item.answers.length<=4,item.id);
    assert.equal(new Set(item.answers.map(norm)).size,item.answers.length,item.id);
    assert.ok(!item.answers.some(a=>norm(a)===norm(item.prompt)),item.id+' unchanged');
  }
});

test('order items use exactly the shown tokens in every answer',()=>{
  for(const item of allItems().filter(item=>item.type==='order')){
    assert.ok(item.tokens.length>=5&&item.tokens.length<=12,item.id);
    assert.ok(item.answers.length>=1);
    const expected=[...item.tokens].map(t=>t.toLowerCase()).sort();
    for(const answer of item.answers)assert.deepEqual(sortedTokens(answer),expected,item.id+' '+answer);
    assert.ok(!item.answers.some(a=>a.toLowerCase()===item.tokens.join(' ').toLowerCase()),item.id+' already ordered');
    assert.equal(new Set(item.answers.map(norm)).size,item.answers.length,item.id);
  }
});

test('cloze items have 4-5 consecutive gaps with four options',()=>{
  for(const item of allItems().filter(item=>item.type==='cloze')){
    const gaps=item.segments.filter(s=>typeof s==='object');
    assert.ok(gaps.length>=4&&gaps.length<=5,item.id);
    gaps.forEach((gap,index)=>{
      assert.equal(gap.gap,index+1,item.id);
      assert.equal(gap.options.length,4,item.id);
      assert.equal(new Set(gap.options.map(o=>o.toLowerCase())).size,4,item.id);
      assert.ok(Number.isInteger(gap.answer)&&gap.answer>=0&&gap.answer<4,item.id);
      assert.ok(isText(gap.options.join('')));
    });
    for(const s of item.segments)if(typeof s==='string')assert.ok(!cyrillic.test(s));
    const text=item.segments.map(s=>typeof s==='string'?s:'x').join('');
    const words=text.split(/\s+/).filter(Boolean).length;
    assert.ok(words>=50&&words<=90,item.id+' words '+words);
  }
});

test('no sentence is repeated between items or sets',()=>{
  const seen=new Map();
  const add=(text,id)=>{const key=norm(text);assert.ok(!seen.has(key),id+' repeats '+seen.get(key)+': '+text);seen.set(key,id);};
  for(const item of allItems()){
    if(item.type==='gap')add(item.stem,item.id);
    if(item.type==='fix')add(item.sentence,item.id);
    if(item.type==='transform')add(item.prompt,item.id);
    if(item.type==='order')add(item.answers[0],item.id);
  }
});
