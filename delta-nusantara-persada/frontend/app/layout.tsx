import type { Metadata } from 'next'
import { Figtree, DM_Sans } from 'next/font/google'
import './globals.css'
import { LanguageProvider } from '@/lib/LanguageContext'
import LocalBusinessSchema from '@/components/seo/LocalBusinessSchema'
import FloatingWhatsApp from '@/components/ui/FloatingWhatsApp'

const figtree = Figtree({
  subsets: ['latin'],
  variable: '--font-figtree',
  display: 'swap',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  display: 'swap',
})

// ─── ASSUMPTION ──────────────────────────────────────────────────────────────
// Domain: deltanusa.co.id — set NEXT_PUBLIC_SITE_URL in .env.local to override.
// OG image: /images/og-dnp.png (1200×630) — generate & add to /public/images/.
// ─────────────────────────────────────────────────────────────────────────────
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://deltanusa.co.id'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  title: {
    default: 'PT Delta Nusantara Persada | Jasa Riksa Uji K3 & PJK3 Terpercaya',
    template: '%s | PT Delta Nusantara Persada',
  },

  description:
    'PT Delta Nusantara Persada — jasa riksa uji pesawat dan riksa uji alat kerja yang ditunjuk resmi Kemnaker RI. Melayani pemeriksaan & pengujian K3: crane, boiler, elevator, instalasi listrik, proteksi kebakaran, dan pesawat tenaga produksi di seluruh Indonesia.',

  keywords: [
    // Primary targets
    'jasa riksa uji',
    'riksa uji pesawat',
    'riksa uji alat',
    // Service-specific
    'riksa uji pesawat angkat',
    'riksa uji pesawat uap',
    'riksa uji bejana tekan',
    'riksa uji crane',
    'riksa uji boiler',
    'riksa uji elevator',
    'riksa uji instalasi listrik',
    'riksa uji proteksi kebakaran',
    // Location + authority
    'riksa uji Bekasi',
    'riksa uji Jakarta',
    'PJK3 terpercaya Indonesia',
    'pemeriksaan pengujian K3 Kemnaker',
    'perusahaan PJK3',
    'Ahli K3 Spesialis',
  ],

  authors: [{ name: 'PT Delta Nusantara Persada', url: SITE_URL }],
  creator: 'PT Delta Nusantara Persada',
  publisher: 'PT Delta Nusantara Persada',

  alternates: {
    canonical: SITE_URL,
  },

  openGraph: {
    type: 'website',
    locale: 'id_ID',
    url: SITE_URL,
    siteName: 'PT Delta Nusantara Persada',
    title: 'PT Delta Nusantara Persada | Jasa Riksa Uji K3 & PJK3 Terpercaya',
    description:
      'PJK3 Riksa Uji ditunjuk resmi Kemnaker RI. Melayani inspeksi & pengujian crane, boiler, elevator, listrik, proteksi kebakaran di seluruh Indonesia.',
    images: [
      {
        url: '/images/og-dnp.png', // TODO: Create 1200×630px branded image
        width: 1200,
        height: 630,
        alt: 'PT Delta Nusantara Persada — Jasa Riksa Uji K3 Indonesia',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: 'PT Delta Nusantara Persada | Jasa Riksa Uji K3 & PJK3 Terpercaya',
    description:
      'PJK3 Riksa Uji ditunjuk resmi Kemnaker RI. Melayani inspeksi & pengujian K3 di seluruh Indonesia.',
    images: ['/images/og-dnp.png'],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <body className={`${dmSans.variable} ${figtree.variable} font-sans`}>
        <LocalBusinessSchema />
        <LanguageProvider>
          {children}
          <FloatingWhatsApp />
        </LanguageProvider>
      </body>
    </html>
  )
}
