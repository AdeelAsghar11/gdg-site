import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';

dotenv.config();
dotenv.config({ path: '.env.local', override: true });

const pool = new Pool({ connectionString: process.env.DATABASE_URL, ssl: { rejectUnauthorized: false } });
const prisma = new PrismaClient({ adapter: new PrismaPg(pool) });

async function main() {
  console.log('🔄 Upserting Zohaib Arif in database...');
  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash('gdgoc2026', salt);

  const zohaib = await prisma.member.upsert({
    where: { slug: 'zohaib-arif' },
    update: {
      name: 'Zohaib Arif',
      tagline: 'Web & App Co-Lead',
      imageUrl: '/images/team/zohaib_arif.png',
      role: 'member',
      tier: 'domain',
      isActive: true,
    },
    create: {
      slug: 'zohaib-arif',
      name: 'Zohaib Arif',
      email: 'zohaib@example.com',
      passwordHash: passwordHash,
      role: 'member',
      tier: 'domain',
      tagline: 'Web & App Co-Lead',
      imageUrl: '/images/team/zohaib_arif.png',
      bio: 'Co-Leading the Web & App Development track, building accessible web applications and mentoring chapter developers.',
      github: '#',
      linkedin: '#',
      isActive: true,
      skills: {
        create: [
          { skill: 'React' },
          { skill: 'Next.js' },
          { skill: 'JavaScript' },
          { skill: 'Web Design' },
        ],
      },
      contributions: {
        create: [
          { title: 'Co-leading hands-on frontend development workshops' },
          { title: 'Mentoring chapter students on web architectures' },
        ],
      },
    },
  });

  console.log('✅ Upserted Zohaib Arif:', zohaib.name, zohaib.slug);

  // Also update Fatima Qureshi's role and tagline in DB
  await prisma.member.updateMany({
    where: { slug: 'fatima-qureshi' },
    data: { role: 'core', tagline: 'Outreach Lead' }
  });
  console.log('✅ Updated Fatima Qureshi -> Outreach Lead (Core)');
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });
