require('dotenv').config({ path: '.env.local' });
require('dotenv').config({ path: '.env' });
const { PrismaClient } = require('@prisma/client');
const { Pool } = require('pg');
const { PrismaPg } = require('@prisma/adapter-pg');
const pool = new Pool({ connectionString: process.env.DATABASE_URL, ssl: { rejectUnauthorized: false } });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  const res = await pool.query(
    `UPDATE "Member" SET role = 'core', department = 'Core Lead', tagline = 'Core Lead' WHERE slug = 'saad-ali'`
  );
  console.log('Updated Saad Ali in DB:', res.rowCount);
}

main().catch(console.error).finally(() => pool.end());
