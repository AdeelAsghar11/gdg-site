import { JoinClosed } from './JoinClosed'
import { JoinOpen }   from './JoinOpen'

import { prisma }     from '@/lib/prisma'

export const dynamic = 'force-dynamic'

const PUBLIC_KEYS = [
  'instagram_url',
  'linkedin_url',
  'twitter_url',
  'github_url',
  'website_url',
  'chapter_email',
]

// ─── Data fetchers ────────────────────────────────────────────────────────────

async function getRecruitmentStatus(): Promise<{
  isOpen:        boolean
  message:       string
  deadline:      string | null
  eligibility?:  string | null
  interviewDate?: string | null
}> {
  try {
    const [statusRow, messageRow, deadlineRow, eligibilityRow, interviewRow] = await Promise.all([
      prisma.siteSetting.findUnique({ where: { key: 'recruitment_status'  } }).catch(() => null),
      prisma.siteSetting.findUnique({ where: { key: 'recruitment_message' } }).catch(() => null),
      prisma.siteSetting.findUnique({ where: { key: 'recruitment_deadline'} }).catch(() => null),
      prisma.siteSetting.findUnique({ where: { key: 'recruitment_eligibility'} }).catch(() => null),
      prisma.siteSetting.findUnique({ where: { key: 'recruitment_interview_date'} }).catch(() => null),
    ])

    return {
      isOpen:        (statusRow?.value ?? 'open') === 'open',
      message:       messageRow?.value ?? 'Registrations Open: 11 Sep – 14 Sep | Interviews: 15 Sep | Open for 1st & 2nd Semester Students!',
      deadline:      deadlineRow?.value ? deadlineRow.value : '2026-09-14T23:59:59.000Z',
      eligibility:   eligibilityRow?.value ?? '1st & 2nd Semester Students',
      interviewDate: interviewRow?.value ?? '15 Sep 2026',
    }
  } catch (err) {
    console.error('Failed to query recruitment status:', err)
    return {
      isOpen:        true,
      message:       'Registrations Open: 11 Sep – 14 Sep | Interviews: 15 Sep | Open for 1st & 2nd Semester Students!',
      deadline:      '2026-09-14T23:59:59.000Z',
      eligibility:   '1st & 2nd Semester Students',
      interviewDate: '15 Sep 2026',
    }
  }
}

async function getSiteSettings(): Promise<Record<string, string>> {
  try {
    const rows = await prisma.siteSetting.findMany({
      where: { key: { in: PUBLIC_KEYS } },
    }).catch(() => [])

    return Object.fromEntries(rows.map((r) => [r.key, r.value]))
  } catch (err) {
    console.error('Failed to query site settings:', err)
    return {}
  }
}

// ─── Metadata ─────────────────────────────────────────────────────────────────

export const metadata = {
  title: 'Join GDGoC CUI Wah | 1st & 2nd Semester Recruitment Drive',
  description:
    'Apply to join Google Developer Groups on Campus – CUI Wah chapter. 1st & 2nd Semester Intake open from 11 Sep to 14 Sep, with interviews on 15 Sep. Join our technical clubs and developer community.',
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function JoinPage() {
  const [status, settings] = await Promise.all([
    getRecruitmentStatus(),
    getSiteSettings(),
  ])

  return status.isOpen
    ? (
      <JoinOpen
        deadline={status.deadline}
        eligibility={status.eligibility}
        interviewDate={status.interviewDate}
        message={status.message}
        settings={settings}
      />
    )
    : <JoinClosed message={status.message}  settings={settings} />
}
