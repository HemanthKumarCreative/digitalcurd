import { cn } from '@/lib/utils'

type CardProps = React.HTMLAttributes<HTMLDivElement>

export const Card = ({ className, ...props }: CardProps) => (
  <div
    className={cn(
      'rounded-[var(--admin-radius,0.75rem)] border border-[var(--admin-border,#e2e8f0)] bg-[var(--admin-panel,#fff)] p-5 shadow-[var(--admin-shadow)]',
      className
    )}
    {...props}
  />
)

export const CardTitle = ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
  <h3
    className={cn('text-base font-bold text-[var(--admin-navy,#05164d)]', className)}
    {...props}
  />
)

export const CardDescription = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) => (
  <p
    className={cn('mt-1 text-sm text-[var(--admin-text-muted,#64748b)]', className)}
    {...props}
  />
)
