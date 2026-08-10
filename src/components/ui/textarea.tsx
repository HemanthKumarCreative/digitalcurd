import { cn } from '@/lib/utils'

type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>

export const Textarea = ({ className, ...props }: TextareaProps) => (
  <textarea
    // Browser extensions inject attributes (e.g. fdprocessedid) into form controls,
    // which otherwise triggers dev-only hydration mismatch warnings.
    suppressHydrationWarning
    className={cn(
      'flex min-h-[96px] w-full rounded-[var(--admin-radius-sm,0.5rem)] border border-[var(--admin-border,#e2e8f0)] bg-white px-3 py-2 text-sm text-[var(--admin-text,#0f172a)] placeholder:text-[var(--admin-text-muted,#64748b)] transition-colors focus-visible:border-[var(--admin-blue,#1d5bc4)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--admin-blue,#1d5bc4)]/20 disabled:cursor-not-allowed disabled:opacity-50',
      className
    )}
    {...props}
  />
)
