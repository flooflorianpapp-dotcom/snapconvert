import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { LanguageProvider } from '@/components/language-provider'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'SnapConvert - Free Image to PDF Converter | No Sign-up Required',
  description: 'Convert JPG, PNG, and WEBP images to PDF instantly in your browser. Free, fast, and secure - your files never leave your device. No sign-up or download required.',
  keywords: ['image to PDF', 'convert images to PDF', 'JPG to PDF', 'PNG to PDF', 'WEBP to PDF', 'free PDF converter', 'online PDF converter'],
  authors: [{ name: 'SnapConvert' }],
  creator: 'SnapConvert',
  alternates: {
    canonical: 'https://snapconvert.to',
    languages: {
      'en': 'https://snapconvert.to',
      'hu': 'https://snapconvert.to/hu',
    },
  },
  openGraph: {
    title: 'SnapConvert - Free Image to PDF Converter',
    description: 'Convert images to PDF instantly in your browser. Free, fast, and secure.',
    type: 'website',
    siteName: 'SnapConvert',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SnapConvert - Free Image to PDF Converter',
    description: 'Convert images to PDF instantly in your browser. Free, fast, and secure.',
  },
  generator: 'v0.app',
  icons: {
    icon: '/favicon.jpg',
    apple: '/favicon.jpg',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="alternate" hrefLang="en" href="https://snapconvert.to" />
        <link rel="alternate" hrefLang="hu" href="https://snapconvert.to/hu" />
        <link rel="alternate" hrefLang="x-default" href="https://snapconvert.to" />
      </head>
      <body className="font-sans antialiased">
        <LanguageProvider>
          {children}
        </LanguageProvider>
        <Analytics />
      </body>
    </html>
  )
}
