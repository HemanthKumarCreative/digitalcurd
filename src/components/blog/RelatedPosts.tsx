import Image from 'next/image'
import Link from 'next/link'
import { formatDate } from '@/lib/blog/utils'
import type { BlogRelatedPost } from '@/types/blog'

type RelatedPostsProps = {
  posts: BlogRelatedPost[]
}

export const RelatedPosts = ({ posts }: RelatedPostsProps) => {
  if (!posts.length) return null

  return (
    <section className="dc-article__related" aria-label="Related articles">
      <div className="dc-article__related-inner">
        <h2 className="dc-article__related-title">Related articles</h2>
        <div className="dc-article__related-grid">
          {posts.map((post) => {
            const cover = post.coverImageUrl || post.coverImage || ''
            const date = formatDate(post.publishedAt || post.date, 'short')
            return (
              <Link
                key={post.slug}
                href={`/articles/${post.slug}`}
                className="dc-article__related-card"
              >
                {cover ? (
                  <Image
                    src={cover}
                    alt={post.title}
                    width={480}
                    height={270}
                    className="dc-article__related-img"
                  />
                ) : null}
                <div className="dc-article__related-body">
                  {post.category ? (
                    <p className="dc-article__related-meta">{post.category}</p>
                  ) : null}
                  <h3 className="dc-article__related-card-title">{post.title}</h3>
                  <p className="dc-article__related-meta">
                    {[date, post.readingMinutes ? `${post.readingMinutes} min read` : '']
                      .filter(Boolean)
                      .join(' · ')}
                  </p>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
