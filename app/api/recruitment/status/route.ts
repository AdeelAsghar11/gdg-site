import { NextResponse } from 'next/server'
import { prisma }       from '@/lib/prisma'

export async function GET() {
  try {
    const [statusRow, messageRow, deadlineRow, eligibilityRow, interviewRow] = await Promise.all([
      prisma.siteSetting.findUnique({ where: { key: 'recruitment_status'  } }).catch(() => null),
      prisma.siteSetting.findUnique({ where: { key: 'recruitment_message' } }).catch(() => null),
      prisma.siteSetting.findUnique({ where: { key: 'recruitment_deadline'} }).catch(() => null),
      prisma.siteSetting.findUnique({ where: { key: 'recruitment_eligibility'} }).catch(() => null),
      prisma.siteSetting.findUnique({ where: { key: 'recruitment_interview_date'} }).catch(() => null),
    ])

    return NextResponse.json({
      isOpen:   (statusRow?.value  ?? 'open') === 'open',
      message:  messageRow?.value  ?? 'Registrations Open: 11 Sep – 14 Sep | Interviews: 15 Sep | Open for 1st & 2nd Semester Students!',
      deadline: deadlineRow?.value ? deadlineRow.value : '2026-09-14T23:59:59.000Z',
      eligibility: eligibilityRow?.value ?? '1st & 2nd Semester Students',
      interviewDate: interviewRow?.value ?? '15 Sep 2026',
    })
  } catch (err) {
    console.error(err)
    return NextResponse.json({
      isOpen:   true,
      message:  'Registrations Open: 11 Sep – 14 Sep | Interviews: 15 Sep | Open for 1st & 2nd Semester Students!',
      deadline: '2026-09-14T23:59:59.000Z',
      eligibility: '1st & 2nd Semester Students',
      interviewDate: '15 Sep 2026',
    })
  }
}
