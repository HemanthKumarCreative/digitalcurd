import { cn } from '@/lib/utils'

type BadgeProps = React.HTMLAttributes<HTMLSpanElement> & {
  tone?: 'default' | 'success' | 'warning' | 'danger' | 'info' | 'amber'
}

export const Badge = ({ className, tone = 'default', ...props }: BadgeProps) => (
  <span
    className={cn(
      'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold',
      tone === 'default' && 'bg-slate-100 text-slate-700',
      tone === 'info' && 'bg-[var(--admin-blue-soft,#e8f0fb)] text-[var(--admin-blue,#1d5bc4)]',
      tone === 'success' && 'bg-[var(--admin-success-soft,#ecfdf5)] text-[var(--admin-success,#059669)]',
      tone === 'warning' && 'bg-[var(--admin-warning-soft,#fffbeb)] text-[var(--admin-warning,#d97706)]',
      tone === 'danger' && 'bg-[var(--admin-danger-soft,#fef2f2)] text-[var(--admin-danger,#dc2626)]',
      tone === 'amber' && 'bg-[#fef3c7] text-[#92400e]',
      className
    )}
    {...props}
  />
)
