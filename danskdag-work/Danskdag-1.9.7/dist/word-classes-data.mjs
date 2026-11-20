export const wordClasses = [
  {
    id: 'noun',
    title: 'Substantiver',
    alias: 'Navneord',
    ru: 'Существительные',
    level: 'A1',
    cue: 'Кто? Что? · Hvem? Hvad?',
    summary: 'Называют людей, животных, предметы, вещества и понятия: en lærer, et hus, vand, glæde. Подсказка: у многих существительных можно указать род с помощью en или et.',
    forms: 'Род запоминаем со словом: en bog, et hus. Меняются число и определённость: en bog → bogen → bøger → bøgerne. Множественное число бывает нерегулярным: et barn → børn. Обычные существительные пишутся со строчной буквы.',
    contrast: 'Смотри на контекст: en leder — руководитель, но hun leder — она ищет. En fyr — парень, а at fyre — топить или увольнять; это разные слова. Не выбирай часть речи только по знакомому переводу или окончанию.',
    sources: [
      { label: 'Sproget.dk · substantiver', url: 'https://sproget.dk/typiske-problemer/substantiver-navneord/' },
      { label: 'Sproget.dk · ordklasser', url: 'https://sproget.dk/typiske-problemer/ordklasser/' }
    ],
    examples: [
      { id: 'class-noun-house', target: 'huset', da: 'Vi ser huset.', ru: 'Мы видим дом.', note: 'Huset называет предмет: дом. Это определённая форма существительного et hus; окончание -et не делает всё слово артиклем.' },
      { id: 'class-noun-leader', target: 'leder', da: 'Hun er leder på en skole.', ru: 'Она руководитель в школе.', note: 'Leder называет человека по его работе. Здесь это существительное, хотя в другой фразе leder может быть глаголом.' },
      { id: 'class-noun-guy', target: 'fyr', da: 'Jeg kender en rar fyr.', ru: 'Я знаю приятного парня.', note: 'Fyr называет человека. En rar fyr — группа существительного: артикль + прилагательное + существительное.' },
      { id: 'class-noun-children', target: 'børn', da: 'Der leger tre børn i haven.', ru: 'В саду играют трое детей.', note: 'Børn называет людей и является множественным числом от et barn. У существительного не обязательно есть окончание -er.' }
    ]
  },
  {
    id: 'verb',
    title: 'Verber',
    alias: 'Udsagnsord',
    ru: 'Глаголы',
    level: 'A1',
    cue: 'Что делает? Что происходит? · Hvad sker der?',
    summary: 'Обозначают действие, событие или состояние: spise, komme, være. Не все глаголы описывают движение: er («есть, является») и bor («живёт») тоже глаголы.',
    forms: 'Учим основные формы: at spise → spiser → spiste → har spist. В настоящем времени часто добавляется -r; есть исключения: være → er. Форма не меняется по лицам: jeg spiser, du spiser, vi spiser. После kan, skal, vil инфинитив обычно стоит без at.',
    contrast: 'Не путай инфинитив spise с настоящим временем spiser. В at spise слово spise — глагол, а at — показатель инфинитива. В jeg ved, at du kommer слово at уже союз: оно вводит целое придаточное предложение.',
    sources: [
      { label: 'Sproget.dk · verber', url: 'https://sproget.dk/typiske-problemer/verber-udsagnord/' },
      { label: 'Den Danske Ordbog · at', url: 'https://ordnet.dk/ddo/ordbog/at' }
    ],
    examples: [
      { id: 'class-verb-eat', target: 'spiser', da: 'Vi spiser morgenmad sammen.', ru: 'Мы завтракаем вместе.', note: 'Spiser сообщает, что мы делаем. Это настоящее время глагола spise.' },
      { id: 'class-verb-be', target: 'er', da: 'Kaffen er varm.', ru: 'Кофе горячий.', note: 'Er связывает kaffen с его признаком varm. Это форма глагола være, хотя по-русски отдельное слово «есть» здесь обычно не нужно.' },
      { id: 'class-verb-look', target: 'leder', da: 'Hun leder efter sin telefon.', ru: 'Она ищет свой телефон.', note: 'Leder обозначает действие: ищет. Здесь это настоящее время lede; сравни с существительным en leder — руководитель.' },
      { id: 'class-verb-heat', target: 'fyre', da: 'Det er dyrt at fyre med gas.', ru: 'Отопление газом обходится дорого.', note: 'Fyre означает «топить» и стоит в инфинитиве после at. Существительное en fyr («парень») принадлежит к другой части речи.' }
    ]
  },
  {
    id: 'adjective',
    title: 'Adjektiver',
    alias: 'Tillægsord',
    ru: 'Прилагательные',
    level: 'A1',
    cue: 'Какой? Какая? Какое? · Hvordan er den/det?',
    summary: 'Описывают признак человека или предмета: en hurtig bil, et rødt æble. Могут стоять перед существительным или после глагола: bilen er hurtig.',
    forms: 'Обычно согласуются с существительным: en rød bil, et rødt hus, røde biler, den røde bil. Частые окончания: -t для et-слов и -e во множественном числе и определённой форме. Есть исключения: lille → små. Степени сравнения: stor → større → størst.',
    contrast: 'Не забывай согласование: et rødt hus, не et rød hus. Окончание -t само по себе не означает «наречие»: в et hurtigt tog это прилагательное. В hun løber hurtigt оно употреблено как обстоятельство; по классификации Sproget.dk это прилагательное в наречном употреблении.',
    sources: [
      { label: 'Sproget.dk · adjektiver', url: 'https://sproget.dk/typiske-problemer/adjektiver-tillaegsord/' },
      { label: 'Sproget.dk · ordklasse og funktion', url: 'https://sproget.dk/typiske-problemer/ordklasser/' }
    ],
    examples: [
      { id: 'class-adjective-fast', target: 'hurtig', da: 'Hun har en hurtig cykel.', ru: 'У неё быстрый велосипед.', note: 'Hurtig описывает cykel: какой велосипед? Быстрый. Форма без -t согласуется с en cykel.' },
      { id: 'class-adjective-red', target: 'rødt', da: 'Jeg køber et rødt æble.', ru: 'Я покупаю красное яблоко.', note: 'Rødt описывает æble. Окончание -t связано с родом: et æble.' },
      { id: 'class-adjective-good', target: 'gode', da: 'Vi har gode naboer.', ru: 'У нас хорошие соседи.', note: 'Gode описывает naboer. Окончание -e соответствует множественному числу.' },
      { id: 'class-adjective-fast-train', target: 'hurtigt', da: 'Vi tager et hurtigt tog.', ru: 'Мы едем на быстром поезде.', note: 'Hurtigt описывает существительное tog, поэтому это прилагательное. Оно имеет -t, потому что говорят et tog.' }
    ]
  },
  {
    id: 'adverb',
    title: 'Adverbier',
    alias: 'Biord',
    ru: 'Наречия',
    level: 'A1',
    cue: 'Где? Когда? Как часто? · Hvor? Hvornår?',
    summary: 'Уточняют время, место, частоту, степень, отрицание или отношение к сообщению: her, nu, altid, meget, ikke. Могут относиться к глаголу, прилагательному, другому наречию или предложению целиком.',
    forms: 'Обычно не изменяются по роду и числу: her, ikke, altid. У некоторых бывают степени сравнения: ofte → oftere → oftest; gerne → hellere → helst. Положение слова важно: в обычном главном предложении — jeg kommer ikke.',
    contrast: 'Не добавляй -t к любому наречию: altid и her не меняются. Hvor в вопросе о месте — наречие, а hvad в вопросе о предмете — местоимение. У hurtigt бывает наречная функция, но Sproget.dk отличает функцию от части речи и относит исходное слово к прилагательным.',
    sources: [
      { label: 'Sproget.dk · adverbier', url: 'https://sproget.dk/typiske-problemer/adverbier-biord/' },
      { label: 'Den Danske Ordbog · hvor', url: 'https://ordnet.dk/ddo/ordbog/hvor' },
      { label: 'Sproget.dk · ordklasse og funktion', url: 'https://sproget.dk/typiske-problemer/ordklasser/' }
    ],
    examples: [
      { id: 'class-adverb-not', target: 'ikke', da: 'Jeg drikker ikke kaffe.', ru: 'Я не пью кофе.', note: 'Ikke выражает отрицание. Это наречие; оно не называет предмет и не изменяется по роду или числу.' },
      { id: 'class-adverb-always', target: 'altid', da: 'Hun kommer altid til tiden.', ru: 'Она всегда приходит вовремя.', note: 'Altid уточняет частоту действия kommer: всегда. Это наречие частоты.' },
      { id: 'class-adverb-here', target: 'her', da: 'Vi bor her.', ru: 'Мы живём здесь.', note: 'Her указывает место действия bor и отвечает на вопрос «где?». Это наречие места.' },
      { id: 'class-adverb-where', target: 'Hvor', da: 'Hvor bor du?', ru: 'Где ты живёшь?', note: 'Hvor спрашивает о месте и является вопросительным наречием. Не все слова с hv- относятся к одной части речи.' }
    ]
  },
  {
    id: 'pronoun',
    title: 'Pronomener',
    alias: 'Stedord',
    ru: 'Местоимения',
    level: 'A1',
    cue: 'Кто вместо имени? Чей? · Hvem? Hvis?',
    summary: 'Указывают на людей, предметы или отношения без повторения названия: jeg, hun, den, min, hvem, hvad. Одни заменяют имя или группу существительного, другие стоят рядом с существительным: min bog.',
    forms: 'Различай формы: jeg → mig, hun → hende, de → dem. После предлога нужна форма вроде mig: til mig. Min меняется по роду и числу предмета: min bog, mit hus, mine bøger. Местоимение I («вы») всегда пишется с большой буквы.',
    contrast: 'В hun hjælper mig нужно mig, не jeg. Не путай min/mit: форму определяет предмет, а не пол владельца. Hvad — вопросительное местоимение о предмете, hvor — наречие о месте. Den/det/de бывают местоимениями или артиклями: нужен контекст.',
    sources: [
      { label: 'Sproget.dk · pronomener', url: 'https://sproget.dk/typiske-problemer/pronomener-stedord/' },
      { label: 'Den Danske Ordbog · hvor', url: 'https://ordnet.dk/ddo/ordbog/hvor' }
    ],
    examples: [
      { id: 'class-pronoun-she', target: 'Hun', da: 'Hun arbejder på et bibliotek.', ru: 'Она работает в библиотеке.', note: 'Hun указывает на женщину без её имени. Это личное местоимение в роли подлежащего.' },
      { id: 'class-pronoun-me', target: 'mig', da: 'Kan du hjælpe mig?', ru: 'Ты можешь мне помочь?', note: 'Mig указывает на говорящего. Это форма местоимения jeg, которая здесь используется как дополнение.' },
      { id: 'class-pronoun-my', target: 'min', da: 'Det er min taske.', ru: 'Это моя сумка.', note: 'Min указывает, кому принадлежит сумка. Это притяжательное местоимение, согласованное с en taske.' },
      { id: 'class-pronoun-what', target: 'Hvad', da: 'Hvad læser du?', ru: 'Что ты читаешь?', note: 'Hvad занимает место неизвестного предмета чтения. Это вопросительное местоимение, а не наречие места.' }
    ]
  },
  {
    id: 'preposition',
    title: 'Præpositioner',
    alias: 'Forholdsord',
    ru: 'Предлоги',
    level: 'A1',
    cue: 'Какое отношение? Где? С кем? · Hvor? Med hvem?',
    summary: 'Связывают слово или событие с местом, временем, человеком и другими отношениями: i byen, på bordet, med en ven. Вместе с зависимыми словами образуют сочетание: under bordet.',
    forms: 'Не меняются по роду, числу или времени. Запоминай в сочетании: i Danmark, på arbejde, til skolen, med mig. После предлога личное местоимение обычно имеет объектную форму: til mig, med hende.',
    contrast: 'Предлоги нельзя всегда переводить буквально: i Danmark, но på et bibliotek. Не говори med jeg — нужно med mig. Одно написание может встречаться в разных классах: under в under bordet — предлог, а et under («чудо») — существительное.',
    sources: [
      { label: 'Sproget.dk · ordklasser', url: 'https://sproget.dk/typiske-problemer/ordklasser/' },
      { label: 'Den Danske Ordbog · på', url: 'https://ordnet.dk/ddo/ordbog?query=p%C3%A5' },
      { label: 'Sproget.dk · pronomener efter præposition', url: 'https://sproget.dk/typiske-problemer/pronomener-stedord/' }
    ],
    examples: [
      { id: 'class-preposition-on', target: 'på', da: 'Bogen ligger på bordet.', ru: 'Книга лежит на столе.', note: 'På связывает положение книги с bordet. Здесь på — предлог в сочетании på bordet.' },
      { id: 'class-preposition-in', target: 'i', da: 'Vi bor i Danmark.', ru: 'Мы живём в Дании.', note: 'I вводит название места Danmark. Это предлог, который не меняется по числу или роду.' },
      { id: 'class-preposition-with', target: 'med', da: 'Jeg går en tur med hende.', ru: 'Я гуляю с ней.', note: 'Med выражает совместность и относится к hende. После предлога стоит объектная форма местоимения.' },
      { id: 'class-preposition-under', target: 'under', da: 'Katten sover under bordet.', ru: 'Кошка спит под столом.', note: 'Under задаёт отношение к предмету bordet: под столом. В этом контексте это предлог.' }
    ]
  },
  {
    id: 'conjunction',
    title: 'Konjunktioner',
    alias: 'Bindeord',
    ru: 'Союзы',
    level: 'A2',
    cue: 'Что соединяет? · Hvad binder ordene sammen?',
    summary: 'Соединяют слова, группы слов или предложения: og («и»), men («но»), fordi («потому что»), at («что»). Og может соединять два предмета, а fordi вводит объяснение причины.',
    forms: 'Не изменяются. Og, eller, men обычно соединяют равноправные части. Fordi и союз at вводят придаточное предложение. В нём отрицание обычно стоит перед личной формой глагола: fordi jeg ikke har tid.',
    contrast: 'Не каждый at — союз. В jeg ved, at du kommer после at идёт предложение с подлежащим du и глаголом kommer. В jeg vil lære at svømme at — показатель инфинитива, а svømme — глагол. Не переноси автоматически порядок слов главного предложения в придаточное.',
    sources: [
      { label: 'Sproget.dk · grammatiske ord', url: 'https://sproget.dk/typiske-problemer/grammatiske-ord/' },
      { label: 'Den Danske Ordbog · og', url: 'https://ordnet.dk/ddo/ordbog/og' },
      { label: 'Den Danske Ordbog · at', url: 'https://ordnet.dk/ddo/ordbog/at' }
    ],
    examples: [
      { id: 'class-conjunction-and', target: 'og', da: 'Jeg køber brød og mælk.', ru: 'Я покупаю хлеб и молоко.', note: 'Og соединяет два существительных, brød и mælk. Союзы могут связывать слова, а не только целые предложения.' },
      { id: 'class-conjunction-but', target: 'men', da: 'Jeg er træt, men jeg kommer.', ru: 'Я устал, но я приду.', note: 'Men соединяет два предложения и выражает противопоставление.' },
      { id: 'class-conjunction-because', target: 'fordi', da: 'Jeg går hjem, fordi jeg er træt.', ru: 'Я иду домой, потому что устал.', note: 'Fordi вводит придаточное предложение jeg er træt и указывает причину.' },
      { id: 'class-conjunction-that', target: 'at', da: 'Jeg ved, at du kommer.', ru: 'Я знаю, что ты придёшь.', note: 'At вводит предложение du kommer, поэтому здесь это союз. В at komme перед инфинитивом at имеет другую функцию.' }
    ]
  },
  {
    id: 'article',
    title: 'Artikler',
    alias: 'Kendeord',
    ru: 'Артикли',
    level: 'A1',
    cue: 'Предмет новый или уже известный? · En/et eller den/det/de?',
    summary: 'Помогают оформить неопределённость или определённость существительного: en bog, et hus, den røde bog. Здесь артикли выделены отдельно, как в школьной схеме Sproget.dk. В некоторых грамматиках их рассматривают вместе с местоимениями.',
    forms: 'Неопределённые: en для общего рода, et для среднего. Определённость без прилагательного часто выражается окончанием: bogen, huset, bøgerne. Перед прилагательным обычно нужны den/det/de: den nye bog, det nye hus, de nye bøger.',
    contrast: 'В en bog слово en обычно безударное и служит артиклем; в én bog, ikke to важен счёт «одна», это числительное. Пиши den nye bog, не den nye bogen. Den в den nye bog — артикль, а в den er ny — местоимение; само написание ещё не даёт ответа.',
    sources: [
      { label: 'Sproget.dk · artikler', url: 'https://sproget.dk/typiske-problemer/ordklasser/' },
      { label: 'Den Danske Ordbog · en', url: 'https://ordnet.dk/ddo/ordbog/en' },
      { label: 'Eva Skafte Jensen · forskellige inddelinger', url: 'https://tidsskrift.dk/nfg/article/download/24646/21594/57090' }
    ],
    examples: [
      { id: 'class-article-a-book', target: 'en', da: 'Jeg læser en bog.', ru: 'Я читаю книгу.', note: 'Безударное en вводит неопределённую книгу общего рода. Здесь оно служит артиклем, а не подчёркивает количество «одна».' },
      { id: 'class-article-an-apple', target: 'et', da: 'Hun køber et æble.', ru: 'Она покупает яблоко.', note: 'Et — неопределённый артикль перед существительным среднего рода æble.' },
      { id: 'class-article-the-bike', target: 'den', da: 'Jeg tager den røde cykel.', ru: 'Я беру красный велосипед.', note: 'При нейтральном ударении den оформляет определённую группу den røde cykel. Перед прилагательным røde используется отдельный артикль.' },
      { id: 'class-article-the-books', target: 'de', da: 'Jeg læser de nye bøger.', ru: 'Я читаю новые книги.', note: 'De стоит перед прилагательным nye и существительным во множественном числе bøger. Здесь это определённый артикль, а не местоимение «они».' }
    ]
  },
  {
    id: 'numeral',
    title: 'Numeraler',
    alias: 'Talord',
    ru: 'Числительные',
    level: 'A1',
    cue: 'Сколько? Который по счёту? · Hvor mange? Hvilket nummer?',
    summary: 'Обозначают количество или место в последовательности. Количественные: en, to, tre. Порядковые: første, anden, tredje. И написание буквами, и запись цифрами могут обозначать число.',
    forms: 'Большинство количественных не меняется: to børn, to huse. У «один» есть формы en/et; ударное значение можно подчеркнуть: én/ét. Порядковые учим отдельно: en → første, to → anden/andet, tre → tredje. После цифры порядкового числа ставится точка: 1., 2., 3.',
    contrast: 'En/et — не всегда числительные: безударное en в en bog обычно артикль. В kun én bog речь именно о количестве. Не путай to («два») и anden/andet («второй/второе»); anderledes и anden в значении «другой» не служат примерами порядкового счёта.',
    sources: [
      { label: 'Sproget.dk · talord', url: 'https://sproget.dk/typiske-problemer/grammatiske-ord/' },
      { label: 'Den Danske Ordbog · en', url: 'https://ordnet.dk/ddo/ordbog/en' },
      { label: 'Dansk Sprognævn · grammatiske betegnelser', url: 'https://dsn.dk/wp-content/uploads/2021/01/Grammatisk_talt_OCR_web_lav.pdf' }
    ],
    examples: [
      { id: 'class-numeral-two', target: 'to', da: 'Jeg har to søstre.', ru: 'У меня две сестры.', note: 'To сообщает точное количество сестёр. Это количественное числительное.' },
      { id: 'class-numeral-first', target: 'første', da: 'Det er min første dag på arbejdet.', ru: 'Это мой первый день на работе.', note: 'Første указывает место дня в последовательности. Это порядковое числительное.' },
      { id: 'class-numeral-one', target: 'én', da: 'Jeg har kun én nøgle, ikke to.', ru: 'У меня только один ключ, а не два.', note: 'Én противопоставлено to: важен счёт «один». Поэтому это числительное; знак ударения помогает отличить его от безударного артикля en.' },
      { id: 'class-numeral-three', target: 'tre', da: 'Vi mødes om tre dage.', ru: 'Мы встретимся через три дня.', note: 'Tre задаёт количество дней. Предлог om относится к группе tre dage, а tre остаётся числительным.' }
    ]
  },
  {
    id: 'interjection',
    title: 'Interjektioner',
    alias: 'Udråbsord',
    ru: 'Междометия',
    level: 'A1',
    cue: 'Реакция, чувство, приветствие? · Et udråb?',
    summary: 'Выражают непосредственную реакцию, чувство или приветствие: av, pyha, bravo, hej. Могут быть отдельной репликой или стоять рядом с предложением, не входя в его обычную структуру.',
    forms: 'Не изменяются по роду, числу или времени. Часто отделяются запятой или восклицательным знаком: Hej, Anna! Av! Сам знак «!» не определяет часть речи.',
    contrast: 'Не называй любое слово с восклицательным знаком междометием: Kom! («Приходи!») — глагол в повелительном наклонении. В этой подборке речь о реакциях и приветствиях; lydord («звукоподражания») в Sproget.dk выделены отдельно.',
    sources: [
      { label: 'Sproget.dk · udråbsord og lydord', url: 'https://sproget.dk/typiske-problemer/ordklasser/' },
      { label: 'Den Danske Ordbog · hej', url: 'https://ordnet.dk/ddo/ordbog/hej' },
      { label: 'Dansk Sprognævn · grammatiske betegnelser', url: 'https://dsn.dk/wp-content/uploads/2021/01/Grammatisk_talt_OCR_web_lav.pdf' }
    ],
    examples: [
      { id: 'class-interjection-hi', target: 'Hej', da: 'Hej, Anna!', ru: 'Привет, Анна!', note: 'Hej — самостоятельное приветствие. Здесь это междометие, а Anna — имя адресата.' },
      { id: 'class-interjection-ouch', target: 'Av', da: 'Av, det gør ondt!', ru: 'Ой, больно!', note: 'Av передаёт реакцию на боль. Оно не называет действие или предмет и не изменяется.' },
      { id: 'class-interjection-phew', target: 'Pyha', da: 'Pyha, det var varmt!', ru: 'Фух, было жарко!', note: 'Pyha передаёт непосредственную реакцию, например на жару или усилие. Это междометие.' },
      { id: 'class-interjection-bravo', target: 'Bravo', da: 'Bravo, du klarede det!', ru: 'Браво, у тебя получилось!', note: 'Bravo выражает одобрение отдельным возгласом. Это междометие, а не описание свойства человека.' }
    ]
  }
];
