'use client'

import Link from 'next/link'
import { Briefcase, Camera, Play, Users } from 'lucide-react'
import AnimatedLogo from './AnimatedLogo'
import type { ServiceMeta } from '@/types/content'
import { getServicesByCategory } from '@/sanity/lib/catalog'

type SiteSettings = {
  email?: string
  footerBlurb?: string
  socialLinks?: { label: string; href: string }[]
}

type FooterProps = {
  settings?: SiteSettings
  services?: ServiceMeta[]
}

const socialIcons = {
  Facebook: Users,
  LinkedIn: Briefcase,
  Instagram: Camera,
  YouTube: Play,
} as const

export default function Footer({ settings, services = [] }: FooterProps) {
  const email = settings?.email || 'hello@digitalcurd.com'
  const blurb =
    settings?.footerBlurb ||
    'AI-powered growth systems for marketing, commerce, and modern digital products.'
  const socialLinks = settings?.socialLinks?.length
    ? settings.socialLinks
    : [
        { label: 'Facebook', href: 'https://facebook.com/' },
        { label: 'LinkedIn', href: 'https://linkedin.com/' },
        { label: 'Instagram', href: 'https://instagram.com/' },
        { label: 'YouTube', href: 'https://youtube.com/' },
      ]

  const footerColumns = [
    {
      title: 'AI & Automation',
      links: getServicesByCategory(services, 'AI & Automation')
        .slice(0, 4)
        .map((s) => ({ label: s.title, href: `/services/${s.slug}` })),
    },
    {
      title: 'Growth Marketing',
      links: getServicesByCategory(services, 'Growth Marketing')
        .slice(0, 4)
        .map((s) => ({ label: s.title, href: `/services/${s.slug}` })),
    },
    {
      title: 'Build',
      links: [
        ...getServicesByCategory(services, 'Digital Engineering').slice(0, 2),
        ...getServicesByCategory(services, 'Ecommerce').slice(0, 1),
        ...getServicesByCategory(services, 'Creative Studio').slice(0, 1),
      ].map((s) => ({ label: s.title, href: `/services/${s.slug}` })),
    },
  ]

  return (
    <footer className="dc-footer" id="dc-section-footer">
      <div className="dc-footer__inner">
        <div className="dc-footer__top">
          <div className="dc-footer__brand">
            <Link href="/" aria-label="Digital Curd — Home" className="dc-footer__logo">
              <AnimatedLogo variant="light" />
            </Link>
            <p>{blurb}</p>
            <a href={`mailto:${email}`} className="dc-footer__email">
              {email}
            </a>
            <div className="dc-footer__social">
              {socialLinks.map(({ label, href }, index) => {
                const Icon = socialIcons[label as keyof typeof socialIcons] || Users
                return (
                  <a
                    key={`${label}-${index}`}
                    href={href}
                    aria-label={label}
                    target="_blank"
                    rel="nofollow external noopener noreferrer"
                  >
                    <Icon size={18} strokeWidth={2} aria-hidden="true" />
                  </a>
                )
              })}
            </div>
          </div>

          <div className="dc-footer__cols">
            {footerColumns.map((column) => (
              <div key={column.title} className="dc-footer__col">
                <h4>{column.title}</h4>
                <ul>
                  {column.links.map((link) => (
                    <li key={link.label}>
                      <Link href={link.href}>{link.label}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="dc-footer__bottom">
          <p>Copyright &copy; 2026 Digital Curd. All rights reserved.</p>
          <ul>
            <li>
              <Link href="/privacy-policy">Privacy Policy</Link>
            </li>
            <li>
              <Link href="/disclaimer">Disclaimer</Link>
            </li>
            <li>
              <Link href="/terms-of-service">Terms of Service</Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  )
}
