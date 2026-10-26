import {renderLevelSelect} from './path-view.mjs';
import {nextPathLesson} from './learning-path.mjs';
import {renderNumberResult} from './basics-view.mjs';
import {wordClassLabel} from './word-class-labels.mjs';
import {appLanguage,relocalizeSession} from './language.mjs';
import {checkRelease} from './app-updates.mjs';
import {offlineEdition,assetUrl,hostedUrl,prepareOfflineCache,offlineCacheMessage} from './runtime.mjs';
import {createState,validateState,normalize,dayKey,activeStreak,finishSession,getLearnerLevel,getAchievements} from './engine.mjs';
import {lessons,lessonById,levels,getCatalog,getWordEntries,isMarked,trainingPool} from './course.mjs';
import {makeSession,restoreSession,answerSession,selfCheckSession,advanceSession,moveToken,shuffle} from './learning.mjs';
import {h,icon,button as btn,plural,addDanishAudio,themeToggle,teachingText} from './ui.mjs';
import {speak,stopSpeech,getDanishVoices,voiceStatus} from './speech.mjs';
import {createAudioFeedback} from './audio-feedback.mjs';
import {createHomeFeedback} from './home-feedback.mjs';
import {createRecorder} from './recorder.mjs';
import {pronunciationGuides} from './pronunciation-data.mjs';
import {pronunciationCoach,recordingControls} from './pronunciation-view.mjs';
import {verbForms,adjectiveForms,formLessons} from './forms-data.mjs';
import {commonWords,commonCategories} from './common-words.mjs';
import {spokenEntries,spokenCategories,extraInformal} from './spoken-data.mjs';
import {dailyLexicon,dailyCategories} from './daily-lexicon-data.mjs';
import {referenceSelection} from './reference-tools.mjs';
import {particleFamilies,informalExpressions,patternLessons} from './patterns-data.mjs';
import {renderView,modeNames,count,voiceOptions} from './views.mjs';
import {exerciseView,resultView,hasAnswer} from './exercise.mjs';
import {getReviewFor,planMemorySession,memorySummary,recordAttempt} from './memory.mjs';
import {renderStudy} from './memory-view.mjs';
import {illustrationFor,renderIllustration} from './illustrations.mjs';
import {createCloudSync,listCloudCopies} from './cloud-sync.mjs';
import {cloudSettings} from './continuity-view.mjs';
import {saveProgressCopy,listProgressCopies,loadProgress,describeProgress} from './recovery.mjs';
import {mergeProgress} from './progress-merge.mjs';
import {FOCUSABLE,captureFocus,restoreFocus,focusPageStart,pageTitle,createAnnouncer,debounce} from './accessibility.mjs';

const referenceData={common:commonWords,categories:commonCategories,verbs:verbForms,adjectives:adjectiveForms,families:particleFamilies,informal:[...informalExpressions,...extraInformal],spoken:spokenEntries,spokenCategories,daily:dailyLexicon,dailyCategories};
const $=selector=>document.querySelector(selector),root=$('#app');
const KEY='danskdag.progress.v1',SESSION='danskdag.session.v1';
const navigation=[['learn','book','Маршрут'],['grammar','layers','Грамматика'],['dictionary','cards','Мои слова'],['review','repeat','Повторение'],['conversation','chat','Живая речь'],['wordlab','search','Значения слов'],['forms','cards','Справочники'],['basics','book','Числа и чтение'],['pronunciation','sound','Произношение'],['progress','trophy','Прогресс']];
let state=createState(),warning='',recovery=null,cloud=null,cloudConflict=null,cloudStatus={phase:offlineEdition?'local':'connecting'},shownCloudRevision=null;
// `saved` is what this tab last read from or wrote to storage; it is the common ancestor when another tab changes progress meanwhile.
// `unreadable` holds stored progress that could not be read. While it is set nothing is written over it.
let unreadable=null,saved={raw:null,state:null},sessionOwned=false,themeSource='user',lastBlockedToast=0,refreshAfterDialog=false;
const THEME_SOURCE='danskdag.theme-source.v1';
try{
 recovery=localStorage.getItem(`${KEY}.recovery`);
 const loaded=loadProgress(localStorage,KEY,validateState,createState);
 if(loaded.status==='ok'){state=loaded.state;saved={raw:loaded.raw,state:structuredClone(state)};}
 else if(loaded.status==='unreadable'){unreadable={raw:loaded.raw};saved={raw:loaded.raw,state:null};recovery=loaded.raw;saveProgressCopy(localStorage,KEY,loaded.raw,'unreadable');}
 if(loaded.raw&&!localStorage.getItem(`${KEY}.before-1.1.0`))localStorage.setItem(`${KEY}.before-1.1.0`,loaded.raw);
 // A new learner follows the device's light/dark preference until the first explicit choice; existing learners keep their theme.
 const storedSource=localStorage.getItem(THEME_SOURCE);
 themeSource=storedSource==='auto'||storedSource==='user'?storedSource:loaded.raw?'user':'auto';
 if(storedSource!==themeSource)localStorage.setItem(THEME_SOURCE,themeSource);
}catch{warning='Браузер ограничивает сохранение. Выгружай прогресс в настройках.';}
let catalog=getCatalog(state),session=null,active=false;
try{const raw=localStorage.getItem(SESSION);if(raw){session=relocalizeSession(restoreSession(JSON.parse(raw),catalog,state.sessions),appLanguage,undefined,catalog);sessionOwned=!!session;}}catch{}
let page=location.hash.slice(1)||'learn';
if(![...navigation.map(n=>n[0]),'settings','method'].includes(page))page='learn';
let offlineReady=false;
let basicsTab='numbers',numberValue='21';
let referenceTab='daily',referenceCategory='all',referenceQuery='',referencePage=1;
let labTab='meanings',labSelection=null,labQuery='',labCategory='all';
let query='',wordFilter='file',wordLimit=24,requested=null,importCandidate=null,importReason='import',modalReturn=null,installEvent=null,drag=null,ignoreClicks=0,announced='';
let coach=null;
const homeFeedback=createHomeFeedback(document.body);
const announcer=createAnnouncer(document);
const renderSearch=debounce(()=>render(),120);
const recorder=createRecorder({changed:value=>{const controls=$('#recording-controls');if(coach&&controls)controls.innerHTML=recordingControls(value);}});
const audioFeedback=createAudioFeedback((phase,text)=>{const status=$('#speech-status');if(!status)return;status.textContent=phase==='idle'?'':`${({loading:'Подготовка озвучки',speaking:'Звучит',error:'Не удалось озвучить'})[phase]}: ${text}`;status.classList.toggle('visible',phase!=='idle');});
const say=(text,rate=state.settings.rate,control=null)=>{if(['requesting','recording','stopping'].includes(recorder.snapshot().phase)){toast('Сначала останови запись.');return false;}return speak(text,rate,toast,state.settings.voiceUri,audioFeedback.begin(control,text));};
const dueItems=()=>getWordEntries(state).filter(p=>p.verified===true&&getReviewFor(p,state.reviews)?.due<=Date.now());
const nextLesson=()=>nextPathLesson(lessons,state);
function toast(text){const el=$('#toast');el.textContent=text;el.classList.add('visible');clearTimeout(toast.timer);toast.timer=setTimeout(()=>el.classList.remove('visible'),4500);}
function notifyBlocked(){if(performance.now()-lastBlockedToast<30000&&lastBlockedToast)return;lastBlockedToast=performance.now()||1;toast('Прогресс не сохраняется: сохранённые данные не удалось прочитать. Выбери «Скачать копию» или «Начать заново» вверху страницы.');}
// Another tab changed the saved progress after we last looked: combine both instead of overwriting it.
function mergeForeign(current){
 let theirs;
 try{theirs=validateState(JSON.parse(current));}catch{saveProgressCopy(localStorage,KEY,current,'tabs');return null;}
 try{state=validateState(mergeProgress(saved.state,state,theirs));catalog=getCatalog(state);return theirs;}
 catch{saveProgressCopy(localStorage,KEY,current,'tabs');return null;}
}
function writeProgress(){
 const raw=JSON.stringify(state);
 if(raw===saved.raw)return;
 const current=localStorage.getItem(KEY);
 let basis=null;
 if(current!==null&&current!==saved.raw){basis=mergeForeign(current);}
 const text=basis?JSON.stringify(state):raw;
 localStorage.setItem(KEY,text);
 saved={raw:text,state:structuredClone(state)};
}
function persist(sync=true){
 if(unreadable){notifyBlocked();return false;}
 try{
  writeProgress();
  if(session){localStorage.setItem(SESSION,JSON.stringify(session));sessionOwned=true;}else if(sessionOwned){localStorage.removeItem(SESSION);sessionOwned=false;}
  if(sync)cloud?.changed();return true;
 }catch{warning='Не удалось сохранить изменения. Выгрузи копию прогресса в настройках.';toast(warning);return false;}
}
function adoptStored(current,fresh){state=fresh;catalog=getCatalog(state);saved={raw:current,state:structuredClone(fresh)};}
function syncFromOtherTab(){
 let current;try{current=localStorage.getItem(KEY);}catch{return;}
 if(current===null||current===saved.raw)return;
 if(unreadable){
  try{adoptStored(current,validateState(JSON.parse(current)));unreadable=null;}catch{return;}
 }else{
  const theirs=mergeForeign(current);
  if(!theirs)return;
  const merged=JSON.stringify(state);
  let stored=current;
  if(merged!==current){try{localStorage.setItem(KEY,merged);stored=merged;}catch{ /* Our next save retries. */ }}
  saved={raw:stored,state:stored===merged?structuredClone(state):theirs};
  if(stored===merged&&merged!==current)cloud?.changed();else cloud?.rebase();
 }
 if(state.settings.language!==appLanguage){location.reload();return;}
 if(!active&&!$('.dialog-backdrop')){const y=window.scrollY;render();window.scrollTo(0,y);}
 else refreshAfterDialog=true;
}
const sectionName=id=>id==='settings'?'Настройки':id==='method'?'Практика памяти':navigation.find(n=>n[0]===id)?.[2];
function effectiveTheme(){
 if(themeSource!=='auto')return state.settings.theme;
 try{return globalThis.matchMedia?.('(prefers-color-scheme: dark)').matches?'dark':'light';}catch{return state.settings.theme;}
}
function chooseTheme(theme){
 state.settings.theme=theme;
 if(themeSource!=='user'){themeSource='user';try{localStorage.setItem(THEME_SOURCE,'user');}catch{ /* The choice itself is saved with the progress. */ }}
}
function preferences(){const theme=effectiveTheme();document.documentElement.lang=appLanguage;document.title=pageTitle(active&&session?session.title:sectionName(page));document.documentElement.dataset.theme=theme;document.documentElement.style.setProperty('--reading-size',`${state.settings.fontSize}px`);document.querySelector('meta[name=theme-color]').content=theme==='dark'?'#192720':'#f5f5f7';}
function go(next){if(![...navigation.map(n=>n[0]),'settings','method'].includes(next))return;renderSearch.cancel();closeDialog();page=next;active=false;history.replaceState(null,'',`#${next}`);render();window.scrollTo(0,0);focusPageStart($('#content'));void cloud?.flush();maybeCloudConflict();}
function words(){return getWordEntries(state).filter(p=>{
 const match=wordFilter==='illustrated'&&!!illustrationFor(p)||wordFilter==='all'||wordFilter==='file'&&p.sources.includes('file')||wordFilter==='personal'&&p.sources.includes('personal')||wordFilter==='difficult'&&isMarked(p,state.difficult)||wordFilter==='saved'&&isMarked(p,state.bookmarks);
 return match&&(!query||normalize(`${p.da} ${p.ru} ${p.note||''}`).includes(normalize(query)));
});}
function memo(compute){let ready=false,value;return()=>{if(!ready){value=compute();ready=true;}return value;};}
const cloudCopies=()=>{try{return listCloudCopies(localStorage);}catch{return [];}};
const localCopies=()=>{try{return listProgressCopies(localStorage,KEY,raw=>describeProgress(raw,validateState));}catch{return [];}};
function unreadableNotice(){return `<div class="notice warning" role="alert">${icon('info')}<span>Не удалось прочитать сохранённый прогресс. Он не удалён и не перезаписан, но пока ты не выберешь, новые результаты не сохраняются.</span><button data-action="download-unreadable">Скачать копию</button><button data-action="start-fresh">Начать заново</button></div>`;}
function render(){
 stopSpeech();audioFeedback.clear();preferences();
 if(active&&session){renderSession();return;}
 const focus=captureFocus(root);
 document.body.classList.remove('session-mode');
 const learner=getLearnerLevel(state.xp),due=dueItems(),theme=effectiveTheme();
 // Heavy plans are computed only by the pages that show them.
 const entries=memo(()=>getWordEntries(state)),plan=memo(()=>planMemorySession(entries(),state)),summary=memo(()=>memorySummary(entries(),state));
 const filtered=memo(words),fileTotal=memo(()=>trainingPool(state).filter(p=>p.source==='file').length),following=memo(nextLesson),copies=memo(cloudCopies),stored=memo(localCopies);
 const view=theme===state.settings.theme?state:{...state,settings:{...state.settings,theme}};
 const context={basicsTab,numberValue,offlineEdition,offlineReady,referenceTab,referenceCategory,referenceQuery,referencePage,referenceData,referenceLessons:{forms:formLessons,quantity:patternLessons.filter(l=>l.kind==='grammar'),particles:patternLessons.filter(l=>l.kind==='pattern')},state:view,session,catalog,due,get next(){return following();},todayXP:state.activity[dayKey()]?.xp||0,get fileCount(){return fileTotal();},get words(){return filtered();},wordFilter,wordLimit,query,recovery,installEvent,labTab,labSelection,labQuery,labCategory,cloudStatus,cloudConflict,get cloudPlan(){return cloudSettings(cloudStatus,cloudConflict,copies());},get memoryPlan(){return plan();},get memorySummary(){return summary();},get localCopies(){return stored();}};
 root.innerHTML=`<a class="skip" href="#content">К содержимому</a><aside class="sidebar"><button type="button" class="brand" data-page="learn" aria-label="Danskdag, на главную" title="На главную"><img src="${assetUrl('/icon.svg?v=1.9.1')}" alt="Флаг Дании"><span>Dansk<span>dag</span></span></button><nav aria-label="Разделы">${navigation.map(([id,ic,name])=>`<button class="nav-item ${page===id?'active':''} ${page==='wordlab'&&id==='dictionary'?'parent-active':''} ${['conversation','wordlab','forms','basics','pronunciation'].includes(id)?'desktop-nav':''}" data-page="${id}" title="${name}" ${page===id?'aria-current="page"':''}>${icon(ic)}<span class="nav-label">${name}</span><span class="nav-mobile-label">${({grammar:'Правила',dictionary:'Слова',review:'Повтор'})[id]||name}</span>${id==='review'&&due.length?`<b class="nav-count">${due.length}</b>`:''}</button>`).join('')}</nav><div class="sidebar-end"><div class="rank-mini"><span class="rank-icon">${icon('spark')}</span><div><strong>Опыт ${learner.level}</strong><small>${h(learner.name)}</small></div></div><div class="meter"><span style="width:${learner.progress*100}%"></span></div><button class="nav-item ${page==='settings'?'active':''}" data-page="settings">${icon('gear')}<span>Настройки</span></button></div></aside><div class="app-shell"><header class="app-header"><button type="button" class="header-title" data-page="learn" aria-label="РУССКИЙ → DANSK, ${sectionName(page)}. На главную" title="На главную"><span class="eyebrow"><img class="danish-flag" src="${assetUrl('/flag-dk.svg')}" alt="Флаг Дании"> РУССКИЙ → DANSK</span><strong>${sectionName(page)}</strong></button><div class="header-actions">${themeToggle(theme)}<button class="metric orange" data-page="progress" title="Серия занятий">${icon('flame')}<b>${activeStreak(state)}</b><span>${plural(activeStreak(state),['день','дня','дней'])}</span></button><button class="metric purple" data-page="progress" title="Очки за завершённые занятия">${icon('bolt')}<b>${state.xp}</b><span>XP</span></button><button class="icon-button settings-mobile" data-page="settings" title="Настройки">${icon('gear')}</button><button class="profile" data-page="settings" title="Открыть настройки">${h(Array.from(state.settings.name||'D')[0].toUpperCase())}</button></div></header><nav class="mobile-sections" aria-label="Слова и речь">${[['forms','cards','Справочники'],['conversation','chat','Речь'],['wordlab','search','Значения'],['pronunciation','sound','Звуки']].map(([id,ic,label])=>`<button data-page="${id}" class="${page===id?'active':''}" ${page===id?'aria-current="page"':''}>${icon(ic)}${label}</button>`).join('')}</nav><main id="content" tabindex="-1">${unreadable?unreadableNotice():''}${warning?`<div class="notice warning">${icon('info')}<span>${h(warning)}</span><button data-page="settings">Настройки</button></div>`:''}${renderView(page,context)}</main></div>`;if(page==='settings')root.querySelector('.settings-card').insertAdjacentHTML('afterbegin',profileSetting()+languageSetting()+renderLevelSelect(state,'settings-level')+(offlineEdition?'':`<button type="button" class="btn secondary check-update" data-action="check-update">Проверить обновление</button>`));addDanishAudio(root);
 if(focus)restoreFocus(root,focus);
}
function showDialog(title,body,actions=''){
 closeDialog();modalReturn={element:document.activeElement,key:captureFocus(root)};audioFeedback.clear();root.inert=true;document.body.classList.add('dialog-open');document.body.classList.remove('home-pressed');
 const el=document.createElement('div');el.className='dialog-backdrop';el.innerHTML=`<section class="dialog" role="dialog" aria-modal="true" aria-labelledby="dialog-title"><div class="dialog-heading"><h2 id="dialog-title">${h(title)}</h2><button class="icon-button" data-action="close-dialog" title="Закрыть">${icon('close')}</button></div>${body}${actions?`<div class="dialog-actions">${actions}</div>`:''}</section>`;document.body.append(el);addDanishAudio(el);el.querySelector('input,button')?.focus();
}
function closeDialog(){
 coach=null;recorder.clear();stopSpeech();$('.dialog-backdrop')?.remove();root.inert=false;document.body.classList.remove('dialog-open');
 // The control that opened the dialog may have been redrawn meanwhile: find its current counterpart by identity.
 const origin=modalReturn;modalReturn=null;
 if(origin){if(origin.element?.isConnected&&!origin.element.disabled)origin.element.focus?.({preventScroll:true});else if(origin.key)restoreFocus(root,origin.key);}
 if(refreshAfterDialog&&!active){refreshAfterDialog=false;const y=window.scrollY;render();window.scrollTo(0,y);}
 queueMicrotask(maybeCloudConflict);
}
function openPronunciation(text,guide=null){
 if(!text)return;showDialog(guide?.title||'Произнести и сравнить',pronunciationCoach(text,guide,recorder.snapshot()));coach={text,guide};
}
function lessonIntro(id,route=false){
 const l=lessonById[id];if(!l)return;
 const examples=l.roleplay?l.items.slice(0,2).map(p=>`<div><p lang="da">${h(p.dialogue.partnerDa)}</p><small>${h(p.dialogue.goal)}</small></div>`):l.items.slice(0,2).map(p=>`<div><p lang="da">${h(p.da)}</p><small>${h(p.ru)}</small></div>`);
 const actions=l.roleplay?btn('Без подсказок','begin-dialogue','primary',`data-id="${id}" data-route="${route}" data-value="expert"`)+btn('Смешанный','begin-dialogue','secondary',`data-id="${id}" data-route="${route}" data-value="mixed"`)+btn('С вариантами','begin-dialogue','secondary',`data-id="${id}" data-route="${route}" data-value="easy"`):btn(`Начать ${icon('arrow')}`,'begin-lesson','primary',`data-id="${id}" data-route="${route}"`);
 showDialog(l.title,`<span class="pill purple">${l.level} · ${l.items.length} ${plural(l.items.length,['задание','задания','заданий'])}</span><p class="rule-explanation">${teachingText(l.rule)}</p><div class="intro-examples">${examples.join('')}</div><p class="field-note">${l.roleplay?'Выбери, как отвечать. В режиме без подсказок готовая фраза появится после твоей попытки.':'Режим: '+modeNames[state.settings.mode]+'. Разбор — после каждого ответа.'}</p>`,actions);
}
function wordDetail(id){const p=catalog[id];if(!p)return;showDialog(p.da,`${renderIllustration(p)}<p class="detail-translation">${h(p.ru)}</p>${wordClassLabel(p.wordClass)?`<div class="word-class-name">${teachingText(wordClassLabel(p.wordClass))}</div>`:''}${p.note?`<div class="note-box">${icon('info')}<p>${teachingText(p.note)}</p></div>`:''}${p.association?`<div class="association">${icon('brain')}<p>${h(p.association)}</p></div>`:''}${p.exampleDa?`<div class="word-example"><p lang="da">${h(p.exampleDa)}</p><small>${h(p.exampleRu||'')}</small></div>`:''}${p.verified===false?'<p class="field-note">Исходная запись требует проверки и не включена в упражнения.</p>':''}`,btn(`${icon('sound')} Послушать`,'speak','secondary',`data-id="${id}"`)+btn('Произнести и сравнить','pronounce-word','secondary',`data-id="${id}"`)+btn(`${icon('repeat')} Не запомнил`,'difficult','secondary',`data-id="${id}"`)+(p.source==='personal'?btn('Редактировать','edit-word','secondary',`data-id="${id}"`):p.verified===true?btn('Тренировать','train-word','primary',`data-id="${id}"`):''));}
function wordForm(id=null){const p=id?state.customWords.find(w=>w.id===id):null;showDialog(p?'Редактировать слово':'Новое слово',`<form id="word-form" data-id="${p?.id||''}"><label for="new-da">По-датски</label><input id="new-da" name="da" type="text" lang="da" maxlength="220" required value="${h(p?.da||'')}" placeholder="Например, en udfordring"><label for="new-ru">Перевод на русский</label><input id="new-ru" name="ru" type="text" maxlength="300" required value="${h(p?.ru||'')}" placeholder="Например, сложная задача, вызов"><label for="new-note">Пояснение или пример</label><textarea id="new-note" name="note" maxlength="500" rows="2">${h(p?.note||'')}</textarea><label for="new-association">Твоя ассоциация</label><textarea id="new-association" name="association" maxlength="500" rows="2" placeholder="Что поможет вспомнить значение?">${h(p?.association||'')}</textarea><div id="form-error" class="form-error" role="alert"></div><div class="dialog-actions"><button class="btn primary" type="submit">Сохранить слово ${icon('check')}</button></div></form>`);$('#new-da').focus();}
function start(items,options={},force=false){
 const eligible=items.filter(p=>p&&p.verified===true);
 if(!eligible.length){toast('В группе пока нет проверенных слов. Добавь слово или выбери другую группу.');return;}
 if(session&&!force){requested={items:eligible,options};showDialog('Продолжить начатое?',`<p>Занятие «${h(session.title)}» ещё не закончено. Продолжить его или заменить новым?</p>`,btn('Продолжить','resume','secondary')+btn('Начать новое','replace-session'));return;}
 session=makeSession(eligible,trainingPool(state),{...options,mode:options.mode||state.settings.mode,reviews:state.reviews});session.language=appLanguage;session.route=options.route===true;session.routeLevel=options.routeLevel||null;session.beforeAwards=getAchievements(state).filter(a=>a.earned).map(a=>a.id);active=true;requested=null;renderSearch.cancel();persist();render();window.scrollTo(0,0);focusPageStart(root,'h1,h2');
}
function startLesson(id,force=false,mode=null,route=false){const l=lessonById[id];if(l)start(l.items.map(p=>catalog[p.id]),{title:l.title,lessonId:id,route,routeLevel:l.level,...(mode?{mode}:{})},force);}
function startFile(){const pool=trainingPool(state).filter(p=>p.source==='file');start([...shuffle(pool.filter(p=>!state.reviews[p.id])),...shuffle(pool.filter(p=>state.reviews[p.id]))],{title:'Мои слова из файла'});}
function startMemory(){const plan=planMemorySession(getWordEntries(state),state);if(!plan.items.length){go('review');return;}start(plan.items,{title:'Практика памяти',mode:'auto',studyIds:plan.items.filter(p=>!getReviewFor(p,state.reviews)).map(p=>p.id)});}
function renderSession(){
 stopSpeech();audioFeedback.clear();document.body.classList.add('session-mode');preferences();
 const focus=captureFocus(root);
 if(!session.studyDone&&session.studyIds.length){root.innerHTML=renderStudy(session,catalog);addDanishAudio(root);restoreFocus(root,focus);return;}
 if(session.index>=session.tasks.length){state=finishSession(state,{id:session.id,lessonId:session.lessonId,correct:session.correct,total:session.initialCount,minutes:Math.max(1,Math.min(60,Math.round((Date.now()-session.started)/60000)))});persist();root.innerHTML=resultView(session,state,getAchievements(state).filter(a=>a.earned&&!session.beforeAwards.includes(a.id)));addDanishAudio(root);if(announced!==`${session.id}:end`){announced=`${session.id}:end`;focusPageStart(root,'h1,h2');}return;}
 root.innerHTML=exerciseView(session,catalog,state);addDanishAudio(root);
 if(session.submitted){
  $('[data-action=next-task]')?.focus({preventScroll:true});
  // The feedback block is redrawn together with the page, so a permanent live region reads it out instead.
  const feedback=root.querySelector('.answer-feedback'),key=`${session.id}:${session.index}:${session.selfChecked?1:0}`;
  if(feedback){feedback.removeAttribute('role');if(announced!==key){announced=key;announcer.say(feedback.textContent);}}
 }else if(focus&&!restoreFocus(root,focus)){
  // The control is gone (for example the last placed word was taken back): continue in the word bank, else at the question.
  const next=root.querySelector('.token-bank [data-action=add-token]:not(:disabled)');
  if(next)next.focus({preventScroll:true});else focusPageStart(root,'.exercise h1,h1');
 }
}
function checkAnswer(giveUp=false){
 if(!session||session.submitted||!session.studyDone||(!giveUp&&!hasAnswer(session)))return;
 const t=session.tasks[session.index],answer=giveUp?'':t.kind==='build'?session.words.map(i=>t.bank[i]).join(' '):session.answer;
 if(giveUp)session.helped=true;
 session=answerSession(session,answer);
 const entry=getWordEntries(state).find(p=>p.ids.includes(t.itemId))||{id:t.itemId},aliases=entry.ids||[t.itemId];
 const review=recordAttempt(getReviewFor(entry,state.reviews),session.outcomes.at(-1));
 for(const id of aliases)if(id===t.itemId||state.reviews[id])state.reviews[id]=review;
 persist();renderSession();
}
function nextTask(){if(session?.submitted){session=advanceSession(session);persist();renderSession();window.scrollTo(0,0);focusPageStart(root,'.exercise h1,h1,h2');}}
function toggle(id,key){
 const p=catalog[id];if(!p)return;
 const entry=getWordEntries(state).find(w=>w.ids.includes(id))||p,aliases=entry.ids||[id],exists=aliases.some(i=>state[key].includes(i));
 state[key]=exists?state[key].filter(i=>!aliases.includes(i)):[...state[key],id];persist();
 if($('.dialog-backdrop'))toast(exists?'Отметка снята.':'Слово сохранено.');
 else if(page==='forms'&&!active){
  const action=key==='bookmarks'?'bookmark':'difficult';
  for(const control of root.querySelectorAll(`button[data-action="${action}"]`))if(aliases.includes(control.dataset.id)){
   control.setAttribute('aria-pressed',String(!exists));control.classList.toggle('active',!exists);
   control.innerHTML=key==='bookmarks'?`${icon(exists?'bookmark':'check')}${exists?'Сохранить':'Сохранено'}`:`${icon('brain')}${exists?'Не запомнил':'В сложных'}`;
  }
 }
 else{const y=window.scrollY;render();window.scrollTo(0,y);}
}
const hasCopy=raw=>listProgressCopies(localStorage,KEY).some(copy=>copy.raw===raw);
function showImportDialog(title,source){
 showDialog(title,`<p>${source} ${importCandidate.xp} XP и ${count(importCandidate.customWords.length)} добавлено вручную. Текущие данные (${state.xp} XP) будут заменены. Незавершённое занятие закроется.</p><p class="field-note">Перед заменой копия текущего прогресса сохранится на этом устройстве. Вернуть её можно в настройках, в разделе «Копии прогресса».</p>`,btn('Отмена','close-dialog','secondary')+btn('Загрузить','confirm-import'));
}
// Replacing progress is never silent: the previous local progress is kept as a recovery copy first.
function replaceProgress(downloadedInstead){
 let before=null;try{before=localStorage.getItem(KEY);}catch{ /* Treated like a failed backup below. */ }
 const backedUp=downloadedInstead||before===null||saveProgressCopy(localStorage,KEY,before,importReason);
 if(!backedUp){
  showDialog('Не удалось сохранить копию',`<p>Браузер не дал сохранить копию текущего прогресса, поэтому он не заменён. Скачай копию файлом, и заменим его сразу после скачивания.</p>`,btn('Отмена','close-dialog','secondary')+btn('Скачать копию и заменить','export-before-import'));
  return;
 }
 if(downloadedInstead)download(before??JSON.stringify(state,null,2),true);
 state=importCandidate;catalog=getCatalog(state);session=null;importCandidate=null;unreadable=null;
 // Explicit replacement: what is stored now is the basis, so another tab's older data is not merged back in.
 try{saved={raw:localStorage.getItem(KEY),state:structuredClone(state)};}catch{saved={raw:null,state:null};}
 closeDialog();persist();
 if(state.settings.language!==appLanguage){location.reload();return;}
 render();toast('Прогресс загружен.');
}
function download(raw=JSON.stringify(state,null,2),isRecovery=false){const url=URL.createObjectURL(new Blob([raw],{type:'application/json'})),el=document.createElement('a');el.href=url;el.download=`Danskdag_${isRecovery?'recovery_':''}${dayKey()}.json`;document.body.append(el);el.click();el.remove();setTimeout(()=>URL.revokeObjectURL(url),30000);toast('Копия подготовлена для скачивания.');}

document.addEventListener('click',async event=>{
 // The skip link only moves focus; following its href would put #content into the address and reopen the wrong page on reload.
 if(event.target.closest('a.skip')){event.preventDefault();$('#content')?.focus();return;}
 let el=event.target.closest('button');
 if(!el&&!event.target.closest('a,input,textarea,select,summary,details,label,[role=button]')&&!globalThis.getSelection()?.toString())el=event.target.closest('[data-card-action]');
 if(!el||el.disabled||performance.now()<ignoreClicks)return;
 if(el.dataset.page){if(el.matches('.brand,.header-title'))homeFeedback.press();go(el.dataset.page);return;}
 const action=el.dataset.action||el.dataset.cardAction,id=el.dataset.id,value=el.dataset.value,pos=Number(el.dataset.pos);
 if(action==='reload-app'){if(unreadable||persist(false)){const url=new URL('/open',location.origin);url.searchParams.set('v',availableRelease||APP_VERSION);url.hash=location.hash;location.assign(url.href);}}
 else if(action==='check-update'){await findUpdate(true);}
 else if(action==='edit-profile')profileForm();
 else if(action==='route-lesson')lessonIntro(id,true);
 else if(action==='next-route'&&lessonById[id]){session=null;state.settings.level=lessonById[id].level;persist();lessonIntro(id,true);}
 else if(action==='basics-tab'){basicsTab=value==='reading'?'reading':'numbers';render();window.scrollTo(0,0);}
 else if(action==='toggle-theme'){const y=window.scrollY;chooseTheme(effectiveTheme()==='dark'?'light':'dark');persist();render();window.scrollTo(0,y);root.querySelector('[data-action="toggle-theme"]')?.focus({preventScroll:true});}
 else if(['open-daily','open-spoken','open-verbs','open-adjectives','open-particles','open-informal','open-common','open-tenses'].includes(action)){referenceTab=({'open-daily':'daily','open-spoken':'spoken','open-common':'common','open-tenses':'tenses','open-verbs':'verbs','open-adjectives':'adjectives','open-particles':'particles','open-informal':'informal'})[action];referenceCategory='all';referenceQuery='';referencePage=1;go('forms');}
 else if(action==='reference-tab'){referenceTab=value;referenceCategory='all';referenceQuery='';referencePage=1;render();}
 else if(action==='reference-train'){const selection=referenceSelection({referenceTab,referenceCategory,referenceQuery,referencePage,referenceData});const pool=shuffle(selection.rows).map(row=>catalog[row.id]).filter(Boolean).sort((a,b)=>{const rank=p=>{const r=state.reviews[p.id];return !r?1:r.due<=Date.now()?0:2;};return rank(a)-rank(b);}).slice(0,6);start(pool,{title:selection.categories.find(cat=>cat.id===selection.selected)?.title||'Практика слов и фраз'});}
 else if(action==='reference-page'){referencePage=Math.max(1,Number(value)||1);render();window.scrollTo(0,0);}
 else if(action==='lab-show-classes'){labTab='classes';labSelection=null;go('wordlab');}
 else if(action==='lab-tab'){labTab=value;labSelection=null;render();}
 else if(action==='lab-category'){labCategory=value;render();}
 else if(action==='lab-open-family'){labTab='meanings';labSelection=id;go('wordlab');}
 else if(action==='lab-open-class'){labTab='classes';labSelection=id;go('wordlab');}
 else if(action==='lab-back'){labSelection=null;render();window.scrollTo(0,0);}
 else if(action==='level'){state.settings.level=value;persist();render();}
 else if(action==='open-level'){state.settings.level=value;persist();go('grammar');}
 else if(action==='mode'){state.settings.mode=value;persist();render();}
 else if(action==='start-next'){if(session){active=true;render();}else if(nextLesson())lessonIntro(nextLesson().id,true);else go('grammar');}
 else if(action==='lesson-intro')lessonIntro(id);
 else if(action==='open-pronunciation')go('pronunciation');
 else if(action==='open-dialogues'){state.settings.level='B2';persist();go('conversation');}
 else if(action==='begin-dialogue'&&lessonById[id]?.roleplay){closeDialog();startLesson(id,false,['easy','mixed','expert'].includes(value)?value:'expert',el.dataset.route==='true');}
 else if(action==='begin-lesson'){closeDialog();startLesson(id,false,null,el.dataset.route==='true');}
 else if(action==='resume'){closeDialog();active=true;render();}
 else if(action==='review-all')go('grammar');
 else if(action==='replace-session'&&requested){const request=requested;closeDialog();start(request.items,request.options,true);}
 else if(action==='close-dialog')closeDialog();
 else if(action==='start-file')startFile();
 else if(action==='start-memory')startMemory();
 else if(action==='study-start'&&session){session.studyDone=true;persist();renderSession();window.scrollTo(0,0);focusPageStart(root,'.exercise h1,h1,h2');}
 else if(action==='open-illustrated'){wordFilter='illustrated';wordLimit=24;query='';go('dictionary');}
 else if(action==='word-filter'){wordFilter=value;wordLimit=24;render();}
 else if(action==='more-words'){wordLimit+=24;const y=window.scrollY;render();window.scrollTo(0,y);}
 else if(action==='word-detail')wordDetail(id);
 else if(action==='add-word')wordForm();
 else if(action==='edit-word')wordForm(id);
 else if(action==='bookmark')toggle(id,'bookmarks');
 else if(action==='difficult')toggle(id,'difficult');
 else if(action==='speak')say(catalog[id]?.da||'',state.settings.rate,el);
 else if(action==='speak-text')say(el.dataset.text,state.settings.rate,el);
 else if(action==='pronunciation-guide'){const guide=pronunciationGuides.find(g=>g.id===id);if(guide)openPronunciation(guide.phraseDa,guide);}
 else if(action==='pronounce-answer'&&session?.submitted)openPronunciation(el.dataset.text);
 else if(action==='pronounce-word')openPronunciation(catalog[id]?.exampleDa||catalog[id]?.da);
 else if(action==='coach-listen'&&coach){document.querySelector('#recording-controls audio')?.pause();say(el.dataset.text,Number(value)||1,el);}
 else if(action==='record-start'&&coach){stopSpeech();document.querySelector('#recording-controls audio')?.pause();void recorder.start();}
 else if(action==='record-stop'&&coach)recorder.stop();
 else if(action==='record-clear'&&coach)recorder.clear();
 else if(action==='test-sound')say('Jeg lærer dansk. Vil du tale lidt langsommere?',state.settings.rate,el);
 else if(action==='train-word'){closeDialog();start([catalog[id]],{title:catalog[id].da});}
 else if(action==='train-filter')start(shuffle(words()),{title:'Мои слова'});
 else if(action==='start-review')start(shuffle(dueItems()),{title:'Повторение по расписанию'});
 else if(action==='practice-known')start(shuffle(getWordEntries(state).filter(p=>getReviewFor(p,state.reviews))),{title:'Знакомые слова'});
 else if(action==='practice-difficult')start(shuffle(getWordEntries(state).filter(p=>isMarked(p,state.difficult))),{title:'Не запомнил'});
 else if(action==='practice-saved')start(shuffle(getWordEntries(state).filter(p=>isMarked(p,state.bookmarks))),{title:'Избранное'});
 else if(action==='choose'&&session&&!session.submitted){session.answer=value;persist();renderSession();}
 else if(action==='add-token'&&session&&!session.submitted&&!session.words.includes(pos)){session.words.push(pos);persist();renderSession();}
 else if(action==='remove-token'&&session&&!session.submitted){session.words.splice(pos,1);persist();renderSession();}
 else if(action==='letter'&&session&&!session.submitted){const input=$('#answer-input'),start=input.selectionStart??input.value.length,end=input.selectionEnd??start;session.answer=(input.value.slice(0,start)+el.dataset.letter+input.value.slice(end)).slice(0,1500);input.value=session.answer;input.focus();input.setSelectionRange(start+1,start+1);persist();$('[data-action=check-answer]').disabled=!hasAnswer(session);}
 else if(action==='listen'||action==='listen-slow'){const t=session.tasks[session.index],text=t.kind==='gap'&&!session.submitted?t.prompt.replace(/___/g,'…'):t.completeDa||catalog[t.itemId].da;say(text,action==='listen-slow'?0.7:state.settings.rate,el);}
 else if(action==='reveal'){session.revealed=true;persist();renderSession();}
 else if(action==='check-answer')checkAnswer();
 else if(action==='self-check'&&session&&!session.selfChecked){session=selfCheckSession(session);const t=session.tasks[session.index],entry=getWordEntries(state).find(p=>p.ids.includes(t.itemId))||{id:t.itemId};if(session.selfChecked){const review=recordAttempt(getReviewFor(entry,state.reviews),{...session.outcomes.at(-1),selfChecked:true});for(const alias of entry.ids||[t.itemId])if(alias===t.itemId||state.reviews[alias])state.reviews[alias]=review;persist();renderSession();}}
 else if(action==='give-up')checkAnswer(true);
 else if(action==='next-task')nextTask();
 else if(action==='pause-request')showDialog('Сохранить и выйти?','<p>Ответы и место в занятии сохранятся. Продолжить можно будет с главной страницы.</p>',btn('Остаться','close-dialog','secondary')+btn('Сохранить и выйти','pause'));
 else if(action==='pause'){closeDialog();stopSpeech();persist();go('learn');}
 else if(action==='next-lesson'){const mode=lessonById[id]?.roleplay?session?.mode:null;session=null;persist();startLesson(id,false,mode);}
 else if(action==='copy-link'){try{await navigator.clipboard.writeText((offlineEdition?hostedUrl:location.origin)+'/#learn');toast('Ссылка скопирована. Доступ друзьям настраивает владелец.');}catch{toast('Скопируй адрес приложения из адресной строки.');}}
 else if(action==='finish'||action==='finish-progress'){session=null;persist();go(action==='finish'?'learn':'progress');}
 else if(action==='cloud-retry')void cloud?.refresh();
 else if(action==='cloud-conflict')showCloudConflict();
 else if(action==='cloud-local'||action==='cloud-remote'){closeDialog();await cloud?.resolve(action==='cloud-local'?'local':'remote');if(!cloud?.status().hasConflict)cloudConflict=null;render();}
 else if(action==='cloud-recovery'){const copy=cloudCopies()[Number(id)||0];if(copy)download(JSON.stringify(copy.local,null,2),true);else toast('Сохранённая копия пока отсутствует.');}
 else if(action==='export')download();
 else if(action==='export-recovery'&&recovery)download(recovery,true);
 else if(action==='import')$('#progress-file').click();
 else if(action==='confirm-import'&&importCandidate)replaceProgress(false);
 else if(action==='export-before-import'&&importCandidate)replaceProgress(true);
 else if(action==='download-unreadable'&&unreadable)download(unreadable.raw,true);
 else if(action==='start-fresh'&&unreadable)showDialog('Начать заново?','<p>Сохранённые данные не удаляются: их копия остаётся на этом устройстве в настройках («Копии прогресса»), и её можно скачать. Приложение начнёт с пустого прогресса.</p>',btn('Отмена','close-dialog','secondary')+btn('Начать заново','confirm-fresh'));
 else if(action==='confirm-fresh'&&unreadable){
  if(!hasCopy(unreadable.raw)&&!saveProgressCopy(localStorage,KEY,unreadable.raw,'fresh')){closeDialog();toast('Браузер не смог сохранить копию. Сначала скачай её кнопкой «Скачать копию».');return;}
  unreadable=null;session=null;closeDialog();persist();render();toast('Начато заново. Прежние данные остались в копиях.');
 }
 else if(action==='download-copy'){const copy=localCopies().find(item=>item.id===Number(id));if(copy)download(copy.raw,true);}
 else if(action==='restore-copy'){
  const copy=localCopies().find(item=>item.id===Number(id));
  try{importCandidate=validateState(JSON.parse(copy.raw));importReason='restore';showImportDialog('Вернуть эту копию?','В копии');}
  catch{toast('Эту копию нельзя прочитать как прогресс. Её можно только скачать.');}
 }
 else if(action==='install'&&installEvent){await installEvent.prompt();installEvent=null;render();}
});
document.addEventListener('toggle',event=>{if(active&&session&&!session.submitted&&event.target.matches?.('details.hint')&&event.target.open){session.helped=true;persist();}},true);
const searchFields=['reference-search','word-search','lab-search'];
document.addEventListener('input',event=>{
 if(event.target.id==='number-input'){numberValue=event.target.value;$('#number-result').innerHTML=renderNumberResult(numberValue);return;}
 if(searchFields.includes(event.target.id)){
  if(event.target.id==='reference-search'){referenceQuery=event.target.value;referencePage=1;}
  else if(event.target.id==='word-search'){query=event.target.value;wordLimit=24;}
  else labQuery=event.target.value;
  // Typing is cheap; redrawing the lists waits for a short pause. render() keeps the field focused with its caret.
  if(!event.isComposing)renderSearch();
 }
 if(event.target.id==='answer-input'&&session&&!session.submitted){session.answer=event.target.value;persist();$('[data-action=check-answer]').disabled=!hasAnswer(session);}
});
document.addEventListener('compositionend',event=>{if(searchFields.includes(event.target.id))renderSearch();});
document.addEventListener('submit',event=>{
 if(event.target.id==='profile-form'){event.preventDefault();const next=structuredClone(state);next.settings.name=String(new FormData(event.target).get('name')||'');try{if(next.settings.name.length>40||/[\u0000-\u001f\u007f]/.test(next.settings.name))throw new Error('name');const clean=validateState(next),previous=state;state=clean;if(!persist()){state=previous;return;}closeDialog();render();toast('Имя сохранено.');}catch{$('#profile-error').textContent='Не больше 40 символов, без переносов строки.';}return;}
 if(event.target.id!=='word-form')return;event.preventDefault();
 const form=event.target,data=new FormData(form),id=form.dataset.id,values=Object.fromEntries(['da','ru','note','association'].map(key=>[key,String(data.get(key)||'').trim()]));
 if(!values.da||!values.ru){$('#form-error').textContent='Заполни датское слово и перевод.';return;}
 if(Object.values(catalog).some(p=>p.id!==id&&normalize(p.da)===normalize(values.da))){$('#form-error').textContent='Такое слово уже есть. Найди его в словаре и отметь «Не запомнил».';return;}
 const next=structuredClone(state);
 if(id){const index=next.customWords.findIndex(p=>p.id===id);if(index<0)return;next.customWords[index]={id,...values};}
 else next.customWords.push({id:`u-${Date.now().toString(36)}-${Math.random().toString(36).slice(2,9)}`,...values});
 try{state=validateState(next);}catch(error){$('#form-error').textContent=error.message;return;}
 catalog=getCatalog(state);persist();closeDialog();wordFilter='personal';query='';go('dictionary');toast('Слово сохранено.');
});
document.addEventListener('change',async event=>{
 if(event.target.matches('[data-reference-category]')){referenceCategory=event.target.value;referencePage=1;render();$('#reference-category')?.focus({preventScroll:true});return;}
 const key=event.target.dataset.setting;
 if(key==='language'){if(!['uk','ru'].includes(event.target.value))return;state.settings.language=event.target.value;if(persist())location.reload();return;}
 if(key){if(key==='theme')chooseTheme(event.target.value);else state.settings[key]=['fontSize','goal','rate','newPerDay'].includes(key)?Number(event.target.value):event.target.value;persist();render();}
 if(event.target.id==='progress-file'){
  const file=event.target.files[0];if(!file)return;
  try{if(file.size>3000000)throw new Error('Файл больше 3 МБ.');importCandidate=validateState(JSON.parse(await file.text()));importReason='import';showImportDialog('Заменить текущий прогресс?','В файле');}
  catch(error){toast(error instanceof SyntaxError?'Не удалось прочитать JSON. Прогресс не изменён.':error.message);}
  finally{event.target.value='';}
 }
});
document.addEventListener('keydown',event=>{
 const dialog=$('.dialog-backdrop');
 if(dialog){if(event.key==='Escape'){event.preventDefault();closeDialog();}if(event.key==='Tab'){const els=[...dialog.querySelectorAll(FOCUSABLE)].filter(el=>!el.disabled&&el.getClientRects().length>0),first=els[0],last=els.at(-1);if(!first){event.preventDefault();return;}if(!dialog.contains(document.activeElement)){event.preventDefault();first.focus();}else if(event.shiftKey&&document.activeElement===first){event.preventDefault();last.focus();}else if(!event.shiftKey&&document.activeElement===last){event.preventDefault();first.focus();}}return;}
 if(!active||!session||!session.studyDone||session.index>=session.tasks.length)return;
 const token=event.target.closest('[data-source=answer]');
 if(token&&!session.submitted&&['ArrowLeft','ArrowRight'].includes(event.key)){const from=Number(token.dataset.pos),to=from+(event.key==='ArrowLeft'?-1:1);session.words=moveToken(session.words,from,to);event.preventDefault();persist();renderSession();$(`.answer-zone [data-pos="${Math.max(0,Math.min(session.words.length-1,to))}"]`)?.focus();return;}
 if(event.key==='Enter'&&!event.repeat){if(event.target.closest('button,summary,a,select'))return;event.preventDefault();session.submitted?nextTask():checkAnswer();}
 else if(/^[1-4]$/.test(event.key)&&!event.target.closest('input,textarea')&&!session.submitted){const option=session.tasks[session.index].options[Number(event.key)-1];if(option){session.answer=option;persist();renderSession();}}
});
document.addEventListener('pointerdown',event=>{const el=event.target.closest('.token');if(!el||el.disabled||!active||session?.submitted||event.button!==0)return;drag={source:el.dataset.source,pos:Number(el.dataset.pos),x:event.clientX,y:event.clientY,el,ghost:null};});
document.addEventListener('pointermove',event=>{if(!drag)return;if(!drag.ghost&&Math.hypot(event.clientX-drag.x,event.clientY-drag.y)>8){drag.ghost=drag.el.cloneNode(true);drag.ghost.className='token drag-ghost';drag.ghost.setAttribute('aria-hidden','true');document.body.append(drag.ghost);document.body.classList.add('dragging');}if(drag.ghost){event.preventDefault();drag.ghost.style.left=`${event.clientX+10}px`;drag.ghost.style.top=`${event.clientY-20}px`;}},{passive:false});
document.addEventListener('pointerup',event=>{
 if(!drag)return;const current=drag;drag=null;if(!current.ghost)return;current.ghost.remove();document.body.classList.remove('dragging');ignoreClicks=performance.now()+200;
 const target=document.elementFromPoint(event.clientX,event.clientY),zone=target?.closest('.answer-zone'),bank=target?.closest('.token-bank');
 if(zone){const before=target.closest('[data-source=answer]'),to=before?Number(before.dataset.pos):session.words.length;if(current.source==='bank'&&!session.words.includes(current.pos))session.words.splice(to,0,current.pos);else if(current.source==='answer')session.words=moveToken(session.words,current.pos,Math.min(to,session.words.length-1));}
 else if(bank&&current.source==='answer')session.words.splice(current.pos,1);
 persist();renderSession();
});
document.addEventListener('pointercancel',()=>{drag?.ghost?.remove();drag=null;document.body.classList.remove('dragging');});
globalThis.addEventListener('pagehide',()=>{recorder.clear();stopSpeech();});
// Another tab saved progress: combine it with ours (immediately if idle, quietly during a lesson or dialog).
globalThis.addEventListener('storage',event=>{if(event.key===KEY&&event.newValue!==null&&event.newValue!==saved.raw)syncFromOtherTab();});
try{globalThis.matchMedia?.('(prefers-color-scheme: dark)').addEventListener?.('change',()=>{if(themeSource==='auto'){preferences();if(!active&&!$('.dialog-backdrop'))render();}});}catch{ /* Older browsers keep the theme chosen at load. */ }
document.addEventListener('visibilitychange',()=>{if(document.hidden){recorder.clear();stopSpeech();}});
globalThis.addEventListener('beforeinstallprompt',event=>{event.preventDefault();installEvent=event;if(page==='settings'&&!active)render();});
globalThis.speechSynthesis?.addEventListener('voiceschanged',()=>{if(page!=='settings'||active)return;const select=$('#voice'),status=$('.voice-status');if(select)select.innerHTML=voiceOptions(state.settings.voiceUri);if(status){status.innerHTML=icon('sound')+h(voiceStatus(state.settings.voiceUri));status.classList.toggle('available',getDanishVoices().length>0);}});
globalThis.addEventListener('hashchange',()=>{if(!active)go(location.hash.slice(1));});
function updateCloudPanel(){const panel=$('.continuity-panel');if(panel)panel.outerHTML=cloudSettings(cloudStatus,cloudConflict,cloudCopies());}
function maybeCloudConflict(){const dialog=$('.dialog-backdrop');if(cloudConflict&&!active&&!session&&shownCloudRevision!==cloudConflict.revision&&(!dialog||dialog.querySelector('[data-action=cloud-local]')))showCloudConflict();}
function showCloudConflict(){
 if(!cloudConflict)return;
 shownCloudRevision=cloudConflict.revision;const local=state,{remote}=cloudConflict;
 showDialog('Есть две версии прогресса',`<p>На этом устройстве: ${local.xp} XP, ${Object.keys(local.completed).length} уроков. В сохранённой версии: ${remote?.xp||0} XP, ${Object.keys(remote?.completed||{}).length} уроков.</p><p>Выбери, какую версию использовать. Копия текущих данных сохранится для восстановления. Очки двух версий автоматически не складываются.</p>`,btn('Оставить эту версию','cloud-local','primary')+btn('Загрузить сохранённую','cloud-remote','secondary')+btn('Скачать копию устройства','export','secondary'));
}
if(!offlineEdition)cloud=createCloudSync({getState:()=>state,canApply:()=>!active&&!session&&!unreadable&&!$('.dialog-backdrop'),onRemote:next=>{const raw=JSON.stringify(next);localStorage.setItem(KEY,raw);state=next;saved={raw,state:structuredClone(next)};if(next.settings.theme!=='light'&&themeSource==='auto'){themeSource='user';try{localStorage.setItem(THEME_SOURCE,'user');}catch{ /* Kept in the progress itself. */ }}if(state.settings.language!==appLanguage){location.reload();return;}catalog=getCatalog(state);render();},onStatus:status=>{cloudStatus=status;updateCloudPanel();},onConflict:conflict=>{cloudConflict=conflict;updateCloudPanel();maybeCloudConflict();}});
render();void cloud?.start();
if(!offlineEdition)void prepareOfflineCache(()=>{lastUpdateCheck=0;void findUpdate();}).then(ready=>{offlineReady=ready;const status=$('[data-offline-status]');if(status)status.textContent=offlineCacheMessage(ready);});

function showAppUpdate(){
 if($('#app-update'))return;
 const notice=document.createElement('div');notice.id='app-update';notice.className='app-update';notice.setAttribute('role','status');
 notice.innerHTML='<span>Доступна новая версия</span><button class="btn secondary" data-action="reload-app">Обновить</button>';document.body.append(notice);
}
const APP_VERSION='1.9.1';let availableRelease=null,lastUpdateCheck=0,checkingUpdate=false;
async function findUpdate(manual=false){
 if(offlineEdition||checkingUpdate||!manual&&Date.now()-lastUpdateCheck<300000)return;
 checkingUpdate=true;lastUpdateCheck=Date.now();
 const version=await checkRelease(APP_VERSION);checkingUpdate=false;
 if(version){availableRelease=version;showAppUpdate();}
 else if(manual)toast(version===false?'Не удалось проверить обновление. Проверь подключение и попробуй ещё раз.':'Установлена актуальная версия '+APP_VERSION+'.');
}
if(!offlineEdition){void findUpdate();globalThis.addEventListener('focus',()=>void findUpdate());globalThis.addEventListener('online',()=>{lastUpdateCheck=0;void findUpdate();});document.addEventListener('visibilitychange',()=>{if(!document.hidden)void findUpdate();});}

function languageSetting(){return `<div class="language-setting"><label for="learning-language">Язык обучения</label><select id="learning-language" data-setting="language"><option value="uk" ${appLanguage==='uk'?'selected':''}>Українська</option><option value="ru" ${appLanguage==='ru'?'selected':''}>Русский</option></select></div>`;}

function profileSetting(){return `<div class="profile-setting"><div><b>${state.settings.name?h(state.settings.name):'Твоё имя'}</b><small>Необязательно. Имя появится в приветствии.</small></div>${btn(state.settings.name?'Изменить имя':'Добавить имя','edit-profile','secondary')}</div>`;}
function profileForm(){showDialog('Как к тебе обращаться?',`<form id="profile-form" class="profile-form"><label for="profile-name">Имя</label><input id="profile-name" name="name" type="text" autocomplete="given-name" maxlength="40" value="${h(state.settings.name||'')}" placeholder="Например, Владимир"><p class="field-note">Можно оставить пустым. Прогресс и слова останутся.</p><div id="profile-error" class="form-error" role="alert"></div><div class="dialog-actions"><button class="btn primary" type="submit">Сохранить имя</button></div></form>`);}
