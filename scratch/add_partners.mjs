import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';

const connectionString = process.env.DATABASE_URL;
const pool = new Pool({
  connectionString,
  ssl: { rejectUnauthorized: false },
});

const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  const existingPartners = await prisma.partner.findMany();
  const existingNames = new Set(existingPartners.map(p => p.name.toLowerCase()));

  const partnersToAdd = [
    {
      name: 'Algoligence',
      logoUrl: '/partners/algoligence.jpg',
      websiteUrl: 'https://algoligence.com/',
      order: 5,
    },
    {
      name: 'Cheezious',
      logoUrl: '/partners/cheezious.svg',
      websiteUrl: 'https://cheezious.com/',
      order: 6,
    },
  ];

  for (const p of partnersToAdd) {
    if (!existingNames.has(p.name.toLowerCase())) {
      const created = await prisma.partner.create({ data: p });
      console.log(`✅ Created partner: ${created.name}`);
    } else {
      console.log(`Partner ${p.name} already exists.`);
    }
  }

  const all = await prisma.partner.findMany({ orderBy: { order: 'asc' } });
  console.log('\nAll partners currently in DB:');
  console.table(all.map(p => ({ id: p.id, name: p.name, logoUrl: p.logoUrl, order: p.order })));
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });
