// Antonym pairs ("Противоположности"). Authored as compact rows, expanded below into the record shape
//   {id, theme, category, pos, a:{da, lemma, ru, article?|inf?, say?, stod?}, b:{...}, exampleA:{da,ru}, exampleB:{da,ru}, note}
// Rules kept by tests/antonym-data.test.mjs: nouns carry en/et, verbs carry "at", Danish fields hold no Cyrillic, every Danish word appears once,
// and a pronunciation hint (say) or a stød mark exists only where it is certain (see `sound` below).
export const antonymThemes = [
  {id: 'qualities', title: 'Качества и размеры'},
  {id: 'character', title: 'Чувства и характер'},
  {id: 'colors', title: 'Цвета и свет'},
  {id: 'time', title: 'Время и частота'},
  {id: 'state', title: 'Состояние и оценка'},
  {id: 'motion', title: 'Движение и направление'},
  {id: 'verbs', title: 'Глаголы-антонимы', note: 'Инфинитив записан с at: at købe. Когда пишешь ответ, at можно не добавлять.'},
  {id: 'nouns', title: 'Существительные и абстракции', note: 'Учи артикль вместе со словом: en fordel, et flertal. В письменном ответе артикль обязателен.'}
];

export const antonymPosNames = {adj: 'Прилагательные', noun: 'Существительные', verb: 'Глаголы', adv: 'Наречия и выражения'};

// Pronunciation help. `stod` marks a word that has stød in its dictionary form (IPA ˀ); words without it are left unmarked, never marked "no".
// `say` is an approximate Cyrillic reading, given only for a few short words where it is reliable. Keyed by the word without article / "at".
export const sound = {
  høj: {say: 'хойь', stod: true}, nej: {say: 'най', stod: true}, mand: {say: 'ман', stod: true}, ny: {say: 'ню', stod: true}, syg: {say: 'сю', stod: true},
  hvid: {stod: true}, stor: {stod: true}, lav: {stod: true}, lang: {stod: true}, tyk: {stod: true}, tynd: {stod: true}, kold: {stod: true}, varm: {stod: true},
  dyr: {stod: true}, tung: {stod: true}, ren: {stod: true}, glad: {stod: true}, god: {stod: true}, ud: {stod: true}, ind: {stod: true}, ned: {stod: true},
  fred: {stod: true}, mor: {stod: true}, far: {stod: true}, søn: {stod: true}, bror: {stod: true}, dreng: {stod: true}, dag: {stod: true}, by: {stod: true}, land: {stod: true}
};

// Near-synonyms that must not stand together among the answer options, and words that are also accepted when typed.
// Keys and members are words without article / "at", lower case.
export const antonymConfusable = [
  ['nem', 'let', 'enkel'], ['svær', 'kompliceret'], ['stor', 'høj', 'lang'], ['lille', 'lav', 'kort'], ['tyk', 'bred'], ['tynd', 'smal'],
  ['stærk', 'hård', 'tung'], ['svag', 'blød', 'let'], ['billig', 'fattig'], ['dyr', 'rig'], ['rask', 'sund'], ['syg', 'usund'],
  ['sikker', 'tryg'], ['farlig', 'utryg'], ['klar', 'gennemsigtig'], ['uklar', 'uigennemsigtig'], ['sort', 'mørk', 'mørkeblå', 'mørkhåret'],
  ['hvid', 'lys', 'lyseblå', 'lyshåret'], ['altid', 'ofte'], ['aldrig', 'sjældent'], ['tidlig', 'snart'], ['sen', 'senere'], ['hurtig', 'snart'],
  ['glad', 'tilfreds', 'munter'], ['trist', 'utilfreds'], ['give', 'sende'], ['tage', 'modtage'], ['købe', 'tage'], ['sælge', 'give'],
  ['miste', 'tabe'], ['slutte', 'stoppe'], ['begynde', 'fortsætte'], ['lukke', 'slukke'], ['åbne', 'tænde'], ['tillade', 'acceptere'], ['forbyde', 'afvise'],
  ['stige', 'løfte'], ['falde', 'sænke'], ['komme', 'ankomme'], ['gå', 'afgå'], ['fjerne', 'sprede'], ['tilføje', 'fylde'], ['stå op', 'vågne'],
  ['lægge sig', 'falde i søvn'], ['sætte sig', 'stå op'], ['ven', 'fjende'],
  ['kvinde', 'pige', 'datter', 'søster', 'mor'], ['mand', 'dreng', 'søn', 'bror', 'far'], ['nat', 'aften', 'vinter'], ['dag', 'morgen', 'sommer'],
  ['ulempe', 'nederlag', 'problem', 'løgn'], ['fordel', 'succes', 'løsning', 'sandhed'], ['sorg', 'fjendskab', 'krig'], ['glæde', 'venskab', 'fred'],
  ['over', 'foran', 'op'], ['under', 'bag', 'ned'], ['her', 'indenfor'], ['der', 'udenfor'], ['højre', 'frem'], ['venstre', 'tilbage'], ['til', 'ind'], ['fra', 'ud'],
  ['tæt på', 'her'], ['langt væk', 'der']
];
export const antonymAlso = {
  nem: ['let'], svær: ['vanskelig'], let: ['nem'], tage: ['modtage'], modtage: ['få'], miste: ['tabe'], slutte: ['stoppe', 'holde op'], trist: ['ked af det']
};

// [pos, a, a in Russian, b, b in Russian, example of a, its translation, example of b, its translation, note]
const rows = {
  qualities: [
    ['adj', 'stor', 'большой', 'lille', 'маленький', 'Vi bor i en stor lejlighed.', 'Мы живём в большой квартире.', 'Hun har en lille taske.', 'У неё маленькая сумка.', 'Lille — только в единственном числе; во множественном числе говорят små: små tasker.'],
    ['adj', 'høj', 'высокий', 'lav', 'низкий', 'Tårnet er meget højt.', 'Башня очень высокая.', 'Loftet er lavt.', 'Потолок низкий.', 'Прилагательное согласуется с существительным: en høj mand, et højt hus, høje træer. Цены и уровень тоже høj / lav.'],
    ['adj', 'lang', 'длинный', 'kort', 'короткий', 'Vejen er meget lang.', 'Дорога очень длинная.', 'Filmen er kort.', 'Фильм короткий.', 'Про длину и про время. Et kort — также карта или открытка.'],
    ['adj', 'tyk', 'толстый', 'tynd', 'тонкий', 'Bogen er meget tyk.', 'Книга очень толстая.', 'Jeg har en tynd jakke på.', 'На мне тонкая куртка.', 'О человеке tyk звучит грубо; мягче — kraftig.'],
    ['adj', 'bred', 'широкий', 'smal', 'узкий', 'Gaden er bred.', 'Улица широкая.', 'Døren er smal.', 'Дверь узкая.'],
    ['adj', 'tung', 'тяжёлый', 'let', 'лёгкий по весу', 'Kufferten er tung.', 'Чемодан тяжёлый.', 'Tasken er let.', 'Сумка лёгкая.', 'Let значит и «нетрудный»: Det er let. Для «нетрудный» чаще говорят nem.'],
    ['adj', 'stærk', 'сильный', 'svag', 'слабый', 'Min bror er meget stærk.', 'Мой брат очень сильный.', 'Kaffen er for svag.', 'Кофе слишком слабый.'],
    ['adj', 'hård', 'твёрдый; жёсткий', 'blød', 'мягкий', 'Madrassen er hård.', 'Матрас жёсткий.', 'Puden er blød.', 'Подушка мягкая.'],
    ['adj', 'tør', 'сухой', 'våd', 'мокрый', 'Håndklædet er tørt.', 'Полотенце сухое.', 'Gulvet er vådt.', 'Пол мокрый.'],
    ['adj', 'varm', 'тёплый; горячий', 'kold', 'холодный', 'Suppen er varm.', 'Суп горячий.', 'Vandet er koldt.', 'Вода холодная.'],
    ['adj', 'stejl', 'крутой', 'flad', 'плоский; ровный', 'Bakken er meget stejl.', 'Холм очень крутой.', 'Danmark er et fladt land.', 'Дания — плоская страна.'],
    ['adj', 'skarp', 'острый', 'sløv', 'тупой', 'Kniven er skarp.', 'Нож острый.', 'Saksen er sløv.', 'Ножницы тупые.', 'Sløv про человека значит «вялый; заторможенный».'],
    ['adj', 'glat', 'скользкий; гладкий', 'ru', 'шершавый', 'Isen er glat.', 'Лёд скользкий.', 'Væggen er ru.', 'Стена шершавая.'],
    ['adj', 'fuld', 'полный', 'tom', 'пустой', 'Glasset er fuldt.', 'Стакан полный.', 'Flasken er tom.', 'Бутылка пустая.', 'Про человека fuld значит «пьяный»: Han er fuld. «Сытый» — mæt.'],
    ['adj', 'stram', 'тесный; тугой', 'løs', 'свободный; болтающийся', 'Bukserne er for stramme.', 'Брюки слишком тесные.', 'Trøjen er lidt løs.', 'Свитер немного свободный.'],
    ['adj', 'mange', 'много; многие', 'få', 'мало; немногие', 'Der er mange gæster.', 'Гостей много.', 'Der er få pladser tilbage.', 'Осталось мало мест.', 'Mange и få — для считаемого. Для вещества: meget / lidt.'],
    ['adj', 'meget', 'много; очень', 'lidt', 'немного', 'Jeg har meget arbejde.', 'У меня много работы.', 'Der er lidt mælk tilbage.', 'Молока осталось немного.', 'Meget и lidt — для вещества и степени. Для считаемого: mange / få.']
  ],
  character: [
    ['adj', 'glad', 'радостный; довольный', 'trist', 'грустный', 'Børnene er glade i dag.', 'Дети сегодня радостные.', 'Filmen er meget trist.', 'Фильм очень грустный.', 'Про настроение часто говорят: Jeg er ked af det — мне грустно и мне жаль.'],
    ['adj', 'rolig', 'спокойный', 'urolig', 'беспокойный', 'Havet er roligt i dag.', 'Сегодня море спокойное.', 'Jeg er lidt urolig.', 'Я немного встревожен.'],
    ['adj', 'flittig', 'прилежный', 'doven', 'ленивый', 'Eleven er meget flittig.', 'Ученик очень прилежный.', 'Katten er doven.', 'Кошка ленивая.'],
    ['adj', 'venlig', 'дружелюбный', 'uvenlig', 'недружелюбный', 'Naboen er altid venlig.', 'Сосед всегда дружелюбен.', 'Kunden var uvenlig.', 'Клиент был недружелюбен.'],
    ['adj', 'modig', 'смелый', 'bange', 'боязливый; испуганный', 'Pigen er meget modig.', 'Девочка очень смелая.', 'Hunden er bange for torden.', 'Собака боится грома.', 'Bange for... — бояться чего-то. Точная противоположность — fej «трусливый», но это слово резкое.'],
    ['adj', 'artig', 'послушный; воспитанный', 'uartig', 'непослушный', 'Drengen er artig i dag.', 'Мальчик сегодня послушный.', 'Hunden er uartig.', 'Собака непослушная.'],
    ['adj', 'tålmodig', 'терпеливый', 'utålmodig', 'нетерпеливый', 'Læreren er meget tålmodig.', 'Учитель очень терпеливый.', 'Jeg bliver utålmodig, når jeg venter.', 'Я теряю терпение, когда жду.'],
    ['adj', 'høflig', 'вежливый', 'uhøflig', 'невежливый', 'Servitricen er meget høflig.', 'Официантка очень вежлива.', 'Det er uhøfligt at afbryde.', 'Перебивать невежливо.'],
    ['adj', 'ærlig', 'честный', 'uærlig', 'нечестный', 'Hun er altid ærlig.', 'Она всегда честна.', 'Det er uærligt at tage pengene.', 'Брать эти деньги нечестно.'],
    ['adj', 'genert', 'застенчивый', 'udadvendt', 'общительный; открытый', 'Min datter er genert.', 'Моя дочь застенчива.', 'Han er meget udadvendt.', 'Он очень общительный.'],
    ['adj', 'tilfreds', 'довольный', 'utilfreds', 'недовольный', 'Kunden er tilfreds.', 'Клиент доволен.', 'Chefen er utilfreds med rapporten.', 'Начальник недоволен отчётом.'],
    ['adj', 'interesseret', 'заинтересованный', 'uinteresseret', 'незаинтересованный', 'Hun er interesseret i musik.', 'Она интересуется музыкой.', 'Han virker uinteresseret.', 'Он кажется незаинтересованным.'],
    ['adj', 'sulten', 'голодный', 'mæt', 'сытый', 'Jeg er meget sulten efter træning.', 'После тренировки я очень голоден.', 'Tak, jeg er helt mæt.', 'Спасибо, я совсем сыт.'],
    ['adj', 'træt', 'уставший', 'udhvilet', 'отдохнувший', 'Jeg er meget træt i dag.', 'Сегодня я очень устал.', 'Efter ferien var jeg udhvilet.', 'После отпуска я был отдохнувшим.'],
    ['adj', 'munter', 'весёлый', 'alvorlig', 'серьёзный', 'Hun er altid munter.', 'Она всегда весёлая.', 'Lægen så alvorlig ud.', 'Врач выглядел серьёзным.', 'Alvorlig также про болезнь и ошибку: en alvorlig fejl.'],
    ['adj', 'nysgerrig', 'любопытный', 'ligeglad', 'равнодушный', 'Børn er ofte nysgerrige.', 'Дети часто любопытны.', 'Han er ligeglad med reglerne.', 'Ему безразличны правила.'],
    ['adj', 'stille', 'тихий; молчаливый', 'snakkesalig', 'разговорчивый', 'Min kollega er stille.', 'Мой коллега тихий.', 'Min nabo er meget snakkesalig.', 'Мой сосед очень разговорчивый.'],
    ['adj', 'optimistisk', 'оптимистичный', 'pessimistisk', 'пессимистичный', 'Hun er optimistisk.', 'Она оптимистична.', 'Han er lidt pessimistisk.', 'Он немного пессимистичен.'],
    ['adj', 'heldig', 'везучий', 'uheldig', 'невезучий; неудачный', 'Jeg var heldig med vejret.', 'Мне повезло с погодой.', 'Det var uheldigt.', 'Это было неудачно.'],
    ['adj', 'tryg', 'спокойный и защищённый', 'utryg', 'тревожный; небезопасный', 'Jeg føler mig tryg her.', 'Я чувствую себя здесь спокойно и безопасно.', 'Hun føler sig utryg om natten.', 'Ночью ей неспокойно.']
  ],
  colors: [
    ['adj', 'sort', 'чёрный', 'hvid', 'белый', 'Katten er sort.', 'Кошка чёрная.', 'Sneen er hvid.', 'Снег белый.'],
    ['adj', 'lys', 'светлый', 'mørk', 'тёмный', 'Stuen er lys.', 'Гостиная светлая.', 'Gaden er mørk om natten.', 'Ночью улица тёмная.', 'Lys и mørk описывают освещение и оттенок: lysegrøn, mørkegrøn.'],
    ['adj', 'lyseblå', 'светло-синий', 'mørkeblå', 'тёмно-синий', 'Jeg har en lyseblå trøje.', 'У меня светло-синий свитер.', 'Bilen er mørkeblå.', 'Машина тёмно-синяя.'],
    ['adj', 'mat', 'матовый', 'blank', 'блестящий', 'Overfladen er mat.', 'Поверхность матовая.', 'Skoene er blanke.', 'Туфли блестят.'],
    ['adj', 'farverig', 'разноцветный', 'ensfarvet', 'однотонный', 'Tæppet er farverigt.', 'Ковёр разноцветный.', 'Kjolen er ensfarvet.', 'Платье однотонное.'],
    ['adj', 'lyshåret', 'светловолосый', 'mørkhåret', 'темноволосый', 'Hun er lyshåret.', 'Она светловолосая.', 'Han er mørkhåret.', 'Он темноволосый.'],
    ['adj', 'gennemsigtig', 'прозрачный', 'uigennemsigtig', 'непрозрачный', 'Glasset er gennemsigtigt.', 'Стекло прозрачное.', 'Folien er uigennemsigtig.', 'Плёнка непрозрачная.'],
    ['adj', 'bleg', 'бледный', 'solbrændt', 'загорелый', 'Hun er bleg efter sygdommen.', 'После болезни она бледная.', 'Han er solbrændt efter ferien.', 'После отпуска он загорелый.'],
    ['adj', 'solrig', 'солнечный', 'overskyet', 'пасмурный', 'Det er en solrig dag.', 'Сегодня солнечный день.', 'Det er overskyet i dag.', 'Сегодня пасмурно.'],
    ['noun', 'en sol', 'солнце', 'en skygge', 'тень', 'Vi sidder i solen.', 'Мы сидим на солнце.', 'Hunden ligger i skyggen.', 'Собака лежит в тени.'],
    ['verb', 'at tænde', 'включать; зажигать', 'at slukke', 'выключать; гасить', 'Jeg tænder lyset.', 'Я включаю свет.', 'Jeg slukker lyset.', 'Я выключаю свет.']
  ],
  time: [
    ['adj', 'tidlig', 'ранний', 'sen', 'поздний', 'Vi tager det tidlige tog.', 'Мы едем ранним поездом.', 'Vi tager det sene tog.', 'Мы едем поздним поездом.', 'Наречия: tidligt и sent. Komme tidligt — прийти рано; komme for sent — опоздать.'],
    ['adv', 'altid', 'всегда', 'aldrig', 'никогда', 'Han kommer altid til tiden.', 'Он всегда приходит вовремя.', 'Hun kommer aldrig for sent.', 'Она никогда не опаздывает.'],
    ['adv', 'ofte', 'часто', 'sjældent', 'редко', 'Vi spiser ofte ude.', 'Мы часто едим вне дома.', 'Jeg ser sjældent tv.', 'Я редко смотрю телевизор.'],
    ['adv', 'før', 'до; перед', 'efter', 'после', 'Vi spiser før filmen.', 'Мы едим перед фильмом.', 'Vi går en tur efter aftensmaden.', 'Мы гуляем после ужина.'],
    ['adv', 'først', 'сначала', 'til sidst', 'в конце; под конец', 'Først skærer jeg løgene.', 'Сначала я режу лук.', 'Til sidst tilsætter jeg salt.', 'В конце я добавляю соль.'],
    ['adv', 'i går', 'вчера', 'i morgen', 'завтра', 'I går regnede det.', 'Вчера шёл дождь.', 'I morgen skal jeg arbejde.', 'Завтра мне нужно работать.'],
    ['noun', 'en dag', 'день', 'en nat', 'ночь', 'Om dagen arbejder jeg.', 'Днём я работаю.', 'Om natten sover jeg.', 'Ночью я сплю.'],
    ['noun', 'en morgen', 'утро', 'en aften', 'вечер', 'Om morgenen læser jeg avisen.', 'Утром я читаю газету.', 'Om aftenen ser vi tv.', 'Вечером мы смотрим телевизор.'],
    ['adv', 'nu', 'сейчас', 'senere', 'позже', 'Jeg har tid nu.', 'Сейчас у меня есть время.', 'Vi snakker sammen senere.', 'Мы поговорим позже.'],
    ['adj', 'hurtig', 'быстрый', 'langsom', 'медленный', 'Toget er hurtigt.', 'Поезд быстрый.', 'Forbindelsen er langsom.', 'Соединение медленное.'],
    ['adv', 'snart', 'скоро', 'for længe siden', 'давно', 'Vi ses snart.', 'Скоро увидимся.', 'Det skete for længe siden.', 'Это случилось давно.'],
    ['adv', 'stadig', 'всё ещё', 'ikke længere', 'больше не', 'Han bor stadig i Aarhus.', 'Он всё ещё живёт в Орхусе.', 'Han arbejder ikke længere her.', 'Он больше здесь не работает.'],
    ['adv', 'allerede', 'уже', 'endnu ikke', 'ещё не', 'Toget er allerede kørt.', 'Поезд уже ушёл.', 'Jeg har ikke spist endnu.', 'Я ещё не ел.', 'В предложении порядок другой: ikke ... endnu.'],
    ['noun', 'en fortid', 'прошлое', 'en fremtid', 'будущее', 'Vi kan ikke ændre fortiden.', 'Мы не можем изменить прошлое.', 'Fremtiden er uvis.', 'Будущее неопределённо.'],
    ['adj', 'midlertidig', 'временный', 'permanent', 'постоянный', 'Aftalen er midlertidig.', 'Договорённость временная.', 'Løsningen er permanent.', 'Решение постоянное.'],
    ['adj', 'pludselig', 'внезапный', 'gradvis', 'постепенный', 'Ændringen var pludselig.', 'Изменение было внезапным.', 'Forbedringen var gradvis.', 'Улучшение было постепенным.'],
    ['adv', 'længe', 'долго', 'kort tid', 'недолго', 'Vi ventede længe.', 'Мы долго ждали.', 'Pausen varer kun kort tid.', 'Перерыв длится недолго.'],
    ['noun', 'en hverdag', 'будний день', 'en weekend', 'выходные', 'På hverdage arbejder jeg.', 'В будни я работаю.', 'I weekenden sover jeg længe.', 'В выходные я долго сплю.'],
    ['noun', 'en sommer', 'лето', 'en vinter', 'зима', 'Om sommeren er der lyst længe.', 'Летом долго светло.', 'Om vinteren er det koldt.', 'Зимой холодно.'],
    ['noun', 'et forår', 'весна', 'et efterår', 'осень', 'Om foråret blomstrer træerne.', 'Весной деревья цветут.', 'Om efteråret falder bladene.', 'Осенью листья опадают.']
  ],
  state: [
    ['adj', 'ny', 'новый', 'gammel', 'старый', 'Jeg har en ny telefon.', 'У меня новый телефон.', 'Det er en gammel bil.', 'Это старая машина.', 'Gammel — и про вещи, и про людей. «Молодой» — ung.'],
    ['adj', 'nem', 'лёгкий; нетрудный', 'svær', 'трудный', 'Opgaven er nem.', 'Задание нетрудное.', 'Teksten er svær.', 'Текст трудный.', 'Нетрудно — также let, трудно — также vanskelig.'],
    ['adj', 'billig', 'дешёвый', 'dyr', 'дорогой', 'Billetten er billig.', 'Билет дешёвый.', 'Taxaen er dyr.', 'Такси дорогое.', 'Et dyr — животное; dyr как прилагательное значит «дорогой».'],
    ['adj', 'ren', 'чистый', 'beskidt', 'грязный', 'Gulvet er rent.', 'Пол чистый.', 'Dine sko er beskidte.', 'Твоя обувь грязная.'],
    ['adj', 'rask', 'здоровый; выздоровевший', 'syg', 'больной', 'Jeg er rask igen.', 'Я снова здоров.', 'Min søn er syg i dag.', 'Мой сын сегодня болен.'],
    ['adj', 'sund', 'полезный для здоровья', 'usund', 'вредный для здоровья', 'Havregrød er sund mad.', 'Овсяная каша — здоровая еда.', 'Det er usundt at sidde hele dagen.', 'Весь день сидеть вредно.'],
    ['adj', 'rig', 'богатый', 'fattig', 'бедный', 'Han er en rig mand.', 'Он богатый человек.', 'Familien er meget fattig.', 'Семья очень бедная.'],
    ['adj', 'sikker', 'безопасный', 'farlig', 'опасный', 'Området er sikkert.', 'Район безопасный.', 'Krydset er farligt.', 'Перекрёсток опасный.', 'Sikker значит и «уверенный»: Jeg er sikker på det.'],
    ['adj', 'åben', 'открытый', 'lukket', 'закрытый', 'Butikken er åben.', 'Магазин открыт.', 'Banken er lukket.', 'Банк закрыт.'],
    ['adj', 'rigtig', 'правильный', 'forkert', 'неправильный', 'Svaret er rigtigt.', 'Ответ правильный.', 'Adressen er forkert.', 'Адрес неправильный.'],
    ['adj', 'god', 'хороший', 'dårlig', 'плохой', 'Det er en god idé.', 'Это хорошая идея.', 'Jeg har en dårlig dag.', 'У меня плохой день.', 'Сравнение: god — bedre — bedst; dårlig — værre — værst.'],
    ['adj', 'smuk', 'красивый', 'grim', 'некрасивый', 'Byen er smuk.', 'Город красивый.', 'Bygningen er grim.', 'Здание некрасивое.'],
    ['adj', 'sjov', 'забавный; весёлый', 'kedelig', 'скучный', 'Filmen var sjov.', 'Фильм был забавным.', 'Mødet var kedeligt.', 'Совещание было скучным.'],
    ['adj', 'klar', 'ясный; понятный', 'uklar', 'неясный', 'Forklaringen er klar.', 'Объяснение понятное.', 'Svaret er uklart.', 'Ответ неясный.'],
    ['adj', 'enkel', 'простой', 'kompliceret', 'сложный', 'Reglen er enkel.', 'Правило простое.', 'Situationen er kompliceret.', 'Ситуация сложная.'],
    ['adj', 'vigtig', 'важный', 'uvæsentlig', 'несущественный', 'Det er et vigtigt møde.', 'Это важная встреча.', 'Det er en uvæsentlig detalje.', 'Это несущественная деталь.'],
    ['adj', 'mulig', 'возможный', 'umulig', 'невозможный', 'Det er muligt at betale med kort.', 'Можно заплатить картой.', 'Det er umuligt at komme i dag.', 'Прийти сегодня невозможно.'],
    ['adj', 'nødvendig', 'необходимый', 'unødvendig', 'ненужный', 'Det er nødvendigt at bestille tid.', 'Нужно записаться на приём.', 'Det er unødvendigt at ringe.', 'Звонить не нужно.'],
    ['adj', 'ledig', 'свободный', 'optaget', 'занятый', 'Bordet er ledigt.', 'Столик свободен.', 'Toilettet er optaget.', 'Туалет занят.'],
    ['adj', 'offentlig', 'общественный; государственный', 'privat', 'частный', 'Vi tager offentlig transport.', 'Мы едем общественным транспортом.', 'Det er en privat skole.', 'Это частная школа.'],
    ['adj', 'ens', 'одинаковый', 'forskellig', 'разный', 'Tvillingerne er næsten ens.', 'Близнецы почти одинаковы.', 'Vores meninger er forskellige.', 'У нас разные мнения.'],
    ['adj', 'lovlig', 'законный', 'ulovlig', 'незаконный', 'Det er lovligt at cykle her.', 'Ездить здесь на велосипеде законно.', 'Det er ulovligt at parkere her.', 'Парковаться здесь незаконно.'],
    ['adj', 'ægte', 'настоящий', 'falsk', 'фальшивый', 'Guldet er ægte.', 'Золото настоящее.', 'Sedlen er falsk.', 'Банкнота фальшивая.'],
    ['adj', 'levende', 'живой', 'død', 'мёртвый', 'Dansk er et levende sprog.', 'Датский — живой язык.', 'Latin er et dødt sprog.', 'Латынь — мёртвый язык.'],
    ['adj', 'frivillig', 'добровольный', 'obligatorisk', 'обязательный', 'Kurset er frivilligt.', 'Курс добровольный.', 'Mødet er obligatorisk.', 'Собрание обязательное.'],
    ['adv', 'ja', 'да', 'nej', 'нет', 'Ja, tak.', 'Да, спасибо.', 'Nej, tak.', 'Нет, спасибо.']
  ],
  motion: [
    ['adv', 'op', 'вверх', 'ned', 'вниз', 'Elevatoren går op.', 'Лифт едет вверх.', 'Elevatoren går ned.', 'Лифт едет вниз.', 'С предлогом: op ad trappen — вверх по лестнице, ned ad trappen — вниз по лестнице.'],
    ['adv', 'ind', 'внутрь', 'ud', 'наружу', 'Vi går ind i butikken.', 'Мы заходим в магазин.', 'Vi går ud af butikken.', 'Мы выходим из магазина.', 'С предлогом: ind i — внутрь, ud af — из.'],
    ['adv', 'frem', 'вперёд', 'tilbage', 'назад', 'Tag to skridt frem.', 'Сделай два шага вперёд.', 'Tag to skridt tilbage.', 'Сделай два шага назад.'],
    ['adv', 'højre', 'правый; направо', 'venstre', 'левый; налево', 'Drej til højre.', 'Поверни направо.', 'Drej til venstre.', 'Поверни налево.'],
    ['adv', 'foran', 'перед; впереди', 'bag', 'за; позади', 'Bilen holder foran huset.', 'Машина стоит перед домом.', 'Haven ligger bag huset.', 'Сад находится за домом.'],
    ['adv', 'over', 'над', 'under', 'под', 'Lampen hænger over bordet.', 'Лампа висит над столом.', 'Hunden ligger under bordet.', 'Собака лежит под столом.'],
    ['adv', 'her', 'здесь', 'der', 'там', 'Jeg bor her.', 'Я живу здесь.', 'Han bor der.', 'Он живёт там.'],
    ['adv', 'indenfor', 'внутри; в помещении', 'udenfor', 'снаружи; на улице', 'Børnene leger indenfor.', 'Дети играют в помещении.', 'Børnene leger udenfor.', 'Дети играют на улице.'],
    ['adv', 'til', 'в; к; до', 'fra', 'из; от', 'Toget kører til Odense.', 'Поезд едет в Оденсе.', 'Toget kommer fra København.', 'Поезд приходит из Копенгагена.'],
    ['adv', 'tæt på', 'близко', 'langt væk', 'далеко', 'Butikken ligger tæt på.', 'Магазин находится близко.', 'Stationen ligger langt væk.', 'Вокзал находится далеко.'],
    ['adv', 'øst', 'восток', 'vest', 'запад', 'Solen står op i øst.', 'Солнце встаёт на востоке.', 'Solen går ned i vest.', 'Солнце садится на западе.'],
    ['adv', 'nord', 'север', 'syd', 'юг', 'Skagen ligger nord for Aalborg.', 'Скаген находится к северу от Ольборга.', 'Tyskland ligger syd for Danmark.', 'Германия находится к югу от Дании.'],
    ['noun', 'en indgang', 'вход', 'en udgang', 'выход', 'Indgangen er til venstre.', 'Вход слева.', 'Udgangen er bagved.', 'Выход сзади.'],
    ['adv', 'ovenpå', 'наверху; этажом выше', 'nedenunder', 'внизу; этажом ниже', 'Naboen bor ovenpå.', 'Сосед живёт этажом выше.', 'Vi bor nedenunder.', 'Мы живём этажом ниже.'],
    ['verb', 'at åbne', 'открывать', 'at lukke', 'закрывать', 'Jeg åbner vinduet.', 'Я открываю окно.', 'Kan du lukke døren?', 'Можешь закрыть дверь?'],
    ['verb', 'at ankomme', 'прибывать', 'at afgå', 'отправляться', 'Toget ankommer klokken otte.', 'Поезд прибывает в восемь часов.', 'Toget afgår klokken ni.', 'Поезд отправляется в девять часов.'],
    ['verb', 'at stige', 'расти; подниматься', 'at falde', 'падать; снижаться', 'Priserne stiger.', 'Цены растут.', 'Temperaturen falder.', 'Температура падает.'],
    ['verb', 'at skubbe', 'толкать', 'at trække', 'тянуть', 'Du skal skubbe døren.', 'Дверь нужно толкать.', 'Du skal trække døren.', 'Дверь нужно тянуть.'],
    ['verb', 'at løfte', 'поднимать', 'at sænke', 'опускать', 'Jeg løfter armen.', 'Я поднимаю руку.', 'Jeg sænker armen.', 'Я опускаю руку.'],
    ['verb', 'at komme', 'приходить', 'at gå', 'уходить; идти', 'Jeg kommer klokken fem.', 'Я приду в пять.', 'Jeg går klokken seks.', 'Я ухожу в шесть.']
  ],
  verbs: [
    ['verb', 'at købe', 'покупать', 'at sælge', 'продавать', 'Jeg vil købe en cykel.', 'Я хочу купить велосипед.', 'Han vil sælge sin bil.', 'Он хочет продать свою машину.'],
    ['verb', 'at give', 'давать', 'at tage', 'брать', 'Jeg giver dig bogen.', 'Я даю тебе книгу.', 'Du må gerne tage en kage.', 'Можешь взять пирожное.', 'Что-то получить от кого-то — modtage: Jeg modtager en pakke.'],
    ['verb', 'at begynde', 'начинать; начинаться', 'at slutte', 'заканчивать; заканчиваться', 'Filmen begynder klokken otte.', 'Фильм начинается в восемь.', 'Skolen slutter klokken tre.', 'Школа заканчивается в три.'],
    ['verb', 'at huske', 'помнить', 'at glemme', 'забывать', 'Jeg husker din adresse.', 'Я помню твой адрес.', 'Jeg glemmer ofte nøglerne.', 'Я часто забываю ключи.'],
    ['verb', 'at lykkes', 'удаваться', 'at mislykkes', 'не удаваться', 'Forsøget lykkedes.', 'Попытка удалась.', 'Planen mislykkedes.', 'План не удался.', 'Оба глагола заканчиваются на -s: lykkes — lykkedes, mislykkes — mislykkedes.'],
    ['verb', 'at tillade', 'разрешать', 'at forbyde', 'запрещать', 'Skolen tillader mobiltelefoner i frikvarteret.', 'Школа разрешает мобильные телефоны на перемене.', 'Reglerne forbyder rygning her.', 'Правила запрещают здесь курение.'],
    ['verb', 'at vinde', 'выигрывать', 'at tabe', 'проигрывать; ронять', 'Holdet vinder kampen.', 'Команда выигрывает матч.', 'Holdet taber kampen.', 'Команда проигрывает матч.', 'Потерять вещь — miste. Tabe также значит «уронить».'],
    ['verb', 'at finde', 'находить', 'at miste', 'терять', 'Jeg finder nøglen.', 'Я нахожу ключ.', 'Jeg mister ofte mine handsker.', 'Я часто теряю перчатки.'],
    ['verb', 'at spørge', 'спрашивать', 'at svare', 'отвечать', 'Jeg vil spørge om vejen.', 'Я хочу спросить дорогу.', 'Han svarer ikke.', 'Он не отвечает.'],
    ['verb', 'at elske', 'любить', 'at hade', 'ненавидеть', 'Jeg elsker sommeren.', 'Я люблю лето.', 'Jeg hader at vente.', 'Я ненавижу ждать.', 'Для спокойного «нравится» говорят kan lide.'],
    ['verb', 'at sende', 'отправлять', 'at modtage', 'получать', 'Jeg sender en mail.', 'Я отправляю письмо по электронной почте.', 'Jeg modtager mange mails.', 'Я получаю много писем.'],
    ['verb', 'at tale', 'говорить', 'at lytte', 'слушать', 'Han taler for meget.', 'Он слишком много говорит.', 'Jeg lytter til radioen.', 'Я слушаю радио.'],
    ['verb', 'at vågne', 'просыпаться', 'at falde i søvn', 'засыпать', 'Jeg vågner klokken seks.', 'Я просыпаюсь в шесть.', 'Barnet falder hurtigt i søvn.', 'Ребёнок быстро засыпает.'],
    ['verb', 'at stå op', 'вставать с постели', 'at lægge sig', 'ложиться', 'Jeg står op klokken syv.', 'Я встаю в семь.', 'Jeg lægger mig klokken elleve.', 'Я ложусь в одиннадцать.'],
    ['verb', 'at sætte sig', 'садиться', 'at rejse sig', 'вставать; подниматься', 'Jeg sætter mig ved vinduet.', 'Я сажусь у окна.', 'Jeg rejser mig, når hun kommer ind.', 'Я встаю, когда она входит.'],
    ['verb', 'at tage på', 'надевать', 'at tage af', 'снимать', 'Jeg tager jakken på.', 'Я надеваю куртку.', 'Jeg tager skoene af.', 'Я снимаю обувь.'],
    ['verb', 'at fylde', 'наполнять', 'at tømme', 'опустошать', 'Jeg fylder flasken med vand.', 'Я наполняю бутылку водой.', 'Han tømmer postkassen.', 'Он достаёт всё из почтового ящика.'],
    ['verb', 'at stoppe', 'останавливаться; прекращать', 'at fortsætte', 'продолжать', 'Regnen stopper.', 'Дождь прекращается.', 'Vi fortsætter i morgen.', 'Мы продолжим завтра.'],
    ['verb', 'at acceptere', 'принимать; соглашаться', 'at afvise', 'отклонять', 'Jeg accepterer tilbuddet.', 'Я принимаю предложение.', 'Hun afviser forslaget.', 'Она отклоняет предложение.'],
    ['verb', 'at samle', 'собирать', 'at sprede', 'разбрасывать', 'Jeg samler tallerkenerne.', 'Я собираю тарелки.', 'Vinden spreder bladene.', 'Ветер разбрасывает листья.'],
    ['verb', 'at bygge', 'строить', 'at rive ned', 'сносить', 'De bygger en ny skole.', 'Они строят новую школу.', 'De river den gamle skole ned.', 'Они сносят старую школу.'],
    ['verb', 'at låne', 'брать в долг; брать на время', 'at låne ud', 'давать в долг; выдавать', 'Jeg låner en bog på biblioteket.', 'Я беру книгу в библиотеке.', 'Biblioteket låner bøger ud.', 'Библиотека выдаёт книги.'],
    ['verb', 'at tilføje', 'добавлять', 'at fjerne', 'убирать; удалять', 'Jeg tilføjer lidt salt.', 'Я добавляю немного соли.', 'Jeg fjerner pletten.', 'Я убираю пятно.'],
    ['verb', 'at stole på', 'доверять', 'at tvivle på', 'сомневаться', 'Jeg stoler på dig.', 'Я доверяю тебе.', 'Jeg tvivler på det.', 'Я сомневаюсь в этом.'],
    ['verb', 'at bestå', 'сдавать успешно', 'at dumpe', 'проваливать', 'Jeg består prøven.', 'Я сдаю экзамен.', 'Han dumper til eksamen.', 'Он проваливает экзамен.', 'Dumpe — разговорное слово; нейтрально: ikke bestå.']
  ],
  nouns: [
    ['noun', 'et venskab', 'дружба', 'et fjendskab', 'вражда', 'Vores venskab er mange år gammelt.', 'Нашей дружбе много лет.', 'Fjendskabet varede i mange år.', 'Вражда длилась много лет.'],
    ['noun', 'en fordel', 'преимущество', 'en ulempe', 'недостаток', 'Det er en fordel at kunne dansk.', 'Знание датского — преимущество.', 'En ulempe er den høje pris.', 'Недостаток — высокая цена.'],
    ['noun', 'en sandhed', 'правда', 'en løgn', 'ложь', 'Jeg vil kende sandheden.', 'Я хочу знать правду.', 'Det var en løgn.', 'Это была ложь.'],
    ['noun', 'en begyndelse', 'начало', 'en slutning', 'конец; окончание', 'I begyndelsen var det svært.', 'Сначала было трудно.', 'Filmen har en god slutning.', 'У фильма хороший конец.'],
    ['noun', 'et flertal', 'большинство', 'et mindretal', 'меньшинство', 'Et flertal stemte for forslaget.', 'Большинство проголосовало за предложение.', 'Mindretallet var imod.', 'Меньшинство было против.'],
    ['noun', 'en krig', 'война', 'en fred', 'мир', 'Krigen varede i fem år.', 'Война длилась пять лет.', 'Alle ønsker fred.', 'Все хотят мира.'],
    ['noun', 'en sygdom', 'болезнь', 'en sundhed', 'здоровье', 'Sygdom kan ramme alle.', 'Болезнь может коснуться каждого.', 'Sundhed er det vigtigste.', 'Здоровье — самое важное.'],
    ['noun', 'en glæde', 'радость', 'en sorg', 'горе; скорбь', 'Hun græder af glæde.', 'Она плачет от радости.', 'Familien er i sorg.', 'Семья скорбит.'],
    ['noun', 'en succes', 'успех', 'et nederlag', 'поражение', 'Festen blev en succes.', 'Праздник удался.', 'Holdet led et nederlag.', 'Команда потерпела поражение.'],
    ['noun', 'et lys', 'свет; свеча', 'et mørke', 'темнота', 'Der er lys i vinduet.', 'В окне горит свет.', 'Børnene er bange for mørket.', 'Дети боятся темноты.'],
    ['noun', 'en larm', 'шум', 'en stilhed', 'тишина', 'Jeg kan ikke sove for larm.', 'Я не могу уснуть из-за шума.', 'Der er stilhed på biblioteket.', 'В библиотеке тишина.'],
    ['noun', 'et spørgsmål', 'вопрос', 'et svar', 'ответ', 'Jeg har et spørgsmål.', 'У меня есть вопрос.', 'Jeg kender svaret.', 'Я знаю ответ.'],
    ['noun', 'en ankomst', 'прибытие', 'en afrejse', 'отъезд', 'Ankomsten er klokken ti.', 'Прибытие в десять часов.', 'Afrejsen er klokken otte.', 'Отъезд в восемь часов.'],
    ['noun', 'en mand', 'мужчина; муж', 'en kvinde', 'женщина', 'Manden står ved døren.', 'Мужчина стоит у двери.', 'Kvinden læser en bog.', 'Женщина читает книгу.'],
    ['noun', 'en dreng', 'мальчик', 'en pige', 'девочка', 'Drengen spiller fodbold.', 'Мальчик играет в футбол.', 'Pigen tegner.', 'Девочка рисует.'],
    ['noun', 'et barn', 'ребёнок', 'en voksen', 'взрослый', 'Barnet leger i haven.', 'Ребёнок играет в саду.', 'En voksen betaler fuld pris.', 'Взрослый платит полную цену.'],
    ['noun', 'en mor', 'мама', 'en far', 'папа', 'Min mor arbejder på et hospital.', 'Моя мама работает в больнице.', 'Min far kører bus.', 'Мой папа водит автобус.'],
    ['noun', 'en søn', 'сын', 'en datter', 'дочь', 'Min søn går i skole.', 'Мой сын ходит в школу.', 'Min datter studerer i Aarhus.', 'Моя дочь учится в Орхусе.'],
    ['noun', 'en bror', 'брат', 'en søster', 'сестра', 'Min bror bor i København.', 'Мой брат живёт в Копенгагене.', 'Min søster er læge.', 'Моя сестра — врач.'],
    ['noun', 'en køber', 'покупатель', 'en sælger', 'продавец', 'Køberen betaler i dag.', 'Покупатель платит сегодня.', 'Sælgeren sender varen.', 'Продавец отправляет товар.'],
    ['noun', 'et arbejde', 'работа', 'en fritid', 'свободное время', 'Arbejdet begynder klokken otte.', 'Работа начинается в восемь.', 'I min fritid cykler jeg.', 'В свободное время я езжу на велосипеде.'],
    ['noun', 'et problem', 'проблема', 'en løsning', 'решение', 'Der er et problem.', 'Есть проблема.', 'Vi søger en løsning.', 'Мы ищем решение.'],
    ['noun', 'en tilladelse', 'разрешение', 'et forbud', 'запрет', 'Du skal have tilladelse.', 'Тебе нужно разрешение.', 'Der er forbud mod parkering her.', 'Здесь запрещена парковка.'],
    ['noun', 'en by', 'город', 'et land', 'сельская местность; страна', 'Vi bor i byen.', 'Мы живём в городе.', 'Mine forældre bor på landet.', 'Мои родители живут в сельской местности.', 'På landet — «в сельской местности»; et land также значит «страна»: Danmark er et land.']
  ]
};

const slug = word => word.toLowerCase().replaceAll('æ', 'ae').replaceAll('ø', 'oe').replaceAll('å', 'aa').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
function word(full, ru, pos) {
  const match = /^(en|et|at) (.+)$/.exec(full);
  const prefix = match && ((pos === 'noun' && match[1] !== 'at') || (pos === 'verb' && match[1] === 'at')) ? match[1] : '';
  const lemma = prefix ? match[2] : full;
  return {
    da: full, lemma, ru,
    ...(prefix && pos === 'noun' ? {article: prefix} : {}),
    ...(prefix && pos === 'verb' ? {inf: prefix} : {}),
    ...(sound[lemma]?.say ? {say: sound[lemma].say} : {}),
    ...(sound[lemma]?.stod ? {stod: true} : {})
  };
}
export const antonymPairs = antonymThemes.flatMap(theme => rows[theme.id].map(([pos, a, aRu, b, bRu, exampleA, exampleARu, exampleB, exampleBRu, note = '']) => {
  const left = word(a, aRu, pos), right = word(b, bRu, pos);
  return {
    id: `ant-${slug(left.lemma)}-${slug(right.lemma)}`, theme: theme.id, category: theme.id, pos, a: left, b: right,
    exampleA: {da: exampleA, ru: exampleARu}, exampleB: {da: exampleB, ru: exampleBRu}, note
  };
}));
