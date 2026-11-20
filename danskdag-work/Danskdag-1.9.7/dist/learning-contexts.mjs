const context = (id, text, answer, ru) => ({id, text, answers:[answer], completeDa:text.replace('___', answer), ru});

export const learningContexts = {
  'everyday-et-koekken':[
    context('ctx-koekken-1','Der er plads til et lille bord i ___.','køkkenet','На кухне есть место для маленького стола.'),
    context('ctx-koekken-2','Vi leder efter en lejlighed med et større ___.','køkken','Мы ищем квартиру с кухней побольше.')
  ],
  'everyday-et-vindue':[
    context('ctx-vindue-1','Vil du lukke ___? Det er koldt herinde.','vinduet','Закроешь окно? Здесь холодно.'),
    context('ctx-vindue-2','Jeg vil gerne sidde ved et ___ i toget.','vindue','Я хотел бы сидеть у окна в поезде.')
  ],
  'everyday-et-haandklaede':[
    context('ctx-haandklaede-1','Jeg har glemt mit ___ til svømmehallen.','håndklæde','Я забыл полотенце для бассейна.'),
    context('ctx-haandklaede-2','Kan jeg få et rent ___ på værelset?','håndklæde','Можно мне чистое полотенце в номер?')
  ],
  'everyday-en-billet':[
    context('ctx-billet-1','Kan jeg bruge denne ___ til bussen?','billet','Можно использовать этот билет в автобусе?'),
    context('ctx-billet-2','Jeg kan ikke finde ___ på min telefon.','billetten','Я не могу найти билет в телефоне.')
  ],
  'everyday-en-pose':[
    context('ctx-pose-1','Vil du lægge brødet i en ___?','pose','Положишь хлеб в пакет?'),
    context('ctx-pose-2','Jeg glemte ___ med mit sportstøj i toget.','posen','Я забыл пакет со спортивной одеждой в поезде.')
  ],
  'everyday-en-kvittering':[
    context('ctx-kvittering-1','Gem ___, hvis du vil bytte trøjen.','kvitteringen','Сохрани чек, если хочешь обменять свитер.'),
    context('ctx-kvittering-2','Jeg har brug for en ___ til mit arbejde.','kvittering','Мне нужен чек для работы.')
  ],
  'everyday-et-moede':[
    context('ctx-moede-1','Vi flytter ___ fra tirsdag til torsdag.','mødet','Мы переносим встречу со вторника на четверг.'),
    context('ctx-moede-2','Jeg kan ikke svare nu, for jeg sidder i et ___.','møde','Сейчас я не могу ответить, потому что я на совещании.')
  ],
  'everyday-en-pause':[
    context('ctx-pause-1','Skal vi tage en ___ og få lidt frisk luft?','pause','Давай сделаем перерыв и подышим свежим воздухом?'),
    context('ctx-pause-2','Efter ___ fortsætter vi med den næste opgave.','pausen','После перерыва мы продолжим со следующим заданием.')
  ],
  'everyday-en-laege':[
    context('ctx-laege-1','Min ___ har ferie, så jeg ringer til klinikken.','læge','Мой врач в отпуске, поэтому я звоню в клинику.'),
    context('ctx-laege-2','Jeg har fået en tid hos ___ på mandag.','lægen','Мне назначили приём у врача на понедельник.')
  ],
  'everyday-en-laerer':[
    context('ctx-laerer-1','Jeg spørger ___ om den svære opgave.','læreren','Я спрашиваю учителя о трудном задании.'),
    context('ctx-laerer-2','Min søster arbejder som ___ på en skole.','lærer','Моя сестра работает учителем в школе.')
  ],
  'everyday-at-betale':[
    context('ctx-betale-1','Jeg vil gerne ___ regningen i dag.','betale','Я хотел бы оплатить счёт сегодня.'),
    context('ctx-betale-2','I går ___ jeg for kaffen med min telefon.','betalte','Вчера я оплатил кофе телефоном.')
  ],
  'everyday-at-koebe':[
    context('ctx-koebe-1','Hvor kan jeg ___ en billet til koncerten?','købe','Где можно купить билет на концерт?'),
    context('ctx-koebe-2','Vi ___ en brugt cykel til vores søn i går.','købte','Вчера мы купили сыну подержанный велосипед.')
  ],
  'everyday-at-koste':[
    context('ctx-koste-1','Hvor meget ___ det at sende pakken?','koster','Сколько стоит отправить посылку?'),
    context('ctx-koste-2','Turen til København ___ mindre, end jeg troede.','kostede','Поездка в Копенгаген стоила меньше, чем я думал.')
  ],
  'everyday-at-vente':[
    context('ctx-vente-1','Kan du ___ på mig ved cyklerne?','vente','Можешь подождать меня у велосипедов?'),
    context('ctx-vente-2','Vi ___ længe på svar fra udlejeren.','ventede','Мы долго ждали ответа от арендодателя.')
  ],
  'everyday-at-arbejde':[
    context('ctx-arbejde-1','Min nabo ___ på et hospital om natten.','arbejder','Мой сосед работает в больнице по ночам.'),
    context('ctx-arbejde-2','Jeg ___ hjemme i går, fordi mit barn var sygt.','arbejdede','Вчера я работал дома, потому что мой ребёнок болел.')
  ],
  'everyday-at-begynde':[
    context('ctx-begynde-1','Filmen ___ først om en halv time.','begynder','Фильм начнётся только через полчаса.'),
    context('ctx-begynde-2','Vi ___ på det nye kursus i sidste uge.','begyndte','Мы начали заниматься на новом курсе на прошлой неделе.')
  ],
  'everyday-at-slutte':[
    context('ctx-slutte-1','Hvornår ___ din undervisning i aften?','slutter','Во сколько сегодня вечером закончатся твои занятия?'),
    context('ctx-slutte-2','Festen ___ tidligt, så vi nåede den sidste bus.','sluttede','Вечеринка закончилась рано, поэтому мы успели на последний автобус.')
  ],
  'everyday-at-aftale':[
    context('ctx-aftale-1','Kan vi ___, hvem der henter børnene?','aftale','Можем договориться, кто заберёт детей?'),
    context('ctx-aftale-2','Vi ___ at spise sammen efter arbejde.','aftalte','Мы договорились поесть вместе после работы.')
  ],
  'everyday-at-forstaa':[
    context('ctx-forstaa-1','Jeg ___ ikke, hvordan denne app virker.','forstår','Я не понимаю, как работает это приложение.'),
    context('ctx-forstaa-2','Jeg ___ spørgsmålet, da du sagde det langsommere.','forstod','Я понял вопрос, когда ты произнёс его медленнее.')
  ],
  'everyday-at-gentage':[
    context('ctx-gentage-1','Kan du ___ adressen lidt langsommere?','gentage','Можешь повторить адрес немного медленнее?'),
    context('ctx-gentage-2','Hun ___ beskeden, så alle kunne høre den.','gentog','Она повторила сообщение, чтобы все могли его услышать.')
  ],
  'everyday-at-ringe':[
    context('ctx-ringe-1','Jeg skal ___ til skolen om min søns fravær.','ringe','Мне нужно позвонить в школу по поводу отсутствия сына.'),
    context('ctx-ringe-2','Min ven ___ i går for at høre, hvordan det gik.','ringede','Вчера мой друг позвонил узнать, как идут дела.')
  ],
  'everyday-at-moedes':[
    context('ctx-moedes-1','Vi ___ uden for biografen klokken syv.','mødes','Мы встречаемся у кинотеатра в семь часов.'),
    context('ctx-moedes-2','Jeg ___ med min veninde på en café i går.','mødtes','Вчера я встретился с подругой в кафе.')
  ],
  'everyday-at-taende':[
    context('ctx-taende-1','Jeg ___ computeren, før mødet begynder.','tænder','Я включаю компьютер до начала встречи.'),
    context('ctx-taende-2','Hun ___ et stearinlys, da det blev mørkt.','tændte','Она зажгла свечу, когда стемнело.')
  ],
  'everyday-at-slukke':[
    context('ctx-slukke-1','Vil du ___ fjernsynet, før vi spiser?','slukke','Выключишь телевизор перед тем, как мы поедим?'),
    context('ctx-slukke-2','Jeg ___ min telefon under forestillingen.','slukkede','Я выключил телефон на время спектакля.')
  ],
  'everyday-sulten':[
    context('ctx-sulten-1','Er du ___, eller skal vi vente med at spise?','sulten','Ты голоден или нам подождать с едой?'),
    context('ctx-sulten-2','Børnene er ___ efter en lang dag i skolen.','sultne','Дети голодны после долгого дня в школе.')
  ],
  'everyday-travl':[
    context('ctx-travl-1','Jeg har ___, så jeg kan ikke tale lige nu.','travlt','Я занят, поэтому сейчас не могу разговаривать.'),
    context('ctx-travl-2','Det har været en ___ uge med både flytning og eksamen.','travl','Это была напряжённая неделя: и переезд, и экзамен.')
  ],
  'everyday-rask':[
    context('ctx-rask-1','Jeg håber, at du snart bliver ___.','rask','Надеюсь, ты скоро выздоровеешь.'),
    context('ctx-rask-2','Børnene er ___ og kan komme i skole igen.','raske','Дети здоровы и снова могут ходить в школу.')
  ],
  'everyday-enig':[
    context('ctx-enig-1','Er du ___ med mig i, at vi skal vente?','enig','Ты согласен со мной, что нам нужно подождать?'),
    context('ctx-enig-2','Vi er ___ om at holde festen hjemme.','enige','Мы согласны устроить праздник дома.')
  ],
  'everyday-i-dag':[
    context('ctx-i-dag-1','Har du tid til at hjælpe mig ___?','i dag','У тебя есть время помочь мне сегодня?'),
    context('ctx-i-dag-2','Butikken lukker tidligere ___ på grund af sygdom.','i dag','Сегодня магазин закрывается раньше из-за болезни.')
  ],
  'everyday-i-morgen':[
    context('ctx-i-morgen-1','Kan du aflevere bogen på biblioteket ___?','i morgen','Можешь завтра вернуть книгу в библиотеку?'),
    context('ctx-i-morgen-2','Jeg skal tidligt op ___, så jeg går snart i seng.','i morgen','Завтра мне рано вставать, поэтому я скоро пойду спать.')
  ]
};
