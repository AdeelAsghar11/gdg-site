import { prisma } from '../lib/prisma';

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
      console.log(`Created partner: ${created.name}`);
    } else {
      console.log(`Partner ${p.name} already exists in DB.`);
    }
  }

  const allPartners = await prisma.partner.findMany({ orderBy: { order: 'asc' } });
  console.log('Updated Partners in DB:', allPartners);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
