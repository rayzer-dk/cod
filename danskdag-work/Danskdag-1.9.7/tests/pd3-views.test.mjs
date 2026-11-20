import test from 'node:test';
import assert from 'node:assert/strict';
import {fixtureData as data} from './fixtures/pd3-fixture-data.mjs';
import {defaults} from '../dist/pd3-store.mjs';
import {hubView,readingListView,readingItemView,dictationListView,dictationItemView,listeningListView,listeningItemView} from '../dist/pd3-views.mjs';
import {examListView,examIntroView,examFindView,examTextView,writingListView,writingItemView,oralView,recorderHtml,wordMeter} from '../dist/pd3-practice-views.mjs';
import {wordsHtml,sentenceHtml,textHtml,playerHtml,statusText} from '../dist/pd3-reader-view.mjs';
import {scoreDictation} from '../dist/pd3-diff.mjs';

const d=()=>defaults();
const plain=html=>html.replace(/<[^>]+>/g,'');
const idle={status:'idle',index:0,word:-1,total:3,message:''};

test('words and sentences are wrapped so the text itself stays unchanged',()=>{
 const html=wordsHtml('Jeg bor i København, ok.');
 assert.equal(html.replace(/<[^>]+>/g,''),'Jeg bor i København, ok.');
 assert.equal((html.match(/class="pd3-w"/g)||[]).length,5);
 assert.match(html,/data-w="3">København</);
 const unit=sentenceHtml({da:'Hej &',ru:'привет'},2,{translation:true});
 assert.match(unit,/<button type="button" class="pd3-sent" data-action="pd3-seek" data-pos="2" lang="da" data-audio-ready>/);
 assert.match(unit,/Hej<\/span> &amp;</);assert.match(unit,/<small class="pd3-tr" lang="ru">привет<\/small>/);
 assert.doesNotMatch(sentenceHtml({da:'Hej',ru:'x'},0),/pd3-tr/);
});

test('paragraph ranges are kept and uncovered sentences are not lost',()=>{
 const item=data.readingPractice[0];
 assert.equal((textHtml(item).match(/<p>/g)||[]).length,2);
 const partial=textHtml({sentences:item.sentences,paragraphs:[[0,1]]});
 assert.equal((partial.match(/class="pd3-sent"/g)||[]).length,3);
});

test('the player has real buttons with names, a live status and keyboard help',()=>{
 const html=playerHtml({rate:0.75,follow:true,translation:false});
 for(const action of ['pd3-play','pd3-prev','pd3-next','pd3-stop'])assert.match(html,new RegExp(`<button type="button"[^>]*data-action="${action}"`));
 assert.match(html,/aria-label="Предыдущее предложение"/);
 assert.match(html,/id="pd3-status" role="status" aria-live="polite"/);
 for(const rate of ['0,6×','0,75×','0,9×','1×'])assert.ok(html.includes(rate),rate);
 assert.match(html,/data-value="0.75" aria-pressed="true"/);assert.match(html,/Пробел/);
 assert.match(statusText({...idle,status:'playing',index:2}),/предложение 3 из 3/);
});

test('hub lists six sections with the exam disclaimer, backup buttons and empty states',()=>{
 const html=hubView({data,d:d(),error:''});
 assert.equal((html.match(/data-action="pd3-open"/g)||[]).length,6);
 assert.match(html,/не официальный экзамен/);assert.match(html,/pd3-export/);assert.match(html,/pd3-import/);assert.match(html,/type="file"/);
 const emptyHtml=hubView({data:{...data,dictations:[]},d:d(),error:''});assert.match(emptyHtml,/disabled/);assert.match(emptyHtml,/Материалы появятся позже/);
});

test('read-aloud page shows sentences, vocabulary and questions; checked answers explain themselves',()=>{
 const item=data.readingPractice[0];
 const fresh=readingItemView({item,d:d(),run:{answers:{},checked:false,score:0}});
 assert.match(fresh,/data-action="pd3-check"/);assert.match(fresh,/Словарик/);assert.equal((fresh.match(/type="radio"/g)||[]).length,6);
 const done=readingItemView({item,d:d(),run:{answers:{'q:0':0,'q:1':0},checked:true,score:1}});
 assert.match(done,/верно/);assert.match(done,/не то/);assert.match(done,/Почему/);assert.match(done,/1 \/ 2/);assert.doesNotMatch(done,/data-action="pd3-check"/);
 assert.match(readingListView({data,d:d()}),/data-id="fx-read"/);
});

test('dictation inputs are Danish text fields with spellcheck and autocorrect off',()=>{
 const sentences=dictationItemView({item:data.dictations[0],d:d(),run:{inputs:{},plays:{},result:null}});
 assert.match(sentences,/<input type="text" id="pd3-dict-in-0"[^>]*lang="da" autocapitalize="none" autocorrect="off"[^>]*spellcheck="false"/);
 assert.match(sentences,/data-action="pd3-letter" data-letter="æ"/);assert.equal((sentences.match(/data-action="pd3-dict-listen"/g)||[]).length,2);
 const text=dictationItemView({item:data.dictations[1],d:d(),run:{inputs:{},plays:{},result:null}});
 assert.match(text,/<textarea id="pd3-dict-text"[^>]*lang="da" autocapitalize="none" autocorrect="off"/);
 const limited={...d()};limited.settings={...limited.settings,dictation:{...limited.settings.dictation,limit:2}};
 const used=dictationItemView({item:data.dictations[0],d:limited,run:{inputs:{},plays:{0:2},result:null}});
 assert.match(used,/data-pos="0" disabled/);assert.match(used,/Повторы закончились/);
 assert.match(dictationListView({data,d:d()}),/Текст целиком|По предложениям/);
});

test('dictation result marks differences in the reference and in the typed text and lists typical errors',()=>{
 const item=data.dictations[0];
 const result=scoreDictation(item.sentences,{0:'jeg gar pa arbejde',1:'det regner'},'sentences');
 const html=dictationItemView({item,d:d(),run:{inputs:{0:'jeg gar pa arbejde',1:'det regner'},plays:{},result}});
 assert.match(html,/pd3-d-misspelled/);assert.match(html,/pd3-d-missing/);assert.match(html,/Буквы æ, ø, å/);assert.match(html,/Пропущенные слова/);
 assert.match(html,/class="sr-only"> \(пропущено\)/);assert.match(html,/id="pd3-play"/);assert.match(html,/data-reader-text/);assert.match(html,/Слушай æ, ø, å\./);
 const whole=scoreDictation(data.dictations[1].sentences,{all:'Hun bor i Aarhus'},'text');
 const textHtml2=dictationItemView({item:data.dictations[1],d:d(),run:{inputs:{all:'Hun bor i Aarhus'},plays:{},result:whole}});
 assert.equal((textHtml2.match(/class="pd3-sent"/g)||[]).length,2);assert.match(textHtml2,/pd3-d-missing/);
});

test('listening hides the transcript until the answers are checked',()=>{
 const item=data.listening[0];
 const before=listeningItemView({item,d:d(),run:{phase:'listen',plays:0,answers:{},score:0,snap:null}});
 assert.doesNotMatch(plain(before),/Hej, det er Lise/);assert.doesNotMatch(before,/type="radio"/);assert.match(before,/pd3-listen/);
 const during=listeningItemView({item,d:d(),run:{phase:'listen',plays:2,answers:{},score:0,snap:{status:'idle'}}});
 assert.match(during,/id="pd3-listen-btn" data-action="pd3-listen" disabled/);assert.doesNotMatch(plain(during),/Hej, det er Lise/);assert.match(during,/type="radio"/);
 const after=listeningItemView({item,d:d(),run:{phase:'result',plays:1,answers:{'q:0':0},score:1,snap:null}});
 assert.match(after,/Расшифровка/);assert.match(plain(after),/Hej, det er Lise/);assert.match(after,/data-action="pd3-seek"/);
 assert.match(listeningListView({data,d:d()}),/fx-listen/);
});

test('reading exam Del 1: sections, selects, evidence and explanations after checking',()=>{
 const item=data.readingExamFind[0];
 const run={phase:'run',answers:{},timerOn:true,remaining:1500};
 const html=examFindView({item,run});
 assert.match(html,/role="timer"[^>]*>25:00</);assert.equal((html.match(/<select/g)||[]).length,2);assert.equal((html.match(/pd3-toc/g)||[]).length>0,true);
 assert.doesNotMatch(html,/pd3-evid/);
 const checked=examFindView({item,run:{phase:'result',answers:{'find:q1':'s2','find:q2':'s2'},timerOn:false}});
 assert.match(checked,/<mark class="pd3-evid"[^>]*>lukker klokken ti<\/mark>/);assert.match(checked,/Верно\./);assert.match(checked,/Неверно\./);assert.match(checked,/1 \/ 2/);assert.match(checked,/Почему/);
 assert.match(examIntroView({kind:'find',item,d:d()}),/25 минут/);assert.match(examIntroView({kind:'find',item,d:d()}),/data-pd3-setting="timerExam"/);
 assert.match(examListView({data,d:d()}),/Del 1 · 25 мин/);assert.match(examListView({data,d:d()}),/Del 2 · 65 мин/);
});

test('reading exam Del 2: paragraph gaps use each paragraph once, cloze gaps have four options, results per part',()=>{
 const item=data.readingExamText[0];
 const run={phase:'run',task:'t2',answers:{'t2:1':'B'},timerOn:false};
 const t2=examTextView({item,run});
 assert.equal((t2.match(/data-pd3-set="t2:/g)||[]).length,2);
 assert.match(t2,/<option value="B" selected[^>]*>B</);
 assert.match(t2,/<option value="B"  disabled>B \(уже использован\)<\/option>/);
 assert.doesNotMatch(t2,/C не подходит/);
 const t3=examTextView({item,run:{...run,task:'t3'}});
 assert.equal((t3.match(/data-pd3-set="t3:1"/g)||[]).length,1);assert.equal((t3.match(/<option value="[0-3]"/g)||[]).length,8);
 const t1=examTextView({item,run:{...run,task:'t1'}});assert.match(t1,/type="radio"/);
 const result=examTextView({item,run:{phase:'result',task:'t2',answers:{'t1:0':0,'t2:1':'B','t2:2':'C','t3:1':0,'t3:2':1},timerOn:false}});
 assert.match(result,/Текст 1 \(вопросы\): 1 из 1/);assert.match(result,/Текст 2 \(абзацы\): 1 из 2/);assert.match(result,/Текст 3 \(пропуски\): 1 из 2/);assert.match(result,/Нужен абзац A/);assert.match(result,/C не подходит/);
});

test('writing page: textarea attributes, counter, letters, requirement boxes; done page compares with the model',()=>{
 const item=data.writingEmail[0];
 const run={phase:'write',option:'A',text:'Kære dig',remaining:null,timerOn:false};
 const html=writingItemView({kind:'email',item,d:d(),run,data});
 assert.match(html,/<textarea id="pd3-write" lang="da" autocapitalize="sentences" autocorrect="off"/);
 assert.match(html,/Слов: <b>2<\/b> · нужно 10–30 · мало, не хватает ещё 8/);
 for(const l of ['æ','ø','å','Æ','Ø','Å'])assert.match(html,new RegExp(`data-letter="${l}"`));
 assert.equal((html.match(/data-pd3-check="req:/g)||[]).length,2);assert.match(html,/data-pd3-check="check:0"/);
 assert.match(html,/<p >Kære dig,<\/p><p >Skriv til os\.<\/p>/);assert.match(html,/Venlig hilsen<br>Firma/);
 assert.doesNotMatch(html,/Образец/);
 const stored=d();stored.writing['fx-mail']={draft:'x',option:'A',updatedAt:1,done:true,req:[true],check:[],self:{content:4}};
 const done=writingItemView({kind:'email',item,d:stored,run:{...run,phase:'done',text:'Jeg skriver, fordi det er vigtigt. Desuden er det sjovt.'},data});
 assert.match(done,/Механические проверки/);assert.match(done,/fordi, desuden/);assert.match(done,/Образец/);assert.match(done,/Самооценка/);
 assert.match(done,/id="pd3-wself-content-4" name="pd3-wself-content" data-pd3-self="content" value="4" checked/);
 assert.equal((done.match(/data-pd3-self=/g)||[]).length,2*5);
 const task=writingItemView({kind:'task',item:data.writingTask[0],d:d(),run:{...run,option:'B',text:''},data});
 assert.match(task,/Skriv om din by/);assert.doesNotMatch(task,/Skriv om dit arbejde/);assert.match(task,/data-action="pd3-wopt" data-value="B" aria-pressed="true"/);
 assert.match(writingListView({data,d:d()}),/data-value="task"/);
 assert.equal(wordMeter(25,20,40).level,'ok');assert.equal(wordMeter(41,20,40).level,'high');
});

test('oral part says there is no automatic assessment and keeps recording private',()=>{
 const base={tab:'monologue',id:null,key:'',step:0,started:false,kw:[],rec:{phase:'idle',url:'',message:''},remaining:120,timerOn:false};
 const first=oralView({data,d:d(),run:base});
 assert.match(first,/не оценивает речь автоматически/);assert.match(first,/не сохраняется и не отправляется/);assert.match(first,/data-value="phrases"/);
 const mono=oralView({data,d:d(),run:{...base,id:'fx-mono',key:'mono-fx-mono',kw:['arbejde','kolleger']}});
 assert.match(mono,/Лист ключевых слов \(до 12\)/);assert.equal((mono.match(/data-pd3-kw=/g)||[]).length,2);assert.match(mono,/2:00/);assert.match(mono,/pd3-mono-start/);assert.match(mono,/до 150 секунд/);assert.match(mono,/Самооценка/);
 const full=oralView({data,d:d(),run:{...base,id:'fx-mono',kw:Array.from({length:12},(_,i)=>'w'+i)}});assert.match(full,/pd3-kw-add" disabled/);
 const interview=oralView({data,d:d(),run:{...base,tab:'interview',id:'fx-int'}});assert.match(interview,/pd3-say/);assert.match(interview,/Вопрос 1 из 2/);assert.match(interview,/до 60 секунд/);
 const last=oralView({data,d:d(),run:{...base,tab:'interview',id:'fx-int',step:1}});assert.match(last,/Уточняющие вопросы/);
 const inter=oralView({data,d:d(),run:{...base,tab:'interaction',id:'fx-inter',started:true,step:0}});assert.match(inter,/Goddag, kan jeg hjælpe/);assert.doesNotMatch(inter,/Vi har åbent til fem/);assert.match(inter,/pd3-int-next/);
 const inter2=oralView({data,d:d(),run:{...base,tab:'interaction',id:'fx-inter',started:true,step:1}});assert.match(inter2,/Диалог закончен/);
 const disc=oralView({data,d:d(),run:{...base,tab:'discussion',id:'fx-disc'}});assert.match(disc,/Mindre trafik/);assert.match(disc,/Mindre kontakt/);
 assert.match(oralView({data,d:d(),run:{...base,tab:'phrases'}}),/desuden/);
 const rec=recorderHtml({phase:'ready',url:'blob:x',message:''},{maxSeconds:150});
 assert.match(rec,/<audio controls src="blob:x">/);assert.match(rec,/Удалить запись/);assert.match(recorderHtml({phase:'recording',url:'',message:''}),/pd3-rec-stop/);
});
