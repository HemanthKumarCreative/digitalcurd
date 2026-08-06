'use client'

import Link from 'next/link'
import { Monitor, ShoppingCart, Bot, Search, TrendingUp, BarChart2, CheckCircle2, ArrowRight } from 'lucide-react'
import { EditableText } from '@/components/design-mode/EditableText'
import { useInViewMotion } from '@/hooks/useInViewMotion'

const icons = [Monitor, ShoppingCart, Bot, Search, TrendingUp, BarChart2]

type HelpData = {
  headerTitle1: string
  headerTitleEm: string
  headerTitle2: string
  headerDesc: string
  cards: {
    title: string
    link: string
    description: string
    howWeHelpTitle: string
    list: string[]
  }[]
}

export default function HelpSectionGrid({ data: helpSectionGrid }: { data: HelpData }) {
  const { ref, inView } = useInViewMotion<HTMLElement>()

  const renderCard = (card: (typeof helpSectionGrid.cards)[number], index: number) => {
    const Icon = icons[index]
    return (
      <div className="help-card" data-key={index + 1} key={index}>
        <div className="icon text-[#1D5BC4] mb-4" aria-hidden="true">
          <Icon size={48} strokeWidth={1.5} />
        </div>
        <h3>
          <Link href={card.link} className="help-card-title" aria-label={`Explore ${card.title}`}>
            <EditableText
              as="span"
              path={`helpSectionGrid.cards[${index}].title`}
              label={`Help card ${index + 1} → Title`}
              value={card.title}
            />
          </Link>
        </h3>
        <EditableText
          as="p"
          path={`helpSectionGrid.cards[${index}].description`}
          label={`Help card ${index + 1} → Description`}
          value={card.description}
          multiline
        />
        <EditableText
          as="h4"
          path={`helpSectionGrid.cards[${index}].howWeHelpTitle`}
          label={`Help card ${index + 1} → List title`}
          value={card.howWeHelpTitle}
        />
        <ul className="help-card__list">
          {card.list.map((li, i) => (
            <li key={i}>
              <span className="help-card__check" aria-hidden="true">
                <CheckCircle2 size={20} strokeWidth={2} />
              </span>
              <EditableText
                as="span"
                path={`helpSectionGrid.cards[${index}].list[${i}]`}
                label={`Help card ${index + 1} → Item ${i + 1}`}
                value={li}
              />
            </li>
          ))}
        </ul>
        <Link
          href={card.link}
          className="help-card__cta"
          aria-label={`View ${card.title} services`}
        >
          Learn more
          <ArrowRight size={16} aria-hidden="true" />
        </Link>
        <div className="border-line"></div>
      </div>
    )
  }

  return (
    <section
      ref={ref}
      className={`help-section padding-t-120 padding-b-120 dc-fade-up ${inView ? 'is-in' : ''}`}
      aria-label="How we help"
    >
      <div className="container">
        <div className="section-head">
          <h2>
            <EditableText
              as="span"
              path="helpSectionGrid.headerTitle1"
              label="Help → Title start"
              value={helpSectionGrid.headerTitle1}
            />
            <em>
              <EditableText
                as="span"
                path="helpSectionGrid.headerTitleEm"
                label="Help → Title emphasis"
                value={helpSectionGrid.headerTitleEm}
              />
            </em>
            <EditableText
              as="span"
              path="helpSectionGrid.headerTitle2"
              label="Help → Title end"
              value={helpSectionGrid.headerTitle2}
            />
          </h2>
          <EditableText
            as="p"
            path="helpSectionGrid.headerDesc"
            label="Help → Description"
            value={helpSectionGrid.headerDesc}
            multiline
          />
        </div>

        <div className="help-grid">
          {helpSectionGrid.cards.map((card, index) => renderCard(card, index))}
        </div>
      </div>
    </section>
  )
}
