# -*- coding: utf-8 -*-
P = {}
P[92] = dict(
  ru=dict(
    intro=[
      "OpenCart Theme PRO — это не надстройка над чужим шаблоном, а самостоятельная коммерческая тема для витрины OpenCart и ocStore 3.x. Каталог, карточка товара, галерея, меню, промо-блоки — всё это уже собрано в единый современный интерфейс, который одинаково аккуратно выглядит и на широком мониторе, и на телефоне.",
      "Отдельная ставка сделана на то, что обычно приходится дописывать вручную: структурированные данные для поисковиков и защиту категорий от технических дублей. Вы получаете витрину, которую не нужно сначала приводить в порядок, чтобы Google понимал, что на странице продаётся."
    ],
    sections=[
      dict(h="📱 Витрина, которая подстраивается под экран", p=[
        "Каталог, карточки товаров, галерея и навигация сделаны адаптивными: сетка товаров перестраивается под ширину экрана, а не просто сжимается. Покупатель с телефона видит те же блоки, что и посетитель с ноутбука, только в удобной ему компоновке.",
        "После установки стоит открыть магазин на нескольких устройствах и проверить не только вид, но и скорость загрузки: тема влияет почти на каждую страницу, и лучше заметить мелочи до запуска рекламы, а не после."]),
      dict(h="🧾 Разметка товара для поисковиков", p=[
        "Тема выводит расширенную schema.org-разметку товара. В неё попадают бренд, артикулы sku, mpn и gtin, изображения, срок действия цены priceValidUntil, средний рейтинг aggregateRating и сами отзывы, а также данные о доставке shippingDetails и политике возврата.",
        "Ключевая оговорка: всё это выводится при наличии данных. Если у товара нет gtin или отзывов, тема не придумывает их ради красивой разметки — поле просто не попадает в код страницы."]),
      dict(h="🧭 Категории без дублей по параметрам", p=[
        "Любой каталог OpenCart порождает множество адресов одной и той же категории: с сортировкой, лимитом на странице, фильтром, номером страницы. Для поисковика это разные URL с почти одинаковым содержимым.",
        "Тема помечает такие технические варианты, в которых есть параметры sort, order, limit, filter и page, директивой noindex,follow: страницы не попадают в индекс, но ссылки на них по-прежнему читаются. Дополнительно можно включить canonical на чистую категорию."],
        ul=["Параметры sort и order — сортировка списка", "Параметр limit — число товаров на странице", "Параметры filter и page — фильтрация и пагинация"]),
      dict(h="🎨 Оформление без правки шаблонов", p=[
        "Цвета, промо-блоки и остальные параметры внешнего вида настраиваются из админки. Фоновое изображение сайта выбирается через стандартный менеджер изображений OpenCart, то есть без ручной загрузки по FTP и правки CSS.",
        "Так тему может донастроить менеджер магазина, а разработчик подключается только тогда, когда нужно что-то действительно нестандартное."]),
      dict(h="📝 Блог и отзывы в комплекте", p=[
        "Блог и отзывы входят в состав решения, поэтому статьи и мнения покупателей выглядят частью одной темы, а не прикрученными сбоку модулями. Отзывы к тому же питают рейтинг в разметке товара."]),
      dict(h="⚠️ Что проверить перед запуском", p=[
        "Тема затрагивает почти всю витрину, поэтому совместимость с другими установленными модулями нужно проверить на тестовой копии. Установите тему, обновите модификаторы и пройдитесь по каталогу, корзине и оформлению заказа.",
        "Canonical включайте только если ваш SEO-модуль не выводит собственный: два разных canonical на одной странице только запутают поисковик."])
    ]),
  uk=dict(
    intro=[
      "OpenCart Theme PRO — це не надбудова над чужим шаблоном, а самостійна комерційна тема для вітрини OpenCart та ocStore 3.x. Каталог, картка товару, галерея, меню, промо-блоки — усе вже зібрано в єдиний сучасний інтерфейс, який однаково охайно виглядає і на широкому моніторі, і на телефоні.",
      "Окремо зроблено ставку на те, що зазвичай доводиться дописувати вручну: структуровані дані для пошукових систем і захист категорій від технічних дублів. Ви отримуєте вітрину, яку не треба спершу доводити до ладу, щоб Google розумів, що саме продається на сторінці."
    ],
    sections=[
      dict(h="📱 Вітрина, що підлаштовується під екран", p=[
        "Каталог, картки товарів, галерея й навігація адаптивні: сітка товарів перебудовується під ширину екрана, а не просто стискається. Покупець із телефона бачить ті самі блоки, що й відвідувач із ноутбука, лише в зручнішому для нього компонуванні.",
        "Після встановлення варто відкрити магазин на кількох пристроях і перевірити не лише вигляд, а й швидкість завантаження: тема впливає майже на кожну сторінку, тож дрібниці краще помітити до запуску реклами, а не після."]),
      dict(h="🧾 Розмітка товару для пошуковиків", p=[
        "Тема виводить розширену schema.org-розмітку товару. До неї потрапляють бренд, артикули sku, mpn і gtin, зображення, строк дії ціни priceValidUntil, середній рейтинг aggregateRating та самі відгуки, а також дані про доставку shippingDetails і політику повернення.",
        "Ключове застереження: усе це виводиться за наявності даних. Якщо в товару немає gtin або відгуків, тема не вигадує їх заради гарної розмітки — поле просто не потрапляє в код сторінки."]),
      dict(h="🧭 Категорії без дублів за параметрами", p=[
        "Будь-який каталог OpenCart породжує безліч адрес однієї й тієї самої категорії: із сортуванням, лімітом на сторінці, фільтром, номером сторінки. Для пошуковика це різні URL із майже однаковим вмістом.",
        "Тема позначає такі технічні варіанти, де є параметри sort, order, limit, filter і page, директивою noindex,follow: сторінки не потрапляють в індекс, але посилання на них і далі читаються. Додатково можна ввімкнути canonical на чисту категорію."],
        ul=["Параметри sort і order — сортування списку", "Параметр limit — кількість товарів на сторінці", "Параметри filter і page — фільтрація та пагінація"]),
      dict(h="🎨 Оформлення без правки шаблонів", p=[
        "Кольори, промо-блоки й інші параметри зовнішнього вигляду налаштовуються з адмінки. Фонове зображення сайту обирається через стандартний менеджер зображень OpenCart, тобто без ручного завантаження по FTP і правки CSS.",
        "Так тему може донастроїти менеджер магазину, а розробник підключається лише тоді, коли потрібно щось справді нестандартне."]),
      dict(h="📝 Блог і відгуки в комплекті", p=[
        "Блог і відгуки входять до складу рішення, тому статті й думки покупців виглядають частиною однієї теми, а не прикрученими збоку модулями. Відгуки до того ж живлять рейтинг у розмітці товару."]),
      dict(h="⚠️ Що перевірити перед запуском", p=[
        "Тема зачіпає майже всю вітрину, тому сумісність з іншими встановленими модулями потрібно перевірити на тестовій копії. Встановіть тему, оновіть модифікатори й пройдіться по каталогу, кошику та оформленню замовлення.",
        "Canonical вмикайте лише якщо ваш SEO-модуль не виводить власний: два різні canonical на одній сторінці тільки заплутають пошуковик."])
    ]),
  en=dict(
    intro=[
      "OpenCart Theme PRO is not an add-on layered over someone else's template but a standalone commercial theme for the OpenCart and ocStore 3.x storefront. The catalog, product page, gallery, menu and promo blocks come together as one modern interface that looks equally tidy on a wide monitor and on a phone.",
      "It puts extra weight on what store owners usually have to bolt on by hand: structured data for search engines and protection of category pages from technical duplicates. You get a storefront that does not need tidying up before Google understands what is being sold on a page."
    ],
    sections=[
      dict(h="📱 A storefront that adapts to the screen", p=[
        "The catalog, product cards, gallery and navigation are responsive: the product grid reflows to the screen width instead of just shrinking. A phone visitor sees the same blocks as a laptop visitor, only arranged in a way that suits the smaller screen.",
        "After installing, open the store on a few devices and check not only how it looks but how fast it loads. A theme touches nearly every page, so small problems are better caught before an ad campaign than after."]),
      dict(h="🧾 Product markup for search engines", p=[
        "The theme outputs extended schema.org product markup. It includes brand, the sku, mpn and gtin identifiers, images, the priceValidUntil date, the aggregateRating average and the reviews themselves, plus shippingDetails and the return policy.",
        "One key condition: everything is output when the data exists. If a product has no gtin or no reviews, the theme does not invent them for the sake of prettier markup; the field simply stays out of the page code."]),
      dict(h="🧭 Category pages without parameter duplicates", p=[
        "Every OpenCart catalog produces many addresses for the same category: with sorting, a per-page limit, a filter, a page number. To a search engine these are different URLs with almost identical content.",
        "The theme marks such technical variants, those carrying sort, order, limit, filter and page parameters, with noindex,follow: the pages stay out of the index while their links are still followed. You can also switch on a canonical pointing to the clean category."],
        ul=["sort and order parameters: list sorting", "limit parameter: items per page", "filter and page parameters: filtering and pagination"]),
      dict(h="🎨 Styling without editing templates", p=[
        "Colors, promo blocks and other appearance settings are managed from the admin. The site background image is picked through the standard OpenCart image manager, so there is no FTP upload or CSS editing involved.",
        "That way a store manager can fine-tune the theme, and a developer is needed only for something truly custom."]),
      dict(h="📝 Blog and reviews included", p=[
        "A blog and reviews are part of the package, so articles and customer opinions look like one theme rather than modules glued on the side. Reviews also feed the rating in the product markup."]),
      dict(h="⚠️ What to check before going live", p=[
        "The theme affects almost the entire storefront, so check compatibility with your other modules on a staging copy. Install the theme, refresh the modifications and walk through the catalog, cart and checkout.",
        "Enable the canonical option only if your SEO module does not output its own. Two different canonical tags on one page will only confuse a search engine."])
    ]),
  cover=dict(
    tagline="Адаптивная тема с готовой SEO-разметкой",
    items=["Адаптивный каталог", "Карточки товаров", "Разметка schema.org", "Защита от дублей", "Промо-блоки", "Блог и отзывы"],
    cards=[("Адаптивность", "Каталог и карточки перестраиваются под экран"),
           ("schema.org", "brand, sku, gtin, рейтинг, отзывы, доставка"),
           ("noindex,follow", "Технические URL категорий не попадают в индекс"),
           ("Canonical", "Необязательная ссылка на чистую категорию"),
           ("Фон сайта", "Выбор через менеджер изображений OpenCart"),
           ("Блог и отзывы", "Входят в состав темы")],
    tabs=["Оформление", "Промо-блоки", "SEO-разметка", "Категории"],
    kpis=[("Страниц", "1 240"), ("С разметкой", "98%"), ("Дублей закрыто", "312")],
  ),
)

P[99] = dict(
  ru=dict(
    intro=[
      "Заголовок обрезается в выдаче на полуслове, описание не помещается в сниппет, а H1 разрастается до трёх строк — знакомая картина, когда SEO-поля заполняют на глаз. SEO Meta Character Counter PRO решает это самым простым способом: рядом с полем в админке OpenCart появляется живой счётчик символов.",
      "Модуль принципиально ничего не генерирует и не переписывает. Он не подставляет шаблоны и не правит ваш текст, а лишь показывает, сколько знаков уже набрано, пока вы пишете. Решение о длине остаётся за человеком."
    ],
    sections=[
      dict(h="🔢 Счётчик там, где вы печатаете", p=[
        "Счётчики появляются у названия, H1, Meta Title, Meta Description и других поддерживаемых полей. Вы набираете текст, а число обновляется на ваших глазах, без нажатия кнопок и перезагрузки формы.",
        "Рядом с числом выводится подсказка по длине: видно, укладываетесь ли вы в рекомендуемые пределы, не открывая отдельных сервисов для подсчёта знаков."]),
      dict(h="🗂️ В каких формах работает", p=[
        "Модуль подключается к стандартным формам админки: товары, категории, информационные страницы и производители. Если в магазине установлен совместимый блог или новостной раздел, счётчики появятся и на его страницах.",
        "Это удобно при массовом наполнении каталога: контент-менеджер видит одну и ту же логику в разных разделах и не держит в голове цифры для каждого типа страниц."]),
      dict(h="🪶 Ничего лишнего под капотом", p=[
        "Счётчик не меняет сохраняемое значение: в базу попадает ровно то, что вы ввели. Ему не нужны отдельные таблицы, cron или фоновые задачи, поэтому он не нагружает сервер и не оставляет после себя данных.",
        "Если модуль отключить, поля вернутся к привычному виду, а ваши мета-теги останутся нетронутыми."]),
      dict(h="🚀 Как начать", p=[
        "Установите и включите модуль, затем откройте форму товара или категории. Вкладки с SEO-данными уже будут снабжены счётчиками, дополнительных настроек для старта не требуется."],
        ul=["Установить и включить модуль", "Открыть форму товара или категории", "Следить за счётчиком при вводе текста"]),
      dict(h="📏 Что такое «правильная» длина", p=[
        "Важно понимать: это только индикатор. Рекомендуемая длина зависит от поисковой системы и от языка, а поисковики сами решают, что показывать в сниппете. Цифры на счётчике помогают избежать очевидных перекосов, но не гарантируют конкретного отображения в выдаче.",
        "Лучше всего модуль работает как привычка: когда счётчик перед глазами, текст сразу пишется в нужный объём, и переписывать его потом не приходится."])
    ]),
  uk=dict(
    intro=[
      "Заголовок обрізається у видачі на пів слові, опис не вміщується в сніпет, а H1 розростається до трьох рядків — знайома картина, коли SEO-поля заповнюють на око. SEO Meta Character Counter PRO розв’язує це найпростішим способом: поруч із полем в адмінці OpenCart з’являється живий лічильник символів.",
      "Модуль принципово нічого не генерує й не переписує. Він не підставляє шаблони й не правит ваш текст, а лише показує, скільки знаків уже набрано, поки ви пишете. Рішення щодо довжини залишається за людиною."
    ],
    sections=[
      dict(h="🔢 Лічильник там, де ви друкуєте", p=[
        "Лічильники з’являються біля назви, H1, Meta Title, Meta Description та інших підтримуваних полів. Ви набираєте текст, а число оновлюється на очах, без натискання кнопок і перезавантаження форми.",
        "Поруч із числом виводиться підказка щодо довжини: видно, чи вкладаєтеся ви в рекомендовані межі, не відкриваючи окремих сервісів для підрахунку знаків."]),
      dict(h="🗂️ У яких формах працює", p=[
        "Модуль підключається до стандартних форм адмінки: товари, категорії, інформаційні сторінки та виробники. Якщо в магазині встановлено сумісний блог або розділ новин, лічильники з’являться й на його сторінках.",
        "Це зручно під час масового наповнення каталогу: контент-менеджер бачить однакову логіку в різних розділах і не тримає в голові цифри для кожного типу сторінок."]),
      dict(h="🪶 Нічого зайвого всередині", p=[
        "Лічильник не змінює значення, що зберігається: до бази потрапляє рівно те, що ви ввели. Йому не потрібні окремі таблиці, cron чи фонові задачі, тому він не навантажує сервер і не залишає після себе даних.",
        "Якщо модуль вимкнути, поля повернуться до звичного вигляду, а ваші мета-теги залишаться недоторканими."]),
      dict(h="🚀 Як почати", p=[
        "Встановіть і ввімкніть модуль, а потім відкрийте форму товару чи категорії. Вкладки з SEO-даними вже матимуть лічильники, додаткових налаштувань для старту не потрібно."],
        ul=["Встановити й ввімкнути модуль", "Відкрити форму товару або категорії", "Стежити за лічильником під час введення тексту"]),
      dict(h="📏 Що таке «правильна» довжина", p=[
        "Важливо розуміти: це лише індикатор. Рекомендована довжина залежить від пошукової системи та від мови, а пошуковики самі вирішують, що показувати в сніпеті. Цифри на лічильнику допомагають уникнути очевидних перекосів, але не гарантують конкретного відображення у видачі.",
        "Найкраще модуль працює як звичка: коли лічильник перед очима, текст одразу пишеться потрібного обсягу, і переписувати його потім не доводиться."])
    ]),
  en=dict(
    intro=[
      "A title cut off mid-word in the results, a description that does not fit the snippet, an H1 that sprawls over three lines: a familiar picture when SEO fields are filled in by eye. SEO Meta Character Counter PRO solves it in the simplest way possible, with a live character counter next to the field in the OpenCart admin.",
      "The module deliberately generates and rewrites nothing. It does not insert templates or edit your text; it only shows how many characters you have typed while you write. The decision about length stays with the person."
    ],
    sections=[
      dict(h="🔢 A counter right where you type", p=[
        "Counters appear beside the name, H1, Meta Title, Meta Description and other supported fields. You type and the number updates as you go, with no buttons to press and no form reload.",
        "A length hint is shown next to the number, so you can see whether you are within the recommended range without opening a separate character-count website."]),
      dict(h="🗂️ Which forms it covers", p=[
        "The module hooks into the standard admin forms: products, categories, information pages and manufacturers. If the store has a compatible blog or news section, the counters appear on its pages too.",
        "This helps during bulk catalog work: a content manager sees the same logic in every section and does not have to memorize limits for each page type."]),
      dict(h="🪶 Nothing extra under the hood", p=[
        "The counter does not alter the value that gets saved; the database receives exactly what you typed. It needs no extra tables, cron jobs or background tasks, so it adds no server load and leaves no data behind.",
        "If you turn the module off, the fields go back to their usual look and your meta tags stay untouched."]),
      dict(h="🚀 Getting started", p=[
        "Install and enable the module, then open a product or category form. The tabs holding SEO data will already have counters, and no extra setup is needed to begin."],
        ul=["Install and enable the module", "Open a product or category form", "Watch the counter as you type"]),
      dict(h="📏 What counts as the right length", p=[
        "Keep in mind that this is only an indicator. The recommended length depends on the search engine and the language, and search engines decide for themselves what to show in a snippet. The numbers help you avoid obvious extremes but do not guarantee a particular display in the results.",
        "The module works best as a habit: with the counter in view, text is written to the right size from the start and rarely needs rewriting later."])
    ]),
  cover=dict(
    tagline="Живые счётчики длины SEO-полей в админке",
    items=["Счётчик в реальном времени", "Название и H1", "Meta Title", "Meta Description", "Товары и категории", "Без cron и таблиц"],
    cards=[("Живой подсчёт", "Число символов обновляется прямо при вводе"),
           ("Подсказки длины", "Видно, укладываетесь ли вы в рекомендацию"),
           ("Основные формы", "Товары, категории, информация, производители"),
           ("Блог и новости", "Совместимые страницы тоже получают счётчики"),
           ("Текст не меняется", "В базу попадает ровно то, что введено"),
           ("Лёгкий модуль", "Без отдельных таблиц и фоновых задач")],
    tabs=["Общие", "Данные", "SEO", "Поля"],
    kpis=[("Meta Title", "54 / 60"), ("Description", "148 / 160"), ("H1", "32")],
  ),
)

P[105] = dict(
  ru=dict(
    intro=[
      "Одно и то же всплывающее окно редко подходит всем: посетителю из Украины нужен украинский текст, мобильному пользователю — другая картинка, а покупателю с полной корзиной — не то же предложение, что новичку. Popup Banner PRO строится вокруг этой мысли и управляет рекламными popup-кампаниями из одной админки.",
      "Главная идея — разделить картинку и текст. Изображение остаётся универсальным, а надпись редактируется и переводится отдельно, поэтому одна кампания корректно работает на всех языках и на всех экранах, и не нужно плодить копии баннера."
    ],
    sections=[
      dict(h="🎯 Кому и где показывать", p=[
        "Каждая кампания существует независимо и имеет собственное расписание. Показ можно привязать к конкретным страницам, категориям и товарам, ограничить языком магазина и типом устройства, а также учесть поведение посетителя.",
        "Так акция на одну категорию не всплывает в соседних разделах, а сообщение о доставке не мешает тем, кто уже оформляет заказ."]),
      dict(h="🛒 Условия по сумме корзины", p=[
        "Для кампаний можно задать ограничения по подытогу корзины. Сумма сравнивается в базовой валюте магазина, поэтому условие не «плывёт» вместе с выбором валюты на витрине.",
        "Например, предложение о подарке имеет смысл показывать только тем, чья корзина достигла нужного порога."]),
      dict(h="✍️ Тексты с подстановкой данных", p=[
        "Текст локализуется и полностью редактируется. В него можно вставлять переменные PRODUCT_NAME, PRICE, SPECIAL_PRICE и CATEGORY_NAME, и баннер на странице товара заговорит именно об этом товаре.",
        "Значения вычисляются только там, где переменные реально используются, так что обычные кампании не тратят ресурсы на лишние запросы."]),
      dict(h="🖼️ Банк визуалов без текста", p=[
        "В модуль встроен банк оптимизированных универсальных изображений без надписей. Готовые сюжеты покрывают типичные ситуации магазина:"],
        ul=["скидка и новинка", "доставка и подарок", "консультация и график работы", "технические работы и «магазин закрыт»"]),
      dict(h="📱 Свои картинки для каждого экрана", p=[
        "Если готовых сюжетов мало, можно загрузить собственную картинку. Изображения назначаются отдельно для компьютера, планшета и мобильного устройства, поэтому на телефоне баннер не превращается в нечитаемую миниатюру десктопного макета."]),
      dict(h="🔑 Лицензия и разумная частота", p=[
        "Для работы нужна активная лицензия PRO. Порядок запуска простой: создать кампанию, выбрать визуал из банка или загрузить свой, задать тексты по языкам и условия показа, затем включить расписание и проверить результат на разных устройствах.",
        "Отдельно напомним про меру: слишком частый показ раздражает покупателей, и это прямо влияет на удобство магазина."])
    ]),
  uk=dict(
    intro=[
      "Те саме спливне вікно рідко підходить усім: відвідувачу з України потрібен український текст, мобільному користувачу — інша картинка, а покупцю з повним кошиком — не та сама пропозиція, що новачку. Popup Banner PRO побудований навколо цієї думки й керує рекламними popup-кампаніями з однієї адмінки.",
      "Головна ідея — розділити картинку й текст. Зображення лишається універсальним, а напис редагується й перекладається окремо, тому одна кампанія коректно працює на всіх мовах і на всіх екранах, і не потрібно плодити копії банера."
    ],
    sections=[
      dict(h="🎯 Кому і де показувати", p=[
        "Кожна кампанія існує незалежно й має власний розклад. Показ можна прив’язати до конкретних сторінок, категорій і товарів, обмежити мовою магазину та типом пристрою, а також урахувати поведінку відвідувача.",
        "Так акція на одну категорію не спливає в сусідніх розділах, а повідомлення про доставку не заважає тим, хто вже оформлює замовлення."]),
      dict(h="🛒 Умови за сумою кошика", p=[
        "Для кампаній можна задати обмеження за підсумком кошика. Сума порівнюється в базовій валюті магазину, тому умова не «пливе» разом із вибором валюти на вітрині.",
        "Наприклад, пропозицію подарунка має сенс показувати лише тим, чий кошик досяг потрібного порогу."]),
      dict(h="✍️ Тексти з підстановкою даних", p=[
        "Текст локалізується й повністю редагується. У нього можна вставляти змінні PRODUCT_NAME, PRICE, SPECIAL_PRICE і CATEGORY_NAME, і банер на сторінці товару заговорить саме про цей товар.",
        "Значення обчислюються лише там, де змінні справді використовуються, тож звичайні кампанії не витрачають ресурси на зайві запити."]),
      dict(h="🖼️ Банк візуалів без тексту", p=[
        "У модуль вбудовано банк оптимізованих універсальних зображень без написів. Готові сюжети охоплюють типові ситуації магазину:"],
        ul=["знижка й новинка", "доставка та подарунок", "консультація й графік роботи", "технічні роботи та «магазин зачинено»"]),
      dict(h="📱 Власні картинки для кожного екрана", p=[
        "Якщо готових сюжетів замало, можна завантажити власну картинку. Зображення призначаються окремо для комп’ютера, планшета й мобільного пристрою, тож на телефоні банер не перетворюється на нечитабельну мініатюру десктопного макета."]),
      dict(h="🔑 Ліцензія та розумна частота", p=[
        "Для роботи потрібна активна ліцензія PRO. Порядок запуску простий: створити кампанію, обрати візуал із банку або завантажити свій, задати тексти за мовами й умови показу, потім увімкнути розклад і перевірити результат на різних пристроях.",
        "Окремо нагадаємо про міру: надто частий показ дратує покупців, і це прямо впливає на зручність магазину."])
    ]),
  en=dict(
    intro=[
      "The same popup rarely suits everyone: a visitor from Ukraine needs Ukrainian text, a mobile user needs a different image, and a shopper with a full cart should not get the same offer as a newcomer. Popup Banner PRO is built around that idea and manages advertising popup campaigns from a single admin.",
      "The central trick is separating picture from text. The image stays universal while the caption is edited and translated on its own, so one campaign works correctly across all languages and screens and you do not end up with copies of the same banner."
    ],
    sections=[
      dict(h="🎯 Who sees it, and where", p=[
        "Each campaign is independent and has its own schedule. Display can be tied to specific pages, categories and products, limited by store language and device type, and can take visitor behavior into account.",
        "That way a promotion for one category does not pop up in neighboring sections, and a delivery message does not bother people who are already checking out."]),
      dict(h="🛒 Conditions based on cart total", p=[
        "Campaigns can be restricted by the cart subtotal. The amount is compared in the store base currency, so the condition does not drift when a visitor switches currency on the storefront.",
        "A gift offer, for instance, makes sense only for carts that have reached the right threshold."]),
      dict(h="✍️ Text with live data", p=[
        "The text is localized and fully editable. You can insert the variables PRODUCT_NAME, PRICE, SPECIAL_PRICE and CATEGORY_NAME, and a banner on a product page will speak about exactly that product.",
        "Values are computed only where the variables are actually used, so ordinary campaigns do not spend resources on extra lookups."]),
      dict(h="🖼️ A bank of text-free visuals", p=[
        "The module ships with a bank of optimized universal images that contain no lettering. The ready-made scenes cover typical store situations:"],
        ul=["discount and new arrival", "delivery and gift", "consultation and working hours", "maintenance and store closed"]),
      dict(h="📱 Your own pictures per screen", p=[
        "If the built-in scenes are not enough, upload your own image. Images are assigned separately for desktop, tablet and mobile, so on a phone the banner does not turn into an unreadable thumbnail of a desktop layout."]),
      dict(h="🔑 License and sensible frequency", p=[
        "An active PRO license is required. Getting started is simple: create a campaign, pick a visual from the bank or upload your own, set texts per language and display conditions, then switch on the schedule and test on different devices.",
        "A word on restraint as well: showing popups too often annoys shoppers, and that directly affects how pleasant the store is to use."])
    ]),
  cover=dict(
    tagline="Popup-кампании с таргетингом и расписанием",
    items=["Независимые кампании", "Таргетинг по страницам", "Язык и устройство", "Условие по корзине", "Банк визуалов", "Тексты с переменными"],
    cards=[("Расписание", "У каждой кампании свой период показа"),
           ("Таргетинг", "Страницы, категории, товары, поведение"),
           ("Подытог корзины", "Сравнение в базовой валюте магазина"),
           ("Переменные", "PRODUCT_NAME, PRICE, SPECIAL_PRICE"),
           ("Банк картинок", "Скидка, доставка, подарок, техработы"),
           ("Три экрана", "Свои изображения для ПК, планшета, мобильного")],
    tabs=["Кампании", "Таргетинг", "Тексты", "Изображения"],
    kpis=[("Кампаний", "6"), ("Активных", "3"), ("Языков", "3")],
  ),
)

P[107] = dict(
  ru=dict(
    intro=[
      "Стандартные опции OpenCart умеют только прибавлять или вычитать: «+500» к цене товара, «−100» от неё. Когда у каждого варианта своя готовая цена, приходится пересчитывать разницу в уме и держать её в справочнике. Option Price Equal Prefix PRO добавляет рядом с плюсом и минусом третий знак — «=».",
      "Значение опции с «=» не добавляется к базовой цене, а заменяет её. В поле достаточно ввести ту сумму, которую покупатель должен увидеть как цену выбранного варианта."
    ],
    sections=[
      dict(h="＝ Как работает третий префикс", p=[
        "В форме товара у каждого значения опции появляется выбор префикса: «+», «−» или «=». Если выбрать «=» и записать, скажем, 4200, то после выбора этого значения цена товара становится 4200, независимо от того, что было указано в базовой цене.",
        "Выглядит это так же, как и привычные опции, а вот логика расчёта уже другая: администратор вводит итог, а не разницу."]),
      dict(h="📐 Размеры, комплектации и готовые варианты", p=[
        "Модуль удобен там, где у вариантов известна итоговая стоимость: размеры одежды с разной ценой, комплектации техники, пакеты услуг. Вместо формулы «база плюс надбавка» вы просто пишете итог для каждого варианта.",
        "Особенно это заметно при смене базовой цены: итоговые суммы вариантов с «=» от неё не зависят."]),
      dict(h="🔗 Соседство с плюсом и минусом", p=[
        "Другие опции со знаками «+» и «−» продолжают работать, но теперь отсчитываются от новой базы, то есть от суммы, заданной через «=». Если покупатель выбрал вариант за 4200 и добавил опцию «+300», итог составит 4500.",
        "Пересчёт нужно проверить и в карточке товара, и в корзине: именно так удобнее убедиться, что сумма сходится."]),
      dict(h="🗃️ Данные остаются в OpenCart", p=[
        "Данные опций хранятся штатно, в стандартных таблицах OpenCart. Модуль подключается через модификаторы, поэтому при их снятии значения опций не пропадают, а префикс «=» просто перестаёт обрабатываться."]),
      dict(h="⚠️ Одна «равная» опция на группу", p=[
        "Есть важная оговорка. Если у покупателя одновременно выбрано несколько значений с «=», базой становится последнее из обработанных. Поэтому используйте «=» в одной взаимоисключающей группе опций, например в выпадающем списке размера, где выбрать можно только один пункт.",
        "Порядок установки такой: поставить модуль и обновить модификаторы, в опции товара выбрать префикс «=» с итоговой ценой и проверить пересчёт."])
    ]),
  uk=dict(
    intro=[
      "Стандартні опції OpenCart вміють лише додавати або віднімати: «+500» до ціни товару, «−100» від неї. Коли в кожного варіанта своя готова ціна, доводиться рахувати різницю подумки й тримати її в довіднику. Option Price Equal Prefix PRO додає поруч із плюсом і мінусом третій знак — «=».",
      "Значення опції з «=» не додається до базової ціни, а замінює її. У полі достатньо ввести ту суму, яку покупець має побачити як ціну обраного варіанта."
    ],
    sections=[
      dict(h="＝ Як працює третій префікс", p=[
        "У формі товару біля кожного значення опції з’являється вибір префікса: «+», «−» або «=». Якщо обрати «=» і записати, скажімо, 4200, то після вибору цього значення ціна товару стає 4200, незалежно від того, що було вказано в базовій ціні.",
        "Виглядає це так само, як і звичні опції, а ось логіка розрахунку вже інша: адміністратор вводить підсумок, а не різницю."]),
      dict(h="📐 Розміри, комплектації та готові варіанти", p=[
        "Модуль зручний там, де в варіантів відома підсумкова вартість: розміри одягу з різною ціною, комплектації техніки, пакети послуг. Замість формули «база плюс надбавка» ви просто пишете підсумок для кожного варіанта.",
        "Особливо це помітно під час зміни базової ціни: підсумкові суми варіантів із «=» від неї не залежать."]),
      dict(h="🔗 Сусідство з плюсом і мінусом", p=[
        "Інші опції зі знаками «+» і «−» продовжують працювати, але тепер відлічуються від нової бази, тобто від суми, заданої через «=». Якщо покупець обрав варіант за 4200 і додав опцію «+300», підсумок складе 4500.",
        "Перерахунок потрібно перевірити і в картці товару, і в кошику: саме так найзручніше переконатися, що сума сходиться."]),
      dict(h="🗃️ Дані залишаються в OpenCart", p=[
        "Дані опцій зберігаються штатно, у стандартних таблицях OpenCart. Модуль підключається через модифікатори, тому в разі їх зняття значення опцій не зникають, а префікс «=» просто перестає оброблятися."]),
      dict(h="⚠️ Одна «рівна» опція на групу", p=[
        "Є важливе застереження. Якщо в покупця одночасно обрано кілька значень із «=», базою стає останнє з оброблених. Тому використовуйте «=» в одній взаємовиключній групі опцій, наприклад у випадному списку розміру, де можна обрати лише один пункт.",
        "Порядок встановлення такий: поставити модуль і оновити модифікатори, в опції товару обрати префікс «=» з підсумковою ціною та перевірити перерахунок."])
    ]),
  en=dict(
    intro=[
      "Standard OpenCart options can only add or subtract: ‘+500’ to the product price, ‘−100’ from it. When every variant has its own ready price, you end up calculating the difference in your head and keeping it in a spreadsheet. Option Price Equal Prefix PRO adds a third sign next to plus and minus: ‘=’.",
      "An option value with ‘=’ is not added to the base price; it replaces it. You simply enter the amount the customer should see as the price of the chosen variant."
    ],
    sections=[
      dict(h="＝ How the third prefix works", p=[
        "In the product form, each option value gets a prefix choice: ‘+’, ‘−’ or ‘=’. Pick ‘=’ and enter, say, 4200, and once that value is selected the product price becomes 4200, regardless of what the base price says.",
        "It looks like ordinary options, but the calculation logic is different: the administrator types the final amount, not the difference."]),
      dict(h="📐 Sizes, bundles and ready-priced variants", p=[
        "The module is handy wherever the final cost of each variant is already known: clothing sizes with different prices, equipment configurations, service packages. Instead of the formula ‘base plus surcharge’ you write the final figure for each variant.",
        "This is most noticeable when the base price changes: the totals of ‘=’ variants do not depend on it."]),
      dict(h="🔗 Living alongside plus and minus", p=[
        "Other options with ‘+’ and ‘−’ keep working, but they are now counted from the new base, the amount set through ‘=’. If a customer picks the 4200 variant and adds a ‘+300’ option, the total is 4500.",
        "Check the recalculation both on the product page and in the cart; that is the easiest way to confirm the sums add up."]),
      dict(h="🗃️ Data stays in OpenCart", p=[
        "Option data is stored in the standard OpenCart way, in the regular tables. The module hooks in through modifications, so if you remove them the option values are not lost; the ‘=’ prefix simply stops being processed."]),
      dict(h="⚠️ One equal option per group", p=[
        "One important caveat. If a customer has several ‘=’ values selected at once, the last one processed becomes the base. So use ‘=’ within a single mutually exclusive option group, for example a size dropdown where only one entry can be chosen.",
        "The setup order is: install the module and refresh modifications, choose the ‘=’ prefix with the final price in the product option, and verify the recalculation."])
    ]),
  cover=dict(
    tagline="Префикс = для замены базовой цены опцией",
    items=["Третий префикс =", "Замена базовой цены", "Плюс и минус работают", "Размеры и комплекты", "Данные в OpenCart", "Проверка в корзине"],
    cards=[("Префикс =", "Рядом с плюсом и минусом в форме опции"),
           ("Итоговая цена", "Выбранное значение заменяет базу товара"),
           ("Новая база", "Опции + и − считаются уже от неё"),
           ("Готовые варианты", "Размеры, комплектации, пакеты"),
           ("Штатные данные", "Опции остаются в таблицах OpenCart"),
           ("Одна группа", "Используйте = в одном взаимоисключающем списке")],
    tabs=["Опции", "Значения", "Префиксы", "Проверка"],
    kpis=[("Опций с =", "18"), ("Товаров", "42"), ("Вариантов", "126")],
  ),
)

P[109] = dict(
  ru=dict(
    intro=[
      "К праздникам витрина обычно остаётся прежней, а переделывать из-за гирлянды всю тему никто не хочет. New Year Decor PRO добавляет сезонное оформление поверх существующего сайта: над страницей зажигаются гирлянды, а по экрану тихо падает снег.",
      "Эффекты намеренно лёгкие и изолированные. Модуль не касается товаров, корзины, цен и SEO, а когда он выключен, на страницы не подгружается ни CSS, ни JS, ни HTML. Праздник включается и выключается одним переключателем."
    ],
    sections=[
      dict(h="🎄 Две гирлянды на выбор", p=[
        "Первая — интерактивная гирлянда с игрушками: с ней можно взаимодействовать, она оживляет верх страницы. Вторая — классическая световая гирлянда из мерцающих огоньков для тех, кому нужен более сдержанный вид.",
        "Выбирайте то, что подходит стилю магазина: игрушки хорошо смотрятся в детских и подарочных каталогах, а световая нить — почти везде."]),
      dict(h="🖼️ Пять графических вариантов", p=[
        "Для графической гирлянды предусмотрено пять вариантов оформления. Все они строятся на одном бесшовном локальном WebP-тайле, то есть картинка повторяется без стыков и лежит на вашем сервере, а не подгружается со сторонних ресурсов.",
        "Такой подход экономит трафик и не делает витрину зависимой от внешних сервисов в самый загруженный сезон."]),
      dict(h="🎉 «Праздник» без ёлки", p=[
        "Есть два варианта «Праздник», в которых нет новогодней ёлки. Они сделаны для дней рождения магазина, распродаж и акций в течение года, когда нужен нарядный вид, но не новогодняя символика."]),
      dict(h="❄️ Снег на Canvas", p=[
        "Снег рисуется на Canvas и не должен утяжелять страницу. Если стандартных снежинок мало, включите режим «Своя WebP-снежинка»: загрузите прозрачное изображение, и вместо обычных хлопьев будет падать ваш логотип или любой другой символ.",
        "Гирлянду и снег можно включать отдельно или вместе — в зависимости от настроения праздничной кампании."]),
      dict(h="🛡️ Что модуль не трогает", p=[
        "Список неприкосновенного длинный: товары, оформление заказа, изображения и их кеш, SEO, цены, валюты и сами заказы остаются без изменений. Для магазина это значит, что праздничная надстройка не может испортить продажи или сломать расчёты."]),
      dict(h="🔑 Лицензия и окончание сезона", p=[
        "Чтобы запустить оформление, установите модуль и активируйте лицензию, затем выберите гирлянду и снег и включите модуль на период праздников. Без активной лицензии статус остаётся выключенным.",
        "После праздников не забудьте отключить оформление: иначе зимние эффекты останутся на сайте в июле."])
    ]),
  uk=dict(
    intro=[
      "До свят вітрина зазвичай лишається незмінною, а переробляти через гірлянду всю тему ніхто не хоче. New Year Decor PRO додає сезонне оформлення поверх наявного сайту: над сторінкою запалюються гірлянди, а екраном тихо падає сніг.",
      "Ефекти навмисно легкі й ізольовані. Модуль не зачіпає товарів, кошика, цін і SEO, а коли він вимкнений, на сторінки не підвантажується ні CSS, ні JS, ні HTML. Свято вмикається й вимикається одним перемикачем."
    ],
    sections=[
      dict(h="🎄 Дві гірлянди на вибір", p=[
        "Перша — інтерактивна гірлянда з іграшками: з нею можна взаємодіяти, вона пожвавлює верх сторінки. Друга — класична світлова гірлянда з мерехтливих вогників для тих, кому потрібен стриманіший вигляд.",
        "Обирайте те, що пасує стилю магазину: іграшки добре виглядають у дитячих і подарункових каталогах, а світлова нитка — майже скрізь."]),
      dict(h="🖼️ П’ять графічних варіантів", p=[
        "Для графічної гірлянди передбачено п’ять варіантів оформлення. Усі вони будуються на одному безшовному локальному WebP-тайлі, тобто картинка повторюється без швів і лежить на вашому сервері, а не підвантажується зі сторонніх ресурсів.",
        "Такий підхід заощаджує трафік і не робить вітрину залежною від зовнішніх сервісів у найзавантаженіший сезон."]),
      dict(h="🎉 «Свято» без ялинки", p=[
        "Є два варіанти «Свято», у яких немає новорічної ялинки. Вони зроблені для днів народження магазину, розпродажів і акцій упродовж року, коли потрібен святковий вигляд, але не новорічна символіка."]),
      dict(h="❄️ Сніг на Canvas", p=[
        "Сніг малюється на Canvas і не повинен обтяжувати сторінку. Якщо стандартних сніжинок замало, ввімкніть режим «Своя WebP-сніжинка»: завантажте прозоре зображення, і замість звичайних пластівців падатиме ваш логотип чи будь-який інший символ.",
        "Гірлянду й сніг можна вмикати окремо або разом — залежно від настрою святкової кампанії."]),
      dict(h="🛡️ Чого модуль не чіпає", p=[
        "Список недоторканого довгий: товари, оформлення замовлення, зображення та їхній кеш, SEO, ціни, валюти й самі замовлення лишаються без змін. Для магазину це означає, що святкова надбудова не може зіпсувати продажі чи зламати розрахунки."]),
      dict(h="🔑 Ліцензія і завершення сезону", p=[
        "Щоб запустити оформлення, встановіть модуль і активуйте ліцензію, потім оберіть гірлянду та сніг і ввімкніть модуль на період свят. Без активної ліцензії статус лишається вимкненим.",
        "Після свят не забудьте вимкнути оформлення: інакше зимові ефекти залишаться на сайті й у липні."])
    ]),
  en=dict(
    intro=[
      "For the holidays the storefront usually stays as it is, and nobody wants to redo the whole theme for the sake of a garland. New Year Decor PRO adds seasonal decoration on top of the existing site: garlands light up across the page while snow quietly drifts down the screen.",
      "The effects are deliberately light and self-contained. The module does not touch products, the cart, prices or SEO, and when it is off, no CSS, JS or HTML is loaded onto the pages. The holiday mood is switched on and off with a single toggle."
    ],
    sections=[
      dict(h="🎄 Two garlands to choose from", p=[
        "The first is an interactive garland with ornaments: you can interact with it, and it brings the top of the page to life. The second is a classic string-light garland of twinkling bulbs for those who prefer a more restrained look.",
        "Pick whichever fits the store style: ornaments suit children's and gift catalogs, while a string of lights works almost anywhere."]),
      dict(h="🖼️ Five graphic variants", p=[
        "The graphic garland comes in five variants. All are built from one seamless local WebP tile, so the picture repeats without visible joins and lives on your own server rather than being fetched from third-party resources.",
        "This saves traffic and keeps the storefront independent of outside services during the busiest season."]),
      dict(h="🎉 Celebration, no tree", p=[
        "There are two ‘Celebration’ variants without a Christmas tree. They are meant for store anniversaries, sales and promotions throughout the year, when you want a festive look without New Year symbolism."]),
      dict(h="❄️ Snow on Canvas", p=[
        "Snow is drawn on a Canvas element and is designed not to weigh the page down. If the standard flakes are not enough, switch on the ‘custom WebP snowflake’ mode: upload a transparent image and your logo or any other symbol falls instead of ordinary flakes.",
        "The garland and snow can run separately or together, depending on the mood of the holiday campaign."]),
      dict(h="🛡️ What the module leaves alone", p=[
        "The list of untouched things is long: products, checkout, images and the image cache, SEO, prices, currencies and the orders themselves stay unchanged. For a store this means the holiday layer cannot spoil sales or break calculations."]),
      dict(h="🔑 License and the end of the season", p=[
        "To launch the decoration, install the module and activate the license, then choose the garland and snow and enable the module for the holiday period. Without an active license the status stays off.",
        "After the holidays, remember to turn the decoration off; otherwise the winter effects will still be on the site in July."])
    ]),
  cover=dict(
    tagline="Гирлянды и снег для праздничной витрины",
    items=["Интерактивная гирлянда", "Световая гирлянда", "Пять вариантов гирлянды", "Режим Праздник", "Снег на Canvas", "Своя снежинка WebP"],
    cards=[("Две гирлянды", "С игрушками или классическая световая"),
           ("Локальный WebP", "Бесшовный тайл лежит на вашем сервере"),
           ("Без ёлки", "Два варианта Праздник для акций и дней рождения"),
           ("Лёгкий снег", "Рисуется на Canvas, есть своя снежинка"),
           ("Не трогает продажи", "Товары, цены, заказы и SEO без изменений"),
           ("Чистое выключение", "При OFF не грузятся CSS, JS и HTML")],
    tabs=["Общие", "Гирлянда", "Снег", "Лицензия"],
    kpis=[("Гирлянда", "Включена"), ("Снег", "Canvas"), ("Вариантов", "5")],
  ),
)

P[110] = dict(
  ru=dict(
    intro=[
      "Сторонний модуль для магазина — это чужой код, который вы собираетесь запустить на рабочем сайте с базой клиентов и заказов. Module Preflight PRO даёт возможность посмотреть на него заранее: это portable-программа для Windows, проверяющая ZIP-архив модуля OpenCart или ocStore до установки.",
      "Принцип работы строится на осторожности. Проверяемый код никогда не выполняется, а исходный архив остаётся нетронутым, и программа это подтверждает: SHA-256 архива сравнивается до и после проверки."
    ],
    sections=[
      dict(h="💾 Запустил и проверил: без установки", p=[
        "Это portable-версия, поэтому ничего устанавливать не нужно: запускаете программу, перетаскиваете в окно архив с модулем, и анализ начинается. Подходят обычные ZIP и пакеты .ocmod.zip.",
        "Сайт, сервер и база данных не участвуют — всё происходит на вашем компьютере, ещё до того как модуль окажется рядом с магазином."]),
      dict(h="🔒 Read-only и контроль целостности", p=[
        "Архив открывается только на чтение. Чтобы не оставалось сомнений, что проверка ничего не подменила, программа считает SHA-256 архива до анализа и после него и сравнивает значения.",
        "Код модуля при этом не запускается ни в каком виде: анализ статический, то есть программа читает файлы, а не исполняет их."]),
      dict(h="🕵️ Что ищет статический аудит безопасности", p=[
        "Аудит ищет признаки, по которым в чужом коде обычно прячутся проблемы:"],
        ul=["опасные вызовы функций", "паттерны web-shell", "tainted-потоки данных", "remote include", "разрушительные операции"]),
      dict(h="🧠 Динамический SQL без паники", p=[
        "Многие сканеры считают ошибкой любой SQL-запрос, в котором имя таблицы или колонки собирается на лету. Preflight так не делает: динамические SQL-идентификаторы оцениваются по taint и white-list. Если имя собрано из проверенного списка, это не повод для тревоги, а если в него попадают пользовательские данные, отчёт отметит риск.",
        "Это уменьшает число ложных срабатываний, и в отчёте остаётся то, на что действительно стоит посмотреть."]),
      dict(h="🧪 PHP lint без установки PHP", p=[
        "Встроен portable PHP lint для версий 7.4 и 8.1–8.5. Он проверяет синтаксис файлов модуля под разные версии языка, и вы заранее видите, не споткнётся ли модуль на PHP вашего хостинга.",
        "Дополнительно, только для сведения, показывается статус стороннего антивируса из Windows Security Center."]),
      dict(h="📋 Отчёт — повод для решения, а не гарантия", p=[
        "После проверки вы изучаете отчёт и сами решаете, ставить ли модуль. Важно помнить, что это статический анализ: он снижает риск, но не заменяет резервную копию и проверку на тестовой копии сайта."])
    ]),
  uk=dict(
    intro=[
      "Сторонній модуль для магазину — це чужий код, який ви збираєтеся запустити на робочому сайті з базою клієнтів і замовлень. Module Preflight PRO дає змогу подивитися на нього заздалегідь: це portable-програма для Windows, що перевіряє ZIP-архів модуля OpenCart чи ocStore до встановлення.",
      "Принцип роботи побудований на обережності. Код, що перевіряється, ніколи не виконується, а вихідний архів лишається недоторканим, і програма це підтверджує: SHA-256 архіву порівнюється до та після перевірки."
    ],
    sections=[
      dict(h="💾 Запустив і перевірив: без встановлення", p=[
        "Це portable-версія, тож нічого встановлювати не потрібно: запускаєте програму, перетягуєте у вікно архів із модулем, і аналіз починається. Підходять звичайні ZIP та пакети .ocmod.zip.",
        "Сайт, сервер і база даних не беруть участі — усе відбувається на вашому комп’ютері, ще до того, як модуль опиниться поруч із магазином."]),
      dict(h="🔒 Read-only і контроль цілісності", p=[
        "Архів відкривається лише на читання. Щоб не лишалося сумнівів, що перевірка нічого не підмінила, програма рахує SHA-256 архіву до аналізу й після нього та порівнює значення.",
        "Код модуля при цьому не запускається в жодному вигляді: аналіз статичний, тобто програма читає файли, а не виконує їх."]),
      dict(h="🕵️ Що шукає статичний аудит безпеки", p=[
        "Аудит шукає ознаки, за якими в чужому коді зазвичай ховаються проблеми:"],
        ul=["небезпечні виклики функцій", "патерни web-shell", "tainted-потоки даних", "remote include", "руйнівні операції"]),
      dict(h="🧠 Динамічний SQL без паніки", p=[
        "Багато сканерів вважають помилкою будь-який SQL-запит, у якому назва таблиці чи колонки збирається на льоту. Preflight так не робить: динамічні SQL-ідентифікатори оцінюються за taint і white-list. Якщо ім’я зібране з перевіреного списку, це не привід для тривоги, а якщо в нього потрапляють дані користувача, звіт позначить ризик.",
        "Це зменшує кількість хибних спрацювань, і у звіті лишається те, на що справді варто глянути."]),
      dict(h="🧪 PHP lint без встановлення PHP", p=[
        "Вбудовано portable PHP lint для версій 7.4 та 8.1–8.5. Він перевіряє синтаксис файлів модуля під різні версії мови, і ви заздалегідь бачите, чи не спіткнеться модуль на PHP вашого хостингу.",
        "Додатково, лише для відомості, показується статус стороннього антивіруса з Windows Security Center."]),
      dict(h="📋 Звіт — привід для рішення, а не гарантія", p=[
        "Після перевірки ви вивчаєте звіт і самі вирішуєте, чи ставити модуль. Важливо пам’ятати, що це статичний аналіз: він знижує ризик, але не замінює резервну копію та перевірку на тестовій копії сайту."])
    ]),
  en=dict(
    intro=[
      "A third-party module is someone else's code that you are about to run on a live site holding customers and orders. Module Preflight PRO lets you look at it first: it is a portable Windows program that checks an OpenCart or ocStore module ZIP before installation.",
      "Its approach is built on caution. The inspected code is never executed and the source archive is left untouched, and the program proves it: the archive SHA-256 is compared before and after the check."
    ],
    sections=[
      dict(h="💾 Run and inspect: no installation", p=[
        "This is a portable build, so there is nothing to install: start the program, drop the module archive into the window and the analysis begins. Ordinary ZIP files and .ocmod.zip packages are both accepted.",
        "Your site, server and database are not involved at all; everything happens on your own computer, before the module gets anywhere near the store."]),
      dict(h="🔒 Read-only with an integrity check", p=[
        "The archive is opened for reading only. To remove any doubt that the check replaced something, the program computes the archive SHA-256 before the analysis and after it, then compares the two.",
        "The module code is not run in any form: the analysis is static, meaning the program reads the files rather than executing them."]),
      dict(h="🕵️ What the static security audit looks for", p=[
        "The audit looks for the signs under which problems usually hide in someone else's code:"],
        ul=["dangerous function calls", "web-shell patterns", "tainted data flows", "remote include", "destructive operations"]),
      dict(h="🧠 Dynamic SQL without the panic", p=[
        "Many scanners treat any SQL query whose table or column name is assembled on the fly as an error. Preflight does not: dynamic SQL identifiers are judged by taint and whitelist. A name built from a vetted list is no cause for alarm, while one that takes in user data will be flagged in the report.",
        "This reduces false alarms, so the report keeps what is genuinely worth a look."]),
      dict(h="🧪 PHP lint without installing PHP", p=[
        "A portable PHP lint is built in for versions 7.4 and 8.1 to 8.5. It checks the syntax of the module files against different language versions, so you can see in advance whether the module will stumble on your hosting PHP.",
        "For information only, the status of a third-party antivirus from Windows Security Center is also shown."]),
      dict(h="📋 A report to decide with, not a guarantee", p=[
        "After the check you read the report and decide for yourself whether to install the module. Remember that this is static analysis: it lowers risk but does not replace a backup and a test on a staging copy of the site."])
    ]),
  cover=dict(
    tagline="Проверка ZIP модуля до установки на сайт",
    items=["Portable для Windows", "Код не выполняется", "SHA-256 до и после", "Аудит безопасности", "Анализ taint и SQL", "PHP lint 7.4–8.5"],
    cards=[("Без установки", "Запустил программу и перетащил ZIP"),
           ("Read-only", "Исходный архив не изменяется"),
           ("Хеш SHA-256", "Сравнение до и после проверки"),
           ("Опасные паттерны", "web-shell, remote include, destructive"),
           ("Умный SQL", "Идентификаторы оцениваются по taint и whitelist"),
           ("PHP lint", "Синтаксис для PHP 7.4 и 8.1–8.5")],
    tabs=["Архив", "Безопасность", "PHP lint", "Отчёт"],
    kpis=[("Файлов", "184"), ("Критичных", "0"), ("Замечаний", "7")],
  ),
)

P[111] = dict(
  ru=dict(
    intro=[
      "Google Merchant Center быстро замечает, когда в фиде что-то не так: идентификатор выдуман, картинка в неподдерживаемом формате, категория не сопоставлена. Merchant Feed Simple XML PRO формирует управляемый XML-фид из реальных данных магазина — цен, наличия, категорий, идентификаторов и изображений.",
      "Задача модуля шире, чем просто выгрузить XML. Он старается не передавать Google выдуманные идентификаторы и некорректные данные, а то, чего в карточке нет, не появляется и в фиде."
    ],
    sections=[
      dict(h="🔗 Отдельный адрес фида", p=[
        "Модуль создаёт отдельный feed-маршрут, который отдаёт готовый XML для Merchant Center. Этот адрес вы просто добавляете в настройках фида в Google, и дальше Merchant сам забирает данные.",
        "Фид строится на лету из данных витрины, поэтому он отражает актуальные цены и наличие, а не залежавшуюся выгрузку."]),
      dict(h="🗂️ Категории Google и product_type", p=[
        "В форме категории магазина появляется поле Google Product Category, куда вносится числовой ID категории Google. Из него формируется соответствующий атрибут фида.",
        "Отдельно из пути категории в магазине собирается product_type, так что структура каталога передаётся Google в том виде, в котором её видит покупатель."]),
      dict(h="🖼️ Изображения: безопасная логика только для фида", p=[
        "Для Merchant сделана отдельная безопасная логика работы с картинками, которая не влияет на витрину: то, как фото обработаны для Google, не меняет, как они показываются посетителям.",
        "Формат AVIF из фида исключён, потому что Google его не принимает. Поддерживаются JPEG, WebP, PNG, GIF, BMP и TIFF. Маленькие оригиналы искусственно не увеличиваются, чтобы не получить размытую картинку."]),
      dict(h="🩺 Окно диагностики", p=[
        "Прежде чем отправлять фид в Google, его можно разобрать по полочкам в окне диагностики. Для каждого товара видны ID в фиде, model, SKU, название, бренд, количество, категории и Google Product Category ID, а рядом находятся быстрые ссылки на нужные страницы.",
        "Так легко найти товары, у которых не заполнено что-то важное, не дожидаясь отклонений в Merchant Center."]),
      dict(h="🚀 Порядок запуска", p=[
        "Сначала заполните Google Product Category ID в категориях, затем откройте адрес фида и просмотрите диагностику, и только после этого добавьте фид в Merchant Center."],
        ul=["Заполнить Google Product Category ID", "Проверить диагностику", "Добавить адрес фида в Merchant Center"]),
      dict(h="⚠️ Данные должны быть настоящими", p=[
        "Google рекомендует исходные фото не менее 500×500 пикселей, и это требование вступает в силу 31.01.2027. Идентификаторы тоже нужно заполнять реальными данными: модуль их не придумывает, и это его преимущество, а не недостаток."])
    ]),
  uk=dict(
    intro=[
      "Google Merchant Center швидко помічає, коли у фіді щось не так: ідентифікатор вигаданий, картинка в непідтримуваному форматі, категорія не зіставлена. Merchant Feed Simple XML PRO формує кероване XML-фід з реальних даних магазину — цін, наявності, категорій, ідентифікаторів і зображень.",
      "Завдання модуля ширше, ніж просто вивантажити XML. Він намагається не передавати Google вигаданих ідентифікаторів і некоректних даних, а чого в картці немає, того не з’являється і у фіді."
    ],
    sections=[
      dict(h="🔗 Окрема адреса фіда", p=[
        "Модуль створює окремий feed-маршрут, який віддає готовий XML для Merchant Center. Цю адресу ви просто додаєте в налаштуваннях фіда в Google, і далі Merchant сам забирає дані.",
        "Фід будується на льоту з даних вітрини, тому він відображає актуальні ціни й наявність, а не застарілу вивантажку."]),
      dict(h="🗂️ Категорії Google і product_type", p=[
        "У формі категорії магазину з’являється поле Google Product Category, куди вноситься числовий ID категорії Google. З нього формується відповідний атрибут фіда.",
        "Окремо зі шляху категорії в магазині збирається product_type, тож структура каталогу передається Google у тому вигляді, в якому її бачить покупець."]),
      dict(h="🖼️ Зображення: безпечна логіка лише для фіда", p=[
        "Для Merchant зроблено окрему безпечну логіку роботи із зображеннями, яка не впливає на вітрину: те, як фото оброблені для Google, не змінює, як вони показуються відвідувачам.",
        "Формат AVIF із фіда виключено, бо Google його не приймає. Підтримуються JPEG, WebP, PNG, GIF, BMP і TIFF. Малі оригінали штучно не збільшуються, щоб не отримати розмиту картинку."]),
      dict(h="🩺 Вікно діагностики", p=[
        "Перш ніж надсилати фід до Google, його можна розібрати по поличках у вікні діагностики. Для кожного товару видно ID у фіді, model, SKU, назву, бренд, кількість, категорії та Google Product Category ID, а поруч містяться швидкі посилання на потрібні сторінки.",
        "Так легко знайти товари, в яких не заповнено щось важливе, не чекаючи відхилень у Merchant Center."]),
      dict(h="🚀 Порядок запуску", p=[
        "Спершу заповніть Google Product Category ID у категоріях, потім відкрийте адресу фіда й перегляньте діагностику, і лише після цього додайте фід до Merchant Center."],
        ul=["Заповнити Google Product Category ID", "Перевірити діагностику", "Додати адресу фіда до Merchant Center"]),
      dict(h="⚠️ Дані мають бути справжніми", p=[
        "Google рекомендує вихідні фото не менше ніж 500×500 пікселів, і ця вимога набуває чинності 31.01.2027. Ідентифікатори теж потрібно заповнювати реальними даними: модуль їх не вигадує, і це його перевага, а не недолік."])
    ]),
  en=dict(
    intro=[
      "Google Merchant Center quickly notices when something in a feed is off: an invented identifier, an image in an unsupported format, an unmapped category. Merchant Feed Simple XML PRO builds a managed XML feed from the real data in your store: prices, stock, categories, identifiers and images.",
      "The module's job is wider than just dumping XML. It tries not to pass Google invented identifiers or incorrect data, and what a product card lacks does not show up in the feed either."
    ],
    sections=[
      dict(h="🔗 A dedicated feed address", p=[
        "The module creates a separate feed route that serves ready XML for Merchant Center. You add that address in the feed settings on the Google side, and Merchant fetches the data from there.",
        "The feed is built on the fly from storefront data, so it reflects current prices and stock rather than a stale export."]),
      dict(h="🗂️ Google categories and product_type", p=[
        "The store category form gains a Google Product Category field where you enter the numeric Google category ID. The matching feed attribute is built from it.",
        "Separately, product_type is assembled from the category path in your store, so the catalog structure reaches Google as your shoppers see it."]),
      dict(h="🖼️ Images: safe handling for the feed only", p=[
        "Merchant gets its own safe image logic that does not affect the storefront: how photos are processed for Google does not change how they are shown to visitors.",
        "AVIF is excluded from the feed because Google does not accept it. JPEG, WebP, PNG, GIF, BMP and TIFF are supported. Small originals are not artificially enlarged, so you do not end up with a blurry picture."]),
      dict(h="🩺 The diagnostics window", p=[
        "Before sending the feed to Google you can go through it item by item in the diagnostics window. For each product you see the feed ID, model, SKU, name, brand, quantity, categories and the Google Product Category ID, with quick links to the relevant pages alongside.",
        "It makes it easy to find products with something important missing, without waiting for rejections in Merchant Center."]),
      dict(h="🚀 Launch order", p=[
        "First fill in the Google Product Category ID in your categories, then open the feed address and review the diagnostics, and only after that add the feed to Merchant Center."],
        ul=["Fill in the Google Product Category ID", "Review the diagnostics", "Add the feed address to Merchant Center"]),
      dict(h="⚠️ The data has to be real", p=[
        "Google recommends source photos of at least 500×500 pixels, a requirement that takes effect on 31.01.2027. Identifiers likewise must be filled with real data: the module does not make them up, which is its strength rather than a flaw."])
    ]),
  cover=dict(
    tagline="XML-фид Google Merchant из реальных данных",
    items=["Готовый XML-фид", "Google Product Category", "product_type из пути", "Безопасные изображения", "Без AVIF в фиде", "Окно диагностики"],
    cards=[("Отдельный маршрут", "Адрес фида для Merchant Center"),
           ("ID категории Google", "Поле в категории магазина"),
           ("product_type", "Собирается из пути категории"),
           ("Картинки для Merchant", "Не влияют на изображения витрины"),
           ("Форматы", "JPEG, WebP, PNG, GIF, BMP, TIFF"),
           ("Диагностика", "ID, model, SKU, бренд, количество")],
    tabs=["Фид", "Категории", "Изображения", "Диагностика"],
    kpis=[("Товаров", "1 482"), ("С категорией", "1 390"), ("Без фото", "6")],
  ),
)

P[129] = dict(
  ru=dict(
    intro=[
      "Если курсы валют в магазине вносятся вручную, рано или поздно наступает день, когда цена в гривнах или злотых отстаёт от рынка. Currency Rates PRO берёт эту рутину на себя и обновляет стандартную таблицу валют OpenCart или ocStore по данным официальных источников.",
      "Новой системы цен при этом не появляется. Магазин считает так же, как раньше, а модуль только вовремя приносит свежие числа в привычную таблицу. Цены товаров, заказов, налогов, оплаты и доставки он не изменяет."
    ],
    sections=[
      dict(h="🏦 Пять официальных источников", p=[
        "Курсы можно получать из ECB, НБУ, ЦБ РФ, NBP и PrivatBank. Можно указать и собственный URL, но только официальный HTTPS-хост: локальные адреса, частные и зарезервированные IP, учётные данные в ссылке и нестандартные порты блокируются.",
        "Это защита от ситуации, когда в настройки кто-то случайно или намеренно вписывает адрес внутренней сети."]),
      dict(h="👀 Предпросмотр перед записью", p=[
        "Ручное обновление начинается с предпросмотра. Вы видите, какие курсы изменятся и на сколько, и только потом подтверждаете запись. Это удобный способ первый раз убедиться, что выбранный источник даёт то, что вы ожидаете."]),
      dict(h="🛟 Если что-то пошло не так", p=[
        "Модуль проверяет возраст данных и максимально допустимое изменение курса. Если источник недоступен, ответ повреждён, дата слишком старая или скачок превышает порог, остаётся прежний курс, и витрина не получает случайных чисел.",
        "Параллельные обновления блокируются MySQL-блокировкой, поэтому два запуска сразу не перезапишут друг друга."]),
      dict(h="➗ Наценка и выбор валют", p=[
        "Для каждой валюты можно задать индивидуальную процентную коррекцию, например запас на банковскую маржу. Обновляются только включённые валюты. Популярные валюты можно добавить в список, но они добавляются выключенными, чтобы временное значение 1.0 не попало на витрину до первого успешного обновления.",
        "Курс основной валюты магазина всегда равен единице."]),
      dict(h="⏰ Cron и журнал", p=[
        "Автоматическое обновление запускается защищённым cron с секретным ключом, и в документации есть пример для Mirohost. Журнал разбит на страницы и содержит диагностику источников, а размер журнала безопасно ограничен.",
        "В порядок запуска входит выбор источника и валют, просмотр предпросмотра и порогов, включение модуля и добавление cron на удобное время."]),
      dict(h="🧮 Что модуль не делает", p=[
        "После установки модуль выключен и не обращается к внешним API. Цены товаров он не пересчитывает: для товаров, у которых цена задана в исходной валюте, нужен Product Currency Input PRO.",
        "Есть и необязательная опция «Не показывать копейки, если они равны 00». Она меняет только итоговую строку цены на витрине: 1000.50 остаётся 1000.50, а расчёты, корзина и заказы не затрагиваются."])
    ]),
  uk=dict(
    intro=[
      "Якщо курси валют у магазині вносяться вручну, рано чи пізно настає день, коли ціна в гривнях чи злотих відстає від ринку. Currency Rates PRO бере цю рутину на себе й оновлює стандартну таблицю валют OpenCart чи ocStore за даними офіційних джерел.",
      "Нової системи цін при цьому не з’являється. Магазин рахує так само, як раніше, а модуль лише вчасно приносить свіжі числа до звичної таблиці. Ціни товарів, замовлень, податків, оплати та доставки він не змінює."
    ],
    sections=[
      dict(h="🏦 П’ять офіційних джерел", p=[
        "Курси можна отримувати з ECB, НБУ, ЦБ РФ, NBP та PrivatBank. Можна вказати й власний URL, але лише офіційний HTTPS-хост: локальні адреси, приватні й зарезервовані IP, облікові дані в посиланні та нестандартні порти блокуються.",
        "Це захист від ситуації, коли в налаштування хтось випадково або навмисно вписує адресу внутрішньої мережі."]),
      dict(h="👀 Попередній перегляд перед записом", p=[
        "Ручне оновлення починається з попереднього перегляду. Ви бачите, які курси зміняться і наскільки, і лише потім підтверджуєте запис. Це зручний спосіб уперше переконатися, що обране джерело дає те, чого ви чекаєте."]),
      dict(h="🛟 Якщо щось пішло не так", p=[
        "Модуль перевіряє вік даних і максимально допустиму зміну курсу. Якщо джерело недоступне, відповідь пошкоджена, дата надто стара або стрибок перевищує поріг, лишається попередній курс, і вітрина не отримує випадкових чисел.",
        "Паралельні оновлення блокуються MySQL-блокуванням, тож два запуски одразу не перезапишуть один одного."]),
      dict(h="➗ Націнка і вибір валют", p=[
        "Для кожної валюти можна задати індивідуальну відсоткову корекцію, наприклад запас на банківську маржу. Оновлюються лише ввімкнені валюти. Популярні валюти можна додати до списку, але вони додаються вимкненими, щоб тимчасове значення 1.0 не потрапило на вітрину до першого успішного оновлення.",
        "Курс основної валюти магазину завжди дорівнює одиниці."]),
      dict(h="⏰ Cron і журнал", p=[
        "Автоматичне оновлення запускається захищеним cron із секретним ключем, і в документації є приклад для Mirohost. Журнал розбито на сторінки, він містить діагностику джерел, а розмір журналу безпечно обмежений.",
        "У порядок запуску входить вибір джерела й валют, перегляд попереднього перегляду та порогів, вмикання модуля й додавання cron на зручний час."]),
      dict(h="🧮 Чого модуль не робить", p=[
        "Після встановлення модуль вимкнений і не звертається до зовнішніх API. Ціни товарів він не перераховує: для товарів, у яких ціну задано у вихідній валюті, потрібен Product Currency Input PRO.",
        "Є й необов’язкова опція «Не показувати копійки, якщо вони дорівнюють 00». Вона змінює лише підсумковий рядок ціни на вітрині: 1000.50 лишається 1000.50, а розрахунки, кошик і замовлення не зачіпаються."])
    ]),
  en=dict(
    intro=[
      "When currency rates in a store are typed in by hand, sooner or later comes the day when the price in hryvnia or zloty lags behind the market. Currency Rates PRO takes over that routine and updates the standard OpenCart or ocStore currency table from official sources.",
      "No new pricing system appears as a result. The store calculates just as before, and the module merely brings fresh numbers to the familiar table on time. It does not change product, order, tax, payment or shipping prices."
    ],
    sections=[
      dict(h="🏦 Five official sources", p=[
        "Rates can be fetched from ECB, the National Bank of Ukraine, the Central Bank of Russia, NBP and PrivatBank. You can specify a custom URL too, but only an official HTTPS host: local addresses, private and reserved IPs, credentials in the link and non-standard ports are blocked.",
        "This protects against someone, by accident or on purpose, entering an internal network address in the settings."]),
      dict(h="👀 Preview before anything is written", p=[
        "A manual update starts with a preview. You see which rates will change and by how much, and only then confirm the write. It is a convenient way to check, the first time, that the chosen source returns what you expect."]),
      dict(h="🛟 When something goes wrong", p=[
        "The module checks the age of the data and the maximum allowed rate change. If the source is unreachable, the response is damaged, the date is too old or the jump exceeds the threshold, the previous rate is kept and the storefront never receives random numbers.",
        "Parallel updates are blocked with a MySQL lock, so two runs at once cannot overwrite each other."]),
      dict(h="➗ Markup and choice of currencies", p=[
        "Each currency can have its own percentage adjustment, for example a cushion for the bank margin. Only enabled currencies are updated. Popular currencies can be added to the list, but they are added switched off, so that the temporary value of 1.0 never reaches the storefront before the first successful update.",
        "The store main currency rate is always exactly one."]),
      dict(h="⏰ Cron and the log", p=[
        "Automatic updates run through a protected cron with a secret key, and the documentation includes an example for Mirohost. The log is paginated and carries source diagnostics, and its size is safely capped.",
        "The launch sequence is to choose the source and currencies, review the preview and thresholds, enable the module and add the cron at a convenient time."]),
      dict(h="🧮 What the module does not do", p=[
        "After installation the module is off and makes no calls to external APIs. It does not recalculate product prices: for products priced in a source currency you need Product Currency Input PRO.",
        "There is also an optional setting to hide the cents when they equal 00. It changes only the final price string on the storefront: 1000.50 stays 1000.50, and calculations, the cart and orders are not affected."])
    ]),
  cover=dict(
    tagline="Автообновление курсов в таблице валют",
    items=["Пять источников", "Предпросмотр курсов", "Защита от скачков", "Наценка по валюте", "Защищённый cron", "Журнал и диагностика"],
    cards=[("Источники", "ECB, НБУ, ЦБ РФ, NBP, PrivatBank"),
           ("Предпросмотр", "Видно, какие курсы изменятся до записи"),
           ("Пороги", "Возраст данных и макс. изменение курса"),
           ("Наценка", "Индивидуальная коррекция в процентах"),
           ("Cron с ключом", "Блокировка параллельных запусков"),
           ("Без копеек .00", "Меняется только строка цены на витрине")],
    tabs=["Источники", "Валюты", "Cron", "Журнал"],
    kpis=[("Валют", "4"), ("Обновлено", "08:15"), ("Порог", "5%")],
  ),
)

P[130] = dict(
  ru=dict(
    intro=[
      "Ускорять базу «на глаз» опасно: лишний индекс замедляет запись, а ALTER TABLE на огромной таблице может надолго заблокировать магазин. Database Index Optimizer PRO анализирует индексы MySQL и MariaDB и создаёт только те проверенные индексы, которые вы выбрали сами.",
      "Никакой автомагии здесь нет: есть сканирование, понятный отчёт, постоянная очередь заданий, откат и контроль размера таблиц. Модуль не заявляет, что заменяет профессиональный разбор всех запросов, и для нестандартных случаев по-прежнему нужны EXPLAIN и проверка на копии."
    ],
    sections=[
      dict(h="🔍 Сканирование и отчёт", p=[
        "Сканер просматривает таблицы, колонки, индексы, движки, кодировки и первичные ключи, затем сравнивает их с ограниченным белым списком обоснованных рекомендаций для стандартных связей OpenCart. Отсутствующие индексы выделены, а карточки результата работают как быстрые фильтры по статусу и источнику.",
        "Чужие потенциально перекрывающиеся индексы только показываются в отчёте. Модуль их не удаляет."]),
      dict(h="📬 Очередь: создание только по выбору", p=[
        "Индекс появляется не потому, что модуль так решил, а потому что вы отметили его и поставили в очередь. Очередь постоянная: каждый ALTER TABLE, ANALYZE или OPTIMIZE выполняется отдельным шагом, задачу можно остановить и затем продолжить.",
        "Не допускается одновременный запуск двух тяжёлых задач, а для таблиц выше сохранённого безопасного лимита размера ADD INDEX не запускается вообще."]),
      dict(h="↩️ Откат без разрушения чужого", p=[
        "Для каждого созданного индекса модуль хранит запись с HMAC-подписью определения. При откате удаляется только индекс, созданный самим модулем, и только если подпись и фактическое определение индекса полностью совпадают. Чужие индексы под откат не попадают."]),
      dict(h="🧩 Собственные профили индексов", p=[
        "Встроенный список консервативен и не гадает про сторонние таблицы. Для своих и чужих модулей предусмотрены проверенные JSON-профили без произвольного SQL, а во вкладке профилей есть конструктор собственного индекса:"],
        ul=["таблица без DB_PREFIX и имя ccp_*", "колонки, приоритет и риск", "минимальное число строк и причина"]),
      dict(h="📈 Вкладка «Продуктивность»", p=[
        "Эта вкладка запускается только вручную. Она показывает данные Performance Schema, горячие таблицы, рост таблиц и состояние сервера: uptime, нагрузку SQL в секунду, медленные запросы в час и сутки. Для детальной аналитики Performance Schema должна быть включена на сервере.",
        "Модуль сам не включает ни Performance Schema, ни slow query log и не правит my.cnf."]),
      dict(h="🛑 Выключен по умолчанию", p=[
        "После установки модуль выключен. В режиме OFF не выполняются сканирование, очередь, ALTER, ANALYZE, OPTIMIZE и cron. Операция OPTIMIZE дополнительно выключена по умолчанию и требует отдельного разрешения и лимита размера.",
        "Перед любой работой с индексами нужна полная резервная копия файлов и базы данных."])
    ]),
  uk=dict(
    intro=[
      "Прискорювати базу «на око» небезпечно: зайвий індекс уповільнює запис, а ALTER TABLE на величезній таблиці може надовго заблокувати магазин. Database Index Optimizer PRO аналізує індекси MySQL і MariaDB та створює лише ті перевірені індекси, які ви обрали самі.",
      "Жодної автомагії тут немає: є сканування, зрозумілий звіт, постійна черга завдань, відкат і контроль розміру таблиць. Модуль не заявляє, що замінює професійний розбір усіх запитів, і для нестандартних випадків і далі потрібні EXPLAIN та перевірка на копії."
    ],
    sections=[
      dict(h="🔍 Сканування й звіт", p=[
        "Сканер переглядає таблиці, колонки, індекси, рушії, кодування та первинні ключі, потім порівнює їх з обмеженим білим списком обґрунтованих рекомендацій для стандартних зв’язків OpenCart. Відсутні індекси виділено, а картки результату працюють як швидкі фільтри за статусом і джерелом.",
        "Чужі потенційно перекривні індекси лише показуються у звіті. Модуль їх не видаляє."]),
      dict(h="📬 Черга: створення лише за вибором", p=[
        "Індекс з’являється не тому, що модуль так вирішив, а тому, що ви його позначили й поставили в чергу. Черга постійна: кожен ALTER TABLE, ANALYZE чи OPTIMIZE виконується окремим кроком, завдання можна зупинити й потім продовжити.",
        "Не допускається одночасний запуск двох важких завдань, а для таблиць вище збереженого безпечного ліміту розміру ADD INDEX не запускається взагалі."]),
      dict(h="↩️ Відкат без руйнування чужого", p=[
        "Для кожного створеного індексу модуль зберігає запис із HMAC-підписом визначення. Під час відкату видаляється лише індекс, створений самим модулем, і лише якщо підпис та фактичне визначення індексу повністю збігаються. Чужі індекси під відкат не потрапляють."]),
      dict(h="🧩 Власні профілі індексів", p=[
        "Вбудований список консервативний і не вгадує щодо сторонніх таблиць. Для власних і чужих модулів передбачено перевірені JSON-профілі без довільного SQL, а у вкладці профілів є конструктор власного індексу:"],
        ul=["таблиця без DB_PREFIX та ім’я ccp_*", "колонки, пріоритет і ризик", "мінімальна кількість рядків і причина"]),
      dict(h="📈 Вкладка «Продуктивність»", p=[
        "Ця вкладка запускається лише вручну. Вона показує дані Performance Schema, гарячі таблиці, зростання таблиць і стан сервера: uptime, навантаження SQL за секунду, повільні запити за годину й добу. Для детальної аналітики Performance Schema має бути ввімкнена на сервері.",
        "Модуль сам не вмикає ні Performance Schema, ні slow query log і не править my.cnf."]),
      dict(h="🛑 Вимкнений за замовчуванням", p=[
        "Після встановлення модуль вимкнений. У режимі OFF не виконуються сканування, черга, ALTER, ANALYZE, OPTIMIZE і cron. Операція OPTIMIZE додатково вимкнена за замовчуванням і потребує окремого дозволу та ліміту розміру.",
        "Перед будь-якою роботою з індексами потрібна повна резервна копія файлів і бази даних."])
    ]),
  en=dict(
    intro=[
      "Speeding up a database by eye is risky: an extra index slows down writes, and an ALTER TABLE on a huge table can block the store for a long time. Database Index Optimizer PRO analyzes MySQL and MariaDB indexes and creates only the vetted indexes you chose yourself.",
      "There is no auto-magic here: there is a scan, a readable report, a persistent job queue, rollback and table-size control. The module does not claim to replace a professional review of all queries, and unusual cases still call for EXPLAIN and testing on a copy."
    ],
    sections=[
      dict(h="🔍 Scan and report", p=[
        "The scanner reads tables, columns, indexes, engines, character sets and primary keys, then compares them with a limited whitelist of well-founded recommendations for standard OpenCart relations. Missing indexes are highlighted, and the result cards work as quick filters by status and source.",
        "Third-party indexes that may overlap are only shown in the report. The module never deletes them."]),
      dict(h="📬 The queue: creation only by choice", p=[
        "An index appears not because the module decided so but because you ticked it and queued it. The queue is persistent: every ALTER TABLE, ANALYZE or OPTIMIZE runs as a separate step, and a job can be stopped and later resumed.",
        "Two heavy jobs cannot run at once, and ADD INDEX is not started at all for tables above the saved safe size limit."]),
      dict(h="↩️ Rollback that leaves others' work alone", p=[
        "For every index it creates, the module keeps a record carrying an HMAC signature of the definition. On rollback only an index created by the module itself is dropped, and only when the signature and the actual index definition match exactly. Foreign indexes are never part of a rollback."]),
      dict(h="🧩 Custom index profiles", p=[
        "The built-in list is conservative and does not guess about third-party tables. For your own and other modules there are vetted JSON profiles with no arbitrary SQL, and the profiles tab has a builder for a custom index:"],
        ul=["table without DB_PREFIX and a ccp_* name", "columns, priority and risk", "minimum row count and a reason"]),
      dict(h="📈 The Productivity tab", p=[
        "This tab runs only on manual request. It shows Performance Schema data, hot tables, table growth and server state: uptime, SQL load per second, slow queries per hour and per day. Detailed analytics require Performance Schema to be enabled on the server.",
        "The module itself enables neither Performance Schema nor the slow query log and does not edit my.cnf."]),
      dict(h="🛑 Off by default", p=[
        "After installation the module is off. In OFF mode there is no scanning, queue, ALTER, ANALYZE, OPTIMIZE or cron. OPTIMIZE is additionally disabled by default and needs its own permission and size limit.",
        "A full backup of files and database is required before any index work."])
    ]),
  cover=dict(
    tagline="Управляемое создание индексов базы данных",
    items=["Сканирование индексов", "Постоянная очередь", "Откат по HMAC", "Лимит размера таблиц", "Профили индексов", "Вкладка Продуктивность"],
    cards=[("Сканер", "Отсутствующие индексы выделены, есть фильтры"),
           ("Очередь", "ALTER, ANALYZE, OPTIMIZE по одному шагу"),
           ("Откат", "Удаляется только индекс, созданный модулем"),
           ("Лимит размера", "Крупные таблицы не затрагиваются"),
           ("JSON-профили", "Без произвольного SQL, свой индекс ccp_*"),
           ("Performance Schema", "Горячие таблицы, рост, медленные запросы")],
    tabs=["Сканирование", "Очередь", "Профили", "Продуктивность"],
    kpis=[("Отсутствует", "9"), ("В очереди", "3"), ("Создано", "14")],
  ),
)
