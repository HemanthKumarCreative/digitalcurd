'use client'

import { useInViewMotion } from '@/hooks/useInViewMotion'
import { resolveServiceIcon } from '@/lib/serviceIcons'
import type { FeatureItem } from '@/types/content'

type FeatureListProps = {
  title: string
  description?: string
  items: FeatureItem[]
}

export default function FeatureList({ title, description, items }: FeatureListProps) {
  const { ref, inView } = useInViewMotion<HTMLElement>()

  if (!items.length) return null

  return (
    <section
      ref={ref}
      className={`dc-feature-list dc-fade-up ${inView ? 'is-in' : ''}`}
      aria-label={title}
    >
      <div className="dc-feature-list__inner">
        <header className="dc-feature-list__header">
          <h2 className="dc-feature-list__title">{title}</h2>
          {description ? (
            <p className="dc-feature-list__desc">{description}</p>
          ) : null}
        </header>

        <div className="dc-feature-list__grid" role="list">
          {items.map((item, index) => {
            const Icon = resolveServiceIcon(item.icon)
            const delay = (index % 4) + 1
            return (
              <article
                key={item.title}
                role="listitem"
                className={`dc-feature-list__item dc-fade-up ${inView ? 'is-in' : ''} dc-fade-up-delay-${delay}`}
              >
                <div className="dc-feature-list__icon" aria-hidden="true">
                  <Icon size={40} strokeWidth={1.5} />
                </div>
                <div className="dc-feature-list__body">
                  <h3 className="dc-feature-list__item-title">{item.title}</h3>
                  <p className="dc-feature-list__item-desc">{item.description}</p>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
