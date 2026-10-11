import sys, io, html, re
from common import *
from playwright.sync_api import sync_playwright
from PIL import Image

CAT_LANG = {  # short labels per language
 59:('SEO','SEO','SEO'), 60:('AI','AI','AI'), 63:('Изображения','Зображення','Images'), 61:('Каталог','Каталог','Catalog'),
 62:('Импорт и экспорт','Імпорт та експорт','Import & Export'), 64:('Заказы','Замовлення','Orders'), 66:('Доставка','Доставка','Shipping'),
 67:('Оплата','Оплата','Payment'), 68:('Уведомления','Сповіщення','Notifications'), 69:('Безопасность','Безпека','Security'),
 70:('Отзывы','Відгуки','Reviews'), 71:('Скорость и аудит','Швидкість та аудит','Speed & audit'), 72:('Темы','Теми','Themes'),
 73:('Языки','Мови','Languages'), 74:('Система','Система','System'), 75:('Маркетинг','Маркетинг','Marketing'),
 76:('Клиенты','Клієнти','Customers'), 77:('Интеграции','Інтеграції','Integrations'), 78:('Для разработчиков','Для розробників','Developer tools'),
}
CAT_TAG = {  # one-line RU descriptor for category cover
 59:'Метатеги, ЧПУ, sitemap, Schema.org', 60:'Контент, чат-бот, рассылки, изображения', 63:'Оптимизация, AVIF/WebP, ALT и видео',
 61:'Товары, опции, характеристики, поиск', 62:'Импорт, экспорт и фиды для магазинов', 64:'Корзина, оформление и продажи',
 66:'Новая Почта и другие службы доставки', 67:'Приём платежей в одном месте', 68:'Telegram, SMS, Viber и email',
 69:'Защита от ботов, cookies, приватность', 70:'Отзывы Google и доверие покупателей', 71:'Аудит базы, PHP 8, курсы валют',
 72:'Темы и оформление витрины', 73:'Переводы и мультиязычность', 75:'Акции, popup, прогресс до доставки',
 76:'Вход через соцсети, подтверждение телефона', 77:'GeoIP, CRM и внешние сервисы', 78:'Аудит, очистка, проверка архивов',
}

def split_name(n):
    n = html.unescape(n).strip()
    t, _, s = n.partition(' — ')
    t = re.sub(r'\s+для OpenCart( и ocStore)?$', '', t.strip())
    t = re.sub(r'\bPro\b', 'PRO', t)
    s = s.strip()
    if s: s = s[0].upper() + s[1:]
    return t, s

def fs_for(t):
    L = len(t)
    return 118 if L <= 12 else 102 if L <= 18 else 86 if L <= 26 else 72 if L <= 34 else 62

def product_html(p):
    ru = p['names']['3']['name']
    t, s = split_name(ru)
    cid = p['cat']; icon, _ = CAT[cid]
    label = CAT_LANG[cid][0]
    free = p['price'] == 0
    badge = f'<span class="pill y">Бесплатно</span>' if free else f'<span class="pill">{label}</span>'
    return f"""<html><head><meta charset="utf-8"><style>{BASE_CSS}
    html,body{{width:900px;height:900px;overflow:hidden;position:relative}}
    .bg{{--gx:92%;--gy:6%}}
    .wrap{{position:absolute;inset:0;padding:54px 60px;display:flex;flex-direction:column}}
    .top{{display:flex;justify-content:space-between;align-items:center}}
    .pill{{font-size:28px;font-weight:800;padding:11px 26px;border-radius:99px;color:#0a66f0;background:#fff;box-shadow:0 0 0 2px #cfe0ff,0 10px 24px rgba(10,80,200,.12)}}
    .pill.y{{background:#ffc21a;color:#0b1b3a;box-shadow:0 10px 24px rgba(240,160,0,.3)}}
    .hero{{position:relative;margin-top:40px;height:270px}}
    .tile3d{{width:250px;height:250px;border-radius:66px;position:relative;z-index:2}}
    .dot{{position:absolute;border-radius:50%}}
    .d1{{left:320px;top:30px;width:120px;height:120px;background:linear-gradient(165deg,#ffe07a,#ffc21a);box-shadow:0 0 0 8px #fff,0 18px 36px rgba(240,160,0,.3)}}
    .d2{{left:470px;top:140px;width:70px;height:70px;background:linear-gradient(165deg,#7db7ff,#0a66f0);box-shadow:0 0 0 6px #fff,0 14px 30px rgba(10,80,200,.3)}}
    .ghost{{position:absolute;right:-30px;top:-40px;opacity:.10}}
    .grow{{flex:1}}
    h1{{font-size:{fs_for(t)}px;line-height:1.02;font-weight:850;letter-spacing:-.035em;margin-bottom:18px;color:#0b1b3a}}
    .sub{{font-size:42px;line-height:1.22;color:#33507d;font-weight:600;max-width:790px}}
    .base{{position:absolute;left:0;right:0;bottom:0;height:14px;background:linear-gradient(90deg,#0a66f0,#4d9bff 60%,#ffc21a)}}
    </style></head><body><div class="bg"></div><div class="grid"></div>
    <div class="wrap"><div class="top">{logo(60)}{badge}</div>
    <div class="hero"><div class="ghost">{svg(icon,420,'#0a66f0',.9)}</div><div class="dot d1"></div><div class="dot d2"></div>
    <div class="tile3d">{svg(icon,132,'#fff',1.7)}</div></div><div class="grow"></div>
    <h1>{html.escape(t)}</h1><div class="sub">{html.escape(s)}</div>
    </div><div class="base"></div></body></html>"""

def category_html(cid):  # 800x800, без текста: тема сама накладывает название категории на нужном языке
    icon, _ = CAT[cid]
    return f"""<html><head><meta charset="utf-8"><style>{BASE_CSS}
    html,body{{width:800px;height:800px;overflow:hidden;position:relative}}
    .bg{{--gx:85%;--gy:12%}}
    .ghost{{position:absolute;right:-120px;top:-110px;opacity:.10}}
    .tile3d{{position:absolute;left:50%;top:38%;transform:translate(-50%,-50%);width:320px;height:320px;border-radius:86px;--ring:10px}}
    .dot{{position:absolute;border-radius:50%}}
    .d1{{left:545px;top:90px;width:96px;height:96px;background:linear-gradient(165deg,#ffe07a,#ffc21a);box-shadow:0 0 0 7px #fff,0 16px 32px rgba(240,160,0,.3)}}
    .d2{{left:110px;top:400px;width:58px;height:58px;background:linear-gradient(165deg,#7db7ff,#0a66f0);box-shadow:0 0 0 5px #fff,0 12px 26px rgba(10,80,200,.3)}}
    .band{{position:absolute;left:0;right:0;bottom:0;height:300px;background:linear-gradient(0deg,rgba(6,40,110,.92),rgba(10,102,240,.55) 55%,transparent)}}
    .logo{{position:absolute;left:0;right:0;bottom:30px;text-align:center;opacity:0}}
    </style></head><body style="--gs:56px"><div class="bg"></div><div class="grid"></div>
    <div class="ghost">{svg(icon,620,'#0a66f0',.7)}</div><div class="dot d1"></div><div class="dot d2"></div>
    <div class="tile3d">{svg(icon,180,'#fff',1.5)}</div><div class="band"></div></body></html>"""

def save(page, htmltxt, w, h, path, q=84):
    page.set_viewport_size({'width':w,'height':h})
    page.set_content(htmltxt); page.wait_for_timeout(60)
    png = page.screenshot(type='png')
    im = Image.open(io.BytesIO(png)).convert('RGB')
    path.parent.mkdir(parents=True, exist_ok=True)
    im.save(path, 'WEBP', quality=q, method=6)

if __name__ == '__main__':
    what = sys.argv[1:] or ['products','categories']
    with sync_playwright() as pw:
        b = pw.chromium.launch(executable_path='/opt/pw-browsers/chromium-1194/chrome-linux/chrome', args=['--no-sandbox']); page = b.new_page()
        if 'products' in what:
            for p in DATA['prods']:
                if not p['status'] or p['id'] in (84,): continue
                fn = p['image'].split('/')[-1]
                if not p['image'].startswith('catalog/codecartpro/products/'): continue
                save(page, product_html(p), 900, 900, OUT/'images/products'/fn)
                print('p', p['id'], fn)
        if 'categories' in what:
            for cid in CAT:
                if cid == 74: continue
                save(page, category_html(cid), 800, 800, OUT/'images/categories'/f'cat-{cid}.webp')
                print('c', cid)
        b.close()
