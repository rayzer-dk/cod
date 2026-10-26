import {validateState} from '../dist/engine.mjs';

const MAX_BYTES=3*1024*1024;
const validRevision=value=>Number.isSafeInteger(value) && value>=0;
const json=(body,status=200)=>Response.json(body,{status,headers:{'cache-control':'private, no-store','x-content-type-options':'nosniff','vary':'Cookie, oai-authenticated-user-id'}});
const snapshot=row=>row?{revision:row.revision,state:validateState(JSON.parse(row.state_json)),updatedAt:row.updated_at}:{revision:0,state:null,updatedAt:null};

async function readBody(request) {
  if(!/^application\/json(?:\s*;|$)/i.test(request.headers.get('content-type')||''))throw new Error('invalid');
  const declared=request.headers.get('content-length');
  if(declared && (!/^\d+$/.test(declared) || Number(declared)>MAX_BYTES))throw new Error('invalid');
  if(!request.body)throw new Error('invalid');
  const reader=request.body.getReader(), chunks=[];let length=0;
  try {
    while(true) {
      const {done,value}=await reader.read();if(done)break;
      length+=value.byteLength;
      if(length>MAX_BYTES){await reader.cancel();throw new Error('invalid');}
      chunks.push(value);
    }
  } finally {reader.releaseLock();}
  const bytes=new Uint8Array(length);let offset=0;
  for(const chunk of chunks){bytes.set(chunk,offset);offset+=chunk.byteLength;}
  return JSON.parse(new TextDecoder('utf-8',{fatal:true}).decode(bytes));
}

export async function handleProgress(request,env) {
  const origin=request.headers.get('origin'),site=request.headers.get('sec-fetch-site');
  if((origin && origin!==new URL(request.url).origin) || site==='cross-site')return json({error:'Wrong origin.'},403);
  const user=request.headers.get('oai-authenticated-user-id');
  if(!user?.trim())return json({error:'Sign in to this Site to sync progress.'},401);
  if(!['GET','PUT'].includes(request.method))return json({error:'Method not allowed.'},405);
  if(!env?.DB?.prepare)return json({error:'Progress sync is temporarily unavailable.'},503);
  let body,state;
  if(request.method==='PUT') {
    try {
      body=await readBody(request);
      if(!body || typeof body!=='object' || Array.isArray(body) || !validRevision(body.revision) || Object.keys(body).some(key=>!['revision','state'].includes(key)))throw new Error('invalid');
      state=validateState(body.state);
    } catch {return json({error:'Invalid progress. Nothing was replaced.'},400);}
  }
  try {
    const db=env.DB.withSession?env.DB.withSession('first-primary'):env.DB;
    const read=()=>db.prepare('SELECT state_json, revision, updated_at FROM learner_progress WHERE user_id = ?').bind(user).first();
    if(request.method==='GET')return json(snapshot(await read()));
    const serialized=JSON.stringify(state),updatedAt=new Date().toISOString();
    const row=body.revision===0
      ?await db.prepare('INSERT INTO learner_progress (user_id, state_json, revision, updated_at) VALUES (?, ?, 1, ?) ON CONFLICT(user_id) DO NOTHING RETURNING state_json, revision, updated_at').bind(user,serialized,updatedAt).first()
      :await db.prepare('UPDATE learner_progress SET state_json = ?, revision = revision + 1, updated_at = ? WHERE user_id = ? AND revision = ? RETURNING state_json, revision, updated_at').bind(serialized,updatedAt,user,body.revision).first();
    return row?json(snapshot(row)):json(snapshot(await read()),409);
  } catch {return json({error:'Progress sync is temporarily unavailable. Your device copy is safe.'},503);}
}
