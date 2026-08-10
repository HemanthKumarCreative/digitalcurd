import type { Metadata } from 'next'
import PageHero from '@/components/shared/PageHero'
import ArticlesIndexContent from '@/components/blog/ArticlesIndexContent'
import { buildPageMetadata } from '@/lib/seo'
import { getBlogIndex } from '@/sanity/lib/fetch'
import { toPageHero } from '@/sanity/lib/hero'

export async function generateMetadata(): Promise<Metadata> {
  const { index } = await getBlogIndex()
  return buildPageMetadata({
    path: '/articles',
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
      <ArticlesIndexContent posts={posts} />
    </>
  )
}
