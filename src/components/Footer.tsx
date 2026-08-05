import Link from 'next/link'
import { Briefcase, Camera, Play, Users } from 'lucide-react'
import AnimatedLogo from './AnimatedLogo'

const footerColumns = [
  {
    title: 'AI & Automation',
    links: [
      { label: 'AI Agents', href: '/services/ai-agents' },
      { label: 'AI Chatbots', href: '/services/ai-chatbots' },
      { label: 'AI Search Optimization', href: '/services/ai-search-optimization' },
      { label: 'Workflow Automation', href: '/services/workflow-automation' },
    ],
  },
  {
    title: 'Growth Marketing',
    links: [
      { label: 'SEO', href: '/services/seo' },
      { label: 'Performance Marketing', href: '/services/performance-marketing' },
      { label: 'Google Ads', href: '/services/google-ads' },
      { label: 'WhatsApp Marketing', href: '/services/whatsapp-marketing' },
    ],
  },
  {
    title: 'Build',
    links: [
      { label: 'Website Development', href: '/services/website-development' },
      { label: 'Shopify', href: '/services/shopify-development' },
      { label: 'Next.js', href: '/services/nextjs' },
      { label: 'UI/UX', href: '/services/ui-ux' },
    ],
  },
]

const socialLinks = [
  { label: 'Facebook', href: 'https://facebook.com/', Icon: Users },
  { label: 'LinkedIn', href: 'https://linkedin.com/', Icon: Briefcase },
  { label: 'Instagram', href: 'https://instagram.com/', Icon: Camera },
  { label: 'YouTube', href: 'https://youtube.com/', Icon: Play },
]

export default function Footer() {
  return (
    <footer className="dc-footer">
      <div className="dc-footer__inner">
        <div className="dc-footer__top">
          <div className="dc-footer__brand">
            <Link href="/" aria-label="Digital Curd — Home" className="dc-footer__logo">
              <AnimatedLogo variant="light" />
            </Link>
            <p>
              AI-powered growth systems for marketing, commerce, and modern digital products.
            </p>
            <a href="mailto:hello@digitalcurd.com" className="dc-footer__email">
              hello@digitalcurd.com
            </a>
            <div className="dc-footer__social">
              {socialLinks.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  target="_blank"
                  rel="nofollow external noopener noreferrer"
                >
                  <Icon size={18} strokeWidth={2} aria-hidden="true" />
                </a>
              ))}
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
