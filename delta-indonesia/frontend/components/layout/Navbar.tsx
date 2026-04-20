'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { ChevronDown, Globe, Menu, X } from 'lucide-react'
import clsx from 'clsx'
import { useLang } from '@/lib/LanguageContext'
import type { Language } from '@/lib/LanguageContext'

export default function Navbar() {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [brandOpen, setBrandOpen] = useState(false)
  const [langOpen, setLangOpen] = useState(false)
  const { lang, setLang, t } = useLang()

  const navItems = [
    { labelKey: 'about', href: '/about' },
    {
      labelKey: 'brand',
      href: '/brand',
      children: [
        { label: t('nav', 'brandChildren', 'pranenggar'), href: '/brand/pranenggar' },
        { label: t('nav', 'brandChildren', 'nusa'), href: '/brand/nusa-persada' },
        { label: t('nav', 'brandChildren', 'bsi'), href: '/brand/bsi' },
      ],
    },
    { labelKey: 'news', href: '/berita' },
  ]

  const languages: Language[] = ['ID', 'EN']

  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 shrink-0">
            {/* The w-12 h-12 wrapper keeps your layout from shifting */}
            <div className="w-12 h-12 relative flex items-center justify-center">
              <Image
                src="/images/logo1.png"
                alt="Delta Indonesia Group Logo"
                width={48}
                height={48}
                className="object-contain"
              />
            </div>

            <div className="border-l border-gray-300 pl-3">
              <p className="text-primary-700 font-bold text-sm leading-tight">DELTA INDONESIA</p>
              <p className="text-primary-700 font-bold text-sm leading-tight">GROUP</p>
              <p className="text-gray-400 text-[10px]">Consultant | Training | Inspection</p>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <div key={item.href} className="relative group">
                {item.children ? (
                  <button
                    onClick={() => setBrandOpen(!brandOpen)}
                    className={clsx(
                      'nav-link flex items-center gap-1',
                      pathname.startsWith('/brand') && 'text-accent'
                    )}
                  >
                    {t('nav', item.labelKey)}
                    <ChevronDown className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  <Link
                    href={item.href}
                    className={clsx(
                      'nav-link',
                      pathname === item.href && 'text-accent font-semibold'
                    )}
                  >
                    {t('nav', item.labelKey)}
                  </Link>
                )}

                {/* Dropdown */}
                {item.children && (
                  <div className="absolute top-full left-0 mt-2 w-56 bg-white border border-gray-100 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className="block px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-accent first:rounded-t-lg last:rounded-b-lg transition-colors"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {/* Divider */}
            <span className="text-gray-300">|</span>

            {/* Language Switcher */}
            <div className="relative">
              <button
                id="lang-switcher-btn"
                onClick={() => setLangOpen(!langOpen)}
                className="nav-link flex items-center gap-1.5 text-sm"
              >
                <Globe className="w-4 h-4" />
                {lang}
                <ChevronDown className={clsx('w-3.5 h-3.5 transition-transform', langOpen && 'rotate-180')} />
              </button>
              {langOpen && (
                <div className="absolute top-full right-0 mt-2 w-24 bg-white border border-gray-100 rounded-lg shadow-lg z-50">
                  {languages.map((l) => (
                    <button
                      key={l}
                      id={`lang-${l.toLowerCase()}`}
                      onClick={() => { setLang(l); setLangOpen(false) }}
                      className={clsx(
                        'flex items-center gap-2 w-full px-4 py-2 text-sm hover:bg-blue-50 hover:text-accent transition-colors first:rounded-t-lg last:rounded-b-lg',
                        lang === l && 'text-accent font-semibold bg-blue-50'
                      )}
                    >
                      <span className={clsx(
                        'w-2 h-2 rounded-full shrink-0',
                        l === 'ID' ? 'bg-red-500' : 'bg-blue-500'
                      )} />
                      {l}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <Link href="/contact" className="btn-primary" id="contact-cta-btn">
              {t('nav', 'contact')}
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            id="mobile-menu-btn"
            className="md:hidden p-2 text-gray-600"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-4 py-4 space-y-3">
          {navItems.map((item) => (
            <div key={item.href}>
              <Link
                href={item.href}
                className="block text-sm font-medium text-gray-700 py-2 hover:text-accent"
                onClick={() => setMobileOpen(false)}
              >
                {t('nav', item.labelKey)}
              </Link>
              {item.children && (
                <div className="ml-4 space-y-1">
                  {item.children.map((child) => (
                    <Link
                      key={child.href}
                      href={child.href}
                      className="block text-sm text-gray-500 py-1.5 hover:text-accent"
                      onClick={() => setMobileOpen(false)}
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}

          {/* Mobile language toggle */}
          <div className="flex gap-2 pt-1">
            {languages.map((l) => (
              <button
                key={l}
                onClick={() => setLang(l)}
                className={clsx(
                  'flex-1 py-2 rounded-md text-sm font-medium border transition-colors flex items-center justify-center gap-1.5',
                  lang === l
                    ? 'bg-accent text-white border-accent'
                    : 'border-gray-200 text-gray-600 hover:border-accent hover:text-accent'
                )}
              >
                <span className={clsx(
                  'w-2 h-2 rounded-full shrink-0',
                  lang === l ? 'bg-white' : l === 'ID' ? 'bg-red-400' : 'bg-blue-400'
                )} />
                {l}
              </button>
            ))}
          </div>

          <Link href="/contact" className="btn-primary block text-center mt-4">
            {t('nav', 'contact')}
          </Link>
        </div>
      )}
    </nav>
  )
}
