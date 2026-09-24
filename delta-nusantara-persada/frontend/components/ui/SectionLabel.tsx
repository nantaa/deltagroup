'use client'
import React from 'react'

interface SectionLabelProps {
  text: string
  centered?: boolean
  light?: boolean
}

export default function SectionLabel({ text, centered = false, light = false }: SectionLabelProps) {
  return (
    <div className={`inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-3 ${
      light
        ? 'bg-dnp-cyan/20 text-dnp-cyan border border-dnp-cyan/30'
        : 'bg-cyan-50 text-dnp-teal border border-cyan-200'
    } ${centered ? 'mx-auto' : ''}`}>
      <span className="w-1.5 h-1.5 rounded-full bg-dnp-teal shrink-0" />
      <span>{text}</span>
    </div>
  )
}
