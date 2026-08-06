'use client'

import React, { useEffect, useState } from 'react'
import { useInViewMotion } from '@/hooks/useInViewMotion'
import { EditableText } from '@/components/design-mode/EditableText'
import { useDesignMode } from '@/components/design-mode/DesignModeProvider'

const parseStat = (value: string) => {
  const match = value.match(/^(\d+)(.*)$/)
  if (!match) return { target: 0, suffix: value }
  return { target: Number(match[1]), suffix: match[2] || '' }
}

const StatNumber = ({
  value,
  animate,
}: {
  value: string
  animate: boolean
}) => {
  const { target, suffix } = parseStat(value)
  const [display, setDisplay] = useState(animate ? 0 : target)

  useEffect(() => {
    if (!animate) {
      setDisplay(target)
      return
    }

    let frame = 0
    const duration = 1100
    const start = performance.now()

    const tick = (now: number) => {
      const progress = Math.min(1, (now - start) / duration)
      const eased = 1 - Math.pow(1 - progress, 3)
      setDisplay(Math.round(target * eased))
      if (progress < 1) frame = requestAnimationFrame(tick)
    }

    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [animate, target])

  return (
    <h3>
      {display}
      {suffix}
    </h3>
  )
}

export default function StatsDeliverySection({
  data: statsDeliverySection,
}: {
  data: {
    subtitle: string
    title: string
    paragraphs: string[]
    stats: { number: string; label: string }[]
  }
}) {
  const { ref, inView, reducedMotion } = useInViewMotion<HTMLElement>()
  const { enabled: designOn } = useDesignMode()

  return (
    <section
      ref={ref}
      className={`delivery-section padding-t-120 padding-b-120 dc-fade-up ${inView ? 'is-in' : ''}`}
    >
      <div className="container">
        <div className="inner-part">
          <div className="delivery-section__left">
            <span>
              <EditableText
                as="span"
                path="statsDeliverySection.subtitle"
                label="Stats → Subtitle"
                value={statsDeliverySection.subtitle}
              />
            </span>
            <h2>
              <EditableText
                as="span"
                path="statsDeliverySection.title"
                label="Stats → Title"
                value={statsDeliverySection.title}
              />
              <br />
            </h2>
            {statsDeliverySection.paragraphs.map((p, index) => (
              <EditableText
                key={index}
                as="p"
                path={`statsDeliverySection.paragraphs[${index}]`}
                label={`Stats → Paragraph ${index + 1}`}
                value={p}
                multiline
              />
            ))}
          </div>

          <div className="delivery-section__right">
            {statsDeliverySection.stats.map((stat, index) => (
              <div key={index} className="stat-card">
                <div className="stat-card__number">
                  {designOn ? (
                    <EditableText
                      as="h3"
                      path={`statsDeliverySection.stats[${index}].number`}
                      label={`Stat ${index + 1} → Number`}
                      value={stat.number}
                    />
                  ) : (
                    <StatNumber value={stat.number} animate={inView && !reducedMotion} />
                  )}
                </div>
                <div className="stat-card__label">
                  <EditableText
                    as="p"
                    path={`statsDeliverySection.stats[${index}].label`}
                    label={`Stat ${index + 1} → Label`}
                    value={stat.label}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
