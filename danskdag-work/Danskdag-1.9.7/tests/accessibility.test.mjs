import test from 'node:test';
import assert from 'node:assert/strict';
import {describeFocus,selectorFor,pickFocusTarget,captureFocus,restoreFocus,focusPageStart,pageTitle,createAnnouncer,debounce} from '../dist/accessibility.mjs';

const fake=(tag,dataset={},extra={})=>({tagName:tag.toUpperCase(),dataset,id:'',disabled:false,getAttribute(){return null;},closest(){return null;},focus(){this.focused=true;},...extra});

test('controls are described by id or by their data identity, never by position in the page',()=>{
  assert.deepEqual(describeFocus(fake('input',{},{id:'word-search'})),{tag:'input',id:'word-search'});
  assert.deepEqual(describeFocus(fake('button',{action:'choose',value:'en bil'})),{tag:'button',data:{action:'choose',value:'en bil'}});
  assert.deepEqual(describeFocus(fake('button',{action:'add-token',source:'bank',pos:'3'})).data,{action:'add-token',pos:'3',source:'bank'});
  assert.equal(describeFocus(fake('div')),null);
  assert.equal(describeFocus(fake('body',{action:'x'})),null);
  assert.equal(describeFocus(null),null);
});

test('selectors escape quotes and use kebab-case data attributes',()=>{
  assert.equal(selectorFor({tag:'button',data:{action:'choose',value:'say "hi"\\'}}),'button[data-action="choose"][data-value="say \\"hi\\"\\\\"]');
  assert.equal(selectorFor({tag:'button',data:{cardAction:'word-detail',id:'a'}}),'button[data-card-action="word-detail"][data-id="a"]');
  assert.equal(selectorFor({tag:'input',id:'a b'}),'#a\\ b');
  assert.equal(selectorFor(null),'');
});

test('the same control gets focus back; otherwise a neighbour in its group; otherwise nothing',()=>{
  const a=fake('button'),b=fake('button'),c=fake('button',{},{disabled:true});
  assert.equal(pickFocusTarget({matches:[a,b],nth:1}),b);
  assert.equal(pickFocusTarget({matches:[a,c],nth:1}),a);
  assert.equal(pickFocusTarget({matches:[c],nth:0,neighbours:[c,a,b],neighbourIndex:0}),a);
  assert.equal(pickFocusTarget({matches:[],neighbours:[a,b],neighbourIndex:5}),b);
  assert.equal(pickFocusTarget({matches:[],neighbours:[c]}),null);
  assert.equal(pickFocusTarget({}),null);
  const hidden=fake('button',{},{closest:sel=>/hidden|inert/.test(sel)?{}:null});
  assert.equal(pickFocusTarget({matches:[hidden]}),null);
});

test('focus survives a redraw: a chosen option, a used token and a removed token',()=>{
  const bank=[0,1,2].map(pos=>fake('button',{action:'add-token',source:'bank',pos:String(pos)}));
  const zone=fake('div'),bankBox=fake('div');
  const makeRoot=(buttons,groups)=>({
    contains:el=>buttons.includes(el),
    querySelectorAll:selector=>{
      if(groups[selector])return groups[selector];
      return buttons.filter(button=>selectorFor(describeFocus(button))===selector);
    }
  });
  for(const button of bank)button.closest=sel=>sel==='.token-bank'?bankBox:null;
  const speakers=[0,1,2].map(pos=>fake('button',{action:'speak-text',text:'w'+pos}));
  bankBox.querySelectorAll=()=>[bank[0],speakers[0],bank[1],speakers[1],bank[2],speakers[2]];
  const before=makeRoot(bank,{'.token-bank':[bankBox]});
  const saved=captureFocus(before,bank[1]);
  assert.equal(saved.selector,'button[data-action="add-token"][data-pos="1"][data-source="bank"]');
  assert.equal(saved.group,'.token-bank');assert.equal(saved.neighbourIndex,1);assert.equal(saved.action,'add-token');
  // Redraw: token 1 is now used (disabled), the other two are fresh elements.
  const after=[0,1,2].map(pos=>fake('button',{action:'add-token',source:'bank',pos:String(pos)},{disabled:pos===1}));
  const afterSpeakers=[0,1,2].map(pos=>fake('button',{action:'speak-text',text:'w'+pos}));
  const afterBox={querySelectorAll:()=>[after[0],afterSpeakers[0],after[1],afterSpeakers[1],after[2],afterSpeakers[2]]};
  const target=restoreFocus(makeRoot(after,{'.token-bank':[afterBox]}),saved);
  assert.equal(target,after[2]);assert.equal(after[2].focused,true);
  // An option that is still there is focused directly.
  const option=fake('button',{action:'choose',value:'en bil'}),freshOption=fake('button',{action:'choose',value:'en bil'});
  const savedOption=captureFocus(makeRoot([option],{}),option);
  assert.equal(restoreFocus(makeRoot([freshOption],{}),savedOption),freshOption);
  assert.equal(captureFocus(makeRoot([option],{}),fake('button',{action:'x'})),null);
  assert.equal(restoreFocus(makeRoot([],{}),savedOption),null);
  assert.equal(restoreFocus(null,savedOption),null);
});

test('text fields keep their caret across a redraw',()=>{
  const input=fake('input',{},{id:'word-search',selectionStart:3,selectionEnd:5});
  const root={contains:()=>true,querySelectorAll:()=>[input]};
  const saved=captureFocus(root,input);
  assert.deepEqual(saved.selection,[3,5]);
  const fresh=fake('input',{},{id:'word-search',setSelectionRange(a,b){this.range=[a,b];}});
  restoreFocus({querySelectorAll:()=>[fresh]},saved);
  assert.deepEqual(fresh.range,[3,5]);
});

test('a page change moves focus to the page heading, or to the content area',()=>{
  const heading=fake('h1',{},{hasAttribute:()=>false,setAttribute(name,value){this[name]=value;}});
  const content=fake('main',{},{querySelector:sel=>sel==='h1'||sel==='.x h1'?heading:null,hasAttribute:()=>true});
  assert.equal(focusPageStart(content),heading);assert.equal(focusPageStart(content,'.x h1'),heading);assert.equal(focusPageStart(content,'h5'),content);assert.equal(heading.tabindex,'-1');assert.equal(heading.focused,true);
  const bare=fake('main',{},{querySelector:()=>null,hasAttribute:()=>true});
  assert.equal(focusPageStart(bare),bare);assert.equal(bare.focused,true);
  assert.equal(focusPageStart(null),null);
  assert.equal(pageTitle('Маршрут'),'Danskdag — Маршрут');
  assert.equal(pageTitle(''),'Danskdag');
});

test('announcements replace the content of one permanent polite region',async()=>{
  const body=[];
  const doc={body:{append:el=>{body.push(el);el.isConnected=true;}},createElement:()=>({attrs:{},setAttribute(k,v){this.attrs[k]=v;},textContent:''})};
  const announcer=createAnnouncer(doc);
  announcer.say('Верно.   Молодец');
  await new Promise(resolve=>setTimeout(resolve,90));
  assert.equal(body.length,1);assert.equal(body[0].textContent,'Верно. Молодец');
  assert.equal(body[0].attrs.role,'status');assert.equal(body[0].attrs['aria-live'],'polite');
  announcer.say('Верно. Молодец');
  assert.equal(body[0].textContent,'');
  await new Promise(resolve=>setTimeout(resolve,90));
  assert.equal(body[0].textContent,'Верно. Молодец');assert.equal(body.length,1);
  announcer.clear();assert.equal(body[0].textContent,'');
});

test('debounce runs once after the last call and can be cancelled or flushed',()=>{
  let now=0;const timers=new Map();let seq=0;
  const schedule=(fn,wait)=>{const id=++seq;timers.set(id,{fn,at:now+wait});return id;};
  const cancel=id=>timers.delete(id);
  const tick=ms=>{now+=ms;for(const [id,t] of [...timers])if(t.at<=now){timers.delete(id);t.fn();}};
  const calls=[];const run=debounce(value=>calls.push(value),120,schedule,cancel);
  run('a');tick(100);run('ab');tick(100);assert.deepEqual(calls,[]);tick(30);assert.deepEqual(calls,['ab']);
  run('c');run.cancel();tick(500);assert.deepEqual(calls,['ab']);
  run('d');assert.equal(run.pending(),true);run.flush('d');assert.deepEqual(calls,['ab','d']);assert.equal(run.pending(),false);
});
