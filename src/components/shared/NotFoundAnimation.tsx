'use client'

import Link from 'next/link'
import { DotLottieReact } from '@lottiefiles/dotlottie-react'
import { ArrowRight } from 'lucide-react'
import { useEffect, useState } from 'react'

export default function NotFoundAnimation() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#05164D',
        position: 'relative',
        overflow: 'hidden',
        paddingTop: '140px',
        paddingBottom: '80px',
        minHeight: '60vh',
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '80vw',
          height: '80vw',
          background:
            'radial-gradient(circle, rgba(37, 99, 235, 0.15) 0%, rgba(5, 22, 77, 0) 60%)',
          zIndex: 0,
          pointerEvents: 'none',
        }}
      />

      <div
        style={{
          position: 'relative',
          zIndex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          gap: 24,
        }}
      >
        <div
          style={{
            width: '100%',
            maxWidth: '800px',
            maxHeight: '60vh',
            aspectRatio: '16/9',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {mounted && (
            <DotLottieReact
              src="/under-construction.lottie"
              loop
              autoplay
              style={{ width: '100%', height: '100%', objectFit: 'contain' }}
            />
          )}
        </div>

        <p
          style={{
            margin: 0,
            color: 'rgba(226, 232, 240, 0.85)',
            fontSize: 16,
            textAlign: 'center',
            maxWidth: 420,
            padding: '0 20px',
          }}
        >
          This page is not available. Head home or browse our services.
        </p>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, justifyContent: 'center' }}>
          <Link href="/" className="dc-btn dc-btn--primary" aria-label="Go to homepage">
            <span>Back to Home</span>
            <span className="dc-btn__icon" aria-hidden="true">
              <ArrowRight size={18} />
            </span>
          </Link>
          <Link href="/services" className="dc-btn dc-btn--secondary" aria-label="View all services">
            <span>View Services</span>
          </Link>
        </div>
      </div>
    </div>
  )
}
