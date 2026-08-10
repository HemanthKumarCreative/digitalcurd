import Link from 'next/link'
import { listDocumentsPreferDraft } from '@/lib/admin/data'
import { AdminResourceList } from '@/components/admin/AdminResourceList'
import { CreateAuthorButton } from '@/components/admin/CreateAuthorButton'

type AuthorRow = {
  _id: string
  name?: string
  slug?: string
  role?: string
  isDraft?: boolean
}

export default async function AdminAuthorsPage() {
  const authors = await listDocumentsPreferDraft<AuthorRow>(
    'author',
    `_id, name, role, "slug": slug.current`,
    'name asc'
  )

  return (
    <AdminResourceList
      title="Authors"
      description={`${authors.length} authors`}
      breadcrumbs={[{ label: 'Content' }, { label: 'Authors' }]}
      actions={<CreateAuthorButton />}
      emptyTitle="No authors yet"
      emptyDescription="Create an author profile to attach to blog posts."
      placeholder="Search authors…"
      items={authors.map((author) => ({
        id: author._id,
        href: `/admin/authors/${author.slug || author._id}`,
        title: author.name || 'Untitled',
        subtitle: author.role || `/${author.slug}`,
        status: author.isDraft ? ('draft' as const) : ('published' as const),
        deletableType: 'author',
        badges: author.role ? [{ label: author.role }] : [],
        searchText: `${author.role || ''} ${author.slug || ''}`,
      }))}
      footer={
        <p className="text-sm text-[var(--admin-text-muted)]">
          Authors appear on blog posts as the “Updated by” byline and bio card.{' '}
          <Link href="/admin/blog" className="underline">
            Back to blog
          </Link>
        </p>
      }
    />
  )
}
