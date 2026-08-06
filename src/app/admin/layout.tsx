import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Admin | Digital Curd',
  robots: { index: false, follow: false },
}

export default function AdminRootLayout({ children }: { children: React.ReactNode }) {
  return <div className="admin-app min-h-screen">{children}</div>
}
