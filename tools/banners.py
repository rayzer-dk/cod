import html
from common import *
from covers import save
from playwright.sync_api import sync_playwright

T = {
 'ru': {
  1: dict(eb='Бесплатная система · GNU GPL v3', h1='CodeCart PRO <span>3.0.6.0</span>', h2='Современная основа вашего интернет-магазина',
          sub='Бесплатная CMS на базе OpenCart и ocStore 3.x. PHP 8.1–8.5, открытый код, скачивание без регистрации.', cta='Скачать бесплатно', tags=['OpenCart / ocStore 3.x','PHP 8.1–8.5']),
  2: dict(eb='Каталог модулей', h1='70+ модулей для <span>OpenCart</span> и ocStore', h2='',
          sub='SEO, AI, импорт и экспорт, доставка, оплата, безопасность. Демо-админка перед покупкой.', cta='Открыть каталог', tags=['OpenCart / ocStore 3.0.x','PHP 7.4–8.5']),
  3: dict(eb='AI-модули', h1='AI для <span>контента</span>, чата и рассылок', h2='',
          sub='AI Content, AI Store Assistant, AI Article Writer, AI Image Studio и AI Newsletter.', cta='Смотреть AI-модули', tags=['OpenAI','Gemini','DeepSeek']),
  4: dict(eb='Демо перед покупкой', h1='Проверьте модули в <span>тестовой админке</span>', h2='',
          sub='Откройте демо-админку и посмотрите настройки модулей до покупки.', cta='Открыть демо-админку', tags=['Логин: Demo','Пароль: Demo']),
 },
 'uk': {
  1: dict(eb='Безкоштовна система · GNU GPL v3', h1='CodeCart PRO <span>3.0.6.0</span>', h2='Сучасна основа вашого інтернет-магазину',
          sub='Безкоштовна CMS на базі OpenCart та ocStore 3.x. PHP 8.1–8.5, відкритий код, завантаження без реєстрації.', cta='Завантажити безкоштовно', tags=['OpenCart / ocStore 3.x','PHP 8.1–8.5']),
  2: dict(eb='Каталог модулів', h1='70+ модулів для <span>OpenCart</span> та ocStore', h2='',
          sub='SEO, AI, імпорт та експорт, доставка, оплата, безпека. Демо-адмінка перед покупкою.', cta='Відкрити каталог', tags=['OpenCart / ocStore 3.0.x','PHP 7.4–8.5']),
  3: dict(eb='AI-модулі', h1='AI для <span>контенту</span>, чату та розсилок', h2='',
          sub='AI Content, AI Store Assistant, AI Article Writer, AI Image Studio та AI Newsletter.', cta='Дивитись AI-модулі', tags=['OpenAI','Gemini','DeepSeek']),
  4: dict(eb='Демо перед покупкою', h1='Перевірте модулі в <span>тестовій адмінці</span>', h2='',
          sub='Відкрийте демо-адмінку й подивіться налаштування модулів до покупки.', cta='Відкрити демо-адмінку', tags=['Логін: Demo','Пароль: Demo']),
 },
 'en': {
  1: dict(eb='Free system · GNU GPL v3', h1='CodeCart PRO <span>3.0.6.0</span>', h2='A modern foundation for your online store',
          sub='Free CMS based on OpenCart and ocStore 3.x. PHP 8.1–8.5, open source, download without registration.', cta='Download for free', tags=['OpenCart / ocStore 3.x','PHP 8.1–8.5']),
  2: dict(eb='Module catalog', h1='70+ modules for <span>OpenCart</span> and ocStore', h2='',
          sub='SEO, AI, import and export, shipping, payments, security. Try the demo admin before you buy.', cta='Open the catalog', tags=['OpenCart / ocStore 3.0.x','PHP 7.4–8.5']),
  3: dict(eb='AI modules', h1='AI for <span>content</span>, chat and newsletters', h2='',
          sub='AI Content, AI Store Assistant, AI Article Writer, AI Image Studio and AI Newsletter.', cta='Explore AI modules', tags=['OpenAI','Gemini','DeepSeek']),
  4: dict(eb='Try before you buy', h1='Test modules in the <span>demo admin</span>', h2='',
          sub='Open the demo admin and review module settings before purchasing.', cta='Open the demo admin', tags=['Login: Demo','Password: Demo']),
 },
}
ACC = {1:'#0a66f0', 2:'#0a66f0', 3:'#0a66f0', 4:'#0a66f0'}

KP={'ru':('Заказы','Товары','Модули','Вход','Логин','Пароль'),'uk':('Замовлення','Товари','Модулі','Вхід','Логін','Пароль'),'en':('Orders','Products','Modules','Sign in','Login','Password')}
def visual(n, lang):
    k=KP[lang]
    if n == 1:
        return '''<div class="dash"><div class="dtop"><b>CodeCart <em>PRO</em></b><small>3.0.6.0</small></div>
        <div class="dbody"><div class="dside"><i class="on"></i><i></i><i></i><i></i><i></i></div>
        <div class="dmain"><div class="kpis"><div><small>'''+k[0]+'''</small><b>128</b></div><div><small>'''+k[1]+'''</small><b>2 450</b></div><div><small>'''+k[2]+'''</small><b>70+</b></div></div>
        <div class="bars"><i style="height:38%"></i><i style="height:52%"></i><i style="height:44%"></i><i style="height:70%"></i><i style="height:60%"></i><i style="height:82%"></i><i style="height:72%"></i><i style="height:95%"></i></div></div></div></div>
        <div class="float f1">''' + svg('download',46,'#0b1b3a',2) + '''</div><div class="float f2">GPL v3</div>'''
    ic = {2:['seo','ai','images','catalog','import','shipping','payment','security','reviews'],3:['ai','ai','lang','marketing','images','notify'],4:[]}[n]
    if n == 2:
        cols = ['#0a66f0','#ffc21a','#0a66f0','#0a66f0','#0a66f0','#ffc21a','#0a66f0','#0a66f0','#0a66f0']
        t = ''.join(f'<div class="mt{" y" if cols[i]=="#ffc21a" else ""}">{svg(k,64,"#0b1b3a" if cols[i]=="#ffc21a" else "#fff",1.6)}</div>' for i,k in enumerate(ic))
        return f'<div class="mgrid">{t}</div>'
    if n == 3:
        return '''<div class="chat"><div class="b1"><i></i><i></i><i style="width:60%"></i></div><div class="b2">''' + svg('ai',44,'#fff',1.8) + '''<span>AI</span></div>
        <div class="b3"><i></i><i style="width:70%"></i></div></div><div class="sp s1">''' + svg('ai',70,'#ffc21a',1.6) + '''</div><div class="sp s2">''' + svg('ai',44,'#0a66f0',1.4) + '</div>'
    if n == 4:
        return '''<div class="win"><div class="wbar"><i></i><i></i><i></i><span>demo.codecartpro.com/admin</span></div>
        <div class="login"><div class="lk">''' + svg('security',54,'#0a66f0',1.6) + '''</div><div class="field"><small>'''+k[4]+'''</small><b>Demo</b></div><div class="field"><small>'''+k[5]+'''</small><b>••••</b></div><div class="lbtn">'''+k[3]+'''</div></div></div>'''

def banner_html(n, lang):
    t = T[lang][n]; ac = ACC[n]
    h2 = f'<div class="h2">{t["h2"]}</div>' if t['h2'] else ''
    tags = ''.join(f'<span>{html.escape(x)}</span>' for x in t['tags'])
    return f'''<html><head><meta charset="utf-8"><style>{BASE_CSS}
    html,body{{width:1800px;height:600px;overflow:hidden;position:relative}}
    .bg{{--gx:78%;--gy:30%}}
    .wrap{{position:absolute;inset:0;padding:64px 90px;display:flex;flex-direction:column;justify-content:center}}
    .txt{{max-width:960px}}
    .eb{{display:inline-flex;align-items:center;gap:12px;font-size:25px;font-weight:700;letter-spacing:.04em;text-transform:uppercase;color:#33507d;margin-bottom:20px}}
    .eb:before{{content:"";width:12px;height:12px;border-radius:50%;background:#ffc21a;box-shadow:0 0 0 7px rgba(255,194,26,.28)}}
    h1{{font-size:{86 if n==1 else 70}px;line-height:1.06;font-weight:850;letter-spacing:-.035em}}
    h1 span{{color:{ac}}}
    .h2{{font-size:40px;font-weight:700;margin-top:14px;color:#0b1b3a;letter-spacing:-.02em}}
    .sub{{font-size:30px;line-height:1.45;color:#33507d;margin-top:20px;max-width:860px;font-weight:500}}
    .row{{display:flex;align-items:center;gap:34px;margin-top:34px}}
    .cta{{white-space:nowrap;flex:none;display:inline-flex;align-items:center;gap:14px;background:linear-gradient(165deg,#ffe07a,#ffc21a 55%,#f0a000);color:#0b1b3a;font-weight:800;font-size:29px;padding:22px 38px;border-radius:18px;box-shadow:0 0 0 4px #fff,0 18px 40px rgba(240,160,0,.35)}}
    .tags{{display:flex;gap:12px;flex-wrap:wrap}}.tags span{{font-size:22px;font-weight:600;color:#0a66f0;padding:9px 18px;border-radius:12px;background:#fff;box-shadow:0 0 0 2px #cfe0ff}}
    .logo-abs{{position:absolute;right:90px;top:50px}}
    .vis{{position:absolute;right:70px;top:90px;width:700px;height:460px}}
    /* dashboard */
    .dash{{position:absolute;right:20px;top:50px;width:640px;border-radius:22px;background:#f6f9ff;overflow:hidden;box-shadow:0 40px 90px rgba(10,80,200,.30);border:8px solid #fff;transform:rotate(-3deg)}}
    .dtop{{background:#0a66f0;color:#fff;display:flex;justify-content:space-between;padding:16px 22px;font-size:22px}}.dtop em{{font-style:normal;color:#ffe07a}}.dtop small{{opacity:.7;font-size:18px}}
    .dbody{{display:flex;height:300px}}.dside{{width:70px;background:#eaf1fb;padding:20px 0;display:flex;flex-direction:column;gap:16px;align-items:center}}
    .dside i{{width:28px;height:28px;border-radius:8px;background:#c5d6ee}}.dside i.on{{background:#1769e0}}
    .dmain{{flex:1;padding:20px 22px;display:flex;flex-direction:column;gap:16px}}
    .kpis{{display:flex;gap:12px}}.kpis div{{flex:1;background:#fff;border:1px solid #dde8f6;border-radius:12px;padding:12px 14px;color:#27456b}}.kpis small{{display:block;font-size:15px;color:#7a8da6}}.kpis b{{font-size:30px;color:#0f5fd0}}
    .bars{{flex:1;display:flex;gap:12px;align-items:flex-end;background:#fff;border:1px solid #dde8f6;border-radius:12px;padding:14px}}
    .bars i{{flex:1;border-radius:6px 6px 0 0;background:linear-gradient(#69adff,#1670df)}}
    .float{{position:absolute;background:#ffd700;color:#071a33;border-radius:20px;display:flex;align-items:center;justify-content:center;font-weight:900;box-shadow:0 20px 50px rgba(0,0,0,.4)}}
    .f1{{right:600px;top:380px;width:104px;height:104px;transform:rotate(-8deg)}}.f2{{right:30px;top:432px;padding:14px 26px;font-size:28px;transform:rotate(4deg)}}
    /* modules grid */
    .mgrid{{position:absolute;right:70px;top:70px;display:grid;grid-template-columns:repeat(3,150px);gap:26px;transform:rotate(-4deg)}}
    .mt{{height:150px;border-radius:36px;display:flex;align-items:center;justify-content:center;background:linear-gradient(165deg,#5aa6ff,#0a66f0 55%,#0649b3);box-shadow:0 0 0 5px #fff,0 24px 50px rgba(10,80,200,.3),inset 0 3px 0 rgba(255,255,255,.5);--x:rgba(0,0,0,.35),inset 0 2px 0 rgba(255,255,255,.4)}}
    .mt.y{{background:linear-gradient(165deg,#ffe07a,#ffc21a 55%,#f0a000)}}
    .mt:nth-child(even){{transform:translateY(22px)}}
    /* chat */
    .chat{{position:absolute;right:120px;top:90px;width:560px}}
    .chat div{{border-radius:26px;padding:26px 30px}}.b1{{background:#fff;border:2px solid #cfe0ff;width:420px}}
    .b1 i,.b3 i{{display:block;height:16px;border-radius:8px;background:#cfe0ff;margin:12px 0}}.b3 i{{background:#cfe0ff}}
    .b2{{background:linear-gradient(165deg,#5aa6ff,#0a66f0);color:#fff;margin:22px 0 22px 90px;display:flex;align-items:center;gap:14px;font-weight:900;font-size:34px;width:300px;box-shadow:0 0 0 5px #fff,0 20px 50px rgba(10,80,200,.35)}}
    .b3{{background:#fff;margin-left:140px;width:420px;box-shadow:0 24px 60px rgba(0,0,0,.35)}}
    .sp{{position:absolute}}.s1{{right:60px;top:60px}}.s2{{right:700px;top:420px;opacity:.8}}
    /* window */
    .win{{position:absolute;right:70px;top:90px;width:620px;border-radius:22px;background:#f6f9ff;overflow:hidden;box-shadow:0 40px 90px rgba(10,80,200,.30);transform:rotate(2.5deg)}}
    .wbar{{background:#e3ecf8;padding:16px 20px;display:flex;align-items:center;gap:9px}}.wbar i{{width:14px;height:14px;border-radius:50%;background:#bcc9db}}.wbar span{{margin-left:16px;font-size:19px;color:#506a8d;background:#fff;border-radius:9px;padding:6px 16px}}
    .login{{padding:34px 60px 40px;display:flex;flex-direction:column;gap:16px;align-items:stretch;color:#13294a}}.lk{{text-align:center}}
    .field{{border:1.5px solid #cddbed;border-radius:12px;padding:10px 18px;background:#fff}}.field small{{display:block;color:#7a8da6;font-size:15px}}.field b{{font-size:26px}}
    .lbtn{{background:#0a66f0;color:#fff;text-align:center;font-weight:800;font-size:25px;padding:16px;border-radius:12px}}
    </style></head><body style="--ac:{ac}"><div class="bg"></div><div class="grid"></div>
    <div class="wrap"><div class="txt"><div style="margin-bottom:20px">{logo(46)}</div><div class="eb">{html.escape(t['eb'])}</div><h1>{t['h1']}</h1>{h2}
    <div class="sub">{html.escape(t['sub'])}</div>
    <div class="row"><span class="cta">{html.escape(t['cta'])} <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#0b1b3a" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg></span><div class="tags">{tags}</div></div></div></div>
    {visual(n,lang)}</body></html>'''

if __name__ == '__main__':
    with sync_playwright() as pw:
        b = pw.chromium.launch(executable_path='/opt/pw-browsers/chromium-1194/chrome-linux/chrome', args=['--no-sandbox']); page = b.new_page()
        for lang in ('ru','uk','en'):
            for n in (1,2,3,4):
                save(page, banner_html(n, lang), 1800, 600, OUT/f'images/banners/{lang}'/f'slide-{n}.webp', q=86)
                print(lang, n)
        b.close()
