import { listDocumentsPreferDraft } from '@/lib/admin/data'
import { ContentListSearch } from '@/components/admin/ContentListSearch'
import { CreateDocumentButton } from '@/components/admin/CreateDocumentButton'
import { PageHeader } from '@/components/ui/page-header'

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
    <div className="space-y-6">
      <PageHeader
        title="Articles"
        description={`${posts.length} posts`}
        breadcrumbs={[{ label: 'Content' }, { label: 'Articles' }]}
        actions={<CreateDocumentButton kind="post" />}
      />
      <ContentListSearch
        emptyTitle="No posts yet"
        emptyDescription="Create your first post to start writing."
        placeholder="Search posts…"
        items={posts.map((post) => ({
          id: post._id,
          href: `/admin/blog/${post.slug || post._id}`,
          title: post.title || 'Untitled',
          subtitle: `/${post.slug}`,
          badges: [
            ...(post.isDraft
              ? [{ label: 'Draft', tone: 'warning' as const }]
              : [{ label: 'Published', tone: 'success' as const }]),
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
    </div>
  )
}
