import Link from 'next/link'
import {
  Briefcase,
  Eye,
  FileText,
  ImageIcon,
  Layers,
  Newspaper,
  Scale,
  Upload,
} from 'lucide-react'
import { requireAdminSession } from '@/lib/auth/session'
import { getDashboardStats } from '@/lib/admin/data'
import { Badge } from '@/components/ui/badge'
import { Card, CardDescription, CardTitle } from '@/components/ui/card'
import { PageHeader } from '@/components/ui/page-header'

const formatBytes = (bytes: number) => {
  if (!bytes) return '0 B'
  const units = ['B', 'KB', 'MB', 'GB']
  const i = Math.min(Math.floor(Math.log(bytes) / Math.log(1024)), units.length - 1)
  return `${(bytes / 1024 ** i).toFixed(1)} ${units[i]}`
}

const recentHref = (item: {
  _id: string
  _type: string
  slug?: string
}): string | null => {
  switch (item._type) {
    case 'homePage':
      return '/admin/pages/home'
    case 'aboutPage':
      return '/admin/pages/about'
    case 'careersPage':
      return '/admin/pages/careers'
    case 'contactPage':
      return '/admin/pages/contact'
    case 'blogIndex':
      return '/admin/pages/blog-index'
    case 'servicesIndex':
      return '/admin/pages/services-index'
    case 'siteSettings':
      return '/admin/settings'
    case 'service':
      return item.slug ? `/admin/services/${item.slug}` : '/admin/services'
    case 'post':
      return item.slug ? `/admin/blog/${item.slug}` : '/admin/blog'
    case 'job':
      return `/admin/jobs/${item._id}`
    case 'legalPage':
      return item.slug ? `/admin/legal/${item.slug}` : '/admin/legal'
    default:
      return null
  }
}

export default async function AdminDashboardPage() {
  const session = await requireAdminSession()
  const stats = await getDashboardStats()

  const cards = [
    { label: 'Pages', value: stats.pages, href: '/admin/pages', icon: Layers },
    { label: 'Services', value: stats.services, href: '/admin/services', icon: Briefcase },
    { label: 'Blog posts', value: stats.posts, href: '/admin/blog', icon: Newspaper },
    { label: 'Legal', value: stats.legal, href: '/admin/legal', icon: Scale },
    { label: 'Media', value: stats.media, href: '/admin/media', icon: ImageIcon },
    { label: 'Jobs', value: stats.jobs, href: '/admin/jobs', icon: FileText },
  ]

  return (
    <div className="space-y-6">
      <div className="relative overflow-hidden rounded-[var(--admin-radius)] border border-[var(--admin-border)] bg-[var(--admin-navy)] p-6 text-white shadow-[var(--admin-shadow)] lg:p-8">
        <div
          className="pointer-events-none absolute -top-16 -right-10 h-48 w-48 rounded-full bg-[var(--admin-blue)]/40 blur-2xl"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -bottom-20 -left-10 h-40 w-40 rounded-full bg-[var(--admin-amber)]/20 blur-2xl"
          aria-hidden
        />
        <p className="relative text-sm font-semibold text-white/70">Welcome back</p>
        <h1 className="relative mt-1 text-2xl font-bold lg:text-3xl">{session.user.name}</h1>
        <p className="relative mt-2 max-w-xl text-sm text-white/70">
          Edit website content, swap images, and publish with confidence. Start with Home or jump
          into Media.
        </p>
        <div className="relative mt-5 flex flex-wrap gap-2">
          <Link
            href="/admin/pages/home"
            className="inline-flex h-10 items-center justify-center gap-2 rounded-[var(--admin-radius-sm)] bg-[var(--admin-amber)] px-4 text-sm font-semibold text-[var(--admin-navy)] hover:bg-[var(--admin-amber-deep)]"
          >
            Edit Home page
          </Link>
          <Link
            href="/admin/media"
            className="inline-flex h-10 items-center justify-center gap-2 rounded-[var(--admin-radius-sm)] border border-white/20 bg-white/10 px-4 text-sm font-semibold text-white hover:bg-white/20"
          >
            <Upload className="h-4 w-4" aria-hidden />
            Upload media
          </Link>
          <Link
            href="/admin/preview"
            className="inline-flex h-10 items-center justify-center gap-2 rounded-[var(--admin-radius-sm)] border border-white/20 bg-white/10 px-4 text-sm font-semibold text-white hover:bg-white/20"
          >
            <Eye className="h-4 w-4" aria-hidden />
            Preview site
          </Link>
        </div>
      </div>

      <PageHeader
        title="Overview"
        description="Counts refresh from Sanity. Storage is estimated from uploaded assets."
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {cards.map((card) => {
          const Icon = card.icon
          return (
            <Link key={card.label} href={card.href} className="block focus-visible:outline-none">
              <Card className="h-full transition hover:border-[var(--admin-blue)] hover:shadow-[var(--admin-shadow-lg)]">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <CardDescription>{card.label}</CardDescription>
                    <p className="mt-2 text-3xl font-bold text-[var(--admin-navy)]">{card.value}</p>
                  </div>
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--admin-blue-soft)] text-[var(--admin-blue)]">
                    <Icon className="h-5 w-5" aria-hidden />
                  </div>
                </div>
              </Card>
            </Link>
          )
        })}
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardTitle>Account</CardTitle>
          <div className="mt-4 space-y-3 text-sm">
            <div className="flex items-center justify-between gap-3">
              <span className="text-[var(--admin-text-muted)]">Email</span>
              <span className="font-medium">{session.user.email}</span>
            </div>
            <div className="flex items-center justify-between gap-3">
              <span className="text-[var(--admin-text-muted)]">Access</span>
              <Badge tone="info">Admin</Badge>
            </div>
            <div className="flex items-center justify-between gap-3">
              <span className="text-[var(--admin-text-muted)]">Storage</span>
              <span className="font-medium">{formatBytes(stats.storageBytes)}</span>
            </div>
            {stats.drafts > 0 ? (
              <div className="flex items-center justify-between gap-3">
                <span className="text-[var(--admin-text-muted)]">Sanity draft docs</span>
                <span className="font-medium">{stats.drafts}</span>
              </div>
            ) : null}
          </div>
        </Card>

        <Card>
          <CardTitle>Recent updates</CardTitle>
          <ul className="mt-4 space-y-3">
            {stats.recent.length === 0 ? (
              <li className="text-sm text-[var(--admin-text-muted)]">
                No recent Sanity updates yet. Publish content to see activity here.
              </li>
            ) : (
              stats.recent.map((item) => {
                const href = recentHref(item)
                const inner = (
                  <>
                    <div className="min-w-0">
                      <p className="truncate font-semibold text-[var(--admin-text)]">
                        {item.title || item._type}
                      </p>
                      <p className="text-xs text-[var(--admin-text-muted)]">{item._type}</p>
                    </div>
                    <time className="shrink-0 text-xs text-[var(--admin-text-muted)]">
                      {new Date(item._updatedAt).toLocaleString()}
                    </time>
                  </>
                )
                return (
                  <li key={item._id}>
                    {href ? (
                      <Link
                        href={href}
                        className="flex items-start justify-between gap-3 rounded-[var(--admin-radius-sm)] border border-[var(--admin-border)] px-3 py-2.5 transition hover:border-[var(--admin-blue)] hover:bg-[var(--admin-blue-soft)]/40"
                      >
                        {inner}
                      </Link>
                    ) : (
                      <div className="flex items-start justify-between gap-3 rounded-[var(--admin-radius-sm)] border border-[var(--admin-border)] px-3 py-2.5">
                        {inner}
                      </div>
                    )}
                  </li>
                )
              })
            )}
          </ul>
        </Card>
      </div>
    </div>
  )
}
