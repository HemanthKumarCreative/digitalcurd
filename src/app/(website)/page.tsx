import type { Metadata } from 'next'
import HomeContent from '@/components/home/HomeContent'
import JsonLd from '@/components/seo/JsonLd'
import { buildPageMetadata, faqJsonLd } from '@/lib/seo'
import { getHomePage } from '@/sanity/lib/fetch'
import type homeJson from '@/content/home.json'

export async function generateMetadata(): Promise<Metadata> {
  const content = await getHomePage()
  const seo = content.seo

  return buildPageMetadata({
    path: '/',
    title:
      seo?.title ||
      'AI-Powered Growth Partner for Marketing, Technology & Analytics',
    description:
      seo?.description ||
      content.heroSection?.description ||
      'We help startups, ecommerce brands, and enterprises grow with connected AI, marketing, and technology systems.',
    ogImage: content.heroSection?.backgroundUrl,
  })
}

export default async function Home() {
  const content = await getHomePage()
  const faqs = content.faqAccordion?.faqs || []

  return (
    <div className="home-page-wrapper">
      {faqs.length > 0 ? <JsonLd data={faqJsonLd(faqs)} /> : null}
      <HomeContent content={content as typeof homeJson} />
    </div>
  )
}
