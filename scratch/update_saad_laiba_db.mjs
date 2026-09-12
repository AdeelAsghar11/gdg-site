import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import dotenv from 'dotenv';

dotenv.config();
dotenv.config({ path: '.env.local', override: true });

const pool = new Pool({ connectionString: process.env.DATABASE_URL, ssl: { rejectUnauthorized: false } });
const prisma = new PrismaClient({ adapter: new PrismaPg(pool) });

async function update() {
  await prisma.member.update({
    where: { slug: 'saad-ali' },
    data: {
      department: 'Advisor',
      tagline: 'Advisor',
    },
  });

  await prisma.member.update({
    where: { slug: 'laiba-faiz' },
    data: {
      department: 'Executive Advisor',
      tagline: 'Executive Advisor',
    },
  });

  const updated = await prisma.member.findMany({
    where: { slug: { in: ['saad-ali', 'laiba-faiz'] } },
    select: { name: true, slug: true, department: true, tagline: true }
  });
  console.log('Successfully updated in DB:', updated);
}

update().catch(console.error).finally(async () => {
  await prisma.$disconnect();
  await pool.end();
});
