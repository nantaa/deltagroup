'use client'
import React, { useState } from 'react'
import { ShieldCheck, Scale, Timer, FileCheck, Users, HelpCircle, ArrowRight } from 'lucide-react'

export default function IndustrialRiskGrid() {
  const [viewMode, setViewMode] = useState<'problem' | 'solution'>('solution')

  const items = [
    {
      num: '01',
      tag: 'KEPATUHAN HUKUM',
      title: 'Kekhawatiran Audit Pengawas Disnaker',
      problem: 'Kepanikan saat pengawas ketenagakerjaan melakukan inspeksi mendadak dan menemukan Surat Keterangan Laik Operasi (SKLO) crane atau boiler telah kedaluwarsa, yang berujung pada ancaman sanksi operasional per UU No. 1 Tahun 1970.',
      solution: 'DNP mendampingi jadwal riksa uji berkala Anda secara terencana. Ahli K3 Spesialis kami menguji dan memproses laporan resmi tepat waktu sehingga dokumen kelaikan alat selalu terverifikasi aman.',
      icon: Scale,
    },
    {
      num: '02',
      tag: 'KONTINUITAS OPERASI',
      title: 'Risiko Mesin Berhenti & Target Molor',
      problem: 'Kerusakan fatal yang tidak terlihat kasat mata pada kabel baja hoist, drum boiler, atau instalasi motor listrik yang dapat memaksa lini produksi berhenti total hingga berminggu-minggu.',
      solution: 'Pemeriksaan uji tanpa merusak (Non-Destructive Testing / NDT) mendeteksi keausan dan retak mikro lebih dini, mencegah downtime tak terduga dan melindungi efisiensi operasional pabrik.',
      icon: Timer,
    },
    {
      num: '03',
      tag: 'KUALIFIKASI TENDER',
      title: 'Tuntutan Syarat Vendor Korporat & BUMN',
      problem: 'Klien korporasi multinasional dan BUMN mensyaratkan seluruh alat berat dan fasilitas pabrik lolos audit SMK3 dan memiliki sertifikasi kelaikan yang sah sebagai syarat mutlak rekanan.',
      solution: 'Dokumentasi Berita Acara Pemeriksaan (BAP) dan Suket resmi Kemnaker dari DNP diakui secara nasional untuk melengkapi kualifikasi tender dan kepatuhan audit ISO 45001.',
      icon: FileCheck,
    },
    {
      num: '04',
      tag: 'KESELAMATAN PEKERJA',
      title: 'Tanggung Jawab Moral Nyawa Karyawan',
      problem: 'Kekhawatiran terdalam setiap pimpinan perusahaan: kegagalan mekanis alat berat atau ledakan bejana tekan yang mencelakai teknisi dan operator di area kerja.',
      solution: 'Pengujian beban statis-dinamis, kalibrasi katup pengaman, dan pemeriksaan sistem proteksi kebakaran kami memastikan setiap karyawan pulang dengan selamat setiap hari (Zero Accident).',
      icon: Users,
    },
  ]

  return (
    <section className="w-full bg-white py-16 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-7xl mx-auto">
        
        {/* Header with human-centered perspective */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-dnp-teal mb-2 block">
              TANGGUNG JAWAB & INTEGRITAS K3
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-dnp-navy tracking-tight">
              Ketenangan Pikiran untuk Pimpinan Pabrik & Tim HSE
            </h2>
            <p className="text-gray-600 text-sm sm:text-base mt-2 max-w-2xl leading-relaxed">
              Bukan sekadar formalitas stempel izin, melainkan komitmen nyata menjaga kelancaran usaha, kepatuhan regulasi, dan keselamatan setiap pekerja.
            </p>
          </div>

          {/* Toggle pill */}
          <div className="inline-flex p-1 bg-gray-100 rounded-xl border border-gray-200 self-start md:self-auto">
            <button
              onClick={() => setViewMode('solution')}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                viewMode === 'solution'
                  ? 'bg-dnp-navy text-white shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Solusi & Pendampingan DNP
            </button>
            <button
              onClick={() => setViewMode('problem')}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                viewMode === 'problem'
                  ? 'bg-amber-600 text-white shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Tantangan yang Dihadapi
            </button>
          </div>
        </div>

        {/* 4 Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((item, idx) => {
            const Icon = item.icon
            return (
              <div
                key={idx}
                className={`rounded-2xl p-6 border transition-all duration-300 flex flex-col justify-between ${
                  viewMode === 'solution'
                    ? 'bg-slate-50/70 border-gray-200 hover:border-dnp-teal hover:bg-white hover:shadow-lg'
                    : 'bg-amber-50/40 border-amber-200 hover:border-amber-400 hover:bg-white hover:shadow-lg'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-mono font-bold text-gray-400">
                      POINT {item.num}
                    </span>
                    <span
                      className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${
                        viewMode === 'solution'
                          ? 'bg-cyan-50 text-dnp-teal border border-cyan-100'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {item.tag}
                    </span>
                  </div>

                  <div className="flex items-start gap-3 mb-3">
                    <div
                      className={`p-2.5 rounded-xl shrink-0 ${
                        viewMode === 'solution'
                          ? 'bg-dnp-navy text-white'
                          : 'bg-amber-600 text-white'
                      }`}
                    >
                      {viewMode === 'solution' ? <ShieldCheck className="w-5 h-5 text-dnp-cyan" /> : <Icon className="w-5 h-5" />}
                    </div>
                    <h3 className="font-bold text-base text-dnp-navy leading-snug">
                      {item.title}
                    </h3>
                  </div>

                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed min-h-[90px]">
                    {viewMode === 'solution' ? item.solution : item.problem}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-gray-200/80 flex items-center justify-between text-xs font-semibold text-dnp-teal">
                  <span>{viewMode === 'solution' ? 'Standar Kelaikan Terpenuhi' : 'Risiko Operasional'}</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            )
          })}
        </div>

      </div>
    </section>
  )
}
