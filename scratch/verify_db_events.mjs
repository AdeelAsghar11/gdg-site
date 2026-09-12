import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function test() {
  const events = await prisma.event.findMany({
    where: { isPublished: true },
    orderBy: { date: 'desc' },
    select: { title: true, slug: true, date: true, imageUrl: true }
  });
  console.log('COUNT:', events.length);
  events.forEach((e, i) => {
    console.log(`${i + 1}. [${e.slug}] ${e.title} (${e.date.toISOString().split('T')[0]}) -> Image: ${e.imageUrl}`);
  });
}

test().finally(() => prisma.$disconnect());
