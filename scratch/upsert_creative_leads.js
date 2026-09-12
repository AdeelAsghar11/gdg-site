require('dotenv').config({ path: '.env' });
const { PrismaClient } = require('@prisma/client');
const { Pool } = require('pg');
const { PrismaPg } = require('@prisma/adapter-pg');
const bcrypt = require('bcryptjs');

const pool = new Pool({ connectionString: process.env.DATABASE_URL, ssl: { rejectUnauthorized: false } });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  const defaultPassword = await bcrypt.hash('gdg@123456', 10);

  // 1. Talha Ahmed - Creative Club Lead
  const talha = await prisma.member.upsert({
    where: { slug: 'talha-ahmed' },
    update: {
      name: 'Talha Ahmed',
      role: 'core',
      tagline: 'Creative Club Lead',
      imageUrl: '/images/team/talha_ahmed.png',
      isActive: true,
      bio: 'Creative Lead at GDGoC CUI Wah, shaping visual narratives, UI/UX aesthetics, and creative brand design systems across university initiatives.',
    },
    create: {
      slug: 'talha-ahmed',
      name: 'Talha Ahmed',
      email: 'talha.ahmed@gdgoc-cuiwah.com',
      passwordHash: defaultPassword,
      role: 'core',
      tagline: 'Creative Club Lead',
      imageUrl: '/images/team/talha_ahmed.png',
      isActive: true,
      bio: 'Creative Lead at GDGoC CUI Wah, shaping visual narratives, UI/UX aesthetics, and creative brand design systems across university initiatives.',
    },
  });
  console.log('✅ Upserted Talha Ahmed:', talha.id, talha.name);

  // 2. Jasim Ali - Creative Club Co-Lead
  const jasim = await prisma.member.upsert({
    where: { slug: 'jasim-ali' },
    update: {
      name: 'Jasim Ali',
      role: 'core',
      tagline: 'Creative Club Co-Lead',
      imageUrl: '/images/team/jasim_ali.png',
      isActive: true,
      bio: 'Creative Co-Lead at GDGoC CUI Wah, specializing in brand design, graphic direction, and digital media production for campus developer community events.',
    },
    create: {
      slug: 'jasim-ali',
      name: 'Jasim Ali',
      email: 'jasim.ali@gdgoc-cuiwah.com',
      passwordHash: defaultPassword,
      role: 'core',
      tagline: 'Creative Club Co-Lead',
      imageUrl: '/images/team/jasim_ali.png',
      isActive: true,
      bio: 'Creative Co-Lead at GDGoC CUI Wah, specializing in brand design, graphic direction, and digital media production for campus developer community events.',
    },
  });
  console.log('✅ Upserted Jasim Ali:', jasim.id, jasim.name);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
