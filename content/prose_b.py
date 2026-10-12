# -*- coding: utf-8 -*-
P = {}

P[51] = dict(
  ru=dict(
    intro=[
      "Первое письмо после оформления заказа — это, по сути, первое впечатление о магазине уже после оплаты решения. Стандартное письмо OpenCart выглядит скромно и мало что объясняет. Order Email PRO заменяет его или дополняет аккуратными HTML-письмами для покупателя и для администратора: с логотипом, фирменными цветами, составом заказа и итогами.",
      "Модуль охватывает не только новый заказ. Отдельные письма предусмотрены для смены статуса, регистрации, возврата, контактной формы, ваучера, партнёрской регистрации и транзакций. То есть всё, что магазин отправляет автоматически, можно привести к одному стилю и одному тону.",
    ],
    sections=[
      dict(h="✉️ Какие письма он берёт на себя", p=[
        "Покупатель получает письмо о новом заказе, а затем отдельные сообщения при смене статуса: можно написать один текст для «Обработка» и совсем другой для «Отправлен». Администратор видит собственную версию уведомления со своими акцентами, например с контактами клиента на виду.",
        "Помимо заказов поддерживаются регистрация клиента, возврат, обращение через контактную форму, подарочный ваучер, партнёрская регистрация и транзакции. Каждое из этих писем имеет свой шаблон, и вы решаете, какие из них переопределять, а какие оставить стандартными.",
      ]),
      dict(h="🎨 Редактор: визуально или в HTML", p=[
        "Шаблон можно собирать в визуальном редакторе, а можно открыть HTML-режим и поправить разметку вручную. Правки между режимами синхронизируются, поэтому не придётся выбирать между удобством и точностью: верстальщик правит код, а контент-менеджер потом меняет текст мышкой.",
        "В письма подставляются переменные заказа: данные клиента, список товаров и итоговые суммы. Логотип и цвета задаются один раз и применяются ко всем шаблонам, так что фирменный вид не нужно настраивать отдельно в каждом письме.",
      ]),
      dict(h="🌐 Языки и статусы", p=[
        "Шаблоны мультиязычные: покупатель, оформивший заказ на украинской версии витрины, получит письмо на украинском, а клиент на английской версии — на английском. Для разных статусов заказа можно держать отдельные письма, а не один универсальный текст, который подходит ко всему понемногу.",
      ]),
      dict(h="🧪 Проверка до запуска", p=[
        "Перед включением доступны предпросмотр и тестовая отправка. Вы видите, как письмо выглядит, и отправляете его на свой адрес, чтобы убедиться, что оно корректно открывается в вашей почте. Модуль устанавливается выключенным, поэтому покупатели не увидят промежуточных экспериментов.",
        "Рекомендуемый порядок такой: выбрать дизайн, настроить логотип, цвета и тексты, проверить предпросмотр, отправить тестовое письмо и только затем включить модуль. После этого клиенты начнут получать новые письма.",
      ]),
      dict(h="💾 Резерв и откат", p=[
        "Шаблоны можно экспортировать и импортировать в формате JSON, поэтому настроенный набор легко перенести на другой сайт или сохранить как копию. Если эксперимент не удался, шаблон по умолчанию восстанавливается одним действием.",
      ]),
      dict(h="🛡️ Дубли, журнал и диагностика", p=[
        "Модуль защищает от дублей, чтобы клиент не получил два одинаковых письма об одном событии. Отправки пишутся в журнал, а расширенная диагностика помогает понять, почему письмо не ушло или ушло не так, как ожидалось. Лицензионный ключ активируется в разделе «О модуле».",
      ]),
    ]),
  uk=dict(
    intro=[
      "Перший лист після оформлення замовлення — це перше враження про магазин уже після того, як покупець ухвалив рішення. Стандартний лист OpenCart виглядає скромно й мало що пояснює. Order Email PRO замінює його або доповнює охайними HTML-листами для покупця та адміністратора: з логотипом, фірмовими кольорами, складом замовлення й підсумками.",
      "Модуль охоплює не лише нове замовлення. Окремі листи передбачені для зміни статусу, реєстрації, повернення, контактної форми, ваучера, партнерської реєстрації та транзакцій. Тобто все, що магазин надсилає автоматично, можна привести до єдиного стилю й тону.",
    ],
    sections=[
      dict(h="✉️ Які листи він бере на себе", p=[
        "Покупець отримує лист про нове замовлення, а далі окремі повідомлення під час зміни статусу: можна написати один текст для «Обробка» і зовсім інший для «Відправлено». Адміністратор бачить власну версію сповіщення зі своїми акцентами, наприклад із контактами клієнта на видноті.",
        "Окрім замовлень підтримуються реєстрація клієнта, повернення, звернення через контактну форму, подарунковий ваучер, партнерська реєстрація й транзакції. Кожен із цих листів має свій шаблон, і ви самі вирішуєте, які з них перевизначати, а які лишити стандартними.",
      ]),
      dict(h="🎨 Редактор: візуально або в HTML", p=[
        "Шаблон можна збирати у візуальному редакторі, а можна відкрити HTML-режим і поправити розмітку вручну. Правки між режимами синхронізуються, тож не доведеться обирати між зручністю та точністю: верстальник править код, а контент-менеджер потім змінює текст мишкою.",
        "У листи підставляються змінні замовлення: дані клієнта, перелік товарів і підсумкові суми. Логотип і кольори задаються один раз та застосовуються до всіх шаблонів, тому фірмовий вигляд не треба налаштовувати окремо в кожному листі.",
      ]),
      dict(h="🌐 Мови та статуси", p=[
        "Шаблони мультимовні: покупець, який оформив замовлення в українській версії вітрини, отримає лист українською, а клієнт в англійській версії — англійською. Для різних статусів замовлення можна тримати окремі листи, а не один універсальний текст, який до всього підходить потроху.",
      ]),
      dict(h="🧪 Перевірка перед запуском", p=[
        "Перед вмиканням доступні попередній перегляд і тестове надсилання. Ви бачите, як виглядає лист, і відправляєте його на власну адресу, щоб переконатися, що він коректно відкривається у вашій пошті. Модуль встановлюється вимкненим, тож покупці не побачать проміжних експериментів.",
        "Рекомендований порядок такий: обрати дизайн, налаштувати логотип, кольори й тексти, перевірити попередній перегляд, надіслати тестовий лист і лише потім увімкнути модуль. Після цього клієнти почнуть отримувати нові листи.",
      ]),
      dict(h="💾 Резерв і відкат", p=[
        "Шаблони можна експортувати та імпортувати у форматі JSON, тому налаштований набір легко перенести на інший сайт або зберегти як копію. Якщо експеримент не вдався, шаблон за замовчуванням відновлюється однією дією.",
      ]),
      dict(h="🛡️ Дублі, журнал і діагностика", p=[
        "Модуль захищає від дублів, щоб клієнт не отримав два однакові листи про одну подію. Надсилання записуються в журнал, а розширена діагностика допомагає зрозуміти, чому лист не пішов або пішов не так, як очікувалося. Ліцензійний ключ активується в розділі «Про модуль».",
      ]),
    ]),
  en=dict(
    intro=[
      "The first email a customer receives after checkout is the store's first impression once the decision has already been made. The default OpenCart message looks plain and explains very little. Order Email PRO replaces it, or sits alongside it, with clean HTML emails for both the customer and the administrator, complete with your logo, brand colours, order contents and totals.",
      "It goes well beyond the new-order message. Separate emails exist for status changes, registration, returns, the contact form, gift vouchers, affiliate registration and transactions. Everything the store sends automatically can share one look and one tone of voice.",
    ],
    sections=[
      dict(h="✉️ Which emails it takes over", p=[
        "The customer gets a new-order email and then separate messages as the status changes: you can write one text for Processing and a completely different one for Shipped. The administrator sees their own version of the notification, with the emphasis in different places, for instance the customer's contact details up front.",
        "Beyond orders, the module covers customer registration, returns, contact form enquiries, gift vouchers, affiliate registration and transactions. Each has its own template, and you decide which ones to override and which to leave as they are.",
      ]),
      dict(h="🎨 Editing visually or in HTML", p=[
        "You can build a template in the visual editor or switch to HTML mode and adjust the markup by hand. Changes are synchronised between the two modes, so you do not have to choose between convenience and precision: a front-end developer edits the code, and a content editor then changes the wording with the mouse.",
        "Order variables are filled in automatically: customer details, the product list and the totals. The logo and colours are set once and applied to every template, so the brand look does not need to be configured email by email.",
      ]),
      dict(h="🌐 Languages and statuses", p=[
        "Templates are multilingual: a customer who ordered on the Ukrainian storefront receives the email in Ukrainian, and one on the English storefront receives it in English. Different order statuses can have their own emails instead of a single generic text that fits everything a little.",
      ]),
      dict(h="🧪 Testing before launch", p=[
        "Before you switch anything on, preview and test sending are available. You see how the email looks and send it to your own address to confirm that it displays correctly in your mail client. The module is installed switched off, so customers never see half-finished experiments.",
        "The suggested order is to pick a design, set the logo, colours and wording, check the preview, send a test email and only then enable the module. From that moment customers start receiving the new emails.",
      ]),
      dict(h="💾 Backup and rollback", p=[
        "Templates can be exported and imported as JSON, which makes it easy to move a finished set to another site or keep it as a copy. If an experiment goes wrong, the default template can be restored in a single action.",
      ]),
      dict(h="🛡️ Duplicates, log and diagnostics", p=[
        "The module guards against duplicates so a customer does not receive two identical emails about one event. Every send is recorded in a log, and extended diagnostics help you work out why an email did not go out or looked different from what you expected. The licence key is activated in the About tab.",
      ]),
    ]),
  cover=dict(
    tagline="Фирменные HTML-письма о заказах",
    items=["Письма клиенту", "Письма админу", "Шаблоны статусов", "Визуальный редактор", "Тестовая отправка", "Импорт и экспорт"],
    cards=[
      ("Новый заказ", "Состав, суммы и контакты в аккуратном письме"),
      ("Смена статуса", "Свой текст для каждого статуса заказа"),
      ("Редактор и HTML", "Правки синхронизируются между режимами"),
      ("Мультиязычность", "Шаблон под каждый язык магазина"),
      ("Предпросмотр", "Проверка и тест до включения"),
      ("Резерв JSON", "Экспорт, импорт и сброс шаблона"),
    ],
    tabs=["Шаблоны", "Дизайн", "Журнал", "О модуле"],
    kpis=[("Писем сегодня", "48"), ("Шаблонов", "14"), ("Дублей отсечено", "3")],
  ),
)

P[68] = dict(
  ru=dict(
    intro=[
      "Стандартное оформление заказа в OpenCart растянуто на несколько шагов, и на каждом из них часть покупателей закрывает вкладку. Checkout Simple PRO собирает всё на одной странице: контакты, доставка, оплата и итоги видны сразу, а покупатель понимает, сколько ему осталось заполнить.",
      "Состав полей и порядок блоков администратор настраивает сам. Нужен только телефон и адрес — убираете лишнее; хотите, чтобы способ доставки шёл перед контактами — меняете местами. Гостевой заказ поддерживается, регистрироваться ради покупки не обязательно.",
    ],
    sections=[
      dict(h="🧱 Одна страница вместо цепочки шагов", p=[
        "Форма оформления построена из блоков, которые можно включать, отключать и переставлять. Поля тоже настраиваются: что показывать, что требовать обязательно. В результате страница оформления соответствует именно вашему магазину, а не усреднённому сценарию из коробки.",
        "Поле телефона форматируется с учётом того, что нужно Новой Почте, поэтому номера приходят в заказ в единообразном виде. Оформление рассчитано в том числе на витрину UniShop2.",
      ]),
      dict(h="⚡ Пересчёт без перезагрузки", p=[
        "Когда покупатель меняет способ доставки или оплаты, итоги пересчитываются через AJAX. Страница не мигает и не теряет уже введённые данные. Доставка, оплата и общая сумма обновляются в одном месте на глазах у покупателя.",
      ]),
      dict(h="🔒 Принцип безопасности в итогах", p=[
        "Самая важная деталь — как модуль ведёт себя при сбое. Если любое включённое расширение итогов (скидка, купон, налог, наценка) выдало ошибку, подтверждение заказа блокируется. Модуль не создаёт заказ с неполной суммой, из-за которой магазин мог бы продать товар дешевле, чем должен.",
        "Запросы витрины, которые что-то изменяют, принимаются только методом POST и с ключом формы. Если модуль выключен, эти запросы не работают вообще.",
      ]),
      dict(h="🧯 Постепенное включение", p=[
        "Модуль можно установить и не трогать витрину. Для проверки есть отдельный тестовый маршрут checkout/checkout_simple_pro: на нём вы оформляете пробный заказ, пока обычные покупатели продолжают пользоваться стандартным checkout.",
        "Подмена стандартного маршрута включается отдельной настройкой, и делать это стоит после успешного тестового заказа. Проверьте хотя бы одну реальную связку оплаты и доставки на тестовой копии магазина.",
      ]),
      dict(h="🛠️ Настройки, журнал и перенос", p=[
        "Настройки можно экспортировать в JSON и импортировать на другой сайт, что удобно, если у вас несколько магазинов с похожей логикой. В модуле есть диагностика и журнал событий, а очистка журнала выполняется по cron, чтобы он не разрастался.",
      ]),
    ]),
  uk=dict(
    intro=[
      "Стандартне оформлення замовлення в OpenCart розтягнуте на кілька кроків, і на кожному з них частина покупців закриває вкладку. Checkout Simple PRO збирає все на одній сторінці: контакти, доставка, оплата й підсумки видно одразу, а покупець розуміє, скільки йому лишилося заповнити.",
      "Склад полів і порядок блоків адміністратор налаштовує сам. Потрібні лише телефон та адреса — прибираєте зайве; хочете, щоб спосіб доставки йшов перед контактами — міняєте місцями. Гостьове замовлення підтримується, реєструватися заради покупки не обов'язково.",
    ],
    sections=[
      dict(h="🧱 Одна сторінка замість ланцюжка кроків", p=[
        "Форма оформлення побудована з блоків, які можна вмикати, вимикати та переставляти. Поля теж налаштовуються: що показувати, що вимагати обов'язково. У підсумку сторінка оформлення відповідає саме вашому магазину, а не усередненому сценарію з коробки.",
        "Поле телефону форматується з огляду на те, що потрібно Новій пошті, тому номери потрапляють у замовлення в однаковому вигляді. Оформлення розраховане, зокрема, на вітрину UniShop2.",
      ]),
      dict(h="⚡ Перерахунок без перезавантаження", p=[
        "Коли покупець змінює спосіб доставки чи оплати, підсумки перераховуються через AJAX. Сторінка не блимає й не втрачає вже введені дані. Доставка, оплата та загальна сума оновлюються в одному місці на очах у покупця.",
      ]),
      dict(h="🔒 Принцип безпеки в підсумках", p=[
        "Найважливіша деталь — як модуль поводиться під час збою. Якщо будь-яке ввімкнене розширення підсумків (знижка, купон, податок, націнка) повернуло помилку, підтвердження замовлення блокується. Модуль не створює замовлення з неповною сумою, через яку магазин міг би продати товар дешевше, ніж слід.",
        "Запити вітрини, що щось змінюють, приймаються лише методом POST і з ключем форми. Якщо модуль вимкнено, ці запити не працюють узагалі.",
      ]),
      dict(h="🧯 Поступове вмикання", p=[
        "Модуль можна встановити й не чіпати вітрину. Для перевірки є окремий тестовий маршрут checkout/checkout_simple_pro: на ньому ви оформлюєте пробне замовлення, поки звичайні покупці й далі користуються стандартним checkout.",
        "Підміна стандартного маршруту вмикається окремим налаштуванням, і робити це варто після успішного тестового замовлення. Перевірте бодай одну реальну пару оплати й доставки на тестовій копії магазину.",
      ]),
      dict(h="🛠️ Налаштування, журнал і перенесення", p=[
        "Налаштування можна експортувати в JSON та імпортувати на інший сайт, що зручно, якщо у вас кілька магазинів зі схожою логікою. У модулі є діагностика та журнал подій, а очищення журналу виконується за cron, щоб він не розростався.",
      ]),
    ]),
  en=dict(
    intro=[
      "The standard OpenCart checkout is spread over several steps, and at every one of them some shoppers close the tab. Checkout Simple PRO puts everything on a single page: contact details, delivery, payment and totals are all visible at once, so the customer can see how much is left to fill in.",
      "The administrator decides which fields appear and in what order the blocks come. If only a phone number and an address are needed, you remove the rest; if delivery should come before contact details, you swap them. Guest checkout is supported, so nobody has to register just to buy.",
    ],
    sections=[
      dict(h="🧱 One page instead of a chain of steps", p=[
        "The form is built from blocks that can be switched on, switched off and reordered. The fields are configurable too: what to display and what to make mandatory. The result is a checkout page that fits your store rather than an averaged out-of-the-box flow.",
        "The phone field is formatted with Nova Poshta in mind, so numbers reach the order in a uniform shape. The layout is also designed for the UniShop2 storefront.",
      ]),
      dict(h="⚡ Recalculation without a reload", p=[
        "When the customer changes the delivery or payment method, totals are recalculated through AJAX. The page does not flicker and does not lose what has already been typed. Shipping, payment and the grand total update in one place in front of the buyer.",
      ]),
      dict(h="🔒 A fail-safe approach to totals", p=[
        "The most important detail is how the module behaves when something breaks. If any enabled order-total extension (discount, coupon, tax, surcharge) returns an error, order confirmation is blocked. The module will not create an order with an incomplete amount that could make the store sell something for less than it should.",
        "Storefront requests that change anything are accepted only via POST and with a form key. When the module is off, those requests do not work at all.",
      ]),
      dict(h="🧯 Switching on gradually", p=[
        "You can install the module without touching the storefront. A separate test route, checkout/checkout_simple_pro, lets you place a trial order while ordinary customers keep using the standard checkout.",
        "Replacing the standard route is a separate setting and is best done after a successful test order. Check at least one real payment and delivery combination on a test copy of the store first.",
      ]),
      dict(h="🛠️ Settings, log and portability", p=[
        "Settings can be exported to JSON and imported on another site, which helps if you run several stores with similar logic. The module provides diagnostics and an event log, and the log is cleaned by cron so it does not keep growing.",
      ]),
    ]),
  cover=dict(
    tagline="Оформление заказа на одной странице",
    items=["Одна страница", "Гостевой заказ", "AJAX-пересчёт", "Порядок блоков", "Тестовый маршрут", "Экспорт настроек"],
    cards=[
      ("Настройка полей", "Что показывать и что требовать обязательно"),
      ("Порядок блоков", "Переставляйте контакты, доставку и оплату"),
      ("AJAX-итоги", "Сумма пересчитывается без перезагрузки"),
      ("Безопасные итоги", "Ошибка в итогах блокирует подтверждение"),
      ("Тест перед запуском", "Пробный заказ по отдельному маршруту"),
      ("Журнал и cron", "Диагностика и автоочистка журнала"),
    ],
    tabs=["Поля", "Блоки", "Журнал", "О модуле"],
    kpis=[("Заказов", "212"), ("Гостевых", "87"), ("Ошибок итогов", "0")],
  ),
)

P[72] = dict(
  ru=dict(
    intro=[
      "Покупатель выбирает Новую Почту, а дальше начинается неудобное: вписать город без опечаток, найти номер отделения, не перепутать почтомат с отделением. Nova Poshta PRO переносит этот выбор прямо в checkout. Покупатель находит настоящий город и настоящее отделение из справочника Новой Почты, а не набирает адрес вручную.",
      "Выбранные данные сохраняются в заказе и не теряются после оформления, поэтому менеджер открывает заказ и сразу видит, куда отправлять. Из того же заказа создаётся ТТН, а её статусы потом обновляются в магазине.",
    ],
    sections=[
      dict(h="📍 Что видит покупатель при оформлении", p=[
        "В checkout появляется выбор типа доставки: отделение, почтомат или адресная доставка. Для первых двух покупатель находит город, а затем конкретный пункт; для адресной доставки указывает улицу. Справочники городов, отделений и улиц взяты у самой Новой Почты, поэтому названия совпадают с теми, что потом увидит перевозчик.",
        "Для каждого активного способа доставки отдельно настраивается, какие стандартные адресные поля показывать. Если выбор отделения заменяет поле адреса, оно не дублируется и не путает покупателя.",
      ]),
      dict(h="📦 Работа менеджера с заказом", p=[
        "На странице заказа в админке появляется блок Новой Почты. Из него создаётся ТТН без перехода в кабинет перевозчика, а все созданные накладные собраны в отдельный список. Данные отправителя загружаются из вашего кабинета, так что вводить их вручную не нужно.",
        "Статусы ТТН обновляются, а при смене состояния могут уходить email-уведомления. Если у вас подключён SMSfly Order PRO, отправления Новой Почты поддерживаются и там.",
      ]),
      dict(h="🗂️ Справочники и cron", p=[
        "Города, отделения и улицы обновляются вручную из админки или по расписанию через cron. Первый раз справочники загружают сразу после ввода ключа, а дальше достаточно настроить регулярное обновление, чтобы закрытые отделения не оставались в списке.",
      ]),
      dict(h="🔑 API-ключ и проверка", p=[
        "Для работы нужен API-ключ из кабинета Новой Почты. Проверка API выполняется одной кнопкой, и вы сразу видите, принимает ли сервис ключ. В журнале API ключи маскируются, а при временных сбоях сервиса запрос повторяется.",
      ]),
      dict(h="🛡️ Безопасное включение", p=[
        "После установки модуль отключён и не влияет на витрину, пока вы не включите его и не сохраните настройки. Конфигурация checkout устроена безопасно, а совместимость с UniShop2 предусмотрена. Поэтому сначала можно спокойно ввести ключ, загрузить справочники и оформить тестовый заказ, не затрагивая живых покупателей.",
      ]),
    ]),
  uk=dict(
    intro=[
      "Покупець обирає Нову пошту, а далі починається незручне: вписати місто без помилок, знайти номер відділення, не переплутати поштомат із відділенням. Nova Poshta PRO переносить цей вибір прямо в checkout. Покупець знаходить справжнє місто й справжнє відділення зі довідника Нової пошти, а не набирає адресу вручну.",
      "Обрані дані зберігаються в замовленні й не губляться після оформлення, тому менеджер відкриває замовлення та одразу бачить, куди відправляти. З того самого замовлення створюється ТТН, а її статуси потім оновлюються в магазині.",
    ],
    sections=[
      dict(h="📍 Що бачить покупець під час оформлення", p=[
        "У checkout з'являється вибір типу доставки: відділення, поштомат або адресна доставка. Для перших двох покупець знаходить місто, а потім конкретний пункт; для адресної доставки вказує вулицю. Довідники міст, відділень і вулиць узято в самої Нової пошти, тож назви збігаються з тими, що потім побачить перевізник.",
        "Для кожного активного способу доставки окремо налаштовується, які стандартні адресні поля показувати. Якщо вибір відділення замінює поле адреси, воно не дублюється й не плутає покупця.",
      ]),
      dict(h="📦 Робота менеджера із замовленням", p=[
        "На сторінці замовлення в адмінці з'являється блок Нової пошти. З нього створюється ТТН без переходу в кабінет перевізника, а всі створені накладні зібрано в окремий список. Дані відправника завантажуються з вашого кабінету, тож вводити їх вручну не потрібно.",
        "Статуси ТТН оновлюються, а під час зміни стану можуть надходити email-сповіщення. Якщо у вас підключено SMSfly Order PRO, відправлення Нової пошти підтримуються й там.",
      ]),
      dict(h="🗂️ Довідники та cron", p=[
        "Міста, відділення й вулиці оновлюються вручну з адмінки або за розкладом через cron. Уперше довідники завантажують одразу після введення ключа, а далі досить налаштувати регулярне оновлення, щоб закриті відділення не залишалися у списку.",
      ]),
      dict(h="🔑 API-ключ і перевірка", p=[
        "Для роботи потрібен API-ключ із кабінету Нової пошти. Перевірка API виконується однією кнопкою, і ви одразу бачите, чи приймає сервіс ключ. У журналі API ключі маскуються, а під час тимчасових збоїв сервісу запит повторюється.",
      ]),
      dict(h="🛡️ Безпечне ввімкнення", p=[
        "Після встановлення модуль вимкнено, і він не впливає на вітрину, доки ви його не ввімкнете й не збережете налаштування. Конфігурація checkout влаштована безпечно, а сумісність з UniShop2 передбачена. Тому спершу можна спокійно ввести ключ, завантажити довідники та оформити тестове замовлення, не зачіпаючи живих покупців.",
      ]),
    ]),
  en=dict(
    intro=[
      "A customer picks Nova Poshta, and then the awkward part begins: typing the city without a typo, finding the branch number, not confusing a parcel locker with a branch. Nova Poshta PRO moves that choice straight into checkout. The buyer selects a real city and a real branch from the Nova Poshta directory instead of typing an address by hand.",
      "The chosen data is stored in the order and survives checkout, so a manager opens the order and immediately sees where to ship. The waybill (TTN) is created from the same order, and its statuses are later refreshed inside the store.",
    ],
    sections=[
      dict(h="📍 What the customer sees at checkout", p=[
        "Checkout offers a choice of delivery type: branch, parcel locker or address delivery. For the first two the customer finds the city and then a specific point; for address delivery they enter the street. The directories of cities, branches and streets come from Nova Poshta itself, so the names match what the carrier will see.",
        "For each active shipping method you configure separately which standard address fields stay visible. When the branch picker replaces the address field, it is not duplicated and does not confuse the buyer.",
      ]),
      dict(h="📦 How a manager handles the order", p=[
        "The admin order page gains a Nova Poshta block. A waybill is created from it without opening the carrier's own account, and all created waybills are gathered in a separate list. Sender details are loaded from your account, so there is nothing to type in manually.",
        "Waybill statuses are refreshed, and email notifications can go out when the state changes. If you also use SMSfly Order PRO, Nova Poshta shipments are supported there too.",
      ]),
      dict(h="🗂️ Directories and cron", p=[
        "Cities, branches and streets are refreshed manually from the admin or on a schedule via cron. The directories are loaded the first time right after you enter the key, and after that it is enough to set up regular updates so that closed branches do not linger in the list.",
      ]),
      dict(h="🔑 API key and verification", p=[
        "An API key from your Nova Poshta account is required. The API check runs with one button, so you see at once whether the service accepts the key. Keys are masked in the API log, and the request is retried when the service has a temporary hiccup.",
      ]),
      dict(h="🛡️ Switching on safely", p=[
        "After installation the module is off and has no effect on the storefront until you enable it and save the settings. The checkout configuration is built to be safe, and UniShop2 compatibility is included. You can therefore enter the key, load the directories and place a test order without touching live customers.",
      ]),
    ]),
  cover=dict(
    tagline="Доставка Новой Почтой прямо в checkout",
    items=["Выбор отделения", "Почтомат и адрес", "Создание ТТН", "Статусы ТТН", "Справочники", "Данные отправителя"],
    cards=[
      ("Город и отделение", "Покупатель выбирает из справочника Новой Почты"),
      ("Три типа доставки", "Отделение, почтомат или адресная доставка"),
      ("ТТН из заказа", "Накладная создаётся на странице заказа"),
      ("Статусы ТТН", "Обновление и email-уведомления"),
      ("Cron-справочники", "Города и отделения обновляются по расписанию"),
      ("Проверка API", "Тест ключа одной кнопкой"),
    ],
    tabs=["Доставка", "Справочники", "ТТН", "О модуле"],
    kpis=[("ТТН создано", "64"), ("Отделений", "9 412"), ("В пути", "21")],
  ),
)

P[77] = dict(
  ru=dict(
    intro=[
      "У магазина обычно не один способ приёма платежей, и каждый из них — это отдельный модуль со своими настройками, своей логикой статусов и своими обновлениями. Payment Pro Hub собирает всё это в одном месте: Stripe, PayPal, LiqPay, WayForPay, Monobank, Portmone, Fondy, NovaPay, EasyPay, UAPAY, банковский перевод, оплата при получении и до трёх ваших собственных шлюзов.",
      "Для покупателя ничего не меняется: каждый включённый провайдер отображается как обычный способ оплаты OpenCart. Вся разница видна администратору, которому больше не нужно держать десяток разрозненных расширений.",
    ],
    sections=[
      dict(h="💳 Десять провайдеров и свои шлюзы", p=[
        "Десять платёжных систем встроены, к ним добавлены банковский перевод и оплата при получении. Если вашего провайдера в списке нет, можно настроить до трёх пользовательских шлюзов: переход по ссылке методом GET или автоматическая отправка формы POST, причём отдельные адреса для режимов Test и Live.",
      ]),
      dict(h="✅ Заказ подтверждается только после оплаты", p=[
        "Онлайн-заказ считается принятым лишь после фактической оплаты, и письмо о принятом заказе до этого момента не отправляется. Это исключает типичную неприятность: покупатель получает «ваш заказ принят», хотя платёж не прошёл.",
        "Возврат покупателя на страницу «success» сам по себе не считается подтверждением. Модуль сверяет статус на стороне сервера и защищается от повторных webhook, поэтому один и тот же платёж не будет обработан дважды.",
      ]),
      dict(h="↩️ Возвраты и ручная проверка", p=[
        "Из админки можно оформить возврат средств и вручную перепроверить платёж, если уведомление от провайдера задержалось. Менеджеру не нужно заходить в кабинет платёжной системы ради каждого такого случая.",
      ]),
      dict(h="🌍 Валюты и Stripe", p=[
        "Для Stripe валюта берётся из той, что покупатель выбрал в checkout, а переключатель Adaptive Pricing позволяет управлять этим поведением. Провайдеры, работающие только с гривной (Portmone, NovaPay, EasyPay, UAPAY), автоматически скрываются, если выбранная валюта отличается от UAH. Покупатель просто не увидит способ, который заведомо не сработает.",
      ]),
      dict(h="🔐 Ключи и данные карт", p=[
        "API-ключи, секреты webhook и токены скрыты в полях типа password, а показать их можно отдельной кнопкой. Данные карт модуль не хранит: оплата проходит на стороне провайдера.",
      ]),
      dict(h="🚦 Запуск и совместимость", p=[
        "Для работы нужны договоры и ключи в самих платёжных системах. Сначала включите нужных провайдеров в тестовом режиме, проверьте оплату, возврат на сайт и статусы заказа, и только потом переключайте шлюзы в боевой режим. Модуль работает со стандартным checkout OpenCart, а для UniShop2 предусмотрен автоматический сценарий перехода.",
      ]),
    ]),
  uk=dict(
    intro=[
      "У магазину зазвичай не один спосіб приймання платежів, і кожен із них — окремий модуль зі своїми налаштуваннями, власною логікою статусів та оновленнями. Payment Pro Hub збирає все це в одному місці: Stripe, PayPal, LiqPay, WayForPay, Monobank, Portmone, Fondy, NovaPay, EasyPay, UAPAY, банківський переказ, оплата під час отримання та до трьох ваших власних шлюзів.",
      "Для покупця нічого не змінюється: кожен увімкнений провайдер відображається як звичайний спосіб оплати OpenCart. Уся різниця видна адміністраторові, якому більше не треба тримати десяток розрізнених розширень.",
    ],
    sections=[
      dict(h="💳 Десять провайдерів і власні шлюзи", p=[
        "Десять платіжних систем вбудовано, до них додано банківський переказ та оплату під час отримання. Якщо вашого провайдера немає у списку, можна налаштувати до трьох користувацьких шлюзів: перехід за посиланням методом GET або автоматичне надсилання форми POST, до того ж окремі адреси для режимів Test і Live.",
      ]),
      dict(h="✅ Замовлення підтверджується лише після оплати", p=[
        "Онлайн-замовлення вважається прийнятим лише після фактичної оплати, і лист про прийняте замовлення до цього моменту не надсилається. Це унеможливлює типову прикрість: покупець отримує «ваше замовлення прийнято», хоча платіж не пройшов.",
        "Повернення покупця на сторінку «success» саме по собі не вважається підтвердженням. Модуль звіряє статус на боці сервера й захищається від повторних webhook, тому той самий платіж не буде оброблено двічі.",
      ]),
      dict(h="↩️ Повернення та ручна перевірка", p=[
        "З адмінки можна оформити повернення коштів і вручну перевірити платіж повторно, якщо сповіщення від провайдера затрималося. Менеджерові не потрібно заходити в кабінет платіжної системи через кожен такий випадок.",
      ]),
      dict(h="🌍 Валюти та Stripe", p=[
        "Для Stripe валюту береться з тієї, яку покупець обрав у checkout, а перемикач Adaptive Pricing дає змогу керувати цією поведінкою. Провайдери, що працюють лише з гривнею (Portmone, NovaPay, EasyPay, UAPAY), автоматично приховуються, якщо обрана валюта відрізняється від UAH. Покупець просто не побачить спосіб, який свідомо не спрацює.",
      ]),
      dict(h="🔐 Ключі та дані карток", p=[
        "API-ключі, секрети webhook і токени приховано в полях типу password, а показати їх можна окремою кнопкою. Даних карток модуль не зберігає: оплата відбувається на боці провайдера.",
      ]),
      dict(h="🚦 Запуск і сумісність", p=[
        "Для роботи потрібні договори та ключі в самих платіжних системах. Спершу ввімкніть потрібних провайдерів у тестовому режимі, перевірте оплату, повернення на сайт і статуси замовлення, і лише потім перемикайте шлюзи в бойовий режим. Модуль працює зі стандартним checkout OpenCart, а для UniShop2 передбачено автоматичний сценарій переходу.",
      ]),
    ]),
  en=dict(
    intro=[
      "A store rarely accepts payments in only one way, and each way usually means a separate module with its own settings, its own status logic and its own updates. Payment Pro Hub gathers them in one place: Stripe, PayPal, LiqPay, WayForPay, Monobank, Portmone, Fondy, NovaPay, EasyPay, UAPAY, bank transfer, cash on delivery and up to three gateways of your own.",
      "Nothing changes for the shopper: every enabled provider appears as an ordinary OpenCart payment method. The whole difference is on the administrator's side, who no longer has to keep a dozen scattered extensions.",
    ],
    sections=[
      dict(h="💳 Ten providers and your own gateways", p=[
        "Ten payment systems are built in, together with bank transfer and cash on delivery. If your provider is not on the list, you can configure up to three custom gateways: a redirect via GET or an automatic form POST, with separate URLs for Test and Live modes.",
      ]),
      dict(h="✅ An order is confirmed only after payment", p=[
        "An online order counts as accepted only after the payment has actually happened, and the order-received email is not sent before that. This avoids the familiar annoyance of a customer reading that the order is accepted while the payment failed.",
        "A browser returning to the success page is not treated as proof of payment. The module checks the status on the server side and guards against repeated webhooks, so the same payment is not processed twice.",
      ]),
      dict(h="↩️ Refunds and manual checks", p=[
        "From the admin you can issue a refund and manually re-check a payment when the provider's notification has been delayed. A manager does not need to log in to the payment provider's dashboard for every such case.",
      ]),
      dict(h="🌍 Currencies and Stripe", p=[
        "For Stripe, the currency is taken from the one the customer selected at checkout, and an Adaptive Pricing switch lets you control that behaviour. Providers that work only in hryvnia (Portmone, NovaPay, EasyPay, UAPAY) are hidden automatically when the selected currency is not UAH. The customer simply never sees a method that is certain to fail.",
      ]),
      dict(h="🔐 Keys and card data", p=[
        "API keys, webhook secrets and tokens are hidden in password-type fields, with a button to reveal them. The module does not store card data: payment takes place on the provider's side.",
      ]),
      dict(h="🚦 Launch and compatibility", p=[
        "You need contracts and keys with the payment systems themselves. First enable the providers you need in test mode, check payment, the return to the site and order statuses, and only then switch the gateways to live mode. The module works with the standard OpenCart checkout, and an automatic redirect scenario is provided for UniShop2.",
      ]),
    ]),
  cover=dict(
    tagline="Все платёжные системы в одном модуле",
    items=["10 провайдеров", "Банковский перевод", "Оплата при получении", "Три своих шлюза", "Возвраты", "Режимы Test и Live"],
    cards=[
      ("Один модуль", "Stripe, PayPal, LiqPay, WayForPay и другие"),
      ("Оплата подтверждена", "Заказ принимается только после платежа"),
      ("Защита webhook", "Повторные уведомления не дублируют платёж"),
      ("Возвраты", "Refund и ручная проверка из админки"),
      ("Валюта и UAH", "Гривневые шлюзы скрываются при другой валюте"),
      ("Скрытые ключи", "Секреты в полях password с кнопкой показа"),
    ],
    tabs=["Провайдеры", "Шлюзы", "Платежи", "О модуле"],
    kpis=[("Платежей", "134"), ("Возвратов", "2"), ("Провайдеров", "6")],
  ),
)

P[82] = dict(
  ru=dict(
    intro=[
      "Менеджер не должен сидеть в админке и обновлять список заказов, чтобы не пропустить новый. Telegram Notify Pro присылает сообщение в Telegram в тот момент, когда в магазине оформлен заказ: с составом, суммой, контактами и, если нужно, фотографиями товаров.",
      "Уведомления приходят о новых заказах, о быстрых заказах UniShop2 и о смене статуса заказа. Работает всё через события OpenCart, то есть без правки ядра и без вмешательства в runtime-OCMOD, что важно для магазинов, где и так много модификаций.",
    ],
    sections=[
      dict(h="🤖 Бот и получатели", p=[
        "Подключение начинается в @BotFather: вы создаёте бота и вставляете его токен в модуль. Затем кнопка «Получить chat ID» помогает определить, куда слать сообщения, и вы добавляете получателей.",
        "Получателей может быть несколько: отдельные люди, группы, каналы и даже темы форумов Telegram. Так склад видит одни события, а руководитель — другие, и никому не приходит лишнее.",
      ]),
      dict(h="🕐 Когда и что отправлять", p=[
        "В настройках отдельно задаётся, когда отправлять уведомление, и что именно в него включать. Можно оставить только новые заказы либо добавить смену статусов, например чтобы получать сообщение, когда клиент оплатил.",
        "Содержимое сообщения собирается из переменных: данные заказа, список товаров, ссылки на товары и их фотографии. Менеджер может открыть товар одним касанием прямо из чата.",
      ]),
      dict(h="🌐 Шаблоны по языкам", p=[
        "Для украинского, русского и английского языков есть отдельные шаблоны, поэтому текст сообщения соответствует языку заказа. Для быстрого заказа UniShop2 предусмотрен свой шаблон, ведь в нём обычно меньше полей: чаще всего имя, телефон и товар.",
      ]),
      dict(h="🧯 Надёжность и защита от дублей", p=[
        "Журнал отправок показывает, что и когда ушло в Telegram, а защита от дублей не допускает ситуации, когда одно и то же событие приходит дважды. Если сообщения не доходят, можно запустить тест Telegram API и проверить токен и chat ID, не оформляя заказ.",
      ]),
      dict(h="🔑 Запуск", p=[
        "Модуль устанавливается выключенным и не влияет на витрину, пока вы не включите его и не сохраните настройки. Порядок простой: ввести токен, получить chat ID, отправить тест и включить нужные события. Лицензионный ключ активируется в разделе «О модуле».",
      ]),
    ]),
  uk=dict(
    intro=[
      "Менеджер не повинен сидіти в адмінці й оновлювати список замовлень, щоб не пропустити нове. Telegram Notify Pro надсилає повідомлення в Telegram у ту мить, коли в магазині оформлено замовлення: зі складом, сумою, контактами та, за потреби, фотографіями товарів.",
      "Сповіщення надходять про нові замовлення, швидкі замовлення UniShop2 і зміну статусу замовлення. Усе працює через події OpenCart, тобто без правки ядра та без втручання в runtime-OCMOD, що важливо для магазинів, де й так багато модифікацій.",
    ],
    sections=[
      dict(h="🤖 Бот і отримувачі", p=[
        "Підключення починається в @BotFather: ви створюєте бота й вставляєте його токен у модуль. Потім кнопка «Отримати chat ID» допомагає визначити, куди слати повідомлення, і ви додаєте отримувачів.",
        "Отримувачів може бути кілька: окремі люди, групи, канали й навіть теми форумів Telegram. Так склад бачить одні події, а керівник — інші, і нікому не приходить зайве.",
      ]),
      dict(h="🕐 Коли і що надсилати", p=[
        "У налаштуваннях окремо визначається, коли надсилати сповіщення і що саме до нього включати. Можна залишити лише нові замовлення або додати зміну статусів, наприклад щоб отримувати повідомлення, коли клієнт оплатив.",
        "Вміст повідомлення складається зі змінних: дані замовлення, перелік товарів, посилання на товари та їхні фотографії. Менеджер може відкрити товар одним дотиком просто з чату.",
      ]),
      dict(h="🌐 Шаблони за мовами", p=[
        "Для української, російської та англійської мов є окремі шаблони, тож текст повідомлення відповідає мові замовлення. Для швидкого замовлення UniShop2 передбачено власний шаблон, адже в ньому зазвичай менше полів: найчастіше ім'я, телефон і товар.",
      ]),
      dict(h="🧯 Надійність і захист від дублів", p=[
        "Журнал надсилань показує, що і коли пішло в Telegram, а захист від дублів не допускає ситуації, коли та сама подія надходить двічі. Якщо повідомлення не доходять, можна запустити тест Telegram API і перевірити токен та chat ID, не оформляючи замовлення.",
      ]),
      dict(h="🔑 Запуск", p=[
        "Модуль встановлюється вимкненим і не впливає на вітрину, доки ви його не ввімкнете й не збережете налаштування. Порядок простий: ввести токен, отримати chat ID, надіслати тест і ввімкнути потрібні події. Ліцензійний ключ активується в розділі «Про модуль».",
      ]),
    ]),
  en=dict(
    intro=[
      "A manager should not have to sit in the admin refreshing the order list so as not to miss a new one. Telegram Notify Pro sends a Telegram message the moment an order is placed, with the contents, total, contact details and, if you want, product photos.",
      "Notifications cover new orders, UniShop2 quick orders and order status changes. Everything runs on OpenCart events, so there are no core edits and no interference with runtime OCMOD, which matters for stores that already carry plenty of modifications.",
    ],
    sections=[
      dict(h="🤖 The bot and its recipients", p=[
        "Setup starts in @BotFather: you create a bot and paste its token into the module. The Get chat ID button then helps you find out where messages should go, and you add the recipients.",
        "There can be several recipients: individuals, groups, channels and even Telegram forum topics. The warehouse can see one set of events and the owner another, so nobody receives noise.",
      ]),
      dict(h="🕐 When and what to send", p=[
        "The settings separate when a notification is sent from what goes into it. You may keep only new orders or add status changes, for example to get a message when a customer has paid.",
        "The message body is assembled from variables: order data, the product list, product links and photos. A manager can open a product with one tap straight from the chat.",
      ]),
      dict(h="🌐 Templates by language", p=[
        "Separate templates exist for Ukrainian, Russian and English, so the message text matches the order language. UniShop2 quick orders have a template of their own, since they usually contain fewer fields: most often a name, a phone number and a product.",
      ]),
      dict(h="🧯 Reliability and duplicate protection", p=[
        "A send log shows what went to Telegram and when, and duplicate protection stops the same event from arriving twice. If messages do not get through, you can run a Telegram API test and check the token and chat ID without placing an order.",
      ]),
      dict(h="🔑 Getting started", p=[
        "The module is installed switched off and does not affect the storefront until you enable it and save the settings. The sequence is simple: enter the token, get the chat ID, send a test and enable the events you need. The licence key is activated in the About tab.",
      ]),
    ]),
  cover=dict(
    tagline="Заказы магазина мгновенно в Telegram",
    items=["Новые заказы", "Быстрые заказы", "Смена статуса", "Группы и каналы", "Фото товаров", "Журнал отправок"],
    cards=[
      ("Через Events", "Без правки ядра и runtime-OCMOD"),
      ("Много получателей", "Люди, группы, каналы и темы форумов"),
      ("Шаблоны по языкам", "UA, RU и EN плюс шаблон быстрого заказа"),
      ("Переменные заказа", "Товары, ссылки и фото в сообщении"),
      ("Chat ID и тест", "Получение ID и проверка Telegram API"),
      ("Защита от дублей", "Одно событие, одно сообщение"),
    ],
    tabs=["Бот", "События", "Шаблоны", "Журнал"],
    kpis=[("Сообщений", "96"), ("Получателей", "4"), ("Дублей", "0")],
  ),
)

P[89] = dict(
  ru=dict(
    intro=[
      "Номер телефона в заказе или анкете бывает выдуманным, чужим или с опечаткой, и тогда менеджер звонит в пустоту. Phone Verification PRO просит покупателя ввести одноразовый код, который приходит на указанный номер, прежде чем регистрация или заказ будут завершены.",
      "Модуль не привязан к одному провайдеру. Код может уйти через SMS, Telegram, WhatsApp или Viber, причём набор каналов и сервисов вы выбираете сами. Если один сервис недоступен, отправка не останавливается.",
    ],
    sections=[
      dict(h="🔢 Где нужен код", p=[
        "Подтверждение включается для выбранных сценариев: регистрация или оформление заказа. Каждый сценарий включается отдельно, и по умолчанию выключено всё, поэтому после установки витрина остаётся прежней, пока вы сознательно не активируете нужное.",
        "Если клиент уже подтверждал номер, он запоминается и повторно код не запрашивается. Для гостя доверие привязано к текущей сессии, то есть оно не переносится на другие устройства.",
      ]),
      dict(h="📡 Провайдеры и порядок перебора", p=[
        "Готовые адаптеры есть для Telegram Gateway, Twilio Verify, SMSClub, AlphaSMS (SMS, Telegram, WhatsApp, Viber и Viber с переходом на SMS), SMS.RU, SMSC.RU, SMS Aero, UniSender, Infobip, Vonage, Mobizon, Telnyx и Sinch. Для TurboSMS и SMS-Fly доступны пресеты, а для остальных сервисов есть универсальные HTTPS-адаптеры SMS и Viber Business.",
        "Провайдеры перебираются по порядку префиксов номера. Так для украинских номеров можно поставить один сервис, для европейских другой, а сбой одного не останавливает отправку: включается следующий.",
      ]),
      dict(h="⏱️ Лимиты и параметры кода", p=[
        "Номер приводится к формату E.164, длина кода составляет от 4 до 8 цифр (по умолчанию 6). Сам код хранится только как password_hash, так что прочитать его в базе невозможно.",
        "Чтобы никто не мог разорить вас на SMS, действуют ограничения: пауза до повторной отправки, число попыток ввода, часовой лимит и суточный предел магазина.",
      ]),
      dict(h="🛡️ Защита от злоупотреблений", p=[
        "Запросы с витрины защищены session nonce. Номер, IP-адрес и сессия сохраняются в виде HMAC-хешей, а прочитать из базы можно только маску номера. Для административных целей этого хватает, а персональные данные не лежат на виду.",
      ]),
      dict(h="💬 Стоимость и проверка", p=[
        "SMS и сообщения в мессенджерах оплачиваются у провайдера по его тарифам. Подключите сервис, введите ключи, включите нужные сценарии, задайте лимиты и проверьте отправку кода на тестовом номере. Для AJAX-checkout и UniShop2 проверьте свою сборку на тестовой копии.",
      ]),
    ]),
  uk=dict(
    intro=[
      "Номер телефону в замовленні чи анкеті буває вигаданим, чужим або з помилкою, і тоді менеджер телефонує в порожнечу. Phone Verification PRO просить покупця ввести одноразовий код, що надходить на вказаний номер, перш ніж реєстрацію чи замовлення буде завершено.",
      "Модуль не прив'язаний до одного провайдера. Код може піти через SMS, Telegram, WhatsApp або Viber, причому набір каналів і сервісів обираєте ви самі. Якщо один сервіс недоступний, надсилання не зупиняється.",
    ],
    sections=[
      dict(h="🔢 Де потрібен код", p=[
        "Підтвердження вмикається для вибраних сценаріїв: реєстрація або оформлення замовлення. Кожен сценарій вмикається окремо, і за замовчуванням вимкнено все, тому після встановлення вітрина лишається колишньою, доки ви свідомо не активуєте потрібне.",
        "Якщо клієнт уже підтверджував номер, його запам'ятовують і повторно код не запитують. Для гостя довіру прив'язано до поточної сесії, тобто вона не переноситься на інші пристрої.",
      ]),
      dict(h="📡 Провайдери та порядок перебору", p=[
        "Готові адаптери є для Telegram Gateway, Twilio Verify, SMSClub, AlphaSMS (SMS, Telegram, WhatsApp, Viber і Viber із переходом на SMS), SMS.RU, SMSC.RU, SMS Aero, UniSender, Infobip, Vonage, Mobizon, Telnyx та Sinch. Для TurboSMS і SMS-Fly доступні пресети, а для решти сервісів є універсальні HTTPS-адаптери SMS і Viber Business.",
        "Провайдери перебираються за порядком префіксів номера. Так для українських номерів можна поставити один сервіс, для європейських інший, а збій одного не зупиняє надсилання: вмикається наступний.",
      ]),
      dict(h="⏱️ Ліміти й параметри коду", p=[
        "Номер приводиться до формату E.164, довжина коду — від 4 до 8 цифр (за замовчуванням 6). Сам код зберігається лише як password_hash, тож прочитати його в базі неможливо.",
        "Щоб ніхто не міг розорити вас на SMS, діють обмеження: пауза до повторного надсилання, кількість спроб введення, годинний ліміт і добова межа магазину.",
      ]),
      dict(h="🛡️ Захист від зловживань", p=[
        "Запити з вітрини захищено session nonce. Номер, IP-адреса й сесія зберігаються у вигляді HMAC-хешів, а прочитати з бази можна лише маску номера. Для адміністративних цілей цього вистачає, а персональні дані не лежать на видноті.",
      ]),
      dict(h="💬 Вартість і перевірка", p=[
        "SMS та повідомлення в месенджерах оплачуються в провайдера за його тарифами. Підключіть сервіс, введіть ключі, увімкніть потрібні сценарії, задайте ліміти й перевірте надсилання коду на тестовий номер. Для AJAX-checkout та UniShop2 перевірте свою збірку на тестовій копії.",
      ]),
    ]),
  en=dict(
    intro=[
      "A phone number in an order or sign-up form can be invented, borrowed or mistyped, and then a manager ends up calling into the void. Phone Verification PRO asks the customer to enter a one-time code sent to the number they gave before the registration or the order is completed.",
      "The module is not tied to a single provider. The code can travel by SMS, Telegram, WhatsApp or Viber, and you choose the set of channels and services. If one service is unavailable, sending does not stop.",
    ],
    sections=[
      dict(h="🔢 Where the code is required", p=[
        "Verification is switched on for selected scenarios: registration or checkout. Each scenario is enabled on its own, and everything is off by default, so after installation the storefront stays exactly as it was until you deliberately activate what you need.",
        "If a customer has already verified their number, it is remembered and the code is not asked for again. For a guest, trust is tied to the current session, so it does not carry over to other devices.",
      ]),
      dict(h="📡 Providers and the order they are tried", p=[
        "Ready adapters exist for Telegram Gateway, Twilio Verify, SMSClub, AlphaSMS (SMS, Telegram, WhatsApp, Viber and Viber falling back to SMS), SMS.RU, SMSC.RU, SMS Aero, UniSender, Infobip, Vonage, Mobizon, Telnyx and Sinch. TurboSMS and SMS-Fly are available as presets, and universal HTTPS adapters for SMS and Viber Business cover other services.",
        "Providers are tried in the order of number prefixes. You can assign one service to Ukrainian numbers and another to European ones, and a failure of one does not stop delivery: the next one takes over.",
      ]),
      dict(h="⏱️ Limits and code parameters", p=[
        "The number is normalised to E.164, and the code is 4 to 8 digits long (6 by default). The code itself is stored only as a password_hash, so it cannot be read from the database.",
        "To keep anyone from running up your SMS bill there are restrictions: a pause before resending, a cap on entry attempts, an hourly limit and a daily ceiling for the whole store.",
      ]),
      dict(h="🛡️ Abuse protection", p=[
        "Storefront requests are protected by a session nonce. The number, IP address and session are kept as HMAC hashes, and only a masked version of the number can be read. That is enough for administration while personal data does not sit in plain sight.",
      ]),
      dict(h="💬 Cost and testing", p=[
        "SMS and messenger messages are paid for with the provider at its rates. Connect a service, enter the keys, enable the scenarios you need, set the limits and check that a code arrives on a test number. For AJAX checkouts and UniShop2, test your own build on a staging copy.",
      ]),
    ]),
  cover=dict(
    tagline="Одноразовый код перед регистрацией и заказом",
    items=["OTP-код", "Регистрация", "Оформление заказа", "SMS и мессенджеры", "Лимиты отправки", "Маска номера"],
    cards=[
      ("13 адаптеров", "Twilio, Infobip, Vonage, SMS.RU и другие"),
      ("Резервный провайдер", "Сбой одного включает следующий"),
      ("Номер E.164", "Код 4-8 цифр хранится только как хеш"),
      ("Лимиты", "Пауза, попытки, часовой и суточный предел"),
      ("Защита", "Session nonce и HMAC-хеши номера и IP"),
      ("Запоминание", "Подтверждённый номер не спрашивают повторно"),
    ],
    tabs=["Сценарии", "Провайдеры", "Лимиты", "О модуле"],
    kpis=[("Кодов", "73"), ("Подтверждено", "68"), ("Блокировок", "2")],
  ),
)

P[96] = dict(
  ru=dict(
    intro=[
      "Придумать пароль, подтвердить почту, вспомнить логин через месяц: каждый из этих шагов отсеивает часть покупателей. Social Login PRO позволяет войти или зарегистрироваться в пару кликов через аккаунт, который у человека уже есть.",
      "Поддерживаются девять провайдеров: Google, Apple, Facebook, Microsoft, PayPal, LinkedIn, Яндекс, Telegram и VK. Все они работают по стандартам OAuth или OIDC, а кнопки появляются там, где вы их разрешили.",
    ],
    sections=[
      dict(h="🚪 Где появляются кнопки", p=[
        "Кнопки можно показывать на стандартных страницах OpenCart: вход account/login, регистрация account/register и вход в checkout/login. Для витрины UniShop2 поддержаны его checkout и всплывающее окно входа.",
        "Вход, регистрация, стандартный checkout и UniShop2 включаются независимо друг от друга. Можно, например, разрешить вход через соцсети только в checkout, а на странице регистрации оставить обычную форму.",
      ]),
      dict(h="🔗 Как соединяется аккаунт", p=[
        "Если у клиента уже есть учётная запись, модуль может связать её с соцпрофилем по email, но делает это только там, где провайдер действительно подтверждает адрес. Это важная защита: иначе злоумышленник мог бы завести аккаунт у провайдера с чужой почтой и получить доступ к чужим заказам.",
        "В личном кабинете покупатель сам привязывает и отвязывает соцаккаунты, так что вход можно добавить после первой покупки.",
      ]),
      dict(h="📝 Недостающие данные", p=[
        "Не каждый провайдер отдаёт имя, фамилию и телефон. Если для магазина эти поля обязательны, модуль запросит недостающее перед созданием клиента. Так в базе не появляются учётные записи с пустыми полями, из-за которых потом не получится оформить доставку.",
      ]),
      dict(h="🎨 Внешний вид кнопок", p=[
        "Подписи кнопок настраиваются на всех языках магазина. Стили Brand, Neutral, Outline и Auto и формы Rounded, Pill и Square позволяют вписать кнопки в дизайн сайта, а живой предпросмотр показывает результат ещё до сохранения.",
      ]),
      dict(h="🔐 Данные и диагностика", p=[
        "Модуль собирает агрегированную статистику входов и не хранит персональные OAuth-данные. Есть диагностика и проверка настроек, которая подсказывает, что не так с конкретным провайдером.",
        "Для каждого провайдера нужно создать приложение в его консоли разработчика и получить client ID и secret. Это делается один раз для каждого сервиса, после чего ключи вносятся в модуль.",
      ]),
    ]),
  uk=dict(
    intro=[
      "Вигадати пароль, підтвердити пошту, згадати логін через місяць: кожен із цих кроків відсіює частину покупців. Social Login PRO дає змогу увійти чи зареєструватися за пару кліків через акаунт, який у людини вже є.",
      "Підтримуються дев'ять провайдерів: Google, Apple, Facebook, Microsoft, PayPal, LinkedIn, Яндекс, Telegram і VK. Усі вони працюють за стандартами OAuth або OIDC, а кнопки з'являються там, де ви їх дозволили.",
    ],
    sections=[
      dict(h="🚪 Де з'являються кнопки", p=[
        "Кнопки можна показувати на стандартних сторінках OpenCart: вхід account/login, реєстрація account/register і вхід у checkout/login. Для вітрини UniShop2 підтримано його checkout та спливне вікно входу.",
        "Вхід, реєстрація, стандартний checkout і UniShop2 вмикаються незалежно один від одного. Можна, наприклад, дозволити вхід через соцмережі лише в checkout, а на сторінці реєстрації залишити звичайну форму.",
      ]),
      dict(h="🔗 Як з'єднується акаунт", p=[
        "Якщо в клієнта вже є обліковий запис, модуль може пов'язати його із соцпрофілем за email, але робить це лише там, де провайдер справді підтверджує адресу. Це важливий захист: інакше зловмисник міг би завести акаунт у провайдера з чужою поштою й отримати доступ до чужих замовлень.",
        "В особистому кабінеті покупець сам прив'язує й відв'язує соцакаунти, тож вхід можна додати після першої покупки.",
      ]),
      dict(h="📝 Відсутні дані", p=[
        "Не кожен провайдер віддає ім'я, прізвище та телефон. Якщо для магазину ці поля обов'язкові, модуль запитає бракуюче перед створенням клієнта. Так у базі не з'являються облікові записи з порожніми полями, через які потім не вийде оформити доставку.",
      ]),
      dict(h="🎨 Вигляд кнопок", p=[
        "Підписи кнопок налаштовуються всіма мовами магазину. Стилі Brand, Neutral, Outline та Auto й форми Rounded, Pill і Square дають змогу вписати кнопки в дизайн сайту, а живий попередній перегляд показує результат ще до збереження.",
      ]),
      dict(h="🔐 Дані та діагностика", p=[
        "Модуль збирає агреговану статистику входів і не зберігає персональних OAuth-даних. Є діагностика та перевірка налаштувань, яка підказує, що не так із конкретним провайдером.",
        "Для кожного провайдера потрібно створити застосунок у його консолі розробника й отримати client ID та secret. Це робиться раз для кожного сервісу, після чого ключі вносяться в модуль.",
      ]),
    ]),
  en=dict(
    intro=[
      "Inventing a password, confirming an email address, remembering a login a month later: each of these steps loses some shoppers. Social Login PRO lets people sign in or register in a couple of clicks with an account they already have.",
      "Nine providers are supported: Google, Apple, Facebook, Microsoft, PayPal, LinkedIn, Yandex, Telegram and VK. They all work through OAuth or OIDC standards, and the buttons appear wherever you allow them.",
    ],
    sections=[
      dict(h="🚪 Where the buttons appear", p=[
        "Buttons can be shown on the standard OpenCart pages: sign-in at account/login, registration at account/register and the checkout/login step. For the UniShop2 storefront its checkout and its pop-up login window are supported.",
        "Login, registration, standard checkout and UniShop2 are switched on independently. You could, for instance, allow social sign-in only at checkout and keep the ordinary form on the registration page.",
      ]),
      dict(h="🔗 How accounts are matched", p=[
        "If a customer already has an account, the module can link it to the social profile by email, but only where the provider genuinely verifies the address. That is an important safeguard: otherwise an attacker could create an account with a provider using someone else's email and reach their orders.",
        "In the account area, shoppers link and unlink social accounts themselves, so sign-in can be added after the first purchase.",
      ]),
      dict(h="📝 Missing details", p=[
        "Not every provider returns a first name, last name and phone number. If your store requires them, the module asks for what is missing before creating the customer. That keeps accounts with empty fields out of the database, which would later get in the way of arranging delivery.",
      ]),
      dict(h="🎨 Button appearance", p=[
        "Button labels can be set for every store language. The Brand, Neutral, Outline and Auto styles and the Rounded, Pill and Square shapes let you fit the buttons into the site's design, and a live preview shows the result before you save.",
      ]),
      dict(h="🔐 Data and diagnostics", p=[
        "The module gathers aggregated sign-in statistics and does not store personal OAuth data. Diagnostics and a settings check point out what is wrong with a particular provider.",
        "For every provider you need to create an app in its developer console and obtain a client ID and secret. This is done once per service, after which the keys go into the module.",
      ]),
    ]),
  cover=dict(
    tagline="Вход через Google, Apple, Facebook и другие",
    items=["9 провайдеров", "Вход и регистрация", "Checkout и UniShop2", "Привязка в кабинете", "Стили кнопок", "Проверка настроек"],
    cards=[
      ("OAuth и OIDC", "Google, Apple, Facebook, Microsoft, VK и другие"),
      ("Гибкое включение", "Вход, регистрация, checkout и UniShop2 отдельно"),
      ("Связь по email", "Только если провайдер подтверждает адрес"),
      ("Недостающие поля", "Запрос имени и телефона до создания клиента"),
      ("Вид кнопок", "Brand, Neutral, Outline, Auto и живой предпросмотр"),
      ("Без OAuth-данных", "Только агрегированная статистика входов"),
    ],
    tabs=["Провайдеры", "Места показа", "Дизайн", "Статистика"],
    kpis=[("Входов", "182"), ("Новых клиентов", "37"), ("Провайдеров", "5")],
  ),
)

P[97] = dict(
  ru=dict(
    intro=[
      "Телефон часто срабатывает быстрее письма: сообщение о принятом заказе или отправлении читают в течение минут. SMSfly Order PRO отправляет SMS и Viber через сервис SMS-Fly и сообщает клиенту и менеджеру о том, что происходит с заказом OpenCart/ocStore.",
      "Кроме автоматических уведомлений, менеджер может написать клиенту прямо со страницы заказа, когда нужно уточнить размер или время доставки. Отдельно поддержаны быстрые заказы UniShop2 и отправления Новой Почты.",
    ],
    sections=[
      dict(h="📲 Кого и о чём уведомляют", p=[
        "Клиент получает сообщение по своему заказу, а менеджер получает собственное уведомление о том, что пришёл новый заказ. Тексты у этих двух сообщений разные, потому что задачи разные: клиенту нужно подтверждение, менеджеру нужны данные для обработки.",
      ]),
      dict(h="✍️ Шаблоны сообщений", p=[
        "Есть три набора шаблонов: для клиента, для менеджера и для быстрого заказа. Быстрому заказу UniShop2 отведены отдельные уведомления, ведь он оформляется иначе, чем обычный заказ, и содержит меньше данных.",
        "Подсказки по настройке API и шаблонов встроены в админку, поэтому не нужно искать документацию, чтобы понять, какое поле что значит.",
      ]),
      dict(h="💬 Сообщение со страницы заказа", p=[
        "На странице заказа можно вручную отправить клиенту сообщение. Это удобно для ситуаций, которые не вписываются ни в один автоматический шаблон: уточнить адрес, предупредить о задержке, сообщить, что товар подготовлен к выдаче.",
      ]),
      dict(h="🚚 Новая Почта и UniShop2", p=[
        "Модуль умеет присылать уведомления по отправлениям Новой Почты, поэтому клиент узнаёт о движении посылки, а менеджеру не нужно сообщать это вручную. Для быстрых заявок UniShop2 действует собственная ветка уведомлений.",
      ]),
      dict(h="⚙️ Подключение и стоимость", p=[
        "Нужен аккаунт в SMS-Fly: введите данные API, настройте шаблоны, включите модуль и сохраните настройки. Стоимость сообщений определяется тарифами сервиса, а не модуля.",
        "После установки модуль выключен и включается вручную после настройки API. Отправку стоит проверить на тестовом заказе. Заявлена совместимость с ocStore 3.0.4.1, OpenCart 3.x, PHP 7.4–8.5 и MySQL/MariaDB.",
      ]),
    ]),
  uk=dict(
    intro=[
      "Телефон часто спрацьовує швидше за лист: повідомлення про прийняте замовлення чи відправлення читають упродовж хвилин. SMSfly Order PRO надсилає SMS і Viber через сервіс SMS-Fly та повідомляє клієнта й менеджера про те, що відбувається із замовленням OpenCart/ocStore.",
      "Окрім автоматичних сповіщень, менеджер може написати клієнтові просто зі сторінки замовлення, коли треба уточнити розмір чи час доставки. Окремо підтримано швидкі замовлення UniShop2 та відправлення Нової пошти.",
    ],
    sections=[
      dict(h="📲 Кого і про що сповіщають", p=[
        "Клієнт отримує повідомлення за своїм замовленням, а менеджер отримує власне сповіщення про те, що надійшло нове замовлення. Тексти цих двох повідомлень різні, бо різні завдання: клієнтові потрібне підтвердження, менеджерові потрібні дані для обробки.",
      ]),
      dict(h="✍️ Шаблони повідомлень", p=[
        "Є три набори шаблонів: для клієнта, для менеджера та для швидкого замовлення. Швидкому замовленню UniShop2 відведено окремі сповіщення, адже воно оформлюється інакше, ніж звичайне, і містить менше даних.",
        "Підказки щодо налаштування API та шаблонів вбудовано в адмінку, тож не потрібно шукати документацію, щоб зрозуміти, яке поле що означає.",
      ]),
      dict(h="💬 Повідомлення зі сторінки замовлення", p=[
        "На сторінці замовлення можна вручну надіслати клієнтові повідомлення. Це зручно для ситуацій, що не вписуються в жоден автоматичний шаблон: уточнити адресу, попередити про затримку, повідомити, що товар підготовлено до видачі.",
      ]),
      dict(h="🚚 Нова пошта та UniShop2", p=[
        "Модуль уміє надсилати сповіщення за відправленнями Нової пошти, тож клієнт дізнається про рух посилки, а менеджерові не треба повідомляти це вручну. Для швидких заявок UniShop2 діє власна гілка сповіщень.",
      ]),
      dict(h="⚙️ Підключення та вартість", p=[
        "Потрібен акаунт у SMS-Fly: введіть дані API, налаштуйте шаблони, увімкніть модуль і збережіть налаштування. Вартість повідомлень визначається тарифами сервісу, а не модуля.",
        "Після встановлення модуль вимкнено, і вмикається він уручну після налаштування API. Надсилання варто перевірити на тестовому замовленні. Заявлено сумісність з ocStore 3.0.4.1, OpenCart 3.x, PHP 7.4–8.5 та MySQL/MariaDB.",
      ]),
    ]),
  en=dict(
    intro=[
      "A phone often beats an email: a message about an accepted order or a shipment is read within minutes. SMSfly Order PRO sends SMS and Viber through the SMS-Fly service and tells both the customer and the manager what is happening with an OpenCart/ocStore order.",
      "Besides automatic notifications, a manager can write to the customer directly from the order page when something needs clarifying, such as a size or a delivery time. UniShop2 quick orders and Nova Poshta shipments are supported separately.",
    ],
    sections=[
      dict(h="📲 Who is notified and about what", p=[
        "The customer receives a message about their order, while the manager gets a separate notification that a new order has arrived. The two texts differ because the jobs differ: the customer needs reassurance, the manager needs data to process the order.",
      ]),
      dict(h="✍️ Message templates", p=[
        "There are three template sets: for the customer, for the manager and for quick orders. UniShop2 quick orders get notifications of their own because they are placed differently from ordinary ones and carry less data.",
        "Hints for configuring the API and templates are built into the admin, so you do not have to search the documentation to find out what a field means.",
      ]),
      dict(h="💬 A message from the order page", p=[
        "On the order page you can send the customer a message by hand. That suits situations that fit no automatic template: confirming an address, warning about a delay, or saying that an item is ready for pickup.",
      ]),
      dict(h="🚚 Nova Poshta and UniShop2", p=[
        "The module can send notifications for Nova Poshta shipments, so the customer learns how the parcel is moving and the manager does not have to pass it on manually. UniShop2 quick requests have a notification branch of their own.",
      ]),
      dict(h="⚙️ Connecting and cost", p=[
        "You need an SMS-Fly account: enter the API details, set up the templates, enable the module and save. The price of messages is set by the service's tariffs, not by the module.",
        "After installation the module is off and is enabled manually once the API is configured. It is worth testing the sending on a trial order. Stated compatibility is ocStore 3.0.4.1, OpenCart 3.x, PHP 7.4 to 8.5 and MySQL/MariaDB.",
      ]),
    ]),
  cover=dict(
    tagline="SMS и Viber о заказах и отправлениях",
    items=["SMS и Viber", "Клиенту и менеджеру", "Ручное сообщение", "Новая Почта", "Быстрый заказ", "Шаблоны сообщений"],
    cards=[
      ("Два адресата", "Отдельные тексты для клиента и менеджера"),
      ("Из страницы заказа", "Ручная отправка сообщения клиенту"),
      ("Новая Почта", "Уведомления по отправлениям"),
      ("Быстрый заказ", "Отдельные шаблоны UniShop2 Quick Order"),
      ("Подсказки в админке", "Справка по API и шаблонам рядом с полями"),
      ("Включение вручную", "После установки модуль выключен"),
    ],
    tabs=["API SMS-Fly", "Шаблоны", "События", "О модуле"],
    kpis=[("SMS сегодня", "41"), ("Viber", "17"), ("Ошибок", "0")],
  ),
)

P[121] = dict(
  ru=dict(
    intro=[
      "Доставка по Дании устроена иначе, чем привычные нам схемы: есть Bring, DHL, Shipmondo, домашняя доставка и пункты выдачи вроде parcel shop и locker, и у каждого перевозчика своя тарифная сетка. Denmark Delivery PRO собирает их в одном модуле, чтобы покупатель выбирал из реальных вариантов, а магазин не вносил тарифы вручную.",
      "Несколько перевозчиков и несколько продуктов одного перевозчика можно включить одновременно, каждый способ включается отдельно. Для расчёта доступны живые тарифы Bring и DHL, а также синхронизация перевозчиков и продуктов Shipmondo.",
    ],
    sections=[
      dict(h="💶 Пять способов назначить цену", p=[
        "Стоимость доставки считается одним из способов: тариф через Live API, фиксированная цена, градация по весу, связка «страна плюс диапазон веса» или бесплатная доставка. Для разных способов в одном магазине можно использовать разные схемы, скажем живой тариф для посылок и фиксированную цену для самовывоза.",
      ]),
      dict(h="📡 Живые тарифы Bring и DHL", p=[
        "Bring Shipping Guide и DHL MyDHL рассчитывают цену по стране, почтовому индексу, весу и габаритам. К полученной сумме можно добавить наценку, настроить округление и задать бесплатный порог.",
        "Если сервис перевозчика не ответил, срабатывает безопасный fallback на ручной тариф: покупатель не остаётся без вариантов доставки, а магазин не показывает нулевую стоимость.",
      ]),
      dict(h="📍 Домой или в пункт выдачи", p=[
        "Покупатель выбирает доставку домой либо в service point, parcel shop или locker. Пункты ищутся по стране, индексу, городу и адресу, и выбранный пункт попадает в заказ. Там, где у перевозчика есть собственный интерфейс пунктов, используются прямые адаптеры, а в остальных случаях подключается резервный вариант через Shipmondo.",
      ]),
      dict(h="🌍 Международные способы", p=[
        "Для отправок за пределы Дании предусмотрены международные способы со списком стран назначения. Страны задаются явно, поэтому такой способ не появляется у покупателей из тех мест, куда вы не доставляете.",
      ]),
      dict(h="🔄 Синхронизация Shipmondo", p=[
        "Перевозчики и продукты Shipmondo подтягиваются динамически. Новые методы импортируются выключенными, чтобы после обновления списка на витрине не появились неожиданные варианты: вы сами решаете, какой из них включить.",
      ]),
      dict(h="🔑 Ключи и подготовка", p=[
        "Для живых тарифов и поиска пунктов нужны аккаунты и ключи у перевозчиков или в Shipmondo. В карточках провайдеров размещены ссылки на кабинет, получение ключей и документацию. Порядок такой: подключить перевозчиков, включить нужные способы, задать правила стоимости и проверить расчёт и выбор пункта на тестовом заказе.",
      ]),
    ]),
  uk=dict(
    intro=[
      "Доставка по Данії влаштована інакше, ніж звичні нам схеми: є Bring, DHL, Shipmondo, домашня доставка та пункти видачі на кшталт parcel shop і locker, і в кожного перевізника своя тарифна сітка. Denmark Delivery PRO збирає їх в одному модулі, щоб покупець обирав із реальних варіантів, а магазин не вносив тарифи вручну.",
      "Кілька перевізників і кілька продуктів одного перевізника можна ввімкнути одночасно, кожен спосіб вмикається окремо. Для розрахунку доступні живі тарифи Bring і DHL, а також синхронізація перевізників і продуктів Shipmondo.",
    ],
    sections=[
      dict(h="💶 П'ять способів призначити ціну", p=[
        "Вартість доставки обчислюється одним зі способів: тариф через Live API, фіксована ціна, градація за вагою, зв'язка «країна плюс діапазон ваги» або безкоштовна доставка. Для різних способів в одному магазині можна використовувати різні схеми, скажімо живий тариф для посилок і фіксовану ціну для самовивозу.",
      ]),
      dict(h="📡 Живі тарифи Bring і DHL", p=[
        "Bring Shipping Guide та DHL MyDHL розраховують ціну за країною, поштовим індексом, вагою й габаритами. До отриманої суми можна додати націнку, налаштувати округлення та задати безкоштовний поріг.",
        "Якщо сервіс перевізника не відповів, спрацьовує безпечний fallback на ручний тариф: покупець не лишається без варіантів доставки, а магазин не показує нульову вартість.",
      ]),
      dict(h="📍 Додому або в пункт видачі", p=[
        "Покупець обирає доставку додому або в service point, parcel shop чи locker. Пункти шукаються за країною, індексом, містом і адресою, а обраний пункт потрапляє в замовлення. Там, де в перевізника є власний інтерфейс пунктів, використовуються прямі адаптери, а в решті випадків підключається резервний варіант через Shipmondo.",
      ]),
      dict(h="🌍 Міжнародні способи", p=[
        "Для відправлень за межі Данії передбачено міжнародні способи зі списком країн призначення. Країни задаються явно, тож такий спосіб не з'являється в покупців із тих місць, куди ви не доставляєте.",
      ]),
      dict(h="🔄 Синхронізація Shipmondo", p=[
        "Перевізники й продукти Shipmondo підтягуються динамічно. Нові методи імпортуються вимкненими, щоб після оновлення списку на вітрині не з'явилися несподівані варіанти: ви самі вирішуєте, який із них увімкнути.",
      ]),
      dict(h="🔑 Ключі та підготовка", p=[
        "Для живих тарифів і пошуку пунктів потрібні акаунти та ключі в перевізників або в Shipmondo. У картках провайдерів розміщено посилання на кабінет, отримання ключів і документацію. Порядок такий: підключити перевізників, увімкнути потрібні способи, задати правила вартості й перевірити розрахунок та вибір пункту на тестовому замовленні.",
      ]),
    ]),
  en=dict(
    intro=[
      "Delivery in Denmark works differently from the schemes many of us are used to: there are Bring, DHL, Shipmondo, home delivery and pickup points such as parcel shops and lockers, and each carrier has its own price list. Denmark Delivery PRO brings them together in one module so the customer chooses from real options and the store does not enter rates by hand.",
      "Several carriers, and several products from the same carrier, can be enabled at once, and each method is switched on separately. Live Bring and DHL rates are available for pricing, along with synchronisation of Shipmondo carriers and products.",
    ],
    sections=[
      dict(h="💶 Five ways to set a price", p=[
        "Shipping cost is calculated in one of these ways: a live API rate, a fixed price, weight bands, a country plus weight range, or free delivery. Different methods in the same store can use different schemes, say a live rate for parcels and a fixed price for pickup.",
      ]),
      dict(h="📡 Live Bring and DHL rates", p=[
        "Bring Shipping Guide and DHL MyDHL calculate the price by country, postal code, weight and dimensions. A markup can be added to the returned amount, rounding can be configured and a free-shipping threshold set.",
        "If a carrier's service does not respond, a safe fallback to a manual rate kicks in: the customer is not left without delivery options, and the store does not display a zero price.",
      ]),
      dict(h="📍 Home or to a pickup point", p=[
        "The customer chooses delivery to their home or to a service point, parcel shop or locker. Points are searched by country, postal code, city and address, and the selected point is saved to the order. Where a carrier has its own pickup point interface, direct adapters are used; elsewhere the Shipmondo fallback takes over.",
      ]),
      dict(h="🌍 International methods", p=[
        "For shipments outside Denmark there are international methods with a list of destination countries. The countries are set explicitly, so such a method does not appear for customers in places you do not deliver to.",
      ]),
      dict(h="🔄 Shipmondo synchronisation", p=[
        "Shipmondo carriers and products are pulled in dynamically. New methods are imported switched off, so refreshing the list never puts unexpected options on the storefront: you decide which of them to enable.",
      ]),
      dict(h="🔑 Keys and preparation", p=[
        "Live rates and pickup point search need accounts and keys with the carriers or with Shipmondo. The provider cards carry links to the account area, key retrieval and documentation. The order of work is to connect the carriers, enable the methods you need, set the pricing rules and check the calculation and pickup point selection on a test order.",
      ]),
    ]),
  cover=dict(
    tagline="Bring, DHL и Shipmondo для доставки по Дании",
    items=["Bring и DHL", "Shipmondo", "Пункты выдачи", "Доставка домой", "Вес и страна", "Бесплатный порог"],
    cards=[
      ("Живые тарифы", "Bring Shipping Guide и DHL MyDHL"),
      ("Пять схем цены", "API, фикс, вес, страна плюс вес, бесплатно"),
      ("Пункты выдачи", "Поиск по стране, индексу, городу и адресу"),
      ("Безопасный fallback", "Ручной тариф, если сервис не ответил"),
      ("Sync Shipmondo", "Новые методы импортируются выключенными"),
      ("Международные способы", "Явный список стран назначения"),
    ],
    tabs=["Перевозчики", "Тарифы", "Пункты", "О модуле"],
    kpis=[("Перевозчиков", "3"), ("Способов", "9"), ("Пунктов", "1 240")],
  ),
)

P[54] = dict(
  ru=dict(
    intro=[
      "Заполнять карточку товара фотографиями по одной утомительно: выбрать файл, дождаться загрузки, нажать «добавить ещё». Image Manager PRO превращает это в одно действие. Несколько фотографий загружаются прямо в карточке товара, а из стандартного FileManager можно выбрать сразу несколько изображений.",
      "Но модуль занимается не только скоростью. Он следит за тем, как называются файлы, в каком порядке стоят фото и достаточно ли они крупные, и работает с изображениями товаров, категорий и контента OpenCart/ocStore.",
    ],
    sections=[
      dict(h="📤 Загрузка пачкой", p=[
        "Прямо в форме товара вы выбираете сразу несколько файлов, и они добавляются в галерею. Если фотографии уже лежат на сервере, их можно отметить в стандартном FileManager все вместе, а не вставлять по одной.",
        "Изменения попадают в базу только после того, как вы сохраните товар штатной кнопкой. Если закрыть вкладку, не сохранив, товар останется прежним.",
      ]),
      dict(h="🔤 Имена файлов без сюрпризов", p=[
        "Файлы с кириллицей, пробелами и спецсимволами в названии часто становятся причиной битых ссылок. Модуль выполняет безопасную транслитерацию, и IMG 0001 финальный.jpg превращается в понятное имя, которое одинаково работает на любом сервере.",
      ]),
      dict(h="↕️ Порядок и главное фото", p=[
        "Фотографии сортируются перетаскиванием, а главное фото назначается явно. Вам не нужно вводить числа в поле порядка: достаточно поставить нужный снимок первым, и он станет витриной товара в каталоге.",
      ]),
      dict(h="🖼️ Форматы и SEO-метаданные", p=[
        "При поддержке GD модуль работает с WebP и AVIF, которые весят меньше обычных JPEG. Кроме того, он умеет очищать метаданные изображений и записывать SEO-метаданные.",
      ]),
      dict(h="📏 Контроль качества каталога", p=[
        "В списке товаров появляется счётчик фотографий и проверка минимального размера изображений: сразу видно, у каких товаров всего одно фото или снимок слишком мал. Можно также настроить картинку no-image, которая показывается, когда фото нет.",
      ]),
      dict(h="⚠️ Что учесть", p=[
        "Модуль выключен после установки. Не загружайте изображения в служебную папку image/cache, она предназначена для сгенерированных миниатюр. Работает он со стандартной админкой OpenCart, UniShop2 и CodeCart PRO Theme, а лицензионный ключ активируется в разделе «О модуле».",
      ]),
    ]),
  uk=dict(
    intro=[
      "Заповнювати картку товару фотографіями по одній втомливо: вибрати файл, дочекатися завантаження, натиснути «додати ще». Image Manager PRO перетворює це на одну дію. Кілька фотографій завантажуються прямо в картці товару, а зі стандартного FileManager можна вибрати одразу кілька зображень.",
      "Але модуль опікується не лише швидкістю. Він стежить за тим, як називаються файли, у якому порядку стоять фото та чи достатньо вони великі, і працює із зображеннями товарів, категорій і контенту OpenCart/ocStore.",
    ],
    sections=[
      dict(h="📤 Завантаження пачкою", p=[
        "Прямо у формі товару ви обираєте одразу кілька файлів, і вони додаються до галереї. Якщо фотографії вже лежать на сервері, їх можна позначити у стандартному FileManager всі разом, а не вставляти по одній.",
        "Зміни потрапляють у базу лише після того, як ви збережете товар штатною кнопкою. Якщо закрити вкладку, не зберігши, товар залишиться колишнім.",
      ]),
      dict(h="🔤 Імена файлів без сюрпризів", p=[
        "Файли з кирилицею, пробілами та спецсимволами в назві часто стають причиною битих посилань. Модуль виконує безпечну транслітерацію, і IMG 0001 фінальний.jpg перетворюється на зрозуміле ім'я, що однаково працює на будь-якому сервері.",
      ]),
      dict(h="↕️ Порядок і головне фото", p=[
        "Фотографії сортуються перетягуванням, а головне фото призначається явно. Вам не треба вводити числа в поле порядку: досить поставити потрібний знімок першим, і він стане вітриною товару в каталозі.",
      ]),
      dict(h="🖼️ Формати та SEO-метадані", p=[
        "За підтримки GD модуль працює з WebP та AVIF, які важать менше за звичайні JPEG. Крім того, він уміє очищати метадані зображень і записувати SEO-метадані.",
      ]),
      dict(h="📏 Контроль якості каталогу", p=[
        "У списку товарів з'являється лічильник фотографій і перевірка мінімального розміру зображень: одразу видно, у яких товарів лише одне фото чи знімок замалий. Можна також налаштувати картинку no-image, що показується, коли фото немає.",
      ]),
      dict(h="⚠️ Що врахувати", p=[
        "Модуль вимкнено після встановлення. Не завантажуйте зображення до службової теки image/cache, вона призначена для згенерованих мініатюр. Працює він зі стандартною адмінкою OpenCart, UniShop2 та CodeCart PRO Theme, а ліцензійний ключ активується в розділі «Про модуль».",
      ]),
    ]),
  en=dict(
    intro=[
      "Filling a product card with photos one at a time is tiresome: pick a file, wait for the upload, click add another. Image Manager PRO turns that into a single action. Several photos are uploaded right in the product form, and several images can be chosen at once from the standard FileManager.",
      "Speed is not the only concern, though. The module also keeps an eye on how files are named, the order the photos appear in and whether they are large enough, and it works with product, category and content images in OpenCart/ocStore.",
    ],
    sections=[
      dict(h="📤 Uploading in bulk", p=[
        "Right in the product form you select several files at once and they are added to the gallery. If the photos are already on the server, you can tick them all together in the standard FileManager instead of inserting them one by one.",
        "Changes reach the database only after you save the product with the regular button. If you close the tab without saving, the product stays as it was.",
      ]),
      dict(h="🔤 File names without surprises", p=[
        "Files with Cyrillic letters, spaces and special characters in the name often cause broken links. The module transliterates them safely, so a file called IMG 0001 final.jpg becomes a clean name that behaves the same on any server.",
      ]),
      dict(h="↕️ Order and the main photo", p=[
        "Photos are sorted by drag and drop, and the main photo is assigned explicitly. You do not have to type numbers into a sort-order field: place the right shot first and it becomes the product's face in the catalogue.",
      ]),
      dict(h="🖼️ Formats and SEO metadata", p=[
        "Where GD supports it, the module works with WebP and AVIF, which weigh less than ordinary JPEG. It can also clean image metadata and write SEO metadata.",
      ]),
      dict(h="📏 Catalogue quality control", p=[
        "The product list gains a photo counter and a check on minimum image size, so you can see at once which products have just one photo or a picture that is too small. A no-image placeholder can also be configured for products without photos.",
      ]),
      dict(h="⚠️ Things to keep in mind", p=[
        "The module is off after installation. Do not upload images into the service folder image/cache, which is meant for generated thumbnails. It works with the standard OpenCart admin, UniShop2 and CodeCart PRO Theme, and the licence key is activated in the About tab.",
      ]),
    ]),
  cover=dict(
    tagline="Фото товаров: загрузка, порядок, качество",
    items=["Пакетная загрузка", "Транслитерация имён", "Drag and Drop", "Главное фото", "WebP и AVIF", "Контроль размера"],
    cards=[
      ("Много фото сразу", "Загрузка в карточке и выбор из FileManager"),
      ("Чистые имена", "Безопасная транслитерация файлов"),
      ("Сортировка", "Перетаскивание и главное фото"),
      ("WebP и AVIF", "Лёгкие форматы при поддержке GD"),
      ("Счётчик фото", "Минимальный размер видно в списке товаров"),
      ("Метаданные", "Очистка и запись SEO-метаданных"),
    ],
    tabs=["Загрузка", "Форматы", "Контроль", "О модуле"],
    kpis=[("Фото загружено", "1 280"), ("Мелких", "17"), ("Без фото", "6")],
  ),
)

P[59] = dict(
  ru=dict(
    intro=[
      "Магазин на трёх языках — это три комплекта названий, описаний, мета-тегов и информационных страниц. Переводить их вручную долго, а прогонять через обычный онлайн-переводчик опасно, потому что он ломает HTML. Translate Expert PRO переводит мультиязычные поля прямо в админке OpenCart/ocStore, а также контентные таблицы и language-файлы.",
      "Переводить можно через Google Cloud Translation, DeepL, Microsoft Translator, а также через AI-провайдеры OpenAI и Gemini. Выбранный провайдер не подменяется другим втихую: если вы указали DeepL, будет работать именно он.",
    ],
    sections=[
      dict(h="🧬 Как сохраняется разметка", p=[
        "Главная особенность модуля — работа с HTML. Теги и атрибуты не передаются переводчику как редактируемая разметка, а сохраняются локально, и переводятся только текстовые узлы. Перед записью проверяется целостность, чтобы описание не вернулось со сломанной вёрсткой.",
        "Под защитой ссылки, изображения, таблицы, списки, заголовки, style, data-атрибуты и служебные placeholders. Поэтому красиво оформленное описание товара остаётся таким же, просто на другом языке.",
      ]),
      dict(h="📝 Перевод в формах админки", p=[
        "В карточке товара, категории или информационной страницы вы открываете форму, нажимаете перевод, и поля других языков заполняются на основе исходного. Результат можно сразу прочитать и поправить, а затем сохранить форму как обычно.",
      ]),
      dict(h="📚 Таблицы и language-файлы", p=[
        "Когда нужно перевести не одну страницу, а целый раздел, используются инструменты массового перевода контентных таблиц. Отдельно поддерживаются language-файлы, то есть строки интерфейса темы и модулей.",
      ]),
      dict(h="↩️ Откат на случай неудачи", p=[
        "Копии изменений базы данных хранятся в таблице pro_translate_expert_db_backup. При удалении модуля эта таблица сохраняется, поэтому возможность откатить перевод не исчезает вместе с самим расширением. Несмотря на это, перед массовым переводом сделайте резервную копию базы.",
      ]),
      dict(h="🔌 Ключи, CDN и безопасность", p=[
        "Для выбранного сервиса нужен API-ключ, и перед работой его стоит проверить. Внешние CDN не нужны, всё работает со скриптами магазина. Модуль совместим с UniShop2 3.6.x и CodeCart PRO Theme.",
        "В выключенном состоянии он не вызывает API и не меняет контент, так что установка сама по себе не расходует баланс провайдера.",
      ]),
    ]),
  uk=dict(
    intro=[
      "Магазин трьома мовами — це три комплекти назв, описів, мета-тегів та інформаційних сторінок. Перекладати їх уручну довго, а проганяти через звичайний онлайн-перекладач небезпечно, бо він ламає HTML. Translate Expert PRO перекладає мультимовні поля прямо в адмінці OpenCart/ocStore, а також контентні таблиці й language-файли.",
      "Перекладати можна через Google Cloud Translation, DeepL, Microsoft Translator, а також через AI-провайдерів OpenAI та Gemini. Обраний провайдер не підміняється іншим потай: якщо ви вказали DeepL, працюватиме саме він.",
    ],
    sections=[
      dict(h="🧬 Як зберігається розмітка", p=[
        "Головна особливість модуля — робота з HTML. Теги й атрибути не передаються перекладачеві як розмітка, що редагується, а зберігаються локально, і перекладаються лише текстові вузли. Перед записом перевіряється цілісність, щоб опис не повернувся зі зламаною версткою.",
        "Під захистом посилання, зображення, таблиці, списки, заголовки, style, data-атрибути та службові placeholders. Тому гарно оформлений опис товару лишається таким самим, просто іншою мовою.",
      ]),
      dict(h="📝 Переклад у формах адмінки", p=[
        "У картці товару, категорії чи інформаційної сторінки ви відкриваєте форму, натискаєте переклад, і поля інших мов заповнюються на основі вихідного. Результат можна одразу прочитати й поправити, а потім зберегти форму як зазвичай.",
      ]),
      dict(h="📚 Таблиці та language-файли", p=[
        "Коли потрібно перекласти не одну сторінку, а цілий розділ, використовуються інструменти масового перекладу контентних таблиць. Окремо підтримуються language-файли, тобто рядки інтерфейсу теми й модулів.",
      ]),
      dict(h="↩️ Відкат на випадок невдачі", p=[
        "Копії змін бази даних зберігаються в таблиці pro_translate_expert_db_backup. Під час видалення модуля ця таблиця лишається, тому можливість відкотити переклад не зникає разом із самим розширенням. Попри це, перед масовим перекладом зробіть резервну копію бази.",
      ]),
      dict(h="🔌 Ключі, CDN і безпека", p=[
        "Для обраного сервісу потрібен API-ключ, і перед роботою його варто перевірити. Зовнішні CDN не потрібні, усе працює зі скриптами магазину. Модуль сумісний з UniShop2 3.6.x та CodeCart PRO Theme.",
        "У вимкненому стані він не викликає API і не змінює контент, тож установлення саме собою не витрачає баланс провайдера.",
      ]),
    ]),
  en=dict(
    intro=[
      "A store in three languages means three sets of names, descriptions, meta tags and information pages. Translating them by hand takes ages, and pushing them through an ordinary online translator is risky because it breaks the HTML. Translate Expert PRO translates multilingual fields right in the OpenCart/ocStore admin, as well as content tables and language files.",
      "Translation can run through Google Cloud Translation, DeepL, Microsoft Translator or the AI providers OpenAI and Gemini. The provider you choose is never silently replaced by another: if you pick DeepL, DeepL does the work.",
    ],
    sections=[
      dict(h="🧬 How markup is preserved", p=[
        "The key feature is the way HTML is handled. Tags and attributes are not handed to the translator as editable markup but kept locally, and only text nodes are translated. Integrity is checked before saving so a description does not come back with broken layout.",
        "Links, images, tables, lists, headings, style, data attributes and internal placeholders are protected. A carefully formatted product description stays exactly that, only in another language.",
      ]),
      dict(h="📝 Translating in admin forms", p=[
        "In a product, category or information page you open the form and press translate, and the fields for the other languages are filled from the source. You can read and correct the result immediately and then save the form as usual.",
      ]),
      dict(h="📚 Tables and language files", p=[
        "When you need to translate a whole section rather than a single page, the tools for bulk translation of content tables are used. Language files, meaning interface strings of the theme and modules, are supported separately.",
      ]),
      dict(h="↩️ A way back if it goes wrong", p=[
        "Copies of database changes are stored in the pro_translate_expert_db_backup table. The table is kept when the module is uninstalled, so the ability to roll back a translation does not vanish with the extension. Even so, make a database backup before any bulk translation.",
      ]),
      dict(h="🔌 Keys, CDNs and safety", p=[
        "The chosen service requires an API key, and it is worth verifying it before you start. No external CDNs are needed; everything works with the store's own scripts. The module is compatible with UniShop2 3.6.x and CodeCart PRO Theme.",
        "While switched off it neither calls an API nor changes content, so installing it does not use up the provider's balance.",
      ]),
    ]),
  cover=dict(
    tagline="Перевод контента магазина без поломки HTML",
    items=["Google и DeepL", "Microsoft и AI", "Поля в админке", "Таблицы контента", "Language-файлы", "Откат изменений"],
    cards=[
      ("Пять провайдеров", "Google, DeepL, Microsoft, OpenAI и Gemini"),
      ("Защита разметки", "Переводятся только текстовые узлы"),
      ("Перевод в форме", "Товары, категории и страницы одной кнопкой"),
      ("Массовый перевод", "Контентные таблицы и language-файлы"),
      ("Резервные копии", "Откат из таблицы бэкапа БД"),
      ("Без CDN", "В выключенном виде не вызывает API"),
    ],
    tabs=["Провайдеры", "Перевод", "Таблицы", "Откат"],
    kpis=[("Полей переведено", "2 460"), ("Языков", "3"), ("Откатов", "1")],
  ),
)

P[62] = dict(
  ru=dict(
    intro=[
      "Карта сайта подсказывает поисковым системам, какие страницы стоит обойти в первую очередь, и на крупном каталоге без неё часть товаров индексируется очень поздно. Sitemap PRO генерирует расширенную XML-карту для OpenCart 3.x и ocStore 3.0.4.1, причём охватывает не только товары и категории.",
      "В карту попадают производители, информационные страницы, блог ocStore, статьи и новости UniShop2, а ещё отдельные карты изображений и мультиязычные карты с hreflang. О новых страницах поисковики можно известить сразу через IndexNow.",
    ],
    sections=[
      dict(h="🗺️ Что попадает в карту", p=[
        "Список сущностей настраивается: товары, категории, производители, информационные страницы, ocStore Blog и UniShop2 Articles/News. Любую можно включить или исключить, а опция «Только товары в наличии» уберёт из карты то, чего нет на складе.",
      ]),
      dict(h="🌍 Языки и hreflang", p=[
        "У мультиязычных магазинов частая беда состоит в том, что карта содержит неправильные языковые префиксы. Здесь они берутся по фактическим папкам LangDir, а не придумываются: модуль не добавит uk/, de/ или en/, если на сайте таких путей нет.",
        "Hreflang связывает версии одной страницы на разных языках, чтобы поисковик показывал пользователю нужную.",
      ]),
      dict(h="⚡ IndexNow и карты изображений", p=[
        "IndexNow позволяет сообщить поисковикам об изменении адресов сразу, не дожидаясь очередного обхода. Карты изображений помогают Google находить фотографии товаров, которые иначе могли бы остаться незамеченными.",
      ]),
      dict(h="🔎 Вкладка «Проблемы»", p=[
        "На отдельной вкладке собраны найденные проблемы с адресами. Они доступны с фильтрами, сортировкой и постраничной навигацией, поэтому на большом каталоге разбираться с ними удобно, а не мучительно.",
      ]),
      dict(h="⏰ Генерация по cron", p=[
        "Карта строится через безопасный CLI-раннер по cron, а запуск через веб запрещён. Это защищает сервер от случайной нагрузки и от чужих запросов. Порядок обычный: включить нужные типы страниц и языки, сгенерировать карту, посмотреть «Проблемы», добавить cron-команду и отправить sitemap в Search Console.",
      ]),
      dict(h="🔒 Строгий режим OFF", p=[
        "В выключенном состоянии рабочие операции недоступны. Перед установкой сделайте резервную копию файлов и базы данных.",
      ]),
    ]),
  uk=dict(
    intro=[
      "Карта сайту підказує пошуковим системам, які сторінки варто обійти насамперед, і на великому каталозі без неї частина товарів індексується дуже пізно. Sitemap PRO генерує розширену XML-карту для OpenCart 3.x та ocStore 3.0.4.1, причому охоплює не лише товари й категорії.",
      "До карти потрапляють виробники, інформаційні сторінки, блог ocStore, статті та новини UniShop2, а ще окремі карти зображень і мультимовні карти з hreflang. Про нові сторінки пошуковики можна сповістити одразу через IndexNow.",
    ],
    sections=[
      dict(h="🗺️ Що потрапляє до карти", p=[
        "Перелік сутностей налаштовується: товари, категорії, виробники, інформаційні сторінки, ocStore Blog та UniShop2 Articles/News. Будь-яку можна ввімкнути чи виключити, а опція «Лише товари в наявності» прибере з карти те, чого немає на складі.",
      ]),
      dict(h="🌍 Мови та hreflang", p=[
        "У мультимовних магазинів часта біда в тому, що карта містить неправильні мовні префікси. Тут їх беруть за фактичними теками LangDir, а не вигадують: модуль не додасть uk/, de/ чи en/, якщо на сайті таких шляхів немає.",
        "Hreflang зв'язує версії однієї сторінки різними мовами, щоб пошуковик показував користувачеві потрібну.",
      ]),
      dict(h="⚡ IndexNow і карти зображень", p=[
        "IndexNow дає змогу повідомити пошуковикам про зміну адрес одразу, не чекаючи чергового обходу. Карти зображень допомагають Google знаходити фотографії товарів, які інакше могли б лишитися непоміченими.",
      ]),
      dict(h="🔎 Вкладка «Проблеми»", p=[
        "На окремій вкладці зібрано знайдені проблеми з адресами. Вони доступні з фільтрами, сортуванням і посторінковою навігацією, тому на великому каталозі розбиратися з ними зручно, а не мучливо.",
      ]),
      dict(h="⏰ Генерація за cron", p=[
        "Карта будується через безпечний CLI-раннер за cron, а запуск через веб заборонено. Це захищає сервер від випадкового навантаження та від чужих запитів. Порядок звичайний: увімкнути потрібні типи сторінок і мови, згенерувати карту, переглянути «Проблеми», додати cron-команду та надіслати sitemap у Search Console.",
      ]),
      dict(h="🔒 Строгий режим OFF", p=[
        "У вимкненому стані робочі операції недоступні. Перед встановленням зробіть резервну копію файлів і бази даних.",
      ]),
    ]),
  en=dict(
    intro=[
      "A sitemap tells search engines which pages to crawl first, and in a large catalogue some products are indexed very late without one. Sitemap PRO generates an extended XML sitemap for OpenCart 3.x and ocStore 3.0.4.1, and it covers a lot more than products and categories.",
      "Manufacturers, information pages, the ocStore blog, UniShop2 articles and news all make it into the map, along with separate image sitemaps and multilingual sitemaps with hreflang. Search engines can be notified about new pages immediately through IndexNow.",
    ],
    sections=[
      dict(h="🗺️ What goes into the map", p=[
        "The list of entities is configurable: products, categories, manufacturers, information pages, ocStore Blog and UniShop2 Articles/News. Any of them can be included or excluded, and the In-stock products only option removes whatever is out of stock.",
      ]),
      dict(h="🌍 Languages and hreflang", p=[
        "A common problem on multilingual stores is a sitemap with wrong language prefixes. Here they are taken from the actual LangDir folders instead of being invented: the module will not add uk/, de/ or en/ if the site has no such paths.",
        "Hreflang ties together versions of the same page in different languages so a search engine can show the visitor the right one.",
      ]),
      dict(h="⚡ IndexNow and image maps", p=[
        "IndexNow lets you tell search engines about changed URLs right away instead of waiting for the next crawl. Image sitemaps help Google find product photos that might otherwise go unnoticed.",
      ]),
      dict(h="🔎 The Problems tab", p=[
        "A separate tab collects the URL issues that were found. They come with filters, sorting and pagination, so working through them on a big catalogue is manageable rather than painful.",
      ]),
      dict(h="⏰ Generation by cron", p=[
        "The map is built by a safe CLI runner under cron, and running it from the web is forbidden. This protects the server from accidental load and from outside requests. The usual order applies: enable the page types and languages you need, generate the map, review Problems, add the cron command and submit the sitemap in Search Console.",
      ]),
      dict(h="🔒 Strict OFF mode", p=[
        "While switched off, working operations are unavailable. Make a backup of files and the database before installing.",
      ]),
    ]),
  cover=dict(
    tagline="XML-карта сайта, hreflang и IndexNow",
    items=["Товары и категории", "Блог и новости", "Карты изображений", "Hreflang", "IndexNow", "Генерация по cron"],
    cards=[
      ("Все сущности", "Товары, категории, бренды, страницы, блог"),
      ("Верные языки", "Префиксы берутся из папок LangDir"),
      ("Hreflang", "Связь языковых версий одной страницы"),
      ("IndexNow", "Быстрое уведомление поисковиков"),
      ("Вкладка Проблемы", "Фильтры, сортировка и постраничность"),
      ("CLI по cron", "Запуск через веб запрещён"),
    ],
    tabs=["Сущности", "Языки", "Проблемы", "Cron"],
    kpis=[("URL в карте", "8 540"), ("Языков", "3"), ("Проблем", "12")],
  ),
)

P[74] = dict(
  ru=dict(
    intro=[
      "Посетитель из Копенгагена открывает ваш магазин, а сайт встречает его на украинском. Принудительный редирект по языку браузера раздражает и часто ошибается, а полное игнорирование языка заставляет человека искать переключатель самому. Language Suggest PRO выбирает середину: он определяет язык браузера и вежливо предлагает сменить язык.",
      "Подсказка показывается только когда язык браузера отличается от активного языка магазина. Модуль ничего не перенаправляет сам, решение всегда остаётся за посетителем.",
    ],
    sections=[
      dict(h="💬 Подсказка вместо редиректа", p=[
        "На витрине появляется небольшая плашка с предложением перейти на нужный язык. Посетитель соглашается одним кликом либо закрывает её и продолжает смотреть сайт на текущем языке. Никаких неожиданных прыжков на другую версию, которые сбивают и людей, и поисковых роботов.",
      ]),
      dict(h="🖋️ Тексты для каждого языка", p=[
        "Текст подсказки задаётся отдельно для каждого языка, поэтому предложение звучит на том языке, на который вы приглашаете перейти. В текст можно вставлять переменные, например название языка.",
      ]),
      dict(h="🎛️ Внешний вид", p=[
        "Вид подсказки настраивается, а готовый дизайн применяется одной кнопкой. Вы подбираете плашку под стиль сайта, не редактируя шаблон темы.",
      ]),
      dict(h="🧠 Запоминание выбора", p=[
        "Если посетитель отказался от предложения или принял его, модуль это запоминает и не надоедает повторными показами. Для проверки на витрине запоминание можно сбросить и увидеть подсказку заново.",
      ]),
      dict(h="🧾 Журнал и обслуживание", p=[
        "Показы и действия посетителей записываются в журнал, поэтому видно, как часто подсказка действительно помогает. Есть диагностика, cron-команда для обслуживания и генерация ключа для неё.",
        "Порядок запуска такой: включить модуль, задать тексты для каждого языка, настроить дизайн и проверить показ, открыв витрину с другим языком браузера. Совместимость заявлена с CodeCart 3.0.5.2, OpenCart 3.x и ocStore 3.0.4.1.",
      ]),
    ]),
  uk=dict(
    intro=[
      "Відвідувач із Копенгагена відкриває ваш магазин, а сайт зустрічає його українською. Примусовий редирект за мовою браузера дратує й часто помиляється, а повне ігнорування мови змушує людину шукати перемикач самотужки. Language Suggest PRO обирає середину: він визначає мову браузера та ввічливо пропонує змінити мову.",
      "Підказка показується лише коли мова браузера відрізняється від активної мови магазину. Модуль нічого не перенаправляє сам, рішення завжди залишається за відвідувачем.",
    ],
    sections=[
      dict(h="💬 Підказка замість редиректу", p=[
        "На вітрині з'являється невеличка плашка з пропозицією перейти на потрібну мову. Відвідувач погоджується одним кліком або закриває її й далі дивиться сайт поточною мовою. Жодних несподіваних стрибків на іншу версію, які збивають і людей, і пошукових роботів.",
      ]),
      dict(h="🖋️ Тексти для кожної мови", p=[
        "Текст підказки задається окремо для кожної мови, тож пропозиція звучить тією мовою, на яку ви запрошуєте перейти. У текст можна вставляти змінні, наприклад назву мови.",
      ]),
      dict(h="🎛️ Зовнішній вигляд", p=[
        "Вигляд підказки налаштовується, а готовий дизайн застосовується однією кнопкою. Ви добираєте плашку до стилю сайту, не редагуючи шаблон теми.",
      ]),
      dict(h="🧠 Запам'ятовування вибору", p=[
        "Якщо відвідувач відмовився від пропозиції чи прийняв її, модуль це запам'ятовує й не набридає повторними показами. Для перевірки на вітрині запам'ятовування можна скинути та побачити підказку знову.",
      ]),
      dict(h="🧾 Журнал і обслуговування", p=[
        "Покази та дії відвідувачів записуються в журнал, тому видно, як часто підказка справді допомагає. Є діагностика, cron-команда для обслуговування та генерація ключа для неї.",
        "Порядок запуску такий: увімкнути модуль, задати тексти для кожної мови, налаштувати дизайн і перевірити показ, відкривши вітрину з іншою мовою браузера. Сумісність заявлено з CodeCart 3.0.5.2, OpenCart 3.x та ocStore 3.0.4.1.",
      ]),
    ]),
  en=dict(
    intro=[
      "A visitor from Copenhagen opens your store and the site greets them in Ukrainian. A forced redirect by browser language is irritating and often wrong, while ignoring language entirely makes the person hunt for the switcher. Language Suggest PRO takes the middle road: it detects the browser language and politely offers to change the site language.",
      "The prompt appears only when the browser language differs from the store's active language. The module never redirects anyone itself; the decision always stays with the visitor.",
    ],
    sections=[
      dict(h="💬 A prompt instead of a redirect", p=[
        "A small banner appears on the storefront suggesting the preferred language. The visitor accepts with one click or dismisses it and keeps browsing in the current language. There are no surprise jumps to another version, which confuse both people and search crawlers.",
      ]),
      dict(h="🖋️ Text for every language", p=[
        "The prompt text is set separately per language, so the invitation is phrased in the language you are inviting the visitor to switch to. Variables, such as the language name, can be placed in the text.",
      ]),
      dict(h="🎛️ Appearance", p=[
        "The look of the prompt is configurable, and a ready design can be applied with one button. You fit the banner to the site's style without editing the theme template.",
      ]),
      dict(h="🧠 Remembering the choice", p=[
        "Whether a visitor declined or accepted, the module remembers it and does not nag with repeated displays. For testing on the storefront you can reset that memory and see the prompt again.",
      ]),
      dict(h="🧾 Log and maintenance", p=[
        "Displays and visitor actions are written to a log, so you can see how often the prompt really helps. There is a diagnostics page, a cron command for maintenance and key generation for it.",
        "The launch order is: enable the module, set the text for each language, configure the design and check the display by opening the storefront with a different browser language. Compatibility is stated for CodeCart 3.0.5.2, OpenCart 3.x and ocStore 3.0.4.1.",
      ]),
    ]),
  cover=dict(
    tagline="Вежливая подсказка смены языка",
    items=["Язык браузера", "Без редиректа", "Тексты по языкам", "Дизайн плашки", "Запоминание выбора", "Журнал показов"],
    cards=[
      ("Определение языка", "Сравнивает язык браузера с языком магазина"),
      ("Решает посетитель", "Модуль ничего не перенаправляет сам"),
      ("Свой текст", "Отдельная подсказка для каждого языка"),
      ("Вид плашки", "Настройка и готовый дизайн одной кнопкой"),
      ("Память выбора", "Сброс запоминания для проверки"),
      ("Журнал и cron", "Показы, действия и диагностика"),
    ],
    tabs=["Тексты", "Дизайн", "Журнал", "О модуле"],
    kpis=[("Показов", "320"), ("Принято", "94"), ("Отклонено", "181")],
  ),
)

P[76] = dict(
  ru=dict(
    intro=[
      "Атрибуты ALT и TITLE у изображений товаров нужны поисковикам и экранным дикторам, но вручную их заполняют единицы: у тысячи товаров по пять фото это тысячи пустых полей. Live ALT TITLE Image PRO добавляет многоязычные ALT и TITLE для основного и каждого дополнительного изображения товара в OpenCart/ocStore 3.x.",
      "Значения можно вводить вручную или поручить автошаблонам. Ручной текст сохраняется вместе со штатным сохранением товара, а шаблоны подставляют атрибуты на витрине везде, где ручного значения нет.",
    ],
    sections=[
      dict(h="🖼️ Что хранится для каждого фото", p=[
        "ALT и TITLE задаются отдельно для каждого языка и для каждого изображения: у основной фотографии один набор, у второй и третьей собственные. Так подпись ракурса сзади не повторяет подпись общего вида.",
      ]),
      dict(h="🧩 Автошаблоны с переменными", p=[
        "Шаблон собирает атрибут из данных товара, например из названия и категории. Он применяется на витрине лишь тогда, когда ручное значение не задано, поэтому вы не рискуете затереть то, что написали вручную. Главная категория товара определяется универсально, и переменная работает без привязки к конкретной теме.",
      ]),
      dict(h="🏭 Пакетная генерация для каталога", p=[
        "Для уже существующего каталога есть пакетная генерация ALT и TITLE. Она защищена от параллельного запуска, чтобы случайный двойной клик или два администратора не наложили процессы друг на друга. Перед этим стоит проверить предпросмотр и сделать резервную копию.",
      ]),
      dict(h="🎨 Работа с темой", p=[
        "Подставляются значения на стороне сервера, прямо в Twig. Есть профили для стандартного OpenCart, UniShop2 и популярных шаблонов. Для нестандартной темы можно задать собственные селекторы изображений и галерей, а ограниченный адаптер обрабатывает динамические галереи.",
      ]),
      dict(h="🩺 Диагностика", p=[
        "Страница диагностики показывает состояние установки и умеет исправлять структуру базы. После установки модуль выключен, а перед установкой нужна резервная копия файлов и базы данных.",
      ]),
    ]),
  uk=dict(
    intro=[
      "Атрибути ALT і TITLE в зображень товарів потрібні пошуковикам та екранним дикторам, але вручну їх заповнюють одиниці: у тисячі товарів по п'ять фото це тисячі порожніх полів. Live ALT TITLE Image PRO додає мультимовні ALT і TITLE для основного та кожного додаткового зображення товару в OpenCart/ocStore 3.x.",
      "Значення можна вводити вручну або доручити автошаблонам. Ручний текст зберігається разом зі штатним збереженням товару, а шаблони підставляють атрибути на вітрині скрізь, де ручного значення немає.",
    ],
    sections=[
      dict(h="🖼️ Що зберігається для кожного фото", p=[
        "ALT і TITLE задаються окремо для кожної мови й для кожного зображення: в основної світлини один набір, у другої та третьої власні. Так підпис ракурсу ззаду не повторює підпис загального вигляду.",
      ]),
      dict(h="🧩 Автошаблони зі змінними", p=[
        "Шаблон складає атрибут із даних товару, наприклад із назви й категорії. Він застосовується на вітрині лише тоді, коли ручне значення не задано, тож ви не ризикуєте затерти те, що написали вручну. Головна категорія товару визначається універсально, і змінна працює без прив'язки до конкретної теми.",
      ]),
      dict(h="🏭 Пакетна генерація для каталогу", p=[
        "Для вже наявного каталогу є пакетна генерація ALT і TITLE. Вона захищена від паралельного запуску, щоб випадковий подвійний клік чи двоє адміністраторів не наклали процеси один на одного. Перед цим варто перевірити попередній перегляд і зробити резервну копію.",
      ]),
      dict(h="🎨 Робота з темою", p=[
        "Значення підставляються на боці сервера, просто в Twig. Є профілі для стандартного OpenCart, UniShop2 і популярних шаблонів. Для нестандартної теми можна задати власні селектори зображень і галерей, а обмежений адаптер обробляє динамічні галереї.",
      ]),
      dict(h="🩺 Діагностика", p=[
        "Сторінка діагностики показує стан встановлення й уміє виправляти структуру бази. Після встановлення модуль вимкнено, а перед встановленням потрібна резервна копія файлів і бази даних.",
      ]),
    ]),
  en=dict(
    intro=[
      "ALT and TITLE attributes on product images matter to search engines and screen readers, yet hardly anyone fills them in by hand: a thousand products with five photos each means thousands of empty fields. Live ALT TITLE Image PRO adds multilingual ALT and TITLE for the main image and for every additional product image in OpenCart/ocStore 3.x.",
      "You can type values yourself or leave it to auto templates. Manual text is saved together with the normal product save, and templates fill in attributes on the storefront wherever no manual value exists.",
    ],
    sections=[
      dict(h="🖼️ What is stored for each photo", p=[
        "ALT and TITLE are set separately for each language and each image: the main photo has one set, the second and third have their own. A caption for the rear view then does not repeat the caption for the overall shot.",
      ]),
      dict(h="🧩 Auto templates with variables", p=[
        "A template builds the attribute from product data, for example the name and the category. It applies on the storefront only when no manual value is set, so you do not risk overwriting what you wrote by hand. The product's main category is detected in a universal way, so the variable works regardless of the specific theme.",
      ]),
      dict(h="🏭 Batch generation for the catalogue", p=[
        "For an existing catalogue there is batch generation of ALT and TITLE. It is guarded against parallel runs so that an accidental double click or two administrators cannot start overlapping processes. Check the preview and make a backup first.",
      ]),
      dict(h="🎨 Working with your theme", p=[
        "Values are substituted on the server, directly in Twig. There are profiles for standard OpenCart, UniShop2 and popular templates. For a non-standard theme you can define your own image and gallery selectors, and a limited adapter handles dynamic galleries.",
      ]),
      dict(h="🩺 Diagnostics", p=[
        "The diagnostics page shows the state of the installation and can repair the database structure. The module is off after installation, and files and the database should be backed up before installing.",
      ]),
    ]),
  cover=dict(
    tagline="ALT и TITLE для каждого фото товара",
    items=["ALT и TITLE", "Каждое фото", "Все языки", "Автошаблоны", "Пакетная генерация", "Профили тем"],
    cards=[
      ("Свой набор", "Значения для каждого языка и каждого фото"),
      ("Автошаблоны", "Подстановка на витрине, если пусто"),
      ("Ручной приоритет", "Написанное вручную не затирается"),
      ("Пакетный режим", "Для готового каталога, без двойного запуска"),
      ("Профили тем", "OpenCart, UniShop2 и свои селекторы"),
      ("Диагностика", "Проверка установки и структуры базы"),
    ],
    tabs=["Шаблоны", "Каталог", "Темы", "Диагностика"],
    kpis=[("Фото с ALT", "4 310"), ("Языков", "3"), ("Без ALT", "128")],
  ),
)

P[80] = dict(
  ru=dict(
    intro=[
      "Адрес страницы — мелочь, пока в каталоге сто товаров. Когда их десять тысяч, в SEO URL обнаруживаются пустые значения, дубли, кириллица и адреса вида index.php?route=. SEO URL PRO генерирует, проверяет и обслуживает ЧПУ в ocStore 3.0.4.1 и OpenCart 3.x для товаров, категорий, производителей, информационных страниц, статей и категорий блога, а также новостей UniShop2.",
      "Главная мысль модуля в том, что адреса меняются осознанно: сначала предпросмотр, потом сохранение. Старые адреса при этом получают 301-редиректы, чтобы переход на новый URL не стоил позиций в поиске.",
    ],
    sections=[
      dict(h="🔤 Генерация по шаблонам", p=[
        "URL строится по шаблону из данных страницы, с транслитерацией, списком стоп-слов и контролем длины. Стоп-слова вроде предлогов выпадают из адреса, и он остаётся коротким и читаемым.",
      ]),
      dict(h="👀 Сначала предпросмотр", p=[
        "Новые адреса сперва показываются списком, и в базу попадают только те, что вы выбрали. Пакетная операция откатывается одной кнопкой, поэтому ошибку в шаблоне можно исправить без восстановления всей базы из архива.",
        "Сохранение изолировано: одна строка меняет только один URL, то есть конкретную комбинацию магазина, языка и query. Соседние записи остаются нетронутыми.",
      ]),
      dict(h="🧐 Поиск проблем", p=[
        "Отдельный инструмент находит пустые URL, дубли, адреса со вставками index.php или route, кириллицу в адресах, URL без существующих объектов и технические ошибки. Результат помогает понять масштаб проблемы до начала правок.",
        "Счётчики «найдено, запланировано, обработано, осталось» и прогресс запуска показывают, что происходит во время длинной операции.",
      ]),
      dict(h="↪️ 301-редиректы и история", p=[
        "Со старых адресов настраиваются 301-редиректы, ведётся история редиректов, а список можно выгрузить в CSV. Перед импортом редиректов выполняется проверка, чтобы в базу не попала ошибочная строка.",
      ]),
      dict(h="🧪 Практика", p=[
        "Сначала задайте шаблоны и стоп-слова, затем запустите «Найти проблемные SEO URL» и изучите предпросмотр, и только потом сохраняйте выбранное. Перед массовой перегенерацией сделайте резервную копию базы: меняются адреса страниц. Интерфейс доступен на en-gb, ru-ru и uk-ua, поддерживается PHP 7.4–8.5.",
      ]),
    ]),
  uk=dict(
    intro=[
      "Адреса сторінки — дрібниця, поки в каталозі сотня товарів. Коли їх десять тисяч, у SEO URL знаходяться порожні значення, дублі, кирилиця й адреси на кшталт index.php?route=. SEO URL PRO генерує, перевіряє й обслуговує ЧПУ в ocStore 3.0.4.1 та OpenCart 3.x для товарів, категорій, виробників, інформаційних сторінок, статей і категорій блогу, а також новин UniShop2.",
      "Головна думка модуля в тому, що адреси змінюються свідомо: спершу попередній перегляд, потім збереження. Старі адреси при цьому отримують 301-редіректи, щоб перехід на новий URL не коштував позицій у пошуку.",
    ],
    sections=[
      dict(h="🔤 Генерація за шаблонами", p=[
        "URL будується за шаблоном із даних сторінки, з транслітерацією, списком стоп-слів і контролем довжини. Стоп-слова на зразок прийменників випадають з адреси, і він лишається коротким та читабельним.",
      ]),
      dict(h="👀 Спершу попередній перегляд", p=[
        "Нові адреси спочатку показуються списком, і в базу потрапляють лише ті, що ви обрали. Пакетна операція відкочується однією кнопкою, тому помилку в шаблоні можна виправити без відновлення всієї бази з архіву.",
        "Збереження ізольоване: один рядок змінює лише один URL, тобто конкретну комбінацію магазину, мови й query. Сусідні записи лишаються недоторканими.",
      ]),
      dict(h="🧐 Пошук проблем", p=[
        "Окремий інструмент знаходить порожні URL, дублі, адреси з вставками index.php чи route, кирилицю в адресах, URL без наявних об'єктів і технічні помилки. Результат допомагає зрозуміти масштаб проблеми до початку правок.",
        "Лічильники «знайдено, заплановано, оброблено, залишилось» і прогрес запуску показують, що відбувається під час довгої операції.",
      ]),
      dict(h="↪️ 301-редіректи та історія", p=[
        "Зі старих адрес налаштовуються 301-редіректи, ведеться історія редіректів, а список можна вивантажити в CSV. Перед імпортом редіректів виконується перевірка, щоб у базу не потрапив помилковий рядок.",
      ]),
      dict(h="🧪 Практика", p=[
        "Спершу задайте шаблони та стоп-слова, потім запустіть «Знайти проблемні SEO URL» і вивчіть попередній перегляд, і лише після цього зберігайте обране. Перед масовою перегенерацією зробіть резервну копію бази: змінюються адреси сторінок. Інтерфейс доступний мовами en-gb, ru-ru та uk-ua, підтримується PHP 7.4–8.5.",
      ]),
    ]),
  en=dict(
    intro=[
      "A page address is a minor matter while the catalogue has a hundred products. With ten thousand, the SEO URL table turns out to hold empty values, duplicates, Cyrillic characters and addresses like index.php?route=. SEO URL PRO generates, checks and maintains friendly URLs in ocStore 3.0.4.1 and OpenCart 3.x for products, categories, manufacturers, information pages, articles and blog categories, as well as UniShop2 news.",
      "The idea behind the module is that addresses change deliberately: preview first, save afterwards. The old addresses receive 301 redirects so that moving to a new URL does not cost search rankings.",
    ],
    sections=[
      dict(h="🔤 Generation from templates", p=[
        "A URL is built from a template using page data, with transliteration, a stop-word list and length control. Stop words such as prepositions drop out of the address, which stays short and readable.",
      ]),
      dict(h="👀 Preview first", p=[
        "New addresses are shown as a list first, and only the ones you pick reach the database. A batch operation can be reverted with one button, so a mistake in a template can be fixed without restoring the whole database from an archive.",
        "Saving is isolated: one row changes only one URL, meaning a specific combination of store, language and query. Neighbouring records stay untouched.",
      ]),
      dict(h="🧐 Finding problems", p=[
        "A dedicated tool finds empty URLs, duplicates, addresses containing index.php or route, Cyrillic in URLs, URLs pointing at objects that no longer exist, and technical errors. The result helps you grasp the scale of the problem before any edits begin.",
        "Counters for found, planned, processed and remaining items, plus a progress indicator, show what is happening during a long operation.",
      ]),
      dict(h="↪️ 301 redirects and history", p=[
        "301 redirects from old addresses are configured, a redirect history is kept, and the list can be exported to CSV. A check runs before redirects are imported so that a faulty row does not enter the database.",
      ]),
      dict(h="🧪 In practice", p=[
        "First set the templates and stop words, then run Find problematic SEO URLs and study the preview, and only then save your selection. Back up the database before any mass regeneration, because page addresses change. The interface is available in en-gb, ru-ru and uk-ua, and PHP 7.4 to 8.5 is supported.",
      ]),
    ]),
  cover=dict(
    tagline="ЧПУ, проверка и 301-редиректы",
    items=["Генерация ЧПУ", "Предпросмотр", "Откат операции", "Поиск дублей", "301-редиректы", "Экспорт в CSV"],
    cards=[
      ("Шаблоны URL", "Транслитерация, стоп-слова и длина"),
      ("Сначала предпросмотр", "В базу идёт только выбранное"),
      ("Откат одной кнопкой", "Пакетная операция обратима"),
      ("Поиск проблем", "Пустые, дубли, кириллица, route"),
      ("301 и история", "Старые адреса ведут на новые"),
      ("Счётчики запуска", "Найдено, запланировано, обработано"),
    ],
    tabs=["Шаблоны", "Проблемы", "Редиректы", "История"],
    kpis=[("Проблемных URL", "236"), ("Обработано", "198"), ("301-редиректов", "412")],
  ),
)

P[85] = dict(
  ru=dict(
    intro=[
      "Заметили опечатку в кнопке или в тексте на витрине, а где она находится, непонятно: то ли в language-файле, то ли в описании товара, то ли в настройках модуля. Language Inspector PRO позволяет открыть витрину в режиме редактирования, нажать на текст и увидеть, откуда он взялся.",
      "Принципиальная особенность в точности. Модуль правит только то, происхождение чего известно наверняка, и никогда не угадывает запись по совпадению видимого текста.",
    ],
    sections=[
      dict(h="🖱️ Редактирование на самой витрине", p=[
        "Вы включаете режим редактирования и ходите по сайту как обычный посетитель. Нажимаете на нужный фрагмент, и модуль показывает точный источник: language-файл, сущность и поле. Дальше текст меняется там, где он реально хранится.",
      ]),
      dict(h="🎯 Почему не угадывает", p=[
        "Самое простое решение — искать в базе строку с тем же текстом и заменять её. Проблема в том, что слово «Купить» может встречаться в десятках мест, и замена по совпадению затронет чужие записи. Language Inspector PRO этого не делает: текст сопоставляется с источником только когда источник известен точно.",
        "Такой подход надёжнее, хотя охватывает не все случаи. Зато вы не получите ситуацию, когда правка кнопки внезапно изменила заголовок в другом разделе.",
      ]),
      dict(h="🕰️ История и восстановление", p=[
        "Каждая правка сохраняется в истории, и прежнее значение можно вернуть. Для этого модуль создаёт собственные таблицы. Список правок снабжён фильтрами, которые легко сбросить, и в нём удобно найти, что и когда менялось.",
      ]),
      dict(h="🩺 Диагностика", p=[
        "В модуле есть диагностика и раздел «О модуле». Если правка не применилась, диагностика подскажет, где искать причину.",
      ]),
      dict(h="📋 Порядок работы", p=[
        "Включите модуль, откройте витрину в режиме редактирования, нажмите на нужный текст и измените его в известном источнике. При необходимости откройте историю и восстановите прежнее значение. Перед установкой сделайте резервную копию файлов и базы данных. Совместимость заявлена с CodeCart 3.0.5.2, OpenCart 3.x, ocStore 3.0.4.1 и PHP 7.4–8.5.",
      ]),
    ]),
  uk=dict(
    intro=[
      "Помітили одруківку в кнопці чи тексті на вітрині, а де вона міститься, незрозуміло: чи в language-файлі, чи в описі товару, чи в налаштуваннях модуля. Language Inspector PRO дає змогу відкрити вітрину в режимі редагування, натиснути на текст і побачити, звідки він узявся.",
      "Принципова особливість — точність. Модуль править лише те, походження чого відоме напевно, і ніколи не вгадує запис за збігом видимого тексту.",
    ],
    sections=[
      dict(h="🖱️ Редагування на самій вітрині", p=[
        "Ви вмикаєте режим редагування й ходите сайтом як звичайний відвідувач. Натискаєте на потрібний фрагмент, і модуль показує точне джерело: language-файл, сутність і поле. Далі текст змінюється там, де він справді зберігається.",
      ]),
      dict(h="🎯 Чому не вгадує", p=[
        "Найпростіше рішення — шукати в базі рядок із тим самим текстом і замінювати його. Проблема в тому, що слово «Купити» може траплятися в десятках місць, і заміна за збігом зачепить чужі записи. Language Inspector PRO цього не робить: текст зіставляється з джерелом лише коли джерело відоме точно.",
        "Такий підхід надійніший, хоча охоплює не всі випадки. Зате ви не матимете ситуації, коли правка кнопки раптом змінила заголовок в іншому розділі.",
      ]),
      dict(h="🕰️ Історія та відновлення", p=[
        "Кожна правка зберігається в історії, і попереднє значення можна повернути. Для цього модуль створює власні таблиці. Список правок має фільтри, які легко скинути, і в ньому зручно знайти, що й коли змінювалося.",
      ]),
      dict(h="🩺 Діагностика", p=[
        "У модулі є діагностика та розділ «Про модуль». Якщо правка не застосувалася, діагностика підкаже, де шукати причину.",
      ]),
      dict(h="📋 Порядок роботи", p=[
        "Увімкніть модуль, відкрийте вітрину в режимі редагування, натисніть на потрібний текст і змініть його у відомому джерелі. За потреби відкрийте історію та відновіть попереднє значення. Перед встановленням зробіть резервну копію файлів і бази даних. Сумісність заявлено з CodeCart 3.0.5.2, OpenCart 3.x, ocStore 3.0.4.1 та PHP 7.4–8.5.",
      ]),
    ]),
  en=dict(
    intro=[
      "You spot a typo on a button or in a storefront text, and it is unclear where it lives: in a language file, in a product description or in a module setting. Language Inspector PRO lets you open the storefront in edit mode, click the text and see where it comes from.",
      "Its defining trait is precision. The module edits only what has a certainly known origin and never guesses a record by matching the visible text.",
    ],
    sections=[
      dict(h="🖱️ Editing on the storefront itself", p=[
        "You switch on edit mode and browse the site like an ordinary visitor. Click a fragment and the module shows the exact source: the language file, the entity and the field. The text is then changed where it is really stored.",
      ]),
      dict(h="🎯 Why it does not guess", p=[
        "The simplest approach is to search the database for a string with the same text and replace it. The trouble is that the word Buy may occur in dozens of places, and replacing by match would touch other people's records. Language Inspector PRO does not do that: text is matched to a source only when the source is known exactly.",
        "This approach is more reliable even though it does not cover every case. In exchange you will never find that fixing a button suddenly changed a heading in another section.",
      ]),
      dict(h="🕰️ History and restore", p=[
        "Every edit is saved in the history and the previous value can be restored. The module creates its own tables for this. The edit list has filters that are easy to reset, which makes it simple to find what changed and when.",
      ]),
      dict(h="🩺 Diagnostics", p=[
        "The module includes diagnostics and an About section. If an edit did not apply, diagnostics suggest where to look for the cause.",
      ]),
      dict(h="📋 Workflow", p=[
        "Enable the module, open the storefront in edit mode, click the text you need and change it in its known source. If necessary, open the history and restore the earlier value. Back up files and the database before installing. Stated compatibility is CodeCart 3.0.5.2, OpenCart 3.x, ocStore 3.0.4.1 and PHP 7.4 to 8.5.",
      ]),
    ]),
  cover=dict(
    tagline="Правка текстов витрины с точным источником",
    items=["Режим редактирования", "Клик по тексту", "Точный источник", "Без угадывания", "История правок", "Восстановление"],
    cards=[
      ("Правка на витрине", "Нажмите на текст и измените его"),
      ("Точный источник", "Language-файл, сущность и поле"),
      ("Без совпадений", "Не ищет текст в базе наугад"),
      ("История", "Каждая правка сохраняется"),
      ("Откат значения", "Возврат прежнего текста"),
      ("Фильтры правок", "Быстрый поиск и сброс фильтров"),
    ],
    tabs=["Правки", "История", "Диагностика", "О модуле"],
    kpis=[("Правок", "58"), ("Восстановлено", "4"), ("Источников", "23")],
  ),
)

P[125] = dict(
  ru=dict(
    intro=[
      "У тысяч страниц магазина одни и те же поля H1, Meta Title, Meta Description и Meta Keywords часто пусты, а писать их по одному нереально. Auto SEO Title PRO формирует эти поля по шаблонам для товаров, категорий, производителей, информационных страниц, статей и главной страницы.",
      "Название сущности модуль не изменяет. Он работает только с SEO-полями вокруг названия, и это принципиальная гарантия: заголовок товара, описание, цена и SEO URL остаются такими, какими вы их оставили.",
    ],
    sections=[
      dict(h="🪄 Динамический режим витрины", p=[
        "В этом режиме модуль заполняет только пустые SEO-поля в момент открытия страницы. Результат не записывается в базу и исчезает при отключении модуля. Благодаря этому можно спокойно проверить шаблоны на живом сайте: если результат не устроил, достаточно выключить модуль или поправить шаблон.",
        "Перезапись уже заполненных значений включается отдельно для каждого поля. Можно, скажем, разрешить заменять Meta Keywords и оставить нетронутыми написанные вручную Meta Title.",
      ]),
      dict(h="🧱 Шаблоны и переменные", p=[
        "Шаблон задаётся для каждой сущности и языка. Основная переменная [name] подставляет название, и вокруг неё вы строите формулировку: приставку, суффикс, имя магазина. Шаблоны поддерживают товары, категории, производителей, информационные страницы, ocStore Blog, UniShop2 Articles/News, главную и страницы модулей.",
      ]),
      dict(h="💾 Заполнение базы вручную", p=[
        "Когда динамического режима недостаточно и поля нужны именно в базе, выполняется ручное заполнение из админки. Оно состоит из трёх шагов: сканирование, предпросмотр и пакетная запись. Записываются только пустые поля.",
      ]),
      dict(h="🔐 Защита от ошибок", p=[
        "Запись в базу требует сразу нескольких условий: включённый статус модуля, разрешение «Заполнение базы», право modify и подтверждение того, что резервная копия сделана. Сам UPDATE повторно проверяет, что поле всё ещё пусто, поэтому данные, которые кто-то заполнил между сканированием и записью, не будут затёрты.",
      ]),
      dict(h="📌 С чего начать", p=[
        "Задайте шаблоны для нужных сущностей, оставьте динамический режим или посмотрите предпросмотр пустых полей и лишь потом запускайте пакетное заполнение базы. Для него обязательна полная резервная копия. В модуле есть диагностика.",
      ]),
    ]),
  uk=dict(
    intro=[
      "У тисяч сторінок магазину одні й ті самі поля H1, Meta Title, Meta Description та Meta Keywords часто порожні, а писати їх по одному нереально. Auto SEO Title PRO формує ці поля за шаблонами для товарів, категорій, виробників, інформаційних сторінок, статей і головної сторінки.",
      "Назву сутності модуль не змінює. Він працює лише з SEO-полями навколо назви, і це принципова гарантія: заголовок товару, опис, ціна та SEO URL лишаються такими, якими ви їх залишили.",
    ],
    sections=[
      dict(h="🪄 Динамічний режим вітрини", p=[
        "У цьому режимі модуль заповнює лише порожні SEO-поля в момент відкриття сторінки. Результат не записується в базу й зникає після вимкнення модуля. Завдяки цьому можна спокійно перевірити шаблони на живому сайті: якщо результат не влаштував, досить вимкнути модуль або поправити шаблон.",
        "Перезапис уже заповнених значень вмикається окремо для кожного поля. Можна, скажімо, дозволити замінювати Meta Keywords і лишити недоторканими написані вручну Meta Title.",
      ]),
      dict(h="🧱 Шаблони та змінні", p=[
        "Шаблон задається для кожної сутності й мови. Основна змінна [name] підставляє назву, і навколо неї ви будуєте формулювання: приставку, суфікс, назву магазину. Шаблони підтримують товари, категорії, виробників, інформаційні сторінки, ocStore Blog, UniShop2 Articles/News, головну та сторінки модулів.",
      ]),
      dict(h="💾 Заповнення бази вручну", p=[
        "Коли динамічного режиму замало й поля потрібні саме в базі, виконується ручне заповнення з адмінки. Воно складається з трьох кроків: сканування, попередній перегляд і пакетний запис. Записуються лише порожні поля.",
      ]),
      dict(h="🔐 Захист від помилок", p=[
        "Запис у базу вимагає одразу кількох умов: ввімкнений статус модуля, дозвіл «Заповнення бази», право modify та підтвердження того, що резервну копію зроблено. Сам UPDATE повторно перевіряє, що поле досі порожнє, тому дані, які хтось заповнив між скануванням і записом, не буде затерто.",
      ]),
      dict(h="📌 З чого почати", p=[
        "Задайте шаблони для потрібних сутностей, залиште динамічний режим або перегляньте попередній перегляд порожніх полів і лише потім запускайте пакетне заповнення бази. Для нього обов'язкова повна резервна копія. У модулі є діагностика.",
      ]),
    ]),
  en=dict(
    intro=[
      "Across thousands of store pages the same fields, H1, Meta Title, Meta Description and Meta Keywords, are often empty, and writing them one by one is unrealistic. Auto SEO Title PRO builds these fields from templates for products, categories, manufacturers, information pages, articles and the home page.",
      "The module never changes the entity name. It only works with the SEO fields around the name, which is an important guarantee: the product title, description, price and SEO URL stay exactly as you left them.",
    ],
    sections=[
      dict(h="🪄 Dynamic storefront mode", p=[
        "In this mode the module fills only empty SEO fields at the moment a page is opened. The result is not written to the database and disappears when the module is turned off. That makes it safe to test templates on a live site: if you dislike the result, switch the module off or adjust the template.",
        "Overwriting values that are already filled in is enabled separately for each field. You might, for example, allow Meta Keywords to be replaced while leaving hand-written Meta Titles alone.",
      ]),
      dict(h="🧱 Templates and variables", p=[
        "A template is defined for each entity and language. The main variable [name] inserts the title, and you build the wording around it: a prefix, a suffix, the store name. Templates cover products, categories, manufacturers, information pages, ocStore Blog, UniShop2 Articles/News, the home page and module pages.",
      ]),
      dict(h="💾 Manual database filling", p=[
        "When the dynamic mode is not enough and the values must actually be in the database, manual filling runs from the admin. It has three steps: scan, preview and batch write. Only empty fields are written.",
      ]),
      dict(h="🔐 Safeguards", p=[
        "Writing to the database requires several conditions at once: the module status must be on, the Database filling permission granted, the modify right held and a backup confirmed. The UPDATE itself re-checks that the field is still empty, so data that someone filled in between the scan and the write will not be overwritten.",
      ]),
      dict(h="📌 Where to begin", p=[
        "Define templates for the entities you need, keep the dynamic mode or look at the preview of empty fields, and only then run batch filling of the database. A full backup is mandatory for it. The module also includes diagnostics.",
      ]),
    ]),
  cover=dict(
    tagline="SEO-поля по шаблонам без правки названий",
    items=["H1 и Meta Title", "Meta Description", "Meta Keywords", "Динамический режим", "Пакетная запись", "Шаблоны по языкам"],
    cards=[
      ("Только пустые поля", "Заполненные значения не трогаются"),
      ("Динамический режим", "Результат не пишется в базу"),
      ("Переменная name", "Шаблон для каждой сущности и языка"),
      ("Предпросмотр", "Сканирование пустых полей перед записью"),
      ("Многоуровневая защита", "Права, статус и подтверждение бэкапа"),
      ("Все типы страниц", "Товары, категории, блог, статьи, главная"),
    ],
    tabs=["Шаблоны", "Динамика", "База", "Диагностика"],
    kpis=[("Пустых полей", "1 870"), ("Заполнено", "1 742"), ("Сущностей", "6")],
  ),
)


def _add(pid, ru, uk, en):
    for lang, (h, ps) in (("ru", ru), ("uk", uk), ("en", en)):
        P[pid][lang]["sections"].append(dict(h=h, p=ps))


_add(51,
 ("🔧 Типичный сценарий настройки", ["Допустим, магазин работает на двух языках и использует пять статусов заказа. Вы открываете шаблон нового заказа, добавляете логотип и цвета, затем копируете оформление в письма о смене статуса и меняете только текст. Через предпросмотр проверяете каждый вариант, а тестовое письмо отправляете на личную почту, чтобы увидеть его глазами клиента.", "Так получается единый стиль без ручной вёрстки каждого письма. Если позже изменятся цвета или логотип, правка делается один раз в общих настройках дизайна."]),
 ("🔧 Типовий сценарій налаштування", ["Припустімо, магазин працює двома мовами й використовує п'ять статусів замовлення. Ви відкриваєте шаблон нового замовлення, додаєте логотип і кольори, потім копіюєте оформлення в листи про зміну статусу й змінюєте лише текст. Через попередній перегляд перевіряєте кожен варіант, а тестовий лист надсилаєте на особисту пошту, щоб побачити його очима клієнта.", "Так виходить єдиний стиль без ручної верстки кожного листа. Якщо згодом зміняться кольори чи логотип, правка робиться один раз у спільних налаштуваннях дизайну."]),
 ("🔧 A typical setup", ["Suppose a store runs in two languages and uses five order statuses. You open the new-order template, add the logo and colours, then copy the design into the status-change emails and change only the wording. You check each variant in the preview and send a test email to your personal inbox to see it through the customer's eyes.", "The result is one consistent style without hand-coding each email. If the colours or the logo change later, the edit is made once in the shared design settings."]))

_add(68,
 ("🧭 Что меняется для покупателя", ["Покупатель видит одну страницу вместо нескольких экранов, и ему не нужно гадать, сколько шагов осталось. Выбрал доставку, и сумма доставки сразу попала в итог. Поменял способ оплаты, и итог обновился тут же, без ожидания загрузки следующей страницы.", "Гостевой заказ убирает ещё один барьер: человек, который пришёл за одной покупкой, не обязан придумывать пароль. Для магазинов с Новой Почтой полезно, что телефон приводится к виду, который нужен перевозчику, и менеджеру реже приходится перезванивать из-за неверно записанного номера."]),
 ("🧭 Що змінюється для покупця", ["Покупець бачить одну сторінку замість кількох екранів, і йому не треба гадати, скільки кроків лишилося. Обрав доставку, і сума доставки одразу потрапила в підсумок. Змінив спосіб оплати, і підсумок оновився тут-таки, без очікування завантаження наступної сторінки.", "Гостьове замовлення прибирає ще один бар'єр: людина, що прийшла по одну покупку, не мусить вигадувати пароль. Для магазинів із Новою поштою корисно, що телефон приводиться до вигляду, потрібного перевізнику, і менеджеру рідше доводиться передзвонювати через неправильно записаний номер."]),
 ("🧭 What changes for the shopper", ["The shopper sees one page instead of several screens and does not have to guess how many steps remain. Choose delivery and the shipping cost lands in the total at once. Change the payment method and the total refreshes on the spot, with no waiting for the next page to load.", "Guest checkout removes one more barrier: someone who came for a single purchase does not have to invent a password. For stores that use Nova Poshta, it helps that the phone number is formatted the way the carrier needs it, so managers have to call back less often over a wrongly typed number."]))

_add(72,
 ("🧾 Один заказ от клиента до накладной", ["Представьте, что покупатель из Харькова выбрал почтомат. В заказе сохраняется конкретный пункт, а не фраза «почтомат, Харьков». Менеджер открывает заказ, видит блок Новой Почты, проверяет данные отправителя и создаёт ТТН. Позже статус накладной обновляется, и при необходимости клиент получает email.", "Благодаря этому не нужно переписывать адрес из заказа в кабинет перевозчика и сверять его глазами. Меньше ручного переноса данных означает меньше ошибок в номере отделения."]),
 ("🧾 Одне замовлення від клієнта до накладної", ["Уявіть, що покупець із Харкова обрав поштомат. У замовленні зберігається конкретний пункт, а не фраза «поштомат, Харків». Менеджер відкриває замовлення, бачить блок Нової пошти, перевіряє дані відправника й створює ТТН. Пізніше статус накладної оновлюється, і за потреби клієнт отримує email.", "Завдяки цьому не треба переписувати адресу із замовлення в кабінет перевізника та звіряти її очима. Менше ручного перенесення даних означає менше помилок у номері відділення."]),
 ("🧾 One order from customer to waybill", ["Imagine a customer from Kharkiv picks a parcel locker. The order stores that specific point rather than the phrase locker, Kharkiv. A manager opens the order, sees the Nova Poshta block, checks the sender details and creates the waybill. Later the waybill status is refreshed and, when needed, the customer receives an email.", "That removes the need to copy an address from the order into the carrier's account and compare it by eye. Less manual transfer of data means fewer mistakes in a branch number."]))

_add(77,
 ("🧪 Как выглядит безопасный запуск", ["Представьте магазин, который подключает LiqPay и банковский перевод. Администратор вводит тестовые ключи LiqPay, оформляет заказ и проверяет три вещи: что покупатель попадает на страницу оплаты, что после платежа возвращается на сайт и что статус заказа меняется по серверному подтверждению, а не по самому факту возврата.", "Когда сценарий отработан, ключи заменяются боевыми, а способ оплаты включается в checkout. Банковский перевод и оплата при получении при этом настраиваются в том же месте, и отдельных расширений для них не нужно."]),
 ("🧪 Як виглядає безпечний запуск", ["Уявіть магазин, що підключає LiqPay і банківський переказ. Адміністратор вводить тестові ключі LiqPay, оформлює замовлення й перевіряє три речі: що покупець потрапляє на сторінку оплати, що після платежу повертається на сайт і що статус замовлення змінюється за серверним підтвердженням, а не за самим фактом повернення.", "Коли сценарій відпрацьовано, ключі замінюються бойовими, а спосіб оплати вмикається в checkout. Банківський переказ і оплата під час отримання при цьому налаштовуються в тому самому місці, і окремих розширень для них не потрібно."]),
 ("🧪 What a safe launch looks like", ["Picture a store connecting LiqPay and bank transfer. The administrator enters LiqPay test keys, places an order and checks three things: that the customer reaches the payment page, that after paying they return to the site, and that the order status changes on the server-side confirmation rather than on the mere fact of returning.", "Once the scenario works, the keys are replaced with live ones and the method is enabled at checkout. Bank transfer and cash on delivery are configured in the same place, so no separate extensions are needed for them."]))

_add(82,
 ("📱 Как это выглядит в работе", ["Оформлен заказ, и через несколько секунд в рабочую группу приходит сообщение: номер заказа, имя клиента, список товаров со ссылками и фото. Сотрудник склада сразу видит, что нужно собрать, а менеджер по продажам нажимает на ссылку и открывает товар. Когда статус заказа меняется, приходит отдельное сообщение.", "Если вы используете темы форумов Telegram, события можно разложить по разным веткам: новые заказы в одну, быстрые заказы в другую. Лишняя переписка в рабочем чате при этом не возникает."]),
 ("📱 Як це виглядає в роботі", ["Оформлено замовлення, і за кілька секунд у робочу групу надходить повідомлення: номер замовлення, ім'я клієнта, перелік товарів із посиланнями та фото. Працівник складу одразу бачить, що потрібно зібрати, а менеджер із продажів натискає на посилання й відкриває товар. Коли статус замовлення змінюється, надходить окреме повідомлення.", "Якщо ви користуєтеся темами форумів Telegram, події можна розкласти за різними гілками: нові замовлення в одну, швидкі замовлення в іншу. Зайвого листування в робочому чаті при цьому не виникає."]),
 ("📱 What it looks like in daily work", ["An order is placed and within seconds a message lands in the team group: order number, customer name, a product list with links and photos. A warehouse employee sees at once what to pick, and a sales manager taps a link to open the product. When the order status changes, a separate message arrives.", "If you use Telegram forum topics, events can be sorted into different threads: new orders in one, quick orders in another. The working chat does not fill up with unrelated chatter."]))

_add(89,
 ("🧭 Пример: подтверждение при заказе", ["Гость оформляет заказ и вводит телефон. Перед завершением ему приходит код, он вводит его на странице и только после этого заказ принимается. Если код введён неверно, число попыток ограничено, а повторная отправка возможна только после паузы. Следующий заказ с того же номера в этой же сессии не потребует нового кода.", "Для менеджера результат прост: номер в заказе действительно принадлежит тому, кто его оформлял. Это сокращает число недозвонов и ложных заказов, хотя идеальной гарантии от злоупотреблений ни один код не даёт."]),
 ("🧭 Приклад: підтвердження під час замовлення", ["Гість оформлює замовлення й вводить телефон. Перед завершенням йому надходить код, він вводить його на сторінці, і лише після цього замовлення приймається. Якщо код введено неправильно, кількість спроб обмежена, а повторне надсилання можливе лише після паузи. Наступне замовлення з того самого номера в цій самій сесії не вимагатиме нового коду.", "Для менеджера результат простий: номер у замовленні справді належить тому, хто його оформлював. Це скорочує кількість недодзвонів і хибних замовлень, хоча ідеальної гарантії від зловживань жоден код не дає."]),
 ("🧭 Example: confirming at checkout", ["A guest places an order and types a phone number. Before the order is completed a code arrives, the guest enters it on the page, and only then is the order accepted. If the code is wrong, the number of attempts is limited, and a resend is possible only after a pause. A next order from the same number in the same session will not ask for a new code.", "For the manager the outcome is simple: the number in the order really belongs to whoever placed it. This cuts the number of unanswered calls and fake orders, although no code can offer a perfect guarantee against abuse."]))

_add(96,
 ("🧭 Пример: покупка без пароля", ["Покупатель приходит из рекламы, добавляет товар в корзину и на шаге входа нажимает кнопку Google. Через несколько секунд он уже авторизован, а запрошенные магазином поля (например, телефон) он дозаполняет прямо в процессе. Пароль придумывать не пришлось.", "Позже человек может привязать к тому же профилю ещё и Telegram или Apple в личном кабинете и входить любым из способов. Для вас это один клиент в базе, а не три разных аккаунта."]),
 ("🧭 Приклад: покупка без пароля", ["Покупець приходить із реклами, додає товар до кошика й на кроці входу натискає кнопку Google. За кілька секунд він уже авторизований, а поля, яких вимагає магазин (наприклад, телефон), дозаповнює просто в процесі. Пароль вигадувати не довелося.", "Згодом людина може прив'язати до того самого профілю ще й Telegram чи Apple в особистому кабінеті та входити будь-яким зі способів. Для вас це один клієнт у базі, а не три різні акаунти."]),
 ("🧭 Example: buying without a password", ["A shopper arrives from an ad, adds a product to the cart and presses the Google button at the sign-in step. A few seconds later they are signed in, and any fields the store requires, such as a phone number, are completed along the way. No password had to be invented.", "Later the person can link Telegram or Apple to the same profile in their account and sign in with any of them. For you it is one customer in the database, not three separate accounts."]))

_add(97,
 ("🧭 Один день работы модуля", ["Утром приходит заказ, и клиент получает SMS с подтверждением, а менеджер получает своё сообщение с данными для обработки. Днём клиент оставляет быстрый заказ на карточке товара, и по нему срабатывает отдельный шаблон. Вечером заказ отправляется Новой Почтой, и уведомление по отправлению уходит клиенту.", "Если что-то не укладывается в шаблоны, например нужно уточнить цвет, менеджер пишет клиенту вручную со страницы заказа. Все сообщения идут через один сервис, и за стоимость отвечает ваш тариф SMS-Fly."]),
 ("🧭 Один день роботи модуля", ["Зранку надходить замовлення, і клієнт отримує SMS із підтвердженням, а менеджер отримує своє повідомлення з даними для обробки. Вдень клієнт залишає швидке замовлення на картці товару, і за ним спрацьовує окремий шаблон. Ввечері замовлення відправляється Новою поштою, і сповіщення за відправленням іде клієнтові.", "Якщо щось не вкладається в шаблони, наприклад треба уточнити колір, менеджер пише клієнтові вручну зі сторінки замовлення. Усі повідомлення йдуть через один сервіс, а за вартість відповідає ваш тариф SMS-Fly."]),
 ("🧭 One day with the module", ["In the morning an order arrives, the customer receives an SMS confirmation and the manager gets their own message with the data to process it. During the day a customer leaves a quick order on a product card and a separate template fires for it. In the evening the order is shipped via Nova Poshta and the shipment notification goes to the customer.", "If something does not fit the templates, say a colour needs confirming, the manager writes to the customer by hand from the order page. All messages go through one service, and the cost depends on your SMS-Fly tariff."]))

_add(121,
 ("🧭 Пример: корзина в Копенгагене", ["Покупатель из Копенгагена кладёт в корзину товар весом три килограмма. В checkout он видит доставку домой и несколько пунктов выдачи рядом со своим индексом, каждый со своей стоимостью. Часть тарифов приходит от Bring или DHL в реальном времени, часть задана магазином по весу.", "Если заказ превышает бесплатный порог, нужные способы показываются как бесплатные. Если же сервис перевозчика недоступен, покупатель всё равно видит ручной тариф и может оформить заказ."]),
 ("🧭 Приклад: кошик у Копенгагені", ["Покупець із Копенгагена кладе до кошика товар вагою три кілограми. У checkout він бачить доставку додому та кілька пунктів видачі поряд зі своїм індексом, кожен зі своєю вартістю. Частина тарифів надходить від Bring чи DHL у реальному часі, частину задано магазином за вагою.", "Якщо замовлення перевищує безкоштовний поріг, потрібні способи показуються як безкоштовні. А якщо сервіс перевізника недоступний, покупець усе одно бачить ручний тариф і може оформити замовлення."]),
 ("🧭 Example: a basket in Copenhagen", ["A customer in Copenhagen puts a three-kilogram product in the cart. At checkout they see home delivery and several pickup points near their postal code, each with its own price. Some rates come from Bring or DHL in real time, others are set by the store by weight.", "If the order exceeds the free-shipping threshold, the relevant methods show as free. And if a carrier's service is unavailable, the customer still sees the manual rate and can place the order."]))

_add(54,
 ("🧭 Пример: новая коллекция товаров", ["Допустим, пришла партия из пятидесяти товаров, у каждого по шесть фотографий. Вместо того чтобы грузить триста файлов по одному, вы открываете карточку, выбираете все снимки сразу и расставляете порядок перетаскиванием. Имена файлов приводятся к безопасному виду автоматически.", "Затем в списке товаров по счётчику фото видно, где снимков не хватает, а где они слишком маленькие. Так проверка полноты каталога занимает минуты, а не часы просмотра карточек."]),
 ("🧭 Приклад: нова колекція товарів", ["Припустімо, надійшла партія з п'ятдесяти товарів, у кожного по шість фотографій. Замість того щоб вантажити триста файлів по одному, ви відкриваєте картку, обираєте всі знімки одразу й розставляєте порядок перетягуванням. Імена файлів приводяться до безпечного вигляду автоматично.", "Потім у списку товарів за лічильником фото видно, де знімків бракує, а де вони замалі. Так перевірка повноти каталогу займає хвилини, а не години перегляду карток."]),
 ("🧭 Example: a new product collection", ["Say a batch of fifty products arrives, each with six photos. Instead of uploading three hundred files one by one, you open the card, select all the shots at once and arrange the order by dragging. File names are made safe automatically.", "Afterwards the photo counter in the product list shows where pictures are missing and where they are too small. Checking the completeness of a catalogue takes minutes instead of hours of opening cards."]))

_add(59,
 ("🧭 Пример: запуск новой языковой версии", ["Магазин открывает украинскую версию, и в базе тысячи товаров с русскими описаниями. Администратор подключает DeepL, переводит одну карточку и внимательно читает результат: списки, ссылки и таблицы на месте. Убедившись, что качество устраивает, он запускает перевод таблицы товаров.", "Если часть результатов не понравилась, изменения откатываются из резервной таблицы. Для тонких текстов, например юридических страниц, перевод лучше вычитать вручную, ведь автоматический перевод остаётся именно переводом."]),
 ("🧭 Приклад: запуск нової мовної версії", ["Магазин відкриває українську версію, і в базі тисячі товарів з російськими описами. Адміністратор підключає DeepL, перекладає одну картку й уважно читає результат: списки, посилання та таблиці на місці. Переконавшись, що якість влаштовує, він запускає переклад таблиці товарів.", "Якщо частина результатів не сподобалась, зміни відкочуються з резервної таблиці. Для тонких текстів, наприклад юридичних сторінок, переклад краще вичитати вручну, адже автоматичний переклад лишається саме перекладом."]),
 ("🧭 Example: launching a new language version", ["A store opens a Ukrainian version and the database holds thousands of products with Russian descriptions. The administrator connects DeepL, translates one card and reads the result carefully: lists, links and tables are all in place. Once the quality looks right, they start translating the product table.", "If some results disappoint, changes are rolled back from the backup table. For delicate texts such as legal pages, it is better to proofread the translation by hand, because machine translation remains just that."]))

_add(62,
 ("🧭 Пример: большой каталог и несколько языков", ["Магазин на трёх языках с десятком тысяч товаров получает карту, разбитую на понятные части. Администратор включает товары, категории и блог, исключает ненужные сущности и ставит галочку «Только товары в наличии». Через cron раз в сутки карта пересобирается.", "Если после изменений в каталоге у страниц появились проблемные адреса, вкладка «Проблемы» их покажет. Остаётся поправить их и отправить обновлённую карту в Search Console."]),
 ("🧭 Приклад: великий каталог і кілька мов", ["Магазин трьома мовами з десятком тисяч товарів отримує карту, розбиту на зрозумілі частини. Адміністратор вмикає товари, категорії та блог, виключає непотрібні сутності й ставить позначку «Лише товари в наявності». Через cron раз на добу карта перебудовується.", "Якщо після змін у каталозі в сторінок з'явилися проблемні адреси, вкладка «Проблеми» їх покаже. Лишається поправити їх і надіслати оновлену карту в Search Console."]),
 ("🧭 Example: a large catalogue in several languages", ["A store in three languages with ten thousand products gets a map split into clear parts. The administrator enables products, categories and the blog, excludes unneeded entities and ticks In-stock products only. Cron rebuilds the map once a day.", "If problem URLs appear after catalogue changes, the Problems tab shows them. What remains is to fix them and submit the refreshed map in Search Console."]))

_add(74,
 ("🧭 Пример: посетитель с английским браузером", ["Посетитель открывает магазин на украинском, а браузер у него настроен на английский. Вверху появляется плашка на английском с предложением переключиться. Он нажимает согласие, и сайт открывается на его языке. Если закрыть плашку, она больше не появится при следующих визитах.", "Для владельца магазина это способ помочь иностранным гостям, не навязывая язык и не рискуя запутать поисковых роботов редиректами."]),
 ("🧭 Приклад: відвідувач з англійським браузером", ["Відвідувач відкриває магазин українською, а браузер у нього налаштовано на англійську. Угорі з'являється плашка англійською з пропозицією переключитися. Він натискає згоду, і сайт відкривається його мовою. Якщо закрити плашку, вона більше не з'явиться під час наступних візитів.", "Для власника магазину це спосіб допомогти іноземним гостям, не нав'язуючи мову й не ризикуючи заплутати пошукових роботів редіректами."]),
 ("🧭 Example: a visitor with an English browser", ["A visitor opens the store in Ukrainian while their browser is set to English. A banner in English appears at the top offering to switch. They press accept and the site opens in their language. If they close the banner, it will not return on later visits.", "For the store owner this is a way to help foreign guests without forcing a language and without risking confusing search crawlers with redirects."]))

_add(76,
 ("🧭 Пример: каталог без подписей", ["В магазине десять тысяч товаров, а ALT у картинок не заполнен нигде. Вы задаёте шаблон из названия товара и главной категории, проверяете предпросмотр и запускаете пакетную генерацию. Затем для самых важных товаров вручную пишете более точные описания, и они имеют приоритет над шаблоном.", "Так основная масса изображений получает осмысленные атрибуты быстро, а для важных позиций остаётся возможность подобрать слова вручную."]),
 ("🧭 Приклад: каталог без підписів", ["У магазині десять тисяч товарів, а ALT у картинок не заповнено ніде. Ви задаєте шаблон із назви товару й головної категорії, перевіряєте попередній перегляд і запускаєте пакетну генерацію. Потім для найважливіших товарів уручну пишете точніші описи, і вони мають пріоритет над шаблоном.", "Так основна маса зображень швидко отримує змістовні атрибути, а для важливих позицій лишається можливість дібрати слова вручну."]),
 ("🧭 Example: a catalogue without captions", ["A store has ten thousand products and no image has an ALT filled in. You define a template from the product name and main category, check the preview and run batch generation. Then for your most important products you write more precise descriptions by hand, and these take priority over the template.", "Most images get meaningful attributes quickly, while for key items you can still choose the wording yourself."]))

_add(80,
 ("🧭 Пример: наведение порядка в старом магазине", ["Магазин работал годами, и в адресах встречается всё подряд: кириллица, дубли, остатки index.php. Администратор запускает поиск проблем, видит их количество, подбирает шаблон и просматривает новые адреса списком. Выбрав нужные, сохраняет их, а старые автоматически получают 301-редирект.", "Если результат не устроил, последняя пакетная операция откатывается. Именно эта возможность сделать шаг назад и позволяет решиться на перегенерацию адресов в живом магазине."]),
 ("🧭 Приклад: наведення ладу в старому магазині", ["Магазин працював роками, і в адресах трапляється все підряд: кирилиця, дублі, залишки index.php. Адміністратор запускає пошук проблем, бачить їхню кількість, добирає шаблон і переглядає нові адреси списком. Обравши потрібні, зберігає їх, а старі автоматично отримують 301-редірект.", "Якщо результат не влаштував, остання пакетна операція відкочується. Саме ця можливість зробити крок назад і дозволяє наважитися на перегенерацію адрес у живому магазині."]),
 ("🧭 Example: tidying up an old store", ["A store has run for years and its addresses contain everything: Cyrillic, duplicates, remnants of index.php. The administrator runs the problem search, sees how many there are, picks a template and reviews the new addresses as a list. After selecting the right ones they are saved, and the old ones automatically receive a 301 redirect.", "If the result disappoints, the last batch operation can be rolled back. That ability to step back is what makes it reasonable to regenerate addresses in a live store."]))

_add(85,
 ("🧭 Пример: правка за минуту", ["Менеджер замечает, что на кнопке в корзине написано не то, что нужно. Он открывает витрину в режиме редактирования, нажимает на кнопку, видит, что строка лежит в конкретном language-файле, и меняет её. Не нужно подключаться по FTP и искать файл среди сотен.", "Если позже окажется, что новая формулировка хуже прежней, значение возвращается из истории. Чёткий источник правки и возможность отката делают такие мелкие изменения безопасными."]),
 ("🧭 Приклад: правка за хвилину", ["Менеджер помічає, що на кнопці в кошику написано не те, що потрібно. Він відкриває вітрину в режимі редагування, натискає на кнопку, бачить, що рядок лежить у конкретному language-файлі, і змінює його. Не треба підключатися по FTP та шукати файл серед сотень.", "Якщо згодом виявиться, що нове формулювання гірше за попереднє, значення повертається з історії. Чітке джерело правки й можливість відкату роблять такі дрібні зміни безпечними."]),
 ("🧭 Example: a one-minute fix", ["A manager notices that a button in the cart says the wrong thing. They open the storefront in edit mode, click the button, see that the string lives in a particular language file, and change it. There is no need to connect over FTP and hunt for a file among hundreds.", "If the new wording later turns out worse than the old one, the value is restored from history. A clear source for every edit and the ability to roll back make such small changes safe."]))

_add(125,
 ("🧭 Пример: каталог с пустыми мета-полями", ["В каталоге пять тысяч товаров, у большинства Meta Title пуст. Вы задаёте шаблон вида «[name] — купить в магазине» и включаете динамический режим. Страницы сразу получают заголовки, а вы наблюдаете за результатом в поисковой выдаче и в исходном коде страниц.", "Когда шаблон выверен и вы уверены, что поля нужны в самой базе, делаете резервную копию и запускаете пакетное заполнение. Записываются только пустые поля, и все ручные заголовки остаются на месте."]),
 ("🧭 Приклад: каталог з порожніми мета-полями", ["У каталозі п'ять тисяч товарів, у більшості Meta Title порожній. Ви задаєте шаблон на кшталт «[name] — купити в магазині» і вмикаєте динамічний режим. Сторінки одразу отримують заголовки, а ви спостерігаєте за результатом у пошуковій видачі та у вихідному коді сторінок.", "Коли шаблон вивірено й ви певні, що поля потрібні в самій базі, робите резервну копію та запускаєте пакетне заповнення. Записуються лише порожні поля, і всі ручні заголовки лишаються на місці."]),
 ("🧭 Example: a catalogue with empty meta fields", ["A catalogue has five thousand products and most have an empty Meta Title. You define a template such as [name] - buy in our store and switch on the dynamic mode. The pages get titles at once, and you watch the result in search results and in the page source.", "When the template is polished and you are sure the values are needed in the database itself, you make a backup and run batch filling. Only empty fields are written, and every hand-written title stays in place."]))
