'use client'

import React, { useEffect, useId, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { Volume2, VolumeX, X } from 'lucide-react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import {
  COMPANY_NAME,
  DEFAULT_GREETING,
  MUTE_STORAGE_KEY,
  buildQueryWhatsAppMessage,
  buildWhatsAppUrl,
} from '@/lib/support-chat'

type Message = {
  id: string
  sender: 'bot' | 'user'
  text: string
}

type SupportChatWidgetProps = {
  whatsappNumber: string
  pathname?: string
}

type SoundKind = 'open' | 'send' | 'receive'

const playTone = (kind: SoundKind) => {
  if (typeof window === 'undefined') return
  const AudioCtx =
    window.AudioContext ||
    (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
  if (!AudioCtx) return

  const ctx = new AudioCtx()
  const osc = ctx.createOscillator()
  const gain = ctx.createGain()
  osc.connect(gain)
  gain.connect(ctx.destination)

  const now = ctx.currentTime
  if (kind === 'open') {
    osc.frequency.setValueAtTime(520, now)
    osc.frequency.exponentialRampToValueAtTime(680, now + 0.08)
  } else if (kind === 'send') {
    osc.frequency.setValueAtTime(440, now)
    osc.frequency.exponentialRampToValueAtTime(560, now + 0.06)
  } else {
    osc.frequency.setValueAtTime(620, now)
    osc.frequency.exponentialRampToValueAtTime(480, now + 0.1)
  }

  gain.gain.setValueAtTime(0.0001, now)
  gain.gain.exponentialRampToValueAtTime(0.05, now + 0.02)
  gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.16)
  osc.start(now)
  osc.stop(now + 0.18)
  osc.onended = () => {
    void ctx.close()
  }
}

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const ROOT_STYLE: React.CSSProperties = {
  position: 'fixed',
  right: 20,
  bottom: 20,
  left: 'auto',
  top: 'auto',
  zIndex: 2147483000,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-end',
  gap: 12,
  margin: 0,
  padding: 0,
  pointerEvents: 'none',
}

export default function SupportChatWidget({
  whatsappNumber,
  pathname = '/',
}: SupportChatWidgetProps) {
  const dialogTitleId = useId()
  const reduceMotion = useReducedMotion()
  const panelRef = useRef<HTMLDivElement>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const fabRef = useRef<HTMLButtonElement>(null)
  const hasGesturedRef = useRef(false)
  const greetingQueuedRef = useRef(false)

  const [mounted, setMounted] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [unreadCount, setUnreadCount] = useState(1)
  const [isMuted, setIsMuted] = useState(false)
  const [queryName, setQueryName] = useState('')
  const [queryEmail, setQueryEmail] = useState('')
  const [queryMessage, setQueryMessage] = useState('')
  const [formError, setFormError] = useState<string | null>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(MUTE_STORAGE_KEY)
      if (stored === '1') setIsMuted(true)
    } catch {
      // ignore storage errors
    }
  }, [])

  useEffect(() => {
    if (!isOpen) return
    messagesEndRef.current?.scrollIntoView({
      behavior: reduceMotion ? 'auto' : 'smooth',
      block: 'end',
      inline: 'nearest',
    })
  }, [messages, isOpen, reduceMotion])

  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        setIsOpen(false)
        fabRef.current?.focus()
        return
      }

      if (event.key !== 'Tab' || !panelRef.current) return
      const focusable = panelRef.current.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      )
      if (focusable.length === 0) return
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    const timer = window.setTimeout(() => {
      const firstButton = panelRef.current?.querySelector<HTMLElement>('button')
      firstButton?.focus()
    }, 50)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.clearTimeout(timer)
    }
  }, [isOpen])

  const playSound = (kind: SoundKind) => {
    if (isMuted || !hasGesturedRef.current) return
    try {
      playTone(kind)
    } catch {
      // ignore audio failures
    }
  }

  const handleOpen = () => {
    hasGesturedRef.current = true
    setIsOpen(true)
    setUnreadCount(0)
    playSound('open')

    if (!greetingQueuedRef.current) {
      greetingQueuedRef.current = true
      setMessages([{ id: 'greeting', sender: 'bot', text: DEFAULT_GREETING }])
    }
  }

  const handleClose = () => {
    setIsOpen(false)
    fabRef.current?.focus()
  }

  const handleToggle = () => {
    if (isOpen) {
      handleClose()
      return
    }
    handleOpen()
  }

  const handleToggleMute = () => {
    hasGesturedRef.current = true
    setIsMuted((prev) => {
      const next = !prev
      try {
        window.localStorage.setItem(MUTE_STORAGE_KEY, next ? '1' : '0')
      } catch {
        // ignore
      }
      return next
    })
  }

  const handleWhatsAppRedirect = (text = '') => {
    hasGesturedRef.current = true
    const url = buildWhatsAppUrl(text, whatsappNumber)
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  const handleChatOnWhatsApp = () => {
    hasGesturedRef.current = true
    setFormError(null)

    const name = queryName.trim()
    const email = queryEmail.trim()
    const message = queryMessage.trim()
    const anyFilled = Boolean(name || email || message)

    if (!anyFilled) {
      handleWhatsAppRedirect()
      return
    }

    if (name.length < 2) {
      setFormError('Please enter your name.')
      return
    }
    if (!emailRegex.test(email)) {
      setFormError('Please enter a valid email.')
      return
    }
    if (message.length < 8) {
      setFormError('Please share a bit more detail (at least a sentence).')
      return
    }

    const waText = buildQueryWhatsAppMessage({ name, email, message, pathname })
    handleWhatsAppRedirect(waText)

    setQueryName('')
    setQueryEmail('')
    setQueryMessage('')

    setMessages((prev) => [
      ...prev,
      {
        id: `${Date.now()}-user-query`,
        sender: 'user',
        text: message,
      },
      {
        id: `${Date.now()}-bot-query`,
        sender: 'bot',
        text: 'Thanks — WhatsApp is opening with your message. We typically reply within a few minutes during business hours.',
      },
    ])
    playSound('receive')
  }

  const badgeLabel = unreadCount >= 9 ? '9+' : String(unreadCount)

  if (!mounted) return null

  const ui = (
    <div className="dc-support-chat" style={ROOT_STYLE}>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={dialogTitleId}
            initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: reduceMotion ? 0 : 0.2 }}
            className="dc-support-chat__panel"
          >
            <header className="dc-support-chat__header">
              <div className="dc-support-chat__brand">
                <div className="dc-support-chat__avatar" aria-hidden>
                  <img src="/assets/logos/whatsapp.svg" alt="" width={22} height={22} />
                  <span className="dc-support-chat__online" />
                </div>
                <div>
                  <h3 id={dialogTitleId} className="dc-support-chat__title">
                    {COMPANY_NAME} Support
                  </h3>
                  <p className="dc-support-chat__status">Online · usually replies in minutes</p>
                </div>
              </div>
              <div className="dc-support-chat__header-actions">
                <button
                  type="button"
                  className="dc-support-chat__icon-btn"
                  onClick={handleToggleMute}
                  aria-label={isMuted ? 'Unmute chat sounds' : 'Mute chat sounds'}
                  aria-pressed={isMuted}
                >
                  {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
                </button>
                <button
                  type="button"
                  className="dc-support-chat__icon-btn"
                  onClick={handleClose}
                  aria-label="Close support chat"
                >
                  <X size={18} />
                </button>
              </div>
            </header>

            <div className="dc-support-chat__body">
              <div className="dc-support-chat__messages">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={
                      msg.sender === 'user'
                        ? 'dc-support-chat__bubble dc-support-chat__bubble--user'
                        : 'dc-support-chat__bubble dc-support-chat__bubble--bot'
                    }
                  >
                    {msg.text}
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>
            </div>

            <div className="dc-support-chat__footer">
              <p className="dc-support-chat__compose-label">Write a short message</p>
              <div className="dc-support-chat__compose">
                <label htmlFor="dc-chat-name" className="sr-only">
                  Your name
                </label>
                <input
                  id="dc-chat-name"
                  className="dc-support-chat__field"
                  type="text"
                  autoComplete="name"
                  value={queryName}
                  onChange={(e) => {
                    setQueryName(e.target.value)
                    if (formError) setFormError(null)
                  }}
                  placeholder="Your name"
                />
                <label htmlFor="dc-chat-email" className="sr-only">
                  Email address
                </label>
                <input
                  id="dc-chat-email"
                  className="dc-support-chat__field"
                  type="email"
                  autoComplete="email"
                  value={queryEmail}
                  onChange={(e) => {
                    setQueryEmail(e.target.value)
                    if (formError) setFormError(null)
                  }}
                  placeholder="Email address"
                />
                <label htmlFor="dc-chat-message" className="sr-only">
                  How can we help
                </label>
                <textarea
                  id="dc-chat-message"
                  className="dc-support-chat__field dc-support-chat__field--message"
                  rows={2}
                  value={queryMessage}
                  onChange={(e) => {
                    setQueryMessage(e.target.value)
                    if (formError) setFormError(null)
                  }}
                  placeholder="How can we help?"
                />
              </div>
              {formError && (
                <p className="dc-support-chat__error" role="alert">
                  {formError}
                </p>
              )}
              <button
                type="button"
                className="dc-support-chat__wa-btn"
                onClick={handleChatOnWhatsApp}
              >
                <img src="/assets/logos/whatsapp.svg" alt="" width={18} height={18} />
                Chat on WhatsApp
              </button>
              <p className="dc-support-chat__footer-note">
                Optional message above · Opens WhatsApp with our team
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        ref={fabRef}
        type="button"
        className="dc-support-chat__fab"
        whileHover={reduceMotion ? undefined : { scale: 1.05 }}
        whileTap={reduceMotion ? undefined : { scale: 0.95 }}
        onClick={handleToggle}
        aria-label={isOpen ? 'Close support chat' : 'Open WhatsApp support chat'}
        aria-expanded={isOpen}
        aria-haspopup="dialog"
        style={{
          pointerEvents: 'auto',
          background: '#25D366',
          color: '#ffffff',
          width: 56,
          height: 56,
          borderRadius: 999,
          border: 'none',
          boxShadow: '0 10px 28px rgba(18, 140, 126, 0.45)',
        }}
      >
        {!isOpen && unreadCount > 0 && (
          <>
            {!reduceMotion && <span className="dc-support-chat__badge-ping" aria-hidden />}
            <span className="dc-support-chat__badge">{badgeLabel}</span>
          </>
        )}
        {isOpen ? (
          <X size={26} aria-hidden color="#ffffff" strokeWidth={2.5} />
        ) : (
          <img src="/assets/logos/whatsapp.svg" alt="" width={28} height={28} />
        )}
      </motion.button>
    </div>
  )

  return createPortal(ui, document.body)
}
