import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import dotenv from 'dotenv';

dotenv.config();
dotenv.config({ path: '.env.local', override: true });

const pool = new Pool({ connectionString: process.env.DATABASE_URL, ssl: { rejectUnauthorized: false } });
const prisma = new PrismaClient({ adapter: new PrismaPg(pool) });

const allEvents = [
  // ─── 1. HACK THE VIBE 2026 ──────────────────────────────────────────────────
  {
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
    tags: ['Open Source', 'AI SecOps', 'DevOps', 'GitHub Campus Expert', 'Career Guidance', 'Panel Discussion', 'Cyber Security'],
    agenda: [
      { order: 1, time: '10:00 AM', title: 'Opening Remarks & Chapter Welcome', speaker: 'GDGoC CUI Wah Leadership', description: 'Introduction to HackTheVibe 2026, chapter mission, and the spirit of open source innovation.' },
      { order: 2, time: '10:20 AM', title: 'Visibility That Pays: Building a Brand That Opens Doors', speaker: 'Muhammad Adil (Founder @ TechCre Solutions & GitHub Campus Expert)', description: 'Strategic insights on personal branding, portfolio building, and unlocking career opportunities through tech visibility.' },
      { order: 3, time: '11:00 AM', title: 'Importance and Impact of Open Source in Modern Software Development', speaker: 'Farhan Ashraf (AI SecOps Engineer @ Systems Limited & GitHub Campus Expert)', description: 'Emerging trends in AI, Cyber Security, the role of AI Security Operations (AI SecOps) in enterprise environments, and global contribution.' },
      { order: 4, time: '11:45 AM', title: 'My Philosophy of University Life & Career Readiness', speaker: 'Munsif Raza (Founder & CEO @ HyperNeuro & GitHub Campus Expert)', description: 'Navigating academic journeys, building practical industry skills, and developing an entrepreneurial mindset.' },
      { order: 5, time: '12:30 PM', title: 'Reimagining Open Source in the Age of AI with Kiro.dev', speaker: 'Sumama Zaeem (Senior DevOps Engineer @ Tkxel & GitHub Campus Expert)', description: 'DevOps best practices, industry workflows, and leveraging AI-powered development tools for rapid open-source innovation.' },
      { order: 6, time: '01:15 PM', title: 'Interactive Panel Discussion & Student Q&A', speaker: 'Muhammad Adil, Farhan Ashraf, Munsif Raza, Sumama Zaeem', description: 'Direct audience engagement clarifying misconceptions and exploring career paths in AI, Cyber Security, DevOps, and software engineering.' },
      { order: 7, time: '02:00 PM', title: 'Exclusive Goodies & Merchandise Distribution', speaker: 'Executive Team', description: 'Distribution of official event merchandise and networking session with industry leaders.' },
    ],
  },

  // ─── 2. GOOGLE AI TOOLS & VIBE CODING ──────────────────────────────────────
  {
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
    tags: ['Google AI Studio', 'Vibe Coding', 'Prompt Engineering', 'Gemini', 'NotebookLM', 'Awards', 'Closing Ceremony'],
    agenda: [
      { order: 1, time: 'Session 1 (07:00 PM)', title: 'Google AI Studio & Vibe Coding Introduction', speaker: 'Abdur Raheem', description: 'Exploring AI-assisted rapid development workflows and prototyping with Google AI Studio.' },
      { order: 2, time: 'Session 1 (07:45 PM)', title: '4-Step Prompt Engineering Framework', speaker: 'Abdur Raheem', description: 'Persuasion (role framing), Task (defining action), Context in Detail, and Output with Constraints.' },
      { order: 3, time: 'Session 1 (08:30 PM)', title: 'GDG Hackathon Announcement & Guidelines', speaker: 'Ubaid ur Rehman (Campus Lead)', description: 'Hackathon timeline, rules, team formation, evaluation criteria, and interactive Q&A.' },
      { order: 4, time: 'Session 2 (11:00 AM)', title: 'Guest Keynote: Anti-Gravity & Emerging Tech', speaker: 'Farhan Ashraf (AI SecOps Engineer & GitHub Campus Expert)', description: 'Theoretical foundations of anti-gravity, scientific significance, and future aerospace applications.' },
      { order: 5, time: 'Session 2 (11:45 AM)', title: 'Hands-on AI Tools: Google Gemini & NotebookLM', speaker: 'Farhan Ashraf', description: 'Practical demonstrations for research, automated note-taking, and content generation.' },
      { order: 6, time: 'Session 2 (12:30 PM)', title: 'SP26 Semester Awards & Prize Distribution', speaker: 'Dr. Wasif & Core Team', description: 'Awarding 1st Place (Adil & Ismail), 2nd Place (Manahil), and 2nd Runner-Up (Fiza Batool) with shields and certificates.' },
    ],
  },

  // ─── 3. WEB DEVELOPMENT BOOTCAMP (SP26) ───────────────────────────────────
  {
    slug: 'web-development-bootcamp-sp26',
    title: 'Web Development Bootcamp (React & Modern Frontend)',
    description: 'A 3-day hands-on bootcamp organized by GDGoC CUI Wah to teach modern web development from basic to expert level. The sessions provided a thorough exploration of modern frontend engineering, focusing on the fundamentals of the React library, component-based architecture, state management, and efficient UI rendering. Featured live coding demonstrations, interactive technical walkthroughs, Q&A sessions, and a live project showcase.',
    type: 'BOOTCAMP',
    location: 'COMSATS University Islamabad, Wah Campus / Online (Google Meet)',
    locationType: 'Online',
    date: new Date('2026-03-06T18:00:00.000Z'),
    imageUrl: '/images/chapter/workshop-speaker.png',
    badgeUrl: '/images/chapter/workshop-speaker.png',
    isPublished: true,
    tags: ['Web Development', 'React', 'Frontend', 'JavaScript', 'State Management', 'UI/UX', 'Bootcamp'],
    agenda: [
      { order: 1, time: 'Day 1 (06:00 PM)', title: 'React Fundamentals & Component Architecture', speaker: 'Muhammad Ismail (Lead Web & App Development)', description: 'Modern frontend ecosystem, JSX syntax, functional components, props, and modular design.' },
      { order: 2, time: 'Day 2 (06:00 PM)', title: 'State Management, Hooks & Rendering Lists', speaker: 'Muhammad Ismail', description: 'Deep dive into useState, useEffect, conditional rendering, list keys, and event handling.' },
      { order: 3, time: 'Day 3 (06:00 PM)', title: 'Live Project Showcase & Scalable Architecture', speaker: 'Muhammad Ismail', description: 'Live coding a dynamic web application, performance optimization, collaborative Q&A, and deployment.' },
    ],
  },

  // ─── 4. DATA SCIENCE BOOTCAMP (SP26) ──────────────────────────────────────
  {
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
    tags: ['Data Science', 'Python', 'Machine Learning', 'EDA', 'Feature Engineering', 'Data Analytics', 'Pandas'],
    agenda: [
      { order: 1, time: 'Day 1 (09:30 PM)', title: 'Python Foundations & Data Ingestion Pipeline', speaker: 'Danyal Ahmad & Manahil Mirza', description: 'Introduction to data science pipelines, Python syntax, data structures, and data ingestion techniques.' },
      { order: 2, time: 'Day 2 (09:30 PM)', title: 'Data Cleaning & Preprocessing with Pandas', speaker: 'Manahil Mirza', description: 'Missing value handling, outlier detection, data filtering, and transformation techniques.' },
      { order: 3, time: 'Day 3 (09:30 PM)', title: 'Exploratory Data Analysis (EDA) & Data Visualization', speaker: 'Danyal Ahmad', description: 'Statistical distribution plotting, heatmaps, correlations, and visual storytelling with Matplotlib/Seaborn.' },
      { order: 4, time: 'Day 4 (09:30 PM)', title: 'Advanced Feature Engineering Techniques', speaker: 'Manahil Mirza', description: 'Feature scaling, encoding categorical variables, feature selection, and dataset preparation.' },
      { order: 5, time: 'Day 5 (09:30 PM)', title: 'Predictive Model Building & Performance Evaluation', speaker: 'Danyal Ahmad & Manahil Mirza', description: 'Scikit-learn supervised learning, train-test splits, cross-validation, and metrics evaluation.' },
    ],
  },

  // ─── 5. AGENTIC AI WORKSHOP ───────────────────────────────────────────────
  {
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
    tags: ['Agentic AI', 'Autonomous Agents', 'ADK', 'Artificial Intelligence', 'Tool Use', 'Reasoning', 'Machine Learning'],
    agenda: [
      { order: 1, time: '10:00 AM', title: 'Foundations of Autonomous Systems & Agent Mechanics', speaker: 'Ubaid Ghazi', description: 'Core principles of AI agents, perception-action loops, memory structures, and agent architecture.' },
      { order: 2, time: '10:45 AM', title: 'Automated Reasoning, Tool Use & Decision-Making', speaker: 'Ubaid Ghazi', description: 'Integrating tools, function calling, external APIs, and multi-step reasoning processes.' },
      { order: 3, time: '11:30 AM', title: 'Live Coding Lab: Building AI Agents with ADK', speaker: 'Ubaid Ghazi', description: 'Hands-on practical development of custom intelligent agents from scratch.' },
      { order: 4, time: '12:30 PM', title: 'Student Agent Testing & Future ML Initiatives', speaker: 'Ubaid Ghazi', description: 'Testing student-built agents, real-time evaluation, and upcoming automation tracks.' },
    ],
  },

  // ─── 6. HACK DATA V1 ──────────────────────────────────────────────────────
  {
    slug: 'hack-data-v1',
    title: 'Hack Data V1: Online Solution Hackathon',
    description: 'Hack Data V1 was a dynamic and competitive 48-hour online hackathon bringing together students from across all eight semesters. Participants identified unique problem statements and developed tangible, real-world solutions in the form of highly visual and functional websites or applications. Projects underwent rigorous assessment by judges Mr. Abdul Rahim and Munsif Raza on technical execution, exceptional presentations, and product visuals, concluding with a celebratory award ceremony distributing a PKR 15,000 cash prize pool (PKR 10,000 for winner, PKR 5,000 for runner-up).',
    type: 'HACKATHON',
    location: 'Online (Discord & Google Meet)',
    locationType: 'Online',
    date: new Date('2026-04-22T09:00:00.000Z'),
    imageUrl: '/images/chapter/hackdata-winner.png',
    badgeUrl: '/images/chapter_photos/hackdata_cert.png',
    isPublished: true,
    tags: ['Hackathon', 'Hack Data', 'Web Development', 'Problem Solving', 'Data Analytics', 'Prize Pool', 'Competition'],
    agenda: [
      { order: 1, time: 'Day 1 (09:00 AM)', title: 'Hackathon Kickoff & Problem Statements Briefing', speaker: 'Mr. Abdul Rahim & Munsif Raza', description: 'Announcement of tracks, judging rubrics, submission requirements, and technical guidelines.' },
      { order: 2, time: 'Day 1 (10:00 AM)', title: '48-Hour Hacking Sprint & Mentorship', speaker: 'Domain Leads & Mentors', description: 'Intensive team development, architecture reviews, and debugging support.' },
      { order: 3, time: 'Day 2 (02:00 PM)', title: 'Project Submission & Evaluation Freeze', speaker: 'Judging Panel', description: 'Code repositories and live deployment reviews.' },
      { order: 4, time: 'Day 2 (04:00 PM)', title: 'Live Team Demonstrations & Pitch Round', speaker: 'Participating Teams', description: 'Final project pitches and live system demonstrations to judges.' },
      { order: 5, time: 'Day 2 (06:00 PM)', title: 'Award Ceremony & PKR 15,000 Prize Distribution', speaker: 'Abdul Rahim, Munsif Raza & Campus Leads', description: 'Awarding PKR 10,000 to the winning team and PKR 5,000 to the runner-up with official certificates.' },
    ],
  },

  // ─── 7. MTM (MIND TO MACHINE) — C WORKSHOP ────────────────────────────────
  {
    slug: 'programming-for-beginners-c-language',
    title: 'MTM (Mind to Machine) — Programming for Beginners (C Language)',
    description: 'The MTM (Mind to Machine) Programming for Beginners workshop was organized to introduce fundamental programming concepts in a supportive and engaging learning environment. Conducted over Friday, Saturday, and Sunday nights from Oct 3 to Oct 12, 2025, the workshop focused on building a strong foundation for 1st–3rd semester students in C language, covering logic building, variables, control flow, loops, arrays, strings, functions, and pointers. Over 20 students participated with 13 successfully completing all requirements and receiving official GDGoC certification.',
    type: 'BOOTCAMP',
    location: 'Online (Weekend Nights)',
    locationType: 'Online',
    date: new Date('2025-10-03T19:00:00.000Z'),
    imageUrl: '/images/chapter/keynote-speaker.png',
    badgeUrl: '/images/chapter/keynote-speaker.png',
    isPublished: true,
    tags: ['Bootcamp', 'C Language', 'MTM', 'Programming Fundamentals', 'Problem Solving', 'Logic Building'],
    agenda: [
      { order: 1, time: 'Sessions 1-3 (07:00 PM)', title: 'C Syntax, Data Types & Control Flow', speaker: 'Tooba Mir', description: 'Conditionals, variables, operators, and algorithmic thinking.' },
      { order: 2, time: 'Sessions 4-6 (07:00 PM)', title: 'Loops, Arrays, and Strings', speaker: 'Tooba Mir', description: 'Iterative logic, multi-dimensional arrays, string manipulation, and coding exercises.' },
      { order: 3, time: 'Sessions 7-8 (07:00 PM)', title: 'Functions, Pointers & Problem Solving', speaker: 'Tooba Mir', description: 'Modular programming, memory concepts, final assignments, and certificate award criteria.' },
    ],
  },

  // ─── 8. AI KICK-OFF BOOTCAMP ──────────────────────────────────────────────
  {
    slug: 'ai-kickoff-bootcamp',
    title: 'AI Kick-off Bootcamp: Python, EDA & Machine Learning',
    description: 'The AI Kick-off Bootcamp was designed to provide students with hands-on exposure to Artificial Intelligence and Data Science using Python. A full-week intensive online bootcamp covering essential topics including Python for data analysis, data cleaning techniques, exploratory data analysis (EDA), data preprocessing methods, and foundational machine learning modeling workflows from raw data to model building. Participants received official certificates after attending all sessions and completing tasks.',
    type: 'BOOTCAMP',
    location: 'Online (Google Meet)',
    locationType: 'Online',
    date: new Date('2025-10-20T18:00:00.000Z'),
    imageUrl: '/images/chapter_photos/fatima_maleeha_session.png',
    badgeUrl: '/images/chapter_photos/fatima_maleeha_session.png',
    isPublished: true,
    tags: ['Bootcamp', 'Artificial Intelligence', 'Data Science', 'Python', 'Machine Learning', 'EDA'],
    agenda: [
      { order: 1, time: 'Day 1 - 2 (06:00 PM)', title: 'Python for Data Analysis & NumPy Basics', speaker: 'Ubaid-Ur-Rehman', description: 'Data structures, vectorized computation, and numerical processing fundamentals.' },
      { order: 2, time: 'Day 3 - 4 (06:00 PM)', title: 'Data Cleaning & Exploratory Data Analysis', speaker: 'Ubaid-Ur-Rehman', description: 'Pandas DataFrames, missing value imputation, and Seaborn visual exploration.' },
      { order: 3, time: 'Day 5 - 7 (06:00 PM)', title: 'Intro to Machine Learning & Model Building', speaker: 'Ubaid-Ur-Rehman', description: 'Scikit-Learn supervised learning models, evaluation metrics, and capstone project submission.' },
    ],
  },
];

async function main() {
  console.log('🚀 Upserting all report events into database...');

  for (const ev of allEvents) {
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

  console.log('\n🎉 All events successfully synchronized in database!');
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });
