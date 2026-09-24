'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { ChevronDown, Globe, Menu, X } from 'lucide-react'
import clsx from 'clsx'
import { useLang } from '@/lib/LanguageContext'
import type { Language } from '@/lib/LanguageContext'
import AboutModal from '@/components/ui/AboutModal'

export default function Navbar() {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [langOpen, setLangOpen] = useState(false)
  const [aboutModalOpen, setAboutModalOpen] = useState(false)
  const { lang, setLang, t } = useLang()

  const languages: Language[] = ['EN', 'ID']

  return (
    <>
      <nav className="bg-[#011E42] border-b border-white/10 relative z-50 transition-all">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-[72px]">
            
            {/* Logo matching Frame 2147224261.svg */}
            <Link href="/" className="flex items-center gap-3 shrink-0 group">
              <div className="h-11 relative flex items-center">
                <Image
                  src="/images/DNP-White.png"
                  alt="Delta Nusantara Persada"
                  width={220}
                  height={55}
                  className="h-10 w-auto object-contain"
                  priority
                />
              </div>
            </Link>

            {/* Desktop Center Nav Links (Balanced Whitespace) */}
            <div className="hidden md:flex items-center justify-center gap-5 lg:gap-7 xl:gap-8 flex-1 mx-4 lg:mx-8">
              {/* Tentang Kami Popup Trigger */}
              <button
                type="button"
                onClick={() => setAboutModalOpen(true)}
                className="text-xs lg:text-sm font-semibold tracking-wider text-gray-200 hover:text-[#00D2FF] transition-colors focus:outline-none cursor-pointer"
              >
                {t('nav', 'about')}
              </button>

              {/* Layanan Section Shortcut */}
              <Link
                href="/#layanan"
                className="text-xs lg:text-sm font-semibold tracking-wider text-gray-200 hover:text-[#00D2FF] transition-colors"
              >
                {t('nav', 'services')}
              </Link>

              {/* Keunggulan Section Shortcut */}
              <Link
                href="/#keunggulan"
                className="text-xs lg:text-sm font-semibold tracking-wider text-gray-200 hover:text-[#00D2FF] transition-colors"
              >
                {t('nav', 'whyChooseUs')}
              </Link>

              {/* Alur Kerja Section Shortcut */}
              <Link
                href="/#alur-kerja"
                className="text-xs lg:text-sm font-semibold tracking-wider text-gray-200 hover:text-[#00D2FF] transition-colors"
              >
                {t('nav', 'process')}
              </Link>

              {/* Tim Ahli Section Shortcut */}
              <Link
                href="/#tim-ahli"
                className="text-xs lg:text-sm font-semibold tracking-wider text-gray-200 hover:text-[#00D2FF] transition-colors"
              >
                {t('nav', 'team')}
              </Link>

              {/* Berita Page Link */}
              <Link
                href="/berita"
                className={clsx(
                  'text-xs lg:text-sm font-semibold tracking-wider transition-colors hover:text-[#00D2FF]',
                  pathname === '/berita' ? 'text-[#00D2FF]' : 'text-gray-200'
                )}
              >
                {t('nav', 'news')}
              </Link>
            </div>

            {/* Desktop Right Actions: Language Selector + CTA */}
            <div className="hidden md:flex items-center gap-4 shrink-0">
              {/* Language Selector */}
              <div className="relative flex items-center gap-1 border-l border-white/20 pl-4 py-1.5">
                <button
                  onClick={() => setLangOpen(!langOpen)}
                  className="flex items-center gap-1.5 text-xs font-semibold text-gray-200 hover:text-[#00D2FF] transition-colors"
                >
                  <Globe className="w-3.5 h-3.5 text-[#00D2FF]" />
                  <span>{lang.toUpperCase()}</span>
                  <ChevronDown className="w-3 h-3 opacity-70" />
                </button>

                {langOpen && (
                  <div className="absolute top-full right-0 mt-1 w-20 bg-[#011E42] border border-white/15 rounded-lg shadow-xl overflow-hidden py-1 z-50">
                    {languages.map((l) => (
                      <button
                        key={l}
                        onClick={() => {
                          setLang(l)
                          setLangOpen(false)
                        }}
                        className={clsx(
                          'w-full text-left px-3 py-1.5 text-xs font-medium transition-colors block',
                          lang === l ? 'bg-[#008CE4] text-white' : 'text-gray-300 hover:bg-white/10'
                        )}
                      >
                        {l}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Hubungi Kami Action Button (Square 10px Gradient) */}
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-5 py-2.5 rounded-[10px] text-xs font-bold bg-gradient-to-r from-[#04C5F4] to-[#0D5EC4] hover:brightness-105 text-white transition-all duration-200 shadow-md shadow-[#008CE4]/30"
              >
                {t('nav', 'contact')}
              </Link>
            </div>

            {/* Mobile hamburger */}
            <div className="flex md:hidden items-center gap-3">
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="p-2 text-white hover:text-[#00D2FF] transition-colors"
                aria-label="Toggle menu"
              >
                {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

          </div>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="md:hidden bg-[#011E42] border-t border-white/10 px-4 pt-4 pb-6 space-y-3">
            <button
              type="button"
              className="block w-full text-left text-sm font-semibold text-gray-200 hover:text-[#00D2FF] py-2"
              onClick={() => {
                setMobileOpen(false)
                setAboutModalOpen(true)
              }}
            >
              {t('nav', 'about')}
            </button>
            <Link
              href="/#layanan"
              className="block text-sm font-semibold text-gray-200 hover:text-[#00D2FF] py-2"
              onClick={() => setMobileOpen(false)}
            >
              {t('nav', 'services')}
            </Link>
            <Link
              href="/#keunggulan"
              className="block text-sm font-semibold text-gray-200 hover:text-[#00D2FF] py-2"
              onClick={() => setMobileOpen(false)}
            >
              {t('nav', 'whyChooseUs')}
            </Link>
            <Link
              href="/#alur-kerja"
              className="block text-sm font-semibold text-gray-200 hover:text-[#00D2FF] py-2"
              onClick={() => setMobileOpen(false)}
            >
              {t('nav', 'process')}
            </Link>
            <Link
              href="/#tim-ahli"
              className="block text-sm font-semibold text-gray-200 hover:text-[#00D2FF] py-2"
              onClick={() => setMobileOpen(false)}
            >
              {t('nav', 'team')}
            </Link>
            <Link
              href="/berita"
              className="block text-sm font-semibold text-gray-200 hover:text-[#00D2FF] py-2"
              onClick={() => setMobileOpen(false)}
            >
              {t('nav', 'news')}
            </Link>

            {/* Mobile Language Switcher */}
            <div className="flex items-center justify-between py-2 border-t border-white/10">
              <div className="flex items-center gap-1.5 text-xs text-gray-300">
                <Globe className="w-4 h-4 text-[#00D2FF]" />
                <span>Language:</span>
              </div>
              <div className="flex items-center gap-2">
                {languages.map((l) => (
                  <button
                    key={l}
                    onClick={() => setLang(l)}
                    className={clsx(
                      'px-3 py-1 text-xs font-bold rounded-md transition-colors',
                      lang === l ? 'bg-[#008CE4] text-white shadow-sm' : 'text-gray-300 bg-white/10 hover:bg-white/20'
                    )}
                  >
                    {l}
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-2">
              <Link
                href="/contact"
                className="block w-full text-center py-3 rounded-[10px] text-xs font-bold bg-gradient-to-r from-[#04C5F4] to-[#0D5EC4] text-white shadow-md shadow-[#008CE4]/30"
                onClick={() => setMobileOpen(false)}
              >
                {t('nav', 'contact')}
              </Link>
            </div>
          </div>
        )}
      </nav>

      {/* Global Tentang Kami Popup Modal */}
      <AboutModal
        isOpen={aboutModalOpen}
        onClose={() => setAboutModalOpen(false)}
      />
    </>
  )
}
