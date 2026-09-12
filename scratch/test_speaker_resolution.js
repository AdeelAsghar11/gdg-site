const { Pool } = require('pg');
require('dotenv').config({ path: '.env' });
const pool = new Pool({ connectionString: process.env.DATABASE_URL, ssl: { rejectUnauthorized: false } });

function cleanSpeakerName(raw) {
  return raw
    .replace(/\s*\([^)]*\)/g, '') // remove parenthetical like (Campus Lead)
    .replace(/^mr\.?\s+/i, '')
    .trim();
}

function normalizeKey(name) {
  const lower = name.toLowerCase();
  if (lower.includes('ubaid')) return 'ubaid-ghazi';
  if (lower.includes('ismail')) return 'muhammad-ismail';
  return lower.replace(/[^a-z0-9]/g, '');
}

const IGNORE_PATTERNS = [
  /panel/i,
  /committee/i,
  /teams?/i,
  /leadership/i,
  /arena/i,
  /mentors?/i,
  /organizing team/i,
  /core team/i,
  /campus leads?/i,
  /domain leads?/i,
  /raheem/i,
  /rahim/i
];

const KNOWN_MENTORS = {
  'farhan ashraf': {
    name: 'Farhan Ashraf',
    role: 'AI SecOps Engineer & GitHub Campus Expert',
    organization: 'Systems Limited',
    imageUrl: '/images/mentors/farhan_ashraf.png'
  },
  'dr. wasif': {
    name: 'Dr. Wasif Nisar',
    role: 'Faculty Advisor',
    organization: 'COMSATS University Wah',
    imageUrl: '/images/mentors/dr_wasif.png'
  },
  'muhammad adil': {
    name: 'Muhammad Adil',
    role: 'GitHub Campus Expert',
    organization: 'TechCre Solutions',
    imageUrl: '/images/mentors/muhammad_adil.png'
  },
  'munsif raza': {
    name: 'Munsif Raza',
    role: 'Mentor & Keynote Speaker',
    organization: 'GDGoC CUI Wah',
    imageUrl: '/images/mentors/munsif_raza.png'
  },
  'sumama zaeem': {
    name: 'Sumama Zaeem',
    role: 'Technical Speaker',
    organization: 'GDGoC CUI Wah',
    imageUrl: '/images/mentors/sumama_zaeem.png'
  }
};

async function testResolution() {
  const membersRes = await pool.query('SELECT name, slug, "imageUrl", tagline, role, linkedin FROM "Member" WHERE "isActive" = true');
  const members = membersRes.rows;

  const eventsRes = await pool.query('SELECT id, slug, title FROM "Event" WHERE "isPublished" = true');
  const events = eventsRes.rows;

  for (const ev of events) {
    const agendaRes = await pool.query('SELECT speaker, title FROM "EventAgendaItem" WHERE "eventId" = $1 ORDER BY "order" ASC', [ev.id]);
    const agenda = agendaRes.rows;

    const resolved = new Map();

    for (const item of agenda) {
      if (!item.speaker) continue;
      
      // 1. Remove parenthetical first so '&' inside roles won't break splitting
      const noParens = item.speaker.replace(/\s*\([^)]*\)/g, '').trim();
      
      // 2. Split on & or and
      const rawParts = noParens.split(/\s*(&|\band\b)\s*/i).filter(p => p && p !== '&' && p.toLowerCase() !== 'and');
      
      for (const part of rawParts) {
        const cleaned = cleanSpeakerName(part);
        if (!cleaned || cleaned.length < 3) continue;

        // Check if ignored
        if (IGNORE_PATTERNS.some(p => p.test(cleaned))) continue;

        const key = normalizeKey(cleaned);
        if (resolved.has(key)) continue;

        // Check known mentors
        const mentorMatch = Object.entries(KNOWN_MENTORS).find(([mKey]) => cleaned.toLowerCase().includes(mKey));
        if (mentorMatch) {
          resolved.set(key, mentorMatch[1]);
          continue;
        }

        // Check members
        const memberMatch = members.find(m => {
          const mLower = m.name.toLowerCase();
          const cLower = cleaned.toLowerCase();
          if (cLower.includes('ubaid') && mLower.includes('ubaid')) return true;
          if (cLower.includes('ismail') && mLower.includes('ismail')) return true;
          return mLower.includes(cLower) || cLower.includes(mLower);
        });

        if (memberMatch) {
          resolved.set(key, {
            name: memberMatch.name,
            role: memberMatch.tagline || (memberMatch.role === 'admin' ? 'Faculty Head' : memberMatch.role === 'core' ? 'Core Lead' : 'Speaker'),
            organization: 'GDGoC CUI Wah',
            imageUrl: memberMatch.imageUrl,
            linkedin: memberMatch.linkedin
          });
          continue;
        }

        // Generic person
        resolved.set(key, {
          name: cleaned,
          role: 'Speaker',
          organization: 'GDGoC CUI Wah',
          imageUrl: `https://ui-avatars.com/api/?name=${encodeURIComponent(cleaned)}&background=4285f4&color=fff&size=256`
        });
      }
    }

    const speakerList = Array.from(resolved.values());
    console.log(`\n=== Event: ${ev.slug} ===`);
    if (speakerList.length === 0) {
      console.log('  [Fallback] Ubaid Ghazi (Campus Lead) -> /images/team/ubaid.png');
    } else {
      speakerList.forEach(s => {
        console.log(`  -> ${s.name} (${s.role}) - ${s.imageUrl}`);
      });
    }
  }

  await pool.end();
}

testResolution().catch(console.error);
