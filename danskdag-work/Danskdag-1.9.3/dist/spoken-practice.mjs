import {spokenEntries,spokenCategories} from './spoken-data.mjs';

export const spokenLessons=spokenCategories.flatMap(category=>{
 const entries=spokenEntries.filter(p=>p.category===category.id),level=['turns','views'].includes(category.id)?'B1':'A2';
 return [0,1].map(part=>{
  const id=`spoken-lesson-${category.id}-${part+1}`;
  return {id,level,kind:'conversation',color:'blue',icon:'chat',title:`${category.title} · ${part+1}`,subtitle:'5 реплик с контекстом и оттенками смысла',rule:'Учи реплику целиком и учитывай ситуацию. После ответа прочитай пояснение, затем произнеси свою похожую фразу. Варианты сокращённой записи помогают узнавать речь; в заданиях используется стандартное написание.',items:entries.slice(part*5,part*5+5).map(p=>({...p,lessonId:id}))};
 });
});
