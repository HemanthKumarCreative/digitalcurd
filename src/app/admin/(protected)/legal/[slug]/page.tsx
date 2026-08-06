import { notFound } from 'next/navigation'
import { StructuredDocumentEditor } from '@/components/admin/StructuredDocumentEditor'
import { getDocument } from '@/lib/admin/data'
import { getWriteClient } from '@/lib/admin/sanity'
import { requireAdminSession } from '@/lib/auth/session'

type PageProps = {
  params: Promise<{ slug: string }>
}

export default async function AdminLegalEditorPage({ params }: PageProps) {
  await requireAdminSession()
  const { slug } = await params

  let matched: { _id: string } | null = null
  try {
    matched = await getWriteClient().fetch(
      `*[_type == "legalPage" && slug.current == $slug && !(_id in path("drafts.**"))][0]{ _id }`,
      { slug }
    )
  } catch {
    matched = null
  }
  if (!matched?._id) notFound()

  const doc = (await getDocument<Record<string, unknown>>(matched._id)) || {}
  const previewPath =
    slug === 'privacy-policy'
      ? '/privacy-policy'
      : slug === 'terms-of-service'
        ? '/terms-of-service'
        : slug === 'disclaimer'
          ? '/disclaimer'
          : `/${slug}`

  return (
    <StructuredDocumentEditor
      documentId={matched._id}
      documentType="legalPage"
      title={String(doc.title || slug)}
      description="Edit legal page content and SEO."
      previewPath={previewPath}
      breadcrumbs={[
        { label: 'Legal', href: '/admin/legal' },
        { label: String(doc.title || slug) },
      ]}
      initialValues={{
        title: doc.title,
        lastUpdated: doc.lastUpdated,
        intro: doc.intro,
        sections: doc.sections,
        seo: doc.seo,
      }}
      sections={[
        { key: 'title', title: 'Title', kind: 'string' },
        { key: 'lastUpdated', title: 'Last updated', kind: 'string' },
        { key: 'intro', title: 'Intro', kind: 'textarea' },
        {
          key: 'sections',
          title: 'Sections',
          description: 'Heading + paragraphs blocks',
          kind: 'legalSections',
        },
        { key: 'seo', title: 'SEO', kind: 'seo' },
      ]}
    />
  )
}
