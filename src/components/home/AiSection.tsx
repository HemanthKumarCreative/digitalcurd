'use client'

import React, { useEffect, useState } from 'react'
import { EditableImage } from '@/components/design-mode/EditableImage'
import { EditableText } from '@/components/design-mode/EditableText'
import { useDesignMode } from '@/components/design-mode/DesignModeProvider'
import { useInViewMotion } from '@/hooks/useInViewMotion'

type AiData = {
  imageUrl: string
  title: string
  description: string
  items: { title: string; desc: string | string[]; isList?: boolean }[]
}

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

export default function AiSection({ data: aiSection }: { data: AiData }) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [tabHidden, setTabHidden] = useState(false)
  const duration = 4000
  const items = aiSection.items
  const imageUrl = aiSection.imageUrl
  const { enabled: designOn } = useDesignMode()
  const { ref, inView, reducedMotion } = useInViewMotion<HTMLElement>({ once: false })

  useEffect(() => {
    const handleVisibility = () => setTabHidden(document.hidden)
    document.addEventListener('visibilitychange', handleVisibility)
    return () => document.removeEventListener('visibilitychange', handleVisibility)
  }, [])

  const canAutoRotate = inView && !reducedMotion && !tabHidden && !designOn

  useEffect(() => {
    if (!canAutoRotate) return
    const timer = setTimeout(() => {
      setActiveIndex((prev) => (prev + 1) % items.length)
    }, duration)
    return () => clearTimeout(timer)
  }, [activeIndex, canAutoRotate, items.length])

  useEffect(() => {
    if (designOn) setActiveIndex(0)
  }, [designOn])

  return (
    <section
      ref={ref}
      className={`ai-production-loop dc-fade-up ${inView ? 'is-in' : ''}`}
      aria-label="Growth solutions"
    >
      <div className="ai-left">
        <EditableImage
          path="aiSection.imageUrl"
          label="AI section → Image"
          value={imageUrl}
          alt="Global digital technology network for marketing and AI solutions"
          className="h-full w-full object-cover"
        />
      </div>

      <div className="ai-right">
        <div className="container w-full">
          <div className="ai-content">
            <EditableText
              as="h2"
              path="aiSection.title"
              label="AI section → Title"
              value={aiSection.title}
            />
            <EditableText
              as="p"
              path="aiSection.description"
              label="AI section → Description"
              value={aiSection.description}
              multiline
            />
            <div className="ai-list">
              {items.map((item, index) => {
                const isActive = designOn || index === activeIndex
                return (
                  <div
                    key={index}
                    className={`ai-item ${isActive ? 'active' : ''}`}
                    onClick={() => {
                      if (!designOn) setActiveIndex(index)
                    }}
                    onKeyDown={(e) => {
                      if (designOn) return
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
                      <EditableText
                        as="h4"
                        path={`aiSection.items[${index}].title`}
                        label={`AI item ${index + 1} → Title`}
                        value={item.title}
                      />
                    </div>
                    <div className="desc">
                      {item.isList ? (
                        <ul>
                          {Array.isArray(item.desc) &&
                            item.desc.map((li: string, i: number) => (
                              <li key={i}>
                                <EditableText
                                  as="span"
                                  path={`aiSection.items[${index}].desc[${i}]`}
                                  label={`AI item ${index + 1} → Bullet ${i + 1}`}
                                  value={li}
                                />
                              </li>
                            ))}
                        </ul>
                      ) : (
                        <EditableText
                          as="p"
                          path={`aiSection.items[${index}].desc`}
                          label={`AI item ${index + 1} → Description`}
                          value={item.desc as string}
                          multiline
                        />
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
