'use client'
import React from 'react'
import Image from 'next/image'
import { CheckCircle2, Target, Eye, ShieldCheck, CheckSquare, HeartPulse } from 'lucide-react'

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
              Penyedia Pelayanan <span className="text-primary-700">Pemeriksaan & Pengujian</span> Terpercaya
            </h2>
            
            <p className="text-gray-600 mb-8 leading-relaxed text-lg">
              PT. Delta Nusantara Persada adalah perusahaan yang bergerak di bidang jasa pemeriksaan & pengujian peralatan kerja (riksa uji), jasa audit alat, dan kajian teknis bangunan, membantu klien memenuhi persyaratan peraturan perundang-undangan dan standar yang berlaku.
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
                      Menjadi yang terdepan dalam Penyediaan Pelayanan Jasa Konsultan dan Jasa Pemeriksaan Pengujian peralatan kerja yang dapat diandalkan serta terpercaya.
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
                        'Menyediakan berbagai pelayanan jasa konsultan, pemeriksaan, dan pengujian peralatan kerja untuk menunjang peningkatan produktivitas dan K3 di sektor pemerintahan maupun swasta.',
                        'Memberikan layanan terbaik bagi semua pelanggan dan menjadi mitra kerja yang terpercaya serta dapat diandalkan.'
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

              {/* Policies */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
                <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:border-primary-300 transition-colors">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-blue-50 rounded-lg">
                      <CheckSquare className="w-5 h-5 text-blue-600" />
                    </div>
                    <h4 className="font-bold text-gray-900">Kebijakan Mutu</h4>
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Menjamin kepuasan klien, melakukan perbaikan berkesinambungan, bekerja jujur, profesional, tepat waktu, informatif, dan taat pada perundangan.
                  </p>
                </div>
                
                <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:border-primary-300 transition-colors">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-red-50 rounded-lg">
                      <HeartPulse className="w-5 h-5 text-red-600" />
                    </div>
                    <h4 className="font-bold text-gray-900">Kebijakan K3</h4>
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Mentaati perundangan K3, mencegah cedera dan penyakit akibat kerja, serta menyediakan fasilitas kerja yang aman dan nyaman.
                  </p>
                </div>
              </div>

            </div>
          </div>

          {/* Right: Images/Visuals */}
          <div className="relative">
            <div className="aspect-[4/5] rounded-3xl overflow-hidden relative shadow-2xl">
              <Image 
                src="https://images.unsplash.com/photo-1541888086925-ebbcbf7384a5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" 
                alt="Tim Delta Nusantara Persada" 
                fill 
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/20 to-transparent"></div>
              
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
                  <div className="text-2xl font-bold text-white mb-1">Riksa Uji & Audit Alat</div>
                  <div className="text-white/80 text-sm font-medium">Solusi kepatuhan untuk keamanan peralatan operasional</div>
                </div>
              </div>
            </div>
            
            {/* Floating Element */}
            <div className="absolute -left-12 top-1/4 bg-white rounded-2xl p-5 shadow-xl border border-gray-100 hidden md:flex items-center gap-4 animate-bounce" style={{ animationDuration: '3s' }}>
              <div className="w-12 h-12 bg-cyan-100 rounded-full flex items-center justify-center shrink-0">
                <ShieldCheck className="w-6 h-6 text-cyan-600" />
              </div>
              <div>
                <div className="text-xl font-bold text-gray-900">Tersertifikasi</div>
                <div className="text-sm text-gray-500">Standar Nasional</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
