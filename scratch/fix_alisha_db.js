const { Pool } = require('pg');
require('dotenv').config({ path: '.env.local' });
require('dotenv').config({ path: '.env' });

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

async function main() {
  const res = await pool.query(`SELECT id, name, slug, "imageUrl" FROM "Member" WHERE slug = 'alisha-fatima' OR name ILIKE '%alisha%'`);
  console.log('Current DB records for Alisha:', res.rows);

  if (res.rows.length > 0) {
    await pool.query(`UPDATE "Member" SET "imageUrl" = '/images/team/alisha_fatima.png', "isActive" = true WHERE slug = 'alisha-fatima' OR name ILIKE '%alisha%'`);
    console.log('Updated image in DB successfully');
  }

  await pool.end();
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
