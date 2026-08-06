import { cn } from '@/lib/utils'

type EmptyStateProps = {
  icon?: React.ReactNode
  title: string
  description?: string
  action?: React.ReactNode
  className?: string
}

export const EmptyState = ({ icon, title, description, action, className }: EmptyStateProps) => (
  <div
    className={cn(
      'flex flex-col items-center justify-center rounded-[var(--admin-radius)] border border-dashed border-[var(--admin-border-strong)] bg-white px-6 py-14 text-center',
      className
    )}
  >
    {icon ? (
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[var(--admin-blue-soft)] text-[var(--admin-blue)]">
        {icon}
      </div>
    ) : null}
    <h3 className="text-base font-bold text-[var(--admin-navy)]">{title}</h3>
    {description ? (
      <p className="mt-1 max-w-md text-sm text-[var(--admin-text-muted)]">{description}</p>
    ) : null}
    {action ? <div className="mt-4">{action}</div> : null}
  </div>
)
