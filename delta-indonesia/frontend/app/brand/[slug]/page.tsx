import React from 'react'
import TopBar from '@/components/layout/TopBar'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Breadcrumb from '@/components/ui/Breadcrumb'
import PageHero from '@/components/ui/PageHero'
import { ExternalLink } from 'lucide-react'

const BRAND_DATA: Record<string, { name: string; description: string; longDesc: string; website?: string }> = {
  pranenggar: {
    name: 'Delta Indonesia Pranenggar',
    description: 'Consultant · Training · Inspection',
    longDesc: 'Delta Indonesia Pranenggar adalah perusahaan konsultan profesional yang berfokus pada pengembangan SDM, keselamatan kerja (K3), dan pelatihan korporat. Kami telah melayani lebih dari 100+ perusahaan di seluruh Indonesia.',
    website: 'https://deltaindonesia.com',
  },
  'nusa-persada': {
    name: 'Delta Nusantara Persada',
    description: 'Technical Inspection · Quality Assurance',
    longDesc: 'Delta Nusantara Persada menyediakan layanan inspeksi teknis dan quality assurance untuk sektor industri, energi, dan manufaktur. Didukung oleh tenaga ahli bersertifikat internasional.',
  },
  bsi: {
    name: 'Biro Sertifikasi Indonesia',
    description: 'Lembaga Sertifikasi Profesi Terakreditasi',
    longDesc: 'Biro Sertifikasi Indonesia (BSI) adalah lembaga sertifikasi profesi yang terakreditasi BNSP, melayani sertifikasi kompetensi di berbagai bidang termasuk K3, perhotelan, dan teknologi informasi.',
  },
}

export default function BrandDetailPage({ params }: { params: { slug: string } }) {
  const brand = BRAND_DATA[params.slug]
  if (!brand) return null

  return (
    <>
      <TopBar />
      <Navbar />
      <Breadcrumb crumbs={[{ label: 'Brand Kami', href: '/brand' }, { label: brand.name }]} />
      <PageHero title={brand.name} subtitle={brand.description} />

      <section className="py-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex gap-8 items-start">
          <div className="w-28 h-28 bg-primary-700/10 rounded-2xl flex items-center justify-center shrink-0">
            <svg viewBox="0 0 40 40" className="w-16 h-16 fill-primary-700">
              <polygon points="20,4 36,34 4,34" />
            </svg>
          </div>
          <div>
            <h2 className="text-xl font-bold text-primary-700 mb-3">{brand.name}</h2>
            <p className="text-gray-600 text-sm leading-relaxed mb-4">{brand.longDesc}</p>
            {brand.website && (
              <a href={brand.website} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-accent text-sm font-medium hover:underline"
              >
                Kunjungi Website <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}
