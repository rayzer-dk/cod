// pd3-listening-more-data: additional PD3 listening fragments (see docs/pd3-schema.md). Plain data module, no imports. All names and organisations are fictional.
export const listeningMore=[
 {
  id: "overraskelse-til-en-kollega",
  level: "B1",
  topic: "Работа: диалог коллег",
  title: "Overraskelse til en kollega",
  situation: "Вы услышите разговор двух коллег, которые готовят сюрприз.",
  plays: 2,
  sentences: [
   {da: "Anna: Hej Mikkel, har du et øjeblik? Jeg vil gerne tale med dig om Lenes fødselsdag.", ru: "Анна: Привет, Миккель, у тебя есть минутка? Я хочу поговорить с тобой о дне рождения Лене."},
   {da: "Mikkel: Ja, selvfølgelig. Den er på fredag, ikke?", ru: "Миккель: Да, конечно. Он в пятницу, да?"},
   {da: "Anna: Jo, og jeg synes, at vi skal lave en lille overraskelse til hende.", ru: "Анна: Да, и я думаю, что нам стоит устроить для неё небольшой сюрприз."},
   {da: "Mikkel: Det lyder godt. Men hvornår skal vi holde festen? Hun er jo på kontoret allerede klokken otte.", ru: "Миккель: Звучит хорошо. Но когда мы будем праздновать? Она ведь в офисе уже в восемь."},
   {da: "Anna: Jeg tænkte efter frokost, klokken halv et, i kantinen. Lene har møde med en kunde hele formiddagen, så vi kan pynte, mens hun er væk.", ru: "Анна: Я думала после обеда, в половине первого, в столовой. У Лене всё утро встреча с клиентом, так что мы сможем украсить зал, пока её нет."},
   {da: "Mikkel: Perfekt. Skal jeg bestille en kage? Jeg kender et bageri, som laver fantastiske lagkager.", ru: "Миккель: Отлично. Мне заказать торт? Я знаю пекарню, где делают великолепные многослойные торты."},
   {da: "Anna: Ja tak, det vil være en stor hjælp. Jeg tager mig af gaven og samler penge ind.", ru: "Анна: Да, пожалуйста, это очень поможет. Подарком займусь я и соберу деньги."},
   {da: "Mikkel: Har du en idé til, hvad vi skal give hende?", ru: "Миккель: У тебя есть идея, что нам ей подарить?"},
   {da: "Anna: Lene har tit sagt, at hun gerne vil lære at male. Derfor tænkte jeg på et kursus på aftenskolen.", ru: "Анна: Лене часто говорила, что хочет научиться рисовать красками. Поэтому я подумала о курсе в вечерней школе."},
   {da: "Mikkel: Det er en rigtig god gave. Skal vi sige det til Jonas nu?", ru: "Миккель: Это очень хороший подарок. Скажем об этом Йонасу сейчас?"},
   {da: "Anna: Nej, vent lidt. Jonas kan aldrig holde på en hemmelighed, så vi fortæller det først torsdag eftermiddag.", ru: "Анна: Нет, подожди. Йонас никогда не умеет хранить секреты, поэтому мы скажем ему только в четверг после обеда."},
   {da: "Mikkel: Det er fint. Så bestiller jeg kagen allerede i morgen.", ru: "Миккель: Хорошо. Тогда я закажу торт уже завтра."}
  ],
  questions: [
   {
    q: "Hvad planlægger Anna og Mikkel?",
    options: ["En overraskelsesfest for en kollega","Et møde med en vigtig kunde","Et kursus for alle på kontoret"],
    answer: 0,
    why: "Anna начинает разговор словами о маленьком сюрпризе для Лене, и дальше они обсуждают время, торт и подарок для праздника."
   },
   {
    q: "Hvornår skal festen begynde?",
    options: ["Klokken otte","Torsdag eftermiddag","Klokken halv et"],
    answer: 2,
    why: "Анна предлагает праздновать после обеда, «klokken halv et». Восемь — время, когда Лене приходит на работу, а четверг — когда скажут Йонасу."
   },
   {
    q: "Hvorfor kan de pynte, uden at Lene opdager det?",
    options: ["Hun har fri hele fredagen","Hun er optaget af et kundemøde om formiddagen","Hun kommer først efter frokost"],
    answer: 1,
    why: "Анна говорит, что у Лене встреча с клиентом всё утро, поэтому зал можно украсить, пока её нет. Выходного у неё нет: в восемь она уже в офисе."
   },
   {
    q: "Hvad lover Mikkel at gøre?",
    options: ["Bestille en lagkage","Samle penge ind","Købe gaven"],
    answer: 0,
    why: "Миккель сам предлагает заказать торт в пекарне, а сбор денег и подарок берёт на себя Анна."
   },
   {
    q: "Hvad vil de give Lene i gave?",
    options: ["En kage fra et bageri","Penge til en rejse","Undervisning i at male"],
    answer: 2,
    why: "Анна напоминает, что Лене хочет научиться рисовать, и предлагает курс в вечерней школе; Миккель согласен."
   },
   {
    q: "Hvorfor vil Anna vente med at fortælle det til Jonas?",
    options: ["Han har ikke tid til at hjælpe","Han kan ikke holde noget hemmeligt","Han er ikke inviteret til festen"],
    answer: 1,
    why: "Анна объясняет, что Йонас не умеет хранить секреты, поэтому ему скажут только в четверг. О приглашении и занятости речи нет."
   }
  ]
 },
 {
  id: "interview-om-byttemarked",
  level: "B2",
  topic: "Местная жизнь: радиоинтервью",
  title: "Interview om et byttemarked",
  situation: "Вы услышите радиоинтервью с женщиной, которая организовала обменный рынок вещей.",
  plays: 2,
  sentences: [
   {da: "Søren: Goddag og velkommen til Morgenradioen. I dag har jeg besøg af Birgitte Holm, som har startet et byttemarked i sit nabolag.", ru: "Серен: Добрый день и добро пожаловать в утреннее радио. Сегодня у меня в гостях Биргитте Хольм, которая организовала в своём районе обменный рынок."},
   {da: "Søren: Fortæl lidt om, hvordan det hele begyndte.", ru: "Серен: Расскажите немного о том, как всё начиналось."},
   {da: "Birgitte: Det var for to år siden. Mine børn voksede hele tiden ud af deres tøj, og jeg blev træt af at smide det ud, selvom det næsten var nyt.", ru: "Биргитте: Это было два года назад. Мои дети всё время вырастали из одежды, и мне надоело выбрасывать её, хотя она была почти новой."},
   {da: "Birgitte: Jeg tænkte, at andre kunne få glæde af det, så jeg satte en seddel op i opgangen. Første gang kom der kun ti mennesker, men nu kommer der næsten hundrede hver gang.", ru: "Биргитте: Я подумала, что другим эти вещи могут пригодиться, и повесила в подъезде объявление. В первый раз пришло только десять человек, а теперь приходит почти сто каждый раз."},
   {da: "Søren: Hvad kan man bytte?", ru: "Серен: Что можно обменять?"},
   {da: "Birgitte: Tøj, legetøj, bøger og køkkenting. Kravet er, at tingene skal være rene og hele. Man behøver ikke at give noget for at tage noget, men de fleste vil gerne bidrage.", ru: "Биргитте: Одежду, игрушки, книги и кухонную утварь. Требование одно: вещи должны быть чистыми и целыми. Не обязательно что-то отдавать, чтобы что-то взять, но большинство хотят внести свой вклад."},
   {da: "Søren: Hvad sker der med de ting, som ingen vil have?", ru: "Серен: Что происходит с вещами, которые никому не нужны?"},
   {da: "Birgitte: Det var vores største problem i starten. Nu kører en frivillig det hele til en genbrugsbutik, når markedet er slut.", ru: "Биргитте: Вначале это была наша самая большая проблема. Теперь один из волонтёров отвозит всё это в магазин секонд-хенда, когда рынок заканчивается."},
   {da: "Søren: Hvornår er der byttemarked næste gang?", ru: "Серен: Когда следующий обменный рынок?"},
   {da: "Birgitte: På lørdag, fra klokken ti til klokken tolv, i fælleshuset på Rosenvej. Det er gratis, og alle er velkomne.", ru: "Биргитте: В субботу, с десяти до двенадцати, в общинном доме на Розенвей. Вход бесплатный, и все приглашаются."},
   {da: "Søren: Hvad håber du, at lytterne vil gøre?", ru: "Серен: Что, как вы надеетесь, сделают слушатели?"},
   {da: "Birgitte: Jeg håber, at nogen bliver inspireret til at starte noget lignende i deres eget område. Det kræver kun lidt tid og en seddel i opgangen.", ru: "Биргитте: Надеюсь, что кто-нибудь вдохновится и начнёт что-то подобное в своём районе. Для этого нужно совсем немного времени и объявление в подъезде."}
  ],
  questions: [
   {
    q: "Hvad handler interviewet om?",
    options: ["En ny butik med brugt tøj","Et marked, hvor naboer bytter ting","Regler for affald i opgangen"],
    answer: 1,
    why: "Ведущий представляет гостью как организатора обменного рынка в районе, и весь разговор — о том, как люди меняются вещами."
   },
   {
    q: "Hvorfor begyndte Birgitte at arrangere markedet?",
    options: ["Hun ville tjene penge til sine børn","Hun skulle tømme sin lejlighed før en flytning","Hun ville ikke smide børnenes næsten nye tøj væk"],
    answer: 2,
    why: "Биргитте говорит, что дети росли из одежды, а ей надоело выбрасывать почти новые вещи. О деньгах и переезде речи нет."
   },
   {
    q: "Hvilken betingelse er der for de ting, man afleverer?",
    options: ["De skal være i ordentlig stand","De skal være dyre og nye","De skal være til børn"],
    answer: 0,
    why: "Единственное требование — вещи чистые и целые, то есть в хорошем состоянии. Ни новизна, ни цена, ни детский ассортимент не требуются: приносят и книги, и кухонные вещи."
   },
   {
    q: "Hvad sker der med de ting, der er tilbage efter markedet?",
    options: ["Arrangørerne beholder dem til næste gang","En hjælper bringer dem til en butik med brugte ting","Naboerne får dem gratis i opgangen"],
    answer: 1,
    why: "Биргитте объясняет, что остатки теперь отвозит в магазин секонд-хенда волонтёр. Раньше это была главная проблема."
   },
   {
    q: "Hvor længe varer det næste marked?",
    options: ["Fire timer","En halv time","To timer"],
    answer: 2,
    why: "Биргитте говорит, что рынок идёт с десяти до двенадцати, то есть два часа. Четыре часа или полчаса в тексте не названы."
   },
   {
    q: "Hvad ønsker Birgitte til sidst?",
    options: ["At lytterne starter noget lignende i deres område","At flere lyttere giver hende penge","At kommunen lejer et større hus til hende"],
    answer: 0,
    why: "В конце она говорит, что надеется на вдохновение слушателей начать нечто подобное у себя, ведь для этого нужно мало времени. Денег и помещения она не просит."
   }
  ]
 },
 {
  id: "meddelelse-i-svoemmehallen",
  level: "B1",
  topic: "Общественные места: объявление в бассейне",
  title: "Meddelelse i svømmehallen",
  situation: "Вы услышите объявление по громкой связи в плавательном бассейне.",
  plays: 2,
  sentences: [
   {da: "Kære gæster i Lærkeby Svømmehal, vi har nogle vigtige oplysninger til jer.", ru: "Уважаемые гости бассейна «Леркебю», у нас есть для вас важная информация."},
   {da: "På grund af et problem med pumpen er den store rutsjebane lukket resten af dagen.", ru: "Из-за неполадки с насосом большая водная горка закрыта до конца дня."},
   {da: "Vi beklager meget, men vi regner med, at den åbner igen i morgen formiddag.", ru: "Мы приносим глубокие извинения, но рассчитываем, что она снова откроется завтра в первой половине дня."},
   {da: "Fra klokken to til klokken fire i eftermiddag har en skoleklasse svømmeundervisning i det store bassin.", ru: "С двух до четырёх часов дня в большом бассейне у школьного класса урок плавания."},
   {da: "I den tid kan de andre gæster bruge bassinet med varmt vand eller børnebassinet.", ru: "В это время остальные гости могут пользоваться бассейном с тёплой водой или детским бассейном."},
   {da: "Husk at tage et grundigt brusebad, før du går i vandet, og at låse dine ting inde i et skab.", ru: "Не забудьте тщательно принять душ перед тем, как войти в воду, и запереть свои вещи в шкафчике."},
   {da: "Skabene kan låses med det armbånd, som du fik i kassen.", ru: "Шкафчики запираются тем браслетом, который вы получили на кассе."},
   {da: "Hvis du mister dit armbånd, skal du henvende dig i receptionen.", ru: "Если вы потеряете браслет, обратитесь на ресепшен."},
   {da: "Caféen ved indgangen holder åbent til klokken seks, og i dag er der tilbud på varm kakao og boller.", ru: "Кафе у входа открыто до шести часов, а сегодня действует предложение на горячее какао и булочки."},
   {da: "Svømmehallen lukker klokken otte i aften, og vi beder alle om at forlade vandet klokken kvart i otte.", ru: "Бассейн закрывается сегодня в восемь вечера, и мы просим всех выйти из воды без четверти восемь."},
   {da: "Tak for jeres opmærksomhed, og god fornøjelse.", ru: "Спасибо за внимание и приятного отдыха."}
  ],
  questions: [
   {
    q: "Hvad er formålet med meddelelsen?",
    options: ["At reklamere for et nyt svømmekursus","At advare mod dårligt vejr","At fortælle om ændringer og praktiske ting"],
    answer: 2,
    why: "В объявлении говорится о закрытой горке, уроке плавания, шкафчиках и часах работы, то есть о практических изменениях. Рекламы курса и предупреждения о погоде нет."
   },
   {
    q: "Hvorfor er rutsjebanen lukket?",
    options: ["Der er noget galt med en teknisk del","Børnene har ikke lov til at bruge den","Den skal males i morgen"],
    answer: 0,
    why: "Горка закрыта из-за неполадки с насосом — это техническая причина. О запрете для детей и покраске не говорится."
   },
   {
    q: "Hvor kan andre gæster svømme mellem klokken to og klokken fire?",
    options: ["I det store bassin sammen med skoleklassen","I det varme bassin og i børnebassinet","Ingen steder, for hallen er lukket"],
    answer: 1,
    why: "Большой бассейн занят классом, но остальные гости могут пользоваться бассейном с тёплой водой и детским. Весь бассейн не закрыт."
   },
   {
    q: "Hvad skal man gøre, hvis man mister sit armbånd?",
    options: ["Gå hen til receptionen","Købe et nyt i caféen","Vente til svømmehallen lukker"],
    answer: 0,
    why: "Прямо сказано: при потере браслета нужно обратиться на ресепшен. Кафе упоминается только из-за какао и булочек."
   },
   {
    q: "Hvornår skal gæsterne være ude af vandet?",
    options: ["Klokken otte","Klokken kvart i otte","Klokken seks"],
    answer: 1,
    why: "Бассейн закрывается в восемь, но выйти из воды просят без четверти восемь. Шесть часов — время закрытия кафе."
   },
   {
    q: "Hvad opfordrer meddelelsen gæsterne til at gøre, før de svømmer?",
    options: ["At købe et armbånd i caféen","At melde sig til undervisning","At tage brusebad og låse deres ting inde"],
    answer: 2,
    why: "Перед входом в воду просят принять душ и запереть вещи в шкафчике. Браслет выдают на кассе, а урок плавания только у школьного класса."
   }
  ]
 },
 {
  id: "talebesked-fra-skolen",
  level: "B2",
  topic: "Школа: голосовая почта для родителей",
  title: "Talebesked fra skolen",
  situation: "Вы услышите голосовое сообщение школы для родителей с тремя пунктами, временем и номером телефона.",
  plays: 2,
  sentences: [
   {da: "Goddag, det er Hanne Vinther fra Månebjergskolen. Jeg ringer til alle forældre i fjerde klasse med tre vigtige beskeder.", ru: "Добрый день, это Ханне Винтер из школы «Монебьергскоулен». Я звоню всем родителям четвёртого класса с тремя важными сообщениями."},
   {da: "For det første skal klassen på udflugt til skoven onsdag i næste uge.", ru: "Во-первых, класс поедет на экскурсию в лес в среду на следующей неделе."},
   {da: "Børnene skal møde på skolen klokken otte og kommer hjem igen klokken tre.", ru: "Дети должны прийти в школу в восемь часов и вернутся домой в три."},
   {da: "De skal have praktisk tøj på og tage en madpakke og en drikkedunk med, for der er ingen kiosk i skoven.", ru: "На них должна быть практичная одежда, и они должны взять с собой бутерброды и бутылку для питья, потому что в лесу нет киоска."},
   {da: "For det andet holder vi forældremøde torsdag den tolvte.", ru: "Во-вторых, родительское собрание мы проводим в четверг, двенадцатого числа."},
   {da: "Mødet begynder klokken syv om aftenen i klasselokalet og varer cirka halvanden time.", ru: "Собрание начинается в семь вечера в классной комнате и длится примерно полтора часа."},
   {da: "For det tredje mangler vi to forældre, som vil hjælpe med at bage kager til julemarkedet.", ru: "В-третьих, нам не хватает двух родителей, которые согласятся помочь испечь пироги для рождественской ярмарки."},
   {da: "Hvis du har lyst, kan du ringe til mig på telefonnummer femogtyve, otteogtredive, nul fire, ti.", ru: "Если вы захотите, можете позвонить мне по номеру телефона двадцать пять, тридцать восемь, ноль четыре, десять."},
   {da: "Jeg sidder på kontoret hver morgen mellem klokken otte og klokken ti, men ikke om fredagen.", ru: "Я сижу в кабинете каждое утро с восьми до десяти, но не по пятницам."},
   {da: "Tak for jeres tid, og god weekend.", ru: "Спасибо, что уделили время, и хороших выходных."}
  ],
  questions: [
   {
    q: "Hvad er hovedformålet med beskeden?",
    options: ["At aflyse en tur til skoven","At give forældrene flere praktiske oplysninger","At bede om hjælp til et nyt skolebyggeri"],
    answer: 1,
    why: "Ханне перечисляет три объявления: экскурсия, собрание и просьба о помощи с выпечкой. Это практическая информация, а не отмена поездки или стройка."
   },
   {
    q: "Hvor mange timer går der fra børnene møder, til de er hjemme igen på udflugtsdagen?",
    options: ["Syv timer","Fem timer","Tolv timer"],
    answer: 0,
    why: "Дети приходят в восемь и возвращаются домой в три, то есть через семь часов. Остальные цифры не следуют из текста."
   },
   {
    q: "Hvad skal børnene have med til skoven?",
    options: ["Penge til at købe mad i kiosken","En seddel fra forældrene","Mad og noget at drikke hjemmefra"],
    answer: 2,
    why: "В лесу нет киоска, поэтому нужны бутерброды и бутылка для питья из дома. О деньгах и записке речи нет."
   },
   {
    q: "Hvornår begynder forældremødet?",
    options: ["Onsdag formiddag klokken otte","Torsdag aften klokken syv","Torsdag eftermiddag klokken tre"],
    answer: 1,
    why: "Собрание — в четверг в семь вечера. Среда и восемь часов относятся к экскурсии, а три часа — ко времени возвращения домой."
   },
   {
    q: "Hvad kan nogle forældre hjælpe med?",
    options: ["At bage til julemarkedet","At følge med børnene i skoven","At sælge kager i kiosken"],
    answer: 0,
    why: "Школа ищет двух родителей, чтобы они помогли испечь пироги для рождественской ярмарки. Сопровождение детей и киоск не упоминаются."
   },
   {
    q: "Hvornår er det bedst at ringe til Hanne?",
    options: ["Hver eftermiddag efter klokken tre","Kun om fredagen","Hver morgen undtagen fredag"],
    answer: 2,
    why: "Ханне сидит в кабинете каждое утро с восьми до десяти, но не по пятницам. После обеда и по пятницам её не застать."
   }
  ]
 },
 {
  id: "nyhed-om-forsinket-cykelbro",
  level: "B2",
  topic: "Новости: местный выпуск",
  title: "Nyhed om en forsinket cykelbro",
  situation: "Вы услышите заметку из выпуска местных новостей по радио.",
  plays: 2,
  sentences: [
   {da: "Nu til de lokale nyheder. Den nye cykelbro over åen i Ravnsby åbner først om tre uger.", ru: "Теперь к местным новостям. Новый велосипедный мост через речку в Равнсбю откроется только через три недели."},
   {da: "Det oplyser kommunen, som tidligere havde regnet med, at broen kunne åbne allerede på mandag.", ru: "Об этом сообщает коммуна, которая ранее рассчитывала, что мост сможет открыться уже в понедельник."},
   {da: "Forsinkelsen skyldes, at den sidste del af stålet kom for sent fra leverandøren.", ru: "Задержка вызвана тем, что последняя партия стали пришла от поставщика слишком поздно."},
   {da: "Kommunens tekniske chef, Lars Brandt, siger, at han er skuffet, men at sikkerheden er vigtigere end tiden.", ru: "Технический руководитель коммуны Ларс Брандт говорит, что разочарован, но безопасность важнее времени."},
   {da: "Broen skal gøre det nemmere for børn at cykle til skole, fordi de ikke længere skal krydse den store vej.", ru: "Мост должен облегчить детям поездки в школу на велосипеде, потому что им больше не придётся переходить большую дорогу."},
   {da: "Indtil broen åbner, anbefaler kommunen, at cyklisterne bruger stien langs åen, selvom den er lidt længere.", ru: "Пока мост не открыт, коммуна рекомендует велосипедистам пользоваться дорожкой вдоль речки, хотя она немного длиннее."},
   {da: "Omkring hundrede mennesker havde meldt sig til en lille åbningsfest.", ru: "Около ста человек записались на небольшое праздничное открытие."},
   {da: "De får besked om den nye dato på mail, så de behøver ikke at ringe til kommunen.", ru: "О новой дате им сообщат по электронной почте, так что звонить в коммуну не нужно."},
   {da: "Åbningsfesten bliver flyttet til en lørdag, og der kommer også musik for børnene.", ru: "Праздничное открытие перенесут на субботу, и для детей будет ещё и музыка."},
   {da: "Det var lokalnyhederne.", ru: "Это были местные новости."}
  ],
  questions: [
   {
    q: "Hvad er det vigtigste budskab i nyheden?",
    options: ["En bro er blevet lukket for altid","En bro bliver bygget et nyt sted","En bro åbner senere end planlagt"],
    answer: 2,
    why: "Сообщение начинается с того, что мост откроется только через три недели, хотя ждали понедельника. Закрытия навсегда и нового места не было."
   },
   {
    q: "Hvorfor er broen forsinket?",
    options: ["Et materiale blev leveret for sent","Der er fundet fejl i tegningerne","Vejret har været for dårligt"],
    answer: 0,
    why: "Причина названа прямо: последняя партия стали пришла от поставщика слишком поздно. О чертежах и погоде не говорится."
   },
   {
    q: "Hvordan har Lars Brandt det med forsinkelsen?",
    options: ["Han synes, at det er ligegyldigt","Han er skuffet, men vil have sikkerhed først","Han er vred på leverandøren"],
    answer: 1,
    why: "Брандт говорит, что разочарован, но считает безопасность важнее времени. Равнодушия и злости на поставщика в тексте нет."
   },
   {
    q: "Hvem får især glæde af den nye bro?",
    options: ["Bilister på den store vej","Børn på vej til skole","Turister ved åen"],
    answer: 1,
    why: "Мост должен облегчить детям дорогу в школу, так как им не придётся пересекать большую дорогу. Автомобилисты и туристы не упоминаются."
   },
   {
    q: "Hvad anbefaler kommunen, indtil broen er klar?",
    options: ["At man cykler ad stien ved åen","At man tager bussen til skole","At man krydser den store vej"],
    answer: 0,
    why: "Коммуна советует пользоваться дорожкой вдоль речки, хотя она длиннее. Автобус не упоминается, а переходить большую дорогу как раз хотят избежать."
   },
   {
    q: "Hvad skal dem, der var tilmeldt åbningsfesten, gøre nu?",
    options: ["Ringe til kommunen for at få deres penge igen","Møde op ved broen på mandag","Vente på en besked om den nye dato"],
    answer: 2,
    why: "Записавшимся сообщат новую дату по почте, и звонить не нужно. В понедельник мост не откроется, а о деньгах речи нет."
   }
  ]
 },
 {
  id: "instruktion-til-pakkeboks",
  level: "B1",
  topic: "Быт: инструкция к посылочному автомату",
  title: "Sådan bruger du pakkeboksen",
  situation: "Вы услышите инструкцию, как пользоваться посылочным автоматом в подъезде.",
  plays: 2,
  sentences: [
   {da: "Sådan bruger du den nye pakkeboks i opgangen.", ru: "Как пользоваться новым посылочным автоматом в подъезде."},
   {da: "Først skal du vente på en besked på din telefon, som fortæller, at din pakke er kommet.", ru: "Сначала нужно дождаться сообщения на телефоне о том, что ваша посылка пришла."},
   {da: "I beskeden finder du en kode med seks cifre.", ru: "В сообщении вы найдёте код из шести цифр."},
   {da: "Gå derefter hen til skærmen ved døren, og tryk på knappen, hvor der står hent pakke.", ru: "Затем подойдите к экрану у двери и нажмите кнопку с надписью «получить посылку»."},
   {da: "Skriv koden ind på skærmen. Hvis du taster forkert tre gange, bliver skærmen låst i ti minutter.", ru: "Введите код на экране. Если вы трижды ошибётесь, экран будет заблокирован на десять минут."},
   {da: "Når koden er rigtig, åbner en af de store låger sig af sig selv.", ru: "Когда код верный, одна из больших дверец откроется сама."},
   {da: "Tag din pakke, og luk lågen igen, så boksen kan bruges af de andre beboere.", ru: "Возьмите посылку и снова закройте дверцу, чтобы остальные жильцы могли пользоваться автоматом."},
   {da: "Du har fem dage til at hente pakken. Derefter bliver den sendt tilbage til afsenderen.", ru: "У вас есть пять дней, чтобы забрать посылку. После этого её отправят обратно отправителю."},
   {da: "Hvis skærmen ikke virker, skal du ringe til servicenummeret, som står på siden af boksen.", ru: "Если экран не работает, позвоните по номеру службы поддержки, который написан сбоку на автомате."},
   {da: "Du kan også sende en pakke ved at vælge knappen send pakke.", ru: "Вы также можете отправить посылку, выбрав кнопку «отправить посылку»."}
  ],
  questions: [
   {
    q: "Hvad handler instruktionen om?",
    options: ["Hvordan man henter sin pakke fra en automat","Hvordan man pakker en gave ind","Hvordan man betaler for en ny telefon"],
    answer: 0,
    why: "Вся инструкция описывает по шагам, как получить посылку из автомата в подъезде. Упаковка подарков и оплата телефона не упоминаются."
   },
   {
    q: "Hvad skal man gøre først?",
    options: ["Trykke på knappen ved døren","Vente på en besked med en kode","Ringe til servicenummeret"],
    answer: 1,
    why: "Первый шаг — дождаться сообщения на телефоне, где будет код. Кнопку нажимают позже, а звонок нужен только при поломке экрана."
   },
   {
    q: "Hvad sker der, hvis man indtaster koden forkert flere gange i træk?",
    options: ["Pakken bliver sendt tilbage med det samme","Man får en ny kode på sin telefon","Man kan ikke bruge skærmen et stykke tid"],
    answer: 2,
    why: "После трёх ошибок экран блокируется на десять минут. Посылку сразу не возвращают, и новый код не присылают."
   },
   {
    q: "Hvorfor skal man lukke lågen efter at have taget sin pakke?",
    options: ["Så andre også kan bruge boksen","Så pakken ikke bliver stjålet","Så skærmen ikke bliver låst"],
    answer: 0,
    why: "Дверцу нужно закрыть, чтобы остальные жильцы могли пользоваться автоматом. Кражи и блокировки экрана в этом контексте не упомянуты."
   },
   {
    q: "Hvad sker der, hvis man ikke henter pakken inden for fem dage?",
    options: ["Den bliver lagt i en anden boks","Den bliver sendt tilbage til afsenderen","Den bliver givet til naboen"],
    answer: 1,
    why: "Если посылку не забрать за пять дней, её отправляют обратно отправителю. Другого автомата или соседа в тексте нет."
   },
   {
    q: "Hvad skal man gøre, hvis skærmen ikke virker?",
    options: ["Vente til næste dag og prøve igen","Åbne en låge med koden fra beskeden","Ringe til det nummer, der står på boksen"],
    answer: 2,
    why: "Если экран не работает, надо позвонить по номеру службы, написанному сбоку. Ждать до завтра или вводить код без экрана нельзя."
   }
  ]
 },
 {
  id: "stroemafbrydelse-i-opgangen",
  level: "B2",
  topic: "Рассказ от первого лица: отключение света",
  title: "Da lyset gik ud",
  situation: "Вы услышите рассказ человека о том, как в его подъезде отключили электричество.",
  plays: 2,
  sentences: [
   {da: "Sidste vinter var der strømafbrydelse i vores opgang en torsdag aften.", ru: "Прошлой зимой в нашем подъезде в один из четвергов вечером отключили электричество."},
   {da: "Jeg var lige kommet hjem fra arbejde og var i gang med at lave aftensmad, da alle lysene pludselig gik ud.", ru: "Я только что пришёл с работы и готовил ужин, как вдруг весь свет погас."},
   {da: "Først troede jeg, at det kun var vores lejlighed, så jeg gik ud på trappen med min telefon som lommelygte.", ru: "Сначала я подумал, что это только в нашей квартире, и вышел на лестницу с телефоном вместо фонарика."},
   {da: "Dér stod næsten hele opgangen. Naboerne stod med stearinlys og snakkede højt, og jeg kendte kun to af dem i forvejen.", ru: "Там стоял почти весь подъезд. Соседи стояли со свечами и громко разговаривали, а я знал из них раньше только двоих."},
   {da: "Manden fra første sal, som aldrig siger hej, kom med en termokande fuld af varm te.", ru: "Мужчина со второго этажа, который никогда не здоровается, пришёл с термосом, полным горячего чая."},
   {da: "En kvinde fra stuen hentede nogle gamle brætspil, og snart sad vi på trappen og spillede.", ru: "Женщина с первого этажа принесла старые настольные игры, и вскоре мы уже сидели на лестнице и играли."},
   {da: "Børnene syntes, at det var det mest spændende, der nogensinde var sket, og de løb op og ned ad trapperne med deres lommelygter.", ru: "Детям казалось, что это самое захватывающее событие на свете, и они бегали вверх и вниз по лестнице со своими фонариками."},
   {da: "Efter halvanden time kom strømmen tilbage, og vi gik tilbage til hver vores lejlighed.", ru: "Через полтора часа электричество вернулось, и мы разошлись по своим квартирам."},
   {da: "Næste dag hang der en seddel på døren til opgangen, hvor der stod: Skal vi ses igen, også når lyset virker?", ru: "На следующий день на двери подъезда висела записка: «Увидимся ещё раз, даже когда свет будет работать?»"},
   {da: "Siden da har vi mødtes den første fredag i hver måned.", ru: "С тех пор мы встречаемся в первую пятницу каждого месяца."}
  ],
  questions: [
   {
    q: "Hvad handler fortællingen om?",
    options: ["En ulykke, hvor et barn kom til skade","Et skænderi om en regning fra elselskabet","Et strømsvigt, som bragte naboerne sammen"],
    answer: 2,
    why: "Из-за отключения света соседи собрались на лестнице, пили чай, играли и потом стали встречаться регулярно. Ни травмы, ни ссоры в рассказе нет."
   },
   {
    q: "Hvad gjorde fortælleren først, da lyset gik ud?",
    options: ["Gik ud på trappen for at se, om andre også havde problemet","Ringede til elselskabet for at klage","Gik i seng og ventede på, at strømmen kom tilbage"],
    answer: 0,
    why: "Рассказчик думал, что проблема только в его квартире, и вышел на лестницу с телефоном. О звонке в компанию и сне речи нет."
   },
   {
    q: "Hvor godt kendte fortælleren sine naboer før strømsvigtet?",
    options: ["Alle sammen meget godt","Kun nogle ganske få","Slet ikke nogen af dem"],
    answer: 1,
    why: "Он знал из соседей раньше только двоих, то есть совсем немногих. «Всех хорошо» или «никого» не подходит."
   },
   {
    q: "Hvad bidrog manden fra første sal med?",
    options: ["Lys til hele opgangen","Et brætspil til børnene","Noget varmt at drikke"],
    answer: 2,
    why: "Мужчина со второго этажа принёс термос с горячим чаем. Игры принесла женщина с первого этажа, а свечи были у соседей."
   },
   {
    q: "Hvordan oplevede børnene situationen?",
    options: ["Som noget spændende","Som noget, der skræmte dem","Som noget kedeligt"],
    answer: 0,
    why: "Детям это казалось самым захватывающим событием, и они бегали по лестнице с фонариками. Ни страха, ни скуки нет."
   },
   {
    q: "Hvad skete der efter strømsvigtet?",
    options: ["Beboerne flyttede til en anden opgang","Naboerne begyndte at mødes jævnligt","Børnene fik forbud mod at lege på trappen"],
    answer: 1,
    why: "Записка на двери и фраза «с тех пор мы встречаемся в первую пятницу каждого месяца» показывают, что соседи начали регулярно собираться."
   }
  ]
 },
 {
  id: "hos-laegen-med-hovedpine",
  level: "B2",
  topic: "Здоровье: приём у врача",
  title: "Hos lægen med hovedpine",
  situation: "Вы услышите разговор пациента с врачом о частых головных болях.",
  plays: 2,
  sentences: [
   {da: "Lægen: Goddag, kom indenfor og sæt dig. Hvad kan jeg hjælpe dig med i dag?", ru: "Врач: Добрый день, проходите и садитесь. Чем я могу вам помочь сегодня?"},
   {da: "Patienten: Goddag. Jeg har haft hovedpine næsten hver dag i de sidste tre uger.", ru: "Пациент: Добрый день. У меня почти каждый день болит голова последние три недели."},
   {da: "Lægen: Det lyder ubehageligt. Hvornår på dagen er den værst?", ru: "Врач: Звучит неприятно. В какое время дня боль самая сильная?"},
   {da: "Patienten: Som regel om eftermiddagen. Om morgenen har jeg det fint, men når jeg har siddet foran skærmen i flere timer, begynder det.", ru: "Пациент: Как правило, во второй половине дня. Утром я чувствую себя хорошо, но когда несколько часов просижу перед экраном, всё начинается."},
   {da: "Lægen: Sover du godt om natten? Og drikker du nok vand i løbet af dagen?", ru: "Врач: Хорошо ли вы спите по ночам? И пьёте ли вы достаточно воды в течение дня?"},
   {da: "Patienten: Jeg sover ret godt, men jeg glemmer ofte at drikke, fordi jeg har travlt på arbejdet.", ru: "Пациент: Сплю я довольно хорошо, но часто забываю пить, потому что на работе у меня много дел."},
   {da: "Lægen: Jeg har målt dit blodtryk, og det er helt normalt. Så jeg tror ikke, at der er noget alvorligt galt.", ru: "Врач: Я измерил ваше давление, оно совершенно нормальное. Так что, думаю, ничего серьёзного нет."},
   {da: "Lægen: Jeg vil gerne have, at du holder en pause fra skærmen hver time og drikker et glas vand.", ru: "Врач: Я хочу, чтобы вы каждый час делали перерыв в работе с экраном и пили стакан воды."},
   {da: "Lægen: Du bør også få undersøgt dine øjne hos en optiker, for måske har du brug for briller.", ru: "Врач: Вам также стоит проверить глаза у оптика, потому что, возможно, вам нужны очки."},
   {da: "Patienten: Det lyder fornuftigt. Skal jeg komme igen, hvis det ikke bliver bedre?", ru: "Пациент: Звучит разумно. Нужно ли мне прийти снова, если не станет лучше?"},
   {da: "Lægen: Ja, kom igen om fjorten dage, og hvis du får ondt i hovedet sammen med feber, skal du ringe med det samme.", ru: "Врач: Да, приходите снова через две недели, а если у вас заболит голова и поднимется температура, сразу звоните."}
  ],
  questions: [
   {
    q: "Hvorfor er patienten hos lægen?",
    options: ["Han har brug for en sygemelding","Han har tit ondt i hovedet","Han vil have målt sin vægt"],
    answer: 1,
    why: "Пациент жалуется на головную боль почти каждый день последние три недели. Больничный и вес не обсуждаются."
   },
   {
    q: "Hvornår har patienten mest ondt?",
    options: ["Sidst på dagen efter lang tid ved skærmen","Lige efter han er stået op","Når han sover dårligt om natten"],
    answer: 0,
    why: "Боль начинается после нескольких часов перед экраном, как правило, во второй половине дня. Утром и из-за плохого сна боли нет — спит он хорошо."
   },
   {
    q: "Hvad siger lægen om blodtrykket?",
    options: ["Det skal måles igen","Det er for højt","Det er normalt"],
    answer: 2,
    why: "Врач говорит, что давление абсолютно нормальное, поэтому серьёзной проблемы он не видит."
   },
   {
    q: "Hvad mener lægen er en sandsynlig årsag til hovedpinen?",
    options: ["En alvorlig sygdom","For lidt hvile fra skærmen og for lidt vand","For meget motion"],
    answer: 1,
    why: "Врач советует перерывы в работе с экраном и больше воды, а серьёзной болезни не подозревает. О нагрузках речь не идёт."
   },
   {
    q: "Hvorfor foreslår lægen, at patienten går til en optiker?",
    options: ["Patienten kan måske have brug for briller","Optikeren kan give ham medicin","Optikeren kan måle hans blodtryk"],
    answer: 0,
    why: "Врач говорит, что пациенту, возможно, нужны очки, и поэтому советует проверить зрение. Лекарства и давление оптик не назначает и не измеряет."
   },
   {
    q: "Hvornår skal patienten ringe med det samme?",
    options: ["Hvis han glemmer at drikke vand","Hvis han ikke kan komme om fjorten dage","Hvis han får hovedpine og feber"],
    answer: 2,
    why: "Звонить сразу нужно только при головной боли с температурой. Забытая вода и перенос приёма — не повод для срочного звонка."
   }
  ]
 },
 {
  id: "debat-om-bilfri-bymidte",
  level: "B2",
  topic: "Обсуждение: за и против",
  title: "Debat om en bilfri bymidte",
  situation: "Вы услышите радиодебаты: двое людей спорят о том, нужно ли закрыть центр города для машин.",
  plays: 2,
  sentences: [
   {da: "Værten: I dag diskuterer vi, om bymidten i Sandelev skal være uden biler. Pia, du er for, ikke?", ru: "Ведущий: Сегодня мы обсуждаем, должен ли центр Санделева быть свободным от машин. Пия, вы «за», верно?"},
   {da: "Pia: Ja, helt klart. Når der ikke er biler, bliver der mere plads til mennesker, og luften bliver bedre.", ru: "Пия: Да, безусловно. Когда нет машин, остаётся больше места для людей, и воздух становится чище."},
   {da: "Pia: Børnene kan lege, og caféerne kan sætte flere borde ud på gaden.", ru: "Пия: Дети могут играть, а кафе могут выставить больше столиков на улицу."},
   {da: "Værten: Rasmus, du er imod. Hvorfor?", ru: "Ведущий: Расмус, вы «против». Почему?"},
   {da: "Rasmus: Fordi mange af forretningerne ligger langt fra parkeringspladserne. Hvis kunderne ikke kan køre ind i byen, handler de i stedet på nettet.", ru: "Расмус: Потому что многие магазины расположены далеко от парковок. Если покупатели не смогут заехать в город, они станут делать покупки в интернете."},
   {da: "Rasmus: Og tænk på ældre mennesker. De kan ikke gå så langt med deres indkøbsposer.", ru: "Расмус: И подумайте о пожилых людях. Они не могут далеко идти со своими сумками с покупками."},
   {da: "Pia: Det er et godt punkt, men vi kan lave særlige busser og pladser til dem, som har svært ved at gå.", ru: "Пия: Это хороший довод, но мы можем сделать специальные автобусы и места для тех, кому трудно ходить."},
   {da: "Rasmus: Det koster penge, og jeg er ikke sikker på, at kommunen har dem.", ru: "Расмус: Это стоит денег, и я не уверен, что они есть у коммуны."},
   {da: "Pia: Jeg foreslår, at vi prøver det i seks måneder og derefter spørger borgerne, hvad de synes.", ru: "Пия: Я предлагаю попробовать это в течение шести месяцев, а затем спросить горожан, что они думают."},
   {da: "Rasmus: Det kunne jeg godt leve med, hvis butikkerne får hjælp, mens forsøget varer.", ru: "Расмус: С этим я мог бы согласиться, если магазины получат помощь на время эксперимента."},
   {da: "Værten: Tak til jer begge. Det ser ud til, at I kan blive enige om et forsøg.", ru: "Ведущий: Спасибо вам обоим. Похоже, вы можете договориться о пробном периоде."}
  ],
  questions: [
   {
    q: "Hvad diskuterer de to gæster?",
    options: ["Om man skal holde biler ude af bymidten","Om bybusserne skal være gratis","Om der skal bygges nye parkeringspladser"],
    answer: 0,
    why: "Ведущий формулирует тему: должен ли центр города быть без машин. Бесплатные автобусы и новые парковки в споре не центральные."
   },
   {
    q: "Hvilket argument bruger Pia for en bilfri bymidte?",
    options: ["Det bliver billigere for kommunen","Der bliver mere plads og bedre luft","Butikkerne får flere kunder med bil"],
    answer: 1,
    why: "Пия говорит, что без машин у людей будет больше места и чище воздух, а детям и кафе станет удобнее. Экономии для коммуны она не называет."
   },
   {
    q: "Hvad er Rasmus bange for?",
    options: ["At der bliver for mange cykler i byen","At kommunen bruger for få penge","At færre kunder kommer til butikkerne"],
    answer: 2,
    why: "Расмус опасается, что покупатели, не доехав до магазинов, перейдут на покупки в интернете. Против расходов коммуны он как раз возражает."
   },
   {
    q: "Hvem tænker Rasmus især på, når han nævner indkøbsposerne?",
    options: ["Børnefamilier","Ældre mennesker","Turister"],
    answer: 1,
    why: "Расмус просит подумать о пожилых, которые не могут далеко идти с сумками. Семьи с детьми упоминала Пия, а туристов нет."
   },
   {
    q: "Hvordan svarer Pia på Rasmus' bekymring for de ældre?",
    options: ["Hun foreslår særlige busser og pladser","Hun siger, at de ældre kan køre bil","Hun mener, at problemet er lille"],
    answer: 0,
    why: "Пия признаёт довод разумным и предлагает специальные автобусы и места для тех, кому трудно ходить. Утверждать, что проблема мала, она не пытается."
   },
   {
    q: "Hvad bliver de enige om til sidst?",
    options: ["At bygge en ny bro til fodgængere","At droppe hele ideen","At lave en prøveperiode med hjælp til butikkerne"],
    answer: 2,
    why: "Пия предлагает шесть месяцев пробного периода, а Расмус соглашается при условии помощи магазинам; ведущий подтверждает, что они могут договориться об эксперименте."
   }
  ]
 },
 {
  id: "kundeanmeldelse-af-sofa",
  level: "B2",
  topic: "Покупки: отзыв клиента",
  title: "Kundeanmeldelse af en sofa",
  situation: "Вы услышите устный отзыв покупателя о диване и его доставке.",
  plays: 2,
  sentences: [
   {da: "Jeg vil gerne dele min oplevelse med Møbelhuset Birkely, hvor jeg købte en ny sofa for en måned siden.", ru: "Я хочу поделиться своим опытом с мебельным магазином «Биркели», где месяц назад купил новый диван."},
   {da: "Selve sofaen er rigtig god. Den er blød, men alligevel fast nok til, at man kan sidde i den hele aftenen uden at få ondt i ryggen.", ru: "Сам диван очень хороший. Он мягкий, но в то же время достаточно жёсткий, чтобы можно было сидеть на нём весь вечер, не испытывая боли в спине."},
   {da: "Farven ligner præcis den, som jeg så på hjemmesiden, og stoffet er let at gøre rent.", ru: "Цвет точно такой же, как я видел на сайте, а ткань легко чистить."},
   {da: "Til gengæld var leveringen en skuffelse. Sofaen skulle komme en tirsdag mellem klokken otte og klokken tolv, men to mænd kom først klokken to.", ru: "Зато доставка разочаровала. Диван должен был прибыть во вторник с восьми до двенадцати, но двое мужчин приехали только в два."},
   {da: "Ingen ringede for at give besked, så jeg måtte tage en hel dag fri fra arbejde.", ru: "Никто не позвонил, чтобы предупредить, поэтому мне пришлось взять на работе целый выходной."},
   {da: "Da de endelig kom, var de venlige, men sofaen var ikke pakket godt ind, og der sad en lille plet på det ene armlæn.", ru: "Когда они наконец приехали, они были приветливы, но диван был плохо упакован, и на одном подлокотнике было небольшое пятно."},
   {da: "Jeg skrev til kundeservice, og de svarede allerede dagen efter.", ru: "Я написал в службу поддержки, и они ответили уже на следующий день."},
   {da: "De sendte en medarbejder, som fjernede pletten uden beregning, så der er trods alt en god ende på historien.", ru: "Они прислали сотрудника, который бесплатно убрал пятно, так что у этой истории всё-таки хороший конец."},
   {da: "Alt i alt giver jeg fire stjerner ud af fem.", ru: "В целом я ставлю четыре звезды из пяти."},
   {da: "Jeg vil anbefale sofaen, men jeg vil også råde andre til at tage højde for, at leveringen kan blive forsinket.", ru: "Я бы рекомендовал диван, но также советую другим учитывать, что доставка может задержаться."}
  ],
  questions: [
   {
    q: "Hvad er kundens samlede indtryk?",
    options: ["Helt negativt, fordi sofaen var for hård","Overvejende positivt, men med kritik af leveringen","Fuldstændig positivt uden noget at klage over"],
    answer: 1,
    why: "Клиент хвалит диван, критикует доставку и в итоге ставит четыре звезды из пяти. Это в основном положительная оценка с оговорками."
   },
   {
    q: "Hvad er kunden især glad for ved sofaen?",
    options: ["Den er behagelig at sidde i, og farven passer til billedet","Den fylder meget lidt i stuen","Den var billigere end andre sofaer"],
    answer: 0,
    why: "Он говорит, что диван удобный, цвет такой же, как на сайте, а ткань легко чистить. О размере и цене не сказано ничего."
   },
   {
    q: "Hvad var det største problem med leveringen?",
    options: ["Mændene var uvenlige","Sofaen kom ikke den dag, der var aftalt","Sofaen kom først efter det lovede tidsrum"],
    answer: 2,
    why: "Диван обещали с восьми до двенадцати, а привезли только в два. Рабочие были приветливыми, а день был назван верно, во вторник."
   },
   {
    q: "Hvorfor måtte kunden tage en hel dag fri?",
    options: ["Han ventede på sofaen uden at vide, hvornår den kom","Han skulle til møde i butikken","Han var syg og blev hjemme"],
    answer: 0,
    why: "Никто не позвонил, и клиент не знал, когда приедут рабочие, поэтому остался дома на весь день. Встречи в магазине и болезни в тексте нет."
   },
   {
    q: "Hvordan løste butikken problemet med pletten?",
    options: ["De byttede sofaen med en ny","De sendte en medarbejder, som gjorde sofaen ren","De gav ham pengene tilbage"],
    answer: 1,
    why: "Служба поддержки ответила на следующий день и прислала сотрудника, который бесплатно убрал пятно. Возврата денег и замены дивана не было."
   },
   {
    q: "Hvad råder kunden andre til?",
    options: ["At vælge en anden farve end han selv gjorde","At købe en sofa i en anden butik","At regne med, at leveringen kan blive forsinket"],
    answer: 2,
    why: "В конце он рекомендует диван, но советует учитывать возможную задержку доставки. Другой магазин и другой цвет не предлагаются."
   }
  ]
 }
];
