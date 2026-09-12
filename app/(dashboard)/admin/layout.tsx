import { requireRole }    from '@/lib/auth-guard'
import DashboardLayout    from '@/components/dashboard/DashboardLayout'
import { getNavLinks }    from '@/lib/nav-links'
import { prisma }         from '@/lib/prisma'

export default async function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await requireRole(['admin'])
  const role    = session.user.role

  const member = await prisma.member.findUnique({
    where:  { id: session.user.id },
    select: { name: true, role: true, imageUrl: true },
  })

  return (
    <DashboardLayout
      panelLabel="Admin Panel"
      accentColor="#EA4335"
      navLinks={getNavLinks(role)}
      user={{
        name:     member?.name ?? session.user.name ?? 'Admin',
        role:     member?.role ?? role,
        imageUrl: member?.imageUrl ?? session.user.imageUrl ?? null,
      }}
    >
      {children}
    </DashboardLayout>
  )
}
