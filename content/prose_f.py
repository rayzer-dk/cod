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
