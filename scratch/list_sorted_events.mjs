import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });
dotenv.config();

const pool = new Pool({ connectionString: process.env.DATABASE_URL, ssl: { rejectUnauthorized: false } });
const prisma = new PrismaClient({ adapter: new PrismaPg(pool) });

async function listAll() {
  const events = await prisma.event.findMany({
    where: { isPublished: true },
    orderBy: { date: 'desc' },
    select: { slug: true, title: true, type: true, date: true, location: true }
  });
  console.log('Total Published Events:', events.length);
  for (const e of events) {
    console.log(`${e.date.toISOString().split('T')[0]} | [${e.slug}] ${e.title}`);
  }
}

listAll()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });
