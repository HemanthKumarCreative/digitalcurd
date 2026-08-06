import Image from 'next/image'
import type { BlogAuthor } from '@/types/blog'

type ArticleAuthorCardProps = {
  author: BlogAuthor
}

export const ArticleAuthorCard = ({ author }: ArticleAuthorCardProps) => {
  if (!author?.name) return null

  return (
    <aside className="dc-article__author-card" aria-label={`Updated by ${author.name}`}>
      <p className="dc-article__author-card-label">About the author</p>
      <div className="dc-article__author-card-row">
        {author.avatarUrl ? (
          <Image
            src={author.avatarUrl}
            alt={author.name}
            width={72}
            height={72}
            className="dc-article__author-card-avatar"
          />
        ) : null}
        <div>
          <p className="dc-article__author-card-name">{author.name}</p>
          {author.role ? <p className="dc-article__author-card-role">{author.role}</p> : null}
          {author.bio ? <p className="dc-article__author-card-bio">{author.bio}</p> : null}
          {author.linkedinUrl ? (
            <a
              href={author.linkedinUrl}
              className="dc-article__author-card-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn profile
            </a>
          ) : null}
        </div>
      </div>
    </aside>
  )
}
