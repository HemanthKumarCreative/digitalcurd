import { defineField, defineType } from 'sanity'

export const cta = defineType({
  name: 'cta',
  title: 'CTA',
  type: 'object',
  fields: [
    defineField({ name: 'label', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'href', type: 'string', validation: (r) => r.required() }),
  ],
})

export const phoneCta = defineType({
  name: 'phoneCta',
  title: 'Phone CTA',
  type: 'object',
  fields: [
    defineField({ name: 'label', type: 'string', validation: (r) => r.required() }),
    defineField({
      name: 'href',
      type: 'string',
      description: 'tel:+91...',
      validation: (r) => r.required(),
    }),
  ],
})

export const seo = defineType({
  name: 'seo',
  title: 'SEO',
  type: 'object',
  fields: [
    defineField({ name: 'title', type: 'string' }),
    defineField({ name: 'description', type: 'text', rows: 3 }),
  ],
})

export const pageHero = defineType({
  name: 'pageHero',
  title: 'Page Hero',
  type: 'object',
  fields: [
    defineField({ name: 'eyebrow', type: 'string' }),
    defineField({ name: 'title', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'subtitle', type: 'string' }),
    defineField({ name: 'description', type: 'text', rows: 3 }),
    defineField({ name: 'backgroundImage', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'backgroundUrl', type: 'url', title: 'Background URL fallback' }),
    defineField({ name: 'cta', type: 'cta' }),
    defineField({ name: 'secondaryCta', type: 'cta' }),
    defineField({ name: 'phone', type: 'phoneCta' }),
  ],
})

export const featureItem = defineType({
  name: 'featureItem',
  title: 'Feature Item',
  type: 'object',
  fields: [
    defineField({ name: 'title', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'description', type: 'text', rows: 3 }),
    defineField({
      name: 'icon',
      type: 'string',
      options: {
        list: [
          'bot',
          'chart',
          'checkCircle',
          'clock',
          'code',
          'fileSearch',
          'globe',
          'hardDrive',
          'layers',
          'lock',
          'megaphone',
          'monitor',
          'palette',
          'search',
          'shield',
          'sparkles',
          'target',
          'users',
          'workflow',
          'zap',
        ],
      },
    }),
  ],
})

export const processStep = defineType({
  name: 'processStep',
  title: 'Process Step',
  type: 'object',
  fields: [
    defineField({ name: 'title', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'description', type: 'text', rows: 2 }),
  ],
})

export const faqItem = defineType({
  name: 'faqItem',
  title: 'FAQ Item',
  type: 'object',
  fields: [
    defineField({ name: 'question', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'answer', type: 'text', rows: 4, validation: (r) => r.required() }),
  ],
})

export const statItem = defineType({
  name: 'statItem',
  title: 'Stat',
  type: 'object',
  fields: [
    defineField({ name: 'number', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'label', type: 'string', validation: (r) => r.required() }),
  ],
})

export const legalSection = defineType({
  name: 'legalSection',
  title: 'Legal Section',
  type: 'object',
  fields: [
    defineField({ name: 'heading', type: 'string', validation: (r) => r.required() }),
    defineField({
      name: 'paragraphs',
      type: 'array',
      of: [{ type: 'text' }],
      validation: (r) => r.required().min(1),
    }),
  ],
})

export const socialLink = defineType({
  name: 'socialLink',
  title: 'Social Link',
  type: 'object',
  fields: [
    defineField({
      name: 'label',
      type: 'string',
      options: { list: ['Facebook', 'LinkedIn', 'Instagram', 'YouTube'] },
      validation: (r) => r.required(),
    }),
    defineField({ name: 'href', type: 'url', validation: (r) => r.required() }),
  ],
})

export const logoItem = defineType({
  name: 'logoItem',
  title: 'Logo',
  type: 'object',
  fields: [
    defineField({ name: 'name', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'image', type: 'image' }),
    defineField({ name: 'src', type: 'string', title: 'Local/public path or URL' }),
  ],
})

export const helpCard = defineType({
  name: 'helpCard',
  title: 'Help Card',
  type: 'object',
  fields: [
    defineField({ name: 'title', type: 'string' }),
    defineField({ name: 'link', type: 'string' }),
    defineField({ name: 'description', type: 'text' }),
    defineField({ name: 'howWeHelpTitle', type: 'string' }),
    defineField({ name: 'list', type: 'array', of: [{ type: 'string' }] }),
  ],
})

export const pillarItem = defineType({
  name: 'pillarItem',
  title: 'Pillar',
  type: 'object',
  fields: [
    defineField({ name: 'badge', type: 'string' }),
    defineField({ name: 'title', type: 'string' }),
    defineField({ name: 'link', type: 'string' }),
    defineField({ name: 'desc', type: 'text' }),
    defineField({ name: 'footerText', type: 'text' }),
    defineField({ name: 'highlighted', type: 'boolean' }),
  ],
})

export const serviceCategoryValues = [
  { title: 'AI & Automation', value: 'AI & Automation' },
  { title: 'Growth Marketing', value: 'Growth Marketing' },
  { title: 'Ecommerce', value: 'Ecommerce' },
  { title: 'Digital Engineering', value: 'Digital Engineering' },
  { title: 'Creative Studio', value: 'Creative Studio' },
]
