// Test content for the PD3 grammar practice (contract: docs/pd3-grammar-schema.md): the 12 categories, a full set of ten tasks with all five
// task types and a short set of five. The tests use this instead of the real sets, so they do not change when the content grows.
export const grammarCategories=[
  {id:'v2',title:'Порядок слов: V2 и инверсия',tip:'Глагол стоит на втором месте. Если предложение начинается с обстоятельства, подлежащее идёт после глагола.'},
  {id:'bisaet',title:'Придаточные: порядок слов',tip:'В придаточном ikke, aldrig и ofte стоят перед глаголом.'},
  {id:'passive',title:'Пассив',tip:'Пассив образуют окончанием -s или формой blive + причастие.'},
  {id:'tenses',title:'Времена',tip:'Præteritum — завершённое прошлое, perfektum — связь с настоящим.'},
  {id:'relative',title:'Относительные слова',tip:'Som и der относятся к существительному, hvad — к целой ситуации.'},
  {id:'connect',title:'Союзы и связки',tip:'Fordi вводит причину, derfor — следствие, selvom — уступку.'},
  {id:'prep',title:'Предлоги',tip:'Предлог чаще всего задан глаголом или прилагательным: bange for, interesseret i.'},
  {id:'agree',title:'Согласование',tip:'Прилагательное согласуется с родом, числом и определённостью существительного.'},
  {id:'reflex',title:'Возвратные и притяжательные',tip:'Sin относится к подлежащему, hans и hendes — к другому лицу.'},
  {id:'modal',title:'Модальные глаголы',tip:'После модального глагола инфинитив стоит без at.'},
  {id:'compare',title:'Степени сравнения',tip:'Mere и mest — для многих прилагательных, flere — для исчисляемого.'},
  {id:'cond',title:'Условные конструкции',tip:'В условии с hvis результат выражается формой ville или præteritum.'}
];

export const grammarSets=[
  {id:'fx-gram-1',title:'Fixture sæt 1',level:'B2',minutes:15,items:[
    {id:'fx1-01',cat:'v2',type:'gap',stem:'I morgen ___ jeg til lægen.',options:['gik','går','gået','gå'],answer:1,why:'После обстоятельства глагол остаётся на втором месте, а подлежащее идёт за ним.'},
    {id:'fx1-02',cat:'prep',type:'gap',stem:'Hun er bange ___ edderkopper.',options:['for','af','med','til'],answer:0,why:'Устойчивое сочетание: bange for.'},
    {id:'fx1-03',cat:'modal',type:'gap',stem:'Jeg vil gerne ___ dig et spørgsmål.',options:['at stille','stille','stiller','stillet'],answer:1,why:'После vil инфинитив идёт без at.'},
    {id:'fx1-04',cat:'agree',type:'fix',sentence:'Hun har en rød bil og et stor hus.',errorIndex:7,fixes:['stort'],why:'Hus среднего рода, поэтому прилагательное получает -t: et stort hus.'},
    {id:'fx1-05',cat:'prep',type:'fix',sentence:'Hun er meget interesseret på historie.',errorIndex:4,fixes:['i'],why:'Устойчивое сочетание: interesseret i.'},
    {id:'fx1-06',cat:'passive',type:'transform',prompt:'Man bygger en ny skole i byen.',instruction:'Перепиши в пассиве (-s) без изменения смысла.',answers:['En ny skole bygges i byen.','Der bygges en ny skole i byen.'],why:'Пассив на -s: подлежащее man исчезает, объект становится подлежащим.'},
    {id:'fx1-07',cat:'connect',type:'transform',prompt:'Jeg tager en paraply med. Det regner.',instruction:'Объедини в одно предложение с «fordi».',answers:['Jeg tager en paraply med, fordi det regner.','Fordi det regner, tager jeg en paraply med.'],why:'Fordi вводит причину; при начале с придаточного в главном предложении идёт инверсия.'},
    {id:'fx1-08',cat:'v2',type:'order',tokens:['dag','har','I','fri.','vi'],answers:['I dag har vi fri.','Vi har fri i dag.'],why:'Глагол на втором месте: после I dag идёт har, затем подлежащее vi.'},
    {id:'fx1-09',cat:'bisaet',type:'order',tokens:['at','jeg','ikke','ved','han','kommer.'],answers:['Jeg ved at han ikke kommer.'],why:'В придаточном ikke стоит перед глаголом kommer.'},
    {id:'fx1-10',cat:'connect',type:'cloze',segments:['Jeg blev hjemme ',{gap:1,options:['fordi','selvom','medmindre','derfor'],answer:0},' jeg var syg. ',{gap:2,options:['Men','Derfor','Selvom','Hvis'],answer:1},' kunne jeg ikke komme til festen, ',{gap:3,options:['hvis','men','eller','fordi'],answer:1},' jeg håber, at du ',{gap:4,options:['kommer','kom','kommet','komme'],answer:0},' næste gang.'],why:'Fordi — причина, derfor — следствие, men — противопоставление, после «at du» стоит личная форма kommer.'}
  ]},
  {id:'fx-gram-2',title:'Fixture sæt 2',level:'B2',minutes:15,items:[
    {id:'fx2-01',cat:'tenses',type:'gap',stem:'I går ___ vi en god film.',options:['ser','så','set','se'],answer:1,why:'I går требует præteritum: så.'},
    {id:'fx2-02',cat:'cond',type:'gap',stem:'Hvis jeg havde tid, ___ jeg komme.',options:['vil','ville','villet','vilde'],answer:1,why:'Нереальное условие даёт ville + инфинитив.'},
    {id:'fx2-03',cat:'reflex',type:'fix',sentence:'Peter vasker hans bil hver weekend.',errorIndex:2,fixes:['sin'],why:'Объект принадлежит подлежащему, поэтому нужен sin.'},
    {id:'fx2-04',cat:'cond',type:'transform',prompt:'Hvis det regner, bliver vi hjemme.',instruction:'Начни с: Vi bliver hjemme, …',answers:['Vi bliver hjemme, hvis det regner.'],why:'Придаточное идёт после главного, порядок слов в нём прямой.'},
    {id:'fx2-05',cat:'modal',type:'order',tokens:['skal','Du','komme','i','tide.'],answers:['Du skal komme i tide.'],why:'Модальный глагол на втором месте, инфинитив без at.'}
  ]}
];
export const grammarFixture={grammarSets,grammarCategories};
