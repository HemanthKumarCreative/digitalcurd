import type { PageHeroContent } from '@/types/content'
import { resolveImageUrl } from './image'
import type { CmsPageHero } from './types'

export const toPageHero = (hero?: CmsPageHero | null): PageHeroContent => ({
  eyebrow: hero?.eyebrow,
  title: hero?.title || '',
  subtitle: hero?.subtitle,
  description: hero?.description,
  backgroundUrl:
    resolveImageUrl(hero?.backgroundImage, hero?.backgroundUrl) ||
    hero?.backgroundUrl ||
    '',
  cta: hero?.cta,
})
