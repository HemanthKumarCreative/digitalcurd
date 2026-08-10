import Link from 'next/link'
import { getServicesByCategory, serviceCategories } from '@/sanity/lib/catalog'
import type { ServiceMeta } from '@/types/content'

type ServicesIndexContentProps = {
  catalog: ServiceMeta[]
}

export default function ServicesIndexContent({
  catalog,
}: ServicesIndexContentProps) {
  return (
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
  )
}
