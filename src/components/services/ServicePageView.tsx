import PageHero from '@/components/shared/PageHero'
import ContentSection from '@/components/shared/ContentSection'
import FeatureGrid from '@/components/shared/FeatureGrid'
import ProcessSteps from '@/components/shared/ProcessSteps'
import SimpleFaq from '@/components/shared/SimpleFaq'
import RelatedServices from '@/components/shared/RelatedServices'
import CtaBand from '@/components/shared/CtaBand'
import ContactForm from '@/components/home/ContactForm'
import { getRelatedServices } from '@/content/services'
import type { ServiceContent } from '@/types/content'

type ServicePageViewProps = {
  service: ServiceContent
}

export default function ServicePageView({ service }: ServicePageViewProps) {
  const related = getRelatedServices(service.relatedSlugs)

  return (
    <>
      <PageHero
        content={{
          eyebrow: service.category,
          title: service.title,
          subtitle: service.subtitle,
          description: service.description,
          backgroundUrl: service.heroImage,
          cta: service.cta,
          secondaryCta: { label: 'View all services', href: '/services' },
          phone: {
            label: '+91 80 4567 8900',
            href: 'tel:+918045678900',
          },
        }}
      />

      <ContentSection
        eyebrow="Outcomes"
        title="What you gain"
        description="Every engagement is scoped around business results—not just deliverables."
        tone="surface"
      >
        <FeatureGrid items={service.outcomes} columns={3} />
      </ContentSection>

      <ContentSection
        eyebrow="Capabilities"
        title={`How we deliver ${service.title}`}
        description="A practical mix of strategy, build, measurement, and continuous improvement."
        tone="light"
      >
        <FeatureGrid items={service.capabilities} columns={4} />
      </ContentSection>

      <ContentSection
        eyebrow="Process"
        title="A clear path from idea to impact"
        tone="surface"
      >
        <ProcessSteps steps={service.process} />
      </ContentSection>

      <SimpleFaq faqs={service.faqs} />

      <RelatedServices services={related} />

      <CtaBand
        title={`Ready to explore ${service.title}?`}
        description="Book a free consultation and we will map the fastest path to measurable growth."
        cta={{ label: 'Schedule a Call', href: '/contact' }}
      />

      <ContactForm />
    </>
  )
}
