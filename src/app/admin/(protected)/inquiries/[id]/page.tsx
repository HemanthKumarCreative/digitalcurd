import { notFound } from 'next/navigation'
import { StructuredDocumentEditor } from '@/components/admin/StructuredDocumentEditor'
import { getDocument } from '@/lib/admin/data'
import { requireAdminSession } from '@/lib/auth/session'

type PageProps = {
  params: Promise<{ id: string }>
}

export default async function AdminInquiryEditorPage({ params }: PageProps) {
  await requireAdminSession()
  const { id } = await params
  
  if (!id) notFound()

  const doc = await getDocument<Record<string, unknown>>(id)
  if (!doc || doc._type !== 'inquiry') notFound()

  return (
    <StructuredDocumentEditor
      documentId={id}
      documentType="inquiry"
      title={String(doc.name || 'Anonymous Inquiry')}
      description={`Submitted on ${doc.submittedAt ? new Date(doc.submittedAt as string).toLocaleString() : 'Unknown'}`}
      allowDelete
      listHref="/admin/inquiries"
      forceFormMode
      breadcrumbs={[
        { label: 'Inquiries', href: '/admin/inquiries' },
        { label: String(doc.name || 'Anonymous') },
      ]}
      initialValues={{
        name: doc.name,
        email: doc.email,
        service: doc.service,
        requirements: doc.requirements,
        status: doc.status,
      }}
      sections={[
        { key: 'name', title: 'Name', kind: 'string', defaultOpen: true },
        { key: 'email', title: 'Email', kind: 'string', defaultOpen: true },
        { key: 'service', title: 'Service', kind: 'string' },
        { key: 'requirements', title: 'Requirements', kind: 'textarea', defaultOpen: true },
        { 
          key: 'status', 
          title: 'Status', 
          kind: 'select', 
          options: [
            { label: 'New', value: 'new' },
            { label: 'Contacted', value: 'contacted' },
            { label: 'Archived', value: 'archived' },
          ] 
        },
      ]}
    />
  )
}
