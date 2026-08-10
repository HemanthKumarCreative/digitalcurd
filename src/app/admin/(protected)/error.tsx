'use client'

import { useEffect } from 'react'
import { AlertTriangle, RotateCw } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function AdminError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('Admin route error:', error)
  }, [error])

  return (
    <div className="flex min-h-[50vh] items-center justify-center">
      <div
        role="alert"
        className="w-full max-w-md rounded-[var(--admin-radius)] border border-[var(--admin-border)] bg-white p-8 text-center shadow-[var(--admin-shadow)]"
      >
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-50">
          <AlertTriangle className="h-6 w-6 text-red-500" aria-hidden />
        </div>
        <h1 className="text-lg font-bold text-[var(--admin-navy)]">Something went wrong</h1>
        <p className="mt-2 text-sm text-[var(--admin-text-muted)]">
          We couldn&rsquo;t load this page from the content store. Check your connection and try
          again.
        </p>
        {error.digest ? (
          <p className="mt-2 text-xs text-[var(--admin-text-muted)]">Error ID: {error.digest}</p>
        ) : null}
        <Button type="button" className="mt-5" onClick={reset}>
          <RotateCw className="h-4 w-4" aria-hidden />
          Try again
        </Button>
      </div>
    </div>
  )
}
