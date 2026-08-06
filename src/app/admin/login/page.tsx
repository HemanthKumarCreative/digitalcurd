import { Suspense } from 'react'
import { LoginForm } from '@/components/admin/LoginForm'

export default function AdminLoginPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center text-sm text-[var(--admin-text-muted)]">
          Loading…
        </div>
      }
    >
      <LoginForm />
    </Suspense>
  )
}
