import os
import io
import re
import base64
import math
from PIL import Image

with open('public/images/ondos.svg', 'r', encoding='utf-8') as f:
    content = f.read()

matches = re.findall(r'xlink:href="data:image/png;base64,([^"]+)"', content)

# Base canvas 859 x 319
canvas = Image.new('RGBA', (859, 319), (0, 0, 0, 0))

# Layer 0: Background refinery (859x319)
im0 = Image.open(io.BytesIO(base64.b64decode(matches[0]))).convert('RGBA')
canvas.paste(im0, (0, 0))

# Gradient blue overlay
# In SVG: <rect width="859" height="319" rx="20" fill="url(#paint0_linear_5442_4405)"/>
# Linear gradient from (50, 159.5) to (688.5, 159.5) #012F73 -> #014195 -> #004EA8 -> #0163CD (0.5 opacity)
# Let's create a smooth gradient overlay
grad = Image.new('RGBA', (859, 319), (0, 0, 0, 0))
for x in range(859):
    t = max(0.0, min(1.0, (x - 50) / 638.5))
    r = int(1 * (1 - t) + 1 * t)
    g = int(47 * (1 - t) + 99 * t)
    b = int(115 * (1 - t) + 205 * t)
    a = int(220 * (1 - t) + 120 * t)
    for y in range(319):
        grad.putpixel((x, y), (r, g, b, a))

canvas = Image.alpha_composite(canvas, grad)

# Layer 1: Mesh waves
# <rect x="124.584" y="-588" width="1127.72" height="952.899" transform="rotate(17.8181 124.584 -588)" fill="url(#pattern2_5442_4405)"/>
im1 = Image.open(io.BytesIO(base64.b64decode(matches[1]))).convert('RGBA')
im1_resized = im1.resize((1128, 953), Image.Resampling.LANCZOS)
im1_rot = im1_resized.rotate(-17.8, resample=Image.Resampling.BICUBIC, expand=True)
# Paste rotated mesh waves
canvas.paste(im1_rot, (100, -200), im1_rot)

# Layer 2: Inspector model
# <rect x="495" y="-8" width="348" height="348" fill="url(#pattern3_5442_4405)"/>
im2 = Image.open(io.BytesIO(base64.b64decode(matches[2]))).convert('RGBA')
im2_resized = im2.resize((348, 348), Image.Resampling.LANCZOS)
canvas.paste(im2_resized, (495, -8), im2_resized)

# Save high-res crisp WebP
output_path = 'public/images/ondos.webp'
canvas.save(output_path, 'WEBP', quality=85, method=6)
print(f"Composited ondos.webp with Model saved: {os.path.getsize(output_path)/1024:.1f} KB")
