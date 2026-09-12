import fs from 'fs';
import path from 'path';
import zlib from 'zlib';

const srcPath = 'C:\\Users\\Itcomplex\\.gemini\\antigravity-ide\\brain\\3a65c2be-7de2-4fa7-a4c6-eb53447c9af6\\.user_uploaded\\media_1787836735674.png';
const buf = fs.readFileSync(srcPath);

const srcWidth = buf.readUInt32BE(16);
const srcHeight = buf.readUInt32BE(20);
console.log('Source:', srcWidth, 'x', srcHeight);

// Find IDAT chunks and decompress
const idatChunks = [];
let offset = 8;
while (offset < buf.length) {
  const len = buf.readUInt32BE(offset);
  const type = buf.slice(offset + 4, offset + 8).toString('ascii');
  if (type === 'IDAT') {
    idatChunks.push(buf.slice(offset + 8, offset + 8 + len));
  }
  offset += 12 + len;
}

const compressed = Buffer.concat(idatChunks);
const raw = zlib.inflateSync(compressed);

// Unfilter scanlines (RGBA = 4 bytes/pixel)
const bpp = 4;
const srcStride = 1 + srcWidth * bpp;
const uncompressedPixels = Buffer.alloc(srcWidth * srcHeight * bpp);

function paeth(a, b, c) {
  const p = a + b - c;
  const pa = Math.abs(p - a);
  const pb = Math.abs(p - b);
  const pc = Math.abs(p - c);
  if (pa <= pb && pa <= pc) return a;
  if (pb <= pc) return b;
  return c;
}

for (let y = 0; y < srcHeight; y++) {
  const filterType = raw[y * srcStride];
  const rowStart = y * srcStride + 1;
  const prevRowOutStart = (y - 1) * srcWidth * bpp;
  const outRowStart = y * srcWidth * bpp;

  for (let x = 0; x < srcWidth * bpp; x++) {
    const rawVal = raw[rowStart + x];
    let filtered = rawVal;
    const a = x >= bpp ? uncompressedPixels[outRowStart + x - bpp] : 0;
    const b = y > 0 ? uncompressedPixels[prevRowOutStart + x] : 0;
    const c = (y > 0 && x >= bpp) ? uncompressedPixels[prevRowOutStart + x - bpp] : 0;

    if (filterType === 0) filtered = rawVal;
    else if (filterType === 1) filtered = (rawVal + a) & 0xFF;
    else if (filterType === 2) filtered = (rawVal + b) & 0xFF;
    else if (filterType === 3) filtered = (rawVal + Math.floor((a + b) / 2)) & 0xFF;
    else if (filterType === 4) filtered = (rawVal + paeth(a, b, c)) & 0xFF;

    uncompressedPixels[outRowStart + x] = filtered;
  }
}

// Crop rectangle focusing on Zohaib's face and upper chest (zoom in on the right side)
// Looking at dimensions 464 x 568:
// Zohaib's head center is roughly x = 265, y = 180.
// Let's do a square crop of size 340x340 starting at cropX = 110, cropY = 60
const cropSize = 340;
const cropX = Math.min(srcWidth - cropSize, 115);
const cropY = 55;

console.log(`Cropping ${cropSize}x${cropSize} from (${cropX}, ${cropY})`);

const croppedScanlines = [];
for (let cy = 0; cy < cropSize; cy++) {
  croppedScanlines.push(0); // filter type none
  const srcY = cropY + cy;
  for (let cx = 0; cx < cropSize; cx++) {
    const srcX = cropX + cx;
    const srcIdx = (srcY * srcWidth + srcX) * bpp;
    croppedScanlines.push(
      uncompressedPixels[srcIdx],
      uncompressedPixels[srcIdx + 1],
      uncompressedPixels[srcIdx + 2],
      uncompressedPixels[srcIdx + 3]
    );
  }
}

const croppedCompressed = zlib.deflateSync(Buffer.from(croppedScanlines));

// Build PNG
const signature = Buffer.from([0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A]);
const ihdrData = Buffer.alloc(13);
ihdrData.writeUInt32BE(cropSize, 0);
ihdrData.writeUInt32BE(cropSize, 4);
ihdrData.writeUInt8(8, 8);
ihdrData.writeUInt8(6, 9); // RGBA
ihdrData.writeUInt8(0, 10);
ihdrData.writeUInt8(0, 11);
ihdrData.writeUInt8(0, 12);

const crcTable = [];
for (let n = 0; n < 256; n++) {
  let c = n;
  for (let k = 0; k < 8; k++) {
    c = (c & 1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1);
  }
  crcTable[n] = c >>> 0;
}

function createChunk(type, data) {
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length, 0);
  const typeBuf = Buffer.from(type);
  const crcBuf = Buffer.alloc(4);
  const combined = Buffer.concat([typeBuf, data]);
  let crc = 0xFFFFFFFF;
  for (let i = 0; i < combined.length; i++) {
    crc = crcTable[(crc ^ combined[i]) & 0xFF] ^ (crc >>> 8);
  }
  crc = (crc ^ 0xFFFFFFFF) >>> 0;
  crcBuf.writeUInt32BE(crc, 0);
  return Buffer.concat([len, typeBuf, data, crcBuf]);
}

const ihdrChunk = createChunk('IHDR', ihdrData);
const idatChunk = createChunk('IDAT', croppedCompressed);
const iendChunk = createChunk('IEND', Buffer.alloc(0));

const finalPng = Buffer.concat([signature, ihdrChunk, idatChunk, iendChunk]);

const destFiles = [
  'public/images/team/zohaib_arif.png',
  'public/images/team/zohaib_arif.jpg',
  'public/images/team/zohaib_arif.jpeg',
];

destFiles.forEach(dest => {
  fs.writeFileSync(dest, finalPng);
  console.log(`✅ Saved ${dest} (${finalPng.length} bytes)`);
});
