'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { 
  Facebook, 
  Twitter, 
  Linkedin, 
  Mail, 
  Calendar, 
  MapPin, 
  Trophy, 
  Users, 
  Sparkles, 
  CheckCircle2, 
  ExternalLink,
  Award,
  Globe2
} from 'lucide-react';
import styles from './mtm.module.css';

export default function MTMHackathonPage() {
  const [copied, setCopied] = useState(false);
  const [selectedBio, setSelectedBio] = useState<string | null>(null);

  useEffect(() => {
    const handlePopState = (e: PopStateEvent) => {
      // Force redirect to the home page on browser back navigation, identical to Algothon
      window.location.href = '/';
    };

    window.addEventListener('popstate', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  const handleShare = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const organizers = [
    {
      name: 'Ubaid Ghazi',
      role: 'Lead Organizer & Campus Lead',
      affiliation: 'GDG On Campus CUI Wah',
      image: '/images/team/ubaid.png',
      bio: 'Lead of GDG On Campus CUI Wah. Passionate about Artificial Intelligence, agentic autonomous systems, and fostering nationwide student developer communities.',
      linkedin: 'https://linkedin.com/in/ubaid-ghazi',
    },
    {
      name: 'Muhammad Ismail',
      role: 'Organizer & Core Lead',
      affiliation: 'GDG On Campus CUI Wah',
      image: '/organizers/bg_ismail.png',
      bio: 'Lead organizer experienced in large-scale technical bootcamps, open-source initiatives, and developer relations.',
      linkedin: 'https://linkedin.com',
    },
    {
      name: 'Adeel Asghar',
      role: 'Organizer & Operations Lead',
      affiliation: 'GDG On Campus CUI Wah',
      image: '/organizers/adeel.jpeg',
      bio: 'Operations and technical lead driving competitive programming, hackathons, and multi-campus community collaborations.',
      linkedin: 'https://linkedin.com',
    },
  ];

  return (
    <div className={styles.pageWrapper}>
      <div className="container">
        {/* Banner */}
        <div className={styles.banner}>
          <img 
            src="/GDG_Bevy_DefaultEventBanner_g3sdRZ4.webp" 
            alt="MTM National Hackathon Banner" 
          />
        </div>

        {/* Header Details */}
        <div className={styles.headerInfo}>
          <div className={styles.badgeRow}>
            <span className={styles.nationalBadge}>
              <Trophy size={14} /> National Level Hackathon
            </span>
            <span className={styles.sponsorBadge}>
              <Sparkles size={14} /> Supported by GDG · Sponsored by GitHub
            </span>
          </div>

          <h1 className={styles.title}>MTM: National Level Hackathon 2026</h1>
          <p className={styles.location}>
            E-Rozgar Center, COMSATS University Islamabad, Wah Campus, Wah Cantt, 47040
          </p>
          <a href="#" className={styles.chapterLink}>
            GDG on Campus COMSATS University - Wah Campus
          </a>
          <p className={styles.introSnippet}>
            MTM is a premier national-level hackathon organized by Google Developer Groups on Campus (GDGoC) CUI Wah. Bringing together 200+ students and developer chapters from <strong>15+ universities across Pakistan</strong>, MTM offers a high-impact platform to build cutting-edge solutions in Artificial Intelligence, Generative AI, and modern web systems.
          </p>

          <div className={styles.socialRow}>
            <button 
              className={styles.socialIcon} 
              aria-label="Share on Facebook"
              onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')}`, '_blank')}
            >
              <Facebook size={18} />
            </button>
            <button 
              className={styles.socialIcon} 
              aria-label="Share on Twitter / X"
              onClick={() => window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent('Join MTM National Level Hackathon 2026 at CUI Wah! 15+ Universities across Pakistan participating.')}&url=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')}`, '_blank')}
            >
              <Twitter size={18} />
            </button>
            <button 
              className={styles.socialIcon} 
              aria-label="Share on LinkedIn"
              onClick={() => window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')}`, '_blank')}
            >
              <Linkedin size={18} />
            </button>
            <button 
              className={styles.socialIcon} 
              aria-label="Copy Link or Email"
              onClick={handleShare}
              title={copied ? 'Link Copied!' : 'Copy Event Link'}
            >
              <Mail size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* RSVP Bar */}
      <div className={styles.rsvpBar}>
        <div className="container">
          <div className={styles.rsvpContent}>
            <div className={styles.rsvpDate}>
              <Calendar size={20} color="#1a73e8" />
              <strong>Nov 14, 2026 · 9:00 AM – 6:00 PM (GMT+5)</strong>
            </div>
            <div className={styles.rsvpActions}>
              <span className={styles.rsvpCount}>15+ Universities Participating</span>
              <a 
                href="#register" 
                className={styles.rsvpButton}
                onClick={(e) => {
                  e.preventDefault();
                  alert('Registrations for MTM 2026 will open soon! Keep an eye on GDGoC CUI Wah announcements.');
                }}
              >
                RSVP / Register Now
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Key Highlights / Stats Bar */}
      <div className="container">
        <div className={styles.statsGrid}>
          <div className={styles.statCard}>
            <div className={styles.statNumber}>15+</div>
            <div className={styles.statLabel}>Universities Participating Across Pakistan</div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statNumber}>All</div>
            <div className={styles.statLabel}>GDG On Campus Chapters Nationwide</div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statNumber}>GitHub</div>
            <div className={styles.statLabel}>Official Sponsor: Prize Pool & Swags</div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statNumber}>200+</div>
            <div className={styles.statLabel}>Top Student Developers & Innovators</div>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="container">
        <div className={styles.mainGrid}>
          {/* Left Column: Key Themes & Official Partners */}
          <aside className={styles.leftCol}>
            <h3 className={styles.sectionHeading}>Key Themes</h3>
            <div className={styles.tagsContainer}>
              <span className={styles.tag}>National Hackathon</span>
              <span className={styles.tag}>Artificial Intelligence</span>
              <span className={styles.tag}>Generative AI</span>
              <span className={styles.tag}>GitHub Sponsored</span>
              <span className={styles.tag}>15+ Universities</span>
              <span className={styles.tag}>Automation & Agents</span>
              <span className={styles.tag}>Inter-University</span>
              <span className={styles.tag}>Community Building</span>
            </div>

            {/* Official Support & Sponsors */}
            <div className={styles.partnerBox}>
              <div className={styles.partnerBoxTitle}>Official Partners</div>
              
              <div className={styles.partnerItem}>
                <div className={styles.partnerLogoWrap}>
                  <img src="/images/GDG-Lockup.svg" alt="Google Developer Groups" style={{ width: '100%', height: 'auto' }} />
                </div>
                <div>
                  <strong>Google Developer Groups</strong>
                  <span>Official Supporting Platform</span>
                </div>
              </div>

              <div className={styles.partnerItem}>
                <div className={styles.partnerLogoWrap}>
                  <img src="/partners/github.png" alt="GitHub" style={{ width: '28px', height: '28px', objectFit: 'contain' }} />
                </div>
                <div>
                  <strong>GitHub</strong>
                  <span>Official Sponsor: Prizes & Swags</span>
                </div>
              </div>

              <div className={styles.partnerItem}>
                <div className={styles.partnerLogoWrap}>
                  <MapPin size={24} color="#ea4335" />
                </div>
                <div>
                  <strong>E-Rozgar Center</strong>
                  <span>Venue & Facilities Partner</span>
                </div>
              </div>
            </div>
          </aside>

          {/* Right Column: About and Code of Conduct */}
          <main className={styles.rightCol}>
            <h2 className={styles.mainHeading}>About MTM National Hackathon</h2>
            
            <div className={styles.noticeBanner}>
              <strong>National-Scale Collaboration:</strong>
              <p>MTM brings together students, developers, and GDG On Campus chapters from over 15 universities across Pakistan under one roof at COMSATS University Islamabad, Wah Campus.</p>
            </div>

            <div className={styles.description}>
              <p>
                <strong>MTM: National Level Hackathon 2026</strong> is a flagship nationwide technology competition organized under the platform of Google Developer Groups on Campus (GDG) at COMSATS University Islamabad, Wah Campus.
              </p>
              
              <p>
                In today's rapidly evolving technological landscape, Artificial Intelligence, Generative AI, and intelligent agent systems are transforming global industries. MTM provides a high-octane competitive arena where talented student developers can build tangible solutions to real-world problems—ranging from AI-powered chatbots and autonomous systems to workflow automation and data-driven applications.
              </p>

              <div className={styles.featureList}>
                <div className={styles.featureCard}>
                  <strong>⚡ Practical Learning & Innovation</strong>
                  <p>Design and deploy functional prototypes using modern AI frameworks, cloud tools, and open-source APIs.</p>
                </div>
                <div className={styles.featureCard}>
                  <strong>🎁 GitHub Prize Pool & Swags</strong>
                  <p>GitHub is contributing official prize pool support and exclusive student swag kits for participants.</p>
                </div>
                <div className={styles.featureCard}>
                  <strong>🌐 Nationwide GDG Collaboration</strong>
                  <p>Connecting chapters and student innovators from 15+ universities across Pakistan for cross-campus synergy.</p>
                </div>
                <div className={styles.featureCard}>
                  <strong>🚀 Academia-to-Industry Bridge</strong>
                  <p>Receive direct mentorship, evaluation, and feedback from industry leaders and GitHub Campus Experts.</p>
                </div>
              </div>

              <p>
                This hackathon promotes healthy competition, team synergy, and technical mastery while empowering participants with the confidence, portfolio assets, and network needed to thrive as future technology pioneers.
              </p>

              <p>
                Join us at <strong>MTM 2026</strong> on <strong>14th November</strong> at the E-Rozgar Center, CUI Wah Campus—where Pakistan's brightest student developers unite to engineer the future!
              </p>
            </div>

            {/* Code of Conduct */}
            <h2 className={styles.mainHeading} style={{ marginTop: '3.5rem' }}>Code of Conduct & Competition Rules</h2>
            <div className={styles.description}>
              <p>
                Google Developer Groups on Campus (GDGoC) CUI Wah is dedicated to providing an inclusive, safe, and professional environment for all participating university teams, mentors, and guests during MTM 2026.
              </p>
              
              <ul className={styles.cocList}>
                <li>
                  <strong>1. Respect, Inclusivity & Diversity</strong>
                  <ul>
                    <li>Treat every participant, organizer, mentor, and volunteer with professional courtesy and mutual respect.</li>
                    <li>We welcome students from all academic backgrounds, universities, and experience tiers.</li>
                    <li>Zero tolerance for harassment, discrimination, hate speech, or derogatory conduct.</li>
                  </ul>
                </li>
                <li>
                  <strong>2. Fair Play & Intellectual Honesty</strong>
                  <ul>
                    <li>All projects and code submitted during MTM must be original and built during the designated hackathon period.</li>
                    <li>Use of open-source libraries, APIs, and pre-trained models is welcomed, provided they are cited transparently in project documentation.</li>
                    <li>Plagiarism, pre-built turnkey submissions, or unethical tampering will result in immediate disqualification.</li>
                  </ul>
                </li>
                <li>
                  <strong>3. Collaboration & Team Spirit</strong>
                  <ul>
                    <li>Encourage healthy knowledge-sharing and celebrate innovative breakthroughs across participating universities.</li>
                    <li>Give credit where credit is due and adhere to GitHub open-source attribution standards.</li>
                  </ul>
                </li>
                <li>
                  <strong>4. Venue & Equipment Protocol</strong>
                  <ul>
                    <li>Comply strictly with all venue rules at the E-Rozgar Center and COMSATS University Islamabad, Wah Campus.</li>
                    <li>Treat university infrastructure, multimedia equipment, and power supplies with utmost care and responsibility.</li>
                  </ul>
                </li>
                <li>
                  <strong>5. Reporting Concerns</strong>
                  <ul>
                    <li>If you encounter any behavior violating these standards, please contact the event organizing team immediately. All inquiries will be handled with strict confidentiality.</li>
                  </ul>
                </li>
              </ul>
            </div>
          </main>
        </div>
      </div>

      {/* When & Where Section */}
      <div className={styles.whenWhereSection}>
        <div className={`container ${styles.whenWhereGrid}`}>
          <div className={styles.whenBox}>
            <Calendar className={styles.iconBig} />
            <div>
              <h3>When</h3>
              <p><strong>Saturday, November 14, 2026</strong></p>
              <p>09:00 AM – 06:00 PM (GMT+5)</p>
              <p style={{ marginTop: '6px', fontSize: '0.85rem', color: '#1a73e8' }}>Full-Day Intensive Hackathon</p>
            </div>
          </div>

          <div className={styles.whereBox}>
            <MapPin className={styles.iconBig} />
            <div>
              <h3>Where</h3>
              <p><strong>E-Rozgar Center</strong></p>
              <p>COMSATS University Islamabad, Wah Campus</p>
              <p>G.T. Road, Quaid Avenue, Wah Cantt, Punjab 47040</p>
            </div>
          </div>

          <div className={styles.mapBox}>
            <iframe 
              src="https://www.google.com/maps?q=COMSATS+University+Islamabad,+Wah+Campus&output=embed" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen 
              loading="lazy"
              title="COMSATS University Wah Campus Location"
            ></iframe>
          </div>
        </div>
      </div>

      {/* Discussions Section */}
      <div className="container">
        <div className={styles.discussionsWrapper}>
          <div className={styles.discussionsHeader}>
            <h3 className={styles.sectionHeading}>Community Discussions</h3>
            <button className={styles.btnOutline}>Login to add discussion</button>
          </div>
          <div className={styles.discussionsEmpty}>
            <Users size={40} color="#9aa0a6" />
            <p><strong>Got questions about MTM 2026, team formation, or problem tracks?</strong></p>
            <p style={{ color: '#5f6368', fontSize: '0.9rem', maxWidth: '500px', margin: 0 }}>
              Connect with fellow developers across 15+ universities and get real-time updates from the organizers.
            </p>
            <button className={styles.btnSolid} style={{ marginTop: '0.75rem' }}>Login to add discussion</button>
          </div>
        </div>

        {/* Organizers Section */}
        <div className={styles.organizersWrapper}>
          <h2 className={styles.mainHeading} style={{ textAlign: 'center', marginBottom: '0.5rem' }}>
            Event Organizers
          </h2>
          <p style={{ textAlign: 'center', color: '#5f6368', marginBottom: '2.5rem', fontSize: '0.95rem' }}>
            Meet the leadership driving MTM National Hackathon at GDG On Campus CUI Wah
          </p>
          
          <div className={styles.organizersGrid}>
            {organizers.map((org, idx) => (
              <div key={idx} className={styles.organizerCard}>
                <div className={styles.avatarPlaceholder}>
                  {org.image ? (
                    <Image 
                      src={org.image} 
                      alt={org.name} 
                      width={130} 
                      height={130} 
                      className={styles.avatarImage} 
                    />
                  ) : (
                    org.name.charAt(0)
                  )}
                </div>
                <h4 className={styles.orgName}>{org.name}</h4>
                <div className={styles.orgRole}>{org.role}</div>
                <div className={styles.orgAffiliation}>{org.affiliation}</div>
                <button 
                  className={styles.seeBioBtn}
                  onClick={() => alert(`${org.name} (${org.role})\n\n${org.bio}`)}
                >
                  See bio
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bevy Footer */}
      <footer className={styles.bevyFooter}>
        <div className={`container ${styles.footerTop}`}>
          <div className={styles.footerBrand}>
            <img src="/images/GDG-Lockup.svg" alt="GDG Logo" style={{ height: '24px' }} />
          </div>
          <div className={styles.footerLinks}>
            <h4>Quick Links</h4>
            <ul>
              <li>› <a href="#">About GDG</a></li>
              <li>› <a href="#">Chapters</a></li>
              <li>› <a href="/events">Upcoming Events</a></li>
              <li>› <a href="https://share.google/tC4uqVDSbojsVChXl" target="_blank" rel="noopener noreferrer">Bevy</a></li>
              <li>› <a href="#">Participation Terms</a></li>
              <li>› <a href="#">Privacy</a></li>
              <li>› <a href="#">Terms</a></li>
            </ul>
          </div>
          <div className={styles.footerSocial}>
            <h4>Social</h4>
            <div className={styles.footerSocialIcons}>
              <a href="#" aria-label="X"><Twitter size={18} /></a>
              <a href="#" aria-label="LinkedIn"><Linkedin size={18} /></a>
              <a href="#" aria-label="GitHub"><ExternalLink size={18} /></a>
            </div>
          </div>
        </div>
        <div className={`container ${styles.footerBottom}`}>
          <div>© 2026 Google · GDG On Campus COMSATS University Wah Campus</div>
          <div className={styles.poweredBy}>
            Powered by <a href="https://share.google/tC4uqVDSbojsVChXl" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'underline' }}><strong>Bevy</strong></a>
          </div>
        </div>
      </footer>

      {/* Hide Global Footer for this page */}
      <style dangerouslySetInnerHTML={{__html: `
        footer:not(.${styles.bevyFooter}) {
          display: none !important;
        }
      `}} />
    </div>
  );
}
