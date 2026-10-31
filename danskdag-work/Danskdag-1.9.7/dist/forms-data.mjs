// Curated learning reference. Forms are explicit, not inferred from an infinitive.
// Source selection, corrections and scope: docs/forms-sources.md.
const verbRows = [
  ['være', 'er', 'var', 'været', 'vær', 'har', 'быть', 'auxiliary', 'Førnutid: har været, не er været. Также вспомогательный глагол: er kommet; пассив: er repareret.'],
  ['have', 'har', 'havde', 'haft', 'hav', 'har', 'иметь; у кого-то есть', 'auxiliary', 'Førnutid: har haft. Вспомогательный have не требует отдельного at перед причастием.'],
  ['blive', 'bliver', 'blev', 'blevet', 'bliv', 'er', 'становиться; оставаться', 'auxiliary', 'Er blevet: изменение состояния. Blive также образует пассив: bilen bliver repareret.'],
  ['kunne', 'kan', 'kunne', 'kunnet', '', 'har', 'мочь; уметь', 'modal', 'Kan + инфинитив без at. Обычной повелительной формы нет.'],
  ['skulle', 'skal', 'skulle', 'skullet', '', 'har', 'долженствовать; собираться по плану', 'modal', 'Skal + инфинитив без at; план или обязанность определяются контекстом. Обычной повелительной формы нет.'],
  ['ville', 'vil', 'ville', 'villet', '', 'har', 'хотеть; намереваться', 'modal', 'Vil + инфинитив без at; желание, намерение или прогноз. Обычная повелительная форма в этом значении не используется.'],
  ['måtte', 'må', 'måtte', 'måttet', '', 'har', 'мочь по разрешению; быть вынужденным', 'modal', 'Må jeg...? — разрешение; må ikke — запрет. Må также выражает необходимость или вывод. Обычной повелительной формы нет.'],
  ['burde', 'bør', 'burde', 'burdet', '', 'har', 'следовать; стоило бы', 'modal', 'Bør/ burde + инфинитив без at. Burde часто выражает совет сейчас, а не прошлое. Обычной повелительной формы нет.'],
  ['gøre', 'gør', 'gjorde', 'gjort', 'gør', 'har', 'делать', 'irregular', 'Gøre rent — убирать; lave mad — готовить еду. Русскому «делать» не всегда соответствует один датский глагол.'],
  ['gå', 'går', 'gik', 'gået', 'gå', 'har/er', 'идти; ходить', 'irregular', 'Er gået hjem — ушёл домой; har gået hele dagen — ходил весь день. Выбор har/er зависит от значения и конструкции.'],
  ['komme', 'kommer', 'kom', 'kommet', 'kom', 'er', 'приходить; приезжать', 'irregular', 'При прибытии: er kommet. Datid и повелительная форма совпадают: kom.'],
  ['tage', 'tager', 'tog', 'taget', 'tag', 'har/er', 'брать; отправляться', 'irregular', 'Har taget nøglen — взял ключ; er taget hjem — уехал домой. Наличие объекта и значение важнее ярлыка «глагол движения».'],
  ['give', 'giver', 'gav', 'givet', 'giv', 'har', 'давать', 'irregular'],
  ['se', 'ser', 'så', 'set', 'se', 'har', 'видеть; смотреть', 'irregular'],
  ['sige', 'siger', 'sagde', 'sagt', 'sig', 'har', 'сказать; говорить', 'irregular', 'Sige noget — сказать что-то; tale med nogen — разговаривать с кем-то.'],
  ['finde', 'finder', 'fandt', 'fundet', 'find', 'har', 'находить', 'irregular'],
  ['holde', 'holder', 'holdt', 'holdt', 'hold', 'har', 'держать; проводить; останавливаться', 'irregular', 'Holdt — и datid, и причастие. Например: holdt et møde / har holdt et møde.'],
  ['lede', 'leder', 'ledte', 'ledt', 'led', 'har', 'искать; руководить', 'regular-te', 'Lede efter — искать: ledte, ledt. Для «руководить, направлять» также допустимы ledede, ledet. Не смешивай с lide → led → lidt.'],
  ['lide', 'lider', 'led', 'lidt', 'lid', 'har', 'страдать; в kan lide — нравиться', 'irregular', 'Jeg kan lide kaffe — мне нравится кофе; не jeg lider kaffe. Lide → led → lidt; lede → ledte → ledt. Lid — редкая команда в значении «страдай», не команда «нравься».'],
  ['få', 'får', 'fik', 'fået', 'få', 'har', 'получать', 'irregular'],
  ['vide', 'ved', 'vidste', 'vidst', 'vid', 'har', 'знать факт', 'irregular', 'Vide — знать информацию; kende — быть знакомым с человеком или местом. Vid встречается в выражении Vid, at...'],
  ['forstå', 'forstår', 'forstod', 'forstået', 'forstå', 'har', 'понимать', 'irregular'],
  ['stå', 'står', 'stod', 'stået', 'stå', 'har', 'стоять', 'irregular', 'Har stået her — стоял здесь. В отдельной конструкции stå op (вставать): er stået op.'],
  ['sidde', 'sidder', 'sad', 'siddet', 'sid', 'har', 'сидеть', 'irregular', 'Sidde — находиться сидя; sætte sig — садиться.'],
  ['ligge', 'ligger', 'lå', 'ligget', 'lig', 'har', 'лежать; находиться', 'irregular', 'Bogen ligger her — книга лежит здесь. Lægge требует того, что кладут: jeg lægger bogen her.'],
  ['lægge', 'lægger', 'lagde', 'lagt', 'læg', 'har', 'класть', 'irregular', 'Lægge bogen på bordet — класть книгу на стол. Ligge → lå → ligget означает «лежать».'],
  ['sætte', 'sætter', 'satte', 'sat', 'sæt', 'har', 'ставить; сажать', 'irregular', 'Sætte sig — садиться; sidde — сидеть.'],
  ['skrive', 'skriver', 'skrev', 'skrevet', 'skriv', 'har', 'писать', 'irregular'],
  ['læse', 'læser', 'læste', 'læst', 'læs', 'har', 'читать; учиться', 'regular-te'],
  ['spise', 'spiser', 'spiste', 'spist', 'spis', 'har', 'есть; кушать', 'regular-te'],
  ['drikke', 'drikker', 'drak', 'drukket', 'drik', 'har', 'пить', 'irregular'],
  ['sove', 'sover', 'sov', 'sovet', 'sov', 'har', 'спать', 'irregular'],
  ['hjælpe', 'hjælper', 'hjalp', 'hjulpet', 'hjælp', 'har', 'помогать', 'irregular'],
  ['vælge', 'vælger', 'valgte', 'valgt', 'vælg', 'har', 'выбирать', 'irregular'],
  ['sælge', 'sælger', 'solgte', 'solgt', 'sælg', 'har', 'продавать', 'irregular'],
  ['bringe', 'bringer', 'bragte', 'bragt', 'bring', 'har', 'приносить; доставлять', 'irregular'],
  ['tænke', 'tænker', 'tænkte', 'tænkt', 'tænk', 'har', 'думать', 'regular-te'],
  ['spørge', 'spørger', 'spurgte', 'spurgt', 'spørg', 'har', 'спрашивать', 'irregular'],
  ['svare', 'svarer', 'svarede', 'svaret', 'svar', 'har', 'отвечать', 'regular-ede'],
  ['købe', 'køber', 'købte', 'købt', 'køb', 'har', 'покупать', 'regular-te'],
  ['bruge', 'bruger', 'brugte', 'brugt', 'brug', 'har', 'использовать', 'regular-te'],
  ['lære', 'lærer', 'lærte', 'lært', 'lær', 'har', 'учить; учиться', 'regular-te'],
  ['høre', 'hører', 'hørte', 'hørt', 'hør', 'har', 'слышать', 'regular-te'],
  ['køre', 'kører', 'kørte', 'kørt', 'kør', 'har/er', 'ехать; водить; везти', 'regular-te', 'Har kørt bilen — водил машину; er kørt hjem — уехал домой. Har kørt i tre timer описывает деятельность.'],
  ['løbe', 'løber', 'løb', 'løbet', 'løb', 'har/er', 'бежать; бегать', 'irregular', 'Har løbet i en time — бегал час; er løbet hjem — убежал домой. Har/er отражает деятельность или перемещение к результату.'],
  ['rejse', 'rejser', 'rejste', 'rejst', 'rejs', 'har/er', 'путешествовать; уезжать; поднимать', 'regular-te', 'Har rejst meget — много путешествовал; er rejst til Danmark — уехал в Данию. С объектом: har rejst et spørgsmål.'],
  ['flytte', 'flytter', 'flyttede', 'flyttet', 'flyt', 'har/er', 'переезжать; перемещать', 'regular-ede', 'Er flyttet til Aarhus — переехал; har flyttet bordet — передвинул стол.'],
  ['begynde', 'begynder', 'begyndte', 'begyndt', 'begynd', 'har/er', 'начинать; начинаться', 'regular-te', 'Er begyndt at arbejde — начал работать; har begyndt dagen med kaffe — начал день с кофе. Выбор har/er зависит от конструкции.'],
  ['slutte', 'slutter', 'sluttede', 'sluttet', 'slut', 'har/er', 'заканчивать; заканчиваться', 'regular-ede', 'Har sluttet mødet — закончил встречу; mødet er sluttet — встреча закончилась. Вторая конструкция также может описывать состояние.'],
  ['arbejde', 'arbejder', 'arbejdede', 'arbejdet', 'arbejd', 'har', 'работать', 'regular-ede'],
  ['bo', 'bor', 'boede', 'boet', 'bo', 'har', 'жить; проживать', 'regular-ede'],
  ['leve', 'lever', 'levede', 'levet', 'lev', 'har', 'жить; быть живым', 'regular-ede', 'Bo — проживать где-то; leve — жить, вести определённую жизнь.'],
  ['hedde', 'hedder', 'hed', 'heddet', 'hed', 'har', 'называться; носить имя', 'irregular', 'Hed — основная datid в этой таблице. Повелительная форма редка; обычно имя спрашивают Hvad hedder du?'],
  ['tale', 'taler', 'talte', 'talt', 'tal', 'har', 'говорить; разговаривать', 'regular-te'],
  ['snakke', 'snakker', 'snakkede', 'snakket', 'snak', 'har', 'разговаривать; болтать', 'regular-ede'],
  ['fortælle', 'fortæller', 'fortalte', 'fortalt', 'fortæl', 'har', 'рассказывать', 'irregular'],
  ['forklare', 'forklarer', 'forklarede', 'forklaret', 'forklar', 'har', 'объяснять', 'regular-ede'],
  ['prøve', 'prøver', 'prøvede', 'prøvet', 'prøv', 'har', 'пробовать; пытаться; примерять', 'regular-ede'],
  ['vente', 'venter', 'ventede', 'ventet', 'vent', 'har', 'ждать', 'regular-ede'],
  ['møde', 'møder', 'mødte', 'mødt', 'mød', 'har/er', 'встречать; являться', 'regular-te', 'Har mødt en ven — встретил друга; er mødt på arbejde — явился на работу. В значении «являться» возможен также har. Mødes — встречаться друг с другом.'],
  ['besøge', 'besøger', 'besøgte', 'besøgt', 'besøg', 'har', 'посещать; навещать', 'regular-te'],
  ['ringe', 'ringer', 'ringede', 'ringet', 'ring', 'har', 'звонить', 'regular-ede', 'Ringe til nogen — звонить кому-то. Формы относятся к обычному значению «звонить».'],
  ['sende', 'sender', 'sendte', 'sendt', 'send', 'har', 'посылать; отправлять', 'regular-te'],
  ['hente', 'henter', 'hentede', 'hentet', 'hent', 'har', 'забирать; приносить откуда-то', 'regular-ede'],
  ['åbne', 'åbner', 'åbnede', 'åbnet', 'åbn', 'har', 'открывать', 'regular-ede'],
  ['lukke', 'lukker', 'lukkede', 'lukket', 'luk', 'har', 'закрывать', 'regular-ede'],
  ['starte', 'starter', 'startede', 'startet', 'start', 'har/er', 'начинать; запускать; стартовать', 'regular-ede', 'Har startet bilen — запустил машину; er startet på kurset — приступил к курсу. Har startet называет запуск с объектом, er startet — начало участия.'],
  ['stoppe', 'stopper', 'stoppede', 'stoppet', 'stop', 'har/er', 'останавливать; останавливаться', 'regular-ede', 'Har stoppet maskinen — остановил станок; er stoppet med at ryge — бросил курить. Har/er меняются с конструкцией.'],
  ['lave', 'laver', 'lavede', 'lavet', 'lav', 'har', 'делать; изготавливать; готовить', 'regular-ede'],
  ['betale', 'betaler', 'betalte', 'betalt', 'betal', 'har', 'платить', 'regular-te'],
  ['bestille', 'bestiller', 'bestilte', 'bestilt', 'bestil', 'har', 'заказывать', 'regular-te'],
  ['behøve', 'behøver', 'behøvede', 'behøvet', 'behøv', 'har', 'нуждаться; быть необходимым', 'regular-ede', 'Du behøver ikke (at) komme — тебе необязательно приходить. Behøv — редкая повелительная форма; behøver ikke не означает запрет.'],
  ['huske', 'husker', 'huskede', 'husket', 'husk', 'har', 'помнить; не забывать', 'regular-ede'],
  ['glemme', 'glemmer', 'glemte', 'glemt', 'glem', 'har', 'забывать', 'regular-te'],
  ['tro', 'tror', 'troede', 'troet', 'tro', 'har', 'верить; полагать', 'regular-ede'],
  ['mene', 'mener', 'mente', 'ment', 'men', 'har', 'считать; иметь в виду', 'regular-te', 'Men — грамматическая повелительная форма, встречается редко; не путай с союзом men («но»).'],
  ['føle', 'føler', 'følte', 'følt', 'føl', 'har', 'чувствовать', 'regular-te'],
  ['elske', 'elsker', 'elskede', 'elsket', 'elsk', 'har', 'любить', 'regular-ede'],
  ['smile', 'smiler', 'smilede', 'smilet', 'smil', 'har', 'улыбаться', 'regular-ede'],
  ['grine', 'griner', 'grinede', 'grinet', 'grin', 'har', 'смеяться', 'regular-ede'],
  ['vaske', 'vasker', 'vaskede', 'vasket', 'vask', 'har', 'мыть; стирать', 'regular-ede'],
  ['rydde', 'rydder', 'ryddede', 'ryddet', 'ryd', 'har', 'расчищать; убирать', 'regular-ede', 'Rydde op — наводить порядок; gøre rent — убирать грязь, мыть.'],
  ['rense', 'renser', 'rensede', 'renset', 'rens', 'har', 'чистить; очищать', 'regular-ede'],
  ['reparere', 'reparerer', 'reparerede', 'repareret', 'reparer', 'har', 'ремонтировать', 'regular-ede'],
  ['montere', 'monterer', 'monterede', 'monteret', 'monter', 'har', 'монтировать; устанавливать', 'regular-ede'],
  ['kontrollere', 'kontrollerer', 'kontrollerede', 'kontrolleret', 'kontroller', 'har', 'проверять; контролировать', 'regular-ede'],
  ['måle', 'måler', 'målte', 'målt', 'mål', 'har', 'измерять', 'regular-te'],
  ['bore', 'borer', 'borede', 'boret', 'bor', 'har', 'сверлить', 'regular-ede'],
  ['slibe', 'sliber', 'sleb', 'slebet', 'slib', 'har', 'шлифовать; точить', 'irregular'],
  ['skære', 'skærer', 'skar', 'skåret', 'skær', 'har', 'резать', 'irregular'],
  ['skrue', 'skruer', 'skruede', 'skruet', 'skru', 'har', 'завинчивать; крутить', 'regular-ede'],
  ['skifte', 'skifter', 'skiftede', 'skiftet', 'skift', 'har', 'менять; заменять', 'regular-ede'],
  ['bygge', 'bygger', 'byggede', 'bygget', 'byg', 'har', 'строить', 'regular-ede'],
  ['male', 'maler', 'malede', 'malet', 'mal', 'har', 'красить; рисовать красками', 'regular-ede'],
  ['tegne', 'tegner', 'tegnede', 'tegnet', 'tegn', 'har', 'рисовать; чертить', 'regular-ede'],
  ['bære', 'bærer', 'bar', 'båret', 'bær', 'har', 'нести; носить', 'irregular'],
  ['trække', 'trækker', 'trak', 'trukket', 'træk', 'har', 'тянуть; вытаскивать', 'irregular'],
  ['trykke', 'trykker', 'trykkede', 'trykket', 'tryk', 'har', 'нажимать', 'regular-ede', 'Trykkede/trykket — нажимать, давить. Trykte/trykt употребляют для печати: trykte en bog.'],
  ['dreje', 'drejer', 'drejede', 'drejet', 'drej', 'har/er', 'поворачивать; вращать', 'regular-ede', 'Har drejet håndtaget — повернул ручку; er drejet til venstre — повернул налево. Har/er зависит от значения и конструкции. Повелительная форма drej, без конечного -e.'],
  ['dele', 'deler', 'delte', 'delt', 'del', 'har', 'делить; разделять; делиться', 'regular-te'],
  ['planlægge', 'planlægger', 'planlagde', 'planlagt', 'planlæg', 'har', 'планировать', 'irregular'],
  ['aftale', 'aftaler', 'aftalte', 'aftalt', 'aftal', 'har', 'договариваться о чём-то', 'regular-te'],
  ['bestemme', 'bestemmer', 'bestemte', 'bestemt', 'bestem', 'har', 'решать; определять', 'regular-te'],
  ['beslutte', 'beslutter', 'besluttede', 'besluttet', 'beslut', 'har', 'принимать решение', 'regular-ede'],
  ['ændre', 'ændrer', 'ændrede', 'ændret', 'ændr', 'har', 'изменять', 'regular-ede'],
  ['tilbyde', 'tilbyder', 'tilbød', 'tilbudt', 'tilbyd', 'har', 'предлагать', 'irregular'],
  ['modtage', 'modtager', 'modtog', 'modtaget', 'modtag', 'har', 'получать; принимать', 'irregular'],
  ['melde', 'melder', 'meldte', 'meldt', 'meld', 'har', 'сообщать; заявлять; регистрировать', 'regular-te'],
  ['falde', 'falder', 'faldt', 'faldet', 'fald', 'er', 'падать', 'irregular', 'Er faldet — упал; падение представлено как переход к новому состоянию.'],
  ['vågne', 'vågner', 'vågnede', 'vågnet', 'vågn', 'er', 'просыпаться', 'regular-ede', 'Er vågnet — проснулся; vække — будить кого-то.'],
  ['dø', 'dør', 'døde', 'død', 'dø', 'er', 'умирать', 'irregular', 'Er død описывает смерть и состояние «мёртв». Причастие død, без -et.'],
  ['savne', 'savner', 'savnede', 'savnet', 'savn', 'har', 'скучать по; недоставать', 'regular-ede'],
  ['parkere', 'parkerer', 'parkerede', 'parkeret', 'parker', 'har', 'парковать', 'regular-ede'],
  ['passe', 'passer', 'passede', 'passet', 'pas', 'har', 'подходить; присматривать', 'regular-ede', 'Passe på — беречь, следить за; Pas på! — осторожно!']
];

const stableSlug = word => word.toLowerCase().replaceAll('æ', 'ae').replaceAll('ø', 'oe').replaceAll('å', 'aa');
export const verbForms = verbRows.map(([infinitive, present, past, participle, imperative, auxiliary, ru, group, note = '']) => ({
  id: `verb-form-${stableSlug(infinitive)}`, infinitive, present, past, participle, imperative, auxiliary, ru, group, note
}));

const adjectiveRows = [
  ['god', 'bedre', 'bedst', 'хороший', 'Неправильное сравнение: не godere. Перед определённым существительным: den bedste løsning.'],
  ['dårlig', 'værre', 'værst', 'плохой', 'Также обычны dårligere / dårligst, особенно при сравнении качества: dårligere kvalitet. Værre / værst часто обозначает ухудшение, более тяжёлую или неприятную ситуацию; варианты выбирают по смыслу.'],
  ['lille', 'mindre', 'mindst', 'маленький', 'Lille — единственное число; små — положительная форма множественного числа: små børn. Små не является сравнительной степенью; сравнение размеров: mindre / mindst.'],
  ['stor', 'større', 'størst', 'большой', 'О размере: stor / større / størst. Количество предметов передают mange / flere / flest.'],
  ['gammel', 'ældre', 'ældst', 'старый', 'О возрасте: ældre / ældst. В словосочетании с определённостью: den ældste.'],
  ['ung', 'yngre', 'yngst', 'молодой', 'Неправильные формы сравнения по возрасту.'],
  ['lang', 'længere', 'længst', 'длинный', 'О длине или длительности. Længere от lang; наречие langt также сравнивается længere / længst.'],
  ['få', 'færre', 'færrest', 'мало; немногие', 'Количество считаемых предметов: få biler / færre biler / færrest biler. Для вещества: lidt / mindre / mindst. Это слово количества.', 'quantity'],
  ['mange', 'flere', 'flest', 'много считаемых предметов', 'Mange biler → flere biler → flest biler. Flere также означает «ещё несколько». Для воды и другого неисчисляемого: meget / mere / mest.', 'quantity'],
  ['meget', 'mere', 'mest', 'много; очень', 'Количество вещества или степень: meget vand / mere vand / mest vand; meget glad — очень рад. Есть форма megen (megen tid); meget часто употребляется и с en-словами. Это слово количества или наречие.', 'quantity'],
  ['lidt', 'mindre', 'mindst', 'немного; мало', 'Количество вещества или степень: lidt vand / mindre vand / mindst vand. Считаемые предметы: få / færre / færrest. Не путай с lille «маленький».', 'quantity'],
  ['varm', 'varmere', 'varmest', 'тёплый; горячий', 'О температуре: varmere end... — теплее, чем...'],
  ['sød', 'sødere', 'sødest', 'милый; сладкий', 'Формы подходят и для «милый», и для «сладкий»; перевод зависит от предмета.'],
  ['rig', 'rigere', 'rigest', 'богатый', 'Den rigeste — самый богатый; сравнение: rigere end...'],
  ['billig', 'billigere', 'billigst', 'дешёвый; недорогой', 'О цене: den billigste vare — самый дешёвый товар.'],
  ['bleg', 'blegere', 'blegest', 'бледный', 'Сравнение степени бледности.'],
  ['dejlig', 'dejligere', 'dejligst', 'приятный; чудесный', 'Возможны также конструкции mere / mest dejlig, если контекст требует смыслового противопоставления.'],
  ['doven', 'dovnere', 'dovnest', 'ленивый', 'В сравнении выпадает e основы: dovnere, dovnest.'],
  ['dum', 'dummere', 'dummest', 'глупый', 'В сравнительной и превосходной форме удваивается m.'],
  ['dygtig', 'dygtigere', 'dygtigst', 'умелый; способный', 'Dygtig til noget — хорошо умеющий что-то делать.'],
  ['enkel', 'enklere', 'enklest', 'простой; несложный', 'В сравнении выпадает e основы: enklere, enklest.'],
  ['ensom', 'ensommere', 'ensomst', 'одинокий', 'Правильно ensommere, но ensomst с одним m перед -st.'],
  ['fattig', 'fattigere', 'fattigst', 'бедный', 'О достатке или нехватке: fattig på... — бедный чем-то.'],
  ['fed', 'federe', 'fedest', 'жирный; толстый; классный', 'О жирности или толщине; в разговорной речи также «классный». О людях слово может звучать грубо.'],
  ['fin', 'finere', 'finest', 'хороший; изящный; тонкий', 'Не только «элегантный»: значение зависит от контекста (fin kvalitet, fint sand).'],
  ['flad', 'fladere', 'fladest', 'плоский', 'Сравнение плоскости или малой выпуклости.'],
  ['flot', 'flottere', 'flottest', 'красивый; эффектный', 'В сравнении удваивается t: flottere, flottest.'],
  ['forelsket', 'mere forelsket', 'mest forelsket', 'влюблённый', 'Сравнение с mere / mest; обычная модель: forelsket i nogen.'],
  ['fri', 'friere', 'friest', 'свободный', 'Сравнение степени свободы; не каждое значение fri допускает буквальную градацию.'],
  ['frivillig', 'mere frivillig', 'mest frivillig', 'добровольный', 'Сравнение возможно, когда обсуждают степень добровольности или готовности. Не каждый выбор «добровольный/обязательный» образует естественную шкалу.'],
  ['gal', 'galere', 'galest', 'сердитый; безумный; неверный', 'Обычны galere / galest; возможны mere gal / mest gal. Gal på nogen — сердитый на кого-то; сравнение выбирают по значению.'],
  ['grøn', 'grønnere', 'grønnest', 'зелёный', 'Сравнивают оттенок или переносное качество: grønnere energi.'],
  ['gul', 'gulere', 'gulest', 'жёлтый', 'О степени желтизны: gulere; gulest встречается реже. Mere gul / mest gul также возможны, особенно при сравнении оттенков.'],
  ['hellig', 'helligere', 'helligst', 'святой; священный', 'Сравнение употребляют, когда контекст допускает степень святости или особой неприкосновенности.'],
  ['høj', 'højere', 'højest', 'высокий', 'Højere / højest: высота, уровень, громкость. Для роста человека также høj.'],
  ['hurtig', 'hurtigere', 'hurtigst', 'быстрый', 'Hurtigere end... — быстрее, чем...'],
  ['klog', 'klogere', 'klogest', 'умный; мудрый', 'Klogere / klogest: умнее, мудрее.'],
  ['kold', 'koldere', 'koldest', 'холодный', 'Сравнение температуры; есть также переносные значения.'],
  ['kort', 'kortere', 'kortest', 'короткий', 'О длине или длительности: en kortere pause.'],
  ['kraftig', 'kraftigere', 'kraftigst', 'сильный; мощный; интенсивный', 'О силе или интенсивности: kraftigere regn, en kraftigere motor.'],
  // Irregular and frequent comparisons added in the antonym update. Adverbs carry wordClass 'adverb'; forms with mere / mest are listed in full.
  ['tidlig', 'tidligere', 'tidligst', 'ранний', 'Наречие — tidligt: komme tidligt. Tidligere также значит «прежний; раньше»: min tidligere chef. Противоположность: sen.'],
  ['sen', 'senere', 'senest', 'поздний', 'Наречие — sent: komme for sent. Senere — «позже», senest — «самое позднее»: senest klokken otte. Противоположность: tidlig.'],
  ['lav', 'lavere', 'lavest', 'низкий', 'О высоте, уровне, цене: lavere priser. О человеке — невысокого роста. Противоположность: høj.'],
  ['nær', 'nærmere', 'nærmest', 'близкий; рядом', 'Den nærmeste station — ближайшая станция; nærmere oplysninger — подробности. Для расстояния чаще tæt.'],
  ['fjern', 'fjernere', 'fjernest', 'далёкий; дальний', 'О расстоянии и времени: en fjern fremtid, et fjernt land. В разговоре «далеко» чаще langt væk.'],
  ['tung', 'tungere', 'tungest', 'тяжёлый', 'Tungere end... — тяжелее, чем... Переносно: en tung dag, tung musik. Противоположность по весу: let.'],
  ['tyk', 'tykkere', 'tykkest', 'толстый', 'Удваивается k: tykkere, tykkest. О человеке звучит грубо, мягче — kraftig. Противоположность: tynd.'],
  ['tynd', 'tyndere', 'tyndest', 'тонкий; худой', 'Об одежде, книге, слое: en tynd bog. Противоположность: tyk.'],
  ['nem', 'nemmere', 'nemmest', 'лёгкий; нетрудный', 'Удваивается m: nemmere, nemmest. Близкие слова: let, enkel. Противоположность: svær.'],
  ['svær', 'sværere', 'sværest', 'трудный', 'О трудности задачи, языка, решения: en svær opgave. Вес вещи — tung, не svær. Противоположность: nem.'],
  ['tæt', 'tættere', 'tættest', 'близкий; плотный', 'Удваивается t. Tæt på — рядом: tættere på stationen. Также «плотный»: tæt skov.'],
  ['sjælden', 'sjældnere', 'sjældnest', 'редкий', 'Выпадает e: sjældnere, sjældnest. Наречие — sjældent. Противоположность: almindelig.'],
  ['almindelig', 'almindeligere', 'almindeligst', 'обычный; распространённый', 'Den almindeligste måde — самый распространённый способ.'],
  ['populær', 'mere populær', 'mest populær', 'популярный', 'Через mere / mest, а не -ere: den mest populære film.'],
  ['farlig', 'farligere', 'farligst', 'опасный', 'Прилагательные на -lig обычно берут -ere / -st. Противоположность: ufarlig.'],
  ['sikker', 'sikrere', 'sikrest', 'надёжный; безопасный; уверенный', 'Выпадает e: sikrere, sikrest. Jeg er sikker på det — я в этом уверен; en sikker vej — безопасная дорога.'],
  ['glad', 'gladere', 'gladest', 'радостный; довольный', 'Glad for... — рад чему-то; glad i... — любить кого-то. Противоположность: trist.'],
  ['rolig', 'roligere', 'roligst', 'спокойный', 'Vær rolig! — Успокойся! Противоположность: urolig.'],
  ['smuk', 'smukkere', 'smukkest', 'красивый', 'Удваивается k: smukkere, smukkest. Pæn и flot — другие слова для «красивый; приятный на вид».'],
  ['pæn', 'pænere', 'pænest', 'красивый; аккуратный', 'О внешности, одежде, поведении: en pæn kjole. Det ser pænt ud — выглядит аккуратно.'],
  ['rar', 'rarere', 'rarest', 'приятный; милый', 'О человеке и ощущении: en rar nabo. Rart at møde dig — приятно познакомиться.'],
  ['sjov', 'sjovere', 'sjovest', 'забавный; весёлый', 'En sjov film — забавный фильм; Det var sjovt — было весело. Противоположность: kedelig.'],
  ['kedelig', 'kedeligere', 'kedeligst', 'скучный', 'Также «досадный»: Det er kedeligt, at... — жаль, что... Противоположность: spændende.'],
  ['vigtig', 'vigtigere', 'vigtigst', 'важный', 'Det vigtigste — самое важное. Противоположность: uvæsentlig.'],
  ['let', 'lettere', 'lettest', 'лёгкий по весу; нетрудный', 'О весе: en let taske. Также «нетрудно»: Det er let. Удваивается t: lettere, lettest.'],
  ['langsom', 'langsommere', 'langsomst', 'медленный', 'Удваивается m: langsommere, langsomst. Наречие — langsomt. Противоположность: hurtig.'],
  ['stærk', 'stærkere', 'stærkest', 'сильный; крепкий', 'О силе, кофе, запахе: stærk kaffe. Противоположность: svag.'],
  ['svag', 'svagere', 'svagest', 'слабый', 'О силе, здоровье, сигнале: en svag stemme. Противоположность: stærk.'],
  ['hård', 'hårdere', 'hårdest', 'твёрдый; жёсткий', 'О поверхности и характере: et hårdt gulv, hård kritik. Противоположность: blød.'],
  ['blød', 'blødere', 'blødest', 'мягкий', 'О материале и характере: en blød seng, blødt brød. Противоположность: hård.'],
  ['ren', 'renere', 'renest', 'чистый', 'Rent vand — чистая вода; gøre rent — убирать. Противоположность: beskidt.'],
  ['tør', 'tørrere', 'tørrest', 'сухой', 'Удваивается r: tørrere, tørrest. Противоположность: våd.'],
  ['våd', 'vådere', 'vådest', 'мокрый', 'Vådt tøj — мокрая одежда. Противоположность: tør.'],
  ['dyr', 'dyrere', 'dyrest', 'дорогой по цене', 'Dyrere end... — дороже, чем... Противоположность: billig. Et dyr — животное.'],
  ['ny', 'nyere', 'nyest', 'новый', 'Nyere также значит «сравнительно новый»: nyere bøger. Противоположность: gammel.'],
  ['bred', 'bredere', 'bredest', 'широкий', 'О дороге, плечах, улыбке: en bred gade. Противоположность: smal.'],
  ['smal', 'smallere', 'smallest', 'узкий', 'Удваивается l: smallere, smallest. Противоположность: bred.'],
  ['dyb', 'dybere', 'dybest', 'глубокий', 'О воде, яме, сне, чувстве: en dyb sø, dyb søvn.'],
  ['mørk', 'mørkere', 'mørkest', 'тёмный', 'О цвете и освещении: mørk chokolade. Противоположность: lys.'],
  ['lys', 'lysere', 'lysest', 'светлый', 'О цвете и освещении: en lys stue. Lys — также существительное: et lys, свеча.'],
  ['hvid', 'hvidere', 'hvidest', 'белый', 'Hvidvin — белое вино. Противоположность: sort.'],
  ['stejl', 'stejlere', 'stejlest', 'крутой', 'О склоне и лестнице: en stejl trappe. Противоположность: flad.'],
  ['skarp', 'skarpere', 'skarpest', 'острый; резкий', 'О ноже, вкусе, мысли: en skarp kniv. Противоположность: sløv.'],
  ['sund', 'sundere', 'sundest', 'здоровый о питании и образе жизни', 'Sund mad — здоровая еда. О самочувствии человека обычно rask; больной — syg.'],
  ['ærlig', 'ærligere', 'ærligst', 'честный', 'Ærligt talt — честно говоря. Противоположность: uærlig.'],
  ['venlig', 'venligere', 'venligst', 'дружелюбный; любезный', 'Venligst — «пожалуйста» в вежливой просьбе: Luk døren venligst. Противоположность: uvenlig.'],
  ['modig', 'modigere', 'modigst', 'смелый', 'Mod — смелость; modig — смелый. Противоположность по смыслу: bange.'],
  ['høflig', 'høfligere', 'høfligst', 'вежливый', 'Det er høfligt at sige tak. Противоположность: uhøflig.'],
  ['flittig', 'flittigere', 'flittigst', 'прилежный; трудолюбивый', 'Об учёбе и работе: en flittig elev. Противоположность: doven.'],
  ['forsigtig', 'forsigtigere', 'forsigtigst', 'осторожный', 'Vær forsigtig! — Будь осторожен! Наречие — forsigtigt.'],
  ['heldig', 'heldigere', 'heldigst', 'везучий; удачливый', 'Jeg var heldig — мне повезло. Не путай с glad «радостный».'],
  ['nysgerrig', 'nysgerrigere', 'nysgerrigst', 'любопытный', 'Nysgerrig på noget — любопытный к чему-то.'],
  ['alvorlig', 'alvorligere', 'alvorligst', 'серьёзный', 'О человеке, болезни, ошибке: en alvorlig fejl.'],
  ['gerne', 'hellere', 'helst', 'охотно', 'Gerne — охотно: Jeg vil gerne have kaffe. Hellere — лучше бы: Jeg vil hellere have te. Helst — больше всего: Jeg vil helst blive hjemme.', 'adverb'],
  ['snart', 'snarere', 'snarest', 'скоро', 'Vi ses snart — скоро увидимся. Snarere — «скорее; точнее»; snarest muligt — как можно скорее.', 'adverb'],
  ['ofte', 'oftere', 'oftest', 'часто', 'Jeg går ofte tur. Oftere — чаще; oftest — чаще всего. Противоположность: sjældent.', 'adverb'],
  ['sjældent', 'sjældnere', 'sjældnest', 'редко', 'Выпадает e: sjældnere, sjældnest. Противоположность: ofte.', 'adverb'],
  ['længe', 'længere', 'længst', 'долго', 'О времени: Jeg har ventet længe. Не путай с langt «далеко».', 'adverb'],
  ['langt', 'længere', 'længst', 'далеко', 'О расстоянии: Det er langt herfra. Не путай с længe «долго».', 'adverb'],
  ['spændende', 'mere spændende', 'mest spændende', 'захватывающий; интересный', 'Причастие на -ende сравнивают через mere / mest: en mere spændende bog.'],
  ['interessant', 'mere interessant', 'mest interessant', 'интересный', 'Слова на -ant / -ent обычно сравнивают через mere / mest.'],
  ['praktisk', 'mere praktisk', 'mest praktisk', 'практичный', 'Прилагательные на -isk сравнивают через mere / mest.'],
  ['typisk', 'mere typisk', 'mest typisk', 'типичный', 'Прилагательные на -isk: mere typisk, mest typisk.'],
  ['dansk', 'mere dansk', 'mest dansk', 'датский', 'Прилагательные на -sk: mere dansk, mest dansk. Название языка и национальность пишут с маленькой буквы.'],
  ['energisk', 'mere energisk', 'mest energisk', 'энергичный', 'Прилагательные на -isk: mere energisk, mest energisk.'],
  ['fantastisk', 'mere fantastisk', 'mest fantastisk', 'потрясающий', 'На -isk: mere fantastisk. Разговорно: Det er fantastisk!'],
  ['moderne', 'mere moderne', 'mest moderne', 'современный', 'Заимствованное прилагательное на -e: mere moderne, mest moderne.'],
  ['kendt', 'mere kendt', 'mest kendt', 'известный', 'Причастие на -t сравнивают через mere / mest: den mest kendte forfatter.'],
  ['tilfreds', 'mere tilfreds', 'mest tilfreds', 'довольный', 'Прилагательное на -s: mere tilfreds. Tilfreds med noget — доволен чем-то.']
];
export const adjectiveForms = adjectiveRows.map(([positive, comparative, superlative, ru, note, wordClass = 'adjective']) => ({
  id: `adjective-form-${stableSlug(positive)}`, positive, comparative, superlative, ru, note, wordClass
}));

const byVerb = Object.fromEntries(verbForms.map(v => [v.infinitive, v]));
function helpFor(infinitive) {
  const v = byVerb[infinitive];
  const auxiliaries = v.auxiliary.split('/');
  return [
    {label: 'Infinitiv · начальная форма', text: `at ${v.infinitive}`},
    {label: 'Nutid · настоящее', text: v.present},
    {label: 'Datid · прошедшее', text: v.past},
    {label: 'Førnutid · перфект', text: auxiliaries.map(a => `${a} ${v.participle}`).join(' / ')},
    {label: 'Førdatid · предпрошедшее', text: auxiliaries.map(a => `${a === 'har' ? 'havde' : 'var'} ${v.participle}`).join(' / ')},
    ...(v.imperative ? [{label: 'Imperativ · повелительная', text: v.imperative}] : []),
    ...(v.note ? [{label: 'Контекст', text: v.note}] : [])
  ];
}
const exercise = (verb, formLabel, da, ru, note, text, answer, wrong) => ({
  da, ru, note, type: 'gap', daAnswers: [da], ruAnswers: [ru], formLabel, formHelp: helpFor(verb),
  gap: {text, answers: [answer], options: [answer, ...wrong]}
});
const formLesson = (id, level, title, subtitle, rule, rows) => ({
  id, level, kind: 'grammar', color: 'violet', icon: 'layers', title, subtitle, rule,
  items: rows.map((row, index) => ({...row, id: `${id}-${index + 1}`, lessonId: id}))
});

export const formLessons = [
  formLesson('form-lesson-infinitive-imperative', 'A1', 'Начальная форма и просьбы', 'Infinitiv и imperativ: lære / lær',
    'После at и после модальных kan, skal, vil нужен инфинитив; после модальных at не ставят. Прямая просьба использует imperativ: åbn, læg, vær. Окончания не подставляют автоматически: смотри форму конкретного глагола.', [
    exercise('lære', 'Infinitiv · после vil', 'Jeg vil gerne lære dansk.', 'Я хочу выучить датский.', 'После vil gerne нужна начальная форма lære без at. Lærer — настоящее, lærte — прошедшее, lært — причастие.', 'Jeg vil gerne ___ dansk.', 'lære', ['lærer', 'lærte', 'lært']),
    exercise('tale', 'Infinitiv · после at', 'Det er godt at tale sammen.', 'Хорошо поговорить друг с другом.', 'После at: tale. Личные формы taler и talte в эту конструкцию не входят.', 'Det er godt at ___ sammen.', 'tale', ['taler', 'talte', 'talt']),
    exercise('huske', 'Infinitiv · после skal', 'Du skal huske nøglen.', 'Тебе нужно не забыть ключ.', 'Skal + huske без at. Skal уже несёт личную форму; второй глагол остаётся в инфинитиве.', 'Du skal ___ nøglen.', 'huske', ['husker', 'huskede', 'husket']),
    exercise('åbne', 'Imperativ · просьба', 'Åbn døren, tak.', 'Открой дверь, пожалуйста.', 'Прямая просьба: åbn. Åbne — начальная форма; åbner — настоящее; åbnede — прошедшее.', '___ døren, tak.', 'Åbn', ['Åbne', 'Åbner', 'Åbnede']),
    exercise('lægge', 'Imperativ · просьба', 'Læg bogen på bordet.', 'Положи книгу на стол.', 'Повелительная форма lægge — læg. Не путай с ligge «лежать».', '___ bogen på bordet.', 'Læg', ['Lægge', 'Lægger', 'Lagde']),
    exercise('være', 'Imperativ · просьба', 'Vær forsigtig.', 'Будь осторожен.', 'У være особая повелительная форма vær. Er — настоящее; var — прошедшее.', '___ forsigtig.', 'Vær', ['Være', 'Er', 'Var'])
  ]),
  formLesson('form-lesson-present', 'A1', 'Что происходит сейчас', 'Nutid: личная форма и привычки',
    'Настоящее время описывает текущую ситуацию или привычку. Форма не меняется по лицам: jeg arbejder, du arbejder, vi arbejder. У самых частых глаголов встречаются особые формы: være → er, have → har, gøre → gør.', [
    exercise('arbejde', 'Nutid · настоящее', 'Jeg arbejder på et værksted.', 'Я работаю в мастерской.', 'Текущая работа: arbejder. Arbejde — инфинитив, arbejdede — прошедшее, arbejdet — причастие.', 'Jeg ___ på et værksted.', 'arbejder', ['arbejde', 'arbejdede', 'arbejdet']),
    exercise('være', 'Nutid · настоящее', 'Hun er hjemme nu.', 'Она сейчас дома.', 'Сейчас: er. Være — инфинитив, var — прошедшее, været — причастие.', 'Hun ___ hjemme nu.', 'er', ['være', 'var', 'været']),
    exercise('have', 'Nutid · настоящее', 'Vi har en ny bil.', 'У нас есть новая машина.', 'Нынешнее владение: har. В датском глагол have соответствует русскому «у нас есть».', 'Vi ___ en ny bil.', 'har', ['have', 'havde', 'haft']),
    exercise('gøre', 'Nutid · настоящее', 'Han gør rent hver fredag.', 'Он убирается каждую пятницу.', 'Регулярная привычка: gør. Gøre rent — убирать; gjorde — прошлое, gjort — причастие.', 'Han ___ rent hver fredag.', 'gør', ['gøre', 'gjorde', 'gjort']),
    exercise('køre', 'Nutid · настоящее', 'Jeg kører til arbejde hver dag.', 'Я каждый день езжу на работу.', 'Привычка в настоящем: kører. Køre — начальная форма; kørte — прошедшее.', 'Jeg ___ til arbejde hver dag.', 'kører', ['køre', 'kørte', 'kørt']),
    exercise('vide', 'Nutid · настоящее', 'Jeg ved, hvor nøglen er.', 'Я знаю, где ключ.', 'Настоящая форма vide — ved. Vidste — знал; vidst требует вспомогательного har или havde.', 'Jeg ___, hvor nøglen er.', 'ved', ['vide', 'vidste', 'vidst'])
  ]),
  formLesson('form-lesson-past', 'A2', 'Что было вчера', 'Datid: событие в закончившемся прошлом',
    'Для события в отдельном прошлом периоде выбираем datid: i går købte jeg...; sidste år arbejdede vi... . Нужна сама прошедшая форма, без har. Формы регулярных глаголов и неправильных глаголов учат отдельно.', [
    exercise('købe', 'Datid · прошедшее', 'Jeg købte en cykel i går.', 'Вчера я купил велосипед.', 'I går задаёт закончившийся прошлый период: købte. Købt — причастие, а не самостоятельная datid.', 'Jeg ___ en cykel i går.', 'købte', ['køber', 'købe', 'købt']),
    exercise('arbejde', 'Datid · прошедшее', 'Vi arbejdede sammen sidste år.', 'В прошлом году мы работали вместе.', 'Sidste år: arbejdede. У arbejde прошедшая форма на -ede.', 'Vi ___ sammen sidste år.', 'arbejdede', ['arbejder', 'arbejde', 'arbejdet']),
    exercise('gå', 'Datid · прошедшее', 'Hun gik hjem klokken fem i går.', 'Вчера в пять она ушла домой.', 'Прошедшее от gå — gik. Gået используется с er/har, а не самостоятельно.', 'Hun ___ hjem klokken fem i går.', 'gik', ['går', 'gå', 'gået']),
    exercise('sige', 'Datid · прошедшее', 'Han sagde nej på mødet i går.', 'На вчерашней встрече он сказал нет.', 'Sige → sagde → sagt. В этом рассказе о вчерашнем событии нужна sagde.', 'Han ___ nej på mødet i går.', 'sagde', ['siger', 'sige', 'sagt']),
    exercise('reparere', 'Datid · прошедшее', 'Jeg reparerede bilen i mandags.', 'В прошлый понедельник я отремонтировал машину.', 'I mandags — минувший понедельник. Datid: reparerede, без har.', 'Jeg ___ bilen i mandags.', 'reparerede', ['reparerer', 'reparere', 'repareret']),
    exercise('være', 'Datid · прошедшее', 'De var i København sidste weekend.', 'В прошлые выходные они были в Копенгагене.', 'Være → var в datid. Været — причастие, употребляется с har/havde.', 'De ___ i København sidste weekend.', 'var', ['er', 'være', 'været'])
  ]),
  formLesson('form-lesson-perfect', 'A2', 'Уже сделано к настоящему', 'Førnutid: har/er + причастие',
    'Førnutid связывает прошлое с настоящим результатом, опытом или периодом до сих пор: har spist, er kommet. Har/er выбирается по значению и конструкции, а не по правилу «все глаголы движения с er». С i går в обычном рассказе чаще нужна datid.', [
    exercise('spise', 'Førnutid · причастие после har', 'Jeg har allerede spist.', 'Я уже поел.', 'Har уже стоит в предложении: добавляем причастие spist. Spiste было бы самостоятельной datid.', 'Jeg har allerede ___.', 'spist', ['spiser', 'spiste', 'spise']),
    exercise('komme', 'Førnutid · прибытие с er', 'Hun er lige kommet hjem.', 'Она только что пришла домой.', 'Прибытие с результатом сейчас: er kommet. Здесь kommet — причастие; kom — прошедшая форма.', 'Hun er lige ___ hjem.', 'kommet', ['kommer', 'kom', 'komme']),
    exercise('være', 'Førnutid · har været', 'Jeg har været i Danmark tre gange.', 'Я бывал в Дании три раза.', 'Жизненный опыт до настоящего: har været. У самого være в førnutid вспомогательный har.', 'Jeg ___ i Danmark tre gange.', 'har været', ['er været', 'har var', 'er var']),
    exercise('køre', 'Førnutid · har с объектом', 'Han har kørt bilen i dag.', 'Сегодня он водил эту машину.', 'Bilen — объект. В значении «водил машину» используем har kørt; er kørt hjem означало бы «уехал домой».', 'Han ___ bilen i dag.', 'har kørt', ['er kørt', 'har kørte', 'er kørte']),
    exercise('reparere', 'Førnutid · результат сейчас', 'Vi har nu repareret maskinen.', 'К настоящему моменту мы отремонтировали станок.', 'Активный результат к настоящему: vi har repareret. Vi er repareret относилось бы к нам как к объектам ремонта, а не к станку.', 'Vi ___ maskinen.', 'har nu repareret', ['er nu repareret', 'har nu reparerede', 'er nu reparerede']),
    exercise('begynde', 'Førnutid · начало действия с er', 'Jeg er begyndt at lære dansk.', 'Я уже начал учить датский.', 'Начало связано с настоящим. Для begynde at... в этой учебной модели используем er begyndt. Har begyndt возможно с объектом в других конструкциях: har begyndt dagen med kaffe.', 'Jeg ___ at lære dansk.', 'er begyndt', ['er begyndte', 'har begynde', 'har begynder'])
  ]),
  formLesson('form-lesson-future', 'A2', 'Планы на завтра', 'Будущее: nutid, skal и vil',
    'В датском нет единственного обязательного окончания будущего. Настоящее с будущим временем естественно для плана: vi rejser i morgen. Skal + инфинитив выражает план или обязанность; vil + инфинитив — желание, намерение или прогноз. Они не взаимозаменяемы во всех контекстах.', [
    exercise('rejse', 'Nutid om fremtid · будущий план', 'I morgen rejser vi til Aarhus.', 'Завтра мы поедем в Орхус.', 'Будущее обозначено i morgen; запланированную поездку естественно выразить настоящим rejser. После i morgen — rejser vi.', 'I morgen ___ vi til Aarhus.', 'rejser', ['rejste', 'rejst', 'rejse']),
    exercise('komme', 'Nutid om fremtid · договорённость', 'Hun kommer på besøg i morgen.', 'Завтра она придёт в гости.', 'Договорённость на завтра: nutid kommer. I morgen даёт будущую привязку без отдельного модального глагола.', 'Hun ___ på besøg i morgen.', 'kommer', ['kom', 'kommet', 'komme']),
    exercise('reparere', 'Fremtid · skal + infinitiv', 'Vi skal reparere bilen i morgen.', 'По плану завтра мы должны отремонтировать машину.', 'Skal обозначает запланированное дело; после него инфинитив reparere без at.', 'Vi skal ___ bilen i morgen.', 'reparere', ['reparerer', 'reparerede', 'repareret']),
    exercise('møde', 'Fremtid · skal + infinitiv', 'Jeg skal møde på arbejde klokken syv i morgen.', 'Завтра я должен явиться на работу к семи.', 'Установленное время выхода: skal møde. Møde здесь — начальная форма после skal.', 'Jeg skal ___ på arbejde klokken syv i morgen.', 'møde', ['møder', 'mødte', 'mødt']),
    exercise('hjælpe', 'Fremtid · vil + infinitiv', 'Jeg vil gerne hjælpe dig i morgen.', 'Я хочу помочь тебе завтра.', 'Vil gerne выражает желание помочь. После vil ставим hjælpe, а не hjælper; i morgen относит действие к будущему.', 'Jeg vil gerne ___ dig i morgen.', 'hjælpe', ['hjælper', 'hjalp', 'hjulpet']),
    exercise('ringe', 'Fremtid · vil + infinitiv', 'Jeg vil ringe til dig i aften.', 'Я намерен позвонить тебе сегодня вечером.', 'Vil ringe выражает намерение. После vil: ringe без at; нельзя механически переводить любое русское будущее через vil.', 'Jeg vil ___ til dig i aften.', 'ringe', ['ringer', 'ringede', 'ringet'])
  ]),
  formLesson('form-lesson-pluperfect', 'B1', 'Что произошло ещё раньше', 'Førdatid: действие до другого прошлого',
    'Førdatid показывает, что действие завершилось до другого момента в прошлом: havde spist, var gået. Используем havde вместо har и var вместо er, сохраняя причастие и выбор вспомогательного по конструкции. Обычная datid может менять смысл последовательности.', [
    exercise('spise', 'Førdatid · завершилось до прихода', 'Da du kom, havde jeg allerede spist.', 'К твоему приходу я уже поел.', 'Еда закончилась до прихода: havde spist. Spiste означало бы, что я ел в тот момент; har spist связывает событие с настоящим.', 'Da du kom, ___.', 'havde jeg allerede spist', ['har jeg allerede spist', 'spiste jeg allerede', 'spiser jeg allerede']),
    exercise('gå', 'Førdatid · ушёл до звонка', 'Da jeg ringede, var hun allerede gået hjem.', 'Когда я позвонил, она уже ушла домой.', 'Уход произошёл раньше звонка: var gået. Для движения домой выбираем være: er gået → var gået.', 'Da jeg ringede, ___.', 'var hun allerede gået hjem', ['er hun allerede gået hjem', 'gik hun allerede hjem', 'går hun allerede hjem']),
    exercise('reparere', 'Førdatid · ремонт до приезда', 'Da kunden kom, havde vi allerede repareret bilen.', 'К приезду клиента мы уже отремонтировали машину.', 'Ремонт завершился раньше приезда: havde repareret. Har repareret — результат к настоящему; reparerede — ремонт в прошлом без такого отношения.', 'Da kunden kom, ___.', 'havde vi allerede repareret bilen', ['har vi allerede repareret bilen', 'reparerede vi bilen', 'reparerer vi bilen']),
    exercise('skrive', 'Førdatid · письмо до встречи', 'Hun havde skrevet brevet, før mødet begyndte.', 'Она написала письмо ещё до начала встречи.', 'Før mødet begyndte задаёт второй прошлый момент. Более раннее завершённое действие: havde skrevet.', 'Hun ___ brevet, før mødet begyndte.', 'havde skrevet', ['har skrevet', 'skrev', 'skriver']),
    exercise('være', 'Førdatid · опыт до переезда', 'Før jeg flyttede, havde jeg aldrig været i Aarhus.', 'До переезда я ни разу не бывал в Орхусе.', 'Опыт до прошлого переезда: havde været. У være вспомогательный have, поэтому havde, не var været.', 'Før jeg flyttede, ___.', 'havde jeg aldrig været i Aarhus', ['har jeg aldrig været i Aarhus', 'var jeg aldrig været i Aarhus', 'er jeg aldrig været i Aarhus']),
    exercise('begynde', 'Førdatid · уже началось', 'Da vi ankom, var mødet allerede begyndt.', 'Когда мы приехали, встреча уже началась.', 'Начало было раньше приезда: var begyndt. Begyndte означало бы начало в тот момент; здесь русское «уже» и førdatid задают более раннее действие.', 'Da vi ankom, ___.', 'var mødet allerede begyndt', ['er mødet allerede begyndt', 'begyndte mødet', 'begynder mødet'])
  ])
];

// Practice for the three degrees of comparison ("choose the form"). They are separate from formLessons (verb tenses) and are shown under the comparison tab.
const adjectiveByWord = Object.fromEntries(adjectiveForms.map(a => [a.positive, a]));
const compareHelp = (word, note) => {
  const a = adjectiveByWord[word];
  return [
    {label: 'Положительная', text: a.positive},
    {label: 'Сравнительная', text: a.comparative},
    {label: 'Превосходная', text: a.superlative},
    ...(note ? [{label: 'Контекст', text: note}] : [])
  ];
};
const compareExercise = (word, formLabel, da, ru, note, text, answer, wrong) => ({
  da, ru, note, type: 'gap', daAnswers: [da], ruAnswers: [ru], formLabel, formHelp: compareHelp(word, note),
  gap: {text, answers: [answer], options: [answer, ...wrong]}
});
const compareLesson = (id, level, title, subtitle, rule, rows) => ({
  id, level, kind: 'grammar', color: 'violet', icon: 'layers', title, subtitle, rule,
  items: rows.map((row, index) => ({...row, id: `${id}-${index + 1}`, lessonId: id}))
});

export const comparisonLessons = [
  compareLesson('compare-lesson-regular', 'A2', 'Больше, чем... и самый...', 'Сравнительная и превосходная степень: -ere, -est',
    'Сравнение двух предметов: сравнительная степень + end: større end, hurtigere end. Самый из всех: превосходная степень, с определённой формой после den / det: den højeste bygning. Предикатив без существительного: Hun er dygtigst. Mere + положительная форма используют только там, где нет формы на -ere: mere spændende, mere populær.', [
    compareExercise('stor', 'Сравнительная степень · end', 'Mit hus er større end dit.', 'Мой дом больше твоего.', 'Сравниваем два дома: større end. Stor — положительная, størst — превосходная степень.', 'Mit hus er ___ end dit.', 'større', ['stor', 'størst', 'mere stor']),
    compareExercise('hurtig', 'Сравнительная степень · end', 'Toget er hurtigere end bussen.', 'Поезд быстрее автобуса.', 'У hurtig обычная пара -ere / -st; mere hurtig не используется.', 'Toget er ___ end bussen.', 'hurtigere', ['hurtig', 'hurtigst', 'mere hurtig']),
    compareExercise('dyr', 'Сравнительная степень · end', 'Kaffen er dyrere end teen.', 'Кофе дороже чая.', 'Dyr → dyrere → dyrest. Сравнение цены двух напитков.', 'Kaffen er ___ end teen.', 'dyrere', ['dyr', 'dyrest', 'mere dyr']),
    compareExercise('varm', 'Сравнительная степень · end', 'I dag er det varmere end i går.', 'Сегодня теплее, чем вчера.', 'Сравниваем два дня: varmere end. Varmest нужно при выборе из многих.', 'I dag er det ___ end i går.', 'varmere', ['varm', 'varmest', 'mere varm']),
    compareExercise('gammel', 'Сравнительная степень · особая форма', 'Min bror er ældre end min søster.', 'Мой брат старше моей сестры.', 'Gammel имеет особые формы: ældre, ældst. Gammelere не бывает.', 'Min bror er ___ end min søster.', 'ældre', ['gammel', 'ældst', 'mere gammel']),
    compareExercise('god', 'Сравнительная степень · особая форма', 'Den nye telefon er bedre end den gamle.', 'Новый телефон лучше старого.', 'God → bedre → bedst. Форма godere не существует.', 'Den nye telefon er ___ end den gamle.', 'bedre', ['god', 'bedst', 'godere']),
    compareExercise('høj', 'Превосходная степень · den + -este', 'Det er den højeste bygning i byen.', 'Это самое высокое здание в городе.', 'После den + существительное: определённая форма превосходной степени højeste. Højere использовали бы для сравнения двух зданий.', 'Det er den ___ bygning i byen.', 'højeste', ['højere', 'høj', 'mest høj']),
    compareExercise('dygtig', 'Превосходная степень · den + -este', 'Hun er den dygtigste i klassen.', 'Она самая способная в классе.', 'После den в значении «самая»: dygtigste. Dygtigere сравнивало бы двух учениц.', 'Hun er den ___ i klassen.', 'dygtigste', ['dygtigere', 'dygtig', 'mest dygtig'])
  ]),
  compareLesson('compare-lesson-special', 'B1', 'Особые случаи сравнения', 'Mere · mest, flere · flest, hellere · helst',
    'Многосложные слова на -isk, -sk, -ende, -et, причастия и заимствованные слова обычно сравнивают через mere и mest: mere spændende, mest interessant. Для количества: mere — вещество (mere trafik), flere — считаемое множество (flere biler). Gerne → hellere → helst выражает степень предпочтения. Lille → mindre, gammel → ældre, god → bedre — особые формы.', [
    compareExercise('mange', 'Количество · считаемое множество', 'Der er flere biler end sidste år.', 'Машин больше, чем в прошлом году.', 'Biler можно посчитать: flere. Mere трафик — вещество, поэтому mere trafik.', 'Der er ___ biler end sidste år.', 'flere', ['mere', 'mange', 'flest']),
    compareExercise('meget', 'Количество · вещество', 'Der er mere trafik i dag end i går.', 'Сегодня движения больше, чем вчера.', 'Trafik — вещество без счёта единиц: mere. Flere подошло бы к biler.', 'Der er ___ trafik i dag end i går.', 'mere', ['flere', 'meget', 'mest']),
    compareExercise('spændende', 'Mere · mest · после den', 'Det her er den mest spændende bog, jeg har læst.', 'Это самая захватывающая книга из тех, что я читал.', 'Spændende сравнивают через mest: den mest spændende. Формы spændendest нет.', 'Det her er den ___ spændende bog, jeg har læst.', 'mest', ['mere', 'spændendest', 'flest']),
    compareExercise('interessant', 'Mere · mest · сравнение двух', 'Filmen var mere interessant end bogen.', 'Фильм был интереснее книги.', 'Interessant сравнивают через mere: mere interessant end. Формы interessantere не используют.', 'Filmen var ___ interessant end bogen.', 'mere', ['interessantere', 'mest', 'flere']),
    compareExercise('gerne', 'Gerne · hellere · helst', 'Jeg vil hellere have te end kaffe.', 'Я скорее выпью чай, чем кофе.', 'Hellere ... end — предпочтение между двумя вариантами. Helst — предпочтение среди всех возможных.', 'Jeg vil ___ have te end kaffe.', 'hellere', ['gerne', 'helst', 'bedre']),
    compareExercise('gerne', 'Gerne · hellere · helst', 'Jeg vil helst af alt blive hjemme.', 'Больше всего на свете я хочу остаться дома.', 'Helst af alt — «больше всего»: предпочтение среди всех возможных вариантов. Hellere требует сравнения двух вариантов: hellere ... end.', 'Jeg vil ___ af alt blive hjemme.', 'helst', ['hellere', 'gerne', 'bedst']),
    compareExercise('lille', 'Особая форма · размер', 'Det lille hus er mindre end det store.', 'Маленький дом меньше большого.', 'Lille → mindre → mindst. Lillere не бывает.', 'Det lille hus er ___ end det store.', 'mindre', ['lillere', 'mindst', 'mere lille']),
    compareExercise('gammel', 'Превосходная степень · особая форма', 'Han er den ældste af os alle.', 'Он самый старший из всех нас.', 'Gammel → ældre → ældst; после den — ældste. Mest gammel звучит неестественно.', 'Han er den ___ af os alle.', 'ældste', ['ældre', 'gammelste', 'mest gammel'])
  ])
];
