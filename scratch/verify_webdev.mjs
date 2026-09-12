import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });
dotenv.config();

const pool = new Pool({ connectionString: process.env.DATABASE_URL, ssl: { rejectUnauthorized: false } });
const prisma = new PrismaClient({ adapter: new PrismaPg(pool) });

async function verify() {
  const events = await prisma.event.findMany({
    where: { slug: { in: ['web-development-for-beginners', 'web-development-bootcamp-sp26'] } },
    include: { agendaItems: { orderBy: { order: 'asc' } } }
  });
  for (const ev of events) {
    console.log('\n=== ' + ev.title + ' ===');
    console.log('ImageUrl:', ev.imageUrl);
    console.log('BadgeUrl:', ev.badgeUrl);
    console.log('Agenda:');
    for (const a of ev.agendaItems) {
      console.log(`  - [${a.time}] ${a.title} -> Speaker: ${a.speaker}`);
    }
  }
}

verify()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });
