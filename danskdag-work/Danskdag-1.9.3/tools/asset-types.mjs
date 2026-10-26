// Media types of the files the hosted worker serves, and which of them are stored as base64 (binary).
export const assetTypes={'.html':'text/html; charset=utf-8','.mjs':'text/javascript; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.svg':'image/svg+xml','.png':'image/png','.webmanifest':'application/manifest+json','.mp3':'audio/mpeg','.ogg':'audio/ogg','.wav':'audio/wav'};
const binary=new Set(['.png','.mp3','.ogg','.wav']);
export const isBinary=extension=>binary.has(extension);
