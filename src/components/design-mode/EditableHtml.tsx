'use client'

import { useLayoutEffect, useRef } from 'react'
import {
  postDesignFieldChange,
  useDesignMode,
} from '@/components/design-mode/DesignModeProvider'
import {
  editableTextToHtml,
  htmlToEditableText,
} from '@/lib/design-mode/html'
import { cn } from '@/lib/utils'

type EditableHtmlProps = {
  path: string
  label: string
  html: string
  className?: string
}

export const EditableHtml = ({ path, label, html, className }: EditableHtmlProps) => {
  const { enabled, documentId, documentType } = useDesignMode()
  const ref = useRef<HTMLDivElement>(null)
  const lastSaved = useRef(html)

  useLayoutEffect(() => {
    lastSaved.current = html
    if (!ref.current) return
    if (document.activeElement === ref.current) return
    if (enabled) {
      ref.current.innerText = htmlToEditableText(html)
    }
  }, [html, enabled])

  if (!enabled || !documentId || !documentType) {
    return (
      <div
        className={cn(className)}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    )
  }

  const handleBlur = () => {
    const plain = (ref.current?.innerText || '').replace(/\u00a0/g, ' ')
    const nextHtml = editableTextToHtml(plain)
    if (nextHtml === lastSaved.current) return
    lastSaved.current = nextHtml
    postDesignFieldChange({
      documentId,
      documentType,
      path,
      value: nextHtml,
      label,
    })
  }

  return (
    <div
      ref={ref}
      className={cn(className)}
      contentEditable
      suppressContentEditableWarning
      data-dc-editable="html"
      data-dc-path={path}
      data-dc-label={label}
      onBlur={handleBlur}
      onKeyDown={(event) => {
        if (event.key === 'Escape') {
          event.preventDefault()
          if (ref.current) ref.current.innerText = htmlToEditableText(lastSaved.current)
          ref.current?.blur()
        }
      }}
      onPaste={(event) => {
        event.preventDefault()
        const text = event.clipboardData.getData('text/plain')
        document.execCommand('insertText', false, text)
      }}
    />
  )
}
