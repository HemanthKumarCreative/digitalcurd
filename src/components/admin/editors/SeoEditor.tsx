'use client'

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
        />
      </div>
      <div>
        <Label htmlFor="seo-description">Meta description</Label>
        <Textarea
          id="seo-description"
          rows={3}
          value={value.description || ''}
          disabled={disabled}
          onChange={(e) => set({ description: e.target.value })}
        />
      </div>
      <div>
        <Label htmlFor="seo-canonical">Canonical URL</Label>
        <Input
          id="seo-canonical"
          type="url"
          value={value.canonical || ''}
          disabled={disabled}
          onChange={(e) => set({ canonical: e.target.value })}
        />
      </div>
      <div>
        <Label htmlFor="seo-keywords">Keywords (comma separated)</Label>
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
        />
      </div>
      <div>
        <Label htmlFor="seo-robots">Robots</Label>
        <select
          id="seo-robots"
          className="flex h-10 w-full rounded-[var(--admin-radius-sm)] border border-[var(--admin-border)] bg-white px-3 text-sm"
          value={value.robots || 'index,follow'}
          disabled={disabled}
          onChange={(e) => set({ robots: e.target.value })}
        >
          <option value="index,follow">Index, follow</option>
          <option value="noindex,follow">No index, follow</option>
          <option value="index,nofollow">Index, no follow</option>
          <option value="noindex,nofollow">No index, no follow</option>
        </select>
      </div>
      <ImageField
        label="Open Graph image"
        value={value.ogImageUrl || ''}
        disabled={disabled}
        onChange={(ogImageUrl) => set({ ogImageUrl })}
      />
      <ImageField
        label="Twitter image"
        value={value.twitterImageUrl || ''}
        disabled={disabled}
        onChange={(twitterImageUrl) => set({ twitterImageUrl })}
      />
    </div>
  )
}
