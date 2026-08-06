'use client'

import HeroSection from './HeroSection'
import ClientLogosSlider from './ClientLogosSlider'
import StatsDeliverySection from './StatsDeliverySection'
import HelpSectionGrid from './HelpSectionGrid'
import AiSection from './AiSection'
import CorePillarsSection from './CorePillarsSection'
import FaqAccordion from './FaqAccordion'
import ContactForm from './ContactForm'
import type homeJson from '@/content/home.json'

type HomeContentProps = {
  content: typeof homeJson
}

export default function HomeContent({ content }: HomeContentProps) {
  return (
    <>
      <HeroSection data={content.heroSection} />
      <ClientLogosSlider data={content.clientLogosSlider} />
      <StatsDeliverySection data={content.statsDeliverySection} />
      <HelpSectionGrid data={content.helpSectionGrid} />
      <AiSection data={content.aiSection} />
      <CorePillarsSection data={content.corePillarsSection} />
      <FaqAccordion data={content.faqAccordion} />
      <ContactForm data={content.contactForm} />
    </>
  )
}
