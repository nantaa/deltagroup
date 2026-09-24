'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useLang, translations } from '@/lib/LanguageContext'

// Client logo list containing all 24 industry clients
const CLIENTS = [
  { id: 1, name: 'PT Berca Schindler Lifts', logo: '/images/logo-client/client-1.png' },
  { id: 2, name: 'PT Hasta Karya Perdana', logo: '/images/logo-client/client-2.jpg' },
  { id: 3, name: 'PT Kadi International', logo: '/images/logo-client/client-3.png' },
  { id: 4, name: 'PT Mitra Global Kencana', logo: '/images/logo-client/client-4.png' },
  { id: 5, name: 'PT Nittoc Construction Indonesia', logo: '/images/logo-client/client-5.png' },
  { id: 6, name: 'PT Bank Sahabat Sampoerna', logo: '/images/logo-client/client-6.png' },
  { id: 7, name: 'PT Indofood CBP Sukses Makmur Tbk', logo: '/images/logo-client/client-7.png' },
  { id: 8, name: 'PT K-Line Mobaru Indonesia (KMDI)', logo: '/images/logo-client/client-8.webp' },
  { id: 9, name: 'PT Mandiri Trans Utama', logo: '/images/logo-client/client-9.png' },
  { id: 10, name: 'PT Bertha Karya Teknik', logo: '/images/logo-client/client-10.jpg' },
  { id: 11, name: 'PT Ekanuri', logo: '/images/logo-client/client-11.jpg' },
  { id: 12, name: 'PT Jababeka Infrastruktur', logo: '/images/logo-client/client-12.png' },
  { id: 13, name: 'PT Elnusa', logo: '/images/logo-client/client-13.png' },
  { id: 14, name: 'Kempinski Hotel Indonesia', logo: '/images/logo-client/client-14.png' },
  { id: 15, name: 'PT HD Forklift', logo: '/images/logo-client/client-15.png' },
  { id: 16, name: 'PT Surgika Alkesindo', logo: '/images/logo-client/client-16.webp' },
  { id: 17, name: 'PT Asahi Forge Indonesia', logo: '/images/logo-client/client-17.jpg' },
  { id: 18, name: 'PT Toyota Tsusho Mechanical & Engineering Service Indonesia', logo: '/images/logo-client/client-18.jpg' },
  { id: 19, name: 'PT Antam Tbk', logo: '/images/logo-client/client-19.jpg' },
  { id: 20, name: 'PT Air Drilling Indonesia', logo: '/images/logo-client/client-20.png' },
  { id: 21, name: 'PT Gapura Angkasa', logo: '/images/logo-client/client-21.webp' },
  { id: 22, name: 'PT Arthamigas', logo: '/images/logo-client/client-22.jpg' },
  { id: 23, name: 'RSIA Grand Family', logo: '/images/logo-client/client-23.png' },
  { id: 24, name: 'RS Eka Hospital Bekasi & Cibubur', logo: '/images/logo-client/client-24.png' },
];

const INDUSTRIES = [
  { name: 'Oil & Gas', iconPath: '/images/components/icon-oil-gas.svg' },
  { name: 'Manufacturing', iconPath: '/images/components/icon-manufacturing.svg' },
  { name: 'Construction', iconPath: '/images/components/icon-construction.svg' },
  { name: 'Mining', iconPath: '/images/components/icon-mining.svg' },
  { name: 'Energy', iconPath: '/images/components/icon-energy.svg' },
]

const LOGOS_PER_VIEW = 5

export default function HomeClient() {
  const [startIndex, setStartIndex] = useState(0)
  const { lang } = useLang()
  const hc = translations.homeClient

  const totalPages = Math.ceil(CLIENTS.length / LOGOS_PER_VIEW)
  const currentPage = Math.floor(startIndex / LOGOS_PER_VIEW)

  // Navigate cleanly between pages of 5 clients
  const handlePrev = () => {
    setStartIndex((prev) => {
      const page = Math.floor(prev / LOGOS_PER_VIEW)
      const prevPage = (page - 1 + totalPages) % totalPages
      return prevPage * LOGOS_PER_VIEW
    })
  }

  const handleNext = () => {
    setStartIndex((prev) => {
      const page = Math.floor(prev / LOGOS_PER_VIEW)
      const nextPage = (page + 1) % totalPages
      return nextPage * LOGOS_PER_VIEW
    })
  }

  const visibleLogos = Array.from({ length: LOGOS_PER_VIEW }).map(
    (_, i) => CLIENTS[(startIndex + i) % CLIENTS.length]
  )

  return (
    <section className="pt-20 sm:pt-24 pb-12 bg-[#F6F8F9] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">

          {/* Left: Trusted Title & Industry Tags */}
          <div className="lg:col-span-5 space-y-2">
            <p className="text-[#008CE4] text-xs font-bold uppercase tracking-wider">
              {hc.eyebrow[lang]}
            </p>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#011E42] tracking-tight leading-tight">
              {hc.title[lang]}
            </h2>
            <p className="text-gray-500 font-medium text-sm sm:text-base">
              {hc.subtitle[lang]}
            </p>

            {/* 5 Industry Category Tags */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 pt-3">
              {INDUSTRIES.map((ind, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-1.5 text-[11px] sm:text-xs font-semibold text-slate-700 hover:text-[#008CE4] transition-colors cursor-default"
                >
                  <div className="w-4 h-4 relative shrink-0">
                    <Image
                      src={ind.iconPath}
                      alt={ind.name}
                      width={16}
                      height={16}
                      unoptimized
                      className="w-4 h-4 object-contain"
                    />
                  </div>
                  <span>{ind.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Carousel with Left & Right Arrows + Status Counter */}
          <div className="lg:col-span-7 flex flex-col gap-2">
            <div className="flex items-center gap-3">
              <button
                onClick={handlePrev}
                aria-label="Previous client logos"
                className="w-9 h-9 rounded-full bg-white border border-gray-200 shadow-sm flex items-center justify-center text-gray-500 hover:text-[#011E42] hover:border-[#008CE4] transition-colors shrink-0"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              {/* Logo Grid Row */}
              <div className="flex-1 grid grid-cols-2 sm:grid-cols-5 gap-3 items-center">
                {visibleLogos.map((client, idx) => (
                  <div
                    key={`${client.id}-${idx}`}
                    title={client.name}
                    className="h-16 bg-white rounded-xl p-2 flex items-center justify-center border border-gray-100 hover:border-[#008CE4]/40 hover:shadow-md transition-all duration-300 group cursor-pointer"
                  >
                    <div className="w-full h-10 relative flex items-center justify-center">
                      <Image
                        src={client.logo}
                        alt={client.name}
                        fill
                        className="object-contain filter grayscale group-hover:grayscale-0 opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-300"
                      />
                    </div>
                  </div>
                ))}
              </div>

              <button
                onClick={handleNext}
                aria-label="Next client logos"
                className="w-9 h-9 rounded-full bg-white border border-gray-200 shadow-sm flex items-center justify-center text-gray-500 hover:text-[#011E42] hover:border-[#008CE4] transition-colors shrink-0"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Carousel Pagination Dots */}
            <div className="flex items-center justify-center gap-2 pt-3" role="tablist" aria-label="Navigasi slide klien">
              {Array.from({ length: totalPages }).map((_, pIdx) => {
                const isActive = pIdx === currentPage
                return (
                  <button
                    key={pIdx}
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => setStartIndex(pIdx * LOGOS_PER_VIEW)}
                    aria-label={`Slide ${pIdx + 1} dari ${totalPages}`}
                    className={`h-2 rounded-full transition-all duration-300 ${isActive
                        ? 'w-8 bg-[#008CE4] shadow-sm shadow-[#008CE4]/30'
                        : 'w-2.5 bg-slate-300 hover:bg-slate-400'
                      }`}
                  />
                )
              })}
            </div>

          </div>

        </div>

      </div>
    </section>
  )
}
