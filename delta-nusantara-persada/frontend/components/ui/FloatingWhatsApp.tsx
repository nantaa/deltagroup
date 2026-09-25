'use client'

import React, { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { X, MessageCircle, Phone } from 'lucide-react'
import { MARKETING_CONTACTS, MarketingContact } from '@/lib/marketingContacts'

// Green WhatsApp SVG Icon
function WhatsAppIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.664-.698c.969.587 1.838.895 2.796.896 3.177 0 5.764-2.587 5.764-5.766.001-3.187-2.579-5.783-5.764-5.783zm3.392 8.235c-.144.405-.837.774-1.17.824-.312.045-.694.076-2.029-.475-1.705-.705-2.793-2.455-2.879-2.57-.084-.115-.694-.924-.694-1.763 0-.838.439-1.251.597-1.424.159-.172.347-.216.463-.216.115 0 .23 0 .332.006.108.005.253-.041.396.302.144.347.491 1.2.534 1.288.043.088.072.19.014.305-.058.115-.087.187-.173.287-.086.101-.182.226-.26.304-.087.086-.177.18-.076.353.101.173.449.741.964 1.2 0.663.591 1.221.774 1.394.86.173.086.274.072.376-.044.101-.116.433-.504.549-.677.115-.173.23-.144.39-.086.159.058 1.011.476 1.184.563.173.086.289.13.332.202.043.072.043.419-.101.824z" />
    </svg>
  )
}

export default function FloatingWhatsApp() {
  const [isOpen, setIsOpen] = useState(false)
  const popupRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)

  // Close popup when clicking outside
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
          aria-label="WhatsApp Marketing Chat"
        >
          {/* Header */}
          <div className="bg-[#011E42] text-white px-4 py-3.5 flex items-start justify-between gap-3 relative">
            <div className="pr-4">
              <h4 className="text-xs sm:text-[13px] font-bold leading-snug">
                Butuh Bantuan? Silahkan Chat dengan salah satu marketing kami
              </h4>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              aria-label="Tutup chat"
              className="text-white/80 hover:text-white p-1 rounded-md transition-colors shrink-0"
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
                className="group flex items-center gap-3.5 px-4 py-3 hover:bg-slate-50 transition-colors"
              >
                {/* Avatar with WhatsApp Overlay Badge */}
                <div className="relative w-11 h-11 rounded-full shrink-0 bg-slate-100">
                  <Image
                    src={contact.photo}
                    alt={contact.name}
                    width={44}
                    height={44}
                    className="w-11 h-11 rounded-full object-cover object-top border border-slate-200"
                    unoptimized
                  />
                  <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-[#25D366] text-white rounded-full flex items-center justify-center ring-2 ring-white shadow-sm">
                    <WhatsAppIcon className="w-2.5 h-2.5 fill-current" />
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

      {/* Floating Trigger Button */}
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        className="inline-flex items-center gap-2.5 px-5 py-3 rounded-full bg-[#011E42] hover:bg-[#022a5e] text-white text-xs sm:text-sm font-bold shadow-xl shadow-black/25 transition-all duration-200 hover:scale-[1.03] active:scale-[0.98] border border-white/10"
      >
        <div className="w-5 h-5 rounded-full bg-[#25D366] text-white flex items-center justify-center shrink-0">
          <WhatsAppIcon className="w-3.5 h-3.5 fill-current" />
        </div>
        <span>Butuh Bantuan? Klik Disini</span>
      </button>
    </div>
  )
}
