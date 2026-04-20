'use client'
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useLang } from '@/lib/LanguageContext'

export default function Footer() {
  const { lang, t } = useLang()

  const services = [
    { labelID: 'Pelatihan K3',                  labelEN: 'K3 Training',                   href: 'https://deltaindo.co.id/pelatihank3/'                  },
    { labelID: 'Pelatihan Berbasis Kompetensi', labelEN: 'Competency-Based Training',      href: 'https://deltaindo.co.id/pelatihanbasiskompetensi'       },
    { labelID: 'Lembaga Pelatihan Kerja (LPK)', labelEN: 'Vocational Training Institute',  href: 'https://deltaindo.co.id/lembagapelatihankerja/'         },
    { labelID: 'Konsultan Manajemen',           labelEN: 'Management Consulting',          href: 'https://deltaindo.co.id/konsultan-manajemen'           },
    { labelID: 'Riksa Uji',                     labelEN: 'Inspection & Testing',           href: 'https://nusantara.deltaindo.co.id/'                    },
    { labelID: 'Audit & Sertifikasi',           labelEN: 'Audit & Certification',          href: 'https://sertifikasiindonesia.co.id/'                   },
  ]

  const menuItems = [
    { labelID: 'Tentang Kami',       labelEN: 'About Us',          href: '/about'   },
    { labelID: 'Brand Kami',         labelEN: 'Our Brands',        href: '/brand'   },
    { labelID: 'Berita & Artikel',   labelEN: 'News & Articles',   href: '/berita'  },
    { labelID: 'Hubungi Kami',       labelEN: 'Contact Us',        href: '/contact' },
    { labelID: 'Klien Kami',         labelEN: 'Our Clients',       href: 'https://deltaindo.co.id/client-kami' },
    { labelID: 'Akreditasi',         labelEN: 'Accreditation',     href: 'https://deltaindo.co.id/akreditasi'  },
  ]

  const isID = lang === 'ID'

  return (
    <footer className="bg-[#007a91] text-white pt-14 pb-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">

          {/* Brand */}
          <div className="col-span-1">
            {/* Logo card */}
            <div className="inline-flex items-center gap-3 bg-white rounded-2xl px-4 py-3 shadow-lg mb-5">
              <div className="w-12 h-12 relative shrink-0">
                <Image
                  src="/images/logo-black.png"
                  alt="Delta Nusantara Persada"
                  width={48}
                  height={48}
                  className="object-contain"
                />
              </div>
              <div className="border-l border-gray-200 pl-3">
                <p className="text-primary-700 font-bold text-sm leading-tight">DELTA NUSANTARA</p>
                <p className="text-primary-700 font-bold text-sm leading-tight">PERSADA</p>
              </div>
            </div>
            <p className="text-cyan-100 text-sm leading-relaxed mb-5">
              {isID
                ? 'PT. Delta Nusantara Persada menyelenggarakan sertifikasi dan pelatihan K3 untuk karyawan maupun calon karyawan di seluruh Indonesia.'
                : 'PT. Delta Nusantara Persada provides K3 certification and training programs for employees and job seekers throughout Indonesia.'}
            </p>
            {/* Social */}
            <p className="text-xs font-semibold text-cyan-200 uppercase tracking-wide mb-3">
              {isID ? 'Ikuti Kami' : 'Follow Us'}
            </p>
            <div className="flex items-center gap-3">
              <a
                href="https://www.facebook.com/deltaindonesiagroup"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook Delta Nusantara Persada"
                className="w-8 h-8 border border-white/30 rounded-full flex items-center justify-center text-xs text-white hover:bg-white/15 hover:border-white/60 transition-colors"
              >f</a>
              <a
                href="https://www.instagram.com/deltaindonesia/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram Delta Nusantara Persada"
                className="w-8 h-8 border border-white/30 rounded-full flex items-center justify-center text-xs text-white hover:bg-white/15 hover:border-white/60 transition-colors"
              >IG</a>
              <a
                href="https://wa.me/628119778890"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp Delta Nusantara Persada"
                className="w-8 h-8 border border-white/30 rounded-full flex items-center justify-center text-xs text-white hover:bg-white/15 hover:border-white/60 transition-colors"
              >WA</a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold text-white mb-4 text-sm tracking-wide uppercase">
              {isID ? 'Layanan' : 'Services'}
            </h4>
            <ul className="space-y-2.5 text-sm text-cyan-100">
              {services.map((s) => (
                <li key={s.href}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors"
                  >
                    {isID ? s.labelID : s.labelEN}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Menu */}
          <div>
            <h4 className="font-semibold text-white mb-4 text-sm tracking-wide uppercase">
              {isID ? 'Menu' : 'Menu'}
            </h4>
            <ul className="space-y-2.5 text-sm text-cyan-100">
              {menuItems.map((m) => (
                <li key={m.href}>
                  <Link href={m.href} className="hover:text-white transition-colors">
                    {isID ? m.labelID : m.labelEN}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-white mb-4 text-sm tracking-wide uppercase">
              {isID ? 'Hubungi Kami' : 'Contact Us'}
            </h4>
            <ul className="space-y-3 text-sm text-cyan-100">
              <li className="flex items-start gap-2.5">
                <span className="mt-0.5 shrink-0 text-base">📍</span>
                <span>
                  {isID
                    ? 'Jakarta Selatan, DKI Jakarta, Indonesia'
                    : 'South Jakarta, DKI Jakarta, Indonesia'}
                </span>
              </li>
              <li className="flex items-center gap-2.5">
                <span className="shrink-0 text-base">📞</span>
                <a href="tel:+62215536288" className="hover:text-white transition-colors">
                  (021) 553-6288
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <span className="shrink-0 text-base">✉️</span>
                <a href="mailto:info@deltaindo.co.id" className="hover:text-white transition-colors">
                  info@deltaindo.co.id
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <span className="shrink-0 text-base">💬</span>
                <a
                  href="https://wa.me/628119778890"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  {isID ? 'WhatsApp Kami' : 'Chat on WhatsApp'}
                </a>
              </li>
            </ul>

            <a
              href="https://deltaindo.co.id/jadwal-training-agustus-2025"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-block bg-accent/90 hover:bg-accent text-gray-900 text-xs font-semibold px-4 py-2 rounded-lg transition-colors"
            >
              📅 {isID ? 'Lihat Jadwal Training 2025' : 'View Training Schedule 2025'}
            </a>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row justify-between items-center gap-3">
          <p className="text-xs text-cyan-200">
            {isID
              ? '© 2025 PT. Delta Nusantara Persada. Hak cipta dilindungi undang-undang.'
              : '© 2025 PT. Delta Nusantara Persada. All rights reserved.'}
          </p>
          <div className="flex items-center gap-4 text-xs text-cyan-200">
            <Link href="/privacy" className="hover:text-white transition-colors">
              {isID ? 'Kebijakan Privasi' : 'Privacy Policy'}
            </Link>
            <span className="text-white/20">|</span>
            <Link href="/terms" className="hover:text-white transition-colors">
              {isID ? 'Syarat & Ketentuan' : 'Terms & Conditions'}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
