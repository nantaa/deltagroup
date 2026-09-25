'use client'
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import HeroPortal from './HeroPortal'
import StatsBar from './StatsBar'
import { useLang, translations } from '@/lib/LanguageContext'

export default function HeroSection() {
  const { lang } = useLang()
  const h = translations.hero

  return (
    <section className="relative bg-[#011E42] text-white pt-2 sm:pt-4 md:pt-6 pb-0">
      {/* Hero Background using herosectionn.webp with bottom wave anchor */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <Image
          src="/images/herosectionn.webp"
          alt="Delta Nusantara Persada Hero Background"
          fill
          priority
          className="object-cover object-bottom"
        />
      </div>

      {/* Hero Content Container */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-4 pb-14 sm:pb-20 lg:pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center min-h-[460px] lg:min-h-[600px]">

          {/* ── Left: Typography & CTAs (col-span-7) ── */}
          <div className="lg:col-span-7 space-y-4 text-left flex flex-col justify-center">
            {/* Eyebrow */}
            <div className="text-xs sm:text-sm font-bold tracking-widest text-[#00D2FF] uppercase">
              {h.eyebrow[lang]}
            </div>

            {/* Headline */}
            <h1
              className="text-3xl sm:text-4xl lg:text-[46px] xl:text-[52px] font-extrabold tracking-tight leading-[1.2] text-white"
              style={{ lineHeight: 1.1 }}
            >
              {h.headline1[lang]}{' '}
              <span className="text-[#00D2FF]">{h.headlineHighlight[lang]}</span>{' '}
              {h.headline2[lang]}
            </h1>

            {/* Subtitle */}
            <p className="text-slate-200 text-sm sm:text-base leading-relaxed max-w-xl">
              {h.subtitle[lang]}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                href="/services"
                className="inline-flex items-center justify-center px-7 py-3.5 rounded-[10px] text-xs sm:text-sm font-bold bg-gradient-to-r from-[#04C5F4] to-[#0D5EC4] hover:brightness-105 text-white transition-all duration-200 shadow-lg shadow-[#008CE4]/30 hover:scale-[1.02] active:scale-[0.98]"
              >
                {h.ctaServices[lang]}
              </Link>
            </div>
          </div>

          {/* ── Right: Character Portal (col-span-5) ── */}
          <div className="lg:col-span-5 relative flex justify-center lg:justify-end items-center">
            <HeroPortal />
          </div>

        </div>
      </div>

      {/* ─── StatsBar Card Inside Hero Section (Elevated via Transform) ─── */}
      <div className="relative z-30 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -translate-y-16 sm:-translate-y-22 lg:-translate-y-28">
        <div className="bg-white rounded-2xl shadow-2xl shadow-black/20 border border-slate-100 p-2 sm:p-4">
          <StatsBar />
        </div>
      </div>
    </section>
  )
}
