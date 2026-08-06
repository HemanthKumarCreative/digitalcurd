'use client'

import { useMemo, useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { patchDocument } from '@/lib/admin/actions'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { useToast } from '@/components/ui/toast'
import { Badge } from '@/components/ui/badge'

export type FieldDef =
  | {
      name: string
      label: string
      type: 'text' | 'textarea' | 'url' | 'datetime' | 'boolean'
      rows?: number
    }
  | {
      name: string
      label: string
      type: 'json'
      description?: string
    }

type DocumentEditorProps = {
  documentId: string
  documentType: string
  title: string
  description?: string
  fields: FieldDef[]
  initialValues: Record<string, unknown>
  readOnly?: boolean
  previewPath?: string
}

const buildSchema = (fields: FieldDef[]) => {
  const shape: Record<string, z.ZodTypeAny> = {}
  for (const field of fields) {
    if (field.type === 'boolean') {
      shape[field.name] = z.boolean().optional()
    } else if (field.type === 'json') {
      shape[field.name] = z.string().optional()
    } else {
      shape[field.name] = z.string().optional()
    }
  }
  return z.object(shape)
}

const flattenInitial = (fields: FieldDef[], values: Record<string, unknown>) => {
  const out: Record<string, unknown> = {}
  for (const field of fields) {
    const value = values[field.name]
    if (field.type === 'json') {
      out[field.name] = value == null ? '' : JSON.stringify(value, null, 2)
    } else if (field.type === 'boolean') {
      out[field.name] = Boolean(value)
    } else {
      out[field.name] = value == null ? '' : String(value)
    }
  }
  return out
}

export const DocumentEditor = ({
  documentId,
  documentType,
  title,
  description,
  fields,
  initialValues,
  readOnly,
  previewPath,
}: DocumentEditorProps) => {
  const router = useRouter()
  const { push } = useToast()
  const [pending, startTransition] = useTransition()
  const [status, setStatus] = useState<'idle' | 'saved' | 'published'>('idle')
  const schema = useMemo(() => buildSchema(fields), [fields])

  const form = useForm<Record<string, unknown>>({
    resolver: zodResolver(schema),
    defaultValues: flattenInitial(fields, initialValues),
  })

  const toPayload = (values: Record<string, unknown>) => {
    const set: Record<string, unknown> = {}
    for (const field of fields) {
      const raw = values[field.name]
      if (field.type === 'json') {
        const text = String(raw || '').trim()
        if (!text) continue
        try {
          set[field.name] = JSON.parse(text)
        } catch {
          throw new Error(`Invalid JSON in ${field.label}`)
        }
      } else if (field.type === 'boolean') {
        set[field.name] = Boolean(raw)
      } else {
        set[field.name] = raw
      }
    }
    return set
  }

  const handleSave = (publish: boolean) => {
    startTransition(async () => {
      try {
        const values = form.getValues()
        const set = toPayload(values)
        await patchDocument({
          id: documentId,
          type: documentType,
          set,
          publish,
        })
        setStatus(publish ? 'published' : 'saved')
        push({
          title: publish ? 'Published' : 'Draft saved',
          description: `${title} updated successfully`,
          tone: 'success',
        })
        router.refresh()
      } catch (error) {
        push({
          title: 'Save failed',
          description: error instanceof Error ? error.message : 'Unknown error',
          tone: 'danger',
        })
      }
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[var(--primary)]">{title}</h1>
          {description ? <p className="mt-1 text-sm text-slate-600">{description}</p> : null}
          <div className="mt-2 flex flex-wrap gap-2">
            <Badge>{documentType}</Badge>
            {status !== 'idle' ? (
              <Badge tone={status === 'published' ? 'success' : 'warning'}>
                {status === 'published' ? 'Published' : 'Draft saved'}
              </Badge>
            ) : null}
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          {previewPath ? (
            <Button
              variant="outline"
              onClick={() => router.push(`/admin/preview?path=${encodeURIComponent(previewPath)}`)}
            >
              Preview
            </Button>
          ) : null}
          <Button
            variant="outline"
            disabled={readOnly || pending}
            onClick={() => handleSave(false)}
          >
            Save draft
          </Button>
          <Button disabled={readOnly || pending} onClick={() => handleSave(true)}>
            Publish
          </Button>
        </div>
      </div>

      <form
        className="grid gap-4"
        onSubmit={(e) => {
          e.preventDefault()
          handleSave(false)
        }}
      >
        {fields.map((field) => (
          <div key={field.name} className="rounded-xl border border-slate-200 bg-white p-4">
            <Label htmlFor={field.name}>{field.label}</Label>
            {field.type === 'textarea' || field.type === 'json' ? (
              <Textarea
                id={field.name}
                rows={field.type === 'json' ? 12 : field.rows || 4}
                disabled={readOnly}
                {...form.register(field.name)}
              />
            ) : field.type === 'boolean' ? (
              <label className="mt-2 flex items-center gap-2 text-sm">
                <input type="checkbox" disabled={readOnly} {...form.register(field.name)} />
                Enabled
              </label>
            ) : (
              <Input
                id={field.name}
                type={field.type === 'datetime' ? 'datetime-local' : field.type === 'url' ? 'url' : 'text'}
                disabled={readOnly}
                {...form.register(field.name)}
              />
            )}
            {field.type === 'json' && 'description' in field && field.description ? (
              <p className="mt-1 text-xs text-slate-500">{field.description}</p>
            ) : null}
          </div>
        ))}
      </form>
    </div>
  )
}
