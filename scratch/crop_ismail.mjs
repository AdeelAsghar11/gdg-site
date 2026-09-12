import sharp from 'sharp';

async function cropBorder() {
  // Crop ismail at podium perfectly borderless
  await sharp('scratch/extracted_img_32_from_media_1788550761427.pdf.jpg')
    .extract({ left: 38, top: 28, width: 614, height: 348 })
    .toFile('public/images/chapter_photos/ismail_github_session.jpg');

  // Crop hall view perfectly borderless
  await sharp('scratch/extracted_img_33_from_media_1788550761427.pdf.jpg')
    .extract({ left: 38, top: 28, width: 614, height: 348 })
    .toFile('public/images/chapter_photos/ismail_github_hall.jpg');

  console.log('Cropped photos successfully');
}

cropBorder().catch(console.error);
