'use client'

import React from 'react'
import homeContent from '@/content/home.json'
import { Bot, Globe, LineChart } from 'lucide-react'
import { useInViewMotion } from '@/hooks/useInViewMotion'

const pillarIcons = [Bot, Globe, LineChart]

export default function CorePillarsSection() {
  const { corePillarsSection } = homeContent
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
                  <span className="pillar-title">{pillar.title}</span>
                </h3>
                <p>{pillar.desc}</p>
                <div className="card-footer">
                  <p>{pillar.footerText}</p>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
