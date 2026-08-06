'use client'

import { useEffect, useMemo, useRef, useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { Eye, Save, Trash2, Upload } from 'lucide-react'
import { deleteDocument, patchDocument } from '@/lib/admin/actions'
import { slugify } from '@/lib/admin/slug'
import { DesignModeView } from '@/components/admin/DesignModeView'
import { HeroEditor, type HeroValue } from '@/components/admin/editors/HeroEditor'
import { SeoEditor, type SeoValue } from '@/components/admin/editors/SeoEditor'
import { RepeatableListEditor } from '@/components/admin/editors/RepeatableListEditor'
import {
  AiBlockEditor,
  ContactFormBlockEditor,
  FaqSectionEditor,
  FeaturesSectionEditor,
  HelpGridEditor,
  LegalSectionsEditor,
  LogosSliderEditor,
  PillarsEditor,
  StatsDeliveryEditor,
  StringListEditor,
} from '@/components/admin/editors/HomeSectionEditors'
import { BlogSectionsEditor } from '@/components/admin/editors/BlogSectionsEditor'
import {
  AuthorRefEditor,
  type AuthorOption,
} from '@/components/admin/editors/AuthorRefEditor'
import {
  RelatedPostsEditor,
  type RelatedPostOption,
} from '@/components/admin/editors/RelatedPostsEditor'
import {
  FEATURE_ICON_OPTIONS,
  SERVICE_CATEGORY_OPTIONS,
  SOCIAL_LABEL_OPTIONS,
} from '@/components/admin/editors/fieldOptions'
import { ImageField } from '@/components/admin/ImageField'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { SectionCard } from '@/components/ui/section-card'
import { StickyActionBar } from '@/components/ui/sticky-action-bar'
import { PageHeader } from '@/components/ui/page-header'
import { useToast } from '@/components/ui/toast'
import { cn } from '@/lib/utils'

const EDIT_MODE_KEY = 'dc_admin_edit_mode'
type EditMode = 'design' | 'form'

export type SectionKind =
  | 'hero'
  | 'homeHero'
  | 'seo'
  | 'stats'
  | 'faqs'
  | 'features'
  | 'team'
  | 'cta'
  | 'linkCta'
  | 'slug'
  | 'textBlock'
  | 'imageUrl'
  | 'string'
  | 'textarea'
  | 'boolean'
  | 'datetime'
  | 'category'
  | 'logosSlider'
  | 'statsDelivery'
  | 'helpGrid'
  | 'aiBlock'
  | 'pillars'
  | 'contactFormBlock'
  | 'stringList'
  | 'legalSections'
  | 'featuresSection'
  | 'process'
  | 'socialLinks'
  | 'json'
  | 'blogSections'
  | 'authorRef'
  | 'relatedPosts'
  | 'number'

export type SectionDef = {
  key: string
  title: string
  description?: string
  kind: SectionKind
  defaultOpen?: boolean
  authors?: AuthorOption[]
  posts?: RelatedPostOption[]
}

type StructuredDocumentEditorProps = {
  documentId: string
  documentType: string
  title: string
  description?: string
  breadcrumbs?: { label: string; href?: string }[]
  sections: SectionDef[]
  initialValues: Record<string, unknown>
  readOnly?: boolean
  previewPath?: string
  /** When set, shows a Delete action that removes the document and returns to this list path */
  allowDelete?: boolean
  listHref?: string
  /** Settings and similar docs: Form only (avoids confusing Home Design preview) */
  forceFormMode?: boolean
}

const asObject = (value: unknown): Record<string, unknown> =>
  value && typeof value === 'object' && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : {}

const asArray = (value: unknown): Record<string, string>[] =>
  Array.isArray(value) ? (value as Record<string, string>[]) : []

const stableSerialize = (value: unknown) => {
  try {
    return JSON.stringify(value)
  } catch {
    return ''
  }
}

export const StructuredDocumentEditor = ({
  documentId,
  documentType,
  title,
  description,
  breadcrumbs,
  sections,
  initialValues,
  readOnly,
  previewPath,
  allowDelete,
  listHref,
  forceFormMode,
}: StructuredDocumentEditorProps) => {
  const router = useRouter()
  const { push } = useToast()
  const [pending, startTransition] = useTransition()
  const [status, setStatus] = useState<'idle' | 'saved' | 'published'>('idle')
  const [values, setValues] = useState<Record<string, unknown>>(initialValues)
  const [baseline, setBaseline] = useState(() => stableSerialize(initialValues))
  const [showAdvanced, setShowAdvanced] = useState(false)
  const [editMode, setEditMode] = useState<EditMode>(forceFormMode ? 'form' : 'design')
  const [siteUrl, setSiteUrl] = useState('http://localhost:3000')
  const [deleting, setDeleting] = useState(false)
  const pendingFormSync = useRef(false)
  const initialSerialized = useMemo(() => stableSerialize(initialValues), [initialValues])

  useEffect(() => {
    setSiteUrl(window.location.origin)
    if (forceFormMode) {
      setEditMode('form')
      return
    }
    const stored = sessionStorage.getItem(EDIT_MODE_KEY) as EditMode | null
    if (stored === 'form' || stored === 'design') setEditMode(stored)
  }, [forceFormMode])

  const handleSetEditMode = async (mode: EditMode) => {
    if (forceFormMode) return
    if (mode === editMode) return
    const dirty = stableSerialize(values) !== baseline
    if (mode === 'design' && dirty) {
      const ok = window.confirm(
        'You have unsaved Form changes. Click OK to save draft and open Design, or Cancel to stay in Form.'
      )
      if (!ok) return
      try {
        const set: Record<string, unknown> = {}
        for (const section of sections) {
          let value = values[section.key]
          if (section.kind === 'slug') {
            value = { _type: 'slug', current: slugify(String(value || '')) }
          }
          set[section.key] = value
        }
        await patchDocument({ id: documentId, type: documentType, set, publish: false })
        setBaseline(stableSerialize(values))
        setStatus('saved')
        push({ title: 'Draft saved', tone: 'success' })
      } catch (error) {
        push({
          title: 'Save failed',
          description: error instanceof Error ? error.message : 'Unknown error',
          tone: 'danger',
        })
        return
      }
    }
    if (mode === 'form') {
      void fetch('/api/admin/design/disable', { method: 'POST' })
      pendingFormSync.current = true
      router.refresh()
    }
    setEditMode(mode)
    sessionStorage.setItem(EDIT_MODE_KEY, mode)
  }

  const jumpSections = useMemo(() => {
    const map: Record<string, string> = {
      heroSection: 'dc-section-hero',
      hero: 'dc-section-hero',
      clientLogosSlider: 'dc-section-logos',
      statsDeliverySection: 'dc-section-stats',
      helpSectionGrid: 'dc-section-help',
      aiSection: 'dc-section-ai',
      corePillarsSection: 'dc-section-pillars',
      faqAccordion: 'dc-section-faqs',
      faqs: 'dc-section-faqs',
      contactForm: 'dc-section-contact',
      stats: 'dc-section-stats',
      story: 'dc-section-story',
      values: 'dc-section-values',
      team: 'dc-section-team',
      culture: 'dc-section-culture',
      benefits: 'dc-section-benefits',
    }
    return sections
      .filter((s) => {
        if (!map[s.key]) return false
        if (s.key === 'faqs' || s.key === 'faqAccordion') {
          const raw = initialValues[s.key]
          const list = Array.isArray(raw)
            ? raw
            : Array.isArray(asObject(raw).faqs)
              ? (asObject(raw).faqs as unknown[])
              : []
          return list.length > 0
        }
        return true
      })
      .map((s) => ({ id: map[s.key], label: s.title }))
  }, [sections, initialValues])

  useEffect(() => {
    setValues(initialValues)
    setBaseline(initialSerialized)
    pendingFormSync.current = false
  }, [documentId])

  useEffect(() => {
    if (!pendingFormSync.current) return
    setValues(initialValues)
    setBaseline(initialSerialized)
    pendingFormSync.current = false
  }, [initialSerialized, initialValues])

  const isDirty = stableSerialize(values) !== baseline

  useEffect(() => {
    if (!isDirty) return
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      event.preventDefault()
      event.returnValue = ''
    }
    window.addEventListener('beforeunload', handleBeforeUnload)
    return () => window.removeEventListener('beforeunload', handleBeforeUnload)
  }, [isDirty])

  const setKey = (key: string, value: unknown) => {
    setValues((prev) => ({ ...prev, [key]: value }))
  }

  const handleSave = (publish: boolean) => {
    startTransition(async () => {
      try {
        const set: Record<string, unknown> = {}
        for (const section of sections) {
          let value = values[section.key]
          if (section.kind === 'datetime' && typeof value === 'string' && value) {
            value = new Date(value).toISOString()
          }
          if (section.kind === 'slug') {
            const current = slugify(String(value || ''))
            if (!current) {
              push({ title: 'Slug required', description: section.title, tone: 'danger' })
              return
            }
            value = { _type: 'slug', current }
          }
          if (section.kind === 'json' && typeof value === 'string') {
            try {
              value = JSON.parse(value)
            } catch {
              push({
                title: 'Invalid JSON',
                description: `${section.title} must be valid JSON before saving.`,
                tone: 'danger',
              })
              return
            }
          }
          if (section.key === 'relatedServiceSlugs') {
            if (typeof value === 'string') {
              value = value
                .split('\n')
                .map((line) => line.trim())
                .filter(Boolean)
            } else if (!Array.isArray(value)) {
              value = []
            }
          }
          if (section.kind === 'cta' && value && typeof value === 'object') {
            const obj = asObject(value)
            const nested = asObject(obj.cta)
            value = {
              title: String(obj.title || ''),
              description: String(obj.description || ''),
              label: String(nested.label || obj.label || ''),
              href: String(nested.href || obj.href || ''),
            }
          }
          set[section.key] = value
        }
        await patchDocument({
          id: documentId,
          type: documentType,
          set,
          publish,
        })
        setStatus(publish ? 'published' : 'saved')
        setBaseline(stableSerialize(values))
        push({
          title: publish ? 'Published' : 'Draft saved',
          description: `${title} updated successfully`,
          tone: 'success',
        })
        router.refresh()
      } catch (error) {
        push({
          title: 'Save failed',
          description: error instanceof Error ? error.message : 'Unknown error',
          tone: 'danger',
        })
      }
    })
  }

  const handleDelete = () => {
    if (!allowDelete || readOnly) return
    const ok = window.confirm(
      `Delete “${title}”? This removes the published and draft versions and cannot be undone.`
    )
    if (!ok) return

    setDeleting(true)
    startTransition(async () => {
      try {
        await deleteDocument({ id: documentId, type: documentType })
        push({ title: 'Deleted', description: title, tone: 'success' })
        router.push(listHref || '/admin')
        router.refresh()
      } catch (error) {
        push({
          title: 'Delete failed',
          description: error instanceof Error ? error.message : 'Unknown error',
          tone: 'danger',
        })
        setDeleting(false)
      }
    })
  }

  const advancedJson = useMemo(() => {
    try {
      return JSON.stringify(values, null, 2)
    } catch {
      return '{}'
    }
  }, [values])

  const modeHint = forceFormMode
    ? 'Edit site-wide settings here. Footer and contact details publish with this document.'
    : editMode === 'design'
      ? 'Click highlighted text or images on the page. Switch to Form for SEO, reordering, and adding rows.'
      : 'Best for SEO, reordering items, and adding/removing rows. Switch to Design to edit on the live page.'

  return (
    <div className="pb-24 lg:pb-6">
      <StickyActionBar
        left={
          <div className="flex flex-wrap items-center gap-2">
            {!forceFormMode ? (
              <div
                className="inline-flex rounded-[var(--admin-radius-sm)] border border-[var(--admin-border)] bg-white p-0.5"
                role="group"
                aria-label="Edit mode"
              >
                <button
                  type="button"
                  className={cn(
                    'rounded-[6px] px-3 py-1.5 text-xs font-bold',
                    editMode === 'design'
                      ? 'bg-[var(--admin-navy)] text-white'
                      : 'text-[var(--admin-text-secondary)] hover:bg-slate-50'
                  )}
                  aria-pressed={editMode === 'design'}
                  onClick={() => void handleSetEditMode('design')}
                >
                  Design
                </button>
                <button
                  type="button"
                  className={cn(
                    'rounded-[6px] px-3 py-1.5 text-xs font-bold',
                    editMode === 'form'
                      ? 'bg-[var(--admin-navy)] text-white'
                      : 'text-[var(--admin-text-secondary)] hover:bg-slate-50'
                  )}
                  aria-pressed={editMode === 'form'}
                  onClick={() => void handleSetEditMode('form')}
                >
                  Form
                </button>
              </div>
            ) : (
              <Badge tone="info">Form editor</Badge>
            )}
            <Badge tone="info">{documentType}</Badge>
            {editMode === 'form' && isDirty ? (
              <Badge tone="warning">Unsaved changes</Badge>
            ) : status === 'published' ? (
              <Badge tone="success">Published</Badge>
            ) : status === 'saved' ? (
              <Badge tone="warning">Draft saved</Badge>
            ) : (
              <Badge>
                {forceFormMode
                  ? 'Ready to edit'
                  : editMode === 'design'
                    ? 'Click to edit'
                    : 'Ready to edit'}
              </Badge>
            )}
          </div>
        }
      >
        {editMode === 'form' && previewPath && !forceFormMode ? (
          <Button
            variant="outline"
            size="sm"
            onClick={() => void handleSetEditMode('design')}
          >
            <Eye className="h-4 w-4" aria-hidden />
            Open Design
          </Button>
        ) : null}
        {editMode === 'form' ? (
          <>
            <Button
              variant="outline"
              size="sm"
              disabled={readOnly || pending || !isDirty}
              onClick={() => handleSave(false)}
            >
              <Save className="h-4 w-4" aria-hidden />
              {pending ? 'Saving…' : 'Save draft'}
            </Button>
            <Button
              size="sm"
              disabled={readOnly || pending || !isDirty}
              onClick={() => handleSave(true)}
            >
              <Upload className="h-4 w-4" aria-hidden />
              {pending ? 'Publishing…' : 'Publish'}
            </Button>
          </>
        ) : null}
        {allowDelete && editMode === 'form' ? (
          <Button
            variant="destructive"
            size="sm"
            disabled={readOnly || pending || deleting}
            onClick={handleDelete}
            aria-label={`Delete ${title}`}
          >
            <Trash2 className="h-4 w-4" aria-hidden />
            {deleting ? 'Deleting…' : 'Delete'}
          </Button>
        ) : null}
      </StickyActionBar>

      <PageHeader
        title={title}
        description={description || modeHint}
        breadcrumbs={breadcrumbs}
        className="mb-3"
      />

      {editMode === 'design' && previewPath && !forceFormMode ? (
        <DesignModeView
          documentId={documentId}
          documentType={documentType}
          previewPath={previewPath}
          siteUrl={siteUrl}
          sections={jumpSections}
          onPublish={() => {
            setStatus('published')
            router.refresh()
          }}
        />
      ) : null}

      {editMode === 'form' ? (
      <>
      <div className="space-y-3">
        {sections.map((section) => {
          const raw = values[section.key]

          return (
            <SectionCard
              key={section.key}
              title={section.title}
              description={section.description}
              defaultOpen={section.defaultOpen === true}
            >
              {section.kind === 'hero' || section.kind === 'homeHero' ? (
                <HeroEditor
                  mode={section.kind === 'homeHero' ? 'home' : 'page'}
                  value={asObject(raw) as HeroValue}
                  disabled={readOnly}
                  onChange={(next) => setKey(section.key, next)}
                />
              ) : null}

              {section.kind === 'seo' ? (
                <SeoEditor
                  value={asObject(raw) as SeoValue}
                  disabled={readOnly}
                  onChange={(next) => setKey(section.key, next)}
                />
              ) : null}

              {section.kind === 'logosSlider' ? (
                <LogosSliderEditor
                  value={asObject(raw)}
                  disabled={readOnly}
                  onChange={(next) => setKey(section.key, next)}
                />
              ) : null}

              {section.kind === 'statsDelivery' ? (
                <StatsDeliveryEditor
                  value={asObject(raw)}
                  disabled={readOnly}
                  onChange={(next) => setKey(section.key, next)}
                />
              ) : null}

              {section.kind === 'helpGrid' ? (
                <HelpGridEditor
                  value={asObject(raw)}
                  disabled={readOnly}
                  onChange={(next) => setKey(section.key, next)}
                />
              ) : null}

              {section.kind === 'aiBlock' ? (
                <AiBlockEditor
                  value={asObject(raw)}
                  disabled={readOnly}
                  onChange={(next) => setKey(section.key, next)}
                />
              ) : null}

              {section.kind === 'pillars' ? (
                <PillarsEditor
                  value={asObject(raw)}
                  disabled={readOnly}
                  onChange={(next) => setKey(section.key, next)}
                />
              ) : null}

              {section.kind === 'contactFormBlock' ? (
                <ContactFormBlockEditor
                  value={asObject(raw)}
                  disabled={readOnly}
                  onChange={(next) => setKey(section.key, next)}
                />
              ) : null}

              {section.kind === 'stats' ? (
                <RepeatableListEditor
                  label="Stats"
                  items={asArray(raw)}
                  disabled={readOnly}
                  addLabel="Add stat"
                  fields={[
                    { key: 'number', label: 'Number' },
                    { key: 'label', label: 'Label' },
                  ]}
                  onChange={(items) => setKey(section.key, items)}
                />
              ) : null}

              {section.kind === 'faqs' ? (
                asObject(raw).faqs || asObject(raw).title || asObject(raw).titleLine1 ? (
                  <FaqSectionEditor
                    value={asObject(raw)}
                    disabled={readOnly}
                    onChange={(next) => setKey(section.key, next)}
                  />
                ) : (
                  <RepeatableListEditor
                    label="FAQs"
                    items={asArray(raw)}
                    disabled={readOnly}
                    addLabel="Add FAQ"
                    fields={[
                      { key: 'question', label: 'Question' },
                      { key: 'answer', label: 'Answer', type: 'textarea' },
                    ]}
                    onChange={(items) => setKey(section.key, items)}
                  />
                )
              ) : null}

              {section.kind === 'features' ? (
                <div className="space-y-4">
                  {asObject(raw).title !== undefined ||
                  asObject(raw).eyebrow !== undefined ||
                  asObject(raw).items ? (
                    <>
                      <div>
                        <Label>Section title</Label>
                        <Input
                          value={String(asObject(raw).title || '')}
                          disabled={readOnly}
                          onChange={(e) =>
                            setKey(section.key, { ...asObject(raw), title: e.target.value })
                          }
                        />
                      </div>
                      <div>
                        <Label>Eyebrow</Label>
                        <Input
                          value={String(asObject(raw).eyebrow || '')}
                          disabled={readOnly}
                          onChange={(e) =>
                            setKey(section.key, { ...asObject(raw), eyebrow: e.target.value })
                          }
                        />
                      </div>
                    </>
                  ) : null}
                  <RepeatableListEditor
                    label="Items"
                    items={
                      Array.isArray(asObject(raw).items)
                        ? (asObject(raw).items as Record<string, string>[])
                        : Array.isArray(asObject(raw).values)
                          ? (asObject(raw).values as Record<string, string>[])
                          : asArray(raw)
                    }
                    disabled={readOnly}
                    addLabel="Add item"
                    fields={[
                      { key: 'title', label: 'Title' },
                      { key: 'description', label: 'Description', type: 'textarea' },
                      {
                        key: 'icon',
                        label: 'Icon',
                        type: 'select',
                        options: FEATURE_ICON_OPTIONS,
                      },
                    ]}
                    onChange={(items) => {
                      const obj = asObject(raw)
                      if (obj.items || obj.title || obj.eyebrow || obj.values) {
                        if (obj.values && !obj.items) {
                          setKey(section.key, { ...obj, values: items })
                        } else {
                          setKey(section.key, { ...obj, items })
                        }
                      } else {
                        setKey(section.key, items)
                      }
                    }}
                  />
                </div>
              ) : null}

              {section.kind === 'featuresSection' ? (
                <FeaturesSectionEditor
                  value={asObject(raw)}
                  disabled={readOnly}
                  onChange={(next) => setKey(section.key, next)}
                />
              ) : null}

              {section.kind === 'process' ? (
                <RepeatableListEditor
                  label="Process steps"
                  items={asArray(raw)}
                  disabled={readOnly}
                  addLabel="Add step"
                  fields={[
                    { key: 'title', label: 'Title' },
                    { key: 'description', label: 'Description', type: 'textarea' },
                  ]}
                  onChange={(items) => setKey(section.key, items)}
                />
              ) : null}

              {section.kind === 'blogSections' ? (
                <BlogSectionsEditor
                  value={raw}
                  disabled={readOnly}
                  onChange={(items) => setKey(section.key, items)}
                />
              ) : null}

              {section.kind === 'authorRef' ? (
                <AuthorRefEditor
                  value={raw}
                  options={section.authors || []}
                  disabled={readOnly}
                  onChange={(next) => setKey(section.key, next)}
                />
              ) : null}

              {section.kind === 'relatedPosts' ? (
                <RelatedPostsEditor
                  value={raw}
                  options={section.posts || []}
                  disabled={readOnly}
                  onChange={(items) => setKey(section.key, items)}
                />
              ) : null}

              {section.kind === 'number' ? (
                <div>
                  <Label>{section.title}</Label>
                  <Input
                    type="number"
                    min={1}
                    value={raw === undefined || raw === null ? '' : String(raw)}
                    disabled={readOnly}
                    onChange={(e) => {
                      const next = e.target.value
                      setKey(section.key, next === '' ? undefined : Number(next))
                    }}
                  />
                </div>
              ) : null}

              {section.kind === 'socialLinks' ? (
                <RepeatableListEditor
                  label="Social links"
                  items={asArray(raw)}
                  disabled={readOnly}
                  addLabel="Add link"
                  fields={[
                    {
                      key: 'label',
                      label: 'Network',
                      type: 'select',
                      options: SOCIAL_LABEL_OPTIONS,
                    },
                    { key: 'href', label: 'URL' },
                  ]}
                  onChange={(items) => setKey(section.key, items)}
                />
              ) : null}

              {section.kind === 'stringList' ? (
                <StringListEditor
                  value={raw}
                  disabled={readOnly}
                  onChange={(next) => setKey(section.key, next)}
                />
              ) : null}

              {section.kind === 'legalSections' ? (
                <LegalSectionsEditor
                  value={raw}
                  disabled={readOnly}
                  onChange={(next) => setKey(section.key, next)}
                />
              ) : null}

              {section.kind === 'team' ? (
                <div className="space-y-4">
                  <div>
                    <Label>Section title</Label>
                    <Input
                      value={String(asObject(raw).title || '')}
                      disabled={readOnly}
                      onChange={(e) =>
                        setKey(section.key, { ...asObject(raw), title: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <Label>Description</Label>
                    <Textarea
                      rows={2}
                      value={String(asObject(raw).description || '')}
                      disabled={readOnly}
                      onChange={(e) =>
                        setKey(section.key, {
                          ...asObject(raw),
                          description: e.target.value,
                        })
                      }
                    />
                  </div>
                  <RepeatableListEditor
                    label="Team members"
                    items={
                      Array.isArray(asObject(raw).members)
                        ? (asObject(raw).members as Record<string, string>[])
                        : []
                    }
                    disabled={readOnly}
                    addLabel="Add member"
                    fields={[
                      { key: 'name', label: 'Name' },
                      { key: 'role', label: 'Role' },
                      { key: 'imageUrl', label: 'Photo', type: 'image' },
                    ]}
                    onChange={(members) => setKey(section.key, { ...asObject(raw), members })}
                  />
                </div>
              ) : null}

              {section.kind === 'linkCta' ? (
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <Label>Label</Label>
                    <Input
                      value={String(asObject(raw).label || '')}
                      disabled={readOnly}
                      onChange={(e) =>
                        setKey(section.key, { ...asObject(raw), label: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <Label>Link</Label>
                    <Input
                      value={String(asObject(raw).href || '')}
                      disabled={readOnly}
                      onChange={(e) =>
                        setKey(section.key, { ...asObject(raw), href: e.target.value })
                      }
                    />
                  </div>
                </div>
              ) : null}

              {section.kind === 'slug' ? (
                <div>
                  <Label>URL slug</Label>
                  <Input
                    value={String(raw || '')}
                    disabled={readOnly}
                    onChange={(e) => setKey(section.key, slugify(e.target.value))}
                    placeholder="url-friendly-name"
                  />
                  <p className="mt-1 text-xs text-[var(--admin-text-muted)]">
                    Changing the slug updates the public URL after you publish.
                  </p>
                </div>
              ) : null}

              {section.kind === 'cta' ? (
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="sm:col-span-2">
                    <Label>Headline</Label>
                    <Input
                      value={String(asObject(raw).title || '')}
                      disabled={readOnly}
                      onChange={(e) =>
                        setKey(section.key, { ...asObject(raw), title: e.target.value })
                      }
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <Label>Supporting text</Label>
                    <Textarea
                      rows={3}
                      value={String(asObject(raw).description || '')}
                      disabled={readOnly}
                      onChange={(e) =>
                        setKey(section.key, {
                          ...asObject(raw),
                          description: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div>
                    <Label>Button label</Label>
                    <Input
                      value={String(
                        asObject(asObject(raw).cta).label || asObject(raw).label || ''
                      )}
                      disabled={readOnly}
                      onChange={(e) => {
                        const obj = asObject(raw)
                        const { cta: _nested, ...rest } = obj
                        setKey(section.key, { ...rest, label: e.target.value })
                      }}
                    />
                  </div>
                  <div>
                    <Label>Button link</Label>
                    <Input
                      value={String(
                        asObject(asObject(raw).cta).href || asObject(raw).href || ''
                      )}
                      disabled={readOnly}
                      onChange={(e) => {
                        const obj = asObject(raw)
                        const { cta: _nested, ...rest } = obj
                        setKey(section.key, { ...rest, href: e.target.value })
                      }}
                    />
                    <p className="mt-1 text-xs text-[var(--admin-text-muted)]">
                      Prefer a service page like `/services/ai-agent-development`, or `/contact`.
                    </p>
                  </div>
                </div>
              ) : null}

              {section.kind === 'textBlock' ? (
                <div className="grid gap-4">
                  <div>
                    <Label>Title</Label>
                    <Input
                      value={String(asObject(raw).title || '')}
                      disabled={readOnly}
                      onChange={(e) =>
                        setKey(section.key, { ...asObject(raw), title: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <Label>Description / body</Label>
                    <Textarea
                      rows={4}
                      value={String(
                        asObject(raw).description ||
                          asObject(raw).subtitle ||
                          (Array.isArray(asObject(raw).paragraphs)
                            ? (asObject(raw).paragraphs as string[]).join('\n\n')
                            : '')
                      )}
                      disabled={readOnly}
                      onChange={(e) => {
                        const obj = asObject(raw)
                        if (Array.isArray(obj.paragraphs)) {
                          setKey(section.key, {
                            ...obj,
                            paragraphs: e.target.value
                              .split(/\n\n+/)
                              .map((p) => p.trim())
                              .filter(Boolean),
                          })
                        } else {
                          setKey(section.key, { ...obj, description: e.target.value })
                        }
                      }}
                    />
                  </div>
                </div>
              ) : null}

              {section.kind === 'imageUrl' ? (
                <ImageField
                  label="Image"
                  value={String(raw || '')}
                  disabled={readOnly}
                  onChange={(url) => setKey(section.key, url)}
                />
              ) : null}

              {section.kind === 'string' ? (
                <div>
                  <Label>{section.title}</Label>
                  <Input
                    value={String(raw || '')}
                    disabled={readOnly}
                    onChange={(e) => setKey(section.key, e.target.value)}
                  />
                </div>
              ) : null}

              {section.kind === 'category' ? (
                <div>
                  <Label>{section.title}</Label>
                  <select
                    className="flex h-10 w-full rounded-[var(--admin-radius-sm)] border border-[var(--admin-border)] bg-white px-3 text-sm"
                    value={String(raw || '')}
                    disabled={readOnly}
                    onChange={(e) => setKey(section.key, e.target.value)}
                    aria-label={section.title}
                  >
                    <option value="">Select category…</option>
                    {SERVICE_CATEGORY_OPTIONS.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>
              ) : null}

              {section.kind === 'datetime' ? (
                <div>
                  <Label>{section.title}</Label>
                  <Input
                    type="datetime-local"
                    value={String(raw || '').slice(0, 16)}
                    disabled={readOnly}
                    onChange={(e) => setKey(section.key, e.target.value)}
                  />
                </div>
              ) : null}

              {section.kind === 'textarea' ? (
                <div>
                  <Label>{section.title}</Label>
                  <Textarea
                    rows={4}
                    value={String(raw || '')}
                    disabled={readOnly}
                    onChange={(e) => setKey(section.key, e.target.value)}
                  />
                </div>
              ) : null}

              {section.kind === 'boolean' ? (
                <label className="flex items-center gap-2 text-sm font-medium">
                  <input
                    type="checkbox"
                    checked={Boolean(raw)}
                    disabled={readOnly}
                    onChange={(e) => setKey(section.key, e.target.checked)}
                  />
                  Enabled / published
                </label>
              ) : null}

              {section.kind === 'json' ? (
                <div>
                  <Label>Structured data</Label>
                  <Textarea
                    rows={10}
                    className="font-mono text-xs"
                    value={
                      typeof raw === 'string' ? raw : JSON.stringify(raw ?? null, null, 2)
                    }
                    disabled={readOnly}
                    onChange={(e) => {
                      const text = e.target.value
                      try {
                        setKey(section.key, JSON.parse(text || 'null'))
                      } catch {
                        setKey(section.key, text)
                      }
                    }}
                  />
                  <p className="mt-1 text-xs text-[var(--admin-text-muted)]">
                    Must be valid JSON. Invalid JSON blocks save.
                  </p>
                </div>
              ) : null}
            </SectionCard>
          )
        })}
      </div>

      <div className="mt-6">
        <button
          type="button"
          className="text-sm font-semibold text-[var(--admin-blue)] hover:underline"
          onClick={() => setShowAdvanced((v) => !v)}
        >
          {showAdvanced ? 'Hide advanced JSON' : 'Show advanced JSON'}
        </button>
        {showAdvanced ? (
          <Textarea
            className="mt-3 font-mono text-xs"
            rows={16}
            readOnly
            value={advancedJson}
            aria-label="Advanced document JSON"
          />
        ) : null}
      </div>
      </>
      ) : null}

      {editMode === 'design' && !previewPath ? (
        <p className="rounded-[var(--admin-radius-sm)] border border-dashed border-[var(--admin-border)] px-4 py-8 text-center text-sm text-[var(--admin-text-muted)]">
          No live preview path for this document. Use Form mode to edit fields.
        </p>
      ) : null}
    </div>
  )
}
