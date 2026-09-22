import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, Users, CheckCircle2, Sparkles, BookOpen, Layers, Award } from 'lucide-react';
import styles from './ClubDetail.module.css';

interface ClubDetailData {
  slug: string;
  name: string;
  category: 'Technical Track' | 'Creative Track';
  tagline: string;
  bannerImage: string;
  bannerGradient: string;
  themeColor: string;
  teamLead: {
    name: string;
    role: string;
    imageUrl: string;
    profileSlug: string;
  };
  coLead?: {
    name: string;
    role: string;
    imageUrl: string;
    profileSlug: string;
  } | null;
  about: string;
  objectives: string[];
  technologies: string[];
  activities: string[];
}

const CLUBS_DATA: Record<string, ClubDetailData> = {
  'data-science-club': {
    slug: 'data-science-club',
    name: 'Data Science Club',
    category: 'Technical Track',
    tagline: 'Unlocking insights through data analysis, Python modeling, and machine learning.',
    bannerImage: '/images/chapter/keynote-speaker.png',
    bannerGradient: 'linear-gradient(135deg, #fbbc04 0%, #e37400 100%)',
    themeColor: '#FBBC04',
    teamLead: {
      name: 'Danyal Ahmad',
      role: 'Team Lead',
      imageUrl: '/images/team/danyal_ahmad.png',
      profileSlug: 'danyal-ahmed',
    },
    coLead: {
      name: 'Muhammad Akif Naveed',
      role: 'Co-Lead',
      imageUrl: '/images/team/akif_naveed.png',
      profileSlug: 'akif-naveed',
    },
    about: 'The Data Science Club is designed for students passionate about discovering patterns, building predictive statistical models, and transforming raw datasets into actionable intelligence. Members work with modern open-source Python libraries, participate in Kaggle hackathons, and build real-world data pipelines.',
    objectives: [
      'Master data manipulation using Pandas, NumPy, and DataFrames',
      'Understand statistical modeling and exploratory data analysis (EDA)',
      'Train supervised and unsupervised machine learning algorithms with Scikit-Learn',
      'Build interactive dashboards and visualizations with Seaborn & Matplotlib'
    ],
    technologies: ['Python', 'Pandas', 'NumPy', 'Scikit-Learn', 'Matplotlib', 'Kaggle', 'Jupyter'],
    activities: [
      'Hands-on Kaggle Competition Sprints',
      'Real-world Dataset Analytics Workshops',
      'Predictive Modeling Hackathons',
      'Guest Speaker Industry Keynotes'
    ]
  },
  'gen-ai-club': {
    slug: 'gen-ai-club',
    name: 'Gen AI Club',
    category: 'Technical Track',
    tagline: 'Exploring LLMs, prompt engineering, and Gemini integration to shape the future of AI.',
    bannerImage: '/images/chapter/hackdata-winner.png',
    bannerGradient: 'linear-gradient(135deg, #ea4335 0%, #c5221f 100%)',
    themeColor: '#EA4335',
    teamLead: {
      name: 'Maleeha Zulfiqar',
      role: 'Team Lead',
      imageUrl: '/images/team/maleeha_zulfiqr.png',
      profileSlug: 'maleeha-zulfiqr',
    },
    coLead: {
      name: 'Abdul Ahad Khan',
      role: 'Co-Lead',
      imageUrl: '/images/team/abdul_ahad.png',
      profileSlug: 'abdul-ahad',
    },
    about: 'The Gen AI Club dives into the cutting edge of Generative Artificial Intelligence. From integrating Google Gemini APIs to building Retrieval-Augmented Generation (RAG) agentic systems, members explore state-of-the-art LLMs, multimodal models, and autonomous AI agents.',
    objectives: [
      'Build generative apps powered by Google Gemini and Vertex AI APIs',
      'Understand Retrieval-Augmented Generation (RAG) and Vector Databases',
      'Master prompt engineering techniques and fine-tuning open weights models',
      'Develop multimodal applications capable of image, text, and code synthesis'
    ],
    technologies: ['Google Gemini API', 'PyTorch', 'LangChain', 'LlamaIndex', 'Vertex AI', 'ChromaDB', 'Python'],
    activities: [
      'Gemini API AI Hackathons',
      'RAG Agentic System Codelabs',
      'Prompt Engineering Challenges',
      'AI Research Paper Discussions'
    ]
  },
  'vibe-coding-club': {
    slug: 'vibe-coding-club',
    name: 'Vibe Coding Club',
    tagline: 'Building software at lightning speed with modern AI assistance and rapid prototyping.',
    category: 'Technical Track',
    bannerImage: '/images/chapter/audience.png',
    bannerGradient: 'linear-gradient(135deg, #34a853 0%, #1e8e3e 100%)',
    themeColor: '#34A853',
    teamLead: {
      name: 'Muhammad Alyan',
      role: 'Team Lead',
      imageUrl: '/images/team/muhammad_alyan.png',
      profileSlug: 'muhammad-alyan',
    },
    coLead: {
      name: 'Sana Shahid',
      role: 'Co-Lead',
      imageUrl: '/images/team/sana_shahid.png',
      profileSlug: 'sana-shahid',
    },
    about: 'Vibe Coding is all about the modern flow state: utilizing AI coding partners like Cursor, GitHub Copilot, and Gemini Code Assist to turn concepts into functional production code in record time. We focus on rapid experimentation, speed coding, and full-stack product building.',
    objectives: [
      'Master AI-driven code generation, refactoring, and debugging',
      'Build full-stack MVPs from scratch in single-day build sessions',
      'Understand rapid prototyping workflows and modern developer tooling',
      'Participate in fast-paced speed coding hackathons'
    ],
    technologies: ['Cursor IDE', 'GitHub Copilot', 'Gemini Code Assist', 'Next.js', 'Tailwind CSS', 'TypeScript', 'Node.js'],
    activities: [
      '24-Hour Prototype Sprints',
      'Speed Coding Competitions',
      'Vibe Coding Live Demos',
      'AI Pair Programming Night'
    ]
  },
  'web-design-club': {
    slug: 'web-design-club',
    name: 'Web Design Club',
    tagline: 'Crafting responsive, pixel-perfect web applications with modern frontend frameworks.',
    category: 'Technical Track',
    bannerImage: '/images/chapter/keynote-speaker.png',
    bannerGradient: 'linear-gradient(135deg, #1a73e8 0%, #174ea6 100%)',
    themeColor: '#4285F4',
    teamLead: {
      name: 'Umm e Habiba',
      role: 'Team Lead',
      imageUrl: '/images/team/umme_habiba.png',
      profileSlug: 'umme-habiba',
    },
    coLead: {
      name: 'Zohaib Arif',
      role: 'Co-Lead',
      imageUrl: '/images/team/zohaib_arif.png',
      profileSlug: 'zohaib-arif',
    },
    about: 'The Web Design Club focuses on building responsive, high-performance websites and modern web interfaces. From mastering React and Next.js to designing accessible, fluid UI components with Tailwind CSS and CSS Modules, members gain end-to-end web engineering skills.',
    objectives: [
      'Build production-ready Next.js App Router websites',
      'Implement responsive layouts and fluid CSS animations',
      'Master TypeScript, component composition, and state management',
      'Optimize web performance, accessibility (a11y), and SEO'
    ],
    technologies: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Figma', 'Vercel'],
    activities: [
      'Frontend Component Design Challenges',
      'Responsive Web Re-Design Workshops',
      'Portfolio Building Sessions',
      'Web Performance Code Reviews'
    ]
  },
  'creative-club': {
    slug: 'creative-club',
    name: 'Creative Club',
    tagline: 'Defining our visual identity through graphics, UI/UX systems, and brand design.',
    category: 'Creative Track',
    bannerImage: '/images/chapter_photos/sumama_talk.png',
    bannerGradient: 'linear-gradient(135deg, #fbbc04 0%, #e37400 100%)',
    themeColor: '#FBBC04',
    teamLead: {
      name: 'Talha Ahmed',
      role: 'Team Lead',
      imageUrl: '/images/team/talha_ahmed.png',
      profileSlug: 'talha-ahmed',
    },
    coLead: {
      name: 'Syeda Wareesha',
      role: 'Co-Lead',
      imageUrl: '/images/team/syeda_wareesha.png',
      profileSlug: 'syeda-wareesha',
    },
    about: 'The Creative Club is the artistic powerhouse behind GDGoC. Members design event banners, social media graphics, UI/UX design prototypes, and official chapter merchandise, following Google Developer Groups visual design guidelines.',
    objectives: [
      'Create high-impact graphic designs using Figma and Adobe Illustrator',
      'Master UI/UX wireframing, prototyping, and user research',
      'Follow Google Brand Guidelines and design design systems',
      'Produce visual collateral for major tech conferences and hackathons'
    ],
    technologies: ['Figma', 'Adobe Illustrator', 'Adobe Photoshop', 'Canva', 'UI/UX Design Systems'],
    activities: [
      'UI/UX Design Jam & Critiques',
      'Poster & Banner Design Challenges',
      'Figma Component Library Workshops',
      'Brand Identity Masterclasses'
    ]
  },
  'social-club': {
    slug: 'social-club',
    name: 'Social Club',
    tagline: 'Amplifying our chapter voice, social outreach, and developer community stories.',
    category: 'Creative Track',
    bannerImage: '/images/chapter_photos/fatima_maleeha_session.png',
    bannerGradient: 'linear-gradient(135deg, #ea4335 0%, #b31412 100%)',
    themeColor: '#EA4335',
    teamLead: {
      name: 'Muhammad Abdullah',
      role: 'Team Lead',
      imageUrl: '/images/team/abdullah_amir.png',
      profileSlug: 'abdullah-amir',
    },
    coLead: {
      name: 'Muhammad Baseer',
      role: 'Co-Lead',
      imageUrl: '/images/team/muhammad_baseer.png',
      profileSlug: 'muhammad-baseer',
    },
    about: 'The Social Club connects our chapter with tech enthusiasts locally and globally. Members craft compelling narratives, manage social media campaigns across LinkedIn, Instagram, and X, create event teasers, and spotlight community achievements.',
    objectives: [
      'Develop digital marketing and content calendar strategies',
      'Write engaging developer stories and technical event recaps',
      'Manage official community social channels and growth metrics',
      'Produce video reels, highlights, and promotional media'
    ],
    technologies: ['LinkedIn', 'Instagram', 'CapCut', 'Canva', 'Analytics & Social Metrics'],
    activities: [
      'Social Campaign Strategy Meetings',
      'Event Live-Coverage & Reels Creation',
      'Developer Spotlight Interviews',
      'Community Outreach Drives'
    ]
  },
  'event-club': {
    slug: 'event-club',
    name: 'Event Club',
    tagline: 'Orchestrating world-class hackathons, workshops, and technical keynotes.',
    category: 'Creative Track',
    bannerImage: '/images/chapter_photos/gdg_team_group.png',
    bannerGradient: 'linear-gradient(135deg, #34a853 0%, #0d652d 100%)',
    themeColor: '#34A853',
    teamLead: {
      name: 'Mohsin Shakeel',
      role: 'Team Lead',
      imageUrl: '/images/team/mohsin_shakeel.png',
      profileSlug: 'mohsin-shakeel',
    },
    coLead: {
      name: 'Muhammad Haseeb',
      role: 'Co-Lead',
      imageUrl: '/images/team/muhammad_haseeb.png',
      profileSlug: 'muhammad-haseeb',
    },
    about: 'The Event Club is the logistical backbone of GDGoC. From hosting multi-day hackathons like HackData to organizing hands-on codelabs and guest speaker sessions, members manage venue setup, scheduling, speaker management, and attendee experience.',
    objectives: [
      'Plan and execute end-to-end technical events and hackathons',
      'Manage venue logistics, registration desks, and stage setups',
      'Coordinate with keynote speakers, industry mentors, and judges',
      'Deliver memorable, inclusive event experiences for all participants'
    ],
    technologies: ['Event Management Systems', 'Bevy Platform', 'Google Workspace', 'Logistics Management'],
    activities: [
      'Hackathon Preparation & Dry Runs',
      'Speaker Hospitality & Onboarding',
      'Venue & Stage Production Operations',
      'Post-Event Retrospectives'
    ]
  }
};

function getClubDataBySlug(slug: string): ClubDetailData | undefined {
  const normalized = slug.toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]/g, '-');

  if (normalized.includes('gen-ai') || normalized.includes('generative-ai') || normalized.includes('ai-ml')) {
    return CLUBS_DATA['gen-ai-club'];
  }
  if (normalized.includes('data-science') || normalized.includes('data')) {
    return CLUBS_DATA['data-science-club'];
  }
  if (normalized.includes('vibe') || normalized.includes('coding')) {
    return CLUBS_DATA['vibe-coding-club'];
  }
  if (normalized.includes('web') || normalized.includes('app-development')) {
    return CLUBS_DATA['web-design-club'];
  }
  if (normalized.includes('creative') || normalized.includes('ui-ux') || normalized.includes('graphics')) {
    return CLUBS_DATA['creative-club'];
  }
  if (normalized.includes('social') || normalized.includes('growth') || normalized.includes('impact')) {
    return CLUBS_DATA['social-club'];
  }
  if (normalized.includes('event') || normalized.includes('logistics')) {
    return CLUBS_DATA['event-club'];
  }

  return CLUBS_DATA[slug];
}

export default async function ClubDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;
  const club = getClubDataBySlug(slug);

  if (!club) {
    notFound();
  }

  return (
    <div className={styles.pageWrapper}>
      {/* 1. Full-Width Top Banner */}
      <div className={styles.bannerSection} style={{ background: club.bannerGradient }}>
        <div className={styles.bannerOverlayImage}>
          <img src={club.bannerImage} alt={club.name} className={styles.bannerBgImg} />
          <div className={styles.bannerDarkMask}></div>
        </div>

        <div className={styles.bannerContent}>
          <Link href="/clubs" className={styles.backButton}>
            <ArrowLeft size={16} /> Back to Clubs
          </Link>

          <span className={styles.categoryBadge}>{club.category}</span>
          <h1 className={styles.clubTitle}>{club.name}</h1>
          <p className={styles.clubTagline}>{club.tagline}</p>
        </div>
      </div>

      <div className={styles.container}>
        {/* 2 & 3. Team Lead & Co-Lead Side-by-Side Section */}
        <section className={styles.leadsSection}>
          <h2 className={styles.sectionHeaderTitle}>
            <Users size={22} className={styles.headerIcon} /> Club Leadership
          </h2>

          <div className={styles.leadsGrid}>
            {/* Team Lead Card */}
            <Link href={`/team/${club.teamLead.profileSlug}`} className={styles.leadProfileCard}>
              <div className={styles.profileAvatarWrapper}>
                <img src={club.teamLead.imageUrl} alt={club.teamLead.name} className={styles.profileAvatarImg} />
              </div>
              <h3 className={styles.leadPersonName}>{club.teamLead.name}</h3>
              <p className={styles.leadRoleBadge}>{club.teamLead.role}</p>
            </Link>

            {/* Co-Lead Card */}
            {club.coLead?.name ? (
              <Link href={`/team/${club.coLead.profileSlug}`} className={styles.leadProfileCard}>
                <div className={styles.profileAvatarWrapper}>
                  <img src={club.coLead.imageUrl} alt={club.coLead.name} className={styles.profileAvatarImg} />
                </div>
                <h3 className={styles.leadPersonName}>{club.coLead.name}</h3>
                <p className={styles.leadRoleBadge}>{club.coLead.role}</p>
              </Link>
            ) : (
              <div className={styles.leadProfileCard} style={{ border: '2px dashed #dadce0', background: '#fafafa', cursor: 'default' }}>
                <div className={styles.profileAvatarWrapper} style={{ background: '#f1f3f4', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ fontSize: '2rem', opacity: 0.4 }}>👤</span>
                </div>
                <h3 className={styles.leadPersonName} style={{ color: '#9aa0a6' }}>Position Vacant</h3>
                <p className={styles.leadRoleBadge} style={{ background: '#f1f3f4', color: '#70757a' }}>Co-Lead</p>
              </div>
            )}
          </div>
        </section>

        {/* 4 & 5. About the Club Section */}
        <section className={styles.aboutSection}>
          <h2 className={styles.sectionHeaderTitle}>
            <BookOpen size={22} className={styles.headerIcon} /> About the Club
          </h2>

          <div className={styles.aboutCardContainer}>
            <p className={styles.aboutMainDescription}>{club.about}</p>

            <div className={styles.detailsGrid}>
              {/* Objectives */}
              <div className={styles.detailBox}>
                <h3 className={styles.detailBoxTitle}>
                  <Sparkles size={18} color={club.themeColor} /> Key Objectives
                </h3>
                <ul className={styles.detailList}>
                  {club.objectives.map((obj, idx) => (
                    <li key={idx}>
                      <CheckCircle2 size={16} className={styles.checkIcon} style={{ color: club.themeColor }} />
                      <span>{obj}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Technologies */}
              <div className={styles.detailBox}>
                <h3 className={styles.detailBoxTitle}>
                  <Layers size={18} color={club.themeColor} /> Tools & Technologies
                </h3>
                <div className={styles.techPillGrid}>
                  {club.technologies.map((tech, idx) => (
                    <span key={idx} className={styles.techTagPill}>
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Activities */}
              <div className={styles.detailBoxFull}>
                <h3 className={styles.detailBoxTitle}>
                  <Award size={18} color={club.themeColor} /> Activities & Workshops
                </h3>
                <div className={styles.activityGrid}>
                  {club.activities.map((act, idx) => (
                    <div key={idx} className={styles.activityCard}>
                      <span className={styles.activityDot} style={{ background: club.themeColor }}></span>
                      <span>{act}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
