import { renderInlineMarkdown } from '@/lib/blog/utils'

type InlineMarkdownProps = {
  text: string
  className?: string
  as?: 'p' | 'span' | 'li' | 'td' | 'div'
}

export const InlineMarkdown = ({
  text,
  className,
  as: Tag = 'p',
}: InlineMarkdownProps) => (
  <Tag
    className={className}
    dangerouslySetInnerHTML={{ __html: renderInlineMarkdown(text) }}
  />
)
