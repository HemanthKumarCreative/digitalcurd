'use client'

import { useState } from 'react'
import { ImagePlus, Trash2 } from 'lucide-react'
import { MediaPickerDialog, type MediaAsset } from '@/components/admin/MediaPickerDialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

type ImageFieldProps = {
  label: string
  value?: string
  onChange: (url: string) => void
  disabled?: boolean
  helper?: string
}

export const ImageField = ({ label, value, onChange, disabled, helper }: ImageFieldProps) => {
  const [open, setOpen] = useState(false)

  const handleSelect = (asset: MediaAsset) => {
    if (asset.url) onChange(asset.url)
  }

  return (
    <div>
      <Label>{label}</Label>
      <div className="mt-1.5 flex flex-col gap-3 sm:flex-row">
        <div className="flex aspect-video w-full max-w-[220px] items-center justify-center overflow-hidden rounded-[var(--admin-radius-sm)] border border-dashed border-[var(--admin-border-strong)] bg-slate-50">
          {value ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={value} alt="" className="h-full w-full object-cover" />
          ) : (
            <div className="flex flex-col items-center gap-1 text-[var(--admin-text-muted)]">
              <ImagePlus className="h-6 w-6" aria-hidden />
              <span className="text-xs">No image</span>
            </div>
          )}
        </div>
        <div className="min-w-0 flex-1 space-y-2">
          <Input
            value={value || ''}
            onChange={(e) => onChange(e.target.value)}
            disabled={disabled}
            placeholder="https://… or pick from media"
            aria-label={`${label} URL`}
          />
          <div className="flex flex-wrap gap-2">
            <Button
              type="button"
              variant="soft"
              size="sm"
              disabled={disabled}
              onClick={() => setOpen(true)}
            >
              Choose from media
            </Button>
            {value ? (
              <Button
                type="button"
                variant="outline"
                size="sm"
                disabled={disabled}
                onClick={() => onChange('')}
              >
                <Trash2 className="h-3.5 w-3.5" aria-hidden />
                Clear
              </Button>
            ) : null}
          </div>
          {helper ? <p className="text-xs text-[var(--admin-text-muted)]">{helper}</p> : null}
        </div>
      </div>
      <MediaPickerDialog open={open} onClose={() => setOpen(false)} onSelect={handleSelect} />
    </div>
  )
}
