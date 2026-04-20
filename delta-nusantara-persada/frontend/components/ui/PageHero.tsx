import React from 'react'

interface Props {
  title: string
  subtitle?: string
}

export default function PageHero({ title, subtitle }: Props) {
  return (
    <div className="relative w-full h-64 bg-gray-800 overflow-hidden">
      {/* Background image - replace src with actual hero image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('..\..\images\hero-bg.png')" }}
      />
      <div className="absolute inset-0 bg-primary-700/60" />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-center">
        <h1 className="text-white font-bold text-3xl mb-2">{title}</h1>
        {subtitle && (
          <p className="text-white/90 text-base max-w-lg">{subtitle}</p>
        )}
      </div>
    </div>
  )
}
