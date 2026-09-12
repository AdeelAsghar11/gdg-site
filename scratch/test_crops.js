const sharp = require('sharp');

async function testCrops() {
  // Munsif: original is 1024x608
  // In the photo, Munsif's head is on the right of the podium, let's crop [450, 50, 300, 300] and [500, 150, 300, 300]
  await sharp('public/images/chapter_photos/munsif_raza.png')
    .extract({ left: 500, top: 160, width: 280, height: 280 })
    .resize(400, 400)
    .toFile('public/images/mentors/munsif_test1.png');

  // Adil: original is 1024x548
  // Adil is standing behind the podium. Let's try [450, 140, 200, 200]
  await sharp('public/images/chapter_photos/muhammad_adil.png')
    .extract({ left: 450, top: 140, width: 220, height: 220 })
    .resize(400, 400)
    .toFile('public/images/mentors/adil_test1.png');

  // Also in mtm_shield_presentation.png (1024x576):
  // Adil is the 3rd person (in beige shirt) holding the shield!
  // Person 3 head: left: 380, top: 180, width: 180, height: 180
  await sharp('public/images/chapter_photos/mtm_shield_presentation.png')
    .extract({ left: 380, top: 180, width: 180, height: 180 })
    .resize(400, 400)
    .toFile('public/images/mentors/adil_test2.png');
}

testCrops().catch(console.error);
