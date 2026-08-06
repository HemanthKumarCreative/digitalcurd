import { AdminShell } from '@/components/admin/AdminShell'
import { ToastProvider } from '@/components/ui/toast'
import { requireAdminSession } from '@/lib/auth/session'

export default async function AdminProtectedLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await requireAdminSession()

  return (
    <ToastProvider>
      <AdminShell
        user={{
          name: session.user.name,
          email: session.user.email,
        }}
      >
        {children}
      </AdminShell>
    </ToastProvider>
  )
}
