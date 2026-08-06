import { getSessionSecret } from '@/lib/auth/config'

export type SessionPayload = {
  email: string
  name: string
  exp: number
}

const encoder = new TextEncoder()

const toBase64Url = (bytes: Uint8Array): string => {
  let binary = ''
  for (const byte of bytes) {
    binary += String.fromCharCode(byte)
  }
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
}

const fromBase64Url = (value: string): Uint8Array => {
  const base64 = value.replace(/-/g, '+').replace(/_/g, '/')
  const padded = base64 + '='.repeat((4 - (base64.length % 4)) % 4)
  const binary = atob(padded)
  const bytes = new Uint8Array(binary.length)
  for (let i = 0; i < binary.length; i += 1) {
    bytes[i] = binary.charCodeAt(i)
  }
  return bytes
}

const importKey = async (secret: string) =>
  crypto.subtle.importKey(
    'raw',
    encoder.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign', 'verify']
  )

const sign = async (payload: string, secret: string) => {
  const key = await importKey(secret)
  const signature = await crypto.subtle.sign('HMAC', key, encoder.encode(payload))
  return toBase64Url(new Uint8Array(signature))
}

const verify = async (payload: string, signature: string, secret: string) => {
  const key = await importKey(secret)
  return crypto.subtle.verify(
    'HMAC',
    key,
    fromBase64Url(signature) as Uint8Array<ArrayBuffer>,
    encoder.encode(payload)
  )
}

export const createSessionToken = async (
  payload: Omit<SessionPayload, 'exp'> & { exp: number },
  secret = getSessionSecret()
): Promise<string> => {
  const body = toBase64Url(encoder.encode(JSON.stringify(payload)))
  const signature = await sign(body, secret)
  return `${body}.${signature}`
}

export const verifySessionToken = async (
  token: string,
  secret = getSessionSecret()
): Promise<SessionPayload | null> => {
  const [body, signature] = token.split('.')
  if (!body || !signature) return null

  const valid = await verify(body, signature, secret)
  if (!valid) return null

  try {
    const json = new TextDecoder().decode(fromBase64Url(body))
    const payload = JSON.parse(json) as SessionPayload
    if (!payload.email || !payload.exp) return null
    if (payload.exp < Math.floor(Date.now() / 1000)) return null
    return payload
  } catch {
    return null
  }
}
