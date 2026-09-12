import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import dotenv from 'dotenv';

dotenv.config();
dotenv.config({ path: '.env.local', override: true });

const pool = new Pool({ connectionString: process.env.DATABASE_URL, ssl: { rejectUnauthorized: false } });
const prisma = new PrismaClient({ adapter: new PrismaPg(pool) });

const events = [
  // ─── HACKATHONS & COMPETITIONS ───────────────────────────────────────────
  {
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
    tags: ['Hackathon', 'Artificial Intelligence', 'Generative AI', 'Vibe Coding', 'Agentic AI'],
    agenda: [
      { order: 1, time: '09:00 AM', title: 'Opening Session & Hackathon Briefing', speaker: 'Ubaid Ghazi (Campus Lead)', description: 'Introduction to problem statements, evaluation criteria, and Generative AI workflows.' },
      { order: 2, time: '10:30 AM', title: 'Keynote: Generative AI & Agentic Systems', speaker: 'Industry Guest Speaker', description: 'Deep dive into Vibe Coding, rapid prototyping, and building scalable agentic systems.' },
      { order: 3, time: '11:30 AM', title: 'Hacking & Development Phase', speaker: 'Mentors & Domain Leads', description: 'Continuous ideation, coding, debugging, and deployment of AI solutions.' },
      { order: 4, time: '05:00 PM', title: 'Project Demonstrations & Pitching', speaker: 'Participating Teams', description: 'Live demonstrations to the judging panel.' },
      { order: 5, time: '06:30 PM', title: 'Prize Distribution & Closing Ceremony', speaker: 'Faculty Head & Core Team', description: 'Awarding Winner (PKR 30,000) and Runner-Up (PKR 10,000) with official shields and merchandise.' },
    ],
  },
  {
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
    tags: ['Hackathon', 'Competitive Programming', 'HackerRank', 'Algorithms'],
    agenda: [
      { order: 1, time: '10:00 AM', title: 'Lab Setup & Security Briefing', speaker: 'Alisha Fatima & Organizing Team', description: 'Configuration of Safe Exam Browser (SEB) and environment verification.' },
      { order: 2, time: '10:30 AM', title: 'Live Coding Contest Begins', speaker: 'HackerRank Automated Arena', description: 'Real-time algorithmic and data structure problem-solving under strict time constraints.' },
      { order: 3, time: '01:30 PM', title: 'Leaderboard Evaluation & Closing', speaker: 'Ubaid-Ur-Rehman & Core Leads', description: 'Final leaderboard review and announcement of top performers.' },
    ],
  },

  // ─── BOOTCAMPS & WORKSHOPS ────────────────────────────────────────────────
  {
    slug: 'ai-kickoff-bootcamp',
    title: 'AI Kick-off Bootcamp',
    description: 'A full-week intensive hands-on online bootcamp introducing students to Python for data analysis, exploratory data analysis (EDA), data cleaning, preprocessing techniques, and foundational machine learning modeling workflows.',
    type: 'BOOTCAMP',
    location: 'Online (Google Meet)',
    locationType: 'Online',
    date: new Date('2025-10-20T18:00:00.000Z'),
    imageUrl: '/images/chapter_photos/fatima_maleeha_session.png',
    badgeUrl: '/images/chapter_photos/fatima_maleeha_session.png',
    isPublished: true,
    tags: ['Bootcamp', 'Artificial Intelligence', 'Data Science', 'Python', 'Machine Learning'],
    agenda: [
      { order: 1, time: 'Day 1 - 2', title: 'Python for Data Analysis & NumPy', speaker: 'Ubaid-Ur-Rehman', description: 'Data structures, vectorized computation, and numerical processing.' },
      { order: 2, time: 'Day 3 - 4', title: 'Data Cleaning & Exploratory Data Analysis', speaker: 'Ubaid-Ur-Rehman', description: 'Pandas DataFrames, missing value imputation, and Seaborn visual exploration.' },
      { order: 3, time: 'Day 5 - 7', title: 'Intro to Machine Learning & Model Building', speaker: 'Ubaid-Ur-Rehman', description: 'Scikit-Learn supervised models and capstone project submission.' },
    ],
  },
  {
    slug: 'web-development-for-beginners',
    title: 'Web Development for Beginners Workshop Series',
    description: 'A structured, hands-on online workshop conducted over Friday, Saturday, and Sunday nights covering HTML5 structure, CSS3 modern layout design, and JavaScript interactivity with daily assignments and official certification.',
    type: 'BOOTCAMP',
    location: 'Online (Weekend Nights)',
    locationType: 'Online',
    date: new Date('2025-10-15T19:00:00.000Z'),
    imageUrl: '/images/chapter/workshop-speaker.png',
    badgeUrl: '/images/chapter/workshop-speaker.png',
    isPublished: true,
    tags: ['Bootcamp', 'Web Development', 'HTML', 'CSS', 'JavaScript'],
    agenda: [
      { order: 1, time: 'Session 1', title: 'HTML5 Semantic Web Architecture', speaker: 'Muhammad Ismail', description: 'Structuring web pages, semantic tags, forms, and accessibility.' },
      { order: 2, time: 'Session 2', title: 'Modern CSS3: Flexbox, Grid & Animations', speaker: 'Muhammad Ismail', description: 'Styling, responsive design, fluid layouts, and component theming.' },
      { order: 3, time: 'Session 3', title: 'JavaScript Essentials & DOM Manipulation', speaker: 'Muhammad Ismail', description: 'Adding interactivity, event listeners, dynamic UI, and final project guidance.' },
    ],
  },
  {
    slug: 'programming-for-beginners-c-language',
    title: 'Programming for Beginners — C Language Series',
    description: 'Hands-on beginner programming bootcamp held Oct 3 – Oct 12, focusing on building strong foundations in logic, variables, control structures, loops, arrays, and algorithms in C language.',
    type: 'BOOTCAMP',
    location: 'Online (Weekend Nights)',
    locationType: 'Online',
    date: new Date('2025-10-03T19:00:00.000Z'),
    imageUrl: '/images/chapter/keynote-speaker.png',
    badgeUrl: '/images/chapter/keynote-speaker.png',
    isPublished: true,
    tags: ['Bootcamp', 'C Language', 'Programming Fundamentals', 'Problem Solving'],
    agenda: [
      { order: 1, time: 'Sessions 1-3', title: 'C Syntax, Data Types & Control Flow', speaker: 'Tooba Mir', description: 'Conditionals, variables, operators, and algorithmic thinking.' },
      { order: 2, time: 'Sessions 4-6', title: 'Loops, Arrays, and Strings', speaker: 'Tooba Mir', description: 'Iterative logic, multi-dimensional arrays, string manipulation, and exercises.' },
      { order: 3, time: 'Sessions 7-8', title: 'Functions, Pointers & Problem Solving', speaker: 'Tooba Mir', description: 'Modular programming, memory concepts, and certificate award criteria.' },
    ],
  },
  {
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
    tags: ['Bootcamp', 'GitHub', 'Git', 'Version Control', 'Open Source'],
    agenda: [
      { order: 1, time: '11:00 AM', title: 'Introduction to Version Control Systems', speaker: 'Muhammad Ismail', description: 'Why version control matters in professional software engineering.' },
      { order: 2, time: '11:30 AM', title: 'Git Core CLI: Commits, Branches & Merging', speaker: 'Muhammad Ismail', description: 'Practical terminal workflows and conflict resolution.' },
      { order: 3, time: '12:15 PM', title: 'GitHub Collaboration & Open Source PRs', speaker: 'Muhammad Ismail', description: 'Forks, Pull Requests, Code Reviews, and GitHub Cheat Sheet distribution.' },
    ],
  },
  {
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
    tags: ['Bootcamp', 'Artificial Intelligence', 'Data Science', 'Career Guidance'],
    agenda: [
      { order: 1, time: '11:30 AM', title: 'Journey into Artificial Intelligence', speaker: 'Adeel Asghar', description: 'Overview of modern AI landscape, deep learning, and practical applications.' },
      { order: 2, time: '12:15 PM', title: 'How Data Science Works: From Data to Decisions', speaker: 'Manahil Mirza', description: 'Exploratory analysis, feature engineering, and career roadmaps for students.' },
      { order: 3, time: '12:45 PM', title: 'Interactive Q&A and Student Mentorship', speaker: 'Adeel Asghar & Manahil Mirza', description: 'Open forum addressing student queries on learning pathways.' },
    ],
  },
  {
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
    tags: ['Bootcamp', 'Community', 'Women in Tech', 'Chapter Launch'],
    agenda: [
      { order: 1, time: '10:00 AM', title: 'Welcome Address & Chapter Vision', speaker: 'Ubaid ur Rehman (Campus Lead)', description: 'Introduction to GDGoC CUI Wah mission, goals, and upcoming initiatives.' },
      { order: 2, time: '10:45 AM', title: 'Keynote: Empowering Women in Technology', speaker: 'Laiba Faiz & Alisha Fatima', description: 'Promoting diversity, inclusivity, and technical leadership on campus.' },
      { order: 3, time: '11:30 AM', title: 'Core Team Induction & Cake Cutting', speaker: 'Executive Team & Fakhir Hassan', description: 'Formal induction of team members and celebratory chapter launch.' },
    ],
  },
];

async function main() {
  console.log('🚀 Seeding new events into database...');

  for (const ev of events) {
    const { tags, agenda, ...eventData } = ev;

    const upserted = await prisma.event.upsert({
      where: { slug: ev.slug },
      update: {
        title: eventData.title,
        description: eventData.description,
        type: eventData.type,
        location: eventData.location,
        locationType: eventData.locationType,
        date: eventData.date,
        imageUrl: eventData.imageUrl,
        badgeUrl: eventData.badgeUrl,
        isPublished: true,
      },
      create: {
        ...eventData,
      },
    });

    // Sync tags
    await prisma.eventTag.deleteMany({ where: { eventId: upserted.id } });
    for (const tag of tags) {
      await prisma.eventTag.create({
        data: { eventId: upserted.id, tag },
      });
    }

    // Sync agenda
    await prisma.eventAgendaItem.deleteMany({ where: { eventId: upserted.id } });
    for (const item of agenda) {
      await prisma.eventAgendaItem.create({
        data: {
          eventId: upserted.id,
          order: item.order,
          time: item.time,
          title: item.title,
          description: item.description,
          speaker: item.speaker,
        },
      });
    }

    console.log(`✅ Upserted event: ${upserted.title} (${upserted.slug})`);
  }

  console.log('\n🎉 All events successfully seeded and synced!');
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });
