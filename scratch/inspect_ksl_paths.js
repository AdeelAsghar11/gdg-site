const fs = require('fs');

const svg = fs.readFileSync('scratch/ksl_full.svg', 'utf8');
const lines = svg.split('\n');

lines.forEach((line, idx) => {
  if (line.includes('<path')) {
    // get M coordinates
    const mMatch = line.match(/M\s+([\d\.\-]+)\s+([\d\.\-]+)/);
    const color = line.match(/fill="(.*?)"/);
    if (mMatch) {
      const mx = parseFloat(mMatch[1]);
      const my = parseFloat(mMatch[2]);
      if (mx > 1000 && mx < 1400 && my > 700 && my < 900) {
        console.log(`Line ${idx}: M ${mx}, ${my} fill=${color ? color[1] : ''}`);
      }
    }
  }
});
