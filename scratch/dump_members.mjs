import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import dotenv from 'dotenv';

dotenv.config();
dotenv.config({ path: '.env.local', override: true });

const pool = new Pool({ connectionString: process.env.DATABASE_URL, ssl: { rejectUnauthorized: false } });
const prisma = new PrismaClient({ adapter: new PrismaPg(pool) });

async function main() {
  const members = await prisma.member.findMany({
    select: { id: true, name: true, slug: true, role: true, tagline: true, department: true, imageUrl: true }
  });
  console.log('--- ALL MEMBERS IN DB ---');
  members.forEach(m => console.log(`${m.slug.padEnd(16)} | ${m.name.padEnd(20)} | ${String(m.department).padEnd(20)} | ${String(m.tagline).padEnd(25)}`));
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });
