const sharp = require('sharp');

async function testWasif() {
  // Option A from hackdata_shield_dr_wasif.png
  await sharp('public/images/gallery/hackdata_shield_dr_wasif.png')
    .extract({ left: 660, top: 170, width: 364, height: 364 })
    .resize(400, 400)
    .toFile('public/images/mentors/wasif_opt_a.png');

  // Option B from mtm_shield_presentation.png
  await sharp('public/images/chapter_photos/mtm_shield_presentation.png')
    .extract({ left: 620, top: 230, width: 180, height: 180 })
    .resize(400, 400)
    .toFile('public/images/mentors/wasif_opt_b.png');
}

testWasif().catch(console.error);
