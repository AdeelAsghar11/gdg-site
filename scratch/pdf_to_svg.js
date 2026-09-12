const fs = require('fs');

const content = fs.readFileSync('scratch/stream_2.txt', 'utf8');

// Tokenize PDF stream
const tokens = content.trim().split(/\s+/);
let i = 0;

let currentFill = '#000000';
let currentPathD = '';
let currentPoint = { x: 0, y: 0 };
let currentSubpathStart = null;
let svgPaths = [];

// Transformation stack
let matrix = [1, 0, 0, 1, 0, 0]; // [a, b, c, d, e, f]
let matrixStack = [];

function applyMatrix(x, y, m) {
  return {
    x: m[0] * x + m[2] * y + m[4],
    y: m[1] * x + m[3] * y + m[5]
  };
}

function multMatrix(m1, m2) {
  return [
    m1[0]*m2[0] + m1[1]*m2[2],
    m1[0]*m2[1] + m1[1]*m2[3],
    m1[2]*m2[0] + m1[3]*m2[2],
    m1[2]*m2[1] + m1[3]*m2[3],
    m1[4]*m2[0] + m1[5]*m2[2] + m2[4],
    m1[4]*m2[1] + m1[5]*m2[3] + m2[5]
  ];
}

function toSvg(x, y) {
  const p = applyMatrix(x, y, matrix);
  // Invert Y for SVG (MediaBox height is 1080)
  return { x: p.x.toFixed(2), y: (1080 - p.y).toFixed(2) };
}

while (i < tokens.length) {
  const t = tokens[i];
  if (t === 'q') {
    matrixStack.push([...matrix]);
    i++;
  } else if (t === 'Q') {
    if (matrixStack.length > 0) matrix = matrixStack.pop();
    i++;
  } else if (t === 'cm') {
    // 6 numbers before cm
    const a = parseFloat(tokens[i-6]);
    const b = parseFloat(tokens[i-5]);
    const c = parseFloat(tokens[i-4]);
    const d = parseFloat(tokens[i-3]);
    const e = parseFloat(tokens[i-2]);
    const f = parseFloat(tokens[i-1]);
    matrix = multMatrix([a, b, c, d, e, f], matrix);
    i++;
  } else if (t === 'rg') {
    const r = Math.round(parseFloat(tokens[i-3]) * 255);
    const g = Math.round(parseFloat(tokens[i-2]) * 255);
    const b = Math.round(parseFloat(tokens[i-1]) * 255);
    currentFill = `rgb(${r},${g},${b})`;
    i++;
  } else if (t === 'm') {
    const x = parseFloat(tokens[i-2]);
    const y = parseFloat(tokens[i-1]);
    const pt = toSvg(x, y);
    currentPathD += `M ${pt.x} ${pt.y} `;
    currentPoint = pt;
    currentSubpathStart = pt;
    i++;
  } else if (t === 'l') {
    const x = parseFloat(tokens[i-2]);
    const y = parseFloat(tokens[i-1]);
    const pt = toSvg(x, y);
    currentPathD += `L ${pt.x} ${pt.y} `;
    currentPoint = pt;
    i++;
  } else if (t === 'c') {
    const x1 = parseFloat(tokens[i-6]);
    const y1 = parseFloat(tokens[i-5]);
    const x2 = parseFloat(tokens[i-4]);
    const y2 = parseFloat(tokens[i-3]);
    const x3 = parseFloat(tokens[i-2]);
    const y3 = parseFloat(tokens[i-1]);
    const p1 = toSvg(x1, y1);
    const p2 = toSvg(x2, y2);
    const p3 = toSvg(x3, y3);
    currentPathD += `C ${p1.x} ${p1.y}, ${p2.x} ${p2.y}, ${p3.x} ${p3.y} `;
    currentPoint = p3;
    i++;
  } else if (t === 're') {
    const x = parseFloat(tokens[i-4]);
    const y = parseFloat(tokens[i-3]);
    const w = parseFloat(tokens[i-2]);
    const h = parseFloat(tokens[i-1]);
    const p1 = toSvg(x, y + h);
    const p2 = toSvg(x + w, y);
    const pWidth = Math.abs(p2.x - p1.x);
    const pHeight = Math.abs(p2.y - p1.y);
    currentPathD += `M ${p1.x} ${p1.y} h ${pWidth.toFixed(2)} v ${pHeight.toFixed(2)} h -${pWidth.toFixed(2)} Z `;
    i++;
  } else if (t === 'h') {
    currentPathD += 'Z ';
    if (currentSubpathStart) currentPoint = currentSubpathStart;
    i++;
  } else if (t === 'f' || t === 'f*' || t === 'B' || t === 'B*') {
    if (currentPathD.trim().length > 0) {
      svgPaths.push({ d: currentPathD.trim(), fill: currentFill, rule: (t === 'f*' || t === 'B*') ? 'evenodd' : 'nonzero' });
    }
    currentPathD = '';
    i++;
  } else if (t === 'n' || t === 'W') {
    // End of clipping path / no-op
    currentPathD = '';
    i++;
  } else {
    i++;
  }
}

console.log('Total SVG paths extracted:', svgPaths.length);

// Generate full SVG
const fullSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1920 1080" width="1920" height="1080">
${svgPaths.map(p => `  <path d="${p.d}" fill="${p.fill}" fill-rule="${p.rule}" />`).join('\n')}
</svg>`;

fs.writeFileSync('scratch/ksl_full.svg', fullSvg);
console.log('Saved scratch/ksl_full.svg');
