'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { slugifyHeading } from '@/lib/blog/utils'
import type { BlogSection } from '@/types/blog'

type BlogSectionsEditorProps = {
  value: unknown
  disabled?: boolean
  onChange: (next: BlogSection[]) => void
}

const SECTION_TYPES: { type: BlogSection['_type']; label: string }[] = [
  { type: 'blogProse', label: 'Prose' },
  { type: 'blogTable', label: 'Table' },
  { type: 'blogGuide', label: 'Guide' },
  { type: 'blogSteps', label: 'Steps' },
  { type: 'blogList', label: 'List' },
  { type: 'blogInlineCta', label: 'Inline CTA' },
  { type: 'blogCallout', label: 'Callout' },
]

const newKey = () => `sec-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`

const asSections = (value: unknown): BlogSection[] =>
  Array.isArray(value) ? (value as BlogSection[]) : []

const createSection = (type: BlogSection['_type']): BlogSection => {
  const key = newKey()
  if (type === 'blogProse') {
    return {
      _type: 'blogProse',
      _key: key,
      heading: 'New section',
      headingId: 'new-section',
      paragraphs: [''],
    }
  }
  if (type === 'blogTable') {
    return {
      _type: 'blogTable',
      _key: key,
      heading: 'Comparison',
      headingId: 'comparison',
      columns: ['Column A', 'Column B'],
      rows: [['', '']],
    }
  }
  if (type === 'blogGuide') {
    return {
      _type: 'blogGuide',
      _key: key,
      heading: 'How to get started',
      headingId: 'how-to-get-started',
      intro: '',
      items: [
        {
          title: 'First item',
          headingId: 'first-item',
          paragraphs: [''],
          steps: [{ title: 'Step title', body: '' }],
          bullets: [],
        },
      ],
    }
  }
  if (type === 'blogSteps') {
    return {
      _type: 'blogSteps',
      _key: key,
      heading: 'Steps',
      headingId: 'steps',
      intro: '',
      steps: [{ title: 'Step title', body: '' }],
    }
  }
  if (type === 'blogList') {
    return {
      _type: 'blogList',
      _key: key,
      heading: 'Key points',
      headingId: 'key-points',
      style: 'bullet',
      items: [''],
    }
  }
  if (type === 'blogInlineCta') {
    return {
      _type: 'blogInlineCta',
      _key: key,
      title: 'Ready to talk?',
      description: 'Book a consultation with Digital Curd.',
      ctaLabel: 'Schedule a Call',
      ctaHref: '/contact',
    }
  }
  return {
    _type: 'blogCallout',
    _key: key,
    variant: 'tip',
    body: '',
  }
}

type TableRow = string[] | { cells?: string[]; _key?: string }

const rowsToMatrix = (rows: TableRow[] = []): string[][] =>
  rows.map((row) => (Array.isArray(row) ? row : row.cells || []))

const rowsToText = (rows: TableRow[] = []) =>
  rowsToMatrix(rows)
    .map((row) => row.join(' | '))
    .join('\n')

const textToRows = (text: string) =>
  text
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line, index) => ({
      _key: `row-${index}-${Date.now()}`,
      cells: line.split('|').map((cell) => cell.trim()),
    }))

export const BlogSectionsEditor = ({
  value,
  disabled,
  onChange,
}: BlogSectionsEditorProps) => {
  const sections = asSections(value)

  const updateAt = (index: number, next: BlogSection) => {
    const copy = [...sections]
    copy[index] = next
    onChange(copy)
  }

  const move = (index: number, direction: -1 | 1) => {
    const target = index + direction
    if (target < 0 || target >= sections.length) return
    const copy = [...sections]
    const [item] = copy.splice(index, 1)
    copy.splice(target, 0, item)
    onChange(copy)
  }

  const removeAt = (index: number) => {
    onChange(sections.filter((_, i) => i !== index))
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {SECTION_TYPES.map((item) => (
          <Button
            key={item.type}
            type="button"
            variant="outline"
            size="sm"
            disabled={disabled}
            onClick={() => onChange([...sections, createSection(item.type)])}
          >
            Add {item.label}
          </Button>
        ))}
      </div>

      {!sections.length ? (
        <p className="text-sm text-[var(--admin-text-muted)]">
          No sections yet. Add prose, a table, a guide, or an inline CTA to build the article.
        </p>
      ) : null}

      {sections.map((section, index) => (
        <div
          key={section._key || `${section._type}-${index}`}
          className="space-y-3 rounded-xl border border-[var(--admin-border)] p-4"
        >
          <div className="flex flex-wrap items-center justify-between gap-2">
            <p className="text-sm font-semibold text-[var(--admin-text)]">
              {SECTION_TYPES.find((item) => item.type === section._type)?.label ||
                section._type}{' '}
              #{index + 1}
            </p>
            <div className="flex gap-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                disabled={disabled || index === 0}
                onClick={() => move(index, -1)}
              >
                Up
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                disabled={disabled || index === sections.length - 1}
                onClick={() => move(index, 1)}
              >
                Down
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                disabled={disabled}
                onClick={() => removeAt(index)}
              >
                Remove
              </Button>
            </div>
          </div>

          {'heading' in section ? (
            <div className="grid gap-3 sm:grid-cols-2">
              <div>
                <Label>Heading</Label>
                <Input
                  value={section.heading || ''}
                  disabled={disabled}
                  onChange={(e) => {
                    const heading = e.target.value
                    updateAt(index, {
                      ...section,
                      heading,
                      headingId: slugifyHeading(heading) || section.headingId,
                    } as BlogSection)
                  }}
                />
              </div>
              <div>
                <Label>Anchor id</Label>
                <Input
                  value={section.headingId || ''}
                  disabled={disabled}
                  onChange={(e) =>
                    updateAt(index, {
                      ...section,
                      headingId: slugifyHeading(e.target.value),
                    } as BlogSection)
                  }
                />
              </div>
            </div>
          ) : null}

          {section._type === 'blogProse' ? (
            <div>
              <Label>Paragraphs (blank line separated)</Label>
              <Textarea
                rows={6}
                disabled={disabled}
                value={(section.paragraphs || []).join('\n\n')}
                onChange={(e) =>
                  updateAt(index, {
                    ...section,
                    paragraphs: e.target.value.split(/\n\s*\n/).map((p) => p.trimEnd()),
                  })
                }
              />
            </div>
          ) : null}

          {section._type === 'blogTable' ? (
            <>
              <div>
                <Label>Columns (comma separated)</Label>
                <Input
                  disabled={disabled}
                  value={(section.columns || []).join(', ')}
                  onChange={(e) =>
                    updateAt(index, {
                      ...section,
                      columns: e.target.value
                        .split(',')
                        .map((c) => c.trim())
                        .filter(Boolean),
                    })
                  }
                />
              </div>
              <div>
                <Label>Rows (one per line, cells separated by |)</Label>
                <Textarea
                  rows={6}
                  disabled={disabled}
                  value={rowsToText((section.rows || []) as TableRow[])}
                  onChange={(e) =>
                    updateAt(index, {
                      ...section,
                      rows: textToRows(e.target.value) as unknown as string[][],
                    })
                  }
                />
              </div>
            </>
          ) : null}

          {section._type === 'blogInlineCta' ? (
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <Label>Title</Label>
                <Input
                  disabled={disabled}
                  value={section.title || ''}
                  onChange={(e) => updateAt(index, { ...section, title: e.target.value })}
                />
              </div>
              <div className="sm:col-span-2">
                <Label>Description</Label>
                <Textarea
                  rows={3}
                  disabled={disabled}
                  value={section.description || ''}
                  onChange={(e) =>
                    updateAt(index, { ...section, description: e.target.value })
                  }
                />
              </div>
              <div>
                <Label>Button label</Label>
                <Input
                  disabled={disabled}
                  value={section.ctaLabel || ''}
                  onChange={(e) =>
                    updateAt(index, { ...section, ctaLabel: e.target.value })
                  }
                />
              </div>
              <div>
                <Label>Button link</Label>
                <Input
                  disabled={disabled}
                  value={section.ctaHref || ''}
                  onChange={(e) =>
                    updateAt(index, { ...section, ctaHref: e.target.value })
                  }
                />
              </div>
            </div>
          ) : null}

          {section._type === 'blogCallout' ? (
            <div className="grid gap-3">
              <div>
                <Label>Variant</Label>
                <select
                  className="flex h-10 w-full rounded-md border border-[var(--admin-border)] bg-transparent px-3 text-sm"
                  disabled={disabled}
                  value={section.variant || 'tip'}
                  onChange={(e) =>
                    updateAt(index, {
                      ...section,
                      variant: e.target.value as 'tip' | 'note' | 'warning',
                    })
                  }
                >
                  <option value="tip">Tip</option>
                  <option value="note">Note</option>
                  <option value="warning">Warning</option>
                </select>
              </div>
              <div>
                <Label>Body</Label>
                <Textarea
                  rows={3}
                  disabled={disabled}
                  value={section.body || ''}
                  onChange={(e) => updateAt(index, { ...section, body: e.target.value })}
                />
              </div>
            </div>
          ) : null}

          {section._type === 'blogList' ? (
            <>
              <div>
                <Label>Style</Label>
                <select
                  className="flex h-10 w-full rounded-md border border-[var(--admin-border)] bg-transparent px-3 text-sm"
                  disabled={disabled}
                  value={section.style || 'bullet'}
                  onChange={(e) =>
                    updateAt(index, {
                      ...section,
                      style: e.target.value as 'bullet' | 'numbered',
                    })
                  }
                >
                  <option value="bullet">Bullet</option>
                  <option value="numbered">Numbered</option>
                </select>
              </div>
              <div>
                <Label>Items (one per line)</Label>
                <Textarea
                  rows={5}
                  disabled={disabled}
                  value={(section.items || []).join('\n')}
                  onChange={(e) =>
                    updateAt(index, {
                      ...section,
                      items: e.target.value.split('\n').map((line) => line.trimEnd()),
                    })
                  }
                />
              </div>
            </>
          ) : null}

          {section._type === 'blogSteps' ? (
            <>
              <div>
                <Label>Intro</Label>
                <Textarea
                  rows={2}
                  disabled={disabled}
                  value={section.intro || ''}
                  onChange={(e) => updateAt(index, { ...section, intro: e.target.value })}
                />
              </div>
              <div>
                <Label>Steps (Title :: Body, one per line)</Label>
                <Textarea
                  rows={5}
                  disabled={disabled}
                  value={(section.steps || [])
                    .map((step) => `${step.title}${step.body ? ` :: ${step.body}` : ''}`)
                    .join('\n')}
                  onChange={(e) =>
                    updateAt(index, {
                      ...section,
                      steps: e.target.value
                        .split('\n')
                        .map((line) => line.trim())
                        .filter(Boolean)
                        .map((line) => {
                          const [title, ...rest] = line.split('::')
                          return {
                            title: (title || '').trim(),
                            body: rest.join('::').trim(),
                          }
                        }),
                    })
                  }
                />
              </div>
            </>
          ) : null}

          {section._type === 'blogGuide' ? (
            <>
              <div>
                <Label>Intro</Label>
                <Textarea
                  rows={2}
                  disabled={disabled}
                  value={section.intro || ''}
                  onChange={(e) => updateAt(index, { ...section, intro: e.target.value })}
                />
              </div>
              <div className="space-y-3">
                <Label>Guide items</Label>
                {(section.items || []).map((item, itemIndex) => (
                  <div
                    key={item.headingId || itemIndex}
                    className="space-y-2 rounded-lg border border-[var(--admin-border)] p-3"
                  >
                    <Input
                      disabled={disabled}
                      placeholder="Item title"
                      value={item.title || ''}
                      onChange={(e) => {
                        const items = [...(section.items || [])]
                        const title = e.target.value
                        items[itemIndex] = {
                          ...item,
                          title,
                          headingId: slugifyHeading(title) || item.headingId,
                        }
                        updateAt(index, { ...section, items })
                      }}
                    />
                    <Textarea
                      rows={2}
                      disabled={disabled}
                      placeholder="Paragraphs (blank line separated)"
                      value={(item.paragraphs || []).join('\n\n')}
                      onChange={(e) => {
                        const items = [...(section.items || [])]
                        items[itemIndex] = {
                          ...item,
                          paragraphs: e.target.value
                            .split(/\n\s*\n/)
                            .map((p) => p.trim())
                            .filter(Boolean),
                        }
                        updateAt(index, { ...section, items })
                      }}
                    />
                    <Textarea
                      rows={3}
                      disabled={disabled}
                      placeholder="Steps (Title :: Body)"
                      value={(item.steps || [])
                        .map((step) => `${step.title}${step.body ? ` :: ${step.body}` : ''}`)
                        .join('\n')}
                      onChange={(e) => {
                        const items = [...(section.items || [])]
                        items[itemIndex] = {
                          ...item,
                          steps: e.target.value
                            .split('\n')
                            .map((line) => line.trim())
                            .filter(Boolean)
                            .map((line) => {
                              const [title, ...rest] = line.split('::')
                              return {
                                title: (title || '').trim(),
                                body: rest.join('::').trim(),
                              }
                            }),
                        }
                        updateAt(index, { ...section, items })
                      }}
                    />
                    <Textarea
                      rows={2}
                      disabled={disabled}
                      placeholder="Bullets (one per line)"
                      value={(item.bullets || []).join('\n')}
                      onChange={(e) => {
                        const items = [...(section.items || [])]
                        items[itemIndex] = {
                          ...item,
                          bullets: e.target.value
                            .split('\n')
                            .map((line) => line.trim())
                            .filter(Boolean),
                        }
                        updateAt(index, { ...section, items })
                      }}
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      disabled={disabled}
                      onClick={() => {
                        const items = (section.items || []).filter((_, i) => i !== itemIndex)
                        updateAt(index, { ...section, items })
                      }}
                    >
                      Remove item
                    </Button>
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  disabled={disabled}
                  onClick={() =>
                    updateAt(index, {
                      ...section,
                      items: [
                        ...(section.items || []),
                        {
                          title: 'New item',
                          headingId: `item-${Date.now()}`,
                          paragraphs: [''],
                          steps: [],
                          bullets: [],
                        },
                      ],
                    })
                  }
                >
                  Add guide item
                </Button>
              </div>
            </>
          ) : null}
        </div>
      ))}
    </div>
  )
}
