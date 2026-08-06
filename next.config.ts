import type { NextConfig } from 'next'

const serviceRedirects = [
  ['ai-agents', 'ai-agent-development'],
  ['ai-chatbots', 'ai-chatbot-development'],
  ['ai-customer-support', 'customer-support-ai'],
  ['seo', 'seo-services'],
  ['google-ads', 'google-ads-management'],
  ['meta-ads', 'meta-ads-management'],
  ['linkedin-ads', 'linkedin-ads-management'],
  ['content-marketing', 'content-marketing-services'],
  ['woocommerce', 'woocommerce-development'],
  ['wordpress', 'wordpress-development'],
  ['website-development', 'web-development'],
  ['nextjs', 'nextjs-development'],
  ['react', 'react-development'],
  ['headless-cms', 'headless-cms-development'],
  ['api-integration', 'api-integration-services'],
  ['progressive-web-apps', 'progressive-web-app-development'],
  ['brand-materials', 'branding-services'],
  ['ui-ux', 'ui-ux-design'],
  ['graphic-design', 'graphic-design-services'],
  ['video-production', 'video-production-services'],
] as const

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
    ],
  },
  async redirects() {
    return serviceRedirects.map(([from, to]) => ({
      source: `/services/${from}`,
      destination: `/services/${to}`,
      permanent: true,
    }))
  },
}

export default nextConfig
