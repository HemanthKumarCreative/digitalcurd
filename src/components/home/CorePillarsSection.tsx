'use client'

import Link from 'next/link'
import { Bot, Globe, LineChart, ArrowRight } from 'lucide-react'
import { useInViewMotion } from '@/hooks/useInViewMotion'

const pillarIcons = [Bot, Globe, LineChart]

type PillarsData = {
  headerTitle: string
  headerDesc: string
  pillars: {
    badge: string
    title: string
    link: string
    desc: string
    footerText: string
    highlighted?: boolean
  }[]
}

export default function CorePillarsSection({ data: corePillarsSection }: { data: PillarsData }) {
  const { ref, inView } = useInViewMotion<HTMLElement>()

  return (
    <section
      ref={ref}
      className={`delivery-models padding-t-120 padding-b-120 dc-fade-up ${inView ? 'is-in' : ''}`}
      aria-label="Core pillars"
    >
      <div className="container">
        <div className="section-header">
          <h2>{corePillarsSection.headerTitle}</h2>
          <p>{corePillarsSection.headerDesc}</p>
        </div>

        <div className="models-grid">
          {corePillarsSection.pillars.map((pillar, index) => {
            const Icon = pillarIcons[index] || Bot
            return (
              <article
                key={index}
                className={`model-card ${pillar.highlighted ? 'highlighted' : ''} dc-fade-up ${inView ? 'is-in' : ''} dc-fade-up-delay-${index + 1}`}
              >
                <div className="card-top">
                  <div className="icon-box" aria-hidden="true">
                    <Icon size={22} strokeWidth={1.75} />
                  </div>
                  <span className="badge">{pillar.badge}</span>
                </div>
                <h3>
                  <Link
                    href={pillar.link}
                    className="pillar-title"
                    aria-label={`Explore ${pillar.title}`}
                  >
                    {pillar.title}
                  </Link>
                </h3>
                <p>{pillar.desc}</p>
                <div className="card-footer">
                  <p>{pillar.footerText}</p>
                  <Link
                    href={pillar.link}
                    className="pillar-cta"
                    aria-label={`View ${pillar.title} services`}
                  >
                    Explore
                    <ArrowRight size={16} aria-hidden="true" />
                  </Link>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
