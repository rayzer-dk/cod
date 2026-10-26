import test from 'node:test';
import assert from 'node:assert/strict';
import {createState} from '../dist/engine.mjs';

// D1 executes each statement atomically: concurrent inserts and CAS updates are
// decided at execution time, rather than at prepare time.
class AtomicDB {
  rows = new Map();
  statements = [];
  prepare(sql) {
    assert.equal(sql.includes(';'), false, 'one SQL statement per prepare');
    assert.equal(/\b(?:CREATE|ALTER|DROP)\b/i.test(sql), false, 'no request-time schema changes');
    this.statements.push(sql);
    return {bind:(...params)=>({first:async()=> {
      if (/^INSERT/i.test(sql.trim())) {
        const [user_id,state_json,updated_at]=params;
        if(this.rows.has(user_id)) return null;
        const row={user_id,state_json,revision:1,updated_at};this.rows.set(user_id,row);return {...row};
      }
      if (/^UPDATE/i.test(sql.trim())) {
        const [state_json,updated_at,user_id,revision]=params, old=this.rows.get(user_id);
        if(!old || old.revision!==revision) return null;
        const row={user_id,state_json,updated_at,revision:old.revision+1};this.rows.set(user_id,row);return {...row};
      }
      assert.match(sql,/^SELECT/i);
      const row=this.rows.get(params[0]);return row?{...row}:null;
    }})};
  }
}
const api = async()=> (await import('../worker/progress.mjs')).handleProgress;
const request = (user='owner',body,headers={})=>new Request('https://danskdag.test/api/progress',{
  method:body===undefined?'GET':'PUT',headers:{...(user?{'oai-authenticated-user-id':user}:{}),...(body===undefined?{}:{'content-type':'application/json','origin':'https://danskdag.test'}),...headers},...(body===undefined?{}:{body:typeof body==='string'?body:JSON.stringify(body)})
});
const unpack=async response=>({status:response.status,body:await response.json(),headers:response.headers});

test('progress API requires trusted Site identity, checks origin, and never enables CORS', async()=>{
  const handle=await api(), DB=new AtomicDB();
  assert.equal((await handle(request(null),{DB})).status,401);
  assert.equal((await handle(request(),{})).status,503);
  for(const method of ['GET','PUT']) {
    const res=await handle(new Request('https://danskdag.test/api/progress',{method,headers:{'oai-authenticated-user-id':'owner',origin:'https://evil.test'}}),{DB});
    assert.equal(res.status,403);
    assert.equal(res.headers.get('access-control-allow-origin'),null);
    assert.match(res.headers.get('cache-control'),/private.*no-store/);
  }
  assert.equal((await handle(new Request('https://danskdag.test/api/progress',{method:'OPTIONS',headers:{'oai-authenticated-user-id':'owner'}}),{DB})).status,405);
});

test('new owner progress persists, round trips unknown IDs, and remains identity scoped',async()=>{
  const handle=await api(),DB=new AtomicDB(),state=createState();
  state.xp=70;state.completed['retired-lesson']={best:70,attempts:2};state.bookmarks=['retired-word'];
  assert.deepEqual((await unpack(await handle(request(),{DB}))).body,{revision:0,state:null,updatedAt:null});
  const saved=await unpack(await handle(request('owner',{revision:0,state}),{DB}));
  assert.equal(saved.status,200);assert.equal(saved.body.revision,1);assert.deepEqual(saved.body.state,state);assert.ok(Date.parse(saved.body.updatedAt));
  assert.deepEqual((await unpack(await handle(request(),{DB}))).body,saved.body);
  assert.deepEqual((await unpack(await handle(request('someone-else'),{DB}))).body,{revision:0,state:null,updatedAt:null});
  const second=await unpack(await handle(request('someone-else',{revision:0,state:{...state,xp:10}}),{DB}));
  assert.equal(second.body.revision,1);
  assert.equal((await unpack(await handle(request(),{DB}))).body.state.xp,70);
  assert.ok(DB.statements.every(sql=>sql.includes('?')));
});

test('simultaneous first writes and subsequent writes use atomic compare-and-swap',async()=>{
  const handle=await api(),DB=new AtomicDB();
  let writes=await Promise.all([10,20].map(xp=>handle(request('owner',{revision:0,state:{...createState(),xp}}),{DB}).then(unpack)));
  assert.deepEqual(writes.map(r=>r.status).sort(),[200,409]);
  const first=writes.find(r=>r.status===200).body, rejected=writes.find(r=>r.status===409).body;
  assert.equal(rejected.revision,1);assert.deepEqual(rejected.state,first.state);
  writes=await Promise.all([30,40].map(xp=>handle(request('owner',{revision:1,state:{...createState(),xp}}),{DB}).then(unpack)));
  assert.deepEqual(writes.map(r=>r.status).sort(),[200,409]);
  assert.equal(writes.find(r=>r.status===409).body.revision,2);
  assert.equal(DB.rows.size,1);
});

test('malformed, unsupported and oversized progress cannot erase a saved state',async()=>{
  const handle=await api(),DB=new AtomicDB(),state={...createState(),xp:50};
  await handle(request('owner',{revision:0,state}),{DB});
  for(const body of ['{',null,[],{}, {revision:-1,state},{revision:'1',state},{revision:1.1,state},{revision:1,state:{...state,xp:-1}},{revision:1,state:{...state,bookmarks:['__proto__']}}]) {
    assert.equal((await handle(request('owner',body===null?'null':body),{DB})).status,400);
  }
  assert.equal((await handle(request('owner',{revision:1,state},{'content-type':'text/plain'}),{DB})).status,400);
  assert.equal((await handle(request('owner',' '.repeat(3*1024*1024+1)),{DB})).status,400);
  assert.deepEqual((await unpack(await handle(request(),{DB}))).body.state,state);
});
