'use client'
import React from 'react'
import Image from 'next/image'
import { CheckCircle2, Target, Eye, ShieldCheck, Award, Star } from 'lucide-react'

export default function AboutSection() {
  return (
    <section className="py-20 bg-white overflow-hidden relative">
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-primary-50/50 blur-3xl -z-10"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left: Content */}
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary-50 text-primary-700 font-semibold text-sm mb-6">
              <ShieldCheck className="w-4 h-4" />
              <span>Tentang Kami</span>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight">
              Lembaga Jasa Audit dan <span className="text-primary-700">Sertifikasi Sistem Manajemen</span> Terpercaya
            </h2>
            
            <p className="text-gray-600 mb-8 leading-relaxed text-lg">
              PT. Biro Sertifikasi Indonesia (BSI) adalah anak perusahaan PT. Delta Indonesia Group yang beroperasi sebagai lembaga jasa Audit dan Sertifikasi Sistem Manajemen yang independen, kompetitif, dan dapat diandalkan baik di tingkat nasional maupun internasional.
            </p>

            {/* Vision & Mission Cards */}
            <div className="space-y-6">
              {/* Visi */}
              <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center shrink-0">
                    <Eye className="w-6 h-6 text-primary-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Visi Kami</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      Bertekad untuk menjadi Lembaga Jasa Audit dan Sertifikasi di bidang Sistem Manajemen yang Independen, Kompetitif serta Terpercaya, baik di tingkat nasional maupun Internasional.
                    </p>
                  </div>
                </div>
              </div>

              {/* Misi */}
              <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center shrink-0">
                    <Target className="w-6 h-6 text-primary-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">Misi Kami</h3>
                    <ul className="space-y-3">
                      {[
                        'Membangun kemitraan dengan para pemangku kepentingan untuk menemukan solusi terbaik dalam pemenuhan persyaratan dan peningkatan kinerja.',
                        'Mengembangkan SDM yang kompeten sesuai dengan nilai-nilai perusahaan.',
                        'Memberikan layanan terbaik dan nilai tambah bagi pelanggan dalam pelaksanaan audit dan sertifikasi sistem manajemen.'
                      ].map((item, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                          <span className="text-gray-600 text-sm leading-relaxed">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* BSI Values */}
              <div className="mt-8">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Nilai-Nilai BSI (BSI Values)</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="bg-white border border-gray-200 rounded-xl p-4 flex flex-col items-center text-center shadow-sm">
                    <ShieldCheck className="w-8 h-8 text-primary-600 mb-2" />
                    <h4 className="font-bold text-gray-900 text-sm">Trustworthiness</h4>
                    <p className="text-xs text-gray-500 mt-1">Dapat diandalkan dan dipercaya.</p>
                  </div>
                  <div className="bg-white border border-gray-200 rounded-xl p-4 flex flex-col items-center text-center shadow-sm">
                    <Award className="w-8 h-8 text-primary-600 mb-2" />
                    <h4 className="font-bold text-gray-900 text-sm">Professionalism</h4>
                    <p className="text-xs text-gray-500 mt-1">Fokus pada pelanggan, kompeten, objektif.</p>
                  </div>
                  <div className="bg-white border border-gray-200 rounded-xl p-4 flex flex-col items-center text-center shadow-sm">
                    <Star className="w-8 h-8 text-primary-600 mb-2" />
                    <h4 className="font-bold text-gray-900 text-sm">Integrity</h4>
                    <p className="text-xs text-gray-500 mt-1">Jujur dan terpercaya dalam semua operasi.</p>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* Right: Images/Visuals */}
          <div className="relative">
            <div className="aspect-[4/5] rounded-3xl overflow-hidden relative shadow-2xl">
              <Image 
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" 
                alt="Tim Biro Sertifikasi Indonesia" 
                fill 
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/20 to-transparent"></div>
              
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
                  <div className="text-2xl font-bold text-white mb-1">Audit & Sertifikasi</div>
                  <div className="text-white/80 text-sm font-medium">Solusi independen, kompetitif, dan terpercaya</div>
                </div>
              </div>
            </div>
            
            {/* Floating Element */}
            <div className="absolute -left-12 top-1/4 bg-white rounded-2xl p-5 shadow-xl border border-gray-100 hidden md:flex items-center gap-4 animate-bounce" style={{ animationDuration: '3s' }}>
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center shrink-0">
                <Award className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <div className="text-xl font-bold text-gray-900">ISO & SMK3</div>
                <div className="text-sm text-gray-500">Sertifikasi Nasional</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
