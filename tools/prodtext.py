# -*- coding: utf-8 -*-
"""Описания модулей: рендер из content/modules_0N.py (ru/uk/en) в HTML для OpenCart."""
import json, html, sys, importlib
from common import *
sys.path.insert(0, str(OUT/'content'))
C = {}
for _i in range(1, 8):
    C.update(importlib.import_module('modules_0%d' % _i).C)
ORIG = {int(k): {int(l): v for l, v in d.items()} for k, d in json.load(open(SCR/'work/desc.json')).items()}
ACTIVE = [p for p in DATA['prods'] if p['status'] and p['id'] != 84]
LANG = {1: 'uk', 2: 'en', 3: 'ru'}
NO_DEMO = {110}  # Windows-утилита: в демо-админке её нет
LBL = {
 'ru': dict(features='Возможности', how='Как это работает', who='Кому подходит', imp='Важно', demo='Проверьте перед покупкой',
            demo_txt='Откройте тестовую админку и посмотрите настройки модулей в работе.', btn='Открыть демо-админку', login='Логин', pwd='Пароль',
            demo_note='Состав модулей и тестовые данные демо могут меняться — проверяйте наличие нужной функции перед покупкой.',
            backup='Перед установкой сделайте резервную копию файлов и базы данных.'),
 'uk': dict(features='Можливості', how='Як це працює', who='Кому підходить', imp='Важливо', demo='Перевірте перед купівлею',
            demo_txt='Відкрийте тестову адмінку та подивіться налаштування модулів у роботі.', btn='Відкрити демо-адмінку', login='Логін', pwd='Пароль',
            demo_note='Склад модулів і тестові дані демо можуть змінюватися — перевіряйте наявність потрібної функції перед купівлею.',
            backup='Перед встановленням зробіть резервну копію файлів і бази даних.'),
 'en': dict(features='Features', how='How it works', who='Who it is for', imp='Important', demo='Try it before you buy',
            demo_txt='Open the demo admin and see the module settings in action.', btn='Open the demo admin', login='Login', pwd='Password',
            demo_note='Demo modules and test data may change — check that the feature you need is present before purchasing.',
            backup='Back up your files and database before installing.'),
}
def e(s): return html.escape(s, quote=False)

def build(pid, l):
    c = C[pid][LANG[l]]; L = LBL[LANG[l]]
    o = ['<div class="ccp-pd">', f'<p class="ccp-pd__lead">{e(c["lead"])}</p>']
    if c.get('chips'):
        o.append('<ul class="ccp-pd__chips">' + ''.join(f'<li>{e(x)}</li>' for x in c['chips']) + '</ul>')
    o.append('<div class="ccp-pd__grid">')
    o.append(f'<section class="ccp-pd__card ccp-pd__card--wide"><h3>{L["features"]}</h3><ul class="ccp-pd__list">' + ''.join(f'<li>{e(x)}</li>' for x in c['feats']) + '</ul></section>')
    o.append(f'<section class="ccp-pd__card"><h3>{L["how"]}</h3><ol class="ccp-pd__steps">' + ''.join(f'<li>{e(x)}</li>' for x in c['how']) + '</ol></section>')
    o.append(f'<section class="ccp-pd__card"><h3>{L["who"]}</h3><p>{e(c["who"])}</p></section>')
    o.append('</div>')
    o.append(f'<div class="ccp-pd__note"><strong>{L["imp"]}:</strong> {e(c["note"])} {L["backup"]}</div>')
    if pid not in NO_DEMO:
        o.append(f'<div class="ccp-pd__demo"><div><h3>{L["demo"]}</h3><p>{L["demo_txt"]}</p>'
                 f'<p class="ccp-pd__creds"><span>{L["login"]}: <b>Demo</b></span><span>{L["pwd"]}: <b>Demo</b></span></p>'
                 f'<p class="ccp-pd__small">{L["demo_note"]}</p></div>'
                 f'<a class="ccp-pd__btn" href="https://demo.codecartpro.com/admin/" target="_blank" rel="noopener">{L["btn"]}</a></div>')
    o.append('</div>')
    return ''.join(o)

def meta_desc(pid, l, n=158):
    t = C[pid][LANG[l]]['lead']
    if len(t) <= n: return t
    t = t[:n].rsplit(' ', 1)[0].rstrip(',;:—-')
    return t + '…'

def oc_escape(s):  # как Request::clean OpenCart (ENT_COMPAT)
    return s.replace('&','&amp;').replace('<','&lt;').replace('>','&gt;').replace('"','&quot;')
def sql_str(s): return "'" + s.replace('\\','\\\\').replace("'","\\'") + "'"

if __name__ == '__main__':
    lines = ['-- CodeCart PRO: новые описания модулей (суть, возможности, как работает, кому подходит, демо) и meta description.', 'SET NAMES utf8mb4;', 'START TRANSACTION;']
    for p in ACTIVE:
        for l in (1, 2, 3):
            lines.append(f"UPDATE `oc_product_description` SET `description`={sql_str(oc_escape(build(p['id'], l)))}, `meta_description`={sql_str(oc_escape(meta_desc(p['id'], l)))} WHERE `product_id`={p['id']} AND `language_id`={l};")
    lines.append('COMMIT;')
    (OUT/'sql').mkdir(exist_ok=True)
    (OUT/'sql/04_product_descriptions.sql').write_text('\n'.join(lines)+'\n', encoding='utf8')
    print(len(lines), 'active', len(ACTIVE), 'missing', [p['id'] for p in ACTIVE if p['id'] not in C])
