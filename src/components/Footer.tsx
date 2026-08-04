import Link from 'next/link'
import { Briefcase, Camera, Play, Users } from 'lucide-react'
import AnimatedLogo from './AnimatedLogo'

const footerColumns = [
  {
    title: 'AI & Automation',
    links: [
      { label: 'AI Agents', href: '/ai/consulting-services-company' },
      { label: 'AI Chatbots', href: '/ai/ai-augmented-software-development' },
      { label: 'AI Search Optimization', href: '/ai/generative-ai-services' },
      { label: 'Workflow Automation', href: '/ai/custom-ai-agent-development' },
    ],
  },
  {
    title: 'Growth Marketing',
    links: [
      { label: 'SEO', href: '/ai/custom-ai-agent-development' },
      { label: 'Performance Marketing', href: '/ai/custom-ai-agent-development' },
      { label: 'Google Ads', href: '/ai/custom-ai-agent-development' },
      { label: 'WhatsApp Marketing', href: '/ai/custom-ai-agent-development' },
    ],
  },
  {
    title: 'Build',
    links: [
      { label: 'Website Development', href: '/salesforce' },
      { label: 'Shopify', href: '/data-engineering' },
      { label: 'Next.js', href: '/hire/sap-developers' },
      { label: 'UI/UX', href: '/it-strategy-consulting-firms' },
    ],
  },
]

const socialLinks = [
  { label: 'Facebook', href: '#', Icon: Users },
  { label: 'LinkedIn', href: '#', Icon: Briefcase },
  { label: 'Instagram', href: '#', Icon: Camera },
  { label: 'YouTube', href: '#', Icon: Play },
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
            <li><Link href="/privacy-policy">Privacy Policy</Link></li>
            <li><Link href="/disclaimer">Disclaimer</Link></li>
            <li><Link href="/terms-of-service">Terms of Service</Link></li>
          </ul>
        </div>
      </div>
    </footer>
  )
}
