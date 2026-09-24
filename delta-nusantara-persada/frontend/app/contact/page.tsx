import type { Metadata } from 'next'
import React from 'react'
import SiteHeader from '@/components/layout/SiteHeader'
import Footer from '@/components/layout/Footer'
import Breadcrumb from '@/components/ui/Breadcrumb'
import ContactClient from '@/components/ui/ContactClient'

export const metadata: Metadata = {
  title: 'Hubungi Kami',
  description:
    'Konsultasi gratis riksa uji pesawat dan riksa uji alat K3 bersama PT Delta Nusantara Persada. Kantor pusat di Bekasi, kantor perwakilan di Surabaya, Medan, Balikpapan, Pekanbaru, dan kota industri lainnya.',
  alternates: { canonical: '/contact' },
  openGraph: {
    title: 'Hubungi Kami | PT Delta Nusantara Persada',
    description:
      'Konsultasi riksa uji K3: telepon (021) 88869010, email marketing@deltanusa.co.id, atau kunjungi kantor kami di Suncity Square Bekasi.',
    url: '/contact',
  },
}

export default function ContactPage() {
  return (
    <>
      <SiteHeader />
      <Breadcrumb crumbs={[{ label: 'Hubungi Kami' }]} />
      <ContactClient />
      <Footer />
    </>
  )
}
