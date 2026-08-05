'use client'
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useLang } from '@/lib/LanguageContext'

export default function Footer() {
  const { lang } = useLang()
  const isID = lang === 'ID'

  return (
    <footer className="bg-[#007a91] text-white pt-14 pb-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">

          {/* ── Left: Logo + Social + Map ── */}
          <div className="flex flex-col gap-5">
            {/* Logo card */}
            <div className="inline-flex items-center gap-3 bg-white rounded-2xl px-4 py-3 shadow-lg self-start">
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

            {/* Map embed */}
            <iframe
              src="https://maps.google.com/maps?q=-6.247109,106.9958275&z=15&output=embed"
              width="100%"
              height="200"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="rounded-xl border-0 w-full"
              title="Delta Nusantara Persada Location"
            />

            {/* Social icons */}
            <div className="flex items-center gap-3">
              <a href="https://www.instagram.com/deltaindonesia/" target="_blank" rel="noopener noreferrer"
                aria-label="Instagram" className="w-8 h-8 border border-white/30 rounded-full flex items-center justify-center text-xs text-white hover:bg-white/15 hover:border-white/60 transition-colors">IG</a>
              <a href="https://www.facebook.com/deltaindonesiagroup" target="_blank" rel="noopener noreferrer"
                aria-label="Facebook" className="w-8 h-8 border border-white/30 rounded-full flex items-center justify-center text-xs text-white hover:bg-white/15 hover:border-white/60 transition-colors">FB</a>
              <a href="https://www.tiktok.com/@deltaindonesia" target="_blank" rel="noopener noreferrer"
                aria-label="TikTok" className="w-8 h-8 border border-white/30 rounded-full flex items-center justify-center text-xs text-white hover:bg-white/15 hover:border-white/60 transition-colors">TT</a>
              <a href="https://deltaindo.co.id" target="_blank" rel="noopener noreferrer"
                aria-label="Website" className="w-8 h-8 border border-white/30 rounded-full flex items-center justify-center text-xs text-white hover:bg-white/15 hover:border-white/60 transition-colors">🌐</a>
            </div>
          </div>


          {/* ── Right: Hubungi Kami ── */}
          <div>
            <h4 className="font-semibold text-white mb-5 text-sm tracking-wide uppercase">
              {isID ? 'Hubungi Kami' : 'Contact Us'}
            </h4>
            <ul className="space-y-4 text-sm text-cyan-100">

              <li className="flex items-start gap-3">
                <span className="shrink-0 text-base mt-0.5">📞</span>
                <div>
                  <p className="text-white/60 text-xs uppercase tracking-wide mb-0.5">{isID ? 'Telepon' : 'Phone'}</p>
                  <a href="tel:+62218869010" className="hover:text-white transition-colors">
                    (021) 88869010, 88869021
                  </a>
                </div>
              </li>

              <li className="flex items-start gap-3">
                <span className="shrink-0 text-base mt-0.5">✉️</span>
                <div>
                  <p className="text-white/60 text-xs uppercase tracking-wide mb-0.5">E-mail</p>
                  <a href="mailto:marketing@deltaindo.co.id" className="hover:text-white transition-colors">
                    marketing@deltaindo.co.id
                  </a>
                </div>
              </li>

              <li className="flex items-start gap-3">
                <span className="shrink-0 text-base mt-0.5">📍</span>
                <div>
                  <p className="text-white/60 text-xs uppercase tracking-wide mb-0.5">{isID ? 'Kantor Pusat' : 'Head Office'}</p>
                  <a
                    href="https://maps.google.com/?q=-6.247109,106.9958275"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors"
                  >
                    Komplek Suncity Square Blok H – 20,<br />Jl. M. Hasibuan, Margajaya, BEKASI.
                  </a>
                </div>
              </li>

              <li className="flex items-start gap-3">
                <span className="shrink-0 text-base mt-0.5">🏢</span>
                <div>
                  <p className="text-white/60 text-xs uppercase tracking-wide mb-0.5">{isID ? 'Kantor Perwakilan' : 'Representative Offices'}</p>
                  <p>Karawang · Purwokerto · Surabaya · Gresik · Pelalawan · Pekanbaru · Medan · Balikpapan</p>
                </div>
              </li>

            </ul>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row justify-between items-center gap-3">
          <p className="text-xs text-cyan-200">
            {isID
              ? '© 2026 PT. Delta Nusantara Persada. Hak cipta dilindungi undang-undang.'
              : '© 2026 PT. Delta Nusantara Persada. All rights reserved.'}
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
