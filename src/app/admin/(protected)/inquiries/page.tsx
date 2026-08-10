import { listDocumentsPreferDraft } from '@/lib/admin/data'
import { AdminResourceList } from '@/components/admin/AdminResourceList'

type InquiryRow = {
  _id: string
  name?: string
  email?: string
  service?: string
  status?: string
  submittedAt?: string
  isDraft?: boolean
}

export default async function AdminInquiriesPage() {
  const inquiries = await listDocumentsPreferDraft<InquiryRow>(
    'inquiry',
    `_id, name, email, service, status, submittedAt`,
    'submittedAt desc'
  )

  const newInquiries = inquiries.filter((i) => i.status === 'new').length

  return (
    <AdminResourceList
      title="Inquiries"
      description={`${inquiries.length} total form submissions. ${newInquiries > 0 ? `${newInquiries} new.` : ''}`}
      breadcrumbs={[{ label: 'Content' }, { label: 'Inquiries' }]}
      emptyTitle="No inquiries yet"
      emptyDescription="When users submit the contact form, their submissions will appear here."
      placeholder="Search by name, email, or service..."
      items={inquiries.map((inquiry) => {
        let tone: 'default' | 'success' | 'warning' | 'info' | 'danger' = 'default'
        if (inquiry.status === 'new') tone = 'success'
        if (inquiry.status === 'contacted') tone = 'info'

        const date = inquiry.submittedAt
          ? new Date(inquiry.submittedAt).toLocaleDateString()
          : ''

        return {
          id: inquiry._id,
          href: `/admin/inquiries/${inquiry._id}`,
          title: inquiry.name || 'Anonymous',
          subtitle: inquiry.email || 'No email provided',
          deletableType: 'inquiry',
          badges: [
            ...(inquiry.status
              ? [{ label: inquiry.status.toUpperCase(), tone }]
              : []),
            ...(inquiry.service
              ? [{ label: inquiry.service, tone: 'default' as const }]
              : []),
          ],
          searchText: `${inquiry.service || ''} ${inquiry.email || ''} ${date}`,
        }
      })}
    />
  )
}
