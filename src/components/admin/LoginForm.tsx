'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useState, useTransition } from 'react'
import AnimatedLogo from '@/components/AnimatedLogo'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

type LoginFormProps = {
  redirectTo?: string
}

export const LoginForm = ({ redirectTo = '/admin' }: LoginFormProps) => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const next = searchParams.get('next') || redirectTo
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [pending, startTransition] = useTransition()

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError(null)
    startTransition(async () => {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, rememberMe }),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) {
        setError(data.message || 'Invalid email or password')
        return
      }
      const dest =
        next.startsWith('/admin') || next === '/'
          ? next === '/'
            ? '/admin'
            : next
          : '/admin'
      router.push(dest)
      router.refresh()
    })
  }

  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <aside className="relative hidden overflow-hidden bg-[var(--admin-navy)] lg:flex lg:flex-col lg:justify-between lg:p-12">
        <div
          className="pointer-events-none absolute inset-0 opacity-40"
          style={{
            background:
              'radial-gradient(circle at 20% 20%, rgba(29,91,196,0.55), transparent 45%), radial-gradient(circle at 80% 70%, rgba(251,191,36,0.25), transparent 40%)',
          }}
        />
        <div className="relative">
          <AnimatedLogo className="h-9 w-auto" variant="light" />
          <p className="mt-8 text-sm font-semibold tracking-wide text-white/70 uppercase">
            Admin console
          </p>
          <h1 className="mt-3 max-w-md text-4xl font-bold leading-tight text-white">
            Content console built for calm, fast publishing.
          </h1>
          <p className="mt-4 max-w-sm text-base text-white/70">
            Update pages, swap images, and preview across devices without touching code.
          </p>
        </div>
        <p className="relative text-sm text-white/50">Secure single-admin access</p>
      </aside>

      <div className="flex items-center justify-center bg-[var(--admin-canvas)] p-6">
        <div className="w-full max-w-md rounded-[var(--admin-radius)] border border-[var(--admin-border)] bg-white p-8 shadow-[var(--admin-shadow-lg)]">
          <div className="mb-8 lg:hidden">
            <AnimatedLogo className="h-8 w-auto" variant="dark" />
          </div>
          <h2 className="text-2xl font-bold text-[var(--admin-navy)]">Sign in</h2>
          <p className="mt-1 text-sm text-[var(--admin-text-muted)]">
            Manage Digital Curd content securely.
          </p>

          <form className="mt-8 space-y-4" onSubmit={handleSubmit} noValidate>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                aria-required="true"
                placeholder="you@digitalcurd.com"
              />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                minLength={10}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                aria-required="true"
                placeholder="••••••••••••"
              />
            </div>
            <label className="flex items-center gap-2 text-sm text-[var(--admin-text-secondary)]">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="h-4 w-4 rounded border-[var(--admin-border)]"
              />
              Remember me for 30 days
            </label>
            {error ? (
              <p
                className="rounded-[var(--admin-radius-sm)] bg-[var(--admin-danger-soft)] px-3 py-2 text-sm text-[var(--admin-danger)]"
                role="alert"
              >
                {error}
              </p>
            ) : null}
            <Button type="submit" className="w-full" disabled={pending} aria-busy={pending}>
              {pending ? 'Signing in…' : 'Sign in'}
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}
