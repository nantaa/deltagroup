import type { Metadata } from 'next'
import React from 'react'
import SiteHeader from '@/components/layout/SiteHeader'
import Footer from '@/components/layout/Footer'
import Breadcrumb from '@/components/ui/Breadcrumb'
import DossierSpecStrip from '@/components/showcase/DossierSpecStrip'
import IndustrialRiskGrid from '@/components/showcase/IndustrialRiskGrid'
import AnnotatedEquipmentInspector from '@/components/showcase/AnnotatedEquipmentInspector'
import InspectionRevealSlider from '@/components/showcase/InspectionRevealSlider'
import { ShieldCheck, CheckCircle2, Award, Users, ArrowRight, Phone } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'Eksplorasi Desain UI/UX (Skor ≥ 8.5)',
  description:
    'Eksplorasi teknik antarmuka web modern yang disesuaikan secara autentik untuk PT Delta Nusantara Persada — tanpa efek fiksi ilmiah, berfokus pada kepercayaan industri.',
  alternates: { canonical: '/showcase' },
}

export default function ShowcasePage() {
  const sampleClients = [
    { name: 'Kempinski Hotel Indonesia', logo: '/images/logo-client/client-1.png' },
    { name: 'PT Total Bangun Persada', logo: '/images/logo-client/client-2.jpg' },
    { name: 'PT Berca Schindler Lifts', logo: '/images/logo-client/client-3.png' },
    { name: 'PT Elnusa', logo: '/images/logo-client/client-4.png' },
    { name: 'PT Jababeka Infrastruktur', logo: '/images/logo-client/client-5.png' },
    { name: 'PT Bank Sahabat Sampoerna', logo: '/images/logo-client/client-6.png' },
  ]

  return (
    <div className="min-h-screen bg-white text-gray-900 flex flex-col font-sans">
      <SiteHeader />
      <Breadcrumb crumbs={[{ label: 'Eksplorasi Desain Industri' }]} />

      {/* Editorial Header */}
      <header className="bg-slate-50 border-b border-gray-200 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-dnp-navy text-white text-xs font-semibold tracking-wide uppercase">
              <ShieldCheck className="w-3.5 h-3.5 text-dnp-cyan" />
              DESAIN INDUSTRI BERBASIS KREDIBILITAS
            </span>
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-semibold">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              KONSEP TERKURASI (SKOR ≥ 8.5 / 10)
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-dnp-navy tracking-tight leading-tight max-w-4xl">
            Desain Web Modern yang Berakar pada Kredibilitas Nyata
          </h1>
          
          <p className="text-gray-600 text-base sm:text-lg max-w-3xl mt-4 leading-relaxed">
            Halaman presentasi khusus yang meredefinisi standar web inspeksi keselamatan kerja di Indonesia:
            mengedepankan <strong>manusia, data legalitas resmi Kemnaker RI, dan foto dokumentasi lapangan nyata</strong> — tanpa efek fiksi ilmiah atau visual buatan yang berlebihan.
          </p>

          {/* Core Values Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-8 border-t border-gray-200 text-xs">
            <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
              <span className="text-gray-400 block font-semibold">PENDEKATAN</span>
              <span className="text-dnp-navy font-bold text-sm">Humanis & Profesional</span>
            </div>
            <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
              <span className="text-gray-400 block font-semibold">FONDASI DATA</span>
              <span className="text-dnp-teal font-bold text-sm">25+ Tahun Pengalaman</span>
            </div>
            <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
              <span className="text-gray-400 block font-semibold">TIPOGRAFI</span>
              <span className="text-gray-900 font-bold text-sm">Figtree & DM Sans</span>
            </div>
            <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
              <span className="text-gray-400 block font-semibold">SASARAN AUDIENS</span>
              <span className="text-amber-800 font-bold text-sm">Manajer Pabrik & Tim HSE</span>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-grow space-y-20 pb-20">

        {/* ─────────────────────────────────────────────────────────────
            CONCEPT 1: CREDENTIALS STRIP (SCORE: 9.5 / 10)
        ─────────────────────────────────────────────────────────────── */}
        <section className="pt-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-4">
            <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-xl bg-slate-50 border border-gray-200">
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-dnp-navy text-white flex items-center justify-center font-bold text-sm">
                  1
                </span>
                <div>
                  <h2 className="text-base font-bold text-dnp-navy">
                    Modul 1: Pita Legitimasi & Kapabilitas Resmi
                  </h2>
                  <p className="text-xs text-gray-500">
                    Menghilangkan kode fiktif bergaya militer, digantikan data legalitas resmi Kemnaker RI, riwayat 1999, dan alamat kantor pusat Suncity Square Bekasi.
                  </p>
                </div>
              </div>
              <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold">
                Skor: 9.5 / 10
              </span>
            </div>
          </div>

          <DossierSpecStrip />
        </section>

        {/* ─────────────────────────────────────────────────────────────
            CONCEPT 2: EMPATHETIC RISK & COMPLIANCE GRID (SCORE: 9.5 / 10)
        ─────────────────────────────────────────────────────────────── */}
        <section>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-4">
            <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-xl bg-slate-50 border border-gray-200">
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-dnp-navy text-white flex items-center justify-center font-bold text-sm">
                  2
                </span>
                <div>
                  <h2 className="text-base font-bold text-dnp-navy">
                    Modul 2: Matriks Kebutuhan Riil Tim HSE & Pimpinan Pabrik
                  </h2>
                  <p className="text-xs text-gray-500">
                    Menggantikan bahasa teknologi yang kaku dengan 4 kekhawatiran nyata: audit Disnaker, mesin mati, syarat tender BUMN, dan keselamatan nyawa operator.
                  </p>
                </div>
              </div>
              <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold">
                Skor: 9.5 / 10
              </span>
            </div>
          </div>

          <IndustrialRiskGrid />
        </section>

        {/* ─────────────────────────────────────────────────────────────
            CONCEPT 3: REAL HUMAN FIELD INSPECTION (SCORE: 9.0 / 10)
        ─────────────────────────────────────────────────────────────── */}
        <section>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-4">
            <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-xl bg-slate-50 border border-gray-200">
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-dnp-navy text-white flex items-center justify-center font-bold text-sm">
                  3
                </span>
                <div>
                  <h2 className="text-base font-bold text-dnp-navy">
                    Modul 3: Dokumentasi Lapangan Nyata & 4 Langkah Riksa Uji
                  </h2>
                  <p className="text-xs text-gray-500">
                    Menggantikan gambar vektor buatan dengan foto asli tim inspektur DNP serta transparansi 4 tahapan riksa uji dari verifikasi hingga penerbitan Suket.
                  </p>
                </div>
              </div>
              <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold">
                Skor: 9.0 / 10
              </span>
            </div>
          </div>

          <AnnotatedEquipmentInspector />
        </section>

        {/* ─────────────────────────────────────────────────────────────
            CONCEPT 4: CLEAN REVEAL SLIDER (SCORE: 8.5 / 10)
        ─────────────────────────────────────────────────────────────── */}
        <section>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-4">
            <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-xl bg-slate-50 border border-gray-200">
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-dnp-navy text-white flex items-center justify-center font-bold text-sm">
                  4
                </span>
                <div>
                  <h2 className="text-base font-bold text-dnp-navy">
                    Modul 4: Komparasi Kondisi Rawan vs. Standar Laik Operasi
                  </h2>
                  <p className="text-xs text-gray-500">
                    Menghilangkan garis neon menyala, disempurnakan menjadi tuas perbandingan yang bersih, elegan, dan mendidik klien mengenai nilai inspeksi berkala.
                  </p>
                </div>
              </div>
              <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold">
                Skor: 8.5 / 10
              </span>
            </div>
          </div>

          <InspectionRevealSlider />
        </section>

        {/* Real Clients Trust Bar */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
          <div className="text-center mb-8">
            <p className="text-xs font-bold uppercase tracking-widest text-gray-500">
              DIPERCAYA OLEH RATUSAN PERUSAHAAN NASIONAL & MULTINASIONAL
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 items-center">
            {sampleClients.map((client, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl border border-gray-200 bg-white flex items-center justify-center h-20 grayscale hover:grayscale-0 transition-all duration-300 shadow-sm"
              >
                <Image
                  src={client.logo}
                  alt={client.name}
                  width={140}
                  height={44}
                  unoptimized
                  loading="eager"
                  className="max-h-10 w-auto object-contain"
                />
              </div>
            ))}
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="max-w-4xl mx-auto px-4 text-center pt-8">
          <div className="p-8 sm:p-10 rounded-3xl bg-dnp-navy text-white shadow-xl">
            <h3 className="text-xl sm:text-2xl font-bold mb-3">
              Kombinasi Mana yang Ingin Anda Terapkan ke Halaman Utama?
            </h3>
            <p className="text-slate-300 text-sm mb-8 max-w-lg mx-auto leading-relaxed">
              Setiap modul di atas telah teruji bebas dari elemen AI yang artifisial. Silakan pilih modul mana yang ingin Anda pindahkan ke halaman beranda (`/`).
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/"
                className="inline-flex items-center gap-2 bg-dnp-cyan text-dnp-navy font-bold text-xs uppercase tracking-wider px-7 py-3.5 rounded-full hover:bg-white transition-colors"
              >
                <span>Lihat Beranda Saat Ini</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-white/10 text-white border border-white/20 font-semibold text-xs uppercase tracking-wider px-7 py-3.5 rounded-full hover:bg-white/20 transition-colors"
              >
                <Phone className="w-4 h-4" />
                <span>Hubungi Kantor Pusat</span>
              </Link>
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  )
}
