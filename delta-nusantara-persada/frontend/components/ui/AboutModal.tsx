'use client'
import React, { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import { X } from 'lucide-react'
import { useLang } from '@/lib/LanguageContext'

interface AboutModalProps {
  isOpen: boolean
  onClose: () => void
}

interface TabData {
  id: string
  num: string
  title: { ID: string; EN: string }
  icon: string
  pic: string
  content: { ID: React.ReactNode; EN: React.ReactNode }
}

const TABS: TabData[] = [
  {
    id: 'tentang-kami',
    num: '01',
    title: { ID: 'Tentang Kami', EN: 'About Us' },
    icon: '/komponen tambahan/mdi_account-hard-hat-outline.svg',
    pic: '/komponen tambahan/TentangKamiPic.png',
    content: {
      ID: (
        <p className="text-xs sm:text-[13.5px] text-[#4A6482] leading-relaxed">
          PT. Delta Nusantara Persada (PT. DNP) adalah perusahaan yang bergerak dalam bidang riksa uji alat, jasa audit dan kajian teknis bangunan, untuk membantu pelaksanaan pemenuhan peraturan perundangan dan persyaratan.
        </p>
      ),
      EN: (
        <p className="text-xs sm:text-[13.5px] text-[#4A6482] leading-relaxed">
          PT. Delta Nusantara Persada (PT. DNP) is an occupational health & safety statutory inspection company (PJK3) specializing in work equipment testing & inspection, audit services, and technical building studies to assist statutory compliance and safety standards.
        </p>
      ),
    },
  },
  {
    id: 'visi-kami',
    num: '02',
    title: { ID: 'Visi Kami', EN: 'Our Vision' },
    icon: '/komponen tambahan/glyphs_binoculars-bold.svg',
    pic: '/komponen tambahan/VisiKamiPic.png',
    content: {
      ID: (
        <p className="text-xs sm:text-[13.5px] text-[#4A6482] leading-relaxed italic">
          &ldquo;Menjadi yang terdepan dalam Penyediaan Pelayanan Jasa Konsultan dan Jasa Pemeriksaan Pengujian peralatan kerja yang dapat diandalkan serta terpercaya.&rdquo;
        </p>
      ),
      EN: (
        <p className="text-xs sm:text-[13.5px] text-[#4A6482] leading-relaxed italic">
          &ldquo;To be at the forefront of providing reliable and trustworthy Consulting Services and Work Equipment Testing & Inspection Services.&rdquo;
        </p>
      ),
    },
  },
  {
    id: 'misi-kami',
    num: '03',
    title: { ID: 'Misi Kami', EN: 'Our Missions' },
    icon: '/komponen tambahan/mage_goals.svg',
    pic: '/komponen tambahan/MisiKamiPic.png',
    content: {
      ID: (
        <ol className="list-decimal list-inside space-y-2 text-xs sm:text-[13px] text-[#4A6482] leading-relaxed">
          <li>
            Menyediakan berbagai layanan dalam bidang konsultasi, pemeriksaan dan pengujian peralatan kerja guna mendukung peningkatan produktivitas dan keselamatan kerja baik di sektor pemerintah maupun swasta.
          </li>
          <li>
            Memberikan pelayanan terbaik bagi semua pelanggan dan menjadi mitra kerja yang dapat diandalkan serta terpercaya.
          </li>
        </ol>
      ),
      EN: (
        <ol className="list-decimal list-inside space-y-2 text-xs sm:text-[13px] text-[#4A6482] leading-relaxed">
          <li>
            Provide various services in consulting, work equipment testing and inspection to support productivity improvement and occupational safety in both government and private sectors.
          </li>
          <li>
            Provide the best services for all customers and become a reliable and trustworthy work partner.
          </li>
        </ol>
      ),
    },
  },
  {
    id: 'kebijakan-mutu',
    num: '04',
    title: { ID: 'Kebijakan Mutu', EN: 'Quality Policy' },
    icon: '/komponen tambahan/carbon_policy.svg',
    pic: '/komponen tambahan/KebijakanMutuPic.png',
    content: {
      ID: (
        <ul className="space-y-1 text-[11px] sm:text-xs text-[#4A6482] leading-snug">
          <li className="flex items-start gap-1.5">
            <span className="text-[#00A3E0] font-bold">•</span>
            <span>Menjamin kepuasan pelanggan dan mitra kerja.</span>
          </li>
          <li className="flex items-start gap-1.5">
            <span className="text-[#00A3E0] font-bold">•</span>
            <span>Melakukan perbaikan pelayanan secara berkelanjutan.</span>
          </li>
          <li className="flex items-start gap-1.5">
            <span className="text-[#00A3E0] font-bold">•</span>
            <span>Jujur dan profesional dalam setiap pelaksanaan tugas.</span>
          </li>
          <li className="flex items-start gap-1.5">
            <span className="text-[#00A3E0] font-bold">•</span>
            <span>Tepat waktu dalam melaksanakan seluruh pekerjaan.</span>
          </li>
          <li className="flex items-start gap-1.5">
            <span className="text-[#00A3E0] font-bold">•</span>
            <span>Informatif dan transparan dalam pelaporan teknis.</span>
          </li>
          <li className="flex items-start gap-1.5">
            <span className="text-[#00A3E0] font-bold">•</span>
            <span>Taat pada persyaratan pelanggan dan perundang-undangan.</span>
          </li>
          <li className="flex items-start gap-1.5">
            <span className="text-[#00A3E0] font-bold">•</span>
            <span>Jeli dalam melihat peluang penyempurnaan sistem.</span>
          </li>
          <li className="flex items-start gap-1.5">
            <span className="text-[#00A3E0] font-bold">•</span>
            <span>Pendidikan terencana untuk meningkatkan kompetensi karyawan.</span>
          </li>
        </ul>
      ),
      EN: (
        <ul className="space-y-1 text-[11px] sm:text-xs text-[#4A6482] leading-snug">
          <li className="flex items-start gap-1.5">
            <span className="text-[#00A3E0] font-bold">•</span>
            <span>Ensure client and working partner satisfaction.</span>
          </li>
          <li className="flex items-start gap-1.5">
            <span className="text-[#00A3E0] font-bold">•</span>
            <span>Conduct sustainable service improvement.</span>
          </li>
          <li className="flex items-start gap-1.5">
            <span className="text-[#00A3E0] font-bold">•</span>
            <span>Be honest and professional in all works.</span>
          </li>
          <li className="flex items-start gap-1.5">
            <span className="text-[#00A3E0] font-bold">•</span>
            <span>Be on time in performing all inspection works.</span>
          </li>
          <li className="flex items-start gap-1.5">
            <span className="text-[#00A3E0] font-bold">•</span>
            <span>Be informative and transparent.</span>
          </li>
          <li className="flex items-start gap-1.5">
            <span className="text-[#00A3E0] font-bold">•</span>
            <span>Obey clients&apos; requirements and applicable legislation.</span>
          </li>
          <li className="flex items-start gap-1.5">
            <span className="text-[#00A3E0] font-bold">•</span>
            <span>Be astute in seeing opportunities for improvement.</span>
          </li>
          <li className="flex items-start gap-1.5">
            <span className="text-[#00A3E0] font-bold">•</span>
            <span>Planned education for improving employee competence.</span>
          </li>
        </ul>
      ),
    },
  },
  {
    id: 'kebijakan-k3',
    num: '05',
    title: { ID: 'Kebijakan K3', EN: 'HSE Policy' },
    icon: '/komponen tambahan/carbon_deployment-policy.svg',
    pic: '/komponen tambahan/KebijakanK3Pic.png',
    content: {
      ID: (
        <ul className="space-y-2 text-xs sm:text-[13px] text-[#4A6482] leading-relaxed">
          <li className="flex items-start gap-2">
            <span className="text-[#00A3E0] font-bold">1.</span>
            <span>Menaati peraturan perundang-undangan dan persyaratan K3 lainnya yang berlaku.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[#00A3E0] font-bold">2.</span>
            <span>Meningkatkan kinerja keselamatan dan kesehatan kerja secara berkelanjutan.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[#00A3E0] font-bold">3.</span>
            <span>Mencegah cedera dan penyakit akibat kerja yang mempengaruhi proses bisnis perusahaan.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[#00A3E0] font-bold">4.</span>
            <span>Menyediakan pelatihan dan fasilitas kerja yang aman serta nyaman bagi seluruh pemangku kepentingan.</span>
          </li>
        </ul>
      ),
      EN: (
        <ul className="space-y-2 text-xs sm:text-[13px] text-[#4A6482] leading-relaxed">
          <li className="flex items-start gap-2">
            <span className="text-[#00A3E0] font-bold">1.</span>
            <span>Obey legislation and other applicable HSE requirements.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[#00A3E0] font-bold">2.</span>
            <span>Improve occupational health & safety performance sustainably.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[#00A3E0] font-bold">3.</span>
            <span>Prevent injuries and occupational illnesses that affect company business processes.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[#00A3E0] font-bold">4.</span>
            <span>Provide training and safe, convenient work facilities for all stakeholders.</span>
          </li>
        </ul>
      ),
    },
  },
]

export default function AboutModal({ isOpen, onClose }: AboutModalProps) {
  const [activeTabIdx, setActiveTabIdx] = useState(0)
  const { lang } = useLang()

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
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      window.addEventListener('keydown', handleKeyDown)
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, handleKeyDown])

  if (!isOpen) return null

  const activeTab = TABS[activeTabIdx]

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="about-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl bg-white rounded-[24px] sm:rounded-[28px] shadow-2xl overflow-hidden border border-slate-200/80 flex flex-col max-h-[92vh] animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header matching reference 1:1 */}
        <div className="bg-white px-6 sm:px-8 pt-6 pb-4 border-b border-[#E8EFF6] flex items-center justify-between shrink-0">
          <div>
            <p className="text-[11px] sm:text-xs font-bold text-[#00A3E0] tracking-wider uppercase mb-0.5">
              DELTA NUSANTARA PERSADA
            </p>
            <h2 id="about-modal-title" className="text-2xl sm:text-[28px] font-extrabold text-[#082E60] tracking-tight">
              Tentang Kami
            </h2>
          </div>

          <button
            onClick={onClose}
            aria-label="Tutup"
            className="w-10 h-10 rounded-xl border border-slate-200 hover:border-slate-300 bg-white flex items-center justify-center text-slate-500 hover:text-[#082E60] transition-colors shadow-sm focus:outline-none"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body: 2-Column Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 flex-1 overflow-y-auto">
          {/* Left Column: Vertical Tabs Sidebar */}
          <div className="md:col-span-4 bg-[#EDF4FA] p-4 sm:p-6 flex flex-col gap-2.5 justify-center border-r border-[#E0ECF6]">
            {TABS.map((tab, idx) => {
              const isActive = activeTabIdx === idx
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTabIdx(idx)}
                  className={`w-full text-left rounded-xl p-1.5 pr-4 flex items-center gap-3.5 transition-all focus:outline-none ${
                    isActive
                      ? 'bg-[#0A3160] shadow-md shadow-[#0A3160]/20'
                      : 'bg-transparent hover:bg-white/50'
                  }`}
                >
                  {/* Number Badge */}
                  <span
                    className={`font-bold text-xs px-3 py-2 rounded-lg shrink-0 transition-colors ${
                      isActive
                        ? 'bg-[#062244] text-[#00D2FF]'
                        : 'bg-[#DFECF5] text-[#557696]'
                    }`}
                  >
                    {tab.num}
                  </span>

                  {/* Tab Label */}
                  <span
                    className={`text-xs sm:text-sm font-bold tracking-wide truncate ${
                      isActive ? 'text-white' : 'text-[#4A6B8A]'
                    }`}
                  >
                    {tab.title[lang]}
                  </span>
                </button>
              )
            })}
          </div>

          {/* Right Column: Content Panel with Background Wave from card.svg & Isolated Pic on Right */}
          <div className="md:col-span-8 relative bg-white min-h-[360px] sm:min-h-[400px] flex items-center overflow-hidden">
            {/* Background Wave Ornament from /images/card.svg (reused from ServiceDetailModal, mirrored to bottom-left) */}
            <div className="pointer-events-none absolute inset-0 w-full h-full select-none overflow-hidden z-0 scale-x-[-1]">
              <Image
                src="/images/card.svg"
                alt=""
                fill
                unoptimized
                className="w-full h-full object-fill pointer-events-none"
                priority
              />
            </div>

            {/* Isolated Pic from komponen tambahan anchored to the right */}
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-48 sm:w-56 md:w-64 h-[85%] z-10 pointer-events-none flex items-center justify-end pr-2 sm:pr-3">
              <div className="relative w-full h-full">
                <Image
                  src={activeTab.pic}
                  alt={activeTab.title[lang]}
                  fill
                  priority
                  className="object-contain object-right"
                />
              </div>
            </div>

            {/* Foreground Content Card (Anchored to Left 58% to not collide with the right Pic) */}
            <div className="relative z-20 px-6 sm:px-8 py-8 w-full max-w-[62%] sm:max-w-[58%] space-y-3.5">
              {/* Icon & Title Row matching reference */}
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 relative shrink-0 flex items-center justify-center">
                  <Image
                    src={activeTab.icon}
                    alt=""
                    width={26}
                    height={26}
                    unoptimized
                    className="w-6 h-6 object-contain"
                  />
                </div>
                <h3 className="text-xl sm:text-2xl font-extrabold text-[#082E60] tracking-tight">
                  {activeTab.title[lang]}
                </h3>
              </div>

              {/* Body Text */}
              <div className="pt-1">
                {activeTab.content[lang]}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
