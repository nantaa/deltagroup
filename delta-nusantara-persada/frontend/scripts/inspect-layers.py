import re
import base64
import io
from PIL import Image

with open('public/images/ondos.svg', 'r', encoding='utf-8') as f:
    content = f.read()

matches = re.findall(r'xlink:href="data:image/png;base64,([^"]+)"', content)
print(f'Total embedded images: {len(matches)}')
for i, m in enumerate(matches):
    data = base64.b64decode(m)
    im = Image.open(io.BytesIO(data))
    print(f'Image {i}: size={im.size}, mode={im.mode}')
    im.save(f'public/images/extracted/ondo_layer_{i}.png')
