'use client'
import React, { useState } from 'react'
import { ShieldAlert, ShieldCheck } from 'lucide-react'

export default function InspectionRevealSlider() {
  const [sliderPos, setSliderPos] = useState<number>(50)

  return (
    <section className="w-full bg-slate-50 py-16 px-4 sm:px-6 lg:px-8 font-sans border-t border-gray-200">
      <div className="max-w-7xl mx-auto">

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-dnp-teal mb-2 block">
              STUDI PERBANDINGAN STANDAR
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-dnp-navy tracking-tight">
              Temuan Kerusakan vs. Hasil Sertifikasi Kelaikan
            </h2>
            <p className="text-gray-600 text-sm sm:text-base mt-2 max-w-2xl leading-relaxed">
              Geser tuas pembanding untuk melihat kontras antara kondisi alat yang tidak terawat dengan standar kelaikan operasional resmi Kemnaker RI.
            </p>
          </div>
          <div className="text-xs font-semibold text-gray-500 self-start md:self-auto flex items-center gap-2">
            <span>Posisi Geser:</span>
            <span className="font-bold text-dnp-navy">{sliderPos}%</span>
          </div>
        </div>

        {/* Comparison Frame Container */}
        <div className="relative w-full rounded-2xl border border-gray-300 overflow-hidden bg-white shadow-lg">
          
          {/* Slider Controls Bar */}
          <div className="bg-slate-100/80 p-4 border-b border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-gray-700 uppercase tracking-wider">Mode Tampilan:</span>
              <div className="inline-flex rounded-lg border border-gray-300 p-0.5 bg-white">
                <button
                  type="button"
                  onClick={() => setSliderPos(15)}
                  className={`px-3 py-1 rounded-md text-xs font-bold transition-colors ${
                    sliderPos <= 30 ? 'bg-amber-100 text-amber-900 shadow-sm' : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Fokus Risiko
                </button>
                <button
                  type="button"
                  onClick={() => setSliderPos(50)}
                  className={`px-3 py-1 rounded-md text-xs font-bold transition-colors ${
                    sliderPos > 30 && sliderPos < 70 ? 'bg-dnp-navy text-white shadow-sm' : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Berdampingan (50:50)
                </button>
                <button
                  type="button"
                  onClick={() => setSliderPos(85)}
                  className={`px-3 py-1 rounded-md text-xs font-bold transition-colors ${
                    sliderPos >= 70 ? 'bg-emerald-100 text-emerald-900 shadow-sm' : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Fokus Sertifikasi
                </button>
              </div>
            </div>

            {/* Slider track control */}
            <div className="flex items-center gap-3 w-full sm:w-72">
              <span className="text-xs font-semibold text-amber-700">Risiko</span>
              <div className="relative flex-1 flex items-center">
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={sliderPos}
                  onChange={(e) => setSliderPos(Number(e.target.value))}
                  role="slider"
                  aria-valuenow={sliderPos}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-label="Geser untuk membandingkan kondisi rawan bahaya dengan hasil sertifikasi kelaikan DNP"
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-dnp-navy"
                />
              </div>
              <span className="text-xs font-semibold text-emerald-700">Sertifikasi</span>
            </div>
          </div>

          {/* Comparative Cards Container */}
          <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-gray-200 min-h-[380px]">
            
            {/* Left Card: DEFECT & RISK */}
            <div
              className={`p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 ${
                sliderPos <= 50 ? 'bg-amber-50/70' : 'bg-gray-50/40 opacity-75'
              }`}
            >
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-100 text-amber-900 text-xs font-bold uppercase tracking-wider mb-4 border border-amber-200">
                  <ShieldAlert className="w-4 h-4 text-amber-700" />
                  <span>Kondisi Awal / Rawan Bahaya</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-extrabold text-gray-900">
                  Peralatan Beroperasi Tanpa Uji Berkala
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 mt-2">
                  Dampak nyata yang sering kami temukan di lapangan sebelum pengujian formal dilakukan:
                </p>
                <ul className="mt-4 space-y-2.5 text-xs sm:text-sm text-gray-700">
                  <li className="flex items-start gap-2.5">
                    <span className="text-amber-700 font-bold">✕</span>
                    <span>Retak rambut pada sambungan las gantry crane tidak terdeteksi visual.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-amber-700 font-bold">✕</span>
                    <span>Katup pengaman boiler tersumbat kerak, berisiko over-pressure fatal.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-amber-700 font-bold">✕</span>
                    <span>Kabel penangkal petir korosi, nilai tahanan tanah melebihi batas PUIL.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-amber-700 font-bold">✕</span>
                    <span>Tidak memiliki bukti sah Suket Laik Operasi saat diaudit pengawas Disnaker.</span>
                  </li>
                </ul>
              </div>
              <div className="pt-6 mt-6 border-t border-amber-200/80 flex items-center justify-between text-xs font-bold text-amber-800">
                <span>STATUS: Risiko Operasional & Audit</span>
                <span className="px-2 py-0.5 rounded bg-amber-200/70 text-amber-900 text-[11px]">RAWAN</span>
              </div>
            </div>

            {/* Right Card: CERTIFIED & COMPLIANT */}
            <div
              className={`p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 ${
                sliderPos >= 50 ? 'bg-cyan-50/50' : 'bg-gray-50/40 opacity-75'
              }`}
            >
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-100 text-emerald-900 text-xs font-bold uppercase tracking-wider mb-4 border border-emerald-200">
                  <ShieldCheck className="w-4 h-4 text-emerald-700" />
                  <span>Standar Laik Operasi PT DNP</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-extrabold text-dnp-navy">
                  Hasil Uji Komprehensif Ahli K3 Spesialis
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 mt-2">
                  Hasil pengujian terukur sesuai standar teknis dan regulasi Permenaker RI:
                </p>
                <ul className="mt-4 space-y-2.5 text-xs sm:text-sm text-gray-800">
                  <li className="flex items-start gap-2.5">
                    <span className="text-emerald-600 font-bold">✓</span>
                    <span>Uji NDT Ultrasonic memastikan integritas struktur logam aman dan solid.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-emerald-600 font-bold">✓</span>
                    <span>Kalibrasi katup pengaman akurat pada batas tekanan kerja rancang (MAWP).</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-emerald-600 font-bold">✓</span>
                    <span>Tahanan grounding terverifikasi &lt; 5 Ohm sesuai aturan keselamatan petir.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-emerald-600 font-bold">✓</span>
                    <span>Penerbitan Surat Keterangan Laik Operasi (SKLO) resmi Ditjen Binwasnaker.</span>
                  </li>
                </ul>
              </div>
              <div className="pt-6 mt-6 border-t border-cyan-200/80 flex items-center justify-between text-xs font-bold text-dnp-navy">
                <span>STATUS: Laik Operasi & Kepatuhan Legal</span>
                <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[11px]">TERVERIFIKASI</span>
              </div>
            </div>

          </div>

        </div>

        {/* Caption below slider */}
        <div className="mt-4 flex flex-wrap items-center justify-between text-xs text-gray-500 font-medium">
          <span>← Fokus Kiri: Telusuri titik kritis kegagalan alat</span>
          <span>Fokus Kanan: Hasil jaminan kelaikan teknis PT DNP →</span>
        </div>

      </div>
    </section>
  )
}
