'use client'

import Link from 'next/link'
import { Label } from '@/components/ui/label'

export type AuthorOption = {
  id: string
  name: string
  role?: string
}

type AuthorRefEditorProps = {
  value: unknown
  options: AuthorOption[]
  disabled?: boolean
  onChange: (next: { _type: 'reference'; _ref: string } | null) => void
}

const getRef = (value: unknown) => {
  if (!value || typeof value !== 'object') return ''
  const ref = (value as { _ref?: string })._ref
  return ref || ''
}

export const AuthorRefEditor = ({
  value,
  options,
  disabled,
  onChange,
}: AuthorRefEditorProps) => {
  const current = getRef(value)

  return (
    <div className="space-y-2">
      <Label>Author</Label>
      <select
        className="flex h-10 w-full rounded-md border border-[var(--admin-border)] bg-transparent px-3 text-sm"
        disabled={disabled}
        value={current}
        onChange={(e) => {
          const next = e.target.value
          if (!next) {
            onChange(null)
            return
          }
          onChange({ _type: 'reference', _ref: next })
        }}
      >
        <option value="">No author</option>
        {options.map((author) => (
          <option key={author.id} value={author.id}>
            {author.name}
            {author.role ? ` — ${author.role}` : ''}
          </option>
        ))}
      </select>
      <p className="text-xs text-[var(--admin-text-muted)]">
        Manage authors in{' '}
        <Link href="/admin/authors" className="underline">
          Authors
        </Link>
        .
      </p>
    </div>
  )
}
