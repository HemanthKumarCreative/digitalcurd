'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'

type SectionCardProps = {
  title: string
  description?: string
  children: React.ReactNode
  defaultOpen?: boolean
  className?: string
}

export const SectionCard = ({
  title,
  description,
  children,
  defaultOpen = true,
  className,
}: SectionCardProps) => {
  const [open, setOpen] = useState(defaultOpen)

  return (
    <section
      className={cn(
        'overflow-hidden rounded-[var(--admin-radius)] border border-[var(--admin-border)] bg-white shadow-[var(--admin-shadow)]',
        className
      )}
    >
      <button
        type="button"
        className="flex w-full items-start justify-between gap-3 px-5 py-4 text-left hover:bg-slate-50"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
      >
        <div>
          <h2 className="text-base font-bold text-[var(--admin-navy)]">{title}</h2>
          {description ? (
            <p className="mt-0.5 text-sm text-[var(--admin-text-muted)]">{description}</p>
          ) : null}
        </div>
        <ChevronDown
          className={cn(
            'mt-0.5 h-5 w-5 shrink-0 text-[var(--admin-text-muted)] transition-transform',
            open && 'rotate-180'
          )}
          aria-hidden
        />
      </button>
      {open ? <div className="border-t border-[var(--admin-border)] px-5 py-5">{children}</div> : null}
    </section>
  )
}
