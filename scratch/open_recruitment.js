const { Pool } = require('pg');
require('dotenv').config({ path: '.env' });
const pool = new Pool({ connectionString: process.env.DATABASE_URL, ssl: { rejectUnauthorized: false } });

async function openRecruitment() {
  try {
    const res = await pool.query(`SELECT * FROM "SiteSetting" WHERE key LIKE 'recruitment%'`);
    console.log('Current recruitment settings:', res.rows);

    await pool.query(`
      INSERT INTO "SiteSetting" (id, key, value)
      VALUES 
        (gen_random_uuid()::text, 'recruitment_status', 'open'),
        (gen_random_uuid()::text, 'recruitment_message', 'Registrations Open: 11 Sep – 14 Sep | Interviews: 15 Sep | Open for 1st & 2nd Semester Students!'),
        (gen_random_uuid()::text, 'recruitment_deadline', '2026-09-14T23:59:59.000Z'),
        (gen_random_uuid()::text, 'recruitment_eligibility', '1st & 2nd Semester Students'),
        (gen_random_uuid()::text, 'recruitment_interview_date', '15 Sep 2026')
      ON CONFLICT (key) DO UPDATE
      SET value = EXCLUDED.value;
    `);
    console.log('✅ Successfully updated recruitment settings in database!');
    
    const updated = await pool.query(`SELECT * FROM "SiteSetting" WHERE key LIKE 'recruitment%'`);
    console.log('Updated recruitment settings:', updated.rows);
  } catch (err) {
    console.error('DB Error:', err);
  } finally {
    await pool.end();
  }
}

openRecruitment();
