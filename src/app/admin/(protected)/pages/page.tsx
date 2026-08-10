import { AdminResourceList } from '@/components/admin/AdminResourceList'

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
    <AdminResourceList
      title="Pages"
      description="Edit marketing page sections with visual fields. Section order stays fixed on the public site."
      breadcrumbs={[{ label: 'Content' }, { label: 'Pages' }]}
      emptyTitle="No pages"
      emptyDescription="Marketing pages appear here once seeded."
      placeholder="Search pages…"
      items={pages.map((page) => ({
        id: page.id,
        href: page.href,
        title: page.title,
        subtitle: page.description,
        searchText: page.description,
      }))}
    />
  )
}
