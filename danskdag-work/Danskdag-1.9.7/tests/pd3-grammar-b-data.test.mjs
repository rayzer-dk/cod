import test from 'node:test';
import assert from 'node:assert/strict';
import {grammarCategories,grammarSetsB} from '../dist/pd3-grammar-b-data.mjs';

const cyrillic=/[А-Яа-яЁёІіЇїЄєҐґ]/;
const isText=value=>typeof value==='string'&&value.trim().length>0;
const categoryIds=['v2','bisaet','passive','tenses','relative','connect','prep','agree','reflex','modal','compare','cond'];
const items=grammarSetsB.flatMap(set=>set.items);
const words=text=>text.toLowerCase().replace(/[^\p{L}\p{N}\s]/gu,' ').split(/\s+/).filter(Boolean);
const norm=text=>text.toLowerCase().replace(/[.!?]+$/,'').trim();

test('categories follow the contract order with Russian titles and tips',()=>{
  assert.deepEqual(grammarCategories.map(c=>c.id),categoryIds);
  for(const c of grammarCategories){
    assert.ok(isText(c.title)&&cyrillic.test(c.title),c.id+' title');
    assert.ok(isText(c.tip)&&cyrillic.test(c.tip),c.id+' tip');
    assert.ok(c.tip.length>80,c.id+' tip too short');
  }
});

test('sets gram-7..gram-12 have ten items with the required type mix',()=>{
  assert.deepEqual(grammarSetsB.map(s=>s.id),['gram-7','gram-8','gram-9','gram-10','gram-11','gram-12']);
  for(const [index,set] of grammarSetsB.entries()){
    const number=index+7;
    assert.ok(isText(set.title)&&!cyrillic.test(set.title),set.id+' title');
    assert.equal(set.level,'B2');
    assert.equal(set.minutes,15);
    assert.equal(set.items.length,10,set.id);
    const count=type=>set.items.filter(i=>i.type===type).length;
    assert.deepEqual([count('gap'),count('fix'),count('transform'),count('order'),count('cloze')],[3,2,2,2,1],set.id+' type mix');
    set.items.forEach((item,i)=>assert.equal(item.id,'g'+number+'-'+String(i+1).padStart(2,'0')));
    const cats=new Set(set.items.map(i=>i.cat));
    assert.ok(cats.size>=6,set.id+' categories');
  }
});

test('item ids unique, categories valid, every category appears at least five times',()=>{
  const ids=items.map(i=>i.id);
  assert.equal(new Set(ids).size,ids.length);
  const counts=Object.fromEntries(categoryIds.map(id=>[id,0]));
  for(const item of items){
    assert.ok(categoryIds.includes(item.cat),item.id+' cat');
    counts[item.cat]++;
    assert.ok(isText(item.why)&&cyrillic.test(item.why),item.id+' why');
  }
  for(const id of categoryIds)assert.ok(counts[id]>=5,id+' count '+counts[id]);
});

const checkOptions=(item,options,answer,label)=>{
  assert.equal(options.length,4,label+' options');
  assert.equal(new Set(options.map(o=>o.toLowerCase())).size,4,label+' duplicate options');
  for(const o of options)assert.ok(isText(o)&&!cyrillic.test(o),label+' option text');
  assert.ok(Number.isInteger(answer)&&answer>=0&&answer<4,label+' answer range');
};

test('gap items',()=>{
  for(const item of items.filter(i=>i.type==='gap')){
    assert.equal(item.stem.split('___').length,2,item.id+' exactly one gap');
    assert.ok(!cyrillic.test(item.stem),item.id);
    checkOptions(item,item.options,item.answer,item.id);
  }
});

test('fix items',()=>{
  for(const item of items.filter(i=>i.type==='fix')){
    assert.ok(!cyrillic.test(item.sentence),item.id);
    const tokens=item.sentence.split(' ');
    assert.ok(Number.isInteger(item.errorIndex)&&item.errorIndex>=0&&item.errorIndex<tokens.length,item.id+' errorIndex');
    assert.ok(Array.isArray(item.fixes)&&item.fixes.length>0,item.id+' fixes');
    for(const fix of item.fixes){
      assert.ok(isText(fix)&&!cyrillic.test(fix),item.id+' fix text');
      const fixed=tokens.map((t,i)=>i===item.errorIndex?fix:t).join(' ');
      assert.notEqual(fixed,item.sentence,item.id+' fix equals original');
    }
  }
});

test('transform items',()=>{
  for(const item of items.filter(i=>i.type==='transform')){
    assert.ok(isText(item.prompt)&&!cyrillic.test(item.prompt),item.id+' prompt');
    assert.ok(isText(item.instruction)&&cyrillic.test(item.instruction),item.id+' instruction');
    assert.ok(item.answers.length>=1&&item.answers.length<=4,item.id+' answers');
    assert.equal(new Set(item.answers.map(norm)).size,item.answers.length,item.id+' duplicate answers');
    for(const a of item.answers){
      assert.ok(isText(a)&&!cyrillic.test(a),item.id);
      assert.notEqual(norm(a),norm(item.prompt),item.id+' answer equals prompt');
    }
  }
});

test('order items',()=>{
  for(const item of items.filter(i=>i.type==='order')){
    assert.ok(item.tokens.length>=5&&item.tokens.length<=12,item.id+' token count');
    for(const t of item.tokens)assert.ok(isText(t)&&!/\s/.test(t)&&!cyrillic.test(t),item.id+' token');
    assert.ok(item.answers.length>=1,item.id);
    const expected=words(item.tokens.join(' ')).sort().join('|');
    assert.equal(new Set(item.answers.map(norm)).size,item.answers.length,item.id+' duplicate answers');
    for(const a of item.answers){
      assert.ok(!cyrillic.test(a),item.id);
      assert.equal(words(a).sort().join('|'),expected,item.id+' answer tokens differ: '+a);
    }
  }
});

test('cloze items',()=>{
  for(const item of items.filter(i=>i.type==='cloze')){
    const gaps=item.segments.filter(s=>typeof s==='object');
    assert.ok(gaps.length>=4&&gaps.length<=5,item.id+' gap count');
    assert.deepEqual(gaps.map(g=>g.gap),gaps.map((g,i)=>i+1),item.id+' gap numbers');
    for(const g of gaps)checkOptions(item,g.options,g.answer,item.id+' gap'+g.gap);
    const text=item.segments.map(s=>typeof s==='string'?s:'x').join('');
    assert.ok(!cyrillic.test(text),item.id);
    const count=text.split(/\s+/).filter(Boolean).length;
    assert.ok(count>=50&&count<=90,item.id+' word count '+count);
  }
});

test('no repeated sentences and Danish fields have no Cyrillic',()=>{
  const seen=new Map();
  const add=(text,id)=>{
    const key=norm(text);
    assert.ok(!seen.has(key),'repeated sentence '+text+' in '+id+' and '+seen.get(key));
    seen.set(key,id);
  };
  for(const item of items){
    if(item.type==='gap')add(item.stem,item.id);
    if(item.type==='fix')add(item.sentence,item.id);
    if(item.type==='transform')add(item.prompt,item.id);
    if(item.type==='order')add(item.answers[0],item.id);
    if(item.type==='cloze')add(item.segments.filter(s=>typeof s==='string').join('|'),item.id);
  }
});

test('answer positions spread within each set (at most 40% on one position)',()=>{
  for(const set of grammarSetsB){
    const positions=[];
    for(const item of set.items){
      if(item.type==='gap')positions.push(item.answer);
      if(item.type==='cloze')for(const g of item.segments.filter(s=>typeof s==='object'))positions.push(g.answer);
    }
    for(let p=0;p<4;p++){
      const share=positions.filter(x=>x===p).length/positions.length;
      assert.ok(share<=0.4,set.id+' position '+p+' share '+share);
    }
  }
});
