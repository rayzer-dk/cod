import test from 'node:test';
import assert from 'node:assert/strict';
import {serveAsset} from '../worker/site.mjs';
const updates=await import('../dist/app-updates.mjs').catch(()=>({}));
test('release discovery bypasses offline caches and only reports a newer valid version',async()=>{
 assert.equal(typeof updates.checkRelease,'function');
 const fetchRelease=async(url,options)=>{assert.equal(url,'/api/release');assert.equal(options.cache,'no-store');return new Response(JSON.stringify({version:'1.8.0'}),{headers:{'content-type':'application/json'}});};
 assert.equal(await updates.checkRelease('1.7.3',fetchRelease),'1.8.0');
 assert.equal(await updates.checkRelease('1.8.0',fetchRelease),null);
 assert.equal(await updates.checkRelease('1.9.3',fetchRelease),null);
 assert.equal(await updates.checkRelease('1.7.3',async()=>new Response('<html>Login</html>')),false);
 assert.equal(await updates.checkRelease('1.7.3',async()=>{throw Error('offline')}),false);
});
test('public release metadata is uncached and reflects the bundled app version',async()=>{
 const response=serveAsset(new Request('https://danskdag.example/api/release'),{'/index.html':{version:'1.8.0'}});
 assert.equal(response.status,200);assert.equal(response.headers.get('cache-control'),'no-store');assert.deepEqual(await response.json(),{version:'1.8.0'});
});
