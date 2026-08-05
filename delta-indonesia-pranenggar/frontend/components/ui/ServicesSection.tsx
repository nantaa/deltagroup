'use client'
import React from 'react'
import { HardHat, Users, Briefcase, Coffee, CalendarRange } from 'lucide-react'

const DIVISIONS = [
  {
    id: 'div1',
    title: 'Industrial Safety Training (K3)',
    description: 'Program pelatihan Keselamatan dan Kesehatan Kerja (K3) untuk berbagai sektor industri, seperti K3 Listrik, K3 Konstruksi, Ahli K3 Umum, SMK3, dan lainnya sesuai regulasi pemerintah.',
    icon: HardHat,
    color: 'bg-orange-100 text-orange-600',
    borderColor: 'border-orange-200'
  },
  {
    id: 'div2',
    title: 'Human Resources Development',
    description: 'Pelatihan pengembangan kompetensi SDM termasuk Achievement Motivation, Quality Leadership, Conflict Management, Risk Management, dan Effective Business Presentation.',
    icon: Users,
    color: 'bg-blue-100 text-blue-600',
    borderColor: 'border-blue-200'
  },
  {
    id: 'div3',
    title: 'Management Consulting',
    description: 'Layanan konsultasi sistem manajemen seperti Quality Management System (QMS), Environment Management System (EMS), dan Safety Health Management System (SHMS).',
    icon: Briefcase,
    color: 'bg-emerald-100 text-emerald-600',
    borderColor: 'border-emerald-200'
  },
  {
    id: 'div4',
    title: 'Hospitality Industry Training',
    description: 'Pelatihan khusus industri perhotelan dan pariwisata mencakup Hotel Management, F&B Service, Food Production, Housekeeping, dan Retail Vocational School.',
    icon: Coffee,
    color: 'bg-purple-100 text-purple-600',
    borderColor: 'border-purple-200'
  },
  {
    id: 'div5',
    title: 'Event Organizer (EO)',
    description: 'Penyelenggaraan berbagai acara perusahaan meliputi Seminar, Workshop, Convention, Product Launching, Family Gathering, dan Company Outing.',
    icon: CalendarRange,
    color: 'bg-rose-100 text-rose-600',
    borderColor: 'border-rose-200'
  }
]

export default function ServicesSection() {
  return (
    <section className="py-20 bg-gray-50 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary-50 text-primary-700 font-semibold text-sm mb-4">
            <span>Layanan Kami</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Solusi Komprehensif untuk Kebutuhan <span className="text-primary-700">Perusahaan Anda</span>
          </h2>
          <p className="text-gray-600 text-lg">
            Kami menyediakan berbagai layanan mulai dari pelatihan sertifikasi K3, pengembangan SDM, hingga konsultasi manajemen untuk meningkatkan produktivitas dan kepatuhan perusahaan Anda.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {DIVISIONS.map((div, index) => (
            <div 
              key={div.id} 
              className={`bg-white rounded-2xl p-8 border hover:shadow-xl transition-all duration-300 group ${
                index === 4 ? 'md:col-span-2 lg:col-span-1' : ''
              }`}
            >
              <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110 ${div.color}`}>
                <div.icon className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">{div.title}</h3>
              <p className="text-gray-600 leading-relaxed text-sm">
                {div.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
