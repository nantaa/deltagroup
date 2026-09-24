'use client'
import React from 'react'
import Image from 'next/image'

export default function HeroPortal() {
  return (
    <div className="relative w-full max-w-[480px] sm:max-w-[560px] md:max-w-[620px] lg:max-w-[680px] xl:max-w-[740px] aspect-square flex items-center justify-center lg:-mr-16 xl:-mr-24 lg:translate-y-6 xl:translate-y-8 z-0">
      <div className="relative w-full h-full">
        <Image
          src="/images/hero-character-portal.png"
          alt="Inspektur Ahli K3 Delta Nusantara Persada"
          fill
          priority
          sizes="(max-width: 640px) 480px, (max-width: 1024px) 640px, 740px"
          className="object-contain drop-shadow-[0_20px_60px_rgba(0,210,255,0.35)] hover:scale-[1.02] transition-transform duration-500"
        />
      </div>
    </div>
  )
}
