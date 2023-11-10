import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ClerkProvider } from '@clerk/nextjs'
import { Toaster } from '@/components/ui/toaster'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'MyAnimeStore',
  description:
    'Your one-stop shop for all things anime, with user profiles, top anime lists, anime search, AI recommendations, and secure sign-in.',
}
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${inter.className} dark`}>
          {children}
          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  )
}
