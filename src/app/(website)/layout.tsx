import Header from '@/components/Header'
import Footer from '@/components/Footer'
import JsonLd from '@/components/seo/JsonLd'
import { DesignModeProvider } from '@/components/design-mode/DesignModeProvider'
import { organizationJsonLd, webSiteJsonLd } from '@/lib/seo'
import { DESIGN_MODE_COOKIE } from '@/lib/design-mode/constants'
import { getServerSession } from '@/lib/auth/session'
import { getServiceCatalog, getSiteSettings } from '@/sanity/lib/fetch'
import { cookies, draftMode } from 'next/headers'

export default async function WebsiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const [siteSettings, serviceCatalog, draft, cookieStore, session] = await Promise.all([
    getSiteSettings(),
    getServiceCatalog(),
    draftMode(),
    cookies(),
    getServerSession(),
  ])

  // Cookies alone are not enough — DesignModeProvider only activates inside the admin iframe.
  const designEligible =
    Boolean(session) &&
    draft.isEnabled &&
    cookieStore.get(DESIGN_MODE_COOKIE)?.value === '1'

  return (
    <DesignModeProvider eligible={designEligible}>
      <div
        className="home wp-singular page-template page-template-page-templates page-template-tpl-home-v10 page-template-page-templatestpl-home-v10-php page page-id-29326 no-sidebar min-h-full flex flex-col"
        id="themeAdd"
      >
        <link rel="stylesheet" href="/css/menu-v9.css" />
        <link rel="stylesheet" href="/css/index-v10.css" />
        <link rel="stylesheet" href="/css/dev-style.css" />
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
      </div>
    </DesignModeProvider>
  )
}
