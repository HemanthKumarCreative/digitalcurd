import { listDocuments } from '@/lib/admin/data'
import { ContentListSearch } from '@/components/admin/ContentListSearch'
import { PageHeader } from '@/components/ui/page-header'

type LegalRow = {
  _id: string
  title?: string
  slug?: string
}

export default async function AdminLegalPage() {
  const pages = await listDocuments<LegalRow>(
    `*[_type == "legalPage" && !(_id in path("drafts.**"))] | order(title asc){
      _id, title, "slug": slug.current
    }`
  )

  return (
    <div className="space-y-4">
      <PageHeader
        title="Legal"
        description="Privacy, terms, disclaimer, and more."
        breadcrumbs={[{ label: 'Content' }, { label: 'Legal' }]}
      />
      <ContentListSearch
        emptyTitle="No legal pages"
        emptyDescription="Seed legal documents to edit them here."
        placeholder="Search legal pages…"
        gridClassName="grid gap-3 md:grid-cols-2"
        items={pages.map((page) => ({
          id: page._id,
          href: `/admin/legal/${page.slug || page._id}`,
          title: page.title || 'Untitled',
          subtitle: `/${page.slug}`,
          searchText: page.slug || '',
        }))}
      />
    </div>
  )
}
