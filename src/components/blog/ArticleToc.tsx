'use client'

import { useEffect, useState } from 'react'
import type { BlogTocItem } from '@/types/blog'

type ArticleTocProps = {
  items: BlogTocItem[]
}

export const ArticleToc = ({ items }: ArticleTocProps) => {
  const [activeId, setActiveId] = useState(items[0]?.id || '')
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!items.length) return

    const elements = items
      .map((item) => document.getElementById(item.id))
      .filter(Boolean) as HTMLElement[]

    if (!elements.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)
        if (visible[0]?.target?.id) setActiveId(visible[0].target.id)
      },
      {
        rootMargin: '-20% 0px -65% 0px',
        threshold: [0.1, 0.4, 0.7],
      }
    )

    elements.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [items])

  if (!items.length) return null

  const handleNavigate = (id: string) => {
    setActiveId(id)
    setOpen(false)
  }

  return (
    <nav className="dc-article__toc" aria-label="Page contents">
      <button
        type="button"
        className="dc-article__toc-toggle"
        aria-expanded={open}
        aria-controls="article-toc-panel"
        onClick={() => setOpen((prev) => !prev)}
      >
        On this page
      </button>
      <div
        id="article-toc-panel"
        className={`dc-article__toc-panel${open ? ' is-open' : ''}`}
      >
        <p className="dc-article__toc-title">Page contents</p>
        <ol className="dc-article__toc-list">
          {items.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className={activeId === item.id ? 'is-active' : undefined}
                onClick={() => handleNavigate(item.id)}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ol>
      </div>
    </nav>
  )
}
