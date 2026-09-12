import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import dotenv from 'dotenv';

dotenv.config();
dotenv.config({ path: '.env.local', override: true });

const pool = new Pool({ connectionString: process.env.DATABASE_URL, ssl: { rejectUnauthorized: false } });
const prisma = new PrismaClient({ adapter: new PrismaPg(pool) });

async function main() {
  console.log('🔧 Updating events in database...');

  // 1. Remove On-spot programming from Visio Spark
  const visioSpark = await prisma.event.findUnique({ where: { slug: 'visio-spark-programming-competition' } });
  if (visioSpark) {
    await prisma.eventAgendaItem.deleteMany({ where: { eventId: visioSpark.id } });
    await prisma.eventTag.deleteMany({ where: { eventId: visioSpark.id } });
    await prisma.eventRegistration.deleteMany({ where: { eventId: visioSpark.id } });
    await prisma.event.delete({ where: { id: visioSpark.id } });
    console.log('✅ Removed "visio-spark-programming-competition"');
  } else {
    console.log('ℹ️ "visio-spark-programming-competition" not found or already removed');
  }

  // 2. Remove Programming for beginners C Language from MTM
  const cProg = await prisma.event.findUnique({ where: { slug: 'programming-for-beginners-c-language' } });
  if (cProg) {
    await prisma.eventAgendaItem.deleteMany({ where: { eventId: cProg.id } });
    await prisma.eventTag.deleteMany({ where: { eventId: cProg.id } });
    await prisma.eventRegistration.deleteMany({ where: { eventId: cProg.id } });
    await prisma.event.delete({ where: { id: cProg.id } });
    console.log('✅ Removed "programming-for-beginners-c-language"');
  } else {
    console.log('ℹ️ "programming-for-beginners-c-language" not found or already removed');
  }

  // 3. Update GitHub Essentials photo to the actual presentation photo of Ismail
  const gh = await prisma.event.update({
    where: { slug: 'github-essentials-session' },
    data: {
      imageUrl: '/images/chapter_photos/ismail_github_session.jpg',
      badgeUrl: '/images/chapter_photos/ismail_github_session.jpg',
    },
  });
  console.log(`✅ Updated GitHub Essentials photo to: ${gh.imageUrl}`);

  // 4. Verify remaining events in order
  const remaining = await prisma.event.findMany({
    where: { isPublished: true },
    orderBy: { date: 'desc' },
    select: { title: true, slug: true, imageUrl: true },
  });

  console.log(`\n📋 Remaining Events Count: ${remaining.length}`);
  remaining.forEach((ev, i) => {
    console.log(`${i + 1}. [${ev.slug}] ${ev.title} (img: ${ev.imageUrl})`);
  });
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });
