// Protective headers sent with every response. The microphone stays available to the app itself (voice recording).
const siteHeaders={
 'x-content-type-options':'nosniff',
 'referrer-policy':'no-referrer',
 'permissions-policy':'microphone=(self), camera=(), geolocation=()',
 'x-frame-options':'DENY'
};
// The page has exactly one inline script, identified by the hash the build stores in <meta name="danskdag-script-sha256">.
// Inline style attributes are used for progress bars, hence 'unsafe-inline' for styles only.
const siteScriptHash=/<meta name="danskdag-script-sha256" content="(sha256-[A-Za-z0-9+/]{43}=)">/;
const siteHashCache=new WeakMap();
function siteHtmlPolicy(asset) {
 if(!siteHashCache.has(asset))siteHashCache.set(asset,asset.scriptHash||siteScriptHash.exec(String(asset.body).slice(0,4096))?.[1]||null);
 const hash=siteHashCache.get(asset);
 if(!hash)return null;
 return ["default-src 'self'",`script-src 'self' '${hash}'`,"style-src 'self' 'unsafe-inline'","img-src 'self' data: blob:","media-src 'self' blob:","connect-src 'self'","manifest-src 'self'","worker-src 'self'","object-src 'none'","frame-ancestors 'none'","base-uri 'none'","form-action 'self'"].join('; ');
}
function siteAssetHeaders(asset) {
 const headers={'content-type':asset.type,'cache-control':'private, no-cache',etag:asset.etag,...siteHeaders};
 if(asset.version)headers['x-danskdag-version']=asset.version;
 if(/^text\/html/.test(asset.type)){
  const policy=siteHtmlPolicy(asset);
  if(policy)headers['content-security-policy']=policy;
 }
 // An SVG opened as a document must not run scripts.
 else if(asset.type==='image/svg+xml')headers['content-security-policy']="default-src 'none'; style-src 'unsafe-inline'; sandbox";
 return headers;
}
export function serveAsset(request,assets){
 const url=new URL(request.url);
 if(!['GET','HEAD'].includes(request.method))return new Response('Method not allowed',{status:405,headers:{allow:'GET, HEAD','cache-control':'no-store',...siteHeaders}});
 let pathname;
 try{pathname=decodeURIComponent(url.pathname);}catch{return new Response('Bad path',{status:400,headers:{...siteHeaders}});}
 if(pathname==='/api/release')return new Response(request.method==='HEAD'?null:JSON.stringify({version:assets['/index.html']?.version||null}),{headers:{'content-type':'application/json','cache-control':'no-store',...siteHeaders}});
 if(pathname==='/'||pathname==='/open')pathname='/index.html';
 const asset=assets[pathname];
 if(!asset)return new Response('Not found',{status:404,headers:{'cache-control':'no-store',...siteHeaders}});
 const headers=siteAssetHeaders(asset);
 if(request.headers.get('if-none-match')===asset.etag)return new Response(null,{status:304,headers});
 const body=asset.binary?Uint8Array.from(atob(asset.body),c=>c.charCodeAt(0)):asset.body;
 return new Response(request.method==='HEAD'?null:body,{headers});
}
