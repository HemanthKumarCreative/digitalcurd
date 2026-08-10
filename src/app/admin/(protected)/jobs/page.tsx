import { listDocumentsPreferDraft } from '@/lib/admin/data'
import { AdminResourceList } from '@/components/admin/AdminResourceList'
import { CreateDocumentButton } from '@/components/admin/CreateDocumentButton'

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
    <AdminResourceList
      title="Jobs"
      description={`${jobs.length} listings`}
      breadcrumbs={[{ label: 'Content' }, { label: 'Jobs' }]}
      actions={<CreateDocumentButton kind="job" />}
      emptyTitle="No jobs yet"
      emptyDescription="Create a job listing to show it on Careers."
      placeholder="Search jobs…"
      items={jobs.map((job) => ({
        id: job._id,
        href: `/admin/jobs/${job._id}`,
        title: job.title || 'Untitled',
        subtitle: `${job.location || '—'} · ${job.type || '—'}`,
        status: job.isDraft ? ('draft' as const) : ('published' as const),
        deletableType: 'job',
        badges:
          job.published === false
            ? [{ label: 'Hidden on Careers', tone: 'warning' as const }]
            : [],
        searchText: `${job.location || ''} ${job.type || ''}`,
      }))}
    />
  )
}
