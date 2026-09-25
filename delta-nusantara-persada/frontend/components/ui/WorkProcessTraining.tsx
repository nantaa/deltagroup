'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
  Calendar,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  FileText
} from 'lucide-react'
import { useLang, translations } from '@/lib/LanguageContext'
import { Post } from '@/types'

const DEFAULT_POSTS: Post[] = [
  {
    id: 1,
    title: 'Pentingnya Keselamatan Kerja & Riksa Uji Berkala di Industri',
    slug: 'pentingnya-keselamatan-kerja-riksa-uji-berkala',
    excerpt: 'Memastikan kelayakan operasi peralatan kerja sesuai regulasi Permenaker No. 8 Tahun 2020.',
    content: '',
    category: 'K3',
    status: 'published',
    tags: [],
    created_at: '2026-08-15T00:00:00.000Z',
    updated_at: '2026-08-15T00:00:00.000Z',
  },
  {
    id: 2,
    title: 'Regulasi Terbaru Kemnaker RI untuk Pesawat Uap & Bejana Tekan',
    slug: 'regulasi-terbaru-kemnaker-pubt',
    excerpt: 'Standar pengujian kelaikan operasional PUBT industri manufaktur guna menjamin keselamatan kerja.',
    content: '',
    category: 'REGULASI',
    status: 'published',
    tags: [],
    created_at: '2026-08-10T00:00:00.000Z',
    updated_at: '2026-08-10T00:00:00.000Z',
  },
  {
    id: 3,
    title: 'Sertifikasi NDT & Metode Non-Destructive Testing di Lapangan',
    slug: 'sertifikasi-ndt-dan-metode-testing',
    excerpt: 'Pemeriksaan struktur material tanpa merusak fisik komponen untuk deteksi dini risiko keausan.',
    content: '',
    category: 'INSPEKSI',
    status: 'published',
    tags: [],
    created_at: '2026-08-05T00:00:00.000Z',
    updated_at: '2026-08-05T00:00:00.000Z',
  },
  {
    id: 4,
    title: 'Panduan Audit Sistem Manajemen K3 (SMK3) untuk Perusahaan',
    slug: 'panduan-audit-sistem-manajemen-k3',
    excerpt: 'Langkah persiapan perusahaan menghadapi audit sertifikasi SMK3 dan pemenuhan standar regulasi.',
    content: '',
    category: 'AUDIT',
    status: 'published',
    tags: [],
    created_at: '2026-07-28T00:00:00.000Z',
    updated_at: '2026-07-28T00:00:00.000Z',
  },
]

const FALLBACK_IMAGES = [
  '/images/forklift-inspection.jpg',
  '/images/escalator-inspection.jpg',
  '/images/forklift-inspection.jpg',
  '/images/escalator-inspection.jpg',
]

interface WorkProcessTrainingProps {
  posts?: Post[]
}

export default function WorkProcessTraining({ posts }: WorkProcessTrainingProps) {
  const [activeSlide, setActiveSlide] = useState(0)
  const { lang } = useLang()
  const wp = translations.workProcess

  const displayPosts = posts && posts.length > 0 ? posts : DEFAULT_POSTS
  const totalSlides = Math.ceil(displayPosts.length / 2) || 1

  const handlePrev = () => {
    setActiveSlide((prev) => (prev > 0 ? prev - 1 : totalSlides - 1))
  }

  const handleNext = () => {
    setActiveSlide((prev) => (prev < totalSlides - 1 ? prev + 1 : 0))
  }

  const currentItems = displayPosts.slice(activeSlide * 2, activeSlide * 2 + 2)

  return (
    <section id="alur-kerja" className="py-14 sm:py-16 bg-white scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-start">
          
          {/* ── Left Column: ALUR PROSES (5 cols) ── */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <p className="text-[#008CE4] text-xs font-bold uppercase tracking-widest mb-1.5">
                {wp.eyebrow[lang]}
              </p>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#011E42] tracking-tight mb-8">
                {wp.title[lang]}
              </h2>

              {/* Official Looping 5-Step Process Vector Graphic from Figma */}
              <div className="pt-4 w-full max-w-[560px]">
                <Image
                  src="/images/components/workflow.svg"
                  alt="Alur Proses Kerja Kami"
                  width={605}
                  height={331}
                  unoptimized
                  className="w-full h-auto object-contain"
                  priority
                />
              </div>
            </div>
          </div>

          {/* ── Right Column: BERITA TERBARU (Artikel & Wawasan K3) (7 cols) ── */}
          <div className="lg:col-span-7">
            <div className="mb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-2">
              <div>
                <p className="text-[#008CE4] text-xs font-bold uppercase tracking-widest mb-1.5 flex items-center gap-2">
                  <span>{wp.riksaEyebrow[lang]}</span>
                  <span className="w-8 h-0.5 bg-[#008CE4]" />
                </p>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#011E42] tracking-tight">
                  {lang === 'EN' ? 'Safety Insights & Articles' : 'Artikel & Wawasan K3'}
                </h2>
              </div>
              <Link
                href="/berita"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#008CE4] hover:text-[#011E42] transition-colors self-start sm:self-auto"
              >
                <span>{lang === 'EN' ? 'View All News' : 'Lihat Semua Berita'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* 2 Cards Grid matching Berita Terbaru Layout */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {currentItems.map((post, idx) => {
                const imageSrc = post.image || FALLBACK_IMAGES[(activeSlide * 2 + idx) % FALLBACK_IMAGES.length]
                const dateStr = post.created_at
                  ? new Date(post.created_at).toLocaleDateString(lang === 'EN' ? 'en-US' : 'id-ID', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                    })
                  : '15 Agu 2026'

                return (
                  <div
                    key={post.id || idx}
                    className="group bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
                  >
                    {/* Card Photo with Category Badge */}
                    <div className="relative h-48 w-full overflow-hidden bg-slate-100">
                      <Image
                        src={imageSrc}
                        alt={post.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-3 left-3">
                        <span className="px-3 py-1 rounded-md text-[10px] font-bold text-white uppercase bg-[#008CE4] shadow-sm">
                          {post.category || 'K3'}
                        </span>
                      </div>
                    </div>

                    {/* Card Body */}
                    <div className="p-5 flex-1 flex flex-col justify-between">
                      <div>
                        <h3 className="font-extrabold text-[#011E42] text-base group-hover:text-[#008CE4] transition-colors leading-snug mb-2 line-clamp-2">
                          <Link href={`/berita/${post.slug}`}>
                            {post.title}
                          </Link>
                        </h3>

                        <p className="text-xs text-gray-500 leading-relaxed mb-4 line-clamp-3">
                          {post.excerpt}
                        </p>

                        {/* Date Meta */}
                        <div className="flex items-center gap-3 text-[11px] text-gray-500 border-t border-slate-100 pt-3">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3.5 h-3.5 text-[#008CE4]" />
                            {dateStr}
                          </span>
                          <span className="flex items-center gap-1">
                            <FileText className="w-3.5 h-3.5 text-[#008CE4]" />
                            {lang === 'EN' ? 'Article' : 'Artikel'}
                          </span>
                        </div>
                      </div>

                      {/* Action Link */}
                      <div className="pt-3 flex items-center justify-end">
                        <Link
                          href={`/berita/${post.slug}`}
                          className="inline-flex items-center gap-1.5 text-xs font-bold text-[#008CE4] hover:text-[#006BB0] transition-colors"
                        >
                          <span>{lang === 'EN' ? 'Read More' : 'Baca Selengkapnya'}</span>
                          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                        </Link>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Pagination Controls */}
            {totalSlides > 1 && (
              <div className="flex items-center justify-center gap-3 mt-8">
                <button
                  type="button"
                  onClick={handlePrev}
                  aria-label="Previous slide"
                  className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center text-gray-500 hover:text-[#008CE4] hover:border-[#008CE4] transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>

                <div className="flex items-center gap-1.5">
                  {Array.from({ length: totalSlides }).map((_, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setActiveSlide(i)}
                      aria-label={`Slide ${i + 1}`}
                      className={`h-2 rounded-full transition-all ${
                        activeSlide === i ? 'w-6 bg-[#008CE4]' : 'w-2 bg-slate-300 hover:bg-slate-400'
                      }`}
                    />
                  ))}
                </div>

                <button
                  type="button"
                  onClick={handleNext}
                  aria-label="Next slide"
                  className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center text-gray-500 hover:text-[#008CE4] hover:border-[#008CE4] transition-colors"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}

          </div>

        </div>
      </div>
    </section>
  )
}
