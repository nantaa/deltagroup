import React from 'react'
import TopBar from '@/components/layout/TopBar'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import HeroSlider from '@/components/ui/HeroSlider'
import HomeClient from '@/components/ui/HomeClient'
import api from '@/lib/api'
import { Post, Brand } from '@/types'

async function getPosts(): Promise<Post[]> {
  try {
    const res = await api.get('/posts?status=published&limit=3')
    return res.data.data ?? res.data
  } catch {
    return MOCK_POSTS
  }
}

async function getBrands(): Promise<Brand[]> {
  try {
    const res = await api.get('/brands')
    return res.data.data ?? res.data
  } catch {
    return MOCK_BRANDS
  }
}

const MOCK_POSTS: Post[] = [
  { id: 1, title: 'Pentingnya Keselamatan Kerja di Industri', slug: 'keselamatan-kerja', excerpt: 'Keselamatan kerja adalah prioritas utama dalam setiap operasional industri modern di Indonesia.', content: '', status: 'published', tags: ['K3', 'Keselamatan'], category: 'K3', created_at: '2025-10-12', updated_at: '' },
  { id: 2, title: 'Sertifikasi Kompetensi Profesional 2025', slug: 'sertifikasi-kompetensi', excerpt: 'Program sertifikasi kompetensi untuk meningkatkan profesionalitas tenaga kerja Indonesia.', content: '', status: 'published', tags: ['Sertifikasi', 'Event'], category: 'Event', created_at: '2025-11-01', updated_at: '' },
  { id: 3, title: 'Jadwal Pelatihan K3 KEMNAKER RI 2025', slug: 'jadwal-k3-2025', excerpt: 'Berikut jadwal pelaksanaan pelatihan K3 dan sertifikasi KEMNAKER RI yang diselenggarakan Delta Indonesia.', content: '', status: 'published', tags: ['Training', 'Jadwal'], category: 'Training', created_at: '2025-11-03', updated_at: '' },
]

const MOCK_BRANDS: Brand[] = [
  { id: 1, name: 'Biro Sertifikasi Indonesia' },
  { id: 2, name: 'Delta Indonesia Pranenggar' },
  { id: 3, name: 'Delta Nusa Persada' },
  { id: 4, name: 'Prime Safety' },
]

export default async function HomePage() {
  const [posts, brands] = await Promise.all([getPosts(), getBrands()])

  return (
    <>
      <TopBar />
      <Navbar />
      <HeroSlider />
      {/* Bilingual sections handled by client component */}
      <HomeClient posts={posts} brands={brands} />
      <Footer />
    </>
  )
}
