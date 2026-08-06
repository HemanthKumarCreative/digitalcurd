import { notFound } from 'next/navigation'
import { StructuredDocumentEditor } from '@/components/admin/StructuredDocumentEditor'
import { getDocument, listDocumentsPreferDraft, resolveIdBySlug } from '@/lib/admin/data'
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

  const [authors, posts] = await Promise.all([
    listDocumentsPreferDraft<{ _id: string; name?: string; role?: string; slug?: string }>(
      'author',
      `_id, name, role, "slug": slug.current`,
      'name asc'
    ),
    listDocumentsPreferDraft<{ _id: string; title?: string; slug?: string }>(
      'post',
      `_id, title, "slug": slug.current`,
      'publishedAt desc'
    ),
  ])

  const authorOptions = authors.map((author) => ({
    id: author._id.replace(/^drafts\./, ''),
    name: author.name || 'Untitled author',
    role: author.role,
  }))

  const postOptions = posts
    .filter((post) => {
      const postSlug = post.slug || ''
      const postId = post._id.replace(/^drafts\./, '')
      const currentId = documentId.replace(/^drafts\./, '')
      return postSlug !== slugCurrent && postId !== currentId
    })
    .map((post) => ({
      id: post._id.replace(/^drafts\./, ''),
      title: post.title || 'Untitled',
      slug: post.slug || '',
    }))

  const ctaValue =
    doc.cta && typeof doc.cta === 'object'
      ? {
          title: String((doc.cta as { title?: string }).title || ''),
          description: String((doc.cta as { description?: string }).description || ''),
          label: String(
            (doc.cta as { label?: string }).label ||
              (doc.cta as { cta?: { label?: string } }).cta?.label ||
              ''
          ),
          href: String(
            (doc.cta as { href?: string }).href ||
              (doc.cta as { cta?: { href?: string } }).cta?.href ||
              ''
          ),
        }
      : {
          title: 'Want this applied to your business?',
          description: 'Book a free consultation and we will map a practical next step.',
          label: 'Schedule a Call',
          href: '/contact',
        }

  return (
    <StructuredDocumentEditor
      documentId={documentId}
      documentType="post"
      title={String(doc.title || slug)}
      description="Edit the structured article in Form mode. Keep the same section pattern: intro → table → mid CTA → guide → conclusion → FAQs."
      previewPath={`/blog/${slugCurrent}`}
      allowDelete
      listHref="/admin/blog"
      forceFormMode
      breadcrumbs={[
        { label: 'Articles', href: '/admin/blog' },
        { label: String(doc.title || slug) },
      ]}
      initialValues={{
        title: doc.title,
        slug: slugCurrent,
        excerpt: doc.excerpt,
        category: doc.category,
        publishedAt: doc.publishedAt ? String(doc.publishedAt).slice(0, 16) : '',
        updatedAt: doc.updatedAt ? String(doc.updatedAt).slice(0, 16) : '',
        readingMinutes: doc.readingMinutes,
        coverImageUrl: doc.coverImageUrl,
        author: doc.author,
        sections: doc.sections || [],
        faqs: doc.faqs || [],
        relatedPosts: doc.relatedPosts || [],
        relatedServiceSlugs: Array.isArray(doc.relatedServiceSlugs)
          ? (doc.relatedServiceSlugs as string[]).join('\n')
          : '',
        cta: ctaValue,
        seo: doc.seo,
      }}
      sections={[
        { key: 'title', title: 'Title', kind: 'string', defaultOpen: true },
        { key: 'slug', title: 'URL slug', kind: 'slug' },
        { key: 'excerpt', title: 'Excerpt', kind: 'textarea' },
        { key: 'category', title: 'Category', kind: 'category' },
        { key: 'publishedAt', title: 'Published at', kind: 'datetime' },
        { key: 'updatedAt', title: 'Updated at', kind: 'datetime' },
        { key: 'readingMinutes', title: 'Reading minutes', kind: 'number' },
        { key: 'coverImageUrl', title: 'Cover image', kind: 'imageUrl' },
        {
          key: 'author',
          title: 'Author',
          kind: 'authorRef',
          authors: authorOptions,
        },
        {
          key: 'sections',
          title: 'Article sections',
          description:
            'Recommended order: prose intro → comparison table → inline CTA → guide → conclusion. Use markdown lightly: **bold**, `code`, [label](/services/slug).',
          kind: 'blogSections',
          defaultOpen: true,
        },
        { key: 'faqs', title: 'FAQs', kind: 'faqs' },
        {
          key: 'relatedPosts',
          title: 'Related posts',
          kind: 'relatedPosts',
          posts: postOptions,
        },
        {
          key: 'relatedServiceSlugs',
          title: 'Related service slugs',
          description: 'One service slug per line, e.g. ai-agent-development',
          kind: 'textarea',
        },
        { key: 'cta', title: 'Footer CTA', kind: 'cta', defaultOpen: false },
        { key: 'seo', title: 'SEO', kind: 'seo' },
      ]}
    />
  )
}
