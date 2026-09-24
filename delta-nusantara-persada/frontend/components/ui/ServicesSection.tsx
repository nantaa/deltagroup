'use client'
import React, { useState, useCallback, useEffect } from 'react'
import Image from 'next/image'
import { ArrowRight, Check, ChevronLeft, ChevronRight } from 'lucide-react'
import ScrollReveal from './ScrollReveal'
import ServiceDetailModal from './ServiceDetailModal'
import { useLang, translations } from '@/lib/LanguageContext'

const SERVICES = [
  {
    id: 'pesawat-angkat-angkut',
    title: 'Pesawat Angkat & Pesawat Angkut',
    iconPath: '/images/components/papa.svg',
    bullets: [
      'Hoist Crane, Overhead Crane, dll',
      'Chain Conveyor, Belt Conveyor, dll',
      'Pesawat Angkut di atas Landasan & Permukaan',
    ],
  },
  {
    id: 'pubt',
    title: 'Pesawat Uap & Bejana Tekan',
    iconPath: '/images/components/pesawat-uap.svg',
    bullets: [
      'Pesawat Uap',
      'Tangki Timbun',
      'Bejana Tekan',
    ],
  },
  {
    id: 'elevator-eskalator',
    title: 'Elevator & Eskalator',
    iconPath: '/images/components/eskalator-elevator.svg',
    bullets: [
      'Elevator / Lift',
      'Eskalator',
    ],
  },
  {
    id: 'proteksi-kebakaran',
    title: 'Instalasi Proteksi Kebakaran',
    iconPath: '/images/components/proteksi-kebakaran.svg',
    bullets: [
      'Sistem Alarm Kebakaran Otomatis',
      'Instalasi Hydrant & Springkler',
      'Pemeriksaan APAR & Fire Suppression',
    ],
  },
  {
    id: 'listrik-petir',
    title: 'Instalasi Penyalur Petir & Listrik',
    iconPath: '/images/components/penyalur-listrik.svg',
    bullets: [
      'Instalasi Penyalur Petir (Lightning Arrester)',
      'Pengukuran Tahanan Pembumian (Grounding)',
      'Pemeriksaan Instalasi Listrik & Panel Daya',
    ],
  },
  {
    id: 'pesawat-tenaga-produksi',
    title: 'Pesawat Tenaga & Produksi',
    iconPath: '/images/components/pesawat-tenaga-produksi.svg',
    bullets: [
      'Pengujian Genset & Motor Bakar',
      'Mesin Perkakas & Produksi Industri',
      'Transmisi Tenaga Mekanik & Turbin',
    ],
  },
]

const VISIBLE_DESKTOP = 3
const MAX_INDEX = SERVICES.length - VISIBLE_DESKTOP

export default function ServicesSection() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [selectedServiceId, setSelectedServiceId] = useState<string | null>(null)
  const { lang, t } = useLang()

  const serviceItems = translations.home.servicesSection.items as Record<
    string,
    { title: { ID: string; EN: string }; bullets: { ID: string[]; EN: string[] } }
  >

  const goPrev = useCallback(() => {
    setActiveIndex((i) => Math.max(0, i - 1))
  }, [])

  const goNext = useCallback(() => {
    setActiveIndex((i) => Math.min(MAX_INDEX, i + 1))
  }, [])

  return (
    <section id="layanan" className="py-16 bg-[#F6F8F9] relative overflow-hidden scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header */}
        <ScrollReveal delay={0}>
          <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
            <p className="text-[#008CE4] text-xs font-bold uppercase tracking-widest mb-2">
              {t('home', 'servicesSection', 'eyebrow') || 'LAYANAN KAMI'}
            </p>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#011E42] tracking-tight leading-snug">
              {t('home', 'servicesSection', 'title') || 'Solusi Terintegrasi Untuk Kebutuhan Industri Anda'}
            </h2>
          </div>
        </ScrollReveal>

        {/* Carousel Container */}
        <ScrollReveal delay={150}>
          <div className="relative px-2 sm:px-6">
          {/* Left Arrow Button */}
          <button
            onClick={goPrev}
            disabled={activeIndex === 0}
            aria-label={t('home', 'servicesSection', 'prevAria')}
            className={`absolute -left-2 sm:-left-4 lg:-left-5 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white border border-slate-200 shadow-md flex items-center justify-center text-slate-600 transition-all ${
              activeIndex === 0
                ? 'opacity-30 cursor-not-allowed'
                : 'hover:text-[#008CE4] hover:border-[#008CE4] hover:scale-105 active:scale-95'
            }`}
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Cards Track Window - Expanded py-12 to prevent elevated hover clipping */}
          <div className="overflow-hidden py-12 -my-8 px-1">
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{
                transform: `translateX(-${activeIndex * (100 / VISIBLE_DESKTOP)}%)`,
              }}
            >
              {SERVICES.map((s) => {
                const itemData = serviceItems[s.id]
                const cardTitle = itemData?.title[lang] ?? s.title
                const cardBullets = itemData?.bullets[lang] ?? s.bullets

                return (
                  <div
                    key={s.id}
                    className="w-full sm:w-1/2 lg:w-1/3 shrink-0 px-3"
                  >
                    <div className="group relative bg-white rounded-2xl p-6 sm:p-7 border border-slate-100 shadow-sm elevated-hover flex flex-col justify-between h-full min-h-[340px]">
                      {/* Top blue line accent with glowing hover state */}
                      <div className="absolute top-0 left-8 right-8 h-1 bg-[#008CE4] rounded-t-full group-hover:h-1.5 group-hover:left-6 group-hover:right-6 group-hover:bg-[#00D2FF] group-hover:shadow-[0_0_12px_#00D2FF] transition-all duration-300" />

                      {/* Card Content Top */}
                      <div>
                        {/* Icon + Title Header */}
                        <div className="flex items-center gap-4 mb-6">
                          <div className="w-14 h-14 shrink-0 flex items-center justify-center">
                            <Image
                              src={s.iconPath}
                              alt={cardTitle}
                              width={56}
                              height={56}
                              unoptimized
                              className="w-14 h-14 object-contain"
                            />
                          </div>

                          <h3 className="text-base sm:text-lg font-extrabold text-[#011E42] leading-snug">
                            {cardTitle}
                          </h3>
                        </div>

                        {/* Checklist */}
                        <ul className="space-y-3 mb-6">
                          {cardBullets.map((bullet, bIdx) => (
                            <li key={bIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-600">
                              <span className="text-[#008CE4] font-bold mt-0.5">
                                <Check className="w-4 h-4 stroke-[2.5]" />
                              </span>
                              <span className="leading-snug">{bullet}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Card Link Bottom - Opens Detail Popup */}
                      <div className="pt-2">
                        <button
                          type="button"
                          onClick={() => setSelectedServiceId(s.id)}
                          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#008CE4] hover:text-[#0070BA] transition-colors group/link cursor-pointer focus:outline-none"
                        >
                          <span>{t('home', 'servicesSection', 'cta')}</span>
                          <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                        </button>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Right Arrow Button */}
          <button
            onClick={goNext}
            disabled={activeIndex >= MAX_INDEX}
            aria-label="Next service"
            className={`absolute -right-2 sm:-right-4 lg:-right-5 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white border border-slate-200 shadow-md flex items-center justify-center text-slate-600 transition-all ${
              activeIndex >= MAX_INDEX
                ? 'opacity-30 cursor-not-allowed'
                : 'hover:text-[#008CE4] hover:border-[#008CE4] hover:scale-105 active:scale-95'
            }`}
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
        </ScrollReveal>

      </div>

      {/* Service Detail Popup Modal */}
      <ServiceDetailModal
        serviceId={selectedServiceId}
        onClose={() => setSelectedServiceId(null)}
      />
    </section>
  )
}
