# -*- coding: utf-8 -*-
P = {}

# ---------------------------------------------------------------- 52 UTF8MB4
P[52] = dict(
  ru=dict(
    intro=[
      "Знакомая картина: менеджер вставляет в название товара или в отзыв эмодзи, нажимает «Сохранить», а в базе остаётся строка, обрезанная на самом символе, или просто вопросительные знаки. Причина почти всегда одна — база и таблицы магазина до сих пор работают в старой кодировке utf8, которая в MySQL хранит не больше трёх байт на символ. Эмодзи и часть редких знаков занимают четыре.",
      "UTF8MB4 Converter PRO сначала показывает, как обстоят дела на самом деле, и только потом предлагает что-то менять. Модуль проверяет кодировку базы, таблиц, колонок и текущего подключения, а затем переводит всё на utf8mb4 пакетной очередью, которую можно поставить на паузу, продолжить или остановить.",
    ],
    sections=[
      dict(h="🔎 Сначала диагноз, потом лечение", p=[
        "Первая вкладка модуля — отчёт. Он собирает версию MySQL или MariaDB, текущие collation и движки таблиц, а также кодировку самого соединения, через которое OpenCart общается с базой. Нередко выясняется, что таблицы уже в utf8mb4, а проблема сидит в подключении, и тогда конвертировать ничего не нужно.",
        "Отчёт строится по каждой таблице и колонке, поэтому видно, где именно остались старые значения. Администратор не гадает, а видит список и сам решает, с чего начать."]),
      dict(h="⏯ Очередь, которую можно остановить", p=[
        "Конвертация большой базы — операция небыстрая, и выполнять её одним запросом рискованно. Модуль разбивает работу на пакеты и ведёт очередь с индикатором прогресса. Если пришлось срочно освободить сервер, очередь ставится на паузу и потом продолжается с того же места; при необходимости её можно остановить совсем.",
        "Таблицы и колонки допускаются к изменению только через строгие белые списки и префикс вашей базы, так что случайно задеть что-то постороннее модуль не может."]),
      dict(h="🗄 InnoDB отдельным шагом", p=[
        "Смена движка таблиц на InnoDB вынесена в самостоятельное действие, которое нужно подтвердить. Это сделано намеренно: кодировка и движок — разные вещи, и не каждому магазину нужно менять обе сразу. Подтвердили — таблицы магазина переводятся; не подтвердили — остаются как были.",
        "Отдельно модуль следит за новыми таблицами. Поставили стороннее расширение, которое создало свои таблицы в старой кодировке — они появятся в отчёте, и их можно догнать до остальных."]),
      dict(h="📄 Скрытые символы в language-файлах", p=[
        "Эмодзи в базе — не единственный источник «кракозябр». Иногда виноваты языковые файлы: BOM в начале, повреждённый UTF-8, управляющие или невидимые символы, которые ломают вывод или заголовки. Модуль сканирует language-файлы и показывает проблемные места, чтобы их можно было исправить руками."]),
      dict(h="🔌 Подключение через utf8mb4 без правки ядра", p=[
        "Чтобы OpenCart подключался к базе именно в utf8mb4, модуль предлагает обратимый OCMOD. Файлы ядра напрямую он не меняет, а если ваш драйвер базы уже использует utf8mb4, модуль это распознаёт и OCMOD не устанавливает за ненадобностью. Возможные старые ручные правки ядра показываются только для информации."]),
      dict(h="🧱 Чужие таблицы и границы ответственности", p=[
        "Если в той же базе живёт другой проект, его таблицы отображаются отдельно и не изменяются: модуль обрабатывает только таблицы с префиксом вашего магазина. Это снимает главный страх тех, кто держит несколько сайтов в одной базе."]),
      dict(h="⚠️ Что нужно знать до запуска", p=[
        "Команда ALTER TABLE может блокировать запись на время выполнения, поэтому конвертацию лучше запускать в часы минимальной нагрузки и обязательно после полной резервной копии базы и файлов. Символы, которые уже превратились в вопросительные знаки, модуль не восстановит: он лишь не даст появиться новым. После установки модуль выключен и ничего не делает, пока вы его не включите; cron ему не нужен."]),
    ]),
  uk=dict(
    intro=[
      "Знайома картина: менеджер вставляє в назву товару чи у відгук емодзі, натискає «Зберегти», а в базі лишається рядок, обрізаний на самому символі, або самі знаки питання. Причина майже завжди одна: база й таблиці магазину досі працюють у старому кодуванні utf8, яке в MySQL зберігає не більше трьох байтів на символ. Емодзі та частина рідкісних знаків займають чотири.",
      "UTF8MB4 Converter PRO спершу показує, як є насправді, і лише потім пропонує щось змінювати. Модуль перевіряє кодування бази, таблиць, колонок і поточного підключення, а потім переводить усе на utf8mb4 пакетною чергою, яку можна поставити на паузу, продовжити або зупинити.",
    ],
    sections=[
      dict(h="🔎 Спершу діагноз, потім лікування", p=[
        "Перша вкладка модуля — звіт. Він збирає версію MySQL чи MariaDB, поточні collation і рушії таблиць, а також кодування самого з'єднання, через яке OpenCart спілкується з базою. Нерідко з'ясовується, що таблиці вже в utf8mb4, а проблема в підключенні, і тоді конвертувати нічого не треба.",
        "Звіт будується по кожній таблиці та колонці, тож видно, де саме лишилися старі значення. Адміністратор не гадає, а бачить перелік і сам вирішує, з чого почати."]),
      dict(h="⏯ Черга, яку можна зупинити", p=[
        "Конвертація великої бази — операція нешвидка, і виконувати її одним запитом ризиковано. Модуль розбиває роботу на пакети й веде чергу з індикатором прогресу. Якщо довелося терміново звільнити сервер, чергу ставлять на паузу, а потім продовжують з того самого місця; за потреби її можна зупинити зовсім.",
        "Таблиці й колонки допускаються до зміни лише через суворі білі списки та префікс вашої бази, тож випадково зачепити щось стороннє модуль не може."]),
      dict(h="🗄 InnoDB окремим кроком", p=[
        "Зміну рушія таблиць на InnoDB винесено в самостійну дію, яку треба підтвердити. Це зроблено навмисно: кодування й рушій — різні речі, і не кожному магазину потрібно змінювати обидві одразу. Підтвердили — таблиці магазину переводяться; не підтвердили — лишаються як були.",
        "Окремо модуль стежить за новими таблицями. Встановили стороннє розширення, що створило власні таблиці у старому кодуванні, — вони з'являться у звіті, і їх можна дотягнути до решти."]),
      dict(h="📄 Приховані символи в language-файлах", p=[
        "Емодзі в базі — не єдине джерело «кракозябрів». Іноді винні мовні файли: BOM на початку, пошкоджений UTF-8, керівні чи невидимі символи, що ламають вивід або заголовки. Модуль сканує language-файли й показує проблемні місця, щоб їх можна було виправити вручну."]),
      dict(h="🔌 Підключення через utf8mb4 без правки ядра", p=[
        "Щоб OpenCart підключався до бази саме в utf8mb4, модуль пропонує зворотний OCMOD. Файли ядра напряму він не змінює, а якщо ваш драйвер бази вже використовує utf8mb4, модуль це розпізнає й OCMOD не встановлює за непотрібністю. Можливі старі ручні правки ядра показуються лише для довідки."]),
      dict(h="🧱 Чужі таблиці та межі відповідальності", p=[
        "Якщо в тій самій базі живе інший проєкт, його таблиці відображаються окремо й не змінюються: модуль обробляє лише таблиці з префіксом вашого магазину. Це знімає головний страх тих, хто тримає кілька сайтів в одній базі."]),
      dict(h="⚠️ Що треба знати перед запуском", p=[
        "Команда ALTER TABLE може блокувати запис на час виконання, тому конвертацію краще запускати в години мінімального навантаження й обов'язково після повної резервної копії бази та файлів. Символи, що вже перетворилися на знаки питання, модуль не відновить: він лише не дасть з'явитися новим. Після встановлення модуль вимкнений і нічого не робить, доки ви його не ввімкнете; cron йому не потрібен."]),
    ]),
  en=dict(
    intro=[
      "A familiar scene: a manager pastes an emoji into a product name or a review, hits Save, and the database keeps a string cut off at that very character, or nothing but question marks. The cause is nearly always the same. The shop database and its tables still use the old utf8 encoding, which in MySQL stores at most three bytes per character, while emoji and some rare symbols need four.",
      "UTF8MB4 Converter PRO first shows how things really stand and only then offers to change anything. It inspects the encoding of the database, tables, columns and the current connection, then moves everything to utf8mb4 through a batch queue that you can pause, resume or stop.",
    ],
    sections=[
      dict(h="🔎 Diagnosis before treatment", p=[
        "The first tab is a report. It gathers the MySQL or MariaDB version, current collations and table engines, plus the encoding of the connection OpenCart uses to talk to the database. It is not unusual to find that the tables are already utf8mb4 and the culprit is the connection, in which case there is nothing to convert.",
        "The report goes down to individual tables and columns, so you can see exactly where old values remain. The administrator is not guessing; there is a list, and the order of work is up to you."]),
      dict(h="⏯ A queue you can halt", p=[
        "Converting a large database takes time, and doing it in one query is risky. The module splits the work into batches and keeps a queue with a progress indicator. If the server suddenly needs to breathe, pause the queue and resume later from the same place, or stop it altogether.",
        "Tables and columns are touched only through strict whitelists and your database prefix, so the module cannot wander into something that is not yours."]),
      dict(h="🗄 InnoDB as a separate step", p=[
        "Switching the table engine to InnoDB is a standalone action that has to be confirmed. This is deliberate: encoding and engine are different matters, and not every shop wants to change both at once. Confirm it and the shop tables are converted; skip it and they stay as they were.",
        "The module also watches for new tables. If you install a third-party extension that creates tables in the old encoding, they show up in the report and can be brought in line with the rest."]),
      dict(h="📄 Hidden characters in language files", p=[
        "Emoji in the database are not the only source of garbled text. Sometimes language files are to blame: a BOM at the start, broken UTF-8, control or invisible characters that corrupt output or headers. The module scans the language files and points at the problem spots so you can fix them by hand."]),
      dict(h="🔌 Connecting through utf8mb4 without touching the core", p=[
        "To make OpenCart connect to the database in utf8mb4, the module offers a reversible OCMOD. It does not edit core files directly, and if your database driver already uses utf8mb4 it recognises that and does not install the OCMOD at all. Any old manual core edits it finds are shown for information only."]),
      dict(h="🧱 Other tables and where responsibility ends", p=[
        "If another project lives in the same database, its tables are listed separately and left alone: the module processes only tables with your shop prefix. That removes the main worry for anyone who keeps several sites in one database."]),
      dict(h="⚠️ Before you press start", p=[
        "ALTER TABLE can block writes while it runs, so schedule conversion for the quietest hours and only after a full backup of files and database. Characters that have already turned into question marks cannot be restored; the module only stops new ones from appearing. After installation the module is off and does nothing until you switch it on; it needs no cron."]),
    ]),
  cover=dict(
    tagline="Эмодзи и спецсимволы без вопросительных знаков",
    items=["Диагностика кодировки", "Очередь конвертации", "Пауза и продолжение", "Перевод в InnoDB", "Проверка language-файлов", "Обратимый OCMOD"],
    cards=[
      ("Диагностика", "Кодировка базы, таблиц, колонок и подключения"),
      ("Пакетная очередь", "Прогресс, пауза, продолжение и остановка"),
      ("InnoDB", "Отдельное подтверждаемое действие"),
      ("Новые таблицы", "Контроль после установки расширений"),
      ("Language-файлы", "BOM, битый UTF-8, скрытые символы"),
      ("Чужие таблицы", "Показываются отдельно и не меняются"),
    ],
    tabs=["Диагностика", "Конвертация", "Файлы", "Настройки"],
    kpis=[("Таблиц", "142"), ("В utf8mb4", "118"), ("Осталось", "24")],
  ),
)

# ---------------------------------------------------------------- 53 Reviews Writer
P[53] = dict(
  ru=dict(
    intro=[
      "Пустая витрина с товарами без единого отзыва плохо подходит для демонстрации: непонятно, как будет выглядеть блок отзывов, как работает модерация и сортировка. Product Reviews Writer PRO готовит черновики отзывов для карточек товаров — через подключённого AI-провайдера или по локальным шаблонам — чтобы тестовый или демонстрационный магазин выглядел живым.",
      "Главная мысль модуля — контроль. Тексты не появляются на сайте втихую: администратор видит очередь заданий, правит черновики и сам решает, что публиковать. Сгенерированный отзыв — это заготовка, а не мнение настоящего покупателя, и модуль строится вокруг этого принципа.",
    ],
    sections=[
      dict(h="✍️ Два источника текста", p=[
        "Можно подключить AI-провайдера и получать разнообразные тексты, а можно обойтись локальными шаблонами без внешних запросов. Шаблонный режим удобен, когда нужен быстрый заполнитель для стенда и не хочется отдавать данные наружу.",
        "В обоих случаях работают правила качества: контролируется длина, начала отзывов и стили текста чередуются, чтобы сотня записей не читалась как одна и та же фраза, а имена авторов и названия компаний подставляются случайно."]),
      dict(h="🎯 Кому и сколько отзывов писать", p=[
        "Товары выбираются по категориям вместе со всеми подкатегориями, по списку ID или по наличию на складе. Количество отзывов на товар задаётся диапазоном от и до, так что у разных карточек получается разное число записей, а не ровно по три.",
        "Если выборка вышла пустой, модуль не молчит, а объясняет, почему ни один товар не подошёл под условия. Это экономит время, когда фильтры наложились друг на друга."]),
      dict(h="🌍 Все языки магазина", p=[
        "Список языков берётся из активных языков вашего OpenCart, поэтому модуль не привязан к фиксированному набору. Генерация распределяется между ними сбалансированно, как при ручном запуске в админке, так и по cron. Сам интерфейс модуля доступен на русском, украинском и английском."]),
      dict(h="📋 Очередь заданий", p=[
        "Работа идёт через очередь. Счётчики показывают точные числа, страница обновляется через AJAX без перезагрузки, очередь можно поставить на паузу или заблокировать, если запуск нужно временно запретить. Это пригодится при больших каталогах, когда обработка растягивается на много шагов.",
        "Запуск возможен вручную и по расписанию. Для cron нужна настройка на стороне сервера; без неё очередь обрабатывается из админки."]),
      dict(h="🛠 Правка и публикация", p=[
        "Готовые черновики можно открыть, поправить и опубликовать. Если вы изменили уже опубликованный отзыв, правка синхронизируется со стандартными отзывами OpenCart, и на витрине будет актуальный текст, а не прежний."]),
      dict(h="⚖️ Честность прежде всего", p=[
        "Сгенерированные тексты не принадлежат реальным покупателям. На рабочем магазине такие записи нужно помечать как примеры или демо и соблюдать требования закона и торговых площадок: выдавать их за настоящие отзывы нельзя. Модуль задуман для демо-стендов, тестовых копий и подготовки заготовок для последующей модерации."]),
    ]),
  uk=dict(
    intro=[
      "Порожня вітрина з товарами без жодного відгуку погано підходить для демонстрації: незрозуміло, як виглядатиме блок відгуків, як працюють модерація та сортування. Product Reviews Writer PRO готує чернетки відгуків для карток товарів — через підключеного AI-провайдера або за локальними шаблонами — щоб тестовий чи демонстраційний магазин виглядав живим.",
      "Головна думка модуля — контроль. Тексти не з'являються на сайті крадькома: адміністратор бачить чергу завдань, редагує чернетки й сам вирішує, що публікувати. Згенерований відгук — це заготовка, а не думка справжнього покупця, і модуль побудований навколо цього принципу.",
    ],
    sections=[
      dict(h="✍️ Два джерела тексту", p=[
        "Можна підключити AI-провайдера й отримувати різноманітні тексти, а можна обійтися локальними шаблонами без зовнішніх запитів. Шаблонний режим зручний, коли потрібен швидкий наповнювач для стенда й не хочеться віддавати дані назовні.",
        "В обох випадках діють правила якості: контролюється довжина, початки відгуків і стилі тексту чергуються, щоб сотня записів не читалася як одна й та сама фраза, а імена авторів і назви компаній підставляються випадково."]),
      dict(h="🎯 Кому і скільки відгуків писати", p=[
        "Товари добираються за категоріями разом з усіма підкатегоріями, за списком ID або за наявністю на складі. Кількість відгуків на товар задається діапазоном від і до, тож у різних карток виходить різна кількість записів, а не рівно по три.",
        "Якщо вибірка вийшла порожньою, модуль не мовчить, а пояснює, чому жоден товар не підійшов під умови. Це заощаджує час, коли фільтри нашарувалися один на одного."]),
      dict(h="🌍 Усі мови магазину", p=[
        "Перелік мов береться з активних мов вашого OpenCart, тому модуль не прив'язаний до фіксованого набору. Генерація розподіляється між ними збалансовано — і під час ручного запуску в адмінці, і за cron. Сам інтерфейс модуля доступний російською, українською та англійською."]),
      dict(h="📋 Черга завдань", p=[
        "Робота йде через чергу. Лічильники показують точні числа, сторінка оновлюється через AJAX без перезавантаження, чергу можна поставити на паузу або заблокувати, якщо запуск треба тимчасово заборонити. Це стане в пригоді на великих каталогах, коли обробка розтягується на багато кроків.",
        "Запуск можливий вручну та за розкладом. Для cron потрібне налаштування на боці сервера; без нього черга обробляється з адмінки."]),
      dict(h="🛠 Правка і публікація", p=[
        "Готові чернетки можна відкрити, виправити й опублікувати. Якщо ви змінили вже опублікований відгук, правка синхронізується зі стандартними відгуками OpenCart, і на вітрині буде актуальний текст, а не попередній."]),
      dict(h="⚖️ Чесність передусім", p=[
        "Згенеровані тексти не належать реальним покупцям. На робочому магазині такі записи потрібно позначати як приклади чи демо й дотримуватися вимог закону та торгових майданчиків: видавати їх за справжні відгуки не можна. Модуль задуманий для демо-стендів, тестових копій і підготовки заготовок для подальшої модерації."]),
    ]),
  en=dict(
    intro=[
      "A storefront full of products without a single review is a poor demo: nobody can tell how the review block will look or how moderation and sorting behave. Product Reviews Writer PRO prepares draft reviews for product pages, through a connected AI provider or from local templates, so that a test or demonstration shop looks lived in.",
      "The guiding idea is control. Texts never slip onto the site quietly: the administrator sees the job queue, edits the drafts and decides what to publish. A generated review is a blank to work from, not the opinion of a real customer, and the whole module is built around that principle.",
    ],
    sections=[
      dict(h="✍️ Two sources of text", p=[
        "You can connect an AI provider for varied wording, or stay with local templates that make no external requests. The template mode is handy when you need a quick filler for a staging site and would rather not send data out.",
        "Either way, quality rules apply. Length is checked, openings and styles rotate so a hundred records do not read like one sentence repeated, and author names and company names are picked at random."]),
      dict(h="🎯 Which products, and how many reviews", p=[
        "Products can be selected by category including every subcategory, by a list of IDs, or by stock availability. The number of reviews per product is a from-to range, so different pages end up with different counts instead of exactly three each.",
        "If the selection comes out empty, the module does not stay silent; it explains why no product matched. That saves time when several filters have stacked up against each other."]),
      dict(h="🌍 Every language of the shop", p=[
        "The language list comes from the active languages of your OpenCart, so the module is not tied to a fixed set. Generation is spread evenly across them, both when launched manually in the admin and when run by cron. The module interface itself is available in Russian, Ukrainian and English."]),
      dict(h="📋 The job queue", p=[
        "Work goes through a queue. Counters show exact numbers, the page refreshes by AJAX without reloading, and the queue can be paused or locked when you need to forbid a run for a while. That helps with large catalogues where processing stretches across many steps.",
        "Runs can be manual or scheduled. Cron requires setup on the server side; without it the queue is processed from the admin panel."]),
      dict(h="🛠 Editing and publishing", p=[
        "Finished drafts can be opened, corrected and published. If you edit a review that is already published, the change is synchronised with the standard OpenCart reviews, so the storefront shows the current text and not the old one."]),
      dict(h="⚖️ Honesty comes first", p=[
        "Generated texts do not belong to real customers. On a live shop such entries must be marked as examples or demo content, and the law and marketplace rules must be respected: presenting them as genuine reviews is not allowed. The module is intended for demo sites, test copies and preparing drafts for later moderation."]),
    ]),
  cover=dict(
    tagline="Черновики отзывов для демо- и тестовых магазинов",
    items=["AI или шаблоны", "Очередь заданий", "Выбор по категориям", "Все языки магазина", "Диапазон отзывов", "Правка и публикация"],
    cards=[
      ("Два режима", "AI-провайдер или локальные шаблоны"),
      ("Очередь", "Точные счётчики, пауза и блокировка"),
      ("Выбор товаров", "Категории с подкатегориями, ID, наличие"),
      ("Мультиязычность", "Баланс по активным языкам, админка и cron"),
      ("Правила качества", "Длина, стили, случайные имена авторов"),
      ("Синхронизация", "Правка отзыва обновляет OpenCart"),
    ],
    tabs=["Очередь", "Генерация", "Черновики", "Настройки"],
    kpis=[("В очереди", "64"), ("Черновиков", "212"), ("Языков", "3")],
  ),
)

# ---------------------------------------------------------------- 66 AVIF WebP
P[66] = dict(
  ru=dict(
    intro=[
      "Фотографии в каталоге обычно съедают большую часть веса страницы, и именно из-за них PageSpeed ругается на «современные форматы изображений». AVIF WebP Image PRO подключается к стандартной обработке картинок OpenCart и параллельно создаёт лёгкие копии в AVIF и WebP, не трогая ваши оригиналы.",
      "Браузер получает на выбор несколько вариантов одного снимка и берёт самый современный из тех, что поддерживает. Тот, кто не умеет AVIF или WebP, получит привычный JPG или PNG, поэтому ничего не ломается ни в старых браузерах, ни в галереях.",
    ],
    sections=[
      dict(h="🖼 Как картинка попадает на витрину", p=[
        "Вместо обычного тега изображения модуль выводит цепочку picture: сначала источник AVIF, затем WebP, а в конце исходный JPG или PNG как запасной вариант. Браузер идёт по цепочке сверху вниз и останавливается на первом поддерживаемом формате.",
        "Обрабатываются стандартные resize-изображения OpenCart: основное и дополнительные фото товара, миниатюры, блоки похожих и просмотренных товаров, картинки категорий, производителей и информационных страниц. По документации поддерживаются также ocStore Blog и UniShop2 News, а старые прямые ссылки на image/cache и image/catalog тоже учитываются."]),
      dict(h="🛡 Оригиналы остаются на месте", p=[
        "Исходные файлы модуль не перезаписывает. Ссылки на скачивание, галереи и lightbox используют совместимый исходный файл, поэтому зум и увеличенные фото работают как раньше. Внешние изображения, favicon и Apple Touch Icon не переписываются, и никакие глобальные CSS или JS на сайт не добавляются."]),
      dict(h="🔬 Диагностика сервера", p=[
        "Прежде чем что-то создавать, откройте вкладку диагностики. Она показывает, какие форматы и библиотеки доступны на вашем хостинге: поддерживает ли сервер WebP, AVIF, а при наличии PHP-расширения Imagick с поддержкой JXL — и JPEG XL. Внешняя программа cjxl при этом не запускается. Если нужной возможности нет, вы узнаете об этом сразу, а не по пустым папкам."]),
      dict(h="⏳ Две очереди", p=[
        "Работа разделена на очередь оптимизации оригиналов и очередь modern-кеша. Каждая запоминает, где остановилась, и продолжается с точного места, так что большой каталог можно обрабатывать частями. Новые загрузки добавляются в очередь автоматически, и вручную отслеживать свежие фото не придётся."]),
      dict(h="🔥 Прогрев кеша по cron", p=[
        "Чтобы первый посетитель не ждал, пока формат создастся на лету, кеш прогревается заранее. Для этого есть CLI-скрипт для cron с лимитами на один запуск, чтобы нагрузка на сервер оставалась умеренной. Вкладка очереди показывает остаток, и цель простая: довести его до нуля.",
        "Каталоги кеша создаются с правами, унаследованными от базового image/cache, поэтому очистка после генерации по cron не упирается в Permission denied."]),
      dict(h="📋 Порядок запуска и условия", p=[
        "Установите и обновите модификаторы, проверьте диагностику, постройте очередь, прогрейте кеш до остатка 0 и только потом включите модуль и посмотрите код picture на витрине. Для работы нужен License Server PRO версии 3.0.8 или новее. Если модуль выключить, события витрины удаляются автоматически. Перед установкой обязательно сделайте резервную копию файлов и базы."]),
    ]),
  uk=dict(
    intro=[
      "Фотографії в каталозі зазвичай з'їдають більшу частину ваги сторінки, і саме через них PageSpeed нарікає на «сучасні формати зображень». AVIF WebP Image PRO підключається до стандартної обробки картинок OpenCart і паралельно створює легкі копії в AVIF та WebP, не чіпаючи ваші оригінали.",
      "Браузер отримує на вибір кілька варіантів одного знімка й бере найсучасніший із тих, що підтримує. Той, хто не вміє AVIF чи WebP, отримає звичний JPG або PNG, тому нічого не ламається ні в старих браузерах, ні в галереях.",
    ],
    sections=[
      dict(h="🖼 Як картинка потрапляє на вітрину", p=[
        "Замість звичайного тега зображення модуль виводить ланцюжок picture: спершу джерело AVIF, потім WebP, а наприкінці вихідний JPG чи PNG як запасний варіант. Браузер іде ланцюжком згори донизу й зупиняється на першому підтримуваному форматі.",
        "Обробляються стандартні resize-зображення OpenCart: основне й додаткові фото товару, мініатюри, блоки схожих і переглянутих товарів, картинки категорій, виробників та інформаційних сторінок. Згідно з документацією, підтримуються також ocStore Blog і UniShop2 News, а старі прямі посилання на image/cache та image/catalog теж враховуються."]),
      dict(h="🛡 Оригінали лишаються на місці", p=[
        "Вихідні файли модуль не перезаписує. Посилання на завантаження, галереї та lightbox використовують сумісний вихідний файл, тому зум і збільшені фото працюють як раніше. Зовнішні зображення, favicon та Apple Touch Icon не переписуються, а жодних глобальних CSS чи JS на сайт не додається."]),
      dict(h="🔬 Діагностика сервера", p=[
        "Перш ніж щось створювати, відкрийте вкладку діагностики. Вона показує, які формати й бібліотеки доступні на вашому хостингу: чи підтримує сервер WebP, AVIF, а за наявності PHP-розширення Imagick з підтримкою JXL — і JPEG XL. Зовнішня програма cjxl при цьому не запускається. Якщо потрібної можливості немає, ви дізнаєтеся про це одразу, а не з порожніх папок."]),
      dict(h="⏳ Дві черги", p=[
        "Роботу розділено на чергу оптимізації оригіналів і чергу modern-кешу. Кожна запам'ятовує, де зупинилася, і продовжується з точного місця, тож великий каталог можна обробляти частинами. Нові завантаження додаються до черги автоматично, і стежити за свіжими фото вручну не доведеться."]),
      dict(h="🔥 Прогрів кешу за cron", p=[
        "Щоб перший відвідувач не чекав, поки формат створиться на льоту, кеш прогрівається заздалегідь. Для цього є CLI-скрипт для cron з лімітами на один запуск, щоб навантаження на сервер лишалося помірним. Вкладка черги показує залишок, а мета проста: довести його до нуля.",
        "Каталоги кешу створюються з правами, успадкованими від базового image/cache, тож очищення після генерації за cron не впирається в Permission denied."]),
      dict(h="📋 Порядок запуску та умови", p=[
        "Встановіть і оновіть модифікатори, перевірте діагностику, побудуйте чергу, прогрійте кеш до залишку 0 і лише тоді ввімкніть модуль та погляньте на код picture на вітрині. Для роботи потрібен License Server PRO версії 3.0.8 або новіший. Якщо модуль вимкнути, події вітрини видаляються автоматично. Перед встановленням обов'язково зробіть резервну копію файлів і бази."]),
    ]),
  en=dict(
    intro=[
      "Photos usually account for most of a catalogue page's weight, and they are the reason PageSpeed complains about next-generation image formats. AVIF WebP Image PRO hooks into the standard OpenCart image processing and, alongside it, produces lightweight AVIF and WebP copies without touching your originals.",
      "The browser is offered several versions of the same picture and takes the most modern one it understands. A visitor whose browser handles neither AVIF nor WebP simply gets the familiar JPG or PNG, so nothing breaks in older browsers or in galleries.",
    ],
    sections=[
      dict(h="🖼 How a picture reaches the storefront", p=[
        "Instead of a plain image tag the module outputs a picture chain: an AVIF source first, then WebP, and the original JPG or PNG at the end as the fallback. The browser walks down the chain and stops at the first format it supports.",
        "Standard OpenCart resized images are covered: the main and additional product photos, thumbnails, related and recently viewed blocks, and images of categories, manufacturers and information pages. According to the documentation, ocStore Blog and UniShop2 News are supported too, and old direct links to image/cache and image/catalog are taken into account."]),
      dict(h="🛡 Originals stay where they are", p=[
        "Source files are never overwritten. Download links, galleries and lightboxes use the compatible original file, so zoom and enlarged photos work as before. External images, favicons and the Apple Touch Icon are left alone, and no global CSS or JS is added to the site."]),
      dict(h="🔬 Know your server first", p=[
        "Before creating anything, open the diagnostics tab. It shows which formats and libraries your hosting actually offers: whether WebP and AVIF are supported and, if the Imagick PHP extension with JXL support is present, JPEG XL as well. The external cjxl program is not run. If a capability is missing you find out at once rather than from empty folders."]),
      dict(h="⏳ Two queues", p=[
        "The work is divided into a queue for optimising originals and a queue for the modern-format cache. Each remembers where it stopped and resumes from that exact spot, so a big catalogue can be processed in portions. New uploads are added to the queue automatically, so there is no need to keep track of fresh photos by hand."]),
      dict(h="🔥 Warming the cache with cron", p=[
        "So that the first visitor does not wait while a format is generated on the fly, the cache is warmed in advance. A CLI script for cron does this with limits per run, keeping server load moderate. The queue tab shows what is left, and the goal is simple: bring it to zero.",
        "Cache directories are created with permissions inherited from the base image/cache folder, so cleaning up after a cron run does not hit Permission denied."]),
      dict(h="📋 Launch order and requirements", p=[
        "Install and refresh the modifications, check diagnostics, build the queue, warm the cache until the remainder is 0, and only then enable the module and inspect the picture markup on the storefront. License Server PRO version 3.0.8 or newer is required. Disabling the module removes the storefront events automatically. Always back up files and database before installing."]),
    ]),
  cover=dict(
    tagline="Лёгкие AVIF и WebP вместо тяжёлых JPG",
    items=["AVIF и WebP", "Оригиналы целы", "Диагностика сервера", "Очередь оптимизации", "Прогрев кеша", "Работа по cron"],
    cards=[
      ("Цепочка picture", "AVIF, затем WebP, затем исходный файл"),
      ("Оригиналы", "Не перезаписываются, зум работает как раньше"),
      ("Диагностика", "Какие форматы и библиотеки есть на сервере"),
      ("Две очереди", "Оригиналы и modern-кеш, продолжение с места"),
      ("Автоочередь", "Новые загрузки добавляются сами"),
      ("CLI для cron", "Прогрев кеша с лимитами на запуск"),
    ],
    tabs=["Диагностика", "Очередь", "Кеш", "Настройки"],
    kpis=[("Файлов", "3 480"), ("В AVIF", "3 112"), ("Экономия", "-62%")],
  ),
)

# ---------------------------------------------------------------- 71 Google Reviews
P[71] = dict(
  ru=dict(
    intro=[
      "Покупатель получил заказ и обычно исчезает: никто не просит его поделиться впечатлением о магазине. Google Reviews PRO встраивает на страницу успешного заказа официальный опт-ин Google Customer Reviews, и после доставки Google сам обращается к покупателю с просьбой оценить магазин.",
      "Важно понимать границы модуля. Отзыв пишет и собирает именно Google у реального человека, а модуль ничего не создаёт и не пишет за покупателя. Его задача — правильно передать данные и показать рейтинг магазина там, где вы решите.",
    ],
    sections=[
      dict(h="🧾 Что происходит на странице заказа", p=[
        "Когда клиент оформил заказ и видит страницу благодарности, модуль выводит там окно приглашения Google. Покупатель сам соглашается или отказывается. Если согласился, Google позже пришлёт ему письмо с просьбой оценить покупку.",
        "Для этого в нужном формате передаются данные заказа и ваш Merchant ID. Любое расхождение в формате приведёт к тому, что Google не примет запрос, поэтому настройка этого блока вынесена в аккуратные поля с проверкой."]),
      dict(h="🔑 Merchant ID из Merchant Center", p=[
        "Единственное, что нужно от вас на старте, — идентификатор из Google Merchant Center. Без корректного Merchant ID и соответствия требованиям программы Google Customer Reviews опт-ин работать не будет. Перед включением модуль проверяет настройки, чтобы вы не обнаружили ошибку спустя неделю по тишине в отчётах."]),
      dict(h="⭐ Рейтинг магазина на витрине", p=[
        "Кроме сбора отзывов, модуль умеет показывать элементы рейтинга: значок и количество отзывов. Блок адаптивный, то есть нормально смотрится и на широком экране, и на телефоне. Вы управляете тем, где он стоит и как выглядит, и можете начать с самого заметного места, а потом переставить."]),
      dict(h="⚡ Без лишней нагрузки", p=[
        "Данные рейтинга кешируются, поэтому витрина не обращается к внешнему сервису при каждой загрузке страницы. Для магазина с большим трафиком это важно: красивый значок не должен замедлять каталог."]),
      dict(h="🧪 Как проверить, что всё работает", p=[
        "Укажите Merchant ID, выберите место для блока рейтинга, включите модуль и оформите тестовый заказ. Откройте страницу успешного заказа и убедитесь, что окно приглашения Google действительно появляется. Только после этого стоит рассчитывать на то, что настоящие покупатели начнут получать письма.",
        "Если окна нет, первым делом сверьте Merchant ID и убедитесь, что магазин подключён к программе Google Customer Reviews."]),
    ]),
  uk=dict(
    intro=[
      "Покупець отримав замовлення й зазвичай зникає: ніхто не просить його поділитися враженнями про магазин. Google Reviews PRO вбудовує на сторінку успішного замовлення офіційний опт-ін Google Customer Reviews, і після доставки Google сам звертається до покупця з проханням оцінити магазин.",
      "Важливо розуміти межі модуля. Відгук пише й збирає саме Google у реальної людини, а модуль нічого не створює й не пише за покупця. Його завдання — правильно передати дані та показати рейтинг магазину там, де ви вирішите.",
    ],
    sections=[
      dict(h="🧾 Що відбувається на сторінці замовлення", p=[
        "Коли клієнт оформив замовлення й бачить сторінку подяки, модуль виводить там вікно запрошення Google. Покупець сам погоджується або відмовляється. Якщо погодився, Google пізніше надішле йому лист із проханням оцінити покупку.",
        "Для цього в потрібному форматі передаються дані замовлення та ваш Merchant ID. Будь-яка розбіжність у форматі призведе до того, що Google не прийме запит, тому налаштування цього блоку винесено в охайні поля з перевіркою."]),
      dict(h="🔑 Merchant ID із Merchant Center", p=[
        "Єдине, що потрібно від вас на старті, — ідентифікатор із Google Merchant Center. Без коректного Merchant ID та відповідності вимогам програми Google Customer Reviews опт-ін працювати не буде. Перед вмиканням модуль перевіряє налаштування, щоб ви не виявили помилку за тиждень по тиші у звітах."]),
      dict(h="⭐ Рейтинг магазину на вітрині", p=[
        "Крім збору відгуків, модуль уміє показувати елементи рейтингу: значок і кількість відгуків. Блок адаптивний, тобто нормально виглядає і на широкому екрані, і на телефоні. Ви керуєте тим, де він стоїть і який має вигляд, і можете почати з найпомітнішого місця, а потім переставити."]),
      dict(h="⚡ Без зайвого навантаження", p=[
        "Дані рейтингу кешуються, тому вітрина не звертається до зовнішнього сервісу під час кожного завантаження сторінки. Для магазину з великим трафіком це важливо: гарний значок не повинен уповільнювати каталог."]),
      dict(h="🧪 Як перевірити, що все працює", p=[
        "Вкажіть Merchant ID, оберіть місце для блока рейтингу, увімкніть модуль і оформіть тестове замовлення. Відкрийте сторінку успішного замовлення й переконайтеся, що вікно запрошення Google справді з'являється. Лише після цього варто розраховувати, що справжні покупці почнуть отримувати листи.",
        "Якщо вікна немає, насамперед звірте Merchant ID і переконайтеся, що магазин підключено до програми Google Customer Reviews."]),
    ]),
  en=dict(
    intro=[
      "A customer receives the parcel and usually vanishes: nobody asks them what they thought of the shop. Google Reviews PRO places the official Google Customer Reviews opt-in on the order success page, and after delivery Google itself approaches the buyer with a request to rate the store.",
      "It helps to be clear about the limits. The review is written and collected by Google from a real person; the module creates nothing and writes nothing on the buyer's behalf. Its job is to pass the data correctly and to display the store rating where you decide.",
    ],
    sections=[
      dict(h="🧾 What happens on the order page", p=[
        "When a customer completes an order and lands on the thank-you page, the module shows Google's invitation window there. The buyer accepts or declines. If they accept, Google later sends an email asking them to rate the purchase.",
        "To make that possible, the order data and your Merchant ID are passed in the format Google expects. Any mismatch means Google will not accept the request, which is why this block is configured through tidy, validated fields."]),
      dict(h="🔑 Merchant ID from Merchant Center", p=[
        "The only thing you need at the start is the identifier from Google Merchant Center. Without a correct Merchant ID and compliance with the Google Customer Reviews programme requirements the opt-in will not work. The module checks the settings before you enable it, so you do not discover a mistake a week later from silence in your reports."]),
      dict(h="⭐ Store rating on the storefront", p=[
        "Besides collecting reviews, the module can show rating elements: a badge and the number of reviews. The block is responsive, so it looks fine on a wide screen and on a phone. You control where it sits and how it looks, and you can begin with the most visible spot and move it later."]),
      dict(h="⚡ No extra load", p=[
        "Rating data is cached, so the storefront does not call an external service on every page load. For a busy shop that matters: a nice badge should never slow the catalogue down."]),
      dict(h="🧪 How to check that it works", p=[
        "Enter the Merchant ID, choose a place for the rating block, enable the module and place a test order. Open the order success page and confirm that the Google invitation window really appears. Only then can you expect real customers to start receiving emails.",
        "If the window does not show up, first compare the Merchant ID and make sure the store is enrolled in the Google Customer Reviews programme."]),
    ]),
  cover=dict(
    tagline="Официальный сбор отзывов о магазине через Google",
    items=["Google Customer Reviews", "Опт-ин после заказа", "Merchant ID", "Рейтинг на витрине", "Адаптивный блок", "Кеш рейтинга"],
    cards=[
      ("Опт-ин Google", "Окно приглашения на странице заказа"),
      ("Данные заказа", "Передаются в формате, который ждёт Google"),
      ("Рейтинг магазина", "Значок и количество отзывов на витрине"),
      ("Место блока", "Вы выбираете, где и как он показан"),
      ("Кеш данных", "Витрина не нагружается лишними запросами"),
      ("Проверка", "Настройки сверяются перед включением"),
    ],
    tabs=["Основные", "Рейтинг", "Отображение", "Проверка"],
    kpis=[("Заказов", "318"), ("Приглашений", "204"), ("Рейтинг", "4.8")],
  ),
)

# ---------------------------------------------------------------- 79 SEO Meta
P[79] = dict(
  ru=dict(
    intro=[
      "После импорта каталога из Excel или от поставщика у тысяч товаров часто пустые Meta Title и Meta Description, а у остальных они одинаковые. Заполнять каждую карточку вручную никто не станет. SEO Meta PRO массово пишет Meta Title, Meta Description, Meta Keywords и H1 для товаров, категорий и производителей по шаблонам.",
      "Модуль честно решает узкую задачу: приводит метаданные в порядок там, где они отсутствуют или однотипны. Стратегию продвижения, семантику и качество самих текстов он не заменяет, и это стоит помнить.",
    ],
    sections=[
      dict(h="🧩 Шаблон вместо ручного труда", p=[
        "Вы пишете шаблон, а в нужные места модуль подставляет данные конкретного товара, категории или производителя. Из одной строки получаются тысячи разных заголовков и описаний, в каждом из которых название относится именно к своей странице, а не копируется один к одному со всех.",
        "Отдельные шаблоны задаются для каждого языка магазина. Русская и украинская страницы получают метатеги на своём языке, а не перевод-кальку одного шаблона."]),
      dict(h="👁 Предпросмотр до записи", p=[
        "Перед тем как что-либо сохранить, запустите предпросмотр на небольшой выборке. Вы увидите готовые значения для реальных страниц и сразу заметите, если шаблон даёт слишком длинный заголовок или странно склеивает слова. Поправить шаблон на этом этапе ничего не стоит, а исправлять уже записанные тысячи полей придётся долго."]),
      dict(h="🔒 Режим только пустых", p=[
        "Самый безопасный способ начать — режим «только пустые». Страницы, у которых метатеги уже заполнены и оптимизированы вручную, остаются нетронутыми, а генерация закрывает только пробелы. Когда шаблон проверен, можно перейти к перезаписи, но такое решение принимается осознанно: контроль перезаписи включён отдельно."]),
      dict(h="📦 Три типа страниц", p=[
        "Массовая генерация доступна для товаров, категорий и производителей. Их можно обрабатывать по очереди или выбирать только нужный тип: например, сначала навести порядок в категориях, а к товарам вернуться позже."]),
      dict(h="📏 Контроль длины и качества", p=[
        "Полученные значения проверяются по длине и качеству. Это защищает от слишком коротких или, наоборот, раздутых метатегов, которые поисковая система всё равно обрежет в выдаче."]),
      dict(h="🛟 Что сделать перед массовым запуском", p=[
        "Перед массовой записью сделайте резервную копию базы данных. Начинайте с режима «только пустые», проверяйте результат на выборке и расширяйте охват постепенно. Так вы потеряете минимум, даже если шаблон окажется неудачным."]),
    ]),
  uk=dict(
    intro=[
      "Після імпорту каталогу з Excel чи від постачальника у тисяч товарів часто порожні Meta Title і Meta Description, а в решти вони однакові. Заповнювати кожну картку вручну ніхто не стане. SEO Meta PRO масово пише Meta Title, Meta Description, Meta Keywords та H1 для товарів, категорій і виробників за шаблонами.",
      "Модуль чесно розв'язує вузьке завдання: наводить лад у метаданих там, де їх немає або вони однотипні. Стратегію просування, семантику й якість самих текстів він не замінює, і про це варто пам'ятати.",
    ],
    sections=[
      dict(h="🧩 Шаблон замість ручної праці", p=[
        "Ви пишете шаблон, а в потрібні місця модуль підставляє дані конкретного товару, категорії чи виробника. З одного рядка виходять тисячі різних заголовків і описів, у кожному з яких назва стосується саме своєї сторінки, а не копіюється один до одного з усіх.",
        "Окремі шаблони задаються для кожної мови магазину. Російська й українська сторінки отримують метатеги своєю мовою, а не переклад-кальку одного шаблона."]),
      dict(h="👁 Попередній перегляд до запису", p=[
        "Перш ніж щось зберегти, запустіть попередній перегляд на невеликій вибірці. Ви побачите готові значення для реальних сторінок і одразу помітите, якщо шаблон дає надто довгий заголовок або дивно склеює слова. Виправити шаблон на цьому етапі нічого не коштує, а виправляти вже записані тисячі полів доведеться довго."]),
      dict(h="🔒 Режим лише порожніх", p=[
        "Найбезпечніший спосіб почати — режим «лише порожні». Сторінки, у яких метатеги вже заповнені й оптимізовані вручну, лишаються недоторканими, а генерація закриває тільки прогалини. Коли шаблон перевірено, можна перейти до перезапису, але таке рішення ухвалюється свідомо: контроль перезапису вмикається окремо."]),
      dict(h="📦 Три типи сторінок", p=[
        "Масова генерація доступна для товарів, категорій і виробників. Їх можна обробляти по черзі або обирати лише потрібний тип: наприклад, спершу навести лад у категоріях, а до товарів повернутися пізніше."]),
      dict(h="📏 Контроль довжини та якості", p=[
        "Отримані значення перевіряються за довжиною й якістю. Це захищає від надто коротких або, навпаки, роздутих метатегів, які пошукова система все одно обріже у видачі."]),
      dict(h="🛟 Що зробити перед масовим запуском", p=[
        "Перед масовим записом зробіть резервну копію бази даних. Починайте з режиму «лише порожні», перевіряйте результат на вибірці й розширюйте охоплення поступово. Так ви втратите мінімум, навіть якщо шаблон виявиться невдалим."]),
    ]),
  en=dict(
    intro=[
      "After a catalogue import from Excel or from a supplier, thousands of products often have empty Meta Title and Meta Description fields, and the rest share identical ones. Nobody is going to fill every page by hand. SEO Meta PRO bulk-writes Meta Title, Meta Description, Meta Keywords and H1 for products, categories and manufacturers from templates.",
      "The module solves one narrow problem honestly: it sorts out metadata where it is missing or repetitive. It does not replace an SEO strategy, keyword research or the quality of the texts themselves, and that is worth remembering.",
    ],
    sections=[
      dict(h="🧩 A template instead of manual labour", p=[
        "You write a template, and the module inserts the data of the particular product, category or manufacturer wherever you mark it. One line produces thousands of different titles and descriptions, each carrying the name of its own page rather than the same text copied everywhere.",
        "Separate templates are set for every language of the shop. The Russian and Ukrainian pages get metadata in their own language, not a word-for-word copy of a single template."]),
      dict(h="👁 Preview before writing", p=[
        "Before anything is saved, run a preview on a small sample. You see the finished values for real pages and notice at once if a template yields a title that is too long or glues words together oddly. Fixing a template at this stage costs nothing; fixing thousands of written fields takes much longer."]),
      dict(h="🔒 Empty-only mode", p=[
        "The safest way to begin is the empty-only mode. Pages whose metadata is already filled in and tuned by hand stay untouched, and generation closes only the gaps. Once the template has proved itself you can move to overwriting, but that is a conscious decision: overwrite control is switched on separately."]),
      dict(h="📦 Three kinds of pages", p=[
        "Bulk generation covers products, categories and manufacturers. You can run them one after another or pick just the type you need, for instance tidy up the categories first and return to products later."]),
      dict(h="📏 Length and quality checks", p=[
        "The resulting values are checked for length and quality. That guards against metadata that is too short or, on the contrary, bloated, which a search engine would trim in the results anyway."]),
      dict(h="🛟 Before a bulk run", p=[
        "Make a database backup before any bulk write. Start with the empty-only mode, check the result on a sample and widen the scope gradually. That way you lose very little even if a template turns out to be a poor one."]),
    ]),
  cover=dict(
    tagline="Метатеги и H1 по шаблонам для всего каталога",
    items=["Meta Title и Description", "Keywords и H1", "Шаблоны по языкам", "Предпросмотр", "Режим только пустых", "Контроль длины"],
    cards=[
      ("Шаблоны", "Подстановка данных товара, категории, бренда"),
      ("Языки", "Отдельный шаблон для каждого языка"),
      ("Предпросмотр", "Результат виден до записи в базу"),
      ("Только пустые", "Готовые метатеги не затрагиваются"),
      ("Массовая запись", "Товары, категории и производители"),
      ("Контроль качества", "Проверка длины полученных значений"),
    ],
    tabs=["Шаблоны", "Предпросмотр", "Генерация", "Настройки"],
    kpis=[("Товаров", "4 820"), ("Без Title", "1 276"), ("Заполнено", "3 544")],
  ),
)

# ---------------------------------------------------------------- 86 Multi Store CRM
P[86] = dict(
  ru=dict(
    intro=[
      "Когда у владельца три магазина на OpenCart, клиенты и заказы разбросаны по трём админкам, и общей картины нет. Multi Store CRM Connector PRO открывает в каждом магазине защищённый API только для чтения, и центральная Windows CRM забирает оттуда клиентов, заказы и источник данных.",
      "Ключевое слово здесь — односторонность. CRM читает, но ни при каких условиях не может ничего изменить на сайтах. Это сознательное решение: ошибка или взлом на стороне CRM не превратятся в испорченные заказы в магазине.",
    ],
    sections=[
      dict(h="🔐 Каждый запрос подписан", p=[
        "Обращения CRM к магазину подписываются по схеме HMAC-SHA256 с общим секретным токеном. Запрос без правильной подписи просто не принимается. Сам токен генерируется в настройках модуля и там же проверяется, так что придумывать и вводить длинную строку вручную не нужно."]),
      dict(h="👁 Только чтение, и это проверяется", p=[
        "В рабочем API есть исключительно операции чтения. Эндпоинтов для изменения заказов, клиентов и статусов в нём нет вообще, поэтому защита держится не на запрете, а на отсутствии самой возможности.",
        "Перед синхронизацией CRM сама удостоверяется в безопасности: она проверяет признак read_only равным true, список возможностей коннектора и наличие нужных таблиц в базе. Если что-то не сходится, синхронизация не начинается."]),
      dict(h="📊 Что именно забирает CRM", p=[
        "Из магазина выгружаются клиенты вместе с основной компанией, городом и страной, а также заказы с указанием магазина, из которого они пришли. Поэтому в общей CRM видно, какому из ваших сайтов принадлежит каждая запись, и можно сравнивать магазины между собой."]),
      dict(h="🏬 Установка в каждом магазине", p=[
        "Модуль ставится отдельно в каждый подключаемый магазин. Для каждого генерируется свой токен, а в CRM вводятся адрес магазина и этот токен. Так подключается сколько угодно сайтов, и компрометация одного не открывает остальные."]),
      dict(h="🚦 Включение только после настройки", p=[
        "После установки модуль выключен. Включайте его вручную, когда в CRM уже внесены адрес и токен: тогда в момент первого обращения всё готово и нет окна, в котором API открыт без пары на другой стороне."]),
      dict(h="🧹 Удаление и обновление", p=[
        "Если коннектор удалить, заказы и клиенты магазина остаются на месте: модуль не хранит ваши данные и не владеет ими. Перед обновлением всё же делайте резервную копию, как с любым расширением."]),
    ]),
  uk=dict(
    intro=[
      "Коли у власника три магазини на OpenCart, клієнти й замовлення розкидані по трьох адмінках, і загальної картини немає. Multi Store CRM Connector PRO відкриває в кожному магазині захищений API лише для читання, а центральна Windows CRM забирає звідти клієнтів, замовлення та джерело даних.",
      "Ключове слово тут — односторонність. CRM читає, але за жодних умов не може нічого змінити на сайтах. Це свідоме рішення: помилка чи злам на боці CRM не перетворяться на зіпсовані замовлення в магазині.",
    ],
    sections=[
      dict(h="🔐 Кожен запит підписано", p=[
        "Звернення CRM до магазину підписуються за схемою HMAC-SHA256 зі спільним секретним токеном. Запит без правильного підпису просто не приймається. Сам токен генерується в налаштуваннях модуля й там само перевіряється, тож вигадувати й вводити довгий рядок вручну не треба."]),
      dict(h="👁 Лише читання, і це перевіряється", p=[
        "У робочому API є виключно операції читання. Ендпоінтів для зміни замовлень, клієнтів і статусів у ньому немає взагалі, тому захист тримається не на забороні, а на відсутності самої можливості.",
        "Перед синхронізацією CRM сама пересвідчується в безпеці: вона перевіряє ознаку read_only рівною true, перелік можливостей конектора та наявність потрібних таблиць у базі. Якщо щось не збігається, синхронізація не починається."]),
      dict(h="📊 Що саме забирає CRM", p=[
        "З магазину вивантажуються клієнти разом з основною компанією, містом і країною, а також замовлення із зазначенням магазину, з якого вони надійшли. Тому в спільній CRM видно, якому з ваших сайтів належить кожен запис, і можна порівнювати магазини між собою."]),
      dict(h="🏬 Встановлення в кожному магазині", p=[
        "Модуль ставиться окремо в кожен магазин, що підключається. Для кожного генерується свій токен, а в CRM вводяться адреса магазину та цей токен. Так підключається будь-яка кількість сайтів, і компрометація одного не відкриває решту."]),
      dict(h="🚦 Увімкнення лише після налаштування", p=[
        "Після встановлення модуль вимкнений. Вмикайте його вручну, коли в CRM уже внесено адресу й токен: тоді на момент першого звернення все готове й немає вікна, в якому API відкритий без пари на іншому боці."]),
      dict(h="🧹 Видалення та оновлення", p=[
        "Якщо конектор видалити, замовлення й клієнти магазину лишаються на місці: модуль не зберігає ваші дані й не володіє ними. Перед оновленням усе ж робіть резервну копію, як із будь-яким розширенням."]),
    ]),
  en=dict(
    intro=[
      "When an owner runs three OpenCart shops, customers and orders are scattered across three admin panels and nobody sees the whole picture. Multi Store CRM Connector PRO opens a protected read-only API in each shop, and a central Windows CRM pulls customers, orders and the data source from it.",
      "The key word is one-way. The CRM reads, but under no circumstances can it change anything on the sites. That is a deliberate choice: a mistake or a break-in on the CRM side cannot turn into damaged orders in the shop.",
    ],
    sections=[
      dict(h="🔐 Every request is signed", p=[
        "Requests from the CRM to the shop are signed with HMAC-SHA256 using a shared secret token. A request without a valid signature is simply rejected. The token is generated in the module settings and verified there too, so nobody has to invent and type a long string by hand."]),
      dict(h="👁 Read-only, and verified", p=[
        "The runtime API contains read operations only. There are no endpoints at all for changing orders, customers or statuses, so the protection rests not on a prohibition but on the absence of the capability itself.",
        "Before syncing, the CRM checks safety on its own: it confirms that read_only is true, looks at the connector capabilities and verifies that the required tables exist. If anything does not add up, synchronisation does not start."]),
      dict(h="📊 What the CRM actually collects", p=[
        "From each shop it takes customers together with their primary company, city and country, and orders that carry the shop they came from. In the shared CRM you can therefore see which of your sites every record belongs to and compare the shops with each other."]),
      dict(h="🏬 Installed in every shop", p=[
        "The module is installed separately in each shop you connect. Each one gets its own token, and in the CRM you enter the shop address and that token. Any number of sites can be connected this way, and compromising one does not open the others."]),
      dict(h="🚦 Switch on only after setup", p=[
        "After installation the module is off. Enable it by hand once the address and token have been entered in the CRM: then everything is ready at the first request and there is no window in which the API is open with no counterpart on the other side."]),
      dict(h="🧹 Removal and updates", p=[
        "If the connector is removed, the shop's orders and customers stay where they are: the module neither stores your data nor owns it. Before updating, still make a backup, as with any extension."]),
    ]),
  cover=dict(
    tagline="Один CRM для нескольких магазинов, без права записи",
    items=["API только для чтения", "Подпись HMAC-SHA256", "Клиенты и заказы", "Несколько магазинов", "Секретный токен", "Проверка read_only"],
    cards=[
      ("Только чтение", "В API нет операций изменения данных"),
      ("HMAC-SHA256", "Каждый запрос CRM подписан токеном"),
      ("Проверка CRM", "read_only, возможности и нужные таблицы"),
      ("Клиенты", "Компания, город и страна клиента"),
      ("Заказы", "С указанием магазина-источника"),
      ("Безопасное удаление", "Данные магазина остаются на месте"),
    ],
    tabs=["Основные", "Токен", "Проверка", "Журнал"],
    kpis=[("Магазинов", "3"), ("Клиентов", "5 412"), ("Заказов", "9 870")],
  ),
)

# ---------------------------------------------------------------- 88 Quick Price Edit
P[88] = dict(
  ru=dict(
    intro=[
      "Менеджер заметил, что цена на кабель в прайсе поставщика выросла на пару гривен. Чтобы повторить это в магазине, нужно открыть карточку товара, найти вкладку «Данные», поменять одну цифру, сохранить и вернуться к списку. Для десяти позиций это раздражает, для сотни отнимает полдня.",
      "Quick Price Edit PRO убирает лишние шаги. В списке «Каталог → Товары» цену можно поменять прямо на месте: достаточно нажать иконку карандаша или дважды кликнуть по значению.",
    ],
    sections=[
      dict(h="✏️ Правка в одну строку", p=[
        "Рядом с ценой в списке появляется иконка карандаша. Нажмите её или просто сделайте двойной клик по самой цене — значение превратится в поле ввода. Введите новое число, подтвердите, и оно сохранится.",
        "Менять можно стандартное поле цены товара, то есть то самое, что вы видите в карточке на вкладке данных."]),
      dict(h="⚡ Без перезагрузки страницы", p=[
        "Сохранение идёт через AJAX, поэтому страница не обновляется и не прыгает наверх. Вы остаёмся на том же месте списка, с теми же фильтрами и страницей пагинации, и сразу переходите к следующей позиции. Для длинных списков это решающее удобство: не нужно искать, где вы остановились."]),
      dict(h="🎯 Модуль намеренно узкий", p=[
        "Он меняет только обычную цену. Акции, скидки и цены опций остаются как были. Это важно: быстрое исправление базовой цены не должно случайно перетереть специальное предложение, которое настроили отдельно. Если нужна сложная логика цен, делать её по-прежнему приходится в карточке товара."]),
      dict(h="🪶 Лёгкость при выключении", p=[
        "Когда модуль выключен, AJAX, CSS и JavaScript в админку не подключаются. Выключенное расширение не добавляет ни строки к странице и ничего не загружает, так что оставить его установленным про запас безопасно."]),
      dict(h="🧪 Перед использованием", p=[
        "Установите и включите модуль, откройте «Каталог → Товары», дважды кликните цену и введите новое значение. Прежде чем доверять модулю рабочие цены, проверьте его на тестовой копии: убедитесь, что правка отражается в карточке товара, а акции действительно остались нетронутыми."]),
    ]),
  uk=dict(
    intro=[
      "Менеджер помітив, що ціна на кабель у прайсі постачальника зросла на пару гривень. Щоб повторити це в магазині, треба відкрити картку товару, знайти вкладку «Дані», змінити одну цифру, зберегти й повернутися до списку. Для десяти позицій це дратує, для сотні забирає пів дня.",
      "Quick Price Edit PRO прибирає зайві кроки. У списку «Каталог → Товари» ціну можна змінити просто на місці: досить натиснути іконку олівця або двічі клікнути по значенню.",
    ],
    sections=[
      dict(h="✏️ Правка в один рядок", p=[
        "Поруч із ціною у списку з'являється іконка олівця. Натисніть її або просто зробіть подвійний клік по самій ціні — значення перетвориться на поле введення. Введіть нове число, підтвердіть, і воно збережеться.",
        "Змінювати можна стандартне поле ціни товару, тобто те саме, що ви бачите в картці на вкладці даних."]),
      dict(h="⚡ Без перезавантаження сторінки", p=[
        "Збереження йде через AJAX, тому сторінка не оновлюється й не стрибає нагору. Ви лишаєтеся на тому самому місці списку, з тими самими фільтрами та сторінкою пагінації, і одразу переходите до наступної позиції. Для довгих списків це вирішальна зручність: не треба шукати, де ви зупинилися."]),
      dict(h="🎯 Модуль навмисно вузький", p=[
        "Він змінює лише звичайну ціну. Акції, знижки та ціни опцій лишаються як були. Це важливо: швидке виправлення базової ціни не повинно випадково перетерти спеціальну пропозицію, яку налаштували окремо. Якщо потрібна складна логіка цін, робити її, як і раніше, доведеться в картці товару."]),
      dict(h="🪶 Легкість під час вимкнення", p=[
        "Коли модуль вимкнений, AJAX, CSS і JavaScript в адмінку не підключаються. Вимкнене розширення не додає до сторінки жодного рядка й нічого не завантажує, тож лишити його встановленим про запас безпечно."]),
      dict(h="🧪 Перед використанням", p=[
        "Встановіть і увімкніть модуль, відкрийте «Каталог → Товари», двічі клікніть ціну й уведіть нове значення. Перш ніж довіряти модулю робочі ціни, перевірте його на тестовій копії: переконайтеся, що правка відображається в картці товару, а акції справді лишилися недоторканими."]),
    ]),
  en=dict(
    intro=[
      "A manager notices that the price of a cable in the supplier's list went up by a couple of units. To repeat that in the shop they must open the product page, find the Data tab, change one number, save and return to the list. For ten items that is annoying; for a hundred it eats half a day.",
      "Quick Price Edit PRO removes the extra steps. In the Catalog, Products list the price can be changed right where it is: click the pencil icon or double-click the value.",
    ],
    sections=[
      dict(h="✏️ Editing in a single row", p=[
        "A pencil icon appears next to the price in the list. Click it, or simply double-click the price itself, and the value turns into an input field. Type the new number, confirm, and it is saved.",
        "What you change is the standard product price field, the very one you see on the Data tab of the product page."]),
      dict(h="⚡ No page reload", p=[
        "Saving goes through AJAX, so the page does not refresh or jump to the top. You stay at the same spot in the list, with the same filters and the same page of results, and move straight to the next item. In long lists that is the decisive convenience: there is no hunting for where you left off."]),
      dict(h="🎯 Narrow on purpose", p=[
        "It changes the regular price only. Specials, discounts and option prices stay as they were. That matters: a quick fix to the base price must not accidentally wipe a special offer configured separately. If you need complex pricing logic, you still build it in the product page."]),
      dict(h="🪶 Light when switched off", p=[
        "While the module is disabled, no AJAX, CSS or JavaScript is loaded into the admin panel. A disabled extension adds nothing to the page and loads nothing, so leaving it installed just in case is harmless."]),
      dict(h="🧪 Before relying on it", p=[
        "Install and enable the module, open Catalog, Products, double-click a price and enter the new value. Before trusting it with live prices, try it on a test copy: make sure the change shows up on the product page and that specials really were left untouched."]),
    ]),
  cover=dict(
    tagline="Меняйте цену прямо в списке товаров",
    items=["Карандаш у цены", "Двойной клик", "Сохранение через AJAX", "Без перезагрузки", "Акции не затронуты", "Лёгкий выключенный"],
    cards=[
      ("Правка на месте", "Иконка карандаша или двойной клик по цене"),
      ("AJAX", "Сохранение без перезагрузки страницы"),
      ("Стандартная цена", "Меняется только поле price товара"),
      ("Акции целы", "Скидки и цены опций не изменяются"),
      ("Фильтры на месте", "Список остаётся в том же положении"),
      ("Без лишних файлов", "В выключенном виде CSS и JS не грузятся"),
    ],
    tabs=["Основные", "Список", "Поведение", "Справка"],
    kpis=[("Правок", "87"), ("Товаров", "1 240"), ("Ошибок", "0")],
  ),
)

# ---------------------------------------------------------------- 90 Google Product Category
P[90] = dict(
  ru=dict(
    intro=[
      "Чтобы Google Merchant Center правильно разложил ваши товары по полкам, каждой категории нужен код из таксономии Google, например числовой ID вида 1234. В OpenCart для него нет места, и его приходится хранить в таблицах Excel, в голове у фид-менеджера или вписывать в чужие поля. Google Product Category Field PRO добавляет в категорию отдельное поле именно для этого.",
      "Поле не путается с SEO-данными и не совпадает с внутренним category_id магазина. Оно появляется в «Каталог → Категории → Данные», хранит одно число и больше ничего не делает на витрине.",
    ],
    sections=[
      dict(h="🏷 Одно поле, одна задача", p=[
        "Открываете категорию, переходите на вкладку «Данные» и видите новое поле Google Product Category ID. Туда вписывается числовой идентификатор из официальной таксономии Google. Сохранили категорию — значение записалось вместе с остальными данными."]),
      dict(h="🔢 Только число, не путь", p=[
        "В поле нужно хранить именно числовой ID, а не текстовый путь вроде цепочки названий категорий Google. Числовой идентификатор стабилен и однозначен, тогда как текстовый путь легко ошибиться написать или потерять при смене формулировки. Модуль заточен под число, и именно его ждут фиды."]),
      dict(h="📤 Кто использует значение", p=[
        "Само поле ничего никуда не отправляет. Данные из него берут фиды товаров, например Merchant Feed Simple XML PRO, и подставляют в выгрузку для Google Merchant. Модуль выступает как аккуратное хранилище для соответствия ваших категорий и таксономии Google."]),
      dict(h="🌳 Наследование от родителя", p=[
        "Если у подкатегории код не заполнен, наследование от родительской категории выполняет товарный фид, а не сам модуль. Поэтому для большого дерева не обязательно вписывать ID в каждую вложенную ветку: достаточно задать его на нужном уровне, если ваш фид так умеет."]),
      dict(h="🧊 Не влияет на витрину и SEO", p=[
        "Значение не показывается покупателям, не попадает в метатеги и не меняет адреса страниц. Установка модуля безопасна для уже настроенной оптимизации магазина, ведь он лишь добавляет поле в админке и в данные категории."]),
      dict(h="🚀 Быстрый старт", p=[
        "Установите и включите модуль, откройте нужную категорию, вкладку «Данные», впишите числовой ID из таксономии Google и сохраните. Повторите для остальных категорий, а затем проверьте выгрузку в вашем фиде."]),
    ]),
  uk=dict(
    intro=[
      "Щоб Google Merchant Center правильно розклав ваші товари по поличках, кожній категорії потрібен код із таксономії Google, наприклад числовий ID на кшталт 1234. В OpenCart для нього немає місця, і його доводиться зберігати в таблицях Excel, у голові фід-менеджера або вписувати в чужі поля. Google Product Category Field PRO додає в категорію окреме поле саме для цього.",
      "Поле не плутається із SEO-даними й не збігається з внутрішнім category_id магазину. Воно з'являється в «Каталог → Категорії → Дані», зберігає одне число й більше нічого не робить на вітрині.",
    ],
    sections=[
      dict(h="🏷 Одне поле, одне завдання", p=[
        "Відкриваєте категорію, переходите на вкладку «Дані» й бачите нове поле Google Product Category ID. Туди вписується числовий ідентифікатор з офіційної таксономії Google. Зберегли категорію — значення записалося разом з іншими даними."]),
      dict(h="🔢 Лише число, не шлях", p=[
        "У полі потрібно зберігати саме числовий ID, а не текстовий шлях на кшталт ланцюжка назв категорій Google. Числовий ідентифікатор стабільний і однозначний, тоді як у текстовому шляху легко помилитися або втратити його під час зміни формулювання. Модуль заточений під число, і саме його чекають фіди."]),
      dict(h="📤 Хто використовує значення", p=[
        "Саме поле нічого нікуди не надсилає. Дані з нього беруть фіди товарів, наприклад Merchant Feed Simple XML PRO, і підставляють у вивантаження для Google Merchant. Модуль виступає як охайне сховище для відповідності ваших категорій і таксономії Google."]),
      dict(h="🌳 Успадкування від батьківської категорії", p=[
        "Якщо в підкатегорії код не заповнено, успадкування від батьківської категорії виконує товарний фід, а не сам модуль. Тому для великого дерева не обов'язково вписувати ID у кожну вкладену гілку: досить задати його на потрібному рівні, якщо ваш фід так уміє."]),
      dict(h="🧊 Не впливає на вітрину та SEO", p=[
        "Значення не показується покупцям, не потрапляє в метатеги й не змінює адреси сторінок. Встановлення модуля безпечне для вже налаштованої оптимізації магазину, адже він лише додає поле в адмінці та в дані категорії."]),
      dict(h="🚀 Швидкий старт", p=[
        "Встановіть і увімкніть модуль, відкрийте потрібну категорію, вкладку «Дані», впишіть числовий ID із таксономії Google і збережіть. Повторіть для решти категорій, а потім перевірте вивантаження у вашому фіді."]),
    ]),
  en=dict(
    intro=[
      "For Google Merchant Center to file your products correctly, every category needs a code from the Google taxonomy, a numeric ID of the form 1234. OpenCart has no place for it, so it ends up in Excel sheets, in the feed manager's head, or squeezed into fields meant for something else. Google Product Category Field PRO adds a dedicated field to the category for exactly this purpose.",
      "The field is not mixed up with SEO data and is not the shop's internal category_id. It appears under Catalog, Categories, Data, holds a single number and does nothing else on the storefront.",
    ],
    sections=[
      dict(h="🏷 One field, one job", p=[
        "Open a category, go to the Data tab and you will see the new Google Product Category ID field. Enter the numeric identifier from the official Google taxonomy there. Save the category and the value is stored with the rest of its data."]),
      dict(h="🔢 A number, not a path", p=[
        "What belongs in the field is the numeric ID, not a text path such as a chain of Google category names. A numeric identifier is stable and unambiguous, whereas a text path is easy to mistype or to lose when the wording changes. The module is built around the number, and that is what feeds expect."]),
      dict(h="📤 Who uses the value", p=[
        "The field itself sends nothing anywhere. Product feeds, for example Merchant Feed Simple XML PRO, read it and put it into the export for Google Merchant. The module acts as a tidy store for the mapping between your categories and the Google taxonomy."]),
      dict(h="🌳 Inheritance from the parent", p=[
        "If a subcategory has no code, inheriting from the parent category is done by the product feed, not by the module. For a large tree you therefore do not have to enter an ID in every nested branch: set it at the right level if your feed supports that."]),
      dict(h="🧊 No effect on storefront or SEO", p=[
        "The value is not shown to shoppers, does not end up in meta tags and does not change page URLs. Installing the module is safe for optimisation you have already set up, because it only adds a field in the admin and in the category data."]),
      dict(h="🚀 Quick start", p=[
        "Install and enable the module, open the category you need, go to the Data tab, enter the numeric ID from the Google taxonomy and save. Repeat for the other categories, then check the export in your feed."]),
    ]),
  cover=dict(
    tagline="Код таксономии Google для каждой категории",
    items=["Поле в категории", "Числовой ID Google", "Для Merchant Center", "Не путается с SEO", "Работает с фидами", "Витрина не затронута"],
    cards=[
      ("Новое поле", "Google Product Category ID на вкладке Данные"),
      ("Только число", "Хранится числовой ID таксономии Google"),
      ("Для фидов", "Значение берёт товарный фид, например Merchant"),
      ("Не category_id", "Отдельное поле, перепутать нельзя"),
      ("Наследование", "От родителя его выполняет сам фид"),
      ("Без влияния на SEO", "Покупатели и метатеги не затрагиваются"),
    ],
    tabs=["Основные", "Категории", "Фиды", "Справка"],
    kpis=[("Категорий", "86"), ("С ID", "74"), ("Без ID", "12")],
  ),
)
