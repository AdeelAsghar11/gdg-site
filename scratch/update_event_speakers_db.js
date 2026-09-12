const { Pool } = require('pg');
require('dotenv').config({ path: '.env' });
const pool = new Pool({ connectionString: process.env.DATABASE_URL, ssl: { rejectUnauthorized: false } });

async function updateDb() {
  // 1. Update hack-the-vibe-2026: replace Muhammad Adil with Munsif Raza
  await pool.query(`
    UPDATE "EventAgendaItem" 
    SET speaker = 'Munsif Raza (Mentor & Keynote Speaker)'
    WHERE id IN (
      SELECT a.id FROM "EventAgendaItem" a
      JOIN "Event" e ON a."eventId" = e.id
      WHERE e.slug = 'hack-the-vibe-2026' AND a.speaker ILIKE '%adil%'
    )
  `);

  // 2. Update hack-data-v1: replace Munsif / Abdul Rahim with Farhan Ashraf
  await pool.query(`
    UPDATE "EventAgendaItem" 
    SET speaker = 'Farhan Ashraf (AI SecOps Engineer & GitHub Campus Expert)'
    WHERE id IN (
      SELECT a.id FROM "EventAgendaItem" a
      JOIN "Event" e ON a."eventId" = e.id
      WHERE e.slug = 'hack-data-v1' AND a."order" = 1
    )
  `);

  await pool.query(`
    UPDATE "EventAgendaItem" 
    SET speaker = 'Farhan Ashraf & Campus Leadership'
    WHERE id IN (
      SELECT a.id FROM "EventAgendaItem" a
      JOIN "Event" e ON a."eventId" = e.id
      WHERE e.slug = 'hack-data-v1' AND a."order" = 5
    )
  `);

  // Verify updates
  const res = await pool.query(`
    SELECT e.slug, a."order", a.time, a.title, a.speaker
    FROM "EventAgendaItem" a
    JOIN "Event" e ON a."eventId" = e.id
    WHERE e.slug IN ('hack-the-vibe-2026', 'hack-data-v1')
    ORDER BY e.slug, a."order"
  `);

  console.log('Updated Agenda Items:');
  console.log(res.rows);

  await pool.end();
}

updateDb().catch(console.error);
