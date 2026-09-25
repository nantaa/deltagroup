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
    <section className="py-16 sm:py-20 bg-slate-50 border-t border-slate-100 relative overflow-hidden">
      <div className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">

          {/* ── Left Column: TESTIMONIAL (33% width / 4 cols) ── */}
          <div className="lg:col-span-4 relative rounded-3xl overflow-hidden shadow-2xl p-6 sm:p-7 flex flex-col justify-between min-h-[440px]">
            {/* Refinery Reflection Background */}
            <div className="absolute inset-0 z-0">
              <Image
                src="/images/extracted/update-testimonial-0.png"
                alt="Industrial refinery backdrop"
                fill
                priority
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#021B38] via-[#022859]/85 to-[#04336B]/80 mix-blend-multiply" />
              <div className="absolute inset-0 bg-[#021D3D]/50" />
            </div>

            {/* Section Header */}
            <div className="relative z-10 mb-5">
              <p className="text-[#00D2FF] text-xs font-bold uppercase tracking-widest mb-1">
                {tc.testimonialEyebrow[lang]}
              </p>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                {tc.testimonialTitle[lang]}
              </h3>
            </div>

            {/* Floating White Testimonial Card */}
            <div className="relative z-10 bg-white rounded-2xl p-5 sm:p-6 shadow-2xl border border-white/80">
              {/* Cyan Quote Icon */}
              <div className="w-10 h-10 rounded-xl bg-[#0497DF] text-white flex items-center justify-center mb-3 shadow-md shadow-[#0497DF]/25">
                <Quote className="w-5 h-5 fill-current" />
              </div>

              {/* Quote Text */}
              <p className="text-slate-700 text-xs sm:text-sm leading-relaxed min-h-[58px]">
                &ldquo;{testimonial.quote[lang]}&rdquo;
              </p>

              {/* 5 Yellow Stars */}
              <div className="flex gap-1 my-3">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>

              {/* Client Info & Next Chevron */}
              <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                <div className="flex items-start gap-2.5">
                  <div className="w-1 h-8 bg-amber-400 rounded-full mt-0.5 shrink-0" />
                  <div>
                    <h4 className="font-extrabold text-[#032853] text-sm sm:text-base leading-tight">
                      {testimonial.client}
                    </h4>
                    <p className="text-[11px] text-slate-400 font-medium mt-0.5">
                      {testimonial.division}
                    </p>
                  </div>
                </div>

                <button
                  onClick={handleNext}
                  aria-label="Next testimonial"
                  className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#0497DF] hover:bg-[#0383C2] text-white flex items-center justify-center transition-all hover:scale-105 active:scale-95 shadow-md shadow-[#0497DF]/30 shrink-0 ml-2"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>

          </div>

          {/* ── Right Column: Consultation CTA Card (67% width / 8 cols — WIDE) ── */}
          <div className="lg:col-span-8 relative bg-gradient-to-br from-[#01224D] via-[#022D65] to-[#043E7E] text-white rounded-3xl p-7 sm:p-10 lg:p-12 shadow-2xl overflow-hidden flex flex-col justify-between min-h-[440px] border border-white/10">

            {/* Background Layer 1: Refinery Plant */}
            <div className="absolute inset-0 pointer-events-none opacity-25 mix-blend-screen z-0">
              <Image
                src="/images/extracted/update-cta-ondo-0.png"
                alt=""
                aria-hidden="true"
                fill
                className="object-cover object-left"
              />
            </div>

            {/* Background Layer 2: Glowing Neon Arc / Curves */}
            <div className="absolute inset-0 pointer-events-none opacity-35 z-0">
              <Image
                src="/images/extracted/update-cta-ondo-1.png"
                alt=""
                aria-hidden="true"
                fill
                className="object-cover object-right"
              />
            </div>

            {/* Background Layer 3: Indonesian Safety Inspector Anchored on Right */}
            <div className="absolute right-0 bottom-0 w-64 sm:w-80 md:w-96 lg:w-[440px] xl:w-[470px] h-[92%] z-10 pointer-events-none">
              <Image
                src="/images/extracted/update-cta-ondo-2.png"
                alt="Inspektur Ahli K3 Delta Nusantara Persada"
                fill
                priority
                className="object-contain object-bottom"
              />
            </div>

            {/* Text & Content (Left side of card with ample room) */}
            <div className="relative z-20 max-w-sm sm:max-w-md lg:max-w-lg space-y-4">
              <h3 className="text-2xl sm:text-3xl lg:text-[34px] xl:text-[36px] font-extrabold text-white tracking-tight leading-snug drop-shadow-sm">
                {tc.ctaTitle[lang]}
              </h3>

              <p className="text-slate-200 text-xs sm:text-sm sm:leading-relaxed max-w-sm sm:max-w-md">
                {tc.ctaSubtitle[lang]}
              </p>
            </div>

            {/* CTA Buttons Row */}
            <div className="relative z-20 flex flex-wrap items-center gap-3.5 pt-6 sm:pt-8">
              <a
                href="https://wa.me/riksauji.dnp"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-7 py-3.5 rounded-[10px] text-xs sm:text-sm font-bold bg-gradient-to-r from-[#04C5F4] to-[#0D5EC4] hover:brightness-105 text-white transition-all duration-200 shadow-lg shadow-[#008CE4]/30 hover:scale-[1.02] active:scale-[0.98]"
              >
                <span>{tc.ctaFree[lang]}</span>
                <span className="w-6 h-6 rounded-md bg-white text-[#022047] flex items-center justify-center font-bold">
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </a>
            </div>

          </div>

        </div>
      </div>
    </section>
  )
}
