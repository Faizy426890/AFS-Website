import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Premium Real Estate Investment Advisory',
  description: 'Navigate the Middle East\'s most lucrative property markets with confidence. Strategic real estate advisory for high-net-worth individuals across UAE, Saudi Arabia, and Qatar.',
  keywords: 'Dubai real estate, UAE property investment, Saudi Arabia real estate, Qatar property advisory, golden visa UAE, luxury real estate Gulf',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={inter.className}>{children}</body>
    </html>
  )
}