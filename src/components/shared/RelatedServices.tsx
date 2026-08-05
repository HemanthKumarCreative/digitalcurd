'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { useInViewMotion } from '@/hooks/useInViewMotion'
import type { ServiceMeta } from '@/types/content'

type RelatedServicesProps = {
  title?: string
  services: ServiceMeta[]
}

export default function RelatedServices({
  title = 'Related Services',
  services,
}: RelatedServicesProps) {
  const { ref, inView } = useInViewMotion<HTMLElement>()

  if (services.length === 0) return null

  return (
    <section
      ref={ref}
      className={`dc-related dc-fade-up ${inView ? 'is-in' : ''}`}
      aria-label={title}
    >
      <div className="dc-related__inner">
        <h2 className="dc-related__title">{title}</h2>
        <ul className="dc-related__list">
          {services.map((service) => (
            <li key={service.slug}>
              <Link
                href={`/services/${service.slug}`}
                className="dc-related__card"
                aria-label={`View ${service.title}`}
              >
                <span className="dc-related__category">{service.category}</span>
                <span className="dc-related__name">{service.title}</span>
                <span className="dc-related__desc">{service.shortDescription}</span>
                <span className="dc-related__arrow" aria-hidden="true">
                  <ArrowRight size={18} />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
