export const appLanguage=globalThis.DANSKDAG_LANGUAGE||'ru';
export function relocalizeSession(session,language,translate=value=>globalThis.DANSKDAG_TRANSLATE?.(value,language)||value,catalog={}){
 if(!session||(session.language||'ru')===language)return session;
 const next=structuredClone(session);next.language=language;next.title=translate(next.title);
 for(const [index,task]of next.tasks.entries()){
  if(task.itemId.startsWith('u-'))continue;
  const original=session.tasks[index],selected=original.options?.indexOf(session.answer),item=catalog[task.itemId];
  for(const key of ['prompt','question','contextTranslation'])if(typeof task[key]==='string')task[key]=translate(task[key]);
  for(const key of ['answers','options'])if(Array.isArray(task[key]))task[key]=task[key].map(translate);
  if(item){
   const context=item.contextVariants?.find(c=>c.id===task.contextId);
   if(task.kind==='focus'){task.question=item.focus.question;task.answers=[...item.focus.answers];}
   else if(task.kind==='gap')task.answers=[...(context?.answers||item.gap?.answers||task.answers)];
   else if(!task.reverse)task.answers=[...(item.ruAnswers||[item.ru])];
   if(item.dialogue)task.prompt=item.dialogue.goal;
   else if(task.kind!=='gap'&&task.kind!=='focus')task.prompt=task.reverse?item.ru:item.da;
   if(task.contextTranslation)task.contextTranslation=context?.ru||item.exampleRu||task.contextTranslation;
   task.options=task.options.map((option,i)=>original.answers.includes(original.options[i])?task.answers[0]:option);
  }
  if(index===session.index&&selected>=0)next.answer=task.options[selected];
  task.options=[...new Set(task.options)];
 }
 return next;
}
