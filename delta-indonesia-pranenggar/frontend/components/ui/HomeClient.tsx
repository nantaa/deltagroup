'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import PostCard from '@/components/ui/PostCard'
import { useLang } from '@/lib/LanguageContext'
import { Post, Brand } from '@/types'

// ── Brand logo map & Hardcoded Brands ────────────────────────────────────────
const BRAND_LOGOS: Record<string, string> = {
  'pranenggar':  '/images/DIP-LOGO.png',
  'nusa-persada':'/images/DNP-LOGO.png',
  'bsi':         '/images/BSI-LOGO.png',
  'prime':       '/images/PRIME-LOGO.png',
}

const STATIC_BRANDS = [
  { id: 'b1', name: 'Prime Safety', slug: 'prime' },
  { id: 'b2', name: 'Biro Sertifikasi Indonesia', slug: 'bsi' },
  { id: 'b3', name: 'Delta Indonesia Pranenggar', slug: 'nusa-persada' },
  { id: 'b4', name: 'Delta Indonesia Pranenggar', slug: 'pranenggar' },
]

// ── 24 individual client logos, 8 per slide × 3 slides ───────────────────────
const CLIENTS = [
  // Slide 1
  { id: 1, name: 'PT Berca Schindler Lifts', logo: '/images/logo-client/client-1.png' },
  { id: 2, name: 'PT Hasta Karya Perdana', logo: '/images/logo-client/client-2.jpg' },
  { id: 3, name: 'PT Kadi International', logo: '/images/logo-client/client-3.png' },
  { id: 4, name: 'PT Mitra Global Kencana', logo: '/images/logo-client/client-4.png' },
  { id: 5, name: 'PT Nittoc Construction Indonesia', logo: '/images/logo-client/client-5.png' },
  { id: 6, name: 'PT Bank Sahabat Sampoerna', logo: '/images/logo-client/client-6.png' },
  { id: 7, name: 'PT Indofood CBP Sukses Makmur Tbk', logo: '/images/logo-client/client-7.png' },
  { id: 8, name: 'PT K-Line Mobaru Indonesia', logo: '/images/logo-client/client-8.webp' },
  // Slide 2
  { id: 9, name: 'PT Mandiri Trans Utama', logo: '/images/logo-client/client-9.png' },
  { id: 10, name: 'PT Bertha Karya Teknik', logo: '/images/logo-client/client-10.jpg' },
  { id: 11, name: 'PT Ekanuri', logo: '/images/logo-client/client-11.jpg' },
  { id: 12, name: 'PT Jababeka Infrastruktur', logo: '/images/logo-client/client-12.png' },
  { id: 13, name: 'PT Elnusa', logo: '/images/logo-client/client-13.png' },
  { id: 14, name: 'Kempenski Indonesia', logo: '/images/logo-client/client-14.png' },
  { id: 15, name: 'PT HD Forklift', logo: '/images/logo-client/client-15.png' },
  { id: 16, name: 'PT Surgika Alkesindo', logo: '/images/logo-client/client-16.webp' },
  // Slide 3
  { id: 17, name: 'PT Asahi Forge Indonesia', logo: '/images/logo-client/client-17.jpg' },
  { id: 18, name: 'PT Toyota Tsusho Mechanical & Engineering Service Indonesia', logo: '/images/logo-client/client-18.jpg' },
  { id: 19, name: 'PT Antam Tbk', logo: '/images/logo-client/client-19.jpg' },
  { id: 20, name: 'PT Air Drilling', logo: '/images/logo-client/client-20.png' },
  { id: 21, name: 'PT Gapura Angkasa', logo: '/images/logo-client/client-21.webp' },
  { id: 22, name: 'PT Arthamigas', logo: '/images/logo-client/client-22.jpg' },
  { id: 23, name: 'RSIA Grand Family', logo: '/images/logo-client/client-23.png' },
  { id: 24, name: 'RS Eka Hospital Bekasi & Cibubur', logo: '/images/logo-client/client-24.png' },
]

const CLIENTS_PER_SLIDE = 8
const TOTAL_SLIDES = 3 // 24 ÷ 8

// ── Fallback when the image file is missing ───────────────────────────────────
function ClientLogoFallback({ name }: { name: string }) {
  return (
    <div className="w-full h-14 bg-gray-100 rounded-lg flex flex-col items-center justify-center gap-1 px-2">
      <svg viewBox="0 0 24 24" className="w-5 h-5 fill-gray-300 shrink-0">
        <circle cx="12" cy="12" r="10" />
      </svg>
      <span className="text-[9px] font-medium text-gray-400 text-center leading-tight line-clamp-2">
        {name}
      </span>
    </div>
  )
}

// ── Individual client card ─────────────────────────────────────────────────────
function ClientCard({ client }: { client: typeof CLIENTS[0] }) {
  const [imgError, setImgError] = useState(false)
  return (
    <div className="flex flex-col items-center justify-center gap-2 p-3 rounded-xl border border-gray-100 bg-white hover:shadow-md hover:border-primary-700/30 transition-all group cursor-default">
      <div className="w-full h-14 relative flex items-center justify-center">
        {!imgError ? (
          <Image
            src={client.logo}
            alt={client.name}
            fill
            className="object-contain grayscale group-hover:grayscale-0 opacity-60 group-hover:opacity-100 transition-all duration-300"
            onError={() => setImgError(true)}
          />
        ) : (
          <ClientLogoFallback name={client.name} />
        )}
      </div>
      <span className="text-[10px] text-gray-500 font-medium text-center leading-tight">
        {client.name}
      </span>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
export default function HomeClient({ posts, brands }: { posts: Post[]; brands: Brand[] }) {
  const { t } = useLang()

  // ── Brand carousel ────────────────────────────────────────────────────────
  const [brandIndex, setBrandIndex] = useState(0)
  const handleBrandPrev = () => setBrandIndex((p) => (p - 1 + STATIC_BRANDS.length) % STATIC_BRANDS.length)
  const handleBrandNext = () => setBrandIndex((p) => (p + 1) % STATIC_BRANDS.length)
  const visibleBrands = Array.from({ length: 3 }).map((_, i) => STATIC_BRANDS[(brandIndex + i) % STATIC_BRANDS.length])

  // ── Client carousel (slide 0→1→2, 8 logos each) ──────────────────────────
  const [clientSlide, setClientSlide] = useState(0)
  const handleClientPrev = () => setClientSlide((p) => (p - 1 + TOTAL_SLIDES) % TOTAL_SLIDES)
  const handleClientNext = () => setClientSlide((p) => (p + 1) % TOTAL_SLIDES)
  const visibleClients = CLIENTS.slice(
    clientSlide * CLIENTS_PER_SLIDE,
    clientSlide * CLIENTS_PER_SLIDE + CLIENTS_PER_SLIDE,
  )

  return (
    <>
      {/* ── Brand Kami (hidden on DNP) ── */}
      <section className="hidden py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
          <h2 className="section-title">{t('home', 'brandSection')}</h2>
          <p className="section-subtitle">{t('home', 'brandSubtitle')}</p>
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-center gap-4 sm:gap-6">
          <button
            onClick={handleBrandPrev}
            aria-label="Brand sebelumnya"
            className="flex-shrink-0 w-10 h-10 bg-white border border-gray-200 rounded-full flex items-center justify-center shadow-sm hover:border-primary-700 hover:text-primary-700 transition-colors text-gray-400"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Pill */}
          <div className="flex-1 bg-white border border-gray-200 rounded-[50px] shadow-sm flex items-center overflow-hidden max-w-5xl">
            {visibleBrands.map((brand, idx) => (
              <Link
                key={`brand-pill-${idx}-${brandIndex}`}
                href="/brand"
                className={`flex-1 flex flex-row items-center justify-center gap-2 px-2 py-4 sm:py-6 hover:bg-cyan-50 transition-colors ${idx < 2 ? 'border-r border-gray-200' : ''
                  }`}
              >
                <div className="w-14 h-14 sm:w-16 sm:h-16 relative shrink-0">
                  {brand?.slug && BRAND_LOGOS[brand.slug] ? (
                    <Image
                      src={BRAND_LOGOS[brand.slug]}
                      alt={brand.name}
                      fill
                      className="object-contain"
                    />
                  ) : (
                    <div className="w-full h-full bg-primary-700/10 rounded-full flex items-center justify-center">
                      <svg viewBox="0 0 40 40" className="w-9 h-9 sm:w-11 sm:h-11 fill-primary-700 shrink-0">
                        <polygon points="20,4 36,34 4,34" />
                      </svg>
                    </div>
                  )}
                </div>
                <span className="text-[10px] sm:text-xs font-bold text-primary-700 leading-tight max-w-[120px] text-left">
                  {brand?.name ?? 'Brand'}
                </span>
              </Link>
            ))}
          </div>

          <button
            onClick={handleBrandNext}
            aria-label="Brand berikutnya"
            className="flex-shrink-0 w-10 h-10 bg-white border border-gray-200 rounded-full flex items-center justify-center shadow-sm hover:border-primary-700 hover:text-primary-700 transition-colors text-gray-400"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </section>

      {/* ── Client Logos — 24 logos, 8 per slide, 3 slides ── */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-primary-700 text-sm font-semibold text-center uppercase tracking-wide mb-2">
            {t('home', 'clientSection')}
          </p>
          <p className="text-gray-500 text-sm text-center mb-10">
            {t('home', 'clientSubtitle')}
          </p>

          {/* Carousel row */}
          <div className="flex items-center gap-3 sm:gap-5">
            <button
              onClick={handleClientPrev}
              aria-label="Klien sebelumnya"
              className="flex-shrink-0 w-10 h-10 bg-white border border-gray-200 rounded-full flex items-center justify-center shadow-sm hover:border-primary-700 hover:text-primary-700 transition-colors text-gray-400"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* 8-logo grid */}
            <div className="flex-1 grid grid-cols-4 gap-3">
              {visibleClients.map((client) => (
                <ClientCard key={client.id} client={client} />
              ))}
            </div>

            <button
              onClick={handleClientNext}
              aria-label="Klien berikutnya"
              className="flex-shrink-0 w-10 h-10 bg-white border border-gray-200 rounded-full flex items-center justify-center shadow-sm hover:border-primary-700 hover:text-primary-700 transition-colors text-gray-400"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Slide indicator dots */}
          <div className="flex justify-center gap-2 mt-8">
            {Array.from({ length: TOTAL_SLIDES }).map((_, i) => (
              <button
                key={i}
                onClick={() => setClientSlide(i)}
                aria-label={`Slide ${i + 1}`}
                className={`h-1.5 rounded-full transition-all duration-300 ${i === clientSlide
                  ? 'w-8 bg-primary-700'
                  : 'w-4 bg-gray-300 hover:bg-gray-400'
                  }`}
              />
            ))}
          </div>

          {/* Slide counter */}
          <p className="text-center text-xs text-gray-400 mt-3">
            {clientSlide + 1} / {TOTAL_SLIDES}
          </p>
        </div>
      </section>

      {/* ── Blog & Berita ── */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-bold text-primary-700">{t('home', 'newsSection')}</h2>
            <Link href="/berita" className="btn-outline text-sm">{t('home', 'viewMore')}</Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
