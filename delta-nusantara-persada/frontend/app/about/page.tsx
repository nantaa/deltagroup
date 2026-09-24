import type { Metadata } from 'next'
import React from 'react'
import SiteHeader from '@/components/layout/SiteHeader'
import Footer from '@/components/layout/Footer'
import Breadcrumb from '@/components/ui/Breadcrumb'
import AboutClient from '@/components/ui/AboutClient'

export const metadata: Metadata = {
  title: 'Tentang Kami',
  description:
    'PT Delta Nusantara Persada berdiri sejak 1999 dan menjadi PT pada 2006. PJK3 bidang Riksa Uji yang ditunjuk resmi Kemnaker RI, melayani inspeksi K3 dan sertifikasi peralatan industri di seluruh Indonesia.',
  alternates: {
    canonical: '/about',
  },
  openGraph: {
    title: 'Tentang PT Delta Nusantara Persada | PJK3 Riksa Uji Kemnaker RI',
    description:
      'Berdiri sejak 1999, PT DNP adalah mitra terpercaya industri Indonesia untuk inspeksi dan pengujian K3 peralatan kerja — dari Jabodetabek hingga lokasi remote.',
    url: '/about',
  },
}

export default function AboutPage() {
  return (
    <>
      <SiteHeader />
      <Breadcrumb crumbs={[{ label: 'Tentang Kami' }]} />
      <AboutClient />
      <Footer />
    </>
  )
}
