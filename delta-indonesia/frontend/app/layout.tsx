import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { LanguageProvider } from '@/lib/LanguageContext'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export const metadata: Metadata = {
  title: 'Delta Indonesia Group | Consultant · Training · Inspection',
  description: 'PT. Delta Indonesia Group menyelenggarakan sertifikasi dan pelatihan K3 untuk karyawan maupun calon karyawan di seluruh Indonesia.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <body className={inter.variable}>
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  )
}
