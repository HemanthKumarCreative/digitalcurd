'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { ArrowRight, Phone } from 'lucide-react'
import type { PageHeroContent } from '@/types/content'

type PageHeroProps = {
  content: PageHeroContent
  compact?: boolean
}

export default function PageHero({ content, compact = false }: PageHeroProps) {
  const [entered, setEntered] = useState(false)

  useEffect(() => {
    const frame = requestAnimationFrame(() => setEntered(true))
    return () => cancelAnimationFrame(frame)
  }, [])

  const hasActions = Boolean(content.cta || content.secondaryCta || content.phone)

  return (
    <section
      className={`dc-page-hero ${compact ? 'dc-page-hero--compact' : ''}`}
      aria-label={content.title}
    >
      <div
        className="dc-page-hero__bg"
        style={{ backgroundImage: `url('${content.backgroundUrl}')` }}
        role="img"
        aria-label=""
      />
      <div className="dc-page-hero__overlay" aria-hidden="true" />

      <div className="dc-page-hero__inner">
        {content.eyebrow ? (
          <p className={`dc-page-hero__eyebrow dc-fade-up ${entered ? 'is-in' : ''}`}>
            {content.eyebrow}
          </p>
        ) : null}
        <h1 className={`dc-page-hero__title dc-fade-up ${entered ? 'is-in' : ''}`}>
          {content.title}
        </h1>
        {content.subtitle ? (
          <p className={`dc-page-hero__subtitle dc-fade-up dc-fade-up-delay-1 ${entered ? 'is-in' : ''}`}>
            {content.subtitle}
          </p>
        ) : null}
        {content.description ? (
          <p className={`dc-page-hero__desc dc-fade-up dc-fade-up-delay-2 ${entered ? 'is-in' : ''}`}>
            {content.description}
          </p>
        ) : null}
        {hasActions ? (
          <div className={`dc-page-hero__actions dc-fade-up dc-fade-up-delay-3 ${entered ? 'is-in' : ''}`}>
            {content.cta ? (
              <Link
                href={content.cta.href}
                className="dc-btn dc-btn--primary"
                aria-label={content.cta.label}
              >
                <span>{content.cta.label}</span>
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
                <span>{content.secondaryCta.label}</span>
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
                <span>{content.phone.label}</span>
              </a>
            ) : null}
          </div>
        ) : null}
      </div>
    </section>
  )
}
