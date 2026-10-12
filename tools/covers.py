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

def chips_for(pid):
    from prodtext import C
    c = C.get(pid, {}).get('ru', {}).get('chips', [])[:3]
    return c + ['Демо перед покупкой']

DARK = """
*{box-sizing:border-box;margin:0;padding:0}
body{font-family:'Inter',Arial,sans-serif;-webkit-font-smoothing:antialiased;color:#fff}
.bg{position:absolute;inset:0;background:
  radial-gradient(circle at 88% 14%,rgba(40,120,255,.55),transparent 42%),
  radial-gradient(circle at 6% 92%,rgba(10,102,240,.40),transparent 46%),
  radial-gradient(circle at 50% 55%,rgba(255,194,26,.07),transparent 50%),
  linear-gradient(160deg,#020a1f 0%,#06173f 55%,#0a2a6b 100%)}
.grid{position:absolute;inset:0;background-image:linear-gradient(rgba(120,170,255,.07) 1px,transparent 1px),linear-gradient(90deg,rgba(120,170,255,.07) 1px,transparent 1px);background-size:50px 50px;-webkit-mask-image:radial-gradient(circle at 70% 30%,#000,transparent 75%);mask-image:radial-gradient(circle at 70% 30%,#000,transparent 75%)}
.tile{display:flex;align-items:center;justify-content:center;background:linear-gradient(165deg,#5aa6ff,#0a66f0 52%,#0649b3);box-shadow:inset 0 2px 0 rgba(255,255,255,.5),inset 0 -6px 14px rgba(0,30,110,.4),0 14px 30px rgba(0,60,200,.45)}
"""

def product_html(p):
    ru = p['names']['3']['name']
    t, s = split_name(ru)
    cid = p['cat']; icon, _ = CAT[cid]
    label = CAT_LANG[cid][0]
    free = p['price'] == 0
    badge = '<span class="pill y">Бесплатно</span>' if free else f'<span class="pill">{label}</span>'
    short = re.sub(r'\s*PRO$', '', t, flags=re.I)
    items = ''.join(f'<div class="it"><i class="tile">{svg(["notify","security","speed","reviews"][k%4] if False else icon,30,"#fff",1.8)}</i><span>{html.escape(x)}</span></div>' for k, x in enumerate(chips_for(p['id'])))
    fs = 86 if len(short) <= 14 else 70 if len(short) <= 22 else 58
    return f"""<html><head><meta charset="utf-8"><style>{DARK}
    html,body{{width:900px;height:900px;overflow:hidden;position:relative}}
    .top{{position:absolute;left:0;right:0;top:34px;display:flex;justify-content:center}}
    .lg{{background:#fff;border-radius:22px;padding:10px 26px;box-shadow:0 12px 34px rgba(0,0,0,.35)}}
    .pill{{position:absolute;right:40px;top:44px;font-size:22px;font-weight:800;padding:9px 22px;border-radius:99px;background:rgba(255,255,255,.12);border:2px solid rgba(255,255,255,.35)}}
    .pill.y{{background:#ffc21a;color:#0b1b3a;border-color:#ffc21a}}
    .ttl{{position:absolute;left:44px;right:44px;top:138px}}
    h1{{font-size:{fs}px;line-height:1;font-weight:850;letter-spacing:-.03em}}
    h1 b{{display:inline-block;margin-left:14px;font-size:.5em;vertical-align:.5em;padding:.04em .3em;border-radius:.3em;border:3px solid #ffc21a;color:#ffc21a}}
    .sub{{margin-top:14px;font-size:34px;line-height:1.2;font-weight:600;color:#b7cdf5;max-width:760px}}
    .left{{position:absolute;left:40px;top:400px;display:grid;gap:18px;width:285px}}
    .it{{display:flex;align-items:center;gap:13px;font-size:19px;font-weight:700;line-height:1.15;color:#e8f0ff}}
    .it i{{flex:none;width:54px;height:54px;border-radius:15px}}
    .box{{position:absolute;left:338px;top:395px;width:236px;height:350px;transform:perspective(900px) rotateY(-24deg) rotateX(2deg);border-radius:10px;background:linear-gradient(160deg,#0b2a6e,#04122e);border:2px solid rgba(120,170,255,.55);box-shadow:0 30px 60px rgba(0,0,0,.55),0 0 50px rgba(40,120,255,.5);padding:20px 18px}}
    .box .bl{{height:26px}}.box .bl img{{height:26px}}
    .box h4{{margin-top:34px;font-size:32px;line-height:1.05;font-weight:850}}
    .box h4 em{{font-style:normal;color:#ffc21a}}
    .box .tile{{position:absolute;left:18px;bottom:26px;width:96px;height:96px;border-radius:24px}}
    .box small{{position:absolute;right:16px;bottom:26px;font-size:13px;font-weight:700;color:#ffc21a;text-align:right;width:90px;line-height:1.25}}
    .win{{position:absolute;right:26px;top:395px;width:318px;border-radius:16px;background:#f4f8ff;overflow:hidden;box-shadow:0 30px 70px rgba(0,0,0,.55),0 0 0 3px rgba(255,255,255,.12);transform:perspective(1000px) rotateY(-10deg)}}
    .wt{{background:linear-gradient(90deg,#0649b3,#0a66f0);display:flex;align-items:center;gap:8px;padding:10px 14px;font-size:14px;font-weight:800}}
    .wt i{{width:9px;height:9px;border-radius:50%;background:rgba(255,255,255,.55)}}
    .wb{{padding:14px;color:#0b1b3a}}
    .kp{{display:grid;grid-template-columns:repeat(3,1fr);gap:8px}}.kp div{{background:#fff;border:1px solid #d6e3f8;border-radius:10px;padding:8px 10px;font-size:11px;color:#5b6f8a}}.kp b{{display:block;font-size:20px;color:#0a66f0}}
    .rows{{margin-top:10px;display:grid;gap:7px}}.rows div{{height:30px;border-radius:7px;background:#fff;border:1px solid #d6e3f8;display:flex;align-items:center;gap:8px;padding:0 8px}}.rows i{{height:7px;border-radius:4px;background:#c9d9f2;flex:1}}.rows span{{width:46px;height:12px;border-radius:6px;background:#17b26a}}.rows div:nth-child(2) span{{background:#ffc21a}}
    .bar{{position:absolute;left:30px;right:30px;bottom:26px;height:74px;border-radius:20px;background:#fff;display:flex;align-items:center;justify-content:space-around;color:#0b1b3a;font-size:21px;font-weight:700;box-shadow:0 14px 40px rgba(0,0,0,.35)}}
    .bar span{{display:flex;align-items:center;gap:10px}}.bar span:before{{content:'';width:12px;height:12px;border-radius:50%;background:#0a66f0;box-shadow:0 0 0 4px rgba(10,102,240,.18)}}
    </style></head><body><div class="bg"></div><div class="grid"></div>
    <div class="top"><div class="lg">{logo(54)}</div></div>{badge}
    <div class="ttl"><h1>{html.escape(short)}<b>PRO</b></h1><div class="sub">{html.escape(s)}</div></div>
    <div class="left">{items}</div>
    <div class="box"><div class="bl">{logo(26)}</div><h4>{html.escape(short)} <em>PRO</em></h4><i class="tile">{svg(icon,48,'#fff',1.7)}</i><small>Модуль для OpenCart</small></div>
    <div class="win"><div class="wt"><i></i><i></i><i></i><span style="margin-left:6px">{html.escape(short)}</span></div><div class="wb"><div class="kp"><div>Статус<b>ON</b></div><div>Записей<b>128</b></div><div>Версия<b>PRO</b></div></div><div class="rows"><div><i></i><span></span></div><div><i></i><span></span></div><div><i></i><span></span></div><div><i></i><span></span></div><div><i></i><span></span></div></div></div></div>
    <div class="bar"><span>OpenCart 3.x</span><span>ocStore 3.0.4.1</span><span>PHP 7.4–8.5</span><span>RU / UA / EN</span></div>
    </body></html>"""

def category_html(cid):  # 800x800, без текста: тема сама накладывает название категории на нужном языке
    icon, _ = CAT[cid]
    return f"""<html><head><meta charset="utf-8"><style>{DARK}
    html,body{{width:800px;height:800px;overflow:hidden;position:relative}}
    .ghost{{position:absolute;right:-110px;top:-90px;opacity:.10}}
    .big{{position:absolute;left:50%;top:36%;transform:translate(-50%,-50%);width:330px;height:330px;border-radius:90px;box-shadow:0 0 0 10px rgba(255,255,255,.92),0 40px 90px rgba(0,60,200,.6),0 0 120px rgba(40,120,255,.55),inset 0 3px 0 rgba(255,255,255,.55),inset 0 -14px 30px rgba(0,30,110,.45)}}
    .dot{{position:absolute;border-radius:50%}}
    .d1{{left:560px;top:96px;width:96px;height:96px;background:linear-gradient(165deg,#ffe07a,#ffc21a 60%,#f0a000);box-shadow:0 0 0 7px rgba(255,255,255,.9),0 16px 36px rgba(240,160,0,.45)}}
    .d2{{left:92px;top:380px;width:60px;height:60px;background:linear-gradient(165deg,#7db7ff,#0a66f0);box-shadow:0 0 0 5px rgba(255,255,255,.85),0 12px 26px rgba(10,80,200,.5)}}
    .mini{{position:absolute;border-radius:16px;background:rgba(255,255,255,.1);border:2px solid rgba(160,200,255,.35);backdrop-filter:blur(3px)}}
    .m1{{left:70px;top:130px;width:150px;height:78px}}.m2{{left:600px;top:360px;width:140px;height:70px}}
    .band{{position:absolute;left:0;right:0;bottom:0;height:300px;background:linear-gradient(0deg,rgba(2,10,31,.96),rgba(6,40,120,.6) 55%,transparent)}}
    .base{{position:absolute;left:0;right:0;bottom:0;height:10px;background:linear-gradient(90deg,#0a66f0,#4d9bff 60%,#ffc21a)}}
    </style></head><body><div class="bg"></div><div class="grid"></div>
    <div class="ghost">{svg(icon,620,'#4d9bff',.7)}</div><div class="mini m1"></div><div class="mini m2"></div><div class="dot d1"></div><div class="dot d2"></div>
    <div class="big tile">{svg(icon,180,'#fff',1.5)}</div><div class="band"></div><div class="base"></div></body></html>"""

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
