'use client'

import React, { useEffect, useState } from 'react'
import homeContent from '@/content/home.json'
import { useInViewMotion } from '@/hooks/useInViewMotion'

function ProgressBar({ isActive, duration }: { isActive: boolean; duration: number }) {
  const [width, setWidth] = useState('0%')
  const [transition, setTransition] = useState('none')

  useEffect(() => {
    let frame1: number
    let frame2: number

    if (isActive) {
      setWidth('0%')
      setTransition('none')

      frame1 = requestAnimationFrame(() => {
        frame2 = requestAnimationFrame(() => {
          setTransition(`width ${duration}ms linear`)
          setWidth('100%')
        })
      })
    } else {
      setWidth('0%')
      setTransition('none')
    }

    return () => {
      cancelAnimationFrame(frame1)
      cancelAnimationFrame(frame2)
    }
  }, [isActive, duration])

  return <div className="progress" style={{ width, transition }} />
}

export default function AiSection() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [tabHidden, setTabHidden] = useState(false)
  const duration = 4000
  const { aiSection } = homeContent
  const items = aiSection.items
  const imageUrl = aiSection.imageUrl
  const { ref, inView, reducedMotion } = useInViewMotion<HTMLElement>({ once: false })

  useEffect(() => {
    const handleVisibility = () => setTabHidden(document.hidden)
    document.addEventListener('visibilitychange', handleVisibility)
    return () => document.removeEventListener('visibilitychange', handleVisibility)
  }, [])

  const canAutoRotate = inView && !reducedMotion && !tabHidden

  useEffect(() => {
    if (!canAutoRotate) return
    const timer = setTimeout(() => {
      setActiveIndex((prev) => (prev + 1) % items.length)
    }, duration)
    return () => clearTimeout(timer)
  }, [activeIndex, canAutoRotate, items.length])

  return (
    <section
      ref={ref}
      className={`ai-production-loop dc-fade-up ${inView ? 'is-in' : ''}`}
      aria-label="Growth solutions"
    >
      <div className="ai-left">
        <img
          src={imageUrl}
          alt="Global digital technology network for marketing and AI solutions"
          loading="lazy"
          decoding="async"
        />
      </div>

      <div className="ai-right">
        <div className="container w-full">
          <div className="ai-content">
            <h2>{aiSection.title}</h2>
            <p>{aiSection.description}</p>
            <div className="ai-list">
              {items.map((item, index) => {
                const isActive = index === activeIndex
                return (
                  <div
                    key={index}
                    className={`ai-item ${isActive ? 'active' : ''}`}
                    onClick={() => setActiveIndex(index)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault()
                        setActiveIndex(index)
                      }
                    }}
                    role="button"
                    tabIndex={0}
                    aria-pressed={isActive}
                    aria-label={item.title}
                  >
                    <div className="title">
                      <h4>{item.title}</h4>
                    </div>
                    <div className="desc">
                      {item.isList ? (
                        <ul>
                          {Array.isArray(item.desc) &&
                            item.desc.map((li: string, i: number) => <li key={i}>{li}</li>)}
                        </ul>
                      ) : (
                        <p>{item.desc as string}</p>
                      )}
                    </div>
                    <ProgressBar isActive={isActive && canAutoRotate} duration={duration} />
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
