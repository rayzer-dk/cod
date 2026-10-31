export function createHomeFeedback(body){
 let timer;
 return {press(){
  clearTimeout(timer);body.classList.add('home-pressed');
  timer=setTimeout(()=>body.classList.remove('home-pressed'),500);timer?.unref?.();
 }};
}
