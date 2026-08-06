'use client'

import { usePathname } from 'next/navigation'
import SupportChatWidget from '@/components/support-chat-widget'
import { useDesignMode } from '@/components/design-mode/DesignModeProvider'

type SupportChatMountProps = {
  whatsappNumber: string
}

export default function SupportChatMount({ whatsappNumber }: SupportChatMountProps) {
  const pathname = usePathname() || '/'
  const { enabled: designOn } = useDesignMode()

  if (designOn) return null

  return <SupportChatWidget whatsappNumber={whatsappNumber} pathname={pathname} />
}
