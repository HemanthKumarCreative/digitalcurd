import type { Metadata } from 'next'
import { Plus_Jakarta_Sans } from 'next/font/google'
import {
  DEFAULT_SITE_DESCRIPTION,
  DEFAULT_SITE_NAME,
  resolveOgImage,
} from '@/lib/seo'
import { getSiteUrl } from '@/lib/site'
import './globals.css'

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: '--font-plus-jakarta-sans',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: {
    default: `AI-Powered Growth Partner for Marketing, Technology & Analytics | ${DEFAULT_SITE_NAME}`,
    template: `%s | ${DEFAULT_SITE_NAME}`,
  },
  description: DEFAULT_SITE_DESCRIPTION,
  openGraph: {
    siteName: DEFAULT_SITE_NAME,
    type: 'website',
    images: [{ url: resolveOgImage(), width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${plusJakartaSans.variable} h-full antialiased`}
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <head>
        <link rel="stylesheet" href="/css/menu-v9.css" />
        <link rel="stylesheet" href="/css/index-v10.css" />
        <link rel="stylesheet" href="/css/dev-style.css" />
      </head>
      <body
        className="home wp-singular page-template page-template-page-templates page-template-tpl-home-v10 page-template-page-templatestpl-home-v10-php page page-id-29326 no-sidebar min-h-full flex flex-col"
        id="themeAdd"
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  )
}
