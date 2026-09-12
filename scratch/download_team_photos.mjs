import fs from 'fs';
import https from 'https';
import path from 'path';

const teamMembers = [
  { name: 'akif_naveed.png', id: '1edC8JOVIwcKPxkw_3eV0-G0fPM6CVB1x' },
  { name: 'abdullah_amir.png', id: '1ER9DVSfe0VBiKOoRayn0E1pdaA6jnlP2' },
  { name: 'manahil_mirza.png', id: '1cUQQqDB4B5cJE1no__BuvXJRxkebU-WV' },
  { name: 'abdul_ahad.png', id: '1omOFgBbGPsSgoS3vArhlss7TOXfzQGkd' },
  { name: 'sana_shahid.png', id: '1_rpMzQTDwoDxsgSbMk0i5bt25fn0x1CV' },
  { name: 'muhammad_alyan.png', id: '1ps41AMtv6eALq79Nq3Rz3LR3oOqa_KHW' },
  { name: 'adeel_asghar.png', id: '1qMG7G2PePFRCITFunxE0BEy8rRIDd3jI' },
  { name: 'm_ismail.png', id: '1fztfRujql0Ed7g61YN4XAfhgecba3qnK' },
  { name: 'maleeha_zulfiqr.png', id: '1yQaV_SrmPI-1oITMjpVxNoOYMYbgSh5n' },
  { name: 'muhammad_haseeb.png', id: '18FktsAy6JtqbSbnn6LWx4Ce1uPhlVkQO' },
  { name: 'junaid_mehmood.png', id: '12zKuAfqzdv9BXWzTrA3A-wLwKQbec3gx' },
  { name: 'mohsin_shakeel.png', id: '1xBF7UvGGnL1YmF1-lkNfY1ZOUvZxU4o4' },
  { name: 'fatima_qureshi.png', id: '1_zHGypfUJfEKbp-RG1TgS959AO2pz95Y' },
  { name: 'm_yousaf.png', id: '1oJxgHJEKXHFu863kLdbuIywARW2Yn073' },
  { name: 'danyal_ahmad.png', id: '1JUzTswFc8BsFc3GnK_Wp0cEMZqtniUap' },
  { name: 'muhammad_baseer.png', id: '1XC70dmJpe2GlWHbyF3k9JxyoPfyY4339' },
  { name: 'umme_habiba.png', id: '1Le0O542gYuXAa-_mSz7EYwWtN4O1dm2P' },
  { name: 'laiba_faiz.png', id: '1nYNnm9FypeOic2hPtRYngwdD8y3XEq1a' },
];

async function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        // Follow redirect
        return downloadFile(res.headers.location, dest).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) {
        return reject(new Error(`Failed to download ${url}: status ${res.statusCode}`));
      }
      const fileStream = fs.createWriteStream(dest);
      res.pipe(fileStream);
      fileStream.on('finish', () => {
        fileStream.close();
        resolve(dest);
      });
    }).on('error', reject);
  });
}

async function main() {
  const dir = path.join(process.cwd(), 'public', 'images', 'team');
  for (const m of teamMembers) {
    const filePath = path.join(dir, m.name);
    // Use the reliable direct Google Drive thumbnail endpoint
    const url = `https://lh3.googleusercontent.com/d/${m.id}=s800`;
    try {
      console.log(`Downloading ${m.name}...`);
      await downloadFile(url, filePath);
      console.log(`✓ Saved ${m.name}`);
    } catch (err) {
      console.warn(`Could not download ${m.name} via lh3:`, err.message);
    }
  }
}

main().catch(console.error);
