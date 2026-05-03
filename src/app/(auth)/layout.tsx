import { ClerkProvider } from '@clerk/nextjs'
import type { Metadata } from 'next'
import '../globals.css'

export const metadata: Metadata = { title: 'AgencyOS — Giriş' }

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <html lang="tr" className="h-full">
        <body className="h-full antialiased" style={{ background: '#080E1A' }}>
          {children}
        </body>
      </html>
    </ClerkProvider>
  )
}
