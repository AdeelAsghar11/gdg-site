import { ApplicationForm } from './ApplicationForm'

export function JoinOpen({
  deadline,
  settings,
  eligibility = '1st & 2nd Semester Students',
  interviewDate = '15 Sep 2026',
  message,
}: {
  deadline: string | null
  settings: Record<string, string>
  eligibility?: string | null
  interviewDate?: string | null
  message?: string | null
}) {
  const instagramUrl = settings.instagram_url ?? ''
  const linkedinUrl = settings.linkedin_url ?? ''

  return (
    <div style={{ fontFamily: "var(--font-primary, 'Google Sans', sans-serif)", background: '#fafafa', minHeight: '100vh' }}>
      <style>{`
        .jo-hero {
          background: #fff;
          border-bottom: 1px solid #eee;
          padding: 4.5rem 1.5rem 3.5rem;
          text-align: center;
          position: relative;
          overflow: hidden;
        }
        .jo-hero::before {
          content: '';
          position: absolute;
          inset: 0;
          opacity: 0.06;
          pointer-events: none;
          background-image: radial-gradient(#000 1px, transparent 1px);
          background-size: 30px 30px;
        }
        .jo-logo-boxes {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 12px;
          margin-bottom: 1.75rem;
          position: relative;
          z-index: 1;
        }
        .jo-box { width: 28px; height: 28px; border-radius: 6px; box-shadow: 0 4px 10px rgba(0,0,0,0.05); }
        .jo-box-red    { background: #EA4335; transform: rotate(45deg); }
        .jo-box-blue   { background: #4285F4; transform: rotate(-12deg); border-radius: 8px; }
        .jo-box-yellow { background: #FBBC05; transform: rotate(12deg);  border-radius: 8px; }

        .jo-badges-row {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          flex-wrap: wrap;
          margin-bottom: 1.5rem;
          position: relative;
          z-index: 1;
        }
        .jo-open-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: #e6f4ea;
          color: #137333;
          border: 1px solid #ceead6;
          border-radius: 100px;
          padding: 6px 16px;
          font-size: 0.82rem;
          font-weight: 700;
          letter-spacing: 0.04em;
        }
        .jo-highlight-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: #fef7e0;
          color: #b06000;
          border: 1px solid #fde293;
          border-radius: 100px;
          padding: 6px 16px;
          font-size: 0.82rem;
          font-weight: 700;
        }
        .jo-date-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: #e8f0fe;
          color: #1967d2;
          border: 1px solid #d2e3fc;
          border-radius: 100px;
          padding: 6px 16px;
          font-size: 0.82rem;
          font-weight: 700;
        }
        .jo-pulse {
          width: 8px; height: 8px; border-radius: 50%;
          background: #34a853;
          animation: jo-pulse-anim 1.5s ease-in-out infinite;
        }
        @keyframes jo-pulse-anim {
          0%, 100% { opacity: 1; transform: scale(1); }
          50%       { opacity: 0.5; transform: scale(1.4); }
        }

        .jo-title {
          font-size: clamp(2.2rem, 5vw, 3.4rem);
          font-weight: 800;
          color: #1a1a1a;
          letter-spacing: -0.04em;
          line-height: 1.15;
          margin-bottom: 1rem;
          position: relative;
          z-index: 1;
        }
        .jo-blue { color: #4285F4; }
        .jo-green { color: #34A853; }

        .jo-desc {
          font-size: 1.08rem;
          color: #5f6368;
          line-height: 1.65;
          max-width: 640px;
          margin: 0 auto 2rem;
          position: relative;
          z-index: 1;
        }

        /* Timeline / Process bar */
        .jo-timeline {
          max-width: 760px;
          margin: 0 auto 2rem;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
          position: relative;
          z-index: 1;
        }
        .jo-step {
          background: #f8f9fa;
          border: 1px solid #e8eaed;
          border-radius: 16px;
          padding: 16px;
          text-align: left;
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .jo-step:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0,0,0,0.05);
        }
        .jo-step-num {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 24px;
          height: 24px;
          border-radius: 50%;
          font-size: 0.75rem;
          font-weight: 800;
          margin-bottom: 8px;
        }
        .jo-step-1 .jo-step-num { background: #e8f0fe; color: #1967d2; }
        .jo-step-2 .jo-step-num { background: #fce8e6; color: #c5221f; }
        .jo-step-3 .jo-step-num { background: #e6f4ea; color: #137333; }
        .jo-step-title {
          font-size: 0.92rem;
          font-weight: 700;
          color: #202124;
          margin-bottom: 4px;
        }
        .jo-step-sub {
          font-size: 0.8rem;
          color: #5f6368;
          line-height: 1.4;
        }

        .jo-perks {
          display: flex;
          justify-content: center;
          gap: 10px;
          flex-wrap: wrap;
          margin-bottom: 0.5rem;
          position: relative;
          z-index: 1;
        }
        .jo-perk {
          background: #f1f3f4;
          color: #3c4043;
          padding: 6px 14px;
          border-radius: 100px;
          font-size: 0.82rem;
          font-weight: 500;
        }

        .jo-body {
          max-width: 820px;
          margin: 2.5rem auto 5rem;
          padding: 0 1.5rem;
        }

        .jo-card {
          background: #fff;
          border-radius: 20px;
          box-shadow: 0 2px 20px rgba(0,0,0,0.07);
          padding: 2.5rem;
          border: 1px solid #f0f0f0;
        }

        .jo-notice-box {
          background: linear-gradient(135deg, #e8f0fe 0%, #f1f3f4 100%);
          border-left: 4px solid #4285F4;
          border-radius: 12px;
          padding: 16px 20px;
          margin-bottom: 2rem;
          display: flex;
          align-items: flex-start;
          gap: 14px;
        }
        .jo-notice-icon {
          font-size: 1.5rem;
          line-height: 1;
        }
        .jo-notice-title {
          font-size: 0.95rem;
          font-weight: 700;
          color: #1967d2;
          margin-bottom: 3px;
        }
        .jo-notice-text {
          font-size: 0.85rem;
          color: #3c4043;
          line-height: 1.5;
          margin: 0;
        }

        .jo-card-title {
          font-size: 1.35rem;
          font-weight: 800;
          color: #202124;
          margin-bottom: 0.4rem;
        }
        .jo-card-sub {
          color: #5f6368;
          font-size: 0.92rem;
          margin-bottom: 1.75rem;
          padding-bottom: 1.25rem;
          border-bottom: 1px solid #f0f0f0;
        }

        .jo-socials {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
          margin-top: 2rem;
          padding-top: 1.5rem;
          border-top: 1px solid #f0f0f0;
        }
        .jo-social-link {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 10px 20px;
          border-radius: 100px;
          border: 1.5px solid #dadce0;
          color: #3c4043;
          font-size: 0.85rem;
          font-weight: 600;
          text-decoration: none;
          transition: all 0.2s;
        }
        .jo-social-link:hover {
          background: #202124;
          color: #fff;
          border-color: #202124;
          opacity: 1;
          transform: translateY(-2px);
        }

        @media (max-width: 680px) {
          .jo-timeline { grid-template-columns: 1fr; gap: 10px; }
          .jo-card { padding: 1.5rem; }
          .jo-body  { padding: 0 1rem; }
        }
      `}</style>

      {/* Hero */}
      <div className="jo-hero" data-aos="fade-up">
        <div className="jo-logo-boxes">
          <div className="jo-box jo-box-red" />
          <div className="jo-box jo-box-blue" />
          <div className="jo-box jo-box-yellow" />
        </div>

        {/* Badges */}
        <div className="jo-badges-row">
          <span className="jo-open-badge">
            <span className="jo-pulse" />
            Registration Open: 11 Sep – 14 Sep
          </span>
          <span className="jo-highlight-badge">
            🎓 {eligibility || '1st & 2nd Semester Students'}
          </span>
          <span className="jo-date-badge">
            🗓️ Interviews: {interviewDate || '15 Sep 2026'}
          </span>
        </div>

        <h1 className="jo-title">
          Join <span className="jo-blue">GDGoC CUI Wah</span><br />
          <span style={{ fontSize: '0.85em', color: '#202124' }}>1st &amp; 2nd Semester Recruitment Drive</span>
        </h1>

        <p className="jo-desc">
          Welcome to university life! Take your first leap into the developer world.
          Join Google Developer Groups on Campus – CUI Wah to learn modern AI, Web, and Cloud technologies,
          receive official membership, and build real-world solutions from day one.
        </p>

        {/* 3-Step Timeline */}
        <div className="jo-timeline">
          <div className="jo-step jo-step-1">
            <span className="jo-step-num">1</span>
            <div className="jo-step-title">Online Registration</div>
            <div className="jo-step-sub">11 Sep – 14 Sep 2026<br />Complete the online form below before deadline.</div>
          </div>
          <div className="jo-step jo-step-2">
            <span className="jo-step-num">2</span>
            <div className="jo-step-title">Interviews &amp; Screening</div>
            <div className="jo-step-sub">15 Sep 2026<br />Shortlisted candidates will be invited for interview sessions.</div>
          </div>
          <div className="jo-step jo-step-3">
            <span className="jo-step-num">3</span>
            <div className="jo-step-title">Club Placement &amp; Kit</div>
            <div className="jo-step-sub">Official Member ID card, orientation session, and technical club assignment.</div>
          </div>
        </div>

        <div className="jo-perks">
          {['Official Member ID Card', 'Specialized Technical Clubs', 'Hands-on Google Workshops', 'Real-world Hackathons & Projects', 'Core & Leadership Mentorship'].map((p) => (
            <span key={p} className="jo-perk">✓ {p}</span>
          ))}
        </div>
      </div>

      {/* Form card */}
      <div className="jo-body" data-aos="fade-up">
        <div className="jo-card">
          {/* Highlight notice */}
          <div className="jo-notice-box">
            <div className="jo-notice-icon">📌</div>
            <div>
              <div className="jo-notice-title">1st &amp; 2nd Semester Eligibility Requirement</div>
              <p className="jo-notice-text">
                This recruitment cycle is open to <strong>1st &amp; 2nd Semester Students</strong> across all departments (CS, SE, IT, EE, etc.). Please ensure your student details and semester selection are accurate.
              </p>
            </div>
          </div>

          <h2 className="jo-card-title">Membership Application &amp; Registration</h2>
          <p className="jo-card-sub">
            Fill in the form below to register. Shortlisted applicants will receive interview time slots via email for <strong>15 September 2026</strong>.
          </p>

          <ApplicationForm
            deadline={deadline}
            eligibility={eligibility}
            interviewDate={interviewDate}
          />

          {/* Social links below form */}
          {(instagramUrl || linkedinUrl) && (
            <div className="jo-socials">
              <span style={{ fontSize: '0.8rem', color: '#9aa0a6', alignSelf: 'center' }}>
                Stay updated on official announcements:
              </span>
              {linkedinUrl && (
                <a href={linkedinUrl} target="_blank" rel="noopener noreferrer" className="jo-social-link">
                  in LinkedIn
                </a>
              )}
              {instagramUrl && (
                <a href={instagramUrl} target="_blank" rel="noopener noreferrer" className="jo-social-link">
                  📸 Instagram
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
