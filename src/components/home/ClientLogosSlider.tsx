'use client'

import React, { useEffect, useRef } from 'react'

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

  useEffect(() => pauseTracksWhenOffscreen(rootRef.current), [])

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
                {clientLogosSlider.headingText1}
                <strong>{clientLogosSlider.headingStrong}</strong>
                {clientLogosSlider.headingText2}
              </span>
            </h4>
          </div>

          <div className="trust-row">
            <span className="trust-row__label">
              {clientLogosSlider.toolsLabel || 'Platforms we build with'}
            </span>
            <div className="logo-slider">
              <div className="logo-track logo-track--ltr">
                {[...Array(2)].map((_, i) => (
                  <React.Fragment key={`tools-${i}`}>
                    {logos.map((logo, index) => (
                      <div key={`${i}-${index}`} className="logos tool-logo">
                        <img
                          src={logo.src}
                          alt={logo.name}
                          loading="lazy"
                          decoding="async"
                        />
                      </div>
                    ))}
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>

          {clients.length > 0 && (
            <div className="trust-row">
              <span className="trust-row__label">
                {clientLogosSlider.clientsLabel || 'Businesses growing with us'}
              </span>
              <div className="logo-slider">
                <div className="logo-track logo-track--rtl">
                  {[...Array(2)].map((_, i) => (
                    <React.Fragment key={`clients-${i}`}>
                      {clients.map((client, index) => (
                        <div
                          key={`${i}-${index}`}
                          className="logos client-wordmark"
                          aria-label={client.name}
                        >
                          <span>{client.name}</span>
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
