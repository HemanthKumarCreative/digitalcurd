'use client'

import { useEffect, useState } from 'react'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  editableTextToHtml,
  htmlToEditableText,
  looksLikeHtml,
} from '@/lib/design-mode/html'

type HtmlTextFieldProps = {
  label: string
  value: string
  onChange: (html: string) => void
  disabled?: boolean
  rows?: number
}

/** Form Mode field: edit HTML content as readable plain text / bullets. */
export const HtmlTextField = ({
  label,
  value,
  onChange,
  disabled,
  rows = 6,
}: HtmlTextFieldProps) => {
  const [text, setText] = useState(() =>
    looksLikeHtml(value) ? htmlToEditableText(value) : value
  )

  useEffect(() => {
    setText(looksLikeHtml(value) ? htmlToEditableText(value) : value)
  }, [value])

  return (
    <div>
      <Label>{label}</Label>
      <Textarea
        rows={rows}
        value={text}
        disabled={disabled}
        onChange={(e) => {
          const next = e.target.value
          setText(next)
          onChange(editableTextToHtml(next))
        }}
      />
      <p className="mt-1 text-xs text-[var(--admin-text-muted)]">
        Shown as readable text. Use a blank line for paragraphs and lines starting with • for
        bullets. Formatting is preserved on save.
      </p>
    </div>
  )
}
