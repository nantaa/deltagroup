'use client'
import React from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import PostCard from '@/components/ui/PostCard'
import SectionLabel from './SectionLabel'
import { Post } from '@/types'

interface LatestBlogProps {
  posts: Post[]
}

export default function LatestBlog({ posts }: LatestBlogProps) {
  // Mock dummy fallback posts if posts array has fewer than 4 items
  const displayPosts: Post[] = posts && posts.length >= 4 
    ? posts.slice(0, 4)
    : [
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
          updated_at: '2026-08-15T00:00:00.000Z'
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
          updated_at: '2026-08-10T00:00:00.000Z'
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
          updated_at: '2026-08-05T00:00:00.000Z'
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
          updated_at: '2026-07-28T00:00:00.000Z'
        }
      ]

  return (
    <div className="bg-white p-6 lg:p-8 rounded-3xl border border-gray-100 shadow-sm flex flex-col justify-between h-full">
      <div>
        <div className="flex items-center justify-between mb-3">
          <div>
            <SectionLabel text="BERITA & K3 UPDATE" />
            <h2 className="text-xl sm:text-2xl font-extrabold text-dnp-navy">
              Artikel & <span className="text-dnp-teal">Wawasan K3</span>
            </h2>
          </div>
          <Link
            href="/berita"
            className="hidden sm:inline-flex items-center gap-1.5 text-xs font-bold text-dnp-teal hover:text-dnp-navy transition-colors"
          >
            <span>Lihat Semua</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <p className="text-gray-500 text-xs mb-6 leading-relaxed">
          Update regulasi Kemnaker RI, panduan Riksa Uji K3, dan berita operasional industri.
        </p>

        {/* 2x2 Grid Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          {displayPosts.map((post) => (
            <PostCard key={post.id} post={post} compact />
          ))}
        </div>
      </div>

      <div className="mt-5 pt-3 border-t border-gray-100 sm:hidden">
        <Link
          href="/berita"
          className="flex items-center justify-center gap-1.5 text-xs font-bold text-dnp-teal hover:text-dnp-navy transition-colors py-1.5"
        >
          <span>Lihat Semua Artikel</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  )
}
