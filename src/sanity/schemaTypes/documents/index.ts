import { defineField, defineType } from 'sanity'
import { serviceCategoryValues } from '../objects'

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({ name: 'siteName', type: 'string', initialValue: 'Digital Curd' }),
    defineField({ name: 'email', type: 'string' }),
    defineField({ name: 'phone', type: 'phoneCta' }),
    defineField({ name: 'footerBlurb', type: 'text', rows: 3 }),
    defineField({ name: 'socialLinks', type: 'array', of: [{ type: 'socialLink' }] }),
    defineField({ name: 'seo', type: 'seo' }),
  ],
})

export const homePage = defineType({
  name: 'homePage',
  title: 'Home Page',
  type: 'document',
  fields: [
    defineField({
      name: 'heroSection',
      type: 'object',
      fields: [
        defineField({ name: 'backgroundImage', type: 'image', options: { hotspot: true } }),
        defineField({ name: 'backgroundUrl', type: 'url' }),
        defineField({ name: 'title', type: 'string' }),
        defineField({ name: 'subtitle', type: 'string' }),
        defineField({ name: 'description', type: 'text' }),
        defineField({ name: 'ctaText', type: 'string' }),
        defineField({ name: 'ctaLink', type: 'string' }),
        defineField({ name: 'awards', type: 'array', of: [{ type: 'string' }] }),
      ],
    }),
    defineField({
      name: 'clientLogosSlider',
      type: 'object',
      fields: [
        defineField({ name: 'headingText1', type: 'string' }),
        defineField({ name: 'headingStrong', type: 'string' }),
        defineField({ name: 'headingText2', type: 'string' }),
        defineField({ name: 'toolsLabel', type: 'string' }),
        defineField({ name: 'clientsLabel', type: 'string' }),
        defineField({ name: 'logos', type: 'array', of: [{ type: 'logoItem' }] }),
        defineField({
          name: 'clients',
          type: 'array',
          of: [{ type: 'object', fields: [{ name: 'name', type: 'string' }] }],
        }),
      ],
    }),
    defineField({
      name: 'statsDeliverySection',
      type: 'object',
      fields: [
        defineField({ name: 'subtitle', type: 'string' }),
        defineField({ name: 'title', type: 'string' }),
        defineField({ name: 'paragraphs', type: 'array', of: [{ type: 'text' }] }),
        defineField({ name: 'stats', type: 'array', of: [{ type: 'statItem' }] }),
      ],
    }),
    defineField({
      name: 'helpSectionGrid',
      type: 'object',
      fields: [
        defineField({ name: 'headerTitle1', type: 'string' }),
        defineField({ name: 'headerTitleEm', type: 'string' }),
        defineField({ name: 'headerTitle2', type: 'string' }),
        defineField({ name: 'headerDesc', type: 'text' }),
        defineField({ name: 'cards', type: 'array', of: [{ type: 'helpCard' }] }),
      ],
    }),
    defineField({
      name: 'aiSection',
      type: 'object',
      fields: [
        defineField({ name: 'image', type: 'image', options: { hotspot: true } }),
        defineField({ name: 'imageUrl', type: 'url' }),
        defineField({ name: 'title', type: 'string' }),
        defineField({ name: 'description', type: 'text' }),
        defineField({
          name: 'items',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                defineField({ name: 'title', type: 'string' }),
                defineField({ name: 'desc', type: 'text' }),
                defineField({ name: 'isList', type: 'boolean' }),
              ],
            },
          ],
        }),
      ],
    }),
    defineField({
      name: 'corePillarsSection',
      type: 'object',
      fields: [
        defineField({ name: 'headerTitle', type: 'string' }),
        defineField({ name: 'headerDesc', type: 'text' }),
        defineField({ name: 'pillars', type: 'array', of: [{ type: 'pillarItem' }] }),
      ],
    }),
    defineField({
      name: 'faqAccordion',
      type: 'object',
      fields: [
        defineField({ name: 'title', type: 'string' }),
        defineField({ name: 'titleLine1', type: 'string' }),
        defineField({ name: 'titleEm', type: 'string' }),
        defineField({ name: 'subtitle', type: 'text' }),
        defineField({ name: 'faqs', type: 'array', of: [{ type: 'faqItem' }] }),
      ],
    }),
    defineField({
      name: 'contactForm',
      type: 'object',
      fields: [
        defineField({ name: 'title', type: 'string' }),
        defineField({ name: 'subtitle', type: 'text' }),
        defineField({ name: 'image', type: 'image', options: { hotspot: true } }),
        defineField({ name: 'imageUrl', type: 'url' }),
        defineField({
          name: 'leftCol',
          type: 'object',
          fields: [
            defineField({ name: 'title', type: 'string' }),
            defineField({ name: 'bookCallLabel', type: 'string' }),
            defineField({ name: 'bookCallLink', type: 'string' }),
            defineField({ name: 'emailLabel', type: 'string' }),
            defineField({ name: 'email', type: 'string' }),
            defineField({
              name: 'trustItems',
              type: 'array',
              of: [
                {
                  type: 'object',
                  fields: [
                    defineField({ name: 'title', type: 'string' }),
                    defineField({ name: 'desc', type: 'string' }),
                  ],
                },
              ],
            }),
            defineField({
              name: 'awards',
              type: 'array',
              of: [
                {
                  type: 'object',
                  fields: [
                    defineField({ name: 'name', type: 'string' }),
                    defineField({ name: 'src', type: 'string' }),
                  ],
                },
              ],
            }),
          ],
        }),
        defineField({
          name: 'form',
          type: 'object',
          fields: [
            defineField({ name: 'namePlaceholder', type: 'string' }),
            defineField({ name: 'emailPlaceholder', type: 'string' }),
            defineField({ name: 'phonePlaceholder', type: 'string' }),
            defineField({ name: 'countryPlaceholder', type: 'string' }),
            defineField({ name: 'servicePlaceholder', type: 'string' }),
            defineField({ name: 'requirementsPlaceholder', type: 'string' }),
            defineField({ name: 'browseLabel', type: 'string' }),
            defineField({ name: 'submitButton', type: 'string' }),
            defineField({ name: 'successMessage', type: 'text' }),
            defineField({
              name: 'services',
              type: 'array',
              of: [
                {
                  type: 'object',
                  fields: [
                    defineField({ name: 'group', type: 'string' }),
                    defineField({ name: 'options', type: 'array', of: [{ type: 'string' }] }),
                  ],
                },
              ],
            }),
          ],
        }),
      ],
    }),
    defineField({ name: 'seo', type: 'seo' }),
  ],
})

export const aboutPage = defineType({
  name: 'aboutPage',
  title: 'About Page',
  type: 'document',
  fields: [
    defineField({ name: 'hero', type: 'pageHero' }),
    defineField({
      name: 'story',
      type: 'object',
      fields: [
        defineField({ name: 'eyebrow', type: 'string' }),
        defineField({ name: 'title', type: 'string' }),
        defineField({ name: 'paragraphs', type: 'array', of: [{ type: 'text' }] }),
      ],
    }),
    defineField({ name: 'stats', type: 'array', of: [{ type: 'statItem' }] }),
    defineField({
      name: 'values',
      type: 'object',
      fields: [
        defineField({ name: 'eyebrow', type: 'string' }),
        defineField({ name: 'title', type: 'string' }),
        defineField({ name: 'items', type: 'array', of: [{ type: 'featureItem' }] }),
      ],
    }),
    defineField({
      name: 'team',
      type: 'object',
      fields: [
        defineField({ name: 'eyebrow', type: 'string' }),
        defineField({ name: 'title', type: 'string' }),
        defineField({ name: 'description', type: 'text' }),
        defineField({
          name: 'members',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                defineField({ name: 'name', type: 'string' }),
                defineField({ name: 'role', type: 'string' }),
                defineField({ name: 'image', type: 'image', options: { hotspot: true } }),
                defineField({ name: 'imageUrl', type: 'url' }),
              ],
            },
          ],
        }),
      ],
    }),
    defineField({
      name: 'cta',
      type: 'object',
      fields: [
        defineField({ name: 'title', type: 'string' }),
        defineField({ name: 'description', type: 'text' }),
        defineField({ name: 'cta', type: 'cta' }),
      ],
    }),
    defineField({ name: 'seo', type: 'seo' }),
  ],
})

export const careersPage = defineType({
  name: 'careersPage',
  title: 'Careers Page',
  type: 'document',
  fields: [
    defineField({ name: 'hero', type: 'pageHero' }),
    defineField({
      name: 'culture',
      type: 'object',
      fields: [
        defineField({ name: 'eyebrow', type: 'string' }),
        defineField({ name: 'title', type: 'string' }),
        defineField({ name: 'description', type: 'text' }),
        defineField({ name: 'items', type: 'array', of: [{ type: 'featureItem' }] }),
      ],
    }),
    defineField({
      name: 'benefits',
      type: 'object',
      fields: [
        defineField({ name: 'eyebrow', type: 'string' }),
        defineField({ name: 'title', type: 'string' }),
        defineField({ name: 'items', type: 'array', of: [{ type: 'featureItem' }] }),
      ],
    }),
    defineField({
      name: 'cta',
      type: 'object',
      fields: [
        defineField({ name: 'title', type: 'string' }),
        defineField({ name: 'description', type: 'text' }),
        defineField({ name: 'cta', type: 'cta' }),
      ],
    }),
    defineField({ name: 'seo', type: 'seo' }),
  ],
})

export const contactPage = defineType({
  name: 'contactPage',
  title: 'Contact Page',
  type: 'document',
  fields: [
    defineField({ name: 'hero', type: 'pageHero' }),
    defineField({ name: 'seo', type: 'seo' }),
  ],
})

export const blogIndex = defineType({
  name: 'blogIndex',
  title: 'Blog Index',
  type: 'document',
  fields: [
    defineField({ name: 'hero', type: 'pageHero' }),
    defineField({ name: 'seo', type: 'seo' }),
  ],
})

export const servicesIndex = defineType({
  name: 'servicesIndex',
  title: 'Services Index',
  type: 'document',
  fields: [
    defineField({ name: 'hero', type: 'pageHero' }),
    defineField({ name: 'seo', type: 'seo' }),
  ],
})

export const service = defineType({
  name: 'service',
  title: 'Service',
  type: 'document',
  fields: [
    defineField({ name: 'title', type: 'string', validation: (r) => r.required() }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'category',
      type: 'string',
      options: { list: serviceCategoryValues },
      validation: (r) => r.required(),
    }),
    defineField({ name: 'subtitle', type: 'string' }),
    defineField({ name: 'shortDescription', type: 'text', rows: 2 }),
    defineField({ name: 'description', type: 'text', rows: 4 }),
    defineField({ name: 'heroImage', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'heroImageUrl', type: 'url' }),
    defineField({ name: 'outcomes', type: 'array', of: [{ type: 'featureItem' }] }),
    defineField({ name: 'capabilities', type: 'array', of: [{ type: 'featureItem' }] }),
    defineField({
      name: 'featuresSection',
      title: 'Key Features Section',
      type: 'object',
      fields: [
        defineField({ name: 'title', type: 'string' }),
        defineField({ name: 'description', type: 'text', rows: 3 }),
        defineField({ name: 'items', type: 'array', of: [{ type: 'featureItem' }] }),
      ],
    }),
    defineField({ name: 'process', type: 'array', of: [{ type: 'processStep' }] }),
    defineField({ name: 'faqs', type: 'array', of: [{ type: 'faqItem' }] }),
    defineField({
      name: 'relatedServices',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'service' }] }],
    }),
    defineField({ name: 'cta', type: 'cta' }),
    defineField({ name: 'phone', type: 'phoneCta' }),
    defineField({ name: 'seo', type: 'seo' }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'category' },
  },
})

export const author = defineType({
  name: 'author',
  title: 'Author',
  type: 'document',
  fields: [
    defineField({ name: 'name', type: 'string', validation: (r) => r.required() }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: { source: 'name', maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({ name: 'role', type: 'string' }),
    defineField({ name: 'avatarUrl', type: 'url', title: 'Avatar URL' }),
    defineField({ name: 'bio', type: 'text', rows: 4 }),
    defineField({ name: 'linkedinUrl', type: 'url', title: 'LinkedIn URL' }),
  ],
  preview: {
    select: { title: 'name', subtitle: 'role' },
  },
})

export const post = defineType({
  name: 'post',
  title: 'Blog Post',
  type: 'document',
  fields: [
    defineField({ name: 'title', type: 'string', validation: (r) => r.required() }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({ name: 'excerpt', type: 'text', rows: 3 }),
    defineField({ name: 'publishedAt', type: 'datetime' }),
    defineField({ name: 'updatedAt', type: 'datetime', title: 'Updated at' }),
    defineField({ name: 'readingMinutes', type: 'number', title: 'Reading minutes' }),
    defineField({ name: 'category', type: 'string' }),
    defineField({
      name: 'author',
      type: 'reference',
      to: [{ type: 'author' }],
    }),
    defineField({ name: 'coverImage', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'coverImageUrl', type: 'url' }),
    defineField({
      name: 'sections',
      title: 'Article sections',
      type: 'array',
      of: [
        { type: 'blogProse' },
        { type: 'blogTable' },
        { type: 'blogGuide' },
        { type: 'blogSteps' },
        { type: 'blogList' },
        { type: 'blogInlineCta' },
        { type: 'blogCallout' },
      ],
    }),
    defineField({
      name: 'body',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'H2', value: 'h2' },
            { title: 'H3', value: 'h3' },
          ],
        },
      ],
    }),
    defineField({
      name: 'bodyParagraphs',
      title: 'Body paragraphs (legacy)',
      type: 'array',
      of: [{ type: 'text' }],
    }),
    defineField({ name: 'faqs', type: 'array', of: [{ type: 'faqItem' }] }),
    defineField({
      name: 'relatedPosts',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'post' }] }],
    }),
    defineField({
      name: 'relatedServiceSlugs',
      title: 'Related service slugs',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Service page slugs such as ai-agent-development',
    }),
    defineField({
      name: 'cta',
      type: 'object',
      fields: [
        defineField({ name: 'title', type: 'string' }),
        defineField({ name: 'description', type: 'text', rows: 3 }),
        defineField({ name: 'label', type: 'string' }),
        defineField({ name: 'href', type: 'string' }),
      ],
    }),
    defineField({ name: 'seo', type: 'seo' }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'category' },
  },
})

export const job = defineType({
  name: 'job',
  title: 'Job Listing',
  type: 'document',
  fields: [
    defineField({ name: 'title', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'jobId', type: 'string', title: 'Stable ID' }),
    defineField({ name: 'location', type: 'string' }),
    defineField({ name: 'type', type: 'string' }),
    defineField({ name: 'blurb', type: 'text' }),
    defineField({ name: 'applyHref', type: 'string' }),
    defineField({ name: 'published', type: 'boolean', initialValue: true }),
  ],
})

export const legalPage = defineType({
  name: 'legalPage',
  title: 'Legal Page',
  type: 'document',
  fields: [
    defineField({ name: 'title', type: 'string', validation: (r) => r.required() }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({ name: 'lastUpdated', type: 'string' }),
    defineField({ name: 'intro', type: 'text' }),
    defineField({ name: 'sections', type: 'array', of: [{ type: 'legalSection' }] }),
    defineField({ name: 'seo', type: 'seo' }),
  ],
})

export const inquiry = defineType({
  name: 'inquiry',
  title: 'Inquiry',
  type: 'document',
  fields: [
    defineField({ name: 'name', title: 'Full Name', type: 'string', readOnly: true }),
    defineField({ name: 'email', title: 'Email Address', type: 'string', readOnly: true }),
    defineField({ name: 'service', title: 'Requested Service', type: 'string', readOnly: true }),
    defineField({ name: 'requirements', title: 'Requirements', type: 'text', readOnly: true }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          { title: 'New', value: 'new' },
          { title: 'Contacted', value: 'contacted' },
          { title: 'Archived', value: 'archived' },
        ],
      },
      initialValue: 'new',
    }),
    defineField({ name: 'submittedAt', title: 'Submitted At', type: 'datetime', readOnly: true }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'service',
      date: 'submittedAt',
    },
    prepare({ title, subtitle, date }) {
      return {
        title: title || 'Anonymous',
        subtitle: `${subtitle || 'No Service'} - ${new Date(date as string).toLocaleDateString()}`,
      }
    },
  },
})
