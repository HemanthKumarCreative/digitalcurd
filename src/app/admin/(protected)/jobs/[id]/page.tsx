import { notFound } from 'next/navigation'
import { StructuredDocumentEditor } from '@/components/admin/StructuredDocumentEditor'
import { getDocument } from '@/lib/admin/data'
import { requireAdminSession } from '@/lib/auth/session'

type PageProps = {
  params: Promise<{ id: string }>
}

export default async function AdminJobEditorPage({ params }: PageProps) {
  await requireAdminSession()
  const { id } = await params
  const doc = await getDocument<Record<string, unknown>>(id)
  if (!doc) notFound()

  return (
    <StructuredDocumentEditor
      documentId={id}
      documentType="job"
      title={String(doc.title || 'Job')}
      description="Update job listing details and visibility."
      previewPath="/careers"
      allowDelete
      listHref="/admin/jobs"
      breadcrumbs={[
        { label: 'Jobs', href: '/admin/jobs' },
        { label: String(doc.title || 'Job') },
      ]}
      initialValues={{
        title: doc.title,
        jobId: doc.jobId,
        location: doc.location,
        type: doc.type,
        blurb: doc.blurb,
        applyHref: doc.applyHref,
        published: doc.published !== false,
      }}
      sections={[
        { key: 'title', title: 'Title', kind: 'string' },
        { key: 'jobId', title: 'Stable ID', kind: 'string' },
        { key: 'location', title: 'Location', kind: 'string' },
        { key: 'type', title: 'Type', kind: 'string' },
        { key: 'blurb', title: 'Blurb', kind: 'textarea' },
        { key: 'applyHref', title: 'Apply link', kind: 'string' },
        { key: 'published', title: 'Published', kind: 'boolean' },
      ]}
    />
  )
}
