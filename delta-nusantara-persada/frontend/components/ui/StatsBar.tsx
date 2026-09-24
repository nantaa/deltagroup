'use client'
import React from 'react'
import Image from 'next/image'

const STATS = [
  {
    iconPath: '/images/components/safety-person.svg',
    value: '5 +',
    title: 'Expert Consultant',
    desc: 'Bersertifikat Nasional & Internasional',
  },
  {
    iconPath: '/images/components/list-board.svg',
    value: '1000 +',
    title: 'Projects Completed',
    desc: 'Berbagai Industri & Skala Proyek',
  },
  {
    iconPath: '/images/components/globe.svg',
    value: '11 +',
    title: 'Years of Experience',
    desc: 'Memberikan Solusi Terpercaya',
  },
]

export default function StatsBar() {
  return (
    <div className="w-full h-full flex items-center justify-between px-2 sm:px-4 lg:px-6 py-2">
      <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-0 items-center">
        {STATS.map((s, idx) => (
          <div
            key={idx}
            className={`relative px-1 sm:px-2 ${
              idx > 0 ? 'md:border-l md:border-slate-200/80' : ''
            }`}
          >
            <div className="group flex items-center gap-3 sm:gap-4 p-2.5 sm:p-3 lg:p-3.5 rounded-xl cursor-default transition-all duration-300 ease-out hover:-translate-y-1.5 hover:bg-[#F2F8FD]/90 hover:shadow-lg hover:shadow-[#008CE4]/15 border border-transparent hover:border-[#CCE3F8]/80">
              <div className="w-12 h-12 flex items-center justify-center shrink-0 transition-transform duration-300 ease-out group-hover:scale-110">
                <Image
                  src={s.iconPath}
                  alt={s.title}
                  width={48}
                  height={48}
                  unoptimized
                  className="w-12 h-12 object-contain"
                />
              </div>

              <div className="min-w-0">
                <div className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-[#011E42] leading-none tracking-tight group-hover:text-[#008CE4] transition-colors duration-300">
                  {s.value}
                </div>
                <h3 className="font-bold text-gray-900 text-xs lg:text-sm mt-1 truncate">{s.title}</h3>
                <p className="text-[10px] lg:text-xs text-gray-500 mt-0.5 leading-tight truncate">{s.desc}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
