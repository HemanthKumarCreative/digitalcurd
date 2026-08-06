import type { Metadata } from 'next'
import Link from 'next/link'
import PageHero from '@/components/shared/PageHero'
import { buildPageMetadata } from '@/lib/seo'
import {
  getServiceCatalog,
  getServicesIndex,
} from '@/sanity/lib/fetch'
import { getServicesByCategory, serviceCategories } from '@/sanity/lib/catalog'
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
      <PageHero content={hero} compact />

      <section className="dc-services-index" aria-label="All services">
        <div className="dc-services-index__inner">
          {serviceCategories.map((category) => {
            const items = getServicesByCategory(catalog, category)
            return (
              <div key={category} className="dc-services-index__group">
                <h2>{category}</h2>
                <ul className="dc-services-index__links">
                  {items.map((service) => (
                    <li key={service.slug}>
                      <Link href={`/services/${service.slug}`} aria-label={service.title}>
                        {service.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )
          })}
          <p style={{ color: '#64748b', fontSize: 14 }}>
            {catalog.length} services available
          </p>
        </div>
      </section>
    </>
  )
}
