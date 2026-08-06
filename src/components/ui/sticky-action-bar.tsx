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
      // Mobile: fixed footer actions
      'fixed inset-x-0 bottom-0 border-t px-4 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]',
      // Desktop: flush under Content Console header (cancel main top pad, stick to top of main)
      'lg:sticky lg:top-0 lg:bottom-auto lg:-mx-[var(--admin-main-pad-x)] lg:-mt-[var(--admin-main-pad-y)] lg:mb-3 lg:border-t-0 lg:border-b lg:px-[var(--admin-main-pad-x)] lg:py-2.5',
      className
    )}
  >
    <div className="flex flex-col gap-2.5 sm:flex-row sm:items-center sm:justify-between">
      <div className="min-w-0">{left}</div>
      <div className="flex flex-wrap items-center justify-end gap-2">{children}</div>
    </div>
  </div>
)
