import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import PageHero from '@/components/shared/PageHero'
import ContentSection from '@/components/shared/ContentSection'
import blog from '@/content/blog.json'

export const metadata: Metadata = {
  title: 'Blog | Digital Curd',
  description:
    'Insights on AI, growth marketing, ecommerce, and digital engineering from Digital Curd.',
}

export default function BlogIndexPage() {
  return (
    <>
      <PageHero content={blog.hero} compact />

      <ContentSection
        eyebrow="Latest"
        title="Sample articles"
        description="Placeholder posts you can replace with real editorial content later."
        tone="light"
      >
        <div className="dc-blog-grid" role="list">
          {blog.posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="dc-blog-card"
              role="listitem"
              aria-label={post.title}
            >
              <Image
                src={post.coverImage}
                alt=""
                width={800}
                height={500}
                className="dc-blog-card__img"
              />
              <div className="dc-blog-card__body">
                <span className="dc-blog-card__meta">
                  {post.category} · {post.date}
                </span>
                <h3 className="dc-blog-card__title">{post.title}</h3>
                <p className="dc-blog-card__excerpt">{post.excerpt}</p>
              </div>
            </Link>
          ))}
        </div>
      </ContentSection>
    </>
  )
}
