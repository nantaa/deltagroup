import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google'
import './globals.css'
import { LanguageProvider } from '@/lib/LanguageContext'

const montserrat = Montserrat({ subsets: ['latin'], variable: '--font-montserrat' })

export const metadata: Metadata = {
  title: 'Biro Sertifikasi Indonesia | Consultant · Training · Inspection',
  description: 'PT. Biro Sertifikasi Indonesia menyelenggarakan sertifikasi dan pelatihan K3 untuk karyawan maupun calon karyawan di seluruh Indonesia.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <body className={montserrat.variable}>
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  )
}
