const fs = require('fs');
const https = require('https');

https.get('https://cheezious.com/cheezious.svg', (res) => {
  let data = '';
  res.on('data', (chunk) => data += chunk);
  res.on('end', () => {
    fs.writeFileSync('public/partners/cheezious.svg', data);
    console.log('Successfully saved cheezious.svg!');
  });
});
