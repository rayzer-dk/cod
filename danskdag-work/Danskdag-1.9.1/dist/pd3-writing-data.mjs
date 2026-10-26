export const writingEmail=[
{
id:'email-internet-klage',level:'B2',topic:'Жалоба на услугу',title:'Klage over internetforbindelsen',
prompt:'Emne: Din henvendelse om internetforbindelsen\n\nKære kunde,\n\nTak for din besked. Vi har set, at du har oplevet problemer med din fiberforbindelse hos FjordNet. Vi beklager meget de gener, det har givet dig.\n\nFor at vi kan hjælpe dig bedst muligt, har vi brug for lidt mere information. Kan du beskrive, hvad der præcis er sket, og hvornår problemet begyndte? Har du allerede forsøgt at løse det på egen hånd, eller har du tidligere kontaktet vores kundeservice?\n\nVi vil gerne tilbyde dig et besøg af en tekniker. Hvilke dage og tidspunkter passer dig bedst? Skriv også gerne, hvad du forventer, at vi gør for at rette op på situationen.\n\nVenlig hilsen\nCamilla Holm\nKundeservice, FjordNet',
requirements:['Beskriv problemet, og fortæl, hvornår det begyndte.','Fortæl, hvad du selv har gjort for at løse det.','Foreslå en dag og et tidspunkt til teknikerens besøg.','Sig, hvilken løsning eller kompensation du forventer.'],
minWords:100,maxWords:160,
modelAnswer:'Emne: Svar vedrørende min internetforbindelse\n\nKære Camilla Holm,\n\nTak for jeres hurtige svar. Mit internet har været ustabilt, siden den 3. oktober. Forbindelsen forsvinder flere gange om dagen, og nogle gange er den væk i over en time. Det er meget besværligt, fordi jeg arbejder hjemmefra to dage om ugen.\n\nJeg har selv genstartet routeren mange gange og skiftet kablet, men det hjalp ikke. Jeg har også ringet til jeres kundeservice to gange, men jeg har ikke fået nogen løsning.\n\nJeg kan modtage teknikeren onsdag eftermiddag mellem klokken 14 og 17. Hvis det ikke passer, kan I også komme torsdag formiddag.\n\nJeg forventer, at I hurtigt får rettet fejlen. Desuden synes jeg, at jeg bør få kompensation i form af en måneds gratis abonnement, fordi jeg har betalt for en tjeneste, som jeg ikke har kunnet bruge.\n\nMed venlig hilsen\nIda Bruun',
checklist:['В письме есть тема, обращение и подпись.','Описана проблема и сказано, когда она началась.','Рассказано, что уже сделано самостоятельно и куда обращались раньше.','Предложены конкретный день и время для визита техника.','Чётко названо ожидаемое решение или компенсация.','Тон вежливый и деловой, к фирме обращение на «I/jeres».','Объём 100–160 слов; проверены порядок слов (V2) и формы глаголов.'],
phrases:[
{da:'Tak for jeres hurtige svar.',ru:'Спасибо за ваш быстрый ответ.'},
{da:'Jeg skriver angående …',ru:'Я пишу по поводу …'},
{da:'Problemet begyndte den …',ru:'Проблема началась …'},
{da:'Jeg har allerede forsøgt at …',ru:'Я уже пробовал(а) …'},
{da:'Det er meget besværligt for mig.',ru:'Это очень неудобно для меня.'},
{da:'Teknikeren kan komme …',ru:'Техник может прийти …'},
{da:'Jeg forventer, at I hurtigt får rettet fejlen.',ru:'Я ожидаю, что вы быстро устраните неисправность.'},
{da:'Jeg synes, at jeg bør få kompensation.',ru:'Я считаю, что мне положена компенсация.'},
{da:'Jeg betaler for en tjeneste, som jeg ikke kan bruge.',ru:'Я плачу за услугу, которой не могу пользоваться.'},
{da:'Jeg ser frem til jeres svar.',ru:'Жду вашего ответа.'}
]
},
{
id:'email-kursus-info',level:'B2',topic:'Запрос информации',title:'Spørgsmål om et kursus',
prompt:'Emne: Dit kursus i førstehjælp\n\nHej,\n\nTak, fordi du har tilmeldt dig vores kursus i førstehjælp. Kurset starter lørdag i næste uge klokken 9, men vi har desværre måttet flytte det til et nyt sted. Vi holder nu kurset i Havnehuset i stedet for på skolen.\n\nVil du være så venlig at bekræfte, at du stadig kan deltage? Skriv også, om du har særlige ønsker til maden, da vi serverer frokost til alle deltagere.\n\nHvis du har spørgsmål om kurset, er du velkommen til at skrive tilbage. Vi svarer, så hurtigt vi kan.\n\nVenlig hilsen\nJens Lund\nKursusleder, Fjordby Aftenskole',
requirements:['Bekræft, at du kommer, og tak for beskeden.','Spørg, hvordan man kommer til Havnehuset, og om der er parkering.','Spørg, om du skal medbringe noget, og om du får et kursusbevis.','Fortæl, om du har særlige ønsker til maden.'],
minWords:100,maxWords:160,
modelAnswer:'Emne: Svar vedrørende kurset i førstehjælp\n\nHej Jens,\n\nTak for din mail. Jeg bekræfter hermed, at jeg stadig kan deltage i kurset næste lørdag.\n\nJeg kender desværre ikke Havnehuset. Kan du fortælle, hvordan jeg kommer derhen med bus? Jeg kommer måske i bil, så jeg vil også gerne vide, om der er parkering i nærheden.\n\nSkal jeg medbringe noget, for eksempel en notesbog eller noget at skrive med? Desuden vil jeg gerne spørge, om man får et kursusbevis, når kurset er slut, fordi jeg skal bruge det på mit arbejde.\n\nHvad angår frokosten, spiser jeg ikke svinekød, men jeg spiser gerne fisk og grøntsager.\n\nPå forhånd tak for hjælpen.\n\nVenlig hilsen\nAnna Petrova',
checklist:['В письме есть тема, обращение и подпись.','Подтверждено участие и выражена благодарность за сообщение.','Задан вопрос о том, как добраться до Havnehuset, и вопрос о парковке.','Задан вопрос о том, что взять с собой, и вопрос о свидетельстве об окончании курса.','Сказано о пожеланиях к еде.','Вопросы построены правильно: глагол стоит на втором месте, в придаточных «ikke» после подлежащего.','Объём 100–160 слов.'],
phrases:[
{da:'Jeg bekræfter hermed, at …',ru:'Настоящим подтверждаю, что …'},
{da:'Kan du fortælle, hvordan jeg kommer derhen?',ru:'Можете подсказать, как туда добраться?'},
{da:'Er der parkering i nærheden?',ru:'Есть ли поблизости парковка?'},
{da:'Skal jeg medbringe noget?',ru:'Нужно ли что-нибудь взять с собой?'},
{da:'Får man et kursusbevis, når kurset er slut?',ru:'Выдают ли свидетельство об окончании курса?'},
{da:'Hvad angår frokosten, …',ru:'Что касается обеда, …'},
{da:'Jeg er desværre allergisk over for …',ru:'К сожалению, у меня аллергия на …'},
{da:'Jeg spiser ikke …',ru:'Я не ем …'},
{da:'På forhånd tak for hjælpen.',ru:'Заранее спасибо за помощь.'}
]
},
{
id:'email-indvielsesfest',level:'B2',topic:'Приглашение',title:'Svar på en invitation',
prompt:'Emne: Indvielsesfest\n\nKære Sofie,\n\nVi er endelig flyttet ind i vores nye lejlighed, og det skal fejres! Vi holder indvielsesfest lørdag den 15. i næste måned fra klokken 16. Vi har inviteret alle vores gode venner og naboer, og vi håber meget, at du også har lyst til at komme.\n\nVi laver varm mad, men det vil være dejligt, hvis gæsterne tager en lille ret eller en dessert med. Kan du komme, og vil du tage noget med? Fortæl os endelig, hvis du har allergi, eller hvis der er noget, du ikke spiser.\n\nDu må meget gerne tage din mand med. Vi bor på Skovvej 12, og der er desværre ikke mange parkeringspladser i nærheden.\n\nMange hilsner\nLine og Thomas',
requirements:['Tak for invitationen, og sig, om du kommer.','Fortæl, hvad du vil tage med til festen.','Fortæl, om du har allergi, eller om der er noget, du ikke spiser.','Fortæl, om din mand kommer med, og spørg, hvilken bus I skal tage.'],
minWords:100,maxWords:160,
modelAnswer:'Emne: Svar på invitationen\n\nKære Line og Thomas,\n\nMange tak for invitationen! Jeg er glad for, at I er flyttet ind i den nye lejlighed, og jeg kommer meget gerne til jeres indvielsesfest.\n\nJeg vil gerne tage en dessert med. Jeg har tænkt mig at bage en æblekage, som mange kan lide. Er det en god idé, eller har I allerede nok kage?\n\nJeg er desværre allergisk over for nødder, så jeg kan ikke spise retter med nødder. Ellers spiser jeg det meste.\n\nMin mand kommer også gerne med, tak for tilbuddet. Da der ikke er mange parkeringspladser, tager vi bussen. Kan I fortælle, hvilken bus vi skal tage, og hvor vi skal stå af?\n\nVi glæder os rigtig meget til at se jeres nye hjem.\n\nMange hilsner\nSofie',
checklist:['В письме есть тема, обращение и подпись; тон тёплый и неформальный.','Поблагодарили за приглашение и ясно сказали, придёте ли.','Названо, что принесёте на праздник.','Сказано об аллергии или о том, чего не едите.','Сказано, что муж придёт, и задан вопрос об автобусе.','Нет путаницы между «I/jeres» (вы, ваш) и «vi/vores» (мы, наш).','Объём 100–160 слов.'],
phrases:[
{da:'Mange tak for invitationen!',ru:'Большое спасибо за приглашение!'},
{da:'Jeg kommer meget gerne.',ru:'Я с удовольствием приду.'},
{da:'Jeg har tænkt mig at bage …',ru:'Я собираюсь испечь …'},
{da:'Har I allerede nok …?',ru:'А у вас уже достаточно …?'},
{da:'Jeg tåler ikke …',ru:'Я не переношу …'},
{da:'Ellers spiser jeg det meste.',ru:'В остальном я ем почти всё.'},
{da:'Må jeg tage … med?',ru:'Можно мне взять с собой …?'},
{da:'Kan I fortælle, hvilken bus vi skal tage?',ru:'Подскажете, на каком автобусе нам ехать?'},
{da:'Vi glæder os rigtig meget.',ru:'Мы очень рады и ждём встречи.'},
{da:'Mange hilsner',ru:'С наилучшими пожеланиями (неформальная концовка)'}
]
},
{
id:'email-fri-ferie',level:'B2',topic:'Отпуск и график работы',title:'Ansøgning om fri',
prompt:'Emne: Din ansøgning om fri\n\nHej Karim,\n\nJeg har læst din ansøgning om at holde fri i to uger i november. Jeg forstår, at du gerne vil besøge din familie, men vi har desværre travlt i den periode, fordi flere kolleger allerede har fri.\n\nKunne du tænke dig at rejse en anden gang, eller kan du måske nøjes med én uge? Hvis det er vigtigt, at du får hele to uger, skal vi finde en løsning, så dine opgaver bliver passet. Hvem kan overtage dem, mens du er væk?\n\nJeg vil gerne have dit svar inden fredag, så jeg kan lave vagtplanen. Fortæl også, hvorfor netop denne periode er vigtig for dig.\n\nVenlig hilsen\nBirgit Møller\nAfdelingsleder',
requirements:['Forklar, hvorfor netop denne periode er vigtig for dig.','Fortæl, hvem der kan overtage dine opgaver, og hvordan.','Foreslå et kompromis, så du ikke behøver at være væk i hele perioden.','Bed om svar inden en bestemt dag, og forklar hvorfor.'],
minWords:100,maxWords:160,
modelAnswer:'Emne: Svar vedrørende min ansøgning om fri\n\nHej Birgit,\n\nTak for din mail. Jeg forstår godt, at det er en travl periode.\n\nJeg vil gerne rejse netop i november, fordi min mor fylder 70 år, og hele familien samles for at fejre det. Det er meget vigtigt for mig at være der, og festen kan ikke flyttes.\n\nJeg har talt med Jonas, og han kan overtage mine vigtigste opgaver. Jeg skriver en liste over det, han skal gøre, og jeg viser ham det hele, inden jeg rejser.\n\nHvis to uger er for meget, kan jeg nøjes med at være væk i halvanden uge. Jeg kan også arbejde to weekender ekstra, før jeg rejser.\n\nKan du give mig besked inden fredag? Jeg skal nemlig købe billetter, og de bliver dyrere, hvis jeg venter.\n\nVenlig hilsen\nKarim',
checklist:['В письме есть тема, обращение и подпись.','Объяснена причина, почему нужен именно этот период.','Названо, кто и как возьмёт на себя ваши задачи.','Предложен компромисс (например, меньше дней или дополнительная работа заранее).','Попросили ответить к определённому дню и объяснили причину.','Тон вежливый, но уверенный: понимание проблемы работодателя + ваша просьба.','Объём 100–160 слов.'],
phrases:[
{da:'Jeg forstår godt, at …',ru:'Я хорошо понимаю, что …'},
{da:'Grunden er, at …',ru:'Причина в том, что …'},
{da:'Det er meget vigtigt for mig at …',ru:'Для меня очень важно …'},
{da:'Jeg har talt med …, som kan overtage …',ru:'Я поговорил(а) с …, который (которая) может взять на себя …'},
{da:'Jeg skriver en liste over …',ru:'Я составлю список …'},
{da:'Som et kompromis kunne jeg …',ru:'В качестве компромисса я мог(ла) бы …'},
{da:'Jeg kan nøjes med …',ru:'Я могу ограничиться …'},
{da:'Jeg kan også arbejde ekstra, før jeg rejser.',ru:'Я также могу поработать сверхурочно до отъезда.'},
{da:'Kan du give mig besked inden …?',ru:'Не могли бы вы сообщить мне до …?'},
{da:'Tak for din forståelse.',ru:'Спасибо за понимание.'}
]
},
{
id:'email-skole-samtale',level:'B2',topic:'Школа и детский сад',title:'Samtale med skolen',
prompt:'Emne: Samtale om Emil\n\nKære forældre til Emil,\n\nJeg skriver, fordi jeg gerne vil tale med jer om Emils skolegang. Han er en rar og nysgerrig dreng, men jeg har lagt mærke til, at han nogle gange har svært ved at koncentrere sig i dansktimerne. Der er ingen grund til at være bekymret, men jeg tror, at vi sammen kan hjælpe ham.\n\nHar I mulighed for at komme til en samtale i løbet af næste uge? Jeg har tid tirsdag og torsdag efter klokken 14. Fortæl også, hvordan Emil har det derhjemme, og om han læser bøger på dansk.\n\nTil sidst vil jeg minde jer om, at klassen skal på tur til Naturcenteret i november. Hvis I har spørgsmål, så skriv endelig.\n\nVenlig hilsen\nMette Kjær\nKlasselærer, 5.b',
requirements:['Foreslå en dag og et tidspunkt til samtalen.','Fortæl, hvordan Emil har det derhjemme, og hvad han læser på dansk.','Spørg, hvad I kan gøre derhjemme for at hjælpe ham.','Spørg til turen: hvad den koster, og hvad Emil skal have med.'],
minWords:100,maxWords:160,
modelAnswer:'Emne: Svar vedrørende samtalen om Emil\n\nKære Mette Kjær,\n\nTak for din mail. Vi er glade for, at du tager dig tid til Emil, og vi vil gerne komme til en samtale.\n\nTorsdag efter klokken 14 passer os fint. Hvis det ikke er muligt, kan vi også komme tirsdag klokken 15.\n\nDerhjemme har Emil det godt. Han er glad og snakker meget om skolen. Vi taler både dansk og vores modersmål sammen, og han læser en bog på dansk hver aften i cirka et kvarter. Nogle gange synes han dog, at danske tekster er svære.\n\nVi vil gerne vide, hvad vi kan gøre derhjemme for at hjælpe ham. Har du forslag til bøger eller spil?\n\nTil sidst vil vi spørge om turen til Naturcenteret. Hvad koster den, og hvad skal Emil have med i tasken?\n\nVenlig hilsen\nOlga og Viktor Sokolov',
checklist:['В письме есть тема, обращение и подпись; к учителю обращение на «du».','Предложены день и время для встречи.','Рассказано, как у Эмиля дела дома и что он читает по-датски.','Задан вопрос о том, как помочь ребёнку дома.','Заданы вопросы о поездке: стоимость и что взять с собой.','Тон доброжелательный и сотрудничающий, без оправданий и обвинений.','Объём 100–160 слов.'],
phrases:[
{da:'Tak, fordi du tager dig tid til …',ru:'Спасибо, что уделяете время …'},
{da:'Vi vil gerne komme til en samtale.',ru:'Мы хотели бы прийти на беседу.'},
{da:'Torsdag efter klokken 14 passer os fint.',ru:'Четверг после 14 часов нам подходит.'},
{da:'Hvis det ikke er muligt, kan vi også komme …',ru:'Если это невозможно, мы можем прийти также …'},
{da:'Derhjemme har … det godt.',ru:'Дома у … всё хорошо.'},
{da:'Han læser en bog på dansk hver aften.',ru:'Он каждый вечер читает книгу по-датски.'},
{da:'Hvad kan vi gøre derhjemme for at hjælpe …?',ru:'Что мы можем делать дома, чтобы помочь …?'},
{da:'Har du forslag til …?',ru:'Есть ли у вас предложения насчёт …?'},
{da:'Hvad koster turen, og hvad skal … have med?',ru:'Сколько стоит поездка и что … нужно взять с собой?'},
{da:'Giv os endelig besked, hvis …',ru:'Обязательно дайте нам знать, если …'}
]
},
{
id:'email-retur-reol',level:'B2',topic:'Возврат товара',title:'Returnering af en vare',
prompt:'Emne: Din returnering af reolen\n\nKære kunde,\n\nTak for din henvendelse. Vi har forstået, at du gerne vil returnere din reol fra Nordlys Bolig, og det er vi kede af.\n\nVi tager gerne reolen retur, men vi skal først vide lidt mere. Kan du fortælle, hvad der er galt med varen? Ønsker du at få pengene tilbage, eller vil du hellere bytte reolen til en anden model?\n\nReolen skal sendes tilbage i den originale emballage. Vi kan sende en fragtmand ud til dig, eller du kan selv aflevere pakken i en pakkeshop. Skriv, hvad der passer dig bedst, og hvornår du kan være hjemme.\n\nVenlig hilsen\nRasmus Winther\nKundeservice, Nordlys Bolig',
requirements:['Forklar, hvad der er galt med reolen.','Skriv, om du vil have pengene tilbage eller bytte, og hvorfor.','Vælg, hvordan reolen skal hentes eller afleveres, og skriv, hvornår du kan være hjemme.','Spørg, hvem der betaler for fragten, og hvornår du får pengene.'],
minWords:100,maxWords:160,
modelAnswer:'Emne: Svar vedrørende returnering af reolen\n\nKære Rasmus Winther,\n\nTak for din hurtige besked. Reolen, som jeg modtog i sidste uge, er desværre ikke i orden. To af hylderne er revnet, og skruerne passer ikke til hullerne. Jeg har prøvet at samle reolen to gange, men den står helt skævt.\n\nJeg vil gerne have pengene tilbage og ikke bytte, fordi reolen viste sig at være for stor til min stue.\n\nJeg vil helst have, at I sender en fragtmand, for reolen er tung, og jeg har ikke bil. Jeg kan være hjemme onsdag og fredag efter klokken 15. Jeg har gemt emballagen.\n\nKan I fortælle, hvem der betaler for fragten, og hvornår jeg får pengene tilbage på min konto?\n\nVenlig hilsen\nNadia Rahman',
checklist:['В письме есть тема, обращение и подпись.','Объяснено, что именно не так с товаром (конкретные детали).','Сказано, нужен ли возврат денег или обмен, и почему.','Выбран способ возврата и названо время, когда вы дома.','Заданы вопросы об оплате доставки и сроке возврата денег.','Использованы «jeg vil gerne have» и «jeg vil helst have, at …» с правильным порядком слов.','Объём 100–160 слов.'],
phrases:[
{da:'Jeg vil gerne returnere …',ru:'Я хотел(а) бы вернуть …'},
{da:'Varen er desværre ikke i orden.',ru:'К сожалению, товар не в порядке.'},
{da:'Der er noget galt med …',ru:'Что-то не так с …'},
{da:'Jeg vil gerne have pengene tilbage.',ru:'Я хотел(а) бы получить деньги обратно.'},
{da:'Jeg vil hellere bytte til …',ru:'Я бы предпочёл (предпочла) обменять на …'},
{da:'Jeg har gemt emballagen.',ru:'Я сохранил(а) упаковку.'},
{da:'Jeg kan være hjemme … efter klokken …',ru:'Я могу быть дома … после … часов.'},
{da:'Hvem betaler for fragten?',ru:'Кто оплачивает доставку?'},
{da:'Hvornår får jeg pengene tilbage?',ru:'Когда я получу деньги обратно?'},
{da:'Jeg håber, at vi kan finde en løsning.',ru:'Надеюсь, мы найдём решение.'}
]
}
];

export const writingTask=[
{
id:'task-hjemmearbejde',level:'B2',topic:'Работа и дом',title:'Hjemmearbejde og arbejdsliv',
options:[
{key:'A',prompt:'I de seneste måneder har aviserne skrevet meget om, at flere danskere arbejder hjemme. Nogle mener, at det er en fordel for både medarbejdere og virksomheder, mens andre mener, at man mister fællesskabet på arbejdspladsen. Skriv et læserbrev til en lokal avis om emnet.',requirements:['Forklar kort, hvad debatten handler om.','Nævn mindst to fordele ved hjemmearbejde.','Nævn mindst to ulemper.','Vurdér, hvor meget hjemmearbejde der er rimeligt, og argumentér for din holdning. Dette punkt skal fylde mindst halvdelen af teksten.']},
{key:'B',prompt:'Fortæl om din første tid på en ny arbejdsplads, en praktikplads eller et nyt kursus. Skriv en beretning.',requirements:['Fortæl, hvor og hvornår det foregik, og hvad du skulle lave.','Beskriv, hvad der var svært i begyndelsen.','Fortæl, hvem der hjalp dig, og hvordan.','Fortæl, hvad du har lært af oplevelsen.']}
],
minWords:200,maxWords:300,
modelAnswers:{
A:'Til redaktionen\n\nI de seneste måneder har man kunnet læse meget om hjemmearbejde. Spørgsmålet er, om medarbejderne skal arbejde hjemme en stor del af ugen, eller om de hellere skal møde op på kontoret hver dag.\n\nHjemmearbejde har tydelige fordele. For det første sparer man tid og penge, når man ikke skal transportere sig til og fra arbejde. For det andet er det ofte lettere at koncentrere sig derhjemme, fordi der ikke er kolleger, som afbryder en hele tiden.\n\nDer er dog også ulemper. Man kan føle sig ensom, og det er sværere at lære af sine kolleger, hvis man aldrig møder dem. Desuden kan grænsen mellem arbejde og fritid blive utydelig, så man ender med at arbejde for meget.\n\nEfter min mening er den bedste løsning en blanding. Jeg mener, at man bør arbejde hjemme to eller tre dage om ugen og være på kontoret resten af tiden. På den måde får man fordelene fra begge verdener. Man kan arbejde i fred, når man skal skrive eller tænke, og man kan mødes med kollegerne, når man har brug for at snakke sammen eller løse problemer i fællesskab. Det er især vigtigt for nye medarbejdere, som endnu ikke kender arbejdspladsen, og som lærer meget af at se, hvordan andre gør tingene. Samtidig bør arbejdsgiverne stole på deres medarbejdere og ikke kræve, at alle sidder ved skrivebordet hele dagen. Det vigtigste er, at arbejdet bliver gjort godt, ikke hvor det bliver gjort. Derfor håber jeg, at flere virksomheder vil give deres ansatte mere frihed, men også sørge for, at fællesskabet ikke går tabt.\n\nMed venlig hilsen\nMaria Jensen',
B:'Min første tid på arbejde i Danmark\n\nFor tre år siden fik jeg min første praktikplads i en lille virksomhed i udkanten af en mindre by. Det var et firma, der solgte havemøbler, og jeg skulle hjælpe på lageret og pakke varer til kunderne. Jeg var meget spændt den første dag, fordi jeg aldrig før havde arbejdet i Danmark.\n\nI begyndelsen var det svært på flere måder. Først og fremmest forstod jeg ikke alt, hvad mine kolleger sagde. De talte hurtigt og brugte mange ord, som jeg ikke kendte fra danskundervisningen. Når nogen sagde noget til mig, nikkede jeg ofte bare, selvom jeg ikke havde forstået det. Det førte en dag til en fejl: Jeg pakkede de forkerte varer. Jeg var rigtig flov, og jeg havde lyst til at gå hjem.\n\nHeldigvis havde jeg en sød kollega, som hed Peter. Han kom over til mig og sagde, at alle laver fejl i starten. Derefter tog han sig tid til at forklare mig opgaverne langsomt og skrev vigtige ord ned på en seddel. Han inviterede mig også med til frokost, så jeg kunne lære de andre bedre at kende, og efterhånden begyndte jeg at føle mig som en del af holdet.\n\nEfter tre måneder fik jeg et fast job i firmaet. Oplevelsen har lært mig, at man skal turde spørge, når man ikke forstår noget. I dag er jeg ikke længere bange for at sige, at jeg ikke har forstået det, og jeg prøver selv at hjælpe nye kolleger, ligesom Peter hjalp mig.'
},
checklist:['Выбран один вариант (A или B) и выполнены все его пункты по порядку.','Вариант A: тема дискуссии, плюсы, минусы и собственная оценка; последний пункт занимает не менее половины текста.','Вариант B: рассказ идёт в прошедшем времени, события изложены по порядку (først, derefter, til sidst).','Есть вступление, основная часть и заключение.','Выражена личная позиция или вывод (efter min mening, oplevelsen har lært mig …).','Использованы связки (fordi, selvom, desuden, dog, derfor).','Объём 200–300 слов; проверены порядок слов в придаточных и формы глаголов.'],
phrases:[
{da:'Til redaktionen',ru:'В редакцию'},
{da:'Debatten handler om …',ru:'Дискуссия идёт о …'},
{da:'Der er både fordele og ulemper.',ru:'Есть как плюсы, так и минусы.'},
{da:'Efter min mening er den bedste løsning …',ru:'По моему мнению, лучшее решение — это …'},
{da:'Det vigtigste er, at …',ru:'Самое важное — чтобы …'},
{da:'For tre år siden fik jeg …',ru:'Три года назад я получил(а) …'},
{da:'I begyndelsen var det svært at …',ru:'В начале было трудно …'},
{da:'Heldigvis havde jeg en kollega, som …',ru:'К счастью, у меня был коллега, который …'},
{da:'Efterhånden begyndte jeg at …',ru:'Постепенно я начал(а) …'},
{da:'Oplevelsen har lært mig, at …',ru:'Этот опыт научил меня тому, что …'}
]
},
{
id:'task-at-laere-dansk',level:'B2',topic:'Язык и учёба',title:'At lære dansk',
options:[
{key:'A',prompt:'Kommentér dette udsagn: »Den bedste måde at lære dansk på er at tale med danskere så ofte som muligt.« Skriv en kommentar, hvor du tager stilling til udsagnet.',requirements:['Forklar med dine egne ord, hvad udsagnet betyder.','Giv mindst ét eksempel fra din egen erfaring.','Nævn mindst ét argument for, at andre metoder også er vigtige.','Afslut med din egen konklusion.']},
{key:'B',prompt:'En ven, der lige er flyttet til Danmark, spørger dig, hvordan han eller hun bedst kan lære dansk. Skriv en anbefaling, hvor du anbefaler en metode, en aktivitet eller et sted, som du selv har gode erfaringer med.',requirements:['Beskriv kort, hvad du anbefaler.','Forklar, hvorfor det har virket godt for dig.','Nævn mindst én udfordring, og giv et råd til at klare den.','Afslut med en konkret opfordring til din ven.']}
],
minWords:200,maxWords:300,
modelAnswers:{
A:'Jeg er delvist enig i udsagnet om, at den bedste måde at lære dansk på er at tale med danskere så ofte som muligt.\n\nUdsagnet betyder, at man lærer et sprog hurtigst ved at bruge det i virkelige situationer. Når man taler med danskere, træner man både udtale og ordforråd, og man vænner sig til det tempo, man hører i hverdagen. Man lærer også at forstå, hvad folk mener, selvom de ikke siger det helt direkte.\n\nJeg har selv oplevet, hvor meget det hjælper. Da jeg kom til Danmark, kunne jeg læse ret godt, men jeg turde næsten ikke sige noget. Det ændrede sig, da jeg begyndte at gå til gymnastik sammen med nogle naboer. Efter nogle uger kunne jeg pludselig føre en samtale uden at tænke over hver eneste sætning, og min udtale blev tydeligt bedre.\n\nAlligevel mener jeg ikke, at samtaler er nok alene. Hvis man aldrig lærer grammatikken ordentligt, gentager man de samme fejl igen og igen, og ingen retter en, fordi folk er høflige. Man har også brug for at læse aviser og bøger, så man møder ord, som man ikke bruger i dagligdagen. Desuden kan det være svært at finde nogen at tale med, hvis man bor langt fra andre eller arbejder hjemme.\n\nMin konklusion er derfor, at samtaler er en meget vigtig del af læringen, men ikke den eneste. Den bedste metode er en kombination af kurser, læsning og samtale. Man bør bruge undervisningen til at lære reglerne og derefter prøve dem af i virkeligheden, så man får både sikkerhed og rutine.',
B:'Kære Nina,\n\nDu spurgte, hvordan du bedst kan lære dansk, nu hvor du er flyttet hertil. Jeg vil gerne anbefale dig at komme i en sprogcafé på biblioteket. Det er et sted, hvor frivillige og nye i landet mødes én gang om ugen for at tale sammen over en kop kaffe. Der er ingen lærer og ingen lektier, og man kan bare komme og gå, som man vil.\n\nJeg begyndte selv at komme i sprogcaféen for to år siden, og det har virket godt for mig af flere grunde. For det første er stemningen afslappet, så man tør sige noget, selvom man laver fejl. For det andet taler man om almindelige emner, for eksempel mad, børn og vejret, og derfor lærer man de ord, som man faktisk har brug for i hverdagen. Jeg har også fået nogle gode venner derfra, som jeg stadig ser.\n\nDet kan godt være svært i starten. Man føler sig måske genert, og nogle gange kan man ikke finde de rigtige ord. Mit råd er at forberede et par spørgsmål hjemmefra og skrive nogle nyttige sætninger ned på forhånd. Og husk, at ingen forventer, at du taler perfekt. Alle har selv været nye engang.\n\nDerfor vil jeg opfordre dig til at komme med mig næste torsdag. Vi mødes ved indgangen til biblioteket klokken 17, og så går vi ind sammen. Jeg lover, at du ikke fortryder det.\n\nHilsen\nAnders'
},
checklist:['Выбран один вариант (A или B) и выполнены все его пункты.','Вариант A: утверждение пересказано своими словами, есть личный пример, есть контраргумент и вывод.','Вариант B: письмо другу (обращение, «du», дружеский тон), есть совет, трудность и призыв к действию.','Позиция выражена ясно (jeg er delvist enig, jeg anbefaler …).','Использованы связки противопоставления (alligevel, dog, derimod) и причины (fordi, derfor).','Нет русизмов в порядке слов; в придаточных «ikke» и «ofte» стоят после подлежащего.','Объём 200–300 слов.'],
phrases:[
{da:'Jeg er delvist enig i udsagnet.',ru:'Я отчасти согласен (согласна) с утверждением.'},
{da:'Udsagnet betyder, at …',ru:'Это утверждение означает, что …'},
{da:'Jeg har selv oplevet, at …',ru:'Я сам(а) убедился (убедилась), что …'},
{da:'Alligevel mener jeg ikke, at … er nok alene.',ru:'Тем не менее я не считаю, что … достаточно само по себе.'},
{da:'Min konklusion er, at …',ru:'Мой вывод: …'},
{da:'Jeg vil gerne anbefale dig at …',ru:'Я хотел(а) бы порекомендовать тебе …'},
{da:'Det har virket godt for mig, fordi …',ru:'Мне это помогло, потому что …'},
{da:'Mit råd er at …',ru:'Мой совет — …'},
{da:'Alle har selv været nye engang.',ru:'Все когда-то были новичками.'},
{da:'Jeg vil opfordre dig til at …',ru:'Я призываю тебя …'}
]
},
{
id:'task-svoemmehal',level:'B2',topic:'Здоровье и спорт',title:'Sundhed og motion',
options:[
{key:'A',prompt:'Kommunen overvejer at lukke den lokale svømmehal for at spare penge. Skriv en argumenterende tekst, hvor du tager stilling til forslaget.',requirements:['Beskriv kort situationen, og forklar, hvem forslaget rammer.','Giv mindst to argumenter for din holdning.','Nævn et modargument, og forklar, hvorfor det ikke overbeviser dig.','Foreslå en anden løsning, eller afslut med en tydelig opfordring.']},
{key:'B',prompt:'Beskriv en sport eller en motionsvane, som du dyrker, eller som du gerne vil starte på. Skriv en beskrivelse.',requirements:['Beskriv aktiviteten, og fortæl, hvor og hvornår du dyrker den.','Fortæl, hvordan du kom i gang.','Forklar, hvad aktiviteten giver dig, både fysisk og mentalt.','Fortæl, hvilke planer eller mål du har for fremtiden.']}
],
minWords:200,maxWords:300,
modelAnswers:{
A:'Skal svømmehallen lukke?\n\nKommunen overvejer at lukke den lokale svømmehal for at spare penge. Det vil ramme mange mennesker, for hallen bruges hver dag af børn, ældre, sportsklubber og familier. Jeg synes, at det vil være en stor fejl.\n\nMit første argument er, at svømning er vigtig for børns sikkerhed. I Danmark er der vand i nærheden næsten overalt, og børn bør lære at svømme, før de bliver store. Hvis hallen lukker, skal børnene køre langt for at komme til svømmeundervisning, og nogle vil slet ikke få den. Mit andet argument er sundhed. Svømning er skånsom motion, som passer til både unge og gamle. Især for ældre og for mennesker med ondt i ryggen findes der næsten ikke noget, der kan erstatte den. Hvis færre mennesker motionerer, kan det ende med at koste samfundet mere, fordi flere bliver syge.\n\nNogle politikere siger, at det er for dyrt at drive hallen, og at der er brug for pengene til andre ting. Det kan godt være rigtigt, at hallen koster penge, men jeg mener ikke, at det er en god grund til at lukke den. Penge, som man sparer nu, kan blive en dyr regning senere, og et lokalt fællesskab er svært at genopbygge, når det først er væk.\n\nI stedet for at lukke hallen kunne kommunen forsøge at få flere brugere, for eksempel ved at holde åbent senere om aftenen eller ved at lave flere kurser for voksne. Man kunne også bede lokale firmaer om at støtte hallen. Jeg opfordrer derfor politikerne til at finde en anden løsning og lade svømmehallen blive, hvor den er.',
B:'Min vane: en lang gåtur hver morgen\n\nJeg dyrker ikke den store sport, men jeg har en motionsvane, som betyder meget for mig: Hver morgen går jeg en tur på cirka fem kilometer langs søen i nærheden af mit hjem. Jeg står op klokken seks, drikker et glas vand og tager af sted, inden resten af familien er vågen. Turen tager omkring en time, og jeg går den næsten hver dag, uanset vejret.\n\nJeg kom i gang for omkring to år siden. Dengang havde jeg et job, hvor jeg sad ved et skrivebord det meste af dagen, og jeg havde ofte ondt i ryggen og følte mig træt. Min læge foreslog, at jeg skulle gå mere, og så besluttede jeg at prøve det. I starten var det svært at stå så tidligt op, og jeg gik kun to gange om ugen. Men efter nogle uger blev turene en fast del af min morgenrutine.\n\nI dag mærker jeg tydeligt, hvad turene giver mig. Fysisk har jeg mere energi, og jeg har ikke længere ondt i ryggen. Mentalt er det den bedste måde at starte dagen på. Jeg kan tænke i ro og fred, og jeg ser fuglene og solopgangen over vandet. Når jeg kommer hjem, er jeg i godt humør og klar til at gå på arbejde.\n\nFremover vil jeg gerne gå lidt længere og måske tage nogle af mine venner med. Jeg drømmer også om at deltage i en lang vandretur i naturen sammen med mine børn, når de bliver lidt ældre. Det er et mål, som jeg glæder mig til at arbejde hen imod.'
},
checklist:['Выбран один вариант (A или B) и выполнены все его пункты.','Вариант A: ситуация, минимум два аргумента, контраргумент с ответом на него и предложение или призыв.','Вариант B: описание ясно структурировано (что, где, когда; как начал(а); что даёт; планы).','Конкретные детали вместо общих слов (время, место, чувства).','Использованы условные и причинные придаточные (hvis, fordi, så) с правильным порядком слов.','Соблюдена орфография: двойные согласные, немые d и g, -ede/-et.','Объём 200–300 слов.'],
phrases:[
{da:'Kommunen overvejer at …',ru:'Коммуна рассматривает возможность …'},
{da:'Det vil ramme mange mennesker.',ru:'Это затронет многих людей.'},
{da:'Mit første argument er, at …',ru:'Мой первый аргумент в том, что …'},
{da:'Nogle mener, at …, men jeg er uenig.',ru:'Некоторые считают, что …, но я не согласен (согласна).'},
{da:'I stedet for at … kunne man …',ru:'Вместо того чтобы …, можно было бы …'},
{da:'Jeg opfordrer politikerne til at …',ru:'Я призываю политиков …'},
{da:'Jeg kom i gang for to år siden.',ru:'Я начал(а) два года назад.'},
{da:'Det giver mig mere energi.',ru:'Это даёт мне больше энергии.'},
{da:'Jeg kan tænke i ro og fred.',ru:'Я могу спокойно подумать.'},
{da:'Fremover vil jeg gerne …',ru:'В будущем я хотел(а) бы …'}
]
},
{
id:'task-naboer',level:'B2',topic:'Соседи и общество',title:'Naboer og fællesskab',
options:[
{key:'A',prompt:'Kommentér dette udsagn: »Det er vigtigt at kende sine naboer.« Skriv en kommentar, hvor du forklarer, hvad du mener.',requirements:['Forklar med dine egne ord, hvad udsagnet betyder.','Giv mindst to argumenter for, at det er vigtigt.','Nævn, hvorfor nogle mennesker ikke ønsker tæt kontakt til naboerne.','Giv din egen holdning, og brug et eksempel fra hverdagen.']},
{key:'B',prompt:'Fortæl om en gang, hvor du fik uventet hjælp af en fremmed, for eksempel på en rejse eller i byen. Skriv en beretning.',requirements:['Fortæl, hvad der skete, og hvor og hvornår det foregik.','Beskriv, hvordan du havde det undervejs.','Fortæl, hvordan den fremmede hjalp dig.','Fortæl, hvad du gjorde bagefter, og hvad du tænker om oplevelsen i dag.']}
],
minWords:200,maxWords:300,
modelAnswers:{
A:'Udsagnet »Det er vigtigt at kende sine naboer« lyder måske gammeldags, men jeg mener, at det stadig er rigtigt, selvom det ikke er alle, der er enige.\n\nUdsagnet betyder, at man bør have et godt forhold til de mennesker, man bor tæt på. Det betyder ikke, at man skal være bedste venner, men at man kender hinandens navne, hilser på hinanden og ved, hvem man kan bede om hjælp.\n\nDer er flere gode grunde til, at det er vigtigt. For det første føler man sig mere tryg, når man kender dem, der bor i nærheden. Hvis der sker noget, for eksempel en brand eller et indbrud, kan naboerne holde øje med hinanden og hjælpe. For det andet er det praktisk. Man kan låne en stige, få nogen til at vande blomsterne, når man er på ferie, eller få leveret en pakke, hvis man ikke er hjemme. Endelig er det godt for fællesskabet, fordi mange, især ældre, ellers kan blive meget ensomme.\n\nSamtidig forstår jeg, at nogle mennesker ikke ønsker tæt kontakt. De arbejder måske meget og vil have fred og ro i deres fritid. Andre er mere private, eller de er bange for, at naboerne blander sig for meget i deres liv. Det skal man selvfølgelig respektere.\n\nPersonligt mener jeg, at man godt kan bevare sit privatliv og alligevel sige godmorgen til dem, man møder på trappen. Sidste vinter faldt jeg og slog mig i vores opgang, og det var min nabo, der hørte mig og kom hen for at hjælpe. Hvis jeg ikke havde kendt hende, havde jeg måske ikke turdet bede hende om hjælp. Derfor synes jeg, at det altid er værd at kende sine naboer, så godt man har lyst til.',
B:'En fremmed, der hjalp mig\n\nFor to år siden skulle jeg besøge min veninde i en anden by. Jeg tog toget en lørdag eftermiddag i november, og det havde regnet hele dagen. Da jeg kom frem til den store station, opdagede jeg, at min pung var væk. Jeg havde både billetten og mine penge i den, og min telefon var næsten løbet tør for strøm.\n\nJeg blev først meget bange, og derefter blev jeg vred på mig selv. Jeg stod på perronen og vidste ikke, hvad jeg skulle gøre. Min veninde boede langt fra stationen, og jeg havde ikke penge til en taxa eller til en ny billet. Jeg havde lyst til at græde.\n\nSå kom en ældre kvinde hen til mig og spurgte, om hun kunne hjælpe. Jeg forklarede det hele på mit usikre dansk, og hun lyttede tålmodigt. Derefter lånte hun mig sin telefon, så jeg kunne ringe til min veninde, og hun gik med mig hen til informationen, hvor vi spurgte, om nogen havde afleveret en pung. Det var der desværre ingen, der havde. Til sidst gav hun mig penge til bussen og sagde, at jeg ikke skulle tænke på det.\n\nBagefter bad jeg om hendes navn og adresse, så jeg kunne betale hende tilbage. Ugen efter sendte jeg hende pengene sammen med et kort og en buket blomster. I dag tænker jeg ofte på hende. Hun lærte mig, at der er mange venlige mennesker, og at man ikke skal være bange for at bede om hjælp. Nu forsøger jeg selv at hjælpe, når jeg ser nogen, der virker rådvilde.'
},
checklist:['Выбран один вариант (A или B) и выполнены все его пункты.','Вариант A: утверждение объяснено, есть минимум два аргумента «за», объяснено, почему кто-то не хочет близких контактов, есть личный пример.','Вариант B: события изложены по порядку, описаны чувства и действия незнакомца, есть вывод в настоящем времени.','Правильно использованы прошедшие времена (præteritum и perfektum) в повествовании.','Использованы связки времени (først, derefter, bagefter, til sidst) и причины (fordi, så).','Есть собственная позиция или оценка, а не только перечисление фактов.','Объём 200–300 слов.'],
phrases:[
{da:'Udsagnet lyder måske gammeldags, men …',ru:'Это утверждение, возможно, звучит старомодно, но …'},
{da:'Man bør have et godt forhold til …',ru:'Нужно поддерживать хорошие отношения с …'},
{da:'Det betyder ikke, at …, men at …',ru:'Это не значит, что …, а значит, что …'},
{da:'Man føler sig mere tryg, når …',ru:'Чувствуешь себя спокойнее, когда …'},
{da:'Samtidig forstår jeg, at nogle ikke ønsker …',ru:'В то же время я понимаю, что некоторые не хотят …'},
{da:'Personligt mener jeg, at …',ru:'Лично я считаю, что …'},
{da:'Jeg blev først bange, og derefter …',ru:'Сначала мне стало страшно, а потом …'},
{da:'Hun spurgte, om hun kunne hjælpe.',ru:'Она спросила, не может ли она помочь.'},
{da:'Bagefter bad jeg om hendes navn.',ru:'Потом я спросил(а) её имя.'},
{da:'I dag tænker jeg ofte på …',ru:'Сегодня я часто вспоминаю …'}
]
},
{
id:'task-boern-skole',level:'B2',topic:'Дети и школа',title:'Børn og skole',
options:[
{key:'A',prompt:'Nogle mener, at børn ikke bør have deres mobiltelefon med i skole. Skriv en argumenterende tekst om emnet.',requirements:['Præsentér emnet i en kort indledning.','Nævn argumenter for et forbud mod mobiltelefoner i skolen.','Nævn argumenter imod et forbud.','Tag stilling: Vurdér, hvad der er den bedste løsning, og begrund det. Dette punkt skal fylde mindst halvdelen af teksten.']},
{key:'B',prompt:'Skriv en anbefaling til familier med børn: Hvad kan man lave en weekenddag i dit område? Anbefal et sted eller en aktivitet.',requirements:['Beskriv stedet eller aktiviteten, og fortæl, hvor det ligger.','Forklar, hvorfor det passer til børnefamilier.','Giv praktiske oplysninger, for eksempel om pris, åbningstider og transport.','Nævn en ulempe, og afslut med en klar anbefaling.']}
],
minWords:200,maxWords:300,
modelAnswers:{
A:'Mobiltelefon i skolen: ja eller nej?\n\nI dag har næsten alle store børn en mobiltelefon, og mange tager den med i skole. Det har skabt en debat: Skal skolerne forbyde telefonerne i løbet af skoledagen?\n\nTilhængerne af et forbud siger, at telefonen forstyrrer undervisningen, fordi børnene kigger på skærmen i stedet for at lytte til læreren. Desuden skal børnene snakke og lege med hinanden i frikvartererne, og telefonen kan bruges til mobning.\n\nModstanderne mener derimod, at telefonen også er nyttig. Man kan slå ord op, og forældrene kan nå deres børn, hvis der sker noget uventet. Desuden skal børn lære at bruge teknologi fornuftigt, og det lærer de ikke, hvis telefonen bare bliver låst væk.\n\nEfter min mening er den bedste løsning hverken et totalt forbud eller fri adgang. Jeg synes, at telefonen skal være slukket og ligge i tasken, både i timerne og i frikvartererne, medmindre læreren beder børnene bruge den i undervisningen. På den måde får børnene ro til at koncentrere sig, og de får lov til at tale sammen i pausen. Samtidig kan de stadig bruge telefonen til noget nyttigt, og forældrene kan ringe til skolen, hvis noget er vigtigt. Det vigtigste er, at reglerne er klare og ens for alle, så der ikke bliver diskussioner hver dag. Skolen bør også forklare børnene, hvorfor reglerne findes, så de ikke føler, at de bliver straffet. Endelig har forældrene et ansvar, for hvis børnene sidder med telefonen hele aftenen derhjemme, hjælper skolens regler kun lidt. En fælles aftale mellem skole og hjem er derfor den bedste vej frem.',
B:'Anbefaling: en dag i Eventyrskoven\n\nHvis du leder efter et sted at tage hen med børnene i weekenden, vil jeg varmt anbefale Eventyrskoven ved Bakkesø. Det er en stor skov med stier, legepladser og en lille sø, og den ligger cirka tyve minutters kørsel fra byen. Man kan også komme derhen med bus, for der er et stoppested lige ved indgangen.\n\nStedet passer rigtig godt til børnefamilier af flere grunde. Børnene kan løbe frit rundt, klatre i træerne og lege i vandkanten, og der er ruter for både små og store børn. Der findes også en lille skattejagt, hvor børnene skal finde figurer af trolde og dyr langs stien, og det er noget, mine egne børn elsker. Samtidig kan de voksne sidde og slappe af ved de mange bænke og bålpladser.\n\nHvad angår det praktiske, er der gratis adgang, og skoven er åben hele døgnet. Caféen ved indgangen har åbent fra klokken 10 til 16 i weekenden, men det er en god idé at medbringe en madpakke og en termokande med kaffe eller kakao. Husk også gummistøvler, hvis det har regnet, for stierne kan være meget mudrede.\n\nEn ulempe er, at der kan være mange mennesker, når vejret er godt, og så kan det være svært at finde en ledig plads ved bålet. Hvis du kan, så kom tidligt om formiddagen. Alt i alt er det en dejlig tur, som både børn og voksne får noget ud af, og jeg anbefaler den helt klart.'
},
checklist:['Выбран один вариант (A или B) и выполнены все его пункты.','Вариант A: вступление, аргументы «за», аргументы «против» и собственная позиция; последний пункт занимает не менее половины текста.','Вариант B: рекомендация содержит место, причины, практические сведения, недостаток и ясный итог.','Аргументы и описания конкретны, без пустых общих фраз.','Использованы «tilhængerne … modstanderne … derimod», «hvad angår …», «alt i alt …» или подобные выражения.','Правильный порядок слов после вводных обстоятельств (Desuden kan …, Samtidig bør …).','Объём 200–300 слов.'],
phrases:[
{da:'Det har skabt en debat om …',ru:'Это вызвало дискуссию о …'},
{da:'Tilhængerne af … siger, at …',ru:'Сторонники … говорят, что …'},
{da:'Modstanderne mener derimod, at …',ru:'Противники, напротив, считают, что …'},
{da:'Efter min mening er den bedste løsning …',ru:'По моему мнению, лучшее решение — это …'},
{da:'Det vigtigste er, at reglerne er klare.',ru:'Самое важное — чтобы правила были чёткими.'},
{da:'Jeg vil varmt anbefale …',ru:'Я горячо рекомендую …'},
{da:'Stedet passer godt til børnefamilier.',ru:'Это место хорошо подходит для семей с детьми.'},
{da:'Hvad angår det praktiske, …',ru:'Что касается практических деталей, …'},
{da:'En ulempe er, at …',ru:'Недостаток в том, что …'},
{da:'Alt i alt er det …',ru:'В целом это …'}
]
},
{
id:'task-byen',level:'B2',topic:'Город и окружающая среда',title:'Byen og hverdagen',
options:[
{key:'A',prompt:'Kommunen har foreslået, at bymidten skal være bilfri om lørdagen. Skriv et læserbrev, hvor du tager stilling til forslaget.',requirements:['Præsentér forslaget og din holdning i indledningen.','Giv to argumenter for din holdning.','Nævn et modargument, og kommentér det.','Afslut med en opfordring til politikerne eller til læserne.']},
{key:'B',prompt:'Beskriv det kvarter eller den by, du bor i. Fortæl, hvad der er godt, og hvad der kunne blive bedre.',requirements:['Beskriv, hvor du bor, og hvordan stedet ser ud.','Fortæl, hvad du bedst kan lide ved stedet.','Nævn mindst to ting, som kunne blive bedre.','Beskriv, hvordan du forestiller dig stedet om ti år.']}
],
minWords:200,maxWords:300,
modelAnswers:{
A:'Til redaktionen\n\nKommunen har foreslået, at bymidten skal være bilfri om lørdagen. Jeg synes, at det er en rigtig god idé, og jeg håber, at byrådet vil sige ja til forslaget.\n\nMit første argument er, at en bilfri bymidte bliver mere rolig og tryg. I dag er de smalle gader fyldt med biler, og det er farligt for børn og ældre, som skal krydse vejen. Hvis bilerne forsvinder, kan folk gå rundt i ro og fred, og man kan høre musikken fra gademusikanterne i stedet for motorstøj. Mit andet argument er miljøet. Færre biler betyder mindre forurening og mindre støj, og det er godt for alle, der bor i centrum.\n\nNogle butiksejere frygter, at de vil miste kunder, fordi folk ikke kan køre helt hen til butikken. Jeg forstår godt bekymringen, men jeg tror, at den er overdrevet. Mange mennesker handler hellere, hvor der er hyggeligt og plads til at gå rundt, og de kan stadig parkere i et af byens parkeringshuse og gå de sidste få hundrede meter. Man kunne i øvrigt starte med en prøveperiode på nogle måneder og derefter måle, hvordan det går med handelen.\n\nDerfor vil jeg opfordre politikerne til at give forslaget en chance. Og jeg vil opfordre alle byens borgere til at komme ind og opleve bymidten uden biler, når prøveperioden begynder. Jeg er sikker på, at mange vil blive glade for forandringen.\n\nMed venlig hilsen\nKaren Thygesen',
B:'Mit kvarter\n\nJeg bor i et lille kvarter i udkanten af en mellemstor by. Området består mest af rækkehuse og nogle få etagebygninger, og der er en stor park midt i kvarteret med en sø og en legeplads. Gaderne er smalle og rolige, og der vokser høje træer langs vejene, så det næsten føles som at bo på landet, selvom der kun er ti minutter til centrum på cykel.\n\nDet, jeg bedst kan lide ved stedet, er stemningen. Naboerne kender hinanden, og man ser ofte børn lege ude på fortovet efter skoletid. Der er også en lille købmand på hjørnet og en bager, hvor man kan få friske rundstykker om morgenen. Om sommeren holder beboerforeningen et loppemarked i parken, og det er altid en hyggelig dag.\n\nDer er dog ting, som kunne blive bedre. For det første er der for få cykelstier, og mange børn cykler på kørebanen, hvor bilerne kører for hurtigt. For det andet kører busserne ikke så ofte om aftenen, så det er svært at komme hjem, hvis man har været i byen. Desuden mangler der lys i parken, og mange føler sig utrygge der, når det bliver mørkt.\n\nOm ti år håber jeg, at kvarteret er blevet endnu bedre. Jeg forestiller mig, at der er kommet en sikker cykelsti hele vejen til centrum, og at der kører en bus hver halve time, også sent om aftenen. Parken har fået flere lamper og en lille café, hvor både unge og ældre kan mødes. Hvis kommunen og beboerne arbejder sammen, tror jeg, at det kan lade sig gøre.'
},
checklist:['Выбран один вариант (A или B) и выполнены все его пункты.','Вариант A: форма читательского письма (Til redaktionen, подпись), позиция в начале, два аргумента, контраргумент с комментарием, призыв в конце.','Вариант B: описание от общего к частному, затем плюсы, минусы (минимум два) и взгляд в будущее.','Использованы сравнительные формы и конструкции (bedre, flere, mindre, færre, mere).','Использованы связки (for det første, for det andet, desuden, dog, i øvrigt, derfor).','Правильно употреблены артикли и род существительных (en café, et loppemarked, en park).','Объём 200–300 слов.'],
phrases:[
{da:'Kommunen har foreslået, at …',ru:'Коммуна предложила, чтобы …'},
{da:'Jeg synes, at det er en god idé.',ru:'Я считаю, что это хорошая идея.'},
{da:'Jeg forstår godt bekymringen, men …',ru:'Я хорошо понимаю опасения, но …'},
{da:'Man kunne starte med en prøveperiode.',ru:'Можно было бы начать с пробного периода.'},
{da:'Jeg vil opfordre til at …',ru:'Я призываю …'},
{da:'Jeg bor i et kvarter, som ligger …',ru:'Я живу в районе, который находится …'},
{da:'Det, jeg bedst kan lide, er …',ru:'Больше всего мне нравится …'},
{da:'Der er dog ting, som kunne blive bedre.',ru:'Однако есть вещи, которые можно было бы улучшить.'},
{da:'Om ti år håber jeg, at …',ru:'Через десять лет я надеюсь, что …'},
{da:'Det kan lade sig gøre, hvis …',ru:'Это осуществимо, если …'}
]
}
];

export const writingCriteria=[
{id:'content',title:'Содержание и выполнение задания',descriptors:['Я выполнил(а) все пункты задания, ничего не пропустив.','Текст соответствует жанру: письмо, читательское письмо, рассказ, комментарий или рекомендация.','Мысли подкреплены причинами, примерами или деталями, а не только утверждениями.','Объём находится в нужных пределах, и самая важная часть не сведена к одной фразе.','Это ориентиры для самооценки по мотивам требований B2, а не официальные критерии экзамена.']},
{id:'vocabulary',title:'Словарный запас',descriptors:['Я использую точные слова вместо общих («god», «dårlig», «ting»).','Я избегаю повторов и подбираю синонимы или близкие выражения.','Я применяю устойчивые выражения и коллокации (tage sig tid til, give besked, komme i gang).','Стиль соответствует ситуации: письмо в организацию вежливое, письмо другу тёплое и неформальное.']},
{id:'grammar',title:'Грамматика и орфография',descriptors:['Порядок слов в главных предложениях соблюдается: глагол стоит на втором месте (V2), в том числе после вводных слов и придаточных.','В придаточных предложениях «ikke», «ofte» и подобные слова стоят после подлежащего.','Формы глаголов (прошедшее время, perfektum, инфинитив с «at»), артикли и род существительных в основном верны.','Орфография, знаки препинания и запятая перед придаточными в основном верны, а ошибки не мешают пониманию.']},
{id:'coherence',title:'Связность и структура',descriptors:['У текста есть ясное начало, основная часть и конец.','Абзацы разделены по смыслу; в каждом одна главная мысль.','Я использую разные связки (men, fordi, selvom, desuden, derfor, alligevel), а не только «og».','Переходы между мыслями понятны, читателю не нужно догадываться о связи между ними.']}
];

export const connectors=[
'og','men','eller','for','så','fordi','da','når','hvis','selvom','mens','før','efter','indtil','siden','derfor','desuden','imidlertid','dog','alligevel','endvidere','ellers','derimod','dermed','nemlig','altså','medmindre','hverken','både','enten','hvorimod','ligesom','uanset','samtidig','blandt andet','for eksempel','i øvrigt','på den ene side','på den anden side','med andre ord','til sidst','først og fremmest','for det første','for det andet','til gengæld','tværtimod','i stedet','som følge heraf','det vil sige','efter min mening','i sidste ende','på grund af','ud over','på trods af','ikke desto mindre','så snart','afslutningsvis','sammenfattende','endelig','derefter','bagefter'
];
