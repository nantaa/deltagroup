'use client'
import React from 'react'

interface Props {
  title: string
  subtitle?: string
}

export default function PageHero({ title, subtitle }: Props) {
  return (
    <div className="bg-primary-700 text-white py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">{title}</h1>
        {subtitle && (
          <p className="text-white/80 text-sm max-w-xl">{subtitle}</p>
        )}
      </div>
    </div>
  )
}