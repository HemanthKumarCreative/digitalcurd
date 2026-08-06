import { listDocumentsPreferDraft } from '@/lib/admin/data'
import { ContentListSearch } from '@/components/admin/ContentListSearch'
import { CreatePostButton } from '@/components/admin/CreatePostButton'
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
    <div className="space-y-4">
      <PageHeader
        title="Articles"
        description={`${posts.length} article${posts.length === 1 ? '' : 's'} · Open one to edit in Design or Form mode`}
        breadcrumbs={[{ label: 'Content' }, { label: 'Articles' }]}
        actions={<CreatePostButton />}
      />
      <ContentListSearch
        emptyTitle="No articles yet"
        emptyDescription="Create your first article. You’ll get a draft with starter sections you can replace."
        placeholder="Search articles…"
        items={posts.map((post) => ({
          id: post._id,
          href: `/admin/blog/${post.slug || post._id}`,
          title: post.title || 'Untitled article',
          subtitle: `/blog/${post.slug}`,
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
