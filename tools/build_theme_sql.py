# -*- coding: utf-8 -*-
"""sql/11_theme_patch_settings.sql — настройки для пропатченной темы brand1 (CSS и JS уже внутри темы)."""
import json
from common import *
from download_page import q
T = 'theme_codecart_pro_'
ok = {'1': 'Дякуємо! Заявку отримано — менеджер зв’яжеться з вами найближчим часом.',
      '2': 'Thank you! Your request has been received — a manager will contact you shortly.',
      '3': 'Спасибо! Заявка получена — менеджер свяжется с вами в ближайшее время.'}
o = ['-- 11) Для темы Theme_CodeCart_Pro_v8.7.5-brand1: CSS и JS теперь внутри темы, поэтому поля «Свой код» очищаются (иначе стили дублировались бы).',
     '-- Выполняйте ТОЛЬКО после установки пропатченной темы (она заменяет sql/10).',
     'SET NAMES utf8mb4;', 'START TRANSACTION;']
def st(k, v): o.append(f"UPDATE `oc_setting` SET `value`={q(v)} WHERE `store_id`=0 AND `key`={q(T+k)};")
st('enable_quick_order', '1'); st('enable_live_price', '1')
st('quick_order_email', 'support@codecartpro.com'); st('quick_order_success_text', json.dumps(ok, ensure_ascii=True))
st('custom_css_global', ''); st('custom_js_footer', '')
o.append('COMMIT;')
(OUT/'sql/11_theme_patch_settings.sql').write_text('\n'.join(o)+'\n', encoding='utf8')
print('ok')
