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
        
        {/* ── NOTE: Review / Testimonial section is currently hidden.
            Reserved slot for future Success Story carousel / showcase. ── */}
        {/*
        <div className="mb-12">
          Success Story / Testimonial Slot
        </div>
        */}

        {/* ── Consultation CTA Card (Full Width with ondos.svg visual) ── */}
        <div className="relative bg-gradient-to-br from-[#01224D] via-[#022D65] to-[#043E7E] text-white rounded-3xl p-7 sm:p-10 lg:p-12 shadow-2xl overflow-hidden flex flex-col justify-between min-h-[380px] border border-white/10">

          {/* Background Illustration: ondos.svg */}
          <div className="absolute right-0 top-0 bottom-0 w-full lg:w-3/5 pointer-events-none opacity-25 lg:opacity-90 z-0">
            <Image
              src="/images/ondos.svg"
              alt="Delta Nusantara Persada Riksa Uji K3"
              fill
              priority
              unoptimized
              className="object-cover lg:object-contain object-right"
            />
          </div>

          {/* Text & Content (Left side of card with ample room) */}
          <div className="relative z-10 max-w-lg lg:max-w-xl space-y-4 my-auto">
            <h3 className="text-2xl sm:text-3xl lg:text-[34px] xl:text-[36px] font-extrabold text-white tracking-tight leading-snug drop-shadow-sm">
              {tc.ctaTitle[lang]}
            </h3>

            <p className="text-slate-200 text-xs sm:text-sm sm:leading-relaxed max-w-md">
              {tc.ctaSubtitle[lang]}
            </p>

            {/* CTA Buttons Row */}
            <div className="pt-4 sm:pt-6">
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

