export const senseFamilies = [
  {
    id: 'meaning-fyr', title: 'fyr', level: 'A2', category: 'homonym',
    summary: 'En fyr может быть парнем или сосной; et fyr — маяком или отопительным котлом. Одного артикля иногда недостаточно.',
    sources: [{ label: 'Den Danske Ordbog · fyr', url: 'https://ordnet.dk/ddo/ordbog/fyr' }],
    senses: [
      {
        id: 'meaning-fyr-person', form: 'en fyr', wordClass: 'noun', ru: 'парень',
        note: 'Разговорное обозначение мужчины. Определённая форма — fyren, множественное число — fyre.',
        da: 'Han er en flink fyr, som altid hjælper sine naboer.', translation: 'Он приятный парень, который всегда помогает соседям.',
        alternatives: ['парень, мужчина', 'мужчина']
      },
      {
        id: 'meaning-fyr-lighthouse', form: 'et fyr', wordClass: 'noun', ru: 'маяк',
        note: 'Средний род: fyret. Морской контекст подсказывает значение.',
        da: 'Skibene bruger fyret på kysten til at finde vej.', translation: 'Корабли ориентируются по маяку на побережье.'
      },
      {
        id: 'meaning-fyr-pine', form: 'en fyr', wordClass: 'noun', ru: 'сосна (дерево)',
        note: 'Дерево: fyrren, fyrre. В повседневной речи также fyrretræ.',
        da: 'Vi plantede en fyr i haven sidste forår.', translation: 'Прошлой весной мы посадили в саду сосну.',
        alternatives: ['сосна']
      },
      {
        id: 'meaning-fyr-heating', form: 'et fyr', wordClass: 'noun', ru: 'отопительный котёл',
        note: 'Тоже средний род. Отопительная установка, например gasfyr или oliefyr.',
        da: 'Vores fyr varmer hele huset op om vinteren.', translation: 'Зимой наш котёл обогревает весь дом.',
        alternatives: ['котёл отопления']
      },
      {
        id: 'meaning-fyr-wood', form: 'fyr', wordClass: 'noun', ru: 'сосновая древесина',
        note: 'Материал обычно без артикля: af fyr или i fyr.',
        da: 'Bordet er lavet af fyr og har en lys farve.', translation: 'Стол сделан из сосны и имеет светлый цвет.',
        alternatives: ['сосна', 'древесина сосны']
      }
    ]
  },
  {
    id: 'meaning-leder-lider', title: 'leder · lider · kan lide', level: 'A2', category: 'confusion',
    summary: 'En leder — человек; leder — форма lede. Lider относится к lide. Предлог и вся конструкция меняют смысл.',
    sources: [
      { label: 'Den Danske Ordbog · leder', url: 'https://ordnet.dk/ddo/ordbog/leder' },
      { label: 'Den Danske Ordbog · lede', url: 'https://ordnet.dk/ddo/ordbog/lede' },
      { label: 'Den Danske Ordbog · lide', url: 'https://ordnet.dk/ddo/ordbog/lide' }
    ],
    senses: [
      {
        id: 'meaning-leder-person', form: 'en leder', wordClass: 'noun', ru: 'руководитель',
        note: 'Существительное с артиклем en; bestemt form — lederen.',
        da: 'Min leder godkender min ferie i næste uge.', translation: 'Мой руководитель согласует мой отпуск на следующей неделе.',
        alternatives: ['начальник']
      },
      {
        id: 'meaning-leder-manages', form: 'leder', wordClass: 'verb', ru: 'руководит',
        note: 'Lede в значении управления: lede + человек, группа или работа, без efter.',
        da: 'Hun leder et team på fem personer.', translation: 'Она руководит командой из пяти человек.'
      },
      {
        id: 'meaning-leder-searches', form: 'leder efter', wordClass: 'verb', ru: 'ищет',
        note: 'Lede efter nogen eller noget: после efter указываем, кого или что ищем.',
        da: 'Jeg leder efter mine nøgler i tasken.', translation: 'Я ищу свои ключи в сумке.'
      },
      {
        id: 'meaning-lider-suffers', form: 'lider af', wordClass: 'verb', ru: 'страдает от',
        note: 'Lide af + болезнь или недуг. Пишется с i, а не с e.',
        da: 'Han lider af astma og har altid sin inhalator med.', translation: 'Он страдает астмой и всегда носит с собой ингалятор.'
      },
      {
        id: 'meaning-lide-likes', form: 'kan lide', wordClass: 'verb', ru: 'нравится',
        note: 'Устойчивая конструкция kunne lide; godt часто усиливает положительное отношение.',
        da: 'Jeg kan godt lide mørk chokolade.', translation: 'Мне нравится тёмный шоколад.'
      }
    ]
  },
  {
    id: 'meaning-holder', title: 'holder', level: 'A2', category: 'construction',
    summary: 'Holde встречается в повседневных сочетаниях. Учите целиком: holde af, holde med, holde øje med, holde op med и holde ud.',
    sources: [
      { label: 'Den Danske Ordbog · holde', url: 'https://ordnet.dk/ddo/ordbog/holde' },
      { label: 'Den Danske Ordbog · øje', url: 'https://ordnet.dk/ddo/ordbog/%C3%B8je' }
    ],
    senses: [
      {
        id: 'meaning-holder-grip', form: 'holder', wordClass: 'verb', ru: 'держит',
        note: 'Прямое значение: holde + предмет или человек, которого держат.',
        da: 'Hun holder et glas i hånden.', translation: 'Она держит в руке стакан.'
      },
      {
        id: 'meaning-holder-affection', form: 'holder af', wordClass: 'verb', ru: 'любит, привязан к',
        note: 'Holde af nogen — испытывать тёплые чувства; holde af noget — любить что-либо.',
        da: 'Jeg holder meget af min mormor.', translation: 'Я очень люблю свою бабушку.',
        alternatives: ['любит', 'привязан к']
      },
      {
        id: 'meaning-holder-support', form: 'holder med', wordClass: 'verb', ru: 'болеет за, поддерживает',
        note: 'Holde med + команда или сторона в споре.',
        da: 'Vi holder med det danske landshold.', translation: 'Мы болеем за сборную Дании.',
        alternatives: ['болеет за', 'поддерживает']
      },
      {
        id: 'meaning-holder-watch', form: 'holder øje med', wordClass: 'verb', ru: 'следит за',
        note: 'Устойчивое сочетание: øje без артикля, затем med + объект внимания.',
        da: 'Kan du holde øje med suppen, mens jeg dækker bord?', translation: 'Можешь последить за супом, пока я накрываю на стол?'
      },
      {
        id: 'meaning-holder-stop', form: 'holder op med', wordClass: 'verb', ru: 'перестаёт',
        note: 'Holde op med + существительное или at + инфинитив.',
        da: 'Hun er holdt op med at ryge.', translation: 'Она бросила курить.'
      },
      {
        id: 'meaning-holder-endure', form: 'holder ud', wordClass: 'verb', ru: 'выносит, терпит',
        note: 'Holde noget ud или holde ud at gøre noget; часто с ikke или kan ikke.',
        da: 'Jeg kan ikke holde den larm ud.', translation: 'Я не могу выносить этот шум.',
        alternatives: ['выносит', 'терпит']
      }
    ]
  },
  {
    id: 'meaning-gaar', title: 'går', level: 'A2', category: 'construction',
    summary: 'Går описывает ходьбу, ход дел и регулярные занятия. В gå op i и gå ud fra значение задаёт всё сочетание.',
    sources: [{ label: 'Den Danske Ordbog · gå', url: 'https://ordnet.dk/ddo/ordbog/g%C3%A5' }],
    senses: [
      {
        id: 'meaning-gaar-walk', form: 'går', wordClass: 'verb', ru: 'идёт пешком',
        note: 'Движение на ногах; направление может вводиться til.',
        da: 'Jeg går til stationen hver morgen.', translation: 'Каждое утро я иду пешком до станции.'
      },
      {
        id: 'meaning-gaar-progress', form: 'det går', wordClass: 'verb', ru: 'дела идут',
        note: 'Det går + хорошо, плохо или иначе: о том, как складывается ситуация.',
        da: 'Det går godt på mit nye arbejde.', translation: 'На новой работе у меня всё идёт хорошо.'
      },
      {
        id: 'meaning-gaar-activity', form: 'går til', wordClass: 'verb', ru: 'ходит на занятия',
        note: 'Gå til + занятие: регулярно заниматься, а не просто двигаться к месту.',
        da: 'Min søn går til svømning om tirsdagen.', translation: 'По вторникам мой сын ходит на плавание.'
      },
      {
        id: 'meaning-gaar-interest', form: 'går op i', wordClass: 'verb', ru: 'увлекается',
        note: 'Gå op i noget — проявлять большой интерес, уделять этому внимание.',
        da: 'Hun går meget op i musik og øver sig hver dag.', translation: 'Она очень увлечена музыкой и занимается каждый день.'
      },
      {
        id: 'meaning-gaar-assume', form: 'går ud fra', wordClass: 'verb', ru: 'исходит из того, что',
        note: 'Gå ud fra, at + предложение: принимать что-либо за исходное предположение.',
        da: 'Jeg går ud fra, at mødet begynder klokken ni.', translation: 'Я исхожу из того, что встреча начинается в девять.'
      }
    ]
  },
  {
    id: 'meaning-kommer', title: 'kommer', level: 'B1', category: 'construction',
    summary: 'Komme til at может обозначать случайное действие или будущее событие. Различайте их по ситуации.',
    sources: [{ label: 'Den Danske Ordbog · komme', url: 'https://ordnet.dk/ddo/ordbog/komme' }],
    senses: [
      {
        id: 'meaning-kommer-arrive', form: 'kommer', wordClass: 'verb', ru: 'прибывает',
        note: 'Движение к месту, где находится или мысленно располагается говорящий.',
        da: 'Toget kommer om fem minutter.', translation: 'Поезд прибывает через пять минут.'
      },
      {
        id: 'meaning-kommer-origin', form: 'kommer fra', wordClass: 'verb', ru: 'родом из',
        note: 'В рассказе о происхождении: komme fra + страна или город. Также может означать, откуда пришли.',
        da: 'Jeg kommer fra Ukraine, men bor nu i Danmark.', translation: 'Я родом из Украины, но сейчас живу в Дании.'
      },
      {
        id: 'meaning-kommer-depends', form: 'kommer an på', wordClass: 'verb', ru: 'зависит от',
        note: 'Det kommer an på + обстоятельство, om или вопросительное предложение.',
        da: 'Det kommer an på vejret, om vi cykler.', translation: 'Поедем ли мы на велосипедах, зависит от погоды.'
      },
      {
        id: 'meaning-kommer-accident', form: 'kommer til at', wordClass: 'verb', ru: 'случайно делает',
        note: 'Непреднамеренное действие; в прошедшем времени часто kom til at.',
        da: 'Jeg kom til at slette beskeden.', translation: 'Я случайно удалил сообщение.'
      },
      {
        id: 'meaning-kommer-future', form: 'kommer til at', wordClass: 'verb', ru: 'будет делать',
        note: 'В подходящем контексте выражает будущее или ожидаемый результат без значения случайности.',
        da: 'Du kommer til at lære mange nye ord på kurset.', translation: 'На курсе ты выучишь много новых слов.'
      }
    ]
  },
  {
    id: 'meaning-tager', title: 'tager', level: 'A2', category: 'construction',
    summary: 'Tage på с одеждой означает «надеть», а без такого дополнения может означать прибавку веса.',
    sources: [{ label: 'Den Danske Ordbog · tage', url: 'https://ordnet.dk/ddo/ordbog/tage' }],
    senses: [
      {
        id: 'meaning-tager-take', form: 'tager', wordClass: 'verb', ru: 'берёт',
        note: 'Tage + предмет: взять его рукой или переместить к себе.',
        da: 'Han tager en kop fra skabet.', translation: 'Он берёт чашку из шкафа.'
      },
      {
        id: 'meaning-tager-dress', form: 'tager noget på', wordClass: 'verb', ru: 'надевает',
        note: 'Предмет одежды стоит между tager и på.',
        da: 'Jeg tager en varm jakke på, før jeg går ud.', translation: 'Я надеваю тёплую куртку, прежде чем выйти.'
      },
      {
        id: 'meaning-tager-undress', form: 'tager noget af', wordClass: 'verb', ru: 'снимает одежду',
        note: 'Tage + предмет одежды + af. Частица af противопоставлена på.',
        da: 'Hun tager skoene af ved døren.', translation: 'Она снимает обувь у двери.'
      },
      {
        id: 'meaning-tager-weight', form: 'tager på', wordClass: 'verb', ru: 'набирает вес',
        note: 'Без названия одежды; можно добавить i vægt или количество килограммов.',
        da: 'Han har taget to kilo på siden jul.', translation: 'С Рождества он набрал два килограмма.'
      },
      {
        id: 'meaning-tager-care', form: 'tager sig af', wordClass: 'verb', ru: 'заботится о',
        note: 'Возвратное местоимение меняется: jeg tager mig af, du tager dig af.',
        da: 'Min søster tager sig af vores kat, mens vi er på ferie.', translation: 'Моя сестра заботится о нашей кошке, пока мы в отпуске.'
      },
      {
        id: 'meaning-tager-receive', form: 'tager imod', wordClass: 'verb', ru: 'принимает',
        note: 'Tage imod + то, что дают или предлагают; также о встрече гостей.',
        da: 'Vi tager gerne imod hjælp med flytningen.', translation: 'Мы с радостью примем помощь с переездом.'
      }
    ]
  },
  {
    id: 'meaning-faar-constructions', title: 'får · устойчивые сочетания', level: 'A2', category: 'construction',
    summary: 'Får — настоящее время от få. В сочетаниях с lov, øje и til at переводится по-разному.',
    sources: [
      { label: 'Den Danske Ordbog · få', url: 'https://ordnet.dk/ddo/ordbog/f%C3%A5' },
      { label: 'Den Danske Ordbog · øje', url: 'https://ordnet.dk/ddo/ordbog/%C3%B8je' }
    ],
    senses: [
      {
        id: 'meaning-faar-permission', form: 'får lov til', wordClass: 'verb', ru: 'получает разрешение',
        note: 'Få lov til at + инфинитив: кому-либо разрешают совершить действие.',
        da: 'Børnene får lov til at blive oppe lidt længere i aften.', translation: 'Сегодня вечером детям разрешают лечь немного позже.'
      },
      {
        id: 'meaning-faar-notice', form: 'får øje på', wordClass: 'verb', ru: 'замечает',
        note: 'Устойчивое сочетание без артикля перед øje; объект вводится på.',
        da: 'Jeg får øje på en ræv ved vejen.', translation: 'Я замечаю лису у дороги.'
      },
      {
        id: 'meaning-faar-cause', form: 'får nogen til at', wordClass: 'verb', ru: 'побуждает сделать',
        note: 'Få + кого-либо + til at + инфинитив: добиться или вызвать действие; не обязательно принуждать.',
        da: 'Den sjove historie får os til at grine.', translation: 'От этой смешной истории мы смеёмся.'
      }
    ]
  },
  {
    id: 'meaning-slaar', title: 'slår', level: 'B1', category: 'construction',
    summary: 'Slå op имеет разные значения с ordbog и с kæreste. Возвратное sig и частица til тоже важны.',
    sources: [{ label: 'Den Danske Ordbog · slå', url: 'https://ordnet.dk/ddo/ordbog/sl%C3%A5' }],
    senses: [
      {
        id: 'meaning-slaar-hit', form: 'slår', wordClass: 'verb', ru: 'ударяет',
        note: 'Прямое значение: slå + объект; инструмент можно добавить через med.',
        da: 'Han slår sømmet i med en hammer.', translation: 'Он забивает гвоздь молотком.'
      },
      {
        id: 'meaning-slaar-lookup', form: 'slår noget op', wordClass: 'verb', ru: 'смотрит в справочнике',
        note: 'Slå et ord op i en ordbog: найти сведения, а не просто открыть книгу.',
        da: 'Jeg slår det ukendte ord op i en ordbog.', translation: 'Я смотрю незнакомое слово в словаре.'
      },
      {
        id: 'meaning-slaar-breakup', form: 'slår op med', wordClass: 'verb', ru: 'расстаётся с партнёром',
        note: 'Slå op med nogen — прекратить романтические отношения.',
        da: 'Hun slog op med sin kæreste i sidste uge.', translation: 'На прошлой неделе она рассталась со своим парнем.'
      },
      {
        id: 'meaning-slaar-hurt', form: 'slår sig', wordClass: 'verb', ru: 'ушибается',
        note: 'Возвратная форма: jeg slår mig, du slår dig, han slår sig.',
        da: 'Barnet faldt på trappen og slog sig på knæet.', translation: 'Ребёнок упал на лестнице и ушиб колено.'
      },
      {
        id: 'meaning-slaar-suffice', form: 'slår til', wordClass: 'verb', ru: 'хватает',
        note: 'О деньгах, запасах или возможностях: быть достаточным для нужд.',
        da: 'Pengene slår ikke til, hvis vi også køber en ny sofa.', translation: 'Денег не хватит, если мы купим ещё и новый диван.'
      }
    ]
  },
  {
    id: 'meaning-staar', title: 'står', level: 'A2', category: 'construction',
    summary: 'Står for может означать ответственность или значение символа. Står op и står af — отдельные сочетания.',
    sources: [{ label: 'Den Danske Ordbog · stå', url: 'https://ordnet.dk/ddo/ordbog/st%C3%A5' }],
    senses: [
      {
        id: 'meaning-staar-stand', form: 'står', wordClass: 'verb', ru: 'стоит',
        note: 'Вертикальное положение человека или предмета; рядом часто указано место.',
        da: 'Der står en vase på bordet.', translation: 'На столе стоит ваза.'
      },
      {
        id: 'meaning-staar-getup', form: 'står op', wordClass: 'verb', ru: 'встаёт с постели',
        note: 'Stå op — подняться после сна; время часто уточняет утренний распорядок.',
        da: 'Jeg står op klokken halv syv på hverdage.', translation: 'В будни я встаю в половине седьмого.'
      },
      {
        id: 'meaning-staar-disembark', form: 'står af', wordClass: 'verb', ru: 'выходит из транспорта',
        note: 'Stå af bussen или toget. О месте выхода: stå af ved næste stop.',
        da: 'Vi står af bussen ved biblioteket.', translation: 'Мы выходим из автобуса у библиотеки.'
      },
      {
        id: 'meaning-staar-responsibility', form: 'står for', wordClass: 'verb', ru: 'отвечает за организацию',
        note: 'Человек står for + дело или мероприятие: организует его, ведёт работу.',
        da: 'Sara står for maden til festen.', translation: 'Сара отвечает за еду на празднике.'
      },
      {
        id: 'meaning-staar-symbol', form: 'står for', wordClass: 'verb', ru: 'обозначает',
        note: 'О букве, сокращении или символе: представляет определённое понятие.',
        da: 'Bogstavet N står for nord på kortet.', translation: 'Буква N обозначает север на карте.'
      }
    ]
  },
  {
    id: 'meaning-ligger-laegger', title: 'ligger · lægger', level: 'A2', category: 'confusion',
    summary: 'Ligger описывает положение, lægger — помещение чего-либо в это положение. Lægger sig — сам ложится.',
    sources: [
      { label: 'Den Danske Ordbog · ligge', url: 'https://ordnet.dk/ddo/ordbog/ligge' },
      { label: 'Den Danske Ordbog · lægge', url: 'https://ordnet.dk/ddo/ordbog/l%C3%A6gge' }
    ],
    senses: [
      {
        id: 'meaning-ligger-rest', form: 'ligger', wordClass: 'verb', ru: 'лежит',
        note: 'Состояние; прямого дополнения нет. Формы: ligge — lå — ligget.',
        da: 'Bogen ligger på natbordet.', translation: 'Книга лежит на прикроватной тумбочке.'
      },
      {
        id: 'meaning-laegger-place', form: 'lægger', wordClass: 'verb', ru: 'кладёт',
        note: 'Действие с дополнением: lægge noget et sted. Формы: lægge — lagde — lagt.',
        da: 'Jeg lægger brevet i skuffen.', translation: 'Я кладу письмо в ящик.'
      },
      {
        id: 'meaning-laegger-liedown', form: 'lægger sig', wordClass: 'verb', ru: 'ложится',
        note: 'Возвратная конструкция: jeg lægger mig, du lægger dig.',
        da: 'Hun lægger sig på sofaen for at hvile.', translation: 'Она ложится на диван отдохнуть.'
      },
      {
        id: 'meaning-ligger-location', form: 'ligger', wordClass: 'verb', ru: 'расположен',
        note: 'О местонахождении здания или места; не означает физически лежать горизонтально.',
        da: 'Skolen ligger tæt på vores hus.', translation: 'Школа расположена недалеко от нашего дома.'
      }
    ]
  },
  {
    id: 'meaning-ser', title: 'ser', level: 'A2', category: 'construction',
    summary: 'Se, se på и se efter различаются. Se efter может означать и поиск, и присмотр; контекст решает.',
    sources: [{ label: 'Den Danske Ordbog · se', url: 'https://ordnet.dk/ddo/ordbog/se' }],
    senses: [
      {
        id: 'meaning-ser-see', form: 'ser', wordClass: 'verb', ru: 'видит',
        note: 'Se + объект: воспринимать зрением; предлог не обязателен.',
        da: 'Jeg kan se havet fra mit vindue.', translation: 'Из своего окна я вижу море.'
      },
      {
        id: 'meaning-ser-watch', form: 'ser på', wordClass: 'verb', ru: 'смотрит на',
        note: 'Se på noget — направлять взгляд, рассматривать или наблюдать.',
        da: 'Hun ser på billederne fra vores ferie.', translation: 'Она рассматривает фотографии из нашего отпуска.'
      },
      {
        id: 'meaning-ser-search', form: 'ser efter', wordClass: 'verb', ru: 'ищет глазами',
        note: 'Se efter noget — пытаться найти что-либо; близко к lede efter.',
        da: 'Jeg ser efter en ledig plads i toget.', translation: 'Я ищу свободное место в поезде.'
      },
      {
        id: 'meaning-ser-care', form: 'ser efter', wordClass: 'verb', ru: 'присматривает за',
        note: 'Se efter nogen — присмотреть, например за детьми. Отличайте от поиска человека.',
        da: 'Kan du se efter børnene, mens jeg køber ind?', translation: 'Можешь присмотреть за детьми, пока я хожу за покупками?'
      },
      {
        id: 'meaning-ser-appearance', form: 'ser ud', wordClass: 'verb', ru: 'выглядит',
        note: 'Se + прилагательное + ud: описывает внешний вид или впечатление.',
        da: 'Du ser træt ud efter den lange rejse.', translation: 'Ты выглядишь уставшим после долгой поездки.'
      },
      {
        id: 'meaning-ser-anticipate', form: 'ser frem til', wordClass: 'verb', ru: 'с нетерпением ждёт',
        note: 'Se frem til + существительное или at + инфинитив: ожидать с радостью.',
        da: 'Vi ser frem til at besøge jer til sommer.', translation: 'Мы с нетерпением ждём возможности навестить вас летом.'
      }
    ]
  },
  {
    id: 'meaning-synes-tror', title: 'synes · tror', level: 'A2', category: 'confusion',
    summary: 'Synes часто выражает оценку, tror — предположение о факте. Это полезный ориентир, а не абсолютное правило.',
    sources: [
      { label: 'Den Danske Ordbog · synes', url: 'https://ordnet.dk/ddo/ordbog/synes' },
      { label: 'Den Danske Ordbog · tro', url: 'https://ordnet.dk/ddo/ordbog/tro' }
    ],
    senses: [
      {
        id: 'meaning-synes-opinion', form: 'synes, at', wordClass: 'verb', ru: 'считает, по личной оценке',
        note: 'Личное впечатление или мнение: jeg synes, at filmen er god.',
        da: 'Jeg synes, at suppen smager godt.', translation: 'По-моему, суп вкусный.',
        alternatives: ['считает', 'по-моему']
      },
      {
        id: 'meaning-synes-like', form: 'synes om', wordClass: 'verb', ru: 'нравится',
        note: 'Synes om noget или nogen — относиться с симпатией; om — часть сочетания.',
        da: 'Jeg synes godt om vores nye lærer.', translation: 'Мне нравится наш новый преподаватель.'
      },
      {
        id: 'meaning-tror-suppose', form: 'tror, at', wordClass: 'verb', ru: 'предполагает',
        note: 'Предположение о том, что можно проверить; говорящий не уверен в факте.',
        da: 'Jeg tror, at butikken lukker klokken seks.', translation: 'Я думаю, что магазин закрывается в шесть.'
      },
      {
        id: 'meaning-tror-believe', form: 'tror på', wordClass: 'verb', ru: 'верит в',
        note: 'Tro på + человек, возможность или убеждение: вера, доверие, уверенность.',
        da: 'Jeg tror på dig og dine evner.', translation: 'Я верю в тебя и твои способности.'
      }
    ]
  },
  {
    id: 'meaning-for-faar', title: 'for · får · et får', level: 'A2', category: 'confusion',
    summary: 'For бывает предлогом, наречием и союзом. Får — форма глагола få, а et får — овца.',
    sources: [
      { label: 'Den Danske Ordbog · for', url: 'https://ordnet.dk/ddo/ordbog/for' },
      { label: 'Den Danske Ordbog · få', url: 'https://ordnet.dk/ddo/ordbog/f%C3%A5' },
      { label: 'Den Danske Ordbog · får', url: 'https://ordnet.dk/ddo/ordbog/f%C3%A5r' }
    ],
    senses: [
      {
        id: 'meaning-for-benefit', form: 'for', wordClass: 'preposition', ru: 'ради, для кого-либо',
        note: 'Указывает, для кого совершается действие; значение зависит от сочетания.',
        da: 'Jeg gør det for min familie.', translation: 'Я делаю это ради своей семьи.',
        alternatives: ['ради', 'для', 'для кого-либо']
      },
      {
        id: 'meaning-for-excess', form: 'for', wordClass: 'adverb', ru: 'слишком',
        note: 'Перед прилагательным или наречием: for dyr, for sent, for meget.',
        da: 'Kaffen er for varm til at drikke nu.', translation: 'Кофе слишком горячий, чтобы пить его сейчас.'
      },
      {
        id: 'meaning-for-reason', form: 'for', wordClass: 'conjunction', ru: 'потому что',
        note: 'Вводит объяснение с порядком слов главного предложения; for ≠ fordi по синтаксису.',
        da: 'Jeg tager bussen, for min cykel er ikke klar.', translation: 'Я поеду на автобусе, потому что мой велосипед ещё не готов.'
      },
      {
        id: 'meaning-faar-receive', form: 'får', wordClass: 'verb', ru: 'получает',
        note: 'Настоящее время få: jeg får, du får. Это глагол, без артикля.',
        da: 'Hun får en pakke med posten i dag.', translation: 'Сегодня она получает посылку по почте.'
      },
      {
        id: 'meaning-faar-sheep', form: 'et får', wordClass: 'noun', ru: 'овца',
        note: 'Средний род: fåret. Во множественном числе тоже får.',
        da: 'Et får står på marken ved siden af sit lam.', translation: 'На лугу рядом со своим ягнёнком стоит овца.'
      }
    ]
  },
  {
    id: 'meaning-gift', title: 'gift', level: 'A2', category: 'homonym',
    summary: 'Gift — семейное положение или яд. Часть речи и артикль помогают различить значения.',
    sources: [{ label: 'Den Danske Ordbog · gift', url: 'https://ordnet.dk/ddo/ordbog/gift' }],
    senses: [
      {
        id: 'meaning-gift-married', form: 'gift', wordClass: 'adjective', ru: 'женат, замужем',
        note: 'Være gift med nogen. В сказуемом артикль перед gift не нужен.',
        da: 'Hun er gift med en dansk mand.', translation: 'Она замужем за датчанином.',
        alternatives: ['женат', 'замужем']
      },
      {
        id: 'meaning-gift-poison', form: 'en gift', wordClass: 'noun', ru: 'яд',
        note: 'Существительное общего рода; о веществе часто без артикля: indeholde gift.',
        da: 'Planten indeholder en stærk gift.', translation: 'Растение содержит сильный яд.'
      }
    ]
  },
  {
    id: 'meaning-ret', title: 'ret', level: 'A2', category: 'polysemy',
    summary: 'Ret встречается в еде, правах и оценках. En ret, have ret и ret dyr — разные конструкции.',
    sources: [{ label: 'Den Danske Ordbog · ret', url: 'https://ordnet.dk/ddo/ordbog/ret' }],
    senses: [
      {
        id: 'meaning-ret-dish', form: 'en ret', wordClass: 'noun', ru: 'блюдо',
        note: 'В контексте еды; множественное число — retter.',
        da: 'Lasagne er en populær ret i vores familie.', translation: 'Лазанья — популярное блюдо в нашей семье.'
      },
      {
        id: 'meaning-ret-entitlement', form: 'ret til', wordClass: 'noun', ru: 'право на',
        note: 'Have ret til noget или til at gøre noget. В этой конструкции обычно без артикля.',
        da: 'Du har ret til at få en kopi af aftalen.', translation: 'Ты имеешь право получить копию соглашения.'
      },
      {
        id: 'meaning-ret-correct', form: 'have ret', wordClass: 'noun', ru: 'быть правым',
        note: 'Have ret — высказывать верное суждение; это устойчивое сочетание с существительным ret.',
        da: 'Du har ret; toget går fra spor tre.', translation: 'Ты прав: поезд отправляется с третьего пути.'
      },
      {
        id: 'meaning-ret-quite', form: 'ret', wordClass: 'adverb', ru: 'довольно',
        note: 'Перед прилагательным или наречием указывает степень: ret dyr, ret godt.',
        da: 'Den nye restaurant er ret dyr.', translation: 'Новый ресторан довольно дорогой.'
      }
    ]
  },
  {
    id: 'meaning-maal', title: 'mål', level: 'A2', category: 'polysemy',
    summary: 'Et mål — цель, гол или ворота; mål также обозначает размеры. Артикль здесь не различает смысл.',
    sources: [{ label: 'Den Danske Ordbog · mål', url: 'https://ordnet.dk/ddo/ordbog/m%C3%A5l' }],
    senses: [
      {
        id: 'meaning-maal-aim', form: 'et mål', wordClass: 'noun', ru: 'цель',
        note: 'То, к чему стремятся; типичные сочетания — have et mål, nå sit mål.',
        da: 'Mit mål er at tale dansk med mine kolleger.', translation: 'Моя цель — говорить по-датски с коллегами.'
      },
      {
        id: 'meaning-maal-score', form: 'et mål', wordClass: 'noun', ru: 'гол',
        note: 'Результат попадания мяча в ворота: score et mål.',
        da: 'Hun scorede kampens første mål efter ti minutter.', translation: 'Через десять минут она забила первый гол матча.'
      },
      {
        id: 'meaning-maal-goalframe', form: 'et mål', wordClass: 'noun', ru: 'ворота',
        note: 'Рама с сеткой на спортивном поле; датское слово в единственном числе.',
        da: 'Målmanden står foran målet og venter på skuddet.', translation: 'Вратарь стоит перед воротами и ждёт удара.'
      },
      {
        id: 'meaning-maal-measurements', form: 'mål', wordClass: 'noun', ru: 'размеры, мерки',
        note: 'Параметры длины, ширины и прочего; часто во множественном числе без изменения формы.',
        da: 'Jeg skriver bordets mål ned, før vi køber en dug.', translation: 'Я записываю размеры стола, прежде чем мы купим скатерть.',
        alternatives: ['размеры', 'мерки']
      }
    ]
  },
  {
    id: 'meaning-skaal', title: 'skål', level: 'A2', category: 'polysemy',
    summary: 'En skål бывает миской или тостом; Skål! — возглас при поднятии бокалов.',
    sources: [{ label: 'Den Danske Ordbog · skål', url: 'https://ordnet.dk/ddo/ordbog/sk%C3%A5l' }],
    senses: [
      {
        id: 'meaning-skaal-bowl', form: 'en skål', wordClass: 'noun', ru: 'миска',
        note: 'Посуда для приготовления или подачи еды; множественное число — skåle.',
        da: 'Jeg serverer salaten i en stor skål.', translation: 'Я подаю салат в большой миске.'
      },
      {
        id: 'meaning-skaal-cheers', form: 'skål!', wordClass: 'interjection', ru: 'будем здоровы!',
        note: 'Возглас при поднятии бокалов; skål for nogen — за кого-либо.',
        da: 'Skål for vores nye naboer!', translation: 'Выпьем за наших новых соседей!',
        alternatives: ['за здоровье!']
      },
      {
        id: 'meaning-skaal-toast', form: 'en skål', wordClass: 'noun', ru: 'тост',
        note: 'О действии: udbringe en skål. В этом значении множественное число — skåler.',
        da: 'Værten udbragte en skål for fødselaren.', translation: 'Хозяин произнёс тост за именинника.'
      }
    ]
  },
  {
    id: 'meaning-bank', title: 'bank', level: 'B1', category: 'homonym',
    summary: 'En bank — финансовое учреждение; et bank — стук. Bank без артикля встречается в выражении få bank.',
    sources: [{ label: 'Den Danske Ordbog · bank', url: 'https://ordnet.dk/ddo/ordbog/bank' }],
    senses: [
      {
        id: 'meaning-bank-financial', form: 'en bank', wordClass: 'noun', ru: 'банк',
        note: 'Общий род: banken. Слова konto, penge и lån помогают узнать финансовый контекст.',
        da: 'Jeg har en konto i en dansk bank.', translation: 'У меня есть счёт в датском банке.'
      },
      {
        id: 'meaning-bank-knock', form: 'et bank', wordClass: 'noun', ru: 'стук',
        note: 'Средний род; например, удар или стук в дверь.',
        da: 'Vi hørte et højt bank på døren.', translation: 'Мы услышали громкий стук в дверь.'
      },
      {
        id: 'meaning-bank-defeat', form: 'få bank', wordClass: 'noun', ru: 'крупное поражение',
        note: 'В спортивном контексте — быть разгромленным. В прямом значении få bank — подвергнуться побоям; bank здесь множественное число.',
        da: 'Vores hold fik bank og tabte med seks mål.', translation: 'Нашу команду разгромили: она проиграла с разницей в шесть мячей.'
      }
    ]
  },
  {
    id: 'meaning-kort', title: 'kort', level: 'A2', category: 'homonym',
    summary: 'Et kort — карта или карточка. Прилагательное kort описывает небольшую длину или длительность.',
    sources: [{ label: 'Den Danske Ordbog · kort', url: 'https://ordnet.dk/ddo/ordbog/kort' }],
    senses: [
      {
        id: 'meaning-kort-map', form: 'et kort', wordClass: 'noun', ru: 'географическая карта',
        note: 'Изображение местности; сочетания et kort over byen, på kortet.',
        da: 'Vi bruger et kort over byen til at finde museet.', translation: 'Мы ищем музей по карте города.'
      },
      {
        id: 'meaning-kort-card', form: 'et kort', wordClass: 'noun', ru: 'карточка',
        note: 'Контекст уточняет вид: банковская карта, открытка, пропуск или игральная карта.',
        da: 'Jeg betaler med kort, fordi jeg ikke har kontanter.', translation: 'Я плачу картой, потому что у меня нет наличных.'
      },
      {
        id: 'meaning-kort-short', form: 'kort', wordClass: 'adjective', ru: 'короткий',
        note: 'Прилагательное: en kort tur, et kort møde; множественное число — korte.',
        da: 'Vi holder en kort pause efter den første øvelse.', translation: 'После первого упражнения мы делаем короткий перерыв.'
      }
    ]
  },
  {
    id: 'meaning-let', title: 'let', level: 'A2', category: 'polysemy',
    summary: 'Let означает лёгкость по сложности или весу, а также небольшую степень признака.',
    sources: [{ label: 'Den Danske Ordbog · let', url: 'https://ordnet.dk/ddo/ordbog/let' }],
    senses: [
      {
        id: 'meaning-let-easy', form: 'let', wordClass: 'adjective', ru: 'несложный',
        note: 'О задаче или действии: близко к nem. Противоположность — svær.',
        da: 'Den første opgave er let, men den næste er svær.', translation: 'Первое задание лёгкое, а следующее трудное.',
        alternatives: ['лёгкий', 'простой']
      },
      {
        id: 'meaning-let-weight', form: 'let', wordClass: 'adjective', ru: 'лёгкий по весу',
        note: 'О физическом весе; противоположность — tung.',
        da: 'Tasken er let, fordi den næsten er tom.', translation: 'Сумка лёгкая, потому что она почти пустая.',
        alternatives: ['лёгкий', 'лёгкий по массе']
      },
      {
        id: 'meaning-let-slightly', form: 'let', wordClass: 'adjective', ru: 'слегка',
        note: 'Прилагательное в наречном употреблении: перед признаком или действием указывает небольшую степень.',
        da: 'Hun blev let overrasket over spørgsmålet.', translation: 'Она слегка удивилась вопросу.'
      }
    ]
  },
  {
    id: 'meaning-lige', title: 'lige', level: 'B1', category: 'polysemy',
    summary: 'Lige может описывать прямую линию, равенство, недавнее действие или смягчать небольшую просьбу.',
    sources: [{ label: 'Den Danske Ordbog · lige', url: 'https://ordnet.dk/ddo/ordbog/lige' }],
    senses: [
      {
        id: 'meaning-lige-straight', form: 'lige', wordClass: 'adjective', ru: 'прямой',
        note: 'Без изгибов; например, en lige linje.',
        da: 'Tegn en lige linje med linealen.', translation: 'Начерти прямую линию с помощью линейки.'
      },
      {
        id: 'meaning-lige-equal', form: 'lige', wordClass: 'adverb', ru: 'одинаково',
        note: 'Перед прилагательным или количеством: lige store, lige meget, lige mange.',
        da: 'De to værelser er lige store.', translation: 'Эти две комнаты одинакового размера.'
      },
      {
        id: 'meaning-lige-recent', form: 'lige', wordClass: 'adverb', ru: 'только что',
        note: 'Рядом с действием часто обозначает недавнее событие: er lige kommet.',
        da: 'Jeg har lige sendt dig en besked.', translation: 'Я только что отправил тебе сообщение.'
      },
      {
        id: 'meaning-lige-request', form: 'lige', wordClass: 'adverb', ru: 'на минутку, пожалуйста',
        note: 'В разговорной просьбе представляет действие как небольшое; перевод зависит от тона.',
        da: 'Kan du lige hjælpe mig med døren?', translation: 'Можешь, пожалуйста, помочь мне с дверью?',
        alternatives: ['на минутку', 'пожалуйста']
      }
    ]
  },
  {
    id: 'meaning-bare', title: 'bare', level: 'B1', category: 'polysemy',
    summary: 'Bare ограничивает, поощряет или вводит желание. Его нельзя всегда переводить одним словом.',
    sources: [{ label: 'Den Danske Ordbog · bare', url: 'https://ordnet.dk/ddo/ordbog/bare' }],
    senses: [
      {
        id: 'meaning-bare-only', form: 'bare', wordClass: 'adverb', ru: 'только, всего лишь',
        note: 'Ограничивает количество, содержание или действие; близко к kun.',
        da: 'Jeg vil bare have et glas vand.', translation: 'Я хочу только стакан воды.',
        alternatives: ['только', 'всего лишь']
      },
      {
        id: 'meaning-bare-goahead', form: 'bare', wordClass: 'adverb', ru: 'смело, пожалуйста',
        note: 'В приглашении или разрешении смягчает побуждение: делай, не стесняйся.',
        da: 'Du kan bare sætte dig her ved siden af mig.', translation: 'Можешь спокойно сесть здесь рядом со мной.',
        alternatives: ['смело', 'пожалуйста', 'спокойно']
      },
      {
        id: 'meaning-bare-wish', form: 'bare', wordClass: 'conjunction', ru: 'хоть бы',
        note: 'В начале предложения вводит желание; близко к gid.',
        da: 'Bare det ikke regner på vores bryllupsdag!', translation: 'Хоть бы в день нашей свадьбы не было дождя!'
      }
    ]
  },
  {
    id: 'meaning-nok', title: 'nok', level: 'B1', category: 'polysemy',
    summary: 'Nok выражает достаточность, предположение или уверенное обещание. Смотрите на всё предложение.',
    sources: [{ label: 'Den Danske Ordbog · nok', url: 'https://ordnet.dk/ddo/ordbog/nok' }],
    senses: [
      {
        id: 'meaning-nok-enough', form: 'nok', wordClass: 'adverb', ru: 'достаточно',
        note: 'Объём или степень достаточны: penge nok, stor nok, tid nok.',
        da: 'Vi har mad nok til alle gæsterne.', translation: 'У нас достаточно еды для всех гостей.'
      },
      {
        id: 'meaning-nok-probably', form: 'nok', wordClass: 'adverb', ru: 'наверное',
        note: 'Предположение или оценка вероятности; часто стоит после личной формы глагола.',
        da: 'Han er nok hjemme nu, for hans bil står udenfor.', translation: 'Наверное, он уже дома: его машина стоит снаружи.'
      },
      {
        id: 'meaning-nok-promise', form: 'skal nok', wordClass: 'adverb', ru: 'обязательно, обещаю',
        note: 'Со skal усиливает обещание или заверение, а не выражает сомнение.',
        da: 'Jeg skal nok ringe, så snart jeg er fremme.', translation: 'Я обязательно позвоню, как только доберусь.',
        alternatives: ['обязательно', 'обещаю']
      }
    ]
  },
  {
    id: 'meaning-vel', title: 'vel', level: 'B1', category: 'polysemy',
    summary: 'Vel часто выражает предположение или ожидание подтверждения. В пожелании lev vel значение другое.',
    sources: [{ label: 'Den Danske Ordbog · vel', url: 'https://ordnet.dk/ddo/ordbog/vel' }],
    senses: [
      {
        id: 'meaning-vel-probably', form: 'vel', wordClass: 'adverb', ru: 'вероятно',
        note: 'Осторожная оценка или предположение; конкретный оттенок зависит от интонации.',
        da: 'Det tager vel omkring en time at køre derhen.', translation: 'Вероятно, дорога туда на машине займёт около часа.'
      },
      {
        id: 'meaning-vel-confirm', form: 'vel', wordClass: 'adverb', ru: 'правда ведь?',
        note: 'В вопросе показывает, что говорящий ожидает подтверждения своего предположения.',
        da: 'Du kommer vel til mødet i morgen?', translation: 'Ты ведь придёшь на встречу завтра?'
      },
      {
        id: 'meaning-vel-farewell', form: 'lev vel', wordClass: 'adverb', ru: 'счастливо, живи благополучно',
        note: 'Устойчивое прощание с торжественным или литературным оттенком, часто при долгой разлуке.',
        da: 'Lev vel, og pas på dig selv på rejsen!', translation: 'Счастливо, и береги себя в пути!',
        alternatives: ['счастливо', 'живи благополучно']
      }
    ]
  },
  {
    id: 'meaning-jo', title: 'jo', level: 'B1', category: 'polysemy',
    summary: 'Jo отвечает на отрицательный вопрос, напоминает об известном или входит в jo … desto … .',
    sources: [{ label: 'Den Danske Ordbog · jo', url: 'https://ordnet.dk/ddo/ordbog/jo' }],
    senses: [
      {
        id: 'meaning-jo-positive-reply', form: 'jo', wordClass: 'interjection', ru: 'да, вопреки отрицанию',
        note: 'Утвердительный ответ на вопрос с ikke: подтверждаем положительное действие.',
        da: 'Kommer du ikke med? Jo, jeg kommer om lidt.', translation: 'Ты не идёшь с нами? — Иду, через минутку.'
      },
      {
        id: 'meaning-jo-known', form: 'jo', wordClass: 'adverb', ru: 'ведь',
        note: 'Представляет информацию как известную или очевидную собеседнику.',
        da: 'Vi kan tage toget; stationen ligger jo lige her.', translation: 'Мы можем поехать на поезде: станция ведь совсем рядом.'
      },
      {
        id: 'meaning-jo-comparison', form: 'jo … desto …', wordClass: 'conjunction', ru: 'чем … тем …',
        note: 'Оба звена содержат сравнительную степень; также возможны jo … jo … и jo … des … .',
        da: 'Jo mere du øver dig, desto lettere bliver det.', translation: 'Чем больше ты практикуешься, тем легче становится.'
      }
    ]
  },
  {
    id: 'meaning-skal-vil', title: 'skal · vil', level: 'A2', category: 'confusion',
    summary: 'Skal часто выражает необходимость или договорённость, vil — желание, намерение или прогноз. Оба могут относиться к будущему.',
    sources: [
      { label: 'Den Danske Ordbog · skulle', url: 'https://ordnet.dk/ddo/ordbog/skulle' },
      { label: 'Den Danske Ordbog · ville', url: 'https://ordnet.dk/ddo/ordbog/ville' }
    ],
    senses: [
      {
        id: 'meaning-skal-obligation', form: 'skal', wordClass: 'verb', ru: 'должен',
        note: 'Необходимость, правило или требование. После модального глагола инфинитив без at.',
        da: 'Du skal vise dit pas ved grænsen.', translation: 'На границе ты должен показать паспорт.'
      },
      {
        id: 'meaning-skal-arrangement', form: 'skal', wordClass: 'verb', ru: 'собирается по плану',
        note: 'Будущее событие по договорённости или расписанию; не обязательно внешняя обязанность.',
        da: 'Vi skal besøge vores venner på lørdag.', translation: 'В субботу мы собираемся навестить друзей.'
      },
      {
        id: 'meaning-vil-want', form: 'vil gerne', wordClass: 'verb', ru: 'хочет',
        note: 'Желание или намерение; gerne делает выражение желания обычным и мягким.',
        da: 'Jeg vil gerne lære at svømme.', translation: 'Я хочу научиться плавать.'
      },
      {
        id: 'meaning-vil-prediction', form: 'vil', wordClass: 'verb', ru: 'будет, по прогнозу',
        note: 'Может вводить прогноз о будущем без значения желания; оттенок определяется контекстом.',
        da: 'Den nye bro vil gøre rejsen kortere.', translation: 'Новый мост сократит время в пути.',
        alternatives: ['будет']
      }
    ]
  },
  {
    id: 'meaning-passer', title: 'passer', level: 'A2', category: 'construction',
    summary: 'Passer описывает подходящий размер или время. Passer på и passer ind добавляют новые значения.',
    sources: [{ label: 'Den Danske Ordbog · passe', url: 'https://ordnet.dk/ddo/ordbog/passe' }],
    senses: [
      {
        id: 'meaning-passer-size', form: 'passer', wordClass: 'verb', ru: 'подходит по размеру',
        note: 'Одежда, обувь или предмет имеют нужную форму и величину.',
        da: 'De nye sko passer perfekt og klemmer ikke.', translation: 'Новые туфли идеально подходят по размеру и не жмут.'
      },
      {
        id: 'meaning-passer-convenient', form: 'passer', wordClass: 'verb', ru: 'удобно по времени',
        note: 'Passe nogen — устраивать кого-либо; часто о времени встречи.',
        da: 'Passer det dig at mødes klokken tre?', translation: 'Тебе удобно встретиться в три часа?'
      },
      {
        id: 'meaning-passer-protect', form: 'passer på', wordClass: 'verb', ru: 'бережёт, присматривает',
        note: 'Passe på nogen или noget — защищать и присматривать; без дополнения может быть «будь осторожен».',
        da: 'Kan du passe på min taske, mens jeg henter kaffe?', translation: 'Можешь присмотреть за моей сумкой, пока я схожу за кофе?',
        alternatives: ['бережёт', 'присматривает', 'присматривает за']
      },
      {
        id: 'meaning-passer-fitin', form: 'passer ind', wordClass: 'verb', ru: 'вписывается',
        note: 'Passe ind i + окружение или группа: быть к месту, соответствовать.',
        da: 'Den nye medarbejder passer godt ind i teamet.', translation: 'Новый сотрудник хорошо вписывается в команду.'
      }
    ]
  },
  {
    id: 'meaning-taenker', title: 'tænker', level: 'B1', category: 'construction',
    summary: 'Tænke på называет предмет мыслей, tænke over — обдумывание. Tænke sig om предлагает сначала подумать.',
    sources: [{ label: 'Den Danske Ordbog · tænke', url: 'https://ordnet.dk/ddo/ordbog/t%C3%A6nke' }],
    senses: [
      {
        id: 'meaning-taenker-thinkof', form: 'tænker på', wordClass: 'verb', ru: 'думает о',
        note: 'Человек или тема находятся в мыслях; tænke på имеет и другие значения по контексту.',
        da: 'Jeg tænker ofte på mine venner i Ukraine.', translation: 'Я часто думаю о своих друзьях в Украине.'
      },
      {
        id: 'meaning-taenker-consider', form: 'tænker over', wordClass: 'verb', ru: 'обдумывает',
        note: 'Рассматривать вопрос, предложение или решение: tænke over noget.',
        da: 'Hun tænker over tilbuddet, før hun svarer.', translation: 'Она обдумывает предложение, прежде чем ответить.'
      },
      {
        id: 'meaning-taenker-thinkfirst', form: 'tænker sig om', wordClass: 'verb', ru: 'думает, прежде чем действовать',
        note: 'Возвратное местоимение меняется: jeg tænker mig om, du tænker dig om.',
        da: 'Tænk dig om, før du trykker på send!', translation: 'Подумай, прежде чем нажать «Отправить»!'
      }
    ]
  }
];
