require('dotenv').config({ path: '.env' });
const { PrismaClient } = require('@prisma/client');
const { Pool } = require('pg');
const { PrismaPg } = require('@prisma/adapter-pg');
const pool = new Pool({ connectionString: process.env.DATABASE_URL, ssl: { rejectUnauthorized: false } });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  const hosts = await prisma.host.findMany();
  console.log('HOSTS IN DB:', hosts.map(h => ({ id: h.id, name: h.name, role: h.role, org: h.organization, image: h.imageUrl })));

  const members = await prisma.member.findMany({
    where: {
      OR: [
        { name: { contains: 'Wasif', mode: 'insensitive' } },
        { name: { contains: 'Farhan', mode: 'insensitive' } },
        { name: { contains: 'Raheem', mode: 'insensitive' } },
        { name: { contains: 'Munsif', mode: 'insensitive' } },
        { name: { contains: 'Adil', mode: 'insensitive' } },
        { name: { contains: 'Sumama', mode: 'insensitive' } },
      ]
    }
  });
  console.log('MATCHING MEMBERS IN DB:', members.map(m => ({ id: m.id, name: m.name, role: m.role, tagline: m.tagline, image: m.imageUrl })));
}

main().catch(console.error).finally(() => prisma.$disconnect());
