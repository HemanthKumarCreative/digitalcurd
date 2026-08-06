'use client'

import { useEffect, useState, useTransition } from 'react'
import { ImageIcon, Search, Upload, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'

export type MediaAsset = {
  _id: string
  _type: string
  originalFilename?: string
  url?: string
  mimeType?: string
  size?: number
}

type MediaPickerDialogProps = {
  open: boolean
  onClose: () => void
  onSelect: (asset: MediaAsset) => void
}

export const MediaPickerDialog = ({ open, onClose, onSelect }: MediaPickerDialogProps) => {
  const [assets, setAssets] = useState<MediaAsset[]>([])
  const [query, setQuery] = useState('')
  const [filter, setFilter] = useState<'all' | 'image' | 'file'>('all')
  const [loading, setLoading] = useState(false)
  const [pending, startTransition] = useTransition()
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!open) return
    const load = async () => {
      setLoading(true)
      setError(null)
      try {
        const res = await fetch('/api/admin/media')
        const data = await res.json()
        if (!res.ok) throw new Error(data.message || 'Failed to load media')
        setAssets(data.assets || [])
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load media')
      } finally {
        setLoading(false)
      }
    }
    void load()
  }, [open])

  useEffect(() => {
    if (!open) return
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleKey)
      document.body.style.overflow = ''
    }
  }, [open, onClose])

  if (!open) return null

  const filtered = assets.filter((asset) => {
    if (filter === 'image' && !asset.mimeType?.startsWith('image/')) return false
    if (filter === 'file' && asset.mimeType?.startsWith('image/')) return false
    if (!query.trim()) return true
    const q = query.toLowerCase()
    return (
      asset.originalFilename?.toLowerCase().includes(q) ||
      asset.mimeType?.toLowerCase().includes(q)
    )
  })

  const handleUpload = (fileList: FileList | null) => {
    if (!fileList?.length) return
    const file = fileList[0]
    startTransition(async () => {
      try {
        const form = new FormData()
        form.append('file', file)
        const res = await fetch('/api/admin/media', { method: 'POST', body: form })
        const data = await res.json()
        if (!res.ok) throw new Error(data.message || 'Upload failed')
        setAssets((prev) => [data.asset, ...prev])
        onSelect(data.asset)
        onClose()
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Upload failed')
      }
    })
  }

  return (
    <div className="fixed inset-0 z-[60]" role="dialog" aria-modal="true" aria-label="Choose media">
      <button
        type="button"
        className="absolute inset-0 bg-[var(--admin-navy)]/50"
        aria-label="Close media picker"
        onClick={onClose}
      />
      <div className="absolute inset-x-4 top-[8%] mx-auto flex max-h-[84vh] max-w-4xl flex-col overflow-hidden rounded-[var(--admin-radius)] bg-white shadow-[var(--admin-shadow-lg)] sm:inset-x-8">
        <div className="flex items-center justify-between border-b border-[var(--admin-border)] px-4 py-3 sm:px-5">
          <div>
            <p className="font-bold text-[var(--admin-navy)]">Choose media</p>
            <p className="text-xs text-[var(--admin-text-muted)]">
              Select an image or upload a new file
            </p>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose} aria-label="Close">
            <X className="h-5 w-5" />
          </Button>
        </div>

        <div className="flex flex-wrap items-center gap-2 border-b border-[var(--admin-border)] px-4 py-3 sm:px-5">
          <div className="relative min-w-[200px] flex-1">
            <Search
              className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-[var(--admin-text-muted)]"
              aria-hidden
            />
            <Input
              className="pl-9"
              placeholder="Search files…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              aria-label="Search media"
            />
          </div>
          <div className="flex gap-1">
            {(['all', 'image', 'file'] as const).map((item) => (
              <Button
                key={item}
                size="sm"
                variant={filter === item ? 'default' : 'outline'}
                onClick={() => setFilter(item)}
                aria-pressed={filter === item}
              >
                {item === 'all' ? 'All' : item === 'image' ? 'Images' : 'Files'}
              </Button>
            ))}
          </div>
          <label className="inline-flex cursor-pointer">
            <input
              type="file"
              className="sr-only"
              accept="image/*,.svg,.pdf"
              disabled={pending}
              onChange={(e) => handleUpload(e.target.files)}
            />
            <span className="inline-flex h-10 items-center gap-2 rounded-[var(--admin-radius-sm)] bg-[var(--admin-navy)] px-4 text-sm font-semibold text-white">
              <Upload className="h-4 w-4" aria-hidden />
              Upload
            </span>
          </label>
        </div>

        <div className="admin-scrollbar flex-1 overflow-y-auto p-4 sm:p-5">
          {error ? (
            <p className="mb-3 rounded-[var(--admin-radius-sm)] bg-[var(--admin-danger-soft)] px-3 py-2 text-sm text-[var(--admin-danger)]">
              {error}
            </p>
          ) : null}
          {loading ? (
            <p className="py-10 text-center text-sm text-[var(--admin-text-muted)]">Loading media…</p>
          ) : filtered.length === 0 ? (
            <div className="flex flex-col items-center py-12 text-center">
              <ImageIcon className="mb-3 h-8 w-8 text-[var(--admin-text-muted)]" aria-hidden />
              <p className="font-semibold text-[var(--admin-navy)]">No media found</p>
              <p className="mt-1 text-sm text-[var(--admin-text-muted)]">
                Upload an image to get started.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
              {filtered.map((asset) => {
                const isImage = asset.mimeType?.startsWith('image/')
                return (
                  <button
                    key={asset._id}
                    type="button"
                    className={cn(
                      'overflow-hidden rounded-[var(--admin-radius-sm)] border border-[var(--admin-border)] text-left transition hover:border-[var(--admin-blue)] hover:shadow-md'
                    )}
                    onClick={() => {
                      onSelect(asset)
                      onClose()
                    }}
                  >
                    <div className="aspect-video bg-slate-100">
                      {isImage && asset.url ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={`${asset.url}?w=400&h=225&fit=crop`}
                          alt={asset.originalFilename || ''}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center text-xs text-[var(--admin-text-muted)]">
                          File
                        </div>
                      )}
                    </div>
                    <p className="truncate px-2 py-2 text-xs font-medium">
                      {asset.originalFilename || asset._id}
                    </p>
                  </button>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
