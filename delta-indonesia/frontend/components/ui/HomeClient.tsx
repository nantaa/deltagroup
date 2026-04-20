'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import PostCard from '@/components/ui/PostCard'
import { useLang } from '@/lib/LanguageContext'
import { Post, Brand } from '@/types'

const CLIENT_LOGOS = Array(8).fill(null).map((_, i) => ({ id: i + 1, name: `Client ${i + 1}` }))

// Brand logo placeholder SVG inline
function BrandLogo() {
  return (
    <svg viewBox="0 0 40 40" className="w-7 h-7 fill-primary-700 shrink-0">
      <polygon points="20,4 36,34 4,34" />
    </svg>
  )
}

export default function HomeClient({ posts, brands }: { posts: Post[]; brands: Brand[] }) {
  const { t } = useLang()
  const [currentIndex, setCurrentIndex] = useState(0)

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + brands.length) % brands.length)
  }

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % brands.length)
  }

  // Get exactly 3 visible items wrapping around
  const visibleBrands = Array.from({ length: 3 }).map((_, i) => brands[(currentIndex + i) % brands.length])

  return (
    <>
      {/* ── Brand Kami ── */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
          <h2 className="section-title">{t('home', 'brandSection')}</h2>
          <p className="section-subtitle">{t('home', 'brandSubtitle')}</p>
        </div>

        {/* Carousel Pill Container */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative flex items-center justify-center gap-4 sm:gap-6">
          <button
            onClick={handlePrev}
            className="flex-shrink-0 w-10 h-10 bg-white border border-gray-200 rounded-full flex items-center justify-center shadow-sm hover:border-accent hover:text-accent transition-colors text-gray-400"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* The Big Pill */}
          <div className="flex-1 bg-white border border-gray-200 rounded-[50px] shadow-sm flex items-center overflow-hidden max-w-5xl">
            {visibleBrands.map((brand, idx) => (
              <Link
                key={`brand-${brand?.id || idx}-${currentIndex}`}
                href="/brand"
                className={`flex-1 flex flex-col sm:flex-row items-center justify-center gap-3 px-4 py-4 sm:py-6 hover:bg-gray-50 transition-colors ${
                  idx < 2 ? 'border-r border-gray-200' : ''
                }`}
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary-700/10 rounded-full flex items-center justify-center shrink-0">
                  {/* BrandLogo */}
                  <svg viewBox="0 0 40 40" className="w-6 h-6 sm:w-7 sm:h-7 fill-primary-700 shrink-0">
                    <polygon points="20,4 36,34 4,34" />
                  </svg>
                </div>
                <span className="text-xs sm:text-sm font-bold text-primary-700 leading-tight max-w-[150px] text-center sm:text-left">
                  {brand?.name || 'Brand'}
                </span>
              </Link>
            ))}
          </div>

          <button
            onClick={handleNext}
            className="flex-shrink-0 w-10 h-10 bg-white border border-gray-200 rounded-full flex items-center justify-center shadow-sm hover:border-accent hover:text-accent transition-colors text-gray-400"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </section>

      {/* ── Client Logos ── */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-accent text-sm font-semibold text-center uppercase tracking-wide mb-2">
            {t('home', 'clientSection')}
          </p>
          <p className="text-gray-500 text-sm text-center mb-10">
            {t('home', 'clientSubtitle')}
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
            {CLIENT_LOGOS.map((c) => (
              <div key={c.id} className="flex items-center justify-center grayscale hover:grayscale-0 transition-all opacity-60 hover:opacity-100">
                <div className="h-10 flex items-center gap-2 text-gray-500">
                  <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current"><circle cx="12" cy="12" r="10" /></svg>
                  <span className="text-sm font-semibold">Logoipsum</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Blog & Berita ── */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-bold text-accent">{t('home', 'newsSection')}</h2>
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
