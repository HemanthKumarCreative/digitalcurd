'use client'

import { useEffect, useState } from 'react'
import {
  postDesignOpenMedia,
  useDesignMode,
} from '@/components/design-mode/DesignModeProvider'
import { cn } from '@/lib/utils'

type EditableImageProps = {
  path: string
  label: string
  value: string
  className?: string
  /** When true, applies as CSS background on a div instead of <img> */
  asBackground?: boolean
  alt?: string
}

export const EditableImage = ({
  path,
  label,
  value,
  className,
  asBackground,
  alt = '',
}: EditableImageProps) => {
  const { enabled, documentId, documentType } = useDesignMode()
  const [url, setUrl] = useState(value || '')

  useEffect(() => {
    setUrl(value || '')
  }, [value])

  useEffect(() => {
    if (!enabled) return
    const handler = (event: Event) => {
      const detail = (event as CustomEvent<{ url: string }>).detail
      if (detail?.url) setUrl(detail.url)
    }
    const selector = `[data-dc-path="${CSS.escape(path)}"]`
    const attach = () => {
      document.querySelectorAll(selector).forEach((node) => {
        node.addEventListener('dc-media-result', handler as EventListener)
      })
    }
    attach()
    return () => {
      document.querySelectorAll(selector).forEach((node) => {
        node.removeEventListener('dc-media-result', handler as EventListener)
      })
    }
  }, [enabled, path])

  const handleClick = (event?: React.MouseEvent) => {
    if (!enabled || !documentId || !documentType) return
    event?.preventDefault()
    event?.stopPropagation()
    postDesignOpenMedia({ documentId, documentType, path, label })
  }

  if (asBackground) {
    return (
      <div
        className={cn(className, enabled && 'dc-editable-bg')}
        style={{
          backgroundImage: url ? `url("${url}")` : undefined,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
        role="img"
        aria-label={alt || label}
        data-dc-editable={enabled ? 'image' : undefined}
        data-dc-path={enabled ? path : undefined}
        data-dc-label={enabled ? label : undefined}
        onClick={enabled ? handleClick : undefined}
        onKeyDown={
          enabled
            ? (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  handleClick()
                }
              }
            : undefined
        }
        tabIndex={enabled ? 0 : undefined}
      />
    )
  }

  if (!url) {
    return enabled ? (
      <button
        type="button"
        className={cn(
          'flex min-h-24 items-center justify-center border border-dashed border-[var(--admin-border,#94a3b8)] bg-slate-100 p-4 text-sm font-semibold text-slate-600',
          className
        )}
        data-dc-editable="image"
        data-dc-path={path}
        data-dc-label={label}
        onClick={handleClick}
      >
        Choose media
      </button>
    ) : null
  }

  const isVideo = /\.(mp4|webm|ogg)(\?|$)/i.test(url) || url.includes('video')

  if (isVideo) {
    return (
      <video
        src={url}
        className={cn(className)}
        controls={!enabled}
        muted
        playsInline
        data-dc-editable={enabled ? 'media' : undefined}
        data-dc-path={enabled ? path : undefined}
        data-dc-label={enabled ? label : undefined}
        onClick={enabled ? handleClick : undefined}
      />
    )
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={url}
      alt={alt}
      className={cn(className)}
      data-dc-editable={enabled ? 'image' : undefined}
      data-dc-path={enabled ? path : undefined}
      data-dc-label={enabled ? label : undefined}
      onClick={enabled ? handleClick : undefined}
    />
  )
}
