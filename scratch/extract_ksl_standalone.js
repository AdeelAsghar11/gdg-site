const fs = require('fs');

const svg = fs.readFileSync('scratch/ksl_full.svg', 'utf8');
const pathRegex = /<path d="(.*?)" fill="(.*?)" fill-rule="(.*?)" \/>/g;

let allPaths = [];
let match;
while ((match = pathRegex.exec(svg)) !== null) {
  allPaths.push({ d: match[1], fill: match[2], rule: match[3] });
}

console.log('Total paths parsed:', allPaths.length);

// Let's find paths in quadrant 4 (bottom-right: x > 960, y > 540)
// Paths 35 to 63 (0-indexed)
// Let's compute bounding box of paths 35 to 63
function getBBox(paths) {
  let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
  paths.forEach(p => {
    // extract all numbers in d
    const coords = p.d.match(/-?\d+(\.\d+)?/g);
    if (coords) {
      for (let i = 0; i < coords.length; i += 2) {
        const x = parseFloat(coords[i]);
        const y = parseFloat(coords[i+1]);
        if (!isNaN(x) && !isNaN(y)) {
          if (x < minX) minX = x;
          if (x > maxX) maxX = x;
          if (y < minY) minY = y;
          if (y > maxY) maxY = y;
        }
      }
    }
  });
  return { minX, minY, maxX, maxY, width: maxX - minX, height: maxY - minY };
}

// Check paths 35 to 63 (the standalone KSL logo in quadrant 4)
// Indices in array:
const kslPathsWhiteBg = allPaths.slice(35, 64);
const bbox = getBBox(kslPathsWhiteBg);
console.log('BBox for KSL logo (white variant):', bbox);

// Let's create an SVG with padding
const padding = 20;
const viewBox = `${bbox.minX - padding} ${bbox.minY - padding} ${bbox.width + padding*2} ${bbox.height + padding*2}`;

const kslSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${viewBox}" width="100%" height="100%">
${kslPathsWhiteBg.map(p => `  <path d="${p.d}" fill="${p.fill}" fill-rule="${p.rule}" />`).join('\n')}
</svg>`;

fs.writeFileSync('public/partners/ksl.svg', kslSvg);
console.log('Saved public/partners/ksl.svg!');
