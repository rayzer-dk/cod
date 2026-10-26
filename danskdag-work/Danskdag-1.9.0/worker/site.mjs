export function serveAsset(request,assets){
 const url=new URL(request.url);
 if(!['GET','HEAD'].includes(request.method))return new Response('Method not allowed',{status:405,headers:{allow:'GET, HEAD','cache-control':'no-store'}});
 let pathname;
 try{pathname=decodeURIComponent(url.pathname);}catch{return new Response('Bad path',{status:400});}
 if(pathname==='/api/release')return new Response(request.method==='HEAD'?null:JSON.stringify({version:assets['/index.html']?.version||null}),{headers:{'content-type':'application/json','cache-control':'no-store','x-content-type-options':'nosniff'}});
 if(pathname==='/'||pathname==='/open')pathname='/index.html';
 const asset=assets[pathname];
 if(!asset)return new Response('Not found',{status:404,headers:{'cache-control':'no-store'}});
 const headers={'content-type':asset.type,'cache-control':'private, no-cache',etag:asset.etag,'x-content-type-options':'nosniff'};
 if(asset.version)headers['x-danskdag-version']=asset.version;
 if(request.headers.get('if-none-match')===asset.etag)return new Response(null,{status:304,headers});
 const body=asset.binary?Uint8Array.from(atob(asset.body),c=>c.charCodeAt(0)):asset.body;
 return new Response(request.method==='HEAD'?null:body,{headers});
}
