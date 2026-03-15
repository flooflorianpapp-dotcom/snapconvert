import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import '../globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'SnapConvert - Ingyenes Kép PDF Konvertáló | Regisztráció Nélkül',
  description: 'Konvertáljon JPG, PNG és WEBP képeket PDF-be azonnal a böngészőjében. Ingyenes, gyors és biztonságos - a fájljai soha nem hagyják el az eszközét. Nincs szükség regisztrációra.',
  keywords: ['kép pdf-be', 'képek konvertálása pdf-be', 'JPG PDF-be', 'PNG PDF-be', 'WEBP PDF-be', 'ingyenes PDF konvertáló', 'online PDF konvertáló'],
  authors: [{ name: 'SnapConvert' }],
  creator: 'SnapConvert',
  alternates: {
    canonical: 'https://snapconvert.to/hu',
    languages: {
      'en': 'https://snapconvert.to',
      'hu': 'https://snapconvert.to/hu',
    },
  },
  openGraph: {
    title: 'SnapConvert - Ingyenes Kép PDF Konvertáló',
    description: 'Konvertáljon képeket PDF-be azonnal a böngészőjében. Ingyenes, gyors és biztonságos.',
    type: 'website',
    siteName: 'SnapConvert',
    locale: 'hu_HU',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SnapConvert - Ingyenes Kép PDF Konvertáló',
    description: 'Konvertáljon képeket PDF-be azonnal a böngészőjében. Ingyenes, gyors és biztonságos.',
  },
  generator: 'v0.app',
  icons: {
    icon: '/favicon.jpg',
    apple: '/favicon.jpg',
  },
}

export default function HungarianLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="hu">
      <head>
        <link rel="alternate" hrefLang="en" href="https://snapconvert.to" />
        <link rel="alternate" hrefLang="hu" href="https://snapconvert.to/hu" />
        <link rel="alternate" hrefLang="x-default" href="https://snapconvert.to" />
      </head>
      <body className="font-sans antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  )
}
