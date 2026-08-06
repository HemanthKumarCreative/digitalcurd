import { StructuredDocumentEditor } from '@/components/admin/StructuredDocumentEditor'
import { getDocument } from '@/lib/admin/data'
import { requireAdminSession } from '@/lib/auth/session'

export default async function AdminSettingsPage() {
  await requireAdminSession()
  const doc = (await getDocument<Record<string, unknown>>('siteSettings')) || {}

  return (
    <StructuredDocumentEditor
      documentId="siteSettings"
      documentType="siteSettings"
      title="Site settings"
      description="Global branding, contact info, social links, and default SEO. Footer content is edited here (not inside page Design Mode)."
      forceFormMode
      breadcrumbs={[{ label: 'Site' }, { label: 'Settings' }]}
      initialValues={{
        siteName: doc.siteName,
        email: doc.email,
        phone: doc.phone,
        footerBlurb: doc.footerBlurb,
        socialLinks: doc.socialLinks,
        seo: doc.seo,
      }}
      sections={[
        { key: 'siteName', title: 'Site name', kind: 'string' },
        { key: 'email', title: 'Email', kind: 'string' },
        { key: 'phone', title: 'Phone CTA', kind: 'linkCta' },
        { key: 'footerBlurb', title: 'Footer blurb', kind: 'textarea' },
        {
          key: 'socialLinks',
          title: 'Social links',
          kind: 'socialLinks',
          defaultOpen: false,
        },
        { key: 'seo', title: 'Default SEO', kind: 'seo' },
      ]}
    />
  )
}
