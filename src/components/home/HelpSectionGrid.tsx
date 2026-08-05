'use client'

import Link from 'next/link'
import homeContent from '@/content/home.json'
import { Monitor, ShoppingCart, Bot, Search, TrendingUp, BarChart2, CheckCircle2, ArrowRight } from 'lucide-react'
import { useInViewMotion } from '@/hooks/useInViewMotion'

const icons = [Monitor, ShoppingCart, Bot, Search, TrendingUp, BarChart2]

export default function HelpSectionGrid() {
  const { helpSectionGrid } = homeContent
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
            {card.title}
          </Link>
        </h3>
        <p>{card.description}</p>
        <h4>{card.howWeHelpTitle}</h4>
        <ul className="help-card__list">
          {card.list.map((li, i) => (
            <li key={i}>
              <span className="help-card__check" aria-hidden="true">
                <CheckCircle2 size={20} strokeWidth={2} />
              </span>
              <span>{li}</span>
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
            {helpSectionGrid.headerTitle1}
            <em>{helpSectionGrid.headerTitleEm}</em>
            {helpSectionGrid.headerTitle2}
          </h2>
          <p>{helpSectionGrid.headerDesc}</p>
        </div>

        <div className="help-grid">
          {helpSectionGrid.cards.map((card, index) => renderCard(card, index))}
        </div>
      </div>
    </section>
  )
}
