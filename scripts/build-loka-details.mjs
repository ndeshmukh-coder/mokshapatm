import { readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const here = dirname(fileURLToPath(import.meta.url));
const root = resolve(here, '..');
const html = await readFile(resolve(root, 'lokas.html'), 'utf8');

const lokas = {};

const blockRegex = /<div class="loka l-[^"]+">([\s\S]*?)(?=<div class="loka l-|<div class="arc">)/g;

for (const m of html.matchAll(blockRegex)) {
  const block = m[1];

  const num = parseInt(block.match(/<span class="num">(\d+)<\/span>/)[1], 10);
  const name = block.match(/<h2>([^<]+)<\/h2>/)[1].trim();
  const sanskrit = block.match(/<span class="deva">([^<]+)<\/span>/)[1].trim();
  const cellsRange = block.match(/<span class="cells">([^<]+)<\/span>/)[1].trim();

  const essence = block.match(/<p class="essence">([\s\S]*?)<\/p>/)[1].trim();

  const themeMatch = block.match(/<h3>Theme<\/h3>\s*<p>([\s\S]*?)<\/p>/);
  const theme = themeMatch ? themeMatch[1].trim() : '';

  const wayOutMatch = block.match(/<h3>Way out<\/h3>\s*<p>([\s\S]*?)<\/p>/);
  const wayOut = wayOutMatch ? wayOutMatch[1].trim() : '';

  const keyCellsMatch = block.match(/<div class="key-cells">([\s\S]*?)<\/div>/);
  const keyCellsContent = keyCellsMatch ? keyCellsMatch[1] : '';
  const chipRegex = /<span class="chip"><span class="n">(\d+)<\/span>([^<]+?)(?:\s*<span class="(virtues|vices)">([^<]+)<\/span>)?\s*<\/span>/g;
  const keyCells = [...keyCellsContent.matchAll(chipRegex)].map(c => ({
    n: parseInt(c[1], 10),
    name: c[2].trim(),
    kind: c[3] || null,
    label: c[4] ? c[4].trim() : null,
  }));

  lokas[num] = { num, name, sanskrit, cellsRange, essence, theme, wayOut, keyCells };
}

const out =
  '// Auto-generated from lokas.html — do not edit by hand.\n' +
  '// Regenerate with: node scripts/build-loka-details.mjs\n' +
  `export const lokaDetails = ${JSON.stringify(lokas, null, 2)};\n`;

await writeFile(resolve(root, 'src', 'lokaDetails.js'), out);
console.log(`Generated ${Object.keys(lokas).length} loka detail entries.`);
