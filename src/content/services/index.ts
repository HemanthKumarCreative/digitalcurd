import catalog from './catalog.json'
import type { ServiceContent, ServiceMeta } from '@/types/content'

const serviceModules = {
  'ai-agent-development': () => import('./ai-agent-development.json'),
  'ai-chatbot-development': () => import('./ai-chatbot-development.json'),
  'ai-search-optimization': () => import('./ai-search-optimization.json'),
  'workflow-automation': () => import('./workflow-automation.json'),
  'customer-support-ai': () => import('./customer-support-ai.json'),
  'seo-services': () => import('./seo-services.json'),
  'performance-marketing': () => import('./performance-marketing.json'),
  'google-ads-management': () => import('./google-ads-management.json'),
  'meta-ads-management': () => import('./meta-ads-management.json'),
  'linkedin-ads-management': () => import('./linkedin-ads-management.json'),
  'content-marketing-services': () => import('./content-marketing-services.json'),
  'whatsapp-marketing': () => import('./whatsapp-marketing.json'),
  'shopify-development': () => import('./shopify-development.json'),
  'woocommerce-development': () => import('./woocommerce-development.json'),
  'wordpress-development': () => import('./wordpress-development.json'),
  'web-development': () => import('./web-development.json'),
  'nextjs-development': () => import('./nextjs-development.json'),
  'react-development': () => import('./react-development.json'),
  'headless-cms-development': () => import('./headless-cms-development.json'),
  'api-integration-services': () => import('./api-integration-services.json'),
  'progressive-web-app-development': () =>
    import('./progressive-web-app-development.json'),
  'branding-services': () => import('./branding-services.json'),
  'ui-ux-design': () => import('./ui-ux-design.json'),
  'graphic-design-services': () => import('./graphic-design-services.json'),
  'video-production-services': () => import('./video-production-services.json'),
} as const

export type ServiceSlug = keyof typeof serviceModules

export const serviceCatalog: ServiceMeta[] = catalog.services

export { serviceCategories } from '@/sanity/lib/catalog'

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
