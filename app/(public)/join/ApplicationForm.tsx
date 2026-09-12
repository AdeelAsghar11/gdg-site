'use client'

import { useState, useRef } from 'react'
import { useFormSubmit } from '@/hooks/useFormSubmit'

const DEPARTMENTS = [
  'Computer Science',
  'Software Engineering',
  'Information Technology',
  'Electrical Engineering',
  'Other',
]

const DOMAINS = [
  'Web & App Development',
  'Data Science & ML',
  'Generative AI',
  'Vibe Coding',
  'UI/UX & Design',
  'Content & Social Media',
  'Events & Logistics',
]

type FormData = {
  name: string
  email: string
  phone?: string
  studentId: string
  department: string
  domains: string[]
  statement: string
}

type SubmitResult = { success: boolean; id: string }

export function ApplicationForm({
  deadline,
  eligibility = '1st & 2nd Semester Students',
  interviewDate = '15 Sep 2026',
}: {
  deadline: string | null
  eligibility?: string | null
  interviewDate?: string | null
}) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [studentId, setStudentId] = useState('')
  const [department, setDepartment] = useState('')
  const [semester, setSemester] = useState<'1st Semester' | '2nd Semester'>('1st Semester')
  const [isSemesterConfirmed, setIsSemesterConfirmed] = useState(false)
  const [membershipType, setMembershipType] = useState<'member' | 'core'>('member')
  const [domains, setDomains] = useState<string[]>([])
  const [statement, setStatement] = useState('')
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({})

  // Use the reusable hook
  const { isLoading, isSuccess, isError, message: apiError, result, submit } =
    useFormSubmit<FormData>((data) =>
      fetch('/api/recruitment/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
    )

  const successData = result as SubmitResult | null

  function toggleDomain(domain: string) {
    setDomains((prev) =>
      prev.includes(domain) ? prev.filter((d) => d !== domain) : [...prev, domain]
    )
    if (fieldErrors.domains) {
      setFieldErrors((e) => ({ ...e, domains: '' }))
    }
  }

  function validate(): boolean {
    const errors: Record<string, string> = {}
    if (!name.trim() || name.trim().length < 2) errors.name = 'Full name is required (min 2 chars).'
    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) errors.email = 'A valid email address is required.'
    if (!phone.trim() || phone.trim().length < 10) {
      errors.phone = 'A valid phone/WhatsApp number is required (min 10 digits).'
    }
    if (!department) errors.department = 'Please select a department.'
    if (!isSemesterConfirmed) {
      errors.confirmed = 'You must confirm that you are currently an active 1st or 2nd Semester student to apply.'
    }
    if (domains.length === 0) errors.domains = 'Select at least one club/domain interest.'
    if (statement.trim().length < 50)
      errors.statement = `Statement too short (${statement.trim().length}/50 min chars).`
    setFieldErrors(errors)
    return Object.keys(errors).length === 0
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!validate()) return
    const formattedStatement = `[Applicant Status: ${semester} Student | Contact: ${phone.trim()} | Track: ${membershipType === 'core' ? 'Core Team Leadership' : 'General Club Member'}]\n\n${statement.trim()}`
    submit({ name: name.trim(), email: email.trim(), phone: phone.trim(), studentId, department, domains, statement: formattedStatement })
  }

  // ── Success state ──
  if (isSuccess && successData) {
    return (
      <div className="af-success">
        <div className="af-success-icon">🎉</div>
        <h2>Application Submitted!</h2>
        <p>
          Thank you, <strong>{name}</strong>! We have received your application for the 1st &amp; 2nd Semester Recruitment Drive.
        </p>
        <div style={{
          background: '#e6f4ea',
          border: '1px solid #ceead6',
          borderRadius: 12,
          padding: '14px 18px',
          maxWidth: 480,
          margin: '1rem auto 1.5rem',
          textAlign: 'left',
          fontSize: '0.9rem',
          color: '#137333',
          lineHeight: 1.5,
        }}>
          <strong>🗓️ What happens next:</strong>
          <ul style={{ margin: '6px 0 0', paddingLeft: 18 }}>
            <li><strong>Interviews:</strong> Scheduled for <strong>{interviewDate || '15 Sep 2026'}</strong>.</li>
            <li>Shortlisted 1st &amp; 2nd semester applicants will receive interview time slots and room allocations via email (<code>{email}</code>).</li>
          </ul>
        </div>
        <p className="af-ref">
          Reference ID: <code>{successData.id}</code>
        </p>
        <div>
          <a href="/" className="af-home-btn">Return to Homepage →</a>
        </div>
      </div>
    )
  }

  return (
    <>
      <style>{`
        .af-form { width: 100%; }

        .af-field { margin-bottom: 1.5rem; }

        .af-label {
          display: block;
          font-size: 0.82rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.07em;
          color: #5f6368;
          margin-bottom: 8px;
        }
        .af-req { color: #ea4335; margin-left: 2px; }
        .af-opt { color: #9aa0a6; font-weight: 400; text-transform: none; letter-spacing: 0; margin-left: 4px; font-size: 0.78rem; }

        .af-input, .af-select, .af-textarea {
          width: 100%;
          padding: 12px 16px;
          border: 1.5px solid #e0e0e0;
          border-radius: 10px;
          font-size: 0.95rem;
          font-family: inherit;
          outline: none;
          background: #fafafa;
          color: #202124;
          box-sizing: border-box;
          transition: border-color 0.2s, box-shadow 0.2s;
          appearance: none;
        }
        .af-input:focus, .af-select:focus, .af-textarea:focus {
          border-color: #4285F4;
          box-shadow: 0 0 0 3px rgba(66,133,244,0.1);
          background: #fff;
        }
        .af-select {
          background-image: url("data:image/svg+xml,%3Csvg width='12' height='8' viewBox='0 0 12 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1L6 7L11 1' stroke='%235f6368' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 16px center;
          padding-right: 40px;
        }
        .af-textarea { resize: vertical; min-height: 140px; line-height: 1.65; }

        .af-error-field {
          border-color: #ea4335 !important;
        }
        .af-field-error {
          color: #c62828;
          font-size: 0.8rem;
          margin-top: 5px;
          display: flex;
          align-items: center;
          gap: 4px;
        }

        .af-domains-row {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          margin-top: 4px;
        }

        .af-pill {
          padding: 9px 18px;
          border-radius: 100px;
          cursor: pointer;
          font-size: 0.88rem;
          font-family: inherit;
          transition: all 0.18s ease;
          user-select: none;
        }
        .af-pill-off {
          background: #f1f3f4;
          color: #202124;
          border: 1.5px solid #e0e0e0;
          font-weight: 500;
        }
        .af-pill-on {
          background: #4285F4;
          color: #fff;
          border: 1.5px solid #4285F4;
          font-weight: 700;
        }
        .af-pill:hover { transform: translateY(-1px); opacity: 1; }

        .af-char-count {
          text-align: right;
          font-size: 0.78rem;
          color: #9aa0a6;
          margin-top: 5px;
        }
        .af-char-warn { color: #ea4335; font-weight: 600; }

        .af-api-error {
          background: #fce8e6;
          border-left: 4px solid #ea4335;
          color: #c62828;
          padding: 12px 16px;
          border-radius: 10px;
          font-size: 0.9rem;
          margin-bottom: 1.25rem;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .af-submit {
          width: 100%;
          background: #4285F4;
          color: #fff;
          border: none;
          padding: 14px 32px;
          border-radius: 12px;
          font-size: 1rem;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.2s;
          box-shadow: 0 2px 10px rgba(66,133,244,0.3);
          letter-spacing: 0.01em;
          margin-top: 0.5rem;
        }
        .af-submit:hover:not(:disabled) {
          background: #3367d6;
          transform: translateY(-1px);
          box-shadow: 0 4px 16px rgba(66,133,244,0.35);
          opacity: 1;
        }
        .af-submit:disabled { opacity: 0.65; cursor: not-allowed; transform: none; }



        /* Success state */
        .af-success {
          text-align: center;
          padding: 3rem 1rem;
        }
        .af-success-icon { font-size: 4rem; margin-bottom: 1rem; }
        .af-success h2 { font-size: 1.8rem; font-weight: 800; color: #202124; margin-bottom: 1rem; }
        .af-success p  { color: #5f6368; font-size: 1rem; line-height: 1.65; margin-bottom: 0.75rem; }
        .af-ref {
          background: #f1f3f4;
          padding: 8px 16px;
          border-radius: 8px;
          display: inline-block;
          font-size: 0.85rem;
          color: #3c4043;
          margin: 0.5rem auto 1.5rem;
        }
        .af-ref code { font-family: monospace; color: #4285F4; }
        .af-home-btn {
          display: inline-block;
          background: #4285F4;
          color: #fff;
          padding: 12px 28px;
          border-radius: 100px;
          font-weight: 700;
          text-decoration: none;
          transition: all 0.2s;
          box-shadow: 0 2px 8px rgba(66,133,244,0.3);
        }
        .af-home-btn:hover { background: #3367d6; opacity: 1; }

        .af-two-col { display: grid; grid-template-columns: 1fr 1fr; gap: 1.25rem; }
        @media (max-width: 560px) { .af-two-col { grid-template-columns: 1fr; } }
      `}</style>

      <form className="af-form" onSubmit={handleSubmit} noValidate>



        {/* API error */}
        {isError && <div className="af-api-error">⚠ {apiError}</div>}

        {/* Name + Email */}
        <div className="af-two-col">
          <div className="af-field">
            <label className="af-label" htmlFor="af-name">
              Full Name <span className="af-req">*</span>
            </label>
            <input
              id="af-name"
              className={`af-input${fieldErrors.name ? ' af-error-field' : ''}`}
              type="text"
              placeholder="Ali Hassan"
              value={name}
              onChange={(e) => { setName(e.target.value); setFieldErrors((v) => ({ ...v, name: '' })) }}
              autoComplete="name"
            />
            {fieldErrors.name && <p className="af-field-error">⚠ {fieldErrors.name}</p>}
          </div>

          <div className="af-field">
            <label className="af-label" htmlFor="af-email">
              Email Address <span className="af-req">*</span>
            </label>
            <input
              id="af-email"
              className={`af-input${fieldErrors.email ? ' af-error-field' : ''}`}
              type="email"
              placeholder="you@cuiwah.edu.pk"
              value={email}
              onChange={(e) => { setEmail(e.target.value); setFieldErrors((v) => ({ ...v, email: '' })) }}
              autoComplete="email"
            />
            {fieldErrors.email && <p className="af-field-error">⚠ {fieldErrors.email}</p>}
          </div>
        </div>

        {/* Department + Current Semester */}
        <div className="af-two-col">
          <div className="af-field">
            <label className="af-label" htmlFor="af-dept">
              Department <span className="af-req">*</span>
            </label>
            <select
              id="af-dept"
              className={`af-select${fieldErrors.department ? ' af-error-field' : ''}`}
              value={department}
              onChange={(e) => { setDepartment(e.target.value); setFieldErrors((v) => ({ ...v, department: '' })) }}
            >
              <option value="">Select department…</option>
              {DEPARTMENTS.map((d) => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
            {fieldErrors.department && <p className="af-field-error">⚠ {fieldErrors.department}</p>}
          </div>

          <div className="af-field">
            <label className="af-label">
              Academic Semester <span className="af-req">*</span>
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
              <button
                type="button"
                onClick={() => setSemester('1st Semester')}
                className={`af-pill ${semester === '1st Semester' ? 'af-pill-on' : 'af-pill-off'}`}
                style={{ textAlign: 'center', width: '100%', borderRadius: 10, padding: '11px 12px', fontSize: '0.88rem' }}
              >
                🎓 1st Semester
              </button>
              <button
                type="button"
                onClick={() => setSemester('2nd Semester')}
                className={`af-pill ${semester === '2nd Semester' ? 'af-pill-on' : 'af-pill-off'}`}
                style={{ textAlign: 'center', width: '100%', borderRadius: 10, padding: '11px 12px', fontSize: '0.88rem' }}
              >
                🎓 2nd Semester
              </button>
            </div>
            <p style={{ margin: '6px 0 0', fontSize: '0.75rem', color: '#5f6368' }}>
              Registration open 11–14 Sep for both 1st and 2nd semester students.
            </p>
          </div>
        </div>

        {/* Phone Number + Student ID */}
        <div className="af-two-col">
          <div className="af-field">
            <label className="af-label" htmlFor="af-phone">
              Phone / WhatsApp Number <span className="af-req">*</span>
            </label>
            <input
              id="af-phone"
              className={`af-input${fieldErrors.phone ? ' af-error-field' : ''}`}
              type="tel"
              placeholder="0300-1234567"
              value={phone}
              onChange={(e) => { setPhone(e.target.value); setFieldErrors((v) => ({ ...v, phone: '' })) }}
              autoComplete="tel"
            />
            {fieldErrors.phone && <p className="af-field-error">⚠ {fieldErrors.phone}</p>}
          </div>

          <div className="af-field">
            <label className="af-label" htmlFor="af-sid">
              Student ID / Roll No. <span className="af-opt">(optional, e.g. FA26-BCS-001)</span>
            </label>
            <input
              id="af-sid"
              className="af-input"
              type="text"
              placeholder="FA26-BCS-042"
              value={studentId}
              onChange={(e) => setStudentId(e.target.value)}
            />
          </div>
        </div>

        {/* Application Track */}
        <div className="af-field">
          <label className="af-label">
            Application Track <span className="af-req">*</span>
            <span className="af-opt" style={{ display: 'block', fontSize: '0.78rem', marginTop: 4, textTransform: 'none', letterSpacing: 0 }}>
              Choose whether you are joining as a general community/club member or applying for a core team role:
            </span>
          </label>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginTop: 6 }}>
            <div
              onClick={() => setMembershipType('member')}
              style={{
                border: membershipType === 'member' ? '2px solid #4285F4' : '1.5px solid #e0e0e0',
                background: membershipType === 'member' ? '#E8F0FE' : '#fafafa',
                borderRadius: 12,
                padding: '14px 16px',
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                <span style={{ fontSize: '1.2rem' }}>🎓</span>
                <strong style={{ fontSize: '0.95rem', color: membershipType === 'member' ? '#185FA5' : '#202124' }}>
                  General Member
                </strong>
              </div>
              <p style={{ margin: 0, fontSize: '0.8rem', color: '#5F6368', lineHeight: 1.4 }}>
                Participate in clubs, attend hands-on workshops, receive Member ID, and collaborate on projects.
              </p>
            </div>

            <div
              onClick={() => setMembershipType('core')}
              style={{
                border: membershipType === 'core' ? '2px solid #EA4335' : '1.5px solid #e0e0e0',
                background: membershipType === 'core' ? '#FCE8E6' : '#fafafa',
                borderRadius: 12,
                padding: '14px 16px',
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                <span style={{ fontSize: '1.2rem' }}>⚡</span>
                <strong style={{ fontSize: '0.95rem', color: membershipType === 'core' ? '#C5221F' : '#202124' }}>
                  Core Team Candidate
                </strong>
              </div>
              <p style={{ margin: 0, fontSize: '0.8rem', color: '#5F6368', lineHeight: 1.4 }}>
                Help organize events, manage technical clubs, coordinate logistics, and lead student initiatives.
              </p>
            </div>
          </div>
        </div>

        {/* Preferred Club / Domain */}
        <div className="af-field">
          <label className="af-label">
            Technical & Creative Club Preferences <span className="af-req">*</span>
            <span className="af-opt" style={{ display: 'block', fontSize: '0.78rem', marginTop: 4, textTransform: 'none', letterSpacing: 0 }}>
              Select your domain interests. Your club assignment will be based on these preferences:
            </span>
          </label>
          <div className={`af-domains-row${fieldErrors.domains ? ' af-error-field' : ''}`}
            style={fieldErrors.domains ? { padding: '8px', borderRadius: '10px', border: '1.5px solid #ea4335' } : {}}
          >
            {DOMAINS.map((domain) => {
              const active = domains.includes(domain)
              return (
                <button
                  type="button"
                  key={domain}
                  onClick={() => toggleDomain(domain)}
                  className={`af-pill ${active ? 'af-pill-on' : 'af-pill-off'}`}
                >
                  {active ? '✓ ' : ''}{domain}
                </button>
              )
            })}
          </div>
          {fieldErrors.domains && <p className="af-field-error">⚠ {fieldErrors.domains}</p>}
        </div>

        {/* Statement */}
        <div className="af-field">
          <label className="af-label" htmlFor="af-statement">
            Why do you want to join GDGoC CUI Wah? <span className="af-req">*</span>
          </label>
          <textarea
            id="af-statement"
            className={`af-textarea af-input${fieldErrors.statement ? ' af-error-field' : ''}`}
            placeholder="Tell us about your interests, what you hope to learn or build, and why you want to be part of the community… (min 50 characters)"
            value={statement}
            onChange={(e) => {
              if (e.target.value.length <= 1000) setStatement(e.target.value)
              setFieldErrors((v) => ({ ...v, statement: '' }))
            }}
            rows={6}
          />
          <p className={`af-char-count${statement.length > 900 ? ' af-char-warn' : ''}`}>
            {statement.length} / 1000
          </p>
          {fieldErrors.statement && <p className="af-field-error">⚠ {fieldErrors.statement}</p>}
        </div>

        {/* Semester Eligibility Verification */}
        <div style={{
          background: isSemesterConfirmed ? '#e6f4ea' : (fieldErrors.confirmed ? '#fce8e6' : '#f8f9fa'),
          border: isSemesterConfirmed ? '1.5px solid #34a853' : (fieldErrors.confirmed ? '1.5px solid #ea4335' : '1.5px solid #dadce0'),
          borderRadius: 12,
          padding: '16px 18px',
          marginBottom: '1.5rem',
          transition: 'all 0.2s ease',
        }}>
          <label style={{ display: 'flex', alignItems: 'flex-start', gap: 12, cursor: 'pointer' }}>
            <input
              type="checkbox"
              id="af-sem-confirm"
              checked={isSemesterConfirmed}
              onChange={(e) => {
                setIsSemesterConfirmed(e.target.checked)
                if (e.target.checked && fieldErrors.confirmed) {
                  setFieldErrors((v) => ({ ...v, confirmed: '' }))
                }
              }}
              style={{ width: 18, height: 18, marginTop: 2, accentColor: '#34A853', cursor: 'pointer' }}
            />
            <div style={{ fontSize: '0.9rem', color: '#202124', lineHeight: 1.45 }}>
              <strong style={{ color: '#137333' }}>
                I confirm that I am currently an active {semester} student at CUI Wah.
              </strong>
              <div style={{ fontSize: '0.8rem', color: '#5f6368', marginTop: 4 }}>
                This drive is open from <strong>11 Sep to 14 Sep</strong>, with interviews scheduled on <strong>15 Sep 2026</strong>. Both 1st and 2nd semester students are welcome to apply.
              </div>
            </div>
          </label>
          {fieldErrors.confirmed && (
            <p className="af-field-error" style={{ marginTop: 8, color: '#ea4335', fontWeight: 600 }}>
              ⚠ {fieldErrors.confirmed}
            </p>
          )}
        </div>

        {/* Submit */}
        <button type="submit" className="af-submit" disabled={isLoading}>
          {isLoading ? 'Submitting Application…' : '🚀 Submit Application (1st & 2nd Semester)'}
        </button>
      </form>
    </>
  )
}
