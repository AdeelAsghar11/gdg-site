import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import dotenv from 'dotenv';

dotenv.config();
dotenv.config({ path: '.env.local', override: true });

const pool = new Pool({ connectionString: process.env.DATABASE_URL, ssl: { rejectUnauthorized: false } });
const prisma = new PrismaClient({ adapter: new PrismaPg(pool) });

export const eventsData = [
  // ─── 1. HACK THE VIBE ───────────────────────────────────────────────────────
  {
    slug: 'hack-the-vibe-2026',
    title: 'HackTheVibe 2026 – Technical Session on Open Source Innovation',
    description: 'The GDG On Campus COMSATS Wah (GDGoC CUI Wah) successfully organized HackTheVibe 2026, a dynamic and insightful open-source focused technical session followed by an engaging panel discussion at the Auditorium, COMSATS University Islamabad, Wah Campus. HackTheVibe 2026 was designed to promote the spirit of open-source collaboration, innovation, and community-driven development, bridging the gap between academia and industry by bringing together students, developers, and industry experts under one platform. The event featured distinguished GitHub Campus Experts and industry professionals who shared real-world experiences on AI SecOps, DevOps, Personal Branding, and Open Source contributions, followed by an interactive panel discussion and merchandise distribution.',
    type: 'CONFERENCE',
    location: 'Auditorium, COMSATS University Islamabad, Wah Campus',
    locationType: 'In-person',
    date: new Date('2026-06-01T10:00:00.000Z'),
    imageUrl: '/images/chapter/hackthevibe-team.png',
    badgeUrl: '/images/chapter/hackthevibe-team.png',
    isPublished: true,
    tags: ['HackTheVibe', 'Open Source', 'AI SecOps', 'DevOps', 'GitHub Campus Expert', 'Panel Discussion', 'Career Guidance'],
    agenda: [
      { order: 1, time: '10:00 AM', title: 'Opening Remarks & Chapter Welcome', speaker: 'GDGoC CUI Wah Leadership', description: 'Introduction to HackTheVibe 2026, chapter mission, and the spirit of open source innovation.' },
      { order: 2, time: '10:20 AM', title: 'Visibility That Pays: Building a Brand That Opens Doors', speaker: 'Muhammad Adil (Founder @ TechCre Solutions & GitHub Campus Expert)', description: 'Strategic insights on personal branding, portfolio building, and unlocking career opportunities through tech visibility.' },
      { order: 3, time: '11:00 AM', title: 'Importance and Impact of Open Source in Modern Software Development', speaker: 'Farhan Ashraf (AI SecOps Engineer @ Systems Limited & GitHub Campus Expert)', description: 'Emerging trends in AI, Cyber Security, the role of AI Security Operations (AI SecOps) in enterprise environments, and global contribution.' },
      { order: 4, time: '11:45 AM', title: 'My Philosophy of University Life & Career Readiness', speaker: 'Munsif Raza (Founder & CEO @ HyperNeuro & GitHub Campus Expert)', description: 'Navigating academic journeys, building practical industry skills, and developing an entrepreneurial mindset.' },
      { order: 5, time: '12:30 PM', title: 'Reimagining Open Source in the Age of AI with Kiro.dev', speaker: 'Sumama Zaeem (Senior DevOps Engineer @ Tkxel & GitHub Campus Expert)', description: 'DevOps best practices, industry workflows, and leveraging AI-powered development tools for rapid open-source innovation.' },
      { order: 6, time: '01:15 PM', title: 'Interactive Panel Discussion & Student Q&A', speaker: 'Muhammad Adil, Farhan Ashraf, Munsif Raza, Sumama Zaeem', description: 'Direct audience engagement clarifying misconceptions and exploring career paths in AI, Cyber Security, DevOps, and software engineering.' },
      { order: 7, time: '02:00 PM', title: 'Exclusive Goodies & Merchandise Distribution', speaker: 'Executive Team', description: 'Distribution of official event merchandise, stickers, and networking session with industry leaders.' },
    ],
  },

  // ─── 2. HACK DATA V1 ────────────────────────────────────────────────────────
  {
    slug: 'hack-data-v1',
    title: 'Hack Data V1: Online Solution Hackathon',
    description: 'Hack Data V1 was a dynamic and competitive 48-hour online hackathon organized by GDGoC CUI Wah, bringing together students from across all eight semesters. The event challenged participants to identify unique problem statements and develop tangible, real-world solutions in the form of highly visual and functional websites and applications. Projects underwent rigorous evaluation by esteemed judges Mr. Abdul Rahim and Munsif Raza on technical execution, exceptional presentations, and product visuals. Concluded with an official award ceremony distributing a PKR 15,000 cash prize pool (PKR 10,000 for winner, PKR 5,000 for runner-up) and certificates to all participants.',
    type: 'HACKATHON',
    location: 'Online (Discord & Google Meet)',
    locationType: 'Online',
    date: new Date('2026-05-25T10:00:00.000Z'),
    imageUrl: '/images/chapter/hackdata-winner.png',
    badgeUrl: '/images/gallery/hackdata_winning_team_certificates.png',
    isPublished: true,
    tags: ['Hackathon', 'Hack Data', 'Web Development', 'Problem Solving', 'Data Analytics', 'PKR 15,000 Prize', 'Competition'],
    agenda: [
      { order: 1, time: 'Day 1 (09:00 AM)', title: 'Hackathon Kickoff & Problem Statements Briefing', speaker: 'Mr. Abdul Rahim & Munsif Raza', description: 'Announcement of tracks, evaluation rubrics, submission guidelines, and technical criteria.' },
      { order: 2, time: 'Day 1 (10:00 AM)', title: '48-Hour Hacking Sprint & Mentor Checkpoints', speaker: 'Domain Leads & Mentors', description: 'Intensive team development, architecture reviews, and debugging support.' },
      { order: 3, time: 'Day 2 (02:00 PM)', title: 'Project Submission & Evaluation Freeze', speaker: 'Judging Panel', description: 'Code repositories and live deployment reviews.' },
      { order: 4, time: 'Day 2 (04:00 PM)', title: 'Live Team Demonstrations & Pitch Round', speaker: 'Participating Teams', description: 'Final project pitches and live system demonstrations evaluated on product visuals and functionality.' },
      { order: 5, time: 'Day 2 (06:00 PM)', title: 'Award Ceremony & PKR 15,000 Prize Distribution', speaker: 'Abdul Rahim, Munsif Raza & Campus Leads', description: 'Awarding PKR 10,000 to the winning team, PKR 5,000 to the runner-up, and official certificates to all participants.' },
    ],
  },

  // ─── 3. MTM (MIND-TO-MACHINE) AI HACKATHON ─────────────────────────────────
  {
    slug: 'mtm-ai-hackathon',
    title: 'MTM (Mind-to-Machine) AI Hackathon',
    description: 'GDG On Campus COMSATS Wah (GDGoC CUI Wah) successfully organized the first-ever national-level MTM (Mind to Machine) AI Hackathon at COMSATS University Islamabad Wah Campus, bringing together students, developers, AI enthusiasts, and innovators from leading universities across Pakistan including IST, PIEAS, UET Taxila, FJWU, IM Sciences, and CUI Attock. Powered by Google Developer Groups on Campus COMSATS Wah, the event served as a large-scale platform focused on Artificial Intelligence, Generative AI, Vibe Coding, and Agentic AI development using modern Google technologies. Teams conceptualized, designed, and deployed AI-powered web and mobile applications under strict time constraints. The event concluded with an official prize ceremony awarding Grand Prize PKR 30,000 + shield to CUI Wah (Alina Zahra, Sana Shahid, Kashaf Shakeel) and Runner-Up PKR 10,000 + shield to CUI Attock (Eman Noor, Atiqa Bibi, Huzaifa Tahir).',
    type: 'HACKATHON',
    location: 'COMSATS University Islamabad, Wah Campus',
    locationType: 'Hybrid',
    date: new Date('2026-05-20T10:00:00.000Z'),
    imageUrl: '/images/chapter/mtm-winner.png',
    badgeUrl: '/images/gallery/mtm_shield_presentation.png',
    isPublished: true,
    tags: ['MTM', 'AI Hackathon', 'Generative AI', 'Vibe Coding', 'Agentic AI', 'National Competition', 'PKR 40,000 Prizes'],
    agenda: [
      { order: 1, time: '10:00 AM', title: 'Opening Session & Hackathon Briefing', speaker: 'Ubaid Ghazi (Campus Lead)', description: 'Comprehensive orientation covering competition structure, judging criteria, problem statements, and deployment standards.' },
      { order: 2, time: '11:00 AM', title: 'Keynote Speaker Session: Generative AI & Agentic Systems', speaker: 'Keynote Panel', description: 'AI-assisted development, Vibe Coding methodologies, rapid prototyping, and building scalable agentic systems.' },
      { order: 3, time: '12:30 PM', title: 'National-Level Hackathon Sprint', speaker: 'Competing Teams (IST, PIEAS, UET, CUI Wah, CUI Attock)', description: 'Continuous ideation, development, debugging, and deployment of real-world AI solutions.' },
      { order: 4, time: '04:00 PM', title: 'Project Demonstrations & Evaluation', speaker: 'Technical Evaluation Committee', description: 'Assessing technical depth, UI polish, prompt engineering workflows, and practical impact.' },
      { order: 5, time: '05:30 PM', title: 'Grand Prize Distribution & Winner Ceremony', speaker: 'Campus Leadership', description: 'Awarding Winner CUI Wah (PKR 30,000 + official shield), Runner-Up CUI Attock (PKR 10,000 + official shield), and event merchandise.' },
    ],
  },

  // ─── 4. AI JOURNEY ──────────────────────────────────────────────────────────
  {
    slug: 'ai-and-data-science-session',
    title: 'AI Journey: Interactive Awareness Session on Artificial Intelligence',
    description: 'Hosted by chapter AI Lead Adeel Asghar and Co-lead Manahil Mirza, this interactive awareness seminar titled "Journey into Artificial Intelligence" delved into the transformative fields of Artificial Intelligence and Data Science. The session provided an engaged audience of over 70 students with an insightful overview of core concepts, industry trends, and potential career paths in modern AI. Students explored data collection, data wrangling, exploratory data analysis (EDA), feature engineering, machine learning foundations, and practical advice on navigating career trajectories in intelligent technologies.',
    type: 'WORKSHOP',
    location: 'Auditorium / Seminar Hall, COMSATS University Islamabad, Wah Campus',
    locationType: 'In-person',
    date: new Date('2026-05-15T10:00:00.000Z'),
    imageUrl: '/images/chapter_photos/audience_students.png',
    badgeUrl: '/images/gallery/student_mentorship_session.jpg',
    isPublished: true,
    tags: ['AI Journey', 'Artificial Intelligence', 'Data Science', 'Machine Learning', 'Career Roadmap', 'Interactive Awareness'],
    agenda: [
      { order: 1, time: '11:00 AM', title: 'Welcome & The AI Landscape Today', speaker: 'Adeel Asghar (AI Lead)', description: 'Orientation on how AI is reshaping global industries and developer workflows.' },
      { order: 2, time: '11:20 AM', title: 'How Data Science Works: End-to-End Pipeline', speaker: 'Manahil Mirza (AI Co-Lead)', description: 'Data collection, wrangling, exploratory data analysis, and feature engineering fundamentals.' },
      { order: 3, time: '11:50 AM', title: 'Machine Learning Models & Core Concepts', speaker: 'Adeel Asghar & Manahil Mirza', description: 'Supervised vs unsupervised learning, neural networks intuition, and real-world applications.' },
      { order: 4, time: '12:20 PM', title: 'Career Paths in AI & Interactive Q&A', speaker: 'Adeel Asghar & Manahil Mirza', description: 'Addressing student questions, career roadmaps for 1st-3rd semester students, and upcoming GDG study circles.' },
    ],
  },

  // ─── 5. GITHUB SESSION (BY ISMAIL) ──────────────────────────────────────────
  {
    slug: 'github-essentials-session',
    title: 'GitHub Essentials: Version Control & Collaboration Workflows',
    description: 'Led by Muhammad Ismail, the GitHub Essentials Session was organized to introduce early-semester students to the fundamentals of Git and GitHub, highlighting their vital importance in modern software development. Muhammad Ismail explained core concepts including version control principles, repository architectures, commits, branches, pull requests, and collaborative team workflows. The session covered industry best practices and demonstrated how GitHub is leveraged in real-world production projects. With active participation from over 70 students, the seminar successfully equipped attendees with essential skills for collaborative and open-source software engineering.',
    type: 'WORKSHOP',
    location: 'Auditorium, COMSATS University Islamabad, Wah Campus',
    locationType: 'In-person',
    date: new Date('2026-05-10T10:00:00.000Z'),
    imageUrl: '/images/chapter_photos/ismail_github_session.jpg',
    badgeUrl: '/images/chapter_photos/ismail_github_session.jpg',
    isPublished: true,
    tags: ['GitHub', 'Git', 'Version Control', 'Muhammad Ismail', 'Open Source', 'Collaboration', 'Software Engineering'],
    agenda: [
      { order: 1, time: '10:00 AM', title: 'Introduction to Version Control & Git Fundamentals', speaker: 'Muhammad Ismail (Lead Web & App Development)', description: 'Why version control matters, distributed systems, tracking file histories, and CLI basics.' },
      { order: 2, time: '10:35 AM', title: 'Repositories, Commits, Branches & Remote Syncing', speaker: 'Muhammad Ismail', description: 'Creating repos, staging changes, writing clean commit messages, and managing Git branches.' },
      { order: 3, time: '11:15 AM', title: 'GitHub Collaboration: Pull Requests & Merge Conflict Resolution', speaker: 'Muhammad Ismail', description: 'Hands-on walkthrough of open source collaboration, code reviews, PR etiquette, and resolving merge conflicts.' },
      { order: 4, time: '11:50 AM', title: 'Portfolio Building with GitHub & Live Q&A', speaker: 'Muhammad Ismail', description: 'Showcasing projects to tech recruiters, Git Cheat Sheet distribution, and practical student Q&A.' },
    ],
  },

  // ─── 6A. WEB DEVELOPMENT BOOTCAMP (BY ISMAIL) ──────────────────────────────
  {
    slug: 'web-development-bootcamp-sp26',
    title: 'Web Development Bootcamp (React & Modern Frontend)',
    description: 'A 3-day intensive hands-on bootcamp organized by GDGoC CUI Wah to teach modern web development from basic to expert level. Led by Muhammad Ismail (Lead Web & App Development), the sessions provided a structured exploration of modern frontend engineering, focusing on the fundamentals of the React library, component-based architecture, state management, and efficient UI rendering. Featured live coding demonstrations, interactive technical walkthroughs, Q&A sessions, and a live project showcase.',
    type: 'BOOTCAMP',
    location: 'COMSATS University Islamabad, Wah Campus / Online (Google Meet)',
    locationType: 'Hybrid',
    date: new Date('2026-05-05T10:00:00.000Z'),
    imageUrl: '/images/events/react-bootcamp.jpg',
    badgeUrl: '/images/chapter/workshop-speaker.png',
    isPublished: true,
    tags: ['Bootcamp', 'Web Development', 'React', 'Muhammad Ismail', 'Frontend', 'JavaScript', 'State Management'],
    agenda: [
      { order: 1, time: 'Day 1 (06:00 PM)', title: 'React Fundamentals & Component Architecture', speaker: 'Muhammad Ismail', description: 'Modern frontend ecosystem, JSX syntax, functional components, props, and modular UI design.' },
      { order: 2, time: 'Day 2 (06:00 PM)', title: 'State Management, Hooks & Rendering Lists', speaker: 'Muhammad Ismail', description: 'Deep dive into useState, useEffect, conditional rendering, list keys, and user event handling.' },
      { order: 3, time: 'Day 3 (06:00 PM)', title: 'Live Project Showcase & Scalable Architecture', speaker: 'Muhammad Ismail', description: 'Live coding a dynamic web application, performance optimization, collaborative Q&A, and deployment.' },
    ],
  },

  // ─── 6B. AI KICK-OFF BOOTCAMP ───────────────────────────────────────────────
  {
    slug: 'ai-kickoff-bootcamp',
    title: 'AI Kick-off Bootcamp: Python, EDA & Machine Learning',
    description: 'The AI Kick-off Bootcamp was designed to provide beginner-level students with hands-on exposure to Artificial Intelligence and Data Science using Python. A full-week intensive online bootcamp covering essential topics including Python for data analysis, data cleaning techniques, exploratory data analysis (EDA), and data preprocessing methods. Led by Ubaid-Ur-Rehman, participants were introduced to basic machine learning models, understanding the complete workflow from raw data to model building through practical demonstrations and guided exercises.',
    type: 'BOOTCAMP',
    location: 'Online (Google Meet)',
    locationType: 'Online',
    date: new Date('2026-05-01T10:00:00.000Z'),
    imageUrl: '/images/chapter_photos/fatima_maleeha_session.png',
    badgeUrl: '/images/chapter_photos/fatima_maleeha_session.png',
    isPublished: true,
    tags: ['Bootcamp', 'Artificial Intelligence', 'Data Science', 'Python', 'Machine Learning', 'EDA', 'Ubaid-Ur-Rehman'],
    agenda: [
      { order: 1, time: 'Days 1-2 (06:00 PM)', title: 'Python for Data Analysis & Numerical Foundations', speaker: 'Ubaid-Ur-Rehman', description: 'Python data structures, NumPy arrays, vectorized calculations, and environment setup.' },
      { order: 2, time: 'Days 3-4 (06:00 PM)', title: 'Data Cleaning & Exploratory Data Analysis (EDA)', speaker: 'Ubaid-Ur-Rehman', description: 'Handling nulls, filtering DataFrames, statistical summaries, and visual storytelling with Seaborn.' },
      { order: 3, time: 'Days 5-7 (06:00 PM)', title: 'Machine Learning Workflow: Raw Data to Model Building', speaker: 'Ubaid-Ur-Rehman', description: 'Supervised classification and regression models using Scikit-Learn, model evaluation, and certification.' },
    ],
  },

  // ─── 6C. DATA SCIENCE BOOTCAMP ──────────────────────────────────────────────
  {
    slug: 'data-science-bootcamp-sp26',
    title: 'Data Science Bootcamp: From Foundations to Predictive Modeling',
    description: 'A comprehensive 5-day dive into analytics and machine learning organized by GDGoC CUI Wah. Led by Danyal Ahmad and Manahil Mirza, the bootcamp guided participants through the complete data lifecycle: starting with Python foundations and data ingestion, progressing through rigorous data cleaning, preprocessing, exploratory data analysis (EDA), and data visualization, and culminating in advanced feature engineering and practical predictive model building and evaluation.',
    type: 'BOOTCAMP',
    location: 'Online (Google Meet)',
    locationType: 'Online',
    date: new Date('2026-04-25T10:00:00.000Z'),
    imageUrl: '/images/chapter_photos/audience_students.png',
    badgeUrl: '/images/gallery/student_mentorship_session.jpg',
    isPublished: true,
    tags: ['Bootcamp', 'Data Science', 'Python', 'Machine Learning', 'EDA', 'Feature Engineering', 'Predictive Modeling'],
    agenda: [
      { order: 1, time: 'Day 1 (09:30 PM)', title: 'Python Foundations & Data Ingestion Pipeline', speaker: 'Danyal Ahmad & Manahil Mirza', description: 'Data science pipeline architecture, Python data structures, and automated ingestion methods.' },
      { order: 2, time: 'Day 2 (09:30 PM)', title: 'Data Cleaning & Preprocessing with Pandas', speaker: 'Manahil Mirza', description: 'Handling messy datasets, missing values, outliers, and data normalization.' },
      { order: 3, time: 'Day 3 (09:30 PM)', title: 'Exploratory Data Analysis (EDA) & Data Visualization', speaker: 'Danyal Ahmad', description: 'Univariate and bivariate statistical analysis, correlation heatmaps, and pattern discovery.' },
      { order: 4, time: 'Day 4 (09:30 PM)', title: 'Advanced Feature Engineering Techniques', speaker: 'Manahil Mirza', description: 'Encoding categorical variables, polynomial features, and dimension reduction.' },
      { order: 5, time: 'Day 5 (09:30 PM)', title: 'Predictive Model Building & Performance Evaluation', speaker: 'Danyal Ahmad & Manahil Mirza', description: 'Training predictive models, hyperparameter tuning, metrics evaluation, and graduation certificates.' },
    ],
  },

  // ─── 7A. AGENTIC AI WORKSHOP (BY UBAID) ─────────────────────────────────────
  {
    slug: 'agentic-ai-workshop',
    title: 'Agentic AI Workshop: Building Autonomous Systems with ADK',
    description: 'The GDG CUI Wah Agentic AI Workshop on April 10th marked an exciting, hands-on exploration into the world of autonomous systems led by Campus Lead Ubaid Ghazi. The session introduced students to foundational concepts of artificial intelligence agents, focusing on the core mechanics of how to design, program, and deploy them using Agent Development Kit (ADK). The event featured interactive coding sessions and practical demonstrations where participants actively built their own AI agents with automated reasoning, tool use, and dynamic decision-making.',
    type: 'WORKSHOP',
    location: 'COMSATS University Islamabad, Wah Campus / Online',
    locationType: 'Hybrid',
    date: new Date('2026-04-20T10:00:00.000Z'),
    imageUrl: '/images/gallery/lead_hackathon_address.jpg',
    badgeUrl: '/images/gallery/lead_hackathon_address.jpg',
    isPublished: true,
    tags: ['Agentic AI', 'Autonomous Agents', 'ADK', 'Ubaid Ghazi', 'Tool Use', 'Reasoning', 'Machine Learning'],
    agenda: [
      { order: 1, time: '10:00 AM', title: 'Foundations of Autonomous Systems & Agent Mechanics', speaker: 'Ubaid Ghazi (Campus Lead)', description: 'Perception-action loops, memory structures, and agent architecture.' },
      { order: 2, time: '10:45 AM', title: 'Automated Reasoning, Tool Use & Decision-Making', speaker: 'Ubaid Ghazi', description: 'Integrating tools, function calling, external APIs, and multi-step reasoning processes.' },
      { order: 3, time: '11:30 AM', title: 'Live Coding Lab: Building AI Agents with ADK', speaker: 'Ubaid Ghazi', description: 'Hands-on practical development of custom intelligent agents from scratch.' },
      { order: 4, time: '12:30 PM', title: 'Student Agent Testing & Future ML Initiatives', speaker: 'Ubaid Ghazi', description: 'Testing student-built agents, real-time evaluation, and future automation initiatives.' },
    ],
  },

  // ─── 7B. GOOGLE COMMUNITY DAY 2025 (BY UBAID) ───────────────────────────────
  {
    slug: 'google-community-day-2025',
    title: 'Google Community Day 2025: Official Chapter Launch',
    description: 'The Google Community Day marked the grand official launch of the GDG On Campus CUI Wah chapter. Led by Campus Lead Ubaid ur Rehman alongside core executives Laiba Faiz, Alisha Fatima, and Fakhir Hassan, the session introduced the chapter vision, mission, and department tracks to the campus community. The event featured insightful addresses from the leadership, a keynote on Women in Tech highlighting innovation and inclusivity, formal induction of team members, and concluded with a celebratory cake-cutting ceremony.',
    type: 'COMMUNITY',
    location: 'Auditorium, COMSATS University Islamabad, Wah Campus',
    locationType: 'In-person',
    date: new Date('2026-04-15T10:00:00.000Z'),
    imageUrl: '/images/gallery/community_day_certificate_presentation.png',
    badgeUrl: '/images/chapter_photos/gdg_team_group.png',
    isPublished: true,
    tags: ['Community Day', 'Chapter Launch', 'Ubaid ur Rehman', 'Leadership', 'Women in Tech', 'Networking'],
    agenda: [
      { order: 1, time: '10:00 AM', title: 'Chapter Vision, Mission & Structure', speaker: 'Ubaid ur Rehman (Campus Lead)', description: 'Introducing GDGoC CUI Wah, developer tracks, industry roadmaps, and campus impact.' },
      { order: 2, time: '10:30 AM', title: 'Community Strategy & Department Portfolios', speaker: 'Laiba Faiz (Advisor) & Core Team', description: 'Overview of Technical, Creative, Operational, and Media domain tracks.' },
      { order: 3, time: '11:00 AM', title: 'Women in Tech Keynote: Inclusivity & Leadership', speaker: 'Alisha Fatima (Co-Campus Lead)', description: 'Empowering female developers and building supportive peer learning circles on campus.' },
      { order: 4, time: '11:45 AM', title: 'Formal Member Induction & Celebratory Ceremony', speaker: 'Executive Leadership', description: 'Official induction of department contributors, certificate presentations, and cake-cutting ceremony.' },
    ],
  },

  // ─── 7C. GOOGLE AI TOOLS & VIBE CODING (SP26 CLOSING CEREMONY) ─────────────
  {
    slug: 'google-ai-tools-vibe-coding-sp26',
    title: 'Google AI Tools & Vibe Coding – SP26 Closing Ceremony',
    description: 'GDGoC CUI Wah successfully organized a comprehensive two-session event as part of Spring 2026 semester activities. Session 01 explored Google AI Studio and iterative Vibe Coding led by Abdur Raheem with a 4-step prompt framework, followed by the GDG Hackathon announcement by Campus Lead Ubaid ur Rehman. Session 02 concluded the semester with guest keynotes by Farhan Ashraf and Dr. Wasif on Anti-Gravity, Vibe Coding, Google Gemini & NotebookLM, and awarded top 3 competition positions (Adil & Ismail 1st, Manahil 2nd, Fiza Batool Runner-Up).',
    type: 'WORKSHOP',
    location: 'Room B-25, COMSATS University Islamabad, Wah Campus & Online',
    locationType: 'Hybrid',
    date: new Date('2026-04-10T10:00:00.000Z'),
    imageUrl: '/images/chapter_photos/award_presentation.png',
    badgeUrl: '/images/chapter/keynote-speaker.png',
    isPublished: true,
    tags: ['Google AI Studio', 'Vibe Coding', 'Prompt Engineering', 'Gemini', 'NotebookLM', 'Awards', 'Closing Ceremony', 'Ubaid ur Rehman'],
    agenda: [
      { order: 1, time: 'Session 1 (07:00 PM)', title: 'Google AI Studio & Vibe Coding Introduction', description: 'AI-assisted development approach focused on building projects rapidly using AI tools.' },
      { order: 2, time: 'Session 1 (07:45 PM)', title: '4-Step Prompt Engineering Framework', description: 'Persuasion, Task, Context in Detail, and Output with Constraints.' },
      { order: 3, time: 'Session 1 (08:30 PM)', title: 'GDG Hackathon Announcement & Guidelines', speaker: 'Ubaid ur Rehman (Campus Lead)', description: 'Rules, timeline, team guidelines, evaluation criteria, and open participant Q&A.' },
      { order: 4, time: 'Session 2 (11:00 AM)', title: 'Guest Keynote: Anti-Gravity Theoretical Foundations', speaker: 'Farhan Ashraf (AI SecOps Engineer & GitHub Campus Expert)', description: 'Theoretical foundations of anti-gravity, scientific significance, and potential future aerospace applications.' },
      { order: 5, time: 'Session 2 (11:45 AM)', title: 'AI Tools Deep Dive: Google Gemini & NotebookLM', speaker: 'Farhan Ashraf', description: 'Hands-on practical use cases for research, note-taking, and content generation.' },
      { order: 6, time: 'Session 2 (12:30 PM)', title: 'SP26 Prize Distribution & Closing Ceremony', speaker: 'Dr. Wasif & Core Team', description: 'Awarding 1st Place (Adil & Ismail), 2nd Place (Manahil), and 2nd Runner-Up (Fiza Batool).' },
    ],
  },

  // ─── 8. WEB DEVELOPMENT FOR BEGINNERS ──────────────────────────────────────
  {
    slug: 'web-development-for-beginners',
    title: 'Web Development for Beginners Workshop Series',
    description: 'The Web Development for Beginners workshop provided students with a structured, hands-on introduction to the core technologies of the web. Conducted over multiple sessions across Friday, Saturday, and Sunday nights, the workshop covered the fundamentals of HTML for structuring web pages, CSS for styling and layout, and JavaScript for adding interactivity and dynamic behaviour. Led by Muhammad Ismail, students submitted final projects demonstrating their practical mastery.',
    type: 'WORKSHOP',
    location: 'Online (Weekend Nights)',
    locationType: 'Online',
    date: new Date('2026-03-25T10:00:00.000Z'),
    imageUrl: '/images/events/web-dev-beginners.jpg',
    badgeUrl: '/images/events/web-dev-beginners.jpg',
    isPublished: true,
    tags: ['Web Development', 'HTML/CSS', 'JavaScript', 'Muhammad Ismail', 'Frontend', 'Beginners'],
    agenda: [
      { order: 1, time: 'Weekend 1 (07:00 PM)', title: 'HTML5 Semantic Web Structures', speaker: 'Muhammad Ismail', description: 'Tags, forms, tables, media elements, and accessibility.' },
      { order: 2, time: 'Weekend 2 (07:00 PM)', title: 'CSS3 Modern Layouts, Flexbox & Grid', speaker: 'Muhammad Ismail', description: 'Responsive design, box model, CSS variables, and layout systems.' },
      { order: 3, time: 'Weekend 3 (07:00 PM)', title: 'JavaScript DOM Manipulation & Final Project', speaker: 'Muhammad Ismail', description: 'Event listeners, dynamic UI updates, API fetching, and capstone project submission.' },
    ],
  },
];

async function main() {
  console.log('🚀 Synchronizing all events with exact PDF information & sequence...');

  for (const ev of eventsData) {
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

    console.log(`✅ Synced: ${upserted.title} [${upserted.slug}] -> Date: ${upserted.date.toISOString().split('T')[0]}`);
  }

  console.log('\n🎉 All events successfully synchronized in database!');
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });
