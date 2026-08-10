'use client'

import { useRef } from 'react'
import { AlertTriangle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useModalFocus } from '@/components/ui/use-modal-focus'

type ConfirmDialogProps = {
  open: boolean
  title: string
  description?: string
  confirmLabel?: string
  cancelLabel?: string
  /** Styles the confirm button red and shows a warning icon */
  destructive?: boolean
  /** Disables actions and shows this label on the confirm button while true */
  pending?: boolean
  pendingLabel?: string
  /** Optional third action rendered between Cancel and Confirm (e.g. "Save draft & leave") */
  alternateLabel?: string
  onAlternate?: () => void
  onConfirm: () => void
  onCancel: () => void
}

export const ConfirmDialog = ({
  open,
  title,
  description,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  destructive,
  pending,
  pendingLabel,
  alternateLabel,
  onAlternate,
  onConfirm,
  onCancel,
}: ConfirmDialogProps) => {
  const panelRef = useRef<HTMLDivElement>(null)
  useModalFocus(panelRef, open, onCancel)

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-[var(--admin-navy)]/40 p-4 backdrop-blur-[1px]"
      role="presentation"
      onClick={(event) => {
        if (event.target === event.currentTarget && !pending) onCancel()
      }}
    >
      <div
        ref={panelRef}
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="confirm-dialog-title"
        aria-describedby={description ? 'confirm-dialog-description' : undefined}
        className="max-h-[min(85vh,85dvh)] w-full max-w-md overflow-y-auto rounded-[var(--admin-radius)] border border-[var(--admin-border)] bg-white p-5 shadow-[var(--admin-shadow-lg)]"
      >
        <div className="flex items-start gap-3">
          {destructive ? (
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-red-50">
              <AlertTriangle className="h-5 w-5 text-red-500" aria-hidden />
            </div>
          ) : null}
          <div className="min-w-0">
            <h2 id="confirm-dialog-title" className="text-base font-bold text-[var(--admin-navy)]">
              {title}
            </h2>
            {description ? (
              <p
                id="confirm-dialog-description"
                className="mt-1.5 text-sm text-[var(--admin-text-muted)]"
              >
                {description}
              </p>
            ) : null}
          </div>
        </div>
        <div className="mt-5 flex flex-wrap justify-end gap-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={onCancel}
            disabled={pending}
            data-autofocus="true"
          >
            {cancelLabel}
          </Button>
          {alternateLabel && onAlternate ? (
            <Button type="button" variant="soft" size="sm" onClick={onAlternate} disabled={pending}>
              {alternateLabel}
            </Button>
          ) : null}
          <Button
            type="button"
            variant={destructive ? 'destructive' : 'default'}
            size="sm"
            onClick={onConfirm}
            disabled={pending}
          >
            {pending ? pendingLabel || 'Working…' : confirmLabel}
          </Button>
        </div>
      </div>
    </div>
  )
}
