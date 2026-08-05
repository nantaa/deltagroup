'use client'
import React, { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import clsx from 'clsx'
import { useLang } from '@/lib/LanguageContext'

const slides = [
  {
    id: 1,
    title: { ID: 'Amankan Tempat Kerja Anda dengan Audit SMK3 Profesional', EN: 'Secure Your Workplace with Professional SMK3 Audit' },
    subtitle: {
      ID: 'Lembaga Audit SMK3 berdasarkan PP No.50 Tahun 2012 · Ditunjuk oleh SK Menteri No.137 Tahun 2018',
      EN: 'SMK3 Audit Agency under PP No.50/2012 · Appointed by Minister Decree No.137/2018'
    },
    bg: '/images/bsi-hero.png',
    stats: [
      { value: '50+', label: { ID: 'Klien Perusahaan', EN: 'Corporate Clients' } },
      { value: '30+', label: { ID: 'Tahun Pengalaman Auditor', EN: 'Years Auditor Experience' } },
    ],
  },
  {
    id: 2,
    title: { ID: 'SERTIFIKASI · AUDIT · PELATIHAN K3', EN: 'CERTIFICATION · AUDIT · K3 TRAINING' },
    subtitle: {
      ID: 'SMK3, ISO 9001/14001/45001, SIMPPRO — Solusi audit independen & kompetitif untuk seluruh Indonesia',
      EN: 'SMK3, ISO 9001/14001/45001, SIMPPRO — Independent & competitive audit solutions across Indonesia'
    },
    bg: '/images/hero-dip.jpg',
    stats: [
      { value: '6+', label: { ID: 'Kantor Perwakilan', EN: 'Representative Offices' } },
      { value: '100%', label: { ID: 'Independen & Objektif', EN: 'Independent & Objective' } },
    ],
  },
]

export default function HeroSlider() {
  const { lang } = useLang()
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const t = setInterval(() => setCurrent((p) => (p + 1) % slides.length), 5000)
    return () => clearInterval(t)
  }, [])

  const prev = () => setCurrent((p) => (p - 1 + slides.length) % slides.length)
  const next = () => setCurrent((p) => (p + 1) % slides.length)

  return (
    <div className="relative w-full h-[480px] overflow-hidden">

      {/* Background layers — one per slide, crossfade via opacity */}
      {slides.map((slide, i) => (
        <div
          key={slide.id}
          className="absolute inset-0 bg-cover bg-center transition-opacity duration-700"
          style={{
            backgroundImage: `url('${slide.bg}')`,
            opacity: i === current ? 1 : 0,
          }}
        />
      ))}

      {/* Dark overlay */}

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-end pb-10">
        <div className="flex-1">
          <h1 className="text-white font-extrabold text-3xl md:text-4xl mb-3 drop-shadow">
            {slides[current].title[lang]}
          </h1>
          <p className="text-white/90 text-lg max-w-xl mb-6">{slides[current].subtitle[lang]}</p>

          {/* Dots */}
          <div className="flex gap-2">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={clsx('slider-dot', i === current && 'active')}
              />
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="hidden md:flex gap-4 ml-8">
          {slides[current].stats.map((s, i) => (
            <div key={i} className="bg-primary-700/80 backdrop-blur text-white rounded-xl px-6 py-5 min-w-[120px] text-center border border-white/20">
              <div className="text-3xl font-extrabold">{s.value}</div>
              <div className="text-xs mt-1 text-white/80 leading-tight">{s.label[lang]}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Arrows */}
      <button
        onClick={prev}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/40 backdrop-blur rounded-full p-2 text-white transition"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={next}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/40 backdrop-blur rounded-full p-2 text-white transition"
      >
        <ChevronRight className="w-6 h-6" />
      </button>
    </div>
  )
}
