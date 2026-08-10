import { listDocumentsPreferDraft } from '@/lib/admin/data'
import { AdminResourceList } from '@/components/admin/AdminResourceList'
import { CreateDocumentButton } from '@/components/admin/CreateDocumentButton'

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
    <AdminResourceList
      title="Services"
      description={`${services.length} services`}
      breadcrumbs={[{ label: 'Content' }, { label: 'Services' }]}
      actions={<CreateDocumentButton kind="service" />}
      emptyTitle="No services yet"
      emptyDescription="Create your first service to start editing content."
      placeholder="Search services…"
      items={services.map((service) => ({
        id: service._id,
        href: `/admin/services/${service.slug || service._id}`,
        title: service.title || 'Untitled',
        subtitle: `/${service.slug}`,
        status: service.isDraft ? ('draft' as const) : ('published' as const),
        deletableType: 'service',
        badges: service.category
          ? [{ label: service.category, tone: 'info' as const }]
          : [],
        searchText: `${service.category || ''} ${service.slug || ''}`,
      }))}
    />
  )
}
