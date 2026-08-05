'use client'
import React from 'react'
import { HardHat, Search, Building2, Wrench, Settings, FileText } from 'lucide-react'

const PRODUCTS = [
  {
    id: 'prod1',
    title: 'Work Equipment Testing & Inspection',
    subtitle: 'Riksa Uji Peralatan',
    description: 'Meliputi Pesawat Angkat Angkut, Instalasi Listrik & Penyalur Petir, Elevator & Escalator, Instalasi Proteksi Kebakaran, Boiler & Bejana Tekan, Mesin Produksi, dan Konstruksi Bangunan.',
    icon: Wrench,
    color: 'bg-cyan-100 text-cyan-600',
  },
  {
    id: 'prod2',
    title: 'Equipment Audit Services',
    subtitle: 'Jasa Audit Alat',
    description: 'Pemeriksaan sistem, proses, atau produk untuk Elevator & Escalator, Alat Berat, Instalasi Listrik, dan Proteksi Kebakaran.',
    icon: Search,
    color: 'bg-amber-100 text-amber-600',
  },
  {
    id: 'prod3',
    title: 'Construction Technical Studies',
    subtitle: 'Kajian Teknis Bangunan',
    description: 'Mencari kesesuaian antara desain dengan kondisi aktual untuk Arsitektur, Konstruksi, Listrik Arus Kuat/Lemah, Sanitasi, dan Tata Udara Gedung.',
    icon: Building2,
    color: 'bg-indigo-100 text-indigo-600',
  }
]

export default function ServicesSection() {
  return (
    <section className="py-20 bg-gray-50 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Products & Services */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary-50 text-primary-700 font-semibold text-sm mb-4">
            <span>Layanan Kami</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Solusi <span className="text-primary-700">Pemeriksaan & Pengujian</span> Komprehensif
          </h2>
          <p className="text-gray-600 text-lg">
            Kami menyediakan layanan Riksa Uji, Audit Alat, dan Kajian Teknis Bangunan untuk memastikan keselamatan dan kepatuhan standar industri.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {PRODUCTS.map((prod) => (
            <div 
              key={prod.id} 
              className="bg-white rounded-2xl p-8 border hover:shadow-xl transition-all duration-300 group"
            >
              <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110 ${prod.color}`}>
                <prod.icon className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-1">{prod.title}</h3>
              <p className="text-primary-600 text-sm font-medium mb-4">{prod.subtitle}</p>
              <p className="text-gray-600 leading-relaxed text-sm">
                {prod.description}
              </p>
            </div>
          ))}
        </div>
        
      </div>
    </section>
  )
}
