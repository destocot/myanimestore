import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'MyAnimeStore - Sign In',
  description:
    'Sign in to your MyAnimeStore account to access exclusive features and content.',
}

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
