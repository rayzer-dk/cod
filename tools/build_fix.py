# -*- coding: utf-8 -*-
"""sql/10_fix_buy_flow.sql — «Купить в 1 клик», живая цена, окно корзины (для сайта, где 06 уже выполнен)."""
import json
from common import *
from download_page import q
css = (OUT/'css/codecart-brand.css').read_text(encoding='utf8')
js = (OUT/'js/codecart-brand.js').read_text(encoding='utf8')
T = 'theme_codecart_pro_'
ok = {'1': 'Дякуємо! Заявку отримано — менеджер зв’яжеться з вами найближчим часом.',
      '2': 'Thank you! Your request has been received — a manager will contact you shortly.',
      '3': 'Спасибо! Заявка получена — менеджер свяжется с вами в ближайшее время.'}
o = ['-- 10) Исправления процесса покупки: «Купить в 1 клик», пересчёт цены при изменении количества, оформление окна «Кошик».',
     '-- Причина: в настройках темы были выключены enable_quick_order и enable_live_price (окно 1 клика вообще не выводилось в подвал).',
     'SET NAMES utf8mb4;', 'START TRANSACTION;']
def st(k, v): o.append(f"UPDATE `oc_setting` SET `value`={q(v)} WHERE `store_id`=0 AND `key`={q(T+k)};")
st('enable_quick_order', '1'); st('enable_live_price', '1'); st('enable_custom_css', '1'); st('enable_custom_js', '1')
st('quick_order_email', 'support@codecartpro.com')
st('quick_order_success_text', json.dumps(ok, ensure_ascii=True))
st('custom_css_global', css)
st('custom_js_footer', js)
o.append('COMMIT;')
(OUT/'sql/10_fix_buy_flow.sql').write_text('\n'.join(o) + '\n', encoding='utf8')
print('ok')
