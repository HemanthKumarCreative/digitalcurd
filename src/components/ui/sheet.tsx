'use client'

import { useEffect } from 'react'
import { X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

type SheetProps = {
  open: boolean
  onClose: () => void
  title?: string
  children: React.ReactNode
  side?: 'left' | 'right'
  className?: string
}

export const Sheet = ({
  open,
  onClose,
  title,
  children,
  side = 'left',
  className,
}: SheetProps) => {
  useEffect(() => {
    if (!open) return
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleKey)
    document.body.style.overflow = 'hidden'
    const previouslyFocused = document.activeElement as HTMLElement | null
    const focusTarget = document.getElementById('admin-sheet-close')
    focusTarget?.focus()
    return () => {
      document.removeEventListener('keydown', handleKey)
      document.body.style.overflow = ''
      previouslyFocused?.focus?.()
    }
  }, [open, onClose])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50" role="dialog" aria-modal="true" aria-label={title || 'Dialog'}>
      <button
        type="button"
        className="absolute inset-0 bg-[var(--admin-navy)]/40 backdrop-blur-[1px]"
        aria-label="Close dialog"
        onClick={onClose}
      />
      <div
        className={cn(
          'absolute inset-y-0 flex w-[min(100%,22rem)] flex-col bg-white shadow-[var(--admin-shadow-lg)]',
          side === 'left' ? 'left-0' : 'right-0',
          className
        )}
      >
        {title ? (
          <div className="flex items-center justify-between border-b border-[var(--admin-border)] px-4 py-3">
            <p className="font-bold text-[var(--admin-navy)]">{title}</p>
            <Button
              id="admin-sheet-close"
              variant="ghost"
              size="icon"
              onClick={onClose}
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
        ) : null}
        <div className="admin-scrollbar flex-1 overflow-y-auto">{children}</div>
      </div>
    </div>
  )
}
