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
    src: 'media_1787831165342.png',
    targets: ['umme_habiba.png', 'Ummer_habiba.png', 'umme_habiba.jpg', 'umme_habiba.jpeg'],
    name: 'Umm e Habiba',
    slug: 'umme-habiba',
    canonicalPath: '/images/team/umme_habiba.png'
  },
  {
    src: 'media_1787831205530.jpg',
    targets: ['manahil_mirza.png', 'minahil_mirza.png', 'manahil_mirza.jpg', 'manahil_mirza.jpeg'],
    name: 'Manahil Mirza',
    slug: 'manahil-mirza',
    canonicalPath: '/images/team/manahil_mirza.png'
  },
  {
    src: 'media_1787831205602.jpg',
    targets: ['maleeha_zulfiqr.png', 'maleeha_zulfiqar.png', 'maleeha_zulfiqr.jpg', 'maleeha_zulfiqr.jpeg'],
    name: 'Maleeha Zulfiqar',
    slug: 'maleeha-zulfiqr',
    canonicalPath: '/images/team/maleeha_zulfiqr.png'
  },
  {
    src: 'media_1787831205716.jpg',
    targets: ['danyal_ahmad.png', 'danyal_ahmed.png', 'danyal_ahmad.jpg', 'danyal_ahmad.jpeg'],
    name: 'Danyal Ahmad',
    slug: 'danyal-ahmed',
    canonicalPath: '/images/team/danyal_ahmad.png'
  },
  {
    src: 'media_1787831205769.jpg',
    targets: ['m_yousaf.png', 'm_yousasf.png', 'm_yousaf.jpg', 'm_yousaf.jpeg'],
    name: 'Muhammad Yousaf',
    slug: 'm-yousaf',
    canonicalPath: '/images/team/m_yousaf.png'
  }
];

async function main() {
  console.log('🚀 Copying batch 2 team photos to public/images/team...');

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

  console.log('🎉 Batch 2 photos copied and synced successfully!');
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });
