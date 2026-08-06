import { notFound } from 'next/navigation'
import { StructuredDocumentEditor } from '@/components/admin/StructuredDocumentEditor'
import { getDocument, resolveIdBySlug } from '@/lib/admin/data'
import { requireAdminSession } from '@/lib/auth/session'

type PageProps = {
  params: Promise<{ slug: string }>
}

export default async function AdminBlogEditorPage({ params }: PageProps) {
  await requireAdminSession()
  const { slug } = await params
  const documentId = await resolveIdBySlug('post', slug)
  if (!documentId) notFound()

  const doc = (await getDocument<Record<string, unknown>>(documentId)) || {}
  const slugCurrent =
    typeof doc.slug === 'object' && doc.slug && 'current' in (doc.slug as object)
      ? String((doc.slug as { current?: string }).current || slug)
      : slug

  return (
    <StructuredDocumentEditor
      documentId={documentId}
      documentType="post"
      title={String(doc.title || slug)}
      description="Edit blog post content, cover image, and SEO."
      previewPath={`/blog/${slugCurrent}`}
      allowDelete
      listHref="/admin/blog"
      breadcrumbs={[
        { label: 'Blog', href: '/admin/blog' },
        { label: String(doc.title || slug) },
      ]}
      initialValues={{
        title: doc.title,
        slug: slugCurrent,
        excerpt: doc.excerpt,
        category: doc.category,
        publishedAt: doc.publishedAt ? String(doc.publishedAt).slice(0, 16) : '',
        coverImageUrl: doc.coverImageUrl,
        bodyParagraphs: doc.bodyParagraphs,
        seo: doc.seo,
      }}
      sections={[
        { key: 'title', title: 'Title', kind: 'string' },
        { key: 'slug', title: 'URL slug', kind: 'slug' },
        { key: 'excerpt', title: 'Excerpt', kind: 'textarea' },
        { key: 'category', title: 'Category', kind: 'string' },
        { key: 'publishedAt', title: 'Published at', kind: 'datetime' },
        { key: 'coverImageUrl', title: 'Cover image', kind: 'imageUrl' },
        {
          key: 'bodyParagraphs',
          title: 'Body paragraphs',
          description: 'Separate paragraphs with a blank line',
          kind: 'stringList',
        },
        { key: 'seo', title: 'SEO', kind: 'seo' },
      ]}
    />
  )
}
