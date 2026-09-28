'use client'
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Instagram } from 'lucide-react'
import { useLang } from '@/lib/LanguageContext'

export default function Footer() {
  const { t } = useLang()

  return (
    <footer className="bg-[#011E42] text-white pt-16 pb-8 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* 4-Column Grid matching Frame 2147224261.svg */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">

          {/* Col 1: Logo, Bio & Social (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="inline-block">
              <Image
                src="/images/Monochrome Logo.svg"
                alt="Delta Nusantara Persada"
                width={200}
                height={50}
                unoptimized
                className="h-10 w-auto object-contain"
              />
            </Link>

            <p className="text-gray-300 text-xs leading-relaxed max-w-sm">
              {t('footer', 'description')}
            </p>

            <p className="font-figtree font-bold text-white text-sm sm:text-[15px] tracking-wide">
              Member of <span className="text-[#00D2FF]">DELTA INDONESIA Group</span>
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-3 pt-2">
              <span className="text-xs text-gray-400">{t('footer', 'followUs')}</span>
              <a
                href="https://www.instagram.com/riksauji.dnp/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-8 h-8 rounded-full bg-white text-[#011E42] flex items-center justify-center hover:bg-[#00D2FF] transition-all"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://www.tiktok.com/@riksauji.dnp"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TikTok"
                className="w-8 h-8 rounded-full bg-white text-[#011E42] flex items-center justify-center hover:bg-[#00D2FF] transition-all"
              >
                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 3 15.68a6.34 6.34 0 0 0 6.34 6.32 6.34 6.34 0 0 0 6.34-6.32V8.9a8.18 8.18 0 0 0 4.78 1.54v-3.7a4.85 4.85 0 0 1-.87-.05z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Col 2: KONTAK */}
          <div>
            <h4 className="font-bold text-white text-xs uppercase tracking-wider mb-4">
              {t('footer', 'contactUs')}
            </h4>
            <ul className="space-y-2.5 text-xs text-gray-300">
              <li>
                <a href="tel:02188869010" className="hover:text-[#00D2FF] transition-colors">
                  (021) 888 69 010
                </a>
              </li>
              <li>
                <a href="mailto:deltanusapersada@gmail.com" className="hover:text-[#00D2FF] transition-colors">
                  deltanusapersada@gmail.com
                </a>
              </li>
              <li className="leading-relaxed text-gray-400">
                Komp. Ruko Suncity Square A - 45 Jl. M. Hasibuan Margajaya, Bekasi 17141
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Copyright */}
        <div className="pt-8 border-t border-white/10 text-center">
          <p className="text-xs text-gray-400">
            {t('footer', 'copyright')}
          </p>
        </div>

      </div>
    </footer>
  )
}
