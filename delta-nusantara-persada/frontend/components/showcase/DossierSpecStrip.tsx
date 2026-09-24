'use client'
import React from 'react'
import { ShieldCheck, MapPin, Award, Users, CheckCircle } from 'lucide-react'

export default function DossierSpecStrip() {
  const credentials = [
    {
      title: 'Penunjukan Resmi',
      value: 'PJK3 Kemnaker RI',
      detail: 'SKP Ahli K3 Spesialis Aktif',
      icon: ShieldCheck,
      badge: 'Resmi',
    },
    {
      title: 'Pengalaman Industri',
      value: 'Berdiri Sejak 1999',
      detail: '25+ Tahun Layanan Nasional',
      icon: Award,
      badge: 'Terpercaya',
    },
    {
      title: 'Jangkauan Wilayah',
      value: '38 Provinsi Indonesia',
      detail: 'Kantor Pusat Suncity Square Bekasi',
      icon: MapPin,
      badge: 'Nasional',
    },
    {
      title: 'Kompetensi Teknis',
      value: 'Ahli K3 & NDT Level II',
      detail: 'Welding Inspector Bersertifikat',
      icon: Users,
      badge: 'Bersertifikat',
    },
  ]

  return (
    <div className="w-full bg-dnp-navy text-white font-sans border-y border-white/10 shadow-lg">
      {/* Top authoritative bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 flex flex-wrap items-center justify-between gap-3 border-b border-white/10 text-xs">
        <div className="flex items-center gap-2 text-slate-200">
          <span className="w-2 h-2 rounded-full bg-emerald-400" />
          <span className="font-bold text-white tracking-wide">
            PT DELTA NUSANTARA PERSADA
          </span>
          <span className="text-white/40">·</span>
          <span className="text-slate-300">
            Perusahaan Jasa Keselamatan dan Kesehatan Kerja (PJK3) Riksa Uji
          </span>
        </div>
        <div className="flex items-center gap-4 text-slate-300 text-xs">
          <span>Bekasi Head Office: (021) 88869010</span>
          <span className="hidden md:inline text-white/30">•</span>
          <span className="hidden md:inline text-dnp-cyan font-medium">Senin – Sabtu, 08.00 – 17.00 WIB</span>
        </div>
      </div>

      {/* 4 Credential Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {credentials.map((item, idx) => {
            const Icon = item.icon
            return (
              <div
                key={idx}
                className="bg-white/5 border border-white/10 rounded-xl p-4 hover:bg-white/10 hover:border-dnp-cyan/40 transition-all duration-200 flex items-start gap-3.5"
              >
                <div className="p-2.5 rounded-lg bg-dnp-teal/40 text-dnp-cyan border border-white/10 shrink-0 mt-0.5">
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[11px] font-semibold text-slate-300 uppercase tracking-wider">
                      {item.title}
                    </span>
                  </div>
                  <p className="text-sm sm:text-base font-bold text-white leading-snug">
                    {item.value}
                  </p>
                  <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                    {item.detail}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
