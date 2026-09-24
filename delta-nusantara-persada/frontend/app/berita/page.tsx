import type { Metadata } from 'next'
import React from 'react'
import SiteHeader from '@/components/layout/SiteHeader'
import Footer from '@/components/layout/Footer'
import Breadcrumb from '@/components/ui/Breadcrumb'
import BeritaClient from '@/components/ui/BeritaClient'

export const metadata: Metadata = {
  title: 'Berita & Artikel K3',
  description:
    'Baca artikel terbaru seputar Keselamatan dan Kesehatan Kerja (K3), riksa uji, regulasi Kemnaker RI, dan praktik terbaik inspeksi industri dari tim ahli PT Delta Nusantara Persada.',
  alternates: {
    canonical: '/berita',
  },
  openGraph: {
    title: 'Berita & Artikel K3 | PT Delta Nusantara Persada',
    description:
      'Artikel terbaru seputar K3, riksa uji peralatan industri, regulasi Kemnaker RI, dan inspeksi dari para ahli PJK3 terpercaya.',
    url: '/berita',
  },
}

export default function BeritaPage() {
  return (
    <>
      <SiteHeader />
      <Breadcrumb crumbs={[{ label: 'Berita' }]} />
      <BeritaClient />
      <Footer />
    </>
  )
}
