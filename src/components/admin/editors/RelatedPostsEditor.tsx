'use client'

import { Label } from '@/components/ui/label'

export type RelatedPostOption = {
  id: string
  title: string
  slug: string
}

type RelatedPostsEditorProps = {
  value: unknown
  options: RelatedPostOption[]
  disabled?: boolean
  onChange: (
    next: Array<{ _type: 'reference'; _ref: string; _key: string }>
  ) => void
}

const asRefs = (value: unknown) => {
  if (!Array.isArray(value)) return [] as string[]
  return value
    .map((item) => {
      if (!item || typeof item !== 'object') return ''
      return String((item as { _ref?: string })._ref || '')
    })
    .filter(Boolean)
}

export const RelatedPostsEditor = ({
  value,
  options,
  disabled,
  onChange,
}: RelatedPostsEditorProps) => {
  const selected = new Set(asRefs(value))

  const handleToggle = (id: string) => {
    const next = new Set(selected)
    if (next.has(id)) next.delete(id)
    else next.add(id)
    onChange(
      Array.from(next).map((ref) => ({
        _type: 'reference' as const,
        _ref: ref,
        _key: ref.replace(/^drafts\./, ''),
      }))
    )
  }

  return (
    <div className="space-y-3">
      <Label>Choose related articles</Label>
      <p className="text-xs text-[var(--admin-text-muted)]">
        Tick articles to show in the “Related” block after this post. Aim for 2–4 relevant
        picks.
      </p>
      {!options.length ? (
        <p className="text-sm text-[var(--admin-text-muted)]">
          No other articles available yet. Publish another post first, then come back here.
        </p>
      ) : (
        <div className="space-y-2">
          {options.map((post) => (
            <label
              key={post.id}
              className="flex items-start gap-3 rounded-lg border border-[var(--admin-border)] px-3 py-2 text-sm"
            >
              <input
                type="checkbox"
                className="mt-1"
                disabled={disabled}
                checked={selected.has(post.id)}
                onChange={() => handleToggle(post.id)}
                aria-label={`Related article: ${post.title}`}
              />
              <span>
                <span className="font-medium">{post.title}</span>
                <span className="block text-xs text-[var(--admin-text-muted)]">
                  /articles/{post.slug}
                </span>
              </span>
            </label>
          ))}
        </div>
      )}
    </div>
  )
}
