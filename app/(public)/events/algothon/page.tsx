import React from 'react';
import Image from 'next/image';
import { Facebook, Twitter, Linkedin, Mail, Calendar, MapPin, Map } from 'lucide-react';
import styles from './algothon.module.css';

export default function AlgothonPage() {
  return (
    <div className={styles.pageWrapper}>
      <div className="container">
        {/* Banner */}
        <div className={styles.banner}>
          <Image 
            src="/GDG_Bevy_DefaultEventBanner_g3sdRZ4.webp" 
            alt="Algothon Banner" 
            fill
            style={{ objectFit: 'cover' }}
            priority
          />
        </div>

        {/* Header Details */}
        <div className={styles.headerInfo}>
          <h1 className={styles.title}>Algothon: Workshop + Hackathon</h1>
          <p className={styles.location}>B26 Seminar Hall, COMSATS University Islamabad, Wah Campus, Wah Cantt, 47040</p>
          <a href="#" className={styles.chapterLink}>GDG on Campus COMSATS University - Islamabad, Pakistan</a>
          <p className={styles.introSnippet}>
            Algothon is a two-day immersive technology event designed to empower students, developers, and tech enthusiasts...
          </p>

          <div className={styles.socialRow}>
            <button className={styles.socialIcon} aria-label="Facebook"><Facebook size={18} /></button>
            <button className={styles.socialIcon} aria-label="Twitter"><Twitter size={18} /></button>
            <button className={styles.socialIcon} aria-label="LinkedIn"><Linkedin size={18} /></button>
            <button className={styles.socialIcon} aria-label="Email"><Mail size={18} /></button>
          </div>
        </div>
      </div>

      {/* RSVP Bar */}
      <div className={styles.rsvpBar}>
        <div className="container">
          <div className={styles.rsvpContent}>
            <strong>Apr 4, 10:00 AM – 1:00 PM (GMT+5)</strong>
            <span className={styles.rsvpCount}>0 RSVP'd</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container">
        <div className={styles.mainGrid}>
          {/* Left Column: Key Themes */}
          <aside className={styles.leftCol}>
            <h3 className={styles.sectionHeading}>Key Themes</h3>
            <div className={styles.tagsContainer}>
              <span className={styles.tag}>Hackathon</span>
              <span className={styles.tag}>Workshop</span>
              <span className={styles.tag}>Tech</span>
              <span className={styles.tag}>Innovation</span>
              <span className={styles.tag}>Community Building</span>
            </div>
          </aside>

          {/* Right Column: About and Code of Conduct */}
          <main className={styles.rightCol}>
            <h2 className={styles.mainHeading}>About this event</h2>
            
            <div className={styles.description}>
              <p><strong>Note: This event is exclusively organized for the students of COMSATS University Islamabad, Wah Campus (CUI Wah).</strong></p>
              
              <p>Algothon is a two-day immersive technology event designed to empower students, developers, and tech enthusiasts through a combination of hands-on learning and competitive innovation. The event brings together a technical workshop and a hackathon experience, creating a platform where participants can learn new skills, collaborate with peers, and transform ideas into impactful solutions.</p>
              
              <p>The first phase of the event focuses on a guided workshop where participants will explore essential technical concepts, tools, and industry-relevant practices. Through interactive sessions and practical demonstrations, attendees will gain the knowledge and confidence needed to approach real-world challenges.</p>

              <p>Following the workshop, participants will enter the hackathon phase, where they will apply their skills to solve creative problems, build innovative projects, and showcase their technical abilities. The hackathon encourages teamwork, problem-solving, and experimentation while providing an opportunity for students to experience the environment of real-world development.</p>

              <p>Algothon aims to strengthen the local developer ecosystem by connecting students, mentors, and technology enthusiasts. It promotes a culture of continuous learning, collaboration, and innovation while helping participants enhance their technical skills, creativity, and confidence.</p>

              <p>Through this initiative, GDGoC Wah strives to create meaningful opportunities for students to explore emerging technologies, build solutions, and become future-ready developers and innovators.</p>

              <p>Join us at Algothon: Workshop + Hackathon — where learning meets innovation and ideas turn into reality.</p>
            </div>

            <h2 className={styles.mainHeading} style={{ marginTop: '3rem' }}>Code of Conduct</h2>
            <div className={styles.description}>
              <p>Google Developer Groups on Campus (GDGoC) — Wah is committed to providing a welcoming, inclusive, and respectful environment for all participants, speakers, mentors, organizers, volunteers, and guests during Algothon: Workshop + Hackathon.</p>
              
              <p>By participating in this event, all attendees agree to follow these guidelines:</p>
              
              <ul className={styles.cocList}>
                <li>
                  <strong>1. Respect and Inclusion</strong>
                  <ul>
                    <li>Treat all participants, organizers, speakers, and volunteers with respect and professionalism.</li>
                    <li>Welcome people of all backgrounds, experiences, and skill levels.</li>
                    <li>Encourage a positive learning environment where everyone feels comfortable participating.</li>
                  </ul>
                </li>
                <li>
                  <strong>2. Professional Conduct</strong>
                  <ul>
                    <li>Maintain respectful communication and behavior throughout the event.</li>
                    <li>Avoid harassment, discrimination, bullying, or any form of inappropriate conduct.</li>
                    <li>Respect different opinions, ideas, and approaches during discussions and teamwork.</li>
                  </ul>
                </li>
                <li>
                  <strong>3. Collaboration and Learning</strong>
                  <ul>
                    <li>Promote teamwork, knowledge sharing, and constructive feedback.</li>
                    <li>Support fellow participants and encourage a community-driven learning experience.</li>
                    <li>Give credit to others for their ideas, contributions, and work.</li>
                  </ul>
                </li>
                <li>
                  <strong>4. Hackathon Guidelines</strong>
                  <ul>
                    <li>Participants must follow fair-play practices and demonstrate originality in their submissions.</li>
                    <li>Do not engage in plagiarism, cheating, or unauthorized use of others' work.</li>
                    <li>Respect judging criteria and decisions made by the organizing and judging panels.</li>
                  </ul>
                </li>
                <li>
                  <strong>5. Safety and Responsibility</strong>
                  <ul>
                    <li>Follow all venue rules, event instructions, and safety guidelines.</li>
                    <li>Respect event facilities, equipment, and resources.</li>
                    <li>Report any concerns or violations to the organizers.</li>
                  </ul>
                </li>
                <li>
                  <strong>6. Online and Offline Behavior</strong>
                  <ul>
                    <li>Maintain professionalism in all event-related communication channels, including social media, online groups, and during physical sessions.</li>
                    <li>Do not share harmful, offensive, or inappropriate content related to the event.</li>
                  </ul>
                </li>
              </ul>
              
              <p><strong>7. Reporting Violations</strong><br/>
              If you experience or witness behavior that violates this Code of Conduct, please contact the event organizers. All concerns will be handled responsibly and with respect for privacy.</p>
              
              <p>GDGoC Wah reserves the right to take appropriate action, including removal from the event, against individuals who violate this Code of Conduct.</p>
              
              <p>Together, we aim to build a safe, inclusive, and innovative community where everyone can learn, create, and grow.</p>
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
              <p>Saturday, April 4, 2026</p>
              <p>10:00 AM – 1:00 PM (GMT+5)</p>
            </div>
          </div>
          <div className={styles.whereBox}>
            <MapPin className={styles.iconBig} />
            <div>
              <h3>Where</h3>
              <p>B26 Seminar Hall, COMSATS</p>
              <p>University Islamabad, Wah Campus</p>
              <p>Wah Cantt, Punjab 47040</p>
            </div>
          </div>
          <div className={styles.mapBox}>
            <iframe 
              src="https://www.google.com/maps?q=B26+Seminar+Hall,+COMSATS+University+Islamabad,+Wah+Campus&output=embed" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen 
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </div>

      {/* Discussions Section */}
      <div className="container">
        <div className={styles.discussionsWrapper}>
          <div className={styles.discussionsHeader}>
            <h3 className={styles.sectionHeading}>Discussions</h3>
            <button className={styles.btnOutline}>Login to add discussion</button>
          </div>
          <div className={styles.discussionsEmpty}>
            <p>No discussions are currently posted</p>
            <button className={styles.btnSolid}>Login to add discussion</button>
          </div>
        </div>

        {/* Organizers Section */}
        <div className={styles.organizersWrapper}>
          <h2 className={styles.mainHeading} style={{ textAlign: 'center', marginBottom: '2rem' }}>Organizers</h2>
          
          <div className={styles.organizersGrid}>
            {[
              { name: 'Muhammad Ismail', role: 'Organizer', image: '/organizers/bg_ismail.png' },
              { name: 'Adeel Asghar', role: 'Organizer', image: '/organizers/adeel.jpeg' },
              { name: 'Ubaid Ur Rehman', role: 'Organizer', image: '/organizers/ubaid.jpeg' }
            ].map((org, idx) => (
              <div key={idx} className={styles.organizerCard}>
                <div className={styles.avatarPlaceholder}>
                  {org.image ? (
                    <Image src={org.image} alt={org.name} width={150} height={150} className={styles.avatarImage} />
                  ) : (
                    org.name.charAt(0)
                  )}
                </div>
                <h4 className={styles.orgName}>{org.name}</h4>
                {org.role && <p className={styles.orgRole}>{org.role}</p>}
                <button className={styles.seeBioBtn}>See bio</button>
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
              <li>› <a href="#">Upcoming Events</a></li>
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
              <a href="#" aria-label="YouTube">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33 2.78 2.78 0 0 0 1.94 2c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.33 29 29 0 0 0-.46-5.33z"></path><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon></svg>
              </a>
            </div>
          </div>
        </div>
        <div className={`container ${styles.footerBottom}`}>
          <div>© 2026 Google · Upcoming Events</div>
          <div className={styles.poweredBy}>Powered by <strong>Bevy</strong></div>
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
