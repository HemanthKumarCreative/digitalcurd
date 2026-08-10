const DEFAULT_WHATSAPP_NUMBER = '918510932094'
const COMPANY_NAME = 'Digital Curd'

const getWhatsAppNumber = (override) => {
  const raw = (override || '').trim() || DEFAULT_WHATSAPP_NUMBER
  return raw.replace(/\D/g, '')
}

const buildWhatsAppUrl = (text, number) => {
  const digits = getWhatsAppNumber(number)
  const base = `https://wa.me/${digits}`
  if (!text?.trim()) return base
  return `${base}?text=${encodeURIComponent(text.trim())}`
}

const formatPageLabel = (pathname) => {
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

const buildQueryWhatsAppMessage = (opts) => {
  const name = opts.name.trim()
  const email = opts.email.trim()
  const message = opts.message.trim()
  const pageLabel = formatPageLabel(opts.pathname)
  const pagePath = opts.pathname?.trim() || '/'

  return [
    `👋 *Hello ${COMPANY_NAME} team,*`,
    '',
    "I'd like to connect regarding a project enquiry from your website.",
    '',
    '━━━━━━━━━━━━━━━━',
    '📋 *Contact details*',
    `👤 *Name:* ${name}`,
    `📧 *Email:* ${email}`,
    `🌐 *Page:* ${pageLabel}`,
    `🔗 *URL path:* ${pagePath}`,
    '━━━━━━━━━━━━━━━━',
    '',
    '💬 *Message*',
    message,
    '',
    'Looking forward to hearing from you.',
    'Thank you!',
  ].join('\n')
}

const number = getWhatsAppNumber('918510932094')
const text = buildQueryWhatsAppMessage({
  name: 'Jane Doe',
  email: 'jane@acme.com',
  message: 'Need a new Next.js site for our product launch.',
  pathname: '/services/react-development',
})
const url = buildWhatsAppUrl(text, number)
const decoded = decodeURIComponent(new URL(url).searchParams.get('text') || '')

console.log('number:', number)
console.log('--- decoded prefill ---')
console.log(decoded)
console.log('checks:', {
  name: decoded.includes('Jane Doe'),
  email: decoded.includes('jane@acme.com'),
  message: decoded.includes('Need a new Next.js'),
  page: decoded.includes('Services › React Development'),
  path: decoded.includes('/services/react-development'),
  emptyOpensClean: buildWhatsAppUrl('', number) === `https://wa.me/${number}`,
})
