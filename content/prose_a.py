# -*- coding: utf-8 -*-
P = {}
P[63] = dict(
  ru=dict(
    intro=[
      "Покупатель пишет в чат: «Нужен недорогой чехол на этот телефон, и когда привезут?» Обычный бот ответит шаблоном, а AI Store Assistant PRO сначала сходит в живой каталог вашего магазина, найдёт реальные позиции, проверит наличие и только потом сформулирует ответ. Это многоязычный AI-консультант для витрины OpenCart и ocStore, который понимает вопросы обычным языком.",
      "Главный принцип модуля: факты о товарах берутся только из каталога. Выдуманная позиция не попадёт ни в текст ответа, ни в карточку товара, а ссылки в диалоге ведут на настоящие страницы. Политику магазина консультант тоже знает не по догадке, а по вашей базе знаний.",
    ],
    sections=[
      dict(h="🛍️ Консультант, который смотрит в склад, а не фантазирует", p=[
        "Когда клиент просит подобрать товар, ассистент ищет по живому каталогу, проверяет найденные позиции и показывает карточки с ссылками на реальные страницы. Он умеет сравнивать товары между собой и отвечать на уточняющие вопросы по конкретной позиции.",
        "Если нужной вещи нет в наличии, модуль это определяет и предлагает аналоги, а не обещает того, чего нет на полке. Для вас это означает меньше разочарований на этапе заказа и меньше уточняющих звонков."]),
      dict(h="📚 База знаний и правила вашего магазина", p=[
        "Вопросы про доставку, оплату и возврат решаются не общими фразами, а по тому, что вы сами записали в базу знаний и политики. Ответ консультанта следует вашим правилам, поэтому клиент не получит обещаний, которых магазин не давал.",
        "Отдельно ведётся список вопросов, на которые ассистент ответить не смог. Это удобная подсказка, что стоит добавить в базу знаний."]),
      dict(h="🛒 От вопроса до корзины и заказа", p=[
        "Консультант не ограничивается советами: через проверенные инструменты OpenCart он выполняет действия в корзине, считает доставку и ведёт покупателя по сценарию оформления заказа. Все действия идут штатными средствами магазина, а не обходными путями."]),
      dict(h="🤝 Передача менеджеру и лиды", p=[
        "Бывает, что вопрос лучше решит человек. Тогда диалог передаётся менеджеру вместе с историей переписки, а контакты клиента (имя, телефон, e-mail) сохраняются как лид. Данные можно ввести или поправить прямо в шапке диалога.",
        "Менеджеры могут отвечать через Telegram, а в админке копятся история диалогов и оценки ответов покупателями."]),
      dict(h="🏭 Профили отрасли и правила поведения", p=[
        "Для разных ниш поведение консультанта настраивается: можно выбрать профиль отрасли, заполнить знания и задать правила, как именно он общается и что имеет право обещать. Семантический индекс каталога помогает находить товары по смыслу запроса, а не только по точному совпадению слов."]),
      dict(h="🧪 Проверка перед запуском и контроль после", p=[
        "Центр регрессионных тестов позволяет прогнать контрольные сценарии и убедиться, что ответы остались корректными после изменения настроек. Диагностика готовности показывает, чего ещё не хватает, а cron-мониторинг следит за базой и очередями.",
        "Интерфейс и ответы работают на украинском, русском и английском языках."]),
      dict(h="⚙️ Что понадобится", p=[
        "Нужны PHP-расширения cURL, JSON и mbstring и API-ключ выбранного AI-провайдера. Сначала подключите провайдера и проверьте модель, затем выберите профиль отрасли, заполните знания и правила и только после этого включите виджет. В выключенном состоянии модуль не делает запросов и не выводит виджет."]),
    ]),
  uk=dict(
    intro=[
      "Покупець пише в чат: «Потрібен недорогий чохол на цей телефон, і коли привезуть?» Звичайний бот відповість шаблоном, а AI Store Assistant PRO спершу зазирне в живий каталог вашого магазину, знайде реальні позиції, перевірить наявність і лише потім сформулює відповідь. Це багатомовний AI-консультант для вітрини OpenCart та ocStore, який розуміє запитання звичайною мовою.",
      "Головний принцип модуля: факти про товари беруться тільки з каталогу. Вигадана позиція не потрапить ані в текст відповіді, ані в картку товару, а посилання в діалозі ведуть на справжні сторінки. Політику магазину консультант теж знає не навмання, а з вашої бази знань.",
    ],
    sections=[
      dict(h="🛍️ Консультант, що дивиться на склад, а не фантазує", p=[
        "Коли клієнт просить підібрати товар, асистент шукає в живому каталозі, перевіряє знайдені позиції та показує картки з посиланнями на реальні сторінки. Він уміє порівнювати товари між собою й відповідати на уточнювальні запитання щодо конкретної позиції.",
        "Якщо потрібної речі немає в наявності, модуль це визначає та пропонує аналоги, а не обіцяє того, чого немає на полиці. Для вас це менше розчарувань на етапі замовлення й менше уточнювальних дзвінків."]),
      dict(h="📚 База знань і правила вашого магазину", p=[
        "Питання про доставку, оплату та повернення розв'язуються не загальними фразами, а за тим, що ви самі записали в базі знань і політиках. Відповідь консультанта дотримується ваших правил, тож клієнт не отримає обіцянок, яких магазин не давав.",
        "Окремо ведеться перелік запитань, на які асистент відповісти не зміг. Це зручна підказка, що варто додати до бази знань."]),
      dict(h="🛒 Від запитання до кошика й замовлення", p=[
        "Консультант не обмежується порадами: через перевірені інструменти OpenCart він виконує дії в кошику, рахує доставку та веде покупця за сценарієм оформлення замовлення. Усі дії йдуть штатними засобами магазину, а не обхідними шляхами."]),
      dict(h="🤝 Передача менеджеру та ліди", p=[
        "Буває, що питання краще вирішить людина. Тоді діалог передається менеджеру разом з історією листування, а контакти клієнта (ім'я, телефон, e-mail) зберігаються як лід. Дані можна ввести або виправити просто в шапці діалогу.",
        "Менеджери можуть відповідати через Telegram, а в адмінці накопичуються історія діалогів та оцінки відповідей покупцями."]),
      dict(h="🏭 Профілі галузі та правила поведінки", p=[
        "Для різних ніш поведінку консультанта налаштовують: можна обрати профіль галузі, заповнити знання й задати правила, як саме він спілкується та що має право обіцяти. Семантичний індекс каталогу допомагає знаходити товари за змістом запиту, а не лише за точним збігом слів."]),
      dict(h="🧪 Перевірка перед запуском і контроль після", p=[
        "Центр регресійних тестів дає змогу прогнати контрольні сценарії та переконатися, що відповіді лишилися коректними після зміни налаштувань. Діагностика готовності показує, чого ще бракує, а cron-моніторинг стежить за базою та чергами.",
        "Інтерфейс і відповіді працюють українською, російською та англійською мовами."]),
      dict(h="⚙️ Що знадобиться", p=[
        "Потрібні PHP-розширення cURL, JSON і mbstring та API-ключ обраного AI-провайдера. Спершу підключіть провайдера й перевірте модель, потім оберіть профіль галузі, заповніть знання та правила і лише після цього ввімкніть віджет. У вимкненому стані модуль не робить запитів і не виводить віджет."]),
    ]),
  en=dict(
    intro=[
      "A shopper types into the chat: «I need a cheap case for this phone, and when will it arrive?» An ordinary bot replies with a canned line. AI Store Assistant PRO first goes to your live catalog, finds real items, checks availability and only then words its answer. It is a multilingual AI consultant for OpenCart and ocStore storefronts that understands questions asked in plain language.",
      "The core rule of the module: product facts come only from the catalog. An invented item never reaches the reply text or a product card, and the links in the dialogue point to genuine pages. Store policies are not guessed either; the consultant takes them from your own knowledge base.",
    ],
    sections=[
      dict(h="🛍️ A consultant that checks the shelf instead of improvising", p=[
        "When a customer asks for a recommendation, the assistant searches the live catalog, verifies the items it found and shows cards linking to real pages. It can compare products side by side and answer follow-up questions about a specific item.",
        "If the requested item is out of stock, the module detects it and suggests alternatives instead of promising something that is not on the shelf. For you that means fewer disappointments at checkout and fewer clarifying calls."]),
      dict(h="📚 Your knowledge base, your rules", p=[
        "Questions about shipping, payment and returns are answered not with generic phrases but according to what you have written in the knowledge base and policies. The consultant follows your rules, so a customer will not hear promises the store never made.",
        "A separate list collects the questions the assistant could not answer, which is a handy hint about what to add to the knowledge base next."]),
      dict(h="🛒 From a question to the cart and the order", p=[
        "The consultant does more than advise. Through verified OpenCart tools it performs cart actions, calculates shipping and guides the buyer through the order workflow. Everything goes through the store's own mechanisms rather than workarounds."]),
      dict(h="🤝 Manager hand-off and leads", p=[
        "Sometimes a person will solve the question better. The dialogue is then passed to a manager along with the conversation history, and the customer contact details (name, phone, e-mail) are stored as a lead. They can be entered or corrected right in the dialogue header.",
        "Managers can reply through Telegram, while the admin area accumulates dialogue history and the ratings customers give to answers."]),
      dict(h="🏭 Industry profiles and behavior rules", p=[
        "The consultant can be tuned per niche: pick an industry profile, fill in the knowledge and set rules for how it talks and what it is allowed to promise. A semantic catalog index helps find products by the meaning of a request rather than only by exact word matches."]),
      dict(h="🧪 Testing before launch, control afterwards", p=[
        "The regression test center lets you run reference scenarios and confirm that answers stay correct after settings change. Readiness diagnostics show what is still missing, and cron monitoring keeps an eye on the database and the queues.",
        "The interface and the answers work in Ukrainian, Russian and English."]),
      dict(h="⚙️ What you need", p=[
        "You need the PHP cURL, JSON and mbstring extensions and an API key of the chosen AI provider. First connect the provider and verify the model, then pick an industry profile, fill in knowledge and rules, and only then switch the widget on. While switched off the module makes no requests and shows no widget."]),
    ]),
  cover=dict(
    tagline="Живой AI-консультант для витрины",
    items=["Поиск по каталогу", "Сравнение товаров", "База знаний", "Корзина и доставка", "Лиды и менеджер", "Telegram"],
    cards=[("Только реальные товары", "Факты берутся из живого каталога, без выдумок"),
           ("Аналоги при нехватке", "Недоступный товар заменяется предложением"),
           ("Политики магазина", "Доставка, оплата, возврат по вашим правилам"),
           ("Действия в корзине", "Корзина и расчёт доставки через OpenCart"),
           ("Передача менеджеру", "История диалога и контакты клиента"),
           ("Тесты ответов", "Регрессионный центр и диагностика")],
    tabs=["Диалоги", "Знания", "Лиды", "Тесты"],
    kpis=[("Диалогов", "312"), ("Лидов", "47"), ("Оценка", "4.7")],
  ),
)
P[64] = dict(
  ru=dict(
    intro=[
      "Человек положил товары в корзину, дошёл до оформления и закрыл вкладку. Такое случается каждый день, и без инструмента вы об этом просто не узнаете. Abandoned Cart Pro сохраняет такие незавершённые корзины, показывает их администратору с составом и отправляет клиенту письмо-напоминание.",
      "Если покупатель вернулся по ссылке из письма, корзина восстанавливается, а если он всё-таки оформил заказ, модуль отмечает это в списке. Так вы видите не только потерянные корзины, но и те, которые удалось вернуть.",
    ],
    sections=[
      dict(h="🧺 Что видит администратор", p=[
        "Во вкладке «Брошенные корзины» собран список незавершённых корзин с фильтрами. Любую запись можно открыть и посмотреть состав: какие товары и в каком количестве покупатель оставил.",
        "Корзины, которые закончились покупкой, помечаются отдельно. Благодаря этому понятно, какие напоминания действительно вернули клиента."]),
      dict(h="✉️ Письма, которые пишете вы", p=[
        "Напоминания отправляются по шаблонам, которые вы настраиваете сами. Для каждого языка магазина есть своя версия письма, поэтому украиноязычный клиент получит текст по-украински, а англоязычный на английском.",
        "Перед запуском рассылки шаблон можно проверить тестовой отправкой. В модуле есть шаблон по умолчанию, с которого удобно начать, а расширенные селекторы позволяют точнее выбрать, кому и когда писать."]),
      dict(h="🔗 Возврат в корзину по ссылке", p=[
        "В письмо вставляется ссылка, по которой сохранённая корзина клиента восстанавливается. Покупатель не собирает заказ заново, а продолжает с того места, где остановился, и это самый короткий путь к оформлению."]),
      dict(h="⏰ Расписание и cron", p=[
        "Регулярную отправку обеспечивает cron на сервере. В админке рядом с cron-командами есть кнопки копирования для рекомендуемого, альтернативного, wget и curl вариантов, так что добавить задачу в планировщик хостинга быстро.",
        "Настройки можно применить сразу ко всем языкам и письмам, чтобы не повторять одно и то же несколько раз."]),
      dict(h="📖 Подсказки внутри админки", p=[
        "Раздел «Как пользоваться» встроен прямо в модуль, поэтому инструкция всегда под рукой. Лицензионный ключ активируется в разделе «О модуле»."]),
      dict(h="⚠️ Условия работы", p=[
        "Для отправки писем нужна рабочая почта магазина и cron на сервере. Проверьте шаблоны тестовым письмом до включения рассылки, чтобы клиенты не получили сырой или неверный текст."]),
    ]),
  uk=dict(
    intro=[
      "Людина поклала товари в кошик, дійшла до оформлення й закрила вкладку. Таке трапляється щодня, і без інструмента ви про це просто не дізнаєтесь. Abandoned Cart Pro зберігає такі незавершені кошики, показує їх адміністратору зі складом і надсилає клієнту лист-нагадування.",
      "Якщо покупець повернувся за посиланням з листа, кошик відновлюється, а якщо він таки оформив замовлення, модуль позначає це у списку. Так ви бачите не лише втрачені кошики, а й ті, що вдалося повернути.",
    ],
    sections=[
      dict(h="🧺 Що бачить адміністратор", p=[
        "У вкладці «Покинуті кошики» зібрано список незавершених кошиків із фільтрами. Будь-який запис можна відкрити й переглянути склад: які товари та в якій кількості залишив покупець.",
        "Кошики, що завершилися покупкою, позначаються окремо. Завдяки цьому зрозуміло, які нагадування справді повернули клієнта."]),
      dict(h="✉️ Листи, які пишете ви", p=[
        "Нагадування надсилаються за шаблонами, які ви налаштовуєте самі. Для кожної мови магазину є своя версія листа, тож україномовний клієнт отримає текст українською, а англомовний англійською.",
        "Перед запуском розсилки шаблон можна перевірити тестовим надсиланням. У модулі є шаблон за замовчуванням, з якого зручно почати, а розширені селектори дають змогу точніше обрати, кому й коли писати."]),
      dict(h="🔗 Повернення до кошика за посиланням", p=[
        "У лист вставляється посилання, за яким збережений кошик клієнта відновлюється. Покупцеві не треба збирати замовлення знову, він продовжує з того місця, де зупинився, і це найкоротший шлях до оформлення."]),
      dict(h="⏰ Розклад і cron", p=[
        "Регулярне надсилання забезпечує cron на сервері. В адмінці поруч із cron-командами є кнопки копіювання для рекомендованого, альтернативного, wget і curl варіантів, тож додати завдання до планувальника хостингу швидко.",
        "Налаштування можна застосувати одразу до всіх мов і листів, щоб не повторювати те саме кілька разів."]),
      dict(h="📖 Підказки всередині адмінки", p=[
        "Розділ «Як користуватися» вбудовано просто в модуль, тож інструкція завжди під рукою. Ліцензійний ключ активується в розділі «Про модуль»."]),
      dict(h="⚠️ Умови роботи", p=[
        "Для надсилання листів потрібна робоча пошта магазину та cron на сервері. Перевірте шаблони тестовим листом до ввімкнення розсилки, щоб клієнти не отримали сирий чи хибний текст."]),
    ]),
  en=dict(
    intro=[
      "Someone puts items in the cart, gets as far as checkout and closes the tab. It happens every day, and without a tool you never even know. Abandoned Cart Pro saves such unfinished carts, shows them to the administrator with their contents and sends the customer a reminder e-mail.",
      "If the buyer returns through the link in the e-mail, the cart is restored, and if they do complete the order, the module marks it in the list. You see not only the lost carts but also the ones you managed to win back.",
    ],
    sections=[
      dict(h="🧺 What the administrator sees", p=[
        "The Abandoned carts tab holds a filterable list of unfinished carts. Any entry can be opened to see the contents: which products and in what quantity the shopper left behind.",
        "Carts that ended in a purchase are marked separately, so it is clear which reminders actually brought the customer back."]),
      dict(h="✉️ E-mails written by you", p=[
        "Reminders go out from templates you configure yourself. Every store language has its own version of the message, so a Ukrainian-speaking customer gets Ukrainian text and an English-speaking one gets English.",
        "Before the mailing starts you can check a template with a test send. A default template is included as a starting point, and advanced selectors let you choose more precisely whom to write to and when."]),
      dict(h="🔗 Back to the cart with one link", p=[
        "The e-mail carries a link that restores the customer's saved cart. The buyer does not have to assemble the order again but continues where they stopped, which is the shortest path to checkout."]),
      dict(h="⏰ Schedule and cron", p=[
        "Regular sending is driven by a cron job on the server. Next to the cron commands the admin has copy buttons for the recommended, alternative, wget and curl variants, so adding the task to your hosting scheduler is quick.",
        "Settings can be applied to all languages and e-mails at once, so you do not repeat the same step several times."]),
      dict(h="📖 Help inside the admin", p=[
        "A How to use section is built right into the module, so the instructions are always at hand. The license key is activated in the About section."]),
      dict(h="⚠️ Operating conditions", p=[
        "Sending e-mails requires working store mail and a cron job on the server. Check the templates with a test e-mail before turning the mailing on, so customers do not receive a broken or wrong text."]),
    ]),
  cover=dict(
    tagline="Возвращает клиентов к брошенным корзинам",
    items=["Список корзин", "Состав корзины", "Письма-напоминания", "Языки писем", "Ссылка возврата", "Cron-рассылка"],
    cards=[("Брошенные корзины", "Фильтры и просмотр состава каждой корзины"),
           ("Шаблоны писем", "Версии для каждого языка и тестовая отправка"),
           ("Возврат по ссылке", "Корзина клиента восстанавливается из письма"),
           ("Отметка покупок", "Видно, какие корзины закончились заказом"),
           ("Расписание", "Отправка по cron с кнопками копирования"),
           ("Справка в админке", "Раздел Как пользоваться внутри модуля")],
    tabs=["Корзины", "Шаблоны", "Cron", "О модуле"],
    kpis=[("Корзин", "156"), ("Писем", "98"), ("Вернулось", "21")],
  ),
)
P[73] = dict(
  ru=dict(
    intro=[
      "Поставщик присылает прайс в Excel, второй отдаёт YML по ссылке, третий выгружает JSON, а вам нужно, чтобы цены и остатки в магазине менялись, не трогая описания и фотографии, которые вы правили вручную. Import Export Pro создан именно для такой работы с товарами в ocStore 3.0.4.1 и OpenCart 3.x.",
      "Модуль читает CSV, XLSX, XML/YML, JSON и HTML-таблицы из файла или по URL поставщика, а также выгружает каталог обратно: в файл, в защищённый публичный фид или для маркетплейсов. Вся логика собрана вокруг профилей поставщиков, то есть один раз настроили и дальше запускаете.",
    ],
    sections=[
      dict(h="📥 Профиль поставщика как основа работы", p=[
        "В профиле хранится всё, что нужно для конкретного поставщика: источник данных, карта соответствия колонок полям магазина, правила, категории и наценки. Для каждого прайса настройка делается один раз, потом импорт запускается вручную или по расписанию.",
        "Так можно вести несколько поставщиков параллельно, у каждого свои колонки, свои наценки и своя логика обработки."]),
      dict(h="🎚️ Режимы запуска и политика каждого поля", p=[
        "Не всегда нужен полный импорт. Можно запустить обновление только цен, только остатков, цен и остатков вместе, обработать только новые товары или только уже существующие. Эти ограничения выполняются на сервере, а не просто скрываются в интерфейсе.",
        "Для каждого поля задаётся своя политика: не трогать, перезаписать, заполнить только пустое, добавить, заменить или очистить. Благодаря этому вы решаете, что поставщик вправе менять, а что остаётся вашим."]),
      dict(h="🛡️ Страховки от порчи данных", p=[
        "Отсутствующая в файле колонка никогда не очищает данные в магазине. Опасные очистки ключевых полей блокируются, чтобы одна ошибка в прайсе не стёрла каталог.",
        "Перед настоящим запуском есть тестовый импорт без записи и пробный запуск на 10 строк с предпросмотром, где видно, что именно изменится."]),
      dict(h="📤 Экспорт, фиды и маркетплейсы", p=[
        "Каталог можно выгрузить в файл, опубликовать как защищённый публичный фид или подготовить выгрузку для маркетплейсов. Защита фида нужна, чтобы данные не отдавались первому встречному."]),
      dict(h="🕒 Cron, журнал и диагностика", p=[
        "Регулярные загрузки запускаются по cron с защитным токеном, поэтому чужой запрос не сможет стартовать импорт. Журнал операций сохраняет историю запусков, а диагностика помогает быстро понять, почему что-то не отработало."]),
      dict(h="⚠️ Прежде чем начать", p=[
        "После установки и обновления модуль выключен. Первый импорт делайте на тестовой копии магазина и обязательно сделайте резервную копию базы: модуль даёт много точных настроек, а ошибка в карте полей всё равно остаётся ошибкой."]),
    ]),
  uk=dict(
    intro=[
      "Постачальник надсилає прайс в Excel, другий віддає YML за посиланням, третій вивантажує JSON, а вам потрібно, щоб ціни й залишки в магазині змінювалися, не чіпаючи описів і фотографій, які ви правили вручну. Import Export Pro створений саме для такої роботи з товарами в ocStore 3.0.4.1 та OpenCart 3.x.",
      "Модуль читає CSV, XLSX, XML/YML, JSON і HTML-таблиці з файлу або за URL постачальника, а також вивантажує каталог назад: у файл, у захищений публічний фід або для маркетплейсів. Уся логіка збудована навколо профілів постачальників: один раз налаштували й далі запускаєте.",
    ],
    sections=[
      dict(h="📥 Профіль постачальника як основа роботи", p=[
        "У профілі зберігається все потрібне для конкретного постачальника: джерело даних, мапа відповідності колонок полям магазину, правила, категорії та націнки. Для кожного прайсу налаштування робиться один раз, потім імпорт запускається вручну або за розкладом.",
        "Так можна вести кількох постачальників паралельно, у кожного свої колонки, свої націнки та власна логіка обробки."]),
      dict(h="🎚️ Режими запуску та політика кожного поля", p=[
        "Не завжди потрібен повний імпорт. Можна запустити оновлення лише цін, лише залишків, цін і залишків разом, обробити тільки нові товари або тільки вже наявні. Ці обмеження виконуються на сервері, а не просто ховаються в інтерфейсі.",
        "Для кожного поля задається своя політика: не чіпати, перезаписати, заповнити лише порожнє, додати, замінити або очистити. Завдяки цьому ви вирішуєте, що постачальник має право змінювати, а що лишається вашим."]),
      dict(h="🛡️ Страховки від псування даних", p=[
        "Колонка, якої немає у файлі, ніколи не очищає дані в магазині. Небезпечні очищення ключових полів блокуються, щоб одна помилка в прайсі не стерла каталог.",
        "Перед справжнім запуском є тестовий імпорт без запису та пробний запуск на 10 рядків із попереднім переглядом, де видно, що саме зміниться."]),
      dict(h="📤 Експорт, фіди та маркетплейси", p=[
        "Каталог можна вивантажити у файл, опублікувати як захищений публічний фід або підготувати вивантаження для маркетплейсів. Захист фіду потрібен, щоб дані не віддавалися першому-ліпшому."]),
      dict(h="🕒 Cron, журнал і діагностика", p=[
        "Регулярні завантаження запускаються за cron із захисним токеном, тому чужий запит не зможе стартувати імпорт. Журнал операцій зберігає історію запусків, а діагностика допомагає швидко зрозуміти, чому щось не спрацювало."]),
      dict(h="⚠️ Перш ніж почати", p=[
        "Після встановлення й оновлення модуль вимкнений. Перший імпорт робіть на тестовій копії магазину та обов'язково зробіть резервну копію бази: модуль дає багато точних налаштувань, але помилка в мапі полів однаково лишається помилкою."]),
    ]),
  en=dict(
    intro=[
      "One supplier sends a price list in Excel, another serves YML at a URL, a third exports JSON, and you want prices and stock in the store to change without touching the descriptions and photos you edited by hand. Import Export Pro is built for exactly this kind of product work in ocStore 3.0.4.1 and OpenCart 3.x.",
      "The module reads CSV, XLSX, XML/YML, JSON and HTML tables from a file or from a supplier URL, and exports the catalog back out: to a file, to a protected public feed or for marketplaces. Everything is organized around supplier profiles: configure once, then run.",
    ],
    sections=[
      dict(h="📥 The supplier profile at the center", p=[
        "A profile keeps everything a given supplier needs: the data source, the map between file columns and store fields, rules, categories and markups. For each price list you set it up once, and after that the import runs manually or on a schedule.",
        "That lets you handle several suppliers in parallel, each with its own columns, markups and processing logic."]),
      dict(h="🎚️ Run modes and a policy for every field", p=[
        "A full import is not always what you want. You can update only prices, only stock, prices and stock together, process only new products or only existing ones. These restrictions are enforced on the server, not merely hidden in the interface.",
        "Each field gets its own policy: leave untouched, overwrite, fill only if empty, append, replace or clear. This way you decide what a supplier may change and what stays yours."]),
      dict(h="🛡️ Safeguards against damaged data", p=[
        "A column that is absent from the file never clears data in the store. Dangerous clearing of key fields is blocked, so a single mistake in a price list cannot wipe the catalog.",
        "Before the real run there is a test import that writes nothing and a trial run of 10 rows with a preview, showing exactly what would change."]),
      dict(h="📤 Export, feeds and marketplaces", p=[
        "The catalog can be exported to a file, published as a protected public feed or prepared for marketplaces. Feed protection exists so the data is not handed to just anyone."]),
      dict(h="🕒 Cron, journal and diagnostics", p=[
        "Regular loads run through cron with a protective token, so a stranger's request cannot start an import. The operations journal keeps the history of runs, and diagnostics help you quickly see why something did not work."]),
      dict(h="⚠️ Before you begin", p=[
        "After installation and updates the module is switched off. Do the first import on a test copy of the store and be sure to back up the database: the module offers many precise settings, but a mistake in the field map is still a mistake."]),
    ]),
  cover=dict(
    tagline="Прайсы поставщиков в каталог без хаоса",
    items=["CSV · XLSX · XML", "YML и JSON", "Профили поставщиков", "Тест 10 строк", "Политики полей", "Защищённые фиды"],
    cards=[("Много форматов", "CSV, XLSX, XML/YML, JSON, HTML-таблицы"),
           ("Режимы запуска", "Цены, остатки, новые, существующие"),
           ("Политика поля", "Не трогать, заполнить пустое, заменить"),
           ("Тестовый импорт", "Без записи и пробный запуск на 10 строк"),
           ("Экспорт и фиды", "Файл, публичный фид, маркетплейсы"),
           ("Cron и журнал", "Токен защиты и история операций")],
    tabs=["Профили", "Импорт", "Экспорт", "Журнал"],
    kpis=[("Профилей", "6"), ("Строк", "4 820"), ("Обновлено", "1 312")],
  ),
)
P[91] = dict(
  ru=dict(
    intro=[
      "Поисковые системы и AI-ассистенты всё чаще читают сайты не глазами, а по готовым машинным файлам: карте сайта, списку материалов, товарному фиду. AI Ready PRO собирает для каталога OpenCart именно такой набор: llms.txt, AI Sitemap, фиды товаров, уведомления через IndexNow и read-only MCP/WebMCP для публичного поиска и чтения.",
      "Модуль не обещает чудес и не подменяет SEO. Он аккуратно публикует то, что у магазина и так открыто, делает это в понятных форматах и честно говорит в интерфейсе, чего делать не стоит.",
    ],
    sections=[
      dict(h="📄 llms.txt без иллюзий", p=[
        "Модуль создаёт llms.txt и llms-full с отдельными контентными файлами, чтобы AI-системе было с чего начать знакомство с магазином. При этом в самом модуле прямо сказано, что llms.txt не является фактором ранжирования Google, и ожидать от него скачка позиций не нужно.",
        "Приоритет контента можно настроить, посмотреть предпросмотр и сделать тестовую генерацию без записи файлов, а затем сгенерировать всё пакетно."]),
      dict(h="🗺️ AI Sitemap, который не врёт", p=[
        "AI Sitemap Index автоматически делится, когда каталог большой. В нём нет полей priority и changefreq, которые Google игнорирует, и нет придуманного lastmod. Отсутствие выдуманных данных здесь сознательное решение: карта должна содержать только то, что известно точно."]),
      dict(h="🛒 Товарные фиды", p=[
        "OpenAI-compatible Product Feed доступен в двух вариантах, Core и Extended. Расширенный включает варианты товаров и изображения.",
        "Для Google UCP Cart реализована передача корзины, но без объявления функций, которых модуль не поддерживает: оформление заказа, оплата и заказы не заявляются."]),
      dict(h="📡 IndexNow и очередь", p=[
        "Когда товары меняются, об этом можно сообщить поисковикам через IndexNow. Изменения попадают в постоянную очередь, уходят пакетами, а при сбое отправка повторяется с нарастающей паузой (backoff). Всё это можно запускать по cron."]),
      dict(h="🔌 MCP и WebMCP только для чтения", p=[
        "Read-only MCP и WebMCP открывают публичные сценарии поиска и чтения каталога. Покупательские данные они не раскрывают: модуль публикует только публичные данные каталога и не выдаёт персональную информацию.",
        "WebMCP при необходимости включается отдельно, поэтому по умолчанию вы ничего лишнего наружу не открываете."]),
      dict(h="🩺 Диагностика", p=[
        "В разделе диагностики проверяются robots.txt, поисковые и AI-краулеры, endpoints, источники контента, .htaccess, очереди и файлы. Если файл не создался или правило в robots.txt закрывает нужный адрес, это видно сразу, без раскопок на сервере."]),
    ]),
  uk=dict(
    intro=[
      "Пошукові системи та AI-асистенти дедалі частіше читають сайти не очима, а за готовими машинними файлами: мапою сайту, переліком матеріалів, товарним фідом. AI Ready PRO збирає для каталогу OpenCart саме такий набір: llms.txt, AI Sitemap, фіди товарів, сповіщення через IndexNow та read-only MCP/WebMCP для публічного пошуку й читання.",
      "Модуль не обіцяє див і не підміняє SEO. Він акуратно публікує те, що в магазину й так відкрите, робить це в зрозумілих форматах і чесно каже в інтерфейсі, чого робити не варто.",
    ],
    sections=[
      dict(h="📄 llms.txt без ілюзій", p=[
        "Модуль створює llms.txt та llms-full з окремими контентними файлами, щоб AI-системі було з чого почати знайомство з магазином. Водночас у самому модулі прямо сказано, що llms.txt не є фактором ранжування Google, і чекати від нього стрибка позицій не слід.",
        "Пріоритет контенту можна налаштувати, переглянути попередньо та зробити тестову генерацію без запису файлів, а потім згенерувати все пакетно."]),
      dict(h="🗺️ AI Sitemap, що не бреше", p=[
        "AI Sitemap Index автоматично ділиться, коли каталог великий. У ньому немає полів priority і changefreq, які Google ігнорує, та вигаданого lastmod. Відсутність вигаданих даних тут свідоме рішення: мапа має містити тільки те, що відомо точно."]),
      dict(h="🛒 Товарні фіди", p=[
        "OpenAI-compatible Product Feed доступний у двох варіантах, Core та Extended. Розширений містить варіанти товарів і зображення.",
        "Для Google UCP Cart реалізовано передачу кошика, але без заяв про функції, яких модуль не підтримує: оформлення замовлення, оплата й замовлення не декларуються."]),
      dict(h="📡 IndexNow і черга", p=[
        "Коли товари змінюються, про це можна повідомити пошуковикам через IndexNow. Зміни потрапляють у постійну чергу, йдуть пакетами, а у разі збою надсилання повторюється зі зростаючою паузою (backoff). Усе це можна запускати за cron."]),
      dict(h="🔌 MCP і WebMCP лише для читання", p=[
        "Read-only MCP і WebMCP відкривають публічні сценарії пошуку та читання каталогу. Дані покупців вони не розкривають: модуль публікує лише публічні дані каталогу й не видає персональної інформації.",
        "WebMCP за потреби вмикається окремо, тож за замовчуванням ви нічого зайвого назовні не відкриваєте."]),
      dict(h="🩺 Діагностика", p=[
        "У розділі діагностики перевіряються robots.txt, пошукові та AI-краулери, endpoints, джерела контенту, .htaccess, черги й файли. Якщо файл не створився або правило в robots.txt закриває потрібну адресу, це видно одразу, без розкопок на сервері."]),
    ]),
  en=dict(
    intro=[
      "Search engines and AI assistants increasingly read websites not by eye but through ready-made machine files: a sitemap, a list of materials, a product feed. AI Ready PRO assembles exactly that set for an OpenCart catalog: llms.txt, an AI Sitemap, product feeds, IndexNow notifications and read-only MCP/WebMCP for public search and reading.",
      "The module promises no miracles and does not replace SEO. It neatly publishes what the store already makes public, does so in well-understood formats, and says plainly in its interface what not to expect.",
    ],
    sections=[
      dict(h="📄 llms.txt without illusions", p=[
        "The module creates llms.txt and llms-full with separate content files, giving an AI system a place to start getting to know the store. At the same time the module states outright that llms.txt is not a Google ranking factor, so do not expect a jump in positions from it.",
        "Content priority can be tuned, previewed and test-generated without writing files, and then everything can be generated in batches."]),
      dict(h="🗺️ An AI Sitemap that does not bluff", p=[
        "The AI Sitemap Index splits automatically when the catalog is large. It carries no priority or changefreq fields, which Google ignores, and no invented lastmod. Leaving out made-up data is a deliberate decision: the map should contain only what is known for sure."]),
      dict(h="🛒 Product feeds", p=[
        "The OpenAI-compatible Product Feed comes in two variants, Core and Extended. The extended one includes product variants and images.",
        "Google UCP Cart transfer is implemented without claiming features the module does not support: checkout, payment and orders are not declared."]),
      dict(h="📡 IndexNow and its queue", p=[
        "When products change, search engines can be told through IndexNow. Changes go into a persistent queue, are sent in batches, and a failed send is retried with growing pauses (backoff). All of it can run on cron."]),
      dict(h="🔌 Read-only MCP and WebMCP", p=[
        "Read-only MCP and WebMCP open public scenarios for searching and reading the catalog. They do not expose customer data: the module publishes only public catalog data and discloses no personal information.",
        "WebMCP is switched on separately when needed, so by default you open nothing extra to the outside."]),
      dict(h="🩺 Diagnostics", p=[
        "The diagnostics section checks robots.txt, search and AI crawlers, endpoints, content sources, .htaccess, queues and files. If a file was not created or a robots.txt rule blocks a needed address, you see it at once without digging around on the server."]),
    ]),
  cover=dict(
    tagline="Каталог, понятный AI и поисковикам",
    items=["llms.txt и llms-full", "AI Sitemap Index", "Product Feed", "IndexNow", "MCP и WebMCP", "Диагностика"],
    cards=[("llms.txt", "Файлы для AI, без обещаний роста позиций"),
           ("AI Sitemap", "Автоделение, без priority и выдуманного lastmod"),
           ("Товарный фид", "Варианты Core и Extended"),
           ("IndexNow", "Очередь, пакеты и повторы с backoff"),
           ("MCP только чтение", "Публичный поиск и чтение каталога"),
           ("Проверка сайта", "robots.txt, краулеры, endpoints, файлы")],
    tabs=["Файлы", "Фиды", "IndexNow", "Диагностика"],
    kpis=[("Страниц", "2 480"), ("В очереди", "34"), ("Файлов", "7")],
  ),
)
P[118] = dict(
  ru=dict(
    intro=[
      "За годы работы в админке магазина копятся расширения, которые когда-то поставили на пробу: платёжка, которой вы так и не пользовались, старая тема, модуль-эксперимент. Часть из них давно отключена, но их файлы лежат на сервере, а записи остаются в базе. Extension Cleanup PRO помогает разобраться с этим наследием безопасно.",
      "Это инструмент для администратора: он составляет инвентаризацию, выполняет штатную деинсталляцию и, только если принадлежность файлов подтверждена, позволяет удалить расширение целиком. Главная идея в том, чтобы ничего нужного не пострадало.",
    ],
    sections=[
      dict(h="🗂️ Полная картина, а не только установленное", p=[
        "Список строится из двух источников сразу: записи базы данных и реально существующие файлы. Поэтому в нём видны и установленные дополнения, и забытые файлы неустановленных расширений, которых стандартный раздел Расширения уже не показывает.",
        "Поддерживаются типы module, payment, shipping, total, feed, analytics, captcha, fraud, dashboard, report, theme, currency, advertise и menu."]),
      dict(h="🔬 Анализ перед любым действием", p=[
        "Нажав «Анализ» во вкладке «Расширения», вы получаете не просто кнопку удаления, а разбор. Модуль смотрит на Installer, файлы, OCMOD, Events, настройки, экземпляры модулей и зависимости.",
        "Каждое расширение получает оценку риска и список причин блокировки. Если что-то мешает безопасному удалению, вы увидите конкретную причину, а опасные операции потребуют подтверждения."]),
      dict(h="💾 ZIP-копия с manifest.json", p=[
        "Перед удалением файлов создаётся проверяемая ZIP-копия с manifest.json. Скачать её можно во вкладке «Резервные копии». Важно понимать, что это копия файлов расширения, а не всего магазина и не базы данных, поэтому общую резервную копию всё равно нужно делать самостоятельно."]),
      dict(h="🛡️ Что защищено по умолчанию", p=[
        "Модуль не даст сломать витрину: защищены активные темы и CAPTCHA, тема default и критичные итоги sub_total и total. Каталоги никогда не удаляются рекурсивно, а многокомпонентные пакеты и общие файлы блокируют автоматическое удаление, чтобы вы не убрали то, чем пользуется другое расширение."]),
      dict(h="🧭 Порядок работы", p=[
        "Сначала сделайте резервную копию и включите модуль на время обслуживания. Затем запустите анализ и изучите риск. Правильная последовательность такая: сперва деинсталляция, потом, при необходимости, полное удаление файлов, и после этого снова выключите модуль."]),
      dict(h="⚠️ Состояние OFF", p=[
        "После установки модуль выключен (OFF) и в обычной работе должен оставаться выключенным. Включайте его только на время уборки. Ему не нужны аккаунт, API-ключи и cron."]),
    ]),
  uk=dict(
    intro=[
      "За роки роботи в адмінці магазину накопичуються розширення, які колись поставили на пробу: платіжка, якою так і не скористалися, стара тема, модуль-експеримент. Частину з них давно вимкнено, але їхні файли лежать на сервері, а записи лишаються в базі. Extension Cleanup PRO допомагає розібратися з цією спадщиною безпечно.",
      "Це інструмент для адміністратора: він складає інвентаризацію, виконує штатну деінсталяцію і, лише якщо належність файлів підтверджена, дозволяє видалити розширення повністю. Головна ідея в тому, щоб нічого потрібного не постраждало.",
    ],
    sections=[
      dict(h="🗂️ Повна картина, а не лише встановлене", p=[
        "Список будується з двох джерел одразу: записи бази даних і файли, що реально існують. Тому в ньому видно і встановлені доповнення, і забуті файли невстановлених розширень, яких стандартний розділ Розширення вже не показує.",
        "Підтримуються типи module, payment, shipping, total, feed, analytics, captcha, fraud, dashboard, report, theme, currency, advertise та menu."]),
      dict(h="🔬 Аналіз перед будь-якою дією", p=[
        "Натиснувши «Аналіз» у вкладці «Розширення», ви отримуєте не просто кнопку видалення, а розбір. Модуль дивиться на Installer, файли, OCMOD, Events, налаштування, екземпляри модулів і залежності.",
        "Кожне розширення отримує оцінку ризику та перелік причин блокування. Якщо щось заважає безпечному видаленню, ви побачите конкретну причину, а небезпечні операції вимагатимуть підтвердження."]),
      dict(h="💾 ZIP-копія з manifest.json", p=[
        "Перед видаленням файлів створюється ZIP-копія з manifest.json, яку можна перевірити. Завантажити її можна у вкладці «Резервні копії». Важливо розуміти, що це копія файлів розширення, а не всього магазину й не бази даних, тож загальну резервну копію однаково потрібно робити самостійно."]),
      dict(h="🛡️ Що захищено за замовчуванням", p=[
        "Модуль не дасть зламати вітрину: захищено активні теми та CAPTCHA, тему default і критичні підсумки sub_total та total. Каталоги ніколи не видаляються рекурсивно, а багатокомпонентні пакети й спільні файли блокують автоматичне видалення, щоб ви не прибрали те, чим користується інше розширення."]),
      dict(h="🧭 Порядок роботи", p=[
        "Спершу зробіть резервну копію й увімкніть модуль на час обслуговування. Потім запустіть аналіз і вивчіть ризик. Правильна послідовність така: спершу деінсталяція, потім, за потреби, повне видалення файлів, і після цього знову вимкніть модуль."]),
      dict(h="⚠️ Стан OFF", p=[
        "Після встановлення модуль вимкнений (OFF) і в звичайній роботі має залишатися вимкненим. Вмикайте його лише на час прибирання. Йому не потрібні акаунт, API-ключі та cron."]),
    ]),
  en=dict(
    intro=[
      "Over the years an admin panel collects extensions that were once installed to try out: a payment method you never used, an old theme, an experimental module. Some were switched off long ago, yet their files sit on the server and their records stay in the database. Extension Cleanup PRO helps you deal with this legacy safely.",
      "It is an administrator tool: it builds an inventory, performs the standard uninstall and, only when file ownership is confirmed, lets you remove an extension completely. The main idea is that nothing you still need gets hurt.",
    ],
    sections=[
      dict(h="🗂️ The full picture, not just what is installed", p=[
        "The list is built from two sources at once: database records and files that actually exist. So it shows installed add-ons as well as forgotten files of uninstalled extensions that the standard Extensions page no longer lists.",
        "Supported types are module, payment, shipping, total, feed, analytics, captcha, fraud, dashboard, report, theme, currency, advertise and menu."]),
      dict(h="🔬 Analysis before any action", p=[
        "Pressing Analyze on the Extensions tab gives you a breakdown rather than a bare delete button. The module examines the Installer, files, OCMOD, Events, settings, module instances and dependencies.",
        "Each extension receives a risk rating and a list of blocking reasons. If something prevents safe removal you see the concrete reason, and dangerous operations require confirmation."]),
      dict(h="💾 A ZIP copy with manifest.json", p=[
        "Before files are deleted a verifiable ZIP copy with manifest.json is created, and you can download it on the Backups tab. It is important to understand that this is a copy of the extension files, not of the whole store or the database, so a general backup is still your own job."]),
      dict(h="🛡️ What is protected by default", p=[
        "The module will not let you break the storefront: active themes and CAPTCHA, the default theme and the critical totals sub_total and total are protected. Directories are never deleted recursively, and multi-component packages and shared files block automatic removal, so you do not take away something another extension relies on."]),
      dict(h="🧭 Workflow", p=[
        "First make a backup and switch the module on for the maintenance window. Then run the analysis and study the risk. The right order is uninstall first, then, if needed, remove the files completely, and after that switch the module off again."]),
      dict(h="⚠️ The OFF state", p=[
        "After installation the module is OFF and in everyday operation it should stay OFF. Enable it only while you clean up. It needs no account, API keys or cron."]),
    ]),
  cover=dict(
    tagline="Безопасная уборка забытых расширений",
    items=["Инвентаризация", "Анализ риска", "Штатная деинсталляция", "ZIP-копия", "Защита тем", "Без API и cron"],
    cards=[("База и файлы вместе", "Видны и установленные, и забытые расширения"),
           ("Оценка риска", "Причины блокировки перед удалением"),
           ("ZIP с manifest.json", "Проверяемая копия файлов расширения"),
           ("Защита системы", "Активные темы, CAPTCHA, sub_total и total"),
           ("Без рекурсии", "Каталоги не удаляются целиком"),
           ("Включён на время", "По умолчанию выключен (OFF)")],
    tabs=["Расширения", "Анализ", "Резервные", "Журнал"],
    kpis=[("Найдено", "38"), ("Установлено", "24"), ("Сирот", "14")],
  ),
)
P[122] = dict(
  ru=dict(
    intro=[
      "Посмотрите в журнал веб-сервера любого магазина, и вы найдёте обращения к /.env, /.git и wp-login.php, которых на сайте быть не должно. Это боты проверяют, не забыли ли вы что-нибудь открытым. Bot Security PRO ловит такие запросы на уровне приложения: проверка идёт до выполнения контроллера ocStore/OpenCart.",
      "Модуль умеет не только блокировать, но и просто записывать события. Это важная деталь: защиту можно сначала включить в режиме наблюдения и убедиться, что она не заденет реальных покупателей.",
    ],
    sections=[
      dict(h="🧱 WAF для запроса целиком", p=[
        "Проверяются URL, строка запроса, User-Agent, GET, POST, JSON и cookies. Известные сигнатуры атак можно либо журналировать, либо блокировать. Режим «Только журнал» создан для безопасного запуска: вы видите, что сработало бы, но никого не блокируете."]),
      dict(h="🕵️ Probe Guard против разведки", p=[
        "Отдельная защита ловит сканирование технических адресов: /.env, /.git, wp-login.php и похожих. Для обычного покупателя такие URL бессмысленны, поэтому обращения к ним хороший признак бота."]),
      dict(h="⏱️ Лимит частоты без раздувания базы", p=[
        "Rate limit агрегирован: в базе хранится одна строка на IP, область и период, а не запись на каждый запрос. Благодаря этому записей в БД заметно меньше, чем при журналировании каждого обращения."]),
      dict(h="🌐 Репутация IP", p=[
        "Для оценки адреса можно подключить AbuseIPDB и Stop Forum Spam. Запросы идут параллельно, с общим дедлайном и кешем, чтобы проверка не тормозила страницу. Это необязательные внешние сервисы, и у каждого из них свои ключи.",
        "Белые и чёрные списки принимают IPv4, IPv6 и CIDR, а доверенные прокси и проверка поисковых ботов через DNS помогают не заблокировать настоящих роботов Google или Bing."]),
      dict(h="🚫 Блокировка и журнал", p=[
        "AutoBan банит нарушителей автоматически, журнал совместим с Fail2ban, а вручную можно заблокировать и разблокировать любой адрес. Есть вкладка «Посетители» и анализ активности агрессивных ботов, а также ограничение доступа по странам."]),
      dict(h="🔧 Диагностика и аккуратность", p=[
        "Диагностика проверяет Event, таблицы, индексы, cURL, storage и proxy. Модуль не добавляет глобальных CSS и JS на витрину, то есть скорость страниц ему не страдает."]),
      dict(h="🚦 Как безопасно запустить", p=[
        "Включите WAF в режиме «Только журнал» и понаблюдайте. Затем настройте белые списки и исключения для оплаты, API и cron, чтобы не заблокировать собственные обращения магазина. Проверенные правила переключайте в режим блокировки."]),
    ]),
  uk=dict(
    intro=[
      "Зазирніть у журнал вебсервера будь-якого магазину, і ви знайдете звернення до /.env, /.git та wp-login.php, яких на сайті бути не повинно. Це боти перевіряють, чи не залишили ви щось відкритим. Bot Security PRO ловить такі запити на рівні застосунку: перевірка йде до виконання контролера ocStore/OpenCart.",
      "Модуль уміє не лише блокувати, а й просто записувати події. Це важлива деталь: захист можна спершу ввімкнути в режимі спостереження й переконатися, що він не зачепить реальних покупців.",
    ],
    sections=[
      dict(h="🧱 WAF для всього запиту", p=[
        "Перевіряються URL, рядок запиту, User-Agent, GET, POST, JSON і cookies. Відомі сигнатури атак можна або журналювати, або блокувати. Режим «Лише журнал» створений для безпечного запуску: ви бачите, що спрацювало б, але нікого не блокуєте."]),
      dict(h="🕵️ Probe Guard проти розвідки", p=[
        "Окремий захист ловить сканування технічних адрес: /.env, /.git, wp-login.php та подібних. Для звичайного покупця такі URL безглузді, тож звернення до них є добрим ознаком бота."]),
      dict(h="⏱️ Ліміт частоти без роздування бази", p=[
        "Rate limit агрегований: у базі зберігається один рядок на IP, область і період, а не запис на кожен запит. Завдяки цьому записів у БД помітно менше, ніж при журналюванні кожного звернення."]),
      dict(h="🌐 Репутація IP", p=[
        "Для оцінки адреси можна підключити AbuseIPDB та Stop Forum Spam. Запити йдуть паралельно, із загальним дедлайном і кешем, щоб перевірка не гальмувала сторінку. Це необов'язкові зовнішні сервіси, і в кожного свої ключі.",
        "Білі та чорні списки приймають IPv4, IPv6 і CIDR, а довірені проксі та перевірка пошукових ботів через DNS допомагають не заблокувати справжніх роботів Google чи Bing."]),
      dict(h="🚫 Блокування та журнал", p=[
        "AutoBan банить порушників автоматично, журнал сумісний з Fail2ban, а вручну можна заблокувати й розблокувати будь-яку адресу. Є вкладка «Відвідувачі» та аналіз активності агресивних ботів, а також обмеження доступу за країнами."]),
      dict(h="🔧 Діагностика й акуратність", p=[
        "Діагностика перевіряє Event, таблиці, індекси, cURL, storage і proxy. Модуль не додає глобальних CSS та JS на вітрину, тобто швидкість сторінок від нього не страждає."]),
      dict(h="🚦 Як безпечно запустити", p=[
        "Увімкніть WAF у режимі «Лише журнал» і понаглядайте. Потім налаштуйте білі списки та винятки для оплати, API і cron, щоб не заблокувати власні звернення магазину. Перевірені правила перемикайте в режим блокування."]),
    ]),
  en=dict(
    intro=[
      "Look into the web server log of any store and you will find requests for /.env, /.git and wp-login.php that have no business being there. Bots are checking whether you left something exposed. Bot Security PRO catches such requests at the application level: the check runs before the ocStore/OpenCart controller executes.",
      "The module can do more than block; it can simply record events. That is an important detail: you can first switch protection on in observation mode and make sure it does not touch real customers.",
    ],
    sections=[
      dict(h="🧱 A WAF for the whole request", p=[
        "It inspects the URL, query string, User-Agent, GET, POST, JSON and cookies. Known attack signatures can be either logged or blocked. The Log only mode exists for a safe start: you see what would have fired without blocking anyone."]),
      dict(h="🕵️ Probe Guard against reconnaissance", p=[
        "A dedicated guard catches scanning of technical addresses such as /.env, /.git, wp-login.php and similar. These URLs mean nothing to a regular shopper, so requests for them are a good sign of a bot."]),
      dict(h="⏱️ Rate limiting without bloating the database", p=[
        "The rate limit is aggregated: the database keeps one row per IP, scope and period instead of a record for every request. As a result there are far fewer DB records than when each hit is logged."]),
      dict(h="🌐 IP reputation", p=[
        "AbuseIPDB and Stop Forum Spam can be connected to judge an address. Requests run in parallel with a shared deadline and a cache, so the check does not slow the page. These are optional external services, each with its own key.",
        "Whitelists and blacklists accept IPv4, IPv6 and CIDR, while trusted proxies and DNS verification of search bots help you avoid blocking genuine Google or Bing crawlers."]),
      dict(h="🚫 Blocking and the log", p=[
        "AutoBan bans offenders automatically, the log is Fail2ban-compatible, and any address can be blocked or unblocked by hand. There is a Visitors tab and an analysis of aggressive bot activity, plus country-based access restriction."]),
      dict(h="🔧 Diagnostics and tidiness", p=[
        "Diagnostics check the Event, tables, indexes, cURL, storage and proxy. The module adds no global CSS or JS to the storefront, so page speed does not suffer."]),
      dict(h="🚦 How to launch safely", p=[
        "Turn the WAF on in Log only mode and watch. Then set up whitelists and exceptions for payment, API and cron so you do not block the store's own calls. Switch rules you have verified to blocking mode."]),
    ]),
  cover=dict(
    tagline="Защита витрины от ботов и сканеров",
    items=["WAF для запросов", "Probe Guard", "Rate limit", "Репутация IP", "AutoBan и Fail2ban", "Белые списки"],
    cards=[("Режим Только журнал", "Сначала наблюдение, потом блокировка"),
           ("Защита от сканеров", "/.env, /.git, wp-login.php и подобные"),
           ("Агрегированный лимит", "Одна строка на IP, область и период"),
           ("AbuseIPDB и SFS", "Параллельная проверка с кешем и дедлайном"),
           ("Списки IP и CIDR", "IPv4, IPv6, прокси, проверка ботов по DNS"),
           ("Страны и посетители", "Ограничение доступа и анализ ботов")],
    tabs=["События", "Правила", "Списки", "Диагностика"],
    kpis=[("Событий", "1 284"), ("Заблокировано", "96"), ("IP в бане", "18")],
  ),
)
P[123] = dict(
  ru=dict(
    intro=[
      "Когда в каталоге десятки тысяч позиций, править их по одной в админке нереально, а таблица в Excel выглядит спасительной идеей до тех пор, пока не нужно загрузить её обратно без потерь. Catalog Import PRO решает эту задачу через CSV: пакетный импорт и потоковый экспорт товаров, категорий, производителей, опций, фильтров, SEO URL, изображений и мультиязычных данных.",
      "Модуль сделан для людей, которые хотят точно понимать, что произойдёт со строкой файла. Для этого у него есть режимы записи, политики для каждого поля и тестовый прогон, который проверяет всё, ничего не меняя в каталоге.",
    ],
    sections=[
      dict(h="✍️ Четыре режима записи", p=[
        "В режиме add обрабатываются только новые записи, в update только найденные в магазине, а upsert обновляет существующие и создаёт недостающие. Режим delete удаляет только то, что явно указано в CSV, то есть случайно пропавшая строка ничего не стирает."]),
      dict(h="🎛️ Что делать с каждым полем", p=[
        "Для поля выбирается политика: preserve оставляет как есть, overwrite перезаписывает, fill_empty заполняет только пустое, merge объединяет, replace заменяет, clear очищает. Так один и тот же файл можно использовать для разных задач без риска затереть лишнее.",
        "Есть и быстрые режимы: только цены, только остатки, только новые товары и полный импорт."]),
      dict(h="🧪 Тестовый режим", p=[
        "Dry run ищет запись, проверяет данные, связи, изображения и SEO URL, но ничего не пишет в каталог. Строки, прошедшие проверку, получают статус review, и вы просматриваете их до настоящего запуска."]),
      dict(h="🧩 Что поддерживается внутри каталога", p=[
        "Импорт понимает noindex, главную категорию, связи со статьями, макеты, фильтры, загрузки, скидки и акции. Разделители в файле могут быть такими: точка с запятой, запятая, табуляция или вертикальная черта.",
        "Модуль защищает от CSV Formula Injection, то есть значения, которые Excel мог бы принять за формулу, не станут опасными."]),
      dict(h="📦 Очереди и большой экспорт", p=[
        "Импорт идёт через очереди, а старые задания очищаются. Экспорт потоковый, поэтому большой каталог выгружается без попытки собрать всё в памяти за один раз."]),
      dict(h="🚧 Честные ограничения", p=[
        "Данные сторонних модулей с отдельными таблицами не импортируются без адаптера, и это сказано прямо. Экспорт переносит поддерживаемые поля, но не заменяет резервную копию базы. Первый импорт выполняйте на тестовой копии магазина."]),
    ]),
  uk=dict(
    intro=[
      "Коли в каталозі десятки тисяч позицій, правити їх по одній в адмінці нереально, а таблиця в Excel здається рятівною ідеєю, доки не потрібно завантажити її назад без втрат. Catalog Import PRO розв'язує це завдання через CSV: пакетний імпорт і потоковий експорт товарів, категорій, виробників, опцій, фільтрів, SEO URL, зображень та багатомовних даних.",
      "Модуль зроблено для людей, які хочуть точно розуміти, що станеться з рядком файлу. Для цього в нього є режими запису, політики для кожного поля й тестовий прогін, який перевіряє все, нічого не змінюючи в каталозі.",
    ],
    sections=[
      dict(h="✍️ Чотири режими запису", p=[
        "У режимі add обробляються лише нові записи, в update лише знайдені в магазині, а upsert оновлює наявні та створює відсутні. Режим delete видаляє лише те, що явно вказано в CSV, тобто випадково зниклий рядок нічого не стирає."]),
      dict(h="🎛️ Що робити з кожним полем", p=[
        "Для поля обирається політика: preserve залишає як є, overwrite перезаписує, fill_empty заповнює лише порожнє, merge об'єднує, replace замінює, clear очищає. Так один і той самий файл можна використовувати для різних завдань без ризику затерти зайве.",
        "Є й швидкі режими: лише ціни, лише залишки, лише нові товари та повний імпорт."]),
      dict(h="🧪 Тестовий режим", p=[
        "Dry run шукає запис, перевіряє дані, зв'язки, зображення й SEO URL, але нічого не пише в каталог. Рядки, що пройшли перевірку, отримують статус review, і ви переглядаєте їх до справжнього запуску."]),
      dict(h="🧩 Що підтримується всередині каталогу", p=[
        "Імпорт розуміє noindex, головну категорію, зв'язки зі статтями, макети, фільтри, завантаження, знижки та акції. Роздільники у файлі можуть бути такими: крапка з комою, кома, табуляція або вертикальна риска.",
        "Модуль захищає від CSV Formula Injection, тобто значення, які Excel міг би прийняти за формулу, не стануть небезпечними."]),
      dict(h="📦 Черги та великий експорт", p=[
        "Імпорт іде через черги, а старі завдання очищуються. Експорт потоковий, тому великий каталог вивантажується без спроби зібрати все в пам'яті за один раз."]),
      dict(h="🚧 Чесні обмеження", p=[
        "Дані сторонніх модулів з окремими таблицями не імпортуються без адаптера, і це сказано прямо. Експорт переносить підтримувані поля, але не замінює резервну копію бази. Перший імпорт виконуйте на тестовій копії магазину."]),
    ]),
  en=dict(
    intro=[
      "When a catalog has tens of thousands of items, editing them one by one in the admin is unrealistic, and an Excel table seems like a rescue until you have to load it back without losses. Catalog Import PRO solves this through CSV: batch import and streaming export of products, categories, manufacturers, options, filters, SEO URLs, images and multilingual data.",
      "The module is made for people who want to know exactly what will happen to each row of a file. For that it offers write modes, per-field policies and a test run that checks everything while changing nothing in the catalog.",
    ],
    sections=[
      dict(h="✍️ Four write modes", p=[
        "In add mode only new records are processed, in update only those found in the store, and upsert updates existing ones and creates missing ones. The delete mode removes only what is explicitly listed in the CSV, so a row that vanished by accident erases nothing."]),
      dict(h="🎛️ What to do with each field", p=[
        "A field gets a policy: preserve leaves it as is, overwrite rewrites it, fill_empty fills only blanks, merge combines, replace swaps and clear empties. This way one file can serve different tasks without the risk of wiping something extra.",
        "Quick modes exist as well: prices only, stock only, new products only and a full import."]),
      dict(h="🧪 The test mode", p=[
        "Dry run looks up the record and validates data, relations, images and SEO URLs but writes nothing to the catalog. Rows that pass get the review status, and you go through them before the real run."]),
      dict(h="🧩 What is supported inside the catalog", p=[
        "The import understands noindex, the main category, article relations, layouts, filters, downloads, discounts and specials. File delimiters can be a semicolon, a comma, a tab or a pipe.",
        "The module guards against CSV Formula Injection, so values that Excel might take for a formula do not become dangerous."]),
      dict(h="📦 Queues and large exports", p=[
        "The import runs through queues and old jobs are cleaned up. The export is streamed, so a big catalog is written out without trying to hold everything in memory at once."]),
      dict(h="🚧 Honest limits", p=[
        "Data of third-party modules with their own tables is not imported without an adapter, and this is stated plainly. The export carries the supported fields but does not replace a database backup. Run the first import on a test copy of the store."]),
    ]),
  cover=dict(
    tagline="CSV-импорт и потоковый экспорт каталога",
    items=["Режимы add и upsert", "Политики полей", "Тест без записи", "Статус review", "Потоковый экспорт", "Защита CSV"],
    cards=[("Четыре режима", "add, update, upsert и явный delete"),
           ("Политика поля", "preserve, overwrite, fill_empty, merge и др."),
           ("Dry run", "Проверка связей, фото и SEO URL без записи"),
           ("Быстрые режимы", "Только цены, только остатки, только новые"),
           ("Безопасный CSV", "Защита от Formula Injection"),
           ("Большие каталоги", "Очереди и потоковый экспорт")],
    tabs=["Импорт", "Экспорт", "Очередь", "Настройки"],
    kpis=[("Строк", "12 400"), ("В review", "312"), ("Ошибок", "7")],
  ),
)
P[124] = dict(
  ru=dict(
    intro=[
      "Блог магазина нужен, но писать о чём-то, не связанном с вашими товарами, бессмысленно, а придумывать темы каждую неделю утомительно. AI Article Writer PRO идёт от каталога: он анализирует реальные категории и товары, подбирает SEO-ключи и темы, пишет статьи с изображениями, проверяет качество и публикует материалы в блог.",
      "Важная оговорка в самом описании модуля: он держится вашей ниши и не уходит в посторонние отрасли. Темы и ключи строятся по тому, что действительно продаётся в магазине.",
    ],
    sections=[
      dict(h="🔑 Ключи и темы из вашего ассортимента", p=[
        "Исходная точка это реальные категории и товары. От них модуль идёт к ключевым фразам и темам, а не к случайному списку из интернета. Если у вас уже есть свои ключи, их можно вставить текстом, загрузить из TXT, CSV, TSV или выгрузки Google Search Console, после чего связанные фразы кластеризуются.",
        "Можно создавать темы по нише или собирать их из выбранных вами ключей."]),
      dict(h="📊 Спрос по вашим же данным", p=[
        "Оценка спроса считается по заказам, проданному количеству и просмотрам товаров за выбранный период. То есть приоритет получают темы, связанные с товарами, которыми покупатели действительно интересуются."]),
      dict(h="🧠 Один провайдер для текста, другой для картинок", p=[
        "Для текстов и изображений настраиваются отдельные провайдеры и модели. Списки моделей подгружаются из API провайдера: поддерживаются OpenAI, Gemini и Cloudflare. Поэтому вы можете взять сильную текстовую модель для статьи и другую, более подходящую по цене, для картинок."]),
      dict(h="🖼️ От черновика до публикации", p=[
        "У статьи есть предпросмотр и SEO-проверка качества. Фото можно сгенерировать и перегенерировать, а готовый материал публикуется в поддерживаемые разделы блога. Длина статьи сверяется с заданной целью, чтобы текст не получился слишком коротким или раздутым.",
        "Внутренняя перелинковка контролируется: статья ссылается на ваши категории и товары, а не на что попало."]),
      dict(h="⏳ Очередь, повторы и cron", p=[
        "Задачи ставятся в постоянную очередь. Если запрос к провайдеру не удался, его повторяют, а работа по расписанию идёт через cron. Вы можете запустить очередь и вернуться, когда черновики будут готовы."]),
      dict(h="⚖️ Условия и разумный подход", p=[
        "Нужен API-ключ AI-провайдера. Лицензия Lifetime проверяется локально, и без активной лицензии рабочие функции заблокированы. Публикуйте материалы после редакторской проверки: модуль помогает с черновиками, но не заменяет редактора."]),
    ]),
  uk=dict(
    intro=[
      "Блог магазину потрібен, але писати про щось, не пов'язане з вашими товарами, безглуздо, а вигадувати теми щотижня виснажливо. AI Article Writer PRO йде від каталогу: він аналізує реальні категорії та товари, добирає SEO-ключі й теми, пише статті із зображеннями, перевіряє якість і публікує матеріали в блог.",
      "Важливе застереження в самому описі модуля: він тримається вашої ніші й не йде в сторонні галузі. Теми та ключі будуються за тим, що справді продається в магазині.",
    ],
    sections=[
      dict(h="🔑 Ключі й теми з вашого асортименту", p=[
        "Вихідна точка це реальні категорії та товари. Від них модуль іде до ключових фраз і тем, а не до випадкового списку з інтернету. Якщо у вас уже є власні ключі, їх можна вставити текстом, завантажити з TXT, CSV, TSV чи вивантаження Google Search Console, після чого пов'язані фрази кластеризуються.",
        "Можна створювати теми за нішею або збирати їх із обраних вами ключів."]),
      dict(h="📊 Попит за вашими ж даними", p=[
        "Оцінка попиту рахується за замовленнями, проданою кількістю та переглядами товарів за обраний період. Тобто пріоритет отримують теми, пов'язані з товарами, якими покупці справді цікавляться."]),
      dict(h="🧠 Один провайдер для тексту, інший для картинок", p=[
        "Для текстів і зображень налаштовуються окремі провайдери та моделі. Списки моделей підвантажуються з API провайдера: підтримуються OpenAI, Gemini та Cloudflare. Тож ви можете взяти потужну текстову модель для статті й іншу, вигіднішу за ціною, для картинок."]),
      dict(h="🖼️ Від чернетки до публікації", p=[
        "У статті є попередній перегляд і SEO-перевірка якості. Фото можна згенерувати та перегенерувати, а готовий матеріал публікується в підтримувані розділи блогу. Довжина статті звіряється із заданою метою, щоб текст не вийшов закоротким чи роздутим.",
        "Внутрішнє перелінкування контролюється: стаття посилається на ваші категорії й товари, а не на що попало."]),
      dict(h="⏳ Черга, повтори та cron", p=[
        "Завдання ставляться в постійну чергу. Якщо запит до провайдера не вдався, його повторюють, а робота за розкладом іде через cron. Ви можете запустити чергу й повернутися, коли чернетки будуть готові."]),
      dict(h="⚖️ Умови та розумний підхід", p=[
        "Потрібен API-ключ AI-провайдера. Ліцензія Lifetime перевіряється локально, і без активної ліцензії робочі функції заблоковані. Публікуйте матеріали після редакторської перевірки: модуль допомагає з чернетками, але не замінює редактора."]),
    ]),
  en=dict(
    intro=[
      "A store blog is useful, but writing about things unrelated to your products is pointless, and inventing topics every week is tiring. AI Article Writer PRO starts from the catalog: it analyzes real categories and products, selects SEO keywords and topics, writes articles with images, checks quality and publishes the material to the store blog.",
      "An important caveat is stated in the module itself: it stays in your niche and does not wander into unrelated industries. Topics and keywords are built from what the store actually sells.",
    ],
    sections=[
      dict(h="🔑 Keywords and topics from your own range", p=[
        "The starting point is real categories and products. From them the module moves to keyword phrases and topics rather than to a random list from the internet. If you already have your own keywords, you can paste them as text or load them from TXT, CSV, TSV or a Google Search Console export, after which related phrases are clustered.",
        "You can create topics for a niche or assemble them from keywords you picked."]),
      dict(h="📊 Demand from your own data", p=[
        "Demand is estimated from orders, units sold and product views over a chosen period. So the priority goes to topics tied to products customers genuinely care about."]),
      dict(h="🧠 One provider for text, another for pictures", p=[
        "Separate providers and models are configured for text and for images. Model lists are loaded from the provider API; OpenAI, Gemini and Cloudflare are supported. You can take a strong text model for the article and a different, more affordable one for the pictures."]),
      dict(h="🖼️ From draft to publication", p=[
        "An article has a preview and an SEO quality check. Photos can be generated and regenerated, and the finished piece is published to the supported blog sections. Article length is compared with the set target so the text is neither too short nor padded.",
        "Internal linking is controlled: the article links to your categories and products rather than to anything at random."]),
      dict(h="⏳ Queue, retries and cron", p=[
        "Tasks go into a persistent queue. If a provider request fails it is retried, and scheduled work runs through cron. You can start the queue and come back when the drafts are ready."]),
      dict(h="⚖️ Conditions and a sensible approach", p=[
        "An AI provider API key is required. The Lifetime license is checked locally, and without an active license the working functions are blocked. Publish material after an editor has reviewed it: the module helps with drafts but does not replace an editor."]),
    ]),
  cover=dict(
    tagline="SEO-статьи для блога по вашему каталогу",
    items=["Ключи из каталога", "Оценка спроса", "Кластеры фраз", "Статьи с фото", "Перелинковка", "Очередь и cron"],
    cards=[("Темы по ассортименту", "Строятся по реальным категориям и товарам"),
           ("Спрос по продажам", "Заказы, количество и просмотры за период"),
           ("Свои ключи", "Текст, TXT, CSV, TSV и Search Console"),
           ("Два провайдера", "Отдельные модели для текста и картинок"),
           ("Контроль качества", "Предпросмотр, SEO-проверка и длина статьи"),
           ("Очередь с повторами", "Фоновая работа через cron")],
    tabs=["Ключи", "Темы", "Очередь", "Статьи"],
    kpis=[("Тем", "48"), ("Черновиков", "12"), ("Опубликовано", "9")],
  ),
)
P[126] = dict(
  ru=dict(
    intro=[
      "Есть два совершенно разных типа писем, и модуль относится к ним по-разному. Первый: рассылка с подборкой товаров из каталога, баннером и промокодом. Второй: письмо, которое вы пишете сами от первой до последней строки в собственном дизайне. AI Newsletter PRO автономно закрывает оба сценария для OpenCart и ocStore.",
      "Искусственный интеллект здесь необязателен. Если подключить провайдера, он поможет с текстом, но решение всегда остаётся за вами, а подписчикам письмо уходит из очереди вашего магазина.",
    ],
    sections=[
      dict(h="🛍️ Товарный режим: один выпуск, один набор", p=[
        "Выпуск фиксирует набор товаров, текст, дизайн, баннер и промокод для всей аудитории. Состав подборки можно отредактировать до финальной генерации, так что вы не получите письмо с неожиданным товаром.",
        "Баннер собирается разными способами: автоколлаж из фото товаров, ваш собственный баннер, AI-фон с реальными фото или полностью AI-баннер."]),
      dict(h="✍️ Свободные письма", p=[
        "Если встроенный шаблон вам не нужен, используйте «Свободные письма»: многоязычное письмо создаётся в визуальном или HTML-редакторе и отправляется полностью вручную, без шаблона модуля."]),
      dict(h="🧱 Block Builder и дизайны", p=[
        "Структуру товарного письма задаёт Block Builder: можно менять порядок и включать или отключать блоки логотипа, баннера, заголовка, выгод, купона, товаров, CTA и контактов. Доступны 8 дизайнов, а блок отписки всегда остаётся последним."]),
      dict(h="🤖 AI один раз на язык", p=[
        "Поддерживаются OpenAI, Gemini, xAI Grok и Anthropic Claude. AI запускается один раз на язык, а не на каждого подписчика, поэтому расход на запросы не растёт вместе с размером списка."]),
      dict(h="📬 Очередь, расписание и доставка", p=[
        "Письма идут через единую очередь и расписание по SMTP или PHP Mail. Есть suppression-список, отслеживание и статистика. Для Twilio SendGrid, Mailgun, Brevo и Postmark доступны webhook-события доставки: Delivered, Bounce, Spam Complaint, Open и Click.",
        "Важно различать статусы. «Отправлено» означает только то, что почтовый транспорт принял письмо, а подтверждение доставки приходит от webhook провайдера."]),
      dict(h="🔁 Автоматизация и подписчики", p=[
        "Рассылки можно запускать по правилам и сценариям, а подписчики синхронизируются. Перед массовой отправкой используйте тестовое письмо и предпросмотр."]),
      dict(h="⚙️ Порядок настройки", p=[
        "Настройте SMTP и, при желании, AI-провайдера, создайте кампанию или правило автоматизации, подготовьте выпуск, отправьте тест и запускайте очередь. Webhook включайте только после настройки у самого почтового провайдера."]),
    ]),
  uk=dict(
    intro=[
      "Є два цілком різні типи листів, і модуль ставиться до них по-різному. Перший: розсилка з добіркою товарів із каталогу, банером і промокодом. Другий: лист, який ви пишете самі від першого до останнього рядка у власному дизайні. AI Newsletter PRO автономно закриває обидва сценарії для OpenCart та ocStore.",
      "Штучний інтелект тут необов'язковий. Якщо підключити провайдера, він допоможе з текстом, але рішення завжди залишається за вами, а передплатникам лист іде з черги вашого магазину.",
    ],
    sections=[
      dict(h="🛍️ Товарний режим: один випуск, один набір", p=[
        "Випуск фіксує набір товарів, текст, дизайн, банер і промокод для всієї аудиторії. Склад добірки можна відредагувати до фінальної генерації, тож ви не отримаєте лист із несподіваним товаром.",
        "Банер збирається різними способами: автоколаж із фото товарів, ваш власний банер, AI-тло з реальними фото або повністю AI-банер."]),
      dict(h="✍️ Вільні листи", p=[
        "Якщо вбудований шаблон вам не потрібен, скористайтеся «Вільними листами»: багатомовний лист створюється у візуальному або HTML-редакторі й надсилається повністю вручну, без шаблону модуля."]),
      dict(h="🧱 Block Builder і дизайни", p=[
        "Структуру товарного листа задає Block Builder: можна змінювати порядок і вмикати чи вимикати блоки логотипа, банера, заголовка, вигод, купона, товарів, CTA та контактів. Доступні 8 дизайнів, а блок відписки завжди лишається останнім."]),
      dict(h="🤖 AI один раз на мову", p=[
        "Підтримуються OpenAI, Gemini, xAI Grok та Anthropic Claude. AI запускається один раз на мову, а не на кожного передплатника, тому витрати на запити не ростуть разом з розміром списку."]),
      dict(h="📬 Черга, розклад і доставка", p=[
        "Листи йдуть через єдину чергу та розклад по SMTP або PHP Mail. Є suppression-список, відстеження та статистика. Для Twilio SendGrid, Mailgun, Brevo і Postmark доступні webhook-події доставки: Delivered, Bounce, Spam Complaint, Open та Click.",
        "Важливо розрізняти статуси. «Надіслано» означає лише те, що поштовий транспорт прийняв лист, а підтвердження доставки приходить від webhook провайдера."]),
      dict(h="🔁 Автоматизація й передплатники", p=[
        "Розсилки можна запускати за правилами та сценаріями, а передплатники синхронізуються. Перед масовим надсиланням скористайтеся тестовим листом і попереднім переглядом."]),
      dict(h="⚙️ Порядок налаштування", p=[
        "Налаштуйте SMTP та, за бажанням, AI-провайдера, створіть кампанію чи правило автоматизації, підготуйте випуск, надішліть тест і запускайте чергу. Webhook вмикайте лише після налаштування в самого поштового провайдера."]),
    ]),
  en=dict(
    intro=[
      "There are two quite different kinds of e-mail, and the module treats them differently. The first is a mailing with a selection of catalog products, a banner and a promo code. The second is a letter you write yourself from the first line to the last in your own design. AI Newsletter PRO covers both scenarios on its own for OpenCart and ocStore.",
      "Artificial intelligence is optional here. If you connect a provider, it helps with the text, but the decision always stays with you, and subscribers receive the e-mail from your own store's queue.",
    ],
    sections=[
      dict(h="🛍️ Product mode: one issue, one set", p=[
        "An issue fixes the set of products, the text, the design, the banner and the promo code for the whole audience. The selection can be edited before the final generation, so you will not get an e-mail with an unexpected product.",
        "The banner can be built in several ways: an automatic collage of product photos, your own banner, an AI background with real photos, or a fully AI-made banner."]),
      dict(h="✍️ Free-form letters", p=[
        "If you do not want the built-in template, use Free letters: a multilingual message is created in a visual or HTML editor and sent entirely by hand, without the module's template."]),
      dict(h="🧱 Block Builder and designs", p=[
        "The structure of a product e-mail is set by the Block Builder: you can reorder blocks and switch on or off the logo, banner, headline, benefits, coupon, products, CTA and contacts. Eight designs are available, and the unsubscribe block always stays last."]),
      dict(h="🤖 AI once per language", p=[
        "OpenAI, Gemini, xAI Grok and Anthropic Claude are supported. AI runs once per language, not once per subscriber, so request costs do not grow with the size of the list."]),
      dict(h="📬 Queue, schedule and delivery", p=[
        "E-mails go through a single queue and schedule over SMTP or PHP Mail. A suppression list, tracking and statistics are included. For Twilio SendGrid, Mailgun, Brevo and Postmark, delivery webhook events are available: Delivered, Bounce, Spam Complaint, Open and Click.",
        "It matters to tell the statuses apart. Sent only means the mail transport accepted the message, while confirmation of delivery comes from the provider webhook."]),
      dict(h="🔁 Automation and subscribers", p=[
        "Mailings can start from rules and scenarios, and subscribers are synchronized. Use the test e-mail and the preview before a mass send."]),
      dict(h="⚙️ Setup order", p=[
        "Set up SMTP and, if you wish, an AI provider, create a campaign or automation rule, prepare an issue, send a test and start the queue. Enable the webhook only after configuring it at the mail provider itself."]),
    ]),
  cover=dict(
    tagline="Товарные и свободные email-рассылки",
    items=["Товарные выпуски", "Свободные письма", "Block Builder", "8 дизайнов", "Очередь и SMTP", "Статистика"],
    cards=[("Один выпуск", "Набор товаров, текст, баннер и промокод"),
           ("Свободные письма", "Свой дизайн в визуальном или HTML-редакторе"),
           ("AI не обязателен", "OpenAI, Gemini, Grok, Claude; раз на язык"),
           ("Баннеры", "Коллаж, свой баннер, AI-фон или AI-баннер"),
           ("Webhook доставки", "SendGrid, Mailgun, Brevo и Postmark"),
           ("Автоматизация", "Правила, сценарии и тестовая отправка")],
    tabs=["Кампании", "Письма", "Очередь", "Статистика"],
    kpis=[("Подписчиков", "5 240"), ("В очереди", "820"), ("Кликов", "312")],
  ),
)
P[127] = dict(
  ru=dict(
    intro=[
      "Открываете карточку товара, нажимаете «AI SEO», выбираете язык и операцию, и модуль предлагает текст: создать описание, улучшить имеющееся, перевести или проверить. Результат вставляется в открытую форму, и только вы решаете, сохранять его штатной кнопкой OpenCart или нет. AI Content PRO не пишет в базу втихую.",
      "Работает модуль с товарами, категориями и информационными страницами через внешних AI-провайдеров. Когда записей много, их можно отправить в очередь и обработать пакетом.",
    ],
    sections=[
      dict(h="🔌 Провайдеры и ключи", p=[
        "Поддерживаются OpenAI, Gemini, DeepSeek, Grok, OpenRouter и любой OpenAI-совместимый API. Ключи хранятся на сервере и скрыты в интерфейсе. После ввода ключа его можно проверить и обновить список моделей прямо из админки.",
        "Для работы нужен собственный API-ключ, который оплачивается у провайдера."]),
      dict(h="🧱 Rich Content Builder", p=[
        "Описание собирается из смысловых блоков H2–H5. Вы задаёте порядок, включаете и отключаете блоки, а AI-планировщик предлагает структуру по фактам товара. Если не понравился один блок, перегенерируйте только его, а не весь текст."]),
      dict(h="🔀 Как соединять с текущим описанием", p=[
        "Есть четыре режима: Replace заменяет старое, Before ставит новый текст перед ним, After добавляет после, Smart Merge объединяет аккуратнее. Это полезно, когда в описании уже есть ручная работа, которую жалко терять."]),
      dict(h="📦 Массовая работа через очередь", p=[
        "Постоянная очередь повторяет запросы при ошибках, умеет переходить на резервные провайдеры и модели и запускается по cron. Перед стартом модуль оценивает число запросов и токенов, поэтому расходы понятны заранее."]),
      dict(h="🔎 SEO-аудит и откат", p=[
        "SEO-аудит каталога включает проверку лимита Google Merchant: описание не должно превышать 5000 символов. Есть и «техническая очистка» без AI. Теги товара генерируются отдельно, а история изменений позволяет вернуть прежнее описание."]),
      dict(h="🖼️ Image Slots и связка с Image Studio", p=[
        "Задания на изображения можно передать в AI Image Studio PRO. Они остаются черновиками до вашего решения. Интерфейс и тексты доступны на украинском, русском и английском."]),
      dict(h="⚠️ Перед запуском", p=[
        "Модуль устанавливается выключенным. Сначала проверьте его на тестовой копии магазина, а затем включайте в рабочем."]),
    ]),
  uk=dict(
    intro=[
      "Відкриваєте картку товару, натискаєте «AI SEO», обираєте мову й операцію, і модуль пропонує текст: створити опис, поліпшити наявний, перекласти або перевірити. Результат вставляється у відкриту форму, і лише ви вирішуєте, зберігати його штатною кнопкою OpenCart чи ні. AI Content PRO не пише в базу крадькома.",
      "Модуль працює з товарами, категоріями та інформаційними сторінками через зовнішніх AI-провайдерів. Коли записів багато, їх можна відправити в чергу й обробити пакетом.",
    ],
    sections=[
      dict(h="🔌 Провайдери та ключі", p=[
        "Підтримуються OpenAI, Gemini, DeepSeek, Grok, OpenRouter і будь-який OpenAI-сумісний API. Ключі зберігаються на сервері й приховані в інтерфейсі. Після введення ключа його можна перевірити та оновити список моделей просто з адмінки.",
        "Для роботи потрібен власний API-ключ, який оплачується в провайдера."]),
      dict(h="🧱 Rich Content Builder", p=[
        "Опис збирається зі змістових блоків H2–H5. Ви задаєте порядок, вмикаєте й вимикаєте блоки, а AI-планувальник пропонує структуру за фактами товару. Якщо не сподобався один блок, перегенеруйте лише його, а не весь текст."]),
      dict(h="🔀 Як поєднувати з поточним описом", p=[
        "Є чотири режими: Replace замінює старе, Before ставить новий текст перед ним, After додає після, Smart Merge поєднує акуратніше. Це корисно, коли в описі вже є ручна робота, яку шкода втрачати."]),
      dict(h="📦 Масова робота через чергу", p=[
        "Постійна черга повторює запити при помилках, уміє переходити на резервні провайдери та моделі й запускається за cron. Перед стартом модуль оцінює кількість запитів і токенів, тож витрати зрозумілі наперед."]),
      dict(h="🔎 SEO-аудит і відкат", p=[
        "SEO-аудит каталогу містить перевірку ліміту Google Merchant: опис не повинен перевищувати 5000 символів. Є й «технічне очищення» без AI. Теги товару генеруються окремо, а історія змін дає змогу повернути попередній опис."]),
      dict(h="🖼️ Image Slots і зв'язок з Image Studio", p=[
        "Завдання на зображення можна передати в AI Image Studio PRO. Вони залишаються чернетками до вашого рішення. Інтерфейс і тексти доступні українською, російською та англійською."]),
      dict(h="⚠️ Перед запуском", p=[
        "Модуль встановлюється вимкненим. Спершу перевірте його на тестовій копії магазину, а потім вмикайте в робочому."]),
    ]),
  en=dict(
    intro=[
      "You open a product card, press AI SEO, pick a language and an operation, and the module proposes text: create a description, improve the existing one, translate or check it. The result is inserted into the open form, and only you decide whether to save it with the standard OpenCart button. AI Content PRO never writes to the database behind your back.",
      "The module works with products, categories and information pages through external AI providers. When there are many records, they can be sent to a queue and processed as a batch.",
    ],
    sections=[
      dict(h="🔌 Providers and keys", p=[
        "OpenAI, Gemini, DeepSeek, Grok, OpenRouter and any OpenAI-compatible API are supported. Keys are stored on the server and hidden in the interface. After entering a key you can verify it and refresh the model list right from the admin.",
        "You need your own API key, which is paid for at the provider."]),
      dict(h="🧱 Rich Content Builder", p=[
        "A description is assembled from meaningful H2–H5 blocks. You set the order, switch blocks on and off, and an AI planner proposes a structure from the product facts. If one block does not suit you, regenerate only that block instead of the entire text."]),
      dict(h="🔀 How to combine with the current description", p=[
        "There are four modes: Replace overwrites the old text, Before puts the new text ahead of it, After appends it, and Smart Merge combines them more carefully. This helps when the description already contains manual work you would hate to lose."]),
      dict(h="📦 Bulk work through the queue", p=[
        "The persistent queue retries on errors, can fall back to reserve providers and models, and runs on cron. Before starting, the module estimates the number of requests and tokens, so costs are clear in advance."]),
      dict(h="🔎 SEO audit and rollback", p=[
        "The catalog SEO audit includes a check against the Google Merchant limit: a description must not exceed 5000 characters. There is also a technical cleanup that needs no AI. Product tags are generated separately, and the change history lets you restore the previous description."]),
      dict(h="🖼️ Image Slots and the link to Image Studio", p=[
        "Image tasks can be handed to AI Image Studio PRO. They remain drafts until you decide. The interface and texts are available in Ukrainian, Russian and English."]),
      dict(h="⚠️ Before you start", p=[
        "The module is installed switched off. Try it on a test copy of the store first, then enable it in the live one."]),
    ]),
  cover=dict(
    tagline="AI-тексты для товаров, категорий и страниц",
    items=["AI SEO в форме", "Rich Content", "Режимы слияния", "Очередь и cron", "SEO-аудит", "История и откат"],
    cards=[("Создать и улучшить", "Описание, перевод и проверка текстов"),
           ("Блоки H2-H5", "Порядок, планировщик и перегенерация блока"),
           ("Replace и Smart Merge", "Четыре режима слияния с описанием"),
           ("Массовая очередь", "Резервные модели и оценка токенов"),
           ("Лимит Merchant", "Проверка описания до 5000 символов"),
           ("Откат изменений", "История и возврат прежнего описания")],
    tabs=["Провайдеры", "Контент", "Очередь", "Аудит"],
    kpis=[("Текстов", "428"), ("В очереди", "64"), ("Откатов", "3")],
  ),
)
P[128] = dict(
  ru=dict(
    intro=[
      "Фото товара тёмное, фон пёстрый, а у поставщика картинка вообще 300 пикселей. Переснимать сотни позиций нет смысла, но и оставлять как есть жалко. AI Image Studio PRO сначала проверяет изображения каталога OpenCart, а затем создаёт контролируемые AI-черновики: удаляет или заменяет фон, улучшает фото, делает коммерческий packshot, генерирует картинку по промпту и дорабатывает результат.",
      "Главный принцип в том, что исходный файл автоматически не перезаписывается. Всё, что делает AI, остаётся кандидатом, пока вы не примете его.",
    ],
    sections=[
      dict(h="🔍 Сначала диагностика", p=[
        "Анализ каталога находит маленькие, тяжёлые, повреждённые и дублирующиеся изображения и даёт рекомендации. Так видно, какие фото действительно требуют работы, а какие можно не трогать."]),
      dict(h="🗂️ Mass AI Studio", p=[
        "Для пакетной работы выбираются товары по названию, модели, SKU, категории, производителю и результату проверки. До запуска очереди модуль оценивает число задач и стоимость, поэтому вы не узнаете о расходе постфактум."]),
      dict(h="🎞️ Кандидаты, версии и откат", p=[
        "Результат попадает в предпросмотр и применяется только после того, как вы его приняли. Если версия оказалась неудачной, можно откатиться. Оригиналы сохраняются, поэтому эксперименты не опасны."]),
      dict(h="🎨 Единый Prompt Engine", p=[
        "Промпты и сцены собраны в библиотеки и управляются единым движком. Можно задавать масштаб предмета в кадре, его положение, освещение и пропорции, чтобы фотографии товаров выглядели однородно."]),
      dict(h="🔌 Провайдеры и запасные модели", p=[
        "Подключаются OpenAI (GPT Image 2 по умолчанию), Gemini и Bria с режимами Product Cutout, белый Packshot и Lifestyle Shot. Если одна модель не справилась, срабатывает цепочка резервных моделей и провайдеров."]),
      dict(h="📌 Куда попадает результат", p=[
        "Картинку можно поставить главным или дополнительным фото либо вставить в описание в редакторах Summernote, CKEditor или TinyMCE. Точные Image Slots приходят из AI Content PRO. Очередь работает по cron, а журнал API-запросов и HTML-снимки описаний помогают разобраться, что и когда менялось."]),
      dict(h="⚠️ Границы и условия", p=[
        "Модуль работает только с изображениями: SEO-тексты, описания и отзывы он не генерирует. Нужны API-ключи провайдеров изображений. Модуль устанавливается выключенным, и в состоянии OFF очереди, cron и запросы к API не выполняются."]),
    ]),
  uk=dict(
    intro=[
      "Фото товару темне, тло строкате, а в постачальника картинка взагалі 300 пікселів. Перезнімати сотні позицій немає сенсу, але й лишати як є шкода. AI Image Studio PRO спершу перевіряє зображення каталогу OpenCart, а потім створює контрольовані AI-чернетки: видаляє чи замінює тло, поліпшує фото, робить комерційний packshot, генерує картинку за промптом і доопрацьовує результат.",
      "Головний принцип у тому, що вихідний файл автоматично не перезаписується. Усе, що робить AI, лишається кандидатом, доки ви його не приймете.",
    ],
    sections=[
      dict(h="🔍 Спершу діагностика", p=[
        "Аналіз каталогу знаходить малі, важкі, пошкоджені й дубльовані зображення та дає рекомендації. Так видно, які фото справді потребують роботи, а які можна не чіпати."]),
      dict(h="🗂️ Mass AI Studio", p=[
        "Для пакетної роботи обираються товари за назвою, моделлю, SKU, категорією, виробником і результатом перевірки. До запуску черги модуль оцінює кількість завдань і вартість, тож ви не дізнаєтесь про витрати постфактум."]),
      dict(h="🎞️ Кандидати, версії та відкат", p=[
        "Результат потрапляє в попередній перегляд і застосовується лише після того, як ви його прийняли. Якщо версія виявилася невдалою, можна відкотитися. Оригінали зберігаються, тож експерименти не небезпечні."]),
      dict(h="🎨 Єдиний Prompt Engine", p=[
        "Промпти та сцени зібрано в бібліотеки й керовано єдиним рушієм. Можна задавати масштаб предмета в кадрі, його положення, освітлення та пропорції, щоб фотографії товарів виглядали однорідно."]),
      dict(h="🔌 Провайдери та запасні моделі", p=[
        "Підключаються OpenAI (GPT Image 2 за замовчуванням), Gemini та Bria з режимами Product Cutout, білий Packshot і Lifestyle Shot. Якщо одна модель не впоралася, спрацьовує ланцюжок резервних моделей і провайдерів."]),
      dict(h="📌 Куди потрапляє результат", p=[
        "Картинку можна поставити головним або додатковим фото чи вставити в опис у редакторах Summernote, CKEditor або TinyMCE. Точні Image Slots приходять з AI Content PRO. Черга працює за cron, а журнал API-запитів і HTML-знімки описів допомагають розібратися, що й коли змінювалося."]),
      dict(h="⚠️ Межі та умови", p=[
        "Модуль працює лише із зображеннями: SEO-тексти, описи та відгуки він не генерує. Потрібні API-ключі провайдерів зображень. Модуль встановлюється вимкненим, і в стані OFF черги, cron та запити до API не виконуються."]),
    ]),
  en=dict(
    intro=[
      "The product photo is dark, the background is busy, and the supplier's picture is only 300 pixels wide. Reshooting hundreds of items makes no sense, but leaving them as they are is a pity. AI Image Studio PRO first inspects the images of an OpenCart catalog and then creates controlled AI drafts: removes or replaces the background, enhances the photo, makes a commercial packshot, generates a picture from a prompt and refines the result.",
      "The main principle is that the original file is not overwritten automatically. Whatever the AI produces stays a candidate until you accept it.",
    ],
    sections=[
      dict(h="🔍 Diagnostics first", p=[
        "Catalog analysis finds small, heavy, corrupted and duplicate images and gives recommendations. You can see which photos really need work and which can be left alone."]),
      dict(h="🗂️ Mass AI Studio", p=[
        "For batch work you select products by name, model, SKU, category, manufacturer and check result. Before the queue starts, the module estimates the number of tasks and the cost, so you do not learn about spending after the fact."]),
      dict(h="🎞️ Candidates, versions and rollback", p=[
        "A result goes to preview and is applied only after you accept it. If a version turns out badly you can roll back. Originals are preserved, so experiments are not risky."]),
      dict(h="🎨 One Prompt Engine", p=[
        "Prompts and scenes are organized in libraries and driven by a single engine. You can set the scale of the item in the frame, its position, lighting and proportions so that product photos look consistent."]),
      dict(h="🔌 Providers and fallback models", p=[
        "OpenAI (GPT Image 2 by default), Gemini and Bria are supported, the latter with Product Cutout, white Packshot and Lifestyle Shot. If one model fails, a chain of fallback models and providers takes over."]),
      dict(h="📌 Where the result goes", p=[
        "A picture can become the main or an additional photo, or be inserted into the description in Summernote, CKEditor or TinyMCE. Precise Image Slots come from AI Content PRO. The queue runs on cron, and the API request log together with HTML snapshots of descriptions help you trace what changed and when."]),
      dict(h="⚠️ Limits and conditions", p=[
        "The module works with images only: it does not generate SEO texts, descriptions or reviews. API keys of the image providers are required. The module is installed switched off, and in the OFF state queues, cron and API requests do not run."]),
    ]),
  cover=dict(
    tagline="AI-обработка товарных фото с контролем",
    items=["Анализ каталога", "Удаление фона", "Packshot", "Mass AI Studio", "Версии и откат", "Журнал API"],
    cards=[("Проверка качества", "Мелкие, тяжёлые, битые и дубли"),
           ("Фон и packshot", "Удаление, замена, улучшение и промпт"),
           ("Оценка стоимости", "Число задач и цена до запуска очереди"),
           ("Кандидаты", "Предпросмотр и применение после принятия"),
           ("Три провайдера", "OpenAI, Gemini, Bria и запасные модели"),
           ("Оригиналы целы", "Исходный файл не перезаписывается")],
    tabs=["Анализ", "Студия", "Очередь", "Кандидаты"],
    kpis=[("Проверено", "2 140"), ("Задач", "180"), ("Принято", "96")],
  ),
)

def _x(pid, lang, intro, h, ps):
    P[pid][lang]['intro'].append(intro)
    P[pid][lang]['sections'].append(dict(h=h, p=ps))

_x(63,'ru',"Практически это выглядит так: вы подключаете модель, наполняете знания, прогоняете тесты и включаете виджет, а дальше следите за диалогами в админке и подправляете правила там, где ответ вас не устроил.",
 "📈 Как отслеживать качество", ["Каждый диалог сохраняется, а покупатели могут оценивать ответы. Низкие оценки и список вопросов без ответа показывают, где не хватает данных: в базе знаний, в описании товара или в правилах поведения. Исправили, прогнали регрессионные сценарии и убедились, что остальные ответы не поплыли.","Лиды собираются с именем, телефоном и e-mail. Менеджер видит контекст беседы и может сразу предложить подходящий товар или аналог, а не начинать разговор с вопроса «чем могу помочь?». Так посетитель, который не нашёл нужное, не уходит молча."])
_x(63,'uk',"Практично це виглядає так: ви підключаєте модель, наповнюєте знання, проганяєте тести й вмикаєте віджет, а далі стежите за діалогами в адмінці та підправляєте правила там, де відповідь вас не влаштувала.",
 "📈 Як відстежувати якість", ["Кожен діалог зберігається, а покупці можуть оцінювати відповіді. Низькі оцінки та перелік запитань без відповіді показують, де бракує даних: у базі знань, в описі товару чи в правилах поведінки. Виправили, прогнали регресійні сценарії та переконалися, що решта відповідей не попливла.","Ліди збираються з ім'ям, телефоном та e-mail. Менеджер бачить контекст розмови й може одразу запропонувати відповідний товар чи аналог, а не починати розмову із запитання «чим можу допомогти?». Так відвідувач, який не знайшов потрібне, не йде мовчки."])
_x(63,'en',"In practice it goes like this: you connect a model, fill in the knowledge, run the tests and switch the widget on, then watch the dialogues in the admin and adjust the rules wherever an answer did not satisfy you.",
 "📈 Keeping an eye on quality", ["Every dialogue is stored, and customers can rate the answers. Low ratings and the list of unanswered questions show where data is missing: in the knowledge base, a product description or the behavior rules. Fix it, run the regression scenarios and confirm the other answers did not drift.","Leads are collected with name, phone and e-mail. A manager sees the conversation context and can immediately offer a suitable product or alternative instead of opening with a generic question. A visitor who did not find what they needed does not leave silently."])

_x(64,'ru',"Модуль устроен просто: он не пытается угадывать намерения покупателя, а аккуратно фиксирует незавершённые корзины и даёт вам понятные рычаги: что писать, когда и на каком языке.",
 "🔄 Типичный сценарий", ["Посетитель выбрал два товара, дошёл до оформления и ушёл. Корзина появляется в списке, а по вашему расписанию клиенту уходит письмо по шаблону на его языке. Нажав на ссылку, он попадает в восстановленную корзину и заканчивает заказ. В списке эта корзина получает отметку о покупке.","Если же письмо не помогло, запись остаётся в списке как брошенная, и вы можете посмотреть её состав. Это помогает понять, какие товары люди чаще оставляют в корзине, и при необходимости поправить текст напоминания.","Начать лучше с шаблона по умолчанию, отправить тестовое письмо себе и только потом подключать cron."])
_x(64,'uk',"Модуль влаштований просто: він не намагається вгадувати наміри покупця, а акуратно фіксує незавершені кошики й дає вам зрозумілі важелі: що писати, коли та якою мовою.",
 "🔄 Типовий сценарій", ["Відвідувач обрав два товари, дійшов до оформлення й пішов. Кошик з'являється у списку, а за вашим розкладом клієнту йде лист за шаблоном його мовою. Натиснувши на посилання, він потрапляє у відновлений кошик і завершує замовлення. У списку цей кошик отримує позначку про покупку.","Якщо ж лист не допоміг, запис залишається в списку як покинутий, і ви можете переглянути його склад. Це допомагає зрозуміти, які товари люди частіше лишають у кошику, і за потреби поправити текст нагадування.","Почати краще з шаблону за замовчуванням, надіслати тестовий лист собі й лише потім підключати cron."])
_x(64,'en',"The module is simple by design: it does not try to guess the buyer's intent but neatly records unfinished carts and hands you clear levers: what to write, when and in which language.",
 "🔄 A typical scenario", ["A visitor picked two products, reached checkout and left. The cart appears in the list, and on your schedule the customer receives an e-mail from a template in their language. Clicking the link lands them in the restored cart, and they finish the order. In the list that cart gets a purchase mark.","If the e-mail did not help, the entry stays in the list as abandoned and you can look at its contents. That helps you see which products people leave in the cart most often and, if needed, adjust the reminder text.","It is best to start with the default template, send a test e-mail to yourself and only then connect cron."])

_x(73,'ru',"Эта связка подходит и для разовой загрузки большого прайса, и для ежедневной синхронизации по расписанию, причём поведение в обоих случаях управляется теми же правилами.",
 "🧭 Пример рабочего процесса", ["Допустим, у поставщика есть YML по ссылке. Вы создаёте профиль, указываете источник, сопоставляете колонки полям магазина, назначаете категории и наценку. Затем запускаете «Тест 10 строк» и смотрите предпросмотр: цены, названия, категории. Если всё верно, делаете тестовый импорт без записи, а потом реальный запуск.","После этого достаточно включить cron с токеном и режим «цены и остатки», чтобы описания и фотографии, которые вы правили вручную, не перезаписывались. За тем, что происходило при каждом запуске, можно следить по журналу операций."])
_x(73,'uk',"Ця зв'язка підходить і для разового завантаження великого прайсу, і для щоденної синхронізації за розкладом, причому поведінка в обох випадках керується тими самими правилами.",
 "🧭 Приклад робочого процесу", ["Припустімо, у постачальника є YML за посиланням. Ви створюєте профіль, вказуєте джерело, зіставляєте колонки з полями магазину, призначаєте категорії та націнку. Потім запускаєте «Тест 10 рядків» і дивитесь попередній перегляд: ціни, назви, категорії. Якщо все вірно, робите тестовий імпорт без запису, а потім справжній запуск.","Після цього досить увімкнути cron із токеном і режим «ціни та залишки», щоб описи й фотографії, які ви правили вручну, не перезаписувалися. За тим, що відбувалося під час кожного запуску, можна стежити за журналом операцій."])
_x(73,'en',"This combination suits a one-off load of a big price list as well as a daily scheduled sync, and in both cases behavior is governed by the same rules.",
 "🧭 A sample workflow", ["Suppose a supplier has a YML at a URL. You create a profile, specify the source, map the columns to store fields and assign categories and a markup. Then you run the 10-row test and look at the preview: prices, names, categories. If everything is right you do a test import without writing, and then the real run.","After that it is enough to enable cron with a token and the prices and stock mode, so the descriptions and photos you edited by hand are not overwritten. What happened at each run can be followed in the operations journal."])

_x(91,'ru',"Все функции включаются по разделам, поэтому можно начать с малого, например только с llms.txt и диагностики, а остальное подключать по мере необходимости.",
 "🚀 С чего начать", ["Включите нужные разделы и примените профиль, затем сгенерируйте файлы и откройте предпросмотр. Тестовая генерация без записи файлов позволяет увидеть результат до публикации. Когда файлы готовы, пройдитесь по диагностике: она подскажет, не закрывает ли robots.txt нужные адреса и отвечают ли endpoints.","После этого настройте cron и IndexNow, чтобы изменения в каталоге доходили до поисковиков без вашего участия. Если нужен доступ для AI-агентов, включите WebMCP отдельно и убедитесь, что он отдаёт только публичные данные."])
_x(91,'uk',"Усі функції вмикаються за розділами, тож можна почати з малого, наприклад лише з llms.txt і діагностики, а решту підключати в міру потреби.",
 "🚀 З чого почати", ["Увімкніть потрібні розділи й застосуйте профіль, потім згенеруйте файли та відкрийте попередній перегляд. Тестова генерація без запису файлів дає змогу побачити результат до публікації. Коли файли готові, пройдіться діагностикою: вона підкаже, чи не закриває robots.txt потрібні адреси і чи відповідають endpoints.","Після цього налаштуйте cron та IndexNow, щоб зміни в каталозі доходили до пошуковиків без вашої участі. Якщо потрібен доступ для AI-агентів, увімкніть WebMCP окремо та переконайтеся, що він віддає лише публічні дані."])
_x(91,'en',"Every function is enabled by section, so you can start small, say with only llms.txt and diagnostics, and add the rest as needed.",
 "🚀 Where to begin", ["Enable the sections you need and apply a profile, then generate the files and open the preview. Test generation without writing files lets you see the outcome before publishing. When the files are ready, walk through diagnostics: it will tell you whether robots.txt blocks the addresses you need and whether the endpoints respond.","After that set up cron and IndexNow so catalog changes reach search engines without your involvement. If you need access for AI agents, enable WebMCP separately and make sure it serves public data only."])

_x(118,'ru',"Модуль полезен перед переездом на новую версию, при чистке хостинга и просто когда в списке расширений накопилось слишком много лишнего.",
 "🧹 Деинсталляция и полное удаление", ["Это два разных шага. Штатная деинсталляция убирает расширение из магазина так, как это делает сам OpenCart. Полное удаление файлов предлагается только тогда, когда принадлежность файлов подтверждена. Если файлы могут использоваться другим расширением, модуль заблокирует автоматическое удаление и назовёт причину.","Опасные операции требуют отдельного подтверждения, а резервную ZIP-копию с manifest.json вы получаете до того, как что-либо исчезнет с диска. Проверяемость копии важна: по manifest.json видно, что именно в неё вошло."])
_x(118,'uk',"Модуль корисний перед переїздом на нову версію, під час чищення хостингу й просто коли в списку розширень назбиралося забагато зайвого.",
 "🧹 Деінсталяція та повне видалення", ["Це два різні кроки. Штатна деінсталяція прибирає розширення з магазину так, як це робить сам OpenCart. Повне видалення файлів пропонується лише тоді, коли належність файлів підтверджена. Якщо файли можуть використовуватися іншим розширенням, модуль заблокує автоматичне видалення й назве причину.","Небезпечні операції потребують окремого підтвердження, а резервну ZIP-копію з manifest.json ви отримуєте до того, як щось зникне з диска. Можливість перевірки копії важлива: за manifest.json видно, що саме до неї ввійшло."])
_x(118,'en',"The module is useful before moving to a new version, when tidying up hosting, and simply when the extension list has collected too much clutter.",
 "🧹 Uninstall versus full removal", ["These are two separate steps. The standard uninstall removes the extension from the store the way OpenCart itself does. Full file deletion is offered only when file ownership is confirmed. If files may be used by another extension, the module blocks automatic removal and names the reason.","Dangerous operations need separate confirmation, and you get the backup ZIP with manifest.json before anything disappears from disk. A verifiable copy matters: manifest.json shows exactly what went into it."])

_x(122,'ru',"Модуль рассчитан на то, чтобы защита росла постепенно: сначала вы наблюдаете, потом включаете блокировку именно тех правил, в которых уверены.",
 "🔍 Что вы видите в админке", ["Журнал показывает, какие запросы и по каким правилам попали под проверку. Вкладка «Посетители» помогает отличить живых людей от агрессивных ботов, а анализ активности показывает, кто и как часто обращается к магазину.","Если какой-то адрес заблокирован ошибочно, его можно разблокировать вручную, а доверенные источники занести в белый список. Для платёжных систем, API и cron стоит заранее настроить исключения, ведь именно такие обращения проще всего принять за подозрительные."])
_x(122,'uk',"Модуль розрахований на те, щоб захист зростав поступово: спершу ви спостерігаєте, потім вмикаєте блокування саме тих правил, у яких певні.",
 "🔍 Що ви бачите в адмінці", ["Журнал показує, які запити та за якими правилами потрапили під перевірку. Вкладка «Відвідувачі» допомагає відрізнити живих людей від агресивних ботів, а аналіз активності показує, хто і як часто звертається до магазину.","Якщо якусь адресу заблоковано помилково, її можна розблокувати вручну, а довірені джерела внести до білого списку. Для платіжних систем, API та cron варто заздалегідь налаштувати винятки, адже саме такі звернення найпростіше сприйняти за підозрілі."])
_x(122,'en',"The module is designed so that protection grows gradually: first you observe, then you turn on blocking for exactly the rules you are sure about.",
 "🔍 What you see in the admin", ["The log shows which requests were inspected and by which rules. The Visitors tab helps tell living people from aggressive bots, and the activity analysis shows who contacts the store and how often.","If an address is blocked by mistake, it can be unblocked by hand, and trusted sources can be added to a whitelist. It is worth setting exceptions in advance for payment systems, the API and cron, since exactly those calls are the easiest to mistake for suspicious ones."])

_x(123,'ru',"Подготовка файла остаётся за вами: модуль не угадывает смысл колонок, а просит сопоставить их с полями и затем следит, чтобы каждое значение попало туда, куда задумано.",
 "🔁 Реальная последовательность", ["Вы готовите CSV и сопоставляете колонки с полями каталога, выбираете режим, например upsert, и политики для полей. Запускаете тестовый режим, смотрите строки в статусе review и ошибки. Только после этого идёт реальный импорт, ход которого видно в очереди.","Для регулярного обмена удобны быстрые режимы: одним файлом обновляются только цены или только остатки, а остальные поля остаются нетронутыми. А при экспорте поддерживаемые поля выгружаются потоком, и файл можно снова загрузить обратно."])
_x(123,'uk',"Підготовка файлу лишається за вами: модуль не вгадує зміст колонок, а просить зіставити їх з полями й потім стежить, щоб кожне значення потрапило туди, куди задумано.",
 "🔁 Реальна послідовність", ["Ви готуєте CSV і зіставляєте колонки з полями каталогу, обираєте режим, наприклад upsert, та політики для полів. Запускаєте тестовий режим, дивитесь рядки в статусі review та помилки. Лише після цього йде справжній імпорт, хід якого видно в черзі.","Для регулярного обміну зручні швидкі режими: одним файлом оновлюються тільки ціни або тільки залишки, а решта полів лишається недоторканою. А під час експорту підтримувані поля вивантажуються потоком, і файл можна знову завантажити назад."])
_x(123,'en',"Preparing the file stays with you: the module does not guess what columns mean but asks you to map them to fields and then makes sure each value lands where intended.",
 "🔁 The real sequence", ["You prepare a CSV and map columns to catalog fields, pick a mode such as upsert and the field policies. Run the test mode and review the rows with the review status and the errors. Only then does the real import run, and its progress is visible in the queue.","For regular exchange the quick modes are handy: one file updates only prices or only stock while the other fields remain untouched. On export, supported fields are streamed out, and the file can be loaded back in."])

_x(124,'ru',"Чтобы модуль приносил пользу, ему нужны данные магазина: чем лучше заполнены категории и товары, тем осмысленнее получатся темы и тексты.",
 "📝 Рабочий цикл автора", ["Вы подключаете провайдера и обновляете список моделей, затем собираете SEO-ключи, кластеризуете их и создаёте темы. После запуска очереди появляются черновики с изображениями. Вы читаете предпросмотр, смотрите результат SEO-проверки, при необходимости перегенерируете фото и публикуете статью в блог.","Контроль длины помогает держать объём в рамках заданной цели, а перелинковка на категории и товары связывает статьи с витриной. Поскольку модуль не заменяет редактора, финальное чтение материала остаётся за вами."])
_x(124,'uk',"Щоб модуль приносив користь, йому потрібні дані магазину: чим краще заповнені категорії та товари, тим змістовнішими вийдуть теми й тексти.",
 "📝 Робочий цикл автора", ["Ви підключаєте провайдера й оновлюєте список моделей, потім збираєте SEO-ключі, кластеризуєте їх і створюєте теми. Після запуску черги з'являються чернетки із зображеннями. Ви читаєте попередній перегляд, дивитесь результат SEO-перевірки, за потреби перегенеруєте фото й публікуєте статтю в блог.","Контроль довжини допомагає тримати обсяг у межах заданої мети, а перелінкування на категорії та товари пов'язує статті з вітриною. Оскільки модуль не замінює редактора, фінальне читання матеріалу лишається за вами."])
_x(124,'en',"For the module to be useful it needs store data: the better the categories and products are filled in, the more meaningful the topics and texts will be.",
 "📝 The author's working cycle", ["You connect a provider and refresh the model list, then collect SEO keywords, cluster them and create topics. After the queue starts, drafts with images appear. You read the preview, look at the SEO check result, regenerate photos if needed and publish the article to the blog.","Length control keeps the volume within the set target, and linking to categories and products ties the articles to the storefront. Because the module does not replace an editor, the final read of the material remains yours."])

_x(126,'ru',"Модуль автономен: ему не нужен внешний сервис рассылок, чтобы собирать выпуски и ставить их в очередь, а провайдеры доставки подключаются только для подтверждения статусов.",
 "🧪 Перед отправкой", ["Выпуск стоит сначала проверить: откройте предпросмотр, отправьте тестовое письмо и убедитесь, что порядок блоков, баннер и купон выглядят как задумано. В товарном режиме состав можно поправить до финальной генерации, а в свободных письмах вы полностью контролируете и текст, и вёрстку.","Дальше выпуск идёт в общую очередь по расписанию. Suppression-список не даёт писать тем, кому писать нельзя, а блок отписки в каждом письме остаётся последним. Статистика и события webhook показывают, что произошло с письмами после отправки."])
_x(126,'uk',"Модуль автономний: йому не потрібен зовнішній сервіс розсилок, щоб збирати випуски й ставити їх у чергу, а провайдери доставки підключаються лише для підтвердження статусів.",
 "🧪 Перед надсиланням", ["Випуск варто спершу перевірити: відкрийте попередній перегляд, надішліть тестовий лист і переконайтеся, що порядок блоків, банер і купон виглядають як задумано. У товарному режимі склад можна поправити до фінальної генерації, а у вільних листах ви повністю контролюєте і текст, і верстку.","Далі випуск іде в загальну чергу за розкладом. Suppression-список не дає писати тим, кому писати не можна, а блок відписки в кожному листі лишається останнім. Статистика та події webhook показують, що сталося з листами після надсилання."])
_x(126,'en',"The module is autonomous: it needs no external mailing service to assemble issues and queue them, and delivery providers are connected only to confirm statuses.",
 "🧪 Before sending", ["It pays to check an issue first: open the preview, send a test e-mail and make sure the block order, banner and coupon look as intended. In product mode the selection can be adjusted before final generation, and in free letters you fully control both the text and the layout.","The issue then goes into the common queue on schedule. The suppression list prevents writing to those who must not be written to, and the unsubscribe block in each e-mail stays last. Statistics and webhook events show what happened to the e-mails after sending."])

_x(127,'ru',"Модуль встроен в привычные формы редактирования, поэтому не требует отдельного рабочего места: вы остаётесь в карточке товара или категории и работаете с текстом там же.",
 "🧭 Как выглядит работа", ["Сначала подключите провайдера: введите ключ, проверьте его и обновите список моделей. Затем откройте товар или категорию, нажмите «AI SEO», выберите язык и операцию. Проверьте результат, вставьте его в форму и сохраните штатной кнопкой. Если записей много, отправьте их в очередь.","Если результат не понравился, история изменений позволяет вернуться к прежнему описанию. Резервные провайдеры и модели в очереди страхуют от сбоев одного из сервисов, а оценка запросов и токенов до старта помогает не выйти за бюджет."])
_x(127,'uk',"Модуль вбудований у звичні форми редагування, тому не потребує окремого робочого місця: ви лишаєтеся в картці товару чи категорії та працюєте з текстом там само.",
 "🧭 Як виглядає робота", ["Спершу підключіть провайдера: введіть ключ, перевірте його й оновіть список моделей. Потім відкрийте товар чи категорію, натисніть «AI SEO», оберіть мову й операцію. Перевірте результат, вставте його у форму й збережіть штатною кнопкою. Якщо записів багато, надішліть їх у чергу.","Якщо результат не сподобався, історія змін дає змогу повернутися до попереднього опису. Резервні провайдери та моделі в черзі страхують від збою одного із сервісів, а оцінка запитів і токенів до старту допомагає не вийти за бюджет."])
_x(127,'en',"The module is built into the familiar edit forms, so it needs no separate workplace: you stay in the product or category card and work with the text right there.",
 "🧭 What the work looks like", ["First connect a provider: enter the key, verify it and refresh the model list. Then open a product or category, press AI SEO, choose a language and an operation. Review the result, insert it into the form and save with the standard button. If there are many records, send them to the queue.","If you dislike a result, the change history lets you return to the previous description. Reserve providers and models in the queue guard against an outage of one service, and the estimate of requests and tokens before the start helps you stay within budget."])

_x(128,'ru',"Модуль рассчитан на аккуратную работу с каталогом: он не гонится за мгновенным результатом, а оставляет вам право выбрать лучший вариант и вернуться назад.",
 "🛠️ Типичная последовательность", ["Запустите сканирование и посмотрите отчёт о качестве. Затем выберите товары и сцены, оцените количество задач и стоимость и поставьте их в очередь. Когда кандидаты готовы, просмотрите их, примите лучшие и при необходимости откатите версию.","Если вы пользуетесь AI Content PRO, он может передавать сюда точные задания на изображения через Image Slots. Они остаются черновиками, пока вы сами не решите, что с ними делать."])
_x(128,'uk',"Модуль розрахований на акуратну роботу з каталогом: він не женеться за миттєвим результатом, а лишає вам право обрати найкращий варіант і повернутися назад.",
 "🛠️ Типова послідовність", ["Запустіть сканування й подивіться звіт про якість. Потім оберіть товари та сцени, оцініть кількість завдань і вартість та поставте їх у чергу. Коли кандидати готові, перегляньте їх, прийміть найкращі та за потреби відкотіть версію.","Якщо ви користуєтеся AI Content PRO, він може передавати сюди точні завдання на зображення через Image Slots. Вони лишаються чернетками, доки ви самі не вирішите, що з ними робити."])
_x(128,'en',"The module is designed for careful work with a catalog: it does not chase an instant result but leaves you the right to pick the best variant and to go back.",
 "🛠️ A typical sequence", ["Start a scan and look at the quality report. Then choose products and scenes, estimate the number of tasks and the cost, and queue them. When candidates are ready, review them, accept the best ones and roll a version back if needed.","If you use AI Content PRO, it can pass exact image tasks here through Image Slots. They remain drafts until you yourself decide what to do with them."])


def _merge_tail():
    for pid in (63, 122, 126, 127, 128):
        for lang in ('ru', 'uk', 'en'):
            s = P[pid][lang]['sections']
            if len(s) > 7:
                a, b = s[-2], s[-1]
                s[-2:] = [dict(h=b['h'], p=a['p'] + b['p'])]


_merge_tail()
