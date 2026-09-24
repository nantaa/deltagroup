import type { Metadata } from 'next'
import React from 'react'
import SiteHeader from '@/components/layout/SiteHeader'
import Footer from '@/components/layout/Footer'
import Breadcrumb from '@/components/ui/Breadcrumb'
import ServicesClient from '@/components/ui/ServicesClient'

export const metadata: Metadata = {
  title: 'Layanan Riksa Uji K3',
  description:
    'Layanan riksa uji pesawat dan riksa uji alat K3 oleh PT Delta Nusantara Persada — PJK3 ditunjuk resmi Kemnaker RI. Meliputi pesawat angkat, bejana tekan, elevator, listrik, proteksi kebakaran, dan pesawat tenaga produksi.',
  alternates: { canonical: '/services' },
  openGraph: {
    title: 'Layanan Riksa Uji Pesawat & Alat K3 | PT Delta Nusantara Persada',
    description:
      'Riksa uji pesawat, riksa uji alat, dan pemeriksaan K3 oleh Ahli K3 Spesialis berpenunjukan resmi Kemnaker RI. Layanan nasional dari Bekasi hingga Balikpapan.',
    url: '/services',
  },
}

export default function ServicesPage() {
  return (
    <>
      <SiteHeader />
      <Breadcrumb crumbs={[{ label: 'Layanan Riksa Uji' }]} />
      <ServicesClient />
      <Footer />
    </>
  )
}
