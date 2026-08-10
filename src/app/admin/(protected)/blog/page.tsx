import { listDocumentsPreferDraft } from '@/lib/admin/data'
import { AdminResourceList } from '@/components/admin/AdminResourceList'
import { CreateDocumentButton } from '@/components/admin/CreateDocumentButton'

type PostRow = {
  _id: string
  title?: string
  slug?: string
  category?: string
  publishedAt?: string
  isDraft?: boolean
}

export default async function AdminBlogPage() {
  const posts = await listDocumentsPreferDraft<PostRow>(
    'post',
    `_id, title, "slug": slug.current, category, publishedAt`,
    'publishedAt desc'
  )

  return (
    <AdminResourceList
      title="Articles"
      description={`${posts.length} article${posts.length === 1 ? '' : 's'} · Open one to edit in Design or Form mode`}
      breadcrumbs={[{ label: 'Content' }, { label: 'Articles' }]}
      actions={<CreateDocumentButton kind="post" />}
      emptyTitle="No articles yet"
      emptyDescription="Create your first article. You’ll get a draft with starter sections you can replace."
      placeholder="Search articles…"
      items={posts.map((post) => ({
        id: post._id,
        href: `/admin/blog/${post.slug || post._id}`,
        title: post.title || 'Untitled article',
        subtitle: `/blog/${post.slug}`,
        status: post.isDraft ? ('draft' as const) : ('published' as const),
        deletableType: 'post',
        badges: [
          ...(post.category ? [{ label: post.category }] : []),
          ...(post.publishedAt
            ? [
                {
                  label: new Date(post.publishedAt).toLocaleDateString(),
                  tone: 'info' as const,
                },
              ]
            : []),
        ],
        searchText: `${post.category || ''} ${post.slug || ''}`,
      }))}
    />
  )
}
