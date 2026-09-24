'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import { FileSearch, Activity, Gauge, FileCheck2, CheckCircle2 } from 'lucide-react'

interface InspectionStep {
  id: string
  number: string
  title: string
  subtitle: string
  instrument: string
  regulation: string
  output: string
  description: string
  icon: React.ComponentType<{ className?: string }>
}

const STEPS: InspectionStep[] = [
  {
    id: 'step-doc',
    number: '01',
    title: 'Verifikasi Dokumen & Manual Teknis',
    subtitle: 'Kajian Legalitas & Spesifikasi Pabrikan',
    instrument: 'Manufacturer Drawing, Logbook Perawatan, Sertifikat Terdahulu',
    regulation: 'Permenaker No. 8/2020 & UU No. 1/1970',
    output: 'Daftar Parameter Uji & Rencana Kerja Riksa Uji',
    description: 'Tim Ahli K3 memeriksa riwayat alat, batas beban kerja aman (SWL/MAWP), serta kelayakan dokumen terdahulu sebelum inspeksi fisik dimulai di lapangan.',
    icon: FileSearch,
  },
  {
    id: 'step-ndt',
    number: '02',
    title: 'Pemeriksaan Visual & Uji NDT',
    subtitle: 'Deteksi Keretakan & Korosi Tanpa Merusak',
    instrument: 'Ultrasonic Thickness Gauge, Magnetic Particle, Dye Penetrant',
    regulation: 'ASME Section V / Standar Uji Kemnaker RI',
    output: 'Peta Ketebalan Pelat & Integritas Sambungan Las',
    description: 'Pengukuran ketebalan pelat baja dan deteksi keretakan mikro struktur sambungan las yang tidak terlihat mata, memastikan kekuatan konstruksi tetap dalam batas toleransi aman.',
    icon: Activity,
  },
  {
    id: 'step-load',
    number: '03',
    title: 'Uji Fungsi & Uji Beban (Load Test)',
    subtitle: 'Verifikasi Kinerja Mekanis & Katup Pengaman',
    instrument: 'Test Weight Kalibrasi, Load Cell, Pressure Test Bench, Infrared Thermal',
    regulation: 'Permenaker No. 37/2016 & Permenaker No. 8/2020',
    output: 'Kurva Kinerja Rem, Setting Katup, & Kestabilan Struktur',
    description: 'Pengujian fungsi rem, interlock sensor pengaman, kalibrasi pop-up katup pelepas tekanan, dan uji beban statis-dinamis sesuai beban kerja operasional.',
    icon: Gauge,
  },
  {
    id: 'step-cert',
    number: '04',
    title: 'Penyusunan BAP & Penerbitan Suket',
    subtitle: 'Legitimasi Hukum Kelaikan Operasi',
    instrument: 'Buku Laporan Hasil Pemeriksaan & Sistem Pengesahan Kemnaker',
    regulation: 'Ditjen Binwasnaker & K3 RI',
    output: 'Surat Keterangan (Suket) Laik Operasi Resmi',
    description: 'Penyusunan Berita Acara Pemeriksaan (BAP) bersama manajemen pabrik, dilanjutkan dengan pengesahan resmi Surat Keterangan Laik Operasi dari Pengawas Ketenagakerjaan.',
    icon: FileCheck2,
  },
]

export default function AnnotatedEquipmentInspector() {
  const [activeStep, setActiveStep] = useState<InspectionStep>(STEPS[1])

  return (
    <section className="w-full bg-slate-900 text-white py-16 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-7xl mx-auto">

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-dnp-cyan mb-2 block">
              METODOLOGI LAPANGAN
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
              Bagaimana Tim Ahli K3 Bekerja di Pabrik Anda
            </h2>
            <p className="text-slate-300 text-sm sm:text-base mt-2 max-w-2xl leading-relaxed">
              Transparansi langkah demi langkah dari kedatangan tim di pabrik hingga terbitnya Surat Keterangan Laik Operasi (SKLO) resmi Kemnaker RI.
            </p>
          </div>
          <div className="text-xs text-slate-400 self-start md:self-auto font-medium">
            Pilih tahapan untuk melihat detail kerja teknis
          </div>
        </div>

        {/* 2-Column: Real Photo & Step Navigation + Detail Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">

          {/* Left: Real Inspection Photo with Stepper Tabs (7 cols) */}
          <div className="lg:col-span-7 flex flex-col justify-between bg-slate-950 rounded-2xl border border-slate-800 p-6 shadow-xl">
            {/* Real photo representation of DNP inspectors */}
            <div className="relative aspect-[16/9] min-h-[280px] w-full rounded-xl overflow-hidden border border-slate-800 mb-6 group">
              <Image
                src="/images/hero-dnp.jpg"
                alt="Tim Ahli K3 PT Delta Nusantara Persada melakukan pemeriksaan lapangan"
                fill
                unoptimized
                priority
                className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
              
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs">
                <span className="bg-dnp-navy/90 text-white px-3 py-1.5 rounded-lg border border-white/20 font-semibold backdrop-blur-sm">
                  Personel Resmi PT Delta Nusantara Persada
                </span>
                <span className="bg-emerald-600/90 text-white px-3 py-1.5 rounded-lg font-bold backdrop-blur-sm">
                  Ahli K3 Spesialis Terdaftar
                </span>
              </div>
            </div>

            {/* Stepper Buttons */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {STEPS.map((s) => {
                const isSelected = activeStep.id === s.id
                return (
                  <button
                    key={s.id}
                    onClick={() => setActiveStep(s)}
                    className={`p-3 rounded-xl text-left border transition-all ${
                      isSelected
                        ? 'bg-dnp-teal text-white border-dnp-cyan shadow-md'
                        : 'bg-slate-900 text-slate-300 border-slate-800 hover:bg-slate-800 hover:text-white'
                    }`}
                  >
                    <span className="text-[10px] font-mono font-bold block opacity-70">
                      TAHAP {s.number}
                    </span>
                    <span className="text-xs font-bold line-clamp-1 mt-0.5">
                      {s.title.split('&')[0]}
                    </span>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Right: Active Step Detail Card (5 cols) */}
          <div className="lg:col-span-5 bg-slate-800/80 rounded-2xl border border-slate-700/80 p-6 flex flex-col justify-between shadow-xl">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-slate-700">
                <span className="text-xs font-mono font-bold text-dnp-cyan uppercase">
                  TAHAPAN {activeStep.number} DARI 04
                </span>
                <span className="text-xs px-2.5 py-1 rounded-full bg-slate-900 text-slate-200 border border-slate-700">
                  Prosedur Baku
                </span>
              </div>

              <div className="mt-4 mb-5">
                <h3 className="text-xl font-bold text-white">
                  {activeStep.title}
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  {activeStep.subtitle}
                </p>
              </div>

              <div className="space-y-4 bg-slate-900/90 p-4 rounded-xl border border-slate-800 mb-6 text-xs">
                <div>
                  <span className="text-[11px] font-bold text-slate-400 block uppercase">
                    Instrumen / Dokumen Teknis:
                  </span>
                  <p className="text-slate-200 font-medium mt-0.5">
                    {activeStep.instrument}
                  </p>
                </div>

                <div>
                  <span className="text-[11px] font-bold text-slate-400 block uppercase">
                    Dasar Regulasi Terkait:
                  </span>
                  <p className="text-dnp-cyan font-medium mt-0.5">
                    {activeStep.regulation}
                  </p>
                </div>

                <div>
                  <span className="text-[11px] font-bold text-slate-400 block uppercase">
                    Hasil / Output:
                  </span>
                  <p className="text-emerald-300 font-semibold mt-0.5">
                    {activeStep.output}
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-800">
                  <p className="text-slate-300 leading-relaxed">
                    {activeStep.description}
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-700 flex items-center justify-between text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Didampingi Ahli K3 Ber-SKP</span>
              </div>
              <span className="text-slate-400">Kemnaker RI</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  )
}
