import { listDocumentsPreferDraft } from '@/lib/admin/data'
import { ContentListSearch } from '@/components/admin/ContentListSearch'
import { CreateDocumentButton } from '@/components/admin/CreateDocumentButton'
import { PageHeader } from '@/components/ui/page-header'

type JobRow = {
  _id: string
  title?: string
  location?: string
  type?: string
  published?: boolean
  isDraft?: boolean
}

export default async function AdminJobsPage() {
  const jobs = await listDocumentsPreferDraft<JobRow>(
    'job',
    `_id, title, location, type, published`,
    'title asc'
  )

  return (
    <div className="space-y-6">
      <PageHeader
        title="Jobs"
        description={`${jobs.length} listings`}
        breadcrumbs={[{ label: 'Content' }, { label: 'Jobs' }]}
        actions={<CreateDocumentButton kind="job" />}
      />
      <ContentListSearch
        emptyTitle="No jobs yet"
        emptyDescription="Create a job listing to show it on Careers."
        placeholder="Search jobs…"
        items={jobs.map((job) => ({
          id: job._id,
          href: `/admin/jobs/${job._id}`,
          title: job.title || 'Untitled',
          subtitle: `${job.location || '—'} · ${job.type || '—'}`,
          badges: [
            ...(job.isDraft
              ? [{ label: 'Draft', tone: 'warning' as const }]
              : []),
            {
              label: job.published === false ? 'Hidden' : 'Published',
              tone: job.published === false ? ('warning' as const) : ('success' as const),
            },
          ],
          searchText: `${job.location || ''} ${job.type || ''}`,
        }))}
      />
    </div>
  )
}
