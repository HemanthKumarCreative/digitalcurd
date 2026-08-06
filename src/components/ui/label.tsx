import { cn } from '@/lib/utils'

type LabelProps = React.LabelHTMLAttributes<HTMLLabelElement>

export const Label = ({ className, ...props }: LabelProps) => (
  <label
    className={cn(
      'mb-1.5 block text-sm font-semibold text-[var(--admin-text,#0f172a)]',
      className
    )}
    {...props}
  />
)
