import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import CtaBand from '@/components/shared/CtaBand'
import blog from '@/content/blog.json'

type PageProps = {
  params: Promise<{ slug: string }>
}

export const generateStaticParams = async () =>
  blog.posts.map((post) => ({ slug: post.slug }))

export const generateMetadata = async ({
  params,
}: PageProps): Promise<Metadata> => {
  const { slug } = await params
  const post = blog.posts.find((p) => p.slug === slug)
  if (!post) return { title: 'Post Not Found | Digital Curd' }
  return {
    title: `${post.title} | Digital Curd Blog`,
    description: post.excerpt,
  }
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params
  const post = blog.posts.find((p) => p.slug === slug)
  if (!post) notFound()

  return (
    <>
      <article className="dc-article" aria-label={post.title}>
        <div className="dc-article__inner">
          <p className="dc-article__meta">
            <Link href="/blog" style={{ color: 'inherit', textDecoration: 'none' }}>
              Blog
            </Link>
            {' · '}
            {post.category} · {post.date}
          </p>
          <h1 className="dc-article__title">{post.title}</h1>
          <Image
            src={post.coverImage}
            alt=""
            width={1200}
            height={675}
            className="dc-article__cover"
            priority
          />
          <div className="dc-article__body">
            {post.body.map((paragraph) => (
              <p key={paragraph.slice(0, 40)}>{paragraph}</p>
            ))}
          </div>
        </div>
      </article>

      <CtaBand
        title="Want this applied to your business?"
        description="Book a free consultation and we will map a practical next step."
        cta={{ label: 'Schedule a Call', href: '/contact' }}
      />
    </>
  )
}
