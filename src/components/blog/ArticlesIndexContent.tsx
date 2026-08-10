import Image from 'next/image'
import Link from 'next/link'
import ContentSection from '@/components/shared/ContentSection'
import { resolveImageUrl } from '@/sanity/lib/image'

export type ArticlesIndexPost = {
  slug: string
  title: string
  excerpt: string
  category: string
  publishedAt: string
  readingMinutes?: number
  coverImage?: unknown
  coverImageUrl?: string
  author?: { name?: string }
}

type ArticlesIndexContentProps = {
  posts: ArticlesIndexPost[]
}

export default function ArticlesIndexContent({
  posts,
}: ArticlesIndexContentProps) {
  return (
    <ContentSection
      eyebrow="Latest"
      title="Articles"
      description="Practical perspectives from the Digital Curd team."
      tone="light"
    >
      <div className="dc-blog-grid" role="list">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/articles/${post.slug}`}
            className="dc-blog-card"
            role="listitem"
            aria-label={post.title}
          >
            <Image
              src={
                resolveImageUrl(post.coverImage, post.coverImageUrl) ||
                post.coverImageUrl ||
                ''
              }
              alt={post.title}
              width={800}
              height={500}
              className="dc-blog-card__img"
            />
            <div className="dc-blog-card__body">
              <span className="dc-blog-card__meta">
                {[
                  post.category,
                  post.publishedAt?.slice?.(0, 10) || post.publishedAt,
                  post.readingMinutes ? `${post.readingMinutes} min` : '',
                  post.author?.name,
                ]
                  .filter(Boolean)
                  .join(' · ')}
              </span>
              <h3 className="dc-blog-card__title">{post.title}</h3>
              <p className="dc-blog-card__excerpt">{post.excerpt}</p>
            </div>
          </Link>
        ))}
      </div>
    </ContentSection>
  )
}
