'use client'

import { useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils'

type ScaledPreviewFrameProps = {
  src: string
  /** Real CSS viewport width the page should render at (e.g. 390 for mobile) */
  width: number
  title: string
  /** Height utility classes for the visible frame (e.g. 'h-[70vh]') */
  heightClassName?: string
  iframeRef?: React.RefObject<HTMLIFrameElement | null>
}

/**
 * Renders an iframe at the true device width and scales it down with a CSS
 * transform when the surrounding pane is narrower, so media queries inside the
 * preview behave exactly like they would on the selected device.
 */
export const ScaledPreviewFrame = ({
  src,
  width,
  title,
  heightClassName = 'h-[70vh]',
  iframeRef,
}: ScaledPreviewFrameProps) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(1)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const update = () => {
      const available = el.clientWidth
      setScale(available >= width ? 1 : Math.max(available / width, 0.2))
    }
    update()
    const observer = new ResizeObserver(update)
    observer.observe(el)
    return () => observer.disconnect()
  }, [width])

  return (
    <div ref={containerRef} className="w-full">
      <div
        className="mx-auto overflow-hidden rounded-[var(--admin-radius-sm)] border border-[var(--admin-border)] bg-white shadow-[var(--admin-shadow)]"
        style={{ width: Math.round(width * scale) }}
      >
        <div className={cn('relative', heightClassName)}>
          <iframe
            ref={iframeRef}
            key={src}
            title={title}
            src={src}
            className="absolute top-0 left-0 bg-white"
            style={{
              width,
              height: `${100 / scale}%`,
              transform: `scale(${scale})`,
              transformOrigin: 'top left',
            }}
          />
        </div>
      </div>
      <p className="mt-2 text-center text-xs text-[var(--admin-text-muted)]">
        {width}px viewport{scale < 1 ? ` · scaled to ${Math.round(scale * 100)}%` : ''}
      </p>
    </div>
  )
}
