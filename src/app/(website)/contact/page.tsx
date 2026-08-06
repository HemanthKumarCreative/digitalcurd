import type { Metadata } from 'next'
import PageHero from '@/components/shared/PageHero'
import ContactForm from '@/components/home/ContactForm'
import { buildPageMetadata } from '@/lib/seo'
import { getContactPage, getHomePage } from '@/sanity/lib/fetch'
import { toPageHero } from '@/sanity/lib/hero'

export async function generateMetadata(): Promise<Metadata> {
  const contact = await getContactPage()
  return buildPageMetadata({
    path: '/contact',
    title: contact.seo?.title || 'Contact Us',
    description:
      contact.seo?.description ||
      contact.hero?.description ||
      'Book a free consultation with Digital Curd. We respond within 8 business hours.',
    ogImage: contact.hero?.backgroundUrl,
  })
}

export default async function ContactPage() {
  const [contact, home] = await Promise.all([getContactPage(), getHomePage()])
  const hero = toPageHero(contact.hero)

  return (
    <div className="dc-contact-page">
      <PageHero content={hero} compact />
      <ContactForm data={home.contactForm!} />
    </div>
  )
}
