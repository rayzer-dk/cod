import json, html, re, collections, subprocess
from common import *
from catdata import CATTXT
from download_page import L as DL, esc, q
from prodtext import ACTIVE

LNAME = {'1':'uk','2':'en','3':'ru'}
out = []
def w(s=''): out.append(s)

def pro(t): return re.sub(r'\bPro\b','PRO',t)

# ---------------------------------------------------------------- 02 images + banners
def sql_images():
    o = ["-- 2) Новые обложки и баннеры. Сначала загрузите папку images/ в /image/catalog/codecartpro/v3/ (см. README).",
         "SET NAMES utf8mb4;","START TRANSACTION;"]
    for p in ACTIVE:
        if p['image'].startswith('catalog/codecartpro/products/'):
            fn = p['image'].split('/')[-1]
            o.append(f"UPDATE `oc_product` SET `image`='catalog/codecartpro/v3/products/{fn}', `date_modified`=NOW() WHERE `product_id`={p['id']};")
    for cid in CAT_IDS:
        o.append(f"UPDATE `oc_category` SET `image`='catalog/codecartpro/v3/categories/cat-{cid}.webp', `date_modified`=NOW() WHERE `category_id`={cid};")
    o.append("COMMIT;")
    return '\n'.join(o) + '\n'

CAT_IDS = [59,60,61,62,63,64,66,67,68,69,70,71,72,73,75,76,77,78]

BAN = {  # lang_id -> list of (title, link)
 '3': [('CodeCart PRO 3.0.6.0 — бесплатная система OpenCart','/skachat/'),('70+ модулей для OpenCart и ocStore','/codecartpro-ru/'),('AI-модули CodeCart PRO','/ai-moduli-ru/'),('Демо-админка модулей CodeCart PRO','https://demo.codecartpro.com/admin/')],
 '1': [('CodeCart PRO 3.0.6.0 — безкоштовна система OpenCart','/download/'),('70+ модулів для OpenCart та ocStore','/codecartpro/'),('AI-модулі CodeCart PRO','/ai-moduli/'),('Демо-адмінка модулів CodeCart PRO','https://demo.codecartpro.com/admin/')],
 '2': [('CodeCart PRO 3.0.6.0 — free OpenCart system','/download-en/'),('70+ modules for OpenCart and ocStore','/codecartpro-en/'),('CodeCart PRO AI modules','/ai-modules/'),('CodeCart PRO modules demo admin','https://demo.codecartpro.com/admin/')],
}
def sql_banners():
    o = ["-- 3) Слайдшоу главной (banner_id=7): новые 4 слайда на каждый язык, с ссылками.", "SET NAMES utf8mb4;", "START TRANSACTION;",
         "DELETE FROM `oc_banner_image` WHERE `banner_id`=7;"]
    rows = []
    for lid, lst in BAN.items():
        folder = LNAME[lid]
        for i,(t,link) in enumerate(lst,1):
            rows.append(f"(7,{lid},{q(t)},{q(link)},'catalog/codecartpro/v3/banners/{folder}/slide-{i}.webp',{i})")
    o.append("INSERT INTO `oc_banner_image` (`banner_id`,`language_id`,`title`,`link`,`image`,`sort_order`) VALUES\n" + ',\n'.join(rows) + ';')
    o.append("-- размер слайдшоу под новые баннеры 3:1")
    o.append("UPDATE `oc_module` SET `setting`=REPLACE(REPLACE(`setting`,'\"width\":\"1140\"','\"width\":\"1500\"'),'\"height\":\"380\"','\"height\":\"500\"') WHERE `module_id`=27;")
    o.append("COMMIT;")
    return '\n'.join(o) + '\n'

# ---------------------------------------------------------------- 03 categories
def cat_html(cid, lid):
    name = html.unescape(DATA['cats'][str(cid)][lid])
    blurb, bullets = CATTXT[cid][lid]
    h = {'3':('Что решают модули','Демо и покупка','Перед покупкой проверьте модуль в <a href="https://demo.codecartpro.com/admin/" target="_blank" rel="noopener">тестовой админке</a> (логин Demo, пароль Demo). Совместимость — OpenCart / ocStore 3.0.x, подробности указаны в карточке каждого модуля.'),
         '1':('Що вирішують модулі','Демо та купівля','Перед купівлею перевірте модуль у <a href="https://demo.codecartpro.com/admin/" target="_blank" rel="noopener">тестовій адмінці</a> (логін Demo, пароль Demo). Сумісність — OpenCart / ocStore 3.0.x, подробиці вказано в картці кожного модуля.'),
         '2':('What these modules solve','Demo and purchase','Try a module in the <a href="https://demo.codecartpro.com/admin/" target="_blank" rel="noopener">demo admin</a> before buying (login Demo, password Demo). Compatibility: OpenCart / ocStore 3.0.x — see each module page for details.')}[lid]
    lis = ''.join(f'<li>{b}</li>' for b in bullets)
    return f'<div class="ccp-cat-desc"><p class="ccp-cat-desc__lead">{blurb}</p><h3>{h[0]}</h3><ul>{lis}</ul><p class="ccp-cat-desc__note">{h[2]}</p></div>'

CAT_META = {
 '3': ('{n} для OpenCart и ocStore — CodeCart PRO','{n}: модули CodeCart PRO для OpenCart 3.0.x и ocStore 3.0.x. Описание, демо перед покупкой и цены.'),
 '1': ('{n} для OpenCart та ocStore — CodeCart PRO','{n}: модулі CodeCart PRO для OpenCart 3.0.x та ocStore 3.0.x. Опис, демо перед купівлею та ціни.'),
 '2': ('{n} for OpenCart and ocStore — CodeCart PRO','{n}: CodeCart PRO modules for OpenCart 3.0.x and ocStore 3.0.x. Details, demo before purchase and pricing.'),
}
def sql_categories():
    o = ["-- 4) Категории: уникальные описания и мета, исправление URL (69/70 были перепутаны), URL для категории 77.",
         "SET NAMES utf8mb4;","START TRANSACTION;"]
    for cid in CAT_IDS:
        for lid in ('1','2','3'):
            name = html.unescape(DATA['cats'][str(cid)][lid])
            mt, md = CAT_META[lid]
            # в БД имена хранятся экранированными (&amp;), meta берём «чистыми» и экранируем так же
            o.append(f"UPDATE `oc_category_description` SET `description`={q(esc(cat_html(cid,lid)))}, `meta_title`={q(esc(mt.format(n=name)))}, `meta_description`={q(esc(md.format(n=name)))} WHERE `category_id`={cid} AND `language_id`={lid};")
    o += [
     "-- URL категорий 69 («Безопасность») и 70 («Отзывы») были перепутаны местами во всех языках",
     "DELETE FROM `oc_seo_url` WHERE `store_id`=0 AND `query` IN ('category_id=69','category_id=70','category_id=77');",
     "INSERT INTO `oc_seo_url` (`store_id`,`language_id`,`query`,`keyword`) VALUES",
     "(0,1,'category_id=69','moduli-bezpeky'),(0,2,'category_id=69','security-modules'),(0,3,'category_id=69','moduly-bezopasnosty'),",
     "(0,1,'category_id=70','moduli-vidgukiv'),(0,2,'category_id=70','feedback-modules'),(0,3,'category_id=70','moduly-otzyvov'),",
     "(0,1,'category_id=77','intehratsii-ta-crm'),(0,2,'category_id=77','integrations-crm'),(0,3,'category_id=77','integratsii-i-crm');",
     "-- опечатка в URL: image-modules2 -> image-modules (с 301)",
     "UPDATE `oc_seo_url` SET `keyword`='image-modules' WHERE `store_id`=0 AND `language_id`=2 AND `query`='category_id=63' AND `keyword`='image-modules2';",
     "INSERT INTO `oc_seo_url_pro_redirect` (`store_id`,`language_id`,`entity_type`,`entity_id`,`old_query`,`new_query`,`old_keyword`,`new_keyword`,`status`,`code`,`date_added`,`date_modified`) VALUES (0,2,'category',63,'category_id=63','category_id=63','image-modules2','image-modules',1,301,NOW(),NOW()) ON DUPLICATE KEY UPDATE `new_keyword`=VALUES(`new_keyword`), `status`=1, `date_modified`=NOW();",
     "-- порядок категорий: логичный путь покупателя",
    ]
    order = [59,60,61,62,63,64,75,68,69,70,71,66,67,72,73,76,77,78]
    for i,c in enumerate(order,1):
        o.append(f"UPDATE `oc_category` SET `sort_order`={i} WHERE `category_id`={c};")
    o.append("COMMIT;")
    return '\n'.join(o) + '\n'

if __name__ == '__main__':
    (OUT/'sql/02_images.sql').write_text(sql_images(), encoding='utf8')
    (OUT/'sql/03_banners.sql').write_text(sql_banners(), encoding='utf8')
    (OUT/'sql/05_categories.sql').write_text(sql_categories(), encoding='utf8')
    print('ok')
