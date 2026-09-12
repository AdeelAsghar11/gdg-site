import React from 'react';
import Link from 'next/link';
import { ExternalLink } from 'lucide-react';
import { prisma } from '@/lib/prisma';

interface TeamCardProps {
  name: string;
  role: string;
  imageUrl: string;
  slug: string;
  badge?: string;
  badgeColor?: string;
}

const TeamCard = ({ name, role, imageUrl, slug, badge, badgeColor = '#4285F4' }: TeamCardProps) => (
  <Link href={`/team/${slug}`} style={{ textDecoration: 'none' }}>
    <div className="team-card">
      <div className="image-container">
        <img src={imageUrl} alt={name} className="profile-img" />
        <div className="overlay team-overlay">
          <ExternalLink size={16} color="white" />
        </div>
      </div>
      {badge && (
        <span className="role-badge" style={{ backgroundColor: `${badgeColor}15`, color: badgeColor, borderColor: `${badgeColor}30` }}>
          {badge}
        </span>
      )}
      <h3 className="member-name">{name}</h3>
      <p className="member-role">{role}</p>
    </div>
  </Link>
);

const LeadershipCard = ({ name, role, imageUrl, slug, size = 170 }: TeamCardProps & { size?: number }) => (
  <Link href={`/team/${slug}`} style={{ textDecoration: 'none' }}>
    <div className="leadership-card">
      <div className="lead-img-container" style={{ width: size, height: size }}>
        <img src={imageUrl} alt={name} className="lead-img" />
        <div className="overlay lead-overlay">
          <ExternalLink size={20} color="white" />
        </div>
      </div>
      <h3 className="lead-name">{name}</h3>
      <p className="lead-role">{role}</p>
    </div>
  </Link>
);

interface DomainTrackPairProps {
  domainName: string;
  colorHex: string;
  lead: { name: string; role: string; imageUrl: string; slug: string };
  coLead?: { name: string; role: string; imageUrl: string; slug: string } | null;
}

const DomainTrackPair = ({ domainName, colorHex, lead, coLead }: DomainTrackPairProps) => (
  <div className="domain-pair-card" style={{ borderTop: `4px solid ${colorHex}` }}>
    <div className="domain-track-header">
      <span className="domain-dot" style={{ backgroundColor: colorHex }}></span>
      <h3 className="domain-track-title">{domainName}</h3>
    </div>

    {/* Lead (Top) */}
    <div className="pair-member-wrapper">
      <TeamCard
        name={lead.name}
        role={lead.role}
        imageUrl={lead.imageUrl}
        slug={lead.slug}
        badge="Lead"
        badgeColor={colorHex}
      />
    </div>

    {/* Vertical Connector */}
    <div className="domain-vertical-connector">
      <div className="connector-line"></div>
      <span className="connector-pill">Co-Lead</span>
      <div className="connector-line"></div>
    </div>

    {/* Co-Lead (Below) */}
    <div className="pair-member-wrapper">
      {coLead && coLead.name ? (
        <TeamCard
          name={coLead.name}
          role={coLead.role}
          imageUrl={coLead.imageUrl}
          slug={coLead.slug}
          badge="Co-Lead"
          badgeColor="#5f6368"
        />
      ) : (
        <div style={{
          minHeight: 220,
          border: '2px dashed #dadce0',
          borderRadius: 16,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#fafafa',
          padding: '24px 16px',
          textAlign: 'center',
          color: '#9aa0a6',
        }}>
          <div style={{
            width: 56,
            height: 56,
            borderRadius: '50%',
            background: '#f1f3f4',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 10,
            fontSize: '1.4rem',
            color: '#bdc1c6'
          }}>
            👤
          </div>
          <span style={{ fontSize: '0.88rem', fontWeight: 600, color: '#5f6368' }}>Position Vacant</span>
          <span style={{ fontSize: '0.75rem', color: '#9aa0a6', marginTop: 2 }}>Creative Co-Lead</span>
        </div>
      )}
    </div>
  </div>
);

export default async function TeamPage() {
  let members: any[] = [];
  try {
    members = await prisma.member.findMany({
      where: { isActive: true },
      select: { id: true, role: true, department: true }
    });
  } catch (error) {
    console.warn('⚠️ Could not fetch members for /team during build.');
  }

  const coreLeads = members.filter(m => ['core', 'admin'].includes(m.role));
  const departments = [...new Set(members.map(m => (m as any).department).filter(Boolean))];

  return (
    <div className="app-container">
      <style>{`
        :root {
          --google-blue: #4285F4;
          --google-red: #EA4335;
          --google-yellow: #FBBC04;
          --google-green: #34A853;
          --bg-gray: #f8f9fa;
          --text-main: #1f1f1f;
          --text-sub: #5f6368;
          --border-light: #e0e0e0;
          --line-color: #d1d5db;
        }

        .app-container {
          min-height: 100vh;
          background-color: var(--bg-gray);
          font-family: var(--font-primary, 'Google Sans', 'Roboto', system-ui, -apple-system, sans-serif);
          color: var(--text-main);
          margin: 0;
          padding: 0;
        }

        .hero {
            padding: 8rem 1.5rem 4rem 1.5rem;
            position: relative;
            overflow: hidden;
            background: white;
            border-bottom: 1px solid #e0e0e0;
        }

        .hero::before {
            content: "";
            position: absolute;
            top: -150px;
            right: -100px;
            width: 500px;
            height: 500px;
            background: radial-gradient(circle, rgba(251, 188, 4, 0.15) 0%, transparent 70%);
            z-index: 0;
            border-radius: 50%;
            pointer-events: none;
        }

        .hero-content {
            position: relative;
            z-index: 1;
            max-width: 1100px;
            margin: 0 auto;
            text-align: left;
        }

        .hero-breadcrumb {
            display: flex;
            gap: 8px;
            align-items: center;
            font-size: 0.85rem;
            font-weight: 500;
            color: var(--text-sub);
            margin-bottom: 1.25rem;
        }

        .hero-breadcrumb .dot-sep {
            width: 4px;
            height: 4px;
            background: #dadce0;
            border-radius: 50%;
        }

        .hero-title {
            font-family: 'Product Sans', sans-serif;
            font-size: clamp(2.2rem, 5vw, 3.5rem);
            line-height: 1.1;
            margin-bottom: 1rem;
            color: #1a1a1a;
            letter-spacing: -0.02em;
        }

        .hero-title span { 
            color: #FBBC04;
        }

        .hero-subtitle {
            font-size: 1.15rem;
            color: var(--text-sub);
            max-width: 650px;
            margin-bottom: 2rem;
            line-height: 1.5;
        }

        .hero-meta {
            display: flex;
            flex-wrap: wrap;
            gap: 20px;
        }

        .meta-item {
            display: flex;
            align-items: center;
            gap: 8px;
            font-size: 0.9rem;
            color: var(--text-sub);
            font-weight: 500;
            padding: 6px 14px;
            background: #f8f9fa;
            border-radius: 100px;
        }

        .meta-dot {
            width: 8px;
            height: 8px;
            border-radius: 50%;
        }

        @media (max-width: 768px) {
            .hero { padding: 6rem 1.5rem 4rem 1.5rem; }
            .hero-title { font-size: 2.5rem; }
        }

        .main-content {
          max-width: 1200px;
          margin: 0 auto;
          padding: 4rem 1.5rem;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .vertical-line {
          width: 1px;
          height: 50px;
          background-color: var(--line-color);
        }

        .section-heading {
          font-family: 'Product Sans', var(--font-primary, 'Google Sans', sans-serif);
          font-size: clamp(2rem, 4.5vw, 2.75rem);
          font-weight: 700;
          color: #1a1a1a;
          margin: 0 0 1.25rem 0;
          text-align: center;
          letter-spacing: -0.02em;
          line-height: 1.15;
          width: 100%;
        }

        .section-subheading {
          font-size: 1.05rem;
          color: var(--text-sub, #5f6368);
          margin: 0 auto 2.5rem auto;
          text-align: center;
          max-width: 650px;
          display: block;
          width: 100%;
          line-height: 1.5;
        }

        .leadership-card {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          width: 220px;
          cursor: pointer;
          transition: transform 0.25s ease;
        }

        .leadership-card:hover {
          transform: translateY(-4px);
        }

        .leadership-card:hover .overlay { opacity: 1; }

        .leadership-card:hover .lead-img-container {
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
          transform: scale(1.03);
        }

        .lead-img-container {
          position: relative;
          width: 170px;
          height: 170px;
          border-radius: 50%;
          overflow: hidden;
          background: #f1f3f4;
          box-shadow: 0 4px 14px rgba(0, 0, 0, 0.08);
          transition: box-shadow 0.25s ease, transform 0.25s ease;
          margin-bottom: 1rem;
        }

        .lead-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .lead-overlay { border-radius: 50%; }

        .lead-name {
          margin: 0;
          font-weight: 700;
          font-size: 1.2rem;
          color: #1a1a1a;
          line-height: 1.3;
        }

        .lead-role {
          margin: 6px 0 0;
          font-size: 0.85rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: var(--google-blue);
        }

        .core-container {
          background: white;
          border: 1px solid var(--border-light);
          border-radius: 36px;
          padding: 3.5rem 2rem;
          width: 100%;
          text-align: center;
          box-sizing: border-box;
          box-shadow: 0 4px 20px rgba(0,0,0,0.03);
        }

        .team-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(170px, 1fr));
          gap: 2.5rem 1.5rem;
          width: 100%;
          margin-top: 1.5rem;
          justify-items: center;
        }

        .team-card {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          width: 170px;
          cursor: pointer;
          transition: transform 0.25s ease;
        }

        .team-card:hover {
          transform: translateY(-4px);
        }

        .team-card:hover .overlay { opacity: 1; }

        .team-card:hover .image-container {
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
          transform: scale(1.03);
        }

        .image-container {
          width: 120px;
          height: 120px;
          border-radius: 50%;
          overflow: hidden;
          position: relative;
          background: #f1f3f4;
          box-shadow: 0 4px 14px rgba(0, 0, 0, 0.08);
          transition: box-shadow 0.25s ease, transform 0.25s ease;
          margin-bottom: 0.75rem;
        }

        .profile-img { width: 100%; height: 100%; object-fit: cover; }

        .team-overlay { border-radius: 50%; }

        .role-badge {
          font-size: 0.68rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          padding: 3px 10px;
          border-radius: 100px;
          border: 1px solid;
          margin-bottom: 6px;
        }

        .overlay {
          position: absolute;
          inset: 0;
          background: rgba(0,0,0,0.4);
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: opacity 0.2s;
        }

        .member-name { 
          margin: 0; 
          font-weight: 700; 
          font-size: 1rem; 
          color: #1a1a1a;
          line-height: 1.3;
        }

        .member-role { 
          margin: 4px 0 0; 
          font-size: 0.75rem; 
          font-weight: 600; 
          text-transform: uppercase; 
          letter-spacing: 0.06em;
          color: var(--text-sub);
        }

        /* ── DOMAIN PAIR CARDS (LEAD ABOVE, CO-LEAD BELOW) ── */
        .domain-pairs-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 2rem;
          width: 100%;
          box-sizing: border-box;
        }

        .domain-pair-card {
          background: white;
          border: 1px solid var(--border-light);
          border-radius: 28px;
          padding: 2rem 1.25rem 2.25rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.03);
          transition: transform 0.25s ease, box-shadow 0.25s ease;
        }

        .domain-pair-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
        }

        .domain-track-header {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 1.75rem;
          padding-bottom: 0.75rem;
          border-bottom: 1px solid #f1f3f4;
          width: 100%;
          justify-content: center;
        }

        .domain-dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
        }

        .domain-track-title {
          font-family: 'Product Sans', sans-serif;
          font-size: 1.15rem;
          font-weight: 700;
          color: #1a1a1a;
          margin: 0;
        }

        .pair-member-wrapper {
          display: flex;
          justify-content: center;
          width: 100%;
        }

        .domain-vertical-connector {
          display: flex;
          align-items: center;
          gap: 8px;
          width: 80%;
          margin: 1.25rem 0;
        }

        .connector-line {
          flex: 1;
          height: 1px;
          background: #e0e0e0;
        }

        .connector-pill {
          font-size: 0.65rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: #80868b;
          background: #f1f3f4;
          padding: 2px 8px;
          border-radius: 12px;
        }

        /* ── CREATIVE TRACKS (FLEX PAIRS) ── */
        .creative-tracks-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 2rem;
          width: 100%;
          box-sizing: border-box;
        }

        @media (max-width: 768px) {
          .hero-title { font-size: 2.5rem; }
          .team-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 2rem 1rem; }
          .team-card { width: 100%; }
          .core-container { padding: 2.5rem 1rem; border-radius: 24px; }
          .domain-pairs-grid { grid-template-columns: 1fr; }
          .creative-tracks-grid { grid-template-columns: 1fr; }
        }

        .cta-section { width: 100%; padding: 5rem 0; background: white; margin-top: 3rem; border-top: 1px solid var(--border-light); overflow: hidden; }
        .brace-container { display: flex; align-items: center; justify-content: center; max-width: 1100px; margin: 0 auto; width: 100%; padding: 0 2rem; }
        .brace-wrapper { flex-shrink: 0; }
        .brace-svg { height: 100px; width: auto; opacity: 0.8; }
        .cta-content { flex-grow: 1; text-align: center; padding: 0 0.5rem; }
        .cta-title { font-size: 1.5rem; font-weight: 500; color: #202124; margin-bottom: 0.75rem; letter-spacing: -0.02em; line-height: 1.1; font-family: 'Product Sans', sans-serif; }
        .cta-desc { font-size: 0.9rem; color: #5f6368; line-height: 1.4; margin-bottom: 1.25rem; }
        .cta-hashtag { font-weight: 700; color: #202124; }
        .cta-yellow-link { display: inline-flex; align-items: center; color: #FBBC04; font-weight: 700; font-size: 0.95rem; text-decoration: none; transition: opacity 0.2s; border-bottom: 2px solid transparent; padding-bottom: 2px; }
        .cta-yellow-link:hover { opacity: 0.8; border-bottom-color: #FBBC04; }
        .cta-yellow-link::after { content: '→'; margin-left: 6px; font-size: 1rem; transition: transform 0.2s; }
        .cta-yellow-link:hover::after { transform: translateX(4px); }

        @media (min-width: 768px) {
            .brace-svg { height: 160px; }
            .cta-content { padding: 0 1.5rem; }
            .cta-title { font-size: 2.2rem; }
            .cta-desc { font-size: 1rem; }
            .hide-mobile { display: block; }
        }

        .animate-fade-in { animation: fadeIn 0.6s ease-out forwards; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>

      <header className="hero">
        <div className="hero-content">
          <nav className="hero-breadcrumb">
            <span>GDGoC</span> <span className="dot-sep"></span> <span style={{ color: "#FBBC04" }}>Our Team</span>
          </nav>
          <h1 className="hero-title">The <span>Minds</span> behind the magic.</h1>
          <p className="hero-subtitle">Meet the leads, developers, and designers working tirelessly to bring world-class events and resources to our campus.</p>
          <div className="hero-meta">
            <div className="meta-item"><span className="meta-dot" style={{ background: "#FBBC04" }}></span> {coreLeads.length} Core Leads</div>
            <div className="meta-item"><span className="meta-dot" style={{ background: "#EA4335" }}></span> {departments.length} Departments</div>
          </div>
        </div>
      </header>

      <main className="main-content">
        {/* ── 1. FACULTY HEAD & CAMPUS LEAD (VERTICAL HIERARCHY) ── */}
        <section style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
          <h2 className="section-heading">Leadership</h2>
          
          <LeadershipCard
            name="Dr. Kashif Ayyub"
            role="Faculty Head"
            imageUrl="/images/team/kashif_ayub.png"
            slug="kashif-ayub"
            size={170}
          />

          <div className="vertical-line" style={{ height: '40px' }}></div>

          <LeadershipCard
            name="Ubaid Ghazi"
            role="Campus Lead"
            imageUrl="/images/team/ubaid.png"
            slug="ubaid"
            size={170}
          />
        </section>

        <div className="vertical-line" style={{ height: '60px' }}></div>

        {/* ── 2. CORE TEAM ── */}
        <div className="core-container">
          <h2 className="section-heading">Core Team</h2>
          <p className="section-subheading">Driving operations, technical vision, and community strategy across campus</p>
          
          <div className="team-grid">
            <TeamCard
              name="Alisha Fatima"
              role="Co-Campus Lead"
              imageUrl="/images/team/alisha_fatima.png"
              slug="alisha-fatima"
            />
            <TeamCard
              name="Laiba Faiz"
              role="Executive Advisor"
              imageUrl="/images/team/laiba_faiz.png"
              slug="laiba-faiz"
            />
            <TeamCard
              name="Saad Ali"
              role="Advisor"
              imageUrl="/images/team/saad_ali.png"
              slug="saad-ali"
            />
            <TeamCard
              name="Junaid Mehmood"
              role="General Secretary"
              imageUrl="/images/team/junaid_mehmood.png"
              slug="junaid-mehmood"
            />
            <TeamCard
              name="Adeel Asghar"
              role="Community Manager"
              imageUrl="/images/team/adeel_asghar.png"
              slug="adeel"
            />
            <TeamCard
              name="Muhammad Yousaf"
              role="Operational Lead"
              imageUrl="/images/team/m_yousaf.png"
              slug="m-yousaf"
            />
            <TeamCard
              name="Muhammad Ismail"
              role="Tech Lead"
              imageUrl="/images/team/m_ismail.png"
              slug="ismail"
            />
            <TeamCard
              name="Manahil Mirza"
              role="Women in Tech Lead"
              imageUrl="/images/team/manahil_mirza.png"
              slug="manahil-mirza"
            />
            <TeamCard
              name="Fatima Qureshi"
              role="Outreach Lead"
              imageUrl="/images/team/fatima_qureshi.png"
              slug="fatima-qureshi"
            />
          </div>
        </div>

        <div className="vertical-line" style={{ height: '60px' }}></div>

        {/* ── 3. DOMAIN LEADS & CO-LEADS (VERTICAL LEAD ABOVE / CO-LEAD BELOW) ── */}
        <section style={{ width: '100%', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <h2 className="section-heading">Domain Leads & Co-Leads</h2>
          <p className="section-subheading">Technical domains led by specialists and co-leads powering hands-on development</p>

          <div className="domain-pairs-grid">
            {/* Vibe Coding */}
            <DomainTrackPair
              domainName="Vibe Coding"
              colorHex="#34A853"
              lead={{
                name: "Muhammad Alyan",
                role: "Vibe Coding Lead",
                imageUrl: "/images/team/muhammad_alyan.png",
                slug: "muhammad-alyan"
              }}
              coLead={{
                name: "Sana Shahid",
                role: "Vibe Coding Co-Lead",
                imageUrl: "/images/team/sana_shahid.png",
                slug: "sana-shahid"
              }}
            />

            {/* Gen AI */}
            <DomainTrackPair
              domainName="Generative AI"
              colorHex="#EA4335"
              lead={{
                name: "Maleeha Zulfiqar",
                role: "Gen AI Lead",
                imageUrl: "/images/team/maleeha_zulfiqr.png",
                slug: "maleeha-zulfiqr"
              }}
              coLead={{
                name: "Abdul Ahad Khan",
                role: "Gen AI Co-Lead",
                imageUrl: "/images/team/abdul_ahad.png",
                slug: "abdul-ahad"
              }}
            />

            {/* Data Science */}
            <DomainTrackPair
              domainName="Data Science & AI"
              colorHex="#FBBC04"
              lead={{
                name: "Danyal Ahmad",
                role: "Data Science Lead",
                imageUrl: "/images/team/danyal_ahmad.png",
                slug: "danyal-ahmed"
              }}
              coLead={{
                name: "Muhammad Akif Naveed",
                role: "AI & Data Science Co-Lead",
                imageUrl: "/images/team/akif_naveed.png",
                slug: "akif-naveed"
              }}
            />

            {/* Web & App */}
            <DomainTrackPair
              domainName="Web & App Development"
              colorHex="#4285F4"
              lead={{
                name: "Umm e Habiba",
                role: "Web & App Lead",
                imageUrl: "/images/team/umme_habiba.png",
                slug: "umme-habiba"
              }}
              coLead={{
                name: "Zohaib Arif",
                role: "Web & App Co-Lead",
                imageUrl: "/images/team/zohaib_arif.png",
                slug: "zohaib-arif"
              }}
            />
          </div>
        </section>

        <div className="vertical-line" style={{ height: '60px' }}></div>

        {/* ── 4. CREATIVE LEADS & CO-LEADS ── */}
        <section style={{ width: '100%', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <h2 className="section-heading">Creative & Management Leads</h2>
          <p className="section-subheading">Driving chapter outreach, media production, and flagship event execution</p>

          <div className="creative-tracks-grid">
            {/* Creative & Design */}
            <DomainTrackPair
              domainName="Creative & Design"
              colorHex="#FBBC04"
              lead={{
                name: "Talha Ahmed",
                role: "Creative Lead",
                imageUrl: "/images/team/talha_ahmed.png",
                slug: "talha-ahmed"
              }}
              coLead={null}
            />

            {/* Growth and Impact */}
            <DomainTrackPair
              domainName="Growth and Impact"
              colorHex="#EA4335"
              lead={{
                name: "Muhammad Abdullah",
                role: "Media Lead",
                imageUrl: "/images/team/abdullah_amir.png",
                slug: "abdullah-amir"
              }}
              coLead={{
                name: "Muhammad Baseer",
                role: "Growth & Impact Co-Lead",
                imageUrl: "/images/team/muhammad_baseer.png",
                slug: "muhammad-baseer"
              }}
            />

            {/* Event Management */}
            <DomainTrackPair
              domainName="Event Management"
              colorHex="#34A853"
              lead={{
                name: "Mohsin Shakeel",
                role: "Event Management Lead",
                imageUrl: "/images/team/mohsin_shakeel.png",
                slug: "mohsin-shakeel"
              }}
              coLead={{
                name: "Muhammad Haseeb",
                role: "Events Co-Lead",
                imageUrl: "/images/team/muhammad_haseeb.png",
                slug: "muhammad-haseeb"
              }}
            />
          </div>
        </section>
      </main>

      <section className="cta-section animate-fade-in">
        <div className="brace-container">
          {/* Left Brace */}
          <div className="brace-wrapper">
            <svg className="brace-svg" viewBox="0 0 60 200" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M50 10C50 10 25 10 25 35V85C25 95 10 100 10 100C10 100 25 105 25 115V165C25 190 50 190 50 190"
                stroke="#202124" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>

          {/* Content */}
          <div className="cta-content">
            <h2 className="cta-title">
              Join our GDG on <br className="hide-mobile" /> Campus Chapter
            </h2>

            <p className="cta-desc">
              Connect with fellow student developers, <br />
              build projects, and grow your skills with <br />
              <span className="cta-hashtag">#GDGoC Team</span>.
            </p>

            <Link href="/join" className="cta-yellow-link">Register Now</Link>
          </div>

          {/* Right Brace */}
          <div className="brace-wrapper">
            <svg className="brace-svg" viewBox="0 0 60 200" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10 10C10 10 35 10 35 35V85C35 95 50 100 50 100C50 100 35 105 35 115V165C35 190 10 190 10 190"
                stroke="#202124" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>
      </section>
    </div>
  );
}
