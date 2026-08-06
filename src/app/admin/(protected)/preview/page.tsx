import { DevicePreview } from '@/components/admin/DevicePreview'
import { PageHeader } from '@/components/ui/page-header'
import { requireAdminSession } from '@/lib/auth/session'
import { getSiteUrl } from '@/lib/site'

type PageProps = {
  searchParams: Promise<{ path?: string }>
}

export default async function AdminPreviewPage({ searchParams }: PageProps) {
  await requireAdminSession()
  const params = await searchParams
  const siteUrl =
    process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : getSiteUrl()

  return (
    <div className="space-y-4">
      <PageHeader
        title="Live preview"
        description="Read-only view of the site across devices — same as visitors see. No click-to-edit. To edit content, open a page and use Design mode. Optionally enable draft mode here to preview unpublished drafts."
        breadcrumbs={[{ label: 'Site' }, { label: 'Live preview' }]}
      />
      <DevicePreview siteUrl={siteUrl} initialPath={params.path || '/'} />
    </div>
  )
}
