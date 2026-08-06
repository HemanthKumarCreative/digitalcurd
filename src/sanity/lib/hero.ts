import type { PageHeroContent } from '@/types/content'
import { resolveImageUrl } from './image'
import type { PageHeroContent as CmsHero } from './types'

export const toPageHero = (hero?: CmsHero | null): PageHeroContent => ({
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
