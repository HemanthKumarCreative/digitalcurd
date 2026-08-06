'use client'

import { useState } from 'react'
import { Check, Link2 } from 'lucide-react'

type ArticleShareBarProps = {
  title: string
  url: string
}

export const ArticleShareBar = ({ title, url }: ArticleShareBarProps) => {
  const [copied, setCopied] = useState(false)

  const handleShareLinkedIn = () => {
    const shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`
    window.open(shareUrl, '_blank', 'noopener,noreferrer')
  }

  const handleShareX = () => {
    const shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`
    window.open(shareUrl, '_blank', 'noopener,noreferrer')
  }

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2000)
    } catch {
      setCopied(false)
    }
  }

  return (
    <div className="dc-article__share" aria-label="Share this article">
      <span className="dc-article__share-label">Share</span>
      <button
        type="button"
        className="dc-article__share-btn"
        onClick={handleShareLinkedIn}
        aria-label="Share on LinkedIn"
      >
        <span aria-hidden className="dc-article__share-in">
          in
        </span>
      </button>
      <button
        type="button"
        className="dc-article__share-btn"
        onClick={handleShareX}
        aria-label="Share on X"
      >
        <span aria-hidden className="dc-article__share-x">
          𝕏
        </span>
      </button>
      <button
        type="button"
        className="dc-article__share-btn"
        onClick={handleCopyLink}
        aria-label={copied ? 'Link copied' : 'Copy link'}
      >
        {copied ? <Check size={16} aria-hidden /> : <Link2 size={16} aria-hidden />}
      </button>
    </div>
  )
}
