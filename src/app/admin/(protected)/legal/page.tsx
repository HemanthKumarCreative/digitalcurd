import { listDocumentsPreferDraft } from '@/lib/admin/data'
import { AdminResourceList } from '@/components/admin/AdminResourceList'

type LegalRow = {
  _id: string
  title?: string
  slug?: string
  isDraft?: boolean
}

export default async function AdminLegalPage() {
  const pages = await listDocumentsPreferDraft<LegalRow>(
    'legalPage',
    `_id, title, "slug": slug.current`,
    'title asc'
  )

  return (
    <AdminResourceList
      title="Legal"
      description="Privacy, terms, disclaimer, and more."
      breadcrumbs={[{ label: 'Content' }, { label: 'Legal' }]}
      emptyTitle="No legal pages"
      emptyDescription="Seed legal documents to edit them here."
      placeholder="Search legal pages…"
      gridClassName="grid gap-3 md:grid-cols-2"
      items={pages.map((page) => ({
        id: page._id,
        href: `/admin/legal/${page.slug || page._id}`,
        title: page.title || 'Untitled',
        subtitle: `/${page.slug}`,
        status: page.isDraft ? ('draft' as const) : ('published' as const),
        searchText: page.slug || '',
      }))}
    />
  )
}
