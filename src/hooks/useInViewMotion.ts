'use client'

import { useEffect, useRef, useState } from 'react'

type Options = {
  rootMargin?: string
  threshold?: number
  once?: boolean
}

export const useInViewMotion = <T extends HTMLElement>(options: Options = {}) => {
  const { rootMargin = '0px 0px -8% 0px', threshold = 0.2, once = true } = options
  const ref = useRef<T | null>(null)
  const [inView, setInView] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const handleMq = () => setReducedMotion(mq.matches)
    handleMq()
    mq.addEventListener('change', handleMq)
    return () => mq.removeEventListener('change', handleMq)
  }, [])

  useEffect(() => {
    const node = ref.current
    if (!node) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          if (once) observer.disconnect()
          return
        }
        if (!once) setInView(false)
      },
      { rootMargin, threshold }
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [once, rootMargin, threshold])

  return { ref, inView, reducedMotion, shouldAnimate: inView && !reducedMotion }
}
