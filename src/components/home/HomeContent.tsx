'use client'

import HeroSection from './HeroSection'
import ClientLogosSlider from './ClientLogosSlider'
import StatsDeliverySection from './StatsDeliverySection'
import HelpSectionGrid from './HelpSectionGrid'
import AiSection from './AiSection'
import CorePillarsSection from './CorePillarsSection'
import FaqAccordion from './FaqAccordion'
import ContactForm from './ContactForm'

export default function HomeContent() {
  return (
    <>
      <HeroSection />
      <ClientLogosSlider />
      <StatsDeliverySection />
      <HelpSectionGrid />
      <AiSection />
      <CorePillarsSection />
      <FaqAccordion />
      <ContactForm />
    </>
  )
}
