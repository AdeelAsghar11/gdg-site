const { Pool } = require('pg');
require('dotenv').config({ path: '.env' });
const pool = new Pool({ connectionString: process.env.DATABASE_URL, ssl: { rejectUnauthorized: false } });

async function check() {
  const res = await pool.query(`SELECT description FROM "Event" WHERE slug = 'hack-data-v1'`);
  console.log('Event description:', res.rows[0].description);
  await pool.end();
}
check();
