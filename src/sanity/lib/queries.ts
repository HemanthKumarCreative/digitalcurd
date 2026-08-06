export const siteSettingsQuery = `*[_type == "siteSettings" && _id == "siteSettings"][0]{
  siteName,
  email,
  phone,
  footerBlurb,
  socialLinks[],
  seo
}`

export const homePageQuery = `*[_type == "homePage" && _id == "homePage"][0]`

export const aboutPageQuery = `*[_type == "aboutPage" && _id == "aboutPage"][0]`

export const careersPageQuery = `*[_type == "careersPage" && _id == "careersPage"][0]`

export const contactPageQuery = `*[_type == "contactPage" && _id == "contactPage"][0]`

export const blogIndexQuery = `*[_type == "blogIndex" && _id == "blogIndex"][0]`

export const servicesIndexQuery = `*[_type == "servicesIndex" && _id == "servicesIndex"][0]`

export const jobsQuery = `*[_type == "job" && published != false] | order(title asc){
  _id,
  jobId,
  title,
  location,
  type,
  blurb,
  applyHref
}`

export const postsQuery = `*[_type == "post"] | order(publishedAt desc){
  _id,
  title,
  "slug": slug.current,
  excerpt,
  publishedAt,
  category,
  coverImage,
  coverImageUrl,
  bodyParagraphs
}`

export const postBySlugQuery = `*[_type == "post" && slug.current == $slug][0]{
  _id,
  title,
  "slug": slug.current,
  excerpt,
  publishedAt,
  category,
  coverImage,
  coverImageUrl,
  body,
  bodyParagraphs,
  seo
}`

export const serviceCatalogQuery = `*[_type == "service"] | order(category asc, title asc){
  "slug": slug.current,
  title,
  category,
  "shortDescription": coalesce(shortDescription, subtitle)
}`

export const serviceBySlugQuery = `*[_type == "service" && slug.current == $slug][0]{
  _id,
  title,
  "slug": slug.current,
  category,
  subtitle,
  shortDescription,
  description,
  heroImage,
  heroImageUrl,
  outcomes[],
  capabilities[],
  featuresSection{
    title,
    description,
    items[]
  },
  process[],
  faqs[],
  "relatedSlugs": relatedServices[]->slug.current,
  "relatedServices": relatedServices[]->{
    "slug": slug.current,
    title,
    category,
    "shortDescription": coalesce(shortDescription, subtitle)
  },
  cta,
  phone,
  seo
}`

export const serviceSlugsQuery = `*[_type == "service" && defined(slug.current)].slug.current`

export const legalBySlugQuery = `*[_type == "legalPage" && slug.current == $slug][0]{
  _id,
  title,
  "slug": slug.current,
  lastUpdated,
  intro,
  sections[],
  seo
}`

export const postSlugsQuery = `*[_type == "post" && defined(slug.current)].slug.current`
