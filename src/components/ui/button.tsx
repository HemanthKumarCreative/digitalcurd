import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 rounded-[var(--admin-radius-sm,0.5rem)] text-sm font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default:
          'bg-[var(--admin-navy,#05164d)] text-white shadow-sm hover:bg-[var(--admin-navy-soft,#0a2266)]',
        secondary:
          'bg-[var(--admin-blue,#1d5bc4)] text-white shadow-sm hover:opacity-90',
        outline:
          'border border-[var(--admin-border,#e2e8f0)] bg-white text-[var(--admin-text,#0f172a)] hover:bg-[var(--admin-blue-soft,#e8f0fb)] hover:border-[var(--admin-blue,#1d5bc4)]',
        soft:
          'bg-[var(--admin-blue-soft,#e8f0fb)] text-[var(--admin-blue,#1d5bc4)] hover:bg-[#d9e7f8]',
        ghost: 'text-[var(--admin-text-secondary,#475569)] hover:bg-slate-100 hover:text-[var(--admin-text,#0f172a)]',
        destructive: 'bg-[var(--admin-danger,#dc2626)] text-white hover:opacity-90',
        amber:
          'bg-[var(--admin-amber,#fbbf24)] text-[var(--admin-navy,#05164d)] hover:bg-[var(--admin-amber-deep,#f0a000)]',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-8 rounded-md px-3 text-xs',
        lg: 'h-11 rounded-md px-6',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
)

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants>

export const Button = ({ className, variant, size, type = 'button', ...props }: ButtonProps) => (
  <button type={type} className={cn(buttonVariants({ variant, size }), className)} {...props} />
)

export { buttonVariants }
