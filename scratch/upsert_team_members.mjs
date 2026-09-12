import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import bcrypt from 'bcryptjs';

const connectionString = process.env.DATABASE_URL;
const pool = new Pool({
  connectionString,
  ssl: { rejectUnauthorized: false },
});

const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

const teamData = [
  // ── LEADERSHIP ──
  {
    name: 'Dr. Kashif Ayyub',
    email: 'kashif.ayub@example.com',
    slug: 'kashif-ayub',
    role: 'admin',
    department: 'Faculty Advisor',
    tagline: 'Empowering future leaders and engineers through knowledge and mentorship.',
    bio: 'Associate Professor and GDG on Campus Faculty Advisor.',
    imageUrl: '/images/team/kashif_ayub.png',
  },
  {
    name: 'Ubaid Ghazi',
    email: 'ubaid@example.com',
    slug: 'ubaid',
    role: 'core',
    department: 'Campus Lead',
    tagline: 'Leading the chapter towards technological excellence.',
    bio: 'GDG on Campus Lead, driving community initiatives and student developer programs.',
    imageUrl: '/images/team/ubaid.png',
  },
  {
    name: 'Laiba Faiz',
    email: 'laiba.faiz10@gmail.com',
    slug: 'laiba-faiz',
    role: 'core',
    department: 'Advisor',
    tagline: 'Turning ideas into impact while inspiring others to grow along the way.',
    bio: 'Advisor',
    imageUrl: '/images/team/laiba_faiz.png',
  },

  // ── CORE TEAM ──
  {
    name: 'Junaid Mehmood',
    email: 'junaidm0079@gmail.com',
    slug: 'junaid-mehmood',
    role: 'core',
    department: 'General Secretary',
    tagline: 'Empowering ideas through thoughtful development and innovative tech.',
    bio: 'Full-Stack Developer specializing in AI-driven automation and seamless web experiences.',
    imageUrl: '/images/team/junaid_mehmood.png',
  },
  {
    name: 'Muhammad Ismail',
    email: 'mrismaeel@outlook.com',
    slug: 'ismail',
    role: 'core',
    department: 'Tech Lead',
    tagline: "I'm groot!",
    bio: "I'm a Full Stack AI Developer",
    imageUrl: '/images/team/m_ismail.png',
  },
  {
    name: 'Adeel Asghar',
    email: 'adeelyt157@gmail.com',
    slug: 'adeel',
    role: 'core',
    department: 'Community Manager',
    tagline: 'The quiet kid who avoided the room now leads it.',
    bio: 'AI Engineer',
    imageUrl: '/images/team/adeel_asghar.png',
  },
  {
    name: 'Muhammad Yousaf',
    email: 'm.yousaff913@gmail.com',
    slug: 'm-yousaf',
    role: 'core',
    department: 'Operational Lead',
    tagline: 'Optimizing operations and data flow.',
    bio: 'I am data analyst',
    imageUrl: '/images/team/m_yousaf.png',
  },
  {
    name: 'Muhammad Abdullah',
    email: 'm.abdullahamir56@gmail.com',
    slug: 'abdullah-amir',
    role: 'core',
    department: 'Media Head',
    tagline: 'Bridging the gap between the precision of computer science and the creativity of media production.',
    bio: 'I am a cinematographer and social media manager',
    imageUrl: '/images/team/abdullah_amir.png',
  },
  {
    name: 'Fatima Qureshi',
    email: 'fema.qureshi@gmail.com',
    slug: 'fatima-qureshi',
    role: 'core',
    department: 'Outreach Lead',
    tagline: 'Giving data a soul, giving logic a start; crafting the future with a digital heart.💗',
    bio: 'GDG Outreach Lead, scaling our community like a high-performance AI model. Bridging local talent to the broader tech industry.',
    imageUrl: '/images/team/fatima_qureshi.png',
  },
  {
    name: 'Mohsin Shakeel',
    email: 'mohsinshakeel4321@gmail.com',
    slug: 'mohsin-shakeel',
    role: 'core',
    department: 'Event Management Lead',
    tagline: 'I think deeply create boldly and turn ideas into meaningful action',
    bio: 'BS Artificial Intelligence Student & Aspiring AI Engineer',
    imageUrl: '/images/team/mohsin_shakeel.png',
  },
  {
    name: 'Manahil Mirza',
    email: 'manworkahill@gmail.com',
    slug: 'manahil-mirza',
    role: 'core',
    department: 'Women in Tech Lead',
    tagline: 'I started by bringing people together around technology; now I’m building the technology itself.',
    bio: 'AI undergraduate working toward becoming an AI/ML Engineer, with hands-on experience in Machine Learning, Deep Learning, Generative AI, RAG, and Intelligent Automation.',
    imageUrl: '/images/team/manahil_mirza.png',
  },

  // ── DOMAIN LEADS & CO-LEADS ──
  {
    name: 'Maleeha Zulfiqar',
    email: 'maleehazulifqar777786@gmail.com',
    slug: 'maleeha-zulfiqr',
    role: 'core',
    department: 'Gen AI Lead',
    tagline: 'Passionate about advancing artificial intelligence through research and real-world application',
    bio: 'Aspiring AI/ML Engineer and Data Analyst, leading Gen AI initiatives at GDG On Campus.',
    imageUrl: '/images/team/maleeha_zulfiqr.png',
  },
  {
    name: 'Abdul Ahad Khan',
    email: 'khan.ahad.abdul.175@gmail.com',
    slug: 'abdul-ahad',
    role: 'core',
    department: 'Gen AI Co-Lead',
    tagline: 'Exploring intelligence and automated generation.',
    bio: 'AI Engineer',
    imageUrl: '/images/team/abdul_ahad.png',
  },
  {
    name: 'Danyal Ahmad',
    email: 'danyalashfaqgoraya@gmail.com',
    slug: 'danyal-ahmed',
    role: 'core',
    department: 'Data Science Lead',
    tagline: 'Extracting patterns, predicting future outcomes.',
    bio: 'Data Scientist',
    imageUrl: '/images/team/danyal_ahmad.png',
  },
  {
    name: 'Muhammad Akif Naveed',
    email: 'hello.akifnaveed@gmail.com',
    slug: 'akif-naveed',
    role: 'core',
    department: 'AI & Data Science Co-Lead',
    tagline: 'Learn relentlessly, build meaningfully, and create impact through technology.',
    bio: 'Software Engineering undergraduate focused on AI Engineering, full-stack development, and building practical AI-powered solutions.',
    imageUrl: '/images/team/akif_naveed.png',
  },
  {
    name: 'Umm e Habiba',
    email: 'syedaummehabiba52@gmail.com',
    slug: 'umme-habiba',
    role: 'core',
    department: 'Web & App Lead',
    tagline: 'Soft heart, strong mind, and a soul determined to build the life she dreams of.',
    bio: 'Software Developer',
    imageUrl: '/images/team/umme_habiba.png',
  },
  {
    name: 'Muhammad Alyan',
    email: 'alyankhattake@gmail.com',
    slug: 'muhammad-alyan',
    role: 'core',
    department: 'Vibe Coding Lead',
    tagline: 'Throughout Code, Gym, & Chaos, I alone am the Sleep-deprived One',
    bio: 'AI Engineer',
    imageUrl: '/images/team/muhammad_alyan.png',
  },
  {
    name: 'Sana Shahid',
    email: 'sanashahid2712@gmail.com',
    slug: 'sana-shahid',
    role: 'core',
    department: 'Vibe Coding Co-Lead',
    tagline: 'Vibe coding ideas into reality.',
    bio: 'I am a Vibe Coder & Aspiring AI Engineer',
    imageUrl: '/images/team/sana_shahid.png',
  },
  {
    name: 'Muhammad Haseeb',
    email: 'itxhaseeb36@gmail.com',
    slug: 'muhammad-haseeb',
    role: 'core',
    department: 'Events Co-Lead',
    tagline: 'Building with curiosity, learning with purpose, and using technology to create an impact that goes beyond myself.',
    bio: 'Curious about AI, always learning and building.',
    imageUrl: '/images/team/muhammad_haseeb.png',
  },
  {
    name: 'Muhammad Baseer',
    email: 'baseerhere78@gmail.com',
    slug: 'muhammad-baseer',
    role: 'core',
    department: 'Social Media Co-Lead',
    tagline: 'Pushing my boundaries every day through constant experimentation.',
    bio: 'I serve my raw media skills like cinematography, sick editz and inspired to build AI-driven applications.',
    imageUrl: '/images/team/muhammad_baseer.png',
  },
];

async function main() {
  const defaultPassword = await bcrypt.hash('Member@GDG2026', 10);

  for (const m of teamData) {
    // Check if member already exists by email or slug
    const existing = await prisma.member.findFirst({
      where: {
        OR: [
          { email: m.email },
          { slug: m.slug },
          { name: m.name },
        ]
      }
    });

    if (existing) {
      await prisma.member.update({
        where: { id: existing.id },
        data: {
          name: m.name,
          email: m.email,
          slug: m.slug,
          role: m.role,
          department: m.department,
          tagline: m.tagline,
          bio: m.bio,
          imageUrl: m.imageUrl,
          isActive: true,
        }
      });
      console.log(`Updated ${m.name} (${m.department})`);
    } else {
      await prisma.member.create({
        data: {
          name: m.name,
          email: m.email,
          slug: m.slug,
          role: m.role,
          department: m.department,
          tagline: m.tagline,
          bio: m.bio,
          imageUrl: m.imageUrl,
          passwordHash: defaultPassword,
          isActive: true,
          points: 100,
        }
      });
      console.log(`Created ${m.name} (${m.department})`);
    }
  }

  console.log('\nAll team members synced successfully!');
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });
