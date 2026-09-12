import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';

const connectionString = process.env.DATABASE_URL;
const pool = new Pool({
  connectionString,
  ssl: { rejectUnauthorized: false },
});

const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  const total = await prisma.member.count();
  const active = await prisma.member.count({ where: { isActive: true } });
  const core = await prisma.member.count({ where: { role: 'core', isActive: true } });
  const admin = await prisma.member.count({ where: { role: 'admin', isActive: true } });
  const memberOnly = await prisma.member.count({ where: { role: 'member', isActive: true } });
  const inactive = await prisma.member.count({ where: { isActive: false } });

  console.log('Member Counts in DB:');
  console.log({ total, active, core, admin, memberOnly, inactive });

  const members = await prisma.member.findMany({
    select: { id: true, name: true, role: true, isActive: true },
    orderBy: { role: 'asc' },
  });
  console.log('\nAll Members in DB:');
  console.table(members);
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });
