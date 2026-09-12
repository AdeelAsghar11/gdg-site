import { requireRole } from '@/lib/auth-guard'
import { prisma } from '@/lib/prisma'
import {
  RoleBadge,
  StatusBadge,
  MemberFilters,
  AwardPointsButton,
  ToggleStatusButton,
  AdminPagination
} from './MemberTableComponents'
import Link from 'next/link'

export default async function AdminMembersPage({
  searchParams,
}: {
  searchParams: Promise<{
    search?: string
    role?: string
    status?: string
    page?: string
  }> | {
    search?: string
    role?: string
    status?: string
    page?: string
  }
}) {
  await requireRole(['admin'])

  const resolvedParams = await searchParams
  const page = Math.max(1, Number(resolvedParams?.page ?? 1))
  const search = resolvedParams?.search ?? ''
  const role = resolvedParams?.role ?? ''
  const status = resolvedParams?.status ?? ''
  const limit = 20
  const skip = (page - 1) * limit

  const where = {
    ...(search && {
      OR: [
        { name: { contains: search, mode: 'insensitive' as const } },
        { email: { contains: search, mode: 'insensitive' as const } },
        { studentId: { contains: search, mode: 'insensitive' as const } },
      ],
    }),
    ...(role && { role: { equals: role as any } }),
    ...(status === 'active' && { isActive: true }),
    ...(status === 'inactive' && { isActive: false }),
  }

  const [members, total] = await Promise.all([
    prisma.member.findMany({
      where,
      select: {
        id: true,
        name: true,
        slug: true,
        email: true,
        role: true,
        tier: true,
        department: true,
        studentId: true,
        imageUrl: true,
        points: true,
        isActive: true,
        createdAt: true,
        _count: {
          select: { eventRegistrations: true },
        },
        clubMemberships: {
          select: {
            club: { select: { name: true, colorToken: true } },
          },
        },
      },
      orderBy: { createdAt: 'desc' },
      skip,
      take: limit,
    }),
    prisma.member.count({ where }),
  ])

  const pages = Math.ceil(total / limit)

  return (
    <div>
      {/* Header */}
      <div style={{
        display: 'flex', justifyContent: 'space-between',
        alignItems: 'center', marginBottom: 24, flexWrap: 'wrap', gap: 12
      }}>
        <div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 700, margin: 0 }}>
            Members
          </h1>
          <p style={{ color: '#5F6368', fontSize: '0.9rem', margin: 0 }}>
            {total} {role ? `${role} ` : ''}{status ? `${status} ` : ''}members
          </p>
        </div>
        <Link href="/admin/members/new"
          style={{
            background: '#EA4335', color: '#fff',
            padding: '10px 20px', borderRadius: 8,
            textDecoration: 'none', fontWeight: 600, fontSize: '0.9rem'
          }}>
          + Add Member
        </Link>
      </div>

      {/* Filters — client component */}
      <MemberFilters
        search={search}
        role={role}
        status={status}
      />

      {/* Responsive Table Wrapper */}
      <div style={{
        overflowX: 'auto',
        background: '#fff',
        borderRadius: 12,
        border: '1px solid #e0e0e0',
        marginTop: 16
      }}>
        <table style={{
          width: '100%', borderCollapse: 'collapse',
          fontSize: '0.875rem', minWidth: 700
        }}>
          <thead>
            <tr style={{
              borderBottom: '2px solid #e0e0e0', textAlign: 'left',
              background: '#fafafa'
            }}>
              <th style={{ padding: '12px 14px' }}>Member</th>
              <th style={{ padding: '12px 14px' }}>Role</th>
              <th style={{ padding: '12px 14px' }}>Club</th>
              <th style={{ padding: '12px 14px' }}>Department</th>
              <th style={{ padding: '12px 14px' }}>Events</th>
              <th style={{ padding: '12px 14px' }}>Points</th>
              <th style={{ padding: '12px 14px' }}>Status</th>
              <th style={{ padding: '12px 14px' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {members.length > 0 ? (
              members.map(member => (
                <tr key={member.id}
                  style={{
                    borderBottom: '1px solid #f0f0f0',
                    opacity: member.isActive ? 1 : 0.5
                  }}>
                  <td style={{ padding: '12px 14px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      {member.imageUrl
                        ? <img src={member.imageUrl} alt=""
                          style={{
                            width: 32, height: 32, borderRadius: '50%',
                            objectFit: 'cover'
                          }} />
                        : <div style={{
                          width: 32, height: 32, borderRadius: '50%',
                          background: '#E8F0FE', display: 'flex',
                          alignItems: 'center', justifyContent: 'center',
                          fontWeight: 700, fontSize: '0.8rem', color: '#185FA5'
                        }}>
                          {member.name.charAt(0)}
                        </div>
                      }
                      <div>
                        <Link href={`/admin/members/${member.id}`}
                          style={{
                            fontWeight: 600, color: '#202124',
                            textDecoration: 'none'
                          }}>
                          {member.name}
                        </Link>
                        <p style={{
                          fontSize: '0.75rem', color: '#5F6368',
                          margin: 0
                        }}>
                          {member.email}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td style={{ padding: '12px 14px' }}>
                    <RoleBadge role={member.role} />
                  </td>
                  <td style={{ padding: '12px 14px' }}>
                    {(() => {
                      const membership = (member as any).clubMemberships;
                      const item = Array.isArray(membership) ? membership[0] : membership;
                      const club = item?.club;
                      if (!club) return <span style={{ color: '#9AA0A6', fontSize: '0.8rem' }}>Unassigned</span>;
                      return (
                        <span style={{
                          background: (club.colorToken ?? '#4285F4') + '15',
                          color: club.colorToken ?? '#185FA5',
                          padding: '2px 8px',
                          borderRadius: 100,
                          fontSize: '0.75rem',
                          fontWeight: 600,
                          whiteSpace: 'nowrap'
                        }}>
                          {club.name}
                        </span>
                      );
                    })()}
                  </td>
                  <td style={{ padding: '12px 14px', color: '#5F6368' }}>
                    {member.department ?? '—'}
                  </td>
                  <td style={{ padding: '12px 14px', color: '#5F6368' }}>
                    {member._count.eventRegistrations}
                  </td>
                  <td style={{
                    padding: '12px 14px', fontWeight: 600,
                    color: '#B45309'
                  }}>
                    {member.points}
                  </td>
                  <td style={{ padding: '12px 14px' }}>
                    <StatusBadge isActive={member.isActive} />
                  </td>
                  <td style={{ padding: '12px 14px' }}>
                    <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                      <Link href={`/admin/members/${member.id}/edit`}
                        style={{
                          color: '#4285F4', fontSize: '0.8rem',
                          textDecoration: 'none', fontWeight: 500
                        }}>
                        Edit
                      </Link>
                      <AwardPointsButton memberId={member.id} />
                      <ToggleStatusButton
                        memberId={member.id}
                        isActive={member.isActive}
                      />
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={8} style={{ textAlign: 'center', padding: '32px', color: '#5F6368' }}>
                  No members found matching the selected filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <AdminPagination currentPage={page} totalPages={pages} />
    </div>
  )
}
