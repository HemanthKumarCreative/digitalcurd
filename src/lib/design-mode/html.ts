/** Convert stored FAQ/HTML answers into readable plain text for Form Mode. */
export const htmlToEditableText = (html: string): string => {
  if (!html) return ''
  if (!/<[a-z][\s\S]*>/i.test(html)) return html

  let text = html
  text = text.replace(/<\/p>/gi, '\n\n')
  text = text.replace(/<br\s*\/?>/gi, '\n')
  text = text.replace(/<\/li>/gi, '\n')
  text = text.replace(/<li[^>]*>/gi, '• ')
  text = text.replace(/<\/?(ul|ol|p|div|span|strong|em|b|i)[^>]*>/gi, '')
  text = text.replace(/<[^>]+>/g, '')
  text = text
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
  return text.replace(/\n{3,}/g, '\n\n').trim()
}

/** Serialize plain text / bullets back to simple HTML for the public FAQ renderer. */
export const editableTextToHtml = (text: string): string => {
  const trimmed = text.trim()
  if (!trimmed) return ''
  if (/<[a-z][\s\S]*>/i.test(trimmed) && !trimmed.includes('• ')) return trimmed

  const blocks = trimmed.split(/\n\n+/).map((b) => b.trim()).filter(Boolean)
  const parts: string[] = []

  for (const block of blocks) {
    const lines = block.split('\n').map((l) => l.trim()).filter(Boolean)
    const bulletLines = lines.filter((l) => /^[•\-*]\s+/.test(l))
    if (bulletLines.length === lines.length && lines.length > 0) {
      const items = lines
        .map((l) => l.replace(/^[•\-*]\s+/, '').trim())
        .filter(Boolean)
        .map((item) => `<li>${escapeHtml(item)}</li>`)
        .join('')
      parts.push(`<ul>${items}</ul>`)
    } else {
      parts.push(`<p>${escapeHtml(lines.join(' '))}</p>`)
    }
  }

  return parts.join('')
}

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')

export const looksLikeHtml = (value: string) => /<[a-z][\s\S]*>/i.test(value)
