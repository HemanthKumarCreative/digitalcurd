'use client'

import { useEffect, useMemo, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'

const devices = [
  { id: 'mobile', label: 'Mobile', width: 390 },
  { id: 'tablet', label: 'Tablet', width: 768 },
  { id: 'laptop', label: 'Laptop', width: 1280 },
  { id: 'desktop', label: 'Desktop', width: 1440 },
] as const

const pathChips = [
  { label: 'Home', path: '/' },
  { label: 'Services', path: '/services' },
  { label: 'Blog', path: '/blog' },
  { label: 'About', path: '/about' },
  { label: 'Contact', path: '/contact' },
  { label: 'Careers', path: '/careers' },
]

type DevicePreviewProps = {
  siteUrl: string
  initialPath?: string
}

export const DevicePreview = ({ siteUrl, initialPath = '/' }: DevicePreviewProps) => {
  const [device, setDevice] = useState<(typeof devices)[number]['id']>('desktop')
  const [path, setPath] = useState(initialPath.startsWith('/') ? initialPath : `/${initialPath}`)
  const [nonce, setNonce] = useState(0)
  const [draftMode, setDraftMode] = useState(false)

  const width = devices.find((d) => d.id === device)?.width || 1440
  const src = useMemo(() => {
    const url = new URL(path, siteUrl)
    // Never pass dc_edit — Preview must match the live site (no Design Mode chrome).
    url.searchParams.set('preview', String(nonce))
    return url.toString()
  }, [path, siteUrl, nonce])

  useEffect(() => {
    // Clear leftover Design Mode cookies so this iframe never becomes editable.
    void fetch('/api/admin/design/disable', { method: 'POST', credentials: 'same-origin' }).then(
      () => {
        setDraftMode(false)
        setNonce((n) => n + 1)
      }
    )
  }, [])

  const handleEnableDraft = async () => {
    await fetch('/api/draft/enable', { method: 'POST' })
    setDraftMode(true)
    setNonce((n) => n + 1)
  }

  const handleDisableDraft = async () => {
    await fetch('/api/draft/disable', { method: 'POST' })
    setDraftMode(false)
    setNonce((n) => n + 1)
  }

  return (
    <div className="space-y-4 rounded-[var(--admin-radius)] border border-[var(--admin-border)] bg-white p-4 shadow-[var(--admin-shadow)] lg:p-5">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap items-center gap-2">
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
          <Badge tone={draftMode ? 'warning' : 'default'}>
            {draftMode ? 'Draft mode on' : 'Live content'}
          </Badge>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="soft" size="sm" onClick={handleEnableDraft}>
            Enable draft mode
          </Button>
          <Button variant="outline" size="sm" onClick={handleDisableDraft}>
            Exit draft mode
          </Button>
          <Button variant="outline" size="sm" onClick={() => setNonce((n) => n + 1)}>
            Refresh
          </Button>
          <a
            href={src}
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-9 items-center rounded-[var(--admin-radius-sm)] border border-[var(--admin-border)] px-3 text-sm font-semibold hover:bg-slate-50"
          >
            Open in new tab
          </a>
        </div>
      </div>

      <div>
        <Label htmlFor="preview-path">Path</Label>
        <Input
          id="preview-path"
          value={path}
          onChange={(e) => setPath(e.target.value || '/')}
          aria-label="Preview path"
        />
        <div className="mt-2 flex flex-wrap gap-2">
          {pathChips.map((chip) => (
            <button
              key={chip.path}
              type="button"
              className={cn(
                'rounded-full border px-3 py-1 text-xs font-semibold transition',
                path === chip.path
                  ? 'border-[var(--admin-navy)] bg-[var(--admin-navy)] text-white'
                  : 'border-[var(--admin-border)] text-[var(--admin-text-secondary)] hover:border-[var(--admin-blue)]'
              )}
              onClick={() => setPath(chip.path)}
            >
              {chip.label}
            </button>
          ))}
        </div>
      </div>

      <div className="overflow-auto rounded-[var(--admin-radius)] bg-[var(--admin-canvas)] p-4">
        <div
          className={cn(
            'mx-auto overflow-hidden rounded-[var(--admin-radius-sm)] border border-[var(--admin-border)] bg-white shadow-[var(--admin-shadow)]'
          )}
          style={{ width: Math.min(width, 1440), maxWidth: '100%' }}
        >
          <iframe key={src} title="Site preview" src={src} className="h-[70vh] w-full bg-white" />
        </div>
        <p className="mt-2 text-center text-xs text-[var(--admin-text-muted)]">{width}px viewport</p>
      </div>
    </div>
  )
}
