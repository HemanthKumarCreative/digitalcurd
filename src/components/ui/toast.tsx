'use client'

import { createContext, useCallback, useContext, useMemo, useState } from 'react'
import { cn } from '@/lib/utils'

type Toast = {
  id: string
  title: string
  description?: string
  tone?: 'default' | 'success' | 'danger'
}

type ToastContextValue = {
  toasts: Toast[]
  push: (toast: Omit<Toast, 'id'>) => void
  dismiss: (id: string) => void
}

const ToastContext = createContext<ToastContextValue | null>(null)

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  const [toasts, setToasts] = useState<Toast[]>([])

  const dismiss = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

  const push = useCallback(
    (toast: Omit<Toast, 'id'>) => {
      const id = crypto.randomUUID()
      setToasts((prev) => [...prev, { ...toast, id }])
      window.setTimeout(() => dismiss(id), 4200)
    },
    [dismiss]
  )

  const value = useMemo(() => ({ toasts, push, dismiss }), [toasts, push, dismiss])

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div
        className="pointer-events-none fixed right-4 bottom-4 z-[100] flex w-full max-w-sm flex-col gap-2"
        aria-live="polite"
      >
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={cn(
              'pointer-events-auto rounded-[var(--admin-radius-sm)] border bg-white p-3 shadow-[var(--admin-shadow-lg)]',
              toast.tone === 'success' && 'border-emerald-200',
              toast.tone === 'danger' && 'border-red-200',
              !toast.tone || toast.tone === 'default'
                ? 'border-[var(--admin-border)]'
                : null
            )}
            role="status"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-sm font-semibold text-[var(--admin-navy)]">{toast.title}</p>
                {toast.description ? (
                  <p className="mt-0.5 text-xs text-[var(--admin-text-muted)]">{toast.description}</p>
                ) : null}
              </div>
              <button
                type="button"
                className="text-xs font-semibold text-[var(--admin-text-muted)] hover:text-[var(--admin-text)]"
                onClick={() => dismiss(toast.id)}
                aria-label="Dismiss notification"
              >
                Close
              </button>
            </div>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  )
}

export const useToast = () => {
  const ctx = useContext(ToastContext)
  if (!ctx) {
    throw new Error('useToast must be used within ToastProvider')
  }
  return ctx
}
