import { cn } from '@/lib/utils'

type StickyActionBarProps = {
  left?: React.ReactNode
  children: React.ReactNode
  className?: string
}

export const StickyActionBar = ({ left, children, className }: StickyActionBarProps) => (
  <div
    role="region"
    aria-label="Document actions"
    className={cn(
      'z-30 border-[var(--admin-border)] bg-[var(--admin-panel)]/95 backdrop-blur supports-[backdrop-filter]:bg-[var(--admin-panel)]/90',
      'fixed inset-x-0 bottom-0 border-t px-4 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]',
      'lg:sticky lg:top-14 lg:bottom-auto lg:-mx-6 lg:mb-6 lg:border-t-0 lg:border-b lg:px-6 lg:pb-3',
      className
    )}
  >
    <div className="mx-auto flex max-w-6xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="min-w-0">{left}</div>
      <div className="flex flex-wrap items-center justify-end gap-2">{children}</div>
    </div>
  </div>
)
