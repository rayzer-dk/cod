import {DAY,dayKey} from './engine.mjs';
import {nextMemory} from './adaptive-review.mjs';

const RETRY=600000;
const LEVELS=['A1','A2','B1','B2','C1'];
const STATS=['introducedAt','lastAt','lastGrade','recognition','recall','spaced','lapses','lastRecallAt'];
const count=value=>Number.isInteger(value) && value>=0 ? value : 0;
const timestamp=value=>typeof value==='number' && Number.isFinite(value) && value>=0 && value<=8640000000000000 ? value : 0;
const aliases=entry=>[...new Set((entry?.ids?.length ? entry.ids : [entry?.id]).filter(id=>typeof id==='string'))];
const compareId=(a,b)=>a<b ? -1 : a>b ? 1 : 0;

function previousMemory(previous,now){
  if(previous?.memory)return previous.memory.lastReview<=now?previous.memory:{...previous.memory,lastReview:now};
  if(!previous||(!count(previous.recall)&&previous.lastGrade))return undefined;
  const days=[0,1,3,7,14,30][Math.min(count(previous.box),5)]||1;
  const last=timestamp(previous.lastRecallAt)||timestamp(previous.lastAt)||Math.max(0,now-days*DAY);
  const interval=timestamp(previous.due)>last?(previous.due-last)/DAY:days;
  return {stability:Math.max(.001,Math.min(36500,interval)),difficulty:5,lastReview:Math.min(last,now)};
}

export function getReviewFor(entry,reviews={}) {
  const candidates=aliases(entry).filter(id=>Object.hasOwn(reviews,id) && reviews[id] && typeof reviews[id]==='object');
  candidates.sort((a,b)=>timestamp(reviews[b].lastAt)-timestamp(reviews[a].lastAt) || count(reviews[b].seen)-count(reviews[a].seen) || compareId(a,b));
  return candidates.length ? reviews[candidates[0]] : undefined;
}

export function recordAttempt(previous,evidence,now=Date.now()) {
  const result={
    box:count(previous?.box),due:timestamp(previous?.due),seen:count(previous?.seen)+(evidence.selfChecked===true&&previous?0:1),
    introducedAt:previous ? timestamp(previous.introducedAt) : now,
    lastAt:now,lastGrade:'miss',recognition:count(previous?.recognition),recall:count(previous?.recall),
    spaced:count(previous?.spaced),lapses:count(previous?.lapses),lastRecallAt:timestamp(previous?.lastRecallAt)
  };
  if(previous?.memory)result.memory={...previous.memory};
  if(previous?.contextIndex!==undefined)result.contextIndex=previous.contextIndex;
  if(previous?.contextSuccesses)result.contextSuccesses={...previous.contextSuccesses};
  if (!evidence.correct) {
    result.box=0;
    result.due=now+RETRY;
    result.lapses++;
    result.spaced=0;
    if(!evidence.retry&&!evidence.helped){const m=nextMemory(previousMemory(previous,now),1,now);result.memory={stability:m.stability,difficulty:m.difficulty,lastReview:m.lastReview};}
  } else if (evidence.helped || evidence.retry) {
    result.lastGrade='assisted';
    // A hint on a card that is not due yet must not pull its schedule closer; FSRS memory is unchanged here.
    const scheduledLater=!evidence.retry && !!previous && timestamp(previous.due)>now;
    result.due=evidence.retry && result.due>now ? Math.min(result.due,now+RETRY) : scheduledLater ? Math.max(result.due,now+RETRY) : now+RETRY;
  } else if (evidence.kind==='recall') {
    result.lastGrade='recall';
    result.recall++;
    if(!previous||timestamp(previous.due)<=now){
      const m=nextMemory(previousMemory(previous,now),3,now);
      result.memory={stability:m.stability,difficulty:m.difficulty,lastReview:m.lastReview};
      result.box=Math.min(result.box+1,5);result.due=now+m.intervalDays*DAY;
      if(result.lastRecallAt>0&&now-result.lastRecallAt>=DAY)result.spaced++;
      result.lastRecallAt=now;
      if(typeof evidence.contextId==='string'&&/^ctx-[a-zA-Z0-9_-]{1,116}$/.test(evidence.contextId)){
        result.contextIndex=Math.min(count(result.contextIndex)+1,1000000);
        const successes=result.contextSuccesses||{},last=Math.max(0,...Object.values(successes));
        if(!last||now-last>=DAY){
          successes[evidence.contextId]=now;
          result.contextSuccesses=Object.fromEntries(Object.entries(successes).sort((a,b)=>b[1]-a[1]).slice(0,8));
        }
      }
    }
  } else {
    result.lastGrade='recognition';
    result.recognition++;
    if (!previous || result.due<=now) result.due=now+(result.recall>0 ? DAY : RETRY);
  }
  return result;
}

export function practiceStage(review,item) {
  if (!review || !count(review.seen) || ['miss','assisted'].includes(review.lastGrade)) return 'recognition';
  if (!STATS.some(field=>Object.hasOwn(review,field))) return 'recall';
  if (count(review.recall)>0 || count(review.recognition)>=2) return 'recall';
  if (count(review.recognition)===1) {
    return !item?.focus && !item?.gap && String(item?.da || '').trim().split(/\s+/).filter(Boolean).length>=4 ? 'build' : 'recall';
  }
  return 'recognition';
}

function catalogue(entries,state) {
  const used=new Set(), result=[];
  for (const entry of entries) {
    if (entry.verified===false) continue;
    const ids=aliases(entry);
    if (!ids.length || ids.some(id=>used.has(id))) continue;
    ids.forEach(id=>used.add(id));
    result.push({entry,review:getReviewFor(entry,state.reviews),index:result.length});
  }
  return result;
}

const family=entry=>entry.familyId || entry.family || (entry.kind==='meaning' ? entry.lessonId : null);
const group=entry=>family(entry) || entry.lessonId || entry.id;
const hasSource=(entry,source)=>entry.source===source || entry.sources?.includes(source);
const learningKind=entry=>hasSource(entry,'personal') ? 'personal' : hasSource(entry,'file') ? 'file' : entry.kind;

function newPriority(entry,state) {
  const marked=new Set([...(state.difficult || []),...(state.bookmarks || [])]);
  if (aliases(entry).some(id=>marked.has(id))) return 0;
  if (hasSource(entry,'personal')) return 1;
  if (entry.kind==='grammar' && entry.level===state.settings?.level) return 2;
  if (hasSource(entry,'file')) return 3;
  const level=LEVELS.indexOf(entry.level), current=LEVELS.indexOf(state.settings?.level || 'A1');
  return level>=0 && level<=current ? 4 : Infinity;
}

function currentDayCount(cards,now) {
  const today=dayKey(new Date(now));
  return cards.filter(({review})=>timestamp(review?.introducedAt)>0 && dayKey(new Date(review.introducedAt))===today).length;
}

export function planMemorySession(entries,state,now=Date.now()) {
  const cards=catalogue(entries,state), due=cards.filter(card=>card.review && timestamp(card.review.due)<=now);
  due.sort((a,b)=>a.review.due-b.review.due || a.index-b.index);
  const dueTotal=due.length, items=[];
  while (due.length && items.length<6) {
    const previous=items.at(-1);
    const alternate=previous ? due.findIndex(card=>group(card.entry)!==group(previous)) : 0;
    items.push(due.splice(alternate<0 ? 0 : alternate,1)[0].entry);
  }
  const dueCount=items.length, newToday=currentDayCount(cards,now);
  const newLimit=[3,6,10].includes(state.settings?.newPerDay) ? state.settings.newPerDay : 6;
  const allowance=Math.max(0,Math.min(2,6-items.length,newLimit-newToday));
  const fresh=cards.filter(card=>!card.review).map(card=>({...card,priority:newPriority(card.entry,state)})).filter(card=>Number.isFinite(card.priority));
  fresh.sort((a,b)=>a.priority-b.priority || a.index-b.index);
  const introduced=[];
  while (fresh.length && introduced.length<allowance) {
    const eligible=fresh.filter(card=>!family(card.entry) || !introduced.some(item=>family(item)===family(card.entry)));
    if (!eligible.length) break;
    const previous=introduced.at(-1), strongest=eligible[0].priority;
    const nearby=eligible.filter(card=>card.priority<=strongest+1);
    const varied=previous && nearby.find(card=>learningKind(card.entry)!==learningKind(previous) && group(card.entry)!==group(previous));
    const next=varied || (previous && nearby.find(card=>group(card.entry)!==group(previous))) || eligible[0];
    fresh.splice(fresh.indexOf(next),1);
    introduced.push(next.entry);
  }
  const future=cards.filter(card=>card.review && timestamp(card.review.due)>now).map(card=>card.review.due);
  return {items:[...items,...introduced],dueTotal,dueCount,newCount:introduced.length,newToday,newLimit,nextDue:future.length ? Math.min(...future) : null};
}

export function memorySummary(entries,state,now=Date.now()) {
  const cards=catalogue(entries,state), reviewed=cards.filter(card=>card.review);
  const future=reviewed.filter(card=>timestamp(card.review.due)>now).map(card=>card.review.due);
  return {
    total:cards.length,introduced:reviewed.length,unintroduced:cards.length-reviewed.length,
    recognized:reviewed.filter(card=>count(card.review.recognition)>0).length,
    recalled:reviewed.filter(card=>count(card.review.recall)>0).length,
    retained:reviewed.filter(card=>count(card.review.spaced)>=2 && card.review.lastGrade==='recall').length,
    transferred:reviewed.filter(card=>{const times=Object.values(card.review.contextSuccesses||{});return times.length>=2&&Math.max(...times)-Math.min(...times)>=DAY;}).length,
    due:reviewed.filter(card=>timestamp(card.review.due)<=now).length,
    newToday:currentDayCount(cards,now),nextDue:future.length ? Math.min(...future) : null
  };
}
