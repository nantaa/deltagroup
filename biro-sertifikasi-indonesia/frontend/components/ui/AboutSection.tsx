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
              Lembaga Audit <span className="text-primary-700">SMK3 & Sertifikasi Sistem Manajemen</span> Independen
            </h2>
            
            <p className="text-gray-600 mb-4 leading-relaxed text-lg">
              PT. Biro Sertifikasi Indonesia (BSI) memfokuskan diri menjadi lembaga audit SMK3 PP No.50 Tahun 2012,
              diperkuat dengan diterbitkannya Surat Keputusan Menteri No.137 Tahun 2018 tentang penunjukan PT. Biro Sertifikasi Indonesia sebagai Lembaga Audit SMK3.
            </p>
            <p className="text-gray-500 mb-8 leading-relaxed text-sm italic border-l-4 border-primary-200 pl-4">
              &ldquo;PT BSI memfokuskan diri menjadi lembaga audit SMK3 yang independen, kompetitif, dan dapat diandalkan, baik di tingkat nasional maupun internasional.&rdquo;<br />
              <span className="not-italic font-semibold text-gray-700">&mdash; S. Enggarwati, SE, MBA &mdash; Direktur PT. BSI</span>
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
                      Menjadi Lembaga Audit Sistem Manajemen yang Terpercaya, Independen, dan Kompetitif di Indonesia.
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
                        'Melakukan kemitraan dengan para pemangku kepentingan untuk mendapatkan solusi terbaik dalam memastikan pemenuhan dan peningkatan kinerja K3.',
                        'Mengembangkan Sumber Daya Manusia yang kompeten sesuai dengan nilai-nilai perusahaan.',
                        'Melakukan kerjasama yang saling menguntungkan dalam mewujudkan pemenuhan dan layanan yang berkualitas bagi pelanggan.'
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
                    <h4 className="font-bold text-gray-900 text-sm">Trust</h4>
                    <p className="text-xs text-gray-500 mt-1">PT. BSI dapat dipercaya dan diandalkan.</p>
                  </div>
                  <div className="bg-white border border-gray-200 rounded-xl p-4 flex flex-col items-center text-center shadow-sm">
                    <Award className="w-8 h-8 text-primary-600 mb-2" />
                    <h4 className="font-bold text-gray-900 text-sm">Be Professional</h4>
                    <p className="text-xs text-gray-500 mt-1">Customer Focus, Kompeten, Objektif & Independen.</p>
                  </div>
                  <div className="bg-white border border-gray-200 rounded-xl p-4 flex flex-col items-center text-center shadow-sm">
                    <Star className="w-8 h-8 text-primary-600 mb-2" />
                    <h4 className="font-bold text-gray-900 text-sm">Integrity</h4>
                    <p className="text-xs text-gray-500 mt-1">PT. BSI jujur serta amanah dalam setiap proses.</p>
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
                  <div className="text-2xl font-bold text-white mb-1">SMK3 & ISO</div>
                  <div className="text-white/80 text-sm font-medium">Ditunjuk SK Menteri No.137 Tahun 2018</div>
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
