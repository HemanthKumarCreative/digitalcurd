'use client'

import { ImageField } from '@/components/admin/ImageField'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

export type HeroValue = {
  eyebrow?: string
  title?: string
  subtitle?: string
  description?: string
  backgroundUrl?: string
  ctaText?: string
  ctaLink?: string
  cta?: { label?: string; href?: string }
  secondaryCta?: { label?: string; href?: string }
  awards?: string[]
}

type HeroEditorProps = {
  value: HeroValue
  onChange: (value: HeroValue) => void
  disabled?: boolean
  mode?: 'page' | 'home'
}

export const HeroEditor = ({ value, onChange, disabled, mode = 'page' }: HeroEditorProps) => {
  const set = (patch: Partial<HeroValue>) => onChange({ ...value, ...patch })

  return (
    <div className="grid gap-4">
      {mode === 'page' ? (
        <div>
          <Label htmlFor="hero-eyebrow">Eyebrow</Label>
          <Input
            id="hero-eyebrow"
            value={value.eyebrow || ''}
            disabled={disabled}
            onChange={(e) => set({ eyebrow: e.target.value })}
          />
        </div>
      ) : null}
      <div>
        <Label htmlFor="hero-title">Title</Label>
        <Input
          id="hero-title"
          value={value.title || ''}
          disabled={disabled}
          onChange={(e) => set({ title: e.target.value })}
        />
      </div>
      <div>
        <Label htmlFor="hero-subtitle">Subtitle</Label>
        <Input
          id="hero-subtitle"
          value={value.subtitle || ''}
          disabled={disabled}
          onChange={(e) => set({ subtitle: e.target.value })}
        />
      </div>
      <div>
        <Label htmlFor="hero-description">Description</Label>
        <Textarea
          id="hero-description"
          rows={3}
          value={value.description || ''}
          disabled={disabled}
          onChange={(e) => set({ description: e.target.value })}
        />
      </div>
      <ImageField
        label="Background image"
        value={value.backgroundUrl || ''}
        disabled={disabled}
        onChange={(backgroundUrl) => set({ backgroundUrl })}
        helper="Pick from Media library or paste a URL"
      />
      {mode === 'home' ? (
        <>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label htmlFor="hero-cta-text">CTA label</Label>
              <Input
                id="hero-cta-text"
                value={value.ctaText || ''}
                disabled={disabled}
                onChange={(e) => set({ ctaText: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="hero-cta-link">CTA link</Label>
              <Input
                id="hero-cta-link"
                value={value.ctaLink || ''}
                disabled={disabled}
                onChange={(e) => set({ ctaLink: e.target.value })}
              />
            </div>
          </div>
          <div>
            <Label htmlFor="hero-awards">Awards (one per line)</Label>
            <Textarea
              id="hero-awards"
              rows={3}
              value={(value.awards || []).join('\n')}
              disabled={disabled}
              onChange={(e) =>
                set({
                  awards: e.target.value
                    .split('\n')
                    .map((line) => line.trim())
                    .filter(Boolean),
                })
              }
            />
          </div>
        </>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <Label htmlFor="hero-cta-label">Primary CTA label</Label>
            <Input
              id="hero-cta-label"
              value={value.cta?.label || ''}
              disabled={disabled}
              onChange={(e) => set({ cta: { ...value.cta, label: e.target.value } })}
            />
          </div>
          <div>
            <Label htmlFor="hero-cta-href">Primary CTA link</Label>
            <Input
              id="hero-cta-href"
              value={value.cta?.href || ''}
              disabled={disabled}
              onChange={(e) => set({ cta: { ...value.cta, href: e.target.value } })}
            />
          </div>
          <div>
            <Label htmlFor="hero-secondary-label">Secondary CTA label</Label>
            <Input
              id="hero-secondary-label"
              value={value.secondaryCta?.label || ''}
              disabled={disabled}
              onChange={(e) =>
                set({ secondaryCta: { ...value.secondaryCta, label: e.target.value } })
              }
            />
          </div>
          <div>
            <Label htmlFor="hero-secondary-href">Secondary CTA link</Label>
            <Input
              id="hero-secondary-href"
              value={value.secondaryCta?.href || ''}
              disabled={disabled}
              onChange={(e) =>
                set({ secondaryCta: { ...value.secondaryCta, href: e.target.value } })
              }
            />
          </div>
        </div>
      )}
    </div>
  )
}
