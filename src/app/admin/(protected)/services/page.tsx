import { listDocumentsPreferDraft } from '@/lib/admin/data'
import { ContentListSearch } from '@/components/admin/ContentListSearch'
import { CreateDocumentButton } from '@/components/admin/CreateDocumentButton'
import { PageHeader } from '@/components/ui/page-header'

type ServiceRow = {
  _id: string
  title?: string
  slug?: string
  category?: string
  isDraft?: boolean
}

export default async function AdminServicesPage() {
  const services = await listDocumentsPreferDraft<ServiceRow>(
    'service',
    `_id, title, "slug": slug.current, category`,
    'title asc'
  )

  return (
    <div className="space-y-4">
      <PageHeader
        title="Services"
        description={`${services.length} services`}
        breadcrumbs={[{ label: 'Content' }, { label: 'Services' }]}
        actions={<CreateDocumentButton kind="service" />}
      />
      <ContentListSearch
        emptyTitle="No services yet"
        emptyDescription="Create your first service to start editing content."
        placeholder="Search services…"
        items={services.map((service) => ({
          id: service._id,
          href: `/admin/services/${service.slug || service._id}`,
          title: service.title || 'Untitled',
          subtitle: `/${service.slug}`,
          badges: [
            ...(service.isDraft
              ? [{ label: 'Draft', tone: 'warning' as const }]
              : [{ label: 'Published', tone: 'success' as const }]),
            ...(service.category
              ? [{ label: service.category, tone: 'info' as const }]
              : []),
          ],
          searchText: `${service.category || ''} ${service.slug || ''}`,
        }))}
      />
    </div>
  )
}
