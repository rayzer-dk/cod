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

ICON_CYCLE = ['catalog','notify','security','speed','reviews','orders','import','tools','marketing','images','lang','plug']

def poster_html(p, cv):
    """Постер-обложка в духе прежних обложек: логотип, название, пункты слева, коробка, макет админки, карточки «что делает», плашка совместимости."""
    ru = p['names']['3']['name']
    t, s = split_name(ru)
    cid = p['cat']; icon, _ = CAT[cid]
    short = re.sub(r'\s*PRO$', '', t, flags=re.I)
    head = (s or short)
    head = head[:1].upper() + head[1:]
    fs = 70 if len(head) <= 18 else 56 if len(head) <= 26 else 48 if len(head) <= 34 else 42
    ic = lambda k, n=28: svg(ICON_CYCLE[(k + p['id']) % len(ICON_CYCLE)], n, '#fff', 1.8)
    items = ''.join(f'<div class="it"><i class="tile">{ic(k)}</i><span>{html.escape(x)}</span></div>' for k, x in enumerate(cv['items'][:6]))
    cards = ''.join(f'<div class="cd"><i class="tile">{ic(k+3, 24)}</i><div><b>{html.escape(a)}</b><small>{html.escape(d)}</small></div></div>' for k, (a, d) in enumerate(cv['cards'][:6]))
    tabs = ''.join(f'<span class="{"on" if k == 0 else ""}">{html.escape(x)}</span>' for k, x in enumerate(cv['tabs'][:4]))
    kp = ''.join(f'<div><small>{html.escape(a)}</small><b>{html.escape(b)}</b></div>' for a, b in cv['kpis'][:3])
    rows = ''.join(f'<div class="r"><u>{100 + k * 7}</u><i></i><em class="{["g","y","g","g","b"][k]}"></em></div>' for k in range(5))
    return f"""<html><head><meta charset="utf-8"><style>{DARK}
    html,body{{width:1000px;height:1000px;overflow:hidden;position:relative}}
    .top{{position:absolute;left:0;right:0;top:22px;display:flex;justify-content:center}}
    .ttl{{position:absolute;left:34px;right:34px;top:110px}}
    h1{{font-size:{fs}px;line-height:1;font-weight:850;letter-spacing:-.03em;color:#fff}}
    h1 b{{display:inline-block;margin-left:14px;font-size:.52em;vertical-align:.45em;padding:.03em .3em;border-radius:.3em;border:3px solid #ffc21a;color:#ffc21a}}
    .en{{margin-top:8px;font-size:34px;font-weight:800;color:#ffc21a;letter-spacing:-.01em}}
    .sub{{margin-top:10px;font-size:29px;line-height:1.22;font-weight:500;color:#b7cdf5;max-width:760px}}
    .left{{position:absolute;left:34px;top:392px;display:grid;gap:12px;width:262px}}
    .it{{display:flex;align-items:center;gap:12px;font-size:19px;font-weight:700;line-height:1.12;color:#e8f0ff;height:60px}}
    .it i{{flex:none;width:56px;height:56px;border-radius:15px}}
    .box{{position:absolute;left:290px;top:560px;width:212px;height:290px;transform:perspective(900px) rotateY(-24deg);border-radius:10px;background:linear-gradient(160deg,#0b2a6e,#04122e);border:2px solid rgba(120,170,255,.55);box-shadow:0 30px 60px rgba(0,0,0,.55),0 0 50px rgba(40,120,255,.5);padding:16px 15px}}
    .box h4{{margin-top:16px;font-size:26px;line-height:1.05;font-weight:850}}.box h4 em{{font-style:normal;color:#ffc21a}}
    .box .tile{{position:absolute;left:15px;bottom:92px;width:70px;height:70px;border-radius:20px}}
    .box small{{position:absolute;left:15px;right:12px;bottom:16px;font-size:13px;font-weight:700;color:#ffc21a;line-height:1.25}}
    .lap{{position:absolute;right:26px;top:372px;width:560px;transform:perspective(1200px) rotateY(-9deg)}}
    .scr{{background:#0b1226;border:6px solid #1c2640;border-radius:14px 14px 4px 4px;box-shadow:0 30px 70px rgba(0,0,0,.6),0 0 0 2px rgba(150,190,255,.25);overflow:hidden}}
    .ui{{background:#f4f8ff;color:#0b1b3a}}
    .ut{{display:flex;align-items:center;gap:8px;background:linear-gradient(90deg,#0649b3,#0a66f0);color:#fff;padding:7px 12px;font-size:13px;font-weight:800}}
    .ut i{{width:8px;height:8px;border-radius:50%;background:rgba(255,255,255,.6)}}
    .tb{{display:flex;gap:6px;padding:7px 10px 0;background:#e6eefb}}.tb span{{font-size:11px;font-weight:700;padding:5px 10px;border-radius:7px 7px 0 0;color:#4a5f82}}.tb span.on{{background:#f4f8ff;color:#0a66f0}}
    .ub{{padding:9px 10px}}.kp{{display:grid;grid-template-columns:repeat(3,1fr);gap:7px}}.kp div{{background:#fff;border:1px solid #d6e3f8;border-radius:9px;padding:6px 9px}}.kp small{{display:block;font-size:10px;color:#5b6f8a}}.kp b{{font-size:19px;color:#0a66f0}}
    .tbl{{margin-top:8px;display:grid;gap:5px}}.r{{display:flex;align-items:center;gap:8px;height:22px;background:#fff;border:1px solid #d6e3f8;border-radius:6px;padding:0 8px}}.r u{{text-decoration:none;font-size:10px;color:#5b6f8a;width:26px}}.r i{{flex:1;height:6px;border-radius:3px;background:#c9d9f2}}.r em{{width:44px;height:11px;border-radius:6px}}.g{{background:#17b26a}}.y{{background:#ffc21a}}.b{{background:#0a66f0}}
    .base{{height:14px;margin:0 -22px;border-radius:0 0 18px 18px;background:linear-gradient(#cfd7e6,#8e9bb4)}}
    .panel{{position:absolute;left:520px;right:26px;top:660px;border-radius:16px;background:rgba(10,30,80,.78);border:2px solid rgba(120,170,255,.4);padding:10px 12px;backdrop-filter:blur(3px)}}
    .panel h5{{font-size:16px;font-weight:800;margin-bottom:7px}}.panel h5 span{{color:#ffc21a}}
    .cds{{display:grid;grid-template-columns:1fr 1fr;gap:6px}}
    .cd{{display:flex;gap:8px;align-items:center;background:rgba(20,60,150,.45);border:1px solid rgba(120,170,255,.35);border-radius:10px;padding:5px 7px}}
    .cd i{{flex:none;width:34px;height:34px;border-radius:10px}}.cd b{{display:block;font-size:12.5px;line-height:1.1}}.cd small{{display:block;font-size:10.5px;line-height:1.15;color:#b7cdf5;margin-top:1px}}
    .bar{{position:absolute;left:26px;right:26px;bottom:20px;height:66px;border-radius:18px;background:#fff;display:flex;align-items:center;justify-content:space-around;color:#0b1b3a;font-size:20px;font-weight:700;box-shadow:0 14px 40px rgba(0,0,0,.35)}}
    .bar span{{display:flex;align-items:center;gap:9px}}.bar span:before{{content:'';width:11px;height:11px;border-radius:50%;background:#0a66f0;box-shadow:0 0 0 4px rgba(10,102,240,.18)}}
    </style></head><body><div class="bg"></div><div class="grid"></div>
    <div class="top">{logo(66)}</div>
    <div class="ttl"><h1>{html.escape(head)}<b>PRO</b></h1><div class="en">{html.escape(split_en(p))}</div><div class="sub">{html.escape(cv['tagline'])}</div></div>
    <div class="left">{items}</div>
    <div class="box">{logo(22)}<h4>{html.escape(short)} <em>PRO</em></h4><i class="tile">{svg(icon,44,'#fff',1.7)}</i><small>Модуль для OpenCart<br>Повышайте эффективность магазина</small></div>
    <div class="lap"><div class="scr"><div class="ui"><div class="ut"><i></i><i></i><i></i><span style="margin-left:6px">{html.escape(short)} PRO</span></div><div class="tb">{tabs}</div><div class="ub"><div class="kp">{kp}</div><div class="tbl">{rows}</div></div></div></div><div class="base"></div></div>
    <div class="panel"><h5>Что делает <span>{html.escape(short)} PRO</span></h5><div class="cds">{cards}</div></div>
    <div class="bar"><span>OpenCart 3.x</span><span>ocStore 3.0.4.1</span><span>PHP 7.4–8.5</span><span>RU / UA / EN</span></div>
    </body></html>"""

def split_en(p):
    n = html.unescape(p['names']['2']['name']).split(' — ')[0].split(' - ')[0]
    n = re.sub(r'\s+for OpenCart.*$', '', n.strip())
    return re.sub(r'\bPro\b', 'PRO', n)

def product_html(p):
    from prodtext import PROSE
    cv = PROSE.get(p['id'], {}).get('cover')
    if not cv:
        c = chips_for(p['id'])
        cv = dict(tagline=split_name(p['names']['3']['name'])[1] or '', items=(c * 2)[:6], cards=[(x, 'Подробности в описании модуля') for x in (c * 2)[:6]],
                  tabs=['Настройки', 'Журнал', 'Шаблоны', 'О модуле'], kpis=[('Статус', 'ON'), ('Записей', '128'), ('Версия', 'PRO')])
    return poster_html(p, cv)

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
    what = sys.argv[1:] or ['products']
    with sync_playwright() as pw:
        b = pw.chromium.launch(executable_path='/opt/pw-browsers/chromium-1194/chrome-linux/chrome', args=['--no-sandbox']); page = b.new_page()
        if 'products' in what:
            for p in DATA['prods']:
                if not p['status'] or p['id'] in (84,): continue
                fn = p['image'].split('/')[-1]
                if not p['image'].startswith('catalog/codecartpro/products/'): continue
                save(page, product_html(p), 1000, 1000, OUT/'images/products'/fn)
                print('p', p['id'], fn)
        if 'categories' in what:
            for cid in CAT:
                if cid == 74: continue
                save(page, category_html(cid), 800, 800, OUT/'images/categories'/f'cat-{cid}.webp')
                print('c', cid)
        b.close()
