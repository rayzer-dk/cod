from pathlib import Path
from PIL import Image, ImageDraw
svg='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192 192"><defs><clipPath id="app"><rect width="192" height="192" rx="44"/></clipPath></defs><g clip-path="url(#app)"><rect width="192" height="192" fill="#C8102E"/><path d="M56 0h24v192H56z M0 84h192v24H0z" fill="#fff"/></g></svg>'
Path('dist/icon.svg').write_text(svg+'\n')
for size in [192,512]:
 scale=4; canvas=size*scale
 image=Image.new('RGBA',(canvas,canvas),'#C8102E');draw=ImageDraw.Draw(image)
 unit=canvas/192
 draw.rectangle((56*unit,0,80*unit-1,canvas),fill='white');draw.rectangle((0,84*unit,canvas,108*unit-1),fill='white')
 mask=Image.new('L',(canvas,canvas));ImageDraw.Draw(mask).rounded_rectangle((0,0,canvas-1,canvas-1),radius=44*unit,fill=255)
 image.putalpha(mask);image.resize((size,size),Image.Resampling.LANCZOS).save(f'dist/icon-{size}.png')
Path('dist/flag-dk.svg').write_text('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 37 28"><path fill="#C8102E" d="M0 0h37v28H0z"/><path fill="#fff" d="M12 0h4v28h-4z M0 12h37v4H0z"/></svg>\n')
Image.open('dist/icon-512.png').save('Danskdag.ico',sizes=[(16,16),(32,32),(48,48),(64,64),(128,128),(256,256)])
