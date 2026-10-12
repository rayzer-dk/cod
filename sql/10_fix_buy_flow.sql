-- 10) Исправления процесса покупки: «Купить в 1 клик», пересчёт цены при изменении количества, оформление окна «Кошик».
-- Причина: в настройках темы были выключены enable_quick_order и enable_live_price (окно 1 клика вообще не выводилось в подвал).
SET NAMES utf8mb4;
START TRANSACTION;
UPDATE `oc_setting` SET `value`='1' WHERE `store_id`=0 AND `key`='theme_codecart_pro_enable_quick_order';
UPDATE `oc_setting` SET `value`='1' WHERE `store_id`=0 AND `key`='theme_codecart_pro_enable_live_price';
UPDATE `oc_setting` SET `value`='1' WHERE `store_id`=0 AND `key`='theme_codecart_pro_enable_custom_css';
UPDATE `oc_setting` SET `value`='1' WHERE `store_id`=0 AND `key`='theme_codecart_pro_enable_custom_js';
UPDATE `oc_setting` SET `value`='support@codecartpro.com' WHERE `store_id`=0 AND `key`='theme_codecart_pro_quick_order_email';
UPDATE `oc_setting` SET `value`='{"1": "\\u0414\\u044f\\u043a\\u0443\\u0454\\u043c\\u043e! \\u0417\\u0430\\u044f\\u0432\\u043a\\u0443 \\u043e\\u0442\\u0440\\u0438\\u043c\\u0430\\u043d\\u043e \\u2014 \\u043c\\u0435\\u043d\\u0435\\u0434\\u0436\\u0435\\u0440 \\u0437\\u0432\\u2019\\u044f\\u0436\\u0435\\u0442\\u044c\\u0441\\u044f \\u0437 \\u0432\\u0430\\u043c\\u0438 \\u043d\\u0430\\u0439\\u0431\\u043b\\u0438\\u0436\\u0447\\u0438\\u043c \\u0447\\u0430\\u0441\\u043e\\u043c.", "2": "Thank you! Your request has been received \\u2014 a manager will contact you shortly.", "3": "\\u0421\\u043f\\u0430\\u0441\\u0438\\u0431\\u043e! \\u0417\\u0430\\u044f\\u0432\\u043a\\u0430 \\u043f\\u043e\\u043b\\u0443\\u0447\\u0435\\u043d\\u0430 \\u2014 \\u043c\\u0435\\u043d\\u0435\\u0434\\u0436\\u0435\\u0440 \\u0441\\u0432\\u044f\\u0436\\u0435\\u0442\\u0441\\u044f \\u0441 \\u0432\\u0430\\u043c\\u0438 \\u0432 \\u0431\\u043b\\u0438\\u0436\\u0430\\u0439\\u0448\\u0435\\u0435 \\u0432\\u0440\\u0435\\u043c\\u044f."}' WHERE `store_id`=0 AND `key`='theme_codecart_pro_quick_order_success_text';
UPDATE `oc_setting` SET `value`='/* ==========================================================================
   CodeCart PRO — фирменный стиль «Brand» (по логотипу) для CodeCart PRO Theme 8.7.5
   Куда вставлять: Система → Дизайн → Темы → CodeCart PRO → Свой код → «CSS: общий стиль сайта»,
   и включить «Кастомный CSS». Файл не содержит символов «больше» и двойных кавычек —
   безопасно для сохранения через админку. Тёмная тема поддерживается.
   Палитра логотипа: синий #0a66f0, глубокий синий #0649b3, жёлтый #ffc21a, тёмно-синий #0b1b3a.
   Шрифт: Inter (файлы лежат в assets/fonts → /image/catalog/codecartpro/fonts/).
   ========================================================================== */

@font-face{font-family:\'Inter\';font-weight:400;font-style:normal;font-display:swap;src:url(/image/catalog/codecartpro/fonts/Inter-Regular.woff2) format(\'woff2\')}
@font-face{font-family:\'Inter\';font-weight:600;font-style:normal;font-display:swap;src:url(/image/catalog/codecartpro/fonts/Inter-SemiBold.woff2) format(\'woff2\')}
@font-face{font-family:\'Inter\';font-weight:700;font-style:normal;font-display:swap;src:url(/image/catalog/codecartpro/fonts/Inter-Bold.woff2) format(\'woff2\')}
@font-face{font-family:\'Inter\';font-weight:800;font-style:normal;font-display:swap;src:url(/image/catalog/codecartpro/fonts/Inter-ExtraBold.woff2) format(\'woff2\')}

/* ---- 0. Токены ---- */
body.ccp-theme{--cc-navy:#0b1b3a;--cc-blue:#0649b3;--cc-blue-2:#0a66f0;--cc-yellow:#ffc21a;--cc-line:#d9e5f7;--cc-soft:#f1f6ff;--cc-card:#ffffff;--cc-text:#0b1b3a;--cc-muted:#4a5f82;--cc-shadow:0 14px 34px rgba(8,30,66,.10);--cc-shadow-hover:0 20px 44px rgba(8,30,66,.16)}
html.ccp-dark-theme body.ccp-theme{--cc-line:#334155;--cc-soft:#111c33;--cc-card:#1e293b;--cc-text:#f1f5fb;--cc-muted:#b8c6da;--cc-shadow:0 14px 34px rgba(0,0,0,.35);--cc-shadow-hover:0 20px 44px rgba(0,0,0,.5)}

/* ---- 1. Главная: заголовки секций ---- */
body.ccp-theme .ccp-section-head h2{font-size:clamp(22px,2.4vw,30px);font-weight:850;letter-spacing:-.02em;position:relative;padding-left:16px}
body.ccp-theme .ccp-section-head h2:before{content:\'\';position:absolute;left:0;top:.18em;bottom:.18em;width:5px;border-radius:5px;background:linear-gradient(180deg,var(--cc-blue-2),var(--cc-yellow))}
body.ccp-theme .ccp-home-section{margin:34px 0}

/* ---- 2. Плитки категорий: обложки без текста, название накладывает сама тема на языке посетителя ---- */
body.ccp-theme .ccp-category-wall{gap:18px}
body.ccp-theme .ccp-category-tile{transition:transform .2s ease,box-shadow .2s ease}
body.ccp-theme .ccp-category-tile:hover{transform:translateY(-4px);box-shadow:var(--cc-shadow-hover)}

/* ---- 3. Карточки модулей (обложки 1:1) ---- */
body.ccp-theme .ccp-product-card{border-color:var(--cc-line);box-shadow:var(--cc-shadow);transition:transform .2s ease,box-shadow .2s ease,border-color .2s ease}
body.ccp-theme .ccp-product-card:hover{transform:translateY(-4px);box-shadow:var(--cc-shadow-hover);border-color:var(--cc-blue-2)}
body.ccp-theme .ccp-product-card__name a{font-weight:800}
body.ccp-theme .ccp-product-card__name a:hover{color:var(--cc-blue-2);text-decoration:none}
body.ccp-theme .ccp-card-cart,body.ccp-theme #button-cart{background:var(--cc-yellow);border-color:var(--cc-yellow);color:var(--cc-navy);font-weight:800}
body.ccp-theme .ccp-card-cart:hover,body.ccp-theme #button-cart:hover{background:#ffd24d;border-color:#ffd24d;color:var(--cc-navy)}

/* ---- 4. Блок преимуществ ---- */
body.ccp-theme .ccp-benefit{background:var(--cc-card);border:1px solid var(--cc-line);box-shadow:var(--cc-shadow);color:var(--cc-text)}
body.ccp-theme .ccp-benefit-icon{background:linear-gradient(145deg,var(--cc-blue-2),#0649b3);color:#fff;width:36px;height:36px}

/* ---- 5. SEO-блок главной ---- */
body.ccp-theme .ccp-home-seo{background:var(--cc-card);border:1px solid var(--cc-line);border-radius:20px;padding:clamp(20px,3vw,34px);box-shadow:var(--cc-shadow);color:var(--cc-text);line-height:1.7}
body.ccp-theme .ccp-home-seo h2{font-size:clamp(22px,2.4vw,28px);font-weight:850;margin:0 0 12px;color:var(--cc-text)}
body.ccp-theme .ccp-home-seo p{color:var(--cc-muted);margin:0 0 10px}
body.ccp-theme .ccp-home-seo a{font-weight:700;color:var(--cc-blue-2)}

/* ---- 6. Описание модуля (структура .ccp-pd из sql/04) ---- */
.ccp-pd{color:var(--cc-text,#0b1b3a);line-height:1.7;font-size:16px}
.ccp-pd p{margin:0 0 14px}
.ccp-pd .ccp-pd__lead{font-size:18px;font-weight:600;line-height:1.6}
.ccp-pd__grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:16px;margin:22px 0}
.ccp-pd__card{background:var(--cc-soft,#f1f6ff);border:1px solid var(--cc-line,#d9e5f7);border-radius:16px;padding:20px 22px}
.ccp-pd__card--wide{grid-column:1 / -1}
.ccp-pd__card h3{margin:0 0 12px;font-size:17px;font-weight:850;color:var(--cc-text,#0b1b3a)}
.ccp-pd__card p{margin:0;color:var(--cc-muted,#4a5f82)}
.ccp-pd__list{list-style:none;margin:0;padding:0;display:grid;gap:10px}
.ccp-pd__list li{position:relative;padding-left:30px}
.ccp-pd__list li:before{content:\'\';position:absolute;left:0;top:.35em;width:18px;height:18px;border-radius:50%;background:var(--cc-blue-2,#0a66f0) url(data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%27http%3A//www.w3.org/2000/svg%27%20viewBox%3D%270%200%2024%2024%27%20fill%3D%27none%27%20stroke%3D%27white%27%20stroke-width%3D%273.2%27%20stroke-linecap%3D%27round%27%20stroke-linejoin%3D%27round%27%3E%3Cpath%20d%3D%27M5%2012.5l4.5%204.5L19%207%27/%3E%3C/svg%3E) center/12px no-repeat}
.ccp-pd__chips{list-style:none;margin:0;padding:0;display:flex;flex-wrap:wrap;gap:8px}
.ccp-pd__chips li{padding:6px 14px;border-radius:99px;background:var(--cc-card,#fff);border:1px solid var(--cc-line,#d9e5f7);font-weight:700;font-size:14px;color:var(--cc-text,#0b1b3a)}
.ccp-pd__note{margin:0 0 22px;padding:14px 18px;border-radius:14px;background:#fff8dc;border:1px solid #f0dd85;color:#5c4a00;font-size:14.5px}
html.ccp-dark-theme .ccp-pd__note{background:#3a3210;border-color:#6a5a14;color:#ffeaa0}
.ccp-pd__demo{display:flex;align-items:center;justify-content:space-between;gap:20px;flex-wrap:wrap;padding:24px 28px;border-radius:20px;color:#fff;background:radial-gradient(circle at 90% 0,rgba(255,194,26,.22),transparent 45%),linear-gradient(135deg,#0649b3,#0a66f0 60%,#3b8bff)}
.ccp-pd__demo h3{margin:0 0 6px;color:#fff;font-size:20px;font-weight:850}
.ccp-pd__demo p{margin:0 0 8px;color:#e3eeff}
.ccp-pd__creds{display:flex;gap:10px;flex-wrap:wrap}
.ccp-pd__creds span{padding:6px 14px;border-radius:10px;background:rgba(255,255,255,.12);font-size:14px;color:#fff}
.ccp-pd__creds b{color:#ffc21a}
.ccp-pd__demo .ccp-pd__small{font-size:12.5px;color:#cfe0ff;margin:6px 0 0}
.ccp-pd__btn{display:inline-flex;align-items:center;justify-content:center;min-height:50px;padding:12px 26px;border-radius:14px;background:#ffc21a;color:#0b1b3a!important;font-weight:850;text-decoration:none!important;box-shadow:0 12px 28px rgba(255,194,26,.28);white-space:nowrap}
.ccp-pd__btn:hover{background:#ffd24d}
@media (max-width:767px){.ccp-pd__grid{grid-template-columns:1fr}.ccp-pd__demo{padding:20px}.ccp-pd__btn{width:100%}}

/* ---- 7. Описание категории (.ccp-cat-desc из sql/05) ---- */
.ccp-cat-desc{color:var(--cc-text,#0b1b3a);line-height:1.7}
.ccp-cat-desc .ccp-cat-desc__lead{font-size:17px;font-weight:600;margin:0 0 12px}
.ccp-cat-desc h3{font-size:16px;font-weight:850;margin:14px 0 8px}
.ccp-cat-desc ul{margin:0 0 12px;padding-left:20px}
.ccp-cat-desc li{margin-bottom:4px}
.ccp-cat-desc .ccp-cat-desc__note{font-size:14px;color:var(--cc-muted,#4a5f82)}

/* ---- 8. Информационные страницы (политики, условия) ---- */
body.ccp-theme #information-information #content{line-height:1.75}
body.ccp-theme #information-information #content h2{font-weight:850;letter-spacing:-.02em}
body.ccp-theme #information-information #content h3{font-weight:800;margin-top:26px}

/* ---- 9. Типографика и базовые элементы ---- */
body.ccp-theme{font-family:\'Inter\',Arial,Helvetica,sans-serif;-webkit-font-smoothing:antialiased;text-rendering:optimizeLegibility;color:var(--cc-text)}
body.ccp-theme h1,body.ccp-theme h2,body.ccp-theme h3,body.ccp-theme h4{font-family:\'Inter\',Arial,sans-serif;letter-spacing:-.02em;color:var(--cc-text)}
body.ccp-theme h1{font-weight:850}
body.ccp-theme a{color:var(--cc-blue-2)}
body.ccp-theme a:hover{color:var(--cc-blue)}
body.ccp-theme .form-control,body.ccp-theme .custom-select,body.ccp-theme select{border-color:var(--cc-line);transition:border-color .15s,box-shadow .15s}
body.ccp-theme .form-control:focus,body.ccp-theme .custom-select:focus{border-color:var(--cc-blue-2);box-shadow:0 0 0 4px rgba(10,102,240,.16)}
body.ccp-theme ::selection{background:rgba(10,102,240,.22)}

/* ---- 10. Кнопки: глянец как на логотипе ---- */
body.ccp-theme .btn-primary,body.ccp-theme .btn-info{background:linear-gradient(165deg,#3b8bff,#0a66f0 55%,#0649b3);border:0;color:#fff;font-weight:800;box-shadow:inset 0 2px 0 rgba(255,255,255,.35),0 8px 20px rgba(10,102,240,.28);transition:transform .15s,box-shadow .15s,filter .15s}
body.ccp-theme .btn-primary:hover,body.ccp-theme .btn-info:hover{filter:brightness(1.06);transform:translateY(-1px);box-shadow:inset 0 2px 0 rgba(255,255,255,.35),0 12px 26px rgba(10,102,240,.36);color:#fff}
body.ccp-theme .btn-outline-primary{border:2px solid var(--cc-blue-2);color:var(--cc-blue-2);font-weight:800;background:transparent}
body.ccp-theme .btn-outline-primary:hover{background:var(--cc-blue-2);color:#fff}
body.ccp-theme .ccp-card-cart,body.ccp-theme #button-cart,body.ccp-theme .btn-warning{background:linear-gradient(165deg,#ffe07a,#ffc21a 58%,#f0a000);border:0;color:var(--cc-navy);font-weight:850;box-shadow:inset 0 2px 0 rgba(255,255,255,.55),0 8px 20px rgba(240,160,0,.3)}
body.ccp-theme .ccp-card-cart:hover,body.ccp-theme #button-cart:hover,body.ccp-theme .btn-warning:hover{filter:brightness(1.05);color:var(--cc-navy);transform:translateY(-1px)}

/* ---- 11. Шапка ---- */
body.ccp-theme .ccp-topline{background:var(--cc-navy);color:#d8e6ff;border-bottom:0}
body.ccp-theme .ccp-topline a{color:#d8e6ff}
body.ccp-theme .ccp-topline a:hover{color:#ffc21a}
body.ccp-theme .ccp-header{background:var(--cc-card);border-bottom:1px solid var(--cc-line)!important;box-shadow:0 10px 30px rgba(10,60,160,.07)!important}
body.ccp-theme .ccp-logo-wrap img{max-height:58px;width:auto}
body.ccp-theme .ccp-search-wrap .form-control{border-radius:14px 0 0 14px;border:2px solid var(--cc-line);min-height:46px}
body.ccp-theme .ccp-search-wrap .btn{border-radius:0 14px 14px 0}
body.ccp-theme .ccp-header-cart-link{border-radius:14px;font-weight:800}

/* ---- 12. Меню ---- */
body.ccp-theme .ccp-menu-wrap{background:linear-gradient(90deg,#0649b3,#0a66f0 55%,#2f84ff);box-shadow:inset 0 -3px 0 #ffc21a}
body.ccp-theme .ccp-menu-wrap #menu .nav-link,body.ccp-theme .ccp-menu-wrap #menu a{font-weight:700;letter-spacing:.005em}
body.ccp-theme .ccp-menu-wrap #menu .nav-link:hover{color:#ffc21a}

/* ---- 13. Подвал ---- */
body.ccp-theme .ccp-footer{background:var(--cc-navy);color:#c3d3ee;border-top:4px solid #ffc21a}
body.ccp-theme .ccp-footer a{color:#c3d3ee}
body.ccp-theme .ccp-footer a:hover{color:#ffc21a}
body.ccp-theme .ccp-footer-title,body.ccp-theme .ccp-footer-heading{color:#fff;font-weight:800;letter-spacing:.01em}
body.ccp-theme .ccp-footer-bottom{border-top:1px solid rgba(255,255,255,.12);color:#98aed4}

/* ---- 14. Цены, стикеры, навигация ---- */
body.ccp-theme .ccp-product-price,body.ccp-theme .ccp-product-card__price{font-weight:850;color:var(--cc-blue-2);letter-spacing:-.01em}
body.ccp-theme .ccp-breadcrumb-wrap{font-size:14px}
body.ccp-theme .pagination .page-link{border-radius:10px;margin:0 3px;border-color:var(--cc-line);color:var(--cc-blue-2);font-weight:700}
body.ccp-theme .pagination .active .page-link{background:var(--cc-blue-2);border-color:var(--cc-blue-2);color:#fff}
body.ccp-theme .ccp-product-card__image{background:var(--cc-soft)}

/* ---- 15. Шаги «как это работает» в описании модуля ---- */
.ccp-pd__steps{list-style:none;counter-reset:ccpstep;margin:0;padding:0;display:grid;gap:12px}
.ccp-pd__steps li{counter-increment:ccpstep;position:relative;padding-left:44px;min-height:32px}
.ccp-pd__steps li:before{content:counter(ccpstep);position:absolute;left:0;top:-2px;width:32px;height:32px;border-radius:50%;background:linear-gradient(165deg,#ffe07a,#ffc21a 60%,#f0a000);color:var(--cc-navy);font-weight:900;display:flex;align-items:center;justify-content:center;box-shadow:0 0 0 3px var(--cc-card,#fff)}
.ccp-pd .ccp-pd__chips{margin:0 0 6px}
.ccp-pd__chips li{border-color:#cfe0ff;color:var(--cc-blue-2)}
html.ccp-dark-theme .ccp-pd__chips li{color:#9fc6ff;border-color:#334155}
.ccp-pd__card{box-shadow:0 8px 24px rgba(10,60,160,.06)}

/* заголовки внутри тёмно-синих блоков должны оставаться белыми */
body.ccp-theme .ccp-pd__demo h3,body.ccp-theme .hero h2,body.ccp-theme .ccdl .hero h2{color:#fff}

/* ==========================================================================
   16. Исправления: всплывающая корзина, окно «Купить в 1 клик», оформление заказа, карточка товара
   (в теме 8.7.5 много слоёв правил с !important — поэтому здесь селекторы усилены)
   ========================================================================== */

/* --- 16.1 Окно «Кошик» после добавления товара --- */
html body.ccp-theme #ccp-cart-popup .ccp-cart-popup__product{background:none!important;box-shadow:none!important;border-radius:0!important;border-width:0 0 1px 0!important}
html.ccp-dark-theme body.ccp-theme #ccp-cart-popup .ccp-cart-popup__product{background:none!important}
html.ccp-dark-theme body.ccp-theme #ccp-cart-popup .ccp-cart-popup__header{background:linear-gradient(135deg,#0649b3,#0a66f0)!important}
html.ccp-dark-theme body.ccp-theme #ccp-cart-popup .ccp-cart-popup__title{color:#fff!important}
html.ccp-dark-theme body.ccp-theme #ccp-cart-popup .ccp-cart-popup__summary{background:none!important}
html.ccp-dark-theme body.ccp-theme #ccp-cart-popup .ccp-cart-popup__summary-label{color:#b8c9ea!important}
html body.ccp-theme #ccp-cart-popup .ccp-cart-popup__checkout{padding:0 14px!important;font-size:15px!important}
html body.ccp-theme #ccp-cart-popup.is-visible{display:flex!important;align-items:center;justify-content:center;padding:16px}
html body.ccp-theme #ccp-cart-popup .ccp-cart-popup__backdrop{background:rgba(8,27,70,.55)!important;backdrop-filter:blur(5px)}
html body.ccp-theme #ccp-cart-popup .ccp-cart-popup__dialog{margin:0!important;width:min(800px,100%)!important;max-width:800px;max-height:calc(100vh - 32px);overflow:auto;border-radius:24px!important;background:var(--cc-card,#fff)!important;border:1px solid var(--cc-line)!important;box-shadow:0 30px 80px rgba(8,40,120,.35)!important}
html body.ccp-theme #ccp-cart-popup .ccp-cart-popup__header{padding:20px 26px!important;background:linear-gradient(135deg,#0649b3,#0a66f0)!important;border-bottom:0!important}
html body.ccp-theme #ccp-cart-popup .ccp-cart-popup__title{color:#fff!important;font-size:21px!important;font-weight:850!important}
html body.ccp-theme #ccp-cart-popup .ccp-cart-popup__close{width:38px!important;height:38px!important;border-radius:50%!important;background:rgba(255,255,255,.18)!important;color:#fff!important;font-size:24px!important}
html body.ccp-theme #ccp-cart-popup .ccp-cart-popup__close:hover{background:rgba(255,255,255,.3)!important}
html body.ccp-theme #ccp-cart-popup .ccp-cart-popup__body{padding:24px 26px 26px!important}
html body.ccp-theme #ccp-cart-popup .ccp-cart-popup__product{grid-template-columns:84px minmax(0,1fr) 128px 90px 110px!important;gap:18px!important;align-items:center;padding:0 0 22px!important;border-bottom:1px solid var(--cc-line)!important}
html body.ccp-theme #ccp-cart-popup .ccp-cart-popup__image-wrap{width:84px!important;height:84px!important;border-radius:16px!important;background:var(--cc-soft)!important;border:1px solid var(--cc-line)!important}
html body.ccp-theme #ccp-cart-popup .ccp-cart-popup__name{color:var(--cc-text)!important;font-size:15px!important;line-height:1.4;font-weight:800!important;display:block;overflow:hidden;display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical}
html body.ccp-theme #ccp-cart-popup .ccp-cart-popup__name:hover{color:var(--cc-blue-2)!important}
html body.ccp-theme #ccp-cart-popup .ccp-cart-popup__meta-label{font-size:11px!important;font-weight:700;letter-spacing:.06em;text-transform:uppercase;color:var(--cc-muted)!important;margin-bottom:6px!important}
html body.ccp-theme #ccp-cart-popup .ccp-cart-popup__qty{height:40px!important;grid-template-columns:34px 1fr 34px!important;border-radius:12px!important;background:var(--cc-soft)!important;border:1px solid var(--cc-line)!important}
html body.ccp-theme #ccp-cart-popup .ccp-cart-popup__qty-btn{background:transparent!important;color:var(--cc-blue-2)!important;font-size:18px}
html body.ccp-theme #ccp-cart-popup .ccp-cart-popup__price,html body.ccp-theme #ccp-cart-popup .ccp-cart-popup__total{white-space:nowrap;font-size:16px!important;font-weight:850!important;color:var(--cc-text)!important}
html body.ccp-theme #ccp-cart-popup .ccp-cart-popup__total{color:var(--cc-blue-2)!important}
html body.ccp-theme #ccp-cart-popup .ccp-cart-popup__footer-row{display:block!important;padding-top:22px!important}
html body.ccp-theme #ccp-cart-popup .ccp-cart-popup__summary{display:flex!important;align-items:baseline;justify-content:flex-end;gap:10px;margin:0 0 18px!important;padding:0!important;border:0!important;background:none!important;font-size:18px!important;color:var(--cc-text)!important}
html body.ccp-theme #ccp-cart-popup .ccp-cart-popup__summary-label{font-weight:700!important;color:var(--cc-muted)!important}
html body.ccp-theme #ccp-cart-popup .ccp-cart-popup__summary-value{font-size:26px;font-weight:900!important;color:var(--cc-blue-2)!important;white-space:nowrap}
html body.ccp-theme #ccp-cart-popup .ccp-cart-popup__actions{display:grid!important;grid-template-columns:1fr 1.4fr;gap:12px!important}
html body.ccp-theme #ccp-cart-popup .ccp-cart-popup__continue,html body.ccp-theme #ccp-cart-popup .ccp-cart-popup__checkout{min-width:0!important;width:100%;height:52px!important;border-radius:14px!important;font-size:16px!important;white-space:normal;line-height:1.2;text-align:center}
html body.ccp-theme #ccp-cart-popup .ccp-cart-popup__continue{background:var(--cc-card)!important;border:2px solid var(--cc-blue-2)!important;color:var(--cc-blue-2)!important}
html body.ccp-theme #ccp-cart-popup .ccp-cart-popup__continue:hover{background:var(--cc-blue-2)!important;color:#fff!important}
html body.ccp-theme #ccp-cart-popup .ccp-cart-popup__checkout{background:linear-gradient(165deg,#ffe07a,#ffc21a 58%,#f0a000)!important;border:0!important;color:var(--cc-navy)!important;box-shadow:inset 0 2px 0 rgba(255,255,255,.55),0 10px 24px rgba(240,160,0,.3)}
html body.ccp-theme #ccp-cart-popup .ccp-cart-popup__checkout:hover{filter:brightness(1.05);color:var(--cc-navy)!important;background:linear-gradient(165deg,#ffe07a,#ffc21a 58%,#f0a000)!important}
html.ccp-dark-theme body.ccp-theme #ccp-cart-popup .ccp-cart-popup__dialog{background:#12274d!important;border-color:#27406e!important}
html.ccp-dark-theme body.ccp-theme #ccp-cart-popup .ccp-cart-popup__image-wrap,html.ccp-dark-theme body.ccp-theme #ccp-cart-popup .ccp-cart-popup__qty{background:#0b1b3a!important;border-color:#27406e!important}
html.ccp-dark-theme body.ccp-theme #ccp-cart-popup .ccp-cart-popup__continue{background:transparent!important;color:#9fc6ff!important;border-color:#4d8dff!important}
html.ccp-dark-theme body.ccp-theme #ccp-cart-popup .ccp-cart-popup__total,html.ccp-dark-theme body.ccp-theme #ccp-cart-popup .ccp-cart-popup__summary-value{color:#7db4ff!important}
html.ccp-dark-theme body.ccp-theme #ccp-cart-popup .ccp-cart-popup__name{color:#fff!important}
@media(max-width:767px){
 html body.ccp-theme #ccp-cart-popup .ccp-cart-popup__product{grid-template-columns:68px minmax(0,1fr)!important;gap:12px!important}
 html body.ccp-theme #ccp-cart-popup .ccp-cart-popup__image-wrap{width:68px!important;height:68px!important}
 html body.ccp-theme #ccp-cart-popup .ccp-cart-popup__actions{grid-template-columns:1fr}
 html body.ccp-theme #ccp-cart-popup .ccp-cart-popup__summary{justify-content:space-between}
}

/* --- 16.2 Окно «Купить в 1 клик» --- */
html body.ccp-theme .ccp-quick-order-modal.in,html body.ccp-theme .ccp-quick-order-modal.show{display:flex!important;align-items:center;justify-content:center;padding:16px}
html body.ccp-theme .ccp-quick-order-modal .modal-dialog{margin:0!important;width:min(520px,100%)!important;max-width:520px}
html body.ccp-theme .ccp-quick-order-modal .modal-content{border:1px solid var(--cc-line)!important;border-radius:24px!important;background:var(--cc-card)!important;box-shadow:0 30px 80px rgba(8,40,120,.35)!important;overflow:hidden}
html body.ccp-theme .ccp-quick-order-modal .modal-header{display:flex;align-items:center;justify-content:space-between;gap:12px;padding:18px 22px!important;background:linear-gradient(135deg,#0649b3,#0a66f0)!important;border:0!important}
html body.ccp-theme .ccp-quick-order-modal .modal-title{margin:0;font-size:19px;font-weight:850;color:#fff!important;line-height:1.2}
html body.ccp-theme .ccp-quick-order-modal .modal-title .fa{color:#ffc21a;margin-right:6px}
html body.ccp-theme .ccp-quick-order-modal .modal-header .close{float:none;margin:0;width:36px;height:36px;border-radius:50%;background:rgba(255,255,255,.18);color:#fff!important;opacity:1;text-shadow:none;font-size:22px;line-height:1}
html body.ccp-theme .ccp-quick-order-modal .modal-body{padding:22px!important;background:var(--cc-card)!important}
html body.ccp-theme .ccp-quick-order-product{background:var(--cc-soft)!important;border:1px solid var(--cc-line)!important;border-radius:14px!important;padding:12px 14px!important;color:var(--cc-text)!important}
html body.ccp-theme .ccp-quick-order-modal label{font-size:13px;font-weight:700;color:var(--cc-text)!important}
html body.ccp-theme .ccp-quick-order-modal .form-control{height:46px;border-radius:12px!important;background:var(--cc-card)!important;color:var(--cc-text)!important;border:2px solid var(--cc-line)!important;box-shadow:none}
html body.ccp-theme .ccp-quick-order-modal textarea.form-control{height:auto}
html body.ccp-theme .ccp-quick-order-modal .form-control:focus{border-color:var(--cc-blue-2)!important;box-shadow:0 0 0 4px rgba(10,102,240,.16)!important}
html body.ccp-theme .ccp-quick-order-modal .ccp-quick-privacy{font-size:12px;color:var(--cc-muted)!important}
html body.ccp-theme .ccp-quick-order-modal .modal-footer{display:flex;gap:10px;padding:0 22px 22px!important;background:var(--cc-card)!important;border:0!important}
html body.ccp-theme .ccp-quick-order-modal .modal-footer .btn{margin:0;height:48px;border-radius:14px;font-weight:800}
html body.ccp-theme .ccp-quick-order-modal .modal-footer .btn-default{flex:0 0 auto;background:transparent;border:2px solid var(--cc-line);color:var(--cc-muted)}
html body.ccp-theme .ccp-quick-order-modal .modal-footer .ccp-btn{flex:1;background:linear-gradient(165deg,#ffe07a,#ffc21a 58%,#f0a000)!important;border:0!important;color:var(--cc-navy)!important;box-shadow:inset 0 2px 0 rgba(255,255,255,.55),0 10px 24px rgba(240,160,0,.3)}
html.ccp-dark-theme body.ccp-theme .ccp-quick-order-modal .modal-content{background:#12274d!important;border-color:#27406e!important}
html.ccp-dark-theme body.ccp-theme .ccp-quick-order-modal .modal-body,html.ccp-dark-theme body.ccp-theme .ccp-quick-order-modal .modal-footer{background:#12274d!important}
html.ccp-dark-theme body.ccp-theme .ccp-quick-order-modal .form-control{background:#0b1b3a!important;border-color:#27406e!important}
html.ccp-dark-theme body.ccp-theme .ccp-quick-order-product{background:#0b1b3a!important;border-color:#27406e!important}
html.ccp-dark-theme body.ccp-theme .ccp-quick-order-modal .modal-footer .btn-default{color:#cfe0ff;border-color:#27406e}

/* --- 16.3 Оформление заказа: согласие и кнопка «Продовжити» --- */
html body.ccp-theme #ccp-step-payment .buttons{display:flex;flex-wrap:wrap;align-items:center;justify-content:flex-end;gap:14px;margin:18px 0 0!important;padding:0!important;overflow:visible}
html body.ccp-theme #ccp-step-payment .buttons .pull-right,html body.ccp-theme #ccp-step-payment .buttons .pull-left{float:none!important;display:flex;flex-wrap:wrap;align-items:center;gap:12px;font-size:14px}
html body.ccp-theme #ccp-step-payment .buttons input[type=checkbox]{width:18px;height:18px;margin:0;accent-color:#0a66f0}
html body.ccp-theme #ccp-step-payment .buttons .btn{min-height:48px;padding:0 28px}
html body.ccp-theme #ccp-step-payment{overflow:visible}
html body.ccp-theme #ccp-step-payment .alert{border-radius:14px}

/* --- 16.4 Карточка товара: заголовки блоков не вылезают за рамки, плавающие кнопки не закрывают контент --- */
html body.ccp-theme .ccp-commerce-card__title{display:flex;align-items:center;gap:10px;min-width:0}
html body.ccp-theme .ccp-commerce-card__title span{min-width:0;font-size:clamp(15px,1.3vw,18px);line-height:1.25;overflow-wrap:anywhere}
html body.ccp-theme .ccp-floating-contacts{bottom:90px}
@media(max-width:991px){html body.ccp-theme .ccp-floating-contacts{bottom:84px}}

/* --- 16.1b добивка: кнопки окна корзины на всю ширину, кнопка закрытия --- */
html body.ccp-theme #ccp-cart-popup .ccp-cart-popup__actions{width:100%!important;justify-content:stretch!important;align-items:stretch}
html body.ccp-theme #ccp-cart-popup .ccp-cart-popup__continue,html body.ccp-theme #ccp-cart-popup .ccp-cart-popup__checkout{width:100%!important;max-width:none!important;white-space:normal!important;overflow:visible!important;box-sizing:border-box}
html body.ccp-theme #ccp-cart-popup .ccp-cart-popup__close,html.ccp-dark-theme body.ccp-theme #ccp-cart-popup .ccp-cart-popup__close{background:rgba(255,255,255,.2)!important;color:#fff!important;border:0!important}
@media(max-width:767px){
 html body.ccp-theme #ccp-cart-popup .ccp-cart-popup__actions{grid-template-columns:1fr!important}
 html body.ccp-theme #ccp-cart-popup .ccp-cart-popup__dialog{max-height:calc(100vh - 90px)}
 html body.ccp-theme .ccp-quick-order-modal.in{align-items:flex-start;overflow-y:auto!important;padding:12px 12px 90px}
 html body.ccp-theme .ccp-quick-order-modal .modal-dialog{margin:0 auto!important}
}
@media(max-width:767px){
 html body.ccp-theme .ccp-quick-order-modal .modal-footer{flex-direction:column!important;gap:10px}
 html body.ccp-theme .ccp-quick-order-modal .modal-footer .ccp-btn{order:-1;width:100%;flex:none;display:flex;align-items:center;justify-content:center;gap:8px}
 html body.ccp-theme .ccp-quick-order-modal .modal-footer .btn-default{width:100%;flex:none}
}

/* ==========================================================================
   17. Листинг модулей: квадратные обложки не обрезаются, карточки одной высоты, нет «зависания» строк
   ========================================================================== */
html body.ccp-theme .ccp-product-card__image,
html body.ccp-theme .ccp-product-grid .ccp-product-card__image,
html body.ccp-theme .product-layout .ccp-product-card__image,
html body.ccp-theme .ccp-products-module .ccp-product-card__image,
html body.ccp-theme .ccp-related-carousel .ccp-product-card__image{height:auto!important;min-height:0!important;max-height:none!important;aspect-ratio:1/1!important;padding:0!important;border-radius:18px 18px 0 0!important;overflow:hidden}
html body.ccp-theme .ccp-product-card__image a{display:block;height:100%}
html body.ccp-theme .ccp-product-card__image img{width:100%!important;height:100%!important;object-fit:cover!important;display:block}
html body.ccp-theme .ccp-product-card{display:flex;flex-direction:column;overflow:hidden}
html body.ccp-theme .ccp-product-card__body{flex:1;display:flex;flex-direction:column}
html body.ccp-theme .ccp-product-card__actions{margin-top:auto}

/* запасной вариант для стандартной разметки OpenCart (.product-layout / .product-thumb) */
html body.ccp-theme #content .row:has(.product-layout){display:flex!important;flex-wrap:wrap}
html body.ccp-theme #content .row:has(.product-layout):before,html body.ccp-theme #content .row:has(.product-layout):after{display:none!important}
html body.ccp-theme .product-layout{display:flex;float:none!important;margin-bottom:20px}
html body.ccp-theme .product-layout .product-thumb{display:flex;flex-direction:column;width:100%;margin:0;background:var(--cc-card);border:1px solid var(--cc-line);border-radius:20px;overflow:hidden;box-shadow:var(--cc-shadow);transition:transform .2s,box-shadow .2s,border-color .2s}
html body.ccp-theme .product-layout .product-thumb:hover{transform:translateY(-4px);box-shadow:var(--cc-shadow-hover);border-color:var(--cc-blue-2)}
html body.ccp-theme .product-layout .product-thumb .image{float:none!important;margin:0!important;padding:0!important;width:100%!important;display:block!important;height:auto!important;min-height:0!important;max-height:none!important;aspect-ratio:1/1!important;overflow:hidden;background:var(--cc-soft);text-align:center}
html body.ccp-theme .product-layout .product-thumb .image + div{flex:1;display:flex;flex-direction:column}
html body.ccp-theme .product-layout .product-thumb .image a{display:block!important;width:100%!important;height:100%!important}
html body.ccp-theme .product-layout .product-thumb .image img{width:100%!important;max-width:none!important;height:100%!important;object-fit:cover!important;display:block;margin:0!important}
html body.ccp-theme .product-layout .product-thumb .caption{flex:1;min-height:0;padding:16px 16px 6px}
html body.ccp-theme .product-layout .product-thumb .caption h4{font-size:16px;font-weight:800;line-height:1.3;margin:0 0 8px}
html body.ccp-theme .product-layout .product-thumb .caption h4 a{color:var(--cc-text)}
html body.ccp-theme .product-layout .product-thumb .caption h4 a:hover{color:var(--cc-blue-2)}
html body.ccp-theme .product-layout .product-thumb .caption p{color:var(--cc-muted);font-size:14px;line-height:1.5}
html body.ccp-theme .product-layout .product-thumb .price{font-size:20px;font-weight:850;color:var(--cc-blue-2)}
html body.ccp-theme .product-layout .product-thumb .button-group{display:flex;gap:8px;margin-top:auto;padding:12px 16px 16px;border:0;background:none}
html body.ccp-theme .product-layout .product-thumb .button-group button{flex:1;float:none;width:auto;height:44px;border-radius:12px;border:2px solid var(--cc-line);background:var(--cc-card);color:var(--cc-blue-2);font-weight:800}
html body.ccp-theme .product-layout .product-thumb .button-group button:first-child{flex:3;border:0;background:linear-gradient(165deg,#ffe07a,#ffc21a 58%,#f0a000);color:var(--cc-navy);box-shadow:inset 0 2px 0 rgba(255,255,255,.55),0 8px 20px rgba(240,160,0,.3)}

/* ==========================================================================
   18. Описание модуля в формате «codecart-product-description» (эмодзи-разделы)
   ========================================================================== */
.codecart-product-description{color:var(--cc-text,#0b1b3a);line-height:1.75;font-size:16px}
.codecart-product-description p{margin:0 0 14px}
.codecart-product-description h2{font-size:clamp(22px,2.6vw,30px);font-weight:850;margin:0 0 16px}
.codecart-product-description h3{font-size:clamp(18px,2vw,22px);font-weight:850;margin:30px 0 12px;padding-top:6px;border-top:1px solid var(--cc-line,#d9e5f7)}
.codecart-product-description ul{list-style:none;margin:0 0 14px;padding:0;display:grid;gap:8px}
.codecart-product-description li{padding:10px 14px;border-radius:12px;background:var(--cc-soft,#f1f6ff);border:1px solid var(--cc-line,#d9e5f7)}
html.ccp-dark-theme .codecart-product-description li{background:#0f2247;border-color:#27406e}
.ccp-demo h3,.ccp-buy-channels h3{border-top:0!important;padding-top:0!important}
.ccp-demo a,.ccp-buy-channels a{font-weight:700}
' WHERE `store_id`=0 AND `key`='theme_codecart_pro_custom_css_global';
UPDATE `oc_setting` SET `value`='/* CodeCart PRO — доработка всплывающей корзины темы 8.7.5.
   Куда: Система → Дизайн → Темы → CodeCart PRO → Свой код → «JS (подвал)», включить «Кастомный JS».
   Что делает: в окне «Кошик» показывает сумму позиции (цена x количество) и общую сумму корзины без текста «Товарів: N (...)».
   В коде нет символов «больше», «меньше», «&» и двойных кавычек — админка темы не испортит его при сохранении. */
(function () {
  function num(t) {
    var m = String(t || \'\').replace(/ /g, \' \').match(/\\d[\\d\\s.,]*/);
    if (!m) { return NaN; }
    var s = m[0].replace(/\\s/g, \'\');
    if (s.indexOf(\',\') !== -1 && s.indexOf(\'.\') === -1) { s = s.replace(\',\', \'.\'); } else { s = s.replace(/,/g, \'\'); }
    return parseFloat(s);
  }
  function fmt(tpl, v) {
    var m = String(tpl).match(/^(\\D*?)(\\d[\\d\\s.,]*)(\\D*)$/);
    if (!m) { return String(v); }
    var parts = m[2].replace(/\\s/g, \'\').split(/[.,]/);
    var d = parts.length !== 1 ? parts[parts.length - 1].length : 0;
    return m[1] + v.toFixed(d) + m[3];
  }
  function fix() {
    var p = document.getElementById(\'ccp-cart-popup\');
    if (!p) { return; }
    var q = function (c) { return p.querySelector(\'.ccp-cart-popup__\' + c); };
    var price = q(\'price\'), qty = q(\'qty-value\'), total = q(\'total\'), sum = q(\'summary-value\');
    if (price) { if (qty) { if (total) {
      var u = num(price.textContent), n = parseInt(qty.textContent, 10) || 1;
      if (!isNaN(u)) { total.textContent = fmt(price.textContent.trim(), u * n); }
    } } }
    if (sum) {
      var m = sum.textContent.match(/\\(([^)]+)\\)/);
      if (m) { sum.textContent = m[1].trim(); }
    }
  }
  function init() {
    var p = document.getElementById(\'ccp-cart-popup\');
    if (!p) { return; }
    if (!window.MutationObserver) { return; }
    new MutationObserver(function () { if (p.classList.contains(\'is-visible\')) { fix(); } })
      .observe(p, { attributes: true, attributeFilter: [\'class\'] });
  }
  if (document.readyState === \'loading\') { document.addEventListener(\'DOMContentLoaded\', init); } else { init(); }
})();
' WHERE `store_id`=0 AND `key`='theme_codecart_pro_custom_js_footer';
COMMIT;
