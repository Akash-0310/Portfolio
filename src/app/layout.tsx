import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
  display: 'swap',
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Akash Singh — Full Stack Developer',
  description:
    'Full Stack Developer with 2+ years building scalable MERN applications, AI-integrated platforms, and cloud-native infrastructure. Available for full-time roles and freelance projects.',
  keywords: [
    'Full Stack Developer',
    'MERN Stack',
    'React Developer',
    'Node.js Developer',
    'Next.js',
    'TypeScript',
    'MongoDB',
    'AWS',
    'Docker',
    'Akash Singh',
    'Software Engineer',
    'Indore',
  ],
  authors: [{ name: 'Akash Singh', url: 'mailto:akashdevtech10@gmail.com' }],
  creator: 'Akash Singh',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://akashsingh.dev',
    title: 'Akash Singh — Full Stack Developer',
    description:
      'Full Stack Developer specializing in MERN stack, AI integrations, and cloud infrastructure.',
    siteName: 'Akash Singh Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Akash Singh — Full Stack Developer',
    description: 'Full Stack Developer | MERN Stack | AI Integration | Cloud',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export const viewport: Viewport = {
  themeColor: '#080810',
  colorScheme: 'dark',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-screen bg-[#080810] text-[#e2e8f0] antialiased overflow-x-hidden">
        {children}
      </body>
    </html>
  )
}
