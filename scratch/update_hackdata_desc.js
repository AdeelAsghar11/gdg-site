const { Pool } = require('pg');
require('dotenv').config({ path: '.env' });
const pool = new Pool({ connectionString: process.env.DATABASE_URL, ssl: { rejectUnauthorized: false } });

async function updateDesc() {
  await pool.query(`
    UPDATE "Event"
    SET description = 'Hack Data V1 was a dynamic and competitive 48-hour online hackathon organized by GDGoC CUI Wah, bringing together students from across all eight semesters. The event challenged participants to identify unique problem statements and develop tangible, real-world solutions in the form of highly visual and functional websites and applications. Projects underwent rigorous evaluation by esteemed judge Farhan Ashraf on technical execution, exceptional presentations, and product visuals. Concluded with an official award ceremony distributing a PKR 15,000 cash prize pool (PKR 10,000 for winner, PKR 5,000 for runner-up) and certificates to all participants.'
    WHERE slug = 'hack-data-v1'
  `);
  console.log('Updated hack-data-v1 description');
  await pool.end();
}
updateDesc().catch(console.error);
