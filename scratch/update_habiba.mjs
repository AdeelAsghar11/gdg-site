import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import dotenv from 'dotenv';

dotenv.config();
dotenv.config({ path: '.env.local', override: true });

const pool = new Pool({ connectionString: process.env.DATABASE_URL, ssl: { rejectUnauthorized: false } });
const prisma = new PrismaClient({ adapter: new PrismaPg(pool) });

async function main() {
  const result = await prisma.member.updateMany({
    where: {
      OR: [
        { slug: 'umme-habiba' },
        { name: { contains: 'Habiba', mode: 'insensitive' } }
      ]
    },
    data: { imageUrl: '/images/team/umme_habiba.png' }
  });
  console.log('Updated records count:', result.count);
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });
