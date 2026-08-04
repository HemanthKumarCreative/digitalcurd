'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { ArrowRight, MessageCircle } from 'lucide-react'
import homeContent from '@/content/home.json'

export default function HeroSection() {
  const { heroSection } = homeContent
  const [entered, setEntered] = useState(false)

  useEffect(() => {
    const frame = requestAnimationFrame(() => setEntered(true))
    return () => cancelAnimationFrame(frame)
  }, [])

  return (
    <>
      <section
        className="hero-section relative isolate flex items-center pt-[145px] pb-[70px] min-h-[100vh] lg:min-h-[auto] w-full"
        aria-label="Hero"
      >
        <div
          className="absolute inset-0 -z-10 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url('${heroSection.backgroundUrl}')` }}
          role="img"
          aria-label="Digital network and Earth from space representing AI-era transformation"
        />
        <div
          className="absolute inset-0 -z-10 bg-[linear-gradient(105deg,rgba(5,22,77,0.94)_0%,rgba(5,22,77,0.82)_42%,rgba(12,51,179,0.55)_72%,rgba(12,51,179,0.35)_100%)]"
          aria-hidden="true"
        />

        <div className="container max-w-[1160px] mx-auto px-4 w-full">
          <div className="dis-flex flex flex-wrap items-center">
            <div className="left-box basis-full lg:basis-[80%] text-left">
              <h1
                className={`text-[40px] leading-[50px] lg:text-[70px] lg:leading-[1.3] !text-white mb-5 font-bold drop-shadow-sm dc-fade-up ${entered ? 'is-in' : ''}`}
              >
                {heroSection.title}
              </h1>
              <h3
                className={`!text-[#FBBF24] mb-5 text-[22px] lg:text-[26px] font-semibold tracking-tight dc-fade-up dc-fade-up-delay-1 ${entered ? 'is-in' : ''}`}
              >
                {heroSection.subtitle}
              </h3>
              <p
                className={`mt-5 text-[16px] leading-[27px] lg:text-[18px] lg:leading-[30px] !text-white/90 font-normal max-w-[640px] dc-fade-up dc-fade-up-delay-2 ${entered ? 'is-in' : ''}`}
              >
                {heroSection.description}
              </p>

              <div
                className={`mt-[30px] mb-[70px] hero-cta-group dc-fade-up dc-fade-up-delay-3 ${entered ? 'is-in' : ''}`}
              >
                <Link
                  href={heroSection.ctaLink}
                  className="dc-btn dc-btn--primary"
                  aria-label={heroSection.ctaText}
                >
                  <span>{heroSection.ctaText}</span>
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
            {[...Array(2)].map((_, i) => (
              <React.Fragment key={i}>
                {heroSection.awards.map((award, index) => (
                  <div key={`${i}-${index}`} className="award-tile">
                    <span>{award}</span>
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
