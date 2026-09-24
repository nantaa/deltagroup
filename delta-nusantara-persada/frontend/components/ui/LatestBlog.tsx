'use client'
import React from 'react'
import Link from 'next/link'
import { ArrowRight, Sparkles } from 'lucide-react'
import PostCard from '@/components/ui/PostCard'
import SectionLabel from './SectionLabel'
import { Post } from '@/types'
import { useLang } from '@/lib/LanguageContext'

interface LatestBlogProps {
  posts?: Post[]
}

const FALLBACK_POSTS: Post[] = [
  {
    id: 1,
    title: 'Pentingnya Keselamatan Kerja & Riksa Uji Berkala di Industri',
    slug: 'pentingnya-keselamatan-kerja-riksa-uji-berkala',
    excerpt: 'Memastikan kelayakan operasi peralatan kerja sesuai Permenaker No. 8 Tahun 2020.',
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
    excerpt: 'Standar pengujian kelaikan operasional PUBT industri manufaktur.',
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
    excerpt: 'Pemeriksaan struktur material tanpa merusak fisik komponen.',
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
    excerpt: 'Langkah persiapan perusahaan menghadapi audit sertifikasi SMK3.',
    content: '',
    category: 'AUDIT',
    status: 'published',
    tags: [],
    created_at: '2026-07-28T00:00:00.000Z',
    updated_at: '2026-07-28T00:00:00.000Z',
  },
]

export default function LatestBlog({ posts = [] }: LatestBlogProps) {
  const { lang } = useLang()
  const isEn = lang === 'EN'

  const displayPosts: Post[] = posts && posts.length > 0 ? posts.slice(0, 4) : FALLBACK_POSTS

  return (
    <section className="py-16 sm:py-20 bg-slate-50 border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-12">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <SectionLabel text={isEn ? 'NEWS & HSE UPDATES' : 'BERITA & K3 UPDATE'} />
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#011E42] tracking-tight">
              {isEn ? 'Articles & ' : 'Artikel & '}{' '}
              <span className="text-[#008CE4]">{isEn ? 'Safety Insights' : 'Wawasan K3'}</span>
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-2 max-w-2xl leading-relaxed">
              {isEn
                ? 'Statutory compliance guides, Ministry of Manpower regulations, and technical inspection updates.'
                : 'Update regulasi Kemnaker RI, panduan Riksa Uji K3, dan berita operasional industri terkini.'}
            </p>
          </div>

          <div className="mt-4 md:mt-0">
            <Link
              href="/berita"
              className="inline-flex items-center gap-2 text-sm font-bold text-[#008CE4] hover:text-[#011E42] transition-colors group"
            >
              <span>{isEn ? 'View All News' : 'Lihat Semua Berita'}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayPosts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>

        {/* Mobile View All Button */}
        <div className="mt-8 text-center sm:hidden">
          <Link
            href="/berita"
            className="inline-flex items-center justify-center w-full py-3 px-6 rounded-xl bg-white border border-slate-200 text-sm font-bold text-[#011E42] shadow-sm hover:bg-slate-50 transition-colors"
          >
            <span>{isEn ? 'View All Articles' : 'Lihat Semua Artikel'}</span>
            <ArrowRight className="w-4 h-4 ml-2 text-[#008CE4]" />
          </Link>
        </div>
      </div>
    </section>
  )
}
