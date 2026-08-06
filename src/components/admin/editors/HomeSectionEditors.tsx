'use client'

import { HtmlTextField } from '@/components/admin/editors/HtmlTextField'
import { FEATURE_ICON_OPTIONS } from '@/components/admin/editors/fieldOptions'
import { ImageField } from '@/components/admin/ImageField'
import {
  RepeatableListEditor,
  type RepeatableItem,
} from '@/components/admin/editors/RepeatableListEditor'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

type Obj = Record<string, unknown>

type Props = {
  value: Obj
  onChange: (next: Obj) => void
  disabled?: boolean
}

const asArray = (value: unknown): RepeatableItem[] =>
  Array.isArray(value) ? (value as RepeatableItem[]) : []

export const LogosSliderEditor = ({ value, onChange, disabled }: Props) => (
  <div className="space-y-4">
    <div className="grid gap-4 sm:grid-cols-2">
      {(
        [
          ['headingText1', 'Heading text 1'],
          ['headingStrong', 'Heading emphasis'],
          ['headingText2', 'Heading text 2'],
          ['toolsLabel', 'Tools label'],
          ['clientsLabel', 'Clients label'],
        ] as const
      ).map(([key, label]) => (
        <div key={key}>
          <Label>{label}</Label>
          <Input
            value={String(value[key] || '')}
            disabled={disabled}
            onChange={(e) => onChange({ ...value, [key]: e.target.value })}
          />
        </div>
      ))}
    </div>
    <RepeatableListEditor
      label="Tool logos"
      items={asArray(value.logos)}
      disabled={disabled}
      addLabel="Add logo"
      fields={[
        { key: 'name', label: 'Name' },
        { key: 'src', label: 'Image path / URL', type: 'image' },
      ]}
      onChange={(logos) => onChange({ ...value, logos })}
    />
    <RepeatableListEditor
      label="Client names"
      items={asArray(value.clients)}
      disabled={disabled}
      addLabel="Add client"
      fields={[{ key: 'name', label: 'Name' }]}
      onChange={(clients) => onChange({ ...value, clients })}
    />
  </div>
)

export const StatsDeliveryEditor = ({ value, onChange, disabled }: Props) => (
  <div className="space-y-4">
    <div>
      <Label>Subtitle</Label>
      <Input
        value={String(value.subtitle || '')}
        disabled={disabled}
        onChange={(e) => onChange({ ...value, subtitle: e.target.value })}
      />
    </div>
    <div>
      <Label>Title</Label>
      <Input
        value={String(value.title || '')}
        disabled={disabled}
        onChange={(e) => onChange({ ...value, title: e.target.value })}
      />
    </div>
    <div>
      <Label>Paragraphs (one per blank line)</Label>
      <Textarea
        rows={5}
        value={asArray(value.paragraphs).map(String).join('\n\n')}
        disabled={disabled}
        onChange={(e) =>
          onChange({
            ...value,
            paragraphs: e.target.value
              .split(/\n\n+/)
              .map((p) => p.trim())
              .filter(Boolean),
          })
        }
      />
    </div>
    <RepeatableListEditor
      label="Stats"
      items={asArray(value.stats)}
      disabled={disabled}
      addLabel="Add stat"
      fields={[
        { key: 'number', label: 'Number' },
        { key: 'label', label: 'Label' },
      ]}
      onChange={(stats) => onChange({ ...value, stats })}
    />
  </div>
)

export const HelpGridEditor = ({ value, onChange, disabled }: Props) => (
  <div className="space-y-4">
    <div className="grid gap-4 sm:grid-cols-2">
      {(
        [
          ['headerTitle1', 'Header title 1'],
          ['headerTitleEm', 'Header emphasis'],
          ['headerTitle2', 'Header title 2'],
        ] as const
      ).map(([key, label]) => (
        <div key={key}>
          <Label>{label}</Label>
          <Input
            value={String(value[key] || '')}
            disabled={disabled}
            onChange={(e) => onChange({ ...value, [key]: e.target.value })}
          />
        </div>
      ))}
    </div>
    <div>
      <Label>Header description</Label>
      <Textarea
        rows={3}
        value={String(value.headerDesc || '')}
        disabled={disabled}
        onChange={(e) => onChange({ ...value, headerDesc: e.target.value })}
      />
    </div>
    <RepeatableListEditor
      label="Help cards"
      items={asArray(value.cards)}
      disabled={disabled}
      addLabel="Add card"
      fields={[
        { key: 'title', label: 'Title' },
        { key: 'link', label: 'Link' },
        { key: 'description', label: 'Description', type: 'textarea' },
        { key: 'howWeHelpTitle', label: 'How we help title' },
        { key: 'list', label: 'Bullet list', type: 'stringList' },
      ]}
      onChange={(cards) => onChange({ ...value, cards })}
    />
  </div>
)

export const AiBlockEditor = ({ value, onChange, disabled }: Props) => (
  <div className="space-y-4">
    <ImageField
      label="Section image"
      value={String(value.imageUrl || '')}
      disabled={disabled}
      onChange={(url) => onChange({ ...value, imageUrl: url })}
    />
    <div>
      <Label>Title</Label>
      <Input
        value={String(value.title || '')}
        disabled={disabled}
        onChange={(e) => onChange({ ...value, title: e.target.value })}
      />
    </div>
    <div>
      <Label>Description</Label>
      <Textarea
        rows={3}
        value={String(value.description || '')}
        disabled={disabled}
        onChange={(e) => onChange({ ...value, description: e.target.value })}
      />
    </div>
    <RepeatableListEditor
      label="AI items"
      items={asArray(value.items)}
      disabled={disabled}
      addLabel="Add item"
      fields={[
        { key: 'title', label: 'Title' },
        { key: 'desc', label: 'Description', type: 'textarea' },
        { key: 'isList', label: 'Show as list style', type: 'boolean' },
      ]}
      onChange={(items) => onChange({ ...value, items })}
    />
  </div>
)

export const PillarsEditor = ({ value, onChange, disabled }: Props) => (
  <div className="space-y-4">
    <div>
      <Label>Header title</Label>
      <Input
        value={String(value.headerTitle || '')}
        disabled={disabled}
        onChange={(e) => onChange({ ...value, headerTitle: e.target.value })}
      />
    </div>
    <div>
      <Label>Header description</Label>
      <Textarea
        rows={3}
        value={String(value.headerDesc || '')}
        disabled={disabled}
        onChange={(e) => onChange({ ...value, headerDesc: e.target.value })}
      />
    </div>
    <RepeatableListEditor
      label="Pillars"
      items={asArray(value.pillars)}
      disabled={disabled}
      addLabel="Add pillar"
      fields={[
        { key: 'badge', label: 'Badge' },
        { key: 'title', label: 'Title' },
        { key: 'link', label: 'Link' },
        { key: 'desc', label: 'Description', type: 'textarea' },
        { key: 'footerText', label: 'Footer text', type: 'textarea' },
        { key: 'highlighted', label: 'Highlighted', type: 'boolean' },
      ]}
      onChange={(pillars) => onChange({ ...value, pillars })}
    />
  </div>
)

export const ContactFormBlockEditor = ({ value, onChange, disabled }: Props) => {
  const leftCol = (value.leftCol && typeof value.leftCol === 'object'
    ? value.leftCol
    : {}) as Obj
  const form = (value.form && typeof value.form === 'object' ? value.form : {}) as Obj

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <p className="text-xs font-bold tracking-wide text-[var(--admin-text-muted)] uppercase">
          Section header
        </p>
        <div>
          <Label>Title</Label>
          <Input
            value={String(value.title || '')}
            disabled={disabled}
            onChange={(e) => onChange({ ...value, title: e.target.value })}
          />
        </div>
        <div>
          <Label>Subtitle</Label>
          <Textarea
            rows={2}
            value={String(value.subtitle || '')}
            disabled={disabled}
            onChange={(e) => onChange({ ...value, subtitle: e.target.value })}
          />
        </div>
        <ImageField
          label="Side image"
          value={String(value.imageUrl || '')}
          disabled={disabled}
          onChange={(url) => onChange({ ...value, imageUrl: url })}
        />
      </div>

      <div className="space-y-4">
        <p className="text-xs font-bold tracking-wide text-[var(--admin-text-muted)] uppercase">
          Left column
        </p>
        {(
          [
            ['title', 'Title'],
            ['bookCallLabel', 'Book call label'],
            ['bookCallLink', 'Book call link'],
            ['emailLabel', 'Email label'],
            ['email', 'Email'],
          ] as const
        ).map(([key, label]) => (
          <div key={key}>
            <Label>{label}</Label>
            <Input
              value={String(leftCol[key] || '')}
              disabled={disabled}
              onChange={(e) =>
                onChange({ ...value, leftCol: { ...leftCol, [key]: e.target.value } })
              }
            />
          </div>
        ))}
        <RepeatableListEditor
          label="Trust items"
          items={asArray(leftCol.trustItems)}
          disabled={disabled}
          addLabel="Add trust item"
          fields={[
            { key: 'title', label: 'Title' },
            { key: 'desc', label: 'Description' },
          ]}
          onChange={(trustItems) =>
            onChange({ ...value, leftCol: { ...leftCol, trustItems } })
          }
        />
        <RepeatableListEditor
          label="Awards"
          items={asArray(leftCol.awards)}
          disabled={disabled}
          addLabel="Add award"
          fields={[
            { key: 'name', label: 'Name' },
            { key: 'src', label: 'Image', type: 'image' },
          ]}
          onChange={(awards) => onChange({ ...value, leftCol: { ...leftCol, awards } })}
        />
      </div>

      <div className="space-y-4">
        <p className="text-xs font-bold tracking-wide text-[var(--admin-text-muted)] uppercase">
          Form copy
        </p>
        {(
          [
            ['namePlaceholder', 'Name placeholder'],
            ['emailPlaceholder', 'Email placeholder'],
            ['phonePlaceholder', 'Phone placeholder'],
            ['countryPlaceholder', 'Country placeholder'],
            ['servicePlaceholder', 'Service placeholder'],
            ['requirementsPlaceholder', 'Requirements placeholder'],
            ['browseLabel', 'Browse label'],
            ['submitButton', 'Submit button'],
          ] as const
        ).map(([key, label]) => (
          <div key={key}>
            <Label>{label}</Label>
            <Input
              value={String(form[key] || '')}
              disabled={disabled}
              onChange={(e) => onChange({ ...value, form: { ...form, [key]: e.target.value } })}
            />
          </div>
        ))}
        <div>
          <Label>Success message</Label>
          <Textarea
            rows={2}
            value={String(form.successMessage || '')}
            disabled={disabled}
            onChange={(e) =>
              onChange({ ...value, form: { ...form, successMessage: e.target.value } })
            }
          />
        </div>
        <RepeatableListEditor
          label="Service groups"
          items={asArray(form.services)}
          disabled={disabled}
          addLabel="Add group"
          fields={[
            { key: 'group', label: 'Group name' },
            { key: 'options', label: 'Options', type: 'stringList' },
          ]}
          onChange={(services) => onChange({ ...value, form: { ...form, services } })}
        />
      </div>
    </div>
  )
}

export const FaqSectionEditor = ({ value, onChange, disabled }: Props) => (
  <div className="space-y-4">
    <div className="grid gap-4 sm:grid-cols-2">
      {(
        [
          ['title', 'Title'],
          ['titleLine1', 'Title line 1'],
          ['titleEm', 'Title emphasis'],
        ] as const
      ).map(([key, label]) => (
        <div key={key}>
          <Label>{label}</Label>
          <Input
            value={String(value[key] || '')}
            disabled={disabled}
            onChange={(e) => onChange({ ...value, [key]: e.target.value })}
          />
        </div>
      ))}
    </div>
    <div>
      <Label>Subtitle</Label>
      <Textarea
        rows={2}
        value={String(value.subtitle || '')}
        disabled={disabled}
        onChange={(e) => onChange({ ...value, subtitle: e.target.value })}
      />
    </div>
    <div className="space-y-3">
      <div className="flex items-center justify-between gap-3">
        <Label className="mb-0">FAQs</Label>
        <Button
          type="button"
          variant="soft"
          size="sm"
          disabled={disabled}
          onClick={() =>
            onChange({
              ...value,
              faqs: [
                ...asArray(value.faqs),
                { question: '', answer: '' },
              ],
            })
          }
        >
          Add FAQ
        </Button>
      </div>
      {asArray(value.faqs).length === 0 ? (
        <p className="rounded-[var(--admin-radius-sm)] border border-dashed border-[var(--admin-border)] px-3 py-4 text-sm text-[var(--admin-text-muted)]">
          No FAQs yet.
        </p>
      ) : (
        asArray(value.faqs).map((faq, index) => (
          <div
            key={index}
            className="space-y-3 rounded-[var(--admin-radius-sm)] border border-[var(--admin-border)] bg-slate-50/70 p-3"
          >
            <div className="flex items-center justify-between">
              <p className="text-xs font-bold tracking-wide text-[var(--admin-text-muted)] uppercase">
                FAQ {index + 1}
              </p>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                disabled={disabled}
                onClick={() =>
                  onChange({
                    ...value,
                    faqs: asArray(value.faqs).filter((_, i) => i !== index),
                  })
                }
              >
                Remove
              </Button>
            </div>
            <div>
              <Label>Question</Label>
              <Input
                value={String(faq.question || '')}
                disabled={disabled}
                onChange={(e) => {
                  const faqs = asArray(value.faqs).map((item, i) =>
                    i === index ? { ...item, question: e.target.value } : item
                  )
                  onChange({ ...value, faqs })
                }}
              />
            </div>
            <HtmlTextField
              label="Answer"
              value={String(faq.answer || '')}
              disabled={disabled}
              onChange={(html) => {
                const faqs = asArray(value.faqs).map((item, i) =>
                  i === index ? { ...item, answer: html } : item
                )
                onChange({ ...value, faqs })
              }}
            />
          </div>
        ))
      )}
    </div>
  </div>
)

export const StringListEditor = ({
  value,
  onChange,
  disabled,
  label = 'Paragraphs',
}: {
  value: unknown
  onChange: (next: string[]) => void
  disabled?: boolean
  label?: string
}) => {
  const list = Array.isArray(value) ? value.map(String) : []
  return (
    <div>
      <Label>{label}</Label>
      <Textarea
        rows={10}
        value={list.join('\n\n')}
        disabled={disabled}
        placeholder="Separate paragraphs with a blank line"
        onChange={(e) =>
          onChange(
            e.target.value
              .split(/\n\n+/)
              .map((p) => p.trim())
              .filter(Boolean)
          )
        }
      />
      <p className="mt-1 text-xs text-[var(--admin-text-muted)]">
        One paragraph per block. Separate with a blank line.
      </p>
    </div>
  )
}

export const LegalSectionsEditor = ({
  value,
  onChange,
  disabled,
}: {
  value: unknown
  onChange: (next: Obj[]) => void
  disabled?: boolean
}) => {
  const sections = Array.isArray(value) ? (value as Obj[]) : []

  return (
    <div className="space-y-4">
      <RepeatableListEditor
        label="Legal sections"
        items={sections.map((section) => ({
          heading: String(section.heading || ''),
          paragraphs: Array.isArray(section.paragraphs)
            ? (section.paragraphs as string[])
            : [],
        })) as RepeatableItem[]}
        disabled={disabled}
        addLabel="Add section"
        fields={[
          { key: 'heading', label: 'Heading' },
          { key: 'paragraphs', label: 'Paragraphs', type: 'stringList' },
        ]}
        onChange={(items) =>
          onChange(
            items.map((item) => ({
              heading: String(item.heading || ''),
              paragraphs: Array.isArray(item.paragraphs) ? item.paragraphs : [],
            }))
          )
        }
      />
    </div>
  )
}

export const FeaturesSectionEditor = ({ value, onChange, disabled }: Props) => (
  <div className="space-y-4">
    <div>
      <Label>Section title</Label>
      <Input
        value={String(value.title || '')}
        disabled={disabled}
        onChange={(e) => onChange({ ...value, title: e.target.value })}
      />
    </div>
    <div>
      <Label>Description</Label>
      <Textarea
        rows={3}
        value={String(value.description || value.subtitle || '')}
        disabled={disabled}
        onChange={(e) => onChange({ ...value, description: e.target.value })}
      />
    </div>
    <RepeatableListEditor
      label="Feature items"
      items={asArray(value.items)}
      disabled={disabled}
      addLabel="Add feature"
      fields={[
        { key: 'title', label: 'Title' },
        { key: 'description', label: 'Description', type: 'textarea' },
        { key: 'icon', label: 'Icon', type: 'select', options: FEATURE_ICON_OPTIONS },
      ]}
      onChange={(items) => onChange({ ...value, items })}
    />
  </div>
)
