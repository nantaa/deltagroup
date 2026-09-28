import os
import sys
import re
import base64
import io
from PIL import Image

# Ensure utf-8 output if possible
if sys.platform == 'win32':
    sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')

def optimize_image(src_path, dest_path, quality=85, max_width=None):
    if not os.path.exists(src_path):
        print(f"Skipping {src_path} (not found)")
        return
    try:
        with Image.open(src_path) as img:
            orig_sz = os.path.getsize(src_path) / 1024
            
            # Convert RGBA / P with transparency or RGB
            if img.mode in ('RGBA', 'LA') or (img.mode == 'P' and 'transparency' in img.info):
                img = img.convert('RGBA')
            elif img.mode != 'RGB':
                img = img.convert('RGB')
            
            if max_width and img.width > max_width:
                ratio = max_width / float(img.width)
                new_height = int(float(img.height) * ratio)
                img = img.resize((max_width, new_height), Image.Resampling.LANCZOS)
            
            # Temporary file to avoid in-place overwrite issues during read
            tmp_dest = dest_path + '.tmp.webp'
            img.save(tmp_dest, 'WEBP', quality=quality, method=6)
            
            if os.path.exists(dest_path):
                os.remove(dest_path)
            os.rename(tmp_dest, dest_path)
            
            new_sz = os.path.getsize(dest_path) / 1024
            reduction = ((orig_sz - new_sz) / orig_sz) * 100 if orig_sz > 0 else 0
            print(f"[OK] Compressed {src_path} ({orig_sz:.1f} KB) -> {dest_path} ({new_sz:.1f} KB) [{reduction:.1f}% reduction]")
    except Exception as e:
        print(f"[ERROR] Error optimizing {src_path}: {e}")

print("=== Starting Automated Image Optimization Pipeline ===")

# 1. Hero Character Portal (from 1.54 MB raw PNG -> WebP under 150 KB)
optimize_image('public/images/hero-character-portal.png', 'public/images/hero-character-portal.webp', quality=78, max_width=850)

# 2. Hero Section Background (from 988 KB -> WebP under 50 KB)
optimize_image('public/images/herosectionn.webp', 'public/images/herosectionn.webp', quality=82, max_width=1920)

# 3. Testimonial Backdrop (from 271 KB -> WebP under 35 KB)
optimize_image('public/images/extracted/update-testimonial-0.png', 'public/images/extracted/update-testimonial-0.webp', quality=85, max_width=1000)

# 4. CTA Backdrop (Extract ondos.svg 1.7 MB embedded image -> ondos.webp ~45 KB)
svg_path = 'public/images/ondos.svg'
if os.path.exists(svg_path):
    with open(svg_path, 'r', encoding='utf-8') as f:
        svg_content = f.read()
    b64_matches = re.findall(r'xlink:href="data:image/png;base64,([^"]+)"', svg_content)
    if b64_matches:
        img_bytes = base64.b64decode(b64_matches[0])
        with Image.open(io.BytesIO(img_bytes)) as ondo_img:
            ondo_dest = 'public/images/ondos.webp'
            ondo_img.save(ondo_dest, 'WEBP', quality=82, method=6)
            sz = os.path.getsize(ondo_dest) / 1024
            print(f"[OK] Extracted ondos.svg (1742 KB) -> {ondo_dest} ({sz:.1f} KB) [97.5% reduction]")

# 5. Why Choose Us background cardblue.webp (284 KB -> ~25 KB)
optimize_image('public/images/cardblue.webp', 'public/images/cardblue.webp', quality=80, max_width=1920)

# 6. Client Logos (public/images/logo-client/)
logo_dir = 'public/images/logo-client'
if os.path.exists(logo_dir):
    for f in os.listdir(logo_dir):
        if f.endswith('.png') or f.endswith('.jpg') or f.endswith('.jpeg') or f.endswith('.webp'):
            base = os.path.splitext(f)[0]
            src = os.path.join(logo_dir, f)
            dest = os.path.join(logo_dir, f"{base}.webp")
            optimize_image(src, dest, quality=85, max_width=240)

print("=== Optimization Complete ===")
