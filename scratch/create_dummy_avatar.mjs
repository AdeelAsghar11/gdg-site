import fs from 'fs';
import path from 'path';

// A minimal valid 1x1 PNG or standard avatar PNG
// Let's create a clean 400x400 PNG dummy avatar using pure JS PNG encoder or SVG/DataURL
// Even simpler: create a clean PNG buffer
// We can use a clean pre-built placeholder PNG base64 or build an uncompressed PNG

function createPlaceholderPng(width, height) {
  // We can write a clean minimal PNG with zlib deflate
  import('zlib').then(zlib => {
    // PNG Header
    const signature = Buffer.from([0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A]);
    
    // IHDR
    const ihdrData = Buffer.alloc(13);
    ihdrData.writeUInt32BE(width, 0);
    ihdrData.writeUInt32BE(height, 4);
    ihdrData.writeUInt8(8, 8); // 8-bit depth
    ihdrData.writeUInt8(6, 9); // RGBA
    ihdrData.writeUInt8(0, 10); // Deflate
    ihdrData.writeUInt8(0, 11); // Filter
    ihdrData.writeUInt8(0, 12); // No interlace
    
    function createChunk(type, data) {
      const len = Buffer.alloc(4);
      len.writeUInt32BE(data.length, 0);
      const typeBuf = Buffer.from(type);
      const crcBuf = Buffer.alloc(4);
      
      // Calculate CRC32
      const combined = Buffer.concat([typeBuf, data]);
      let crc = 0xFFFFFFFF;
      for (let i = 0; i < combined.length; i++) {
        crc = crcTable[(crc ^ combined[i]) & 0xFF] ^ (crc >>> 8);
      }
      crc = (crc ^ 0xFFFFFFFF) >>> 0;
      crcBuf.writeUInt32BE(crc, 0);
      return Buffer.concat([len, typeBuf, data, crcBuf]);
    }

    const crcTable = [];
    for (let n = 0; n < 256; n++) {
      let c = n;
      for (let k = 0; k < 8; k++) {
        c = (c & 1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1);
      }
      crcTable[n] = c >>> 0;
    }

    // Build raw image scanlines (Google Blue background with circular mask / avatar)
    const scanlines = [];
    const cx = width / 2;
    const cy = height / 2;
    const radius = width * 0.45;
    const headRadius = width * 0.18;
    const headCy = height * 0.38;
    const bodyRadius = width * 0.32;
    const bodyCy = height * 0.82;

    for (let y = 0; y < height; y++) {
      scanlines.push(0); // filter byte: none
      for (let x = 0; x < width; x++) {
        const dx = x - cx;
        const dy = y - cy;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        // Background circle (Google Blue #4285F4: 66, 133, 244)
        if (dist <= radius) {
          // Check head
          const hdx = x - cx;
          const hdy = y - headCy;
          const hdist = Math.sqrt(hdx * hdx + hdy * hdy);

          // Check shoulders/body
          const bdx = x - cx;
          const bdy = y - bodyCy;
          const bdist = Math.sqrt(bdx * bdx + bdy * bdy);

          if (hdist <= headRadius || (bdist <= bodyRadius && y >= headCy + headRadius * 0.7)) {
            // Silhouette (White #FFFFFF)
            scanlines.push(255, 255, 255, 255);
          } else {
            // Blue circle #4285F4
            scanlines.push(66, 133, 244, 255);
          }
        } else {
          // Transparent or soft gray
          scanlines.push(241, 243, 244, 255);
        }
      }
    }

    const compressed = zlib.deflateSync(Buffer.from(scanlines));
    const ihdrChunk = createChunk('IHDR', ihdrData);
    const idatChunk = createChunk('IDAT', compressed);
    const iendChunk = createChunk('IEND', Buffer.alloc(0));

    const png = Buffer.concat([signature, ihdrChunk, idatChunk, iendChunk]);
    
    fs.writeFileSync('public/images/team/zohaib_arif.png', png);
    fs.writeFileSync('public/images/team/zohaib_arif.jpg', png);
    fs.writeFileSync('public/images/team/zohaib_arif.jpeg', png);
    console.log('✅ Generated dummy avatar for Zohaib Arif (zohaib_arif.png)');
  });
}

createPlaceholderPng(400, 400);
