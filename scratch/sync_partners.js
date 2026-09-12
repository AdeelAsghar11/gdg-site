require('dotenv').config({ path: '.env' });
const { PrismaClient } = require('@prisma/client');
const { Pool } = require('pg');
const { PrismaPg } = require('@prisma/adapter-pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

const DESIRED_PARTNERS = [
  {
    name: 'GitHub',
    logoUrl: '/partners/github.png',
    websiteUrl: 'https://github.com/',
    order: 1,
  },
  {
    name: 'Algoligence',
    logoUrl: '/partners/algoligence.svg',
    websiteUrl: 'https://algoligence.com/',
    order: 2,
  },
  {
    name: 'DataCamp',
    logoUrl: '/partners/datacamp.png',
    websiteUrl: 'https://www.datacamp.com/',
    order: 3,
  },
  {
    name: 'KSL',
    logoUrl: '/partners/ksl.svg',
    websiteUrl: 'https://kslt20.com/',
    order: 4,
  },
  {
    name: 'Cheezious',
    logoUrl: '/partners/cheezious.svg',
    websiteUrl: 'https://cheezious.com/',
    order: 5,
  },
  {
    name: 'Korneez',
    logoUrl: '/partners/korneez.svg',
    websiteUrl: 'https://korneez.com/',
    order: 6,
  },
];

async function sync() {
  console.log('🔄 Fetching current partners in DB...');
  const current = await prisma.partner.findMany();
  console.log('Current partners:', current.map(p => ({ id: p.id, name: p.name, order: p.order })));

  const allowedNames = new Set(DESIRED_PARTNERS.map(p => p.name.toLowerCase()));

  // Remove any extra partners
  for (const p of current) {
    if (!allowedNames.has(p.name.toLowerCase())) {
      console.log(`❌ Removing extra partner: ${p.name} (id: ${p.id})`);
      await prisma.partner.delete({ where: { id: p.id } });
    }
  }

  // Upsert desired partners
  for (const p of DESIRED_PARTNERS) {
    const existing = await prisma.partner.findFirst({
      where: { name: { equals: p.name, mode: 'insensitive' } },
    });

    if (existing) {
      console.log(`✏️ Updating partner ${p.name}...`);
      await prisma.partner.update({
        where: { id: existing.id },
        data: {
          name: p.name,
          logoUrl: p.logoUrl,
          websiteUrl: p.websiteUrl,
          order: p.order,
        },
      });
    } else {
      console.log(`➕ Adding new partner ${p.name}...`);
      await prisma.partner.create({
        data: p,
      });
    }
  }

  const finalPartners = await prisma.partner.findMany({ orderBy: { order: 'asc' } });
  console.log('✅ Final partners in DB:');
  console.log(JSON.stringify(finalPartners, null, 2));
}

sync()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
