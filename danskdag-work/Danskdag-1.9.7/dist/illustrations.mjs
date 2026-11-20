import {normalize} from './engine.mjs';
import {h} from './ui.mjs';
import {assetUrl} from './runtime.mjs';
const groups={cup:['kop','kaffe'],book:['bog'],bicycle:['cykel'],bus:['bus'],train:['tog'],house:['hus'],door:['dør'],key:['nøgle'],rain:['regn'],sun:['sol'],apple:['æble'],bread:['brød'],milk:['mælk'],phone:['telefon'],chair:['stol'],table:['bord'],boat:['båd'],bag:['taske'],tree:['træ'],flower:['blomst'],clock:['ur'],fish:['fisk'],shop:['butik','forretning'],letter:['brev'],spring:['metalfjeder'],chain:['kæde'],spade:['havespade'],fork:['gravegreb'],pig:['so','slagtesvin','polt'],wrench:['momentnøgle'],tractor:['traktor'],gear:['gearkasse'],hammer:['hammer'],bolt:['bolt'],helmet:['hjelm'],gloves:['handsker','handske']};
const mapping=Object.fromEntries(Object.entries(groups).flatMap(([key,words])=>words.map(word=>[word,key])));
export function illustrationFor(item){
 if(!item||item.verified===false)return null;
 const word=normalize(item.da).replace(/^(?:en|et|at)\s+/,'');
 const key=item.visual||((item.kind==='word'||!item.kind)?mapping[word]:null);
 return key&&Object.hasOwn(groups,key)?{src:assetUrl(`/illustrations/${key}.svg`),alt:`Иллюстрация: ${item.ru.split(';')[0]}`} : null;
}
export function renderIllustration(item,cls=''){
 const image=illustrationFor(item);
 return image?`<figure class="word-illustration ${h(cls)}"><img src="${image.src}" alt="${h(image.alt)}" width="320" height="216" loading="lazy"></figure>`:'';
}
