'use client'

import { useLayoutEffect, useRef } from 'react'
import {
  postDesignFieldChange,
  useDesignMode,
} from '@/components/design-mode/DesignModeProvider'
import { cn } from '@/lib/utils'

type EditableTextProps = {
  path: string
  label: string
  value: string
  as?: 'span' | 'p' | 'h1' | 'h2' | 'h3' | 'h4' | 'div'
  className?: string
  multiline?: boolean
}

export const EditableText = ({
  path,
  label,
  value,
  as = 'span',
  className,
  multiline,
}: EditableTextProps) => {
  const { enabled, documentId, documentType } = useDesignMode()
  const ref = useRef<HTMLElement>(null)
  const lastSaved = useRef(value)
  const Tag = as

  // Design mode turns on after mount (iframe gate). Sync before paint so fields are never blank.
  useLayoutEffect(() => {
    lastSaved.current = value || ''
    if (!enabled || !ref.current) return
    if (document.activeElement === ref.current) return
    ref.current.textContent = value || ''
  }, [value, enabled])

  if (!enabled || !documentId || !documentType) {
    return <Tag className={className}>{value}</Tag>
  }

  const handleBlur = () => {
    const next = (ref.current?.innerText || '').replace(/\u00a0/g, ' ').trimEnd()
    if (next === lastSaved.current) return
    lastSaved.current = next
    postDesignFieldChange({
      documentId,
      documentType,
      path,
      value: next,
      label,
    })
  }

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Escape') {
      event.preventDefault()
      if (ref.current) ref.current.textContent = lastSaved.current
      ref.current?.blur()
    }
    if (!multiline && event.key === 'Enter') {
      event.preventDefault()
      ref.current?.blur()
    }
  }

  return (
    <Tag
      // @ts-expect-error ref polymorphism
      ref={ref}
      className={cn(className)}
      contentEditable
      suppressContentEditableWarning
      data-dc-editable="text"
      data-dc-path={path}
      data-dc-label={label}
      onBlur={handleBlur}
      onKeyDown={handleKeyDown}
      onPaste={(event) => {
        event.preventDefault()
        const text = event.clipboardData.getData('text/plain')
        document.execCommand('insertText', false, text)
      }}
    />
  )
}
