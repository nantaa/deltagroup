'use client'
import React, { useState, useEffect } from 'react'
import { Plus, Trash2, GripVertical, Save, RotateCcw, CheckCircle2 } from 'lucide-react'

const STORAGE_KEY = 'delta_topbar_announcements'

const DEFAULT_ANNOUNCEMENTS = [
  'Dapatkan Suket/Sertifikat Laik Operasi (SLO)/Surat Lainnya — Info selengkapnya di deltaindo.co.id',
  'Pemeriksaan dan Pengujian Alat 2026 — Info selengkapnya di deltaindo.co.id',
  'Jadwalkan Riksa Uji Alat — Hubungi kami sekarang!',
  'PT. Delta Lembaga Kursus melayani Riksa Uji Alat seluruh Indonesia',
]

function getAnnouncements(): string[] {
  if (typeof window === 'undefined') return DEFAULT_ANNOUNCEMENTS
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) return JSON.parse(stored)
  } catch { }
  return DEFAULT_ANNOUNCEMENTS
}

function saveAnnouncements(items: string[]) {
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
  }
}

export default function AdminTopBarPage() {
  const [items, setItems] = useState<string[]>([])
  const [saved, setSaved] = useState(false)
  const [dragIdx, setDragIdx] = useState<number | null>(null)

  useEffect(() => {
    setItems(getAnnouncements())
  }, [])

  const update = (idx: number, val: string) => {
    setItems((prev) => prev.map((v, i) => (i === idx ? val : v)))
    setSaved(false)
  }

  const remove = (idx: number) => {
    setItems((prev) => prev.filter((_, i) => i !== idx))
    setSaved(false)
  }

  const add = () => {
    setItems((prev) => [...prev, ''])
    setSaved(false)
  }

  const handleSave = () => {
    const cleaned = items.filter((v) => v.trim() !== '')
    saveAnnouncements(cleaned)
    setItems(cleaned)
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  const handleReset = () => {
    saveAnnouncements(DEFAULT_ANNOUNCEMENTS)
    setItems(DEFAULT_ANNOUNCEMENTS)
    setSaved(false)
  }

  // Simple drag-to-reorder
  const onDragStart = (idx: number) => setDragIdx(idx)
  const onDragOver = (e: React.DragEvent, idx: number) => {
    e.preventDefault()
    if (dragIdx === null || dragIdx === idx) return
    const next = [...items]
    const [moved] = next.splice(dragIdx, 1)
    next.splice(idx, 0, moved)
    setItems(next)
    setDragIdx(idx)
    setSaved(false)
  }
  const onDragEnd = () => setDragIdx(null)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-accent">TopBar Settings</h1>
          <p className="text-xs text-gray-400 mt-0.5">
            Manage scrolling announcements shown at the top of the website
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            id="topbar-reset-btn"
            onClick={handleReset}
            className="flex items-center gap-1.5 border border-gray-200 text-gray-600 px-4 py-2 rounded-lg text-sm hover:bg-gray-50 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset
          </button>
          <button
            id="topbar-save-btn"
            onClick={handleSave}
            className="flex items-center gap-1.5 bg-accent text-white px-5 py-2 rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors"
          >
            {saved
              ? <><CheckCircle2 className="w-4 h-4" /> Saved!</>
              : <><Save className="w-4 h-4" /> Save Changes</>
            }
          </button>
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-6 py-8">
        {/* Preview */}
        <div className="mb-8 rounded-xl overflow-hidden border border-gray-200">
          <p className="text-xs font-semibold text-gray-500 px-4 py-2 bg-gray-50 border-b border-gray-200 uppercase tracking-wide">
            Live Preview
          </p>
          <div className="bg-primary-700 text-white text-xs py-2 overflow-hidden">
            <div className="ticker-wrap">
              <div className="ticker-content">
                {[...items, ...items].map((a, i) => (
                  <span key={i} className="mx-8">
                    <span className="mr-2 opacity-50">|</span>
                    {a || <span className="opacity-40 italic">(empty)</span>}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Announcement List */}
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden mb-4">
          <div className="px-5 py-3 border-b border-gray-100 flex items-center justify-between">
            <p className="text-sm font-semibold text-gray-700">
              Announcements ({items.length})
            </p>
            <p className="text-xs text-gray-400">Drag ≡ to reorder</p>
          </div>

          <div className="divide-y divide-gray-100">
            {items.map((item, idx) => (
              <div
                key={idx}
                draggable
                onDragStart={() => onDragStart(idx)}
                onDragOver={(e) => onDragOver(e, idx)}
                onDragEnd={onDragEnd}
                className={`flex items-center gap-3 px-4 py-3 transition-colors ${dragIdx === idx ? 'bg-blue-50' : 'hover:bg-gray-50'
                  }`}
              >
                <GripVertical className="w-4 h-4 text-gray-300 shrink-0 cursor-grab active:cursor-grabbing" />
                <span className="text-xs text-gray-400 shrink-0 w-5 text-center font-mono">
                  {idx + 1}
                </span>
                <input
                  id={`announcement-${idx}`}
                  type="text"
                  value={item}
                  onChange={(e) => update(idx, e.target.value)}
                  placeholder="Enter announcement text..."
                  className="flex-1 text-sm text-gray-700 bg-transparent outline-none border border-transparent rounded px-2 py-1 focus:border-accent/40 focus:bg-white transition-colors"
                />
                <button
                  onClick={() => remove(idx)}
                  className="shrink-0 text-gray-300 hover:text-red-400 transition-colors"
                  aria-label="Remove announcement"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}

            {items.length === 0 && (
              <div className="px-4 py-8 text-center text-sm text-gray-400">
                No announcements. Click "Add" to create one.
              </div>
            )}
          </div>

          <div className="px-4 py-3 border-t border-gray-100">
            <button
              id="topbar-add-btn"
              onClick={add}
              className="flex items-center gap-1.5 text-sm text-accent hover:underline font-medium"
            >
              <Plus className="w-4 h-4" />
              Add announcement
            </button>
          </div>
        </div>

        <p className="text-xs text-gray-400">
          💡 Changes are saved to localStorage and immediately apply to the website. For persistent storage, connect this to the backend API.
        </p>
      </div>
    </div>
  )
}
