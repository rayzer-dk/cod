import json, html
from common import *

ZIP='https://github.com/CodeCartPro/CodeCartPro-3.0.6.0/releases/download/v3.0.6.0/CodeCart-3.0.6.zip'
REL='https://github.com/CodeCartPro/CodeCartPro-3.0.6.0/releases/tag/v3.0.6.0'
SRC='https://github.com/CodeCartPro/CodeCartPro-3.0.6.0'
SUMS='https://github.com/CodeCartPro/CodeCartPro-3.0.6.0/releases/download/v3.0.6.0/CodeCart_3.0.6.0_SHA256SUMS.txt'
SHA='4a34ad881e6b49c7f0c1f06fe93e9ac432362d7ba66e09802fcaf3d25c4447d2'
DOC='https://github.com/CodeCartPro/CodeCartPro-3.0.6.0/blob/main/documentation/'
DEMO='https://test.codecartpro.com/'
TG='https://t.me/+tUZNEgY3aUk4MGIy'
FEATURED=[127,63,80,66,72,73]
SLUG={'1':{'catalog':'codecartpro'},'2':{'catalog':'codecartpro-en'},'3':{'catalog':'codecartpro-ru'}}

CSS = '''
.ccdl{--c-bg:#fff;--c-soft:#f3f7fd;--c-card:#fff;--c-text:#13294a;--c-muted:#5b6f8a;--c-line:#dfe8f4;--c-blue:#0753c9;--c-blue2:#0a66f0;--c-yellow:#ffc21a;--c-navy:#06152b;font-family:inherit;color:var(--c-text);line-height:1.6}
html.ccp-dark-theme .ccdl{--c-bg:#0f172a;--c-soft:#111c33;--c-card:#1e293b;--c-text:#f1f5fb;--c-muted:#b8c6da;--c-line:#334155}
.ccdl *{box-sizing:border-box}.ccdl h2,.ccdl h3,.ccdl h4,.ccdl p{margin:0}.ccdl a{text-decoration:none}
.ccdl section{margin:0 0 56px}.ccdl .w{max-width:1200px;margin:0 auto}
.ccdl .k{display:inline-block;font-size:12px;font-weight:800;letter-spacing:.12em;text-transform:uppercase;color:var(--c-blue2);margin-bottom:10px}
html.ccp-dark-theme .ccdl .k{color:#7db4ff}
.ccdl .hd{margin-bottom:28px;max-width:760px}.ccdl .hd h3{font-size:clamp(26px,3vw,36px);line-height:1.15;font-weight:850;letter-spacing:-.025em;color:var(--c-text)}.ccdl .hd p{margin-top:12px;color:var(--c-muted);font-size:16px}
.ccdl .btn{display:inline-flex;align-items:center;justify-content:center;gap:10px;min-height:54px;padding:14px 26px;border-radius:14px;font-weight:800;font-size:16px;transition:.2s;text-align:center}
.ccdl .btn-y{background:var(--c-yellow);color:#0b1b3a!important;box-shadow:0 12px 28px rgba(255,194,26,.28)}.ccdl .btn-y:hover{transform:translateY(-2px);box-shadow:0 16px 34px rgba(255,194,26,.4)}
.ccdl .btn-o{border:1.5px solid rgba(255,255,255,.35);color:#fff!important;background:rgba(255,255,255,.08)}.ccdl .btn-o:hover{background:rgba(255,255,255,.16)}
.ccdl .btn-b{background:var(--c-blue);color:#fff!important}.ccdl .btn-b:hover{background:var(--c-blue2)}
/* hero */
.ccdl .hero{position:relative;overflow:hidden;border-radius:26px;padding:clamp(28px,5vw,64px);color:#fff;background:radial-gradient(circle at 88% 12%,rgba(255,194,26,.35),transparent 40%),radial-gradient(circle at 0 100%,rgba(0,40,140,.55),transparent 55%),linear-gradient(135deg,#0649b3,#0a66f0 58%,#3b8bff)}
.ccdl .hero:before{content:"";position:absolute;inset:0;background-image:linear-gradient(rgba(255,255,255,.05) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.05) 1px,transparent 1px);background-size:44px 44px;-webkit-mask-image:radial-gradient(circle at 75% 25%,#000,transparent 70%);mask-image:radial-gradient(circle at 75% 25%,#000,transparent 70%)}
.ccdl .hl{position:relative;display:grid;grid-template-columns:1.1fr .9fr;gap:44px;align-items:center}
.ccdl .pill{display:inline-flex;align-items:center;gap:10px;font-size:12px;font-weight:800;letter-spacing:.1em;text-transform:uppercase;color:#cfe0f6;margin-bottom:22px}
.ccdl .pill:before{content:"";width:9px;height:9px;border-radius:50%;background:var(--c-yellow);box-shadow:0 0 0 6px rgba(255,194,26,.18)}
.ccdl .hero h2{font-size:clamp(34px,4.6vw,58px);line-height:1.06;font-weight:900;letter-spacing:-.035em;color:#fff;margin-bottom:20px}.ccdl .hero h2 span{color:var(--c-yellow)}
.ccdl .hero .lead{font-size:18px;line-height:1.7;color:#bfd3ee;margin-bottom:28px;max-width:640px}
.ccdl .acts{display:flex;flex-wrap:wrap;gap:12px}.ccdl .small{font-size:13px;color:#9fbbe0;margin-top:16px}
.ccdl .tags{display:flex;gap:8px;flex-wrap:wrap;margin-top:26px}.ccdl .tags span{font-size:12px;font-weight:600;color:#c3d6f0;border:1px solid rgba(255,255,255,.2);border-radius:8px;padding:5px 11px}
.ccdl .mock{background:#f6f9ff;border:8px solid rgba(255,255,255,.14);border-radius:20px;overflow:hidden;box-shadow:0 30px 70px rgba(0,0,0,.4);transform:rotate(-2.5deg)}
.ccdl .mt{background:#0c2749;color:#fff;display:flex;justify-content:space-between;padding:13px 18px;font-size:14px;font-weight:800}.ccdl .mt em{font-style:normal;color:var(--c-yellow)}.ccdl .mt small{opacity:.7}
.ccdl .mb{display:flex}.ccdl .ms{width:54px;background:#eaf1fb;padding:16px 0;display:flex;flex-direction:column;gap:12px;align-items:center}.ccdl .ms i{width:22px;height:22px;border-radius:7px;background:#c5d6ee}.ccdl .ms i:first-child{background:var(--c-blue2)}
.ccdl .mm{flex:1;padding:16px;display:flex;flex-direction:column;gap:12px}.ccdl .kp{display:grid;grid-template-columns:repeat(3,1fr);gap:9px}.ccdl .kp div{background:#fff;border:1px solid #dde8f6;border-radius:10px;padding:9px 11px;color:#27456b;font-size:11px}.ccdl .kp b{display:block;font-size:20px;color:#0f5fd0;white-space:nowrap}
.ccdl .br{height:96px;display:flex;gap:9px;align-items:flex-end;background:#fff;border:1px solid #dde8f6;border-radius:10px;padding:11px}.ccdl .br i{flex:1;border-radius:5px 5px 0 0;background:linear-gradient(#69adff,#1670df)}
/* stats */
.ccdl .stats{display:grid;grid-template-columns:repeat(4,1fr);gap:14px;margin-top:-34px;position:relative;padding:0 clamp(12px,3vw,40px)}
.ccdl .stats div{background:var(--c-card);border:1px solid var(--c-line);border-radius:16px;padding:18px 20px;box-shadow:0 14px 34px rgba(8,30,66,.12)}.ccdl .stats small{display:block;font-size:12px;color:var(--c-muted);font-weight:600;letter-spacing:.04em;text-transform:uppercase}.ccdl .stats b{display:block;font-size:20px;margin-top:2px;color:var(--c-text)}
/* download card */
.ccdl .dl{display:grid;grid-template-columns:1fr auto;gap:24px;align-items:center;background:var(--c-card);border:1px solid var(--c-line);border-radius:22px;padding:28px 32px;box-shadow:0 18px 44px rgba(8,30,66,.08)}
.ccdl .dl h4{font-size:24px;font-weight:850;color:var(--c-text);margin:6px 0}.ccdl .ft{font-size:11px;font-weight:800;letter-spacing:.12em;color:var(--c-blue2)}
.ccdl .hash{margin-top:18px;padding:14px 18px;border-radius:12px;background:var(--c-soft);border:1px dashed var(--c-line);font-size:13px;color:var(--c-muted)}.ccdl .hash code{display:block;margin-top:6px;word-break:break-all;font-size:13px;color:var(--c-text);background:none;border:0;padding:0}
.ccdl .lk{display:flex;flex-wrap:wrap;gap:10px;margin-top:18px}.ccdl .lk a{font-size:14px;font-weight:700;color:var(--c-blue2);border:1px solid var(--c-line);background:var(--c-card);border-radius:10px;padding:9px 16px}.ccdl .lk a:hover{border-color:var(--c-blue2)}
html.ccp-dark-theme .ccdl .lk a{color:#7db4ff}
.ccdl .warn{margin-top:18px;padding:16px 20px;border-radius:14px;background:#fff8dc;border:1px solid #f0dd85;color:#5c4a00;font-size:14px}
html.ccp-dark-theme .ccdl .warn{background:#3a3210;border-color:#6a5a14;color:#ffeaa0}
/* features / steps / mods */
.ccdl .g3{display:grid;grid-template-columns:repeat(3,1fr);gap:18px}.ccdl .g2{display:grid;grid-template-columns:repeat(2,1fr);gap:18px}
.ccdl .card{background:var(--c-card);border:1px solid var(--c-line);border-radius:18px;padding:24px;transition:.2s}.ccdl .card:hover{transform:translateY(-3px);box-shadow:0 18px 40px rgba(8,30,66,.12)}
.ccdl .ic{width:50px;height:50px;border-radius:14px;display:flex;align-items:center;justify-content:center;margin-bottom:16px;background:linear-gradient(145deg,#0a66f0,#0a3f86)}.ccdl .ic svg{width:26px;height:26px}
.ccdl .card h4{font-size:18px;font-weight:800;margin-bottom:8px;color:var(--c-text)}.ccdl .card p{font-size:15px;color:var(--c-muted)}
.ccdl .num{width:46px;height:46px;border-radius:50%;background:var(--c-yellow);color:#0b1b3a;font-weight:900;font-size:19px;display:flex;align-items:center;justify-content:center;margin-bottom:14px}
.ccdl .req{display:grid;grid-template-columns:repeat(4,1fr);gap:14px}.ccdl .req div{background:var(--c-soft);border:1px solid var(--c-line);border-radius:14px;padding:16px 18px}.ccdl .req small{display:block;font-size:12px;color:var(--c-muted);font-weight:700;text-transform:uppercase;letter-spacing:.05em}.ccdl .req b{font-size:19px;color:var(--c-text)}
.ccdl .note{font-size:13px;color:var(--c-muted);margin-top:14px}
.ccdl .mods{display:grid;grid-template-columns:repeat(3,1fr);gap:18px}.ccdl .mod{display:block;background:var(--c-card);border:1px solid var(--c-line);border-radius:18px;overflow:hidden;color:var(--c-text);transition:.2s}.ccdl .mod:hover{transform:translateY(-3px);box-shadow:0 18px 40px rgba(8,30,66,.14)}
.ccdl .mod img{display:block;width:100%;height:auto;aspect-ratio:1/1;object-fit:cover}.ccdl .mod span{display:block;padding:14px 18px 18px}.ccdl .mod b{display:block;font-size:16px}.ccdl .mod em{display:block;font-style:normal;font-size:13px;color:var(--c-blue2);font-weight:700;margin-top:4px}
html.ccp-dark-theme .ccdl .mod em{color:#7db4ff}
.ccdl .faq details{background:var(--c-card);border:1px solid var(--c-line);border-radius:14px;margin-bottom:10px;padding:0 20px}.ccdl .faq summary{cursor:pointer;list-style:none;padding:17px 0;font-weight:800;font-size:16px;color:var(--c-text);display:flex;justify-content:space-between;gap:12px}.ccdl .faq summary::-webkit-details-marker{display:none}.ccdl .faq summary:after{content:"+";font-size:22px;line-height:1;color:var(--c-blue2)}.ccdl .faq details[open] summary:after{content:"–"}.ccdl .faq p{padding:0 0 18px;color:var(--c-muted);font-size:15px}.ccdl .faq code{font-size:13px}
.ccdl .cta{display:flex;justify-content:space-between;align-items:center;gap:24px;flex-wrap:wrap;border-radius:24px;padding:clamp(24px,4vw,44px);color:#fff;background:linear-gradient(135deg,#06152b,#0b3f86)}.ccdl .cta h3{color:#fff;font-size:clamp(24px,3vw,34px);font-weight:850;letter-spacing:-.02em}.ccdl .cta p{color:#bfd3ee;margin-top:8px}
@media(max-width:991px){.ccdl .hl{grid-template-columns:1fr}.ccdl .mock{max-width:520px}.ccdl .stats,.ccdl .req{grid-template-columns:repeat(2,1fr)}.ccdl .g3,.ccdl .mods{grid-template-columns:repeat(2,1fr)}.ccdl .dl{grid-template-columns:1fr}}
@media(max-width:575px){.ccdl .mock{transform:none;border-width:5px}.ccdl .kp b{font-size:16px}.ccdl .g3,.ccdl .g2,.ccdl .mods{grid-template-columns:1fr}.ccdl .stats{margin-top:-24px;padding:0 8px}.ccdl .btn{width:100%}.ccdl section{margin-bottom:40px}.ccdl .req{grid-template-columns:1fr 1fr}}
'''

def ic(name):
    from common import ICONS
    return f'<svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">{ICONS[name]}</svg>'

L = {
 '3': dict(lang='ru', title='Скачать CodeCart PRO 3.0.6.0 — бесплатная система для OpenCart и ocStore',
  mdesc='Скачайте бесплатную систему CodeCart PRO 3.0.6.0 на базе OpenCart и ocStore 3.x: GNU GPL v3, PHP 8.1–8.5, прямая загрузка ZIP без регистрации. Модули CodeCart PRO — в каталоге.',
  h1='Скачать CodeCart PRO', kw='скачать codecart pro, codecart 3.0.6, бесплатная cms opencart, ocstore 3',
  pill='Бесплатная система · GNU GPL v3', h2='Скачайте <span>CodeCart PRO 3.0.6.0</span>',
  lead='Бесплатная система управления интернет-магазином на базе OpenCart и ocStore 3.x: модернизированное ядро, PHP 8.1–8.5, улучшенная админ-панель и открытый исходный код.',
  b1='Скачать бесплатно', b2='Демо магазина', small='Прямая загрузка ZIP с GitHub. Без корзины, оплаты и регистрации.',
  tags=['OpenCart / ocStore 3.x','PHP 8.1–8.5','GNU GPL v3'], mk=('Заказы','Товары','Модули'),
  st=[('Версия','3.0.6.0'),('Размер','15,2 МБ'),('Лицензия','GNU GPL v3'),('Цена','Бесплатно')],
  dk='Официальный релиз', dh='Скачайте установочный архив', dp='Готовый ZIP опубликован на официальном GitHub проекта. Регистрация и оформление заказа не нужны.',
  dver='Версия 3.0.6.0 · 15,2 МБ · GNU GPL v3', sha='Контрольная сумма SHA-256', l1='История релиза', l2='Исходный код', l3='Файл SHA-256',
  warn='Перед установкой или обновлением существующего магазина сделайте полную резервную копию файлов сайта и базы данных и сначала проверьте обновление на тестовой копии.',
  fk='Возможности', fh='Что внутри CodeCart PRO', fp='Знакомый OpenCart с модернизированной основой — для владельцев магазинов, разработчиков и интеграторов.',
  feats=[('catalog','Каталог и продажи','Товары, категории, характеристики, покупатели, заказы, корзина, доставка и оплата.'),
         ('speed','Модернизированное ядро','Обновлённые библиотеки, MySQL/MariaDB, PHP 8.x, кеширование и обработка данных.'),
         ('plug','Гибкая архитектура','MVC-L, OCMOD и Events, современные PHP-сервисы и PSR-4.'),
         ('security','Безопасность','Доработанные авторизация, сессии, защита форм, диагностика и аудит действий.'),
         ('seo','SEO и мультиязычность','SEO URL, canonical, sitemap и мультиязычный контент для поискового продвижения.'),
         ('themes','Темы и расширения','Привычные механизмы модулей OpenCart 3.x. Сторонние модули нужно проверять на совместимость.')],
  sk='Быстрый старт', sh='Установка за три шага', sp='Для новой установки используйте официальный архив с включёнными зависимостями.',
  steps=[('Скачайте архив','Загрузите ZIP с GitHub Releases и распакуйте его на компьютере.'),
         ('Загрузите на хостинг','Скопируйте содержимое папки upload в корень сайта и создайте пустую базу данных.'),
         ('Запустите установщик','Откройте /install/ в браузере, пройдите проверку требований и завершите настройку.')],
  d1='Инструкция по установке', d2='Обновление магазина', d3='Совместимость',
  rk='Требования', rh='Подготовка сервера', req=[('PHP','8.1–8.5'),('База данных','MySQL / MariaDB'),('Веб-сервер','Apache / nginx'),('Протокол','HTTPS')],
  rn='PHP 8.1–8.3 лучше подходят для максимальной совместимости существующих расширений OpenCart. Поддержка PHP 8.4–8.5 есть в ядре, но совместимость сторонних модулей не гарантируется.',
  mk2='Модули', mh='Расширьте систему модулями CodeCart PRO', mp='SEO, AI, импорт и экспорт, доставка, оплата, безопасность. Перед покупкой можно проверить модули в демо-админке.',
  more='Смотреть все модули', open='Подробнее',
  qk='Вопросы и ответы', qh='Частые вопросы',
  faq=[('CodeCart PRO действительно бесплатная?','Да. Ядро распространяется бесплатно по лицензии GNU GPL v3 и может использоваться в коммерческих магазинах. Отдельные дополнительные модули и услуги могут быть платными.'),
       ('Нужна ли регистрация или оплата для скачивания?','Нет. Архив скачивается напрямую с GitHub без регистрации, корзины и оплаты.'),
       ('Как проверить архив после загрузки?','Сравните SHA-256 файла с контрольной суммой на этой странице. Linux/macOS: <code>sha256sum CodeCart-3.0.6.zip</code>. Windows: <code>certutil -hashfile CodeCart-3.0.6.zip SHA256</code>.'),
       ('Можно ли использовать модули OpenCart и ocStore?','CodeCart сохраняет совместимые механизмы OpenCart/ocStore 3.x, включая MVC-L, OCMOD и Events. Работоспособность каждого стороннего модуля зависит от его кода, версии PHP и темы.'),
       ('Можно ли обновить существующий магазин?','Да, предусмотрен сценарий обновления. Перед этим создайте резервную копию файлов и базы данных и проверьте темы, модули, оплату, доставку и оформление заказа на тестовой копии.'),
       ('Поддерживается ли PHP 8.5?','Ядро разработано с поддержкой PHP 8.1–8.5. Для существующих расширений чаще лучше подходит PHP 8.1–8.3; сторонние темы и модули нужно тестировать отдельно.'),
       ('Где посмотреть систему в работе?','Откройте демонстрационный магазин <a href="'+DEMO+'" target="_blank" rel="noopener">test.codecartpro.com</a> и демо-админку.'),
       ('Можно ли изменять исходный код?','Да. Лицензия GNU GPL v3 разрешает изучать, изменять и распространять программу при соблюдении её условий.')],
  ch='Начните с CodeCart PRO', cp='Скачайте бесплатную систему, изучите возможности и запустите собственный магазин.', cb='Скачать CodeCart 3.0.6',
  f1='Демо магазина', f2='Демо админки', f3='GitHub', f4='Сообщество', buy='/pokupka-moduley/', buyt='Как купить модули'),
 '1': dict(lang='uk', title='Завантажити CodeCart PRO 3.0.6.0 — безкоштовна система для OpenCart та ocStore',
  mdesc='Завантажте безкоштовну систему CodeCart PRO 3.0.6.0 на базі OpenCart та ocStore 3.x: GNU GPL v3, PHP 8.1–8.5, пряме завантаження ZIP без реєстрації. Модулі CodeCart PRO — у каталозі.',
  h1='Завантажити CodeCart PRO', kw='завантажити codecart pro, codecart 3.0.6, безкоштовна cms opencart, ocstore 3',
  pill='Безкоштовна система · GNU GPL v3', h2='Завантажте <span>CodeCart PRO 3.0.6.0</span>',
  lead='Безкоштовна система керування інтернет-магазином на базі OpenCart та ocStore 3.x: модернізоване ядро, PHP 8.1–8.5, покращена адмін-панель і відкритий вихідний код.',
  b1='Завантажити безкоштовно', b2='Демо магазину', small='Пряме завантаження ZIP з GitHub. Без кошика, оплати та реєстрації.',
  tags=['OpenCart / ocStore 3.x','PHP 8.1–8.5','GNU GPL v3'], mk=('Замовлення','Товари','Модулі'),
  st=[('Версія','3.0.6.0'),('Розмір','15,2 МБ'),('Ліцензія','GNU GPL v3'),('Ціна','Безкоштовно')],
  dk='Офіційний реліз', dh='Завантажте інсталяційний архів', dp='Готовий ZIP опубліковано на офіційному GitHub проєкту. Реєстрація й оформлення замовлення не потрібні.',
  dver='Версія 3.0.6.0 · 15,2 МБ · GNU GPL v3', sha='Контрольна сума SHA-256', l1='Історія релізу', l2='Вихідний код', l3='Файл SHA-256',
  warn='Перед встановленням або оновленням наявного магазину зробіть повну резервну копію файлів сайту та бази даних і спершу перевірте оновлення на тестовій копії.',
  fk='Можливості', fh='Що всередині CodeCart PRO', fp='Знайомий OpenCart із модернізованою основою — для власників магазинів, розробників та інтеграторів.',
  feats=[('catalog','Каталог і продажі','Товари, категорії, характеристики, покупці, замовлення, кошик, доставка й оплата.'),
         ('speed','Модернізоване ядро','Оновлені бібліотеки, MySQL/MariaDB, PHP 8.x, кешування та обробка даних.'),
         ('plug','Гнучка архітектура','MVC-L, OCMOD і Events, сучасні PHP-сервіси та PSR-4.'),
         ('security','Безпека','Доопрацьовані авторизація, сесії, захист форм, діагностика й аудит дій.'),
         ('seo','SEO та мультимовність','SEO URL, canonical, sitemap і мультимовний контент для пошукового просування.'),
         ('themes','Теми та розширення','Звичні механізми модулів OpenCart 3.x. Сторонні модулі потрібно перевіряти на сумісність.')],
  sk='Швидкий старт', sh='Встановлення за три кроки', sp='Для нової інсталяції використовуйте офіційний архів із вбудованими залежностями.',
  steps=[('Завантажте архів','Завантажте ZIP з GitHub Releases і розпакуйте його на комп’ютері.'),
         ('Завантажте на хостинг','Скопіюйте вміст папки upload у корінь сайту та створіть порожню базу даних.'),
         ('Запустіть інсталятор','Відкрийте /install/ у браузері, пройдіть перевірку вимог і завершіть налаштування.')],
  d1='Інструкція зі встановлення', d2='Оновлення магазину', d3='Сумісність',
  rk='Вимоги', rh='Підготовка сервера', req=[('PHP','8.1–8.5'),('База даних','MySQL / MariaDB'),('Веб-сервер','Apache / nginx'),('Протокол','HTTPS')],
  rn='PHP 8.1–8.3 краще підходять для максимальної сумісності наявних розширень OpenCart. Підтримка PHP 8.4–8.5 є в ядрі, але сумісність сторонніх модулів не гарантується.',
  mk2='Модулі', mh='Розширте систему модулями CodeCart PRO', mp='SEO, AI, імпорт та експорт, доставка, оплата, безпека. Перед покупкою можна перевірити модулі в демо-адмінці.',
  more='Дивитись усі модулі', open='Докладніше',
  qk='Питання та відповіді', qh='Поширені запитання',
  faq=[('CodeCart PRO справді безкоштовна?','Так. Ядро поширюється безкоштовно за ліцензією GNU GPL v3 і може використовуватися в комерційних магазинах. Окремі додаткові модулі та послуги можуть бути платними.'),
       ('Чи потрібна реєстрація або оплата для завантаження?','Ні. Архів завантажується напряму з GitHub без реєстрації, кошика й оплати.'),
       ('Як перевірити архів після завантаження?','Порівняйте SHA-256 файлу з контрольною сумою на цій сторінці. Linux/macOS: <code>sha256sum CodeCart-3.0.6.zip</code>. Windows: <code>certutil -hashfile CodeCart-3.0.6.zip SHA256</code>.'),
       ('Чи можна використовувати модулі OpenCart та ocStore?','CodeCart зберігає сумісні механізми OpenCart/ocStore 3.x, зокрема MVC-L, OCMOD та Events. Працездатність кожного стороннього модуля залежить від його коду, версії PHP і теми.'),
       ('Чи можна оновити наявний магазин?','Так, передбачено сценарій оновлення. Перед цим створіть резервну копію файлів і бази даних та перевірте теми, модулі, оплату, доставку й оформлення замовлення на тестовій копії.'),
       ('Чи підтримується PHP 8.5?','Ядро розроблено з підтримкою PHP 8.1–8.5. Для наявних розширень частіше краще підходить PHP 8.1–8.3; сторонні теми й модулі потрібно тестувати окремо.'),
       ('Де побачити систему в роботі?','Відкрийте демонстраційний магазин <a href="'+DEMO+'" target="_blank" rel="noopener">test.codecartpro.com</a> та демо-адмінку.'),
       ('Чи можна змінювати вихідний код?','Так. Ліцензія GNU GPL v3 дозволяє вивчати, змінювати та поширювати програму за умови дотримання її вимог.')],
  ch='Почніть із CodeCart PRO', cp='Завантажте безкоштовну систему, вивчіть можливості й запустіть власний магазин.', cb='Завантажити CodeCart 3.0.6',
  f1='Демо магазину', f2='Демо адмінки', f3='GitHub', f4='Спільнота', buy='/buy-modules/', buyt='Як придбати модулі'),
 '2': dict(lang='en', title='Download CodeCart PRO 3.0.6.0 — free system for OpenCart and ocStore',
  mdesc='Download the free CodeCart PRO 3.0.6.0 system based on OpenCart and ocStore 3.x: GNU GPL v3, PHP 8.1–8.5, direct ZIP download without registration. CodeCart PRO modules are in the catalog.',
  h1='Download CodeCart PRO', kw='download codecart pro, codecart 3.0.6, free opencart cms, ocstore 3',
  pill='Free system · GNU GPL v3', h2='Download <span>CodeCart PRO 3.0.6.0</span>',
  lead='A free e-commerce system based on OpenCart and ocStore 3.x: a modernized core, PHP 8.1–8.5, an improved admin panel and open source code.',
  b1='Download for free', b2='Store demo', small='Direct ZIP download from GitHub. No cart, payment or registration.',
  tags=['OpenCart / ocStore 3.x','PHP 8.1–8.5','GNU GPL v3'], mk=('Orders','Products','Modules'),
  st=[('Version','3.0.6.0'),('Size','15.2 MB'),('License','GNU GPL v3'),('Price','Free')],
  dk='Official release', dh='Download the installation package', dp='The ready-to-install ZIP is published on the project’s official GitHub. No registration or order is required.',
  dver='Version 3.0.6.0 · 15.2 MB · GNU GPL v3', sha='SHA-256 checksum', l1='Release notes', l2='Source code', l3='SHA-256 file',
  warn='Before installing or upgrading an existing store, make a full backup of your files and database and test the upgrade on a staging copy first.',
  fk='Features', fh='What is inside CodeCart PRO', fp='The familiar OpenCart on a modernized foundation — for store owners, developers and integrators.',
  feats=[('catalog','Catalog and sales','Products, categories, attributes, customers, orders, cart, shipping and payments.'),
         ('speed','Modernized core','Updated libraries, MySQL/MariaDB, PHP 8.x, caching and data handling.'),
         ('plug','Flexible architecture','MVC-L, OCMOD and Events, modern PHP services and PSR-4.'),
         ('security','Security','Improved authentication, sessions, form protection, diagnostics and audit logging.'),
         ('seo','SEO and multilingual','SEO URLs, canonical, sitemap and multilingual content for search optimization.'),
         ('themes','Themes and extensions','Familiar OpenCart 3.x extension mechanisms. Third-party modules must be checked for compatibility.')],
  sk='Quick start', sh='Install in three steps', sp='For a new installation, use the official package with bundled dependencies.',
  steps=[('Download the package','Get the ZIP from GitHub Releases and unpack it on your computer.'),
         ('Upload to hosting','Copy the contents of the upload folder to the site root and create an empty database.'),
         ('Run the installer','Open /install/ in your browser, pass the requirements check and finish the setup.')],
  d1='Installation guide', d2='Upgrading a store', d3='Compatibility',
  rk='Requirements', rh='Prepare your server', req=[('PHP','8.1–8.5'),('Database','MySQL / MariaDB'),('Web server','Apache / nginx'),('Protocol','HTTPS')],
  rn='PHP 8.1–8.3 is best for maximum compatibility with existing OpenCart extensions. The core also supports PHP 8.4–8.5, but third-party module compatibility is not guaranteed.',
  mk2='Modules', mh='Extend the system with CodeCart PRO modules', mp='SEO, AI, import and export, shipping, payments, security. Try modules in the demo admin before you buy.',
  more='Browse all modules', open='Learn more',
  qk='Q&amp;A', qh='Frequently asked questions',
  faq=[('Is CodeCart PRO really free?','Yes. The core is distributed free under GNU GPL v3 and can be used in commercial stores. Some additional modules and services may be paid.'),
       ('Do I need to register or pay to download?','No. The archive downloads directly from GitHub without registration, cart or payment.'),
       ('How do I verify the archive?','Compare the file’s SHA-256 with the checksum on this page. Linux/macOS: <code>sha256sum CodeCart-3.0.6.zip</code>. Windows: <code>certutil -hashfile CodeCart-3.0.6.zip SHA256</code>.'),
       ('Can I use OpenCart and ocStore modules?','CodeCart keeps compatible OpenCart/ocStore 3.x mechanisms, including MVC-L, OCMOD and Events. Each third-party module still depends on its own code, the PHP version and your theme.'),
       ('Can I upgrade an existing store?','Yes, an upgrade path is provided. Back up your files and database first, then test themes, modules, payments, shipping and checkout on a staging copy.'),
       ('Is PHP 8.5 supported?','The core is built for PHP 8.1–8.5. Existing extensions usually run best on PHP 8.1–8.3; test third-party themes and modules separately.'),
       ('Where can I see it in action?','Open the demo store <a href="'+DEMO+'" target="_blank" rel="noopener">test.codecartpro.com</a> and its demo admin.'),
       ('Can I modify the source code?','Yes. GNU GPL v3 allows you to study, modify and distribute the software under its terms.')],
  ch='Start with CodeCart PRO', cp='Download the free system, explore its features and launch your own store.', cb='Download CodeCart 3.0.6',
  f1='Store demo', f2='Admin demo', f3='GitHub', f4='Community', buy='/buy-modules-en/', buyt='How to buy modules'),
}

def prod_cards(l):
    o = []
    for pid in FEATURED:
        p = next(x for x in DATA['prods'] if x['id'] == pid)
        nm = html.unescape(p['names'][l]['name']); t = nm.split(' — ')[0]
        t = t.replace(' для OpenCart','').strip()
        img = '/image/' + p['image']
        o.append(f'<a class="mod" href="/index.php?route=product/product&amp;product_id={pid}"><img src="{img}" alt="{html.escape(t)}" loading="lazy" width="450" height="450"><span><b>{html.escape(t)}</b><em>{L[l]["open"]} →</em></span></a>')
    return ''.join(o)

def build(l):
    t = L[l]
    cat = SLUG[l]['catalog']
    mk = t['mk']
    feats = ''.join(f'<div class="card"><div class="ic">{ic(i)}</div><h4>{h}</h4><p>{p}</p></div>' for i,h,p in t['feats'])
    steps = ''.join(f'<div class="card"><div class="num">{i+1}</div><h4>{h}</h4><p>{p}</p></div>' for i,(h,p) in enumerate(t['steps']))
    req = ''.join(f'<div><small>{a}</small><b>{b}</b></div>' for a,b in t['req'])
    st = ''.join(f'<div><small>{a}</small><b>{b}</b></div>' for a,b in t['st'])
    faq = ''.join(f'<details><summary>{q}</summary><p>{a}</p></details>' for q,a in t['faq'])
    tags = ''.join(f'<span>{x}</span>' for x in t['tags'])
    ld = json.dumps({"@context":"https://schema.org","@type":"SoftwareApplication","name":"CodeCart PRO","softwareVersion":"3.0.6.0","applicationCategory":"BusinessApplication","operatingSystem":"Linux, Windows (PHP 8.1–8.5)","license":"https://www.gnu.org/licenses/gpl-3.0.html","downloadUrl":ZIP,"fileSize":"15.2 MB","offers":{"@type":"Offer","price":"0","priceCurrency":"USD"},"description":t['mdesc']},ensure_ascii=False)
    h = f'''<style>{CSS}</style><div class="ccdl" lang="{t['lang']}"><div class="w">
<section class="hero"><div class="hl"><div><div class="pill">{t['pill']}</div><h2>{t['h2']}</h2><p class="lead">{t['lead']}</p>
<div class="acts"><a class="btn btn-y" href="{ZIP}" rel="noopener">{t['b1']} ↓</a><a class="btn btn-o" href="{DEMO}" target="_blank" rel="noopener">{t['b2']}</a></div>
<p class="small">{t['small']}</p><div class="tags">{tags}</div></div>
<div><div class="mock" aria-hidden="true"><div class="mt"><span>CodeCart <em>PRO</em></span><small>3.0.6.0</small></div><div class="mb"><div class="ms"><i></i><i></i><i></i><i></i></div><div class="mm"><div class="kp"><div>{mk[0]}<b>128</b></div><div>{mk[1]}<b>2 450</b></div><div>{mk[2]}<b>70+</b></div></div><div class="br"><i style="height:38%"></i><i style="height:52%"></i><i style="height:44%"></i><i style="height:70%"></i><i style="height:60%"></i><i style="height:82%"></i><i style="height:72%"></i><i style="height:95%"></i></div></div></div></div></div></div></section>
<div class="stats" style="margin-bottom:56px">{st}</div>
<section id="codecart-download"><div class="hd"><span class="k">{t['dk']}</span><h3>{t['dh']}</h3><p>{t['dp']}</p></div>
<div class="dl"><div><span class="ft">ZIP PACKAGE</span><h4>CodeCart-3.0.6.zip</h4><p style="color:var(--c-muted)">{t['dver']}</p></div><a class="btn btn-y" href="{ZIP}" rel="noopener">{t['b1']} ↓</a></div>
<div class="hash">{t['sha']}<code>{SHA}</code></div>
<div class="lk"><a href="{REL}" target="_blank" rel="noopener">{t['l1']}</a><a href="{SRC}" target="_blank" rel="noopener">{t['l2']}</a><a href="{SUMS}" target="_blank" rel="noopener">{t['l3']}</a></div>
<div class="warn">⚠ {t['warn']}</div></section>
<section><div class="hd"><span class="k">{t['fk']}</span><h3>{t['fh']}</h3><p>{t['fp']}</p></div><div class="g3">{feats}</div></section>
<section><div class="hd"><span class="k">{t['sk']}</span><h3>{t['sh']}</h3><p>{t['sp']}</p></div><div class="g3">{steps}</div>
<div class="lk"><a href="{DOC}INSTALL.md" target="_blank" rel="noopener">{t['d1']}</a><a href="{DOC}UPGRADE.md" target="_blank" rel="noopener">{t['d2']}</a><a href="{DOC}COMPATIBILITY.md" target="_blank" rel="noopener">{t['d3']}</a></div></section>
<section><div class="hd"><span class="k">{t['rk']}</span><h3>{t['rh']}</h3></div><div class="req">{req}</div><p class="note">{t['rn']}</p></section>
<section><div class="hd"><span class="k">{t['mk2']}</span><h3>{t['mh']}</h3><p>{t['mp']}</p></div><div class="mods">{prod_cards(l)}</div>
<div class="lk" style="margin-top:22px"><a class="btn btn-b" style="color:#fff" href="/{cat}/">{t['more']} →</a><a href="{t['buy']}">{t['buyt']}</a></div></section>
<section class="faq"><div class="hd"><span class="k">{t['qk']}</span><h3>{t['qh']}</h3></div>{faq}</section>
<section class="cta"><div><h3>{t['ch']}</h3><p>{t['cp']}</p></div><a class="btn btn-y" href="{ZIP}" rel="noopener">{t['cb']} ↓</a></section>
<div class="lk" style="justify-content:center"><a href="{DEMO}" target="_blank" rel="noopener">{t['f1']}</a><a href="{DEMO}admin/" target="_blank" rel="noopener">{t['f2']}</a><a href="{SRC}" target="_blank" rel="noopener">{t['f3']}</a><a href="{TG}" target="_blank" rel="noopener">{t['f4']}</a></div>
</div></div><script type="application/ld+json">{ld}</script>'''
    return re_min(h)

import re
def re_min(h):
    return re.sub(r'>\s+<','><', h.replace('\n',''))

def esc(s): return s.replace('&','&amp;').replace('<','&lt;').replace('>','&gt;').replace('"','&quot;')
def q(s): return "'" + s.replace('\\','\\\\').replace("'","\\'") + "'"

def sql():
    o = ['-- 1) Страница /download/: информационная страница вместо товара. Затрагивает information_id=14, product_id=84, category_id=74.','SET NAMES utf8mb4;','START TRANSACTION;']
    for lid in ('1','2','3'):
        t = L[lid]
        o.append(f"UPDATE `oc_information_description` SET `title`={q(esc(t['h1']))}, `description`={q(esc(build(lid)))}, `meta_title`={q(esc(t['title']))}, `meta_description`={q(esc(t['mdesc']))}, `meta_keyword`={q(esc(t['kw']))}, `meta_h1`={q(esc(t['h1']))} WHERE `information_id`=14 AND `language_id`={lid};")
    o += [
     "-- URL: слово «download» сейчас занято товаром №84. Освобождаем и отдаём информационной странице.",
     "DELETE FROM `oc_seo_url` WHERE `query` IN ('product_id=84','information_id=14') AND `store_id`=0;",
     "INSERT INTO `oc_seo_url` (`store_id`,`language_id`,`query`,`keyword`) VALUES (0,1,'information_id=14','download'),(0,2,'information_id=14','download-en'),(0,3,'information_id=14','skachat');",
     "-- 301-редиректы со старых адресов страницы (таблица модуля SEO URL PRO)",
     "INSERT INTO `oc_seo_url_pro_redirect` (`store_id`,`language_id`,`entity_type`,`entity_id`,`old_query`,`new_query`,`old_keyword`,`new_keyword`,`status`,`code`,`date_added`,`date_modified`) VALUES "
     "(0,1,'information',14,'information_id=14','information_id=14','3-6','download',1,301,NOW(),NOW()),"
     "(0,2,'information',14,'information_id=14','information_id=14','3-6-en','download-en',1,301,NOW(),NOW()),"
     "(0,3,'information',14,'information_id=14','information_id=14','3-6-14','skachat',1,301,NOW(),NOW())"
     " ON DUPLICATE KEY UPDATE `new_keyword`=VALUES(`new_keyword`), `status`=1, `date_modified`=NOW();",
     "-- Скрываем «товар» CodeCart PRO 3.0.6 и одноимённую категорию — их заменяет страница скачивания",
     "UPDATE `oc_product` SET `status`=0, `date_modified`=NOW() WHERE `product_id`=84;",
     "UPDATE `oc_category` SET `status`=0, `date_modified`=NOW() WHERE `category_id`=74;",
     "-- Страница в футере и в карте сайта",
     "UPDATE `oc_information` SET `status`=1, `bottom`=1, `sort_order`=0, `noindex`=1 WHERE `information_id`=14;",
     "COMMIT;"]
    return '\n'.join(o) + '\n'

if __name__ == '__main__':
    (OUT/'sql/01_download_page.sql').write_text(sql(), encoding='utf8')
    for l in ('1','2','3'): print(l, len(build(l)))
    (OUT/'docs').mkdir(exist_ok=True)
    open(OUT/'docs/download_preview_ru.html','w').write(f'<!doctype html><meta charset=utf-8><meta name=viewport content="width=device-width,initial-scale=1"><body style="margin:0;padding:24px;font-family:Inter,sans-serif;background:#f5f7fb">{build("3")}</body>')
