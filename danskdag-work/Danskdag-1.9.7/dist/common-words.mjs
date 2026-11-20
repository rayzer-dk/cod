export const commonCategories = [
  {id:'nouns',title:'Существительные',da:'Substantiver',icon:'home',note:'Предметы, люди и понятия. Учи слово вместе с en или et.'},
  {id:'adverbs',title:'Наречия',da:'Adverbier',icon:'clock',note:'Частота, время и оттенки смысла: уже, ещё, всё равно.'},
  {id:'pronouns',title:'Местоимения',da:'Pronominer',icon:'chat',note:'Кто действует, к кому обращаются и кому что принадлежит.'},
  {id:'prepositions',title:'Предлоги',da:'Præpositioner',icon:'map',note:'Учи целую конструкцию: один предлог может иметь разные переводы.'},
  {id:'conjunctions',title:'Союзы',da:'Konjunktioner',icon:'link',note:'Связи между частями предложения и порядок слов после них.'},
  {id:'questions',title:'Вопросительные слова',da:'Spørgeord',icon:'search',note:'Учебная группа слов и сочетаний для вопросов; она включает разные части речи.'}
];

const nounRows = [
  ['en dag','день',['dagen','dage','dagene'],'Jeg har fri en dag om ugen.','У меня один выходной в неделю.','I dag — сегодня; om dagen — днём.'],
  ['en uge','неделя',['ugen','uger','ugerne'],'Vi ses om en uge.','Увидимся через неделю.','Om en uge — через неделю; i en uge — в течение недели.'],
  ['en måned','месяц',['måneden','måneder','månederne'],'Jeg betaler en gang om måneden.','Я плачу раз в месяц.','En gang om måneden — раз в месяц.'],
  ['et år','год',['året','år','årene'],'Hun har boet her i tre år.','Она живёт здесь три года.','Во множественном числе без артикля: år; bestemt flertal: årene.'],
  ['en tid','время; назначенное время',['tiden','tider','tiderne'],'Jeg har bestilt en tid hos lægen.','Я записался к врачу.','Bestille en tid — записаться на приём; have tid — иметь время.'],
  ['et sted','место',['stedet','steder','stederne'],'Kender du et godt sted at spise?','Ты знаешь хорошее место, где можно поесть?','Et sted — место; et eller andet sted — где-то.'],
  ['et job','работа; рабочее место',['jobbet','jobs','jobbene'],'Hun har fået et nyt job.','Она нашла новую работу.','Et job — должность или место работы; arbejde может обозначать деятельность.'],
  ['en familie','семья',['familien','familier','familierne'],'Min familie bor i Danmark.','Моя семья живёт в Дании.','После min артикль en не ставят: min familie.'],
  ['et barn','ребёнок',['barnet','børn','børnene'],'Der er to børn i haven.','В саду двое детей.','Неправильное множественное число: barn → børn.'],
  ['en ven','друг',['vennen','venner','vennerne'],'Jeg skal mødes med en ven.','Я собираюсь встретиться с другом.','Mødes med en ven — встретиться с другом.'],
  ['et hus','дом',['huset','huse','husene'],'De bor i et lille hus.','Они живут в маленьком доме.','Et lille hus, но flere små huse.'],
  ['en lejlighed','квартира',['lejligheden','lejligheder','lejlighederne'],'Vi leder efter en lejlighed.','Мы ищем квартиру.','Здесь квартира; ved en anden lejlighed — в другой раз, при другом случае.'],
  ['et værelse','комната',['værelset','værelser','værelserne'],'Værelset er ledigt fra mandag.','Комната свободна с понедельника.','Værelse — отдельная комната; bolig — жильё в целом.'],
  ['en dør','дверь',['døren','døre','dørene'],'Kan du lukke døren?','Можешь закрыть дверь?','Lukke døren — закрыть дверь; åbne døren — открыть.'],
  ['en nøgle','ключ',['nøglen','nøgler','nøglerne'],'Jeg kan ikke finde min nøgle.','Я не могу найти свой ключ.','Основа заканчивается на e: определённая форма nøglen, множественное число nøgler.'],
  ['en bil','автомобиль',['bilen','biler','bilerne'],'Jeg tager bilen i dag.','Сегодня я поеду на машине.','Tage bilen — поехать на машине; køre bil — водить машину.'],
  ['en cykel','велосипед',['cyklen','cykler','cyklerne'],'Min cykel står udenfor.','Мой велосипед стоит снаружи.','Cykel → cyklen → cykler: e основы выпадает перед окончанием.'],
  ['en bus','автобус',['bussen','busser','busserne'],'Hvornår går den næste bus?','Когда отправляется следующий автобус?','В формах bussen и busser удваивается s.'],
  ['et tog','поезд',['toget','tog','togene'],'Jeg tager toget til Odense.','Я еду поездом в Оденсе.','Et tog — поезд; tog также прошедшая форма tage в другом контексте.'],
  ['en butik','магазин',['butikken','butikker','butikkerne'],'Butikken lukker klokken seks.','Магазин закрывается в шесть.','Butik — магазин, где продают товары; не английское boutique в узком смысле.'],
  ['en pris','цена; награда',['prisen','priser','priserne'],'Hvad er prisen for en billet?','Сколько стоит билет?','Здесь цена; vinde en pris — получить награду.'],
  ['en aftale','договорённость; встреча по договорённости',['aftalen','aftaler','aftalerne'],'Vi har en aftale i morgen.','У нас назначена встреча на завтра.','Lave en aftale — договориться; overholde en aftale — выполнить договорённость.'],
  ['et spørgsmål','вопрос',['spørgsmålet','spørgsmål','spørgsmålene'],'Må jeg stille et spørgsmål?','Можно задать вопрос?','Stille et spørgsmål — задать вопрос. Множественное число: spørgsmål.'],
  ['et svar','ответ',['svaret','svar','svarene'],'Jeg venter på et svar.','Я жду ответа.','Vente på et svar — ждать ответа; svare på et spørgsmål — отвечать на вопрос.'],
  ['en ting','вещь; дело',['tingen','ting','tingene'],'Jeg skal lige spørge om en ting.','Я только спрошу об одном.','En ting может обозначать и предмет, и вопрос или обстоятельство.' ]
];
const groups = {
  adverbs:[
    ['ikke','не','Jeg arbejder ikke om søndagen.','Я не работаю по воскресеньям.','В главном предложении обычно после личного глагола; в придаточном порядок другой.'],
    ['også','тоже; также','Jeg vil også gerne med.','Я тоже хочу пойти с вами.','Позиция и ударение показывают, к какой части фразы относится «тоже».'],
    ['kun','только; всего','Jeg har kun ti minutter.','У меня всего десять минут.','Kun ограничивает: только это, не больше.'],
    ['altid','всегда','Hun kommer altid til tiden.','Она всегда приходит вовремя.','Altid после личного глагола в этом главном предложении.'],
    ['aldrig','никогда','Jeg har aldrig været der.','Я никогда там не был.','Altid — всегда, aldrig — никогда. Второе ikke здесь не нужно.'],
    ['ofte','часто','Vi laver ofte mad sammen.','Мы часто готовим вместе.','Частота действия; сравнительная форма: oftere.'],
    ['sjældent','редко','Jeg spiser sjældent ude.','Я редко ем вне дома.','Spise ude — есть в кафе или ресторане, а не обязательно на улице.'],
    ['allerede','уже','Bussen er allerede kørt.','Автобус уже уехал.','Раньше ожидаемого или к этому моменту.'],
    ['endnu','ещё; пока','Jeg er ikke færdig endnu.','Я ещё не закончил.','Ikke endnu — ещё не; endnu en — ещё один.'],
    ['stadig','всё ещё; по-прежнему','Arbejder du stadig samme sted?','Ты всё ещё работаешь в том же месте?','Подчёркивает, что состояние продолжается.'],
    ['snart','скоро','Vi er snart hjemme.','Мы скоро будем дома.','Snart — скоро; hurtigt — быстро.'],
    ['nu','сейчас','Jeg har tid nu.','У меня сейчас есть время.','Сейчас; в живой речи может также усиливать или смягчать реплику.'],
    ['senere','позже','Jeg ringer senere.','Я позвоню позже.','Настоящая форма ringer здесь относится к будущему благодаря senere.'],
    ['lige','только что; как раз; на минутку','Jeg skal lige hente min jakke.','Я только заберу свою куртку.','В этой реплике смягчает действие как короткое; ikke lige — не совсем, не сейчас по контексту.'],
    ['gerne','охотно; с удовольствием','Jeg vil gerne have en kaffe.','Я хотел бы кофе.','Vil gerne — вежливое желание; ikke gerne — неохотно.'],
    ['måske','возможно; может быть','Måske kommer han i morgen.','Возможно, он придёт завтра.','При måske в начале здесь kommer стоит перед han.'],
    ['faktisk','на самом деле; вообще-то','Det er faktisk ret nemt.','На самом деле это довольно легко.','Часто поправляет ожидание собеседника.'],
    ['derfor','поэтому','Det regner, derfor bliver vi hjemme.','Идёт дождь, поэтому мы остаёмся дома.','Derfor в начале второй главной части вызывает инверсию: bliver vi.'],
    ['alligevel','всё равно; тем не менее','Det regner, men vi går alligevel.','Идёт дождь, но мы всё равно пойдём.','Действие происходит вопреки обстоятельству или ожиданию.'],
    ['sammen','вместе','Vi tager af sted sammen.','Мы отправляемся вместе.','Sammen — вместе; samme — тот же самый, одинаковый.']
  ],
  pronouns:[
    ['jeg','я','Jeg lærer dansk hver dag.','Я каждый день учу датский.','Форма подлежащего; объектная форма — mig.'],
    ['mig','меня; мне','Kan du hjælpe mig?','Можешь мне помочь?','После hjælpe нужен объект mig, не jeg.'],
    ['du','ты','Hvor bor du?','Где ты живёшь?','Подлежащее; после глагола в прямом вопросе.'],
    ['dig','тебя; тебе','Jeg ringer til dig senere.','Я позвоню тебе позже.','После предлога til нужна объектная форма dig.'],
    ['han','он','Han arbejder på et værksted.','Он работает в мастерской.','Форма подлежащего; объектная форма — ham.'],
    ['ham','его; ему','Jeg kender ham fra arbejdet.','Я знаю его по работе.','Объектная форма han; «его машина» — hans bil.'],
    ['hun','она','Hun kommer hjem klokken fire.','Она приходит домой в четыре.','Форма подлежащего; объектная форма — hende.'],
    ['hende','её; ей','Jeg giver hende nøglen.','Я даю ей ключ.','Объектная форма hun; «её машина» — hendes bil.'],
    ['vi','мы','Vi skal på arbejde i morgen.','Завтра нам нужно на работу.','Форма подлежащего; объектная форма — os.'],
    ['os','нас; нам','Vil du komme med os?','Ты пойдёшь с нами?','После med нужна объектная форма os.'],
    ['I','вы','Hvor kommer I fra?','Откуда вы?','I «вы» пишется с большой буквы; предлог i — с маленькой.'],
    ['jer','вас; вам','Jeg sender jer adressen.','Я отправлю вам адрес.','Объектная форма I; притяжательное «ваш» — jeres.'],
    ['de','они','De har to børn.','У них двое детей.','De с большой буквы может быть вежливым «Вы»; здесь de — «они».'],
    ['dem','их; им','Jeg kan ikke se dem.','Я их не вижу.','Объектная форма de; притяжательное «их» — deres.'],
    ['den','он; она; этот предмет рода en','Hvor er bogen? Den ligger her.','Где книга? Она лежит здесь.','Заменяет en-слово: en bog → den.'],
    ['det','оно; это; этот предмет рода et','Hvor er brevet? Det ligger på bordet.','Где письмо? Оно лежит на столе.','Заменяет et-слово: et brev → det; также употребляется как формальное подлежащее.'],
    ['man','неопределённое «кто-то; люди; ты вообще»','Hvordan betaler man her?','Как здесь платят?','Обобщённое лицо; объектная форма en, возвратная sig.'],
    ['sig','себя; себе','Hun glæder sig til ferien.','Она с нетерпением ждёт отпуска.','Возвратное местоимение третьего лица: glæde sig til.'],
    ['vores','наш; наша; наше; наши','Vores børn går i skole her.','Наши дети ходят здесь в школу.','Vores не меняется по роду и числу существительного.'],
    ['deres','их','Deres bil står udenfor.','Их машина стоит снаружи.','Не объектное dem; с большой буквы также вежливое «Ваш».'],
    ['min','мой; моя','Min cykel er ny.','Мой велосипед новый.','Min с en-словом; mit с et-словом; mine во множественном числе.'],
    ['din','твой; твоя','Er det din taske?','Это твоя сумка?','Din с en-словом; dit с et-словом; dine во множественном числе.'],
    ['sin','свой; своя','Hun henter sin søn.','Она забирает своего сына.','В основной учебной модели относится к подлежащему третьего лица единственного числа в своей части предложения; hans/hendes могут указывать на другого человека. Формы: sin, sit, sine.']
  ],
  prepositions:[
    ['i','в; в течение','Jeg bor i Danmark.','Я живу в Дании.','I Danmark, i en uge; для стран и длительности часто i, но учи конкретную конструкцию.'],
    ['på','на; в; по','Jeg er på arbejde.','Я на работе.','På arbejde — на работе; på bordet — на столе. Одного универсального перевода нет.'],
    ['til','к; в направлении; для','Jeg skal til lægen i morgen.','Завтра мне к врачу.','Til lægen — к врачу; på arbejde — на работу. Предлог зависит от сочетания.'],
    ['fra','из; от; начиная с','Jeg arbejder fra seks til to.','Я работаю с шести до двух.','Fra ... til ... — от ... до ...; komme fra — быть родом из.'],
    ['med','с; вместе с; при помощи','Jeg tager bussen med min ven.','Я еду автобусом со своим другом.','Med min ven — с другом; med bus — на автобусе.'],
    ['uden','без','Jeg vil gerne have kaffe uden mælk.','Я хотел бы кофе без молока.','Uden mælk — без молока; uden at + инфинитив — не делая чего-то.'],
    ['for','для; за; слишком в другом употреблении','Tak for hjælpen.','Спасибо за помощь.','В этой конструкции: за помощь. For как предлог, союз и усилитель имеет разные функции.'],
    ['af','из; от; чем-то вызванный','Bordet er lavet af træ.','Стол сделан из дерева.','Lavet af — сделанный из; en del af — часть чего-то.'],
    ['om','о; через; по повторяющемуся времени','Vi taler om arbejdet.','Мы говорим о работе.','Tale om — говорить о; om en time — через час; om aftenen — вечером.'],
    ['over','над; через; больше','Lampen hænger over bordet.','Лампа висит над столом.','Здесь положение над предметом; over hundrede — больше ста.'],
    ['under','под; во время','Tasken ligger under bordet.','Сумка лежит под столом.','Положение ниже; under mødet — во время встречи.'],
    ['mellem','между','Butikken ligger mellem banken og skolen.','Магазин находится между банком и школой.','Mellem A og B — между A и B.']
  ],
  conjunctions:[
    ['og','и','Jeg køber brød og mælk.','Я покупаю хлеб и молоко.','Соединяет однородные слова или части предложения.'],
    ['men','но','Jeg vil gerne med, men jeg har ikke tid.','Я хотел бы пойти с вами, но у меня нет времени.','После men здесь главная часть: jeg har ikke.'],
    ['eller','или','Vil du have kaffe eller te?','Ты будешь кофе или чай?','Выбор между вариантами; også: ellers — иначе, это другое слово.'],
    ['fordi','потому что','Jeg bliver hjemme, fordi jeg ikke er rask.','Я останусь дома, потому что нездоров.','Придаточное: fordi jeg ikke er, с ikke перед личным глаголом.'],
    ['hvis','если','Hvis du har tid, kan vi gå en tur.','Если у тебя есть время, можем прогуляться.','Придаточное впереди занимает первое место; затем kan vi.'],
    ['når','когда; всякий раз когда','Når jeg har fri, går jeg en tur.','Когда у меня выходной, я иду гулять.','Для повторения и часто для будущего; разовое прошлое обычно вводят da.'],
    ['da','когда в прошлом','Da jeg kom hjem, var børnene allerede i seng.','Когда я пришёл домой, дети уже были в постели.','Здесь разовое событие в прошлом; da также может иметь другие функции.'],
    ['selvom','хотя; несмотря на то что','Jeg går ud, selvom det regner.','Я выхожу, хотя идёт дождь.','Вводит уступительное придаточное; также пишут selv om.'],
    ['at','что','Hun siger, at hun ikke kan komme.','Она говорит, что не может прийти.','Здесь союз перед придаточным, а не инфинитивное at в at læse.'],
    ['så','так что; и поэтому','Jeg er træt, så jeg går hjem.','Я устал, так что пойду домой.','В этом значении после så: jeg går. Наречие så в начале главной части: så går jeg.'],
    ['som','который; которая; как','Det er bussen, som kører til centrum.','Это автобус, который едет в центр.','Здесь относительная связь; som употребляется также в сравнениях.'],
    ['for','ведь; потому что','Jeg tager en jakke på, for det er koldt.','Я надену куртку, ведь холодно.','Соединяет главные части; с отрицанием: for jeg har ikke tid, в отличие от fordi jeg ikke har tid.']
  ],
  questions:[
    ['hvad','что; какой по контексту','Hvad betyder det?','Что это значит?','Hvad er klokken? — который час? Значение учи в целой конструкции.'],
    ['hvem','кто; кого','Hvem taler du med?','С кем ты разговариваешь?','Предлог часто остаётся в конце вопроса: hvem ... med?'],
    ['hvor','где; куда; насколько','Hvor skal vi mødes?','Где нам встретиться?','Hvor bor du? — где живёшь; hvor stor? — насколько большой?'],
    ['hvornår','когда','Hvornår begynder mødet?','Когда начинается встреча?','Прямой вопрос о времени; не подменяет når во всех придаточных.'],
    ['hvorfor','почему','Hvorfor kommer du ikke?','Почему ты не придёшь?','После вопросительного слова: личный глагол, затем подлежащее.'],
    ['hvordan','как','Hvordan kommer jeg til stationen?','Как мне добраться до станции?','Спрашивает о способе или состоянии: hvordan har du det?'],
    ['hvilken','какой; который из','Hvilken bus skal jeg tage?','На какой автобус мне сесть?','Hvilken с en-словом; hvilket с et-словом; hvilke во множественном числе.'],
    ['hvor meget','сколько неисчисляемого; насколько','Hvor meget koster billetten?','Сколько стоит билет?','Цена, количество вещества или степень; считаемые предметы: hvor mange.'],
    ['hvor mange','сколько считаемых предметов','Hvor mange billetter skal vi købe?','Сколько билетов нам купить?','Перед множественным числом считаемых предметов: billetter.']
  ]
};

const slug=word=>word.toLowerCase().replace(/æ/g,'ae').replace(/ø/g,'oe').replace(/å/g,'aa').replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
const nounLabels=['En/et · ед. неопределённая','Ед. определённая','Мн. неопределённая','Мн. определённая'];
export const commonWords = [
  ...nounRows.map(([da,ru,inflections,exampleDa,exampleRu,note])=>({id:`common-noun-${slug(da)}`,category:'nouns',da,ru,exampleDa,exampleRu,note,forms:[da,...inflections].map((da,i)=>({label:nounLabels[i],da}))})),
  ...Object.entries(groups).flatMap(([category,rows])=>rows.map(([da,ru,exampleDa,exampleRu,note])=>({id:`common-${category.slice(0,-1)}-${slug(da)}`,category,da,ru,exampleDa,exampleRu,note})))
];
export const commonItems = commonWords.map(w=>({id:w.id,da:w.exampleDa,ru:w.exampleRu,note:`${w.da} — ${w.ru}. ${w.note}`,exampleDa:w.exampleDa,exampleRu:w.exampleRu,kind:'word',source:'reference',level:'A1',verified:true,lessonId:null,daAnswers:[w.exampleDa],ruAnswers:[w.exampleRu]}));
