// Three-way merge of learner progress written by two tabs of the same browser.
//   base   - what this tab last read from or wrote to storage
//   ours   - this tab's in-memory progress (base plus changes made here)
//   theirs - what another tab wrote meanwhile
// Counters that only grow (XP, attempts, minutes) add up both tabs' new work; lists are merged as sets with
// removals respected; per-card review data takes the more recent attempt; everything else is "changed here wins".
// The result must still be passed through validateState by the caller.
const same=(a,b)=>JSON.stringify(a)===JSON.stringify(b);
const num=value=>typeof value==='number' && Number.isFinite(value) ? value : 0;
const later=(a,b)=>(a ?? '')>(b ?? '') ? a : b;

function mergeSets(base,ours,theirs) {
  if(!base)return [...new Set([...theirs,...ours])];
  const baseSet=new Set(base),ourSet=new Set(ours);
  const removed=new Set(base.filter(item=>!ourSet.has(item))),added=ours.filter(item=>!baseSet.has(item));
  const result=theirs.filter(item=>!removed.has(item));
  for(const item of added)if(!result.includes(item))result.push(item);
  return result;
}

export function mergeProgress(base,ours,theirs) {
  const baseSessions=new Set(base?.sessions || []);
  const ourNew=ours.sessions.filter(id=>!baseSessions.has(id)),theirSet=new Set(theirs.sessions);
  // The same unfinished lesson can be completed in both tabs; then the counters may include it twice, so keep the larger one.
  const overlap=!base || ourNew.some(id=>theirSet.has(id));
  const add=(o,t,b) => overlap ? Math.max(num(o),num(t)) : num(b)+Math.max(0,num(o)-num(b))+Math.max(0,num(t)-num(b));
  const merged=structuredClone(theirs);
  merged.xp=add(ours.xp,theirs.xp,base?.xp);
  merged.sessions=[...theirs.sessions,...ours.sessions.filter(id=>!theirSet.has(id))].slice(-10000);
  const ourDay=ours.lastDay,theirDay=theirs.lastDay;
  if(ourDay===theirDay){merged.lastDay=ourDay;merged.streak=Math.max(ours.streak,theirs.streak);}
  else if(later(ourDay,theirDay)===ourDay){merged.lastDay=ourDay;merged.streak=ours.streak;}
  else {merged.lastDay=theirDay;merged.streak=theirs.streak;}

  merged.completed={};
  for(const id of new Set([...Object.keys(theirs.completed),...Object.keys(ours.completed)])) {
    const o=ours.completed[id],t=theirs.completed[id],b=base?.completed[id];
    if(!o || !t){merged.completed[id]=structuredClone(o || t);continue;}
    merged.completed[id]={best:Math.max(o.best,t.best),attempts:add(o.attempts,t.attempts,b?.attempts)};
  }
  merged.activity={};
  for(const day of new Set([...Object.keys(theirs.activity),...Object.keys(ours.activity)])) {
    const o=ours.activity[day],t=theirs.activity[day],b=base?.activity[day];
    if(!o || !t){merged.activity[day]=structuredClone(o || t);continue;}
    merged.activity[day]={xp:add(o.xp,t.xp,b?.xp),lessons:add(o.lessons,t.lessons,b?.lessons),minutes:add(o.minutes,t.minutes,b?.minutes)};
  }
  merged.reviews={};
  for(const id of new Set([...Object.keys(theirs.reviews),...Object.keys(ours.reviews)])) {
    const o=ours.reviews[id],t=theirs.reviews[id],b=base?.reviews[id];
    if(!o || !t)merged.reviews[id]=structuredClone(o || t);
    else if(b && same(o,b))merged.reviews[id]=structuredClone(t);
    else if(b && same(t,b))merged.reviews[id]=structuredClone(o);
    else {
      const ourWins=num(o.lastAt)>num(t.lastAt) || (num(o.lastAt)===num(t.lastAt) && num(o.seen)>=num(t.seen));
      merged.reviews[id]=structuredClone(ourWins ? o : t);
    }
  }
  for(const key of ['bookmarks','difficult'])merged[key]=mergeSets(base?.[key],ours[key],theirs[key]);

  const byId=list=>new Map(list.map(word=>[word.id,word]));
  const baseWords=base?byId(base.customWords):null,ourWords=byId(ours.customWords),theirWords=byId(theirs.customWords);
  merged.customWords=[];
  for(const word of theirs.customWords) {
    const mine=ourWords.get(word.id),original=baseWords?.get(word.id);
    // Deleted in this tab: keep the other tab's word only if it was edited there meanwhile.
    if(!mine){if(!original || !same(original,word))merged.customWords.push(word);continue;}
    merged.customWords.push(original && same(word,original) ? mine : original && same(mine,original) ? word : mine);
  }
  for(const word of ours.customWords) {
    if(theirWords.has(word.id))continue;
    const original=baseWords?.get(word.id);
    // Deleted in the other tab: keep our word only if we edited it meanwhile.
    if(!original || !same(original,word))merged.customWords.push(word);
  }

  merged.settings={...theirs.settings};
  for(const key of new Set([...Object.keys(theirs.settings),...Object.keys(ours.settings)])) {
    const mine=ours.settings[key],original=base?.settings[key];
    if(!base || !same(mine,original)){ if(mine===undefined)delete merged.settings[key]; else merged.settings[key]=mine; }
  }
  if(ours._unknown || theirs._unknown)merged._unknown={...ours._unknown,...theirs._unknown};
  return merged;
}
