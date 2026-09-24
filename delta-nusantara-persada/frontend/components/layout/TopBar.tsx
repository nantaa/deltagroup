'use client'
import React, { useEffect } from 'react'
import { useLang, translations } from '@/lib/LanguageContext'

export default function TopBar() {
  const { lang } = useLang()
  const tb = translations.topBar

  // Get language-appropriate announcements
  const announcements = tb.announcements[lang]

  if (announcements.length === 0) return null

  // Duplicate so the ticker looks seamless
  const items = [...announcements, ...announcements, ...announcements]

  return (
    <div className="bg-[#00142A] border-b border-white/10 text-slate-200 text-xs py-2 overflow-hidden flex items-center">
      <div className="shrink-0 bg-[#008CE4] text-white font-bold text-[11px] px-3 py-0.5 ml-4 rounded-full flex items-center gap-1.5 shadow-sm">
        <span className="w-1.5 h-1.5 rounded-full bg-[#00D2FF] animate-pulse" />
        {tb.badge[lang]}
      </div>
      <div className="ticker-wrap flex-1 ml-2">
        <div className="ticker-content">
          {items.map((a, i) => (
            <span key={i} className="mx-6 text-slate-200 font-medium hover:text-[#00D2FF] transition-colors">
              <span className="mr-3 text-[#00D2FF] opacity-75">●</span>
              {a}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
