'use client'

import { useCallback, useRef, useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { Plus, X } from 'lucide-react'
import { createDocument } from '@/lib/admin/actions'
import { buildPostSeed } from '@/lib/admin/postEditor'
import { documentIdFor, slugify } from '@/lib/admin/slug'
import { SERVICE_CATEGORY_OPTIONS } from '@/components/admin/editors/fieldOptions'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useToast } from '@/components/ui/toast'
import { useModalFocus } from '@/components/ui/use-modal-focus'

export type CreateDocumentKind = 'service' | 'post' | 'job' | 'author'

type CreateDocumentButtonProps = {
  kind: CreateDocumentKind
}

const labels: Record<CreateDocumentKind, { button: string; title: string }> = {
  service: { button: 'New service', title: 'Create service' },
  post: { button: 'New article', title: 'Create article' },
  job: { button: 'New job', title: 'Create job listing' },
  author: { button: 'New author', title: 'Create author' },
}

export const CreateDocumentButton = ({ kind }: CreateDocumentButtonProps) => {
  const router = useRouter()
  const { push } = useToast()
  const [open, setOpen] = useState(false)
  const [pending, startTransition] = useTransition()
  const [title, setTitle] = useState('')
  const [slug, setSlug] = useState('')
  const [slugTouched, setSlugTouched] = useState(false)
  const [category, setCategory] = useState(
    kind === 'service' ? SERVICE_CATEGORY_OPTIONS[0]?.value || '' : 'Insights'
  )
  const [location, setLocation] = useState('Remote')
  const [jobType, setJobType] = useState('Full-time')
  const [applyHref, setApplyHref] = useState('/contact')
  const [role, setRole] = useState('Editorial')
  const dialogPanelRef = useRef<HTMLDivElement>(null)

  const handleTitleChange = (value: string) => {
    setTitle(value)
    if (!slugTouched) {
      setSlug(slugify(value))
    }
  }

  const handleClose = useCallback(() => {
    if (pending) return
    setOpen(false)
    setTitle('')
    setSlug('')
    setSlugTouched(false)
    setLocation('Remote')
    setJobType('Full-time')
    setApplyHref('/contact')
    setRole('Editorial')
  }, [pending])

  useModalFocus(dialogPanelRef, open, handleClose)

  const handleCreate = () => {
    const trimmedTitle = title.trim()
    if (!trimmedTitle) {
      push({
        title: kind === 'author' ? 'Name and slug are required' : 'Title is required',
        tone: 'danger',
      })
      return
    }

    const slugValue = slugify(slug || trimmedTitle)
    if (
      (kind === 'service' || kind === 'post' || kind === 'author') &&
      !slugValue
    ) {
      push({
        title: kind === 'author' ? 'Name and slug are required' : 'Slug is required',
        tone: 'danger',
      })
      return
    }
    if (kind === 'service' && !category) {
      push({ title: 'Category is required', tone: 'danger' })
      return
    }

    startTransition(async () => {
      try {
        let id = ''
        let href = ''

        if (kind === 'service') {
          id = documentIdFor('service', slugValue)
          await createDocument({
            id,
            type: 'service',
            publish: false,
            data: {
              title: trimmedTitle,
              slug: { _type: 'slug', current: slugValue },
              category,
              subtitle: 'Overview',
              shortDescription: `Learn how Digital Curd delivers ${trimmedTitle}.`,
              description: `Describe ${trimmedTitle} outcomes, approach, and who it is for. Replace this draft copy before publishing.`,
              heroImageUrl:
                'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1600&q=80',
              outcomes: [],
              capabilities: [],
              process: [],
              faqs: [],
              cta: { label: 'Schedule a Call', href: '/contact' },
              phone: { label: 'Talk to us', href: '/contact' },
              seo: {
                title: trimmedTitle,
                description: `Draft page for ${trimmedTitle}. Update before publishing.`,
              },
            },
          })
          href = `/admin/services/${slugValue}`
        }

        if (kind === 'post') {
          id = documentIdFor('post', slugValue)
          await createDocument({
            id,
            type: 'post',
            publish: false,
            data: buildPostSeed({
              title: trimmedTitle,
              slug: slugValue,
              category: category || 'Insights',
            }),
          })
          href = `/admin/blog/${slugValue}`
        }

        if (kind === 'job') {
          const key = slugValue || slugify(trimmedTitle) || `role-${Date.now()}`
          id = documentIdFor('job', key)
          await createDocument({
            id,
            type: 'job',
            publish: false,
            data: {
              title: trimmedTitle,
              jobId: key,
              location: location.trim() || 'Remote',
              type: jobType.trim() || 'Full-time',
              blurb: 'Short role summary. Update before publishing.',
              applyHref: applyHref.trim() || '/contact',
              published: false,
            },
          })
          href = `/admin/jobs/${id}`
        }

        if (kind === 'author') {
          id = documentIdFor('author', slugValue)
          await createDocument({
            id,
            type: 'author',
            publish: false,
            data: {
              name: trimmedTitle,
              slug: { _type: 'slug', current: slugValue },
              role: role.trim() || 'Editorial',
              avatarUrl:
                'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&h=400&q=80',
              bio: 'Short author bio. Update before publishing posts under this profile.',
              linkedinUrl: 'https://www.linkedin.com/',
            },
          })
          href = `/admin/authors/${slugValue}`
        }

        push({
          title: 'Draft created',
          description: 'Finish editing, then Publish when ready.',
          tone: 'success',
        })
        handleClose()
        router.push(href)
        router.refresh()
      } catch (error) {
        push({
          title: 'Create failed',
          description: error instanceof Error ? error.message : 'Unknown error',
          tone: 'danger',
        })
      }
    })
  }

  const meta = labels[kind]

  return (
    <>
      <Button type="button" onClick={() => setOpen(true)} aria-label={meta.button}>
        <Plus className="h-4 w-4" aria-hidden />
        {meta.button}
      </Button>

      {open ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4"
          role="presentation"
          onClick={(event) => {
            if (event.target === event.currentTarget) handleClose()
          }}
        >
          <div
            ref={dialogPanelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="create-doc-title"
            className="max-h-[min(85vh,85dvh)] w-full max-w-md overflow-y-auto rounded-[var(--admin-radius)] border border-[var(--admin-border)] bg-white p-5 shadow-[var(--admin-shadow)]"
          >
            <div className="mb-4 flex items-start justify-between gap-3">
              <div>
                <h2 id="create-doc-title" className="text-lg font-bold text-[var(--admin-navy)]">
                  {meta.title}
                </h2>
                <p className="mt-1 text-sm text-[var(--admin-text-muted)]">
                  Creates a draft you can finish editing, then Publish when ready.
                </p>
              </div>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                aria-label="Close"
                onClick={handleClose}
                disabled={pending}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            <div className="space-y-3">
              <div>
                <Label htmlFor="create-title">{kind === 'author' ? 'Name' : 'Title'}</Label>
                <Input
                  id="create-title"
                  value={title}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  placeholder={
                    kind === 'job'
                      ? 'Senior Growth Engineer'
                      : kind === 'author'
                        ? 'Jane Cooper'
                        : 'Untitled'
                  }
                  data-autofocus="true"
                />
              </div>

              {kind !== 'job' && (
                <div>
                  <Label htmlFor="create-slug">Slug</Label>
                  <Input
                    id="create-slug"
                    value={slug}
                    onChange={(e) => {
                      setSlugTouched(true)
                      setSlug(slugify(e.target.value))
                    }}
                    placeholder="url-friendly-name"
                  />
                  {kind !== 'author' ? (
                    <p className="mt-1 text-xs text-[var(--admin-text-muted)]">
                      URL: /{kind === 'service' ? 'services' : 'blog'}/{slug || '…'}
                    </p>
                  ) : null}
                </div>
              )}

              {kind === 'author' ? (
                <div>
                  <Label htmlFor="create-role">Role</Label>
                  <Input
                    id="create-role"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    placeholder="Editorial"
                  />
                </div>
              ) : null}

              {kind === 'service' ? (
                <div>
                  <Label htmlFor="create-category">Category</Label>
                  <select
                    id="create-category"
                    className="flex h-10 w-full rounded-[var(--admin-radius-sm)] border border-[var(--admin-border)] bg-white px-3 text-sm"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    {SERVICE_CATEGORY_OPTIONS.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>
              ) : null}

              {kind === 'post' ? (
                <div>
                  <Label htmlFor="create-post-category">Category</Label>
                  <Input
                    id="create-post-category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    placeholder="Insights"
                  />
                </div>
              ) : null}

              {kind === 'job' ? (
                <>
                  <div>
                    <Label htmlFor="create-location">Location</Label>
                    <Input
                      id="create-location"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="create-job-type">Type</Label>
                    <Input
                      id="create-job-type"
                      value={jobType}
                      onChange={(e) => setJobType(e.target.value)}
                      placeholder="Full-time"
                    />
                  </div>
                  <div>
                    <Label htmlFor="create-apply">Apply link</Label>
                    <Input
                      id="create-apply"
                      value={applyHref}
                      onChange={(e) => setApplyHref(e.target.value)}
                      placeholder="/contact"
                    />
                  </div>
                </>
              ) : null}
            </div>

            <div className="mt-5 flex justify-end gap-2">
              <Button type="button" variant="outline" onClick={handleClose} disabled={pending}>
                Cancel
              </Button>
              <Button type="button" onClick={handleCreate} disabled={pending}>
                {pending ? 'Creating…' : 'Create'}
              </Button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  )
}
