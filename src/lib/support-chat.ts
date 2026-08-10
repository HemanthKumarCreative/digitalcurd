export const DEFAULT_WHATSAPP_NUMBER = '918510932094'
export const COMPANY_NAME = 'Digital Curd'
export const MUTE_STORAGE_KEY = 'dc-support-chat-muted'

export const DEFAULT_GREETING =
  'Hi — welcome to Digital Curd. Write a short message below, or chat with us on WhatsApp.'

export const getWhatsAppNumber = (override?: string): string => {
  const raw =
    override?.trim() ||
    process.env.NEXT_PUBLIC_WHATSAPP_NUMBER?.trim() ||
    DEFAULT_WHATSAPP_NUMBER
  return raw.replace(/\D/g, '')
}

export const buildWhatsAppUrl = (text?: string, number?: string): string => {
  const digits = getWhatsAppNumber(number)
  const base = `https://wa.me/${digits}`
  if (!text?.trim()) return base
  return `${base}?text=${encodeURIComponent(text.trim())}`
}

const formatPageLabel = (pathname?: string): string => {
  const path = (pathname || '/').trim() || '/'
  if (path === '/') return 'Home'
  return path
    .replace(/^\/+|\/+$/g, '')
    .split('/')
    .map((segment) =>
      segment
        .split('-')
        .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
        .join(' ')
    )
    .join(' › ')
}

export const buildQueryWhatsAppMessage = (opts: {
  name: string
  email: string
  message: string
  pathname?: string
}): string => {
  const name = opts.name.trim()
  const email = opts.email.trim()
  const message = opts.message.trim()
  const pageLabel = formatPageLabel(opts.pathname)
  const pagePath = opts.pathname?.trim() || '/'

  return [
    `*Hello ${COMPANY_NAME} team,*`,
    '',
    "I'd like to connect regarding a project enquiry from your website.",
    '',
    '--------------------',
    '*Contact details*',
    `*Name:* ${name}`,
    `*Email:* ${email}`,
    `*Page:* ${pageLabel}`,
    `*URL path:* ${pagePath}`,
    '--------------------',
    '',
    '*Message*',
    message,
    '',
    'Looking forward to hearing from you.',
    'Thank you!',
  ].join('\n')
}
