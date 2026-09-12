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
    src: 'media_1787832892305.jpg',
    targets: ['umme_habiba.png', 'Ummer_habiba.png', 'umme_habiba.jpg', 'umme_habiba.jpeg'],
    name: 'Umm e Habiba',
    slug: 'umme-habiba',
    canonicalPath: '/images/team/umme_habiba.png'
  },
  {
    src: 'media_1787832918467.jpg',
    targets: ['muhammad_alyan.png', 'muhammad_alyan.jpg', 'muhammad_alyan.jpeg', 'alyan.png'],
    name: 'Muhammad Alyan',
    slug: 'muhammad-alyan',
    canonicalPath: '/images/team/muhammad_alyan.png'
  },
  {
    src: 'media_1787832918518.jpg',
    targets: ['muhammad_haseeb.png', 'muhammad_haseeb.jpg', 'muhammad_haseeb.jpeg', 'haseeb.png'],
    name: 'Muhammad Haseeb',
    slug: 'muhammad-haseeb',
    canonicalPath: '/images/team/muhammad_haseeb.png'
  },
  {
    src: 'media_1787832950880.jpg',
    targets: ['abdullah_amir.png', 'abdullah_amir.jpeg', 'abdullah_amir.jpg', 'muhammad_abdullah.png'],
    name: 'Muhammad Abdullah',
    slug: 'abdullah-amir',
    canonicalPath: '/images/team/abdullah_amir.png'
  },
  {
    src: 'media_1787833019565.jpg',
    targets: ['ubaid.png', 'ubaid.jpg', 'ubaid.jpeg', 'ubaid_ghazi.png'],
    name: 'Ubaid Ghazi',
    slug: 'ubaid',
    canonicalPath: '/images/team/ubaid.png'
  }
];

async function main() {
  console.log('🚀 Copying batch 4 team photos to public/images/team...');

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

  console.log('🎉 Batch 4 photos copied and synced successfully!');
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });
