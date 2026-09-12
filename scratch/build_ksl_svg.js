const fs = require('fs');

const svg = fs.readFileSync('scratch/ksl_full.svg', 'utf8');
const lines = svg.split('\n');

// Lines 35 to 63 (inclusive)
const kslLines = lines.slice(35, 64);

// Find exact bounding box from M, L, C commands
let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
kslLines.forEach(line => {
  const matches = line.matchAll(/([MLC])\s+([\d\.\-]+)\s+([\d\.\-]+)/g);
  for (const m of matches) {
    const x = parseFloat(m[2]);
    const y = parseFloat(m[3]);
    if (x < minX) minX = x;
    if (x > maxX) maxX = x;
    if (y < minY) minY = y;
    if (y > maxY) maxY = y;
  }
});

console.log('Exact bounds:', { minX, minY, maxX, maxY, width: maxX - minX, height: maxY - minY });

const pad = 15;
const vb = `${(minX - pad).toFixed(1)} ${(minY - pad).toFixed(1)} ${(maxX - minX + pad*2).toFixed(1)} ${(maxY - minY + pad*2).toFixed(1)}`;

const outSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${vb}" width="100%" height="100%">
${kslLines.join('\n')}
</svg>`;

fs.writeFileSync('public/partners/ksl.svg', outSvg);
console.log('Saved public/partners/ksl.svg');
