import {h,button as btn} from './ui.mjs';
import {formatCopyTime} from './recovery.mjs';

const reasons={
  import:'Перед загрузкой файла',unreadable:'Прогресс не удалось прочитать',restore:'Перед возвратом копии',
  fresh:'Перед началом заново',legacy:'Исходная копия прежней версии',tabs:'Конфликт двух вкладок'
};
/** Local recovery copies of progress, newest first. Downloading is always possible; restoring asks for confirmation. */
export function renderLocalCopies(copies=[]) {
  if(!copies.length)return '';
  const rows=copies.map(copy=>{
    const when=formatCopyTime(copy.savedAt),size=copy.unreadable?'файл не читается как прогресс':`${copy.xp} XP · ${copy.lessons} ур.`;
    return `<li><span>${h(reasons[copy.reason]||'Копия прогресса')}${when?` · ${h(when)}`:''}<small>${h(size)}</small></span><span class="copy-actions">${btn('Скачать','download-copy','secondary',`data-id="${copy.id}"`)}${copy.unreadable?'':btn('Вернуть','restore-copy','secondary',`data-id="${copy.id}"`)}</span></li>`;
  }).join('');
  return `<details class="local-copies"><summary>Копии прогресса на этом устройстве (${copies.length})</summary><ul>${rows}</ul><p class="field-note">Копия создаётся перед заменой прогресса. Хранятся три последние.</p></details>`;
}
