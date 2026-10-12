# -*- coding: utf-8 -*-
P = {}

P[103] = dict(
  ru=dict(
    intro=[
      "Покупатель хочет взять полтора метра кабеля, 0,75 литра масла или 2,7 погонных метра ткани, а OpenCart из коробки умеет продавать только целое число штук. Product Unit PRO снимает это ограничение: возле цены появляется понятная единица продажи, а для нужных товаров включается настоящая дробная продажа.",
      "Два режима независимы. Можно просто показывать «грн / кг» или «грн / пог. м» у обычных товаров, не трогая логику заказа, а можно разрешить дробное количество с собственным шагом. Всё, что вы не отметили, продолжает работать как раньше: целое количество и стандартная механика OpenCart."
    ],
    sections=[
      dict(h="📏 Единицы на любой вкус", p=[
        "В модуль уже встроен набор единиц, переведённых на русский, украинский и английский: штуки, метры и погонные метры, литры и миллилитры, килограммы и граммы, квадратные и кубические метры, упаковка, рулон, комплект, набор, пара, мешок, канистра. Если нужного слова нет, добавьте собственную единицу с подписями на каждом языке витрины.",
        "Кроме единицы, рядом с ценой можно вывести дополнительную подпись, например пояснение про отрез или минимальную партию. Показ единицы включается у каждого товара отдельно, по умолчанию он выключен."
      ]),
      dict(h="🧮 Как считается дробный заказ", p=[
        "В карточке товара вы включаете дробную продажу и задаёте шаг количества: 0,1, 0,25 или 0,5. Минимальный заказ берётся из стандартного поля OpenCart «Минимальное количество», а при желании можно задать и максимум; ноль означает отсутствие дополнительного лимита.",
        "Пример из документации модуля: цена 85 грн за погонный метр, шаг 0,1, минимум 0,5. Покупатель выбирает 2,7 и видит в итоге 229,50 грн. Складской остаток в стандартном поле «Количество» тоже может быть дробным."
      ]),
      dict(h="🛒 От карточки до возврата", p=[
        "Дробное количество проходит через весь путь заказа: карточку товара, списки, стандартную корзину, создание заказа, позиции заказа, списание и возврат остатка товара и его опций, а также возвраты. В UniShop2 для этого есть отдельный bridge: быстрый заказ, мини-корзина и UniCheckout понимают дробные значения.",
        "Другие темы работают, если пользуются стандартными контроллерами и Cart API OpenCart. Если у темы собственный checkout, который приводит количество к целому, потребуется небольшой дополнительный bridge."
      ]),
      dict(h="🗄️ Что происходит в базе данных", p=[
        "Простое включение модуля стандартные колонки количества не трогает. Только когда вы явно разрешаете дробную продажу глобально, модуль один раз расширяет нужные поля до DECIMAL(15,4): остатки и минимум товара, остатки значений опций, пороги скидок, корзину, позиции заказа и возвраты.",
        "Если потом выключить глобальную дробную продажу или удалить модуль, рабочие количества возвращаются к целым с округлением вверх: 5,7 превращается в 6. Дробные количества в уже оформленных заказах и возвратах не переписываются. Подписки (recurring) для дробных товаров намеренно не поддерживаются, чтобы не было неоднозначного умножения периодических платежей."
      ]),
      dict(h="🚦 Первый запуск", p=[
        "После установки модуль выключен, а единица и дробная продажа по умолчанию отключены. Сделайте резервную копию, включите модуль, разрешите дробную продажу глобально, настройте единицу и шаг у пробного товара и пройдите весь путь: корзина, оформление, заказ в админке. Настройки товара сохраняются обычной кнопкой «Сохранить» OpenCart, отдельного AJAX-сохранения нет."
      ]),
    ]),
  uk=dict(
    intro=[
      "Покупець хоче взяти півтора метра кабелю, 0,75 літра олії чи 2,7 погонного метра тканини, а OpenCart з коробки вміє продавати лише ціле число штук. Product Unit PRO знімає це обмеження: біля ціни з'являється зрозуміла одиниця продажу, а для потрібних товарів вмикається справжній дробовий продаж.",
      "Два режими незалежні. Можна просто показувати «грн / кг» чи «грн / пог. м» у звичайних товарів, не чіпаючи логіку замовлення, а можна дозволити дробову кількість із власним кроком. Усе, що ви не позначили, працює як раніше: ціла кількість і стандартна механіка OpenCart."
    ],
    sections=[
      dict(h="📏 Одиниці на будь-який смак", p=[
        "У модуль уже вбудовано набір одиниць, перекладених українською, російською та англійською: штуки, метри й погонні метри, літри та мілілітри, кілограми та грами, квадратні й кубічні метри, упаковка, рулон, комплект, набір, пара, мішок, каністра. Якщо потрібного слова немає, додайте власну одиницю з підписами для кожної мови вітрини.",
        "Окрім одиниці, поруч із ціною можна вивести додатковий підпис, наприклад пояснення про відріз чи мінімальну партію. Показ одиниці вмикається для кожного товару окремо, за замовчуванням він вимкнений."
      ]),
      dict(h="🧮 Як рахується дробове замовлення", p=[
        "У картці товару ви вмикаєте дробовий продаж і задаєте крок кількості: 0,1, 0,25 або 0,5. Мінімальне замовлення береться зі стандартного поля OpenCart «Мінімальна кількість», а за бажання можна задати й максимум; нуль означає відсутність додаткового ліміту.",
        "Приклад із документації модуля: ціна 85 грн за погонний метр, крок 0,1, мінімум 0,5. Покупець обирає 2,7 і бачить підсумок 229,50 грн. Складський залишок у стандартному полі «Кількість» також може бути дробовим."
      ]),
      dict(h="🛒 Від картки до повернення", p=[
        "Дробова кількість проходить увесь шлях замовлення: картку товару, списки, стандартний кошик, створення замовлення, позиції замовлення, списання й повернення залишку товару та його опцій, а також повернення. Для UniShop2 є окремий bridge: швидке замовлення, міні-кошик і UniCheckout розуміють дробові значення.",
        "Інші теми працюють, якщо користуються стандартними контролерами та Cart API OpenCart. Якщо в теми власний checkout, що приводить кількість до цілого, знадобиться невеликий додатковий bridge."
      ]),
      dict(h="🗄️ Що відбувається в базі даних", p=[
        "Просте вмикання модуля стандартні колонки кількості не чіпає. Лише коли ви явно дозволяєте дробовий продаж глобально, модуль один раз розширює потрібні поля до DECIMAL(15,4): залишки й мінімум товару, залишки значень опцій, пороги знижок, кошик, позиції замовлення та повернення.",
        "Якщо потім вимкнути глобальний дробовий продаж або видалити модуль, робочі кількості повертаються до цілих із округленням угору: 5,7 стає 6. Дробові кількості в уже оформлених замовленнях і поверненнях не переписуються. Підписки (recurring) для дробових товарів навмисно не підтримуються, щоб не було неоднозначного множення періодичних платежів."
      ]),
      dict(h="🚦 Перший запуск", p=[
        "Після встановлення модуль вимкнений, а одиниця й дробовий продаж за замовчуванням відключені. Зробіть резервну копію, увімкніть модуль, дозвольте дробовий продаж глобально, налаштуйте одиницю та крок у пробного товару й пройдіть увесь шлях: кошик, оформлення, замовлення в адмінці. Налаштування товару зберігаються звичайною кнопкою «Зберегти» OpenCart, окремого AJAX-збереження немає."
      ]),
    ]),
  en=dict(
    intro=[
      "A customer wants a metre and a half of cable, 0.75 litres of oil or 2.7 running metres of fabric, but stock OpenCart can only sell whole pieces. Product Unit PRO removes that limit: a clear selling unit appears next to the price, and true fractional selling can be switched on for the products that need it.",
      "The two modes are independent. You can simply show per-kg or per-running-metre labels on ordinary products without touching order logic, or allow fractional quantities with their own step. Anything you do not mark keeps working as before: whole quantities and standard OpenCart behaviour."
    ],
    sections=[
      dict(h="📏 Units for every kind of goods", p=[
        "The module ships with a set of units translated into English, Russian and Ukrainian: pieces, metres and running metres, litres and millilitres, kilograms and grams, square and cubic metres, pack, roll, kit, set, pair, bag and canister. If the word you need is missing, add your own unit with a label for each storefront language.",
        "Besides the unit, an extra caption can be shown next to the price, for example a note about cut lengths or a minimum batch. The unit is enabled per product and is off by default."
      ]),
      dict(h="🧮 How a fractional order is calculated", p=[
        "In the product form you enable fractional selling and set a quantity step such as 0.1, 0.25 or 0.5. The minimum order comes from the standard OpenCart Minimum Quantity field, and you can also set a maximum; zero means no extra limit.",
        "The example from the module documentation: the price is 85 UAH per running metre, the step is 0.1 and the minimum is 0.5. The customer picks 2.7 and the total is 229.50 UAH. The stock figure in the standard Quantity field can be fractional too."
      ]),
      dict(h="🛒 From product page to return", p=[
        "Fractional quantity travels the whole order path: product page, listings, the standard cart, order creation, order lines, stock deduction and restoration for products and their options, and returns. For UniShop2 there is a dedicated bridge, so quick order, the mini-cart and UniCheckout understand fractional values.",
        "Other themes work as long as they use the standard OpenCart controllers and Cart API. If a theme has its own checkout that rounds quantity to an integer, a small additional bridge will be needed."
      ]),
      dict(h="🗄️ What happens in the database", p=[
        "Simply enabling the module does not touch the standard quantity columns. Only when you explicitly allow fractional selling globally does the module widen the required fields once to DECIMAL(15,4): product stock and minimum, option value stock, discount thresholds, cart, order lines and returns.",
        "If you later turn global fractional selling off or uninstall the module, working quantities return to whole numbers, rounded up: 5.7 becomes 6. Fractional quantities in orders and returns that already exist are not rewritten. Recurring subscriptions for fractional products are deliberately unsupported, which avoids ambiguous multiplication of periodic payments."
      ]),
      dict(h="🚦 First run", p=[
        "After installation the module is off, and the unit and fractional selling are disabled by default. Take a backup, enable the module, allow fractional selling globally, set a unit and step on a test product and walk the full path: cart, checkout, order in the admin. Product settings are saved with the normal OpenCart Save button; there is no separate AJAX save."
      ]),
    ]),
  cover=dict(
    tagline="Килограммы, метры и литры в корзине",
    items=["Единицы у цены", "Дробные количества", "Шаг и минимум", "Три языка", "Мост для UniShop2", "Выключен по умолчанию"],
    cards=[
      ("Единица возле цены", "кг, м, л, рулон, набор или своя единица"),
      ("Дробная продажа", "0,5 кг, 1,2 м, 2,75 л для выбранных товаров"),
      ("Шаг количества", "0,1; 0,25; 0,5 и минимальный заказ"),
      ("Три языка", "единицы и подписи на ru, uk и en"),
      ("UniShop2 bridge", "быстрый заказ, мини-корзина, UniCheckout"),
      ("Безопасный откат", "дробные значения округляются вверх до целых"),
    ],
    tabs=["Основные", "Единицы", "Дробная продажа", "О модуле"],
    kpis=[("Товаров с единицей", "48"), ("Дробных товаров", "17"), ("Единиц", "16")],
  ),
)

P[104] = dict(
  ru=dict(
    intro=[
      "Когда в каталоге несколько сотен карточек, проблемы копятся тихо: у одного товара битая картинка, у другого пустой SEO-заголовок, у третьего нулевая маржа, у четвёртого нет главной категории. Product Manager PRO собирает всё это в одном месте, чтобы вы видели слабые места списком и правили их, не открывая каждую карточку.",
      "Модуль работает в двух ролях: как быстрый редактор с массовыми действиями и как аудитор каталога. Он рассчитан на ocStore 3.0.4.1 и OpenCart 3.x и по умолчанию ничего не меняет: после установки аудит не запускается, товары не трогаются, cron не выполняется, пока вы сами не включите нужные настройки."
    ],
    sections=[
      dict(h="🔎 Слабые карточки на виду", p=[
        "Аудит ищет карточки, которым не хватает полноты, и SEO-проблемы. Результат это список, а не абстрактная оценка: вы открываете проблемные товары по очереди или сразу правите их в быстром редакторе.",
        "Отдельный блок посвящён категориям и атрибутам, чтобы товар не оставался без нужной привязки только потому, что про него забыли при импорте."
      ]),
      dict(h="🖼️ Контроль изображений", p=[
        "Для главного и дополнительных изображений модуль находит битые файлы, слишком тяжёлые, слишком маленькие и повторяющиеся. Он также проверяет состояние кеша, наличие WebP и AVIF, заполненность alt и SEO-имя файла.",
        "Это особенно полезно после массового импорта от поставщика, когда картинки приезжают с именами вроде IMG_0042 и без описаний."
      ]),
      dict(h="💶 Маржа и себестоимость", p=[
        "Если вы ведёте закупочную цену, модуль показывает маржу рядом с карточкой и помогает увидеть товары, где наценка не покрывает ожидания. История себестоимости не стирается даже при очистке служебного кеша модуля."
      ]),
      dict(h="🧰 Массовые действия с предпросмотром", p=[
        "Массовые изменения всегда проходят через предпросмотр: сначала вы видите, что будет изменено, потом подтверждаете. Каждый применённый пакет записывается в историю изменений, и если результат не устроил, пакет можно откатить целиком.",
        "Для знакомства с каталогом есть режим «только аудит»: он безопасно показывает отчёты и ничего не записывает. Рекомендуемый порядок такой: включить только аудит, посмотреть, что найдено, а массовые действия включать по одному, когда понадобятся."
      ]),
      dict(h="⏱️ Cron-очередь для тяжёлых проверок", p=[
        "Проверка изображений на большом каталоге не должна подвешивать админку, поэтому тяжёлые проверки уходят в очередь, которую обрабатывает cron. Небезопасный admin-маршрут для cron отключён: запуск идёт только через защищённый catalog endpoint с секретным ключом. Зависшие задания очереди восстанавливаются автоматически."
      ]),
      dict(h="💾 Отчёты и настройки", p=[
        "Отчёты экспортируются в CSV. Настройки модуля можно экспортировать и импортировать между магазинами, а при необходимости вернуть к значениям по умолчанию. Опасные функции выключены по умолчанию, так что ошибка в настройках не превратится в потерянные данные."
      ]),
    ]),
  uk=dict(
    intro=[
      "Коли в каталозі кілька сотень карток, проблеми накопичуються тихо: в одного товару бите зображення, в іншого порожній SEO-заголовок, у третього нульова маржа, у четвертого немає головної категорії. Product Manager PRO збирає все це в одному місці, щоб ви бачили слабкі місця списком і виправляли їх, не відкриваючи кожну картку.",
      "Модуль працює у двох ролях: як швидкий редактор із масовими діями та як аудитор каталогу. Він розрахований на ocStore 3.0.4.1 та OpenCart 3.x і за замовчуванням нічого не змінює: після встановлення аудит не запускається, товари не чіпаються, cron не виконується, доки ви самі не ввімкнете потрібні налаштування."
    ],
    sections=[
      dict(h="🔎 Слабкі картки на виду", p=[
        "Аудит шукає картки, яким бракує повноти, та SEO-проблеми. Результат це список, а не абстрактна оцінка: ви відкриваєте проблемні товари по черзі або одразу правите їх у швидкому редакторі.",
        "Окремий блок присвячено категоріям і атрибутам, щоб товар не лишався без потрібної прив'язки лише тому, що про нього забули під час імпорту."
      ]),
      dict(h="🖼️ Контроль зображень", p=[
        "Для головного та додаткових зображень модуль знаходить биті файли, надто важкі, надто малі та повторювані. Він також перевіряє стан кешу, наявність WebP і AVIF, заповненість alt та SEO-ім'я файлу.",
        "Це особливо корисно після масового імпорту від постачальника, коли картинки приїжджають з іменами на кшталт IMG_0042 і без описів."
      ]),
      dict(h="💶 Маржа та собівартість", p=[
        "Якщо ви ведете закупівельну ціну, модуль показує маржу поруч із карткою й допомагає побачити товари, де націнка не покриває очікувань. Історія собівартості не стирається навіть під час очищення службового кешу модуля."
      ]),
      dict(h="🧰 Масові дії з попереднім переглядом", p=[
        "Масові зміни завжди проходять через попередній перегляд: спершу ви бачите, що буде змінено, потім підтверджуєте. Кожен застосований пакет записується в історію змін, і якщо результат не влаштував, пакет можна відкотити повністю.",
        "Для знайомства з каталогом є режим «лише аудит»: він безпечно показує звіти й нічого не записує. Рекомендований порядок такий: увімкнути лише аудит, подивитися, що знайдено, а масові дії вмикати по одній, коли знадобляться."
      ]),
      dict(h="⏱️ Cron-черга для важких перевірок", p=[
        "Перевірка зображень на великому каталозі не повинна підвішувати адмінку, тож важкі перевірки йдуть у чергу, яку обробляє cron. Небезпечний admin-маршрут для cron вимкнено: запуск іде лише через захищений catalog endpoint із секретним ключем. Завислі завдання черги відновлюються автоматично."
      ]),
      dict(h="💾 Звіти й налаштування", p=[
        "Звіти експортуються у CSV. Налаштування модуля можна експортувати й імпортувати між магазинами, а за потреби повернути до значень за замовчуванням. Небезпечні функції вимкнені за замовчуванням, тож помилка в налаштуваннях не обернеться втраченими даними."
      ]),
    ]),
  en=dict(
    intro=[
      "Once a catalogue reaches a few hundred products, problems pile up quietly: one item has a broken picture, another an empty SEO title, a third a zero margin, a fourth no main category. Product Manager PRO gathers all of it in one place so you see the weak spots as a list and fix them without opening every product.",
      "The module plays two roles: a fast editor with bulk actions and an auditor for the catalogue. It targets ocStore 3.0.4.1 and OpenCart 3.x and changes nothing by default: after installation no audit runs, no products are touched and no cron job executes until you switch the relevant settings on yourself."
    ],
    sections=[
      dict(h="🔎 Weak products in plain sight", p=[
        "The audit looks for products that lack completeness and for SEO problems. The result is a list rather than an abstract score: you open the problem products one by one or fix them straight away in the quick editor.",
        "A separate area covers categories and attributes, so a product does not stay without the right assignment just because it was forgotten during an import."
      ]),
      dict(h="🖼️ Image control", p=[
        "For the main and additional images the module finds broken files, files that are too heavy, too small or duplicated. It also checks the cache state, the presence of WebP and AVIF, alt text and the SEO-friendly file name.",
        "This is especially useful after a bulk supplier import, when pictures arrive named like IMG_0042 and without descriptions."
      ]),
      dict(h="💶 Margin and cost price", p=[
        "If you keep a purchase price, the module shows the margin next to the product and helps you spot items where the markup falls short of what you expect. The cost history is not wiped even when the module's service cache is cleared."
      ]),
      dict(h="🧰 Bulk actions with a preview", p=[
        "Bulk changes always go through a preview: you first see what will change, then confirm. Every applied batch is recorded in the change history, and if the result is not what you wanted, the whole batch can be rolled back.",
        "To get acquainted with a catalogue there is an audit-only mode, which shows reports safely and writes nothing. The suggested order is to enable audit-only, look at what is found, and switch bulk actions on one at a time when you need them."
      ]),
      dict(h="⏱️ A cron queue for heavy checks", p=[
        "Checking images across a large catalogue should not freeze the admin, so heavy checks go into a queue processed by cron. The unsafe admin route for cron is disabled: runs go only through a protected catalog endpoint with a secret key. Stalled queue jobs are recovered automatically."
      ]),
      dict(h="💾 Reports and settings", p=[
        "Reports export to CSV. Module settings can be exported and imported between stores and reset to defaults when needed. Dangerous functions are off by default, so a settings mistake will not turn into lost data."
      ]),
    ]),
  cover=dict(
    tagline="Весь каталог под контролем в одной панели",
    items=["Быстрое редактирование", "Аудит карточек", "Контроль картинок", "Маржа и закупка", "Откат пакета", "Cron-очередь"],
    cards=[
      ("Только аудит", "безопасный режим: отчёты без записи в базу"),
      ("Массовые действия", "сначала предпросмотр, потом применение"),
      ("Откат пакета", "история изменений и возврат целого пакета"),
      ("Проверка картинок", "битые, тяжёлые, маленькие и повторы"),
      ("SEO и полнота", "слабые карточки и проблемы мета-данных"),
      ("Защищённый cron", "endpoint с секретным ключом и очередью"),
    ],
    tabs=["Товары", "Аудит", "Изображения", "Настройки"],
    kpis=[("Карточек", "1 240"), ("Проблем", "86"), ("Без alt", "213")],
  ),
)

P[106] = dict(
  ru=dict(
    intro=[
      "Переход на современный PHP почти всегда упирается в один вопрос: что именно сломается. Ядро OpenCart 3.0.x, десяток модулей, тема, OCMOD-правки и Composer-пакеты написаны в разное время, и по виду сайта не определить, кто из них не переживёт PHP 8.3. PHP 8 Compatibility PRO отвечает на этот вопрос конкретным списком.",
      "Это административный модуль диагностики для OpenCart и ocStore 3.0.x с базой PHP 7.4 и целевыми версиями с 8.1 по 8.5. Он сначала только читает и показывает, а правки файлов вынесены в отдельный режим, который по умолчанию выключен."
    ],
    sections=[
      dict(h="🔬 Что именно проверяется", p=[
        "За один проход модуль разбирает ядро, расширения, PHP-код тем, активные и отключённые OCMOD, каталог storage/modification, system/library, Composer/vendor и вложенные Composer-зависимости самих модулей. Параллельно проверяются обязательные расширения PHP, наличие ionCube и SourceGuardian и реальные runtime-логи с ошибками.",
        "Логи важны: статический разбор показывает, что может сломаться, а лог — что уже ломается на вашем сервере."
      ]),
      dict(h="🧭 Одна матрица вместо пяти сканирований", p=[
        "Сайт сканируется один раз, а результат строится как матрица: база PHP 7.4 плюс версии с 8.1 по 8.5. У каждой находки записан min_php, то есть версия, начиная с которой проблема даёт о себе знать. Поэтому вы выбираете целевую версию в результатах и сразу видите, что мешает именно этому переходу.",
        "Счётчик «Находок в полном скане» это технический итог по всему диапазону, а не число блокеров. Блокирует переход только то, что отмечено как высокодостоверная критичная несовместимость для выбранной версии."
      ]),
      dict(h="🏷️ Потолок версии ядра", p=[
        "Версия самого ядра проверяется отдельно, по профилю: сборки до 3.0.4.x не сертифицируются выше PHP 8.3, 3.0.5.0 выше 8.4, а 3.0.5.1 и новее допускают профиль до 8.5. Локально исправленная сборка может работать и выше, но это подтверждается проверкой на staging, а не отчётом модуля."
      ]),
      dict(h="📦 Composer, Twig и закодированные модули", p=[
        "Twig и другие пакеты проверяются по версии, ограничению PHP и зависимостям ext-*. Каталог vendor автоматически не исправляется: модуль покажет проблему, а решение за вами.",
        "Закодированный сторонний модуль нельзя признать совместимым только потому, что установлен Loader. Такие компоненты выводятся отдельно, и окончательный ответ нужно получить у производителя либо проверить сборку на целевой версии PHP."
      ]),
      dict(h="🛟 Исправления и аварийное восстановление", p=[
        "Режим изменения файлов выключен по умолчанию. Безопасные исправления и известные готовые файлы применяются только вручную, а к модулю приложена инструкция аварийного восстановления на случай, если после правки сайт не поднимется.",
        "Практический порядок: резервная копия, полный проход, выбор целевой версии, разбор находок, исправления и обязательная проверка на staging перед боевым переключением."
      ]),
    ]),
  uk=dict(
    intro=[
      "Перехід на сучасний PHP майже завжди впирається в одне питання: що саме зламається. Ядро OpenCart 3.0.x, десяток модулів, тема, OCMOD-правки та Composer-пакети написані в різний час, і за виглядом сайту не визначити, хто з них не переживе PHP 8.3. PHP 8 Compatibility PRO відповідає на це питання конкретним списком.",
      "Це адміністративний модуль діагностики для OpenCart і ocStore 3.0.x з базою PHP 7.4 та цільовими версіями від 8.1 до 8.5. Він спершу лише читає й показує, а правки файлів винесено в окремий режим, який за замовчуванням вимкнений."
    ],
    sections=[
      dict(h="🔬 Що саме перевіряється", p=[
        "За один прохід модуль розбирає ядро, розширення, PHP-код тем, активні й вимкнені OCMOD, каталог storage/modification, system/library, Composer/vendor та вкладені Composer-залежності самих модулів. Паралельно перевіряються обов'язкові розширення PHP, наявність ionCube і SourceGuardian та реальні runtime-логи з помилками.",
        "Логи важливі: статичний розбір показує, що може зламатися, а лог показує, що вже ламається на вашому сервері."
      ]),
      dict(h="🧭 Одна матриця замість п'яти сканувань", p=[
        "Сайт сканується один раз, а результат будується як матриця: база PHP 7.4 плюс версії від 8.1 до 8.5. У кожної знахідки записано min_php, тобто версію, починаючи з якої проблема дається взнаки. Тому ви обираєте цільову версію в результатах і одразу бачите, що заважає саме цьому переходу.",
        "Лічильник «Знахідок у повному скані» це технічний підсумок по всьому діапазону, а не кількість блокерів. Перехід блокує лише те, що позначене як високодостовірна критична несумісність для обраної версії."
      ]),
      dict(h="🏷️ Стеля версії ядра", p=[
        "Версію самого ядра перевіряють окремо, за профілем: збірки до 3.0.4.x не сертифікуються вище PHP 8.3, 3.0.5.0 вище 8.4, а 3.0.5.1 і новіші допускають профіль до 8.5. Локально виправлена збірка може працювати й вище, але це підтверджується перевіркою на staging, а не звітом модуля."
      ]),
      dict(h="📦 Composer, Twig і закодовані модулі", p=[
        "Twig та інші пакети перевіряються за версією, обмеженням PHP і залежностями ext-*. Каталог vendor автоматично не виправляється: модуль покаже проблему, а рішення за вами.",
        "Закодований сторонній модуль не можна визнати сумісним лише тому, що встановлено Loader. Такі компоненти виводяться окремо, і остаточну відповідь потрібно отримати від виробника або перевірити збірку на цільовій версії PHP."
      ]),
      dict(h="🛟 Виправлення та аварійне відновлення", p=[
        "Режим зміни файлів вимкнений за замовчуванням. Безпечні виправлення та відомі готові файли застосовуються лише вручну, а до модуля додано інструкцію аварійного відновлення на випадок, якщо після правки сайт не підніметься.",
        "Практичний порядок: резервна копія, повний прохід, вибір цільової версії, розбір знахідок, виправлення та обов'язкова перевірка на staging перед бойовим перемиканням."
      ]),
    ]),
  en=dict(
    intro=[
      "Moving to a modern PHP almost always comes down to one question: what exactly will break. The OpenCart 3.0.x core, a dozen modules, the theme, OCMOD patches and Composer packages were written at different times, and the look of the site will not tell you which of them cannot survive PHP 8.3. PHP 8 Compatibility PRO answers that with a concrete list.",
      "It is an admin diagnostics module for OpenCart and ocStore 3.0.x with a PHP 7.4 baseline and target versions from 8.1 to 8.5. It first only reads and reports, while file changes sit in a separate mode that is off by default."
    ],
    sections=[
      dict(h="🔬 What gets checked", p=[
        "In a single pass the module examines the core, extensions, theme PHP code, active and disabled OCMOD files, storage/modification, system/library, Composer/vendor and the nested Composer dependencies of individual modules. Alongside that it checks the required PHP extensions, the presence of ionCube and SourceGuardian, and real runtime logs with errors.",
        "The logs matter: static analysis shows what may break, while a log shows what is already breaking on your server."
      ]),
      dict(h="🧭 One matrix instead of five scans", p=[
        "The site is scanned once and the result is built as a matrix: the PHP 7.4 baseline plus versions 8.1 to 8.5. Every finding records min_php, the version from which the problem starts to matter. You pick a target version in the results and immediately see what stands in the way of that particular move.",
        "The counter called findings in the full scan is a technical total across the whole range, not the number of blockers. Only what is flagged as a high-confidence critical incompatibility for the chosen version blocks the upgrade."
      ]),
      dict(h="🏷️ The core version ceiling", p=[
        "The core version itself is checked separately, by profile: builds before 3.0.4.x are not certified above PHP 8.3, 3.0.5.0 above 8.4, and 3.0.5.1 and newer allow a profile up to 8.5. A locally patched build may run higher, but that is confirmed by a staging test, not by the module's report."
      ]),
      dict(h="📦 Composer, Twig and encoded modules", p=[
        "Twig and other packages are checked by version, PHP constraint and ext-* dependencies. The vendor directory is not fixed automatically: the module shows the problem and the decision is yours.",
        "An encoded third-party module cannot be declared compatible just because a loader is installed. Such components are listed separately, and the final answer has to come from the vendor or from testing a build on the target PHP."
      ]),
      dict(h="🛟 Fixes and emergency recovery", p=[
        "File modification mode is off by default. Safe fixes and known ready-made files are applied manually only, and an emergency recovery guide ships with the module in case the site fails to come up after an edit.",
        "A practical order: backup, full pass, choose the target version, work through the findings, apply fixes, and always test on staging before the live switch."
      ]),
    ]),
  cover=dict(
    tagline="Проверка магазина на PHP 7.4 – 8.5",
    items=["Ядро и расширения", "Темы и OCMOD", "Composer и vendor", "ionCube и SourceGuardian", "Матрица min_php", "Аварийное восстановление"],
    cards=[
      ("Один полный проход", "матрица PHP 7.4 и версий с 8.1 по 8.5"),
      ("Целевая версия", "выберите PHP и увидите блокеры перехода"),
      ("Профиль ядра", "потолок версии для сборок 3.0.4.x и 3.0.5.x"),
      ("Composer-пакеты", "версия, ограничение PHP и зависимости ext-*"),
      ("Runtime-логи", "реальные ошибки рядом со статическим анализом"),
      ("Режим правок OFF", "исправления только вручную, с откатом"),
    ],
    tabs=["Сканирование", "Находки", "Исправления", "О модуле"],
    kpis=[("Файлов", "9 412"), ("Находок", "37"), ("Блокеров", "4")],
  ),
)

P[108] = dict(
  ru=dict(
    intro=[
      "Если в магазине сотни товаров с вариантами, опции обычно разрастаются сами собой: «Цвет» создан пять раз с разным написанием, у каждого товара свой набор значений, а чтобы добавить одну и ту же комплектацию к двадцати карточкам, приходится открывать двадцать страниц. Option Manager PRO наводит в этом порядок.",
      "Модуль занимается именно опциями OpenCart и ocStore, а не атрибутами. Опции нужны там, где покупатель выбирает вариант: цвет, размер, длину, комплектацию, напряжение, тип разъёма. Такой выбор влияет на цену, остаток, вес и корзину, поэтому ошибки в опциях стоят дороже, чем в описаниях."
    ],
    sections=[
      dict(h="🎛️ Редактор опций и значений", p=[
        "Опции и их значения редактируются в одном удобном интерфейсе, а порядок меняется перетаскиванием и сохраняется. Больше не нужно гадать, в какой последовательности покупатель увидит размеры от S до XXL: вы выстраиваете их мышью."
      ]),
      dict(h="📋 Шаблоны опций", p=[
        "Шаблон хранит готовый набор: обязательность выбора, список значений, количество, признак списания остатка (subtract), цену, баллы, вес и порядок. Один раз описав, например, комплектацию для линейки светильников, вы дальше просто применяете её, а не набираете заново.",
        "Шаблон можно вставить и прямо в карточке товара. Сохраняются такие данные обычной кнопкой «Сохранить» OpenCart, без отдельного AJAX-сохранения товара, так что случайно записать недоделанное не получится."
      ]),
      dict(h="🚚 Массовое применение к товарам", p=[
        "На вкладке «Применить к товарам» вы выбираете шаблон и товары, а модуль сначала показывает предпросмотр. Режимов три: добавить недостающие опции, заменить все опции целиком или обновить только совпадающие. Выбор зависит от задачи: докинуть новую позицию в комплектацию это одно, а переделать наборы у всей категории совсем другое.",
        "Применение выполняется отдельным осознанным действием, а не побочным эффектом сохранения."
      ]),
      dict(h="🧹 Поиск и слияние дублей", p=[
        "Модуль находит точные и похожие дубли опций, а также дубли значений внутри одной родительской опции. Склейка идёт через предпросмотр, чтобы вы видели, какие товары затронет объединение.",
        "Перед слиянием сделайте резервную копию базы данных: эта операция меняет связи по многим товарам."
      ]),
      dict(h="📤 CSV, массовые действия и подсказки", p=[
        "Опции и значения, в том числе с изображениями, экспортируются и импортируются в CSV, а массовые действия работают по выбранным строкам. В модуле есть подсказки к полям, вкладка помощи и диагностика.",
        "После установки модуль выключен и не применяет изменяющие действия, пока вы его не включите и не сохраните настройки."
      ]),
    ]),
  uk=dict(
    intro=[
      "Якщо в магазині сотні товарів із варіантами, опції зазвичай розростаються самі собою: «Колір» створено п'ять разів із різним написанням, у кожного товару свій набір значень, а щоб додати одну й ту саму комплектацію до двадцяти карток, доводиться відкривати двадцять сторінок. Option Manager PRO наводить у цьому лад.",
      "Модуль займається саме опціями OpenCart і ocStore, а не атрибутами. Опції потрібні там, де покупець обирає варіант: колір, розмір, довжину, комплектацію, напругу, тип рознімання. Такий вибір впливає на ціну, залишок, вагу й кошик, тому помилки в опціях коштують дорожче, ніж в описах."
    ],
    sections=[
      dict(h="🎛️ Редактор опцій і значень", p=[
        "Опції та їхні значення редагуються в одному зручному інтерфейсі, а порядок змінюється перетягуванням і зберігається. Більше не треба гадати, у якій послідовності покупець побачить розміри від S до XXL: ви вибудовуєте їх мишею."
      ]),
      dict(h="📋 Шаблони опцій", p=[
        "Шаблон зберігає готовий набір: обов'язковість вибору, перелік значень, кількість, ознаку списання залишку (subtract), ціну, бали, вагу й порядок. Один раз описавши, наприклад, комплектацію для лінійки світильників, далі ви просто застосовуєте її, а не вводите заново.",
        "Шаблон можна вставити й просто в картці товару. Такі дані зберігаються звичайною кнопкою «Зберегти» OpenCart, без окремого AJAX-збереження товару, тож випадково записати недороблене не вийде."
      ]),
      dict(h="🚚 Масове застосування до товарів", p=[
        "На вкладці «Застосувати до товарів» ви обираєте шаблон і товари, а модуль спершу показує попередній перегляд. Режимів три: додати відсутні опції, замінити всі опції повністю або оновити лише збіжні. Вибір залежить від задачі: докинути нову позицію в комплектацію це одне, а переробити набори в усій категорії зовсім інше.",
        "Застосування виконується окремою свідомою дією, а не побічним ефектом збереження."
      ]),
      dict(h="🧹 Пошук і злиття дублів", p=[
        "Модуль знаходить точні та схожі дублі опцій, а також дублі значень усередині однієї батьківської опції. Склеювання йде через попередній перегляд, щоб ви бачили, які товари зачепить об'єднання.",
        "Перед злиттям зробіть резервну копію бази даних: ця операція змінює зв'язки по багатьох товарах."
      ]),
      dict(h="📤 CSV, масові дії та підказки", p=[
        "Опції й значення, зокрема із зображеннями, експортуються та імпортуються в CSV, а масові дії працюють за обраними рядками. У модулі є підказки до полів, вкладка допомоги та діагностика.",
        "Після встановлення модуль вимкнений і не застосовує дій, що змінюють дані, доки ви його не ввімкнете та не збережете налаштування."
      ]),
    ]),
  en=dict(
    intro=[
      "In a store with hundreds of products and variants, options tend to sprawl on their own: Colour has been created five times with different spellings, every product has its own set of values, and adding the same bundle to twenty products means opening twenty pages. Option Manager PRO brings order to that.",
      "The module deals with OpenCart and ocStore options, not attributes. Options are for places where the customer chooses a variant: colour, size, length, bundle contents, voltage, connector type. Such a choice affects price, stock, weight and the cart, so mistakes in options cost more than mistakes in descriptions."
    ],
    sections=[
      dict(h="🎛️ An editor for options and values", p=[
        "Options and their values are edited in one convenient interface, and the order is changed by drag and drop and kept. No more guessing in which sequence the customer will see sizes from S to XXL: you line them up with the mouse."
      ]),
      dict(h="📋 Option templates", p=[
        "A template stores a ready set: whether the choice is required, the list of values, quantity, the subtract-stock flag, price, points, weight and sort order. Describe, say, the bundle for a range of lamps once and from then on you simply apply it instead of typing it again.",
        "A template can also be inserted right inside the product form. That data is saved with the normal OpenCart Save button, without a separate AJAX save of the product, so you cannot accidentally write something half-finished."
      ]),
      dict(h="🚚 Applying to many products at once", p=[
        "On the Apply to products tab you choose a template and the products, and the module first shows a preview. There are three modes: add the missing options, replace all options, or update only the matching ones. The right choice depends on the task: adding one more item to a bundle is one thing, rebuilding the sets for a whole category is quite another.",
        "Applying is a separate deliberate action, not a side effect of saving."
      ]),
      dict(h="🧹 Finding and merging duplicates", p=[
        "The module finds exact and similar duplicate options, as well as duplicate values inside one parent option. Merging goes through a preview, so you can see which products the merge will touch.",
        "Take a database backup before merging: the operation rewrites links across many products."
      ]),
      dict(h="📤 CSV, bulk actions and hints", p=[
        "Options and values, including their images, export and import as CSV, and bulk actions work on the selected rows. The module has field hints, a help tab and diagnostics.",
        "After installation the module is off and applies no changing actions until you enable it and save the settings."
      ]),
    ]),
  cover=dict(
    tagline="Опции товаров: шаблоны, слияние, массовые правки",
    items=["Редактор опций", "Шаблоны опций", "Массовое применение", "Поиск дублей", "Слияние значений", "CSV с картинками"],
    cards=[
      ("Шаблоны опций", "цена, вес, баллы, остаток и порядок в одном наборе"),
      ("Три режима", "добавить, заменить все или обновить совпадения"),
      ("Предпросмотр", "видно, какие товары затронет изменение"),
      ("Дубли опций", "точные и похожие совпадения в одном списке"),
      ("Слияние значений", "объединение внутри родительской опции"),
      ("CSV экспорт/импорт", "опции и значения вместе с изображениями"),
    ],
    tabs=["Опции", "Шаблоны", "К товарам", "Дубли"],
    kpis=[("Опций", "74"), ("Шаблонов", "12"), ("Дублей", "9")],
  ),
)

P[112] = dict(
  ru=dict(
    intro=[
      "Разметка Product и Offer на странице товара давно перестала быть прихотью SEO-специалиста: от неё зависят расширенные результаты в поиске и качество данных в Google Merchant Center. Проблема в том, что тема магазина часто выводит собственный Product со своими пробелами, а добавить поверх ещё один значит получить дубль. Merchant Schema PRO решает вопрос управляемо.",
      "Модуль работает с OpenCart 3.x и ocStore 3.0.4.1 и позволяет выбрать, кто отвечает за разметку: полностью модуль, модуль вместе с темой или только глобальные политики магазина. Можно и вовсе отказаться от JSON-LD и использовать модуль только как хранилище данных."
    ],
    sections=[
      dict(h="🧱 Четыре профиля вывода", p=[
        "Профиль выбирается под вашу тему. Первый: полная замена Product, он рекомендуется для UniShop2. Второй: полная Schema с сохранением штатного Product темы. Третий: дополнение без второго Product, когда тема уже выводит основу, а вам нужны недостающие поля. Четвёртый: только данные и Google Category без вывода JSON-LD.",
        "Такая раскладка нужна потому, что единственно верного варианта нет: у одной темы разметка полная, у другой скудная, и правильный выбор зависит от того, что уже есть на странице."
      ]),
      dict(h="🧯 Без дублей Product", p=[
        "Когда выбрана замена, совпадающий штатный Product темы отключается только в скомпилированном шаблоне product.twig через OCMOD. Физические файлы темы не меняются, поэтому обновление темы и откат модуля не превращаются в ручной разбор.",
        "Остальная независимая разметка темы остаётся на месте: BreadcrumbList, Organization, WebSite и прочее. Диагностика отдельно предупреждает, если видит риск двух источников Product-разметки."
      ]),
      dict(h="🚚 Политики доставки и возврата", p=[
        "Глобально настраиваются OnlineStore, MerchantReturnPolicy и ShippingService. Это те данные, которые Google использует, чтобы показать условия доставки и возврата рядом с товаром, и вам не нужно повторять их в каждой карточке.",
        "Можно выбрать режим, в котором выводятся только глобальные политики, а Product остаётся за темой."
      ]),
      dict(h="🗂️ Google Product Category и данные", p=[
        "В категориях магазина появляется поле Google Product Category, значение которого модуль подставляет в разметку и данные. Есть и вспомогательные инструменты для работы с этими данными, чтобы не заполнять каждую категорию вручную по одной."
      ]),
      dict(h="✅ Проверка перед публикацией", p=[
        "Выберите профиль, заполните доставку и возврат, затем откройте страницу товара и прогоните её через Rich Results Test, а данные магазина проверьте в Merchant Center. Следуйте предупреждениям диагностики модуля: основное правило одно, у товара должен быть один источник Product-разметки."
      ]),
    ]),
  uk=dict(
    intro=[
      "Розмітка Product і Offer на сторінці товару давно перестала бути забаганкою SEO-спеціаліста: від неї залежать розширені результати в пошуку та якість даних у Google Merchant Center. Проблема в тому, що тема магазину часто виводить власний Product зі своїми прогалинами, а додати поверх ще один означає отримати дубль. Merchant Schema PRO розв'язує питання кероване.",
      "Модуль працює з OpenCart 3.x та ocStore 3.0.4.1 і дає змогу обрати, хто відповідає за розмітку: повністю модуль, модуль разом із темою або лише глобальні політики магазину. Можна й узагалі відмовитися від JSON-LD та використовувати модуль лише як сховище даних."
    ],
    sections=[
      dict(h="🧱 Чотири профілі виводу", p=[
        "Профіль обирається під вашу тему. Перший: повна заміна Product, він рекомендований для UniShop2. Другий: повна Schema зі збереженням штатного Product теми. Третій: доповнення без другого Product, коли тема вже виводить основу, а вам потрібні відсутні поля. Четвертий: лише дані та Google Category без виводу JSON-LD.",
        "Така розкладка потрібна тому, що єдино правильного варіанта немає: в однієї теми розмітка повна, в іншої скупа, і слушний вибір залежить від того, що вже є на сторінці."
      ]),
      dict(h="🧯 Без дублів Product", p=[
        "Коли обрано заміну, збіжний штатний Product теми вимикається лише в скомпільованому шаблоні product.twig через OCMOD. Фізичні файли теми не змінюються, тому оновлення теми та відкат модуля не перетворюються на ручне розбирання.",
        "Решта незалежної розмітки теми лишається на місці: BreadcrumbList, Organization, WebSite тощо. Діагностика окремо попереджає, якщо бачить ризик двох джерел Product-розмітки."
      ]),
      dict(h="🚚 Політики доставки й повернення", p=[
        "Глобально налаштовуються OnlineStore, MerchantReturnPolicy та ShippingService. Це ті дані, які Google використовує, щоб показати умови доставки й повернення поруч із товаром, і вам не треба повторювати їх у кожній картці.",
        "Можна обрати режим, у якому виводяться лише глобальні політики, а Product лишається за темою."
      ]),
      dict(h="🗂️ Google Product Category та дані", p=[
        "У категоріях магазину з'являється поле Google Product Category, значення якого модуль підставляє в розмітку й дані. Є й допоміжні інструменти для роботи з цими даними, щоб не заповнювати кожну категорію вручну по одній."
      ]),
      dict(h="✅ Перевірка перед публікацією", p=[
        "Оберіть профіль, заповніть доставку й повернення, потім відкрийте сторінку товару й проженіть її через Rich Results Test, а дані магазину перевірте в Merchant Center. Дотримуйтесь попереджень діагностики модуля: головне правило одне, у товару має бути одне джерело Product-розмітки."
      ]),
    ]),
  en=dict(
    intro=[
      "Product and Offer markup on a product page stopped being an SEO nicety long ago: rich results in search and the quality of your data in Google Merchant Center depend on it. The trouble is that a store theme often prints its own Product with its own gaps, and adding another on top gives you a duplicate. Merchant Schema PRO handles that in a controlled way.",
      "The module works with OpenCart 3.x and ocStore 3.0.4.1 and lets you choose who is responsible for the markup: the module entirely, the module together with the theme, or just the store-wide policies. You can also skip JSON-LD altogether and use the module purely as a data store."
    ],
    sections=[
      dict(h="🧱 Four output profiles", p=[
        "You pick the profile to suit your theme. First, full Product replacement, recommended for UniShop2. Second, full Schema while keeping the theme's own Product. Third, an addition with no second Product, for when the theme already prints the base and you need the missing fields. Fourth, data and Google Category only, with no JSON-LD output.",
        "The layout exists because there is no single right answer: one theme ships complete markup, another a sparse one, and the right choice depends on what is already on the page."
      ]),
      dict(h="🧯 No duplicate Product", p=[
        "When replacement is chosen, the matching Product from the theme is switched off only in the compiled product.twig via OCMOD. The physical theme files are not modified, so a theme update or removing the module does not turn into manual clean-up.",
        "The other independent markup of the theme stays in place: BreadcrumbList, Organization, WebSite and so on. Diagnostics separately warns when it sees a risk of two sources of Product markup."
      ]),
      dict(h="🚚 Shipping and return policies", p=[
        "OnlineStore, MerchantReturnPolicy and ShippingService are configured globally. This is the data Google uses to show delivery and return terms next to a product, and you do not have to repeat it in every product.",
        "You can choose a mode in which only the global policies are printed and Product is left to the theme."
      ]),
      dict(h="🗂️ Google Product Category and data", p=[
        "A Google Product Category field appears in store categories, and the module places its value into the markup and data. There are also helper tools for working with this data, so you do not have to fill in every category by hand one at a time."
      ]),
      dict(h="✅ Checking before you publish", p=[
        "Choose a profile, fill in shipping and returns, then open a product page and run it through the Rich Results Test, and check the store data in Merchant Center. Follow the module's diagnostic warnings: the main rule is simple, a product should have one source of Product markup."
      ]),
    ]),
  cover=dict(
    tagline="Product, Offer и политики для Google и Merchant Center",
    items=["Product / Offer", "Политика возврата", "Политика доставки", "Google Category", "Профили вывода", "Диагностика дублей"],
    cards=[
      ("Четыре профиля", "замена, полная Schema, дополнение или только данные"),
      ("Без дублей Product", "штатная разметка темы отключается через OCMOD"),
      ("OnlineStore", "данные магазина для расширенных результатов"),
      ("MerchantReturnPolicy", "глобальные условия возврата товара"),
      ("ShippingService", "глобальные условия и сроки доставки"),
      ("Google Category", "поле в категориях магазина"),
    ],
    tabs=["Профиль", "Доставка", "Возврат", "Диагностика"],
    kpis=[("Профиль", "UniShop2"), ("Категорий", "58"), ("Предупр.", "0")],
  ),
)

P[113] = dict(
  ru=dict(
    intro=[
      "Любая ссылка в статье, новости или описании категории несёт сигнал для поисковой системы: передавать ли ей вес, как относиться к платной рекламе, как к комментарию посетителя. Обычно этот сигнал выставляют руками в HTML и регулярно путают, а то и забывают. Link Attributes PRO переносит выбор в привычный редактор.",
      "Модуль работает в стандартном редакторе Summernote OpenCart и ocStore. Вы выделяете ссылку, выбираете её тип, а нужные значения rel записываются в код сами. Никакого ручного правления исходника и никаких непонятных сокращений."
    ],
    sections=[
      dict(h="🏷️ Пять типов ссылок", p=[
        "Доступны Follow, Nofollow, Sponsored, UGC и Affiliate. Обычная ссылка Follow выводится без особых меток, Nofollow, Sponsored и UGC получают соответствующий атрибут, а тип «Партнёрская» нужен редактору как понятная пометка: по умолчанию она выводится как Sponsored.",
        "Такой набор закрывает типичные случаи контента: редакционная ссылка, ссылка на источник, реклама, партнёрская программа и пользовательский контент."
      ]),
      dict(h="✍️ Как это выглядит в работе", p=[
        "Менеджер пишет статью, выделяет текст ссылки и в диалоге Summernote отмечает тип. После сохранения страницы в коде появляются атрибуты rel, которые можно сразу проверить в исходнике. Не нужно запоминать, что значит каждый токен и как они сочетаются."
      ]),
      dict(h="📰 Новости UniShop2", p=[
        "Редактор подключается не только к обычным страницам, но и к новостям и категориям новостей UniShop2. Если вы вели новости с отдельной простой модификацией nofollow, этот способ заменяет её, и стоит убедиться, что старая правка выключена, чтобы они не конфликтовали."
      ]),
      dict(h="🔍 Зачем помечать платные ссылки", p=[
        "Платные и партнёрские ссылки следует помечать как Sponsored, потому что этого ждут поисковые системы. Модуль делает такую разметку привычной частью процесса вместо разового напоминания в инструкции для контент-отдела.",
        "Обратите внимание: атрибута dofollow в стандарте нет, а обычная ссылка без nofollow, sponsored и ugc уже и есть Follow."
      ]),
      dict(h="🌍 Совместимость", p=[
        "Интерфейс админки доступен на en-gb, ru-ru и uk-ua. Модуль совместим с CodeCart 3.0.5.2, OpenCart 3.x, ocStore 3.0.4.1 и PHP 7.4–8.5. Для начала включите модуль, задайте тип у пробной ссылки и проверьте rel в коде сохранённой страницы."
      ]),
    ]),
  uk=dict(
    intro=[
      "Будь-яке посилання в статті, новині чи описі категорії несе сигнал для пошукової системи: чи передавати йому вагу, як ставитися до платної реклами, як до коментаря відвідувача. Зазвичай цей сигнал виставляють руками в HTML і регулярно плутають, а то й забувають. Link Attributes PRO переносить вибір у звичний редактор.",
      "Модуль працює в стандартному редакторі Summernote OpenCart та ocStore. Ви виділяєте посилання, обираєте його тип, а потрібні значення rel записуються в код самі. Жодного ручного правлення вихідного коду й жодних незрозумілих скорочень."
    ],
    sections=[
      dict(h="🏷️ П'ять типів посилань", p=[
        "Доступні Follow, Nofollow, Sponsored, UGC та Affiliate. Звичайне посилання Follow виводиться без особливих позначок, Nofollow, Sponsored і UGC отримують відповідний атрибут, а тип «Партнерське» потрібен редактору як зрозуміла позначка: за замовчуванням воно виводиться як Sponsored.",
        "Такий набір закриває типові випадки контенту: редакційне посилання, посилання на джерело, реклама, партнерська програма та користувацький контент."
      ]),
      dict(h="✍️ Як це виглядає в роботі", p=[
        "Менеджер пише статтю, виділяє текст посилання й у діалозі Summernote позначає тип. Після збереження сторінки в коді з'являються атрибути rel, які можна одразу перевірити у вихідному коді. Не треба пам'ятати, що означає кожен токен і як вони поєднуються."
      ]),
      dict(h="📰 Новини UniShop2", p=[
        "Редактор підключається не лише до звичайних сторінок, а й до новин і категорій новин UniShop2. Якщо ви вели новини з окремою простою модифікацією nofollow, цей спосіб її замінює, і варто переконатися, що стара правка вимкнена, щоб вони не конфліктували."
      ]),
      dict(h="🔍 Навіщо позначати платні посилання", p=[
        "Платні та партнерські посилання слід позначати як Sponsored, бо цього очікують пошукові системи. Модуль робить таку розмітку звичною частиною процесу замість разового нагадування в інструкції для контент-відділу.",
        "Зверніть увагу: атрибута dofollow у стандарті немає, а звичайне посилання без nofollow, sponsored та ugc уже й є Follow."
      ]),
      dict(h="🌍 Сумісність", p=[
        "Інтерфейс адмінки доступний мовами en-gb, ru-ru та uk-ua. Модуль сумісний із CodeCart 3.0.5.2, OpenCart 3.x, ocStore 3.0.4.1 та PHP 7.4–8.5. Для початку увімкніть модуль, задайте тип у пробного посилання й перевірте rel у коді збереженої сторінки."
      ]),
    ]),
  en=dict(
    intro=[
      "Every link in an article, news item or category description carries a signal to the search engine: whether to pass weight, how to treat paid advertising, how to treat a visitor's comment. Usually that signal is set by hand in HTML, and it is regularly mixed up or forgotten. Link Attributes PRO moves the choice into the editor people already use.",
      "The module works inside the standard Summernote editor of OpenCart and ocStore. You select a link, choose its type, and the right rel values are written into the code for you. No hand-editing of source and no cryptic abbreviations."
    ],
    sections=[
      dict(h="🏷️ Five link types", p=[
        "Available types are Follow, Nofollow, Sponsored, UGC and Affiliate. An ordinary Follow link is output with no special tokens, Nofollow, Sponsored and UGC get their matching attribute, and the Affiliate type is a clear label for the editor that by default is output as Sponsored.",
        "That set covers the typical content cases: an editorial link, a link to a source, advertising, an affiliate programme and user-generated content."
      ]),
      dict(h="✍️ What it looks like in practice", p=[
        "A content manager writes an article, selects the link text and marks the type in the Summernote dialog. After the page is saved, the rel attributes appear in the code and can be checked in the page source straight away. There is no need to remember what each token means or how they combine."
      ]),
      dict(h="📰 UniShop2 news", p=[
        "The editor integration covers not only regular pages but also UniShop2 news and news categories. If you ran news with a separate simple nofollow modification, this approach replaces it, and you should make sure the old patch is disabled so the two do not conflict."
      ]),
      dict(h="🔍 Why paid links get marked", p=[
        "Paid and affiliate links should be marked as Sponsored because search engines expect it. The module makes such labelling a routine part of the workflow instead of a one-off reminder in the content team's instructions.",
        "Note that the standard has no dofollow attribute: an ordinary link without nofollow, sponsored or ugc simply is a Follow link."
      ]),
      dict(h="🌍 Compatibility", p=[
        "The admin interface is available in en-gb, ru-ru and uk-ua. The module is compatible with CodeCart 3.0.5.2, OpenCart 3.x, ocStore 3.0.4.1 and PHP 7.4–8.5. To start, enable the module, set a type on a test link and check the rel in the code of the saved page."
      ]),
    ]),
  cover=dict(
    tagline="Правильные rel-атрибуты прямо в редакторе",
    items=["Follow", "Nofollow", "Sponsored", "UGC", "Партнёрские ссылки", "Новости UniShop2"],
    cards=[
      ("Тип ссылки в Summernote", "выбор прямо в диалоге редактора"),
      ("Партнёрская ссылка", "по умолчанию выводится как Sponsored"),
      ("Платные ссылки", "метка Sponsored для рекламы и партнёрок"),
      ("UGC и Nofollow", "для пользовательского контента и источников"),
      ("Новости UniShop2", "работает в новостях и их категориях"),
      ("Три языка админки", "en-gb, ru-ru и uk-ua"),
    ],
    tabs=["Типы", "Правила", "Редактор", "О модуле"],
    kpis=[("Ссылок", "312"), ("Sponsored", "47"), ("Nofollow", "88")],
  ),
)

P[114] = dict(
  ru=dict(
    intro=[
      "Файл от поставщика приходит в пятницу вечером, в нём десять тысяч позиций, и вопрос всегда один: что будет с магазином после загрузки. ImportXML Clean PRO построен вокруг ответа на него до записи в базу. Вы загружаете файл, выбираете профиль и язык и запускаете предпросмотр, который ничего не пишет, а только показывает последствия.",
      "Модуль принимает XML и YML, CSV и TXT, а также XLSX и работает в OpenCart и ocStore 3.x. Основной сценарий это безопасный ручной импорт; автоматические обновления по расписанию появляются позже, когда профиль уже проверен руками."
    ],
    sections=[
      dict(h="👀 Предпросмотр без записи", p=[
        "Отчёт предпросмотра разбивает файл на группы: товары, которые будут обновлены, новые, не найденные в магазине и пропавшие у поставщика. Для обновляемых позиций рядом стоят старые и новые значения цены, остатка, статуса, закупочной и акционной цены, так что аномалию вроде цены в сто раз ниже обычной видно до применения.",
        "Только изучив отчёт, вы нажимаете применение. До этого момента база не меняется."
      ]),
      dict(h="🗃️ Что умеет читать и записывать", p=[
        "Из файла можно получить стандартные поля карточки: model, SKU, UPC, EAN, JAN, ISBN, MPN, остаток, цену, вес, размеры, статус и SEO-поля. Если в файле есть категории, изображения, производители и атрибуты, модуль импортирует и обновляет и их.",
        "Поддерживаются несколько языков, а цены пересчитываются через штатные валюты OpenCart. Главная категория определяется безопасным способом, а Google Product Category ID сохраняется, когда такое поле есть в файле."
      ]),
      dict(h="🧾 Профили поставщиков", p=[
        "Структура у каждого поставщика своя, поэтому настройки сохраняются в профиль: какое поле файла чему соответствует в магазине. Профиль создаётся и проверяется один раз, а затем используется при каждой загрузке от этого поставщика."
      ]),
      dict(h="⏰ Cron как следующий шаг", p=[
        "Когда ручной импорт доказал, что профиль настроен верно, можно подключить cron. Он нужен как дополнительный механизм для плановых обновлений цен, остатков и статусов, а не как замена проверенной ручной загрузке.",
        "Такой порядок защищает от ситуации, когда непроверенный профиль по расписанию портит каталог каждую ночь."
      ]),
      dict(h="🛡️ Как начать безопасно", p=[
        "Модуль включается вручную. Сделайте резервную копию, создайте профиль, прогоните предпросмотр на небольшом тестовом файле, и только затем применяйте импорт ко всему каталогу. Название модуля содержит слово Clean не случайно: цель в том, чтобы поставщик менял цены и остатки, а не засорял базу."
      ]),
    ]),
  uk=dict(
    intro=[
      "Файл від постачальника приходить у п'ятницю ввечері, у ньому десять тисяч позицій, і питання завжди одне: що буде з магазином після завантаження. ImportXML Clean PRO побудований навколо відповіді на нього ще до запису в базу. Ви завантажуєте файл, обираєте профіль і мову та запускаєте попередній перегляд, який нічого не пише, а лише показує наслідки.",
      "Модуль приймає XML та YML, CSV і TXT, а також XLSX і працює в OpenCart та ocStore 3.x. Основний сценарій це безпечний ручний імпорт; автоматичні оновлення за розкладом з'являються пізніше, коли профіль уже перевірено руками."
    ],
    sections=[
      dict(h="👀 Перегляд без запису", p=[
        "Звіт попереднього перегляду розбиває файл на групи: товари, які буде оновлено, нові, не знайдені в магазині та зниклі в постачальника. Для позицій, що оновлюються, поруч стоять старі й нові значення ціни, залишку, статусу, закупівельної й акційної ціни, тож аномалію на кшталт ціни в сто разів нижчої за звичайну видно до застосування.",
        "Лише вивчивши звіт, ви натискаєте застосування. До цього моменту база не змінюється."
      ]),
      dict(h="🗃️ Що вміє читати й записувати", p=[
        "З файлу можна отримати стандартні поля картки: model, SKU, UPC, EAN, JAN, ISBN, MPN, залишок, ціну, вагу, розміри, статус і SEO-поля. Якщо у файлі є категорії, зображення, виробники й атрибути, модуль імпортує та оновлює і їх.",
        "Підтримуються кілька мов, а ціни перераховуються через штатні валюти OpenCart. Головна категорія визначається безпечним способом, а Google Product Category ID зберігається, коли таке поле є у файлі."
      ]),
      dict(h="🧾 Профілі постачальників", p=[
        "Структура в кожного постачальника своя, тому налаштування зберігаються в профіль: яке поле файлу чому відповідає в магазині. Профіль створюється й перевіряється один раз, а потім використовується під час кожного завантаження від цього постачальника."
      ]),
      dict(h="⏰ Cron як наступний крок", p=[
        "Коли ручний імпорт довів, що профіль налаштовано правильно, можна підключити cron. Він потрібен як додатковий механізм для планових оновлень цін, залишків і статусів, а не як заміна перевіреному ручному завантаженню.",
        "Такий порядок захищає від ситуації, коли неперевірений профіль за розкладом псує каталог щоночі."
      ]),
      dict(h="🛡️ Як почати безпечно", p=[
        "Модуль вмикається вручну. Зробіть резервну копію, створіть профіль, проженіть попередній перегляд на невеликому тестовому файлі, і лише потім застосовуйте імпорт до всього каталогу. Слово Clean у назві модуля невипадкове: мета в тому, щоб постачальник змінював ціни й залишки, а не засмічував базу."
      ]),
    ]),
  en=dict(
    intro=[
      "A supplier file arrives on Friday evening with ten thousand rows, and the question is always the same: what will happen to the store once it is loaded. ImportXML Clean PRO is built around answering that before anything is written to the database. You upload the file, choose a profile and a language and run a preview, which writes nothing and simply shows the consequences.",
      "The module accepts XML and YML, CSV and TXT, and XLSX, and works in OpenCart and ocStore 3.x. The main scenario is a safe manual import; scheduled updates come later, once the profile has been proven by hand."
    ],
    sections=[
      dict(h="👀 A preview that writes nothing", p=[
        "The preview report splits the file into groups: products to be updated, new ones, ones not found in the store and ones that disappeared from the supplier. For items being updated, the old and new values of price, stock, status, purchase price and special price stand side by side, so an anomaly such as a price a hundred times lower than usual is visible before anything is applied.",
        "Only after studying the report do you press apply. Until then the database does not change."
      ]),
      dict(h="🗃️ What it can read and write", p=[
        "From the file it can take the standard product fields: model, SKU, UPC, EAN, JAN, ISBN, MPN, stock, price, weight, dimensions, status and SEO fields. If the file contains categories, images, manufacturers and attributes, the module imports and updates those too.",
        "Several languages are supported, and prices are converted through the standard OpenCart currencies. The main category is determined in a safe way, and the Google Product Category ID is kept when the file has such a field."
      ]),
      dict(h="🧾 Supplier profiles", p=[
        "Every supplier structures its file differently, so the settings are saved in a profile: which field of the file maps to what in the store. A profile is created and verified once and then used for every upload from that supplier."
      ]),
      dict(h="⏰ Cron as the next step", p=[
        "Once manual imports have shown that a profile is set up correctly, cron can be connected. It serves as an additional mechanism for scheduled updates of prices, stock and statuses, not as a replacement for a proven manual upload.",
        "That order protects you from an unchecked profile spoiling the catalogue every night on a schedule."
      ]),
      dict(h="🛡️ How to start safely", p=[
        "The module is enabled manually. Take a backup, create a profile, run the preview on a small test file and only then apply the import to the whole catalogue. The word Clean in the name is no accident: the aim is for the supplier to change prices and stock, not to clutter your database."
      ]),
    ]),
  cover=dict(
    tagline="Импорт каталога поставщика с предпросмотром",
    items=["XML и YML", "CSV, TXT, XLSX", "Предпросмотр", "Профили поставщиков", "Категории и атрибуты", "Cron-обновления"],
    cards=[
      ("Предпросмотр", "отчёт до записи: что обновится и что исчезло"),
      ("Старое и новое", "цена, остаток, статус и закупочная рядом"),
      ("Форматы файлов", "XML, YML, CSV, TXT и XLSX"),
      ("Профили", "соответствие полей файла и магазина"),
      ("Валюты и языки", "пересчёт через валюты OpenCart"),
      ("Cron после проверки", "плановые цены, остатки и статусы"),
    ],
    tabs=["Профили", "Импорт", "Предпросмотр", "Cron"],
    kpis=[("Строк в файле", "10 240"), ("К обновлению", "9 815"), ("Новых", "312")],
  ),
)

P[115] = dict(
  ru=dict(
    intro=[
      "Покупатель получил заказ, остался доволен и закрыл вкладку. Через неделю другой человек ищет ваш магазин на Google Картах и видит мало отзывов. Google Maps Reviews PRO нужен для того, чтобы довольные клиенты чаще оставляли отзыв в Google Maps и Google Business Profile, пока они помнят о покупке.",
      "Важная оговорка: сам отзыв пишет только клиент и только в Google. Модуль его не создаёт и ничего не подделывает, а лишь вовремя и вежливо просит и открывает форму отзыва. Для работы не нужна авторизация Google OAuth, достаточно ссылки на отзыв из профиля компании или Place ID."
    ],
    sections=[
      dict(h="🎯 Где модуль просит отзыв", p=[
        "Самое естественное место это страница успешного заказа: блок с просьбой оставить отзыв, при желании с автоматическим переходом на форму Google через заданную задержку. Такой же блок можно показать на странице контактов, а при необходимости добавить плавающую кнопку.",
        "Дизайн блока выбирается из нескольких готовых вариантов, чтобы он выглядел частью вашей темы."
      ]),
      dict(h="✉️ Письма с просьбой", p=[
        "Часто клиенту удобнее вернуться к отзыву спустя несколько дней. Модуль отправляет отложенные письма по cron после выбранных статусов заказа, а менеджер при желании запускает письмо вручную со страницы заказа. Технические и тестовые адреса можно исключить, чтобы просьбы не уходили на служебную почту.",
        "Шаблонов писем несколько: универсальный, короткий, премиум, маршрут, розница, агро и техника, сервисная компания. Выбирайте тон под ваш бизнес."
      ]),
      dict(h="📊 Что видно в статистике", p=[
        "Модуль считает клики по ссылке на отзыв и на Google Maps, а также отправленные, пропущенные письма и ошибки. Это помогает понять, читают ли клиенты просьбу и не застряла ли рассылка. Есть диагностика, а настройки можно экспортировать и импортировать между магазинами."
      ]),
      dict(h="⚙️ Установка и запуск", p=[
        "Модуль ставится только через OCMOD, без правок ядра, интерфейс доступен на русском, украинском и английском. После установки он выключен. Последовательность такая: укажите ссылку на отзыв или Place ID, выберите дизайн и шаблон письма, включите модуль и настройте cron для писем."
      ]),
      dict(h="🤝 Честная практика", p=[
        "Используйте официальную ссылку на форму отзыва Google и не предлагайте клиентам вознаграждение за оценку: модуль лишь облегчает путь к форме и не влияет на то, что человек напишет."
      ]),
    ]),
  uk=dict(
    intro=[
      "Покупець отримав замовлення, лишився задоволений і закрив вкладку. Через тиждень інша людина шукає ваш магазин на Google Картах і бачить мало відгуків. Google Maps Reviews PRO потрібен для того, щоб задоволені клієнти частіше залишали відгук у Google Maps і Google Business Profile, поки пам'ятають про покупку.",
      "Важливе застереження: сам відгук пише лише клієнт і лише в Google. Модуль його не створює й нічого не підроблює, а лише вчасно й чемно просить та відкриває форму відгуку. Для роботи не потрібна авторизація Google OAuth, достатньо посилання на відгук із профілю компанії або Place ID."
    ],
    sections=[
      dict(h="🎯 Де модуль просить відгук", p=[
        "Найприродніше місце це сторінка успішного замовлення: блок із проханням залишити відгук, за бажання з автоматичним переходом на форму Google через задану затримку. Такий самий блок можна показати на сторінці контактів, а за потреби додати плаваючу кнопку.",
        "Дизайн блока обирається з кількох готових варіантів, щоб він виглядав частиною вашої теми."
      ]),
      dict(h="✉️ Листи з проханням", p=[
        "Часто клієнту зручніше повернутися до відгуку за кілька днів. Модуль надсилає відкладені листи за cron після обраних статусів замовлення, а менеджер за бажання запускає лист вручну зі сторінки замовлення. Технічні й тестові адреси можна виключити, щоб прохання не йшли на службову пошту.",
        "Шаблонів листів кілька: універсальний, короткий, преміум, маршрут, роздріб, агро й техніка, сервісна компанія. Обирайте тон під ваш бізнес."
      ]),
      dict(h="📊 Що видно в статистиці", p=[
        "Модуль рахує кліки за посиланням на відгук і на Google Maps, а також надіслані, пропущені листи та помилки. Це допомагає зрозуміти, чи читають клієнти прохання і чи не застрягла розсилка. Є діагностика, а налаштування можна експортувати й імпортувати між магазинами."
      ]),
      dict(h="⚙️ Встановлення та запуск", p=[
        "Модуль ставиться лише через OCMOD, без правок ядра, інтерфейс доступний російською, українською та англійською. Після встановлення він вимкнений. Послідовність така: вкажіть посилання на відгук або Place ID, оберіть дизайн і шаблон листа, увімкніть модуль і налаштуйте cron для листів."
      ]),
      dict(h="🤝 Чесна практика", p=[
        "Використовуйте офіційне посилання на форму відгуку Google і не пропонуйте клієнтам винагороду за оцінку: модуль лише полегшує шлях до форми й не впливає на те, що людина напише."
      ]),
    ]),
  en=dict(
    intro=[
      "A customer receives an order, is happy and closes the tab. A week later someone else looks for your store on Google Maps and sees only a few reviews. Google Maps Reviews PRO exists so that satisfied customers leave a review on Google Maps and Google Business Profile more often, while they still remember the purchase.",
      "An important caveat: the review itself is written only by the customer and only on Google. The module does not create it or fake anything; it asks at the right time, politely, and opens the review form. No Google OAuth authorisation is needed, a review link from the business profile or a Place ID is enough."
    ],
    sections=[
      dict(h="🎯 Where the module asks for a review", p=[
        "The most natural spot is the order success page: a block asking for a review, optionally with an automatic redirect to the Google form after a delay you set. The same block can be shown on the contact page, and a floating button can be added if you want one.",
        "The block design is chosen from several ready variants so it looks like part of your theme."
      ]),
      dict(h="✉️ Request emails", p=[
        "Customers often find it easier to return to a review a few days later. The module sends delayed emails via cron after the order statuses you choose, and a manager can send one manually from the order page. Technical and test addresses can be excluded so requests do not go to internal mailboxes.",
        "There are several email templates: universal, short, premium, route, retail, agro and machinery, and service company. Pick the tone that suits your business."
      ]),
      dict(h="📊 What the statistics show", p=[
        "The module counts clicks on the review link and on Google Maps, plus emails sent, skipped and errors. That helps you see whether customers read the request and whether the mailing has stalled. There is a diagnostics tool, and settings can be exported and imported between stores."
      ]),
      dict(h="⚙️ Installation and launch", p=[
        "The module installs through OCMOD only, with no core edits, and the interface is available in Russian, Ukrainian and English. It is off after installation. The sequence is: enter the review link or Place ID, choose a design and an email template, enable the module and set up cron for the emails."
      ]),
      dict(h="🤝 Honest practice", p=[
        "Use the official Google review link and do not offer customers a reward for a rating: the module only makes the path to the form shorter and has no influence on what a person writes."
      ]),
    ]),
  cover=dict(
    tagline="Больше живых отзывов в Google Картах",
    items=["Блок после заказа", "Письма по cron", "Ручная отправка", "Статистика кликов", "Шаблоны писем", "Без Google OAuth"],
    cards=[
      ("Страница успеха", "просьба об отзыве сразу после заказа"),
      ("Автопереход", "форма отзыва Google с настраиваемой задержкой"),
      ("Отложенные письма", "по cron после выбранных статусов заказа"),
      ("Исключения адресов", "технические и тестовые почты не получают письма"),
      ("Учёт кликов", "по отзыву, по Maps, письма и ошибки"),
      ("Дизайны и шаблоны", "несколько вариантов блока и письма"),
    ],
    tabs=["Основные", "Блоки", "Письма", "Статистика"],
    kpis=[("Кликов", "184"), ("Писем", "96"), ("Ошибок", "2")],
  ),
)

P[116] = dict(
  ru=dict(
    intro=[
      "Фраза «добавьте ещё товаров на 340 грн, и доставка будет бесплатной» работает потому, что покупатель видит конкретную цифру, а не абстрактный порог. Free Shipping Progress PRO выводит такую подсказку в корзине и на оформлении заказа: сколько осталось добавить, достигнут ли порог, нужно ли подтвердить регион доставки.",
      "Модуль ничего не придумывает сам. Источником правды служит штатное расширение OpenCart «Бесплатная доставка»: модуль читает его статус, порог и геозону и не создаёт собственных способов доставки. Поэтому подсказка и реальная цена на оформлении никогда не расходятся."
    ],
    sections=[
      dict(h="🔗 Опора на штатную доставку", p=[
        "Вы настраиваете бесплатную доставку там же, где и раньше, в стандартном расширении OpenCart, а модуль только визуализирует результат. Платные способы вроде Новой Почты, курьера или международной доставки остаются без изменений, и модуль не делает их бесплатными.",
        "Если вы поменяете порог в расширении, подсказка подхватит новое значение без повторной настройки."
      ]),
      dict(h="🌍 Геозона и регион", p=[
        "Бесплатная доставка в OpenCart привязана к геозоне, например только по стране. Модуль это учитывает: внутри геозоны подсказка работает как обычно, а для адресов за её пределами не обещает бесплатной доставки. Если регион ещё не определён, покупателю предлагают подтвердить его."
      ]),
      dict(h="🎨 Стили и места показа", p=[
        "Прогресс-блок доступен в пяти стилях: Accent, Clean, Minimal, Compact и Banner. Настраиваются цвета, полоса прогресса, процент, иконка, тёмная тема и адаптивность. Позиции для корзины и оформления заказа задаются отдельно, а мини-корзина по умолчанию выключена. Блок работает в стандартной теме и в UniShop2.",
        "Живой предпросмотр в админке показывает результат сразу, без открытия витрины."
      ]),
      dict(h="✏️ Тексты с переменными", p=[
        "Сообщения пишутся на каждом языке отдельно, а подстановки вставляются кнопками: порог, сколько осталось, сумма и процент заполнения. Пример: «Добавьте ещё на {remaining} — доставка бесплатно». Когда порог достигнут, покупатель видит поздравление, а не цифру."
      ]),
      dict(h="🪶 Лёгкий по устройству", p=[
        "После изменения корзины блок обновляется через AJAX, поэтому страницу не нужно перезагружать. Модуль не использует cron, очереди и рабочие таблицы и не создаёт растущих журналов, так что за ним не нужно ничего обслуживать. Включите его после проверки настроек штатной бесплатной доставки и посмотрите корзину на тестовом заказе."
      ]),
    ]),
  uk=dict(
    intro=[
      "Фраза «додайте ще товарів на 340 грн, і доставка буде безкоштовною» працює тому, що покупець бачить конкретну цифру, а не абстрактний поріг. Free Shipping Progress PRO виводить таку підказку в кошику та на оформленні замовлення: скільки залишилося додати, чи досягнуто поріг, чи потрібно підтвердити регіон доставки.",
      "Модуль нічого не вигадує сам. Джерелом істини слугує штатне розширення OpenCart «Безкоштовна доставка»: модуль читає його статус, поріг і геозону й не створює власних способів доставки. Тому підказка та реальна ціна на оформленні ніколи не розходяться."
    ],
    sections=[
      dict(h="🔗 Опора на штатну доставку", p=[
        "Ви налаштовуєте безкоштовну доставку там само, де й раніше, у стандартному розширенні OpenCart, а модуль лише візуалізує результат. Платні способи на кшталт Нової Пошти, кур'єра чи міжнародної доставки лишаються без змін, і модуль не робить їх безкоштовними.",
        "Якщо ви зміните поріг у розширенні, підказка підхопить нове значення без повторного налаштування."
      ]),
      dict(h="🌍 Геозона та регіон", p=[
        "Безкоштовна доставка в OpenCart прив'язана до геозони, наприклад лише по країні. Модуль це враховує: усередині геозони підказка працює як зазвичай, а для адрес поза її межами не обіцяє безкоштовної доставки. Якщо регіон ще не визначено, покупцеві пропонують його підтвердити."
      ]),
      dict(h="🎨 Стилі та місця показу", p=[
        "Прогрес-блок доступний у п'яти стилях: Accent, Clean, Minimal, Compact і Banner. Налаштовуються кольори, смуга прогресу, відсоток, іконка, темна тема й адаптивність. Позиції для кошика та оформлення замовлення задаються окремо, а міні-кошик за замовчуванням вимкнений. Блок працює у стандартній темі та в UniShop2.",
        "Живий попередній перегляд в адмінці показує результат одразу, без відкриття вітрини."
      ]),
      dict(h="✏️ Тексти зі змінними", p=[
        "Повідомлення пишуться кожною мовою окремо, а підстановки вставляються кнопками: поріг, скільки залишилося, сума й відсоток заповнення. Приклад: «Додайте ще на {remaining} — доставка безкоштовна». Коли поріг досягнуто, покупець бачить привітання, а не цифру."
      ]),
      dict(h="🪶 Легкий за будовою", p=[
        "Після зміни кошика блок оновлюється через AJAX, тож сторінку не потрібно перезавантажувати. Модуль не використовує cron, черги та робочі таблиці й не створює журналів, що ростуть, тож за ним не потрібно нічого обслуговувати. Увімкніть його після перевірки налаштувань штатної безкоштовної доставки й подивіться кошик на тестовому замовленні."
      ]),
    ]),
  en=dict(
    intro=[
      "The line add 340 UAH more and delivery is free works because the customer sees a concrete figure rather than an abstract threshold. Free Shipping Progress PRO prints such a hint in the cart and at checkout: how much is left to add, whether the threshold has been reached, and whether the delivery region needs confirming.",
      "The module invents nothing on its own. The source of truth is the standard OpenCart Free Shipping extension: the module reads its status, threshold and geo zone and creates no shipping methods of its own. So the hint and the real price at checkout never drift apart."
    ],
    sections=[
      dict(h="🔗 Built on the standard shipping extension", p=[
        "You configure free shipping where you always did, in the standard OpenCart extension, and the module only visualises the result. Paid methods such as Nova Poshta, courier or international delivery stay unchanged, and the module does not make them free.",
        "If you change the threshold in the extension, the hint picks up the new value without any reconfiguration."
      ]),
      dict(h="🌍 Geo zone and region", p=[
        "Free shipping in OpenCart is tied to a geo zone, for example the home country only. The module respects that: inside the zone the hint works as usual, while for addresses outside it no free delivery is promised. If the region is not yet known, the customer is asked to confirm it."
      ]),
      dict(h="🎨 Styles and placement", p=[
        "The progress block comes in five styles: Accent, Clean, Minimal, Compact and Banner. Colours, the progress bar, percentage, icon, dark theme and responsiveness are all adjustable. Positions for the cart and for checkout are set separately, and the mini-cart is off by default. The block works in the standard theme and in UniShop2.",
        "A live preview in the admin shows the result immediately, without opening the storefront."
      ]),
      dict(h="✏️ Texts with variables", p=[
        "Messages are written separately for each language, and placeholders are inserted with buttons: threshold, amount remaining, amount and percentage filled. Example: Add {remaining} more and delivery is free. When the threshold is reached, the customer sees a congratulation instead of a figure."
      ]),
      dict(h="🪶 Light by design", p=[
        "After the cart changes, the block refreshes via AJAX, so the page does not need to reload. The module uses no cron, no queues and no working tables and creates no growing logs, so there is nothing to maintain. Enable it after checking the settings of the standard free shipping extension and look at the cart on a test order."
      ]),
    ]),
  cover=dict(
    tagline="Подсказка до бесплатной доставки в корзине",
    items=["Прогресс-бар", "Остаток до порога", "Пять стилей", "Живой предпросмотр", "Корзина и checkout", "UniShop2"],
    cards=[
      ("Штатный источник", "порог и геозона берутся из Free Shipping"),
      ("Платная доставка", "Новая Почта и курьер остаются прежними"),
      ("Пять стилей", "Accent, Clean, Minimal, Compact, Banner"),
      ("Тексты с переменными", "порог, остаток, сумма и процент"),
      ("AJAX-обновление", "блок меняется вместе с корзиной"),
      ("Без обслуживания", "нет cron, очередей и растущих журналов"),
    ],
    tabs=["Основные", "Стиль", "Тексты", "Позиции"],
    kpis=[("Порог", "1 500 грн"), ("Осталось", "340 грн"), ("Заполнено", "77%")],
  ),
)

P[117] = dict(
  ru=dict(
    intro=[
      "Посетитель из Харькова открывает магазин, и первое, что он видит при оформлении заказа, это пустое поле «Город». GeoIP City PRO угадывает город по IP-адресу и предлагает его мягко, как подсказку, а не навязывает. Если угадал, человек экономит несколько секунд, если ошибся, просто исправляет.",
      "Главная особенность модуля в том, что он ничего не отправляет наружу. Определение идёт по локальной MMDB-базе DB-IP или MaxMind, лежащей на вашем сервере, а внешний GeoIP API на витрине не вызывается. Данные посетителей не уходят сторонним сервисам, и работа сайта не зависит от чужого API."
    ],
    sections=[
      dict(h="📍 Мягкая подсказка города", p=[
        "Определив примерный город, модуль показывает посетителю подсказку, которую можно принять или проигнорировать. Это не принудительное переключение региона, поэтому ошибка геобазы не ломает покупку.",
        "Подсказка активируется только после того, как вы включили модуль и сохранили настройки: до этого витрина остаётся без изменений."
      ]),
      dict(h="✍️ Автозаполнение в checkout", p=[
        "Определённый город может подставляться в поле при оформлении заказа. Для магазина с доставкой это сокращает путь до покупки и уменьшает число опечаток, особенно на телефоне, где набирать текст неудобно."
      ]),
      dict(h="🚧 Ограничение по стране и IP", p=[
        "Та же база позволяет безопасно ограничивать доступ по стране или по IP-адресам. Это полезно, если магазин работает только в одной стране или вы хотите закрыть доступ с адресов, с которых приходит нежелательный трафик.",
        "Как и всё остальное, ограничения включаются отдельно, и стоит проверить их на себе, прежде чем применять ко всем посетителям."
      ]),
      dict(h="🗺️ Про точность и базы данных", p=[
        "Определение города по IP приблизительное: провайдер может числиться в другом городе, мобильный интернет нередко выдаёт соседний регион. Поэтому подсказка и сделана подсказкой, а не решением за покупателя.",
        "Базу MMDB вы загружаете сами, выбирая DB-IP или MaxMind. Обновляйте её по условиям лицензии поставщика базы."
      ]),
      dict(h="🔧 Подготовка к запуску", p=[
        "Порядок простой: загрузите MMDB-базу, включите нужные функции (подсказка, автозаполнение, ограничения), проверьте определение города на нескольких адресах и сохраните настройки. Модуль совместим с CodeCart 3.0.5.2, ocStore 3.0.4.1, OpenCart 3.x и PHP 7.4–8.5."
      ]),
    ]),
  uk=dict(
    intro=[
      "Відвідувач із Харкова відкриває магазин, і перше, що він бачить під час оформлення замовлення, це порожнє поле «Місто». GeoIP City PRO вгадує місто за IP-адресою й пропонує його м'яко, як підказку, а не нав'язує. Якщо вгадав, людина заощаджує кілька секунд, якщо помилився, просто виправляє.",
      "Головна особливість модуля в тому, що він нічого не надсилає назовні. Визначення йде за локальною MMDB-базою DB-IP або MaxMind, що лежить на вашому сервері, а зовнішній GeoIP API на вітрині не викликається. Дані відвідувачів не йдуть стороннім сервісам, і робота сайту не залежить від чужого API."
    ],
    sections=[
      dict(h="📍 М'яка підказка міста", p=[
        "Визначивши приблизне місто, модуль показує відвідувачу підказку, яку можна прийняти або проігнорувати. Це не примусове перемикання регіону, тому помилка геобази не ламає покупку.",
        "Підказка активується лише після того, як ви ввімкнули модуль і зберегли налаштування: до цього вітрина лишається без змін."
      ]),
      dict(h="✍️ Автозаповнення в checkout", p=[
        "Визначене місто може підставлятися в поле під час оформлення замовлення. Для магазину з доставкою це скорочує шлях до покупки й зменшує кількість помилок у написанні, особливо на телефоні, де набирати текст незручно."
      ]),
      dict(h="🚧 Обмеження за країною та IP", p=[
        "Та сама база дає змогу безпечно обмежувати доступ за країною чи за IP-адресами. Це корисно, якщо магазин працює лише в одній країні або ви хочете закрити доступ з адрес, з яких приходить небажаний трафік.",
        "Як і все інше, обмеження вмикаються окремо, і варто перевірити їх на собі, перш ніж застосовувати до всіх відвідувачів."
      ]),
      dict(h="🗺️ Про точність і бази даних", p=[
        "Визначення міста за IP приблизне: провайдер може значитися в іншому місті, мобільний інтернет нерідко видає сусідній регіон. Тому підказку й зроблено підказкою, а не рішенням за покупця.",
        "Базу MMDB ви завантажуєте самі, обираючи DB-IP або MaxMind. Оновлюйте її за умовами ліцензії постачальника бази."
      ]),
      dict(h="🔧 Підготовка до запуску", p=[
        "Порядок простий: завантажте MMDB-базу, увімкніть потрібні функції (підказка, автозаповнення, обмеження), перевірте визначення міста на кількох адресах і збережіть налаштування. Модуль сумісний із CodeCart 3.0.5.2, ocStore 3.0.4.1, OpenCart 3.x та PHP 7.4–8.5."
      ]),
    ]),
  en=dict(
    intro=[
      "A visitor from Kharkiv opens the store, and the first thing they meet at checkout is an empty City field. GeoIP City PRO guesses the city from the IP address and offers it gently, as a suggestion rather than an imposition. If it guessed right, the person saves a few seconds; if it was wrong, they simply correct it.",
      "The key feature of the module is that it sends nothing outside. Detection uses a local MMDB database from DB-IP or MaxMind stored on your own server, and no external GeoIP API is called on the storefront. Visitor data does not go to third-party services, and the site does not depend on someone else's API."
    ],
    sections=[
      dict(h="📍 A gentle city suggestion", p=[
        "Having worked out an approximate city, the module shows the visitor a suggestion that can be accepted or ignored. It is not a forced region switch, so a geo database error does not break a purchase.",
        "The suggestion becomes active only after you have enabled the module and saved the settings: until then the storefront stays unchanged."
      ]),
      dict(h="✍️ Autofill at checkout", p=[
        "The detected city can be filled into the field during checkout. For a store that delivers, this shortens the path to purchase and reduces typos, especially on a phone where typing is awkward."
      ]),
      dict(h="🚧 Restricting by country and IP", p=[
        "The same database makes it possible to restrict access by country or by IP address safely. This helps if the store serves one country only, or if you want to close access from addresses that send unwanted traffic.",
        "Like everything else, restrictions are switched on separately, and it is worth testing them on yourself before applying them to every visitor."
      ]),
      dict(h="🗺️ On accuracy and databases", p=[
        "City detection by IP is approximate: a provider may be registered in another city, and mobile internet often reports a neighbouring region. That is why the feature is a suggestion and not a decision made for the customer.",
        "You upload the MMDB database yourself, choosing DB-IP or MaxMind. Update it according to the licence terms of the database provider."
      ]),
      dict(h="🔧 Getting ready to launch", p=[
        "The order is simple: upload the MMDB database, enable the functions you want (suggestion, autofill, restrictions), check city detection on a few addresses and save the settings. The module is compatible with CodeCart 3.0.5.2, ocStore 3.0.4.1, OpenCart 3.x and PHP 7.4–8.5."
      ]),
    ]),
  cover=dict(
    tagline="Город посетителя без внешних сервисов",
    items=["Локальная MMDB-база", "Подсказка города", "Автозаполнение", "Ограничение по стране", "Ограничение по IP", "DB-IP и MaxMind"],
    cards=[
      ("Без внешнего API", "витрина не обращается к сторонним GeoIP"),
      ("Мягкая подсказка", "город предлагается, а не навязывается"),
      ("Автозаполнение", "город подставляется в форму checkout"),
      ("Страна и IP", "безопасное ограничение доступа"),
      ("Две базы", "DB-IP или MaxMind, загружаются вручную"),
      ("Включается вручную", "витрина не меняется до сохранения"),
    ],
    tabs=["Основные", "База MMDB", "Ограничения", "Проверка"],
    kpis=[("Определено", "92%"), ("Подсказок", "1 480"), ("Блокировок", "35")],
  ),
)

P[119] = dict(
  ru=dict(
    intro=[
      "У каждого рекламного сервиса свой формат товарного фида, свои требования к полям и свои причины отклонить товар. Google Merchant хочет RSS 2.0, Meta свой вариант, маркетплейсы и прайс-агрегаторы чаще используют YML, а бухгалтерии нужен CSV. Feed Export PRO собирает всё это в одном модуле на базе профилей.",
      "Профиль это набор настроек для одной связки: формат, язык, валюта, страна, фильтры товаров, защищённая ссылка и cron-ссылка. Для украинского магазина с рекламой в Google в гривне и польского фида в злотых вы заводите два профиля и не переключаете настройки руками."
    ],
    sections=[
      dict(h="📑 Форматы и профили", p=[
        "Поддерживаются Google Merchant RSS 2.0, Meta (Facebook), YML, CSV и XML. Каждый профиль привязан к своему языку, валюте и стране, поэтому разные рекламные системы получают те цены и тексты, которые им нужны.",
        "У профиля есть защищённая ссылка для вставки в Merchant Center или рекламный кабинет и отдельная cron-ссылка для обновления."
      ]),
      dict(h="🎚️ Какие товары попадут в фид", p=[
        "Фильтры работают по статусу, наличию, цене, категориям и производителям: выгружать можно только то, что вы действительно хотите рекламировать. Налоги, валюта, обычная и акционная цена считаются штатными механизмами OpenCart, поэтому цена в фиде совпадает с ценой на витрине."
      ]),
      dict(h="🖼️ Изображения", p=[
        "В фид идёт главное изображение и до десяти уникальных дополнительных. Источник можно выбрать: оригинал, кеш фида, готовые файлы, resize OpenCart или файлы модуля AVIF WebP Image PRO.",
        "Для Google Merchant AVIF автоматически заменяется на WebP, потому что Google принимает WebP, но не принимает AVIF."
      ]),
      dict(h="🏷️ Категории Google и проверка GTIN", p=[
        "Google Product Category подбирается по приоритету: ручная карта, поле категории, таблица googleshopping_category, значение по умолчанию, а при отсутствии значения категория наследует его от родителя.",
        "Код GTIN проверяется по длине, контрольной цифре и диапазонам GS1. Недействительный GTIN в фид не передаётся, а если нет ни GTIN, ни пары brand и MPN, выставляется identifier_exists=no. Это снижает риск отклонения товаров из-за неверных идентификаторов."
      ]),
      dict(h="🚀 Первый фид", p=[
        "Создайте профиль, укажите формат, язык, валюту и страну, настройте фильтры и источник изображений, затем скопируйте защищённую ссылку в сервис. Прежде чем запускать рекламу, проверьте фид в самом Merchant Center или в кабинете Meta: именно они покажут, как внешняя система читает ваши данные."
      ]),
    ]),
  uk=dict(
    intro=[
      "Кожен рекламний сервіс має свій формат товарного фіду, свої вимоги до полів і свої причини відхилити товар. Google Merchant хоче RSS 2.0, Meta свій варіант, маркетплейси та прайс-агрегатори частіше використовують YML, а бухгалтерії потрібен CSV. Feed Export PRO збирає все це в одному модулі на основі профілів.",
      "Профіль це набір налаштувань для однієї зв'язки: формат, мова, валюта, країна, фільтри товарів, захищене посилання та cron-посилання. Для українського магазину з рекламою в Google у гривні й польського фіду в злотих ви заводите два профілі й не перемикаєте налаштування руками."
    ],
    sections=[
      dict(h="📑 Формати та профілі", p=[
        "Підтримуються Google Merchant RSS 2.0, Meta (Facebook), YML, CSV і XML. Кожен профіль прив'язаний до своєї мови, валюти й країни, тому різні рекламні системи отримують ті ціни й тексти, які їм потрібні.",
        "У профілю є захищене посилання для вставлення в Merchant Center чи рекламний кабінет і окреме cron-посилання для оновлення."
      ]),
      dict(h="🎚️ Які товари потраплять у фід", p=[
        "Фільтри працюють за статусом, наявністю, ціною, категоріями та виробниками: вивантажувати можна лише те, що ви справді хочете рекламувати. Податки, валюта, звичайна й акційна ціна рахуються штатними механізмами OpenCart, тому ціна у фіді збігається з ціною на вітрині."
      ]),
      dict(h="🖼️ Зображення", p=[
        "У фід іде головне зображення та до десяти унікальних додаткових. Джерело можна обрати: оригінал, кеш фіду, готові файли, resize OpenCart або файли модуля AVIF WebP Image PRO.",
        "Для Google Merchant AVIF автоматично замінюється на WebP, бо Google приймає WebP, але не приймає AVIF."
      ]),
      dict(h="🏷️ Категорії Google і перевірка GTIN", p=[
        "Google Product Category добирається за пріоритетом: ручна мапа, поле категорії, таблиця googleshopping_category, значення за замовчуванням, а за відсутності значення категорія успадковує його від батьківської.",
        "Код GTIN перевіряється за довжиною, контрольною цифрою та діапазонами GS1. Недійсний GTIN у фід не передається, а якщо немає ні GTIN, ні пари brand і MPN, виставляється identifier_exists=no. Це знижує ризик відхилення товарів через хибні ідентифікатори."
      ]),
      dict(h="🚀 Перший фід", p=[
        "Створіть профіль, вкажіть формат, мову, валюту й країну, налаштуйте фільтри та джерело зображень, потім скопіюйте захищене посилання в сервіс. Перш ніж запускати рекламу, перевірте фід у самому Merchant Center чи в кабінеті Meta: саме вони покажуть, як зовнішня система читає ваші дані."
      ]),
    ]),
  en=dict(
    intro=[
      "Every advertising service has its own product feed format, its own field requirements and its own reasons to reject an item. Google Merchant wants RSS 2.0, Meta has its own variant, marketplaces and price aggregators more often use YML, and accounting needs CSV. Feed Export PRO brings all of that into one profile-based module.",
      "A profile is a set of settings for one pairing: format, language, currency, country, product filters, a protected link and a cron link. For a Ukrainian store advertising on Google in hryvnia and a Polish feed in zloty, you create two profiles and never flip settings by hand."
    ],
    sections=[
      dict(h="📑 Formats and profiles", p=[
        "Supported formats are Google Merchant RSS 2.0, Meta (Facebook), YML, CSV and XML. Each profile is tied to its own language, currency and country, so different ad systems receive the prices and texts they need.",
        "A profile has a protected link to paste into Merchant Center or an ad account, and a separate cron link for refreshing."
      ]),
      dict(h="🎚️ Which products enter the feed", p=[
        "Filters work on status, availability, price, categories and manufacturers: you export only what you genuinely want to advertise. Taxes, currency, and regular and special prices are calculated by the standard OpenCart mechanisms, so the price in the feed matches the price on the storefront."
      ]),
      dict(h="🖼️ Images", p=[
        "The feed carries the main image and up to ten unique additional ones. You choose the source: the original, the feed cache, ready-made files, OpenCart resize, or files of the AVIF WebP Image PRO module.",
        "For Google Merchant, AVIF is automatically replaced with WebP, because Google accepts WebP but does not accept AVIF."
      ]),
      dict(h="🏷️ Google categories and GTIN validation", p=[
        "Google Product Category is chosen by priority: a manual map, the category field, the googleshopping_category table, a default value, and when nothing is set the category inherits it from its parent.",
        "A GTIN is checked for length, check digit and GS1 ranges. An invalid GTIN is not sent to the feed, and when there is neither a GTIN nor a brand and MPN pair, identifier_exists=no is set. This lowers the risk of items being rejected for wrong identifiers."
      ]),
      dict(h="🚀 Your first feed", p=[
        "Create a profile, set the format, language, currency and country, configure the filters and image source, then copy the protected link into the service. Before you start advertising, check the feed in Merchant Center or the Meta account itself: they will show how the outside system actually reads your data."
      ]),
    ]),
  cover=dict(
    tagline="Товарные фиды для Google, Meta и маркетплейсов",
    items=["Google Merchant RSS", "Meta и Facebook", "YML для агрегаторов", "CSV и XML", "Профили по странам", "Cron-ссылка"],
    cards=[
      ("Профили фидов", "язык, валюта, страна и формат на профиль"),
      ("Фильтры товаров", "статус, наличие, цена, категории, бренды"),
      ("Изображения", "главное и до 10 дополнительных"),
      ("AVIF в WebP", "для Google Merchant формат подменяется"),
      ("Google Category", "карта, поле категории и наследование"),
      ("Проверка GTIN", "длина, контрольная цифра и диапазоны GS1"),
    ],
    tabs=["Профили", "Фильтры", "Изображения", "Ссылки"],
    kpis=[("Профилей", "5"), ("Товаров в фиде", "2 316"), ("Отклонено GTIN", "14")],
  ),
)

P[120] = dict(
  ru=dict(
    intro=[
      "Два товара с одинаковым названием, одинаковый SEO URL у категории и страницы, десяток карточек с одним и тем же meta title: каждая такая мелочь по отдельности не заметна, но вместе они мешают поиску, фильтрам, фидам и карте сайта. Duplicate Cleaner PRO находит их заранее, до того как они испортят выдачу.",
      "Это технический аудит для ocStore 3.0.4.1 и OpenCart 3.x, и в основе его подхода осторожность. После установки модуль выключен, на витрине не работает и вывод сайта не меняет. Он сначала показывает находки, и только по вашей команде что-то исправляет."
    ],
    sections=[
      dict(h="🧬 Дубли карточек товаров", p=[
        "Модуль ищет возможные полные дубли по сочетанию названия, модели, SKU, производителя и цены, а также отдельно дубли названий, model и SKU. Типичная причина: один и тот же товар загрузили дважды из разных прайсов поставщиков.",
        "Слово «возможные» не случайно: решение, действительно ли это дубль, остаётся за человеком."
      ]),
      dict(h="🔗 SEO URL и мета-данные", p=[
        "Проверяются дубли SEO URL в таблице seo_url и в старой таблице url_alias. Отдельный блок посвящён повторяющимся meta title, meta description и H1 у товаров, категорий, информационных страниц, производителей, статей блога и новостей UniShop.",
        "Дубли мета-данных не ломают сайт, но делают страницы неразличимыми для поиска, и такие списки удобно разбирать перед SEO-работами."
      ]),
      dict(h="🌳 Связи с категориями", p=[
        "Отдельно анализируются повреждённые связи в product_to_category: пустые, битые и повторяющиеся. Находятся и товары без валидной главной категории. Именно такие проблемы приводят к странным хлебным крошкам, пропавшим из листинга товарам и неверным путям в фидах и sitemap.",
        "Также ищутся дубли настроек и категорий."
      ]),
      dict(h="🛡️ Исправления только с подтверждением", p=[
        "Автоматических удалений нет. Чтобы что-то исправить, вы открываете предпросмотр, включаете ручные исправления и подтверждаете действие вводом APPLY. Перед применением изменяемые строки копируются в таблицу резервных копий, поэтому у каждого исправления есть след, по которому его можно проверить."
      ]),
      dict(h="📆 Когда запускать аудит", p=[
        "Хорошие моменты: перед SEO-работами, перед генерацией фидов и sitemap, перед миграцией и после импорта от поставщика. Включите модуль, запустите аудит, изучите находки и откройте предпросмотр. Начинайте с просмотра и резервной копии, а исправления подключайте, когда уверены в списке."
      ]),
    ]),
  uk=dict(
    intro=[
      "Два товари з однаковою назвою, однаковий SEO URL у категорії та сторінки, десяток карток з одним і тим самим meta title: кожна така дрібниця окремо непомітна, але разом вони заважають пошуку, фільтрам, фідам і мапі сайту. Duplicate Cleaner PRO знаходить їх заздалегідь, до того як вони зіпсують видачу.",
      "Це технічний аудит для ocStore 3.0.4.1 та OpenCart 3.x, і в основі його підходу обережність. Після встановлення модуль вимкнений, на вітрині не працює й вивід сайту не змінює. Він спершу показує знахідки, і лише за вашою командою щось виправляє."
    ],
    sections=[
      dict(h="🧬 Дублі карток товарів", p=[
        "Модуль шукає можливі повні дублі за поєднанням назви, моделі, SKU, виробника та ціни, а також окремо дублі назв, model і SKU. Типова причина: один і той самий товар завантажили двічі з різних прайсів постачальників.",
        "Слово «можливі» невипадкове: рішення, чи справді це дубль, лишається за людиною."
      ]),
      dict(h="🔗 SEO URL та метадані", p=[
        "Перевіряються дублі SEO URL у таблиці seo_url і в старій таблиці url_alias. Окремий блок присвячено повторюваним meta title, meta description і H1 у товарів, категорій, інформаційних сторінок, виробників, статей блогу та новин UniShop.",
        "Дублі метаданих не ламають сайт, але роблять сторінки нерозрізненними для пошуку, і такі списки зручно розбирати перед SEO-роботами."
      ]),
      dict(h="🌳 Зв'язки з категоріями", p=[
        "Окремо аналізуються пошкоджені зв'язки в product_to_category: порожні, биті та повторювані. Знаходяться й товари без валідної головної категорії. Саме такі проблеми призводять до дивних хлібних крихт, товарів, що зникли з лістингу, та хибних шляхів у фідах і sitemap.",
        "Також шукаються дублі налаштувань і категорій."
      ]),
      dict(h="🛡️ Виправлення лише з підтвердженням", p=[
        "Автоматичних видалень немає. Щоб щось виправити, ви відкриваєте попередній перегляд, вмикаєте ручні виправлення та підтверджуєте дію введенням APPLY. Перед застосуванням рядки, що змінюються, копіюються в таблицю резервних копій, тому в кожного виправлення є слід, за яким його можна перевірити."
      ]),
      dict(h="📆 Коли запускати аудит", p=[
        "Слушні моменти: перед SEO-роботами, перед генерацією фідів і sitemap, перед міграцією та після імпорту від постачальника. Увімкніть модуль, запустіть аудит, вивчіть знахідки й відкрийте попередній перегляд. Починайте з перегляду та резервної копії, а виправлення підключайте, коли впевнені в списку."
      ]),
    ]),
  en=dict(
    intro=[
      "Two products with the same name, the same SEO URL on a category and a page, a dozen products sharing one meta title: each such trifle is invisible alone, but together they get in the way of search, filters, feeds and the sitemap. Duplicate Cleaner PRO finds them in advance, before they spoil your results.",
      "It is a technical audit for ocStore 3.0.4.1 and OpenCart 3.x, and caution is the basis of its approach. After installation the module is off, does nothing on the storefront and does not change the site output. It shows findings first and fixes something only on your command."
    ],
    sections=[
      dict(h="🧬 Duplicate product records", p=[
        "The module looks for possible full duplicates by the combination of name, model, SKU, manufacturer and price, and separately for duplicate names, models and SKUs. A typical cause is the same product loaded twice from different supplier price lists.",
        "The word possible is deliberate: deciding whether something really is a duplicate stays with a human."
      ]),
      dict(h="🔗 SEO URLs and meta data", p=[
        "It checks duplicate SEO URLs in the seo_url table and in the legacy url_alias table. A separate area covers repeated meta titles, meta descriptions and H1 headings across products, categories, information pages, manufacturers, blog articles and UniShop news.",
        "Duplicate meta data does not break a site, but it makes pages indistinguishable to search engines, and such lists are handy to work through before SEO work."
      ]),
      dict(h="🌳 Category links", p=[
        "Damaged links in product_to_category are analysed separately: empty, broken and repeated ones. Products without a valid main category are found too. Exactly these problems lead to odd breadcrumbs, products vanishing from listings and wrong paths in feeds and the sitemap.",
        "Duplicate settings and categories are searched for as well."
      ]),
      dict(h="🛡️ Fixes only with confirmation", p=[
        "There are no automatic deletions. To fix something, you open the preview, enable manual fixes and confirm the action by typing APPLY. Before applying, the rows that will change are copied into a backup table, so every fix leaves a trail it can be checked against."
      ]),
      dict(h="📆 When to run the audit", p=[
        "Good moments are before SEO work, before generating feeds and the sitemap, before a migration and after a supplier import. Enable the module, run the audit, study the findings and open the preview. Start with viewing and a backup, and switch fixes on once you are sure of the list."
      ]),
    ]),
  cover=dict(
    tagline="Дубли и битые связи каталога на виду",
    items=["Дубли товаров", "Дубли SEO URL", "Дубли meta и H1", "Связи с категориями", "Предпросмотр", "Резервные строки"],
    cards=[
      ("Дубли карточек", "название, модель, SKU, бренд и цена"),
      ("SEO URL", "seo_url и старая таблица url_alias"),
      ("Meta и H1", "товары, категории, статьи и новости"),
      ("Связи категорий", "пустые, битые и повторяющиеся записи"),
      ("APPLY-подтверждение", "исправление только после предпросмотра"),
      ("Резервные копии", "изменяемые строки сохраняются заранее"),
    ],
    tabs=["Аудит", "Находки", "Исправления", "Резервы"],
    kpis=[("Дублей товаров", "23"), ("Дублей SEO URL", "11"), ("Без категории", "7")],
  ),
)
