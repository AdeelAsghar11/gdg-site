import { prisma } from '../lib/prisma';

async function main() {
  const partners = await prisma.partner.findMany({
    orderBy: { order: 'asc' },
  });
  console.log('Current partners in DB:', JSON.stringify(partners, null, 2));
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
