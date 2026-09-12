const fs = require('fs');

// Read the official algoligence_site_logo.png
const imgBuf = fs.readFileSync('scratch/algoligence_site_logo.png');
const base64Img = imgBuf.toString('base64');

// The image is 1080x1080.
// We want the mark to be in the upper 70% of the canvas, and "Algoligence" in the bottom 30%.
const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600" width="600" height="600">
  <rect width="600" height="600" rx="32" fill="#000000" />
  <image href="data:image/png;base64,${base64Img}" x="125" y="40" width="350" height="350" />
  <text x="300" y="480" text-anchor="middle" fill="#FFFFFF" font-family="'Google Sans', 'Product Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif" font-size="54" font-weight="700" letter-spacing="2">Algoligence</text>
</svg>`;

fs.writeFileSync('public/partners/algoligence.svg', svg);
console.log('Saved public/partners/algoligence.svg');
