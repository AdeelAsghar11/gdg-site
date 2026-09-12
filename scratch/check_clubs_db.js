require('dotenv').config({ path: '.env' });
const { PrismaClient } = require('@prisma/client');
const { Pool } = require('pg');
const { PrismaPg } = require('@prisma/adapter-pg');
const pool = new Pool({ connectionString: process.env.DATABASE_URL, ssl: { rejectUnauthorized: false } });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  const clubs = await prisma.club.findMany({
    include: {
      lead: true,
      coLead: true,
    }
  });
  console.log('Clubs in DB:');
  for (const c of clubs) {
    console.log({
      id: c.id,
      name: c.name,
      type: c.type,
      lead: c.lead ? { name: c.lead.name, slug: c.lead.slug } : null,
      coLead: c.coLead ? { name: c.coLead.name, slug: c.coLead.slug } : null
    });
  }
}

main().catch(console.error).finally(() => prisma.$disconnect());
