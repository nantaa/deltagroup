'use client'

import React, { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { X, MessageCircle, MessageSquare } from 'lucide-react'
import { MARKETING_CONTACTS, MarketingContact } from '@/lib/marketingContacts'

export default function FloatingWhatsApp() {
  const [isOpen, setIsOpen] = useState(false)
  const popupRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)

  // Close popup when clicking outside or pressing Escape
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        popupRef.current &&
        !popupRef.current.contains(event.target as Node) &&
        triggerRef.current &&
        !triggerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      document.addEventListener('keydown', handleKeyDown)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen])

  const getWaLink = (contact: MarketingContact) => {
    if (contact.waLink) return contact.waLink
    const text = encodeURIComponent(
      `Halo ${contact.name} (${contact.office} PT Delta Nusantara Persada), saya ingin konsultasi mengenai layanan riksa uji K3.`
    )
    return `https://wa.me/${contact.phone}?text=${text}`
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Floating Popup Card */}
      {isOpen && (
        <div
          ref={popupRef}
          className="mb-3 w-[300px] sm:w-[340px] max-h-[520px] bg-white rounded-2xl shadow-2xl border border-slate-200/80 flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200"
          role="dialog"
          aria-modal="true"
          aria-label="Marketing Consultation Chat"
        >
          {/* Header styled with Brand Navy & Cyan Accent */}
          <div className="bg-[#011E42] text-white px-4 py-3.5 flex items-start justify-between gap-3 relative border-b border-white/10">
            <div className="flex items-start gap-2.5 pr-2">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-r from-[#04C5F4] to-[#0D5EC4] flex items-center justify-center text-white shrink-0 mt-0.5 shadow-sm">
                <MessageSquare className="w-3.5 h-3.5" />
              </div>
              <div>
                <h4 className="text-xs sm:text-[13px] font-bold leading-snug text-white">
                  Butuh Bantuan? Silahkan Chat dengan salah satu marketing kami
                </h4>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              aria-label="Tutup chat"
              className="text-white/70 hover:text-white p-1 rounded-md hover:bg-white/10 transition-colors shrink-0"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Contact List */}
          <div className="overflow-y-auto max-h-[400px] divide-y divide-slate-100 bg-white">
            {MARKETING_CONTACTS.map((contact) => (
              <a
                key={contact.id}
                href={getWaLink(contact)}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3.5 px-4 py-3 hover:bg-[#F0F7FD] transition-colors"
              >
                {/* Avatar with Cohesive Brand Blue Badge */}
                <div className="relative w-11 h-11 rounded-full shrink-0 bg-slate-100">
                  <Image
                    src={contact.photo}
                    alt={contact.name}
                    width={44}
                    height={44}
                    className="w-11 h-11 rounded-full object-cover object-top border border-slate-200"
                    unoptimized
                  />
                  <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-gradient-to-r from-[#04C5F4] to-[#0D5EC4] text-white rounded-full flex items-center justify-center ring-2 ring-white shadow-sm">
                    <MessageCircle className="w-2.5 h-2.5" />
                  </div>
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <p className="text-[11px] text-slate-400 font-medium leading-none mb-1 truncate">
                    {contact.office}
                  </p>
                  <h5 className="text-sm font-bold text-[#011E42] group-hover:text-[#008CE4] transition-colors leading-none truncate">
                    {contact.name}
                  </h5>
                </div>
              </a>
            ))}
          </div>
        </div>
      )}

      {/* Floating Trigger Button with Cohesive Landing Page Navy + Gradient Badge */}
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        className="group inline-flex items-center gap-2.5 px-4 sm:px-5 py-3 rounded-full bg-[#011E42] hover:bg-[#022D65] text-white text-xs sm:text-sm font-bold shadow-xl shadow-[#011E42]/30 transition-all duration-200 hover:scale-[1.03] active:scale-[0.98] border border-white/15"
      >
        <div className="w-6 h-6 rounded-full bg-gradient-to-r from-[#04C5F4] to-[#0D5EC4] text-white flex items-center justify-center shrink-0 shadow-md shadow-[#008CE4]/30">
          <MessageCircle className="w-3.5 h-3.5" />
        </div>
        <span className="tracking-tight text-white group-hover:text-[#00D2FF] transition-colors">
          Butuh Bantuan? Klik Disini
        </span>
      </button>
    </div>
  )
}
