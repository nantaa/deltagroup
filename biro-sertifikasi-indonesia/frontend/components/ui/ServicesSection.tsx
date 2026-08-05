'use client'
import React from 'react'
import { FileCheck, Search, ShieldCheck, CheckCircle, Users, TrendingUp, BookOpen } from 'lucide-react'

const PRODUCTS = [
  {
    id: 'prod1',
    title: 'Sertifikasi SMK3, ISO & SIMPPRO',
    description: 'Sertifikasi untuk memperoleh sertifikat SMK3 sesuai PP No.50 Tahun 2012, SIMPPRO (Kepmen No.156/2021), serta ISO 9001, ISO 14001, dan ISO 45001 dari auditor bersertifikat BNSP.',
    icon: FileCheck,
    color: 'bg-primary-100 text-primary-700',
  },
  {
    id: 'prod2',
    title: 'Eksternal Audit',
    description: 'Audit yang dilaksanakan oleh PT. BSI untuk melakukan verifikasi pemenuhan perundangan, peraturan, serta kewajiban perusahaan secara independen dan objektif.',
    icon: Search,
    color: 'bg-amber-100 text-amber-700',
  },
  {
    id: 'prod3',
    title: 'Pelatihan Non-Kompetensi',
    description: 'Sebelum memperoleh sertifikasi K3, para pemohon harus mengikuti sejumlah persiapan. BSI menyediakan pelatihan K3 yang relevan untuk memastikan kesiapan perusahaan.',
    icon: BookOpen,
    color: 'bg-emerald-100 text-emerald-700',
  },
  {
    id: 'prod4',
    title: 'GAP Analysis & Internal Audit',
    description: 'Simulasi audit untuk memverifikasi tingkat pemenuhan sistem manajemen (SMK3, SIMPPRO, atau ISO) serta pendampingan audit internal sebelum pelaksanaan audit eksternal resmi.',
    icon: ShieldCheck,
    color: 'bg-purple-100 text-purple-700',
  }
]

const REASONS = [
  {
    title: 'Kualitas Terjamin',
    desc: 'BSI menjamin kualitas hasil audit dengan memastikan objektivitas, keakuratan, dan kecepatan sesuai peraturan yang berlaku.',
    icon: CheckCircle
  },
  {
    title: 'Team yang Profesional',
    desc: 'Tim BSI terdiri dari orang-orang kompeten bersertifikat BNSP, dengan pengalaman lebih dari 6 tahun di berbagai jenis industri dan institusi.',
    icon: Users
  },
  {
    title: 'Biaya Investasi Kompetitif',
    desc: 'BSI memberikan nilai tambah (value added) kepada pelanggan dengan kualitas hasil yang tetap terjamin dan investasi yang kompetitif.',
    icon: TrendingUp
  }
]

export default function ServicesSection() {
  return (
    <section className="py-20 bg-gray-50 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Products & Services */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary-50 text-primary-700 font-semibold text-sm mb-4">
            <span>Produk & Layanan</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Layanan <span className="text-primary-700">Audit & Sertifikasi</span>
          </h2>
          <p className="text-gray-600 text-lg">
            Kami menyediakan layanan audit dan sertifikasi sistem manajemen berdasarkan PP No.50 Tahun 2012 dan SK Menteri No.137 Tahun 2018 untuk memastikan kepatuhan dan peningkatan kinerja K3 perusahaan Anda.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {PRODUCTS.map((prod) => (
            <div 
              key={prod.id} 
              className="bg-white rounded-2xl p-8 border hover:shadow-xl transition-all duration-300 group"
            >
              <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110 ${prod.color}`}>
                <prod.icon className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">{prod.title}</h3>
              <p className="text-gray-600 leading-relaxed text-sm">
                {prod.description}
              </p>
            </div>
          ))}
        </div>

        {/* Why Choose BSI */}
        <div className="bg-primary-900 rounded-3xl p-10 md:p-16 relative overflow-hidden text-white">
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary-800 rounded-full blur-3xl -mr-20 -mt-20 opacity-50"></div>
          
          <div className="relative z-10 text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Mengapa Memilih BSI?</h2>
            <p className="text-primary-200">Keunggulan kami sebagai partner audit dan sertifikasi Anda.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
            {REASONS.map((reason, idx) => (
              <div key={idx} className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 text-center">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <reason.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{reason.title}</h3>
                <p className="text-primary-100 text-sm">{reason.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
