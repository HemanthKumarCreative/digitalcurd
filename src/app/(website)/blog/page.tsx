import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import PageHero from '@/components/shared/PageHero'
import ContentSection from '@/components/shared/ContentSection'
import { buildPageMetadata } from '@/lib/seo'
import { getBlogIndex } from '@/sanity/lib/fetch'
import { resolveImageUrl } from '@/sanity/lib/image'
import { toPageHero } from '@/sanity/lib/hero'

export async function generateMetadata(): Promise<Metadata> {
  const { index } = await getBlogIndex()
  return buildPageMetadata({
    path: '/blog',
    title: index.seo?.title || 'Blog',
    description:
      index.seo?.description ||
      index.hero?.description ||
      'Insights on AI, growth marketing, ecommerce, and digital engineering from Digital Curd.',
    ogImage: index.hero?.backgroundUrl,
  })
}

export default async function BlogIndexPage() {
  const { index, posts } = await getBlogIndex()
  const hero = toPageHero(index.hero)

  return (
    <>
      <PageHero content={hero} compact documentId="blogIndex" documentType="blogIndex" />

      <ContentSection
        eyebrow="Latest"
        title="Articles"
        description="Practical perspectives from the Digital Curd team."
        tone="light"
      >
        <div className="dc-blog-grid" role="list">
          {posts.map(
            (post: {
              slug: string
              title: string
              excerpt: string
              category: string
              publishedAt: string
              coverImage?: unknown
              coverImageUrl?: string
            }) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
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
                  alt=""
                  width={800}
                  height={500}
                  className="dc-blog-card__img"
                />
                <div className="dc-blog-card__body">
                  <span className="dc-blog-card__meta">
                    {post.category} ·{' '}
                    {post.publishedAt?.slice?.(0, 10) || post.publishedAt}
                  </span>
                  <h3 className="dc-blog-card__title">{post.title}</h3>
                  <p className="dc-blog-card__excerpt">{post.excerpt}</p>
                </div>
              </Link>
            )
          )}
        </div>
      </ContentSection>
    </>
  )
}
