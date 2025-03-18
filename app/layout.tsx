import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'ATS Checker',
  description: 'Created with v0',
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
