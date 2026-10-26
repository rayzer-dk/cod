export const hostedUrl='https://danskdag-russisk-dansk.agile-bard-3977.chatgpt.site';
export function isOfflineEdition(protocol,marker){return protocol==='file:'||marker==='true';}
export const offlineEdition=isOfflineEdition(globalThis.location?.protocol,globalThis.document?.documentElement?.dataset.offline);
export function assetUrl(path,assets=globalThis.DANSKDAG_ASSETS){return assets?.[path.split('?')[0]]||path;}
export const offlineCacheMessage=ready=>ready?'Уроки и картинки сохранены для открытия без сети. Синхронизация и обновления требуют подключения.':'Офлайн-копия ещё не готова или недоступна в этом браузере. Для независимого запуска используй Danskdag.html.';
export async function prepareOfflineCache(onUpdated=()=>{}){
 const serviceWorker=globalThis.navigator?.serviceWorker;
 if(offlineEdition||!serviceWorker)return false;
 let controller=serviceWorker.controller;
 const changed=()=>{const next=serviceWorker.controller;if(controller&&next&&next!==controller)onUpdated();controller=next;};
 serviceWorker.addEventListener('controllerchange',changed);
 try{await serviceWorker.register('/service-worker.js',{updateViaCache:'none'});const registration=await serviceWorker.ready;return !!registration.active;}catch{serviceWorker.removeEventListener('controllerchange',changed);return false;}
}
