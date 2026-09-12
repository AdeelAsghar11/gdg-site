const fs = require('fs');
const zlib = require('zlib');

const buf = fs.readFileSync('C:/Users/Itcomplex/Desktop/KSL-Logos.ai');
let pos = 0;
let streamCount = 0;
while (true) {
  let streamStart = buf.indexOf('stream', pos);
  if (streamStart === -1) break;
  let dataStart = streamStart + 6;
  if (buf[dataStart] === 0x0d && buf[dataStart+1] === 0x0a) dataStart += 2;
  else if (buf[dataStart] === 0x0a) dataStart += 1;
  else if (buf[dataStart] === 0x0d) dataStart += 1;

  let streamEnd = buf.indexOf('endstream', dataStart);
  if (streamEnd === -1) break;

  let streamData = buf.subarray(dataStart, streamEnd);
  streamCount++;

  try {
    let unzipped = zlib.inflateSync(streamData);
    fs.writeFileSync(`scratch/stream_${streamCount}.txt`, unzipped);
    console.log(`Saved scratch/stream_${streamCount}.txt (${unzipped.length} bytes)`);
  } catch (e) {
    try {
      let raw = zlib.inflateRawSync(streamData);
      fs.writeFileSync(`scratch/stream_${streamCount}.txt`, raw);
      console.log(`Saved raw scratch/stream_${streamCount}.txt (${raw.length} bytes)`);
    } catch(err) {}
  }

  pos = streamEnd + 9;
}
