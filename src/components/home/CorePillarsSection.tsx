'use client'

import Link from 'next/link'
import { Bot, Globe, LineChart, ArrowRight } from 'lucide-react'
import { EditableText } from '@/components/design-mode/EditableText'
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
          <EditableText
            as="h2"
            path="corePillarsSection.headerTitle"
            label="Pillars → Title"
            value={corePillarsSection.headerTitle}
          />
          <EditableText
            as="p"
            path="corePillarsSection.headerDesc"
            label="Pillars → Description"
            value={corePillarsSection.headerDesc}
            multiline
          />
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
                  <EditableText
                    as="span"
                    path={`corePillarsSection.pillars[${index}].badge`}
                    label={`Pillar ${index + 1} → Badge`}
                    value={pillar.badge}
                    className="badge"
                  />
                </div>
                <h3>
                  <Link
                    href={pillar.link}
                    className="pillar-title"
                    aria-label={`Explore ${pillar.title}`}
                  >
                    <EditableText
                      as="span"
                      path={`corePillarsSection.pillars[${index}].title`}
                      label={`Pillar ${index + 1} → Title`}
                      value={pillar.title}
                    />
                  </Link>
                </h3>
                <EditableText
                  as="p"
                  path={`corePillarsSection.pillars[${index}].desc`}
                  label={`Pillar ${index + 1} → Description`}
                  value={pillar.desc}
                  multiline
                />
                <div className="card-footer">
                  <EditableText
                    as="p"
                    path={`corePillarsSection.pillars[${index}].footerText`}
                    label={`Pillar ${index + 1} → Footer`}
                    value={pillar.footerText}
                    multiline
                  />
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
