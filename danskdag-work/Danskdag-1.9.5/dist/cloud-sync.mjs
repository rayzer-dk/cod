import {createState,validateState} from './engine.mjs';
import {pushCopy} from './recovery.mjs';

const META='danskdag.cloud.v1',RECOVERY='danskdag.cloud.recovery.v1',HISTORY='danskdag.cloud.recovery.history.v1',HISTORY_COPIES=2;
const copy=value=>structuredClone(value);
const revision=value=>Number.isSafeInteger(value) && value>=0;
const canonical=value=>JSON.stringify(value,(_,item)=>item && typeof item==='object' && !Array.isArray(item)?Object.fromEntries(Object.keys(item).sort().map(key=>[key,item[key]])):item);
const equal=(a,b)=>canonical(a)===canonical(b);
/** Device versions that were replaced or set aside, newest first (at most three: the latest record plus two older ones). */
export function listCloudCopies(storage) {
  if(!storage)try{storage=globalThis.localStorage;}catch{return [];}
  const found=[];
  const add=(item)=>{
    try{
      const local=validateState(item.local);
      if(!found.some(other=>equal(other.local,local)))found.push({id:found.length,savedAt:typeof item.savedAt==='string'?item.savedAt:null,reason:item.reason||'',local});
    }catch { /* An unreadable record is skipped, never repaired in place. */ }
  };
  try{const latest=JSON.parse(storage.getItem(RECOVERY)||'null');if(latest && typeof latest==='object')add(latest);}catch { /* ignored */ }
  try{const history=JSON.parse(storage.getItem(HISTORY)||'[]');if(Array.isArray(history))for(const item of history)if(item && typeof item==='object')add(item);}catch { /* ignored */ }
  return found.slice(0,HISTORY_COPIES+1);
}
async function hash(state) {
  const bytes=new TextEncoder().encode(canonical(state));
  const digest=await globalThis.crypto.subtle.digest('SHA-256',bytes);
  return [...new Uint8Array(digest)].map(byte=>byte.toString(16).padStart(2,'0')).join('');
}
function validateSnapshot(raw) {
  if(!raw || !revision(raw.revision))throw new Error('invalid-response');
  if(raw.revision===0) {
    if(raw.state!==null || raw.updatedAt!==null)throw new Error('invalid-response');
    return {revision:0,state:null,updatedAt:null};
  }
  if(typeof raw.updatedAt!=='string' || !Number.isFinite(Date.parse(raw.updatedAt)))throw new Error('invalid-response');
  return {revision:raw.revision,state:validateState(raw.state),updatedAt:raw.updatedAt};
}

/** Local progress remains owned by the app. Call changed() after persisting it.
 * onRemote is synchronous and must persist the supplied state before returning.
 * No lesson/session storage is read, cleared, or rewritten by this module. */
export function createCloudSync(options) {
  const {getState,onRemote=()=>{},onStatus=()=>{},onConflict=()=>{},canApply=()=>true}=options;
  const fetcher=options.fetch || globalThis.fetch.bind(globalThis);
  let storage=options.storage;
  if(!storage)try{storage=globalThis.localStorage;}catch{ /* Storage may be disabled by the browser. */ }
  const events=options.events || globalThis.window;
  const endpoint=options.endpoint || '/api/progress',debounceMs=options.debounceMs??700,pollMs=options.pollMs??60000;
  let meta={version:1,revision:0,baseHash:null,updatedAt:null,pending:false};
  let conflict=null,deferred=null,started=false,stopped=false,timer=null,poll=null,task=null,wanted=false,needPull=true;
  let current={phase:'connecting',revision:0,updatedAt:null};
  let storageFailed=false;
  let lastSeen=canonical(validateState(getState()));
  try {
    const saved=JSON.parse(storage?.getItem(META)||'null');
    if(saved?.version===1 && revision(saved.revision) && (saved.baseHash===null || /^[a-f0-9]{64}$/.test(saved.baseHash)) && typeof saved.pending==='boolean')meta={...meta,...saved};
    const recovery=JSON.parse(storage?.getItem(RECOVERY)||'null');
    if(recovery?.unresolved===true) {
      const remote=validateSnapshot({revision:recovery.revision,state:recovery.remote,updatedAt:recovery.updatedAt});
      conflict={revision:remote.revision,updatedAt:remote.updatedAt,local:validateState(recovery.local),remote:remote.state,reason:recovery.reason||'concurrent-change'};
    }
  } catch { /* Corrupt sync metadata never replaces the application's progress. */ }
  function notify(phase,message) {
    current={phase,hasConflict:!!conflict,revision:meta.revision,updatedAt:meta.updatedAt,...(message?{message}:{}),...(storageFailed?{storageWarning:true}:{})};
    onStatus(copy(current));
  }
  function store(key,value) {
    try {if(!storage)throw new Error('storage');storage.setItem(key,JSON.stringify(value));return true;}
    catch {storageFailed=true;return false;}
  }
  const persist=()=>store(META,meta);
  function keepRecovery(snapshot,local,unresolved,reason) {
    const entry={version:1,revision:snapshot.revision,updatedAt:snapshot.updatedAt,local:copy(local),remote:copy(snapshot.state),unresolved,reason,savedAt:new Date().toISOString()};
    // Rotate instead of overwrite: the previous latest record moves into a short history (its device version only).
    try {
      const previous=JSON.parse(storage?.getItem(RECOVERY)||'null');
      if(previous?.local && !equal(previous.local,entry.local))
        pushCopy(storage,HISTORY,{savedAt:previous.savedAt||null,reason:previous.reason||'',revision:previous.revision,local:previous.local},{max:HISTORY_COPIES,same:(a,b)=>equal(a.local,b.local)});
    } catch { /* History is best effort; the latest record below is what protects the replacement. */ }
    if(store(RECOVERY,entry))return true;
    try{storage?.removeItem(HISTORY);}catch { /* ignored */ }
    return store(RECOVERY,entry);
  }
  function pause(snapshot,reason) {
    const local=validateState(getState());
    conflict={revision:snapshot.revision,updatedAt:snapshot.updatedAt,local,remote:copy(snapshot.state),reason};deferred=null;meta.pending=true;persist();
    keepRecovery(snapshot,local,true,reason);
    notify('conflict');onConflict(copy(conflict));
  }
  async function acknowledge(snapshot,state) {
    const baseHash=await hash(state),pending=!equal(validateState(getState()),state);
    meta={version:1,hashSchema:2,revision:snapshot.revision,updatedAt:snapshot.updatedAt,baseHash,pending};persist();
    if(pending)wanted=true;
  }
  async function apply(snapshot) {
    if(!canApply()){deferred={snapshot,local:validateState(getState())};notify('deferred');return;}
    const before=validateState(getState());
    // Preserve the outgoing device version before any replacement.
    const backedUp=keepRecovery(snapshot,before,false,'remote-applied');
    if(!backedUp && !equal(before,createState()))throw new Error('storage');
    if(snapshot.state!==null)onRemote(copy(snapshot.state));
    lastSeen=canonical(validateState(getState()));
    await acknowledge(snapshot,snapshot.state||before);
    deferred=null;notify('saved');
  }
  async function reconcile(snapshot) {
    const local=validateState(getState());
    if(snapshot.state===null) {
      meta.revision=0;meta.updatedAt=null;
      if(equal(local,createState()) && !meta.pending){await acknowledge(snapshot,local);notify('saved');}
      else {meta.pending=true;persist();}
      return;
    }
    if(equal(local,snapshot.state)){await acknowledge(snapshot,local);notify('saved');return;}
    const localHash=await hash(local),remoteHash=await hash(snapshot.state);
    const legacyHash=async state=>{
      if(meta.hashSchema===2||state.settings.language!=='uk')return null;
      const legacy=copy(state);delete legacy.settings.language;return hash(legacy);
    };
    const localBase=localHash===meta.baseHash||!!meta.baseHash&&await legacyHash(local)===meta.baseHash;
    const remoteBase=remoteHash===meta.baseHash||!!meta.baseHash&&await legacyHash(snapshot.state)===meta.baseHash;
    // Hashing yields to the app. Compare again before replacing anything.
    if(!equal(local,validateState(getState())))return reconcile(snapshot);
    if((!meta.baseHash && equal(local,createState())) || localBase){await apply(snapshot);return;}
    if(meta.baseHash && remoteBase){meta.revision=snapshot.revision;meta.updatedAt=snapshot.updatedAt;meta.pending=true;persist();return;}
    pause(snapshot,meta.baseHash?'concurrent-change':'first-connection');
  }
  async function fetchSnapshot(method,body) {
    const controller=new AbortController();
    const deadline=setTimeout(()=>controller.abort(),options.requestTimeoutMs??15000);
    try {
      let response;
      try {response=await fetcher(endpoint,{method,credentials:'same-origin',cache:'no-store',signal:controller.signal,headers:{accept:'application/json',...(body?{'content-type':'application/json'}:{})},...(body?{body:JSON.stringify(body)}:{})});}
      catch {throw new Error('network');}
      if(!response.ok && response.status!==409)throw new Error(response.status===401?'signin':response.status===503?'unavailable':'request');
      let snapshot;
      try{snapshot=validateSnapshot(await response.json());}catch{throw new Error(controller.signal.aborted?'network':'invalid-response');}
      return {snapshot,conflicted:response.status===409};
    } finally {clearTimeout(deadline);}
  }
  async function save() {
    const sent=validateState(getState()),sentRevision=meta.revision;notify('saving');
    const {snapshot,conflicted}=await fetchSnapshot('PUT',{revision:sentRevision,state:sent});
    if(conflicted){
      // Another tab or device saved exactly what we were sending: nothing diverged.
      if(snapshot.state!==null && equal(snapshot.state,sent)){
        await acknowledge(snapshot,sent);
        if(!equal(validateState(getState()),sent)){meta.pending=true;persist();wanted=true;notify('pending');}
        else notify('saved');
        return;
      }
      pause(snapshot,'concurrent-change');return;
    }
    if(snapshot.revision!==sentRevision+1 || !equal(snapshot.state,sent))throw new Error('invalid-response');
    await acknowledge(snapshot,sent);
    if(!equal(validateState(getState()),sent)){meta.pending=true;persist();wanted=true;notify('pending');}
    else notify('saved');
  }
  async function flush() {
    clearTimeout(timer);timer=null;
    if(stopped)return;
    if(!started)return start();
    wanted=true;
    if(task)return task;
    if(conflict){notify('conflict');return;}
    task=(async()=>{
      try {
        while(wanted && !stopped && !conflict) {
          wanted=false;
          if(deferred) {
            if(!canApply()){notify('deferred');break;}
            const waiting=deferred;deferred=null;
            if(!equal(validateState(getState()),waiting.local)){pause(waiting.snapshot,'concurrent-change');break;}
            await apply(waiting.snapshot);
          }
          if(needPull) {
            notify('connecting');const {snapshot}=await fetchSnapshot('GET');needPull=false;await reconcile(snapshot);
          }
          if(!conflict && !deferred && meta.pending)await save();
        }
      } catch(error) {
        needPull=true;
        notify(error.message==='network'?'offline':'error',error.message);
      }
    })().finally(()=>{task=null;});
    return task;
  }
  function changed() {
    if(stopped)return;
    const next=canonical(validateState(getState()));
    if(next===lastSeen)return;
    lastSeen=next;
    meta.pending=true;persist();
    if(conflict){notify('conflict');return;}
    if(deferred){notify('deferred');return;}
    notify('pending');
    clearTimeout(timer);timer=setTimeout(()=>{void flush();},debounceMs);timer.unref?.();
  }
  const refresh=()=>{needPull=true;return flush();};
  // Another tab of this browser saved newer sync metadata: adopt it so both tabs agree on the cloud revision.
  const sibling=event=>{
    if(event?.key!==META || !event.newValue)return;
    try {
      const saved=JSON.parse(event.newValue);
      if(saved?.version===1 && revision(saved.revision) && saved.revision>meta.revision && (saved.baseHash===null || /^[a-f0-9]{64}$/.test(saved.baseHash)) && typeof saved.pending==='boolean')meta={...meta,...saved};
    } catch { /* ignored */ }
  };
  /** The app replaced its progress with a newer copy written by another tab; that tab owns uploading it. */
  function rebase() {
    if(stopped)return;
    lastSeen=canonical(validateState(getState()));needPull=true;
  }
  const visibility=()=>{if(globalThis.document?.visibilityState!=='hidden')refresh();};
  async function start() {
    if(started)return flush();started=true;
    events?.addEventListener('online',refresh);events?.addEventListener('focus',refresh);events?.addEventListener('storage',sibling);
    events?.addEventListener('visibilitychange',visibility);
    if(pollMs>0){poll=setInterval(visibility,pollMs);poll.unref?.();}
    if(conflict){notify('conflict');onConflict(copy(conflict));return;}
    return flush();
  }
  async function resolve(choice) {
    if(!['local','remote'].includes(choice))throw new Error('Choose local or remote progress.');
    if(!conflict)return;
    const selected=conflict,snapshot={revision:selected.revision,state:selected.remote,updatedAt:selected.updatedAt};
    if(!keepRecovery(snapshot,validateState(getState()),false,`resolved-${choice}`)){
      notify('error','storage');return;
    }
    conflict=null;needPull=false;
    if(choice==='remote') {
      if(snapshot.state===null){pause(snapshot,'concurrent-change');return;}
      try {await apply(snapshot);}catch(error){conflict=selected;needPull=true;notify('error',error.message);}
      return;
    }
    meta.revision=snapshot.revision;meta.updatedAt=snapshot.updatedAt;meta.pending=true;persist();
    return flush();
  }
  function stop() {
    stopped=true;clearTimeout(timer);clearInterval(poll);
    events?.removeEventListener('online',refresh);events?.removeEventListener('focus',refresh);events?.removeEventListener('visibilitychange',visibility);events?.removeEventListener('storage',sibling);
  }
  return {start,changed,resolve,refresh,rebase,status:()=>copy(current),flush,stop};
}
