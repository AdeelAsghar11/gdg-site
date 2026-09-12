const { Pool } = require('pg');
require('dotenv').config({ path: '.env' });
const pool = new Pool({ connectionString: process.env.DATABASE_URL, ssl: { rejectUnauthorized: false } });

async function main() {
  const items = await pool.query('SELECT DISTINCT speaker FROM "EventAgendaItem" WHERE speaker IS NOT NULL');
  console.log('Distinct speakers in DB:', items.rows.map(r => r.speaker));
  
  const members = await pool.query('SELECT name, slug, "imageUrl", tagline, role FROM "Member" WHERE "isActive" = true');
  console.log('Active members:', members.rows);

  await pool.end();
}
main().catch(console.error);
