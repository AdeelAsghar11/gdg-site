import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import dotenv from 'dotenv';

dotenv.config();
dotenv.config({ path: '.env.local', override: true });

const connectionString = `${process.env.DATABASE_URL}`;
const pool = new Pool({
  connectionString,
  ssl: { rejectUnauthorized: false }
});

const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('🔍 Checking existing clubs in database...');
  const clubs = await prisma.club.findMany();
  console.log('Existing clubs count:', clubs.length);
  clubs.forEach(c => console.log(`- [${c.type}] ${c.name} (id: ${c.id}, color: ${c.colorToken})`));

  const vibeClub = clubs.find(c => c.name.toLowerCase().includes('vibe'));

  if (!vibeClub) {
    console.log('⚡ Adding Vibe Coding Club to database...');
    const created = await prisma.club.create({
      data: {
        name: 'Vibe Coding',
        type: 'technical',
        description: 'Building software at lightning speed with modern AI assistance, rapid prototyping, and flow-state engineering.',
        iconType: 'code',
        colorToken: '#34A853',
      }
    });
    console.log('✅ Created club:', created);
  } else {
    console.log('ℹ️ Vibe coding club already exists:', vibeClub);
  }
}

main()
  .catch((e) => {
    console.error('Error running script:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });
