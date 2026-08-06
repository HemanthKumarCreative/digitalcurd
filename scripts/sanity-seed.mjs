import { createClient } from '@sanity/client'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

/**
 * Seed Sanity from local JSON content + upload media assets.
 *
 * Prerequisites:
 * 1. Create a Sanity project and set NEXT_PUBLIC_SANITY_PROJECT_ID in .env.local
 * 2. Create a write token with Editor permissions → SANITY_API_WRITE_TOKEN
 * 3. Run: npm run sanity:seed
 */

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
const token = process.env.SANITY_API_WRITE_TOKEN
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2025-01-01'

if (!projectId || !token) {
  console.error('Missing NEXT_PUBLIC_SANITY_PROJECT_ID or SANITY_API_WRITE_TOKEN')
  process.exit(1)
}

const client = createClient({
  projectId,
  dataset,
  token,
  apiVersion,
  useCdn: false,
})

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.join(__dirname, '..')

const readJson = (rel) =>
  JSON.parse(fs.readFileSync(path.join(root, rel), 'utf8'))

const assetCache = new Map()

const imageRef = (assetId) =>
  assetId
    ? {
        _type: 'image',
        asset: { _type: 'reference', _ref: assetId },
      }
    : undefined

async function uploadFromUrl(url, filenameHint) {
  if (!url) return null
  if (assetCache.has(url)) return assetCache.get(url)

  console.log('Uploading remote asset', url.slice(0, 80))
  const res = await fetch(url)
  if (!res.ok) {
    console.warn('Failed to download', url, res.status)
    return null
  }
  const buffer = Buffer.from(await res.arrayBuffer())
  const contentType = res.headers.get('content-type') || 'image/jpeg'
  const filename =
    filenameHint ||
    url.split('/').pop()?.split('?')[0] ||
    `asset-${Date.now()}.jpg`

  const asset = await client.assets.upload('image', buffer, {
    filename,
    contentType,
  })
  assetCache.set(url, asset._id)
  return asset._id
}

async function uploadLocalFile(relPath) {
  const publicAbs = path.join(root, 'public', relPath.replace(/^\//, ''))
  if (!fs.existsSync(publicAbs)) {
    console.warn('Missing local file', relPath)
    return null
  }
  if (assetCache.has(publicAbs)) return assetCache.get(publicAbs)

  console.log('Uploading local asset', relPath)
  const buffer = fs.readFileSync(publicAbs)
  const asset = await client.assets.upload('image', buffer, {
    filename: path.basename(publicAbs),
    contentType: path.extname(publicAbs).toLowerCase() === '.svg' ? 'image/svg+xml' : undefined,
  })
  assetCache.set(publicAbs, asset._id)
  return asset._id
}

async function upsert(doc) {
  const id = doc._id
  console.log('Upserting', id || doc._type)
  await client.createOrReplace(doc)
}

async function main() {
  const home = readJson('src/content/home.json')
  const about = readJson('src/content/about.json')
  const careers = readJson('src/content/careers.json')
  const contact = readJson('src/content/contact.json')
  const blog = readJson('src/content/blog.json')
  const catalog = readJson('src/content/services/catalog.json')

  const homeHeroAsset = await uploadFromUrl(
    home.heroSection.backgroundUrl,
    'home-hero.jpg'
  )
  const aiAsset = await uploadFromUrl(home.aiSection.imageUrl, 'home-ai.jpg')
  const contactAsset = await uploadFromUrl(
    home.contactForm.imageUrl,
    'home-contact.jpg'
  )

  const logos = []
  for (const [i, logo] of home.clientLogosSlider.logos.entries()) {
    const assetId = await uploadLocalFile(logo.src)
    logos.push({
      _key: `logo${i}`,
      name: logo.name,
      src: logo.src,
      ...(assetId ? { image: imageRef(assetId) } : {}),
    })
  }

  await upsert({
    _id: 'siteSettings',
    _type: 'siteSettings',
    siteName: 'Digital Curd',
    email: 'hello@digitalcurd.com',
    phone: { label: '+91 80 4567 8900', href: 'tel:+918045678900' },
    footerBlurb:
      'AI-powered growth systems for marketing, commerce, and modern digital products.',
    socialLinks: [
      { _key: 'fb', label: 'Facebook', href: 'https://facebook.com/' },
      { _key: 'li', label: 'LinkedIn', href: 'https://linkedin.com/' },
      { _key: 'ig', label: 'Instagram', href: 'https://instagram.com/' },
      { _key: 'yt', label: 'YouTube', href: 'https://youtube.com/' },
    ],
    seo: {
      title: 'Digital Curd',
      description:
        'AI-powered growth partner for marketing, technology & analytics.',
    },
  })

  await upsert({
    _id: 'homePage',
    _type: 'homePage',
    seo: home.seo,
    ...home,
    heroSection: {
      ...home.heroSection,
      backgroundUrl: home.heroSection.backgroundUrl,
      backgroundImage: imageRef(homeHeroAsset),
    },
    clientLogosSlider: {
      ...home.clientLogosSlider,
      logos,
      clients: home.clientLogosSlider.clients.map((c, i) => ({
        _key: `client${i}`,
        ...c,
      })),
    },
    statsDeliverySection: {
      ...home.statsDeliverySection,
      stats: home.statsDeliverySection.stats.map((s, i) => ({
        _key: `stat${i}`,
        ...s,
      })),
    },
    helpSectionGrid: {
      ...home.helpSectionGrid,
      cards: home.helpSectionGrid.cards.map((c, i) => ({
        _key: `card${i}`,
        ...c,
      })),
    },
    aiSection: {
      ...home.aiSection,
      imageUrl: home.aiSection.imageUrl,
      image: imageRef(aiAsset),
      items: home.aiSection.items?.map((a, i) => ({ _key: `a${i}`, ...a })),
    },
    corePillarsSection: {
      ...home.corePillarsSection,
      pillars: home.corePillarsSection.pillars.map((p, i) => ({
        _key: `p${i}`,
        ...p,
      })),
    },
    faqAccordion: {
      ...home.faqAccordion,
      faqs: home.faqAccordion.faqs.map((f, i) => ({ _key: `faq${i}`, ...f })),
    },
    contactForm: {
      title: home.contactForm.title,
      subtitle: home.contactForm.subtitle,
      imageUrl: home.contactForm.imageUrl,
      image: imageRef(contactAsset),
      leftCol: {
        title: home.contactForm.leftCol.title,
        bookCallLabel: home.contactForm.leftCol.bookCallLabel,
        bookCallLink: home.contactForm.leftCol.bookCallLink,
        emailLabel: home.contactForm.leftCol.emailLabel,
        email: home.contactForm.leftCol.email,
        trustItems: home.contactForm.leftCol.stats?.map((t, i) => ({
          _key: `trust${i}`,
          title: t.title,
          desc: t.description,
        })),
        awards: home.contactForm.leftCol.logos?.map((a, i) => ({
          _key: `award${i}`,
          name: a.name,
          src: a.src,
        })),
      },
      form: {
        ...home.contactForm.form,
        services: home.contactForm.form.services.map((g, i) => ({
          _key: `svc${i}`,
          ...g,
        })),
      },
    },
  })

  const aboutHeroAsset = await uploadFromUrl(about.hero.backgroundUrl, 'about-hero.jpg')
  const teamMembers = []
  for (const [i, m] of about.team.members.entries()) {
    const assetId = await uploadFromUrl(m.image, `team-${i}.jpg`)
    teamMembers.push({
      _key: `m${i}`,
      name: m.name,
      role: m.role,
      imageUrl: m.image,
      image: imageRef(assetId),
    })
  }

  await upsert({
    _id: 'aboutPage',
    _type: 'aboutPage',
    seo: about.seo,
    hero: {
      ...about.hero,
      backgroundUrl: about.hero.backgroundUrl,
      backgroundImage: imageRef(aboutHeroAsset),
      cta: about.hero.cta,
    },
    story: about.story,
    stats: about.stats.map((s, i) => ({ _key: `s${i}`, ...s })),
    values: {
      ...about.values,
      items: about.values.items.map((item, i) => ({ _key: `v${i}`, ...item })),
    },
    team: {
      ...about.team,
      members: teamMembers,
    },
    cta: about.cta,
  })

  const careersHeroAsset = await uploadFromUrl(
    careers.hero.backgroundUrl,
    'careers-hero.jpg'
  )
  await upsert({
    _id: 'careersPage',
    _type: 'careersPage',
    seo: careers.seo,
    hero: {
      ...careers.hero,
      backgroundUrl: careers.hero.backgroundUrl,
      backgroundImage: imageRef(careersHeroAsset),
      cta: careers.hero.cta,
    },
    culture: {
      ...careers.culture,
      items: careers.culture.items.map((item, i) => ({
        _key: `c${i}`,
        ...item,
      })),
    },
    benefits: {
      ...careers.benefits,
      items: careers.benefits.items.map((item, i) => ({
        _key: `b${i}`,
        ...item,
      })),
    },
    cta: careers.cta,
  })

  for (const job of careers.jobs) {
    await upsert({
      _id: `job-${job.id}`,
      _type: 'job',
      jobId: job.id,
      title: job.title,
      location: job.location,
      type: job.type,
      blurb: job.blurb,
      applyHref: job.applyHref,
      published: true,
    })
  }

  const contactHeroAsset = await uploadFromUrl(
    contact.hero.backgroundUrl,
    'contact-hero.jpg'
  )
  await upsert({
    _id: 'contactPage',
    _type: 'contactPage',
    seo: contact.seo,
    hero: {
      ...contact.hero,
      backgroundUrl: contact.hero.backgroundUrl,
      backgroundImage: imageRef(contactHeroAsset),
      cta: contact.hero.cta,
    },
  })

  const blogHeroAsset = await uploadFromUrl(blog.hero.backgroundUrl, 'blog-hero.jpg')
  await upsert({
    _id: 'blogIndex',
    _type: 'blogIndex',
    seo: blog.seo,
    hero: {
      ...blog.hero,
      backgroundUrl: blog.hero.backgroundUrl,
      backgroundImage: imageRef(blogHeroAsset),
      cta: blog.hero.cta,
    },
  })

  const servicesHeroUrl =
    'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1920&q=80'
  const servicesHeroAsset = await uploadFromUrl(servicesHeroUrl, 'services-hero.jpg')
  await upsert({
    _id: 'servicesIndex',
    _type: 'servicesIndex',
    seo: {
      title: 'Services',
      description:
        'Browse every Digital Curd capability. Each service page shares the same clear layout so you can compare options and start a conversation quickly.',
    },
    hero: {
      eyebrow: 'Services',
      title: 'One connected growth system',
      subtitle: 'AI, marketing, commerce, engineering, and creative—built to work together.',
      description:
        'Browse every Digital Curd capability. Each service page shares the same clear layout so you can compare options and start a conversation quickly.',
      backgroundUrl: servicesHeroUrl,
      backgroundImage: imageRef(servicesHeroAsset),
      cta: { label: 'Book a consultation', href: '/contact' },
    },
  })

  for (const post of blog.posts) {
    const coverAsset = await uploadFromUrl(post.coverImage, `${post.slug}-cover.jpg`)
    await upsert({
      _id: `post-${post.slug}`,
      _type: 'post',
      seo: post.seo,
      title: post.title,
      slug: { _type: 'slug', current: post.slug },
      excerpt: post.excerpt,
      publishedAt: `${post.date}T12:00:00.000Z`,
      category: post.category,
      coverImageUrl: post.coverImage,
      coverImage: imageRef(coverAsset),
      bodyParagraphs: post.body,
    })
  }

  for (const legal of ['privacy-policy', 'disclaimer', 'terms-of-service']) {
    const doc = readJson(`src/content/legal/${legal}.json`)
    await upsert({
      _id: `legal-${legal}`,
      _type: 'legalPage',
      seo: doc.seo,
      title: doc.title,
      slug: { _type: 'slug', current: legal },
      lastUpdated: doc.lastUpdated,
      intro: doc.intro,
      sections: doc.sections.map((s, i) => ({
        _key: `s${i}`,
        ...s,
      })),
    })
  }

  const serviceDocs = {}
  for (const meta of catalog.services) {
    const file = path.join('src/content/services', `${meta.slug}.json`)
    const svc = readJson(file)
    const id = `service-${meta.slug}`
    serviceDocs[meta.slug] = { _id: id }
    const heroAsset = await uploadFromUrl(svc.heroImage, `${meta.slug}-hero.jpg`)
    await upsert({
      _id: id,
      _type: 'service',
      seo: svc.seo,
      title: svc.title,
      slug: { _type: 'slug', current: svc.slug },
      category: svc.category,
      subtitle: svc.subtitle,
      shortDescription: meta.shortDescription,
      description: svc.description,
      heroImageUrl: svc.heroImage,
      heroImage: imageRef(heroAsset),
      outcomes: svc.outcomes.map((o, i) => ({ _key: `o${i}`, ...o })),
      capabilities: svc.capabilities.map((o, i) => ({ _key: `c${i}`, ...o })),
      featuresSection: svc.featuresSection
        ? {
            title: svc.featuresSection.title,
            description: svc.featuresSection.description,
            items: (svc.featuresSection.items || []).map((o, i) => ({
              _key: `feat${i}`,
              ...o,
            })),
          }
        : undefined,
      process: svc.process.map((o, i) => ({ _key: `p${i}`, ...o })),
      faqs: svc.faqs.map((o, i) => ({ _key: `f${i}`, ...o })),
      cta: svc.cta,
    })
  }

  for (const meta of catalog.services) {
    const svc = readJson(path.join('src/content/services', `${meta.slug}.json`))
    const refs = (svc.relatedSlugs || [])
      .map((slug) => serviceDocs[slug]?._id)
      .filter(Boolean)
      .map((id) => ({ _type: 'reference', _ref: id, _key: id }))
    await client
      .patch(`service-${meta.slug}`)
      .set({ relatedServices: refs })
      .commit()
    console.log('Linked related services for', meta.slug)
  }

  console.log('Seed complete. Uploaded', assetCache.size, 'unique assets.')
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
