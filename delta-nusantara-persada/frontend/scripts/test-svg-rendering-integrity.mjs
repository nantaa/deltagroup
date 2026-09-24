import { test } from 'node:test';
import assert from 'node:assert';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

test('SVG Optimization: All <Image> tags rendering SVG sources must have unoptimized prop', () => {
  const uiDir = path.join(rootDir, 'components/ui');
  const files = fs.readdirSync(uiDir).filter(f => f.endsWith('.tsx'));

  for (const file of files) {
    const filePath = path.join(uiDir, file);
    const content = fs.readFileSync(filePath, 'utf8');

    // Check if the component imports next/image and references .svg
    if (content.includes("from 'next/image'") && content.includes('.svg')) {
      // Find all <Image ... /> usages
      const imageBlocks = content.match(/<Image[^>]+>/g) || [];
      for (const block of imageBlocks) {
        // If the src explicitly contains .svg or a variable pointing to an SVG array (e.g. iconPath, bgCard)
        const isSvgSource = block.includes('.svg') || 
                            block.includes('iconPath') || 
                            block.includes('bgCard') || 
                            block.includes('m.bgCard') || 
                            block.includes('ind.iconPath') ||
                            block.includes('s.iconPath') ||
                            block.includes('p.iconPath');

        if (isSvgSource) {
          assert.ok(
            block.includes('unoptimized'),
            `File ${file} has an <Image> rendering SVG that is missing the 'unoptimized' prop:\n${block}`
          );
        }
      }
    }
  }
});

test('SVG Files: All SVGs in public/images/components/ must start with <?xml prolog for Next.js optimizer compatibility', () => {
  const compDir = path.join(rootDir, 'public/images/components');
  if (!fs.existsSync(compDir)) return;
  const files = fs.readdirSync(compDir).filter(f => f.endsWith('.svg'));

  for (const file of files) {
    const filePath = path.join(compDir, file);
    const content = fs.readFileSync(filePath, 'utf8').trim();
    assert.ok(
      content.startsWith('<?xml'),
      `SVG file ${file} should begin with '<?xml' to prevent Next.js detectContentType returning null`
    );
  }
});
