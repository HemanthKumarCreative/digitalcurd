'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { ArrowRight, Phone } from 'lucide-react'
import { EditableImage } from '@/components/design-mode/EditableImage'
import { EditableText } from '@/components/design-mode/EditableText'
import { DesignModeDocument } from '@/components/design-mode/DesignModeProvider'
import type { PageHeroContent } from '@/types/content'

type PageHeroProps = {
  content: PageHeroContent
  compact?: boolean
  documentId?: string
  documentType?: string
  pathPrefix?: string
  /** Sanity path for background image when it differs from `${pathPrefix}.backgroundUrl` */
  backgroundPath?: string
}

export default function PageHero({
  content,
  compact = false,
  documentId,
  documentType,
  pathPrefix = 'hero',
  backgroundPath,
}: PageHeroProps) {
  const [entered, setEntered] = useState(false)

  useEffect(() => {
    const frame = requestAnimationFrame(() => setEntered(true))
    return () => cancelAnimationFrame(frame)
  }, [])

  const hasActions = Boolean(content.cta || content.secondaryCta || content.phone)
  const pathFor = (key: string) => (pathPrefix ? `${pathPrefix}.${key}` : key)
  const bgPath = backgroundPath || pathFor('backgroundUrl')

  const inner = (
    <section
      id="dc-section-hero"
      className={`dc-page-hero ${compact ? 'dc-page-hero--compact' : ''}`}
      aria-label={content.title}
    >
      <EditableImage
        path={bgPath}
        label="Hero → Background"
        value={content.backgroundUrl}
        asBackground
        className="dc-page-hero__bg"
        alt=""
      />
      <div className="dc-page-hero__overlay dc-design-overlay-pass" aria-hidden="true" />

      <div className="dc-page-hero__inner dc-design-content-layer">
        {content.eyebrow ? (
          <EditableText
            as="p"
            path={pathFor('eyebrow')}
            label="Hero → Eyebrow"
            value={content.eyebrow}
            className={`dc-page-hero__eyebrow dc-fade-up ${entered ? 'is-in' : ''}`}
          />
        ) : null}
        <EditableText
          as="h1"
          path={pathFor('title')}
          label="Hero → Title"
          value={content.title}
          className={`dc-page-hero__title dc-fade-up ${entered ? 'is-in' : ''}`}
        />
        {content.subtitle ? (
          <EditableText
            as="p"
            path={pathFor('subtitle')}
            label="Hero → Subtitle"
            value={content.subtitle}
            className={`dc-page-hero__subtitle dc-fade-up dc-fade-up-delay-1 ${entered ? 'is-in' : ''}`}
          />
        ) : null}
        {content.description ? (
          <EditableText
            as="p"
            path={pathFor('description')}
            label="Hero → Description"
            value={content.description}
            multiline
            className={`dc-page-hero__desc dc-fade-up dc-fade-up-delay-2 ${entered ? 'is-in' : ''}`}
          />
        ) : null}
        {hasActions ? (
          <div className={`dc-page-hero__actions dc-fade-up dc-fade-up-delay-3 ${entered ? 'is-in' : ''}`}>
            {content.cta ? (
              <Link
                href={content.cta.href}
                className="dc-btn dc-btn--primary"
                aria-label={content.cta.label}
              >
                <EditableText
                  as="span"
                  path={pathFor('cta.label')}
                  label="Hero → CTA"
                  value={content.cta.label}
                />
                <span className="dc-btn__icon" aria-hidden="true">
                  <ArrowRight size={18} />
                </span>
              </Link>
            ) : null}
            {content.secondaryCta ? (
              <Link
                href={content.secondaryCta.href}
                className="dc-btn dc-btn--secondary"
                aria-label={content.secondaryCta.label}
              >
                <EditableText
                  as="span"
                  path={pathFor('secondaryCta.label')}
                  label="Hero → Secondary CTA"
                  value={content.secondaryCta.label}
                />
              </Link>
            ) : null}
            {content.phone ? (
              <a
                href={content.phone.href}
                className="dc-btn dc-btn--secondary dc-page-hero__phone"
                aria-label={`Call ${content.phone.label}`}
              >
                <span className="dc-btn__icon" aria-hidden="true">
                  <Phone size={16} strokeWidth={2.25} />
                </span>
                <EditableText
                  as="span"
                  path={pathFor('phone.label')}
                  label="Hero → Phone"
                  value={content.phone.label}
                />
              </a>
            ) : null}
          </div>
        ) : null}
      </div>
    </section>
  )

  if (documentId && documentType) {
    return (
      <DesignModeDocument documentId={documentId} documentType={documentType}>
        {inner}
      </DesignModeDocument>
    )
  }

  return inner
}
