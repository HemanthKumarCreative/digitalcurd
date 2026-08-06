'use client'

import { useCallback, useEffect, useMemo, useRef, useState, useTransition } from 'react'
import { Eye, LayoutTemplate, Upload } from 'lucide-react'
import { MediaPickerDialog, type MediaAsset } from '@/components/admin/MediaPickerDialog'
import { patchField, publishDocument } from '@/lib/admin/actions'
import {
  DESIGN_MODE_MESSAGE,
  isDesignModeMessage,
  type DesignModeMessage,
} from '@/lib/design-mode/constants'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/toast'
import { cn } from '@/lib/utils'

const devices = [
  { id: 'mobile', label: 'Mobile', width: 390 },
  { id: 'tablet', label: 'Tablet', width: 768 },
  { id: 'laptop', label: 'Laptop', width: 1280 },
  { id: 'desktop', label: 'Desktop', width: 1440 },
] as const

type SectionJump = { id: string; label: string }

type DesignModeViewProps = {
  documentId: string
  documentType: string
  previewPath: string
  siteUrl: string
  sections?: SectionJump[]
  onPublish?: () => void
}

export const DesignModeView = ({
  documentId,
  documentType,
  previewPath,
  siteUrl,
  sections = [],
  onPublish,
}: DesignModeViewProps) => {
  const { push } = useToast()
  const [device, setDevice] = useState<(typeof devices)[number]['id']>('desktop')
  const [nonce, setNonce] = useState(0)
  const [ready, setReady] = useState(false)
  const [pending, startTransition] = useTransition()
  const [mediaOpen, setMediaOpen] = useState(false)
  const [mediaTarget, setMediaTarget] = useState<{
    path: string
    label?: string
    documentId: string
    documentType: string
  } | null>(null)
  const [showTip, setShowTip] = useState(true)
  const iframeRef = useRef<HTMLIFrameElement>(null)

  const width = devices.find((d) => d.id === device)?.width || 1440

  const src = useMemo(() => {
    const url = new URL(previewPath.startsWith('/') ? previewPath : `/${previewPath}`, siteUrl)
    url.searchParams.set('preview', String(nonce))
    url.searchParams.set('dc_edit', '1')
    return url.toString()
  }, [previewPath, siteUrl, nonce])

  const enableDesign = useCallback(async () => {
    await fetch('/api/admin/design/enable', { method: 'POST' })
    setReady(false)
    setNonce((n) => n + 1)
  }, [])

  useEffect(() => {
    void enableDesign()
    return () => {
      // Leaving Design Mode must not leave edit cookies active on the public site.
      void fetch('/api/admin/design/disable', { method: 'POST' })
    }
  }, [enableDesign])

  useEffect(() => {
    const onMessage = (event: MessageEvent) => {
      if (event.origin !== window.location.origin) return
      if (!isDesignModeMessage(event.data)) return
      const msg = event.data

      if (msg.type === 'ready') {
        setReady(true)
        return
      }

      if (msg.type === 'field-change') {
        startTransition(async () => {
          try {
            await patchField({
              id: msg.documentId || documentId,
              type: msg.documentType || documentType,
              path: msg.path,
              value: msg.value,
            })
            push({
              title: 'Draft saved',
              description: msg.label || msg.path,
              tone: 'success',
            })
          } catch (error) {
            push({
              title: 'Save failed',
              description: error instanceof Error ? error.message : 'Unknown error',
              tone: 'danger',
            })
          }
        })
        return
      }

      if (msg.type === 'open-media') {
        setMediaTarget({
          path: msg.path,
          label: msg.label,
          documentId: msg.documentId || documentId,
          documentType: msg.documentType || documentType,
        })
        setMediaOpen(true)
      }
    }

    window.addEventListener('message', onMessage)
    return () => window.removeEventListener('message', onMessage)
  }, [documentId, documentType, push])

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 's') {
        event.preventDefault()
        push({ title: 'Drafts autosave on blur', description: 'Edits save when you leave a field' })
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [push])

  const handleMediaSelect = (asset: MediaAsset) => {
    if (!mediaTarget?.path || !asset.url) return
    const path = mediaTarget.path
    const label = mediaTarget.label
    const targetId = mediaTarget.documentId
    const targetType = mediaTarget.documentType
    startTransition(async () => {
      try {
        await patchField({
          id: targetId,
          type: targetType,
          path,
          value: asset.url,
        })
        const message: DesignModeMessage = {
          source: DESIGN_MODE_MESSAGE,
          type: 'media-result',
          path,
          url: asset.url!,
        }
        iframeRef.current?.contentWindow?.postMessage(message, window.location.origin)
        push({ title: 'Image updated', description: label || path, tone: 'success' })
      } catch (error) {
        push({
          title: 'Image update failed',
          description: error instanceof Error ? error.message : 'Unknown error',
          tone: 'danger',
        })
      }
    })
    setMediaOpen(false)
    setMediaTarget(null)
  }

  const handlePublish = () => {
    startTransition(async () => {
      try {
        await publishDocument({ id: documentId, type: documentType })
        push({ title: 'Published', description: 'Live site updated', tone: 'success' })
        onPublish?.()
        setNonce((n) => n + 1)
      } catch (error) {
        push({
          title: 'Publish failed',
          description: error instanceof Error ? error.message : 'Unknown error',
          tone: 'danger',
        })
      }
    })
  }

  const handleJump = (sectionId: string) => {
    const message: DesignModeMessage = {
      source: DESIGN_MODE_MESSAGE,
      type: 'scroll-to',
      sectionId,
    }
    iframeRef.current?.contentWindow?.postMessage(message, window.location.origin)
  }

  return (
    <div className="space-y-3">
      {showTip ? (
        <div className="flex flex-wrap items-start justify-between gap-3 rounded-[var(--admin-radius-sm)] border border-[var(--admin-blue)]/30 bg-[var(--admin-blue-soft)] px-3 py-2.5 text-sm">
          <p className="text-[var(--admin-navy)]">
            <strong>Design mode:</strong> click outlined text or images on the page. Switch to{' '}
            <strong>Form</strong> for SEO, reordering, and adding rows.
          </p>
          <button
            type="button"
            className="text-xs font-bold text-[var(--admin-blue)] underline"
            onClick={() => setShowTip(false)}
          >
            Dismiss
          </button>
        </div>
      ) : null}

      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap items-center gap-2">
          <label className="sr-only" htmlFor="dc-device">
            Preview width
          </label>
          <select
            id="dc-device"
            className="h-8 rounded-[var(--admin-radius-sm)] border border-[var(--admin-border)] bg-white px-2 text-xs font-semibold sm:hidden"
            value={device}
            onChange={(e) => setDevice(e.target.value as (typeof devices)[number]['id'])}
          >
            {devices.map((item) => (
              <option key={item.id} value={item.id}>
                {item.label}
              </option>
            ))}
          </select>
          <div className="hidden flex-wrap items-center gap-2 sm:flex">
            {devices.map((item) => (
              <Button
                key={item.id}
                variant={device === item.id ? 'default' : 'outline'}
                size="sm"
                onClick={() => setDevice(item.id)}
                aria-pressed={device === item.id}
              >
                {item.label}
              </Button>
            ))}
          </div>
          <Badge tone={ready ? 'success' : 'warning'}>
            {ready ? 'Design editing' : 'Loading…'}
          </Badge>
          {pending ? <Badge tone="info">Saving…</Badge> : null}
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" size="sm" onClick={() => void enableDesign()}>
            <Eye className="h-4 w-4" aria-hidden />
            Refresh
          </Button>
          <Button
            size="sm"
            disabled={pending}
            onClick={() => {
              if (
                !window.confirm(
                  'Publish this document’s draft to the live site? Footer/settings are published from Site → Settings.'
                )
              ) {
                return
              }
              handlePublish()
            }}
          >
            <Upload className="h-4 w-4" aria-hidden />
            Publish
          </Button>
        </div>
      </div>

      {sections.length > 0 ? (
        <div className="flex flex-wrap gap-2">
          <span className="flex items-center gap-1 text-xs font-bold tracking-wide text-[var(--admin-text-muted)] uppercase">
            <LayoutTemplate className="h-3.5 w-3.5" aria-hidden />
            Jump
          </span>
          {sections.map((section) => (
            <button
              key={section.id}
              type="button"
              className="rounded-full border border-[var(--admin-border)] px-3 py-1 text-xs font-semibold text-[var(--admin-text-secondary)] hover:border-[var(--admin-blue)]"
              onClick={() => handleJump(section.id)}
            >
              {section.label}
            </button>
          ))}
        </div>
      ) : null}

      <div className="overflow-auto rounded-[var(--admin-radius)] bg-[var(--admin-canvas)] p-3 lg:p-4">
        {!ready ? (
          <div className="mb-3 h-2 w-full animate-pulse rounded bg-slate-200" aria-hidden />
        ) : null}
        <div
          className={cn(
            'mx-auto overflow-hidden rounded-[var(--admin-radius-sm)] border border-[var(--admin-border)] bg-white shadow-[var(--admin-shadow)]'
          )}
          style={{ width: Math.min(width, 1440), maxWidth: '100%' }}
        >
          <iframe
            ref={iframeRef}
            key={src}
            title="Design mode preview"
            src={src}
            className="h-[70vh] w-full bg-white lg:h-[75vh]"
          />
        </div>
        <p className="mt-2 text-center text-xs text-[var(--admin-text-muted)]">{width}px viewport</p>
      </div>

      <MediaPickerDialog
        open={mediaOpen}
        onClose={() => {
          setMediaOpen(false)
          setMediaTarget(null)
        }}
        onSelect={handleMediaSelect}
      />
    </div>
  )
}
