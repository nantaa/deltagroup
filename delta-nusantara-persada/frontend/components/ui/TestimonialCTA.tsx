'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Star, Quote, ArrowRight, ChevronRight } from 'lucide-react'
import { useLang, translations } from '@/lib/LanguageContext'

export default function TestimonialCTA() {
  const [current, setCurrent] = useState(0)
  const { lang } = useLang()
  const tc = translations.testimonialCTA

  const handleNext = () => {
    setCurrent((prev) => (prev + 1) % tc.testimonials.length)
  }

  const testimonial = tc.testimonials[current]

  return (
    <section className="py-14 sm:py-16 bg-slate-50 border-t border-slate-100 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-7 items-stretch">

          {/* ── Left Column: CERITA SUKSES / KOMITMEN DIREKTUR (5 cols on lg, 4 cols on xl) ── */}
          <div className="lg:col-span-5 xl:col-span-4 relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl p-5 sm:p-6 flex flex-col justify-between min-h-[350px] sm:min-h-[360px]">
            {/* Refinery Reflection Background */}
            <div className="absolute inset-0 z-0">
              <Image
                src="/images/extracted/update-testimonial-0.webp"
                alt="Industrial refinery backdrop"
                fill
                sizes="(max-width: 1024px) 100vw, 400px"
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#021B38] via-[#022859]/85 to-[#04336B]/80 mix-blend-multiply" />
              <div className="absolute inset-0 bg-[#021D3D]/50" />
            </div>

            {/* Section Header */}
            <div className="relative z-10 mb-3">
              <p className="text-[#00D2FF] text-[11px] sm:text-xs font-bold uppercase tracking-widest mb-1">
                {tc.testimonialEyebrow[lang]}
              </p>
              <h3 className="text-lg sm:text-xl font-extrabold text-white tracking-tight leading-tight">
                {tc.testimonialTitle[lang]}
              </h3>
            </div>

            {/* Floating White Testimonial Card */}
            <div className="relative z-10 bg-white rounded-xl sm:rounded-2xl p-4 sm:p-5 shadow-xl border border-white/80">
              {/* Cyan Quote Icon */}
              <div className="w-8 h-8 rounded-lg bg-[#0497DF] text-white flex items-center justify-center mb-2 shadow-md shadow-[#0497DF]/25">
                <Quote className="w-3.5 h-3.5 fill-current" />
              </div>

              {/* Quote Text */}
              <p className="text-slate-700 text-xs sm:text-[13px] leading-relaxed min-h-[58px]">
                &ldquo;{testimonial.quote[lang]}&rdquo;
              </p>

              {/* Client Info (Direktur PT. DELTA NUSANTARA Persada) */}
              <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                <div className="flex items-start gap-2">
                  <div className="w-1 h-7 bg-amber-400 rounded-full mt-0.5 shrink-0" />
                  <div>
                    <h4 className="font-extrabold text-[#032853] text-xs leading-tight">
                      {testimonial.client}
                    </h4>
                    <p className="text-[11px] text-slate-500 font-semibold mt-0.5">
                      {testimonial.division}
                    </p>
                  </div>
                </div>

                {tc.testimonials.length > 1 && (
                  <button
                    onClick={handleNext}
                    aria-label="Next testimonial"
                    className="w-7 h-7 rounded-full bg-[#0497DF] hover:bg-[#0383C2] text-white flex items-center justify-center transition-all hover:scale-105 active:scale-95 shadow-md shadow-[#0497DF]/30 shrink-0 ml-1.5"
                  >
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>

          </div>

          {/* ── Right Column: Consultation CTA Card (7 cols on lg, 8 cols on xl — Compact & No Overlap) ── */}
          <div className="lg:col-span-7 xl:col-span-8 relative bg-[#01224D] text-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-9 shadow-xl overflow-hidden flex flex-col justify-between min-h-[350px] sm:min-h-[360px] border border-white/10">

            {/* Background Graphic: ondos.svg filling the entire frame */}
            <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
              <Image
                src="/images/ondos.webp"
                alt="Delta Nusantara Persada Riksa Uji K3"
                fill
                sizes="(max-width: 1024px) 100vw, 850px"
                className="object-cover object-right"
              />
            </div>

            {/* Text & Content (Constrained to left side so it NEVER overlays the inspector model) */}
            <div className="relative z-10 max-w-xs sm:max-w-sm lg:max-w-md xl:max-w-lg space-y-3.5 my-auto">
              <h3 className="text-xl sm:text-2xl lg:text-[28px] xl:text-[32px] font-extrabold text-white tracking-tight leading-snug drop-shadow-sm">
                {tc.ctaTitle[lang]}
              </h3>

              <p className="text-slate-200 text-xs sm:text-[13.5px] sm:leading-relaxed max-w-xs sm:max-w-sm lg:max-w-md">
                {tc.ctaSubtitle[lang]}
              </p>

              {/* CTA Buttons Row */}
              <div className="pt-2 sm:pt-4">
                <a
                  href="https://wa.me/riksauji.dnp"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 px-6 py-3 rounded-[10px] text-xs sm:text-sm font-bold bg-gradient-to-r from-[#04C5F4] to-[#0D5EC4] hover:brightness-105 text-white transition-all duration-200 shadow-lg shadow-[#008CE4]/30 hover:scale-[1.02] active:scale-[0.98]"
                >
                  <span>{tc.ctaFree[lang]}</span>
                  <span className="w-5 h-5 rounded-md bg-white text-[#022047] flex items-center justify-center font-bold">
                    <ArrowRight className="w-3 h-3" />
                  </span>
                </a>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  )
}

