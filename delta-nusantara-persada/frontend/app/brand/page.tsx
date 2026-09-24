import type { Metadata } from 'next'
import React from 'react'
import SiteHeader from '@/components/layout/SiteHeader'
import Footer from '@/components/layout/Footer'
import Breadcrumb from '@/components/ui/Breadcrumb'
import PageHero from '@/components/ui/PageHero'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Brand Kami',
  description:
    'Ekosistem layanan PT Delta Nusantara Persada dan mitra afiliasi dalam pengujian K3, sertifikasi profesi, dan konsultasi keselamatan kerja.',
  alternates: { canonical: '/brand' },
}

const brands = [
  {
    id: 1,
    name: 'Delta Indonesia Pranenggar',
    slug: 'pranenggar',
    description: 'Layanan konsultasi profesional untuk keselamatan kerja dan pengembangan SDM.',
  },
  {
    id: 2,
    name: 'Delta Nusantara Persada',
    slug: 'nusa-persada',
    description: 'Inspeksi teknis dan quality assurance untuk industri dan manufaktur.',
  },
  {
    id: 3,
    name: 'Biro Sertifikasi Indonesia',
    slug: 'bsi',
    description: 'Lembaga sertifikasi profesi terakreditasi untuk berbagai bidang kompetensi.',
  },
]

export default function BrandPage() {
  return (
    <>
      <SiteHeader />
      <Breadcrumb crumbs={[{ label: 'Brand Kami' }]} />
      <PageHero
        title="Brand Kami"
        subtitle="Ekosistem Layanan K3, Sertifikasi Kompetensi, dan Inspeksi Teknis Delta Group"
      />

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {brands.map((brand) => (
              <Link
                key={brand.id}
                href={`/brand/${brand.slug}`}
                className="border border-gray-200 rounded-xl p-8 flex flex-col items-center text-center hover:shadow-md hover:border-accent transition-all group"
              >
                <div className="w-20 h-20 bg-primary-700/10 rounded-xl flex items-center justify-center mb-5 group-hover:bg-accent/10 transition-colors">
                  <svg viewBox="0 0 40 40" className="w-12 h-12 fill-primary-700">
                    <polygon points="20,4 36,34 4,34" />
                  </svg>
                </div>
                <h3 className="font-bold text-primary-700 text-base mb-2">{brand.name}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{brand.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}
