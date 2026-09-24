'use client'

import React, { useEffect, useCallback } from 'react'
import Image from 'next/image'
import { X, Scale, Check, ShieldCheck } from 'lucide-react'
import { useLang, translations } from '@/lib/LanguageContext'

export interface ServiceDetail {
  id: string
  title: string
  description: string
  dasarHukum: string
  jenisLayanan: string[]
}

export const SERVICE_DETAILS: Record<string, ServiceDetail> = {
  'pesawat-angkat-angkut': {
    id: 'pesawat-angkat-angkut',
    title: 'Pesawat Angkat & Pesawat Angkut',
    description:
      'Pemeriksaan dan pengujian untuk memastikan peralatan angkat dan angkut beroperasi dengan aman, efisien, dan sesuai standar.',
    dasarHukum:
      'Permenaker No. 8 Tahun 2020 tentang Keselamatan dan Kesehatan Kerja Pesawat Angkat dan Pesawat Angkut.',
    jenisLayanan: [
      'Overhead Crane',
      'Belt Conveyor',
      'Pesawat Angkut di atas Landasan',
      'Pesawat Angkut di Permukaan',
    ],
  },
  pubt: {
    id: 'pubt',
    title: 'Pesawat Uap & Bejana Tekan',
    description:
      'Boiler dan bejana tekan wajib diperiksa secara berkala agar bebas dari risiko kebocoran, tekanan berlebih, dan potensi ledakan.',
    dasarHukum:
      'Undang-Undang Uap 1930 dan Peraturan Uap 1930; Permenaker No. 37 Tahun 2016 tentang Keselamatan dan Kesehatan Kerja Bejana Tekanan dan Tangki Timbun.',
    jenisLayanan: ['Pesawat Uap', 'Tangki Timbun', 'Bejana Tekan'],
  },
  'elevator-eskalator': {
    id: 'elevator-eskalator',
    title: 'Elevator & Eskalator',
    description:
      'Mobilitas vertikal yang aman dimulai dari pengujian rutin — memastikan elevator dan eskalator layak dan nyaman digunakan setiap hari.',
    dasarHukum:
      'Permenaker No. 6 Tahun 2017 tentang Keselamatan dan Kesehatan Kerja Elevator dan Eskalator.',
    jenisLayanan: ['Elevator / Lift', 'Eskalator'],
  },
  'proteksi-kebakaran': {
    id: 'proteksi-kebakaran',
    title: 'Proteksi Kebakaran',
    description:
      'Kesiapan sistem proteksi kebakaran adalah kunci penyelamatan. Kami periksa detektor, alarm, dan alat pemadam agar selalu siap saat dibutuhkan.',
    dasarHukum:
      'Permenakertrans No. Per.02/MEN/1983 tentang Instalasi Alarm Kebakaran Automatik; Permenakertrans No. Per.04/MEN/1980 tentang APAR; Kepmenaker No. Kep.186/MEN/1999; Instruksi Menaker No. Ins.11/M/BW/1997.',
    jenisLayanan: ['Hydrant', 'Alarm', 'Sprinkler', 'Fire Suppression System'],
  },
  'listrik-petir': {
    id: 'listrik-petir',
    title: 'Instalasi Listrik & Penyalur Petir',
    description:
      'Dari korsleting hingga sambaran petir — pengujian instalasi listrik dan penyalur petir kami dirancang untuk mencegah bahaya sebelum terjadi.',
    dasarHukum:
      'Permenaker No. 12 Tahun 2015 jo. Permenaker No. 33 Tahun 2015 tentang K3 Listrik di Tempat Kerja; Permenaker No. Per.02/MEN/1989 jo. Permenaker No. 31 Tahun 2015 tentang Pengawasan Instalasi Penyalur Petir.',
    jenisLayanan: ['Listrik', 'Penyalur Petir'],
  },
  'pesawat-tenaga-produksi': {
    id: 'pesawat-tenaga-produksi',
    title: 'Pesawat & Tenaga Produksi',
    description:
      'Mesin produksi yang andal berawal dari perawatan yang tepat. Pemeriksaan menyeluruh kami memastikan unit produksi Anda aman dan minim downtime.',
    dasarHukum:
      'Permenaker No. 38 Tahun 2016 tentang Keselamatan dan Kesehatan Kerja Pesawat Tenaga dan Produksi.',
    jenisLayanan: [
      'Penggerak Mula',
      'Mesin Perkakas Dan Produksi',
      'Turbin',
      'Transmisi Tenaga',
      'Tanur (Furnace) Dan Lainnya',
    ],
  },
}

interface ServiceDetailModalProps {
  serviceId: string | null
  onClose: () => void
}

export default function ServiceDetailModal({
  serviceId,
  onClose,
}: ServiceDetailModalProps) {
  const { lang, t } = useLang()
  const fallbackService = serviceId ? SERVICE_DETAILS[serviceId] : null
  const modalItem = serviceId
    ? (translations.serviceModal.items as Record<string, {
        title: { ID: string; EN: string }
        description: { ID: string; EN: string }
        dasarHukum: { ID: string; EN: string }
        jenisLayanan: { ID: string[]; EN: string[] }
      }>)[serviceId]
    : null

  const title = modalItem ? modalItem.title[lang] : (fallbackService?.title ?? '')
  const description = modalItem ? modalItem.description[lang] : (fallbackService?.description ?? '')
  const dasarHukum = modalItem ? modalItem.dasarHukum[lang] : (fallbackService?.dasarHukum ?? '')
  const jenisLayanan = modalItem ? modalItem.jenisLayanan[lang] : (fallbackService?.jenisLayanan ?? [])

  // Escape key handler
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    },
    [onClose]
  )

  useEffect(() => {
    if (!serviceId) return

    // Lock body scroll
    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = originalOverflow
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [serviceId, handleKeyDown])

  if (!serviceId || (!fallbackService && !modalItem)) return null

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="service-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
    >
      {/* Backdrop overlay */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity duration-300 animate-in fade-in"
      />

      {/* Modal Dialog Content Container */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-[532px] bg-white rounded-3xl shadow-2xl border border-slate-100 p-6 sm:p-8 overflow-hidden z-10 animate-in zoom-in-95 duration-200"
      >
        {/* Background Ornament from /images/card.svg anchored precisely to the corners */}
        <div className="pointer-events-none absolute inset-0 w-full h-full select-none overflow-hidden rounded-3xl z-0">
          <Image
            src="/images/card.svg"
            alt=""
            fill
            unoptimized
            className="w-full h-full object-fill pointer-events-none"
            priority
          />
        </div>

        {/* Modal Header: Badge + Close button */}
        <div className="relative z-10 flex items-center justify-between mb-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EBF5FB] border border-[#D0E8F7] text-[#008CE4] text-xs font-bold tracking-wide">
            <ShieldCheck className="w-4 h-4 text-[#008CE4]" />
            <span>{t('serviceModal', 'badge')}</span>
          </div>

          <button
            onClick={onClose}
            aria-label={t('serviceModal', 'closeAria')}
            className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 flex items-center justify-center transition-colors focus:outline-none focus:ring-2 focus:ring-[#008CE4]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Title & Description */}
        <div className="relative z-10 mb-6">
          <h2
            id="service-modal-title"
            className="text-2xl sm:text-3xl font-extrabold text-[#011E42] tracking-tight leading-snug mb-2"
          >
            {title}
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            {description}
          </p>
        </div>

        {/* Dasar Hukum Box */}
        <div className="relative z-10 bg-[#F0F7FD] border border-[#CCE3F8] rounded-2xl p-4 sm:p-5 mb-6 flex items-start gap-3 sm:gap-4 shadow-sm">
          <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#008CE4] text-white flex items-center justify-center shrink-0 shadow-md">
            <Scale className="w-6 h-6 sm:w-7 sm:h-7" />
          </div>
          <div className="flex-1">
            <h3 className="text-sm sm:text-base font-bold text-[#011E42] mb-1">
              {t('serviceModal', 'legalBasisTitle')}
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {dasarHukum}
            </p>
          </div>
        </div>

        {/* Jenis Layanan Section */}
        <div className="relative z-10">
          <h3 className="text-lg sm:text-xl font-extrabold text-[#011E42] mb-3">
            {t('serviceModal', 'servicesTitle')}
          </h3>
          <ul className="space-y-2.5 max-h-[30vh] overflow-y-auto pr-1">
            {jenisLayanan.map((item, idx) => (
              <li key={idx} className="flex items-center gap-3">
                <span className="w-5 h-5 rounded-full bg-[#008CE4] text-white flex items-center justify-center shrink-0 shadow-sm">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </span>
                <span className="text-xs sm:text-sm font-medium text-slate-700">
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
