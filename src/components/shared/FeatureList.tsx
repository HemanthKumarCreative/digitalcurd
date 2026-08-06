'use client'

import { EditableIcon } from '@/components/design-mode/EditableIcon'
import { EditableText } from '@/components/design-mode/EditableText'
import { useInViewMotion } from '@/hooks/useInViewMotion'
import { resolveServiceIcon } from '@/lib/serviceIcons'
import type { FeatureItem } from '@/types/content'

type FeatureListProps = {
  title: string
  description?: string
  items: FeatureItem[]
  pathPrefix?: string
  titlePath?: string
  descriptionPath?: string
}

export default function FeatureList({
  title,
  description,
  items,
  pathPrefix,
  titlePath,
  descriptionPath,
}: FeatureListProps) {
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
          {titlePath ? (
            <EditableText
              as="h2"
              path={titlePath}
              label="Features → Title"
              value={title}
              className="dc-feature-list__title"
            />
          ) : (
            <h2 className="dc-feature-list__title">{title}</h2>
          )}
          {description ? (
            descriptionPath ? (
              <EditableText
                as="p"
                path={descriptionPath}
                label="Features → Description"
                value={description}
                className="dc-feature-list__desc"
                multiline
              />
            ) : (
              <p className="dc-feature-list__desc">{description}</p>
            )
          ) : null}
        </header>

        <div className="dc-feature-list__grid" role="list">
          {items.map((item, index) => {
            const Icon = resolveServiceIcon(item.icon)
            const delay = (index % 4) + 1
            const base = pathPrefix ? `${pathPrefix}[${index}]` : null
            return (
              <article
                key={`${item.title}-${index}`}
                role="listitem"
                className={`dc-feature-list__item dc-fade-up ${inView ? 'is-in' : ''} dc-fade-up-delay-${delay}`}
              >
                <div className="dc-feature-list__icon" aria-hidden={!base}>
                  {base ? (
                    <EditableIcon
                      path={`${base}.icon`}
                      label={`Feature ${index + 1} → Icon`}
                      value={item.icon}
                      size={40}
                      strokeWidth={1.5}
                    />
                  ) : (
                    <Icon size={40} strokeWidth={1.5} />
                  )}
                </div>
                <div className="dc-feature-list__body">
                  {base ? (
                    <>
                      <EditableText
                        as="h3"
                        path={`${base}.title`}
                        label={`Feature ${index + 1} → Title`}
                        value={item.title}
                        className="dc-feature-list__item-title"
                      />
                      <EditableText
                        as="p"
                        path={`${base}.description`}
                        label={`Feature ${index + 1} → Description`}
                        value={item.description}
                        className="dc-feature-list__item-desc"
                        multiline
                      />
                    </>
                  ) : (
                    <>
                      <h3 className="dc-feature-list__item-title">{item.title}</h3>
                      <p className="dc-feature-list__item-desc">{item.description}</p>
                    </>
                  )}
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
