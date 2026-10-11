import json, html, re
from pathlib import Path

SCR = Path(__file__).resolve().parent
OUT = Path(__file__).resolve().parent.parent
DATA = json.load(open(SCR/'work/data.json'))

ICONS = {
 'seo': '<circle cx="10.5" cy="10.5" r="6.5"/><path d="m15.5 15.5 5 5"/><path d="M7.5 12.5l2-2.5 2 1.5 2.2-3"/>',
 'ai': '<path d="M11 3l1.9 5.1L18 10l-5.1 1.9L11 17l-1.9-5.1L4 10l5.1-1.9z"/><path d="M19 14l.9 2.1L22 17l-2.1.9L19 20l-.9-2.1L16 17l2.1-.9z"/>',
 'images': '<rect x="3" y="4" width="18" height="16" rx="3"/><circle cx="8.5" cy="9.5" r="1.8"/><path d="M21 16l-5-5-8 9"/>',
 'catalog': '<path d="M12 3l8 4.5v9L12 21l-8-4.5v-9z"/><path d="M4 7.5l8 4.5 8-4.5M12 12v9"/>',
 'import': '<path d="M7 4v14M7 4L3.5 7.5M7 4l3.5 3.5"/><path d="M17 20V6m0 14l-3.5-3.5M17 20l3.5-3.5"/>',
 'orders': '<circle cx="9" cy="20" r="1.4"/><circle cx="18" cy="20" r="1.4"/><path d="M2.5 3.5h3l2.4 11.2a1.5 1.5 0 0 0 1.5 1.2h8.2a1.5 1.5 0 0 0 1.5-1.1L21 8H6.2"/>',
 'shipping': '<path d="M2.5 6.5h11v10h-11z"/><path d="M13.5 10h4l3 3.5v3h-7"/><circle cx="7" cy="18" r="2"/><circle cx="17" cy="18" r="2"/>',
 'payment': '<rect x="2.5" y="5" width="19" height="14" rx="3"/><path d="M2.5 10h19M6.5 15h4"/>',
 'notify': '<path d="M6 16.5V11a6 6 0 0 1 12 0v5.5l1.5 2h-15z"/><path d="M10 21a2.2 2.2 0 0 0 4 0"/>',
 'security': '<path d="M12 3l7.5 3v5.5c0 4.5-3 8-7.5 9.5-4.5-1.5-7.5-5-7.5-9.5V6z"/><path d="M8.7 12l2.3 2.3 4.3-4.6"/>',
 'reviews': '<path d="M12 3.2l2.6 5.4 5.9.8-4.3 4.1 1 5.9L12 16.6l-5.2 2.8 1-5.9L3.5 9.4l5.9-.8z"/>',
 'speed': '<path d="M4 17a8.5 8.5 0 1 1 16 0"/><path d="M12 17l4-6"/><circle cx="12" cy="17" r="1.2"/>',
 'themes': '<rect x="3" y="4" width="18" height="16" rx="3"/><path d="M3 9h18M9 9v11"/>',
 'lang': '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18"/>',
 'marketing': '<path d="M3.5 10v4h3l8 4V6l-8 4z"/><path d="M18 9.5a4 4 0 0 1 0 5M7 14l1 5h2.5l-1-4.5"/>',
 'users': '<circle cx="9" cy="8" r="3.2"/><path d="M2.8 20c.4-3.6 3-5.5 6.2-5.5s5.8 1.9 6.2 5.5"/><path d="M16 5a3.2 3.2 0 0 1 0 6M18 14.8c2 .6 3.1 2.3 3.3 4.7"/>',
 'plug': '<path d="M9 3v5M15 3v5"/><path d="M6 8h12v3a6 6 0 0 1-12 0z"/><path d="M12 17v4"/>',
 'tools': '<rect x="2.5" y="4" width="19" height="16" rx="3"/><path d="M7 9.5l3 2.5-3 2.5M12.5 15h4.5"/>',
 'download': '<path d="M12 3v12m0 0l-4.5-4.5M12 15l4.5-4.5"/><path d="M4 17v2.5A1.5 1.5 0 0 0 5.5 21h13a1.5 1.5 0 0 0 1.5-1.5V17"/>',
}
# category_id -> (icon, accent, ru, uk, en)
CAT = {
 59:('seo','#34d399'), 60:('ai','#a78bfa'), 63:('images','#f472b6'), 61:('catalog','#38bdf8'),
 62:('import','#fb923c'), 64:('orders','#fbbf24'), 66:('shipping','#2dd4bf'), 67:('payment','#a3e635'),
 68:('notify','#fb7185'), 69:('security','#f87171'), 70:('reviews','#fcd34d'), 71:('speed','#22d3ee'),
 72:('themes','#e879f9'), 73:('lang','#818cf8'), 74:('download','#ffd700'), 75:('marketing','#fb923c'),
 76:('users','#60a5fa'), 77:('plug','#34d399'), 78:('tools','#94a3b8'),
}
def svg(icon, size, color='#fff', sw=1.6):
    return f'<svg width="{size}" height="{size}" viewBox="0 0 24 24" fill="none" stroke="{color}" stroke-width="{sw}" stroke-linecap="round" stroke-linejoin="round">{ICONS[icon]}</svg>'

import base64
def _b64(p): return 'data:image/png;base64,'+base64.b64encode(open(p,'rb').read()).decode()
LOGO_URI = _b64(OUT/'assets/brand/logo-560.png')

BLUE='#0a66f0'; BLUE_D='#064bb5'; BLUE_L='#4d9bff'; NAVY='#0b1b3a'; YEL='#ffc21a'
BASE_CSS = '''
*{box-sizing:border-box;margin:0;padding:0}
body{font-family:'Inter','Inter Display',Arial,sans-serif;-webkit-font-smoothing:antialiased;color:#0b1b3a}
.bg{position:absolute;inset:0;background:
  radial-gradient(circle at var(--gx,88%) var(--gy,8%),rgba(255,194,26,.30),transparent 38%),
  radial-gradient(circle at 8% 100%,rgba(10,102,240,.22),transparent 52%),
  linear-gradient(160deg,#ffffff 0%,#eaf2ff 58%,#d6e6ff 100%)}
.grid{position:absolute;inset:0;background-image:linear-gradient(rgba(10,102,240,.07) 1px,transparent 1px),linear-gradient(90deg,rgba(10,102,240,.07) 1px,transparent 1px);background-size:var(--gs,48px) var(--gs,48px);
  -webkit-mask-image:radial-gradient(circle at 75% 25%,#000,transparent 72%);mask-image:radial-gradient(circle at 75% 25%,#000,transparent 72%)}
.tile3d{display:flex;align-items:center;justify-content:center;background:linear-gradient(165deg,#5aa6ff 0%,#0a66f0 52%,#0649b3 100%);
  box-shadow:0 0 0 var(--ring,8px) #fff,0 30px 60px rgba(10,80,200,.35),inset 0 3px 0 rgba(255,255,255,.55),inset 0 -10px 22px rgba(0,30,110,.35)}
.tile3d.y{background:linear-gradient(165deg,#ffe07a 0%,#ffc21a 55%,#f0a000 100%);box-shadow:0 0 0 var(--ring,8px) #fff,0 24px 50px rgba(240,160,0,.35),inset 0 3px 0 rgba(255,255,255,.6),inset 0 -8px 18px rgba(160,90,0,.3)}
.pro{display:inline-block;background:linear-gradient(165deg,#ffe07a,#ffc21a 60%,#f0a000);color:#0b1b3a;font-weight:900;border-radius:.3em;padding:.04em .32em;box-shadow:0 0 0 .06em #0a66f0 inset}
'''
def logo(h):  # height px — настоящий логотип
    return f'<img src="{LOGO_URI}" style="height:{h}px;display:block">'
