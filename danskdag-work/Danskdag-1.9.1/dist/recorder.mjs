export function createRecorder(options={}){
 const getMedia=Object.hasOwn(options,'getMedia')?options.getMedia:globalThis.navigator?.mediaDevices?.getUserMedia?.bind(globalThis.navigator.mediaDevices);
 const Recorder=Object.hasOwn(options,'Recorder')?options.Recorder:globalThis.MediaRecorder;
 const urls=options.urls||globalThis.URL,setTimer=options.setTimer||globalThis.setTimeout,clearTimer=options.clearTimer||globalThis.clearTimeout;
 const changed=options.changed||(()=>{});
 const maxSeconds=Number.isFinite(options.maxSeconds)&&options.maxSeconds>0?Math.min(600,Math.floor(options.maxSeconds)):20;
 let value={phase:'idle',url:'',message:''},token=0,stream=null,recorder=null,timer=null;
 const emit=patch=>{value={...value,...patch};changed({...value});};
 const release=()=>{clearTimer(timer);timer=null;stream?.getTracks().forEach(track=>track.stop());stream=null;};
 function clear(){
  token++;if(recorder){recorder.onstop=null;recorder.ondataavailable=null;recorder.onerror=null;if(recorder.state!=='inactive')recorder.stop();recorder=null;}
  release();if(value.url)urls.revokeObjectURL(value.url);emit({phase:'idle',url:'',message:''});
 }
 function stop(){if(recorder?.state==='recording'){emit({phase:'stopping'});recorder.stop();release();}}
 async function start(){
  if(['requesting','recording','stopping'].includes(value.phase))return;
  clear();const request=token;
  if(!getMedia||!Recorder){emit({phase:'error',message:'Этот браузер не поддерживает запись. Открой сайт в современном браузере или повтори фразу вслух без записи.'});return;}
  emit({phase:'requesting',message:'Разреши доступ к микрофону в браузере.'});
  try{
   const acquired=await getMedia({audio:true,video:false});
   if(request!==token){acquired.getTracks().forEach(track=>track.stop());return;}
   stream=acquired;recorder=new Recorder(stream);const current=recorder,chunks=[];
   current.ondataavailable=event=>{if(request===token&&event.data?.size)chunks.push(event.data);};
   current.onstop=()=>{
    if(request!==token)return;release();recorder=null;
    if(chunks.length){const url=urls.createObjectURL(new Blob(chunks,{type:current.mimeType||chunks[0].type}));emit({phase:'ready',url,message:''});}
    else emit({phase:'error',message:'Запись пуста. Проверь микрофон и попробуй ещё раз.'});
   };
   current.onerror=()=>{clear();emit({phase:'error',message:'Не удалось записать звук. Проверь микрофон и попробуй ещё раз.'});};
   current.start();emit({phase:'recording',message:maxSeconds===20?'Идёт запись · до 20 секунд':`Идёт запись · максимум ${maxSeconds} сек.`});timer=setTimer(stop,maxSeconds*1000);
  }catch(error){
   if(request!==token)return;clear();emit({phase:'error',message:error?.name==='NotAllowedError'?'Нет доступа к микрофону. Разреши его в настройках сайта или повтори фразу без записи.':'Микрофон недоступен. Проверь устройство и попробуй ещё раз.'});
  }
 }
 return {start,stop,clear,maxSeconds,snapshot:()=>({...value})};
}
