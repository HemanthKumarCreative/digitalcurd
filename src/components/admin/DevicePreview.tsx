'use client'

import { useEffect, useMemo, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ScaledPreviewFrame } from '@/components/admin/ScaledPreviewFrame'
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
  { label: 'Articles', path: '/articles' },
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
  const [draftPending, setDraftPending] = useState(false)

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

  const handleToggleDraft = async (enable: boolean) => {
    if (draftPending) return
    setDraftPending(true)
    try {
      await fetch(`/api/draft/${enable ? 'enable' : 'disable'}`, { method: 'POST' })
      setDraftMode(enable)
      setNonce((n) => n + 1)
    } finally {
      setDraftPending(false)
    }
  }

  return (
    <div className="space-y-4 rounded-[var(--admin-radius)] border border-[var(--admin-border)] bg-white p-4 shadow-[var(--admin-shadow)] lg:p-5">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap items-center gap-2">
          <label className="sr-only" htmlFor="preview-device">
            Preview width
          </label>
          <select
            id="preview-device"
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
          <Badge tone={draftMode ? 'warning' : 'default'}>
            {draftMode ? 'Draft mode on' : 'Live content'}
          </Badge>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button
            variant="soft"
            size="sm"
            disabled={draftPending || draftMode}
            aria-busy={draftPending}
            onClick={() => void handleToggleDraft(true)}
          >
            {draftPending && !draftMode ? 'Enabling…' : 'Enable draft mode'}
          </Button>
          <Button
            variant="outline"
            size="sm"
            disabled={draftPending || !draftMode}
            aria-busy={draftPending}
            onClick={() => void handleToggleDraft(false)}
          >
            {draftPending && draftMode ? 'Exiting…' : 'Exit draft mode'}
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

      <div className="rounded-[var(--admin-radius)] bg-[var(--admin-canvas)] p-4">
        <ScaledPreviewFrame
          src={src}
          width={Math.min(width, 1440)}
          title="Site preview"
          heightClassName="h-[70vh]"
        />
      </div>
    </div>
  )
}
