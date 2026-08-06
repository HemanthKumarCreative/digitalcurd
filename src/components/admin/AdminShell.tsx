'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useState } from 'react'
import {
  Briefcase,
  Eye,
  FileText,
  ImageIcon,
  Layers,
  LayoutDashboard,
  LogOut,
  Menu,
  Newspaper,
  Scale,
  Settings,
  Users,
} from 'lucide-react'
import AnimatedLogo from '@/components/AnimatedLogo'
import { Button } from '@/components/ui/button'
import { Sheet } from '@/components/ui/sheet'
import { cn } from '@/lib/utils'

const navGroups = [
  {
    label: 'Overview',
    items: [{ href: '/admin', label: 'Dashboard', icon: LayoutDashboard }],
  },
  {
    label: 'Content',
    items: [
      { href: '/admin/pages', label: 'Pages', icon: Layers },
      { href: '/admin/services', label: 'Services', icon: Briefcase },
      { href: '/admin/blog', label: 'Articles', icon: Newspaper },
      { href: '/admin/authors', label: 'Authors', icon: Users },
      { href: '/admin/jobs', label: 'Jobs', icon: FileText },
      { href: '/admin/legal', label: 'Legal', icon: Scale },
    ],
  },
  {
    label: 'Assets',
    items: [{ href: '/admin/media', label: 'Media', icon: ImageIcon }],
  },
  {
    label: 'Site',
    items: [
      { href: '/admin/settings', label: 'Settings', icon: Settings },
      { href: '/admin/preview', label: 'Live preview', icon: Eye },
    ],
  },
]

type AdminShellProps = {
  children: React.ReactNode
  user: {
    name: string
    email: string
  }
}

export const AdminShell = ({ children, user }: AdminShellProps) => {
  const pathname = usePathname()
  const router = useRouter()
  const [open, setOpen] = useState(false)

  const handleLogout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' })
    const loginHref = pathname.startsWith('/admin') ? '/admin/login' : '/login'
    router.push(loginHref)
    router.refresh()
  }

  const isActive = (href: string) =>
    href === '/admin'
      ? pathname === '/admin' || pathname === '/'
      : pathname === href || pathname.startsWith(`${href}/`)

  const Nav = ({ onNavigate }: { onNavigate?: () => void }) => (
    <nav className="flex flex-1 flex-col gap-5 p-3" aria-label="Admin">
      {navGroups.map((group) => (
        <div key={group.label}>
          <p className="mb-1.5 px-3 text-[10px] font-bold tracking-[0.12em] text-[var(--admin-text-muted)] uppercase">
            {group.label}
          </p>
          <div className="flex flex-col gap-0.5">
            {group.items.map((item) => {
              const Icon = item.icon
              const active = isActive(item.href)
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onNavigate}
                  className={cn(
                    'flex items-center gap-3 rounded-[var(--admin-radius-sm)] px-3 py-2.5 text-sm font-semibold transition-colors',
                    active
                      ? 'bg-[var(--admin-navy)] text-white shadow-sm'
                      : 'text-[var(--admin-text-secondary)] hover:bg-[var(--admin-blue-soft)] hover:text-[var(--admin-navy)]'
                  )}
                  aria-current={active ? 'page' : undefined}
                >
                  <Icon className="h-4 w-4 shrink-0" aria-hidden />
                  {item.label}
                </Link>
              )
            })}
          </div>
        </div>
      ))}
    </nav>
  )

  return (
    <div className="min-h-screen">
      <a
        href="#admin-main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:rounded focus:bg-white focus:px-3 focus:py-2"
      >
        Skip to content
      </a>

      <div className="flex min-h-screen">
        <aside className="hidden w-[264px] shrink-0 flex-col border-r border-[var(--admin-border)] bg-[var(--admin-panel)] lg:flex">
          <div className="border-b border-[var(--admin-border)] px-5 py-5">
            <Link href="/admin" className="block" aria-label="Digital Curd Admin home">
              <AnimatedLogo className="h-7 w-auto max-w-full" variant="dark" />
            </Link>
            <p className="mt-2 text-xs font-semibold tracking-wide text-[var(--admin-text-muted)] uppercase">
              Admin
            </p>
          </div>
          <Nav />
          <div className="mt-auto border-t border-[var(--admin-border)] p-4">
            <p className="truncate text-sm font-semibold text-[var(--admin-text)]">{user.name}</p>
            <p className="truncate text-xs text-[var(--admin-text-muted)]">{user.email}</p>
            <Button
              variant="outline"
              size="sm"
              className="mt-3 w-full"
              onClick={handleLogout}
              aria-label="Log out"
            >
              <LogOut className="h-4 w-4" aria-hidden />
              Log out
            </Button>
          </div>
        </aside>

        <div className="flex min-w-0 flex-1 flex-col">
          <header className="sticky top-0 z-40 flex items-center justify-between border-b border-[var(--admin-border)] bg-[var(--admin-panel)]/95 px-4 py-3 backdrop-blur lg:px-6">
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden"
                onClick={() => setOpen(true)}
                aria-label="Open navigation menu"
              >
                <Menu className="h-5 w-5" />
              </Button>
              <div className="lg:hidden">
                <AnimatedLogo className="h-6 w-auto" variant="dark" />
                <p className="text-[10px] font-semibold tracking-wide text-[var(--admin-text-muted)] uppercase">
                  Admin
                </p>
              </div>
              <div className="hidden lg:block">
                <p className="text-sm font-bold text-[var(--admin-navy)]">Content Console</p>
                <p className="text-xs text-[var(--admin-text-muted)]">
                  Edit pages, media, and site settings
                </p>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="lg:hidden"
              onClick={handleLogout}
              aria-label="Log out"
            >
              <LogOut className="h-4 w-4" />
            </Button>
          </header>

          <main id="admin-main" className="admin-scrollbar flex-1 overflow-x-hidden p-4 lg:p-6">
            {children}
          </main>
        </div>
      </div>

      <Sheet open={open} onClose={() => setOpen(false)} title="Navigation" side="left">
        <Nav onNavigate={() => setOpen(false)} />
        <div className="border-t border-[var(--admin-border)] p-4">
          <p className="truncate text-sm font-semibold">{user.name}</p>
          <p className="truncate text-xs text-[var(--admin-text-muted)]">{user.email}</p>
        </div>
      </Sheet>
    </div>
  )
}
