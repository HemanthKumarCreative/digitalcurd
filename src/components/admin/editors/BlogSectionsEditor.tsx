'use client'

import type { ReactNode } from 'react'
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

const SECTION_TYPES: {
  type: BlogSection['_type']
  label: string
  hint: string
}[] = [
  {
    type: 'blogProse',
    label: 'Prose',
    hint: 'Normal text with a heading — use for intro, body, and conclusion.',
  },
  {
    type: 'blogTable',
    label: 'Table',
    hint: 'Comparison table with columns and rows.',
  },
  {
    type: 'blogGuide',
    label: 'Guide',
    hint: 'Multi-part how-to with titled items, steps, and bullets.',
  },
  {
    type: 'blogSteps',
    label: 'Steps',
    hint: 'Numbered process: Step title + explanation.',
  },
  {
    type: 'blogList',
    label: 'List',
    hint: 'Simple bullet or numbered list of points.',
  },
  {
    type: 'blogInlineCta',
    label: 'Inline CTA',
    hint: 'Mid-article call-to-action box with a button.',
  },
  {
    type: 'blogCallout',
    label: 'Callout',
    hint: 'Highlighted tip, note, or warning box.',
  },
]

const FieldHint = ({ children }: { children: ReactNode }) => (
  <p className="mt-1 text-xs text-[var(--admin-text-muted)]">{children}</p>
)

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
      <div className="rounded-lg border border-[var(--admin-border)] bg-slate-50/80 px-3 py-3">
        <p className="text-xs font-semibold text-[var(--admin-navy)]">
          What each section type is for
        </p>
        <ul className="mt-2 grid gap-1.5 text-xs text-[var(--admin-text-muted)] sm:grid-cols-2">
          {SECTION_TYPES.map((item) => (
            <li key={item.type}>
              <span className="font-semibold text-[var(--admin-text-secondary)]">
                {item.label}:
              </span>{' '}
              {item.hint}
            </li>
          ))}
        </ul>
      </div>

      <div>
        <p className="mb-2 text-xs font-semibold tracking-wide text-[var(--admin-text-muted)] uppercase">
          Add a section
        </p>
        <div className="flex flex-wrap gap-2">
          {SECTION_TYPES.map((item) => (
            <Button
              key={item.type}
              type="button"
              variant="outline"
              size="sm"
              disabled={disabled}
              onClick={() => onChange([...sections, createSection(item.type)])}
              aria-label={`Add ${item.label} section. ${item.hint}`}
              title={item.hint}
            >
              Add {item.label}
            </Button>
          ))}
        </div>
      </div>

      {!sections.length ? (
        <p className="text-sm text-[var(--admin-text-muted)]">
          No body sections yet. Start with <strong>Add Prose</strong> for your introduction,
          then add tables, guides, or CTAs as needed.
        </p>
      ) : null}

      {sections.map((section, index) => {
        const typeMeta = SECTION_TYPES.find((item) => item.type === section._type)

        return (
          <div
            key={section._key || `${section._type}-${index}`}
            className="space-y-3 rounded-xl border border-[var(--admin-border)] p-4"
          >
            <div className="flex flex-wrap items-start justify-between gap-2">
              <div>
                <p className="text-sm font-semibold text-[var(--admin-text)]">
                  {typeMeta?.label || section._type} #{index + 1}
                </p>
                {typeMeta?.hint ? (
                  <p className="mt-0.5 text-xs text-[var(--admin-text-muted)]">
                    {typeMeta.hint}
                  </p>
                ) : null}
              </div>
              <div className="flex gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  disabled={disabled || index === 0}
                  onClick={() => move(index, -1)}
                  aria-label={`Move section ${index + 1} up`}
                >
                  Up
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  disabled={disabled || index === sections.length - 1}
                  onClick={() => move(index, 1)}
                  aria-label={`Move section ${index + 1} down`}
                >
                  Down
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  disabled={disabled}
                  onClick={() => removeAt(index)}
                  aria-label={`Remove section ${index + 1}`}
                >
                  Remove
                </Button>
              </div>
            </div>

            {'heading' in section ? (
              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <Label>Section heading</Label>
                  <Input
                    value={section.heading || ''}
                    disabled={disabled}
                    placeholder="e.g. Overview"
                    onChange={(e) => {
                      const heading = e.target.value
                      updateAt(index, {
                        ...section,
                        heading,
                        headingId: slugifyHeading(heading) || section.headingId,
                      } as BlogSection)
                    }}
                  />
                  <FieldHint>Visible heading above this block on the article.</FieldHint>
                </div>
                <div>
                  <Label>Table of contents id</Label>
                  <Input
                    value={section.headingId || ''}
                    disabled={disabled}
                    placeholder="overview"
                    onChange={(e) =>
                      updateAt(index, {
                        ...section,
                        headingId: slugifyHeading(e.target.value),
                      } as BlogSection)
                    }
                  />
                  <FieldHint>
                    Auto-fills from the heading. Used for “jump to section” links — usually leave
                    as-is.
                  </FieldHint>
                </div>
              </div>
            ) : null}

            {section._type === 'blogProse' ? (
              <div>
                <Label>Paragraphs</Label>
                <Textarea
                  rows={6}
                  disabled={disabled}
                  placeholder={
                    'Write your first paragraph here.\n\nLeave a blank line between paragraphs.'
                  }
                  value={(section.paragraphs || []).join('\n\n')}
                  onChange={(e) =>
                    updateAt(index, {
                      ...section,
                      paragraphs: e.target.value.split(/\n\s*\n/).map((p) => p.trimEnd()),
                    })
                  }
                />
                <FieldHint>
                  Separate paragraphs with a blank line. You can use **bold**, `code`, and
                  [link text](/path).
                </FieldHint>
              </div>
            ) : null}

            {section._type === 'blogTable' ? (
              <>
                <div>
                  <Label>Column headers</Label>
                  <Input
                    disabled={disabled}
                    placeholder="Topic, Why it matters, Example"
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
                  <FieldHint>Comma-separated header labels for each column.</FieldHint>
                </div>
                <div>
                  <Label>Table rows</Label>
                  <Textarea
                    rows={6}
                    disabled={disabled}
                    placeholder={'Row 1 col A | Row 1 col B\nRow 2 col A | Row 2 col B'}
                    value={rowsToText((section.rows || []) as TableRow[])}
                    onChange={(e) =>
                      updateAt(index, {
                        ...section,
                        rows: textToRows(e.target.value) as unknown as string[][],
                      })
                    }
                  />
                  <FieldHint>
                    One row per line. Separate cells with a pipe: Cell A | Cell B | Cell C
                  </FieldHint>
                </div>
              </>
            ) : null}

            {section._type === 'blogInlineCta' ? (
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <Label>CTA headline</Label>
                  <Input
                    disabled={disabled}
                    value={section.title || ''}
                    placeholder="e.g. Need help applying this?"
                    onChange={(e) => updateAt(index, { ...section, title: e.target.value })}
                  />
                </div>
                <div className="sm:col-span-2">
                  <Label>CTA description</Label>
                  <Textarea
                    rows={3}
                    disabled={disabled}
                    value={section.description || ''}
                    placeholder="One sentence inviting the reader to take the next step."
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
                    placeholder="View related service"
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
                    placeholder="/services/ai-agent-development"
                    onChange={(e) =>
                      updateAt(index, { ...section, ctaHref: e.target.value })
                    }
                  />
                  <FieldHint>Site path or full URL, e.g. /contact</FieldHint>
                </div>
              </div>
            ) : null}

            {section._type === 'blogCallout' ? (
              <div className="grid gap-3">
                <div>
                  <Label>Callout style</Label>
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
                    aria-label="Callout style"
                  >
                    <option value="tip">Tip — helpful suggestion</option>
                    <option value="note">Note — neutral extra info</option>
                    <option value="warning">Warning — caution / risk</option>
                  </select>
                </div>
                <div>
                  <Label>Callout text</Label>
                  <Textarea
                    rows={3}
                    disabled={disabled}
                    value={section.body || ''}
                    placeholder="Write the tip, note, or warning here."
                    onChange={(e) => updateAt(index, { ...section, body: e.target.value })}
                  />
                </div>
              </div>
            ) : null}

            {section._type === 'blogList' ? (
              <>
                <div>
                  <Label>List style</Label>
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
                    aria-label="List style"
                  >
                    <option value="bullet">Bullets</option>
                    <option value="numbered">Numbered</option>
                  </select>
                </div>
                <div>
                  <Label>List items</Label>
                  <Textarea
                    rows={5}
                    disabled={disabled}
                    placeholder={'First point\nSecond point\nThird point'}
                    value={(section.items || []).join('\n')}
                    onChange={(e) =>
                      updateAt(index, {
                        ...section,
                        items: e.target.value.split('\n').map((line) => line.trimEnd()),
                      })
                    }
                  />
                  <FieldHint>One item per line.</FieldHint>
                </div>
              </>
            ) : null}

            {section._type === 'blogSteps' ? (
              <>
                <div>
                  <Label>Intro (optional)</Label>
                  <Textarea
                    rows={2}
                    disabled={disabled}
                    value={section.intro || ''}
                    placeholder="Short intro before the numbered steps."
                    onChange={(e) => updateAt(index, { ...section, intro: e.target.value })}
                  />
                </div>
                <div>
                  <Label>Steps</Label>
                  <Textarea
                    rows={5}
                    disabled={disabled}
                    placeholder={
                      'Prepare :: Gather the inputs you need.\nExecute :: Run the first controlled change.'
                    }
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
                  <FieldHint>
                    One step per line. Format: Step title :: Explanation
                  </FieldHint>
                </div>
              </>
            ) : null}

            {section._type === 'blogGuide' ? (
              <>
                <div>
                  <Label>Guide intro (optional)</Label>
                  <Textarea
                    rows={2}
                    disabled={disabled}
                    value={section.intro || ''}
                    placeholder="Brief intro for the whole guide section."
                    onChange={(e) => updateAt(index, { ...section, intro: e.target.value })}
                  />
                </div>
                <div className="space-y-3">
                  <div>
                    <Label>Guide items</Label>
                    <FieldHint>
                      Each item is a mini section with its own title, paragraphs, steps, and
                      bullets. Fill only what you need.
                    </FieldHint>
                  </div>
                  {(section.items || []).map((item, itemIndex) => (
                    <div
                      key={item.headingId || itemIndex}
                      className="space-y-2 rounded-lg border border-[var(--admin-border)] p-3"
                    >
                      <p className="text-xs font-semibold text-[var(--admin-text-secondary)]">
                        Guide item #{itemIndex + 1}
                      </p>
                      <div>
                        <Label>Item title</Label>
                        <Input
                          disabled={disabled}
                          placeholder="e.g. First action"
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
                      </div>
                      <div>
                        <Label>Paragraphs</Label>
                        <Textarea
                          rows={2}
                          disabled={disabled}
                          placeholder="Explain this item. Blank line between paragraphs."
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
                      </div>
                      <div>
                        <Label>Steps (optional)</Label>
                        <Textarea
                          rows={3}
                          disabled={disabled}
                          placeholder="Prepare :: Gather inputs.\nExecute :: Make the change."
                          value={(item.steps || [])
                            .map(
                              (step) =>
                                `${step.title}${step.body ? ` :: ${step.body}` : ''}`
                            )
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
                        <FieldHint>One per line: Title :: Body</FieldHint>
                      </div>
                      <div>
                        <Label>Bullets (optional)</Label>
                        <Textarea
                          rows={2}
                          disabled={disabled}
                          placeholder={'Point one\nPoint two'}
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
                        <FieldHint>One bullet per line.</FieldHint>
                      </div>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        disabled={disabled}
                        onClick={() => {
                          const items = (section.items || []).filter(
                            (_, i) => i !== itemIndex
                          )
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
        )
      })}
    </div>
  )
}
