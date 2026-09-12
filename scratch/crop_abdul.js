const sharp = require('sharp');
const path = 'C:\\Users\\Itcomplex\\.gemini\\antigravity-ide\\brain\\91d4b9db-7171-4734-b9fc-8b5a262816f0\\.user_uploaded\\media_1788982154363.jpg';

async function cropAndSave() {
  // Original is 1024 width, 953 height.
  // Head is around top 10% to 50%, shoulders to 90%.
  // A square of size 920x920 centered horizontally at left: (1024-920)/2 = 52, top: 20
  await sharp(path)
    .extract({ left: 52, top: 15, width: 920, height: 920 })
    .resize(600, 600)
    .png({ quality: 95 })
    .toFile('public/images/team/abdul_ahad.png');

  await sharp(path)
    .extract({ left: 52, top: 15, width: 920, height: 920 })
    .resize(600, 600)
    .jpeg({ quality: 95 })
    .toFile('public/images/team/abdul_ahad.jpg');

  await sharp(path)
    .extract({ left: 52, top: 15, width: 920, height: 920 })
    .resize(600, 600)
    .jpeg({ quality: 95 })
    .toFile('public/images/team/abdul_ahad.jpeg');

  console.log('Saved abdul_ahad images successfully');
}

cropAndSave().catch(console.error);
