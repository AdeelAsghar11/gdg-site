import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import dotenv from 'dotenv';

dotenv.config();
dotenv.config({ path: '.env.local', override: true });

const pool = new Pool({ connectionString: process.env.DATABASE_URL, ssl: { rejectUnauthorized: false } });
const prisma = new PrismaClient({ adapter: new PrismaPg(pool) });

async function main() {
  console.log('🔄 Syncing member titles in database...');

  const updates = [
    { slug: 'kashif-ayub', tagline: 'Faculty Head' },
    { slug: 'ubaid', tagline: 'Campus Lead' },
    { slug: 'laiba-faiz', tagline: 'Advisor' },
    { slug: 'alisha-fatima', tagline: 'Co-Campus Lead', role: 'core' },
    { slug: 'junaid-mehmood', tagline: 'General Secretary' },
    { slug: 'adeel', tagline: 'Community Manager' },
    { slug: 'm-yousaf', tagline: 'Operational Lead' },
    { slug: 'ismail', tagline: 'Tech Lead' },
    { slug: 'manahil-mirza', tagline: 'Women in Tech Lead' },
    { slug: 'muhammad-alyan', tagline: 'Vibe Coding Lead' },
    { slug: 'sana-shahid', tagline: 'Vibe Coding Co-Lead' },
    { slug: 'maleeha-zulfiqr', tagline: 'Gen AI Lead' },
    { slug: 'abdul-ahad', tagline: 'Gen AI Co-Lead' },
    { slug: 'umme-habiba', tagline: 'Web & App Lead' },
    { slug: 'saad-ali', tagline: 'Web & App Co-Lead' },
    { slug: 'danyal-ahmed', tagline: 'Data Science Lead' },
    { slug: 'akif-naveed', tagline: 'AI & Data Science Co-Lead' },
    { slug: 'fatima-qureshi', tagline: 'Outreach & Social Lead' },
    { slug: 'abdullah-amir', tagline: 'Media Head' },
    { slug: 'muhammad-baseer', tagline: 'Social Media Co-Lead' },
    { slug: 'mohsin-shakeel', tagline: 'Event Management Lead' },
    { slug: 'muhammad-haseeb', tagline: 'Events Co-Lead' },
  ];

  for (const item of updates) {
    try {
      const dataToUpdate = { tagline: item.tagline };
      if (item.role) dataToUpdate.role = item.role;
      await prisma.member.updateMany({
        where: { slug: item.slug },
        data: dataToUpdate
      });
      console.log(`✅ Updated ${item.slug} -> ${item.tagline}`);
    } catch (err) {
      console.warn(`Could not update ${item.slug}:`, err.message);
    }
  }

  console.log('🎉 All roles synced in database!');
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });
