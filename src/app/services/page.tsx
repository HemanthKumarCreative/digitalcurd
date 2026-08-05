import type { Metadata } from 'next'
import Link from 'next/link'
import PageHero from '@/components/shared/PageHero'
import {
  serviceCatalog,
  serviceCategories,
  getServicesByCategory,
} from '@/content/services'

export const metadata: Metadata = {
  title: 'Services | Digital Curd',
  description:
    'Explore Digital Curd services across AI & Automation, Growth Marketing, Ecommerce, Digital Engineering, and Creative Studio.',
}

export default function ServicesIndexPage() {
  return (
    <>
      <PageHero
        compact
        content={{
          eyebrow: 'Services',
          title: 'One connected growth system',
          subtitle: 'AI, marketing, commerce, engineering, and creative—built to work together.',
          description:
            'Browse every Digital Curd capability. Each service page shares the same clear layout so you can compare options and start a conversation quickly.',
          backgroundUrl:
            'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1920&q=80',
          cta: { label: 'Book a consultation', href: '/contact' },
        }}
      />

      <section className="dc-services-index" aria-label="All services">
        <div className="dc-services-index__inner">
          {serviceCategories.map((category) => {
            const items = getServicesByCategory(category)
            return (
              <div key={category} className="dc-services-index__group">
                <h2>{category}</h2>
                <ul className="dc-services-index__links">
                  {items.map((service) => (
                    <li key={service.slug}>
                      <Link
                        href={`/services/${service.slug}`}
                        aria-label={service.title}
                      >
                        {service.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )
          })}
          <p style={{ color: '#64748b', fontSize: 14 }}>
            {serviceCatalog.length} services available
          </p>
        </div>
      </section>
    </>
  )
}
