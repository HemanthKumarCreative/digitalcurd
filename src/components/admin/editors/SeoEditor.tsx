'use client'

import type { ReactNode } from 'react'
import { ImageField } from '@/components/admin/ImageField'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

export type SeoValue = {
  title?: string
  description?: string
  canonical?: string
  keywords?: string[]
  robots?: string
  ogImageUrl?: string
  twitterImageUrl?: string
  schemaJson?: string
}

type SeoEditorProps = {
  value: SeoValue
  onChange: (value: SeoValue) => void
  disabled?: boolean
}

const FieldHint = ({ children }: { children: ReactNode }) => (
  <p className="mt-1 text-xs text-[var(--admin-text-muted)]">{children}</p>
)

export const SeoEditor = ({ value, onChange, disabled }: SeoEditorProps) => {
  const set = (patch: Partial<SeoValue>) => onChange({ ...value, ...patch })

  return (
    <div className="grid gap-4">
      <div>
        <Label htmlFor="seo-title">Meta title</Label>
        <Input
          id="seo-title"
          value={value.title || ''}
          disabled={disabled}
          onChange={(e) => set({ title: e.target.value })}
          placeholder="Title shown in Google results"
        />
        <FieldHint>
          ~50–60 characters. If empty, the page title is used.
        </FieldHint>
      </div>
      <div>
        <Label htmlFor="seo-description">Meta description</Label>
        <Textarea
          id="seo-description"
          rows={3}
          value={value.description || ''}
          disabled={disabled}
          onChange={(e) => set({ description: e.target.value })}
          placeholder="One or two sentences that appear under the title in search results"
        />
        <FieldHint>
          ~140–160 characters. If empty, the short summary / excerpt is used when available.
        </FieldHint>
      </div>
      <div>
        <Label htmlFor="seo-canonical">Canonical URL</Label>
        <Input
          id="seo-canonical"
          type="url"
          value={value.canonical || ''}
          disabled={disabled}
          onChange={(e) => set({ canonical: e.target.value })}
          placeholder="https://yoursite.com/blog/your-slug"
        />
        <FieldHint>
          Optional. Only set this if this page should point search engines to a different URL.
        </FieldHint>
      </div>
      <div>
        <Label htmlFor="seo-keywords">Keywords</Label>
        <Input
          id="seo-keywords"
          value={(value.keywords || []).join(', ')}
          disabled={disabled}
          onChange={(e) =>
            set({
              keywords: e.target.value
                .split(',')
                .map((k) => k.trim())
                .filter(Boolean),
            })
          }
          placeholder="ai development, software outsourcing, …"
        />
        <FieldHint>Optional. Separate keywords with commas.</FieldHint>
      </div>
      <div>
        <Label htmlFor="seo-robots">Search indexing</Label>
        <select
          id="seo-robots"
          className="flex h-10 w-full rounded-[var(--admin-radius-sm)] border border-[var(--admin-border)] bg-white px-3 text-sm"
          value={value.robots || 'index,follow'}
          disabled={disabled}
          onChange={(e) => set({ robots: e.target.value })}
          aria-label="Search indexing"
        >
          <option value="index,follow">Allow Google to index (recommended)</option>
          <option value="noindex,follow">Hide from Google, still follow links</option>
          <option value="index,nofollow">Index page, don’t follow links</option>
          <option value="noindex,nofollow">Hide from Google and don’t follow links</option>
        </select>
        <FieldHint>
          Use “Allow Google to index” for normal published articles. Use “Hide from Google” for
          drafts or private pages.
        </FieldHint>
      </div>
      <ImageField
        label="Social share image (Open Graph)"
        value={value.ogImageUrl || ''}
        disabled={disabled}
        onChange={(ogImageUrl) => set({ ogImageUrl })}
        helper="Shown when the link is shared on LinkedIn, Facebook, etc. Falls back to the cover image if empty."
      />
      <ImageField
        label="Twitter / X share image"
        value={value.twitterImageUrl || ''}
        disabled={disabled}
        onChange={(twitterImageUrl) => set({ twitterImageUrl })}
        helper="Optional. Falls back to the Open Graph image or cover image if empty."
      />
    </div>
  )
}
