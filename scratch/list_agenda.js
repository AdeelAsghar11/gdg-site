const { Pool } = require('pg');
require('dotenv').config({ path: '.env' });
const pool = new Pool({ connectionString: process.env.DATABASE_URL, ssl: { rejectUnauthorized: false } });

async function run() {
  const res = await pool.query('SELECT e.slug, a.time, a.title, a.speaker FROM "EventAgendaItem" a JOIN "Event" e ON a."eventId" = e.id ORDER BY e.slug, a."order"');
  for (const r of res.rows) {
    console.log(`${r.slug} | ${r.time} | ${r.title} | speaker: ${r.speaker}`);
  }
  await pool.end();
}
run();
