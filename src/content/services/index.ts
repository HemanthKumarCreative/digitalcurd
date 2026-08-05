import catalog from './catalog.json'
import type { ServiceContent, ServiceMeta } from '@/types/content'

const serviceModules = {
  'ai-agents': () => import('./ai-agents.json'),
  'ai-chatbots': () => import('./ai-chatbots.json'),
  'ai-search-optimization': () => import('./ai-search-optimization.json'),
  'workflow-automation': () => import('./workflow-automation.json'),
  'ai-customer-support': () => import('./ai-customer-support.json'),
  seo: () => import('./seo.json'),
  'performance-marketing': () => import('./performance-marketing.json'),
  'google-ads': () => import('./google-ads.json'),
  'meta-ads': () => import('./meta-ads.json'),
  'linkedin-ads': () => import('./linkedin-ads.json'),
  'content-marketing': () => import('./content-marketing.json'),
  'whatsapp-marketing': () => import('./whatsapp-marketing.json'),
  'shopify-development': () => import('./shopify-development.json'),
  woocommerce: () => import('./woocommerce.json'),
  wordpress: () => import('./wordpress.json'),
  'website-development': () => import('./website-development.json'),
  nextjs: () => import('./nextjs.json'),
  react: () => import('./react.json'),
  'headless-cms': () => import('./headless-cms.json'),
  'api-integration': () => import('./api-integration.json'),
  'progressive-web-apps': () => import('./progressive-web-apps.json'),
  'brand-materials': () => import('./brand-materials.json'),
  'ui-ux': () => import('./ui-ux.json'),
  'graphic-design': () => import('./graphic-design.json'),
  'video-production': () => import('./video-production.json'),
} as const

export type ServiceSlug = keyof typeof serviceModules

export const serviceCatalog: ServiceMeta[] = catalog.services

export const serviceCategories = [
  'AI & Automation',
  'Growth Marketing',
  'Ecommerce',
  'Digital Engineering',
  'Creative Studio',
] as const

export const getAllServiceSlugs = (): ServiceSlug[] =>
  Object.keys(serviceModules) as ServiceSlug[]

export const isServiceSlug = (slug: string): slug is ServiceSlug =>
  slug in serviceModules

export const getServiceMeta = (slug: string): ServiceMeta | undefined =>
  serviceCatalog.find((s) => s.slug === slug)

export const getServicesByCategory = (category: string): ServiceMeta[] =>
  serviceCatalog.filter((s) => s.category === category)

export const getRelatedServices = (slugs: string[]): ServiceMeta[] =>
  slugs
    .map((slug) => getServiceMeta(slug))
    .filter((s): s is ServiceMeta => Boolean(s))

export const getServiceContent = async (
  slug: string
): Promise<ServiceContent | null> => {
  if (!isServiceSlug(slug)) return null
  const mod = await serviceModules[slug]()
  return mod.default as ServiceContent
}
