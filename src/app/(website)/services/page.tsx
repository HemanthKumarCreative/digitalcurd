import type { Metadata } from 'next'
import PageHero from '@/components/shared/PageHero'
import ServicesIndexContent from '@/components/services/ServicesIndexContent'
import { buildPageMetadata } from '@/lib/seo'
import {
  getServiceCatalog,
  getServicesIndex,
} from '@/sanity/lib/fetch'
import { toPageHero } from '@/sanity/lib/hero'

export async function generateMetadata(): Promise<Metadata> {
  const index = await getServicesIndex()
  return buildPageMetadata({
    path: '/services',
    title: index.seo?.title || 'Services',
    description:
      index.seo?.description ||
      index.hero?.description ||
      'Explore Digital Curd services across AI & Automation, Growth Marketing, Ecommerce, Digital Engineering, and Creative Studio.',
    ogImage: index.hero?.backgroundUrl,
  })
}

export default async function ServicesIndexPage() {
  const [index, catalog] = await Promise.all([getServicesIndex(), getServiceCatalog()])
  const hero = toPageHero(index.hero)

  return (
    <>
      <PageHero content={hero} compact documentId="servicesIndex" documentType="servicesIndex" />
      <ServicesIndexContent catalog={catalog} />
    </>
  )
}
