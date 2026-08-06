'use client'

import { useEffect, useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { Plus, X } from 'lucide-react'
import { createDocument } from '@/lib/admin/actions'
import { documentIdFor, slugify } from '@/lib/admin/slug'
import { SERVICE_CATEGORY_OPTIONS } from '@/components/admin/editors/fieldOptions'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useToast } from '@/components/ui/toast'

export type CreateDocumentKind = 'service' | 'post' | 'job'

type CreateDocumentButtonProps = {
  kind: CreateDocumentKind
}

const labels: Record<CreateDocumentKind, { button: string; title: string }> = {
  service: { button: 'New service', title: 'Create service' },
  post: { button: 'New post', title: 'Create blog post' },
  job: { button: 'New job', title: 'Create job listing' },
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

  useEffect(() => {
    if (!open) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open])

  const handleTitleChange = (value: string) => {
    setTitle(value)
    if (!slugTouched && (kind === 'service' || kind === 'post' || kind === 'job')) {
      setSlug(slugify(value))
    }
  }

  const handleClose = () => {
    if (pending) return
    setOpen(false)
    setTitle('')
    setSlug('')
    setSlugTouched(false)
    setLocation('Remote')
    setJobType('Full-time')
    setApplyHref('/contact')
  }

  const handleCreate = () => {
    const trimmedTitle = title.trim()
    if (!trimmedTitle) {
      push({ title: 'Title is required', tone: 'danger' })
      return
    }

    const slugValue = slugify(slug || trimmedTitle)
    if ((kind === 'service' || kind === 'post') && !slugValue) {
      push({ title: 'Slug is required', tone: 'danger' })
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
          const now = new Date().toISOString()
          await createDocument({
            id,
            type: 'post',
            publish: false,
            data: {
              title: trimmedTitle,
              slug: { _type: 'slug', current: slugValue },
              excerpt: 'Short summary for cards and SEO. Update before publishing.',
              category: category || 'Insights',
              publishedAt: now,
              updatedAt: now,
              readingMinutes: 5,
              coverImageUrl:
                'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1600&q=80',
              sections: [
                {
                  _type: 'blogProse',
                  _key: 'intro',
                  heading: 'Overview',
                  headingId: 'overview',
                  paragraphs: [
                    'Write your introduction here. Explain the problem and what the reader will learn.',
                  ],
                },
                {
                  _type: 'blogTable',
                  _key: 'table',
                  heading: 'Key comparisons',
                  headingId: 'key-comparisons',
                  columns: ['Topic', 'Why it matters'],
                  rows: [
                    {
                      _key: 'row-1',
                      cells: ['Example topic', 'Describe why this matters for your service.'],
                    },
                  ],
                },
                {
                  _type: 'blogInlineCta',
                  _key: 'mid-cta',
                  title: 'Need help applying this?',
                  description:
                    'Explore the related Digital Curd service, or book a consultation.',
                  ctaLabel: 'View related service',
                  ctaHref: '/services',
                },
                {
                  _type: 'blogGuide',
                  _key: 'guide',
                  heading: 'How to put this into practice',
                  headingId: 'how-to-put-this-into-practice',
                  intro: 'Start with one practical win, then expand.',
                  items: [
                    {
                      title: 'First action',
                      headingId: 'first-action',
                      paragraphs: ['Describe the first action clearly.'],
                      steps: [
                        { title: 'Prepare', body: 'Gather the inputs you need.' },
                        { title: 'Execute', body: 'Run the first controlled change.' },
                      ],
                      bullets: [],
                    },
                    {
                      title: 'Second action',
                      headingId: 'second-action',
                      paragraphs: ['Describe the follow-up action.'],
                      steps: [{ title: 'Review', body: 'Check quality and impact.' }],
                      bullets: [],
                    },
                  ],
                },
                {
                  _type: 'blogProse',
                  _key: 'conclusion',
                  heading: 'Conclusion',
                  headingId: 'conclusion',
                  paragraphs: [
                    'Summarize the takeaway and point readers to the matching Digital Curd service.',
                  ],
                },
              ],
              faqs: [
                {
                  _key: 'faq-1',
                  question: 'What is the first step?',
                  answer: 'Start with one narrow workflow and define success criteria.',
                },
              ],
              relatedServiceSlugs: [],
              cta: {
                title: 'Want this applied to your business?',
                description: 'Talk to Digital Curd about the service that matches this playbook.',
                label: 'Explore services',
                href: '/services',
              },
              seo: {
                title: trimmedTitle,
                description: 'Draft post. Update excerpt and sections before publishing.',
              },
            },
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
            role="dialog"
            aria-modal="true"
            aria-labelledby="create-doc-title"
            className="w-full max-w-md rounded-[var(--admin-radius)] border border-[var(--admin-border)] bg-white p-5 shadow-[var(--admin-shadow)]"
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
                <Label htmlFor="create-title">Title</Label>
                <Input
                  id="create-title"
                  value={title}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  placeholder={kind === 'job' ? 'Senior Growth Engineer' : 'Untitled'}
                  autoFocus
                />
              </div>

              {(kind === 'service' || kind === 'post') && (
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
                  <p className="mt-1 text-xs text-[var(--admin-text-muted)]">
                    URL: /{kind === 'service' ? 'services' : 'blog'}/{slug || '…'}
                  </p>
                </div>
              )}

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
