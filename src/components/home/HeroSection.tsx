'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { ArrowRight, MessageCircle } from 'lucide-react'
import { EditableImage } from '@/components/design-mode/EditableImage'
import { EditableText } from '@/components/design-mode/EditableText'
import { useDesignMode } from '@/components/design-mode/DesignModeProvider'

type HeroData = {
  backgroundUrl: string
  title: string
  subtitle: string
  description: string
  ctaText: string
  ctaLink: string
  awards: string[]
}

export default function HeroSection({ data: heroSection }: { data: HeroData }) {
  const [entered, setEntered] = useState(false)
  const { enabled: designOn } = useDesignMode()
  const awardCopies = designOn ? 1 : 2

  useEffect(() => {
    const frame = requestAnimationFrame(() => setEntered(true))
    return () => cancelAnimationFrame(frame)
  }, [])

  return (
    <>
      <section
        id="dc-section-hero"
        className="hero-section relative isolate flex items-center pt-[110px] pb-[48px] md:pt-[145px] md:pb-[70px] min-h-[auto] w-full"
        aria-label="Hero"
      >
        <EditableImage
          path="heroSection.backgroundUrl"
          label="Hero → Background"
          value={heroSection.backgroundUrl}
          asBackground
          className="absolute inset-0 -z-10 bg-cover bg-center bg-no-repeat"
          alt="Digital network and Earth from space representing AI-era transformation"
        />
        <div
          className="absolute inset-0 -z-10 dc-design-overlay-pass bg-[linear-gradient(105deg,rgba(5,22,77,0.94)_0%,rgba(5,22,77,0.82)_42%,rgba(12,51,179,0.55)_72%,rgba(12,51,179,0.35)_100%)]"
          aria-hidden="true"
        />

        <div className="dc-rail dc-design-content-layer">
          <div className="dis-flex flex flex-wrap items-center">
            <div className="left-box basis-full lg:basis-[80%] text-left">
              <EditableText
                as="h1"
                path="heroSection.title"
                label="Hero → Title"
                value={heroSection.title}
                className={`text-[34px] leading-[1.25] sm:text-[40px] sm:leading-[50px] md:text-[52px] md:leading-[1.25] lg:text-[70px] lg:leading-[1.3] !text-white mb-5 font-bold drop-shadow-sm dc-fade-up ${entered ? 'is-in' : ''}`}
              />
              <EditableText
                as="h3"
                path="heroSection.subtitle"
                label="Hero → Subtitle"
                value={heroSection.subtitle}
                className={`!text-[#FBBF24] mb-5 text-[19px] sm:text-[22px] lg:text-[26px] font-semibold tracking-tight dc-fade-up dc-fade-up-delay-1 ${entered ? 'is-in' : ''}`}
              />
              <EditableText
                as="p"
                path="heroSection.description"
                label="Hero → Description"
                value={heroSection.description}
                multiline
                className={`mt-5 text-[16px] leading-[27px] lg:text-[18px] lg:leading-[30px] !text-white/90 font-normal max-w-[640px] dc-fade-up dc-fade-up-delay-2 ${entered ? 'is-in' : ''}`}
              />

              <div
                className={`mt-[30px] mb-[40px] md:mb-[70px] hero-cta-group dc-fade-up dc-fade-up-delay-3 ${entered ? 'is-in' : ''}`}
              >
                <Link
                  href={heroSection.ctaLink}
                  className="dc-btn dc-btn--primary"
                  aria-label={heroSection.ctaText}
                >
                  <EditableText
                    as="span"
                    path="heroSection.ctaText"
                    label="Hero → CTA label"
                    value={heroSection.ctaText}
                  />
                  <span className="dc-btn__icon" aria-hidden="true">
                    <ArrowRight size={18} strokeWidth={2.25} />
                  </span>
                </Link>
                <a href="#form" className="dc-btn dc-btn--secondary">
                  <span>Talk to us</span>
                  <span className="dc-btn__icon dc-btn__icon--trail" aria-hidden="true">
                    <MessageCircle size={18} strokeWidth={2.25} />
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="running-bar" aria-label="Services highlight">
        <div className="awards-marquee-track">
          <div className="awards-marquee-inner">
            {[...Array(awardCopies)].map((_, i) => (
              <React.Fragment key={i}>
                {heroSection.awards.map((award, index) => (
                  <div key={`${i}-${index}`} className="award-tile">
                    {i === 0 ? (
                      <EditableText
                        as="span"
                        path={`heroSection.awards[${index}]`}
                        label={`Hero → Award ${index + 1}`}
                        value={award}
                      />
                    ) : (
                      <span>{award}</span>
                    )}
                  </div>
                ))}
              </React.Fragment>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
