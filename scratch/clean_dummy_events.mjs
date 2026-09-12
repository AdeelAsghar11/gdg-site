import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import dotenv from 'dotenv';

dotenv.config();
dotenv.config({ path: '.env.local', override: true });

const pool = new Pool({ connectionString: process.env.DATABASE_URL, ssl: { rejectUnauthorized: false } });
const prisma = new PrismaClient({ adapter: new PrismaPg(pool) });

// List of generic placeholder dummy slugs from early templates
const dummySlugs = [
  'build-with-ai-google-ai-tools',
  'gdg-x-dsa-series-2026',
  'android-devfest-2026',
  'google-cloud-study-jams-2026',
  'github-workshop-mastering-version-control',
  'open-source-summit',
  'intro-to-ai-generative-models',
  'react-mastery-bootcamp',
  'frontend-development-bootcamp',
  'data-science-101-bootcamp',
];

async function main() {
  console.log('🧹 Removing placeholder events...');
  for (const slug of dummySlugs) {
    const existing = await prisma.event.findUnique({ where: { slug } });
    if (existing) {
      await prisma.eventAgendaItem.deleteMany({ where: { eventId: existing.id } });
      await prisma.eventTag.deleteMany({ where: { eventId: existing.id } });
      await prisma.eventRegistration.deleteMany({ where: { eventId: existing.id } });
      await prisma.event.delete({ where: { slug } });
      console.log(`🗑️ Deleted placeholder event: ${slug}`);
    }
  }

  console.log('\n📅 Remaining REAL Chapter Events in descending order (latest first):');
  const realEvents = await prisma.event.findMany({
    where: { isPublished: true },
    orderBy: { date: 'desc' },
    include: { agendaItems: true, tags: true }
  });

  realEvents.forEach((ev, i) => {
    console.log(`${i + 1}. [${ev.date.toISOString().split('T')[0]}] ${ev.title} (${ev.type})`);
  });
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });
