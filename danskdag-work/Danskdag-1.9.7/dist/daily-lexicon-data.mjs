// Practical editorial selection, not a frequency ranking. Examples are original.
export const dailyCategories = [
  {id:'home',title:'Дом и быт'},
  {id:'food',title:'Еда и кухня'},
  {id:'shopping',title:'Покупки'},
  {id:'transport',title:'Дорога и транспорт'},
  {id:'work',title:'Работа'},
  {id:'health',title:'Здоровье'},
  {id:'school',title:'Учёба и язык'},
  {id:'family',title:'Семья и близкие'},
  {id:'time',title:'Время и планы'},
  {id:'money',title:'Деньги и платежи'},
  {id:'digital',title:'Телефон и интернет'},
  {id:'civic',title:'Город и документы'},
  {id:'emotions',title:'Чувства и состояния'},
  {id:'leisure',title:'Досуг'},
  {id:'nature',title:'Природа и погода'},
  {id:'clothing',title:'Одежда и уход'},
  {id:'services',title:'Услуги и помощь'},
  {id:'social',title:'Общение и встречи'}
];
// Rows: lemma | Russian meaning | word class | teaching level | original examples.
const rows = {
  home: `
et køleskab|холодильник|noun|A1|Mælken står i køleskabet.|Молоко стоит в холодильнике.
et køkken|кухня|noun|A1|Vi laver mad i køkkenet.|Мы готовим на кухне.
en stue|гостиная|noun|A1|Gæsterne sidder i stuen.|Гости сидят в гостиной.
et badeværelse|ванная комната|noun|A1|Badeværelset ligger til venstre.|Ванная комната слева.
en seng|кровать|noun|A1|Jeg lægger mig i sengen.|Я ложусь в кровать.
en sofa|диван|noun|A1|Hunden sover på sofaen.|Собака спит на диване.
en lampe|лампа|noun|A1|Lampen står ved sofaen.|Лампа стоит у дивана.
et vindue|окно|noun|A1|Åbn vinduet i køkkenet.|Открой окно на кухне.
et gulv|пол|noun|A1|Der ligger vand på gulvet.|На полу вода.
en væg|стена|noun|A1|Billedet hænger på væggen.|Картина висит на стене.
et loft|потолок|noun|A2|Lampen hænger i loftet.|Лампа висит на потолке.
en trappe|лестница|noun|A1|Trappen fører op til første sal.|Лестница ведёт на второй этаж.
et tæppe|плед; ковёр|noun|A1|Jeg tager et tæppe over benene.|Я накрываю ноги пледом.
en pude|подушка|noun|A1|Der ligger en pude på sengen.|На кровати лежит подушка.
en dyne|одеяло|noun|A1|Min dyne er varm og let.|Моё одеяло тёплое и лёгкое.
et håndklæde|полотенце|noun|A1|Der hænger et rent håndklæde ved vasken.|У раковины висит чистое полотенце.
en vaskemaskine|стиральная машина|noun|A2|Vaskemaskinen står i kælderen.|Стиральная машина стоит в подвале.
en opvaskemaskine|посудомоечная машина|noun|A2|Sæt tallerkenen i opvaskemaskinen.|Поставь тарелку в посудомоечную машину.
en støvsuger|пылесос|noun|A2|Støvsugeren står bag døren.|Пылесос стоит за дверью.
en skraldespand|мусорное ведро; урна|noun|A2|Skraldespanden er fuld.|Мусорное ведро полное.
at rydde op|прибирать; убирать вещи|verb|A2|Jeg rydder op efter aftensmaden.|Я прибираю после ужина.
at gøre rent|делать уборку|verb|A2|Vi gør rent om lørdagen.|Мы делаем уборку по субботам.
at lufte ud|проветривать|verb|A2|Jeg lufter ud efter badet.|Я проветриваю после душа.
at støvsuge|пылесосить|verb|A2|Hun støvsuger gulvet i stuen.|Она пылесосит пол в гостиной.
at tænde|включать; зажигать|verb|A1|Kan du tænde lyset?|Можешь включить свет?
at slukke|выключать; гасить|verb|A1|Husk at slukke ovnen.|Не забудь выключить духовку.
`,
  food: `
en tallerken|тарелка|noun|A1|Jeg sætter en tallerken frem.|Я ставлю тарелку на стол.
en gaffel|вилка|noun|A1|Jeg mangler en gaffel til salaten.|Мне нужна вилка для салата.
en kniv|нож|noun|A1|Denne kniv er god til grøntsager.|Этот нож хорошо подходит для овощей.
en ske|ложка|noun|A1|Der ligger en ske ved suppen.|Рядом с супом лежит ложка.
en gryde|кастрюля|noun|A2|Suppen koger i en stor gryde.|Суп кипит в большой кастрюле.
en pande|сковорода|noun|A2|Jeg varmer panden op.|Я разогреваю сковороду.
et glas|стакан; бокал|noun|A1|Vil du have et glas vand?|Хочешь стакан воды?
en skål|миска|noun|A1|Hæld salaten i en skål.|Переложи салат в миску.
en kartoffel|картофелина|noun|A1|Jeg skræller en kartoffel.|Я чищу картофелину.
en gulerod|морковь; морковка|noun|A1|Barnet spiser en gulerod.|Ребёнок ест морковку.
et løg|лук; луковица|noun|A1|Jeg skærer et løg til sovsen.|Я режу луковицу для соуса.
en tomat|помидор|noun|A1|Skær en tomat til salaten.|Нарежь помидор для салата.
en agurk|огурец|noun|A1|Der ligger en agurk i køleskabet.|В холодильнике лежит огурец.
en banan|банан|noun|A1|Jeg tager en banan med på arbejde.|Я беру банан на работу.
en appelsin|апельсин|noun|A1|Vi deler en appelsin.|Мы делим апельсин.
en ost|сыр|noun|A1|Vi køber en mild ost.|Мы покупаем сыр с мягким вкусом.
et æg|яйцо|noun|A1|Jeg spiser et æg til morgenmad.|Я ем яйцо на завтрак.
en kylling|курица; цыплёнок|noun|A1|Kyllingen er i ovnen.|Курица в духовке.
en suppe|суп|noun|A1|Vi laver en suppe med grøntsager.|Мы готовим овощной суп.
en salat|салат|noun|A1|Jeg bestiller en salat uden løg.|Я заказываю салат без лука.
at koge|варить; кипеть|verb|A2|Kartoflerne skal koge lidt længere.|Картошке нужно вариться ещё немного.
at stege|жарить|verb|A2|Jeg steger fisken på panden.|Я жарю рыбу на сковороде.
at bage|печь|verb|A2|Vi bager boller i weekenden.|На выходных мы печём булочки.
at skære|резать|verb|A2|Kan du skære brødet?|Можешь нарезать хлеб?
at smage|пробовать на вкус; иметь вкус|verb|A2|Må jeg smage din suppe?|Можно попробовать твой суп?
sulten|голодный|adjective|A1|Jeg er sulten efter gåturen.|После прогулки я хочу есть.
`,
  shopping: `
et supermarked|супермаркет|noun|A1|Supermarkedet ligger ved stationen.|Супермаркет находится у станции.
en indkøbsliste|список покупок|noun|A2|Jeg skriver en indkøbsliste.|Я составляю список покупок.
en indkøbskurv|корзина для покупок|noun|A2|Tag en indkøbskurv ved indgangen.|Возьми корзину у входа.
en indkøbsvogn|тележка для покупок|noun|A2|Indkøbsvognen står udenfor.|Тележка для покупок стоит снаружи.
en hylde|полка|noun|A1|Risene står på den nederste hylde.|Рис стоит на нижней полке.
en vare|товар|noun|A2|Denne vare er udsolgt.|Этого товара нет в наличии.
en pakke|пачка; посылка|noun|A1|Jeg køber en pakke kaffe.|Я покупаю пачку кофе.
en flaske|бутылка|noun|A1|Vi har en flaske olie hjemme.|Дома у нас есть бутылка масла.
en dåse|банка|noun|A2|Jeg åbner en dåse tomater.|Я открываю банку помидоров.
en pose|пакет|noun|A1|Jeg har selv en pose med.|У меня есть свой пакет.
en kasse|касса; ящик|noun|A1|Der er kø ved kassen.|У кассы очередь.
en kø|очередь|noun|A1|Jeg stiller mig i kø.|Я встаю в очередь.
en kvittering|чек; квитанция|noun|A2|Vil du have en kvittering?|Вам нужен чек?
en rabat|скидка|noun|A2|Der er rabat på kaffe i dag.|Сегодня на кофе скидка.
et tilbud|специальное предложение; скидочная акция|noun|A2|Osten er på tilbud.|Сыр продаётся по акции.
en størrelse|размер|noun|A2|Har I denne i en større størrelse?|У вас есть такая вещь размером больше?
en kunde|покупатель; клиент|noun|A2|Kunden spørger efter mælk.|Покупатель спрашивает, где молоко.
at købe|покупать|verb|A1|Jeg skal købe frugt til i morgen.|Мне нужно купить фрукты на завтра.
at betale|платить|verb|A1|Kan jeg betale med kort?|Можно оплатить картой?
at koste|стоить|verb|A1|Hvad koster denne pakke?|Сколько стоит эта пачка?
at bytte|обменивать|verb|A2|Jeg vil gerne bytte denne trøje.|Я хотел бы обменять этот свитер.
at returnere|возвращать товар|verb|A2|Kan jeg returnere varen her?|Могу я вернуть товар здесь?
at prøve|пробовать; примерять|verb|A1|Må jeg prøve skoene?|Можно примерить туфли?
billig|дешёвый; недорогой|adjective|A1|Denne ost er billig.|Этот сыр недорогой.
dyr|дорогой по цене|adjective|A1|Cyklen er for dyr for mig.|Этот велосипед для меня слишком дорогой.
udsolgt|распроданный; отсутствующий в продаже|adjective|A2|Den blå jakke er udsolgt.|Синяя куртка распродана.
`,
  transport: `
en station|станция; вокзал|noun|A1|Vi mødes foran stationen.|Встретимся перед вокзалом.
et stoppested|остановка|noun|A1|Bussen holder ved næste stoppested.|Автобус остановится на следующей остановке.
en billet|билет|noun|A1|Jeg køber en billet til Aarhus.|Я покупаю билет до Орхуса.
en perron|платформа|noun|A2|Vi venter på perronen.|Мы ждём на платформе.
et spor|железнодорожный путь|noun|A2|Toget kører fra spor tre.|Поезд отправляется с третьего пути.
en afgang|отправление; рейс|noun|A2|Næste afgang er klokken ti.|Следующее отправление в десять.
en ankomst|прибытие|noun|A2|Vi venter på togets ankomst.|Мы ждём прибытия поезда.
en forsinkelse|задержка; опоздание|noun|A2|Der er ti minutters forsinkelse.|Задержка составляет десять минут.
en køreplan|расписание транспорта|noun|A2|Køreplanen hænger ved stoppestedet.|Расписание висит на остановке.
en chauffør|водитель|noun|A2|Spørg chaufføren om stoppestedet.|Спроси водителя об остановке.
en passager|пассажир|noun|A2|Passageren viser sin billet.|Пассажир показывает свой билет.
en lufthavn|аэропорт|noun|A1|Vi tager toget til lufthavnen.|Мы едем поездом в аэропорт.
et fly|самолёт|noun|A1|Flyet lander om en time.|Самолёт приземлится через час.
en færge|паром|noun|A2|Vi tager færgen til øen.|Мы плывём на пароме на остров.
en vej|дорога; путь|noun|A1|Vejen til skolen er kort.|Дорога до школы короткая.
et kryds|перекрёсток|noun|A2|Drej til højre i krydset.|На перекрёстке поверни направо.
et fortov|тротуар|noun|A2|Gå på fortovet.|Иди по тротуару.
en cykelsti|велосипедная дорожка|noun|A2|Cykelstien fortsætter langs søen.|Велодорожка идёт дальше вдоль озера.
et lyskryds|перекрёсток со светофором|noun|A2|Vi venter ved lyskrydset.|Мы ждём у светофора.
en parkeringsplads|парковка; парковочное место|noun|A2|Der er en ledig parkeringsplads.|Есть свободное парковочное место.
at køre|ехать; водить|verb|A1|Jeg kører til arbejde hver morgen.|Каждое утро я еду на работу.
at cykle|ехать на велосипеде|verb|A1|Hun cykler til skolen.|Она едет в школу на велосипеде.
at skifte|менять; делать пересадку|verb|A2|Vi skal skifte tog i Fredericia.|Нам нужно пересесть на другой поезд во Фредерисии.
at stige på|садиться в транспорт|verb|A2|Vi stiger på bussen her.|Мы садимся в автобус здесь.
at stå af|выходить из транспорта|verb|A2|Jeg skal stå af ved biblioteket.|Мне нужно выйти у библиотеки.
at parkere|парковать; парковаться|verb|A2|Hvor må jeg parkere bilen?|Где можно припарковать машину?
`,
  work: `
en arbejdsplads|место работы|noun|A2|Min arbejdsplads ligger tæt på havnen.|Моё место работы находится рядом с гаванью.
en kollega|коллега|noun|A1|Jeg spiser frokost med en kollega.|Я обедаю с коллегой.
en chef|начальник|noun|A1|Min chef er på ferie.|Мой начальник в отпуске.
et kontor|офис; кабинет|noun|A1|Vi deler et kontor.|У нас общий кабинет.
et møde|собрание; рабочая встреча|noun|A1|Mødet begynder om fem minutter.|Собрание начнётся через пять минут.
en opgave|задание; задача|noun|A2|Jeg er færdig med denne opgave.|Я закончил это задание.
en pause|перерыв|noun|A1|Vi holder en kort pause.|Мы делаем небольшой перерыв.
en vagt|смена; дежурство|noun|A2|Min vagt begynder klokken syv.|Моя смена начинается в семь.
en arbejdstid|рабочее время|noun|A2|Min arbejdstid er fra otte til fire.|Моё рабочее время с восьми до четырёх.
en løn|зарплата|noun|A2|Lønnen kommer sidst på måneden.|Зарплата приходит в конце месяца.
en kontrakt|договор; контракт|noun|A2|Jeg læser kontrakten før mødet.|Я читаю договор перед встречей.
en ansøgning|заявление; заявка|noun|A2|Hun skriver en ansøgning til et nyt job.|Она пишет заявление на новую работу.
en samtale|беседа; собеседование|noun|A2|Jeg skal til samtale på fredag.|В пятницу у меня собеседование.
en erfaring|опыт; отдельный пережитый случай|noun|B1|Han har erfaring med kundeservice.|У него есть опыт работы с клиентами.
et ansvar|ответственность|noun|B1|Vi har ansvar for lageret.|Мы отвечаем за склад.
en frist|срок; крайний срок|noun|B1|Fristen for opgaven er på mandag.|Срок сдачи задания в понедельник.
en ferie|отпуск; каникулы|noun|A1|Jeg holder ferie i juli.|У меня отпуск в июле.
en sygemelding|сообщение о болезни|noun|B1|Chefen har modtaget min sygemelding.|Начальник получил моё сообщение о болезни.
at arbejde|работать|verb|A1|Jeg arbejder på et lager.|Я работаю на складе.
at begynde|начинать; начинаться|verb|A1|Hvornår begynder din vagt?|Когда начинается твоя смена?
at slutte|заканчивать; заканчиваться|verb|A1|Mødet slutter klokken tre.|Встреча заканчивается в три.
at samarbejde|сотрудничать|verb|B1|Vi samarbejder om den nye opgave.|Мы вместе работаем над новой задачей.
at aftale|договариваться|verb|A2|Vi aftaler en ny tid.|Мы договариваемся о новом времени.
at ansætte|нанимать на работу|verb|B1|Firmaet vil ansætte en ny medarbejder.|Фирма хочет нанять нового сотрудника.
at søge arbejde|искать работу|verb|A2|Jeg søger arbejde i nærheden.|Я ищу работу поблизости.
travl|занятой; загруженный|adjective|A2|Jeg har en travl dag på arbejde.|У меня загруженный день на работе.
`,
  health: `
et apotek|аптека|noun|A1|Der ligger et apotek ved stationen.|У станции есть аптека.
en læge|врач|noun|A1|Jeg vil gerne tale med en læge.|Я хотел бы поговорить с врачом.
en tandlæge|стоматолог|noun|A1|Jeg har en tid hos tandlægen.|Я записан к стоматологу.
en sygeplejerske|медсестра; медбрат|noun|A2|Sygeplejersken kalder mit navn.|Медсестра называет моё имя.
et hospital|больница|noun|A1|Hun besøger sin far på hospitalet.|Она навещает отца в больнице.
en recept|рецепт на лекарство|noun|A2|Medicinen kræver en recept.|Для этого лекарства нужен рецепт.
en tablet|таблетка|noun|A2|Der ligger en tablet i pakken.|В упаковке лежит таблетка.
en smerte|боль|noun|A2|Jeg har smerter i ryggen.|У меня болит спина.
en hovedpine|головная боль|noun|A2|Jeg har hovedpine i dag.|Сегодня у меня болит голова.
en forkølelse|простуда|noun|A2|Jeg er hjemme med en forkølelse.|Я дома из-за простуды.
en feber|повышенная температура; жар|noun|A2|Barnet har feber.|У ребёнка температура.
en hoste|кашель|noun|A2|Min hoste holder mig vågen.|Кашель мешает мне спать.
en allergi|аллергия|noun|A2|Har du allergi over for noget?|У вас есть на что-нибудь аллергия?
et sår|рана|noun|A2|Jeg har et lille sår på hånden.|У меня маленькая ранка на руке.
et plaster|пластырь|noun|A2|Har du et plaster?|У тебя есть пластырь?
en krop|тело|noun|A1|Kroppen har brug for hvile.|Телу нужен отдых.
et hoved|голова|noun|A1|Jeg har ondt i hovedet.|У меня болит голова.
en hånd|кисть руки; рука|noun|A1|Hun holder barnet i hånden.|Она держит ребёнка за руку.
en fod|ступня; нога|noun|A1|Jeg har ondt i min venstre fod.|У меня болит левая ступня.
en ryg|спина|noun|A1|Min ryg gør ondt efter arbejdet.|После работы у меня болит спина.
en mave|живот|noun|A1|Barnet har ondt i maven.|У ребёнка болит живот.
at hvile sig|отдыхать|verb|A2|Jeg skal hvile mig lidt.|Мне нужно немного отдохнуть.
at hoste|кашлять|verb|A2|Jeg hoster mest om natten.|Больше всего я кашляю по ночам.
at bestille tid|записываться на приём|verb|A2|Jeg ringer for at bestille tid.|Я звоню, чтобы записаться на приём.
en hals|горло; шея|noun|A1|Jeg har ondt i halsen.|У меня болит горло.
rask|здоровый; выздоровевший|adjective|A2|Jeg er rask igen.|Я снова здоров.
`,
  school: `
en skole|школа|noun|A1|Skolen ligger tæt på vores hjem.|Школа находится рядом с нашим домом.
en klasse|класс; учебная группа|noun|A1|Der er tyve elever i klassen.|В классе двадцать учеников.
en lærer|учитель|noun|A1|Læreren skriver på tavlen.|Учитель пишет на доске.
en elev|ученик|noun|A1|Eleven læser teksten højt.|Ученик читает текст вслух.
en studerende|студент; студентка|noun|A2|Hun er studerende på universitetet.|Она студентка университета.
en uddannelse|образование; образовательная программа|noun|A2|Han begynder på en ny uddannelse.|Он начинает учиться по новой программе.
en undervisning|преподавание; занятия|noun|A2|Vi har undervisning om aftenen.|У нас занятия по вечерам.
en lektion|урок; учебный час|noun|A2|Den næste lektion begynder nu.|Следующий урок начинается сейчас.
en lektie|домашнее задание|noun|A2|Jeg laver lektier efter aftensmaden.|Я делаю домашнее задание после ужина.
en prøve|тест; испытание|noun|A2|Vi har en lille prøve i morgen.|Завтра у нас небольшой тест.
en eksamen|экзамен|noun|A2|Jeg skal til eksamen på tirsdag.|Во вторник я сдаю экзамен.
en karakter|оценка|noun|A2|Hun får en god karakter.|Она получает хорошую оценку.
et kursus|курс|noun|A2|Jeg går på et kursus i dansk.|Я хожу на курсы датского.
et sprog|язык|noun|A1|Hvilket sprog taler I derhjemme?|На каком языке вы говорите дома?
et ord|слово|noun|A1|Hvad betyder dette ord?|Что значит это слово?
en sætning|предложение|noun|A2|Skriv en sætning med ordet.|Напиши предложение с этим словом.
en udtale|произношение|noun|A2|Vi øver udtale i dag.|Сегодня мы тренируем произношение.
en oversættelse|перевод|noun|A2|Kan du læse min oversættelse?|Можешь прочитать мой перевод?
en blyant|карандаш|noun|A1|Jeg skriver med en blyant.|Я пишу карандашом.
en kuglepen|шариковая ручка|noun|A1|Må jeg låne din kuglepen?|Можно одолжить твою ручку?
at lære|учить; учиться|verb|A1|Jeg lærer nye ord hver dag.|Я каждый день учу новые слова.
at øve sig|практиковаться; упражняться|verb|A2|Vi øver os i at tale dansk.|Мы тренируемся говорить по-датски.
at forstå|понимать|verb|A1|Jeg forstår ikke den sidste sætning.|Я не понимаю последнее предложение.
at forklare|объяснять|verb|A2|Kan du forklare reglen igen?|Можешь ещё раз объяснить правило?
at gentage|повторять|verb|A2|Vil du gentage dit navn?|Повтори, пожалуйста, своё имя.
at stave|произносить или писать по буквам|verb|A2|Hvordan staver du dit efternavn?|Как пишется твоя фамилия по буквам?
`,
  family: `
en mor|мать; мама|noun|A1|Min mor kommer på besøg.|Моя мама придёт в гости.
en far|отец; папа|noun|A1|Min far bor i Odense.|Мой отец живёт в Оденсе.
en søn|сын|noun|A1|Vores søn går i børnehave.|Наш сын ходит в детский сад.
en datter|дочь|noun|A1|Hendes datter spiller fodbold.|Её дочь играет в футбол.
en bror|брат|noun|A1|Min bror er yngre end mig.|Мой брат младше меня.
en søster|сестра|noun|A1|Jeg ringer til min søster.|Я звоню сестре.
en bedstemor|бабушка|noun|A1|Bedstemor læser højt for os.|Бабушка читает нам вслух.
en bedstefar|дедушка|noun|A1|Min bedstefar går en tur hver dag.|Мой дедушка каждый день гуляет.
en forælder|родитель|noun|A2|En forælder skal skrive under.|Один из родителей должен подписать.
en kæreste|любимый человек; парень или девушка|noun|A1|Min kæreste laver mad i aften.|Сегодня вечером готовит мой партнёр.
en ægtefælle|супруг; супруга|noun|B1|Min ægtefælle henter børnene i dag.|Сегодня детей забирает мой супруг.
en mand|мужчина; муж|noun|A1|Min mand arbejder hjemme i dag.|Мой муж сегодня работает дома.
en kvinde|женщина|noun|A1|Kvinden ved døren er min nabo.|Женщина у двери — моя соседка.
en nabo|сосед; соседка|noun|A1|Vores nabo passer katten.|Наш сосед присматривает за кошкой.
en baby|младенец|noun|A1|Babyen sover i barnevognen.|Младенец спит в коляске.
en teenager|подросток|noun|A2|Der bor en teenager i familien.|В семье есть подросток.
en fødsel|роды; рождение|noun|B1|Familien glæder sig over barnets fødsel.|Семья радуется рождению ребёнка.
en barnevogn|детская коляска|noun|A2|Barnevognen står i gangen.|Коляска стоит в прихожей.
en børnehave|детский сад|noun|A1|Børnehaven åbner klokken syv.|Детский сад открывается в семь.
en vuggestue|ясли|noun|A2|Den lille går i vuggestue.|Малыш ходит в ясли.
at passe|присматривать; подходить|verb|A2|Kan du passe børnene på fredag?|Можешь присмотреть за детьми в пятницу?
at hente|забирать; приносить|verb|A1|Jeg henter min datter klokken fire.|Я забираю дочь в четыре.
at aflevere|отдавать; отводить|verb|A2|Han afleverer barnet i børnehaven.|Он отводит ребёнка в детский сад.
at besøge|навещать; посещать|verb|A1|Vi besøger bedstemor på søndag.|В воскресенье мы навестим бабушку.
at vokse|расти|verb|A2|Børnene vokser hurtigt.|Дети быстро растут.
gravid|беременная|adjective|A2|Min søster er gravid.|Моя сестра беременна.
`,
  time: `
en morgen|утро|noun|A1|Det er en stille morgen.|Это тихое утро.
en formiddag|время до полудня|noun|A2|Jeg arbejder hele formiddagen.|Я работаю всё утро до полудня.
en eftermiddag|вторая половина дня|noun|A1|Vi mødes om eftermiddagen.|Мы встретимся во второй половине дня.
en aften|вечер|noun|A1|Det bliver en hyggelig aften.|Будет уютный вечер.
en nat|ночь|noun|A1|Jeg vågner midt om natten.|Я просыпаюсь посреди ночи.
en time|час|noun|A1|Turen tager en time.|Поездка занимает час.
et minut|минута|noun|A1|Vent et minut.|Подожди минуту.
et sekund|секунда|noun|A1|Det tager kun et sekund.|Это займёт всего секунду.
en weekend|выходные|noun|A1|Vi har ingen planer i weekenden.|У нас нет планов на выходные.
en kalender|календарь|noun|A1|Jeg skriver aftalen i kalenderen.|Я записываю встречу в календарь.
en dato|дата|noun|A1|Hvilken dato passer dig?|Какая дата тебе подходит?
en fødselsdag|день рождения|noun|A1|Jeg har fødselsdag i maj.|У меня день рождения в мае.
et tidspunkt|момент; определённое время|noun|A2|Vi finder et andet tidspunkt.|Мы найдём другое время.
en hverdag|будний день; повседневность|noun|A2|Bussen kører oftere på hverdage.|По будням автобус ходит чаще.
en helligdag|праздничный нерабочий день|noun|A2|Butikken er lukket på helligdage.|В праздничные дни магазин закрыт.
at planlægge|планировать|verb|A2|Vi planlægger næste uge.|Мы планируем следующую неделю.
at vente|ждать|verb|A1|Jeg venter ved indgangen.|Я жду у входа.
at skynde sig|торопиться|verb|A2|Vi skal skynde os til bussen.|Нам нужно поторопиться на автобус.
en tidsplan|план по времени; график|noun|B1|Vi laver en tidsplan for dagen.|Мы составляем план на день.
en varighed|продолжительность|noun|B1|Turen har en varighed på to timer.|Продолжительность поездки — два часа.
i dag|сегодня|phrase|A1|I dag bliver jeg hjemme.|Сегодня я останусь дома.
i morgen|завтра|phrase|A1|Vi ses i morgen efter arbejde.|Увидимся завтра после работы.
i går|вчера|phrase|A1|Jeg var på biblioteket i går.|Вчера я был в библиотеке.
forleden|на днях в прошлом|adverb|A2|Jeg så din bror forleden.|На днях я видел твоего брата.
om lidt|скоро; через немного времени|phrase|A1|Maden er klar om lidt.|Еда скоро будет готова.
til tiden|вовремя|phrase|A2|Toget ankommer til tiden.|Поезд прибывает вовремя.
`,
  money: `
en regning|счёт к оплате|noun|A2|Jeg betaler regningen i dag.|Я оплачиваю счёт сегодня.
en bank|банк|noun|A1|Jeg har et møde i banken.|У меня встреча в банке.
en konto|счёт в банке; учётная запись|noun|A2|Lønnen går ind på min konto.|Зарплата поступает на мой счёт.
et betalingskort|платёжная карта|noun|A2|Mit betalingskort ligger i pungen.|Моя платёжная карта лежит в кошельке.
et beløb|сумма денег|noun|A2|Tjek beløbet før du betaler.|Проверь сумму перед оплатой.
en mønt|монета|noun|A1|Jeg finder en mønt i lommen.|Я нахожу монету в кармане.
en seddel|банкнота; записка|noun|A2|Kan du veksle denne seddel?|Можете разменять эту банкноту?
en saldo|остаток на счёте; баланс|noun|A2|Jeg tjekker min saldo i netbanken.|Я проверяю остаток в интернет-банке.
en overførsel|денежный перевод|noun|A2|Overførslen er gået igennem.|Перевод прошёл.
en betaling|платёж; оплата|noun|A2|Jeg har fået en bekræftelse på betalingen.|Мне пришло подтверждение оплаты.
et budget|бюджет|noun|B1|Vi laver et budget for måneden.|Мы составляем бюджет на месяц.
en udgift|расход|noun|B1|Huslejen er vores største udgift.|Арендная плата — наш самый большой расход.
en indtægt|доход|noun|B1|Vi skriver alle indtægter i budgettet.|Мы записываем в бюджет все доходы.
en opsparing|сбережения; накопления|noun|B1|Jeg har en lille opsparing.|У меня есть небольшие сбережения.
en gæld|долг|noun|B1|Han betaler sin gæld tilbage.|Он возвращает свой долг.
et lån|заём; кредит|noun|B1|Vi taler med banken om et lån.|Мы говорим с банком о кредите.
en rente|процент по вкладу или кредиту|noun|B1|Renten står i aftalen.|Процентная ставка указана в договоре.
en forsikring|страховка|noun|A2|Hvad dækker min forsikring?|Что покрывает моя страховка?
en husleje|арендная плата за жильё|noun|A2|Huslejen skal betales på mandag.|Арендную плату нужно внести в понедельник.
en skat|налог|noun|B1|Jeg betaler skat af min løn.|Я плачу налог с зарплаты.
at spare|экономить; копить|verb|A2|Vi sparer op til en ferie.|Мы копим на отпуск.
at låne|одалживать; брать взаймы|verb|A2|Må jeg låne hundrede kroner?|Можно одолжить у тебя сто крон?
at overføre|переводить деньги|verb|A2|Jeg overfører pengene i aften.|Я переведу деньги сегодня вечером.
at hæve|снимать деньги|verb|A2|Jeg skal hæve penge til turen.|Мне нужно снять деньги на поездку.
at skylde|быть должным|verb|A2|Jeg skylder dig halvtreds kroner.|Я должен тебе пятьдесят крон.
med kort|картой; при оплате|phrase|A1|Jeg vil gerne betale med kort.|Я хотел бы оплатить картой.
`,
  digital: `
en adgangskode|пароль; код доступа|noun|A2|Jeg har glemt min adgangskode.|Я забыл свой пароль.
et brugernavn|имя пользователя|noun|A2|Skriv dit brugernavn her.|Введите здесь своё имя пользователя.
en skærm|экран|noun|A1|Skærmen er for mørk.|Экран слишком тёмный.
et tastatur|клавиатура|noun|A2|Mit tastatur har danske bogstaver.|На моей клавиатуре есть датские буквы.
en mus|компьютерная мышь; мышь|noun|A2|Musen ligger ved tastaturet.|Мышь лежит у клавиатуры.
en oplader|зарядное устройство|noun|A2|Har du en oplader til min mobil?|У тебя есть зарядка для моего телефона?
et batteri|аккумулятор; батарейка|noun|A2|Batteriet er næsten tomt.|Аккумулятор почти разряжен.
en besked|сообщение|noun|A1|Jeg sender dig en besked.|Я отправлю тебе сообщение.
en e-mail|электронное письмо|noun|A1|Jeg har fået en e-mail fra skolen.|Мне пришло письмо из школы.
en hjemmeside|сайт; веб-страница|noun|A2|Adressen står på hjemmesiden.|Адрес указан на сайте.
en app|приложение|noun|A2|Jeg åbner bankens app.|Я открываю приложение банка.
et netværk|сеть|noun|A2|Telefonen kan ikke finde netværket.|Телефон не находит сеть.
en forbindelse|соединение; связь|noun|A2|Vi har en dårlig forbindelse.|У нас плохая связь.
en fil|файл|noun|A2|Jeg gemmer filen på computeren.|Я сохраняю файл на компьютере.
en mappe|папка|noun|A2|Billederne ligger i denne mappe.|Фотографии находятся в этой папке.
et billede|изображение; фотография; картина|noun|A1|Kan du sende mig billedet?|Можешь прислать мне фотографию?
et link|ссылка|noun|A2|Linket åbner en ny side.|Ссылка открывает новую страницу.
en indstilling|настройка|noun|B1|Du kan ændre sproget i indstillingerne.|Язык можно изменить в настройках.
at logge ind|входить в систему|verb|A2|Jeg kan ikke logge ind.|Я не могу войти в систему.
at logge ud|выходить из системы|verb|A2|Husk at logge ud bagefter.|Не забудь потом выйти из системы.
at downloade|скачивать|verb|A2|Jeg downloader billetten på min mobil.|Я скачиваю билет на телефон.
at gemme|сохранять; прятать|verb|A2|Husk at gemme dokumentet.|Не забудь сохранить документ.
at slette|удалять|verb|A2|Jeg sletter den gamle fil.|Я удаляю старый файл.
at klikke|нажимать мышью|verb|A2|Klik på den grønne knap.|Нажми на зелёную кнопку.
at opdatere|обновлять|verb|B1|Jeg opdaterer appen i aften.|Я обновлю приложение вечером.
at oplade|заряжать|verb|A2|Jeg skal oplade min mobil.|Мне нужно зарядить телефон.
`,
  civic: `
en kommune|муниципалитет|noun|A2|Jeg skriver til kommunen.|Я пишу в муниципалитет.
et rådhus|ратуша; здание мэрии|noun|A2|Rådhuset ligger ved torvet.|Ратуша находится у площади.
en borger|житель; гражданин|noun|B1|Kommunen inviterer borgerne til møde.|Муниципалитет приглашает жителей на встречу.
en adresse|адрес|noun|A1|Hvad er din nye adresse?|Какой у тебя новый адрес?
et postnummer|почтовый индекс|noun|A2|Skriv postnummer og by.|Напиши индекс и город.
et pas|паспорт|noun|A1|Jeg tager mit pas med.|Я беру с собой паспорт.
et kørekort|водительское удостоверение|noun|A2|Har du dit kørekort med?|У тебя с собой водительские права?
et sundhedskort|карта медицинского страхования|noun|A2|Mit sundhedskort ligger i pungen.|Моя медицинская карта лежит в кошельке.
et dokument|документ|noun|A2|Jeg tager en kopi af dokumentet.|Я делаю копию документа.
en blanket|бланк; формуляр|noun|B1|Hvor finder jeg den rigtige blanket?|Где найти нужный бланк?
en underskrift|подпись|noun|A2|Der mangler en underskrift.|Не хватает подписи.
en tilladelse|разрешение|noun|B1|Vi venter på en tilladelse.|Мы ждём разрешения.
en regel|правило|noun|A2|Reglerne står ved indgangen.|Правила написаны у входа.
en lov|закон|noun|B1|Vi taler om den nye lov.|Мы говорим о новом законе.
et valg|выбор; выборы|noun|B1|Der er valg i næste uge.|На следующей неделе выборы.
en stemme|голос|noun|B1|Hun afgiver sin stemme.|Она отдаёт свой голос.
et bibliotek|библиотека|noun|A1|Jeg låner bøger på biblioteket.|Я беру книги в библиотеке.
en politibetjent|полицейский|noun|A2|Politibetjenten viser os vej.|Полицейский показывает нам дорогу.
en brandbil|пожарная машина|noun|A2|Brandbilen kører forbi.|Мимо проезжает пожарная машина.
en ambulance|машина скорой помощи|noun|A2|Der holder en ambulance ved hospitalet.|У больницы стоит скорая помощь.
en affaldsbeholder|контейнер для мусора|noun|B1|Glas skal i den rigtige affaldsbeholder.|Стекло нужно класть в соответствующий контейнер.
at udfylde|заполнять|verb|A2|Kan du hjælpe mig med at udfylde blanketten?|Поможешь мне заполнить бланк?
at underskrive|подписывать|verb|B1|Jeg skal underskrive dokumentet.|Мне нужно подписать документ.
at flytte|переезжать; перемещать|verb|A2|Vi flytter til en anden by.|Мы переезжаем в другой город.
at tilmelde sig|записываться; регистрироваться|verb|B1|Jeg tilmelder mig mødet.|Я записываюсь на встречу.
at melde afbud|сообщать об отмене своего участия|verb|B1|Jeg ringer for at melde afbud.|Я звоню, чтобы отменить своё участие.
`,
  emotions: `
en følelse|чувство; ощущение|noun|A2|Det er en mærkelig følelse.|Это странное чувство.
en glæde|радость|noun|A2|Det er en glæde at se dig.|Радостно тебя видеть.
en sorg|горе; скорбь|noun|B1|Hun taler om sin sorg med en ven.|Она говорит с другом о своём горе.
en frygt|страх|noun|B1|Han fortæller om sin frygt for mørke.|Он рассказывает о своём страхе темноты.
en bekymring|беспокойство; забота|noun|B1|Jeg deler min bekymring med min søster.|Я делюсь своим беспокойством с сестрой.
en overraskelse|сюрприз; неожиданность|noun|A2|Besøget var en dejlig overraskelse.|Визит стал приятным сюрпризом.
en skuffelse|разочарование|noun|B1|Aflysningen var en stor skuffelse.|Отмена стала большим разочарованием.
et humør|настроение|noun|A2|Jeg er i godt humør i dag.|Сегодня у меня хорошее настроение.
et håb|надежда|noun|B1|Vi har stadig håb om godt vejr.|Мы всё ещё надеемся на хорошую погоду.
en drøm|мечта; сон|noun|A2|Min drøm er at rejse til Island.|Моя мечта — поехать в Исландию.
en lyst|желание|noun|A2|Jeg har lyst til en kop te.|Мне хочется чашку чая.
en ro|спокойствие; покой|noun|A2|Jeg har brug for ro efter arbejdet.|После работы мне нужен покой.
glad|радостный; довольный|adjective|A1|Jeg er glad for din hjælp.|Я рад твоей помощи.
træt|уставший|adjective|A1|Hun er træt efter den lange tur.|Она устала после долгой поездки.
rolig|спокойный|adjective|A2|Han er rolig før samtalen.|Перед собеседованием он спокоен.
nervøs|нервничающий; взволнованный|adjective|A2|Jeg er nervøs før prøven.|Я нервничаю перед тестом.
at græde|плакать|verb|A1|Barnet begynder at græde.|Ребёнок начинает плакать.
vred|сердитый; злой|adjective|A2|Han er vred over aflysningen.|Он сердится из-за отмены.
ked af det|расстроенный; огорчённый|phrase|A1|Jeg er ked af det i dag.|Сегодня я расстроен.
stolt|гордый|adjective|A2|Jeg er stolt af min datter.|Я горжусь своей дочерью.
at føle sig|чувствовать себя|verb|A2|Jeg føler mig hjemme her.|Здесь я чувствую себя как дома.
at slappe af|расслабляться; отдыхать|verb|A2|Jeg slapper af med en bog.|Я отдыхаю с книгой.
tryg|чувствующий себя в безопасности|adjective|B1|Barnet føler sig trygt hos sin mor.|Рядом с мамой ребёнок чувствует себя в безопасности.
at håbe|надеяться|verb|A2|Jeg håber at du kan komme.|Надеюсь, ты сможешь прийти.
at savne|скучать по кому-либо; испытывать нехватку|verb|A2|Jeg savner min familie.|Я скучаю по своей семье.
at glæde sig til|с нетерпением ждать|verb|A2|Vi glæder os til ferien.|Мы с нетерпением ждём отпуска.
`,
  leisure: `
en film|фильм|noun|A1|Vi ser en film efter aftensmaden.|После ужина мы смотрим фильм.
en serie|сериал; серия|noun|A1|Jeg ser en dansk serie.|Я смотрю датский сериал.
en biograf|кинотеатр|noun|A1|Skal vi gå i biografen?|Пойдём в кино?
en koncert|концерт|noun|A1|Vi skal til koncert på lørdag.|В субботу мы идём на концерт.
en sang|песня|noun|A1|Jeg kender denne sang.|Я знаю эту песню.
en melodi|мелодия|noun|A2|Melodien er let at huske.|Эту мелодию легко запомнить.
et instrument|музыкальный инструмент; инструмент|noun|A2|Spiller du på et instrument?|Ты играешь на каком-нибудь инструменте?
en guitar|гитара|noun|A1|Hendes guitar står i stuen.|Её гитара стоит в гостиной.
et klaver|пианино; фортепиано|noun|A2|Han øver sig på klaveret.|Он упражняется на пианино.
en sport|вид спорта; спорт|noun|A2|Hvilken sport dyrker du?|Каким спортом ты занимаешься?
et hold|команда; группа|noun|A2|Vi spiller på samme hold.|Мы играем в одной команде.
en kamp|матч; борьба|noun|A2|Kampen begynder klokken seks.|Матч начинается в шесть.
en svømmehal|крытый бассейн|noun|A2|Svømmehallen er åben i dag.|Сегодня бассейн открыт.
en svømmetur|плавание; купание|noun|A2|Vi tager en svømmetur i søen.|Мы идём купаться в озере.
en gåtur|прогулка пешком|noun|A1|Jeg har lyst til en gåtur.|Мне хочется прогуляться.
en udflugt|экскурсия; небольшая поездка|noun|A2|Vi planlægger en udflugt til kysten.|Мы планируем поездку на побережье.
en hobby|хобби; увлечение|noun|A2|Min hobby er at tegne.|Моё хобби — рисование.
et spil|игра|noun|A1|Vi spiller et spil med børnene.|Мы играем с детьми в игру.
en dans|танец|noun|A1|Skal vi tage en dans?|Потанцуем?
et museum|музей|noun|A1|Museet åbner klokken ti.|Музей открывается в десять.
en udstilling|выставка|noun|A2|Der er en ny udstilling på museet.|В музее новая выставка.
at svømme|плавать|verb|A1|Jeg svømmer en gang om ugen.|Я плаваю раз в неделю.
at danse|танцевать|verb|A1|De danser hele aftenen.|Они танцуют весь вечер.
at tegne|рисовать|verb|A1|Barnet tegner en kat.|Ребёнок рисует кошку.
at spille|играть|verb|A1|Vi spiller kort efter maden.|После еды мы играем в карты.
at læse|читать|verb|A1|Jeg læser før jeg går i seng.|Я читаю перед сном.
`,
  nature: `
en skov|лес|noun|A1|Vi går en tur i skoven.|Мы гуляем в лесу.
en park|парк|noun|A1|Parken ligger bag skolen.|Парк находится за школой.
en have|сад|noun|A1|Vi drikker kaffe i haven.|Мы пьём кофе в саду.
en strand|пляж; берег моря|noun|A1|Børnene leger på stranden.|Дети играют на пляже.
en sø|озеро|noun|A1|Vi går rundt om søen.|Мы обходим озеро пешком.
en ø|остров|noun|A2|Min søster bor på en ø.|Моя сестра живёт на острове.
et hav|море; океан|noun|A1|Vi kan se havet fra huset.|Из дома нам видно море.
en himmel|небо|noun|A2|Himlen er helt blå.|Небо совсем голубое.
en sol|солнце|noun|A1|Solen skinner i dag.|Сегодня светит солнце.
en sky|облако|noun|A2|Der er en mørk sky over byen.|Над городом тёмное облако.
en vind|ветер|noun|A2|Vinden kommer fra vest.|Ветер дует с запада.
en regn|дождь|noun|A1|Vi venter på at regnen stopper.|Мы ждём, пока закончится дождь.
en sne|снег|noun|A1|Sneen ligger på taget.|На крыше лежит снег.
en frost|мороз; заморозок|noun|A2|Der er frost på ruden.|На стекле изморозь.
et vejr|погода|noun|A1|Vejret er godt til en gåtur.|Погода подходит для прогулки.
en temperatur|температура|noun|A2|Temperaturen falder i aften.|Вечером температура снизится.
et dyr|животное|noun|A1|Der er et lille dyr i haven.|В саду маленькое животное.
en hund|собака|noun|A1|Hunden skal ud at gå.|Собаку нужно вывести на прогулку.
en kat|кошка; кот|noun|A1|Katten ligger i solen.|Кошка лежит на солнце.
en fugl|птица|noun|A1|En fugl sidder på taget.|На крыше сидит птица.
at regne|идти о дожде; считать|verb|A1|Det begynder at regne.|Начинается дождь.
at sne|идти о снеге|verb|A1|Det sner udenfor.|На улице идёт снег.
at blæse|дуть|verb|A2|Det blæser meget ved kysten.|На побережье очень ветрено.
en vejrudsigt|прогноз погоды|noun|A2|Vejrudsigten lover sol i morgen.|По прогнозу завтра будет солнце.
varm|тёплый; горячий|adjective|A1|Luften er varm i haven.|В саду тёплый воздух.
glat|скользкий; гладкий|adjective|A2|Vejen er glat efter frosten.|После заморозков дорога скользкая.
`,
  clothing: `
en jakke|куртка|noun|A1|Jeg tager en jakke med.|Я беру с собой куртку.
en frakke|пальто|noun|A1|Min frakke hænger i gangen.|Моё пальто висит в прихожей.
en trøje|свитер; кофта|noun|A1|Denne trøje er dejlig varm.|Этот свитер очень тёплый.
en skjorte|рубашка|noun|A1|Jeg stryger min skjorte.|Я глажу рубашку.
en T-shirt|футболка|noun|A1|Jeg køber en hvid T-shirt.|Я покупаю белую футболку.
en kjole|платье|noun|A1|Hun har en blå kjole på.|На ней синее платье.
en nederdel|юбка|noun|A1|Nederdelen passer godt.|Юбка хорошо сидит.
en sok|носок|noun|A1|Der mangler en sok i vasken.|В стирке не хватает одного носка.
en sko|ботинок; туфля|noun|A1|Der er en sten i min sko.|У меня в ботинке камешек.
en støvle|сапог|noun|A2|Min støvle er våd indeni.|Мой сапог мокрый внутри.
en hue|шапка|noun|A1|Tag en hue på i kulden.|Надень шапку в холодную погоду.
en handske|перчатка|noun|A2|Jeg har tabt min ene handske.|Я потерял одну перчатку.
et halstørklæde|шарф|noun|A2|Mit halstørklæde ligger i tasken.|Мой шарф лежит в сумке.
et bælte|ремень; пояс|noun|A2|Jeg har brug for et nyt bælte.|Мне нужен новый ремень.
en lomme|карман|noun|A1|Nøglen ligger i min lomme.|Ключ лежит у меня в кармане.
en knap|пуговица; кнопка|noun|A2|Der mangler en knap på skjorten.|На рубашке не хватает пуговицы.
en lynlås|молния на одежде|noun|A2|Lynlåsen på jakken sidder fast.|Молнию на куртке заело.
en bøjle|вешалка для одежды|noun|A2|Hæng frakken på en bøjle.|Повесь пальто на вешалку.
en vask|стирка; раковина|noun|A2|Jeg sætter en vask over.|Я запускаю стирку.
et vaskemiddel|средство для стирки|noun|A2|Vi mangler vaskemiddel.|У нас закончилось средство для стирки.
at tage på|надевать; прибавлять в весе|verb|A1|Jeg tager min jakke på.|Я надеваю куртку.
at tage af|снимать одежду|verb|A1|Tag skoene af i gangen.|Сними обувь в прихожей.
at klæde sig på|одеваться|verb|A2|Barnet klæder sig selv på.|Ребёнок одевается сам.
at stryge|гладить утюгом|verb|A2|Jeg skal stryge en skjorte.|Мне нужно погладить рубашку.
at hænge op|развешивать; вешать|verb|A2|Vi hænger tøjet op i haven.|Мы развешиваем бельё в саду.
at tørre|сушить; вытирать; сохнуть|verb|A2|Jeg tørrer tøjet udenfor.|Я сушу бельё на улице.
`,
  services: `
en frisør|парикмахер; парикмахерская|noun|A1|Jeg har en tid hos frisøren.|Я записан к парикмахеру.
en klipning|стрижка|noun|A2|Hvad koster en klipning?|Сколько стоит стрижка?
en reparation|ремонт|noun|A2|Cyklen er til reparation.|Велосипед в ремонте.
et værksted|мастерская; автосервис|noun|A2|Værkstedet ringer når bilen er klar.|В автосервисе позвонят, когда машина будет готова.
en mekaniker|механик|noun|A2|Mekanikeren undersøger bilen.|Механик осматривает машину.
en elektriker|электрик|noun|A2|Vi venter på elektrikeren.|Мы ждём электрика.
en blikkenslager|сантехник; жестянщик|noun|B1|Blikkenslageren reparerer røret.|Сантехник ремонтирует трубу.
en vicevært|смотритель дома; управляющий по хозяйству|noun|B1|Jeg giver viceværten besked om fejlen.|Я сообщаю смотрителю дома о неисправности.
en udlejer|арендодатель|noun|B1|Udlejeren sender en ny kontrakt.|Арендодатель присылает новый договор.
en lejer|арендатор|noun|B1|Lejeren får nøglen på mandag.|Арендатор получит ключ в понедельник.
en reservation|бронирование|noun|A2|Jeg har en reservation til to personer.|У меня бронь на двоих.
en restaurant|ресторан|noun|A1|Restauranten ligger ved havnen.|Ресторан находится у гавани.
en menu|меню; набор блюд|noun|A2|Har I en vegetarisk menu?|У вас есть вегетарианское меню?
en tjener|официант|noun|A2|Tjeneren kommer med vand.|Официант приносит воду.
et hotel|гостиница|noun|A1|Vi bor på et lille hotel.|Мы остановились в маленькой гостинице.
en reception|стойка регистрации; приёмная|noun|A2|Du kan spørge i receptionen.|Можно спросить на стойке регистрации.
en levering|доставка|noun|A2|Leveringen kommer i morgen.|Доставка будет завтра.
en pakkeshop|пункт выдачи посылок|noun|A2|Jeg henter pakken i en pakkeshop.|Я забираю посылку в пункте выдачи.
en kundeservice|служба поддержки клиентов|noun|A2|Jeg kontakter kundeservice.|Я связываюсь со службой поддержки.
en fejl|ошибка; неисправность|noun|A2|Der er en fejl på regningen.|В счёте ошибка.
en klage|жалоба|noun|B1|Jeg vil gerne sende en klage.|Я хотел бы отправить жалобу.
at bestille|заказывать|verb|A1|Vi bestiller et bord til fredag.|Мы заказываем столик на пятницу.
at reparere|ремонтировать|verb|A2|Kan du reparere min cykel?|Можешь починить мой велосипед?
at aflyse|отменять мероприятие или договорённость|verb|A2|Jeg bliver nødt til at aflyse besøget.|Мне придётся отменить визит.
at hjælpe|помогать|verb|A1|Kan du hjælpe mig med døren?|Можешь помочь мне с дверью?
at kontakte|связываться с кем-либо|verb|A2|Jeg kontakter udlejeren i morgen.|Я свяжусь с арендодателем завтра.
`,
  social: `
en gæst|гость|noun|A1|Vi får en gæst til middag.|К нам придёт гость на ужин.
en vært|хозяин; принимающая сторона|noun|A2|Værten byder os velkommen.|Хозяин приветствует нас.
en invitation|приглашение|noun|A2|Tak for invitationen til festen.|Спасибо за приглашение на праздник.
en fest|праздник; вечеринка|noun|A1|Vi holder en lille fest på lørdag.|В субботу у нас небольшая вечеринка.
en gave|подарок|noun|A1|Jeg tager en gave med til barnet.|Я беру с собой подарок для ребёнка.
en hilsen|приветствие; привет|noun|A2|Send en hilsen til din mor.|Передай привет своей маме.
en undskyldning|извинение; оправдание|noun|A2|Jeg skylder dig en undskyldning.|Я должен принести тебе извинения.
en mening|мнение; смысл|noun|A2|Hvad er din mening om planen?|Каково твоё мнение об этом плане?
et fornavn|личное имя|noun|A1|Hvad er dit fornavn?|Как тебя зовут по имени?
et telefonopkald|телефонный звонок|noun|A2|Jeg venter på et telefonopkald.|Я жду телефонного звонка.
et besøg|визит; посещение|noun|A1|Tak for et hyggeligt besøg.|Спасибо за приятный визит.
et smil|улыбка|noun|A1|Hun møder os med et smil.|Она встречает нас с улыбкой.
at hilse|здороваться; приветствовать|verb|A1|Vi hilser på de nye naboer.|Мы здороваемся с новыми соседями.
at invitere|приглашать|verb|A2|Jeg inviterer min kollega til kaffe.|Я приглашаю коллегу на кофе.
at mødes|встречаться|verb|A1|Hvor skal vi mødes på lørdag?|Где нам встретиться в субботу?
at ringe|звонить|verb|A1|Jeg ringer til dig efter arbejde.|Я позвоню тебе после работы.
at tale|говорить; разговаривать|verb|A1|Vi taler om vores planer.|Мы говорим о наших планах.
at lytte|слушать внимательно|verb|A2|Tak fordi du lytter til mig.|Спасибо, что выслушиваешь меня.
at spørge|спрашивать|verb|A1|Må jeg spørge dig om noget?|Можно тебя кое о чём спросить?
at svare|отвечать|verb|A1|Jeg svarer på din besked i aften.|Я отвечу на твоё сообщение вечером.
at fortælle|рассказывать|verb|A2|Fortæl mig om din dag.|Расскажи мне о своём дне.
at takke|благодарить|verb|A2|Jeg vil gerne takke dig for hjælpen.|Я хотел бы поблагодарить тебя за помощь.
at undskylde|извинять; извиняться|verb|A2|Du må undskylde at jeg kommer for sent.|Извини, что я опоздал.
enig|согласный|adjective|A2|Jeg er enig i dit forslag.|Я согласен с твоим предложением.
uenig|несогласный|adjective|A2|Vi er uenige om tidspunktet.|Мы не согласны друг с другом насчёт времени.
velkommen|добро пожаловать; желанный|adjective|A1|Du er altid velkommen hos os.|Мы всегда тебе рады.
`,
};

const slug = text => text.normalize('NFC').toLocaleLowerCase('da')
  .replace(/æ/g,'ae').replace(/ø/g,'oe').replace(/å/g,'aa')
  .replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
const massNouns = new Set(['en undervisning','en udtale','en feber','en hoste',
  'en ro','en regn','en sne','en frost','et vejr','en kundeservice']);
export const dailyLexicon = Object.entries(rows).flatMap(([category,text]) =>
  text.trim().split('\n').map(line => {
    const [da,ru,wordClass,level,exampleDa,exampleRu] = line.split('|');
    return {id:'everyday-'+slug(da),da,ru,category,wordClass,level,exampleDa,exampleRu,
      ...(massNouns.has(da)?{note:'Артикль показывает род. В этом значении слово часто употребляется без неопределённого артикля; смотри пример.'}:{}),
      source:'daily',kind:'word',verified:true};
  })
);
