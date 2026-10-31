// Original teaching examples; linguistic sources and editorial limits are in docs/patterns-sources.md.
const gap = (key,da,ru,note,text,answer,wrong) => ({
  key,da,ru,note,type:'gap',daAnswers:[da],ruAnswers:[ru],
  gap:{text,answers:[answer],options:[answer,...wrong]}
});
const lesson = (id,kind,level,title,subtitle,rule,items) => ({
  id,kind,level,title,subtitle,rule,icon:kind==='grammar'?'layers':'arrow',color:kind==='grammar'?'violet':'cyan',
  items:items.map(({key,...item})=>({...item,id:`${id}-${key}`,lessonId:id}))
});

export const patternLessons = [
  lesson('pat-size-quantity','grammar','A1','Lille · små · meget · mange','Размер предмета и количество — разные вопросы',
    'Lille описывает размер одного предмета: en lille taske, et lille hus, den lille taske. Во множественном числе — små: små tasker. Meget означает большое количество вещества или высокую степень: meget vand, meget glad. Mange относится к исчисляемому множеству: mange flasker. Små flasker — маленькие бутылки; mange flasker — много бутылок.',[
    gap('lille-en','Vi bor i en lille lejlighed.','Мы живём в маленькой квартире.','En lejlighed — один предмет; форма lille одинакова с en и et.','Vi bor i en ___ lejlighed.','lille',['små','mange','få']),
    gap('lille-et','På bakken står et lille glas.','На подносе стоит маленький стакан.','Et glas — единственное число среднего рода; не добавляем -t к lille.','På bakken står et ___ glas.','lille',['små','lillet','mange']),
    gap('smaa','Hun pakker tre små gaver.','Она упаковывает три маленьких подарка.','Tre задаёт множественное число: små. Это размер подарков, а не их количество.','Hun pakker tre ___ gaver.','små',['lille','meget','lidt']),
    gap('meget-mass','Der er meget vand i flasken.','В бутылке много воды.','Vand здесь вещество без счёта отдельных единиц, поэтому meget.','Der er ___ vand i flasken.','meget',['mange','små','få']),
    gap('mange-count','Der står mange flasker på hylden.','На полке стоит много бутылок.','Flasker — исчисляемое множественное число; количество передаёт mange.','Der står ___ flasker på hylden.','mange',['meget','lille','lidt']),
    gap('meget-degree','Hun er meget glad for sit nye arbejde.','Она очень рада своей новой работе.','Перед glad слово meget усиливает степень: «очень». Mange не усиливает прилагательное.','Hun er ___ glad for sit nye arbejde.','meget',['mange','små','få'])
  ]),
  lesson('pat-more-less','grammar','A2','Lidt · få · mere · flere','Немного, больше и меньше: что именно считаем',
    'Для вещества, объёма и степени: lidt → mindre и meget → mere. Для исчисляемого множества: få → færre и mange → flere. Mere kaffe / flere kopper; mindre trafik / færre biler. Отдельно lille → mindre описывает размер: et mindre hus. Это практическая модель для нейтральной речи; употребление mindre с числом и количеством в реальном языке шире.',[
    gap('lidt','Der er kun lidt mælk tilbage.','Осталось лишь немного молока.','Mælk — вещество. Lidt — небольшое количество; lille — размер отдельного предмета.','Der er kun ___ mælk tilbage.','lidt',['få','små','lille']),
    gap('faa','Der er kun få pladser tilbage.','Осталось лишь несколько мест.','Pladser можно посчитать: få. Kun подчёркивает, что мест мало.','Der er kun ___ pladser tilbage.','få',['lidt','lille','meget']),
    gap('mere','Vil du have mere kaffe i koppen?','Хочешь ещё кофе в чашку?','Добавляем количество кофе: mere. Flere подошло бы к отдельным чашкам: flere kopper.','Vil du have ___ kaffe i koppen?','mere',['flere','mange','små']),
    gap('flere','Vi har brug for flere stole til gæsterne.','Нам нужно больше стульев для гостей.','Stole — отдельные предметы; больше по количеству — flere.','Vi har brug for ___ stole til gæsterne.','flere',['mere','meget','lidt']),
    gap('mindre','Vi bruger mindre strøm end sidste år.','Мы расходуем меньше электричества, чем в прошлом году.','Strøm — расход энергии, а не число предметов: mindre. End вводит сравнение.','Vi bruger ___ strøm end sidste år.','mindre',['færre','få','små']),
    gap('faerre','Der er færre biler på vejen om søndagen.','По воскресеньям на дороге меньше машин.','Для числа машин тренируем нейтральное færre biler. Mindre biler может описывать меньший размер машин; здесь сравниваем их число.','Der er ___ biler på vejen om søndagen.','færre',['lidt','lille','meget'])
  ]),
  lesson('pat-ud','pattern','A2','Ud: выйти, раздать, выяснить','Gå ud · give ud · finde ud af',
    'Ud часто связано с движением наружу, но смысл нужно учить целым сочетанием: gå ud — выйти, give ud — тратить, finde ud af — выяснить. Порядок слов тоже часть конструкции: dele noget ud, se glad ud. Слитное udgive — отдельный глагол, например «издавать»; он не равен каждому сочетанию с give ud.',[
    gap('gaa','Vi går ud i haven efter frokost.','После обеда мы выходим в сад.','Gå ud — движение наружу; i haven называет место назначения.','Vi går ___ i haven efter frokost.','ud',['af','på','an']),
    gap('dele','Læreren deler arkene ud til kursisterne.','Учитель раздаёт листы слушателям курса.','Dele noget ud — раздавать; объект arkene стоит перед ud.','Læreren deler arkene ___ til kursisterne.','ud',['an','til','for']),
    gap('give','Jeg vil ikke give flere penge ud på reparationer.','Я не хочу тратить больше денег на ремонт.','Give penge ud på noget — тратить деньги на что-либо; деньги стоят между give и ud.','Jeg vil ikke give flere penge ___ på reparationer.','ud',['ind','an','til']),
    gap('finde','Vi skal finde ud af, hvornår bussen kører.','Нам нужно выяснить, когда отправляется автобус.','Finde ud af + вопросительное придаточное; сохраняем обе части ud af.','Vi skal finde ___, hvornår bussen kører.','ud af',['på til','ind for','af op']),
    gap('se','Du ser træt ud efter turen.','После поездки ты выглядишь уставшим.','Se + описание + ud — выглядеть. Træt оказывается между ser и ud.','Du ser træt ___ efter turen.','ud',['an','for','til']),
    gap('udgive','Forlaget vil udgive en ny ordbog til efteråret.','Издательство выпустит новый словарь осенью.','Udgive — слитный глагол «издавать». В этой модели не заменяем его на give ud.','Forlaget vil ___ en ny ordbog til efteråret.','udgive',['give ud','give ind','indgive'])
  ]),
  lesson('pat-ind','pattern','A2','Ind: войти, занести, подать','Komme ind · købe ind · indsende',
    'Ind часто указывает на движение внутрь, а inde — на положение внутри: kom ind / jeg er inde. Købe ind — делать покупки, melde sig ind — вступать в организацию. Слитные indlevere, indsende и indføre учим отдельно: приставка остаётся частью глагола при спряжении.',[
    gap('komme','Kom ind, døren er åben!','Входи, дверь открыта!','Приглашаем двигаться внутрь: ind. Inde описывает, где кто-то уже находится.','Kom ___, døren er åben!','ind',['inde','inden','indtil']),
    gap('baere','Kan du bære kasserne ind i stuen?','Можешь занести коробки в гостиную?','Bære noget ind — занести внутрь; i stuen уточняет куда.','Kan du bære kasserne ___ i stuen?','ind',['af','for','an']),
    gap('koebe','Vi køber ind til aftensmaden efter arbejde.','После работы мы покупаем продукты на ужин.','Købe ind — устойчивое сочетание «делать покупки», даже без движения в помещение.','Vi køber ___ til aftensmaden efter arbejde.','ind',['an','af','for']),
    gap('melde','Hun vil melde sig ind i en løbeklub.','Она хочет вступить в беговой клуб.','Melde sig ind i + организация; sig относится к тому, кто вступает.','Hun vil melde sig ___ i en løbeklub.','ind',['af','op','for']),
    gap('indsende','Du skal indsende ansøgningen inden fredag.','Заявление нужно отправить до пятницы.','Indsende — подать, отправив в учреждение. Inden — отдельный предлог «до».','Du skal ___ ansøgningen inden fredag.','indsende',['sende inden','sende an','sende for']),
    gap('indfoere','Skolen vil indføre en ny regel om telefoner.','Школа введёт новое правило о телефонах.','Indføre — слитный глагол, здесь «ввести правило», а не буквальное движение внутрь.','Skolen vil ___ en ny regel om telefoner.','indføre',['føre inde','føre inden','føre an på'])
  ]),
  lesson('pat-op','pattern','A2','Op: подняться, закончить, сдаться','Stå op · spise op · give op',
    'Op бывает направлением вверх, результатом или частью переносного выражения. Stå op — встать с постели; spise op — доесть; give op — сдаться; holde op med — прекратить. Слитное oplyse значит, например, «сообщать сведения». У op нет одного перевода для всех глаголов.',[
    gap('staa','Vækkeuret ringer, og jeg står op.','Звенит будильник, и я встаю с постели.','Stå op здесь — подняться с постели. Для вставания со стула обычно rejse sig.','Vækkeuret ringer, og jeg står ___.','op',['an','til','af']),
    gap('spise','Hun spiser suppen op, så skålen er tom.','Она доедает суп, и миска остаётся пустой.','Spise noget op — съесть до конца; пустая миска делает значение явным.','Hun spiser suppen ___, så skålen er tom.','op',['an','til','for']),
    gap('give','Opgaven er svær, men vi giver ikke op.','Задание сложное, но мы не сдаёмся.','Give op — сдаться, отказаться от попыток. Op отделено от giver.','Opgaven er svær, men vi giver ikke ___.','op',['an','på','til']),
    gap('holde','Han vil holde op med at drikke sodavand.','Он хочет перестать пить газировку.','Holde op med at + инфинитив — перестать делать что-либо.','Han vil holde ___ med at drikke sodavand.','op',['ind','på','an']),
    gap('skrive','Skriv adressen op, så du kan huske den.','Запиши адрес, чтобы его запомнить.','Skrive noget op — записать для себя; это не то же, что skrive under.','Skriv adressen ___, så du kan huske den.','op',['an','til','for']),
    gap('oplyse','Kan du oplyse dit kundenummer?','Можешь сообщить свой номер клиента?','Oplyse — слитный глагол. Здесь нужно сообщить сведения; у него есть и другие значения.','Kan du ___ dit kundenummer?','oplyse',['lyse på','lyse af','lyse til'])
  ]),
  lesson('pat-ned','pattern','B1','Ned: вниз, убавить, записать','Sætte ned · skrive ned · nedlægge',
    'Ned — движение вниз, nede — положение внизу. В сочетаниях ned может обозначать снижение или прекращение, но skrive ned — просто записать. Сравни lægge noget ned — положить горизонтально и nedlægge en afdeling — закрыть отдел: слитность может сопровождаться другим значением.',[
    gap('gaa','Vi går ned ad trappen til kælderen.','Мы спускаемся по лестнице в подвал.','Ned ad trappen — направление вниз по лестнице; nede обозначает местонахождение.','Vi går ___ ad trappen til kælderen.','ned',['nede','neden','nedre']),
    gap('saette','Butikken sætter prisen ned fra 300 til 200 kroner.','Магазин снижает цену с 300 до 200 крон.','Sætte noget ned — снизить; числа показывают направление изменения.','Butikken sætter prisen ___ fra 300 til 200 kroner.','ned',['op','ind','an']),
    gap('skrue','Vil du skrue ned for musikken? Den er for høj.','Можешь убавить музыку? Она слишком громкая.','Skrue ned for — уменьшить громкость или интенсивность. Противоположное: skrue op for.','Vil du skrue ___ for musikken? Den er for høj.','ned',['op','an','til']),
    gap('skrive','Jeg skriver tidspunktet ned i min kalender.','Я записываю время в свой календарь.','Skrive noget ned — записать; здесь нет буквального движения вниз.','Jeg skriver tidspunktet ___ i min kalender.','ned',['an','for','til']),
    gap('laegge','Læg cyklen ned på siden, før du tager hjulet af.','Положи велосипед на бок, прежде чем снимать колесо.','Lægge noget ned — положить горизонтально. Не путай с nedlægge «закрывать организацию».','Læg cyklen ___ på siden, før du tager hjulet af.','ned',['an','til','for']),
    gap('nedlaegge','Firmaet vil nedlægge afdelingen næste år.','Компания закроет отдел в следующем году.','Nedlægge en afdeling — упразднить отдел. Это слитный глагол, не инструкция положить предмет.','Firmaet vil ___ afdelingen næste år.','nedlægge',['lægge nede','lægge neden','lægge til'])
  ]),
  lesson('pat-af','pattern','B1','Af: снять, выйти, передать','Tage af · stå af · afgive',
    'Af часто связано с отделением, но всё сочетание определяет смысл: tage skoene af — снять обувь; stå af — выйти из транспорта; holde af — любить. В aflevere, aflyse и afgive af- пишется слитно. Af бывает также предлогом; не каждое af после глагола — отделяемая частица.',[
    gap('tage','Tag skoene af ved døren, og stil dem på måtten.','Сними обувь у двери и поставь её на коврик.','Tage noget af — снять; объект skoene стоит между глаголом и af.','Tag skoene ___ ved døren, og stil dem på måtten.','af',['på','an','til']),
    gap('staa','Vi skal stå af bussen ved biblioteket.','Нам нужно выйти из автобуса у библиотеки.','Stå af bussen — выйти из автобуса. Войти: stige på или stå på.','Vi skal stå ___ bussen ved biblioteket.','af',['op','an','til']),
    gap('holde','Jeg holder af min nabo, som altid hjælper mig.','Я тепло отношусь к своему соседу, который всегда мне помогает.','Holde af nogen — любить, быть привязанным. Значение нельзя вывести из «отделения».','Jeg holder ___ min nabo, som altid hjælper mig.','af',['ud','op','an']),
    gap('aflevere','Jeg skal aflevere bøgerne på biblioteket i dag.','Сегодня мне нужно вернуть книги в библиотеку.','Aflevere — передать или сдать; здесь вернуть взятые книги. Af- остаётся в слове.','Jeg skal ___ bøgerne på biblioteket i dag.','aflevere',['levere an','levere for','levere på']),
    gap('aflyse','Vi må aflyse mødet, fordi flere deltagere er syge.','Нам придётся отменить встречу, потому что несколько участников заболели.','Aflyse — отменить мероприятие; не путай с oplyse «сообщить».','Vi må ___ mødet, fordi flere deltagere er syge.','aflyse',['oplyse','belyse','lyse på']),
    gap('afgive','Alle medlemmer kan afgive deres stemme på mødet.','На собрании все члены могут отдать свой голос.','Afgive sin stemme — проголосовать. Это слитный глагол, а give op значит «сдаться».','Alle medlemmer kan ___ deres stemme på mødet.','afgive',['give op','give an','give ind'])
  ]),
  lesson('pat-paa','pattern','B1','På: надеть, примерить, сохранить','Tage på · lægge på · holde på',
    'Tage tøj på — надеть, а tage på i vægt — набрать вес. Lægge på может означать закончить телефонный разговор. Holde på varmen — сохранять тепло. Учим словосочетание с объектом: само på не кодирует все эти значения. В se på noget på — предлог перед объектом.',[
    gap('tage','Tag jakken på, før du går ud i kulden.','Надень куртку, прежде чем выходить на холод.','Tage noget på — надеть. Af обозначало бы противоположное действие.','Tag jakken ___, før du går ud i kulden.','på',['af','an','for']),
    gap('vaegt','Han har taget på i vægt siden sidste vinter.','С прошлой зимы он набрал вес.','Tage på i vægt — набрать вес; это другое употребление, чем надевание одежды.','Han har taget ___ i vægt siden sidste vinter.','på',['af','ind','an']),
    gap('laegge','Samtalen er slut, så jeg lægger på.','Разговор окончен, поэтому я кладу трубку.','Lægge på без названного предмета может означать завершить телефонный разговор.','Samtalen er slut, så jeg lægger ___.','på',['ind','til','an']),
    gap('proeve','Vi prøver jakken på, før vi køber den.','Мы примеряем куртку, прежде чем её купить.','Prøve noget på — примерить одежду; объект jakken стоит перед på.','Vi prøver jakken ___, før vi køber den.','på',['an','for','til']),
    gap('holde','En tyk trøje holder godt på varmen.','Толстый свитер хорошо сохраняет тепло.','Holde på noget — здесь удерживать, сохранять. Holde af — совсем другое сочетание.','En tyk trøje holder godt ___ varmen.','på',['af','an','op']),
    gap('se','Vi ser på billederne fra ferien sammen.','Мы вместе рассматриваем фотографии из отпуска.','Se på + объект — смотреть на, рассматривать. Здесь på вводит billederne.','Vi ser ___ billederne fra ferien sammen.','på',['an','op','ud'])
  ]),
  lesson('pat-til','pattern','B1','Til: добавлять, записаться, привыкнуть','Lægge til · melde sig til · vænne sig til',
    'Til может быть предлогом направления, частью устойчивого сочетания или частью слитного глагола. Lægge til — прибавить; melde sig til — записаться на мероприятие; vænne sig til — привыкнуть. Сравни melde sig ind i en klub и tilmelde sig et kursus: предлог и написание меняются вместе с конструкцией.',[
    gap('laegge','Hvis vi lægger to til fem, får vi syv.','Если к пяти прибавить два, получится семь.','Lægge et tal til et andet — прибавить число к другому.','Hvis vi lægger to ___ fem, får vi syv.','til',['af','an','ud']),
    gap('melde','Jeg vil melde mig til kurset i morgen.','Завтра я хочу записаться на курс.','Melde sig til + мероприятие или курс. Melde sig ind i обычно относится к организации.','Jeg vil melde mig ___ kurset i morgen.','til',['ind','op','an']),
    gap('tilmelde','Du kan tilmelde dig kurset på skolens hjemmeside.','Ты можешь записаться на курс на сайте школы.','В этой модели после tilmelde sig курс идёт напрямую. Употребляется и tilmelde sig til noget. Личная форма: jeg tilmelder mig.','Du kan ___ dig kurset på skolens hjemmeside.','tilmelde',['melde til','melde an','melde på']),
    gap('komme','Jeg kom til at sende beskeden til den forkerte person.','Я случайно отправил сообщение не тому человеку.','Komme til at + инфинитив здесь описывает случайность. В другом контексте конструкция обозначает будущее.','Jeg kom ___ at sende beskeden til den forkerte person.','til',['af','an','ud']),
    gap('vaenne','Det tager tid at vænne sig til de nye arbejdstider.','Нужно время, чтобы привыкнуть к новому рабочему графику.','Vænne sig til noget — привыкнуть к чему-либо; sig обязательно в этом значении.','Det tager tid at vænne sig ___ de nye arbejdstider.','til',['ind','op','an']),
    gap('tilbyde','Biblioteket vil tilbyde gratis hjælp til lektier.','Библиотека предложит бесплатную помощь с домашними заданиями.','Tilbyde — слитный глагол «предлагать». Дальнейшее til lektier относится к hjælp.','Biblioteket vil ___ gratis hjælp til lektier.','tilbyde',['byde an','byde ud af','byde ind i'])
  ]),
  lesson('pat-for-an','pattern','B2','For- · an-: узнавай целое слово','Forstå · forandre · ankomme · komme an på',
    'For- и an- в этих словах не отделяются: jeg forstår, toget ankommer. Не переноси немецкую модель отделяемых приставок на датский. Начало слова — подсказка для узнавания, а не универсальный перевод: forstå, forandre и forsvinde имеют разные значения. Ankomme пишется слитно, komme an på — раздельно; for в arbejde for nogen и for- в forandre — разные явления.',[
    gap('forstaa','Jeg forstår forklaringen bedre nu.','Теперь я лучше понимаю объяснение.','Forstå — понимать. Личная форма forstår; нельзя переставить for в конец.','Jeg ___ forklaringen bedre nu.','forstår',['står for','står an','står til']),
    gap('forandre','Den nye vej vil forandre området.','Новая дорога изменит этот район.','Forandre — изменить. Учим целое слово, не приписывая for- значение «для».','Den nye vej vil ___ området.','forandre',['andre for','andre an','forandrer']),
    gap('forsvinde','Problemet vil ikke forsvinde af sig selv.','Проблема сама собой не исчезнет.','Forsvinde — исчезнуть. После vil нужен инфинитив без at.','Problemet vil ikke ___ af sig selv.','forsvinde',['svinde for','svinde an','forsvinder']),
    gap('ankomme','Toget ankommer til Odense klokken otte.','Поезд прибывает в Оденсе в восемь.','Ankomme — прибывать; an- остаётся частью глагола.','Toget ___ til Odense klokken otte.','ankommer',['kommer an','kommer for','an komme']),
    gap('anmelde','Hun vil anmelde tyveriet til politiet.','Она хочет заявить о краже в полицию.','Anmelde — официально сообщить, заявить. Также может значить рецензировать; контекст решает.','Hun vil ___ tyveriet til politiet.','anmelde',['melde an','melde op','anmelder']),
    gap('an-paa','Det kommer an på prisen, om vi køber bilen.','Купим ли мы машину, зависит от цены.','Komme an på — зависеть от. Это раздельное сочетание, а ankomme значит «прибывать».','Det kommer ___ prisen, om vi køber bilen.','an på',['til an','for på','an af'])
  ])
];

const word = (da,ru,exampleDa,exampleRu,note) => ({da,ru,exampleDa,exampleRu,note});
const family = (id,base,ru,words) => ({id:`pf-${id}`,base,ru,words});

// A family groups useful contrasts, not a claim that every word is a productive derivation.
export const particleFamilies = [
  family('give','give','Дать, сдаться, потратить и передать',[
    word('give','дать','Jeg giver dig en nøgle til huset.','Я дам тебе ключ от дома.','Основной глагол: give nogen noget.'),
    word('give op','сдаться','Hun prøver igen i stedet for at give op.','Она пробует снова вместо того, чтобы сдаться.','Раздельное сочетание; сравни слитное opgive, у которого есть и другие значения.'),
    word('give ud','тратить','Vi giver ikke mange penge ud på tøj.','Мы тратим не много денег на одежду.','В этом значении: give penge ud på noget.'),
    word('afgive','отдать, передать','Hun afgiver sin stemme før frokost.','Она отдаёт свой голос до обеда.','Слитный глагол; здесь afgive sin stemme — проголосовать.'),
    word('udgive','издать','Forlaget udgiver bogen i maj.','Издательство выпустит книгу в мае.','Слитно: udgiver; отдельно give penge ud — тратить деньги.')
  ]),
  family('finde','finde','Найти, выяснить, придумать',[
    word('finde','найти','Jeg fandt nøglen under stolen.','Я нашёл ключ под стулом.','Finde noget — найти что-либо; datid fandt.'),
    word('finde ud af','выяснить, разобраться','Vi finder ud af, hvilken bus vi skal tage.','Мы выясним, на какой автобус нужно сесть.','Сохраняй ud af; далее возможны hv-вопрос, om, at или существительное.'),
    word('finde på','придумать','Børnene finder på en ny leg.','Дети придумывают новую игру.','Не путай с нахождением потерянного предмета.'),
    word('opfinde','изобрести','Hun drømmer om at opfinde en bedre cykellygte.','Она мечтает изобрести лучший велосипедный фонарь.','Слитный глагол; opfinder — изобретает или «изобретатель» в другом контексте.')
  ]),
  family('holde','holde','Держать, любить, сохранять и прекращать',[
    word('holde','держать','Hold tasken, mens jeg åbner døren.','Подержи сумку, пока я открываю дверь.','Прямое значение: удерживать предмет.'),
    word('holde af','любить, быть привязанным','Hun holder af sin gamle hund.','Она любит свою старую собаку.','Устойчивое сочетание с af, не буквальное «держать от».'),
    word('holde på','сохранять, удерживать','Låget hjælper gryden med at holde på varmen.','Крышка помогает кастрюле сохранять тепло.','Здесь сохранять тепло; в другом контексте — настаивать на мнении.'),
    word('holde op med','перестать','Vi holder op med at arbejde klokken fire.','Мы прекращаем работать в четыре.','Holde op med at + инфинитив; без med возможно отдельное Hold op!'),
    word('holde ud','выдерживать','Jeg kan godt holde støjen ud i ti minutter.','Я вполне могу потерпеть шум десять минут.','Объект может стоять между holde и ud.')
  ]),
  family('tage','tage','Взять, снять, надеть и принять участие',[
    word('tage','взять','Tag en kop fra skabet.','Возьми чашку из шкафа.','Tage → tager → tog → taget.'),
    word('tage af','снять','Han tager hatten af, da han kommer ind.','Он снимает шляпу, когда входит.','Tage noget af; объект стоит перед af.'),
    word('tage på','надеть','Hun tager støvlerne på før turen.','Перед прогулкой она надевает сапоги.','Tage tøj på; без объекта в контексте веса — поправляться.'),
    word('tage med','взять с собой','Vi tager en madpakke med til stranden.','Мы берём с собой на пляж еду.','Tage noget med; med здесь часть сочетания.'),
    word('deltage','участвовать','Jeg vil gerne deltage i mødet på mandag.','Я хочу принять участие во встрече в понедельник.','Слитный глагол; deltage i noget.')
  ]),
  family('laegge','lægge','Положить, завершить звонок и прибавить',[
    word('lægge','положить','Jeg lægger brevet på bordet.','Я кладу письмо на стол.','Действие с объектом; ligge описывает положение предмета.'),
    word('lægge på','положить трубку','Han siger farvel og lægger på.','Он прощается и кладёт трубку.','Завершить телефонный разговор, даже на телефоне без трубки.'),
    word('lægge til','прибавить','Læg ti kroner til beløbet.','Прибавь к сумме десять крон.','Lægge noget til noget; til также может вводить то, к чему прибавляют.'),
    word('lægge ned','положить горизонтально','Vi lægger reolen ned, før vi flytter den.','Мы кладём стеллаж горизонтально, прежде чем передвигать его.','Раздельно и с физическим объектом.'),
    word('nedlægge','закрыть, упразднить','Kommunen vil nedlægge den lille afdeling.','Муниципалитет закроет маленькое отделение.','Слитное nedlægge в этом контексте не равно физическому lægge ned.')
  ]),
  family('gaa','gå','Идти, выйти, войти и увлекаться',[
    word('gå','идти пешком','Vi går langs havnen hver aften.','Каждый вечер мы идём вдоль гавани.','Gå → går → gik → gået.'),
    word('gå ud','выйти','Lad os gå ud og få lidt frisk luft.','Давай выйдем подышать свежим воздухом.','Ud — направление; ude — положение снаружи.'),
    word('gå ind','войти','Vi går ind i butikken for at købe brød.','Мы заходим в магазин купить хлеб.','Ind — направление; inde — положение внутри.'),
    word('gå op i','увлекаться, уделять внимание','Hun går meget op i at lave god mad.','Она уделяет много внимания приготовлению вкусной еды.','Учим всё сочетание gå op i, а не переводим op отдельно.')
  ]),
  family('komme','komme','Прийти, войти и зависеть',[
    word('komme','прийти, прибыть','Mine gæster kommer ved sekstiden.','Мои гости придут около шести.','Komme → kommer → kom → kommet.'),
    word('komme ind','войти','Du kan komme ind gennem sidedøren.','Ты можешь войти через боковую дверь.','Раздельное направление движения.'),
    word('komme til at','случайно сделать','Hun kom til at vælte glasset.','Она случайно опрокинула стакан.','В этом примере случайность; конструкция также употребляется о будущем.'),
    word('komme an på','зависеть от','Det kommer an på vejret, hvor vi spiser.','Где мы будем есть, зависит от погоды.','Раздельно: kommer an på; слитное ankommer — прибывает.')
  ]),
  family('staa','stå','Стоять, вставать и выходить из транспорта',[
    word('stå','стоять','Cyklen står ved hegnet.','Велосипед стоит у забора.','Stå → står → stod → stået.'),
    word('stå op','вставать с постели','Hun står op tidligt på hverdage.','По будням она рано встаёт с постели.','Обычное сочетание для подъёма утром.'),
    word('stå af','выходить из транспорта','Vi står af ved næste stoppested.','Мы выходим на следующей остановке.','О выходе из автобуса, поезда и т. п.; не общая замена gå ud.'),
    word('stå for','отвечать за, организовывать','Jeg står for kaffen til mødet.','Я отвечаю за кофе на встрече.','For здесь отдельное слово; не путай со слитным forstå «понимать».')
  ]),
  family('saette','sætte','Ставить, снижать цену и нанимать',[
    word('sætte','поставить','Sæt koppen på bakken.','Поставь чашку на поднос.','Sætte — действие с объектом; sidde — положение сидя.'),
    word('sætte ned','снижать','De sætter prisen ned i næste uge.','На следующей неделе они снизят цену.','Объект prisen стоит перед ned.'),
    word('sætte op','повышать','Udlejeren sætter huslejen op til sommer.','Летом арендодатель повысит плату за жильё.','В этом контексте повысить сумму; у сочетания есть и другие значения.'),
    word('ansætte','нанимать на работу','Firmaet vil ansætte en ny bogholder.','Компания наймёт нового бухгалтера.','Слитный глагол: ansætter, ansatte, ansat.')
  ]),
  family('skrive','skrive','Писать, записывать, подписывать',[
    word('skrive','писать','Hun skriver en kort besked til sin søster.','Она пишет короткое сообщение сестре.','Skrive → skriver → skrev → skrevet.'),
    word('skrive ned','записать','Skriv nummeret ned på et stykke papir.','Запиши номер на листке бумаги.','Skrive noget ned; результат — запись.'),
    word('skrive under','подписать','Du skal skrive under nederst på siden.','Тебе нужно расписаться внизу страницы.','Подписаться; с объектом возможно skrive under på noget.'),
    word('underskrive','подписать документ','Begge parter skal underskrive aftalen.','Обе стороны должны подписать соглашение.','Слитный глагол принимает прямой объект: underskrive aftalen.'),
    word('beskrive','описать','Kan du beskrive vejen til skolen?','Можешь описать дорогу к школе?','Be- — неразделяемая приставка; beskriver, а не skriver ... be.')
  ]),
  family('levere','levere','Доставить, сдать и подать',[
    word('levere','доставить','Butikken leverer varen på tirsdag.','Магазин доставит товар во вторник.','Levere noget til nogen; здесь доставка покупателю.'),
    word('aflevere','сдать, вернуть','Du kan aflevere pakken i kiosken.','Ты можешь сдать посылку в киоске.','Передать в нужное место; контекст определяет «сдать» или «вернуть».'),
    word('indlevere','сдать, подать','Han indleverer sin opgave digitalt.','Он сдаёт работу в электронном виде.','Часто об официальной сдаче документа, работы или предмета.')
  ]),
  family('bygge','bygge','Строить, перестраивать и расширять',[
    word('bygge','строить','De bygger et nyt hus ved skoven.','Они строят новый дом у леса.','Базовый глагол с прямым объектом.'),
    word('bygge om','перестраивать','Vi bygger køkkenet om til sommer.','Летом мы переделаем кухню.','Объект между bygger и om.'),
    word('ombygge','перестроить','De vil ombygge den gamle skole til boliger.','Они хотят переоборудовать старую школу под жильё.','Слитный вариант; конкретная модель может менять удобный порядок дополнений.'),
    word('udbygge','расширять, развивать','Byen vil udbygge nettet af cykelstier.','Город расширит сеть велосипедных дорожек.','Слитный глагол, возможен и переносный смысл развития системы.')
  ]),
  family('melde','melde','Сообщить, записаться, вступить и заявить',[
    word('melde','сообщить','Hun melder sin ankomst til receptionen.','Она сообщает о своём прибытии на стойке регистрации.','Базовое значение сообщения; часто встречается в устойчивых сочетаниях.'),
    word('melde sig til','записаться на','Vi melder os til en fælles middag.','Мы записываемся на общий ужин.','Раздельно: melde sig til noget.'),
    word('melde sig ind','вступить в организацию','Jeg melder mig ind i foreningen på mandag.','В понедельник я вступлю в объединение.','Организация вводится i: melde sig ind i noget.'),
    word('tilmelde sig','записаться на','Hun tilmelder sig et kursus i keramik.','Она записывается на курс керамики.','Слитный глагол; здесь курс следует напрямую. Возможно и tilmelde sig til et kursus.'),
    word('anmelde','заявить, сообщить официально','Vi anmelder den stjålne cykel til politiet.','Мы заявляем в полицию об украденном велосипеде.','Anmelde также означает рецензировать, например en bog; контекст обязателен.')
  ]),
  family('stille','stille','Поставить, убрать и задать вопрос',[
    word('stille','поставить','Hun stiller glasset på hylden.','Она ставит стакан на полку.','В этом употреблении действие с объектом.'),
    word('stille væk','убрать на место','Stil værktøjet væk, når du er færdig.','Убери инструменты, когда закончишь.','Раздельно: stille noget væk.'),
    word('stille op','выставить свою кандидатуру','Han vil stille op til kommunalvalget.','Он хочет выдвинуть свою кандидатуру на муниципальных выборах.','Устойчивое сочетание; здесь не физически «поставить вверх».'),
    word('stille et spørgsmål','задать вопрос','Må jeg stille et spørgsmål om teksten?','Можно задать вопрос по тексту?','Spørgsmål — существительное; это сочетание без частицы, полезное рядом с другими моделями.')
  ]),
  family('tale','tale','Говорить, обсудить и условиться',[
    word('tale','говорить','Vi taler dansk i pausen.','На перемене мы говорим по-датски.','Название языка может быть прямым дополнением: tale dansk.'),
    word('tale om','говорить о','De taler om planerne for sommeren.','Они говорят о планах на лето.','Om — предлог темы, а не приставка.'),
    word('aftale','договориться, согласовать','Vi aftaler et nyt tidspunkt for mødet.','Мы согласовываем новое время встречи.','Слитно; предмет договорённости — прямой объект.'),
    word('udtale','произносить','Hvordan udtaler man navnet på byen?','Как произносится название города?','Слитный глагол. Udtale sig om — высказываться о чём-либо, другая модель.')
  ]),
  family('koere','køre','Ехать, выехать, свернуть и переехать',[
    word('køre','ехать, вести машину','Jeg kører til arbejde hver morgen.','Каждое утро я еду на работу.','Не обязательно только личная машина: køre также о поезде, автобусе и работе механизма.'),
    word('køre ud','выехать','Bilen kører ud af garagen.','Машина выезжает из гаража.','Ud af — движение из помещения.'),
    word('køre ind','въехать','Vi kører ind på parkeringspladsen.','Мы заезжаем на парковку.','Ind указывает направление; место назначения здесь вводится på.'),
    word('overkøre','переехать транспортом','Bilen overkørte næsten en cyklist.','Машина чуть не переехала велосипедиста.','Слитный глагол с прямым объектом; køre over en bro «ехать через мост» — другая конструкция.')
  ]),
  family('se','se','Видеть, смотреть, выглядеть и игнорировать',[
    word('se','видеть','Jeg kan se havet fra vinduet.','Из окна я вижу море.','Se → ser → så → set.'),
    word('se på','смотреть на','Hun ser på kortet for at finde vejen.','Она смотрит на карту, чтобы найти дорогу.','På вводит объект взгляда.'),
    word('se ud','выглядеть','Huset ser tomt ud udefra.','Снаружи дом выглядит пустым.','Описание tomt стоит между ser и ud.'),
    word('overse','не заметить, упустить','Jeg overså en vigtig linje i brevet.','Я не заметил важную строку в письме.','Слитный глагол: overse noget; в другом контексте может означать намеренно игнорировать.')
  ]),
  family('slaa','slå','Ударить, найти в справочнике и выключить',[
    word('slå','ударить','Bolden slog mod ruden.','Мяч ударился об оконное стекло.','Slå → slår → slog → slået.'),
    word('slå op','найти в справочнике','Jeg slår ordet op i ordbogen.','Я нахожу слово в словаре.','Slå noget op i en ordbog; у slå op есть и другие значения.'),
    word('slå fra','выключить','Slå strømmen fra, før du reparerer lampen.','Отключи электричество, прежде чем ремонтировать лампу.','Объект strømmen находится перед fra.'),
    word('afslå','отклонить, отказать','Hun afslår tilbuddet om et nyt job.','Она отклоняет предложение новой работы.','Слитно: afslå et tilbud. Это не то же, что slå strømmen fra.')
  ]),
  family('for','for-','Слитное начало слова: разные целые значения',[
    word('forstå','понимать','Nu forstår jeg forskellen mellem ordene.','Теперь я понимаю разницу между словами.','For- не отделяется: jeg forstår; stå for — отвечать за — отдельное сочетание.'),
    word('forandre','изменить','Et nyt job kan forandre hverdagen.','Новая работа может изменить повседневную жизнь.','Учи целиком; начало for- не даёт точного перевода без знания слова.'),
    word('forsvinde','исчезнуть','Tågen forsvinder, når solen kommer frem.','Туман исчезает, когда появляется солнце.','Forsvinde → forsvandt → forsvundet; приставка остаётся частью слова.')
  ]),
  family('an','an- · an','Слитные глаголы и отдельное an в сочетаниях',[
    word('ankomme','прибывать','Flyet ankommer en time senere end planlagt.','Самолёт прибывает на час позже запланированного.','Слитно: ankomme, ankommer, ankom, ankommet.'),
    word('anmelde','официально заявить','Hun vil anmelde skaden til sit forsikringsselskab.','Она хочет сообщить об ущербе в свою страховую компанию.','Слитный глагол; объект и контекст отличают заявление от рецензии.'),
    word('ansætte','нанять на работу','Skolen ansætter to nye lærere.','Школа нанимает двух новых учителей.','Слитно; ansat также употребляется о сотруднике.'),
    word('komme an på','зависеть от','Det kommer an på, hvor meget tid vi har.','Это зависит от того, сколько у нас времени.','An — отдельная часть конструкции, а не отделённое начало ankomme.')
  ])
];

// Optional comprehension reference only. These are deliberately not course lessons or automatic review items.
const informal = (id,da,ru,register,strength,note,neutral,exampleDa,exampleRu) =>
  ({id:`informal-${id}`,da,ru,register,strength,note,neutral,exampleDa,exampleRu});
export const informalExpressions = [
  informal('pokker','for pokker','чёрт возьми; вот досада','мягкое разговорное ругательство','mild','Обычно выражает досаду или удивление, без адресата. Мягче многих ругательств с fanden; сила всё равно зависит от тона.','åh nej; det var ærgerligt','For pokker, jeg har glemt min nøgle.','Чёрт, я забыл ключ.'),
  informal('soeren','for søren','блин; ну надо же','мягкое разговорное восклицание','mild','Смягчённое ругательство. Это выражение, а не обращение к человеку по имени Søren.','åh nej; hold da op','For søren, hvor er den kasse tung!','Ну и тяжёлая же эта коробка!'),
  informal('sgu','sgu','же; ведь; правда (эмоциональное усиление)','разговорное усилительное ругательство','moderate','Нельзя переводить одной русской частицей во всех фразах. Может звучать дружелюбно или резко; для официальной речи выбирай нейтральный вариант.','faktisk; virkelig','Det var sgu en god idé.','Это же была отличная идея.'),
  informal('fandens','fandens','чёртов; проклятый','ругательное определение или усиление','moderate','В en fandens larm усиливает недовольство шумом. Другие устойчивые выражения могут передавать удивление или восхищение.','en frygtelig; meget','Der er en fandens larm fra vejen.','С дороги доносится чертовски сильный шум.'),
  informal('helvede','for helvede','чёрт побери; да блин','сильное разговорное ругательство','strong','Сильная досада или злость; резкая интонация легко превращает фразу в агрессивную. Здесь возглас относится к ситуации.','åh nej; det er virkelig frustrerende','For helvede, nu er computeren gået ned igen.','Чёрт побери, компьютер опять завис.'),
  informal('kaeft','hold kæft','заткнись; обалдеть (по контексту)','грубая команда или эмоциональное восклицание','strong','Как приказ человеку звучит оскорбительно. В hold kæft, hvor ... иногда выражает удивление или восхищение без приказа замолчать.','vær stille, tak; hold da op','Hold kæft, hvor er her flot!','Обалдеть, как здесь красиво!'),
  informal('pisse','pisse-','чертовски; очень (грубое усиление)','грубое разговорное первое слово сложения','moderate','Усиление пишется слитно: pissekoldt, pissegodt. Дефис показывает форму элемента в справочнике. Это не частица глагола.','meget; virkelig','Det er pissekoldt udenfor i dag.','Сегодня на улице чертовски холодно.'),
  informal('skide','skide-','чертовски; очень (грубое усиление)','грубое разговорное первое слово сложения','moderate','В skidegodt может усиливать положительную оценку; не всегда означает «плохой». Пишется слитно с усиленным словом.','meget; virkelig','Koncerten var skidegod.','Концерт был чертовски хорош.'),
  informal('lort','lort','дерьмо; дрянь','грубое существительное, буквальное или оценочное','moderate','Может относиться к неудачной работе, предмету или ситуации. Обращение к человеку с этим словом — оскорбление.','noget dårligt; noget rod','Det billige kabel er noget lort.','Этот дешёвый кабель — полная дрянь.'),
  informal('fuck','fuck','блин; чёрт; более грубое ругательство','грубое заимствованное восклицание','strong','Выражает досаду или потрясение. Точная сила и русский эквивалент зависят от среды; пример не направлен на человека.','åh nej; det var uheldigt','Fuck, jeg har tabt min telefon i vandet.','Чёрт, я уронил телефон в воду.'),
  informal('idiot','idiot','идиот','оскорбительное обозначение человека','moderate','Даже без табуированной лексики оскорбляет. В примере говорящий оценивает собственную ошибку; нейтральнее описать действие.','jeg lavede en dum fejl','Jeg følte mig som en idiot, da jeg tog den forkerte bus.','Я почувствовал себя идиотом, когда сел не на тот автобус.'),
  informal('shit','shit','блин; вот чёрт','разговорное заимствованное ругательство','moderate','Часто короткая реакция на ошибку. Разговорная привычность не делает его нейтральным во всех ситуациях.','åh nej; øv','Shit, jeg har glemt aftalen hos tandlægen.','Блин, я забыл о приёме у стоматолога.')
];
