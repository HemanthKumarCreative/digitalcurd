'use client'

import React, { useEffect, useState } from 'react'
import homeContent from '@/content/home.json'
import { useInViewMotion } from '@/hooks/useInViewMotion'

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

export default function StatsDeliverySection() {
  const { statsDeliverySection } = homeContent
  const { ref, inView, reducedMotion } = useInViewMotion<HTMLElement>()

  return (
    <section
      ref={ref}
      className={`delivery-section padding-t-120 padding-b-120 dc-fade-up ${inView ? 'is-in' : ''}`}
    >
      <div className="container">
        <div className="inner-part">
          <div className="delivery-section__left">
            <span>{statsDeliverySection.subtitle}</span>
            <h2>
              {statsDeliverySection.title}
              <br />
            </h2>
            {statsDeliverySection.paragraphs.map((p, index) => (
              <p key={index}>{p}</p>
            ))}
          </div>

          <div className="delivery-section__right">
            {statsDeliverySection.stats.map((stat, index) => (
              <div key={index} className="stat-card">
                <div className="stat-card__number">
                  <StatNumber value={stat.number} animate={inView && !reducedMotion} />
                </div>
                <div className="stat-card__label">
                  <p>{stat.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
