const fs = require('fs');

const s = fs.readFileSync('scratch/stream_2.txt', 'utf8');

// Print all color changes, transforms, and path stats
const lines = s.split('\n');
let colors = new Set();
let fillCount = 0;
for (let line of lines) {
  line = line.trim();
  if (line.endsWith('rg') || line.endsWith('RG') || line.endsWith('k') || line.endsWith('K')) {
    colors.add(line);
  }
  if (line === 'f' || line === 'f*' || line === 'B' || line === 'B*' || line === 's' || line === 'S') {
    fillCount++;
  }
}

console.log('Colors found:', Array.from(colors));
console.log('Total path fills/strokes:', fillCount);
