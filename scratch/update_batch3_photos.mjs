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
    src: 'media_1787831751870.jpg',
    targets: ['adeel_asghar.png', 'adeel_asghar.jpg', 'adeel_asghar.jpeg'],
    name: 'Adeel Asghar',
    slug: 'adeel',
    canonicalPath: '/images/team/adeel_asghar.png',
    updateDb: true
  },
  {
    src: 'media_1787831779170.jpg',
    targets: ['jasim.png', 'jasim.jpg', 'jasim.jpeg'],
    name: 'Jasim',
    slug: 'jasim',
    canonicalPath: '/images/team/jasim.png',
    updateDb: false
  },
  {
    src: 'media_1787831779334.jpg',
    targets: ['muhammad_baseer.png', 'muhammad_baseer.jpg', 'muhammad_baseer.jpeg', 'baseer.png', 'baseer.jpg'],
    name: 'Muhammad Baseer',
    slug: 'muhammad-baseer',
    canonicalPath: '/images/team/muhammad_baseer.png',
    updateDb: true
  },
  {
    src: 'media_1787831779495.jpg',
    targets: ['talha_ahmed.png', 'talha_ahmed.jpg', 'talha_ahmed.jpeg', 'talha.png'],
    name: 'Talha Ahmed',
    slug: 'talha-ahmed',
    canonicalPath: '/images/team/talha_ahmed.png',
    updateDb: false
  },
  {
    src: 'media_1787831779783.jpg',
    targets: ['fatima_qureshi.png', 'fatima_qureshi.jpg', 'fatima_qureshi.jpeg'],
    name: 'Fatima Qureshi',
    slug: 'fatima-qureshi',
    canonicalPath: '/images/team/fatima_qureshi.png',
    updateDb: true
  }
];

async function main() {
  console.log('🚀 Copying batch 3 team photos to public/images/team...');

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

    if (item.updateDb) {
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
  }

  console.log('🎉 Batch 3 photos copied and synced successfully!');
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });
