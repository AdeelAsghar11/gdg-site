import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import * as bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
dotenv.config();
dotenv.config({ path: '.env.local', override: true });

const connectionString = `${process.env.DATABASE_URL}`;
const pool = new Pool({ 
  connectionString,
  ssl: {
    rejectUnauthorized: false
  }
});
const adapter = new PrismaPg(pool as any);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('🌱 Starting seed...');

  // ─── Hash default password ────────────────────────────────────────────────
  const defaultPassword = await bcrypt.hash('gdgoc2026', 12);

  // ─── MEMBERS ──────────────────────────────────────────────────────────────
  console.log('👥 Seeding members...');

  const kashif = await prisma.member.upsert({
    where: { slug: 'kashif-ayub' },
    update: {},
    create: {
      slug: 'kashif-ayub',
      name: 'Dr. Kashif Ayyub',
      email: 'kashif@cuiwah.edu.pk',
      passwordHash: defaultPassword,
      role: 'admin',
      tier: 'leadership',
      tagline: 'Empowering the next generation of researchers and engineers.',
      imageUrl: '/images/team/kashif_ayub.png',
      bio: 'Dr. Kashif brings years of academic and industry expertise to GDGoC CUI Wah. He specializes in guiding student chapters through strategic technical growth and sustainable community building.',
      linkedin: 'https://linkedin.com/in/kashif-ayyub',
      isActive: true,
      skills: {
        create: [
          { skill: 'System Design' },
          { skill: 'Cloud Architecture' },
          { skill: 'Research Methodology' },
          { skill: 'Academic Leadership' },
        ],
      },
      contributions: {
        create: [
          { title: 'Strategic oversight for Chapter 2026 formation' },
          { title: 'Faculty liaison for CUI Wah administration' },
          { title: 'Mentorship for lead recruitment process' },
          { title: 'Guidance on industry-academic collaborations' },
        ],
      },
    },
  });

  const ubaid = await prisma.member.upsert({
    where: { slug: 'ubaid' },
    update: {},
    create: {
      slug: 'ubaid',
      name: 'Ubaid Ghazi',
      email: 'ubaidghazi@example.com',
      passwordHash: defaultPassword,
      role: 'core',
      tier: 'leadership',
      tagline: 'Leading with vision, building with purpose.',
      imageUrl: '/images/team/ubaid.png',
      bio: 'Visionary leader driving the chapter\'s mission to bridge the gap between classroom theory and industry practice. Founder of multiple student initiatives and passionate about Flutter and Firebase.',
      github: 'https://github.com/ubaid-ghazi',
      linkedin: 'https://linkedin.com/in/ubaid-ghazi',
      isActive: true,
      skills: {
        create: [
          { skill: 'Flutter' },
          { skill: 'Firebase' },
          { skill: 'Project Strategy' },
          { skill: 'Community Building' },
        ],
      },
      contributions: {
        create: [
          { title: 'Established the Chapter at CUI Wah' },
          { title: 'Successfully recruited a 20+ member core team' },
          { title: 'Organized the first major Tech Bootcamp' },
          { title: 'Spearheaded the Google Cloud partnership for the region' },
        ],
      },
    },
  });

  const laiba = await prisma.member.upsert({
    where: { slug: 'laiba-faiz' },
    update: {},
    create: {
      slug: 'laiba-faiz',
      name: 'Laiba Faiz',
      email: 'laiba@example.com',
      passwordHash: defaultPassword,
      role: 'core',
      tier: 'core',
      tagline: 'Excellence in every operation, growth in every student.',
      imageUrl: '/images/team/laiba_faiz.png',
      bio: 'Commanding the chapter\'s operations and ensuring excellence across all events. Expert in project management and strategic communication within technical communities.',
      linkedin: '#',
      github: '#',
      isActive: true,
      skills: {
        create: [
          { skill: 'Operations' },
          { skill: 'Strategic Leadership' },
          { skill: 'Public Relations' },
        ],
      },
      contributions: {
        create: [
          { title: 'Orchestrated all chapter internal operations' },
          { title: 'Managed cross-domain coordination for major events' },
          { title: 'Ensured compliance with official Google Chapter standards' },
          { title: 'Streamlined the core team communication workflow' },
        ],
      },
    },
  });

  const junaid = await prisma.member.upsert({
    where: { slug: 'junaid-mehmood' },
    update: {},
    create: {
      slug: 'junaid-mehmood',
      name: 'Junaid Mehmood',
      email: 'junaid@example.com',
      passwordHash: defaultPassword,
      role: 'core',
      tier: 'core',
      tagline: 'Transparency and quality are the foundations of community.',
      imageUrl: '/images/team/junaid_mehmood.png',
      bio: 'The backbone of the chapter\'s documentation and official correspondence. Ensuring transparency and high-quality standards for every GDGoC output.',
      linkedin: '#',
      github: '#',
      isActive: true,
      skills: {
        create: [
          { skill: 'Documentation' },
          { skill: 'Administration' },
          { skill: 'Logic' },
        ],
      },
      contributions: {
        create: [
          { title: 'Lead the formal documentation for all 2026 events' },
          { title: 'Maintained official correspondence with global GDG leads' },
          { title: 'Headed the internal audit for project feasibility' },
          { title: 'Co-organized the membership recruitment drive' },
        ],
      },
    },
  });

  const tashfeen = await prisma.member.upsert({
    where: { slug: 'm-tashfeen' },
    update: {},
    create: {
      slug: 'm-tashfeen',
      name: 'M. Tashfeen',
      email: 'tashfeen@example.com',
      passwordHash: defaultPassword,
      role: 'core',
      tier: 'core',
      tagline: 'Turning complex logistics into seamless experiences.',
      imageUrl: '/images/team/m_tashfeen.png',
      bio: 'Optimizing the chapter\'s workflow and managing large-scale event logistics with precision.',
      linkedin: '#',
      github: '#',
      isActive: true,
      skills: {
        create: [
          { skill: 'Logistics' },
          { skill: 'Budgeting' },
          { skill: 'Mgmt' },
        ],
      },
      contributions: {
        create: [
          { title: 'Managed onsite logistics for major technical workshops' },
          { title: 'Coordinated with venue and equipment providers' },
          { title: 'Ensured precise resource allocation for the bootcamp' },
          { title: 'Implemented high-efficiency event check-in systems' },
        ],
      },
    },
  });

  const ismail = await prisma.member.upsert({
    where: { slug: 'ismail' },
    update: {},
    create: {
      slug: 'ismail',
      name: 'Muhammad Ismail',
      email: 'ismail@example.com',
      passwordHash: defaultPassword,
      role: 'member',
      tier: 'domain',
      tagline: 'Writing code that scales, building apps that impact.',
      imageUrl: '/images/team/m_ismail.jpeg',
      bio: 'Expert in full-stack JavaScript and mobile application development. Ismail leads the technical workshops and mentors students on complex project architectures.',
      github: 'https://github.com/m-ismail-99',
      linkedin: 'https://linkedin.com/in/m-ismail',
      isActive: true,
      skills: {
        create: [
          { skill: 'Next.js' },
          { skill: 'Node.js' },
          { skill: 'React Native' },
          { skill: 'PostgreSQL' },
        ],
      },
      contributions: {
        create: [
          { title: 'Lead Frontend engineer for the official chapter site' },
          { title: 'Conducted 5+ workshops on Next.js 15 and App Router' },
          { title: 'Mentored student teams for the Solution Challenge' },
          { title: 'Implemented the chapter\'s automated event registration portal' },
        ],
      },
    },
  });

  await prisma.member.upsert({
    where: { slug: 'manahil-mirza' },
    update: {},
    create: {
      slug: 'manahil-mirza',
      name: 'Manahil Mirza',
      email: 'manahil@example.com',
      passwordHash: defaultPassword,
      role: 'member',
      tier: 'domain',
      tagline: 'Finding the story within the data.',
      imageUrl: '/images/team/manahil_mirza.png',
      bio: 'Driving the Data Science vertical with a focus on Pandas, NumPy, and predictive modeling.',
      linkedin: '#',
      github: '#',
      isActive: true,
      skills: { create: [{ skill: 'Python' }, { skill: 'Pandas' }, { skill: 'Matplotlib' }, { skill: 'SQL' }] },
      contributions: {
        create: [
          { title: 'Launched the Data Science 101 series' },
          { title: 'Led the regional Data-thon for student solvers' },
          { title: 'Created open-source datasets for student practice' },
          { title: 'Mentored participants in the Kaggle Challenge 2026' },
        ],
      },
    },
  });

  await prisma.member.upsert({
    where: { slug: 'maleeha-zulfiqr' },
    update: {},
    create: {
      slug: 'maleeha-zulfiqr',
      name: 'Maleeha Zulfiqar',
      email: 'maleeha@example.com',
      passwordHash: defaultPassword,
      role: 'member',
      tier: 'domain',
      tagline: 'Exploring the frontier of Artificial Intelligence.',
      imageUrl: '/images/team/maleeha_zulfiqr.png',
      bio: 'Leading our deep dive into the world of Large Language Models and Generative AI tools.',
      github: '#',
      linkedin: '#',
      isActive: true,
      skills: { create: [{ skill: 'Gemini API' }, { skill: 'PyTorch' }, { skill: 'Prompt Eng' }] },
      contributions: {
        create: [
          { title: 'Conducted the \'Build with AI\' global series locally' },
          { title: 'Led specialized workshops on Gemini API integration' },
          { title: 'Evaluated AI-based projects for Chapter hackathons' },
          { title: 'Developed custom GPTs for chapter internal automation' },
        ],
      },
    },
  });

  await prisma.member.upsert({
    where: { slug: 'ayesha-akhtar' },
    update: {},
    create: {
      slug: 'ayesha-akhtar',
      name: 'Ayesha Akhtar',
      email: 'ayesha@example.com',
      passwordHash: defaultPassword,
      role: 'member',
      tier: 'domain',
      tagline: 'Event management refined through precision.',
      imageUrl: '/images/team/ayesha_akhtar.png',
      bio: 'Crafting memorable, high-impact technical experiences for the CUI Wah community.',
      linkedin: '#',
      github: '#',
      isActive: true,
      skills: { create: [{ skill: 'Event Planning' }, { skill: 'PR' }, { skill: 'Marketing' }] },
      contributions: {
        create: [
          { title: 'Managed the logistics for the Cloud Study Jam' },
          { title: 'Successfully secured 10+ student partnership for events' },
          { title: 'Coordinated with Google Developer Experts for guest talks' },
          { title: 'Head of the Chapter\'s flagship Gala Night' },
        ],
      },
    },
  });

  await prisma.member.upsert({
    where: { slug: 'm-yousaf' },
    update: {},
    create: {
      slug: 'm-yousaf',
      name: 'Muhammad Yousaf',
      email: 'yousaf@example.com',
      passwordHash: defaultPassword,
      role: 'member',
      tier: 'domain',
      tagline: 'Bringing the Google brand to life in CUI Wah.',
      imageUrl: '/images/team/m_yousasf.png',
      bio: 'Designing the visual identity of GDGoC CUI Wah with a focus on high-fidelity Google branding.',
      linkedin: '#',
      github: '#',
      isActive: true,
      skills: { create: [{ skill: 'Illustrator' }, { skill: 'Photoshop' }, { skill: 'Branding' }] },
      contributions: {
        create: [
          { title: 'Designed all official event branding and merch' },
          { title: 'Created the UI assets for the chapter portal' },
          { title: 'Managed the visual consistency of all social platforms' },
          { title: 'Leader of the Visual Arts student domain' },
        ],
      },
    },
  });

  await prisma.member.upsert({
    where: { slug: 'fatima-qureshi' },
    update: {},
    create: {
      slug: 'fatima-qureshi',
      name: 'Fatima Qureshi',
      email: 'fatima@example.com',
      passwordHash: defaultPassword,
      role: 'member',
      tier: 'domain',
      tagline: 'Amplifying the chapter\'s impact across digital platforms.',
      imageUrl: '/images/team/fatima_qureshi.png',
      bio: 'Managing our digital footprint and ensuring our campus impact reaches a global audience.',
      linkedin: '#',
      github: '#',
      isActive: true,
      skills: { create: [{ skill: 'Strategy' }, { skill: 'Copywriting' }, { skill: 'SEO' }] },
      contributions: {
        create: [
          { title: 'Increased chapter social reach by 200% in 6 months' },
          { title: 'Created the \'Student Spotlight\' series' },
          { title: 'Managed the official Chapter Instagram and LinkedIn portals' },
          { title: 'Developed the chapter\'s digital marketing strategy' },
        ],
      },
    },
  });

  await prisma.member.upsert({
    where: { slug: 'alisha-fatima' },
    update: {},
    create: {
      slug: 'alisha-fatima',
      name: 'Alisha Fatima',
      email: 'alisha@example.com',
      passwordHash: defaultPassword,
      role: 'member',
      tier: 'domain',
      tagline: 'Inclusivity is the catalyst for innovation.',
      imageUrl: '/images/team/Alisha_fatima.png',
      bio: 'Empowering female student developers and launching initiatives to promote inclusivity in tech.',
      linkedin: '#',
      github: '#',
      isActive: true,
      skills: { create: [{ skill: 'Lead Generation' }, { skill: 'Inclusivity' }, { skill: 'Logic' }] },
      contributions: {
        create: [
          { title: 'Established the WiT domain at CUI Wah' },
          { title: 'Organized the regional International Women\'s Day event' },
          { title: 'Mentored female students on career growth in technology' },
          { title: 'Initiated the WiT peer-learning circles' },
        ],
      },
    },
  });

  await prisma.member.upsert({
    where: { slug: 'saad-ali' },
    update: {},
    create: {
      slug: 'saad-ali',
      name: 'Saad Ali',
      email: 'saad@example.com',
      passwordHash: defaultPassword,
      role: 'member',
      tier: 'domain',
      tagline: 'Building a home for every student developer.',
      imageUrl: '/images/team/saad_ali.png',
      bio: 'Building a thriving peer-to-peer ecosystem where every developer feels at home.',
      linkedin: '#',
      github: '#',
      isActive: true,
      skills: { create: [{ skill: 'Public Relations' }, { skill: 'Engagement' }, { skill: 'Slack Management' }] },
      contributions: {
        create: [
          { title: 'Managed the community engagement for 1000+ members' },
          { title: 'Facilitated the peer-to-peer developer helpdesk' },
          { title: 'Lead the onboard process for all new chapter members' },
          { title: 'Curates the chapter\'s internal newsletter' },
        ],
      },
    },
  });

  await prisma.member.upsert({
    where: { slug: 'adeel' },
    update: {},
    create: {
      slug: 'adeel',
      name: 'Adeel Asghar',
      email: 'adeel@example.com',
      passwordHash: defaultPassword,
      role: 'member',
      tier: 'domain',
      tagline: 'Architecture, logic, and clean code above all.',
      imageUrl: '/images/team/adeel_asghar.png',
      bio: 'Overseeing the technical direction of all student-led projects and ensuring code quality across the chapter.',
      github: '#',
      linkedin: '#',
      isActive: true,
      skills: { create: [{ skill: 'C++' }, { skill: 'System Architecture' }, { skill: 'Git Flow' }] },
      contributions: {
        create: [
          { title: 'Technical lead for all chapter production tools' },
          { title: 'Conducted code review sessions for student projects' },
          { title: 'Managed the chapter GitHub organization' },
          { title: 'Leading the solution challenge development track' },
        ],
      },
    },
  });

  await prisma.member.upsert({
    where: { slug: 'zohaib-arif' },
    update: {},
    create: {
      slug: 'zohaib-arif',
      name: 'Zohaib Arif',
      email: 'zohaib@example.com',
      passwordHash: defaultPassword,
      role: 'member',
      tier: 'domain',
      tagline: 'Web & App Co-Lead',
      imageUrl: '/images/team/zohaib_arif.png',
      bio: 'Co-Leading the Web & App Development track, building accessible web applications and mentoring chapter developers.',
      github: '#',
      linkedin: '#',
      isActive: true,
      skills: { create: [{ skill: 'React' }, { skill: 'Next.js' }, { skill: 'JavaScript' }, { skill: 'Web Design' }] },
      contributions: {
        create: [
          { title: 'Co-leading hands-on frontend development workshops' },
          { title: 'Mentoring chapter students on web architectures' },
        ],
      },
    },
  });

  console.log('✅ Members seeded');

  // ─── EVENTS ───────────────────────────────────────────────────────────────
  console.log('📅 Seeding events...');

  // ─── HACKATHONS & COMPETITIONS ───
  await prisma.event.upsert({
    where: { slug: 'hack-the-vibe-2026' },
    update: {},
    create: {
      slug: 'hack-the-vibe-2026',
      title: 'HackTheVibe 2026 – Technical Session on Open Source Innovation',
      description: 'The GDG On Campus COMSATS Wah (GDGoC CUI Wah) successfully organized HackTheVibe 2026, a dynamic and insightful open-source focused technical session followed by an engaging panel discussion at the Auditorium, COMSATS University Islamabad, Wah Campus on February 13, 2026. HackTheVibe 2026 was designed to promote the spirit of open-source collaboration, innovation, and community-driven development, bridging the gap between academia and industry by bringing together students, developers, and industry experts under one platform. The event featured distinguished GitHub Campus Experts and industry professionals who shared real-world insights on AI SecOps, DevOps, Personal Branding, and Open Source contributions, followed by an interactive panel discussion and merchandise distribution.',
      type: 'CONFERENCE',
      location: 'Auditorium, COMSATS University Islamabad, Wah Campus',
      locationType: 'In-person',
      date: new Date('2026-02-13T10:00:00.000Z'),
      imageUrl: '/images/chapter/hackthevibe-team.png',
      badgeUrl: '/images/chapter_photos/sumama_talk.png',
      isPublished: true,
      tags: { create: [{ tag: 'Open Source' }, { tag: 'AI SecOps' }, { tag: 'DevOps' }, { tag: 'GitHub Campus Expert' }, { tag: 'Career Guidance' }, { tag: 'Panel Discussion' }, { tag: 'Cyber Security' }] },
      agendaItems: {
        create: [
          { order: 1, time: '10:00 AM', title: 'Opening Remarks & Chapter Welcome', speaker: 'GDGoC CUI Wah Leadership', description: 'Introduction to HackTheVibe 2026, chapter mission, and the spirit of open source innovation.' },
          { order: 2, time: '10:20 AM', title: 'Visibility That Pays: Building a Brand That Opens Doors', speaker: 'Munsif Raza (Mentor & Keynote Speaker)', description: 'Strategic insights on personal branding, portfolio building, and unlocking career opportunities through tech visibility.' },
          { order: 3, time: '11:00 AM', title: 'Importance and Impact of Open Source in Modern Software Development', speaker: 'Farhan Ashraf (AI SecOps Engineer @ Systems Limited & GitHub Campus Expert)', description: 'Emerging trends in AI, Cyber Security, the role of AI Security Operations (AI SecOps) in enterprise environments, and global contribution.' },
          { order: 4, time: '11:45 AM', title: 'My Philosophy of University Life & Career Readiness', speaker: 'Munsif Raza (Founder & CEO @ HyperNeuro & GitHub Campus Expert)', description: 'Navigating academic journeys, building practical industry skills, and developing an entrepreneurial mindset.' },
          { order: 5, time: '12:30 PM', title: 'Reimagining Open Source in the Age of AI with Kiro.dev', speaker: 'Sumama Zaeem (Senior DevOps Engineer @ Tkxel & GitHub Campus Expert)', description: 'DevOps best practices, industry workflows, and leveraging AI-powered development tools for rapid open-source innovation.' },
          { order: 6, time: '01:15 PM', title: 'Interactive Panel Discussion & Student Q&A', speaker: 'Farhan Ashraf, Munsif Raza, Sumama Zaeem', description: 'Direct audience engagement clarifying misconceptions and exploring career paths in AI, Cyber Security, DevOps, and software engineering.' },
          { order: 7, time: '02:00 PM', title: 'Exclusive Goodies & Merchandise Distribution', speaker: 'Executive Team', description: 'Distribution of official event merchandise and networking session with industry leaders.' },
        ],
      },
    },
  });

  await prisma.event.upsert({
    where: { slug: 'hack-data-v1' },
    update: {},
    create: {
      slug: 'hack-data-v1',
      title: 'Hack Data V1: Online Solution Hackathon',
      description: 'Hack Data V1 was a dynamic and competitive 48-hour online hackathon bringing together students from across all eight semesters. Participants identified unique problem statements and developed tangible, real-world solutions in the form of highly visual and functional websites or applications. Projects underwent rigorous assessment by judge Farhan Ashraf on technical execution, exceptional presentations, and product visuals, concluding with a celebratory award ceremony distributing a PKR 15,000 cash prize pool (PKR 10,000 for winner, PKR 5,000 for runner-up).',
      type: 'HACKATHON',
      location: 'Online (Discord & Google Meet)',
      locationType: 'Online',
      date: new Date('2026-04-22T09:00:00.000Z'),
      imageUrl: '/images/chapter/hackdata-winner.png',
      badgeUrl: '/images/chapter_photos/hackdata_cert.png',
      isPublished: true,
      tags: { create: [{ tag: 'Hackathon' }, { tag: 'Hack Data' }, { tag: 'Web Development' }, { tag: 'Problem Solving' }, { tag: 'Data Analytics' }, { tag: 'Prize Pool' }, { tag: 'Competition' }] },
      agendaItems: {
        create: [
          { order: 1, time: 'Day 1 (09:00 AM)', title: 'Hackathon Kickoff & Problem Statements Briefing', speaker: 'Farhan Ashraf (AI SecOps Engineer & GitHub Campus Expert)', description: 'Announcement of tracks, judging rubrics, submission requirements, and technical guidelines.' },
          { order: 2, time: 'Day 1 (10:00 AM)', title: '48-Hour Hacking Sprint & Mentorship', speaker: 'Domain Leads & Mentors', description: 'Intensive team development, architecture reviews, and debugging support.' },
          { order: 3, time: 'Day 2 (02:00 PM)', title: 'Project Submission & Evaluation Freeze', speaker: 'Judging Panel', description: 'Code repositories and live deployment reviews.' },
          { order: 4, time: 'Day 2 (04:00 PM)', title: 'Live Team Demonstrations & Pitch Round', speaker: 'Participating Teams', description: 'Final project pitches and live system demonstrations to judges.' },
          { order: 5, time: 'Day 2 (06:00 PM)', title: 'Award Ceremony & PKR 15,000 Prize Distribution', speaker: 'Farhan Ashraf & Campus Leadership', description: 'Awarding PKR 10,000 to the winning team and PKR 5,000 to the runner-up with official certificates.' },
        ],
      },
    },
  });

  await prisma.event.upsert({
    where: { slug: 'mtm-ai-hackathon' },
    update: {},
    create: {
      slug: 'mtm-ai-hackathon',
      title: 'MTM (Mind-to-Machine) AI Hackathon',
      description: 'First-ever national-level AI Hackathon organized at COMSATS University Islamabad, Wah Campus. Bringing together students, developers, and AI enthusiasts across Pakistan to build cutting-edge solutions in Generative AI, Vibe Coding, and Agentic AI systems.',
      type: 'HACKATHON',
      location: 'COMSATS University Islamabad, Wah Campus',
      locationType: 'In-person',
      date: new Date('2025-12-15T09:00:00.000Z'),
      imageUrl: '/images/chapter/mtm-winner.png',
      badgeUrl: '/images/chapter/mtm-winner.png',
      isPublished: true,
      tags: { create: [{ tag: 'Hackathon' }, { tag: 'Artificial Intelligence' }, { tag: 'Generative AI' }, { tag: 'Vibe Coding' }, { tag: 'Agentic AI' }] },
      agendaItems: {
        create: [
          { order: 1, time: '09:00 AM', title: 'Opening Session & Hackathon Briefing', speaker: 'Ubaid Ghazi (Campus Lead)', description: 'Introduction to problem statements, evaluation criteria, and Generative AI workflows.' },
          { order: 2, time: '10:30 AM', title: 'Keynote: Generative AI & Agentic Systems', speaker: 'Industry Guest Speaker', description: 'Deep dive into Vibe Coding, rapid prototyping, and building scalable agentic systems.' },
          { order: 3, time: '11:30 AM', title: 'Hacking & Development Phase', speaker: 'Mentors & Domain Leads', description: 'Continuous ideation, coding, debugging, and deployment of AI solutions.' },
          { order: 4, time: '05:00 PM', title: 'Project Demonstrations & Pitching', speaker: 'Participating Teams', description: 'Live demonstrations to the judging panel.' },
          { order: 5, time: '06:30 PM', title: 'Prize Distribution & Closing Ceremony', speaker: 'Faculty Head & Core Team', description: 'Awarding Winner (PKR 30,000) and Runner-Up (PKR 10,000) with official shields and merchandise.' },
        ],
      },
    },
  });

  await prisma.event.upsert({
    where: { slug: 'visio-spark-programming-competition' },
    update: {},
    create: {
      slug: 'visio-spark-programming-competition',
      title: 'Visio Spark — On-Spot Programming Competition',
      description: 'A core competitive programming component of Visio Spark evaluating real-time problem-solving, critical algorithmic thinking, and coding speed in a high-pressure secure environment on HackerRank with 53 registered teams.',
      type: 'HACKATHON',
      location: 'Secure Computing Labs, COMSATS University Islamabad, Wah Campus',
      locationType: 'In-person',
      date: new Date('2025-11-18T10:00:00.000Z'),
      imageUrl: '/images/chapter_photos/sumama_talk.png',
      badgeUrl: '/images/chapter_photos/sumama_talk.png',
      isPublished: true,
      tags: { create: [{ tag: 'Hackathon' }, { tag: 'Competitive Programming' }, { tag: 'HackerRank' }, { tag: 'Algorithms' }] },
      agendaItems: {
        create: [
          { order: 1, time: '10:00 AM', title: 'Lab Setup & Security Briefing', speaker: 'Alisha Fatima & Organizing Team', description: 'Configuration of Safe Exam Browser (SEB) and environment verification.' },
          { order: 2, time: '10:30 AM', title: 'Live Coding Contest Begins', speaker: 'HackerRank Automated Arena', description: 'Real-time algorithmic and data structure problem-solving under strict time constraints.' },
          { order: 3, time: '01:30 PM', title: 'Leaderboard Evaluation & Closing', speaker: 'Ubaid-Ur-Rehman & Core Leads', description: 'Final leaderboard review and announcement of top performers.' },
        ],
      },
    },
  });

  // ─── BOOTCAMPS & WORKSHOPS ───
  await prisma.event.upsert({
    where: { slug: 'google-ai-tools-vibe-coding-sp26' },
    update: {},
    create: {
      slug: 'google-ai-tools-vibe-coding-sp26',
      title: 'Google AI Tools & Vibe Coding – SP26 Closing Ceremony',
      description: 'GDGoC CUI Wah successfully organized a comprehensive two-session event as part of the Spring 2026 (SP26) semester activities, exploring modern AI tools, vibe coding, prompt engineering frameworks, and celebrating the semester\'s achievements with an official closing ceremony and prize distribution. Session 01 explored Google AI Studio and iterative Vibe Coding led by Abdur Raheem with a 4-step prompt framework, followed by the GDG Hackathon announcement. Session 02 concluded the semester with guest keynote sessions by Farhan Ashraf and Dr. Wasif on Anti-Gravity, Vibe Coding, Google Gemini & NotebookLM, and awarded top 3 competition winners.',
      type: 'WORKSHOP',
      location: 'Room B-25, COMSATS University Islamabad, Wah Campus & Online',
      locationType: 'Hybrid',
      date: new Date('2026-04-28T11:00:00.000Z'),
      imageUrl: '/images/chapter_photos/award_presentation.png',
      badgeUrl: '/images/chapter/keynote-speaker.png',
      isPublished: true,
      tags: { create: [{ tag: 'Google AI Studio' }, { tag: 'Vibe Coding' }, { tag: 'Prompt Engineering' }, { tag: 'Gemini' }, { tag: 'NotebookLM' }, { tag: 'Awards' }, { tag: 'Closing Ceremony' }] },
      agendaItems: {
        create: [
          { order: 1, time: 'Session 1 (07:00 PM)', title: 'Google AI Studio & Vibe Coding Introduction', description: 'Exploring AI-assisted rapid development workflows and prototyping with Google AI Studio.' },
          { order: 2, time: 'Session 1 (07:45 PM)', title: '4-Step Prompt Engineering Framework', description: 'Persuasion (role framing), Task (defining action), Context in Detail, and Output with Constraints.' },
          { order: 3, time: 'Session 1 (08:30 PM)', title: 'GDG Hackathon Announcement & Guidelines', speaker: 'Ubaid ur Rehman (Campus Lead)', description: 'Hackathon timeline, rules, team formation, evaluation criteria, and interactive Q&A.' },
          { order: 4, time: 'Session 2 (11:00 AM)', title: 'Guest Keynote: Anti-Gravity & Emerging Tech', speaker: 'Farhan Ashraf (AI SecOps Engineer & GitHub Campus Expert)', description: 'Theoretical foundations of anti-gravity, scientific significance, and future aerospace applications.' },
          { order: 5, time: 'Session 2 (11:45 AM)', title: 'Hands-on AI Tools: Google Gemini & NotebookLM', speaker: 'Farhan Ashraf', description: 'Practical demonstrations for research, automated note-taking, and content generation.' },
          { order: 6, time: 'Session 2 (12:30 PM)', title: 'SP26 Semester Awards & Prize Distribution', speaker: 'Dr. Wasif & Core Team', description: 'Awarding 1st Place (Adil & Ismail), 2nd Place (Manahil), and 2nd Runner-Up (Fiza Batool) with shields and certificates.' },
        ],
      },
    },
  });

  await prisma.event.upsert({
    where: { slug: 'agentic-ai-workshop' },
    update: {},
    create: {
      slug: 'agentic-ai-workshop',
      title: 'Agentic AI Workshop: Building Autonomous Systems with ADK',
      description: 'An exciting hands-on workshop on April 10, 2026, exploring autonomous AI systems. Designed for 1st–8th semester students, the session introduced foundational concepts of artificial intelligence agents, focusing on the core mechanics of how to design, program, and deploy them using Agent Development Kit (ADK). Featured interactive coding sessions and practical demonstrations where students built and tested their own AI agents with automated reasoning, tool use, and dynamic decision-making.',
      type: 'WORKSHOP',
      location: 'Online (Google Meet) / COMSATS University Islamabad, Wah Campus',
      locationType: 'Online',
      date: new Date('2026-04-10T10:00:00.000Z'),
      imageUrl: '/images/chapter_photos/award_presentation.png',
      badgeUrl: '/images/chapter/keynote-speaker.png',
      isPublished: true,
      tags: { create: [{ tag: 'Agentic AI' }, { tag: 'Autonomous Agents' }, { tag: 'ADK' }, { tag: 'Artificial Intelligence' }, { tag: 'Tool Use' }, { tag: 'Reasoning' }, { tag: 'Machine Learning' }] },
      agendaItems: {
        create: [
          { order: 1, time: '10:00 AM', title: 'Foundations of Autonomous Systems & Agent Mechanics', speaker: 'Ubaid Ghazi', description: 'Core principles of AI agents, perception-action loops, memory structures, and agent architecture.' },
          { order: 2, time: '10:45 AM', title: 'Automated Reasoning, Tool Use & Decision-Making', speaker: 'Ubaid Ghazi', description: 'Integrating tools, function calling, external APIs, and multi-step reasoning processes.' },
          { order: 3, time: '11:30 AM', title: 'Live Coding Lab: Building AI Agents with ADK', speaker: 'Ubaid Ghazi', description: 'Hands-on practical development of custom intelligent agents from scratch.' },
          { order: 4, time: '12:30 PM', title: 'Student Agent Testing & Future ML Initiatives', speaker: 'Ubaid Ghazi', description: 'Testing student-built agents, real-time evaluation, and upcoming automation tracks.' },
        ],
      },
    },
  });

  await prisma.event.upsert({
    where: { slug: 'web-development-bootcamp-sp26' },
    update: {},
    create: {
      slug: 'web-development-bootcamp-sp26',
      title: 'Web Development Bootcamp (React & Modern Frontend)',
      description: 'A 3-day hands-on bootcamp organized by GDGoC CUI Wah to teach modern web development from basic to expert level. The sessions provided a thorough exploration of modern frontend engineering, focusing on the fundamentals of the React library, component-based architecture, state management, and efficient UI rendering. Featured live coding demonstrations, interactive technical walkthroughs, Q&A sessions, and a live project showcase.',
      type: 'BOOTCAMP',
      location: 'COMSATS University Islamabad, Wah Campus / Online (Google Meet)',
      locationType: 'Online',
      date: new Date('2026-03-06T18:00:00.000Z'),
      imageUrl: '/images/events/react-bootcamp.jpg',
      badgeUrl: '/images/events/react-bootcamp.jpg',
      isPublished: true,
      tags: { create: [{ tag: 'Web Development' }, { tag: 'React' }, { tag: 'Frontend' }, { tag: 'JavaScript' }, { tag: 'State Management' }, { tag: 'UI/UX' }, { tag: 'Bootcamp' }] },
      agendaItems: {
        create: [
          { order: 1, time: 'Day 1 (06:00 PM)', title: 'React Fundamentals & Component Architecture', speaker: 'Muhammad Ismail (Lead Web & App Development)', description: 'Modern frontend ecosystem, JSX syntax, functional components, props, and modular design.' },
          { order: 2, time: 'Day 2 (06:00 PM)', title: 'State Management, Hooks & Rendering Lists', speaker: 'Muhammad Ismail', description: 'Deep dive into useState, useEffect, conditional rendering, list keys, and event handling.' },
          { order: 3, time: 'Day 3 (06:00 PM)', title: 'Live Project Showcase & Scalable Architecture', speaker: 'Muhammad Ismail', description: 'Live coding a dynamic web application, performance optimization, collaborative Q&A, and deployment.' },
        ],
      },
    },
  });

  await prisma.event.upsert({
    where: { slug: 'data-science-bootcamp-sp26' },
    update: {},
    create: {
      slug: 'data-science-bootcamp-sp26',
      title: 'Data Science Bootcamp: From Foundations to Predictive Modeling',
      description: 'A comprehensive 5-day dive into analytics and machine learning organized by GDGoC CUI Wah. The bootcamp guided students through the complete data lifecycle: starting with Python foundations and data ingestion, progressing through rigorous data cleaning, preprocessing, exploratory data analysis (EDA), and data visualization, and culminating in advanced feature engineering and practical predictive model building and evaluation.',
      type: 'BOOTCAMP',
      location: 'Online (Google Meet)',
      locationType: 'Online',
      date: new Date('2026-03-11T21:30:00.000Z'),
      imageUrl: '/images/chapter_photos/audience_students.png',
      badgeUrl: '/images/chapter_photos/fatima_maleeha_session.png',
      isPublished: true,
      tags: { create: [{ tag: 'Data Science' }, { tag: 'Python' }, { tag: 'Machine Learning' }, { tag: 'EDA' }, { tag: 'Feature Engineering' }, { tag: 'Data Analytics' }, { tag: 'Pandas' }] },
      agendaItems: {
        create: [
          { order: 1, time: 'Day 1 (09:30 PM)', title: 'Python Foundations & Data Ingestion Pipeline', speaker: 'Danyal Ahmad & Manahil Mirza', description: 'Introduction to data science pipelines, Python syntax, data structures, and data ingestion techniques.' },
          { order: 2, time: 'Day 2 (09:30 PM)', title: 'Data Cleaning & Preprocessing with Pandas', speaker: 'Manahil Mirza', description: 'Missing value handling, outlier detection, data filtering, and transformation techniques.' },
          { order: 3, time: 'Day 3 (09:30 PM)', title: 'Exploratory Data Analysis (EDA) & Data Visualization', speaker: 'Danyal Ahmad', description: 'Statistical distribution plotting, heatmaps, correlations, and visual storytelling with Matplotlib/Seaborn.' },
          { order: 4, time: 'Day 4 (09:30 PM)', title: 'Advanced Feature Engineering Techniques', speaker: 'Manahil Mirza', description: 'Feature scaling, encoding categorical variables, feature selection, and dataset preparation.' },
          { order: 5, time: 'Day 5 (09:30 PM)', title: 'Predictive Model Building & Performance Evaluation', speaker: 'Danyal Ahmad & Manahil Mirza', description: 'Scikit-learn supervised learning, train-test splits, cross-validation, and metrics evaluation.' },
        ],
      },
    },
  });

  await prisma.event.upsert({
    where: { slug: 'ai-kickoff-bootcamp' },
    update: {},
    create: {
      slug: 'ai-kickoff-bootcamp',
      title: 'AI Kick-off Bootcamp: Python, EDA & Machine Learning',
      description: 'A full-week intensive hands-on online bootcamp introducing students to Python for data analysis, exploratory data analysis (EDA), data cleaning, preprocessing techniques, and foundational machine learning modeling workflows.',
      type: 'BOOTCAMP',
      location: 'Online (Google Meet)',
      locationType: 'Online',
      date: new Date('2025-10-20T18:00:00.000Z'),
      imageUrl: '/images/chapter_photos/fatima_maleeha_session.png',
      badgeUrl: '/images/chapter_photos/fatima_maleeha_session.png',
      isPublished: true,
      tags: { create: [{ tag: 'Bootcamp' }, { tag: 'Artificial Intelligence' }, { tag: 'Data Science' }, { tag: 'Python' }, { tag: 'Machine Learning' }, { tag: 'EDA' }] },
      agendaItems: {
        create: [
          { order: 1, time: 'Day 1 - 2 (06:00 PM)', title: 'Python for Data Analysis & NumPy Basics', speaker: 'Ubaid-Ur-Rehman', description: 'Data structures, vectorized computation, and numerical processing fundamentals.' },
          { order: 2, time: 'Day 3 - 4 (06:00 PM)', title: 'Data Cleaning & Exploratory Data Analysis', speaker: 'Ubaid-Ur-Rehman', description: 'Pandas DataFrames, missing value imputation, and Seaborn visual exploration.' },
          { order: 3, time: 'Day 5 - 7 (06:00 PM)', title: 'Intro to Machine Learning & Model Building', speaker: 'Ubaid-Ur-Rehman', description: 'Scikit-Learn supervised models and capstone project submission.' },
        ],
      },
    },
  });

  await prisma.event.upsert({
    where: { slug: 'web-development-for-beginners' },
    update: {},
    create: {
      slug: 'web-development-for-beginners',
      title: 'Web Development for Beginners Workshop Series',
      description: 'A structured, hands-on online workshop conducted over Friday, Saturday, and Sunday nights covering HTML5 structure, CSS3 modern layout design, and JavaScript interactivity with daily assignments and official certification.',
      type: 'BOOTCAMP',
      location: 'Online (Weekend Nights)',
      locationType: 'Online',
      date: new Date('2025-10-15T19:00:00.000Z'),
      imageUrl: '/images/events/web-dev-beginners.jpg',
      badgeUrl: '/images/events/web-dev-beginners.jpg',
      isPublished: true,
      tags: { create: [{ tag: 'Bootcamp' }, { tag: 'Web Development' }, { tag: 'HTML' }, { tag: 'CSS' }, { tag: 'JavaScript' }] },
      agendaItems: {
        create: [
          { order: 1, time: 'Session 1', title: 'HTML5 Semantic Web Architecture', speaker: 'Muhammad Ismail', description: 'Structuring web pages, semantic tags, forms, and accessibility.' },
          { order: 2, time: 'Session 2', title: 'Modern CSS3: Flexbox, Grid & Animations', speaker: 'Muhammad Ismail', description: 'Styling, responsive design, fluid layouts, and component theming.' },
          { order: 3, time: 'Session 3', title: 'JavaScript Essentials & DOM Manipulation', speaker: 'Umm e Habiba', description: 'Adding interactivity, event listeners, dynamic UI, and final project guidance.' },
        ],
      },
    },
  });

  await prisma.event.upsert({
    where: { slug: 'programming-for-beginners-c-language' },
    update: {},
    create: {
      slug: 'programming-for-beginners-c-language',
      title: 'MTM (Mind to Machine) — Programming for Beginners (C Language)',
      description: 'Hands-on beginner programming bootcamp held Oct 3 – Oct 12, focusing on building strong foundations in logic, variables, control structures, loops, arrays, and algorithms in C language.',
      type: 'BOOTCAMP',
      location: 'Online (Weekend Nights)',
      locationType: 'Online',
      date: new Date('2025-10-03T19:00:00.000Z'),
      imageUrl: '/images/chapter/keynote-speaker.png',
      badgeUrl: '/images/chapter/keynote-speaker.png',
      isPublished: true,
      tags: { create: [{ tag: 'Bootcamp' }, { tag: 'C Language' }, { tag: 'MTM' }, { tag: 'Programming Fundamentals' }, { tag: 'Problem Solving' }, { tag: 'Logic Building' }] },
      agendaItems: {
        create: [
          { order: 1, time: 'Sessions 1-3 (07:00 PM)', title: 'C Syntax, Data Types & Control Flow', speaker: 'Tooba Mir', description: 'Conditionals, variables, operators, and algorithmic thinking.' },
          { order: 2, time: 'Sessions 4-6 (07:00 PM)', title: 'Loops, Arrays, and Strings', speaker: 'Tooba Mir', description: 'Iterative logic, multi-dimensional arrays, string manipulation, and exercises.' },
          { order: 3, time: 'Sessions 7-8 (07:00 PM)', title: 'Functions, Pointers & Problem Solving', speaker: 'Tooba Mir', description: 'Modular programming, memory concepts, and certificate award criteria.' },
        ],
      },
    },
  });

  await prisma.event.upsert({
    where: { slug: 'github-essentials-session' },
    update: {},
    create: {
      slug: 'github-essentials-session',
      title: 'GitHub Essentials: Version Control & Collaboration',
      description: 'Hands-on seminar introducing over 70 students to Git version control fundamentals, repository management, commit best practices, branching strategies, and team collaboration workflows on GitHub.',
      type: 'BOOTCAMP',
      location: 'COMSATS University Islamabad, Wah Campus',
      locationType: 'In-person',
      date: new Date('2025-11-26T11:00:00.000Z'),
      imageUrl: '/images/chapter_photos/sumama_zaeem.png',
      badgeUrl: '/images/chapter_photos/sumama_zaeem.png',
      isPublished: true,
      tags: { create: [{ tag: 'Bootcamp' }, { tag: 'GitHub' }, { tag: 'Git' }, { tag: 'Version Control' }, { tag: 'Open Source' }] },
      agendaItems: {
        create: [
          { order: 1, time: '11:00 AM', title: 'Introduction to Version Control Systems', speaker: 'Muhammad Ismail', description: 'Why version control matters in professional software engineering.' },
          { order: 2, time: '11:30 AM', title: 'Git Core CLI: Commits, Branches & Merging', speaker: 'Muhammad Ismail', description: 'Practical terminal workflows and conflict resolution.' },
          { order: 3, time: '12:15 PM', title: 'GitHub Collaboration & Open Source PRs', speaker: 'Muhammad Ismail', description: 'Forks, Pull Requests, Code Reviews, and GitHub Cheat Sheet distribution.' },
        ],
      },
    },
  });

  await prisma.event.upsert({
    where: { slug: 'ai-and-data-science-session' },
    update: {},
    create: {
      slug: 'ai-and-data-science-session',
      title: 'AI & Data Science Interactive Awareness Session',
      description: 'Interactive awareness seminar hosted by chapter AI leads exploring core concepts, industry trends, real-world data science pipelines, and high-growth career opportunities in Artificial Intelligence for early-semester students.',
      type: 'BOOTCAMP',
      location: 'COMSATS University Islamabad, Wah Campus',
      locationType: 'In-person',
      date: new Date('2025-10-03T11:30:00.000Z'),
      imageUrl: '/images/chapter_photos/audience_students.png',
      badgeUrl: '/images/chapter_photos/audience_students.png',
      isPublished: true,
      tags: { create: [{ tag: 'Bootcamp' }, { tag: 'Artificial Intelligence' }, { tag: 'Data Science' }, { tag: 'Career Guidance' }] },
      agendaItems: {
        create: [
          { order: 1, time: '11:30 AM', title: 'Journey into Artificial Intelligence', speaker: 'Adeel Asghar', description: 'Overview of modern AI landscape, deep learning, and practical applications.' },
          { order: 2, time: '12:15 PM', title: 'How Data Science Works: From Data to Decisions', speaker: 'Manahil Mirza', description: 'Exploratory analysis, feature engineering, and career roadmaps for students.' },
          { order: 3, time: '12:45 PM', title: 'Interactive Q&A and Student Mentorship', speaker: 'Adeel Asghar & Manahil Mirza', description: 'Open forum addressing student queries on learning pathways.' },
        ],
      },
    },
  });

  await prisma.event.upsert({
    where: { slug: 'google-community-day-2025' },
    update: {},
    create: {
      slug: 'google-community-day-2025',
      title: 'Google Community Day 2025: Official Chapter Launch',
      description: 'The inaugural launch event of the GDG On Campus CUI Wah chapter, unveiling chapter vision and mission, introducing core team leadership, featuring a keynote on Women in Tech, and concluding with a celebratory cake-cutting ceremony.',
      type: 'BOOTCAMP',
      location: 'COMSATS University Islamabad, Wah Campus',
      locationType: 'In-person',
      date: new Date('2025-09-29T10:00:00.000Z'),
      imageUrl: '/images/chapter_photos/gdg_team_group.png',
      badgeUrl: '/images/chapter_photos/gdg_team_group.png',
      isPublished: true,
      tags: { create: [{ tag: 'Bootcamp' }, { tag: 'Community' }, { tag: 'Women in Tech' }, { tag: 'Chapter Launch' }] },
      agendaItems: {
        create: [
          { order: 1, time: '10:00 AM', title: 'Welcome Address & Chapter Vision', speaker: 'Ubaid ur Rehman (Campus Lead)', description: 'Introduction to GDGoC CUI Wah mission, goals, and upcoming initiatives.' },
          { order: 2, time: '10:45 AM', title: 'Keynote: Empowering Women in Technology', speaker: 'Laiba Faiz & Alisha Fatima', description: 'Promoting diversity, inclusivity, and technical leadership on campus.' },
          { order: 3, time: '11:30 AM', title: 'Core Team Induction & Cake Cutting', speaker: 'Executive Team & Fakhir Hassan', description: 'Formal induction of team members and celebratory chapter launch.' },
        ],
      },
    },
  });


  console.log('✅ Events seeded');

  // ─── POSTS ────────────────────────────────────────────────────────────────
  console.log('📝 Seeding blog posts...');

  await prisma.post.upsert({
    where: { slug: 'getting-started-with-nextjs' },
    update: {},
    create: {
      slug: 'getting-started-with-nextjs',
      title: 'Getting Started with Next.js',
      excerpt: 'Learn the basics of the App Router and SSR.',
      body: `# Getting Started with Next.js\n\nNext.js 15 introduces the App Router, a powerful paradigm shift from the Pages Router. In this article, we explore the foundations of Server-Side Rendering (SSR) and how the App Router simplifies data fetching.\n\n## What is the App Router?\n\nThe App Router uses React Server Components by default, allowing components to fetch data directly without useEffect or useState. This results in faster page loads and a better developer experience.\n\n## Key Concepts\n\n- **Server Components**: Run on the server, zero client JS by default.\n- **Client Components**: Opt-in with 'use client' directive.\n- **Layouts**: Persistent UI that wraps pages without re-rendering.\n- **Loading UI**: Instant loading states with Suspense boundaries.\n\n## Getting Started\n\n\`\`\`bash\nnpx create-next-app@latest my-app\ncd my-app\nnpm run dev\n\`\`\`\n\nHappy building!`,
      coverImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=1200',
      isPublished: true,
      authorId: ismail.id,
      createdAt: new Date('2026-02-10T09:00:00Z'),
      tags: { create: [{ tag: 'Next.js' }, { tag: 'Web Dev' }, { tag: 'React' }] },
    },
  });

  await prisma.post.upsert({
    where: { slug: 'our-first-hackathon-experience' },
    update: {},
    create: {
      slug: 'our-first-hackathon-experience',
      title: 'Our First Hackathon Experience',
      excerpt: 'A recap of the excitement and projects built.',
      body: `# Our First Hackathon Experience\n\nThe GDGoC CUI Wah chapter hosted its inaugural hackathon in January 2026, bringing together 120+ students from across the campus.\n\n## The Challenge\n\nTeams were given 24 hours to build solutions addressing real problems in education, healthcare, and sustainability using Google technologies.\n\n## Highlights\n\n- **15 teams** competed with innovative solutions.\n- **Best Project**: An AI-powered study assistant using Gemini API.\n- **Runner-up**: A Flutter app for campus resource booking.\n- **Community Award**: A sustainability tracker with Firebase Realtime Database.\n\n## Lessons Learned\n\nOur chapter learned that community support, mentorship, and accessible tooling are the keys to a successful hackathon. The energy in the room was electric — and we can't wait to do it again!\n\n— The GDGoC CUI Wah Team`,
      coverImage: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=1200',
      isPublished: true,
      authorId: ubaid.id,
      createdAt: new Date('2026-01-20T10:00:00Z'),
      tags: { create: [{ tag: 'Hackathon' }, { tag: 'Community' }, { tag: 'Events' }] },
    },
  });

  await prisma.post.upsert({
    where: { slug: 'why-android-development-matters' },
    update: {},
    create: {
      slug: 'why-android-development-matters',
      title: 'Why Android Development Matters',
      excerpt: 'Exploring the modern Android ecosystem.',
      body: `# Why Android Development Matters\n\nWith over 3 billion active Android devices worldwide, mobile development — particularly Android — remains one of the most impactful skills a developer can have.\n\n## The Modern Android Stack\n\nAndroid development has evolved dramatically. The modern stack includes:\n\n- **Jetpack Compose**: Declarative UI that makes building beautiful interfaces intuitive.\n- **Material Design 3**: Google's latest design system for cohesive, accessible apps.\n- **Kotlin Coroutines**: Elegant asynchronous programming without callback hell.\n- **Firebase**: Backend-as-a-service for auth, real-time data, and cloud functions.\n\n## Why Students Should Care\n\nFor students in Pakistan, Android development opens doors to international freelancing, product companies, and Google-adjacent careers. The GDGoC chapter offers hands-on workshops every semester.\n\n## Getting Started\n\nDownload Android Studio, complete the Jetpack Compose Basics codelab on developers.google.com, and join our Android domain!`,
      coverImage: 'https://images.unsplash.com/photo-1607252650355-f7fd0460ccdb?auto=format&fit=crop&q=80&w=1200',
      isPublished: true,
      authorId: kashif.id,
      createdAt: new Date('2026-01-05T08:00:00Z'),
      tags: { create: [{ tag: 'Android' }, { tag: 'Mobile' }, { tag: 'Kotlin' }] },
    },
  });

  console.log('✅ Posts seeded');

  // ─── RESOURCE TRACKS ──────────────────────────────────────────────────────
  console.log('🗺️ Seeding resource tracks...');

  await prisma.resourceTrack.create({
    data: {
      name: 'Fullstack Mastery',
      tag: 'Web Systems',
      tagColor: '#4285F4',
      description: 'Building the modern web from pixels to database scaling.',
      steps: {
        create: [
          { stepNum: '01 / Foundation', title: 'The Browser Engine', description: 'DOM manipulation, CSS architecture, and semantic accessibility.', order: 1 },
          { stepNum: '02 / Reactivity', title: 'Component Logic', description: 'State management, hooks, and reactive UI patterns with React and Next.js.', order: 2 },
          { stepNum: '03 / Edge', title: 'Modern Backends', description: 'Serverless functions, edge caching, and real-time data flow.', order: 3 },
          { stepNum: '04 / Deploy', title: 'Scale & Security', description: 'Auth patterns, performance auditing, and CI/CD pipelines.', order: 4 },
          { stepNum: '05 / Data', title: 'Databases & ORM', description: 'Relational vs NoSQL, query optimization, and schema design with Prisma.', order: 5 },
          { stepNum: '06 / Testing', title: 'Quality Engineering', description: 'Unit, integration, and end-to-end testing with Jest and Playwright.', order: 6 },
        ],
      },
    },
  });

  await prisma.resourceTrack.create({
    data: {
      name: 'Applied AI',
      tag: 'Intelligence',
      tagColor: '#EA4335',
      description: 'Moving beyond prompts into building intelligent agentic systems.',
      steps: {
        create: [
          { stepNum: '01 / Logic', title: 'Pythonic Data', description: 'Scientific computing with NumPy and large-scale data processing with Pandas.', order: 1 },
          { stepNum: '02 / Modeling', title: 'Neural Networks', description: 'Understanding architecture, loss functions, and backpropagation from scratch.', order: 2 },
          { stepNum: '03 / LLM Ops', title: 'Retrieval (RAG)', description: 'Connecting models to private data using vector databases like Pinecone and Weaviate.', order: 3 },
          { stepNum: '04 / Vision', title: 'Computer Vision', description: 'Image classification, object detection, and segmentation with PyTorch and OpenCV.', order: 4 },
          { stepNum: '05 / Deploy', title: 'ML in Production', description: 'Model serving, monitoring drift, and building inference APIs with FastAPI.', order: 5 },
          { stepNum: '06 / Agents', title: 'Agentic Systems', description: 'Tool-calling, memory, and multi-agent orchestration using LangChain and LangGraph.', order: 6 },
        ],
      },
    },
  });

  await prisma.resourceTrack.create({
    data: {
      name: 'Cloud Engineering',
      tag: 'Cloud & DevOps',
      tagColor: '#34A853',
      description: 'Architecting resilient, scalable infrastructure on the modern cloud.',
      steps: {
        create: [
          { stepNum: '01 / Fundamentals', title: 'Cloud Primitives', description: 'Compute, storage, and networking concepts across GCP, AWS, and Azure.', order: 1 },
          { stepNum: '02 / Containers', title: 'Docker & Kubernetes', description: 'Containerizing applications and orchestrating workloads at scale.', order: 2 },
          { stepNum: '03 / Automation', title: 'Infrastructure as Code', description: 'Provisioning repeatable environments with Terraform and Pulumi.', order: 3 },
          { stepNum: '04 / Pipelines', title: 'CI/CD at Scale', description: 'GitHub Actions workflows, blue-green deployments, and rollback strategies.', order: 4 },
        ],
      },
    },
  });

  await prisma.resourceTrack.create({
    data: {
      name: 'Cybersecurity Essentials',
      tag: 'Security',
      tagColor: '#F9AB00',
      description: 'Defending systems and thinking like an attacker to build safer software.',
      steps: {
        create: [
          { stepNum: '01 / Foundations', title: 'Networking & Protocols', description: 'TCP/IP, DNS, TLS, and how data moves across the internet securely.', order: 1 },
          { stepNum: '02 / Threats', title: 'Common Vulnerabilities', description: 'OWASP Top 10, SQL injection, XSS, and CSRF in real-world applications.', order: 2 },
          { stepNum: '03 / Offense', title: 'Ethical Hacking', description: 'Penetration testing methodology, reconnaissance, and exploitation basics.', order: 3 },
          { stepNum: '04 / Defense', title: 'Hardening & Response', description: 'Incident response, logging, threat modeling, and secure code review.', order: 4 },
        ],
      },
    },
  });

  console.log('✅ Resource tracks seeded');

  // ─── RESOURCE PLATFORMS ───────────────────────────────────────────────────
  console.log('🌐 Seeding learning platforms...');

  const platforms = [
    { name: 'freeCodeCamp', url: 'https://www.freecodecamp.org/', description: 'Project-based paths for web certification and open-source contribution.', order: 1 },
    { name: 'Coursera', url: 'https://www.coursera.org/', description: 'Professional certificates from Google, DeepLearning.AI, and top universities.', order: 2 },
    { name: 'Kaggle', url: 'https://www.kaggle.com/', description: 'Machine learning competitions, public datasets, and free micro-courses.', order: 3 },
    { name: 'roadmap.sh', url: 'https://roadmap.sh/', description: 'Interactive visual guides for every engineering role and specialization.', order: 4 },
    { name: 'The Odin Project', url: 'https://www.theodinproject.com/', description: 'A free, open-source fullstack curriculum built by the community.', order: 5 },
    { name: 'fast.ai', url: 'https://www.fast.ai/', description: 'Practical deep learning for coders — top-down, hands-on approach.', order: 6 },
    { name: 'CS50 (Harvard)', url: 'https://cs50.harvard.edu/', description: 'The world\'s most popular intro to computer science, completely free.', order: 7 },
    { name: 'LeetCode', url: 'https://leetcode.com/', description: 'Algorithmic problem-solving and technical interview preparation.', order: 8 },
    { name: 'Google Developers', url: 'https://developers.google.com/', description: 'Official codelabs, tech guides, and certification tracks from Google.', order: 9 },
    { name: 'MIT OpenCourseWare', url: 'https://ocw.mit.edu/', description: 'Full lecture notes and assignments from MIT\'s real CS and math courses.', order: 10 },
  ];

  for (const p of platforms) {
    await prisma.resourcePlatform.create({ data: p });
  }

  console.log('✅ Platforms seeded');

  // ─── TOOL CATEGORIES + TOOLS ──────────────────────────────────────────────
  console.log('🧰 Seeding toolbox...');

  await prisma.resourceToolCategory.create({
    data: {
      name: 'Engineering',
      colorHex: '#4285F4',
      order: 1,
      tools: {
        create: [
          { name: 'VS Code', url: 'https://code.visualstudio.com/', toolType: 'IDE', order: 1 },
          { name: 'GitHub', url: 'https://github.com/', toolType: 'Git', order: 2 },
          { name: 'Postman', url: 'https://www.postman.com/', toolType: 'API', order: 3 },
          { name: 'Docker', url: 'https://www.docker.com/', toolType: 'Ops', order: 4 },
          { name: 'Warp Terminal', url: 'https://www.warp.dev/', toolType: 'CLI', order: 5 },
          { name: 'TablePlus', url: 'https://tableplus.com/', toolType: 'DB', order: 6 },
          { name: 'Nx', url: 'https://nx.dev/', toolType: 'Monorepo', order: 7 },
        ],
      },
    },
  });

  await prisma.resourceToolCategory.create({
    data: {
      name: 'Creative',
      colorHex: '#FBBC04',
      order: 2,
      tools: {
        create: [
          { name: 'Figma', url: 'https://www.figma.com/', toolType: 'Design', order: 1 },
          { name: 'Spline', url: 'https://spline.design/', toolType: '3D', order: 2 },
          { name: 'Framer', url: 'https://www.framer.com/motion/', toolType: 'Motion', order: 3 },
          { name: 'Lottiefiles', url: 'https://lottiefiles.com/', toolType: 'Animation', order: 4 },
          { name: 'Coolors', url: 'https://coolors.co/', toolType: 'Palette', order: 5 },
          { name: 'Fontshare', url: 'https://www.fontshare.com/', toolType: 'Typography', order: 6 },
        ],
      },
    },
  });

  await prisma.resourceToolCategory.create({
    data: {
      name: 'Intelligence',
      colorHex: '#EA4335',
      order: 3,
      tools: {
        create: [
          { name: 'Gemini API', url: 'https://ai.google.dev/', toolType: 'Model', order: 1 },
          { name: 'Vertex AI', url: 'https://cloud.google.com/vertex-ai', toolType: 'Platform', order: 2 },
          { name: 'Colab', url: 'https://colab.research.google.com/', toolType: 'Notebook', order: 3 },
          { name: 'Hugging Face', url: 'https://huggingface.co/', toolType: 'Models', order: 4 },
          { name: 'Weights & Biases', url: 'https://wandb.ai/', toolType: 'Tracking', order: 5 },
          { name: 'LangChain', url: 'https://www.langchain.com/', toolType: 'Agents', order: 6 },
        ],
      },
    },
  });

  await prisma.resourceToolCategory.create({
    data: {
      name: 'Productivity',
      colorHex: '#34A853',
      order: 4,
      tools: {
        create: [
          { name: 'Notion', url: 'https://www.notion.so/', toolType: 'Docs', order: 1 },
          { name: 'Linear', url: 'https://linear.app/', toolType: 'Issues', order: 2 },
          { name: 'Excalidraw', url: 'https://excalidraw.com/', toolType: 'Diagrams', order: 3 },
          { name: 'Obsidian', url: 'https://obsidian.md/', toolType: 'Notes', order: 4 },
          { name: 'Raycast', url: 'https://www.raycast.com/', toolType: 'Launcher', order: 5 },
          { name: 'Arc Browser', url: 'https://arc.net/', toolType: 'Browser', order: 6 },
        ],
      },
    },
  });

  await prisma.resourceToolCategory.create({
    data: {
      name: 'Cloud & Infra',
      colorHex: '#9C27B0',
      order: 5,
      tools: {
        create: [
          { name: 'Google Cloud', url: 'https://cloud.google.com/', toolType: 'Platform', order: 1 },
          { name: 'Vercel', url: 'https://vercel.com/', toolType: 'Deploy', order: 2 },
          { name: 'Supabase', url: 'https://supabase.com/', toolType: 'Backend', order: 3 },
          { name: 'Cloudflare', url: 'https://www.cloudflare.com/', toolType: 'Edge', order: 4 },
          { name: 'Terraform', url: 'https://www.terraform.io/', toolType: 'IaC', order: 5 },
          { name: 'Railway', url: 'https://railway.app/', toolType: 'Hosting', order: 6 },
        ],
      },
    },
  });

  await prisma.resourceToolCategory.create({
    data: {
      name: 'Security',
      colorHex: '#FF6D00',
      order: 6,
      tools: {
        create: [
          { name: 'Burp Suite', url: 'https://portswigger.net/burp', toolType: 'Pentest', order: 1 },
          { name: 'Wireshark', url: 'https://www.wireshark.org/', toolType: 'Network', order: 2 },
          { name: 'OWASP ZAP', url: 'https://www.zaproxy.org/', toolType: 'Scanner', order: 3 },
          { name: '1Password', url: 'https://1password.com/', toolType: 'Secrets', order: 4 },
          { name: 'Snyk', url: 'https://snyk.io/', toolType: 'Deps', order: 5 },
          { name: 'Vault', url: 'https://www.vaultproject.io/', toolType: 'Keys', order: 6 },
        ],
      },
    },
  });

  console.log('✅ Toolbox seeded');

  // ─── CLUBS ────────────────────────────────────────────────────────────────
  console.log('🏛️ Seeding clubs...');

  const clubsData = [
    {
      name: 'Web & App Development',
      type: 'technical',
      description: 'The heartbeat of our chapter. We build responsive, production-ready web and mobile apps using the latest Google technologies.',
      iconType: 'code',
      colorToken: 'blue',
    },
    {
      name: 'Data Science',
      type: 'technical',
      description: 'Focusing on data-driven futures through deep dives into Python and predictive modeling.',
      iconType: 'bar-chart',
      colorToken: 'green',
    },
    {
      name: 'Generative AI & ML',
      type: 'technical',
      description: 'Exploring LLMs and Gemini integration to solve real-world problems with the power of artificial intelligence.',
      iconType: 'zap',
      colorToken: 'red',
    },
    {
      name: 'Vibe Coding',
      type: 'technical',
      description: 'Building software at lightning speed with modern AI assistance, rapid prototyping, and flow-state engineering.',
      iconType: 'code',
      colorToken: '#34A853',
    },
    {
      name: 'Creative',
      type: 'creative',
      description: 'Defining our visual identity, brand design, UI/UX systems, and chapter assets.',
      iconType: 'pen-tool',
      colorToken: '#FBBC04',
    },
    {
      name: 'Growth & Impact',
      type: 'creative',
      description: 'Amplifying our voice and ensuring our community impact reaches a global audience.',
      iconType: 'trending-up',
      colorToken: 'purple',
    },
    {
      name: 'Events & Logistics',
      type: 'creative',
      description: 'The architects of experience, orchestrating the massive hackathons and workshops that define our year.',
      iconType: 'calendar',
      colorToken: 'gray',
    },
  ];

  for (const club of clubsData) {
    await prisma.club.create({ data: club });
  }

  console.log('✅ Clubs seeded');

  // ─── PARTNERS ─────────────────────────────────────────────────────────────
  console.log('🤝 Seeding partners...');

  const partners = [
    { name: 'Air University', logoUrl: '/partners/air-university.png', websiteUrl: 'https://cuiwah.edu.pk', order: 1 },
    { name: 'GDGoC CUI', logoUrl: '/partners/gdgoc-cui-chapter.png', websiteUrl: 'https://developers.google.com/community/gdg/chapters/view/comsats-university-islamabad-wah-campus/', order: 2 },
    { name: 'DataCamp', logoUrl: '/partners/datacamp.png', websiteUrl: 'https://www.datacamp.com/', order: 3 },
    { name: 'GitHub', logoUrl: '/partners/github.png', websiteUrl: 'https://github.com/', order: 4 },
    { name: 'Algoligence', logoUrl: '/partners/algoligence.jpg', websiteUrl: 'https://algoligence.com/', order: 5 },
    { name: 'Cheezious', logoUrl: '/partners/cheezious.svg', websiteUrl: 'https://cheezious.com/', order: 6 },
  ];

  for (const partner of partners) {
    await prisma.partner.create({ data: partner });
  }

  console.log('✅ Partners seeded');

  // ─── SITE SETTINGS ────────────────────────────────────────────────────────
  console.log('⚙️ Seeding site settings...');

  const settings = [
    { key: 'recruitment_status', value: 'closed' },
    { key: 'recruitment_message', value: 'Applications Currently Out of Session' },
    { key: 'recruitment_deadline', value: '' },
    { key: 'instagram_url', value: 'https://instagram.com/gdgoc_cuiwah' },
    { key: 'linkedin_url', value: 'https://linkedin.com/company/gdgoc-cui-wah' },
    { key: 'twitter_url', value: 'https://twitter.com/gdgoc_cuiwah' },
    { key: 'github_url', value: 'https://github.com/gdgoc-cui-wah' },
    { key: 'website_url', value: 'https://gdgoc-cuiwah.com' },
    { key: 'chapter_email', value: 'gdgoc.cuiwah@gmail.com' },
  ];

  for (const setting of settings) {
    await prisma.siteSetting.upsert({
      where: { key: setting.key },
      update: { value: setting.value },
      create: setting,
    });
  }

  console.log('✅ Site settings seeded');

  // ─── ANNOUNCEMENTS ────────────────────────────────────────────────────────
  console.log('📢 Seeding announcements...');

  await prisma.announcement.create({
    data: {
      title: 'Core Team Applications Open',
      body: 'Core team applications for the next semester start March 1st.',
      audience: 'member',
      isActive: true,
    },
  });

  console.log('✅ Announcements seeded');

  console.log('\n🎉 Seed complete! All tables populated.');
}

main()
  .catch((e) => {
    console.error('❌ Seed error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
