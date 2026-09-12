import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'
import { prisma } from '@/lib/prisma'

function escapeCsv(val: any): string {
  if (val === null || val === undefined) return '""'
  const str = String(val).replace(/"/g, '""')
  return `"${str}"`
}

function parseStatementDetails(statement: string | null) {
  if (!statement) {
    return {
      semester: 'N/A',
      phone: 'N/A',
      track: 'N/A',
      sop: '',
    }
  }

  // Matches format: [Applicant Status: 1st Semester Student | Contact: 03001234567 | Track: General Club Member]
  const statusMatch = statement.match(/Applicant Status:\s*([^|\]]+)/i)
  const contactMatch = statement.match(/Contact:\s*([^|\]]+)/i)
  const trackMatch = statement.match(/Track:\s*([^|\]]+)/i)

  const semester = statusMatch ? statusMatch[1].trim() : 'N/A'
  const phone = contactMatch ? contactMatch[1].trim() : 'N/A'
  const track = trackMatch ? trackMatch[1].trim() : 'N/A'

  // Clean the main SOP text by removing the metadata bracket prefix
  const sop = statement.replace(/^\[Applicant Status:[^\]]+\]\s*/i, '').trim()

  return { semester, phone, track, sop }
}

export async function GET(req: NextRequest) {
  try {
    const session = await auth()
    if (!session?.user || (session.user.role !== 'admin' && session.user.role !== 'core')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = req.nextUrl
    const status = searchParams.get('status') ?? ''
    const search = searchParams.get('search') ?? ''

    const where = {
      ...(status && { status }),
      ...(search && {
        OR: [
          { name:       { contains: search, mode: 'insensitive' as const } },
          { email:      { contains: search, mode: 'insensitive' as const } },
          { department: { contains: search, mode: 'insensitive' as const } },
        ],
      }),
    }

    const applications = await prisma.recruitmentApplication.findMany({
      where,
      orderBy: { createdAt: 'desc' },
    })

    const headers = [
      'Application ID',
      'Applicant Name',
      'Email Address',
      'Phone / WhatsApp',
      'Semester',
      'Membership Track',
      'Student ID / Reg No',
      'Department / Degree',
      'Interested Clubs / Domains',
      'Application Status',
      'Applied Date',
      'Statement of Purpose / Motivation',
    ]

    const rows = applications.map(app => {
      const details = parseStatementDetails(app.statement)
      const dateStr = new Date(app.createdAt).toLocaleString('en-PK', {
        timeZone: 'Asia/Karachi',
        dateStyle: 'medium',
        timeStyle: 'short',
      })

      return [
        escapeCsv(app.id),
        escapeCsv(app.name),
        escapeCsv(app.email),
        escapeCsv(details.phone),
        escapeCsv(details.semester),
        escapeCsv(details.track),
        escapeCsv(app.studentId || 'N/A'),
        escapeCsv(app.department || 'N/A'),
        escapeCsv(app.domains),
        escapeCsv(app.status.toUpperCase()),
        escapeCsv(dateStr),
        escapeCsv(details.sop || app.statement || ''),
      ].join(',')
    })

    // Prepend UTF-8 BOM (\uFEFF) so Microsoft Excel opens special characters correctly
    const csvContent = '\uFEFF' + [headers.join(','), ...rows].join('\r\n')

    const dateTag = new Date().toISOString().split('T')[0]
    const filename = `gdg_recruitment_applicants_${dateTag}.csv`

    return new NextResponse(csvContent, {
      status: 200,
      headers: {
        'Content-Type': 'text/csv; charset=utf-8',
        'Content-Disposition': `attachment; filename="${filename}"`,
        'Cache-Control': 'no-store, max-age=0',
      },
    })
  } catch (err) {
    console.error('CSV Export Error:', err)
    return NextResponse.json({ error: 'Failed to export applications' }, { status: 500 })
  }
}
