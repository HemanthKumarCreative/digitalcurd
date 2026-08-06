'use client'

import { useEffect, useState } from 'react'

type ArticleHelpfulProps = {
  slug: string
}

type Vote = 'yes' | 'no'

export const ArticleHelpful = ({ slug }: ArticleHelpfulProps) => {
  const storageKey = `dc-blog-helpful:${slug}`
  const [vote, setVote] = useState<Vote | null>(null)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(storageKey)
      if (saved === 'yes' || saved === 'no') setVote(saved)
    } catch {
      // ignore
    }
    setReady(true)
  }, [storageKey])

  const handleVote = async (next: Vote) => {
    setVote(next)
    try {
      window.localStorage.setItem(storageKey, next)
    } catch {
      // ignore
    }
    try {
      await fetch('/api/blog/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slug, vote: next }),
      })
    } catch {
      // best-effort logging
    }
  }

  return (
    <div className="dc-article__helpful" aria-label="Was this page helpful?">
      <p className="dc-article__helpful-title">Was this page helpful?</p>
      {ready && vote ? (
        <p className="dc-article__helpful-thanks">Thanks for your feedback.</p>
      ) : (
        <div className="dc-article__helpful-actions">
          <button
            type="button"
            className="dc-article__helpful-btn"
            onClick={() => handleVote('yes')}
            aria-label="Yes, this page was helpful"
            disabled={!ready}
          >
            Yes
          </button>
          <button
            type="button"
            className="dc-article__helpful-btn"
            onClick={() => handleVote('no')}
            aria-label="No, this page was not helpful"
            disabled={!ready}
          >
            No
          </button>
        </div>
      )}
    </div>
  )
}
