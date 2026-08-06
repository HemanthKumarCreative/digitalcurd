import { notFound } from 'next/navigation'
import { StructuredDocumentEditor } from '@/components/admin/StructuredDocumentEditor'
import { getDocument, resolveIdBySlug } from '@/lib/admin/data'
import { requireAdminSession } from '@/lib/auth/session'

type PageProps = {
  params: Promise<{ slug: string }>
}

export default async function AdminServiceEditorPage({ params }: PageProps) {
  await requireAdminSession()
  const { slug } = await params
  const documentId = await resolveIdBySlug('service', slug)
  if (!documentId) notFound()

  const doc =
    (await getDocument<Record<string, unknown>>(documentId)) ||
    ({} as Record<string, unknown>)
  const slugCurrent =
    typeof doc.slug === 'object' && doc.slug && 'current' in (doc.slug as object)
      ? String((doc.slug as { current?: string }).current || slug)
      : slug

  return (
    <StructuredDocumentEditor
      documentId={documentId}
      documentType="service"
      title={String(doc.title || slug)}
      description="Edit service content, images, and SEO with visual fields."
      previewPath={`/services/${slugCurrent}`}
      allowDelete
      listHref="/admin/services"
      breadcrumbs={[
        { label: 'Services', href: '/admin/services' },
        { label: String(doc.title || slug) },
      ]}
      initialValues={{
        title: doc.title,
        slug: slugCurrent,
        subtitle: doc.subtitle,
        shortDescription: doc.shortDescription,
        description: doc.description,
        category: doc.category,
        heroImageUrl: doc.heroImageUrl,
        outcomes: doc.outcomes,
        capabilities: doc.capabilities,
        featuresSection: doc.featuresSection,
        process: doc.process,
        faqs: doc.faqs,
        cta: doc.cta,
        phone: doc.phone,
        seo: doc.seo,
      }}
      sections={[
        { key: 'title', title: 'Title', kind: 'string' },
        { key: 'slug', title: 'URL slug', kind: 'slug' },
        { key: 'subtitle', title: 'Subtitle', kind: 'string' },
        { key: 'category', title: 'Category', kind: 'category' },
        { key: 'shortDescription', title: 'Short description', kind: 'textarea' },
        { key: 'description', title: 'Description', kind: 'textarea' },
        { key: 'heroImageUrl', title: 'Hero image', kind: 'imageUrl' },
        { key: 'outcomes', title: 'Outcomes', kind: 'features' },
        { key: 'capabilities', title: 'Capabilities', kind: 'features' },
        {
          key: 'featuresSection',
          title: 'Features section',
          kind: 'featuresSection',
          defaultOpen: false,
        },
        { key: 'process', title: 'Process steps', kind: 'process', defaultOpen: false },
        { key: 'faqs', title: 'FAQs', kind: 'faqs' },
        { key: 'cta', title: 'Hero CTA', kind: 'linkCta' },
        { key: 'phone', title: 'Phone CTA', kind: 'linkCta', defaultOpen: false },
        { key: 'seo', title: 'SEO', kind: 'seo' },
      ]}
    />
  )
}
