const sharp = require('sharp');
const path = 'C:\\Users\\Itcomplex\\.gemini\\antigravity-ide\\brain\\91d4b9db-7171-4734-b9fc-8b5a262816f0\\.user_uploaded\\media_1788982154363.jpg';

async function check() {
  const metadata = await sharp(path).metadata();
  console.log('Metadata:', metadata);
}
check();
