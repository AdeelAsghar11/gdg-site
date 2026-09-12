import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import dotenv from 'dotenv';

dotenv.config();
dotenv.config({ path: '.env.local', override: true });

const pool = new Pool({ connectionString: process.env.DATABASE_URL, ssl: { rejectUnauthorized: false } });
const prisma = new PrismaClient({ adapter: new PrismaPg(pool) });

async function main() {
  const events = await prisma.event.findMany({
    select: { id: true, slug: true, title: true, type: true, date: true, imageUrl: true, isPublished: true }
  });
  console.log('Current DB Events:', events.length);
  for (const e of events) {
    console.log(`- [${e.slug}] ${e.title} | img: ${e.imageUrl}`);
  }
}

main().finally(async () => {
  await prisma.$disconnect();
  await pool.end();
});
