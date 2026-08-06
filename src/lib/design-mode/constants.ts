export const DESIGN_MODE_COOKIE = 'dc_design'
export const DESIGN_MODE_MESSAGE = 'dc-design-mode' as const

export type DesignModeMessage =
  | {
      source: typeof DESIGN_MODE_MESSAGE
      type: 'ready'
    }
  | {
      source: typeof DESIGN_MODE_MESSAGE
      type: 'field-change'
      documentId: string
      documentType: string
      path: string
      value: string
      label?: string
    }
  | {
      source: typeof DESIGN_MODE_MESSAGE
      type: 'open-media'
      documentId: string
      documentType: string
      path: string
      label?: string
    }
  | {
      source: typeof DESIGN_MODE_MESSAGE
      type: 'scroll-to'
      sectionId: string
    }
  | {
      source: typeof DESIGN_MODE_MESSAGE
      type: 'media-result'
      path: string
      url: string
    }

export const isDesignModeMessage = (data: unknown): data is DesignModeMessage =>
  Boolean(
    data &&
      typeof data === 'object' &&
      (data as { source?: string }).source === DESIGN_MODE_MESSAGE
  )
