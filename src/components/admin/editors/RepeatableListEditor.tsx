'use client'

import { ChevronDown, ChevronUp, Plus, Trash2 } from 'lucide-react'
import { ImageField } from '@/components/admin/ImageField'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

export type RepeatableItem = Record<string, string | boolean | string[] | undefined>

export type FieldSpec = {
  key: string
  label: string
  type?: 'text' | 'textarea' | 'image' | 'select' | 'boolean' | 'stringList'
  options?: { label: string; value: string }[]
  placeholder?: string
}

type RepeatableListEditorProps = {
  label: string
  items: RepeatableItem[]
  fields: FieldSpec[]
  onChange: (items: RepeatableItem[]) => void
  disabled?: boolean
  addLabel?: string
}

const blankItem = (fields: FieldSpec[]): RepeatableItem => {
  const blank: RepeatableItem = {}
  for (const field of fields) {
    if (field.type === 'boolean') blank[field.key] = false
    else if (field.type === 'stringList') blank[field.key] = []
    else blank[field.key] = ''
  }
  return blank
}

export const RepeatableListEditor = ({
  label,
  items,
  fields,
  onChange,
  disabled,
  addLabel = 'Add item',
}: RepeatableListEditorProps) => {
  const list = Array.isArray(items) ? items : []

  const handleChange = (index: number, key: string, value: string | boolean | string[]) => {
    const next = list.map((item, i) => (i === index ? { ...item, [key]: value } : item))
    onChange(next)
  }

  const handleAdd = () => {
    onChange([...list, blankItem(fields)])
  }

  const handleRemove = (index: number) => {
    onChange(list.filter((_, i) => i !== index))
  }

  const handleMove = (index: number, direction: -1 | 1) => {
    const target = index + direction
    if (target < 0 || target >= list.length) return
    const next = [...list]
    const [item] = next.splice(index, 1)
    next.splice(target, 0, item)
    onChange(next)
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between gap-3">
        <Label className="mb-0">{label}</Label>
        <Button type="button" variant="soft" size="sm" disabled={disabled} onClick={handleAdd}>
          <Plus className="h-3.5 w-3.5" aria-hidden />
          {addLabel}
        </Button>
      </div>
      {list.length === 0 ? (
        <p className="rounded-[var(--admin-radius-sm)] border border-dashed border-[var(--admin-border)] px-3 py-4 text-sm text-[var(--admin-text-muted)]">
          No items yet. Click “{addLabel}” to create one.
        </p>
      ) : (
        list.map((item, index) => (
          <div
            key={index}
            className="space-y-3 rounded-[var(--admin-radius-sm)] border border-[var(--admin-border)] bg-slate-50/70 p-3"
          >
            <div className="flex flex-wrap items-center justify-between gap-2">
              <p className="text-xs font-bold tracking-wide text-[var(--admin-text-muted)] uppercase">
                Item {index + 1}
              </p>
              <div className="flex flex-wrap items-center gap-1">
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  disabled={disabled || index === 0}
                  onClick={() => handleMove(index, -1)}
                  aria-label={`Move item ${index + 1} up`}
                >
                  <ChevronUp className="h-4 w-4" />
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  disabled={disabled || index === list.length - 1}
                  onClick={() => handleMove(index, 1)}
                  aria-label={`Move item ${index + 1} down`}
                >
                  <ChevronDown className="h-4 w-4" />
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  disabled={disabled}
                  onClick={() => handleRemove(index)}
                  aria-label={`Remove item ${index + 1}`}
                >
                  <Trash2 className="h-3.5 w-3.5" aria-hidden />
                  Remove
                </Button>
              </div>
            </div>
            {fields.map((field) => {
              const id = `${field.key}-${index}`
              if (field.type === 'image') {
                return (
                  <ImageField
                    key={field.key}
                    label={field.label}
                    value={String(item[field.key] || '')}
                    disabled={disabled}
                    onChange={(url) => handleChange(index, field.key, url)}
                  />
                )
              }
              if (field.type === 'boolean') {
                return (
                  <label key={field.key} className="flex items-center gap-2 text-sm font-medium">
                    <input
                      type="checkbox"
                      checked={Boolean(item[field.key])}
                      disabled={disabled}
                      onChange={(e) => handleChange(index, field.key, e.target.checked)}
                    />
                    {field.label}
                  </label>
                )
              }
              if (field.type === 'select' && field.options) {
                return (
                  <div key={field.key}>
                    <Label htmlFor={id}>{field.label}</Label>
                    <select
                      id={id}
                      className="flex h-10 w-full rounded-[var(--admin-radius-sm)] border border-[var(--admin-border)] bg-white px-3 text-sm"
                      value={String(item[field.key] || '')}
                      disabled={disabled}
                      onChange={(e) => handleChange(index, field.key, e.target.value)}
                      aria-label={field.label}
                    >
                      <option value="">Select…</option>
                      {field.options.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                  </div>
                )
              }
              if (field.type === 'stringList') {
                const lines = Array.isArray(item[field.key])
                  ? (item[field.key] as string[]).join('\n')
                  : String(item[field.key] || '')
                return (
                  <div key={field.key}>
                    <Label htmlFor={id}>{field.label}</Label>
                    <Textarea
                      id={id}
                      rows={3}
                      value={lines}
                      disabled={disabled}
                      placeholder={field.placeholder || 'One item per line'}
                      onChange={(e) =>
                        handleChange(
                          index,
                          field.key,
                          e.target.value
                            .split('\n')
                            .map((line) => line.trim())
                            .filter(Boolean)
                        )
                      }
                    />
                  </div>
                )
              }
              if (field.type === 'textarea') {
                return (
                  <div key={field.key}>
                    <Label htmlFor={id}>{field.label}</Label>
                    <Textarea
                      id={id}
                      rows={2}
                      value={String(item[field.key] || '')}
                      disabled={disabled}
                      onChange={(e) => handleChange(index, field.key, e.target.value)}
                    />
                  </div>
                )
              }
              return (
                <div key={field.key}>
                  <Label htmlFor={id}>{field.label}</Label>
                  <Input
                    id={id}
                    value={String(item[field.key] || '')}
                    disabled={disabled}
                    placeholder={field.placeholder}
                    onChange={(e) => handleChange(index, field.key, e.target.value)}
                  />
                </div>
              )
            })}
          </div>
        ))
      )}
    </div>
  )
}
