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
      <body className="min-h-full font-sans antialiased" suppressHydrationWarning>
        {children}
      </body>
    </html>
  )
}
