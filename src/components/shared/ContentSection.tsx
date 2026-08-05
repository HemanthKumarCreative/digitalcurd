'use client'

import { useInViewMotion } from '@/hooks/useInViewMotion'

type ContentSectionProps = {
  eyebrow?: string
  title: string
  description?: string
  paragraphs?: string[]
  tone?: 'light' | 'navy' | 'surface'
  children?: React.ReactNode
  id?: string
}

export default function ContentSection({
  eyebrow,
  title,
  description,
  paragraphs,
  tone = 'light',
  children,
  id,
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
          {eyebrow ? <p className="dc-content-section__eyebrow">{eyebrow}</p> : null}
          <h2 className="dc-content-section__title">{title}</h2>
          {description ? <p className="dc-content-section__desc">{description}</p> : null}
          {paragraphs?.map((p) => (
            <p key={p.slice(0, 24)} className="dc-content-section__para">
              {p}
            </p>
          ))}
        </header>
        {children}
      </div>
    </section>
  )
}
