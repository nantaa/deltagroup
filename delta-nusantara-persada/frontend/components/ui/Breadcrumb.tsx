'use client'
import React from 'react'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import { useLang, translations } from '@/lib/LanguageContext'

interface Crumb { label: string; href?: string }

const CRUMB_MAP: Record<string, keyof typeof translations.breadcrumb> = {
  'Tentang Kami': 'about',
  'Layanan Riksa Uji': 'services',
  'Berita': 'news',
  'Hubungi Kami': 'contact',
  'Brand Kami': 'brands',
  'Kebijakan Privasi': 'privacy',
  'Syarat & Ketentuan': 'terms',
}

export default function Breadcrumb({ crumbs }: { crumbs: Crumb[] }) {
  const { lang, t } = useLang()

  const resolveLabel = (label: string) => {
    const key = CRUMB_MAP[label]
    if (key && translations.breadcrumb[key]) {
      return translations.breadcrumb[key][lang]
    }
    return label
  }

  return (
    <>
      {/* JSON-LD: BreadcrumbList — uses same crumbs array as the visual nav */}
      <BreadcrumbSchema crumbs={crumbs} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-sm text-gray-500">
          <Link href="/" className="hover:text-accent transition-colors">
            {t('breadcrumb', 'home')}
          </Link>
          {crumbs.map((c, i) => {
            const label = resolveLabel(c.label)
            return (
              <React.Fragment key={i}>
                <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
                {c.href ? (
                  <Link href={c.href} className="hover:text-accent transition-colors">{label}</Link>
                ) : (
                  <span className="font-semibold text-gray-800" aria-current="page">{label}</span>
                )}
              </React.Fragment>
            )
          })}
        </nav>
      </div>
    </>
  )
}
