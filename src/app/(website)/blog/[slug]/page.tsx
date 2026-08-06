import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import CtaBand from '@/components/shared/CtaBand'
import JsonLd from '@/components/seo/JsonLd'
import { articleJsonLd, breadcrumbJsonLd, buildPageMetadata } from '@/lib/seo'
import { getPostBySlug, getPostSlugs } from '@/sanity/lib/fetch'
import { resolveImageUrl } from '@/sanity/lib/image'

type PageProps = {
  params: Promise<{ slug: string }>
}

export const generateStaticParams = async () => {
  const slugs = await getPostSlugs()
  return slugs.map((slug) => ({ slug }))
}

export const generateMetadata = async ({ params }: PageProps): Promise<Metadata> => {
  const { slug } = await params
  const post = await getPostBySlug(slug)
  if (!post) {
    return buildPageMetadata({
      path: `/blog/${slug}`,
      title: 'Post Not Found',
      description: 'The requested blog post could not be found.',
      noIndex: true,
    })
  }

  const cover =
    resolveImageUrl(post.coverImage, post.coverImageUrl) || post.coverImageUrl || ''

  return buildPageMetadata({
    path: `/blog/${slug}`,
    title: post.seo?.title || post.title,
    description: post.seo?.description || post.excerpt,
    ogImage: cover,
    ogType: 'article',
    publishedTime: post.publishedAt,
  })
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params
  const post = await getPostBySlug(slug)
  if (!post) notFound()

  const cover =
    resolveImageUrl(post.coverImage, post.coverImageUrl) || post.coverImageUrl || ''
  const paragraphs: string[] = post.bodyParagraphs || []

  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: 'Home', path: '/' },
            { name: 'Blog', path: '/blog' },
            { name: post.title, path: `/blog/${slug}` },
          ]),
          articleJsonLd({
            title: post.title,
            excerpt: post.excerpt,
            slug,
            publishedAt: post.publishedAt,
            coverImageUrl: cover,
            category: post.category,
          }),
        ]}
      />
      <article className="dc-article" aria-label={post.title}>
        <div className="dc-article__inner">
          <p className="dc-article__meta">
            <Link href="/blog" style={{ color: 'inherit', textDecoration: 'none' }}>
              Blog
            </Link>
            {' · '}
            {post.category} · {post.publishedAt?.slice?.(0, 10) || post.publishedAt}
          </p>
          <h1 className="dc-article__title">{post.title}</h1>
          {cover ? (
            <Image
              src={cover}
              alt=""
              width={1200}
              height={675}
              className="dc-article__cover"
              priority
            />
          ) : null}
          <div className="dc-article__body">
            {paragraphs.map((paragraph: string) => (
              <p key={paragraph.slice(0, 40)}>{paragraph}</p>
            ))}
          </div>
        </div>
      </article>

      <CtaBand
        title="Want this applied to your business?"
        description="Book a free consultation and we will map a practical next step."
        cta={{ label: 'Schedule a Call', href: '/contact' }}
      />
    </>
  )
}
