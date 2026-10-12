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

H = {
 'ru': dict(mod='профессиональный модуль CodeCart PRO для OpenCart 3.0.x и ocStore 3.0.x', why='💡 Зачем нужен модуль', feats='💎 Основные возможности', how='🧭 Как это работает',
            know='🔐 Важно знать', comp='⚙️ Совместимость и технологии', lang='🌍 Интерфейс на трёх языках', win='🏆 Итог',
            lang_p='Админка модуля доступна на русском, украинском и английском языках — удобно для магазинов и команд, работающих в разных языковых средах.',
            backup='Перед установкой и обновлением сделайте резервную копию файлов сайта и базы данных.', demo_ok='Работу модуля можно посмотреть в демо-админке до покупки.',
            oc='OpenCart 3.0.x', ocs='ocStore 3.0.x, включая 3.0.4.1', win_p='— решение CodeCart PRO для магазинов на OpenCart и ocStore. Подробности и тестовый доступ — в демо-админке ниже.', rule='Все важные действия запускаются вручную администратором.',
            demo_h='🧪 Проверьте модуль на демо-сайте', demo_p='Перед покупкой можно открыть тестовую админ-панель и посмотреть интерфейс и логику работы доступных модулей.', demo_a='Тестовая админка:', login='Логин:', pwd='Пароль:',
            demo_s='Демо-сайт предназначен для ознакомления. Набор установленных модулей и тестовые данные могут меняться.', buy_h='🛒 Где приобрести модуль',
            buy_p='Модули CodeCart PRO можно приобрести на этом сайте. Дополнительный официальный канал — <a href="https://opencartforum.com/files/developer/1123944-codecartpro/?utm_source=opencartforum&amp;utm_medium=profilecpage&amp;utm_campaign=profile" rel="noopener">профиль CodeCart PRO на OpenCartForum</a>. Перед оплатой проверьте актуальную версию, цену и условия конкретного предложения.'),
 'uk': dict(mod='професійний модуль CodeCart PRO для OpenCart 3.0.x та ocStore 3.0.x', why='💡 Навіщо потрібен модуль', feats='💎 Основні можливості', how='🧭 Як це працює',
            know='🔐 Важливо знати', comp='⚙️ Сумісність і технології', lang='🌍 Інтерфейс трьома мовами', win='🏆 Підсумок',
            lang_p='Адмінка модуля доступна російською, українською та англійською мовами — зручно для магазинів і команд, які працюють у різних мовних середовищах.',
            backup='Перед встановленням і оновленням зробіть резервну копію файлів сайту та бази даних.', demo_ok='Роботу модуля можна переглянути в демо-адмінці до купівлі.',
            oc='OpenCart 3.0.x', ocs='ocStore 3.0.x, зокрема 3.0.4.1', win_p='— рішення CodeCart PRO для магазинів на OpenCart та ocStore. Подробиці й тестовий доступ — у демо-адмінці нижче.', rule='Усі важливі дії запускаються вручну адміністратором.',
            demo_h='🧪 Перевірте модуль на демо-сайті', demo_p='Перед купівлею можна відкрити тестову адмін-панель і подивитися інтерфейс та логіку роботи доступних модулів.', demo_a='Тестова адмінка:', login='Логін:', pwd='Пароль:',
            demo_s='Демо-сайт призначений для ознайомлення. Набір встановлених модулів і тестові дані можуть змінюватися.', buy_h='🛒 Де придбати модуль',
            buy_p='Модулі CodeCart PRO можна придбати на цьому сайті. Додатковий офіційний канал — <a href="https://opencartforum.com/files/developer/1123944-codecartpro/?utm_source=opencartforum&amp;utm_medium=profilecpage&amp;utm_campaign=profile" rel="noopener">профіль CodeCart PRO на OpenCartForum</a>. Перед оплатою перевірте актуальну версію, ціну та умови конкретної пропозиції.'),
 'en': dict(mod='a professional CodeCart PRO module for OpenCart 3.0.x and ocStore 3.0.x', why='💡 Why you need it', feats='💎 Key features', how='🧭 How it works',
            know='🔐 Good to know', comp='⚙️ Compatibility and technology', lang='🌍 Three-language interface', win='🏆 Summary',
            lang_p='The module admin is available in Russian, Ukrainian and English — convenient for stores and teams working in different language environments.',
            backup='Back up your site files and database before installing or updating.', demo_ok='You can see the module in action in the demo admin before buying.',
            oc='OpenCart 3.0.x', ocs='ocStore 3.0.x, including 3.0.4.1', win_p='is a CodeCart PRO solution for OpenCart and ocStore stores. Details and test access are in the demo admin below.', rule='All important actions are started manually by the administrator.',
            demo_h='🧪 Try the module on the demo site', demo_p='Before buying you can open the test admin panel and look at the interface and logic of the available modules.', demo_a='Demo admin:', login='Login:', pwd='Password:',
            demo_s='The demo site is for evaluation. The set of installed modules and test data may change.', buy_h='🛒 Where to buy',
            buy_p='CodeCart PRO modules can be purchased on this site. An additional official channel is the <a href="https://opencartforum.com/files/developer/1123944-codecartpro/?utm_source=opencartforum&amp;utm_medium=profilecpage&amp;utm_campaign=profile" rel="noopener">CodeCart PRO profile on OpenCartForum</a>. Check the current version, price and terms of the specific offer before paying.'),
}
ALT = {110: dict(ru='профессиональная Windows-утилита CodeCart PRO для проверки модулей OpenCart 3.0.x и ocStore 3.0.x', uk='професійна Windows-утиліта CodeCart PRO для перевірки модулів OpenCart 3.0.x та ocStore 3.0.x', en='a professional CodeCart PRO Windows utility for vetting OpenCart 3.0.x and ocStore 3.0.x modules'),
       92: dict(ru='коммерческая тема CodeCart PRO для OpenCart 3.0.x и ocStore 3.0.x', uk='комерційна тема CodeCart PRO для OpenCart 3.0.x та ocStore 3.0.x', en='a commercial CodeCart PRO theme for OpenCart 3.0.x and ocStore 3.0.x')}
NUM = ['1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣']
import re as _re
def _short_name(pid):
    p = next(x for x in DATA['prods'] if x['id'] == pid)
    n = html.unescape(p['names']['2']['name']).split(' — ')[0].split(' - ')[0].strip()
    n = _re.sub(r'\s+for OpenCart.*$', '', n)
    return _re.sub(r'\bPro\b', 'PRO', n)
def _sentences(t):
    return [x.strip() for x in _re.split(r'(?<=[.!?])\s+(?=[A-ZА-ЯІЇЄҐ0-9«])', t) if x.strip()]

def build(pid, l):
    k = LANG[l]; c = C[pid][k]; L = H[k]; nm = _short_name(pid)
    lead = c['lead']
    sents = _sentences(lead)
    first = sents[0]
    rest = ' '.join(sents[1:])
    mod = L['mod']
    if pid in ALT:
        mod = ALT[pid][k]
    head = f'<p>🚀 <strong>{e(nm)}</strong> — {mod}.</p>' if k != 'en' else f'<p>🚀 <strong>{e(nm)}</strong> is {mod}.</p>'
    if first.lower().startswith(nm.lower()):
        first_html = f'<strong>{e(first[:len(nm)])}</strong>{e(first[len(nm):])}'
    else:
        first_html = e(first)
    intro = head + f'<p>{first_html}</p>'
    o = ['<div class="codecart-product-description">', intro]
    if rest:
        o.append(f'<h3>{L["why"]}</h3><p>{e(rest)}</p>')
    o.append(f'<h3>{L["feats"]}</h3><ul>' + ''.join(f'<li>✅ {e(x)}</li>' for x in c['feats']) + '</ul>')
    o.append(f'<h3>{L["how"]}</h3><ul>' + ''.join(f'<li>{NUM[i]} {e(x)}</li>' for i, x in enumerate(c['how'])) + '</ul>')
    know = _sentences(c['note']) + [L['backup']]
    if pid != 110: know.append(L['demo_ok'])
    o.append(f'<h3>{L["know"]}</h3><ul>' + ''.join(f'<li>✅ {e(x)}</li>' for x in know) + '</ul>')
    comp = ([] if pid == 110 else [L['oc'], L['ocs']]) + list(c.get('chips', []))
    o.append(f'<h3>{L["comp"]}</h3><ul>' + ''.join(f'<li>✅ {e(x)}</li>' for x in comp) + '</ul>')
    if _re.search(r'UA|укра', ' '.join(c.get('chips', []) + c['feats']), _re.I):
        o.append(f'<h3>{L["lang"]}</h3><p>{L["lang_p"]}</p>')
    o.append(f'<h3>{L["win"]}</h3><p><strong>{e(nm)}</strong> {L["win_p"]}</p></div>')
    if pid not in NO_DEMO:
        o.append(f'<div class="ccp-demo" style="background:#eef7ff;border:1px solid #bfdbfe;border-radius:14px;padding:18px 20px;margin-top:24px;color:#0b1b3a"><h3 style="margin:0 0 10px;color:#0b4fa5;">{L["demo_h"]}</h3><p>{L["demo_p"]}</p><p><strong>{L["demo_a"]}</strong> <a href="https://demo.codecartpro.com/admin/" target="_blank" rel="noopener">https://demo.codecartpro.com/admin/</a><br>👤 <strong>{L["login"]}</strong> Demo<br>🔑 <strong>{L["pwd"]}</strong> Demo</p><p style="margin-bottom:0;"><small>{L["demo_s"]}</small></p></div>')
    o.append(f'<div class="ccp-buy-channels" style="background:#fff8e6;border:1px solid #eed493;border-radius:14px;padding:20px 22px;margin:22px 0;color:#3d2e00"><h3 style="margin:0 0 10px;color:#8b6100;">{L["buy_h"]}</h3><p style="margin:0;">{L["buy_p"]}</p></div>')
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
