'use client'

import HeroSection from './HeroSection'
import ClientLogosSlider from './ClientLogosSlider'
import StatsDeliverySection from './StatsDeliverySection'
import HelpSectionGrid from './HelpSectionGrid'
import AiSection from './AiSection'
import CorePillarsSection from './CorePillarsSection'
import ContactForm from '@/components/contact/ContactForm'
import SimpleFaq from '@/components/shared/SimpleFaq'
import { DesignModeDocument } from '@/components/design-mode/DesignModeProvider'
import type homeJson from '@/content/home.json'

type HomeContentProps = {
  content: typeof homeJson
}

export default function HomeContent({ content }: HomeContentProps) {
  return (
    <DesignModeDocument documentId="homePage" documentType="homePage">
      <HeroSection data={content.heroSection} />
      <div id="dc-section-logos">
        <ClientLogosSlider data={content.clientLogosSlider} />
      </div>
      <div id="dc-section-stats">
        <StatsDeliverySection data={content.statsDeliverySection} />
      </div>
      <div id="dc-section-help">
        <HelpSectionGrid data={content.helpSectionGrid} />
      </div>
      <div id="dc-section-ai">
        <AiSection data={content.aiSection} />
      </div>
      <div id="dc-section-pillars">
        <CorePillarsSection data={content.corePillarsSection} />
      </div>
      <SimpleFaq
        variant="home"
        pathPrefix="faqAccordion"
        titleLine1={content.faqAccordion.titleLine1}
        titleEm={content.faqAccordion.titleEm}
        subtitle={content.faqAccordion.subtitle}
        faqs={content.faqAccordion.faqs}
        showMoreLimit={10}
      />
      <div id="dc-section-contact">
        <ContactForm data={content.contactForm} />
      </div>
    </DesignModeDocument>
  )
}
