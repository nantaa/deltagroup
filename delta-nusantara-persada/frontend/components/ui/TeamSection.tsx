'use client'
import React from 'react'
import Image from 'next/image'
import ScrollReveal from './ScrollReveal'
import { useLang, translations } from '@/lib/LanguageContext'

const LEADERS = [
  {
    id: 1,
    name: 'Pranan Jaya Barus, ST',
    memberKey: 'pranan' as const,
    photo: '/images/extracted/pak-pranan.png',
    photoScale: 'scale-[1.65] origin-[center_16%]',
    bgCard: '/images/components/pak-pranan.svg',
  },
  {
    id: 2,
    name: 'Terzha R. Perdanawan S.M.',
    memberKey: 'terzha' as const,
    photo: '/images/extracted/mas-terzha.jpg',
    photoScale: 'scale-[1.55] origin-[center_18%]',
    bgCard: '/images/components/mas-terzha.svg',
  },
  {
    id: 3,
    name: 'Ricky Rumindo, S.T., M.M.',
    memberKey: 'ricky' as const,
    photo: '/images/extracted/pak-ricky.png',
    photoScale: 'scale-[1.35] origin-[center_16%]',
    bgCard: '/images/components/pak-ricky.svg',
  },
]

export default function TeamSection() {
  const { lang } = useLang()
  const ts = translations.teamSection

  return (
    <section id="tim-ahli" className="py-14 sm:py-16 bg-white relative overflow-hidden scroll-mt-24">
      {/* Subtle background ambient glow */}
      <div className="absolute inset-0 pointer-events-none opacity-40 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-100/50 via-transparent to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header matching exact reference */}
        <ScrollReveal delay={0}>
          <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
            <p className="text-[#008CE4] text-xs font-bold uppercase tracking-widest mb-1.5">
              {ts.eyebrow[lang]}
            </p>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#011E42] tracking-tight">
              {ts.title[lang]}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-2 max-w-lg mx-auto leading-relaxed">
              {ts.subtitle[lang]}
            </p>
          </div>
        </ScrollReveal>

        {/* 3 Executive Cards with Tall Portrait Aspect Ratio matching reference 1:1 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-7 lg:gap-8 max-w-5xl mx-auto justify-items-center py-8 -my-4">
          {LEADERS.map((m, idx) => {
            const member = ts.members[m.memberKey]
            return (
              <ScrollReveal key={m.id} delay={idx * 120} className="w-full max-w-[300px] flex justify-center">
                <div
                  className="group relative bg-white rounded-[22px] border border-slate-100/90 shadow-xl shadow-slate-200/50 elevated-hover flex flex-col items-center text-center overflow-hidden w-full max-w-[300px] min-h-[390px] sm:min-h-[405px]"
                >
                  {/* Official Card SVG Ribbon Header */}
                  <div className="absolute top-0 left-0 right-0 h-[142px] pointer-events-none">
                    <Image
                      src={m.bgCard}
                      alt="Card Header"
                      fill
                      unoptimized
                      className="object-cover object-top"
                      priority
                    />
                  </div>

                  {/* Circular Portrait sitting inside the blue ring */}
                  <div className="relative z-10 w-[100px] h-[100px] rounded-full overflow-hidden mt-[24px] border-2 border-white shadow-md bg-slate-50 group-hover:scale-105 transition-transform duration-300">
                    <Image
                      src={m.photo}
                      alt={m.name}
                      fill
                      sizes="100px"
                      className={`object-cover object-top ${m.photoScale}`}
                    />
                  </div>

                  {/* Leader Details with Balanced Vertical Pedestal */}
                  <div className="relative z-10 px-5 pt-4 pb-7 flex-1 flex flex-col justify-between w-full">
                    <div>
                      <h3 className="font-extrabold text-[#011E42] text-lg sm:text-[19px] leading-snug tracking-tight">
                        {m.name}
                      </h3>
                      <p className="text-[#008CE4] font-bold text-xs uppercase tracking-wider mt-1.5 mb-3">
                        {member.title[lang]}
                      </p>
                      <p className="text-[13px] sm:text-sm text-slate-600 leading-relaxed text-center px-1">
                        {member.bio[lang]}
                      </p>
                    </div>
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
