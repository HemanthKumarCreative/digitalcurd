'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { EditableText } from '@/components/design-mode/EditableText'
import { useInViewMotion } from '@/hooks/useInViewMotion'
import type { CtaLink } from '@/types/content'

type CtaBandProps = {
  title: string
  description?: string
  cta: CtaLink
  pathPrefix?: string
}

export default function CtaBand({ title, description, cta, pathPrefix }: CtaBandProps) {
  const { ref, inView } = useInViewMotion<HTMLElement>()

  return (
    <section
      ref={ref}
      className={`dc-cta-band dc-fade-up ${inView ? 'is-in' : ''}`}
      aria-label={title}
    >
      <div className="dc-cta-band__inner">
        <div>
          {pathPrefix ? (
            <>
              <EditableText
                as="h2"
                path={`${pathPrefix}.title`}
                label="CTA → Title"
                value={title}
                className="dc-cta-band__title"
              />
              {description ? (
                <EditableText
                  as="p"
                  path={`${pathPrefix}.description`}
                  label="CTA → Description"
                  value={description}
                  className="dc-cta-band__desc"
                  multiline
                />
              ) : null}
            </>
          ) : (
            <>
              <h2 className="dc-cta-band__title">{title}</h2>
              {description ? <p className="dc-cta-band__desc">{description}</p> : null}
            </>
          )}
        </div>
        <Link
          href={cta.href}
          className="dc-btn dc-btn--primary"
          aria-label={cta.label}
        >
          {pathPrefix ? (
            <EditableText
              as="span"
              path={`${pathPrefix}.cta.label`}
              label="CTA → Button"
              value={cta.label}
            />
          ) : (
            <span>{cta.label}</span>
          )}
          <span className="dc-btn__icon" aria-hidden="true">
            <ArrowRight size={18} />
          </span>
        </Link>
      </div>
    </section>
  )
}
