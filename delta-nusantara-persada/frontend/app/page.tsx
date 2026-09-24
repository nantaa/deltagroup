import React from 'react'
import SiteHeader from '@/components/layout/SiteHeader'
import Footer from '@/components/layout/Footer'
import HeroSection from '@/components/ui/HeroSection'
import HomeClient from '@/components/ui/HomeClient'
import ServicesSection from '@/components/ui/ServicesSection'
import WhyChooseUs from '@/components/ui/WhyChooseUs'
import WorkProcessTraining from '@/components/ui/WorkProcessTraining'
import TeamSection from '@/components/ui/TeamSection'
import TestimonialCTA from '@/components/ui/TestimonialCTA'

export default async function HomePage() {
  return (
    <div className="min-h-screen bg-white flex flex-col font-sans selection:bg-[#00D2FF] selection:text-[#011E42]">
      <SiteHeader />
      
      <main className="flex-grow">
        {/* 1. Hero Section with Frame 2147224344.svg Background & Floating Stats Card */}
        <HeroSection />

        {/* 2. Trusted By 200+ Companies & 5 Industry Category Pills */}
        <HomeClient />

        {/* 3. Solusi Terintegrasi - Statutory PJK3 Services */}
        <ServicesSection />

        {/* 4. Why Choose Us - Dark Navy Band with 4 Value Pillars */}
        <WhyChooseUs />

        {/* 5. Split Section: Proses Kerja Kami (5-step flow) & Jasa Riksa Uji Populer */}
        <WorkProcessTraining />

        {/* 6. Tim Profesional Kami (Pranan Jaya Barus, Terzha R. Perdanawan, Ricky Rumindo) */}
        <TeamSection />

        {/* 7. Dual Card Banner: Testimonial & Consultation CTA */}
        <TestimonialCTA />
      </main>

      <Footer />
    </div>
  )
}