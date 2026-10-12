# -*- coding: utf-8 -*-
"""Собирает пропатченную тему: Theme_CodeCart_Pro_v8.7.5-brand1.ocmod.zip
Использование: python3 tools/build_theme.py <исходный Theme_CodeCart_Pro_v8.7.5.ocmod.zip> <куда положить результат>"""
import sys, zipfile, re, shutil
from pathlib import Path
OUT = Path(__file__).resolve().parent.parent
src, dst = Path(sys.argv[1]), Path(sys.argv[2])
css = (OUT/'css/codecart-brand.css').read_text(encoding='utf8')
css = css.replace('/image/catalog/codecartpro/fonts/', '../fonts/')
js = (OUT/'js/codecart-brand.js').read_text(encoding='utf8')
base = 'upload/catalog/view/theme/codecart_pro/'
zin = zipfile.ZipFile(src)
with zipfile.ZipFile(dst, 'w', zipfile.ZIP_DEFLATED) as z:
    for i in zin.infolist():
        data = zin.read(i.filename)
        if i.filename == base + 'stylesheet/codecart_pro.css':
            data = data + ('\n\n/* ===== CodeCart PRO brand layer (brand1) ===== */\n' + css + '\n').encode('utf8')
        elif i.filename == base + 'javascript/codecart_pro.js':
            data = data + ('\n\n/* ===== CodeCart PRO brand layer (brand1) ===== */\n' + js + '\n').encode('utf8')
        elif i.filename == 'install.xml':
            data = data.replace(b'<version>8.7.5</version>', b'<version>8.7.5-brand1</version>', 1)
        z.writestr(i, data)
    for f in sorted((OUT/'assets/fonts').glob('*.woff2')):
        z.write(f, base + 'fonts/' + f.name)
print('ok', dst)
