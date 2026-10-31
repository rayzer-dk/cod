const beginnerOrder=['hello','basics-numbers-1','basics-reading-1','g-nouns','form-lesson-present','g-basic-pronouns','cafe','basics-numbers-2','g-adjectives','g-main-order','day','basics-reading-2','basics-numbers-3','town','form-lesson-infinitive-imperative','pat-size-quantity','basics-numbers-4','basics-reading-3'];
export function learningPath(lessons,state,level=state.settings.level){
 const items=lessons.filter(l=>l.level===level);
 if(level==='A1')items.sort((a,b)=>{const rank=id=>{const n=beginnerOrder.indexOf(id);return n<0?beginnerOrder.length:n;};return rank(a.id)-rank(b.id);});
 const mastered=items.filter(l=>(state.completed[l.id]?.best||0)>=80).length;
 const completed=items.filter(l=>Object.hasOwn(state.completed,l.id)).length;
 const next=items.find(l=>(state.completed[l.id]?.best||0)<80)||null;
 return {items,level,total:items.length,completed,mastered,next,position:next?items.indexOf(next)+1:items.length};
}
export function nextPathLesson(lessons,state,level=state.settings.level){
 const levels=['A1','A2','B1','B2','C1'];
 for(const current of levels.slice(levels.indexOf(level))){const next=learningPath(lessons,state,current).next;if(next)return next;}
 return null;
}
