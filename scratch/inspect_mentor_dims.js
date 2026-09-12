const sharp = require('sharp');

async function getInfo(file) {
  const meta = await sharp(file).metadata();
  console.log(file, meta.width, 'x', meta.height);
}

async function main() {
  await getInfo('public/images/gallery/hackdata_shield_dr_wasif.png');
  await getInfo('public/images/chapter_photos/mtm_shield_presentation.png');
  await getInfo('public/images/chapter/keynote-speaker.png');
  await getInfo('public/images/chapter/workshop-speaker.png');
  await getInfo('public/images/chapter_photos/munsif_raza.png');
  await getInfo('public/images/chapter_photos/muhammad_adil.png');
  await getInfo('public/images/chapter_photos/sumama_zaeem.png');
}

main();
