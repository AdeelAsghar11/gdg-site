const fs = require('fs');

// We can read raw pixels by converting to uncompressed or checking with a small script
console.log('Korneez raw image exists:', fs.existsSync('public/partners/korneez_raw.jpg'));
fs.copyFileSync('public/partners/korneez_raw.jpg', 'public/partners/korneez.jpg');
fs.copyFileSync('public/partners/korneez_raw.jpg', 'public/partners/korneez.png');
console.log('Copied to public/partners/korneez.jpg and public/partners/korneez.png');
