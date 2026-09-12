const fs = require('fs');
const zlib = require('zlib');

const buf = fs.readFileSync('scratch/algoligence_site_logo.png');
let pos = 8;
let idatChunks = [];
let width = buf.readUInt32BE(16);
let height = buf.readUInt32BE(20);
while (pos < buf.length) {
  let len = buf.readUInt32BE(pos);
  let type = buf.slice(pos + 4, pos + 8).toString();
  if (type === 'IDAT') idatChunks.push(buf.slice(pos + 8, pos + 8 + len));
  pos += 12 + len;
}
const uncompressed = zlib.inflateSync(Buffer.concat(idatChunks));
const stride = 1 + width * 4;

function isWhite(x, y) {
  if (x < 0 || x >= width || y < 0 || y >= height) return false;
  return uncompressed[y * stride + 1 + x * 4] > 200;
}

// Find top apex:
let topY = 396;
let topXs = [];
for (let x = 391; x <= 688; x++) {
  if (isWhite(x, topY)) topXs.push(x);
}
console.log('Top apex X range at y=' + topY + ':', topXs[0], 'to', topXs[topXs.length - 1]);

// Bottom Y:
let botY = 683;
let botXs = [];
for (let x = 391; x <= 688; x++) {
  if (isWhite(x, botY)) botXs.push(x);
}
console.log('Bottom X range at y=' + botY + ':', botXs[0], 'to', botXs[botXs.length - 1]);

// Print cross-section at various heights to find all polygon corners
[396, 400, 450, 500, 550, 600, 650, 683].forEach(y => {
  let spans = [];
  let inSpan = false;
  let start = 0;
  for (let x = 350; x <= 720; x++) {
    let w = isWhite(x, y);
    if (w && !inSpan) { inSpan = true; start = x; }
    else if (!w && inSpan) { inSpan = false; spans.push([start, x - 1]); }
  }
  console.log(`y=${y}:`, spans);
});
