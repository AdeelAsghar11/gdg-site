const { Pool } = require('pg');
require('dotenv').config({ path: '.env' });
const pool = new Pool({ connectionString: process.env.DATABASE_URL, ssl: { rejectUnauthorized: false } });

async function check() {
  const res = await pool.query(`
    SELECT a.id, a."order", a.time, a.title, a.speaker, a.description, e.slug 
    FROM "EventAgendaItem" a 
    JOIN "Event" e ON a."eventId" = e.id 
    WHERE e.slug IN ('hack-the-vibe-2026', 'hack-data-v1')
    ORDER BY e.slug, a."order"
  `);
  console.log(res.rows);
  await pool.end();
}
check();
