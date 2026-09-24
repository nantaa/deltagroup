'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
  MapPin,
  Calendar,
  ArrowRight,
  ChevronLeft,
  ChevronRight
} from 'lucide-react'
import { useLang, translations } from '@/lib/LanguageContext'

const RIKSA_UJI_KEYS = ['angkat', 'eskalator', 'uap'] as const
const RIKSA_UJI_IMAGES = [
  '/images/forklift-inspection.jpg',
  '/images/escalator-inspection.jpg',
  '/images/forklift-inspection.jpg',
]
const RIKSA_UJI_LINKS = [
  '/services#pesawat-angkat-angkut',
  '/services#elevator-eskalator',
  '/services#pubt',
]

export default function WorkProcessTraining() {
  const [activeSlide, setActiveSlide] = useState(0)
  const { lang } = useLang()
  const wp = translations.workProcess

  const riksaItems = RIKSA_UJI_KEYS.map((key, i) => ({
    key,
    image: RIKSA_UJI_IMAGES[i],
    link: RIKSA_UJI_LINKS[i],
    badge: 'RIKSA UJI',
  }))

  return (
    <section id="alur-kerja" className="py-14 sm:py-16 bg-white scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-start">
          
          {/* ── Left Column: ALUR PROSES (5 cols) ── */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <p className="text-[#008CE4] text-xs font-bold uppercase tracking-widest mb-1.5">
                {wp.eyebrow[lang]}
              </p>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#011E42] tracking-tight mb-8">
                {wp.title[lang]}
              </h2>

              {/* Official Looping 5-Step Process Vector Graphic from Figma */}
              <div className="pt-4 w-full max-w-[560px]">
                <Image
                  src="/images/components/workflow.svg"
                  alt="Alur Proses Kerja Kami"
                  width={605}
                  height={331}
                  unoptimized
                  className="w-full h-auto object-contain"
                  priority
                />
              </div>
            </div>
          </div>

          {/* ── Right Column: JASA RIKSA UJI POPULER (7 cols) ── */}
          <div className="lg:col-span-7">
            <div className="mb-6">
              <p className="text-[#008CE4] text-xs font-bold uppercase tracking-widest mb-1.5 flex items-center gap-2">
                <span>{wp.riksaEyebrow[lang]}</span>
                <span className="w-8 h-0.5 bg-[#008CE4]" />
              </p>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#011E42] tracking-tight">
                {wp.riksaTitle[lang]}
              </h2>
            </div>

            {/* 2 Cards Grid matching reference */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {riksaItems.slice(0, 2).map((item) => {
                const itemData = wp.riksaItems[item.key]
                return (
                  <div
                    key={item.key}
                    className="group bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
                  >
                    {/* Card Photo with Badge */}
                    <div className="relative h-48 w-full overflow-hidden bg-slate-100">
                      <Image
                        src={item.image}
                        alt={itemData.title[lang]}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-3 left-3">
                        <span className="px-3 py-1 rounded-md text-[10px] font-bold text-white uppercase bg-[#008CE4] shadow-sm">
                          {item.badge}
                        </span>
                      </div>
                    </div>

                    {/* Card Body */}
                    <div className="p-5 flex-1 flex flex-col justify-between">
                      <div>
                        <h3 className="font-extrabold text-[#011E42] text-base group-hover:text-[#008CE4] transition-colors leading-snug mb-2">
                          {itemData.title[lang]}
                        </h3>

                        <p className="text-xs text-gray-500 leading-relaxed mb-4 line-clamp-3">
                          {itemData.desc[lang]}
                        </p>

                        {/* Location & Schedule Meta */}
                        <div className="flex items-center gap-3 text-[11px] text-gray-500 border-t border-slate-100 pt-3">
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3.5 h-3.5 text-[#008CE4]" />
                            {wp.riksaLocation[lang]}
                          </span>
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3.5 h-3.5 text-[#008CE4]" />
                            {wp.riksaSchedule[lang]}
                          </span>
                        </div>
                      </div>

                      {/* Action Link */}
                      <div className="pt-3 flex items-center justify-end">
                        <Link
                          href={item.link}
                          className="inline-flex items-center gap-1.5 text-xs font-bold text-[#008CE4] hover:text-[#006BB0] transition-colors"
                        >
                          <span>{wp.riksaDetail[lang]}</span>
                          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                        </Link>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Pagination Controls */}
            <div className="flex items-center justify-center gap-3 mt-8">
              <button
                aria-label="Previous slide"
                className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center text-gray-500 hover:text-[#008CE4] hover:border-[#008CE4] transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-1.5">
                <span className="w-6 h-2 rounded-full bg-[#008CE4]" />
                <span className="w-6 h-2 rounded-full bg-[#008CE4]" />
                <span className="w-6 h-2 rounded-full bg-[#008CE4]" />
              </div>

              <button
                aria-label="Next slide"
                className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center text-gray-500 hover:text-[#008CE4] hover:border-[#008CE4] transition-colors"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

          </div>

        </div>
      </div>
    </section>
  )
}
