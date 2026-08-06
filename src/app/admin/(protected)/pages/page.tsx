import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import { PageHeader } from '@/components/ui/page-header'
import { cn } from '@/lib/utils'

const pages = [
  {
    id: 'homePage',
    title: 'Home',
    href: '/admin/pages/home',
    description: 'Hero, logos, stats, AI, pillars, FAQ, contact form',
  },
  {
    id: 'aboutPage',
    title: 'About',
    href: '/admin/pages/about',
    description: 'Story, values, team, CTA',
  },
  {
    id: 'careersPage',
    title: 'Careers',
    href: '/admin/pages/careers',
    description: 'Culture, benefits, careers CTA',
  },
  {
    id: 'contactPage',
    title: 'Contact',
    href: '/admin/pages/contact',
    description: 'Contact hero and SEO',
  },
  {
    id: 'blogIndex',
    title: 'Blog index',
    href: '/admin/pages/blog-index',
    description: 'Blog listing hero and SEO',
  },
  {
    id: 'servicesIndex',
    title: 'Services index',
    href: '/admin/pages/services-index',
    description: 'Services listing hero and SEO',
  },
]

export default function AdminPagesIndex() {
  return (
    <div className="space-y-4">
      <PageHeader
        title="Pages"
        description="Edit marketing page sections with visual fields. Section order stays fixed on the public site."
        breadcrumbs={[{ label: 'Content' }, { label: 'Pages' }]}
      />
      <div className="grid gap-3">
        {pages.map((page) => (
          <Link
            key={page.id}
            href={page.href}
            className={cn(
              'group flex items-center justify-between gap-4 rounded-[var(--admin-radius)] border border-[var(--admin-border)] bg-white p-4 shadow-[var(--admin-shadow)] transition hover:border-[var(--admin-blue)] hover:shadow-[var(--admin-shadow-lg)]'
            )}
          >
            <div className="min-w-0">
              <p className="font-bold text-[var(--admin-navy)]">{page.title}</p>
              <p className="mt-0.5 text-sm text-[var(--admin-text-muted)]">{page.description}</p>
            </div>
            <ChevronRight
              className="h-5 w-5 shrink-0 text-[var(--admin-text-muted)] transition group-hover:text-[var(--admin-blue)]"
              aria-hidden
            />
          </Link>
        ))}
      </div>
    </div>
  )
}
