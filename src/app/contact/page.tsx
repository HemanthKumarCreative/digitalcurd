import type { Metadata } from 'next'
import PageHero from '@/components/shared/PageHero'
import ContactForm from '@/components/home/ContactForm'
import contact from '@/content/contact.json'

export const metadata: Metadata = {
  title: 'Contact Us | Digital Curd',
  description:
    'Book a free consultation with Digital Curd. We respond within 8 business hours.',
}

export default function ContactPage() {
  return (
    <div className="dc-contact-page">
      <PageHero content={contact.hero} compact />
      <ContactForm />
    </div>
  )
}
