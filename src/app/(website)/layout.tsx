import Header from '@/components/Header'
import Footer from '@/components/Footer'
import JsonLd from '@/components/seo/JsonLd'
import { organizationJsonLd, webSiteJsonLd } from '@/lib/seo'
import { getServiceCatalog, getSiteSettings } from '@/sanity/lib/fetch'

export default async function WebsiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const [siteSettings, serviceCatalog] = await Promise.all([
    getSiteSettings(),
    getServiceCatalog(),
  ])

  return (
    <>
      <JsonLd
        data={[
          organizationJsonLd({
            siteName: siteSettings?.siteName,
            email: siteSettings?.email,
            phone: siteSettings?.phone,
            socialLinks: siteSettings?.socialLinks,
          }),
          webSiteJsonLd(),
        ]}
      />
      <Header services={serviceCatalog} />
      <main className="flex-1">{children}</main>
      <Footer settings={siteSettings} services={serviceCatalog} />
    </>
  )
}
