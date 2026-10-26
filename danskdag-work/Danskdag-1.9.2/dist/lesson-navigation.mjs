const levelOrder=['A1','A2','B1','B2','C1'];
export function lessonGroups(lessons,state){
 const completed=lessons.filter(l=>Object.hasOwn(state.completed,l.id));
 return {remaining:lessons.filter(l=>!Object.hasOwn(state.completed,l.id)),completed,mastered:completed.filter(l=>(state.completed[l.id]?.best||0)>=80).length};
}
export function recommendLesson(lessons,state,{kind='grammar',level=state.settings.level}={}){
 const route=lessons.filter(l=>l.kind===kind),current=route.filter(l=>l.level===level);
 const fresh=current.find(l=>!state.completed[l.id]);if(fresh)return fresh;
 const improve=current.find(l=>(state.completed[l.id]?.best||0)<80);if(improve)return improve;
 for(const futureLevel of levelOrder.slice(levelOrder.indexOf(level)+1)){const candidates=route.filter(l=>l.level===futureLevel),fresh=candidates.find(l=>!state.completed[l.id]);if(fresh)return fresh;const improve=candidates.find(l=>(state.completed[l.id]?.best||0)<80);if(improve)return improve;}
 return null;
}
