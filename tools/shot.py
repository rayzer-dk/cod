import sys
from playwright.sync_api import sync_playwright
src, out, w = sys.argv[1], sys.argv[2], int(sys.argv[3])
dark = len(sys.argv) > 4
with sync_playwright() as pw:
    b = pw.chromium.launch(executable_path='/opt/pw-browsers/chromium-1194/chrome-linux/chrome', args=['--no-sandbox'])
    p = b.new_page(viewport={'width': w, 'height': 900})
    p.goto('file://' + src)
    if dark: p.evaluate("document.documentElement.classList.add('ccp-dark-theme');document.body.style.background='#0f172a'")
    p.wait_for_timeout(300)
    p.screenshot(path=out, full_page=True)
    b.close()
