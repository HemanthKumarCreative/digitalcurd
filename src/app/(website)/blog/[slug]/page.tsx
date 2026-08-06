import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import BlogPostContent from '@/components/blog/BlogPostContent'
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
  const documentId = (post as { _id?: string })._id || `post-${slug}`

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
      <BlogPostContent
        documentId={documentId}
        title={post.title}
        category={post.category}
        publishedAt={post.publishedAt}
        coverImageUrl={cover}
        bodyParagraphs={paragraphs}
      />
    </>
  )
}
