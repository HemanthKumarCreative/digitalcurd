import { MetadataRoute } from 'next'
import { getPostSlugs, getServiceSlugs } from '@/sanity/lib/fetch'
import { getSiteUrl } from '@/lib/site'

const staticRoutes = [
  '/',
  '/about',
  '/articles',
  '/careers',
  '/contact',
  '/services',
  '/privacy-policy',
  '/terms-of-service',
  '/disclaimer',
]

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = getSiteUrl()
  const [serviceSlugs, postSlugs] = await Promise.all([
    getServiceSlugs(),
    getPostSlugs(),
  ])

  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: route === '/' ? siteUrl : `${siteUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '/' ? 'weekly' : 'monthly',
    priority: route === '/' ? 1 : 0.8,
  }))

  const serviceEntries: MetadataRoute.Sitemap = serviceSlugs.map((slug) => ({
    url: `${siteUrl}/services/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.7,
  }))

  const blogEntries: MetadataRoute.Sitemap = postSlugs.map((slug) => ({
    url: `${siteUrl}/articles/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.6,
  }))

  return [...staticEntries, ...serviceEntries, ...blogEntries]
}
