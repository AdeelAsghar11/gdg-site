const { Pool } = require('pg');
require('dotenv').config({ path: '.env' });
const pool = new Pool({ connectionString: process.env.DATABASE_URL, ssl: { rejectUnauthorized: false } });

async function main() {
  const ev = await pool.query('SELECT id, slug, title FROM "Event" WHERE slug = $1', ['google-ai-tools-vibe-coding-sp26']);
  console.log('Event:', ev.rows);
  if (ev.rows.length > 0) {
    const items = await pool.query('SELECT id, "order", time, title, speaker FROM "EventAgendaItem" WHERE "eventId" = $1 ORDER BY "order" ASC', [ev.rows[0].id]);
    console.log('Agenda items:', items.rows);
  }
  await pool.end();
}
main().catch(console.error);
