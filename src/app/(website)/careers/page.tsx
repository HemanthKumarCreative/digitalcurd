import type { Metadata } from 'next'
import CareersPageContent from '@/components/careers/CareersPageContent'
import { buildPageMetadata } from '@/lib/seo'
import { getCareersPage } from '@/sanity/lib/fetch'
import { toPageHero } from '@/sanity/lib/hero'

export async function generateMetadata(): Promise<Metadata> {
  const { page } = await getCareersPage()
  return buildPageMetadata({
    path: '/careers',
    title: page.seo?.title || 'Careers',
    description:
      page.seo?.description ||
      page.hero?.description ||
      'Join Digital Curd to build connected AI, marketing, and engineering growth systems.',
    ogImage: page.hero?.backgroundUrl,
  })
}

export default async function CareersPage() {
  const { page, jobs } = await getCareersPage()
  const hero = toPageHero(page.hero)

  return (
    <CareersPageContent
      hero={hero}
      culture={page.culture}
      benefits={page.benefits}
      cta={page.cta}
      jobs={jobs}
    />
  )
}
