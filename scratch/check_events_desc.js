const { Pool } = require('pg');
require('dotenv').config({ path: '.env' });
const pool = new Pool({ connectionString: process.env.DATABASE_URL, ssl: { rejectUnauthorized: false } });

async function run() {
  const res = await pool.query(`SELECT slug, title, description FROM "Event" WHERE slug IN ('hack-data-v1', 'hack-the-vibe-2026')`);
  console.log(res.rows);
  await pool.end();
}
run();
