import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import dotenv from 'dotenv';

dotenv.config();
dotenv.config({ path: '.env.local', override: true });

const pool = new Pool({ connectionString: process.env.DATABASE_URL, ssl: { rejectUnauthorized: false } });
const prisma = new PrismaClient({ adapter: new PrismaPg(pool) });

async function main() {
  const clubs = await prisma.club.findMany();
  console.log('Current clubs in DB:', clubs.map(c => ({ id: c.id, name: c.name, type: c.type })));

  // Rename UI/UX & Graphics to Creative
  const res = await prisma.club.updateMany({
    where: {
      OR: [
        { name: { contains: 'UI/UX', mode: 'insensitive' } },
        { name: { contains: 'Graphics', mode: 'insensitive' } }
      ]
    },
    data: {
      name: 'Creative',
      description: 'Defining our visual identity, brand design, UI/UX systems, and chapter assets.',
      iconType: 'pen-tool',
      colorToken: '#FBBC04'
    }
  });

  console.log('Renamed clubs count:', res.count);

  const updatedClubs = await prisma.club.findMany();
  console.log('Updated clubs in DB:', updatedClubs.map(c => ({ id: c.id, name: c.name, type: c.type })));
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });
