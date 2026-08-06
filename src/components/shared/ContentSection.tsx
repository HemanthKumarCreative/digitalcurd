'use client'

import { EditableText } from '@/components/design-mode/EditableText'
import { useInViewMotion } from '@/hooks/useInViewMotion'

type ContentSectionProps = {
  eyebrow?: string
  title: string
  description?: string
  paragraphs?: string[]
  tone?: 'light' | 'navy' | 'surface'
  children?: React.ReactNode
  id?: string
  pathPrefix?: string
}

export default function ContentSection({
  eyebrow,
  title,
  description,
  paragraphs,
  tone = 'light',
  children,
  id,
  pathPrefix,
}: ContentSectionProps) {
  const { ref, inView } = useInViewMotion<HTMLElement>()

  return (
    <section
      id={id}
      ref={ref}
      className={`dc-content-section dc-content-section--${tone} dc-fade-up ${inView ? 'is-in' : ''}`}
      aria-label={title}
    >
      <div className="dc-content-section__inner">
        <header className="dc-content-section__header">
          {eyebrow ? (
            pathPrefix ? (
              <EditableText
                as="p"
                path={`${pathPrefix}.eyebrow`}
                label="Section → Eyebrow"
                value={eyebrow}
                className="dc-content-section__eyebrow"
              />
            ) : (
              <p className="dc-content-section__eyebrow">{eyebrow}</p>
            )
          ) : null}
          {pathPrefix ? (
            <EditableText
              as="h2"
              path={`${pathPrefix}.title`}
              label="Section → Title"
              value={title}
              className="dc-content-section__title"
            />
          ) : (
            <h2 className="dc-content-section__title">{title}</h2>
          )}
          {description ? (
            pathPrefix ? (
              <EditableText
                as="p"
                path={`${pathPrefix}.description`}
                label="Section → Description"
                value={description}
                className="dc-content-section__desc"
                multiline
              />
            ) : (
              <p className="dc-content-section__desc">{description}</p>
            )
          ) : null}
          {paragraphs?.map((p, index) =>
            pathPrefix ? (
              <EditableText
                key={`${pathPrefix}-p-${index}`}
                as="p"
                path={`${pathPrefix}.paragraphs[${index}]`}
                label={`Section → Paragraph ${index + 1}`}
                value={p}
                className="dc-content-section__para"
                multiline
              />
            ) : (
              <p key={p.slice(0, 24)} className="dc-content-section__para">
                {p}
              </p>
            )
          )}
        </header>
        {children}
      </div>
    </section>
  )
}
