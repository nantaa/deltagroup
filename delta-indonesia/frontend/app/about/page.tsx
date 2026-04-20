import React from 'react'
import TopBar from '@/components/layout/TopBar'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Breadcrumb from '@/components/ui/Breadcrumb'
import PageHero from '@/components/ui/PageHero'

const mitra = [
  { id: 1, name: 'LSP-PK', logo: null },
  { id: 2, name: 'Delta Nusantara Persada', logo: null },
  { id: 3, name: 'Biro Sertifikasi Indonesia', logo: null },
  { id: 4, name: 'Delta Indonesia Pranenggar', logo: null },
  { id: 5, name: 'Delta Nusantara Persada', logo: null },
  { id: 6, name: 'Biro Sertifikasi Indonesia', logo: null },
]

export default function AboutPage() {
  return (
    <>
      <TopBar />
      <Navbar />
      <Breadcrumb crumbs={[{ label: 'Tentang Kami' }]} />
      <PageHero
        title="Tentang Kami"
        subtitle="Harness the Future: AI Services Tailored for Success"
      />

      {/* About Section */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="border-l-4 border-accent pl-5 mb-6">
          <h2 className="text-lg font-bold text-primary-700 uppercase tracking-wide">
            PT. DELTA INDONESIA GROUP
          </h2>
        </div>
        <div className="max-w-3xl text-sm text-gray-700 leading-relaxed space-y-3">
          <p>
            DELTA INDONESIA Group bermula dari Perusahaan Jasa Pengembangan SDM bidang Perhotelan dan Keselamatan
            Kesehatan Kerja (K3), Softskill serta bidang lain dengan menyesuaikan kebutuhan para pelanggan.
          </p>
          <p>
            DELTA INDONESIA berdiri dari Tahun 1999 berbadan hukum Yayasan dan untuk meningkatkan profesionalitas usaha
            maka pada Tahun 2006 berubah menjadi Perseroan Terbatas (PT) dan terus berkembang sampai dengan saat ini
            dalam melayani kebutuhan para pelanggan.
          </p>
        </div>
      </section>

      {/* Mitra Section */}
      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="border-l-4 border-accent pl-5 mb-3">
          <h2 className="text-lg font-bold text-primary-700 uppercase tracking-wide">MITRA KAMI</h2>
        </div>
        <p className="text-sm text-gray-600 mb-8 max-w-2xl">
          Dalam merespon kebutuhan sertifikasi kompetensi personal, DELTA INDONESIA Group bekerjasama dengan Lembaga
          Sertifikasi Profesi (LSP) :
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {mitra.map((m) => (
            <div
              key={m.id}
              className="border border-gray-200 rounded-xl p-6 flex items-center gap-4 hover:shadow-sm transition-shadow"
            >
              {/* Logo placeholder */}
              <div className="w-14 h-14 bg-gray-100 rounded-lg flex items-center justify-center shrink-0">
                <svg viewBox="0 0 40 40" className="w-9 h-9 fill-primary-700">
                  <polygon points="20,4 36,34 4,34" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-bold text-primary-700 leading-tight">{m.name}</p>
                <p className="text-xs text-gray-400 mt-0.5">Lembaga Sertifikasi Profesi</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </>
  )
}
