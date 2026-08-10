'use client'

import {
  postDesignFieldChange,
  useDesignMode,
} from '@/components/design-mode/DesignModeProvider'
import { resolveServiceIcon, serviceIconKeys } from '@/lib/serviceIcons'
import { cn } from '@/lib/utils'

type EditableIconProps = {
  path: string
  label: string
  value?: string | null
  className?: string
  size?: number
  strokeWidth?: number
}

export const EditableIcon = ({
  path,
  label,
  value,
  className,
  size = 22,
  strokeWidth = 1.75,
}: EditableIconProps) => {
  const { enabled, documentId, documentType } = useDesignMode()
  const Icon = resolveServiceIcon(value)

  if (!enabled || !documentId || !documentType) {
    return (
      <span className={cn(className)} aria-hidden="true">
        <Icon size={size} strokeWidth={strokeWidth} />
      </span>
    )
  }

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    postDesignFieldChange({
      documentId,
      documentType,
      path,
      value: event.target.value,
      label,
    })
  }

  return (
    <label
      className={cn('relative inline-flex items-start', className)}
      data-dc-editable="icon"
      data-dc-path={path}
      data-dc-label={label}
    >
      <span aria-hidden="true">
        <Icon size={size} strokeWidth={strokeWidth} />
      </span>
      <select
        aria-label={label}
        className="absolute top-full left-0 z-20 mt-1 w-[7.5rem] max-w-[60vw] rounded border border-slate-300 bg-white px-1 py-0.5 text-[10px] font-semibold text-slate-700 shadow-sm"
        value={value && serviceIconKeys.includes(value as (typeof serviceIconKeys)[number]) ? value : 'sparkles'}
        onChange={handleChange}
        data-dc-editable="icon"
      >
        {serviceIconKeys.map((key) => (
          <option key={key} value={key}>
            {key}
          </option>
        ))}
      </select>
    </label>
  )
}
