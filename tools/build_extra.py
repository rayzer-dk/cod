# -*- coding: utf-8 -*-
"""Недостающее: страницы «Как установить модуль» и «FAQ» (3 языка) и выдача файлов модулей покупателям."""
import json, re, html, os
from common import *
from download_page import esc, q, re_min

LN = {'1': 'uk', '2': 'en', '3': 'ru'}
CSS = '''.ccg{color:var(--cc-text,#0b1b3a);line-height:1.7;font-size:16px}.ccg h2{font-size:clamp(24px,3vw,32px);font-weight:850;margin:0 0 12px}
.ccg h3{font-size:19px;font-weight:850;margin:26px 0 10px}.ccg .lead{font-size:18px;font-weight:600;margin:0 0 20px}
.ccg ol.st{list-style:none;counter-reset:s;margin:0 0 20px;padding:0;display:grid;gap:12px}
.ccg ol.st li{counter-increment:s;position:relative;padding:16px 18px 16px 64px;border:1px solid var(--cc-line,#d9e5f7);border-radius:16px;background:var(--cc-card,#fff);box-shadow:0 8px 22px rgba(10,60,160,.06)}
.ccg ol.st li:before{content:counter(s);position:absolute;left:16px;top:14px;width:36px;height:36px;border-radius:50%;background:linear-gradient(165deg,#ffe07a,#ffc21a 60%,#f0a000);color:#0b1b3a;font-weight:900;display:flex;align-items:center;justify-content:center}
.ccg ol.st b{display:block;margin-bottom:2px}.ccg .box{padding:16px 20px;border-radius:14px;background:#eef5ff;border:1px solid #cfe0ff;margin:0 0 18px}
.ccg .warn{background:#fff8dc;border-color:#f0dd85;color:#5c4a00}.ccg details{border:1px solid var(--cc-line,#d9e5f7);border-radius:14px;padding:14px 18px;margin:0 0 10px;background:var(--cc-card,#fff)}
.ccg summary{cursor:pointer;font-weight:800}.ccg details p{margin:10px 0 0}
html.ccp-dark-theme .ccg .box{background:#12274d;border-color:#27406e}html.ccp-dark-theme .ccg .warn{background:#3a3210;border-color:#6a5a14;color:#ffeaa0}'''

GUIDE = {
 'ru': dict(title='Как установить модуль CodeCart PRO на OpenCart и ocStore', slug='kak-ustanovit-modul', mt='Как установить модуль OpenCart/ocStore (.ocmod.zip) — пошаговая инструкция',
  md='Пошаговая установка модулей CodeCart PRO на OpenCart 3.0.x и ocStore 3.0.x: резервная копия, установщик, модификаторы, лицензия, обновление и удаление.',
  lead='Все модули CodeCart PRO устанавливаются стандартным установщиком OpenCart — архивом .ocmod.zip, без FTP и правок ядра. Займёт 5–10 минут.',
  steps=[('Сделайте резервную копию','Сохраните файлы сайта и базу данных. Для модулей, которые меняют базу или изображения, это обязательно. Лучше сначала проверить модуль на тестовой копии магазина.'),
         ('Загрузите архив','Админка → Дополнения → Установка расширений → «Загрузить» и выберите файл .ocmod.zip. Дождитесь сообщения об успешной установке.'),
         ('Обновите модификаторы','Админка → Дополнения → Модификации → кнопка «Обновить». Затем очистите кеш Twig/темы и кеш страниц или CDN, если он у вас включён.'),
         ('Установите расширение','Админка → Дополнения → Дополнения, выберите тип (чаще всего «Модули»), найдите модуль и нажмите зелёную кнопку «Установить», затем «Изменить».'),
         ('Активируйте лицензию','Введите ключ из заказа в настройках модуля. Лицензии CodeCart PRO постоянные: они привязаны к домену и не требуют ежегодного продления.'),
         ('Включите и проверьте','Большинство модулей после установки выключены. Настройте параметры, включите статус, сохраните и проверьте работу на витрине или в админке.')],
  boxh='Обновление и удаление', box='Обновление: сделайте резервную копию, загрузите новый архив поверх установленного, обновите модификаторы и откройте модуль — нажмите «Сохранить» один раз. Удаление: выключите модуль, нажмите «Удалить» в списке дополнений, затем удалите архив в «Установке расширений» и обновите модификаторы.',
  warn='Совместимость: OpenCart 3.0.x и ocStore 3.0.x (включая 3.0.4.1). Требования к версии PHP указаны на странице каждого модуля. Перед покупкой можно открыть демо-админку: demo.codecartpro.com/admin (логин и пароль: Demo).',
  help='Нужна помощь? Напишите на support@codecartpro.com — подскажем по установке и настройке.'),
 'uk': dict(title='Як встановити модуль CodeCart PRO на OpenCart та ocStore', slug='yak-vstanovyty-modul', mt='Як встановити модуль OpenCart/ocStore (.ocmod.zip) — покрокова інструкція',
  md='Покрокове встановлення модулів CodeCart PRO на OpenCart 3.0.x та ocStore 3.0.x: резервна копія, установник, модифікатори, ліцензія, оновлення та видалення.',
  lead='Усі модулі CodeCart PRO встановлюються стандартним установником OpenCart — архівом .ocmod.zip, без FTP і правок ядра. Це займе 5–10 хвилин.',
  steps=[('Зробіть резервну копію','Збережіть файли сайту та базу даних. Для модулів, що змінюють базу чи зображення, це обов’язково. Краще спочатку перевірити модуль на тестовій копії магазину.'),
         ('Завантажте архів','Адмінка → Додатки → Встановлення розширень → «Завантажити» і оберіть файл .ocmod.zip. Дочекайтеся повідомлення про успішне встановлення.'),
         ('Оновіть модифікатори','Адмінка → Додатки → Модифікації → кнопка «Оновити». Потім очистіть кеш Twig/теми та кеш сторінок чи CDN, якщо він увімкнений.'),
         ('Встановіть розширення','Адмінка → Додатки → Додатки, оберіть тип (найчастіше «Модулі»), знайдіть модуль і натисніть зелену кнопку «Встановити», потім «Редагувати».'),
         ('Активуйте ліцензію','Введіть ключ із замовлення в налаштуваннях модуля. Ліцензії CodeCart PRO постійні: вони прив’язані до домену й не потребують щорічного продовження.'),
         ('Увімкніть і перевірте','Більшість модулів після встановлення вимкнені. Налаштуйте параметри, увімкніть статус, збережіть і перевірте роботу на вітрині чи в адмінці.')],
  boxh='Оновлення та видалення', box='Оновлення: зробіть резервну копію, завантажте новий архів поверх встановленого, оновіть модифікатори й відкрийте модуль — натисніть «Зберегти» один раз. Видалення: вимкніть модуль, натисніть «Видалити» у списку додатків, потім видаліть архів у «Встановленні розширень» і оновіть модифікатори.',
  warn='Сумісність: OpenCart 3.0.x та ocStore 3.0.x (зокрема 3.0.4.1). Вимоги до версії PHP вказані на сторінці кожного модуля. Перед купівлею можна відкрити демо-адмінку: demo.codecartpro.com/admin (логін і пароль: Demo).',
  help='Потрібна допомога? Напишіть на support@codecartpro.com — підкажемо щодо встановлення й налаштування.'),
 'en': dict(title='How to install a CodeCart PRO module on OpenCart and ocStore', slug='how-to-install-modules', mt='How to install an OpenCart/ocStore module (.ocmod.zip) — step by step',
  md='Step-by-step installation of CodeCart PRO modules on OpenCart 3.0.x and ocStore 3.0.x: backup, installer, modifications, license, update and removal.',
  lead='Every CodeCart PRO module installs through the standard OpenCart installer as an .ocmod.zip archive — no FTP and no core edits. It takes 5–10 minutes.',
  steps=[('Make a backup','Save your site files and database. It is mandatory for modules that change the database or images. Ideally test the module on a staging copy first.'),
         ('Upload the archive','Admin → Extensions → Installer → “Upload” and choose the .ocmod.zip file. Wait for the success message.'),
         ('Refresh modifications','Admin → Extensions → Modifications → “Refresh”. Then clear the Twig/theme cache and the page or CDN cache if you use one.'),
         ('Install the extension','Admin → Extensions → Extensions, pick the type (usually “Modules”), find the module, click the green “Install” button, then “Edit”.'),
         ('Activate the license','Enter the key from your order in the module settings. CodeCart PRO licenses are lifetime: bound to a domain, with no yearly renewal.'),
         ('Enable and verify','Most modules are OFF after install. Set the options, enable the status, save and check the result on the storefront or in the admin.')],
  boxh='Updating and removing', box='Update: back up, upload the new archive over the installed one, refresh modifications and open the module — press “Save” once. Remove: disable the module, click “Uninstall” in the extension list, then delete the archive in the Installer and refresh modifications.',
  warn='Compatibility: OpenCart 3.0.x and ocStore 3.0.x (including 3.0.4.1). PHP requirements are shown on each module page. Before buying you can open the demo admin: demo.codecartpro.com/admin (login and password: Demo).',
  help='Need help? Write to support@codecartpro.com — we will guide you through installation and setup.'),
}
FAQ = {
 'ru': dict(title='Частые вопросы о модулях и системе CodeCart PRO', slug='chasto-zadavaemye-voprosy', mt='FAQ: модули CodeCart PRO, лицензии, демо, установка', md='Ответы на частые вопросы: бесплатна ли система CodeCart PRO 3.0.6.0, как проверить модуль, какие версии OpenCart поддерживаются, как работает лицензия и обновления.',
  lead='Коротко о главном: что бесплатно, что платно и как всё проверить до покупки.',
  qa=[('Система CodeCart PRO действительно бесплатная?','Да. CodeCart PRO 3.0.6.0 — свободная система под GNU GPL v3, её можно скачать без регистрации на странице «Скачать». Платные здесь — отдельные модули.'),
      ('Как проверить модуль до покупки?','Откройте демо-админку demo.codecartpro.com/admin (логин и пароль: Demo) и посмотрите настройки модулей. Состав демо может меняться — проверяйте нужную функцию перед покупкой.'),
      ('Какие версии OpenCart и PHP поддерживаются?','Модули рассчитаны на OpenCart 3.0.x и ocStore 3.0.x (включая 3.0.4.1). Диапазон PHP зависит от модуля — обычно 7.4–8.5, он указан в описании.'),
      ('Как работает лицензия?','Лицензия постоянная и привязана к домену. Ключ вводится в настройках модуля; ежегодного продления для работы модуля не требуется.'),
      ('Как установить модуль?','Стандартным установщиком OpenCart, архивом .ocmod.zip. Подробно: страница «Как установить модуль».'),
      ('Модули меняют файлы ядра?','Нет. Модули работают через OCMOD, события и собственные файлы; изменения обратимы — их можно отключить и удалить.'),
      ('Что будет после обновления модуля?','Загрузите новый архив поверх старого, обновите модификаторы и один раз сохраните настройки. Перед обновлением делайте резервную копию.'),
      ('Куда обратиться за помощью?','Напишите на support@codecartpro.com или в Telegram-сообщество проекта. Условия лицензии, гарантии и возврата — на странице «Лицензия, гарантия и возврат».')]),
 'uk': dict(title='Поширені запитання про модулі та систему CodeCart PRO', slug='poshyreni-zapytannya', mt='FAQ: модулі CodeCart PRO, ліцензії, демо, встановлення', md='Відповіді на поширені запитання: чи безкоштовна система CodeCart PRO 3.0.6.0, як перевірити модуль, які версії OpenCart підтримуються, як працює ліцензія та оновлення.',
  lead='Коротко про головне: що безкоштовно, що платно та як усе перевірити до купівлі.',
  qa=[('Система CodeCart PRO справді безкоштовна?','Так. CodeCart PRO 3.0.6.0 — вільна система під GNU GPL v3, її можна завантажити без реєстрації на сторінці «Завантажити». Платними тут є окремі модулі.'),
      ('Як перевірити модуль до купівлі?','Відкрийте демо-адмінку demo.codecartpro.com/admin (логін і пароль: Demo) та перегляньте налаштування модулів. Склад демо може змінюватися — перевіряйте потрібну функцію перед купівлею.'),
      ('Які версії OpenCart і PHP підтримуються?','Модулі розраховані на OpenCart 3.0.x та ocStore 3.0.x (зокрема 3.0.4.1). Діапазон PHP залежить від модуля — зазвичай 7.4–8.5, він вказаний в описі.'),
      ('Як працює ліцензія?','Ліцензія постійна й прив’язана до домену. Ключ вводиться в налаштуваннях модуля; щорічного продовження для роботи модуля не потрібно.'),
      ('Як встановити модуль?','Стандартним установником OpenCart, архівом .ocmod.zip. Докладно: сторінка «Як встановити модуль».'),
      ('Модулі змінюють файли ядра?','Ні. Модулі працюють через OCMOD, події та власні файли; зміни оборотні — їх можна вимкнути й видалити.'),
      ('Що буде після оновлення модуля?','Завантажте новий архів поверх старого, оновіть модифікатори й один раз збережіть налаштування. Перед оновленням робіть резервну копію.'),
      ('Куди звернутися по допомогу?','Напишіть на support@codecartpro.com або в Telegram-спільноту проєкту. Умови ліцензії, гарантії та повернення — на сторінці «Ліцензія, гарантія та повернення».')]),
 'en': dict(title='CodeCart PRO modules and system — frequently asked questions', slug='faq-modules', mt='FAQ: CodeCart PRO modules, licenses, demo, installation', md='Answers to common questions: is the CodeCart PRO 3.0.6.0 system free, how to test a module, which OpenCart versions are supported, how licensing and updates work.',
  lead='The essentials: what is free, what is paid and how to check everything before you buy.',
  qa=[('Is the CodeCart PRO system really free?','Yes. CodeCart PRO 3.0.6.0 is free software under GNU GPL v3 and can be downloaded without registration on the Download page. Only the separate modules are paid.'),
      ('How can I test a module before buying?','Open the demo admin at demo.codecartpro.com/admin (login and password: Demo) and review the module settings. Demo contents may change — check the feature you need before purchasing.'),
      ('Which OpenCart and PHP versions are supported?','Modules target OpenCart 3.0.x and ocStore 3.0.x (including 3.0.4.1). The PHP range depends on the module — usually 7.4–8.5, shown in its description.'),
      ('How does licensing work?','The license is lifetime and bound to a domain. The key is entered in the module settings; no yearly renewal is needed for the module to work.'),
      ('How do I install a module?','With the standard OpenCart installer using the .ocmod.zip archive. Details: the “How to install a module” page.'),
      ('Do modules change core files?','No. Modules work through OCMOD, events and their own files; changes are reversible — you can disable and remove them.'),
      ('What happens when I update a module?','Upload the new archive over the old one, refresh modifications and save the settings once. Back up before updating.'),
      ('Where do I get help?','Write to support@codecartpro.com or join the project’s Telegram community. License, warranty and refund terms are on the “License, Warranty and Refunds” page.')]),
}

def guide_html(k):
    g = GUIDE[k]
    st = ''.join(f'<li><b>{html.escape(a)}</b>{html.escape(b)}</li>' for a, b in g['steps'])
    return re_min(f'<style>{CSS}</style><div class="ccg"><h2>{html.escape(g["title"])}</h2><p class="lead">{html.escape(g["lead"])}</p><ol class="st">{st}</ol>'
                  f'<h3>{html.escape(g["boxh"])}</h3><div class="box">{html.escape(g["box"])}</div><div class="box warn">{html.escape(g["warn"])}</div><p>{html.escape(g["help"])}</p></div>')

def faq_html(k):
    g = FAQ[k]
    qa = ''.join(f'<details><summary>{html.escape(a)}</summary><p>{html.escape(b)}</p></details>' for a, b in g['qa'])
    ld = json.dumps({"@context": "https://schema.org", "@type": "FAQPage", "mainEntity": [{"@type": "Question", "name": a, "acceptedAnswer": {"@type": "Answer", "text": b}} for a, b in g['qa']]}, ensure_ascii=False)
    return re_min(f'<style>{CSS}</style><div class="ccg"><h2>{html.escape(g["title"])}</h2><p class="lead">{html.escape(g["lead"])}</p>{qa}</div><script type="application/ld+json">{ld}</script>')

def sql_pages():
    o = ['-- 7) Новые информационные страницы: «Как установить модуль» (id 15) и «FAQ» (id 16), 3 языка, ЧПУ, в подвале.', 'SET NAMES utf8mb4;', 'START TRANSACTION;',
         "DELETE FROM `oc_information` WHERE `information_id` IN (15,16);", "DELETE FROM `oc_information_description` WHERE `information_id` IN (15,16);",
         "DELETE FROM `oc_information_to_store` WHERE `information_id` IN (15,16);", "DELETE FROM `oc_seo_url` WHERE `store_id`=0 AND `query` IN ('information_id=15','information_id=16');"]
    o.append("INSERT INTO `oc_information` (`information_id`,`bottom`,`sort_order`,`status`,`noindex`) VALUES (15,1,1,1,1),(16,1,2,1,1);")
    o.append("INSERT INTO `oc_information_to_store` (`information_id`,`store_id`) VALUES (15,0),(16,0);")
    for iid, D, fn in ((15, GUIDE, guide_html), (16, FAQ, faq_html)):
        for lid, k in LN.items():
            g = D[k]
            o.append("INSERT INTO `oc_information_description` (`information_id`,`language_id`,`title`,`description`,`meta_title`,`meta_description`,`meta_keyword`,`meta_h1`) VALUES "
                     f"({iid},{lid},{q(esc(g['title']))},{q(esc(fn(k)))},{q(esc(g['mt']))},{q(esc(g['md']))},'',{q(esc(g['title']))});")
        o.append("INSERT INTO `oc_seo_url` (`store_id`,`language_id`,`query`,`keyword`) VALUES " + ','.join(f"(0,{lid},'information_id={iid}',{q(D[k]['slug'])})" for lid, k in LN.items()) + ';')
    o.append('COMMIT;')
    return '\n'.join(o) + '\n'

# ------------------------------------------------------------------ выдача файлов
ZIPDIR = SCR/'zips.txt'   # список имён архивов (по одному в строке): tools/zips.txt
ALIAS = {97: 'SMSfly_Order_Pro_Quick_Order'}
def norm(s): return re.sub(r'[^a-z0-9]', '', s.lower())
def sql_downloads():
    zips = [l.strip() for l in open(ZIPDIR, encoding='utf8') if l.strip()]
    bykey = {}
    for z in zips:
        base = re.sub(r'_v\d+(\.\d+)*(\.ocmod)?\.zip$', '', z)
        bykey[norm(base)] = z
    o = ['-- 8) Выдача файлов покупателям: каждому модулю сопоставляется архив из «Загрузок» OpenCart.',
         '-- ПЕРЕД выполнением загрузите архивы в каталог storage/download/ (рядом с storage/modification) под ТОЧНЫМИ именами, указанными ниже.',
         '-- Скрипт безопасен для повторного запуска: старые записи с теми же файлами заменяются.', 'SET NAMES utf8mb4;', 'START TRANSACTION;']
    done, missing = [], []
    for p in ACTIVE_P:
        slug = norm(p['image'].split('/')[-1].replace('.webp', ''))
        z = ALIAS.get(p['id']) and bykey.get(norm(ALIAS[p['id']])) or bykey.get(slug) or next((v for k, v in bykey.items() if k == slug.replace('pro', '') or k.replace('pro', '') == slug.replace('pro', '')), None)
        if not z: missing.append(p['id']); continue
        pid = p['id']
        nm = html.unescape(p['names']['3']['name']).split(' — ')[0].replace(' для OpenCart', '').replace('Pro', 'PRO')
        o.append(f"DELETE d, dd FROM `oc_download` d LEFT JOIN `oc_download_description` dd ON dd.download_id=d.download_id WHERE d.filename={q(z)};")
        o.append(f"INSERT INTO `oc_download` (`filename`,`mask`,`date_added`) VALUES ({q(z)},{q(z)},NOW());")
        o.append("SET @d = LAST_INSERT_ID();")
        o.append("INSERT INTO `oc_download_description` (`download_id`,`language_id`,`name`) VALUES " + ','.join(f"(@d,{l},{q(nm)})" for l in (1, 2, 3)) + ';')
        o.append(f"DELETE FROM `oc_product_to_download` WHERE `product_id`={pid};")
        o.append(f"INSERT INTO `oc_product_to_download` (`product_id`,`download_id`) VALUES ({pid},@d);")
        done.append(pid)
    o.append('COMMIT;')
    o.append(f"-- привязано модулей: {len(done)}; без архива в списке: {missing}")
    return '\n'.join(o) + '\n', done, missing

from prodtext import ACTIVE as ACTIVE_P
if __name__ == '__main__':
    (OUT/'sql/07_info_pages.sql').write_text(sql_pages(), encoding='utf8')
    s, done, miss = sql_downloads()
    (OUT/'sql/08_downloads.sql').write_text(s, encoding='utf8')
    print('downloads', len(done), 'missing', miss)
