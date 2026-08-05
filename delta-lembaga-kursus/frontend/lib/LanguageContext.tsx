'use client'
import React from 'react'
import { createContext, useContext, useState, ReactNode } from 'react'

export type Language = 'ID' | 'EN'

export const translations = {
  nav: {
    about: { ID: 'TENTANG KAMI', EN: 'ABOUT US' },
    brand: { ID: 'BRAND KAMI', EN: 'OUR BRANDS' },
    news: { ID: 'BERITA', EN: 'NEWS' },
    contact: { ID: 'HUBUNGI KAMI', EN: 'CONTACT US' },
    brandChildren: {
      pranenggar: { ID: 'Delta Indonesia Pranenggar', EN: 'Delta Indonesia Pranenggar' },
      nusa: { ID: 'Delta Lembaga Kursus', EN: 'Delta Lembaga Kursus' },
      bsi: { ID: 'Biro Sertifikasi Indonesia', EN: 'Biro Sertifikasi Indonesia' },
    },
  },
  home: {
    brandSection: { ID: 'Brand Kami', EN: 'Our Brands' },
    brandSubtitle: { ID: 'Kami telah bekerja sama dengan berbagai perusahaan', EN: 'We have been working with 500+ clients' },
    clientSection: { ID: 'PERUSAHAAN YANG SUDAH BEKERJA SAMA DENGAN PT. DELTA LEMBAGA KURSUS', EN: 'COMPANIES THAT HAVE PARTNERED WITH PT. DELTA LEMBAGA KURSUS' },
    clientSubtitle: { ID: 'Dipercaya lebih dari 100+ perusahaan', EN: 'Trusted by more than 100+ companies' },
    newsSection: { ID: 'Blog & Berita', EN: 'Blog & News' },
    viewMore: { ID: 'Lihat Semua', EN: 'View More' },
  },
  footer: {
    description: {
      ID: 'Delta Lembaga Kursus menyelenggarakan Sertifikasi dan pembinaan pelatihan K3 untuk para karyawan maupun calon karyawan di seluruh Indonesia.',
      EN: 'Delta Lembaga Kursus provides K3 certification and training programs for employees and job seekers throughout Indonesia.',
    },
    services: { ID: 'Layanan', EN: 'Services' },
    menu: { ID: 'Menu', EN: 'Menu' },
    contactUs: { ID: 'Hubungi Kami', EN: 'Contact Us' },
    followUs: { ID: 'Ikuti Kami', EN: 'Follow Us' },
    copyright: { ID: '© 2026 PT. Delta Lembaga Kursus. Hak cipta dilindungi.', EN: '© 2026 PT. Delta Lembaga Kursus. All rights reserved.' },
    serviceItems: {
      k3: { ID: 'Pelatihan K3', EN: 'K3 Training' },
      kompetensi: { ID: 'Pelatihan Berbasis Kompetensi', EN: 'Competency-Based Training' },
      lpk: { ID: 'Lembaga Pelatihan Kerja', EN: 'Vocational Training Institute' },
      konsultan: { ID: 'Konsultan Manajemen', EN: 'Management Consultant' },
      riksa: { ID: 'Riksa Uji', EN: 'Inspection & Testing' },
      audit: { ID: 'Audit & Sertifikasi', EN: 'Audit & Certification' },
    },
    menuItems: {
      about: { ID: 'Tentang Kami', EN: 'About Us' },
      privacy: { ID: 'Kebijakan Privasi', EN: 'Privacy Policy' },
      terms: { ID: 'Syarat & Ketentuan', EN: 'Terms & Conditions' },
      contact: { ID: 'Hubungi Kami', EN: 'Contact Us' },
    },
  },
  about: {
    title: { ID: 'Tentang Kami', EN: 'About Us' },
    subtitle: { ID: 'PT. Delta Lembaga Kursus', EN: 'PT. Delta Lembaga Kursus' },
  },
  berita: {
    title: { ID: 'Berita & Artikel', EN: 'News & Articles' },
    subtitle: { ID: 'Informasi terkini seputar K3 dan dunia industri', EN: 'Latest news on K3 and the industrial world' },
    readMore: { ID: 'Baca Selengkapnya', EN: 'Read More' },
    loadMore: { ID: 'Muat Lebih Banyak', EN: 'Load More' },
  },
}

type ContextType = {
  lang: Language
  setLang: (l: Language) => void
  t: (section: string, key: string, subKey?: string) => string
}

const LanguageContext = createContext<ContextType>({
  lang: 'ID',
  setLang: () => { },
  t: (s, k) => k,
})

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Language>('ID')

  // Type-safe translation lookup: t('nav', 'about') or t('nav', 'brandChildren', 'pranenggar')
  const t = (section: string, key: string, subKey?: string): string => {
    const sec = (translations as Record<string, unknown>)[section]
    if (!sec || typeof sec !== 'object') return key
    const entry = (sec as Record<string, unknown>)[key]
    if (!entry || typeof entry !== 'object') return key
    if (subKey) {
      const sub = (entry as Record<string, unknown>)[subKey]
      if (!sub || typeof sub !== 'object') return subKey
      return ((sub as Record<string, string>)[lang]) ?? subKey
    }
    return ((entry as Record<string, string>)[lang]) ?? key
  }

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLang() {
  return useContext(LanguageContext)
}
