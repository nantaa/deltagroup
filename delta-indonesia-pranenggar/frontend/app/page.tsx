import React from 'react'
import TopBar from '@/components/layout/TopBar'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import HeroSlider from '@/components/ui/HeroSlider'
import HomeClient from '@/components/ui/HomeClient'
import AboutSection from '@/components/ui/AboutSection'
import ServicesSection from '@/components/ui/ServicesSection'
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

// RESTORED: Your original Mock Data
const MOCK_POSTS: Post[] = [
  { id: 1, title: 'Pentingnya Keselamatan Kerja di Industri', slug: 'keselamatan-kerja', excerpt: 'Keselamatan kerja adalah prioritas utama dalam setiap operasional industri modern di Indonesia.', content: '', status: 'published', tags: ['K3', 'Keselamatan'], category: 'K3', created_at: '2026-10-12', updated_at: '' },
  { id: 2, title: 'Jadwalkan Pemeriksaan dan Pengujian Alat 2026', slug: 'jadwal-pemeriksaan-pengujian-2026', excerpt: 'Program Riksa  Uji Alat untuk keselamatan dan kesehatan kerja (K3) para pekerja.', content: '', status: 'published', tags: ['Sertifikasi', 'Event'], category: 'Event', created_at: '2026-11-01', updated_at: '' },
  { id: 3, title: 'Riksa Uji K3', slug: 'jadwal-riksa-uji-k3', excerpt: 'Jadwalkan segera Riksa Uji Alat di Delta Indonesia Pranenggar.', content: '', status: 'published', tags: ['Training', 'Jadwal'], category: 'Training', created_at: '2026-11-03', updated_at: '' },
]

const MOCK_BRANDS: Brand[] = [
  { id: 1, name: 'Biro Sertifikasi Indonesia', slug: 'bsi' },
  { id: 2, name: 'Delta Indonesia Pranenggar', slug: 'pranenggar' },
  { id: 3, name: 'Delta Indonesia Pranenggar', slug: 'nusa-persada' },
  { id: 4, name: 'Prime Safety', slug: 'prime' },
]

export default async function HomePage() {
  const [posts, brands] = await Promise.all([getPosts(), getBrands()])

  return (
    <>
      <TopBar />
      <Navbar />
      <HeroSlider />
      <AboutSection />
      <ServicesSection />
      <HomeClient posts={posts} brands={brands} />
      <Footer />
    </>
  )
}