import { requireAuth }    from '@/lib/auth-guard'
import DashboardLayout    from '@/components/dashboard/DashboardLayout'
import { getNavLinks }    from '@/lib/nav-links'
import { prisma }         from '@/lib/prisma'

export default async function DashboardLayoutWrapper({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await requireAuth()
  const role    = session.user.role

  const member = await prisma.member.findUnique({
    where:  { id: session.user.id },
    select: { name: true, role: true, imageUrl: true },
  })

  return (
    <DashboardLayout
      panelLabel={role === 'admin' ? 'Admin Panel' : role === 'core' ? 'Core Panel' : 'My Dashboard'}
      accentColor={role === 'admin' ? '#EA4335' : role === 'core' ? '#4285F4' : '#34A853'}
      navLinks={getNavLinks(role)}
      user={{
        name:     member?.name ?? session.user.name ?? 'Member',
        role:     member?.role ?? role,
        imageUrl: member?.imageUrl ?? session.user.imageUrl ?? null,
      }}
    >
      {children}
    </DashboardLayout>
  )
}
