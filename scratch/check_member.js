const { Pool } = require('pg');
require('dotenv').config({ path: '.env' });
const pool = new Pool({ connectionString: process.env.DATABASE_URL, ssl: { rejectUnauthorized: false } });

async function run() {
  const res = await pool.query(`SELECT name, slug, "imageUrl", role, department, tagline FROM "Member" WHERE name ILIKE '%ahad%'`);
  console.log(res.rows);
  await pool.end();
}
run();
