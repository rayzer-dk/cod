// pd3-listening-data: PD3 practice content (see docs/pd3-schema.md). Plain data module, no imports. All names and organisations are fictional.
export const listening = [
 {
  id: "besked-fra-tandlaegen",
  level: "B1",
  topic: "Здоровье",
  title: "Besked fra tandlægen",
  situation: "Вы услышите голосовое сообщение из стоматологической клиники.",
  plays: 2,
  sentences: [
   {da: "Goddag, det er Camilla fra tandklinikken på Søndergade.", ru: "Добрый день, это Камилла из стоматологической клиники на Сёндергаде."},
   {da: "Jeg ringer til dig, fordi vi desværre må flytte din tid på torsdag.", ru: "Я звоню вам, потому что мы, к сожалению, должны перенести ваш приём в четверг."},
   {da: "Tandlægen er blevet syg og kommer først tilbage i næste uge.", ru: "Стоматолог заболел и вернётся только на следующей неделе."},
   {da: "Din nye tid er derfor næste mandag klokken kvart over ni.", ru: "Поэтому ваше новое время — в следующий понедельник в пятнадцать минут десятого."},
   {
    da: "Hvis det tidspunkt ikke passer dig, kan du ringe til os i morgen mellem klokken otte og tolv.",
    ru: "Если это время вам не подходит, вы можете позвонить нам завтра с восьми до двенадцати."
   },
   {da: "Du kan også skrive en besked på vores hjemmeside og vælge en anden tid.", ru: "Вы также можете написать сообщение на нашем сайте и выбрать другое время."},
   {
    da: "Husk at komme ti minutter før tiden, så du kan udfylde et lille skema.",
    ru: "Не забудьте прийти за десять минут до назначенного времени, чтобы заполнить небольшую анкету."
   },
   {da: "Hvis tiden passer dig, behøver du ikke at gøre noget.", ru: "Если время вам подходит, ничего делать не нужно."},
   {da: "Undskyld ulejligheden, og tak for din forståelse.", ru: "Извините за неудобство и спасибо за понимание."},
   {da: "Vi ses på mandag.", ru: "Увидимся в понедельник."}
  ],
  questions: [
   {
    q: "Hvorfor ringer Camilla?",
    options: ["Klinikken skal flytte", "Tandlægen er syg", "Patienten har glemt sin tid"],
    answer: 1,
    why: "Камилла говорит, что стоматолог заболел и вернётся только на следующей неделе, поэтому приём переносят. Слово flytte здесь значит «перенести», а не «переехать»."
   },
   {
    q: "Hvornår er den nye tid?",
    options: [
     "Torsdag klokken kvart over ni",
     "I morgen klokken otte",
     "Næste mandag klokken kvart over ni"
    ],
    answer: 2,
    why: "В сообщении: «Din nye tid er derfor næste mandag klokken kvart over ni». Четверг — это старое время."
   },
   {
    q: "Hvad kan man gøre, hvis den nye tid ikke passer?",
    options: ["Ringe til klinikken i morgen", "Komme uden at have en tid", "Vente på et brev"],
    answer: 0,
    why: "Сказано: можно позвонить завтра с восьми до двенадцати (также можно выбрать другое время на сайте). О письме и визите без записи ничего не говорится."
   },
   {
    q: "Hvornår skal man komme til tandlægen?",
    options: ["En time før tiden", "Ti minutter før tiden", "Præcis til tiden"],
    answer: 1,
    why: "Камилла просит прийти за десять минут до назначенного времени («ti minutter før tiden»), чтобы заполнить анкету."
   },
   {
    q: "Hvad skal man gøre, hvis den nye tid passer?",
    options: [
     "Man skal ringe tilbage",
     "Man skal skrive på hjemmesiden",
     "Man behøver ikke at gøre noget"
    ],
    answer: 2,
    why: "Фраза «Hvis tiden passer dig, behøver du ikke at gøre noget» прямо говорит, что ничего делать не нужно."
   }
  ]
 },
 {
  id: "meddelelse-paa-stationen",
  level: "B1",
  topic: "Транспорт",
  title: "Meddelelse på stationen",
  situation: "Вы услышите объявление на вокзале о задержке поезда.",
  plays: 2,
  sentences: [
   {da: "Kære passagerer, vi har en vigtig meddelelse.", ru: "Уважаемые пассажиры, у нас важное объявление."},
   {
    da: "Toget mod Odense klokken fjorten nul fem er desværre forsinket med omkring tyve minutter.",
    ru: "Поезд на Оденсе в четырнадцать ноль пять, к сожалению, задерживается примерно на двадцать минут."
   },
   {da: "Forsinkelsen skyldes en signalfejl nær Roskilde.", ru: "Задержка вызвана неисправностью сигналов вблизи Роскилле."},
   {da: "Toget afgår fra spor fire i stedet for fra spor to.", ru: "Поезд отправится с пути четыре вместо пути два."},
   {da: "Vi gentager: Toget mod Odense afgår fra spor fire.", ru: "Повторяем: поезд на Оденсе отправляется с пути четыре."},
   {da: "Passagerer til Korsør skal skifte tog i Roskilde.", ru: "Пассажирам до Корсёра нужно пересесть на другой поезд в Роскилле."},
   {da: "Elevatoren til spor fire er ude af drift, så brug i stedet trappen ved udgangen.", ru: "Лифт к пути четыре не работает, поэтому пользуйтесь лестницей у выхода."},
   {da: "Man kan købe varm kaffe og kage i kiosken ved hovedindgangen.", ru: "Горячий кофе и выпечку можно купить в киоске у главного входа."},
   {
    da: "Passagerer, der skal videre med bus, finder busserne foran hovedindgangen.",
    ru: "Пассажиры, которым нужно ехать дальше на автобусе, найдут автобусы перед главным входом."
   },
   {da: "Hold øje med skærmene på perronen, hvis afgangstiden ændrer sig igen.", ru: "Следите за табло на платформе, если время отправления снова изменится."},
   {da: "Vi beklager forsinkelsen og takker for jeres tålmodighed.", ru: "Мы приносим извинения за задержку и благодарим вас за терпение."}
  ],
  questions: [
   {
    q: "Hvad handler meddelelsen om?",
    options: ["Et tog, der er forsinket", "Et tog, der er aflyst", "En ændring af billetpriserne"],
    answer: 0,
    why: "Уже во второй фразе сказано, что поезд на Оденсе «desværre forsinket», то есть задерживается; об отмене речи нет."
   },
   {
    q: "Hvor meget er toget forsinket?",
    options: ["Omkring ti minutter", "Omkring tyve minutter", "Omkring en time"],
    answer: 1,
    why: "В тексте: «forsinket med omkring tyve minutter» — примерно на двадцать минут."
   },
   {
    q: "Hvorfor er toget forsinket?",
    options: [
     "På grund af dårligt vejr",
     "På grund af en fejl med signalerne",
     "På grund af en syg togfører"
    ],
    answer: 1,
    why: "Причина названа прямо: «Forsinkelsen skyldes en signalfejl» — неисправность сигналов. Про погоду и машиниста ничего не сказано."
   },
   {
    q: "Fra hvilket spor afgår toget mod Odense?",
    options: ["Spor to", "Spor tre", "Spor fire"],
    answer: 2,
    why: "Диктор дважды говорит: поезд отправляется с пути четыре, а не с пути два, как было раньше."
   },
   {
    q: "Hvad skal passagerer til Korsør gøre?",
    options: ["Blive i toget hele vejen", "Skifte tog i Roskilde", "Tage en bus fra Odense"],
    answer: 1,
    why: "Сказано: «Passagerer til Korsør skal skifte tog i Roskilde» — нужно пересесть в Роскилле."
   },
   {
    q: "Hvad gælder for elevatoren til spor fire?",
    options: ["Den er kun åben om morgenen", "Den virker ikke", "Den er kun for børn"],
    answer: 1,
    why: "Фраза «ude af drift» значит «не работает»; вместо лифта предлагают лестницу у выхода."
   }
  ]
 },
 {
  id: "tilbud-i-supermarkedet",
  level: "B1",
  topic: "Покупки",
  title: "Meddelelse i supermarkedet",
  situation: "Вы услышите объявление в супермаркете.",
  plays: 2,
  sentences: [
   {da: "Kære kunder, velkommen til supermarkedet Solgården.", ru: "Уважаемые покупатели, добро пожаловать в супермаркет «Сольгорден»."},
   {da: "I dag har vi tilbud på frisk fisk ved disken bagerst i butikken.", ru: "Сегодня у нас акция на свежую рыбу у прилавка в глубине магазина."},
   {da: "Laks og torsk koster i dag kun halvdelen af den normale pris.", ru: "Лосось и треска сегодня стоят только половину обычной цены."},
   {
    da: "Bageren har lige taget friskbagt rugbrød ud af ovnen, og vi har også boller til frokost.",
    ru: "Пекарь только что достал из печи свежеиспечённый ржаной хлеб, и у нас есть также булочки к обеду."
   },
   {da: "Vi gør opmærksom på, at kundetoilettet er lukket på grund af rengøring.", ru: "Обращаем ваше внимание, что туалет для покупателей закрыт на уборку."},
   {da: "Det nærmeste toilet finder du på tankstationen på den anden side af vejen.", ru: "Ближайший туалет вы найдёте на заправке на другой стороне дороги."},
   {
    da: "Butikken lukker i dag allerede klokken atten, fordi personalet holder et møde.",
    ru: "Магазин сегодня закрывается уже в восемнадцать часов, потому что у персонала собрание."
   },
   {da: "Vi beder derfor alle kunder om at gøre deres sidste indkøb i god tid.", ru: "Поэтому просим всех покупателей сделать последние покупки заблаговременно."},
   {
    da: "Hvis du handler for mere end femhundrede kroner, kan vi køre varerne hjem til dig.",
    ru: "Если вы купите товаров больше чем на пятьсот крон, мы сможем довезти покупки до вашего дома."
   },
   {da: "Tak, fordi du handler hos os.", ru: "Спасибо, что покупаете у нас."}
  ],
  questions: [
   {
    q: "Hvor foregår meddelelsen?",
    options: ["På en togstation", "I et supermarked", "På en restaurant"],
    answer: 1,
    why: "Диктор приветствует покупателей, говорит о рыбе у прилавка, хлебе и кассе — это супермаркет."
   },
   {
    q: "Hvad er der tilbud på i dag?",
    options: ["Frisk kød", "Frisk fisk", "Friske grøntsager"],
    answer: 1,
    why: "Сказано: «tilbud på frisk fisk», лосось и треска стоят вдвое дешевле обычного."
   },
   {
    q: "Hvad er lukket på grund af rengøring?",
    options: ["Bageriet", "Kassen ved udgangen", "Kundetoilettet"],
    answer: 2,
    why: "Фраза «kundetoilettet er lukket på grund af rengøring» называет закрытое помещение — туалет для покупателей."
   },
   {
    q: "Hvorfor lukker butikken tidligt i dag?",
    options: ["Personalet holder et møde", "Der er ikke flere varer", "Butikken skal gøres ren"],
    answer: 0,
    why: "Причина закрытия: «fordi personalet holder et møde». Уборка относится только к туалету."
   },
   {
    q: "Hvornår lukker butikken i dag?",
    options: ["Klokken seksten", "Klokken atten", "Klokken tyve"],
    answer: 1,
    why: "В тексте: «lukker i dag allerede klokken atten» — в восемнадцать часов."
   },
   {
    q: "Hvornår kan butikken køre varer hjem til kunderne?",
    options: [
     "Når man handler for over femhundrede kroner",
     "Når man har et kundekort",
     "Når man handler om morgenen"
    ],
    answer: 0,
    why: "Условие названо прямо: «handler for mere end femhundrede kroner». Про карту клиента и утро ничего не сказано."
   }
  ]
 },
 {
  id: "trafik-og-vejr",
  level: "B2",
  topic: "Дорога и погода",
  title: "Trafik og vejr på lokalradioen",
  situation: "Вы услышите по радио сводку о дорожной ситуации и погоде.",
  plays: 2,
  sentences: [
   {da: "Goddag, og velkommen til trafik- og vejrmeldingen her på lokalradioen.", ru: "Добрый день, добро пожаловать на сводку о дорогах и погоде на нашем местном радио."},
   {
    da: "Der er kø på motorvejen ved afkørsel tolv, fordi en lastbil har tabt en del af sin last.",
    ru: "На автомагистрали у съезда двенадцать пробка, потому что грузовик потерял часть груза."
   },
   {
    da: "Politiet anbefaler, at bilisterne tager landevejen i stedet, hvis de skal mod nord.",
    ru: "Полиция рекомендует водителям, которые едут на север, выбрать вместо этого загородную дорогу."
   },
   {
    da: "På Banegårdsbroen er der vejarbejde, så der kun er en enkelt vognbane åben i hver retning.",
    ru: "На Вокзальном мосту идут дорожные работы, поэтому в каждом направлении открыта только одна полоса."
   },
   {
    da: "Bybusserne kører som normalt, men linje fem er omlagt via Torvegade.",
    ru: "Городские автобусы ходят как обычно, но маршрут номер пять изменён и идёт через Торвегаде."
   },
   {da: "Og så til vejret. I nat falder temperaturen til omkring frysepunktet.", ru: "А теперь о погоде. Этой ночью температура опустится примерно до точки замерзания."},
   {
    da: "Det betyder, at der kan komme glatte veje i de tidlige morgentimer, især på de små veje uden for byen.",
    ru: "Это значит, что в ранние утренние часы дороги могут стать скользкими, особенно небольшие дороги за городом."
   },
   {da: "I morgen formiddag trækker skyerne væk, og der kommer sol.", ru: "Завтра в первой половине дня облака уйдут, и выглянет солнце."},
   {da: "Om eftermiddagen bliver der en jævn vind fra vest, men det bliver tørt.", ru: "Во второй половине дня будет ровный ветер с запада, но останется сухо."},
   {da: "Husk varmt tøj, hvis du skal ud tidligt i morgen.", ru: "Не забудьте тёплую одежду, если вам завтра рано выходить."}
  ],
  questions: [
   {
    q: "Hvorfor er der kø på motorvejen?",
    options: [
     "En lastbil har tabt noget af sin last",
     "Der er sket et alvorligt færdselsuheld",
     "Politiet kontrollerer bilisterne"
    ],
    answer: 0,
    why: "Причина пробки названа прямо: «en lastbil har tabt en del af sin last». Об аварии и проверке полиции ничего не сказано."
   },
   {
    q: "Hvad anbefaler politiet til dem, der skal mod nord?",
    options: ["At tage toget", "At tage landevejen", "At vente hjemme"],
    answer: 1,
    why: "Рекомендация: «tager landevejen i stedet» — ехать по загородной дороге вместо автомагистрали."
   },
   {
    q: "Hvad er der på Banegårdsbroen?",
    options: ["Et uheld", "Vejarbejde", "En demonstration"],
    answer: 1,
    why: "Сказано: «På Banegårdsbroen er der vejarbejde» — идут дорожные работы, открыта одна полоса."
   },
   {
    q: "Hvilken buslinje er omlagt?",
    options: ["Linje fem", "Linje tolv", "Alle bybusser"],
    answer: 0,
    why: "Диктор говорит, что автобусы ходят как обычно, но «linje fem er omlagt». Число двенадцать относится к съезду с автомагистрали."
   },
   {
    q: "Hvornår kan vejene være glatte?",
    options: ["Sent om aftenen", "Midt på dagen", "Tidligt om morgenen"],
    answer: 2,
    why: "Сказано: скользкие дороги возможны «i de tidlige morgentimer» — в ранние утренние часы."
   },
   {
    q: "Hvordan bliver vejret om eftermiddagen?",
    options: ["Tørt med lidt vind", "Regnfuldt og vindstille", "Koldt med sne"],
    answer: 0,
    why: "Прогноз на вторую половину дня: «en jævn vind fra vest, men det bliver tørt» — сухо, с ветром."
   }
  ]
 },
 {
  id: "telefonsamtale-med-cykelvaerkstedet",
  level: "B1",
  topic: "Бытовые услуги",
  title: "Telefonsamtale med et værksted",
  situation: "Вы услышите телефонный разговор клиента с велосипедной мастерской.",
  plays: 2,
  sentences: [
   {da: "Værkstedet: Cykelværkstedet, det er Kasper. Hvad kan jeg hjælpe med?", ru: "Мастерская: Велосипедная мастерская, это Каспер. Чем могу помочь?"},
   {
    da: "Anders: Goddag, mit navn er Anders. Jeg har et problem med min cykel, for bremserne virker næsten ikke.",
    ru: "Андерс: Добрый день, меня зовут Андерс. У меня проблема с велосипедом: тормоза почти не работают."
   },
   {da: "Værkstedet: Det lyder ikke godt. Er det både for- og baghjulet?", ru: "Мастерская: Звучит нехорошо. Это и переднее, и заднее колесо?"},
   {
    da: "Anders: Nej, det er kun baghjulet. Og så skal jeg også have en ny lygte, for den gamle er gået i stykker.",
    ru: "Андерс: Нет, только заднее. И ещё мне нужен новый фонарь, потому что старый сломался."
   },
   {
    da: "Værkstedet: Det kan vi sagtens klare. Du kan komme forbi i morgen eller på fredag.",
    ru: "Мастерская: Это мы вполне можем сделать. Вы можете зайти завтра или в пятницу."
   },
   {da: "Anders: Jeg arbejder til klokken fire i morgen. Kan jeg komme klokken fem?", ru: "Андерс: Завтра я работаю до четырёх. Можно прийти в пять?"},
   {
    da: "Værkstedet: Vi lukker klokken fem, så det bliver for sent. Hvad med fredag formiddag?",
    ru: "Мастерская: Мы закрываемся в пять, так что будет слишком поздно. Как насчёт пятницы до обеда?"
   },
   {da: "Anders: Fredag passer fint. Hvad kommer det til at koste?", ru: "Андерс: Пятница подходит. Сколько это будет стоить?"},
   {
    da: "Værkstedet: Det kan jeg først sige, når jeg har set cyklen. Men en ny lygte koster omkring hundrede kroner.",
    ru: "Мастерская: Это я смогу сказать только после осмотра велосипеда. Но новый фонарь стоит около ста крон."
   },
   {da: "Anders: Det er helt fint. Jeg kommer på fredag klokken ti. Tak for hjælpen.", ru: "Андерс: Хорошо. Я приду в пятницу в десять. Спасибо за помощь."},
   {da: "Værkstedet: Det var så lidt. Vi ses på fredag.", ru: "Мастерская: Не за что. До встречи в пятницу."}
  ],
  questions: [
   {
    q: "Hvorfor ringer Anders?",
    options: ["Han vil købe en ny cykel", "Hans bremser virker næsten ikke", "Han har mistet sin cykel"],
    answer: 1,
    why: "Андерс говорит: «bremserne virker næsten ikke» — тормоза почти не работают. Покупать новый велосипед он не собирается."
   },
   {
    q: "Hvilket hjul er der problemer med?",
    options: ["Forhjulet", "Begge hjul", "Baghjulet"],
    answer: 2,
    why: "На вопрос мастерской Андерс отвечает: «det er kun baghjulet» — проблема только с задним колесом."
   },
   {
    q: "Hvorfor kan Anders ikke komme i morgen klokken fem?",
    options: [
     "Han arbejder til klokken fem",
     "Værkstedet lukker klokken fem",
     "Værkstedet har ikke tid i morgen"
    ],
    answer: 1,
    why: "Мастерская отвечает: «Vi lukker klokken fem, så det bliver for sent». Андерс работает до четырёх, а день завтра как раз возможен."
   },
   {
    q: "Hvornår aftaler de at mødes?",
    options: ["Fredag klokken fire", "Fredag klokken ti", "I morgen klokken fem"],
    answer: 1,
    why: "Андерс завершает разговор словами «Jeg kommer på fredag klokken ti»."
   },
   {
    q: "Hvad koster en ny lygte omtrent?",
    options: ["Omkring tusind kroner", "Omkring hundrede kroner", "Ingenting"],
    answer: 1,
    why: "Мастерская называет цену фонаря: «omkring hundrede kroner» — около ста крон."
   },
   {
    q: "Hvad siger værkstedet om den samlede pris?",
    options: [
     "Prisen er allerede aftalt",
     "Prisen kan først siges, når cyklen er set",
     "Prisen er den samme som sidste gang"
    ],
    answer: 1,
    why: "Каспер говорит: «Det kan jeg først sige, når jeg har set cyklen» — общую цену назовут только после осмотра."
   }
  ]
 },
 {
  id: "regler-for-vaskekaelderen",
  level: "B2",
  topic: "Жильё",
  title: "Regler for vaskekælderen",
  situation: "Вы услышите инструкцию по пользованию общей прачечной в жилом доме.",
  plays: 2,
  sentences: [
   {da: "Velkommen til vaskekælderen på Ahornvej tolv.", ru: "Добро пожаловать в прачечную в подвале на Ахорнвей, дом двенадцать."},
   {da: "Her får du en kort vejledning i, hvordan du bruger maskinerne.", ru: "Здесь вы получите краткую инструкцию о том, как пользоваться машинами."},
   {da: "Først skal du booke en tid på tavlen ved døren.", ru: "Сначала нужно записаться на время на доске у двери."},
   {da: "Du skriver dit navn og dit lejlighedsnummer ud for den tid, du vil bruge.", ru: "Вы пишете своё имя и номер квартиры напротив времени, которое хотите занять."},
   {da: "Hver beboer må kun booke to tider om ugen.", ru: "Каждый жилец может записаться на стирку только два раза в неделю."},
   {
    da: "Når du kommer, skal du sortere tøjet, så hvidt og farvet tøj ikke bliver vasket sammen.",
    ru: "Придя, рассортируйте бельё так, чтобы белое и цветное не стирались вместе."
   },
   {da: "Brug kun lidt vaskemiddel, for ellers bliver der for meget skum.", ru: "Используйте немного моющего средства, иначе будет слишком много пены."},
   {
    da: "Når maskinen er færdig, skal du tage tøjet ud med det samme, så andre kan komme til.",
    ru: "Когда машина закончит, сразу достаньте бельё, чтобы другие могли ею воспользоваться."
   },
   {da: "Fnug fra tørretumbleren skal i affaldsspanden under bordet.", ru: "Ворс из сушильной машины нужно выбросить в мусорное ведро под столом."},
   {da: "Vaskekælderen er åben hver dag fra klokken syv til klokken tyve.", ru: "Прачечная открыта каждый день с семи до двадцати часов."},
   {
    da: "Hvis noget går i stykker, skal du ringe til viceværten på det nummer, der står på tavlen.",
    ru: "Если что-то сломается, позвоните коменданту по номеру, указанному на доске."
   },
   {da: "Tak, fordi du hjælper med at holde rummet pænt.", ru: "Спасибо, что помогаете поддерживать порядок в помещении."}
  ],
  questions: [
   {
    q: "Hvad skal man gøre først?",
    options: ["Ringe til viceværten", "Sortere tøjet", "Booke en tid på tavlen"],
    answer: 2,
    why: "Инструкция начинается словами «Først skal du booke en tid på tavlen ved døren». Сортировка белья идёт позже."
   },
   {
    q: "Hvor mange tider må en beboer booke om ugen?",
    options: ["Kun én tid", "To tider", "Tre tider"],
    answer: 1,
    why: "Правило: «Hver beboer må kun booke to tider om ugen» — две записи в неделю."
   },
   {
    q: "Hvorfor skal man bruge lidt vaskemiddel?",
    options: [
     "Fordi det er dyrt",
     "Fordi der ellers bliver for meget skum",
     "Fordi tøjet ellers bliver farvet"
    ],
    answer: 1,
    why: "Причина названа прямо: «for ellers bliver der for meget skum». Про цену моющего средства не говорится."
   },
   {
    q: "Hvad skal man gøre, når maskinen er færdig?",
    options: [
     "Tage tøjet ud med det samme",
     "Lade tøjet ligge til næste dag",
     "Skrive sit navn på tavlen"
    ],
    answer: 0,
    why: "Сказано: «tage tøjet ud med det samme, så andre kan komme til» — достать бельё сразу."
   },
   {
    q: "Hvor skal fnuggene fra tørretumbleren hen?",
    options: ["I vaskemaskinen", "I affaldsspanden", "I afløbet"],
    answer: 1,
    why: "Правило: «Fnug fra tørretumbleren skal i affaldsspanden under bordet» — в мусорное ведро."
   },
   {
    q: "Hvornår er vaskekælderen åben?",
    options: [
     "Hver dag til klokken atten",
     "Kun i weekenden",
     "Hver dag fra klokken syv til klokken tyve"
    ],
    answer: 2,
    why: "Часы работы названы так: «åben hver dag fra klokken syv til klokken tyve»."
   }
  ]
 },
 {
  id: "besked-fra-en-kollega",
  level: "B2",
  topic: "Работа",
  title: "Besked fra en kollega",
  situation: "Вы услышите голосовое сообщение от коллеги, который просит о замене на встрече.",
  plays: 2,
  sentences: [
   {
    da: "Hej Sofie, det er Henrik. Jeg ringer for at høre, om du kan tage mit møde i morgen.",
    ru: "Привет, Софи, это Хенрик. Звоню спросить, не могла бы ты завтра подменить меня на встрече."
   },
   {
    da: "Jeg skal nemlig hente min datter tidligt fra skole, fordi hun har feber.",
    ru: "Дело в том, что мне нужно рано забрать дочь из школы, потому что у неё температура."
   },
   {da: "Mødet er med to kunder fra Aalborg og handler om den nye hjemmeside.", ru: "Встреча с двумя клиентами из Ольборга, речь пойдёт о новом сайте."},
   {da: "Det starter klokken ni i det store mødelokale på første sal.", ru: "Она начинается в девять в большом зале для совещаний на втором этаже."},
   {da: "Du finder alle papirerne i den blå mappe på mit skrivebord.", ru: "Все бумаги ты найдёшь в синей папке на моём письменном столе."},
   {da: "Det vigtigste er, at I aftaler en dato for næste møde.", ru: "Самое важное — чтобы вы договорились о дате следующей встречи."},
   {
    da: "Hvis kunderne spørger om prisen, skal du sige, at jeg sender et tilbud i løbet af fredagen.",
    ru: "Если клиенты спросят о цене, скажи, что я пришлю предложение в течение пятницы."
   },
   {
    da: "Det er en stor hjælp, hvis du kan, og jeg gør gerne det samme for dig en anden gang.",
    ru: "Ты очень выручишь меня, если сможешь, а я с удовольствием сделаю то же самое для тебя в другой раз."
   },
   {da: "Send mig bare en mail, så jeg ved, at du har fået beskeden.", ru: "Просто отправь мне письмо по почте, чтобы я знал, что ты получила сообщение."},
   {da: "Jeg tager nok først telefonen igen efter frokost.", ru: "Скорее всего, я снова возьму трубку только после обеда."},
   {da: "Tusind tak, og vi ses i overmorgen.", ru: "Большое спасибо, увидимся послезавтра."}
  ],
  questions: [
   {
    q: "Hvad beder Henrik om?",
    options: ["At Sofie sender et tilbud", "At Sofie tager hans møde", "At Sofie ringer til kunderne"],
    answer: 1,
    why: "Первая фраза: Хенрик спрашивает, может ли Софи «tage mit møde» — подменить его на встрече."
   },
   {
    q: "Hvorfor kan Henrik ikke selv komme?",
    options: ["Han skal til Aalborg", "Hans datter er syg", "Han har et andet møde"],
    answer: 1,
    why: "Он должен рано забрать дочь из школы, «fordi hun har feber» — у неё температура. В Ольборг едут клиенты, а не он."
   },
   {
    q: "Hvor holdes mødet?",
    options: ["I et lille kontor i kælderen", "På en café", "I det store mødelokale"],
    answer: 2,
    why: "Сказано: «i det store mødelokale på første sal» — в большом зале для совещаний."
   },
   {
    q: "Hvad finder Sofie i den blå mappe?",
    options: ["Papirerne til mødet", "Et tilbud til kunderne", "Billetter til Aalborg"],
    answer: 0,
    why: "Хенрик говорит: «Du finder alle papirerne i den blå mappe» — это документы к встрече."
   },
   {
    q: "Hvad skal Sofie sige, hvis kunderne spørger om prisen?",
    options: [
     "At prisen allerede er aftalt",
     "At Henrik sender et tilbud i løbet af fredagen",
     "At de selv skal ringe til Henrik"
    ],
    answer: 1,
    why: "Инструкция: «sige, at jeg sender et tilbud i løbet af fredagen» — предложение придёт в пятницу."
   },
   {
    q: "Hvad ønsker Henrik, at Sofie gør bagefter?",
    options: ["Skriver en rapport til chefen", "Sender ham en mail", "Ringer til ham med det samme"],
    answer: 1,
    why: "Он просит: «Send mig bare en mail». Позвонить сразу не получится — трубку он возьмёт только после обеда."
   }
  ]
 },
 {
  id: "reparationscafe-i-noerreby",
  level: "B2",
  topic: "Местные новости",
  title: "Reparationscafé i Nørreby",
  situation: "Вы услышите радиорепортаж об открытии ремонтного кафе в небольшом городе.",
  plays: 2,
  sentences: [
   {
    da: "Og nu til nyt fra lokalområdet. I Nørreby åbner der på lørdag en såkaldt reparationscafé i det gamle forsamlingshus.",
    ru: "А теперь новости нашего района. В Нёрребю в субботу откроется так называемое ремонтное кафе в старом доме собраний."
   },
   {
    da: "Tanken er enkel: I stedet for at smide ødelagte ting ud kan man tage dem med og få hjælp til at reparere dem.",
    ru: "Идея проста: вместо того чтобы выбрасывать сломанные вещи, можно принести их и получить помощь с ремонтом."
   },
   {
    da: "Det kan være en kaffemaskine, en lampe, en cykel eller et par bukser, der skal have ny lynlås.",
    ru: "Это может быть кофемашина, лампа, велосипед или брюки, которым нужна новая молния."
   },
   {da: "Frivillige står klar med værktøj og symaskiner.", ru: "Добровольцы будут наготове с инструментами и швейными машинами."},
   {da: "Det er gratis at komme, men man må gerne give et lille beløb til kaffe og kage.", ru: "Прийти можно бесплатно, но можно оставить небольшую сумму на кофе и пирог."},
   {
    da: "Arrangørerne regner med, at det bliver en travl dag, så de anbefaler, at man kommer før klokken tolv.",
    ru: "Организаторы рассчитывают на загруженный день, поэтому рекомендуют прийти до двенадцати."
   },
   {
    da: "Hvis tingen ikke kan repareres, får man i det mindste en forklaring på, hvorfor.",
    ru: "Если вещь нельзя починить, то по крайней мере получаешь объяснение, почему."
   },
   {da: "Der er åbent mellem klokken ti og klokken fjorten, og alle er velkomne, også børn.", ru: "Открыто с десяти до четырнадцати часов, всем рады, и детям тоже."},
   {
    da: "Arrangørerne mangler desuden flere frivillige, især folk, der kan arbejde med elektronik.",
    ru: "Кроме того, организаторам не хватает добровольцев, особенно людей, умеющих работать с электроникой."
   },
   {
    da: "Du kan skrive til arrangørerne på reparationscaféens hjemmeside, hvis du vil hjælpe.",
    ru: "Если вы хотите помочь, можно написать организаторам на сайте ремонтного кафе."
   }
  ],
  questions: [
   {
    q: "Hvad er en reparationscafé ifølge indslaget?",
    options: [
     "Et sted, hvor man kan købe brugte ting",
     "Et sted, hvor man kan få hjælp til at reparere ting",
     "Et sted, hvor man kan lære at lave kaffe"
    ],
    answer: 1,
    why: "Идея объясняется так: вместо выбрасывания принести вещь и «få hjælp til at reparere dem». Продажа подержанных вещей не упоминается."
   },
   {
    q: "Hvor åbner reparationscaféen?",
    options: ["I et nyt indkøbscenter", "På biblioteket", "I det gamle forsamlingshus"],
    answer: 2,
    why: "В первой фразе названо место: «i det gamle forsamlingshus» — в старом доме собраний."
   },
   {
    q: "Hvad koster det at komme?",
    options: [
     "Man betaler hundrede kroner",
     "Det er gratis, men man må give et lille beløb",
     "Man betaler for hver ting, der repareres"
    ],
    answer: 1,
    why: "Сказано: «Det er gratis at komme, men man må gerne give et lille beløb til kaffe og kage»."
   },
   {
    q: "Hvorfor anbefaler arrangørerne at komme før klokken tolv?",
    options: [
     "Fordi der bliver meget travlt",
     "Fordi caféen lukker klokken tolv",
     "Fordi der kun er kage om formiddagen"
    ],
    answer: 0,
    why: "Причина: организаторы ждут «en travl dag» — загруженный день. Кафе открыто до четырнадцати часов."
   },
   {
    q: "Hvem har arrangørerne især brug for?",
    options: [
     "Folk, der kan arbejde med elektronik",
     "Folk, der kan bage kage",
     "Folk, der kan spille musik"
    ],
    answer: 0,
    why: "В конце сказано: нужны добровольцы, «især folk, der kan arbejde med elektronik»."
   },
   {
    q: "Hvad sker der, hvis en ting ikke kan repareres?",
    options: ["Man får pengene tilbage", "Man får en forklaring", "Man får en ny ting"],
    answer: 1,
    why: "Сказано: «får man i det mindste en forklaring på, hvorfor» — объяснение, почему починить нельзя."
   }
  ]
 }
];
