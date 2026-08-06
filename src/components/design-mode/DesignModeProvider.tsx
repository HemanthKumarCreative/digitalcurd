'use client'

import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import {
  DESIGN_MODE_MESSAGE,
  isDesignModeMessage,
  type DesignModeMessage,
} from '@/lib/design-mode/constants'

type DesignModeContextValue = {
  enabled: boolean
  documentId?: string
  documentType?: string
}

const DesignModeContext = createContext<DesignModeContextValue>({ enabled: false })

const DESIGN_CSS = `
html.dc-design-on,
html.dc-design-on body {
  cursor: default !important;
}

/* Freeze motion / marquees while editing — keep content fully visible */
html.dc-design-on .logo-track,
html.dc-design-on .awards-marquee-inner,
html.dc-design-on .awards-marquee-track,
html.dc-design-on [class*="animate"] {
  animation-play-state: paused !important;
}

html.dc-design-on .dc-fade-up,
html.dc-design-on .dc-fade-up.is-in,
html.dc-design-on [class*="dc-fade-up"] {
  opacity: 1 !important;
  transform: none !important;
  animation: none !important;
  visibility: visible !important;
}

/* Kill site hover transforms / color shifts that fight selection */
html.dc-design-on .help-card:hover,
html.dc-design-on .model-card:hover,
html.dc-design-on .dc-feature-card:hover,
html.dc-design-on .client-logo-chip:hover,
html.dc-design-on .dc-btn:hover,
html.dc-design-on a:hover {
  transform: none !important;
  filter: none !important;
}

/* Block navigation and decorative clicks; keep only editable targets alive */
html.dc-design-on a,
html.dc-design-on button:not([data-dc-editable]),
html.dc-design-on [role="button"]:not([data-dc-editable]),
html.dc-design-on summary,
html.dc-design-on input:not([data-dc-editable]),
html.dc-design-on select:not([data-dc-editable]),
html.dc-design-on textarea:not([data-dc-editable]),
html.dc-design-on label:not([data-dc-editable]) {
  pointer-events: none !important;
}

html.dc-design-on [data-dc-editable] {
  pointer-events: auto !important;
  outline: 1px dashed rgba(29, 91, 196, 0.35);
  outline-offset: 3px;
  cursor: text;
  transition: outline-color 0.15s ease, box-shadow 0.15s ease;
}

/* Never force position on absolute backgrounds — that breaks hero media */
html.dc-design-on [data-dc-editable]:not(.dc-editable-bg) {
  position: relative;
  z-index: 5;
}

html.dc-design-on [data-dc-editable]:hover,
html.dc-design-on [data-dc-editable]:focus {
  outline-color: #1d5bc4;
  box-shadow: 0 0 0 3px rgba(29, 91, 196, 0.18);
}

html.dc-design-on [data-dc-editable="image"],
html.dc-design-on [data-dc-editable="media"],
html.dc-design-on [data-dc-editable="icon"] {
  cursor: pointer;
}

html.dc-design-on [data-dc-editable][data-dc-label]:hover::after,
html.dc-design-on [data-dc-editable][data-dc-label]:focus::after {
  content: attr(data-dc-label);
  position: absolute;
  top: -1.35rem;
  left: 0;
  z-index: 80;
  padding: 0.12rem 0.4rem;
  border-radius: 4px;
  background: #05164d;
  color: #fff;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.02em;
  white-space: nowrap;
  pointer-events: none;
}

/* Let clicks reach background media under decorative overlays */
html.dc-design-on .dc-design-overlay-pass,
html.dc-design-on .dc-page-hero__overlay,
html.dc-design-on .dc-contact__overlay {
  pointer-events: none !important;
}

html.dc-design-on [data-dc-editable="image"].dc-editable-bg {
  pointer-events: auto !important;
}

html.dc-design-on .dc-design-content-layer {
  position: relative;
  z-index: 2;
}

/* Expand FAQ panels so answers are reachable */
html.dc-design-on .dc-faq__panel,
html.dc-design-on .faq-panel,
html.dc-design-on [class*="faq"] .desc {
  display: block !important;
  max-height: none !important;
  opacity: 1 !important;
  visibility: visible !important;
}
`

export const DesignModeProvider = ({
  /** Server: admin session + design cookies. Never enable from cookies alone. */
  eligible = false,
  /** @deprecated use eligible — kept for call-site safety */
  enabled: enabledProp,
  children,
}: {
  eligible?: boolean
  enabled?: boolean
  children: React.ReactNode
}) => {
  const serverEligible = eligible || enabledProp || false
  // Always start false so top-level/public tabs never SSR/hydrate into edit UI
  // even if design cookies are still present from an admin session.
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    if (!serverEligible) {
      setEnabled(false)
      return
    }
    // Edit chrome only in Design Mode iframe (?dc_edit=1). Plain Preview iframes stay live.
    const inAdminIframe = window.self !== window.top
    const editRequested = new URLSearchParams(window.location.search).get('dc_edit') === '1'
    const shouldEdit = inAdminIframe && editRequested
    setEnabled(shouldEdit)

    if (!inAdminIframe) {
      // Stale design/draft cookies from a prior admin session leak into normal browsing.
      void fetch('/api/admin/design/disable', { method: 'POST', credentials: 'same-origin' })
    }
  }, [serverEligible])

  useEffect(() => {
    if (!enabled) {
      document.documentElement.classList.remove('dc-design-on')
      return
    }
    document.documentElement.classList.add('dc-design-on')
    return () => document.documentElement.classList.remove('dc-design-on')
  }, [enabled])

  useEffect(() => {
    if (!enabled) return

    const blockNav = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null
      if (!target) return
      if (target.closest('[data-dc-editable]')) return
      const interactive = target.closest('a, button, [role="button"]')
      if (!interactive) return
      event.preventDefault()
      event.stopPropagation()
    }

    document.addEventListener('click', blockNav, true)
    window.parent.postMessage(
      { source: DESIGN_MODE_MESSAGE, type: 'ready' } satisfies DesignModeMessage,
      window.location.origin
    )

    return () => document.removeEventListener('click', blockNav, true)
  }, [enabled])

  useEffect(() => {
    if (!enabled) return
    const onMessage = (event: MessageEvent) => {
      if (event.origin !== window.location.origin) return
      if (!isDesignModeMessage(event.data)) return
      if (event.data.type === 'scroll-to') {
        const el = document.getElementById(event.data.sectionId)
        el?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
      if (event.data.type === 'media-result') {
        const node = document.querySelector(
          `[data-dc-path="${CSS.escape(event.data.path)}"]`
        ) as HTMLElement | null
        if (node) {
          node.dispatchEvent(
            new CustomEvent('dc-media-result', { detail: { url: event.data.url } })
          )
        }
      }
    }
    window.addEventListener('message', onMessage)
    return () => window.removeEventListener('message', onMessage)
  }, [enabled])

  const value = useMemo(() => ({ enabled }), [enabled])

  return (
    <DesignModeContext.Provider value={value}>
      {enabled ? <style dangerouslySetInnerHTML={{ __html: DESIGN_CSS }} /> : null}
      {children}
    </DesignModeContext.Provider>
  )
}

export const DesignModeDocument = ({
  documentId,
  documentType,
  children,
}: {
  documentId: string
  documentType: string
  children: React.ReactNode
}) => {
  const parent = useContext(DesignModeContext)
  const value = useMemo(
    () => ({
      enabled: parent.enabled,
      documentId,
      documentType,
    }),
    [parent.enabled, documentId, documentType]
  )
  return <DesignModeContext.Provider value={value}>{children}</DesignModeContext.Provider>
}

export const useDesignMode = () => useContext(DesignModeContext)

export const postDesignFieldChange = (payload: {
  documentId: string
  documentType: string
  path: string
  value: string
  label?: string
}) => {
  const message: DesignModeMessage = {
    source: DESIGN_MODE_MESSAGE,
    type: 'field-change',
    ...payload,
  }
  window.parent.postMessage(message, window.location.origin)
}

export const postDesignOpenMedia = (payload: {
  documentId: string
  documentType: string
  path: string
  label?: string
}) => {
  const message: DesignModeMessage = {
    source: DESIGN_MODE_MESSAGE,
    type: 'open-media',
    ...payload,
  }
  window.parent.postMessage(message, window.location.origin)
}
