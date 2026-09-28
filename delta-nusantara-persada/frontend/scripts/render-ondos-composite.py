import os
import io
import re
import base64
from PIL import Image

with open('public/images/ondos.svg', 'r', encoding='utf-8') as f:
    content = f.read()

matches = re.findall(r'xlink:href="data:image/png;base64,([^"]+)"', content)

# Base canvas 859 x 319
canvas = Image.new('RGBA', (859, 319), (0, 0, 0, 0))

# Layer 0: Background refinery (859x319)
im0 = Image.open(io.BytesIO(base64.b64decode(matches[0]))).convert('RGBA')
canvas.paste(im0, (0, 0))

# Smooth dark navy gradient ONLY on the left (x: 0 to 450) so text is 100% legible, fading to 0% alpha on right
grad = Image.new('RGBA', (859, 319), (0, 0, 0, 0))
for x in range(859):
    if x < 450:
        t = x / 450.0
        # Dark navy #011E42 fading smoothly to transparent
        a = int(240 * (1.0 - (t ** 1.5)))
        r, g, b = 1, 30, 66
    else:
        a = 0
        r, g, b = 0, 0, 0
    for y in range(319):
        grad.putpixel((x, y), (r, g, b, a))

canvas = Image.alpha_composite(canvas, grad)

# Layer 1: Mesh waves (placed behind model)
im1 = Image.open(io.BytesIO(base64.b64decode(matches[1]))).convert('RGBA')
im1_resized = im1.resize((1128, 953), Image.Resampling.LANCZOS)
im1_rot = im1_resized.rotate(-17.8, resample=Image.Resampling.BICUBIC, expand=True)
canvas.paste(im1_rot, (100, -200), im1_rot)

# Layer 2: Inspector model (100% natural colors, zero tint)
im2 = Image.open(io.BytesIO(base64.b64decode(matches[2]))).convert('RGBA')
im2_resized = im2.resize((348, 348), Image.Resampling.LANCZOS)
canvas.paste(im2_resized, (495, -8), im2_resized)

# Save high-res crisp WebP
output_path = 'public/images/ondos.webp'
canvas.save(output_path, 'WEBP', quality=88, method=6)
print(f"Composited ondos.webp with Model saved: {os.path.getsize(output_path)/1024:.1f} KB")
