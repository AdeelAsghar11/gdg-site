const fs = require('fs');

// The original image is 1080x1080.
// The mark is located at x: 391..688 (width 297), y: 396..683 (height 287).
// If we embed the image with a clip or offset:
// We want the mark to appear at x: 89, y: 14, with width: 62, height: 60.
// Scale factor = 60 / 287 = 0.209
// Full image width at this scale = 1080 * 0.209 = 225.8
// Image x offset = 89 - (391 * 0.209) = 89 - 81.7 = 7.3
// Image y offset = 14 - (396 * 0.209) = 14 - 82.8 = -68.8

const imgBuf = fs.readFileSync('scratch/algoligence_site_logo.png');
const base64Img = imgBuf.toString('base64');

const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 130" width="100%" height="100%">
  <defs>
    <clipPath id="algo-card-clip">
      <rect width="240" height="130" rx="16" />
    </clipPath>
    <clipPath id="algo-mark-clip">
      <rect x="85" y="12" width="70" height="65" />
    </clipPath>
  </defs>
  <g clip-path="url(#algo-card-clip)">
    <rect width="240" height="130" fill="#000000" />
    <g clip-path="url(#algo-mark-clip)">
      <image href="data:image/png;base64,${base64Img}" x="7.3" y="-68.8" width="225.8" height="225.8" />
    </g>
    <text x="120" y="106" text-anchor="middle" fill="#FFFFFF" font-family="'Google Sans', 'Product Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="21" font-weight="700" letter-spacing="1.2">Algoligence</text>
  </g>
</svg>`;

fs.writeFileSync('public/partners/algoligence.svg', svg);
console.log('Saved updated public/partners/algoligence.svg');
