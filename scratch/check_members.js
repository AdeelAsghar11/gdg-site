require('dotenv').config({ path: '.env' });
const { PrismaClient } = require('@prisma/client');
const { Pool } = require('pg');
const { PrismaPg } = require('@prisma/adapter-pg');
const pool = new Pool({ connectionString: process.env.DATABASE_URL, ssl: { rejectUnauthorized: false } });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  const members = await prisma.member.findMany({
    where: {
      OR: [
        { name: { contains: 'Talha', mode: 'insensitive' } },
        { name: { contains: 'Jasim', mode: 'insensitive' } },
        { slug: { contains: 'talha', mode: 'insensitive' } },
        { slug: { contains: 'jasim', mode: 'insensitive' } }
      ]
    }
  });
  console.log('Found members:', members.map(m => ({ id: m.id, name: m.name, slug: m.slug, role: m.role, tagline: m.tagline, imageUrl: m.imageUrl })));
}

main().catch(console.error).finally(() => prisma.$disconnect());
