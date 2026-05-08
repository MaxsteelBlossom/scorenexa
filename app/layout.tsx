import type { Metadata } from 'next'
import './globals.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import ScoreTicker from '@/components/layout/ScoreTicker'
import Script from 'next/script'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://scorenexa.com'
const ADSENSE_ID = process.env.NEXT_PUBLIC_ADSENSE_ID || ''

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'ScoreNexa – Live Scores, Football News, Transfers & Stats',
    template: '%s | ScoreNexa'
  },
  description: 'ScoreNexa delivers live football scores, breaking transfer news, fixtures, standings, betting tips and expert analysis 24/7. Premier League, La Liga, Champions League coverage.',
  keywords: [
    'live football scores','transfer news','Premier League','La Liga','Champions League',
    'football fixtures','league standings','football news','betting tips','football stats',
    'Bundesliga','Serie A','Ligue 1','soccer scores','football results'
  ],
  authors: [{ name: 'ScoreNexa Editorial Team', url: SITE_URL }],
  creator: 'ScoreNexa',
  publisher: 'ScoreNexa',
  robots: {
    index: true, follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1, 'max-video-preview': -1 }
  },
  openGraph: {
    type: 'website', locale: 'en_GB', url: SITE_URL, siteName: 'ScoreNexa',
    title: 'ScoreNexa – Live Scores, Football News & Transfers',
    description: 'Live football scores, transfer news, fixtures, standings, betting tips and expert analysis. The #1 destination for real-time sports intelligence.',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'ScoreNexa – Live Scores, News & Stats' }],
  },
  twitter: { card: 'summary_large_image', site: '@scorenexa', creator: '@scorenexa',
    title: 'ScoreNexa – Live Football Scores & News',
    description: 'Live scores, transfer news, fixtures and expert analysis 24/7.'
  },
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon-32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180' }],
    shortcut: '/favicon.svg',
  },
  manifest: '/manifest.json',
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION || '',
  },
  alternates: { canonical: SITE_URL },
  other: { 'google-adsense-account': ADSENSE_ID },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Oswald:wght@400;500;600;700&family=Source+Serif+4:ital,wght@0,300;0,400;0,600;1,400&display=swap" rel="stylesheet" />
        {ADSENSE_ID && ADSENSE_ID !== 'ca-pub-XXXXXXXXXX' && (
          <meta name="google-adsense-account" content={ADSENSE_ID} />
        )}
      </head>
      <body>
        {ADSENSE_ID && ADSENSE_ID !== 'ca-pub-XXXXXXXXXX' && (
          <Script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_ID}`}
            crossOrigin="anonymous"
            strategy="afterInteractive"
          />
        )}
        <Header />
        <ScoreTicker />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
