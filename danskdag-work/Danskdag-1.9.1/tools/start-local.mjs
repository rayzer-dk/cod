import {createServer} from 'node:http';
import worker from '../dist/server/index.js';
const port=Number(process.argv[2]||8765);
if(!Number.isSafeInteger(port)||port<1024||port>65535)throw new Error('Укажи порт от 1024 до 65535.');
const origin=`http://127.0.0.1:${port}`;
const server=createServer(async(req,res)=>{
 try{
  const url=new URL(req.url,origin);
  if(url.pathname==='/api/progress'){res.writeHead(503,{'content-type':'application/json','cache-control':'no-store'});res.end('{"error":"local-only"}');return;}
  if(!['GET','HEAD'].includes(req.method)){res.writeHead(405,{allow:'GET, HEAD'});res.end();return;}
  const response=await worker.fetch(new Request(url,{method:req.method,headers:req.headers}),{});
  res.writeHead(response.status,Object.fromEntries(response.headers));res.end(Buffer.from(await response.arrayBuffer()));
 }catch{res.writeHead(500,{'content-type':'text/plain; charset=utf-8'});res.end('Не удалось открыть файл приложения.');}
});
server.on('error',error=>{console.error(error.code==='EADDRINUSE'?'Порт занят. Пример другого порта: node tools/start-local.mjs 8766':error.message);process.exitCode=1;});
server.listen(port,'127.0.0.1',()=>console.log(`Danskdag 1.9.1: открой ${origin}\nДля остановки нажми Ctrl+C. Прогресс сохраняется в этом браузере.`));
