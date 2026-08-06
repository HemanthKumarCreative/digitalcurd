'use client'

import { useRouter } from 'next/navigation'
import { useMemo, useState, useTransition } from 'react'
import { ImageIcon, Link2, Search, Trash2, Upload } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { EmptyState } from '@/components/ui/empty-state'
import { PageHeader } from '@/components/ui/page-header'
import { useToast } from '@/components/ui/toast'

type Asset = {
  _id: string
  _type: string
  originalFilename?: string
  url?: string
  mimeType?: string
  size?: number
  _updatedAt?: string
}

type MediaLibraryProps = {
  initialAssets: Asset[]
  canEdit: boolean
}

const formatBytes = (bytes?: number) => {
  if (!bytes) return '—'
  const i = Math.min(Math.floor(Math.log(bytes) / Math.log(1024)), 3)
  return `${(bytes / 1024 ** i).toFixed(1)} ${['B', 'KB', 'MB', 'GB'][i]}`
}

export const MediaLibrary = ({ initialAssets, canEdit }: MediaLibraryProps) => {
  const router = useRouter()
  const { push } = useToast()
  const [assets, setAssets] = useState(initialAssets)
  const [query, setQuery] = useState('')
  const [filter, setFilter] = useState<'all' | 'image' | 'file'>('all')
  const [pending, startTransition] = useTransition()
  const [preview, setPreview] = useState<Asset | null>(null)
  const [dragOver, setDragOver] = useState(false)

  const filtered = useMemo(() => {
    return assets.filter((asset) => {
      if (filter === 'image' && !asset.mimeType?.startsWith('image/')) return false
      if (filter === 'file' && asset.mimeType?.startsWith('image/')) return false
      if (!query.trim()) return true
      const q = query.toLowerCase()
      return (
        asset.originalFilename?.toLowerCase().includes(q) ||
        asset.mimeType?.toLowerCase().includes(q) ||
        asset._id.toLowerCase().includes(q)
      )
    })
  }, [assets, filter, query])

  const uploadFiles = (fileList: FileList | null) => {
    if (!fileList?.length || !canEdit) return
    const file = fileList[0]
    startTransition(async () => {
      try {
        const form = new FormData()
        form.append('file', file)
        const res = await fetch('/api/admin/media', { method: 'POST', body: form })
        const data = await res.json()
        if (!res.ok) throw new Error(data.message || 'Upload failed')
        setAssets((prev) => [data.asset, ...prev])
        push({ title: 'Uploaded', description: file.name, tone: 'success' })
        router.refresh()
      } catch (error) {
        push({
          title: 'Upload failed',
          description: error instanceof Error ? error.message : 'Unknown error',
          tone: 'danger',
        })
      }
    })
  }

  const handleDelete = (id: string) => {
    if (!canEdit) return
    if (!window.confirm('Delete this asset from Sanity?')) return
    startTransition(async () => {
      try {
        const res = await fetch(`/api/admin/media?id=${encodeURIComponent(id)}`, {
          method: 'DELETE',
        })
        const data = await res.json()
        if (!res.ok) throw new Error(data.message || 'Delete failed')
        setAssets((prev) => prev.filter((a) => a._id !== id))
        if (preview?._id === id) setPreview(null)
        push({ title: 'Deleted', tone: 'success' })
        router.refresh()
      } catch (error) {
        push({
          title: 'Delete failed',
          description: error instanceof Error ? error.message : 'Unknown error',
          tone: 'danger',
        })
      }
    })
  }

  const handleCopyUrl = async (url?: string) => {
    if (!url) return
    try {
      await navigator.clipboard.writeText(url)
      push({ title: 'URL copied', tone: 'success' })
    } catch {
      push({ title: 'Copy failed', tone: 'danger' })
    }
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Media"
        description="Upload and manage Sanity assets. Use Choose from media inside editors to insert images."
        breadcrumbs={[{ label: 'Assets' }, { label: 'Media' }]}
        actions={
          <label className="inline-flex cursor-pointer">
            <input
              type="file"
              className="sr-only"
              accept="image/*,video/*,.pdf,.svg,.doc,.docx"
              disabled={!canEdit || pending}
              onChange={(e) => uploadFiles(e.target.files)}
            />
            <span className="inline-flex h-10 items-center gap-2 rounded-[var(--admin-radius-sm)] bg-[var(--admin-navy)] px-4 text-sm font-semibold text-white">
              <Upload className="h-4 w-4" aria-hidden />
              Upload
            </span>
          </label>
        }
      />

      <div
        className={`rounded-[var(--admin-radius)] border border-dashed p-6 text-center transition ${
          dragOver
            ? 'border-[var(--admin-blue)] bg-[var(--admin-blue-soft)]'
            : 'border-[var(--admin-border-strong)] bg-white'
        }`}
        onDragOver={(e) => {
          e.preventDefault()
          setDragOver(true)
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(e) => {
          e.preventDefault()
          setDragOver(false)
          uploadFiles(e.dataTransfer.files)
        }}
      >
        <Upload className="mx-auto h-6 w-6 text-[var(--admin-blue)]" aria-hidden />
        <p className="mt-2 text-sm font-semibold text-[var(--admin-navy)]">
          Drag and drop files here
        </p>
        <p className="text-xs text-[var(--admin-text-muted)]">Images, SVG, PDF, and documents</p>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative min-w-[220px] flex-1 sm:max-w-sm">
          <Search
            className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-[var(--admin-text-muted)]"
            aria-hidden
          />
          <Input
            className="pl-9"
            placeholder="Search media…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="Search media"
          />
        </div>
        <div className="flex gap-2">
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
      </div>

      {filtered.length === 0 ? (
        <EmptyState
          icon={<ImageIcon className="h-6 w-6" />}
          title="No media assets"
          description="Upload images to use them across page heroes, blogs, and services."
        />
      ) : (
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {filtered.map((asset) => {
            const isImage = asset.mimeType?.startsWith('image/')
            return (
              <article
                key={asset._id}
                className="overflow-hidden rounded-[var(--admin-radius)] border border-[var(--admin-border)] bg-white shadow-[var(--admin-shadow)]"
              >
                <button
                  type="button"
                  className="block w-full bg-slate-100"
                  onClick={() => setPreview(asset)}
                  aria-label={`Preview ${asset.originalFilename || asset._id}`}
                >
                  {isImage && asset.url ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={`${asset.url}?w=640&h=360&fit=crop`}
                      alt={asset.originalFilename || ''}
                      className="h-40 w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-40 items-center justify-center text-sm text-[var(--admin-text-muted)]">
                      {asset.mimeType || 'File'}
                    </div>
                  )}
                </button>
                <div className="space-y-2 p-3">
                  <p className="truncate text-sm font-semibold">
                    {asset.originalFilename || asset._id}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <Badge>{formatBytes(asset.size)}</Badge>
                    <Badge tone="info">{asset._type.replace('sanity.', '')}</Badge>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {asset.url ? (
                      <>
                        <a
                          href={asset.url}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex h-8 items-center rounded-md border border-[var(--admin-border)] px-3 text-xs font-semibold hover:bg-slate-50"
                        >
                          Open
                        </a>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleCopyUrl(asset.url)}
                          aria-label={`Copy URL for ${asset.originalFilename || asset._id}`}
                        >
                          <Link2 className="h-3.5 w-3.5" aria-hidden />
                          Copy URL
                        </Button>
                      </>
                    ) : null}
                    <Button
                      variant="destructive"
                      size="sm"
                      disabled={!canEdit || pending}
                      onClick={() => handleDelete(asset._id)}
                    >
                      <Trash2 className="h-3.5 w-3.5" aria-hidden />
                      Delete
                    </Button>
                  </div>
                </div>
              </article>
            )
          })}
        </div>
      )}

      {preview ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[var(--admin-navy)]/60 p-4"
          role="dialog"
          aria-modal="true"
          aria-label="Media preview"
        >
          <div className="max-h-[90vh] w-full max-w-3xl overflow-auto rounded-[var(--admin-radius)] bg-white p-4 shadow-[var(--admin-shadow-lg)]">
            <div className="mb-3 flex items-center justify-between gap-3">
              <p className="font-semibold">{preview.originalFilename}</p>
              <Button variant="outline" size="sm" onClick={() => setPreview(null)}>
                Close
              </Button>
            </div>
            {preview.mimeType?.startsWith('image/') && preview.url ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={preview.url} alt="" className="max-h-[70vh] w-full object-contain" />
            ) : (
              <p className="text-sm text-[var(--admin-text-muted)]">
                Preview not available.{' '}
                {preview.url ? (
                  <a
                    className="font-semibold text-[var(--admin-blue)] underline"
                    href={preview.url}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Open file
                  </a>
                ) : null}
              </p>
            )}
          </div>
        </div>
      ) : null}
    </div>
  )
}
