import { DEFAULT_SITE_DESCRIPTION, DEFAULT_SITE_NAME, absoluteUrl } from '@/lib/seo'
import { getServiceCatalog } from '@/sanity/lib/fetch'
import blogJson from '@/content/blog.json'

export const dynamic = 'force-static'

const buildLlmsTxt = async (): Promise<string> => {
  const catalog = await getServiceCatalog()
  const lines: string[] = [
    `# ${DEFAULT_SITE_NAME}`,
    `> ${DEFAULT_SITE_DESCRIPTION}`,
    '',
    '## Key pages',
    `- Home: ${absoluteUrl('/')}`,
    `- Services: ${absoluteUrl('/services')}`,
    `- Articles: ${absoluteUrl('/articles')}`,
    `- About: ${absoluteUrl('/about')}`,
    `- Contact: ${absoluteUrl('/contact')}`,
    `- Careers: ${absoluteUrl('/careers')}`,
    `- Privacy Policy: ${absoluteUrl('/privacy-policy')}`,
    `- Terms of Service: ${absoluteUrl('/terms-of-service')}`,
    `- Disclaimer: ${absoluteUrl('/disclaimer')}`,
    '',
    '## Services',
  ]

  for (const service of catalog) {
    lines.push(
      `- ${service.title}: ${absoluteUrl(`/services/${service.slug}`)}`,
      `  ${service.shortDescription}`,
    )
  }

  lines.push('', '## Blog posts')

  for (const post of blogJson.posts) {
    lines.push(
      `- ${post.title}: ${absoluteUrl(`/articles/${post.slug}`)}`,
      `  ${post.excerpt}`,
    )
  }

  lines.push(
    '',
    '## Optional',
    `- Full sitemap: ${absoluteUrl('/sitemap.xml')}`,
    `- Crawler rules: ${absoluteUrl('/robots.txt')}`,
  )

  return lines.join('\n')
}

export async function GET() {
  const body = await buildLlmsTxt()

  return new Response(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  })
}
