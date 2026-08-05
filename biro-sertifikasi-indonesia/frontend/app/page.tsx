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
  { id: 1, title: 'Mengenal Audit SMK3 PP No.50 Tahun 2012 dan Manfaatnya', slug: 'audit-smk3-pp50-2012', excerpt: 'Audit SMK3 adalah kewajiban bagi perusahaan untuk memastikan sistem manajemen K3 berjalan sesuai regulasi. Ketahui prosesnya bersama BSI.', content: '', status: 'published', tags: ['SMK3', 'K3', 'Audit'], category: 'K3', created_at: '2026-10-12', updated_at: '' },
  { id: 2, title: 'Perbedaan Sertifikasi SMK3, ISO 45001, dan SIMPPRO', slug: 'smk3-vs-iso45001-simppro', excerpt: 'Banyak perusahaan bertanya mengenai perbedaan ketiga sertifikasi K3 ini. Simak penjelasan lengkap dari auditor bersertifikat BSI.', content: '', status: 'published', tags: ['ISO 45001', 'SMK3', 'SIMPPRO'], category: 'Sertifikasi', created_at: '2026-11-01', updated_at: '' },
  { id: 3, title: 'Jadwalkan Riksa Uji Alat Anda Sebelum Batas Waktu', slug: 'jadwal-riksa-uji-alat', excerpt: 'Riksa Uji wajib dilakukan secara periodik. BSI melayani Riksa Uji Alat di seluruh Indonesia. Hubungi tim marketing kami sekarang.', content: '', status: 'published', tags: ['Riksa Uji', 'Alat K3'], category: 'Layanan', created_at: '2026-11-03', updated_at: '' },
]

const MOCK_BRANDS: Brand[] = [
  { id: 1, name: 'Biro Sertifikasi Indonesia', slug: 'bsi' },
  { id: 2, name: 'Delta Indonesia Pranenggar', slug: 'pranenggar' },
  { id: 3, name: 'Biro Sertifikasi Indonesia', slug: 'nusa-persada' },
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