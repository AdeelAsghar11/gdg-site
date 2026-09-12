require('dotenv').config({ path: '.env' });
const { PrismaClient } = require('@prisma/client');
const { Pool } = require('pg');
const { PrismaPg } = require('@prisma/adapter-pg');
const pool = new Pool({ connectionString: process.env.DATABASE_URL, ssl: { rejectUnauthorized: false } });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  const members = await prisma.member.findMany();
  console.log('All members count:', members.length);
  console.log(members.map(m => ({ id: m.id, name: m.name, slug: m.slug, role: m.role, tagline: m.tagline })));
}

main().catch(console.error).finally(() => prisma.$disconnect());
