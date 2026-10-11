import html, sys
from common import *
from prodtext import build as pbuild
from catdata import CATTXT
import os
THEME = Path(os.environ.get('THEME_DIR','/tmp/claude-0/-home-user-nexora/9c55f576-82be-54e4-a56d-873d048d50c3/scratchpad/theme'))/'upload/catalog/view/theme/codecart_pro'
css_theme = (THEME/'stylesheet/codecart_pro.css').read_text()
css_mod = (OUT/'css/codecart-brand.css').read_text().replace('/image/catalog/codecartpro/fonts/', f'{OUT}/assets/fonts/')
cats = [59,60,61,62,63,64,66,67,68,69]
tiles = ''.join(f'<a class="ccp-category-tile" href="#"><span class="ccp-category-media"><img src="{OUT}/images/categories/cat-{c}.webp" alt=""></span><span class="ccp-category-caption"><span class="ccp-category-name">{html.unescape(DATA["cats"][str(c)]["3"])}</span></span></a>' for c in cats)
prods = [127,63,80,66,72]
def card(pid):
    p = next(x for x in DATA['prods'] if x['id']==pid); fn = p['image'].split('/')[-1]
    nm = html.unescape(p['names']['3']['name'])
    return f'''<div class="ccp-card ccp-product-card ccp-home-product-card"><a class="ccp-product-card__image ccp-product-image-link" href="#"><img class="ccp-img-main" src="{OUT}/images/products/{fn}" alt=""></a><div class="ccp-product-card__body"><div class="ccp-product-card__name"><a href="#">{nm}</a></div><div class="ccp-product-card__desc">{html.unescape(p["names"]["3"]["md"])[:110]}</div><div class="ccp-product-card__price">${p["price"]:.0f}</div><div class="ccp-product-card__actions"><button type="button" class="btn ccp-btn ccp-card-cart"><i class="fa fa-shopping-cart"></i> <span>В корзину</span></button></div></div></div>'''
cards = ''.join(card(i) for i in prods)
dark = len(sys.argv)>1 and sys.argv[1]=='dark'
page = f'''<!doctype html><html lang="ru" class="{'ccp-dark-theme' if dark else ''}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<style>{css_theme}</style>
<style>body.ccp-theme{{--ccp-primary:#0a66f0;--ccp-accent:#ffc21a;--ccp-bg:#f1f6ff;--ccp-text:#0b1b3a;--ccp-menu-bg:#0a66f0;--ccp-menu-text:#fff;--ccp-footer-bg:#0b1b3a;--ccp-footer-text:#c3d3ee;--ccp-price:#0a66f0;--ccp-container:1360px;--ccp-radius:16px;--ccp-card-radius:16px;--ccp-dark-bg:#0f172a;--ccp-dark-surface:#111827;--ccp-dark-card:#1e293b;--ccp-dark-text:#f8fafc;--ccp-dark-muted:#cbd5e1;--ccp-dark-border:#334155}}</style>
<style>{css_mod}</style></head>
<body class="ccp-theme ccp-bs3"><div class="ccp-topline"><div class="container d-flex justify-content-between py-1"><span>+380 99 262 21 22 · support@codecartpro.com</span><span>UA · RU · EN</span></div></div>
<header class="ccp-header"><div class="container"><div class="ccp-header-row d-flex align-items-center" style="gap:24px"><div class="ccp-logo-wrap"><img src="{OUT}/assets/brand/logo-560.png" style="height:56px"></div><div class="ccp-search-wrap" style="flex:1"><div class="input-group"><input class="form-control" placeholder="Поиск модулей"><span class="input-group-btn"><button class="btn btn-primary">Найти</button></span></div></div><a class="btn btn-warning ccp-header-cart-link">Корзина</a></div></div></header>
<div class="ccp-menu-wrap"><div class="container"><ul id="menu" class="nav" style="gap:6px;padding:6px 0"><li><a class="nav-link" style="color:#fff;padding:10px 16px;display:block" href="#">SEO</a></li><li><a class="nav-link" style="color:#fff;padding:10px 16px;display:block" href="#">AI</a></li><li><a class="nav-link" style="color:#fff;padding:10px 16px;display:block" href="#">Каталог</a></li><li><a class="nav-link" style="color:#fff;padding:10px 16px;display:block" href="#">Скачать CodeCart</a></li></ul></div></div><div class="container ccp-home-builder" style="max-width:1360px;margin:0 auto;padding:20px">
<img src="{OUT}/images/banners/ru/slide-1.webp" style="width:100%;border-radius:18px;display:block;margin-bottom:24px">
<section class="ccp-home-section ccp-home-category-wall-section"><div class="ccp-section-head"><h2>Категории модулей</h2></div><div class="ccp-category-wall ccp-category-wall--cards" style="--ccp-home-wall-cols-desktop:5">{tiles}</div></section>
<section class="ccp-home-section"><div class="ccp-section-head"><h2>Популярные модули</h2></div><div class="ccp-home-products-grid">{cards}</div></section>
<section class="ccp-home-section"><div style="background:var(--cc-card);padding:24px;border-radius:18px;border:1px solid var(--cc-line)">{pbuild(127,3)}</div></section>
</div><footer class="ccp-footer" style="margin-top:30px;padding:34px 0"><div class="container"><div class="ccp-footer-title">CodeCart PRO</div><p>Модули для OpenCart и ocStore · <a href="#">Скачать</a> · <a href="#">Демо</a></p><div class="ccp-footer-bottom" style="padding-top:12px">© 2026 CodeCart PRO. Все права защищены.</div></div></footer></body></html>'''
open(SCR/'work/mock.html','w').write(page)
