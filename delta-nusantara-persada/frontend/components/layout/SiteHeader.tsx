'use client'
import React from 'react'
import TopBar from '@/components/layout/TopBar'
import Navbar from '@/components/layout/Navbar'

export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 shadow-md">
      <TopBar />
      <Navbar />
    </header>
  )
}
