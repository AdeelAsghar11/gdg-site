const fs = require('fs');
const svg = fs.readFileSync('scratch/ksl_full.svg', 'utf8');
const lines = svg.split('\n');

const groups = [];
let currentGroup = [];
for (let i = 1; i < lines.length; i++) {
  const line = lines[i];
  if (!line.includes('<path')) continue;
  const m = line.match(/M\s+([\d\.\-]+)\s+([\d\.\-]+)/);
  const col = line.match(/fill="rgb\((.*?)\)"/);
  if (m && col) {
    const x = parseFloat(m[1]);
    const y = parseFloat(m[2]);
    currentGroup.push({ i, x, y, col: col[1] });
  }
}

console.log('Parsed points count:', currentGroup.length);
// Group by quadrant
const tl = currentGroup.filter(p => p.x < 960 && p.y < 540);
const tr = currentGroup.filter(p => p.x >= 960 && p.y < 540);
const bl = currentGroup.filter(p => p.x < 960 && p.y >= 540);
const br = currentGroup.filter(p => p.x >= 960 && p.y >= 540);

console.log('TL count:', tl.length, 'sample color:', tl[0]?.col);
console.log('TR count:', tr.length, 'sample color:', tr[0]?.col);
console.log('BL count:', bl.length, 'sample color:', bl[0]?.col);
console.log('BR count:', br.length, 'sample color:', br[0]?.col);
