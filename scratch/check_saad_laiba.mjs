import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import dotenv from 'dotenv';

dotenv.config();
dotenv.config({ path: '.env.local', override: true });

const pool = new Pool({ connectionString: process.env.DATABASE_URL, ssl: { rejectUnauthorized: false } });
const prisma = new PrismaClient({ adapter: new PrismaPg(pool) });

async function check() {
  const members = await prisma.member.findMany({
    where: {
      slug: { in: ['saad-ali', 'laiba-faiz'] }
    }
  });
  console.log('Members in DB:', members.map(m => ({ slug: m.slug, name: m.name, role: m.role, department: m.department, tagline: m.tagline })));
}

check().catch(console.error).finally(async () => {
  await prisma.$disconnect();
  await pool.end();
});
