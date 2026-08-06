'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { ChevronRight, Search } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { EmptyState } from '@/components/ui/empty-state'
import { Input } from '@/components/ui/input'

export type ContentListItem = {
  id: string
  href: string
  title: string
  subtitle?: string
  badges?: { label: string; tone?: 'default' | 'info' | 'success' | 'warning' | 'danger' }[]
  searchText?: string
}

type ContentListSearchProps = {
  items: ContentListItem[]
  emptyTitle: string
  emptyDescription: string
  placeholder?: string
  gridClassName?: string
}

export const ContentListSearch = ({
  items,
  emptyTitle,
  emptyDescription,
  placeholder = 'Search…',
  gridClassName = 'grid gap-3',
}: ContentListSearchProps) => {
  const [query, setQuery] = useState('')

  const filtered = useMemo(() => {
    if (!query.trim()) return items
    const q = query.toLowerCase()
    return items.filter((item) => {
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
  }, [items, query])

  if (items.length === 0) {
    return (
      <EmptyState
        title={emptyTitle}
        description={emptyDescription}
      />
    )
  }

  return (
    <div className="space-y-4">
      <div className="relative max-w-md">
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
      {filtered.length === 0 ? (
        <p className="rounded-[var(--admin-radius-sm)] border border-dashed border-[var(--admin-border)] px-4 py-8 text-center text-sm text-[var(--admin-text-muted)]">
          No matches for “{query}”.
        </p>
      ) : (
        <div className={gridClassName}>
          {filtered.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              className="group flex items-center justify-between gap-4 rounded-[var(--admin-radius)] border border-[var(--admin-border)] bg-white p-4 shadow-[var(--admin-shadow)] transition hover:border-[var(--admin-blue)]"
            >
              <div className="min-w-0">
                <p className="font-bold text-[var(--admin-navy)]">{item.title}</p>
                {item.subtitle ? (
                  <p className="text-xs text-[var(--admin-text-muted)]">{item.subtitle}</p>
                ) : null}
              </div>
              <div className="flex items-center gap-2">
                {item.badges?.map((badge) => (
                  <Badge key={`${item.id}-${badge.label}`} tone={badge.tone}>
                    {badge.label}
                  </Badge>
                ))}
                <ChevronRight className="h-5 w-5 text-[var(--admin-text-muted)]" aria-hidden />
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
