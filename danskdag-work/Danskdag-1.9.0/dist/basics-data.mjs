// Original beginner examples. Number conventions: docs/basics-sources.md.
const lesson=(id,title,subtitle,rule,items)=>({id,kind:id.includes('reading')?'reading':'numbers',level:'A1',title,subtitle,rule,icon:id.includes('reading')?'book':'layers',color:id.includes('reading')?'mint':'cyan',items:items.map(({key,...item})=>({...item,id:`${id}-${key}`,lessonId:id}))});
const gap=(key,da,ru,text,answer,wrong,note)=>({key,da,ru,note,type:'gap',daAnswers:[da],ruAnswers:[ru],gap:{text,answers:[answer],options:[answer,...wrong]}});

export const numberExamples=[
 {da:'Det koster femogtyve kroner.',ru:'Это стоит двадцать пять крон.'},
 {da:'Bussen kommer klokken otte.',ru:'Автобус придёт в восемь часов.'},
 {da:'Jeg har to børn.',ru:'У меня двое детей.'}
];

export const readingTexts=[
 {id:'reading-anna',lessonId:'basics-reading-1',title:'Anna i Odense',subtitle:'Имя, семья и работа',sentences:[
  {da:'Jeg hedder Anna.',ru:'Меня зовут Анна.'},
  {da:'Jeg bor i Odense.',ru:'Я живу в Оденсе.'},
  {da:'Jeg har en søn.',ru:'У меня есть сын.'},
  {da:'Han hedder Emil.',ru:'Его зовут Эмиль.'},
  {da:'Jeg arbejder i en butik.',ru:'Я работаю в магазине.'},
  {da:'Jeg cykler til arbejde.',ru:'Я езжу на работу на велосипеде.'}
 ]},
 {id:'reading-cafe',lessonId:'basics-reading-2',title:'På café',subtitle:'Напитки и небольшая покупка',sentences:[
  {da:'Det er lørdag.',ru:'Сегодня суббота.'},
  {da:'Sara og Ali går på café.',ru:'Сара и Али идут в кафе.'},
  {da:'Sara køber te.',ru:'Сара покупает чай.'},
  {da:'Ali køber kaffe.',ru:'Али покупает кофе.'},
  {da:'De deler en kage.',ru:'Они делят одно пирожное на двоих.'},
  {da:'De betaler halvtreds kroner.',ru:'Они платят пятьдесят крон.'}
 ]},
 {id:'reading-bus',lessonId:'basics-reading-3',title:'Maja tager bussen',subtitle:'Дорога в школу',sentences:[
  {da:'Det er mandag morgen.',ru:'Сейчас утро понедельника.'},
  {da:'Maja skal i skole.',ru:'Майе нужно в школу.'},
  {da:'Hun venter på bus nummer tolv.',ru:'Она ждёт автобус номер двенадцать.'},
  {da:'Bussen kommer klokken otte.',ru:'Автобус придёт в восемь часов.'},
  {da:'Maja har en blå taske.',ru:'У Майи синяя сумка.'},
  {da:'Hun sidder ved vinduet.',ru:'Она сидит у окна.'}
 ]}
].map(text=>({...text,da:text.sentences.map(s=>s.da).join(' '),ru:text.sentences.map(s=>s.ru).join(' ')}));

const readingItem=(text,key,question,answer,wrong,note)=>({key,da:text.da,ru:text.ru,note,daAnswers:[text.da],ruAnswers:[text.ru],focus:{question,answerLang:'ru',answers:[answer],options:[answer,...wrong]}});
const [anna,cafe,bus]=readingTexts;

export const basicsLessons=[
 lesson('basics-numbers-1','Числа 0–10','Первые числа в коротких фразах',
  'Послушай число и повтори его целиком. Для счёта используем en; перед существительным среднего рода будет et: en taske, et hus. Нажми на датскую фразу, чтобы услышать её.',[
  gap('zero','Jeg har nul beskeder.','У меня ноль сообщений.','Jeg har ___ beskeder.','nul',['to','fem','ti'],'0 — nul. Beskeder — сообщения.'),
  gap('one','Jeg har en taske.','У меня одна сумка.','Jeg har ___ taske.','en',['to','tre','ti'],'1 — en; taske — существительное общего рода.'),
  gap('two','Jeg har to børn.','У меня двое детей.','Jeg har ___ børn.','to',['tre','fire','seks'],'2 — to. Børn — дети.'),
  gap('three','Vi har tre stole.','У нас три стула.','Vi har ___ stole.','tre',['to','fire','syv'],'3 — tre. Stole — стулья.'),
  gap('five','Vi har fem kopper.','У нас пять чашек.','Vi har ___ kopper.','fem',['fire','seks','ni'],'5 — fem. Kopper — чашки.'),
  gap('ten','Det koster ti kroner.','Это стоит десять крон.','Det koster ___ kroner.','ti',['to','fem','otte'],'10 — ti. Kroner — кроны.')
 ]),
 lesson('basics-numbers-2','Числа 11–20','Запомни слова, которые понадобятся каждый день',
  'Сначала выучи числа до двадцати как отдельные слова. Не пытайся читать датское написание по русским буквам: слушай озвучку, повторяй и сверяйся с написанием.',[
  gap('eleven','Der er elleve elever.','Здесь одиннадцать учеников.','Der er ___ elever.','elleve',['tolv','tretten','tyve'],'11 — elleve. Elever — ученики.'),
  gap('twelve','Jeg tager bus nummer tolv.','Я еду на автобусе номер двенадцать.','Jeg tager bus nummer ___.','tolv',['elleve','seksten','atten'],'12 — tolv. Номер автобуса читаем как обычное число.'),
  gap('thirteen','Hun er tretten år.','Ей тринадцать лет.','Hun er ___ år.','tretten',['tolv','fjorten','nitten'],'13 — tretten. Возраст: er tretten år.'),
  gap('sixteen','Vi har seksten bøger.','У нас шестнадцать книг.','Vi har ___ bøger.','seksten',['sytten','atten','tyve'],'16 — seksten. Не путай с sytten — 17.'),
  gap('eighteen','Det koster atten kroner.','Это стоит восемнадцать крон.','Det koster ___ kroner.','atten',['sytten','nitten','tolv'],'18 — atten. Не путай с nitten — 19.'),
  gap('twenty','Vi har tyve minutter.','У нас двадцать минут.','Vi har ___ minutter.','tyve',['ti','tolv','nitten'],'20 — tyve. Minutter — минуты.')
 ]),
 lesson('basics-numbers-3','Числа 21–99','Единицы + og + десятки',
  'В числе от 21 до 99 сначала звучат единицы, затем og и десятки: enogtyve = 1 + 20. Всё число до ста пишется слитно. Отдельно запомни 50 — halvtreds, 60 — tres, 70 — halvfjerds, 80 — firs, 90 — halvfems.',[
  gap('twenty-one','Hun er enogtyve år.','Ей двадцать один год.','Hun er ___ år.','enogtyve',['toogtyve','enogtredive','elleve'],'21 = en + og + tyve. Единицы стоят перед десятками.'),
  gap('thirty-two','Der er toogtredive elever.','Здесь тридцать два ученика.','Der er ___ elever.','toogtredive',['treogtyve','toogtyve','toogfyrre'],'32 = to + og + tredive.'),
  gap('forty-five','Det koster femogfyrre kroner.','Это стоит сорок пять крон.','Det koster ___ kroner.','femogfyrre',['fireoghalvtreds','femogtyve','femoghalvfems'],'45 = fem + og + fyrre.'),
  gap('fifty','De betaler halvtreds kroner.','Они платят пятьдесят крон.','De betaler ___ kroner.','halvtreds',['tres','halvfjerds','halvfems'],'50 — halvtreds; это не половина тридцати.'),
  gap('seventy','Billetten koster halvfjerds kroner.','Билет стоит семьдесят крон.','Billetten koster ___ kroner.','halvfjerds',['halvtreds','tres','halvfems'],'70 — halvfjerds. Слушай слово целиком.'),
  gap('ninety','Vi betaler halvfems kroner.','Мы платим девяносто крон.','Vi betaler ___ kroner.','halvfems',['firs','halvtreds','halvfjerds'],'90 — halvfems. Не путай с halvtreds — 50.')
 ]),
 lesson('basics-numbers-4','Сотни и тысячи','Числа до 9999 в обычной речи',
  'Сотни и тысячи отделяются пробелами: to hundrede, tre tusind. В этой практике используем et hundrede и et tusind для 100 и 1000. Перед остатком меньше ста добавляем og: et hundrede og en, to tusind og femogtyve. Это чтение количества, а не специальное чтение года.',[
  gap('hundred','Det koster et hundrede kroner.','Это стоит сто крон.','Det koster ___ kroner.','et hundrede',['et tusind','halvfems','to hundrede'],'100 — et hundrede. Hundrede имеет средний род.'),
  gap('hundred-one','Der er et hundrede og en elever.','Здесь сто один ученик.','Der er ___ elever.','et hundrede og en',['et hundrede og ti','et tusind og en','to hundrede og en'],'101 — et hundrede og en. Здесь en — числительное «один», а не артикль; elever стоит во множественном числе.'),
  gap('two-fifty','Cyklen koster to hundrede og halvtreds kroner.','Велосипед стоит двести пятьдесят крон.','Cyklen koster ___ kroner.','to hundrede og halvtreds',['to hundrede og halvfems','et hundrede og halvtreds','to tusind og halvtreds'],'250 — to hundrede og halvtreds. Сначала сотни, потом остаток.'),
  gap('thousand','Det koster et tusind kroner.','Это стоит тысячу крон.','Det koster ___ kroner.','et tusind',['et hundrede','to tusind','halvfems'],'1000 — et tusind. Вариант tusinde тоже существует.'),
  gap('two-thousand','Vi tæller til to tusind og femogtyve.','Мы считаем до двух тысяч двадцати пяти.','Vi tæller til ___.','to tusind og femogtyve',['to tusind og tooghalvtreds','to hundrede og femogtyve','to tusind og femten'],'2025 как количество — to tusind og femogtyve.'),
  gap('nine-thousand','Bilen koster ni tusind ni hundrede og nioghalvfems kroner.','Машина стоит девять тысяч девятьсот девяносто девять крон.','Bilen koster ___ kroner.','ni tusind ni hundrede og nioghalvfems',['ni tusind ni hundrede og halvfems','ni tusind og nioghalvfems','ni hundrede og nioghalvfems'],'9999 — тысячи, сотни, затем og и nioghalvfems.')
 ]),
 lesson('basics-reading-1',anna.title,anna.subtitle,
  'Прочитай шесть коротких предложений об Анне. Найди в тексте ответ на каждый вопрос. Можно послушать весь текст или отдельное предложение, а затем открыть перевод.',[
  readingItem(anna,'name','Как зовут героиню?','Анна',['Эмиль','Майя','Сара'],'Jeg hedder Anna — меня зовут Анна.'),
  readingItem(anna,'city','В каком городе живёт Анна?','В Оденсе',['В Копенгагене','В Орхусе','В Ольборге'],'Jeg bor i Odense — я живу в Оденсе.'),
  readingItem(anna,'family','Кто есть у Анны?','Сын',['Дочь','Две дочери','Два сына'],'Jeg har en søn — у меня есть сын.'),
  readingItem(anna,'son','Как зовут сына Анны?','Эмиль',['Али','Ларс','Петер'],'Han hedder Emil — его зовут Эмиль.'),
  readingItem(anna,'work','Где работает Анна?','В магазине',['В школе','В кафе','В больнице'],'Jeg arbejder i en butik — я работаю в магазине.'),
  readingItem(anna,'travel','Как Анна добирается на работу?','На велосипеде',['На автобусе','На поезде','Пешком'],'Jeg cykler til arbejde — я езжу на работу на велосипеде.')
 ]),
 lesson('basics-reading-2',cafe.title,cafe.subtitle,
  'Прочитай, что Сара и Али покупают в кафе. Ищи конкретную деталь: кто, когда, какой напиток и сколько платят. Отвечай по тексту.',[
  readingItem(cafe,'day','В какой день происходит встреча?','В субботу',['В понедельник','В пятницу','В воскресенье'],'Det er lørdag — сегодня суббота.'),
  readingItem(cafe,'people','Кто идёт в кафе?','Сара и Али',['Анна и Эмиль','Майя и Сара','Али и Эмиль'],'Sara og Ali — Сара и Али.'),
  readingItem(cafe,'place','Куда идут Сара и Али?','В кафе',['В магазин','В школу','В парк'],'Går på café — идут в кафе.'),
  readingItem(cafe,'tea','Что покупает Сара?','Чай',['Кофе','Воду','Сок'],'Sara køber te — Сара покупает чай.'),
  readingItem(cafe,'coffee','Что покупает Али?','Кофе',['Чай','Молоко','Сок'],'Ali køber kaffe — Али покупает кофе.'),
  readingItem(cafe,'price','Сколько они платят?','Пятьдесят крон',['Двадцать крон','Семьдесят крон','Девяносто крон'],'Halvtreds kroner — пятьдесят крон.')
 ]),
 lesson('basics-reading-3',bus.title,bus.subtitle,
  'Прочитай о поездке Майи. Обрати внимание на номер автобуса, время и цвет сумки. Klokken otte означает восемь часов; здесь это утро.',[
  readingItem(bus,'day','Какой день недели описан в тексте?','Понедельник',['Вторник','Суббота','Воскресенье'],'Mandag morgen — утро понедельника.'),
  readingItem(bus,'destination','Куда нужно Майе?','В школу',['На работу','В кафе','В магазин'],'Maja skal i skole — Майе нужно в школу.'),
  readingItem(bus,'number','Какой номер автобуса ждёт Майя?','Двенадцать',['Два','Двадцать','Одиннадцать'],'Bus nummer tolv — автобус номер двенадцать.'),
  readingItem(bus,'time','Во сколько придёт автобус?','В восемь часов',['В семь часов','В девять часов','В двенадцать часов'],'Klokken otte — в восемь часов.'),
  readingItem(bus,'bag','Какого цвета сумка Майи?','Синяя',['Красная','Чёрная','Зелёная'],'En blå taske — синяя сумка.'),
  readingItem(bus,'seat','Где сидит Майя?','У окна',['У двери','Рядом с водителем','В кафе'],'Ved vinduet — у окна.')
 ])
];
