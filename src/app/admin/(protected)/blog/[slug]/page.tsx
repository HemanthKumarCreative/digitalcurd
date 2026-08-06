import { notFound } from 'next/navigation'
import { StructuredDocumentEditor } from '@/components/admin/StructuredDocumentEditor'
import { getDocument, listDocumentsPreferDraft, resolveIdBySlug } from '@/lib/admin/data'
import {
  getPostEditorSections,
  mapPostToInitialValues,
} from '@/lib/admin/postEditor'
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

  return (
    <StructuredDocumentEditor
      documentId={documentId}
      documentType="post"
      title={String(doc.title || slug)}
      description="Edit this article for the public blog."
      previewPath={`/blog/${slugCurrent}`}
      allowDelete
      listHref="/admin/blog"
      breadcrumbs={[
        { label: 'Articles', href: '/admin/blog' },
        { label: String(doc.title || slug) },
      ]}
      initialValues={mapPostToInitialValues(doc, slug)}
      sections={getPostEditorSections({
        authors: authorOptions,
        posts: postOptions,
      })}
    />
  )
}
