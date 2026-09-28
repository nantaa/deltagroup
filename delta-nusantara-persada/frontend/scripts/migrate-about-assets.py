import os
import shutil
from PIL import Image

src_dir = 'public/komponen tambahan'
dest_dir = 'public/images/about'

os.makedirs(dest_dir, exist_ok=True)

for f in os.listdir(src_dir):
    src_file = os.path.join(src_dir, f)
    if f.endswith('.svg'):
        dest_file = os.path.join(dest_dir, f)
        shutil.copy2(src_file, dest_file)
        print(f"[SVG] Copied {f} -> {dest_file}")
    elif f.endswith('.png') or f.endswith('.jpg'):
        base = os.path.splitext(f)[0]
        dest_file = os.path.join(dest_dir, f"{base}.webp")
        with Image.open(src_file) as img:
            img = img.convert('RGBA')
            img.save(dest_file, 'WEBP', quality=85, method=6)
            orig_sz = os.path.getsize(src_file) / 1024
            new_sz = os.path.getsize(dest_file) / 1024
            print(f"[WEBP] Compressed {f} ({orig_sz:.1f} KB) -> {dest_file} ({new_sz:.1f} KB)")

print("=== About Modal Assets Migration Complete ===")
