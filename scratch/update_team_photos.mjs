import fs from 'fs';
import path from 'path';
import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import dotenv from 'dotenv';

dotenv.config();
dotenv.config({ path: '.env.local', override: true });

const connectionString = `${process.env.DATABASE_URL}`;
const pool = new Pool({
  connectionString,
  ssl: { rejectUnauthorized: false }
});

const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

const uploadedDir = 'C:\\Users\\Itcomplex\\.gemini\\antigravity-ide\\brain\\3a65c2be-7de2-4fa7-a4c6-eb53447c9af6\\.user_uploaded';
const teamDir = path.join(process.cwd(), 'public', 'images', 'team');

const photoMappings = [
  {
    src: 'media_1787829894107.jpg',
    targets: ['akif_naveed.png', 'akif_naveed.jpg', 'akif_naveed.jpeg'],
    name: 'Muhammad Akif Naveed',
    slug: 'akif-naveed',
    canonicalPath: '/images/team/akif_naveed.png'
  },
  {
    src: 'media_1787829894354.jpg',
    targets: ['junaid_mehmood.png', 'junaid_mehmood.jpg', 'junaid_mehmood.jpeg'],
    name: 'Junaid Mehmood',
    slug: 'junaid-mehmood',
    canonicalPath: '/images/team/junaid_mehmood.png'
  },
  {
    src: 'media_1787829894588.jpg',
    targets: ['sana_shahid.png', 'sana_shahid.jpg', 'sana_shahid.jpeg'],
    name: 'Sana Shahid',
    slug: 'sana-shahid',
    canonicalPath: '/images/team/sana_shahid.png'
  },
  {
    src: 'media_1787829894952.png',
    targets: ['laiba_faiz.png', 'laiba_faiz.jpg', 'laiba_faiz.jpeg'],
    name: 'Laiba Faiz',
    slug: 'laiba-faiz',
    canonicalPath: '/images/team/laiba_faiz.png'
  },
  {
    src: 'media_1787829895158.png',
    targets: ['m_ismail.png', 'm_ismail.jpeg', 'm_ismail.jpg'],
    name: 'Muhammad Ismail',
    slug: 'ismail',
    canonicalPath: '/images/team/m_ismail.png'
  }
];

async function main() {
  console.log('🚀 Copying team photos to public/images/team...');

  for (const item of photoMappings) {
    const srcPath = path.join(uploadedDir, item.src);
    if (!fs.existsSync(srcPath)) {
      console.error(`❌ Source image ${item.src} not found!`);
      continue;
    }

    const data = fs.readFileSync(srcPath);

    for (const target of item.targets) {
      const destPath = path.join(teamDir, target);
      fs.writeFileSync(destPath, data);
      console.log(`✅ Saved ${target} (${data.length} bytes)`);
    }

    // Update database member record
    try {
      const member = await prisma.member.findFirst({
        where: {
          OR: [
            { slug: item.slug },
            { name: item.name }
          ]
        }
      });

      if (member) {
        await prisma.member.update({
          where: { id: member.id },
          data: { imageUrl: item.canonicalPath }
        });
        console.log(`👤 Updated DB record for ${item.name} -> ${item.canonicalPath}`);
      } else {
        console.log(`⚠️ Member ${item.name} not found in DB`);
      }
    } catch (dbErr) {
      console.warn(`Could not update DB for ${item.name}:`, dbErr.message);
    }
  }

  console.log('🎉 All photos copied and synced successfully!');
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });
