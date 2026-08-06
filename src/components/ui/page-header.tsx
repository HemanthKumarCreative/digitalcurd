import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'

type Breadcrumb = {
  label: string
  href?: string
}

type PageHeaderProps = {
  title: string
  description?: string
  breadcrumbs?: Breadcrumb[]
  actions?: React.ReactNode
  className?: string
}

export const PageHeader = ({
  title,
  description,
  breadcrumbs,
  actions,
  className,
}: PageHeaderProps) => (
  <div
    className={cn(
      'mb-4 flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between',
      className
    )}
  >
    <div className="min-w-0">
      {breadcrumbs && breadcrumbs.length > 0 ? (
        <nav
          className="mb-1.5 flex flex-wrap items-center gap-1 text-xs text-[var(--admin-text-muted)]"
          aria-label="Breadcrumb"
        >
          {breadcrumbs.map((crumb, index) => (
            <span key={`${crumb.label}-${index}`} className="inline-flex items-center gap-1">
              {index > 0 ? <ChevronRight className="h-3.5 w-3.5" aria-hidden /> : null}
              {crumb.href ? (
                <Link href={crumb.href} className="hover:text-[var(--admin-blue)]">
                  {crumb.label}
                </Link>
              ) : (
                <span className="font-medium text-[var(--admin-text-secondary)]">{crumb.label}</span>
              )}
            </span>
          ))}
        </nav>
      ) : null}
      <h1 className="text-xl font-bold tracking-tight text-[var(--admin-navy)] lg:text-2xl">
        {title}
      </h1>
      {description ? (
        <p className="mt-1 max-w-2xl text-sm leading-relaxed text-[var(--admin-text-muted)]">
          {description}
        </p>
      ) : null}
    </div>
    {actions ? <div className="flex flex-wrap items-center gap-2">{actions}</div> : null}
  </div>
)
