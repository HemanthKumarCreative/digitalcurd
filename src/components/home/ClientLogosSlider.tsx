'use client'

import React, { useEffect, useRef } from 'react'
import { EditableImage } from '@/components/design-mode/EditableImage'
import { EditableText } from '@/components/design-mode/EditableText'
import { useDesignMode } from '@/components/design-mode/DesignModeProvider'

type LogoItem = {
  name: string
  src: string
}

type ClientMark = {
  name: string
}

type LogosData = {
  headingText1: string
  headingStrong: string
  headingText2: string
  toolsLabel?: string
  clientsLabel?: string
  logos: LogoItem[]
  clients?: ClientMark[]
}

const pauseTracksWhenOffscreen = (root: HTMLElement | null) => {
  if (!root) return () => {}

  const tracks = root.querySelectorAll<HTMLElement>('.logo-track')
  const observer = new IntersectionObserver(
    ([entry]) => {
      tracks.forEach((track) => {
        track.style.animationPlayState = entry.isIntersecting ? 'running' : 'paused'
      })
    },
    { threshold: 0.15 }
  )

  observer.observe(root)
  return () => observer.disconnect()
}

export default function ClientLogosSlider({ data: clientLogosSlider }: { data: LogosData }) {
  const logos = clientLogosSlider.logos as LogoItem[]
  const clients = (clientLogosSlider.clients || []) as ClientMark[]
  const rootRef = useRef<HTMLDivElement>(null)
  const { enabled } = useDesignMode()
  const copies = enabled ? 1 : 2

  useEffect(() => {
    if (enabled) return
    return pauseTracksWhenOffscreen(rootRef.current)
  }, [enabled])

  return (
    <div
      ref={rootRef}
      className="slide-logo-part dis-flex items-center justify-sb"
      aria-label="Trusted platforms and businesses"
    >
      <div className="container">
        <div className="dis-flex">
          <div className="logo-heading">
            <h4>
              <span>
                <EditableText
                  as="span"
                  path="clientLogosSlider.headingText1"
                  label="Logos → Heading start"
                  value={clientLogosSlider.headingText1}
                />
                <EditableText
                  as="span"
                  path="clientLogosSlider.headingStrong"
                  label="Logos → Heading strong"
                  value={clientLogosSlider.headingStrong}
                  className="font-bold"
                />
                <EditableText
                  as="span"
                  path="clientLogosSlider.headingText2"
                  label="Logos → Heading end"
                  value={clientLogosSlider.headingText2}
                />
              </span>
            </h4>
          </div>

          <div className="trust-row">
            <EditableText
              as="span"
              path="clientLogosSlider.toolsLabel"
              label="Logos → Tools label"
              value={clientLogosSlider.toolsLabel || 'Platforms we build with'}
              className="trust-row__label"
            />
            <div className="logo-slider">
              <div className="logo-track logo-track--ltr">
                {[...Array(copies)].map((_, i) => (
                  <React.Fragment key={`tools-${i}`}>
                    {logos.map((logo, index) => (
                      <div key={`${i}-${index}`} className="logos tool-logo">
                        {i === 0 ? (
                          <EditableImage
                            path={`clientLogosSlider.logos[${index}].src`}
                            label={`Logo → ${logo.name || index + 1}`}
                            value={logo.src}
                            alt={logo.name}
                          />
                        ) : (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={logo.src}
                            alt={logo.name}
                            loading="lazy"
                            decoding="async"
                          />
                        )}
                      </div>
                    ))}
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>

          {clients.length > 0 && (
            <div className="trust-row">
              <EditableText
                as="span"
                path="clientLogosSlider.clientsLabel"
                label="Logos → Clients label"
                value={clientLogosSlider.clientsLabel || 'Businesses growing with us'}
                className="trust-row__label"
              />
              <div className="logo-slider">
                <div className="logo-track logo-track--rtl">
                  {[...Array(copies)].map((_, i) => (
                    <React.Fragment key={`clients-${i}`}>
                      {clients.map((client, index) => (
                        <div
                          key={`${i}-${index}`}
                          className="logos client-wordmark"
                          aria-label={client.name}
                        >
                          {i === 0 ? (
                            <EditableText
                              as="span"
                              path={`clientLogosSlider.clients[${index}].name`}
                              label={`Client → ${index + 1}`}
                              value={client.name}
                            />
                          ) : (
                            <span>{client.name}</span>
                          )}
                        </div>
                      ))}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
