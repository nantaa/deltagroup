'use client'
import React, { useState, useEffect } from 'react'

const DEFAULT_ANNOUNCEMENTS = [
  'Lembaga Audit SMK3 berdasarkan PP No.50 Tahun 2012 — Ditunjuk SK Menteri No.137 Tahun 2018',
  'Sertifikasi ISO 9001 · ISO 14001 · ISO 45001 · SMK3 · SIMPPRO — Hubungi kami sekarang!',
  'Riksa Uji Alat K3 seluruh Indonesia — Karawang · Gresik · Pekanbaru · Balikpapan · Medan',
  'PT. Biro Sertifikasi Indonesia — Audit Sistem Manajemen yang Independen, Kompetitif & Terpercaya',
]

const STORAGE_KEY = 'delta_topbar_announcements'

function loadAnnouncements(): string[] {
  if (typeof window === 'undefined') return DEFAULT_ANNOUNCEMENTS
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      const parsed: string[] = JSON.parse(stored)
      if (Array.isArray(parsed) && parsed.length > 0) return parsed
    }
  } catch { }
  return DEFAULT_ANNOUNCEMENTS
}

export default function TopBar() {
  const [announcements, setAnnouncements] = useState<string[]>(DEFAULT_ANNOUNCEMENTS)

  useEffect(() => {
    setAnnouncements(loadAnnouncements())

    // Listen for storage changes (admin edits in another tab)
    const onStorage = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY) setAnnouncements(loadAnnouncements())
    }
    window.addEventListener('storage', onStorage)
    return () => window.removeEventListener('storage', onStorage)
  }, [])

  if (announcements.length === 0) return null

  // Duplicate so the ticker looks seamless
  const items = [...announcements, ...announcements]

  return (
    <div className="bg-primary-700 text-white text-xs py-2 overflow-hidden">
      <div className="ticker-wrap">
        <div className="ticker-content">
          {items.map((a, i) => (
            <span key={i} className="mx-8">
              <span className="mr-2 opacity-50">|</span>
              {a}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
