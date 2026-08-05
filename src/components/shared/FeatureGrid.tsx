'use client'

import {
  Bot,
  ChartLine,
  Code2,
  Globe,
  Layers,
  Megaphone,
  Palette,
  Search,
  Sparkles,
  Target,
  Workflow,
  Zap,
} from 'lucide-react'
import { useInViewMotion } from '@/hooks/useInViewMotion'
import type { FeatureItem } from '@/types/content'

const iconMap = {
  bot: Bot,
  chart: ChartLine,
  code: Code2,
  globe: Globe,
  layers: Layers,
  megaphone: Megaphone,
  palette: Palette,
  search: Search,
  sparkles: Sparkles,
  target: Target,
  workflow: Workflow,
  zap: Zap,
} as const

type FeatureGridProps = {
  items: FeatureItem[]
  columns?: 2 | 3 | 4
}

export default function FeatureGrid({ items, columns = 3 }: FeatureGridProps) {
  const { ref, inView } = useInViewMotion<HTMLDivElement>()

  return (
    <div
      ref={ref}
      className={`dc-feature-grid dc-feature-grid--cols-${columns}`}
      role="list"
    >
      {items.map((item, index) => {
        const Icon =
          (item.icon && iconMap[item.icon as keyof typeof iconMap]) || Sparkles
        const delay = (index % 3) + 1
        return (
          <article
            key={item.title}
            role="listitem"
            className={`dc-feature-card dc-fade-up ${inView ? 'is-in' : ''} dc-fade-up-delay-${delay}`}
          >
            <div className="dc-feature-card__icon" aria-hidden="true">
              <Icon size={22} strokeWidth={1.75} />
            </div>
            <h3 className="dc-feature-card__title">{item.title}</h3>
            <p className="dc-feature-card__desc">{item.description}</p>
          </article>
        )
      })}
    </div>
  )
}
