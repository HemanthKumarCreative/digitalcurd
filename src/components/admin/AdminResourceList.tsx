import type { ReactNode } from 'react'
import {
  ContentListSearch,
  type ContentListItem,
} from '@/components/admin/ContentListSearch'
import { PageHeader } from '@/components/ui/page-header'

type Breadcrumb = {
  label: string
  href?: string
}

type AdminResourceListProps = {
  title: string
  description?: string
  breadcrumbs?: Breadcrumb[]
  actions?: ReactNode
  emptyTitle: string
  emptyDescription: string
  placeholder?: string
  gridClassName?: string
  items: ContentListItem[]
  footer?: ReactNode
}

export const AdminResourceList = ({
  title,
  description,
  breadcrumbs,
  actions,
  emptyTitle,
  emptyDescription,
  placeholder,
  gridClassName,
  items,
  footer,
}: AdminResourceListProps) => (
  <div className="space-y-4">
    <PageHeader
      title={title}
      description={description}
      breadcrumbs={breadcrumbs}
      actions={actions}
    />
    <ContentListSearch
      emptyTitle={emptyTitle}
      emptyDescription={emptyDescription}
      placeholder={placeholder}
      gridClassName={gridClassName}
      items={items}
    />
    {footer}
  </div>
)
