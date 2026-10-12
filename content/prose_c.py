# -*- coding: utf-8 -*-
P = {}
P[65] = dict(
  ru=dict(
    intro=[
      "В каталоге, где характеристики копились годами, одно и то же свойство нередко записано тремя способами: «Мощность», «Мощн.» и «Power». Заполнять такие карточки вручную долго, а фильтры и сравнение товаров работают хуже, чем могли бы. Attribute Manager PRO собирает характеристики в шаблоны и даёт инструменты, чтобы навести порядок в уже существующих атрибутах.",
      "Идея простая: для повторяющейся группы, например «Размеры и вес» или «Разъёмы», вы один раз создаёте шаблон. Дальше он применяется прямо в карточке товара или сразу к набору товаров. Отдельно есть менеджер самих атрибутов с поиском дублей, предпросмотром слияния и журналом, из которого изменения можно откатить.",
    ],
    sections=[
      dict(h="🧩 Шаблон вместо ручного ввода", p=[
        "Шаблон характеристик хранит набор атрибутов, которые обычно идут вместе. В форме товара появляется панель применения шаблона, и администратор выбирает один из трёх способов: добавить только недостающие атрибуты, обновить те, что уже совпадают по названию, или заменить весь набор целиком. Первый вариант безопасен для частично заполненных карточек, третий удобен, когда товар нужно привести к единому образцу.",
        "Для категорий можно задать правила шаблонов. Тогда при открытии формы товара из нужной категории подходящий шаблон подставляется автоматически, и менеджеру остаётся вписать значения."]),
      dict(h="🗂️ Менеджер атрибутов под рукой", p=[
        "Отдельный раздел показывает все группы и атрибуты списком. Названия правятся на месте, порядок меняется перетаскиванием, видимость включается и выключается переключателем. Рядом с каждым атрибутом стоит счётчик использования, поэтому сразу видно, какие записи висят без дела, а какие применяются в сотнях товаров.",
        "Создавать новые группы и атрибуты можно сразу на нескольких языках за один проход, без переключения вкладок языков для каждой записи."]),
      dict(h="🔍 Дубли и безопасное слияние", p=[
        "Модуль ищет похожие и дублирующие атрибуты и при сравнении нормализует сокращения, чтобы «мощн.» и «мощность» распознавались как одно и то же. Перед объединением открывается предпросмотр: видно, какие товары затронуты и что с ними произойдёт. Только после подтверждения записи сливаются в одну."]),
      dict(h="⚡ Массовые изменения с откатом", p=[
        "Когда править нужно сотни карточек, используется массовое изменение атрибутов товаров. Операция идёт AJAX-пакетами, поэтому не упирается во время выполнения скрипта, а перед запуском показывается предпросмотр. Каждое действие попадает в журнал, а модуль делает снимки состояния, по которым можно вернуть прежние значения."]),
      dict(h="📋 Значения, пресеты и CSV", p=[
        "Для часто повторяющихся значений можно завести пресеты, а похожие варианты записи привести к единому виду. Данные выгружаются в CSV и загружаются обратно, что удобно для правки в таблице. Все действия фиксируются в журнале."],
        ul=["Пресеты значений", "Нормализация похожих значений", "Экспорт и импорт CSV", "Журнал действий"]),
      dict(h="🛒 Витрина и режим работы", p=[
        "Блок характеристик на витрине необязателен и по умолчанию выключен, поэтому модуль ничего не меняет в карточках покупателей, пока вы сами этого не решите. После установки сам модуль тоже выключен. Данные товара сохраняются только штатной кнопкой «Сохранить» в карточке, применённый шаблон до этого момента ничего не пишет в базу."]),
    ]),
  uk=dict(
    intro=[
      "У каталозі, де характеристики накопичувалися роками, одна й та сама властивість часто записана трьома способами: «Потужність», «Потужн.» і «Power». Заповнювати такі картки вручну довго, а фільтри й порівняння товарів працюють гірше, ніж могли б. Attribute Manager PRO збирає характеристики в шаблони та дає інструменти, щоб навести лад в уже наявних атрибутах.",
      "Ідея проста: для повторюваної групи, наприклад «Розміри та вага» чи «Роз'єми», ви один раз створюєте шаблон. Далі його застосовують просто в картці товару або одразу до набору товарів. Окремо є менеджер самих атрибутів із пошуком дублів, попереднім переглядом злиття та журналом, з якого зміни можна відкотити.",
    ],
    sections=[
      dict(h="🧩 Шаблон замість ручного введення", p=[
        "Шаблон характеристик зберігає набір атрибутів, що зазвичай ідуть разом. У формі товару з'являється панель застосування шаблону, і адміністратор обирає один із трьох способів: додати лише відсутні атрибути, оновити ті, що вже збігаються за назвою, або замінити весь набір. Перший варіант безпечний для частково заповнених карток, третій зручний, коли товар треба привести до єдиного зразка.",
        "Для категорій можна задати правила шаблонів. Тоді під час відкриття форми товару з потрібної категорії відповідний шаблон підставляється автоматично, і менеджеру лишається вписати значення."]),
      dict(h="🗂️ Менеджер атрибутів під рукою", p=[
        "Окремий розділ показує всі групи й атрибути списком. Назви редагуються на місці, порядок змінюється перетягуванням, видимість вмикається перемикачем. Поруч з кожним атрибутом стоїть лічильник використання, тож одразу видно, які записи висять без діла, а які застосовано в сотнях товарів.",
        "Нові групи й атрибути можна створювати одразу кількома мовами за один прохід, не перемикаючи вкладки мов для кожного запису."]),
      dict(h="🔍 Дублі та безпечне злиття", p=[
        "Модуль шукає схожі та дублювальні атрибути й під час порівняння нормалізує скорочення, щоб «потужн.» і «потужність» розпізнавалися як одне. Перед об'єднанням відкривається попередній перегляд: видно, які товари зачеплено і що з ними станеться. Лише після підтвердження записи зливаються в один."]),
      dict(h="⚡ Масові зміни з відкатом", p=[
        "Коли правити треба сотні карток, використовують масову зміну атрибутів товарів. Операція йде AJAX-пакетами, тому не впирається в час виконання скрипта, а перед запуском показується попередній перегляд. Кожна дія потрапляє до журналу, а модуль робить знімки стану, за якими можна повернути попередні значення."]),
      dict(h="📋 Значення, пресети й CSV", p=[
        "Для значень, що часто повторюються, можна завести пресети, а схожі варіанти запису привести до єдиного вигляду. Дані вивантажуються в CSV і завантажуються назад, що зручно для правки в таблиці. Усі дії фіксуються в журналі."],
        ul=["Пресети значень", "Нормалізація схожих значень", "Експорт та імпорт CSV", "Журнал дій"]),
      dict(h="🛒 Вітрина і режим роботи", p=[
        "Блок характеристик на вітрині необов'язковий і за замовчуванням вимкнений, тому модуль нічого не змінює в картках покупців, доки ви самі цього не вирішите. Після встановлення сам модуль також вимкнений. Дані товару зберігаються лише штатною кнопкою «Зберегти» в картці, застосований шаблон до цього моменту нічого не пише в базу."]),
    ]),
  en=dict(
    intro=[
      "In a catalog where attributes have piled up over the years, the same property is often written three different ways: «Power», «Pwr.» and «Wattage». Filling in such product cards by hand is slow, and filters and product comparison work worse than they could. Attribute Manager PRO groups attributes into templates and gives you tools to clean up the ones you already have.",
      "The idea is simple. For a recurring group such as «Dimensions and weight» or «Connectors», you build a template once. It is then applied right in the product form or to a whole set of products at once. A separate attribute manager adds duplicate search, merge preview and a log from which changes can be rolled back.",
    ],
    sections=[
      dict(h="🧩 A template instead of retyping", p=[
        "An attribute template stores a set of attributes that usually travel together. The product form gets a template panel, and the administrator picks one of three ways to apply it: add only the missing attributes, update those that already match by name, or replace the whole set. The first is safe for partly filled cards, the third is handy when a product has to be brought in line with a standard sample.",
        "Template rules can be assigned to categories. When a product form from that category is opened, the matching template is filled in automatically and the manager only has to type the values."]),
      dict(h="🗂️ An attribute manager at hand", p=[
        "A dedicated screen lists every group and attribute. Names are edited in place, order is changed by dragging, and visibility is a simple switch. Each attribute carries a usage counter, so you can see at once which entries sit idle and which are used by hundreds of products.",
        "New groups and attributes can be created in several languages in a single pass, without flipping through the language tabs for every record."]),
      dict(h="🔍 Duplicates and safe merging", p=[
        "The module searches for similar and duplicate attributes and normalizes abbreviations while comparing, so that «pwr.» and «power» are recognized as the same thing. Before anything is merged, a preview shows which products are affected and what will happen to them. Only after you confirm are the records combined into one."]),
      dict(h="⚡ Bulk changes you can undo", p=[
        "When hundreds of cards need editing, the bulk attribute change comes in. It runs in AJAX batches, so it does not run into the script time limit, and a preview is shown before it starts. Every action goes into the log, and the module takes snapshots that let you restore earlier values."]),
      dict(h="📋 Values, presets and CSV", p=[
        "Frequently repeated values can be kept as presets, and similar spellings can be unified. Data can be exported to CSV and imported back, which is convenient for editing in a spreadsheet. All actions are recorded in the log."],
        ul=["Value presets", "Normalization of similar values", "CSV export and import", "Action log"]),
      dict(h="🛒 Storefront and default state", p=[
        "The attribute block on the storefront is optional and off by default, so nothing changes for shoppers until you decide otherwise. The module itself is also off after installation. Product data is saved only with the standard Save button in the product form; an applied template writes nothing to the database before that moment."]),
    ]),
  cover=dict(
    tagline="Шаблоны, слияние дублей и откат",
    items=["Шаблоны характеристик", "Правила для категорий", "Поиск дублей", "Безопасное слияние", "Массовые изменения", "Откат по снимкам"],
    cards=[("Шаблон в карточке", "Добавить, обновить или заменить набор атрибутов"),
           ("Правила категорий", "Шаблон подставляется при открытии формы товара"),
           ("Менеджер атрибутов", "Правка на месте, порядок, счётчик использования"),
           ("Дубли и сокращения", "Нормализация названий и предпросмотр слияния"),
           ("Пакеты AJAX", "Массовая правка без упора во время скрипта"),
           ("Журнал и откат", "Снимки состояния для возврата значений")],
    tabs=["Шаблоны", "Атрибуты", "Дубли", "Журнал"],
    kpis=[("Шаблонов", "12"), ("Атрибутов", "384"), ("Дублей", "27")]),
)

P[67] = dict(
  ru=dict(
    intro=[
      "Каталог редко ломается разом. Чаще у десятка товаров пропадает фото, у сотни нет meta description, у нескольких совпадает SKU, а у пары категорий пустой SEO URL. Пока никто не смотрит на каталог целиком, эти мелочи копятся. Catalog Quality Audit PRO собирает такие проблемы в отчёты и показывает, где именно их искать.",
      "Модуль анализирует товары, категории, производителей, SEO-данные и ссылки на изображения в OpenCart и ocStore. Результат можно отфильтровать, сохранить фильтр, выгрузить в CSV или исправить подтверждаемым массовым действием.",
    ],
    sections=[
      dict(h="📊 Сводки: товары, категории, производители", p=[
        "Начинаете вы со сводки: она показывает, сколько проблем каждого типа нашлось в товарах, категориях и у производителей. Это позволяет сразу понять масштаб и выбрать, с чего начать. Отдельный язык отчёта выбирается в настройках, так что многоязычный магазин может смотреть результаты на удобном для себя языке."]),
      dict(h="🧬 Дубли, которые мешают складу и поиску", p=[
        "Модуль сравнивает model, SKU, EAN и MPN, а также названия товаров и SEO keyword. Два товара с одинаковым SEO keyword конфликтуют на витрине, два товара с одним артикулом путают склад и выгрузки, а одинаковые названия сбивают поиск. Отчёт показывает пары и группы таких записей, чтобы вы решили, что объединить, а что переименовать."]),
      dict(h="🔎 Что проверяется в карточке товара", p=[
        "Список охватывает типовые пробелы в наполнении. Модуль находит товары без изображения, без описания или с очень коротким описанием, без meta title и meta description, без H1, без производителя, без категории и без главной категории. Для категорий и производителей отдельно проверяются SEO-данные, а ссылки на изображения проходят проверку на доступность."]),
      dict(h="🎯 Фильтры, исключения и журнал", p=[
        "Вы можете сохранить настроенный фильтр и вернуться к нему позже. Записи, которые аудитом проверять не нужно, например служебные товары или технические категории, добавляются в исключения и перестают попадать в отчёт. Все действия попадают в журнал."]),
      dict(h="🛠️ Массовые действия и CSV", p=[
        "Из отчёта можно выполнить массовое действие над найденными записями. Каждое действие требует подтверждения, поэтому случайный клик ничего не изменит. Если исправлять вы будете вручную или передадите работу контент-менеджеру, отчёт выгружается в CSV."],
        ul=["Фильтр по типу проблемы", "Экспорт отчёта в CSV", "Исключения из аудита"]),
      dict(h="⏰ Cron и безопасность запуска", p=[
        "Cron в этом модуле необязателен: он нужен только для очистки старого журнала и кеша, а сами проверки идут по запросу. В выключенном состоянии отчёты и массовые действия не выполняются. Включайте массовые действия осознанно и после резервной копии базы."]),
    ]),
  uk=dict(
    intro=[
      "Каталог рідко ламається одразу. Частіше в десятка товарів зникає фото, у сотні немає meta description, у кількох збігається SKU, а в пари категорій порожній SEO URL. Доки ніхто не дивиться на каталог цілком, ці дрібниці накопичуються. Catalog Quality Audit PRO збирає такі проблеми у звіти й показує, де саме їх шукати.",
      "Модуль аналізує товари, категорії, виробників, SEO-дані та посилання на зображення в OpenCart і ocStore. Результат можна відфільтрувати, зберегти фільтр, вивантажити в CSV або виправити масовою дією з підтвердженням.",
    ],
    sections=[
      dict(h="📊 Зведення: товари, категорії, виробники", p=[
        "Починаєте ви зі зведення: воно показує, скільки проблем кожного типу знайдено в товарах, категоріях і у виробників. Це дає змогу одразу зрозуміти масштаб і вибрати, з чого почати. Мова звіту обирається в налаштуваннях, тож багатомовний магазин може дивитися результати зручною для себе мовою."]),
      dict(h="🧬 Дублі, що заважають складу й пошуку", p=[
        "Модуль порівнює model, SKU, EAN і MPN, а також назви товарів і SEO keyword. Два товари з однаковим SEO keyword конфліктують на вітрині, два товари з одним артикулом плутають склад і вивантаження, а однакові назви збивають пошук. Звіт показує пари й групи таких записів, щоб ви вирішили, що об'єднати, а що перейменувати."]),
      dict(h="🔎 Що перевіряється в картці товару", p=[
        "Перелік охоплює типові прогалини в наповненні. Модуль знаходить товари без зображення, без опису або з дуже коротким описом, без meta title і meta description, без H1, без виробника, без категорії та без головної категорії. Для категорій і виробників окремо перевіряються SEO-дані, а посилання на зображення проходять перевірку на доступність."]),
      dict(h="🎯 Фільтри, винятки та журнал", p=[
        "Налаштований фільтр можна зберегти й повернутися до нього пізніше. Записи, які аудитом перевіряти не потрібно, наприклад службові товари чи технічні категорії, додаються у винятки й перестають потрапляти до звіту. Усі дії потрапляють до журналу."]),
      dict(h="🛠️ Масові дії та CSV", p=[
        "Зі звіту можна виконати масову дію над знайденими записами. Кожна дія вимагає підтвердження, тож випадковий клік нічого не змінить. Якщо виправляти ви будете вручну або передасте роботу контент-менеджеру, звіт вивантажується в CSV."],
        ul=["Фільтр за типом проблеми", "Експорт звіту в CSV", "Винятки з аудиту"]),
      dict(h="⏰ Cron і безпека запуску", p=[
        "Cron у цьому модулі необов'язковий: він потрібен лише для очищення старого журналу й кешу, а самі перевірки йдуть за запитом. У вимкненому стані звіти та масові дії не виконуються. Вмикайте масові дії свідомо й після резервної копії бази."]),
    ]),
  en=dict(
    intro=[
      "A catalog rarely breaks all at once. More often a dozen products lose their photo, a hundred have no meta description, a few share a SKU and a couple of categories have an empty SEO URL. While nobody looks at the catalog as a whole, these small things pile up. Catalog Quality Audit PRO gathers them into reports and shows exactly where to look.",
      "The module analyzes products, categories, manufacturers, SEO data and image links in OpenCart and ocStore. You can filter the result, save the filter, export it to CSV or fix it with a bulk action that asks for confirmation.",
    ],
    sections=[
      dict(h="📊 Summaries for products, categories and manufacturers", p=[
        "You start from a summary that shows how many problems of each kind were found in products, categories and manufacturers. It tells you the scale at once and helps you choose where to begin. The report language is picked in the settings, so a multilingual store can read the results in the language that suits the team."]),
      dict(h="🧬 Duplicates that confuse stock and search", p=[
        "The module compares model, SKU, EAN and MPN, as well as product names and SEO keywords. Two products with the same SEO keyword clash on the storefront, two products with one article number confuse stock and feeds, and identical names throw search off. The report lists the pairs and groups so you can decide what to merge and what to rename."]),
      dict(h="🔎 What is checked in a product card", p=[
        "The list covers the typical content gaps. The module finds products with no image, no description or a very short one, no meta title or meta description, no H1, no manufacturer, no category and no main category. SEO data of categories and manufacturers is checked separately, and image links are tested for availability."]),
      dict(h="🎯 Filters, exclusions and the log", p=[
        "A configured filter can be saved and reopened later. Records that the audit should skip, such as service products or technical categories, go into the exclusions list and stop appearing in the report. Every action is written to the log."]),
      dict(h="🛠️ Bulk actions and CSV", p=[
        "From the report you can run a bulk action on the records found. Each action asks for confirmation, so an accidental click changes nothing. If you will fix things by hand or hand the job to a content manager, the report exports to CSV."],
        ul=["Filter by problem type", "Report export to CSV", "Audit exclusions"]),
      dict(h="⏰ Cron and safe operation", p=[
        "Cron is optional in this module: it only cleans the old log and cache, while the checks themselves run on demand. When the module is off, reports and bulk actions do not run. Enable bulk actions deliberately and after a database backup."]),
    ]),
  cover=dict(
    tagline="Отчёты о качестве товаров и SEO",
    items=["Сводки каталога", "Поиск дублей", "Товары без фото", "Проверка meta и H1", "Исключения аудита", "Экспорт в CSV"],
    cards=[("Сводка проблем", "Товары, категории и производители в одном обзоре"),
           ("Дубли", "Model, SKU, EAN, MPN, названия и SEO keyword"),
           ("Пробелы в карточке", "Нет фото, описания, meta, H1 или категории"),
           ("Проверка изображений", "Поиск недоступных ссылок на картинки"),
           ("Сохранённые фильтры", "Возвращайтесь к нужной выборке в один клик"),
           ("Массовые действия", "Исправление с обязательным подтверждением")],
    tabs=["Сводка", "Товары", "Дубли", "Журнал"],
    kpis=[("Проблем", "214"), ("Дублей", "18"), ("Без фото", "41")]),
)

P[69] = dict(
  ru=dict(
    intro=[
      "Когда посетитель впервые открывает магазин, счётчик аналитики, пиксель рекламы и чат уже могут отправлять данные, хотя человек ещё ничего не выбирал. EU Cookie Consent PRO меняет этот порядок: пока согласия нет, подключённые через модуль теги просто не загружаются. Модуль показывает баннер или окно, запоминает выбор и ведёт журнал.",
      "Он различает необходимые, аналитические, маркетинговые и функциональные технологии, умеет работать с Google Consent Mode v2 и составляет реестр cookie и поставщиков. Интерфейс доступен на русском, украинском и английском.",
    ],
    sections=[
      dict(h="🍪 Баннер, окно и повторное открытие", p=[
        "Посетителю показывается баннер или модальное окно на выбор администратора. У него три пути: принять всё, отклонить необязательное или вручную отметить нужные категории. Позже человек может передумать: кнопка повторного открытия настроек остаётся на странице, и новый выбор записывается так же, как первый."]),
      dict(h="🏷️ Теги, которые ждут согласия", p=[
        "Аналитические, маркетинговые и функциональные теги, подключённые через модуль, не загружаются, пока посетитель не согласился на соответствующую категорию. До выбора разрешены только необходимые технологии. Если окно вам не нужно, есть режим «только отложенное подключение тегов»: он работает без окна и лишь управляет моментом загрузки тегов."]),
      dict(h="🌐 Google Consent Mode v2", p=[
        "Для сайтов, где работают сервисы Google, предусмотрена поддержка Consent Mode v2. Состояние согласия передаётся этим сервисам в принятом ими формате, поэтому настройки баннера и поведение тегов остаются согласованными."]),
      dict(h="📒 Реестр cookie и сканирование", p=[
        "Модуль ведёт реестр cookie и поставщиков, чтобы вы видели, какие технологии используются на сайте. Реестр пополняется сканированием: серверным и браузерным. Оба варианта находят то, о чём в администрировании могли забыть, например cookie, добавленные сторонним скриптом."]),
      dict(h="📜 Журнал согласий", p=[
        "Каждое изменение согласия записывается в журнал. Если нужно понять, что именно выбрал посетитель и когда, ответ есть в журнале, а не в догадках."]),
      dict(h="🏬 Мультимагазин, темы и границы ответственности", p=[
        "Модуль поддерживает мультимагазин и работает со стандартной темой, UniShop2 и CodeCart PRO Theme. Важно помнить: это технический инструмент, а не юридическая оценка. Фактические технологии, сроки хранения, категории и требования вашей страны нужно проверить самостоятельно. Рабочий порядок такой: настройте категории и тексты баннера, подключите теги через модуль, запустите сканирование и проверьте поведение сайта до и после согласия."]),
    ]),
  uk=dict(
    intro=[
      "Коли відвідувач уперше відкриває магазин, лічильник аналітики, піксель реклами та чат уже можуть надсилати дані, хоча людина ще нічого не обирала. EU Cookie Consent PRO змінює цей порядок: доки згоди немає, підключені через модуль теги просто не завантажуються. Модуль показує банер або вікно, запам'ятовує вибір і веде журнал.",
      "Він розрізняє необхідні, аналітичні, маркетингові та функціональні технології, вміє працювати з Google Consent Mode v2 і складає реєстр cookie та постачальників. Інтерфейс доступний українською, російською та англійською.",
    ],
    sections=[
      dict(h="🍪 Банер, вікно та повторне відкриття", p=[
        "Відвідувачу показується банер або модальне вікно на вибір адміністратора. У нього три шляхи: прийняти все, відхилити необов'язкове або вручну позначити потрібні категорії. Пізніше людина може передумати: кнопка повторного відкриття налаштувань лишається на сторінці, а новий вибір записується так само, як і перший."]),
      dict(h="🏷️ Теги, що чекають на згоду", p=[
        "Аналітичні, маркетингові та функціональні теги, підключені через модуль, не завантажуються, доки відвідувач не погодився на відповідну категорію. До вибору дозволені лише необхідні технології. Якщо вікно вам не потрібне, є режим «лише відкладене підключення тегів»: він працює без вікна й тільки керує моментом завантаження тегів."]),
      dict(h="🌐 Google Consent Mode v2", p=[
        "Для сайтів, де працюють сервіси Google, передбачено підтримку Consent Mode v2. Стан згоди передається цим сервісам у прийнятому ними форматі, тому налаштування банера й поведінка тегів лишаються узгодженими."]),
      dict(h="📒 Реєстр cookie та сканування", p=[
        "Модуль веде реєстр cookie та постачальників, щоб ви бачили, які технології використовуються на сайті. Реєстр поповнюється скануванням: серверним і браузерним. Обидва варіанти знаходять те, про що в адмініструванні могли забути, наприклад cookie, додані стороннім скриптом."]),
      dict(h="📜 Журнал згод", p=[
        "Кожна зміна згоди записується до журналу. Якщо потрібно зрозуміти, що саме обрав відвідувач і коли, відповідь є в журналі, а не в здогадах."]),
      dict(h="🏬 Мультимагазин, теми та межі відповідальності", p=[
        "Модуль підтримує мультимагазин і працює зі стандартною темою, UniShop2 та CodeCart PRO Theme. Важливо пам'ятати: це технічний інструмент, а не юридична оцінка. Фактичні технології, строки зберігання, категорії та вимоги вашої країни потрібно перевірити самостійно. Робочий порядок такий: налаштуйте категорії й тексти банера, підключіть теги через модуль, запустіть сканування й перевірте поведінку сайту до і після згоди."]),
    ]),
  en=dict(
    intro=[
      "When a visitor opens a store for the first time, an analytics counter, an ad pixel and a chat widget may already be sending data, even though the person has not chosen anything yet. EU Cookie Consent PRO reverses that order: until consent is given, tags connected through the module are simply not loaded. The module shows a banner or a dialog, remembers the choice and keeps a log.",
      "It separates necessary, analytics, marketing and functional technologies, works with Google Consent Mode v2 and builds a register of cookies and providers. The interface is available in Russian, Ukrainian and English.",
    ],
    sections=[
      dict(h="🍪 Banner, dialog and reopening", p=[
        "The visitor sees a banner or a modal dialog, whichever the administrator picks. There are three paths: accept everything, reject what is optional, or tick the categories by hand. People change their minds, so a button to reopen the settings stays on the page, and the new choice is recorded just like the first one."]),
      dict(h="🏷️ Tags that wait for consent", p=[
        "Analytics, marketing and functional tags connected through the module are not loaded until the visitor agrees to the matching category. Before a choice is made, only necessary technologies are allowed. If you do not want a dialog, a «deferred tag loading only» mode works without one and simply controls when tags load."]),
      dict(h="🌐 Google Consent Mode v2", p=[
        "For sites that run Google services, Consent Mode v2 is supported. The consent state is passed to those services in the format they accept, which keeps the banner settings and the tag behavior consistent."]),
      dict(h="📒 Cookie register and scanning", p=[
        "The module keeps a register of cookies and providers, so you can see which technologies the site uses. The register is filled by scanning, either on the server or in the browser. Both approaches find what could be forgotten in administration, for example a cookie added by a third-party script."]),
      dict(h="📜 Consent log", p=[
        "Every consent change is written to the log. When you need to know what a visitor chose and when, the answer is in the log rather than in guesswork."]),
      dict(h="🏬 Multistore, themes and the limits of the tool", p=[
        "The module supports multistore setups and works with the standard theme, UniShop2 and CodeCart PRO Theme. Keep in mind that it is a technical tool, not a legal assessment. The actual technologies, retention periods, categories and the requirements of your country must be checked by you. A practical order is: set up the categories and banner texts, connect tags through the module, run the scan, and test the site before and after consent."]),
    ]),
  cover=dict(
    tagline="Согласие на cookie и Consent Mode v2",
    items=["Баннер и окно", "Категории cookie", "Отложенные теги", "Consent Mode v2", "Журнал согласий", "Реестр cookie"],
    cards=[("Баннер или окно", "Принять всё, отклонить или выбрать категории"),
           ("Теги после согласия", "Подключённые теги не грузятся до выбора"),
           ("Consent Mode v2", "Передача состояния согласия сервисам Google"),
           ("Сканирование", "Серверное и браузерное, реестр cookie"),
           ("Журнал изменений", "Что и когда выбрал посетитель"),
           ("Мультимагазин", "Три языка интерфейса, UniShop2 и CodeCart Theme")],
    tabs=["Баннер", "Теги", "Реестр", "Журнал"],
    kpis=[("Согласий", "1 284"), ("Cookie", "23"), ("Поставщиков", "9")]),
)

P[70] = dict(
  ru=dict(
    intro=[
      "Поисковым системам важно понимать, кто написал статью и кто за ней стоит, а читателю хочется видеть живого автора. Expert Author Schema PRO решает обе задачи: показывает на странице блок эксперта или автора и одновременно выдаёт структурированные данные Schema.org. Дополнительно есть необязательный блок «Поделиться» и отдельная Google News Sitemap.",
      "Тексты блока настраиваются на всех языках магазина, а для каждого типа страниц включение и место размещения задаются отдельно. После установки модуль выключен, поэтому на витрине ничего не изменится, пока вы не сохраните настройки.",
    ],
    sections=[
      dict(h="🧑‍🏫 Блок эксперта и автора", p=[
        "Видимый блок содержит тексты на всех языках магазина. Его можно разместить в нужном месте страницы и выбрать светлую, тёмную или автоматическую тему оформления. Благодаря этому блок не выбивается из дизайна ни в дневной, ни в тёмной версии сайта."]),
      dict(h="🏢 Организация, автор и издатель", p=[
        "В настройках указываются данные организации-автора и издателя с мультиязычными названиями. Логотип выбирается из каталога изображений OpenCart. Эти данные попадают в разметку так, чтобы статья была связана с конкретной организацией."]),
      dict(h="🧾 Разметка Schema.org", p=[
        "Для статей и новостей модуль выводит JSON-LD Article, BlogPosting и NewsArticle. Для списков блога, новостей и категорий товаров используется CollectionPage. Дополнительно добавляется директива max-image-preview:large, позволяющая показывать крупное превью изображения. Структурированные данные должны соответствовать видимому контенту страницы, поэтому проверяйте разметку в инструментах для разработчиков Google."]),
      dict(h="📰 Google News Sitemap", p=[
        "Для новостей и блога создаётся отдельная карта Google News. В неё попадают публикации за последние два дня, до 1000 адресов. Так поисковик получает компактный список свежих материалов, а не весь архив."]),
      dict(h="🔗 Блок «Поделиться» без внешних SDK", p=[
        "Если блок включён, читатель получает кнопки для самых распространённых каналов. Иконки — локальные SVG, внешние SDK не подключаются и запросов к соцсетям при загрузке страницы нет."],
        ul=["Facebook, Telegram, Viber, WhatsApp", "LinkedIn, X, Pinterest", "E-mail и «Скопировать ссылку»"]),
      dict(h="🎛️ Свой HTML и JSON-LD по маршрутам", p=[
        "Если стандартной разметки не хватает, можно добавить собственные HTML и JSON-LD, но только для маршрутов, которые вы явно разрешили. Это даёт точечный контроль и не затрагивает остальной сайт. Порядок работы такой: заполните данные организации и автора на всех языках, выберите типы страниц и размещение блоков, затем проверьте результат."]),
    ]),
  uk=dict(
    intro=[
      "Пошуковим системам важливо розуміти, хто написав статтю й хто за нею стоїть, а читачеві хочеться бачити живого автора. Expert Author Schema PRO розв'язує обидва завдання: показує на сторінці блок експерта чи автора й водночас видає структуровані дані Schema.org. Додатково є необов'язковий блок «Поділитися» та окрема Google News Sitemap.",
      "Тексти блока налаштовуються всіма мовами магазину, а для кожного типу сторінок увімкнення й місце розміщення задаються окремо. Після встановлення модуль вимкнений, тому на вітрині нічого не зміниться, доки ви не збережете налаштування.",
    ],
    sections=[
      dict(h="🧑‍🏫 Блок експерта й автора", p=[
        "Видимий блок містить тексти всіма мовами магазину. Його можна розмістити в потрібному місці сторінки та обрати світлу, темну або автоматичну тему оформлення. Завдяки цьому блок не вибивається з дизайну ні в денній, ні в темній версії сайту."]),
      dict(h="🏢 Організація, автор і видавець", p=[
        "У налаштуваннях зазначаються дані організації-автора та видавця з багатомовними назвами. Логотип обирається з каталогу зображень OpenCart. Ці дані потрапляють у розмітку так, щоб стаття була пов'язана з конкретною організацією."]),
      dict(h="🧾 Розмітка Schema.org", p=[
        "Для статей і новин модуль виводить JSON-LD Article, BlogPosting і NewsArticle. Для списків блогу, новин і категорій товарів використовується CollectionPage. Додатково додається директива max-image-preview:large, що дозволяє показувати велике превʼю зображення. Структуровані дані мають відповідати видимому контенту сторінки, тому перевіряйте розмітку в інструментах для розробників Google."]),
      dict(h="📰 Google News Sitemap", p=[
        "Для новин і блогу створюється окрема мапа Google News. До неї потрапляють публікації за останні два дні, до 1000 адрес. Так пошуковик отримує компактний перелік свіжих матеріалів, а не весь архів."]),
      dict(h="🔗 Блок «Поділитися» без зовнішніх SDK", p=[
        "Якщо блок увімкнено, читач отримує кнопки для найпоширеніших каналів. Іконки — локальні SVG, зовнішні SDK не підключаються, а запитів до соцмереж під час завантаження сторінки немає."],
        ul=["Facebook, Telegram, Viber, WhatsApp", "LinkedIn, X, Pinterest", "E-mail і «Скопіювати посилання»"]),
      dict(h="🎛️ Власний HTML і JSON-LD за маршрутами", p=[
        "Якщо стандартної розмітки не вистачає, можна додати власні HTML і JSON-LD, але лише для маршрутів, які ви явно дозволили. Це дає точковий контроль і не зачіпає решту сайту. Порядок роботи такий: заповніть дані організації й автора всіма мовами, оберіть типи сторінок і розміщення блоків, а тоді перевірте результат."]),
    ]),
  en=dict(
    intro=[
      "Search engines want to know who wrote an article and who stands behind it, and readers like to see a real author. Expert Author Schema PRO handles both: it shows an expert or author block on the page and outputs Schema.org structured data at the same time. There is also an optional «Share» block and a separate Google News Sitemap.",
      "Block texts are set for every store language, and for each page type the switch and the placement are separate. After installation the module is off, so nothing changes on the storefront until you save the settings.",
    ],
    sections=[
      dict(h="🧑‍🏫 The expert and author block", p=[
        "The visible block holds texts in every store language. It can be placed where you want on the page and set to a light, dark or automatic theme, so it fits both the daytime and the dark version of the site."]),
      dict(h="🏢 Organization, author and publisher", p=[
        "The settings take the details of the authoring organization and the publisher, with multilingual names. The logo is chosen from the OpenCart image catalog. This data goes into the markup so that an article is tied to a specific organization."]),
      dict(h="🧾 Schema.org markup", p=[
        "For articles and news the module outputs JSON-LD Article, BlogPosting and NewsArticle. For blog, news and product category listings it uses CollectionPage. It also adds the max-image-preview:large directive, which allows a large image preview. Structured data must match the visible content of the page, so check the markup in Google developer tools."]),
      dict(h="📰 Google News Sitemap", p=[
        "A separate Google News map is generated for news and the blog. It covers publications from the last two days, up to 1000 URLs, so a search engine gets a compact list of fresh material rather than the whole archive."]),
      dict(h="🔗 A Share block without external SDKs", p=[
        "When the block is on, readers get buttons for the most common channels. The icons are local SVG files, no external SDKs are loaded and the page makes no requests to social networks."],
        ul=["Facebook, Telegram, Viber, WhatsApp", "LinkedIn, X, Pinterest", "E-mail and «Copy link»"]),
      dict(h="🎛️ Custom HTML and JSON-LD per route", p=[
        "If the standard markup is not enough, you can add your own HTML and JSON-LD, but only for routes you have explicitly allowed. That gives precise control and leaves the rest of the site alone. A sensible order is: fill in the organization and author details in all languages, choose page types and block placement, then verify the result."]),
    ]),
  cover=dict(
    tagline="Автор, эксперт и разметка Schema.org",
    items=["Блок эксперта", "JSON-LD Article", "Организация и издатель", "Блок «Поделиться»", "Google News Sitemap", "Тема: светлая/тёмная"],
    cards=[("Блок автора", "Тексты на всех языках, размещение, тема"),
           ("Разметка статей", "Article, BlogPosting и NewsArticle в JSON-LD"),
           ("CollectionPage", "Блог, новости и категории товаров"),
           ("Поделиться", "Локальные SVG-иконки, без внешних SDK"),
           ("News Sitemap", "Публикации за два дня, до 1000 URL"),
           ("Свой JSON-LD", "Только для явно разрешённых маршрутов")],
    tabs=["Автор", "Организация", "Разметка", "Поделиться"],
    kpis=[("Статей", "86"), ("В News Sitemap", "14"), ("Языков", "3")]),
)

P[75] = dict(
  ru=dict(
    intro=[
      "Битая ссылка редко бросается в глаза администратору: страница, на которой она стоит, выглядит нормально, а проблема всплывает у покупателя, который кликнул и попал на ошибку. Link Checker PRO обходит сайт на OpenCart или ocStore 3.x и ищет такие места заранее: битые ссылки, редиректы, внешние ссылки, изображения и статические файлы.",
      "Главное в отчёте — не только проблемный адрес, но и страница-источник, на которой ссылка найдена. Поэтому исправление сводится к понятному действию: открыть источник и поправить ссылку.",
    ],
    sections=[
      dict(h="🕷️ Что обходит сканер", p=[
        "Проверяются внутренние и внешние ссылки, а также редиректы, изображения и статические файлы. Это позволяет поймать как удалённую страницу или товар, так и пропавшую картинку, подключённый скрипт или стиль, которые больше не отдаются сервером."]),
      dict(h="📍 Адрес и источник", p=[
        "Для каждой найденной проблемы показываются два адреса: тот, который не работает, и страница, где на него ссылаются. Одна и та же битая ссылка может встречаться в десятках мест, и отчёт покажет, где именно. Результаты сканирования можно экспортировать, например чтобы передать список контент-менеджеру."]),
      dict(h="🙌 Модуль только читает", p=[
        "Link Checker PRO не меняет контент магазина: он находит проблемы, но ничего не правит сам. Исправления вы делаете вручную в нужных местах. Операции, изменяющие состояние модуля, выполняются только через POST."]),
      dict(h="🛡️ Защита от SSRF", p=[
        "Сканер ходит по внешним адресам, поэтому в нём предусмотрена защита от SSRF. Это защищает от ситуации, когда проверка ссылки превращается в способ обращения к внутренним ресурсам сервера."]),
      dict(h="⏰ Регулярная проверка по cron", p=[
        "Сканирование можно запускать по расписанию. Готовая команда для cron показана на вкладке «Cron / Автоматизация», так что выбирать параметры вслепую не придётся. Регулярный прогон полезен после обновления каталога или смены структуры адресов."]),
      dict(h="⚖️ Нагрузка и диагностика", p=[
        "Обход сайта создаёт нагрузку, поэтому запускайте сканирование в спокойное время. Модуль выключен после установки; порядок такой: включить, запустить сканирование, разобрать найденное и настроить cron. Встроенная диагностика проверяет работу на PHP 7.4–8.5."]),
    ]),
  uk=dict(
    intro=[
      "Бите посилання рідко впадає в око адміністратору: сторінка, на якій воно стоїть, виглядає нормально, а проблема спливає в покупця, який клікнув і потрапив на помилку. Link Checker PRO обходить сайт на OpenCart чи ocStore 3.x та шукає такі місця заздалегідь: биті посилання, редиректи, зовнішні посилання, зображення й статичні файли.",
      "Головне у звіті — не лише проблемна адреса, а й сторінка-джерело, на якій посилання знайдено. Тому виправлення зводиться до зрозумілої дії: відкрити джерело й поправити посилання.",
    ],
    sections=[
      dict(h="🕷️ Що обходить сканер", p=[
        "Перевіряються внутрішні й зовнішні посилання, а також редиректи, зображення та статичні файли. Це дає змогу впіймати як видалену сторінку чи товар, так і зниклу картинку, підключений скрипт чи стиль, які сервер більше не віддає."]),
      dict(h="📍 Адреса і джерело", p=[
        "Для кожної знайденої проблеми показуються дві адреси: та, що не працює, і сторінка, де на неї посилаються. Те саме бите посилання може траплятися в десятках місць, і звіт покаже, де саме. Результати сканування можна експортувати, наприклад щоб передати список контент-менеджеру."]),
      dict(h="🙌 Модуль лише читає", p=[
        "Link Checker PRO не змінює контент магазину: він знаходить проблеми, але нічого не правитиме сам. Виправлення ви робите вручну в потрібних місцях. Операції, що змінюють стан модуля, виконуються лише через POST."]),
      dict(h="🛡️ Захист від SSRF", p=[
        "Сканер ходить за зовнішніми адресами, тому в ньому передбачено захист від SSRF. Це захищає від ситуації, коли перевірка посилання перетворюється на спосіб звернення до внутрішніх ресурсів сервера."]),
      dict(h="⏰ Регулярна перевірка за cron", p=[
        "Сканування можна запускати за розкладом. Готова команда для cron показана на вкладці «Cron / Автоматизація», тож обирати параметри наосліп не доведеться. Регулярний прогін корисний після оновлення каталогу чи зміни структури адрес."]),
      dict(h="⚖️ Навантаження і діагностика", p=[
        "Обхід сайту створює навантаження, тому запускайте сканування в спокійний час. Модуль вимкнений після встановлення; порядок такий: увімкнути, запустити сканування, розібрати знайдене й налаштувати cron. Вбудована діагностика перевіряє роботу на PHP 7.4–8.5."]),
    ]),
  en=dict(
    intro=[
      "A broken link rarely catches the administrator's eye: the page it sits on looks fine, and the problem surfaces for a shopper who clicks and lands on an error. Link Checker PRO crawls an OpenCart or ocStore 3.x site and looks for such spots in advance: broken links, redirects, external links, images and static files.",
      "What matters in the report is not only the faulty address but also the source page where the link was found. Fixing it becomes a clear action: open the source and correct the link.",
    ],
    sections=[
      dict(h="🕷️ What the scanner covers", p=[
        "It checks internal and external links as well as redirects, images and static files. That catches a deleted page or product just as well as a missing picture, or a script or stylesheet that the server no longer delivers."]),
      dict(h="📍 Address and source", p=[
        "For every problem found, two addresses are shown: the one that does not work and the page that links to it. The same broken link can appear in dozens of places, and the report shows where. Scan results can be exported, for instance to hand a list to a content manager."]),
      dict(h="🙌 The module only reads", p=[
        "Link Checker PRO does not change store content: it finds problems but fixes nothing itself. You make the corrections by hand where they belong. Operations that change the module state run only through POST."]),
      dict(h="🛡️ SSRF protection", p=[
        "The scanner visits external addresses, so it includes SSRF protection. This guards against a link check turning into a way of reaching internal resources of the server."]),
      dict(h="⏰ Regular checks with cron", p=[
        "Scanning can run on a schedule. A ready-made cron command is shown on the «Cron / Automation» tab, so you do not have to guess the parameters. A regular pass is useful after a catalog update or a change in URL structure."]),
      dict(h="⚖️ Load and diagnostics", p=[
        "Crawling a site creates load, so run the scan at a quiet time. The module is off after installation; the order is to enable it, run a scan, work through the findings and set up cron. Built-in diagnostics check operation on PHP 7.4 to 8.5."]),
    ]),
  cover=dict(
    tagline="Битые ссылки с адресом страницы-источника",
    items=["Битые ссылки", "Редиректы", "Внешние ссылки", "Изображения", "Статические файлы", "Экспорт результатов"],
    cards=[("Полный обход", "Внутренние и внешние ссылки, картинки, файлы"),
           ("Страница-источник", "Видно, где именно стоит проблемная ссылка"),
           ("Редиректы", "Находит ссылки, ведущие через перенаправление"),
           ("Экспорт", "Выгрузка результатов для контент-менеджера"),
           ("Cron", "Готовая команда на вкладке автоматизации"),
           ("Защита SSRF", "Изменения только через POST, контент не правится")],
    tabs=["Сканирование", "Проблемы", "Cron", "Диагностика"],
    kpis=[("Проверено URL", "4 812"), ("Битых", "37"), ("Редиректов", "112")]),
)

P[78] = dict(
  ru=dict(
    intro=[
      "Поставщик присылает прайс в евро, злотых или долларах, а магазин торгует в гривнах. Менеджер открывает калькулятор, умножает на курс и вписывает цену в карточку, а завтра курс меняется, и всё приходится считать заново. Product Currency Input PRO убирает эту ручную работу: в форме товара появляется необязательный блок, где вы вводите цену в исходной валюте.",
      "Модуль сам считает цену магазина и записывает её в стандартное поле product.price. Для витрины, корзины, заказов и фидов ничего не меняется, они работают с обычной ценой товара, как и раньше.",
    ],
    sections=[
      dict(h="💱 Цена в валюте поставщика", p=[
        "В блоке карточки товара выбирается любая активная валюта OpenCart и вводится цена. Цена поставщика, исходная валюта, режим курса и применённый курс сохраняются в отдельной таблице модуля, а результат в основной валюте записывается в product.price. Остальные валюты и магазины показывают эту цену через штатную валютную систему OpenCart."]),
      dict(h="📐 Три режима курса", p=[
        "Курс можно брать из таблицы валют OpenCart, указать вручную для конкретного товара или включить режим 1:1, когда цена записывается без пересчёта. Ручной курс нужен, когда поставщик фиксирует собственный. Режим 1:1 подходит, если исходная и основная валюта совпадают по значению."]),
      dict(h="✅ Сохранение только штатной кнопкой", p=[
        "JavaScript здесь выполняет лишь предварительный просмотр. Данные не записываются через AJAX, при изменении поля или нажатии кнопки пересчёта. Финальная проверка и расчёт происходят на сервере после стандартной кнопки «Сохранить» товара. Поэтому нельзя случайно изменить цену, просто поиграв с полями."]),
      dict(h="🔄 Пересчёт при смене курсов", p=[
        "Если курсы валют изменились, цены можно пересчитать автоматически или запустить пакетный пересчёт вручную. Пакетный режим работает с фильтрами, сортировкой и пагинацией, а диагностика и журнал показывают, что произошло. Перед массовым пересчётом сделайте резервную копию."]),
      dict(h="🚫 Что модуль намеренно не трогает", p=[
        "Акции, скидки, опции и периодические платежи не конвертируются. Это сознательное решение: модуль работает с основной ценой, а для остальных данных вы по-прежнему управляете значениями сами. Обычные товары без записи модуля он не затрагивает совсем."]),
      dict(h="🤝 Связки с другими модулями", p=[
        "Currency Rates PRO для работы не обязателен, но совместим с ним. Есть необязательный мост с VAT Price Input PRO для сочетания «ФОП/ТОВ + валюта», когда нужно учитывать и налоговый режим, и валюту поставщика."]),
    ]),
  uk=dict(
    intro=[
      "Постачальник надсилає прайс в євро, злотих чи доларах, а магазин торгує в гривнях. Менеджер відкриває калькулятор, множить на курс і вписує ціну в картку, а завтра курс змінюється, і все доводиться рахувати наново. Product Currency Input PRO прибирає цю ручну роботу: у формі товару з'являється необов'язковий блок, де ви вводите ціну у вихідній валюті.",
      "Модуль сам рахує ціну магазину й записує її в стандартне поле product.price. Для вітрини, кошика, замовлень і фідів нічого не змінюється, вони працюють зі звичайною ціною товару, як і раніше.",
    ],
    sections=[
      dict(h="💱 Ціна у валюті постачальника", p=[
        "У блоці картки товару обирається будь-яка активна валюта OpenCart і вводиться ціна. Ціна постачальника, вихідна валюта, режим курсу та застосований курс зберігаються в окремій таблиці модуля, а результат в основній валюті записується в product.price. Інші валюти й магазини показують цю ціну через штатну валютну систему OpenCart."]),
      dict(h="📐 Три режими курсу", p=[
        "Курс можна брати з таблиці валют OpenCart, вказати вручну для конкретного товару або ввімкнути режим 1:1, коли ціна записується без перерахунку. Ручний курс потрібен, коли постачальник фіксує власний. Режим 1:1 підходить, якщо вихідна й основна валюта збігаються за значенням."]),
      dict(h="✅ Збереження лише штатною кнопкою", p=[
        "JavaScript тут виконує лише попередній перегляд. Дані не записуються через AJAX, під час зміни поля чи натискання кнопки перерахунку. Фінальна перевірка й розрахунок відбуваються на сервері після стандартної кнопки «Зберегти» товару. Тому не можна випадково змінити ціну, просто погравшись з полями."]),
      dict(h="🔄 Перерахунок під час зміни курсів", p=[
        "Якщо курси валют змінилися, ціни можна перерахувати автоматично або запустити пакетний перерахунок уручну. Пакетний режим працює з фільтрами, сортуванням і пагінацією, а діагностика й журнал показують, що сталося. Перед масовим перерахунком зробіть резервну копію."]),
      dict(h="🚫 Чого модуль свідомо не чіпає", p=[
        "Акції, знижки, опції та періодичні платежі не конвертуються. Це свідоме рішення: модуль працює з основною ціною, а для решти даних ви, як і раніше, керуєте значеннями самі. Звичайні товари без запису модуля він не зачіпає взагалі."]),
      dict(h="🤝 Зв'язки з іншими модулями", p=[
        "Currency Rates PRO для роботи не обов'язковий, але сумісний із ним. Є необов'язковий міст із VAT Price Input PRO для поєднання «ФОП/ТОВ + валюта», коли потрібно враховувати і податковий режим, і валюту постачальника."]),
    ]),
  en=dict(
    intro=[
      "A supplier sends a price list in euros, zlotys or dollars, while the store sells in hryvnia. A manager opens a calculator, multiplies by the rate and types the price into the card, and tomorrow the rate moves and everything has to be recalculated. Product Currency Input PRO removes that manual work: the product form gets an optional block where you enter the price in the original currency.",
      "The module calculates the store price itself and writes it to the standard product.price field. Nothing changes for the storefront, cart, orders and feeds; they keep working with the ordinary product price.",
    ],
    sections=[
      dict(h="💱 A price in the supplier's currency", p=[
        "In the block on the product card you choose any active OpenCart currency and enter the price. The supplier price, original currency, rate mode and applied rate are stored in a separate module table, while the result in the main currency is written to product.price. Other currencies and stores display that price through the standard OpenCart currency system."]),
      dict(h="📐 Three rate modes", p=[
        "The rate can come from the OpenCart currency table, be entered manually for a specific product, or be set to 1:1, where the price is written without conversion. A manual rate is for suppliers who fix their own. The 1:1 mode fits when the original and main currency match in value."]),
      dict(h="✅ Saved only by the standard button", p=[
        "JavaScript here only builds a preview. Nothing is written through AJAX, on a field change or on a recalculate button click. The final check and calculation happen on the server after the standard Save button of the product. That means a price cannot be changed by accident just by playing with the fields."]),
      dict(h="🔄 Recalculation when rates change", p=[
        "When currency rates change, prices can be recalculated automatically or by running a batch recalculation by hand. The batch mode offers filters, sorting and pagination, and diagnostics with a log show what happened. Make a backup before a mass recalculation."]),
      dict(h="🚫 What the module deliberately leaves alone", p=[
        "Specials, discounts, options and recurring payments are not converted. This is intentional: the module works with the main price, and for the rest you keep managing values yourself. Ordinary products without a module record are not touched at all."]),
      dict(h="🤝 Links with other modules", p=[
        "Currency Rates PRO is not required but is compatible. There is an optional bridge with VAT Price Input PRO for the «sole proprietor or company plus currency» combination, when both the tax regime and the supplier currency have to be taken into account."]),
    ]),
  cover=dict(
    tagline="Цена поставщика в EUR, USD, PLN",
    items=["Цена в валюте", "Три режима курса", "Автопересчёт", "Пакетный пересчёт", "Журнал и диагностика", "Мост с VAT Price"],
    cards=[("Исходная валюта", "Любая активная валюта OpenCart в карточке товара"),
           ("Курс магазина", "Таблица валют, ручной курс или режим 1:1"),
           ("Запись в product.price", "Витрина и фиды работают без изменений"),
           ("Пересчёт по курсам", "Автоматически или пакетом с фильтрами"),
           ("Сохранение на сервере", "Только штатной кнопкой Сохранить"),
           ("Мост с VAT Price", "Сочетание ФОП/ТОВ и валюты")],
    tabs=["Товары", "Курсы", "Пересчёт", "Журнал"],
    kpis=[("Товаров", "1 240"), ("Валют", "3"), ("Пересчитано", "312")]),
)

P[81] = dict(
  ru=dict(
    intro=[
      "Покупатель, пришедший в категорию с двумя сотнями товаров, редко готов листать всё подряд. Ему нужен конкретный производитель, диапазон цены и только то, что есть в наличии. Smart Filter Pro SEO добавляет на страницы категорий настраиваемый фильтр, который обновляет список товаров через AJAX, без перехода на новую страницу.",
      "Вторая половина задачи касается поисковиков: страницы фильтрации могут плодить дубли. Поэтому в модуле есть SEO-управление адресами фильтров: canonical, noindex, посадочные страницы и история редиректов.",
    ],
    sections=[
      dict(h="🎚️ Из чего собирается фильтр", p=[
        "Источниками служат производитель, наличие, цена, штатные фильтры OpenCart, атрибуты и опции. Вы сами решаете, что включить, поэтому фильтр для категории смартфонов может опираться на атрибуты, а для категории одежды на опции."]),
      dict(h="🖼️ Макеты и чипы", p=[
        "Фильтр можно вывести боковой панелью, горизонтальной полосой или в разделённом виде. Выбранные значения показываются «чипами», которые легко снять по одному. Цвета и параметры производительности настраиваются отдельно. Модуль совместим со стандартной темой и UniShop2 3.6.2, а также с совместимыми темами."]),
      dict(h="⚡ AJAX без перезагрузки", p=[
        "Когда посетитель отмечает значение, список товаров перезагружается на месте. Страница не прыгает наверх, а человек сразу видит результат своего выбора."]),
      dict(h="🔎 SEO для страниц фильтрации", p=[
        "Страницы с выбранными значениями фильтра легко превращаются в тысячи близких адресов. Модуль управляет ими через canonical и noindex и позволяет создавать SEO-посадочные страницы для самых востребованных сочетаний. Если адрес меняется, история редиректов хранит прежние ссылки, чтобы они не терялись."]),
      dict(h="🗃️ Индекс фильтра", p=[
        "Для быстрой работы используется индекс фильтра. Его можно перестроить из вкладки «Сервис» или по cron. После массовых изменений каталога индекс стоит пересобрать, иначе фильтр будет показывать устаревшие данные."]),
      dict(h="🚦 Безопасный запуск", p=[
        "После установки модуль выключен: до сохранения настроек нет вывода, редиректов и cron-действий. Порядок такой: выберите источники и макет, создайте таблицы и перестройте индекс во вкладке «Сервис», затем включите статус, сохраните и проверьте работу на нескольких категориях."]),
    ]),
  uk=dict(
    intro=[
      "Покупець, що прийшов до категорії з двома сотнями товарів, рідко готовий гортати все підряд. Йому потрібен конкретний виробник, діапазон ціни й лише те, що є в наявності. Smart Filter Pro SEO додає на сторінки категорій настроюваний фільтр, який оновлює список товарів через AJAX, без переходу на нову сторінку.",
      "Друга половина завдання стосується пошуковиків: сторінки фільтрації можуть плодити дублі. Тому в модулі є SEO-керування адресами фільтрів: canonical, noindex, посадкові сторінки та історія редиректів.",
    ],
    sections=[
      dict(h="🎚️ З чого збирається фільтр", p=[
        "Джерелами слугують виробник, наявність, ціна, штатні фільтри OpenCart, атрибути й опції. Ви самі вирішуєте, що ввімкнути, тому фільтр для категорії смартфонів може спиратися на атрибути, а для категорії одягу на опції."]),
      dict(h="🖼️ Макети та чіпи", p=[
        "Фільтр можна вивести бічною панеллю, горизонтальною смугою або в розділеному вигляді. Вибрані значення показуються «чіпами», які легко зняти по одному. Кольори та параметри продуктивності налаштовуються окремо. Модуль сумісний зі стандартною темою та UniShop2 3.6.2, а також із сумісними темами."]),
      dict(h="⚡ AJAX без перезавантаження", p=[
        "Коли відвідувач позначає значення, список товарів перезавантажується на місці. Сторінка не стрибає нагору, а людина одразу бачить результат свого вибору."]),
      dict(h="🔎 SEO для сторінок фільтрації", p=[
        "Сторінки з вибраними значеннями фільтра легко перетворюються на тисячі близьких адрес. Модуль керує ними через canonical і noindex та дає змогу створювати SEO-посадкові сторінки для найпопулярніших поєднань. Якщо адреса змінюється, історія редиректів зберігає попередні посилання, щоб вони не губилися."]),
      dict(h="🗃️ Індекс фільтра", p=[
        "Для швидкої роботи використовується індекс фільтра. Його можна перебудувати з вкладки «Сервіс» або за cron. Після масових змін каталогу індекс варто перезібрати, інакше фільтр показуватиме застарілі дані."]),
      dict(h="🚦 Безпечний запуск", p=[
        "Після встановлення модуль вимкнений: до збереження налаштувань немає виводу, редиректів і cron-дій. Порядок такий: оберіть джерела й макет, створіть таблиці та перебудуйте індекс у вкладці «Сервіс», потім увімкніть статус, збережіть і перевірте роботу на кількох категоріях."]),
    ]),
  en=dict(
    intro=[
      "A shopper arriving in a category with two hundred products is rarely willing to scroll through everything. They want a particular brand, a price range and only what is in stock. Smart Filter Pro SEO adds a configurable filter to category pages that refreshes the product list through AJAX, without moving to a new page.",
      "The second half of the job concerns search engines: filter pages can breed duplicates. For that the module includes SEO control of filter URLs: canonical, noindex, landing pages and a redirect history.",
    ],
    sections=[
      dict(h="🎚️ What a filter is built from", p=[
        "The sources are manufacturer, availability, price, standard OpenCart filters, attributes and options. You decide what to switch on, so a filter for a smartphone category can rely on attributes while one for clothing leans on options."]),
      dict(h="🖼️ Layouts and chips", p=[
        "The filter can be shown as a sidebar, a horizontal bar or in a split layout. Selected values appear as chips that are easy to remove one by one. Colors and performance parameters are set separately. The module is compatible with the standard theme and UniShop2 3.6.2, as well as compatible themes."]),
      dict(h="⚡ AJAX without a reload", p=[
        "When a visitor ticks a value, the product list reloads in place. The page does not jump back to the top, and the person sees the result of the choice right away."]),
      dict(h="🔎 SEO for filter pages", p=[
        "Pages with selected filter values easily turn into thousands of near-identical URLs. The module manages them with canonical and noindex and lets you create SEO landing pages for the most wanted combinations. When an address changes, the redirect history keeps the old links so they are not lost."]),
      dict(h="🗃️ The filter index", p=[
        "A filter index keeps things fast. It can be rebuilt from the «Service» tab or by cron. After mass changes to the catalog the index should be rebuilt, otherwise the filter will show outdated data."]),
      dict(h="🚦 A careful start", p=[
        "After installation the module is off: until the settings are saved there is no output, no redirects and no cron actions. The order is to choose sources and layout, create the tables and rebuild the index on the «Service» tab, then enable the status, save, and check several categories."]),
    ]),
  cover=dict(
    tagline="AJAX-фильтр с SEO-адресами",
    items=["Фильтр по цене", "Производитель и наличие", "Атрибуты и опции", "Чипы значений", "SEO-посадочные", "Индекс по cron"],
    cards=[("Источники фильтра", "Производитель, цена, атрибуты, опции, наличие"),
           ("Три макета", "Боковой, горизонтальный и разделённый"),
           ("AJAX-обновление", "Список товаров меняется без перехода"),
           ("Canonical и noindex", "Управление страницами фильтрации"),
           ("Посадочные и редиректы", "SEO-страницы и история переадресаций"),
           ("Индекс фильтра", "Перестройка из вкладки Сервис или по cron")],
    tabs=["Источники", "Макет", "SEO", "Сервис"],
    kpis=[("Фильтров", "9"), ("Посадочных", "24"), ("Записей индекса", "5 316")]),
)

P[87] = dict(
  ru=dict(
    intro=[
      "Покупатель вводит «FTH-062» или «кабель 12 V», а штатный поиск не находит ничего, потому что разделитель стоит не там или названия записаны на другом языке. Smart Search PRO усиливает поиск товаров OpenCart и ocStore, но не заменяет его: шаблоны, карточки, цены, пагинация и поле поиска вашей темы остаются на месте.",
      "Модуль лишь определяет ранжированный список product_id, а всю остальную работу, включая ограничения магазина, продолжает выполнять штатная модель. Поэтому внешний вид и логика витрины не страдают.",
    ],
    sections=[
      dict(h="🌍 Поиск на разных языках", p=[
        "Кросс-языковой поиск работает по русским, украинским и английским индексированным записям. Покупатель может ввести запрос на одном языке, а находит товар, у которого название записано на другом. Результаты при этом показываются на активном языке витрины."]),
      dict(h="🎯 Артикулы и технические запросы", p=[
        "Точное совпадение по model, SKU, EAN, UPC, JAN, ISBN и MPN получает приоритет. Запросы вроде FTH-062, 12 V, 25 mm или 3/4 inch защищены от разбора на части, чтобы цифры и единицы измерения не терялись."]),
      dict(h="⌨️ Раскладка, синонимы, веса", p=[
        "Если посетитель набрал запрос не в той раскладке клавиатуры, модуль учтёт альтернативную раскладку и транслитерацию. Словарь синонимов связывает разные слова для одного и того же товара, а веса релевантности настраиваются под ваш каталог."]),
      dict(h="💡 Подсказки без лишнего шума", p=[
        "Автодополнение лёгкое. Подсказка при опечатке показывается только тогда, когда результатов нет, поэтому она не мешает нормальным запросам. Если у вас UniShop2, действует его собственный live-search: второй выпадающий список модуль не добавляет."]),
      dict(h="📉 Аналитика запросов", p=[
        "Отчёт «нулевая выдача» показывает, что именно искали и не нашли. Эти слова удобно превращать в синонимы или в новые товары. Статистика ведётся без хранения IP, а отслеживание кликов необязательное."]),
      dict(h="🔧 Индекс и запуск", p=[
        "Индекс перестраивается пакетами. Товар переиндексируется при добавлении, изменении и удалении, а для «грязного» индекса есть cron. Пока идёт перестройка, штатный поиск OpenCart остаётся безопасным резервом. Модуль устанавливается выключенным: включите его, постройте индекс, настройте синонимы и веса и затем следите за отчётом по запросам без результата."]),
    ]),
  uk=dict(
    intro=[
      "Покупець вводить «FTH-062» або «кабель 12 V», а штатний пошук нічого не знаходить, бо роздільник стоїть не там або назви записано іншою мовою. Smart Search PRO посилює пошук товарів OpenCart і ocStore, але не замінює його: шаблони, картки, ціни, пагінація та поле пошуку вашої теми лишаються на місці.",
      "Модуль лише визначає ранжований список product_id, а всю решту роботи, зокрема обмеження магазину, і далі виконує штатна модель. Тому вигляд і логіка вітрини не страждають.",
    ],
    sections=[
      dict(h="🌍 Пошук різними мовами", p=[
        "Крос-мовний пошук працює за російськими, українськими й англійськими індексованими записами. Покупець може ввести запит однією мовою, а знаходить товар, у якого назву записано іншою. Результати при цьому показуються активною мовою вітрини."]),
      dict(h="🎯 Артикули й технічні запити", p=[
        "Точний збіг за model, SKU, EAN, UPC, JAN, ISBN і MPN отримує пріоритет. Запити на кшталт FTH-062, 12 V, 25 mm чи 3/4 inch захищені від розбору на частини, щоб цифри й одиниці виміру не губилися."]),
      dict(h="⌨️ Розкладка, синоніми, ваги", p=[
        "Якщо відвідувач набрав запит не в тій розкладці клавіатури, модуль врахує альтернативну розкладку й транслітерацію. Словник синонімів зв'язує різні слова для того самого товару, а ваги релевантності налаштовуються під ваш каталог."]),
      dict(h="💡 Підказки без зайвого шуму", p=[
        "Автодоповнення легке. Підказка про одруківку показується лише тоді, коли результатів немає, тому вона не заважає нормальним запитам. Якщо у вас UniShop2, діє його власний live-search: другого випадного списку модуль не додає."]),
      dict(h="📉 Аналітика запитів", p=[
        "Звіт «нульова видача» показує, що саме шукали й не знайшли. Ці слова зручно перетворювати на синоніми або нові товари. Статистика ведеться без зберігання IP, а відстеження кліків необов'язкове."]),
      dict(h="🔧 Індекс і запуск", p=[
        "Індекс перебудовується пакетами. Товар переіндексується під час додавання, зміни та видалення, а для «брудного» індексу є cron. Поки триває перебудова, штатний пошук OpenCart лишається безпечним резервом. Модуль встановлюється вимкненим: увімкніть його, побудуйте індекс, налаштуйте синоніми й ваги, а тоді стежте за звітом за запитами без результату."]),
    ]),
  en=dict(
    intro=[
      "A shopper types «FTH-062» or «cable 12 V» and the standard search finds nothing, because the separator is in the wrong place or the names are written in another language. Smart Search PRO strengthens product search in OpenCart and ocStore without replacing it: the templates, product cards, prices, pagination and your theme's search field stay where they are.",
      "The module only works out a ranked list of product_id values, and the standard model keeps doing the rest, including all of the store's restrictions. That is why the look and logic of the storefront are not affected.",
    ],
    sections=[
      dict(h="🌍 Search across languages", p=[
        "Cross-language search runs over Russian, Ukrainian and English indexed records. A shopper can type a query in one language and still find a product whose name is written in another. Results are shown in the active storefront language."]),
      dict(h="🎯 Part numbers and technical queries", p=[
        "An exact match on model, SKU, EAN, UPC, JAN, ISBN and MPN gets priority. Queries such as FTH-062, 12 V, 25 mm or 3/4 inch are protected from being split apart, so numbers and units of measure are not lost."]),
      dict(h="⌨️ Layout, synonyms, weights", p=[
        "If the visitor typed in the wrong keyboard layout, the module takes the alternative layout and transliteration into account. A synonym dictionary links different words for the same product, and relevance weights are tuned to your catalog."]),
      dict(h="💡 Suggestions without noise", p=[
        "Autocomplete is lightweight. A typo suggestion appears only when there are no results, so it does not get in the way of normal queries. If you run UniShop2, its own live search stays in charge: the module does not add a second dropdown."]),
      dict(h="📉 Query analytics", p=[
        "The «zero results» report shows what people searched for and did not find. Those words are handy for turning into synonyms or new products. Statistics are kept without storing IP addresses, and click tracking is optional."]),
      dict(h="🔧 Index and launch", p=[
        "The index is rebuilt in batches. A product is reindexed when added, changed or deleted, and cron handles a «dirty» index. While a rebuild is running, the standard OpenCart search remains a safe fallback. The module is installed switched off: enable it, build the index, set up synonyms and weights, and then watch the report of queries with no results."]),
    ]),
  cover=dict(
    tagline="Быстрый поиск по индексу, RU/UA/EN",
    items=["Поиск RU/UA/EN", "Артикулы и SKU", "Раскладка клавиатуры", "Словарь синонимов", "Нулевая выдача", "Веса релевантности"],
    cards=[("Кросс-языковой поиск", "Запрос на одном языке, товар на другом"),
           ("Точные артикулы", "Приоритет model, SKU, EAN, UPC, JAN, MPN"),
           ("Технические запросы", "FTH-062, 12 V, 25 mm не разбиваются"),
           ("Раскладка и translit", "Находит и при неверной раскладке"),
           ("Отчёт без результата", "Что искали и не нашли, без хранения IP"),
           ("Штатный резерв", "Во время перестройки работает поиск OpenCart")],
    tabs=["Индекс", "Синонимы", "Веса", "Аналитика"],
    kpis=[("В индексе", "8 940"), ("Запросов", "3 215"), ("Без результата", "126")]),
)

P[83] = dict(
  ru=dict(
    intro=[
      "Вечером экран белого магазина режет глаза, а у многих телефонов и компьютеров уже включена тёмная тема системы. Uni Dark Theme PRO даёт витрине UniShop2 три режима оформления: светлый, тёмный и системный. Посетитель переключает их сам, а сайт запоминает выбор.",
      "Модуль сделан именно под UniShop2 и аккуратно перекрашивает его интерфейсы, не ломая светлый вид. Если ничего не выбрано, системный режим просто следует настройке устройства.",
    ],
    sections=[
      dict(h="🌗 Три режима оформления", p=[
        "Светлый режим оставляет магазин таким, каким он был. Тёмный включает затемнённую палитру. Системный режим смотрит на настройку устройства и сам выбирает подходящий вариант. Режим по умолчанию задаёт администратор, а посетитель может его сменить."]),
      dict(h="🔘 Где живёт переключатель", p=[
        "Переключатель можно разместить в верхней шапке. Его подпись локализована и показывает «Тёмная тема» или «Светлая тема». Альтернатива, плавающая кнопка, пригодится там, где шапка перегружена. У неё настраиваются отступы, а safe-area учитывает вырезы экрана на современных телефонах."]),
      dict(h="📱 Удобство на телефоне", p=[
        "На телефонах переключатель превращается в компактную иконку солнца или месяца, чтобы не занимать место в шапке. Полный текст при этом сохраняется для подсказки и для программ чтения с экрана, так что доступность не страдает."]),
      dict(h="🧱 Аккуратная адаптация интерфейсов", p=[
        "Тёмная адаптация изолирована: она касается только витринных интерфейсов и включается, когда активна тёмная тема. Это относится и к Product Video Gallery PRO, чья галерея получает собственную тёмную раскраску. Светлый режим при этом не меняется."]),
      dict(h="🌍 Языки", p=[
        "Подписи и настройки доступны на украинском, русском и английском. Переключатель автоматически говорит с посетителем на языке витрины."]),
      dict(h="✔️ Как внедрить", p=[
        "Установите модуль для UniShop2 и включите его, выберите режим по умолчанию и тип переключателя, затем проверьте витрину на компьютере и на телефоне. Модуль рассчитан на UniShop2, поэтому нестандартные блоки вашей сборки обязательно просмотрите в тёмном режиме отдельно."]),
    ]),
  uk=dict(
    intro=[
      "Ввечері екран білого магазину ріже очі, а в багатьох телефонів і комп'ютерів уже ввімкнена темна тема системи. Uni Dark Theme PRO дає вітрині UniShop2 три режими оформлення: світлий, темний і системний. Відвідувач перемикає їх сам, а сайт запам'ятовує вибір.",
      "Модуль зроблено саме під UniShop2, і він охайно перефарбовує його інтерфейси, не ламаючи світлий вигляд. Якщо нічого не обрано, системний режим просто слідує налаштуванню пристрою.",
    ],
    sections=[
      dict(h="🌗 Три режими оформлення", p=[
        "Світлий режим лишає магазин таким, яким він був. Темний вмикає затемнену палітру. Системний режим дивиться на налаштування пристрою й сам обирає відповідний варіант. Режим за замовчуванням задає адміністратор, а відвідувач може його змінити."]),
      dict(h="🔘 Де живе перемикач", p=[
        "Перемикач можна розмістити у верхній шапці. Його підпис локалізований і показує «Темна тема» або «Світла тема». Альтернатива, плаваюча кнопка, стане в пригоді там, де шапка перевантажена. У неї налаштовуються відступи, а safe-area враховує вирізи екрана на сучасних телефонах."]),
      dict(h="📱 Зручність на телефоні", p=[
        "На телефонах перемикач перетворюється на компактну іконку сонця або місяця, щоб не займати місце в шапці. Повний текст при цьому зберігається для підказки і для програм читання з екрана, тож доступність не страждає."]),
      dict(h="🧱 Охайна адаптація інтерфейсів", p=[
        "Темна адаптація ізольована: вона стосується лише вітринних інтерфейсів і вмикається, коли активна темна тема. Це стосується й Product Video Gallery PRO, галерея якого отримує власне темне розфарбування. Світлий режим при цьому не змінюється."]),
      dict(h="🌍 Мови", p=[
        "Підписи й налаштування доступні українською, російською та англійською. Перемикач автоматично говорить із відвідувачем мовою вітрини."]),
      dict(h="✔️ Як впровадити", p=[
        "Встановіть модуль для UniShop2 і ввімкніть його, оберіть режим за замовчуванням і тип перемикача, а тоді перевірте вітрину на комп'ютері та на телефоні. Модуль розрахований на UniShop2, тому нестандартні блоки вашої збірки обов'язково перегляньте в темному режимі окремо."]),
    ]),
  en=dict(
    intro=[
      "In the evening a white store screen hurts the eyes, and many phones and computers already run a dark system theme. Uni Dark Theme PRO gives a UniShop2 storefront three appearance modes: light, dark and system. The visitor switches them, and the site remembers the choice.",
      "The module is built specifically for UniShop2 and recolors its interfaces carefully without breaking the light look. If nothing is chosen, the system mode simply follows the device setting.",
    ],
    sections=[
      dict(h="🌗 Three appearance modes", p=[
        "Light mode leaves the store as it was. Dark mode switches on a darkened palette. System mode reads the device setting and picks the right variant itself. The administrator sets the default mode, and the visitor can change it."]),
      dict(h="🔘 Where the switch lives", p=[
        "The switch can sit in the top header. Its label is localized and reads «Dark theme» or «Light theme». The alternative, a floating button, helps where the header is crowded. Its offsets are configurable, and the safe-area handling respects screen cutouts on modern phones."]),
      dict(h="📱 Comfort on a phone", p=[
        "On phones the switch turns into a compact sun or moon icon so it does not take room in the header. The full text is kept for the tooltip and for screen readers, so accessibility does not suffer."]),
      dict(h="🧱 Careful adaptation of interfaces", p=[
        "The dark adaptation is isolated: it touches only storefront interfaces and applies when the dark theme is active. That includes Product Video Gallery PRO, whose gallery receives its own dark styling. Light mode stays unchanged."]),
      dict(h="🌍 Languages", p=[
        "Labels and settings are available in Ukrainian, Russian and English. The switch automatically speaks to the visitor in the storefront language."]),
      dict(h="✔️ Putting it to work", p=[
        "Install the module for UniShop2 and enable it, choose the default mode and the type of switch, then check the storefront on a computer and on a phone. The module is designed for UniShop2, so be sure to review any non-standard blocks of your build separately in dark mode."]),
    ]),
  cover=dict(
    tagline="Светлая, тёмная и системная тема",
    items=["Светлый режим", "Тёмный режим", "Системный режим", "Переключатель в шапке", "Плавающая кнопка", "Запоминание выбора"],
    cards=[("Три режима", "Светлый, тёмный и по настройке устройства"),
           ("Переключатель в шапке", "Локализованная подпись «Тёмная тема»"),
           ("Иконка на телефоне", "Солнце или месяц, текст остаётся для подсказки"),
           ("Плавающая кнопка", "Отступы и учёт вырезов экрана"),
           ("Изолированная адаптация", "Включая Product Video Gallery PRO"),
           ("Три языка", "Украинский, русский и английский")],
    tabs=["Режим", "Переключатель", "Кнопка", "Языки"],
    kpis=[("Режимов", "3"), ("Тёмная тема", "58%"), ("Языков", "3")]),
)

P[93] = dict(
  ru=dict(
    intro=[
      "В одном магазине бывает так, что часть товаров продаёт ФОП без НДС, а часть ТОВ с НДС. Менеджер знает итоговую цену с налогом, которую увидит покупатель, а OpenCart хранит цену без налога и добавляет ставку сверху. Приходится вручную делить и округлять. VAT Price Input PRO берёт этот расчёт на себя.",
      "Для товара ТОВ вы вводите итоговую цену с НДС, а модуль при сохранении считает цену без налога и записывает её в штатные поля. Налоговая логика OpenCart остаётся на месте и работает как обычно.",
    ],
    sections=[
      dict(h="👤 Режим ФОП", p=[
        "Для товаров ФОП цены сохраняются как есть. Налоговый класс принудительно выставляется в «Без налога», чтобы случайно выбранная ставка не добавила НДС там, где его быть не должно."]),
      dict(h="🏢 Режим ТОВ", p=[
        "Итоговая цена с НДС переводится в нетто в момент сохранения. Пересчитываются основная цена, скидки, акции и надбавки опций. Так цена, которую вы ввели, совпадает с тем, что видит покупатель после применения налога."]),
      dict(h="🧮 Ставка остаётся в OpenCart", p=[
        "Сами ставки НДС вы по-прежнему задаёте в штатных налоговых классах и ставках, а витрина применяет их обычным образом. Модуль не придумывает собственную налоговую систему, он лишь избавляет от ручного обратного расчёта."]),
      dict(h="🏷️ Строка НДС под ценой", p=[
        "Необязательная строка под ценой сообщает покупателю «НДС включён: …» или «Цена без НДС: …». Цвет текста настраивается. Модуль использует налоговую строку темы, а не добавляет вторую, и для товаров ФОП стандартную строку налога скрывает. В строке выводится только сумма с валютой, без единицы измерения."]),
      dict(h="⚠️ Предупреждение в админке", p=[
        "Чтобы цена с налогом отображалась на витрине, в OpenCart должна быть включена штатная настройка «Показывать цены с налогом». Если она выключена, в админке появится предупреждение. Саму настройку модуль не меняет."]),
      dict(h="🔗 Мост с Product Currency Input PRO", p=[
        "Когда нужно сочетание «ФОП или ТОВ плюс валюта поставщика», подключается необязательный мост с Product Currency Input PRO. Налоговую корректность проверяйте вместе с бухгалтером. Работает так: включаете модуль, настраиваете налоговый класс для ТОВ, выбираете режим в карточке товара, вводите цену с НДС и проверяете витрину, корзину и заказ."]),
    ]),
  uk=dict(
    intro=[
      "В одному магазині буває так, що частину товарів продає ФОП без ПДВ, а частину ТОВ із ПДВ. Менеджер знає підсумкову ціну з податком, яку побачить покупець, а OpenCart зберігає ціну без податку й додає ставку зверху. Доводиться вручну ділити й округлювати. VAT Price Input PRO бере цей розрахунок на себе.",
      "Для товару ТОВ ви вводите підсумкову ціну з ПДВ, а модуль під час збереження рахує ціну без податку й записує її в штатні поля. Податкова логіка OpenCart лишається на місці та працює як зазвичай.",
    ],
    sections=[
      dict(h="👤 Режим ФОП", p=[
        "Для товарів ФОП ціни зберігаються як є. Податковий клас примусово виставляється в «Без податку», щоб випадково обрана ставка не додала ПДВ там, де його бути не повинно."]),
      dict(h="🏢 Режим ТОВ", p=[
        "Підсумкова ціна з ПДВ переводиться в нетто в момент збереження. Перераховуються основна ціна, знижки, акції та надбавки опцій. Так ціна, яку ви ввели, збігається з тим, що бачить покупець після застосування податку."]),
      dict(h="🧮 Ставка лишається в OpenCart", p=[
        "Самі ставки ПДВ ви, як і раніше, задаєте в штатних податкових класах і ставках, а вітрина застосовує їх у звичайний спосіб. Модуль не вигадує власної податкової системи, він лише позбавляє ручного зворотного розрахунку."]),
      dict(h="🏷️ Рядок ПДВ під ціною", p=[
        "Необов'язковий рядок під ціною повідомляє покупцеві «ПДВ включено: …» або «Ціна без ПДВ: …». Колір тексту налаштовується. Модуль використовує податковий рядок теми, а не додає другий, і для товарів ФОП стандартний рядок податку приховує. У рядку виводиться лише сума з валютою, без одиниці виміру."]),
      dict(h="⚠️ Попередження в адмінці", p=[
        "Щоб ціна з податком відображалася на вітрині, в OpenCart має бути ввімкнене штатне налаштування «Показувати ціни з податком». Якщо воно вимкнене, в адмінці з'явиться попередження. Саме налаштування модуль не змінює."]),
      dict(h="🔗 Міст із Product Currency Input PRO", p=[
        "Коли потрібне поєднання «ФОП або ТОВ плюс валюта постачальника», підключається необов'язковий міст із Product Currency Input PRO. Податкову коректність перевіряйте разом із бухгалтером. Працює так: вмикаєте модуль, налаштовуєте податковий клас для ТОВ, обираєте режим у картці товару, вводите ціну з ПДВ і перевіряєте вітрину, кошик та замовлення."]),
    ]),
  en=dict(
    intro=[
      "In one store it can happen that some products are sold by a sole proprietor without VAT and others by a limited company with VAT. The manager knows the final price with tax that the shopper will see, while OpenCart stores the price without tax and adds the rate on top. Dividing and rounding by hand follows. VAT Price Input PRO takes that calculation over.",
      "For a company product you enter the final price with VAT, and on save the module calculates the price without tax and writes it to the standard fields. The OpenCart tax logic stays in place and works as usual.",
    ],
    sections=[
      dict(h="👤 Sole proprietor mode", p=[
        "For products of the sole proprietor, prices are saved as they are. The tax class is forced to «No tax», so a rate chosen by accident does not add VAT where there should be none."]),
      dict(h="🏢 Company mode", p=[
        "The final price with VAT is converted to net at the moment of saving. The main price, discounts, specials and option surcharges are all recalculated. The price you typed then matches what the shopper sees after tax is applied."]),
      dict(h="🧮 The rate stays in OpenCart", p=[
        "You still define the VAT rates themselves in the standard tax classes and rates, and the storefront applies them in the usual way. The module does not invent its own tax system; it just spares you the manual reverse calculation."]),
      dict(h="🏷️ A VAT line under the price", p=[
        "An optional line under the price tells the shopper «VAT included: …» or «Price without VAT: …». The text color is configurable. The module reuses the tax line of the theme rather than adding a second one, and hides the standard tax line for sole proprietor products. The line shows only an amount with currency, without a unit of measure."]),
      dict(h="⚠️ A warning in the admin", p=[
        "For prices with tax to appear on the storefront, the standard OpenCart setting «Display prices with tax» has to be on. If it is off, a warning appears in the admin. The module does not change that setting itself."]),
      dict(h="🔗 A bridge with Product Currency Input PRO", p=[
        "When you need «sole proprietor or company plus supplier currency», an optional bridge with Product Currency Input PRO is available. Check tax correctness together with your accountant. The workflow is to enable the module, set the tax class for companies, choose the mode in the product card, enter the price with VAT, and then check the storefront, cart and order."]),
    ]),
  cover=dict(
    tagline="Цена с НДС для ФОП и ТОВ",
    items=["Режим ФОП", "Режим ТОВ", "Цена с НДС в нетто", "Строка НДС под ценой", "Штатные ставки", "Мост с валютой"],
    cards=[("ФОП без НДС", "Цена как есть, класс «Без налога»"),
           ("ТОВ с НДС", "Итоговая цена переводится в нетто при сохранении"),
           ("Скидки и акции", "Пересчёт скидок, акций и надбавок опций"),
           ("Строка под ценой", "НДС включён или цена без НДС, цвет задаётся"),
           ("Штатные налоги", "Ставки остаются в классах OpenCart"),
           ("Мост с валютой", "Сочетание с Product Currency Input PRO")],
    tabs=["Товары / НДС", "Настройки", "Строка НДС", "Диагностика"],
    kpis=[("Товаров ТОВ", "420"), ("Товаров ФОП", "186"), ("Ставка", "20%")]),
)

P[94] = dict(
  ru=dict(
    intro=[
      "Не у каждого поставщика есть аккуратный XML, CSV или API. Нередко вся информация о ценах и остатках существует только на его сайте, и менеджер вручную сверяет страницы с карточками в магазине. Supplier Sync Parser PRO забирает цены, остатки, данные и новые товары прямо со страниц поставщика.",
      "Работа построена вокруг мастера: вы сканируете одну страницу товара, проверяете, что найдено, сохраняете правила и только после этого применяете изменения к каталогу. Ничего не уходит в магазин без предпросмотра.",
    ],
    sections=[
      dict(h="🧭 Мастер одной страницы", p=[
        "Вместо того чтобы писать правила вслепую, вы открываете страницу одного товара поставщика, и модуль показывает найденные значения: название, цену, остаток и другие поля. Если что-то определено неверно, правило уточняется. Под капотом используются HTML-парсинг и XPath, но работать с ними приходится через понятный интерфейс."]),
      dict(h="👁️ Предпросмотр перед записью", p=[
        "Любое изменение сначала показывается: какие товары затронуты, какие цены и остатки изменятся. Применять их к товарам OpenCart или нет, решаете вы. Для первого запуска разумно взять небольшой пакет и проверить результат."]),
      dict(h="🔗 Как находятся нужные товары", p=[
        "Существующие товары сопоставляются по SKU, EAN, UPC, MPN, URL поставщика и названию. Если на странице нашёлся товар, которого в магазине нет, модуль может захватить его как новый. Категория для такого товара выбирается вручную до создания, поэтому каталог не засоряется случайными позициями."]),
      dict(h="💶 Валюты и языки", p=[
        "Цены поставщика нормализуются, используются валюты OpenCart. Для мультиязычных магазинов выбирается язык, в котором записываются данные. Профиль поставщика объединяет URL, валюту, язык и категории."]),
      dict(h="📦 Очередь и крупные каталоги", p=[
        "Большие каталоги обрабатываются очередью с пакетной загрузкой. В интерфейсе есть AJAX, фильтры и пагинация, чтобы работать с тысячами записей без зависаний. Журналы, история и сводки запусков показывают, что и когда обработалось."]),
      dict(h="🚦 Ограничения и ответственность", p=[
        "В выключенном состоянии очередь, cron и парсинг не работают. Парсите только то, что вы вправе использовать, и учитывайте нагрузку на сайт поставщика. Порядок такой: создайте профиль, просканируйте один товар и сохраните правила, соберите очередь, обработайте небольшой пакет и сверьте предпросмотр."]),
    ]),
  uk=dict(
    intro=[
      "Не кожен постачальник має охайний XML, CSV чи API. Нерідко вся інформація про ціни й залишки існує лише на його сайті, а менеджер вручну звіряє сторінки з картками в магазині. Supplier Sync Parser PRO забирає ціни, залишки, дані та нові товари прямо зі сторінок постачальника.",
      "Робота побудована навколо майстра: ви скануєте одну сторінку товару, перевіряєте, що знайдено, зберігаєте правила й лише після цього застосовуєте зміни до каталогу. Нічого не потрапляє в магазин без попереднього перегляду.",
    ],
    sections=[
      dict(h="🧭 Майстер однієї сторінки", p=[
        "Замість того щоб писати правила наосліп, ви відкриваєте сторінку одного товару постачальника, і модуль показує знайдені значення: назву, ціну, залишок та інші поля. Якщо щось визначено хибно, правило уточнюється. Під капотом використовуються HTML-парсинг і XPath, але працювати з ними доводиться через зрозумілий інтерфейс."]),
      dict(h="👁️ Попередній перегляд перед записом", p=[
        "Будь-яка зміна спершу показується: які товари зачеплено, які ціни й залишки зміняться. Застосовувати їх до товарів OpenCart чи ні, вирішуєте ви. Для першого запуску розумно взяти невеликий пакет і перевірити результат."]),
      dict(h="🔗 Як знаходяться потрібні товари", p=[
        "Наявні товари зіставляються за SKU, EAN, UPC, MPN, URL постачальника й назвою. Якщо на сторінці знайшовся товар, якого немає в магазині, модуль може захопити його як новий. Категорія для такого товару обирається вручну до створення, тому каталог не засмічується випадковими позиціями."]),
      dict(h="💶 Валюти й мови", p=[
        "Ціни постачальника нормалізуються, використовуються валюти OpenCart. Для багатомовних магазинів обирається мова, якою записуються дані. Профіль постачальника поєднує URL, валюту, мову й категорії."]),
      dict(h="📦 Черга і великі каталоги", p=[
        "Великі каталоги обробляються чергою з пакетним завантаженням. В інтерфейсі є AJAX, фільтри та пагінація, щоб працювати з тисячами записів без зависань. Журнали, історія й зведення запусків показують, що і коли оброблено."]),
      dict(h="🚦 Обмеження та відповідальність", p=[
        "У вимкненому стані черга, cron і парсинг не працюють. Парсьте лише те, що ви вправі використовувати, і враховуйте навантаження на сайт постачальника. Порядок такий: створіть профіль, просканіть один товар і збережіть правила, зберіть чергу, обробіть невеликий пакет і звірте попередній перегляд."]),
    ]),
  en=dict(
    intro=[
      "Not every supplier has a tidy XML, CSV or API. Quite often all the information about prices and stock exists only on their website, and a manager compares the pages against store cards by hand. Supplier Sync Parser PRO pulls prices, stock, product data and new products straight from supplier pages.",
      "The work is built around a wizard: you scan one product page, check what was found, save the rules and only then apply the changes to the catalog. Nothing reaches the store without a preview.",
    ],
    sections=[
      dict(h="🧭 The one-page wizard", p=[
        "Instead of writing rules blindly, you open one supplier product page and the module shows the values it found: name, price, stock and other fields. If something was detected wrongly, the rule is refined. HTML parsing and XPath work under the hood, but you handle them through a clear interface."]),
      dict(h="👁️ A preview before writing", p=[
        "Any change is shown first: which products are affected and which prices and stock will change. Whether to apply them to OpenCart products is your decision. For a first run it is sensible to take a small batch and check the result."]),
      dict(h="🔗 How the right products are found", p=[
        "Existing products are matched by SKU, EAN, UPC, MPN, supplier URL and name. If a page contains a product the store does not have, the module can capture it as new. The category for such a product is chosen by hand before it is created, so the catalog is not cluttered with random items."]),
      dict(h="💶 Currencies and languages", p=[
        "Supplier prices are normalized using OpenCart currencies. For multilingual stores you choose the language in which the data is written. A supplier profile combines the URL, currency, language and categories."]),
      dict(h="📦 The queue and large catalogs", p=[
        "Large catalogs are processed through a queue with batch handling. The interface offers AJAX, filters and pagination so thousands of records can be handled without freezing. Logs, history and run summaries show what was processed and when."]),
      dict(h="🚦 Limits and responsibility", p=[
        "When the module is off, the queue, cron and parsing do not run. Parse only what you are entitled to use, and keep in mind the load on the supplier's site. The order is to create a profile, scan one product and save the rules, build the queue, process a small batch and review the preview."]),
    ]),
  cover=dict(
    tagline="Цены и остатки с сайтов поставщиков",
    items=["Мастер сканирования", "XPath-правила", "Цены и остатки", "Новые товары", "Очередь обработки", "Журнал запусков"],
    cards=[("Скан одной страницы", "Проверка найденных полей до сохранения правил"),
           ("Предпросмотр", "Изменения видны до применения к товарам"),
           ("Сопоставление", "SKU, EAN, UPC, MPN, URL и название"),
           ("Новые товары", "Категория выбирается вручную до создания"),
           ("Очередь и AJAX", "Пакеты для больших каталогов, фильтры"),
           ("История запусков", "Журналы и сводки каждого прогона")],
    tabs=["Поставщики", "Правила", "Очередь", "Журнал"],
    kpis=[("Поставщиков", "6"), ("В очереди", "1 480"), ("Обновлено", "932")]),
)

P[95] = dict(
  ru=dict(
    intro=[
      "Если ваши описания, обзоры и статьи кто-то копирует целиком, обычно виноват не злой умысел, а простота действия: выделил, скопировал, вставил. Source Copy Protection PRO добавляет к скопированному тексту ссылку на источник и при необходимости ограничивает типовые способы копирования.",
      "Сначала вы выбираете режим, затем группы страниц или отдельные маршруты, и для каждого можно задать свои настройки. Важно трезво понимать задачу: модуль снижает простое копирование и возвращает ссылку на источник, но не остановит технически подготовленного человека.",
    ],
    sections=[
      dict(h="🎚️ Четыре режима", p=[
        "Режим «Нет» отключает защиту для выбранной группы. «Добавлять источник» оставляет копирование свободным, но при вставке в текст попадает ваша ссылка. «Максимальная блокировка» запрещает основные способы копирования. «Источник + техническая блокировка» объединяет оба подхода."]),
      dict(h="🔗 Ссылка на источник", p=[
        "При копировании в буфер к тексту добавляется настроенная строка со ссылкой на ваш сайт. Тексты источника задаются в настройках, так что подпись выглядит так, как вы хотите. Для читателя, который просто цитирует материал, ничего не ломается, а ссылка попадает туда, куда вставили текст."]),
      dict(h="🚫 Что можно заблокировать", p=[
        "Блокировка охватывает контекстное меню (вне исключённых селекторов или везде), выделение текста, перетаскивание, события copy и cut, а также типовые сочетания клавиш копирования и вызова инструментов разработчика. Включать всё сразу не обязательно: выбирайте только то, что нужно."],
        ul=["Правая кнопка мыши", "Выделение и перетаскивание", "События copy и cut", "Горячие клавиши копирования"]),
      dict(h="🗺️ Группы страниц и маршруты", p=[
        "Можно защитить карточки товаров и статьи, а оформление заказа или формы оставить как есть. Для нестандартных страниц задаются собственные маршруты с отдельными настройками. Исключённые селекторы помогают не мешать там, где посетителю нужно выделять текст, например в полях ввода."]),
      dict(h="🧹 Нулевая нагрузка в выключенном состоянии", p=[
        "Когда модуль выключен, на витрине нет событий, JavaScript, CSS и дополнительных запросов. Он ничего не добавляет, пока вы его не включите."]),
      dict(h="✅ Как внедрить", p=[
        "Выберите режим и тексты источника, укажите группы страниц и исключения, проверьте копирование на витрине и только после этого включите модуль. Проверка нужна, чтобы убедиться: блокировка не мешает покупателям пользоваться формами."]),
    ]),
  uk=dict(
    intro=[
      "Якщо ваші описи, огляди й статті хтось копіює повністю, зазвичай винен не злий намір, а простота дії: виділив, скопіював, вставив. Source Copy Protection PRO додає до скопійованого тексту посилання на джерело й за потреби обмежує типові способи копіювання.",
      "Спочатку ви обираєте режим, потім групи сторінок або окремі маршрути, і для кожного можна задати свої налаштування. Важливо тверезо розуміти завдання: модуль зменшує просте копіювання й повертає посилання на джерело, але не зупинить технічно підготовленої людини.",
    ],
    sections=[
      dict(h="🎚️ Чотири режими", p=[
        "Режим «Немає» вимикає захист для вибраної групи. «Додавати джерело» лишає копіювання вільним, але під час вставки в текст потрапляє ваше посилання. «Максимальне блокування» забороняє основні способи копіювання. «Джерело + технічне блокування» поєднує обидва підходи."]),
      dict(h="🔗 Посилання на джерело", p=[
        "Під час копіювання в буфер до тексту додається налаштований рядок із посиланням на ваш сайт. Тексти джерела задаються в налаштуваннях, тож підпис виглядає так, як ви хочете. Для читача, який просто цитує матеріал, нічого не ламається, а посилання потрапляє туди, куди вставили текст."]),
      dict(h="🚫 Що можна заблокувати", p=[
        "Блокування охоплює контекстне меню (поза виключеними селекторами або скрізь), виділення тексту, перетягування, події copy і cut, а також типові поєднання клавіш копіювання та виклику інструментів розробника. Вмикати все одразу не обов'язково: обирайте лише потрібне."],
        ul=["Права кнопка миші", "Виділення й перетягування", "Події copy і cut", "Гарячі клавіші копіювання"]),
      dict(h="🗺️ Групи сторінок і маршрути", p=[
        "Можна захистити картки товарів і статті, а оформлення замовлення чи форми залишити як є. Для нестандартних сторінок задаються власні маршрути з окремими налаштуваннями. Виключені селектори допомагають не заважати там, де відвідувачу потрібно виділяти текст, наприклад у полях введення."]),
      dict(h="🧹 Нульове навантаження у вимкненому стані", p=[
        "Коли модуль вимкнений, на вітрині немає подій, JavaScript, CSS і додаткових запитів. Він нічого не додає, доки ви його не ввімкнете."]),
      dict(h="✅ Як впровадити", p=[
        "Оберіть режим і тексти джерела, вкажіть групи сторінок і винятки, перевірте копіювання на вітрині та лише після цього ввімкніть модуль. Перевірка потрібна, щоб переконатися: блокування не заважає покупцям користуватися формами."]),
    ]),
  en=dict(
    intro=[
      "When someone copies your descriptions, reviews and articles wholesale, it is usually not malice but the ease of the act: select, copy, paste. Source Copy Protection PRO appends a link to the source to copied text and, where needed, restricts the typical ways of copying.",
      "First you choose a mode, then page groups or individual routes, and each can have its own settings. It helps to be realistic about the task: the module reduces simple copying and brings back a source link, but it will not stop a technically skilled person.",
    ],
    sections=[
      dict(h="🎚️ Four modes", p=[
        "The «None» mode switches protection off for the chosen group. «Add source» leaves copying free but puts your link into the pasted text. «Maximum blocking» forbids the main ways of copying. «Source plus technical blocking» combines both approaches."]),
      dict(h="🔗 The source link", p=[
        "When text is copied to the clipboard, a configured line with a link to your site is added. The source texts are set in the settings, so the signature reads the way you want. For a reader who simply quotes the material nothing breaks, and the link lands wherever the text is pasted."]),
      dict(h="🚫 What can be blocked", p=[
        "Blocking covers the context menu (outside excluded selectors or everywhere), text selection, dragging, the copy and cut events, and the usual key combinations for copying and for opening developer tools. You do not have to switch on everything at once: pick only what you need."],
        ul=["Right mouse button", "Selection and dragging", "Copy and cut events", "Copy keyboard shortcuts"]),
      dict(h="🗺️ Page groups and routes", p=[
        "You can protect product cards and articles while leaving checkout or forms alone. Non-standard pages get their own routes with separate settings. Excluded selectors help avoid interference where a visitor needs to select text, for example in input fields."]),
      dict(h="🧹 Zero footprint when off", p=[
        "When the module is off, the storefront has no events, JavaScript, CSS or extra requests. It adds nothing until you enable it."]),
      dict(h="✅ Putting it to work", p=[
        "Choose a mode and the source texts, specify page groups and exclusions, test copying on the storefront and only then enable the module. The test is there to confirm that blocking does not get in the way of shoppers using forms."]),
    ]),
  cover=dict(
    tagline="Ссылка на источник при копировании",
    items=["Ссылка на источник", "Четыре режима", "Блокировка меню", "Запрет выделения", "Группы страниц", "Свои маршруты"],
    cards=[("Режимы защиты", "Нет, источник, блокировка или оба сразу"),
           ("Текст со ссылкой", "К скопированному тексту добавляется источник"),
           ("Блокировка действий", "Меню, выделение, drag, copy, cut, горячие клавиши"),
           ("Группы страниц", "Отдельные настройки для разных разделов"),
           ("Исключённые селекторы", "Поля ввода остаются рабочими"),
           ("Нулевая нагрузка", "В выключенном виде ни JS, ни CSS")],
    tabs=["Режим", "Страницы", "Блокировка", "Тексты"],
    kpis=[("Групп", "4"), ("Маршрутов", "7"), ("Режим", "Источник")]),
)

P[98] = dict(
  ru=dict(
    intro=[
      "Магазину нужны понятные адреса вида /pylesos-xyz вместо /index.php?route=product/product, но покупать для этого набор автоматизации не всегда имеет смысл. SEO URL Generator FREE закрывает базовую задачу бесплатно: генерирует ЧПУ для товаров, категорий, производителей и других сущностей и умеет делать отдельные редиректы.",
      "Это лёгкий инструмент для небольших и средних каталогов. Если же вы собираетесь генерировать адреса сразу для сотен товаров и нуждаетесь в диагностике, для этого есть платный SEO URL PRO.",
    ],
    sections=[
      dict(h="🔤 Что генерируется", p=[
        "Модуль создаёт SEO URL для товаров, категорий, производителей и других сущностей магазина. Вы открываете товар или категорию и генерируете адрес по названию, не придумывая его вручную. Результат сохраняется в стандартные SEO-поля OpenCart."]),
      dict(h="🔁 Когда название поменялось", p=[
        "Есть опция обновления старого SEO URL при изменении названия сущности. Включите её, если хотите, чтобы адрес следовал за названием. Если же старые ссылки уже проиндексированы, добавьте к ним редирект, чтобы посетители и поисковики попадали на новое место."]),
      dict(h="➡️ Свои редиректы", p=[
        "Редиректы настраиваются отдельно для товаров, категорий и производителей. Это нужно, когда у сущности меняется адрес и прежний нужно присвоить другой странице. Вручную писать правила в .htaccess не придётся."]),
      dict(h="🛡️ Строгий режим OFF", p=[
        "В модуле действует строгий режим OFF: события UniShop2 News создаются только после ручного включения. Пока вы его не включили, они не появляются и ничего не добавляют в работу магазина."]),
      dict(h="🧰 Совместимость", p=[
        "Модуль рассчитан на CodeCart 3.0.5.2, OpenCart 3.x и ocStore 3.0.4.1 и работает на PHP 7.4–8.5. Бесплатная версия не заменяет массовую генерацию и расширенную диагностику SEO URL PRO."]),
      dict(h="🚀 Быстрый старт", p=[
        "Установите и включите модуль, откройте товар или категорию, сгенерируйте SEO URL, а при смене адреса добавьте редирект. Этого достаточно, чтобы навести порядок в адресах небольшого каталога."]),
    ]),
  uk=dict(
    intro=[
      "Магазину потрібні зрозумілі адреси на кшталт /pylosos-xyz замість /index.php?route=product/product, але купувати для цього набір автоматизації не завжди має сенс. SEO URL Generator FREE закриває базове завдання безкоштовно: генерує ЧПУ для товарів, категорій, виробників та інших сутностей і вміє робити окремі редиректи.",
      "Це легкий інструмент для малих і середніх каталогів. Якщо ж ви збираєтеся генерувати адреси одразу для сотень товарів і потребуєте діагностики, для цього є платний SEO URL PRO.",
    ],
    sections=[
      dict(h="🔤 Що генерується", p=[
        "Модуль створює SEO URL для товарів, категорій, виробників та інших сутностей магазину. Ви відкриваєте товар чи категорію й генеруєте адресу за назвою, не вигадуючи її вручну. Результат зберігається в стандартні SEO-поля OpenCart."]),
      dict(h="🔁 Коли назву змінено", p=[
        "Є опція оновлення старого SEO URL під час зміни назви сутності. Увімкніть її, якщо хочете, щоб адреса слідувала за назвою. Якщо ж старі посилання вже проіндексовано, додайте до них редирект, щоб відвідувачі й пошуковики потрапляли на нове місце."]),
      dict(h="➡️ Власні редиректи", p=[
        "Редиректи налаштовуються окремо для товарів, категорій і виробників. Це потрібно, коли в сутності змінюється адреса й попередню треба присвоїти іншій сторінці. Вручну писати правила в .htaccess не доведеться."]),
      dict(h="🛡️ Строгий режим OFF", p=[
        "У модулі діє строгий режим OFF: події UniShop2 News створюються лише після ручного ввімкнення. Доки ви його не ввімкнули, вони не з'являються й нічого не додають до роботи магазину."]),
      dict(h="🧰 Сумісність", p=[
        "Модуль розрахований на CodeCart 3.0.5.2, OpenCart 3.x та ocStore 3.0.4.1 і працює на PHP 7.4–8.5. Безкоштовна версія не замінює масову генерацію та розширену діагностику SEO URL PRO."]),
      dict(h="🚀 Швидкий старт", p=[
        "Встановіть і ввімкніть модуль, відкрийте товар чи категорію, згенеруйте SEO URL, а в разі зміни адреси додайте редирект. Цього достатньо, щоб навести лад в адресах невеликого каталогу."]),
    ]),
  en=dict(
    intro=[
      "A store needs readable addresses such as /vacuum-cleaner-xyz instead of /index.php?route=product/product, but buying an automation suite for that does not always make sense. SEO URL Generator FREE covers the basic task at no cost: it generates clean URLs for products, categories, manufacturers and other entities and can create individual redirects.",
      "It is a light tool for small and mid-sized catalogs. If you plan to generate addresses for hundreds of products at once and need diagnostics, the paid SEO URL PRO exists for that.",
    ],
    sections=[
      dict(h="🔤 What gets generated", p=[
        "The module creates SEO URLs for products, categories, manufacturers and other store entities. You open a product or category and generate an address from its name instead of inventing it by hand. The result is stored in the standard OpenCart SEO fields."]),
      dict(h="🔁 When the name changes", p=[
        "An option updates the old SEO URL when the name of an entity changes. Turn it on if you want the address to follow the name. If the old links are already indexed, add a redirect for them so that visitors and search engines land in the new place."]),
      dict(h="➡️ Your own redirects", p=[
        "Redirects are configured separately for products, categories and manufacturers. They are needed when an entity's address changes and the previous one must be assigned to another page. No hand-written .htaccess rules are required."]),
      dict(h="🛡️ Strict OFF mode", p=[
        "The module follows a strict OFF mode: UniShop2 News events are created only after a manual switch-on. Until you enable them, they do not appear and add nothing to the way the store works."]),
      dict(h="🧰 Compatibility", p=[
        "The module is built for CodeCart 3.0.5.2, OpenCart 3.x and ocStore 3.0.4.1 and runs on PHP 7.4 to 8.5. The free version does not replace the bulk generation and extended diagnostics of SEO URL PRO."]),
      dict(h="🚀 Quick start", p=[
        "Install and enable the module, open a product or category, generate the SEO URL, and add a redirect if the address changes. That is enough to bring order to the addresses of a small catalog."]),
    ]),
  cover=dict(
    tagline="Бесплатные ЧПУ и редиректы",
    items=["Генерация SEO URL", "Товары и категории", "Производители", "Свои редиректы", "Обновление адреса", "Бесплатная версия"],
    cards=[("Генерация ЧПУ", "Адрес по названию товара, категории, бренда"),
           ("Свои редиректы", "Для товаров, категорий и производителей"),
           ("Смена названия", "Опция обновления старого SEO URL"),
           ("Строгий режим OFF", "События UniShop2 News только после включения"),
           ("PHP 7.4–8.5", "OpenCart 3.x, ocStore 3.0.4.1, CodeCart"),
           ("Путь к PRO", "Массовая генерация и диагностика в SEO URL PRO")],
    tabs=["Генерация", "Редиректы", "Настройки", "Совместимость"],
    kpis=[("URL создано", "640"), ("Редиректов", "21"), ("Версия", "FREE")]),
)

P[100] = dict(
  ru=dict(
    intro=[
      "Спамеры редко заполняют форму руками: они шлют POST-запросы напрямую, в обход страницы. Поэтому защита, которая живёт только в браузере, малоэффективна. reCAPTCHA Security PRO проверяет посетителя на сервере и делает это до того, как защищаемое действие будет выполнено.",
      "Для проверки используются Google reCAPTCHA или hCaptcha, скрытое антиспам-поле, время заполнения формы и точные маршрутные политики. Модуль работает со стандартными формами OpenCart и умеет прикрывать нестандартные POST и AJAX-обработчики.",
    ],
    sections=[
      dict(h="🧱 Несколько слоёв проверки", p=[
        "Помимо капчи провайдера работает скрытое антиспам-поле, которое человек не видит, а бот заполняет. Контролируется и минимальное время заполнения формы: если форма отправлена слишком быстро, это подозрительно. Сервер дополнительно проверяет hostname и action, а пороги риска задаются отдельно для регистрации, отзывов, входа и checkout."]),
      dict(h="⏱️ Отложенная загрузка", p=[
        "В режиме «при отправке» Google JavaScript заранее не загружается. Страница остаётся лёгкой, пока посетитель не начал отправлять форму. Это заметно, например, на страницах, где форма стоит в самом низу."]),
      dict(h="📬 Какие формы защищены", p=[
        "Защищаются контакты, вход, восстановление пароля и выбранные формы. Для форм UniShop2 и сторонних модулей задаются точные маршруты, чтобы проверка срабатывала именно там, где нужно, а не на всём подряд."]),
      dict(h="🧪 Тестовый режим", p=[
        "Нестандартные формы лучше сначала включать в тестовом режиме. В нём модуль записывает результаты проверки, но не блокирует покупателей. Когда вы убедились, что политика работает правильно, можно переходить к реальной блокировке."]),
      dict(h="📋 Журнал и секреты", p=[
        "Журнал имеет фильтры, сортировку и пагинацию, а причины блокировок записаны понятным языком. Секретные ключи не возвращаются в браузер и не попадают в код страницы."]),
      dict(h="🔑 Подключение", p=[
        "Создайте ключи в консоли выбранного провайдера для нужного режима и домена. Задайте порог (для v3 по умолчанию 0,50), маршрутные политики и отложенную загрузку, затем выберите модуль CAPTCHA в настройках магазина. Стандартная CAPTCHA OpenCart защищает только вызывающие её контроллеры, а этот модуль добавляет серверную проверку и закрывает нестандартные формы. В выключенном состоянии нагрузки и событий на витрине нет."]),
    ]),
  uk=dict(
    intro=[
      "Спамери рідко заповнюють форму руками: вони шлють POST-запити напряму, в обхід сторінки. Тому захист, що живе лише в браузері, малоефективний. reCAPTCHA Security PRO перевіряє відвідувача на сервері й робить це до того, як захищена дія буде виконана.",
      "Для перевірки використовуються Google reCAPTCHA або hCaptcha, приховане антиспам-поле, час заповнення форми та точні маршрутні політики. Модуль працює зі стандартними формами OpenCart і вміє прикривати нестандартні POST та AJAX-обробники.",
    ],
    sections=[
      dict(h="🧱 Кілька шарів перевірки", p=[
        "Крім капчі провайдера працює приховане антиспам-поле, яке людина не бачить, а бот заповнює. Контролюється й мінімальний час заповнення форми: якщо форму надіслано надто швидко, це підозріло. Сервер додатково перевіряє hostname та action, а пороги ризику задаються окремо для реєстрації, відгуків, входу й checkout."]),
      dict(h="⏱️ Відкладене завантаження", p=[
        "У режимі «під час надсилання» Google JavaScript заздалегідь не завантажується. Сторінка лишається легкою, доки відвідувач не почав надсилати форму. Це помітно, наприклад, на сторінках, де форма стоїть унизу."]),
      dict(h="📬 Які форми захищені", p=[
        "Захищаються контакти, вхід, відновлення пароля та вибрані форми. Для форм UniShop2 і сторонніх модулів задаються точні маршрути, щоб перевірка спрацьовувала саме там, де потрібно, а не на всьому підряд."]),
      dict(h="🧪 Тестовий режим", p=[
        "Нестандартні форми краще спершу вмикати в тестовому режимі. У ньому модуль записує результати перевірки, але не блокує покупців. Коли ви переконалися, що політика працює правильно, можна переходити до реального блокування."]),
      dict(h="📋 Журнал і секрети", p=[
        "Журнал має фільтри, сортування та пагінацію, а причини блокувань записано зрозумілою мовою. Секретні ключі не повертаються в браузер і не потрапляють у код сторінки."]),
      dict(h="🔑 Підключення", p=[
        "Створіть ключі в консолі обраного провайдера для потрібного режиму та домену. Задайте поріг (для v3 за замовчуванням 0,50), маршрутні політики та відкладене завантаження, а тоді оберіть модуль CAPTCHA в налаштуваннях магазину. Стандартна CAPTCHA OpenCart захищає лише контролери, які її викликають, а цей модуль додає серверну перевірку й закриває нестандартні форми. У вимкненому стані навантаження і подій на вітрині немає."]),
    ]),
  en=dict(
    intro=[
      "Spammers rarely fill in a form by hand: they send POST requests directly, bypassing the page. That is why protection that lives only in the browser is weak. reCAPTCHA Security PRO checks the visitor on the server, and it does so before the protected action is carried out.",
      "The check uses Google reCAPTCHA or hCaptcha, a hidden anti-spam field, form fill time and exact route policies. The module works with standard OpenCart forms and can cover non-standard POST and AJAX handlers.",
    ],
    sections=[
      dict(h="🧱 Several layers of checking", p=[
        "Besides the provider captcha there is a hidden anti-spam field that a person never sees and a bot fills in. The minimum form fill time is also monitored: a form submitted too quickly is suspicious. The server additionally verifies hostname and action, and risk thresholds are set separately for registration, reviews, login and checkout."]),
      dict(h="⏱️ Deferred loading", p=[
        "In the «on submit» mode, Google JavaScript is not loaded in advance. The page stays light until the visitor starts submitting a form, which is noticeable, for example, on pages where the form sits at the very bottom."]),
      dict(h="📬 Which forms are protected", p=[
        "Contact, login, password recovery and selected forms are covered. For UniShop2 forms and third-party modules you set exact routes, so the check fires precisely where needed rather than everywhere."]),
      dict(h="🧪 Test mode", p=[
        "Non-standard forms are best enabled in test mode first. In it the module records the results of the check but does not block shoppers. Once you are sure the policy works correctly, you can move to real blocking."]),
      dict(h="📋 Log and secrets", p=[
        "The log has filters, sorting and pagination, and the reasons for blocks are written in plain language. Secret keys are never returned to the browser and do not end up in the page code."]),
      dict(h="🔑 Connecting it", p=[
        "Create keys in the console of the chosen provider for the right mode and domain. Set the threshold (0.50 for v3), the route policies and deferred loading, then select the CAPTCHA module in the store settings. The standard OpenCart captcha protects only the controllers that call it, while this module adds a server-side check and covers non-standard forms. When the module is off there is no load and no storefront events."]),
    ]),
  cover=dict(
    tagline="Серверная защита форм от спама",
    items=["reCAPTCHA или hCaptcha", "Скрытое поле", "Время заполнения", "Пороги риска", "Маршрутные политики", "Журнал блокировок"],
    cards=[("Проверка на сервере", "До выполнения защищаемого действия"),
           ("Скрытое поле", "Ловушка для ботов и контроль скорости"),
           ("Пороги по формам", "Вход, регистрация, отзывы и checkout отдельно"),
           ("Отложенная загрузка", "Скрипт не грузится, пока форма не отправлена"),
           ("Тестовый режим", "Нестандартные формы без блокировки покупателей"),
           ("Журнал причин", "Фильтры, сортировка, секретные ключи скрыты")],
    tabs=["Провайдер", "Политики", "Формы", "Журнал"],
    kpis=[("Проверок", "2 960"), ("Заблокировано", "148"), ("Порог v3", "0,50")]),
)

P[101] = dict(
  ru=dict(
    intro=[
      "Фото показывают, как выглядит товар, а видео показывает, как он работает: как собирается кронштейн, как звучит колонка, как садится куртка. Product Video Gallery PRO добавляет ролики прямо в галерею товара, рядом с обычными фотографиями, а не отдельным блоком где-то внизу страницы.",
      "Поддерживаются YouTube, Vimeo, TikTok, Facebook, Rutube, VK и OK. Администратору достаточно вставить ссылку, остальное модуль берёт на себя.",
    ],
    sections=[
      dict(h="🎬 Видео в одном ряду с фото", p=[
        "В карточке товара на вкладке «Изображения» вы добавляете ссылку на видео, и ролик встаёт в галерею. Покупатель листает фотографии и видео одним жестом, не покидая привычного блока. Это удобно и на компьютере, и на телефоне."],
        ul=["YouTube, Vimeo, TikTok", "Facebook, Rutube, VK, OK"]),
      dict(h="💾 Где хранятся данные", p=[
        "Видео хранятся в базе данных, а не в кеше, так что очистка кеша их не затрагивает. Финальное сохранение выполняется штатной кнопкой «Сохранить» товара. Таблицы видео по умолчанию не удаляются при удалении модуля, чтобы не потерять данные."]),
      dict(h="📝 Порядок с YouTube в описании", p=[
        "Если в описании товара уже вставлен YouTube iframe, модуль приводит его в порядок: подставляет embed URL, title, allow и allowfullscreen. Старые вставки перестают быть набором разнородного кода и работают единообразно."]),
      dict(h="🔎 Разметка VideoObject", p=[
        "Для видео галереи и YouTube из описания выводится единый VideoObject JSON-LD. Дубли не создаются, даже если один и тот же ролик встречается в двух местах. Это помогает поисковикам лучше понять, что на странице есть видео."]),
      dict(h="🖼️ Миниатюры", p=[
        "Внешние миниатюры кешируются локально и отдаются через image/cache. Страница не зависит от доступности сторонних серверов в момент загрузки превью."]),
      dict(h="🧩 Темы и запуск", p=[
        "Модуль мягко интегрируется со стандартной темой, UniShop2 и CodeCart PRO Theme. Включите модуль и проверьте провайдеров, добавьте ссылку на видео в карточке товара, сохраните товар и посмотрите галерею на витрине. Для тёмной версии UniShop2 есть адаптация в Uni Dark Theme PRO."]),
    ]),
  uk=dict(
    intro=[
      "Фото показують, як виглядає товар, а відео показує, як він працює: як збирається кронштейн, як звучить колонка, як сидить куртка. Product Video Gallery PRO додає ролики просто в галерею товару, поруч зі звичайними фотографіями, а не окремим блоком десь унизу сторінки.",
      "Підтримуються YouTube, Vimeo, TikTok, Facebook, Rutube, VK та OK. Адміністраторові достатньо вставити посилання, решту модуль бере на себе.",
    ],
    sections=[
      dict(h="🎬 Відео в одному ряду з фото", p=[
        "У картці товару на вкладці «Зображення» ви додаєте посилання на відео, і ролик стає в галерею. Покупець гортає фотографії та відео одним жестом, не залишаючи звичного блока. Це зручно і на комп'ютері, і на телефоні."],
        ul=["YouTube, Vimeo, TikTok", "Facebook, Rutube, VK, OK"]),
      dict(h="💾 Де зберігаються дані", p=[
        "Відео зберігаються в базі даних, а не в кеші, тож очищення кешу їх не зачіпає. Фінальне збереження виконується штатною кнопкою «Зберегти» товару. Таблиці відео за замовчуванням не видаляються під час видалення модуля, щоб не втратити дані."]),
      dict(h="📝 Лад із YouTube в описі", p=[
        "Якщо в описі товару вже вставлено YouTube iframe, модуль наводить у ньому лад: підставляє embed URL, title, allow та allowfullscreen. Старі вставки перестають бути набором різнорідного коду й працюють однаково."]),
      dict(h="🔎 Розмітка VideoObject", p=[
        "Для відео галереї та YouTube з опису виводиться єдиний VideoObject JSON-LD. Дублі не створюються, навіть якщо один і той самий ролик трапляється у двох місцях. Це допомагає пошуковикам краще зрозуміти, що на сторінці є відео."]),
      dict(h="🖼️ Мініатюри", p=[
        "Зовнішні мініатюри кешуються локально й віддаються через image/cache. Сторінка не залежить від доступності сторонніх серверів у момент завантаження превʼю."]),
      dict(h="🧩 Теми і запуск", p=[
        "Модуль м'яко інтегрується зі стандартною темою, UniShop2 та CodeCart PRO Theme. Увімкніть модуль і перевірте провайдерів, додайте посилання на відео в картці товару, збережіть товар і подивіться галерею на вітрині. Для темної версії UniShop2 є адаптація в Uni Dark Theme PRO."]),
    ]),
  en=dict(
    intro=[
      "Photos show how a product looks, while video shows how it works: how a bracket is assembled, how a speaker sounds, how a jacket fits. Product Video Gallery PRO puts clips right into the product gallery next to ordinary photographs, rather than in a separate block somewhere at the bottom of the page.",
      "YouTube, Vimeo, TikTok, Facebook, Rutube, VK and OK are supported. The administrator only has to paste a link, and the module handles the rest.",
    ],
    sections=[
      dict(h="🎬 Video in line with photos", p=[
        "On the Images tab of the product card you add a video link and the clip takes its place in the gallery. The shopper flips through photos and videos with one gesture without leaving the familiar block. It is comfortable on a computer and on a phone alike."],
        ul=["YouTube, Vimeo, TikTok", "Facebook, Rutube, VK, OK"]),
      dict(h="💾 Where data is stored", p=[
        "Videos are stored in the database, not in the cache, so clearing the cache does not affect them. The final save is done by the standard Save button of the product. Video tables are not removed by default when the module is uninstalled, so data is not lost."]),
      dict(h="📝 Tidying YouTube in descriptions", p=[
        "If a YouTube iframe has already been pasted into a product description, the module tidies it: it sets the embed URL, title, allow and allowfullscreen. Old embeds stop being a patchwork of different code and behave the same way."]),
      dict(h="🔎 VideoObject markup", p=[
        "A single VideoObject JSON-LD is output for gallery videos and for YouTube from the description. No duplicates are created even if the same clip appears in two places. This helps search engines understand that the page has video."]),
      dict(h="🖼️ Thumbnails", p=[
        "External thumbnails are cached locally and served through image/cache. The page does not depend on third-party servers being available at the moment the preview loads."]),
      dict(h="🧩 Themes and launch", p=[
        "The module integrates softly with the standard theme, UniShop2 and CodeCart PRO Theme. Enable it and check the providers, add a video link in the product card, save the product and look at the gallery on the storefront. For the dark version of UniShop2 there is an adaptation in Uni Dark Theme PRO."]),
    ]),
  cover=dict(
    tagline="Видео рядом с фото товара",
    items=["Видео в галерее", "YouTube и Vimeo", "TikTok и Facebook", "Rutube, VK, OK", "VideoObject JSON-LD", "Кеш миниатюр"],
    cards=[("Семь провайдеров", "YouTube, Vimeo, TikTok, Facebook, Rutube, VK, OK"),
           ("Вставка по ссылке", "Вкладка Изображения в карточке товара"),
           ("Хранение в базе", "Видео не теряются при очистке кеша"),
           ("Порядок в iframe", "embed URL, title, allow, allowfullscreen"),
           ("Единый VideoObject", "Без дублей для галереи и описания"),
           ("Локальные превью", "Миниатюры кешируются через image/cache")],
    tabs=["Провайдеры", "Товары", "Миниатюры", "Настройки"],
    kpis=[("Видео", "248"), ("Провайдеров", "7"), ("Товаров", "190")]),
)

P[102] = dict(
  ru=dict(
    intro=[
      "Проблемы каталога обычно обнаруживаются случайно: покупатель пишет, что у товара нет фото, или менеджер замечает цену ноль. Product Stats PRO собирает такие сигналы в компактную статистику прямо в админке, причём каждая цифра кликабельна. Клик открывает штатный список товаров с уже применённым серверным фильтром.",
      "Модуль не заводит собственных экранов для правки: вы видите проблему, нажимаете на неё и работаете с обычным списком товаров OpenCart.",
    ],
    sections=[
      dict(h="📈 Состояние каталога одним взглядом", p=[
        "Сверху выводятся три полосы состояния товаров с количеством и процентом. Они показывают, сколько товаров включено и отключено, и сколько включённых имеют остаток ноль или меньше. Отдельно считается отрицательный остаток."]),
      dict(h="🧱 Что считается проблемой", p=[
        "Модуль отмечает отсутствующий SEO URL, цену ноль или меньше, признак доставки, а также проблемы главного изображения: пустое, небезопасное, удалённое или нечитаемое фото. Отдельно проверяются производитель (нет или удалён) и категории: нет корректных, нет главной или назначено несколько главных."]),
      dict(h="🧾 Заполненность данных", p=[
        "Блок «Данные товара» показывает заполненность SKU, UPC, EAN, JAN, ISBN, MPN, расположения, налогового класса, размеров и веса. Каждый показатель можно скрыть, если он вам не нужен. Клик по показателю открывает товары с незаполненным полем."]),
      dict(h="📐 Аудит размеров фото", p=[
        "Аудит фото работает отдельным запуском небольшими AJAX-пакетами по 40 товаров. Минимальные ширина и высота настраиваются, по умолчанию 500 на 500. Проверка не выполняется при каждом открытии каталога, поэтому админка остаётся быстрой."]),
      dict(h="📌 Где живёт блок", p=[
        "Боковой блок занимает место штатной статистики заказов OpenCart. Если вы отключите боковой блок, штатная статистика заказов вернётся на место. Так модуль не конфликтует со стандартным экраном."]),
      dict(h="🧭 Рабочий порядок", p=[
        "Включите модуль и выберите нужные показатели. Кликните на проблему, откроется список товаров с фильтром. Запустите аудит фото и исправьте найденное. Так проверка целостности превращается из разовой уборки в привычку."]),
    ]),
  uk=dict(
    intro=[
      "Проблеми каталогу зазвичай виявляються випадково: покупець пише, що в товару немає фото, або менеджер помічає ціну нуль. Product Stats PRO збирає такі сигнали в компактну статистику просто в адмінці, причому кожна цифра клікабельна. Клік відкриває штатний список товарів із уже застосованим серверним фільтром.",
      "Модуль не заводить власних екранів для правки: ви бачите проблему, натискаєте на неї й працюєте зі звичайним списком товарів OpenCart.",
    ],
    sections=[
      dict(h="📈 Стан каталогу одним поглядом", p=[
        "Зверху виводяться три смуги стану товарів із кількістю та відсотком. Вони показують, скільки товарів увімкнено й вимкнено, і скільки ввімкнених мають залишок нуль або менше. Окремо рахується від'ємний залишок."]),
      dict(h="🧱 Що вважається проблемою", p=[
        "Модуль позначає відсутній SEO URL, ціну нуль або менше, ознаку доставки, а також проблеми головного зображення: порожнє, небезпечне, видалене чи нечитабельне фото. Окремо перевіряються виробник (немає або видалений) і категорії: немає коректних, немає головної або призначено кілька головних."]),
      dict(h="🧾 Заповненість даних", p=[
        "Блок «Дані товару» показує заповненість SKU, UPC, EAN, JAN, ISBN, MPN, розташування, податкового класу, розмірів і ваги. Кожен показник можна приховати, якщо він вам не потрібен. Клік по показнику відкриває товари з незаповненим полем."]),
      dict(h="📐 Аудит розмірів фото", p=[
        "Аудит фото працює окремим запуском невеликими AJAX-пакетами по 40 товарів. Мінімальні ширина та висота налаштовуються, за замовчуванням 500 на 500. Перевірка не виконується під час кожного відкриття каталогу, тому адмінка лишається швидкою."]),
      dict(h="📌 Де живе блок", p=[
        "Бічний блок займає місце штатної статистики замовлень OpenCart. Якщо ви вимкнете бічний блок, штатна статистика замовлень повернеться на місце. Так модуль не конфліктує зі стандартним екраном."]),
      dict(h="🧭 Робочий порядок", p=[
        "Увімкніть модуль і виберіть потрібні показники. Клікніть на проблему, відкриється список товарів із фільтром. Запустіть аудит фото й виправте знайдене. Так перевірка цілісності перетворюється з разового прибирання на звичку."]),
    ]),
  en=dict(
    intro=[
      "Catalog problems usually come to light by accident: a shopper writes that a product has no photo, or a manager notices a price of zero. Product Stats PRO gathers such signals into compact statistics right in the admin, and every figure is clickable. A click opens the standard product list with a server-side filter already applied.",
      "The module creates no screens of its own for editing: you see a problem, click on it and work in the ordinary OpenCart product list.",
    ],
    sections=[
      dict(h="📈 The state of the catalog at a glance", p=[
        "At the top are three product status bars with a count and a percentage. They show how many products are enabled and disabled, and how many enabled ones have stock of zero or less. Negative stock is counted separately."]),
      dict(h="🧱 What counts as a problem", p=[
        "The module flags a missing SEO URL, a price of zero or less, the shipping flag, and problems with the main image: an empty, unsafe, deleted or unreadable photo. The manufacturer (missing or deleted) and categories are checked separately: no valid categories, no main category, or several main ones assigned."]),
      dict(h="🧾 Data completeness", p=[
        "The «Product data» block shows how completely SKU, UPC, EAN, JAN, ISBN, MPN, location, tax class, dimensions and weight are filled in. Each indicator can be hidden if you do not need it. A click on an indicator opens the products where the field is empty."]),
      dict(h="📐 Photo size audit", p=[
        "The photo audit runs as a separate launch in small AJAX batches of 40 products. The minimum width and height are configurable, 500 by 500 by default. The check does not run every time the catalog opens, so the admin stays fast."]),
      dict(h="📌 Where the block lives", p=[
        "The side block takes the place of the standard OpenCart order statistics. If you turn the side block off, the standard order statistics return. This way the module does not clash with the default screen."]),
      dict(h="🧭 A working routine", p=[
        "Enable the module and choose the indicators you want. Click a problem and the product list opens with the filter applied. Run the photo audit and fix what it finds. That turns an integrity check from a one-off cleanup into a habit."]),
    ]),
  cover=dict(
    tagline="Клик по проблеме открывает список",
    items=["Включено и отключено", "Нулевой остаток", "Нет SEO URL", "Цена ноль и меньше", "Проблемы главного фото", "Нет производителя"],
    cards=[("Полосы состояния", "Количество и процент товаров по статусам"),
           ("Остатки и цены", "Нулевой и отрицательный остаток, цена ноль"),
           ("Проблемы фото", "Пустое, удалённое или нечитаемое изображение"),
           ("Категории", "Нет категории, нет главной, несколько главных"),
           ("Заполненность", "SKU, EAN, MPN, вес, размеры, налоговый класс"),
           ("Аудит размеров фото", "Пакеты по 40 товаров, минимум 500 на 500")],
    tabs=["Статистика", "Данные", "Фото", "Настройки"],
    kpis=[("Товаров", "3 482"), ("Без SEO URL", "56"), ("Фото мельче", "73")]),
)
