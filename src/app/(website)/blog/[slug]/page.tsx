import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import BlogPostContent from '@/components/blog/BlogPostContent'
import JsonLd from '@/components/seo/JsonLd'
import {
  absoluteUrl,
  articleJsonLd,
  breadcrumbJsonLd,
  buildPageMetadata,
  faqJsonLd,
} from '@/lib/seo'
import { getPostBySlug, getPostSlugs, getServiceCatalog } from '@/sanity/lib/fetch'
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
  const [post, catalog] = await Promise.all([
    getPostBySlug(slug),
    getServiceCatalog(),
  ])
  if (!post) notFound()

  const cover =
    resolveImageUrl(post.coverImage, post.coverImageUrl) || post.coverImageUrl || ''
  const documentId = (post as { _id?: string })._id || `post-${slug}`
  const faqs = post.faqs || []
  const sections = post.sections || []
  const relatedPosts = post.relatedPosts || []
  const relatedServiceSlugs =
    (post as { relatedServiceSlugs?: string[] }).relatedServiceSlugs || []
  const relatedServices = relatedServiceSlugs
    .map((serviceSlug) => catalog.find((service) => service.slug === serviceSlug))
    .filter(Boolean) as typeof catalog
  const shareUrl = absoluteUrl(`/blog/${slug}`)

  const jsonLd: Record<string, unknown>[] = [
    breadcrumbJsonLd([
      { name: 'Home', path: '/' },
      { name: 'Blog', path: '/blog' },
      { name: post.category, path: '/blog' },
      { name: post.title, path: `/blog/${slug}` },
    ]),
    articleJsonLd({
      title: post.title,
      excerpt: post.excerpt,
      slug,
      publishedAt: post.publishedAt,
      updatedAt: post.updatedAt,
      coverImageUrl: cover,
      category: post.category,
      author: post.author
        ? {
            name: post.author.name,
            url: post.author.linkedinUrl,
          }
        : undefined,
    }),
  ]

  if (faqs.length) {
    jsonLd.push(faqJsonLd(faqs))
  }

  return (
    <>
      <JsonLd data={jsonLd} />
      <BlogPostContent
        documentId={documentId}
        slug={slug}
        title={post.title}
        excerpt={post.excerpt}
        category={post.category}
        publishedAt={post.publishedAt}
        updatedAt={post.updatedAt}
        readingMinutes={post.readingMinutes}
        coverImageUrl={cover}
        shareUrl={shareUrl}
        author={post.author}
        sections={sections}
        faqs={faqs}
        relatedPosts={relatedPosts}
        relatedServices={relatedServices}
        cta={post.cta}
      />
    </>
  )
}
