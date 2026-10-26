export function createAudioFeedback(onStatus=()=>{}){
 const controls=new WeakMap(),records=new Set();let active=null;
 const later=(fn,ms)=>{const timer=setTimeout(fn,ms);timer?.unref?.();return timer;};
 function begin(control,text){
  const previous=control&&controls.get(control);
  if(previous){clearTimeout(previous.pulse);clearTimeout(previous.error);records.delete(previous);}
  const record={control,text,title:previous?previous.title:control?.getAttribute('title'),label:previous?previous.label:control?.getAttribute('aria-label'),busy:previous?previous.busy:control?.getAttribute('aria-busy')};
  records.add(record);
  if(control){
   controls.set(control,record);control.classList.remove('audio-pressed');control.classList.add('audio-pressed');
   record.pulse=later(()=>{if(controls.get(control)===record)control.classList.remove('audio-pressed');if(!control.dataset.audioState)records.delete(record);},500);
  }
  const valid=()=>!control||controls.get(control)===record;
  const restore=()=>{
   if(!valid())return;
   if(control){
    delete control.dataset.audioState;
    for(const [name,value] of [['title',record.title],['aria-label',record.label],['aria-busy',record.busy]])value==null?control.removeAttribute(name):control.setAttribute(name,value);
   }
   if(active===record){active=null;onStatus('idle',text);}
   if(!control?.classList.contains('audio-pressed'))records.delete(record);
  };
  return phase=>{
   if(!valid())return;clearTimeout(record.error);
   if(phase==='idle'){restore();return;}
   active=record;
   const label=({loading:'Подготовка озвучки',speaking:'Звучит',error:'Не удалось озвучить'})[phase];
   if(!label)return;
   if(control){control.dataset.audioState=phase;control.setAttribute('aria-busy',String(phase==='loading'));control.setAttribute('title',`${label}: ${text}`);control.setAttribute('aria-label',`${label}: ${text}`);}
   onStatus(phase,text);
   if(phase==='error')record.error=later(restore,1600);
  };
 }
 function clear(){
  for(const record of records){
   clearTimeout(record.pulse);clearTimeout(record.error);
   const control=record.control;if(!control)continue;
   controls.delete(control);control.classList.remove('audio-pressed');delete control.dataset.audioState;
   for(const [name,value]of [['title',record.title],['aria-label',record.label],['aria-busy',record.busy]])value==null?control.removeAttribute(name):control.setAttribute(name,value);
  }
  records.clear();active=null;onStatus('idle','');
 }
 return {begin,clear};
}
