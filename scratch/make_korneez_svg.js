const fs = require('fs');

const buf = fs.readFileSync('public/partners/korneez_raw.jpg');
const b64 = buf.toString('base64');

// The original image is 878 x 500.
// By setting viewBox to '90 40 700 420' with rx on rect, the yellow text is bigger and fills the card beautifully!
const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="90 40 700 420" width="100%" height="100%">
  <defs>
    <clipPath id="rounded">
      <rect x="90" y="40" width="700" height="420" rx="40" />
    </clipPath>
  </defs>
  <g clip-path="url(#rounded)">
    <image href="data:image/jpeg;base64,${b64}" x="0" y="0" width="878" height="500" />
  </g>
</svg>`;

fs.writeFileSync('public/partners/korneez.svg', svg);
console.log('Saved public/partners/korneez.svg');
