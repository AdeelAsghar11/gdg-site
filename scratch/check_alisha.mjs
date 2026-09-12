import { prisma } from '../lib/prisma.ts';

async function check() {
  const alisha = await prisma.member.findUnique({
    where: { slug: 'alisha-fatima' }
  });
  console.log('Alisha Fatima in DB:', alisha);
  process.exit(0);
}

check().catch(e => {
  console.error(e);
  process.exit(1);
});
