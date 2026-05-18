import { readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const here = dirname(fileURLToPath(import.meta.url));
const root = resolve(here, '..');
const html = await readFile(resolve(root, 'descriptions.html'), 'utf8');

const regex = /<div class="square row-\d+">\s*<div class="square-head">([\s\S]*?)<\/div>\s*<div class="body">([\s\S]*?)<\/div>\s*<\/div>/g;

const details = {};
for (const m of html.matchAll(regex)) {
  const head = m[1];
  const body = m[2].trim();
  const numMatch = head.match(/<span class="num">(\d+)<\/span>/);
  if (!numMatch) continue;
  const num = parseInt(numMatch[1], 10);
  details[num] = body;
}

const out =
  '// Auto-generated from descriptions.html — do not edit by hand.\n' +
  '// Regenerate with: node scripts/build-square-details.mjs\n' +
  `export const squareDetails = ${JSON.stringify(details, null, 2)};\n`;

await writeFile(resolve(root, 'src', 'squareDetails.js'), out);
console.log(`Generated ${Object.keys(details).length} square detail entries.`);
