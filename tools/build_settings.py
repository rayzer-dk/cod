import json, re
from common import *
from build_sql import q, esc, svg

QL = {  # lang_id -> texts/links
 '3': dict(dl=('Скачать CodeCart бесплатно','Система 3.0.6.0 · GNU GPL v3','/skachat/'), demo=('Демо-админка модулей','Логин и пароль: Demo','https://demo.codecartpro.com/admin/'),
           cat=('Каталог модулей','70+ решений для OpenCart и ocStore','/codecartpro-ru/'), buy=('Как купить модули','Оплата, лицензия, получение','/pokupka-moduley/'), price='/module-prices-codecart-pro-ru/', blog='/blog/', lang='ru'),
 '1': dict(dl=('Завантажити CodeCart безкоштовно','Система 3.0.6.0 · GNU GPL v3','/download/'), demo=('Демо-адмінка модулів','Логін і пароль: Demo','https://demo.codecartpro.com/admin/'),
           cat=('Каталог модулів','70+ рішень для OpenCart та ocStore','/codecartpro/'), buy=('Як придбати модулі','Оплата, ліцензія, отримання','/buy-modules/'), price='/module-prices-codecart-pro/', blog='/blog/', lang='uk'),
 '2': dict(dl=('Download CodeCart for free','System 3.0.6.0 · GNU GPL v3','/download-en/'), demo=('Modules demo admin','Login and password: Demo','https://demo.codecartpro.com/admin/'),
           cat=('Module catalog','70+ solutions for OpenCart and ocStore','/codecartpro-en/'), buy=('How to buy modules','Payment, license, delivery','/buy-modules-en/'), price='/module-prices-codecart-pro-en/', blog='/blog/', lang='en'),
}
STRIP_CSS = '''.ccq{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:14px;margin:22px 0 8px}
.ccq a{display:flex;align-items:center;gap:14px;padding:16px 18px;border-radius:18px;background:#fff;border:1px solid #dfe8f4;box-shadow:0 14px 34px rgba(8,30,66,.10);color:#0b1b3a;text-decoration:none;transition:.2s}
.ccq a:hover{transform:translateY(-3px);box-shadow:0 20px 44px rgba(8,30,66,.16);border-color:#0a66f0;text-decoration:none;color:#0b1b3a}
.ccq a.is-main{background:linear-gradient(135deg,#0649b3,#0a66f0);border-color:#0b3f86;color:#fff}
.ccq a.is-main:hover{color:#fff}
.ccq i{flex:none;width:48px;height:48px;border-radius:14px;display:flex;align-items:center;justify-content:center;background:linear-gradient(145deg,#0a66f0,#0649b3)}
.ccq a.is-main i{background:#ffc21a}
.ccq svg{width:26px;height:26px}
.ccq b{display:block;font-size:15px;line-height:1.25;font-weight:800}
.ccq small{display:block;margin-top:3px;font-size:12.5px;line-height:1.3;color:#4a5f82}
.ccq a.is-main small{color:#e3eeff}
html.ccp-dark-theme .ccq a{background:#1e293b;border-color:#334155;color:#f1f5fb}
html.ccp-dark-theme .ccq small{color:#b8c6da}
@media(max-width:991px){.ccq{grid-template-columns:repeat(2,minmax(0,1fr))}}
@media(max-width:575px){.ccq{grid-template-columns:1fr}}'''

def strip_html(l):
    t = QL[l]; ic = lambda n,c='#fff': svg(n,26,c,1.8)
    items = [('download', t['dl'], True), ('themes', t['demo'], False), ('catalog', t['cat'], False), ('payment', t['buy'], False)]
    cards = ''
    for icon,(h,s,href),main in items:
        ext = ' target="_blank" rel="noopener"' if href.startswith('http') else ''
        cards += f'<a href="{href}"{ext} class="{"is-main" if main else ""}"><i>{ic(icon, "#0b1b3a" if main else "#fff")}</i><span><b>{h}</b><small>{s}</small></span></a>'
    return f'<style>{STRIP_CSS}</style><div class="ccq">{cards}</div>'

def sql():
    o = ["-- 6) Настройки магазина, меню, блок быстрых ссылок на главной, FAQ/доверие для карточек модулей, исправление ссылок.",
         "SET NAMES utf8mb4;","START TRANSACTION;"]
    def st(key, val):
        o.append(f"UPDATE `oc_setting` SET `value`={q(val)} WHERE `store_id`=0 AND `key`={q(key)};")
    T = 'theme_codecart_pro_'
    o.append("-- ВАЖНО: информационный режим скрывал цены, корзину и покупку на ВСЁМ сайте. Для магазина модулей он должен быть выключен.")
    st(T+'information_mode','0')
    o.append("-- Карточки: для цифровых модулей нужна кнопка «В корзину», а выбор количества не нужен")
    st(T+'card_show_buy_button','1'); st(T+'card_show_quantity','0')
    o.append("-- Фирменные цвета по логотипу, скругления, контейнер")
    for k,v in (('primary_color','#0a66f0'),('accent_color','#ffc21a'),('text_color','#0b1b3a'),('background_color','#f1f6ff'),('page_side_background_color','#f1f6ff'),
                ('price_color','#0a66f0'),('menu_bg_color','#0a66f0'),('menu_text_color','#ffffff'),('footer_bg_color','#0b1b3a'),('footer_text_color','#c3d3ee'),
                ('container_width','1360'),('element_radius','14'),('card_radius','20'),('button_radius','14'),
                ('dark_theme_background','#07142b'),('dark_theme_surface','#0b1b3a'),('dark_theme_card','#12274d'),('dark_theme_border','#27406e')):
        st(T+k, v)
    o.append("-- Логотип и иконка сайта (файлы из assets/brand → /image/catalog/codecartpro/brand/)")
    o.append("UPDATE `oc_setting` SET `value`='catalog/codecartpro/brand/logo.png' WHERE `store_id`=0 AND `key` IN ('config_logo','theme_codecart_pro_seo_organization_logo');")
    o.append("UPDATE `oc_setting` SET `value`='catalog/codecartpro/brand/favicon-192.png' WHERE `store_id`=0 AND `key`='config_icon';")
    sig = {'1':'© 2026 CodeCart PRO. Усі права захищені.','2':'© 2026 CodeCart PRO. All rights reserved.','3':'© 2026 CodeCart PRO. Все права защищены.'}
    st(T+'footer_signature', json.dumps(sig, ensure_ascii=True))
    o.append("-- Обложки квадратные: размеры и пропорции миниатюр")
    for k,v in (('image_product_width','480'),('image_product_height','480'),('image_related_width','480'),('image_related_height','480'),
                ('home_category_wall_image_width','600'),('home_category_wall_image_height','600'),('product_gallery_ratio','1x1')):
        st(T+k, v)
    o.append("-- На главной показываем 10 основных категорий (остальные — в меню и каталоге)")
    st(T+'home_category_wall_category_ids','59,60,61,62,63,64,66,67,69,71')
    o.append("-- Пункт меню «Скачать CodeCart»")
    ttl = {'1':'Завантажити CodeCart','2':'Download CodeCart','3':'Скачать CodeCart'}
    st(T+'menu_link1_title', json.dumps(ttl, ensure_ascii=True)); st(T+'menu_link1_url','/download/'); st(T+'menu_link1_icon','fa-download')
    o.append("-- FAQ, доверие и доставка в карточке модуля были написаны для физических товаров (мощность, размер, доставка, гарантия)")
    faq = {
     '3':'Как проверить модуль перед покупкой?|Откройте демо-админку demo.codecartpro.com/admin (логин и пароль: Demo) и посмотрите настройки модуля. Состав демо может меняться.\r\nКакие версии OpenCart и PHP поддерживаются?|Если в карточке не указано иное — OpenCart 3.0.x, ocStore 3.0.x и PHP 7.4–8.5. Перед установкой сделайте резервную копию и проверьте модуль на тестовой копии.\r\nКак получить модуль после оплаты?|После успешной оплаты вы получаете файл, ссылку, ключ или инструкцию, предусмотренные товаром. Подробности — на странице «Покупка, оплата и получение».\r\nЧто с поддержкой и возвратом?|Условия лицензии, технической гарантии и возвратов описаны на странице «Лицензия, гарантия и возврат».',
     '1':'Як перевірити модуль перед купівлею?|Відкрийте демо-адмінку demo.codecartpro.com/admin (логін і пароль: Demo) та перегляньте налаштування модуля. Склад демо може змінюватися.\r\nЯкі версії OpenCart і PHP підтримуються?|Якщо в картці не вказано інше — OpenCart 3.0.x, ocStore 3.0.x і PHP 7.4–8.5. Перед встановленням зробіть резервну копію та перевірте модуль на тестовій копії.\r\nЯк отримати модуль після оплати?|Після успішної оплати ви отримуєте файл, посилання, ключ або інструкцію, передбачені товаром. Подробиці — на сторінці «Купівля, оплата та отримання».\r\nЩо з підтримкою та поверненням?|Умови ліцензії, технічної гарантії та повернень описано на сторінці «Ліцензія, гарантія та повернення».',
     '2':'How can I try a module before buying?|Open the demo admin at demo.codecartpro.com/admin (login and password: Demo) and review the module settings. The demo contents may change.\r\nWhich OpenCart and PHP versions are supported?|Unless the product page says otherwise: OpenCart 3.0.x, ocStore 3.0.x and PHP 7.4–8.5. Back up first and test on a staging copy.\r\nHow do I receive the module after payment?|After a successful payment you receive the file, link, key or instructions provided with the product. See the “Purchase, payment and delivery” page.\r\nWhat about support and refunds?|License, technical warranty and refund terms are described on the “License, warranty and refunds” page.'}
    st(T+'product_faq', json.dumps(faq, ensure_ascii=True))
    trust = {'1':'Демо перед купівлею|Безпечна оплата|OpenCart / ocStore 3.x|Підтримка','3':'Демо перед покупкой|Безопасная оплата|OpenCart / ocStore 3.x|Поддержка','2':'Demo before purchase|Secure payment|OpenCart / ocStore 3.x|Support'}
    st(T+'product_trust_badges', json.dumps(trust, ensure_ascii=True))
    deliv = {'1':'Після успішної оплати ви отримуєте файл, посилання, ключ або інструкцію, передбачені товаром. Фізична доставка не потрібна.',
             '3':'После успешной оплаты вы получаете файл, ссылку, ключ или инструкцию, предусмотренные товаром. Физическая доставка не требуется.',
             '2':'After a successful payment you receive the file, link, key or instructions provided with the product. No physical shipping is required.'}
    st(T+'product_delivery_text', json.dumps(deliv, ensure_ascii=True))
    o.append("-- Телефон-заглушка 123456789 попадал в разметку и контакты")
    o.append("UPDATE `oc_setting` SET `value`='+380992622122' WHERE `store_id`=0 AND `key`='config_telephone' AND `value`='123456789';")
    o.append("-- Блок быстрых ссылок на главной под слайдером (новый HTML-модуль)")
    desc = {l: {'title':'', 'description': esc(strip_html(l))} for l in ('1','2','3')}
    setting = json.dumps({'name':'CodeCart PRO — быстрые ссылки главной','module_description':desc,'status':'1'}, ensure_ascii=True, separators=(',',':'))
    o.append(f"INSERT INTO `oc_module` (`name`,`code`,`setting`) VALUES ('CodeCart PRO — быстрые ссылки главной','html',{q(setting)});")
    o.append("SET @ccq_id = LAST_INSERT_ID();")
    o.append("INSERT INTO `oc_layout_module` (`layout_id`,`code`,`position`,`sort_order`) VALUES (1, CONCAT('html.', @ccq_id), 'content_top', 1);")
    o.append("-- Ссылки в SEO-блоке главной (module 36): язык-зависимые адреса и актуальные страницы")
    import subprocess
    raw = subprocess.run(['mysql','--default-character-set=utf8mb4','cc','-N','-B','-e','select hex(setting) from oc_module where module_id=36'],capture_output=True,text=True).stdout.strip()
    m36 = json.loads(bytes.fromhex(raw).decode('utf8'))
    rep = {'3':{'/buy-modules/':'/pokupka-moduley/','/download/':'/skachat/','/module-prices-codecart-pro/':'/module-prices-codecart-pro-ru/'},
           '2':{'/buy-modules/':'/buy-modules-en/','/download/':'/download-en/','/module-prices-codecart-pro/':'/module-prices-codecart-pro-en/'}}
    for lid, mp in rep.items():
        d = m36['module_description'][lid]['description']
        for a,b in mp.items(): d = d.replace(a,b)
        m36['module_description'][lid]['description'] = d
    o.append(f"UPDATE `oc_module` SET `setting`={q(json.dumps(m36, ensure_ascii=True, separators=(',',':')))} WHERE `module_id`=36;")
    o.append("-- То же в странице «Покупка модулей» (information_id=13)")
    o.append("UPDATE `oc_information_description` SET `description`=REPLACE(`description`,'/module-prices-codecart-pro/','/module-prices-codecart-pro-ru/') WHERE `information_id`=13 AND `language_id`=3;")
    o.append("UPDATE `oc_information_description` SET `description`=REPLACE(`description`,'/module-prices-codecart-pro/','/module-prices-codecart-pro-en/') WHERE `information_id`=13 AND `language_id`=2;")
    o.append("COMMIT;")
    return '\n'.join(o) + '\n'

if __name__ == '__main__':
    css = (OUT/'css/codecart-brand.css').read_text(encoding='utf8')
    body = sql().replace("COMMIT;", f"-- Слой CSS «Brand» (тот же код лежит в css/codecart-brand.css)\nUPDATE `oc_setting` SET `value`={q(css)} WHERE `store_id`=0 AND `key`='theme_codecart_pro_custom_css_global';\nUPDATE `oc_setting` SET `value`='1' WHERE `store_id`=0 AND `key`='theme_codecart_pro_enable_custom_css';\nCOMMIT;")
    (OUT/'sql/06_settings_home_menu.sql').write_text(body, encoding='utf8')
    print(len(body))
