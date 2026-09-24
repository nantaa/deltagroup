'use client'
import React from 'react'
import Image from 'next/image'
import ScrollReveal from './ScrollReveal'
import { useLang, translations } from '@/lib/LanguageContext'

const PILLAR_KEYS = ['standar', 'ahli', 'solusi', 'kepuasan'] as const
const PILLAR_ICONS = [
  '/images/components/standar-internasional.svg',
  '/images/components/tenaga-ahli.svg',
  '/images/components/solusi-integrasi.svg',
  '/images/components/kepuasaan-klien.svg',
]

export default function WhyChooseUs() {
  const { lang } = useLang()
  const wcu = translations.whyChooseUs

  return (
    <section id="keunggulan" className="w-full py-14 text-white relative overflow-hidden scroll-mt-24">
      {/* Background image */}
      <Image
        src="/images/cardblue.webp"
        alt=""
        fill
        className="object-cover object-center"
        priority
        aria-hidden="true"
      />
      {/* Overlay for readability */}
      <div className="absolute inset-0 bg-[#053161]/30 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <ScrollReveal delay={0}>
          <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
            <p className="text-[#00D2FF] text-xs font-bold uppercase tracking-widest">
              {wcu.eyebrow[lang]}
            </p>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white mt-2 tracking-tight">
              {wcu.title[lang]}
            </h2>
          </div>
        </ScrollReveal>

        {/* 4-Column Grid with Vertical Dividers */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-0 items-center">
          {PILLAR_KEYS.map((key, idx) => {
            const pillar = wcu.pillars[key]
            return (
              <ScrollReveal key={idx} delay={idx * 100} className="h-full">
                <div
                  className={`flex items-center gap-4 px-4 lg:px-6 py-2 h-full ${
                    idx > 0 ? 'lg:border-l lg:border-white/20' : ''
                  }`}
                >
                  {/* Circular Icon Frame */}
                  <div className="w-14 h-14 shrink-0 flex items-center justify-center">
                    <Image
                      src={PILLAR_ICONS[idx]}
                      alt={pillar.title[lang]}
                      width={56}
                      height={56}
                      unoptimized
                      className="w-14 h-14 object-contain"
                    />
                  </div>

                  <div className="min-w-0">
                    <h3 className="text-sm sm:text-base font-bold text-white mb-1 leading-snug">
                      {pillar.title[lang]}
                    </h3>
                    <p className="text-xs text-slate-300 leading-tight">
                      {pillar.desc[lang]}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            )
          })}
        </div>

      </div>
    </section>
  )
}
