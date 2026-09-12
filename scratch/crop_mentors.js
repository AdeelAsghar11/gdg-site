const sharp = require('sharp');
const fs = require('fs');

if (!fs.existsSync('public/images/mentors')) {
  fs.mkdirSync('public/images/mentors', { recursive: true });
}

async function crop() {
  console.log('Mentors have been updated with 16:10 rectangular crops:');
  console.log('1. Dr. Wasif Nisar -> public/images/mentors/dr_wasif_rect_v2.png (2nd photo at podium)');
  console.log('2. Abdul Raheem   -> public/images/mentors/abdul_raheem_rect_v2.png (new photo with city lights)');
  console.log('3. Munsif Raza    -> public/images/mentors/munsif_raza_rect_v2.png (full keynote banner & gesture)');
  console.log('4. Sumama Zaeem   -> public/images/mentors/sumama_zaeem_rect_v2.png (spelling: Sumama Zaeem)');
  console.log('All files are live and referenced in components/Mentors/Mentors.tsx');
}

crop().catch(console.error);
