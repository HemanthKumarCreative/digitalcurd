import { notFound } from 'next/navigation'
import { StructuredDocumentEditor } from '@/components/admin/StructuredDocumentEditor'
import { getDocument, resolveIdBySlug } from '@/lib/admin/data'
import { requireAdminSession } from '@/lib/auth/session'

type PageProps = {
  params: Promise<{ slug: string }>
}

export default async function AdminAuthorEditorPage({ params }: PageProps) {
  await requireAdminSession()
  const { slug } = await params
  const documentId = await resolveIdBySlug('author', slug)
  if (!documentId) notFound()

  const doc = (await getDocument<Record<string, unknown>>(documentId)) || {}
  const slugCurrent =
    typeof doc.slug === 'object' && doc.slug && 'current' in (doc.slug as object)
      ? String((doc.slug as { current?: string }).current || slug)
      : slug

  return (
    <StructuredDocumentEditor
      documentId={documentId}
      documentType="author"
      title={String(doc.name || slug)}
      description="Edit author profile used on blog articles."
      allowDelete
      listHref="/admin/authors"
      forceFormMode
      breadcrumbs={[
        { label: 'Authors', href: '/admin/authors' },
        { label: String(doc.name || slug) },
      ]}
      initialValues={{
        name: doc.name,
        slug: slugCurrent,
        role: doc.role,
        avatarUrl: doc.avatarUrl,
        bio: doc.bio,
        linkedinUrl: doc.linkedinUrl,
      }}
      sections={[
        { key: 'name', title: 'Name', kind: 'string', defaultOpen: true },
        { key: 'slug', title: 'URL slug', kind: 'slug' },
        { key: 'role', title: 'Role', kind: 'string' },
        { key: 'avatarUrl', title: 'Avatar', kind: 'imageUrl' },
        { key: 'bio', title: 'Bio', kind: 'textarea' },
        { key: 'linkedinUrl', title: 'LinkedIn URL', kind: 'string' },
      ]}
    />
  )
}
