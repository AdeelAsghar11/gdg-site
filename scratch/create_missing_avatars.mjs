import fs from 'fs';
import zlib from 'zlib';

function createAvatar(filename, primaryR, primaryG, primaryB) {
  const width = 400;
  const height = 400;
  const signature = Buffer.from([0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A]);
  
  const ihdrData = Buffer.alloc(13);
  ihdrData.writeUInt32BE(width, 0);
  ihdrData.writeUInt32BE(height, 4);
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

  const scanlines = [];
  const cx = width / 2;
  const cy = height / 2;
  const radius = width * 0.45;
  const headRadius = width * 0.18;
  const headCy = height * 0.38;
  const bodyRadius = width * 0.32;
  const bodyCy = height * 0.82;

  for (let y = 0; y < height; y++) {
    scanlines.push(0);
    for (let x = 0; x < width; x++) {
      const dx = x - cx;
      const dy = y - cy;
      const dist = Math.sqrt(dx * dx + dy * dy);
      
      if (dist <= radius) {
        const hdx = x - cx;
        const hdy = y - headCy;
        const hdist = Math.sqrt(hdx * hdx + hdy * hdy);

        const bdx = x - cx;
        const bdy = y - bodyCy;
        const bdist = Math.sqrt(bdx * bdx + bdy * bdy);

        if (hdist <= headRadius || (bdist <= bodyRadius && y >= headCy + headRadius * 0.7)) {
          scanlines.push(255, 255, 255, 255);
        } else {
          scanlines.push(primaryR, primaryG, primaryB, 255);
        }
      } else {
        scanlines.push(241, 243, 244, 255);
      }
    }
  }

  const compressed = zlib.deflateSync(Buffer.from(scanlines));
  const ihdrChunk = createChunk('IHDR', ihdrData);
  const idatChunk = createChunk('IDAT', compressed);
  const iendChunk = createChunk('IEND', Buffer.alloc(0));

  const png = Buffer.concat([signature, ihdrChunk, idatChunk, iendChunk]);
  
  const base = filename.replace(/\.[^/.]+$/, "");
  fs.writeFileSync(`public/images/team/${base}.png`, png);
  fs.writeFileSync(`public/images/team/${base}.jpg`, png);
  fs.writeFileSync(`public/images/team/${base}.jpeg`, png);
  console.log(`✅ Created clean avatar for ${base}`);
}

// Abdul Ahad Khan -> Google Red (234, 67, 53)
createAvatar('abdul_ahad.png', 234, 67, 53);

// Mohsin Shakeel -> Google Green (52, 168, 83)
createAvatar('mohsin_shakeel.png', 52, 168, 83);
