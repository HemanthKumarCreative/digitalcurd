'use client'

import { useId } from 'react'
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

type TextFieldProps = {
  label: string
  value: string
  onChange: (next: string) => void
  disabled?: boolean
  textarea?: boolean
  rows?: number
  placeholder?: string
  helper?: string
}

/** Label + input/textarea pair with a generated id so labels are announced correctly. */
const TextField = ({
  label,
  value,
  onChange,
  disabled,
  textarea,
  rows = 3,
  placeholder,
  helper,
}: TextFieldProps) => {
  const id = useId()
  return (
    <div>
      <Label htmlFor={id}>{label}</Label>
      {textarea ? (
        <Textarea
          id={id}
          rows={rows}
          value={value}
          disabled={disabled}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
        />
      ) : (
        <Input
          id={id}
          value={value}
          disabled={disabled}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
        />
      )}
      {helper ? <p className="mt-1 text-xs text-[var(--admin-text-muted)]">{helper}</p> : null}
    </div>
  )
}

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
        <TextField
          key={key}
          label={label}
          value={String(value[key] || '')}
          disabled={disabled}
          onChange={(next) => onChange({ ...value, [key]: next })}
        />
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
    <TextField
      label="Subtitle"
      value={String(value.subtitle || '')}
      disabled={disabled}
      onChange={(next) => onChange({ ...value, subtitle: next })}
    />
    <TextField
      label="Title"
      value={String(value.title || '')}
      disabled={disabled}
      onChange={(next) => onChange({ ...value, title: next })}
    />
    <TextField
      label="Paragraphs (one per blank line)"
      textarea
      rows={5}
      value={asArray(value.paragraphs).map(String).join('\n\n')}
      disabled={disabled}
      onChange={(next) =>
        onChange({
          ...value,
          paragraphs: next
            .split(/\n\n+/)
            .map((p) => p.trim())
            .filter(Boolean),
        })
      }
    />
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
        <TextField
          key={key}
          label={label}
          value={String(value[key] || '')}
          disabled={disabled}
          onChange={(next) => onChange({ ...value, [key]: next })}
        />
      ))}
    </div>
    <TextField
      label="Header description"
      textarea
      value={String(value.headerDesc || '')}
      disabled={disabled}
      onChange={(next) => onChange({ ...value, headerDesc: next })}
    />
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
    <TextField
      label="Title"
      value={String(value.title || '')}
      disabled={disabled}
      onChange={(next) => onChange({ ...value, title: next })}
    />
    <TextField
      label="Description"
      textarea
      value={String(value.description || '')}
      disabled={disabled}
      onChange={(next) => onChange({ ...value, description: next })}
    />
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
    <TextField
      label="Header title"
      value={String(value.headerTitle || '')}
      disabled={disabled}
      onChange={(next) => onChange({ ...value, headerTitle: next })}
    />
    <TextField
      label="Header description"
      textarea
      value={String(value.headerDesc || '')}
      disabled={disabled}
      onChange={(next) => onChange({ ...value, headerDesc: next })}
    />
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
        <TextField
          label="Title"
          value={String(value.title || '')}
          disabled={disabled}
          onChange={(next) => onChange({ ...value, title: next })}
        />
        <TextField
          label="Subtitle"
          textarea
          rows={2}
          value={String(value.subtitle || '')}
          disabled={disabled}
          onChange={(next) => onChange({ ...value, subtitle: next })}
        />
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
          <TextField
            key={key}
            label={label}
            value={String(leftCol[key] || '')}
            disabled={disabled}
            onChange={(next) =>
              onChange({ ...value, leftCol: { ...leftCol, [key]: next } })
            }
          />
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
          <TextField
            key={key}
            label={label}
            value={String(form[key] || '')}
            disabled={disabled}
            onChange={(next) => onChange({ ...value, form: { ...form, [key]: next } })}
          />
        ))}
        <TextField
          label="Success message"
          textarea
          rows={2}
          value={String(form.successMessage || '')}
          disabled={disabled}
          onChange={(next) =>
            onChange({ ...value, form: { ...form, successMessage: next } })
          }
        />
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
        <TextField
          key={key}
          label={label}
          value={String(value[key] || '')}
          disabled={disabled}
          onChange={(next) => onChange({ ...value, [key]: next })}
        />
      ))}
    </div>
    <TextField
      label="Subtitle"
      textarea
      rows={2}
      value={String(value.subtitle || '')}
      disabled={disabled}
      onChange={(next) => onChange({ ...value, subtitle: next })}
    />
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
            <TextField
              label="Question"
              value={String(faq.question || '')}
              disabled={disabled}
              onChange={(next) => {
                const faqs = asArray(value.faqs).map((item, i) =>
                  i === index ? { ...item, question: next } : item
                )
                onChange({ ...value, faqs })
              }}
            />
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
    <TextField
      label={label}
      textarea
      rows={10}
      value={list.join('\n\n')}
      disabled={disabled}
      placeholder="Separate paragraphs with a blank line"
      helper="One paragraph per block. Separate with a blank line."
      onChange={(next) =>
        onChange(
          next
            .split(/\n\n+/)
            .map((p) => p.trim())
            .filter(Boolean)
        )
      }
    />
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
    <TextField
      label="Section title"
      value={String(value.title || '')}
      disabled={disabled}
      onChange={(next) => onChange({ ...value, title: next })}
    />
    <TextField
      label="Description"
      textarea
      value={String(value.description || value.subtitle || '')}
      disabled={disabled}
      onChange={(next) => onChange({ ...value, description: next })}
    />
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
