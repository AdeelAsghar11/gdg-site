const fs = require('fs');

const pdfPath = 'C:\\Users\\Itcomplex\\.gemini\\antigravity\\brain\\d6e3efc5-17a9-4d0a-afcc-75ae1445bf74\\.user_uploaded\\media_1787169348297.pdf';
const pdfBuffer = fs.readFileSync(pdfPath);

const pngStart = Buffer.from([0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A]);
const jpgStart = Buffer.from([0xFF, 0xD8, 0xFF]);

let pngIdx = pdfBuffer.indexOf(pngStart);
if (pngIdx !== -1) {
  let pngEnd = pdfBuffer.indexOf(Buffer.from([0x49, 0x45, 0x4E, 0x44, 0xAE, 0x42, 0x60, 0x82]), pngIdx);
  let pngData = pngEnd !== -1 ? pdfBuffer.slice(pngIdx, pngEnd + 8) : pdfBuffer.slice(pngIdx);
  fs.writeFileSync('public/partners/cheezious.png', pngData);
  console.log('Successfully extracted PNG image to public/partners/cheezious.png!');
} else {
  let jpgIdx = pdfBuffer.indexOf(jpgStart);
  if (jpgIdx !== -1) {
    let jpgEnd = pdfBuffer.indexOf(Buffer.from([0xFF, 0xD9]), jpgIdx);
    let jpgData = jpgEnd !== -1 ? pdfBuffer.slice(jpgIdx, jpgEnd + 2) : pdfBuffer.slice(jpgIdx);
    fs.writeFileSync('public/partners/cheezious.png', jpgData);
    console.log('Successfully extracted JPG image to public/partners/cheezious.png!');
  } else {
    console.log('No uncompressed PNG or JPG stream found, extracting raw streams...');
    const zlib = require('zlib');
    let streams = pdfBuffer.toString('binary').split('stream\r\n');
    let found = false;
    for (let i = 1; i < streams.length; i++) {
      let endIdx = streams[i].indexOf('\r\nendstream');
      if (endIdx === -1) endIdx = streams[i].indexOf('endstream');
      if (endIdx !== -1) {
        let streamStr = streams[i].substring(0, endIdx);
        let streamBuf = Buffer.from(streamStr, 'binary');
        try {
          let decompressed = zlib.inflateSync(streamBuf);
          if (decompressed.indexOf(pngStart) !== -1) {
            let idx = decompressed.indexOf(pngStart);
            fs.writeFileSync('public/partners/cheezious.png', decompressed.slice(idx));
            console.log('Decompressed PNG saved!');
            found = true;
            break;
          }
        } catch (e) {}
      }
    }
    if (!found) {
      console.log('Could not decompress stream directly');
    }
  }
}
