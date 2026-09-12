const { Pool } = require('pg');
require('dotenv').config({ path: '.env' });
const pool = new Pool({ connectionString: process.env.DATABASE_URL, ssl: { rejectUnauthorized: false } });

async function main() {
  const ev = await pool.query('SELECT id, slug, title FROM "Event" WHERE slug = $1', ['google-ai-tools-vibe-coding-sp26']);
  console.log('Target event:', ev.rows);
  if (ev.rows.length > 0) {
    const eventId = ev.rows[0].id;
    const updateResult = await pool.query(
      'UPDATE "EventAgendaItem" SET speaker = NULL WHERE "eventId" = $1 AND (speaker = $2 OR speaker ILIKE $3)',
      [eventId, 'Abdur Raheem', '%Raheem%']
    );
    console.log('Updated agenda items count:', updateResult.rowCount);

    const check = await pool.query(
      'SELECT id, "order", time, title, speaker FROM "EventAgendaItem" WHERE "eventId" = $1 ORDER BY "order" ASC',
      [eventId]
    );
    console.log('Updated agenda items:', check.rows);
  }

  await pool.end();
  console.log('Done.');
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
