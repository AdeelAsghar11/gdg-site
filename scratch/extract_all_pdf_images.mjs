import fs from 'fs';
import path from 'path';

const uploadDir = 'C:\\Users\\Itcomplex\\.gemini\\antigravity-ide\\brain\\7be4c77c-2c52-4cb4-939d-5c6f95f28fd8\\.user_uploaded';
const files = fs.readdirSync(uploadDir).filter(f => f.endsWith('.pdf'));

const jpgStart = Buffer.from([0xFF, 0xD8, 0xFF]);
const jpgEnd = Buffer.from([0xFF, 0xD9]);

let count = 0;
for (const f of files) {
  const fullPath = path.join(uploadDir, f);
  const buf = fs.readFileSync(fullPath);
  console.log(`Analyzing ${f} (${buf.length} bytes)...`);

  let pos = 0;
  while ((pos = buf.indexOf(jpgStart, pos)) !== -1) {
    let end = buf.indexOf(jpgEnd, pos + 3);
    if (end !== -1) {
      const jpgData = buf.subarray(pos, end + 2);
      if (jpgData.length > 5000) { // filter out thumbnails
        count++;
        const outName = `scratch/extracted_img_${count}_from_${f}.jpg`;
        fs.writeFileSync(outName, jpgData);
        console.log(`  Saved ${outName} (${jpgData.length} bytes)`);
      }
      pos = end + 2;
    } else {
      pos += 3;
    }
  }
}
console.log(`Done! Extracted ${count} images.`);
