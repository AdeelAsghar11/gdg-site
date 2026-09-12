import sharp from 'sharp';
import fs from 'fs';

async function check() {
  for (let i = 26; i <= 43; i++) {
    const p = `scratch/extracted_img_${i}_from_media_1788550761427.pdf.jpg`;
    if (fs.existsSync(p)) {
      const meta = await sharp(p).metadata();
      console.log(`Image ${i}: ${meta.width}x${meta.height}, size: ${fs.statSync(p).size}`);
    }
  }
}

check().catch(console.error);
