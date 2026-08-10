'use client'

import { useMemo, useState, useTransition } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ChevronRight, Search, Trash2 } from 'lucide-react'
import { deleteDocument } from '@/lib/admin/actions'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ConfirmDialog } from '@/components/ui/confirm-dialog'
import { EmptyState } from '@/components/ui/empty-state'
import { Input } from '@/components/ui/input'

export type ContentListItem = {
  id: string
  href: string
  title: string
  subtitle?: string
  badges?: { label: string; tone?: 'default' | 'info' | 'success' | 'warning' | 'danger' }[]
  searchText?: string
  /** Enables the Published/Draft filter and renders a status badge on the row */
  status?: 'published' | 'draft'
  /** Sanity document type; enables the per-row delete action */
  deletableType?: string
}

type ContentListSearchProps = {
  items: ContentListItem[]
  emptyTitle: string
  emptyDescription: string
  placeholder?: string
  gridClassName?: string
}

const STATUS_FILTERS = [
  { id: 'all', label: 'All' },
  { id: 'published', label: 'Published' },
  { id: 'draft', label: 'Draft' },
] as const

type StatusFilter = (typeof STATUS_FILTERS)[number]['id']

export const ContentListSearch = ({
  items,
  emptyTitle,
  emptyDescription,
  placeholder = 'Search…',
  gridClassName = 'grid gap-3',
}: ContentListSearchProps) => {
  const router = useRouter()
  const [query, setQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all')
  const [deleteTarget, setDeleteTarget] = useState<ContentListItem | null>(null)
  const [deleteError, setDeleteError] = useState<string | null>(null)
  const [pending, startTransition] = useTransition()

  const hasStatuses = items.some((item) => item.status)

  const filtered = useMemo(() => {
    let list = items
    if (hasStatuses && statusFilter !== 'all') {
      list = list.filter((item) => item.status === statusFilter)
    }
    if (!query.trim()) return list
    const q = query.toLowerCase()
    return list.filter((item) => {
      const haystack = [
        item.title,
        item.subtitle,
        item.searchText,
        ...(item.badges?.map((b) => b.label) || []),
      ]
        .filter(Boolean)
        .join(' ')
        .toLowerCase()
      return haystack.includes(q)
    })
  }, [items, query, statusFilter, hasStatuses])

  const performDelete = () => {
    if (!deleteTarget?.deletableType) return
    const target = deleteTarget
    setDeleteError(null)
    startTransition(async () => {
      try {
        await deleteDocument({ id: target.id, type: target.deletableType! })
        setDeleteTarget(null)
        router.refresh()
      } catch (error) {
        setDeleteError(error instanceof Error ? error.message : 'Delete failed')
      }
    })
  }

  if (items.length === 0) {
    return (
      <EmptyState
        title={emptyTitle}
        description={emptyDescription}
      />
    )
  }

  return (
    <div className="space-y-3">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative min-w-[220px] flex-1 sm:max-w-md">
          <Search
            className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-[var(--admin-text-muted)]"
            aria-hidden
          />
          <Input
            className="pl-9"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={placeholder}
            aria-label={placeholder}
          />
        </div>
        {hasStatuses ? (
          <div className="flex gap-2" role="group" aria-label="Filter by status">
            {STATUS_FILTERS.map((filter) => (
              <Button
                key={filter.id}
                size="sm"
                variant={statusFilter === filter.id ? 'default' : 'outline'}
                onClick={() => setStatusFilter(filter.id)}
                aria-pressed={statusFilter === filter.id}
              >
                {filter.label}
              </Button>
            ))}
          </div>
        ) : null}
      </div>
      {filtered.length === 0 ? (
        <p className="rounded-[var(--admin-radius-sm)] border border-dashed border-[var(--admin-border)] px-4 py-6 text-center text-sm text-[var(--admin-text-muted)]">
          {query.trim()
            ? `No matches for “${query}”.`
            : `No ${statusFilter === 'draft' ? 'draft' : 'published'} items.`}
        </p>
      ) : (
        <div className={gridClassName}>
          {filtered.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              className="group flex flex-wrap items-center gap-x-4 gap-y-2 rounded-[var(--admin-radius)] border border-[var(--admin-border)] bg-white px-4 py-3 shadow-[var(--admin-shadow)] transition hover:border-[var(--admin-blue)]"
            >
              <div className="min-w-0 flex-1 basis-48">
                <p className="truncate font-bold text-[var(--admin-navy)]">{item.title}</p>
                {item.subtitle ? (
                  <p className="truncate text-xs text-[var(--admin-text-muted)]">{item.subtitle}</p>
                ) : null}
              </div>
              <div className="flex min-w-0 flex-wrap items-center justify-end gap-2">
                {item.status ? (
                  <Badge tone={item.status === 'draft' ? 'warning' : 'success'}>
                    {item.status === 'draft' ? 'Draft' : 'Published'}
                  </Badge>
                ) : null}
                {item.badges?.map((badge) => (
                  <Badge key={`${item.id}-${badge.label}`} tone={badge.tone}>
                    {badge.label}
                  </Badge>
                ))}
                {item.deletableType ? (
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-[var(--admin-text-muted)] hover:bg-red-50 hover:text-[var(--admin-danger)]"
                    aria-label={`Delete ${item.title}`}
                    disabled={pending}
                    onClick={(event) => {
                      event.preventDefault()
                      event.stopPropagation()
                      setDeleteError(null)
                      setDeleteTarget(item)
                    }}
                  >
                    <Trash2 className="h-4 w-4" aria-hidden />
                  </Button>
                ) : null}
                <ChevronRight className="h-5 w-5 text-[var(--admin-text-muted)]" aria-hidden />
              </div>
            </Link>
          ))}
        </div>
      )}

      <ConfirmDialog
        open={Boolean(deleteTarget)}
        title={`Delete “${deleteTarget?.title || ''}”?`}
        description={
          deleteError
            ? `Delete failed: ${deleteError}. Try again or cancel.`
            : 'This removes the published and draft versions and cannot be undone.'
        }
        confirmLabel="Delete"
        destructive
        pending={pending}
        pendingLabel="Deleting…"
        onConfirm={performDelete}
        onCancel={() => {
          if (!pending) {
            setDeleteTarget(null)
            setDeleteError(null)
          }
        }}
      />
    </div>
  )
}
